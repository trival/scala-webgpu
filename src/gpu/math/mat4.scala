package gpu.math

import trivalibs.bufferdata.F32
import trivalibs.bufferdata.StructRef

// Column-major 4x4 matrix traits
// Storage order: m00, m01, m02, m03, m10, m11, ..., m33
// mColRow convention: m10 = column 1, row 0

trait Mat4Base[Num, Mat]:
  extension (m: Mat)
    def m00: Num
    def m01: Num
    def m02: Num
    def m03: Num
    def m10: Num
    def m11: Num
    def m12: Num
    def m13: Num
    def m20: Num
    def m21: Num
    def m22: Num
    def m23: Num
    def m30: Num
    def m31: Num
    def m32: Num
    def m33: Num

    // Column getters (derived from abstract mNN accessors)
    inline def col0: (Num, Num, Num, Num) = (m00, m01, m02, m03)
    inline def col1: (Num, Num, Num, Num) = (m10, m11, m12, m13)
    inline def col2: (Num, Num, Num, Num) = (m20, m21, m22, m23)
    inline def col3: (Num, Num, Num, Num) = (m30, m31, m32, m33)

    // Row getters (derived from abstract mNN accessors)
    inline def row0: (Num, Num, Num, Num) = (m00, m10, m20, m30)
    inline def row1: (Num, Num, Num, Num) = (m01, m11, m21, m31)
    inline def row2: (Num, Num, Num, Num) = (m02, m12, m22, m32)
    inline def row3: (Num, Num, Num, Num) = (m03, m13, m23, m33)

trait Mat4Mutable[Num, Mat] extends Mat4Base[Num, Mat]:
  extension (m: Mat)
    def m00_=(v: Num): Unit
    def m01_=(v: Num): Unit
    def m02_=(v: Num): Unit
    def m03_=(v: Num): Unit
    def m10_=(v: Num): Unit
    def m11_=(v: Num): Unit
    def m12_=(v: Num): Unit
    def m13_=(v: Num): Unit
    def m20_=(v: Num): Unit
    def m21_=(v: Num): Unit
    def m22_=(v: Num): Unit
    def m23_=(v: Num): Unit
    def m30_=(v: Num): Unit
    def m31_=(v: Num): Unit
    def m32_=(v: Num): Unit
    def m33_=(v: Num): Unit

    // Column setters (derived from abstract mNN_= setters)
    inline def col0_=(c: (Num, Num, Num, Num)): Unit =
      m.m00 = c._1; m.m01 = c._2; m.m02 = c._3; m.m03 = c._4
    inline def col1_=(c: (Num, Num, Num, Num)): Unit =
      m.m10 = c._1; m.m11 = c._2; m.m12 = c._3; m.m13 = c._4
    inline def col2_=(c: (Num, Num, Num, Num)): Unit =
      m.m20 = c._1; m.m21 = c._2; m.m22 = c._3; m.m23 = c._4
    inline def col3_=(c: (Num, Num, Num, Num)): Unit =
      m.m30 = c._1; m.m31 = c._2; m.m32 = c._3; m.m33 = c._4

    // Row setters (derived from abstract mNN_= setters)
    inline def row0_=(r: (Num, Num, Num, Num)): Unit =
      m.m00 = r._1; m.m10 = r._2; m.m20 = r._3; m.m30 = r._4
    inline def row1_=(r: (Num, Num, Num, Num)): Unit =
      m.m01 = r._1; m.m11 = r._2; m.m21 = r._3; m.m31 = r._4
    inline def row2_=(r: (Num, Num, Num, Num)): Unit =
      m.m02 = r._1; m.m12 = r._2; m.m22 = r._3; m.m32 = r._4
    inline def row3_=(r: (Num, Num, Num, Num)): Unit =
      m.m03 = r._1; m.m13 = r._2; m.m23 = r._3; m.m33 = r._4

