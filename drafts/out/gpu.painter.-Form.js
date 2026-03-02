'use strict';
import * as $j_java$002elang$002e$002dObject from "./java.lang.-Object.js";
var $p;
/** @constructor */
function $c_Lgpu_painter_Form(vertexBuffer, vertexCount, topology, frontFace) {
  this.co = null;
  this.cp = 0;
  this.bN = null;
  this.bM = null;
  this.co = vertexBuffer;
  this.cp = vertexCount;
  this.bN = topology;
  this.bM = frontFace;
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
  b0: 1
}));
export { $d_Lgpu_painter_Form as $d_Lgpu_painter_Form };
