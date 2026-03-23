package graphics.math

import trivalibs.utils.numbers.NumExt.given
import trivalibs.utils.numbers.NumOps

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

    // format: off
    def determinant(using NumOps[Num]): Num =
      val a00 = m.m00; val a01 = m.m01; val a02 = m.m02; val a03 = m.m03
      val a10 = m.m10; val a11 = m.m11; val a12 = m.m12; val a13 = m.m13
      val a20 = m.m20; val a21 = m.m21; val a22 = m.m22; val a23 = m.m23
      val a30 = m.m30; val a31 = m.m31; val a32 = m.m32; val a33 = m.m33
      a00 * (a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22)) -
        a10 * (a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22)) +
        a20 * (a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12)) -
        a30 * (a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12))
    // format: on

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
trait Mat4ImmutableOps[Num: NumOps, Mat]:


  // format: off
  def create(
      m00: Num, m01: Num, m02: Num, m03: Num,
      m10: Num, m11: Num, m12: Num, m13: Num,
      m20: Num, m21: Num, m22: Num, m23: Num,
      m30: Num, m31: Num, m32: Num, m33: Num,
  ): Mat
  // format: on

  def from[Num2, Mat2_](other: Mat2_)(using Mat4Base[Num2, Mat2_], Conversion[Num2, Num]): Mat =
    create(
      other.m00, other.m01, other.m02, other.m03,
      other.m10, other.m11, other.m12, other.m13,
      other.m20, other.m21, other.m22, other.m23,
      other.m30, other.m31, other.m32, other.m33,
    )

  def fromRotationX(angle: Double)(using Conversion[Double, Num]): Mat =
    val c: Num = angle.cos; val s: Num = angle.sin
    val ns = -s
    val z = summon[NumOps[Num]].zero; val o = summon[NumOps[Num]].one
    create(o, z, z, z, z, c, s, z, z, ns, c, z, z, z, z, o)

  def fromRotationY(angle: Double)(using Conversion[Double, Num]): Mat =
    val c: Num = angle.cos; val s: Num = angle.sin
    val ns = -s
    val z = summon[NumOps[Num]].zero; val o = summon[NumOps[Num]].one
    create(c, z, ns, z, z, o, z, z, s, z, c, z, z, z, z, o)

  def fromRotationZ(angle: Double)(using Conversion[Double, Num]): Mat =
    val c: Num = angle.cos; val s: Num = angle.sin
    val ns = -s
    val z = summon[NumOps[Num]].zero; val o = summon[NumOps[Num]].one
    create(c, s, z, z, ns, c, z, z, z, z, o, z, z, z, z, o)

  def identity: Mat =
    val z = summon[NumOps[Num]].zero
    val o = summon[NumOps[Num]].one
    create(o, z, z, z, z, o, z, z, z, z, o, z, z, z, z, o)

  extension (m: Mat)(using Mat4Base[Num, Mat])
    def +(other: Mat): Mat = create(
      m.m00 + other.m00, m.m01 + other.m01, m.m02 + other.m02, m.m03 + other.m03,
      m.m10 + other.m10, m.m11 + other.m11, m.m12 + other.m12, m.m13 + other.m13,
      m.m20 + other.m20, m.m21 + other.m21, m.m22 + other.m22, m.m23 + other.m23,
      m.m30 + other.m30, m.m31 + other.m31, m.m32 + other.m32, m.m33 + other.m33
    )

    def -(other: Mat): Mat = create(
      m.m00 - other.m00, m.m01 - other.m01, m.m02 - other.m02, m.m03 - other.m03,
      m.m10 - other.m10, m.m11 - other.m11, m.m12 - other.m12, m.m13 - other.m13,
      m.m20 - other.m20, m.m21 - other.m21, m.m22 - other.m22, m.m23 - other.m23,
      m.m30 - other.m30, m.m31 - other.m31, m.m32 - other.m32, m.m33 - other.m33
    )

    @scala.annotation.targetName("scalarMul")
    def *(scalar: Num): Mat = create(
      m.m00 * scalar, m.m01 * scalar, m.m02 * scalar, m.m03 * scalar,
      m.m10 * scalar, m.m11 * scalar, m.m12 * scalar, m.m13 * scalar,
      m.m20 * scalar, m.m21 * scalar, m.m22 * scalar, m.m23 * scalar,
      m.m30 * scalar, m.m31 * scalar, m.m32 * scalar, m.m33 * scalar
    )

    @scala.annotation.targetName("matMul")
    def *(other: Mat): Mat =
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

    @scala.annotation.targetName("vecMul")
    def *[Vec](v: Vec)(using Vec4Base[Num, Vec], Vec4ImmutableOps[Num, Vec]): Vec =
      val vx = v.x; val vy = v.y; val vz = v.z; val vw = v.w
      summon[Vec4ImmutableOps[Num, Vec]].create(
        m.m00 * vx + m.m10 * vy + m.m20 * vz + m.m30 * vw,
        m.m01 * vx + m.m11 * vy + m.m21 * vz + m.m31 * vw,
        m.m02 * vx + m.m12 * vy + m.m22 * vz + m.m32 * vw,
        m.m03 * vx + m.m13 * vy + m.m23 * vz + m.m33 * vw,
      )

    def transpose: Mat = create(
      m.m00, m.m10, m.m20, m.m30,
      m.m01, m.m11, m.m21, m.m31,
      m.m02, m.m12, m.m22, m.m32,
      m.m03, m.m13, m.m23, m.m33
    )

    def inverse: Mat =
      val a00 = m.m00; val a01 = m.m01; val a02 = m.m02; val a03 = m.m03
      val a10 = m.m10; val a11 = m.m11; val a12 = m.m12; val a13 = m.m13
      val a20 = m.m20; val a21 = m.m21; val a22 = m.m22; val a23 = m.m23
      val a30 = m.m30; val a31 = m.m31; val a32 = m.m32; val a33 = m.m33
      // 2x2 sub-determinants
      val b00 = a00 * a11 - a01 * a10
      val b01 = a00 * a12 - a02 * a10
      val b02 = a00 * a13 - a03 * a10
      val b03 = a01 * a12 - a02 * a11
      val b04 = a01 * a13 - a03 * a11
      val b05 = a02 * a13 - a03 * a12
      val b06 = a20 * a31 - a21 * a30
      val b07 = a20 * a32 - a22 * a30
      val b08 = a20 * a33 - a23 * a30
      val b09 = a21 * a32 - a22 * a31
      val b10 = a21 * a33 - a23 * a31
      val b11 = a22 * a33 - a23 * a32
      val det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06
      val invDet = summon[NumOps[Num]].one / det
      create(
        ( a11 * b11 - a12 * b10 + a13 * b09) * invDet,
        (-a01 * b11 + a02 * b10 - a03 * b09) * invDet,
        ( a31 * b05 - a32 * b04 + a33 * b03) * invDet,
        (-a21 * b05 + a22 * b04 - a23 * b03) * invDet,
        (-a10 * b11 + a12 * b08 - a13 * b07) * invDet,
        ( a00 * b11 - a02 * b08 + a03 * b07) * invDet,
        (-a30 * b05 + a32 * b02 - a33 * b01) * invDet,
        ( a20 * b05 - a22 * b02 + a23 * b01) * invDet,
        ( a10 * b10 - a11 * b08 + a13 * b06) * invDet,
        (-a00 * b10 + a01 * b08 - a03 * b06) * invDet,
        ( a30 * b04 - a31 * b02 + a33 * b00) * invDet,
        (-a20 * b04 + a21 * b02 - a23 * b00) * invDet,
        (-a10 * b09 + a11 * b07 - a12 * b06) * invDet,
        ( a00 * b09 - a01 * b07 + a02 * b06) * invDet,
        (-a30 * b03 + a31 * b01 - a32 * b00) * invDet,
        ( a20 * b03 - a21 * b01 + a22 * b00) * invDet
      )

    // RotX: col0 unchanged, col1/col2 mixed, col3 unchanged
    def rotateX(angle: Double)(using Conversion[Double, Num]): Mat =
      val c: Num = angle.cos; val s: Num = angle.sin
      val ns = -s
      create(
        m.m00, m.m01, m.m02, m.m03,
        c * m.m10 + ns * m.m20, c * m.m11 + ns * m.m21, c * m.m12 + ns * m.m22, c * m.m13 + ns * m.m23,
        s * m.m10 + c * m.m20,  s * m.m11 + c * m.m21,  s * m.m12 + c * m.m22,  s * m.m13 + c * m.m23,
        m.m30, m.m31, m.m32, m.m33,
      )

    // RotY: col1 unchanged, col0/col2 mixed, col3 unchanged
    def rotateY(angle: Double)(using Conversion[Double, Num]): Mat =
      val c: Num = angle.cos; val s: Num = angle.sin
      val ns = -s
      create(
        c * m.m00 + s * m.m20,  c * m.m01 + s * m.m21,  c * m.m02 + s * m.m22,  c * m.m03 + s * m.m23,
        m.m10, m.m11, m.m12, m.m13,
        ns * m.m00 + c * m.m20, ns * m.m01 + c * m.m21, ns * m.m02 + c * m.m22, ns * m.m03 + c * m.m23,
        m.m30, m.m31, m.m32, m.m33,
      )

    // RotZ: col2 unchanged, col0/col1 mixed, col3 unchanged
    def rotateZ(angle: Double)(using Conversion[Double, Num]): Mat =
      val c: Num = angle.cos; val s: Num = angle.sin
      val ns = -s
      create(
        c * m.m00 + ns * m.m10, c * m.m01 + ns * m.m11, c * m.m02 + ns * m.m12, c * m.m03 + ns * m.m13,
        s * m.m00 + c * m.m10,  s * m.m01 + c * m.m11,  s * m.m02 + c * m.m12,  s * m.m03 + c * m.m13,
        m.m20, m.m21, m.m22, m.m23,
        m.m30, m.m31, m.m32, m.m33,
      )

