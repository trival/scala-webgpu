package graphics.painter

import trivalibs.utils.js.*
import webgpu.*

type ClearColor = (Double, Double, Double, Double)

class Panel(val painter: Painter):
  var specWidth: Int = 0
  var specHeight: Int = 0
  var clearColor: Opt[ClearColor] = null
  var depthTest: Boolean = false
  var multisample: Boolean = false
  var shapes: Arr[Shape[?, ?]] = Arr()
  var layers: Arr[Layer[?, ?]] = Arr()

  private var _texture: Opt[GPUTexture] = null
  private var _textureView: Opt[GPUTextureView] = null
  private var _pongTexture: Opt[GPUTexture] = null
  private var _pongView: Opt[GPUTextureView] = null
  private var _depthTexture: Opt[GPUTexture] = null
  private var _depthView: Opt[GPUTextureView] = null
  private var _msaaTexture: Opt[GPUTexture] = null
  private var _msaaView: Opt[GPUTextureView] = null
  private var _outputView: Opt[GPUTextureView] = null
  private var _width: Int = 0
  private var _height: Int = 0

  def textureView: GPUTextureView = _textureView.get
  def pongView: GPUTextureView = _pongView.get
  def depthView: GPUTextureView = _depthView.get
  def msaaView: GPUTextureView = _msaaView.get
  def outputView: GPUTextureView =
    if _outputView.notNull then _outputView.get else _textureView.get

  private[painter] def setOutputView(view: GPUTextureView): Unit =
    _outputView = view

  def set(
      width: Maybe[Int] = Maybe.Not,
      height: Maybe[Int] = Maybe.Not,
      clearColor: Maybe[Opt[ClearColor]] = Maybe.Not,
      depthTest: Maybe[Boolean] = Maybe.Not,
      multisample: Maybe[Boolean] = Maybe.Not,
      shapes: Maybe[Arr[Shape[?, ?]]] = Maybe.Not,
      layers: Maybe[Arr[Layer[?, ?]]] = Maybe.Not,
  ): this.type =
    width.foreach(v => this.specWidth = v)
    height.foreach(v => this.specHeight = v)
    clearColor.foreach(v => this.clearColor = v)
    depthTest.foreach(v => this.depthTest = v)
    multisample.foreach(v => this.multisample = v)
    shapes.foreach(v => this.shapes = v)
    layers.foreach(v => this.layers = v)
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
      val colorUsage =
        GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.TEXTURE_BINDING
      val tex = painter.device.createTexture(
        Obj.literal(
          size = Obj.literal(width = targetW, height = targetH),
          format = painter.preferredFormat,
          usage = colorUsage,
        ),
      )
      _texture = tex
      _textureView = tex.createView()
      if needsPong then
        val pongTex = painter.device.createTexture(
          Obj.literal(
            size = Obj.literal(width = targetW, height = targetH),
            format = painter.preferredFormat,
            usage = colorUsage,
          ),
        )
        _pongTexture = pongTex
        _pongView = pongTex.createView()
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
