package gpu

import scala.compiletime.*

/** Type class for WGSL-compatible types */
trait WGSLType[T]:
  def wgslName: String
  def byteSize: Int
  def alignment: Int

object WGSLType:
  inline def apply[T](using wt: WGSLType[T]): WGSLType[T] = wt

// =============================================================================
// Primitive Types (opaque - no runtime representation needed for now)
// =============================================================================

opaque type F32 = Unit
opaque type Vec2 = Unit
opaque type Vec3 = Unit
opaque type Vec4 = Unit
opaque type Mat4 = Unit

object F32:
  given WGSLType[F32] with
    def wgslName = "f32"
    def byteSize = 4
    def alignment = 4

object Vec2:
  given WGSLType[Vec2] with
    def wgslName = "vec2<f32>"
    def byteSize = 8
    def alignment = 8

object Vec3:
  given WGSLType[Vec3] with
    def wgslName = "vec3<f32>"
    def byteSize = 12
    def alignment = 16 // WGSL alignment rules

object Vec4:
  given WGSLType[Vec4] with
    def wgslName = "vec4<f32>"
    def byteSize = 16
    def alignment = 16

object Mat4:
  given WGSLType[Mat4] with
    def wgslName = "mat4x4<f32>"
    def byteSize = 64
    def alignment = 16

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
type VertexUniform[T] = T

/** Uniform visible only in fragment shader */
type FragmentUniform[T] = T

/** Uniform visible in both vertex and fragment shaders */
type SharedUniform[T] = T