// format: off
trait Mat4SharedOps[Num: Fractional, Mat]:
  import Fractional.Implicits.given

  extension (m: Mat)(using Mat4Base[Num, Mat])
    inline def determinant: Num =
      val a00 = m.m00; val a01 = m.m01; val a02 = m.m02; val a03 = m.m03
      val a10 = m.m10; val a11 = m.m11; val a12 = m.m12; val a13 = m.m13
      val a20 = m.m20; val a21 = m.m21; val a22 = m.m22; val a23 = m.m23
      val a30 = m.m30; val a31 = m.m31; val a32 = m.m32; val a33 = m.m33

      a00 * (a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22)) -
        a10 * (a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22)) +
        a20 * (a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12)) -
        a30 * (a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12))

trait Mat4ImmutableOps[Num: Fractional, Mat]:
  import Fractional.Implicits.given

  extension (m: Mat)(using Mat4Base[Num, Mat])
    inline def create(
        m00: Num, m01: Num, m02: Num, m03: Num,
        m10: Num, m11: Num, m12: Num, m13: Num,
        m20: Num, m21: Num, m22: Num, m23: Num,
        m30: Num, m31: Num, m32: Num, m33: Num
    ): Mat

    inline def identity: Mat =
      val z = summon[Fractional[Num]].zero
      val o = summon[Fractional[Num]].one
      create(o, z, z, z, z, o, z, z, z, z, o, z, z, z, z, o)

    inline def +(other: Mat): Mat = create(
      m.m00 + other.m00, m.m01 + other.m01, m.m02 + other.m02, m.m03 + other.m03,
      m.m10 + other.m10, m.m11 + other.m11, m.m12 + other.m12, m.m13 + other.m13,
      m.m20 + other.m20, m.m21 + other.m21, m.m22 + other.m22, m.m23 + other.m23,
      m.m30 + other.m30, m.m31 + other.m31, m.m32 + other.m32, m.m33 + other.m33
    )

    inline def -(other: Mat): Mat = create(
      m.m00 - other.m00, m.m01 - other.m01, m.m02 - other.m02, m.m03 - other.m03,
      m.m10 - other.m10, m.m11 - other.m11, m.m12 - other.m12, m.m13 - other.m13,
      m.m20 - other.m20, m.m21 - other.m21, m.m22 - other.m22, m.m23 - other.m23,
      m.m30 - other.m30, m.m31 - other.m31, m.m32 - other.m32, m.m33 - other.m33
    )

    @scala.annotation.targetName("scalarMul")
    inline def *(scalar: Num): Mat = create(
      m.m00 * scalar, m.m01 * scalar, m.m02 * scalar, m.m03 * scalar,
      m.m10 * scalar, m.m11 * scalar, m.m12 * scalar, m.m13 * scalar,
      m.m20 * scalar, m.m21 * scalar, m.m22 * scalar, m.m23 * scalar,
      m.m30 * scalar, m.m31 * scalar, m.m32 * scalar, m.m33 * scalar
    )

    @scala.annotation.targetName("matMul")
    inline def *(other: Mat): Mat =
      val a00 = m.m00; val a01 = m.m01; val a02 = m.m02; val a03 = m.m03
      val a10 = m.m10; val a11 = m.m11; val a12 = m.m12; val a13 = m.m13
      val a20 = m.m20; val a21 = m.m21; val a22 = m.m22; val a23 = m.m23
      val a30 = m.m30; val a31 = m.m31; val a32 = m.m32; val a33 = m.m33
      val b00 = other.m00; val b01 = other.m01; val b02 = other.m02; val b03 = other.m03
      val b10 = other.m10; val b11 = other.m11; val b12 = other.m12; val b13 = other.m13
      val b20 = other.m20; val b21 = other.m21; val b22 = other.m22; val b23 = other.m23
      val b30 = other.m30; val b31 = other.m31; val b32 = other.m32; val b33 = other.m33
      create(
        a00 * b00 + a10 * b01 + a20 * b02 + a30 * b03,
        a01 * b00 + a11 * b01 + a21 * b02 + a31 * b03,
        a02 * b00 + a12 * b01 + a22 * b02 + a32 * b03,
        a03 * b00 + a13 * b01 + a23 * b02 + a33 * b03,
        a00 * b10 + a10 * b11 + a20 * b12 + a30 * b13,
        a01 * b10 + a11 * b11 + a21 * b12 + a31 * b13,
        a02 * b10 + a12 * b11 + a22 * b12 + a32 * b13,
        a03 * b10 + a13 * b11 + a23 * b12 + a33 * b13,
        a00 * b20 + a10 * b21 + a20 * b22 + a30 * b23,
        a01 * b20 + a11 * b21 + a21 * b22 + a31 * b23,
        a02 * b20 + a12 * b21 + a22 * b22 + a32 * b23,
        a03 * b20 + a13 * b21 + a23 * b22 + a33 * b23,
        a00 * b30 + a10 * b31 + a20 * b32 + a30 * b33,
        a01 * b30 + a11 * b31 + a21 * b32 + a31 * b33,
        a02 * b30 + a12 * b31 + a22 * b32 + a32 * b33,
        a03 * b30 + a13 * b31 + a23 * b32 + a33 * b33
      )

    inline def transpose: Mat = create(
      m.m00, m.m10, m.m20, m.m30,
      m.m01, m.m11, m.m21, m.m31,
      m.m02, m.m12, m.m22, m.m32,
      m.m03, m.m13, m.m23, m.m33
    )

