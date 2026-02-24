package gpu.math

import trivalibs.bufferdata.F32
import trivalibs.bufferdata.StructRef

// Column-major 3x3 matrix traits
// Storage order: m00, m01, m02, m10, m11, m12, m20, m21, m22
// mColRow convention: m10 = column 1, row 0

trait Mat3Base[Num, Mat]:
  extension (m: Mat)
    def m00: Num
    def m01: Num
    def m02: Num
    def m10: Num
    def m11: Num
    def m12: Num
    def m20: Num
    def m21: Num
    def m22: Num

    // Column getters (derived from abstract mNN accessors)
    inline def col0: (Num, Num, Num) = (m00, m01, m02)
    inline def col1: (Num, Num, Num) = (m10, m11, m12)
    inline def col2: (Num, Num, Num) = (m20, m21, m22)

    // Row getters (derived from abstract mNN accessors)
    inline def row0: (Num, Num, Num) = (m00, m10, m20)
    inline def row1: (Num, Num, Num) = (m01, m11, m21)
    inline def row2: (Num, Num, Num) = (m02, m12, m22)

trait Mat3Mutable[Num, Mat] extends Mat3Base[Num, Mat]:
  extension (m: Mat)
    def m00_=(v: Num): Unit
    def m01_=(v: Num): Unit
    def m02_=(v: Num): Unit
    def m10_=(v: Num): Unit
    def m11_=(v: Num): Unit
    def m12_=(v: Num): Unit
    def m20_=(v: Num): Unit
    def m21_=(v: Num): Unit
    def m22_=(v: Num): Unit

    // Column setters (derived from abstract mNN_= setters)
    inline def col0_=(c: (Num, Num, Num)): Unit =
      m.m00 = c._1; m.m01 = c._2; m.m02 = c._3
    inline def col1_=(c: (Num, Num, Num)): Unit =
      m.m10 = c._1; m.m11 = c._2; m.m12 = c._3
    inline def col2_=(c: (Num, Num, Num)): Unit =
      m.m20 = c._1; m.m21 = c._2; m.m22 = c._3

    // Row setters (derived from abstract mNN_= setters)
    inline def row0_=(r: (Num, Num, Num)): Unit =
      m.m00 = r._1; m.m10 = r._2; m.m20 = r._3
    inline def row1_=(r: (Num, Num, Num)): Unit =
      m.m01 = r._1; m.m11 = r._2; m.m21 = r._3
    inline def row2_=(r: (Num, Num, Num)): Unit =
      m.m02 = r._1; m.m12 = r._2; m.m22 = r._3

// format: off
trait Mat3SharedOps[Num: Fractional, Mat]:
  import Fractional.Implicits.given

  extension (m: Mat)(using Mat3Base[Num, Mat])
    inline def determinant: Num =
      val a00 = m.m00; val a01 = m.m01; val a02 = m.m02
      val a10 = m.m10; val a11 = m.m11; val a12 = m.m12
      val a20 = m.m20; val a21 = m.m21; val a22 = m.m22

      a00 * (a11 * a22 - a12 * a21) -
        a10 * (a01 * a22 - a02 * a21) +
        a20 * (a01 * a12 - a02 * a11)

