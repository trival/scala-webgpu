package gpu.math

import trivalibs.bufferdata.F32
import trivalibs.bufferdata.F64
import trivalibs.bufferdata.StructRef
import trivalibs.utils.numbers.NumExt

trait Vec2Base[Num: {NumExt, Fractional}, Vec]:
  import Fractional.Implicits.given

  extension (v: Vec)
    def x: Num
    def y: Num
    inline def u: Num = x
    inline def v: Num = y

    inline def dot(other: Vec): Num =
      v.x * other.x + v.y * other.y
    inline def length_squared: Num = v.dot(v)
    inline def length: Num = v.length_squared.sqrt

trait Vec2Mutable[Num: {NumExt, Fractional}, Vec] extends Vec2Base[Num, Vec]:
  extension (v: Vec)
    def x_=(value: Num): Unit
    def y_=(value: Num): Unit
    inline def u_=(value: Num): Unit = x_=(value)
    inline def v_=(value: Num): Unit = y_=(value)

trait Vec2ImmutableOps[Num: {NumExt, Fractional}, Vec]:
  import Fractional.Implicits.given

  extension (v: Vec)(using Vec2Base[Num, Vec])
    inline def create(x: Num, y: Num): Vec
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
    inline def normalized: Vec =
      v / v.length

trait Vec2MutableOps[Num: {NumExt, Fractional}, Vec]:
  import Fractional.Implicits.given

  extension (v: Vec)(using Vec2Mutable[Num, Vec])
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

// === implementations for common vector types ===

// ==== Float Vec2 types ====
// Note: *Buffer types use F32 by default; Vec2dBuffer uses F64

type Vec2Buffer = (F32, F32)

object Vec2Buffer:
  given Vec2Mutable[Float, StructRef[Vec2Buffer]]:
    extension (v: StructRef[Vec2Buffer])
      inline def x = v(0)()
      inline def y = v(1)()
      inline def x_=(value: Float) = v(0)(value)
      inline def y_=(value: Float) = v(1)(value)

  given Vec2MutableOps[Float, StructRef[Vec2Buffer]] =
    new Vec2MutableOps[Float, StructRef[Vec2Buffer]] {}

type Vec2fTuple = (Float, Float)

object Vec2fTuple:

  given Vec2Base[Float, Vec2fTuple]:
    extension (v: Vec2fTuple)
      inline def x = v._1
      inline def y = v._2

  given Vec2ImmutableOps[Float, Vec2fTuple]:
    extension (v: Vec2fTuple)(using Vec2Base[Float, Vec2fTuple])
      inline def create(x: Float, y: Float) = (x, y)

class Vec2f(var x: Float = 0f, var y: Float = 0f)

object Vec2f:
  given Vec2Mutable[Float, Vec2f]:
    extension (v: Vec2f)
      inline def x = v.x
      inline def y = v.y
      inline def x_=(value: Float) = v.x = value
      inline def y_=(value: Float) = v.y = value

  given Vec2ImmutableOps[Float, Vec2f]:
    extension (v: Vec2f)(using Vec2Base[Float, Vec2f])
      inline def create(x: Float, y: Float) = Vec2f(x, y)

  given Vec2MutableOps[Float, Vec2f] = new Vec2MutableOps[Float, Vec2f] {}

// ===== Double Vec2 types (default) =====

type Vec2dBuffer = (F64, F64)

object Vec2dBuffer:
  given Vec2Mutable[Double, StructRef[Vec2dBuffer]]:
    extension (v: StructRef[Vec2dBuffer])
      inline def x = v(0)()
      inline def y = v(1)()
      inline def x_=(value: Double) = v(0)(value)
      inline def y_=(value: Double) = v(1)(value)

  given Vec2MutableOps[Double, StructRef[Vec2dBuffer]] =
    new Vec2MutableOps[Double, StructRef[Vec2dBuffer]] {}

type Vec2Tuple = (Double, Double)

object Vec2Tuple:

  given Vec2Base[Double, Vec2Tuple]:
    extension (v: Vec2Tuple)
      inline def x = v._1
      inline def y = v._2

  given Vec2ImmutableOps[Double, Vec2Tuple]:
    extension (v: Vec2Tuple)(using Vec2Base[Double, Vec2Tuple])
      inline def create(x: Double, y: Double) = (x, y)

class Vec2(var x: Double = 0.0, var y: Double = 0.0)

object Vec2:
  given Vec2Mutable[Double, Vec2]:
    extension (v: Vec2)
      inline def x = v.x
      inline def y = v.y
      inline def x_=(value: Double) = v.x = value
      inline def y_=(value: Double) = v.y = value

  given Vec2ImmutableOps[Double, Vec2]:
    extension (v: Vec2)(using Vec2Base[Double, Vec2])
      inline def create(x: Double, y: Double) = Vec2(x, y)

  given Vec2MutableOps[Double, Vec2] = new Vec2MutableOps[Double, Vec2] {}
