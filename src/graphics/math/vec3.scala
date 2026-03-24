package graphics.math

import trivalibs.utils.numbers.NumExt
import trivalibs.utils.numbers.NumOps

trait Vec3Base[Num: {NumExt, NumOps}, Vec]:

  extension (v: Vec)
    def x: Num
    def y: Num
    def z: Num
    inline def r: Num = x
    inline def g: Num = y
    inline def b: Num = z

    def dot(other: Vec): Num =
      v.x * other.x + v.y * other.y + v.z * other.z
    def length_squared: Num = v.dot(v)
    def length: Num = v.length_squared.sqrt

trait Vec3Mutable[Num: {NumExt, NumOps}, Vec] extends Vec3Base[Num, Vec]:
  extension (v: Vec)
    def x_=(value: Num): Unit
    def y_=(value: Num): Unit
    def z_=(value: Num): Unit
    inline def r_=(value: Num): Unit = x_=(value)
    inline def g_=(value: Num): Unit = y_=(value)
    inline def b_=(value: Num): Unit = z_=(value)

trait Vec3ImmutableOps[Num: {NumExt, NumOps}, Vec]:

  def create(x: Num, y: Num, z: Num): Vec

  inline def apply(x: Num, y: Num, z: Num): Vec = create(x, y, z)

  inline def apply[V2](xy: V2, z: Num)(using Vec2Base[Num, V2]): Vec =
    create(xy.x, xy.y, z)

  def from[Num2, Vec2](
      other: Vec2,
  )(using Vec3Base[Num2, Vec2], Conversion[Num2, Num]): Vec =
    create(other.x, other.y, other.z)

  extension (v: Vec)(using Vec3Base[Num, Vec])
    @scala.annotation.targetName("addVec")
    def +(other: Vec): Vec =
      create(v.x + other.x, v.y + other.y, v.z + other.z)
    @scala.annotation.targetName("addScalar")
    def +(scalar: Num): Vec =
      create(v.x + scalar, v.y + scalar, v.z + scalar)
    @scala.annotation.targetName("negateVec")
    def unary_- : Vec = create(-v.x, -v.y, -v.z)
    @scala.annotation.targetName("subVec")
    def -(other: Vec): Vec =
      create(v.x - other.x, v.y - other.y, v.z - other.z)
    @scala.annotation.targetName("subScalar")
    def -(scalar: Num): Vec =
      create(v.x - scalar, v.y - scalar, v.z - scalar)
    @scala.annotation.targetName("mulVec")
    def *(other: Vec): Vec =
      create(v.x * other.x, v.y * other.y, v.z * other.z)
    @scala.annotation.targetName("mulScalar")
    def *(scalar: Num): Vec =
      create(v.x * scalar, v.y * scalar, v.z * scalar)
    @scala.annotation.targetName("divVec")
    def /(other: Vec): Vec =
      create(v.x / other.x, v.y / other.y, v.z / other.z)
    @scala.annotation.targetName("divScalar")
    def /(scalar: Num): Vec =
      create(v.x / scalar, v.y / scalar, v.z / scalar)
    def cross(other: Vec): Vec =
      create(
        v.y * other.z - v.z * other.y,
        v.z * other.x - v.x * other.z,
        v.x * other.y - v.y * other.x,
      )
    def normalize: Vec = v / v.length

    def abs: Vec = create(v.x.abs, v.y.abs, v.z.abs)
    def sign: Vec = create(v.x.sign, v.y.sign, v.z.sign)
    def floor: Vec = create(v.x.floor, v.y.floor, v.z.floor)
    def ceil: Vec = create(v.x.ceil, v.y.ceil, v.z.ceil)
    def round: Vec = create(v.x.round, v.y.round, v.z.round)
    def fract: Vec = create(v.x.fract, v.y.fract, v.z.fract)
    def exp: Vec = create(v.x.exp, v.y.exp, v.z.exp)
    def log: Vec = create(v.x.log, v.y.log, v.z.log)
    def log2: Vec = create(v.x.log2, v.y.log2, v.z.log2)
    def sqrt: Vec = create(v.x.sqrt, v.y.sqrt, v.z.sqrt)

    def min(other: Vec): Vec =
      create(v.x.min(other.x), v.y.min(other.y), v.z.min(other.z))
    def max(other: Vec): Vec =
      create(v.x.max(other.x), v.y.max(other.y), v.z.max(other.z))
    def clamp(lo: Num, hi: Num): Vec =
      create(v.x.clamp(lo, hi), v.y.clamp(lo, hi), v.z.clamp(lo, hi))
    @scala.annotation.targetName("mixVec")
    def mix(b: Vec, t: Vec): Vec =
      create(v.x.mix(b.x, t.x), v.y.mix(b.y, t.y), v.z.mix(b.z, t.z))
    @scala.annotation.targetName("mixScalar")
    def mix(b: Vec, t: Num): Vec =
      create(v.x.mix(b.x, t), v.y.mix(b.y, t), v.z.mix(b.z, t))
    @scala.annotation.targetName("lerpVec")
    inline def lerp(b: Vec, t: Vec): Vec = v.mix(b, t)
    @scala.annotation.targetName("lerpScalar")
    inline def lerp(b: Vec, t: Num): Vec = v.mix(b, t)
    @scala.annotation.targetName("ltVec")
    def <(other: Vec): Vec =
      create(v.x.lt(other.x), v.y.lt(other.y), v.z.lt(other.z))
    @scala.annotation.targetName("lteVec")
    def <=(other: Vec): Vec =
      create(v.x.lte(other.x), v.y.lte(other.y), v.z.lte(other.z))
    @scala.annotation.targetName("gtVec")
    def >(other: Vec): Vec =
      create(v.x.gt(other.x), v.y.gt(other.y), v.z.gt(other.z))
    @scala.annotation.targetName("gteVec")
    def >=(other: Vec): Vec =
      create(v.x.gte(other.x), v.y.gte(other.y), v.z.gte(other.z))
    @scala.annotation.targetName("stepVec")
    def step(edge: Vec): Vec =
      create(v.x.step(edge.x), v.y.step(edge.y), v.z.step(edge.z))
    @scala.annotation.targetName("stepScalar")
    def step(edge: Num): Vec =
      create(v.x.step(edge), v.y.step(edge), v.z.step(edge))
    def smoothstep(edge0: Vec, edge1: Vec): Vec =
      create(
        v.x.smoothstep(edge0.x, edge1.x),
        v.y.smoothstep(edge0.y, edge1.y),
        v.z.smoothstep(edge0.z, edge1.z),
      )

