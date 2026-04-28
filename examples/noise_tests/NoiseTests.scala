package examples.noise_tests

import graphics.math.cpu.{*, given}
import graphics.math.gpu.{*, given}
import graphics.painter.*
import graphics.shader.dsl.{*, given}
import graphics.shader.lib.random.Hash
import graphics.shader.lib.random.Psrdnoise
import graphics.shader.lib.random.Simplex
import graphics.shader.{*, given}
import graphics.utils.animation.animate
import org.scalajs.dom
import org.scalajs.dom.HTMLCanvasElement
import org.scalajs.dom.document
import trivalibs.utils.js.*
import trivalibs.utils.numbers.NumExt.given

import scala.scalajs.js
import scala.scalajs.js.annotation.*

// 4×2 grid showing 8 float-output hash functions using DSL if/else.
// Top row: scalar hashes. Bottom row: vec hashes.
private val hashDisplay: WgslFn[(uv: Vec2, time: Float), Vec4] =
  WgslFn
    .dsl[(uv: Vec2, time: Float), Vec4]("hash_display"): (p, ret) =>
      val N = LetFloat("N")
      val M = LetFloat("M")
      val q = LetVec2("q")
      val qi = LetUVec2("qi")
      val border = LetFloat("border")
      val borderHi = LetFloat("borderHi")
      val color = VarVec3("color")
      val qa = LetVec2("qa")
      val qa3 = vec3(qa.x, qa.y, p.time * 0.05)

      Block(
        N := 4.0,
        M := 2.0,
        q := (p.uv * vec2(N, M)).fract,
        qi := uvec2((p.uv.x * N).toU32, (p.uv.y * M).toU32),
        border := 0.025,
        borderHi := FloatExpr("1.0") - border,
        when(
          q.x < border || q.x > borderHi || q.y < border || q.y > borderHi,
          ret(vec4(0.0, 0.0, 0.0, 1.0)),
        ),
        color := vec3(0.0),
        qa := q + vec2(p.time * 0.1, 0.0),
        ifElse(
          qi.y === 0.u,
          ifElse(
            qi.x === 0.u,
            color := vec3(Hash.hash1(qa.x.bitsToU32)),
            ifElse(
              qi.x === 1.u,
              color := vec3(Hash.hash1FromFloat(qa.x)),
              ifElse(
                qi.x === 2.u,
                color := vec3(Hash.hash21(qa.bitsToU32)),
                color := vec3(Hash.u32ToF32(Hash.hash21i(qa.bitsToU32))),
              ),
            ),
          ),
          ifElse(
            qi.x === 0.u,
            color := vec3(Hash.hash2d(qa.bitsToU32), 0.0),
            ifElse(
              qi.x === 1.u,
              color := vec3(Hash.hash2dFromVec(qa), 0.0),
              ifElse(
                qi.x === 2.u,
                color := Hash.hash3d(qa3.bitsToU32),
                color := Hash.hash3dFromVec(qa3),
              ),
            ),
          ),
        ),
        ret(vec4(color, 1.0)),
      )
    .withDeps(
      Hash.hash1FromFloat,
      Hash.hash21,
      Hash.u32ToF32,
      Hash.hash2dFromVec,
      Hash.hash3dFromVec,
    )

