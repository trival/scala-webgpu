package layer_tex

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

// ---------------------------------------------------------------------------
// Vertex attribute layouts
// ---------------------------------------------------------------------------

// For the colored shapes in the two intermediate panels
type ColorAttribs = (position: Vec3, color: Vec3)

// For the texture-sampling shapes in the canvas panel
type TexAttribs = (position: Vec3, uv: Vec2)

// ---------------------------------------------------------------------------
// Uniform types
// ---------------------------------------------------------------------------

// Used by both color shape shaders
type MvpUniforms = (mvp: VertexUniform[Mat4])

// Used by the texture-sampling shader: MVP + sampler + panel texture
type TexUniforms = (
    mvp: VertexUniform[Mat4],
    texSampler: FragmentUniform[Sampler],
)
type TexPanels = (colorTex: FragmentPanel)

@JSExportTopLevel("main", moduleID = "layer_tex")
def main(): Unit =
  val canvas =
    document.getElementById("canvas").asInstanceOf[HTMLCanvasElement]

  Painter.init(canvas): painter =>
    // -----------------------------------------------------------------------
    // Color shade — vertex color passed through to fragment
    // -----------------------------------------------------------------------
    val colorShade = painter.shade[ColorAttribs, (color: Vec3), MvpUniforms]:
      program =>
        program.vert: ctx =>
          Block(
            ctx.out.color := ctx.in.color,
            ctx.out.position := ctx.bindings.mvp * vec4(ctx.in.position, 1.0),
          )
        program.frag: ctx =>
          ctx.out.color := vec4(ctx.in.color, 1.0)

    // -----------------------------------------------------------------------
    // Texture shade — samples a panel texture using UV coordinates
    // -----------------------------------------------------------------------
    val texShade =
      painter.shade[TexAttribs, (uv: Vec2), TexUniforms, TexPanels]: program =>
        program.vert: ctx =>
          Block(
            ctx.out.uv := ctx.in.uv,
            ctx.out.position := ctx.bindings.mvp * vec4(ctx.in.position, 1.0),
          )
        program.frag: ctx =>
          ctx.out.color :=
            ctx.textures.colorTex(ctx.in.uv, ctx.bindings.texSampler)

    // -----------------------------------------------------------------------
    // Geometry — colored triangle for trianglePanel
    // -----------------------------------------------------------------------
    val triVerts = allocateAttribs[ColorAttribs](3)
    triVerts(0).set0(0.0, 0.6, 0.0)
    triVerts(0).set1(1.0, 0.2, 0.2) // red
    triVerts(1).set0(-0.6, -0.5, 0.0)
    triVerts(1).set1(1.0, 0.2, 0.2)
    triVerts(2).set0(0.6, -0.5, 0.0)
    triVerts(2).set1(1.0, 0.2, 0.2)
    val triForm = painter.form(triVerts)

    // Colored quad for quadPanel (two triangles)
    val quadColorVerts = allocateAttribs[ColorAttribs](6)
    quadColorVerts(0).set0(-0.7, -0.7, 0.0)
    quadColorVerts(0).set1(0.2, 0.4, 1.0) // blue
    quadColorVerts(1).set0(0.7, -0.7, 0.0)
    quadColorVerts(1).set1(0.2, 0.4, 1.0)
    quadColorVerts(2).set0(0.7, 0.7, 0.0)
    quadColorVerts(2).set1(0.2, 0.4, 1.0)
    quadColorVerts(3).set0(-0.7, -0.7, 0.0)
    quadColorVerts(3).set1(0.2, 0.4, 1.0)
    quadColorVerts(4).set0(0.7, 0.7, 0.0)
    quadColorVerts(4).set1(0.2, 0.4, 1.0)
    quadColorVerts(5).set0(-0.7, 0.7, 0.0)
    quadColorVerts(5).set1(0.2, 0.4, 1.0)
    val quadColorForm = painter.form(quadColorVerts)

    // -----------------------------------------------------------------------
    // Geometry — textured shapes for canvas panel
    // -----------------------------------------------------------------------

    // A quad (two triangles) that samples trianglePanel
    val texQuadVerts = allocateAttribs[TexAttribs](6)
    texQuadVerts(0).set0(-0.95, -0.95, 0.0)
    texQuadVerts(0).set1(0.0, 1.0)
    texQuadVerts(1).set0(0.0, -0.95, 0.0)
    texQuadVerts(1).set1(1.0, 1.0)
    texQuadVerts(2).set0(0.0, 0.95, 0.0)
    texQuadVerts(2).set1(1.0, 0.0)
    texQuadVerts(3).set0(-0.95, -0.95, 0.0)
    texQuadVerts(3).set1(0.0, 1.0)
    texQuadVerts(4).set0(0.0, 0.95, 0.0)
    texQuadVerts(4).set1(1.0, 0.0)
    texQuadVerts(5).set0(-0.95, 0.95, 0.0)
    texQuadVerts(5).set1(0.0, 0.0)
    val texQuadForm = painter.form(texQuadVerts)

    // A triangle that samples quadPanel
    val texTriVerts = allocateAttribs[TexAttribs](3)
    texTriVerts(0).set0(0.05, 0.95, 0.0)
    texTriVerts(0).set1(0.5, 0.0)
    texTriVerts(1).set0(0.95, -0.95, 0.0)
    texTriVerts(1).set1(1.0, 1.0)
    texTriVerts(2).set0(0.05, -0.95, 0.0)
    texTriVerts(2).set1(0.0, 1.0)
    val texTriForm = painter.form(texTriVerts)

    // -----------------------------------------------------------------------
    // MVP bindings — one per rotating shape (managed BufferBindings)
    // -----------------------------------------------------------------------
    val triMvp = painter.binding[Mat4]
    val quadMvp = painter.binding[Mat4]
    val texQuadMvp = painter.binding[Mat4]
    val texTriMvp = painter.binding[Mat4]

    // -----------------------------------------------------------------------
    // Shapes
    // -----------------------------------------------------------------------
    val triShape = painter.shape(triForm, colorShade).bind("mvp" := triMvp)

    val quadColorShape =
      painter.shape(quadColorForm, colorShade).bind("mvp" := quadMvp)

    val texQuadShape = painter
      .shape(texQuadForm, texShade)
      .bind(
        "mvp" := texQuadMvp,
        "texSampler" := painter.samplerNearest,
      )

    val texTriShape = painter
      .shape(texTriForm, texShade)
      .bind(
        "mvp" := texTriMvp,
        "texSampler" := painter.samplerLinear,
      )

    // -----------------------------------------------------------------------
    // Panels
    // -----------------------------------------------------------------------
    val trianglePanel = painter.panel(
      width = 800,
      height = 800,
      clearColor = (1.0, 0.9, 0.1, 1.0), // yellow background
      shapes = Arr(triShape),
    )

    val quadPanel = painter.panel(
      width = 800,
      height = 800,
      clearColor = (0.1, 0.6, 0.1, 1.0), // green background
      shapes = Arr(quadColorShape),
    )

    // Bind the two intermediate panels as textures
    texQuadShape.bind("colorTex" := trianglePanel)
    texTriShape.bind("colorTex" := quadPanel)

    val canvasPanel = painter.panel(
      clearColor = (0.05, 0.05, 0.1, 1.0),
      shapes = Arr(texQuadShape, texTriShape),
    )

    // -----------------------------------------------------------------------
    // Animation — rotating MVPs
    // -----------------------------------------------------------------------
    var t = 0.0

    def makeMvp(angle: Double, tx: Double, ty: Double, scale: Double): Mat4 =
      val c = math.cos(angle)
      val s = math.sin(angle)
      Mat4(
        scale * c,
        -scale * s,
        0.0,
        0.0,
        scale * s,
        scale * c,
        0.0,
        0.0,
        0.0,
        0.0,
        1.0,
        0.0,
        tx,
        ty,
        0.0,
        1.0,
      )

    animate: tpf =>
      t += tpf * 0.0005

      triMvp.set(makeMvp(t, 0.0, 0.0, 0.8))
      quadMvp.set(makeMvp(-t * 0.7, 0.0, 0.0, 0.85))
      texQuadMvp.set(makeMvp(t * 0.3, 0.0, 0.0, 1.0))
      texTriMvp.set(makeMvp(-t * 0.5, 0.0, 0.0, 1.0))

      // Render intermediate panels
      painter.paint(trianglePanel)
      painter.paint(quadPanel)

      // Render final canvas panel and display
      painter.paint(canvasPanel)
      painter.show(canvasPanel)
