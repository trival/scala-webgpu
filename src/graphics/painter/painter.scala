package graphics.painter

import graphics.buffers.*
import graphics.math.*
import graphics.math.cpu.*
import graphics.math.cpu.Vec2
import graphics.shader.*
import graphics.shader.dsl.LayerProgram
import graphics.shader.dsl.Program
import org.scalajs.dom.HTMLCanvasElement
import trivalibs.bufferdata.StructArray
import trivalibs.utils.js.*
import webgpu.*

import scala.compiletime.erasedValue
import scala.scalajs.js

private val LAYER_VERT_BODY =
  """  let x = f32((in.vertex_index << 1u) & 2u) * 2.0 - 1.0;
  let y = f32(in.vertex_index & 2u) * 2.0 - 1.0;
  out.uv = vec2f(x * 0.5 + 0.5, 0.5 - y * 0.5);
  out.position = vec4f(x, y, 0.0, 1.0);"""

private val BLIT_WGSL = """
struct VsOut {
  @builtin(position) pos: vec4f,
  @location(0) uv: vec2f,
}

@vertex
fn vs_main(@builtin(vertex_index) vi: u32) -> VsOut {
  let x = f32((vi << 1u) & 2u) * 2.0 - 1.0;
  let y = f32(vi & 2u) * 2.0 - 1.0;
  var out: VsOut;
  out.pos = vec4f(x, y, 0.0, 1.0);
  out.uv = vec2f(x * 0.5 + 0.5, 0.5 - y * 0.5);
  return out;
}

@group(0) @binding(0) var blit_texture: texture_2d<f32>;
@group(0) @binding(1) var blit_sampler: sampler;

@fragment
fn fs_main(in: VsOut) -> @location(0) vec4f {
  return textureSample(blit_texture, blit_sampler, in.uv);
}
"""

