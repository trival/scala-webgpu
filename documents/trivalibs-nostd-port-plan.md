# trivalibs_nostd → Scala Shader DSL — Porting & Implementation Plan

Living blueprint for bringing the Rust `trivalibs_nostd` shader helper crate
into the Scala WebGPU stack, and for adding the integer-type support that
those helpers require.

Companion documents:

- [rust-painter/repomix-trivalibs-core.xml](rust-painter/repomix-trivalibs-core.xml)
  — full Rust source bundle (the `trivalibs_nostd/` section is the port
  target).
- [done/wgsl-scala-dsl-functions.md](done/wgsl-scala-dsl-functions.md) —
  `WgslFn` design (the mechanism all ported functions plug into).
- [done/wgsl-scala-dsl-implementation.md](done/wgsl-scala-dsl-implementation.md)
  — shader DSL expression AST, opaque-type layout, local-variable conventions.
- [math-library-design.md](math-library-design.md) — scalar/vector math parity
  (ambient context; not a direct dependency).

---

## 1. Context

The shader DSL (`src/graphics/shader/` + `src/graphics/math/gpu/expr.scala`)
can express float shader math as typed Scala expressions that erase to WGSL
strings at runtime. `WgslFn` wraps that machinery into reusable helper
functions authored in either the Scala DSL or a raw WGSL body. With the
painter almost done and `WgslFn` landed, the next build-out is helper-library
parity with the Rust `trivalibs_nostd` crate:

> `random/hash.rs`, `random/simplex.rs`, `bits.rs`, `blur.rs`, `color.rs`,
> `coords.rs`, `num_ext.rs`, `vec_ext.rs`

**The blocker for `hash.rs`.** The hash family (`hashi`, `hashi_triple32`,
`hash21i`, `hash2di`, `hash3di`, `hash4di`, and their float-normalised
variants) operates on `u32` / `UVec2..4` using bitwise XOR, right shifts, and
wrapping multiplies. The Scala DSL today has **no integer types**. `Int`
literals auto-cast to `f32` via a `Conversion[Int, FloatExpr]`; there are no
`IntExpr` / `UIntExpr`, no integer vectors, no bitwise operators, and no
bitcast helpers. Porting `hash.rs` is impossible without first introducing
these primitives.

**What this plan covers.**

- **Phase 1 — Integer DSL integration** (implementation task): scalar
  `IntExpr` / `UIntExpr`, signed and unsigned integer vectors,
  Float ↔ Int / UInt conversions, and bitcast helpers. This is the foundation
  that unblocks everything downstream.
- **Phase 2 — Port `hash.rs`** via `WgslFn`. First real consumer of the
  integer DSL.
- **Phase 3 — Port `color.rs` + `coords.rs`**. No integer dependency;
  sequenced after Phase 2 because hash functions are the more-pressing
  feature.
- **Phase 4 — Simplex noise**. Reuse vetted WGSL source; `octaves: Int`
  parameters are the cross-phase dependency on Phase 1.
- **Phase 5 — Gaussian blur**. Consolidate the existing
  `examples/blur/Blur.scala` into the library; independent of Phase 1.

### 1.1 Confirmed decisions

| Question                         | Answer                                                                                             |
| -------------------------------- | -------------------------------------------------------------------------------------------------- |
| Integer DSL scope                | Scalars + integer vectors (`IVec2..4`, `UVec2..4`). Full foundation for `hash.rs` in one pass.     |
| Unsigned representation          | `opaque type UInt = Int` in trivalibs. Bit-identical to `Int`, distinct in the type system.        |
| Library layout                   | `src/graphics/shader/lib/{random,blur,color,coords}/`. Parallels Rust module tree.                 |
| Simplex noise / blur source      | Vetted MIT/CC0 WGSL where proven; port from Rust for hash/color/coords. Attribute licences inline. |

### 1.2 Explicit non-goals

- **CPU ↔ GPU integer buffer bindings.** `AttribBuffer` and `UniformBuffer`
  type members for `Int` / `UInt` / `UVec*` stay as `EmptyTuple`. Integers are
  shader-only for now (no vertex attributes, no uniform buffer storage). If
  this is ever needed, it is an additive change.
- **Replacing `Conversion[Int, FloatExpr]`.** Existing float-heavy code
  depends on the `42 → FloatExpr("f32(42)")` convenience. Adding a parallel
  `Int → IntExpr` conversion would cause ambiguity; integer literals use
  explicit `IntExpr(42)` / `UIntExpr(42)` constructors or the `.u` extension
  instead.
