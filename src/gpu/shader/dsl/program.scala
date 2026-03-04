package gpu.shader.dsl

// ---------------------------------------------------------------------------
// Program[A, V, U] — DSL program builder
//
// Usage:
//   val program = Program[Attribs, Varyings, Uniforms]()
//   program.vert: ctx =>
//     Block(
//       ctx.locals.rotated := ctx.bindings.rotation * ctx.in.position,
//       ctx.out.position   := vec4(ctx.locals.rotated + ctx.bindings.translation, 0.0, 1.0),
//     )
//   program.frag: ctx =>
//     Block(
//       ctx.out.color := vec4(ctx.bindings.color, 1.0),
//     )
// ---------------------------------------------------------------------------

class Program[A, V, U]:
  var vertBody: Block = Block.empty
  var fragBody: Block = Block.empty

  private def makeCtx: ShaderCtx = ShaderCtx(
    in = ExprAccessor("in"),
    out = AssignAccessor("out"),
    bindings = ExprAccessor(""),
    locals = LocalAccessor(),
  )

  inline def vert(body: ShaderCtx => Block): Unit =
    vertBody = body(makeCtx)

  inline def frag(body: ShaderCtx => Block): Unit =
    fragBody = body(makeCtx)

  def vertBodyStr: String = Block.unwrap(vertBody)
  def fragBodyStr: String = Block.unwrap(fragBody)
