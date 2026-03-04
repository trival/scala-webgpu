package painter_dsl

import gpu.buffers.*
import gpu.math.*
import gpu.math.Mat2.given
import gpu.math.Mat2Buffer.given
import gpu.math.given
import gpu.painter.*
import gpu.shader.None as GPUNone
import gpu.shader.dsl.{*, given}
import gpu.shader.{*, given}
import gpu.utils.animation.animate
import org.scalajs.dom
import org.scalajs.dom.HTMLCanvasElement
import org.scalajs.dom.document
import trivalibs.utils.js.*
import trivalibs.utils.numbers.NumExt.given

import scala.scalajs.js
import scala.scalajs.js.annotation.*

@JSExportTopLevel("main", moduleID = "painter_dsl")
def main(): Unit =
  val canvas =
    document.getElementById("canvas").asInstanceOf[HTMLCanvasElement]

  initPainter(canvas): painter =>
    type Attribs = (position: Vec2)
    type Varyings = EmptyTuple
    type Uniforms = (
        color: FragmentUniform[Vec3],
        rotation: VertexUniform[Mat2],
        translation: VertexUniform[Vec2],
    )

    val shade = painter.shade[Attribs, Varyings, Uniforms]: program =>
      program.vert: ctx =>
        val rotated = ctx.locals("rotated")
        Block(
          rotated := ctx.bindings.mat2("rotation") * ctx.in.vec2("position"),
          ctx.out("position") := vec4(
            rotated.vec2 + ctx.bindings.vec2("translation"),
            0.0,
            1.0,
          ),
        )
      program.frag: ctx =>
        Block(
          ctx.out("color") := vec4(ctx.bindings.vec3("color"), 1.0),
        )

    // Simple triangle centered at origin
    val vertices = allocateAttribs[Attribs](3)
    vertices(0).set0(0.0, 0.3)
    vertices(1).set0(-0.25, -0.15)
    vertices(2).set0(0.25, -0.15)

    val form = painter.form(vertices)

    // Triangle 1: red, fast rotation, oscillates up/down
    val shape1 = painter
      .shape(form, shade)
      .bind("color" := Vec3(1.0, 0.2, 0.2))

    val mat1 = painter.binding(Mat2.identity)

    // Triangle 2: blue, slow rotation, oscillates left/right
    val shape2 = painter
      .shape(form, shade)
      .bind("color" := Vec3(0.2, 0.5, 1.0), "rotation" := mat1)

    var time = 0.0

    animate: tpf =>
      time += tpf
      val t = time / 1000.0

      shape1.bind(
        "rotation" := Mat2.fromRotation(t * 2.0),
        "translation" := Vec2(0.0, t.sin * 0.7),
      )
      shape2.bind(
        "translation" := Vec2((t * 0.7).cos * 0.7, 0.0),
      )

      mat1.update:
        _.rotate(tpf / 1000 * 0.5)

      painter.draw(shape1, clearColor = (0.1, 0.1, 0.1, 1.0))
      painter.draw(shape2)
