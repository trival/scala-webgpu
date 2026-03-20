# Panel Texture Bindings & Post-Processing Effects — Implementation Plan

Two sequential features, each targeting a specific Rust example port. Feature 1
must be completed before Feature 2, as Feature 2 needs the texture
infrastructure from Feature 1.

---

## Table of Contents

1. [Texture & Sampler API Reference](#1-texture--sampler-api-reference)
2. [Feature 1: Panel Texture Bindings + MSAA (layer_tex port)](#2-feature-1-panel-texture-bindings--msaa)
3. [Feature 2: Post-Processing Stack / Ping-Pong (blur port)](#3-feature-2-post-processing-stack--ping-pong)
4. [Open Questions](#4-open-questions)

---

## 1. Texture & Sampler API Reference

### 1.1 The Two GPU Resource Types

`Texture2D` and `Sampler` are unified GPU resource types — they serve double
duty as both the **type used in declarations** (shader contracts, `WgslFn`
parameter types) and the **DSL expression type** returned from context accessors
(`ctx.textures.*`, `ctx.bindings.*`). Unlike `Vec2`, `Float`, etc., they have
no CPU-side representation.

At runtime both are opaque string-wrapping types (like all `*Expr` types), where
`toString` yields the WGSL variable name. `WGSLType[Texture2D].wgslName =
"texture_2d<f32>"`, `WGSLType[Sampler].wgslName = "sampler"`.

### 1.2 Sampler Bindings (Group 0)

Samplers live in group 0 alongside buffer uniforms. Declare them in `U` using
the standard visibility wrappers:

```scala
type Uniforms = (
  mvp:        VertexUniform[Mat4],
  texSampler: FragmentUniform[Sampler],  // group 0, slot 1
)
```

The `Painter` provides two shared, lazily created samplers:

```scala
painter.samplerNearest   // GPUSampler — nearest-neighbour filtering
painter.samplerLinear    // GPUSampler — bilinear filtering
```

Bind them to a shape or layer by name, exactly like any other uniform:

```scala
val myShape = painter.shape(form, shade)
  .bind(
    "mvp"        := mvpBinding,
    "texSampler" := painter.samplerNearest,
  )
```

`BindingSlots` accepts both `BufferBinding[?, ?]` and `GPUSampler` entries.

### 1.3 Panel Texture Declarations (Group 1)

A shape or layer that samples another panel's output declares it in a `P` named
tuple. Use three visibility wrappers to indicate which shader stage sees the
texture:

```scala
sealed trait FragmentPanel  // texture_2d visible in fragment shader
sealed trait VertexPanel    // texture_2d visible in vertex shader
sealed trait SharedPanel    // texture_2d visible in both shaders
```

```scala
type Panels = (
  colorTex: FragmentPanel,   // @group(1) @binding(0) var colorTex: texture_2d<f32>
  depthTex: FragmentPanel,   // @group(1) @binding(1) var depthTex: texture_2d<f32>
)
```

Pass `P` as the second type argument to `shade`:

```scala
val texShade = painter.shade[Attribs, Varyings, Uniforms, Panels]: program =>
  ...
```

Panel bindings are passed to the same `bind` method as uniforms and samplers —
field names in `U` and `P` are always distinct, so there is no collision.
`processEntry` dispatches at compile time: names found in `U` go to group 0
binding slots, names found in `P` go to the panel binding array:

```scala
val myShape = painter.shape(form, texShade)
  .bind(
    "mvp"        := mvpBinding,
    "texSampler" := painter.samplerNearest,
    "colorTex"   := trianglePanel,   // Panel — dispatched to panelBindings
    "depthTex"   := quadPanel,
  )
```

### 1.4 Accessing Textures and Samplers in the DSL

`ctx.textures` gives typed access to the `P` panel bindings. Each field returns
a `Texture2D` expression:

```scala
ctx.textures.colorTex   // Texture2D
```

`ctx.bindings` returns `Sampler` for any uniform field typed
`*Uniform[Sampler]`:

```scala
ctx.bindings.texSampler   // Sampler
```

### 1.5 Texture2D Methods

`Texture2D` exposes sampling as dot-methods, matching the project's existing
DSL style (`vec.mix(other, t)`, etc.):

```scala
// Primary method — explicit name
tex.sample(uv: Vec2Expr, sampler: Sampler): Vec4Expr
// Emits: textureSample(tex, sampler, uv)

// Shorthand alias — enables tex(uv, sampler) call syntax
tex.apply(uv: Vec2Expr, sampler: Sampler): Vec4Expr
// Same output as .sample()

// Future methods (planned, not in Feature 1):
tex.sampleLevel(uv: Vec2Expr, sampler: Sampler, lod: FloatExpr): Vec4Expr
// Emits: textureSampleLevel(tex, sampler, uv, lod)

tex.sampleGrad(uv: Vec2Expr, sampler: Sampler, ddx: Vec2Expr, ddy: Vec2Expr): Vec4Expr
// Emits: textureSampleGrad(tex, sampler, uv, ddx, ddy)

tex.sampleBias(uv: Vec2Expr, sampler: Sampler, bias: FloatExpr): Vec4Expr
// Emits: textureSampleBias(tex, sampler, uv, bias)
```

### 1.6 Sampling in a Fragment Shader

```scala
type Attribs  = (position: Vec3, uv: Vec2)
type Varyings = (uv: Vec2)
type Uniforms = (mvp: VertexUniform[Mat4], texSampler: FragmentUniform[Sampler])
type Panels   = (colorTex: FragmentPanel)

val texShade = painter.shade[Attribs, Varyings, Uniforms, Panels]: program =>
  program.vert: ctx =>
    Block(
      ctx.out.uv       := ctx.in.uv,
      ctx.out.position := ctx.bindings.mvp * vec4(ctx.in.position, 1.0),
    )
  program.frag: ctx =>
    // Explicit:
    ctx.out.color := ctx.textures.colorTex.sample(ctx.in.uv, ctx.bindings.texSampler)
    // Shorthand:
    ctx.out.color := ctx.textures.colorTex(ctx.in.uv, ctx.bindings.texSampler)
    // Both emit: out.color = textureSample(colorTex, texSampler, in.uv);
```

### 1.7 WgslFn with Texture2D and Sampler Parameters

`Texture2D` and `Sampler` are valid `WgslFn` parameter types. The generated
WGSL function signature uses `texture_2d<f32>` and `sampler` respectively.

**`WgslFn.raw`** — raw WGSL body, typed Scala call site:

```scala
val gaussianBlur9: WgslFn[(tex: Texture2D, s: Sampler, uv: Vec2, res: Vec2, dir: Vec2), Vec4] =
  WgslFn.raw("gaussian_blur_9"):
    """
    var color = vec4(0.0);
    let off1 = vec2<f32>(1.3846153846) * dir / res;
    let off2 = vec2<f32>(3.2307692308) * dir / res;
    color += textureSample(tex, s, uv)        * 0.2270270270;
    color += textureSample(tex, s, uv + off1) * 0.3162162162;
    color += textureSample(tex, s, uv - off1) * 0.3162162162;
    color += textureSample(tex, s, uv + off2) * 0.0702702703;
    color += textureSample(tex, s, uv - off2) * 0.0702702703;
    return color;
    """
// Generates:
// fn gaussian_blur_9(tex: texture_2d<f32>, s: sampler, uv: vec2<f32>,
//                    res: vec2<f32>, dir: vec2<f32>) -> vec4<f32> { ... }
```

**`WgslFn.dsl`** — `params.tex` IS a `Texture2D`, has `.sample()` directly:

```scala
val sampleAt: WgslFn[(tex: Texture2D, s: Sampler, uv: Vec2), Vec4] =
  WgslFn.dsl("sample_at"): (p, ret) =>
    ret(p.tex.sample(p.uv, p.s))
// Generates:
// fn sample_at(tex: texture_2d<f32>, s: sampler, uv: vec2<f32>) -> vec4<f32> {
//   return textureSample(tex, s, uv);
// }
```

**Calling a texture WgslFn from a shader** — `Texture2D` and `Sampler` slot
directly into the typed argument positions:

```scala
program.fn(gaussianBlur9)
program.frag: ctx =>
  ctx.out.color := gaussianBlur9(
    ctx.textures.source,
    ctx.bindings.blurSampler,
    ctx.in.uv,
    ctx.bindings.resolution,
    ctx.bindings.dir * ctx.bindings.diameter,
  )
```

### 1.8 MSAA Panels

Enable 4× MSAA on a panel with `multisample = true`. The painter renders into
the MSAA texture and resolves to the regular texture automatically. When another
shape samples the resolved panel, it reads a plain `texture_2d<f32>` — no WGSL
changes needed on the consumer side:

```scala
val msaaPanel = painter.panel(
  width = 800, height = 800,
  clearColor = (0.0, 1.0, 0.0, 1.0),
  shapes = Arr(colorShape),
  multisample = true,
)
// msaaPanel.textureView is the resolved output — safe to bind in group 1
```

### 1.9 Post-Processing Layers

For layers in a post-processing stack, `P` is declared the same way as for
shapes. When a layer does **not** manually bind slot 0, the painter automatically
injects the previous render result there — enabling the ping-pong chain. If a
layer **does** bind slot 0 explicitly, that binding is respected and no
ping-pong swap occurs for that layer:

```scala
type LayerUniforms = (blurSampler: FragmentUniform[Sampler], ...)
type LayerPanels   = (source: FragmentPanel)   // slot 0 = auto-filled when unbound

val blurShade = painter.layerShade[LayerUniforms, LayerPanels]: program =>
  program.fn(gaussianBlur9)
  program.frag: ctx =>
    ctx.out.color := gaussianBlur9(
      ctx.textures.source,         // auto-filled with previous render result
      ctx.bindings.blurSampler,
      ctx.in.uv,
      ctx.bindings.resolution,
      ctx.bindings.dir * ctx.bindings.diameter,
    )

// Omit "source" from bind — painter injects the ping-pong source automatically:
val blurLayer = painter.layer(blurShade)
  .bind("blurSampler" := painter.samplerLinear)

// Override slot 0 manually — painter respects it, no ping-pong swap for this layer:
val fixedLayer = painter.layer(blurShade)
  .bind("source" := someFixedPanel, "blurSampler" := painter.samplerLinear)
```

Layers without `P` (procedural effects, plasma, etc.) are unaffected —
rendered in-place with no ping-pong:

```scala
val plasmaShade = painter.layerShade[PlasmaUniforms]: program =>   // P = EmptyTuple
  program.frag: ctx =>
    ctx.out.color := ...
```

---

## 2. Feature 1: Panel Texture Bindings + MSAA

**Goal**: Allow shapes (and layers) to sample another Panel's render output as a
texture. Also implement MSAA on panels so the Rust `layer_tex` example can be
fully ported. The target draft is `drafts/layer_tex/`: two intermediate panels
render colored shapes, a third panel's shapes sample those textures.

### 2.1 What the Rust Example Does

`layer_tex` creates:

- `color_triangle_layer` — red triangle on yellow background, 800×800 fixed size
- `color_quad_layer` — blue quad on green background, 800×800, **with MSAA**
- `canvas` layer — two shapes each sampling one of the above panels:
  - A quad sampling `color_triangle_layer` (nearest sampler)
  - A triangle sampling `color_quad_layer` (linear sampler)

Key patterns in the Rust source:

```rust
// Shader declares a layer binding in group 1
let tex_shade = p
  .shade([Float32x3, Float32x2])
  .with_bindings([BINDING_BUFFER_VERT, BINDING_SAMPLER_FRAG])  // group 0
  .with_layers([BINDING_LAYER_FRAG])                            // group 1
  .create();

// Shape binds a panel texture at group 1, slot 0
let tex_quad_shape = p.shape(quad_form, tex_shade)
  .with_bindings(map! {
    0 => tex_quad_mvp.binding(),
    1 => nearest_sampler.binding(),
  })
  .with_layers(map! { 0 => color_triangle_layer.binding() })
  .create();

// Layer with MSAA enabled
let color_quad_layer = p.layer()
  .with_shape(color_quad_shape)
  .with_multisampling()
  .create();
```

### 2.2 Scala Design

#### 2.2.1 Group 0: Sampler Bindings

`Sampler` serves as both the uniform contract type (in `U` with visibility
wrappers) and the DSL expression type. Each uniform field already gets its own
declaration (the existing generator emits one `var<uniform>` line per field).
Sampler fields use a different address space — `var name: sampler;` instead of
`var<uniform> name: type;`:

```wgsl
@group(0) @binding(0) var<uniform> mvp: mat4x4<f32>;
@group(0) @binding(1) var texSampler: sampler;
```

`WGSLType[Sampler]`: `wgslName = "sampler"`, no `byteSize`/`alignment`. The
generator checks the field type and emits the sampler variant (no address space
qualifier). The bind group layout entry uses `sampler = Obj.literal()` instead
of `buffer = Obj.literal(type = "uniform")`.

At runtime, `BindingSlots` accepts both `BufferBinding[?, ?]` and `GPUSampler`.
`createBindGroup` dispatches on entry type.

**Painter sampler factories** (lazy, shared):

```scala
lazy val samplerNearest: GPUSampler
lazy val samplerLinear: GPUSampler
```

#### 2.2.2 Group 1: Panel Texture Declarations

A new type parameter `P` on `Shade` represents panel textures in group 1.
`P` is a named tuple of `FragmentPanel` / `VertexPanel` / `SharedPanel` fields.

`Shade[U, P = EmptyTuple]` gains `panelBindGroupLayout`:

```scala
class Shade[U, P = EmptyTuple](
  val id: Int,
  val shaderModule: GPUShaderModule,
  val vertexBufferLayout: js.Dynamic | Null,
  val valueBindGroupLayout: GPUBindGroupLayout | Null,   // group 0
  val panelBindGroupLayout: GPUBindGroupLayout | Null,   // group 1 (new)
  val pipelineLayout: GPUPipelineLayout,
  val isLayer: Boolean,
)
```

`derive.scala` additions:

1. `generatePanelDeclarations[P]: String` — emits
   `@group(1) @binding(N) var name: texture_2d<f32>;` for each field in `P`
2. `createPanelBindGroupLayout[P](device): GPUBindGroupLayout` — one `texture`
   entry per field with visibility from the wrapper type

`Texture2D` serves both as the declared field type in `WgslFn` params and as the
DSL expression returned by `ctx.textures.*`. `WGSLType[Texture2D].wgslName =
"texture_2d<f32>"`.

#### 2.2.3 Shape[U, P] and Layer[U, P]

Both classes gain `panelBindings: Arr[Panel | Null]` as internal storage.
There is no separate `bindPanels` method — panel bindings go through the same
`bind` method as uniforms and samplers. `processEntry` resolves the name at
compile time: if found in `U`, it routes to `bindings`; if found in `P`, it
routes to `panelBindings`. A name absent from both is a compile error.

```scala
class Shape[U, P = EmptyTuple](
  val form: Form,
  val shade: Shade[U, P],
  val device: GPUDevice,
  var bindings: BindingSlots           = Arr(),
  var panelBindings: Arr[Panel | Null] = Arr(),   // internal, filled via bind()
  var cullMode: CullMode               = CullMode.None,
  var blendState: Opt[BlendState]      = Opt.Null,
)
```

`Layer[U, P = EmptyTuple]` — same.

The `processEntry` dispatch:

```scala
private inline def processEntry[N <: String & Singleton, V](value: V): Unit =
  inline if containsName[N, U] then
    // uniform / sampler path (existing)
    derive.checkUniformFieldType[N, V, U]
    val idx = derive.uniformFieldIndex[N, U]
    ...
  else inline if containsName[N, P] then
    // panel path — V must be Panel
    inline value match
      case p: Panel =>
        val idx = derive.panelFieldIndex[N, P]
        while panelBindings.length <= idx do panelBindings.push(null)
        panelBindings(idx) = p
      case _ => error("Panel binding must be a Panel instance")
  else
    error("Name not found in uniforms or panel bindings")
```

#### 2.2.4 Painter Factory Changes

```scala
inline def shade[A, V, U, P](build: Program[A, V, U] => Unit): Shade[U, P]
inline def layerShade[U, P](build: LayerProgram[U, P] => Unit): Shade[U, P]
```

The 4-param `shade[A, V, U, P]` overload generates panel WGSL declarations via
`generatePanelDeclarations[P]` and includes the panel BGL in the pipeline layout
when `P != EmptyTuple`.

#### 2.2.5 Render Path Changes

`renderShapeOnPass` — set group 1 when panelBindings non-empty:

```scala
if shape.panelBindings.length > 0 && shape.shade.panelBindGroupLayout != null then
  val panelGroup = device.createBindGroup(Obj.literal(
    layout = shape.shade.panelBindGroupLayout,
    entries = buildPanelEntries(shape.panelBindings),
  ))
  pass.setBindGroup(1, panelGroup)
```

`buildPanelEntries` maps each non-null slot to the panel's `textureView`.
`renderLayerOnPass` same.

#### 2.2.6 MSAA Support

**Panel changes**:

```scala
class Panel(..., val multisample: Boolean = false, ...):
  private var _msaaTexture: GPUTexture | Null = null
  private var _msaaView: GPUTextureView | Null = null
```

`ensureSize` allocates a 4× MSAA texture when `multisample = true`. The render
pass targets the MSAA view and resolves into the regular texture view:

```scala
Obj.literal(
  view = panel.msaaView,
  resolveTarget = panel.textureView,
  loadOp = "clear",
  storeOp = "discard",
  clearValue = ...,
)
```

Pipelines for shapes/layers rendered into an MSAA panel include
`multisample = Obj.literal(count = 4)`. The pipeline cache key includes the
sample count.

**`painter.panel` factory update**:

```scala
def panel(
  width: Int = 0,
  height: Int = 0,
  clearColor: Opt[...] = ...,
  shapes: Arr[Shape[?]] = Arr(),
  layers: Arr[Layer[?]] = Arr(),
  multisample: Boolean = false,
): Panel
```

#### 2.2.7 DSL Context: ctx.textures

`FragmentCtx` and `VertexCtx` gain a `textures: TypedPanelAccessor[P]` field.
`TypedPanelAccessor[P]` wraps each field of `P` as a `Texture2D` keyed by name.

`UniformToExpr` gains `Sampler` cases:

```scala
type UniformToExpr[T] = T match
  case VertexUniform[Sampler]   => Sampler
  case FragmentUniform[Sampler] => Sampler
  case SharedUniform[Sampler]   => Sampler
  case VertexUniform[t]         => ToExpr[t]
  // ... existing cases
```

`ToExpr` gains self-mapping cases:

```scala
type ToExpr[T] = T match
  case Sampler   => Sampler
  case Texture2D => Texture2D
  case Float     => FloatExpr
  // ... existing cases
```

When `P = EmptyTuple`, `textures` is a zero-field accessor — no change to
existing shaders.

#### 2.2.8 Backward Compatibility

`Shade[U, P = EmptyTuple]`, `Shape[U, P = EmptyTuple]`, `Layer[U, P = EmptyTuple]`
— default type parameters mean all existing code compiles unchanged.

### 2.3 Implementation Steps

**Step 1 — Texture2D + Sampler types + BindingSlots**

- Add `opaque type Texture2D <: Expr = Expr` to `expr.scala` with `.sample()`,
  `.apply()` extension methods
- Add `opaque type Sampler <: Expr = Expr` to `expr.scala`
- Add `WGSLType[Texture2D]` (`wgslName = "texture_2d<f32>"`) and
  `WGSLType[Sampler]` (`wgslName = "sampler"`) to `types.scala`
- Add `ToExpr[Texture2D] = Texture2D` and `ToExpr[Sampler] = Sampler` to
  `dsl/types.scala`
- Add `UniformToExpr` cases for `*Uniform[Sampler]` to `dsl/types.scala`
- Update `derive.scala` / `generateUniforms[U]`: split fields into buffer fields
  (struct) and sampler fields (standalone `var`), consistent binding indices
- Update `layouts.scala` / `bindGroupEntries` to emit `sampler = Obj.literal()`
  for sampler fields
- Expand `BindingSlots` / `BindingEntry` to accept `GPUSampler`
- Update `createBindGroup` in `painter.scala` for sampler entries
- Add `samplerNearest` and `samplerLinear` lazy vals to `Painter`

**Step 2 — Panel bind group (group 1)**

- Add `sealed trait FragmentPanel`, `VertexPanel`, `SharedPanel` to `types.scala`
- Add `generatePanelDeclarations[P]` to `derive.scala`
- Add `createPanelBindGroupLayout[P]` to `layouts.scala`
- Update `ShaderDef.generateWGSL` to append panel declarations
- Update `Shade[U, P = EmptyTuple]` with `panelBindGroupLayout` field
- Update `painter.shade[A, V, U, P]` for panel BGL
- Update pipeline layout creation to include group 1 BGL when `P != EmptyTuple`

**Step 3 — Shape / Layer / render path**

- `Shape[U, P = EmptyTuple]` — add `panelBindings: Arr[Panel | Null]`; update
  `processEntry` to dispatch by name across both `U` and `P`; add compile-time
  `containsName[N, T]` and `panelFieldIndex[N, P]` helpers to `derive.scala`
- `Layer[U, P = EmptyTuple]` — same
- Update `renderShapeOnPass` and `renderLayerOnPass` for group 1
- Add `TypedPanelAccessor[P]` to DSL
- Add `textures: TypedPanelAccessor[P]` to `FragmentCtx`, `VertexCtx`
- Update `Program.frag[L]`, `Program.vert[L]`, `LayerProgram.frag[L]`

**Step 4 — MSAA**

- Add `multisample: Boolean` to `Panel`
- `Panel.ensureSize` allocates MSAA texture when `multisample = true`
- `paint(panel)`: MSAA attachment format when `panel.multisample`
- `createPipeline` / `createLayerPipeline`: `multisample = { count: 4 }` + cache
  key update

**Step 5 — layer_tex draft**

- Create `drafts/layer_tex/`
- `trianglePanel` — red triangle (Mat4 MVP uniform), yellow clear, 800×800
- `quadPanel` — blue quad (Mat4 MVP uniform), green clear, 800×800, MSAA
- `canvasPanel` — two shapes using `texShade`:
  - Quad sampling `trianglePanel`, nearest sampler
  - Triangle sampling `quadPanel`, linear sampler
- Rotating transforms via `animate`
- `setInterval` every 2s to toggle panel sizes and swap clear colors

### 2.4 WGSL Generated (texture shade)

```wgsl
struct VertexInput  { @location(0) position: vec3<f32>, @location(1) uv: vec2<f32> }
struct VertexOutput { @builtin(position) position: vec4<f32>, @location(0) uv: vec2<f32> }
struct FragmentOutput { @location(0) color: vec4<f32> }

@group(0) @binding(0) var<uniform> mvp: mat4x4<f32>;
@group(0) @binding(1) var texSampler: sampler;

@group(1) @binding(0) var colorTex: texture_2d<f32>;

@vertex fn vs_main(in: VertexInput) -> VertexOutput { ... }
@fragment fn fs_main(in: VertexOutput) -> FragmentOutput {
  var out: FragmentOutput;
  out.color = textureSample(colorTex, texSampler, in.uv);
  return out;
}
```

---

## 3. Feature 2: Post-Processing Stack / Ping-Pong

**Goal**: When a Panel has layers, each layer in the stack reads from the
previous render result via ping-pong render targets. The target draft is
`drafts/blur/`: a triangle rendered to a panel, then Gaussian blur applied in
multiple passes as layers.

**Prerequisite**: Feature 1 must be implemented first. Feature 2 reuses the
`Layer[U, P]` / `Shade[U, P]` / `ctx.textures` infrastructure directly — no
separate machinery.

### 3.1 What the Rust Example Does

In Rust, "Effect" is the fullscreen post-processing pass (= our Scala "Layer").
The blur example chains multiple effect instances on a panel, each reading from
the previous result. The Rust painter auto-injects the source as a fixed group 1
binding.

In Scala we take a more explicit approach: the layer shader declares its source
texture as part of its `P` type just like any other panel texture. What the
painter automates is **injecting the previous render result at slot 0 of group 1
only when slot 0 has not been manually bound** on that layer. If a layer does
set slot 0 via `layer.bind("source" := somePanel)`, that binding is respected —
the painter skips the ping-pong swap for that layer entirely and renders it
in-place using its explicit source.

### 3.2 Scala Design

#### 3.2.1 Layer[U, P] — Same Structure as Shape[U, P]

`Layer[U, P]` gains the `P` type parameter from Feature 1, exactly mirroring
`Shape[U, P]`. `layerShade[U, P]` becomes a direct parallel of
`shade[A, V, U, P]`:

```scala
inline def shade[A, V, U, P](build: Program[A, V, U] => Unit): Shade[U, P]
inline def layerShade[U, P](build: LayerProgram[U, P] => Unit): Shade[U, P]
```

For layers with `P = EmptyTuple` (e.g. plasma), no panel bind group is created
and no ping-pong source is injected.

#### 3.2.2 LayerProgram[U, P] — ctx.textures

`LayerProgram[U, P]` gains the same `textures` accessor as `FragmentCtx`:

```scala
class LayerFragCtx[U, L, P](
  in:       TypedExprAccessor[...],
  out:      TypedAssignAccessor[...],
  bindings: TypedExprAccessor[...],
  locals:   TypedLocalAccessor[...],
  textures: TypedPanelAccessor[P],
)
```

Blur shader example — slot 0 (`source`) is auto-filled by the painter when not
manually bound:

```scala
type LayerUniforms = (
  diameter:    FragmentUniform[Float],
  resolution:  FragmentUniform[Vec2],
  dir:         FragmentUniform[Vec2],
  blurSampler: FragmentUniform[Sampler],
)
type LayerPanels = (source: FragmentPanel)   // slot 0 = auto-filled when unbound

val blurShade = painter.layerShade[LayerUniforms, LayerPanels]: program =>
  program.fn(gaussianBlur9)
  program.frag: ctx =>
    ctx.out.color := gaussianBlur9(
      ctx.textures.source,
      ctx.bindings.blurSampler,
      ctx.in.uv,
      ctx.bindings.resolution,
      ctx.bindings.dir * ctx.bindings.diameter,
    )
```

#### 3.2.3 Ping-Pong: Painter Injects Slot 0 Only When Unbound

During `paint(panel)`, for each layer with `panelBindGroupLayout != null` the
painter checks whether slot 0 has been manually bound:

- **Slot 0 is empty** (`layer.panelBindings(0) == null`): inject `srcView` as
  slot 0, render to `dstView`, then swap `srcView ↔ dstView` (normal ping-pong).
- **Slot 0 is manually bound**: respect it — render the layer in-place (write
  back to `srcView`), no swap.

```scala
val hasPanelBindings = layer.shade.panelBindGroupLayout != null
if hasPanelBindings then
  val slot0Manual = layer.panelBindings.length > 0 && layer.panelBindings(0) != null
  val entries = Arr[js.Dynamic]()
  if slot0Manual then
    entries.push(Obj.literal(binding = 0, resource = layer.panelBindings(0).textureView))
  else
    entries.push(Obj.literal(binding = 0, resource = srcView))  // ping-pong injection
  var k = 1
  while k < layer.panelBindings.length do
    val p = layer.panelBindings(k)
    if p != null then
      entries.push(Obj.literal(binding = k, resource = p.textureView))
    k += 1
  val panelGroup = device.createBindGroup(Obj.literal(
    layout = layer.shade.panelBindGroupLayout,
    entries = entries,
  ))
  pass.setBindGroup(1, panelGroup)
  (slot0Manual)  // returned: true = in-place, false = ping-pong
```

#### 3.2.4 Ping-Pong Textures on Panel

A second pong texture is allocated when any layer has `P != EmptyTuple`:

```
Main texture:  shapes render here (ping₀)
Pong texture:  layer 0 reads from main,  writes to pong
Main texture:  layer 1 reads from pong,  writes to main
...
Final output:  whichever texture holds the last write
```

Panel gains `_pongTexture`, `_pongView`, `_outputView`. `ensureSize` allocates
the pong pair when needed. `panel.outputView` falls back to `panel.textureView`
when no ping-pong occurred.

#### 3.2.5 paint() Changes

```scala
def paint(panel: Panel): Unit =
  // Step 1: shapes into main texture
  val encoder = device.createCommandEncoder()
  val mainPass = beginRenderPass(encoder, panel.textureView, panel.clearColor)
  var i = 0
  while i < panel.shapes.length do
    renderShapeOnPass(mainPass, panel.shapes(i)); i += 1
  mainPass.end(); queue.submit(Arr(encoder.finish()))

  // Step 2: layer ping-pong chain
  var srcView = panel.textureView
  var dstView = panel.pongView
  var j = 0
  while j < panel.layers.length do
    val layer = panel.layers(j)
    val hasPanels = layer.shade.panelBindGroupLayout != null
    val slot0Manual = hasPanels &&
      layer.panelBindings.length > 0 && layer.panelBindings(0) != null
    val enc2 = device.createCommandEncoder()
    if hasPanels && !slot0Manual then
      // Normal ping-pong: inject srcView at slot 0, write to dstView, then swap
      val layerPass = beginRenderPassNoClear(enc2, dstView)
      renderLayerOnPass(layerPass, layer, srcView)
      layerPass.end(); queue.submit(Arr(enc2.finish()))
      val tmp = srcView; srcView = dstView; dstView = tmp
    else
      // In-place: either no panel bindings, or slot 0 manually bound — no swap
      val layerPass = beginRenderPassNoClear(enc2, srcView)
      renderLayerOnPass(layerPass, layer, null)
      layerPass.end(); queue.submit(Arr(enc2.finish()))
    j += 1
  panel.setOutputView(srcView)
```

`show(panel)` uses `panel.outputView` instead of `panel.textureView`.

#### 3.2.6 Backward Compatibility

- `layerShade[U]` (no `P`) unchanged — returns `Shade[U, EmptyTuple]`
- Existing `panel_layer` draft: plasma uses `P = EmptyTuple`, rendered in-place
- All other drafts: no layers, completely unaffected

### 3.3 Implementation Steps

**Step 1 — Layer[U, P] + layerShade[U, P]**

- Add `P = EmptyTuple` to `Layer[U, P]`, add `panelBindings: Arr[Panel | Null]`;
  update `processEntry` to dispatch across both `U` and `P` (same as Shape)
- Update `painter.layer(shade)` factory to infer `P` from shade
- Update `layerShade[U, P]`: generate panel declarations + layout for `P`
- Update `LayerProgram[U, P]` to pass `TypedPanelAccessor[P]` as `textures`

**Step 2 — Ping-pong textures on Panel**

- Add `_pongTexture`, `_pongView`, `_outputView` to `Panel`
- `ensureSize`: allocate pong pair when any layer has a `panelBindGroupLayout`
- Add `pongView`, `outputView`, `setOutputView`

**Step 3 — paint() + show() changes**

- Restructure `paint(panel)` to ping-pong layers with panel bindings
- `renderLayerOnPass` overrides slot 0 with `srcView` when present
- Update `show(panel)` to use `panel.outputView`

**Step 4 — blur draft**

- Create `drafts/blur/`
- Triangle shape (UV-colored) rendered to a panel, blue clear
- Multiple `Layer` instances sharing `blurShade`, different `dir`/`diameter`
  bindings: logarithmic passes halved while `> 2.0`, horizontal then vertical
- `painter.onResize` updates the `resolution` binding
- `animate` loop with `paint` + `show`

### 3.4 WGSL Generated (blur layer shade)

```wgsl
@group(0) @binding(0) var<uniform> diameter: f32;
@group(0) @binding(1) var<uniform> resolution: vec2<f32>;
@group(0) @binding(2) var<uniform> dir: vec2<f32>;
@group(0) @binding(3) var blurSampler: sampler;

@group(1) @binding(0) var source: texture_2d<f32>;

fn gaussian_blur_9(tex: texture_2d<f32>, s: sampler,
                   uv: vec2<f32>, res: vec2<f32>, dir: vec2<f32>) -> vec4<f32> { ... }

@vertex fn vs_main(...) -> ... { ... }
@fragment fn fs_main(in: ...) -> FragmentOutput {
  var out: FragmentOutput;
  out.color = gaussian_blur_9(source, blurSampler, in.uv,
                               values.resolution, values.dir * values.diameter);
  return out;
}
```

### 3.5 Gaussian Blur Helper

```scala
val gaussianBlur9: WgslFn[(tex: Texture2D, s: Sampler, uv: Vec2, res: Vec2, dir: Vec2), Vec4] =
  WgslFn.raw("gaussian_blur_9"):
    """
    var color = vec4(0.0);
    let off1 = vec2<f32>(1.3846153846) * dir / res;
    let off2 = vec2<f32>(3.2307692308) * dir / res;
    color += textureSample(tex, s, uv)        * 0.2270270270;
    color += textureSample(tex, s, uv + off1) * 0.3162162162;
    color += textureSample(tex, s, uv - off1) * 0.3162162162;
    color += textureSample(tex, s, uv + off2) * 0.0702702703;
    color += textureSample(tex, s, uv - off2) * 0.0702702703;
    return color;
    """
```

---

## 4. Open Questions

1. **`Shade[U, P]` default type parameter and inline shade factories**: Confirm
   that `class Shade[U, P = EmptyTuple]` works cleanly with the inline methods
   in `painter.scala` (`inline erasedValue[P]` etc.). Default type parameters in
   `inline` + `erasedValue` context may require explicit attention.

2. **Sampler variant in `generateUniformGroupFromLists`**: The existing generator
   emits `var<uniform> name: type;` for every field. Sampler fields need `var
   name: sampler;` (no address space qualifier). The simplest fix is to check
   `WGSLType[T]` for a `isSampler` flag (or just match on `wgslName ==
   "sampler"`) and emit the appropriate line. Binding indices stay consecutive
   across both kinds, so no index-consistency problem arises.

3. **MSAA + panel texture sampling**: When `color_quad_layer` uses MSAA, its
   resolved `textureView` (not the MSAA view) is what gets bound in group 1. The
   resolved view is always a regular `texture_2d<f32>`, so no WGSL changes
   needed for the sampling shader.

4. **Pipeline cache key for MSAA**: The MSAA sample count must be part of the
   pipeline key. Currently the key string includes shade ID, blend state, cull
   mode, topology, front face, and format. Add `|${panel.sampleCount}` to
   distinguish MSAA vs non-MSAA pipelines for the same shade.

5. **Plasma example with Feature 2**: Plasma uses `P = EmptyTuple` layers, so
   they render in-place without ping-pong. No backward-compat issue. If the user
   later adds a `P`-typed layer after a plasma layer, the ping-pong path kicks in
   with the plasma's output as the source.
