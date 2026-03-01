package gpu.painter

import gpu.buffers.*
import gpu.math.*
import gpu.shader.*
import org.scalajs.dom.HTMLCanvasElement
import trivalibs.bufferdata.StructArray
import trivalibs.utils.js.*
import webgpu.*

import scala.collection.mutable
import scala.compiletime.erasedValue
import scala.scalajs.js

private case class PipelineKey(
    shadeId: Int,
    blendMode: BlendMode,
    cullMode: CullMode,
    topology: PrimitiveTopology,
    frontFace: FrontFace,
    targetFormat: String,
)

class Painter(
    val device: GPUDevice,
    val queue: GPUQueue,
    val canvas: HTMLCanvasElement,
    val context: GPUCanvasContext,
    val preferredFormat: String,
):
  private val pipelineCache = mutable.HashMap[PipelineKey, GPURenderPipeline]()
  private var nextShadeId = 0

  def width: Int = canvas.width
  def height: Int = canvas.height

  // =========================================================================
  // Shade factory
  // =========================================================================

  inline def shade[A, V, U](
      vertBody: String,
      fragBody: String,
  ): Shade =
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
        Shade(id, module, vbl, null, pl, false)
      case _ =>
        type Wrapped = (values: U)
        val sd = Shader[A, V, Wrapped](vertBody, fragBody)
        val wgsl = sd.generateWGSL
        val module = device.createShaderModule(Obj.literal(code = wgsl))
        val vbl = sd.vertexBufferLayout
        val (bgls, pl) = sd.createPipelineLayout(device)
        Shade(id, module, vbl, bgls(0), pl, false)

  // =========================================================================
  // Form factory
  // =========================================================================

  def form[F <: Tuple](
      vertices: StructArray[F],
      topology: PrimitiveTopology = PrimitiveTopology.TriangleList,
      frontFace: FrontFace = FrontFace.CCW,
  ): Form =
    val buffer = device.createBuffer(
      Obj.literal(
        size = vertices.arrayBuffer.byteLength,
        usage = GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
      ),
    )
    queue.writeBuffer(buffer, 0.0, vertices.arrayBuffer)
    Form(buffer, vertices.length, topology, frontFace)

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
  // draw() — direct-to-canvas rendering
  // =========================================================================

  def draw(
      shape: Shape,
      clearColor: Option[(Double, Double, Double, Double)] = None,
  ): Unit =
    val encoder = device.createCommandEncoder()
    val textureView = context.getCurrentTexture().createView()

    val colorAttachment =
      if clearColor.isDefined then
        val (r, g, b, a) = clearColor.get
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

    val key = PipelineKey(
      shape.shade.id,
      shape.blendMode,
      shape.cullMode,
      shape.form.topology,
      shape.form.frontFace,
      preferredFormat,
    )
    val pipeline = pipelineCache.getOrElseUpdate(key, createPipeline(shape, key))

    pass.setPipeline(pipeline)

    if shape.bindings.nonEmpty && shape.shade.valueBindGroupLayout != null then
      val bindGroup = createBindGroup(shape)
      pass.setBindGroup(0, bindGroup)

    pass.setVertexBuffer(0, shape.form.vertexBuffer)
    pass.draw(shape.form.vertexCount)
    pass.end()

    queue.submit(Arr(encoder.finish()))

  // =========================================================================
  // Pipeline creation + caching
  // =========================================================================

  private def createPipeline(
      shape: Shape,
      key: PipelineKey,
  ): GPURenderPipeline =
    val shade = shape.shade
    val blendState = key.blendMode.toBlendState

    val target: js.Dynamic =
      if blendState.isEmpty then Obj.literal(format = key.targetFormat)
      else
        Obj.literal(format = key.targetFormat, blend = blendState.get)

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
          topology = key.topology.webgpu,
          cullMode = key.cullMode.webgpu,
          frontFace = key.frontFace.webgpu,
        ),
      ),
    )

  // =========================================================================
  // Bind group creation
  // =========================================================================

  private def createBindGroup(shape: Shape): GPUBindGroup =
    val entries = shape.bindings.toSeq.sortBy(_._1).map: (idx, binding) =>
      Obj.literal(
        binding = idx,
        resource = Obj.literal(buffer = binding.gpuBuffer),
      )
    device.createBindGroup(
      Obj.literal(
        layout = shape.shade.valueBindGroupLayout,
        entries = Arr(entries*),
      ),
    )
