# scala-webgpu Review TODO

Items identified during the `documents/rust-painter/scala-port-comparison.md`
review. Grouped by scope: **docs**, **API design**, and **examples/codebase**.

---

## Documentation (`scala-port-comparison.md`)

- **Section 9 geometry snippet**: Same fix as above.

### 📝 Noted but not changed

- **`painter.shape` arg order in docs**: The document correctly documents the
  current Scala API (`painter.shape(shade, form)`) and calls out the flip from
  Rust (`p.shape(form, shade)`). See API design item below — once the API is
  changed, the doc note should be removed and all examples updated.

---

## API Design

### 🔄 `painter.shape(shade, form)` — arg order should match Rust

**Current Scala:**

```scala
painter.shape(shade, form)
```

**Rust original:**

```rust
p.shape(form, shade)
```

The current Scala arg order (`shade` first, `form` second) is the reverse of
Rust. Since `trivalibs_painter` is the reference API this port tracks, the Scala
order should be changed to `painter.shape(form, shade)` for consistency.

**Impact of change:**

- `painter.scala` line 499: swap `shade` and `form` params.
- `Shape` constructor call inside `painter.shape` (line 505).
- All call sites in examples need updating (see examples section below).
- `scala-port-comparison.md` §3 Painter table row and the "note the arg order
  flip" callout should be removed once fixed.

**Priority:** Medium — this is a breaking change. Worth batching with other API
cleanups.

---

## Examples / Codebase

All four Painter factory methods (`form`, `shape`, `layer`, `panel`) accept
their full parameter set directly at construction — no chained `.set()` needed.
The `.set()` method on each class still exists and is correct for
**post-creation mutation only**.

### 🔄 `painter.form().set()` — 8 files

- `examples/blur/Blur.scala` line 68
- `examples/deferred/Deferred.scala` line 93
- `examples/instances/Instances.scala` line 52
- `examples/mipmaps/Mipmaps.scala` lines 72, 134
- `examples/painter_dsl/PainterDsl.scala` line 64
- `examples/painter_triangle/PainterTriangle.scala` line 53
- `examples/painter_typed_bindings/TypedBindings.scala` line 50
- `examples/panel_triangle/PanelTriangle.scala` line 52

Pattern: `painter.form().set(vertices = v)` → `painter.form(vertices = v)`

### 🔄 `painter.panel().set()` — 5 files

- `examples/panel_layer/PanelLayer.scala` line 48
- `examples/deferred/Deferred.scala` lines 102, 182
- `examples/panel_triangle/PanelTriangle.scala` line 73
- `examples/blur/Blur.scala` line 136
- `examples/mipmaps/Mipmaps.scala` lines 81, 175

Pattern: `painter.panel().set(clearColor = ..., shapes = ..., ...)` →
`painter.panel(clearColor = ..., shapes = ..., ...)`

### 🔄 `painter.layer(...).set()` — 1 file

- `examples/deferred/Deferred.scala` line 169

Pattern: `.layer(shade).set(mipSource = -1, mipTarget = -1)` →
`.layer(shade, mipSource = -1, mipTarget = -1)`

### 🔄 `painter.shape(...).set()` — none found in examples

No examples currently chain `.set()` on `painter.shape(...)`. Nothing to update.

---

## Implementation

### 🔄 `Form.set()` — destroy-always is wrong for dynamic geometry

**Current Scala** (`src/graphics/painter/form.scala`):

```scala
if vertexBuffer.notNull then vertexBuffer.get.destroy()
// always creates a new GPUBuffer
val buf = painter.device.createBuffer(...)
painter.queue.writeBuffer(buf, ...)
```

**Rust approach** (`form.rs` — `update_form` fn):

- Tracks `vertex_buffer_max_size` (allocated GPU capacity) separately from
  `vertex_buffer_current_size` (bytes actually used).
- On update: if new data fits within `max_size`, calls `queue.write_buffer` into
  the existing buffer — **no destroy, no realloc**.
- Only destroys + recreates when new data **exceeds** `max_size`.

**Required Scala changes in `Form.set()`:**

- Add `var bufferCapacity: Int = 0` to `Form` alongside `vertexCount`.
- Replace the unconditional destroy+create with a reuse-or-grow branch:
  ```scala
  val newSize = verts.arrayBuffer.byteLength
  if vertexBuffer.isNull || newSize > bufferCapacity then
    if vertexBuffer.notNull then vertexBuffer.get.destroy()
    vertexBuffer = painter.device.createBuffer(...)
    bufferCapacity = newSize
  painter.queue.writeBuffer(vertexBuffer.get, 0, verts.arrayBuffer)
  vertexCount = verts.length
  ```
- Ensure the render pass draws only `vertexCount` vertices, not capacity, so
  using a smaller-than-capacity buffer produces correct output.

**Why this matters:** Any per-frame geometry update (particles, procedural
animation, future `dynamic_shapes` example) will thrash the GPU allocator with
the current implementation. With the Rust strategy the buffer is allocated once
to the high-water mark and reused every frame with a plain `writeBuffer` call.

**Doc follow-up:** Remove the sentence in §3 (Form) — _"The old GPU buffer is
destroyed and a new one allocated (no in-place resize yet)"_ — once this is
fixed.

---

## API Design (continued)

### 🔄 Add singular param shortcuts wherever a public method accepts a plural `Arr`

