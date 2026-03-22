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
`FloatExpr`). When adding operations, the rule is:

- **Only add operations that have a WGSL equivalent.** CPU-only utilities (e.g.
  serialization, string formatting) go in CPU-only packages.
- **Extension method syntax over free functions.** Match the existing `x.sin`,
  `x.clamp(lo, hi)`, `v.dot(w)` pattern.
- **Free functions only for operations with no natural receiver** (e.g.
  `select(f, t, cond)` — ternary-like).

### 1.2 Immutable vs Mutable Naming

| Form                  | Trait          | Allocates? | Works on tuples? | Returns      | Example                      |
| --------------------- | -------------- | ---------- | ---------------- | ------------ | ---------------------------- |
| Present tense (WGSL)  | `ImmutableOps` | yes        | yes              | new instance | `v.normalize`, `m.transpose` |
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
Vec*Base[Num, Vec]          — read-only field accessors (.x/.y/…), scalar ops (.dot, .length)
Vec*Mutable[Num, Vec]       — extends Base, adds field setters
Vec*ImmutableOps[Num, Vec]  — operations returning a new instance (via abstract create)
Vec*MutableOps[Num, Vec]    — operations writing into a target

Mat*Base[Num, Mat]          — read-only field accessors (.mColRow), col/row getters
Mat*Mutable[Num, Mat]       — extends Base, adds field setters, col/row setters
Mat*SharedOps[Num, Mat]     — scalar non-allocating ops (.determinant)
Mat*ImmutableOps[Num, Mat]  — operations returning a new instance (via abstract create)
Mat*MutableOps[Num, Mat]    — operations writing into a target
```

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
| Quaternion | _planned_ `Quat`    | —                     | _planned_        |

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
| —                      | `x.sign`               | `sign(x)`               | 📋 Add NumExt |
| —                      | `x.round`              | `round(x)`              | 📋 Add NumExt |
| —                      | `x.trunc`              | `trunc(x)`              | 📋 Add NumExt |
| —                      | `x.fract`              | `fract(x)`              | 📋 Add NumExt |
| —                      | `x.exp`                | `exp(x)`                | 📋 Add NumExt |
| —                      | `x.exp2`               | `exp2(x)`               | 📋 Add NumExt |
| —                      | `x.log`                | `log(x)`                | 📋 Add NumExt |
| —                      | `x.log2`               | `log2(x)`               | 📋 Add NumExt |
| —                      | `x.inverseSqrt`        | `inverseSqrt(x)`        | 📋 Add NumExt |
| —                      | `x.degrees`            | `degrees(x)`            | 📋 Add NumExt |
| —                      | `x.radians`            | `radians(x)`            | 📋 Add NumExt |
| —                      | `x.sinh`               | `sinh(x)`               | 📋 Add NumExt |
| —                      | `x.cosh`               | `cosh(x)`               | 📋 Add NumExt |
| —                      | `x.tanh`               | `tanh(x)`               | 📋 Add NumExt |

> **Note on argument order**: `step` and `smoothstep` have reversed argument
> order vs WGSL. The extension syntax reads naturally: `x.smoothstep(lo, hi)` =
> "smooth-step x between lo and hi". The emitted WGSL correctly swaps them.

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

### 4.4 Swizzles (GPU DSL — `Vec*Expr` extensions)

| Swizzle                                 | Output type | Implemented  |
| --------------------------------------- | ----------- | ------------ |
| `.xy`, `.xz`, `.yz`, `.xw`, `.zw`       | `Vec2Expr`  | ✅ Done      |
| `.xyz`, `.xyw`, `.xzw`, `.yzw`, `.rgb`  | `Vec3Expr`  | ✅ Done      |
| — (additional swizzles added as needed) |             | 📋 As needed |

---

## 5. Matrix Operations

### 5.1 Shared Matrix Operations (All Mat\*)

| CPU             | GPU             | WGSL Output      | Status                      |
| --------------- | --------------- | ---------------- | --------------------------- |
| `m + n`         | `m + n`         | `(m + n)`        | ✅ Done                     |
| `m - n`         | `m - n`         | `(m - n)`        | ✅ Done                     |
| `m * s`         | `m * s`         | `(m * s)`        | ✅ Done                     |
| `m * n`         | `m * n`         | `(m * n)`        | ✅ Done                     |
| `m * v`         | `m * v`         | `(m * v)`        | ✅ Done                     |
| `m.transpose`   | `m.transpose`   | `transpose(m)`   | ✅ Done                     |
| `m.determinant` | `m.determinant` | `determinant(m)` | ✅ Done                     |
| `m.inverse`     | —               | —                | CPU only (no WGSL built-in) |

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

### 6.1 Design

A `Quat` type stored as `(x, y, z, w)` where `(x, y, z)` is the vector part and
`w` is the scalar part — matching glam, wgpu-matrix, and WGSL convention.

```scala
// CPU mutable class
class Quat(var x: Double = 0.0, var y: Double = 0.0, var z: Double = 0.0, var w: Double = 1.0)

