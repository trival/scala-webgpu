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

**Goal:** Constructor takes only `painter` (+ `shade`/`form` for typed/required
entities); all rendering properties live as `var` with defaults and are
configured via a `set(...)` method with all-`Opt` params. Type-level safety
(compile-time bind checks via U, P) stays intact. Missing required GPU resources
(e.g. Form vertices not set) → runtime crash.

## Design Principles

- **Static (type-level):** `shade: Shade[U, P]` on Shape/Layer — required at
  construction so U/P propagate to `bind()`; `form: Form` on Shape — required
  because a shape without geometry is meaningless
- **Dynamic (runtime vars):** everything else — cullMode, blendState,
  clearColor, specSize, shapes/layers arrays, topology, frontFace, vertices
- **All entities access GPU through `painter`** — no direct
  `GPUDevice`/`GPUQueue` args in entity constructors
- **GPU resource cleanup:** Only `GPUBuffer`, `GPUTexture`, `GPUQuerySet`, and
  `GPUDevice` have `destroy()` in the WebGPU spec. `GPURenderPipeline`,
  `GPUSampler`, `GPUShaderModule`, `GPUBindGroup`, `GPUBindGroupLayout`, and
  `GPUPipelineLayout` do NOT — they are GC'd by the browser.

### Nullable fields: Scala `null` vs `Opt.Null`

Two distinct null-like values exist in Scala.js:

- **Scala `null`** compiles to JS `null` — used for fields that can be
  meaningfully absent at runtime (e.g. `blendState`, `clearColor`, GPU resources
  before allocation)
- **`Opt.Null`** = `js.undefined` — used in `set()` method params to mean
  "don't change this field"

This gives us a clean **three-state pattern** for `set()` parameters on
nullable fields using `Opt[T | Null]`:

- `Opt.Null` (= `js.undefined`) → don't change the field
- `null` → explicitly unset the field (set to `null`)
- `T` value → set to that value

This works because `Opt[T].foreach` skips `js.undefined` but passes `null`
through, so `Opt[BlendState | Null]` with value `null` will execute the
foreach body and assign `null`.

**No opaque sentinels needed** — `null` replaces `Shape.NoBlend` and
`Panel.NoClear`.

> **Future consideration:** We may rename `Opt` to `Maybe` (for
> undefined-based semantics) and repurpose `Opt` for `T | Null` (null-based
> semantics) to make the distinction clearer in the API.

### Non-nullable `set()` parameters

For fields that are always set to some value (e.g. `cullMode`, `topology`,
`depthTest`), the `set()` parameter type is simply `Opt[T]`:

- `Opt.Null` → don't change
- `T` value → set to that value

## Files to Modify

- `src/graphics/painter/shape.scala` — constructor(painter, shade, form); `set`
  method; `device` via painter
- `src/graphics/painter/layer.scala` — constructor(painter, shade); `set`
  method; `device` via painter
- `src/graphics/painter/panel.scala` — constructor(painter); make all props
  `var`; `set` method; switch internal textures to `T | Null`
- `src/graphics/painter/form.scala` — constructor(painter); `set` method with
  buffer destroy; move buffer allocation from painter factory to `set`
- `src/graphics/painter/painter.scala` — simplify factory methods; update render
  methods for nullable field access
- `src/webgpu/facades.scala` — add `destroy()` to `GPUBuffer` trait
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

`blendState` is `BlendState | Null` — `null` means no blending. In `set()`,
the param type is `Opt[BlendState | Null]` for the three-state pattern.

```scala
class Shape[U, P](
    val painter: Painter,
    val shade: Shade[U, P],
    val form: Form,
) extends Bindable[U, P]:
  var cullMode: CullMode = CullMode.None
  var blendState: BlendState | Null = null
  var bindings: BindingSlots = Arr()
  var panelBindings: Arr[Panel | Null] = Arr()

  def set(
      cullMode: Opt[CullMode] = Opt.Null,
      blendState: Opt[BlendState | Null] = Opt.Null,
  ): this.type =
    cullMode.foreach(v => this.cullMode = v)
    blendState.foreach(v => this.blendState = v)
    this

  // legacy slot-based bind stays as-is
  def bind(slots: (Int, BufferBinding[?, ?])*): Shape[U, P] = ...
```

