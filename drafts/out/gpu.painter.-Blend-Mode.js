'use strict';
import * as $j_java$002elang$002e$002dObject from "./java.lang.-Object.js";
import * as $j_scala$002eruntime$002e$002dEnum$002dValue from "./scala.runtime.-Enum-Value.js";
var $p;
function $s_Lgpu_painter_BlendMode$__Replace__Lgpu_painter_BlendMode() {
  $m_Lgpu_painter_BlendMode$();
  return $t_Lgpu_painter_BlendMode$__Replace;
}
export { $s_Lgpu_painter_BlendMode$__Replace__Lgpu_painter_BlendMode as $s_Lgpu_painter_BlendMode$__Replace__Lgpu_painter_BlendMode };
function $s_Lgpu_painter_BlendMode$__Alpha__Lgpu_painter_BlendMode() {
  $m_Lgpu_painter_BlendMode$();
  return $t_Lgpu_painter_BlendMode$__Alpha;
}
export { $s_Lgpu_painter_BlendMode$__Alpha__Lgpu_painter_BlendMode as $s_Lgpu_painter_BlendMode$__Alpha__Lgpu_painter_BlendMode };
function $s_Lgpu_painter_BlendMode$__Additive__Lgpu_painter_BlendMode() {
  $m_Lgpu_painter_BlendMode$();
  return $t_Lgpu_painter_BlendMode$__Additive;
}
export { $s_Lgpu_painter_BlendMode$__Additive__Lgpu_painter_BlendMode as $s_Lgpu_painter_BlendMode$__Additive__Lgpu_painter_BlendMode };
function $s_Lgpu_painter_BlendMode$__Multiply__Lgpu_painter_BlendMode() {
  $m_Lgpu_painter_BlendMode$();
  return $t_Lgpu_painter_BlendMode$__Multiply;
}
export { $s_Lgpu_painter_BlendMode$__Multiply__Lgpu_painter_BlendMode as $s_Lgpu_painter_BlendMode$__Multiply__Lgpu_painter_BlendMode };
/** @constructor */
function $c_Lgpu_painter_BlendMode$() {
  $n_Lgpu_painter_BlendMode$ = this;
  $t_Lgpu_painter_BlendMode$__Replace = new $c_Lgpu_painter_BlendMode$$anon$11("Replace", 0);
  $t_Lgpu_painter_BlendMode$__Alpha = new $c_Lgpu_painter_BlendMode$$anon$11("Alpha", 1);
  $t_Lgpu_painter_BlendMode$__Additive = new $c_Lgpu_painter_BlendMode$$anon$11("Additive", 2);
  $t_Lgpu_painter_BlendMode$__Multiply = new $c_Lgpu_painter_BlendMode$$anon$11("Multiply", 3);
  $s_Lgpu_painter_BlendMode$__Replace__Lgpu_painter_BlendMode();
  $s_Lgpu_painter_BlendMode$__Alpha__Lgpu_painter_BlendMode();
  $s_Lgpu_painter_BlendMode$__Additive__Lgpu_painter_BlendMode();
  $s_Lgpu_painter_BlendMode$__Multiply__Lgpu_painter_BlendMode();
}
export { $c_Lgpu_painter_BlendMode$ as $c_Lgpu_painter_BlendMode$ };
$p = $c_Lgpu_painter_BlendMode$.prototype = new $j_java$002elang$002e$002dObject.$h_O();
$p.constructor = $c_Lgpu_painter_BlendMode$;
/** @constructor */
function $h_Lgpu_painter_BlendMode$() {
}
export { $h_Lgpu_painter_BlendMode$ as $h_Lgpu_painter_BlendMode$ };
$h_Lgpu_painter_BlendMode$.prototype = $p;
var $d_Lgpu_painter_BlendMode$ = new $j_java$002elang$002e$002dObject.$TypeData().i($c_Lgpu_painter_BlendMode$, "gpu.painter.BlendMode$", ({
  bY: 1,
  B: 1,
  ar: 1
}));
export { $d_Lgpu_painter_BlendMode$ as $d_Lgpu_painter_BlendMode$ };
var $n_Lgpu_painter_BlendMode$;
function $m_Lgpu_painter_BlendMode$() {
  if ((!$n_Lgpu_painter_BlendMode$)) {
    $n_Lgpu_painter_BlendMode$ = new $c_Lgpu_painter_BlendMode$();
  }
  return $n_Lgpu_painter_BlendMode$;
}
export { $m_Lgpu_painter_BlendMode$ as $m_Lgpu_painter_BlendMode$ };
/** @constructor */
function $c_Lgpu_painter_BlendMode() {
}
export { $c_Lgpu_painter_BlendMode as $c_Lgpu_painter_BlendMode };
$p = $c_Lgpu_painter_BlendMode.prototype = new $j_java$002elang$002e$002dObject.$h_O();
$p.constructor = $c_Lgpu_painter_BlendMode;
/** @constructor */
function $h_Lgpu_painter_BlendMode() {
}
export { $h_Lgpu_painter_BlendMode as $h_Lgpu_painter_BlendMode };
$h_Lgpu_painter_BlendMode.prototype = $p;
$p.am = (function() {
  return new $j_java$002elang$002e$002dObject.$c_s_Product$$anon$1(this);
});
$p.hm = (function() {
  var x = $s_Lgpu_painter_BlendMode$__Replace__Lgpu_painter_BlendMode();
  if (((x !== null) && (x === this))) {
    return (void 0);
  }
  var x$3 = $s_Lgpu_painter_BlendMode$__Alpha__Lgpu_painter_BlendMode();
  if (((x$3 !== null) && (x$3 === this))) {
    var _2 = ({
      "srcFactor": "src-alpha",
      "dstFactor": "one-minus-src-alpha",
      "operation": "add"
    });
    var _2$1 = ({
      "srcFactor": "one",
      "dstFactor": "one-minus-src-alpha",
      "operation": "add"
    });
    return ({
      "color": _2,
      "alpha": _2$1
    });
  }
  var x$5 = $s_Lgpu_painter_BlendMode$__Additive__Lgpu_painter_BlendMode();
  if (((x$5 !== null) && (x$5 === this))) {
    var _2$2 = ({
      "srcFactor": "src-alpha",
      "dstFactor": "one",
      "operation": "add"
    });
    var _2$3 = ({
      "srcFactor": "one",
      "dstFactor": "one",
      "operation": "add"
    });
    return ({
      "color": _2$2,
      "alpha": _2$3
    });
  }
  var x$7 = $s_Lgpu_painter_BlendMode$__Multiply__Lgpu_painter_BlendMode();
  if (((x$7 !== null) && (x$7 === this))) {
    var _2$4 = ({
      "srcFactor": "dst-color",
      "dstFactor": "zero",
      "operation": "add"
    });
    var _2$5 = ({
      "srcFactor": "dst-alpha",
      "dstFactor": "zero",
      "operation": "add"
    });
    return ({
      "color": _2$4,
      "alpha": _2$5
    });
  }
  throw new $j_java$002elang$002e$002dObject.$c_s_MatchError(this);
});
/** @constructor */
function $c_Lgpu_painter_BlendMode$$anon$11(\u03b4name$2, _$ordinal$2) {
  this.cA = null;
  this.cA = \u03b4name$2;
}
export { $c_Lgpu_painter_BlendMode$$anon$11 as $c_Lgpu_painter_BlendMode$$anon$11 };
$p = $c_Lgpu_painter_BlendMode$$anon$11.prototype = new $h_Lgpu_painter_BlendMode();
$p.constructor = $c_Lgpu_painter_BlendMode$$anon$11;
/** @constructor */
function $h_Lgpu_painter_BlendMode$$anon$11() {
}
export { $h_Lgpu_painter_BlendMode$$anon$11 as $h_Lgpu_painter_BlendMode$$anon$11 };
$h_Lgpu_painter_BlendMode$$anon$11.prototype = $p;
$p.H = (function() {
  return 0;
});
$p.I = (function(n) {
  return $j_scala$002eruntime$002e$002dEnum$002dValue.$f_sr_EnumValue__productElement__I__O(this, n);
});
$p.J = (function() {
  return this.cA;
});
$p.m = (function() {
  return this.cA;
});
$p.j = (function() {
  return $j_java$002elang$002e$002dObject.$f_T__hashCode__I(this.cA);
});
var $d_Lgpu_painter_BlendMode$$anon$11 = new $j_java$002elang$002e$002dObject.$TypeData().i($c_Lgpu_painter_BlendMode$$anon$11, "gpu.painter.BlendMode$$anon$11", ({
  bZ: 1,
  bX: 1,
  b: 1,
  r: 1,
  a: 1,
  a0: 1,
  a1: 1,
  B: 1,
  Y: 1,
  Z: 1
}));
export { $d_Lgpu_painter_BlendMode$$anon$11 as $d_Lgpu_painter_BlendMode$$anon$11 };
var $t_Lgpu_painter_BlendMode$__Replace = null;
function $u_Lgpu_painter_BlendMode$__Replace(x) {
  $t_Lgpu_painter_BlendMode$__Replace = x;
}
export { $t_Lgpu_painter_BlendMode$__Replace as $t_Lgpu_painter_BlendMode$__Replace, $u_Lgpu_painter_BlendMode$__Replace as $u_Lgpu_painter_BlendMode$__Replace };
var $t_Lgpu_painter_BlendMode$__Alpha = null;
function $u_Lgpu_painter_BlendMode$__Alpha(x) {
  $t_Lgpu_painter_BlendMode$__Alpha = x;
}
export { $t_Lgpu_painter_BlendMode$__Alpha as $t_Lgpu_painter_BlendMode$__Alpha, $u_Lgpu_painter_BlendMode$__Alpha as $u_Lgpu_painter_BlendMode$__Alpha };
var $t_Lgpu_painter_BlendMode$__Additive = null;
function $u_Lgpu_painter_BlendMode$__Additive(x) {
  $t_Lgpu_painter_BlendMode$__Additive = x;
}
export { $t_Lgpu_painter_BlendMode$__Additive as $t_Lgpu_painter_BlendMode$__Additive, $u_Lgpu_painter_BlendMode$__Additive as $u_Lgpu_painter_BlendMode$__Additive };
var $t_Lgpu_painter_BlendMode$__Multiply = null;
function $u_Lgpu_painter_BlendMode$__Multiply(x) {
  $t_Lgpu_painter_BlendMode$__Multiply = x;
}
export { $t_Lgpu_painter_BlendMode$__Multiply as $t_Lgpu_painter_BlendMode$__Multiply, $u_Lgpu_painter_BlendMode$__Multiply as $u_Lgpu_painter_BlendMode$__Multiply };
