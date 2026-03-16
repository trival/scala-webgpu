package graphics.painter

import scala.scalajs.js
import webgpu.*

class Shade[U](
    val id: Int,
    val shaderModule: GPUShaderModule,
    val vertexBufferLayout: js.Dynamic | Null,
    val valueBindGroupLayout: GPUBindGroupLayout | Null,
    val pipelineLayout: GPUPipelineLayout,
    val isLayer: Boolean,
)
