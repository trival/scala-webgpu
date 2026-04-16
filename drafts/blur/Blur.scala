package drafts.blur

import graphics.buffers.*
import graphics.math.cpu.{*, given}
import graphics.math.gpu.{*, given}
import graphics.painter.*
import graphics.shader.dsl.{*, given}
import graphics.shader.{*, given}
import graphics.utils.animation.animate
import org.scalajs.dom.HTMLCanvasElement
import org.scalajs.dom.document
import trivalibs.bufferdata.*
import trivalibs.utils.js.*
import trivalibs.utils.numbers.NumExt.given

import scala.scalajs.js
import scala.scalajs.js.annotation.*

// 9-tap Gaussian blur (optimized linear sampling — 5 texture fetches)
val gaussianBlur9: WgslFn[
  (tex: Texture2D, s: Sampler, uv: Vec2, res: Vec2, dir: Vec2),
  Vec4,
] =
  WgslFn.raw("gaussian_blur_9"):
    """  var color = vec4(0.0);
  let off1 = vec2<f32>(1.3846153846) * dir / res;
  let off2 = vec2<f32>(3.2307692308) * dir / res;
  color += textureSample(tex, s, uv)        * 0.2270270270;
  color += textureSample(tex, s, uv + off1) * 0.3162162162;
  color += textureSample(tex, s, uv - off1) * 0.3162162162;
  color += textureSample(tex, s, uv + off2) * 0.0702702703;
  color += textureSample(tex, s, uv - off2) * 0.0702702703;
  return color;"""

@JSExportTopLevel("main", moduleID = "blur")
def main(): Unit =
  val canvas =
    document.getElementById("canvas").asInstanceOf[HTMLCanvasElement]

  Painter.init(canvas): painter =>
    // -----------------------------------------------------------------------
    // Shape shade — UV-colored triangle
    // -----------------------------------------------------------------------

    type Attribs = (position: Vec2, color: Vec3)
    type Varyings = (color: Vec3)

    val shapeShade = painter.shade[Attribs, Varyings, EmptyTuple]: program =>
      program.vert: ctx =>
        Block(
          ctx.out.color := ctx.in.color,
          ctx.out.position := vec4(ctx.in.position, 0.0, 1.0),
        )
      program.frag: ctx =>
        ctx.out.color := vec4(ctx.in.color, 1.0)

    // -----------------------------------------------------------------------
    // Triangle geometry
    // -----------------------------------------------------------------------

    val verts = allocateAttribs[Attribs](3)
    verts(0).set0(0.0, 0.7)
    verts(0).set1(1.0, 0.2, 0.2)
    verts(1).set0(-0.7, -0.5)
    verts(1).set1(0.2, 1.0, 0.2)
    verts(2).set0(0.7, -0.5)
    verts(2).set1(0.2, 0.2, 1.0)
    val form = painter.form().set(vertices = verts)
    val shape = painter.shape(shapeShade, form)

    // -----------------------------------------------------------------------
    // Blur layer shade — reads source texture at panel slot 0
    // -----------------------------------------------------------------------

    type BlurUniforms = (
        diameter: Float,
        resolution: Vec2,
        dir: Vec2,
        blurSampler: Sampler,
    )
    type BlurPanels = (source: FragmentPanel)

    val blurShade = painter.layerShade[BlurUniforms, BlurPanels]: program =>
      program.fn(gaussianBlur9)
      program.frag: ctx =>
        ctx.out.color := gaussianBlur9(
          ctx.textures.source,
          ctx.bindings.blurSampler,
          ctx.in.uv,
          ctx.bindings.resolution,
          ctx.bindings.dir * ctx.bindings.diameter,
        )

    // -----------------------------------------------------------------------
    // Blur passes — logarithmic: halve diameter until <= 2, H then V each step
    // -----------------------------------------------------------------------

    val res = painter.binding[Vec2]
    var blurDiameter = 32.0f

    val layers = Arr[Layer[?, ?]]()
    var d = blurDiameter
    while d > 2.0f do
      val dH = painter.binding(d)
      val dirH = painter.binding(Vec2(1.0, 0.0))
      val layerH = painter
        .layer(blurShade)
        .bind(
          "diameter" := dH,
          "resolution" := res,
          "dir" := dirH,
          "blurSampler" := painter.samplerLinear,
        )
      layers.push(layerH)

      val dV = painter.binding(d)
      val dirV = painter.binding(Vec2(0.0, 1.0))
      val layerV = painter
        .layer(blurShade)
        .bind(
          "diameter" := dV,
          "resolution" := res,
          "dir" := dirV,
          "blurSampler" := painter.samplerLinear,
        )
      layers.push(layerV)

      d = d / 2.0f

    // -----------------------------------------------------------------------
    // Panel
    // -----------------------------------------------------------------------

    val panel = painter
      .panel()
      .set(
        clearColor = (0.04, 0.04, 0.15, 1.0),
        shapes = Arr(shape),
        layers = layers,
      )

    painter.onResize: (w, h) =>
      res.set(Vec2(w, h))

    animate: tpf =>
      painter.paint(panel)
      painter.show(panel)
