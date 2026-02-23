package gpu.shader

import gpu.math.*
import trivalibs.bufferdata.F32

import scala.compiletime.*

/** Type class for WGSL-compatible types */
trait WGSLType[T]:
  def wgslName: String
  def byteSize: Int
  def alignment: Int
  def vertexFormat: String

object WGSLType:
  inline def apply[T](using wt: WGSLType[T]): WGSLType[T] = wt

// =============================================================================
// Primitive Types
// =============================================================================

given WGSLType[Float]:
  def wgslName = "f32"
  def byteSize = 4
  def alignment = 4
  def vertexFormat = "float32"

given WGSLType[Vec2]:
  def wgslName = "vec2<f32>"
  def byteSize = 8
  def alignment = 8
  def vertexFormat = "float32x2"

given WGSLType[Vec2d]:
  def wgslName = "vec2<f64>"
  def byteSize = 16
  def alignment = 16
  def vertexFormat = "float64x2"

given WGSLType[Vec3]:
  def wgslName = "vec3<f32>"
  def byteSize = 12
  def alignment = 16 // WGSL alignment rules
  def vertexFormat = "float32x3"

given WGSLType[Vec3d]:
  def wgslName = "vec3<f64>"
  def byteSize = 24
  def alignment = 32
  def vertexFormat = "float64x3"

given WGSLType[Vec4]:
  def wgslName = "vec4<f32>"
  def byteSize = 16
  def alignment = 16
  def vertexFormat = "float32x4"

given WGSLType[Vec4d]:
  def wgslName = "vec4<f64>"
  def byteSize = 32
  def alignment = 32
  def vertexFormat = "float64x4"

given WGSLType[Mat2]:
  def wgslName = "mat2x2<f32>"
  def byteSize = 16
  def alignment = 8
  def vertexFormat = ""

given WGSLType[Mat3]:
  def wgslName = "mat3x3<f32>"
  def byteSize = 36
  def alignment = 16
  def vertexFormat = ""

given WGSLType[Mat4]:
  def wgslName = "mat4x4<f32>"
  def byteSize = 64
  def alignment = 16
  def vertexFormat = ""

// =============================================================================
// Utility Type Aliases
// =============================================================================

/** Alias for empty named tuple - use instead of EmptyTuple for clarity */
type None = EmptyTuple

/** Default vertex builtin output */
type VertOut = (position: BuiltinPosition)

/** Default fragment output */
type FragOut = (color: gpu.math.Vec4)

// =============================================================================
// Uniform Visibility Wrappers
// =============================================================================

/** Uniform visible only in vertex shader */
sealed trait VertexUniform[T]

object VertexUniform:
  given [T] => (inner: WGSLType[T]) => WGSLType[VertexUniform[T]]:
    def wgslName = inner.wgslName
    def byteSize = inner.byteSize
    def alignment = inner.alignment
    def vertexFormat = inner.vertexFormat

/** Uniform visible only in fragment shader */
sealed trait FragmentUniform[T]

object FragmentUniform:
  given [T] => (inner: WGSLType[T]) => WGSLType[FragmentUniform[T]]:
    def wgslName = inner.wgslName
    def byteSize = inner.byteSize
    def alignment = inner.alignment
    def vertexFormat = inner.vertexFormat

/** Uniform visible in both vertex and fragment shaders */
sealed trait SharedUniform[T]

object SharedUniform:
  given [T] => (inner: WGSLType[T]) => WGSLType[SharedUniform[T]]:
    def wgslName = inner.wgslName
    def byteSize = inner.byteSize
    def alignment = inner.alignment
    def vertexFormat = inner.vertexFormat
