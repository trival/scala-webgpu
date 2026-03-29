package graphics.painter

import trivalibs.utils.js.*

class Layer[U, P](
    val painter: Painter,
    val shade: Shade[U, P],
) extends Bindable[U, P]:
  var blendState: Opt[BlendState] = Opt.Null
  var bindings: BindingSlots = Arr()
  var panelBindings: Arr[Panel | Null] = Arr()

  def set(
      blendState: Maybe[Opt[BlendState]] = Maybe.Not,
  ): this.type =
    blendState.foreach(v => this.blendState = v)
    this
