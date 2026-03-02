'use strict';
import * as $j_java$002elang$002e$002dObject from "./java.lang.-Object.js";
import * as $j_scala$002e$002dProduct4 from "./scala.-Product4.js";
var $p;
/** @constructor */
function $c_T4(_1, _2, _3, _4) {
  this.aw = null;
  this.ax = null;
  this.ay = null;
  this.az = null;
  this.aw = _1;
  this.ax = _2;
  this.ay = _3;
  this.az = _4;
}
export { $c_T4 as $c_T4 };
$p = $c_T4.prototype = new $j_java$002elang$002e$002dObject.$h_O();
$p.constructor = $c_T4;
/** @constructor */
function $h_T4() {
}
export { $h_T4 as $h_T4 };
$h_T4.prototype = $p;
$p.M = (function() {
  return new $j_java$002elang$002e$002dObject.$c_s_Product$$anon$1(this);
});
$p.z = (function() {
  return 4;
});
$p.A = (function(n) {
  return $j_scala$002e$002dProduct4.$f_s_Product4__productElement__I__O(this, n);
});
$p.i = (function() {
  return $j_java$002elang$002e$002dObject.$m_s_util_hashing_MurmurHash3$().V(this, (-1542739752), true);
});
$p.B = (function() {
  return "Tuple4";
});
$p.m = (function() {
  return (((((((("(" + this.aw) + ",") + this.ax) + ",") + this.ay) + ",") + this.az) + ")");
});
var $d_T4 = new $j_java$002elang$002e$002dObject.$TypeData().i($c_T4, "scala.Tuple4", ({
  b1: 1,
  c: 1,
  F: 1,
  aY: 1,
  a: 1
}));
export { $d_T4 as $d_T4 };
