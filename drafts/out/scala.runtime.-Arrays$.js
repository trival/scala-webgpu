'use strict';
import * as $j_java$002elang$002e$002dObject from "./java.lang.-Object.js";
var $p;
/** @constructor */
function $c_sr_Arrays$() {
}
export { $c_sr_Arrays$ as $c_sr_Arrays$ };
$p = $c_sr_Arrays$.prototype = new $j_java$002elang$002e$002dObject.$h_O();
$p.constructor = $c_sr_Arrays$;
/** @constructor */
function $h_sr_Arrays$() {
}
export { $h_sr_Arrays$ as $h_sr_Arrays$ };
$h_sr_Arrays$.prototype = $p;
$p.el = (function(xs, clazz) {
  var length = xs.d();
  var arr = clazz.T.U(length);
  xs.ag(arr, 0, 2147483647);
  return arr;
});
var $d_sr_Arrays$ = new $j_java$002elang$002e$002dObject.$TypeData().i($c_sr_Arrays$, "scala.runtime.Arrays$", ({
  d8: 1
}));
export { $d_sr_Arrays$ as $d_sr_Arrays$ };
var $n_sr_Arrays$;
function $m_sr_Arrays$() {
  if ((!$n_sr_Arrays$)) {
    $n_sr_Arrays$ = new $c_sr_Arrays$();
  }
  return $n_sr_Arrays$;
}
export { $m_sr_Arrays$ as $m_sr_Arrays$ };
