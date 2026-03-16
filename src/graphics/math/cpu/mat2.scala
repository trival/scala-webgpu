package graphics.math.cpu

import graphics.math.*
import trivalibs.bufferdata.F32
import trivalibs.bufferdata.StructRef
import trivalibs.utils.numbers.NumOps

// === implementations for common matrix types ===
// Note: Mat2Buffer uses F32 by default (for GPU upload)

type Mat2Buffer = (F32, F32, F32, F32)

object Mat2Buffer:
  given Mat2Mutable[Float, StructRef[Mat2Buffer]]:
    extension (m: StructRef[Mat2Buffer])
      inline def m00 = m.getAt(0)
      inline def m01 = m.getAt(1)
      inline def m10 = m.getAt(2)
      inline def m11 = m.getAt(3)
      inline def m00_=(v: Float) = m.setAt(0)(v)
      inline def m01_=(v: Float) = m.setAt(1)(v)
      inline def m10_=(v: Float) = m.setAt(2)(v)
      inline def m11_=(v: Float) = m.setAt(3)(v)

  given Mat2SharedOps[Float, StructRef[Mat2Buffer]] =
    new Mat2SharedOps[Float, StructRef[Mat2Buffer]] {}

  given Mat2MutableOps[Float, StructRef[Mat2Buffer]] =
    new Mat2MutableOps[Float, StructRef[Mat2Buffer]] {}

type Mat2Tuple = (Double, Double, Double, Double)

// format: off
object Mat2Tuple extends Mat2ImmutableOps[Double, Mat2Tuple]:
  inline def create(m00: Double, m01: Double, m10: Double, m11: Double) = (m00, m01, m10, m11)
  given Mat2ImmutableOps[Double, Mat2Tuple] = Mat2Tuple
// format: on

  given Mat2Base[Double, Mat2Tuple]:
    extension (m: Mat2Tuple)
      inline def m00 = m._1
      inline def m01 = m._2
      inline def m10 = m._3
      inline def m11 = m._4

  given Mat2SharedOps[Double, Mat2Tuple] =
    new Mat2SharedOps[Double, Mat2Tuple] {}

// format: off
class Mat2(
    var m00: Double = 1.0, var m01: Double = 0.0,
    var m10: Double = 0.0, var m11: Double = 1.0
)
// format: on

// format: off
object Mat2 extends Mat2ImmutableOps[Double, Mat2]:
  inline def create(m00: Double, m01: Double, m10: Double, m11: Double) = new Mat2(m00, m01, m10, m11)
  given Mat2ImmutableOps[Double, Mat2] = Mat2
// format: on

  given Mat2Mutable[Double, Mat2]:
    extension (m: Mat2)
      inline def m00: Double = m.m00
      inline def m01: Double = m.m01
      inline def m10: Double = m.m10
      inline def m11: Double = m.m11
      inline def m00_=(v: Double) = m.m00 = v
      inline def m01_=(v: Double) = m.m01 = v
      inline def m10_=(v: Double) = m.m10 = v
      inline def m11_=(v: Double) = m.m11 = v

  given Mat2MutableOps[Double, Mat2] = new Mat2MutableOps[Double, Mat2] {}

  given Mat2SharedOps[Double, Mat2] = new Mat2SharedOps[Double, Mat2] {}
