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
$p.am = (function() {
  return new $j_java$002elang$002e$002dObject.$c_s_Product$$anon$1(this);
});
$p.n = (function() {
  return (this === $m_s_None$());
});
$p.o = (function() {
  return (this.n() ? 0 : 1);
});
$p.c = (function() {
  return (this.n() ? $j_java$002elang$002e$002dObject.$m_sc_Iterator$().G : new $j_java$002elang$002e$002dObject.$c_sc_Iterator$$anon$20(this.dI()));
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
$p.H = (function() {
  return 0;
});
$p.J = (function() {
  return "None";
});
$p.I = (function(n) {
  throw $j_java$002elang$002e$002dObject.$ct_jl_IndexOutOfBoundsException__T__(new $j_java$002elang$002e$002dObject.$c_jl_IndexOutOfBoundsException(), ("" + n));
});
$p.gO = (function() {
  throw new $j_java$002elang$002e$002dObject.$c_ju_NoSuchElementException("None.get");
});
$p.dI = (function() {
  this.gO();
});
var $d_s_None$ = new $j_java$002elang$002e$002dObject.$TypeData().i($c_s_None$, "scala.None$", ({
  cY: 1,
  aU: 1,
  c: 1,
  b: 1,
  r: 1,
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