Note how `blendState.foreach(v => this.blendState = v)` handles all cases:
- `Opt.Null` → foreach skipped, field unchanged
- `null` → foreach runs, field set to `null` (blending disabled)
- `BlendState(...)` → foreach runs, field set to blend state

## Step 3 — `Layer[U, P]`

Same pattern as Shape for blendState.

```scala
class Layer[U, P](
    val painter: Painter,
    val shade: Shade[U, P],
) extends Bindable[U, P]:
  var blendState: BlendState | Null = null
  var bindings: BindingSlots = Arr()
  var panelBindings: Arr[Panel | Null] = Arr()

  def set(
      blendState: Opt[BlendState | Null] = Opt.Null,
  ): this.type =
    blendState.foreach(v => this.blendState = v)
    this
```

## Step 4 — `Panel`

Internal texture fields use `T | Null` with `null` as initial value. Cleanup
uses `!= null` checks (which in Scala.js catches both `null` and `undefined`).

`clearColor` is `ClearColor | Null` — `null` means don't clear. Default is
black `(0.0, 0.0, 0.0, 1.0)`.

```scala
type ClearColor = (Double, Double, Double, Double)

class Panel(val painter: Painter):
  var specWidth: Int = 0
  var specHeight: Int = 0
  var clearColor: ClearColor | Null = (0.0, 0.0, 0.0, 1.0)
  var depthTest: Boolean = false
  var shapes: Arr[Shape[?, ?]] = Arr()
  var layers: Arr[Layer[?, ?]] = Arr()

  private var _texture: GPUTexture | Null = null
  private var _textureView: GPUTextureView | Null = null
  private var _depthTexture: GPUTexture | Null = null
  private var _depthView: GPUTextureView | Null = null
  private var _width: Int = 0
  private var _height: Int = 0

  def textureView: GPUTextureView = _textureView.asInstanceOf[GPUTextureView]
  def depthView: GPUTextureView = _depthView.asInstanceOf[GPUTextureView]

  def set(
      width: Opt[Int] = Opt.Null,
      height: Opt[Int] = Opt.Null,
      clearColor: Opt[ClearColor | Null] = Opt.Null,
      depthTest: Opt[Boolean] = Opt.Null,
      shapes: Opt[Arr[Shape[?, ?]]] = Opt.Null,
      layers: Opt[Arr[Layer[?, ?]]] = Opt.Null,
  ): this.type =
    width.foreach(v => this.specWidth = v)
    height.foreach(v => this.specHeight = v)
    clearColor.foreach(v => this.clearColor = v)
    depthTest.foreach(v => this.depthTest = v)
    shapes.foreach(v => this.shapes = v)
    layers.foreach(v => this.layers = v)
    this

  private[painter] def ensureSize(canvasW: Int, canvasH: Int): Unit =
    val targetW = if specWidth == 0 then canvasW else specWidth
    val targetH = if specHeight == 0 then canvasH else specHeight
    if targetW != _width || targetH != _height then
      if _texture != null then _texture.asInstanceOf[GPUTexture].destroy()
      if _depthTexture != null then _depthTexture.asInstanceOf[GPUTexture].destroy()
      _width = targetW
      _height = targetH
      val tex = painter.device.createTexture(...)
      _texture = tex
      _textureView = tex.createView()
      if depthTest then
        val depthTex = painter.device.createTexture(...)
        _depthTexture = depthTex
        _depthView = depthTex.createView()
```

## Step 5 — `Form`

Buffer allocation moves from painter factory to `Form.set()`. Uses `T | Null`
for the vertex buffer with `!= null` check for destroy:

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
      if vertexBuffer != null then
        vertexBuffer.asInstanceOf[GPUBuffer].destroy()
      val buf = painter.device.createBuffer(
        Obj.literal(
          size = verts.byteLength,
          usage = GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
        ),
      )
      painter.queue.writeBuffer(buf, 0, verts.arrayBuffer)
      vertexBuffer = buf
      vertexCount = verts.length
    this
