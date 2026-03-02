'use strict';
import * as $j_java$002elang$002e$002dObject from "./java.lang.-Object.js";
var $p;
/** @constructor */
function $c_sjsr_WrappedVarArgs(array) {
  this.aG = null;
  this.aG = array;
}
export { $c_sjsr_WrappedVarArgs as $c_sjsr_WrappedVarArgs };
$p = $c_sjsr_WrappedVarArgs.prototype = new $j_java$002elang$002e$002dObject.$h_O();
$p.constructor = $c_sjsr_WrappedVarArgs;
/** @constructor */
function $h_sjsr_WrappedVarArgs() {
}
export { $h_sjsr_WrappedVarArgs as $h_sjsr_WrappedVarArgs };
$h_sjsr_WrappedVarArgs.prototype = $p;
$p.n = (function() {
  return new $j_java$002elang$002e$002dObject.$c_sc_IndexedSeqView$IndexedSeqViewIterator(new $j_java$002elang$002e$002dObject.$c_sc_IndexedSeqView$Id(this));
});
$p.w = (function() {
  return this.k();
});
$p.i = (function() {
  return $j_java$002elang$002e$002dObject.$m_s_util_hashing_MurmurHash3$().bU(this);
});
$p.m = (function() {
  return $j_java$002elang$002e$002dObject.$f_sc_Iterable__toString__T(this);
});
$p.aI = (function(f) {
  $j_java$002elang$002e$002dObject.$f_sc_IterableOnceOps__foreach__F1__V(this, f);
});
$p.T = (function(b, start, sep, end) {
  return $j_java$002elang$002e$002dObject.$f_sc_IterableOnceOps__addString__scm_StringBuilder__T__T__T__scm_StringBuilder(this, b, start, sep, end);
});
$p.k = (function() {
  return (this.aG.length | 0);
});
$p.l = (function(idx) {
  return this.aG[idx];
});
$p.V = (function() {
  return "WrappedVarArgs";
});
$p.j = (function(v1) {
  return this.l((v1 | 0));
});
function $isArrayOf_sjsr_WrappedVarArgs(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.a9)));
}
export { $isArrayOf_sjsr_WrappedVarArgs as $isArrayOf_sjsr_WrappedVarArgs };
var $d_sjsr_WrappedVarArgs = new $j_java$002elang$002e$002dObject.$TypeData().i($c_sjsr_WrappedVarArgs, "scala.scalajs.runtime.WrappedVarArgs", ({
  a9: 1,
  x: 1,
  b: 1,
  d: 1,
  j: 1,
  i: 1,
  h: 1,
  r: 1,
  e: 1,
  f: 1,
  k: 1,
  c: 1,
  n: 1,
  t: 1,
  s: 1,
  m: 1,
  g: 1,
  y: 1,
  u: 1,
  p: 1,
  q: 1,
  a: 1
}));
export { $d_sjsr_WrappedVarArgs as $d_sjsr_WrappedVarArgs };
