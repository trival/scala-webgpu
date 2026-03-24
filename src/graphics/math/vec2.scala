package graphics.math

import trivalibs.utils.numbers.NumExt
import trivalibs.utils.numbers.NumOps

trait Vec2Base[Num: {NumExt, NumOps}, Vec]:

  extension (v: Vec)
    def x: Num
    def y: Num
    inline def u: Num = x
    inline def v: Num = y

    def dot(other: Vec): Num =
      v.x * other.x + v.y * other.y
    def length_squared: Num = v.dot(v)
    def length: Num = v.length_squared.sqrt

trait Vec2Mutable[Num: {NumExt, NumOps}, Vec] extends Vec2Base[Num, Vec]:
  extension (v: Vec)
    def x_=(value: Num): Unit
    def y_=(value: Num): Unit
    inline def u_=(value: Num): Unit = x_=(value)
    inline def v_=(value: Num): Unit = y_=(value)

trait Vec2ImmutableOps[Num: {NumExt, NumOps}, Vec]:

  def create(x: Num, y: Num): Vec
  def from[Num2, Vec2](
      other: Vec2,
  )(using Vec2Base[Num2, Vec2], Conversion[Num2, Num]): Vec =
    create(other.x, other.y)

  extension (v: Vec)(using Vec2Base[Num, Vec])
    @scala.annotation.targetName("addVec")
    def +(other: Vec): Vec = create(v.x + other.x, v.y + other.y)
    @scala.annotation.targetName("addScalar")
    def +(scalar: Num): Vec = create(v.x + scalar, v.y + scalar)
    @scala.annotation.targetName("negateVec")
    def unary_- : Vec = create(-v.x, -v.y)
    @scala.annotation.targetName("subVec")
    def -(other: Vec): Vec = create(v.x - other.x, v.y - other.y)
    @scala.annotation.targetName("subScalar")
    def -(scalar: Num): Vec = create(v.x - scalar, v.y - scalar)
    @scala.annotation.targetName("mulVec")
    def *(other: Vec): Vec = create(v.x * other.x, v.y * other.y)
    @scala.annotation.targetName("mulScalar")
    def *(scalar: Num): Vec = create(v.x * scalar, v.y * scalar)
    @scala.annotation.targetName("divVec")
    def /(other: Vec): Vec = create(v.x / other.x, v.y / other.y)
    @scala.annotation.targetName("divScalar")
    def /(scalar: Num): Vec = create(v.x / scalar, v.y / scalar)
    def normalize: Vec = v / v.length

    def abs: Vec = create(v.x.abs, v.y.abs)
    def sign: Vec = create(v.x.sign, v.y.sign)
    def floor: Vec = create(v.x.floor, v.y.floor)
    def ceil: Vec = create(v.x.ceil, v.y.ceil)
    def round: Vec = create(v.x.round, v.y.round)
    def fract: Vec = create(v.x.fract, v.y.fract)
    def exp: Vec = create(v.x.exp, v.y.exp)
    def log: Vec = create(v.x.log, v.y.log)
    def log2: Vec = create(v.x.log2, v.y.log2)
    def sqrt: Vec = create(v.x.sqrt, v.y.sqrt)

    def min(other: Vec): Vec = create(v.x.min(other.x), v.y.min(other.y))
    def max(other: Vec): Vec = create(v.x.max(other.x), v.y.max(other.y))
    def clamp(lo: Num, hi: Num): Vec =
      create(v.x.clamp(lo, hi), v.y.clamp(lo, hi))
    @scala.annotation.targetName("mixVec")
    def mix(b: Vec, t: Vec): Vec =
      create(v.x.mix(b.x, t.x), v.y.mix(b.y, t.y))
    @scala.annotation.targetName("mixScalar")
    def mix(b: Vec, t: Num): Vec =
      create(v.x.mix(b.x, t), v.y.mix(b.y, t))
    @scala.annotation.targetName("lerpVec")
    inline def lerp(b: Vec, t: Vec): Vec = v.mix(b, t)
    @scala.annotation.targetName("lerpScalar")
    inline def lerp(b: Vec, t: Num): Vec = v.mix(b, t)
    @scala.annotation.targetName("ltVec")
    def <(other: Vec): Vec = create(v.x.lt(other.x), v.y.lt(other.y))
    @scala.annotation.targetName("lteVec")
    def <=(other: Vec): Vec = create(v.x.lte(other.x), v.y.lte(other.y))
    @scala.annotation.targetName("gtVec")
    def >(other: Vec): Vec = create(v.x.gt(other.x), v.y.gt(other.y))
    @scala.annotation.targetName("gteVec")
    def >=(other: Vec): Vec = create(v.x.gte(other.x), v.y.gte(other.y))
    @scala.annotation.targetName("stepVec")
    def step(edge: Vec): Vec = create(v.x.step(edge.x), v.y.step(edge.y))
    @scala.annotation.targetName("stepScalar")
    def step(edge: Num): Vec = create(v.x.step(edge), v.y.step(edge))
    def smoothstep(edge0: Vec, edge1: Vec): Vec =
      create(v.x.smoothstep(edge0.x, edge1.x), v.y.smoothstep(edge0.y, edge1.y))

