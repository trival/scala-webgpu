'use strict';
import * as $j_java$002elang$002e$002dObject from "./java.lang.-Object.js";
var $p;
/** @constructor */
function $c_sr_Statics$() {
}
export { $c_sr_Statics$ as $c_sr_Statics$ };
$p = $c_sr_Statics$.prototype = new $j_java$002elang$002e$002dObject.$h_O();
$p.constructor = $c_sr_Statics$;
/** @constructor */
function $h_sr_Statics$() {
}
export { $h_sr_Statics$ as $h_sr_Statics$ };
$h_sr_Statics$.prototype = $p;
$p.aL = (function(lv) {
  var lo = lv.a;
  var hi = lv.b;
  return ((hi === (lo >> 31)) ? lo : (lo ^ hi));
});
$p.aE = (function(dv) {
  var iv = $j_java$002elang$002e$002dObject.$doubleToInt(dv);
  if ((iv === dv)) {
    return iv;
  } else {
    var this$1 = $j_java$002elang$002e$002dObject.$m_RTLong$();
    var lo = this$1.aw(dv);
    var hi = this$1.d;
    if ((((4.294967296E9 * hi) + (lo >>> 0.0)) === dv)) {
      return (lo ^ hi);
    } else {
      var valueInt = (dv | 0);
      if (((valueInt === dv) && ((1.0 / dv) !== (-Infinity)))) {
        return valueInt;
      } else if ((dv !== dv)) {
        return 2146959360;
      } else {
        var fpBitsDataView = $j_java$002elang$002e$002dObject.$fpBitsDataView;
        fpBitsDataView.setFloat64(0, dv, true);
        return ((fpBitsDataView.getInt32(0, true) | 0) ^ (fpBitsDataView.getInt32(4, true) | 0));
      }
    }
  }
});
$p.k = (function(x) {
  if ((x === null)) {
    return 0;
  } else if (((typeof x) === "number")) {
    return this.aE((+x));
  } else if ((x instanceof $j_java$002elang$002e$002dObject.$c_RTLong)) {
    var t = $j_java$002elang$002e$002dObject.$uJ(x);
    return this.aL(new $j_java$002elang$002e$002dObject.$c_RTLong(t.a, t.b));
  } else {
    return $j_java$002elang$002e$002dObject.$dp_hashCode__I(x);
  }
});
var $d_sr_Statics$ = new $j_java$002elang$002e$002dObject.$TypeData().i($c_sr_Statics$, "scala.runtime.Statics$", ({
  b1: 1
}));
export { $d_sr_Statics$ as $d_sr_Statics$ };
var $n_sr_Statics$;
function $m_sr_Statics$() {
  if ((!$n_sr_Statics$)) {
    $n_sr_Statics$ = new $c_sr_Statics$();
  }
  return $n_sr_Statics$;
}
export { $m_sr_Statics$ as $m_sr_Statics$ };
