package gpu.painter

import trivalibs.bufferdata.StructArray
import trivalibs.utils.js.*
import webgpu.*

class Form(
    val vertexBuffer: GPUBuffer,
    val vertexCount: Int,
    val topology: PrimitiveTopology = PrimitiveTopology.TriangleList,
    val frontFace: FrontFace = FrontFace.CCW,
)

object Form:
  def apply[F <: Tuple](
      device: GPUDevice,
      queue: GPUQueue,
      vertices: StructArray[F],
      topology: PrimitiveTopology = PrimitiveTopology.TriangleList,
      frontFace: FrontFace = FrontFace.CCW,
  ): Form =
    val buffer = device.createBuffer(
      Obj.literal(
        size = vertices.arrayBuffer.byteLength,
        usage = GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
      ),
    )
    queue.writeBuffer(buffer, 0.0, vertices.arrayBuffer)
    new Form(buffer, vertices.length, topology, frontFace)
