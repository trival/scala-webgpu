package gpu.math

import trivalibs.bufferdata.F32
import trivalibs.bufferdata.StructRef

// Column-major 2x2 matrix traits
// Storage order: m00, m01, m10, m11
// mColRow convention: m10 = column 1, row 0

trait Mat2Base[Num, Mat]:
  extension (m: Mat)
    def m00: Num
    def m01: Num
    def m10: Num
    def m11: Num

    // Column getters (derived from abstract mNN accessors)
    inline def col0: (Num, Num) = (m00, m01)
    inline def col1: (Num, Num) = (m10, m11)

    // Row getters (derived from abstract mNN accessors)
    inline def row0: (Num, Num) = (m00, m10)
    inline def row1: (Num, Num) = (m01, m11)

trait Mat2Mutable[Num, Mat] extends Mat2Base[Num, Mat]:
  extension (m: Mat)
    def m00_=(v: Num): Unit
    def m01_=(v: Num): Unit
    def m10_=(v: Num): Unit
    def m11_=(v: Num): Unit

    // Column setters (derived from abstract mNN_= setters)
    inline def col0_=(c: (Num, Num)): Unit =
      m.m00 = c._1; m.m01 = c._2
    inline def col1_=(c: (Num, Num)): Unit =
      m.m10 = c._1; m.m11 = c._2

    // Row setters (derived from abstract mNN_= setters)
    inline def row0_=(r: (Num, Num)): Unit =
      m.m00 = r._1; m.m10 = r._2
    inline def row1_=(r: (Num, Num)): Unit =
      m.m01 = r._1; m.m11 = r._2

// format: off
trait Mat2SharedOps[Num: Fractional, Mat]:
  import Fractional.Implicits.given

  extension (m: Mat)(using Mat2Base[Num, Mat])
    inline def determinant: Num =
      m.m00 * m.m11 - m.m10 * m.m01

trait Mat2ImmutableOps[Num: Fractional, Mat]:
  import Fractional.Implicits.given

  extension (m: Mat)(using Mat2Base[Num, Mat])
    inline def create(
        m00: Num, m01: Num,
        m10: Num, m11: Num
    ): Mat

    inline def identity: Mat =
      val z = summon[Fractional[Num]].zero
      val o = summon[Fractional[Num]].one
      create(o, z, z, o)

    inline def +(other: Mat): Mat = create(
      m.m00 + other.m00, m.m01 + other.m01,
      m.m10 + other.m10, m.m11 + other.m11
    )

    inline def -(other: Mat): Mat = create(
      m.m00 - other.m00, m.m01 - other.m01,
      m.m10 - other.m10, m.m11 - other.m11
    )

    @scala.annotation.targetName("scalarMul")
    inline def *(scalar: Num): Mat = create(
      m.m00 * scalar, m.m01 * scalar,
      m.m10 * scalar, m.m11 * scalar
    )

    @scala.annotation.targetName("matMul")
    inline def *(other: Mat): Mat = create(
      m.m00 * other.m00 + m.m10 * other.m01,
      m.m01 * other.m00 + m.m11 * other.m01,
      m.m00 * other.m10 + m.m10 * other.m11,
      m.m01 * other.m10 + m.m11 * other.m11
    )

    inline def transposed: Mat = create(
      m.m00, m.m10,
      m.m01, m.m11
    )

    inline def inversed: Mat =
      val det = m.m00 * m.m11 - m.m10 * m.m01
      val invDet = summon[Fractional[Num]].one / det
      create(
         m.m11 * invDet, -m.m01 * invDet,
        -m.m10 * invDet,  m.m00 * invDet
      )

