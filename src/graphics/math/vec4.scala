package graphics.math

import trivalibs.utils.numbers.NumExt
import trivalibs.utils.numbers.NumOps

trait Vec4Base[Num: {NumExt, NumOps}, Vec]:

  extension (v: Vec)
    def x: Num
    def y: Num
    def z: Num
    def w: Num
    inline def r: Num = x
    inline def g: Num = y
    inline def b: Num = z
    inline def a: Num = w

    def dot(other: Vec): Num =
      v.x * other.x + v.y * other.y + v.z * other.z + v.w * other.w
    def length_squared: Num = v.dot(v)
    def length: Num = v.length_squared.sqrt

trait Vec4Mutable[Num: {NumExt, NumOps}, Vec] extends Vec4Base[Num, Vec]:
  extension (v: Vec)
    def x_=(value: Num): Unit
    def y_=(value: Num): Unit
    def z_=(value: Num): Unit
    def w_=(value: Num): Unit
    inline def r_=(value: Num): Unit = x_=(value)
    inline def g_=(value: Num): Unit = y_=(value)
    inline def b_=(value: Num): Unit = z_=(value)
    inline def a_=(value: Num): Unit = w_=(value)

trait Vec4ImmutableOps[Num: {NumExt, NumOps}, Vec]:

  def create(x: Num, y: Num, z: Num, w: Num): Vec

  inline def apply(x: Num, y: Num, z: Num, w: Num): Vec = create(x, y, z, w)

  inline def apply[V3](xyz: V3, w: Num)(using Vec3Base[Num, V3]): Vec =
    create(xyz.x, xyz.y, xyz.z, w)

  inline def apply[V2](xy: V2, z: Num, w: Num)(using Vec2Base[Num, V2]): Vec =
    create(xy.x, xy.y, z, w)

  inline def apply[V2](xy: V2, zw: V2)(using Vec2Base[Num, V2]): Vec =
    create(xy.x, xy.y, zw.x, zw.y)

  def from[Num2, Vec2](
      other: Vec2,
  )(using Vec4Base[Num2, Vec2], Conversion[Num2, Num]): Vec =
    create(other.x, other.y, other.z, other.w)

  extension (v: Vec)(using Vec4Base[Num, Vec])
    @scala.annotation.targetName("addVec")
    def +(other: Vec): Vec =
      create(v.x + other.x, v.y + other.y, v.z + other.z, v.w + other.w)
    @scala.annotation.targetName("addScalar")
    def +(scalar: Num): Vec =
      create(v.x + scalar, v.y + scalar, v.z + scalar, v.w + scalar)
    @scala.annotation.targetName("subVec")
    def -(other: Vec): Vec =
      create(v.x - other.x, v.y - other.y, v.z - other.z, v.w - other.w)
    @scala.annotation.targetName("subScalar")
    def -(scalar: Num): Vec =
      create(v.x - scalar, v.y - scalar, v.z - scalar, v.w - scalar)
    @scala.annotation.targetName("mulVec")
    def *(other: Vec): Vec =
      create(v.x * other.x, v.y * other.y, v.z * other.z, v.w * other.w)
    @scala.annotation.targetName("mulScalar")
    def *(scalar: Num): Vec =
      create(v.x * scalar, v.y * scalar, v.z * scalar, v.w * scalar)
    @scala.annotation.targetName("divVec")
    def /(other: Vec): Vec =
      create(v.x / other.x, v.y / other.y, v.z / other.z, v.w / other.w)
    @scala.annotation.targetName("divScalar")
    def /(scalar: Num): Vec =
      create(v.x / scalar, v.y / scalar, v.z / scalar, v.w / scalar)
    def normalize: Vec = v / v.length

    def abs: Vec = create(v.x.abs, v.y.abs, v.z.abs, v.w.abs)
    def sign: Vec = create(v.x.sign, v.y.sign, v.z.sign, v.w.sign)
    def floor: Vec = create(v.x.floor, v.y.floor, v.z.floor, v.w.floor)
    def ceil: Vec = create(v.x.ceil, v.y.ceil, v.z.ceil, v.w.ceil)
    def round: Vec = create(v.x.round, v.y.round, v.z.round, v.w.round)
    def fract: Vec = create(v.x.fract, v.y.fract, v.z.fract, v.w.fract)
    def exp: Vec = create(v.x.exp, v.y.exp, v.z.exp, v.w.exp)
    def log: Vec = create(v.x.log, v.y.log, v.z.log, v.w.log)
    def log2: Vec = create(v.x.log2, v.y.log2, v.z.log2, v.w.log2)
    def sqrt: Vec = create(v.x.sqrt, v.y.sqrt, v.z.sqrt, v.w.sqrt)

    def min(other: Vec): Vec =
      create(
        v.x.min(other.x),
        v.y.min(other.y),
        v.z.min(other.z),
        v.w.min(other.w),
      )
    def max(other: Vec): Vec =
      create(
        v.x.max(other.x),
        v.y.max(other.y),
        v.z.max(other.z),
        v.w.max(other.w),
      )
    def clamp(lo: Num, hi: Num): Vec =
      create(
        v.x.clamp(lo, hi),
        v.y.clamp(lo, hi),
        v.z.clamp(lo, hi),
        v.w.clamp(lo, hi),
      )
    @scala.annotation.targetName("mixVec")
    def mix(b: Vec, t: Vec): Vec =
      create(
        v.x.mix(b.x, t.x),
        v.y.mix(b.y, t.y),
        v.z.mix(b.z, t.z),
        v.w.mix(b.w, t.w),
      )
    @scala.annotation.targetName("mixScalar")
    def mix(b: Vec, t: Num): Vec =
      create(v.x.mix(b.x, t), v.y.mix(b.y, t), v.z.mix(b.z, t), v.w.mix(b.w, t))
    @scala.annotation.targetName("lerpVec")
    inline def lerp(b: Vec, t: Vec): Vec = v.mix(b, t)
    @scala.annotation.targetName("lerpScalar")
    inline def lerp(b: Vec, t: Num): Vec = v.mix(b, t)
    @scala.annotation.targetName("ltVec")
    def <(other: Vec): Vec =
      create(v.x.lt(other.x), v.y.lt(other.y), v.z.lt(other.z), v.w.lt(other.w))
    @scala.annotation.targetName("lteVec")
    def <=(other: Vec): Vec = create(
      v.x.lte(other.x),
      v.y.lte(other.y),
      v.z.lte(other.z),
      v.w.lte(other.w),
    )
    @scala.annotation.targetName("gtVec")
    def >(other: Vec): Vec =
      create(v.x.gt(other.x), v.y.gt(other.y), v.z.gt(other.z), v.w.gt(other.w))
    @scala.annotation.targetName("gteVec")
    def >=(other: Vec): Vec = create(
      v.x.gte(other.x),
      v.y.gte(other.y),
      v.z.gte(other.z),
      v.w.gte(other.w),
    )
    @scala.annotation.targetName("stepVec")
    def step(edge: Vec): Vec =
      create(
        v.x.step(edge.x),
        v.y.step(edge.y),
        v.z.step(edge.z),
        v.w.step(edge.w),
      )
    @scala.annotation.targetName("stepScalar")
    def step(edge: Num): Vec =
      create(v.x.step(edge), v.y.step(edge), v.z.step(edge), v.w.step(edge))
    def smoothstep(edge0: Vec, edge1: Vec): Vec =
      create(
        v.x.smoothstep(edge0.x, edge1.x),
        v.y.smoothstep(edge0.y, edge1.y),
        v.z.smoothstep(edge0.z, edge1.z),
        v.w.smoothstep(edge0.w, edge1.w),
      )

