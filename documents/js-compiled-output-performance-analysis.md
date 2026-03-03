# Compiled JS Performance Analysis: Buffer Access & Render Loop

Analysis of the compiled JS output from `painter_triangle` and
`painter_typed_bindings` drafts, focusing on GC pressure, per-frame allocations,
and buffer update overhead in the render loop. Both fastLink (readable) and
fullLink (optimized) outputs were examined.

---

## Part A: Buffer Data Utilities — Not Zero-Cost

### A1: `(DataView, Int)` Tuple Representation Overhead

**What happens:** Every `opaque type StructRef[F] = (DataView, Int)` uses
`scala.Tuple2`, which in Scala.js compiles to a heap object. Accessing `._1` /
`._2` uses method calls rather than direct property access.

**fastLink output** (readable names):

```js
var offset = $uI($n(ref)._2__O()); // null check + virtual method + unbox
var _1 = $n(ref)._1__O(); // null check + virtual method
_1.setFloat32(offset, v, true);
```

Conversion[Double **fullLink output** (optimized, mangled names):

```js
var offset = ref.n() | 0; // method call for _2 + bitwise OR for int coerce
var _1 = ref.g(); // method call for _1
_1.setFloat32(offset, v, true);
```

**fullLink result:** The optimizer **did remove null checks** (`$n()` gone) and
**simplified unboxing** (`$uI()` -> `| 0`). But `ref.n()` and `ref.g()` are
**still method calls on the Tuple2 prototype**, not direct property access. They
go through:

```js
// In scala.-Tuple2.js (fullLink):
$p.g = function () {
	return this.s;
}; // _1 accessor
$p.n = function () {
	return this.u;
}; // _2 accessor
```

**No CSE hoisting:** These method calls repeat per field with no hoisting. For
Vec3 (3 fields), `ref.n()` is called 3 times and `ref.g()` is called 3 times.

**Actual Vec3 write (fullLink):**

```js
// Field 1 (x):
var offset1 = ref.n() | 0; // method call
var _1 = ref.g(); // method call
_1.setFloat32(offset1, v1, true);
// Field 2 (y):
var offset2 = (4 + (ref.n() | 0)) | 0; // SAME method call again
var _1b = ref.g(); // SAME method call again
_1b.setFloat32(offset2, v2, true);
// Field 3 (z):
var offset3 = (8 + (ref.n() | 0)) | 0; // and again
var _1c = ref.g(); // and again
_1c.setFloat32(offset3, v3, true);
```

**Ideal output:**

```js
ref.dv.setFloat32(ref.off, v1, true); // direct property access
ref.dv.setFloat32(ref.off + 4, v2, true);
ref.dv.setFloat32(ref.off + 8, v3, true);
```

**Note:** The literal field offsets (0, 4, 8, 12) ARE correct compile-time
constants from `constValue[FieldOffset[...]]`. The problem is only with
accessing the base offset and DataView from the tuple via method calls instead
of property access.

#### Options

**Option A: Replace `(DataView, Int)` with
`class BufferView(val dv: DataView, val off: Int) extends js.Object`**

- Pros: Direct property access, no virtual dispatch, no unboxing, no null
  checks.
- Cons: Breaking change to trivalibs. Each `StructRef` is still a heap
  allocation (but smaller/faster).
- Files: `trivalibs/src/utils/bufferdata.scala`

**Option B: Avoid bundling -- pass DataView and offset as separate parameters**

- Pros: Potentially zero-alloc if compiler inlines everything.
- Cons: Changes many call signatures. May not be practical for stored refs (like
  `BufferBinding.buffer`).

**Option C: Keep tuple, optimize callers only**

- Pros: Minimal code change.
- Cons: Only helps specific call sites. `UniformValue.write` methods would need
  manual DataView/offset extraction.

---

### A2: `given Conversion[Double, Float]` Runtime Dispatch -- DONE

**Resolution:** Made all `given Conversion` instances `inline` in both
`trivalibs/src/utils/numbers.scala` and `src/gpu/math/package.scala`. The
`Double->Float` conversion now uses `inline def apply` in an anonymous class,
and the identity/widening conversions use `inline given`. Result: the
`$m_...().f().e()` call chain is completely eliminated -- all conversions now
compile to direct `Math.fround()` (for Double->Float) or nothing (for identity).
The `trivalibs.utils.numbers` import is no longer emitted in files that only
used the conversion.

**What happens:** Every `StructRef[Vec2Buffer]` field write that bridges
Double->Float goes through a non-inline
`given Conversion[Double, Float] = _.toFloat` singleton:

**fastLink:**

```js
$n($m_...numbers$package$().given_Conversion_Double_Float()).apply$mcFD$sp__D__F(value)
// null check + module accessor + getter + virtual method = 4 ops
```

**fullLink (optimized):**

```js
$m_...numbers$package$().f().e(value)
// module accessor + getter + method call = 3 ops (null check removed)
```

**Should just be:** `Math.fround(value)` -- 1 op

**Proof it's avoidable:** `UniformValue[Vec3, Vec4Buffer].write` does
`ref.x = value.x.toFloat` explicitly (no Conversion) and compiles to direct
`Math.fround(...)` in both fastLink and fullLink.

**Which types are affected:**

| Type   | write method              | Uses Conversion? | Compiled output          |
| ------ | ------------------------- | ---------------- | ------------------------ |
| `Vec3` | `ref.x = value.x.toFloat` | **No**           | `Math.fround(x)` -- good |
| `Vec2` | `ref := value`            | **Yes**          | 4 ops per field -- bad   |
| `Vec4` | `ref := value`            | **Yes**          | 4 ops per field -- bad   |
| `Mat2` | `ref := value`            | **Yes**          | 4 ops per field -- bad   |

**Also:** `given Conversion[Double, Double] = identity` has similar overhead --
even identity goes through a singleton method call. In fullLink output for
`Mat2.fromRotation`:

```js
var c = $m_...package$package$().dX().ck((+Math.cos(angle)));
//      ^module accessor     ^getter  ^method call (identity!)
```

The `dX().ck()` is the `Conversion[Double, Double]` identity -- **2 extra method
calls just to return the same value.**

#### Options

**Option A: Explicit `.toFloat` in write methods (targeted)**

- Change Vec2/Vec4/Mat2 `UniformValue.write` to match Vec3's pattern:
  ```scala
  // Vec2 -- explicit .toFloat like Vec3 already does:
  ref.x = value.x.toFloat; ref.y = value.y.toFloat
  // Mat2:
  ref(0)(value.m00.toFloat); ref(1)(value.m01.toFloat); ...
  ```
- Pros: Simple, proven (Vec3 already does this), no architecture change.
- Cons: Bypasses `MutableOps.:=`, slightly more verbose.
- Files: `src/gpu/buffers/uniforms.scala`

**Option B: Make `given Conversion` inline**

```scala
given Conversion[Double, Float] with
  inline def apply(x: Double): Float = x.toFloat
```

- Pros: Fixes all callers globally.
- Cons: May not work with Scala 3 trait linearization -- needs testing.
- Files: `src/gpu/math/package.scala`, `trivalibs/src/utils/numbers.scala`

**Option C: Both A + B**

- Fix hot paths explicitly (A) for guaranteed improvement, try inline conversion
  (B) for broader benefit.

---

### A3: `Fractional` Type Class Boxing on Mat2Buffer -- DONE

**What happens:** `Mat2MutableOps` uses `Num: Fractional` context bound. For
`Float`, operations like `c * t00` go through `Fractional.Implicits`:

**fullLink output** (from `painter_typed_bindings`, `mat1.update(_.rotate(...))`
call):

```js
// c * t00 compiles to (even with fullLink!):
new FractionalOps(Mat2MutableOps_this.E, c$2).ab(t00);
// ^ HEAP ALLOCATION                          ^ method call (.ab = $times)

// c * t00 + ns * t01 compiles to:
new FractionalOps(num, new FractionalOps(num, c).ab(t00)).bT(
	new FractionalOps(num, ns).ab(t01),
);
// 3 FractionalOps heap allocations for ONE matrix element!
```

**fullLink did NOT optimize this at all.** The `rotate` method still creates **8
`FractionalOps` heap objects** for the 4 matrix elements, plus `negate` virtual
call. The optimizer cannot see through `Fractional.Implicits` because it's a
virtual type class dispatch.

**Ideal output:**

```js
var m00 = c * t00 + -s * t01; // direct Float arithmetic, zero alloc
```

**Resolution:** Replaced `Fractional` with a custom `NumOps` type class
(`trivalibs/src/utils/numbers.scala`) that uses `inline` extension methods for
arithmetic. All vec2-4 and mat2-4 traits now use `Num: NumOps` instead of
`Num: Fractional`. The compiled JS no longer contains any `FractionalOps`
allocations — arithmetic compiles to direct primitive operations.

#### Options

**Option A: Float-specialized methods on Mat2Buffer**

```scala
extension (m: StructRef[Mat2Buffer])
  inline def rotateDirect(angle: Double): Unit =
    val c = Math.cos(angle).toFloat
    val s = Math.sin(angle).toFloat
    // Direct Float arithmetic, no Fractional
```

- Pros: Targeted fix, no architecture change.
- Cons: Duplicates logic for one specific type.

**Option B: Replace `Fractional` with direct arithmetic in MutableOps**

- Use inline operations or `NumExt` instead of `Fractional.Implicits` in the
  Mutable/Shared ops.
- Pros: Fixes all Float/Double matrix types.
- Cons: Significant refactor of the math traits.

**Option C: Override specific methods in the `Mat2Buffer.given` instance**

- Keep generic traits, specialize only the GPU buffer type.

---

### A4: `UniformValue.write` Virtual Dispatch

**What happens:** `trait UniformValue[T, F]` declares `write` as a trait method.
Even with `inline def write(...)` in implementations, once stored in
`BufferBinding.uv: UniformValue[T, F]`, calls to `uv.write(...)` are virtual
dispatch.

**Assessment:** This is **one virtual dispatch per `set()` call** -- acceptable
overhead. The real cost is inside the `write` body (Problems A1-A3). Once those
are fixed, this single dispatch is negligible.

---

### A5: Per-Field Overhead Summary (fullLink optimized vs Ideal)

| Operation                      | fullLink                          | Ideal             | Source                     |
| ------------------------------ | --------------------------------- | ----------------- | -------------------------- |
| Get base offset from StructRef | 2 (`.n()` method + `\| 0`)        | 1 (property read) | Tuple2 repr (A1)           |
| Get DataView from StructRef    | 1 (`.g()` method)                 | 1 (property read) | Tuple2 repr (A1)           |
| Convert Double->Float          | 3 (module + `.f()` + `.e()`)      | 1 (`Math.fround`) | non-inline Conversion (A2) |
| Float multiply via Fractional  | 2 (`new FractionalOps` + `.ab()`) | 1 (`*`)           | Fractional boxing (A3)     |

**Vec3 write (3 fields):** 6 method calls + 3 `| 0` coercions overhead -> should
be 3 direct `setFloat32` calls

**Vec2 write (2 fields):** 4 method calls + 2 coercions + **6 Conversion calls**
-> should be 2 `setFloat32` calls

**Mat2 rotate (4 fields read + 4 write + 8 mul/add):** 8 `FractionalOps` heap
allocs + 16 method calls overhead

---

## Part B: Render Loop Allocations

### B1: GPUBindGroup Recreated Every Frame -- HIGHEST IMPACT

**Location:** `src/gpu/painter/painter.scala:201-219` -- `createBindGroup()`
called unconditionally in `draw()`

**Per-frame allocations:**

- 1 `Arr[js.Dynamic]()` for entries
- Nx2 `Obj.literal` for binding entries (binding + resource per slot)
- 1 `Obj.literal` for bind group descriptor
- 1 `device.createBindGroup(...)` -- **expensive GPU driver call**

**Fix:** Cache the `GPUBindGroup` on `Shape`. Invalidate when `bind()` is
called.

```scala
// In Shape:
var cachedBindGroup: GPUBindGroup | Null = null

// In bind/processEntry: cachedBindGroup = null
// In Painter.draw: reuse if non-null, else create and cache
```

**Files:** `src/gpu/painter/shape.scala`, `src/gpu/painter/painter.scala`

---

### B2: Pipeline Cache Key String Every Frame

**Location:** `src/gpu/painter/painter.scala:153-156`

```scala
s"${s.id}|${shape.blendState.isEmpty}|${shape.cullMode}|${f.topology}|${f.frontFace}|${format}"
```

Creates a new String every frame via `StringOps` interpolation. Only used for
`js.Dictionary` cache lookup.

**Fix:** Pre-compute and store on `Shape` at construction. All values are set at
construction time.

**Files:** `src/gpu/painter/shape.scala`, `src/gpu/painter/painter.scala`

---

### B3: Descriptor Objects Every Frame

**Location:** `src/gpu/painter/painter.scala:102-147` -- `draw()`

Per-frame allocations:

- 1-2 `Obj.literal` for `colorAttachment` (+ clearValue)
- 1 `Arr(colorAttachment)` for render pass
- 1 `Obj.literal` for render pass descriptor
- 1 `Arr(encoder.finish())` for submit

**Assessment:** These are small, short-lived JS objects. V8 nursery GC handles
them efficiently. Lower priority than B1/B2.

**Fix options:** Pre-allocate and mutate descriptor objects (update only `view`
per frame). Or accept the overhead.

---

### B4: BindPair + Vec/Mat Objects per bind Call

Every `"rotation" := Mat2.fromRotation(t)` in animate creates:

- 1 `BindPair` object (small, short-lived)
- 1 `Mat2` object (from `Mat2.fromRotation`)

**Assessment:** Acceptable overhead. Users who need maximum performance can use
`BufferBinding.set`/`update` directly.

---

### B5: `Tuple4` for clearColor

Every `painter.draw(shape, clearColor = (0.1, 0.1, 0.1, 1.0))` allocates
`new Tuple4`.

**Fix:** Users can pre-allocate as a `val` outside the loop. Or change parameter
type.

---

### B6: Per-Frame Allocation Summary

| Allocation                     | Count/frame | Avoidable?                | Priority |
| ------------------------------ | ----------- | ------------------------- | -------- |
| **GPUBindGroup + descriptors** | **1 + 2xN** | **Yes -- cache on Shape** | **HIGH** |
| Pipeline key string            | 1           | Yes -- pre-compute        | Medium   |
| Obj.literal descriptors        | 3-4         | Partially -- pre-allocate | Low      |
| js.Array for descriptors       | 2           | Partially                 | Low      |
| GPUCommandEncoder/Buffer       | 2           | No (WebGPU required)      | --       |
| GPUTextureView                 | 1           | No (WebGPU required)      | --       |
| BindPair objects               | per bind    | User-side                 | Low      |
| Tuple4 clearColor              | 1           | User-side                 | Low      |

---

## Recommended Priority

1. **B1: BindGroup caching** -- eliminates expensive GPU driver call + N
   descriptor objects per frame
2. **A2: Explicit `.toFloat` in write methods** -- quick fix, eliminates
   Conversion dispatch (4 ops -> 1 per field)
3. **A1: StructRef `BufferView` representation** -- biggest systemic fix,
   eliminates tuple overhead (5 ops -> 2 per field)
4. **A3: Mat2Buffer Fractional specialization** -- DONE, eliminates 8 heap
   allocations per matrix rotation
5. **B2: Pipeline key caching** -- eliminates string allocation per frame

---

## Verification (after any changes)

1. `bun run build` -- must compile
2. `bun run test` -- all tests pass
3. Compare compiled JS in `drafts/out/` for the two draft packages
4. `bun run dev` -- visually verify both drafts render correctly
