package graphics.math.cpu

import graphics.math.*
import trivalibs.bufferdata.F32
import trivalibs.bufferdata.StructRef
import trivalibs.utils.numbers.NumOps

// === implementations for common matrix types ===
// Note: Mat4Buffer uses F32 by default (for GPU upload)

// format: off
type Mat4Buffer = (
  F32, F32, F32, F32,
  F32, F32, F32, F32,
  F32, F32, F32, F32,
  F32, F32, F32, F32
)
// format: on

object Mat4Buffer:
  given Mat4Mutable[Float, StructRef[Mat4Buffer]]:
    extension (m: StructRef[Mat4Buffer])
      inline def m00: Float = m.getAt(0)
      inline def m01: Float = m.getAt(1)
      inline def m02: Float = m.getAt(2)
      inline def m03: Float = m.getAt(3)
      inline def m10: Float = m.getAt(4)
      inline def m11: Float = m.getAt(5)
      inline def m12: Float = m.getAt(6)
      inline def m13: Float = m.getAt(7)
      inline def m20: Float = m.getAt(8)
      inline def m21: Float = m.getAt(9)
      inline def m22: Float = m.getAt(10)
      inline def m23: Float = m.getAt(11)
      inline def m30: Float = m.getAt(12)
      inline def m31: Float = m.getAt(13)
      inline def m32: Float = m.getAt(14)
      inline def m33: Float = m.getAt(15)
      inline def m00_=(v: Float) = m.setAt(0)(v)
      inline def m01_=(v: Float) = m.setAt(1)(v)
      inline def m02_=(v: Float) = m.setAt(2)(v)
      inline def m03_=(v: Float) = m.setAt(3)(v)
      inline def m10_=(v: Float) = m.setAt(4)(v)
      inline def m11_=(v: Float) = m.setAt(5)(v)
      inline def m12_=(v: Float) = m.setAt(6)(v)
      inline def m13_=(v: Float) = m.setAt(7)(v)
      inline def m20_=(v: Float) = m.setAt(8)(v)
      inline def m21_=(v: Float) = m.setAt(9)(v)
      inline def m22_=(v: Float) = m.setAt(10)(v)
      inline def m23_=(v: Float) = m.setAt(11)(v)
      inline def m30_=(v: Float) = m.setAt(12)(v)
      inline def m31_=(v: Float) = m.setAt(13)(v)
      inline def m32_=(v: Float) = m.setAt(14)(v)
      inline def m33_=(v: Float) = m.setAt(15)(v)

  given Mat4SharedOps[Float, StructRef[Mat4Buffer]] =
    new Mat4SharedOps[Float, StructRef[Mat4Buffer]] {}

  given Mat4MutableOps[Float, StructRef[Mat4Buffer]] =
    new Mat4MutableOps[Float, StructRef[Mat4Buffer]] {}

// format: off
type Mat4Tuple = (
    Double, Double, Double, Double,
    Double, Double, Double, Double,
    Double, Double, Double, Double,
    Double, Double, Double, Double
)
// format: on

// format: off
object Mat4Tuple extends Mat4ImmutableOps[Double, Mat4Tuple]:
  inline def create(
      m00: Double, m01: Double, m02: Double, m03: Double,
      m10: Double, m11: Double, m12: Double, m13: Double,
      m20: Double, m21: Double, m22: Double, m23: Double,
      m30: Double, m31: Double, m32: Double, m33: Double,
  ) = (m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33)
  given Mat4ImmutableOps[Double, Mat4Tuple] = Mat4Tuple
// format: on

  given Mat4Base[Double, Mat4Tuple]:
    extension (m: Mat4Tuple)
      // format: off
      inline def m00 = m._1;  inline def m01 = m._2;  inline def m02 = m._3;  inline def m03 = m._4
      inline def m10 = m._5;  inline def m11 = m._6;  inline def m12 = m._7;  inline def m13 = m._8
      inline def m20 = m._9;  inline def m21 = m._10; inline def m22 = m._11; inline def m23 = m._12
      inline def m30 = m._13; inline def m31 = m._14; inline def m32 = m._15; inline def m33 = m._16
      // format: on

  given Mat4SharedOps[Double, Mat4Tuple] =
    new Mat4SharedOps[Double, Mat4Tuple] {}

// format: off
class Mat4(
    var m00: Double = 1.0, var m01: Double = 0.0, var m02: Double = 0.0, var m03: Double = 0.0,
    var m10: Double = 0.0, var m11: Double = 1.0, var m12: Double = 0.0, var m13: Double = 0.0,
    var m20: Double = 0.0, var m21: Double = 0.0, var m22: Double = 1.0, var m23: Double = 0.0,
    var m30: Double = 0.0, var m31: Double = 0.0, var m32: Double = 0.0, var m33: Double = 1.0
)
// format: on

// format: off
object Mat4 extends Mat4ImmutableOps[Double, Mat4]:
  inline def create(
      m00: Double, m01: Double, m02: Double, m03: Double,
      m10: Double, m11: Double, m12: Double, m13: Double,
      m20: Double, m21: Double, m22: Double, m23: Double,
      m30: Double, m31: Double, m32: Double, m33: Double,
  ) = new Mat4(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33)
  given Mat4ImmutableOps[Double, Mat4] = Mat4
// format: on

  given Mat4Mutable[Double, Mat4]:
    extension (m: Mat4)
      inline def m00: Double = m.m00
      inline def m01: Double = m.m01
      inline def m02: Double = m.m02
      inline def m03: Double = m.m03
      inline def m10: Double = m.m10
      inline def m11: Double = m.m11
      inline def m12: Double = m.m12
      inline def m13: Double = m.m13
      inline def m20: Double = m.m20
      inline def m21: Double = m.m21
      inline def m22: Double = m.m22
      inline def m23: Double = m.m23
      inline def m30: Double = m.m30
      inline def m31: Double = m.m31
      inline def m32: Double = m.m32
      inline def m33: Double = m.m33
      inline def m00_=(v: Double) = m.m00 = v
      inline def m01_=(v: Double) = m.m01 = v
      inline def m02_=(v: Double) = m.m02 = v
      inline def m03_=(v: Double) = m.m03 = v
      inline def m10_=(v: Double) = m.m10 = v
      inline def m11_=(v: Double) = m.m11 = v
      inline def m12_=(v: Double) = m.m12 = v
      inline def m13_=(v: Double) = m.m13 = v
      inline def m20_=(v: Double) = m.m20 = v
      inline def m21_=(v: Double) = m.m21 = v
      inline def m22_=(v: Double) = m.m22 = v
      inline def m23_=(v: Double) = m.m23 = v
      inline def m30_=(v: Double) = m.m30 = v
      inline def m31_=(v: Double) = m.m31 = v
      inline def m32_=(v: Double) = m.m32 = v
      inline def m33_=(v: Double) = m.m33 = v

  given Mat4MutableOps[Double, Mat4] = new Mat4MutableOps[Double, Mat4] {}

  given Mat4SharedOps[Double, Mat4] = new Mat4SharedOps[Double, Mat4] {}
