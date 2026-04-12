# F32Array — Optimized Flat F32 Buffer Abstraction

## Motivation

The current `StructArray[Fields <: Tuple]` covers the general case well:
arbitrary nesting, mixed primitive types, compile-time offsets via match types.
But real vertex and uniform buffer data has a much more constrained shape:

1. **F32-only**: 99% of GPU uploads are 32-bit floats — positions, normals, UVs,
   matrices.
2. **Depth-1 named tuple rows**: typical vertex layouts are flat named tuples
   whose fields are `Float` or math compound types (`Vec2`, `Vec3`, `Vec4`,
   `Mat2`, `Mat3`, `Mat4`), never nested structs.

```scala
// Typical usage today
type VertexXYZUV = (F32, F32, F32, F32, F32)   // opaque type markers

// What we actually want to write
type VertexRow = (pos: Vec3, uv: Vec2)
type ParticleRow = (pos: Vec3, vel: Vec3, time: Float, life: Float)
type UniformRow = (viewMat: Mat4, projMat: Mat4, time: Float)
```

The key performance issue: `StructArray` uses `ArrayBuffer + DataView`, and
every single float write becomes a
`DataView.setFloat32(byteOffset, value, true)` call in JavaScript. That is a
method call with bounds-checking, endianness dispatch, and offset arithmetic.

**Float32Array** provides direct indexed access: `arr[floatIndex] = value`
compiles to a single typed-array store in V8 — no method overhead, no endianness
flag, CPU-optimal memory access pattern. For a 16-float Mat4, this is 16 raw
stores vs 16 method calls.

---

## Current `StructArray` Analysis

```
StructArray[Fields <: Tuple]  =  BufferView(dv: DataView, off: Int)
  where off = element count (not a byte offset)

StructRef[Fields <: Tuple]    =  BufferView(dv: DataView, off: Int)
  where off = byte offset into the DataView
```

Every primitive read/write dispatches through `getPrimitiveValue[T]` /
`setPrimitiveValue[T]` which expands to a `DataView.getFloat32` / `setFloat32`
call. All offsets are in bytes. `TupleSize` and `FieldOffset` are match types
that compute byte sizes at compile time.

This design is sound and flexible. The overhead is acceptable for one-time
buffer uploads (geometry baking, uniform updates) but for particle systems or
streaming vertex data that update every frame, eliminating the per-float method
call overhead matters.

---

## Design: `F32Field[T]` Type Class

The foundation is a type class that maps a field type to its float count and
provides compile-time inline read/write:

```scala
trait F32Field[T]:
  /** Number of Float32 elements occupied by T (compile-time literal in each given) */
  def floatCount: Int
  /** Write T into arr starting at baseIdx (all indices in Float32 units) */
  def write(t: T, arr: Float32Array, baseIdx: Int): Unit
  /** Read T from arr starting at baseIdx */
  def read(arr: Float32Array, baseIdx: Int): T
```

Instances for all math types:

```scala
given F32Field[Float]:
  def floatCount = 1
  def write(t: Float, arr: Float32Array, baseIdx: Int) = arr(baseIdx) = t
  def read(arr: Float32Array, baseIdx: Int): Float = arr(baseIdx).toFloat

given F32Field[Vec2]:
  def floatCount = 2
  def write(t: Vec2, arr: Float32Array, baseIdx: Int) =
    arr(baseIdx) = t.x.toFloat; arr(baseIdx + 1) = t.y.toFloat
  def read(arr: Float32Array, baseIdx: Int): Vec2 =
    Vec2(arr(baseIdx), arr(baseIdx + 1))

given F32Field[Vec3]:
  def floatCount = 3
  def write(t: Vec3, arr: Float32Array, baseIdx: Int) =
    arr(baseIdx) = t.x.toFloat
    arr(baseIdx + 1) = t.y.toFloat
    arr(baseIdx + 2) = t.z.toFloat
  def read(arr: Float32Array, baseIdx: Int): Vec3 =
    Vec3(arr(baseIdx), arr(baseIdx + 1), arr(baseIdx + 2))

// Vec4, Mat2, Mat3, Mat4 analogously (floatCount: 4, 4, 9, 16)
```

