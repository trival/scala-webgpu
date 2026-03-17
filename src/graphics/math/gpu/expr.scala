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
// LetExpr — base class for local variable expressions.
// Extends Expr so runtime values created by selectDynamic are compatible.
// ---------------------------------------------------------------------------

class LetExpr(val name: String) extends Expr(name):
  def :=(value: Expr): Stmt = Stmt.let(name, value)

class VarExpr(name: String) extends LetExpr(name):
  private var declared = false
  override def :=(value: Expr): Stmt =
    if !declared then
      declared = true
      Stmt.varDecl(name, value)
    else Stmt.varAssign(name, value)

class ConstExpr(name: String) extends LetExpr(name):
  override def :=(value: Expr): Stmt = Stmt.constDecl(name, value)

// ---------------------------------------------------------------------------
// All opaque types in one object so the compiler sees through them and can
// validate bounds like `LocalVec2 <: Vec2Expr & LetExpr`.
// Inside this object: Vec2Expr = Expr, and LetExpr <: Expr = Vec2Expr.
// Outside: LocalVec2 <: Vec2Expr (gets all Vec2 ops) & LetExpr (gets :=).
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

  // Local types — each <: its Expr type (for math ops) & LetExpr (for :=)
  // At runtime all are LetExpr instances, so selectDynamic returning
  // LetExpr(name) + asInstanceOf cast works safely.

  opaque type LetFloat <: FloatExpr & LetExpr = LetExpr
  object LetFloat { def apply(s: String): LetFloat = new LetExpr(s) }

  opaque type LetVec2 <: Vec2Expr & LetExpr = LetExpr
  object LetVec2 { def apply(s: String): LetVec2 = new LetExpr(s) }

  opaque type LetVec3 <: Vec3Expr & LetExpr = LetExpr
  object LetVec3 { def apply(s: String): LetVec3 = new LetExpr(s) }

  opaque type LetVec4 <: Vec4Expr & LetExpr = LetExpr
  object LetVec4 { def apply(s: String): LetVec4 = new LetExpr(s) }

  opaque type LetMat2 <: Mat2Expr & LetExpr = LetExpr
  object LetMat2 { def apply(s: String): LetMat2 = new LetExpr(s) }

  opaque type LetMat3 <: Mat3Expr & LetExpr = LetExpr
  object LetMat3 { def apply(s: String): LetMat3 = new LetExpr(s) }

  opaque type LetMat4 <: Mat4Expr & LetExpr = LetExpr
  object LetMat4 { def apply(s: String): LetMat4 = new LetExpr(s) }

  opaque type LetBool <: BoolExpr & LetExpr = LetExpr
  object LetBool { def apply(s: String): LetBool = new LetExpr(s) }

  // Var types — mutable locals (var on first :=, reassignment after)
  opaque type VarFloat <: FloatExpr & VarExpr = VarExpr
  object VarFloat { def apply(s: String): VarFloat = new VarExpr(s) }

  opaque type VarVec2 <: Vec2Expr & VarExpr = VarExpr
  object VarVec2 { def apply(s: String): VarVec2 = new VarExpr(s) }

  opaque type VarVec3 <: Vec3Expr & VarExpr = VarExpr
  object VarVec3 { def apply(s: String): VarVec3 = new VarExpr(s) }

  opaque type VarVec4 <: Vec4Expr & VarExpr = VarExpr
  object VarVec4 { def apply(s: String): VarVec4 = new VarExpr(s) }

  // Const types — WGSL compile-time constants
  opaque type ConstFloat <: FloatExpr & ConstExpr = ConstExpr
  object ConstFloat { def apply(s: String): ConstFloat = new ConstExpr(s) }

  opaque type ConstVec2 <: Vec2Expr & ConstExpr = ConstExpr
  object ConstVec2 { def apply(s: String): ConstVec2 = new ConstExpr(s) }

  opaque type ConstVec3 <: Vec3Expr & ConstExpr = ConstExpr
  object ConstVec3 { def apply(s: String): ConstVec3 = new ConstExpr(s) }

  opaque type ConstVec4 <: Vec4Expr & ConstExpr = ConstExpr
  object ConstVec4 { def apply(s: String): ConstVec4 = new ConstExpr(s) }

