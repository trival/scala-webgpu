# WebGPU Shader Facade - Type-Safe Design

## Goal
Create a minimal proof-of-concept where shader attributes, uniforms, and builtins are defined as Scala types, and WebGPU pipeline elements (bind group layouts, vertex layouts, WGSL code) are derived automatically.

## Core Design Principles
1. **Named tuples as the source of truth** - Position in tuple = layout/binding index
2. **Type-level derivation** - Use Scala 3 metaprogramming to generate WGSL and layouts
3. **Single definition** - Define types once, derive everything else
4. **Builtins separated** - Dedicated fields for vertex/fragment builtin ins/outs, filtered from CPU-side layouts

---

## Long-Term Vision

These goals inform current design decisions even though we won't implement them now:

### 1. CPU-side Math Library
A vector math library mimicking WGSL math as closely as possible for CPU-side calculations (camera math, physics, transforms, etc.).

### 2. WGSL AST Generation
Types that can generate WGSL expression ASTs, enabling fully typed shader code instead of string bodies.

### 3. Isomorphic Math API
Math functions (`dot`, `cross`, `normalize`, `mix`, etc.) with the same API usable on both CPU and GPU (for AST generation).

### Design Flexibility
These may end up as:
- The same types across all contexts (ideal if practical)
- Separate types in different packages with implicit conversions
- API similarity maintained by convention

For now, we keep the design open and use opaque types / type classes. The type class pattern (`WGSLType[T]`) allows us to later swap implementations or add instances for concrete types.

---

## Phase 1: WGSL Primitive Types (Pure Type-Level)

Use opaque types or empty classes to represent WGSL types purely at the type level.
Companion objects provide metadata for code generation.

```scala
// src/gpu/types.scala

// Marker trait for type-class pattern
trait WGSLType[T]:
  def wgslName: String
  def byteSize: Int
  def alignment: Int

// Types are just markers - no runtime representation needed
opaque type F32 = Unit
opaque type Vec2 = Unit   // f32 is default, no suffix needed
opaque type Vec3 = Unit
opaque type Vec4 = Unit

object F32:
  given WGSLType[F32] with
    def wgslName = "f32"
    def byteSize = 4
    def alignment = 4

object Vec2:
  given WGSLType[Vec2] with
    def wgslName = "vec2<f32>"
    def byteSize = 8
    def alignment = 8

object Vec3:
  given WGSLType[Vec3] with
    def wgslName = "vec3<f32>"
    def byteSize = 12
    def alignment = 16  // WGSL alignment rules

object Vec4:
  given WGSLType[Vec4] with
    def wgslName = "vec4<f32>"
    def byteSize = 16
    def alignment = 16

// Future: Vec2i, Vec3i, Vec4i for i32 variants, etc.

// Alias for empty named tuple (avoids conflict with Option.None via import)
type None = EmptyTuple

// Default output types
type VertOut = (position: BuiltinPosition)  // Standard vertex builtin output
type FragOut = (color: Vec4)                 // Standard single-color fragment output
```

This allows purely type-level definitions:
```scala
type MyAttribs = (position: Vec3, color: Vec4)  // No .type needed!
```

---

## Phase 2: Builtin Types

Separate marker types for WGSL builtins. These are included in shader generation but filtered from CPU-side layouts.

```scala
// src/gpu/builtins.scala

// Marker for builtin types - separate from WGSLType
trait BuiltinType[T]:
  def wgslBuiltin: String   // e.g., "position", "vertex_index"
  def wgslType: String      // e.g., "vec4<f32>", "u32"

// Vertex shader builtins
opaque type BuiltinVertexIndex = Unit
opaque type BuiltinInstanceIndex = Unit
opaque type BuiltinPosition = Unit  // Output only

object BuiltinVertexIndex:
  given BuiltinType[BuiltinVertexIndex] with
    def wgslBuiltin = "vertex_index"
    def wgslType = "u32"

object BuiltinPosition:
  given BuiltinType[BuiltinPosition] with
    def wgslBuiltin = "position"
    def wgslType = "vec4<f32>"

// Fragment shader builtins
opaque type BuiltinFragCoord = Unit  // Input
// ... more as needed
```

---

## Phase 3: Named Tuple Definitions for Attributes

