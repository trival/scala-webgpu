package graphics.painter

import graphics.buffers.*
import graphics.math.*
import graphics.math.cpu.*
import graphics.math.cpu.Vec2
import graphics.shader.*
import graphics.shader.dsl.LayerProgram
import graphics.shader.dsl.Program
import org.scalajs.dom.HTMLCanvasElement
import trivalibs.utils.js.*
import webgpu.*

import scala.compiletime.erasedValue
import scala.scalajs.js

private val LAYER_VERT_BODY =
  """  let x = f32((in.vertex_index << 1u) & 2u) * 2.0 - 1.0;
  let y = f32(in.vertex_index & 2u) * 2.0 - 1.0;
  out.uv = vec2f(x * 0.5 + 0.5, 0.5 - y * 0.5);
  out.position = vec4f(x, y, 0.0, 1.0);"""

private val BLIT_WGSL = """
struct VsOut {
  @builtin(position) pos: vec4f,
  @location(0) uv: vec2f,
}

@vertex
fn vs_main(@builtin(vertex_index) vi: u32) -> VsOut {
  let x = f32((vi << 1u) & 2u) * 2.0 - 1.0;
  let y = f32(vi & 2u) * 2.0 - 1.0;
  var out: VsOut;
  out.pos = vec4f(x, y, 0.0, 1.0);
  out.uv = vec2f(x * 0.5 + 0.5, 0.5 - y * 0.5);
  return out;
}

@group(0) @binding(0) var blit_texture: texture_2d<f32>;
@group(0) @binding(1) var blit_sampler: sampler;

@fragment
fn fs_main(in: VsOut) -> @location(0) vec4f {
  return textureSample(blit_texture, blit_sampler, in.uv);
}
"""

