package gpu.painter

import scala.scalajs.js
import trivalibs.utils.js.Obj

enum PrimitiveTopology(val webgpu: String):
  case TriangleList extends PrimitiveTopology("triangle-list")
  case TriangleStrip extends PrimitiveTopology("triangle-strip")
  case LineList extends PrimitiveTopology("line-list")
  case LineStrip extends PrimitiveTopology("line-strip")
  case PointList extends PrimitiveTopology("point-list")

enum CullMode(val webgpu: String):
  case None extends CullMode("none")
  case Front extends CullMode("front")
  case Back extends CullMode("back")

enum FrontFace(val webgpu: String):
  case CCW extends FrontFace("ccw")
  case CW extends FrontFace("cw")

enum BlendMode:
  case Replace, Alpha, Additive, Multiply

  def toBlendState: js.UndefOr[js.Dynamic] = this match
    case Replace => js.undefined
    case Alpha =>
      Obj.literal(
        color = Obj.literal(
          srcFactor = "src-alpha",
          dstFactor = "one-minus-src-alpha",
          operation = "add",
        ),
        alpha = Obj.literal(
          srcFactor = "one",
          dstFactor = "one-minus-src-alpha",
          operation = "add",
        ),
      )
    case Additive =>
      Obj.literal(
        color = Obj.literal(
          srcFactor = "src-alpha",
          dstFactor = "one",
          operation = "add",
        ),
        alpha = Obj.literal(
          srcFactor = "one",
          dstFactor = "one",
          operation = "add",
        ),
      )
    case Multiply =>
      Obj.literal(
        color = Obj.literal(
          srcFactor = "dst-color",
          dstFactor = "zero",
          operation = "add",
        ),
        alpha = Obj.literal(
          srcFactor = "dst-alpha",
          dstFactor = "zero",
          operation = "add",
        ),
      )
