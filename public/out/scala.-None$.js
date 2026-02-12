'use strict';
import * as $j_java$002elang$002e$002dIndex$002dOut$002dOf$002dBounds$002dException from "./java.lang.-Index-Out-Of-Bounds-Exception.js";
import * as $j_java$002elang$002e$002dObject from "./java.lang.-Object.js";
import * as $j_java$002eutil$002e$002dNo$002dSuch$002dElement$002dException from "./java.util.-No-Such-Element-Exception.js";
import * as $j_scala$002e$002dProduct$0024$0024anon$00241 from "./scala.-Product$$anon$1.js";
import * as $j_scala$002ecollection$002e$002dIterator$0024$0024anon$002420 from "./scala.collection.-Iterator$$anon$20.js";
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
$p.I = (function() {
  return new $j_scala$002e$002dProduct$0024$0024anon$00241.$c_s_Product$$anon$1(this);
});
$p.A = (function() {
  return (this === $m_s_None$());
});
$p.v = (function() {
  return (this.A() ? 0 : 1);
});
$p.r = (function() {
  return (this.A() ? $j_scala$002e$002dProduct$0024$0024anon$00241.$m_sc_Iterator$().F : new $j_scala$002ecollection$002e$002dIterator$0024$0024anon$002420.$c_sc_Iterator$$anon$20(this.aq()));
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
$p.m = (function() {
  return 2433880;
});
$p.g = (function() {
  return "None";
});
$p.w = (function() {
  return 0;
});
$p.y = (function() {
  return "None";
});
$p.x = (function(n) {
  throw new $j_java$002elang$002e$002dIndex$002dOut$002dOf$002dBounds$002dException.$c_jl_IndexOutOfBoundsException(("" + n));
});
$p.aH = (function() {
  throw new $j_java$002eutil$002e$002dNo$002dSuch$002dElement$002dException.$c_ju_NoSuchElementException("None.get");
});
$p.aq = (function() {
  this.aH();
});
var $d_s_None$ = new $j_java$002elang$002e$002dObject.$TypeData().i($c_s_None$, "scala.None$", ({
  ah: 1,
  F: 1,
  b: 1,
  f: 1,
  m: 1,
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
