'use strict';
import * as $j_java$002elang$002e$002dObject from "./java.lang.-Object.js";
import * as $j_scala$002ecollection$002e$002dMap from "./scala.collection.-Map.js";
import * as $j_scala$002ecollection$002e$002dMap$002dOps from "./scala.collection.-Map-Ops.js";
var $p;
/** @constructor */
function $c_sc_AbstractMap() {
}
export { $c_sc_AbstractMap as $c_sc_AbstractMap };
$p = $c_sc_AbstractMap.prototype = new $j_java$002elang$002e$002dObject.$h_sc_AbstractIterable();
$p.constructor = $c_sc_AbstractMap;
/** @constructor */
function $h_sc_AbstractMap() {
}
export { $h_sc_AbstractMap as $h_sc_AbstractMap };
$h_sc_AbstractMap.prototype = $p;
$p.cs = (function(f) {
  $j_scala$002ecollection$002e$002dMap$002dOps.$f_sc_MapOps__foreachEntry__F2__V(this, f);
});
$p.aO = (function(sb, start, sep, end) {
  return $j_scala$002ecollection$002e$002dMap$002dOps.$f_sc_MapOps__addString__scm_StringBuilder__T__T__T__scm_StringBuilder(this, sb, start, sep, end);
});
$p.h = (function(o) {
  return $j_scala$002ecollection$002e$002dMap.$f_sc_Map__equals__O__Z(this, o);
});
$p.j = (function() {
  return $j_java$002elang$002e$002dObject.$m_s_util_hashing_MurmurHash3$().h0(this);
});
$p.a7 = (function() {
  return "Map";
});
$p.m = (function() {
  return $j_java$002elang$002e$002dObject.$f_sc_Iterable__toString__T(this);
});
