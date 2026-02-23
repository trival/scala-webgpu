package gpu.math

import trivalibs.bufferdata.F32
import trivalibs.bufferdata.F64
import trivalibs.bufferdata.StructRef

trait Vec4Base[Primitive, T]:
  extension (v: T)
    def x: Primitive
    def y: Primitive
    def z: Primitive
    def w: Primitive
    inline def r: Primitive = x
    inline def g: Primitive = y
    inline def b: Primitive = z
    inline def a: Primitive = w

trait Vec4Mutable[Primitive, T] extends Vec4Base[Primitive, T]:
  extension (v: T)
    def x_=(value: Primitive): Unit
    def y_=(value: Primitive): Unit
    def z_=(value: Primitive): Unit
    def w_=(value: Primitive): Unit
    inline def r_=(value: Primitive): Unit = x_=(value)
    inline def g_=(value: Primitive): Unit = y_=(value)
    inline def b_=(value: Primitive): Unit = z_=(value)
    inline def a_=(value: Primitive): Unit = w_=(value)

trait Vec4SharedOps[Vec, Primitive: Numeric]:
  import Numeric.Implicits.given

  extension (v: Vec)(using Vec4Base[Primitive, Vec])
    inline def dot(other: Vec): Primitive =
      v.x * other.x + v.y * other.y + v.z * other.z + v.w * other.w

trait Vec4ImmutableOps[Vec, Primitive: Numeric]:
  import Numeric.Implicits.given

  extension (v: Vec)(using Vec4Base[Primitive, Vec])
    inline def create(
        x: Primitive,
        y: Primitive,
        z: Primitive,
        w: Primitive
    ): Vec
    inline def +(other: Vec): Vec =
      create(v.x + other.x, v.y + other.y, v.z + other.z, v.w + other.w)
    inline def -(other: Vec): Vec =
      create(v.x - other.x, v.y - other.y, v.z - other.z, v.w - other.w)
    inline def *(scalar: Primitive): Vec =
      create(v.x * scalar, v.y * scalar, v.z * scalar, v.w * scalar)

trait Vec4MutableOps[Vec, Primitive: Numeric]:
  import Numeric.Implicits.given

  extension (
      v: Vec
  )(using Vec4Mutable[Primitive, Vec])
    inline def +=(other: Vec): Unit =
      v.x = v.x + other.x
      v.y = v.y + other.y
      v.z = v.z + other.z
      v.w = v.w + other.w

    inline def -=(other: Vec): Unit =
      v.x = v.x - other.x
      v.y = v.y - other.y
      v.z = v.z - other.z
      v.w = v.w - other.w

    inline def *=(scalar: Primitive): Unit =
      v.x = v.x * scalar
      v.y = v.y * scalar
      v.z = v.z * scalar
      v.w = v.w * scalar

// === implementations for common vector types ===

// ==== Float Vec4 types ====

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

  given Vec4SharedOps[StructRef[Vec4Buffer], Float] =
    new Vec4SharedOps[StructRef[Vec4Buffer], Float] {}

  given Vec4MutableOps[StructRef[Vec4Buffer], Float] =
    new Vec4MutableOps[StructRef[Vec4Buffer], Float] {}

type Vec4Tuple = (Float, Float, Float, Float)

object Vec4Tuple:

  given Vec4Base[Float, Vec4Tuple]:
    extension (v: Vec4Tuple)
      inline def x: Float = v._1
      inline def y: Float = v._2
      inline def z: Float = v._3
      inline def w: Float = v._4

  given Vec4SharedOps[Vec4Tuple, Float] =
    new Vec4SharedOps[Vec4Tuple, Float] {}

  given Vec4ImmutableOps[Vec4Tuple, Float]:
    extension (v: Vec4Tuple)(using
        Vec4Base[Float, Vec4Tuple]
    )
      inline def create(x: Float, y: Float, z: Float, w: Float) =
        (x, y, z, w)

class Vec4(
    var x: Float = 0f,
    var y: Float = 0f,
    var z: Float = 0f,
    var w: Float = 0f
)

object Vec4:
  type Attrib = Vec4Buffer
  type Uniform = Vec4Buffer

  given Vec4Mutable[Float, Vec4]:
    extension (v: Vec4)
      inline def x: Float = v.x
      inline def y: Float = v.y
      inline def z: Float = v.z
      inline def w: Float = v.w
      inline def x_=(value: Float): Unit = v.x = value
      inline def y_=(value: Float): Unit = v.y = value
      inline def z_=(value: Float): Unit = v.z = value
      inline def w_=(value: Float): Unit = v.w = value

  given Vec4ImmutableOps[Vec4, Float]:
    extension (v: Vec4)(using Vec4Base[Float, Vec4])
      inline def create(x: Float, y: Float, z: Float, w: Float) =
        Vec4(x, y, z, w)

  given Vec4MutableOps[Vec4, Float] = new Vec4MutableOps[Vec4, Float] {}

  given Vec4SharedOps[Vec4, Float] = new Vec4SharedOps[Vec4, Float] {}

// ===== Double Vec4 types =====

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

  given Vec4SharedOps[StructRef[Vec4dBuffer], Double] =
    new Vec4SharedOps[StructRef[Vec4dBuffer], Double] {}

  given Vec4MutableOps[StructRef[Vec4dBuffer], Double] =
    new Vec4MutableOps[StructRef[Vec4dBuffer], Double] {}

type Vec4dTuple = (Double, Double, Double, Double)

object Vec4dTuple:

  given Vec4Base[Double, Vec4dTuple]:
    extension (v: Vec4dTuple)
      inline def x: Double = v._1
      inline def y: Double = v._2
      inline def z: Double = v._3
      inline def w: Double = v._4

  given Vec4SharedOps[Vec4dTuple, Double] =
    new Vec4SharedOps[Vec4dTuple, Double] {}

  given Vec4ImmutableOps[Vec4dTuple, Double]:
    extension (v: Vec4dTuple)(using
        Vec4Base[Double, Vec4dTuple]
    )
      inline def create(x: Double, y: Double, z: Double, w: Double) =
        (x, y, z, w)

class Vec4d(
    var x: Double = 0.0,
    var y: Double = 0.0,
    var z: Double = 0.0,
    var w: Double = 0.0
)

object Vec4d:
  type Attrib = Vec4dBuffer
  type Uniform = Vec4dBuffer

  given Vec4Mutable[Double, Vec4d]:
    extension (v: Vec4d)
      inline def x: Double = v.x
      inline def y: Double = v.y
      inline def z: Double = v.z
      inline def w: Double = v.w
      inline def x_=(value: Double): Unit = v.x = value
      inline def y_=(value: Double): Unit = v.y = value
      inline def z_=(value: Double): Unit = v.z = value
      inline def w_=(value: Double): Unit = v.w = value

  given Vec4SharedOps[Vec4d, Double] = new Vec4SharedOps[Vec4d, Double] {}

  given Vec4ImmutableOps[Vec4d, Double]:
    extension (v: Vec4d)(using Vec4Base[Double, Vec4d])
      inline def create(x: Double, y: Double, z: Double, w: Double) =
        Vec4d(x, y, z, w)

  given Vec4MutableOps[Vec4d, Double] = new Vec4MutableOps[Vec4d, Double] {}
