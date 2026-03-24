package graphics.math.cpu

import graphics.math.*
import trivalibs.bufferdata.F32
import trivalibs.bufferdata.StructRef

// === implementations for common matrix types ===
// Note: Mat3Buffer / Mat3PaddedBuffer use F32 by default (for GPU upload)

type Mat3Buffer = (F32, F32, F32, F32, F32, F32, F32, F32, F32)

object Mat3Buffer:
  given mat3MutableBuffer: Mat3Mutable[Float, StructRef[Mat3Buffer]]:
    extension (m: StructRef[Mat3Buffer])
      inline def m00: Float = m.getAt(0)
      inline def m01: Float = m.getAt(1)
      inline def m02: Float = m.getAt(2)
      inline def m10: Float = m.getAt(3)
      inline def m11: Float = m.getAt(4)
      inline def m12: Float = m.getAt(5)
      inline def m20: Float = m.getAt(6)
      inline def m21: Float = m.getAt(7)
      inline def m22: Float = m.getAt(8)
      inline def m00_=(v: Float) = m.setAt(0)(v)
      inline def m01_=(v: Float) = m.setAt(1)(v)
      inline def m02_=(v: Float) = m.setAt(2)(v)
      inline def m10_=(v: Float) = m.setAt(3)(v)
      inline def m11_=(v: Float) = m.setAt(4)(v)
      inline def m12_=(v: Float) = m.setAt(5)(v)
      inline def m20_=(v: Float) = m.setAt(6)(v)
      inline def m21_=(v: Float) = m.setAt(7)(v)
      inline def m22_=(v: Float) = m.setAt(8)(v)

  given mat3MutableOpsBuffer: Mat3MutableOps[Float, StructRef[Mat3Buffer]] =
    new Mat3MutableOps[Float, StructRef[Mat3Buffer]] {}

// format: off
type Mat3PaddedBuffer = (F32, F32, F32, F32, F32, F32, F32, F32, F32, F32, F32, F32)
// format: on

object Mat3PaddedBuffer:
  given mat3MutablePaddedBuffer
      : Mat3Mutable[Float, StructRef[Mat3PaddedBuffer]]:
    extension (m: StructRef[Mat3PaddedBuffer])
      // Columns at indices 0-2, 4-6, 8-10 (index 3, 7, 11 are padding)
      inline def m00: Float = m.getAt(0)
      inline def m01: Float = m.getAt(1)
      inline def m02: Float = m.getAt(2)
      inline def m10: Float = m.getAt(4)
      inline def m11: Float = m.getAt(5)
      inline def m12: Float = m.getAt(6)
      inline def m20: Float = m.getAt(8)
      inline def m21: Float = m.getAt(9)
      inline def m22: Float = m.getAt(10)
      inline def m00_=(v: Float) = m.setAt(0)(v)
      inline def m01_=(v: Float) = m.setAt(1)(v)
      inline def m02_=(v: Float) = m.setAt(2)(v)
      inline def m10_=(v: Float) = m.setAt(4)(v)
      inline def m11_=(v: Float) = m.setAt(5)(v)
      inline def m12_=(v: Float) = m.setAt(6)(v)
      inline def m20_=(v: Float) = m.setAt(8)(v)
      inline def m21_=(v: Float) = m.setAt(9)(v)
      inline def m22_=(v: Float) = m.setAt(10)(v)

  given mat3MutableOpsPaddedBuffer
      : Mat3MutableOps[Float, StructRef[Mat3PaddedBuffer]] =
    new Mat3MutableOps[Float, StructRef[Mat3PaddedBuffer]] {}

// format: off
type Mat3Tuple = (
    Double, Double, Double,
    Double, Double, Double,
    Double, Double, Double
)
// format: on

// format: off
object Mat3Tuple extends Mat3ImmutableOps[Double, Mat3Tuple]:
  inline def create(
      m00: Double, m01: Double, m02: Double,
      m10: Double, m11: Double, m12: Double,
      m20: Double, m21: Double, m22: Double,
  ) = (m00, m01, m02, m10, m11, m12, m20, m21, m22)
  given Mat3ImmutableOps[Double, Mat3Tuple] = Mat3Tuple
// format: on

  given Mat3Base[Double, Mat3Tuple]:
    extension (m: Mat3Tuple)
      // format: off
      inline def m00 = m._1; inline def m01 = m._2; inline def m02 = m._3
      inline def m10 = m._4; inline def m11 = m._5; inline def m12 = m._6
      inline def m20 = m._7; inline def m21 = m._8; inline def m22 = m._9
      // format: on


// format: off
class Mat3(
    var m00: Double = 1.0, var m01: Double = 0.0, var m02: Double = 0.0,
    var m10: Double = 0.0, var m11: Double = 1.0, var m12: Double = 0.0,
    var m20: Double = 0.0, var m21: Double = 0.0, var m22: Double = 1.0
)
// format: on

// format: off
object Mat3 extends Mat3ImmutableOps[Double, Mat3]:
  inline def create(
      m00: Double, m01: Double, m02: Double,
      m10: Double, m11: Double, m12: Double,
      m20: Double, m21: Double, m22: Double,
  ) = new Mat3(m00, m01, m02, m10, m11, m12, m20, m21, m22)
  given Mat3ImmutableOps[Double, Mat3] = Mat3

  /** Extract the upper-left 3×3 of a Mat4 (rotation + scale, drops translation). */
  def fromUpperLeft(m: Mat4): Mat3 =
    create(m.m00, m.m01, m.m02, m.m10, m.m11, m.m12, m.m20, m.m21, m.m22)
// format: on

  given Mat3Mutable[Double, Mat3]:
    extension (m: Mat3)
      inline def m00: Double = m.m00
      inline def m01: Double = m.m01
      inline def m02: Double = m.m02
      inline def m10: Double = m.m10
      inline def m11: Double = m.m11
      inline def m12: Double = m.m12
      inline def m20: Double = m.m20
      inline def m21: Double = m.m21
      inline def m22: Double = m.m22
      inline def m00_=(v: Double) = m.m00 = v
      inline def m01_=(v: Double) = m.m01 = v
      inline def m02_=(v: Double) = m.m02 = v
      inline def m10_=(v: Double) = m.m10 = v
      inline def m11_=(v: Double) = m.m11 = v
      inline def m12_=(v: Double) = m.m12 = v
      inline def m20_=(v: Double) = m.m20 = v
      inline def m21_=(v: Double) = m.m21 = v
      inline def m22_=(v: Double) = m.m22 = v

  given Mat3MutableOps[Double, Mat3] = new Mat3MutableOps[Double, Mat3] {}