Use named tuples where:
- **Name** = attribute name in shader
- **Position** = `@location(index)`

```scala
// Example vertex attributes definition
type VertexAttribs = (
  position: Vec3,
  color: Vec4,
  uv: Vec2
)

// This should generate:
// struct VertexInput {
//   @location(0) position: vec3<f32>,
//   @location(1) color: vec4<f32>,
//   @location(2) uv: vec2<f32>,
// }
```

---

## Phase 4: Nested Named Tuples for Uniforms with Stage Visibility

Nested structure where:
- **Outer tuple position** = `@group(index)`
- **Inner tuple position** = `@binding(index)`
- **Inner tuple name** = variable name
- **Stage visibility** = Which shader stage(s) can access the uniform

```scala
// src/gpu/types.scala - Visibility markers

enum ShaderStage:
  case Vertex, Fragment, Both

// Wrapper to annotate visibility
case class Uniform[T, S <: ShaderStage](using val stage: ValueOf[S])

// Or simpler: separate type aliases
type VertexUniform[T] = T
type FragmentUniform[T] = T
type SharedUniform[T] = T  // Both stages

// Example uniforms definition
type Uniforms = (
  globals: (                           // @group(0)
    viewProj: SharedUniform[Mat4],    // @binding(0) - used in both
    time: VertexUniform[F32]           // @binding(1) - vertex only
  ),
  material: (                          // @group(1)
    albedo: FragmentUniform[Vec4]     // @binding(0) - fragment only
  )
)

// This generates WGSL (all uniforms declared globally):
// @group(0) @binding(0) var<uniform> viewProj: mat4x4<f32>;
// @group(0) @binding(1) var<uniform> time: f32;
// @group(1) @binding(0) var<uniform> albedo: vec4<f32>;

// And for pipeline layout, visibility flags are set correctly:
// binding 0: VERTEX | FRAGMENT
// binding 1: VERTEX
// binding 2: FRAGMENT
```

### Alternative: Separate Uniform Tuples per Stage

```scala
// More explicit but more verbose
case class ShaderDef[...](
  vertexUniforms: VertexUniformsType,
  fragmentUniforms: FragmentUniformsType,
  sharedUniforms: SharedUniformsType,
  ...
)
```

**Decision**: Use wrapper types (`VertexUniform`, `FragmentUniform`, `SharedUniform`) to keep uniforms in a single nested tuple structure while tracking visibility.

---

## Phase 5: Compile-Time Derivation with Inline/Macros

Use Scala 3 inline and potentially macros to derive at compile time:

```scala
// src/gpu/derive.scala

import scala.deriving.Mirror
import scala.compiletime.*
import scala.NamedTuple.*

inline def deriveVertexStruct[T <: AnyNamedTuple](name: String): String =
  // Use inline match and constValueTuple to extract names and types
  // Generate WGSL struct definition

inline def deriveUniformBindings[T <: Tuple]: String =
  // Iterate nested tuples, generate @group/@binding declarations
```

### Key Scala 3 features to use:
- `scala.NamedTuple` and `NamedTuple.Names` / `NamedTuple.DropNames`
- `constValueTuple` for compile-time tuple element access
- `inline` methods for compile-time computation
- `Mirror.ProductOf` for reflection on tuple structure
- `summonAll` to get type class instances for all tuple elements

---

## Phase 6: Shader Definition API

