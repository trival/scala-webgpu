package graphics.math.gpu

import graphics.math.*
import trivalibs.utils.numbers.IntExt
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

  // GPU resource expression types — opaque wrappers used in shader DSL
  // for texture and sampler bindings. No CPU-side representation.

  opaque type Texture2D <: Expr = Expr
  object Texture2D { def apply(s: String): Texture2D = new Expr(s) }

  opaque type Sampler <: Expr = Expr
  object Sampler { def apply(s: String): Sampler = new Expr(s) }

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

  // ---------------------------------------------------------------------------
  // Integer scalar expression types
  // ---------------------------------------------------------------------------

  opaque type IntExpr <: Expr = Expr
  object IntExpr:
    def apply(s: String): IntExpr = new Expr(s)
    def apply(v: Int): IntExpr = new Expr(v.toString)

  opaque type UIntExpr <: Expr = Expr
  object UIntExpr:
    def apply(s: String): UIntExpr = new Expr(s)
    def apply(v: Int): UIntExpr = new Expr(s"${v}u")

  // ---------------------------------------------------------------------------
  // Integer vector expression types (GPU-only phantoms)
  // ---------------------------------------------------------------------------

  opaque type IVec2Expr <: Expr = Expr
  object IVec2Expr { def apply(s: String): IVec2Expr = new Expr(s) }

  opaque type IVec3Expr <: Expr = Expr
  object IVec3Expr { def apply(s: String): IVec3Expr = new Expr(s) }

  opaque type IVec4Expr <: Expr = Expr
  object IVec4Expr { def apply(s: String): IVec4Expr = new Expr(s) }

  opaque type UVec2Expr <: Expr = Expr
  object UVec2Expr { def apply(s: String): UVec2Expr = new Expr(s) }

  opaque type UVec3Expr <: Expr = Expr
  object UVec3Expr { def apply(s: String): UVec3Expr = new Expr(s) }

  opaque type UVec4Expr <: Expr = Expr
  object UVec4Expr { def apply(s: String): UVec4Expr = new Expr(s) }

  // ---------------------------------------------------------------------------
  // Let/Var/Const variants for integer scalar types
  // ---------------------------------------------------------------------------

  opaque type LetInt <: IntExpr & LetExpr = LetExpr
  object LetInt { def apply(s: String): LetInt = new LetExpr(s) }

  opaque type VarInt <: IntExpr & VarExpr = VarExpr
  object VarInt { def apply(s: String): VarInt = new VarExpr(s) }

  opaque type ConstInt <: IntExpr & ConstExpr = ConstExpr
  object ConstInt { def apply(s: String): ConstInt = new ConstExpr(s) }

  opaque type LetUInt <: UIntExpr & LetExpr = LetExpr
  object LetUInt { def apply(s: String): LetUInt = new LetExpr(s) }

  opaque type VarUInt <: UIntExpr & VarExpr = VarExpr
  object VarUInt { def apply(s: String): VarUInt = new VarExpr(s) }

  opaque type ConstUInt <: UIntExpr & ConstExpr = ConstExpr
  object ConstUInt { def apply(s: String): ConstUInt = new ConstExpr(s) }

  // ---------------------------------------------------------------------------
  // Let variants for integer vector types (Var/Const added as needed)
  // ---------------------------------------------------------------------------

  opaque type LetIVec2 <: IVec2Expr & LetExpr = LetExpr
  object LetIVec2 { def apply(s: String): LetIVec2 = new LetExpr(s) }

  opaque type LetIVec3 <: IVec3Expr & LetExpr = LetExpr
  object LetIVec3 { def apply(s: String): LetIVec3 = new LetExpr(s) }

  opaque type LetIVec4 <: IVec4Expr & LetExpr = LetExpr
  object LetIVec4 { def apply(s: String): LetIVec4 = new LetExpr(s) }

  opaque type LetUVec2 <: UVec2Expr & LetExpr = LetExpr
  object LetUVec2 { def apply(s: String): LetUVec2 = new LetExpr(s) }

  opaque type LetUVec3 <: UVec3Expr & LetExpr = LetExpr
  object LetUVec3 { def apply(s: String): LetUVec3 = new LetExpr(s) }

  opaque type LetUVec4 <: UVec4Expr & LetExpr = LetExpr
  object LetUVec4 { def apply(s: String): LetUVec4 = new LetExpr(s) }

extension (tex: Expr.Texture2D)
  def sample(uv: Expr.Vec2Expr, sampler: Expr.Sampler): Expr.Vec4Expr =
    Expr.Vec4Expr(s"textureSample(${tex.wgsl}, ${sampler.wgsl}, ${uv.wgsl})")
  def apply(uv: Expr.Vec2Expr, sampler: Expr.Sampler): Expr.Vec4Expr =
    Expr.Vec4Expr(s"textureSample(${tex.wgsl}, ${sampler.wgsl}, ${uv.wgsl})")
  def sampleLevel(
      uv: Expr.Vec2Expr,
      sampler: Expr.Sampler,
      level: Expr.FloatExpr,
  ): Expr.Vec4Expr =
    Expr.Vec4Expr(
      s"textureSampleLevel(${tex.wgsl}, ${sampler.wgsl}, ${uv.wgsl}, ${level.wgsl})",
    )
  def numLevels: Expr.FloatExpr =
    Expr.FloatExpr(s"f32(textureNumLevels(${tex.wgsl}))")

