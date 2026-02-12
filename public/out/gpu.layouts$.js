'use strict';
import * as $j_java$002elang$002e$002dObject from "./java.lang.-Object.js";
var $p;
function $p_Lgpu_layouts$__calculateOffsets__sjs_js_Array__sjs_js_Array($thiz, sizes) {
  var offsets = [];
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
export { $p_Lgpu_layouts$__calculateOffsets__sjs_js_Array__sjs_js_Array as $p_Lgpu_layouts$__calculateOffsets__sjs_js_Array__sjs_js_Array };
function $p_Lgpu_layouts$__calculateStride__sjs_js_Array__I($thiz, sizes) {
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
export { $p_Lgpu_layouts$__calculateStride__sjs_js_Array__I as $p_Lgpu_layouts$__calculateStride__sjs_js_Array__I };
/** @constructor */
function $c_Lgpu_layouts$() {
}
export { $c_Lgpu_layouts$ as $c_Lgpu_layouts$ };
$p = $c_Lgpu_layouts$.prototype = new $j_java$002elang$002e$002dObject.$h_O();
$p.constructor = $c_Lgpu_layouts$;
/** @constructor */
function $h_Lgpu_layouts$() {
}
export { $h_Lgpu_layouts$ as $h_Lgpu_layouts$ };
$h_Lgpu_layouts$.prototype = $p;
var $d_Lgpu_layouts$ = new $j_java$002elang$002e$002dObject.$TypeData().i($c_Lgpu_layouts$, "gpu.layouts$", ({
  Z: 1
}));
export { $d_Lgpu_layouts$ as $d_Lgpu_layouts$ };
var $n_Lgpu_layouts$;
function $m_Lgpu_layouts$() {
  if ((!$n_Lgpu_layouts$)) {
    $n_Lgpu_layouts$ = new $c_Lgpu_layouts$();
  }
  return $n_Lgpu_layouts$;
}
export { $m_Lgpu_layouts$ as $m_Lgpu_layouts$ };
