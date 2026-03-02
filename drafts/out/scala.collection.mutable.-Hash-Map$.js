'use strict';
import * as $j_java$002elang$002e$002dObject from "./java.lang.-Object.js";
import * as $j_scala$002ecollection$002emutable$002e$002dHash$002dMap from "./scala.collection.mutable.-Hash-Map.js";
var $p;
/** @constructor */
function $c_scm_HashMap$() {
}
export { $c_scm_HashMap$ as $c_scm_HashMap$ };
$p = $c_scm_HashMap$.prototype = new $j_java$002elang$002e$002dObject.$h_O();
$p.constructor = $c_scm_HashMap$;
/** @constructor */
function $h_scm_HashMap$() {
}
export { $h_scm_HashMap$ as $h_scm_HashMap$ };
$h_scm_HashMap$.prototype = $p;
$p.gL = (function(it) {
  var k = it.o();
  return new $j_scala$002ecollection$002emutable$002e$002dHash$002dMap.$c_scm_HashMap(((k > 0) ? $j_java$002elang$002e$002dObject.$doubleToInt((((1 + k) | 0) / 0.75)) : 16), 0.75).f2(it);
});
var $d_scm_HashMap$ = new $j_java$002elang$002e$002dObject.$TypeData().i($c_scm_HashMap$, "scala.collection.mutable.HashMap$", ({
  e3: 1,
  a: 1,
  ax: 1
}));
export { $d_scm_HashMap$ as $d_scm_HashMap$ };
var $n_scm_HashMap$;
function $m_scm_HashMap$() {
  if ((!$n_scm_HashMap$)) {
    $n_scm_HashMap$ = new $c_scm_HashMap$();
  }
  return $n_scm_HashMap$;
}
export { $m_scm_HashMap$ as $m_scm_HashMap$ };
