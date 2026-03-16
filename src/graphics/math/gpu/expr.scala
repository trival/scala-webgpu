package graphics.math.gpu

import graphics.math.*
import trivalibs.utils.numbers.NumExt
import trivalibs.utils.numbers.NumOps

// ---------------------------------------------------------------------------
// Expression base class — wraps a WGSL string, toString = wgsl so string
// interpolation works naturally.
// ---------------------------------------------------------------------------

class Expr(val wgsl: String):
  override def toString: String = wgsl

// ---------------------------------------------------------------------------
// Typed expression opaque types — each is Expr at runtime (so Selectable
// asInstanceOf casts are safe), but distinct at compile time (FloatExpr ≠
// Vec2Expr etc.) for type-safe Vec*Base / Mat*Base type class dispatch.
// ---------------------------------------------------------------------------

object Expr:
  def raw(s: String): Expr = new Expr(s)
  def apply(s: String): Expr = new Expr(s)

  opaque type FloatExpr <: Expr = Expr
  object FloatExpr { def apply(s: String): FloatExpr = new Expr(s) }

  opaque type Vec2Expr <: Expr = Expr
  object Vec2Expr { def apply(s: String): Vec2Expr = new Expr(s) }

  opaque type Vec3Expr <: Expr = Expr
  object Vec3Expr { def apply(s: String): Vec3Expr = new Expr(s) }

  opaque type Vec4Expr <: Expr = Expr
  object Vec4Expr { def apply(s: String): Vec4Expr = new Expr(s) }

  opaque type Mat2Expr <: Expr = Expr
  object Mat2Expr { def apply(s: String): Mat2Expr = new Expr(s) }

  opaque type Mat3Expr <: Expr = Expr
  object Mat3Expr { def apply(s: String): Mat3Expr = new Expr(s) }

  opaque type Mat4Expr <: Expr = Expr
  object Mat4Expr { def apply(s: String): Mat4Expr = new Expr(s) }

  opaque type BoolExpr <: Expr = Expr
  object BoolExpr { def apply(s: String): BoolExpr = new Expr(s) }

export Expr.{
  FloatExpr,
  Vec2Expr,
  Vec3Expr,
  Vec4Expr,
  Mat2Expr,
  Mat3Expr,
  Mat4Expr,
  BoolExpr,
}

// ---------------------------------------------------------------------------
// Local variable types — opaque wrappers around LocalExpr, so
// TypedLocalAccessor.selectDynamic returning LocalExpr(name) safely casts
// to any Local* type at runtime.
// ---------------------------------------------------------------------------

class LocalExpr(val name: String) extends Expr(name):
  def :=(value: Expr): Stmt = Stmt.let(name, value)

object LocalExpr:
  def apply(name: String): LocalExpr = new LocalExpr(name)

  opaque type LocalFloat <: LocalExpr = LocalExpr
  object LocalFloat { def apply(s: String): LocalFloat = new LocalExpr(s) }

  opaque type LocalVec2 <: LocalExpr = LocalExpr
  object LocalVec2 { def apply(s: String): LocalVec2 = new LocalExpr(s) }

  opaque type LocalVec3 <: LocalExpr = LocalExpr
  object LocalVec3 { def apply(s: String): LocalVec3 = new LocalExpr(s) }

  opaque type LocalVec4 <: LocalExpr = LocalExpr
  object LocalVec4 { def apply(s: String): LocalVec4 = new LocalExpr(s) }

  opaque type LocalMat2 <: LocalExpr = LocalExpr
  object LocalMat2 { def apply(s: String): LocalMat2 = new LocalExpr(s) }

  opaque type LocalMat3 <: LocalExpr = LocalExpr
  object LocalMat3 { def apply(s: String): LocalMat3 = new LocalExpr(s) }

  opaque type LocalMat4 <: LocalExpr = LocalExpr
  object LocalMat4 { def apply(s: String): LocalMat4 = new LocalExpr(s) }

  opaque type LocalBool <: LocalExpr = LocalExpr
  object LocalBool { def apply(s: String): LocalBool = new LocalExpr(s) }

export LocalExpr.{
  LocalFloat,
  LocalVec2,
  LocalVec3,
  LocalVec4,
  LocalMat2,
  LocalMat3,
  LocalMat4,
  LocalBool,
}

// ---------------------------------------------------------------------------
// Implicit conversions from Local* to *Expr — locals are usable anywhere
// their corresponding expression type is expected.
// ---------------------------------------------------------------------------

