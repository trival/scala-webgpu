package sketches.base_triangle

import org.scalajs.dom.HTMLCanvasElement
import org.scalajs.dom.document
import trivalibs.graphics.buffers.*
import trivalibs.graphics.math.cpu.{*, given}
import trivalibs.graphics.math.gpu.{*, given}
import trivalibs.graphics.painter.*
import trivalibs.graphics.scene.PerspectiveCamera
import trivalibs.graphics.shader.dsl.{*, given}
import trivalibs.graphics.shader.{*, given}
import trivalibs.utils.animation.animate
import trivalibs.utils.numbers.NumExt.given

@main def baseTriangle(): Unit =
  val canvas = document.getElementById("canvas").asInstanceOf[HTMLCanvasElement]

  Painter.init(canvas): p =>
    type Attribs = (position: Vec3, color: Vec3)
    type Varyings = (color: Vec3)
    type Uniforms = (mvp: Mat4)

    val shade = p.shade[Attribs, Varyings, Uniforms]: program =>
      program.vert: ctx =>
        Block(
          ctx.out.position := ctx.bindings.mvp * vec4(ctx.in.position, 1.0),
          ctx.out.color := ctx.in.color,
        )
      program.frag: ctx =>
        ctx.out.color := vec4(ctx.in.color, 1.0)

    // val shade = p.shade[Attribs, Varyings, Uniforms](
    //   vertWgsl = """
    //     out.position = mvp * vec4<f32>(in.position, 1.0);
    //     out.color = in.color;
    //   """,
    //   fragWgsl = """
    //     out.color = vec4<f32>(in.color, 1.0);
    //   """,
    // )

    val vertices = allocateAttribs[Attribs](3)
    vertices(0).set0(0.0, 0.5, 0.0)
    vertices(0).set1(1.0, 0.2, 0.2)
    vertices(1).set0(-0.5, -0.5, 0.0)
    vertices(1).set1(0.2, 1.0, 0.2)
    vertices(2).set0(0.5, -0.5, 0.0)
    vertices(2).set1(0.2, 0.4, 1.0)

    val form = p.form(vertices = vertices)
    val mvp = p.binding[Mat4]
    val shape = p.shape(form, shade).bind("mvp" := mvp)

    val cam = PerspectiveCamera(
      fov = math.Pi / 3.0,
      aspect = canvas.width.toDouble / canvas.height.toDouble,
      near = 0.1,
      far = 100.0,
      pos = Vec3(0.0, 0.0, 2.5),
    )

    val panel = p.panel(
      shape = shape,
      clearColor = (0.05, 0.06, 0.1, 1.0),
      multisample = true,
    )

    var time = 0.0
    animate: tpf =>
      time += tpf
      val angle = time / 1000.0
      val model = Mat4.fromTranslationRotationScale(
        Vec3.zero,
        Quat.fromRotationY(angle),
        Vec3(1.0, 1.0, 1.0),
      )
      mvp.set(cam.viewProjMat * model)
      p.paintAndShow(panel)
