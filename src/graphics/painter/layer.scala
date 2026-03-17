package graphics.painter

import graphics.buffers.BufferBinding
import graphics.buffers.UniformValue
import graphics.shader.derive
import trivalibs.utils.js.*
import webgpu.GPUDevice

import scala.compiletime.summonFrom
import scala.scalajs.js

class Layer[U](
    val shade: Shade[U],
    val device: GPUDevice,
    var bindings: BindingSlots = Arr(),
    var blendState: Opt[BlendState] = Opt.Null,
):
  inline def bind[N1 <: String & Singleton, V1](
      e1: BindPair[N1, V1],
  ): Layer[U] =
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
  ): Layer[U] =
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
  ): Layer[U] =
    processEntry[N1, V1](e1.value)
    processEntry[N2, V2](e2.value)
    processEntry[N3, V3](e3.value)
    this

  private inline def processEntry[N <: String & Singleton, V](
      value: V,
  ): Unit =
    derive.checkUniformFieldType[N, V, U]
    val idx = derive.uniformFieldIndex[N, U]
    inline value match
      case bb: BufferBinding[?, ?] =>
        while bindings.length <= idx do bindings.push(null)
        bindings(idx) = bb
      case rawValue =>
        if idx < bindings.length && bindings(idx) != null then
          bindings(idx).asInstanceOf[BufferBinding[V, ?]].set(rawValue)
        else
          summonFrom:
            case uv: UniformValue[V, f] =>
              val bb = BufferBinding[V, f](device, rawValue)(using uv)
              while bindings.length <= idx do bindings.push(null)
              bindings(idx) = bb
