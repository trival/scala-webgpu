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
  inline def from[Num2, Vec2](
      other: Vec2,
  )(using Vec3Base[Num2, Vec2], Conversion[Num2, Num]): Vec =
    create(other.x, other.y, other.z)

  extension (v: Vec)(using Vec3Base[Num, Vec])
    @scala.annotation.targetName("addVec")
    inline def +(other: Vec): Vec =
      create(v.x + other.x, v.y + other.y, v.z + other.z)
    @scala.annotation.targetName("addScalar")
    inline def +(scalar: Num): Vec =
      create(v.x + scalar, v.y + scalar, v.z + scalar)
    @scala.annotation.targetName("subVec")
    inline def -(other: Vec): Vec =
      create(v.x - other.x, v.y - other.y, v.z - other.z)
    @scala.annotation.targetName("subScalar")
    inline def -(scalar: Num): Vec =
      create(v.x - scalar, v.y - scalar, v.z - scalar)
    @scala.annotation.targetName("mulVec")
    inline def *(other: Vec): Vec =
      create(v.x * other.x, v.y * other.y, v.z * other.z)
    @scala.annotation.targetName("mulScalar")
    inline def *(scalar: Num): Vec =
      create(v.x * scalar, v.y * scalar, v.z * scalar)
    @scala.annotation.targetName("divVec")
    inline def /(other: Vec): Vec =
      create(v.x / other.x, v.y / other.y, v.z / other.z)
    @scala.annotation.targetName("divScalar")
    inline def /(scalar: Num): Vec =
      create(v.x / scalar, v.y / scalar, v.z / scalar)
    def cross(other: Vec): Vec =
      create(
        v.y * other.z - v.z * other.y,
        v.z * other.x - v.x * other.z,
        v.x * other.y - v.y * other.x,
      )
    def normalized: Vec =
      v / v.length

trait Vec3MutableOps[Num: {NumExt, NumOps}, Vec]:

  extension (v: Vec)(using Vec3Mutable[Num, Vec])
    inline def set[Num2, Vec2](
        other: Vec2,
    )(using Vec3Base[Num2, Vec2], Conversion[Num2, Num]): Unit =
      v.x = other.x; v.y = other.y; v.z = other.z
    inline def :=[Num2, Vec2](
        other: Vec2,
    )(using Vec3Base[Num2, Vec2], Conversion[Num2, Num]): Unit =
      v.set(other)

    inline def add(other: Vec, out: Vec = v): Vec =
      out.x = v.x + other.x
      out.y = v.y + other.y
      out.z = v.z + other.z
      out
    inline def sub(other: Vec, out: Vec = v): Vec =
      out.x = v.x - other.x
      out.y = v.y - other.y
      out.z = v.z - other.z
      out
    inline def mul(other: Vec, out: Vec = v): Vec =
      out.x = v.x * other.x
      out.y = v.y * other.y
      out.z = v.z * other.z
      out
    inline def div(other: Vec, out: Vec = v): Vec =
      out.x = v.x / other.x
      out.y = v.y / other.y
      out.z = v.z / other.z
      out

    inline def addS(scalar: Num, out: Vec = v): Vec =
      out.x = v.x + scalar
      out.y = v.y + scalar
      out.z = v.z + scalar
      out
    inline def subS(scalar: Num, out: Vec = v): Vec =
      out.x = v.x - scalar
      out.y = v.y - scalar
      out.z = v.z - scalar
      out
    inline def mulS(scalar: Num, out: Vec = v): Vec =
      out.x = v.x * scalar
      out.y = v.y * scalar
      out.z = v.z * scalar
      out
    inline def divS(scalar: Num, out: Vec = v): Vec =
      out.x = v.x / scalar
      out.y = v.y / scalar
      out.z = v.z / scalar
      out

    @scala.annotation.targetName("addVecAssign")
    inline def +=(other: Vec): Unit =
      v.add(other)
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