trait Mat3ImmutableOps[Num: Fractional, Mat]:
  import Fractional.Implicits.given

  extension (m: Mat)(using Mat3Base[Num, Mat])
    inline def create(
        m00: Num, m01: Num, m02: Num,
        m10: Num, m11: Num, m12: Num,
        m20: Num, m21: Num, m22: Num
    ): Mat

    inline def from[Num2, Mat2_](other: Mat2_)(using Mat3Base[Num2, Mat2_], Conversion[Num2, Num]): Mat =
      create(other.m00, other.m01, other.m02, other.m10, other.m11, other.m12, other.m20, other.m21, other.m22)

    inline def identity: Mat =
      val z = summon[Fractional[Num]].zero
      val o = summon[Fractional[Num]].one
      create(o, z, z, z, o, z, z, z, o)

    inline def +(other: Mat): Mat = create(
      m.m00 + other.m00, m.m01 + other.m01, m.m02 + other.m02,
      m.m10 + other.m10, m.m11 + other.m11, m.m12 + other.m12,
      m.m20 + other.m20, m.m21 + other.m21, m.m22 + other.m22
    )

    inline def -(other: Mat): Mat = create(
      m.m00 - other.m00, m.m01 - other.m01, m.m02 - other.m02,
      m.m10 - other.m10, m.m11 - other.m11, m.m12 - other.m12,
      m.m20 - other.m20, m.m21 - other.m21, m.m22 - other.m22
    )

    @scala.annotation.targetName("scalarMul")
    inline def *(scalar: Num): Mat = create(
      m.m00 * scalar, m.m01 * scalar, m.m02 * scalar,
      m.m10 * scalar, m.m11 * scalar, m.m12 * scalar,
      m.m20 * scalar, m.m21 * scalar, m.m22 * scalar
    )

    @scala.annotation.targetName("matMul")
    inline def *(other: Mat): Mat =
      val a00 = m.m00; val a01 = m.m01; val a02 = m.m02
      val a10 = m.m10; val a11 = m.m11; val a12 = m.m12
      val a20 = m.m20; val a21 = m.m21; val a22 = m.m22
      val b00 = other.m00; val b01 = other.m01; val b02 = other.m02
      val b10 = other.m10; val b11 = other.m11; val b12 = other.m12
      val b20 = other.m20; val b21 = other.m21; val b22 = other.m22
      create(
        a00 * b00 + a10 * b01 + a20 * b02,
        a01 * b00 + a11 * b01 + a21 * b02,
        a02 * b00 + a12 * b01 + a22 * b02,
        a00 * b10 + a10 * b11 + a20 * b12,
        a01 * b10 + a11 * b11 + a21 * b12,
        a02 * b10 + a12 * b11 + a22 * b12,
        a00 * b20 + a10 * b21 + a20 * b22,
        a01 * b20 + a11 * b21 + a21 * b22,
        a02 * b20 + a12 * b21 + a22 * b22
      )

    inline def transposed: Mat = create(
      m.m00, m.m10, m.m20,
      m.m01, m.m11, m.m21,
      m.m02, m.m12, m.m22
    )

    inline def inversed: Mat =
      val a00 = m.m00; val a01 = m.m01; val a02 = m.m02
      val a10 = m.m10; val a11 = m.m11; val a12 = m.m12
      val a20 = m.m20; val a21 = m.m21; val a22 = m.m22
      // Cofactors (transposed = adjugate)
      val c00 =  a11 * a22 - a12 * a21
      val c01 = -(a10 * a22 - a12 * a20)
      val c02 =  a10 * a21 - a11 * a20
      val c10 = -(a01 * a22 - a02 * a21)
      val c11 =  a00 * a22 - a02 * a20
      val c12 = -(a00 * a21 - a01 * a20)
      val c20 =  a01 * a12 - a02 * a11
      val c21 = -(a00 * a12 - a02 * a10)
      val c22 =  a00 * a11 - a01 * a10
      val det = a00 * c00 + a10 * c10 + a20 * c20
      val invDet = summon[Fractional[Num]].one / det
      create(
        c00 * invDet, c10 * invDet, c20 * invDet,
        c01 * invDet, c11 * invDet, c21 * invDet,
        c02 * invDet, c12 * invDet, c22 * invDet
      )