trait Vec3MutableOps[Num: {NumExt, NumOps}, Vec]:

  extension (v: Vec)(using Vec3Mutable[Num, Vec])
    def set[Num2, Vec2](
        other: Vec2,
    )(using Vec3Base[Num2, Vec2], Conversion[Num2, Num]): Unit =
      v.x = other.x; v.y = other.y; v.z = other.z
    def :=[Num2, Vec2](
        other: Vec2,
    )(using Vec3Base[Num2, Vec2], Conversion[Num2, Num]): Unit =
      v.set(other)

    def add(other: Vec, out: Vec = v): Vec =
      out.x = v.x + other.x
      out.y = v.y + other.y
      out.z = v.z + other.z
      out
    def sub(other: Vec, out: Vec = v): Vec =
      out.x = v.x - other.x
      out.y = v.y - other.y
      out.z = v.z - other.z
      out
    def mul(other: Vec, out: Vec = v): Vec =
      out.x = v.x * other.x
      out.y = v.y * other.y
      out.z = v.z * other.z
      out
    def div(other: Vec, out: Vec = v): Vec =
      out.x = v.x / other.x
      out.y = v.y / other.y
      out.z = v.z / other.z
      out

    def addS(scalar: Num, out: Vec = v): Vec =
      out.x = v.x + scalar
      out.y = v.y + scalar
      out.z = v.z + scalar
      out
    def subS(scalar: Num, out: Vec = v): Vec =
      out.x = v.x - scalar
      out.y = v.y - scalar
      out.z = v.z - scalar
      out
    def mulS(scalar: Num, out: Vec = v): Vec =
      out.x = v.x * scalar
      out.y = v.y * scalar
      out.z = v.z * scalar
      out
    def divS(scalar: Num, out: Vec = v): Vec =
      out.x = v.x / scalar
      out.y = v.y / scalar
      out.z = v.z / scalar
      out

    @scala.annotation.targetName("addVecAssign")
    def +=(other: Vec): Unit =
      v.add(other)
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