- **Matrix integer ops.** WGSL does not have `imat*` / `umat*`, and Rust
  `trivalibs_nostd` has no matrix helpers. Skipped.
- **Rust `trivalibs_core/src/data/{grid,neighbour_list,vertex_index}`.** These
  are CPU data-structure helpers, not shader helpers — outside `trivalibs_nostd`
  scope.

---

## 2. Phase 1 — Integer DSL Integration

All Phase 1 work is additive and local to the shader DSL. No existing
`FloatExpr` / `Vec*Expr` / `Mat*Expr` call-sites change.

### 2.1 `UInt` opaque type in trivalibs

**New file:** `trivalibs/src/utils/numbers/uint.scala`

```scala
package trivalibs.utils.numbers

opaque type UInt = Int

object UInt:
  inline def apply(v: Int): UInt = v

extension (u: UInt) inline def toInt: Int = u
extension (v: Int)  inline def u: UInt = UInt(v)
```

Zero runtime cost — at the bit level identical to `Int`. Hex hash constants
like `0x21f0aaad.u` work directly. Scala's `Int` is signed 32-bit, but at the
bit pattern level this matches WGSL `u32`, so arithmetic is well-defined in
both worlds (WGSL wraps u32 arithmetic by default, matching our semantic
intent).

### 2.2 Integer phantom types

**New file:** `src/graphics/math/gpu/int_types.scala`

```scala
package graphics.math.gpu

sealed trait IVec2
sealed trait IVec3
sealed trait IVec4
sealed trait UVec2
sealed trait UVec3
sealed trait UVec4
```

Phantom markers only — mirror the role of `Texture2D` / `Sampler` in
`graphics.math.gpu.Expr`. Their only function is carrying `WGSLType`
instances and serving as `WgslFn` parameter / return types. No CPU-side value
representation, no constructors, no methods.

**Rationale.** Mirroring the pattern of `Vec2` / `Vec3` / `Vec4` (full CPU
types) would require porting glam-like integer vector classes — wasted work
when we do not need CPU evaluation of integer vectors.

### 2.3 Expression types and operations

**File:** `src/graphics/math/gpu/expr.scala`

Inside `object Expr`, alongside the existing `FloatExpr` / `Vec*Expr` /
`Mat*Expr`, add:

```scala
opaque type IntExpr  <: Expr = Expr
object IntExpr:
  def apply(s: String): IntExpr = new Expr(s)
  def apply(v: Int): IntExpr    = new Expr(v.toString)

opaque type UIntExpr <: Expr = Expr
object UIntExpr:
  def apply(s: String): UIntExpr = new Expr(s)
  def apply(v: Int): UIntExpr    = new Expr(s"${v}u")

opaque type IVec2Expr <: Expr = Expr
object IVec2Expr { def apply(s: String): IVec2Expr = new Expr(s) }

// … same for IVec3Expr, IVec4Expr, UVec2Expr, UVec3Expr, UVec4Expr
```

Plus `Let*`, `Var*`, `Const*` variants for every new type following the
pattern already in place at `expr.scala:82-130`:

```scala
opaque type LetInt   <: IntExpr   & LetExpr   = LetExpr
opaque type VarInt   <: IntExpr   & VarExpr   = VarExpr
opaque type ConstInt <: IntExpr   & ConstExpr = ConstExpr
// … same for UInt, IVec2..4, UVec2..4
```

All new opaque types are exported from the `Expr` companion alongside the
existing exports.

#### 2.3.1 Literal conversions

```scala
// Keep existing: given Conversion[Int, FloatExpr]  (line 188, unchanged)
given Conversion[UInt, UIntExpr] = v => UIntExpr(UInt.toInt(v))
```

No `Conversion[Int, IntExpr]` — would conflict with the existing
`Int → FloatExpr` path. Integer literals are created via `IntExpr(42)` or
the `.u` path for unsigned.

#### 2.3.2 Arithmetic and bitwise operators

`NumOps[IntExpr]` and `NumOps[UIntExpr]`:

```scala
given NumOps[IntExpr]:
  extension (a: IntExpr)
    def +(b: IntExpr): IntExpr = IntExpr(s"(${a.wgsl} + ${b.wgsl})")
    def -(b: IntExpr): IntExpr = IntExpr(s"(${a.wgsl} - ${b.wgsl})")
    def *(b: IntExpr): IntExpr = IntExpr(s"(${a.wgsl} * ${b.wgsl})")
    def /(b: IntExpr): IntExpr = IntExpr(s"(${a.wgsl} / ${b.wgsl})")
    def unary_- : IntExpr      = IntExpr(s"(-${a.wgsl})")
  def zero: IntExpr = IntExpr("0")
  def one:  IntExpr = IntExpr("1")

given NumOps[UIntExpr]:
  // same; zero = UIntExpr("0u"), one = UIntExpr("1u"), no unary_-
```

