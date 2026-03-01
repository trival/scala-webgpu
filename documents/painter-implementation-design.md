# Painter Implementation Design — Scala.js WebGPU

This document describes the plan for porting the Rust `trivalibs_painter`
library to Scala.js, targeting browser-based WebGPU exclusively. It catalogs
existing infrastructure, maps it to Rust painter concepts, and designs
Scala-idiomatic replacements that leverage the type system, GC-based memory
management, and direct browser API access.

The long-term north star is a unified CPU/GPU programming model where Scala
types and math operations work identically on both sides — abstracting the
CPU/GPU boundary the way React abstracts the server/client boundary.

---

## Table of Contents

1. [Existing Scala Infrastructure](#1-existing-scala-infrastructure)
2. [Rust Painter Architecture Summary](#2-rust-painter-architecture-summary)
3. [Mapping: Rust Concepts → Scala Components](#3-mapping-rust-concepts--scala-components)
4. [Design Divergences from Rust](#4-design-divergences-from-rust)
5. [Core Type Designs](#5-core-type-designs)
6. [Implementation Milestones](#6-implementation-milestones)
7. [Long-Term Vision: Unified CPU/GPU Programming](#7-long-term-vision-unified-cpugpu-programming)
8. [WebGPU Facade Extensions](#8-webgpu-facade-extensions)
9. [Open Questions](#9-open-questions)
10. [File Organization](#10-file-organization)

---

## 1. Existing Scala Infrastructure

### 1.1 Math Library — `src/gpu/math/`

**Vectors**: Vec2, Vec3, Vec4 — each with multiple representations:

- Mutable classes (`Vec2`, `Vec3`, `Vec4`) with Double components — main working
  types
- Float variants (`Vec2f`, `Vec3f`, `Vec4f`) — for when Float precision suffices
- Immutable tuples (`Vec2Tuple`, `Vec3Tuple`, `Vec4Tuple`) — lightweight,
  allocation-free
- GPU buffer types (`Vec2Buffer = (F32, F32)`, `Vec3Buffer = (F32, F32, F32)`,
  `Vec4Buffer`) — for GPU upload

Trait hierarchy per family: `Base[Num, Vec]` → `Mutable` / `ImmutableOps` /
`MutableOps` with extension methods providing `.x`, `.y`, `.z`, `.w` / `.r`,
`.g`, `.b`, `.a` / `.u`, `.v` aliases.

**Matrices**: Mat2, Mat3, Mat4 — column-major storage with similar variant sets.
Buffer types handle WGSL std140 padding automatically (Vec3→Vec4Buffer in
uniforms, Mat3→Mat3PaddedBuffer).

### 1.2 Shader System — `src/gpu/shader/`

**`ShaderDef[Attribs, Varyings, Uniforms, VBI, VBO, FBI, FO]`** (`shader.scala`)

- Fully type-parametric shader definition
- `inline def generateWGSL: String` — compile-time WGSL generation from type
  parameters
- `inline def vertexBufferLayout: js.Dynamic` — vertex buffer descriptor from
  `Attribs` named tuple
- `inline def createBindGroupLayouts(device): Array[GPUBindGroupLayout]` — from
  `Uniforms`
- `inline def createPipelineLayout(device): (Array[GPUBindGroupLayout], GPUPipelineLayout)`
- Factory: `Shader[A, V, U](vertexBody, fragmentBody)` with defaults for
  builtins

**`WGSLType[T]`** type class (`types.scala`)

- Maps Scala types → WGSL: `wgslName`, `byteSize`, `alignment`, `vertexFormat`
- Associated types: `AttribBuffer` (vertex layout), `UniformBuffer` (uniform
  layout with padding)
- Instances for Float, Vec2–4, Mat2–4

**Visibility wrappers**: `VertexUniform[T]`, `FragmentUniform[T]`,
`SharedUniform[T]` — control shader stage visibility in bind group layouts.
Transparent delegation to inner `WGSLType`.

**Compile-time derivation** (`derive.scala`)

- `fieldNames[T]`, `fieldWgslTypes[T]` — introspect named tuples
- `generateLocationStruct[T](name)`, `generateBuiltinStruct[T](name)` — WGSL
  struct generation
- `generateUniforms[T]` — @group/@binding declarations from nested named tuples

**Layout derivation** (`layouts.scala`)

- `vertexBufferLayout[Attribs]` →
  `{ arrayStride, attributes: [{ location, offset, format }] }`
- `bindGroupLayoutDescriptors[Uniforms]` → nested arrays of bind group entries
- `createPipelineLayoutFromUniforms[Uniforms](device)` →
  `(layouts, pipelineLayout)`

**Builtins** (`builtins.scala`)

- Opaque types: `BuiltinVertexIndex`, `BuiltinInstanceIndex`, `BuiltinPosition`,
  `BuiltinFragCoord`, etc.
- `BuiltinType[T]` type class with `wgslBuiltin` and `wgslType`

### 1.3 Buffer System — `src/gpu/buffers/`

**`BufferBinding[T, F <: Tuple]`** (`binding.scala`)

- GPU uniform buffer with typed CPU↔GPU sync
- `set(value: T)` / `:=(value)` — write to CPU buffer + upload to GPU
- `update(f: StructRef[F] => Unit)` — mutate buffer then upload
- `get: T` — read from CPU buffer
- Created via `BufferBinding[T](device)` or
  `BufferBinding[T](device, initialValue)`

**`UniformValue[T, F]`** type class — marshals Scala values to GPU buffer format

- Handles std140 padding (Vec3→Vec4Buffer, Mat3→Mat3PaddedBuffer)

**`AttribLayout[Attribs, Fields]`** (`attributes.scala`)

- Resolves named tuple attribute types to concrete `StructArray` field layouts
- `transparent inline def allocateAttribs[Attribs](count: Int): Any` — returns
  concrete `StructArray[F]`

### 1.4 Binary Buffer Foundation — `trivalibs/src/utils/bufferdata.scala`

**`StructArray[Fields <: Tuple]`** — zero-cost typed array of structs over
`DataView`

- `allocate[Fields](count)`, `wrap[Fields](buffer)`
- Index access: `arr(i): StructRef[Fields]`
- Iteration: `.indices`, implicit `Iterable` conversion

**`StructRef[Fields]`** — typed reference to single struct

- `apply(n): FieldAccess` — transparent inline, returns `StructRef` for nested
  or `PrimitiveRef` for leaf
- `set(values)` / `:=(values)` — write entire struct

**`PrimitiveRef[T]`** — typed single-field reference with `get`/`set`

**Match types**: `PrimitiveSize[T]`, `TupleSize[Fields]`,
`FieldOffset[Fields, N]` — compile-time byte calculations.

### 1.5 WebGPU Facades — `src/webgpu/facades.scala`

Complete `@js.native` bindings for core WebGPU API:

- `GPU`, `GPUAdapter`, `GPUDevice`, `GPUQueue`, `GPUShaderModule`
- `GPURenderPipeline`, `GPUCommandEncoder`, `GPURenderPassEncoder`
- `GPUBuffer`, `GPUBindGroup`, `GPUBindGroupLayout`, `GPUPipelineLayout`
- `GPUCanvasContext`, `GPUTexture`, `GPUTextureView`
- Constants: `GPUBufferUsage`, `GPUShaderStage`
- Helper: `WebGPU.getGPU()`, `WebGPU.getContext(canvas)`

### 1.6 Key Type-Level Patterns Used

| Pattern                             | Where                                | Purpose                                  |
| ----------------------------------- | ------------------------------------ | ---------------------------------------- |
| Opaque types over `(DataView, Int)` | StructArray, StructRef, PrimitiveRef | Zero-cost GPU buffer abstractions        |
| Match types                         | TupleSize, FieldOffset, ValueType    | Compile-time byte offset calculation     |
| `transparent inline` + `summonFrom` | allocateAttribs, field access        | Concrete return type propagation         |
| Named tuples                        | Attribs, Uniforms types              | Type-safe field names for shader structs |
| `NamedTuple.Names/DropNames`        | derive.scala                         | Separate names from types for code gen   |
| Given type class chains             | WGSLType, UniformValue, AttribLayout | Extensible type-to-GPU mapping           |
| Visibility wrapper types            | VertexUniform, FragmentUniform       | Shader stage metadata in types           |

---

## 2. Rust Painter Architecture Summary

(Full details in `documents/rust-painter/painter_technical_overview.md`)

### Core Abstractions

**Painter** — central GPU resource registry and execution engine. Owns device,
queue, surface, all resource storage vectors, and a pipeline cache.

**Shade** — shader program + input contract. Defines vertex attribute layout,
binding layout, shader code. Two bind group layouts: value bindings
(uniforms/samplers) and layer bindings (textures from other layers).

**Form** — geometry on GPU. Vertex buffer(s) + optional index buffer. Topology +
front face. Supports dynamic updates and buffer reallocation.

**Shape** — drawable object. Combines Form + Shade + bindings + render state
(blend, cull). Generates pipeline keys for caching. Supports instanced rendering
with per-instance binding overrides.

**Effect** — fullscreen post-processing pass. No Form, no vertex shader (uses
built-in fullscreen triangle). Fragment-only Shade + bindings. Enables blur,
deferred lighting, etc.

**Layer** — render target + composition unit. Owns textures, holds ordered
Shapes and Effects. Supports MRT, depth testing, MSAA, mipmaps, auto-sizing to
window, shared bindings, and texture ping-pong for multi-effect chains.

### Binding Hierarchy

Three levels, higher overrides lower at matching slots:

```
Layer bindings → Shape/Effect bindings → Instance bindings
```

**Value bindings**: uniform buffers and samplers. **Layer bindings**: textures
from other layers (Source, AtIndex, SourceAtMipLevel, Depth).

### Rendering Execution

```
painter.paint(layer):
  1. Render pass → layer textures
  2. For each Shape: get/create cached pipeline, resolve merged bindings, draw
  3. For each Effect: ping-pong textures, new render pass, draw fullscreen triangle
  4. Generate mipmaps if configured

painter.show(layer):
  Blit layer's output texture to canvas swap chain via fullscreen triangle
```

### Resource Management

- **Handle-based**: all resources are `usize` indices into storage vectors on
  the Painter
- **Builder pattern**: chained method calls for resource creation
- **Lazy pipeline creation**: created on first render, cached by config hash
- **Pipeline key**: shade + blend + cull + topology + layer formats + depth +
  MSAA

---

## 3. Mapping: Rust Concepts → Scala Components

| Rust Concept             | Existing Scala                      | New Scala                                 | Notes                                         |
| ------------------------ | ----------------------------------- | ----------------------------------------- | --------------------------------------------- |
| Vertex attribute formats | `WGSLType[T].vertexFormat`          | —                                         | Complete, reuse directly                      |
| Vertex buffer layout     | `layouts.vertexBufferLayout[A]`     | —                                         | Complete, reuse directly                      |
| Bind group layout        | `layouts.createBindGroupLayouts[U]` | Extend for samplers/textures              | Currently uniforms only                       |
| WGSL generation          | `ShaderDef.generateWGSL`            | —                                         | Complete for vert+frag structs                |
| CPU vertex data          | `allocateAttribs` + `StructArray`   | —                                         | Complete, feeds into Form                     |
| Uniform buffer           | `BufferBinding[T, F]`               | —                                         | Direct equivalent of Rust `BindingBuffer<T>`  |
| Math types               | Vec2–4, Mat2–4                      | —                                         | Complete                                      |
| WebGPU bindings          | `facades.scala`                     | Extend (see §8)                           | Missing samplers, textures, etc.              |
| Shade                    | `ShaderDef` (compile-time)          | `Shade` (runtime wrapper)                 | Shade materializes ShaderDef into GPU objects |
| Form                     | —                                   | `Form`                                    | New: vertex/index buffers + topology          |
| Shape                    | —                                   | `Shape`                                   | New: Form + Shade + bindings + state          |
| Effect                   | —                                   | **`Layer`**                               | Renamed: fullscreen post-processing pass      |
| Layer                    | —                                   | **`Panel`**                               | Renamed: render target + shapes/layers        |
| Painter                  | —                                   | `Painter`                                 | New: execution engine + pipeline cache        |
| CanvasApp                | —                                   | `CanvasApp`                               | New: application framework                    |
| Handle indices           | N/A                                 | **Not needed**                            | Use direct object references (GC)             |
| Pipeline cache           | —                                   | `HashMap[PipelineKey, GPURenderPipeline]` | Case class key with structural equality       |

> **Naming convention — Rust → Scala:**
>
> | Rust name      | Scala name     | Rationale                                                    |
> | -------------- | -------------- | ------------------------------------------------------------ |
> | **Layer**      | **Panel**      | A self-contained image/surface (painting panel, comic panel) |
> | **Effect**     | **Layer**      | A coat of paint applied over the whole surface (a glaze)     |
> | LayerBinding   | PanelBinding   | Texture sampled from another Panel's render target           |
> | layer bindings | panel bindings | Bind group slot for textures from other Panels               |
>
> The painting metaphor: you paint **shapes** onto a **panel**, then apply
> **layers** (glazes, washes) over the whole surface. This rename is intentional
> and applies throughout the Scala codebase. When this document refers to the
> Rust architecture (§2), it uses the original Rust names.

---

## 4. Design Divergences from Rust

### 4.1 No Handle Indices — Direct Object References

Rust uses `usize` handles because of ownership/lifetime rules. Scala has GC. A
`Shape` holds direct references to its `Form` and `Shade` objects, not indices.
This eliminates invalid-handle bugs and removes the central storage registry.

The `Painter` is still the execution engine and GPU context holder, but does not
own or store all resources. Resources are self-contained GC-managed objects.

### 4.2 Compile-Time Shader Contracts via ShaderDef

Rust's `Shade` takes runtime arrays of `GPUVertexFormat` values and binding type
enums. Scala's `Shade` wraps a `ShaderDef` whose type parameters drive
compile-time WGSL generation, layout derivation, and format computation. Type
errors in shader contracts are caught at compile time.

`ShaderDef` itself remains a general-purpose utility with flexible nested tuple
uniforms. The painter's `shade` factory is a thin inline adapter that accepts
flat named tuples (one per bind group role) and wraps them into `ShaderDef`'s
nested format. See §5.2 for details.

### 4.3 Named Tuples Instead of Positional Arrays

Rust:
`shade([Float32x3, Float32x3, Float32x2]).with_bindings([BUFFER_VERT, SAMPLER_FRAG])`
Scala: `type Attribs = (position: Vec3, normal: Vec3, uv: Vec2)` — field names
become WGSL struct fields.

Uniforms similarly use nested named tuples with visibility wrappers, not
positional binding lists.

### 4.4 Browser-Native Features

- No windowing abstraction — use `HTMLCanvasElement` directly
- `ResizeObserver` for canvas resize detection
- `js.Promise` for async GPU initialization (existing for-comprehension
  extensions)
- `requestAnimationFrame` for render loop
- `dom.Event` for input handling (no custom event enum layer)

### 4.5 Mutable State with Immutable Config

Rust uses builders extensively. Scala design:

- **Immutable configs**: `PanelConfig`, `SamplerConfig` as case classes with
  defaults
- **Mutable runtime state**: `Shape.valueBindings`, `Panel.shapes`, etc. as
  `var`s
- Simple assignment instead of builder ceremony for common cases

### 4.6 Scala 3 Enums for GPU State

```scala
enum PrimitiveTopology(val webgpu: String):
  case TriangleList  extends PrimitiveTopology("triangle-list")
  case TriangleStrip extends PrimitiveTopology("triangle-strip")
  case LineList      extends PrimitiveTopology("line-list")
  case LineStrip     extends PrimitiveTopology("line-strip")
  case PointList     extends PrimitiveTopology("point-list")

enum CullMode(val webgpu: String):
  case None  extends CullMode("none")
  case Front extends CullMode("front")
  case Back  extends CullMode("back")

enum BlendMode:
  case Replace, Alpha, Additive, Multiply
  def toBlendState: js.Dynamic = ... // expand to full GPUBlendState

enum TextureFormat(val webgpu: String):
  case RGBA8Unorm  extends TextureFormat("rgba8unorm")
  case RGBA8Snorm  extends TextureFormat("rgba8snorm")
  case BGRA8Unorm  extends TextureFormat("bgra8unorm")
  case RGBA16Float extends TextureFormat("rgba16float")
  case RGBA32Float extends TextureFormat("rgba32float")
  case Depth24Plus extends TextureFormat("depth24plus")
  // extend as needed

enum FrontFace(val webgpu: String):
  case CCW extends FrontFace("ccw")
  case CW  extends FrontFace("cw")
```

---

## 5. Core Type Designs

### 5.1 Painter

```scala
class Painter(
  val device: GPUDevice,
  val queue: GPUQueue,
  val canvas: HTMLCanvasElement,
  val context: GPUCanvasContext,
  val preferredFormat: String,
):
  private val pipelineCache = mutable.HashMap[PipelineKey, GPURenderPipeline]()
  private var nextShadeId = 0

  lazy val fullscreenVertexModule: GPUShaderModule = // built-in fullscreen triangle

  // Direct-to-canvas convenience (permanent shortcut for quick sketches)
  def draw(shape: Shape, clearColor: Option[Vec4Tuple] = None, blendMode: BlendMode = BlendMode.Replace): Unit

  // Panel-based rendering (intermediate render target + blit)
  def paint(panel: Panel): Unit
  def show(panel: Panel): Unit

  // Shader factories (inline to preserve type info for ShaderDef delegation)
  // MVP: values only (single bind group)
  inline def shade[A, V, Values](vertBody: String, fragBody: String): Shade
  // Later: values + textures (two bind groups)
  inline def shade[A, V, Values, Textures](vertBody: String, fragBody: String): Shade
  inline def layerShade[Values](fragBody: String): Shade

  // Resource factories (hide device from user)
  inline def binding[T](value: T): BufferBinding[T, ?]
  inline def binding[T]: BufferBinding[T, ?]
  def form(...): Form
  def panel(...): Panel
```

### 5.2 Shade & the ShaderDef Adapter

`ShaderDef` (in `src/gpu/shader/`) is a general-purpose, standalone utility
whose `Uniforms` type parameter accepts arbitrarily nested named tuples — each
nesting level maps to a bind group. This flexibility is correct for
`ShaderDef`'s level of abstraction and should be preserved.

The **Painter** has an opinionated convention: bind group 0 = value/sampler
bindings, bind group 1 = panel/texture bindings (textures from other Panels).
This convention lives in the painter framework, not in `ShaderDef`.

The painter's `shade` factory is an `inline def` adapter that:

1. Accepts the user's **flat** named tuples (one for values, one for textures)
2. Wraps them into the nested structure `ShaderDef` expects
3. Delegates to `ShaderDef`'s compile-time WGSL generation and layout derivation
4. Returns a `Shade` with the runtime GPU objects

```scala
// User writes flat types for painter — no nesting:
type Values = (viewProj: SharedUniform[Mat4], time: VertexUniform[Float])
type Textures = (albedo: FragmentTexture, normal: FragmentTexture)

// MVP (Milestone 1) — values only:
val shade = painter.shade[Attribs, Varyings, Values](vertBody, fragBody)
// Internally constructs: ShaderDef[Attribs, Varyings, (values: Values), ...](...)

// Later (Milestone 3) — values + textures:
val shade = painter.shade[Attribs, Varyings, Values, Textures](vertBody, fragBody)
// Internally constructs: ShaderDef[Attribs, Varyings, (values: Values, textures: Textures), ...](...)
```

The user never sees the nesting. `ShaderDef` stays general-purpose for use
outside of painter.

#### Shade Runtime Object

```scala
class Shade(
  val id: Int,
  val shaderModule: GPUShaderModule,
  val vertexBufferLayout: js.Dynamic | Null,   // null for layers (post-processing)
  val valueBindGroupLayout: GPUBindGroupLayout,
  val panelBindGroupLayout: GPUBindGroupLayout | Null,
  val pipelineLayout: GPUPipelineLayout,
  val isLayer: Boolean,  // true = fullscreen post-processing (Rust "Effect")
)
```

**Pipeline Layout vs Pipeline Instance**: The `GPUPipelineLayout` produced by
`ShaderDef.createPipelineLayout` depends only on the shader's binding
declarations (the `Uniforms` type parameter). It is independent of blend state,
depth/stencil, multisampling, target formats, topology, and cull mode. Those
concerns only affect the `GPURenderPipeline` instance, which the `Painter`
creates and caches using `PipelineKey`. This separation is clean: `Shade` owns
the pipeline _layout_; `Painter` owns pipeline _instances_.

### 5.3 Form

```scala
class Form(
  private val device: GPUDevice,
  private val queue: GPUQueue,
  private var vertexBuffer: GPUBuffer,
  val vertexCount: Int,
  val topology: PrimitiveTopology = PrimitiveTopology.TriangleList,
  val frontFace: FrontFace = FrontFace.CCW,
):
  def updateVertices(data: ArrayBuffer): Unit
```

Index buffers are deferred to a later milestone. MVP only supports non-indexed
draw calls.

**Integration with existing infrastructure:**

```scala
// User allocates typed vertex data using existing allocateAttribs
type MyAttribs = (position: Vec3, color: Vec4)
val vertices = allocateAttribs[MyAttribs](3)
vertices(0).set((Vec3(0, 1, 0), Vec4(1, 0, 0, 1)))
// ...

// Create Form from the StructArray's underlying ArrayBuffer
val form = painter.form(vertices)  // infers count from StructArray.length
```

### 5.4 Shape

```scala
class Shape(
  val form: Form,
  val shade: Shade,
  var valueBindings: BindingSlots = Map.empty,
  var panelBindings: PanelBindingSlots = Map.empty,
  var instances: Seq[InstanceBindings] = Seq.empty,
  var cullMode: CullMode = CullMode.None,
  var blendMode: BlendMode = BlendMode.Replace,
)
```

### 5.5 Layer (Rust: "Effect")

A **Layer** is a fullscreen post-processing pass — what Rust calls an "Effect".

```scala
class Layer(
  val shade: Shade,  // must have isLayer = true
  var valueBindings: BindingSlots = Map.empty,
  var panelBindings: PanelBindingSlots = Map.empty,
  var instances: Seq[InstanceBindings] = Seq.empty,
  var blendMode: BlendMode = BlendMode.Replace,
  var srcMipLevel: Option[Int] = None,
  var dstMipLevel: Option[Int] = None,
)
```

### 5.6 Panel (Rust: "Layer")

A **Panel** is a render target + composition unit — what Rust calls a "Layer".

```scala
case class PanelConfig(
  width: Int = 0,             // 0 = use canvas size
  height: Int = 0,
  clearColor: Option[Vec4Tuple] = Some((0, 0, 0, 1)),
  formats: Seq[TextureFormat] = Seq(TextureFormat.BGRA8Unorm),
  depthTest: Boolean = false,
  multisample: Boolean = false,
  mipLevelCount: Int = 1,
)

class Panel(
  private val painter: Painter,
  val config: PanelConfig,
):
  // Textures (allocated on creation, reallocated on resize)
  private var targets: Array[GPUTexture]
  private var pingPongTargets: Array[GPUTexture] | Null  // allocated when layers exist
  private var depthTexture: GPUTexture | Null
  private var msaaTextures: Array[GPUTexture] | Null
  private var currentTarget: Int = 0  // ping-pong index

  // Content
  val shapes: mutable.ArrayBuffer[Shape] = mutable.ArrayBuffer.empty
  val layers: mutable.ArrayBuffer[Layer] = mutable.ArrayBuffer.empty

  // Shared bindings (inherited by all shapes/layers)
  var valueBindings: BindingSlots = Map.empty
  var panelBindings: PanelBindingSlots = Map.empty

  // API
  def currentTextureView: GPUTextureView
  def textureViewAt(index: Int): GPUTextureView
  def depthTextureView: Option[GPUTextureView]
  def resize(width: Int, height: Int): Unit
  def width: Int
  def height: Int
```

### 5.7 CanvasApp

```scala
trait CanvasApp:
  def init(painter: Painter): Unit
  def frame(painter: Painter, dt: Double): Unit
  def resize(painter: Painter, width: Int, height: Int): Unit = ()

object CanvasApp:
  def launch(canvas: HTMLCanvasElement)(app: CanvasApp): js.Promise[Unit]
```

`launch` handles: GPU/adapter/device acquisition, context configuration,
ResizeObserver setup, requestAnimationFrame loop with deltaTime.

---

## 6. Implementation Milestones

The implementation follows two major milestones. Milestone 1 proves the
architecture works end-to-end. Milestone 2 proves Scala's value proposition over
Rust through type-safe named bindings — if we can't deliver a meaningfully
better DX than the Rust version, the port isn't justified.

---

### Milestone 1 — MVP: Minimal Rendering Pipeline

**Goal**: Render triangles with zero manual WebGPU boilerplate, built in two
incremental steps. Each step produces a working draft example, and all previous
examples continue to work.

**Scope — included**:

- `CanvasApp` framework (GPU init, rAF loop, resize)
- `Painter` with `draw(shape)` (direct) + `paint(panel)` / `show(panel)` (panel)
- `Shade` wrapping `ShaderDef` (shader module + pipeline layout)
- `Form` (vertex buffer + topology, no index buffer yet)
- `Shape` (Form + Shade + simple `Map[Int, BufferBinding]` bindings +
  blend/cull)
- `Panel` owns a render texture — `paint()` renders into it, `show()` blits to
  canvas via built-in fullscreen triangle + blit shader
- Pipeline cache with `PipelineKey`
- Minimal enums: `PrimitiveTopology`, `CullMode`, `FrontFace`, `BlendMode`
- Built-in fullscreen triangle vertex shader + blit fragment shader in Painter

**Scope — excluded (deferred)**:

- Index buffers on Form
- Textures as user-facing bindings, samplers, panel bindings between panels
- Layers (fullscreen post-processing, Rust "Effects")
- Instances
- Depth testing, MSAA, MRT, mipmaps
- Panel-level bindings and the override hierarchy
- Multi-panel compositing (show only blits a single panel)

**Draft example progression** (in `drafts/`):

1. `simple_triangle` — raw WebGPU, hardcoded vertices in shader (exists)
2. `buffer_triangle` — raw WebGPU + typed vertex buffers/uniforms via helpers
   (exists)
3. `painter_triangle` — Painter/Shade/Form/Shape + `draw()` via CanvasApp
   (**Step A**)
4. `panel_triangle` — Panel render-to-texture + blit (**Step B**)

Each new draft demonstrates the next layer of abstraction. Existing drafts are
never deleted — they remain as reference points and must keep compiling.

#### 6.1 MVP Binding Approach

For Milestone 1, bindings are deliberately simple. Since the painter convention
puts all value/buffer bindings in group 0, the key is just the binding index
(not a `(group, binding)` tuple). The map stores `BufferBinding` objects
directly — the Painter extracts `.gpuBuffer` internally during rendering.

```scala
// MVP: binding index → BufferBinding (group 0 is implicit)
type BindingSlots = Map[Int, BufferBinding[?, ?]]

class Shape(
  val form: Form,
  val shade: Shade,
  var bindings: BindingSlots = Map.empty,
  var cullMode: CullMode = CullMode.None,
  var blendMode: BlendMode = BlendMode.Replace,
)
```

The Painter provides a factory so users don't pass `device` around:

```scala
// On Painter:
inline def binding[T](value: T): BufferBinding[T, ?]  // with initial value
inline def binding[T]: BufferBinding[T, ?]             // uninitialized

// Usage:
val mvp = painter.binding(Mat4.identity)   // infers BufferBinding[Mat4, ...]
val time = painter.binding[Float]          // uninitialized, set later

shape.bindings = Map(0 -> mvp, 1 -> time)

// Update each render cycle:
mvp.set(newMatrix)
time.set(elapsed)
```

No merge hierarchy, no panel bindings. Shapes hold their own bindings directly.

#### 6.2 CanvasApp

```scala
trait CanvasApp:
  def init(painter: Painter): Unit
  def frame(painter: Painter, dt: Double): Unit
  def resize(painter: Painter, width: Int, height: Int): Unit = ()

object CanvasApp:
  def launch(canvas: HTMLCanvasElement)(app: CanvasApp): js.Promise[Unit]
```

`launch` handles: GPU/adapter/device acquisition, context configuration,
ResizeObserver setup, requestAnimationFrame loop with deltaTime.

**Lifecycle**:

1. `init(painter)` — setup resources (shapes, panels, bindings)
2. Automatic initial `resize(painter, w, h)` with current canvas dimensions
3. Automatic initial `frame(painter, 0.0)` — first frame happens without user
   intervention
4. On ResizeObserver events: `resize(painter, w, h)` then `frame(painter, 0.0)`
5. `painter.requestNextFrame()` in `frame()` schedules the next rAF callback. If
   not called, the loop pauses (event-driven / static scene mode).

This means `init` never needs to call `requestNextFrame()` — the framework
always renders at least once after init and after every resize.

---

#### Step A — Direct-to-Canvas Rendering

**Goal**: First working Painter triangle — `painter.draw(shape)` renders one
shape directly to the canvas surface, no intermediate texture.

##### 6.3 `draw(shape)` — Direct Rendering

`draw` is a permanent convenience method for quick sketches. It renders a single
shape directly to the swap chain texture without any intermediate Panel.

```scala
def draw(
  shape: Shape,
  clearColor: Option[Vec4Tuple] = None,
  blendMode: BlendMode = BlendMode.Replace,
): Unit
```

**Algorithm**:

```
1. Create GPUCommandEncoder
2. Get swap chain texture: context.getCurrentTexture()
3. Begin render pass targeting swap chain textureView
   - Load op = clear (if clearColor set) or load
4. Compute pipeline key from shape config + swap chain format
5. Get or create cached pipeline
6. Create bind groups from shape.bindings
7. Set pipeline, vertex buffer, bind groups
8. Draw
9. End render pass
10. Submit command buffer
```

This is the core single-shape rendering logic. In Step B, the same logic is
reused inside `paint(panel)` — the only difference is the render target.

##### 6.4 Step A — Draft Example: `painter_triangle`

```scala
type Attribs = (position: Vec2, color: Vec3)
type Varyings = (color: Vec3)

class PainterTriangleApp extends CanvasApp:
  var shape: Shape = _

  def init(painter: Painter) =
    val shade = painter.shade[Attribs, Varyings, EmptyTuple](
      "output.position = vec4f(input.position, 0.0, 1.0);",
      "return vec4f(input.color, 1.0);"
    )
    val vertices = allocateAttribs[Attribs](3)
    // ... fill vertices ...
    val form = painter.form(vertices)
    shape = Shape(form, shade)

  def frame(painter: Painter, dt: Double) =
    painter.draw(shape, clearColor = Some((0.1, 0.1, 0.1, 1.0)))
    // Static scene — no requestNextFrame().
    // For animation: painter.requestNextFrame() to continue the loop.
```

##### 6.5 Step A — Implementation Steps

**Step 1 — Facades & Enums**

- Extend `facades.scala`: `getPreferredCanvasFormat()`, missing render pass
  descriptor fields
- Create `src/gpu/painter/enums.scala`: `PrimitiveTopology`, `CullMode`,
  `FrontFace`, `BlendMode`

**Step 2 — Shade & Form**

- `Shade`: wraps ShaderDef → GPUShaderModule + pipeline layout
- `Form`: vertex buffer (accepts StructArray), topology, vertex count

**Step 3 — Shape & Painter with `draw()`**

- `Shape`: Form + Shade + slot-indexed bindings + blend/cull
- `Painter`: device holder, pipeline cache, `draw(shape)` renders directly to
  canvas swap chain texture

**Step 4 — CanvasApp**

- Async GPU init, rAF loop, ResizeObserver, deltaTime
- Lifecycle: init → auto resize → auto frame

**Step 5 — `painter_triangle` draft**

- Working example: colored triangle using `painter.draw(shape)` in CanvasApp
- Validate full pipeline: CanvasApp → Painter → Shade/Form/Shape → GPU

---

#### Step B — Panel + Blit

**Goal**: Introduce Panel as intermediate render target. Reuse the per-shape
rendering logic from `draw()`, but render into Panel's texture instead of the
swap chain, then blit to canvas.

##### 6.6 Panel — Render-to-Texture

Each Panel owns a GPU texture that shapes render into. `paint(panel)` renders
shapes into the panel's texture. `show(panel)` blits that texture onto the
canvas swap chain.

```scala
class Panel(
  private val painter: Painter,
  val width: Int,                // 0 = use canvas size
  val height: Int,
  var clearColor: Option[Vec4Tuple] = Some((0, 0, 0, 1)),
  val shapes: mutable.ArrayBuffer[Shape] = mutable.ArrayBuffer.empty,
):
  // Allocated on creation, reallocated on resize
  private var texture: GPUTexture
  private var textureView: GPUTextureView

  def currentTextureView: GPUTextureView = textureView
  def resize(w: Int, h: Int): Unit  // destroy + recreate texture
```

The texture is created with `RENDER_ATTACHMENT | TEXTURE_BINDING` usage — it can
be rendered into and sampled from (for the blit).

##### 6.7 `paint(panel)` + `show(panel)` — Panel Rendering

**paint(panel)** — render shapes into panel's texture:

```
1. Create GPUCommandEncoder
2. Begin render pass targeting panel.textureView
   - Load op = clear (if clearColor set) or load
3. For each shape in panel.shapes:
   a. Render shape (same logic as draw(), different target)
4. End render pass
5. Submit command buffer
```

**show(panel)** — blit panel texture to canvas:

```
1. Get swap chain texture: context.getCurrentTexture()
2. Create render pass targeting swap chain texture (clear)
3. Set blit pipeline (built-in fullscreen triangle + sampler)
4. Create bind group: panel.textureView + nearest sampler
5. Draw(3) — fullscreen triangle, no vertex buffer
6. End render pass, submit
```

The blit pipeline and sampler are created once on the Painter and reused. The
bind group is recreated per-show because the panel texture view may change
(resize). This is cheap — one bind group with two entries.

##### 6.8 Step B — Draft Example: `panel_triangle`

```scala
type Attribs = (position: Vec2, color: Vec3)
type Varyings = (color: Vec3)

class PanelTriangleApp extends CanvasApp:
  var panel: Panel = _

  def init(painter: Painter) =
    val shade = painter.shade[Attribs, Varyings, EmptyTuple](
      "output.position = vec4f(input.position, 0.0, 1.0);",
      "return vec4f(input.color, 1.0);"
    )
    val vertices = allocateAttribs[Attribs](3)
    // ... fill vertices ...
    val form = painter.form(vertices)
    val shape = Shape(form, shade)
    panel = painter.panel(clearColor = Some((0.1, 0.1, 0.1, 1.0)))
    panel.shapes += shape

  def frame(painter: Painter, dt: Double) =
    painter.paint(panel)
    painter.show(panel)
    // Static scene — no requestNextFrame().
    // For animation: painter.requestNextFrame() to continue the loop.
```

##### 6.9 Step B — Implementation Steps

**Step 1 — Facade extensions**

- `createTexture`, `GPUTextureUsage` (`RENDER_ATTACHMENT`, `TEXTURE_BINDING`),
  `createSampler`, `GPUSampler`, `GPUTexture.createView()`

**Step 2 — Panel**

- Panel class: texture allocation, resize, shapes list
- `painter.panel(...)` factory

**Step 3 — `paint()` + `show()` + blit shader**

- `paint(panel)`: reuse per-shape rendering from `draw()`, target panel texture
- `show(panel)`: blit panel texture to canvas
- Built-in fullscreen triangle vertex shader + blit fragment shader, created
  once on Painter init

**Step 4 — `panel_triangle` draft**

- Working example: same colored triangle, now via `paint(panel)` + `show(panel)`
- `painter_triangle` stays unchanged — both drafts work side by side

---

### Milestone 2 — Type-Safe Named Bindings

**Goal**: Replace slot-indexed bindings with a name-based, type-inferred API
that validates binding names and value types at compile time. This is the key DX
improvement that justifies the Scala port over staying with Rust.

#### 6.7 The Vision

```scala
type Values = (
  viewProj: SharedUniform[Mat4],
  time: VertexUniform[Float],
  color: FragmentUniform[Vec3],
  attenuation: FragmentUniform[Float],
)

val shade = painter.shade[Attribs, Varyings, Values](vertBody, fragBody)

// External shared binding — reusable across shapes
val timeBinding = painter.binding(0.0f)

// Create shape — Shade carries the Values type
val shape = Shape(form, shade)

// Type-safe named updates:
shape.set(
  "viewProj" -> Mat4.identity,       // auto-managed: Shape creates internal binding
  "color"    -> Vec3(0.5, 0.4, 0.3), // auto-managed
  "attenuation" -> 2.3,              // auto-managed
  "time"     -> timeBinding,          // external: shared across shapes
)

// Compile-time errors:
shape.set("nonexistent" -> 1.0)     // error: "nonexistent" is not a binding name
shape.set("color" -> 1.0)           // error: expected Vec3, got Double
```

#### 6.8 Design Approach

The Shade must carry the `Uniforms` type at the type level so Shape can use it
for validation. This means `Shade` becomes `Shade[U]` (or we use a typed
wrapper).

**Option A — Typed Shade, typed Shape**:

```scala
class Shade[Uniforms](...) // carries Uniforms type
class Shape[U](form: Form, shade: Shade[U], ...)

// shape.set uses inline + summonFrom to validate names against U
inline def set(bindings: (String, Any)*): Unit
```

**Option B — Typed builder on untyped shape**:

```scala
class Shade(uniforms: UniformsMetadata, ...) // runtime metadata
class Shape(form: Form, shade: Shade, ...)

// Typed update via extension on Shape+Shade pair, using Shade's compile-time info
inline def set[U](shade: Shade[U])(bindings: ...): Unit
```

**Option C — Named tuple as binding input**:

```scala
// Flatten the nested Uniforms into a single named tuple of values:
type FlatUniforms = (viewProj: Mat4, time: Float, color: Vec3, attenuation: Float)

// Shape.set accepts a subset of FlatUniforms as a named tuple:
shape.set((color = Vec3(0.5, 0.4, 0.3), attenuation = 2.3))
shape.set((time = timeBinding))  // BufferBinding[Float] accepted where Float expected
```

This option leverages named tuple structural typing. The compiler checks field
names and types. No string keys. Most Scala-idiomatic.

#### 6.9 Binding Storage Model

Each shape maintains:

```scala
// Internal storage: name → either a managed BufferBinding or external reference
private val managedBindings: mutable.Map[String, BufferBinding[?, ?]]
private val externalBindings: mutable.Map[String, GPUBuffer]
```

When `set("color" -> Vec3(...))` is called:

1. If no managed binding exists for "color", create a `BufferBinding[Vec3]`
2. Call `managedBinding.set(Vec3(...))` — writes to CPU buffer + uploads

When `set("time" -> timeBinding)` is called:

1. Store the external `BufferBinding` reference
2. At render time, use `timeBinding.gpuBuffer`

At render time, the Shape resolves all bindings to `GPUBuffer` references and
creates the bind groups. The name→(group, binding) slot mapping is derived from
the `Uniforms` type at compile time and cached in the Shade.

#### 6.10 Compile-Time Name Resolution

We need an inline function that maps a binding name string to its (group,
binding) indices, derived from the `Uniforms` nested named tuple structure:

```scala
// Given:
//   Uniforms = (scene: (viewProj: ..., time: ...), material: (color: ..., attenuation: ...))
// Derive:
//   "viewProj" → (0, 0), "time" → (0, 1), "color" → (1, 0), "attenuation" → (1, 1)

inline def bindingSlot[Uniforms](name: String): (Int, Int)
// Compile-time error if name doesn't match any field in the flattened Uniforms
```

This is achievable with `constValueOpt`, `erasedValue`, and `inline match` on
the named tuple structure. The existing `derive.scala` already walks the nested
named tuple structure for WGSL generation — this is the same traversal,
producing slot indices instead of WGSL code.

#### 6.11 Type Validation

For each binding name, we also validate the value type:

```scala
inline def validateBinding[Uniforms](name: String, value: Any): Unit
// At compile time, resolves "color" to FragmentUniform[Vec3],
// unwraps to Vec3, and checks that the provided value is Vec3 or BufferBinding[Vec3, ?]
```

Using `summonFrom` + match types:

```scala
type UnwrapUniform[T] = T match
  case VertexUniform[t]   => t
  case FragmentUniform[t] => t
  case SharedUniform[t]   => t

type BindingValueAt[Uniforms, Name <: String] = ... // resolve name → type via match
```

#### 6.12 Milestone 2 Implementation Steps

**Step 1 — Shade metadata**

- Add compile-time name→slot resolution to `derive.scala`
- Shade stores runtime `Map[String, (Int, Int)]` for name→slot lookup

**Step 2 — Typed shape bindings**

- Replace `BindingSlots = Map[(Int, Int), GPUBuffer]` with name-based storage
- Internal managed bindings vs external references
- `shape.set(...)` with compile-time name+type validation

**Step 3 — Named tuple binding syntax** (stretch)

- Accept named tuple subsets for fully structural binding updates
- `shape.set((color = Vec3(...), attenuation = 2.3))`

**Step 4 — Panel bindings & merge** (after named bindings work)

- Reintroduce panel-level shared bindings
- Merge hierarchy: panel → shape (by name, not slot index)

---

### Future Milestones

#### Milestone 3 — Layers (Post-Processing) & Cross-Panel Composition

- Layer class (fullscreen post-processing — Rust "Effect")
- Texture ping-pong for layer chains
- PanelBinding enum (Source, AtIndex, Depth, etc.) — reading textures from other
  Panels
- Multi-panel compositing in `show()`
- Form: index buffers and multiple vertex buffers

#### Milestone 4 — Advanced Features

- Depth testing, MSAA, MRT
- Mipmap generation
- Sampler bindings
- Instance rendering with per-instance binding overrides
- Instance rendering optimization (four-case strategy)

#### Milestone 5 — Examples & Polish

- Triangle, textured quad, animated uniforms
- Blur post-processing, deferred lighting
- API ergonomics review

---

## 7. Long-Term Vision: Unified CPU/GPU Programming

This section documents the north star that should guide all architectural
decisions throughout development, even when we're not directly working on it.

### 7.1 The Problem Across Ecosystems

Every GPU framework suffers from a fundamental split: the shader language and
the host language are different worlds. Types are duplicated, math libraries are
reimplemented, and the contract between CPU and GPU code must be manually kept
in sync. Bugs at this boundary are caught only at runtime (or worse, produce
silent visual glitches).

**Rust trivalibs** improved on this: shaders were written in Rust using the same
math crate, compiled to SPIR-V via `rust-gpu`, and loaded on the CPU side. The
math was shared, the language was shared. But the `Shade` contract (attribute
formats, binding layouts) still had to be manually declared on the CPU side and
kept in sync with the shader — a remaining seam.

**Our Scala port already closes part of that gap**: the `ShaderDef` type
parameters (`Attribs`, `Varyings`, `Uniforms`) are the single source of truth.
They derive both the WGSL struct declarations and the WebGPU layout objects. The
CPU and GPU sides are type-checked against the same definition. But the shader
_body_ is still a raw WGSL string — an opaque, untyped escape hatch.

### 7.2 The Vision: Scala Shader DSL

Replace WGSL string bodies with a Scala DSL that:

1. **Reuses the same math types** — `Vec3`, `Mat4`, etc. work identically in CPU
   code and in shader expressions
2. **Is type-checked by the Scala compiler** — accessing `.xyz` on a `Vec2` is a
   compile error, not a GPU runtime error
3. **Compiles to WGSL** — the DSL is an AST that serializes to WGSL strings at
   compile time or initialization
4. **Shares functions** — a `normalize(v: Vec3): Vec3` function can be used in
   both CPU-side simulation and GPU-side shading

The analogy to React is deliberate:

| React                    | Scala WebGPU                             |
| ------------------------ | ---------------------------------------- |
| Server Components        | CPU-side code                            |
| Client Components        | Shader code (GPU)                        |
| Network boundary         | CPU/GPU boundary                         |
| JSX compiles to both     | Scala DSL compiles to both native + WGSL |
| Shared types (props)     | Shared types (Attribs, Uniforms, math)   |
| `"use client"` directive | Shader context / `@gpu` annotation       |

The developer writes one language, one math library, one set of types. The
compiler figures out which code runs where and generates the appropriate output
for each side.

### 7.3 Progressive Approach

This is not an all-or-nothing feature. We build it incrementally, and each step
delivers standalone value:

**Already done** (current codebase):

- Shared type definitions via `ShaderDef` type parameters
- Compile-time WGSL struct generation from Scala types
- Type-safe attribute/uniform layout derivation

**Milestone 2** (named bindings):

- CPU code refers to shader bindings by name, validated at compile time
- Further tightens the CPU/GPU contract

**Future: Shader expression DSL** (AST-based):

```scala
// Instead of:
val shader = Shader[Attribs, Varyings, Uniforms](
  vertexBody = "output.position = uniforms.viewProj * vec4f(input.position, 1.0);",
  fragmentBody = "return vec4f(input.color * uniforms.albedo.rgb, 1.0);"
)

// Write:
val shader = Shader[Attribs, Varyings, Uniforms](
  vertex = (input, uniforms) => ShaderOut(
    position = uniforms.viewProj * Vec4(input.position, 1.0)
  ),
  fragment = (input, uniforms) => FragOut(
    color = Vec4(input.color * uniforms.albedo.xyz, 1.0)
  ),
)
```

The DSL captures an expression AST (not executing the math) that serializes to
WGSL. The same `Vec4(...)`, `*`, `.xyz` syntax that works on CPU `Vec4` values
also works in shader context — but produces AST nodes instead of computed
values.

**Future: Shared CPU/GPU functions**:

```scala
// This function works on both sides:
def phongLighting(normal: Vec3, lightDir: Vec3, viewDir: Vec3): Vec3 =
  val ambient = 0.1
  val diffuse = max(dot(normal, lightDir), 0.0)
  val reflect = reflect(-lightDir, normal)
  val specular = pow(max(dot(viewDir, reflect), 0.0), 32.0)
  Vec3(ambient + diffuse + specular)

// CPU: called normally, returns a Vec3 value
val cpuResult = phongLighting(n, l, v)

// GPU: captured as AST, emitted as WGSL function
fragment = (input, uniforms) => FragOut(
  color = Vec4(phongLighting(input.normal, uniforms.lightDir, input.viewDir), 1.0)
)
```

### 7.4 Implementation Strategy for the DSL

The DSL can be built using Scala 3's metaprogramming:

- **Opaque GPU expression types**: `GpuFloat`, `GpuVec3`, `GpuMat4` that mirror
  the CPU types but build an AST instead of computing values
- **Implicit conversions**: CPU `Vec3` → `GpuVec3` literal in shader context
- **Operator overloading**: `+`, `*`, `.xyz` on GPU types produce AST nodes
- **Inline macros**: `shader { ... }` block captures the body as AST at compile
  time, type-checks it using Scala's type system, and serializes to WGSL
- **Shared trait hierarchy**: `trait Vec3Ops[V]` implemented by both CPU `Vec3`
  and GPU `GpuVec3`, enabling truly shared function signatures

### 7.5 Design Constraints from the Vision

These constraints should guide decisions in earlier milestones:

1. **Keep math types trait-based**: The trait hierarchy (`Vec3Base`,
   `Vec3ImmutableOps`, etc.) is essential — GPU expression types will implement
   the same traits, enabling shared functions.

2. **Don't hardcode WGSL strings in the framework**: Use string generation from
   structured representations wherever possible, so we can later swap in
   AST-based generation.

3. **Keep shader body separate from contract**: The `ShaderDef` already
   separates the type-level contract (type parameters) from the body (strings).
   This separation is exactly right — the body becomes the DSL output.

4. **Named bindings by name, not index**: Milestone 2's named bindings ensure
   that both CPU binding code and GPU shader code refer to the same names. When
   the DSL arrives, `uniforms.viewProj` in the shader DSL and
   `shape.set("viewProj" -> ...)` on the CPU resolve to the same binding — by
   name, type-checked.

5. **Math functions as pure expressions**: Prefer pure, side-effect-free math
   functions. These are the ones that can be lifted to the GPU. Mutable math
   operations (`.add`, `.set`) are CPU-only by nature.

---

## 8. WebGPU Facade Extensions

Needed across milestones. Only add what's needed per milestone.

**Milestone 1, Step A** (direct-to-canvas):

```scala
// Navigator / GPU
def getPreferredCanvasFormat(): String
// + any missing render pass descriptor fields
```

**Milestone 1, Step B** (render-to-texture + blit):

```scala
// Navigator / GPU
def getPreferredCanvasFormat(): String

// Device
def createTexture(descriptor: js.Dynamic): GPUTexture
def createSampler(descriptor: js.Dynamic): GPUSampler

// Texture
def createView(): GPUTextureView
def createView(descriptor: js.Dynamic): GPUTextureView
def destroy(): Unit

// Constants
object GPUTextureUsage:
  val RENDER_ATTACHMENT: Int
  val TEXTURE_BINDING: Int

@js.native trait GPUSampler extends js.Object
```

**Milestone 3+** (textures, effects):

```scala
@js.native trait GPUSampler extends js.Object

def createSampler(descriptor: js.Dynamic): GPUSampler
def createTexture(descriptor: js.Dynamic): GPUTexture

def width: Int; def height: Int; def mipLevelCount: Int
def destroy(): Unit  // GPUTexture, GPUBuffer

def setIndexBuffer(buffer: GPUBuffer, format: String): Unit
def drawIndexed(indexCount: Int, ...): Unit

object GPUTextureUsage:
  val COPY_SRC, COPY_DST, TEXTURE_BINDING, STORAGE_BINDING, RENDER_ATTACHMENT: Int

def copyTextureToTexture(src: js.Dynamic, dst: js.Dynamic, size: js.Dynamic): Unit
```

---

## 9. Open Questions

1. **Typed binding syntax**: Named tuple subset syntax
   (`shape.set((color = v, time = t))`) vs string key syntax
   (`shape.set("color" -> v, "time" -> t)`)? Named tuples are more
   Scala-idiomatic but may hit the named-tuple-reduction issue in match types.
   String keys are simpler to implement and still type-checkable via inline.

2. **Shade type parameter erasure**: If `Shade[U]` carries `Uniforms` as a type
   parameter, does that complicate storage in collections (`List[Shade[?]]`)?
   May need a non-generic base trait with typed extension.

3. **Form creation ergonomics**: Should `painter.form(structArray)` infer vertex
   count and stride directly from the `StructArray`, or require explicit count?

4. **Panel texture format**: When panels get advanced features (Milestone 4),
   should formats be inferred from the shades or always explicit?

---

## 10. File Organization

```
src/gpu/painter/
├── enums.scala        — PrimitiveTopology, CullMode, FrontFace, BlendMode, TextureFormat
├── Shade.scala        — Shade class + factories
├── Form.scala         — Form class
├── Shape.scala        — Shape class + binding storage
├── Layer.scala        — Layer: fullscreen post-processing (Rust "Effect")
├── Panel.scala        — Panel: render target + shapes (Rust "Layer")
├── Painter.scala      — Painter class, pipeline cache, draw/paint/show
├── CanvasApp.scala    — CanvasApp trait + launch
└── package.scala      — re-exports

src/webgpu/
└── facades.scala      — extended incrementally per milestone

drafts/                    — iterative working examples
├── index.html             — portal page linking to all drafts
├── out/                   — compiled JS output
├── simple_triangle/       — raw WebGPU, hardcoded vertices
├── buffer_triangle/       — raw WebGPU + typed helpers
├── painter_triangle/      — Painter + draw() (Step A)
└── panel_triangle/        — Panel + paint/show (Step B)
```
