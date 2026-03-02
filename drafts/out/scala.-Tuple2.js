'use strict';
import * as $j_java$002elang$002e$002dObject from "./java.lang.-Object.js";
import * as $j_scala$002e$002dProduct2 from "./scala.-Product2.js";
var $p;
/** @constructor */
function $c_T2(_1, _2) {
  this.bq = null;
  this.br = null;
  this.bq = _1;
  this.br = _2;
}
export { $c_T2 as $c_T2 };
$p = $c_T2.prototype = new $j_java$002elang$002e$002dObject.$h_O();
$p.constructor = $c_T2;
/** @constructor */
function $h_T2() {
}
export { $h_T2 as $h_T2 };
$h_T2.prototype = $p;
$p.A = (function() {
  return 2;
});
$p.B = (function(n) {
  return $j_scala$002e$002dProduct2.$f_s_Product2__productElement__I__O(this, n);
});
$p.r = (function() {
  return this.bq;
});
$p.u = (function() {
  return this.br;
});
$p.m = (function() {
  return (((("(" + this.r()) + ",") + this.u()) + ")");
});
$p.C = (function() {
  return "Tuple2";
});
$p.M = (function() {
  return new $j_java$002elang$002e$002dObject.$c_sr_ScalaRunTime$$anon$1(this);
});
$p.i = (function() {
  return $j_java$002elang$002e$002dObject.$m_s_util_hashing_MurmurHash3$().X(this, (-116390334), true);
});
var $d_T2 = new $j_java$002elang$002e$002dObject.$TypeData().i($c_T2, "scala.Tuple2", ({
  aZ: 1,
  aW: 1,
  F: 1,
  c: 1,
  a: 1
}));
export { $d_T2 as $d_T2 };
