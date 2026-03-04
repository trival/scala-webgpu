package gpu.shader.dsl

// ---------------------------------------------------------------------------
// Accessors — typed read/write access to shader inputs, outputs, bindings
// ---------------------------------------------------------------------------

// Read-only access — returns a typed Expr subtype.
// Step 1c: ctx.in.vec2("position"), ctx.bindings.mat2("rotation")
// Step 1d: will be refined to ctx.in.position via Selectable structural types.
// Empty prefix → bare names (used for bindings / uniforms)
// Non-empty prefix → "prefix.name" (used for in/out structs)
class ExprAccessor(prefix: String):
  private def resolve(name: String): String =
    if prefix.isEmpty then name else s"$prefix.$name"
  def apply(name: String): Expr      = Expr.raw(resolve(name))
  def float(name: String): FloatExpr = FloatExpr(resolve(name))
  def vec2(name: String): Vec2Expr   = Vec2Expr(resolve(name))
  def vec3(name: String): Vec3Expr   = Vec3Expr(resolve(name))
  def vec4(name: String): Vec4Expr   = Vec4Expr(resolve(name))
  def mat2(name: String): Mat2Expr   = Mat2Expr(resolve(name))
  def mat3(name: String): Mat3Expr   = Mat3Expr(resolve(name))
  def mat4(name: String): Mat4Expr   = Mat4Expr(resolve(name))
  def bool(name: String): BoolExpr   = BoolExpr(resolve(name))

// Write access — returns AssignTarget that supports :=
class AssignAccessor(prefix: String):
  def apply(name: String): AssignTarget =
    AssignTarget(if prefix.isEmpty then name else s"$prefix.$name")

class AssignTarget(val target: String):
  inline def :=(value: Expr): Stmt = Stmt.assign(target, value)

// Local variable access — :=  emits `let name = value;`
// Step 1c: ctx.locals("rotated") returns LocalRef; use as Expr via implicit conversion.
// Step 1d: will be refined to ctx.locals.rotated via Selectable structural types.
class LocalAccessor:
  def apply(name: String): LocalRef = LocalRef(name)

class LocalRef(val name: String):
  inline def :=(value: Expr): Stmt = Stmt.let(name, value)
  def float: FloatExpr = FloatExpr(name)
  def vec2: Vec2Expr   = Vec2Expr(name)
  def vec3: Vec3Expr   = Vec3Expr(name)
  def vec4: Vec4Expr   = Vec4Expr(name)
  def mat2: Mat2Expr   = Mat2Expr(name)
  def mat3: Mat3Expr   = Mat3Expr(name)
  def mat4: Mat4Expr   = Mat4Expr(name)

// LocalRef is usable as an untyped Expr via implicit conversion
given Conversion[LocalRef, Expr] = ref => Expr.raw(ref.name)

// ---------------------------------------------------------------------------
// ShaderCtx — unified context for vertex and fragment stages
// ---------------------------------------------------------------------------

class ShaderCtx(
    val in: ExprAccessor,
    val out: AssignAccessor,
    val bindings: ExprAccessor,
    val locals: LocalAccessor,
)
