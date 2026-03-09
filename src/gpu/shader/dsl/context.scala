package gpu.shader.dsl

import scala.NamedTuple
import scala.NamedTuple.AnyNamedTuple

// ---------------------------------------------------------------------------
// Typed Selectable Accessors — compile-time field checking via named tuples
// ---------------------------------------------------------------------------

/** Typed read-only accessor for input fields and uniforms.
  *
  * Fields maps to Expr subtypes (Vec2Expr, Mat2Expr, etc.), giving typed
  * field access like `ctx.in.position` → `Vec2Expr`.
  */
class TypedExprAccessor[F <: AnyNamedTuple](prefix: String) extends Selectable:
  type Fields = F

  def selectDynamic(name: String): Expr =
    if prefix.isEmpty then Expr.raw(name)
    else Expr.raw(s"$prefix.$name")

/** Typed write-only accessor for output fields.
  *
  * Fields maps to AssignTarget for all field types, preserving the `:=`
  * operator for assignment statements.
  */
class TypedAssignAccessor[F <: AnyNamedTuple](prefix: String) extends Selectable:
  type Fields = F

  def selectDynamic(name: String): AssignTarget =
    AssignTarget(if prefix.isEmpty then name else s"$prefix.$name")

class AssignTarget(val target: String):
  inline def :=(value: Expr): Stmt = Stmt.assign(target, value)

/** Typed read+write accessor for local variables.
  *
  * Fields maps to Local* opaque types (e.g., LocalVec2, LocalMat2). Each is
  * `<: Vec2Expr & LocalExpr` etc., so all math operations are available
  * natively, plus `:=` for let-binding via the LocalExpr extension.
  */
class TypedLocalAccessor[F <: AnyNamedTuple] extends Selectable:
  type Fields = F

  def selectDynamic(name: String): Any = LocalExpr(name)

// ---------------------------------------------------------------------------
// Stage-Specific Context Types
// ---------------------------------------------------------------------------

/** Vertex shader context. */
class VertexCtx[A, V, U, L](
    val in: TypedExprAccessor[NamedTuple.Map[A & AnyNamedTuple, ToExpr]],
    val out: TypedAssignAccessor[(position: AssignTarget)],
    val bindings: TypedExprAccessor[NamedTuple.Map[U & AnyNamedTuple, UniformToExpr]],
    val locals: TypedLocalAccessor[NamedTuple.Map[L & AnyNamedTuple, ToLocal]],
)

/** Fragment shader context. Fragment output is always `color: Vec4`. */
class FragmentCtx[V, U, L](
    val in: TypedExprAccessor[NamedTuple.Map[V & AnyNamedTuple, ToExpr]],
    val out: TypedAssignAccessor[(color: AssignTarget)],
    val bindings: TypedExprAccessor[NamedTuple.Map[U & AnyNamedTuple, UniformToExpr]],
    val locals: TypedLocalAccessor[NamedTuple.Map[L & AnyNamedTuple, ToLocal]],
)
