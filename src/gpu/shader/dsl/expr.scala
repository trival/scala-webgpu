package gpu.shader.dsl

import gpu.math.*
import trivalibs.utils.numbers.{NumExt, NumOps}

// ---------------------------------------------------------------------------
// Opaque expression types — each wraps a WGSL expression string at runtime,
// providing compile-time type safety at zero cost.
// ---------------------------------------------------------------------------

opaque type Expr      = String
opaque type FloatExpr <: Expr = String
opaque type Vec2Expr  <: Expr = String
opaque type Vec3Expr  <: Expr = String
opaque type Vec4Expr  <: Expr = String
opaque type Mat2Expr  <: Expr = String
opaque type Mat3Expr  <: Expr = String
opaque type Mat4Expr  <: Expr = String
opaque type BoolExpr  <: Expr = String

// ---------------------------------------------------------------------------
// Local variable opaque types — each <: both its Expr type AND LocalExpr,
// so all math operations are available natively, plus `:=` for let-binding.
// ---------------------------------------------------------------------------

opaque type LocalExpr  <: Expr                   = String
opaque type LocalFloat <: FloatExpr & LocalExpr  = String
opaque type LocalVec2  <: Vec2Expr & LocalExpr   = String
opaque type LocalVec3  <: Vec3Expr & LocalExpr   = String
opaque type LocalVec4  <: Vec4Expr & LocalExpr   = String
opaque type LocalMat2  <: Mat2Expr & LocalExpr   = String
opaque type LocalMat3  <: Mat3Expr & LocalExpr   = String
opaque type LocalMat4  <: Mat4Expr & LocalExpr   = String
opaque type LocalBool  <: BoolExpr & LocalExpr   = String

object LocalExpr:
  inline def apply(name: String): LocalExpr = name

  extension (local: LocalExpr)
    inline def :=(value: Expr): Stmt = Stmt.let(local, value)


object Expr:
  inline def raw(s: String): Expr = s

object FloatExpr:
  inline def apply(s: String): FloatExpr = s

object Vec2Expr:
  inline def apply(s: String): Vec2Expr = s
  inline def matMul(m: Mat2Expr, v: Vec2Expr): Vec2Expr = s"($m * $v)"
  inline def binop(a: Vec2Expr, op: String, b: Vec2Expr): Vec2Expr = s"($a $op $b)"
  inline def scalarOp(v: Vec2Expr, op: String, s: FloatExpr): Vec2Expr =
    Vec2Expr(s"($v $op $s)")

object Vec3Expr:
  inline def apply(s: String): Vec3Expr = s
  inline def matMul(m: Mat3Expr, v: Vec3Expr): Vec3Expr = s"($m * $v)"
  inline def binop(a: Vec3Expr, op: String, b: Vec3Expr): Vec3Expr = s"($a $op $b)"
  inline def scalarOp(v: Vec3Expr, op: String, s: FloatExpr): Vec3Expr =
    Vec3Expr(s"($v $op $s)")

object Vec4Expr:
  inline def apply(s: String): Vec4Expr = s
  inline def matMul(m: Mat4Expr, v: Vec4Expr): Vec4Expr = s"($m * $v)"
  inline def binop(a: Vec4Expr, op: String, b: Vec4Expr): Vec4Expr = s"($a $op $b)"
  inline def scalarOp(v: Vec4Expr, op: String, s: FloatExpr): Vec4Expr =
    Vec4Expr(s"($v $op $s)")

object Mat2Expr:
  inline def apply(s: String): Mat2Expr = s

object Mat3Expr:
  inline def apply(s: String): Mat3Expr = s

object Mat4Expr:
  inline def apply(s: String): Mat4Expr = s

object BoolExpr:
  inline def apply(s: String): BoolExpr = s

// ---------------------------------------------------------------------------
// Implicit conversions from numeric literals
// ---------------------------------------------------------------------------

given Conversion[Double, FloatExpr] = v => FloatExpr(v.toString)
given Conversion[Float, FloatExpr]  = v => FloatExpr(v.toString)
given Conversion[Int, FloatExpr]    = v => FloatExpr(s"f32($v)")

// ---------------------------------------------------------------------------
// NumOps[FloatExpr] — arithmetic and zero/one
// ---------------------------------------------------------------------------

given NumOps[FloatExpr] with
  extension (a: FloatExpr)
    def +(b: FloatExpr): FloatExpr = s"($a + $b)"
    def -(b: FloatExpr): FloatExpr = s"($a - $b)"
    def *(b: FloatExpr): FloatExpr = s"($a * $b)"
    def /(b: FloatExpr): FloatExpr = s"($a / $b)"
    def unary_- : FloatExpr        = s"(-$a)"
  def zero: FloatExpr = "0.0"
  def one: FloatExpr  = "1.0"

