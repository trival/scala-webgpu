'use strict';
import * as $j_java$002elang$002e$002dObject from "./java.lang.-Object.js";
import * as $j_scala$002e$002dNone$0024 from "./scala.-None$.js";
import * as $j_scala$002ecollection$002eimmutable$002e$002dAbstract$002dMap from "./scala.collection.immutable.-Abstract-Map.js";
var $p;
/** @constructor */
function $c_sci_Map$EmptyMap$() {
}
export { $c_sci_Map$EmptyMap$ as $c_sci_Map$EmptyMap$ };
$p = $c_sci_Map$EmptyMap$.prototype = new $j_scala$002ecollection$002eimmutable$002e$002dAbstract$002dMap.$h_sci_AbstractMap();
$p.constructor = $c_sci_Map$EmptyMap$;
/** @constructor */
function $h_sci_Map$EmptyMap$() {
}
export { $h_sci_Map$EmptyMap$ as $h_sci_Map$EmptyMap$ };
$h_sci_Map$EmptyMap$.prototype = $p;
$p.dT = (function() {
  return 0;
});
$p.o = (function() {
  return 0;
});
$p.n = (function() {
  return true;
});
$p.dx = (function(key) {
  throw new $j_java$002elang$002e$002dObject.$c_ju_NoSuchElementException(("key not found: " + key));
});
$p.dH = (function(key) {
  return $j_scala$002e$002dNone$0024.$m_s_None$();
});
$p.fr = (function(key, default$1) {
  return default$1.a0();
});
$p.c = (function() {
  return $j_java$002elang$002e$002dObject.$m_sc_Iterator$().G;
});
$p.l = (function(key) {
  this.dx(key);
});
var $d_sci_Map$EmptyMap$ = new $j_java$002elang$002e$002dObject.$TypeData().i($c_sci_Map$EmptyMap$, "scala.collection.immutable.Map$EmptyMap$", ({
  dL: 1,
  dw: 1,
  aZ: 1,
  h: 1,
  c: 1,
  d: 1,
  g: 1,
  f: 1,
  e: 1,
  j: 1,
  k: 1,
  b9: 1,
  b8: 1,
  b: 1,
  an: 1,
  v: 1,
  dM: 1,
  dJ: 1,
  a: 1
}));
export { $d_sci_Map$EmptyMap$ as $d_sci_Map$EmptyMap$ };
var $n_sci_Map$EmptyMap$;
function $m_sci_Map$EmptyMap$() {
  if ((!$n_sci_Map$EmptyMap$)) {
    $n_sci_Map$EmptyMap$ = new $c_sci_Map$EmptyMap$();
  }
  return $n_sci_Map$EmptyMap$;
}
export { $m_sci_Map$EmptyMap$ as $m_sci_Map$EmptyMap$ };
