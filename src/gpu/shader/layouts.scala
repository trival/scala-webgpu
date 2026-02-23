package gpu.shader

import trivalibs.utils.js.Arr
import trivalibs.utils.js.Obj
import webgpu.GPUBindGroupLayout
import webgpu.GPUDevice
import webgpu.GPUPipelineLayout
import webgpu.GPUShaderStage

import scala.NamedTuple.AnyNamedTuple
import scala.compiletime.*
import scala.scalajs.js

/** Utilities for deriving WebGPU buffer layouts from Scala types at compile
  * time
  */
object layouts:

  // ===========================================================================
  // Vertex Buffer Layout Derivation
  // ===========================================================================

  /** Get vertex format strings for each field in a named tuple */
  inline def fieldVertexFormats[T]: Arr[String] =
    inline erasedValue[T] match
      case _: EmptyTuple    => Arr()
      case _: AnyNamedTuple =>
        fieldVertexFormatsImpl[NamedTuple.DropNames[T & AnyNamedTuple]]

  private inline def fieldVertexFormatsImpl[T <: Tuple]: Arr[String] =
    inline erasedValue[T] match
      case _: EmptyTuple     => Arr()
      case _: (head *: rest) =>
        Arr(
          summonInline[WGSLType[head]].vertexFormat
        ) ++ fieldVertexFormatsImpl[rest]

  /** Get byte sizes for each field in a named tuple */
  inline def fieldByteSizes[T]: Arr[Int] =
    inline erasedValue[T] match
      case _: EmptyTuple    => Arr()
      case _: AnyNamedTuple =>
        fieldByteSizesImpl[NamedTuple.DropNames[T & AnyNamedTuple]]

  private inline def fieldByteSizesImpl[T <: Tuple]: Arr[Int] =
    inline erasedValue[T] match
      case _: EmptyTuple     => Arr()
      case _: (head *: rest) =>
        Arr(summonInline[WGSLType[head]].byteSize) ++ fieldByteSizesImpl[
          rest
        ]

  /** Calculate field offsets from byte sizes */
  private def calculateOffsets(sizes: Arr[Int]): Arr[Int] =
    val offsets = Arr[Int]()
    var currentOffset = 0
    for size <- sizes do
      offsets.push(currentOffset)
      currentOffset += size
    offsets

  /** Calculate total stride (sum of all field sizes) */
  private def calculateStride(sizes: Arr[Int]): Int =
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

    val attributes = Arr[js.Dynamic]()
    for i <- 0 until formats.length do
      attributes.push(
        Obj.literal(
          shaderLocation = i,
          offset = offsets(i),
          format = formats(i)
        )
      )

    Obj.literal(
      arrayStride = stride,
      attributes = attributes
    )

  // ===========================================================================
  // Bind Group Layout Derivation
  // ===========================================================================

  /** Extract shader stage visibility flags from uniform wrapper types */
  private inline def visibilityFlags[T]: Int =
    inline erasedValue[T] match
      case _: VertexUniform[?]   => GPUShaderStage.VERTEX
      case _: FragmentUniform[?] => GPUShaderStage.FRAGMENT
      case _: SharedUniform[?]   =>
        GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT
      case _ => GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT

  /** Derive bind group layout entries for a single group (inner named tuple) */
  private inline def bindGroupEntries[T]: Arr[js.Dynamic] =
    inline erasedValue[T] match
      case _: EmptyTuple    => Arr()
      case _: AnyNamedTuple =>
        bindGroupEntriesImpl[NamedTuple.DropNames[T & AnyNamedTuple]](0)
      case _ => Arr()

  private inline def bindGroupEntriesImpl[T <: Tuple](
      bindingIdx: Int
  ): Arr[js.Dynamic] =
    inline erasedValue[T] match
      case _: EmptyTuple     => Arr()
      case _: (head *: rest) =>
        val entry = Obj.literal(
          binding = bindingIdx,
          visibility = visibilityFlags[head],
          buffer = Obj.literal(
            `type` = "uniform"
          )
        )
        Arr(entry) ++ bindGroupEntriesImpl[rest](bindingIdx + 1)

  /** Derive all bind group layout descriptors from the full Uniforms type.
    * Returns one entry array per group.
    */
  inline def bindGroupLayoutDescriptors[Uniforms]: Arr[Arr[js.Dynamic]] =
    inline erasedValue[Uniforms] match
      case _: EmptyTuple    => Arr()
      case _: AnyNamedTuple =>
        bindGroupLayoutsImpl[NamedTuple.DropNames[Uniforms & AnyNamedTuple]]
      case _ => Arr()

  private inline def bindGroupLayoutsImpl[T <: Tuple]: Arr[Arr[js.Dynamic]] =
    inline erasedValue[T] match
      case _: EmptyTuple     => Arr()
      case _: (head *: rest) =>
        Arr(bindGroupEntries[head]) ++ bindGroupLayoutsImpl[rest]

  /** Create bind group layouts from the Uniforms type parameter */
  inline def createBindGroupLayouts[Uniforms](
      device: GPUDevice
  ): Arr[GPUBindGroupLayout] =
    val descriptors = bindGroupLayoutDescriptors[Uniforms]
    val result = Arr[GPUBindGroupLayout]()
    for entries <- descriptors do
      result.push(
        device.createBindGroupLayout(
          Obj.literal(entries = entries)
        )
      )
    result

  /** Create a pipeline layout from bind group layouts */
  def createPipelineLayout(
      device: GPUDevice,
      bindGroupLayouts: Arr[GPUBindGroupLayout]
  ): GPUPipelineLayout =
    device.createPipelineLayout(
      Obj.literal(bindGroupLayouts = bindGroupLayouts)
    )

  /** Create both bind group layouts and pipeline layout from the Uniforms type
    */
  inline def createPipelineLayoutFromUniforms[Uniforms](
      device: GPUDevice
  ): (Arr[GPUBindGroupLayout], GPUPipelineLayout) =
    val bgLayouts = createBindGroupLayouts[Uniforms](device)
    val pipelineLayout = createPipelineLayout(device, bgLayouts)
    (bgLayouts, pipelineLayout)
