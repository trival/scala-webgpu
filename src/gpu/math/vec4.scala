package gpu.math

import trivalibs.bufferdata.F32
import trivalibs.bufferdata.F64
import trivalibs.bufferdata.StructRef
import trivalibs.utils.numbers.NumExt

trait Vec4Base[Num, Vec]:
  extension (v: Vec)
    def x: Num
    def y: Num
    def z: Num
    def w: Num
    inline def r: Num = x
    inline def g: Num = y
    inline def b: Num = z
    inline def a: Num = w

trait Vec4Mutable[Num, Vec] extends Vec4Base[Num, Vec]:
  extension (v: Vec)
    def x_=(value: Num): Unit
    def y_=(value: Num): Unit
    def z_=(value: Num): Unit
    def w_=(value: Num): Unit
    inline def r_=(value: Num): Unit = x_=(value)
    inline def g_=(value: Num): Unit = y_=(value)
    inline def b_=(value: Num): Unit = z_=(value)
    inline def a_=(value: Num): Unit = w_=(value)

trait Vec4SharedOps[Num: {NumExt, Fractional}, Vec]:
  import Fractional.Implicits.given

  extension (v: Vec)(using Vec4Base[Num, Vec])
    inline def dot(other: Vec): Num =
      v.x * other.x + v.y * other.y + v.z * other.z + v.w * other.w
    inline def length_squared: Num = v.dot(v)
    inline def length: Num = v.length_squared.sqrt

trait Vec4ImmutableOps[Num: {NumExt, Fractional}, Vec]:
  import Fractional.Implicits.given

  extension (v: Vec)(using Vec4Base[Num, Vec])
    inline def create(
        x: Num,
        y: Num,
        z: Num,
        w: Num
    ): Vec
    inline def +(other: Vec): Vec =
      create(v.x + other.x, v.y + other.y, v.z + other.z, v.w + other.w)
    inline def -(other: Vec): Vec =
      create(v.x - other.x, v.y - other.y, v.z - other.z, v.w - other.w)
    inline def *(scalar: Num): Vec =
      create(v.x * scalar, v.y * scalar, v.z * scalar, v.w * scalar)
    inline def /(scalar: Num): Vec =
      create(v.x / scalar, v.y / scalar, v.z / scalar, v.w / scalar)

trait Vec4MutableOps[Num: {NumExt, Fractional}, Vec]:
  import Fractional.Implicits.given

  extension (v: Vec)(using Vec4Mutable[Num, Vec])
    inline def +=(other: Vec): Unit =
      v.x = v.x + other.x; v.y = v.y + other.y
      v.z = v.z + other.z; v.w = v.w + other.w
    inline def -=(other: Vec): Unit =
      v.x = v.x - other.x; v.y = v.y - other.y
      v.z = v.z - other.z; v.w = v.w - other.w
    inline def *=(scalar: Num): Unit =
      v.x = v.x * scalar; v.y = v.y * scalar
      v.z = v.z * scalar; v.w = v.w * scalar
    inline def /=(scalar: Num): Unit =
      v.x = v.x / scalar; v.y = v.y / scalar
      v.z = v.z / scalar; v.w = v.w / scalar

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

  given Vec4SharedOps[Float, StructRef[Vec4Buffer]] =
    new Vec4SharedOps[Float, StructRef[Vec4Buffer]] {}

  given Vec4MutableOps[Float, StructRef[Vec4Buffer]] =
    new Vec4MutableOps[Float, StructRef[Vec4Buffer]] {}

type Vec4fTuple = (Float, Float, Float, Float)

object Vec4fTuple:

  given Vec4Base[Float, Vec4fTuple]:
    extension (v: Vec4fTuple)
      inline def x: Float = v._1
      inline def y: Float = v._2
      inline def z: Float = v._3
      inline def w: Float = v._4

  given Vec4SharedOps[Float, Vec4fTuple] =
    new Vec4SharedOps[Float, Vec4fTuple] {}

  given Vec4ImmutableOps[Float, Vec4fTuple]:
    extension (v: Vec4fTuple)(using Vec4Base[Float, Vec4fTuple])
      inline def create(x: Float, y: Float, z: Float, w: Float) = (x, y, z, w)