given Conversion[LocalFloat, FloatExpr] = l => FloatExpr(l.wgsl)
given Conversion[LocalVec2, Vec2Expr] = l => Vec2Expr(l.wgsl)
given Conversion[LocalVec3, Vec3Expr] = l => Vec3Expr(l.wgsl)
given Conversion[LocalVec4, Vec4Expr] = l => Vec4Expr(l.wgsl)
given Conversion[LocalMat2, Mat2Expr] = l => Mat2Expr(l.wgsl)
given Conversion[LocalMat3, Mat3Expr] = l => Mat3Expr(l.wgsl)
given Conversion[LocalMat4, Mat4Expr] = l => Mat4Expr(l.wgsl)
given Conversion[LocalBool, BoolExpr] = l => BoolExpr(l.wgsl)

// ---------------------------------------------------------------------------
// Implicit conversions from numeric literals
// ---------------------------------------------------------------------------

private def floatToWgsl(v: Double): String =
  val s = v.toString
  if s.contains('.') || s.contains('E') || s.contains('e') then s
  else s + ".0"

given Conversion[Double, FloatExpr] = v => FloatExpr(floatToWgsl(v))
given Conversion[Float, FloatExpr] = v => FloatExpr(floatToWgsl(v.toDouble))
given Conversion[Int, FloatExpr] = v => FloatExpr(s"f32($v)")

// ---------------------------------------------------------------------------
// NumOps / NumExt for FloatExpr and LocalFloat
// ---------------------------------------------------------------------------

given NumOps[FloatExpr]:
  extension (a: FloatExpr)
    def +(b: FloatExpr): FloatExpr = FloatExpr(s"(${a.wgsl} + ${b.wgsl})")
    def -(b: FloatExpr): FloatExpr = FloatExpr(s"(${a.wgsl} - ${b.wgsl})")
    def *(b: FloatExpr): FloatExpr = FloatExpr(s"(${a.wgsl} * ${b.wgsl})")
    def /(b: FloatExpr): FloatExpr = FloatExpr(s"(${a.wgsl} / ${b.wgsl})")
    def unary_- : FloatExpr = FloatExpr(s"(-${a.wgsl})")
  def zero: FloatExpr = FloatExpr("0.0")
  def one: FloatExpr = FloatExpr("1.0")

given NumOps[LocalFloat]:
  extension (a: LocalFloat)
    def +(b: LocalFloat): LocalFloat = LocalFloat(s"(${a.wgsl} + ${b.wgsl})")
    def -(b: LocalFloat): LocalFloat = LocalFloat(s"(${a.wgsl} - ${b.wgsl})")
    def *(b: LocalFloat): LocalFloat = LocalFloat(s"(${a.wgsl} * ${b.wgsl})")
    def /(b: LocalFloat): LocalFloat = LocalFloat(s"(${a.wgsl} / ${b.wgsl})")
    def unary_- : LocalFloat = LocalFloat(s"(-${a.wgsl})")
  def zero: LocalFloat = LocalFloat("0.0")
  def one: LocalFloat = LocalFloat("1.0")

given NumExt[FloatExpr]:
  extension (a: FloatExpr)
    def sqrt: FloatExpr = FloatExpr(s"sqrt(${a.wgsl})")
    def pow(exp: FloatExpr): FloatExpr = FloatExpr(
      s"pow(${a.wgsl}, ${exp.wgsl})",
    )
    def abs: FloatExpr = FloatExpr(s"abs(${a.wgsl})")
    def floor: FloatExpr = FloatExpr(s"floor(${a.wgsl})")
    def ceil: FloatExpr = FloatExpr(s"ceil(${a.wgsl})")
    def sin: FloatExpr = FloatExpr(s"sin(${a.wgsl})")
    def cos: FloatExpr = FloatExpr(s"cos(${a.wgsl})")
    def tan: FloatExpr = FloatExpr(s"tan(${a.wgsl})")
    def asin: FloatExpr = FloatExpr(s"asin(${a.wgsl})")
    def acos: FloatExpr = FloatExpr(s"acos(${a.wgsl})")
    def atan: FloatExpr = FloatExpr(s"atan(${a.wgsl})")
    def atan2(other: FloatExpr): FloatExpr = FloatExpr(
      s"atan2(${a.wgsl}, ${other.wgsl})",
    )
    def clamp(min: FloatExpr, max: FloatExpr): FloatExpr = FloatExpr(
      s"clamp(${a.wgsl}, ${min.wgsl}, ${max.wgsl})",
    )
    def clamp01: FloatExpr = FloatExpr(s"saturate(${a.wgsl})")
    def fit0111: FloatExpr = FloatExpr(s"(${a.wgsl} * 2.0 - 1.0)")
    def fit1101: FloatExpr = FloatExpr(s"(${a.wgsl} * 0.5 + 0.5)")

