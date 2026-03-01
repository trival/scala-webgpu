package gpu.painter

import scala.scalajs.js
import webgpu.*

class Shade(
    val id: Int,
    val shaderModule: GPUShaderModule,
    val vertexBufferLayout: js.Dynamic | Null,
    val valueBindGroupLayout: GPUBindGroupLayout | Null,
    val pipelineLayout: GPUPipelineLayout,
    val isLayer: Boolean,
)
