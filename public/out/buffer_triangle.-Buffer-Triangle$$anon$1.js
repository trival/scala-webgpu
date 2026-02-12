'use strict';
import * as $j_java$002elang$002e$002dObject from "./java.lang.-Object.js";
import * as $j_java$002eutil$002e$002dNo$002dSuch$002dElement$002dException from "./java.util.-No-Such-Element-Exception.js";
import * as $j_scala$002eruntime$002e$002dAbstract$002dPartial$002dFunction from "./scala.runtime.-Abstract-Partial-Function.js";
var $p;
/** @constructor */
function $c_Lbuffer\uff3ftriangle_BufferTriangle$$anon$1(setStatus$5) {
  this.a0 = null;
  this.a0 = setStatus$5;
}
export { $c_Lbuffer\uff3ftriangle_BufferTriangle$$anon$1 as $c_Lbuffer\uff3ftriangle_BufferTriangle$$anon$1 };
$p = $c_Lbuffer\uff3ftriangle_BufferTriangle$$anon$1.prototype = new $j_scala$002eruntime$002e$002dAbstract$002dPartial$002dFunction.$h_sr_AbstractPartialFunction();
$p.constructor = $c_Lbuffer\uff3ftriangle_BufferTriangle$$anon$1;
/** @constructor */
function $h_Lbuffer\uff3ftriangle_BufferTriangle$$anon$1() {
}
export { $h_Lbuffer\uff3ftriangle_BufferTriangle$$anon$1 as $h_Lbuffer\uff3ftriangle_BufferTriangle$$anon$1 };
$h_Lbuffer\uff3ftriangle_BufferTriangle$$anon$1.prototype = $p;
$p.a6 = (function(x) {
  return true;
});
$p.W = (function(x, default$1) {
  if ((x instanceof $j_java$002eutil$002e$002dNo$002dSuch$002dElement$002dException.$c_ju_NoSuchElementException)) {
    this.a0.u(x.M, true);
  } else {
    this.a0.u(("WebGPU error: " + x), true);
  }
});
var $d_Lbuffer\uff3ftriangle_BufferTriangle$$anon$1 = new $j_java$002elang$002e$002dObject.$TypeData().i($c_Lbuffer\uff3ftriangle_BufferTriangle$$anon$1, "buffer_triangle.BufferTriangle$$anon$1", ({
  W: 1,
  U: 1,
  g: 1,
  l: 1,
  a: 1
}));
export { $d_Lbuffer\uff3ftriangle_BufferTriangle$$anon$1 as $d_Lbuffer\uff3ftriangle_BufferTriangle$$anon$1 };