given NumExt[LocalFloat]:
  extension (a: LocalFloat)
    def sqrt: LocalFloat = LocalFloat(s"sqrt(${a.wgsl})")
    def pow(exp: LocalFloat): LocalFloat = LocalFloat(
      s"pow(${a.wgsl}, ${exp.wgsl})",
    )
    def abs: LocalFloat = LocalFloat(s"abs(${a.wgsl})")
    def floor: LocalFloat = LocalFloat(s"floor(${a.wgsl})")
    def ceil: LocalFloat = LocalFloat(s"ceil(${a.wgsl})")
    def sin: LocalFloat = LocalFloat(s"sin(${a.wgsl})")
    def cos: LocalFloat = LocalFloat(s"cos(${a.wgsl})")
    def tan: LocalFloat = LocalFloat(s"tan(${a.wgsl})")
    def asin: LocalFloat = LocalFloat(s"asin(${a.wgsl})")
    def acos: LocalFloat = LocalFloat(s"acos(${a.wgsl})")
    def atan: LocalFloat = LocalFloat(s"atan(${a.wgsl})")
    def atan2(other: LocalFloat): LocalFloat = LocalFloat(
      s"atan2(${a.wgsl}, ${other.wgsl})",
    )
    def clamp(min: LocalFloat, max: LocalFloat): LocalFloat = LocalFloat(
      s"clamp(${a.wgsl}, ${min.wgsl}, ${max.wgsl})",
    )
    def clamp01: LocalFloat = LocalFloat(s"saturate(${a.wgsl})")
    def fit0111: LocalFloat = LocalFloat(s"(${a.wgsl} * 2.0 - 1.0)")
    def fit1101: LocalFloat = LocalFloat(s"(${a.wgsl} * 0.5 + 0.5)")

// ---------------------------------------------------------------------------
// Vec2Base — for Vec2Expr and LocalVec2 (mirrors CPU: Vec2, StructRef[Vec2Buffer])
// ---------------------------------------------------------------------------

private def vec2BaseInstance[V <: Expr]: Vec2Base[FloatExpr, V] =
  new Vec2Base[FloatExpr, V]:
    extension (v: V)
      def x: FloatExpr = FloatExpr(s"${v.wgsl}.x")
      def y: FloatExpr = FloatExpr(s"${v.wgsl}.y")

given Vec2Base[FloatExpr, Vec2Expr] = vec2BaseInstance[Vec2Expr]
given Vec2Base[FloatExpr, LocalVec2] = vec2BaseInstance[LocalVec2]

given Vec2ImmutableOps[FloatExpr, Vec2Expr]:
  def create(x: FloatExpr, y: FloatExpr): Vec2Expr =
    Vec2Expr(s"vec2<f32>(${x.wgsl}, ${y.wgsl})")

// ---------------------------------------------------------------------------
// Vec3Base — for Vec3Expr and LocalVec3
// ---------------------------------------------------------------------------

private def vec3BaseInstance[V <: Expr]: Vec3Base[FloatExpr, V] =
  new Vec3Base[FloatExpr, V]:
    extension (v: V)
      def x: FloatExpr = FloatExpr(s"${v.wgsl}.x")
      def y: FloatExpr = FloatExpr(s"${v.wgsl}.y")
      def z: FloatExpr = FloatExpr(s"${v.wgsl}.z")

given Vec3Base[FloatExpr, Vec3Expr] = vec3BaseInstance[Vec3Expr]
given Vec3Base[FloatExpr, LocalVec3] = vec3BaseInstance[LocalVec3]

given Vec3ImmutableOps[FloatExpr, Vec3Expr]:
  def create(x: FloatExpr, y: FloatExpr, z: FloatExpr): Vec3Expr =
    Vec3Expr(s"vec3<f32>(${x.wgsl}, ${y.wgsl}, ${z.wgsl})")

// ---------------------------------------------------------------------------
// Vec4Base — for Vec4Expr and LocalVec4
// ---------------------------------------------------------------------------

private def vec4BaseInstance[V <: Expr]: Vec4Base[FloatExpr, V] =
  new Vec4Base[FloatExpr, V]:
    extension (v: V)
      def x: FloatExpr = FloatExpr(s"${v.wgsl}.x")
      def y: FloatExpr = FloatExpr(s"${v.wgsl}.y")
      def z: FloatExpr = FloatExpr(s"${v.wgsl}.z")
      def w: FloatExpr = FloatExpr(s"${v.wgsl}.w")

