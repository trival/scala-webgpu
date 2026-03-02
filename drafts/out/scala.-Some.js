'use strict';
import * as $j_java$002elang$002e$002dObject from "./java.lang.-Object.js";
import * as $j_scala$002e$002dNone$0024 from "./scala.-None$.js";
var $p;
/** @constructor */
function $c_s_Some(value) {
  this.bn = null;
  this.bn = value;
}
export { $c_s_Some as $c_s_Some };
$p = $c_s_Some.prototype = new $j_scala$002e$002dNone$0024.$h_s_Option();
$p.constructor = $c_s_Some;
/** @constructor */
function $h_s_Some() {
}
export { $h_s_Some as $h_s_Some };
$h_s_Some.prototype = $p;
$p.j = (function() {
  return $j_java$002elang$002e$002dObject.$m_s_util_hashing_MurmurHash3$().aI(this, 1323286827, true);
});
$p.m = (function() {
  return $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().de(this);
});
$p.I = (function() {
  return 1;
});
$p.K = (function() {
  return "Some";
});
$p.J = (function(n) {
  if ((n === 0)) {
    return this.bn;
  }
  throw $j_java$002elang$002e$002dObject.$ct_jl_IndexOutOfBoundsException__T__(new $j_java$002elang$002e$002dObject.$c_jl_IndexOutOfBoundsException(), ("" + n));
});
$p.dj = (function() {
  return this.bn;
});
function $isArrayOf_s_Some(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.aj)));
}
export { $isArrayOf_s_Some as $isArrayOf_s_Some };
var $d_s_Some = new $j_java$002elang$002e$002dObject.$TypeData().i($c_s_Some, "scala.Some", ({
  aj: 1,
  ai: 1,
  b: 1,
  d: 1,
  S: 1,
  a: 1
}));
export { $d_s_Some as $d_s_Some };
