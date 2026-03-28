package graphics.painter

import webgpu.*

import scala.scalajs.js

class Shade[U, P](
    val id: Int,
    val shaderModule: GPUShaderModule,
    val vertexBufferLayout: js.Dynamic | Null,
    val valueBindGroupLayout: GPUBindGroupLayout | Null,
    val panelBindGroupLayout: GPUBindGroupLayout | Null,
    val pipelineLayout: GPUPipelineLayout,
    val isLayer: Boolean,
    val uniformIndices: js.Dictionary[Int],
    val panelIndices: js.Dictionary[Int],
)