given Vec4Base[FloatExpr, Vec4Expr] = vec4BaseInstance[Vec4Expr]
given Vec4Base[FloatExpr, LocalVec4] = vec4BaseInstance[LocalVec4]

given Vec4ImmutableOps[FloatExpr, Vec4Expr]:
  def create(x: FloatExpr, y: FloatExpr, z: FloatExpr, w: FloatExpr): Vec4Expr =
    Vec4Expr(s"vec4<f32>(${x.wgsl}, ${y.wgsl}, ${z.wgsl}, ${w.wgsl})")

// ---------------------------------------------------------------------------
// Mat2Base — for Mat2Expr and LocalMat2
// ---------------------------------------------------------------------------

private def mat2BaseInstance[M <: Expr]: Mat2Base[FloatExpr, M] =
  new Mat2Base[FloatExpr, M]:
    extension (m: M)
      def m00: FloatExpr = FloatExpr(s"${m.wgsl}[0][0]")
      def m01: FloatExpr = FloatExpr(s"${m.wgsl}[0][1]")
      def m10: FloatExpr = FloatExpr(s"${m.wgsl}[1][0]")
      def m11: FloatExpr = FloatExpr(s"${m.wgsl}[1][1]")

given Mat2Base[FloatExpr, Mat2Expr] = mat2BaseInstance[Mat2Expr]
given Mat2Base[FloatExpr, LocalMat2] = mat2BaseInstance[LocalMat2]

given Mat2ImmutableOps[FloatExpr, Mat2Expr]:
  def create(
      m00: FloatExpr,
      m01: FloatExpr,
      m10: FloatExpr,
      m11: FloatExpr,
  ): Mat2Expr =
    Mat2Expr(s"mat2x2<f32>(${m00.wgsl}, ${m01.wgsl}, ${m10.wgsl}, ${m11.wgsl})")

// ---------------------------------------------------------------------------
// Mat3Base — for Mat3Expr and LocalMat3
// ---------------------------------------------------------------------------

private def mat3BaseInstance[M <: Expr]: Mat3Base[FloatExpr, M] =
  new Mat3Base[FloatExpr, M]:
    extension (m: M)
      def m00: FloatExpr = FloatExpr(s"${m.wgsl}[0][0]")
      def m01: FloatExpr = FloatExpr(s"${m.wgsl}[0][1]")
      def m02: FloatExpr = FloatExpr(s"${m.wgsl}[0][2]")
      def m10: FloatExpr = FloatExpr(s"${m.wgsl}[1][0]")
      def m11: FloatExpr = FloatExpr(s"${m.wgsl}[1][1]")
      def m12: FloatExpr = FloatExpr(s"${m.wgsl}[1][2]")
      def m20: FloatExpr = FloatExpr(s"${m.wgsl}[2][0]")
      def m21: FloatExpr = FloatExpr(s"${m.wgsl}[2][1]")
      def m22: FloatExpr = FloatExpr(s"${m.wgsl}[2][2]")

given Mat3Base[FloatExpr, Mat3Expr] = mat3BaseInstance[Mat3Expr]
given Mat3Base[FloatExpr, LocalMat3] = mat3BaseInstance[LocalMat3]

given Mat3ImmutableOps[FloatExpr, Mat3Expr]:
  def create(
      m00: FloatExpr,
      m01: FloatExpr,
      m02: FloatExpr,
      m10: FloatExpr,
      m11: FloatExpr,
      m12: FloatExpr,
      m20: FloatExpr,
      m21: FloatExpr,
      m22: FloatExpr,
  ): Mat3Expr =
    Mat3Expr(
      s"mat3x3<f32>(${m00.wgsl}, ${m01.wgsl}, ${m02.wgsl}, ${m10.wgsl}, ${m11.wgsl}, ${m12.wgsl}, ${m20.wgsl}, ${m21.wgsl}, ${m22.wgsl})",
    )

// ---------------------------------------------------------------------------
// Mat4Base — for Mat4Expr and LocalMat4
// ---------------------------------------------------------------------------

