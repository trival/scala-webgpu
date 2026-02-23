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
  type AttribBuffer <: Tuple
  type UniformBuffer <: Tuple

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
  type AttribBuffer = F32 *: EmptyTuple
  type UniformBuffer = F32 *: EmptyTuple

// JS does only have 64-bit floats, so we map Scala Double to f32 in WGSL for simplicity
given WGSLType[Double]:
  def wgslName = "f32"
  def byteSize = 4
  def alignment = 4
  def vertexFormat = "float32"
  type AttribBuffer = F32 *: EmptyTuple
  type UniformBuffer = F32 *: EmptyTuple

// Vec2 (Double, default) and Vec2f (Float) both map to vec2<f32> in WGSL
given WGSLType[Vec2]:
  def wgslName = "vec2<f32>"
  def byteSize = 8
  def alignment = 8
  def vertexFormat = "float32x2"
  type AttribBuffer = Vec2Buffer
  type UniformBuffer = Vec2Buffer

given WGSLType[Vec2f]:
  def wgslName = "vec2<f32>"
  def byteSize = 8
  def alignment = 8
  def vertexFormat = "float32x2"
  type AttribBuffer = Vec2Buffer
  type UniformBuffer = Vec2Buffer

// Vec3 (Double, default) and Vec3f (Float) both map to vec3<f32> in WGSL
given WGSLType[Vec3]:
  def wgslName = "vec3<f32>"
  def byteSize = 12
  def alignment = 16 // WGSL alignment rules
  def vertexFormat = "float32x3"
  type AttribBuffer = Vec3Buffer
  type UniformBuffer = Vec4Buffer // padded to vec4 per WGSL std140

given WGSLType[Vec3f]:
  def wgslName = "vec3<f32>"
  def byteSize = 12
  def alignment = 16 // WGSL alignment rules
  def vertexFormat = "float32x3"
  type AttribBuffer = Vec3Buffer
  type UniformBuffer = Vec4Buffer // padded to vec4 per WGSL std140

// Vec4 (Double, default) and Vec4f (Float) both map to vec4<f32> in WGSL
given WGSLType[Vec4]:
  def wgslName = "vec4<f32>"
  def byteSize = 16
  def alignment = 16
  def vertexFormat = "float32x4"
  type AttribBuffer = Vec4Buffer
  type UniformBuffer = Vec4Buffer

given WGSLType[Vec4f]:
  def wgslName = "vec4<f32>"
  def byteSize = 16
  def alignment = 16
  def vertexFormat = "float32x4"
  type AttribBuffer = Vec4Buffer
  type UniformBuffer = Vec4Buffer

given WGSLType[Mat2]:
  def wgslName = "mat2x2<f32>"
  def byteSize = 16
  def alignment = 8
  def vertexFormat = ""
  type AttribBuffer = Mat2Buffer
  type UniformBuffer = Mat2Buffer

given WGSLType[Mat3]:
  def wgslName = "mat3x3<f32>"
  def byteSize = 36
  def alignment = 16
  def vertexFormat = ""
  type AttribBuffer = Mat3Buffer
  type UniformBuffer = Mat3PaddedBuffer

given WGSLType[Mat4]:
  def wgslName = "mat4x4<f32>"
  def byteSize = 64
  def alignment = 16
  def vertexFormat = ""
  type AttribBuffer = Mat4Buffer
  type UniformBuffer = Mat4Buffer

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
    type AttribBuffer = inner.AttribBuffer
    type UniformBuffer = inner.UniformBuffer

/** Uniform visible only in fragment shader */
sealed trait FragmentUniform[T]

object FragmentUniform:
  given [T] => (inner: WGSLType[T]) => WGSLType[FragmentUniform[T]]:
    def wgslName = inner.wgslName
    def byteSize = inner.byteSize
    def alignment = inner.alignment
    def vertexFormat = inner.vertexFormat
    type AttribBuffer = inner.AttribBuffer
    type UniformBuffer = inner.UniformBuffer

/** Uniform visible in both vertex and fragment shaders */
sealed trait SharedUniform[T]

object SharedUniform:
  given [T] => (inner: WGSLType[T]) => WGSLType[SharedUniform[T]]:
    def wgslName = inner.wgslName
    def byteSize = inner.byteSize
    def alignment = inner.alignment
    def vertexFormat = inner.vertexFormat
    type AttribBuffer = inner.AttribBuffer
    type UniformBuffer = inner.UniformBuffer