export Expr.{
  FloatExpr,
  Vec2Expr,
  Vec3Expr,
  Vec4Expr,
  Mat2Expr,
  Mat3Expr,
  Mat4Expr,
  BoolExpr,
  LetFloat,
  LetVec2,
  LetVec3,
  LetVec4,
  LetMat2,
  LetMat3,
  LetMat4,
  LetBool,
  VarFloat,
  VarVec2,
  VarVec3,
  VarVec4,
  ConstFloat,
  ConstVec2,
  ConstVec3,
  ConstVec4,
}

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
// NumOps / NumExt for FloatExpr
// LocalFloat <: FloatExpr, so these apply to LocalFloat too.
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

given NumExt[FloatExpr]:
  extension (a: FloatExpr)
    def sqrt: FloatExpr = FloatExpr(s"sqrt(${a.wgsl})")
    def pow(exp: FloatExpr): FloatExpr = FloatExpr(
      s"pow(${a.wgsl}, ${exp.wgsl})",
    )
    def abs: FloatExpr = FloatExpr(s"abs(${a.wgsl})")
    def sign: FloatExpr = FloatExpr(s"sign(${a.wgsl})")
    def floor: FloatExpr = FloatExpr(s"floor(${a.wgsl})")
    def ceil: FloatExpr = FloatExpr(s"ceil(${a.wgsl})")
    def round: FloatExpr = FloatExpr(s"round(${a.wgsl})")
    def fract: FloatExpr = FloatExpr(s"fract(${a.wgsl})")
    def exp: FloatExpr = FloatExpr(s"exp(${a.wgsl})")
    def log: FloatExpr = FloatExpr(s"log(${a.wgsl})")
    def log2: FloatExpr = FloatExpr(s"log2(${a.wgsl})")
    def sin: FloatExpr = FloatExpr(s"sin(${a.wgsl})")
    def cos: FloatExpr = FloatExpr(s"cos(${a.wgsl})")
    def tan: FloatExpr = FloatExpr(s"tan(${a.wgsl})")
    def asin: FloatExpr = FloatExpr(s"asin(${a.wgsl})")
    def acos: FloatExpr = FloatExpr(s"acos(${a.wgsl})")
    def atan: FloatExpr = FloatExpr(s"atan(${a.wgsl})")
    def atan2(other: FloatExpr): FloatExpr = FloatExpr(
      s"atan2(${a.wgsl}, ${other.wgsl})",
    )
    def min(other: FloatExpr): FloatExpr = FloatExpr(
      s"min(${a.wgsl}, ${other.wgsl})",
    )
    def max(other: FloatExpr): FloatExpr = FloatExpr(
      s"max(${a.wgsl}, ${other.wgsl})",
    )
    def clamp(min: FloatExpr, max: FloatExpr): FloatExpr =
      FloatExpr(s"clamp(${a.wgsl}, ${min.wgsl}, ${max.wgsl})")
    def clamp01: FloatExpr = FloatExpr(s"saturate(${a.wgsl})")
    def fit0111: FloatExpr = FloatExpr(s"(${a.wgsl} * 2.0 - 1.0)")
    def fit1101: FloatExpr = FloatExpr(s"(${a.wgsl} * 0.5 + 0.5)")
    def mix(b: FloatExpr, t: FloatExpr): FloatExpr =
      FloatExpr(s"mix(${a.wgsl}, ${b.wgsl}, ${t.wgsl})")
    def gte(edge: FloatExpr): FloatExpr = FloatExpr(
      s"step(${edge.wgsl}, ${a.wgsl})",
    )
    def gt(edge: FloatExpr): FloatExpr = FloatExpr(
      s"(1.0 - step(${a.wgsl}, ${edge.wgsl}))",
    )
    def lte(edge: FloatExpr): FloatExpr = FloatExpr(
      s"step(${a.wgsl}, ${edge.wgsl})",
    )
    def lt(edge: FloatExpr): FloatExpr = FloatExpr(
      s"(1.0 - step(${edge.wgsl}, ${a.wgsl}))",
    )
    def smoothstep(edge0: FloatExpr, edge1: FloatExpr): FloatExpr =
      FloatExpr(s"smoothstep(${edge0.wgsl}, ${edge1.wgsl}, ${a.wgsl})")

