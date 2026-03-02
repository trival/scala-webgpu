'use strict';
import * as $j_java$002elang$002e$002dObject from "./java.lang.-Object.js";
var $p;
/** @constructor */
function $c_s_Option() {
}
export { $c_s_Option as $c_s_Option };
$p = $c_s_Option.prototype = new $j_java$002elang$002e$002dObject.$h_O();
$p.constructor = $c_s_Option;
/** @constructor */
function $h_s_Option() {
}
export { $h_s_Option as $h_s_Option };
$h_s_Option.prototype = $p;
$p.a6 = (function() {
  return new $j_java$002elang$002e$002dObject.$c_s_Product$$anon$1(this);
});
$p.H = (function() {
  return (this === $m_s_None$());
});
$p.t = (function() {
  return (this.H() ? 0 : 1);
});
$p.e = (function() {
  return (this.H() ? $j_java$002elang$002e$002dObject.$m_sc_Iterator$().N : new $j_java$002elang$002e$002dObject.$c_sc_Iterator$$anon$20(this.dj()));
});
/** @constructor */
function $c_s_None$() {
}
export { $c_s_None$ as $c_s_None$ };
$p = $c_s_None$.prototype = new $h_s_Option();
$p.constructor = $c_s_None$;
/** @constructor */
function $h_s_None$() {
}
export { $h_s_None$ as $h_s_None$ };
$h_s_None$.prototype = $p;
$p.j = (function() {
  return 2433880;
});
$p.m = (function() {
  return "None";
});
$p.I = (function() {
  return 0;
});
$p.K = (function() {
  return "None";
});
$p.J = (function(n) {
  throw $j_java$002elang$002e$002dObject.$ct_jl_IndexOutOfBoundsException__T__(new $j_java$002elang$002e$002dObject.$c_jl_IndexOutOfBoundsException(), ("" + n));
});
$p.dX = (function() {
  throw new $j_java$002elang$002e$002dObject.$c_ju_NoSuchElementException("None.get");
});
$p.dj = (function() {
  this.dX();
});
var $d_s_None$ = new $j_java$002elang$002e$002dObject.$TypeData().i($c_s_None$, "scala.None$", ({
  bW: 1,
  ai: 1,
  b: 1,
  d: 1,
  S: 1,
  a: 1
}));
export { $d_s_None$ as $d_s_None$ };
var $n_s_None$;
function $m_s_None$() {
  if ((!$n_s_None$)) {
    $n_s_None$ = new $c_s_None$();
  }
  return $n_s_None$;
}
export { $m_s_None$ as $m_s_None$ };