```

**Note:** `GPUBuffer.destroy()` must be added to `src/webgpu/facades.scala`:

```scala
@js.native
trait GPUBuffer extends js.Object:
  def destroy(): Unit = js.native
```

## Step 6 — `Painter` factory methods

Thin wrappers — all setup moved to entity `set` methods:

```scala
def shape[U, P](shade: Shade[U, P], form: Form): Shape[U, P] =
  Shape(this, shade, form)

def layer[U, P](shade: Shade[U, P]): Layer[U, P] =
  Layer(this, shade)

def panel(): Panel = Panel(this)

def form(): Form = Form(this)
```

Remove old parameterized factory methods (old `form[F]` with vertices, old
`shape` with bindings/cullMode/blendState args, old `layer` with bindings/
blendState args, old `panel` with all args). `binding[T]` stays as-is.

**`renderShapeOnPass` in painter.scala:**

- `shape.form.vertexBuffer` is `GPUBuffer | Null` — cast with
  `.asInstanceOf[GPUBuffer]` (crashes if not set, by design)
- `!= null` checks on Shade layouts (`valueBindGroupLayout`,
  `panelBindGroupLayout`, `vertexBufferLayout`) remain as-is — these are
  `T | Null` computed at Shade creation time, not user-settable
- `shape.blendState` checks change from `.isEmpty` to `!= null`

## Step 7 — Pipeline cache and runtime mutation

The pipeline key is computed on every `renderShapeOnPass` call from current
values of `shade.id`, `shape.blendState`, `shape.cullMode`,
`shape.form.topology`, `shape.form.frontFace`. **No change needed** — the cache
already handles key changes transparently by creating a new cached pipeline. Old
pipelines stay in cache (acceptable; WebGPU pipelines don't have a destroy()
method).

**Pipeline key update:** The `blendState` portion of the key changes from
checking `.isEmpty` to checking `!= null`:

```scala
val key = s"${shade.id}|${shape.blendState != null}|${shape.cullMode}|..."
```

## Step 8 — GPU resource cleanup summary

Verified against `@webgpu/types` — only these WebGPU interfaces have
`destroy()`:

- **GPUBuffer** — `destroy(): undefined`
- **GPUTexture** — `destroy(): undefined`
- **GPUQuerySet** — `destroy(): undefined`
- **GPUDevice** — `destroy(): undefined`

Everything else (GPURenderPipeline, GPUSampler, GPUShaderModule, GPUBindGroup,
GPUBindGroupLayout, GPUPipelineLayout) has no destroy() and is GC'd by the
browser.

| Resource                  | When to destroy        | Cleanup pattern                                          |
| ------------------------- | ---------------------- | -------------------------------------------------------- |
| Panel `_texture`          | On size change         | `if _texture != null then _texture.nn.destroy()`         |
| Panel `_depthTexture`     | On size change         | `if _depthTexture != null then _depthTexture.nn.destroy()` |
| Form `vertexBuffer`       | On `set(vertices=...)` | `if vertexBuffer != null then vertexBuffer.nn.destroy()` |
| `BufferBinding.gpuBuffer` | When binding replaced  | Leave to user (shared bindings)                          |

(`.nn` or `.asInstanceOf[T]` needed after null check due to Scala's flow typing
limitations with union types)

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
shape.set(cullMode = CullMode.Front)
shape.form.set(vertices = updatedVerts)  // destroys old GPU buffer
shape.set(blendState = null)             // explicitly disable blending
panel.set(clearColor = null)             // explicitly disable clear
```

## Files to update (drafts)

Search for all draft files using old `painter.shape(form, shade, ...)` /
`painter.layer(shade, ...)` / `painter.panel(...)` /
`painter.form(vertices, ...)` / `Form(device, queue, ...)` signatures and update
to new API.

## Verification

```bash
bun run build   # all drafts must compile
scala test .    # tests must pass
```

Manually run `drafts/painter_typed_bindings/` and `drafts/panel_layer/` to
verify runtime index lookup still works and rendering is correct.
