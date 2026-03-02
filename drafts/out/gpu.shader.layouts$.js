'use strict';
import * as $j_java$002elang$002e$002dObject from "./java.lang.-Object.js";
import * as $j_scala$002escalajs$002eruntime$002e$002dCompat$0024 from "./scala.scalajs.runtime.-Compat$.js";
var $p;
function $p_Lgpu_shader_layouts$__calculateOffsets__sjs_js_Array__sjs_js_Array($thiz, sizes) {
  var items$proxy1 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().bw(new $j_java$002elang$002e$002dObject.$ac_I(new Int32Array([])));
  var offsets = [...$j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy1)];
  var elem = 0;
  elem = 0;
  var len = (sizes.length | 0);
  var i = 0;
  while ((i < len)) {
    var x0 = sizes[i];
    var size = (x0 | 0);
    offsets.push(elem);
    elem = ((elem + size) | 0);
    i = ((1 + i) | 0);
  }
  return offsets;
}
export { $p_Lgpu_shader_layouts$__calculateOffsets__sjs_js_Array__sjs_js_Array as $p_Lgpu_shader_layouts$__calculateOffsets__sjs_js_Array__sjs_js_Array };
function $p_Lgpu_shader_layouts$__calculateStride__sjs_js_Array__I($thiz, sizes) {
  var elem = 0;
  elem = 0;
  var len = (sizes.length | 0);
  var i = 0;
  while ((i < len)) {
    var x0 = sizes[i];
    var size = (x0 | 0);
    elem = ((elem + size) | 0);
    i = ((1 + i) | 0);
  }
  return elem;
}
export { $p_Lgpu_shader_layouts$__calculateStride__sjs_js_Array__I as $p_Lgpu_shader_layouts$__calculateStride__sjs_js_Array__I };
/** @constructor */
function $c_Lgpu_shader_layouts$() {
}
export { $c_Lgpu_shader_layouts$ as $c_Lgpu_shader_layouts$ };
$p = $c_Lgpu_shader_layouts$.prototype = new $j_java$002elang$002e$002dObject.$h_O();
$p.constructor = $c_Lgpu_shader_layouts$;
/** @constructor */
function $h_Lgpu_shader_layouts$() {
}
export { $h_Lgpu_shader_layouts$ as $h_Lgpu_shader_layouts$ };
$h_Lgpu_shader_layouts$.prototype = $p;
$p.fd = (function(device, bindGroupLayouts) {
  return device.createPipelineLayout(({
    "bindGroupLayouts": bindGroupLayouts
  }));
});
var $d_Lgpu_shader_layouts$ = new $j_java$002elang$002e$002dObject.$TypeData().i($c_Lgpu_shader_layouts$, "gpu.shader.layouts$", ({
  cj: 1
}));
export { $d_Lgpu_shader_layouts$ as $d_Lgpu_shader_layouts$ };
var $n_Lgpu_shader_layouts$;
function $m_Lgpu_shader_layouts$() {
  if ((!$n_Lgpu_shader_layouts$)) {
    $n_Lgpu_shader_layouts$ = new $c_Lgpu_shader_layouts$();
  }
  return $n_Lgpu_shader_layouts$;
}
export { $m_Lgpu_shader_layouts$ as $m_Lgpu_shader_layouts$ };