`NumExt[IntExpr]` / `NumExt[UIntExpr]` — WGSL intrinsics that apply to
integer types: `abs`, `min`, `max`, `clamp`. (`sign` only on `IntExpr`;
`u32` has no signed `sign`.) Omit the trig / transcendental methods — they
are float-only in WGSL.

**Bitwise operators.** WGSL uses `|`, `&`, `^`, `<<`, `>>`, `~`. Exposed in
Scala as named methods to avoid conflicts with the existing
`Vec*Expr.+/-/*/÷` that use `|`-like precedence:

```scala
extension (a: IntExpr)
  def or(b: IntExpr):  IntExpr = IntExpr(s"(${a.wgsl} | ${b.wgsl})")
  def and(b: IntExpr): IntExpr = IntExpr(s"(${a.wgsl} & ${b.wgsl})")
  def xor(b: IntExpr): IntExpr = IntExpr(s"(${a.wgsl} ^ ${b.wgsl})")
  def shl(b: IntExpr): IntExpr = IntExpr(s"(${a.wgsl} << ${b.wgsl})")
  def shr(b: IntExpr): IntExpr = IntExpr(s"(${a.wgsl} >> ${b.wgsl})")
  def not:             IntExpr = IntExpr(s"(~${a.wgsl})")

// same set for UIntExpr
// same set applies component-wise for IVec*Expr and UVec*Expr
```