**Note on Double→Float**: CPU math types (`Vec3`, `Mat4`) use `Double`
internally. Writing to `Float32Array` requires `.toFloat`. This is the correct
semantic: GPU buffers are F32. The conversion is explicit and visible, which is
better than silent truncation.

**Note on Mat3**: 9 floats for a packed 3×3. In std140 uniform layout, Mat3 is
padded to 3 × Vec4 = 12 floats. This is handled in the uniform variant (see GPU
Padding section).

---

## Row Layout: Compile-Time Stride and Offsets

For a named tuple `Row = (f0: T0, f1: T1, ..., fn: Tn)`, we need to compute at
compile time:

- **stride**: `sum of floatCount[Ti]` for all i
- **offset[i]**: `sum of floatCount[Tj]` for j < i

We use inline derivation (like the `allocateAttribs` pattern already in this
codebase):

```scala
/** Compute total float count for a plain (unnamed) tuple of field types */
inline def f32Stride[Fields <: Tuple]: Int =
  inline erasedValue[Fields] match
    case _: EmptyTuple => 0
    case _: (h *: t)   => summonInline[F32Field[h]].floatCount + f32Stride[t]

/** Compute float offset of field at index N within Fields tuple */
inline def f32Offset[Fields <: Tuple](n: Int): Int =
  if n == 0 then 0
  else
    inline erasedValue[Fields] match
      case _: (h *: t) => summonInline[F32Field[h]].floatCount + f32Offset[t](n - 1)
```

These are `inline` functions (not match types), so they work on concrete class
types like `Vec3` via `summonInline` — match types can only match on type
constructors, not class types.

---

## `F32Array[Row]` and `F32RowRef[Row]`

```scala
import scala.scalajs.js.typedarray.Float32Array

/** Dense array of Row values backed by a single Float32Array.
  * Row must be a depth-1 named tuple whose field types all have F32Field instances.
  * All indexing is in Float32 units (not bytes).
  */
opaque type F32Array[Row <: AnyNamedTuple] = Float32Array
// The Float32Array length = count * stride

object F32Array:
  transparent inline def allocate[Row <: AnyNamedTuple](count: Int): F32Array[Row] =
    val stride = f32Stride[NamedTuple.DropNames[Row]]
    new Float32Array(stride * count)

  extension [Row <: AnyNamedTuple](arr: F32Array[Row])
    inline def length: Int =
      arr.length / f32Stride[NamedTuple.DropNames[Row]]

    inline def stride: Int =
      f32Stride[NamedTuple.DropNames[Row]]

    transparent inline def apply(index: Int): F32RowRef[Row] =
      F32RowRef(arr, index * f32Stride[NamedTuple.DropNames[Row]])

    inline def jsArray: Float32Array = arr
```

```scala
/** Reference to a single row within an F32Array, anchored at a float base index. */
opaque type F32RowRef[Row <: AnyNamedTuple] = (Float32Array, Int)
// (arr, baseIdx)

object F32RowRef:
  inline def apply[Row <: AnyNamedTuple](arr: Float32Array, baseIdx: Int): F32RowRef[Row] =
    (arr, baseIdx)

  extension [Row <: AnyNamedTuple](ref: F32RowRef[Row])
    inline def arr: Float32Array = ref._1
    inline def baseIdx: Int      = ref._2
```

---

## Write API

### Option A — Positional index (mirrors current StructRef)

```scala
extension [Row <: AnyNamedTuple](ref: F32RowRef[Row])
  transparent inline def setField[N <: Int](n: N)(value: NamedTuple.Elem[Row, N]): Unit =
    val off = f32Offset[NamedTuple.DropNames[Row]](n)
    summonInline[F32Field[NamedTuple.Elem[Row, N]]].write(value, ref.arr, ref.baseIdx + off)
```

