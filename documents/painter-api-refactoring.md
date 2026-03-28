# Refactor: Mutable painter entities with unified Painter access

## Context

The painter API has several inconsistencies and rigidities:

- `specWidth`/`specHeight` on Panel and topology/frontFace on Form are `val` —
  can't change at runtime
- Entities mix `Painter`, `GPUDevice`, and `GPUQueue` as constructor args
  inconsistently
- All non-type-level properties get passed at construction, making runtime
  mutation awkward
- The `Bindable` trait hardcodes `device: GPUDevice` directly instead of going
  through Painter

**Goal:** Constructor takes only `painter` (+ `shade` for typed entities); all
rendering properties live as `var` with defaults and are configured via a
`set(...)` method with all-`Opt` params. Type-level safety (compile-time bind
checks via U, P) stays intact. Missing required resources (e.g. Form not set on
Shape) → runtime crash.

## Design Principles

- **Static (type-level):** `shade: Shade[U, P]` on Shape/Layer — required at
  construction so U/P propagate to `bind()`
- **Dynamic (runtime vars):** everything else — form, cullMode, blendState,
  clearColor, specSize, shapes/layers arrays, blend state
- **All entities access GPU through `painter`** — no direct
  `GPUDevice`/`GPUQueue` args in entity constructors
- **GPU resource cleanup:** `GPUTexture` and `GPUBuffer` must be explicitly
  `destroy()`-ed; other WebGPU objects (shaders, samplers, pipelines) are GC'd
  by the browser

## Files to Modify

- `src/graphics/painter/shape.scala` — constructor(painter, shade); `set`
  method; `device` via painter
- `src/graphics/painter/layer.scala` — constructor(painter, shade); `set`
  method; `device` via painter
- `src/graphics/painter/panel.scala` — constructor(painter); make all props
  `var`; `set` method
- `src/graphics/painter/form.scala` — constructor(painter); `set` method with
  buffer destroy
- `src/graphics/painter/painter.scala` — update factory methods
  (shape/layer/panel/form)
- Any draft files that use the old factory API

## Step 1 — `Bindable[U, P]` trait: `device` via `painter`

Change abstract member from `val device: GPUDevice` to `val painter: Painter`,
expose `device` as a def:

```scala
trait Bindable[U, P]:
  val shade: Shade[U, P]
  val painter: Painter
  inline def device: GPUDevice = painter.device
  var bindings: BindingSlots
  var panelBindings: Arr[Panel | Null]
  // bind overloads and processEntry unchanged
```

## Step 2 — `Shape[U, P]`

`form` is required at construction (a shape without geometry is meaningless).
Geometry changes are handled by calling `form.set(vertices = ...)` on the form
in place — the shape's `form` ref stays fixed.

```scala
class Shape[U, P](val painter: Painter, val shade: Shade[U, P], val form: Form) extends Bindable[U, P]:
  var cullMode: CullMode = CullMode.None
  var blendState: Opt[BlendState] = Opt.Null
  var bindings: BindingSlots = Arr()
  var panelBindings: Arr[Panel | Null] = Arr()

  def set(
      cullMode: Opt[CullMode] = Opt.Null,
      blendState: Opt[BlendState] = Opt.Null,
  ): this.type =
    cullMode.foreach(v => this.cullMode = v)
    blendState.foreach(v => this.blendState = v)
    this

  // legacy slot-based bind stays as-is
  def bind(slots: (Int, BufferBinding[?, ?])*): Shape[U, P] = ...
```

Note: `blendState` here is an `Opt[BlendState]` var (Opt.Null = no blending).
`set(blendState = someBlend)` sets blending; users can also assign
`shape.blendState = Opt.Null` directly to clear it. The `set` param
`blendState: Opt[BlendState] = Opt.Null` means "don't change" when absent —
there's no ambiguity here since the outer Opt wraps the user's intent.

## Step 3 — `Layer[U, P]`

```scala
class Layer[U, P](val painter: Painter, val shade: Shade[U, P]) extends Bindable[U, P]:
  var blendState: Opt[BlendState] = Opt.Null
  var bindings: BindingSlots = Arr()
  var panelBindings: Arr[Panel | Null] = Arr()

  def set(blendState: Opt[BlendState] = Opt.Null): this.type =
    blendState.foreach(v => this.blendState = v)
    this
```

## Step 4 — `Panel`

```scala
class Panel(val painter: Painter):
  var specWidth: Int = 0
  var specHeight: Int = 0
  var clearColor: Opt[(Double, Double, Double, Double)] = (0.0, 0.0, 0.0, 1.0)
  var depthTest: Boolean = false
  var shapes: Arr[Shape[?, ?]] = Arr()
  var layers: Arr[Layer[?, ?]] = Arr()

  def set(
      width: Opt[Int] = Opt.Null,
      height: Opt[Int] = Opt.Null,
      clearColor: Opt[(Double, Double, Double, Double)] = Opt.Null,
      depthTest: Opt[Boolean] = Opt.Null,
      shapes: Opt[Arr[Shape[?, ?]]] = Opt.Null,
      layers: Opt[Arr[Layer[?, ?]]] = Opt.Null,
  ): this.type = ...
```