// CPU immutable tuple
type QuatTuple = (Double, Double, Double, Double)

// GPU buffer (for upload as uniform)
type QuatBuffer = (F32, F32, F32, F32)  // same layout as Vec4Buffer
```

> **Note**: Quaternions are **not WGSL types** — there is no `quat` in WGSL.
> They are a CPU-side convenience. To use in a shader, convert to Mat4
> (`Mat4.fromQuat(q)`) or upload as a `Vec4` and reconstruct the rotation matrix
> in the shader. No `QuatExpr` GPU DSL type is planned.

### 6.2 Planned Quat API

#### Constructors

| Method                        | Description                               |
| ----------------------------- | ----------------------------------------- |
| `Quat.identity`               | `(0, 0, 0, 1)` — no rotation              |
| `Quat.fromRotationX(a)`       | Rotation around X axis                    |
| `Quat.fromRotationY(a)`       | Rotation around Y axis                    |
| `Quat.fromRotationZ(a)`       | Rotation around Z axis                    |
| `Quat.fromAxisAngle(axis, a)` | Rotation around arbitrary normalized axis |
| `Quat.fromMat4(m)`            | Extract rotation from upper 3×3           |

#### Operations

| Method          | Description                           |
| --------------- | ------------------------------------- |
| `q * p`         | Compose rotations (Hamilton product)  |
| `q * v` (Vec3)  | Rotate a Vec3 by quaternion           |
| `q.conjugate`   | Conjugate `(−x, −y, −z, w)`           |
| `q.inverse`     | Inverse (conjugate / length²)         |
| `q.normalize`   | Normalize to unit quaternion          |
| `q.length`      | Magnitude                             |
| `q.dot(p)`      | Dot product                           |
| `q.slerp(p, t)` | Spherical linear interpolation        |
| `q.toMat4`      | Convert to 4×4 rotation matrix        |
| `q.toAxisAngle` | Extract `(axis: Vec3, angle: Double)` |

### 6.3 Trait Structure

Quaternions do not fit the `Vec*`/`Mat*` trait hierarchy — their operations are
distinct. A lightweight approach: plain methods directly on `Quat` /
`object Quat` without a trait abstraction (traits only become necessary if
multiple Quat representations are needed, e.g. Float vs Double). If a
`QuatBase[Num, Q]` trait is added later, it can follow the `[Num, Container]`
convention.

---

## 7. Constructors and Swizzles (GPU DSL)

### 7.1 Vector Constructors

Free functions in lowercase — avoids collision with CPU types, matches WGSL
syntax. All implemented.

```scala
vec2(x, y)
vec3(x, y, z)  |  vec3(xy, z)  |  vec3(x, yz)
vec4(x, y, z, w)  |  vec4(xyz, w)  |  vec4(xy, z, w)  |  vec4(xy, zw)  |  vec4(x, yzw)
```

### 7.2 Matrix Constructors (GPU DSL — Planned)

WGSL supports constructing matrices from column vectors. Planned GPU DSL
constructors to match:

```scala
mat4(col0: Vec4Expr, col1: Vec4Expr, col2: Vec4Expr, col3: Vec4Expr): Mat4Expr
mat3(col0: Vec3Expr, col1: Vec3Expr, col2: Vec3Expr): Mat3Expr
mat2(col0: Vec2Expr, col1: Vec2Expr): Mat2Expr
```

These are useful for shaders that construct transformation matrices from
uniforms (e.g. building a rotation matrix from a quaternion uniform in WGSL).

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
3. `Mat4.perspective(fovY: Double, aspect: Double, near: Double, far: Double): Mat4`
   — reversed-Z WebGPU convention (`near → 1`, infinite far → `0`)
4. `Mat4.lookAt(eye: Vec3, center: Vec3, up: Vec3): Mat4`
5. `m.translate(v: Vec3)` and `m.scale(v: Vec3)` / `m.scale(s: Double)`
   apply-transform methods
6. Corresponding mutable `*Self` / `*To(out)` variants for all of the above

**P2 — Quaternion (needed for smooth rotation in 3D scenes)**

7. `class Quat` + `object Quat` with `fromRotationX/Y/Z`, `fromAxisAngle`
8. Quaternion operations: `*`, `*v` (rotate Vec3), `conjugate`, `normalize`,
   `slerp`, `toMat4`

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
| `src/graphics/math/cpu/quat.scala`                | _planned_ `Quat`, `QuatTuple`, `QuatBuffer`                     |
| `src/graphics/math/gpu/expr.scala`                | GPU DSL expression types + all extensions                       |
| `src/graphics/math/api_and_naming_conventions.md` | Design rationale and naming rules                               |
