'use strict';
import * as $j_java$002elang$002e$002dObject from "./java.lang.-Object.js";
import * as $j_scala$002e$002dProduct3 from "./scala.-Product3.js";
var $p;
/** @constructor */
function $c_T3(_1, _2, _3) {
  this.au = null;
  this.av = null;
  this.aw = null;
  this.au = _1;
  this.av = _2;
  this.aw = _3;
}
export { $c_T3 as $c_T3 };
$p = $c_T3.prototype = new $j_java$002elang$002e$002dObject.$h_O();
$p.constructor = $c_T3;
/** @constructor */
function $h_T3() {
}
export { $h_T3 as $h_T3 };
$h_T3.prototype = $p;
$p.M = (function() {
  return new $j_java$002elang$002e$002dObject.$c_s_Product$$anon$1(this);
});
$p.A = (function() {
  return 3;
});
$p.B = (function(n) {
  return $j_scala$002e$002dProduct3.$f_s_Product3__productElement__I__O(this, n);
});
$p.i = (function() {
  return $j_java$002elang$002e$002dObject.$m_s_util_hashing_MurmurHash3$().X(this, (-192629203), true);
});
$p.C = (function() {
  return "Tuple3";
});
$p.m = (function() {
  return (((((("(" + this.au) + ",") + this.av) + ",") + this.aw) + ")");
});
var $d_T3 = new $j_java$002elang$002e$002dObject.$TypeData().i($c_T3, "scala.Tuple3", ({
  b0: 1,
  c: 1,
  F: 1,
  aX: 1,
  a: 1
}));
export { $d_T3 as $d_T3 };
