package gpu.math

import trivalibs.bufferdata.F32
import trivalibs.bufferdata.F64
import trivalibs.bufferdata.StructRef
import trivalibs.utils.numbers.NumExt

trait Vec2Base[Num, Vec]:
  extension (v: Vec)
    def x: Num
    def y: Num
    inline def u: Num = x
    inline def v: Num = y

trait Vec2Mutable[Num, Vec] extends Vec2Base[Num, Vec]:
  extension (v: Vec)
    def x_=(value: Num): Unit
    def y_=(value: Num): Unit
    inline def u_=(value: Num): Unit = x_=(value)
    inline def v_=(value: Num): Unit = y_=(value)

trait Vec2SharedOps[Num: {NumExt, Fractional}, Vec]:
  import Fractional.Implicits.given

  extension (v: Vec)(using Vec2Base[Num, Vec])
    inline def dot(other: Vec): Num =
      v.x * other.x + v.y * other.y
    inline def length_squared: Num = v.dot(v)
    inline def length: Num = v.length_squared.sqrt

trait Vec2ImmutableOps[Num: {NumExt, Fractional}, Vec]:
  import Fractional.Implicits.given

  extension (v: Vec)(using Vec2Base[Num, Vec])
    inline def create(x: Num, y: Num): Vec
    inline def +(other: Vec): Vec = create(v.x + other.x, v.y + other.y)
    inline def -(other: Vec): Vec = create(v.x - other.x, v.y - other.y)
    inline def *(scalar: Num): Vec = create(v.x * scalar, v.y * scalar)
    inline def /(scalar: Num): Vec = create(v.x / scalar, v.y / scalar)

trait Vec2MutableOps[Num: {NumExt, Fractional}, Vec]:
  import Fractional.Implicits.given

  extension (v: Vec)(using Vec2Mutable[Num, Vec])
    inline def +=(other: Vec): Unit =
      v.x = v.x + other.x; v.y = v.y + other.y
    inline def -=(other: Vec): Unit =
      v.x = v.x - other.x; v.y = v.y - other.y
    inline def *=(scalar: Num): Unit =
      v.x = v.x * scalar; v.y = v.y * scalar
    inline def /=(scalar: Num): Unit =
      v.x = v.x / scalar; v.y = v.y / scalar

// === implementations for common vector types ===

// ==== Float Vec2 types ====
// Note: *Buffer types use F32 by default; Vec2dBuffer uses F64

type Vec2Buffer = (F32, F32)

object Vec2Buffer:
  given Vec2Mutable[Float, StructRef[Vec2Buffer]]:
    extension (v: StructRef[Vec2Buffer])
      inline def x: Float = v(0)()
      inline def y: Float = v(1)()
      inline def x_=(value: Float): Unit = v(0)(value)
      inline def y_=(value: Float): Unit = v(1)(value)

  given Vec2SharedOps[Float, StructRef[Vec2Buffer]] =
    new Vec2SharedOps[Float, StructRef[Vec2Buffer]] {}

  given Vec2MutableOps[Float, StructRef[Vec2Buffer]] =
    new Vec2MutableOps[Float, StructRef[Vec2Buffer]] {}

type Vec2fTuple = (Float, Float)

object Vec2fTuple:

  given Vec2Base[Float, Vec2fTuple]:
    extension (v: Vec2fTuple)
      inline def x: Float = v._1
      inline def y: Float = v._2

  given Vec2SharedOps[Float, Vec2fTuple] =
    new Vec2SharedOps[Float, Vec2fTuple] {}

  given Vec2ImmutableOps[Float, Vec2fTuple]:
    extension (v: Vec2fTuple)(using Vec2Base[Float, Vec2fTuple])
      inline def create(x: Float, y: Float) = (x, y)

class Vec2f(var x: Float = 0f, var y: Float = 0f)

object Vec2f:
  given Vec2Mutable[Float, Vec2f]:
    extension (v: Vec2f)
      inline def x: Float = v.x
      inline def y: Float = v.y
      inline def x_=(value: Float): Unit = v.x = value
      inline def y_=(value: Float): Unit = v.y = value

  given Vec2ImmutableOps[Float, Vec2f]:
    extension (v: Vec2f)(using Vec2Base[Float, Vec2f])
      inline def create(x: Float, y: Float) = Vec2f(x, y)

  given Vec2MutableOps[Float, Vec2f] = new Vec2MutableOps[Float, Vec2f] {}

  given Vec2SharedOps[Float, Vec2f] = new Vec2SharedOps[Float, Vec2f] {}

// ===== Double Vec2 types (default) =====

type Vec2dBuffer = (F64, F64)

object Vec2dBuffer:
  given Vec2Mutable[Double, StructRef[Vec2dBuffer]]:
    extension (v: StructRef[Vec2dBuffer])
      inline def x: Double = v(0)()
      inline def y: Double = v(1)()
      inline def x_=(value: Double): Unit = v(0)(value)
      inline def y_=(value: Double): Unit = v(1)(value)

  given Vec2SharedOps[Double, StructRef[Vec2dBuffer]] =
    new Vec2SharedOps[Double, StructRef[Vec2dBuffer]] {}

  given Vec2MutableOps[Double, StructRef[Vec2dBuffer]] =
    new Vec2MutableOps[Double, StructRef[Vec2dBuffer]] {}

type Vec2Tuple = (Double, Double)

object Vec2Tuple:

  given Vec2Base[Double, Vec2Tuple]:
    extension (v: Vec2Tuple)
      inline def x: Double = v._1
      inline def y: Double = v._2

  given Vec2SharedOps[Double, Vec2Tuple] =
    new Vec2SharedOps[Double, Vec2Tuple] {}

  given Vec2ImmutableOps[Double, Vec2Tuple]:
    extension (v: Vec2Tuple)(using Vec2Base[Double, Vec2Tuple])
      inline def create(x: Double, y: Double) = (x, y)

class Vec2(var x: Double = 0.0, var y: Double = 0.0)

object Vec2:
  given Vec2Mutable[Double, Vec2]:
    extension (v: Vec2)
      inline def x: Double = v.x
      inline def y: Double = v.y
      inline def x_=(value: Double): Unit = v.x = value
      inline def y_=(value: Double): Unit = v.y = value

  given Vec2SharedOps[Double, Vec2] = new Vec2SharedOps[Double, Vec2] {}

  given Vec2ImmutableOps[Double, Vec2]:
    extension (v: Vec2)(using Vec2Base[Double, Vec2])
      inline def create(x: Double, y: Double) = Vec2(x, y)

  given Vec2MutableOps[Double, Vec2] = new Vec2MutableOps[Double, Vec2] {}