class Painter(
    val device: GPUDevice,
    val queue: GPUQueue,
    val canvas: HTMLCanvasElement,
    val context: GPUCanvasContext,
    val preferredFormat: String,
):
  private val pipelineCache = Dict[GPURenderPipeline]()
  private var nextShadeId = 0
  private val resizeCallbacks = Arr[(Int, Int) => Unit]()

  def onResize(cb: (Int, Int) => Unit): Unit =
    resizeCallbacks.push(cb)
    cb(canvas.width, canvas.height)

  private[painter] def fireResize(w: Int, h: Int): Unit =
    var k = 0
    while k < resizeCallbacks.length do
      resizeCallbacks(k)(w, h)
      k += 1

  def width: Int = canvas.width
  def height: Int = canvas.height

  // =========================================================================
  // Shade factory
  // =========================================================================

  // DSL overload — accepts a Program builder lambda
  inline def shade[A, V, U](build: Program[A, V, U] => Unit): Shade[U] =
    val program = new Program[A, V, U]
    build(program)
    shade[A, V, U](
      program.vertBodyStr,
      program.fragBodyStr,
      program.helperFnsStr,
    )

  inline def shade[A, V, U](
      vertWgsl: String,
      fragWgsl: String,
      helperFns: String = "",
  ): Shade[U] =
    val id = nextShadeId
    nextShadeId += 1

    inline erasedValue[U] match
      case _: EmptyTuple =>
        val sd = Shader[A, V, EmptyTuple](vertWgsl, fragWgsl, helperFns)
        val wgsl = sd.generateWGSL
        log(wgsl)
        val module = device.createShaderModule(Obj.literal(code = wgsl))
        val vbl = sd.vertexBufferLayout
        val pl = layouts.createPipelineLayout(
          device,
          Arr[GPUBindGroupLayout](),
        )
        Shade[U](id, module, vbl, null, pl, false)
      case _ =>
        type Wrapped = (values: U)
        val sd = Shader[A, V, Wrapped](vertWgsl, fragWgsl, helperFns)
        val wgsl = sd.generateWGSL
        log(wgsl)
        val module = device.createShaderModule(Obj.literal(code = wgsl))
        val vbl = sd.vertexBufferLayout
        val (bgls, pl) = sd.createPipelineLayout(device)
        Shade[U](id, module, vbl, bgls(0), pl, false)

  // =========================================================================
  // LayerShade factory — fullscreen triangle with user fragment shader
  // =========================================================================

  inline def layerShade[U](build: LayerProgram[U] => Unit): Shade[U] =
    val program = new LayerProgram[U]
    build(program)
    val id = nextShadeId
    nextShadeId += 1
    type VBI = (vertex_index: BuiltinVertexIndex)
    inline erasedValue[U] match
      case _: EmptyTuple =>
        val sd = Shader.full[
          EmptyTuple,
          (uv: Vec2),
          EmptyTuple,
          VBI,
          VertOut,
          EmptyTuple,
          FragOut,
        ](LAYER_VERT_BODY, program.fragBodyStr, program.helperFnsStr)
        val wgsl = sd.generateWGSL
        log(wgsl)
        val module = device.createShaderModule(Obj.literal(code = wgsl))
        val pl = layouts.createPipelineLayout(device, Arr[GPUBindGroupLayout]())
        Shade[U](id, module, null, null, pl, false)
      case _ =>
        type Wrapped = (values: U)
        val sd = Shader.full[
          EmptyTuple,
          (uv: Vec2),
          Wrapped,
          VBI,
          VertOut,
          EmptyTuple,
          FragOut,
        ](LAYER_VERT_BODY, program.fragBodyStr, program.helperFnsStr)
        val wgsl = sd.generateWGSL
        log(wgsl)
        val module = device.createShaderModule(Obj.literal(code = wgsl))
        val (bgls, pl) = sd.createPipelineLayout(device)
        Shade[U](id, module, null, bgls(0), pl, false)

  // =========================================================================
  // Form factory
  // =========================================================================

  def form[F <: Tuple](
      vertices: StructArray[F],
      topology: PrimitiveTopology = PrimitiveTopology.TriangleList,
      frontFace: FrontFace = FrontFace.CCW,
  ): Form =
    Form(device, queue, vertices, topology, frontFace)

  // =========================================================================
  // Binding factory
  // =========================================================================

  inline def binding[T: UniformLayout as ul](
      value: T,
  ): BufferBinding[T, ul.Fields] =
    BufferBinding[T](device, value)

  inline def binding[T: UniformLayout as ul]: BufferBinding[T, ul.Fields] =
    BufferBinding[T](device)

  // =========================================================================
  // Shape factory
  // =========================================================================

  def shape[U](
      form: Form,
      shade: Shade[U],
      bindings: BindingSlots = Arr(),
      cullMode: CullMode = CullMode.None,
      blendState: Opt[BlendState] = Opt.Null,
  ): Shape[U] =
    Shape[U](form, shade, device, bindings, cullMode, blendState)

  // =========================================================================
  // Layer factory
  // =========================================================================

  def layer[U](
      shade: Shade[U],
      bindings: BindingSlots = Arr(),
      blendState: Opt[BlendState] = Opt.Null,
  ): Layer[U] =
    Layer[U](shade, device, bindings, blendState)

  // =========================================================================
  // Panel factory
  // =========================================================================

  def panel(
      width: Int = 0,
      height: Int = 0,
      clearColor: Opt[(Double, Double, Double, Double)] = (0.0, 0.0, 0.0, 1.0),
      shapes: Arr[Shape[?]] = Arr(),
      layers: Arr[Layer[?]] = Arr(),
  ): Panel =
    Panel(this, width, height, clearColor, shapes, layers)

  // =========================================================================
  // draw() — direct-to-canvas rendering
  // =========================================================================

  def draw(
      shape: Shape[?],
      clearColor: Opt[(Double, Double, Double, Double)] = Opt.Null,
  ): Unit =
    val encoder = device.createCommandEncoder()
    val textureView = context.getCurrentTexture().createView()

    val colorAttachment =
      if !clearColor.isEmpty then
        val (r, g, b, a) = clearColor.safe
        Obj.literal(
          view = textureView,
          loadOp = "clear",
          storeOp = "store",
          clearValue = Obj.literal(r = r, g = g, b = b, a = a),
        )
      else
        Obj.literal(
          view = textureView,
          loadOp = "load",
          storeOp = "store",
        )

    val pass = encoder.beginRenderPass(
      Obj.literal(colorAttachments = Arr(colorAttachment)),
    )

    renderShapeOnPass(pass, shape)
    pass.end()

    queue.submit(Arr(encoder.finish()))

  // =========================================================================
  // paint() / show() — Panel-based rendering
  // =========================================================================

  def paint(panel: Panel): Unit =
    val w = width
    val h = height
    panel.ensureSize(w, h)
    val encoder = device.createCommandEncoder()

    val colorAttachment =
      if !panel.clearColor.isEmpty then
        val (r, g, b, a) = panel.clearColor.safe
        Obj.literal(
          view = panel.textureView,
          loadOp = "clear",
          storeOp = "store",
          clearValue = Obj.literal(r = r, g = g, b = b, a = a),
        )
      else
        Obj.literal(
          view = panel.textureView,
          loadOp = "load",
          storeOp = "store",
        )

    val pass = encoder.beginRenderPass(
      Obj.literal(colorAttachments = Arr(colorAttachment)),
    )

    var i = 0
    while i < panel.shapes.length do
      renderShapeOnPass(pass, panel.shapes(i))
      i += 1

    var j = 0
    while j < panel.layers.length do
      renderLayerOnPass(pass, panel.layers(j))
      j += 1

    pass.end()
    queue.submit(Arr(encoder.finish()))

  def show(panel: Panel): Unit =
    val encoder = device.createCommandEncoder()
    val swapChainView = context.getCurrentTexture().createView()

    val pass = encoder.beginRenderPass(
      Obj.literal(
        colorAttachments = Arr(
          Obj.literal(
            view = swapChainView,
            loadOp = "clear",
            storeOp = "store",
            clearValue = Obj.literal(r = 0.0, g = 0.0, b = 0.0, a = 1.0),
          ),
        ),
      ),
    )

    val bindGroup = device.createBindGroup(
      Obj.literal(
        layout = blitBindGroupLayout,
        entries = Arr(
          Obj.literal(binding = 0, resource = panel.textureView),
          Obj.literal(binding = 1, resource = blitSampler),
        ),
      ),
    )

    pass.setPipeline(blitPipeline)
    pass.setBindGroup(0, bindGroup)
    pass.draw(3)
    pass.end()

    queue.submit(Arr(encoder.finish()))

  // =========================================================================
  // Blit pipeline — created lazily on first show()
  // =========================================================================

  private lazy val blitSampler: GPUSampler =
    device.createSampler(
      Obj.literal(magFilter = "nearest", minFilter = "nearest"),
    )

  private lazy val blitBindGroupLayout: GPUBindGroupLayout =
    device.createBindGroupLayout(
      Obj.literal(
        entries = Arr(
          Obj.literal(
            binding = 0,
            visibility = GPUShaderStage.FRAGMENT,
            texture = Obj.literal(),
          ),
          Obj.literal(
            binding = 1,
            visibility = GPUShaderStage.FRAGMENT,
            sampler = Obj.literal(),
          ),
        ),
      ),
    )

  private lazy val blitPipeline: GPURenderPipeline =
    val module = device.createShaderModule(Obj.literal(code = BLIT_WGSL))
    val pipelineLayout = device.createPipelineLayout(
      Obj.literal(bindGroupLayouts = Arr(blitBindGroupLayout)),
    )
    device.createRenderPipeline(
      Obj.literal(
        layout = pipelineLayout,
        vertex = Obj.literal(module = module, entryPoint = "vs_main"),
        fragment = Obj.literal(
          module = module,
          entryPoint = "fs_main",
          targets = Arr(Obj.literal(format = preferredFormat)),
        ),
        primitive = Obj.literal(topology = "triangle-list"),
      ),
    )

  // =========================================================================
  // Per-shape render pass helper (shared by draw() and paint())
  // =========================================================================

  private def renderShapeOnPass(
      pass: GPURenderPassEncoder,
      shape: Shape[?],
  ): Unit =
    val cacheKey = pipelineKeyStr(shape, preferredFormat)
    val pipeline =
      if js.DynamicImplicits.truthValue(
          pipelineCache.asInstanceOf[js.Dynamic].hasOwnProperty(cacheKey),
        )
      then pipelineCache(cacheKey)
      else
        val p = createPipeline(shape)
        pipelineCache(cacheKey) = p
        p

    pass.setPipeline(pipeline)

    if shape.bindings.length > 0 && shape.shade.valueBindGroupLayout != null
    then
      val bindGroup = createBindGroup(shape)
      pass.setBindGroup(0, bindGroup)

    pass.setVertexBuffer(0, shape.form.vertexBuffer)
    pass.draw(shape.form.vertexCount)

  // =========================================================================
  // Per-layer render pass helper
  // =========================================================================

  private def renderLayerOnPass(
      pass: GPURenderPassEncoder,
      layer: Layer[?],
  ): Unit =
    val cacheKey =
      s"L|${layer.shade.id}|${layer.blendState.isEmpty}|$preferredFormat"
    val pipeline =
      if js.DynamicImplicits.truthValue(
          pipelineCache.asInstanceOf[js.Dynamic].hasOwnProperty(cacheKey),
        )
      then pipelineCache(cacheKey)
      else
        val p = createLayerPipeline(layer)
        pipelineCache(cacheKey) = p
        p

    pass.setPipeline(pipeline)

    if layer.bindings.length > 0 && layer.shade.valueBindGroupLayout != null
    then
      val entries = Arr[js.Dynamic]()
      var i = 0
      while i < layer.bindings.length do
        val b = layer.bindings(i)
        if b != null then
          entries.push(
            Obj.literal(
              binding = i,
              resource = Obj.literal(buffer = b.gpuBuffer),
            ),
          )
        i += 1
      val bindGroup = device.createBindGroup(
        Obj.literal(
          layout = layer.shade.valueBindGroupLayout,
          entries = entries,
        ),
      )
      pass.setBindGroup(0, bindGroup)

    pass.draw(3)

  private def createLayerPipeline(layer: Layer[?]): GPURenderPipeline =
    val shade = layer.shade
    val target: js.Dynamic =
      if layer.blendState.isEmpty then Obj.literal(format = preferredFormat)
      else Obj.literal(format = preferredFormat, blend = layer.blendState.safe)
    device.createRenderPipeline(
      Obj.literal(
        layout = shade.pipelineLayout,
        vertex =
          Obj.literal(module = shade.shaderModule, entryPoint = "vs_main"),
        fragment = Obj.literal(
          module = shade.shaderModule,
          entryPoint = "fs_main",
          targets = Arr(target),
        ),
        primitive = Obj.literal(topology = "triangle-list"),
      ),
    )

  // =========================================================================
  // Pipeline creation + caching
  // =========================================================================

  private def pipelineKeyStr(shape: Shape[?], format: String): String =
    val s = shape.shade
    val f = shape.form
    s"${s.id}|${shape.blendState.isEmpty}|${shape.cullMode}|${f.topology}|${f.frontFace}|${format}"

  private def createPipeline(
      shape: Shape[?],
  ): GPURenderPipeline =
    val shade = shape.shade

    val target: js.Dynamic =
      if shape.blendState.isEmpty then Obj.literal(format = preferredFormat)
      else Obj.literal(format = preferredFormat, blend = shape.blendState.safe)

    val vertexDescriptor =
      if shade.vertexBufferLayout != null then
        Obj.literal(
          module = shade.shaderModule,
          entryPoint = "vs_main",
          buffers = Arr(shade.vertexBufferLayout),
        )
      else
        Obj.literal(
          module = shade.shaderModule,
          entryPoint = "vs_main",
        )

    device.createRenderPipeline(
      Obj.literal(
        layout = shade.pipelineLayout,
        vertex = vertexDescriptor,
        fragment = Obj.literal(
          module = shade.shaderModule,
          entryPoint = "fs_main",
          targets = Arr(target),
        ),
        primitive = Obj.literal(
          topology = shape.form.topology.toJs,
          cullMode = shape.cullMode.toJs,
          frontFace = shape.form.frontFace.toJs,
        ),
      ),
    )

  // =========================================================================
  // Bind group creation
  // =========================================================================

  private def createBindGroup(shape: Shape[?]): GPUBindGroup =
    val entries = Arr[js.Dynamic]()
    var i = 0
    while i < shape.bindings.length do
      val b = shape.bindings(i)
      if b != null then
        entries.push(
          Obj.literal(
            binding = i,
            resource = Obj.literal(buffer = b.gpuBuffer),
          ),
        )
      i += 1
    device.createBindGroup(
      Obj.literal(
        layout = shape.shade.valueBindGroupLayout,
        entries = entries,
      ),
    )