trait Mat3MutableOps[Num: Fractional, Mat]:
  import Fractional.Implicits.given

  extension (m: Mat)(using mb: Mat3Mutable[Num, Mat])
    inline def set[Num2, Mat2_](other: Mat2_)(using Mat3Base[Num2, Mat2_], Conversion[Num2, Num]): Unit =
      m.m00 = other.m00; m.m01 = other.m01; m.m02 = other.m02
      m.m10 = other.m10; m.m11 = other.m11; m.m12 = other.m12
      m.m20 = other.m20; m.m21 = other.m21; m.m22 = other.m22
    inline def :=[Num2, Mat2_](other: Mat2_)(using Mat3Base[Num2, Mat2_], Conversion[Num2, Num]): Unit =
      m.set(other)

    inline def +=(other: Mat): Unit =
      m.m00 = m.m00 + other.m00; m.m01 = m.m01 + other.m01; m.m02 = m.m02 + other.m02
      m.m10 = m.m10 + other.m10; m.m11 = m.m11 + other.m11; m.m12 = m.m12 + other.m12
      m.m20 = m.m20 + other.m20; m.m21 = m.m21 + other.m21; m.m22 = m.m22 + other.m22

    inline def -=(other: Mat): Unit =
      m.m00 = m.m00 - other.m00; m.m01 = m.m01 - other.m01; m.m02 = m.m02 - other.m02
      m.m10 = m.m10 - other.m10; m.m11 = m.m11 - other.m11; m.m12 = m.m12 - other.m12
      m.m20 = m.m20 - other.m20; m.m21 = m.m21 - other.m21; m.m22 = m.m22 - other.m22

    inline def *=(scalar: Num): Unit =
      m.m00 = m.m00 * scalar; m.m01 = m.m01 * scalar; m.m02 = m.m02 * scalar
      m.m10 = m.m10 * scalar; m.m11 = m.m11 * scalar; m.m12 = m.m12 * scalar
      m.m20 = m.m20 * scalar; m.m21 = m.m21 * scalar; m.m22 = m.m22 * scalar

    inline def setIdentity(): Unit =
      val z = summon[Fractional[Num]].zero
      val o = summon[Fractional[Num]].one
      m.m00 = o; m.m01 = z; m.m02 = z
      m.m10 = z; m.m11 = o; m.m12 = z
      m.m20 = z; m.m21 = z; m.m22 = o

    inline def transpose(out: Mat = m): Mat =
      val a00 = m.m00; val a01 = m.m01; val a02 = m.m02
      val a10 = m.m10; val a11 = m.m11; val a12 = m.m12
      val a20 = m.m20; val a21 = m.m21; val a22 = m.m22
      out.m00 = a00; out.m01 = a10; out.m02 = a20
      out.m10 = a01; out.m11 = a11; out.m12 = a21
      out.m20 = a02; out.m21 = a12; out.m22 = a22
      out

    inline def inverse(out: Mat = m): Mat =
      val a00 = m.m00; val a01 = m.m01; val a02 = m.m02
      val a10 = m.m10; val a11 = m.m11; val a12 = m.m12
      val a20 = m.m20; val a21 = m.m21; val a22 = m.m22
      // Cofactors (transposed = adjugate)
      val c00 =  a11 * a22 - a12 * a21
      val c01 = -(a10 * a22 - a12 * a20)
      val c02 =  a10 * a21 - a11 * a20
      val c10 = -(a01 * a22 - a02 * a21)
      val c11 =  a00 * a22 - a02 * a20
      val c12 = -(a00 * a21 - a01 * a20)
      val c20 =  a01 * a12 - a02 * a11
      val c21 = -(a00 * a12 - a02 * a10)
      val c22 =  a00 * a11 - a01 * a10
      val det = a00 * c00 + a10 * c10 + a20 * c20
      val invDet = summon[Fractional[Num]].one / det
      out.m00 = c00 * invDet; out.m01 = c10 * invDet; out.m02 = c20 * invDet
      out.m10 = c01 * invDet; out.m11 = c11 * invDet; out.m12 = c21 * invDet
      out.m20 = c02 * invDet; out.m21 = c12 * invDet; out.m22 = c22 * invDet
      out

// format: on

// === implementations for common matrix types ===
// Note: Mat3Buffer / Mat3PaddedBuffer use F32 by default (for GPU upload)

type Mat3Buffer = (F32, F32, F32, F32, F32, F32, F32, F32, F32)

