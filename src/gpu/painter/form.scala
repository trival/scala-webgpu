package gpu.painter

import webgpu.*

class Form(
    val vertexBuffer: GPUBuffer,
    val vertexCount: Int,
    val topology: PrimitiveTopology = PrimitiveTopology.TriangleList,
    val frontFace: FrontFace = FrontFace.CCW,
)
