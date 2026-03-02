package painter_triangle

import gpu.buffers.*
import gpu.math.*
import gpu.math.given
import gpu.painter.*
import gpu.shader.{*, given}
import gpu.shader.None as GPUNone
import org.scalajs.dom
import org.scalajs.dom.HTMLCanvasElement
import org.scalajs.dom.HTMLElement
import org.scalajs.dom.document
import trivalibs.utils.js.*

import scala.scalajs.js
import scala.scalajs.js.annotation.*

@JSExportTopLevel("main", moduleID = "painter_triangle")
def main(): Unit =
  val canvas =
    document.getElementById("canvas").asInstanceOf[HTMLCanvasElement]
  val statusEl = document.getElementById("status").asInstanceOf[HTMLElement]

  initPainter(canvas): painter =>
    type Attribs = (position: Vec2, color: Vec3)
    type Varyings = (color: Vec3)
    type Uniforms = (tintColor: Vec4)

    val shade = painter.shade[Attribs, Varyings, Uniforms](
      vertBody = """
        |  out.position = vec4<f32>(in.position, 0.0, 1.0);
        |  out.color = in.color;
        """.stripMargin,
      fragBody = """
        |  out.color = vec4<f32>(in.color, 1.0) * tintColor;
        """.stripMargin,
    )

    val vertices = allocateAttribs[Attribs](3)

    // Vertex 0: top (red)
    vertices(0)(0) := (0.0, 0.5)
    vertices(0)(1) := (1.0, 0.0, 0.0)

    // Vertex 1: bottom-left (green)
    vertices(1)(0) := (-0.5, -0.5)
    vertices(1)(1) := (0.0, 1.0, 0.0)

    // Vertex 2: bottom-right (blue)
    vertices(2)(0) := (0.5, -0.5)
    vertices(2)(1) := (0.0, 0.0, 1.0)

    val form = painter.form(vertices)
    val tintColor = painter.binding[Vec4]
    val shape = painter.shape(form, shade).bind(0 -> tintColor)

    val startTime = js.Date.now()

    def render(time: Double): Unit =
      val elapsed = (time - startTime) / 2000.0
      val r = Math.sin(elapsed * 2.0) * 0.5 + 0.5
      val g = Math.sin(elapsed * 2.0 + 2.0) * 0.5 + 0.5
      val b = Math.sin(elapsed * 2.0 + 4.0) * 0.5 + 0.5
      tintColor.update: c =>
        c.r = r
        c.g = g
        c.b = b

      painter.draw(shape, clearColor = (0.1, 0.1, 0.1, 1.0))
      dom.window.requestAnimationFrame(t => render(t))

    dom.window.requestAnimationFrame(t => render(t))

    statusEl.textContent = "Painter triangle with animated tint!"
    statusEl.setAttribute("class", "success")
