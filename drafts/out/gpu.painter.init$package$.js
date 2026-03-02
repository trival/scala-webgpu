'use strict';
import * as $j_gpu$002epainter$002e$002dPainter from "./gpu.painter.-Painter.js";
import * as $j_java$002elang$002e$002dObject from "./java.lang.-Object.js";
import * as $j_scala$002eruntime$002e$002dAbstract$002dFunction1$002e$0024$0024$002dLambda$002470e1780b84463d18653aacefee3ab989ac625f28 from "./scala.runtime.-Abstract-Function1.$$-Lambda$70e1780b84463d18653aacefee3ab989ac625f28.js";
import * as $j_scala$002escalajs$002ejs$002e$002dAny$0024 from "./scala.scalajs.js.-Any$.js";
import * as $j_webgpu$002e$002dWeb$002dG$002dP$002dU$0024 from "./webgpu.-Web-G-P-U$.js";
var $p;
/** @constructor */
function $c_Lgpu_painter_init$package$() {
}
export { $c_Lgpu_painter_init$package$ as $c_Lgpu_painter_init$package$ };
$p = $c_Lgpu_painter_init$package$.prototype = new $j_java$002elang$002e$002dObject.$h_O();
$p.constructor = $c_Lgpu_painter_init$package$;
/** @constructor */
function $h_Lgpu_painter_init$package$() {
}
export { $h_Lgpu_painter_init$package$ as $h_Lgpu_painter_init$package$ };
$h_Lgpu_painter_init$package$.prototype = $p;
$p.c9 = (function(canvas, init) {
  var gpuOpt = $j_webgpu$002e$002dWeb$002dG$002dP$002dU$0024.$m_Lwebgpu_WebGPU$().aX();
  if ((gpuOpt === (void 0))) {
    return Promise.reject(new $j_java$002elang$002e$002dObject.$c_sjs_js_JavaScriptException(Error("WebGPU is not supported")));
  } else {
    var promise$proxy1 = gpuOpt.requestAdapter();
    var promise$proxy3 = promise$proxy1.then(((value$2) => {
      if ((value$2 === null)) {
        throw new $j_java$002elang$002e$002dObject.$c_ju_NoSuchElementException("Failed to get WebGPU adapter");
      } else {
        return value$2;
      }
    }));
    var f$proxy2 = new $j_scala$002eruntime$002e$002dAbstract$002dFunction1$002e$0024$0024$002dLambda$002470e1780b84463d18653aacefee3ab989ac625f28.$c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28(((adapter$2) => {
      var promise$proxy2 = adapter$2.requestDevice();
      var f$proxy1 = new $j_scala$002eruntime$002e$002dAbstract$002dFunction1$002e$0024$0024$002dLambda$002470e1780b84463d18653aacefee3ab989ac625f28.$c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28(((device$3) => {
        var queue = device$3.queue;
        var context = $j_webgpu$002e$002dWeb$002dG$002dP$002dU$0024.$m_Lwebgpu_WebGPU$().aW(canvas);
        var format = gpuOpt.getPreferredCanvasFormat();
        context.configure(({
          "device": device$3,
          "format": format
        }));
        var painter = new $j_gpu$002epainter$002e$002dPainter.$c_Lgpu_painter_Painter(device$3, queue, canvas, context, format);
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
        init.j(painter);
      }));
      return promise$proxy2.then($j_scala$002escalajs$002ejs$002e$002dAny$0024.$m_sjs_js_Any$().U(f$proxy1));
    }));
    return promise$proxy3.then($j_scala$002escalajs$002ejs$002e$002dAny$0024.$m_sjs_js_Any$().U(f$proxy2));
  }
});
var $d_Lgpu_painter_init$package$ = new $j_java$002elang$002e$002dObject.$TypeData().i($c_Lgpu_painter_init$package$, "gpu.painter.init$package$", ({
  as: 1
}));
export { $d_Lgpu_painter_init$package$ as $d_Lgpu_painter_init$package$ };
var $n_Lgpu_painter_init$package$;
function $m_Lgpu_painter_init$package$() {
  if ((!$n_Lgpu_painter_init$package$)) {
    $n_Lgpu_painter_init$package$ = new $c_Lgpu_painter_init$package$();
  }
  return $n_Lgpu_painter_init$package$;
}
export { $m_Lgpu_painter_init$package$ as $m_Lgpu_painter_init$package$ };
