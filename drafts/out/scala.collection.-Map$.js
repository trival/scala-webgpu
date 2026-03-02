'use strict';
import * as $j_java$002elang$002e$002dObject from "./java.lang.-Object.js";
import * as $j_scala$002ecollection$002e$002dMap$002dFactory$0024$002dDelegate from "./scala.collection.-Map-Factory$-Delegate.js";
import * as $j_scala$002ecollection$002eimmutable$002e$002dMap$0024 from "./scala.collection.immutable.-Map$.js";
var $p;
/** @constructor */
function $c_sc_Map$() {
  this.ew = null;
  this.eu = null;
  this.ev = null;
  $j_scala$002ecollection$002e$002dMap$002dFactory$0024$002dDelegate.$ct_sc_MapFactory$Delegate__sc_MapFactory__(this, $j_scala$002ecollection$002eimmutable$002e$002dMap$0024.$m_sci_Map$());
  $n_sc_Map$ = this;
  this.eu = $j_java$002elang$002e$002dObject.$ct_O__(new $j_java$002elang$002e$002dObject.$c_O());
  this.ev = new $j_java$002elang$002e$002dObject.$c_sr_AbstractFunction0_$$Lambda$a02b774b97db8234e08c6a02dd06557c99779855((() => this.eu));
}
export { $c_sc_Map$ as $c_sc_Map$ };
$p = $c_sc_Map$.prototype = new $j_scala$002ecollection$002e$002dMap$002dFactory$0024$002dDelegate.$h_sc_MapFactory$Delegate();
$p.constructor = $c_sc_Map$;
/** @constructor */
function $h_sc_Map$() {
}
export { $h_sc_Map$ as $h_sc_Map$ };
$h_sc_Map$.prototype = $p;
var $d_sc_Map$ = new $j_java$002elang$002e$002dObject.$TypeData().i($c_sc_Map$, "scala.collection.Map$", ({
  dj: 1,
  dk: 1,
  a: 1,
  ax: 1
}));
export { $d_sc_Map$ as $d_sc_Map$ };
var $n_sc_Map$;
function $m_sc_Map$() {
  if ((!$n_sc_Map$)) {
    $n_sc_Map$ = new $c_sc_Map$();
  }
  return $n_sc_Map$;
}
export { $m_sc_Map$ as $m_sc_Map$ };
