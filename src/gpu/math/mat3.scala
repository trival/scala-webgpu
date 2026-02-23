package gpu.math

import trivalibs.bufferdata.F32
import trivalibs.bufferdata.StructRef

// Column-major 3x3 matrix traits
// Storage order: m00, m01, m02, m10, m11, m12, m20, m21, m22
// mColRow convention: m10 = column 1, row 0

trait Mat3Base[Primitive, T]:
  extension (m: T)
    def m00: Primitive
    def m01: Primitive
    def m02: Primitive
    def m10: Primitive
    def m11: Primitive
    def m12: Primitive
    def m20: Primitive
    def m21: Primitive
    def m22: Primitive

    // Column getters (derived from abstract mNN accessors)
    inline def col0: (Primitive, Primitive, Primitive) = (m00, m01, m02)
    inline def col1: (Primitive, Primitive, Primitive) = (m10, m11, m12)
    inline def col2: (Primitive, Primitive, Primitive) = (m20, m21, m22)

    // Row getters (derived from abstract mNN accessors)
    inline def row0: (Primitive, Primitive, Primitive) = (m00, m10, m20)
    inline def row1: (Primitive, Primitive, Primitive) = (m01, m11, m21)
    inline def row2: (Primitive, Primitive, Primitive) = (m02, m12, m22)

trait Mat3Mutable[Primitive, T] extends Mat3Base[Primitive, T]:
  extension (m: T)
    def m00_=(v: Primitive): Unit
    def m01_=(v: Primitive): Unit
    def m02_=(v: Primitive): Unit
    def m10_=(v: Primitive): Unit
    def m11_=(v: Primitive): Unit
    def m12_=(v: Primitive): Unit
    def m20_=(v: Primitive): Unit
    def m21_=(v: Primitive): Unit
    def m22_=(v: Primitive): Unit

    // Column setters (derived from abstract mNN_= setters)
    inline def col0_=(c: (Primitive, Primitive, Primitive)): Unit =
      m.m00 = c._1; m.m01 = c._2; m.m02 = c._3
    inline def col1_=(c: (Primitive, Primitive, Primitive)): Unit =
      m.m10 = c._1; m.m11 = c._2; m.m12 = c._3
    inline def col2_=(c: (Primitive, Primitive, Primitive)): Unit =
      m.m20 = c._1; m.m21 = c._2; m.m22 = c._3

    // Row setters (derived from abstract mNN_= setters)
    inline def row0_=(r: (Primitive, Primitive, Primitive)): Unit =
      m.m00 = r._1; m.m10 = r._2; m.m20 = r._3
    inline def row1_=(r: (Primitive, Primitive, Primitive)): Unit =
      m.m01 = r._1; m.m11 = r._2; m.m21 = r._3
    inline def row2_=(r: (Primitive, Primitive, Primitive)): Unit =
      m.m02 = r._1; m.m12 = r._2; m.m22 = r._3

// format: off
trait Mat3SharedOps[Mat, Primitive: Numeric]:
  import Numeric.Implicits.given

  extension (m: Mat)(using Mat3Base[Primitive, Mat])
    inline def determinant: Primitive =
      val a00 = m.m00; val a01 = m.m01; val a02 = m.m02
      val a10 = m.m10; val a11 = m.m11; val a12 = m.m12
      val a20 = m.m20; val a21 = m.m21; val a22 = m.m22

      a00 * (a11 * a22 - a12 * a21) -
        a10 * (a01 * a22 - a02 * a21) +
        a20 * (a01 * a12 - a02 * a11)