class Vec4f(
    var x: Float = 0f,
    var y: Float = 0f,
    var z: Float = 0f,
    var w: Float = 0f
)

object Vec4f:
  given Vec4Mutable[Float, Vec4f]:
    extension (v: Vec4f)
      inline def x: Float = v.x
      inline def y: Float = v.y
      inline def z: Float = v.z
      inline def w: Float = v.w
      inline def x_=(value: Float): Unit = v.x = value
      inline def y_=(value: Float): Unit = v.y = value
      inline def z_=(value: Float): Unit = v.z = value
      inline def w_=(value: Float): Unit = v.w = value

  given Vec4ImmutableOps[Float, Vec4f]:
    extension (v: Vec4f)(using Vec4Base[Float, Vec4f])
      inline def create(x: Float, y: Float, z: Float, w: Float) =
        Vec4f(x, y, z, w)

  given Vec4MutableOps[Float, Vec4f] = new Vec4MutableOps[Float, Vec4f] {}

  given Vec4SharedOps[Float, Vec4f] = new Vec4SharedOps[Float, Vec4f] {}

// ===== Double Vec4 types (default) =====

type Vec4dBuffer = (F64, F64, F64, F64)

object Vec4dBuffer:
  given Vec4Mutable[Double, StructRef[Vec4dBuffer]]:
    extension (v: StructRef[Vec4dBuffer])
      inline def x: Double = v(0)()
      inline def y: Double = v(1)()
      inline def z: Double = v(2)()
      inline def w: Double = v(3)()
      inline def x_=(value: Double): Unit = v(0)(value)
      inline def y_=(value: Double): Unit = v(1)(value)
      inline def z_=(value: Double): Unit = v(2)(value)
      inline def w_=(value: Double): Unit = v(3)(value)

  given Vec4SharedOps[Double, StructRef[Vec4dBuffer]] =
    new Vec4SharedOps[Double, StructRef[Vec4dBuffer]] {}

  given Vec4MutableOps[Double, StructRef[Vec4dBuffer]] =
    new Vec4MutableOps[Double, StructRef[Vec4dBuffer]] {}

type Vec4Tuple = (Double, Double, Double, Double)

object Vec4Tuple:

  given Vec4Base[Double, Vec4Tuple]:
    extension (v: Vec4Tuple)
      inline def x: Double = v._1
      inline def y: Double = v._2
      inline def z: Double = v._3
      inline def w: Double = v._4

  given Vec4SharedOps[Double, Vec4Tuple] =
    new Vec4SharedOps[Double, Vec4Tuple] {}

  given Vec4ImmutableOps[Double, Vec4Tuple]:
    extension (v: Vec4Tuple)(using Vec4Base[Double, Vec4Tuple])
      inline def create(x: Double, y: Double, z: Double, w: Double) =
        (x, y, z, w)

class Vec4(
    var x: Double = 0.0,
    var y: Double = 0.0,
    var z: Double = 0.0,
    var w: Double = 0.0
)

object Vec4:
  given Vec4Mutable[Double, Vec4]:
    extension (v: Vec4)
      inline def x: Double = v.x
      inline def y: Double = v.y
      inline def z: Double = v.z
      inline def w: Double = v.w
      inline def x_=(value: Double): Unit = v.x = value
      inline def y_=(value: Double): Unit = v.y = value
      inline def z_=(value: Double): Unit = v.z = value
      inline def w_=(value: Double): Unit = v.w = value

  given Vec4SharedOps[Double, Vec4] = new Vec4SharedOps[Double, Vec4] {}

  given Vec4ImmutableOps[Double, Vec4]:
    extension (v: Vec4)(using Vec4Base[Double, Vec4])
      inline def create(x: Double, y: Double, z: Double, w: Double) =
        Vec4(x, y, z, w)

  given Vec4MutableOps[Double, Vec4] = new Vec4MutableOps[Double, Vec4] {}