class Painter(
    val device: GPUDevice,
    val queue: GPUQueue,
    val canvas: HTMLCanvasElement,
    val context: GPUCanvasContext,
    val preferredFormat: String,
):
  private val pipelineCache = Dict[GPURenderPipeline]()
  private var nextShadeId = 0
  private val resizeCallbacks = Arr[(Double, Double) => Unit]()

  def onResize(cb: (Double, Double) => Unit): Unit =
    resizeCallbacks.push(cb)
    cb(canvas.width, canvas.height)

  private[painter] def fireResize(w: Double, h: Double): Unit =
    var k = 0
    while k < resizeCallbacks.length do
      resizeCallbacks(k)(w, h)
      k += 1

  def width: Int = canvas.width
  def height: Int = canvas.height

  // =========================================================================
  // Shared samplers
  // =========================================================================

  lazy val samplerNearest: GPUSampler =
    device.createSampler(
      Obj.literal(magFilter = "nearest", minFilter = "nearest"),
    )

  lazy val samplerLinear: GPUSampler =
    device.createSampler(
      Obj.literal(magFilter = "linear", minFilter = "linear"),
    )

  // =========================================================================
  // Shade factory
  // =========================================================================

  // DSL overload — accepts a Program builder lambda (no panels)
  inline def shade[A, V, U](
      build: Program[A, V, U, EmptyTuple] => Unit,
  ): Shade[U, EmptyTuple] =
    val program = new Program[A, V, U, EmptyTuple]
    build(program)
    shadeFromWgsl[A, V, U, EmptyTuple](
      program.vertBodyStr,
      program.fragBodyStr,
      program.helperFnsStr,
    )

  // DSL overload — with panels P
  inline def shade[A, V, U, P](
      build: Program[A, V, U, P] => Unit,
  ): Shade[U, P] =
    val program = new Program[A, V, U, P]
    build(program)
    shadeFromWgsl[A, V, U, P](
      program.vertBodyStr,
      program.fragBodyStr,
      program.helperFnsStr,
    )

  // Raw WGSL string overload — kept for backward compatibility with older drafts
  inline def shade[A, V, U](
      vertWgsl: String,
      fragWgsl: String,
  ): Shade[U, EmptyTuple] =
    shadeFromWgsl[A, V, U, EmptyTuple](vertWgsl, fragWgsl, "")

  private inline def buildIndices[T]: js.Dictionary[Int] =
    val names = derive.fieldNames[T]
    val dict = js.Dictionary[Int]()
    for i <- 0 until names.length do dict(names(i)) = i
    dict

  private inline def shadeFromWgsl[A, V, U, P](
      vertWgsl: String,
      fragWgsl: String,
      helperFns: String,
  ): Shade[U, P] =
    val id = nextShadeId
    nextShadeId += 1
    val uniformIndices = buildIndices[U]
    val panelIndices = buildIndices[P]

    val panelDecls = derive.generatePanelDeclarations[P]

    inline erasedValue[U] match
      case _: EmptyTuple =>
        val sd = Shader[A, V, EmptyTuple](vertWgsl, fragWgsl, helperFns)
        val baseWgsl = sd.generateWGSL
        val wgsl =
          if panelDecls.isEmpty then baseWgsl else s"$baseWgsl\n\n$panelDecls"
        log(wgsl)
        val module = device.createShaderModule(Obj.literal(code = wgsl))
        val vbl = sd.vertexBufferLayout
        val panelBgl = layouts.createPanelBindGroupLayout[P](device)
        val bgls =
          if panelBgl.notNull then Arr[GPUBindGroupLayout](panelBgl)
          else Arr[GPUBindGroupLayout]()
        val pl = layouts.createPipelineLayout(device, bgls)
        Shade[U, P](
          id,
          module,
          vbl,
          null,
          panelBgl,
          pl,
          false,
          uniformIndices,
          panelIndices,
        )
      case _ =>
        type Wrapped = (values: U)
        val sd = Shader[A, V, Wrapped](vertWgsl, fragWgsl, helperFns)
        val baseWgsl = sd.generateWGSL
        val wgsl =
          if panelDecls.isEmpty then baseWgsl else s"$baseWgsl\n\n$panelDecls"
        log(wgsl)
        val module = device.createShaderModule(Obj.literal(code = wgsl))
        val vbl = sd.vertexBufferLayout
        val (bgls, _) = sd.createPipelineLayout(device)
        val panelBgl = layouts.createPanelBindGroupLayout[P](device)
        val allBgls =
          if panelBgl.notNull then bgls ++ Arr[GPUBindGroupLayout](panelBgl)
          else bgls
        val pl = layouts.createPipelineLayout(device, allBgls)
        Shade[U, P](
          id,
          module,
          vbl,
          bgls(0),
          panelBgl,
          pl,
          false,
          uniformIndices,
          panelIndices,
        )

  // =========================================================================
  // LayerShade factory — fullscreen triangle with user fragment shader
  // =========================================================================

  inline def layerShade[U](
      build: LayerProgram[U, EmptyTuple] => Unit,
  ): Shade[U, EmptyTuple] =
    val program = new LayerProgram[U, EmptyTuple]
    build(program)
    layerShadeFromWgsl[U, EmptyTuple](program.fragBodyStr, program.helperFnsStr)

  inline def layerShade[U, P](build: LayerProgram[U, P] => Unit): Shade[U, P] =
    val program = new LayerProgram[U, P]
    build(program)
    layerShadeFromWgsl[U, P](program.fragBodyStr, program.helperFnsStr)

  private inline def layerShadeFromWgsl[U, P](
      fragWgsl: String,
      helperFns: String,
  ): Shade[U, P] =
    val id = nextShadeId
    nextShadeId += 1
    val uniformIndices = buildIndices[U]
    val panelIndices = buildIndices[P]
    type VBI = (vertex_index: BuiltinVertexIndex)
    val panelDecls = derive.generatePanelDeclarations[P]
    inline erasedValue[U] match
      case _: EmptyTuple =>
        val sd = Shader.full[
          EmptyTuple,
          (uv: Vec2),
          EmptyTuple,
          VBI,
          VertOut,
          EmptyTuple,
          FragOut,
        ](LAYER_VERT_BODY, fragWgsl, helperFns)
        val baseWgsl = sd.generateWGSL
        val wgsl =
          if panelDecls.isEmpty then baseWgsl else s"$baseWgsl\n\n$panelDecls"
        log(wgsl)
        val module = device.createShaderModule(Obj.literal(code = wgsl))
        val panelBgl = layouts.createPanelBindGroupLayout[P](device)
        val bgls =
          if panelBgl.notNull then Arr[GPUBindGroupLayout](panelBgl)
          else Arr[GPUBindGroupLayout]()
        val pl = layouts.createPipelineLayout(device, bgls)
        Shade[U, P](
          id,
          module,
          null,
          null,
          panelBgl,
          pl,
          false,
          uniformIndices,
          panelIndices,
        )
      case _ =>
        import scala.NamedTuple.AnyNamedTuple
        type FragU = NamedTuple.Map[U & AnyNamedTuple, derive.WrapFragment]
        type Wrapped = (values: FragU)
        val sd = Shader.full[
          EmptyTuple,
          (uv: Vec2),
          Wrapped,
          VBI,
          VertOut,
          EmptyTuple,
          FragOut,
        ](LAYER_VERT_BODY, fragWgsl, helperFns)
        val baseWgsl = sd.generateWGSL
        val wgsl =
          if panelDecls.isEmpty then baseWgsl else s"$baseWgsl\n\n$panelDecls"
        log(wgsl)
        val module = device.createShaderModule(Obj.literal(code = wgsl))
        val (bgls, _) = sd.createPipelineLayout(device)
        val panelBgl = layouts.createPanelBindGroupLayout[P](device)
        val allBgls =
          if panelBgl.notNull then bgls ++ Arr[GPUBindGroupLayout](panelBgl)
          else bgls
        val pl = layouts.createPipelineLayout(device, allBgls)
        Shade[U, P](
          id,
          module,
          null,
          bgls(0),
          panelBgl,
          pl,
          false,
          uniformIndices,
          panelIndices,
        )

  // =========================================================================
  // Form factory
  // =========================================================================

  def form(): Form = Form(this)

  // =========================================================================
  // Binding factory
  // =========================================================================

  inline def binding[T: UniformLayout as ul](
      value: T,
  ): BufferBinding[T, ul.Fields] =
    BufferBinding[T](device, value)

  inline def binding[T: UniformLayout as ul]: BufferBinding[T, ul.Fields] =
    BufferBinding[T](device)

  // =========================================================================
  // Shape factory
  // =========================================================================

  def shape[U, P](shade: Shade[U, P], form: Form): Shape[U, P] =
    Shape[U, P](this, shade, form)

  // =========================================================================
  // Layer factory
  // =========================================================================

  def layer[U, P](shade: Shade[U, P]): Layer[U, P] =
    Layer[U, P](this, shade)

  // =========================================================================
  // Panel factory
  // =========================================================================

  def panel(): Panel = Panel(this)

  // =========================================================================
  // draw() — direct-to-canvas rendering
  // =========================================================================

  def draw(
      shape: Shape[?, ?],
      clearColor: Opt[(Double, Double, Double, Double)] = null,
  ): Unit =
    val encoder = device.createCommandEncoder()
    val textureView = context.getCurrentTexture().createView()

    val colorAttachment =
      if clearColor.notNull then
        val (r, g, b, a) = clearColor
        Obj.literal(
          view = textureView,
          loadOp = "clear",
          storeOp = "store",
          clearValue = Obj.literal(r = r, g = g, b = b, a = a),
        )
      else
        Obj.literal(
          view = textureView,
          loadOp = "load",
          storeOp = "store",
        )

    val pass = encoder.beginRenderPass(
      Obj.literal(colorAttachments = Arr(colorAttachment)),
    )

    renderShapeOnPass(pass, shape)
    pass.end()

    queue.submit(Arr(encoder.finish()))

  // =========================================================================
  // paint() / show() — Panel-based rendering
  // =========================================================================

  def paint(panel: Panel): Unit =
    val w = width
    val h = height
    panel.ensureSize(w, h)
    val msaa = panel.multisample

    // Step 1: render shapes into main texture
    val encoder = device.createCommandEncoder()

    val colorAttachment =
      if panel.clearColor.notNull then
        val (r, g, b, a) = panel.clearColor
        if msaa then
          Obj.literal(
            view = panel.msaaView,
            resolveTarget = panel.textureView,
            loadOp = "clear",
            storeOp = "discard",
            clearValue = Obj.literal(r = r, g = g, b = b, a = a),
          )
        else
          Obj.literal(
            view = panel.textureView,
            loadOp = "clear",
            storeOp = "store",
            clearValue = Obj.literal(r = r, g = g, b = b, a = a),
          )
      else if msaa then
        Obj.literal(
          view = panel.msaaView,
          resolveTarget = panel.textureView,
          loadOp = "load",
          storeOp = "store",
        )
      else
        Obj.literal(
          view = panel.textureView,
          loadOp = "load",
          storeOp = "store",
        )

    val passDesc: js.Dynamic =
      Obj.literal(colorAttachments = Arr(colorAttachment))
    if panel.depthTest then
      passDesc.depthStencilAttachment = Obj.literal(
        view = panel.depthView,
        depthLoadOp = "clear",
        depthStoreOp = "store",
        depthClearValue = 1.0,
      )

    // Step 1: Render shapes (with depth/msaa from panel config)
    val shapePass = encoder.beginRenderPass(passDesc)

    var i = 0
    while i < panel.shapes.length do
      renderShapeOnPass(shapePass, panel.shapes(i), panel.depthTest, msaa, panel)
      i += 1

    shapePass.end()
    queue.submit(Arr(encoder.finish()))

    // Step 2: Render layers in order — no depth, no msaa.
    // Layers are fullscreen quads that always render on top.
    // Consecutive non-ping-pong layers share a pass; ping-pong forces a new one.

    var srcView = panel.textureView
    var dstView = panel.pongView
    var hasPongLayers = false

    var curEncoder: Opt[GPUCommandEncoder] = null
    var curPass: Opt[GPURenderPassEncoder] = null

    var j = 0
    while j < panel.layers.length do
      val layer = panel.layers(j)
      val hasPanelLayout = layer.shade.panelBindGroupLayout.notNull
      val slot0Manual = hasPanelLayout &&
        layer.panelBindings.length > 0 && layer.panelBindings(0).notNull
      val needsPingPong = hasPanelLayout && !slot0Manual

      if needsPingPong then
        hasPongLayers = true
        // End current pass if open, submit
        if curPass.notNull then
          curPass.end()
          queue.submit(Arr(curEncoder.finish()))
          curPass = null

        // Ping-pong pass: render to dstView, inject srcView at slot 0
        val enc = device.createCommandEncoder()
        val ppPass = enc.beginRenderPass(
          Obj.literal(
            colorAttachments = Arr(
              Obj.literal(
                view = dstView,
                loadOp = "load",
                storeOp = "store",
              ),
            ),
          ),
        )
        renderLayerOnPass(ppPass, layer, srcView = srcView, panel = panel)
        ppPass.end()
        queue.submit(Arr(enc.finish()))

        val tmp = srcView; srcView = dstView; dstView = tmp
      else
        // Lazily open a pass on srcView if none is open
        if curPass.isNull then
          curEncoder = device.createCommandEncoder()
          curPass = curEncoder.beginRenderPass(
            Obj.literal(
              colorAttachments = Arr(
                Obj.literal(
                  view = srcView,
                  loadOp = "load",
                  storeOp = "store",
                ),
              ),
            ),
          )
        renderLayerOnPass(curPass, layer, panel = panel)

      j += 1

    if curPass.notNull then
      curPass.end()
      queue.submit(Arr(curEncoder.finish()))

    // Record the final output view for show()
    if hasPongLayers then panel.setOutputView(srcView)
    else panel.setOutputView(null)

  def show(panel: Panel): Unit =
    val encoder = device.createCommandEncoder()
    val swapChainView = context.getCurrentTexture().createView()

    val pass = encoder.beginRenderPass(
      Obj.literal(
        colorAttachments = Arr(
          Obj.literal(
            view = swapChainView,
            loadOp = "load",
            storeOp = "store",
          ),
        ),
      ),
    )

    val bindGroup = device.createBindGroup(
      Obj.literal(
        layout = blitBindGroupLayout,
        entries = Arr(
          Obj.literal(binding = 0, resource = panel.outputView),
          Obj.literal(binding = 1, resource = blitSampler),
        ),
      ),
    )

    pass.setPipeline(blitPipeline)
    pass.setBindGroup(0, bindGroup)
    pass.draw(3)
    pass.end()

    queue.submit(Arr(encoder.finish()))

  // =========================================================================
  // Blit pipeline — created lazily on first show()
  // =========================================================================

  private lazy val blitSampler: GPUSampler =
    device.createSampler(
      Obj.literal(magFilter = "nearest", minFilter = "nearest"),
    )

  private lazy val blitBindGroupLayout: GPUBindGroupLayout =
    device.createBindGroupLayout(
      Obj.literal(
        entries = Arr(
          Obj.literal(
            binding = 0,
            visibility = GPUShaderStage.FRAGMENT,
            texture = Obj.literal(),
          ),
          Obj.literal(
            binding = 1,
            visibility = GPUShaderStage.FRAGMENT,
            sampler = Obj.literal(),
          ),
        ),
      ),
    )

  private lazy val blitPipeline: GPURenderPipeline =
    val module = device.createShaderModule(Obj.literal(code = BLIT_WGSL))
    val pipelineLayout = device.createPipelineLayout(
      Obj.literal(bindGroupLayouts = Arr(blitBindGroupLayout)),
    )
    device.createRenderPipeline(
      Obj.literal(
        layout = pipelineLayout,
        vertex = Obj.literal(module = module, entryPoint = "vs_main"),
        fragment = Obj.literal(
          module = module,
          entryPoint = "fs_main",
          targets = Arr(Obj.literal(format = preferredFormat)),
        ),
        primitive = Obj.literal(topology = "triangle-list"),
      ),
    )

  // =========================================================================
  // Working buffers for binding merge (reusable, single-threaded JS)
  // =========================================================================

  private val _workBindings: BindingSlots = Arr()
  private val _workPanelBindings: Arr[Opt[Panel]] = Arr()

  private def copyToWork(
      bindings: BindingSlots,
      panelBindings: Arr[Opt[Panel]],
  ): Unit =
    _workBindings.length = bindings.length
    var i = 0
    while i < bindings.length do
      _workBindings(i) = bindings(i)
      i += 1
    _workPanelBindings.length = panelBindings.length
    var j = 0
    while j < panelBindings.length do
      _workPanelBindings(j) = panelBindings(j)
      j += 1

  private def applyPanelRuntimeBindings(
      panel: Panel,
      shade: Shade[?, ?],
      workBindings: BindingSlots,
      workPanelBindings: Arr[Opt[Panel]],
  ): Unit =
    val dict = panel.runtimeBindings
    val keys =
      js.Object.keys(dict.asInstanceOf[js.Object]).asInstanceOf[Arr[String]]
    var i = 0
    while i < keys.length do
      val name = keys(i)
      val value = dict(name)
      val uniDyn = shade.uniformIndices.asInstanceOf[js.Dynamic]
      val panDyn = shade.panelIndices.asInstanceOf[js.Dynamic]
      if js.DynamicImplicits.truthValue(uniDyn.hasOwnProperty(name)) then
        val idx = shade.uniformIndices(name)
        if idx >= workBindings.length || workBindings(idx) == null then
          while workBindings.length <= idx do workBindings.push(null)
          workBindings(idx) =
            value.asInstanceOf[BufferBinding[?, ?] | GPUSampler]
      else if js.DynamicImplicits.truthValue(panDyn.hasOwnProperty(name)) then
        val idx = shade.panelIndices(name)
        if idx >= workPanelBindings.length || workPanelBindings(idx).isNull then
          while workPanelBindings.length <= idx do workPanelBindings.push(null)
          workPanelBindings(idx) = value.asInstanceOf[Panel]
      i += 1

  private def applyInstanceBindings(
      inst: Instance[?, ?],
      workBindings: BindingSlots,
      workPanelBindings: Arr[Opt[Panel]],
  ): Unit =
    var i = 0
    while i < inst.bindings.length do
      if inst.bindings(i) != null then
        while workBindings.length <= i do workBindings.push(null)
        workBindings(i) = inst.bindings(i)
      i += 1
    var j = 0
    while j < inst.panelBindings.length do
      if inst.panelBindings(j).notNull then
        while workPanelBindings.length <= j do workPanelBindings.push(null)
        workPanelBindings(j) = inst.panelBindings(j)
      j += 1

  private def hasPanelRuntimeBindings(panel: Opt[Panel]): Boolean =
    panel.notNull && js.Object
      .keys(panel.runtimeBindings.asInstanceOf[js.Object])
      .asInstanceOf[Arr[String]]
      .length > 0

  // =========================================================================
  // Bind group helpers
  // =========================================================================

  private def setValueBindGroup(
      pass: GPURenderPassEncoder,
      shade: Shade[?, ?],
      bindings: BindingSlots,
  ): Unit =
    if bindings.length > 0 && shade.valueBindGroupLayout.notNull then
      val entries = Arr[js.Dynamic]()
      var i = 0
      while i < bindings.length do
        val b = bindings(i)
        if b != null then entries.push(bindingEntry(i, b))
        i += 1
      val bg = device.createBindGroup(
        Obj.literal(layout = shade.valueBindGroupLayout, entries = entries),
      )
      pass.setBindGroup(0, bg)

  private def setPanelBindGroup(
      pass: GPURenderPassEncoder,
      shade: Shade[?, ?],
      panelBindings: Arr[Opt[Panel]],
      srcView: Opt[GPUTextureView] = null,
  ): Unit =
    if shade.panelBindGroupLayout.notNull then
      val entries = Arr[js.Dynamic]()
      if srcView.notNull then
        entries.push(Obj.literal(binding = 0, resource = srcView))
      val startIdx = if srcView.notNull then 1 else 0
      var k = startIdx
      while k < panelBindings.length do
        val p = panelBindings(k)
        if p.notNull then
          entries.push(Obj.literal(binding = k, resource = p.textureView))
        k += 1
      if entries.length > 0 then
        val pg = device.createBindGroup(
          Obj.literal(
            layout = shade.panelBindGroupLayout,
            entries = entries,
          ),
        )
        pass.setBindGroup(1, pg)

  // =========================================================================
  // Per-shape render pass helper (shared by draw() and paint())
  // =========================================================================

  private def renderShapeOnPass(
      pass: GPURenderPassEncoder,
      shape: Shape[?, ?],
      depthTest: Boolean = false,
      multisample: Boolean = false,
      panel: Opt[Panel] = null,
  ): Unit =
    val cacheKey =
      pipelineKeyStr(shape, preferredFormat, depthTest, multisample)
    val pipeline =
      if js.DynamicImplicits.truthValue(
          pipelineCache.asInstanceOf[js.Dynamic].hasOwnProperty(cacheKey),
        )
      then pipelineCache(cacheKey)
      else
        val p = createPipeline(shape, depthTest, multisample)
        pipelineCache(cacheKey) = p
        p

    pass.setPipeline(pipeline)
    pass.setVertexBuffer(0, shape.form.vertexBuffer)

    val instanceCount = shape.instances.length
    val hasPanelBinds = hasPanelRuntimeBindings(panel)

    if instanceCount == 0 then
      if hasPanelBinds then
        copyToWork(shape.bindings, shape.panelBindings)
        applyPanelRuntimeBindings(panel, shape.shade, _workBindings, _workPanelBindings)
        setValueBindGroup(pass, shape.shade, _workBindings)
        setPanelBindGroup(pass, shape.shade, _workPanelBindings)
      else
        setValueBindGroup(pass, shape.shade, shape.bindings)
        setPanelBindGroup(pass, shape.shade, shape.panelBindings)
      pass.draw(shape.form.vertexCount)
    else
      var i = 0
      while i < instanceCount do
        val inst = shape.instances.items(i)
        copyToWork(shape.bindings, shape.panelBindings)
        if hasPanelBinds then
          applyPanelRuntimeBindings(panel, shape.shade, _workBindings, _workPanelBindings)
        applyInstanceBindings(inst, _workBindings, _workPanelBindings)
        setValueBindGroup(pass, shape.shade, _workBindings)
        setPanelBindGroup(pass, shape.shade, _workPanelBindings)
        pass.draw(shape.form.vertexCount)
        i += 1

  // =========================================================================
  // Per-layer render pass helper
  // =========================================================================

  private def renderLayerOnPass(
      pass: GPURenderPassEncoder,
      layer: Layer[?, ?],
      depthTest: Boolean = false,
      multisample: Boolean = false,
      srcView: Opt[GPUTextureView] = null,
      panel: Opt[Panel] = null,
  ): Unit =
    val cacheKey =
      s"L|${layer.shade.id}|${layer.blendState.isNull}|$preferredFormat|$depthTest|$multisample"
    val pipeline =
      if js.DynamicImplicits.truthValue(
          pipelineCache.asInstanceOf[js.Dynamic].hasOwnProperty(cacheKey),
        )
      then pipelineCache(cacheKey)
      else
        val p = createLayerPipeline(layer, depthTest, multisample)
        pipelineCache(cacheKey) = p
        p

    pass.setPipeline(pipeline)

    val instanceCount = layer.instances.length
    val hasPanelBinds = hasPanelRuntimeBindings(panel)

    if instanceCount == 0 then
      if hasPanelBinds then
        copyToWork(layer.bindings, layer.panelBindings)
        applyPanelRuntimeBindings(panel, layer.shade, _workBindings, _workPanelBindings)
        setValueBindGroup(pass, layer.shade, _workBindings)
        val effectiveSrcView =
          if _workPanelBindings.length > 0 && _workPanelBindings(0).notNull
          then null
          else srcView
        setPanelBindGroup(pass, layer.shade, _workPanelBindings, effectiveSrcView)
      else
        setValueBindGroup(pass, layer.shade, layer.bindings)
        setPanelBindGroup(pass, layer.shade, layer.panelBindings, srcView)
      pass.draw(3)
    else
      var i = 0
      while i < instanceCount do
        val inst = layer.instances.items(i)
        copyToWork(layer.bindings, layer.panelBindings)
        if hasPanelBinds then
          applyPanelRuntimeBindings(panel, layer.shade, _workBindings, _workPanelBindings)
        applyInstanceBindings(inst, _workBindings, _workPanelBindings)
        setValueBindGroup(pass, layer.shade, _workBindings)
        val effectiveSrcView =
          if _workPanelBindings.length > 0 && _workPanelBindings(0).notNull
          then null
          else srcView
        setPanelBindGroup(pass, layer.shade, _workPanelBindings, effectiveSrcView)
        pass.draw(3)
        i += 1

  private def createLayerPipeline(
      layer: Layer[?, ?],
      depthTest: Boolean = false,
      multisample: Boolean = false,
  ): GPURenderPipeline =
    val shade = layer.shade
    val target: js.Dynamic =
      if layer.blendState.isNull then Obj.literal(format = preferredFormat)
      else Obj.literal(format = preferredFormat, blend = layer.blendState)
    val desc = Obj.literal(
      layout = shade.pipelineLayout,
      vertex = Obj.literal(module = shade.shaderModule, entryPoint = "vs_main"),
      fragment = Obj.literal(
        module = shade.shaderModule,
        entryPoint = "fs_main",
        targets = Arr(target),
      ),
      primitive = Obj.literal(topology = "triangle-list"),
    )
    if depthTest then
      desc.depthStencil = Obj.literal(
        format = "depth24plus",
        depthWriteEnabled = true,
        depthCompare = "less",
      )
    if multisample then desc.multisample = Obj.literal(count = 4)
    device.createRenderPipeline(desc)

  // =========================================================================
  // Pipeline creation + caching
  // =========================================================================

  private def pipelineKeyStr(
      shape: Shape[?, ?],
      format: String,
      depthTest: Boolean,
      multisample: Boolean,
  ): String =
    val s = shape.shade
    val f = shape.form
    s"${s.id}|${shape.blendState.isNull}|${shape.cullMode}|${f.topology}|${f.frontFace}|${format}|${depthTest}|${multisample}"

  private def createPipeline(
      shape: Shape[?, ?],
      depthTest: Boolean = false,
      multisample: Boolean = false,
  ): GPURenderPipeline =
    val shade = shape.shade

    val target: js.Dynamic =
      if shape.blendState.isNull then Obj.literal(format = preferredFormat)
      else Obj.literal(format = preferredFormat, blend = shape.blendState)

    val vertexDescriptor =
      if shade.vertexBufferLayout.notNull then
        Obj.literal(
          module = shade.shaderModule,
          entryPoint = "vs_main",
          buffers = Arr(shade.vertexBufferLayout),
        )
      else
        Obj.literal(
          module = shade.shaderModule,
          entryPoint = "vs_main",
        )

    val desc = Obj.literal(
      layout = shade.pipelineLayout,
      vertex = vertexDescriptor,
      fragment = Obj.literal(
        module = shade.shaderModule,
        entryPoint = "fs_main",
        targets = Arr(target),
      ),
      primitive = Obj.literal(
        topology = shape.form.topology.toJs,
        cullMode = shape.cullMode.toJs,
        frontFace = shape.form.frontFace.toJs,
      ),
    )
    if depthTest then
      desc.depthStencil = Obj.literal(
        format = "depth24plus",
        depthWriteEnabled = true,
        depthCompare = "less",
      )
    if multisample then desc.multisample = Obj.literal(count = 4)
    device.createRenderPipeline(desc)

  // =========================================================================
  // Bind group creation
  // =========================================================================

  private def bindingEntry(
      i: Int,
      b: BufferBinding[?, ?] | GPUSampler,
  ): js.Dynamic =
    if b.isInstanceOf[BufferBinding[?, ?]] then
      val buffer = b.asInstanceOf[BufferBinding[?, ?]]
      Obj.literal(
        binding = i,
        resource = Obj.literal(buffer = buffer.gpuBuffer),
      )
    else Obj.literal(binding = i, resource = b.asInstanceOf[GPUSampler])

