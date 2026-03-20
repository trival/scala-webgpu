package graphics.shader.dsl

import graphics.math.cpu.*
import graphics.math.gpu.*
import graphics.shader.FragmentUniform
import graphics.shader.SharedUniform
import graphics.shader.VertexUniform
import trivalibs.utils.js.Dict
import scala.NamedTuple
import scala.NamedTuple.AnyNamedTuple
import scala.compiletime.*

/** Marker type for mutable WGSL local variables (`var`). */
class Var[T]

/** Marker type for WGSL compile-time constants (`const`). */
class Const[T]

/** Maps GPU math types to their DSL expression equivalents. */
type ToExpr[T] = T match
  case Texture2D => Texture2D
  case Sampler   => Sampler
  case Float     => FloatExpr
  case Double    => FloatExpr
  case Boolean   => BoolExpr
  case Vec2      => Vec2Expr
  case Vec3      => Vec3Expr
  case Vec4      => Vec4Expr
  case Mat2      => Mat2Expr
  case Mat3      => Mat3Expr
  case Mat4      => Mat4Expr

/** Unwraps uniform wrapper types and maps to Expr. */
type UniformToExpr[T] = T match
  case VertexUniform[Sampler]   => Sampler
  case FragmentUniform[Sampler] => Sampler
  case SharedUniform[Sampler]   => Sampler
  case VertexUniform[t]         => ToExpr[t]
  case FragmentUniform[t]       => ToExpr[t]
  case SharedUniform[t]         => ToExpr[t]
  case _                        => ToExpr[T]

/** Maps any type to AssignTarget — used for vertex varying output fields. */
type ToAssign[T] = AssignTarget

/** Maps GPU math types to Local/Var/Const opaque types for typed local
  * variables.
  */
type ToLocal[T] = T match
  case Var[Float]    => VarFloat
  case Var[Double]   => VarFloat
  case Var[Vec2]     => VarVec2
  case Var[Vec3]     => VarVec3
  case Var[Vec4]     => VarVec4
  case Const[Float]  => ConstFloat
  case Const[Double] => ConstFloat
  case Const[Vec2]   => ConstVec2
  case Const[Vec3]   => ConstVec3
  case Const[Vec4]   => ConstVec4
  case Float         => LetFloat
  case Double        => LetFloat
  case Vec2          => LetVec2
  case Vec3          => LetVec3
  case Vec4          => LetVec4

/** Builds a Dict mapping field names to their kind: "v" for Var, "c" for Const.
  * Plain locals are omitted (default). Called at compile time via inline.
  */
inline def buildLocalKinds[L]: Dict[String] =
  val d = Dict[String]()
  inline erasedValue[L] match
    case _: EmptyTuple => ()
    case _             =>
      populateKinds[
        NamedTuple.Names[L & AnyNamedTuple],
        NamedTuple.DropNames[L & AnyNamedTuple],
      ](d)
  d

private inline def populateKinds[Names <: Tuple, Types <: Tuple](
    d: Dict[String],
): Unit =
  inline (erasedValue[Names], erasedValue[Types]) match
    case _: (EmptyTuple, EmptyTuple) => ()
    case _: ((n *: ns), (t *: ts))   =>
      inline erasedValue[t] match
        case _: Var[?]   => d(constValue[n & String]) = "v"
        case _: Const[?] => d(constValue[n & String]) = "c"
        case _           => ()
      populateKinds[ns, ts](d)
