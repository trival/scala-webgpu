'use strict';
import * as $j_java$002elang$002e$002dObject from "./java.lang.-Object.js";
import * as $j_scala$002eruntime$002e$002dAbstract$002dPartial$002dFunction from "./scala.runtime.-Abstract-Partial-Function.js";
var $p;
/** @constructor */
function $c_Lbuffer\uff3ftriangle_BufferTriangle$$anon$1(setStatus$5) {
  this.d7 = null;
  this.d7 = setStatus$5;
}
export { $c_Lbuffer\uff3ftriangle_BufferTriangle$$anon$1 as $c_Lbuffer\uff3ftriangle_BufferTriangle$$anon$1 };
$p = $c_Lbuffer\uff3ftriangle_BufferTriangle$$anon$1.prototype = new $j_scala$002eruntime$002e$002dAbstract$002dPartial$002dFunction.$h_sr_AbstractPartialFunction();
$p.constructor = $c_Lbuffer\uff3ftriangle_BufferTriangle$$anon$1;
/** @constructor */
function $h_Lbuffer\uff3ftriangle_BufferTriangle$$anon$1() {
}
export { $h_Lbuffer\uff3ftriangle_BufferTriangle$$anon$1 as $h_Lbuffer\uff3ftriangle_BufferTriangle$$anon$1 };
$h_Lbuffer\uff3ftriangle_BufferTriangle$$anon$1.prototype = $p;
$p.dN = (function(x) {
  return ((x instanceof $j_java$002elang$002e$002dObject.$c_ju_NoSuchElementException) || true);
});
$p.cX = (function(x, default$1) {
  if ((x instanceof $j_java$002elang$002e$002dObject.$c_ju_NoSuchElementException)) {
    this.d7.aF(x.cF, true);
  } else {
    this.d7.aF(("WebGPU error: " + x), true);
  }
});
var $d_Lbuffer\uff3ftriangle_BufferTriangle$$anon$1 = new $j_java$002elang$002e$002dObject.$TypeData().i($c_Lbuffer\uff3ftriangle_BufferTriangle$$anon$1, "buffer_triangle.BufferTriangle$$anon$1", ({
  bK: 1,
  bF: 1,
  j: 1,
  k: 1,
  a: 1
}));
export { $d_Lbuffer\uff3ftriangle_BufferTriangle$$anon$1 as $d_Lbuffer\uff3ftriangle_BufferTriangle$$anon$1 };
