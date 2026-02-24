package gpu.math

import trivalibs.bufferdata.F32
import trivalibs.bufferdata.F64
import trivalibs.bufferdata.StructRef
import trivalibs.utils.numbers.NumExt

trait Vec4Base[Num: {NumExt, Fractional}, Vec]:
  import Fractional.Implicits.given

  extension (v: Vec)
    def x: Num
    def y: Num
    def z: Num
    def w: Num
    inline def r: Num = x
    inline def g: Num = y
    inline def b: Num = z
    inline def a: Num = w

    inline def dot(other: Vec): Num =
      v.x * other.x + v.y * other.y + v.z * other.z + v.w * other.w
    inline def length_squared: Num = v.dot(v)
    inline def length: Num = v.length_squared.sqrt

trait Vec4Mutable[Num: {NumExt, Fractional}, Vec] extends Vec4Base[Num, Vec]:
  extension (v: Vec)
    def x_=(value: Num): Unit
    def y_=(value: Num): Unit
    def z_=(value: Num): Unit
    def w_=(value: Num): Unit
    inline def r_=(value: Num): Unit = x_=(value)
    inline def g_=(value: Num): Unit = y_=(value)
    inline def b_=(value: Num): Unit = z_=(value)
    inline def a_=(value: Num): Unit = w_=(value)

trait Vec4ImmutableOps[Num: {NumExt, Fractional}, Vec]:
  import Fractional.Implicits.given

  inline def create(x: Num, y: Num, z: Num, w: Num): Vec
  inline def from[Num2, Vec2](other: Vec2)(using Vec4Base[Num2, Vec2], Conversion[Num2, Num]): Vec =
    create(other.x, other.y, other.z, other.w)

  extension (v: Vec)(using Vec4Base[Num, Vec])
    @scala.annotation.targetName("addVec")
    inline def +(other: Vec): Vec =
      create(v.x + other.x, v.y + other.y, v.z + other.z, v.w + other.w)
    @scala.annotation.targetName("addScalar")
    inline def +(scalar: Num): Vec =
      create(v.x + scalar, v.y + scalar, v.z + scalar, v.w + scalar)
    @scala.annotation.targetName("subVec")
    inline def -(other: Vec): Vec =
      create(v.x - other.x, v.y - other.y, v.z - other.z, v.w - other.w)
    @scala.annotation.targetName("subScalar")
    inline def -(scalar: Num): Vec =
      create(v.x - scalar, v.y - scalar, v.z - scalar, v.w - scalar)
    @scala.annotation.targetName("mulVec")
    inline def *(other: Vec): Vec =
      create(v.x * other.x, v.y * other.y, v.z * other.z, v.w * other.w)
    @scala.annotation.targetName("mulScalar")
    inline def *(scalar: Num): Vec =
      create(v.x * scalar, v.y * scalar, v.z * scalar, v.w * scalar)
    @scala.annotation.targetName("divVec")
    inline def /(other: Vec): Vec =
      create(v.x / other.x, v.y / other.y, v.z / other.z, v.w / other.w)
    @scala.annotation.targetName("divScalar")
    inline def /(scalar: Num): Vec =
      create(v.x / scalar, v.y / scalar, v.z / scalar, v.w / scalar)
    inline def normalized: Vec =
      v / v.length

trait Vec4MutableOps[Num: {NumExt, Fractional}, Vec]:
  import Fractional.Implicits.given

  extension (v: Vec)(using Vec4Mutable[Num, Vec])
    inline def set[Num2, Vec2](other: Vec2)(using Vec4Base[Num2, Vec2], Conversion[Num2, Num]): Unit =
      v.x = other.x; v.y = other.y; v.z = other.z; v.w = other.w
    inline def :=[Num2, Vec2](other: Vec2)(using Vec4Base[Num2, Vec2], Conversion[Num2, Num]): Unit =
      v.set(other)

    inline def add(other: Vec, out: Vec = v): Vec =
      out.x = v.x + other.x
      out.y = v.y + other.y
      out.z = v.z + other.z
      out.w = v.w + other.w
      out
    inline def sub(other: Vec, out: Vec = v): Vec =
      out.x = v.x - other.x
      out.y = v.y - other.y
      out.z = v.z - other.z
      out.w = v.w - other.w
      out
    inline def mul(other: Vec, out: Vec = v): Vec =
      out.x = v.x * other.x
      out.y = v.y * other.y
      out.z = v.z * other.z
      out.w = v.w * other.w
      out
    inline def div(other: Vec, out: Vec = v): Vec =
      out.x = v.x / other.x
      out.y = v.y / other.y
      out.z = v.z / other.z
      out.w = v.w / other.w
      out

    inline def addS(scalar: Num, out: Vec = v): Vec =
      out.x = v.x + scalar
      out.y = v.y + scalar
      out.z = v.z + scalar
      out.w = v.w + scalar
      out
    inline def subS(scalar: Num, out: Vec = v): Vec =
      out.x = v.x - scalar
      out.y = v.y - scalar
      out.z = v.z - scalar
      out.w = v.w - scalar
      out
    inline def mulS(scalar: Num, out: Vec = v): Vec =
      out.x = v.x * scalar
      out.y = v.y * scalar
      out.z = v.z * scalar
      out.w = v.w * scalar
      out
    inline def divS(scalar: Num, out: Vec = v): Vec =
      out.x = v.x / scalar
      out.y = v.y / scalar
      out.z = v.z / scalar
      out.w = v.w / scalar
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