// ---------------------------------------------------------------------------
// Vec2 — LocalVec2 <: Vec2Expr, so only one Base + one ImmutableOps needed
// ---------------------------------------------------------------------------

given Vec2Base[FloatExpr, Vec2Expr] =
  new Vec2Base[FloatExpr, Vec2Expr]:
    extension (v: Vec2Expr)
      def x: FloatExpr = FloatExpr(s"${v.wgsl}.x")
      def y: FloatExpr = FloatExpr(s"${v.wgsl}.y")
      override def dot(other: Vec2Expr): FloatExpr = FloatExpr(
        s"dot(${v.wgsl}, ${other.wgsl})",
      )
      override def length: FloatExpr = FloatExpr(s"length(${v.wgsl})")

given Vec2ImmutableOps[FloatExpr, Vec2Expr]:
  def create(x: FloatExpr, y: FloatExpr): Vec2Expr =
    Vec2Expr(s"vec2<f32>(${x.wgsl}, ${y.wgsl})")

  extension (v: Vec2Expr)(using Vec2Base[FloatExpr, Vec2Expr])
    @annotation.targetName("addVec")
    override def +(other: Vec2Expr): Vec2Expr =
      Vec2Expr(s"(${v.wgsl} + ${other.wgsl})")
    @annotation.targetName("addScalar")
    override def +(scalar: FloatExpr): Vec2Expr =
      Vec2Expr(s"(${v.wgsl} + ${scalar.wgsl})")
    def +(scalar: Double): Vec2Expr = v + (scalar: FloatExpr)
    @annotation.targetName("subVec")
    override def -(other: Vec2Expr): Vec2Expr =
      Vec2Expr(s"(${v.wgsl} - ${other.wgsl})")
    @annotation.targetName("subScalar")
    override def -(scalar: FloatExpr): Vec2Expr =
      Vec2Expr(s"(${v.wgsl} - ${scalar.wgsl})")
    def -(scalar: Double): Vec2Expr = v - (scalar: FloatExpr)
    @annotation.targetName("mulVec")
    override def *(other: Vec2Expr): Vec2Expr =
      Vec2Expr(s"(${v.wgsl} * ${other.wgsl})")
    @annotation.targetName("mulScalar")
    override def *(scalar: FloatExpr): Vec2Expr =
      Vec2Expr(s"(${v.wgsl} * ${scalar.wgsl})")
    def *(scalar: Double): Vec2Expr = v * (scalar: FloatExpr)
    @annotation.targetName("divVec")
    override def /(other: Vec2Expr): Vec2Expr =
      Vec2Expr(s"(${v.wgsl} / ${other.wgsl})")
    @annotation.targetName("divScalar")
    override def /(scalar: FloatExpr): Vec2Expr =
      Vec2Expr(s"(${v.wgsl} / ${scalar.wgsl})")
    def /(scalar: Double): Vec2Expr = v / (scalar: FloatExpr)

    override def normalize: Vec2Expr = Vec2Expr(s"normalize(${v.wgsl})")
    override def abs: Vec2Expr = Vec2Expr(s"abs(${v.wgsl})")
    override def sign: Vec2Expr = Vec2Expr(s"sign(${v.wgsl})")
    override def floor: Vec2Expr = Vec2Expr(s"floor(${v.wgsl})")
    override def ceil: Vec2Expr = Vec2Expr(s"ceil(${v.wgsl})")
    override def round: Vec2Expr = Vec2Expr(s"round(${v.wgsl})")
    override def fract: Vec2Expr = Vec2Expr(s"fract(${v.wgsl})")
    override def exp: Vec2Expr = Vec2Expr(s"exp(${v.wgsl})")
    override def log: Vec2Expr = Vec2Expr(s"log(${v.wgsl})")
    override def log2: Vec2Expr = Vec2Expr(s"log2(${v.wgsl})")
    override def sqrt: Vec2Expr = Vec2Expr(s"sqrt(${v.wgsl})")
    override def min(other: Vec2Expr): Vec2Expr =
      Vec2Expr(s"min(${v.wgsl}, ${other.wgsl})")
    override def max(other: Vec2Expr): Vec2Expr =
      Vec2Expr(s"max(${v.wgsl}, ${other.wgsl})")
    override def clamp(lo: FloatExpr, hi: FloatExpr): Vec2Expr =
      Vec2Expr(s"clamp(${v.wgsl}, ${lo.wgsl}, ${hi.wgsl})")
    @annotation.targetName("mixVec")
    override def mix(b: Vec2Expr, t: Vec2Expr): Vec2Expr =
      Vec2Expr(s"mix(${v.wgsl}, ${b.wgsl}, ${t.wgsl})")
    @annotation.targetName("mixScalar")
    override def mix(b: Vec2Expr, t: FloatExpr): Vec2Expr =
      Vec2Expr(s"mix(${v.wgsl}, ${b.wgsl}, ${t.wgsl})")
    @annotation.targetName("stepVec")
    override def step(edge: Vec2Expr): Vec2Expr =
      Vec2Expr(s"step(${edge.wgsl}, ${v.wgsl})")
    @annotation.targetName("stepScalar")
    override def step(edge: FloatExpr): Vec2Expr =
      Vec2Expr(s"step(${edge.wgsl}, ${v.wgsl})")
    override def smoothstep(edge0: Vec2Expr, edge1: Vec2Expr): Vec2Expr =
      Vec2Expr(s"smoothstep(${edge0.wgsl}, ${edge1.wgsl}, ${v.wgsl})")
    @annotation.targetName("ltVec")
    override def <(other: Vec2Expr): Vec2Expr =
      Vec2Expr(s"(1.0 - step(${other.wgsl}, ${v.wgsl}))")
    @annotation.targetName("lteVec")
    override def <=(other: Vec2Expr): Vec2Expr =
      Vec2Expr(s"step(${v.wgsl}, ${other.wgsl})")
    @annotation.targetName("gtVec")
    override def >(other: Vec2Expr): Vec2Expr =
      Vec2Expr(s"(1.0 - step(${v.wgsl}, ${other.wgsl}))")
    @annotation.targetName("gteVec")
    override def >=(other: Vec2Expr): Vec2Expr =
      Vec2Expr(s"step(${other.wgsl}, ${v.wgsl})")

