package gpu.math

import trivalibs.bufferdata.F32
import trivalibs.bufferdata.F64
import trivalibs.bufferdata.StructRef
import trivalibs.utils.numbers.NumExt

trait Vec3Base[Num: {NumExt, Fractional}, Vec]:
  import Fractional.Implicits.given

  extension (v: Vec)
    def x: Num
    def y: Num
    def z: Num
    inline def r: Num = x
    inline def g: Num = y
    inline def b: Num = z

    inline def dot(other: Vec): Num =
      v.x * other.x + v.y * other.y + v.z * other.z
    inline def length_squared: Num = v.dot(v)
    inline def length: Num = v.length_squared.sqrt

trait Vec3Mutable[Num: {NumExt, Fractional}, Vec] extends Vec3Base[Num, Vec]:
  extension (v: Vec)
    def x_=(value: Num): Unit
    def y_=(value: Num): Unit
    def z_=(value: Num): Unit
    inline def r_=(value: Num): Unit = x_=(value)
    inline def g_=(value: Num): Unit = y_=(value)
    inline def b_=(value: Num): Unit = z_=(value)

trait Vec3ImmutableOps[Num: {NumExt, Fractional}, Vec]:
  import Fractional.Implicits.given

  extension (v: Vec)(using Vec3Base[Num, Vec])
    inline def create(x: Num, y: Num, z: Num): Vec
    inline def from[Num2, Vec2](other: Vec2)(using Vec3Base[Num2, Vec2], Conversion[Num2, Num]): Vec =
      create(other.x, other.y, other.z)
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
    inline def cross(other: Vec): Vec =
      v.create(
        v.y * other.z - v.z * other.y,
        v.z * other.x - v.x * other.z,
        v.x * other.y - v.y * other.x,
      )
    inline def normalized: Vec =
      v / v.length

trait Vec3MutableOps[Num: {NumExt, Fractional}, Vec]:
  import Fractional.Implicits.given

  extension (v: Vec)(using Vec3Mutable[Num, Vec])
    inline def set[Num2, Vec2](other: Vec2)(using Vec3Base[Num2, Vec2], Conversion[Num2, Num]): Unit =
      v.x = other.x; v.y = other.y; v.z = other.z
    inline def :=[Num2, Vec2](other: Vec2)(using Vec3Base[Num2, Vec2], Conversion[Num2, Num]): Unit =
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

// === implementations for common vector types ===

// ==== Float Vec3 types ====
// Note: *Buffer types use F32 by default; Vec3dBuffer uses F64

type Vec3Buffer = (F32, F32, F32)

object Vec3Buffer:
  given Vec3Mutable[Float, StructRef[Vec3Buffer]]:
    extension (v: StructRef[Vec3Buffer])
      inline def x = v(0)()
      inline def y = v(1)()
      inline def z = v(2)()
      inline def x_=(value: Float) = v(0)(value)
      inline def y_=(value: Float) = v(1)(value)
      inline def z_=(value: Float) = v(2)(value)

  given Vec3MutableOps[Float, StructRef[Vec3Buffer]] =
    new Vec3MutableOps[Float, StructRef[Vec3Buffer]] {}

type Vec3fTuple = (Float, Float, Float)

object Vec3fTuple:

  given Vec3Base[Float, Vec3fTuple]:
    extension (v: Vec3fTuple)
      inline def x = v._1
      inline def y = v._2
      inline def z = v._3

  given Vec3ImmutableOps[Float, Vec3fTuple]:
    extension (v: Vec3fTuple)(using Vec3Base[Float, Vec3fTuple])
      inline def create(x: Float, y: Float, z: Float) = (x, y, z)

class Vec3f(var x: Float = 0f, var y: Float = 0f, var z: Float = 0f)

object Vec3f:
  given Vec3Mutable[Float, Vec3f]:
    extension (v: Vec3f)
      inline def x = v.x
      inline def y = v.y
      inline def z = v.z
      inline def x_=(value: Float) = v.x = value
      inline def y_=(value: Float) = v.y = value
      inline def z_=(value: Float) = v.z = value

  given Vec3ImmutableOps[Float, Vec3f]:
    extension (v: Vec3f)(using Vec3Base[Float, Vec3f])
      inline def create(x: Float, y: Float, z: Float) = Vec3f(x, y, z)

  given Vec3MutableOps[Float, Vec3f] = new Vec3MutableOps[Float, Vec3f] {}

// ===== Double Vec3 types (default) =====

type Vec3dBuffer = (F64, F64, F64)

object Vec3dBuffer:
  given Vec3Mutable[Double, StructRef[Vec3dBuffer]]:
    extension (v: StructRef[Vec3dBuffer])
      inline def x = v(0)()
      inline def y = v(1)()
      inline def z = v(2)()
      inline def x_=(value: Double) = v(0)(value)
      inline def y_=(value: Double) = v(1)(value)
      inline def z_=(value: Double) = v(2)(value)

  given Vec3MutableOps[Double, StructRef[Vec3dBuffer]] =
    new Vec3MutableOps[Double, StructRef[Vec3dBuffer]] {}

type Vec3Tuple = (Double, Double, Double)

object Vec3Tuple:

  given Vec3Base[Double, Vec3Tuple]:
    extension (v: Vec3Tuple)
      inline def x = v._1
      inline def y = v._2
      inline def z = v._3

  given Vec3ImmutableOps[Double, Vec3Tuple]:
    extension (v: Vec3Tuple)(using Vec3Base[Double, Vec3Tuple])
      inline def create(x: Double, y: Double, z: Double) = (x, y, z)

class Vec3(var x: Double = 0.0, var y: Double = 0.0, var z: Double = 0.0)

object Vec3:
  given Vec3Mutable[Double, Vec3]:
    extension (v: Vec3)
      inline def x = v.x
      inline def y = v.y
      inline def z = v.z
      inline def x_=(value: Double) = v.x = value
      inline def y_=(value: Double) = v.y = value
      inline def z_=(value: Double) = v.z = value

  given Vec3ImmutableOps[Double, Vec3]:
    extension (v: Vec3)(using Vec3Base[Double, Vec3])
      inline def create(x: Double, y: Double, z: Double) = Vec3(x, y, z)

  given Vec3MutableOps[Double, Vec3] = new Vec3MutableOps[Double, Vec3] {}