// ---------------------------------------------------------------------------
// NumExt[FloatExpr] — scalar math built-ins
// ---------------------------------------------------------------------------

given NumExt[FloatExpr] with
  extension (a: FloatExpr)
    def sqrt: FloatExpr                                = s"sqrt($a)"
    def pow(e: FloatExpr): FloatExpr                   = s"pow($a, $e)"
    def abs: FloatExpr                                 = s"abs($a)"
    def floor: FloatExpr                               = s"floor($a)"
    def ceil: FloatExpr                                = s"ceil($a)"
    def sin: FloatExpr                                 = s"sin($a)"
    def cos: FloatExpr                                 = s"cos($a)"
    def tan: FloatExpr                                 = s"tan($a)"
    def asin: FloatExpr                                = s"asin($a)"
    def acos: FloatExpr                                = s"acos($a)"
    def atan: FloatExpr                                = s"atan($a)"
    def atan2(b: FloatExpr): FloatExpr                 = s"atan2($a, $b)"
    def clamp(lo: FloatExpr, hi: FloatExpr): FloatExpr = s"clamp($a, $lo, $hi)"
    def clamp01: FloatExpr                             = s"saturate($a)"
    def fit0111: FloatExpr                             = s"($a * 2.0 - 1.0)"
    def fit1101: FloatExpr                             = s"($a * 0.5 + 0.5)"

// ---------------------------------------------------------------------------
// Vec2Expr — Vec2Base + Vec2ImmutableOps trait instances
// Only abstract members are implemented; trait inline defaults do the rest.
// ---------------------------------------------------------------------------

given Vec2Base[FloatExpr, Vec2Expr] with
  extension (v: Vec2Expr)
    def x: FloatExpr = s"$v.x"
    def y: FloatExpr = s"$v.y"

given Vec2ImmutableOps[FloatExpr, Vec2Expr] with
  def create(x: FloatExpr, y: FloatExpr): Vec2Expr = Vec2Expr(s"vec2<f32>($x, $y)")

// ---------------------------------------------------------------------------
// Vec3Expr — Vec3Base + Vec3ImmutableOps trait instances
// ---------------------------------------------------------------------------

given Vec3Base[FloatExpr, Vec3Expr] with
  extension (v: Vec3Expr)
    def x: FloatExpr = s"$v.x"
    def y: FloatExpr = s"$v.y"
    def z: FloatExpr = s"$v.z"

given Vec3ImmutableOps[FloatExpr, Vec3Expr] with
  def create(x: FloatExpr, y: FloatExpr, z: FloatExpr): Vec3Expr =
    Vec3Expr(s"vec3<f32>($x, $y, $z)")

// ---------------------------------------------------------------------------
// Vec4Expr — Vec4Base + Vec4ImmutableOps trait instances
// ---------------------------------------------------------------------------

given Vec4Base[FloatExpr, Vec4Expr] with
  extension (v: Vec4Expr)
    def x: FloatExpr = s"$v.x"
    def y: FloatExpr = s"$v.y"
    def z: FloatExpr = s"$v.z"
    def w: FloatExpr = s"$v.w"

given Vec4ImmutableOps[FloatExpr, Vec4Expr] with
  def create(x: FloatExpr, y: FloatExpr, z: FloatExpr, w: FloatExpr): Vec4Expr =
    Vec4Expr(s"vec4<f32>($x, $y, $z, $w)")

// ---------------------------------------------------------------------------
// Mat2Expr — Mat2Base + Mat2ImmutableOps trait instances
// ---------------------------------------------------------------------------

given Mat2Base[FloatExpr, Mat2Expr] with
  extension (m: Mat2Expr)
    def m00: FloatExpr = s"$m[0][0]"
    def m01: FloatExpr = s"$m[0][1]"
    def m10: FloatExpr = s"$m[1][0]"
    def m11: FloatExpr = s"$m[1][1]"

given Mat2ImmutableOps[FloatExpr, Mat2Expr] with
  def create(m00: FloatExpr, m01: FloatExpr, m10: FloatExpr, m11: FloatExpr): Mat2Expr =
    Mat2Expr(s"mat2x2<f32>($m00, $m01, $m10, $m11)")


// ---------------------------------------------------------------------------
// Mat3Expr — Mat3Base + Mat3ImmutableOps trait instances
// ---------------------------------------------------------------------------

given Mat3Base[FloatExpr, Mat3Expr] with
  extension (m: Mat3Expr)
    def m00: FloatExpr = s"$m[0][0]"
    def m01: FloatExpr = s"$m[0][1]"
    def m02: FloatExpr = s"$m[0][2]"
    def m10: FloatExpr = s"$m[1][0]"
    def m11: FloatExpr = s"$m[1][1]"
    def m12: FloatExpr = s"$m[1][2]"
    def m20: FloatExpr = s"$m[2][0]"
    def m21: FloatExpr = s"$m[2][1]"
    def m22: FloatExpr = s"$m[2][2]"

