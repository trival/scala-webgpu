package gpu.shader.dsl

// ---------------------------------------------------------------------------
// WGSL-native operations for *Expr types.
//
// MUST live in a separate file from expr.scala so that the opaque types remain
// opaque.  Inside expr.scala every *Expr = String, so `+` resolves to
// String concatenation and `inline def *` on traits expand component-wise.
// Here the opaque boundary is intact and we generate compact WGSL operators.
//
// NOTE: These must NOT be `inline` — inlining would expose the opaque types
// as String at the call site, breaking type safety across the opaque boundary.
// ---------------------------------------------------------------------------

// --- Matrix-vector multiplication (native WGSL `*`) -----------------------

extension (m: Mat2Expr)
  @scala.annotation.targetName("mat2MulVec2")
  def *(v: Vec2Expr): Vec2Expr = Vec2Expr.matMul(m, v)

extension (m: Mat3Expr)
  @scala.annotation.targetName("mat3MulVec3")
  def *(v: Vec3Expr): Vec3Expr = Vec3Expr.matMul(m, v)

extension (m: Mat4Expr)
  @scala.annotation.targetName("mat4MulVec4")
  def *(v: Vec4Expr): Vec4Expr = Vec4Expr.matMul(m, v)

// --- Vec2Expr native arithmetic -------------------------------------------
// These shadow the Vec2ImmutableOps trait extensions, generating compact WGSL
// like `(a + b)` instead of component-wise `vec2<f32>(a.x + b.x, a.y + b.y)`.
// LocalVec2 <: Vec2Expr so these apply to locals too.

extension (v: Vec2Expr)
  @scala.annotation.targetName("vec2AddVec")
  def +(other: Vec2Expr): Vec2Expr = Vec2Expr.binop(v, "+", other)
  @scala.annotation.targetName("vec2SubVec")
  def -(other: Vec2Expr): Vec2Expr = Vec2Expr.binop(v, "-", other)
  @scala.annotation.targetName("vec2MulVec")
  def *(other: Vec2Expr): Vec2Expr = Vec2Expr.binop(v, "*", other)
  @scala.annotation.targetName("vec2DivVec")
  def /(other: Vec2Expr): Vec2Expr = Vec2Expr.binop(v, "/", other)
  @scala.annotation.targetName("vec2AddScalar")
  def +(scalar: FloatExpr): Vec2Expr = Vec2Expr.scalarOp(v, "+", scalar)
  @scala.annotation.targetName("vec2SubScalar")
  def -(scalar: FloatExpr): Vec2Expr = Vec2Expr.scalarOp(v, "-", scalar)
  @scala.annotation.targetName("vec2MulScalar")
  def *(scalar: FloatExpr): Vec2Expr = Vec2Expr.scalarOp(v, "*", scalar)
  @scala.annotation.targetName("vec2DivScalar")
  def /(scalar: FloatExpr): Vec2Expr = Vec2Expr.scalarOp(v, "/", scalar)

// --- Vec3Expr native arithmetic -------------------------------------------

extension (v: Vec3Expr)
  @scala.annotation.targetName("vec3AddVec")
  def +(other: Vec3Expr): Vec3Expr = Vec3Expr.binop(v, "+", other)
  @scala.annotation.targetName("vec3SubVec")
  def -(other: Vec3Expr): Vec3Expr = Vec3Expr.binop(v, "-", other)
  @scala.annotation.targetName("vec3MulVec")
  def *(other: Vec3Expr): Vec3Expr = Vec3Expr.binop(v, "*", other)
  @scala.annotation.targetName("vec3DivVec")
  def /(other: Vec3Expr): Vec3Expr = Vec3Expr.binop(v, "/", other)
  @scala.annotation.targetName("vec3AddScalar")
  def +(scalar: FloatExpr): Vec3Expr = Vec3Expr.scalarOp(v, "+", scalar)
  @scala.annotation.targetName("vec3SubScalar")
  def -(scalar: FloatExpr): Vec3Expr = Vec3Expr.scalarOp(v, "-", scalar)
  @scala.annotation.targetName("vec3MulScalar")
  def *(scalar: FloatExpr): Vec3Expr = Vec3Expr.scalarOp(v, "*", scalar)
  @scala.annotation.targetName("vec3DivScalar")
  def /(scalar: FloatExpr): Vec3Expr = Vec3Expr.scalarOp(v, "/", scalar)

// --- Vec4Expr native arithmetic -------------------------------------------

extension (v: Vec4Expr)
  @scala.annotation.targetName("vec4AddVec")
  def +(other: Vec4Expr): Vec4Expr = Vec4Expr.binop(v, "+", other)
  @scala.annotation.targetName("vec4SubVec")
  def -(other: Vec4Expr): Vec4Expr = Vec4Expr.binop(v, "-", other)
  @scala.annotation.targetName("vec4MulVec")
  def *(other: Vec4Expr): Vec4Expr = Vec4Expr.binop(v, "*", other)
  @scala.annotation.targetName("vec4DivVec")
  def /(other: Vec4Expr): Vec4Expr = Vec4Expr.binop(v, "/", other)
  @scala.annotation.targetName("vec4AddScalar")
  def +(scalar: FloatExpr): Vec4Expr = Vec4Expr.scalarOp(v, "+", scalar)
  @scala.annotation.targetName("vec4SubScalar")
  def -(scalar: FloatExpr): Vec4Expr = Vec4Expr.scalarOp(v, "-", scalar)
  @scala.annotation.targetName("vec4MulScalar")
  def *(scalar: FloatExpr): Vec4Expr = Vec4Expr.scalarOp(v, "*", scalar)
  @scala.annotation.targetName("vec4DivScalar")
  def /(scalar: FloatExpr): Vec4Expr = Vec4Expr.scalarOp(v, "/", scalar)

// --- LocalFloat forwarding ------------------------------------------------
// FloatExpr arithmetic is defined via NumOps[FloatExpr] given in expr.scala.
// LocalFloat <: FloatExpr, but the NumOps extension uses a type parameter
// (`extension (a: A)` where A = FloatExpr), so LocalFloat doesn't match directly.

extension (v: LocalFloat)
  @scala.annotation.targetName("localFloatAdd")
  def +(other: FloatExpr): FloatExpr = (v: FloatExpr) + other
  @scala.annotation.targetName("localFloatSub")
  def -(other: FloatExpr): FloatExpr = (v: FloatExpr) - other
  @scala.annotation.targetName("localFloatMul")
  def *(other: FloatExpr): FloatExpr = (v: FloatExpr) * other
  @scala.annotation.targetName("localFloatDiv")
  def /(other: FloatExpr): FloatExpr = (v: FloatExpr) / other
