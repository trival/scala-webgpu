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
  inline def from[Num2, Vec2](
      other: Vec2,
  )(using Vec2Base[Num2, Vec2], Conversion[Num2, Num]): Vec =
    create(other.x, other.y)

  extension (v: Vec)(using Vec2Base[Num, Vec])
    @scala.annotation.targetName("addVec")
    inline def +(other: Vec): Vec = create(v.x + other.x, v.y + other.y)
    @scala.annotation.targetName("addScalar")
    inline def +(scalar: Num): Vec = create(v.x + scalar, v.y + scalar)
    @scala.annotation.targetName("subVec")
    inline def -(other: Vec): Vec = create(v.x - other.x, v.y - other.y)
    @scala.annotation.targetName("subScalar")
    inline def -(scalar: Num): Vec = create(v.x - scalar, v.y - scalar)
    @scala.annotation.targetName("mulVec")
    inline def *(other: Vec): Vec = create(v.x * other.x, v.y * other.y)
    @scala.annotation.targetName("mulScalar")
    inline def *(scalar: Num): Vec = create(v.x * scalar, v.y * scalar)
    @scala.annotation.targetName("divVec")
    inline def /(other: Vec): Vec = create(v.x / other.x, v.y / other.y)
    @scala.annotation.targetName("divScalar")
    inline def /(scalar: Num): Vec = create(v.x / scalar, v.y / scalar)
    def normalized: Vec =
      v / v.length

trait Vec2MutableOps[Num: {NumExt, NumOps}, Vec]:

  extension (v: Vec)(using Vec2Mutable[Num, Vec])
    inline def set[Num2, Vec2](
        other: Vec2,
    )(using Vec2Base[Num2, Vec2], Conversion[Num2, Num]): Unit =
      v.x = other.x; v.y = other.y
    inline def :=[Num2, Vec2](
        other: Vec2,
    )(using Vec2Base[Num2, Vec2], Conversion[Num2, Num]): Unit =
      v.set(other)

    inline def add(other: Vec, out: Vec = v): Vec =
      out.x = v.x + other.x
      out.y = v.y + other.y
      out
    inline def sub(other: Vec, out: Vec = v): Vec =
      out.x = v.x - other.x
      out.y = v.y - other.y
      out
    inline def mul(other: Vec, out: Vec = v): Vec =
      out.x = v.x * other.x
      out.y = v.y * other.y
      out
    inline def div(other: Vec, out: Vec = v): Vec =
      out.x = v.x / other.x
      out.y = v.y / other.y
      out

    inline def addS(scalar: Num, out: Vec = v): Vec =
      out.x = v.x + scalar
      out.y = v.y + scalar
      out
    inline def subS(scalar: Num, out: Vec = v): Vec =
      out.x = v.x - scalar
      out.y = v.y - scalar
      out
    inline def mulS(scalar: Num, out: Vec = v): Vec =
      out.x = v.x * scalar
      out.y = v.y * scalar
      out
    inline def divS(scalar: Num, out: Vec = v): Vec =
      out.x = v.x / scalar
      out.y = v.y / scalar
      out

    @scala.annotation.targetName("addVecAssign")
    inline def +=(other: Vec): Unit =
      v.add(other)
    @scala.annotation.targetName("addScalarAssign")
    inline def +=(scalar: Num): Unit =
      v.addS(scalar)
    @scala.annotation.targetName("subVecAssign")
    inline def -=(other: Vec): Unit =
      v.sub(other)
    @scala.annotation.targetName("subScalarAssign")
    inline def -=(scalar: Num): Unit =
      v.subS(scalar)
    @scala.annotation.targetName("mulScalarAssign")
    inline def *=(scalar: Num): Unit =
      v.mulS(scalar)
    @scala.annotation.targetName("divScalarAssign")
    inline def /=(scalar: Num): Unit =
      v.divS(scalar)
    @scala.annotation.targetName("mulComponentwiseAssign")
    inline def *=(other: Vec): Unit =
      v.mul(other)
    @scala.annotation.targetName("divComponentwiseAssign")
    inline def /=(other: Vec): Unit =
      v.div(other)

    inline def normalize(out: Vec = v): Vec = v.divS(v.length, out)
