package buffer_triangle

import org.scalajs.dom
import org.scalajs.dom.HTMLCanvasElement
import org.scalajs.dom.HTMLElement
import org.scalajs.dom.document
import trivalibs.utils.promise.*

import scala.scalajs.js
import scala.scalajs.js.annotation.*
import scala.scalajs.js.typedarray.Float32Array

// WebGPU facades
@js.native
trait GPU extends js.Object:
  def requestAdapter(
      options: js.UndefOr[js.Object] = js.undefined
  ): js.Promise[GPUAdapter | Null] = js.native

@js.native
trait GPUAdapter extends js.Object:
  def requestDevice(
      descriptor: js.UndefOr[js.Object] = js.undefined
  ): js.Promise[GPUDevice] = js.native

@js.native
trait GPUDevice extends js.Object:
  val queue: GPUQueue = js.native
  def createShaderModule(descriptor: js.Dynamic): GPUShaderModule = js.native
  def createRenderPipeline(descriptor: js.Dynamic): GPURenderPipeline =
    js.native
  def createCommandEncoder(): GPUCommandEncoder = js.native
  def createBuffer(descriptor: js.Dynamic): GPUBuffer = js.native

@js.native
trait GPUQueue extends js.Object:
  def submit(commandBuffers: js.Array[GPUCommandBuffer]): Unit = js.native
  def writeBuffer(
      buffer: GPUBuffer,
      bufferOffset: Int,
      data: Float32Array
  ): Unit = js.native

@js.native
trait GPUShaderModule extends js.Object

@js.native
trait GPURenderPipeline extends js.Object

@js.native
trait GPUCommandEncoder extends js.Object:
  def beginRenderPass(descriptor: js.Dynamic): GPURenderPassEncoder = js.native
  def finish(): GPUCommandBuffer = js.native

@js.native
trait GPURenderPassEncoder extends js.Object:
  def setPipeline(pipeline: GPURenderPipeline): Unit = js.native
  def setVertexBuffer(slot: Int, buffer: GPUBuffer): Unit = js.native
  def draw(
      vertexCount: Int,
      instanceCount: Int = 1,
      firstVertex: Int = 0,
      firstInstance: Int = 0
  ): Unit = js.native
  def end(): Unit = js.native

@js.native
trait GPUCommandBuffer extends js.Object

@js.native
trait GPUCanvasContext extends js.Object:
  def configure(config: js.Dynamic): Unit = js.native
  def getCurrentTexture(): GPUTexture = js.native

@js.native
trait GPUTexture extends js.Object:
  def createView(): GPUTextureView = js.native

@js.native
trait GPUTextureView extends js.Object

@js.native
trait GPUBuffer extends js.Object

object GPUBufferUsage:
  val VERTEX = 0x0020
  val COPY_DST = 0x0008

object WebGPUHelpers:
  def getGPU(): js.UndefOr[GPU] =
    dom.window.navigator
      .asInstanceOf[js.Dynamic]
      .gpu
      .asInstanceOf[js.UndefOr[GPU]]

  def getWebGPUContext(canvas: HTMLCanvasElement): GPUCanvasContext =
    canvas.getContext("webgpu").asInstanceOf[GPUCanvasContext]

