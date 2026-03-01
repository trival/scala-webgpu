'use strict';
import * as $j_internal$002d521d3ae75e61be21a6f0408ca972d8f2d0ec7d00 from "./internal-521d3ae75e61be21a6f0408ca972d8f2d0ec7d00.js";
import * as $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e from "./internal-ae9a4288cef3d3827cff28fde9c5ba209927925e.js";
import * as $j_internal$002dc2b34c5dbdadf4c9b87002e426344362f7db1540 from "./internal-c2b34c5dbdadf4c9b87002e426344362f7db1540.js";
var $p;
/** @constructor */
function $c_Lgpu_painter_Form(vertexBuffer, vertexCount, topology, frontFace) {
  this.e8 = null;
  this.e9 = 0;
  this.e7 = null;
  this.e6 = null;
  this.e8 = vertexBuffer;
  this.e9 = vertexCount;
  this.e7 = topology;
  this.e6 = frontFace;
}
$p = $c_Lgpu_painter_Form.prototype = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$h_O();
$p.constructor = $c_Lgpu_painter_Form;
/** @constructor */
function $h_Lgpu_painter_Form() {
}
$h_Lgpu_painter_Form.prototype = $p;
var $d_Lgpu_painter_Form = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$TypeData().i($c_Lgpu_painter_Form, "gpu.painter.Form", ({
  c4: 1
}));
function $p_Lgpu_painter_Painter__createPipeline__Lgpu_painter_Shape__Lgpu_painter_PipelineKey__Lwebgpu_GPURenderPipeline($thiz, shape, key) {
  var shade = shape.bZ;
  var blendState = key.bx.hm();
  if ((blendState === (void 0))) {
    var s = key.bg;
    var target = ({
      "format": s
    });
  } else {
    var s$1 = key.bg;
    if ((blendState === (void 0))) {
      throw new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$c_ju_NoSuchElementException("undefined.get");
    }
    var target = ({
      "format": s$1,
      "blend": blendState
    });
  }
  if ((shade.db !== null)) {
    var _2 = shade.cD;
    var items$proxy3 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sr_ScalaRunTime$().d(new ($j_internal$002dc2b34c5dbdadf4c9b87002e426344362f7db1540.$d_sjs_js_Dynamic.r().C)([shade.db]));
    var _2$1 = [...$j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sjsr_Compat$().b(items$proxy3)];
    var vertexDescriptor = ({
      "module": _2,
      "entryPoint": "vs_main",
      "buffers": _2$1
    });
  } else {
    var _2$2 = shade.cD;
    var vertexDescriptor = ({
      "module": _2$2,
      "entryPoint": "vs_main"
    });
  }
  var $x_1 = $thiz.bf;
  var _2$3 = shade.ee;
  var _2$4 = shade.cD;
  var items$proxy4 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sr_ScalaRunTime$().d(new ($j_internal$002dc2b34c5dbdadf4c9b87002e426344362f7db1540.$d_sjs_js_Dynamic.r().C)([target]));
  var _2$5 = [...$j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sjsr_Compat$().b(items$proxy4)];
  var _2$6 = ({
    "module": _2$4,
    "entryPoint": "fs_main",
    "targets": _2$5
  });
  var s$2 = key.bA.bh;
  var s$3 = key.by.bW;
  var s$4 = key.bz.cB;
  var _2$7 = ({
    "topology": s$2,
    "cullMode": s$3,
    "frontFace": s$4
  });
  return $x_1.createRenderPipeline(({
    "layout": _2$3,
    "vertex": vertexDescriptor,
    "fragment": _2$6,
    "primitive": _2$7
  }));
}
function $p_Lgpu_painter_Painter__createBindGroup__Lgpu_painter_Shape__Lwebgpu_GPUBindGroup($thiz, shape) {
  var this$1 = shape.dc;
  var entries = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$f_sc_SeqOps__sortBy__F1__s_math_Ordering__O($m_sci_Seq$().dG(this$1), new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28(((_$1$2) => (_$1$2.S() | 0))), $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_s_math_Ordering$Int$()).P(new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28(((x$1$2) => {
    var idx = (x$1$2.S() | 0);
    var binding = x$1$2.a8();
    var _2 = binding.cz;
    var _2$1 = ({
      "buffer": _2
    });
    return ({
      "binding": idx,
      "resource": _2$1
    });
  })));
  var $x_1 = $thiz.bf;
  var _2$2 = shape.bZ.da;
  var _2$3 = [...$j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sjsr_Compat$().b(entries)];
  return $x_1.createBindGroup(({
    "layout": _2$2,
    "entries": _2$3
  }));
}
/** @constructor */
function $c_Lgpu_painter_Painter(device, queue, canvas, context, preferredFormat) {
  this.bf = null;
  this.d9 = null;
  this.ea = null;
  this.ec = null;
  this.eb = null;
  this.cC = 0;
  this.bf = device;
  this.d9 = queue;
  this.ea = context;
  this.ec = preferredFormat;
  this.eb = $m_scm_HashMap$().gL(new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$c_sjsr_WrappedVarArgs([]));
  this.cC = 0;
}
$p = $c_Lgpu_painter_Painter.prototype = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$h_O();
$p.constructor = $c_Lgpu_painter_Painter;
/** @constructor */
function $h_Lgpu_painter_Painter() {
}
$h_Lgpu_painter_Painter.prototype = $p;
$p.gy = (function(shape, clearColor) {
  var encoder = this.bf.createCommandEncoder();
  var textureView = this.ea.getCurrentTexture().createView();
  if ((!clearColor.n())) {
    matchResult5: {
      var \u03b44$;
      var x8 = clearColor.dI();
      if ((x8 !== null)) {
        var \u03b44$ = x8;
        break matchResult5;
      }
      throw new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$c_s_MatchError(x8);
    }
    var r = (+\u03b44$.bE);
    var g = (+\u03b44$.bF);
    var b = (+\u03b44$.bG);
    var a = (+\u03b44$.bH);
    var _2 = ({
      "r": r,
      "g": g,
      "b": b,
      "a": a
    });
    var colorAttachment = ({
      "view": textureView,
      "loadOp": "clear",
      "storeOp": "store",
      "clearValue": _2
    });
  } else {
    var colorAttachment = ({
      "view": textureView,
      "loadOp": "load",
      "storeOp": "store"
    });
  }
  var items$proxy1 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sr_ScalaRunTime$().bu(new ($j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$d_sjs_js_Object.r().C)([colorAttachment]));
  var _2$1 = [...$j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sjsr_Compat$().b(items$proxy1)];
  var pass = encoder.beginRenderPass(({
    "colorAttachments": _2$1
  }));
  var key = new $c_Lgpu_painter_PipelineKey(shape.bZ.ed, shape.ef, shape.eg, shape.bY.e7, shape.bY.e6, this.ec);
  var this$40 = this.eb;
  var f = (() => $p_Lgpu_painter_Painter__createPipeline__Lgpu_painter_Shape__Lgpu_painter_PipelineKey__Lwebgpu_GPURenderPipeline(this, shape, key));
  if ((!($j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$objectGetClass(this$40) === $d_scm_HashMap.l()))) {
    matchResult2: {
      var pipeline;
      var x12 = this$40.dH(key);
      if ((x12 instanceof $j_internal$002d521d3ae75e61be21a6f0408ca972d8f2d0ec7d00.$c_s_Some)) {
        var pipeline = x12.b0;
        break matchResult2;
      }
      if (($j_internal$002d521d3ae75e61be21a6f0408ca972d8f2d0ec7d00.$m_s_None$() === x12)) {
        var d = f();
        $p_scm_HashMap__put0__O__O__Z__s_Some(this$40, key, d, false);
        var pipeline = d;
        break matchResult2;
      }
      throw new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$c_s_MatchError(x12);
    }
  } else {
    var originalHash = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sr_Statics$().u(key);
    var hash = (originalHash ^ ((originalHash >>> 16) | 0));
    var idx = (hash & ((this$40.t.a.length - 1) | 0));
    matchResult13: {
      var nd$2;
      var x36 = this$40.t.a[idx];
      if ((x36 === null)) {
        var nd$2 = null;
        break matchResult13;
      }
      var nd$2 = x36.cZ(key, hash);
    }
    if ((nd$2 !== null)) {
      var pipeline = nd$2.au;
    } else {
      var table0 = this$40.t;
      var default$1 = f();
      if ((((1 + this$40.at) | 0) >= this$40.cb)) {
        $p_scm_HashMap__growTable__I__V(this$40, (this$40.t.a.length << 1));
      }
      $p_scm_HashMap__put0__O__O__Z__I__I__s_Some(this$40, key, default$1, false, hash, ((table0 === this$40.t) ? idx : (hash & ((this$40.t.a.length - 1) | 0))));
      var pipeline = default$1;
    }
  }
  pass.setPipeline(pipeline);
  if (((!shape.dc.n()) && (shape.bZ.da !== null))) {
    var bindGroup = $p_Lgpu_painter_Painter__createBindGroup__Lgpu_painter_Shape__Lwebgpu_GPUBindGroup(this, shape);
    pass.setBindGroup(0, bindGroup);
  }
  pass.setVertexBuffer(0, shape.bY.e8);
  pass.draw(shape.bY.e9);
  pass.end();
  var $x_1 = this.d9;
  var items$proxy2 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sr_ScalaRunTime$().d(new ($j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$d_Lwebgpu_GPUCommandBuffer.r().C)([encoder.finish()]));
  $x_1.submit([...$j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sjsr_Compat$().b(items$proxy2)]);
});
var $d_Lgpu_painter_Painter = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$TypeData().i($c_Lgpu_painter_Painter, "gpu.painter.Painter", ({
  c8: 1
}));
/** @constructor */
function $c_Lgpu_painter_Shade(id, shaderModule, vertexBufferLayout, valueBindGroupLayout, pipelineLayout, isLayer) {
  this.ed = 0;
  this.cD = null;
  this.db = null;
  this.da = null;
  this.ee = null;
  this.ed = id;
  this.cD = shaderModule;
  this.db = vertexBufferLayout;
  this.da = valueBindGroupLayout;
  this.ee = pipelineLayout;
}
$p = $c_Lgpu_painter_Shade.prototype = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$h_O();
$p.constructor = $c_Lgpu_painter_Shade;
/** @constructor */
function $h_Lgpu_painter_Shade() {
}
$h_Lgpu_painter_Shade.prototype = $p;
var $d_Lgpu_painter_Shade = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$TypeData().i($c_Lgpu_painter_Shade, "gpu.painter.Shade", ({
  cf: 1
}));
/** @constructor */
function $c_Lgpu_painter_Shape(form, shade, bindings, cullMode, blendMode) {
  this.bY = null;
  this.bZ = null;
  this.dc = null;
  this.eg = null;
  this.ef = null;
  this.bY = form;
  this.bZ = shade;
  this.dc = bindings;
  this.eg = cullMode;
  this.ef = blendMode;
}
$p = $c_Lgpu_painter_Shape.prototype = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$h_O();
$p.constructor = $c_Lgpu_painter_Shape;
/** @constructor */
function $h_Lgpu_painter_Shape() {
}
$h_Lgpu_painter_Shape.prototype = $p;
var $d_Lgpu_painter_Shape = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$TypeData().i($c_Lgpu_painter_Shape, "gpu.painter.Shape", ({
  cg: 1
}));
/** @constructor */
function $c_Lgpu_painter_init$package$() {
}
$p = $c_Lgpu_painter_init$package$.prototype = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$h_O();
$p.constructor = $c_Lgpu_painter_init$package$;
/** @constructor */
function $h_Lgpu_painter_init$package$() {
}
$h_Lgpu_painter_init$package$.prototype = $p;
$p.gS = (function(canvas, init) {
  var gpuOpt = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_Lwebgpu_WebGPU$().dK();
  if ((gpuOpt === (void 0))) {
    return Promise.reject(new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$c_sjs_js_JavaScriptException(Error("WebGPU is not supported")));
  } else {
    var promise$proxy1 = gpuOpt.requestAdapter();
    var promise$proxy3 = promise$proxy1.then(((value$2) => {
      if ((value$2 === null)) {
        throw new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$c_ju_NoSuchElementException("Failed to get WebGPU adapter");
      } else {
        return value$2;
      }
    }));
    var f$proxy2 = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28(((adapter$2) => {
      var promise$proxy2 = adapter$2.requestDevice();
      var f$proxy1 = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28(((device$3) => {
        var queue = device$3.queue;
        var context = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_Lwebgpu_WebGPU$().dJ(canvas);
        var format = gpuOpt.getPreferredCanvasFormat();
        context.configure(({
          "device": device$3,
          "format": format
        }));
        var painter = new $c_Lgpu_painter_Painter(device$3, queue, canvas, context, format);
        var observer = new ResizeObserver(((entries$3) => {
          var entry = entries$3[0];
          var w = (entry.contentRect.width | 0);
          var h = (entry.contentRect.height | 0);
          if (((w > 0) && (h > 0))) {
            canvas.width = w;
            canvas.height = h;
          }
        }));
        observer.observe(canvas);
        var w$1 = (canvas.clientWidth | 0);
        var h$1 = (canvas.clientHeight | 0);
        canvas.width = w$1;
        canvas.height = h$1;
        init.l(painter);
      }));
      return promise$proxy2.then($j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sjs_js_Any$().bQ(f$proxy1));
    }));
    return promise$proxy3.then($j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sjs_js_Any$().bQ(f$proxy2));
  }
});
var $d_Lgpu_painter_init$package$ = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$TypeData().i($c_Lgpu_painter_init$package$, "gpu.painter.init$package$", ({
  ch: 1
}));
var $n_Lgpu_painter_init$package$;
function $m_Lgpu_painter_init$package$() {
  if ((!$n_Lgpu_painter_init$package$)) {
    $n_Lgpu_painter_init$package$ = new $c_Lgpu_painter_init$package$();
  }
  return $n_Lgpu_painter_init$package$;
}
/** @constructor */
function $c_Lpainter\uff3ftriangle_PainterTriangle$package$() {
}
$p = $c_Lpainter\uff3ftriangle_PainterTriangle$package$.prototype = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$h_O();
$p.constructor = $c_Lpainter\uff3ftriangle_PainterTriangle$package$;
/** @constructor */
function $h_Lpainter\uff3ftriangle_PainterTriangle$package$() {
}
$h_Lpainter\uff3ftriangle_PainterTriangle$package$.prototype = $p;
$p.ct = (function() {
  $m_Lgpu_painter_init$package$().gS(document.getElementById("canvas"), new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28(((statusEl) => ((painter$3) => {
    var vertBody$proxy1 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sc_StringOps$().bV("\n        |  out.position = vec4<f32>(in.position, 0.0, 1.0);\n        |  out.color = in.color;\n        ", 124);
    var fragBody$proxy1 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sc_StringOps$().bV("\n        |  out.color = vec4<f32>(in.color, 1.0);\n        ", 124);
    var id = painter$3.cC;
    painter$3.cC = ((1 + painter$3.cC) | 0);
    var sd = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$c_Lgpu_shader_ShaderDef(vertBody$proxy1, fragBody$proxy1);
    var $x_29 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_Lgpu_shader_derive$();
    var $x_28 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sjs_js_ArrayOpsCommon$();
    var items$proxy1 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sr_ScalaRunTime$().d(new ($j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$d_T.r().C)(["position"]));
    var $x_27 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sjsr_Compat$().b(items$proxy1);
    var $x_26 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sjs_js_ArrayOpsCommon$();
    var items$proxy2 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sr_ScalaRunTime$().d(new ($j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$d_T.r().C)(["color"]));
    var $x_25 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sjsr_Compat$().b(items$proxy2);
    var items$proxy3 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sr_ScalaRunTime$().d(new ($j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$d_T.r().C)([]));
    var $x_24 = $x_28.q([...$x_27], $x_26.q([...$x_25], [...$j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sjsr_Compat$().b(items$proxy3)]));
    var $x_23 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sjs_js_ArrayOpsCommon$();
    var items$proxy4 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sr_ScalaRunTime$().d(new ($j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$d_T.r().C)(["vec2<f32>"]));
    var $x_22 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sjsr_Compat$().b(items$proxy4);
    var $x_21 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sjs_js_ArrayOpsCommon$();
    var items$proxy5 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sr_ScalaRunTime$().d(new ($j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$d_T.r().C)(["vec3<f32>"]));
    var $x_20 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sjsr_Compat$().b(items$proxy5);
    var items$proxy6 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sr_ScalaRunTime$().d(new ($j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$d_T.r().C)([]));
    var $x_19 = $x_23.q([...$x_22], $x_21.q([...$x_20], [...$j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sjsr_Compat$().b(items$proxy6)]));
    var items$proxy7 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sr_ScalaRunTime$().d(new ($j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$d_T3.r().C)([]));
    var $x_18 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$p_Lgpu_shader_derive$__generateCombinedStructFromLists__T__sjs_js_Array__sjs_js_Array__sjs_js_Array__T($x_29, "VertexInput", $x_24, $x_19, [...$j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sjsr_Compat$().b(items$proxy7)]);
    var $x_17 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_Lgpu_shader_derive$();
    var $x_16 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sjs_js_ArrayOpsCommon$();
    var items$proxy8 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sr_ScalaRunTime$().d(new ($j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$d_T.r().C)(["color"]));
    var $x_15 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sjsr_Compat$().b(items$proxy8);
    var items$proxy9 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sr_ScalaRunTime$().d(new ($j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$d_T.r().C)([]));
    var $x_14 = $x_16.q([...$x_15], [...$j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sjsr_Compat$().b(items$proxy9)]);
    var $x_13 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sjs_js_ArrayOpsCommon$();
    var items$proxy10 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sr_ScalaRunTime$().d(new ($j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$d_T.r().C)(["vec3<f32>"]));
    var $x_12 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sjsr_Compat$().b(items$proxy10);
    var items$proxy11 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sr_ScalaRunTime$().d(new ($j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$d_T.r().C)([]));
    var $x_11 = $x_13.q([...$x_12], [...$j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sjsr_Compat$().b(items$proxy11)]);
    var $x_10 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sjs_js_ArrayOpsCommon$();
    var items$proxy12 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sr_ScalaRunTime$().d(new ($j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$d_T3.r().C)([new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$c_T3("position", "position", "vec4<f32>")]));
    var $x_9 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sjsr_Compat$().b(items$proxy12);
    var items$proxy13 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sr_ScalaRunTime$().d(new ($j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$d_T3.r().C)([]));
    var $x_8 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$p_Lgpu_shader_derive$__generateCombinedStructFromLists__T__sjs_js_Array__sjs_js_Array__sjs_js_Array__T($x_17, "VertexOutput", $x_14, $x_11, $x_10.q([...$x_9], [...$j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sjsr_Compat$().b(items$proxy13)]));
    var $x_7 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_Lgpu_shader_derive$();
    var $x_6 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sjs_js_ArrayOpsCommon$();
    var items$proxy14 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sr_ScalaRunTime$().d(new ($j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$d_T.r().C)(["color"]));
    var $x_5 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sjsr_Compat$().b(items$proxy14);
    var items$proxy15 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sr_ScalaRunTime$().d(new ($j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$d_T.r().C)([]));
    var $x_4 = $x_6.q([...$x_5], [...$j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sjsr_Compat$().b(items$proxy15)]);
    var $x_3 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sjs_js_ArrayOpsCommon$();
    var items$proxy16 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sr_ScalaRunTime$().d(new ($j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$d_T.r().C)(["vec4<f32>"]));
    var $x_2 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sjsr_Compat$().b(items$proxy16);
    var items$proxy17 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sr_ScalaRunTime$().d(new ($j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$d_T.r().C)([]));
    var $x_1 = $x_3.q([...$x_2], [...$j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sjsr_Compat$().b(items$proxy17)]);
    var items$proxy18 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sr_ScalaRunTime$().d(new ($j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$d_T3.r().C)([]));
    var wgsl = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$p_Lgpu_shader_ShaderDef__buildWGSL__T__T__T__T__T__T__T(sd, $x_18, $x_8, $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$p_Lgpu_shader_derive$__generateCombinedStructFromLists__T__sjs_js_Array__sjs_js_Array__sjs_js_Array__T($x_7, "FragmentOutput", $x_4, $x_1, [...$j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sjsr_Compat$().b(items$proxy18)]), "", sd.bj, sd.bi);
    var $x_41 = painter$3.bf.createShaderModule(({
      "code": wgsl
    }));
    var $x_35 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sjs_js_ArrayOpsCommon$();
    var items$proxy19 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sr_ScalaRunTime$().d(new ($j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$d_T.r().C)(["float32x2"]));
    var $x_34 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sjsr_Compat$().b(items$proxy19);
    var $x_33 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sjs_js_ArrayOpsCommon$();
    var items$proxy20 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sr_ScalaRunTime$().d(new ($j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$d_T.r().C)(["float32x3"]));
    var $x_32 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sjsr_Compat$().b(items$proxy20);
    var items$proxy21 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sr_ScalaRunTime$().d(new ($j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$d_T.r().C)([]));
    var formats = $x_35.q([...$x_34], $x_33.q([...$x_32], [...$j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sjsr_Compat$().b(items$proxy21)]));
    var $x_39 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sjs_js_ArrayOpsCommon$();
    var items$proxy22 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sr_ScalaRunTime$().bw(new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$ac_I(new Int32Array([8])));
    var $x_38 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sjsr_Compat$().b(items$proxy22);
    var $x_37 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sjs_js_ArrayOpsCommon$();
    var items$proxy23 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sr_ScalaRunTime$().bw(new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$ac_I(new Int32Array([12])));
    var $x_36 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sjsr_Compat$().b(items$proxy23);
    var items$proxy24 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sr_ScalaRunTime$().bw(new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$ac_I(new Int32Array([])));
    var sizes = $x_39.q([...$x_38], $x_37.q([...$x_36], [...$j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sjsr_Compat$().b(items$proxy24)]));
    var offsets = $j_internal$002dc2b34c5dbdadf4c9b87002e426344362f7db1540.$p_Lgpu_shader_layouts$__calculateOffsets__sjs_js_Array__sjs_js_Array($j_internal$002dc2b34c5dbdadf4c9b87002e426344362f7db1540.$m_Lgpu_shader_layouts$(), sizes);
    var stride = $j_internal$002dc2b34c5dbdadf4c9b87002e426344362f7db1540.$p_Lgpu_shader_layouts$__calculateStride__sjs_js_Array__I($j_internal$002dc2b34c5dbdadf4c9b87002e426344362f7db1540.$m_Lgpu_shader_layouts$(), sizes);
    var items$proxy25 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sr_ScalaRunTime$().d(new ($j_internal$002dc2b34c5dbdadf4c9b87002e426344362f7db1540.$d_sjs_js_Dynamic.r().C)([]));
    var attributes = [...$j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sjsr_Compat$().b(items$proxy25)];
    var end = (formats.length | 0);
    var isEmpty = (end <= 0);
    var scala$collection$immutable$Range$$lastElement = ((end - 1) | 0);
    if ((!isEmpty)) {
      var i = 0;
      while (true) {
        var x0 = i;
        var value = (offsets[x0] | 0);
        var s = formats[x0];
        var $x_40 = attributes.push(({
          "shaderLocation": x0,
          "offset": value,
          "format": s
        }));
        if ((i === scala$collection$immutable$Range$$lastElement)) {
          break;
        }
        i = ((1 + i) | 0);
      }
    }
    var $x_31 = $j_internal$002dc2b34c5dbdadf4c9b87002e426344362f7db1540.$m_Lgpu_shader_layouts$();
    var $x_30 = painter$3.bf;
    var items$proxy26 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sr_ScalaRunTime$().d(new ($j_internal$002dc2b34c5dbdadf4c9b87002e426344362f7db1540.$d_Lwebgpu_GPUBindGroupLayout.r().C)([]));
    var shade = new $c_Lgpu_painter_Shade(id, $x_41, ({
      "arrayStride": stride,
      "attributes": attributes
    }), null, $x_31.fd($x_30, [...$j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sjsr_Compat$().b(items$proxy26)]), false);
    $j_internal$002dc2b34c5dbdadf4c9b87002e426344362f7db1540.$m_Lgpu_buffers_AttribLayoutHelper$().ft();
    var buffer = new ArrayBuffer(60);
    var _1 = new DataView(buffer);
    var value$proxy1 = $j_internal$002dc2b34c5dbdadf4c9b87002e426344362f7db1540.$m_Lgpu_math_package$package$().z().w(0.0);
    _1.setFloat32(0, value$proxy1, true);
    var value$proxy2 = $j_internal$002dc2b34c5dbdadf4c9b87002e426344362f7db1540.$m_Lgpu_math_package$package$().z().w(0.5);
    _1.setFloat32(4, value$proxy2, true);
    var value$proxy3 = $j_internal$002dc2b34c5dbdadf4c9b87002e426344362f7db1540.$m_Lgpu_math_package$package$().z().w(1.0);
    _1.setFloat32(8, value$proxy3, true);
    var value$proxy4 = $j_internal$002dc2b34c5dbdadf4c9b87002e426344362f7db1540.$m_Lgpu_math_package$package$().z().w(0.0);
    _1.setFloat32(12, value$proxy4, true);
    var value$proxy5 = $j_internal$002dc2b34c5dbdadf4c9b87002e426344362f7db1540.$m_Lgpu_math_package$package$().z().w(0.0);
    _1.setFloat32(16, value$proxy5, true);
    var value$proxy6 = $j_internal$002dc2b34c5dbdadf4c9b87002e426344362f7db1540.$m_Lgpu_math_package$package$().z().w((-0.5));
    _1.setFloat32(20, value$proxy6, true);
    var value$proxy7 = $j_internal$002dc2b34c5dbdadf4c9b87002e426344362f7db1540.$m_Lgpu_math_package$package$().z().w((-0.5));
    _1.setFloat32(24, value$proxy7, true);
    var value$proxy8 = $j_internal$002dc2b34c5dbdadf4c9b87002e426344362f7db1540.$m_Lgpu_math_package$package$().z().w(0.0);
    _1.setFloat32(28, value$proxy8, true);
    var value$proxy9 = $j_internal$002dc2b34c5dbdadf4c9b87002e426344362f7db1540.$m_Lgpu_math_package$package$().z().w(1.0);
    _1.setFloat32(32, value$proxy9, true);
    var value$proxy10 = $j_internal$002dc2b34c5dbdadf4c9b87002e426344362f7db1540.$m_Lgpu_math_package$package$().z().w(0.0);
    _1.setFloat32(36, value$proxy10, true);
    var value$proxy11 = $j_internal$002dc2b34c5dbdadf4c9b87002e426344362f7db1540.$m_Lgpu_math_package$package$().z().w(0.5);
    _1.setFloat32(40, value$proxy11, true);
    var value$proxy12 = $j_internal$002dc2b34c5dbdadf4c9b87002e426344362f7db1540.$m_Lgpu_math_package$package$().z().w((-0.5));
    _1.setFloat32(44, value$proxy12, true);
    var value$proxy13 = $j_internal$002dc2b34c5dbdadf4c9b87002e426344362f7db1540.$m_Lgpu_math_package$package$().z().w(0.0);
    _1.setFloat32(48, value$proxy13, true);
    var value$proxy14 = $j_internal$002dc2b34c5dbdadf4c9b87002e426344362f7db1540.$m_Lgpu_math_package$package$().z().w(0.0);
    _1.setFloat32(52, value$proxy14, true);
    var value$proxy15 = $j_internal$002dc2b34c5dbdadf4c9b87002e426344362f7db1540.$m_Lgpu_math_package$package$().z().w(1.0);
    _1.setFloat32(56, value$proxy15, true);
    var topology = $s_Lgpu_painter_PrimitiveTopology$__TriangleList__Lgpu_painter_PrimitiveTopology();
    var frontFace = $s_Lgpu_painter_FrontFace$__CCW__Lgpu_painter_FrontFace();
    var $x_42 = painter$3.bf;
    var value$1 = (_1.buffer.byteLength | 0);
    var buffer$1 = $x_42.createBuffer(({
      "size": value$1,
      "usage": 40
    }));
    painter$3.d9.writeBuffer(buffer$1, 0.0, _1.buffer);
    var form = new $c_Lgpu_painter_Form(buffer$1, 3, topology, frontFace);
    var shape = new $c_Lgpu_painter_Shape(form, shade, $m_sci_Map$EmptyMap$(), $s_Lgpu_painter_CullMode$__None__Lgpu_painter_CullMode(), $s_Lgpu_painter_BlendMode$__Replace__Lgpu_painter_BlendMode());
    painter$3.gy(shape, new $j_internal$002d521d3ae75e61be21a6f0408ca972d8f2d0ec7d00.$c_s_Some(new $c_T4(0.1, 0.1, 0.1, 1.0)));
    statusEl.textContent = "Painter triangle rendered!";
    statusEl.setAttribute("class", "success");
  }))(document.getElementById("status"))));
});
var $d_Lpainter\uff3ftriangle_PainterTriangle$package$ = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$TypeData().i($c_Lpainter\uff3ftriangle_PainterTriangle$package$, "painter_triangle.PainterTriangle$package$", ({
  cT: 1
}));
var $n_Lpainter\uff3ftriangle_PainterTriangle$package$;
function $m_Lpainter\uff3ftriangle_PainterTriangle$package$() {
  if ((!$n_Lpainter\uff3ftriangle_PainterTriangle$package$)) {
    $n_Lpainter\uff3ftriangle_PainterTriangle$package$ = new $c_Lpainter\uff3ftriangle_PainterTriangle$package$();
  }
  return $n_Lpainter\uff3ftriangle_PainterTriangle$package$;
}
/** @constructor */
function $c_scm_HashMap$Node(_key, _hash, _value, _next) {
  this.br = null;
  this.aW = 0;
  this.au = null;
  this.L = null;
  this.br = _key;
  this.aW = _hash;
  this.au = _value;
  this.L = _next;
}
$p = $c_scm_HashMap$Node.prototype = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$h_O();
$p.constructor = $c_scm_HashMap$Node;
/** @constructor */
function $h_scm_HashMap$Node() {
}
$h_scm_HashMap$Node.prototype = $p;
$p.cZ = (function(k, h) {
  var \u03b4this$tailLocal1 = this;
  while (true) {
    if (((h === \u03b4this$tailLocal1.aW) && $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sr_BoxesRunTime$().O(k, \u03b4this$tailLocal1.br))) {
      return \u03b4this$tailLocal1;
    } else if (((\u03b4this$tailLocal1.L === null) || (\u03b4this$tailLocal1.aW > h))) {
      return null;
    } else {
      \u03b4this$tailLocal1 = \u03b4this$tailLocal1.L;
    }
  }
});
$p.cs = (function(f) {
  var \u03b4this$tailLocal3 = this;
  while (true) {
    f.aF(\u03b4this$tailLocal3.br, \u03b4this$tailLocal3.au);
    if ((\u03b4this$tailLocal3.L !== null)) {
      \u03b4this$tailLocal3 = \u03b4this$tailLocal3.L;
    } else {
      return (void 0);
    }
  }
});
$p.m = (function() {
  return ((((((("Node(" + this.br) + ", ") + this.au) + ", ") + this.aW) + ") -> ") + this.L);
});
var $d_scm_HashMap$Node = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$TypeData().i($c_scm_HashMap$Node, "scala.collection.mutable.HashMap$Node", ({
  e7: 1
}));
/** @constructor */
function $c_sr_AbstractFunction3() {
}
$p = $c_sr_AbstractFunction3.prototype = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$h_O();
$p.constructor = $c_sr_AbstractFunction3;
/** @constructor */
function $h_sr_AbstractFunction3() {
}
$h_sr_AbstractFunction3.prototype = $p;
$p.m = (function() {
  return "<function3>";
});
function $s_Lgpu_painter_BlendMode$__Replace__Lgpu_painter_BlendMode() {
  $m_Lgpu_painter_BlendMode$();
  return $t_Lgpu_painter_BlendMode$__Replace;
}
function $s_Lgpu_painter_BlendMode$__Alpha__Lgpu_painter_BlendMode() {
  $m_Lgpu_painter_BlendMode$();
  return $t_Lgpu_painter_BlendMode$__Alpha;
}
function $s_Lgpu_painter_BlendMode$__Additive__Lgpu_painter_BlendMode() {
  $m_Lgpu_painter_BlendMode$();
  return $t_Lgpu_painter_BlendMode$__Additive;
}
function $s_Lgpu_painter_BlendMode$__Multiply__Lgpu_painter_BlendMode() {
  $m_Lgpu_painter_BlendMode$();
  return $t_Lgpu_painter_BlendMode$__Multiply;
}
/** @constructor */
function $c_Lgpu_painter_BlendMode$() {
  $n_Lgpu_painter_BlendMode$ = this;
  $t_Lgpu_painter_BlendMode$__Replace = new $c_Lgpu_painter_BlendMode$$anon$11("Replace", 0);
  $t_Lgpu_painter_BlendMode$__Alpha = new $c_Lgpu_painter_BlendMode$$anon$11("Alpha", 1);
  $t_Lgpu_painter_BlendMode$__Additive = new $c_Lgpu_painter_BlendMode$$anon$11("Additive", 2);
  $t_Lgpu_painter_BlendMode$__Multiply = new $c_Lgpu_painter_BlendMode$$anon$11("Multiply", 3);
  $s_Lgpu_painter_BlendMode$__Replace__Lgpu_painter_BlendMode();
  $s_Lgpu_painter_BlendMode$__Alpha__Lgpu_painter_BlendMode();
  $s_Lgpu_painter_BlendMode$__Additive__Lgpu_painter_BlendMode();
  $s_Lgpu_painter_BlendMode$__Multiply__Lgpu_painter_BlendMode();
}
$p = $c_Lgpu_painter_BlendMode$.prototype = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$h_O();
$p.constructor = $c_Lgpu_painter_BlendMode$;
/** @constructor */
function $h_Lgpu_painter_BlendMode$() {
}
$h_Lgpu_painter_BlendMode$.prototype = $p;
var $d_Lgpu_painter_BlendMode$ = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$TypeData().i($c_Lgpu_painter_BlendMode$, "gpu.painter.BlendMode$", ({
  bY: 1,
  B: 1,
  ar: 1
}));
var $n_Lgpu_painter_BlendMode$;
function $m_Lgpu_painter_BlendMode$() {
  if ((!$n_Lgpu_painter_BlendMode$)) {
    $n_Lgpu_painter_BlendMode$ = new $c_Lgpu_painter_BlendMode$();
  }
  return $n_Lgpu_painter_BlendMode$;
}
function $s_Lgpu_painter_CullMode$__None__Lgpu_painter_CullMode() {
  $m_Lgpu_painter_CullMode$();
  return $t_Lgpu_painter_CullMode$__None;
}
function $s_Lgpu_painter_CullMode$__Front__Lgpu_painter_CullMode() {
  $m_Lgpu_painter_CullMode$();
  return $t_Lgpu_painter_CullMode$__Front;
}
function $s_Lgpu_painter_CullMode$__Back__Lgpu_painter_CullMode() {
  $m_Lgpu_painter_CullMode$();
  return $t_Lgpu_painter_CullMode$__Back;
}
/** @constructor */
function $c_Lgpu_painter_CullMode$() {
  $n_Lgpu_painter_CullMode$ = this;
  $t_Lgpu_painter_CullMode$__None = new $c_Lgpu_painter_CullMode$$anon$6();
  $t_Lgpu_painter_CullMode$__Front = new $c_Lgpu_painter_CullMode$$anon$7();
  $t_Lgpu_painter_CullMode$__Back = new $c_Lgpu_painter_CullMode$$anon$8();
  $s_Lgpu_painter_CullMode$__None__Lgpu_painter_CullMode();
  $s_Lgpu_painter_CullMode$__Front__Lgpu_painter_CullMode();
  $s_Lgpu_painter_CullMode$__Back__Lgpu_painter_CullMode();
}
$p = $c_Lgpu_painter_CullMode$.prototype = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$h_O();
$p.constructor = $c_Lgpu_painter_CullMode$;
/** @constructor */
function $h_Lgpu_painter_CullMode$() {
}
$h_Lgpu_painter_CullMode$.prototype = $p;
var $d_Lgpu_painter_CullMode$ = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$TypeData().i($c_Lgpu_painter_CullMode$, "gpu.painter.CullMode$", ({
  c0: 1,
  B: 1,
  ar: 1
}));
var $n_Lgpu_painter_CullMode$;
function $m_Lgpu_painter_CullMode$() {
  if ((!$n_Lgpu_painter_CullMode$)) {
    $n_Lgpu_painter_CullMode$ = new $c_Lgpu_painter_CullMode$();
  }
  return $n_Lgpu_painter_CullMode$;
}
function $s_Lgpu_painter_FrontFace$__CCW__Lgpu_painter_FrontFace() {
  $m_Lgpu_painter_FrontFace$();
  return $t_Lgpu_painter_FrontFace$__CCW;
}
function $s_Lgpu_painter_FrontFace$__CW__Lgpu_painter_FrontFace() {
  $m_Lgpu_painter_FrontFace$();
  return $t_Lgpu_painter_FrontFace$__CW;
}
/** @constructor */
function $c_Lgpu_painter_FrontFace$() {
  $n_Lgpu_painter_FrontFace$ = this;
  $t_Lgpu_painter_FrontFace$__CCW = new $c_Lgpu_painter_FrontFace$$anon$9();
  $t_Lgpu_painter_FrontFace$__CW = new $c_Lgpu_painter_FrontFace$$anon$10();
  $s_Lgpu_painter_FrontFace$__CCW__Lgpu_painter_FrontFace();
  $s_Lgpu_painter_FrontFace$__CW__Lgpu_painter_FrontFace();
}
$p = $c_Lgpu_painter_FrontFace$.prototype = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$h_O();
$p.constructor = $c_Lgpu_painter_FrontFace$;
/** @constructor */
function $h_Lgpu_painter_FrontFace$() {
}
$h_Lgpu_painter_FrontFace$.prototype = $p;
var $d_Lgpu_painter_FrontFace$ = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$TypeData().i($c_Lgpu_painter_FrontFace$, "gpu.painter.FrontFace$", ({
  c5: 1,
  B: 1,
  ar: 1
}));
var $n_Lgpu_painter_FrontFace$;
function $m_Lgpu_painter_FrontFace$() {
  if ((!$n_Lgpu_painter_FrontFace$)) {
    $n_Lgpu_painter_FrontFace$ = new $c_Lgpu_painter_FrontFace$();
  }
  return $n_Lgpu_painter_FrontFace$;
}
function $s_Lgpu_painter_PrimitiveTopology$__TriangleList__Lgpu_painter_PrimitiveTopology() {
  $m_Lgpu_painter_PrimitiveTopology$();
  return $t_Lgpu_painter_PrimitiveTopology$__TriangleList;
}
function $s_Lgpu_painter_PrimitiveTopology$__TriangleStrip__Lgpu_painter_PrimitiveTopology() {
  $m_Lgpu_painter_PrimitiveTopology$();
  return $t_Lgpu_painter_PrimitiveTopology$__TriangleStrip;
}
function $s_Lgpu_painter_PrimitiveTopology$__LineList__Lgpu_painter_PrimitiveTopology() {
  $m_Lgpu_painter_PrimitiveTopology$();
  return $t_Lgpu_painter_PrimitiveTopology$__LineList;
}
function $s_Lgpu_painter_PrimitiveTopology$__LineStrip__Lgpu_painter_PrimitiveTopology() {
  $m_Lgpu_painter_PrimitiveTopology$();
  return $t_Lgpu_painter_PrimitiveTopology$__LineStrip;
}
function $s_Lgpu_painter_PrimitiveTopology$__PointList__Lgpu_painter_PrimitiveTopology() {
  $m_Lgpu_painter_PrimitiveTopology$();
  return $t_Lgpu_painter_PrimitiveTopology$__PointList;
}
/** @constructor */
function $c_Lgpu_painter_PrimitiveTopology$() {
  $n_Lgpu_painter_PrimitiveTopology$ = this;
  $t_Lgpu_painter_PrimitiveTopology$__TriangleList = new $c_Lgpu_painter_PrimitiveTopology$$anon$1();
  $t_Lgpu_painter_PrimitiveTopology$__TriangleStrip = new $c_Lgpu_painter_PrimitiveTopology$$anon$2();
  $t_Lgpu_painter_PrimitiveTopology$__LineList = new $c_Lgpu_painter_PrimitiveTopology$$anon$3();
  $t_Lgpu_painter_PrimitiveTopology$__LineStrip = new $c_Lgpu_painter_PrimitiveTopology$$anon$4();
  $t_Lgpu_painter_PrimitiveTopology$__PointList = new $c_Lgpu_painter_PrimitiveTopology$$anon$5();
  $s_Lgpu_painter_PrimitiveTopology$__TriangleList__Lgpu_painter_PrimitiveTopology();
  $s_Lgpu_painter_PrimitiveTopology$__TriangleStrip__Lgpu_painter_PrimitiveTopology();
  $s_Lgpu_painter_PrimitiveTopology$__LineList__Lgpu_painter_PrimitiveTopology();
  $s_Lgpu_painter_PrimitiveTopology$__LineStrip__Lgpu_painter_PrimitiveTopology();
  $s_Lgpu_painter_PrimitiveTopology$__PointList__Lgpu_painter_PrimitiveTopology();
}
$p = $c_Lgpu_painter_PrimitiveTopology$.prototype = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$h_O();
$p.constructor = $c_Lgpu_painter_PrimitiveTopology$;
/** @constructor */
function $h_Lgpu_painter_PrimitiveTopology$() {
}
$h_Lgpu_painter_PrimitiveTopology$.prototype = $p;
var $d_Lgpu_painter_PrimitiveTopology$ = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$TypeData().i($c_Lgpu_painter_PrimitiveTopology$, "gpu.painter.PrimitiveTopology$", ({
  c9: 1,
  B: 1,
  ar: 1
}));
var $n_Lgpu_painter_PrimitiveTopology$;
function $m_Lgpu_painter_PrimitiveTopology$() {
  if ((!$n_Lgpu_painter_PrimitiveTopology$)) {
    $n_Lgpu_painter_PrimitiveTopology$ = new $c_Lgpu_painter_PrimitiveTopology$();
  }
  return $n_Lgpu_painter_PrimitiveTopology$;
}
function $f_s_Product4__productElement__I__O($thiz, n) {
  switch (n) {
    case 0: {
      return $thiz.bE;
      break;
    }
    case 1: {
      return $thiz.bF;
      break;
    }
    case 2: {
      return $thiz.bG;
      break;
    }
    case 3: {
      return $thiz.bH;
      break;
    }
    default: {
      throw $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$ct_jl_IndexOutOfBoundsException__T__(new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$c_jl_IndexOutOfBoundsException(), (n + " is out of bounds (min 0, max 3)"));
    }
  }
}
function $ct_sc_IterableFactory$Delegate__sc_IterableFactory__($thiz, delegate) {
  $thiz.c2 = delegate;
  return $thiz;
}
/** @constructor */
function $c_sc_IterableFactory$Delegate() {
  this.c2 = null;
}
$p = $c_sc_IterableFactory$Delegate.prototype = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$h_O();
$p.constructor = $c_sc_IterableFactory$Delegate;
/** @constructor */
function $h_sc_IterableFactory$Delegate() {
}
$h_sc_IterableFactory$Delegate.prototype = $p;
$p.a1 = (function(it) {
  return this.c2.a1(it);
});
$p.W = (function() {
  return this.c2.W();
});
function $ct_sc_MapFactory$Delegate__sc_MapFactory__($thiz, delegate) {
  $thiz.ew = delegate;
  return $thiz;
}
/** @constructor */
function $c_sc_MapFactory$Delegate() {
  this.ew = null;
}
$p = $c_sc_MapFactory$Delegate.prototype = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$h_O();
$p.constructor = $c_sc_MapFactory$Delegate;
/** @constructor */
function $h_sc_MapFactory$Delegate() {
}
$h_sc_MapFactory$Delegate.prototype = $p;
/** @constructor */
function $c_sci_Map$() {
}
$p = $c_sci_Map$.prototype = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$h_O();
$p.constructor = $c_sci_Map$;
/** @constructor */
function $h_sci_Map$() {
}
$h_sci_Map$.prototype = $p;
var $d_sci_Map$ = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$TypeData().i($c_sci_Map$, "scala.collection.immutable.Map$", ({
  dK: 1,
  a: 1,
  ax: 1
}));
var $n_sci_Map$;
function $m_sci_Map$() {
  if ((!$n_sci_Map$)) {
    $n_sci_Map$ = new $c_sci_Map$();
  }
  return $n_sci_Map$;
}
function $f_scm_Builder__sizeHint__sc_IterableOnce__I__V($thiz, coll, delta) {
  var x1 = coll.o();
  if ((x1 === (-1))) {
    return (void 0);
  }
  var that = ((x1 + delta) | 0);
  $thiz.ag(((that < 0) ? 0 : that));
}
/** @constructor */
function $c_scm_HashMap$() {
}
$p = $c_scm_HashMap$.prototype = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$h_O();
$p.constructor = $c_scm_HashMap$;
/** @constructor */
function $h_scm_HashMap$() {
}
$h_scm_HashMap$.prototype = $p;
$p.gL = (function(it) {
  var k = it.o();
  return new $c_scm_HashMap(((k > 0) ? $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$doubleToInt((((1 + k) | 0) / 0.75)) : 16), 0.75).f2(it);
});
var $d_scm_HashMap$ = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$TypeData().i($c_scm_HashMap$, "scala.collection.mutable.HashMap$", ({
  e3: 1,
  a: 1,
  ax: 1
}));
var $n_scm_HashMap$;
function $m_scm_HashMap$() {
  if ((!$n_scm_HashMap$)) {
    $n_scm_HashMap$ = new $c_scm_HashMap$();
  }
  return $n_scm_HashMap$;
}
/** @constructor */
function $c_sr_AbstractFunction3_$$Lambda$26e0a25d9b29f6b82ea50ab7badf4fb70c5c74e1(f) {
  this.g5 = null;
  this.g5 = f;
}
$p = $c_sr_AbstractFunction3_$$Lambda$26e0a25d9b29f6b82ea50ab7badf4fb70c5c74e1.prototype = new $h_sr_AbstractFunction3();
$p.constructor = $c_sr_AbstractFunction3_$$Lambda$26e0a25d9b29f6b82ea50ab7badf4fb70c5c74e1;
/** @constructor */
function $h_sr_AbstractFunction3_$$Lambda$26e0a25d9b29f6b82ea50ab7badf4fb70c5c74e1() {
}
$h_sr_AbstractFunction3_$$Lambda$26e0a25d9b29f6b82ea50ab7badf4fb70c5c74e1.prototype = $p;
var $d_sr_AbstractFunction3_$$Lambda$26e0a25d9b29f6b82ea50ab7badf4fb70c5c74e1 = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$TypeData().i($c_sr_AbstractFunction3_$$Lambda$26e0a25d9b29f6b82ea50ab7badf4fb70c5c74e1, "scala.runtime.AbstractFunction3.$$Lambda$26e0a25d9b29f6b82ea50ab7badf4fb70c5c74e1", ({
  f3: 1,
  f2: 1,
  cW: 1
}));
/** @constructor */
function $c_Lgpu_painter_PipelineKey(shadeId, blendMode, cullMode, topology, frontFace, targetFormat) {
  this.bX = 0;
  this.bx = null;
  this.by = null;
  this.bA = null;
  this.bz = null;
  this.bg = null;
  this.bX = shadeId;
  this.bx = blendMode;
  this.by = cullMode;
  this.bA = topology;
  this.bz = frontFace;
  this.bg = targetFormat;
}
$p = $c_Lgpu_painter_PipelineKey.prototype = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$h_O();
$p.constructor = $c_Lgpu_painter_PipelineKey;
/** @constructor */
function $h_Lgpu_painter_PipelineKey() {
}
$h_Lgpu_painter_PipelineKey.prototype = $p;
$p.am = (function() {
  return new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$c_s_Product$$anon$1(this);
});
$p.j = (function() {
  var acc = (-889275714);
  acc = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sr_Statics$().p(acc, (-1645639619));
  acc = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sr_Statics$().p(acc, this.bX);
  acc = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sr_Statics$().p(acc, $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sr_Statics$().u(this.bx));
  acc = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sr_Statics$().p(acc, $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sr_Statics$().u(this.by));
  acc = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sr_Statics$().p(acc, $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sr_Statics$().u(this.bA));
  acc = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sr_Statics$().p(acc, $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sr_Statics$().u(this.bz));
  acc = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sr_Statics$().p(acc, $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sr_Statics$().u(this.bg));
  return $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sr_Statics$().a9(acc, 6);
});
$p.h = (function(x$0) {
  if ((this === x$0)) {
    return true;
  } else if ((x$0 instanceof $c_Lgpu_painter_PipelineKey)) {
    if ((this.bX === x$0.bX)) {
      var x = this.bx;
      var x$2 = x$0.bx;
      var $x_4 = ((x === null) ? (x$2 === null) : (x === x$2));
    } else {
      var $x_4 = false;
    }
    if ($x_4) {
      var x$3 = this.by;
      var x$4 = x$0.by;
      var $x_3 = ((x$3 === null) ? (x$4 === null) : (x$3 === x$4));
    } else {
      var $x_3 = false;
    }
    if ($x_3) {
      var x$5 = this.bA;
      var x$6 = x$0.bA;
      var $x_2 = ((x$5 === null) ? (x$6 === null) : (x$5 === x$6));
    } else {
      var $x_2 = false;
    }
    if ($x_2) {
      var x$7 = this.bz;
      var x$8 = x$0.bz;
      var $x_1 = ((x$7 === null) ? (x$8 === null) : (x$7 === x$8));
    } else {
      var $x_1 = false;
    }
    if ($x_1) {
      return (this.bg === x$0.bg);
    } else {
      return false;
    }
  } else {
    return false;
  }
});
$p.m = (function() {
  return $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sr_ScalaRunTime$().dv(this);
});
$p.H = (function() {
  return 6;
});
$p.J = (function() {
  return "PipelineKey";
});
$p.I = (function(n) {
  switch (n) {
    case 0: {
      return this.bX;
      break;
    }
    case 1: {
      return this.bx;
      break;
    }
    case 2: {
      return this.by;
      break;
    }
    case 3: {
      return this.bA;
      break;
    }
    case 4: {
      return this.bz;
      break;
    }
    case 5: {
      return this.bg;
      break;
    }
    default: {
      throw $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$ct_jl_IndexOutOfBoundsException__T__(new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$c_jl_IndexOutOfBoundsException(), ("" + n));
    }
  }
});
function $isArrayOf_Lgpu_painter_PipelineKey(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.aJ)));
}
var $d_Lgpu_painter_PipelineKey = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$TypeData().i($c_Lgpu_painter_PipelineKey, "gpu.painter.PipelineKey", ({
  aJ: 1,
  b: 1,
  r: 1,
  a: 1
}));
/** @constructor */
function $c_sc_Map$() {
  this.ew = null;
  this.eu = null;
  this.ev = null;
  $ct_sc_MapFactory$Delegate__sc_MapFactory__(this, $m_sci_Map$());
  $n_sc_Map$ = this;
  this.eu = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$ct_O__(new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$c_O());
  this.ev = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$c_sr_AbstractFunction0_$$Lambda$a02b774b97db8234e08c6a02dd06557c99779855((() => this.eu));
}
$p = $c_sc_Map$.prototype = new $h_sc_MapFactory$Delegate();
$p.constructor = $c_sc_Map$;
/** @constructor */
function $h_sc_Map$() {
}
$h_sc_Map$.prototype = $p;
var $d_sc_Map$ = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$TypeData().i($c_sc_Map$, "scala.collection.Map$", ({
  dj: 1,
  dk: 1,
  a: 1,
  ax: 1
}));
var $n_sc_Map$;
function $m_sc_Map$() {
  if ((!$n_sc_Map$)) {
    $n_sc_Map$ = new $c_sc_Map$();
  }
  return $n_sc_Map$;
}
/** @constructor */
function $c_sci_Iterable$() {
  this.c2 = null;
  $ct_sc_IterableFactory$Delegate__sc_IterableFactory__(this, $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sci_List$());
}
$p = $c_sci_Iterable$.prototype = new $h_sc_IterableFactory$Delegate();
$p.constructor = $c_sci_Iterable$;
/** @constructor */
function $h_sci_Iterable$() {
}
$h_sci_Iterable$.prototype = $p;
$p.gJ = (function(it) {
  return ($is_sci_Iterable(it) ? it : $c_sc_IterableFactory$Delegate.prototype.a1.call(this, it));
});
$p.a1 = (function(it) {
  return this.gJ(it);
});
var $d_sci_Iterable$ = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$TypeData().i($c_sci_Iterable$, "scala.collection.immutable.Iterable$", ({
  dA: 1,
  b6: 1,
  a: 1,
  F: 1
}));
var $n_sci_Iterable$;
function $m_sci_Iterable$() {
  if ((!$n_sci_Iterable$)) {
    $n_sci_Iterable$ = new $c_sci_Iterable$();
  }
  return $n_sci_Iterable$;
}
/** @constructor */
function $c_scm_Iterable$() {
  this.c2 = null;
  $ct_sc_IterableFactory$Delegate__sc_IterableFactory__(this, $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_scm_ArrayBuffer$());
}
$p = $c_scm_Iterable$.prototype = new $h_sc_IterableFactory$Delegate();
$p.constructor = $c_scm_Iterable$;
/** @constructor */
function $h_scm_Iterable$() {
}
$h_scm_Iterable$.prototype = $p;
var $d_scm_Iterable$ = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$TypeData().i($c_scm_Iterable$, "scala.collection.mutable.Iterable$", ({
  ea: 1,
  b6: 1,
  a: 1,
  F: 1
}));
var $n_scm_Iterable$;
function $m_scm_Iterable$() {
  if ((!$n_scm_Iterable$)) {
    $n_scm_Iterable$ = new $c_scm_Iterable$();
  }
  return $n_scm_Iterable$;
}
function $f_sr_EnumValue__productElement__I__O($thiz, n) {
  throw $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$ct_jl_IndexOutOfBoundsException__T__(new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$c_jl_IndexOutOfBoundsException(), ("" + n));
}
/** @constructor */
function $c_Lgpu_painter_BlendMode() {
}
$p = $c_Lgpu_painter_BlendMode.prototype = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$h_O();
$p.constructor = $c_Lgpu_painter_BlendMode;
/** @constructor */
function $h_Lgpu_painter_BlendMode() {
}
$h_Lgpu_painter_BlendMode.prototype = $p;
$p.am = (function() {
  return new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$c_s_Product$$anon$1(this);
});
$p.hm = (function() {
  var x = $s_Lgpu_painter_BlendMode$__Replace__Lgpu_painter_BlendMode();
  if (((x !== null) && (x === this))) {
    return (void 0);
  }
  var x$3 = $s_Lgpu_painter_BlendMode$__Alpha__Lgpu_painter_BlendMode();
  if (((x$3 !== null) && (x$3 === this))) {
    var _2 = ({
      "srcFactor": "src-alpha",
      "dstFactor": "one-minus-src-alpha",
      "operation": "add"
    });
    var _2$1 = ({
      "srcFactor": "one",
      "dstFactor": "one-minus-src-alpha",
      "operation": "add"
    });
    return ({
      "color": _2,
      "alpha": _2$1
    });
  }
  var x$5 = $s_Lgpu_painter_BlendMode$__Additive__Lgpu_painter_BlendMode();
  if (((x$5 !== null) && (x$5 === this))) {
    var _2$2 = ({
      "srcFactor": "src-alpha",
      "dstFactor": "one",
      "operation": "add"
    });
    var _2$3 = ({
      "srcFactor": "one",
      "dstFactor": "one",
      "operation": "add"
    });
    return ({
      "color": _2$2,
      "alpha": _2$3
    });
  }
  var x$7 = $s_Lgpu_painter_BlendMode$__Multiply__Lgpu_painter_BlendMode();
  if (((x$7 !== null) && (x$7 === this))) {
    var _2$4 = ({
      "srcFactor": "dst-color",
      "dstFactor": "zero",
      "operation": "add"
    });
    var _2$5 = ({
      "srcFactor": "dst-alpha",
      "dstFactor": "zero",
      "operation": "add"
    });
    return ({
      "color": _2$4,
      "alpha": _2$5
    });
  }
  throw new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$c_s_MatchError(this);
});
function $ct_Lgpu_painter_CullMode__T__($thiz, webgpu) {
  $thiz.bW = webgpu;
  return $thiz;
}
/** @constructor */
function $c_Lgpu_painter_CullMode() {
  this.bW = null;
}
$p = $c_Lgpu_painter_CullMode.prototype = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$h_O();
$p.constructor = $c_Lgpu_painter_CullMode;
/** @constructor */
function $h_Lgpu_painter_CullMode() {
}
$h_Lgpu_painter_CullMode.prototype = $p;
$p.am = (function() {
  return new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$c_s_Product$$anon$1(this);
});
function $ct_Lgpu_painter_FrontFace__T__($thiz, webgpu) {
  $thiz.cB = webgpu;
  return $thiz;
}
/** @constructor */
function $c_Lgpu_painter_FrontFace() {
  this.cB = null;
}
$p = $c_Lgpu_painter_FrontFace.prototype = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$h_O();
$p.constructor = $c_Lgpu_painter_FrontFace;
/** @constructor */
function $h_Lgpu_painter_FrontFace() {
}
$h_Lgpu_painter_FrontFace.prototype = $p;
$p.am = (function() {
  return new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$c_s_Product$$anon$1(this);
});
function $ct_Lgpu_painter_PrimitiveTopology__T__($thiz, webgpu) {
  $thiz.bh = webgpu;
  return $thiz;
}
/** @constructor */
function $c_Lgpu_painter_PrimitiveTopology() {
  this.bh = null;
}
$p = $c_Lgpu_painter_PrimitiveTopology.prototype = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$h_O();
$p.constructor = $c_Lgpu_painter_PrimitiveTopology;
/** @constructor */
function $h_Lgpu_painter_PrimitiveTopology() {
}
$h_Lgpu_painter_PrimitiveTopology.prototype = $p;
$p.am = (function() {
  return new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$c_s_Product$$anon$1(this);
});
function $isArrayOf_jl_ClassCastException(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.cq)));
}
/** @constructor */
function $c_T4(_1, _2, _3, _4) {
  this.bE = null;
  this.bF = null;
  this.bG = null;
  this.bH = null;
  this.bE = _1;
  this.bF = _2;
  this.bG = _3;
  this.bH = _4;
}
$p = $c_T4.prototype = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$h_O();
$p.constructor = $c_T4;
/** @constructor */
function $h_T4() {
}
$h_T4.prototype = $p;
$p.am = (function() {
  return new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$c_s_Product$$anon$1(this);
});
$p.H = (function() {
  return 4;
});
$p.I = (function(n) {
  return $f_s_Product4__productElement__I__O(this, n);
});
$p.j = (function() {
  return $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_s_util_hashing_MurmurHash3$().bS(this, (-1542739752), true);
});
$p.h = (function(x$0) {
  return ((this === x$0) || ((x$0 instanceof $c_T4) && ((($j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sr_BoxesRunTime$().O(this.bE, x$0.bE) && $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sr_BoxesRunTime$().O(this.bF, x$0.bF)) && $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sr_BoxesRunTime$().O(this.bG, x$0.bG)) && $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sr_BoxesRunTime$().O(this.bH, x$0.bH))));
});
$p.J = (function() {
  return "Tuple4";
});
$p.m = (function() {
  return (((((((("(" + this.bE) + ",") + this.bF) + ",") + this.bG) + ",") + this.bH) + ")");
});
function $isArrayOf_T4(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.aY)));
}
var $d_T4 = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$TypeData().i($c_T4, "scala.Tuple4", ({
  aY: 1,
  b: 1,
  r: 1,
  d4: 1,
  a: 1
}));
/** @constructor */
function $c_sci_Seq$() {
  this.bI = null;
  $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$ct_sc_SeqFactory$Delegate__sc_SeqFactory__(this, $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sci_List$());
}
$p = $c_sci_Seq$.prototype = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$h_sc_SeqFactory$Delegate();
$p.constructor = $c_sci_Seq$;
/** @constructor */
function $h_sci_Seq$() {
}
$h_sci_Seq$.prototype = $p;
$p.dG = (function(it) {
  return ($is_sci_Seq(it) ? it : $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$c_sc_SeqFactory$Delegate.prototype.d1.call(this, it));
});
$p.d1 = (function(it) {
  return this.dG(it);
});
$p.a1 = (function(source) {
  return this.dG(source);
});
var $d_sci_Seq$ = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$TypeData().i($c_sci_Seq$, "scala.collection.immutable.Seq$", ({
  dO: 1,
  ay: 1,
  a: 1,
  F: 1,
  a5: 1
}));
var $n_sci_Seq$;
function $m_sci_Seq$() {
  if ((!$n_sci_Seq$)) {
    $n_sci_Seq$ = new $c_sci_Seq$();
  }
  return $n_sci_Seq$;
}
function $ct_scm_HashMap$HashMapIterator__scm_HashMap__($thiz, outer) {
  if ((outer === null)) {
    throw $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$ct_jl_NullPointerException__(new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$c_jl_NullPointerException());
  }
  $thiz.cc = outer;
  $thiz.ba = 0;
  $thiz.aV = null;
  $thiz.cd = outer.t.a.length;
  return $thiz;
}
/** @constructor */
function $c_scm_HashMap$HashMapIterator() {
  this.ba = 0;
  this.aV = null;
  this.cd = 0;
  this.cc = null;
}
$p = $c_scm_HashMap$HashMapIterator.prototype = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$h_sc_AbstractIterator();
$p.constructor = $c_scm_HashMap$HashMapIterator;
/** @constructor */
function $h_scm_HashMap$HashMapIterator() {
}
$h_scm_HashMap$HashMapIterator.prototype = $p;
$p.i = (function() {
  if ((this.aV !== null)) {
    return true;
  } else {
    while ((this.ba < this.cd)) {
      var n = this.cc.t.a[this.ba];
      this.ba = ((1 + this.ba) | 0);
      if ((n !== null)) {
        this.aV = n;
        return true;
      }
    }
    return false;
  }
});
$p.g = (function() {
  if ((!this.i())) {
    return $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sc_Iterator$().G.g();
  } else {
    var x$proxy14 = this.aV;
    if ((x$proxy14 === null)) {
      $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sr_Scala3RunTime$().be();
    }
    var r = this.dF(x$proxy14);
    var x$proxy15 = this.aV;
    if ((x$proxy15 === null)) {
      $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sr_Scala3RunTime$().be();
    }
    this.aV = x$proxy15.L;
    return r;
  }
});
function $f_sc_MapOps__getOrElse__O__F0__O($thiz, key, default$1) {
  var x5 = $thiz.dH(key);
  if ((x5 instanceof $j_internal$002d521d3ae75e61be21a6f0408ca972d8f2d0ec7d00.$c_s_Some)) {
    return x5.b0;
  }
  if (($j_internal$002d521d3ae75e61be21a6f0408ca972d8f2d0ec7d00.$m_s_None$() === x5)) {
    return default$1.a0();
  }
  throw new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$c_s_MatchError(x5);
}
function $f_sc_MapOps__foreachEntry__F2__V($thiz, f) {
  var it = $thiz.c();
  while (it.i()) {
    var next = it.g();
    f.aF(next.S(), next.a8());
  }
}
function $f_sc_MapOps__default__O__O($thiz, key) {
  throw new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$c_ju_NoSuchElementException(("key not found: " + key));
}
function $f_sc_MapOps__addString__scm_StringBuilder__T__T__T__scm_StringBuilder($thiz, sb, start, sep, end) {
  return $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$f_sc_IterableOnceOps__addString__scm_StringBuilder__T__T__T__scm_StringBuilder(new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$c_sc_Iterator$$anon$9(new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28(((x$1$2) => {
    var k = x$1$2.S();
    var v = x$1$2.a8();
    return ((k + " -> ") + v);
  })), $thiz.c()), sb, start, sep, end);
}
function $is_sci_Iterable(obj) {
  return (!(!((obj && obj.$classData) && obj.$classData.n.v)));
}
function $isArrayOf_sci_Iterable(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.v)));
}
/** @constructor */
function $c_scm_HashMap$$anon$1(outer) {
  this.ba = 0;
  this.aV = null;
  this.cd = 0;
  this.cc = null;
  if ((outer === null)) {
    throw $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$ct_jl_NullPointerException__(new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$c_jl_NullPointerException());
  }
  $ct_scm_HashMap$HashMapIterator__scm_HashMap__(this, outer);
}
$p = $c_scm_HashMap$$anon$1.prototype = new $h_scm_HashMap$HashMapIterator();
$p.constructor = $c_scm_HashMap$$anon$1;
/** @constructor */
function $h_scm_HashMap$$anon$1() {
}
$h_scm_HashMap$$anon$1.prototype = $p;
$p.dF = (function(nd) {
  return new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$c_T2(nd.br, nd.au);
});
var $d_scm_HashMap$$anon$1 = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$TypeData().i($c_scm_HashMap$$anon$1, "scala.collection.mutable.HashMap$$anon$1", ({
  e4: 1,
  aF: 1,
  s: 1,
  c: 1,
  d: 1,
  t: 1
}));
/** @constructor */
function $c_scm_HashMap$$anon$4(outer) {
  this.ba = 0;
  this.aV = null;
  this.cd = 0;
  this.cc = null;
  if ((outer === null)) {
    throw $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$ct_jl_NullPointerException__(new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$c_jl_NullPointerException());
  }
  $ct_scm_HashMap$HashMapIterator__scm_HashMap__(this, outer);
}
$p = $c_scm_HashMap$$anon$4.prototype = new $h_scm_HashMap$HashMapIterator();
$p.constructor = $c_scm_HashMap$$anon$4;
/** @constructor */
function $h_scm_HashMap$$anon$4() {
}
$h_scm_HashMap$$anon$4.prototype = $p;
$p.dF = (function(nd) {
  return nd;
});
var $d_scm_HashMap$$anon$4 = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$TypeData().i($c_scm_HashMap$$anon$4, "scala.collection.mutable.HashMap$$anon$4", ({
  e5: 1,
  aF: 1,
  s: 1,
  c: 1,
  d: 1,
  t: 1
}));
/** @constructor */
function $c_scm_HashMap$$anon$5(outer) {
  this.ba = 0;
  this.aV = null;
  this.cd = 0;
  this.cc = null;
  this.dp = 0;
  this.fQ = null;
  if ((outer === null)) {
    throw $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$ct_jl_NullPointerException__(new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$c_jl_NullPointerException());
  }
  this.fQ = outer;
  $ct_scm_HashMap$HashMapIterator__scm_HashMap__(this, outer);
  this.dp = 0;
}
$p = $c_scm_HashMap$$anon$5.prototype = new $h_scm_HashMap$HashMapIterator();
$p.constructor = $c_scm_HashMap$$anon$5;
/** @constructor */
function $h_scm_HashMap$$anon$5() {
}
$h_scm_HashMap$$anon$5.prototype = $p;
$p.j = (function() {
  return this.dp;
});
$p.dF = (function(nd) {
  var $x_1 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_s_util_hashing_MurmurHash3$();
  var improvedHash = nd.aW;
  this.dp = $x_1.fK((improvedHash ^ ((improvedHash >>> 16) | 0)), $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sr_Statics$().u(nd.au));
  return this;
});
var $d_scm_HashMap$$anon$5 = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$TypeData().i($c_scm_HashMap$$anon$5, "scala.collection.mutable.HashMap$$anon$5", ({
  e6: 1,
  aF: 1,
  s: 1,
  c: 1,
  d: 1,
  t: 1
}));
/** @constructor */
function $c_Lgpu_painter_BlendMode$$anon$11(\u03b4name$2, _$ordinal$2) {
  this.cA = null;
  this.cA = \u03b4name$2;
}
$p = $c_Lgpu_painter_BlendMode$$anon$11.prototype = new $h_Lgpu_painter_BlendMode();
$p.constructor = $c_Lgpu_painter_BlendMode$$anon$11;
/** @constructor */
function $h_Lgpu_painter_BlendMode$$anon$11() {
}
$h_Lgpu_painter_BlendMode$$anon$11.prototype = $p;
$p.H = (function() {
  return 0;
});
$p.I = (function(n) {
  return $f_sr_EnumValue__productElement__I__O(this, n);
});
$p.J = (function() {
  return this.cA;
});
$p.m = (function() {
  return this.cA;
});
$p.j = (function() {
  return $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$f_T__hashCode__I(this.cA);
});
var $d_Lgpu_painter_BlendMode$$anon$11 = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$TypeData().i($c_Lgpu_painter_BlendMode$$anon$11, "gpu.painter.BlendMode$$anon$11", ({
  bZ: 1,
  bX: 1,
  b: 1,
  r: 1,
  a: 1,
  a0: 1,
  a1: 1,
  B: 1,
  Y: 1,
  Z: 1
}));
/** @constructor */
function $c_Lgpu_painter_CullMode$$anon$6() {
  this.bW = null;
  $ct_Lgpu_painter_CullMode__T__(this, "none");
}
$p = $c_Lgpu_painter_CullMode$$anon$6.prototype = new $h_Lgpu_painter_CullMode();
$p.constructor = $c_Lgpu_painter_CullMode$$anon$6;
/** @constructor */
function $h_Lgpu_painter_CullMode$$anon$6() {
}
$h_Lgpu_painter_CullMode$$anon$6.prototype = $p;
$p.H = (function() {
  return 0;
});
$p.I = (function(n) {
  return $f_sr_EnumValue__productElement__I__O(this, n);
});
$p.J = (function() {
  return "None";
});
$p.m = (function() {
  return "None";
});
$p.j = (function() {
  return $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$f_T__hashCode__I("None");
});
var $d_Lgpu_painter_CullMode$$anon$6 = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$TypeData().i($c_Lgpu_painter_CullMode$$anon$6, "gpu.painter.CullMode$$anon$6", ({
  c1: 1,
  au: 1,
  b: 1,
  r: 1,
  a: 1,
  a0: 1,
  a1: 1,
  B: 1,
  Y: 1,
  Z: 1
}));
/** @constructor */
function $c_Lgpu_painter_CullMode$$anon$7() {
  this.bW = null;
  $ct_Lgpu_painter_CullMode__T__(this, "front");
}
$p = $c_Lgpu_painter_CullMode$$anon$7.prototype = new $h_Lgpu_painter_CullMode();
$p.constructor = $c_Lgpu_painter_CullMode$$anon$7;
/** @constructor */
function $h_Lgpu_painter_CullMode$$anon$7() {
}
$h_Lgpu_painter_CullMode$$anon$7.prototype = $p;
$p.H = (function() {
  return 0;
});
$p.I = (function(n) {
  return $f_sr_EnumValue__productElement__I__O(this, n);
});
$p.J = (function() {
  return "Front";
});
$p.m = (function() {
  return "Front";
});
$p.j = (function() {
  return $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$f_T__hashCode__I("Front");
});
var $d_Lgpu_painter_CullMode$$anon$7 = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$TypeData().i($c_Lgpu_painter_CullMode$$anon$7, "gpu.painter.CullMode$$anon$7", ({
  c2: 1,
  au: 1,
  b: 1,
  r: 1,
  a: 1,
  a0: 1,
  a1: 1,
  B: 1,
  Y: 1,
  Z: 1
}));
/** @constructor */
function $c_Lgpu_painter_CullMode$$anon$8() {
  this.bW = null;
  $ct_Lgpu_painter_CullMode__T__(this, "back");
}
$p = $c_Lgpu_painter_CullMode$$anon$8.prototype = new $h_Lgpu_painter_CullMode();
$p.constructor = $c_Lgpu_painter_CullMode$$anon$8;
/** @constructor */
function $h_Lgpu_painter_CullMode$$anon$8() {
}
$h_Lgpu_painter_CullMode$$anon$8.prototype = $p;
$p.H = (function() {
  return 0;
});
$p.I = (function(n) {
  return $f_sr_EnumValue__productElement__I__O(this, n);
});
$p.J = (function() {
  return "Back";
});
$p.m = (function() {
  return "Back";
});
$p.j = (function() {
  return $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$f_T__hashCode__I("Back");
});
var $d_Lgpu_painter_CullMode$$anon$8 = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$TypeData().i($c_Lgpu_painter_CullMode$$anon$8, "gpu.painter.CullMode$$anon$8", ({
  c3: 1,
  au: 1,
  b: 1,
  r: 1,
  a: 1,
  a0: 1,
  a1: 1,
  B: 1,
  Y: 1,
  Z: 1
}));
/** @constructor */
function $c_Lgpu_painter_FrontFace$$anon$10() {
  this.cB = null;
  $ct_Lgpu_painter_FrontFace__T__(this, "cw");
}
$p = $c_Lgpu_painter_FrontFace$$anon$10.prototype = new $h_Lgpu_painter_FrontFace();
$p.constructor = $c_Lgpu_painter_FrontFace$$anon$10;
/** @constructor */
function $h_Lgpu_painter_FrontFace$$anon$10() {
}
$h_Lgpu_painter_FrontFace$$anon$10.prototype = $p;
$p.H = (function() {
  return 0;
});
$p.I = (function(n) {
  return $f_sr_EnumValue__productElement__I__O(this, n);
});
$p.J = (function() {
  return "CW";
});
$p.m = (function() {
  return "CW";
});
$p.j = (function() {
  return $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$f_T__hashCode__I("CW");
});
var $d_Lgpu_painter_FrontFace$$anon$10 = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$TypeData().i($c_Lgpu_painter_FrontFace$$anon$10, "gpu.painter.FrontFace$$anon$10", ({
  c6: 1,
  aI: 1,
  b: 1,
  r: 1,
  a: 1,
  a0: 1,
  a1: 1,
  B: 1,
  Y: 1,
  Z: 1
}));
/** @constructor */
function $c_Lgpu_painter_FrontFace$$anon$9() {
  this.cB = null;
  $ct_Lgpu_painter_FrontFace__T__(this, "ccw");
}
$p = $c_Lgpu_painter_FrontFace$$anon$9.prototype = new $h_Lgpu_painter_FrontFace();
$p.constructor = $c_Lgpu_painter_FrontFace$$anon$9;
/** @constructor */
function $h_Lgpu_painter_FrontFace$$anon$9() {
}
$h_Lgpu_painter_FrontFace$$anon$9.prototype = $p;
$p.H = (function() {
  return 0;
});
$p.I = (function(n) {
  return $f_sr_EnumValue__productElement__I__O(this, n);
});
$p.J = (function() {
  return "CCW";
});
$p.m = (function() {
  return "CCW";
});
$p.j = (function() {
  return $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$f_T__hashCode__I("CCW");
});
var $d_Lgpu_painter_FrontFace$$anon$9 = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$TypeData().i($c_Lgpu_painter_FrontFace$$anon$9, "gpu.painter.FrontFace$$anon$9", ({
  c7: 1,
  aI: 1,
  b: 1,
  r: 1,
  a: 1,
  a0: 1,
  a1: 1,
  B: 1,
  Y: 1,
  Z: 1
}));
/** @constructor */
function $c_Lgpu_painter_PrimitiveTopology$$anon$1() {
  this.bh = null;
  $ct_Lgpu_painter_PrimitiveTopology__T__(this, "triangle-list");
}
$p = $c_Lgpu_painter_PrimitiveTopology$$anon$1.prototype = new $h_Lgpu_painter_PrimitiveTopology();
$p.constructor = $c_Lgpu_painter_PrimitiveTopology$$anon$1;
/** @constructor */
function $h_Lgpu_painter_PrimitiveTopology$$anon$1() {
}
$h_Lgpu_painter_PrimitiveTopology$$anon$1.prototype = $p;
$p.H = (function() {
  return 0;
});
$p.I = (function(n) {
  return $f_sr_EnumValue__productElement__I__O(this, n);
});
$p.J = (function() {
  return "TriangleList";
});
$p.m = (function() {
  return "TriangleList";
});
$p.j = (function() {
  return $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$f_T__hashCode__I("TriangleList");
});
var $d_Lgpu_painter_PrimitiveTopology$$anon$1 = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$TypeData().i($c_Lgpu_painter_PrimitiveTopology$$anon$1, "gpu.painter.PrimitiveTopology$$anon$1", ({
  ca: 1,
  af: 1,
  b: 1,
  r: 1,
  a: 1,
  a0: 1,
  a1: 1,
  B: 1,
  Y: 1,
  Z: 1
}));
/** @constructor */
function $c_Lgpu_painter_PrimitiveTopology$$anon$2() {
  this.bh = null;
  $ct_Lgpu_painter_PrimitiveTopology__T__(this, "triangle-strip");
}
$p = $c_Lgpu_painter_PrimitiveTopology$$anon$2.prototype = new $h_Lgpu_painter_PrimitiveTopology();
$p.constructor = $c_Lgpu_painter_PrimitiveTopology$$anon$2;
/** @constructor */
function $h_Lgpu_painter_PrimitiveTopology$$anon$2() {
}
$h_Lgpu_painter_PrimitiveTopology$$anon$2.prototype = $p;
$p.H = (function() {
  return 0;
});
$p.I = (function(n) {
  return $f_sr_EnumValue__productElement__I__O(this, n);
});
$p.J = (function() {
  return "TriangleStrip";
});
$p.m = (function() {
  return "TriangleStrip";
});
$p.j = (function() {
  return $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$f_T__hashCode__I("TriangleStrip");
});
var $d_Lgpu_painter_PrimitiveTopology$$anon$2 = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$TypeData().i($c_Lgpu_painter_PrimitiveTopology$$anon$2, "gpu.painter.PrimitiveTopology$$anon$2", ({
  cb: 1,
  af: 1,
  b: 1,
  r: 1,
  a: 1,
  a0: 1,
  a1: 1,
  B: 1,
  Y: 1,
  Z: 1
}));
/** @constructor */
function $c_Lgpu_painter_PrimitiveTopology$$anon$3() {
  this.bh = null;
  $ct_Lgpu_painter_PrimitiveTopology__T__(this, "line-list");
}
$p = $c_Lgpu_painter_PrimitiveTopology$$anon$3.prototype = new $h_Lgpu_painter_PrimitiveTopology();
$p.constructor = $c_Lgpu_painter_PrimitiveTopology$$anon$3;
/** @constructor */
function $h_Lgpu_painter_PrimitiveTopology$$anon$3() {
}
$h_Lgpu_painter_PrimitiveTopology$$anon$3.prototype = $p;
$p.H = (function() {
  return 0;
});
$p.I = (function(n) {
  return $f_sr_EnumValue__productElement__I__O(this, n);
});
$p.J = (function() {
  return "LineList";
});
$p.m = (function() {
  return "LineList";
});
$p.j = (function() {
  return $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$f_T__hashCode__I("LineList");
});
var $d_Lgpu_painter_PrimitiveTopology$$anon$3 = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$TypeData().i($c_Lgpu_painter_PrimitiveTopology$$anon$3, "gpu.painter.PrimitiveTopology$$anon$3", ({
  cc: 1,
  af: 1,
  b: 1,
  r: 1,
  a: 1,
  a0: 1,
  a1: 1,
  B: 1,
  Y: 1,
  Z: 1
}));
/** @constructor */
function $c_Lgpu_painter_PrimitiveTopology$$anon$4() {
  this.bh = null;
  $ct_Lgpu_painter_PrimitiveTopology__T__(this, "line-strip");
}
$p = $c_Lgpu_painter_PrimitiveTopology$$anon$4.prototype = new $h_Lgpu_painter_PrimitiveTopology();
$p.constructor = $c_Lgpu_painter_PrimitiveTopology$$anon$4;
/** @constructor */
function $h_Lgpu_painter_PrimitiveTopology$$anon$4() {
}
$h_Lgpu_painter_PrimitiveTopology$$anon$4.prototype = $p;
$p.H = (function() {
  return 0;
});
$p.I = (function(n) {
  return $f_sr_EnumValue__productElement__I__O(this, n);
});
$p.J = (function() {
  return "LineStrip";
});
$p.m = (function() {
  return "LineStrip";
});
$p.j = (function() {
  return $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$f_T__hashCode__I("LineStrip");
});
var $d_Lgpu_painter_PrimitiveTopology$$anon$4 = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$TypeData().i($c_Lgpu_painter_PrimitiveTopology$$anon$4, "gpu.painter.PrimitiveTopology$$anon$4", ({
  cd: 1,
  af: 1,
  b: 1,
  r: 1,
  a: 1,
  a0: 1,
  a1: 1,
  B: 1,
  Y: 1,
  Z: 1
}));
/** @constructor */
function $c_Lgpu_painter_PrimitiveTopology$$anon$5() {
  this.bh = null;
  $ct_Lgpu_painter_PrimitiveTopology__T__(this, "point-list");
}
$p = $c_Lgpu_painter_PrimitiveTopology$$anon$5.prototype = new $h_Lgpu_painter_PrimitiveTopology();
$p.constructor = $c_Lgpu_painter_PrimitiveTopology$$anon$5;
/** @constructor */
function $h_Lgpu_painter_PrimitiveTopology$$anon$5() {
}
$h_Lgpu_painter_PrimitiveTopology$$anon$5.prototype = $p;
$p.H = (function() {
  return 0;
});
$p.I = (function(n) {
  return $f_sr_EnumValue__productElement__I__O(this, n);
});
$p.J = (function() {
  return "PointList";
});
$p.m = (function() {
  return "PointList";
});
$p.j = (function() {
  return $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$f_T__hashCode__I("PointList");
});
var $d_Lgpu_painter_PrimitiveTopology$$anon$5 = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$TypeData().i($c_Lgpu_painter_PrimitiveTopology$$anon$5, "gpu.painter.PrimitiveTopology$$anon$5", ({
  ce: 1,
  af: 1,
  b: 1,
  r: 1,
  a: 1,
  a0: 1,
  a1: 1,
  B: 1,
  Y: 1,
  Z: 1
}));
function $f_sc_Map__equals__O__Z($thiz, o) {
  if (($thiz === o)) {
    return true;
  } else if ($is_sc_Map(o)) {
    if (($thiz.dT() === o.dT())) {
      try {
        return $thiz.gF(new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28(((map$1) => ((kv$2) => $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sr_BoxesRunTime$().O(map$1.fr(kv$2.S(), new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$c_sr_AbstractFunction0_$$Lambda$a02b774b97db8234e08c6a02dd06557c99779855((() => $m_sc_Map$().ev.a0()))), kv$2.a8())))(o)));
      } catch (e) {
        if (false) {
          return false;
        } else {
          throw e;
        }
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
}
function $is_sc_Map(obj) {
  return (!(!((obj && obj.$classData) && obj.$classData.n.an)));
}
function $isArrayOf_sc_Map(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.an)));
}
/** @constructor */
function $c_sc_AbstractMap() {
}
$p = $c_sc_AbstractMap.prototype = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$h_sc_AbstractIterable();
$p.constructor = $c_sc_AbstractMap;
/** @constructor */
function $h_sc_AbstractMap() {
}
$h_sc_AbstractMap.prototype = $p;
$p.cs = (function(f) {
  $f_sc_MapOps__foreachEntry__F2__V(this, f);
});
$p.aO = (function(sb, start, sep, end) {
  return $f_sc_MapOps__addString__scm_StringBuilder__T__T__T__scm_StringBuilder(this, sb, start, sep, end);
});
$p.h = (function(o) {
  return $f_sc_Map__equals__O__Z(this, o);
});
$p.j = (function() {
  return $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_s_util_hashing_MurmurHash3$().h0(this);
});
$p.a7 = (function() {
  return "Map";
});
$p.m = (function() {
  return $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$f_sc_Iterable__toString__T(this);
});
function $is_sci_Seq(obj) {
  return (!(!((obj && obj.$classData) && obj.$classData.n.w)));
}
function $isArrayOf_sci_Seq(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.w)));
}
/** @constructor */
function $c_sci_AbstractMap() {
}
$p = $c_sci_AbstractMap.prototype = new $h_sc_AbstractMap();
$p.constructor = $c_sci_AbstractMap;
/** @constructor */
function $h_sci_AbstractMap() {
}
$h_sci_AbstractMap.prototype = $p;
$p.a3 = (function() {
  return $m_sci_Iterable$();
});
/** @constructor */
function $c_sci_Map$EmptyMap$() {
}
$p = $c_sci_Map$EmptyMap$.prototype = new $h_sci_AbstractMap();
$p.constructor = $c_sci_Map$EmptyMap$;
/** @constructor */
function $h_sci_Map$EmptyMap$() {
}
$h_sci_Map$EmptyMap$.prototype = $p;
$p.dT = (function() {
  return 0;
});
$p.o = (function() {
  return 0;
});
$p.n = (function() {
  return true;
});
$p.dx = (function(key) {
  throw new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$c_ju_NoSuchElementException(("key not found: " + key));
});
$p.dH = (function(key) {
  return $j_internal$002d521d3ae75e61be21a6f0408ca972d8f2d0ec7d00.$m_s_None$();
});
$p.fr = (function(key, default$1) {
  return default$1.a0();
});
$p.c = (function() {
  return $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sc_Iterator$().G;
});
$p.l = (function(key) {
  this.dx(key);
});
var $d_sci_Map$EmptyMap$ = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$TypeData().i($c_sci_Map$EmptyMap$, "scala.collection.immutable.Map$EmptyMap$", ({
  dL: 1,
  dw: 1,
  aZ: 1,
  h: 1,
  c: 1,
  d: 1,
  g: 1,
  f: 1,
  e: 1,
  j: 1,
  k: 1,
  b9: 1,
  b8: 1,
  b: 1,
  an: 1,
  v: 1,
  dM: 1,
  dJ: 1,
  a: 1
}));
var $n_sci_Map$EmptyMap$;
function $m_sci_Map$EmptyMap$() {
  if ((!$n_sci_Map$EmptyMap$)) {
    $n_sci_Map$EmptyMap$ = new $c_sci_Map$EmptyMap$();
  }
  return $n_sci_Map$EmptyMap$;
}
function $is_scm_Map(obj) {
  return (!(!((obj && obj.$classData) && obj.$classData.n.aG)));
}
function $isArrayOf_scm_Map(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.aG)));
}
function $isArrayOf_sci_HashMap(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.dy)));
}
/** @constructor */
function $c_scm_AbstractMap() {
}
$p = $c_scm_AbstractMap.prototype = new $h_sc_AbstractMap();
$p.constructor = $c_scm_AbstractMap;
/** @constructor */
function $h_scm_AbstractMap() {
}
$h_scm_AbstractMap.prototype = $p;
$p.a3 = (function() {
  return $m_scm_Iterable$();
});
$p.an = (function() {
  return this;
});
function $p_scm_HashMap__put0__O__O__I__Z__s_Some($thiz, key, value, hash, getOld) {
  if ((((1 + $thiz.at) | 0) >= $thiz.cb)) {
    $p_scm_HashMap__growTable__I__V($thiz, ($thiz.t.a.length << 1));
  }
  return $p_scm_HashMap__put0__O__O__Z__I__I__s_Some($thiz, key, value, getOld, hash, (hash & (($thiz.t.a.length - 1) | 0)));
}
function $p_scm_HashMap__put0__O__O__Z__s_Some($thiz, key, value, getOld) {
  if ((((1 + $thiz.at) | 0) >= $thiz.cb)) {
    $p_scm_HashMap__growTable__I__V($thiz, ($thiz.t.a.length << 1));
  }
  var originalHash = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sr_Statics$().u(key);
  var hash = (originalHash ^ ((originalHash >>> 16) | 0));
  return $p_scm_HashMap__put0__O__O__Z__I__I__s_Some($thiz, key, value, getOld, hash, (hash & (($thiz.t.a.length - 1) | 0)));
}
function $p_scm_HashMap__put0__O__O__Z__I__I__s_Some($thiz, key, value, getOld, hash, idx) {
  matchResult7: {
    var x30 = $thiz.t.a[idx];
    if ((x30 === null)) {
      $thiz.t.a[idx] = new $c_scm_HashMap$Node(key, hash, value, null);
      break matchResult7;
    }
    var prev = null;
    var n = x30;
    while (((n !== null) && (n.aW <= hash))) {
      if (((n.aW === hash) && $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sr_BoxesRunTime$().O(key, n.br))) {
        var old$2 = n.au;
        var this$2 = n;
        this$2.au = value;
        return (getOld ? new $j_internal$002d521d3ae75e61be21a6f0408ca972d8f2d0ec7d00.$c_s_Some(old$2) : null);
      }
      prev = n;
      n = n.L;
    }
    if ((prev === null)) {
      $thiz.t.a[idx] = new $c_scm_HashMap$Node(key, hash, value, x30);
    } else {
      var this$6 = prev;
      var n$1 = new $c_scm_HashMap$Node(key, hash, value, prev.L);
      this$6.L = n$1;
    }
  }
  $thiz.at = ((1 + $thiz.at) | 0);
  return null;
}
function $p_scm_HashMap__growTable__I__V($thiz, newlen) {
  if ((newlen < 0)) {
    throw $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$ct_jl_RuntimeException__T__(new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$c_jl_RuntimeException(), (("new HashMap table size " + newlen) + " exceeds maximum"));
  }
  var oldlen = $thiz.t.a.length;
  $thiz.cb = $p_scm_HashMap__newThreshold__I__I($thiz, newlen);
  if (($thiz.at === 0)) {
    $thiz.t = new ($d_scm_HashMap$Node.r().C)(newlen);
  } else {
    $thiz.t = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_ju_Arrays$().dC($thiz.t, newlen);
    var preLow = new $c_scm_HashMap$Node(null, 0, null, null);
    var preHigh = new $c_scm_HashMap$Node(null, 0, null, null);
    while ((oldlen < newlen)) {
      var i = 0;
      while ((i < oldlen)) {
        var old = $thiz.t.a[i];
        if ((old !== null)) {
          preLow.L = null;
          preHigh.L = null;
          var lastLow = preLow;
          var lastHigh = preHigh;
          var n = old;
          while ((n !== null)) {
            var next = n.L;
            if (((n.aW & oldlen) === 0)) {
              var this$2 = lastLow;
              var n$1 = n;
              this$2.L = n$1;
              lastLow = n;
            } else {
              var this$3 = lastHigh;
              var n$2 = n;
              this$3.L = n$2;
              lastHigh = n;
            }
            n = next;
          }
          var this$4 = lastLow;
          this$4.L = null;
          if ((old !== preLow.L)) {
            $thiz.t.a[i] = preLow.L;
          }
          if ((preHigh.L !== null)) {
            $thiz.t.a[((i + oldlen) | 0)] = preHigh.L;
            var this$5 = lastHigh;
            this$5.L = null;
          }
        }
        i = ((1 + i) | 0);
      }
      oldlen = (oldlen << 1);
    }
  }
}
function $p_scm_HashMap__tableSizeFor__I__I($thiz, capacity) {
  var x = ((capacity - 1) | 0);
  var i = ((x > 4) ? x : 4);
  var x$1 = ((((-2147483648) >> Math.clz32(i)) & i) << 1);
  return ((x$1 < 1073741824) ? x$1 : 1073741824);
}
function $p_scm_HashMap__newThreshold__I__I($thiz, size) {
  return $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$doubleToInt((size * $thiz.dn));
}
/** @constructor */
function $c_scm_HashMap(initialCapacity, loadFactor) {
  this.dn = 0.0;
  this.t = null;
  this.cb = 0;
  this.at = 0;
  this.dn = loadFactor;
  this.t = new ($d_scm_HashMap$Node.r().C)($p_scm_HashMap__tableSizeFor__I__I(this, initialCapacity));
  this.cb = $p_scm_HashMap__newThreshold__I__I(this, this.t.a.length);
  this.at = 0;
}
$p = $c_scm_HashMap.prototype = new $h_scm_AbstractMap();
$p.constructor = $c_scm_HashMap;
/** @constructor */
function $h_scm_HashMap() {
}
$h_scm_HashMap.prototype = $p;
$p.P = (function(f) {
  return $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$f_sc_StrictOptimizedIterableOps__map__F1__O(this, f);
});
$p.dT = (function() {
  return this.at;
});
$p.ag = (function(size) {
  var target = $p_scm_HashMap__tableSizeFor__I__I(this, $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$doubleToInt((((1 + size) | 0) / this.dn)));
  if ((target > this.t.a.length)) {
    $p_scm_HashMap__growTable__I__V(this, target);
  }
});
$p.f2 = (function(xs) {
  $f_scm_Builder__sizeHint__sc_IterableOnce__I__V(this, xs, 0);
  if (false) {
    var f = new $c_sr_AbstractFunction3_$$Lambda$26e0a25d9b29f6b82ea50ab7badf4fb70c5c74e1(((v1$2, v2$2, v3$2) => {
      var h = (v3$2 | 0);
      $p_scm_HashMap__put0__O__O__I__Z__s_Some(this, v1$2, v2$2, (h ^ ((h >>> 16) | 0)), false);
    }));
    xs.ho.hs(f);
    return this;
  } else if ((xs instanceof $c_scm_HashMap)) {
    var iter = xs.h3();
    while (iter.i()) {
      var next = iter.g();
      $p_scm_HashMap__put0__O__O__I__Z__s_Some(this, next.br, next.au, next.aW, false);
    }
    return this;
  } else if (false) {
    var iter$2 = xs.hr();
    while (iter$2.i()) {
      var entry = iter$2.g();
      $p_scm_HashMap__put0__O__O__I__Z__s_Some(this, entry.hv(), entry.hw(), entry.hu(), false);
    }
    return this;
  } else {
    return ($is_scm_Map(xs) ? (xs.cs(new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$c_sr_AbstractFunction2_$$Lambda$286cbfc6187197affcadc8465aaec93d6b7d20dc(((key$2, value$2) => {
      var originalHash = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sr_Statics$().u(key$2);
      return $p_scm_HashMap__put0__O__O__I__Z__s_Some(this, key$2, value$2, (originalHash ^ ((originalHash >>> 16) | 0)), false);
    }))), this) : $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$f_scm_Growable__addAll__sc_IterableOnce__scm_Growable(this, xs));
  }
});
$p.c = (function() {
  return ((this.at === 0) ? $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sc_Iterator$().G : new $c_scm_HashMap$$anon$1(this));
});
$p.h3 = (function() {
  return ((this.at === 0) ? $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sc_Iterator$().G : new $c_scm_HashMap$$anon$4(this));
});
$p.dH = (function(key) {
  var originalHash = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sr_Statics$().u(key);
  var hash = (originalHash ^ ((originalHash >>> 16) | 0));
  matchResult1: {
    var x34;
    var x1 = this.t.a[(hash & ((this.t.a.length - 1) | 0))];
    if ((x1 === null)) {
      var x34 = null;
      break matchResult1;
    }
    var x34 = x1.cZ(key, hash);
  }
  if ((x34 === null)) {
    return $j_internal$002d521d3ae75e61be21a6f0408ca972d8f2d0ec7d00.$m_s_None$();
  }
  return new $j_internal$002d521d3ae75e61be21a6f0408ca972d8f2d0ec7d00.$c_s_Some(x34.au);
});
$p.l = (function(key) {
  var originalHash = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sr_Statics$().u(key);
  var hash = (originalHash ^ ((originalHash >>> 16) | 0));
  matchResult1: {
    var x35;
    var x1 = this.t.a[(hash & ((this.t.a.length - 1) | 0))];
    if ((x1 === null)) {
      var x35 = null;
      break matchResult1;
    }
    var x35 = x1.cZ(key, hash);
  }
  if ((x35 === null)) {
    return $f_sc_MapOps__default__O__O(this, key);
  }
  return x35.au;
});
$p.fr = (function(key, default$1) {
  if ((!($j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$objectGetClass(this) === $d_scm_HashMap.l()))) {
    return $f_sc_MapOps__getOrElse__O__F0__O(this, key, default$1);
  } else {
    var originalHash = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sr_Statics$().u(key);
    var hash = (originalHash ^ ((originalHash >>> 16) | 0));
    matchResult1: {
      var nd;
      var x1 = this.t.a[(hash & ((this.t.a.length - 1) | 0))];
      if ((x1 === null)) {
        var nd = null;
        break matchResult1;
      }
      var nd = x1.cZ(key, hash);
    }
    return ((nd === null) ? default$1.a0() : nd.au);
  }
});
$p.gk = (function(elem) {
  $p_scm_HashMap__put0__O__O__Z__s_Some(this, elem.S(), elem.a8(), false);
  return this;
});
$p.o = (function() {
  return this.at;
});
$p.n = (function() {
  return (this.at === 0);
});
$p.cs = (function(f) {
  var len = this.t.a.length;
  var i = 0;
  while ((i < len)) {
    var n = this.t.a[i];
    if ((n !== null)) {
      n.cs(f);
    }
    i = ((1 + i) | 0);
  }
});
$p.a7 = (function() {
  return "HashMap";
});
$p.j = (function() {
  if (this.n()) {
    return $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_s_util_hashing_MurmurHash3$().dt;
  } else {
    var tupleHashIterator = new $c_scm_HashMap$$anon$5(this);
    return $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_s_util_hashing_MurmurHash3$().fL(tupleHashIterator, $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_s_util_hashing_MurmurHash3$().cS);
  }
});
$p.aj = (function(elems) {
  return this.f2(elems);
});
$p.ac = (function(elem) {
  return this.gk(elem);
});
function $isArrayOf_scm_HashMap(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.bB)));
}
var $d_scm_HashMap = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$TypeData().i($c_scm_HashMap, "scala.collection.mutable.HashMap", ({
  bB: 1,
  dP: 1,
  aZ: 1,
  h: 1,
  c: 1,
  d: 1,
  g: 1,
  f: 1,
  e: 1,
  j: 1,
  k: 1,
  b9: 1,
  b8: 1,
  b: 1,
  an: 1,
  A: 1,
  u: 1,
  z: 1,
  W: 1,
  X: 1,
  a7: 1,
  aq: 1,
  ed: 1,
  aG: 1,
  o: 1,
  dp: 1,
  a: 1
}));
function $isArrayOf_scm_LinkedHashMap(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.eb)));
}
var $t_Lgpu_painter_BlendMode$__Replace = null;
var $t_Lgpu_painter_BlendMode$__Alpha = null;
var $t_Lgpu_painter_BlendMode$__Additive = null;
var $t_Lgpu_painter_BlendMode$__Multiply = null;
var $t_Lgpu_painter_CullMode$__None = null;
var $t_Lgpu_painter_CullMode$__Front = null;
var $t_Lgpu_painter_CullMode$__Back = null;
var $t_Lgpu_painter_FrontFace$__CCW = null;
var $t_Lgpu_painter_FrontFace$__CW = null;
var $t_Lgpu_painter_PrimitiveTopology$__TriangleList = null;
var $t_Lgpu_painter_PrimitiveTopology$__TriangleStrip = null;
var $t_Lgpu_painter_PrimitiveTopology$__LineList = null;
var $t_Lgpu_painter_PrimitiveTopology$__LineStrip = null;
var $t_Lgpu_painter_PrimitiveTopology$__PointList = null;
let $e_main = (function() {
  $m_Lpainter\uff3ftriangle_PainterTriangle$package$().ct();
});
export { $e_main as main };
