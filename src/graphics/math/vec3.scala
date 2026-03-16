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
    def normalized: Vec =
      v / v.length

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

    def normalize(out: Vec = v): Vec = v.divS(v.length, out)
