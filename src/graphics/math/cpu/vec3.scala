package graphics.math.cpu

import graphics.math.*
import trivalibs.bufferdata.F32
import trivalibs.bufferdata.F64
import trivalibs.bufferdata.StructRef

// === implementations for common vector types ===

// ==== Float Vec3 types ====
// Note: *Buffer types use F32 by default; Vec3dBuffer uses F64

type Vec3Buffer = (F32, F32, F32)

object Vec3Buffer:
  given Vec3Mutable[Float, StructRef[Vec3Buffer]]:
    extension (v: StructRef[Vec3Buffer])
      inline def x = v.getAt(0)
      inline def y = v.getAt(1)
      inline def z = v.getAt(2)
      inline def x_=(value: Float) = v.setAt(0)(value)
      inline def y_=(value: Float) = v.setAt(1)(value)
      inline def z_=(value: Float) = v.setAt(2)(value)

  given Vec3MutableOps[Float, StructRef[Vec3Buffer]] =
    new Vec3MutableOps[Float, StructRef[Vec3Buffer]] {}

type Vec3fTuple = (Float, Float, Float)

object Vec3fTuple extends Vec3ImmutableOps[Float, Vec3fTuple]:
  inline def create(x: Float, y: Float, z: Float) = (x, y, z)
  given Vec3ImmutableOps[Float, Vec3fTuple] = Vec3fTuple
  val zero: Vec3fTuple = (0f, 0f, 0f)
  val X: Vec3fTuple = (1f, 0f, 0f)
  val Y: Vec3fTuple = (0f, 1f, 0f)
  val Z: Vec3fTuple = (0f, 0f, 1f)

  given Vec3Base[Float, Vec3fTuple]:
    extension (v: Vec3fTuple)
      inline def x = v._1
      inline def y = v._2
      inline def z = v._3

class Vec3f(var x: Float = 0f, var y: Float = 0f, var z: Float = 0f)

object Vec3f extends Vec3ImmutableOps[Float, Vec3f]:
  inline def create(x: Float, y: Float, z: Float) = new Vec3f(x, y, z)
  given Vec3ImmutableOps[Float, Vec3f] = Vec3f
  def zero: Vec3f = new Vec3f(0f, 0f, 0f)
  def X: Vec3f = new Vec3f(1f, 0f, 0f)
  def Y: Vec3f = new Vec3f(0f, 1f, 0f)
  def Z: Vec3f = new Vec3f(0f, 0f, 1f)

  given Vec3Mutable[Float, Vec3f]:
    extension (v: Vec3f)
      inline def x = v.x
      inline def y = v.y
      inline def z = v.z
      inline def x_=(value: Float) = v.x = value
      inline def y_=(value: Float) = v.y = value
      inline def z_=(value: Float) = v.z = value

  given Vec3MutableOps[Float, Vec3f] = new Vec3MutableOps[Float, Vec3f] {}

// ===== Double Vec3 types (default) =====

type Vec3dBuffer = (F64, F64, F64)

object Vec3dBuffer:
  given Vec3Mutable[Double, StructRef[Vec3dBuffer]]:
    extension (v: StructRef[Vec3dBuffer])
      inline def x = v.getAt(0)
      inline def y = v.getAt(1)
      inline def z = v.getAt(2)
      inline def x_=(value: Double) = v.setAt(0)(value)
      inline def y_=(value: Double) = v.setAt(1)(value)
      inline def z_=(value: Double) = v.setAt(2)(value)

  given Vec3MutableOps[Double, StructRef[Vec3dBuffer]] =
    new Vec3MutableOps[Double, StructRef[Vec3dBuffer]] {}

type Vec3Tuple = (Double, Double, Double)

object Vec3Tuple extends Vec3ImmutableOps[Double, Vec3Tuple]:
  inline def create(x: Double, y: Double, z: Double) = (x, y, z)
  given Vec3ImmutableOps[Double, Vec3Tuple] = Vec3Tuple
  val zero: Vec3Tuple = (0.0, 0.0, 0.0)
  val X: Vec3Tuple = (1.0, 0.0, 0.0)
  val Y: Vec3Tuple = (0.0, 1.0, 0.0)
  val Z: Vec3Tuple = (0.0, 0.0, 1.0)

  given Vec3Base[Double, Vec3Tuple]:
    extension (v: Vec3Tuple)
      inline def x = v._1
      inline def y = v._2
      inline def z = v._3

class Vec3(var x: Double = 0.0, var y: Double = 0.0, var z: Double = 0.0)

object Vec3 extends Vec3ImmutableOps[Double, Vec3]:
  inline def create(x: Double, y: Double, z: Double) = new Vec3(x, y, z)
  given Vec3ImmutableOps[Double, Vec3] = Vec3
  def zero: Vec3 = new Vec3(0.0, 0.0, 0.0)
  def X: Vec3 = new Vec3(1.0, 0.0, 0.0)
  def Y: Vec3 = new Vec3(0.0, 1.0, 0.0)
  def Z: Vec3 = new Vec3(0.0, 0.0, 1.0)

  given Vec3Mutable[Double, Vec3]:
    extension (v: Vec3)
      inline def x = v.x
      inline def y = v.y
      inline def z = v.z
      inline def x_=(value: Double) = v.x = value
      inline def y_=(value: Double) = v.y = value
      inline def z_=(value: Double) = v.z = value

  given Vec3MutableOps[Double, Vec3] = new Vec3MutableOps[Double, Vec3] {}
