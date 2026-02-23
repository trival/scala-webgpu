package gpu.math

import trivalibs.bufferdata.F32
import trivalibs.bufferdata.F64
import trivalibs.bufferdata.StructRef
import trivalibs.utils.numbers.NumExt

trait Vec3Base[Num, Vec]:
  extension (v: Vec)
    def x: Num
    def y: Num
    def z: Num
    inline def r: Num = x
    inline def g: Num = y
    inline def b: Num = z

trait Vec3Mutable[Num, Vec] extends Vec3Base[Num, Vec]:
  extension (v: Vec)
    def x_=(value: Num): Unit
    def y_=(value: Num): Unit
    def z_=(value: Num): Unit
    inline def r_=(value: Num): Unit = x_=(value)
    inline def g_=(value: Num): Unit = y_=(value)
    inline def b_=(value: Num): Unit = z_=(value)

trait Vec3SharedOps[Num: {NumExt, Fractional}, Vec]:
  import Fractional.Implicits.given

  extension (v: Vec)(using Vec3Base[Num, Vec])
    inline def dot(other: Vec): Num =
      v.x * other.x + v.y * other.y + v.z * other.z
    inline def length_squared: Num = v.dot(v)
    inline def length: Num = v.length_squared.sqrt

trait Vec3ImmutableOps[Num: {NumExt, Fractional}, Vec]:
  import Fractional.Implicits.given

  extension (v: Vec)(using Vec3Base[Num, Vec])
    inline def create(x: Num, y: Num, z: Num): Vec
    inline def +(other: Vec): Vec =
      create(v.x + other.x, v.y + other.y, v.z + other.z)
    inline def -(other: Vec): Vec =
      create(v.x - other.x, v.y - other.y, v.z - other.z)
    inline def *(scalar: Num): Vec =
      create(v.x * scalar, v.y * scalar, v.z * scalar)
    inline def /(scalar: Num): Vec =
      create(v.x / scalar, v.y / scalar, v.z / scalar)
    inline def cross(other: Vec): Vec =
      v.create(
        v.y * other.z - v.z * other.y,
        v.z * other.x - v.x * other.z,
        v.x * other.y - v.y * other.x
      )

trait Vec3MutableOps[Num: {NumExt, Fractional}, Vec]:
  import Fractional.Implicits.given

  extension (v: Vec)(using Vec3Mutable[Num, Vec])
    inline def +=(other: Vec): Unit =
      v.x = v.x + other.x; v.y = v.y + other.y; v.z = v.z + other.z
    inline def -=(other: Vec): Unit =
      v.x = v.x - other.x; v.y = v.y - other.y; v.z = v.z - other.z
    inline def *=(scalar: Num): Unit =
      v.x = v.x * scalar; v.y = v.y * scalar; v.z = v.z * scalar
    inline def /=(scalar: Num): Unit =
      v.x = v.x / scalar; v.y = v.y / scalar; v.z = v.z / scalar

// === implementations for common vector types ===

// ==== Float Vec3 types ====

type Vec3Buffer = (F32, F32, F32)

object Vec3Buffer:
  given Vec3Mutable[Float, StructRef[Vec3Buffer]]:
    extension (v: StructRef[Vec3Buffer])
      inline def x: Float = v(0)()
      inline def y: Float = v(1)()
      inline def z: Float = v(2)()
      inline def x_=(value: Float): Unit = v(0)(value)
      inline def y_=(value: Float): Unit = v(1)(value)
      inline def z_=(value: Float): Unit = v(2)(value)

  given Vec3SharedOps[Float, StructRef[Vec3Buffer]] =
    new Vec3SharedOps[Float, StructRef[Vec3Buffer]] {}

  given Vec3MutableOps[Float, StructRef[Vec3Buffer]] =
    new Vec3MutableOps[Float, StructRef[Vec3Buffer]] {}

type Vec3Tuple = (Float, Float, Float)

