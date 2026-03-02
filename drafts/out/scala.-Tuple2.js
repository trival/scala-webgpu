'use strict';
import * as $j_java$002elang$002e$002dObject from "./java.lang.-Object.js";
import * as $j_scala$002e$002dProduct2 from "./scala.-Product2.js";
var $p;
/** @constructor */
function $c_T2(_1, _2) {
  this.bo = null;
  this.bp = null;
  this.bo = _1;
  this.bp = _2;
}
export { $c_T2 as $c_T2 };
$p = $c_T2.prototype = new $j_java$002elang$002e$002dObject.$h_O();
$p.constructor = $c_T2;
/** @constructor */
function $h_T2() {
}
export { $h_T2 as $h_T2 };
$h_T2.prototype = $p;
$p.z = (function() {
  return 2;
});
$p.A = (function(n) {
  return $j_scala$002e$002dProduct2.$f_s_Product2__productElement__I__O(this, n);
});
$p.u = (function() {
  return this.bo;
});
$p.D = (function() {
  return this.bp;
});
$p.m = (function() {
  return (((("(" + this.u()) + ",") + this.D()) + ")");
});
$p.B = (function() {
  return "Tuple2";
});
$p.M = (function() {
  return new $j_java$002elang$002e$002dObject.$c_sr_ScalaRunTime$$anon$1(this);
});
$p.i = (function() {
  return $j_java$002elang$002e$002dObject.$m_s_util_hashing_MurmurHash3$().V(this, (-116390334), true);
});
var $d_T2 = new $j_java$002elang$002e$002dObject.$TypeData().i($c_T2, "scala.Tuple2", ({
  aZ: 1,
  aW: 1,
  F: 1,
  c: 1,
  a: 1
}));
export { $d_T2 as $d_T2 };
