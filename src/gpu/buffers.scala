package gpu.buffers

import trivalibs.bufferdata.{F32 as BF32}

// =============================================================================
// Base vector/matrix layouts (tightly packed - for vertex attributes)
// =============================================================================

type Vec2 = (BF32, BF32)
type Vec3 = (BF32, BF32, BF32)
type Vec4 = (BF32, BF32, BF32, BF32)
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

/** Vec3 padded to 16 bytes for uniform buffers */
type Vec3Padded = (BF32, BF32, BF32, BF32)

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

import scala.compiletime.summonInline

/** Typeclass that maps a shader type to its buffer layout type */
trait BufferLayoutFor[T]:
  type Layout <: Tuple

object BufferLayoutFor:
  given BufferLayoutFor[gpu.F32] with
    type Layout = BF32 *: EmptyTuple

  given BufferLayoutFor[gpu.Vec2] with
    type Layout = Vec2

  given BufferLayoutFor[gpu.Vec3] with
    type Layout = Vec3

  given BufferLayoutFor[gpu.Vec4] with
    type Layout = Vec4

  given BufferLayoutFor[gpu.Mat3] with
    type Layout = Mat3

  given BufferLayoutFor[gpu.Mat4] with
    type Layout = Mat4

// =============================================================================
// Match types to convert shader types to buffer layouts
// (For type-level computation - note: may not fully reduce with opaque types)
// =============================================================================

import scala.NamedTuple.DropNames

/** Convert shader attribute types to tightly packed buffer layout */
type ToAttribLayout[T] <: Tuple = T match
  case gpu.F32  => BF32 *: EmptyTuple
  case gpu.Vec2 => Vec2
  case gpu.Vec3 => Vec3
  case gpu.Vec4 => Vec4
  case gpu.Mat3 => Mat3
  case gpu.Mat4 => Mat4

/** Convert shader uniform types to padded buffer layout */
type ToUniformLayout[T] <: Tuple = T match
  case gpu.F32  => BF32 *: EmptyTuple
  case gpu.Vec2 => Vec2
  case gpu.Vec3 => Vec3Padded
  case gpu.Vec4 => Vec4
  case gpu.Mat3 => Mat3Padded
  case gpu.Mat4 => Mat4

/** Convert a named tuple of shader types to buffer layout tuple for vertex attributes.
  * Preserves tuple structure: (position: Vec2, color: Vec4) -> (buf.Vec2, buf.Vec4)
  */
type AttribsLayout[T] = AttribsLayoutImpl[DropNames[T & NamedTuple.AnyNamedTuple]]

type AttribsLayoutImpl[T <: Tuple] <: Tuple = T match
  case EmptyTuple   => EmptyTuple
  case head *: tail => ToAttribLayout[head] *: AttribsLayoutImpl[tail]

/** Flatten a named tuple of shader types to a flat buffer layout for vertex attributes */
type FlattenAttribs[T] <: Tuple = DropNames[T] match
  case EmptyTuple   => EmptyTuple
  case head *: tail => Concat[ToAttribLayout[head], FlattenAttribs[tail]]

/** Flatten a named tuple of shader types to a flat buffer layout for uniforms */
type FlattenUniforms[T] <: Tuple = DropNames[T] match
  case EmptyTuple   => EmptyTuple
  case head *: tail => Concat[ToUniformLayout[head], FlattenUniforms[tail]]

/** Helper to concatenate tuples */
type Concat[A <: Tuple, B <: Tuple] <: Tuple = A match
  case EmptyTuple   => B
  case head *: tail => head *: Concat[tail, B]
