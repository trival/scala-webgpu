package graphics.math

import trivalibs.utils.numbers.NumExt.given
import trivalibs.utils.numbers.NumOps

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
trait Mat3SharedOps[Num: NumOps, Mat]:


  extension (m: Mat)(using Mat3Base[Num, Mat])
    def determinant: Num =
      val a00 = m.m00; val a01 = m.m01; val a02 = m.m02
      val a10 = m.m10; val a11 = m.m11; val a12 = m.m12
      val a20 = m.m20; val a21 = m.m21; val a22 = m.m22

      a00 * (a11 * a22 - a12 * a21) -
        a10 * (a01 * a22 - a02 * a21) +
        a20 * (a01 * a12 - a02 * a11)

trait Mat3ImmutableOps[Num: NumOps, Mat]:


  // format: off
  def create(
      m00: Num, m01: Num, m02: Num,
      m10: Num, m11: Num, m12: Num,
      m20: Num, m21: Num, m22: Num,
  ): Mat
  // format: on

  def from[Num2, Mat2_](
      other: Mat2_,
  )(using Mat3Base[Num2, Mat2_], Conversion[Num2, Num]): Mat =
    create(
      other.m00,
      other.m01,
      other.m02,
      other.m10,
      other.m11,
      other.m12,
      other.m20,
      other.m21,
      other.m22,
    )

  def fromRotationX(angle: Double)(using Conversion[Double, Num]): Mat =
    val c: Num = angle.cos; val s: Num = angle.sin
    val ns = -s
    val z = summon[NumOps[Num]].zero; val o = summon[NumOps[Num]].one
    create(o, z, z, z, c, s, z, ns, c)

  def fromRotationY(angle: Double)(using Conversion[Double, Num]): Mat =
    val c: Num = angle.cos; val s: Num = angle.sin
    val ns = -s
    val z = summon[NumOps[Num]].zero; val o = summon[NumOps[Num]].one
    create(c, z, ns, z, o, z, s, z, c)

  def fromRotationZ(angle: Double)(using Conversion[Double, Num]): Mat =
    val c: Num = angle.cos; val s: Num = angle.sin
    val ns = -s
    val z = summon[NumOps[Num]].zero; val o = summon[NumOps[Num]].one
    create(c, s, z, ns, c, z, z, z, o)

  def identity: Mat =
    val z = summon[NumOps[Num]].zero
    val o = summon[NumOps[Num]].one
    create(o, z, z, z, o, z, z, z, o)

  extension (m: Mat)(using Mat3Base[Num, Mat])
    def +(other: Mat): Mat = create(
      m.m00 + other.m00,
      m.m01 + other.m01,
      m.m02 + other.m02,
      m.m10 + other.m10,
      m.m11 + other.m11,
      m.m12 + other.m12,
      m.m20 + other.m20,
      m.m21 + other.m21,
      m.m22 + other.m22,
    )

    def -(other: Mat): Mat = create(
      m.m00 - other.m00,
      m.m01 - other.m01,
      m.m02 - other.m02,
      m.m10 - other.m10,
      m.m11 - other.m11,
      m.m12 - other.m12,
      m.m20 - other.m20,
      m.m21 - other.m21,
      m.m22 - other.m22,
    )

    @scala.annotation.targetName("scalarMul")
    def *(scalar: Num): Mat = create(
      m.m00 * scalar,
      m.m01 * scalar,
      m.m02 * scalar,
      m.m10 * scalar,
      m.m11 * scalar,
      m.m12 * scalar,
      m.m20 * scalar,
      m.m21 * scalar,
      m.m22 * scalar,
    )

    @scala.annotation.targetName("matMul")
    def *(other: Mat): Mat =
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
        a02 * b20 + a12 * b21 + a22 * b22,
      )

    @scala.annotation.targetName("vecMul")
    def *[Vec](
        v: Vec,
    )(using Vec3Base[Num, Vec], Vec3ImmutableOps[Num, Vec]): Vec =
      summon[Vec3ImmutableOps[Num, Vec]].create(
        m.m00 * v.x + m.m10 * v.y + m.m20 * v.z,
        m.m01 * v.x + m.m11 * v.y + m.m21 * v.z,
        m.m02 * v.x + m.m12 * v.y + m.m22 * v.z,
      )

    def transpose: Mat = create(
      m.m00,
      m.m10,
      m.m20,
      m.m01,
      m.m11,
      m.m21,
      m.m02,
      m.m12,
      m.m22,
    )

    def inverse: Mat =
      val a00 = m.m00; val a01 = m.m01; val a02 = m.m02
      val a10 = m.m10; val a11 = m.m11; val a12 = m.m12
      val a20 = m.m20; val a21 = m.m21; val a22 = m.m22
      // Cofactors (transposed = adjugate)
      val c00 = a11 * a22 - a12 * a21
      val c01 = -(a10 * a22 - a12 * a20)
      val c02 = a10 * a21 - a11 * a20
      val c10 = -(a01 * a22 - a02 * a21)
      val c11 = a00 * a22 - a02 * a20
      val c12 = -(a00 * a21 - a01 * a20)
      val c20 = a01 * a12 - a02 * a11
      val c21 = -(a00 * a12 - a02 * a10)
      val c22 = a00 * a11 - a01 * a10
      val det = a00 * c00 + a10 * c10 + a20 * c20
      val invDet = summon[NumOps[Num]].one / det
      create(
        c00 * invDet,
        c10 * invDet,
        c20 * invDet,
        c01 * invDet,
        c11 * invDet,
        c21 * invDet,
        c02 * invDet,
        c12 * invDet,
        c22 * invDet,
      )

    // RotX: col0 unchanged, col1/col2 mixed
    def rotateX(angle: Double)(using Conversion[Double, Num]): Mat =
      val c: Num = angle.cos; val s: Num = angle.sin
      val ns = -s
      create(
        m.m00,
        m.m01,
        m.m02,
        c * m.m10 + ns * m.m20,
        c * m.m11 + ns * m.m21,
        c * m.m12 + ns * m.m22,
        s * m.m10 + c * m.m20,
        s * m.m11 + c * m.m21,
        s * m.m12 + c * m.m22,
      )

    // RotY: col1 unchanged, col0/col2 mixed
    def rotateY(angle: Double)(using Conversion[Double, Num]): Mat =
      val c: Num = angle.cos; val s: Num = angle.sin
      val ns = -s
      create(
        c * m.m00 + s * m.m20,
        c * m.m01 + s * m.m21,
        c * m.m02 + s * m.m22,
        m.m10,
        m.m11,
        m.m12,
        ns * m.m00 + c * m.m20,
        ns * m.m01 + c * m.m21,
        ns * m.m02 + c * m.m22,
      )

    // RotZ: col2 unchanged, col0/col1 mixed
    def rotateZ(angle: Double)(using Conversion[Double, Num]): Mat =
      val c: Num = angle.cos; val s: Num = angle.sin
      val ns = -s
      create(
        c * m.m00 + ns * m.m10,
        c * m.m01 + ns * m.m11,
        c * m.m02 + ns * m.m12,
        s * m.m00 + c * m.m10,
        s * m.m01 + c * m.m11,
        s * m.m02 + c * m.m12,
        m.m20,
        m.m21,
        m.m22,
      )

