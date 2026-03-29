package graphics.painter

import trivalibs.utils.js.*
import webgpu.*

class Panel(
    private val painter: Painter,
    val specWidth: Int,
    val specHeight: Int,
    var clearColor: Opt[(Double, Double, Double, Double)],
    val depthTest: Boolean = false,
    val shapes: Arr[Shape[?, ?]] = Arr(),
    val layers: Arr[Layer[?, ?]] = Arr(),
):

  private var _width: Int = 0
  private var _height: Int = 0
  private var _texture: Opt[GPUTexture] = Opt.Null
  private var _textureView: Opt[GPUTextureView] = Opt.Null
  private var _depthTexture: Opt[GPUTexture] = Opt.Null
  private var _depthView: Opt[GPUTextureView] = Opt.Null

  def textureView: GPUTextureView = _textureView.get
  def depthView: GPUTextureView = _depthView.get

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
