package graphics.painter

import trivalibs.utils.js.*
import webgpu.GPUDevice

class Layer[U, P](
    val shade: Shade[U, P],
    val device: GPUDevice,
    var bindings: BindingSlots = Arr(),
    var panelBindings: Arr[Panel | Null] = Arr(),
    var blendState: Opt[BlendState] = Opt.Null,
) extends Bindable[U, P]