trait Mat3ImmutableOps[Mat, Primitive: Numeric]:
  import Numeric.Implicits.given

  extension (m: Mat)(using Mat3Base[Primitive, Mat])
    inline def create(
        m00: Primitive, m01: Primitive, m02: Primitive,
        m10: Primitive, m11: Primitive, m12: Primitive,
        m20: Primitive, m21: Primitive, m22: Primitive
    ): Mat

    inline def identity: Mat =
      val z = summon[Numeric[Primitive]].zero
      val o = summon[Numeric[Primitive]].one
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
    inline def *(scalar: Primitive): Mat = create(
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

    inline def transpose: Mat = create(
      m.m00, m.m10, m.m20,
      m.m01, m.m11, m.m21,
      m.m02, m.m12, m.m22
    )

trait Mat3MutableOps[Mat, Primitive: Numeric]:
  import Numeric.Implicits.given

  extension (m: Mat)(using mb: Mat3Mutable[Primitive, Mat])
    inline def +=(other: Mat): Unit =
      m.m00 = m.m00 + other.m00; m.m01 = m.m01 + other.m01; m.m02 = m.m02 + other.m02
      m.m10 = m.m10 + other.m10; m.m11 = m.m11 + other.m11; m.m12 = m.m12 + other.m12
      m.m20 = m.m20 + other.m20; m.m21 = m.m21 + other.m21; m.m22 = m.m22 + other.m22

    inline def -=(other: Mat): Unit =
      m.m00 = m.m00 - other.m00; m.m01 = m.m01 - other.m01; m.m02 = m.m02 - other.m02
      m.m10 = m.m10 - other.m10; m.m11 = m.m11 - other.m11; m.m12 = m.m12 - other.m12
      m.m20 = m.m20 - other.m20; m.m21 = m.m21 - other.m21; m.m22 = m.m22 - other.m22

    inline def *=(scalar: Primitive): Unit =
      m.m00 = m.m00 * scalar; m.m01 = m.m01 * scalar; m.m02 = m.m02 * scalar
      m.m10 = m.m10 * scalar; m.m11 = m.m11 * scalar; m.m12 = m.m12 * scalar
      m.m20 = m.m20 * scalar; m.m21 = m.m21 * scalar; m.m22 = m.m22 * scalar

    inline def setIdentity(): Unit =
      val z = summon[Numeric[Primitive]].zero
      val o = summon[Numeric[Primitive]].one
      m.m00 = o; m.m01 = z; m.m02 = z
      m.m10 = z; m.m11 = o; m.m12 = z
      m.m20 = z; m.m21 = z; m.m22 = o
// format: on

// === implementations for common matrix types ===

type Mat3Buffer = (F32, F32, F32, F32, F32, F32, F32, F32, F32)

object Mat3Buffer:
  given Mat3Mutable[Float, StructRef[Mat3Buffer]]:
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

  given Mat3SharedOps[StructRef[Mat3Buffer], Float] =
    new Mat3SharedOps[StructRef[Mat3Buffer], Float] {}

  given Mat3MutableOps[StructRef[Mat3Buffer], Float] =
    new Mat3MutableOps[StructRef[Mat3Buffer], Float] {}

// format: off
type Mat3PaddedBuffer = (F32, F32, F32, F32, F32, F32, F32, F32, F32, F32, F32, F32)
// format: on

object Mat3PaddedBuffer:
  given Mat3Mutable[Float, StructRef[Mat3PaddedBuffer]]:
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

  given Mat3SharedOps[StructRef[Mat3PaddedBuffer], Float] =
    new Mat3SharedOps[StructRef[Mat3PaddedBuffer], Float] {}

  given Mat3MutableOps[StructRef[Mat3PaddedBuffer], Float] =
    new Mat3MutableOps[StructRef[Mat3PaddedBuffer], Float] {}

// format: off
type Mat3Tuple = (
    Float, Float, Float,
    Float, Float, Float,
    Float, Float, Float
)
// format: on

object Mat3Tuple:

  // format: off
  given Mat3Base[Float, Mat3Tuple]:
    extension (m: Mat3Tuple)
      inline def m00 = m._1; inline def m01 = m._2; inline def m02 = m._3
      inline def m10 = m._4; inline def m11 = m._5; inline def m12 = m._6
      inline def m20 = m._7; inline def m21 = m._8; inline def m22 = m._9
  // format: on

  given Mat3SharedOps[Mat3Tuple, Float] =
    new Mat3SharedOps[Mat3Tuple, Float] {}

  // format: off
  given Mat3ImmutableOps[Mat3Tuple, Float]:
    extension (m: Mat3Tuple)(using Mat3Base[Float, Mat3Tuple])
      inline def create(
          m00: Float, m01: Float, m02: Float,
          m10: Float, m11: Float, m12: Float,
          m20: Float, m21: Float, m22: Float
      ) = (m00, m01, m02, m10, m11, m12, m20, m21, m22)
  // format: on

// format: off
class Mat3(
    var m00: Float = 1f, var m01: Float = 0f, var m02: Float = 0f,
    var m10: Float = 0f, var m11: Float = 1f, var m12: Float = 0f,
    var m20: Float = 0f, var m21: Float = 0f, var m22: Float = 1f
)
// format: on

object Mat3:
  given Mat3Mutable[Float, Mat3]:
    extension (m: Mat3)
      inline def m00: Float = m.m00
      inline def m01: Float = m.m01
      inline def m02: Float = m.m02
      inline def m10: Float = m.m10
      inline def m11: Float = m.m11
      inline def m12: Float = m.m12
      inline def m20: Float = m.m20
      inline def m21: Float = m.m21
      inline def m22: Float = m.m22
      inline def m00_=(v: Float) = m.m00 = v
      inline def m01_=(v: Float) = m.m01 = v
      inline def m02_=(v: Float) = m.m02 = v
      inline def m10_=(v: Float) = m.m10 = v
      inline def m11_=(v: Float) = m.m11 = v
      inline def m12_=(v: Float) = m.m12 = v
      inline def m20_=(v: Float) = m.m20 = v
      inline def m21_=(v: Float) = m.m21 = v
      inline def m22_=(v: Float) = m.m22 = v

  // format: off
  given Mat3ImmutableOps[Mat3, Float]:
    extension (m: Mat3)(using Mat3Base[Float, Mat3])
      inline def create(
          m00: Float, m01: Float, m02: Float,
          m10: Float, m11: Float, m12: Float,
          m20: Float, m21: Float, m22: Float
      ) = Mat3(m00, m01, m02, m10, m11, m12, m20, m21, m22)
  // format: on

  given Mat3MutableOps[Mat3, Float] = new Mat3MutableOps[Mat3, Float] {}

  given Mat3SharedOps[Mat3, Float] = new Mat3SharedOps[Mat3, Float] {}
