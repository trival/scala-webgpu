'use strict';
import * as $j_java$002elang$002e$002dObject from "./java.lang.-Object.js";
var $p;
/** @constructor */
function $c_Lwebgpu_WebGPU$() {
}
export { $c_Lwebgpu_WebGPU$ as $c_Lwebgpu_WebGPU$ };
$p = $c_Lwebgpu_WebGPU$.prototype = new $j_java$002elang$002e$002dObject.$h_O();
$p.constructor = $c_Lwebgpu_WebGPU$;
/** @constructor */
function $h_Lwebgpu_WebGPU$() {
}
export { $h_Lwebgpu_WebGPU$ as $h_Lwebgpu_WebGPU$ };
$h_Lwebgpu_WebGPU$.prototype = $p;
$p.as = (function() {
  return window.navigator.gpu;
});
$p.ar = (function(canvas) {
  return canvas.getContext("webgpu");
});
var $d_Lwebgpu_WebGPU$ = new $j_java$002elang$002e$002dObject.$TypeData().i($c_Lwebgpu_WebGPU$, "webgpu.WebGPU$", ({
  bd: 1
}));
export { $d_Lwebgpu_WebGPU$ as $d_Lwebgpu_WebGPU$ };
var $n_Lwebgpu_WebGPU$;
function $m_Lwebgpu_WebGPU$() {
  if ((!$n_Lwebgpu_WebGPU$)) {
    $n_Lwebgpu_WebGPU$ = new $c_Lwebgpu_WebGPU$();
  }
  return $n_Lwebgpu_WebGPU$;
}
export { $m_Lwebgpu_WebGPU$ as $m_Lwebgpu_WebGPU$ };
