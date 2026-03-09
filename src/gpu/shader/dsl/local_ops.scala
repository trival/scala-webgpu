package gpu.shader.dsl

// ---------------------------------------------------------------------------
// WGSL-native operations for *Expr types.
//
// MUST live in a separate file from expr.scala so that the opaque types remain
// opaque.  Inside expr.scala every *Expr = String, so `+` resolves to
// String concatenation and `inline def *` on traits expand component-wise.
// Here the opaque boundary is intact and we generate compact WGSL operators.
// ---------------------------------------------------------------------------

// --- Matrix-vector multiplication (native WGSL `*`) -----------------------

extension (m: Mat2Expr)
  @scala.annotation.targetName("mat2MulVec2")
  inline def *(v: Vec2Expr): Vec2Expr = Vec2Expr.matMul(m, v)

extension (m: Mat3Expr)
  @scala.annotation.targetName("mat3MulVec3")
  inline def *(v: Vec3Expr): Vec3Expr = Vec3Expr.matMul(m, v)

extension (m: Mat4Expr)
  @scala.annotation.targetName("mat4MulVec4")
  inline def *(v: Vec4Expr): Vec4Expr = Vec4Expr.matMul(m, v)

// --- Vec2Expr native arithmetic -------------------------------------------
// These shadow the Vec2ImmutableOps trait extensions, generating compact WGSL
// like `(a + b)` instead of component-wise `vec2<f32>(a.x + b.x, a.y + b.y)`.
// LocalVec2 <: Vec2Expr so these apply to locals too.

extension (v: Vec2Expr)
  @scala.annotation.targetName("vec2AddVec")
  inline def +(other: Vec2Expr): Vec2Expr = Vec2Expr.binop(v, "+", other)
  @scala.annotation.targetName("vec2SubVec")
  inline def -(other: Vec2Expr): Vec2Expr = Vec2Expr.binop(v, "-", other)
  @scala.annotation.targetName("vec2MulVec")
  inline def *(other: Vec2Expr): Vec2Expr = Vec2Expr.binop(v, "*", other)
  @scala.annotation.targetName("vec2DivVec")
  inline def /(other: Vec2Expr): Vec2Expr = Vec2Expr.binop(v, "/", other)
  @scala.annotation.targetName("vec2AddScalar")
  inline def +(scalar: FloatExpr): Vec2Expr = Vec2Expr.scalarOp(v, "+", scalar)
  @scala.annotation.targetName("vec2SubScalar")
  inline def -(scalar: FloatExpr): Vec2Expr = Vec2Expr.scalarOp(v, "-", scalar)
  @scala.annotation.targetName("vec2MulScalar")
  inline def *(scalar: FloatExpr): Vec2Expr = Vec2Expr.scalarOp(v, "*", scalar)
  @scala.annotation.targetName("vec2DivScalar")
  inline def /(scalar: FloatExpr): Vec2Expr = Vec2Expr.scalarOp(v, "/", scalar)

// --- Vec3Expr native arithmetic -------------------------------------------

extension (v: Vec3Expr)
  @scala.annotation.targetName("vec3AddVec")
  inline def +(other: Vec3Expr): Vec3Expr = Vec3Expr.binop(v, "+", other)
  @scala.annotation.targetName("vec3SubVec")
  inline def -(other: Vec3Expr): Vec3Expr = Vec3Expr.binop(v, "-", other)
  @scala.annotation.targetName("vec3MulVec")
  inline def *(other: Vec3Expr): Vec3Expr = Vec3Expr.binop(v, "*", other)
  @scala.annotation.targetName("vec3DivVec")
  inline def /(other: Vec3Expr): Vec3Expr = Vec3Expr.binop(v, "/", other)
  @scala.annotation.targetName("vec3AddScalar")
  inline def +(scalar: FloatExpr): Vec3Expr = Vec3Expr.scalarOp(v, "+", scalar)
  @scala.annotation.targetName("vec3SubScalar")
  inline def -(scalar: FloatExpr): Vec3Expr = Vec3Expr.scalarOp(v, "-", scalar)
  @scala.annotation.targetName("vec3MulScalar")
  inline def *(scalar: FloatExpr): Vec3Expr = Vec3Expr.scalarOp(v, "*", scalar)
  @scala.annotation.targetName("vec3DivScalar")
  inline def /(scalar: FloatExpr): Vec3Expr = Vec3Expr.scalarOp(v, "/", scalar)

// --- Vec4Expr native arithmetic -------------------------------------------

extension (v: Vec4Expr)
  @scala.annotation.targetName("vec4AddVec")
  inline def +(other: Vec4Expr): Vec4Expr = Vec4Expr.binop(v, "+", other)
  @scala.annotation.targetName("vec4SubVec")
  inline def -(other: Vec4Expr): Vec4Expr = Vec4Expr.binop(v, "-", other)
  @scala.annotation.targetName("vec4MulVec")
  inline def *(other: Vec4Expr): Vec4Expr = Vec4Expr.binop(v, "*", other)
  @scala.annotation.targetName("vec4DivVec")
  inline def /(other: Vec4Expr): Vec4Expr = Vec4Expr.binop(v, "/", other)
  @scala.annotation.targetName("vec4AddScalar")
  inline def +(scalar: FloatExpr): Vec4Expr = Vec4Expr.scalarOp(v, "+", scalar)
  @scala.annotation.targetName("vec4SubScalar")
  inline def -(scalar: FloatExpr): Vec4Expr = Vec4Expr.scalarOp(v, "-", scalar)
  @scala.annotation.targetName("vec4MulScalar")
  inline def *(scalar: FloatExpr): Vec4Expr = Vec4Expr.scalarOp(v, "*", scalar)
  @scala.annotation.targetName("vec4DivScalar")
  inline def /(scalar: FloatExpr): Vec4Expr = Vec4Expr.scalarOp(v, "/", scalar)

// --- LocalFloat forwarding ------------------------------------------------
// FloatExpr arithmetic is defined via NumOps[FloatExpr] given in expr.scala.
// Those extensions work inside expr.scala (where FloatExpr = String) but the
// NumOps `+` there is fine because it uses string interpolation, not `String.+`.
// LocalFloat <: FloatExpr, but the NumOps extension uses a type parameter
// (`extension (a: A)` where A = FloatExpr), so LocalFloat doesn't match directly.

extension (v: LocalFloat)
  @scala.annotation.targetName("localFloatAdd")
  inline def +(other: FloatExpr): FloatExpr = (v: FloatExpr) + other
  @scala.annotation.targetName("localFloatSub")
  inline def -(other: FloatExpr): FloatExpr = (v: FloatExpr) - other
  @scala.annotation.targetName("localFloatMul")
  inline def *(other: FloatExpr): FloatExpr = (v: FloatExpr) * other
  @scala.annotation.targetName("localFloatDiv")
  inline def /(other: FloatExpr): FloatExpr = (v: FloatExpr) / other