// === implementations for common vector types ===

// ==== Float Vec4 types ====
// Note: *Buffer types use F32 by default; Vec4dBuffer uses F64

type Vec4Buffer = (F32, F32, F32, F32)

object Vec4Buffer:
  given Vec4Mutable[Float, StructRef[Vec4Buffer]]:
    extension (v: StructRef[Vec4Buffer])
      inline def x: Float = v(0)()
      inline def y: Float = v(1)()
      inline def z: Float = v(2)()
      inline def w: Float = v(3)()
      inline def x_=(value: Float): Unit = v(0)(value)
      inline def y_=(value: Float): Unit = v(1)(value)
      inline def z_=(value: Float): Unit = v(2)(value)
      inline def w_=(value: Float): Unit = v(3)(value)

  given Vec4MutableOps[Float, StructRef[Vec4Buffer]] =
    new Vec4MutableOps[Float, StructRef[Vec4Buffer]] {}

type Vec4fTuple = (Float, Float, Float, Float)

object Vec4fTuple extends Vec4ImmutableOps[Float, Vec4fTuple]:
  inline def create(x: Float, y: Float, z: Float, w: Float) = (x, y, z, w)
  given Vec4ImmutableOps[Float, Vec4fTuple] = Vec4fTuple

  given Vec4Base[Float, Vec4fTuple]:
    extension (v: Vec4fTuple)
      inline def x = v._1
      inline def y = v._2
      inline def z = v._3
      inline def w = v._4

class Vec4f(
    var x: Float = 0f,
    var y: Float = 0f,
    var z: Float = 0f,
    var w: Float = 0f,
)

object Vec4f extends Vec4ImmutableOps[Float, Vec4f]:
  inline def create(x: Float, y: Float, z: Float, w: Float) = new Vec4f(x, y, z, w)
  given Vec4ImmutableOps[Float, Vec4f] = Vec4f

  given Vec4Mutable[Float, Vec4f]:
    extension (v: Vec4f)
      inline def x = v.x
      inline def y = v.y
      inline def z = v.z
      inline def w = v.w
      inline def x_=(value: Float) = v.x = value
      inline def y_=(value: Float) = v.y = value
      inline def z_=(value: Float) = v.z = value
      inline def w_=(value: Float) = v.w = value

  given Vec4MutableOps[Float, Vec4f] = new Vec4MutableOps[Float, Vec4f] {}

// ===== Double Vec4 types (default) =====

type Vec4dBuffer = (F64, F64, F64, F64)

object Vec4dBuffer:
  given Vec4Mutable[Double, StructRef[Vec4dBuffer]]:
    extension (v: StructRef[Vec4dBuffer])
      inline def x = v(0)()
      inline def y = v(1)()
      inline def z = v(2)()
      inline def w = v(3)()
      inline def x_=(value: Double) = v(0)(value)
      inline def y_=(value: Double) = v(1)(value)
      inline def z_=(value: Double) = v(2)(value)
      inline def w_=(value: Double) = v(3)(value)

  given Vec4MutableOps[Double, StructRef[Vec4dBuffer]] =
    new Vec4MutableOps[Double, StructRef[Vec4dBuffer]] {}

type Vec4Tuple = (Double, Double, Double, Double)

object Vec4Tuple extends Vec4ImmutableOps[Double, Vec4Tuple]:
  inline def create(x: Double, y: Double, z: Double, w: Double) = (x, y, z, w)
  given Vec4ImmutableOps[Double, Vec4Tuple] = Vec4Tuple

  given Vec4Base[Double, Vec4Tuple]:
    extension (v: Vec4Tuple)
      inline def x = v._1
      inline def y = v._2
      inline def z = v._3
      inline def w = v._4

class Vec4(
    var x: Double = 0.0,
    var y: Double = 0.0,
    var z: Double = 0.0,
    var w: Double = 0.0,
)

object Vec4 extends Vec4ImmutableOps[Double, Vec4]:
  inline def create(x: Double, y: Double, z: Double, w: Double) = new Vec4(x, y, z, w)
  given Vec4ImmutableOps[Double, Vec4] = Vec4

  given Vec4Mutable[Double, Vec4]:
    extension (v: Vec4)
      inline def x = v.x
      inline def y = v.y
      inline def z = v.z
      inline def w = v.w
      inline def x_=(value: Double) = v.x = value
      inline def y_=(value: Double) = v.y = value
      inline def z_=(value: Double) = v.z = value
      inline def w_=(value: Double) = v.w = value

  given Vec4MutableOps[Double, Vec4] = new Vec4MutableOps[Double, Vec4] {}
