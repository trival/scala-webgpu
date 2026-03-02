'use strict';
import * as $j_java$002elang$002e$002dObject from "./java.lang.-Object.js";
import * as $j_scala$002escalajs$002ejs$002e$002dDynamic from "./scala.scalajs.js.-Dynamic.js";
import * as $j_scala$002escalajs$002ejs$002e$002dObject from "./scala.scalajs.js.-Object.js";
import * as $j_scala$002escalajs$002ejs$002e$002dWrapped$002dDictionary$0024$002dCache$0024 from "./scala.scalajs.js.-Wrapped-Dictionary$-Cache$.js";
import * as $j_scala$002escalajs$002eruntime$002e$002dCompat$0024 from "./scala.scalajs.runtime.-Compat$.js";
import * as $j_webgpu$002e$002dG$002dP$002dU$002dCommand$002dBuffer from "./webgpu.-G-P-U-Command-Buffer.js";
var $p;
function $p_Lgpu_painter_Painter__pipelineKeyStr__Lgpu_painter_Shape__T__T($thiz, shape, format) {
  var s = shape.X;
  var f = shape.P;
  return ((((((((((s.bh + "|") + (shape.ao === (void 0))) + "|") + shape.aR) + "|") + f.aN) + "|") + f.aM) + "|") + format);
}
export { $p_Lgpu_painter_Painter__pipelineKeyStr__Lgpu_painter_Shape__T__T as $p_Lgpu_painter_Painter__pipelineKeyStr__Lgpu_painter_Shape__T__T };
function $p_Lgpu_painter_Painter__createPipeline__Lgpu_painter_Shape__Lwebgpu_GPURenderPipeline($thiz, shape) {
  var shade = shape.X;
  if ((shape.ao === (void 0))) {
    var s = $thiz.al;
    var target = ({
      "format": s
    });
  } else {
    var s$1 = $thiz.al;
    var opt$proxy1 = shape.ao;
    var target = ({
      "format": s$1,
      "blend": opt$proxy1
    });
  }
  if ((shade.aQ !== null)) {
    var _2 = shade.am;
    var items$proxy4 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().c(new ($j_scala$002escalajs$002ejs$002e$002dDynamic.$d_sjs_js_Dynamic.r().C)([shade.aQ]));
    var _2$1 = [...$j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy4)];
    var vertexDescriptor = ({
      "module": _2,
      "entryPoint": "vs_main",
      "buffers": _2$1
    });
  } else {
    var _2$2 = shade.am;
    var vertexDescriptor = ({
      "module": _2$2,
      "entryPoint": "vs_main"
    });
  }
  var $x_1 = $thiz.H;
  var _2$3 = shade.bi;
  var _2$4 = shade.am;
  var items$proxy5 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().c(new ($j_scala$002escalajs$002ejs$002e$002dDynamic.$d_sjs_js_Dynamic.r().C)([target]));
  var _2$5 = [...$j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy5)];
  var _2$6 = ({
    "module": _2$4,
    "entryPoint": "fs_main",
    "targets": _2$5
  });
  var t$proxy1 = shape.P.aN;
  var c$proxy1 = shape.aR;
  var f$proxy1 = shape.P.aM;
  var _2$7 = ({
    "topology": t$proxy1,
    "cullMode": c$proxy1,
    "frontFace": f$proxy1
  });
  return $x_1.createRenderPipeline(({
    "layout": _2$3,
    "vertex": vertexDescriptor,
    "fragment": _2$6,
    "primitive": _2$7
  }));
}
export { $p_Lgpu_painter_Painter__createPipeline__Lgpu_painter_Shape__Lwebgpu_GPURenderPipeline as $p_Lgpu_painter_Painter__createPipeline__Lgpu_painter_Shape__Lwebgpu_GPURenderPipeline };
function $p_Lgpu_painter_Painter__createBindGroup__Lgpu_painter_Shape__Lwebgpu_GPUBindGroup($thiz, shape) {
  var items$proxy6 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().c(new ($j_scala$002escalajs$002ejs$002e$002dDynamic.$d_sjs_js_Dynamic.r().C)([]));
  var entries = [...$j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy6)];
  var i = 0;
  while ((i < (shape.an.length | 0))) {
    var b = shape.an[i];
    if ((b !== null)) {
      var value = i;
      var _2 = b.ai;
      var _2$1 = ({
        "buffer": _2
      });
      entries.push(({
        "binding": value,
        "resource": _2$1
      }));
    }
    i = ((1 + i) | 0);
  }
  var $x_1 = $thiz.H;
  var _2$2 = shape.X.aP;
  return $x_1.createBindGroup(({
    "layout": _2$2,
    "entries": entries
  }));
}
export { $p_Lgpu_painter_Painter__createBindGroup__Lgpu_painter_Shape__Lwebgpu_GPUBindGroup as $p_Lgpu_painter_Painter__createBindGroup__Lgpu_painter_Shape__Lwebgpu_GPUBindGroup };
/** @constructor */
function $c_Lgpu_painter_Painter(device, queue, canvas, context, preferredFormat) {
  this.H = null;
  this.aO = null;
  this.bg = null;
  this.al = null;
  this.ak = null;
  this.aj = 0;
  this.H = device;
  this.aO = queue;
  this.bg = context;
  this.al = preferredFormat;
  this.ak = ({});
  this.aj = 0;
}
export { $c_Lgpu_painter_Painter as $c_Lgpu_painter_Painter };
$p = $c_Lgpu_painter_Painter.prototype = new $j_java$002elang$002e$002dObject.$h_O();
$p.constructor = $c_Lgpu_painter_Painter;
/** @constructor */
function $h_Lgpu_painter_Painter() {
}
export { $h_Lgpu_painter_Painter as $h_Lgpu_painter_Painter };
$h_Lgpu_painter_Painter.prototype = $p;
$p.c3 = (function(shape, clearColor) {
  var encoder = this.H.createCommandEncoder();
  var textureView = this.bg.getCurrentTexture().createView();
  if ((clearColor !== (void 0))) {
    matchResult2: {
      var \u03b44$;
      if ((clearColor !== null)) {
        var \u03b44$ = clearColor;
        break matchResult2;
      }
      throw new $j_java$002elang$002e$002dObject.$c_s_MatchError(clearColor);
    }
    var r = (+\u03b44$.aw);
    var g = (+\u03b44$.ax);
    var b = (+\u03b44$.ay);
    var a = (+\u03b44$.az);
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
  var items$proxy2 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().L(new ($j_scala$002escalajs$002ejs$002e$002dObject.$d_sjs_js_Object.r().C)([colorAttachment]));
  var _2$1 = [...$j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy2)];
  var pass = encoder.beginRenderPass(({
    "colorAttachments": _2$1
  }));
  var cacheKey = $p_Lgpu_painter_Painter__pipelineKeyStr__Lgpu_painter_Shape__T__T(this, shape, this.al);
  if ((!(!(!(!this.ak.hasOwnProperty(cacheKey)))))) {
    var dict = this.ak;
    if ((!(!(!$j_scala$002escalajs$002ejs$002e$002dWrapped$002dDictionary$0024$002dCache$0024.$m_sjs_js_WrappedDictionary$Cache$().bA.call(dict, cacheKey))))) {
      throw new $j_java$002elang$002e$002dObject.$c_ju_NoSuchElementException(("key not found: " + cacheKey));
    }
    var pipeline = dict[cacheKey];
  } else {
    var p = $p_Lgpu_painter_Painter__createPipeline__Lgpu_painter_Shape__Lwebgpu_GPURenderPipeline(this, shape);
    var dict$1 = this.ak;
    dict$1[cacheKey] = p;
    var pipeline = p;
  }
  pass.setPipeline(pipeline);
  if ((((shape.an.length | 0) > 0) && (shape.X.aP !== null))) {
    var bindGroup = $p_Lgpu_painter_Painter__createBindGroup__Lgpu_painter_Shape__Lwebgpu_GPUBindGroup(this, shape);
    pass.setBindGroup(0, bindGroup);
  }
  pass.setVertexBuffer(0, shape.P.be);
  pass.draw(shape.P.bf);
  pass.end();
  var $x_1 = this.aO;
  var items$proxy3 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().c(new ($j_webgpu$002e$002dG$002dP$002dU$002dCommand$002dBuffer.$d_Lwebgpu_GPUCommandBuffer.r().C)([encoder.finish()]));
  $x_1.submit([...$j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy3)]);
});
var $d_Lgpu_painter_Painter = new $j_java$002elang$002e$002dObject.$TypeData().i($c_Lgpu_painter_Painter, "gpu.painter.Painter", ({
  ao: 1
}));
export { $d_Lgpu_painter_Painter as $d_Lgpu_painter_Painter };
