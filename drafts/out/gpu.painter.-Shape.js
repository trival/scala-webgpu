'use strict';
import * as $j_java$002elang$002e$002dObject from "./java.lang.-Object.js";
import * as $j_scala$002eruntime$002e$002dAbstract$002dFunction1$002e$0024$0024$002dLambda$002470e1780b84463d18653aacefee3ab989ac625f28 from "./scala.runtime.-Abstract-Function1.$$-Lambda$70e1780b84463d18653aacefee3ab989ac625f28.js";
var $p;
/** @constructor */
function $c_Lgpu_painter_Shape(form, shade, bindings, cullMode, blendState) {
  this.P = null;
  this.a2 = null;
  this.a1 = null;
  this.aV = null;
  this.ap = null;
  this.P = form;
  this.a2 = shade;
  this.a1 = bindings;
  this.aV = cullMode;
  this.ap = blendState;
}
export { $c_Lgpu_painter_Shape as $c_Lgpu_painter_Shape };
$p = $c_Lgpu_painter_Shape.prototype = new $j_java$002elang$002e$002dObject.$h_O();
$p.constructor = $c_Lgpu_painter_Shape;
/** @constructor */
function $h_Lgpu_painter_Shape() {
}
export { $h_Lgpu_painter_Shape as $h_Lgpu_painter_Shape };
$h_Lgpu_painter_Shape.prototype = $p;
$p.c1 = (function(slots) {
  slots.aI(new $j_scala$002eruntime$002e$002dAbstract$002dFunction1$002e$0024$0024$002dLambda$002470e1780b84463d18653aacefee3ab989ac625f28.$c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28(((x$1$3) => {
    matchResult1: {
      if ((x$1$3 !== null)) {
        var slot = (x$1$3.r() | 0);
        var binding = x$1$3.u();
        this.a1[slot] = binding;
        break matchResult1;
      }
      throw new $j_java$002elang$002e$002dObject.$c_s_MatchError(x$1$3);
    }
  })));
  return this;
});
var $d_Lgpu_painter_Shape = new $j_java$002elang$002e$002dObject.$TypeData().i($c_Lgpu_painter_Shape, "gpu.painter.Shape", ({
  ar: 1
}));
export { $d_Lgpu_painter_Shape as $d_Lgpu_painter_Shape };
