package buffer_triangle

import org.scalajs.dom
import org.scalajs.dom.HTMLCanvasElement
import org.scalajs.dom.HTMLElement
import org.scalajs.dom.document
import trivalibs.bufferdata.StructArray
import trivalibs.utils.promise.*
import webgpu.*

import scala.scalajs.js
import scala.scalajs.js.annotation.*
import scala.scalajs.js.typedarray.Uint8Array

object BufferTriangle:
  @JSExportTopLevel("main", moduleID = "buffer_triangle")
  def main(): Unit =
    val statusEl = document.getElementById("status").asInstanceOf[HTMLElement]

    def setStatus(msg: String, isError: Boolean): Unit =
      statusEl.textContent = msg
      statusEl.setAttribute("class", if isError then "error" else "success")

    val canvas =
      document.getElementById("canvas").asInstanceOf[HTMLCanvasElement]

    WebGPU.getGPU().toOption match
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
    import gpu.layouts.vertexBufferLayout
    import gpu.buffers as buf

    // Define shader with vertex attributes and uniform for tint color
    val triangleShader = Shader[
      (position: Vec2, color: Vec4), // Vertex attributes from buffer
      (color: Vec4), // Varyings
      (scene: (tintColor: Vec4)) // Uniform for runtime tint
    ](
      vertexBody = """
  out.position = vec4<f32>(in.position, 0.0, 1.0);
  out.color = in.color;
  """,
      fragmentBody = """
  out.color = in.color * tintColor;
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

    // Create vertex buffer - layout derived from shader attribs
    val vertices = triangleShader.allocateAttribs(3)

    // Vertex 0: top (red)
    vertices(0)(0) := (0.0f, 0.5f)
    vertices(0)(1) := (1.0f, 0.0f, 0.0f, 1.0f)

    // Vertex 1: bottom-left (green)
    vertices(1)(0) := (-0.5f, -0.5f)
    vertices(1)(1) := (0.0f, 1.0f, 0.0f, 1.0f)

    // Vertex 2: bottom-right (blue)
    vertices(2)(0) := (0.5f, -0.5f)
    vertices(2)(1) := (0.0f, 0.0f, 1.0f, 1.0f)

    val vertexBuffer = device.createBuffer(
      js.Dynamic.literal(
        size = vertices.arrayBuffer.byteLength,
        usage = GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST
      )
    )

    // Upload vertex data
    device.queue.writeBuffer(
      vertexBuffer,
      0,
      vertices.arrayBuffer
    )

    // Create uniform buffer for tint color (Vec4 = 16 bytes)
    val tintData = StructArray.allocate[buf.Vec4](1)
    tintData(0) := (1.0f, 1.0f, 1.0f, 1.0f) // Start with white (no tint)

    val uniformBuffer = device.createBuffer(
      js.Dynamic.literal(
        size = tintData.arrayBuffer.byteLength,
        usage = GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
      )
    )

    device.queue.writeBuffer(
      uniformBuffer,
      0,
      tintData.arrayBuffer
    )

    // Get WebGPU context
    val context = WebGPU.getContext(canvas)
    val format = "bgra8unorm"

    context.configure(
      js.Dynamic.literal(
        device = device,
        format = format
      )
    )

    // Create render pipeline with DERIVED vertex buffer layout
    val pipeline = device.createRenderPipeline(
      js.Dynamic.literal(
        layout = "auto",
        vertex = js.Dynamic.literal(
          module = shaderModule,
          entryPoint = "vs_main",
          buffers = js.Array(vertexBufferLayout[(position: Vec2, color: Vec4)])
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

    // Create bind group for uniform
    val bindGroup = device.createBindGroup(
      js.Dynamic.literal(
        layout = pipeline.getBindGroupLayout(0),
        entries = js.Array(
          js.Dynamic.literal(
            binding = 0,
            resource = js.Dynamic.literal(
              buffer = uniformBuffer
            )
          )
        )
      )
    )

    // Animation state
    var startTime = js.Date.now()

    // Render frame with animation
    def render(time: Double): Unit =
      // Animate tint color
      val elapsed = (time - startTime) / 2000.0
      val r = (Math.sin(elapsed * 2.0) * 0.5 + 0.5).toFloat
      val g = (Math.sin(elapsed * 2.0 + 2.0) * 0.5 + 0.5).toFloat
      val b = (Math.sin(elapsed * 2.0 + 4.0) * 0.5 + 0.5).toFloat
      tintData(0) := (r, g, b, 1.0f)
      device.queue.writeBuffer(
        uniformBuffer,
        0,
        tintData.arrayBuffer
      )

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
      renderPass.setBindGroup(0, bindGroup)
      renderPass.setVertexBuffer(0, vertexBuffer)
      renderPass.draw(3)
      renderPass.end()

      device.queue.submit(js.Array(commandEncoder.finish()))

      // Request next frame
      dom.window.requestAnimationFrame(t => render(t))

    // Start animation loop
    dom.window.requestAnimationFrame(t => render(t))
    setStatus("Buffer triangle with animated tint!", false)