```scala
// src/gpu/shader.scala

// Common default type aliases
type VertOut = (position: BuiltinPosition)  // Standard vertex builtin output
type FragOut = (color: Vec4)                 // Standard fragment output

// Full ShaderDef with all type parameters
case class ShaderDef[
  Attribs <: AnyNamedTuple,          // Custom vertex attributes (@location)
  Varyings <: AnyNamedTuple,         // Vertex out = Fragment in (custom @location)
  Uniforms <: Tuple,                 // Tuple of NamedTuples with visibility wrappers
  VertBuiltinIn <: AnyNamedTuple,    // @builtin inputs (default: None)
  VertBuiltinOut <: AnyNamedTuple,   // @builtin outputs (default: VertOut)
  FragBuiltinIn <: AnyNamedTuple,    // @builtin inputs (default: None)
  FragOut <: AnyNamedTuple           // Custom outputs (default: FragOut)
](
  vertexBody: String,   // WGSL body - assigns to `out.*`
  fragmentBody: String  // WGSL body - assigns to `out.*`
):
  inline def generateWGSL: String = ???

  // CPU-side layouts - builtins filtered out
  inline def vertexBufferLayout: ??? = ???
  inline def bindGroupLayouts: ??? = ???

// Factory with sensible defaults
object Shader:
  // Simple API - uses VertOut, FragOut, None for builtins
  def apply[Attribs <: AnyNamedTuple, Varyings <: AnyNamedTuple, Uniforms <: Tuple](
    vertexBody: String,
    fragmentBody: String
  ): ShaderDef[Attribs, Varyings, Uniforms, VertOut, None, FragOut, None] =
    ShaderDef(vertexBody, fragmentBody)

  // Full API - when you need custom builtins or fragment outputs
  def full[
    Attribs <: AnyNamedTuple,
    Varyings <: AnyNamedTuple,
    Uniforms <: Tuple,
    VertBuiltinIn <: AnyNamedTuple,
    VertBuiltinOut <: AnyNamedTuple,
    FragBuiltinIn <: AnyNamedTuple,
    FragmentOut <: AnyNamedTuple
  ](
    vertexBody: String,
    fragmentBody: String
  ): ShaderDef[Attribs, Varyings, Uniforms, VertBuiltinIn, VertBuiltinOut, FragBuiltinIn, FragmentOut] =
    ShaderDef(vertexBody, fragmentBody)
```

**Type parameter ordering (most common first, then pipeline order):**
1. `Attribs` - always needed
2. `Varyings` - always needed
3. `Uniforms` - often needed
4. `VertBuiltinIn` - defaults to `None`
5. `VertBuiltinOut` - defaults to `VertOut = (position: BuiltinPosition)`
6. `FragBuiltinIn` - defaults to `None`
7. `FragOut` - defaults to `FragOut = (color: Vec4)`

### Generated WGSL Structure

The shader generates:
1. **Input structs** with `@location` or `@builtin` annotations
2. **Output structs** with `@location` or `@builtin` annotations
3. **Uniform declarations** at module scope
4. **Main functions** that wrap user body and auto-return `out`

```wgsl
// Generated VertexInput struct
struct VertexInput {
  @location(0) position: vec3<f32>,
  @location(1) color: vec4<f32>,
  @builtin(vertex_index) vertexIndex: u32,
}

// Generated VertexOutput struct (custom + builtins merged)
struct VertexOutput {
  @location(0) color: vec4<f32>,
  @location(1) uv: vec2<f32>,
  @builtin(position) position: vec4<f32>,
}

// Uniform declarations
@group(0) @binding(0) var<uniform> viewProj: mat4x4<f32>;
@group(0) @binding(1) var<uniform> time: f32;
@group(1) @binding(0) var<uniform> albedo: vec4<f32>;

// Vertex main - wraps user body, auto-returns
@vertex
fn vs_main(in: VertexInput) -> VertexOutput {
  var out: VertexOutput;

  // === User-provided body ===
  out.position = viewProj * vec4(in.position, 1.0);
  out.color = in.color;
  // === End user body ===

  return out;
}

// Fragment output struct
struct FragmentOutput {
  @location(0) color: vec4<f32>,
}

// Fragment main - wraps user body, auto-returns
@fragment
fn fs_main(in: VertexOutput) -> FragmentOutput {
  var out: FragmentOutput;

  // === User-provided body ===
  out.color = in.color * albedo;
  // === End user body ===

  return out;
}
```

### Key Design Points

1. **Output structs always generated** - User writes `out.fieldName = ...`
2. **Auto `return out;`** - User never writes return statement
3. **Varyings shared** - `VertexOutput` struct is reused as fragment input (varyings flow through)
4. **Builtins merged into structs** - `@builtin` and `@location` fields coexist in same struct

---

## Phase 7: Minimal WebGPU Facades

Hand-written Scala.js facades for WebGPU - only what we need for MVP.