trait Mat4MutableOps[Num: Fractional, Mat]:
  import Fractional.Implicits.given

  extension (m: Mat)(using mb: Mat4Mutable[Num, Mat])
    inline def +=(other: Mat): Unit =
      m.m00 = m.m00 + other.m00; m.m01 = m.m01 + other.m01; m.m02 = m.m02 + other.m02; m.m03 = m.m03 + other.m03
      m.m10 = m.m10 + other.m10; m.m11 = m.m11 + other.m11; m.m12 = m.m12 + other.m12; m.m13 = m.m13 + other.m13
      m.m20 = m.m20 + other.m20; m.m21 = m.m21 + other.m21; m.m22 = m.m22 + other.m22; m.m23 = m.m23 + other.m23
      m.m30 = m.m30 + other.m30; m.m31 = m.m31 + other.m31; m.m32 = m.m32 + other.m32; m.m33 = m.m33 + other.m33

    inline def -=(other: Mat): Unit =
      m.m00 = m.m00 - other.m00; m.m01 = m.m01 - other.m01; m.m02 = m.m02 - other.m02; m.m03 = m.m03 - other.m03
      m.m10 = m.m10 - other.m10; m.m11 = m.m11 - other.m11; m.m12 = m.m12 - other.m12; m.m13 = m.m13 - other.m13
      m.m20 = m.m20 - other.m20; m.m21 = m.m21 - other.m21; m.m22 = m.m22 - other.m22; m.m23 = m.m23 - other.m23
      m.m30 = m.m30 - other.m30; m.m31 = m.m31 - other.m31; m.m32 = m.m32 - other.m32; m.m33 = m.m33 - other.m33

    inline def *=(scalar: Num): Unit =
      m.m00 = m.m00 * scalar; m.m01 = m.m01 * scalar; m.m02 = m.m02 * scalar; m.m03 = m.m03 * scalar
      m.m10 = m.m10 * scalar; m.m11 = m.m11 * scalar; m.m12 = m.m12 * scalar; m.m13 = m.m13 * scalar
      m.m20 = m.m20 * scalar; m.m21 = m.m21 * scalar; m.m22 = m.m22 * scalar; m.m23 = m.m23 * scalar
      m.m30 = m.m30 * scalar; m.m31 = m.m31 * scalar; m.m32 = m.m32 * scalar; m.m33 = m.m33 * scalar

    inline def setIdentity(): Unit =
      val z = summon[Fractional[Num]].zero
      val o = summon[Fractional[Num]].one
      m.m00 = o; m.m01 = z; m.m02 = z; m.m03 = z
      m.m10 = z; m.m11 = o; m.m12 = z; m.m13 = z
      m.m20 = z; m.m21 = z; m.m22 = o; m.m23 = z
      m.m30 = z; m.m31 = z; m.m32 = z; m.m33 = o
