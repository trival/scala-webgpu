'use strict';
import * as $j_java$002elang$002e$002dIndex$002dOut$002dOf$002dBounds$002dException from "./java.lang.-Index-Out-Of-Bounds-Exception.js";
import * as $j_java$002elang$002e$002dNull$002dPointer$002dException from "./java.lang.-Null-Pointer-Exception.js";
import * as $j_java$002elang$002e$002dObject from "./java.lang.-Object.js";
import * as $j_java$002elang$002e$002dString$002dBuilder from "./java.lang.-String-Builder.js";
import * as $j_java$002elang$002e$002dUnsupported$002dOperation$002dException from "./java.lang.-Unsupported-Operation-Exception.js";
import * as $j_java$002eutil$002e$002dNo$002dSuch$002dElement$002dException from "./java.util.-No-Such-Element-Exception.js";
import * as $j_scala$002ecollection$002e$002dIndexed$002dSeq from "./scala.collection.-Indexed-Seq.js";
import * as $j_scala$002ecollection$002e$002dLinear$002dSeq$002dOps from "./scala.collection.-Linear-Seq-Ops.js";
import * as $j_scala$002ecollection$002e$002dStrict$002dOptimized$002dLinear$002dSeq$002dOps from "./scala.collection.-Strict-Optimized-Linear-Seq-Ops.js";
import * as $j_scala$002ecollection$002e$002dView from "./scala.collection.-View.js";
import * as $j_scala$002eutil$002ehashing$002e$002dMurmur$002dHash3 from "./scala.util.hashing.-Murmur-Hash3.js";
var $p;
function $f_sc_IterableOnceOps__mkString__T__T__T__T($thiz, start, sep, end) {
  return (($thiz.v() === 0) ? (("" + start) + end) : $thiz.ao($ct_scm_StringBuilder__(new $c_scm_StringBuilder()), start, sep, end).t.h);
}
export { $f_sc_IterableOnceOps__mkString__T__T__T__T as $f_sc_IterableOnceOps__mkString__T__T__T__T };
function $f_sc_IterableOnceOps__addString__scm_StringBuilder__T__T__T__scm_StringBuilder($thiz, b, start, sep, end) {
  var jsb = b.t;
  if ((start.length !== 0)) {
    jsb.h = (("" + jsb.h) + start);
  }
  var it = $thiz.r();
  if (it.l()) {
    var obj = it.i();
    jsb.h = (("" + jsb.h) + obj);
    while (it.l()) {
      if ((sep.length !== 0)) {
        jsb.h = (("" + jsb.h) + sep);
      }
      var obj$1 = it.i();
      jsb.h = (("" + jsb.h) + obj$1);
    }
  }
  if ((end.length !== 0)) {
    jsb.h = (("" + jsb.h) + end);
  }
  return b;
}
export { $f_sc_IterableOnceOps__addString__scm_StringBuilder__T__T__T__scm_StringBuilder as $f_sc_IterableOnceOps__addString__scm_StringBuilder__T__T__T__scm_StringBuilder };
/** @constructor */
function $c_s_util_hashing_MurmurHash3$() {
  this.V = 0;
  this.am = 0;
  $n_s_util_hashing_MurmurHash3$ = this;
  this.V = $j_java$002elang$002e$002dObject.$f_T__hashCode__I("Seq");
  this.am = $j_java$002elang$002e$002dObject.$f_T__hashCode__I("Map");
  $j_java$002elang$002e$002dObject.$f_T__hashCode__I("Set");
  this.aT($m_sci_Nil$(), this.am);
}
export { $c_s_util_hashing_MurmurHash3$ as $c_s_util_hashing_MurmurHash3$ };
$p = $c_s_util_hashing_MurmurHash3$.prototype = new $j_scala$002eutil$002ehashing$002e$002dMurmur$002dHash3.$h_s_util_hashing_MurmurHash3();
$p.constructor = $c_s_util_hashing_MurmurHash3$;
/** @constructor */
function $h_s_util_hashing_MurmurHash3$() {
}
export { $h_s_util_hashing_MurmurHash3$ as $h_s_util_hashing_MurmurHash3$ };
$h_s_util_hashing_MurmurHash3$.prototype = $p;
$p.aR = (function(xs) {
  return ($j_scala$002ecollection$002e$002dIndexed$002dSeq.$is_sc_IndexedSeq(xs) ? this.aJ(xs, this.V) : ((xs instanceof $c_sci_List) ? this.aK(xs, this.V) : this.aN(xs, this.V)));
});
var $d_s_util_hashing_MurmurHash3$ = new $j_java$002elang$002e$002dObject.$TypeData().i($c_s_util_hashing_MurmurHash3$, "scala.util.hashing.MurmurHash3$", ({
  ba: 1,
  b9: 1
}));
export { $d_s_util_hashing_MurmurHash3$ as $d_s_util_hashing_MurmurHash3$ };
var $n_s_util_hashing_MurmurHash3$;
function $m_s_util_hashing_MurmurHash3$() {
  if ((!$n_s_util_hashing_MurmurHash3$)) {
    $n_s_util_hashing_MurmurHash3$ = new $c_s_util_hashing_MurmurHash3$();
  }
  return $n_s_util_hashing_MurmurHash3$;
}
export { $m_s_util_hashing_MurmurHash3$ as $m_s_util_hashing_MurmurHash3$ };
/** @constructor */
function $c_sc_Iterator$() {
  this.F = null;
  $n_sc_Iterator$ = this;
  this.F = new $c_sc_Iterator$$anon$19();
}
export { $c_sc_Iterator$ as $c_sc_Iterator$ };
$p = $c_sc_Iterator$.prototype = new $j_java$002elang$002e$002dObject.$h_O();
$p.constructor = $c_sc_Iterator$;
/** @constructor */
function $h_sc_Iterator$() {
}
export { $h_sc_Iterator$ as $h_sc_Iterator$ };
$h_sc_Iterator$.prototype = $p;
var $d_sc_Iterator$ = new $j_java$002elang$002e$002dObject.$TypeData().i($c_sc_Iterator$, "scala.collection.Iterator$", ({
  av: 1,
  a: 1,
  au: 1
}));
export { $d_sc_Iterator$ as $d_sc_Iterator$ };
var $n_sc_Iterator$;
function $m_sc_Iterator$() {
  if ((!$n_sc_Iterator$)) {
    $n_sc_Iterator$ = new $c_sc_Iterator$();
  }
  return $n_sc_Iterator$;
}
export { $m_sc_Iterator$ as $m_sc_Iterator$ };
/** @constructor */
function $c_sc_AbstractIterator() {
}
export { $c_sc_AbstractIterator as $c_sc_AbstractIterator };
$p = $c_sc_AbstractIterator.prototype = new $j_java$002elang$002e$002dObject.$h_O();
$p.constructor = $c_sc_AbstractIterator;
/** @constructor */
function $h_sc_AbstractIterator() {
}
export { $h_sc_AbstractIterator as $h_sc_AbstractIterator };
$h_sc_AbstractIterator.prototype = $p;
$p.v = (function() {
  return (-1);
});
$p.ao = (function(b, start, sep, end) {
  return $f_sc_IterableOnceOps__addString__scm_StringBuilder__T__T__T__scm_StringBuilder(this, b, start, sep, end);
});
$p.r = (function() {
  return this;
});
$p.g = (function() {
  return "<iterator>";
});
/** @constructor */
function $c_s_Product$$anon$1(outer) {
  this.D = 0;
  this.ad = 0;
  this.ac = null;
  if ((outer === null)) {
    throw new $j_java$002elang$002e$002dNull$002dPointer$002dException.$c_jl_NullPointerException();
  }
  this.ac = outer;
  this.D = 0;
  this.ad = outer.w();
}
export { $c_s_Product$$anon$1 as $c_s_Product$$anon$1 };
$p = $c_s_Product$$anon$1.prototype = new $h_sc_AbstractIterator();
$p.constructor = $c_s_Product$$anon$1;
/** @constructor */
function $h_s_Product$$anon$1() {
}
export { $h_s_Product$$anon$1 as $h_s_Product$$anon$1 };
$h_s_Product$$anon$1.prototype = $p;
$p.l = (function() {
  return (this.D < this.ad);
});
$p.i = (function() {
  var result = this.ac.x(this.D);
  this.D = ((1 + this.D) | 0);
  return result;
});
var $d_s_Product$$anon$1 = new $j_java$002elang$002e$002dObject.$TypeData().i($c_s_Product$$anon$1, "scala.Product$$anon$1", ({
  ak: 1,
  o: 1,
  b: 1,
  e: 1,
  p: 1
}));
export { $d_s_Product$$anon$1 as $d_s_Product$$anon$1 };
function $f_sc_Iterable__toString__T($thiz) {
  return $f_sc_IterableOnceOps__mkString__T__T__T__T($thiz, ($thiz.a3() + "("), ", ", ")");
}
export { $f_sc_Iterable__toString__T as $f_sc_Iterable__toString__T };
/** @constructor */
function $c_sc_Iterator$$anon$19() {
}
export { $c_sc_Iterator$$anon$19 as $c_sc_Iterator$$anon$19 };
$p = $c_sc_Iterator$$anon$19.prototype = new $h_sc_AbstractIterator();
$p.constructor = $c_sc_Iterator$$anon$19;
/** @constructor */
function $h_sc_Iterator$$anon$19() {
}
export { $h_sc_Iterator$$anon$19 as $h_sc_Iterator$$anon$19 };
$h_sc_Iterator$$anon$19.prototype = $p;
$p.l = (function() {
  return false;
});
$p.aM = (function() {
  throw new $j_java$002eutil$002e$002dNo$002dSuch$002dElement$002dException.$c_ju_NoSuchElementException("next on empty iterator");
});
$p.v = (function() {
  return 0;
});
$p.i = (function() {
  this.aM();
});
var $d_sc_Iterator$$anon$19 = new $j_java$002elang$002e$002dObject.$TypeData().i($c_sc_Iterator$$anon$19, "scala.collection.Iterator$$anon$19", ({
  aw: 1,
  o: 1,
  b: 1,
  e: 1,
  p: 1
}));
export { $d_sc_Iterator$$anon$19 as $d_sc_Iterator$$anon$19 };
/** @constructor */
function $c_sc_AbstractIterable() {
}
export { $c_sc_AbstractIterable as $c_sc_AbstractIterable };
$p = $c_sc_AbstractIterable.prototype = new $j_java$002elang$002e$002dObject.$h_O();
$p.constructor = $c_sc_AbstractIterable;
/** @constructor */
function $h_sc_AbstractIterable() {
}
export { $h_sc_AbstractIterable as $h_sc_AbstractIterable };
$h_sc_AbstractIterable.prototype = $p;
$p.ao = (function(b, start, sep, end) {
  return $f_sc_IterableOnceOps__addString__scm_StringBuilder__T__T__T__scm_StringBuilder(this, b, start, sep, end);
});
$p.a3 = (function() {
  return this.J();
});
/** @constructor */
function $c_sc_IndexedSeqView$IndexedSeqViewIterator(self) {
  this.ae = null;
  this.S = 0;
  this.B = 0;
  this.ae = self;
  this.S = 0;
  this.B = self.p();
}
export { $c_sc_IndexedSeqView$IndexedSeqViewIterator as $c_sc_IndexedSeqView$IndexedSeqViewIterator };
$p = $c_sc_IndexedSeqView$IndexedSeqViewIterator.prototype = new $h_sc_AbstractIterator();
$p.constructor = $c_sc_IndexedSeqView$IndexedSeqViewIterator;
/** @constructor */
function $h_sc_IndexedSeqView$IndexedSeqViewIterator() {
}
export { $h_sc_IndexedSeqView$IndexedSeqViewIterator as $h_sc_IndexedSeqView$IndexedSeqViewIterator };
$h_sc_IndexedSeqView$IndexedSeqViewIterator.prototype = $p;
$p.v = (function() {
  return this.B;
});
$p.l = (function() {
  return (this.B > 0);
});
$p.i = (function() {
  if ((this.B > 0)) {
    var r = this.ae.n(this.S);
    this.S = ((1 + this.S) | 0);
    this.B = (((-1) + this.B) | 0);
    return r;
  } else {
    return $m_sc_Iterator$().F.i();
  }
});
var $d_sc_IndexedSeqView$IndexedSeqViewIterator = new $j_java$002elang$002e$002dObject.$TypeData().i($c_sc_IndexedSeqView$IndexedSeqViewIterator, "scala.collection.IndexedSeqView$IndexedSeqViewIterator", ({
  at: 1,
  o: 1,
  b: 1,
  e: 1,
  p: 1,
  a: 1
}));
export { $d_sc_IndexedSeqView$IndexedSeqViewIterator as $d_sc_IndexedSeqView$IndexedSeqViewIterator };
/** @constructor */
function $c_sc_AbstractView() {
}
export { $c_sc_AbstractView as $c_sc_AbstractView };
$p = $c_sc_AbstractView.prototype = new $h_sc_AbstractIterable();
$p.constructor = $c_sc_AbstractView;
/** @constructor */
function $h_sc_AbstractView() {
}
export { $h_sc_AbstractView as $h_sc_AbstractView };
$h_sc_AbstractView.prototype = $p;
$p.g = (function() {
  return $j_scala$002ecollection$002e$002dView.$f_sc_View__toString__T(this);
});
/** @constructor */
function $c_sc_AbstractSeq() {
}
export { $c_sc_AbstractSeq as $c_sc_AbstractSeq };
$p = $c_sc_AbstractSeq.prototype = new $h_sc_AbstractIterable();
$p.constructor = $c_sc_AbstractSeq;
/** @constructor */
function $h_sc_AbstractSeq() {
}
export { $h_sc_AbstractSeq as $h_sc_AbstractSeq };
$h_sc_AbstractSeq.prototype = $p;
$p.m = (function() {
  return $m_s_util_hashing_MurmurHash3$().aR(this);
});
$p.g = (function() {
  return $f_sc_Iterable__toString__T(this);
});
/** @constructor */
function $c_sc_AbstractSeqView() {
}
export { $c_sc_AbstractSeqView as $c_sc_AbstractSeqView };
$p = $c_sc_AbstractSeqView.prototype = new $h_sc_AbstractView();
$p.constructor = $c_sc_AbstractSeqView;
/** @constructor */
function $h_sc_AbstractSeqView() {
}
export { $h_sc_AbstractSeqView as $h_sc_AbstractSeqView };
$h_sc_AbstractSeqView.prototype = $p;
function $ct_sc_SeqView$Id__sc_SeqOps__($thiz, underlying) {
  $thiz.U = underlying;
  return $thiz;
}
export { $ct_sc_SeqView$Id__sc_SeqOps__ as $ct_sc_SeqView$Id__sc_SeqOps__ };
/** @constructor */
function $c_sc_SeqView$Id() {
  this.U = null;
}
export { $c_sc_SeqView$Id as $c_sc_SeqView$Id };
$p = $c_sc_SeqView$Id.prototype = new $h_sc_AbstractSeqView();
$p.constructor = $c_sc_SeqView$Id;
/** @constructor */
function $h_sc_SeqView$Id() {
}
export { $h_sc_SeqView$Id as $h_sc_SeqView$Id };
$h_sc_SeqView$Id.prototype = $p;
$p.n = (function(idx) {
  return this.U.n(idx);
});
$p.p = (function() {
  return this.U.p();
});
/** @constructor */
function $c_sc_IndexedSeqView$Id(underlying) {
  this.U = null;
  $ct_sc_SeqView$Id__sc_SeqOps__(this, underlying);
}
export { $c_sc_IndexedSeqView$Id as $c_sc_IndexedSeqView$Id };
$p = $c_sc_IndexedSeqView$Id.prototype = new $h_sc_SeqView$Id();
$p.constructor = $c_sc_IndexedSeqView$Id;
/** @constructor */
function $h_sc_IndexedSeqView$Id() {
}
export { $h_sc_IndexedSeqView$Id as $h_sc_IndexedSeqView$Id };
$h_sc_IndexedSeqView$Id.prototype = $p;
$p.v = (function() {
  return this.p();
});
$p.r = (function() {
  return new $c_sc_IndexedSeqView$IndexedSeqViewIterator(this);
});
$p.J = (function() {
  return "IndexedSeqView";
});
var $d_sc_IndexedSeqView$Id = new $j_java$002elang$002e$002dObject.$TypeData().i($c_sc_IndexedSeqView$Id, "scala.collection.IndexedSeqView$Id", ({
  as: 1,
  aB: 1,
  ap: 1,
  aq: 1,
  r: 1,
  b: 1,
  e: 1,
  v: 1,
  u: 1,
  t: 1,
  a: 1,
  aE: 1,
  w: 1,
  aA: 1,
  z: 1,
  ar: 1
}));
export { $d_sc_IndexedSeqView$Id as $d_sc_IndexedSeqView$Id };
/** @constructor */
function $c_sci_AbstractSeq() {
}
export { $c_sci_AbstractSeq as $c_sci_AbstractSeq };
$p = $c_sci_AbstractSeq.prototype = new $h_sc_AbstractSeq();
$p.constructor = $c_sci_AbstractSeq;
/** @constructor */
function $h_sci_AbstractSeq() {
}
export { $h_sci_AbstractSeq as $h_sci_AbstractSeq };
$h_sci_AbstractSeq.prototype = $p;
/** @constructor */
function $c_scm_AbstractSeq() {
}
export { $c_scm_AbstractSeq as $c_scm_AbstractSeq };
$p = $c_scm_AbstractSeq.prototype = new $h_sc_AbstractSeq();
$p.constructor = $c_scm_AbstractSeq;
/** @constructor */
function $h_scm_AbstractSeq() {
}
export { $h_scm_AbstractSeq as $h_scm_AbstractSeq };
$h_scm_AbstractSeq.prototype = $p;
/** @constructor */
function $c_sci_List() {
}
export { $c_sci_List as $c_sci_List };
$p = $c_sci_List.prototype = new $h_sci_AbstractSeq();
$p.constructor = $c_sci_List;
/** @constructor */
function $h_sci_List() {
}
export { $h_sci_List as $h_sci_List };
$h_sci_List.prototype = $p;
$p.n = (function(n) {
  return $j_scala$002ecollection$002e$002dLinear$002dSeq$002dOps.$f_sc_LinearSeqOps__apply__I__O(this, n);
});
$p.J = (function() {
  return "LinearSeq";
});
$p.A = (function() {
  return (this === $m_sci_Nil$());
});
$p.p = (function() {
  var these = this;
  var len = 0;
  while ((!these.A())) {
    len = ((1 + len) | 0);
    these.ay();
  }
  return len;
});
$p.a3 = (function() {
  return "List";
});
$p.aF = (function(n) {
  return $j_scala$002ecollection$002e$002dStrict$002dOptimized$002dLinear$002dSeq$002dOps.$p_sc_StrictOptimizedLinearSeqOps__loop$2__I__sc_LinearSeq__sc_LinearSeq(this, n, this);
});
$p.C = (function(v1) {
  return $j_scala$002ecollection$002e$002dLinear$002dSeq$002dOps.$f_sc_LinearSeqOps__apply__I__O(this, (v1 | 0));
});
function $isArrayOf_sci_List(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.J)));
}
export { $isArrayOf_sci_List as $isArrayOf_sci_List };
/** @constructor */
function $c_sci_Nil$() {
  $n_sci_Nil$ = this;
  var _1 = $m_sci_Nil$();
  $m_sci_Nil$();
}
export { $c_sci_Nil$ as $c_sci_Nil$ };
$p = $c_sci_Nil$.prototype = new $h_sci_List();
$p.constructor = $c_sci_Nil$;
/** @constructor */
function $h_sci_Nil$() {
}
export { $h_sci_Nil$ as $h_sci_Nil$ };
$h_sci_Nil$.prototype = $p;
$p.I = (function() {
  return new $c_s_Product$$anon$1(this);
});
$p.w = (function() {
  return 0;
});
$p.y = (function() {
  return "Nil";
});
$p.x = (function(n) {
  throw new $j_java$002elang$002e$002dIndex$002dOut$002dOf$002dBounds$002dException.$c_jl_IndexOutOfBoundsException(("" + n));
});
$p.at = (function() {
  throw new $j_java$002eutil$002e$002dNo$002dSuch$002dElement$002dException.$c_ju_NoSuchElementException("head of empty list");
});
$p.ay = (function() {
  throw new $j_java$002elang$002e$002dUnsupported$002dOperation$002dException.$c_jl_UnsupportedOperationException("tail of empty list");
});
$p.v = (function() {
  return 0;
});
$p.r = (function() {
  return $m_sc_Iterator$().F;
});
$p.aI = (function() {
  this.at();
});
$p.aS = (function() {
  this.ay();
});
var $d_sci_Nil$ = new $j_java$002elang$002e$002dObject.$TypeData().i($c_sci_Nil$, "scala.collection.immutable.Nil$", ({
  aK: 1,
  J: 1,
  aG: 1,
  y: 1,
  r: 1,
  b: 1,
  e: 1,
  v: 1,
  u: 1,
  t: 1,
  g: 1,
  l: 1,
  w: 1,
  f: 1,
  A: 1,
  aH: 1,
  aM: 1,
  aL: 1,
  az: 1,
  ay: 1,
  aJ: 1,
  aI: 1,
  H: 1,
  I: 1,
  aC: 1,
  aN: 1,
  a: 1,
  aF: 1,
  m: 1
}));
export { $d_sci_Nil$ as $d_sci_Nil$ };
var $n_sci_Nil$;
function $m_sci_Nil$() {
  if ((!$n_sci_Nil$)) {
    $n_sci_Nil$ = new $c_sci_Nil$();
  }
  return $n_sci_Nil$;
}
export { $m_sci_Nil$ as $m_sci_Nil$ };
function $ct_scm_StringBuilder__jl_StringBuilder__($thiz, underlying) {
  $thiz.t = underlying;
  return $thiz;
}
export { $ct_scm_StringBuilder__jl_StringBuilder__ as $ct_scm_StringBuilder__jl_StringBuilder__ };
function $ct_scm_StringBuilder__($thiz) {
  $ct_scm_StringBuilder__jl_StringBuilder__($thiz, new $j_java$002elang$002e$002dString$002dBuilder.$c_jl_StringBuilder());
  return $thiz;
}
export { $ct_scm_StringBuilder__ as $ct_scm_StringBuilder__ };
/** @constructor */
function $c_scm_StringBuilder() {
  this.t = null;
}
export { $c_scm_StringBuilder as $c_scm_StringBuilder };
$p = $c_scm_StringBuilder.prototype = new $h_scm_AbstractSeq();
$p.constructor = $c_scm_StringBuilder;
/** @constructor */
function $h_scm_StringBuilder() {
}
export { $h_scm_StringBuilder as $h_scm_StringBuilder };
$h_scm_StringBuilder.prototype = $p;
$p.r = (function() {
  return new $c_sc_IndexedSeqView$IndexedSeqViewIterator(new $c_sc_IndexedSeqView$Id(this));
});
$p.J = (function() {
  return "IndexedSeq";
});
$p.p = (function() {
  return this.t.p();
});
$p.v = (function() {
  return this.t.p();
});
$p.g = (function() {
  return this.t.h;
});
$p.n = (function(i) {
  return $j_java$002elang$002e$002dObject.$bC(this.t.ap(i));
});
$p.C = (function(v1) {
  var i = (v1 | 0);
  return $j_java$002elang$002e$002dObject.$bC(this.t.ap(i));
});
var $d_scm_StringBuilder = new $j_java$002elang$002e$002dObject.$TypeData().i($c_scm_StringBuilder, "scala.collection.mutable.StringBuilder", ({
  aT: 1,
  K: 1,
  y: 1,
  r: 1,
  b: 1,
  e: 1,
  v: 1,
  u: 1,
  t: 1,
  g: 1,
  l: 1,
  w: 1,
  f: 1,
  A: 1,
  R: 1,
  q: 1,
  N: 1,
  T: 1,
  S: 1,
  M: 1,
  O: 1,
  L: 1,
  aR: 1,
  z: 1,
  s: 1,
  Q: 1,
  P: 1,
  x: 1,
  a: 1
}));
export { $d_scm_StringBuilder as $d_scm_StringBuilder };