```scala
// src/webgpu/facades.scala
import scala.scalajs.js
import scala.scalajs.js.annotation.*

@js.native
trait GPU extends js.Object:
  def requestAdapter(): js.Promise[GPUAdapter] = js.native

@js.native
trait GPUAdapter extends js.Object:
  def requestDevice(): js.Promise[GPUDevice] = js.native

@js.native
trait GPUDevice extends js.Object:
  val queue: GPUQueue = js.native
  def createShaderModule(descriptor: GPUShaderModuleDescriptor): GPUShaderModule = js.native
  def createRenderPipeline(descriptor: GPURenderPipelineDescriptor): GPURenderPipeline = js.native
  def createBuffer(descriptor: GPUBufferDescriptor): GPUBuffer = js.native
  def createBindGroup(descriptor: GPUBindGroupDescriptor): GPUBindGroup = js.native
  def createBindGroupLayout(descriptor: GPUBindGroupLayoutDescriptor): GPUBindGroupLayout = js.native
  def createPipelineLayout(descriptor: GPUPipelineLayoutDescriptor): GPUPipelineLayout = js.native
  def createCommandEncoder(): GPUCommandEncoder = js.native

// ... minimal set of descriptors and types needed for triangle rendering
```

### Facades Design Principles
- **Minimal**: Only types/methods we actually use
- **js.native traits**: For WebGPU API objects
- **js.Object traits**: For descriptor objects we construct
- **No external dependencies**: We write these ourselves

---

## File Structure

```
src/
  webgpu/
    facades.scala       # Minimal WebGPU Scala.js facades (GPUDevice, GPUBuffer, etc.)
  gpu/
    types.scala         # WGSLType, F32, Vec2, Vec3, Vec4 (opaque types + givens)
    builtins.scala      # BuiltinType, BuiltinPosition, BuiltinVertexIndex, etc.
    derive.scala        # Inline derivation utilities for named tuples
    shader.scala        # ShaderDef case class and WGSL generation
    layouts.scala       # Derive GPUVertexBufferLayout, GPUBindGroupLayout from types
    buffers.scala       # Type-safe buffer wrappers (UniformBuffer, VertexBuffer)
    pipeline.scala      # Pipeline builder from ShaderDef
  example/
    Main.scala          # Working triangle example
  test/
    ShaderTest.scala    # Tests for WGSL generation
```

---

## Implementation Order

### Part 1: WGSL Code Generation
1. [ ] Create `src/gpu/types.scala` - WGSL primitive types as opaque types with WGSLType givens
2. [ ] Create `src/gpu/builtins.scala` - Builtin marker types with BuiltinType givens
3. [ ] Create `src/gpu/derive.scala` - Named tuple introspection (extract names, types, generate WGSL)
4. [ ] Create `src/gpu/shader.scala` - ShaderDef with WGSL generation
5. [ ] Create `src/test/ShaderTest.scala` - Test that verifies generated WGSL

### Part 2: Minimal WebGPU Facades
Implement minimal Scala.js facades for WebGPU types - only what we need for the MVP.

6. [ ] Create `src/webgpu/facades.scala` - Core WebGPU types:
   - `GPU`, `GPUAdapter`, `GPUDevice`, `GPUQueue`
   - `GPUBuffer`, `GPUBufferDescriptor`
   - `GPUShaderModule`, `GPUShaderModuleDescriptor`
   - `GPURenderPipeline`, `GPURenderPipelineDescriptor`
   - `GPUBindGroup`, `GPUBindGroupLayout`, `GPUBindGroupDescriptor`
   - `GPUVertexBufferLayout`, `GPUVertexAttribute`
   - `GPUCanvasContext`, `GPUTexture`, `GPURenderPassDescriptor`
   - `GPUCommandEncoder`, `GPURenderPassEncoder`

### Part 3: Layout Derivation from Shader Types
7. [ ] Create `src/gpu/layouts.scala` - Derive WebGPU layouts from shader types:
   - `deriveVertexBufferLayout[VertexIn]` → `GPUVertexBufferLayout`
   - `deriveBindGroupLayouts[Uniforms]` → `Seq[GPUBindGroupLayoutDescriptor]`

8. [ ] Create `src/gpu/buffers.scala` - Type-safe buffer creation:
   - `UniformBuffer[T]` - wraps GPUBuffer, knows its bind group/binding
   - `VertexBuffer[T]` - wraps GPUBuffer, knows its layout

