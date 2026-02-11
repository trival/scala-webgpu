package example

import scala.scalajs.js
import scala.scalajs.js.annotation.*
import org.scalajs.dom
import org.scalajs.dom.document
import org.scalajs.dom.HTMLCanvasElement
import org.scalajs.dom.HTMLElement

// Minimal WebGPU facades for initial setup testing
@js.native
trait GPU extends js.Object:
  def requestAdapter(options: js.UndefOr[js.Object] = js.undefined): js.Promise[GPUAdapter | Null] = js.native

@js.native
trait GPUAdapter extends js.Object:
  def requestDevice(descriptor: js.UndefOr[js.Object] = js.undefined): js.Promise[GPUDevice] = js.native

@js.native
trait GPUDevice extends js.Object:
  val queue: GPUQueue = js.native
  def createShaderModule(descriptor: js.Dynamic): GPUShaderModule = js.native
  def createRenderPipeline(descriptor: js.Dynamic): GPURenderPipeline = js.native
  def createCommandEncoder(): GPUCommandEncoder = js.native

@js.native
trait GPUQueue extends js.Object:
  def submit(commandBuffers: js.Array[GPUCommandBuffer]): Unit = js.native

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
  def draw(vertexCount: Int, instanceCount: Int = 1, firstVertex: Int = 0, firstInstance: Int = 0): Unit = js.native
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

object WebGPUHelpers:
  def getGPU(): js.UndefOr[GPU] =
    dom.window.navigator.asInstanceOf[js.Dynamic].gpu.asInstanceOf[js.UndefOr[GPU]]

  def getWebGPUContext(canvas: HTMLCanvasElement): GPUCanvasContext =
    canvas.getContext("webgpu").asInstanceOf[GPUCanvasContext]

object Main:
  def main(args: Array[String]): Unit =
    val statusEl = document.getElementById("status").asInstanceOf[HTMLElement]

    def setStatus(msg: String, isError: Boolean): Unit =
      statusEl.textContent = msg
      statusEl.setAttribute("class", if isError then "error" else "success")

    val canvas = document.getElementById("canvas").asInstanceOf[HTMLCanvasElement]

    WebGPUHelpers.getGPU().toOption match
      case scala.None =>
        setStatus("WebGPU is not supported in this browser", true)
      case Some(gpu) =>
        setStatus("WebGPU available, initializing...", false)
        initWebGPU(gpu, canvas, setStatus)

  def initWebGPU(gpu: GPU, canvas: HTMLCanvasElement, setStatus: (String, Boolean) => Unit): Unit =
    import scala.scalajs.js.Thenable.Implicits.*
    import scala.concurrent.ExecutionContext.Implicits.global

    val result = for
      adapterOrNull <- gpu.requestAdapter().toFuture
      adapter = Option(adapterOrNull).getOrElse(throw new Exception("No adapter found"))
      device <- adapter.requestDevice().toFuture
    yield (adapter, device)

    result.foreach { case (adapter, device) =>
      setStatus("WebGPU initialized! Rendering triangle...", false)
      renderTriangle(device, canvas, setStatus)
    }

    result.failed.foreach { e =>
      setStatus(s"Failed to initialize WebGPU: ${e.getMessage}", true)
    }

  def renderTriangle(device: GPUDevice, canvas: HTMLCanvasElement, setStatus: (String, Boolean) => Unit): Unit =
    import gpu.{Shader, Vec4, BuiltinVertexIndex, VertOut, FragOut}
    import gpu.None as GPUNone

    // Use the full API to add vertex_index builtin input
    val triangleShader = Shader.full[
      EmptyTuple,                          // No vertex attributes
      (color: Vec4),                       // Varyings
      GPUNone,                             // No uniforms
      (vertexIndex: BuiltinVertexIndex),   // Need vertex_index
      VertOut,                             // Default vertex builtin out
      GPUNone,                             // No fragment builtin in
      FragOut                              // Default fragment out
    ](
      vertexBody = """
  let positions = array<vec2<f32>, 3>(
    vec2<f32>(0.0, 0.5),
    vec2<f32>(-0.5, -0.5),
    vec2<f32>(0.5, -0.5)
  );
  let colors = array<vec4<f32>, 3>(
    vec4<f32>(1.0, 0.0, 0.0, 1.0),
    vec4<f32>(0.0, 1.0, 0.0, 1.0),
    vec4<f32>(0.0, 0.0, 1.0, 1.0)
  );
  let idx = in.vertexIndex;
  out.position = vec4<f32>(positions[idx], 0.0, 1.0);
  out.color = colors[idx];""",
      fragmentBody = """
  out.color = in.color;"""
    )

    val wgslCode = triangleShader.generateWGSL
    dom.console.log("Generated WGSL:\n" + wgslCode)

    // Create shader module
    val shaderModule = device.createShaderModule(js.Dynamic.literal(
      code = wgslCode
    ))

    // Get WebGPU context
    val context = WebGPUHelpers.getWebGPUContext(canvas)
    val format = "bgra8unorm"

    context.configure(js.Dynamic.literal(
      device = device,
      format = format
    ))

    // Create render pipeline
    val pipeline = device.createRenderPipeline(js.Dynamic.literal(
      layout = "auto",
      vertex = js.Dynamic.literal(
        module = shaderModule,
        entryPoint = "vs_main"
      ),
      fragment = js.Dynamic.literal(
        module = shaderModule,
        entryPoint = "fs_main",
        targets = js.Array(js.Dynamic.literal(
          format = format
        ))
      ),
      primitive = js.Dynamic.literal(
        topology = "triangle-list"
      )
    ))

    // Render frame
    def render(): Unit =
      val commandEncoder = device.createCommandEncoder()
      val textureView = context.getCurrentTexture().createView()

      val renderPass = commandEncoder.beginRenderPass(js.Dynamic.literal(
        colorAttachments = js.Array(js.Dynamic.literal(
          view = textureView,
          loadOp = "clear",
          storeOp = "store",
          clearValue = js.Dynamic.literal(r = 0.1, g = 0.1, b = 0.15, a = 1.0)
        ))
      ))

      renderPass.setPipeline(pipeline)
      renderPass.draw(3)
      renderPass.end()

      device.queue.submit(js.Array(commandEncoder.finish()))

    render()
    setStatus("Triangle rendered successfully!", false)
