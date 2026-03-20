package graphics.painter

import org.scalajs.dom
import org.scalajs.dom.HTMLCanvasElement
import trivalibs.utils.js.*
import webgpu.*

import scala.scalajs.js

def initPainter(canvas: HTMLCanvasElement)(
    init: Painter => Unit,
): js.Promise[Unit] =
  val gpuOpt = WebGPU.getGPU()
  if gpuOpt.isEmpty then
    js.Promise.reject(
      js.JavaScriptException(js.Error("WebGPU is not supported")),
    )
  else
    val gpu = gpuOpt.safe
    for
      adapter <- gpu.requestAdapter().orError("Failed to get WebGPU adapter")
      device <- adapter.requestDevice()
    yield
      val queue = device.queue
      val context = WebGPU.getContext(canvas)
      val format = gpu.getPreferredCanvasFormat()

      context.configure(
        Obj.literal(
          device = device,
          format = format,
        ),
      )

      val painter = Painter(device, queue, canvas, context, format)

      // Set initial canvas size
      val w = canvas.clientWidth
      val h = canvas.clientHeight
      canvas.width = w
      canvas.height = h

      init(painter)

      // Set up ResizeObserver — updates canvas dimensions and fires painter callbacks
      val observer = js.Dynamic
        .newInstance(js.Dynamic.global.ResizeObserver)(
          ((entries: js.Array[js.Dynamic]) =>
            val entry = entries(0)
            val rw = entry.contentRect.width.asInstanceOf[Int]
            val rh = entry.contentRect.height.asInstanceOf[Int]
            if rw > 0 && rh > 0 then
              canvas.width = rw
              canvas.height = rh
              painter.fireResize(rw, rh)
          ): js.Function1[js.Array[js.Dynamic], Unit],
        )
      observer.observe(canvas)