trait Mat4MutableOps[Num: NumOps, Mat]:


  extension (m: Mat)(using mb: Mat4Mutable[Num, Mat])
    def set[Num2, Mat2_](other: Mat2_)(using Mat4Base[Num2, Mat2_], Conversion[Num2, Num]): Unit =
      m.m00 = other.m00; m.m01 = other.m01; m.m02 = other.m02; m.m03 = other.m03
      m.m10 = other.m10; m.m11 = other.m11; m.m12 = other.m12; m.m13 = other.m13
      m.m20 = other.m20; m.m21 = other.m21; m.m22 = other.m22; m.m23 = other.m23
      m.m30 = other.m30; m.m31 = other.m31; m.m32 = other.m32; m.m33 = other.m33
    def :=[Num2, Mat2_](other: Mat2_)(using Mat4Base[Num2, Mat2_], Conversion[Num2, Num]): Unit =
      m.set(other)

    def +=(other: Mat): Unit =
      m.m00 = m.m00 + other.m00; m.m01 = m.m01 + other.m01; m.m02 = m.m02 + other.m02; m.m03 = m.m03 + other.m03
      m.m10 = m.m10 + other.m10; m.m11 = m.m11 + other.m11; m.m12 = m.m12 + other.m12; m.m13 = m.m13 + other.m13
      m.m20 = m.m20 + other.m20; m.m21 = m.m21 + other.m21; m.m22 = m.m22 + other.m22; m.m23 = m.m23 + other.m23
      m.m30 = m.m30 + other.m30; m.m31 = m.m31 + other.m31; m.m32 = m.m32 + other.m32; m.m33 = m.m33 + other.m33

    def -=(other: Mat): Unit =
      m.m00 = m.m00 - other.m00; m.m01 = m.m01 - other.m01; m.m02 = m.m02 - other.m02; m.m03 = m.m03 - other.m03
      m.m10 = m.m10 - other.m10; m.m11 = m.m11 - other.m11; m.m12 = m.m12 - other.m12; m.m13 = m.m13 - other.m13
      m.m20 = m.m20 - other.m20; m.m21 = m.m21 - other.m21; m.m22 = m.m22 - other.m22; m.m23 = m.m23 - other.m23
      m.m30 = m.m30 - other.m30; m.m31 = m.m31 - other.m31; m.m32 = m.m32 - other.m32; m.m33 = m.m33 - other.m33

    def *=(scalar: Num): Unit =
      m.m00 = m.m00 * scalar; m.m01 = m.m01 * scalar; m.m02 = m.m02 * scalar; m.m03 = m.m03 * scalar
      m.m10 = m.m10 * scalar; m.m11 = m.m11 * scalar; m.m12 = m.m12 * scalar; m.m13 = m.m13 * scalar
      m.m20 = m.m20 * scalar; m.m21 = m.m21 * scalar; m.m22 = m.m22 * scalar; m.m23 = m.m23 * scalar
      m.m30 = m.m30 * scalar; m.m31 = m.m31 * scalar; m.m32 = m.m32 * scalar; m.m33 = m.m33 * scalar

    def setIdentity(): Unit =
      val z = summon[NumOps[Num]].zero
      val o = summon[NumOps[Num]].one
      m.m00 = o; m.m01 = z; m.m02 = z; m.m03 = z
      m.m10 = z; m.m11 = o; m.m12 = z; m.m13 = z
      m.m20 = z; m.m21 = z; m.m22 = o; m.m23 = z
      m.m30 = z; m.m31 = z; m.m32 = z; m.m33 = o

    def transposeTo(out: Mat): Mat =
      val a00 = m.m00; val a01 = m.m01; val a02 = m.m02; val a03 = m.m03
      val a10 = m.m10; val a11 = m.m11; val a12 = m.m12; val a13 = m.m13
      val a20 = m.m20; val a21 = m.m21; val a22 = m.m22; val a23 = m.m23
      val a30 = m.m30; val a31 = m.m31; val a32 = m.m32; val a33 = m.m33
      out.m00 = a00; out.m01 = a10; out.m02 = a20; out.m03 = a30
      out.m10 = a01; out.m11 = a11; out.m12 = a21; out.m13 = a31
      out.m20 = a02; out.m21 = a12; out.m22 = a22; out.m23 = a32
      out.m30 = a03; out.m31 = a13; out.m32 = a23; out.m33 = a33
      out
    inline def transposeSelf: Mat = m.transposeTo(m)

    def inverseTo(out: Mat): Mat =
      val a00 = m.m00; val a01 = m.m01; val a02 = m.m02; val a03 = m.m03
      val a10 = m.m10; val a11 = m.m11; val a12 = m.m12; val a13 = m.m13
      val a20 = m.m20; val a21 = m.m21; val a22 = m.m22; val a23 = m.m23
      val a30 = m.m30; val a31 = m.m31; val a32 = m.m32; val a33 = m.m33
      // 2x2 sub-determinants
      val b00 = a00 * a11 - a01 * a10
      val b01 = a00 * a12 - a02 * a10
      val b02 = a00 * a13 - a03 * a10
      val b03 = a01 * a12 - a02 * a11
      val b04 = a01 * a13 - a03 * a11
      val b05 = a02 * a13 - a03 * a12
      val b06 = a20 * a31 - a21 * a30
      val b07 = a20 * a32 - a22 * a30
      val b08 = a20 * a33 - a23 * a30
      val b09 = a21 * a32 - a22 * a31
      val b10 = a21 * a33 - a23 * a31
      val b11 = a22 * a33 - a23 * a32
      val det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06
      val invDet = summon[NumOps[Num]].one / det
      out.m00 = ( a11 * b11 - a12 * b10 + a13 * b09) * invDet
      out.m01 = (-a01 * b11 + a02 * b10 - a03 * b09) * invDet
      out.m02 = ( a31 * b05 - a32 * b04 + a33 * b03) * invDet
      out.m03 = (-a21 * b05 + a22 * b04 - a23 * b03) * invDet
      out.m10 = (-a10 * b11 + a12 * b08 - a13 * b07) * invDet
      out.m11 = ( a00 * b11 - a02 * b08 + a03 * b07) * invDet
      out.m12 = (-a30 * b05 + a32 * b02 - a33 * b01) * invDet
      out.m13 = ( a20 * b05 - a22 * b02 + a23 * b01) * invDet
      out.m20 = ( a10 * b10 - a11 * b08 + a13 * b06) * invDet
      out.m21 = (-a00 * b10 + a01 * b08 - a03 * b06) * invDet
      out.m22 = ( a30 * b04 - a31 * b02 + a33 * b00) * invDet
      out.m23 = (-a20 * b04 + a21 * b02 - a23 * b00) * invDet
      out.m30 = (-a10 * b09 + a11 * b07 - a12 * b06) * invDet
      out.m31 = ( a00 * b09 - a01 * b07 + a02 * b06) * invDet
      out.m32 = (-a30 * b03 + a31 * b01 - a32 * b00) * invDet
      out.m33 = ( a20 * b03 - a21 * b01 + a22 * b00) * invDet
      out
    inline def inverseSelf: Mat = m.inverseTo(m)

    def rotateXTo(out: Mat, angle: Double)(using Conversion[Double, Num]): Mat =
      val c: Num = angle.cos; val s: Num = angle.sin
      val ns = -s
      val t10 = m.m10; val t11 = m.m11; val t12 = m.m12; val t13 = m.m13
      val t20 = m.m20; val t21 = m.m21; val t22 = m.m22; val t23 = m.m23
      out.m00 = m.m00; out.m01 = m.m01; out.m02 = m.m02; out.m03 = m.m03
      out.m10 = c * t10 + ns * t20; out.m11 = c * t11 + ns * t21; out.m12 = c * t12 + ns * t22; out.m13 = c * t13 + ns * t23
      out.m20 = s * t10 + c * t20;  out.m21 = s * t11 + c * t21;  out.m22 = s * t12 + c * t22;  out.m23 = s * t13 + c * t23
      out.m30 = m.m30; out.m31 = m.m31; out.m32 = m.m32; out.m33 = m.m33
      out
    inline def rotateXSelf(angle: Double)(using Conversion[Double, Num]): Mat =
      m.rotateXTo(m, angle)

    def rotateYTo(out: Mat, angle: Double)(using Conversion[Double, Num]): Mat =
      val c: Num = angle.cos; val s: Num = angle.sin
      val ns = -s
      val t00 = m.m00; val t01 = m.m01; val t02 = m.m02; val t03 = m.m03
      val t20 = m.m20; val t21 = m.m21; val t22 = m.m22; val t23 = m.m23
      out.m00 = c * t00 + s * t20;  out.m01 = c * t01 + s * t21;  out.m02 = c * t02 + s * t22;  out.m03 = c * t03 + s * t23
      out.m10 = m.m10; out.m11 = m.m11; out.m12 = m.m12; out.m13 = m.m13
      out.m20 = ns * t00 + c * t20; out.m21 = ns * t01 + c * t21; out.m22 = ns * t02 + c * t22; out.m23 = ns * t03 + c * t23
      out.m30 = m.m30; out.m31 = m.m31; out.m32 = m.m32; out.m33 = m.m33
      out
    inline def rotateYSelf(angle: Double)(using Conversion[Double, Num]): Mat =
      m.rotateYTo(m, angle)

    def rotateZTo(out: Mat, angle: Double)(using Conversion[Double, Num]): Mat =
      val c: Num = angle.cos; val s: Num = angle.sin
      val ns = -s
      val t00 = m.m00; val t01 = m.m01; val t02 = m.m02; val t03 = m.m03
      val t10 = m.m10; val t11 = m.m11; val t12 = m.m12; val t13 = m.m13
      out.m00 = c * t00 + ns * t10; out.m01 = c * t01 + ns * t11; out.m02 = c * t02 + ns * t12; out.m03 = c * t03 + ns * t13
      out.m10 = s * t00 + c * t10;  out.m11 = s * t01 + c * t11;  out.m12 = s * t02 + c * t12;  out.m13 = s * t03 + c * t13
      out.m20 = m.m20; out.m21 = m.m21; out.m22 = m.m22; out.m23 = m.m23
      out.m30 = m.m30; out.m31 = m.m31; out.m32 = m.m32; out.m33 = m.m33
      out
    inline def rotateZSelf(angle: Double)(using Conversion[Double, Num]): Mat =
      m.rotateZTo(m, angle)

// format: on
