'use strict';
import * as $j_java$002elang$002e$002dObject from "./java.lang.-Object.js";
import * as $j_scala$002e$002dNone$0024 from "./scala.-None$.js";
import * as $j_scala$002e$002dSome from "./scala.-Some.js";
var $p;
function $f_sc_MapOps__getOrElse__O__F0__O($thiz, key, default$1) {
  var x5 = $thiz.dH(key);
  if ((x5 instanceof $j_scala$002e$002dSome.$c_s_Some)) {
    return x5.b0;
  }
  if (($j_scala$002e$002dNone$0024.$m_s_None$() === x5)) {
    return default$1.a0();
  }
  throw new $j_java$002elang$002e$002dObject.$c_s_MatchError(x5);
}
export { $f_sc_MapOps__getOrElse__O__F0__O as $f_sc_MapOps__getOrElse__O__F0__O };
function $f_sc_MapOps__foreachEntry__F2__V($thiz, f) {
  var it = $thiz.c();
  while (it.i()) {
    var next = it.g();
    f.aF(next.S(), next.a8());
  }
}
export { $f_sc_MapOps__foreachEntry__F2__V as $f_sc_MapOps__foreachEntry__F2__V };
function $f_sc_MapOps__default__O__O($thiz, key) {
  throw new $j_java$002elang$002e$002dObject.$c_ju_NoSuchElementException(("key not found: " + key));
}
export { $f_sc_MapOps__default__O__O as $f_sc_MapOps__default__O__O };
function $f_sc_MapOps__addString__scm_StringBuilder__T__T__T__scm_StringBuilder($thiz, sb, start, sep, end) {
  return $j_java$002elang$002e$002dObject.$f_sc_IterableOnceOps__addString__scm_StringBuilder__T__T__T__scm_StringBuilder(new $j_java$002elang$002e$002dObject.$c_sc_Iterator$$anon$9(new $j_java$002elang$002e$002dObject.$c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28(((x$1$2) => {
    var k = x$1$2.S();
    var v = x$1$2.a8();
    return ((k + " -> ") + v);
  })), $thiz.c()), sb, start, sep, end);
}
export { $f_sc_MapOps__addString__scm_StringBuilder__T__T__T__scm_StringBuilder as $f_sc_MapOps__addString__scm_StringBuilder__T__T__T__scm_StringBuilder };
