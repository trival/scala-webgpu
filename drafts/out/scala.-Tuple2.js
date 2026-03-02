'use strict';
import * as $j_java$002elang$002e$002dObject from "./java.lang.-Object.js";
import * as $j_scala$002e$002dProduct2 from "./scala.-Product2.js";
var $p;
/** @constructor */
function $c_T2(_1, _2) {
  this.eo = null;
  this.ep = null;
  this.eo = _1;
  this.ep = _2;
}
export { $c_T2 as $c_T2 };
$p = $c_T2.prototype = new $j_java$002elang$002e$002dObject.$h_O();
$p.constructor = $c_T2;
/** @constructor */
function $h_T2() {
}
export { $h_T2 as $h_T2 };
$h_T2.prototype = $p;
$p.H = (function() {
  return 2;
});
$p.I = (function(n) {
  return $j_scala$002e$002dProduct2.$f_s_Product2__productElement__I__O(this, n);
});
$p.S = (function() {
  return this.eo;
});
$p.a8 = (function() {
  return this.ep;
});
$p.m = (function() {
  return (((("(" + this.S()) + ",") + this.a8()) + ")");
});
$p.J = (function() {
  return "Tuple2";
});
$p.am = (function() {
  return new $j_java$002elang$002e$002dObject.$c_sr_ScalaRunTime$$anon$1(this);
});
$p.j = (function() {
  return $j_java$002elang$002e$002dObject.$m_s_util_hashing_MurmurHash3$().bS(this, (-116390334), true);
});
$p.h = (function(x$1) {
  return ((this === x$1) || ((x$1 instanceof $c_T2) && ($j_java$002elang$002e$002dObject.$m_sr_BoxesRunTime$().O(this.S(), x$1.S()) && $j_java$002elang$002e$002dObject.$m_sr_BoxesRunTime$().O(this.a8(), x$1.a8()))));
});
function $isArrayOf_T2(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.aW)));
}
export { $isArrayOf_T2 as $isArrayOf_T2 };
var $d_T2 = new $j_java$002elang$002e$002dObject.$TypeData().i($c_T2, "scala.Tuple2", ({
  aW: 1,
  d2: 1,
  r: 1,
  b: 1,
  a: 1
}));
export { $d_T2 as $d_T2 };
