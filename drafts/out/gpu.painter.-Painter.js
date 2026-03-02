'use strict';
import * as $j_gpu$002epainter$002e$002dPipeline$002dKey from "./gpu.painter.-Pipeline-Key.js";
import * as $j_java$002elang$002e$002dObject from "./java.lang.-Object.js";
import * as $j_scala$002e$002dNone$0024 from "./scala.-None$.js";
import * as $j_scala$002e$002dSome from "./scala.-Some.js";
import * as $j_scala$002ecollection$002eimmutable$002e$002dSeq$0024 from "./scala.collection.immutable.-Seq$.js";
import * as $j_scala$002ecollection$002emutable$002e$002dHash$002dMap from "./scala.collection.mutable.-Hash-Map.js";
import * as $j_scala$002ecollection$002emutable$002e$002dHash$002dMap$0024 from "./scala.collection.mutable.-Hash-Map$.js";
import * as $j_scala$002escalajs$002ejs$002e$002dDynamic from "./scala.scalajs.js.-Dynamic.js";
import * as $j_scala$002escalajs$002ejs$002e$002dObject from "./scala.scalajs.js.-Object.js";
import * as $j_scala$002escalajs$002eruntime$002e$002dCompat$0024 from "./scala.scalajs.runtime.-Compat$.js";
import * as $j_webgpu$002e$002dG$002dP$002dU$002dCommand$002dBuffer from "./webgpu.-G-P-U-Command-Buffer.js";
var $p;
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
      throw new $j_java$002elang$002e$002dObject.$c_ju_NoSuchElementException("undefined.get");
    }
    var target = ({
      "format": s$1,
      "blend": blendState
    });
  }
  if ((shade.db !== null)) {
    var _2 = shade.cD;
    var items$proxy3 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().d(new ($j_scala$002escalajs$002ejs$002e$002dDynamic.$d_sjs_js_Dynamic.r().C)([shade.db]));
    var _2$1 = [...$j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy3)];
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
  var items$proxy4 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().d(new ($j_scala$002escalajs$002ejs$002e$002dDynamic.$d_sjs_js_Dynamic.r().C)([target]));
  var _2$5 = [...$j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy4)];
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
export { $p_Lgpu_painter_Painter__createPipeline__Lgpu_painter_Shape__Lgpu_painter_PipelineKey__Lwebgpu_GPURenderPipeline as $p_Lgpu_painter_Painter__createPipeline__Lgpu_painter_Shape__Lgpu_painter_PipelineKey__Lwebgpu_GPURenderPipeline };
function $p_Lgpu_painter_Painter__createBindGroup__Lgpu_painter_Shape__Lwebgpu_GPUBindGroup($thiz, shape) {
  var this$1 = shape.dc;
  var entries = $j_java$002elang$002e$002dObject.$f_sc_SeqOps__sortBy__F1__s_math_Ordering__O($j_scala$002ecollection$002eimmutable$002e$002dSeq$0024.$m_sci_Seq$().dG(this$1), new $j_java$002elang$002e$002dObject.$c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28(((_$1$2) => (_$1$2.S() | 0))), $j_java$002elang$002e$002dObject.$m_s_math_Ordering$Int$()).P(new $j_java$002elang$002e$002dObject.$c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28(((x$1$2) => {
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
  var _2$3 = [...$j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(entries)];
  return $x_1.createBindGroup(({
    "layout": _2$2,
    "entries": _2$3
  }));
}
export { $p_Lgpu_painter_Painter__createBindGroup__Lgpu_painter_Shape__Lwebgpu_GPUBindGroup as $p_Lgpu_painter_Painter__createBindGroup__Lgpu_painter_Shape__Lwebgpu_GPUBindGroup };
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
  this.eb = $j_scala$002ecollection$002emutable$002e$002dHash$002dMap$0024.$m_scm_HashMap$().gL(new $j_java$002elang$002e$002dObject.$c_sjsr_WrappedVarArgs([]));
  this.cC = 0;
}
export { $c_Lgpu_painter_Painter as $c_Lgpu_painter_Painter };
$p = $c_Lgpu_painter_Painter.prototype = new $j_java$002elang$002e$002dObject.$h_O();
$p.constructor = $c_Lgpu_painter_Painter;
/** @constructor */
function $h_Lgpu_painter_Painter() {
}
export { $h_Lgpu_painter_Painter as $h_Lgpu_painter_Painter };
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
      throw new $j_java$002elang$002e$002dObject.$c_s_MatchError(x8);
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
  var items$proxy1 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().bu(new ($j_scala$002escalajs$002ejs$002e$002dObject.$d_sjs_js_Object.r().C)([colorAttachment]));
  var _2$1 = [...$j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy1)];
  var pass = encoder.beginRenderPass(({
    "colorAttachments": _2$1
  }));
  var key = new $j_gpu$002epainter$002e$002dPipeline$002dKey.$c_Lgpu_painter_PipelineKey(shape.bZ.ed, shape.ef, shape.eg, shape.bY.e7, shape.bY.e6, this.ec);
  var this$40 = this.eb;
  var f = (() => $p_Lgpu_painter_Painter__createPipeline__Lgpu_painter_Shape__Lgpu_painter_PipelineKey__Lwebgpu_GPURenderPipeline(this, shape, key));
  if ((!($j_java$002elang$002e$002dObject.$objectGetClass(this$40) === $j_scala$002ecollection$002emutable$002e$002dHash$002dMap.$d_scm_HashMap.l()))) {
    matchResult2: {
      var pipeline;
      var x12 = this$40.dH(key);
      if ((x12 instanceof $j_scala$002e$002dSome.$c_s_Some)) {
        var pipeline = x12.b0;
        break matchResult2;
      }
      if (($j_scala$002e$002dNone$0024.$m_s_None$() === x12)) {
        var d = f();
        $j_scala$002ecollection$002emutable$002e$002dHash$002dMap.$p_scm_HashMap__put0__O__O__Z__s_Some(this$40, key, d, false);
        var pipeline = d;
        break matchResult2;
      }
      throw new $j_java$002elang$002e$002dObject.$c_s_MatchError(x12);
    }
  } else {
    var originalHash = $j_java$002elang$002e$002dObject.$m_sr_Statics$().u(key);
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
        $j_scala$002ecollection$002emutable$002e$002dHash$002dMap.$p_scm_HashMap__growTable__I__V(this$40, (this$40.t.a.length << 1));
      }
      $j_scala$002ecollection$002emutable$002e$002dHash$002dMap.$p_scm_HashMap__put0__O__O__Z__I__I__s_Some(this$40, key, default$1, false, hash, ((table0 === this$40.t) ? idx : (hash & ((this$40.t.a.length - 1) | 0))));
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
  var items$proxy2 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().d(new ($j_webgpu$002e$002dG$002dP$002dU$002dCommand$002dBuffer.$d_Lwebgpu_GPUCommandBuffer.r().C)([encoder.finish()]));
  $x_1.submit([...$j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy2)]);
});
var $d_Lgpu_painter_Painter = new $j_java$002elang$002e$002dObject.$TypeData().i($c_Lgpu_painter_Painter, "gpu.painter.Painter", ({
  c8: 1
}));
export { $d_Lgpu_painter_Painter as $d_Lgpu_painter_Painter };