trait Vec4MutableOps[Num: {NumExt, NumOps}, Vec]:

  extension (v: Vec)(using Vec4Mutable[Num, Vec])
    def set[Num2, Vec2](
        other: Vec2,
    )(using Vec4Base[Num2, Vec2], Conversion[Num2, Num]): Unit =
      v.x = other.x; v.y = other.y; v.z = other.z; v.w = other.w
    def :=[Num2, Vec2](
        other: Vec2,
    )(using Vec4Base[Num2, Vec2], Conversion[Num2, Num]): Unit =
      v.set(other)

    def add(other: Vec, out: Vec = v): Vec =
      out.x = v.x + other.x
      out.y = v.y + other.y
      out.z = v.z + other.z
      out.w = v.w + other.w
      out
    def sub(other: Vec, out: Vec = v): Vec =
      out.x = v.x - other.x
      out.y = v.y - other.y
      out.z = v.z - other.z
      out.w = v.w - other.w
      out
    def mul(other: Vec, out: Vec = v): Vec =
      out.x = v.x * other.x
      out.y = v.y * other.y
      out.z = v.z * other.z
      out.w = v.w * other.w
      out
    def div(other: Vec, out: Vec = v): Vec =
      out.x = v.x / other.x
      out.y = v.y / other.y
      out.z = v.z / other.z
      out.w = v.w / other.w
      out

    def addS(scalar: Num, out: Vec = v): Vec =
      out.x = v.x + scalar
      out.y = v.y + scalar
      out.z = v.z + scalar
      out.w = v.w + scalar
      out
    def subS(scalar: Num, out: Vec = v): Vec =
      out.x = v.x - scalar
      out.y = v.y - scalar
      out.z = v.z - scalar
      out.w = v.w - scalar
      out
    def mulS(scalar: Num, out: Vec = v): Vec =
      out.x = v.x * scalar
      out.y = v.y * scalar
      out.z = v.z * scalar
      out.w = v.w * scalar
      out
    def divS(scalar: Num, out: Vec = v): Vec =
      out.x = v.x / scalar
      out.y = v.y / scalar
      out.z = v.z / scalar
      out.w = v.w / scalar
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