// ---------------------------------------------------------------------------
// Vec3 — LocalVec3 <: Vec3Expr
// ---------------------------------------------------------------------------

given Vec3Base[FloatExpr, Vec3Expr] =
  new Vec3Base[FloatExpr, Vec3Expr]:
    extension (v: Vec3Expr)
      def x: FloatExpr = FloatExpr(s"${v.wgsl}.x")
      def y: FloatExpr = FloatExpr(s"${v.wgsl}.y")
      def z: FloatExpr = FloatExpr(s"${v.wgsl}.z")
      override def dot(other: Vec3Expr): FloatExpr = FloatExpr(
        s"dot(${v.wgsl}, ${other.wgsl})",
      )
      override def length: FloatExpr = FloatExpr(s"length(${v.wgsl})")

given Vec3ImmutableOps[FloatExpr, Vec3Expr]:
  def create(x: FloatExpr, y: FloatExpr, z: FloatExpr): Vec3Expr =
    Vec3Expr(s"vec3<f32>(${x.wgsl}, ${y.wgsl}, ${z.wgsl})")

  extension (v: Vec3Expr)(using Vec3Base[FloatExpr, Vec3Expr])
    @annotation.targetName("addVec")
    override def +(other: Vec3Expr): Vec3Expr =
      Vec3Expr(s"(${v.wgsl} + ${other.wgsl})")
    @annotation.targetName("addScalar")
    override def +(scalar: FloatExpr): Vec3Expr =
      Vec3Expr(s"(${v.wgsl} + ${scalar.wgsl})")
    def +(scalar: Double): Vec3Expr = v + (scalar: FloatExpr)
    @annotation.targetName("subVec")
    override def -(other: Vec3Expr): Vec3Expr =
      Vec3Expr(s"(${v.wgsl} - ${other.wgsl})")
    @annotation.targetName("subScalar")
    override def -(scalar: FloatExpr): Vec3Expr =
      Vec3Expr(s"(${v.wgsl} - ${scalar.wgsl})")
    def -(scalar: Double): Vec3Expr = v - (scalar: FloatExpr)
    @annotation.targetName("mulVec")
    override def *(other: Vec3Expr): Vec3Expr =
      Vec3Expr(s"(${v.wgsl} * ${other.wgsl})")
    @annotation.targetName("mulScalar")
    override def *(scalar: FloatExpr): Vec3Expr =
      Vec3Expr(s"(${v.wgsl} * ${scalar.wgsl})")
    def *(scalar: Double): Vec3Expr = v * (scalar: FloatExpr)
    @annotation.targetName("divVec")
    override def /(other: Vec3Expr): Vec3Expr =
      Vec3Expr(s"(${v.wgsl} / ${other.wgsl})")
    @annotation.targetName("divScalar")
    override def /(scalar: FloatExpr): Vec3Expr =
      Vec3Expr(s"(${v.wgsl} / ${scalar.wgsl})")
    def /(scalar: Double): Vec3Expr = v / (scalar: FloatExpr)

    override def normalize: Vec3Expr = Vec3Expr(s"normalize(${v.wgsl})")
    override def abs: Vec3Expr = Vec3Expr(s"abs(${v.wgsl})")
    override def sign: Vec3Expr = Vec3Expr(s"sign(${v.wgsl})")
    override def floor: Vec3Expr = Vec3Expr(s"floor(${v.wgsl})")
    override def ceil: Vec3Expr = Vec3Expr(s"ceil(${v.wgsl})")
    override def round: Vec3Expr = Vec3Expr(s"round(${v.wgsl})")
    override def fract: Vec3Expr = Vec3Expr(s"fract(${v.wgsl})")
    override def exp: Vec3Expr = Vec3Expr(s"exp(${v.wgsl})")
    override def log: Vec3Expr = Vec3Expr(s"log(${v.wgsl})")
    override def log2: Vec3Expr = Vec3Expr(s"log2(${v.wgsl})")
    override def sqrt: Vec3Expr = Vec3Expr(s"sqrt(${v.wgsl})")
    override def min(other: Vec3Expr): Vec3Expr =
      Vec3Expr(s"min(${v.wgsl}, ${other.wgsl})")
    override def max(other: Vec3Expr): Vec3Expr =
      Vec3Expr(s"max(${v.wgsl}, ${other.wgsl})")
    override def clamp(lo: FloatExpr, hi: FloatExpr): Vec3Expr =
      Vec3Expr(s"clamp(${v.wgsl}, ${lo.wgsl}, ${hi.wgsl})")
    @annotation.targetName("mixVec")
    override def mix(b: Vec3Expr, t: Vec3Expr): Vec3Expr =
      Vec3Expr(s"mix(${v.wgsl}, ${b.wgsl}, ${t.wgsl})")
    @annotation.targetName("mixScalar")
    override def mix(b: Vec3Expr, t: FloatExpr): Vec3Expr =
      Vec3Expr(s"mix(${v.wgsl}, ${b.wgsl}, ${t.wgsl})")
    @annotation.targetName("stepVec")
    override def step(edge: Vec3Expr): Vec3Expr =
      Vec3Expr(s"step(${edge.wgsl}, ${v.wgsl})")
    @annotation.targetName("stepScalar")
    override def step(edge: FloatExpr): Vec3Expr =
      Vec3Expr(s"step(${edge.wgsl}, ${v.wgsl})")
    override def smoothstep(edge0: Vec3Expr, edge1: Vec3Expr): Vec3Expr =
      Vec3Expr(s"smoothstep(${edge0.wgsl}, ${edge1.wgsl}, ${v.wgsl})")
    @annotation.targetName("ltVec")
    override def <(other: Vec3Expr): Vec3Expr =
      Vec3Expr(s"(1.0 - step(${other.wgsl}, ${v.wgsl}))")
    @annotation.targetName("lteVec")
    override def <=(other: Vec3Expr): Vec3Expr =
      Vec3Expr(s"step(${v.wgsl}, ${other.wgsl})")
    @annotation.targetName("gtVec")
    override def >(other: Vec3Expr): Vec3Expr =
      Vec3Expr(s"(1.0 - step(${v.wgsl}, ${other.wgsl}))")
    @annotation.targetName("gteVec")
    override def >=(other: Vec3Expr): Vec3Expr =
      Vec3Expr(s"step(${other.wgsl}, ${v.wgsl})")

