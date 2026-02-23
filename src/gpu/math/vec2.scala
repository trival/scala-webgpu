package gpu.math

import trivalibs.bufferdata.F32
import trivalibs.bufferdata.F64
import trivalibs.bufferdata.StructRef

trait Vec2Base[Primitive, T]:
  extension (v: T)
    def x: Primitive
    def y: Primitive
    inline def u: Primitive = x
    inline def v: Primitive = y

trait Vec2Mutable[Primitive, T] extends Vec2Base[Primitive, T]:
  extension (v: T)
    def x_=(value: Primitive): Unit
    def y_=(value: Primitive): Unit
    inline def u_=(value: Primitive): Unit = x_=(value)
    inline def v_=(value: Primitive): Unit = y_=(value)

trait Vec2SharedOps[Vec, Primitive: Numeric]:
  import Numeric.Implicits.given

  extension (v: Vec)(using Vec2Base[Primitive, Vec])
    inline def dot(other: Vec): Primitive =
      v.x * other.x + v.y * other.y

trait Vec2ImmutableOps[Vec, Primitive: Numeric]:
  import Numeric.Implicits.given

  extension (v: Vec)(using Vec2Base[Primitive, Vec])
    inline def create(x: Primitive, y: Primitive): Vec
    inline def +(other: Vec): Vec = create(v.x + other.x, v.y + other.y)
    inline def -(other: Vec): Vec = create(v.x - other.x, v.y - other.y)
    inline def *(scalar: Primitive): Vec = create(v.x * scalar, v.y * scalar)

trait Vec2MutableOps[Vec, Primitive: Numeric]:
  import Numeric.Implicits.given

  extension (
      v: Vec
  )(using Vec2Mutable[Primitive, Vec])
    inline def +=(other: Vec): Unit =
      v.x = v.x + other.x
      v.y = v.y + other.y

    inline def -=(other: Vec): Unit =
      v.x = v.x - other.x
      v.y = v.y - other.y

    inline def *=(scalar: Primitive): Unit =
      v.x = v.x * scalar
      v.y = v.y * scalar

// === implementations for common vector types ===

// ==== Float Vec2 types ====

type Vec2Buffer = (F32, F32)

object Vec2Buffer:
  given Vec2Mutable[Float, StructRef[Vec2Buffer]]:
    extension (v: StructRef[Vec2Buffer])
      inline def x: Float = v(0)()
      inline def y: Float = v(1)()
      inline def x_=(value: Float): Unit = v(0)(value)
      inline def y_=(value: Float): Unit = v(1)(value)

  given Vec2SharedOps[StructRef[Vec2Buffer], Float] =
    new Vec2SharedOps[StructRef[Vec2Buffer], Float] {}

  given Vec2MutableOps[StructRef[Vec2Buffer], Float] =
    new Vec2MutableOps[StructRef[Vec2Buffer], Float] {}

type Vec2Tuple = (Float, Float)

object Vec2Tuple:

  given Vec2Base[Float, Vec2Tuple]:
    extension (v: Vec2Tuple)
      inline def x: Float = v._1
      inline def y: Float = v._2

  given Vec2SharedOps[Vec2Tuple, Float] =
    new Vec2SharedOps[Vec2Tuple, Float] {}

  given Vec2ImmutableOps[Vec2Tuple, Float]:
    extension (v: Vec2Tuple)(using Vec2Base[Float, Vec2Tuple])
      inline def create(x: Float, y: Float) = (x, y)

class Vec2(var x: Float = 0f, var y: Float = 0f)

object Vec2:
  type Attrib = Vec2Buffer
  type Uniform = Vec2Buffer

  given Vec2Mutable[Float, Vec2]:
    extension (v: Vec2)
      inline def x: Float = v.x
      inline def y: Float = v.y
      inline def x_=(value: Float): Unit = v.x = value
      inline def y_=(value: Float): Unit = v.y = value

  given Vec2ImmutableOps[Vec2, Float]:
    extension (v: Vec2)(using Vec2Base[Float, Vec2])
      inline def create(x: Float, y: Float) = Vec2(x, y)

  given Vec2MutableOps[Vec2, Float] = new Vec2MutableOps[Vec2, Float] {}

  given Vec2SharedOps[Vec2, Float] = new Vec2SharedOps[Vec2, Float] {}

// ===== Double Vec2 types =====

type Vec2dBuffer = (F64, F64)

object Vec2dBuffer:
  given Vec2Mutable[Double, StructRef[Vec2dBuffer]]:
    extension (v: StructRef[Vec2dBuffer])
      inline def x: Double = v(0)()
      inline def y: Double = v(1)()
      inline def x_=(value: Double): Unit = v(0)(value)
      inline def y_=(value: Double): Unit = v(1)(value)

  given Vec2SharedOps[StructRef[Vec2dBuffer], Double] =
    new Vec2SharedOps[StructRef[Vec2dBuffer], Double] {}

  given Vec2MutableOps[StructRef[Vec2dBuffer], Double] =
    new Vec2MutableOps[StructRef[Vec2dBuffer], Double] {}

type Vec2dTuple = (Double, Double)

object Vec2dTuple:

  given Vec2Base[Double, Vec2dTuple]:
    extension (v: Vec2dTuple)
      inline def x: Double = v._1
      inline def y: Double = v._2

  given Vec2SharedOps[Vec2dTuple, Double] =
    new Vec2SharedOps[Vec2dTuple, Double] {}

  given Vec2ImmutableOps[Vec2dTuple, Double]:
    extension (v: Vec2dTuple)(using Vec2Base[Double, Vec2dTuple])
      inline def create(x: Double, y: Double) = (x, y)

class Vec2d(var x: Double = 0.0, var y: Double = 0.0)

object Vec2d:
  type Attrib = Vec2dBuffer
  type Uniform = Vec2dBuffer

  given Vec2Mutable[Double, Vec2d]:
    extension (v: Vec2d)
      inline def x: Double = v.x
      inline def y: Double = v.y
      inline def x_=(value: Double): Unit = v.x = value
      inline def y_=(value: Double): Unit = v.y = value

  given Vec2SharedOps[Vec2d, Double] = new Vec2SharedOps[Vec2d, Double] {}

  given Vec2ImmutableOps[Vec2d, Double]:
    extension (v: Vec2d)(using Vec2Base[Double, Vec2d])
      inline def create(x: Double, y: Double) = Vec2d(x, y)

  given Vec2MutableOps[Vec2d, Double] = new Vec2MutableOps[Vec2d, Double] {}