object Mat3Buffer:
  given mat3MutableBuffer: Mat3Mutable[Float, StructRef[Mat3Buffer]]:
    extension (m: StructRef[Mat3Buffer])
      inline def m00: Float = m(0)()
      inline def m01: Float = m(1)()
      inline def m02: Float = m(2)()
      inline def m10: Float = m(3)()
      inline def m11: Float = m(4)()
      inline def m12: Float = m(5)()
      inline def m20: Float = m(6)()
      inline def m21: Float = m(7)()
      inline def m22: Float = m(8)()
      inline def m00_=(v: Float) = m(0)(v)
      inline def m01_=(v: Float) = m(1)(v)
      inline def m02_=(v: Float) = m(2)(v)
      inline def m10_=(v: Float) = m(3)(v)
      inline def m11_=(v: Float) = m(4)(v)
      inline def m12_=(v: Float) = m(5)(v)
      inline def m20_=(v: Float) = m(6)(v)
      inline def m21_=(v: Float) = m(7)(v)
      inline def m22_=(v: Float) = m(8)(v)

  given mat3SharedOpsBuffer: Mat3SharedOps[Float, StructRef[Mat3Buffer]] =
    new Mat3SharedOps[Float, StructRef[Mat3Buffer]] {}

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
      inline def m00: Float = m(0)()
      inline def m01: Float = m(1)()
      inline def m02: Float = m(2)()
      inline def m10: Float = m(4)()
      inline def m11: Float = m(5)()
      inline def m12: Float = m(6)()
      inline def m20: Float = m(8)()
      inline def m21: Float = m(9)()
      inline def m22: Float = m(10)()
      inline def m00_=(v: Float) = m(0)(v)
      inline def m01_=(v: Float) = m(1)(v)
      inline def m02_=(v: Float) = m(2)(v)
      inline def m10_=(v: Float) = m(4)(v)
      inline def m11_=(v: Float) = m(5)(v)
      inline def m12_=(v: Float) = m(6)(v)
      inline def m20_=(v: Float) = m(8)(v)
      inline def m21_=(v: Float) = m(9)(v)
      inline def m22_=(v: Float) = m(10)(v)

  given mat3SharedOpsPaddedBuffer
      : Mat3SharedOps[Float, StructRef[Mat3PaddedBuffer]] =
    new Mat3SharedOps[Float, StructRef[Mat3PaddedBuffer]] {}

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

object Mat3Tuple:

  // format: off
  given Mat3Base[Double, Mat3Tuple]:
    extension (m: Mat3Tuple)
      inline def m00 = m._1; inline def m01 = m._2; inline def m02 = m._3
      inline def m10 = m._4; inline def m11 = m._5; inline def m12 = m._6
      inline def m20 = m._7; inline def m21 = m._8; inline def m22 = m._9
  // format: on

  given Mat3SharedOps[Double, Mat3Tuple] =
    new Mat3SharedOps[Double, Mat3Tuple] {}

  // format: off
  given Mat3ImmutableOps[Double, Mat3Tuple]:
    extension (m: Mat3Tuple)(using Mat3Base[Double, Mat3Tuple])
      inline def create(
          m00: Double, m01: Double, m02: Double,
          m10: Double, m11: Double, m12: Double,
          m20: Double, m21: Double, m22: Double
      ) = (m00, m01, m02, m10, m11, m12, m20, m21, m22)
  // format: on

// format: off
class Mat3(
    var m00: Double = 1.0, var m01: Double = 0.0, var m02: Double = 0.0,
    var m10: Double = 0.0, var m11: Double = 1.0, var m12: Double = 0.0,
    var m20: Double = 0.0, var m21: Double = 0.0, var m22: Double = 1.0
)
// format: on

object Mat3:
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

  // format: off
  given Mat3ImmutableOps[Double, Mat3]:
    extension (m: Mat3)(using Mat3Base[Double, Mat3])
      inline def create(
          m00: Double, m01: Double, m02: Double,
          m10: Double, m11: Double, m12: Double,
          m20: Double, m21: Double, m22: Double
      ) = Mat3(m00, m01, m02, m10, m11, m12, m20, m21, m22)
  // format: on

  given Mat3MutableOps[Double, Mat3] = new Mat3MutableOps[Double, Mat3] {}

  given Mat3SharedOps[Double, Mat3] = new Mat3SharedOps[Double, Mat3] {}
