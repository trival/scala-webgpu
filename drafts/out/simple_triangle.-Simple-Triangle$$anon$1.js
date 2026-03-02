'use strict';
import * as $j_java$002elang$002e$002dObject from "./java.lang.-Object.js";
import * as $j_scala$002eruntime$002e$002dAbstract$002dPartial$002dFunction from "./scala.runtime.-Abstract-Partial-Function.js";
var $p;
/** @constructor */
function $c_Lsimple\uff3ftriangle_SimpleTriangle$$anon$1(setStatus$5) {
  this.du = null;
  this.du = setStatus$5;
}
export { $c_Lsimple\uff3ftriangle_SimpleTriangle$$anon$1 as $c_Lsimple\uff3ftriangle_SimpleTriangle$$anon$1 };
$p = $c_Lsimple\uff3ftriangle_SimpleTriangle$$anon$1.prototype = new $j_scala$002eruntime$002e$002dAbstract$002dPartial$002dFunction.$h_sr_AbstractPartialFunction();
$p.constructor = $c_Lsimple\uff3ftriangle_SimpleTriangle$$anon$1;
/** @constructor */
function $h_Lsimple\uff3ftriangle_SimpleTriangle$$anon$1() {
}
export { $h_Lsimple\uff3ftriangle_SimpleTriangle$$anon$1 as $h_Lsimple\uff3ftriangle_SimpleTriangle$$anon$1 };
$h_Lsimple\uff3ftriangle_SimpleTriangle$$anon$1.prototype = $p;
$p.dN = (function(x) {
  return ((x instanceof $j_java$002elang$002e$002dObject.$c_ju_NoSuchElementException) || true);
});
$p.cX = (function(x, default$1) {
  if ((x instanceof $j_java$002elang$002e$002dObject.$c_ju_NoSuchElementException)) {
    this.du.aF(x.cF, true);
  } else {
    this.du.aF(("WebGPU error: " + x), true);
  }
});
var $d_Lsimple\uff3ftriangle_SimpleTriangle$$anon$1 = new $j_java$002elang$002e$002dObject.$TypeData().i($c_Lsimple\uff3ftriangle_SimpleTriangle$$anon$1, "simple_triangle.SimpleTriangle$$anon$1", ({
  fv: 1,
  bF: 1,
  j: 1,
  k: 1,
  a: 1
}));
export { $d_Lsimple\uff3ftriangle_SimpleTriangle$$anon$1 as $d_Lsimple\uff3ftriangle_SimpleTriangle$$anon$1 };
