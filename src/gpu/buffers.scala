package gpu.buffers

import gpu.math.Vec2
import gpu.math.Vec3
import gpu.math.Vec4
import trivalibs.bufferdata.F32 as BF32

// =============================================================================
// Base vector/matrix layouts (tightly packed - for vertex attributes)
// =============================================================================

type Mat3 = (
    BF32,
    BF32,
    BF32,
    BF32,
    BF32,
    BF32,
    BF32,
    BF32,
    BF32
) // 9 floats = 36 bytes
type Mat4 = (
    BF32,
    BF32,
    BF32,
    BF32,
    BF32,
    BF32,
    BF32,
    BF32,
    BF32,
    BF32,
    BF32,
    BF32,
    BF32,
    BF32,
    BF32,
    BF32
) // 16 floats = 64 bytes

// =============================================================================
// Padded layouts for uniform buffers (WGSL alignment rules)
// =============================================================================

/** Mat3 with each column padded to 16 bytes = 48 bytes total */
type Mat3Padded = (
    BF32,
    BF32,
    BF32,
    BF32, // Column 0 + padding
    BF32,
    BF32,
    BF32,
    BF32, // Column 1 + padding
    BF32,
    BF32,
    BF32,
    BF32 // Column 2 + padding
)

// =============================================================================
// Typeclass for shader type to buffer layout conversion
// =============================================================================


// =============================================================================
// Match types to convert shader types to buffer layouts
// (For type-level computation - note: may not fully reduce with opaque types)
// =============================================================================

import scala.NamedTuple.DropNames

/** Convert shader attribute types to tightly packed buffer layout */
type ToAttribLayout[T] <: Tuple = T match
  case Float    => BF32 *: EmptyTuple
  case Vec2     => Vec2.Attrib
  case Vec3     => Vec3.Attrib
  case Vec4     => Vec4.Attrib
  case gpu.Mat3 => Mat3
  case gpu.Mat4 => Mat4

/** Convert shader uniform types to padded buffer layout */
type ToUniformLayout[T] <: Tuple = T match
  case gpu.VertexUniform[t]   => ToUniformLayout[t]
  case gpu.FragmentUniform[t] => ToUniformLayout[t]
  case gpu.SharedUniform[t]   => ToUniformLayout[t]
  case Float                  => BF32 *: EmptyTuple
  case Vec2                   => Vec2.Uniform
  case Vec3                   => Vec3.Uniform
  case Vec4                   => Vec4.Uniform
  case gpu.Mat3               => Mat3Padded
  case gpu.Mat4               => Mat4

/** Convert a named tuple of shader types to buffer layout tuple for vertex
  * attributes. Preserves tuple structure: (position: Vec2, color: Vec4) ->
  * (buf.Vec2, buf.Vec4)
  */
type AttribsLayout[T] =
  AttribsLayoutImpl[DropNames[T & NamedTuple.AnyNamedTuple]]

type AttribsLayoutImpl[T <: Tuple] <: Tuple = T match
  case EmptyTuple   => EmptyTuple
  case head *: tail => ToAttribLayout[head] *: AttribsLayoutImpl[tail]

/** Flatten a named tuple of shader types to a flat buffer layout for vertex
  * attributes
  */
type FlattenAttribs[T] <: Tuple = DropNames[T] match
  case EmptyTuple   => EmptyTuple
  case head *: tail => Concat[ToAttribLayout[head], FlattenAttribs[tail]]

/** Flatten a named tuple of shader types to a flat buffer layout for uniforms
  */
type FlattenUniforms[T] <: Tuple = DropNames[T] match
  case EmptyTuple   => EmptyTuple
  case head *: tail => Concat[ToUniformLayout[head], FlattenUniforms[tail]]

/** Helper to concatenate tuples */
type Concat[A <: Tuple, B <: Tuple] <: Tuple = A match
  case EmptyTuple   => B
  case head *: tail => head *: Concat[tail, B]
