package graphics.painter

import trivalibs.utils.js.*
import webgpu.*

class Panel(
    private val painter: Painter,
    val specWidth: Int,
    val specHeight: Int,
    var clearColor: Opt[(Double, Double, Double, Double)],
    val shapes: Arr[Shape[?]] = Arr(),
):

  private var _width: Int = 0
  private var _height: Int = 0
  private var _texture: GPUTexture | Null = null
  private var _textureView: GPUTextureView | Null = null

  def textureView: GPUTextureView = _textureView.asInstanceOf[GPUTextureView]

  private[painter] def ensureSize(canvasW: Int, canvasH: Int): Unit =
    val targetW = if specWidth == 0 then canvasW else specWidth
    val targetH = if specHeight == 0 then canvasH else specHeight
    if targetW != _width || targetH != _height then
      if _texture != null then _texture.asInstanceOf[GPUTexture].destroy()
      _width = targetW
      _height = targetH
      val tex = painter.device.createTexture(
        Obj.literal(
          size = Obj.literal(width = targetW, height = targetH),
          format = painter.preferredFormat,
          usage = GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.TEXTURE_BINDING,
        ),
      )
      _texture = tex
      _textureView = tex.createView()
