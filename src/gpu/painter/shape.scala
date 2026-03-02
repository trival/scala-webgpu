package gpu.painter

import gpu.buffers.BufferBinding
import trivalibs.utils.js.*

import scala.scalajs.js

type BindingSlots = Arr[BufferBinding[?, ?] | Null]

class Shape(
    val form: Form,
    val shade: Shade,
    var bindings: BindingSlots = Arr(),
    var cullMode: CullMode = CullMode.None,
    var blendState: Opt[BlendState] = Opt.Null,
)