trait Mat2MutableOps[Num: Fractional, Mat]:
  import Fractional.Implicits.given

  extension (m: Mat)(using mb: Mat2Mutable[Num, Mat])
    inline def +=(other: Mat): Unit =
      m.m00 = m.m00 + other.m00; m.m01 = m.m01 + other.m01
      m.m10 = m.m10 + other.m10; m.m11 = m.m11 + other.m11

    inline def -=(other: Mat): Unit =
      m.m00 = m.m00 - other.m00; m.m01 = m.m01 - other.m01
      m.m10 = m.m10 - other.m10; m.m11 = m.m11 - other.m11

    inline def *=(scalar: Num): Unit =
      m.m00 = m.m00 * scalar; m.m01 = m.m01 * scalar
      m.m10 = m.m10 * scalar; m.m11 = m.m11 * scalar

    inline def setIdentity(): Unit =
      val z = summon[Fractional[Num]].zero
      val o = summon[Fractional[Num]].one
      m.m00 = o; m.m01 = z
      m.m10 = z; m.m11 = o

    inline def transpose(out: Mat = m): Mat =
      val t00 = m.m00; val t01 = m.m01; val t10 = m.m10; val t11 = m.m11
      out.m00 = t00; out.m01 = t10; out.m10 = t01; out.m11 = t11
      out

    inline def inverse(out: Mat = m): Mat =
      val det = m.m00 * m.m11 - m.m10 * m.m01
      val invDet = summon[Fractional[Num]].one / det
      val t00 = m.m00; val t01 = m.m01; val t10 = m.m10; val t11 = m.m11
      out.m00 =  t11 * invDet; out.m01 = -t01 * invDet
      out.m10 = -t10 * invDet; out.m11 =  t00 * invDet
      out
// format: on

// === implementations for common matrix types ===
// Note: Mat2Buffer uses F32 by default (for GPU upload)

type Mat2Buffer = (F32, F32, F32, F32)

object Mat2Buffer:
  given Mat2Mutable[Float, StructRef[Mat2Buffer]]:
    extension (m: StructRef[Mat2Buffer])
      inline def m00 = m(0)()
      inline def m01 = m(1)()
      inline def m10 = m(2)()
      inline def m11 = m(3)()
      inline def m00_=(v: Float) = m(0)(v)
      inline def m01_=(v: Float) = m(1)(v)
      inline def m10_=(v: Float) = m(2)(v)
      inline def m11_=(v: Float) = m(3)(v)

  given Mat2SharedOps[Float, StructRef[Mat2Buffer]] =
    new Mat2SharedOps[Float, StructRef[Mat2Buffer]] {}

  given Mat2MutableOps[Float, StructRef[Mat2Buffer]] =
    new Mat2MutableOps[Float, StructRef[Mat2Buffer]] {}

type Mat2Tuple = (Double, Double, Double, Double)

object Mat2Tuple:

  given Mat2Base[Double, Mat2Tuple]:
    extension (m: Mat2Tuple)
      inline def m00 = m._1
      inline def m01 = m._2
      inline def m10 = m._3
      inline def m11 = m._4

  given Mat2SharedOps[Double, Mat2Tuple] =
    new Mat2SharedOps[Double, Mat2Tuple] {}

  // format: off
  given Mat2ImmutableOps[Double, Mat2Tuple]:
    extension (m: Mat2Tuple)(using Mat2Base[Double, Mat2Tuple])
      inline def create(
          m00: Double, m01: Double,
          m10: Double, m11: Double
      ) = (m00, m01, m10, m11)
  // format: on

// format: off
class Mat2(
    var m00: Double = 1.0, var m01: Double = 0.0,
    var m10: Double = 0.0, var m11: Double = 1.0
)
// format: on

object Mat2:
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

  // format: off
  given Mat2ImmutableOps[Double, Mat2]:
    extension (m: Mat2)(using Mat2Base[Double, Mat2])
      inline def create(
          m00: Double, m01: Double,
          m10: Double, m11: Double
      ) = Mat2(m00, m01, m10, m11)
  // format: on

  given Mat2MutableOps[Double, Mat2] = new Mat2MutableOps[Double, Mat2] {}

  given Mat2SharedOps[Double, Mat2] = new Mat2SharedOps[Double, Mat2] {}