trait Vec2MutableOps[Num: {NumExt, NumOps}, Vec]:

  extension (v: Vec)(using Vec2Mutable[Num, Vec])
    def set[Num2, Vec2](
        other: Vec2,
    )(using Vec2Base[Num2, Vec2], Conversion[Num2, Num]): Unit =
      v.x = other.x; v.y = other.y
    def :=[Num2, Vec2](
        other: Vec2,
    )(using Vec2Base[Num2, Vec2], Conversion[Num2, Num]): Unit =
      v.set(other)

    def add(other: Vec, out: Vec = v): Vec =
      out.x = v.x + other.x
      out.y = v.y + other.y
      out
    def sub(other: Vec, out: Vec = v): Vec =
      out.x = v.x - other.x
      out.y = v.y - other.y
      out
    def mul(other: Vec, out: Vec = v): Vec =
      out.x = v.x * other.x
      out.y = v.y * other.y
      out
    def div(other: Vec, out: Vec = v): Vec =
      out.x = v.x / other.x
      out.y = v.y / other.y
      out

    def addS(scalar: Num, out: Vec = v): Vec =
      out.x = v.x + scalar
      out.y = v.y + scalar
      out
    def subS(scalar: Num, out: Vec = v): Vec =
      out.x = v.x - scalar
      out.y = v.y - scalar
      out
    def mulS(scalar: Num, out: Vec = v): Vec =
      out.x = v.x * scalar
      out.y = v.y * scalar
      out
    def divS(scalar: Num, out: Vec = v): Vec =
      out.x = v.x / scalar
      out.y = v.y / scalar
      out

    @scala.annotation.targetName("addVecAssign")
    def +=(other: Vec): Unit =
      v.add(other)
    @scala.annotation.targetName("addScalarAssign")
    def +=(scalar: Num): Unit =
      v.addS(scalar)
    @scala.annotation.targetName("subVecAssign")
    def -=(other: Vec): Unit =
      v.sub(other)
    @scala.annotation.targetName("subScalarAssign")
    def -=(scalar: Num): Unit =
      v.subS(scalar)
    @scala.annotation.targetName("mulScalarAssign")
    def *=(scalar: Num): Unit =
      v.mulS(scalar)
    @scala.annotation.targetName("divScalarAssign")
    def /=(scalar: Num): Unit =
      v.divS(scalar)
    @scala.annotation.targetName("mulComponentwiseAssign")
    def *=(other: Vec): Unit =
      v.mul(other)
    @scala.annotation.targetName("divComponentwiseAssign")
    def /=(other: Vec): Unit =
      v.div(other)

    def normalizeTo(out: Vec): Vec = v.divS(v.length, out)
    inline def normalizeSelf: Vec = v.normalizeTo(v)
