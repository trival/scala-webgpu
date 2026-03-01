package gpu.painter

import gpu.buffers.BufferBinding

type BindingSlots = Map[Int, BufferBinding[?, ?]]

class Shape(
    val form: Form,
    val shade: Shade,
    var bindings: BindingSlots = Map.empty,
    var cullMode: CullMode = CullMode.None,
    var blendMode: BlendMode = BlendMode.Replace,
)
