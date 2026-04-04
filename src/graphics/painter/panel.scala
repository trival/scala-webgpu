package graphics.painter

import graphics.buffers.BufferBinding
import graphics.buffers.UniformValue
import trivalibs.utils.js.*
import webgpu.*

import scala.compiletime.summonFrom
import scala.scalajs.js

type ClearColor = (Double, Double, Double, Double)

class PanelBinding(
    val panel: Panel,
    val index: Int = 0,
    val mipLevel: Int = -1,
) extends js.Object

type PanelBindingValue = BufferBinding[?, ?] | GPUSampler | Panel | PanelBinding

class Panel(val painter: Painter):
  var specWidth: Int = 0
  var specHeight: Int = 0
  var clearColor: Opt[ClearColor] = null
  var depthTest: Boolean = false
  var multisample: Boolean = false
  var mipLevels: Int = 1
  var shapes: Arr[Shape[?, ?]] = Arr()
  var layers: Arr[Layer[?, ?]] = Arr()
  var runtimeBindings: js.Dictionary[PanelBindingValue] = js.Dictionary()

  private var _texture: Opt[GPUTexture] = null
  private var _textureView: Opt[GPUTextureView] = null
  private var _pongTexture: Opt[GPUTexture] = null
  private var _pongView: Opt[GPUTextureView] = null
  private var _depthTexture: Opt[GPUTexture] = null
  private var _depthView: Opt[GPUTextureView] = null
  private var _msaaTexture: Opt[GPUTexture] = null
  private var _msaaView: Opt[GPUTextureView] = null
  private var _outputView: Opt[GPUTextureView] = null
  private var _samplingView: Opt[GPUTextureView] = null
  private var _width: Int = 0
  private var _height: Int = 0
  private val _mipViews: js.Dictionary[GPUTextureView] = js.Dictionary()

  def panelWidth: Int = _width
  def panelHeight: Int = _height

  def mipLevelCount: Int =
    if mipLevels == 0 then
      val maxDim = Math.max(_width, _height)
      if maxDim <= 0 then 1
      else (Math.log(maxDim.toDouble) / Math.log(2.0)).toInt + 1
    else mipLevels

  def textureView: GPUTextureView = _textureView.get
  def pongView: GPUTextureView = _pongView.get
  def depthView: GPUTextureView = _depthView.get
  def msaaView: GPUTextureView = _msaaView.get
  def outputView: GPUTextureView =
    if _outputView.notNull then _outputView.get else _textureView.get

  def textureViewAt(index: Int = 0, mipLevel: Int = -1): GPUTextureView =
    if mipLevel < 0 then
      if _samplingView.notNull then _samplingView.get else _textureView.get
    else
      val key = s"$index|$mipLevel"
      val dict = _mipViews.asInstanceOf[js.Dynamic]
      if js.DynamicImplicits.truthValue(dict.hasOwnProperty(key)) then
        _mipViews(key)
      else
        val view = _texture.get.createView(
          Obj.literal(baseMipLevel = mipLevel, mipLevelCount = 1),
        )
        _mipViews(key) = view
        view

  def binding(index: Int = 0, mipLevel: Int = -1): PanelBinding =
    new PanelBinding(this, index, mipLevel)

  private[painter] def setOutputView(view: GPUTextureView): Unit =
    _outputView = view

  def set(
      width: Maybe[Int] = Maybe.Not,
      height: Maybe[Int] = Maybe.Not,
      clearColor: Maybe[Opt[ClearColor]] = Maybe.Not,
      depthTest: Maybe[Boolean] = Maybe.Not,
      multisample: Maybe[Boolean] = Maybe.Not,
      mipLevels: Maybe[Int] = Maybe.Not,
      shapes: Maybe[Arr[Shape[?, ?]]] = Maybe.Not,
      layers: Maybe[Arr[Layer[?, ?]]] = Maybe.Not,
  ): this.type =
    width.foreach(v => this.specWidth = v)
    height.foreach(v => this.specHeight = v)
    clearColor.foreach(v => this.clearColor = v)
    depthTest.foreach(v => this.depthTest = v)
    multisample.foreach(v => this.multisample = v)
    mipLevels.foreach(v => this.mipLevels = v)
    shapes.foreach(v => this.shapes = v)
    layers.foreach(v => this.layers = v)
    this

  private inline def processPanelEntry[N <: String & Singleton, V](
      pair: BindPair[N, V],
  ): Unit =
    inline pair.value match
      case sampler: GPUSampler =>
        runtimeBindings(pair.name) = sampler
      case bb: BufferBinding[?, ?] =>
        runtimeBindings(pair.name) = bb
      case pb: PanelBinding =>
        runtimeBindings(pair.name) = pb
      case p: Panel =>
        runtimeBindings(pair.name) = p
      case rawValue =>
        val existing = runtimeBindings.asInstanceOf[js.Dynamic]
        if js.DynamicImplicits.truthValue(
            existing.hasOwnProperty(pair.name),
          ) && runtimeBindings(pair.name).isInstanceOf[BufferBinding[?, ?]]
        then
          runtimeBindings(pair.name)
            .asInstanceOf[BufferBinding[V, ?]]
            .set(rawValue)
        else
          summonFrom:
            case uv: UniformValue[V, f] =>
              val bb =
                BufferBinding[V, f](painter.device, rawValue)(using uv)
              runtimeBindings(pair.name) = bb

  inline def bind[N1 <: String & Singleton, V1](
      e1: BindPair[N1, V1],
  ): this.type =
    processPanelEntry(e1)
    this

  inline def bind[N1 <: String & Singleton, V1, N2 <: String & Singleton, V2](
      e1: BindPair[N1, V1],
      e2: BindPair[N2, V2],
  ): this.type =
    processPanelEntry(e1)
    processPanelEntry(e2)
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
    processPanelEntry(e1)
    processPanelEntry(e2)
    processPanelEntry(e3)
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
    processPanelEntry(e1)
    processPanelEntry(e2)
    processPanelEntry(e3)
    processPanelEntry(e4)
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
      N5 <: String & Singleton,
      V5,
  ](
      e1: BindPair[N1, V1],
      e2: BindPair[N2, V2],
      e3: BindPair[N3, V3],
      e4: BindPair[N4, V4],
      e5: BindPair[N5, V5],
  ): this.type =
    processPanelEntry(e1)
    processPanelEntry(e2)
    processPanelEntry(e3)
    processPanelEntry(e4)
    processPanelEntry(e5)
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
  ): this.type =
    processPanelEntry(e1)
    processPanelEntry(e2)
    processPanelEntry(e3)
    processPanelEntry(e4)
    processPanelEntry(e5)
    processPanelEntry(e6)
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
  ): this.type =
    processPanelEntry(e1)
    processPanelEntry(e2)
    processPanelEntry(e3)
    processPanelEntry(e4)
    processPanelEntry(e5)
    processPanelEntry(e6)
    processPanelEntry(e7)
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
  ): this.type =
    processPanelEntry(e1)
    processPanelEntry(e2)
    processPanelEntry(e3)
    processPanelEntry(e4)
    processPanelEntry(e5)
    processPanelEntry(e6)
    processPanelEntry(e7)
    processPanelEntry(e8)
    this

  private def needsPong: Boolean =
    var i = 0
    while i < layers.length do
      if layers(i).shade.panelBindGroupLayout != null then return true
      i += 1
    false

  private[painter] def ensureSize(canvasW: Int, canvasH: Int): Unit =
    val targetW = if specWidth == 0 then canvasW else specWidth
    val targetH = if specHeight == 0 then canvasH else specHeight
    if targetW != _width || targetH != _height then
      if _texture.notNull then _texture.get.destroy()
      if _pongTexture.notNull then _pongTexture.get.destroy()
      if _depthTexture.notNull then _depthTexture.get.destroy()
      if _msaaTexture.notNull then _msaaTexture.get.destroy()
      _width = targetW
      _height = targetH
      // Clear mip view cache on resize
      val mipKeys = js.Object
        .keys(_mipViews.asInstanceOf[js.Object])
        .asInstanceOf[Arr[String]]
      var mk = 0
      while mk < mipKeys.length do
        js.special.delete(_mipViews, mipKeys(mk))
        mk += 1

      val mipCount = mipLevelCount
      val colorUsage =
        GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.TEXTURE_BINDING
      val tex = painter.device.createTexture(
        Obj.literal(
          size = Obj.literal(width = targetW, height = targetH),
          format = painter.preferredFormat,
          usage = colorUsage,
          mipLevelCount = mipCount,
        ),
      )
      _texture = tex
      _textureView = tex.createView(
        Obj.literal(baseMipLevel = 0, mipLevelCount = 1),
      )
      _samplingView =
        if mipCount > 1 then tex.createView()
        else null
      if needsPong then
        val pongTex = painter.device.createTexture(
          Obj.literal(
            size = Obj.literal(width = targetW, height = targetH),
            format = painter.preferredFormat,
            usage = colorUsage,
            mipLevelCount = mipCount,
          ),
        )
        _pongTexture = pongTex
        _pongView = pongTex.createView(
          Obj.literal(baseMipLevel = 0, mipLevelCount = 1),
        )
      if multisample then
        val msaaTex = painter.device.createTexture(
          Obj.literal(
            size = Obj.literal(width = targetW, height = targetH),
            format = painter.preferredFormat,
            sampleCount = 4,
            usage = GPUTextureUsage.RENDER_ATTACHMENT,
          ),
        )
        _msaaTexture = msaaTex
        _msaaView = msaaTex.createView()
      if depthTest then
        val depthTex = painter.device.createTexture(
          Obj.literal(
            size = Obj.literal(width = targetW, height = targetH),
            format = "depth24plus",
            usage = GPUTextureUsage.RENDER_ATTACHMENT,
            sampleCount = if multisample then 4 else 1,
          ),
        )
        _depthTexture = depthTex
        _depthView = depthTex.createView()
