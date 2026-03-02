'use strict';
import * as $j_java$002elang$002e$002dObject from "./java.lang.-Object.js";
var $p;
/** @constructor */
function $c_Lgpu_painter_Shape(form, shade, bindings, cullMode, blendState) {
  this.al = null;
  this.aN = null;
  this.aM = null;
  this.bR = null;
  this.bj = null;
  this.al = form;
  this.aN = shade;
  this.aM = bindings;
  this.bR = cullMode;
  this.bj = blendState;
}
export { $c_Lgpu_painter_Shape as $c_Lgpu_painter_Shape };
$p = $c_Lgpu_painter_Shape.prototype = new $j_java$002elang$002e$002dObject.$h_O();
$p.constructor = $c_Lgpu_painter_Shape;
/** @constructor */
function $h_Lgpu_painter_Shape() {
}
export { $h_Lgpu_painter_Shape as $h_Lgpu_painter_Shape };
$h_Lgpu_painter_Shape.prototype = $p;
$p.dN = (function(slots) {
  slots.bE(new $j_java$002elang$002e$002dObject.$c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28(((x$1$3) => {
    matchResult1: {
      if ((x$1$3 !== null)) {
        var slot = (x$1$3.w() | 0);
        var binding = x$1$3.z();
        this.aM[slot] = binding;
        break matchResult1;
      }
      throw new $j_java$002elang$002e$002dObject.$c_s_MatchError(x$1$3);
    }
  })));
  return this;
});
var $d_Lgpu_painter_Shape = new $j_java$002elang$002e$002dObject.$TypeData().i($c_Lgpu_painter_Shape, "gpu.painter.Shape", ({
  b3: 1
}));
export { $d_Lgpu_painter_Shape as $d_Lgpu_painter_Shape };
