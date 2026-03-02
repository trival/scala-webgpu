'use strict';
import * as $j_java$002elang$002e$002dObject from "./java.lang.-Object.js";
import * as $j_scala$002ecollection$002eimmutable$002e$002dSeq from "./scala.collection.immutable.-Seq.js";
var $p;
/** @constructor */
function $c_sci_Seq$() {
  this.bI = null;
  $j_java$002elang$002e$002dObject.$ct_sc_SeqFactory$Delegate__sc_SeqFactory__(this, $j_java$002elang$002e$002dObject.$m_sci_List$());
}
export { $c_sci_Seq$ as $c_sci_Seq$ };
$p = $c_sci_Seq$.prototype = new $j_java$002elang$002e$002dObject.$h_sc_SeqFactory$Delegate();
$p.constructor = $c_sci_Seq$;
/** @constructor */
function $h_sci_Seq$() {
}
export { $h_sci_Seq$ as $h_sci_Seq$ };
$h_sci_Seq$.prototype = $p;
$p.dG = (function(it) {
  return ($j_scala$002ecollection$002eimmutable$002e$002dSeq.$is_sci_Seq(it) ? it : $j_java$002elang$002e$002dObject.$c_sc_SeqFactory$Delegate.prototype.d1.call(this, it));
});
$p.d1 = (function(it) {
  return this.dG(it);
});
$p.a1 = (function(source) {
  return this.dG(source);
});
var $d_sci_Seq$ = new $j_java$002elang$002e$002dObject.$TypeData().i($c_sci_Seq$, "scala.collection.immutable.Seq$", ({
  dO: 1,
  ay: 1,
  a: 1,
  F: 1,
  a5: 1
}));
export { $d_sci_Seq$ as $d_sci_Seq$ };
var $n_sci_Seq$;
function $m_sci_Seq$() {
  if ((!$n_sci_Seq$)) {
    $n_sci_Seq$ = new $c_sci_Seq$();
  }
  return $n_sci_Seq$;
}
export { $m_sci_Seq$ as $m_sci_Seq$ };