Named methods keep the call-site readable (`x.xor(y)` vs. the ambiguous
`x ^ y` against Scala's bitwise Int operator).

#### 2.3.3 Conversion and bitcast extensions

Explicit type casts (WGSL `i32(…)`, `u32(…)`, `f32(…)`):

```scala
extension (a: FloatExpr) def toI32: IntExpr   = IntExpr(s"i32(${a.wgsl})")
extension (a: FloatExpr) def toU32: UIntExpr  = UIntExpr(s"u32(${a.wgsl})")
extension (a: IntExpr)   def toF32: FloatExpr = FloatExpr(s"f32(${a.wgsl})")
extension (a: IntExpr)   def toU32: UIntExpr  = UIntExpr(s"u32(${a.wgsl})")
extension (a: UIntExpr)  def toF32: FloatExpr = FloatExpr(s"f32(${a.wgsl})")
extension (a: UIntExpr)  def toI32: IntExpr   = IntExpr(s"i32(${a.wgsl})")
```

Bitcast extensions — the `bits.rs` equivalent, essential for hashes that
feed float positions into integer hash algorithms:

```scala
extension (a: FloatExpr) def bitsToU32: UIntExpr  = UIntExpr(s"bitcast<u32>(${a.wgsl})")
extension (a: UIntExpr)  def bitsToF32: FloatExpr = FloatExpr(s"bitcast<f32>(${a.wgsl})")

extension (v: Vec2Expr)  def bitsToU32: UVec2Expr = UVec2Expr(s"bitcast<vec2<u32>>(${v.wgsl})")
extension (v: UVec2Expr) def bitsToF32: Vec2Expr  = Vec2Expr(s"bitcast<vec2<f32>>(${v.wgsl})")
// same for Vec3 ↔ UVec3, Vec4 ↔ UVec4
```

#### 2.3.4 Integer vector algebra

Reuse the generic `Vec2BaseG[N, V]` / `Vec2ImmutableOpsG[N, V]` trait pair
from `graphics.math.cpu.*` (the same shape used at `expr.scala:261-350`).
Provide four instances per arity:

- `Vec2BaseG[IntExpr,  IVec2Expr]` / `Vec2ImmutableOpsG[IntExpr,  IVec2Expr]`
- `Vec2BaseG[UIntExpr, UVec2Expr]` / `Vec2ImmutableOpsG[UIntExpr, UVec2Expr]`
- same for arity 3 and 4

Operations:

- `.x`, `.y`, `.z`, `.w` — return `IntExpr` / `UIntExpr`.
- `+ - * /` — vec/vec and vec/scalar, following the existing pattern.
- `.dot(other)` — returns scalar (`IntExpr` / `UIntExpr`).
- `abs`, `min`, `max`, `clamp` — WGSL supports these on ivec/uvec.
- Bitwise `.or / .and / .xor / .shl / .shr / .not` — component-wise (WGSL
  supports these on ivec/uvec).

Constructors:

```scala
object uvec2:
  def apply(x: UIntExpr, y: UIntExpr): UVec2Expr =
    UVec2Expr(s"vec2<u32>(${x.wgsl}, ${y.wgsl})")

object uvec3: /* similar */
object uvec4: /* similar */
object ivec2: /* similar */
object ivec3: /* similar */
object ivec4: /* similar */
```

### 2.4 `WGSLType` instances

**File:** `src/graphics/shader/types.scala`

Add after the existing `Mat4` instance:

```scala
given WGSLType[Int]:
  def wgslName = "i32"; def byteSize = 4; def alignment = 4; def vertexFormat = ""
  type AttribBuffer = EmptyTuple; type UniformBuffer = EmptyTuple

given WGSLType[UInt]:
  def wgslName = "u32"; def byteSize = 4; def alignment = 4; def vertexFormat = ""
  type AttribBuffer = EmptyTuple; type UniformBuffer = EmptyTuple

given WGSLType[IVec2]: /* wgslName = "vec2<i32>", byteSize = 8,  alignment = 8  */
given WGSLType[IVec3]: /* wgslName = "vec3<i32>", byteSize = 12, alignment = 16 */
given WGSLType[IVec4]: /* wgslName = "vec4<i32>", byteSize = 16, alignment = 16 */
given WGSLType[UVec2]: /* wgslName = "vec2<u32>", … */
given WGSLType[UVec3]: /* wgslName = "vec3<u32>", … */
given WGSLType[UVec4]: /* wgslName = "vec4<u32>", … */
```

`AttribBuffer` / `UniformBuffer` are `EmptyTuple` — integers deliberately
stay shader-only. The empty `vertexFormat` keeps these types out of the
vertex-layout code path. These fields become meaningful later if a CPU-side
integer buffer use case appears.

### 2.5 DSL type mappings

**File:** `src/graphics/shader/dsl/types.scala`

Extend `ToExpr` (currently at lines 24-34):

```scala
type ToExpr[T] = T match
  case Float   => FloatExpr
  case Double  => FloatExpr
  case Boolean => BoolExpr
  case Int     => IntExpr         // new
  case UInt    => UIntExpr        // new
  case Vec2    => Vec2Expr
  case Vec3    => Vec3Expr
  case Vec4    => Vec4Expr
  case IVec2   => IVec2Expr       // new
  case IVec3   => IVec3Expr       // new
  case IVec4   => IVec4Expr       // new
  case UVec2   => UVec2Expr       // new
  case UVec3   => UVec3Expr       // new
  case UVec4   => UVec4Expr       // new
  case Mat2    => Mat2Expr
  case Mat3    => Mat3Expr
  case Mat4    => Mat4Expr
  case _       => T
```

Extend `ToLocal` (currently at lines 52-67) with `Var[Int]`, `Var[UInt]`,
`Var[IVec2..4]`, `Var[UVec2..4]` and the corresponding `Const[…]` /
bare-type cases.

Extend `populateKinds` if necessary — the current `Var[?]` / `Const[?]`
pattern (lines 88-92) already matches wildcard arguments, so it should work
without changes.

### 2.6 `callExpr` return-type dispatch

**File:** `src/graphics/shader/dsl/fn.scala`

Extend the `callExpr[R]` match (currently lines 109-119):

```scala
inline def callExpr[R](s: String): ToExpr[R] =
  inline erasedValue[R] match
    case _: Float   => FloatExpr(s).asInstanceOf[ToExpr[R]]
    case _: Double  => FloatExpr(s).asInstanceOf[ToExpr[R]]
    case _: Int     => IntExpr(s).asInstanceOf[ToExpr[R]]      // new
    case _: UInt    => UIntExpr(s).asInstanceOf[ToExpr[R]]     // new
    case _: Vec2    => Vec2Expr(s).asInstanceOf[ToExpr[R]]
    case _: Vec3    => Vec3Expr(s).asInstanceOf[ToExpr[R]]
    case _: Vec4    => Vec4Expr(s).asInstanceOf[ToExpr[R]]
    case _: IVec2   => IVec2Expr(s).asInstanceOf[ToExpr[R]]    // new
    case _: IVec3   => IVec3Expr(s).asInstanceOf[ToExpr[R]]    // new
    case _: IVec4   => IVec4Expr(s).asInstanceOf[ToExpr[R]]    // new
    case _: UVec2   => UVec2Expr(s).asInstanceOf[ToExpr[R]]    // new
    case _: UVec3   => UVec3Expr(s).asInstanceOf[ToExpr[R]]    // new
    case _: UVec4   => UVec4Expr(s).asInstanceOf[ToExpr[R]]    // new
    case _: Mat2    => Mat2Expr(s).asInstanceOf[ToExpr[R]]
    case _: Mat3    => Mat3Expr(s).asInstanceOf[ToExpr[R]]
    case _: Mat4    => Mat4Expr(s).asInstanceOf[ToExpr[R]]
    case _: Boolean => BoolExpr(s).asInstanceOf[ToExpr[R]]
```

### 2.7 Tests

**New file:** `test/shader/IntDsl.test.scala`, extending `munit.FunSuite`.

Test groups:

**Literals**
- `IntExpr(42).toString == "42"`
- `IntExpr(-7).toString == "-7"`
- `UIntExpr(42).toString == "42u"`
- `UIntExpr(0x21f0aaad).toString == "569534125u"` (Scala's `Int.toString` for
  hex values; acceptable — equal bit pattern)
- `(0x21f0aaad.u: UIntExpr).toString == "569534125u"`

**Scalar arithmetic**
- `(IntExpr("a") + IntExpr("b")).toString == "(a + b)"`
- `(UIntExpr("a") * UIntExpr("b")).toString == "(a * b)"`
- `IntExpr("a").abs.toString == "abs(a)"`

**Bitwise**
- `UIntExpr("a").xor(UIntExpr("b")).toString == "(a ^ b)"`
- `UIntExpr("a").shr(UIntExpr(16)).toString == "(a >> 16u)"`
- `UIntExpr("a").and(UIntExpr("b")).toString == "(a & b)"`
- `UIntExpr("a").not.toString == "(~a)"`

**Conversions**
- `FloatExpr("x").toU32.toString == "u32(x)"`
- `UIntExpr("x").toF32.toString == "f32(x)"`

**Bitcasts**
- `FloatExpr("x").bitsToU32.toString == "bitcast<u32>(x)"`
- `UIntExpr("x").bitsToF32.toString == "bitcast<f32>(x)"`
- `Vec2Expr("v").bitsToU32.toString == "bitcast<vec2<u32>>(v)"`
- `UVec2Expr("u").bitsToF32.toString == "bitcast<vec2<f32>>(u)"`

**Vector algebra**
- `uvec2(UIntExpr("a"), UIntExpr("b")).toString == "vec2<u32>(a, b)"`
- `(uvec2(…) * uvec2(…)).toString` — expected `"(vec2<u32>(…) * vec2<u32>(…))"`
- `UVec2Expr("u").x.toString == "u.x"`
- Component-wise xor: `UVec2Expr("u").xor(UVec2Expr("v")).toString == "(u ^ v)"`

**`WgslFn` integration**
- `WgslFn[(seed: UInt), UInt]` — verify `data.src` contains `"seed: u32"` and
  `"-> u32"`.
- `WgslFn[(v: UVec2), UVec2]` — verify `"v: vec2<u32>"` and `"-> vec2<u32>"`.
- `WgslFn[(p: UVec3), Vec3]` — mixed types at param and return.
- Apply-site: `val f: WgslFn[(x: UInt), UInt] = WgslFn.raw("f")("return x;")`;
  assert `f(5.u).toString == "f(5u)"` and type is `UIntExpr`.

**Regression**
- One float-DSL sanity test that the existing `Conversion[Int, FloatExpr]`
  path still works — `(42: FloatExpr).toString == "f32(42)"`.

### 2.8 File-change summary (Phase 1)

| Path                                                        | Change                                                                       |
| ----------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `trivalibs/src/utils/numbers/uint.scala`                    | **NEW** — `opaque type UInt = Int` + `.u` extension.                         |
| `src/graphics/math/gpu/int_types.scala`                     | **NEW** — phantom markers `IVec2..4`, `UVec2..4`.                            |
| `src/graphics/math/gpu/expr.scala`                          | **EXTEND** — opaque exprs, ops, bitwise, conversions, bitcasts, constructors. |
| `src/graphics/shader/types.scala`                           | **EXTEND** — `WGSLType[Int/UInt/IVec*/UVec*]`.                               |
| `src/graphics/shader/dsl/types.scala`                       | **EXTEND** — `ToExpr`, `ToLocal` match types.                                |
| `src/graphics/shader/dsl/fn.scala`                          | **EXTEND** — `callExpr[R]` match.                                            |
| `test/shader/IntDsl.test.scala`                             | **NEW** — tests listed in §2.7.                                              |

### 2.9 Reused patterns and utilities

- Opaque-type-inside-`Expr`-object layout — `expr.scala:45-130`.
- `Let* <: Expr & LetExpr`, `Var* <: Expr & VarExpr`, `Const* <: Expr & ConstExpr`
  — lines 82-130.
- Generic `Vec{2,3,4}BaseG[N, V]` / `Vec{2,3,4}ImmutableOpsG[N, V]` traits
  from `graphics.math.cpu.*` — used for float vectors at lines 261-541;
  re-used for integer vectors with different `N` type parameter.
- `NumOps[T]` / `NumExt[T]` from `trivalibs.utils.numbers` — same pattern as
  the existing `FloatExpr` instance at lines 195-255.
- `TypedLocalAccessor` / `buildLocalKinds` — `dsl/types.scala:72-93`.
  The `Var[?]` / `Const[?]` wildcard in `populateKinds` already handles any
  type argument, so new `Var[Int]` / `Var[UVec2]` etc. need no special
  handling beyond adding cases to `ToLocal`.

### 2.10 Phase 1 verification

- `bun run build` compiles — confirms new opaque types, match-type
  extensions, and `WGSLType` givens are consistent.
- `scala test .` passes — all existing tests plus the new
  `IntDsl.test.scala`.
- Manual spot-check: add a one-line `WgslFn[(s: UInt), UInt]` inside any
  example and confirm the generated WGSL compiles when the example renders
  in the browser (`bun run dev`).
- No visual regression on existing examples: `simple_triangle`,
  `buffer_triangle`, `blur`, `painter_dsl`.

---

## 3. Phase 2 — Port `hash.rs`

**Location:** `src/graphics/shader/lib/random/hash.scala`.

Port each Rust function as a `WgslFn`. Use `WgslFn.raw` throughout — the
bodies are short, dominated by bitwise operations, and read most clearly as
literal WGSL strings. The Scala DSL would add line noise without adding
safety, since every operation is a direct intrinsic.

### 3.1 Function table

| Rust                     | Scala `WgslFn`                             | Signature                        |
| ------------------------ | ------------------------------------------ | -------------------------------- |
| `hashi(x: u32)`          | `val hashU32`                              | `WgslFn[(x: UInt), UInt]`        |
| `hashi_triple32(x: u32)` | `val hashU32Triple32`                      | `WgslFn[(x: UInt), UInt]`        |
| `u32_to_f32(x: u32)`     | `val u32ToF32`                             | `WgslFn[(x: UInt), Float]`       |
| `hash(x: u32)`           | `val hash1`                                | `WgslFn[(x: UInt), Float]`       |
| `hash21i(p: UVec2)`      | `val hash21i`                              | `WgslFn[(p: UVec2), UInt]`       |
| `hash21(p: UVec2)`       | `val hash21`                               | `WgslFn[(p: UVec2), Float]`      |
| `hash2di(v: UVec2)`      | `val hash2di`                              | `WgslFn[(v: UVec2), UVec2]`      |
| `hash2d(v: UVec2)`       | `val hash2d`                               | `WgslFn[(v: UVec2), Vec2]`       |
| `hash3di(v: UVec3)`      | `val hash3di`                              | `WgslFn[(v: UVec3), UVec3]`      |
| `hash3d(v: UVec3)`       | `val hash3d`                               | `WgslFn[(v: UVec3), Vec3]`       |
| `hash4di(v: UVec4)`      | `val hash4di`                              | `WgslFn[(v: UVec4), UVec4]`      |
| `hash4d(v: UVec4)`       | `val hash4d`                               | `WgslFn[(v: UVec4), Vec4]`       |

### 3.2 Float-input ergonomic wrappers

Callers often have `Vec2` / `Vec3` positions and want a normalised `f32` or
`Vec*` hash without writing `bitcast<vec2<u32>>(pos)` manually. Provide thin
wrappers:

```scala
val hash2dFromVec: WgslFn[(v: Vec2), Vec2] =
  WgslFn.raw("hash2d_from_vec")("return hash2d(bitcast<vec2<u32>>(v));")
val hash3dFromVec: WgslFn[(v: Vec3), Vec3] = /* similar */
val hash4dFromVec: WgslFn[(v: Vec4), Vec4] = /* similar */
val hash1FromFloat: WgslFn[(x: Float), Float] =
  WgslFn.raw("hash1_from_float")("return hash(bitcast<u32>(x));")
```

These `WgslFn`s call other `WgslFn`s by name — the caller must register both
the underlying and the wrapper via `program.fn(...)`. Registration is
idempotent (see `program.scala:...`), so double-registration of
`hash2d` when both `hash2d` and `hash2dFromVec` are used is free.

### 3.3 Body style

Port the Rust body verbatim to WGSL. Example (Rust `hashi`):

```rust
pub fn hashi(mut x: u32) -> u32 {
    x ^= x >> 16; x = x.wrapping_mul(0x21f0aaad);
    x ^= x >> 15; x = x.wrapping_mul(0xd35a2d97);
    x ^= x >> 15;
    x
}
```

becomes:

```scala
val hashU32: WgslFn[(x: UInt), UInt] = WgslFn.raw("hash_u32"):
  """  var v = x;
  v ^= v >> 16u; v = v * 0x21f0aaadu;
  v ^= v >> 15u; v = v * 0xd35a2d97u;
  v ^= v >> 15u;
  return v;"""
```

WGSL `u32` arithmetic wraps by default — no explicit `wrapping_mul` needed.

### 3.4 Tests

**New file:** `test/shader/lib/HashFns.test.scala`.

- Each `WgslFn.src` contains the expected operations (`0x21f0aaad`, `>> 16u`,
  `bitcast<vec2<u32>>`, etc.).
- Composed calls: `hash1.src` references `hash_u32` and `u32_to_f32`.
- Idempotent registration: `program.fn(hashU32); program.fn(hashU32)` emits
  the body exactly once.
- Apply-site typing: `hash2d(uvec2Expr).toString == "hash2d(uvec2Expr)"` and
  resulting type is `Vec2Expr`.

No shader-execution tests — we verify emission only, trusting WGSL to behave
identically to the Rust semantics of the bit-level ops.

---

## 4. Phase 3 — `color.rs` + `coords.rs`

### 4.1 `color.rs` → `src/graphics/shader/lib/color/color.scala`

| Rust                 | Scala `WgslFn`         | Signature                  |
| -------------------- | ---------------------- | -------------------------- |
| `rgb2hsl`            | `val rgb2hsl`          | `WgslFn[(c: Vec3), Vec3]`  |
| `hsv2rgb`            | `val hsv2rgb`          | `WgslFn[(c: Vec3), Vec3]`  |
| `hsv2rgb_smooth`     | `val hsv2rgbSmooth`    | `WgslFn[(c: Vec3), Vec3]`  |
| `hsv2rgb_smoother`   | `val hsv2rgbSmoother`  | `WgslFn[(c: Vec3), Vec3]`  |
| `hsv2rgb_smoothest`  | `val hsv2rgbSmoothest` | `WgslFn[(c: Vec3), Vec3]`  |

Rust uses `NumExt` helpers (`clamp01`, `fit1101`, `smoothen`) and `VecExt`
helpers (`sin`, `cos`, `frct`). All already exist on `FloatExpr` /
`Vec3Expr` in `expr.scala`. Bodies can be written in the Scala DSL or as raw
WGSL — prefer raw WGSL for byte-for-byte parity with the Rust versions and
to avoid translating between DSL operator names.

### 4.2 `coords.rs` → `src/graphics/shader/lib/coords/polar.scala`

Rust `PolarCoord` is a CPU struct. On the shader side, pack `(radius, angle)`
into a `Vec2`:

```scala
val polarToCart: WgslFn[(radiusAngle: Vec2), Vec2] = WgslFn.raw("polar_to_cart"):
  """  return vec2<f32>(radius_angle.x * cos(radius_angle.y),
                        radius_angle.x * sin(radius_angle.y));"""

val cartToPolar: WgslFn[(v: Vec2), Vec2] = WgslFn.raw("cart_to_polar"):
  """  return vec2<f32>(length(v), atan2(v.y, v.x));"""
```

### 4.3 `bits.rs`

The scalar and vector bitcast helpers from §2.3.3 cover `bits.rs` entirely;
no separate file is needed. The Rust `FloatBits` trait's role is filled by
the `.bitsToU32` / `.bitsToF32` extensions on the expression types.

### 4.4 `num_ext.rs` / `vec_ext.rs`

These are already substantially implemented on `FloatExpr` and `Vec*Expr` in
`expr.scala`. The `math-library-design.md` document already tracks parity
gaps (sign, round, trunc, fract, exp, log, inverseSqrt, degrees, radians,
sinh, cosh, tanh, distance, reflect, refract). Closing those gaps is
scheduled in that document; this plan does not re-schedule them.

---

## 5. Phase 4 — Simplex noise

**Location:** `src/graphics/shader/lib/random/simplex.scala`.

Use Stefan Gustavson's widely adopted MIT-licensed WGSL simplex noise port
(from the `webgl-noise` family; the GLSL original is canonical, and multiple
verified WGSL translations exist). Licence header with attribution at the top
of the file.

Wrap each function in `WgslFn.raw`:

- `val simplexNoise2d: WgslFn[(pos: Vec2), Float]`
- `val simplexNoise3d: WgslFn[(pos: Vec3), Float]`
- `val fbmSimplex2d: WgslFn[(pos: Vec2, octaves: Int, freqFactor: Float, amplitudeFactor: Float), Float]`
- `val fbmSimplex3d: WgslFn[(pos: Vec3, octaves: Int, freqFactor: Float, amplitudeFactor: Float), Float]`

`octaves: Int` is the first cross-phase consumer beyond the hash port —
requires Phase 1 to be in place.

The FBM bodies need an integer loop counter and `< octaves` comparison; WGSL
supports both. Sample body for `fbm_simplex_2d`:

```wgsl
  var total: f32 = 0.0;
  var frequency: f32 = 1.0;
  var amplitude: f32 = 1.0;
  var max_amp: f32 = 0.0;
  for (var i: i32 = 0; i < octaves; i = i + 1) {
    total = total + simplex_noise_2d(pos * frequency) * amplitude;
    max_amp = max_amp + amplitude;
    frequency = frequency * freq_factor;
    amplitude = amplitude * amplitude_factor;
  }
  return total / max_amp;
```

---

## 6. Phase 5 — Gaussian blur

**Location:** `src/graphics/shader/lib/blur/blur.scala`.

Consolidate the existing `examples/blur/Blur.scala` (which already defines
`gaussian_blur_9`) into the library. Gaussian weights are public-domain; no
attribution needed beyond citing the standard separable-blur formulation.

- `val gaussianBlur5:  WgslFn[(tex: Texture2D, s: Sampler, uv: Vec2, res: Vec2, dir: Vec2), Vec4]`
- `val gaussianBlur9:  WgslFn[… same params], Vec4]`
- `val gaussianBlur13: WgslFn[… same params], Vec4]`
- `val gaussianBlur:   WgslFn[(tex: Texture2D, s: Sampler, diameter: Float, uv: Vec2, res: Vec2, dir: Vec2), Vec4]`

All parameters are float/Vec types — Phase 5 does **not** depend on Phase 1
and can be scheduled independently. The existing `examples/blur/` code is a
strong reference point; re-using it wholesale is the cheapest path.

---

## 7. Sequencing and risk

**Suggested order of work** once Phase 1 ships:

1. Phase 2 (`hash.rs`) — unblocks the most-requested helper. Small surface.
2. Phase 4 (simplex noise) — high-value visual feature. Depends on Phase 1
   only for `octaves: Int`.
3. Phase 3 (`color.rs` + `coords.rs`) — small, independent files.
4. Phase 5 (blur) — lowest priority (existing `examples/blur` already works
   for callers that need it today).

**Risks and mitigations.**

- *Match-type expansion pitfalls.* `ToExpr` / `ToLocal` have a history of
  subtle failures with type aliases (per `CLAUDE.md` "Critical Type-Level
  Patterns"). Test explicitly with `type Seed = UInt` and
  `WgslFn[(s: Seed), Seed]` to catch this early.
- *Operator ambiguity.* Bitwise operations are exposed as named methods
  (`.xor`, `.shr`, …) rather than symbolic operators specifically to avoid
  resolution conflicts with Scala's built-in `Int` operators.
- *Literal ambiguity.* Not adding `Conversion[Int, IntExpr]` is deliberate —
  keeps the existing `Int → FloatExpr` convenience working. The `IntExpr(42)`
  constructor is explicit; the `.u` extension on `Int → UInt → UIntExpr` is
  the ergonomic unsigned path.
- *Bundle size.* All new types are `opaque` and all new extensions are
  `inline`. Expected runtime cost: zero beyond the existing `Expr` wrapper.
  Verify via the existing JS-size checks if adding these grows the bundle
  noticeably.

---

## 8. Out of scope (reiterated)

- CPU-side integer buffer bindings (vertex attributes, uniform buffers with
  integer fields).
- Scala-side overload of `Conversion[Int, FloatExpr]` — behaviour preserved.
- Integer matrices (`IMat*`, `UMat*`) — not supported by WGSL, not needed.
- Rust `trivalibs_core/src/data/{grid,neighbour_list,vertex_index}` — CPU
  data structures, outside `trivalibs_nostd` scope.
- Parity closure for `num_ext` / `vec_ext` — tracked separately in
  [math-library-design.md](math-library-design.md).