private def mat4BaseInstance[M <: Expr]: Mat4Base[FloatExpr, M] =
  new Mat4Base[FloatExpr, M]:
    extension (m: M)
      def m00: FloatExpr = FloatExpr(s"${m.wgsl}[0][0]");
      def m01: FloatExpr = FloatExpr(s"${m.wgsl}[0][1]")
      def m02: FloatExpr = FloatExpr(s"${m.wgsl}[0][2]");
      def m03: FloatExpr = FloatExpr(s"${m.wgsl}[0][3]")
      def m10: FloatExpr = FloatExpr(s"${m.wgsl}[1][0]");
      def m11: FloatExpr = FloatExpr(s"${m.wgsl}[1][1]")
      def m12: FloatExpr = FloatExpr(s"${m.wgsl}[1][2]");
      def m13: FloatExpr = FloatExpr(s"${m.wgsl}[1][3]")
      def m20: FloatExpr = FloatExpr(s"${m.wgsl}[2][0]");
      def m21: FloatExpr = FloatExpr(s"${m.wgsl}[2][1]")
      def m22: FloatExpr = FloatExpr(s"${m.wgsl}[2][2]");
      def m23: FloatExpr = FloatExpr(s"${m.wgsl}[2][3]")
      def m30: FloatExpr = FloatExpr(s"${m.wgsl}[3][0]");
      def m31: FloatExpr = FloatExpr(s"${m.wgsl}[3][1]")
      def m32: FloatExpr = FloatExpr(s"${m.wgsl}[3][2]");
      def m33: FloatExpr = FloatExpr(s"${m.wgsl}[3][3]")

given Mat4Base[FloatExpr, Mat4Expr] = mat4BaseInstance[Mat4Expr]
given Mat4Base[FloatExpr, LocalMat4] = mat4BaseInstance[LocalMat4]

// format: off
given Mat4ImmutableOps[FloatExpr, Mat4Expr]:
  def create(
      m00: FloatExpr, m01: FloatExpr, m02: FloatExpr, m03: FloatExpr,
      m10: FloatExpr, m11: FloatExpr, m12: FloatExpr, m13: FloatExpr,
      m20: FloatExpr, m21: FloatExpr, m22: FloatExpr, m23: FloatExpr,
      m30: FloatExpr, m31: FloatExpr, m32: FloatExpr, m33: FloatExpr,
  ): Mat4Expr =
    Mat4Expr(s"mat4x4<f32>(${m00.wgsl}, ${m01.wgsl}, ${m02.wgsl}, ${m03.wgsl}, ${m10.wgsl}, ${m11.wgsl}, ${m12.wgsl}, ${m13.wgsl}, ${m20.wgsl}, ${m21.wgsl}, ${m22.wgsl}, ${m23.wgsl}, ${m30.wgsl}, ${m31.wgsl}, ${m32.wgsl}, ${m33.wgsl})")
// format: on

// ---------------------------------------------------------------------------
// Vector constructors (lowercase, matching WGSL syntax)
// ---------------------------------------------------------------------------

object vec2:
  def apply(x: FloatExpr, y: FloatExpr): Vec2Expr =
    Vec2Expr(s"vec2<f32>(${x.wgsl}, ${y.wgsl})")

object vec3:
  def apply(x: FloatExpr, y: FloatExpr, z: FloatExpr): Vec3Expr =
    Vec3Expr(s"vec3<f32>(${x.wgsl}, ${y.wgsl}, ${z.wgsl})")

object vec4:
  def apply(x: FloatExpr, y: FloatExpr, z: FloatExpr, w: FloatExpr): Vec4Expr =
    Vec4Expr(s"vec4<f32>(${x.wgsl}, ${y.wgsl}, ${z.wgsl}, ${w.wgsl})")
  def apply(xyz: Vec3Expr, w: FloatExpr): Vec4Expr =
    Vec4Expr(s"vec4<f32>(${xyz.wgsl}, ${w.wgsl})")
  def apply(xy: Vec2Expr, z: FloatExpr, w: FloatExpr): Vec4Expr =
    Vec4Expr(s"vec4<f32>(${xy.wgsl}, ${z.wgsl}, ${w.wgsl})")

// ---------------------------------------------------------------------------
// Stmt and Block opaque types
// ---------------------------------------------------------------------------

opaque type Stmt = String
opaque type Block = String

object Stmt:
  inline def assign(target: String, value: Expr): Stmt =
    s"  $target = ${value.wgsl};"
  inline def let(name: String, value: Expr): Stmt =
    s"  let $name = ${value.wgsl};"
  inline def varDecl(name: String, value: Expr): Stmt =
    s"  var $name = ${value.wgsl};"
  inline def varDeclTyped(name: String, wgslType: String, value: Expr): Stmt =
    s"  var $name: $wgslType = ${value.wgsl};"
  inline def varAssign(name: String, value: Expr): Stmt =
    s"  $name = ${value.wgsl};"
  inline def raw(s: String): Stmt = s

given Conversion[Stmt, Block] = s => s

object Block:
  def apply(stmts: Stmt*): Block = stmts.mkString("\n")
  def empty: Block = ""
  def unwrap(b: Block): String = b.asInstanceOf[String]