// ---------------------------------------------------------------------------
// Vec4 — LocalVec4 <: Vec4Expr
// ---------------------------------------------------------------------------

given Vec4Base[FloatExpr, Vec4Expr] =
  new Vec4Base[FloatExpr, Vec4Expr]:
    extension (v: Vec4Expr)
      def x: FloatExpr = FloatExpr(s"${v.wgsl}.x")
      def y: FloatExpr = FloatExpr(s"${v.wgsl}.y")
      def z: FloatExpr = FloatExpr(s"${v.wgsl}.z")
      def w: FloatExpr = FloatExpr(s"${v.wgsl}.w")
      override def dot(other: Vec4Expr): FloatExpr = FloatExpr(
        s"dot(${v.wgsl}, ${other.wgsl})",
      )
      override def length: FloatExpr = FloatExpr(s"length(${v.wgsl})")

given Vec4ImmutableOps[FloatExpr, Vec4Expr]:
  def create(x: FloatExpr, y: FloatExpr, z: FloatExpr, w: FloatExpr): Vec4Expr =
    Vec4Expr(s"vec4<f32>(${x.wgsl}, ${y.wgsl}, ${z.wgsl}, ${w.wgsl})")

  extension (v: Vec4Expr)(using Vec4Base[FloatExpr, Vec4Expr])
    @annotation.targetName("addVec")
    override def +(other: Vec4Expr): Vec4Expr =
      Vec4Expr(s"(${v.wgsl} + ${other.wgsl})")
    @annotation.targetName("addScalar")
    override def +(scalar: FloatExpr): Vec4Expr =
      Vec4Expr(s"(${v.wgsl} + ${scalar.wgsl})")
    @annotation.targetName("subVec")
    override def -(other: Vec4Expr): Vec4Expr =
      Vec4Expr(s"(${v.wgsl} - ${other.wgsl})")
    @annotation.targetName("subScalar")
    override def -(scalar: FloatExpr): Vec4Expr =
      Vec4Expr(s"(${v.wgsl} - ${scalar.wgsl})")
    @annotation.targetName("mulVec")
    override def *(other: Vec4Expr): Vec4Expr =
      Vec4Expr(s"(${v.wgsl} * ${other.wgsl})")
    @annotation.targetName("mulScalar")
    override def *(scalar: FloatExpr): Vec4Expr =
      Vec4Expr(s"(${v.wgsl} * ${scalar.wgsl})")
    @annotation.targetName("divVec")
    override def /(other: Vec4Expr): Vec4Expr =
      Vec4Expr(s"(${v.wgsl} / ${other.wgsl})")
    @annotation.targetName("divScalar")
    override def /(scalar: FloatExpr): Vec4Expr =
      Vec4Expr(s"(${v.wgsl} / ${scalar.wgsl})")

    override def normalize: Vec4Expr = Vec4Expr(s"normalize(${v.wgsl})")
    override def abs: Vec4Expr = Vec4Expr(s"abs(${v.wgsl})")
    override def sign: Vec4Expr = Vec4Expr(s"sign(${v.wgsl})")
    override def floor: Vec4Expr = Vec4Expr(s"floor(${v.wgsl})")
    override def ceil: Vec4Expr = Vec4Expr(s"ceil(${v.wgsl})")
    override def round: Vec4Expr = Vec4Expr(s"round(${v.wgsl})")
    override def fract: Vec4Expr = Vec4Expr(s"fract(${v.wgsl})")
    override def exp: Vec4Expr = Vec4Expr(s"exp(${v.wgsl})")
    override def log: Vec4Expr = Vec4Expr(s"log(${v.wgsl})")
    override def log2: Vec4Expr = Vec4Expr(s"log2(${v.wgsl})")
    override def sqrt: Vec4Expr = Vec4Expr(s"sqrt(${v.wgsl})")
    override def min(other: Vec4Expr): Vec4Expr =
      Vec4Expr(s"min(${v.wgsl}, ${other.wgsl})")
    override def max(other: Vec4Expr): Vec4Expr =
      Vec4Expr(s"max(${v.wgsl}, ${other.wgsl})")
    override def clamp(lo: FloatExpr, hi: FloatExpr): Vec4Expr =
      Vec4Expr(s"clamp(${v.wgsl}, ${lo.wgsl}, ${hi.wgsl})")
    @annotation.targetName("mixVec")
    override def mix(b: Vec4Expr, t: Vec4Expr): Vec4Expr =
      Vec4Expr(s"mix(${v.wgsl}, ${b.wgsl}, ${t.wgsl})")
    @annotation.targetName("mixScalar")
    override def mix(b: Vec4Expr, t: FloatExpr): Vec4Expr =
      Vec4Expr(s"mix(${v.wgsl}, ${b.wgsl}, ${t.wgsl})")
    @annotation.targetName("stepVec")
    override def step(edge: Vec4Expr): Vec4Expr =
      Vec4Expr(s"step(${edge.wgsl}, ${v.wgsl})")
    @annotation.targetName("stepScalar")
    override def step(edge: FloatExpr): Vec4Expr =
      Vec4Expr(s"step(${edge.wgsl}, ${v.wgsl})")
    override def smoothstep(edge0: Vec4Expr, edge1: Vec4Expr): Vec4Expr =
      Vec4Expr(s"smoothstep(${edge0.wgsl}, ${edge1.wgsl}, ${v.wgsl})")
    @annotation.targetName("ltVec")
    override def <(other: Vec4Expr): Vec4Expr =
      Vec4Expr(s"(1.0 - step(${other.wgsl}, ${v.wgsl}))")
    @annotation.targetName("lteVec")
    override def <=(other: Vec4Expr): Vec4Expr =
      Vec4Expr(s"step(${v.wgsl}, ${other.wgsl})")
    @annotation.targetName("gtVec")
    override def >(other: Vec4Expr): Vec4Expr =
      Vec4Expr(s"(1.0 - step(${v.wgsl}, ${other.wgsl}))")
    @annotation.targetName("gteVec")
    override def >=(other: Vec4Expr): Vec4Expr =
      Vec4Expr(s"step(${other.wgsl}, ${v.wgsl})")