**Note on `clearColor`:** `clearColor: Opt[...]` at the var level means Opt.Null
= "render without clearing". In the `set` method,
`clearColor: Opt[...] = Opt.Null` means "don't change". To set the field to
Opt.Null (no clear), assign directly: `panel.clearColor = Opt.Null`. The `set`
method's parameter uses an outer Opt to signal presence/absence of change,
wrapping the same type as the field.

Actually, to avoid this ambiguity, we can use `Opt[Opt[...]]` for the clearColor
param in set — but that's awkward. Simpler: just leave clearColor out of `set`
entirely since it needs a "three-state" param. Users set it via direct
assignment: `panel.clearColor = (0,0,0,1)` or `panel.clearColor = Opt.Null`.

Revised `set` for Panel:

```scala
def set(
    width: Opt[Int] = Opt.Null,
    height: Opt[Int] = Opt.Null,
    depthTest: Opt[Boolean] = Opt.Null,
    shapes: Opt[Arr[Shape[?, ?]]] = Opt.Null,
    layers: Opt[Arr[Layer[?, ?]]] = Opt.Null,
): this.type
// clearColor is a var — set directly
```

**Keep ensureSize logic as-is** (already calls destroy() on old textures). Make
`specWidth`/`specHeight` `var` so `ensureSize` reads them dynamically.

## Step 5 — `Form`

```scala
class Form(val painter: Painter):
  var vertexBuffer: GPUBuffer | Null = null
  var vertexCount: Int = 0
  var topology: PrimitiveTopology = PrimitiveTopology.TriangleList
  var frontFace: FrontFace = FrontFace.CCW

  def set[F <: Tuple](
      vertices: Opt[StructArray[F]] = Opt.Null,
      topology: Opt[PrimitiveTopology] = Opt.Null,
      frontFace: Opt[FrontFace] = Opt.Null,
  ): this.type =
    topology.foreach(v => this.topology = v)
    frontFace.foreach(v => this.frontFace = v)
    vertices.foreach: verts =>
      if vertexBuffer != null then vertexBuffer.asInstanceOf[GPUBuffer].destroy()
      val buf = painter.device.createBuffer(
        Obj.literal(size = verts.byteLength, usage = GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST)
      )
      painter.queue.writeBuffer(buf, 0, verts.arrayBuffer)
      vertexBuffer = buf
      vertexCount = verts.length
    this
```

Note: `vertexBuffer` and `vertexCount` are `var` so `renderShapeOnPass` still
reads them from the form.

## Step 6 — `Painter` factory methods

```scala
def shape[U, P](shade: Shade[U, P], form: Form): Shape[U, P] = Shape(this, shade, form)
def layer[U, P](shade: Shade[U, P]): Layer[U, P] = Layer(this, shade)
def panel(): Panel = Panel(this)
def form(): Form = Form(this)
```

Remove the old parameterized factory methods. Old `binding[T]` stays as-is
(BufferBinding is separate from this refactor).

**`renderShapeOnPass` in painter.scala:**

- `shape.form` is a `val Form` — no change needed. The form's `vertexBuffer` is
  `GPUBuffer | Null`; accessing it before calling `form.set(vertices=...)`
  crashes at render time (by design).

## Step 7 — Pipeline cache and runtime mutation

The pipeline key is computed on every `renderShapeOnPass` call from current
values of `shade.id`, `shape.blendState`, `shape.cullMode`,
`shape.form.topology`, `shape.form.frontFace`. **No change needed** — the cache
already handles key changes transparently by creating a new cached pipeline. Old
pipelines stay in cache (acceptable; WebGPU pipelines don't have a destroy()
method).

## Step 8 — GPU resource cleanup summary

| Resource                  | When to destroy          | Status                          |
| ------------------------- | ------------------------ | ------------------------------- |
| Panel `_texture`          | On size change           | Already done ✓                  |
| Panel `_depthTexture`     | On size change           | Already done ✓                  |
| Form `vertexBuffer`       | On `set(vertices=...)`   | **Add in Step 5**               |
| `BufferBinding.gpuBuffer` | When binding is replaced | Leave to user (shared bindings) |

Note: `GPURenderPipeline`, `GPUSampler`, `GPUShaderModule`, `GPUBindGroupLayout`
have no `destroy()` in WebGPU and are cleaned up by the browser GC. Only Buffer
and Texture need explicit cleanup.

## Usage after refactor

```scala
val form = painter.form().set(vertices = myVerts)
val shape = painter.shape(shade, form)
  .set(cullMode = CullMode.Back)
  .bind("color" := Vec3(1, 0, 0))

val layer = painter.layer(layerShade)
  .set(blendState = BlendState.Alpha)
  .bind("time" := timeBinding)

val panel = painter.panel()
  .set(shapes = Arr(shape), layers = Arr(layer))
panel.clearColor = (0.1, 0.1, 0.1, 1.0)

// runtime mutation
shape.set(cullMode = CullMode.Front)  // via set
shape.form.set(vertices = updatedVerts)  // destroys old GPU buffer, creates new
```

## Files to update (drafts)

Search for all draft files using old `painter.shape(form, shade, ...)` /
`painter.layer(shade, ...)` / `painter.panel(...)` /
`painter.form(vertices, ...)` signatures and update to new API.

## Verification

```bash
bun run build   # all drafts must compile
scala test .    # tests must pass
```

Manually run `drafts/painter_typed_bindings/` and `drafts/panel_layer/` to
verify runtime index lookup still works and rendering is correct.
