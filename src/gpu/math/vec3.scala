package gpu.math

import gpu.WGSLType
import trivalibs.bufferdata.F32
import trivalibs.bufferdata.F64

trait Vec3Base[Primitive, T]:
  extension (v: T)
    def x: Primitive
    def y: Primitive
    def z: Primitive
    inline def r: Primitive = x
    inline def g: Primitive = y
    inline def b: Primitive = z

trait Vec3Mutable[Primitive, T] extends Vec3Base[Primitive, T]:
  extension (v: T)
    def x_=(value: Primitive): Unit
    def y_=(value: Primitive): Unit
    def z_=(value: Primitive): Unit

trait Vec3SharedOps[Vec, Primitive: Numeric]:
  import Numeric.Implicits.given

  extension (v: Vec)(using Vec3Base[Primitive, Vec])
    inline def dot(other: Vec): Primitive =
      v.x * other.x + v.y * other.y + v.z * other.z

trait Vec3ImmutableOps[Vec, Primitive: Numeric]:
  import Numeric.Implicits.given

  extension (v: Vec)(using Vec3Base[Primitive, Vec])
    inline def create(x: Primitive, y: Primitive, z: Primitive): Vec

    inline def +(other: Vec): Vec =
      create(v.x + other.x, v.y + other.y, v.z + other.z)
    inline def -(other: Vec): Vec =
      create(v.x - other.x, v.y - other.y, v.z - other.z)
    inline def *(scalar: Primitive): Vec =
      create(v.x * scalar, v.y * scalar, v.z * scalar)
    inline def cross(other: Vec): Vec =
      v.create(
        v.y * other.z - v.z * other.y,
        v.z * other.x - v.x * other.z,
        v.x * other.y - v.y * other.x
      )

trait Vec3MutableOps[Vec, Primitive: Numeric]:
  import Numeric.Implicits.given

  extension (
      v: Vec
  )(using Vec3Mutable[Primitive, Vec])
    inline def +=(other: Vec): Unit =
      v.x = v.x + other.x
      v.y = v.y + other.y
      v.z = v.z + other.z

    inline def -=(other: Vec): Unit =
      v.x = v.x - other.x
      v.y = v.y - other.y
      v.z = v.z - other.z

    inline def *=(scalar: Primitive): Unit =
      v.x = v.x * scalar
      v.y = v.y * scalar
      v.z = v.z * scalar

class Vec3(var x: Float = 0f, var y: Float = 0f, var z: Float = 0f)

object Vec3:
  type Attrib = F32 *: F32 *: F32 *: EmptyTuple
  type Uniform = F32 *: F32 *: F32 *: F32 *: EmptyTuple

  given WGSLType[Vec3]:
    def wgslName = "vec3<f32>"
    def byteSize = 12
    def alignment = 16 // WGSL alignment rules
    def vertexFormat = "float32x3"

  given Vec3Mutable[Float, Vec3]:
    extension (v: Vec3)
      inline def x: Float = v.x
      inline def y: Float = v.y
      inline def z: Float = v.z
      inline def x_=(value: Float): Unit = v.x = value
      inline def y_=(value: Float): Unit = v.y = value
      inline def z_=(value: Float): Unit = v.z = value

  given Vec3ImmutableOps[Vec3, Float]:
    extension (v: Vec3)(using Vec3Base[Float, Vec3])
      inline def create(x: Float, y: Float, z: Float) = Vec3(x, y, z)

  given Vec3MutableOps[Vec3, Float] = new Vec3MutableOps[Vec3, Float] {}

  given Vec3SharedOps[Vec3, Float] = new Vec3SharedOps[Vec3, Float] {}

type Vec3Tuple = (Float, Float, Float)

object Vec3Tuple:

  given Vec3Base[Float, Vec3Tuple]:
    extension (v: Vec3Tuple)
      inline def x: Float = v._1
      inline def y: Float = v._2
      inline def z: Float = v._3

  given Vec3SharedOps[Vec3Tuple, Float] =
    new Vec3SharedOps[Vec3Tuple, Float] {}

  given Vec3ImmutableOps[Vec3Tuple, Float]:
    extension (v: Vec3Tuple)(using
        Vec3Base[Float, Vec3Tuple]
    ) inline def create(x: Float, y: Float, z: Float) = (x, y, z)

class Vec3d(var x: Double = 0.0, var y: Double = 0.0, var z: Double = 0.0)

object Vec3d:
  type Attrib = F64 *: F64 *: F64 *: EmptyTuple
  type Uniform = F64 *: F64 *: F64 *: F64 *: EmptyTuple

  given WGSLType[Vec3d]:
    def wgslName = "vec3<f64>"
    def byteSize = 24
    def alignment = 32
    def vertexFormat = "float64x3"

  given Vec3Mutable[Double, Vec3d]:
    extension (v: Vec3d)
      inline def x: Double = v.x
      inline def y: Double = v.y
      inline def z: Double = v.z
      inline def x_=(value: Double): Unit = v.x = value
      inline def y_=(value: Double): Unit = v.y = value
      inline def z_=(value: Double): Unit = v.z = value

  given Vec3SharedOps[Vec3d, Double] = new Vec3SharedOps[Vec3d, Double] {}

  given Vec3ImmutableOps[Vec3d, Double]:
    extension (v: Vec3d)(using Vec3Base[Double, Vec3d])
      inline def create(x: Double, y: Double, z: Double) = Vec3d(x, y, z)

  given Vec3MutableOps[Vec3d, Double] = new Vec3MutableOps[Vec3d, Double] {}

type Vec3dTuple = (Double, Double, Double)

object Vec3dTuple:

  given Vec3Base[Double, Vec3dTuple]:
    extension (v: Vec3dTuple)
      inline def x: Double = v._1
      inline def y: Double = v._2
      inline def z: Double = v._3

  given Vec3SharedOps[Vec3dTuple, Double] =
    new Vec3SharedOps[Vec3dTuple, Double] {}

  given Vec3ImmutableOps[Vec3dTuple, Double]:
    extension (v: Vec3dTuple)(using
        Vec3Base[Double, Vec3dTuple]
    ) inline def create(x: Double, y: Double, z: Double) = (x, y, z)