given Mat3ImmutableOps[FloatExpr, Mat3Expr] with
  def create(
      m00: FloatExpr, m01: FloatExpr, m02: FloatExpr,
      m10: FloatExpr, m11: FloatExpr, m12: FloatExpr,
      m20: FloatExpr, m21: FloatExpr, m22: FloatExpr,
  ): Mat3Expr =
    Mat3Expr(s"mat3x3<f32>($m00, $m01, $m02, $m10, $m11, $m12, $m20, $m21, $m22)")


// ---------------------------------------------------------------------------
// Mat4Expr — Mat4Base + Mat4ImmutableOps trait instances
// ---------------------------------------------------------------------------

given Mat4Base[FloatExpr, Mat4Expr] with
  extension (m: Mat4Expr)
    def m00: FloatExpr = s"$m[0][0]"; def m01: FloatExpr = s"$m[0][1]"
    def m02: FloatExpr = s"$m[0][2]"; def m03: FloatExpr = s"$m[0][3]"
    def m10: FloatExpr = s"$m[1][0]"; def m11: FloatExpr = s"$m[1][1]"
    def m12: FloatExpr = s"$m[1][2]"; def m13: FloatExpr = s"$m[1][3]"
    def m20: FloatExpr = s"$m[2][0]"; def m21: FloatExpr = s"$m[2][1]"
    def m22: FloatExpr = s"$m[2][2]"; def m23: FloatExpr = s"$m[2][3]"
    def m30: FloatExpr = s"$m[3][0]"; def m31: FloatExpr = s"$m[3][1]"
    def m32: FloatExpr = s"$m[3][2]"; def m33: FloatExpr = s"$m[3][3]"

// format: off
given Mat4ImmutableOps[FloatExpr, Mat4Expr] with
  def create(
      m00: FloatExpr, m01: FloatExpr, m02: FloatExpr, m03: FloatExpr,
      m10: FloatExpr, m11: FloatExpr, m12: FloatExpr, m13: FloatExpr,
      m20: FloatExpr, m21: FloatExpr, m22: FloatExpr, m23: FloatExpr,
      m30: FloatExpr, m31: FloatExpr, m32: FloatExpr, m33: FloatExpr,
  ): Mat4Expr =
    Mat4Expr(s"mat4x4<f32>($m00, $m01, $m02, $m03, $m10, $m11, $m12, $m13, $m20, $m21, $m22, $m23, $m30, $m31, $m32, $m33)")
// format: on


// ---------------------------------------------------------------------------
// Vector constructors (lowercase, matching WGSL syntax)
// ---------------------------------------------------------------------------

object vec2:
  inline def apply(x: FloatExpr, y: FloatExpr): Vec2Expr =
    Vec2Expr(s"vec2<f32>($x, $y)")

object vec3:
  inline def apply(x: FloatExpr, y: FloatExpr, z: FloatExpr): Vec3Expr =
    Vec3Expr(s"vec3<f32>($x, $y, $z)")

object vec4:
  inline def apply(x: FloatExpr, y: FloatExpr, z: FloatExpr, w: FloatExpr): Vec4Expr =
    Vec4Expr(s"vec4<f32>($x, $y, $z, $w)")
  inline def apply(xyz: Vec3Expr, w: FloatExpr): Vec4Expr =
    Vec4Expr(s"vec4<f32>($xyz, $w)")
  inline def apply(xy: Vec2Expr, z: FloatExpr, w: FloatExpr): Vec4Expr =
    Vec4Expr(s"vec4<f32>($xy, $z, $w)")

// ---------------------------------------------------------------------------
// Stmt and Block opaque types
// ---------------------------------------------------------------------------

opaque type Stmt  = String
opaque type Block = String

object Stmt:
  inline def assign(target: String, value: Expr): Stmt =
    s"  $target = ${value: String};"
  inline def let(name: String, value: Expr): Stmt =
    s"  let $name = ${value: String};"
  inline def varDecl(name: String, value: Expr): Stmt =
    s"  var $name = ${value: String};"
  inline def varDeclTyped(name: String, wgslType: String, value: Expr): Stmt =
    s"  var $name: $wgslType = ${value: String};"
  inline def varAssign(name: String, value: Expr): Stmt =
    s"  $name = ${value: String};"
  inline def raw(s: String): Stmt = s

object Block:
  def apply(stmts: Stmt*): Block = stmts.mkString("\n")
  def empty: Block               = ""
  def unwrap(b: Block): String   = b.asInstanceOf[String]
