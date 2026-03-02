'use strict';
import * as $j_java$002elang$002e$002dObject from "./java.lang.-Object.js";
var $p;
/** @constructor */
function $c_Lgpu_painter_PipelineKey(shadeId, blendMode, cullMode, topology, frontFace, targetFormat) {
  this.bX = 0;
  this.bx = null;
  this.by = null;
  this.bA = null;
  this.bz = null;
  this.bg = null;
  this.bX = shadeId;
  this.bx = blendMode;
  this.by = cullMode;
  this.bA = topology;
  this.bz = frontFace;
  this.bg = targetFormat;
}
export { $c_Lgpu_painter_PipelineKey as $c_Lgpu_painter_PipelineKey };
$p = $c_Lgpu_painter_PipelineKey.prototype = new $j_java$002elang$002e$002dObject.$h_O();
$p.constructor = $c_Lgpu_painter_PipelineKey;
/** @constructor */
function $h_Lgpu_painter_PipelineKey() {
}
export { $h_Lgpu_painter_PipelineKey as $h_Lgpu_painter_PipelineKey };
$h_Lgpu_painter_PipelineKey.prototype = $p;
$p.am = (function() {
  return new $j_java$002elang$002e$002dObject.$c_s_Product$$anon$1(this);
});
$p.j = (function() {
  var acc = (-889275714);
  acc = $j_java$002elang$002e$002dObject.$m_sr_Statics$().p(acc, (-1645639619));
  acc = $j_java$002elang$002e$002dObject.$m_sr_Statics$().p(acc, this.bX);
  acc = $j_java$002elang$002e$002dObject.$m_sr_Statics$().p(acc, $j_java$002elang$002e$002dObject.$m_sr_Statics$().u(this.bx));
  acc = $j_java$002elang$002e$002dObject.$m_sr_Statics$().p(acc, $j_java$002elang$002e$002dObject.$m_sr_Statics$().u(this.by));
  acc = $j_java$002elang$002e$002dObject.$m_sr_Statics$().p(acc, $j_java$002elang$002e$002dObject.$m_sr_Statics$().u(this.bA));
  acc = $j_java$002elang$002e$002dObject.$m_sr_Statics$().p(acc, $j_java$002elang$002e$002dObject.$m_sr_Statics$().u(this.bz));
  acc = $j_java$002elang$002e$002dObject.$m_sr_Statics$().p(acc, $j_java$002elang$002e$002dObject.$m_sr_Statics$().u(this.bg));
  return $j_java$002elang$002e$002dObject.$m_sr_Statics$().a9(acc, 6);
});
$p.h = (function(x$0) {
  if ((this === x$0)) {
    return true;
  } else if ((x$0 instanceof $c_Lgpu_painter_PipelineKey)) {
    if ((this.bX === x$0.bX)) {
      var x = this.bx;
      var x$2 = x$0.bx;
      var $x_4 = ((x === null) ? (x$2 === null) : (x === x$2));
    } else {
      var $x_4 = false;
    }
    if ($x_4) {
      var x$3 = this.by;
      var x$4 = x$0.by;
      var $x_3 = ((x$3 === null) ? (x$4 === null) : (x$3 === x$4));
    } else {
      var $x_3 = false;
    }
    if ($x_3) {
      var x$5 = this.bA;
      var x$6 = x$0.bA;
      var $x_2 = ((x$5 === null) ? (x$6 === null) : (x$5 === x$6));
    } else {
      var $x_2 = false;
    }
    if ($x_2) {
      var x$7 = this.bz;
      var x$8 = x$0.bz;
      var $x_1 = ((x$7 === null) ? (x$8 === null) : (x$7 === x$8));
    } else {
      var $x_1 = false;
    }
    if ($x_1) {
      return (this.bg === x$0.bg);
    } else {
      return false;
    }
  } else {
    return false;
  }
});
$p.m = (function() {
  return $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().dv(this);
});
$p.H = (function() {
  return 6;
});
$p.J = (function() {
  return "PipelineKey";
});
$p.I = (function(n) {
  switch (n) {
    case 0: {
      return this.bX;
      break;
    }
    case 1: {
      return this.bx;
      break;
    }
    case 2: {
      return this.by;
      break;
    }
    case 3: {
      return this.bA;
      break;
    }
    case 4: {
      return this.bz;
      break;
    }
    case 5: {
      return this.bg;
      break;
    }
    default: {
      throw $j_java$002elang$002e$002dObject.$ct_jl_IndexOutOfBoundsException__T__(new $j_java$002elang$002e$002dObject.$c_jl_IndexOutOfBoundsException(), ("" + n));
    }
  }
});
function $isArrayOf_Lgpu_painter_PipelineKey(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.aJ)));
}
export { $isArrayOf_Lgpu_painter_PipelineKey as $isArrayOf_Lgpu_painter_PipelineKey };
var $d_Lgpu_painter_PipelineKey = new $j_java$002elang$002e$002dObject.$TypeData().i($c_Lgpu_painter_PipelineKey, "gpu.painter.PipelineKey", ({
  aJ: 1,
  b: 1,
  r: 1,
  a: 1
}));
export { $d_Lgpu_painter_PipelineKey as $d_Lgpu_painter_PipelineKey };
