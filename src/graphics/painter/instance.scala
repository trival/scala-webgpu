package graphics.painter

import graphics.buffers.BufferBinding
import graphics.buffers.UniformValue
import graphics.shader.derive
import trivalibs.utils.js.*
import webgpu.GPUSampler

import scala.compiletime.summonFrom

class Instance:
  var bindings: BindingSlots = Arr()
  var panelBindings: Arr[Opt[Panel]] = Arr()

class InstanceList[U, P](val shade: Shade[U, P], val painter: Painter):
  val items: Arr[Instance] = Arr()

  def length: Int = items.length

  def clear(): Unit = items.length = 0

  protected inline def processInstanceEntry[N <: String & Singleton, V](
      inst: Instance,
      pair: BindPair[N, V],
  ): Unit =
    inline if derive.containsName[N, U] then
      inline pair.value match
        case sampler: GPUSampler =>
          derive.checkSamplerFieldType[N, U]
          val idx = shade.uniformIndices(pair.name)
          while inst.bindings.length <= idx do inst.bindings.push(null)
          inst.bindings(idx) = sampler
        case bb: BufferBinding[?, ?] =>
          derive.checkUniformFieldType[N, V, U]
          val idx = shade.uniformIndices(pair.name)
          while inst.bindings.length <= idx do inst.bindings.push(null)
          inst.bindings(idx) = bb
        case rawValue =>
          derive.checkUniformFieldType[N, V, U]
          val idx = shade.uniformIndices(pair.name)
          if idx < inst.bindings.length && inst.bindings(idx) != null then
            inst.bindings(idx).asInstanceOf[BufferBinding[V, ?]].set(rawValue)
          else
            summonFrom:
              case uv: UniformValue[V, f] =>
                val bb =
                  BufferBinding[V, f](painter.device, rawValue)(using uv)
                while inst.bindings.length <= idx do inst.bindings.push(null)
                inst.bindings(idx) = bb
    else inline if derive.containsName[N, P] then
      inline pair.value match
        case p: Panel =>
          val idx = shade.panelIndices(pair.name)
          while inst.panelBindings.length <= idx do inst.panelBindings.push(null)
          inst.panelBindings(idx) = p
        case _ =>
          scala.compiletime.error(
            "Panel binding value must be a Panel instance",
          )
    else
      scala.compiletime.error(
        "Name not found in Uniforms or Panel bindings",
      )

  inline def add[N1 <: String & Singleton, V1](
      e1: BindPair[N1, V1],
  ): Int =
    val inst = Instance()
    processInstanceEntry(inst, e1)
    items.push(inst)
    items.length - 1

  inline def add[N1 <: String & Singleton, V1, N2 <: String & Singleton, V2](
      e1: BindPair[N1, V1],
      e2: BindPair[N2, V2],
  ): Int =
    val inst = Instance()
    processInstanceEntry(inst, e1)
    processInstanceEntry(inst, e2)
    items.push(inst)
    items.length - 1

  inline def add[
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
  ): Int =
    val inst = Instance()
    processInstanceEntry(inst, e1)
    processInstanceEntry(inst, e2)
    processInstanceEntry(inst, e3)
    items.push(inst)
    items.length - 1

  inline def add[
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
  ): Int =
    val inst = Instance()
    processInstanceEntry(inst, e1)
    processInstanceEntry(inst, e2)
    processInstanceEntry(inst, e3)
    processInstanceEntry(inst, e4)
    items.push(inst)
    items.length - 1

  inline def add[
      N1 <: String & Singleton,
      V1,
      N2 <: String & Singleton,
      V2,
      N3 <: String & Singleton,
      V3,
      N4 <: String & Singleton,
      V4,
      N5 <: String & Singleton,
      V5,
  ](
      e1: BindPair[N1, V1],
      e2: BindPair[N2, V2],
      e3: BindPair[N3, V3],
      e4: BindPair[N4, V4],
      e5: BindPair[N5, V5],
  ): Int =
    val inst = Instance()
    processInstanceEntry(inst, e1)
    processInstanceEntry(inst, e2)
    processInstanceEntry(inst, e3)
    processInstanceEntry(inst, e4)
    processInstanceEntry(inst, e5)
    items.push(inst)
    items.length - 1

  inline def add[
      N1 <: String & Singleton,
      V1,
      N2 <: String & Singleton,
      V2,
      N3 <: String & Singleton,
      V3,
      N4 <: String & Singleton,
      V4,
      N5 <: String & Singleton,
      V5,
      N6 <: String & Singleton,
      V6,
  ](
      e1: BindPair[N1, V1],
      e2: BindPair[N2, V2],
      e3: BindPair[N3, V3],
      e4: BindPair[N4, V4],
      e5: BindPair[N5, V5],
      e6: BindPair[N6, V6],
  ): Int =
    val inst = Instance()
    processInstanceEntry(inst, e1)
    processInstanceEntry(inst, e2)
    processInstanceEntry(inst, e3)
    processInstanceEntry(inst, e4)
    processInstanceEntry(inst, e5)
    processInstanceEntry(inst, e6)
    items.push(inst)
    items.length - 1

  inline def add[
      N1 <: String & Singleton,
      V1,
      N2 <: String & Singleton,
      V2,
      N3 <: String & Singleton,
      V3,
      N4 <: String & Singleton,
      V4,
      N5 <: String & Singleton,
      V5,
      N6 <: String & Singleton,
      V6,
      N7 <: String & Singleton,
      V7,
  ](
      e1: BindPair[N1, V1],
      e2: BindPair[N2, V2],
      e3: BindPair[N3, V3],
      e4: BindPair[N4, V4],
      e5: BindPair[N5, V5],
      e6: BindPair[N6, V6],
      e7: BindPair[N7, V7],
  ): Int =
    val inst = Instance()
    processInstanceEntry(inst, e1)
    processInstanceEntry(inst, e2)
    processInstanceEntry(inst, e3)
    processInstanceEntry(inst, e4)
    processInstanceEntry(inst, e5)
    processInstanceEntry(inst, e6)
    processInstanceEntry(inst, e7)
    items.push(inst)
    items.length - 1

  inline def add[
      N1 <: String & Singleton,
      V1,
      N2 <: String & Singleton,
      V2,
      N3 <: String & Singleton,
      V3,
      N4 <: String & Singleton,
      V4,
      N5 <: String & Singleton,
      V5,
      N6 <: String & Singleton,
      V6,
      N7 <: String & Singleton,
      V7,
      N8 <: String & Singleton,
      V8,
  ](
      e1: BindPair[N1, V1],
      e2: BindPair[N2, V2],
      e3: BindPair[N3, V3],
      e4: BindPair[N4, V4],
      e5: BindPair[N5, V5],
      e6: BindPair[N6, V6],
      e7: BindPair[N7, V7],
      e8: BindPair[N8, V8],
  ): Int =
    val inst = Instance()
    processInstanceEntry(inst, e1)
    processInstanceEntry(inst, e2)
    processInstanceEntry(inst, e3)
    processInstanceEntry(inst, e4)
    processInstanceEntry(inst, e5)
    processInstanceEntry(inst, e6)
    processInstanceEntry(inst, e7)
    processInstanceEntry(inst, e8)
    items.push(inst)
    items.length - 1