// ---------------------------------------------------------------------------
// Mat2
// ---------------------------------------------------------------------------

given Mat2Base[FloatExpr, Mat2Expr] =
  new Mat2Base[FloatExpr, Mat2Expr]:
    extension (m: Mat2Expr)
      def m00: FloatExpr = FloatExpr(s"${m.wgsl}[0][0]")
      def m01: FloatExpr = FloatExpr(s"${m.wgsl}[0][1]")
      def m10: FloatExpr = FloatExpr(s"${m.wgsl}[1][0]")
      def m11: FloatExpr = FloatExpr(s"${m.wgsl}[1][1]")

given Mat2ImmutableOps[FloatExpr, Mat2Expr]:
  def create(
      m00: FloatExpr,
      m01: FloatExpr,
      m10: FloatExpr,
      m11: FloatExpr,
  ): Mat2Expr =
    Mat2Expr(s"mat2x2<f32>(${m00.wgsl}, ${m01.wgsl}, ${m10.wgsl}, ${m11.wgsl})")

  extension (m: Mat2Expr)(using Mat2Base[FloatExpr, Mat2Expr])
    @annotation.targetName("matMul")
    override def *(other: Mat2Expr): Mat2Expr =
      Mat2Expr(s"(${m.wgsl} * ${other.wgsl})")
    @annotation.targetName("vecMul")
    override def *[Vec](v: Vec)(using
        Vec2Base[FloatExpr, Vec],
        Vec2ImmutableOps[FloatExpr, Vec],
    ): Vec =
      Vec2Expr(s"(${m.wgsl} * ${v.asInstanceOf[Expr].wgsl})").asInstanceOf[Vec]