Usage:

```scala
type VertexRow = (pos: Vec3, uv: Vec2)
val arr = F32Array.allocate[VertexRow](1000)
arr(i).setField(0)(Vec3(1, 2, 3))
arr(i).setField(1)(Vec2(0.5, 0.5))
```

### Option B — Full row write via named tuple

```scala
extension [Row <: AnyNamedTuple](ref: F32RowRef[Row])
  transparent inline def :=(row: Row): Unit =
    writeRow[NamedTuple.DropNames[Row]](row.toTuple, ref.arr, ref.baseIdx)

private inline def writeRow[Fields <: Tuple](values: Tuple, arr: Float32Array, baseIdx: Int): Unit =
  inline erasedValue[Fields] match
    case _: EmptyTuple => ()
    case _: (h *: t) =>
      val field = summonInline[F32Field[h]]
      field.write(values.productElement(0).asInstanceOf[h], arr, baseIdx)
      writeRow[t](values.drop(1), arr, baseIdx + field.floatCount)
```

Usage:

```scala
arr(i) := (pos = Vec3(1, 2, 3), uv = Vec2(0.5, 0.5))
```

**Preferred**: Option B for the primary write path — matches the natural
named-tuple workflow. Option A is useful as a fallback for partial updates (e.g.
update only `time` field in a particle row without touching the others).

### Option C — Field-by-field mutable update (for partial updates)

When updating only one field of an existing row (e.g. every frame in a particle
system), a named tuple write rewrites all fields. Field-specific access matters
here:

```scala
// Compile-time field index lookup by name
type IndexOf[Row <: AnyNamedTuple, N <: String] <: Int = ...  // match type on Names[Row]

extension [Row <: AnyNamedTuple](ref: F32RowRef[Row])
  transparent inline def update[Name <: String](name: Name)(
    value: NamedTuple.Elem[Row, IndexOf[Row, Name]]
  )(using idx: ValueOf[IndexOf[Row, Name]]): Unit =
    setField(idx.value)(value)
```

This is more complex to implement. For the initial version, positional
`setField(n)` is sufficient. Named field update can be added once the core is
solid.

---

## GPU Upload

`F32Array` gives us the `Float32Array` directly — no intermediate `ArrayBuffer`
needed for most WebGPU paths:

```scala
device.queue.writeBuffer(gpuBuffer, 0, arr.jsArray)
```

The underlying `Float32Array` already provides `.buffer: ArrayBuffer` if needed
for `GPUBuffer.getMappedRange()`.

---

## GPU Padding Considerations

Two layouts with different alignment rules:

### Vertex buffers — packed

WebGPU vertex attributes are packed: `Vec3` = 3 floats, no padding. This matches
the `F32Field[Vec3].floatCount = 3` given.

### Uniform buffers — std140 (WebGPU `uniform` address space)

WebGPU std140 alignment:

- `Float` → 4 bytes (1 float) — no change
- `Vec2` → 8 bytes (2 floats) — no change
- `Vec3` → **16 bytes** (4 floats, 1 wasted) — padding required
- `Vec4` → 16 bytes (4 floats) — no change
- `Mat2` → 2 × Vec4 = 8 floats (2 wasted)
- `Mat3` → 3 × Vec4 = 12 floats (3 wasted)
- `Mat4` → 4 × Vec4 = 16 floats — no change

**Approach**: Two separate `F32Field` given sets, selected by a phantom tag:

```scala
trait Packed   // for vertex buffers
trait Std140   // for uniform buffers

given [L <: Packed | Std140] => F32Field[Float]:
  def floatCount = 1
  ...

given F32Field[Vec3](using Packed):
  def floatCount = 3
  ...

given F32Field[Vec3](using Std140):
  def floatCount = 4   // padded to vec4
  def write(t: Vec3, arr: Float32Array, baseIdx: Int) =
    arr(baseIdx) = t.x.toFloat
    arr(baseIdx + 1) = t.y.toFloat
    arr(baseIdx + 2) = t.z.toFloat
    // arr(baseIdx + 3) left as-is (padding)
  ...
```

