# Math Library — Design & Implementation Reference

Living reference for the CPU/GPU math library in `src/graphics/math/`. Tracks
design principles, the complete operation inventory (done and planned), and
implementation status.

**Driving goal**: The math library must support the `graphics.scene` layer —
`Transform` (TRS composition via `Quat`), `PerspectiveCamera` (perspective
projection, view matrix), and `SceneObject` (model/view/projection/normal
matrices). See `documents/transform-camera-scene-design.md` for the full spec.
The planned additions in §8.2 are prioritised to unblock that layer.

---

## Table of Contents

1. [Design Principles](#1-design-principles)
2. [Type Inventory](#2-type-inventory)
3. [Scalar Operations](#3-scalar-operations)
4. [Vector Operations](#4-vector-operations)
5. [Matrix Operations](#5-matrix-operations)
6. [Quaternion](#6-quaternion)
7. [Constructors and Swizzles (GPU DSL)](#7-constructors-and-swizzles-gpu-dsl)
8. [Implementation Status](#8-implementation-status)

---

## 1. Design Principles

### 1.1 CPU/GPU Naming Parity

Every math operation must use the **same name and syntax** on CPU (`Vec3`,
`Mat4`, `NumExt`) and GPU (DSL expression types `Vec3Expr`, `Mat4Expr`,
`FloatExpr`). The goals and rules:

- **Prefer isomorphic operations** — if an operation can be efficiently
  expressed on both CPU and GPU with the same name and semantics, add it to
  both. User code should not need to know whether it's running on CPU or GPU.
- **CPU helpers are welcome** when they improve ergonomics and can be
  implemented in terms of isomorphic primitives (e.g. `clamp01`, `fit0111`,
  `smoothstep`, matrix constructors, `Quat`). CPU-only utilities that have no
  GPU analog (serialization, string formatting, debug printing) go in separate
  CPU-only packages.
- **Extension method syntax over free functions.** Match the existing `x.sin`,
  `x.clamp(lo, hi)`, `v.dot(w)` pattern. Prefer `x.log` over `math.log(x)` — all
  math in user code should read the same on CPU and GPU.
- **Free functions only for operations with no natural receiver** (e.g.
  `select(f, t, cond)` — ternary-like).

### 1.2 Immutable vs Mutable Naming

| Form                  | Trait          | Allocates? | Works on tuples? | Returns      | Example                      |
| --------------------- | -------------- | ---------- | ---------------- | ------------ | ---------------------------- |
| Present tense (WGSL)  | `ImmutableOps` | yes        | yes              | new instance | `v.normalize`, `m.transpose` |
| Operator `+` / `-`    | `ImmutableOps` | yes        | yes              | new instance | `v + w`, `m * n`             |
| Verb + `Self`         | `MutableOps`   | no         | no               | `self`       | `v.normalizeSelf`            |
| Verb + `To(out, ...)` | `MutableOps`   | no         | no               | `out`        | `v.normalizeTo(out)`         |
| Operator `+=` / `-=`  | `MutableOps`   | no         | no               | `Unit`       | `m += other`                 |

MutableOps have **no GPU equivalent** — WGSL is a functional language with no
in-place mutation. MutableOps remain CPU-only.

### 1.3 Numeric Types

- **`Double`** is the default for Scala-side math (native JS `number`).
- **`Float`** is used only in GPU buffers (`Vec2Buffer`, `Mat4Buffer`) for
  WebGPU upload.
- Both `Vec2` (Double) and `Vec2f` (Float) map to `vec2<f32>` in WGSL — WGSL
  does not support `f64`.

### 1.4 Trait Structure

```
Vec*Base[Num, Vec]          — read-only accessors (.x/.y/…) + scalar-returning ops (.dot, .length,
                               .determinant); no allocation, no abstract create — safe for all types
Vec*Mutable[Num, Vec]       — extends Base, adds field setters
Vec*ImmutableOps[Num, Vec]  — allocating ops returning a new instance (via abstract create):
                               arithmetic operators (+,-,*,/), normalize, swizzles, etc.
Vec*MutableOps[Num, Vec]    — in-place ops writing into a target: *Self, *To(out), +=/-=

Mat*Base[Num, Mat]          — read-only accessors (.mColRow, col/row getters) + scalar-returning ops
                               (.determinant); formerly also carried by Mat*SharedOps — now merged here
Mat*Mutable[Num, Mat]       — extends Base, adds field setters, col/row setters
Mat*ImmutableOps[Num, Mat]  — allocating ops: arithmetic operators, transpose, constructors, etc.
Mat*MutableOps[Num, Mat]    — in-place ops: *Self, *To(out), +=/-=

QuatImmutableOps[Num, Q]    — quat ops returning a new instance (quatMul, quatRotate, slerp, toMat4, …)
QuatMutableOps[Num, Q]      — quat ops writing into a target (quatMulSelf, conjugateSelf, setFrom*, …)
                               Quat base accessors are provided by Vec4Base[Num, Q] (same layout)
```

> **Note on `Mat*SharedOps`**: This trait was removed. The ops it held
> (`.determinant`) have no separate return-type issue with `create` — they
> return scalars. They now live in `Mat*Base` alongside other scalar-returning
> accessors. GPU expr overrides via extension methods in `expr.scala` as usual.

### 1.5 Column-Major Convention

All matrices use **column-major storage** with `mColRow` field naming: `m10` =
column 1, row 0. This matches WGSL and WebGPU conventions.

---

## 2. Type Inventory

### CPU Types

| Category   | Double (default)    | Float variant         | GPU buffer (F32) |
| ---------- | ------------------- | --------------------- | ---------------- |
| 2D vector  | `Vec2`, `Vec2Tuple` | `Vec2f`, `Vec2fTuple` | `Vec2Buffer`     |
| 3D vector  | `Vec3`, `Vec3Tuple` | `Vec3f`, `Vec3fTuple` | `Vec3Buffer`     |
| 4D vector  | `Vec4`, `Vec4Tuple` | `Vec4f`, `Vec4fTuple` | `Vec4Buffer`     |
| 2×2 matrix | `Mat2`, `Mat2Tuple` | —                     | `Mat2Buffer`     |
| 3×3 matrix | `Mat3`, `Mat3Tuple` | —                     | `Mat3Buffer`     |
| 4×4 matrix | `Mat4`, `Mat4Tuple` | —                     | `Mat4Buffer`     |
| Quaternion | `Quat` (planned)    | —                     | via `Vec4Buffer` |

### GPU DSL Expression Types (`src/graphics/math/gpu/expr.scala`)

| Type        | Wraps    | Represents                    |
| ----------- | -------- | ----------------------------- |
| `FloatExpr` | `String` | WGSL `f32` expression         |
| `Vec2Expr`  | `String` | WGSL `vec2<f32>` expression   |
| `Vec3Expr`  | `String` | WGSL `vec3<f32>` expression   |
| `Vec4Expr`  | `String` | WGSL `vec4<f32>` expression   |
| `Mat2Expr`  | `String` | WGSL `mat2x2<f32>` expression |
| `Mat3Expr`  | `String` | WGSL `mat3x3<f32>` expression |
| `Mat4Expr`  | `String` | WGSL `mat4x4<f32>` expression |
| `BoolExpr`  | `String` | WGSL `bool` expression        |
| `Texture2D` | `String` | WGSL `texture_2d<f32>` handle |
| `Sampler`   | `String` | WGSL `sampler` handle         |

---

## 3. Scalar Operations

### 3.1 CPU/GPU Scalar Operation Mapping

`NumExt` (CPU, in `trivalibs`) ↔ `FloatExpr` extensions (GPU DSL).

| CPU (`NumExt`)         | GPU (`FloatExpr`)      | WGSL Output             | Status        |
| ---------------------- | ---------------------- | ----------------------- | ------------- |
| `x.sin`                | `x.sin`                | `sin(x)`                | ✅ Done       |
| `x.cos`                | `x.cos`                | `cos(x)`                | ✅ Done       |
| `x.tan`                | `x.tan`                | `tan(x)`                | ✅ Done       |
| `x.asin`               | `x.asin`               | `asin(x)`               | ✅ Done       |
| `x.acos`               | `x.acos`               | `acos(x)`               | ✅ Done       |
| `x.atan`               | `x.atan`               | `atan(x)`               | ✅ Done       |
| `x.atan2(y)`           | `x.atan2(y)`           | `atan2(x, y)`           | ✅ Done       |
| `x.sqrt`               | `x.sqrt`               | `sqrt(x)`               | ✅ Done       |
| `x.pow(e)`             | `x.pow(e)`             | `pow(x, e)`             | ✅ Done       |
| `x.abs`                | `x.abs`                | `abs(x)`                | ✅ Done       |
| `x.floor`              | `x.floor`              | `floor(x)`              | ✅ Done       |
| `x.ceil`               | `x.ceil`               | `ceil(x)`               | ✅ Done       |
| `x.clamp(lo, hi)`      | `x.clamp(lo, hi)`      | `clamp(x, lo, hi)`      | ✅ Done       |
| `x.clamp01`            | `x.clamp01`            | `saturate(x)`           | ✅ Done       |
| `x.fit0111`            | `x.fit0111`            | `(x * 2.0 - 1.0)`       | ✅ Done       |
| `x.fit1101`            | `x.fit1101`            | `(x * 0.5 + 0.5)`       | ✅ Done       |
| `x.min(y)`             | `x.min(y)`             | `min(x, y)`             | ✅ Done       |
| `x.max(y)`             | `x.max(y)`             | `max(x, y)`             | ✅ Done       |
| `x.mix(b, t)`          | `x.mix(b, t)`          | `mix(x, b, t)`          | ✅ Done       |
| `x.step(edge)`         | `x.step(edge)`         | `step(edge, x)`         | ✅ Done       |
| `x.smoothstep(lo, hi)` | `x.smoothstep(lo, hi)` | `smoothstep(lo, hi, x)` | ✅ Done       |
| `x.fma(b, c)`          | `x.fma(b, c)`          | `fma(x, b, c)`          | ✅ Done       |
| `x.sign`               | `x.sign`               | `sign(x)`               | 📋 Add NumExt |
| `x.round`              | `x.round`              | `round(x)`              | 📋 Add NumExt |
| `x.trunc`              | `x.trunc`              | `trunc(x)`              | 📋 Add NumExt |
| `x.fract`              | `x.fract`              | `fract(x)`              | 📋 Add NumExt |
| `x.exp`                | `x.exp`                | `exp(x)`                | 📋 Add NumExt |
| `x.exp2`               | `x.exp2`               | `exp2(x)`               | 📋 Add NumExt |
| `x.log`                | `x.log`                | `log(x)`                | 📋 Add NumExt |
| `x.log2`               | `x.log2`               | `log2(x)`               | 📋 Add NumExt |
| `x.inverseSqrt`        | `x.inverseSqrt`        | `inverseSqrt(x)`        | 📋 Add NumExt |
| `x.degrees`            | `x.degrees`            | `degrees(x)`            | 📋 Add NumExt |
| `x.radians`            | `x.radians`            | `radians(x)`            | 📋 Add NumExt |
| `x.sinh`               | `x.sinh`               | `sinh(x)`               | 📋 Add NumExt |
| `x.cosh`               | `x.cosh`               | `cosh(x)`               | 📋 Add NumExt |
| `x.tanh`               | `x.tanh`               | `tanh(x)`               | 📋 Add NumExt |

> **Note on argument order**: `step` and `smoothstep` have reversed argument
> order vs WGSL. The extension syntax reads naturally: `x.smoothstep(lo, hi)` =
> "smooth-step x between lo and hi". The emitted WGSL correctly swaps them.

> **Planned NumExt additions**: The 14 rows marked "Add NumExt" currently exist
> only in the GPU DSL. They should be added to the `NumExt` trait in `trivalibs`
> so that scalar math reads identically on CPU and GPU — prefer `x.log` over
> `math.log(x)` in all user code.

---

## 4. Vector Operations

### 4.1 Vec2 / Vec3 / Vec4 — Shared Operations

CPU traits: `Vec*Base`, `Vec*ImmutableOps`. GPU: `Vec*Expr` extensions in
`expr.scala` + `local_ops.scala`.

| CPU                    | GPU                    | WGSL Output           | Status              |
| ---------------------- | ---------------------- | --------------------- | ------------------- |
| `v + w`                | `v + w`                | `(v + w)`             | ✅ Done             |
| `v - w`                | `v - w`                | `(v - w)`             | ✅ Done             |
| `v * w`                | `v * w`                | `(v * w)`             | ✅ Done (component) |
| `v * s`                | `v * s`                | `(v * s)`             | ✅ Done             |
| `v / w`                | `v / w`                | `(v / w)`             | ✅ Done (component) |
| `v / s`                | `v / s`                | `(v / s)`             | ✅ Done             |
| `-v`                   | `-v`                   | `(-v)`                | ✅ Done             |
| `v.dot(w)`             | `v.dot(w)`             | `dot(v, w)`           | ✅ Done             |
| `v.length`             | `v.length`             | `length(v)`           | ✅ Done             |
| `v.length_squared`     | `v.length_squared`     | `dot(v, v)`           | ✅ Done             |
| `v.normalize`          | `v.normalize`          | `normalize(v)`        | ✅ Done             |
| `v.abs`                | `v.abs`                | `abs(v)`              | ✅ Done             |
| `v.floor`              | `v.floor`              | `floor(v)`            | ✅ Done             |
| `v.ceil`               | `v.ceil`               | `ceil(v)`             | ✅ Done             |
| `v.fract`              | `v.fract`              | `fract(v)`            | ✅ Done             |
| `v.sin`                | `v.sin`                | `sin(v)`              | ✅ Done             |
| `v.cos`                | `v.cos`                | `cos(v)`              | ✅ Done             |
| `v.clamp(lo, hi)`      | `v.clamp(lo, hi)`      | `clamp(v, lo, hi)`    | ✅ Done             |
| `v.clamp01`            | `v.clamp01`            | `saturate(v)`         | ✅ Done             |
| `v.min(w)`             | `v.min(w)`             | `min(v, w)`           | ✅ Done             |
| `v.max(w)`             | `v.max(w)`             | `max(v, w)`           | ✅ Done             |
| `v.mix(w, t)`          | `v.mix(w, t)`          | `mix(v, w, t)`        | ✅ Done             |
| `v.step(edge)`         | `v.step(edge)`         | `step(edge, v)`       | ✅ Done             |
| `v.smoothstep(lo, hi)` | `v.smoothstep(lo, hi)` | `smoothstep(lo,hi,v)` | ✅ Done             |
| `v.fma(w, c)`          | `v.fma(w, c)`          | `fma(v, w, c)`        | ✅ Done             |
| —                      | `v.distance(w)`        | `distance(v, w)`      | 📋 Add VecBase      |
| —                      | `v.reflect(n)`         | `reflect(v, n)`       | 📋 Add ImmutableOps |
| —                      | `v.refract(n, eta)`    | `refract(v, n, eta)`  | 📋 Add ImmutableOps |

### 4.2 Vec3-Only Operations

| CPU          | GPU          | WGSL Output   | Status  |
| ------------ | ------------ | ------------- | ------- |
| `v.cross(w)` | `v.cross(w)` | `cross(v, w)` | ✅ Done |

### 4.3 Component Access & Aliases

| CPU         | GPU         | WGSL Output | Types       |
| ----------- | ----------- | ----------- | ----------- |
| `.x` / `.r` | `.x` / `.r` | `.x`        | All vectors |
| `.y` / `.g` | `.y` / `.g` | `.y`        | All vectors |
| `.z` / `.b` | `.z` / `.b` | `.z`        | Vec3, Vec4  |
| `.w` / `.a` | `.w` / `.a` | `.w`        | Vec4 only   |

### 4.4 Swizzles

Swizzle methods are implemented in **both** `Vec*ImmutableOps` (CPU, creating a
concrete vector) and `Vec*Expr` extensions (GPU DSL, emitting a WGSL swizzle
expression). CPU variants are `inline` and allocate using the standard
constructor. The naming rule matches WGSL — field names in component order.

| Swizzle                                 | CPU output type | GPU output type | Status       |
| --------------------------------------- | --------------- | --------------- | ------------ |
| `.xy`, `.xz`, `.yz`, `.xw`, `.zw`       | `Vec2Tuple`     | `Vec2Expr`      | 📋 Add CPU   |
| `.xyz`, `.xyw`, `.xzw`, `.yzw`, `.rgb`  | `Vec3Tuple`     | `Vec3Expr`      | 📋 Add CPU   |
| (GPU swizzles currently done)           |                 | `Vec2/3Expr`    | ✅ GPU done  |
| — (additional swizzles added as needed) |                 |                 | 📋 As needed |

---

## 5. Matrix Operations

### 5.1 Shared Matrix Operations (All Mat\*)

CPU: `Mat*Base` (scalar-returning) and `Mat*ImmutableOps` (allocating). GPU:
`Mat*Expr` extensions.

| CPU             | GPU             | WGSL Output      | Trait (CPU)    | Status                      |
| --------------- | --------------- | ---------------- | -------------- | --------------------------- |
| `m + n`         | `m + n`         | `(m + n)`        | `ImmutableOps` | ✅ Done                     |
| `m - n`         | `m - n`         | `(m - n)`        | `ImmutableOps` | ✅ Done                     |
| `m * s`         | `m * s`         | `(m * s)`        | `ImmutableOps` | ✅ Done                     |
| `m * n`         | `m * n`         | `(m * n)`        | `ImmutableOps` | ✅ Done                     |
| `m * v`         | `m * v`         | `(m * v)`        | `ImmutableOps` | ✅ Done                     |
| `m.transpose`   | `m.transpose`   | `transpose(m)`   | `ImmutableOps` | ✅ Done                     |
| `m.determinant` | `m.determinant` | `determinant(m)` | `Base`         | ✅ Done                     |
| `m.inverse`     | —               | —                | `ImmutableOps` | CPU only (no WGSL built-in) |

### 5.2 Mat4 Constructors (in `Mat4ImmutableOps`)

These are static factory methods on the companion object:

| Constructor                                       | Description                                                | Status     |
| ------------------------------------------------- | ---------------------------------------------------------- | ---------- |
| `Mat4.identity`                                   | Identity matrix                                            | ✅ Done    |
| `Mat4.fromRotationX(a)`                           | Rotation around X axis                                     | ✅ Done    |
| `Mat4.fromRotationY(a)`                           | Rotation around Y axis                                     | ✅ Done    |
| `Mat4.fromRotationZ(a)`                           | Rotation around Z axis                                     | ✅ Done    |
| `Mat4.fromTranslation(v)`                         | Translation matrix from `Vec3`                             | 📋 Planned |
| `Mat4.fromScale(v)`                               | Non-uniform scale from `Vec3`                              | 📋 Planned |
| `Mat4.fromScale(s)`                               | Uniform scale from scalar                                  | 📋 Planned |
| `Mat4.fromAxisAngle(axis, a)`                     | Rotation around arbitrary axis                             | 📋 Planned |
| `Mat4.fromQuat(q)`                                | Build rotation matrix from quaternion                      | 📋 Planned |
| `Mat4.fromTranslationRotationScale(t, r, s)`      | Full TRS matrix in one step (used by `Transform.toMatrix`) | 📋 Planned |
| `Mat4.perspective(fov, aspect, near, far)`        | Perspective projection (reversed-Z, infinite far optional) | 📋 Planned |
| `Mat4.lookAt(eye, center, up)`                    | View matrix                                                | 📋 Planned |
| `Mat4.ortho(left, right, bottom, top, near, far)` | Orthographic projection                                    | 📋 Planned |
| `Mat4.from[Num2,Mat2_](other)`                    | Convert from another Mat4 type                             | ✅ Done    |

### 5.3 Mat4 Apply Transforms (in `Mat4ImmutableOps` — pre/post multiply)

These apply a transform to an existing matrix (post-multiply):

| Method                       | Equivalent to                | Status     |
| ---------------------------- | ---------------------------- | ---------- |
| `m.rotateX(a)`               | `m * fromRotationX(a)`       | ✅ Done    |
| `m.rotateY(a)`               | `m * fromRotationY(a)`       | ✅ Done    |
| `m.rotateZ(a)`               | `m * fromRotationZ(a)`       | ✅ Done    |
| `m.translate(v)`             | `m * fromTranslation(v)`     | 📋 Planned |
| `m.scale(v)`                 | `m * fromScale(v)`           | 📋 Planned |
| `m.rotateAxisAngle(axis, a)` | `m * fromAxisAngle(axis, a)` | 📋 Planned |

### 5.4 Mat4 Mutable Variants

All immutable ops have corresponding mutable `*Self` / `*To(out)` variants via
`Mat4MutableOps`. Mutable variants for new constructors should be added where
useful in hot paths (e.g., `m.rotateSelf(a)`, `m.translateSelf(v)`).

### 5.5 Notes on WebGPU Conventions

- **Reversed-Z projection** (`near → 1.0, far → 0.0`) is preferred for WebGPU —
  better depth precision. Optional: offer both regular and reversed-Z variants.
- **Right-handed coordinate system** — same as WGSL and wgpu-matrix.
- **Column-major storage** — already the project convention.

---

## 6. Quaternion

Quaternions are a compact representation of 3D rotations (4 floats vs 16 for
Mat4). They are cheaper to interpolate (slerp), compose, and invert. The Rust
painter uses `glam::Quat` extensively.

### 6.1 Storage Design

Quaternion layout is `(x, y, z, w)` — identical to `Vec4`. Three storage forms:

| Type                       | Base accessors | Immutable ops        | Mutable ops        |
| -------------------------- | -------------- | -------------------- | ------------------ |
| `class Quat`               | `Vec4Mutable`  | `QuatImmutableOps` ✓ | `QuatMutableOps` ✓ |
| `Vec4Tuple` / `Vec4fTuple` | `Vec4Base`     | `QuatImmutableOps` ✓ | —                  |
| `StructRef[Vec4Buffer]`    | `Vec4Base`     | —                    | `QuatMutableOps` ✓ |

`Vec4Tuple` and `Vec4Buffer` can hold a quaternion with no conversion — they
already have the right layout. `Vec4` (mutable class) is **not** given quat ops
— use `Quat` instead when quat semantics are needed on a mutable value.

The base field accessors (`.x`, `.y`, `.z`, `.w`) come from `Vec4Base[Num, Q]`
and `Vec4Mutable[Num, Q]` — no separate `QuatBase` trait is needed.

> **No WGSL type**: quaternions are CPU-only. Convert to `Mat4` before
> uploading. No `QuatExpr` DSL type is planned.

### 6.2 `QuatImmutableOps[Num, Q]` — Allocating Operations

All quat-specific operations use distinct `quat*`-prefixed names so that Vec4
and quat operations can coexist on the same type (`Vec4Tuple`) without
ambiguity. No operator overloads in the trait.

```scala
trait QuatImmutableOps[Num, Q]:
  extension (q: Q)(using Vec4Base[Num, Q])
    def quatMul(p: Q): Q                                           // Hamilton product → new Q
    def quatRotate[V](v: V)(using Vec3ImmutableOps[Num, V]): V    // rotate Vec3 → new V
    def quatConjugate: Q                                           // (−x, −y, −z, w) → new Q
    def quatInverse: Q                                             // conjugate / |q|² → new Q
    def slerp(p: Q, t: Num): Q                                    // spherical linear interp
    def toMat4: Mat4                                               // 4×4 rotation matrix
    def toAxisAngle[V](using Vec3ImmutableOps[Num, V]): (V, Num)  // extract axis + angle
```

`normalize`, `length`, `dot` are **not** in `QuatImmutableOps` — they are
already provided by `Vec4Base` / `Vec4ImmutableOps`. `slerp` gets no `quat`
prefix because it has no Vec4 analogue (Vec4 uses `mix` for linear lerp).

### 6.3 `QuatMutableOps[Num, Q]` — In-Place Operations

In-place operations for mutable types (`Quat`, `StructRef[Vec4Buffer]`). No WGSL
equivalent — CPU only, no GPU DSL entry.

```scala
trait QuatMutableOps[Num, Q]:
  extension (q: Q)(using Vec4Mutable[Num, Q])
    def quatMulSelf(p: Q): Unit                                        // Hamilton product, in-place
    def conjugateSelf: Unit                                            // (−x, −y, −z, w) in-place
    def inverseSelf: Unit                                              // conjugate/|q|² in-place
    def setFromAxisAngle[V](axis: V, angle: Num)(using Vec3Base[Num, V]): Unit
    def setFromRotationX(angle: Num): Unit
    def setFromRotationY(angle: Num): Unit
    def setFromRotationZ(angle: Num): Unit
    def setFromLookRotation[V](fwd: V, up: V)(using Vec3Base[Num, V]): Unit
```

`normalizeSelf` is already in `Vec4MutableOps` and applies to quaternions
unchanged — not duplicated here.

### 6.4 `class Quat` — Dedicated Mutable Type

`Quat` is a mutable class alongside `Vec4`. It is the reference implementation:
it implements all four trait tiers — `Vec4Mutable` (base accessors + setters),
`QuatImmutableOps`, and `QuatMutableOps` — and additionally defines operator
aliases on the class that have unambiguous quat semantics:

```scala
class Quat(
  var x: Double = 0.0,
  var y: Double = 0.0,
  var z: Double = 0.0,
  var w: Double = 1.0,   // identity
)

object Quat:
  given Vec4Mutable[Double, Quat]      = ...
  given QuatImmutableOps[Double, Quat] = ...
  given QuatMutableOps[Double, Quat]   = ...
```

Operator aliases on `Quat` — unambiguous since `Quat` is the dedicated type:

```scala
extension (q: Quat)
  def *(p: Quat): Quat    = q.quatMul(p)      // Hamilton product
  def *(v: Vec3): Vec3    = q.quatRotate(v)   // rotate Vec3
  def unary_- : Quat      = q.quatConjugate   // -q = conjugate
```

`Vec4`-style operators (`+`, `-`, scalar `*`) are **not** added to `Quat` since
they have no meaningful quaternion interpretation.

### 6.5 Vec4Tuple and Vec4Buffer — Both Op Sets

`Vec4Tuple` / `Vec4fTuple` get `QuatImmutableOps`; `StructRef[Vec4Buffer]` gets
`QuatMutableOps`. Vec4 operators take priority on each type; quat operations are
accessed via the `quat*` prefixed named methods:

```scala
// Quat — the primary type; has both immutable and mutable quat ops + operators
val q: Quat = Quat.fromRotationY(0.5)
val rotated  = q.quatRotate(Vec3(1, 0, 0))   // QuatImmutableOps → new Vec3
val composed = q.quatMul(q2)                  // QuatImmutableOps → new Quat
val composed2 = q * q2                        // operator alias for quatMul
val v        = q * Vec3(1, 0, 0)             // operator alias for quatRotate
q.quatMulSelf(q2)                             // QuatMutableOps, in-place
q.setFromRotationX(0.3)                       // QuatMutableOps, reset

// Vec4Tuple — both Vec4ImmutableOps and QuatImmutableOps, no mutable ops
val qt: Vec4Tuple = (0.0, 0.0, 0.0, 1.0)    // quaternion stored as tuple
val rotated2 = qt.quatRotate(Vec3(1, 0, 0)) // QuatImmutableOps
val scaled   = qt * 2.0                      // Vec4ImmutableOps (component-wise, not quat!)

// StructRef[Vec4Buffer] — Vec4MutableOps and QuatMutableOps available
myBuf.quatMulSelf(other)    // QuatMutableOps, in-place
myBuf.setFromRotationY(0.5) // QuatMutableOps, reset
myBuf.normalizeSelf         // Vec4MutableOps, in-place
```

### 6.6 Constructors — `object Quat`

Constructors return `Quat` (mutable), which can be copied into any storage:

| Constructor                         | Description                                |
| ----------------------------------- | ------------------------------------------ |
| `Quat.identity`                     | `(0, 0, 0, 1)` — no rotation               |
| `Quat.fromRotationX(a: Double)`     | Rotation around X axis                     |
| `Quat.fromRotationY(a: Double)`     | Rotation around Y axis                     |
| `Quat.fromRotationZ(a: Double)`     | Rotation around Z axis                     |
| `Quat.fromAxisAngle(axis: Vec3, a)` | Rotation around arbitrary normalized axis  |
| `Quat.fromLookRotation(fwd, up)`    | Orient `-Z` toward `fwd`, `+Y` toward `up` |
| `Quat.fromMat4(m: Mat4)`            | Extract rotation from upper 3×3            |

### 6.7 File Layout

```
src/graphics/math/cpu/quat.scala
  — trait QuatImmutableOps[Num, Q]
  — trait QuatMutableOps[Num, Q]
  — class Quat(x, y, z, w)
  — object Quat: constructors, given Vec4Mutable, given QuatImmutableOps,
      given QuatMutableOps, operator extensions (* Hamilton, * Vec3, unary -)
  — given QuatImmutableOps[Double, Vec4Tuple]            // in Vec4Tuple companion
  — given QuatImmutableOps[Float,  Vec4fTuple]           // in Vec4fTuple companion
  — given QuatMutableOps[Float,  StructRef[Vec4Buffer]]  // in Vec4Buffer companion
```

---

## 7. Constructors

### 7.1 Vector Constructors

Isomorphic constructors on CPU and GPU — same overload set, differing only in
case (CPU uses the type name, GPU uses a lowercase free function to avoid
collision with the CPU types):

| CPU                        | GPU DSL            |
| -------------------------- | ------------------ |
| `Vec2(x, y)`               | `vec2(x, y)`       |
| `Vec3(x, y, z)`            | `vec3(x, y, z)`    |
| `Vec3(xy: Vec2, z)`        | `vec3(xy, z)`      |
| `Vec3(x, yz: Vec2)`        | `vec3(x, yz)`      |
| `Vec4(x, y, z, w)`         | `vec4(x, y, z, w)` |
| `Vec4(xyz: Vec3, w)`       | `vec4(xyz, w)`     |
| `Vec4(xy: Vec2, z, w)`     | `vec4(xy, z, w)`   |
| `Vec4(xy: Vec2, zw: Vec2)` | `vec4(xy, zw)`     |
| `Vec4(x, yzw: Vec3)`       | `vec4(x, yzw)`     |

CPU: `apply` overloads on the companion object, creating concrete instances.
GPU: lowercase free functions emitting inline WGSL expressions. Status: ✅ Done
on both CPU and GPU.

### 7.2 Matrix Constructors (GPU DSL — Low Priority)

WGSL supports constructing matrices from column vectors. Matching GPU DSL
constructors:

```scala
mat4(col0: Vec4Expr, col1: Vec4Expr, col2: Vec4Expr, col3: Vec4Expr): Mat4Expr
mat3(col0: Vec3Expr, col1: Vec3Expr, col2: Vec3Expr): Mat3Expr
mat2(col0: Vec2Expr, col1: Vec2Expr): Mat2Expr
```

In practice, transform matrices (MVP, normal, etc.) are computed on the CPU and
passed to shaders as `Mat4` uniforms — no quaternion or TRS computation happens
on the GPU. These constructors are therefore low priority; they may be useful
for shaders that assemble a matrix from separate per-column uniforms, but that
pattern is uncommon. Tracked as P6 in §8.2.

---

## 8. Implementation Status

### 8.1 Completed

- **Vec2, Vec3, Vec4** — all CPU types (mutable class, tuple, F32 buffer), full
  `Base`, `ImmutableOps`, `MutableOps` trait instances ✅
- **Mat2, Mat3, Mat4** — all CPU types (mutable class, tuple, F32 buffer), full
  `Base`, `SharedOps`, `ImmutableOps`, `MutableOps` trait instances ✅
- **Mat4 per-axis rotation constructors** — `fromRotationX/Y/Z`, `identity` ✅
- **Mat4 apply-transform methods** — `rotateX/Y/Z` (immutable + mutable) ✅
- **GPU DSL expression types** — `FloatExpr`, `Vec*Expr`, `Mat*Expr`,
  `BoolExpr`, `Texture2D`, `Sampler` ✅
- **GPU DSL scalar operations** — full `FloatExpr` extension set ✅
- **GPU DSL vector operations** — full `Vec*Expr` extension set ✅
- **GPU DSL matrix operations** — `Mat*Expr` `*`, `transpose`, `determinant` ✅
- **GPU DSL constructors** — `vec2`, `vec3`, `vec4` ✅

### 8.2 Planned — Math Library (Priority Order)

**P1 — Needed for `panel_tex` 3D upgrade**

1. `Mat4.fromTranslation(v: Vec3): Mat4`
2. `Mat4.fromScale(v: Vec3): Mat4` and `Mat4.fromScale(s: Double): Mat4`
3. `Mat4.fromTranslationRotationScale(t: Vec3, r: Quat, s: Vec3): Mat4` —
   single-call TRS constructor, used by `Transform.computeMatrix()`
4. `Mat4.perspective(fovY: Double, aspect: Double, near: Double, far: Double): Mat4`
   — reversed-Z WebGPU convention (`near → 1`, infinite far → `0`)
5. `Mat4.lookAt(eye: Vec3, center: Vec3, up: Vec3): Mat4`
6. `m.translate(v: Vec3)` and `m.scale(v: Vec3)` / `m.scale(s: Double)`
   apply-transform methods
7. Corresponding mutable `*Self` / `*To(out)` variants for all of the above

**P2 — Quaternion (needed for smooth rotation in 3D scenes)**

7. `trait QuatImmutableOps[Num, Q]` — allocating ops: `quatMul`, `quatRotate`,
   `quatConjugate`, `quatInverse`, `slerp`, `toMat4`, `toAxisAngle`
8. `trait QuatMutableOps[Num, Q]` — in-place ops: `quatMulSelf`,
   `conjugateSelf`, `inverseSelf`, `setFromAxisAngle`, `setFromRotationX/Y/Z`,
   `setFromLookRotation`
9. `class Quat` (mutable, dedicated type) + `object Quat` constructors:
   `identity`, `fromRotationX/Y/Z`, `fromAxisAngle`, `fromLookRotation` — `Quat`
   implements all: `Vec4Mutable`, `QuatImmutableOps`, `QuatMutableOps`, plus
   operator aliases (`*` = Hamilton product, `* Vec3` = rotate, unary `-` =
   conjugate)
10. `given QuatImmutableOps` for `Vec4Tuple`, `Vec4fTuple` — named quat methods
    alongside their existing Vec4 operators; no mutable ops (tuples are
    immutable)
11. `given QuatMutableOps` for `StructRef[Vec4Buffer]` — in-place quat ops
    alongside existing Vec4 mutable ops; no immutable ops (allocation is
    expensive)

**P3 — Additional convenience constructors**

9. `Mat4.fromAxisAngle(axis: Vec3, angle: Double): Mat4`
10. `Mat4.fromQuat(q: Quat): Mat4`
11. `Mat4.ortho(left, right, bottom, top, near, far): Mat4`
12. `Quat.fromMat4(m: Mat4): Quat`

**P4 — NumExt parity (CPU side of GPU DSL ops)**

13. Add to `trivalibs`: `sign`, `round`, `trunc`, `fract`, `exp`, `exp2`, `log`,
    `log2`, `inverseSqrt`, `degrees`, `radians`, `sinh`, `cosh`, `tanh`

**P5 — Vector additions**

14. `v.distance(w)` — add to `Vec*Base`
15. `v.reflect(n)` — add to `Vec*ImmutableOps`
16. `v.refract(n, eta)` — add to `Vec*ImmutableOps`

**P6 — GPU DSL matrix constructors**

17. `mat2`, `mat3`, `mat4` constructor free-functions from column vectors

### 8.3 Depth Texture Support (Painter)

Tracked separately in `panel-texture-and-effects-plan.md`. Requires:

- `Panel` gains `depthTest: Boolean` flag (default `false`)
- When `depthTest = true`, `ensureSize` allocates a `depth24plus` texture
- Render pass attachment gains `depthStencilAttachment` (load `clear`, store
  `store`, initial value `1.0`)
- Pipeline descriptor gains
  `depthStencil: { format: "depth24plus", depthWriteEnabled: true, depthCompare: "less" }`
- Pipeline cache key gains `|depth` suffix to separate depth-enabled pipelines

---

## 9. File Map

| Path                                              | Contents                                                        |
| ------------------------------------------------- | --------------------------------------------------------------- |
| `src/graphics/math/vec2.scala`                    | `Vec2Base`, `Vec2Mutable`, `Vec2ImmutableOps`, `Vec2MutableOps` |
| `src/graphics/math/vec3.scala`                    | `Vec3Base`, …                                                   |
| `src/graphics/math/vec4.scala`                    | `Vec4Base`, …                                                   |
| `src/graphics/math/mat2.scala`                    | `Mat2Base`, `Mat2SharedOps`, …                                  |
| `src/graphics/math/mat3.scala`                    | `Mat3Base`, `Mat3SharedOps`, …                                  |
| `src/graphics/math/mat4.scala`                    | `Mat4Base`, `Mat4SharedOps`, … **← add new constructors here**  |
| `src/graphics/math/cpu/vec*.scala`                | Concrete CPU types (`Vec2`, `Vec2Tuple`, `Vec2Buffer`, …)       |
| `src/graphics/math/cpu/mat*.scala`                | Concrete CPU types (`Mat4`, `Mat4Tuple`, `Mat4Buffer`, …)       |
| `src/graphics/math/cpu/quat.scala`                | _planned_ `QuatImmutableOps`, `QuatMutableOps`, `class Quat`    |
| `src/graphics/math/gpu/expr.scala`                | GPU DSL expression types + all extensions                       |
| `src/graphics/math/api_and_naming_conventions.md` | Design rationale and naming rules                               |
