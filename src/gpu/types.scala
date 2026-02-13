package gpu

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
// Primitive Types (sealed trait hierarchy for match type disjointness)
// =============================================================================

sealed trait GPUType
sealed trait F32 extends GPUType
sealed trait Vec2 extends GPUType
sealed trait Vec3 extends GPUType
sealed trait Vec4 extends GPUType
sealed trait Mat3 extends GPUType
sealed trait Mat4 extends GPUType

object F32:
  given WGSLType[F32]:
    def wgslName = "f32"
    def byteSize = 4
    def alignment = 4
    def vertexFormat = "float32"

object Vec2:
  given WGSLType[Vec2]:
    def wgslName = "vec2<f32>"
    def byteSize = 8
    def alignment = 8
    def vertexFormat = "float32x2"

object Vec3:
  given WGSLType[Vec3]:
    def wgslName = "vec3<f32>"
    def byteSize = 12
    def alignment = 16 // WGSL alignment rules
    def vertexFormat = "float32x3"

object Vec4:
  given WGSLType[Vec4]:
    def wgslName = "vec4<f32>"
    def byteSize = 16
    def alignment = 16
    def vertexFormat = "float32x4"

object Mat3:
  given WGSLType[Mat3]:
    def wgslName = "mat3x3<f32>"
    def byteSize = 36
    def alignment = 16
    def vertexFormat = "" // Matrices not supported as vertex attributes

object Mat4:
  given WGSLType[Mat4]:
    def wgslName = "mat4x4<f32>"
    def byteSize = 64
    def alignment = 16
    def vertexFormat = "" // Matrices not supported as vertex attributes

// =============================================================================
// Utility Type Aliases
// =============================================================================

/** Alias for empty named tuple - use instead of EmptyTuple for clarity */
type None = EmptyTuple

/** Default vertex builtin output */
type VertOut = (position: BuiltinPosition)

/** Default fragment output */
type FragOut = (color: Vec4)

// =============================================================================
// Uniform Visibility Wrappers
// =============================================================================

/** Uniform visible only in vertex shader */
sealed trait VertexUniform[T] extends GPUType

object VertexUniform:
  given [T] => (inner: WGSLType[T]) => WGSLType[VertexUniform[T]]:
    def wgslName = inner.wgslName
    def byteSize = inner.byteSize
    def alignment = inner.alignment
    def vertexFormat = inner.vertexFormat

/** Uniform visible only in fragment shader */
sealed trait FragmentUniform[T] extends GPUType

object FragmentUniform:
  given [T] => (inner: WGSLType[T]) => WGSLType[FragmentUniform[T]]:
    def wgslName = inner.wgslName
    def byteSize = inner.byteSize
    def alignment = inner.alignment
    def vertexFormat = inner.vertexFormat

/** Uniform visible in both vertex and fragment shaders */
sealed trait SharedUniform[T] extends GPUType

object SharedUniform:
  given [T] => (inner: WGSLType[T]) => WGSLType[SharedUniform[T]]:
    def wgslName = inner.wgslName
    def byteSize = inner.byteSize
    def alignment = inner.alignment
    def vertexFormat = inner.vertexFormat
