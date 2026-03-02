'use strict';
import * as $j_java$002elang$002e$002dObject from "./java.lang.-Object.js";
import * as $j_scala$002e$002dProduct4 from "./scala.-Product4.js";
var $p;
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
export { $c_T4 as $c_T4 };
$p = $c_T4.prototype = new $j_java$002elang$002e$002dObject.$h_O();
$p.constructor = $c_T4;
/** @constructor */
function $h_T4() {
}
export { $h_T4 as $h_T4 };
$h_T4.prototype = $p;
$p.am = (function() {
  return new $j_java$002elang$002e$002dObject.$c_s_Product$$anon$1(this);
});
$p.H = (function() {
  return 4;
});
$p.I = (function(n) {
  return $j_scala$002e$002dProduct4.$f_s_Product4__productElement__I__O(this, n);
});
$p.j = (function() {
  return $j_java$002elang$002e$002dObject.$m_s_util_hashing_MurmurHash3$().bS(this, (-1542739752), true);
});
$p.h = (function(x$0) {
  return ((this === x$0) || ((x$0 instanceof $c_T4) && ((($j_java$002elang$002e$002dObject.$m_sr_BoxesRunTime$().O(this.bE, x$0.bE) && $j_java$002elang$002e$002dObject.$m_sr_BoxesRunTime$().O(this.bF, x$0.bF)) && $j_java$002elang$002e$002dObject.$m_sr_BoxesRunTime$().O(this.bG, x$0.bG)) && $j_java$002elang$002e$002dObject.$m_sr_BoxesRunTime$().O(this.bH, x$0.bH))));
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
export { $isArrayOf_T4 as $isArrayOf_T4 };
var $d_T4 = new $j_java$002elang$002e$002dObject.$TypeData().i($c_T4, "scala.Tuple4", ({
  aY: 1,
  b: 1,
  r: 1,
  d4: 1,
  a: 1
}));
export { $d_T4 as $d_T4 };
