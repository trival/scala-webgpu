package graphics.math

import trivalibs.utils.numbers.NumExt.given
import trivalibs.utils.numbers.NumOps

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
trait Mat2SharedOps[Num: NumOps, Mat]:

  extension (m: Mat)(using Mat2Base[Num, Mat])
    inline def determinant: Num =
      m.m00 * m.m11 - m.m10 * m.m01

trait Mat2ImmutableOps[Num: NumOps, Mat]:

  def create(m00: Num, m01: Num, m10: Num, m11: Num): Mat

  inline def from[Num2, Mat2_](other: Mat2_)(using Mat2Base[Num2, Mat2_], Conversion[Num2, Num]): Mat =
    create(other.m00, other.m01, other.m10, other.m11)

  inline def fromRotation(angle: Double)(using Conversion[Double, Num]): Mat =
    val c: Num = angle.cos
    val s: Num = angle.sin
    create(c, s, -s, c)

  inline def identity: Mat =
    val z = summon[NumOps[Num]].zero
    val o = summon[NumOps[Num]].one
    create(o, z, z, o)

  extension (m: Mat)(using Mat2Base[Num, Mat])
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

    @scala.annotation.targetName("vecMul")
    inline def *[Vec](v: Vec)(using Vec2Base[Num, Vec], Vec2ImmutableOps[Num, Vec]): Vec =
      summon[Vec2ImmutableOps[Num, Vec]].create(
        m.m00 * v.x + m.m10 * v.y,
        m.m01 * v.x + m.m11 * v.y,
      )

    inline def transposed: Mat = create(
      m.m00, m.m10,
      m.m01, m.m11
    )

    inline def inversed: Mat =
      val det = m.m00 * m.m11 - m.m10 * m.m01
      val invDet = summon[NumOps[Num]].one / det
      create(
         m.m11 * invDet, -m.m01 * invDet,
        -m.m10 * invDet,  m.m00 * invDet
      )

    inline def rotated(angle: Double)(using Conversion[Double, Num]): Mat =
      val c: Num = angle.cos
      val s: Num = angle.sin
      val ns = -s
      create(
        c * m.m00 + ns * m.m01, s * m.m00 + c * m.m01,
        c * m.m10 + ns * m.m11, s * m.m10 + c * m.m11
      )

trait Mat2MutableOps[Num: NumOps, Mat]:

  extension (m: Mat)(using mb: Mat2Mutable[Num, Mat])
    inline def set[Num2, Mat2_](other: Mat2_)(using Mat2Base[Num2, Mat2_], Conversion[Num2, Num]): Unit =
      m.m00 = other.m00; m.m01 = other.m01
      m.m10 = other.m10; m.m11 = other.m11
    inline def :=[Num2, Mat2_](other: Mat2_)(using Mat2Base[Num2, Mat2_], Conversion[Num2, Num]): Unit =
      m.set(other)

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
      val z = summon[NumOps[Num]].zero
      val o = summon[NumOps[Num]].one
      m.m00 = o; m.m01 = z
      m.m10 = z; m.m11 = o

    inline def transpose(out: Mat = m): Mat =
      val t00 = m.m00; val t01 = m.m01; val t10 = m.m10; val t11 = m.m11
      out.m00 = t00; out.m01 = t10; out.m10 = t01; out.m11 = t11
      out

    inline def inverse(out: Mat = m): Mat =
      val det = m.m00 * m.m11 - m.m10 * m.m01
      val invDet = summon[NumOps[Num]].one / det
      val t00 = m.m00; val t01 = m.m01; val t10 = m.m10; val t11 = m.m11
      out.m00 =  t11 * invDet; out.m01 = -t01 * invDet
      out.m10 = -t10 * invDet; out.m11 =  t00 * invDet
      out

    inline def rotate(angle: Double, out: Mat = m)(using Conversion[Double, Num]): Mat =
      val c: Num = angle.cos
      val s: Num = angle.sin
      val ns = -s
      val t00 = m.m00; val t01 = m.m01; val t10 = m.m10; val t11 = m.m11
      out.m00 = c * t00 + ns * t01; out.m01 = s * t00 + c * t01
      out.m10 = c * t10 + ns * t11; out.m11 = s * t10 + c * t11
      out

// format: on
