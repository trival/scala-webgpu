package graphics.painter

import trivalibs.utils.js.*

class Layer[U, P](
    val painter: Painter,
    val shade: Shade[U, P],
) extends Bindable[U, P]:
  var blendState: Opt[BlendState] = null
  var bindings: BindingSlots = Arr()
  var panelBindings: Arr[Opt[Panel]] = Arr()
  val instances: InstanceList[U, P] = InstanceList[U, P](shade, painter)

  def set(
      blendState: Maybe[Opt[BlendState]] = Maybe.Not,
  ): this.type =
    blendState.foreach(v => this.blendState = v)
    this