Usage:

```scala
given Packed = new Packed {}
val vertexArr = F32Array.allocate[VertexRow](1000)

given Std140 = new Std140 {}
val uniformArr = F32Array.allocate[UniformRow](1)
```

**Alternative**: Separate `F32VertexArray[Row]` and `F32UniformArray[Row]` types
with the given set baked in. Simpler to use, less flexible. Decide during
implementation.

---

## Relation to Current `StructArray` and `VertexWriter`

The geometry library (`buffers.scala`) uses:

```scala
type VertexWriter[T, F <: Tuple]  = (T, StructRef[F]) => Unit
```

Where `F` is e.g. `(F32, F32, F32)` for XYZ. With `F32Array`, the equivalent
would be:

```scala
type F32VertexWriter[T, Row <: AnyNamedTuple] = (T, F32RowRef[Row]) => Unit
```

**Migration path** (two options):

**Option 1 — Adapter**: Keep `StructRef`-based `VertexWriter` as-is, add a
separate `F32Array`-based path in parallel. Convert `F32Array` → `ArrayBuffer`
for `BufferedGeometry` when the GPU upload stage needs it. Low-risk, no breaking
changes.

**Option 2 — Replace**: Migrate `BufferedGeometry` to use `F32Array[Row]`
directly. The `vertices` field changes from `StructArray[F]` to `F32Array[Row]`.
Geometry tests need updating. Higher-effort but cleaner long-term.

**Recommendation**: Start with Option 1 for now — validate the new abstraction
in isolation before touching the geometry library.

---

## Implementation Phases

### Phase 1 — Core `F32Field` type class (`trivalibs/src/utils/f32array.scala`)

1. Define `F32Field[T]` trait
2. Instances for `Float`, `Vec2`, `Vec3`, `Vec4`
3. Instances for `Mat2`, `Mat3`, `Mat4`
4. `f32Stride[Fields]` and `f32Offset[Fields](n)` inline functions
5. Tests: verify float counts and offsets match expectations

### Phase 2 — `F32Array` and `F32RowRef`

1. `F32Array[Row <: AnyNamedTuple]` opaque type over `Float32Array`
2. `F32RowRef[Row]` opaque type
3. `allocate`, `length`, `stride`, `apply(index)`, `jsArray`
4. `F32RowRef.:=(row: Row)` full-row write
5. `F32RowRef.setField(n)(value)` positional field write
6. Tests: allocate, write, verify raw Float32Array contents

### Phase 3 — Std140 padding givens

1. `Packed` / `Std140` tags (or separate given sets)
2. Padded instances for Vec3, Mat3, Mat2
3. Tests: verify stride for uniform rows with Vec3 fields matches expected
   std140 layout

### Phase 4 — Integration (deferred)

- Optionally migrate geometry `BufferedGeometry.vertices` to use `F32Array`
- Optionally migrate painter `Form` to use `F32Array` for vertex buffer upload

---

## Open Questions

- **`Tuple.drop(1)`** at compile time: `inline writeRow` uses `values.drop(1)`
  which returns `Tuple` not the concrete type. Need to verify this works with
  `summonInline` or use an index-counting approach with `constValue` instead.

- **Named field access syntax**: Accessing `ref.pos` directly (rather than
  `ref.setField(0)`) requires either a macro or `Selectable`. Deferred —
  positional API is sufficient initially.

- **`F32RowRef` as a mutable object vs. a value pair**: The
  `(Float32Array, Int)` pair means `F32RowRef` has value semantics. Methods on
  it mutate the underlying array, which is the correct mental model. This is
  consistent with `StructRef`'s `BufferView` design.

- **Vec2/Vec3 read-back from GPU**: `F32Field.read` creates new CPU math objects
  from raw floats. For write-only buffer patterns (vertex upload), `read` is
  never called. It's included for completeness but may be deferred if it
  complicates the implementation.