object BufferTriangle:
  @JSExportTopLevel("main", moduleID = "buffer_triangle")
  def main(): Unit =
    val statusEl = document.getElementById("status").asInstanceOf[HTMLElement]

    def setStatus(msg: String, isError: Boolean): Unit =
      statusEl.textContent = msg
      statusEl.setAttribute("class", if isError then "error" else "success")

    val canvas =
      document.getElementById("canvas").asInstanceOf[HTMLCanvasElement]

    WebGPUHelpers.getGPU().toOption match
      case None =>
        setStatus("WebGPU is not supported in this browser", true)
      case Some(gpu) =>
        setStatus("WebGPU available, initializing...", false)
        initWebGPU(gpu, canvas, setStatus)

  def initWebGPU(
      gpu: GPU,
      canvas: HTMLCanvasElement,
      setStatus: (String, Boolean) => Unit
  ): Unit =
    val result = for
      adapter <- gpu.requestAdapter().orError("Failed to get WebGPU adapter")
      device <- adapter.requestDevice()
    yield
      setStatus("WebGPU initialized! Rendering triangle with buffers...", false)
      renderTriangle(device, canvas, setStatus)

    result.recover:
      case e: NoSuchElementException => setStatus(e.getMessage, true)
      case e                         => setStatus(s"WebGPU error: $e", true)

  def renderTriangle(
      device: GPUDevice,
      canvas: HTMLCanvasElement,
      setStatus: (String, Boolean) => Unit
  ): Unit =
    import gpu.{Shader, Vec2, Vec4, FragOut}
    import gpu.None as GPUNone

    // Define shader with vertex attributes from buffer
    val triangleShader = Shader[
      (position: Vec2, color: Vec4), // Vertex attributes from buffer
      (color: Vec4), // Varyings
      GPUNone // No uniforms
    ](
      vertexBody = """
  out.position = vec4<f32>(in.position, 0.0, 1.0);
  out.color = in.color;
  """,
      fragmentBody = """
  out.color = in.color;
  """
    )

    val wgslCode = triangleShader.generateWGSL
    dom.console.log("Generated WGSL:\n" + wgslCode)

    // Create shader module
    val shaderModule = device.createShaderModule(
      js.Dynamic.literal(
        code = wgslCode
      )
    )

    // Create vertex buffer with interleaved position and color data
    // Each vertex: x, y (position) + r, g, b, a (color) = 6 floats
    val vertices = new Float32Array(
      js.Array(
        // Vertex 0: top (red)
        0.0f, 0.5f, 1.0f, 0.0f, 0.0f, 1.0f,
        // Vertex 1: bottom-left (green)
        -0.5f, -0.5f, 0.0f, 1.0f, 0.0f, 1.0f,
        // Vertex 2: bottom-right (blue)
        0.5f, -0.5f, 0.0f, 0.0f, 1.0f, 1.0f
      )
    )

    val vertexBuffer = device.createBuffer(
      js.Dynamic.literal(
        size = vertices.byteLength,
        usage = GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST
      )
    )

    device.queue.writeBuffer(vertexBuffer, 0, vertices)

    // Get WebGPU context
    val context = WebGPUHelpers.getWebGPUContext(canvas)
    val format = "bgra8unorm"

    context.configure(
      js.Dynamic.literal(
        device = device,
        format = format
      )
    )

    // Create render pipeline with vertex buffer layout
    val pipeline = device.createRenderPipeline(
      js.Dynamic.literal(
        layout = "auto",
        vertex = js.Dynamic.literal(
          module = shaderModule,
          entryPoint = "vs_main",
          buffers = js.Array(
            js.Dynamic.literal(
              arrayStride = 6 * 4, // 6 floats * 4 bytes
              attributes = js.Array(
                js.Dynamic.literal(
                  // position
                  shaderLocation = 0,
                  offset = 0,
                  format = "float32x2"
                ),
                js.Dynamic.literal(
                  // color
                  shaderLocation = 1,
                  offset = 2 * 4, // after 2 floats
                  format = "float32x4"
                )
              )
            )
          )
        ),
        fragment = js.Dynamic.literal(
          module = shaderModule,
          entryPoint = "fs_main",
          targets = js.Array(
            js.Dynamic.literal(
              format = format
            )
          )
        ),
        primitive = js.Dynamic.literal(
          topology = "triangle-list"
        )
      )
    )

    // Render frame
    def render(): Unit =
      val commandEncoder = device.createCommandEncoder()
      val textureView = context.getCurrentTexture().createView()

      val renderPass = commandEncoder.beginRenderPass(
        js.Dynamic.literal(
          colorAttachments = js.Array(
            js.Dynamic.literal(
              view = textureView,
              loadOp = "clear",
              storeOp = "store",
              clearValue =
                js.Dynamic.literal(r = 0.15, g = 0.1, b = 0.1, a = 1.0)
            )
          )
        )
      )

      renderPass.setPipeline(pipeline)
      renderPass.setVertexBuffer(0, vertexBuffer)
      renderPass.draw(3)
      renderPass.end()

      device.queue.submit(js.Array(commandEncoder.finish()))

    render()
    setStatus("Buffer triangle rendered successfully!", false)
