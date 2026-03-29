package graphics.painter

import trivalibs.bufferdata.StructArray
import trivalibs.utils.js.*
import webgpu.*

class Form(val painter: Painter):
  var vertexBuffer: Opt[GPUBuffer] = Opt.Null
  var vertexCount: Int = 0
  var topology: PrimitiveTopology = PrimitiveTopology.TriangleList
  var frontFace: FrontFace = FrontFace.CCW

  def set[F <: Tuple](
      vertices: Maybe[StructArray[F]] = Maybe.Not,
      topology: Maybe[PrimitiveTopology] = Maybe.Not,
      frontFace: Maybe[FrontFace] = Maybe.Not,
  ): this.type =
    topology.foreach(v => this.topology = v)
    frontFace.foreach(v => this.frontFace = v)
    vertices.foreach: verts =>
      if vertexBuffer.nonNull then vertexBuffer.get.destroy()
      val buf = painter.device.createBuffer(
        Obj.literal(
          size = verts.arrayBuffer.byteLength,
          usage = GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
        ),
      )
      painter.queue.writeBuffer(buf, 0.0, verts.arrayBuffer)
      vertexBuffer = buf
      vertexCount = verts.length
    this
