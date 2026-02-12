'use strict';
import * as $j_java$002elang$002e$002dIndex$002dOut$002dOf$002dBounds$002dException from "./java.lang.-Index-Out-Of-Bounds-Exception.js";
import * as $j_java$002elang$002e$002dObject from "./java.lang.-Object.js";
import * as $j_scala$002e$002dNone$0024 from "./scala.-None$.js";
import * as $j_scala$002e$002dProduct$0024$0024anon$00241 from "./scala.-Product$$anon$1.js";
import * as $j_scala$002eruntime$002e$002dScala$002dRun$002dTime$0024 from "./scala.runtime.-Scala-Run-Time$.js";
var $p;
/** @constructor */
function $c_s_Some(value) {
  this.E = null;
  this.E = value;
}
export { $c_s_Some as $c_s_Some };
$p = $c_s_Some.prototype = new $j_scala$002e$002dNone$0024.$h_s_Option();
$p.constructor = $c_s_Some;
/** @constructor */
function $h_s_Some() {
}
export { $h_s_Some as $h_s_Some };
$h_s_Some.prototype = $p;
$p.m = (function() {
  return $j_scala$002e$002dProduct$0024$0024anon$00241.$m_s_util_hashing_MurmurHash3$().Y(this, 1323286827, true);
});
$p.g = (function() {
  return $j_scala$002eruntime$002e$002dScala$002dRun$002dTime$0024.$m_sr_ScalaRunTime$().an(this);
});
$p.w = (function() {
  return 1;
});
$p.y = (function() {
  return "Some";
});
$p.x = (function(n) {
  if ((n === 0)) {
    return this.E;
  }
  throw new $j_java$002elang$002e$002dIndex$002dOut$002dOf$002dBounds$002dException.$c_jl_IndexOutOfBoundsException(("" + n));
});
$p.aq = (function() {
  return this.E;
});
function $isArrayOf_s_Some(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.G)));
}
export { $isArrayOf_s_Some as $isArrayOf_s_Some };
var $d_s_Some = new $j_java$002elang$002e$002dObject.$TypeData().i($c_s_Some, "scala.Some", ({
  G: 1,
  F: 1,
  b: 1,
  f: 1,
  m: 1,
  a: 1
}));
export { $d_s_Some as $d_s_Some };