// ---------------------------------------------------------------------------
// Mat3
// ---------------------------------------------------------------------------

given Mat3Base[FloatExpr, Mat3Expr] =
  new Mat3Base[FloatExpr, Mat3Expr]:
    extension (m: Mat3Expr)
      def m00: FloatExpr = FloatExpr(s"${m.wgsl}[0][0]")
      def m01: FloatExpr = FloatExpr(s"${m.wgsl}[0][1]")
      def m02: FloatExpr = FloatExpr(s"${m.wgsl}[0][2]")
      def m10: FloatExpr = FloatExpr(s"${m.wgsl}[1][0]")
      def m11: FloatExpr = FloatExpr(s"${m.wgsl}[1][1]")
      def m12: FloatExpr = FloatExpr(s"${m.wgsl}[1][2]")
      def m20: FloatExpr = FloatExpr(s"${m.wgsl}[2][0]")
      def m21: FloatExpr = FloatExpr(s"${m.wgsl}[2][1]")
      def m22: FloatExpr = FloatExpr(s"${m.wgsl}[2][2]")

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

  extension (m: Mat3Expr)(using Mat3Base[FloatExpr, Mat3Expr])
    @annotation.targetName("matMul")
    override def *(other: Mat3Expr): Mat3Expr =
      Mat3Expr(s"(${m.wgsl} * ${other.wgsl})")
    @annotation.targetName("vecMul")
    override def *[Vec](v: Vec)(using
        Vec3Base[FloatExpr, Vec],
        Vec3ImmutableOps[FloatExpr, Vec],
    ): Vec =
      Vec3Expr(s"(${m.wgsl} * ${v.asInstanceOf[Expr].wgsl})").asInstanceOf[Vec]

// ---------------------------------------------------------------------------
// Mat4
// ---------------------------------------------------------------------------

given Mat4Base[FloatExpr, Mat4Expr] =
  new Mat4Base[FloatExpr, Mat4Expr]:
    extension (m: Mat4Expr)
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

  extension (m: Mat4Expr)(using Mat4Base[FloatExpr, Mat4Expr])
    @annotation.targetName("matMul")
    override def *(other: Mat4Expr): Mat4Expr =
      Mat4Expr(s"(${m.wgsl} * ${other.wgsl})")
    @annotation.targetName("vecMul")
    override def *[Vec](v: Vec)(using
        Vec4Base[FloatExpr, Vec],
        Vec4ImmutableOps[FloatExpr, Vec],
    ): Vec =
      Vec4Expr(s"(${m.wgsl} * ${v.asInstanceOf[Expr].wgsl})").asInstanceOf[Vec]

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
  inline def constDecl(name: String, value: Expr): Stmt =
    s"  const $name = ${value.wgsl};"
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
