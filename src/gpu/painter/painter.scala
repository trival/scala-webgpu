package gpu.painter

import gpu.buffers.*
import gpu.math.*
import gpu.shader.*
import org.scalajs.dom.HTMLCanvasElement
import trivalibs.bufferdata.StructArray
import trivalibs.utils.js.*
import webgpu.*

import scala.compiletime.erasedValue
import scala.scalajs.js

class Painter(
    val device: GPUDevice,
    val queue: GPUQueue,
    val canvas: HTMLCanvasElement,
    val context: GPUCanvasContext,
    val preferredFormat: String,
):
  private val pipelineCache = Dict[GPURenderPipeline]()
  private var nextShadeId = 0

  def width: Int = canvas.width
  def height: Int = canvas.height

  // =========================================================================
  // Shade factory
  // =========================================================================

  inline def shade[A, V, U](
      vertBody: String,
      fragBody: String,
  ): Shade[U] =
    val id = nextShadeId
    nextShadeId += 1

    inline erasedValue[U] match
      case _: EmptyTuple =>
        val sd = Shader[A, V, EmptyTuple](vertBody, fragBody)
        val wgsl = sd.generateWGSL
        val module = device.createShaderModule(Obj.literal(code = wgsl))
        val vbl = sd.vertexBufferLayout
        val pl = layouts.createPipelineLayout(
          device,
          Arr[GPUBindGroupLayout](),
        )
        Shade[U](id, module, vbl, null, pl, false)
      case _ =>
        type Wrapped = (values: U)
        val sd = Shader[A, V, Wrapped](vertBody, fragBody)
        val wgsl = sd.generateWGSL
        val module = device.createShaderModule(Obj.literal(code = wgsl))
        val vbl = sd.vertexBufferLayout
        val (bgls, pl) = sd.createPipelineLayout(device)
        Shade[U](id, module, vbl, bgls(0), pl, false)

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
    pass.end()

    queue.submit(Arr(encoder.finish()))

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
