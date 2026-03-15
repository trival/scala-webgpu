package gpu.shader.dsl

import scala.NamedTuple
import scala.NamedTuple.AnyNamedTuple
import scala.scalajs.js
import trivalibs.utils.js.{Arr, Dict}

// ---------------------------------------------------------------------------
// Program[A, V, U] — DSL program builder with fully typed contexts
//
// Usage:
//   val program = Program[Attribs, Varyings, Uniforms]()
//   program.vert[(rotated: Vec2)]: ctx =>
//     Block(
//       ctx.locals.rotated := ctx.bindings.rotation * ctx.in.position,
//       ctx.out.position   := vec4(ctx.locals.rotated + ctx.bindings.translation, 0.0, 1.0),
//     )
//   program.frag[EmptyTuple]: ctx =>
//     Block(
//       ctx.out.color := vec4(ctx.bindings.color, 1.0),
//     )
// ---------------------------------------------------------------------------

class Program[A, V, U]:
  var vertBody: Block = Block.empty
  var fragBody: Block = Block.empty
  private val fnSrcs = Arr[String]()
  private val fnNames = Dict[Boolean]()

  /** Register a helper function to be emitted before vs_main/fs_main.
    * Idempotent — registering the same name twice has no effect.
    */
  def fn[P, R](f: WgslFn[P, R]): Unit =
    val data = f.asInstanceOf[WgslFnData]
    if !js.DynamicImplicits.truthValue(
        fnNames.asInstanceOf[js.Dynamic].hasOwnProperty(data.name),
      )
    then
      fnNames(data.name) = true
      fnSrcs.push(data.src)

  def helperFnsStr: String = fnSrcs.mkString("\n\n")

  /** Vertex shader with optional typed locals. */
  inline def vert[L](
      body: VertexCtx[A, V, U, L] => Block,
  ): Unit =
    val ctx = VertexCtx[A, V, U, L](
      in = TypedExprAccessor[NamedTuple.Map[A & AnyNamedTuple, ToExpr]]("in"),
      out = TypedAssignAccessor[(position: AssignTarget)]("out"),
      bindings =
        TypedExprAccessor[NamedTuple.Map[U & AnyNamedTuple, UniformToExpr]](""),
      locals =
        TypedLocalAccessor[NamedTuple.Map[L & AnyNamedTuple, ToLocal]],
    )
    vertBody = body(ctx)

  /** Fragment shader with optional typed locals. */
  inline def frag[L](
      body: FragmentCtx[V, U, L] => Block,
  ): Unit =
    val ctx = FragmentCtx[V, U, L](
      in = TypedExprAccessor[
        NamedTuple.Map[V & AnyNamedTuple, ToExpr]
      ]("in"),
      out = TypedAssignAccessor[(color: AssignTarget)]("out"),
      bindings =
        TypedExprAccessor[NamedTuple.Map[U & AnyNamedTuple, UniformToExpr]](""),
      locals =
        TypedLocalAccessor[NamedTuple.Map[L & AnyNamedTuple, ToLocal]],
    )
    fragBody = body(ctx)

  def vertBodyStr: String = Block.unwrap(vertBody)
  def fragBodyStr: String = Block.unwrap(fragBody)