export Expr.{
  FloatExpr,
  Vec2Expr,
  Vec3Expr,
  Vec4Expr,
  Mat2Expr,
  Mat3Expr,
  Mat4Expr,
  BoolExpr,
  Texture2D,
  Sampler,
  IntExpr,
  UIntExpr,
  IVec2Expr,
  IVec3Expr,
  IVec4Expr,
  UVec2Expr,
  UVec3Expr,
  UVec4Expr,
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
  LetInt,
  VarInt,
  ConstInt,
  LetUInt,
  VarUInt,
  ConstUInt,
  LetIVec2,
  LetIVec3,
  LetIVec4,
  LetUVec2,
  LetUVec3,
  LetUVec4,
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

given Vec2BaseG[FloatExpr, Vec2Expr] =
  new Vec2BaseG[FloatExpr, Vec2Expr]:
    extension (v: Vec2Expr)
      def x: FloatExpr = FloatExpr(s"${v.wgsl}.x")
      def y: FloatExpr = FloatExpr(s"${v.wgsl}.y")
      def dot(other: Vec2Expr): FloatExpr = FloatExpr(
        s"dot(${v.wgsl}, ${other.wgsl})",
      )
      def length_squared: FloatExpr = FloatExpr(s"dot(${v.wgsl}, ${v.wgsl})")
      def length: FloatExpr = FloatExpr(s"length(${v.wgsl})")

given Vec2ImmutableOpsG[FloatExpr, Vec2Expr]:
  def create(x: FloatExpr, y: FloatExpr): Vec2Expr =
    Vec2Expr(s"vec2<f32>(${x.wgsl}, ${y.wgsl})")

  extension (v: Vec2Expr)(using Vec2BaseG[FloatExpr, Vec2Expr])
    @annotation.targetName("addVecG")
    override def +(other: Vec2Expr): Vec2Expr =
      Vec2Expr(s"(${v.wgsl} + ${other.wgsl})")
    @annotation.targetName("addScalarG")
    override def +(scalar: FloatExpr): Vec2Expr =
      Vec2Expr(s"(${v.wgsl} + ${scalar.wgsl})")
    def +(scalar: Double): Vec2Expr = v + (scalar: FloatExpr)
    @annotation.targetName("negateVecG")
    override def unary_- : Vec2Expr = Vec2Expr(s"(-${v.wgsl})")
    @annotation.targetName("subVecG")
    override def -(other: Vec2Expr): Vec2Expr =
      Vec2Expr(s"(${v.wgsl} - ${other.wgsl})")
    @annotation.targetName("subScalarG")
    override def -(scalar: FloatExpr): Vec2Expr =
      Vec2Expr(s"(${v.wgsl} - ${scalar.wgsl})")
    def -(scalar: Double): Vec2Expr = v - (scalar: FloatExpr)
    @annotation.targetName("mulVecG")
    override def *(other: Vec2Expr): Vec2Expr =
      Vec2Expr(s"(${v.wgsl} * ${other.wgsl})")
    @annotation.targetName("mulScalarG")
    override def *(scalar: FloatExpr): Vec2Expr =
      Vec2Expr(s"(${v.wgsl} * ${scalar.wgsl})")
    def *(scalar: Double): Vec2Expr = v * (scalar: FloatExpr)
    @annotation.targetName("divVecG")
    override def /(other: Vec2Expr): Vec2Expr =
      Vec2Expr(s"(${v.wgsl} / ${other.wgsl})")
    @annotation.targetName("divScalarG")
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
    override def fit0111: Vec2Expr = Vec2Expr(s"(${v.wgsl} * 2.0 - 1.0)")
    override def fit1101: Vec2Expr = Vec2Expr(s"(${v.wgsl} * 0.5 + 0.5)")
    @annotation.targetName("mixVecG")
    override def mix(b: Vec2Expr, t: Vec2Expr): Vec2Expr =
      Vec2Expr(s"mix(${v.wgsl}, ${b.wgsl}, ${t.wgsl})")
    @annotation.targetName("mixScalarG")
    override def mix(b: Vec2Expr, t: FloatExpr): Vec2Expr =
      Vec2Expr(s"mix(${v.wgsl}, ${b.wgsl}, ${t.wgsl})")
    @annotation.targetName("stepVecG")
    override def step(edge: Vec2Expr): Vec2Expr =
      Vec2Expr(s"step(${edge.wgsl}, ${v.wgsl})")
    @annotation.targetName("stepScalarG")
    override def step(edge: FloatExpr): Vec2Expr =
      Vec2Expr(s"step(${edge.wgsl}, ${v.wgsl})")
    override def smoothstep(edge0: Vec2Expr, edge1: Vec2Expr): Vec2Expr =
      Vec2Expr(s"smoothstep(${edge0.wgsl}, ${edge1.wgsl}, ${v.wgsl})")
    @annotation.targetName("ltVecG")
    override def <(other: Vec2Expr): Vec2Expr =
      Vec2Expr(s"(1.0 - step(${other.wgsl}, ${v.wgsl}))")
    @annotation.targetName("lteVecG")
    override def <=(other: Vec2Expr): Vec2Expr =
      Vec2Expr(s"step(${v.wgsl}, ${other.wgsl})")
    @annotation.targetName("gtVecG")
    override def >(other: Vec2Expr): Vec2Expr =
      Vec2Expr(s"(1.0 - step(${v.wgsl}, ${other.wgsl}))")
    @annotation.targetName("gteVecG")
    override def >=(other: Vec2Expr): Vec2Expr =
      Vec2Expr(s"step(${other.wgsl}, ${v.wgsl})")

// ---------------------------------------------------------------------------
// Vec3 — LocalVec3 <: Vec3Expr
// ---------------------------------------------------------------------------

given Vec3BaseG[FloatExpr, Vec3Expr] =
  new Vec3BaseG[FloatExpr, Vec3Expr]:
    extension (v: Vec3Expr)
      def x: FloatExpr = FloatExpr(s"${v.wgsl}.x")
      def y: FloatExpr = FloatExpr(s"${v.wgsl}.y")
      def z: FloatExpr = FloatExpr(s"${v.wgsl}.z")
      def dot(other: Vec3Expr): FloatExpr = FloatExpr(
        s"dot(${v.wgsl}, ${other.wgsl})",
      )
      def length_squared: FloatExpr = FloatExpr(s"dot(${v.wgsl}, ${v.wgsl})")
      def length: FloatExpr = FloatExpr(s"length(${v.wgsl})")

given Vec3ImmutableOpsG[FloatExpr, Vec3Expr]:
  def create(x: FloatExpr, y: FloatExpr, z: FloatExpr): Vec3Expr =
    Vec3Expr(s"vec3<f32>(${x.wgsl}, ${y.wgsl}, ${z.wgsl})")

  extension (v: Vec3Expr)(using Vec3BaseG[FloatExpr, Vec3Expr])
    @annotation.targetName("addVecG")
    override def +(other: Vec3Expr): Vec3Expr =
      Vec3Expr(s"(${v.wgsl} + ${other.wgsl})")
    @annotation.targetName("addScalarG")
    override def +(scalar: FloatExpr): Vec3Expr =
      Vec3Expr(s"(${v.wgsl} + ${scalar.wgsl})")
    def +(scalar: Double): Vec3Expr = v + (scalar: FloatExpr)
    @annotation.targetName("negateVecG")
    override def unary_- : Vec3Expr = Vec3Expr(s"(-${v.wgsl})")
    @annotation.targetName("subVecG")
    override def -(other: Vec3Expr): Vec3Expr =
      Vec3Expr(s"(${v.wgsl} - ${other.wgsl})")
    @annotation.targetName("subScalarG")
    override def -(scalar: FloatExpr): Vec3Expr =
      Vec3Expr(s"(${v.wgsl} - ${scalar.wgsl})")
    def -(scalar: Double): Vec3Expr = v - (scalar: FloatExpr)
    @annotation.targetName("mulVecG")
    override def *(other: Vec3Expr): Vec3Expr =
      Vec3Expr(s"(${v.wgsl} * ${other.wgsl})")
    @annotation.targetName("mulScalarG")
    override def *(scalar: FloatExpr): Vec3Expr =
      Vec3Expr(s"(${v.wgsl} * ${scalar.wgsl})")
    def *(scalar: Double): Vec3Expr = v * (scalar: FloatExpr)
    @annotation.targetName("divVecG")
    override def /(other: Vec3Expr): Vec3Expr =
      Vec3Expr(s"(${v.wgsl} / ${other.wgsl})")
    @annotation.targetName("divScalarG")
    override def /(scalar: FloatExpr): Vec3Expr =
      Vec3Expr(s"(${v.wgsl} / ${scalar.wgsl})")
    def /(scalar: Double): Vec3Expr = v / (scalar: FloatExpr)

    override def cross(other: Vec3Expr): Vec3Expr =
      Vec3Expr(s"cross(${v.wgsl}, ${other.wgsl})")
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
    override def fit0111: Vec3Expr = Vec3Expr(s"(${v.wgsl} * 2.0 - 1.0)")
    override def fit1101: Vec3Expr = Vec3Expr(s"(${v.wgsl} * 0.5 + 0.5)")
    @annotation.targetName("mixVecG")
    override def mix(b: Vec3Expr, t: Vec3Expr): Vec3Expr =
      Vec3Expr(s"mix(${v.wgsl}, ${b.wgsl}, ${t.wgsl})")
    @annotation.targetName("mixScalarG")
    override def mix(b: Vec3Expr, t: FloatExpr): Vec3Expr =
      Vec3Expr(s"mix(${v.wgsl}, ${b.wgsl}, ${t.wgsl})")
    @annotation.targetName("stepVecG")
    override def step(edge: Vec3Expr): Vec3Expr =
      Vec3Expr(s"step(${edge.wgsl}, ${v.wgsl})")
    @annotation.targetName("stepScalarG")
    override def step(edge: FloatExpr): Vec3Expr =
      Vec3Expr(s"step(${edge.wgsl}, ${v.wgsl})")
    override def smoothstep(edge0: Vec3Expr, edge1: Vec3Expr): Vec3Expr =
      Vec3Expr(s"smoothstep(${edge0.wgsl}, ${edge1.wgsl}, ${v.wgsl})")
    @annotation.targetName("ltVecG")
    override def <(other: Vec3Expr): Vec3Expr =
      Vec3Expr(s"(1.0 - step(${other.wgsl}, ${v.wgsl}))")
    @annotation.targetName("lteVecG")
    override def <=(other: Vec3Expr): Vec3Expr =
      Vec3Expr(s"step(${v.wgsl}, ${other.wgsl})")
    @annotation.targetName("gtVecG")
    override def >(other: Vec3Expr): Vec3Expr =
      Vec3Expr(s"(1.0 - step(${v.wgsl}, ${other.wgsl}))")
    @annotation.targetName("gteVecG")
    override def >=(other: Vec3Expr): Vec3Expr =
      Vec3Expr(s"step(${other.wgsl}, ${v.wgsl})")

// ---------------------------------------------------------------------------
// Vec4 — LocalVec4 <: Vec4Expr
// ---------------------------------------------------------------------------

given Vec4BaseG[FloatExpr, Vec4Expr] =
  new Vec4BaseG[FloatExpr, Vec4Expr]:
    extension (v: Vec4Expr)
      def x: FloatExpr = FloatExpr(s"${v.wgsl}.x")
      def y: FloatExpr = FloatExpr(s"${v.wgsl}.y")
      def z: FloatExpr = FloatExpr(s"${v.wgsl}.z")
      def w: FloatExpr = FloatExpr(s"${v.wgsl}.w")
      def dot(other: Vec4Expr): FloatExpr = FloatExpr(
        s"dot(${v.wgsl}, ${other.wgsl})",
      )
      def length_squared: FloatExpr = FloatExpr(s"dot(${v.wgsl}, ${v.wgsl})")
      def length: FloatExpr = FloatExpr(s"length(${v.wgsl})")

given Vec4ImmutableOpsG[FloatExpr, Vec4Expr]:
  def create(x: FloatExpr, y: FloatExpr, z: FloatExpr, w: FloatExpr): Vec4Expr =
    Vec4Expr(s"vec4<f32>(${x.wgsl}, ${y.wgsl}, ${z.wgsl}, ${w.wgsl})")

  extension (v: Vec4Expr)(using Vec4BaseG[FloatExpr, Vec4Expr])
    @annotation.targetName("addVecG")
    override def +(other: Vec4Expr): Vec4Expr =
      Vec4Expr(s"(${v.wgsl} + ${other.wgsl})")
    @annotation.targetName("addScalarG")
    override def +(scalar: FloatExpr): Vec4Expr =
      Vec4Expr(s"(${v.wgsl} + ${scalar.wgsl})")
    @annotation.targetName("negateVecG")
    override def unary_- : Vec4Expr = Vec4Expr(s"(-${v.wgsl})")
    @annotation.targetName("subVecG")
    override def -(other: Vec4Expr): Vec4Expr =
      Vec4Expr(s"(${v.wgsl} - ${other.wgsl})")
    @annotation.targetName("subScalarG")
    override def -(scalar: FloatExpr): Vec4Expr =
      Vec4Expr(s"(${v.wgsl} - ${scalar.wgsl})")
    @annotation.targetName("mulVecG")
    override def *(other: Vec4Expr): Vec4Expr =
      Vec4Expr(s"(${v.wgsl} * ${other.wgsl})")
    @annotation.targetName("mulScalarG")
    override def *(scalar: FloatExpr): Vec4Expr =
      Vec4Expr(s"(${v.wgsl} * ${scalar.wgsl})")
    @annotation.targetName("divVecG")
    override def /(other: Vec4Expr): Vec4Expr =
      Vec4Expr(s"(${v.wgsl} / ${other.wgsl})")
    @annotation.targetName("divScalarG")
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
    override def fit0111: Vec4Expr = Vec4Expr(s"(${v.wgsl} * 2.0 - 1.0)")
    override def fit1101: Vec4Expr = Vec4Expr(s"(${v.wgsl} * 0.5 + 0.5)")
    @annotation.targetName("mixVecG")
    override def mix(b: Vec4Expr, t: Vec4Expr): Vec4Expr =
      Vec4Expr(s"mix(${v.wgsl}, ${b.wgsl}, ${t.wgsl})")
    @annotation.targetName("mixScalarG")
    override def mix(b: Vec4Expr, t: FloatExpr): Vec4Expr =
      Vec4Expr(s"mix(${v.wgsl}, ${b.wgsl}, ${t.wgsl})")
    @annotation.targetName("stepVecG")
    override def step(edge: Vec4Expr): Vec4Expr =
      Vec4Expr(s"step(${edge.wgsl}, ${v.wgsl})")
    @annotation.targetName("stepScalarG")
    override def step(edge: FloatExpr): Vec4Expr =
      Vec4Expr(s"step(${edge.wgsl}, ${v.wgsl})")
    override def smoothstep(edge0: Vec4Expr, edge1: Vec4Expr): Vec4Expr =
      Vec4Expr(s"smoothstep(${edge0.wgsl}, ${edge1.wgsl}, ${v.wgsl})")
    @annotation.targetName("ltVecG")
    override def <(other: Vec4Expr): Vec4Expr =
      Vec4Expr(s"(1.0 - step(${other.wgsl}, ${v.wgsl}))")
    @annotation.targetName("lteVecG")
    override def <=(other: Vec4Expr): Vec4Expr =
      Vec4Expr(s"step(${v.wgsl}, ${other.wgsl})")
    @annotation.targetName("gtVecG")
    override def >(other: Vec4Expr): Vec4Expr =
      Vec4Expr(s"(1.0 - step(${v.wgsl}, ${other.wgsl}))")
    @annotation.targetName("gteVecG")
    override def >=(other: Vec4Expr): Vec4Expr =
      Vec4Expr(s"step(${other.wgsl}, ${v.wgsl})")

// ---------------------------------------------------------------------------
// Mat2
// ---------------------------------------------------------------------------

given Mat2BaseG[FloatExpr, Mat2Expr] =
  new Mat2BaseG[FloatExpr, Mat2Expr]:
    extension (m: Mat2Expr)
      def m00: FloatExpr = FloatExpr(s"${m.wgsl}[0][0]")
      def m01: FloatExpr = FloatExpr(s"${m.wgsl}[0][1]")
      def m10: FloatExpr = FloatExpr(s"${m.wgsl}[1][0]")
      def m11: FloatExpr = FloatExpr(s"${m.wgsl}[1][1]")
      def determinant: FloatExpr =
        FloatExpr(s"determinant(${m.wgsl})")

given Mat2ImmutableOpsG[FloatExpr, Mat2Expr]:
  def create(
      m00: FloatExpr,
      m01: FloatExpr,
      m10: FloatExpr,
      m11: FloatExpr,
  ): Mat2Expr =
    Mat2Expr(s"mat2x2<f32>(${m00.wgsl}, ${m01.wgsl}, ${m10.wgsl}, ${m11.wgsl})")

  extension (m: Mat2Expr)(using Mat2BaseG[FloatExpr, Mat2Expr])
    @annotation.targetName("matMulG")
    override def *(other: Mat2Expr): Mat2Expr =
      Mat2Expr(s"(${m.wgsl} * ${other.wgsl})")
    @annotation.targetName("vecMulG")
    override def *[Vec](v: Vec)(using
        Vec2BaseG[FloatExpr, Vec],
        Vec2ImmutableOpsG[FloatExpr, Vec],
    ): Vec =
      Vec2Expr(s"(${m.wgsl} * ${v.asInstanceOf[Expr].wgsl})").asInstanceOf[Vec]

// ---------------------------------------------------------------------------
// Mat3
// ---------------------------------------------------------------------------

given Mat3BaseG[FloatExpr, Mat3Expr] =
  new Mat3BaseG[FloatExpr, Mat3Expr]:
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
      def determinant: FloatExpr =
        FloatExpr(s"determinant(${m.wgsl})")

given Mat3ImmutableOpsG[FloatExpr, Mat3Expr]:
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

  extension (m: Mat3Expr)(using Mat3BaseG[FloatExpr, Mat3Expr])
    @annotation.targetName("matMulG")
    override def *(other: Mat3Expr): Mat3Expr =
      Mat3Expr(s"(${m.wgsl} * ${other.wgsl})")
    @annotation.targetName("vecMulG")
    override def *[Vec](v: Vec)(using
        Vec3BaseG[FloatExpr, Vec],
        Vec3ImmutableOpsG[FloatExpr, Vec],
    ): Vec =
      Vec3Expr(s"(${m.wgsl} * ${v.asInstanceOf[Expr].wgsl})").asInstanceOf[Vec]

// ---------------------------------------------------------------------------
// Mat4
// ---------------------------------------------------------------------------

given Mat4BaseG[FloatExpr, Mat4Expr] =
  new Mat4BaseG[FloatExpr, Mat4Expr]:
    extension (m: Mat4Expr)
      def m00: FloatExpr = FloatExpr(s"${m.wgsl}[0][0]")
      def m01: FloatExpr = FloatExpr(s"${m.wgsl}[0][1]")
      def m02: FloatExpr = FloatExpr(s"${m.wgsl}[0][2]")
      def m03: FloatExpr = FloatExpr(s"${m.wgsl}[0][3]")
      def m10: FloatExpr = FloatExpr(s"${m.wgsl}[1][0]")
      def m11: FloatExpr = FloatExpr(s"${m.wgsl}[1][1]")
      def m12: FloatExpr = FloatExpr(s"${m.wgsl}[1][2]")
      def m13: FloatExpr = FloatExpr(s"${m.wgsl}[1][3]")
      def m20: FloatExpr = FloatExpr(s"${m.wgsl}[2][0]")
      def m21: FloatExpr = FloatExpr(s"${m.wgsl}[2][1]")
      def m22: FloatExpr = FloatExpr(s"${m.wgsl}[2][2]")
      def m23: FloatExpr = FloatExpr(s"${m.wgsl}[2][3]")
      def m30: FloatExpr = FloatExpr(s"${m.wgsl}[3][0]")
      def m31: FloatExpr = FloatExpr(s"${m.wgsl}[3][1]")
      def m32: FloatExpr = FloatExpr(s"${m.wgsl}[3][2]")
      def m33: FloatExpr = FloatExpr(s"${m.wgsl}[3][3]")
      def determinant: FloatExpr =
        FloatExpr(s"determinant(${m.wgsl})")

// format: off
given Mat4ImmutableOpsG[FloatExpr, Mat4Expr]:
  def create(
      m00: FloatExpr, m01: FloatExpr, m02: FloatExpr, m03: FloatExpr,
      m10: FloatExpr, m11: FloatExpr, m12: FloatExpr, m13: FloatExpr,
      m20: FloatExpr, m21: FloatExpr, m22: FloatExpr, m23: FloatExpr,
      m30: FloatExpr, m31: FloatExpr, m32: FloatExpr, m33: FloatExpr,
  ): Mat4Expr =
    Mat4Expr(s"mat4x4<f32>(${m00.wgsl}, ${m01.wgsl}, ${m02.wgsl}, ${m03.wgsl}, ${m10.wgsl}, ${m11.wgsl}, ${m12.wgsl}, ${m13.wgsl}, ${m20.wgsl}, ${m21.wgsl}, ${m22.wgsl}, ${m23.wgsl}, ${m30.wgsl}, ${m31.wgsl}, ${m32.wgsl}, ${m33.wgsl})")
  // format: on

  extension (m: Mat4Expr)(using Mat4BaseG[FloatExpr, Mat4Expr])
    @annotation.targetName("matMulG")
    override def *(other: Mat4Expr): Mat4Expr =
      Mat4Expr(s"(${m.wgsl} * ${other.wgsl})")
    @annotation.targetName("vecMulG")
    override def *[Vec](v: Vec)(using
        Vec4BaseG[FloatExpr, Vec],
        Vec4ImmutableOpsG[FloatExpr, Vec],
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

// ---------------------------------------------------------------------------
// Integer literal helpers
// ---------------------------------------------------------------------------

given Conversion[UInt, UIntExpr] = v => UIntExpr(s"${v.toInt}u")

extension (v: Int) inline def i: IntExpr = IntExpr(v)

// ---------------------------------------------------------------------------
// NumOps for IntExpr (signed i32 arithmetic)
// ---------------------------------------------------------------------------

given NumOps[IntExpr]:
  extension (a: IntExpr)
    def +(b: IntExpr): IntExpr = IntExpr(s"(${a.wgsl} + ${b.wgsl})")
    def -(b: IntExpr): IntExpr = IntExpr(s"(${a.wgsl} - ${b.wgsl})")
    def *(b: IntExpr): IntExpr = IntExpr(s"(${a.wgsl} * ${b.wgsl})")
    def /(b: IntExpr): IntExpr = IntExpr(s"(${a.wgsl} / ${b.wgsl})")
    def unary_- : IntExpr = IntExpr(s"(-${a.wgsl})")
  def zero: IntExpr = IntExpr("0")
  def one: IntExpr = IntExpr("1")

// ---------------------------------------------------------------------------
// NumOps for UIntExpr (unsigned u32 arithmetic; unary_- wraps modulo 2^32)
// ---------------------------------------------------------------------------

given NumOps[UIntExpr]:
  extension (a: UIntExpr)
    def +(b: UIntExpr): UIntExpr = UIntExpr(s"(${a.wgsl} + ${b.wgsl})")
    def -(b: UIntExpr): UIntExpr = UIntExpr(s"(${a.wgsl} - ${b.wgsl})")
    def *(b: UIntExpr): UIntExpr = UIntExpr(s"(${a.wgsl} * ${b.wgsl})")
    def /(b: UIntExpr): UIntExpr = UIntExpr(s"(${a.wgsl} / ${b.wgsl})")
    def unary_- : UIntExpr = UIntExpr(s"(0u - ${a.wgsl})")
  def zero: UIntExpr = UIntExpr("0u")
  def one: UIntExpr = UIntExpr("1u")

// ---------------------------------------------------------------------------
// IntExt for IntExpr — min, max, clamp, comparison predicates
// ---------------------------------------------------------------------------

given IntExt[IntExpr]:
  extension (a: IntExpr)
    def min(b: IntExpr): IntExpr = IntExpr(s"min(${a.wgsl}, ${b.wgsl})")
    def max(b: IntExpr): IntExpr = IntExpr(s"max(${a.wgsl}, ${b.wgsl})")
    def clamp(lo: IntExpr, hi: IntExpr): IntExpr =
      IntExpr(s"clamp(${a.wgsl}, ${lo.wgsl}, ${hi.wgsl})")
    def gte(edge: IntExpr): IntExpr =
      IntExpr(s"select(0, 1, ${a.wgsl} >= ${edge.wgsl})")
    def gt(edge: IntExpr): IntExpr =
      IntExpr(s"select(0, 1, ${a.wgsl} > ${edge.wgsl})")
    def lte(edge: IntExpr): IntExpr =
      IntExpr(s"select(0, 1, ${a.wgsl} <= ${edge.wgsl})")
    def lt(edge: IntExpr): IntExpr =
      IntExpr(s"select(0, 1, ${a.wgsl} < ${edge.wgsl})")

// ---------------------------------------------------------------------------
// IntExt for UIntExpr
// ---------------------------------------------------------------------------

given IntExt[UIntExpr]:
  extension (a: UIntExpr)
    def min(b: UIntExpr): UIntExpr = UIntExpr(s"min(${a.wgsl}, ${b.wgsl})")
    def max(b: UIntExpr): UIntExpr = UIntExpr(s"max(${a.wgsl}, ${b.wgsl})")
    def clamp(lo: UIntExpr, hi: UIntExpr): UIntExpr =
      UIntExpr(s"clamp(${a.wgsl}, ${lo.wgsl}, ${hi.wgsl})")
    def gte(edge: UIntExpr): UIntExpr =
      UIntExpr(s"select(0u, 1u, ${a.wgsl} >= ${edge.wgsl})")
    def gt(edge: UIntExpr): UIntExpr =
      UIntExpr(s"select(0u, 1u, ${a.wgsl} > ${edge.wgsl})")
    def lte(edge: UIntExpr): UIntExpr =
      UIntExpr(s"select(0u, 1u, ${a.wgsl} <= ${edge.wgsl})")
    def lt(edge: UIntExpr): UIntExpr =
      UIntExpr(s"select(0u, 1u, ${a.wgsl} < ${edge.wgsl})")

// ---------------------------------------------------------------------------
// IntExpr — abs, sign, and bitwise operators
// ---------------------------------------------------------------------------

extension (a: IntExpr)
  def abs: IntExpr = IntExpr(s"abs(${a.wgsl})")
  def sign: IntExpr = IntExpr(s"sign(${a.wgsl})")

  /** Bitwise OR — output bit is 1 if either operand has that bit set.
    * Used to combine flag sets. Alias: [[or]]. */
  @annotation.targetName("intOrExpr")
  def |(b: IntExpr): IntExpr = IntExpr(s"(${a.wgsl} | ${b.wgsl})")
  /** Bitwise OR with a compile-time constant — useful for setting known flag bits. */
  @annotation.targetName("intOrInt")
  def |(b: Int): IntExpr = IntExpr(s"(${a.wgsl} | $b)")

  /** Bitwise AND — output bit is 1 only when both operands have that bit set.
    * Standard masking tool: `x & 0xff` keeps the low 8 bits. Alias: [[and]]. */
  @annotation.targetName("intAndExpr")
  def &(b: IntExpr): IntExpr = IntExpr(s"(${a.wgsl} & ${b.wgsl})")
  /** Bitwise AND with a compile-time constant — useful for hex masks. */
  @annotation.targetName("intAndInt")
  def &(b: Int): IntExpr = IntExpr(s"(${a.wgsl} & $b)")

  /** Bitwise XOR — output bit is 1 when exactly one operand has that bit set.
    * Core hash-mixing primitive (`x ^ (x >> 16)`). Alias: [[xor]]. */
  @annotation.targetName("intXorExpr")
  def ^(b: IntExpr): IntExpr = IntExpr(s"(${a.wgsl} ^ ${b.wgsl})")
  /** Bitwise XOR with a compile-time constant. */
  @annotation.targetName("intXorInt")
  def ^(b: Int): IntExpr = IntExpr(s"(${a.wgsl} ^ $b)")

  /** Shift left by b positions — multiplies by 2^b, zero-fills low bits.
    * Alias: [[shl]]. */
  @annotation.targetName("intShlExpr")
  def <<(b: IntExpr): IntExpr = IntExpr(s"(${a.wgsl} << ${b.wgsl})")
  /** Shift left by a compile-time count. */
  @annotation.targetName("intShlInt")
  def <<(b: Int): IntExpr = IntExpr(s"(${a.wgsl} << $b)")

  /** Arithmetic shift right — sign bit is preserved. Equivalent to division
    * by 2^b rounding toward negative infinity. Alias: [[shr]]. */
  @annotation.targetName("intShrExpr")
  def >>(b: IntExpr): IntExpr = IntExpr(s"(${a.wgsl} >> ${b.wgsl})")
  /** Arithmetic shift right by a compile-time count. */
  @annotation.targetName("intShrInt")
  def >>(b: Int): IntExpr = IntExpr(s"(${a.wgsl} >> $b)")

  /** Bitwise NOT — flips every bit. For i32: `~x == -x - 1`. Alias: [[not]]. */
  @annotation.targetName("intBitNot")
  def unary_~ : IntExpr = IntExpr(s"(~${a.wgsl})")

  @annotation.targetName("intOr") inline def or(b: IntExpr): IntExpr = a | b
  @annotation.targetName("intAnd") inline def and(b: IntExpr): IntExpr = a & b
  @annotation.targetName("intXor") inline def xor(b: IntExpr): IntExpr = a ^ b
  @annotation.targetName("intShl") inline def shl(b: IntExpr): IntExpr = a << b
  @annotation.targetName("intShr") inline def shr(b: IntExpr): IntExpr = a >> b
  @annotation.targetName("intNot") inline def not: IntExpr = ~a

// ---------------------------------------------------------------------------
// UIntExpr — bitwise operators (logical right shift, u suffix on Int constants)
// ---------------------------------------------------------------------------

extension (a: UIntExpr)
  /** Bitwise OR — combines bits from both operands. Alias: [[or]]. */
  @annotation.targetName("uintOrExpr")
  def |(b: UIntExpr): UIntExpr = UIntExpr(s"(${a.wgsl} | ${b.wgsl})")
  /** Bitwise OR with a compile-time constant (emits `u` suffix). */
  @annotation.targetName("uintOrInt")
  def |(b: Int): UIntExpr = UIntExpr(s"(${a.wgsl} | ${b}u)")

  /** Bitwise AND — keeps only bits set in both operands. Alias: [[and]]. */
  @annotation.targetName("uintAndExpr")
  def &(b: UIntExpr): UIntExpr = UIntExpr(s"(${a.wgsl} & ${b.wgsl})")
  /** Bitwise AND with a compile-time constant (emits `u` suffix). */
  @annotation.targetName("uintAndInt")
  def &(b: Int): UIntExpr = UIntExpr(s"(${a.wgsl} & ${b}u)")

  /** Bitwise XOR — flips bits where the other operand has 1s. The hashing
    * workhorse. Alias: [[xor]]. */
  @annotation.targetName("uintXorExpr")
  def ^(b: UIntExpr): UIntExpr = UIntExpr(s"(${a.wgsl} ^ ${b.wgsl})")
  /** Bitwise XOR with a compile-time constant (emits `u` suffix). */
  @annotation.targetName("uintXorInt")
  def ^(b: Int): UIntExpr = UIntExpr(s"(${a.wgsl} ^ ${b}u)")

  /** Shift left — zero-fills low bits. Alias: [[shl]]. */
  @annotation.targetName("uintShlExpr")
  def <<(b: UIntExpr): UIntExpr = UIntExpr(s"(${a.wgsl} << ${b.wgsl})")
  /** Shift left by a compile-time count (emits `u` suffix). */
  @annotation.targetName("uintShlInt")
  def <<(b: Int): UIntExpr = UIntExpr(s"(${a.wgsl} << ${b}u)")

  /** Logical (zero-fill) shift right — high bits become 0, unlike `IntExpr.>>`
    * which preserves the sign bit. Alias: [[shr]]. */
  @annotation.targetName("uintShrExpr")
  def >>(b: UIntExpr): UIntExpr = UIntExpr(s"(${a.wgsl} >> ${b.wgsl})")
  /** Logical shift right by a compile-time count (emits `u` suffix). */
  @annotation.targetName("uintShrInt")
  def >>(b: Int): UIntExpr = UIntExpr(s"(${a.wgsl} >> ${b}u)")

  /** Bitwise NOT — flips every bit. Alias: [[not]]. */
  @annotation.targetName("uintBitNot")
  def unary_~ : UIntExpr = UIntExpr(s"(~${a.wgsl})")

  @annotation.targetName("uintOr") inline def or(b: UIntExpr): UIntExpr = a | b
  @annotation.targetName("uintAnd") inline def and(b: UIntExpr): UIntExpr = a & b
  @annotation.targetName("uintXor") inline def xor(b: UIntExpr): UIntExpr = a ^ b
  @annotation.targetName("uintShl") inline def shl(b: UIntExpr): UIntExpr = a << b
  @annotation.targetName("uintShr") inline def shr(b: UIntExpr): UIntExpr = a >> b
  @annotation.targetName("uintNot") inline def not: UIntExpr = ~a

// ---------------------------------------------------------------------------
// Type conversion extensions (i32/u32/f32 casts)
// ---------------------------------------------------------------------------

extension (a: FloatExpr)
  def toI32: IntExpr = IntExpr(s"i32(${a.wgsl})")
  def toU32: UIntExpr = UIntExpr(s"u32(${a.wgsl})")
  def bitsToU32: UIntExpr = UIntExpr(s"bitcast<u32>(${a.wgsl})")

extension (a: IntExpr)
  @annotation.targetName("intToF32")
  def toF32: FloatExpr = FloatExpr(s"f32(${a.wgsl})")
  @annotation.targetName("intToU32")
  def toU32: UIntExpr = UIntExpr(s"u32(${a.wgsl})")

extension (a: UIntExpr)
  @annotation.targetName("uintToF32")
  def toF32: FloatExpr = FloatExpr(s"f32(${a.wgsl})")
  @annotation.targetName("uintToI32")
  def toI32: IntExpr = IntExpr(s"i32(${a.wgsl})")
  def bitsToF32: FloatExpr = FloatExpr(s"bitcast<f32>(${a.wgsl})")

// ---------------------------------------------------------------------------
// Bitcast extensions for vectors
// ---------------------------------------------------------------------------

extension (v: Vec2Expr)
  @annotation.targetName("vec2BitsToU32")
  def bitsToU32: UVec2Expr = UVec2Expr(s"bitcast<vec2<u32>>(${v.wgsl})")

extension (v: UVec2Expr)
  @annotation.targetName("uvec2BitsToF32")
  def bitsToF32: Vec2Expr = Vec2Expr(s"bitcast<vec2<f32>>(${v.wgsl})")

extension (v: Vec3Expr)
  @annotation.targetName("vec3BitsToU32")
  def bitsToU32: UVec3Expr = UVec3Expr(s"bitcast<vec3<u32>>(${v.wgsl})")

extension (v: UVec3Expr)
  @annotation.targetName("uvec3BitsToF32")
  def bitsToF32: Vec3Expr = Vec3Expr(s"bitcast<vec3<f32>>(${v.wgsl})")

extension (v: Vec4Expr)
  @annotation.targetName("vec4BitsToU32")
  def bitsToU32: UVec4Expr = UVec4Expr(s"bitcast<vec4<u32>>(${v.wgsl})")

extension (v: UVec4Expr)
  @annotation.targetName("uvec4BitsToF32")
  def bitsToF32: Vec4Expr = Vec4Expr(s"bitcast<vec4<f32>>(${v.wgsl})")

// ---------------------------------------------------------------------------
// IVec2Expr — signed integer 2-vector operations
// ---------------------------------------------------------------------------

extension (v: IVec2Expr)
  @annotation.targetName("ivec2X")
  def x: IntExpr = IntExpr(s"${v.wgsl}.x")
  @annotation.targetName("ivec2Y")
  def y: IntExpr = IntExpr(s"${v.wgsl}.y")
  @annotation.targetName("ivec2AddVec")
  def +(other: IVec2Expr): IVec2Expr = IVec2Expr(s"(${v.wgsl} + ${other.wgsl})")
  @annotation.targetName("ivec2AddScalar")
  def +(s: IntExpr): IVec2Expr = IVec2Expr(s"(${v.wgsl} + ${s.wgsl})")
  @annotation.targetName("ivec2SubVec")
  def -(other: IVec2Expr): IVec2Expr = IVec2Expr(s"(${v.wgsl} - ${other.wgsl})")
  @annotation.targetName("ivec2SubScalar")
  def -(s: IntExpr): IVec2Expr = IVec2Expr(s"(${v.wgsl} - ${s.wgsl})")
  @annotation.targetName("ivec2MulVec")
  def *(other: IVec2Expr): IVec2Expr = IVec2Expr(s"(${v.wgsl} * ${other.wgsl})")
  @annotation.targetName("ivec2MulScalar")
  def *(s: IntExpr): IVec2Expr = IVec2Expr(s"(${v.wgsl} * ${s.wgsl})")
  @annotation.targetName("ivec2DivVec")
  def /(other: IVec2Expr): IVec2Expr = IVec2Expr(s"(${v.wgsl} / ${other.wgsl})")
  @annotation.targetName("ivec2Negate")
  def unary_- : IVec2Expr = IVec2Expr(s"(-${v.wgsl})")
  @annotation.targetName("ivec2Abs")
  def abs: IVec2Expr = IVec2Expr(s"abs(${v.wgsl})")
  @annotation.targetName("ivec2Min")
  def min(other: IVec2Expr): IVec2Expr = IVec2Expr(s"min(${v.wgsl}, ${other.wgsl})")
  @annotation.targetName("ivec2Max")
  def max(other: IVec2Expr): IVec2Expr = IVec2Expr(s"max(${v.wgsl}, ${other.wgsl})")
  @annotation.targetName("ivec2Or")
  def |(other: IVec2Expr): IVec2Expr = IVec2Expr(s"(${v.wgsl} | ${other.wgsl})")
  @annotation.targetName("ivec2And")
  def &(other: IVec2Expr): IVec2Expr = IVec2Expr(s"(${v.wgsl} & ${other.wgsl})")
  @annotation.targetName("ivec2Xor")
  def ^(other: IVec2Expr): IVec2Expr = IVec2Expr(s"(${v.wgsl} ^ ${other.wgsl})")
  @annotation.targetName("ivec2Not")
  def unary_~ : IVec2Expr = IVec2Expr(s"(~${v.wgsl})")

// ---------------------------------------------------------------------------
// UVec2Expr — unsigned integer 2-vector operations
// ---------------------------------------------------------------------------

extension (v: UVec2Expr)
  @annotation.targetName("uvec2X")
  def x: UIntExpr = UIntExpr(s"${v.wgsl}.x")
  @annotation.targetName("uvec2Y")
  def y: UIntExpr = UIntExpr(s"${v.wgsl}.y")
  @annotation.targetName("uvec2AddVec")
  def +(other: UVec2Expr): UVec2Expr = UVec2Expr(s"(${v.wgsl} + ${other.wgsl})")
  @annotation.targetName("uvec2AddScalar")
  def +(s: UIntExpr): UVec2Expr = UVec2Expr(s"(${v.wgsl} + ${s.wgsl})")
  @annotation.targetName("uvec2SubVec")
  def -(other: UVec2Expr): UVec2Expr = UVec2Expr(s"(${v.wgsl} - ${other.wgsl})")
  @annotation.targetName("uvec2MulVec")
  def *(other: UVec2Expr): UVec2Expr = UVec2Expr(s"(${v.wgsl} * ${other.wgsl})")
  @annotation.targetName("uvec2MulScalar")
  def *(s: UIntExpr): UVec2Expr = UVec2Expr(s"(${v.wgsl} * ${s.wgsl})")
  @annotation.targetName("uvec2DivVec")
  def /(other: UVec2Expr): UVec2Expr = UVec2Expr(s"(${v.wgsl} / ${other.wgsl})")
  @annotation.targetName("uvec2Min")
  def min(other: UVec2Expr): UVec2Expr = UVec2Expr(s"min(${v.wgsl}, ${other.wgsl})")
  @annotation.targetName("uvec2Max")
  def max(other: UVec2Expr): UVec2Expr = UVec2Expr(s"max(${v.wgsl}, ${other.wgsl})")
  @annotation.targetName("uvec2Or")
  def |(other: UVec2Expr): UVec2Expr = UVec2Expr(s"(${v.wgsl} | ${other.wgsl})")
  @annotation.targetName("uvec2And")
  def &(other: UVec2Expr): UVec2Expr = UVec2Expr(s"(${v.wgsl} & ${other.wgsl})")
  @annotation.targetName("uvec2Xor")
  def ^(other: UVec2Expr): UVec2Expr = UVec2Expr(s"(${v.wgsl} ^ ${other.wgsl})")
  @annotation.targetName("uvec2Not")
  def unary_~ : UVec2Expr = UVec2Expr(s"(~${v.wgsl})")

// ---------------------------------------------------------------------------
// IVec3Expr — signed integer 3-vector operations
// ---------------------------------------------------------------------------

extension (v: IVec3Expr)
  @annotation.targetName("ivec3X")
  def x: IntExpr = IntExpr(s"${v.wgsl}.x")
  @annotation.targetName("ivec3Y")
  def y: IntExpr = IntExpr(s"${v.wgsl}.y")
  @annotation.targetName("ivec3Z")
  def z: IntExpr = IntExpr(s"${v.wgsl}.z")
  @annotation.targetName("ivec3AddVec")
  def +(other: IVec3Expr): IVec3Expr = IVec3Expr(s"(${v.wgsl} + ${other.wgsl})")
  @annotation.targetName("ivec3SubVec")
  def -(other: IVec3Expr): IVec3Expr = IVec3Expr(s"(${v.wgsl} - ${other.wgsl})")
  @annotation.targetName("ivec3MulVec")
  def *(other: IVec3Expr): IVec3Expr = IVec3Expr(s"(${v.wgsl} * ${other.wgsl})")
  @annotation.targetName("ivec3MulScalar")
  def *(s: IntExpr): IVec3Expr = IVec3Expr(s"(${v.wgsl} * ${s.wgsl})")
  @annotation.targetName("ivec3Negate")
  def unary_- : IVec3Expr = IVec3Expr(s"(-${v.wgsl})")
  @annotation.targetName("ivec3Abs")
  def abs: IVec3Expr = IVec3Expr(s"abs(${v.wgsl})")
  @annotation.targetName("ivec3Min")
  def min(other: IVec3Expr): IVec3Expr = IVec3Expr(s"min(${v.wgsl}, ${other.wgsl})")
  @annotation.targetName("ivec3Max")
  def max(other: IVec3Expr): IVec3Expr = IVec3Expr(s"max(${v.wgsl}, ${other.wgsl})")
  @annotation.targetName("ivec3Or")
  def |(other: IVec3Expr): IVec3Expr = IVec3Expr(s"(${v.wgsl} | ${other.wgsl})")
  @annotation.targetName("ivec3And")
  def &(other: IVec3Expr): IVec3Expr = IVec3Expr(s"(${v.wgsl} & ${other.wgsl})")
  @annotation.targetName("ivec3Xor")
  def ^(other: IVec3Expr): IVec3Expr = IVec3Expr(s"(${v.wgsl} ^ ${other.wgsl})")
  @annotation.targetName("ivec3Not")
  def unary_~ : IVec3Expr = IVec3Expr(s"(~${v.wgsl})")

// ---------------------------------------------------------------------------
// UVec3Expr — unsigned integer 3-vector operations
// ---------------------------------------------------------------------------

extension (v: UVec3Expr)
  @annotation.targetName("uvec3X")
  def x: UIntExpr = UIntExpr(s"${v.wgsl}.x")
  @annotation.targetName("uvec3Y")
  def y: UIntExpr = UIntExpr(s"${v.wgsl}.y")
  @annotation.targetName("uvec3Z")
  def z: UIntExpr = UIntExpr(s"${v.wgsl}.z")
  @annotation.targetName("uvec3AddVec")
  def +(other: UVec3Expr): UVec3Expr = UVec3Expr(s"(${v.wgsl} + ${other.wgsl})")
  @annotation.targetName("uvec3SubVec")
  def -(other: UVec3Expr): UVec3Expr = UVec3Expr(s"(${v.wgsl} - ${other.wgsl})")
  @annotation.targetName("uvec3MulVec")
  def *(other: UVec3Expr): UVec3Expr = UVec3Expr(s"(${v.wgsl} * ${other.wgsl})")
  @annotation.targetName("uvec3MulScalar")
  def *(s: UIntExpr): UVec3Expr = UVec3Expr(s"(${v.wgsl} * ${s.wgsl})")
  @annotation.targetName("uvec3Min")
  def min(other: UVec3Expr): UVec3Expr = UVec3Expr(s"min(${v.wgsl}, ${other.wgsl})")
  @annotation.targetName("uvec3Max")
  def max(other: UVec3Expr): UVec3Expr = UVec3Expr(s"max(${v.wgsl}, ${other.wgsl})")
  @annotation.targetName("uvec3Or")
  def |(other: UVec3Expr): UVec3Expr = UVec3Expr(s"(${v.wgsl} | ${other.wgsl})")
  @annotation.targetName("uvec3And")
  def &(other: UVec3Expr): UVec3Expr = UVec3Expr(s"(${v.wgsl} & ${other.wgsl})")
  @annotation.targetName("uvec3Xor")
  def ^(other: UVec3Expr): UVec3Expr = UVec3Expr(s"(${v.wgsl} ^ ${other.wgsl})")
  @annotation.targetName("uvec3Not")
  def unary_~ : UVec3Expr = UVec3Expr(s"(~${v.wgsl})")

// ---------------------------------------------------------------------------
// IVec4Expr — signed integer 4-vector operations
// ---------------------------------------------------------------------------

extension (v: IVec4Expr)
  @annotation.targetName("ivec4X")
  def x: IntExpr = IntExpr(s"${v.wgsl}.x")
  @annotation.targetName("ivec4Y")
  def y: IntExpr = IntExpr(s"${v.wgsl}.y")
  @annotation.targetName("ivec4Z")
  def z: IntExpr = IntExpr(s"${v.wgsl}.z")
  @annotation.targetName("ivec4W")
  def w: IntExpr = IntExpr(s"${v.wgsl}.w")
  @annotation.targetName("ivec4AddVec")
  def +(other: IVec4Expr): IVec4Expr = IVec4Expr(s"(${v.wgsl} + ${other.wgsl})")
  @annotation.targetName("ivec4SubVec")
  def -(other: IVec4Expr): IVec4Expr = IVec4Expr(s"(${v.wgsl} - ${other.wgsl})")
  @annotation.targetName("ivec4MulVec")
  def *(other: IVec4Expr): IVec4Expr = IVec4Expr(s"(${v.wgsl} * ${other.wgsl})")
  @annotation.targetName("ivec4Negate")
  def unary_- : IVec4Expr = IVec4Expr(s"(-${v.wgsl})")
  @annotation.targetName("ivec4Or")
  def |(other: IVec4Expr): IVec4Expr = IVec4Expr(s"(${v.wgsl} | ${other.wgsl})")
  @annotation.targetName("ivec4And")
  def &(other: IVec4Expr): IVec4Expr = IVec4Expr(s"(${v.wgsl} & ${other.wgsl})")
  @annotation.targetName("ivec4Xor")
  def ^(other: IVec4Expr): IVec4Expr = IVec4Expr(s"(${v.wgsl} ^ ${other.wgsl})")
  @annotation.targetName("ivec4Not")
  def unary_~ : IVec4Expr = IVec4Expr(s"(~${v.wgsl})")

// ---------------------------------------------------------------------------
// UVec4Expr — unsigned integer 4-vector operations
// ---------------------------------------------------------------------------

extension (v: UVec4Expr)
  @annotation.targetName("uvec4X")
  def x: UIntExpr = UIntExpr(s"${v.wgsl}.x")
  @annotation.targetName("uvec4Y")
  def y: UIntExpr = UIntExpr(s"${v.wgsl}.y")
  @annotation.targetName("uvec4Z")
  def z: UIntExpr = UIntExpr(s"${v.wgsl}.z")
  @annotation.targetName("uvec4W")
  def w: UIntExpr = UIntExpr(s"${v.wgsl}.w")
  @annotation.targetName("uvec4AddVec")
  def +(other: UVec4Expr): UVec4Expr = UVec4Expr(s"(${v.wgsl} + ${other.wgsl})")
  @annotation.targetName("uvec4SubVec")
  def -(other: UVec4Expr): UVec4Expr = UVec4Expr(s"(${v.wgsl} - ${other.wgsl})")
  @annotation.targetName("uvec4MulVec")
  def *(other: UVec4Expr): UVec4Expr = UVec4Expr(s"(${v.wgsl} * ${other.wgsl})")
  @annotation.targetName("uvec4MulScalar")
  def *(s: UIntExpr): UVec4Expr = UVec4Expr(s"(${v.wgsl} * ${s.wgsl})")
  @annotation.targetName("uvec4Or")
  def |(other: UVec4Expr): UVec4Expr = UVec4Expr(s"(${v.wgsl} | ${other.wgsl})")
  @annotation.targetName("uvec4And")
  def &(other: UVec4Expr): UVec4Expr = UVec4Expr(s"(${v.wgsl} & ${other.wgsl})")
  @annotation.targetName("uvec4Xor")
  def ^(other: UVec4Expr): UVec4Expr = UVec4Expr(s"(${v.wgsl} ^ ${other.wgsl})")
  @annotation.targetName("uvec4Not")
  def unary_~ : UVec4Expr = UVec4Expr(s"(~${v.wgsl})")

// ---------------------------------------------------------------------------
// Integer vector constructors (lowercase, matching WGSL syntax)
// ---------------------------------------------------------------------------

object ivec2:
  def apply(x: IntExpr, y: IntExpr): IVec2Expr =
    IVec2Expr(s"vec2<i32>(${x.wgsl}, ${y.wgsl})")

object ivec3:
  def apply(x: IntExpr, y: IntExpr, z: IntExpr): IVec3Expr =
    IVec3Expr(s"vec3<i32>(${x.wgsl}, ${y.wgsl}, ${z.wgsl})")

object ivec4:
  def apply(x: IntExpr, y: IntExpr, z: IntExpr, w: IntExpr): IVec4Expr =
    IVec4Expr(s"vec4<i32>(${x.wgsl}, ${y.wgsl}, ${z.wgsl}, ${w.wgsl})")

object uvec2:
  def apply(x: UIntExpr, y: UIntExpr): UVec2Expr =
    UVec2Expr(s"vec2<u32>(${x.wgsl}, ${y.wgsl})")

object uvec3:
  def apply(x: UIntExpr, y: UIntExpr, z: UIntExpr): UVec3Expr =
    UVec3Expr(s"vec3<u32>(${x.wgsl}, ${y.wgsl}, ${z.wgsl})")

object uvec4:
  def apply(x: UIntExpr, y: UIntExpr, z: UIntExpr, w: UIntExpr): UVec4Expr =
    UVec4Expr(s"vec4<u32>(${x.wgsl}, ${y.wgsl}, ${z.wgsl}, ${w.wgsl})")
