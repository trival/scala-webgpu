'use strict';
import * as $j_java$002elang$002e$002dObject from "./java.lang.-Object.js";
var $p;
function $ct_scm_HashMap$HashMapIterator__scm_HashMap__($thiz, outer) {
  if ((outer === null)) {
    throw $j_java$002elang$002e$002dObject.$ct_jl_NullPointerException__(new $j_java$002elang$002e$002dObject.$c_jl_NullPointerException());
  }
  $thiz.cc = outer;
  $thiz.ba = 0;
  $thiz.aV = null;
  $thiz.cd = outer.t.a.length;
  return $thiz;
}
export { $ct_scm_HashMap$HashMapIterator__scm_HashMap__ as $ct_scm_HashMap$HashMapIterator__scm_HashMap__ };
/** @constructor */
function $c_scm_HashMap$HashMapIterator() {
  this.ba = 0;
  this.aV = null;
  this.cd = 0;
  this.cc = null;
}
export { $c_scm_HashMap$HashMapIterator as $c_scm_HashMap$HashMapIterator };
$p = $c_scm_HashMap$HashMapIterator.prototype = new $j_java$002elang$002e$002dObject.$h_sc_AbstractIterator();
$p.constructor = $c_scm_HashMap$HashMapIterator;
/** @constructor */
function $h_scm_HashMap$HashMapIterator() {
}
export { $h_scm_HashMap$HashMapIterator as $h_scm_HashMap$HashMapIterator };
$h_scm_HashMap$HashMapIterator.prototype = $p;
$p.i = (function() {
  if ((this.aV !== null)) {
    return true;
  } else {
    while ((this.ba < this.cd)) {
      var n = this.cc.t.a[this.ba];
      this.ba = ((1 + this.ba) | 0);
      if ((n !== null)) {
        this.aV = n;
        return true;
      }
    }
    return false;
  }
});
$p.g = (function() {
  if ((!this.i())) {
    return $j_java$002elang$002e$002dObject.$m_sc_Iterator$().G.g();
  } else {
    var x$proxy14 = this.aV;
    if ((x$proxy14 === null)) {
      $j_java$002elang$002e$002dObject.$m_sr_Scala3RunTime$().be();
    }
    var r = this.dF(x$proxy14);
    var x$proxy15 = this.aV;
    if ((x$proxy15 === null)) {
      $j_java$002elang$002e$002dObject.$m_sr_Scala3RunTime$().be();
    }
    this.aV = x$proxy15.L;
    return r;
  }
});
