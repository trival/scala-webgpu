package graphics.painter

import graphics.buffers.BufferBinding
import graphics.buffers.UniformValue
import graphics.shader.derive
import trivalibs.utils.js.*
import webgpu.GPUDevice
import webgpu.GPUSampler

import scala.compiletime.summonFrom
import scala.scalajs.js

type BindingSlots = Arr[BufferBinding[?, ?] | GPUSampler | Null]

class BindPair[N <: String & Singleton, V](val name: N, val value: V)

extension [N <: String & Singleton](name: N)
  inline def :=[V](value: V): BindPair[N, V] = BindPair(name, value)

trait Bindable[U, P]:
  val shade: Shade[U, P]
  val painter: Painter
  inline def device: GPUDevice = painter.device
  var bindings: BindingSlots
  var panelBindings: Arr[Panel | Null]

  inline def bind[N1 <: String & Singleton, V1](
      e1: BindPair[N1, V1],
  ): this.type =
    processEntry(e1)
    this

  inline def bind[
      N1 <: String & Singleton,
      V1,
      N2 <: String & Singleton,
      V2,
  ](
      e1: BindPair[N1, V1],
      e2: BindPair[N2, V2],
  ): this.type =
    processEntry(e1)
    processEntry(e2)
    this

  inline def bind[
      N1 <: String & Singleton,
      V1,
      N2 <: String & Singleton,
      V2,
      N3 <: String & Singleton,
      V3,
  ](
      e1: BindPair[N1, V1],
      e2: BindPair[N2, V2],
      e3: BindPair[N3, V3],
  ): this.type =
    processEntry(e1)
    processEntry(e2)
    processEntry(e3)
    this

  inline def bind[
      N1 <: String & Singleton,
      V1,
      N2 <: String & Singleton,
      V2,
      N3 <: String & Singleton,
      V3,
      N4 <: String & Singleton,
      V4,
  ](
      e1: BindPair[N1, V1],
      e2: BindPair[N2, V2],
      e3: BindPair[N3, V3],
      e4: BindPair[N4, V4],
  ): this.type =
    processEntry(e1)
    processEntry(e2)
    processEntry(e3)
    processEntry(e4)
    this

  protected inline def processEntry[N <: String & Singleton, V](
      pair: BindPair[N, V],
  ): Unit =
    inline if derive.containsName[N, U] then
      inline pair.value match
        case sampler: GPUSampler =>
          derive.checkSamplerFieldType[N, U]
          val idx = shade.uniformIndices(pair.name)
          while bindings.length <= idx do bindings.push(null)
          bindings(idx) = sampler
        case bb: BufferBinding[?, ?] =>
          derive.checkUniformFieldType[N, V, U]
          val idx = shade.uniformIndices(pair.name)
          while bindings.length <= idx do bindings.push(null)
          bindings(idx) = bb
        case rawValue =>
          derive.checkUniformFieldType[N, V, U]
          val idx = shade.uniformIndices(pair.name)
          if idx < bindings.length && bindings(idx) != null then
            bindings(idx).asInstanceOf[BufferBinding[V, ?]].set(rawValue)
          else
            summonFrom:
              case uv: UniformValue[V, f] =>
                val bb = BufferBinding[V, f](device, rawValue)(using uv)
                while bindings.length <= idx do bindings.push(null)
                bindings(idx) = bb
    else inline if derive.containsName[N, P] then
      inline pair.value match
        case p: Panel =>
          val idx = shade.panelIndices(pair.name)
          while panelBindings.length <= idx do panelBindings.push(null)
          panelBindings(idx) = p
        case _ =>
          scala.compiletime.error(
            "Panel binding value must be a Panel instance",
          )
    else
      scala.compiletime.error(
        "Name not found in Uniforms or Panel bindings",
      )

class Shape[U, P](
    val painter: Painter,
    val shade: Shade[U, P],
    val form: Form,
) extends Bindable[U, P]:
  var cullMode: CullMode = CullMode.None
  var blendState: Opt[BlendState] = Opt.Null
  var bindings: BindingSlots = Arr()
  var panelBindings: Arr[Panel | Null] = Arr()

  def set(
      cullMode: Maybe[CullMode] = Maybe.Not,
      blendState: Maybe[Opt[BlendState]] = Maybe.Not,
  ): this.type =
    cullMode.foreach(v => this.cullMode = v)
    blendState.foreach(v => this.blendState = v)
    this