// format: on

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
      inline def m00: Float = m(0)()
      inline def m01: Float = m(1)()
      inline def m02: Float = m(2)()
      inline def m03: Float = m(3)()
      inline def m10: Float = m(4)()
      inline def m11: Float = m(5)()
      inline def m12: Float = m(6)()
      inline def m13: Float = m(7)()
      inline def m20: Float = m(8)()
      inline def m21: Float = m(9)()
      inline def m22: Float = m(10)()
      inline def m23: Float = m(11)()
      inline def m30: Float = m(12)()
      inline def m31: Float = m(13)()
      inline def m32: Float = m(14)()
      inline def m33: Float = m(15)()
      inline def m00_=(v: Float) = m(0)(v)
      inline def m01_=(v: Float) = m(1)(v)
      inline def m02_=(v: Float) = m(2)(v)
      inline def m03_=(v: Float) = m(3)(v)
      inline def m10_=(v: Float) = m(4)(v)
      inline def m11_=(v: Float) = m(5)(v)
      inline def m12_=(v: Float) = m(6)(v)
      inline def m13_=(v: Float) = m(7)(v)
      inline def m20_=(v: Float) = m(8)(v)
      inline def m21_=(v: Float) = m(9)(v)
      inline def m22_=(v: Float) = m(10)(v)
      inline def m23_=(v: Float) = m(11)(v)
      inline def m30_=(v: Float) = m(12)(v)
      inline def m31_=(v: Float) = m(13)(v)
      inline def m32_=(v: Float) = m(14)(v)
      inline def m33_=(v: Float) = m(15)(v)

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

object Mat4Tuple:

  // format: off
  given Mat4Base[Double, Mat4Tuple]:
    extension (m: Mat4Tuple)
      inline def m00 = m._1;  inline def m01 = m._2;  inline def m02 = m._3;  inline def m03 = m._4
      inline def m10 = m._5;  inline def m11 = m._6;  inline def m12 = m._7;  inline def m13 = m._8
      inline def m20 = m._9;  inline def m21 = m._10; inline def m22 = m._11; inline def m23 = m._12
      inline def m30 = m._13; inline def m31 = m._14; inline def m32 = m._15; inline def m33 = m._16
  // format: on

  given Mat4SharedOps[Double, Mat4Tuple] =
    new Mat4SharedOps[Double, Mat4Tuple] {}

  // format: off
  given Mat4ImmutableOps[Double, Mat4Tuple]:
    extension (m: Mat4Tuple)(using Mat4Base[Double, Mat4Tuple])
      inline def create(
          m00: Double, m01: Double, m02: Double, m03: Double,
          m10: Double, m11: Double, m12: Double, m13: Double,
          m20: Double, m21: Double, m22: Double, m23: Double,
          m30: Double, m31: Double, m32: Double, m33: Double
      ) = (m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33)
  // format: on

// format: off
class Mat4(
    var m00: Double = 1.0, var m01: Double = 0.0, var m02: Double = 0.0, var m03: Double = 0.0,
    var m10: Double = 0.0, var m11: Double = 1.0, var m12: Double = 0.0, var m13: Double = 0.0,
    var m20: Double = 0.0, var m21: Double = 0.0, var m22: Double = 1.0, var m23: Double = 0.0,
    var m30: Double = 0.0, var m31: Double = 0.0, var m32: Double = 0.0, var m33: Double = 1.0
)
// format: on

object Mat4:
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

  // format: off
  given Mat4ImmutableOps[Double, Mat4]:
    extension (m: Mat4)(using Mat4Base[Double, Mat4])
      inline def create(
          m00: Double, m01: Double, m02: Double, m03: Double,
          m10: Double, m11: Double, m12: Double, m13: Double,
          m20: Double, m21: Double, m22: Double, m23: Double,
          m30: Double, m31: Double, m32: Double, m33: Double
      ) = Mat4(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33)
  // format: on

  given Mat4MutableOps[Double, Mat4] = new Mat4MutableOps[Double, Mat4] {}

  given Mat4SharedOps[Double, Mat4] = new Mat4SharedOps[Double, Mat4] {}
