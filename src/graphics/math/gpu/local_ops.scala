package graphics.math.gpu

// ---------------------------------------------------------------------------
// WGSL-native arithmetic for *Expr types.
//
// These extensions shadow the Vec*ImmutableOps trait defaults (which expand
// component-wise) and emit compact native WGSL operators instead.
//
// Local* arithmetic is handled by implicit conversions to *Expr in expr.scala,
// so only *Expr extensions are needed here.
// ---------------------------------------------------------------------------

// --- Matrix-vector multiplication -----------------------------------------

extension (m: Mat2Expr)
  @scala.annotation.targetName("mat2MulVec2")
  def *(v: Vec2Expr): Vec2Expr = Vec2Expr(s"(${m.wgsl} * ${v.wgsl})")

extension (m: Mat3Expr)
  @scala.annotation.targetName("mat3MulVec3")
  def *(v: Vec3Expr): Vec3Expr = Vec3Expr(s"(${m.wgsl} * ${v.wgsl})")

extension (m: Mat4Expr)
  @scala.annotation.targetName("mat4MulVec4")
  def *(v: Vec4Expr): Vec4Expr = Vec4Expr(s"(${m.wgsl} * ${v.wgsl})")

// --- Vec2Expr arithmetic ---------------------------------------------------

extension (v: Vec2Expr)
  @scala.annotation.targetName("vec2AddVec2")
  def +(other: Vec2Expr): Vec2Expr = Vec2Expr(s"(${v.wgsl} + ${other.wgsl})")
  @scala.annotation.targetName("vec2SubVec2")
  def -(other: Vec2Expr): Vec2Expr = Vec2Expr(s"(${v.wgsl} - ${other.wgsl})")
  @scala.annotation.targetName("vec2MulVec2")
  def *(other: Vec2Expr): Vec2Expr = Vec2Expr(s"(${v.wgsl} * ${other.wgsl})")
  @scala.annotation.targetName("vec2DivVec2")
  def /(other: Vec2Expr): Vec2Expr = Vec2Expr(s"(${v.wgsl} / ${other.wgsl})")
  @scala.annotation.targetName("vec2AddScalar")
  def +(s: FloatExpr): Vec2Expr = Vec2Expr(s"(${v.wgsl} + ${s.wgsl})")
  @scala.annotation.targetName("vec2SubScalar")
  def -(s: FloatExpr): Vec2Expr = Vec2Expr(s"(${v.wgsl} - ${s.wgsl})")
  @scala.annotation.targetName("vec2MulScalar")
  def *(s: FloatExpr): Vec2Expr = Vec2Expr(s"(${v.wgsl} * ${s.wgsl})")
  @scala.annotation.targetName("vec2DivScalar")
  def /(s: FloatExpr): Vec2Expr = Vec2Expr(s"(${v.wgsl} / ${s.wgsl})")

// --- Vec3Expr arithmetic ---------------------------------------------------

extension (v: Vec3Expr)
  @scala.annotation.targetName("vec3AddVec3")
  def +(other: Vec3Expr): Vec3Expr = Vec3Expr(s"(${v.wgsl} + ${other.wgsl})")
  @scala.annotation.targetName("vec3SubVec3")
  def -(other: Vec3Expr): Vec3Expr = Vec3Expr(s"(${v.wgsl} - ${other.wgsl})")
  @scala.annotation.targetName("vec3MulVec3")
  def *(other: Vec3Expr): Vec3Expr = Vec3Expr(s"(${v.wgsl} * ${other.wgsl})")
  @scala.annotation.targetName("vec3DivVec3")
  def /(other: Vec3Expr): Vec3Expr = Vec3Expr(s"(${v.wgsl} / ${other.wgsl})")
  @scala.annotation.targetName("vec3AddScalar")
  def +(s: FloatExpr): Vec3Expr = Vec3Expr(s"(${v.wgsl} + ${s.wgsl})")
  @scala.annotation.targetName("vec3SubScalar")
  def -(s: FloatExpr): Vec3Expr = Vec3Expr(s"(${v.wgsl} - ${s.wgsl})")
  @scala.annotation.targetName("vec3MulScalar")
  def *(s: FloatExpr): Vec3Expr = Vec3Expr(s"(${v.wgsl} * ${s.wgsl})")
  @scala.annotation.targetName("vec3DivScalar")
  def /(s: FloatExpr): Vec3Expr = Vec3Expr(s"(${v.wgsl} / ${s.wgsl})")

// --- Vec4Expr arithmetic ---------------------------------------------------

extension (v: Vec4Expr)
  @scala.annotation.targetName("vec4AddVec4")
  def +(other: Vec4Expr): Vec4Expr = Vec4Expr(s"(${v.wgsl} + ${other.wgsl})")
  @scala.annotation.targetName("vec4SubVec4")
  def -(other: Vec4Expr): Vec4Expr = Vec4Expr(s"(${v.wgsl} - ${other.wgsl})")
  @scala.annotation.targetName("vec4MulVec4")
  def *(other: Vec4Expr): Vec4Expr = Vec4Expr(s"(${v.wgsl} * ${other.wgsl})")
  @scala.annotation.targetName("vec4DivVec4")
  def /(other: Vec4Expr): Vec4Expr = Vec4Expr(s"(${v.wgsl} / ${other.wgsl})")
  @scala.annotation.targetName("vec4AddScalar")
  def +(s: FloatExpr): Vec4Expr = Vec4Expr(s"(${v.wgsl} + ${s.wgsl})")
  @scala.annotation.targetName("vec4SubScalar")
  def -(s: FloatExpr): Vec4Expr = Vec4Expr(s"(${v.wgsl} - ${s.wgsl})")
  @scala.annotation.targetName("vec4MulScalar")
  def *(s: FloatExpr): Vec4Expr = Vec4Expr(s"(${v.wgsl} * ${s.wgsl})")
  @scala.annotation.targetName("vec4DivScalar")
  def /(s: FloatExpr): Vec4Expr = Vec4Expr(s"(${v.wgsl} / ${s.wgsl})")
