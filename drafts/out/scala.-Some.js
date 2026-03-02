'use strict';
import * as $j_java$002elang$002e$002dObject from "./java.lang.-Object.js";
import * as $j_scala$002e$002dNone$0024 from "./scala.-None$.js";
var $p;
/** @constructor */
function $c_s_Some(value) {
  this.at = null;
  this.at = value;
}
export { $c_s_Some as $c_s_Some };
$p = $c_s_Some.prototype = new $j_scala$002e$002dNone$0024.$h_s_Option();
$p.constructor = $c_s_Some;
/** @constructor */
function $h_s_Some() {
}
export { $h_s_Some as $h_s_Some };
$h_s_Some.prototype = $p;
$p.i = (function() {
  return $j_java$002elang$002e$002dObject.$m_s_util_hashing_MurmurHash3$().X(this, 1323286827, true);
});
$p.m = (function() {
  return $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().bE(this);
});
$p.A = (function() {
  return 1;
});
$p.C = (function() {
  return "Some";
});
$p.B = (function(n) {
  if ((n === 0)) {
    return this.at;
  }
  throw $j_java$002elang$002e$002dObject.$ct_jl_IndexOutOfBoundsException__T__(new $j_java$002elang$002e$002dObject.$c_jl_IndexOutOfBoundsException(), ("" + n));
});
$p.bQ = (function() {
  return this.at;
});
function $isArrayOf_s_Some(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.a1)));
}
export { $isArrayOf_s_Some as $isArrayOf_s_Some };
var $d_s_Some = new $j_java$002elang$002e$002dObject.$TypeData().i($c_s_Some, "scala.Some", ({
  a1: 1,
  a0: 1,
  b: 1,
  c: 1,
  F: 1,
  a: 1
}));
export { $d_s_Some as $d_s_Some };