object Painter:
  def init(canvas: HTMLCanvasElement): js.Promise[Painter] =
    val maybeGpu = WebGPU.getGPU()
    if maybeGpu.isEmpty then
      js.Promise.reject(
        js.Error("WebGPU is not supported"),
      )
    else
      val gpu = maybeGpu.safe
      for
        adapter <- gpu.requestAdapter().orError("Failed to get WebGPU adapter")
        device <- adapter.requestDevice()
      yield
        val queue = device.queue
        val context = WebGPU.getContext(canvas)
        val format = gpu.getPreferredCanvasFormat()

        context.configure(
          Obj.literal(
            device = device,
            format = format,
          ),
        )

        val painter = Painter(device, queue, canvas, context, format)

        // Set initial canvas size
        val w = canvas.clientWidth
        val h = canvas.clientHeight
        canvas.width = w
        canvas.height = h

        // Set up ResizeObserver — updates canvas dimensions and fires painter callbacks
        val observer = js.Dynamic
          .newInstance(js.Dynamic.global.ResizeObserver)(
            ((entries: js.Array[js.Dynamic]) =>
              val entry = entries(0)
              val rw: Double = entry.contentRect.width.asInstanceOf[Double]
              val rh: Double = entry.contentRect.height.asInstanceOf[Double]
              if rw > 0 && rh > 0 then
                canvas.width = rw.toInt
                canvas.height = rh.toInt
                painter.fireResize(rw, rh),
            ): js.Function1[js.Array[js.Dynamic], Unit],
          )
        observer.observe(canvas)

        painter

  def init(canvas: HTMLCanvasElement)(
      setup: Painter => Unit,
  ): js.Promise[Unit] =
    init(canvas).map: painter =>
      setup(painter)
