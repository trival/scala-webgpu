package graphics.painter

import trivalibs.utils.js.*
import webgpu.*

type ClearColor = (Double, Double, Double, Double)

class Panel(val painter: Painter):
  var specWidth: Int = 0
  var specHeight: Int = 0
  var clearColor: Opt[ClearColor] = (0.0, 0.0, 0.0, 1.0)
  var depthTest: Boolean = false
  var shapes: Arr[Shape[?, ?]] = Arr()
  var layers: Arr[Layer[?, ?]] = Arr()

  private var _texture: Opt[GPUTexture] = Opt.Null
  private var _textureView: Opt[GPUTextureView] = Opt.Null
  private var _depthTexture: Opt[GPUTexture] = Opt.Null
  private var _depthView: Opt[GPUTextureView] = Opt.Null
  private var _width: Int = 0
  private var _height: Int = 0

  def textureView: GPUTextureView = _textureView.get
  def depthView: GPUTextureView = _depthView.get

  def set(
      width: Maybe[Int] = Maybe.Not,
      height: Maybe[Int] = Maybe.Not,
      clearColor: Maybe[Opt[ClearColor]] = Maybe.Not,
      depthTest: Maybe[Boolean] = Maybe.Not,
      shapes: Maybe[Arr[Shape[?, ?]]] = Maybe.Not,
      layers: Maybe[Arr[Layer[?, ?]]] = Maybe.Not,
  ): this.type =
    width.foreach(v => this.specWidth = v)
    height.foreach(v => this.specHeight = v)
    clearColor.foreach(v => this.clearColor = v)
    depthTest.foreach(v => this.depthTest = v)
    shapes.foreach(v => this.shapes = v)
    layers.foreach(v => this.layers = v)
    this

  private[painter] def ensureSize(canvasW: Int, canvasH: Int): Unit =
    val targetW = if specWidth == 0 then canvasW else specWidth
    val targetH = if specHeight == 0 then canvasH else specHeight
    if targetW != _width || targetH != _height then
      if _texture.nonNull then _texture.get.destroy()
      if _depthTexture.nonNull then _depthTexture.get.destroy()
      _width = targetW
      _height = targetH
      val tex = painter.device.createTexture(
        Obj.literal(
          size = Obj.literal(width = targetW, height = targetH),
          format = painter.preferredFormat,
          usage =
            GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.TEXTURE_BINDING,
        ),
      )
      _texture = tex
      _textureView = tex.createView()
      if depthTest then
        val depthTex = painter.device.createTexture(
          Obj.literal(
            size = Obj.literal(width = targetW, height = targetH),
            format = "depth24plus",
            usage = GPUTextureUsage.RENDER_ATTACHMENT,
          ),
        )
        _depthTexture = depthTex
        _depthView = depthTex.createView()