### Part 4: Pipeline Builder
9. [ ] Create `src/gpu/pipeline.scala` - Build complete pipeline from ShaderDef:
   - Create shader module from generated WGSL
   - Create bind group layouts
   - Create pipeline layout
   - Create render pipeline

### Part 5: Working Example
10. [ ] Create `src/example/Main.scala` - Minimal triangle rendering:
    - Get GPU device
    - Define shader with our type-safe API
    - Derive pipeline from shader
    - Create vertex buffer with triangle data
    - Render loop

---

## Verification

### Part 1: WGSL Generation
1. Compile: `scala-cli compile .`
2. Test: `scala-cli test .`
3. Verify generated WGSL structure:
   - Correct `@location` indices from tuple positions
   - Correct `@group`/`@binding` from nested tuple positions
   - Builtins use `@builtin(name)` syntax
   - Type names match WGSL (`vec3<f32>`, `f32`, etc.)

### Part 2-5: Full MVP
4. Run example in browser: `scala-cli --js . --main example.Main`
5. Verify:
   - Triangle renders on canvas
   - No WebGPU errors in console
   - Shader compiles without validation errors

---

## Example Usage (Target API)

### Minimal Example (Simple API with Defaults)

```scala
import gpu.*

// Simple colored triangle - uses all defaults
type SimpleAttribs = (position: Vec3, color: Vec4)
type SimpleVaryings = (color: Vec4)

// Just 3 type params! Defaults: VertOut, None, FragOut, None
val triangleShader = Shader[SimpleAttribs, SimpleVaryings, None](
  vertexBody = """
    out.position = vec4(in.position, 1.0);
    out.color = in.color;
  """,
  fragmentBody = """
    out.color = in.color;
  """
)
```

### Full Example (With Uniforms - Still Simple API)

```scala
import gpu.*

type MyAttribs = (position: Vec3, color: Vec4, uv: Vec2)
type MyVaryings = (color: Vec4, uv: Vec2)

type MyUniforms = (
  camera: (
    viewProj: SharedUniform[Mat4],
    cameraPos: VertexUniform[Vec3]
  ),
  material: (
    albedo: FragmentUniform[Vec4]
  )
)

// Still just 3 type params - defaults handle the rest
val shader = Shader[MyAttribs, MyVaryings, MyUniforms](
  vertexBody = """
    out.position = viewProj * vec4(in.position, 1.0);
    out.color = in.color;
    out.uv = in.uv;
  """,
  fragmentBody = """
    out.color = in.color * albedo;
  """
)

// Derive everything
val wgsl: String = shader.generateWGSL
val vertexLayout = shader.vertexBufferLayout
val bindLayouts = shader.bindGroupLayouts
```

### Custom Builtins Example (Full API)

```scala
import gpu.*

// When you need vertex_index or custom fragment output
val customShader = Shader.full[
  MyAttribs,                         // Attribs
  MyVaryings,                        // Varyings
  MyUniforms,                        // Uniforms
  (vertexIndex: BuiltinVertexIndex), // VertBuiltinIn (custom!)
  (position: BuiltinPosition),       // VertBuiltinOut (same as default)
  (fragCoord: BuiltinFragCoord),     // FragBuiltinIn (custom!)
  (color: Vec4, depth: F32)          // FragOut (custom - multiple outputs!)
](
  vertexBody = """
    out.position = viewProj * vec4(in.position, 1.0);
    out.color = in.color;
  """,
  fragmentBody = """
    out.color = in.color * albedo;
    out.depth = in.fragCoord.z;
  """
)
```

---

## Decisions Made

- **Uniforms**: Individual variables per binding (not structs per group)
- **Uniform visibility**: Wrapper types (`VertexUniform[T]`, `FragmentUniform[T]`, `SharedUniform[T]`) track shader stage visibility for pipeline layout generation
- **Builtins**: Separate type params for vertex/fragment builtin ins/outs, merged into structs during generation
- **Type encoding**: Opaque types (`Vec3`) with `WGSLType[T]` type class - no `.type` needed
- **Output pattern**: Generated output structs + auto `return out;` - user assigns to `out.fieldName`
