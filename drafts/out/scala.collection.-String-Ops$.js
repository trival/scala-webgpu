'use strict';
import * as $j_java$002elang$002e$002dObject from "./java.lang.-Object.js";
import * as $j_scala$002emath$002e$002dScala$002dNumber from "./scala.math.-Scala-Number.js";
import * as $j_scala$002eruntime$002e$002dArrays$0024 from "./scala.runtime.-Arrays$.js";
var $p;
/** @constructor */
function $c_sc_StringOps$() {
  this.cS = null;
  $n_sc_StringOps$ = this;
  this.cS = new $j_java$002elang$002e$002dObject.$c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28(((_$1$2) => this.cS));
}
export { $c_sc_StringOps$ as $c_sc_StringOps$ };
$p = $c_sc_StringOps$.prototype = new $j_java$002elang$002e$002dObject.$h_O();
$p.constructor = $c_sc_StringOps$;
/** @constructor */
function $h_sc_StringOps$() {
}
export { $h_sc_StringOps$ as $h_sc_StringOps$ };
$h_sc_StringOps$.prototype = $p;
$p.aJ = (function(this$, marginChar) {
  var sb = $j_java$002elang$002e$002dObject.$ct_jl_StringBuilder__I__(new $j_java$002elang$002e$002dObject.$c_jl_StringBuilder(), this$.length);
  var this$1 = new $c_sc_StringOps$$anon$1(this$, false);
  while ((this$1.s < this$1.ab)) {
    var x0 = this$1.ds();
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
    sb.i = (("" + sb.i) + stripped);
  }
  return sb.i;
});
$p.ei = (function(this$, arg) {
  return (false ? arg.ew() : arg);
});
$p.bF = (function(this$, args) {
  return $j_java$002elang$002e$002dObject.$m_jl_String$().dV(this$, $j_scala$002eruntime$002e$002dArrays$0024.$m_sr_Arrays$().el(args.cb(new $j_java$002elang$002e$002dObject.$c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28(((arg$2) => this.ei(this$, arg$2)))), $j_java$002elang$002e$002dObject.$d_O.l()));
});
var $d_sc_StringOps$ = new $j_java$002elang$002e$002dObject.$TypeData().i($c_sc_StringOps$, "scala.collection.StringOps$", ({
  ci: 1
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
  var start = $thiz.s;
  while (true) {
    if (($thiz.s < $thiz.ab)) {
      $m_sc_StringOps$();
      $m_sc_StringOps$();
      var this$ = $thiz.aU;
      var i = $thiz.s;
      var c = this$.charCodeAt(i);
      var $x_1 = (!((c === 10) || (c === 13)));
    } else {
      var $x_1 = false;
    }
    if ($x_1) {
      $thiz.s = ((1 + $thiz.s) | 0);
    } else {
      break;
    }
  }
  var end = $thiz.s;
  if (($thiz.s < $thiz.ab)) {
    $m_sc_StringOps$();
    var this$$2 = $thiz.aU;
    var i$1 = $thiz.s;
    var c$1 = this$$2.charCodeAt(i$1);
    $thiz.s = ((1 + $thiz.s) | 0);
    if ((($thiz.s < $thiz.ab) && ($m_sc_StringOps$(), $m_sc_StringOps$(), (((13 ^ c$1) | (10 ^ $thiz.aU.charCodeAt($thiz.s))) === 0)))) {
      $thiz.s = ((1 + $thiz.s) | 0);
    }
    if ((!$thiz.cT)) {
      end = $thiz.s;
    }
  }
  var this$6 = $thiz.aU;
  var endIndex = end;
  return this$6.substring(start, endIndex);
}
export { $p_sc_StringOps$$anon$1__advance__T as $p_sc_StringOps$$anon$1__advance__T };
/** @constructor */
function $c_sc_StringOps$$anon$1(\u03b4this$2, stripped$1) {
  this.aU = null;
  this.cT = false;
  this.ab = 0;
  this.s = 0;
  this.aU = \u03b4this$2;
  this.cT = stripped$1;
  this.ab = \u03b4this$2.length;
  this.s = 0;
}
export { $c_sc_StringOps$$anon$1 as $c_sc_StringOps$$anon$1 };
$p = $c_sc_StringOps$$anon$1.prototype = new $j_java$002elang$002e$002dObject.$h_sc_AbstractIterator();
$p.constructor = $c_sc_StringOps$$anon$1;
/** @constructor */
function $h_sc_StringOps$$anon$1() {
}
export { $h_sc_StringOps$$anon$1 as $h_sc_StringOps$$anon$1 };
$h_sc_StringOps$$anon$1.prototype = $p;
$p.p = (function() {
  return (this.s < this.ab);
});
$p.ds = (function() {
  return ((this.s >= this.ab) ? $j_java$002elang$002e$002dObject.$m_sc_Iterator$().N.n() : $p_sc_StringOps$$anon$1__advance__T(this));
});
$p.n = (function() {
  return this.ds();
});
var $d_sc_StringOps$$anon$1 = new $j_java$002elang$002e$002dObject.$TypeData().i($c_sc_StringOps$$anon$1, "scala.collection.StringOps$$anon$1", ({
  cj: 1,
  J: 1,
  b: 1,
  c: 1,
  K: 1
}));
export { $d_sc_StringOps$$anon$1 as $d_sc_StringOps$$anon$1 };
