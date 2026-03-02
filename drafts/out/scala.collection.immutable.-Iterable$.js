'use strict';
import * as $j_java$002elang$002e$002dObject from "./java.lang.-Object.js";
import * as $j_scala$002ecollection$002e$002dIterable$002dFactory$0024$002dDelegate from "./scala.collection.-Iterable-Factory$-Delegate.js";
import * as $j_scala$002ecollection$002eimmutable$002e$002dIterable from "./scala.collection.immutable.-Iterable.js";
var $p;
/** @constructor */
function $c_sci_Iterable$() {
  this.c2 = null;
  $j_scala$002ecollection$002e$002dIterable$002dFactory$0024$002dDelegate.$ct_sc_IterableFactory$Delegate__sc_IterableFactory__(this, $j_java$002elang$002e$002dObject.$m_sci_List$());
}
export { $c_sci_Iterable$ as $c_sci_Iterable$ };
$p = $c_sci_Iterable$.prototype = new $j_scala$002ecollection$002e$002dIterable$002dFactory$0024$002dDelegate.$h_sc_IterableFactory$Delegate();
$p.constructor = $c_sci_Iterable$;
/** @constructor */
function $h_sci_Iterable$() {
}
export { $h_sci_Iterable$ as $h_sci_Iterable$ };
$h_sci_Iterable$.prototype = $p;
$p.gJ = (function(it) {
  return ($j_scala$002ecollection$002eimmutable$002e$002dIterable.$is_sci_Iterable(it) ? it : $j_scala$002ecollection$002e$002dIterable$002dFactory$0024$002dDelegate.$c_sc_IterableFactory$Delegate.prototype.a1.call(this, it));
});
$p.a1 = (function(it) {
  return this.gJ(it);
});
var $d_sci_Iterable$ = new $j_java$002elang$002e$002dObject.$TypeData().i($c_sci_Iterable$, "scala.collection.immutable.Iterable$", ({
  dA: 1,
  b6: 1,
  a: 1,
  F: 1
}));
export { $d_sci_Iterable$ as $d_sci_Iterable$ };
var $n_sci_Iterable$;
function $m_sci_Iterable$() {
  if ((!$n_sci_Iterable$)) {
    $n_sci_Iterable$ = new $c_sci_Iterable$();
  }
  return $n_sci_Iterable$;
}
export { $m_sci_Iterable$ as $m_sci_Iterable$ };
