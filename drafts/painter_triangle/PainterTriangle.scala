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

    val shade = painter.shade[Attribs, Varyings, EmptyTuple](
      vertBody = """
        |  out.position = vec4<f32>(in.position, 0.0, 1.0);
        |  out.color = in.color;
        """.stripMargin,
      fragBody = """
        |  out.color = vec4<f32>(in.color, 1.0);
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
    val shape = Shape(form, shade)

    painter.draw(shape, clearColor = Some((0.1, 0.1, 0.1, 1.0)))

    statusEl.textContent = "Painter triangle rendered!"
    statusEl.setAttribute("class", "success")
