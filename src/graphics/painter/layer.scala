package graphics.painter

import graphics.buffers.BufferBinding
import graphics.buffers.UniformValue
import graphics.shader.derive
import trivalibs.utils.js.*
import webgpu.GPUDevice
import webgpu.GPUSampler

import scala.compiletime.summonFrom
import scala.scalajs.js

class Layer[U, P](
    val shade: Shade[U, P],
    val device: GPUDevice,
    var bindings: BindingSlots = Arr(),
    var panelBindings: Arr[Panel | Null] = Arr(),
    var blendState: Opt[BlendState] = Opt.Null,
):
  inline def bind[N1 <: String & Singleton, V1](
      e1: BindPair[N1, V1],
  ): Layer[U, P] =
    processEntry[N1, V1](e1.value)
    this

  inline def bind[
      N1 <: String & Singleton,
      V1,
      N2 <: String & Singleton,
      V2,
  ](
      e1: BindPair[N1, V1],
      e2: BindPair[N2, V2],
  ): Layer[U, P] =
    processEntry[N1, V1](e1.value)
    processEntry[N2, V2](e2.value)
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
  ): Layer[U, P] =
    processEntry[N1, V1](e1.value)
    processEntry[N2, V2](e2.value)
    processEntry[N3, V3](e3.value)
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
  ): Layer[U, P] =
    processEntry[N1, V1](e1.value)
    processEntry[N2, V2](e2.value)
    processEntry[N3, V3](e3.value)
    processEntry[N4, V4](e4.value)
    this

  private inline def processEntry[N <: String & Singleton, V](
      value: V,
  ): Unit =
    inline if derive.containsName[N, U] then
      inline value match
        case sampler: GPUSampler =>
          derive.checkSamplerFieldType[N, U]
          val idx = derive.uniformFieldIndex[N, U]
          while bindings.length <= idx do bindings.push(null)
          bindings(idx) = sampler
        case bb: BufferBinding[?, ?] =>
          derive.checkUniformFieldType[N, V, U]
          val idx = derive.uniformFieldIndex[N, U]
          while bindings.length <= idx do bindings.push(null)
          bindings(idx) = bb
        case rawValue =>
          derive.checkUniformFieldType[N, V, U]
          val idx = derive.uniformFieldIndex[N, U]
          if idx < bindings.length && bindings(idx) != null then
            bindings(idx).asInstanceOf[BufferBinding[V, ?]].set(rawValue)
          else
            summonFrom:
              case uv: UniformValue[V, f] =>
                val bb = BufferBinding[V, f](device, rawValue)(using uv)
                while bindings.length <= idx do bindings.push(null)
                bindings(idx) = bb
    else inline if derive.containsName[N, P] then
      inline value match
        case p: Panel =>
          val idx = derive.panelFieldIndex[N, P]
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
