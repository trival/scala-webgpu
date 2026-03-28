package panel_tex

import graphics.buffers.*
import graphics.math.cpu.{*, given}
import graphics.math.gpu.{*, given}
import graphics.painter.*
import graphics.scene.*
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

@JSExportTopLevel("main", moduleID = "panel_tex")
def main(): Unit =
  val canvas =
    document.getElementById("canvas").asInstanceOf[HTMLCanvasElement]

  Painter.init(canvas): painter =>
    // color shade

    type ColorAttribs = (position: Vec3, color: Vec3)
    type MvpUniforms = (mvp: VertexUniform[Mat4])

    val colorShade = painter.shade[ColorAttribs, (color: Vec3), MvpUniforms]:
      program =>
        program.vert: ctx =>
          Block(
            ctx.out.color := ctx.in.color,
            ctx.out.position := ctx.bindings.mvp * vec4(ctx.in.position, 1.0),
          )
        program.frag: ctx =>
          ctx.out.color := vec4(ctx.in.color, 1.0)

    // tex shade

    type TexAttribs = (position: Vec3, uv: Vec2)
    type TexUniforms = (
        mvp: VertexUniform[Mat4],
        texSampler: FragmentUniform[Sampler],
    )
    type TexPanels = (colorTex: FragmentPanel)

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
    // Geometry — 3D colored shapes (world-space, in XY plane, unit-ish)
    // -----------------------------------------------------------------------

    // Red triangle (equilateral, radius ~1)
    val triVerts = allocateAttribs[ColorAttribs](3)
    triVerts(0).set0(0.0, 1.0, 0.0); triVerts(0).set1(1.0, 0.2, 0.2)
    triVerts(1).set0(-0.87, -0.5, 0.0); triVerts(1).set1(0.9, 0.45, 0.1)
    triVerts(2).set0(0.87, -0.5, 0.0); triVerts(2).set1(1.0, 0.8, 0.15)
    val triForm = painter.form(triVerts)

    // Blue quad (square, ±0.8)
    val quadVerts = allocateAttribs[ColorAttribs](6)
    quadVerts(0).set0(-0.8, -0.8, 0.0); quadVerts(0).set1(0.1, 0.3, 1.0)
    quadVerts(1).set0(0.8, -0.8, 0.0); quadVerts(1).set1(0.2, 0.55, 1.0)
    quadVerts(2).set0(0.8, 0.8, 0.0); quadVerts(2).set1(0.5, 0.8, 1.0)
    quadVerts(3).set0(-0.8, -0.8, 0.0); quadVerts(3).set1(0.1, 0.3, 1.0)
    quadVerts(4).set0(0.8, 0.8, 0.0); quadVerts(4).set1(0.5, 0.8, 1.0)
    quadVerts(5).set0(-0.8, 0.8, 0.0); quadVerts(5).set1(0.25, 0.5, 1.0)
    val quadForm = painter.form(quadVerts)

    // -----------------------------------------------------------------------
    // Geometry — textured 3D quads for the canvas (local space, centered at
    // origin, ±0.85 — positioned and rotated by Transform at render time)
    // -----------------------------------------------------------------------

    def makeTexQuadVerts() =
      val v = allocateAttribs[TexAttribs](6)
      v(0).set0(-0.85, -0.85, 0.0); v(0).set1(0.0, 1.0)
      v(1).set0(0.85, -0.85, 0.0); v(1).set1(1.0, 1.0)
      v(2).set0(0.85, 0.85, 0.0); v(2).set1(1.0, 0.0)
      v(3).set0(-0.85, -0.85, 0.0); v(3).set1(0.0, 1.0)
      v(4).set0(0.85, 0.85, 0.0); v(4).set1(1.0, 0.0)
      v(5).set0(-0.85, 0.85, 0.0); v(5).set1(0.0, 0.0)
      v

    val leftTexForm = painter.form(makeTexQuadVerts())
    val rightTexForm = painter.form(makeTexQuadVerts())

    // -----------------------------------------------------------------------
    // MVP bindings
    // -----------------------------------------------------------------------
    val triMvp = painter.binding[Mat4]
    val quadMvp = painter.binding[Mat4]
    val leftMvp = painter.binding[Mat4]
    val rightMvp = painter.binding[Mat4]

    // -----------------------------------------------------------------------
    // Shapes
    // -----------------------------------------------------------------------
    val triShape = painter.shape(triForm, colorShade).bind("mvp" := triMvp)
    val quadShape = painter.shape(quadForm, colorShade).bind("mvp" := quadMvp)

    val leftTexShape = painter
      .shape(leftTexForm, texShade)
      .bind("mvp" := leftMvp, "texSampler" := painter.samplerLinear)

    val rightTexShape = painter
      .shape(rightTexForm, texShade)
      .bind("mvp" := rightMvp, "texSampler" := painter.samplerLinear)

    // -----------------------------------------------------------------------
    // Panels
    // -----------------------------------------------------------------------
    val trianglePanel = painter.panel(
      width = 800,
      height = 800,
      clearColor = (0.04, 0.04, 0.06, 1.0),
      depthTest = true,
      shapes = Arr(triShape),
    )

    val quadPanel = painter.panel(
      width = 800,
      height = 800,
      clearColor = (0.04, 0.06, 0.04, 1.0),
      depthTest = true,
      shapes = Arr(quadShape),
    )

    // Bind intermediate panels as textures to canvas shapes
    leftTexShape.bind("colorTex" := trianglePanel)
    rightTexShape.bind("colorTex" := quadPanel)

    val canvasPanel = painter.panel(
      clearColor = (0.03, 0.03, 0.05, 1.0),
      depthTest = true,
      shapes = Arr(leftTexShape, rightTexShape),
    )

    // -----------------------------------------------------------------------
    // Cameras
    // -----------------------------------------------------------------------

    // Camera for the colored 3D shapes inside the intermediate panels (square)
    val shapeCam = PerspectiveCamera(
      fov = math.Pi / 3.0,
      aspect = 1.0,
      near = 0.1,
      far = 100.0,
    )
    shapeCam.resetTransform(Vec3(0.0, 1.2, 3.2), 0.0, -0.3)

    // Camera for the canvas (sees both floating textured quads side by side)
    val aspect =
      canvas.clientWidth.toDouble / math.max(canvas.clientHeight.toDouble, 1.0)
    val canvasCam = PerspectiveCamera(
      fov = math.Pi / 3.5,
      aspect = aspect,
      near = 0.1,
      far = 100.0,
    )
    canvasCam.resetTransform(Vec3(0.0, 0.4, 3.8), 0.0, -0.08)

    // -----------------------------------------------------------------------
    // Transforms for 3D shapes (world-space, rotated each frame)
    // -----------------------------------------------------------------------
    val triTransform = Transform.identity // red triangle in trianglePanel
    val quadTransform = Transform.identity // blue quad in quadPanel

    // Canvas textured quads: overlapping at center, perpendicular to each other
    val leftTransform = Transform.identity
    val rightTransform = Transform.fromRotationY(math.Pi * 0.5)

    // -----------------------------------------------------------------------
    // Animation
    // -----------------------------------------------------------------------
    var t = 0.0

    animate: tpf =>
      t += tpf * 0.0006

      // Intermediate shapes: counter-rotating around Y
      triTransform.rotation.setFromRotationY(t)
      quadTransform.rotation.setFromRotationY(-t * 0.75)

      // Canvas quads: slower rotation, opposite phases
      leftTransform.rotation.setFromRotationY(t * 0.38)
      rightTransform.rotation.setFromRotationY(-(t * 0.42) - math.Pi * 0.15)

      val shapePV = shapeCam.viewProjMat
      val canvasPV = canvasCam.viewProjMat

      triMvp.set(shapePV * triTransform.toMatrix)
      quadMvp.set(shapePV * quadTransform.toMatrix)
      leftMvp.set(canvasPV * leftTransform.toMatrix)
      rightMvp.set(canvasPV * rightTransform.toMatrix)

      painter.paint(trianglePanel)
      painter.paint(quadPanel)
      painter.paint(canvasPanel)
      painter.show(canvasPanel)
