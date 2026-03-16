package graphics.math.cpu

import graphics.math.*
import trivalibs.bufferdata.F32
import trivalibs.bufferdata.F64
import trivalibs.bufferdata.StructRef

// === implementations for common vector types ===

// ==== Float Vec2 types ====
// Note: *Buffer types use F32 by default; Vec2dBuffer uses F64

type Vec2Buffer = (F32, F32)

object Vec2Buffer:
  given Vec2Mutable[Float, StructRef[Vec2Buffer]]:
    extension (v: StructRef[Vec2Buffer])
      inline def x = v.getAt(0)
      inline def y = v.getAt(1)
      inline def x_=(value: Float) = v.setAt(0)(value)
      inline def y_=(value: Float) = v.setAt(1)(value)

  given Vec2MutableOps[Float, StructRef[Vec2Buffer]] =
    new Vec2MutableOps[Float, StructRef[Vec2Buffer]] {}

type Vec2fTuple = (Float, Float)

object Vec2fTuple extends Vec2ImmutableOps[Float, Vec2fTuple]:
  inline def create(x: Float, y: Float) = (x, y)
  given Vec2ImmutableOps[Float, Vec2fTuple] = Vec2fTuple

  given Vec2Base[Float, Vec2fTuple]:
    extension (v: Vec2fTuple)
      inline def x = v._1
      inline def y = v._2

class Vec2f(var x: Float = 0f, var y: Float = 0f)

object Vec2f extends Vec2ImmutableOps[Float, Vec2f]:
  inline def create(x: Float, y: Float) = new Vec2f(x, y)
  given Vec2ImmutableOps[Float, Vec2f] = Vec2f

  given Vec2Mutable[Float, Vec2f]:
    extension (v: Vec2f)
      inline def x = v.x
      inline def y = v.y
      inline def x_=(value: Float) = v.x = value
      inline def y_=(value: Float) = v.y = value

  given Vec2MutableOps[Float, Vec2f] = new Vec2MutableOps[Float, Vec2f] {}

// ===== Double Vec2 types (default) =====

type Vec2dBuffer = (F64, F64)

object Vec2dBuffer:
  given Vec2Mutable[Double, StructRef[Vec2dBuffer]]:
    extension (v: StructRef[Vec2dBuffer])
      inline def x = v.getAt(0)
      inline def y = v.getAt(1)
      inline def x_=(value: Double) = v.setAt(0)(value)
      inline def y_=(value: Double) = v.setAt(1)(value)

  given Vec2MutableOps[Double, StructRef[Vec2dBuffer]] =
    new Vec2MutableOps[Double, StructRef[Vec2dBuffer]] {}

type Vec2Tuple = (Double, Double)

object Vec2Tuple extends Vec2ImmutableOps[Double, Vec2Tuple]:
  inline def create(x: Double, y: Double) = (x, y)
  given Vec2ImmutableOps[Double, Vec2Tuple] = Vec2Tuple

  given Vec2Base[Double, Vec2Tuple]:
    extension (v: Vec2Tuple)
      inline def x = v._1
      inline def y = v._2

class Vec2(var x: Double = 0.0, var y: Double = 0.0)

object Vec2 extends Vec2ImmutableOps[Double, Vec2]:
  inline def create(x: Double, y: Double) = new Vec2(x, y)
  given Vec2ImmutableOps[Double, Vec2] = Vec2

  given Vec2Mutable[Double, Vec2]:
    extension (v: Vec2)
      inline def x = v.x
      inline def y = v.y
      inline def x_=(value: Double) = v.x = value
      inline def y_=(value: Double) = v.y = value

  given Vec2MutableOps[Double, Vec2] = new Vec2MutableOps[Double, Vec2] {}
