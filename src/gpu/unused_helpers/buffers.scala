package gpu.unused.buffers

import gpu.math.*
import gpu.shader.*
import trivalibs.bufferdata.F32 as BF32

import scala.NamedTuple.DropNames

/** Convert shader attribute .types to tightly packed buffer layout */
type ToAttribLayout[T] <: Tuple = T match
  case Float => BF32 *: EmptyTuple
  case Vec2  => Vec2.Attrib
  case Vec3  => Vec3.Attrib
  case Vec4  => Vec4.Attrib

/** Convert shader uniform types to padded buffer layout */
type ToUniformLayout[T] <: Tuple = T match
  case VertexUniform[t]   => ToUniformLayout[t]
  case FragmentUniform[t] => ToUniformLayout[t]
  case SharedUniform[t]   => ToUniformLayout[t]
  case Float              => BF32 *: EmptyTuple
  case Vec2               => Vec2.Uniform
  case Vec3               => Vec3.Uniform
  case Vec4               => Vec4.Uniform
  case Mat2               => Mat2.Uniform
  case Mat3               => Mat3.Uniform
  case Mat4               => Mat4.Uniform

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
