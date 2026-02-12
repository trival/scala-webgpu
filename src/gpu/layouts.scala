package gpu

import scala.compiletime.*
import scala.NamedTuple.AnyNamedTuple
import scala.scalajs.js
import scala.scalajs.js.Dynamic.literal

/** Utilities for deriving WebGPU buffer layouts from Scala types at compile time */
object layouts:

  // ===========================================================================
  // Vertex Buffer Layout Derivation
  // ===========================================================================

  /** Get vertex format strings for each field in a named tuple */
  inline def fieldVertexFormats[T]: js.Array[String] =
    inline erasedValue[T] match
      case _: EmptyTuple => js.Array()
      case _: AnyNamedTuple =>
        fieldVertexFormatsImpl[NamedTuple.DropNames[T & AnyNamedTuple]]

  private inline def fieldVertexFormatsImpl[T <: Tuple]: js.Array[String] =
    inline erasedValue[T] match
      case _: EmptyTuple => js.Array()
      case _: (head *: rest) =>
        js.Array(
          summonInline[WGSLType[head]].vertexFormat
        ) ++ fieldVertexFormatsImpl[rest]

  /** Get byte sizes for each field in a named tuple */
  inline def fieldByteSizes[T]: js.Array[Int] =
    inline erasedValue[T] match
      case _: EmptyTuple => js.Array()
      case _: AnyNamedTuple =>
        fieldByteSizesImpl[NamedTuple.DropNames[T & AnyNamedTuple]]

  private inline def fieldByteSizesImpl[T <: Tuple]: js.Array[Int] =
    inline erasedValue[T] match
      case _: EmptyTuple => js.Array()
      case _: (head *: rest) =>
        js.Array(summonInline[WGSLType[head]].byteSize) ++ fieldByteSizesImpl[
          rest
        ]

  /** Calculate field offsets from byte sizes */
  private def calculateOffsets(sizes: js.Array[Int]): js.Array[Int] =
    val offsets = js.Array[Int]()
    var currentOffset = 0
    for size <- sizes do
      offsets.push(currentOffset)
      currentOffset += size
    offsets

  /** Calculate total stride (sum of all field sizes) */
  private def calculateStride(sizes: js.Array[Int]): Int =
    var total = 0
    for size <- sizes do total += size
    total

  /** Derive WebGPU vertex buffer layout descriptor from shader Attribs type.
    *
    * Returns a js.Dynamic object suitable for use in pipeline.vertex.buffers:
    * {{{
    * {
    *   arrayStride: 24,
    *   attributes: [
    *     { shaderLocation: 0, offset: 0, format: "float32x2" },
    *     { shaderLocation: 1, offset: 8, format: "float32x4" }
    *   ]
    * }
    * }}}
    */
  inline def vertexBufferLayout[Attribs]: js.Dynamic =
    val formats = fieldVertexFormats[Attribs]
    val sizes = fieldByteSizes[Attribs]
    val offsets = calculateOffsets(sizes)
    val stride = calculateStride(sizes)

    val attributes = js.Array[js.Dynamic]()
    for i <- 0 until formats.length do
      attributes.push(
        literal(
          shaderLocation = i,
          offset = offsets(i),
          format = formats(i)
        )
      )

    literal(
      arrayStride = stride,
      attributes = attributes
    )

  // ===========================================================================
  // Vertex Buffer Allocation
  // ===========================================================================

  import trivalibs.bufferdata.StructArray
  import buffers.BufferLayoutFor

  /** Allocate a StructArray for vertex data matching shader attributes.
    *
    * Usage with explicit buffer layout type:
    * {{{
    * val vertices = allocateVertices[(buf.Vec2, buf.Vec4)](3)
    * }}}
    */
  inline def allocateVertices[BufferLayout <: Tuple](
      count: Int
  ): StructArray[BufferLayout] =
    StructArray.allocate[BufferLayout](count)

  /** Allocate a StructArray from shader attribs named tuple.
    * Uses inline pattern matching to derive buffer layout at compile time.
    */
  transparent inline def allocateAttribsFromNamedTuple[T](count: Int) =
    inline erasedValue[T] match
      case _: EmptyTuple =>
        StructArray.allocate[EmptyTuple](count)
      case _: AnyNamedTuple =>
        allocateAttribsImpl[NamedTuple.DropNames[T & AnyNamedTuple]](count)

  private transparent inline def allocateAttribsImpl[T <: Tuple](count: Int) =
    inline erasedValue[T] match
      case _: EmptyTuple =>
        StructArray.allocate[EmptyTuple](count)
      case _: (Vec2 *: EmptyTuple) =>
        StructArray.allocate[buffers.Vec2 *: EmptyTuple](count)
      case _: (Vec3 *: EmptyTuple) =>
        StructArray.allocate[buffers.Vec3 *: EmptyTuple](count)
      case _: (Vec4 *: EmptyTuple) =>
        StructArray.allocate[buffers.Vec4 *: EmptyTuple](count)
      case _: (Vec2 *: Vec4 *: EmptyTuple) =>
        StructArray.allocate[(buffers.Vec2, buffers.Vec4)](count)
      case _: (Vec3 *: Vec4 *: EmptyTuple) =>
        StructArray.allocate[(buffers.Vec3, buffers.Vec4)](count)
      case _: (Vec4 *: Vec4 *: EmptyTuple) =>
        StructArray.allocate[(buffers.Vec4, buffers.Vec4)](count)
      case _: (Vec2 *: Vec2 *: EmptyTuple) =>
        StructArray.allocate[(buffers.Vec2, buffers.Vec2)](count)
      case _: (Vec2 *: Vec3 *: EmptyTuple) =>
        StructArray.allocate[(buffers.Vec2, buffers.Vec3)](count)
      case _: (Vec2 *: Vec2 *: Vec4 *: EmptyTuple) =>
        StructArray.allocate[(buffers.Vec2, buffers.Vec2, buffers.Vec4)](count)
      case _: (Vec3 *: Vec3 *: Vec4 *: EmptyTuple) =>
        StructArray.allocate[(buffers.Vec3, buffers.Vec3, buffers.Vec4)](count)
      case _: (Vec4 *: Vec4 *: Vec4 *: EmptyTuple) =>
        StructArray.allocate[(buffers.Vec4, buffers.Vec4, buffers.Vec4)](count)
      case _: (Mat4 *: EmptyTuple) =>
        StructArray.allocate[buffers.Mat4 *: EmptyTuple](count)
      case _: (Vec2 *: Vec4 *: Mat4 *: EmptyTuple) =>
        StructArray.allocate[(buffers.Vec2, buffers.Vec4, buffers.Mat4)](count)
