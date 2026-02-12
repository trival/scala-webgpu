'use strict';
import * as $j_java$002elang$002e$002dObject from "./java.lang.-Object.js";
import * as $j_scala$002e$002dProduct$0024$0024anon$00241 from "./scala.-Product$$anon$1.js";
import * as $j_scala$002ecollection$002emutable$002e$002dAbstract$002dBuffer from "./scala.collection.mutable.-Abstract-Buffer.js";
var $p;
/** @constructor */
function $c_sjs_js_WrappedArray(array) {
  this.H = null;
  this.H = array;
}
export { $c_sjs_js_WrappedArray as $c_sjs_js_WrappedArray };
$p = $c_sjs_js_WrappedArray.prototype = new $j_scala$002ecollection$002emutable$002e$002dAbstract$002dBuffer.$h_scm_AbstractBuffer();
$p.constructor = $c_sjs_js_WrappedArray;
/** @constructor */
function $h_sjs_js_WrappedArray() {
}
export { $h_sjs_js_WrappedArray as $h_sjs_js_WrappedArray };
$h_sjs_js_WrappedArray.prototype = $p;
$p.J = (function() {
  return "IndexedSeq";
});
$p.r = (function() {
  return new $j_scala$002e$002dProduct$0024$0024anon$00241.$c_sc_IndexedSeqView$IndexedSeqViewIterator(new $j_scala$002e$002dProduct$0024$0024anon$00241.$c_sc_IndexedSeqView$Id(this));
});
$p.n = (function(index) {
  return this.H[index];
});
$p.p = (function() {
  return (this.H.length | 0);
});
$p.v = (function() {
  return (this.H.length | 0);
});
$p.a3 = (function() {
  return "WrappedArray";
});
$p.C = (function(v1) {
  var index = (v1 | 0);
  return this.H[index];
});
var $d_sjs_js_WrappedArray = new $j_java$002elang$002e$002dObject.$TypeData().i($c_sjs_js_WrappedArray, "scala.scalajs.js.WrappedArray", ({
  b8: 1,
  aO: 1,
  K: 1,
  y: 1,
  r: 1,
  b: 1,
  e: 1,
  v: 1,
  u: 1,
  t: 1,
  g: 1,
  l: 1,
  w: 1,
  f: 1,
  A: 1,
  R: 1,
  q: 1,
  N: 1,
  T: 1,
  S: 1,
  M: 1,
  O: 1,
  aS: 1,
  aP: 1,
  I: 1,
  H: 1,
  P: 1,
  z: 1,
  s: 1,
  Q: 1,
  aQ: 1,
  L: 1,
  a: 1
}));
export { $d_sjs_js_WrappedArray as $d_sjs_js_WrappedArray };
