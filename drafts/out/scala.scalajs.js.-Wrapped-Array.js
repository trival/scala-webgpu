'use strict';
import * as $j_java$002elang$002e$002dObject from "./java.lang.-Object.js";
import * as $j_scala$002ecollection$002emutable$002e$002dAbstract$002dBuffer from "./scala.collection.mutable.-Abstract-Buffer.js";
var $p;
/** @constructor */
function $c_sjs_js_WrappedArray(array) {
  this.ag = null;
  this.ag = array;
}
export { $c_sjs_js_WrappedArray as $c_sjs_js_WrappedArray };
$p = $c_sjs_js_WrappedArray.prototype = new $j_scala$002ecollection$002emutable$002e$002dAbstract$002dBuffer.$h_scm_AbstractBuffer();
$p.constructor = $c_sjs_js_WrappedArray;
/** @constructor */
function $h_sjs_js_WrappedArray() {
}
export { $h_sjs_js_WrappedArray as $h_sjs_js_WrappedArray };
$h_sjs_js_WrappedArray.prototype = $p;
$p.N = (function() {
  return "IndexedSeq";
});
$p.n = (function() {
  return new $j_java$002elang$002e$002dObject.$c_sc_IndexedSeqView$IndexedSeqViewIterator(new $j_java$002elang$002e$002dObject.$c_sc_IndexedSeqView$Id(this));
});
$p.l = (function(index) {
  return this.ag[index];
});
$p.k = (function() {
  return (this.ag.length | 0);
});
$p.w = (function() {
  return (this.ag.length | 0);
});
$p.V = (function() {
  return "WrappedArray";
});
$p.j = (function(v1) {
  var index = (v1 | 0);
  return this.ag[index];
});
var $d_sjs_js_WrappedArray = new $j_java$002elang$002e$002dObject.$TypeData().i($c_sjs_js_WrappedArray, "scala.scalajs.js.WrappedArray", ({
  c9: 1,
  bD: 1,
  M: 1,
  o: 1,
  l: 1,
  b: 1,
  d: 1,
  j: 1,
  i: 1,
  h: 1,
  e: 1,
  f: 1,
  k: 1,
  c: 1,
  n: 1,
  Q: 1,
  J: 1,
  N: 1,
  S: 1,
  R: 1,
  a4: 1,
  a5: 1,
  bJ: 1,
  bG: 1,
  q: 1,
  p: 1,
  O: 1,
  m: 1,
  g: 1,
  P: 1,
  bH: 1,
  a3: 1,
  a: 1
}));
export { $d_sjs_js_WrappedArray as $d_sjs_js_WrappedArray };