trait Mat3MutableOps[Num: NumOps, Mat]:

  extension (m: Mat)(using mb: Mat3Mutable[Num, Mat])
    def set[Num2, Mat2_](
        other: Mat2_,
    )(using Mat3Base[Num2, Mat2_], Conversion[Num2, Num]): Unit =
      m.m00 = other.m00; m.m01 = other.m01; m.m02 = other.m02
      m.m10 = other.m10; m.m11 = other.m11; m.m12 = other.m12
      m.m20 = other.m20; m.m21 = other.m21; m.m22 = other.m22
    def :=[Num2, Mat2_](
        other: Mat2_,
    )(using Mat3Base[Num2, Mat2_], Conversion[Num2, Num]): Unit =
      m.set(other)

    def +=(other: Mat): Unit =
      m.m00 = m.m00 + other.m00; m.m01 = m.m01 + other.m01;
      m.m02 = m.m02 + other.m02
      m.m10 = m.m10 + other.m10; m.m11 = m.m11 + other.m11;
      m.m12 = m.m12 + other.m12
      m.m20 = m.m20 + other.m20; m.m21 = m.m21 + other.m21;
      m.m22 = m.m22 + other.m22

    def -=(other: Mat): Unit =
      m.m00 = m.m00 - other.m00; m.m01 = m.m01 - other.m01;
      m.m02 = m.m02 - other.m02
      m.m10 = m.m10 - other.m10; m.m11 = m.m11 - other.m11;
      m.m12 = m.m12 - other.m12
      m.m20 = m.m20 - other.m20; m.m21 = m.m21 - other.m21;
      m.m22 = m.m22 - other.m22

    def *=(scalar: Num): Unit =
      m.m00 = m.m00 * scalar; m.m01 = m.m01 * scalar; m.m02 = m.m02 * scalar
      m.m10 = m.m10 * scalar; m.m11 = m.m11 * scalar; m.m12 = m.m12 * scalar
      m.m20 = m.m20 * scalar; m.m21 = m.m21 * scalar; m.m22 = m.m22 * scalar

    def setIdentity(): Unit =
      val z = summon[NumOps[Num]].zero
      val o = summon[NumOps[Num]].one
      m.m00 = o; m.m01 = z; m.m02 = z
      m.m10 = z; m.m11 = o; m.m12 = z
      m.m20 = z; m.m21 = z; m.m22 = o

    def transposeTo(out: Mat): Mat =
      val a00 = m.m00; val a01 = m.m01; val a02 = m.m02
      val a10 = m.m10; val a11 = m.m11; val a12 = m.m12
      val a20 = m.m20; val a21 = m.m21; val a22 = m.m22
      out.m00 = a00; out.m01 = a10; out.m02 = a20
      out.m10 = a01; out.m11 = a11; out.m12 = a21
      out.m20 = a02; out.m21 = a12; out.m22 = a22
      out
    inline def transposeSelf: Mat = m.transposeTo(m)

    def inverseTo(out: Mat): Mat =
      val a00 = m.m00; val a01 = m.m01; val a02 = m.m02
      val a10 = m.m10; val a11 = m.m11; val a12 = m.m12
      val a20 = m.m20; val a21 = m.m21; val a22 = m.m22
      // Cofactors (transposed = adjugate)
      val c00 = a11 * a22 - a12 * a21
      val c01 = -(a10 * a22 - a12 * a20)
      val c02 = a10 * a21 - a11 * a20
      val c10 = -(a01 * a22 - a02 * a21)
      val c11 = a00 * a22 - a02 * a20
      val c12 = -(a00 * a21 - a01 * a20)
      val c20 = a01 * a12 - a02 * a11
      val c21 = -(a00 * a12 - a02 * a10)
      val c22 = a00 * a11 - a01 * a10
      val det = a00 * c00 + a10 * c10 + a20 * c20
      val invDet = summon[NumOps[Num]].one / det
      out.m00 = c00 * invDet; out.m01 = c10 * invDet; out.m02 = c20 * invDet
      out.m10 = c01 * invDet; out.m11 = c11 * invDet; out.m12 = c21 * invDet
      out.m20 = c02 * invDet; out.m21 = c12 * invDet; out.m22 = c22 * invDet
      out
    inline def inverseSelf: Mat = m.inverseTo(m)

    def rotateXTo(out: Mat, angle: Double)(using
        Conversion[Double, Num],
    ): Mat =
      val c: Num = angle.cos; val s: Num = angle.sin
      val ns = -s
      val t10 = m.m10; val t11 = m.m11; val t12 = m.m12
      val t20 = m.m20; val t21 = m.m21; val t22 = m.m22
      out.m00 = m.m00; out.m01 = m.m01; out.m02 = m.m02
      out.m10 = c * t10 + ns * t20; out.m11 = c * t11 + ns * t21;
      out.m12 = c * t12 + ns * t22
      out.m20 = s * t10 + c * t20; out.m21 = s * t11 + c * t21;
      out.m22 = s * t12 + c * t22
      out
    inline def rotateXSelf(angle: Double)(using Conversion[Double, Num]): Mat =
      m.rotateXTo(m, angle)

    def rotateYTo(out: Mat, angle: Double)(using
        Conversion[Double, Num],
    ): Mat =
      val c: Num = angle.cos; val s: Num = angle.sin
      val ns = -s
      val t00 = m.m00; val t01 = m.m01; val t02 = m.m02
      val t20 = m.m20; val t21 = m.m21; val t22 = m.m22
      out.m00 = c * t00 + s * t20; out.m01 = c * t01 + s * t21;
      out.m02 = c * t02 + s * t22
      out.m10 = m.m10; out.m11 = m.m11; out.m12 = m.m12
      out.m20 = ns * t00 + c * t20; out.m21 = ns * t01 + c * t21;
      out.m22 = ns * t02 + c * t22
      out
    inline def rotateYSelf(angle: Double)(using Conversion[Double, Num]): Mat =
      m.rotateYTo(m, angle)

    def rotateZTo(out: Mat, angle: Double)(using
        Conversion[Double, Num],
    ): Mat =
      val c: Num = angle.cos; val s: Num = angle.sin
      val ns = -s
      val t00 = m.m00; val t01 = m.m01; val t02 = m.m02
      val t10 = m.m10; val t11 = m.m11; val t12 = m.m12
      out.m00 = c * t00 + ns * t10; out.m01 = c * t01 + ns * t11;
      out.m02 = c * t02 + ns * t12
      out.m10 = s * t00 + c * t10; out.m11 = s * t01 + c * t11;
      out.m12 = s * t02 + c * t12
      out.m20 = m.m20; out.m21 = m.m21; out.m22 = m.m22
      out
    inline def rotateZSelf(angle: Double)(using Conversion[Double, Num]): Mat =
      m.rotateZTo(m, angle)

// format: on
