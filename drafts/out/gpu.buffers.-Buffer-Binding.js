'use strict';
import * as $j_java$002elang$002e$002dObject from "./java.lang.-Object.js";
var $p;
/** @constructor */
function $c_Lgpu_buffers_BufferBinding(buffer, device, uv) {
  this.Z = null;
  this.aO = null;
  this.a0 = null;
  this.Z = buffer;
  this.aO = device;
  var b = (buffer.r().byteLength | 0);
  var value = ((b < 16) ? 16 : b);
  var $x_1 = device.createBuffer(({
    "size": value,
    "usage": 72
  }));
  this.a0 = $x_1;
}
export { $c_Lgpu_buffers_BufferBinding as $c_Lgpu_buffers_BufferBinding };
$p = $c_Lgpu_buffers_BufferBinding.prototype = new $j_java$002elang$002e$002dObject.$h_O();
$p.constructor = $c_Lgpu_buffers_BufferBinding;
/** @constructor */
function $h_Lgpu_buffers_BufferBinding() {
}
export { $h_Lgpu_buffers_BufferBinding as $h_Lgpu_buffers_BufferBinding };
$h_Lgpu_buffers_BufferBinding.prototype = $p;
var $d_Lgpu_buffers_BufferBinding = new $j_java$002elang$002e$002dObject.$TypeData().i($c_Lgpu_buffers_BufferBinding, "gpu.buffers.BufferBinding", ({
  af: 1
}));
export { $d_Lgpu_buffers_BufferBinding as $d_Lgpu_buffers_BufferBinding };
