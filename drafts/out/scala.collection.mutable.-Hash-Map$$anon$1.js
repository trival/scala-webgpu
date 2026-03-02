'use strict';
import * as $j_java$002elang$002e$002dObject from "./java.lang.-Object.js";
import * as $j_scala$002e$002dTuple2 from "./scala.-Tuple2.js";
import * as $j_scala$002ecollection$002emutable$002e$002dHash$002dMap$0024$002dHash$002dMap$002dIterator from "./scala.collection.mutable.-Hash-Map$-Hash-Map-Iterator.js";
var $p;
/** @constructor */
function $c_scm_HashMap$$anon$1(outer) {
  this.ba = 0;
  this.aV = null;
  this.cd = 0;
  this.cc = null;
  if ((outer === null)) {
    throw $j_java$002elang$002e$002dObject.$ct_jl_NullPointerException__(new $j_java$002elang$002e$002dObject.$c_jl_NullPointerException());
  }
  $j_scala$002ecollection$002emutable$002e$002dHash$002dMap$0024$002dHash$002dMap$002dIterator.$ct_scm_HashMap$HashMapIterator__scm_HashMap__(this, outer);
}
export { $c_scm_HashMap$$anon$1 as $c_scm_HashMap$$anon$1 };
$p = $c_scm_HashMap$$anon$1.prototype = new $j_scala$002ecollection$002emutable$002e$002dHash$002dMap$0024$002dHash$002dMap$002dIterator.$h_scm_HashMap$HashMapIterator();
$p.constructor = $c_scm_HashMap$$anon$1;
/** @constructor */
function $h_scm_HashMap$$anon$1() {
}
export { $h_scm_HashMap$$anon$1 as $h_scm_HashMap$$anon$1 };
$h_scm_HashMap$$anon$1.prototype = $p;
$p.dF = (function(nd) {
  return new $j_scala$002e$002dTuple2.$c_T2(nd.br, nd.au);
});
var $d_scm_HashMap$$anon$1 = new $j_java$002elang$002e$002dObject.$TypeData().i($c_scm_HashMap$$anon$1, "scala.collection.mutable.HashMap$$anon$1", ({
  e4: 1,
  aF: 1,
  s: 1,
  c: 1,
  d: 1,
  t: 1
}));
export { $d_scm_HashMap$$anon$1 as $d_scm_HashMap$$anon$1 };
