'use strict';
import * as $j_java$002elang$002e$002dObject from "./java.lang.-Object.js";
import * as $j_scala$002ecollection$002emutable$002e$002dHash$002dMap$0024$002dHash$002dMap$002dIterator from "./scala.collection.mutable.-Hash-Map$-Hash-Map-Iterator.js";
var $p;
/** @constructor */
function $c_scm_HashMap$$anon$5(outer) {
  this.ba = 0;
  this.aV = null;
  this.cd = 0;
  this.cc = null;
  this.dp = 0;
  this.fQ = null;
  if ((outer === null)) {
    throw $j_java$002elang$002e$002dObject.$ct_jl_NullPointerException__(new $j_java$002elang$002e$002dObject.$c_jl_NullPointerException());
  }
  this.fQ = outer;
  $j_scala$002ecollection$002emutable$002e$002dHash$002dMap$0024$002dHash$002dMap$002dIterator.$ct_scm_HashMap$HashMapIterator__scm_HashMap__(this, outer);
  this.dp = 0;
}
export { $c_scm_HashMap$$anon$5 as $c_scm_HashMap$$anon$5 };
$p = $c_scm_HashMap$$anon$5.prototype = new $j_scala$002ecollection$002emutable$002e$002dHash$002dMap$0024$002dHash$002dMap$002dIterator.$h_scm_HashMap$HashMapIterator();
$p.constructor = $c_scm_HashMap$$anon$5;
/** @constructor */
function $h_scm_HashMap$$anon$5() {
}
export { $h_scm_HashMap$$anon$5 as $h_scm_HashMap$$anon$5 };
$h_scm_HashMap$$anon$5.prototype = $p;
$p.j = (function() {
  return this.dp;
});
$p.dF = (function(nd) {
  var $x_1 = $j_java$002elang$002e$002dObject.$m_s_util_hashing_MurmurHash3$();
  var improvedHash = nd.aW;
  this.dp = $x_1.fK((improvedHash ^ ((improvedHash >>> 16) | 0)), $j_java$002elang$002e$002dObject.$m_sr_Statics$().u(nd.au));
  return this;
});
var $d_scm_HashMap$$anon$5 = new $j_java$002elang$002e$002dObject.$TypeData().i($c_scm_HashMap$$anon$5, "scala.collection.mutable.HashMap$$anon$5", ({
  e6: 1,
  aF: 1,
  s: 1,
  c: 1,
  d: 1,
  t: 1
}));
export { $d_scm_HashMap$$anon$5 as $d_scm_HashMap$$anon$5 };
