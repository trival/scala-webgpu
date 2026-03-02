'use strict';
import * as $j_java$002elang$002e$002dObject from "./java.lang.-Object.js";
import * as $j_scala$002eruntime$002e$002dAbstract$002dFunction1$002e$0024$0024$002dLambda$002470e1780b84463d18653aacefee3ab989ac625f28 from "./scala.runtime.-Abstract-Function1.$$-Lambda$70e1780b84463d18653aacefee3ab989ac625f28.js";
var $p;
/** @constructor */
function $c_sc_StringOps$() {
  this.bu = null;
  $n_sc_StringOps$ = this;
  this.bu = new $j_scala$002eruntime$002e$002dAbstract$002dFunction1$002e$0024$0024$002dLambda$002470e1780b84463d18653aacefee3ab989ac625f28.$c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28(((_$1$2) => this.bu));
}
export { $c_sc_StringOps$ as $c_sc_StringOps$ };
$p = $c_sc_StringOps$.prototype = new $j_java$002elang$002e$002dObject.$h_O();
$p.constructor = $c_sc_StringOps$;
/** @constructor */
function $h_sc_StringOps$() {
}
export { $h_sc_StringOps$ as $h_sc_StringOps$ };
$h_sc_StringOps$.prototype = $p;
$p.Y = (function(this$, marginChar) {
  var sb = $j_java$002elang$002e$002dObject.$ct_jl_StringBuilder__I__(new $j_java$002elang$002e$002dObject.$c_jl_StringBuilder(), this$.length);
  var this$1 = new $c_sc_StringOps$$anon$1(this$, false);
  while ((this$1.o < this$1.L)) {
    var x0 = this$1.bT();
    var len = x0.length;
    var index = 0;
    while (((index < len) && (x0.charCodeAt(index) <= 32))) {
      index = ((1 + index) | 0);
    }
    if (((index < len) && (x0.charCodeAt(index) === marginChar))) {
      var beginIndex = ((1 + index) | 0);
      var stripped = x0.substring(beginIndex);
    } else {
      var stripped = x0;
    }
    sb.f = (("" + sb.f) + stripped);
  }
  return sb.f;
});
var $d_sc_StringOps$ = new $j_java$002elang$002e$002dObject.$TypeData().i($c_sc_StringOps$, "scala.collection.StringOps$", ({
  bl: 1
}));
export { $d_sc_StringOps$ as $d_sc_StringOps$ };
var $n_sc_StringOps$;
function $m_sc_StringOps$() {
  if ((!$n_sc_StringOps$)) {
    $n_sc_StringOps$ = new $c_sc_StringOps$();
  }
  return $n_sc_StringOps$;
}
export { $m_sc_StringOps$ as $m_sc_StringOps$ };
function $p_sc_StringOps$$anon$1__advance__T($thiz) {
  var start = $thiz.o;
  while (true) {
    if (($thiz.o < $thiz.L)) {
      $m_sc_StringOps$();
      $m_sc_StringOps$();
      var this$ = $thiz.a6;
      var i = $thiz.o;
      var c = this$.charCodeAt(i);
      var $x_1 = (!((c === 10) || (c === 13)));
    } else {
      var $x_1 = false;
    }
    if ($x_1) {
      $thiz.o = ((1 + $thiz.o) | 0);
    } else {
      break;
    }
  }
  var end = $thiz.o;
  if (($thiz.o < $thiz.L)) {
    $m_sc_StringOps$();
    var this$$2 = $thiz.a6;
    var i$1 = $thiz.o;
    var c$1 = this$$2.charCodeAt(i$1);
    $thiz.o = ((1 + $thiz.o) | 0);
    if ((($thiz.o < $thiz.L) && ($m_sc_StringOps$(), $m_sc_StringOps$(), (((13 ^ c$1) | (10 ^ $thiz.a6.charCodeAt($thiz.o))) === 0)))) {
      $thiz.o = ((1 + $thiz.o) | 0);
    }
    if ((!$thiz.bv)) {
      end = $thiz.o;
    }
  }
  var this$6 = $thiz.a6;
  var endIndex = end;
  return this$6.substring(start, endIndex);
}
export { $p_sc_StringOps$$anon$1__advance__T as $p_sc_StringOps$$anon$1__advance__T };
/** @constructor */
function $c_sc_StringOps$$anon$1(\u03b4this$2, stripped$1) {
  this.a6 = null;
  this.bv = false;
  this.L = 0;
  this.o = 0;
  this.a6 = \u03b4this$2;
  this.bv = stripped$1;
  this.L = \u03b4this$2.length;
  this.o = 0;
}
export { $c_sc_StringOps$$anon$1 as $c_sc_StringOps$$anon$1 };
$p = $c_sc_StringOps$$anon$1.prototype = new $j_java$002elang$002e$002dObject.$h_sc_AbstractIterator();
$p.constructor = $c_sc_StringOps$$anon$1;
/** @constructor */
function $h_sc_StringOps$$anon$1() {
}
export { $h_sc_StringOps$$anon$1 as $h_sc_StringOps$$anon$1 };
$h_sc_StringOps$$anon$1.prototype = $p;
$p.t = (function() {
  return (this.o < this.L);
});
$p.bT = (function() {
  return ((this.o >= this.L) ? $j_java$002elang$002e$002dObject.$m_sc_Iterator$().K.p() : $p_sc_StringOps$$anon$1__advance__T(this));
});
$p.p = (function() {
  return this.bT();
});
var $d_sc_StringOps$$anon$1 = new $j_java$002elang$002e$002dObject.$TypeData().i($c_sc_StringOps$$anon$1, "scala.collection.StringOps$$anon$1", ({
  bm: 1,
  G: 1,
  b: 1,
  d: 1,
  H: 1
}));
export { $d_sc_StringOps$$anon$1 as $d_sc_StringOps$$anon$1 };