@JSExportTopLevel("main", moduleID = "noise_tests")
def main(): Unit =
  val canvas =
    document.getElementById("canvas").asInstanceOf[HTMLCanvasElement]

  Painter.init(canvas): painter =>
    type Uniforms = (time: Float, res: Vec2)

    val aspectUv = WgslFn.dsl[(uv: Vec2, res: Vec2), Vec2]("aspect_uv"):
      (p, ret) =>
        val aspect = LetFloat("aspect")
        val aspectInv = LetFloat("aspectInv")
        Block(
          aspect := p.res.x / p.res.y,
          aspectInv := FloatExpr("1.0") / aspect,
          ret(p.uv * vec2(aspect.min(1.0), aspectInv.min(1.0))),
        )

    // -------------------------------------------------------------------------
    // Simplex noise shaders
    // -------------------------------------------------------------------------

    val simplex2dShade = painter.layerShade[Uniforms]: program =>
      program.fn(Simplex.simplexNoise2d)
      program.fn(aspectUv)
      program.frag: ctx =>
        val uv = LetVec2("uv")
        val n = LetFloat("n")
        val t = ctx.bindings.time
        val r = ctx.bindings.res
        Block(
          uv := aspectUv(ctx.in.uv, r) * (t.sin * 5.0 + 6.0),
          n := Simplex.simplexNoise2d(uv).fit1101,
          ctx.out.color := vec4(n, n, n, 1.0),
        )

    val simplex3dShade = painter.layerShade[Uniforms]: program =>
      program.fn(Simplex.simplexNoise3d)
      program.fn(aspectUv)
      program.frag: ctx =>
        val uv = LetVec2("uv")
        val n = LetFloat("n")
        val t = ctx.bindings.time
        val r = ctx.bindings.res
        Block(
          uv := aspectUv(ctx.in.uv, r) * 5.0,
          n := Simplex.simplexNoise3d(vec3(uv.x, uv.y, t * 0.3)).fit1101,
          ctx.out.color := vec4(n, n, n, 1.0),
        )

    val simplex2dSeededShade = painter.layerShade[Uniforms]: program =>
      program.fn(Simplex.simplexNoise2dSeeded)
      program.fn(aspectUv)
      program.frag: ctx =>
        val uv = LetVec2("uv")
        val n = LetFloat("n")
        val t = ctx.bindings.time
        val r = ctx.bindings.res
        Block(
          uv := aspectUv(ctx.in.uv, r) * 5.0,
          n := Simplex.simplexNoise2dSeeded(uv, t * 0.2).fit1101,
          ctx.out.color := vec4(n, n, n, 1.0),
        )

    val simplex3dSeededShade = painter.layerShade[Uniforms]: program =>
      program.fn(Simplex.simplexNoise3dSeeded)
      program.fn(aspectUv)
      program.frag: ctx =>
        val uv = LetVec2("uv")
        val n = LetFloat("n")
        val t = ctx.bindings.time
        val r = ctx.bindings.res
        Block(
          uv := aspectUv(ctx.in.uv, r) * 5.0,
          n := Simplex
            .simplexNoise3dSeeded(
              vec3(uv.x, uv.y, 0.0),
              vec3(t * 0.1, t * 0.07, 0.0),
            )
            .fit1101,
          ctx.out.color := vec4(n, n, n, 1.0),
        )

    // -------------------------------------------------------------------------
    // fBm shaders
    // -------------------------------------------------------------------------

    val fbm2dShade = painter.layerShade[Uniforms]: program =>
      program.fn(Simplex.fbmSimplex2d)
      program.fn(aspectUv)
      program.frag: ctx =>
        val uv = LetVec2("uv")
        val n = LetFloat("n")
        val t = ctx.bindings.time
        val r = ctx.bindings.res
        Block(
          uv := aspectUv(ctx.in.uv, r) * 3.0 + vec2(t * 0.2, 0.0),
          n := Simplex.fbmSimplex2d(uv, 5.i, 2.0, 0.5).fit1101,
          ctx.out.color := vec4(n, n, n, 1.0),
        )

    val fbm2dSeededShade = painter.layerShade[Uniforms]: program =>
      program.fn(Simplex.fbmSimplex2dSeeded)
      program.fn(aspectUv)
      program.frag: ctx =>
        val uv = LetVec2("uv")
        val n = LetFloat("n")
        val t = ctx.bindings.time
        val r = ctx.bindings.res
        Block(
          uv := aspectUv(ctx.in.uv, r) * 3.0,
          n := Simplex.fbmSimplex2dSeeded(uv, 5.i, 2.0, 0.5, t * 0.3).fit1101,
          ctx.out.color := vec4(n, n, n, 1.0),
        )

    val fbm3dShade = painter.layerShade[Uniforms]: program =>
      program.fn(Simplex.fbmSimplex3d)
      program.fn(aspectUv)
      program.frag: ctx =>
        val uv = LetVec2("uv")
        val n = LetFloat("n")
        val t = ctx.bindings.time
        val r = ctx.bindings.res
        Block(
          uv := aspectUv(ctx.in.uv, r) * 3.0,
          n := Simplex
            .fbmSimplex3d(vec3(uv.x, uv.y, t * 0.2), 5.i, 2.0, 0.5)
            .fit1101,
          ctx.out.color := vec4(n, n, n, 1.0),
        )

    val fbm3dSeededShade = painter.layerShade[Uniforms]: program =>
      program.fn(Simplex.fbmSimplex3dSeeded)
      program.fn(aspectUv)
      program.frag: ctx =>
        val uv = LetVec2("uv")
        val n = LetFloat("n")
        val t = ctx.bindings.time
        val r = ctx.bindings.res
        Block(
          uv := aspectUv(ctx.in.uv, r) * 3.0,
          n := Simplex
            .fbmSimplex3dSeeded(
              vec3(uv.x, uv.y, 0.0),
              5.i,
              2.0,
              0.5,
              vec3(t * 0.1, 0.0, 0.0),
            )
            .fit1101,
          ctx.out.color := vec4(n, n, n, 1.0),
        )

    // -------------------------------------------------------------------------
    // Worley noise
    // -------------------------------------------------------------------------

    val worley2dShade = painter.layerShade[Uniforms]: program =>
      program.fn(Simplex.worley2d)
      program.fn(aspectUv)
      program.frag: ctx =>
        val uv = LetVec2("uv")
        val w = LetVec2("w")
        val n = LetFloat("n")
        val t = ctx.bindings.time
        val r = ctx.bindings.res
        Block(
          uv := aspectUv(ctx.in.uv, r) * 5.0 + vec2(t * 0.2, 0.0),
          w := Simplex.worley2d(uv, 1.0),
          n := w.x,
          ctx.out.color := vec4(n, n, n, 1.0),
        )

    // -------------------------------------------------------------------------
    // 4D simplex noise shaders
    // -------------------------------------------------------------------------

    val simplex4dShade = painter.layerShade[Uniforms]: program =>
      program.fn(Simplex.simplexNoise4d)
      program.fn(aspectUv)
      program.frag: ctx =>
        val uv = LetVec2("uv")
        val n = LetFloat("n")
        val t = ctx.bindings.time
        val r = ctx.bindings.res
        Block(
          uv := aspectUv(ctx.in.uv, r) * 4.0,
          n := Simplex
            .simplexNoise4d(vec4(uv.x, uv.y, t * 0.2, t * 0.13))
            .fit1101,
          ctx.out.color := vec4(n, n, n, 1.0),
        )

    val tilingSimplexNoise2dShade = painter.layerShade[Uniforms]: program =>
      program.fn(Simplex.tilingSimplexNoise2d)
      program.frag: ctx =>
        val n = LetFloat("n")
        val t = ctx.bindings.time
        Block(
          n := Simplex
            .tilingSimplexNoise2d(
              ctx.in.uv + vec2(t * 0.05, 0.0).fract,
              4.0,
            )
            .fit1101,
          ctx.out.color := vec4(n, n, n, 1.0),
        )

    // -------------------------------------------------------------------------
    // psrdnoise 2D shaders
    // -------------------------------------------------------------------------

    val tilingRotNoise2dShade = painter.layerShade[Uniforms]: program =>
      program.fn(Psrdnoise.tilingRotNoise2d)
      program.fn(aspectUv)
      program.frag: ctx =>
        val uv = LetVec2("uv")
        val result = LetVec3("result")
        val n = LetFloat("n")
        val t = ctx.bindings.time
        val r = ctx.bindings.res
        Block(
          uv := aspectUv(ctx.in.uv, r) * 2.5,
          result := Psrdnoise
            .tilingRotNoise2d(uv.fract * 4.0 + 0.5, vec2(4.0, 4.0), t * 0.1),
          n := result.x.fit1101,
          ctx.out.color := vec4(n, n, n, 1.0),
        )

    val tilingNoise2dShade = painter.layerShade[Uniforms]: program =>
      program.fn(Psrdnoise.tilingNoise2d)
      program.fn(aspectUv)
      program.frag: ctx =>
        val uv = LetVec2("uv")
        val result = LetVec3("result")
        val n = LetFloat("n")
        val t = ctx.bindings.time
        val r = ctx.bindings.res
        Block(
          uv := aspectUv(ctx.in.uv, r) * 2.5,
          result := Psrdnoise
            .tilingNoise2d(uv.fract * 4.0 + 0.5, vec2(4.0, 4.0)),
          n := result.x.fit1101,
          ctx.out.color := vec4(n, n, n, 1.0),
        )

    val rotNoise2dShade = painter.layerShade[Uniforms]: program =>
      program.fn(Psrdnoise.rotNoise2d)
      program.fn(aspectUv)
      program.frag: ctx =>
        val uv = LetVec2("uv")
        val result = LetVec3("result")
        val n = LetFloat("n")
        val t = ctx.bindings.time
        val r = ctx.bindings.res
        Block(
          uv := aspectUv(ctx.in.uv, r) * 5.0,
          result := Psrdnoise.rotNoise2d(uv, t * 0.05),
          n := result.x.fit1101,
          ctx.out.color := vec4(n, n, n, 1.0),
        )

    // -------------------------------------------------------------------------
    // psrdnoise 3D shaders
    // -------------------------------------------------------------------------

    val tilingRotNoise3dShade = painter.layerShade[Uniforms]: program =>
      program.fn(Psrdnoise.tilingRotNoise3d)
      program.fn(aspectUv)
      program.frag: ctx =>
        val uv = LetVec2("uv")
        val result = LetVec4("result")
        val n = LetFloat("n")
        val t = ctx.bindings.time
        val r = ctx.bindings.res
        Block(
          uv := aspectUv(ctx.in.uv, r) * 4.0,
          result := Psrdnoise.tilingRotNoise3d(
            vec3(uv.x, uv.y, t * 0.1),
            vec3(4.0, 4.0, 4.0),
            t * 0.05,
          ),
          n := result.x.fit1101,
          ctx.out.color := vec4(n, n, n, 1.0),
        )

    val tilingNoise3dShade = painter.layerShade[Uniforms]: program =>
      program.fn(Psrdnoise.tilingNoise3d)
      program.fn(aspectUv)
      program.frag: ctx =>
        val uv = LetVec2("uv")
        val result = LetVec4("result")
        val n = LetFloat("n")
        val t = ctx.bindings.time
        val r = ctx.bindings.res
        Block(
          uv := aspectUv(ctx.in.uv, r) * 4.0,
          result := Psrdnoise
            .tilingNoise3d(vec3(uv.x, uv.y, t * 0.2), vec3(4.0, 4.0, 4.0)),
          n := result.x.fit1101,
          ctx.out.color := vec4(n, n, n, 1.0),
        )

    val rotNoise3dShade = painter.layerShade[Uniforms]: program =>
      program.fn(Psrdnoise.rotNoise3d)
      program.fn(aspectUv)
      program.frag: ctx =>
        val uv = LetVec2("uv")
        val result = LetVec4("result")
        val n = LetFloat("n")
        val t = ctx.bindings.time
        val r = ctx.bindings.res
        Block(
          uv := aspectUv(ctx.in.uv, r) * 5.0,
          result := Psrdnoise.rotNoise3d(vec3(uv.x, uv.y, t * 0.15), t * 0.03),
          n := result.x.fit1101,
          ctx.out.color := vec4(n, n, n, 1.0),
        )

    // -------------------------------------------------------------------------
    // Hash display shader
    // -------------------------------------------------------------------------

    val hashShade = painter.layerShade[Uniforms]: program =>
      program.fn(hashDisplay)
      program.frag: ctx =>
        val t = ctx.bindings.time
        Block(
          ctx.out.color := hashDisplay(ctx.in.uv, t),
        )

    // -------------------------------------------------------------------------
    // Bindings and panels
    // -------------------------------------------------------------------------

    val time = painter.binding(0.0f)
    val res = painter.binding[Vec2]

    def makePanel(shade: Shade[Uniforms, EmptyTuple]): Panel =
      val layer = painter.layer(shade).bind("time" := time, "res" := res)
      painter.panel(layer = layer)

    val panels = js.Array(
      makePanel(hashShade),
      makePanel(simplex2dShade),
      makePanel(simplex3dShade),
      makePanel(simplex4dShade),
      makePanel(tilingSimplexNoise2dShade),
      makePanel(simplex2dSeededShade),
      makePanel(simplex3dSeededShade),
      makePanel(fbm2dShade),
      makePanel(fbm2dSeededShade),
      makePanel(fbm3dShade),
      makePanel(fbm3dSeededShade),
      makePanel(worley2dShade),
      makePanel(tilingRotNoise2dShade),
      makePanel(tilingNoise2dShade),
      makePanel(rotNoise2dShade),
      makePanel(tilingRotNoise3dShade),
      makePanel(tilingNoise3dShade),
      makePanel(rotNoise3dShade),
    )

    var currentPanel = 0

    canvas.addEventListener(
      "pointerdown",
      (_: dom.Event) => currentPanel = (currentPanel + 1) % panels.length,
    )

    painter.onResize: (w, h) =>
      res.set(Vec2(w, h))

    animate: tpf =>
      time.set(time.get + tpf * 0.001f)
      painter.paint(panels(currentPanel))
      painter.show(panels(currentPanel))
