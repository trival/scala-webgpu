package gpu.shader.dsl

import gpu.math.*
import gpu.shader.FragmentUniform
import gpu.shader.VertexUniform

/** Maps GPU math types to their DSL expression equivalents. */
type ToExpr[T] = T match
  case Float   => FloatExpr
  case Double  => FloatExpr
  case Boolean => BoolExpr
  case Vec2    => Vec2Expr
  case Vec3    => Vec3Expr
  case Vec4    => Vec4Expr
  case Mat2    => Mat2Expr
  case Mat3    => Mat3Expr
  case Mat4    => Mat4Expr

/** Unwraps uniform wrapper types and maps to Expr. */
type UniformToExpr[T] = T match
  case VertexUniform[t]   => ToExpr[t]
  case FragmentUniform[t] => ToExpr[t]
  case _                  => ToExpr[T]

/** Maps GPU math types to Local* opaque types for typed local variables. */
type ToLocal[T] = T match
  case Float   => LocalFloat
  case Double  => LocalFloat
  case Boolean => LocalBool
  case Vec2    => LocalVec2
  case Vec3    => LocalVec3
  case Vec4    => LocalVec4
  case Mat2    => LocalMat2
  case Mat3    => LocalMat3
  case Mat4    => LocalMat4
