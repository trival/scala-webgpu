'use strict';
import * as $j_java$002elang$002e$002dObject from "./java.lang.-Object.js";
var $p;
/** @constructor */
function $c_Lgpu_painter_Form(vertexBuffer, vertexCount, topology, frontFace) {
  this.bg = null;
  this.bh = 0;
  this.aR = null;
  this.aQ = null;
  this.bg = vertexBuffer;
  this.bh = vertexCount;
  this.aR = topology;
  this.aQ = frontFace;
}
export { $c_Lgpu_painter_Form as $c_Lgpu_painter_Form };
$p = $c_Lgpu_painter_Form.prototype = new $j_java$002elang$002e$002dObject.$h_O();
$p.constructor = $c_Lgpu_painter_Form;
/** @constructor */
function $h_Lgpu_painter_Form() {
}
export { $h_Lgpu_painter_Form as $h_Lgpu_painter_Form };
$h_Lgpu_painter_Form.prototype = $p;
var $d_Lgpu_painter_Form = new $j_java$002elang$002e$002dObject.$TypeData().i($c_Lgpu_painter_Form, "gpu.painter.Form", ({
  ao: 1
}));
export { $d_Lgpu_painter_Form as $d_Lgpu_painter_Form };
