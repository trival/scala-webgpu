'use strict';
import * as $j_java$002elang$002e$002dObject from "./java.lang.-Object.js";
import * as $j_scala$002eruntime$002e$002dStatics$0024 from "./scala.runtime.-Statics$.js";
var $p;
/** @constructor */
function $c_s_util_hashing_MurmurHash3() {
}
export { $c_s_util_hashing_MurmurHash3 as $c_s_util_hashing_MurmurHash3 };
$p = $c_s_util_hashing_MurmurHash3.prototype = new $j_java$002elang$002e$002dObject.$h_O();
$p.constructor = $c_s_util_hashing_MurmurHash3;
/** @constructor */
function $h_s_util_hashing_MurmurHash3() {
}
export { $h_s_util_hashing_MurmurHash3 as $h_s_util_hashing_MurmurHash3 };
$h_s_util_hashing_MurmurHash3.prototype = $p;
$p.f = (function(hash, data) {
  var h = this.au(hash, data);
  var i = h;
  h = ((i << 13) | ((i >>> 19) | 0));
  return (((-430675100) + Math.imul(5, h)) | 0);
});
$p.au = (function(hash, data) {
  var k = data;
  k = Math.imul((-862048943), k);
  var i = k;
  k = ((i << 15) | ((i >>> 17) | 0));
  k = Math.imul(461845907, k);
  return (hash ^ k);
});
$p.q = (function(hash, length) {
  return this.Z((hash ^ length));
});
$p.Z = (function(hash) {
  var h = hash;
  h = (h ^ ((h >>> 16) | 0));
  h = Math.imul((-2048144789), h);
  h = (h ^ ((h >>> 13) | 0));
  h = Math.imul((-1028477387), h);
  h = (h ^ ((h >>> 16) | 0));
  return h;
});
$p.Y = (function(x, seed, ignorePrefix) {
  var arr = x.w();
  if ((arr === 0)) {
    return ((!ignorePrefix) ? $j_java$002elang$002e$002dObject.$f_T__hashCode__I(x.y()) : seed);
  } else {
    var h = seed;
    if ((!ignorePrefix)) {
      h = this.f(h, $j_java$002elang$002e$002dObject.$f_T__hashCode__I(x.y()));
    }
    var i = 0;
    while ((i < arr)) {
      h = this.f(h, $j_scala$002eruntime$002e$002dStatics$0024.$m_sr_Statics$().k(x.x(i)));
      i = ((1 + i) | 0);
    }
    return this.q(h, arr);
  }
});
$p.aT = (function(xs, seed) {
  var a = 0;
  var b = 0;
  var n = 0;
  var c = 1;
  var iterator = xs.r();
  while (iterator.l()) {
    var x = iterator.i();
    var h = $j_scala$002eruntime$002e$002dStatics$0024.$m_sr_Statics$().k(x);
    a = ((a + h) | 0);
    b = (b ^ h);
    c = Math.imul(c, (1 | h));
    n = ((1 + n) | 0);
  }
  var h$2 = seed;
  h$2 = this.f(h$2, a);
  h$2 = this.f(h$2, b);
  h$2 = this.au(h$2, c);
  return this.q(h$2, n);
});
$p.aN = (function(xs, seed) {
  var it = xs.r();
  var h = seed;
  if ((!it.l())) {
    return this.q(h, 0);
  }
  var x0 = it.i();
  if ((!it.l())) {
    return this.q(this.f(h, $j_scala$002eruntime$002e$002dStatics$0024.$m_sr_Statics$().k(x0)), 1);
  }
  var x1 = it.i();
  var initial = $j_scala$002eruntime$002e$002dStatics$0024.$m_sr_Statics$().k(x0);
  h = this.f(h, initial);
  var h0 = h;
  var prev = $j_scala$002eruntime$002e$002dStatics$0024.$m_sr_Statics$().k(x1);
  var rangeDiff = ((prev - initial) | 0);
  var i = 2;
  while (it.l()) {
    h = this.f(h, prev);
    var hash = $j_scala$002eruntime$002e$002dStatics$0024.$m_sr_Statics$().k(it.i());
    if (((rangeDiff !== ((hash - prev) | 0)) || (rangeDiff === 0))) {
      h = this.f(h, hash);
      i = ((1 + i) | 0);
      while (it.l()) {
        h = this.f(h, $j_scala$002eruntime$002e$002dStatics$0024.$m_sr_Statics$().k(it.i()));
        i = ((1 + i) | 0);
      }
      return this.q(h, i);
    }
    prev = hash;
    i = ((1 + i) | 0);
  }
  return this.Z(this.f(this.f(h0, rangeDiff), prev));
});
$p.aO = (function(start, step, last, seed) {
  return this.Z(this.f(this.f(this.f(seed, start), step), last));
});
$p.aJ = (function(a, seed) {
  var h = seed;
  var l = a.p();
  switch (l) {
    case 0: {
      return this.q(h, 0);
      break;
    }
    case 1: {
      return this.q(this.f(h, $j_scala$002eruntime$002e$002dStatics$0024.$m_sr_Statics$().k(a.n(0))), 1);
      break;
    }
    default: {
      var initial = $j_scala$002eruntime$002e$002dStatics$0024.$m_sr_Statics$().k(a.n(0));
      h = this.f(h, initial);
      var h0 = h;
      var prev = $j_scala$002eruntime$002e$002dStatics$0024.$m_sr_Statics$().k(a.n(1));
      var rangeDiff = ((prev - initial) | 0);
      var i = 2;
      while ((i < l)) {
        h = this.f(h, prev);
        var hash = $j_scala$002eruntime$002e$002dStatics$0024.$m_sr_Statics$().k(a.n(i));
        if (((rangeDiff !== ((hash - prev) | 0)) || (rangeDiff === 0))) {
          h = this.f(h, hash);
          i = ((1 + i) | 0);
          while ((i < l)) {
            h = this.f(h, $j_scala$002eruntime$002e$002dStatics$0024.$m_sr_Statics$().k(a.n(i)));
            i = ((1 + i) | 0);
          }
          return this.q(h, l);
        }
        prev = hash;
        i = ((1 + i) | 0);
      }
      return this.Z(this.f(this.f(h0, rangeDiff), prev));
    }
  }
});
$p.aK = (function(xs, seed) {
  var n = 0;
  var h = seed;
  var rangeState = 0;
  var rangeDiff = 0;
  var prev = 0;
  var initial = 0;
  var elems = xs;
  while ((!elems.A())) {
    elems.at();
  }
  return ((rangeState === 2) ? this.aO(initial, rangeDiff, prev, seed) : this.q(h, n));
});
