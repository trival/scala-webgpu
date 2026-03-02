'use strict';
import * as $j_java$002elang$002e$002dObject from "./java.lang.-Object.js";
import * as $j_scala$002ecollection$002e$002dIterable$002dFactory$0024$002dDelegate from "./scala.collection.-Iterable-Factory$-Delegate.js";
var $p;
/** @constructor */
function $c_scm_Iterable$() {
  this.c2 = null;
  $j_scala$002ecollection$002e$002dIterable$002dFactory$0024$002dDelegate.$ct_sc_IterableFactory$Delegate__sc_IterableFactory__(this, $j_java$002elang$002e$002dObject.$m_scm_ArrayBuffer$());
}
export { $c_scm_Iterable$ as $c_scm_Iterable$ };
$p = $c_scm_Iterable$.prototype = new $j_scala$002ecollection$002e$002dIterable$002dFactory$0024$002dDelegate.$h_sc_IterableFactory$Delegate();
$p.constructor = $c_scm_Iterable$;
/** @constructor */
function $h_scm_Iterable$() {
}
export { $h_scm_Iterable$ as $h_scm_Iterable$ };
$h_scm_Iterable$.prototype = $p;
var $d_scm_Iterable$ = new $j_java$002elang$002e$002dObject.$TypeData().i($c_scm_Iterable$, "scala.collection.mutable.Iterable$", ({
  ea: 1,
  b6: 1,
  a: 1,
  F: 1
}));
export { $d_scm_Iterable$ as $d_scm_Iterable$ };
var $n_scm_Iterable$;
function $m_scm_Iterable$() {
  if ((!$n_scm_Iterable$)) {
    $n_scm_Iterable$ = new $c_scm_Iterable$();
  }
  return $n_scm_Iterable$;
}
export { $m_scm_Iterable$ as $m_scm_Iterable$ };
