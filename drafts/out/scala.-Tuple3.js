'use strict';
import * as $j_java$002elang$002e$002dObject from "./java.lang.-Object.js";
import * as $j_scala$002e$002dProduct3 from "./scala.-Product3.js";
var $p;
/** @constructor */
function $c_T3(_1, _2, _3) {
  this.bB = null;
  this.bC = null;
  this.bD = null;
  this.bB = _1;
  this.bC = _2;
  this.bD = _3;
}
export { $c_T3 as $c_T3 };
$p = $c_T3.prototype = new $j_java$002elang$002e$002dObject.$h_O();
$p.constructor = $c_T3;
/** @constructor */
function $h_T3() {
}
export { $h_T3 as $h_T3 };
$h_T3.prototype = $p;
$p.am = (function() {
  return new $j_java$002elang$002e$002dObject.$c_s_Product$$anon$1(this);
});
$p.H = (function() {
  return 3;
});
$p.I = (function(n) {
  return $j_scala$002e$002dProduct3.$f_s_Product3__productElement__I__O(this, n);
});
$p.j = (function() {
  return $j_java$002elang$002e$002dObject.$m_s_util_hashing_MurmurHash3$().bS(this, (-192629203), true);
});
$p.h = (function(x$0) {
  return ((this === x$0) || ((x$0 instanceof $c_T3) && (($j_java$002elang$002e$002dObject.$m_sr_BoxesRunTime$().O(this.bB, x$0.bB) && $j_java$002elang$002e$002dObject.$m_sr_BoxesRunTime$().O(this.bC, x$0.bC)) && $j_java$002elang$002e$002dObject.$m_sr_BoxesRunTime$().O(this.bD, x$0.bD))));
});
$p.J = (function() {
  return "Tuple3";
});
$p.m = (function() {
  return (((((("(" + this.bB) + ",") + this.bC) + ",") + this.bD) + ")");
});
function $isArrayOf_T3(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.aX)));
}
export { $isArrayOf_T3 as $isArrayOf_T3 };
var $d_T3 = new $j_java$002elang$002e$002dObject.$TypeData().i($c_T3, "scala.Tuple3", ({
  aX: 1,
  b: 1,
  r: 1,
  d3: 1,
  a: 1
}));
export { $d_T3 as $d_T3 };