Rust's builder API consistently pairs `with_shape(s)` / `with_shapes(vs)`,
`with_effect(e)` / `with_effects(vs)`, and `with_format(f)` /
`with_formats(vs)`. We want the same pattern in Scala: a `shape =` shortcut that
is syntactic sugar for `shapes = Arr(value)`. **Plural takes precedence** if
both are supplied.

**Affected params (verified against source):**

`Panel.set()` and `painter.panel()` — three plural params, each needs a
singular:

| Plural param (existing)           | New singular param          |
| --------------------------------- | --------------------------- |
| `shapes: Maybe[Arr[Shape[?, ?]]]` | `shape: Maybe[Shape[?, ?]]` |
| `layers: Maybe[Arr[Layer[?, ?]]]` | `layer: Maybe[Layer[?, ?]]` |
| `formats: Maybe[Arr[String]]`     | `format: Maybe[String]`     |

No other public API methods currently have plural `Arr` params.

**Implementation sketch for each:**

```scala
def set(
  ...,
  shape:  Maybe[Shape[?, ?]] = Maybe.Not,   // new
  shapes: Maybe[Arr[Shape[?, ?]]] = Maybe.Not,
  ...
): this.type =
  // plural wins; singular is sugar for Arr(value)
  shapes.orElse(shape.map(s => Arr(s))).foreach(v => this.shapes = v)
  ...
```

**Priority:** Soon — the planning doc has already been updated to use singular
params where applicable. Code needs to follow before the doc is merged.

**Examples to update after implementation** — same files as the `panel().set()`
list above; each single-item `Arr(x)` becomes the singular param.

---

## Math / NumExt

### 🔄 Vector overloads for `fit0111` / `fit1101`

**Current state:**

- CPU scalar `NumExt` defines `fit0111` / `fit1101` for `Double` and `Float`
  ([trivalibs/src/utils/numbers.scala:107, 145](../trivalibs/src/utils/numbers.scala#L107)).
- GPU DSL defines them on `FloatExpr` only
  ([src/graphics/math/gpu/expr.scala:238-239](../src/graphics/math/gpu/expr.scala#L238)).
- **Missing** on `Vec2` / `Vec3` / `Vec4` (CPU) and `Vec2Expr` / `Vec3Expr` /
  `Vec4Expr` (GPU DSL).

Rust's `trivalibs_nostd::num_ext::NumExt` offers these componentwise on glam
vector types; shaders frequently want `normal.fit0111()` on a `Vec3` normal.

**Required changes:**

- Add `fit0111` / `fit1101` extensions to `Vec2Base` / `Vec3Base` / `Vec4Base`
  (CPU) delegating to each component's scalar `fit0111`.
- Add overrides on `Vec2Expr` / `Vec3Expr` / `Vec4Expr` emitting
  `(v * 2.0 - 1.0)` / `(v * 0.5 + 0.5)` WGSL.

**Doc follow-up:** Once added, update the `NumExt` row in
[scala-port-comparison.md §10](rust-painter/scala-port-comparison.md) — drop the
"vector overloads still missing" note.

**Priority:** Low — easy, but only worth doing when a sketch wants it.

---

## Panel / Textures

### 🔄 `with_static_texture_data(bytes)` on Panel

**Gap:** Rust's `Panel::with_static_texture_data(bytes)` is the canonical way to
load an image / baked texture into a panel's render target. The Scala Panel has
no direct equivalent — callers must build a `GPUTexture` with usage
`COPY_DST | TEXTURE_BINDING` via the raw device and bind it by hand.

**Required changes:**

- Add a `staticTextureData` param (or a dedicated
  `setStaticTextureData(bytes, format, width, height)` method) on `Panel` /
  `painter.panel(...)`.
- Internally: create the `GPUTexture` with `COPY_DST | TEXTURE_BINDING`, call
  `queue.writeTexture`, and wire the texture view as the panel's output so
  downstream `Layer`s sampling the panel see the baked pixels.
- Default format / dimensions from `bytes` or require explicit args — match
  Rust's signature.

**Doc follow-up:** Once added, remove the gap bullet from
[scala-port-comparison.md §12](rust-painter/scala-port-comparison.md) and add
the param row to the Panel table in §3.

**Priority:** Medium — unblocks any example that needs a baked image texture
(image-based sketches, reference LUTs, etc.).

---

## Random helpers

### 🔄 Port missing `Random` helpers from `trivalibs_core`

**Current state:**
[trivalibs/src/utils/random.scala](../trivalibs/src/utils/random.scala) only
exposes `rand()` and `randInRange(min, max)`. Rust
`trivalibs_core::rendering::scene::Random` additionally provides `rand_sign`,
`rand_vec2` / `rand_vec2_range`, `rand_vec3` / `rand_vec3_range`, `rand_vec4` /
`rand_vec4_range`.

**Required additions** to `trivalibs/src/utils/random.scala`:

- `randSign(): Double` — `if rand() < 0.5 then -1.0 else 1.0`.
- `randVec2()` / `randVec3()` / `randVec4()` — components in `[0, 1)`.
- `randVec2InRange(min: Vec2, max: Vec2)` and the Vec3 / Vec4 analogues —
  componentwise `randInRange`.

**Doc follow-up:** Once added, remove the "Random helpers" bullet in
[scala-port-comparison.md §12](rust-painter/scala-port-comparison.md) and update
the `Random` row in §10 to `Ported`.

**Priority:** Low — one-liners, do when a sketch first needs them.
