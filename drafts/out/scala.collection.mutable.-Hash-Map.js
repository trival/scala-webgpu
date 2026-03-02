'use strict';
import * as $j_java$002elang$002e$002dObject from "./java.lang.-Object.js";
import * as $j_scala$002e$002dNone$0024 from "./scala.-None$.js";
import * as $j_scala$002e$002dSome from "./scala.-Some.js";
import * as $j_scala$002ecollection$002e$002dMap$002dOps from "./scala.collection.-Map-Ops.js";
import * as $j_scala$002ecollection$002eimmutable$002e$002dHash$002dMap from "./scala.collection.immutable.-Hash-Map.js";
import * as $j_scala$002ecollection$002emutable$002e$002dAbstract$002dMap from "./scala.collection.mutable.-Abstract-Map.js";
import * as $j_scala$002ecollection$002emutable$002e$002dBuilder from "./scala.collection.mutable.-Builder.js";
import * as $j_scala$002ecollection$002emutable$002e$002dHash$002dMap$0024$0024anon$00241 from "./scala.collection.mutable.-Hash-Map$$anon$1.js";
import * as $j_scala$002ecollection$002emutable$002e$002dHash$002dMap$0024$0024anon$00244 from "./scala.collection.mutable.-Hash-Map$$anon$4.js";
import * as $j_scala$002ecollection$002emutable$002e$002dHash$002dMap$0024$0024anon$00245 from "./scala.collection.mutable.-Hash-Map$$anon$5.js";
import * as $j_scala$002ecollection$002emutable$002e$002dHash$002dMap$0024$002dNode from "./scala.collection.mutable.-Hash-Map$-Node.js";
import * as $j_scala$002ecollection$002emutable$002e$002dLinked$002dHash$002dMap from "./scala.collection.mutable.-Linked-Hash-Map.js";
import * as $j_scala$002ecollection$002emutable$002e$002dMap from "./scala.collection.mutable.-Map.js";
import * as $j_scala$002eruntime$002e$002dAbstract$002dFunction2$002e$0024$0024$002dLambda$0024286cbfc6187197affcadc8465aaec93d6b7d20dc from "./scala.runtime.-Abstract-Function2.$$-Lambda$286cbfc6187197affcadc8465aaec93d6b7d20dc.js";
import * as $j_scala$002eruntime$002e$002dAbstract$002dFunction3$002e$0024$0024$002dLambda$002426e0a25d9b29f6b82ea50ab7badf4fb70c5c74e1 from "./scala.runtime.-Abstract-Function3.$$-Lambda$26e0a25d9b29f6b82ea50ab7badf4fb70c5c74e1.js";
var $p;
function $p_scm_HashMap__put0__O__O__I__Z__s_Some($thiz, key, value, hash, getOld) {
  if ((((1 + $thiz.at) | 0) >= $thiz.cb)) {
    $p_scm_HashMap__growTable__I__V($thiz, ($thiz.t.a.length << 1));
  }
  return $p_scm_HashMap__put0__O__O__Z__I__I__s_Some($thiz, key, value, getOld, hash, (hash & (($thiz.t.a.length - 1) | 0)));
}
export { $p_scm_HashMap__put0__O__O__I__Z__s_Some as $p_scm_HashMap__put0__O__O__I__Z__s_Some };
function $p_scm_HashMap__put0__O__O__Z__s_Some($thiz, key, value, getOld) {
  if ((((1 + $thiz.at) | 0) >= $thiz.cb)) {
    $p_scm_HashMap__growTable__I__V($thiz, ($thiz.t.a.length << 1));
  }
  var originalHash = $j_java$002elang$002e$002dObject.$m_sr_Statics$().u(key);
  var hash = (originalHash ^ ((originalHash >>> 16) | 0));
  return $p_scm_HashMap__put0__O__O__Z__I__I__s_Some($thiz, key, value, getOld, hash, (hash & (($thiz.t.a.length - 1) | 0)));
}
export { $p_scm_HashMap__put0__O__O__Z__s_Some as $p_scm_HashMap__put0__O__O__Z__s_Some };
function $p_scm_HashMap__put0__O__O__Z__I__I__s_Some($thiz, key, value, getOld, hash, idx) {
  matchResult7: {
    var x30 = $thiz.t.a[idx];
    if ((x30 === null)) {
      $thiz.t.a[idx] = new $j_scala$002ecollection$002emutable$002e$002dHash$002dMap$0024$002dNode.$c_scm_HashMap$Node(key, hash, value, null);
      break matchResult7;
    }
    var prev = null;
    var n = x30;
    while (((n !== null) && (n.aW <= hash))) {
      if (((n.aW === hash) && $j_java$002elang$002e$002dObject.$m_sr_BoxesRunTime$().O(key, n.br))) {
        var old$2 = n.au;
        var this$2 = n;
        this$2.au = value;
        return (getOld ? new $j_scala$002e$002dSome.$c_s_Some(old$2) : null);
      }
      prev = n;
      n = n.L;
    }
    if ((prev === null)) {
      $thiz.t.a[idx] = new $j_scala$002ecollection$002emutable$002e$002dHash$002dMap$0024$002dNode.$c_scm_HashMap$Node(key, hash, value, x30);
    } else {
      var this$6 = prev;
      var n$1 = new $j_scala$002ecollection$002emutable$002e$002dHash$002dMap$0024$002dNode.$c_scm_HashMap$Node(key, hash, value, prev.L);
      this$6.L = n$1;
    }
  }
  $thiz.at = ((1 + $thiz.at) | 0);
  return null;
}
export { $p_scm_HashMap__put0__O__O__Z__I__I__s_Some as $p_scm_HashMap__put0__O__O__Z__I__I__s_Some };
function $p_scm_HashMap__growTable__I__V($thiz, newlen) {
  if ((newlen < 0)) {
    throw $j_java$002elang$002e$002dObject.$ct_jl_RuntimeException__T__(new $j_java$002elang$002e$002dObject.$c_jl_RuntimeException(), (("new HashMap table size " + newlen) + " exceeds maximum"));
  }
  var oldlen = $thiz.t.a.length;
  $thiz.cb = $p_scm_HashMap__newThreshold__I__I($thiz, newlen);
  if (($thiz.at === 0)) {
    $thiz.t = new ($j_scala$002ecollection$002emutable$002e$002dHash$002dMap$0024$002dNode.$d_scm_HashMap$Node.r().C)(newlen);
  } else {
    $thiz.t = $j_java$002elang$002e$002dObject.$m_ju_Arrays$().dC($thiz.t, newlen);
    var preLow = new $j_scala$002ecollection$002emutable$002e$002dHash$002dMap$0024$002dNode.$c_scm_HashMap$Node(null, 0, null, null);
    var preHigh = new $j_scala$002ecollection$002emutable$002e$002dHash$002dMap$0024$002dNode.$c_scm_HashMap$Node(null, 0, null, null);
    while ((oldlen < newlen)) {
      var i = 0;
      while ((i < oldlen)) {
        var old = $thiz.t.a[i];
        if ((old !== null)) {
          preLow.L = null;
          preHigh.L = null;
          var lastLow = preLow;
          var lastHigh = preHigh;
          var n = old;
          while ((n !== null)) {
            var next = n.L;
            if (((n.aW & oldlen) === 0)) {
              var this$2 = lastLow;
              var n$1 = n;
              this$2.L = n$1;
              lastLow = n;
            } else {
              var this$3 = lastHigh;
              var n$2 = n;
              this$3.L = n$2;
              lastHigh = n;
            }
            n = next;
          }
          var this$4 = lastLow;
          this$4.L = null;
          if ((old !== preLow.L)) {
            $thiz.t.a[i] = preLow.L;
          }
          if ((preHigh.L !== null)) {
            $thiz.t.a[((i + oldlen) | 0)] = preHigh.L;
            var this$5 = lastHigh;
            this$5.L = null;
          }
        }
        i = ((1 + i) | 0);
      }
      oldlen = (oldlen << 1);
    }
  }
}
export { $p_scm_HashMap__growTable__I__V as $p_scm_HashMap__growTable__I__V };
function $p_scm_HashMap__tableSizeFor__I__I($thiz, capacity) {
  var x = ((capacity - 1) | 0);
  var i = ((x > 4) ? x : 4);
  var x$1 = ((((-2147483648) >> Math.clz32(i)) & i) << 1);
  return ((x$1 < 1073741824) ? x$1 : 1073741824);
}
export { $p_scm_HashMap__tableSizeFor__I__I as $p_scm_HashMap__tableSizeFor__I__I };
function $p_scm_HashMap__newThreshold__I__I($thiz, size) {
  return $j_java$002elang$002e$002dObject.$doubleToInt((size * $thiz.dn));
}
export { $p_scm_HashMap__newThreshold__I__I as $p_scm_HashMap__newThreshold__I__I };
/** @constructor */
function $c_scm_HashMap(initialCapacity, loadFactor) {
  this.dn = 0.0;
  this.t = null;
  this.cb = 0;
  this.at = 0;
  this.dn = loadFactor;
  this.t = new ($j_scala$002ecollection$002emutable$002e$002dHash$002dMap$0024$002dNode.$d_scm_HashMap$Node.r().C)($p_scm_HashMap__tableSizeFor__I__I(this, initialCapacity));
  this.cb = $p_scm_HashMap__newThreshold__I__I(this, this.t.a.length);
  this.at = 0;
}
export { $c_scm_HashMap as $c_scm_HashMap };
$p = $c_scm_HashMap.prototype = new $j_scala$002ecollection$002emutable$002e$002dAbstract$002dMap.$h_scm_AbstractMap();
$p.constructor = $c_scm_HashMap;
/** @constructor */
function $h_scm_HashMap() {
}
export { $h_scm_HashMap as $h_scm_HashMap };
$h_scm_HashMap.prototype = $p;
$p.P = (function(f) {
  return $j_java$002elang$002e$002dObject.$f_sc_StrictOptimizedIterableOps__map__F1__O(this, f);
});
$p.dT = (function() {
  return this.at;
});
$p.ag = (function(size) {
  var target = $p_scm_HashMap__tableSizeFor__I__I(this, $j_java$002elang$002e$002dObject.$doubleToInt((((1 + size) | 0) / this.dn)));
  if ((target > this.t.a.length)) {
    $p_scm_HashMap__growTable__I__V(this, target);
  }
});
$p.f2 = (function(xs) {
  $j_scala$002ecollection$002emutable$002e$002dBuilder.$f_scm_Builder__sizeHint__sc_IterableOnce__I__V(this, xs, 0);
  if (false) {
    var f = new $j_scala$002eruntime$002e$002dAbstract$002dFunction3$002e$0024$0024$002dLambda$002426e0a25d9b29f6b82ea50ab7badf4fb70c5c74e1.$c_sr_AbstractFunction3_$$Lambda$26e0a25d9b29f6b82ea50ab7badf4fb70c5c74e1(((v1$2, v2$2, v3$2) => {
      var h = (v3$2 | 0);
      $p_scm_HashMap__put0__O__O__I__Z__s_Some(this, v1$2, v2$2, (h ^ ((h >>> 16) | 0)), false);
    }));
    xs.ho.hs(f);
    return this;
  } else if ((xs instanceof $c_scm_HashMap)) {
    var iter = xs.h3();
    while (iter.i()) {
      var next = iter.g();
      $p_scm_HashMap__put0__O__O__I__Z__s_Some(this, next.br, next.au, next.aW, false);
    }
    return this;
  } else if (false) {
    var iter$2 = xs.hr();
    while (iter$2.i()) {
      var entry = iter$2.g();
      $p_scm_HashMap__put0__O__O__I__Z__s_Some(this, entry.hv(), entry.hw(), entry.hu(), false);
    }
    return this;
  } else {
    return ($j_scala$002ecollection$002emutable$002e$002dMap.$is_scm_Map(xs) ? (xs.cs(new $j_scala$002eruntime$002e$002dAbstract$002dFunction2$002e$0024$0024$002dLambda$0024286cbfc6187197affcadc8465aaec93d6b7d20dc.$c_sr_AbstractFunction2_$$Lambda$286cbfc6187197affcadc8465aaec93d6b7d20dc(((key$2, value$2) => {
      var originalHash = $j_java$002elang$002e$002dObject.$m_sr_Statics$().u(key$2);
      return $p_scm_HashMap__put0__O__O__I__Z__s_Some(this, key$2, value$2, (originalHash ^ ((originalHash >>> 16) | 0)), false);
    }))), this) : $j_java$002elang$002e$002dObject.$f_scm_Growable__addAll__sc_IterableOnce__scm_Growable(this, xs));
  }
});
$p.c = (function() {
  return ((this.at === 0) ? $j_java$002elang$002e$002dObject.$m_sc_Iterator$().G : new $j_scala$002ecollection$002emutable$002e$002dHash$002dMap$0024$0024anon$00241.$c_scm_HashMap$$anon$1(this));
});
$p.h3 = (function() {
  return ((this.at === 0) ? $j_java$002elang$002e$002dObject.$m_sc_Iterator$().G : new $j_scala$002ecollection$002emutable$002e$002dHash$002dMap$0024$0024anon$00244.$c_scm_HashMap$$anon$4(this));
});
$p.dH = (function(key) {
  var originalHash = $j_java$002elang$002e$002dObject.$m_sr_Statics$().u(key);
  var hash = (originalHash ^ ((originalHash >>> 16) | 0));
  matchResult1: {
    var x34;
    var x1 = this.t.a[(hash & ((this.t.a.length - 1) | 0))];
    if ((x1 === null)) {
      var x34 = null;
      break matchResult1;
    }
    var x34 = x1.cZ(key, hash);
  }
  if ((x34 === null)) {
    return $j_scala$002e$002dNone$0024.$m_s_None$();
  }
  return new $j_scala$002e$002dSome.$c_s_Some(x34.au);
});
$p.l = (function(key) {
  var originalHash = $j_java$002elang$002e$002dObject.$m_sr_Statics$().u(key);
  var hash = (originalHash ^ ((originalHash >>> 16) | 0));
  matchResult1: {
    var x35;
    var x1 = this.t.a[(hash & ((this.t.a.length - 1) | 0))];
    if ((x1 === null)) {
      var x35 = null;
      break matchResult1;
    }
    var x35 = x1.cZ(key, hash);
  }
  if ((x35 === null)) {
    return $j_scala$002ecollection$002e$002dMap$002dOps.$f_sc_MapOps__default__O__O(this, key);
  }
  return x35.au;
});
$p.fr = (function(key, default$1) {
  if ((!($j_java$002elang$002e$002dObject.$objectGetClass(this) === $d_scm_HashMap.l()))) {
    return $j_scala$002ecollection$002e$002dMap$002dOps.$f_sc_MapOps__getOrElse__O__F0__O(this, key, default$1);
  } else {
    var originalHash = $j_java$002elang$002e$002dObject.$m_sr_Statics$().u(key);
    var hash = (originalHash ^ ((originalHash >>> 16) | 0));
    matchResult1: {
      var nd;
      var x1 = this.t.a[(hash & ((this.t.a.length - 1) | 0))];
      if ((x1 === null)) {
        var nd = null;
        break matchResult1;
      }
      var nd = x1.cZ(key, hash);
    }
    return ((nd === null) ? default$1.a0() : nd.au);
  }
});
$p.gk = (function(elem) {
  $p_scm_HashMap__put0__O__O__Z__s_Some(this, elem.S(), elem.a8(), false);
  return this;
});
$p.o = (function() {
  return this.at;
});
$p.n = (function() {
  return (this.at === 0);
});
$p.cs = (function(f) {
  var len = this.t.a.length;
  var i = 0;
  while ((i < len)) {
    var n = this.t.a[i];
    if ((n !== null)) {
      n.cs(f);
    }
    i = ((1 + i) | 0);
  }
});
$p.a7 = (function() {
  return "HashMap";
});
$p.j = (function() {
  if (this.n()) {
    return $j_java$002elang$002e$002dObject.$m_s_util_hashing_MurmurHash3$().dt;
  } else {
    var tupleHashIterator = new $j_scala$002ecollection$002emutable$002e$002dHash$002dMap$0024$0024anon$00245.$c_scm_HashMap$$anon$5(this);
    return $j_java$002elang$002e$002dObject.$m_s_util_hashing_MurmurHash3$().fL(tupleHashIterator, $j_java$002elang$002e$002dObject.$m_s_util_hashing_MurmurHash3$().cS);
  }
});
$p.aj = (function(elems) {
  return this.f2(elems);
});
$p.ac = (function(elem) {
  return this.gk(elem);
});
function $isArrayOf_scm_HashMap(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.bB)));
}
export { $isArrayOf_scm_HashMap as $isArrayOf_scm_HashMap };
var $d_scm_HashMap = new $j_java$002elang$002e$002dObject.$TypeData().i($c_scm_HashMap, "scala.collection.mutable.HashMap", ({
  bB: 1,
  dP: 1,
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
  A: 1,
  u: 1,
  z: 1,
  W: 1,
  X: 1,
  a7: 1,
  aq: 1,
  ed: 1,
  aG: 1,
  o: 1,
  dp: 1,
  a: 1
}));
export { $d_scm_HashMap as $d_scm_HashMap };