object Vec3Tuple:

  given Vec3Base[Float, Vec3Tuple]:
    extension (v: Vec3Tuple)
      inline def x: Float = v._1
      inline def y: Float = v._2
      inline def z: Float = v._3

  given Vec3SharedOps[Float, Vec3Tuple] =
    new Vec3SharedOps[Float, Vec3Tuple] {}

  given Vec3ImmutableOps[Float, Vec3Tuple]:
    extension (v: Vec3Tuple)(using Vec3Base[Float, Vec3Tuple])
      inline def create(x: Float, y: Float, z: Float) = (x, y, z)

class Vec3(var x: Float = 0f, var y: Float = 0f, var z: Float = 0f)

object Vec3:
  given Vec3Mutable[Float, Vec3]:
    extension (v: Vec3)
      inline def x: Float = v.x
      inline def y: Float = v.y
      inline def z: Float = v.z
      inline def x_=(value: Float): Unit = v.x = value
      inline def y_=(value: Float): Unit = v.y = value
      inline def z_=(value: Float): Unit = v.z = value

  given Vec3ImmutableOps[Float, Vec3]:
    extension (v: Vec3)(using Vec3Base[Float, Vec3])
      inline def create(x: Float, y: Float, z: Float) = Vec3(x, y, z)

  given Vec3MutableOps[Float, Vec3] = new Vec3MutableOps[Float, Vec3] {}

  given Vec3SharedOps[Float, Vec3] = new Vec3SharedOps[Float, Vec3] {}

// ===== Double Vec3 types =====

type Vec3dBuffer = (F64, F64, F64)

object Vec3dBuffer:
  given Vec3Mutable[Double, StructRef[Vec3dBuffer]]:
    extension (v: StructRef[Vec3dBuffer])
      inline def x: Double = v(0)()
      inline def y: Double = v(1)()
      inline def z: Double = v(2)()
      inline def x_=(value: Double): Unit = v(0)(value)
      inline def y_=(value: Double): Unit = v(1)(value)
      inline def z_=(value: Double): Unit = v(2)(value)

  given Vec3SharedOps[Double, StructRef[Vec3dBuffer]] =
    new Vec3SharedOps[Double, StructRef[Vec3dBuffer]] {}

  given Vec3MutableOps[Double, StructRef[Vec3dBuffer]] =
    new Vec3MutableOps[Double, StructRef[Vec3dBuffer]] {}

type Vec3dTuple = (Double, Double, Double)

object Vec3dTuple:

  given Vec3Base[Double, Vec3dTuple]:
    extension (v: Vec3dTuple)
      inline def x: Double = v._1
      inline def y: Double = v._2
      inline def z: Double = v._3

  given Vec3SharedOps[Double, Vec3dTuple] =
    new Vec3SharedOps[Double, Vec3dTuple] {}

  given Vec3ImmutableOps[Double, Vec3dTuple]:
    extension (v: Vec3dTuple)(using Vec3Base[Double, Vec3dTuple])
      inline def create(x: Double, y: Double, z: Double) = (x, y, z)

class Vec3d(var x: Double = 0.0, var y: Double = 0.0, var z: Double = 0.0)

object Vec3d:
  given Vec3Mutable[Double, Vec3d]:
    extension (v: Vec3d)
      inline def x: Double = v.x
      inline def y: Double = v.y
      inline def z: Double = v.z
      inline def x_=(value: Double): Unit = v.x = value
      inline def y_=(value: Double): Unit = v.y = value
      inline def z_=(value: Double): Unit = v.z = value

  given Vec3SharedOps[Double, Vec3d] = new Vec3SharedOps[Double, Vec3d] {}

  given Vec3ImmutableOps[Double, Vec3d]:
    extension (v: Vec3d)(using Vec3Base[Double, Vec3d])
      inline def create(x: Double, y: Double, z: Double) = Vec3d(x, y, z)

  given Vec3MutableOps[Double, Vec3d] = new Vec3MutableOps[Double, Vec3d] {}
