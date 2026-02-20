package gpu

import gpu.math.Vec3
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
// Primitive Types (sealed trait hierarchy for match type disjointness)
// =============================================================================

given WGSLType[Float]:
  def wgslName = "f32"
  def byteSize = 4
  def alignment = 4
  def vertexFormat = "float32"


// =============================================================================
// Utility Type Aliases
// =============================================================================

/** Alias for empty named tuple - use instead of EmptyTuple for clarity */
type None = EmptyTuple

/** Default vertex builtin output */
type VertOut = (position: BuiltinPosition)

/** Default fragment output */
type FragOut = (color: math.Vec4)

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
