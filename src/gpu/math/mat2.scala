package gpu.math

import trivalibs.bufferdata.F32
import trivalibs.bufferdata.StructRef

// Column-major 2x2 matrix traits
// Storage order: m00, m01, m10, m11
// mColRow convention: m10 = column 1, row 0

trait Mat2Base[Primitive, T]:
  extension (m: T)
    def m00: Primitive
    def m01: Primitive
    def m10: Primitive
    def m11: Primitive

    // Column getters (derived from abstract mNN accessors)
    inline def col0: (Primitive, Primitive) = (m00, m01)
    inline def col1: (Primitive, Primitive) = (m10, m11)

    // Row getters (derived from abstract mNN accessors)
    inline def row0: (Primitive, Primitive) = (m00, m10)
    inline def row1: (Primitive, Primitive) = (m01, m11)

trait Mat2Mutable[Primitive, T] extends Mat2Base[Primitive, T]:
  extension (m: T)
    def m00_=(v: Primitive): Unit
    def m01_=(v: Primitive): Unit
    def m10_=(v: Primitive): Unit
    def m11_=(v: Primitive): Unit

    // Column setters (derived from abstract mNN_= setters)
    inline def col0_=(c: (Primitive, Primitive)): Unit =
      m.m00 = c._1; m.m01 = c._2
    inline def col1_=(c: (Primitive, Primitive)): Unit =
      m.m10 = c._1; m.m11 = c._2

    // Row setters (derived from abstract mNN_= setters)
    inline def row0_=(r: (Primitive, Primitive)): Unit =
      m.m00 = r._1; m.m10 = r._2
    inline def row1_=(r: (Primitive, Primitive)): Unit =
      m.m01 = r._1; m.m11 = r._2

// format: off
trait Mat2SharedOps[Mat, Primitive: Numeric]:
  import Numeric.Implicits.given

  extension (m: Mat)(using Mat2Base[Primitive, Mat])
    inline def determinant: Primitive =
      m.m00 * m.m11 - m.m10 * m.m01

trait Mat2ImmutableOps[Mat, Primitive: Numeric]:
  import Numeric.Implicits.given

  extension (m: Mat)(using Mat2Base[Primitive, Mat])
    inline def create(
        m00: Primitive, m01: Primitive,
        m10: Primitive, m11: Primitive
    ): Mat

    inline def identity: Mat =
      val z = summon[Numeric[Primitive]].zero
      val o = summon[Numeric[Primitive]].one
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
    inline def *(scalar: Primitive): Mat = create(
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

    inline def transpose: Mat = create(
      m.m00, m.m10,
      m.m01, m.m11
    )

trait Mat2MutableOps[Mat, Primitive: Numeric]:
  import Numeric.Implicits.given

  extension (m: Mat)(using mb: Mat2Mutable[Primitive, Mat])
    inline def +=(other: Mat): Unit =
      m.m00 = m.m00 + other.m00; m.m01 = m.m01 + other.m01
      m.m10 = m.m10 + other.m10; m.m11 = m.m11 + other.m11

    inline def -=(other: Mat): Unit =
      m.m00 = m.m00 - other.m00; m.m01 = m.m01 - other.m01
      m.m10 = m.m10 - other.m10; m.m11 = m.m11 - other.m11

    inline def *=(scalar: Primitive): Unit =
      m.m00 = m.m00 * scalar; m.m01 = m.m01 * scalar
      m.m10 = m.m10 * scalar; m.m11 = m.m11 * scalar

    inline def setIdentity(): Unit =
      val z = summon[Numeric[Primitive]].zero
      val o = summon[Numeric[Primitive]].one
      m.m00 = o; m.m01 = z
      m.m10 = z; m.m11 = o
// format: on

// === implementations for common matrix types ===

// ==== Float Mat2 types ====

type Mat2Buffer = (F32, F32, F32, F32)

object Mat2Buffer:
  given Mat2Mutable[Float, StructRef[Mat2Buffer]]:
    extension (m: StructRef[Mat2Buffer])
      inline def m00: Float = m(0)()
      inline def m01: Float = m(1)()
      inline def m10: Float = m(2)()
      inline def m11: Float = m(3)()
      inline def m00_=(v: Float) = m(0)(v)
      inline def m01_=(v: Float) = m(1)(v)
      inline def m10_=(v: Float) = m(2)(v)
      inline def m11_=(v: Float) = m(3)(v)

  given Mat2SharedOps[StructRef[Mat2Buffer], Float] =
    new Mat2SharedOps[StructRef[Mat2Buffer], Float] {}

  given Mat2MutableOps[StructRef[Mat2Buffer], Float] =
    new Mat2MutableOps[StructRef[Mat2Buffer], Float] {}

type Mat2Tuple = (Float, Float, Float, Float)

object Mat2Tuple:

  // format: off
  given Mat2Base[Float, Mat2Tuple]:
    extension (m: Mat2Tuple)
      inline def m00 = m._1; inline def m01 = m._2
      inline def m10 = m._3; inline def m11 = m._4
  // format: on

  given Mat2SharedOps[Mat2Tuple, Float] =
    new Mat2SharedOps[Mat2Tuple, Float] {}

  // format: off
  given Mat2ImmutableOps[Mat2Tuple, Float]:
    extension (m: Mat2Tuple)(using Mat2Base[Float, Mat2Tuple])
      inline def create(
          m00: Float, m01: Float,
          m10: Float, m11: Float
      ) = (m00, m01, m10, m11)
  // format: on

// format: off
class Mat2(
    var m00: Float = 1f, var m01: Float = 0f,
    var m10: Float = 0f, var m11: Float = 1f
)
// format: on

object Mat2:
  type Uniform = Mat2Buffer

  given Mat2Mutable[Float, Mat2]:
    extension (m: Mat2)
      inline def m00: Float = m.m00
      inline def m01: Float = m.m01
      inline def m10: Float = m.m10
      inline def m11: Float = m.m11
      inline def m00_=(v: Float) = m.m00 = v
      inline def m01_=(v: Float) = m.m01 = v
      inline def m10_=(v: Float) = m.m10 = v
      inline def m11_=(v: Float) = m.m11 = v

  // format: off
  given Mat2ImmutableOps[Mat2, Float]:
    extension (m: Mat2)(using Mat2Base[Float, Mat2])
      inline def create(
          m00: Float, m01: Float,
          m10: Float, m11: Float
      ) = Mat2(m00, m01, m10, m11)
  // format: on

  given Mat2MutableOps[Mat2, Float] = new Mat2MutableOps[Mat2, Float] {}

  given Mat2SharedOps[Mat2, Float] = new Mat2SharedOps[Mat2, Float] {}
