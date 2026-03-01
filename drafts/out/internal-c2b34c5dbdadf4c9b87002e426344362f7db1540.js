'use strict';
import * as $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e from "./internal-ae9a4288cef3d3827cff28fde9c5ba209927925e.js";
var $p;
/** @constructor */
function $c_Lgpu_buffers_AttribLayoutHelper$() {
  this.dW = null;
  this.dX = false;
}
export { $c_Lgpu_buffers_AttribLayoutHelper$ as $c_Lgpu_buffers_AttribLayoutHelper$ };
$p = $c_Lgpu_buffers_AttribLayoutHelper$.prototype = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$h_O();
$p.constructor = $c_Lgpu_buffers_AttribLayoutHelper$;
/** @constructor */
function $h_Lgpu_buffers_AttribLayoutHelper$() {
}
export { $h_Lgpu_buffers_AttribLayoutHelper$ as $h_Lgpu_buffers_AttribLayoutHelper$ };
$h_Lgpu_buffers_AttribLayoutHelper$.prototype = $p;
$p.ft = (function() {
  if ((!this.dX)) {
    this.dW = new $c_Lgpu_buffers_AttribLayoutHelper$$anon$2();
    this.dX = true;
  }
  return this.dW;
});
var $d_Lgpu_buffers_AttribLayoutHelper$ = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$TypeData().i($c_Lgpu_buffers_AttribLayoutHelper$, "gpu.buffers.AttribLayoutHelper$", ({
  bM: 1
}));
export { $d_Lgpu_buffers_AttribLayoutHelper$ as $d_Lgpu_buffers_AttribLayoutHelper$ };
var $n_Lgpu_buffers_AttribLayoutHelper$;
function $m_Lgpu_buffers_AttribLayoutHelper$() {
  if ((!$n_Lgpu_buffers_AttribLayoutHelper$)) {
    $n_Lgpu_buffers_AttribLayoutHelper$ = new $c_Lgpu_buffers_AttribLayoutHelper$();
  }
  return $n_Lgpu_buffers_AttribLayoutHelper$;
}
export { $m_Lgpu_buffers_AttribLayoutHelper$ as $m_Lgpu_buffers_AttribLayoutHelper$ };
/** @constructor */
function $c_Lgpu_math_package$package$() {
  this.e4 = null;
  this.e5 = false;
  this.e2 = null;
  this.e3 = false;
}
export { $c_Lgpu_math_package$package$ as $c_Lgpu_math_package$package$ };
$p = $c_Lgpu_math_package$package$.prototype = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$h_O();
$p.constructor = $c_Lgpu_math_package$package$;
/** @constructor */
function $h_Lgpu_math_package$package$() {
}
export { $h_Lgpu_math_package$package$ as $h_Lgpu_math_package$package$ };
$h_Lgpu_math_package$package$.prototype = $p;
$p.d3 = (function() {
  if ((!this.e5)) {
    this.e4 = new $c_Lgpu_math_package$package$$anon$1();
    this.e5 = true;
  }
  return this.e4;
});
$p.z = (function() {
  if ((!this.e3)) {
    this.e2 = new $c_Lgpu_math_package$package$$anon$4();
    this.e3 = true;
  }
  return this.e2;
});
var $d_Lgpu_math_package$package$ = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$TypeData().i($c_Lgpu_math_package$package$, "gpu.math.package$package$", ({
  bU: 1
}));
export { $d_Lgpu_math_package$package$ as $d_Lgpu_math_package$package$ };
var $n_Lgpu_math_package$package$;
function $m_Lgpu_math_package$package$() {
  if ((!$n_Lgpu_math_package$package$)) {
    $n_Lgpu_math_package$package$ = new $c_Lgpu_math_package$package$();
  }
  return $n_Lgpu_math_package$package$;
}
export { $m_Lgpu_math_package$package$ as $m_Lgpu_math_package$package$ };
function $p_Lgpu_shader_layouts$__calculateOffsets__sjs_js_Array__sjs_js_Array($thiz, sizes) {
  var items$proxy1 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sr_ScalaRunTime$().bw(new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$ac_I(new Int32Array([])));
  var offsets = [...$j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sjsr_Compat$().b(items$proxy1)];
  var elem = 0;
  elem = 0;
  var len = (sizes.length | 0);
  var i = 0;
  while ((i < len)) {
    var x0 = sizes[i];
    var size = (x0 | 0);
    offsets.push(elem);
    elem = ((elem + size) | 0);
    i = ((1 + i) | 0);
  }
  return offsets;
}
export { $p_Lgpu_shader_layouts$__calculateOffsets__sjs_js_Array__sjs_js_Array as $p_Lgpu_shader_layouts$__calculateOffsets__sjs_js_Array__sjs_js_Array };
function $p_Lgpu_shader_layouts$__calculateStride__sjs_js_Array__I($thiz, sizes) {
  var elem = 0;
  elem = 0;
  var len = (sizes.length | 0);
  var i = 0;
  while ((i < len)) {
    var x0 = sizes[i];
    var size = (x0 | 0);
    elem = ((elem + size) | 0);
    i = ((1 + i) | 0);
  }
  return elem;
}
export { $p_Lgpu_shader_layouts$__calculateStride__sjs_js_Array__I as $p_Lgpu_shader_layouts$__calculateStride__sjs_js_Array__I };
/** @constructor */
function $c_Lgpu_shader_layouts$() {
}
export { $c_Lgpu_shader_layouts$ as $c_Lgpu_shader_layouts$ };
$p = $c_Lgpu_shader_layouts$.prototype = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$h_O();
$p.constructor = $c_Lgpu_shader_layouts$;
/** @constructor */
function $h_Lgpu_shader_layouts$() {
}
export { $h_Lgpu_shader_layouts$ as $h_Lgpu_shader_layouts$ };
$h_Lgpu_shader_layouts$.prototype = $p;
$p.fd = (function(device, bindGroupLayouts) {
  return device.createPipelineLayout(({
    "bindGroupLayouts": bindGroupLayouts
  }));
});
var $d_Lgpu_shader_layouts$ = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$TypeData().i($c_Lgpu_shader_layouts$, "gpu.shader.layouts$", ({
  cj: 1
}));
export { $d_Lgpu_shader_layouts$ as $d_Lgpu_shader_layouts$ };
var $n_Lgpu_shader_layouts$;
function $m_Lgpu_shader_layouts$() {
  if ((!$n_Lgpu_shader_layouts$)) {
    $n_Lgpu_shader_layouts$ = new $c_Lgpu_shader_layouts$();
  }
  return $n_Lgpu_shader_layouts$;
}
export { $m_Lgpu_shader_layouts$ as $m_Lgpu_shader_layouts$ };
var $d_Lwebgpu_GPUBindGroupLayout = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$TypeData().i(2, "webgpu.GPUBindGroupLayout", ({
  fw: 1
}), $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$noIsInstance);
export { $d_Lwebgpu_GPUBindGroupLayout as $d_Lwebgpu_GPUBindGroupLayout };
/** @constructor */
function $c_Lgpu_buffers_AttribLayoutHelper$$anon$2() {
}
export { $c_Lgpu_buffers_AttribLayoutHelper$$anon$2 as $c_Lgpu_buffers_AttribLayoutHelper$$anon$2 };
$p = $c_Lgpu_buffers_AttribLayoutHelper$$anon$2.prototype = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$h_O();
$p.constructor = $c_Lgpu_buffers_AttribLayoutHelper$$anon$2;
/** @constructor */
function $h_Lgpu_buffers_AttribLayoutHelper$$anon$2() {
}
export { $h_Lgpu_buffers_AttribLayoutHelper$$anon$2 as $h_Lgpu_buffers_AttribLayoutHelper$$anon$2 };
$h_Lgpu_buffers_AttribLayoutHelper$$anon$2.prototype = $p;
var $d_Lgpu_buffers_AttribLayoutHelper$$anon$2 = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$TypeData().i($c_Lgpu_buffers_AttribLayoutHelper$$anon$2, "gpu.buffers.AttribLayoutHelper$$anon$2", ({
  bN: 1,
  bL: 1
}));
export { $d_Lgpu_buffers_AttribLayoutHelper$$anon$2 as $d_Lgpu_buffers_AttribLayoutHelper$$anon$2 };
/** @constructor */
function $c_s_Conversion() {
}
export { $c_s_Conversion as $c_s_Conversion };
$p = $c_s_Conversion.prototype = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$h_O();
$p.constructor = $c_s_Conversion;
/** @constructor */
function $h_s_Conversion() {
}
export { $h_s_Conversion as $h_s_Conversion };
$h_s_Conversion.prototype = $p;
$p.m = (function() {
  return "<function1>";
});
$p.cq = (function(x$0) {
  return Math.fround(this.l(x$0));
});
$p.w = (function(x$0) {
  return Math.fround(this.l(x$0));
});
var $d_sjs_js_Dynamic = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$TypeData().i(2, "scala.scalajs.js.Dynamic", ({
  fi: 1,
  aH: 1
}), $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$noIsInstance);
export { $d_sjs_js_Dynamic as $d_sjs_js_Dynamic };
/** @constructor */
function $c_Lgpu_math_package$package$$anon$1() {
}
export { $c_Lgpu_math_package$package$$anon$1 as $c_Lgpu_math_package$package$$anon$1 };
$p = $c_Lgpu_math_package$package$$anon$1.prototype = new $h_s_Conversion();
$p.constructor = $c_Lgpu_math_package$package$$anon$1;
/** @constructor */
function $h_Lgpu_math_package$package$$anon$1() {
}
export { $h_Lgpu_math_package$package$$anon$1 as $h_Lgpu_math_package$package$$anon$1 };
$h_Lgpu_math_package$package$$anon$1.prototype = $p;
$p.cq = (function(x) {
  return x;
});
$p.l = (function(x) {
  return Math.fround(x);
});
var $d_Lgpu_math_package$package$$anon$1 = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$TypeData().i($c_Lgpu_math_package$package$$anon$1, "gpu.math.package$package$$anon$1", ({
  bV: 1,
  aS: 1,
  j: 1
}));
export { $d_Lgpu_math_package$package$$anon$1 as $d_Lgpu_math_package$package$$anon$1 };
/** @constructor */
function $c_Lgpu_math_package$package$$anon$4() {
}
export { $c_Lgpu_math_package$package$$anon$4 as $c_Lgpu_math_package$package$$anon$4 };
$p = $c_Lgpu_math_package$package$$anon$4.prototype = new $h_s_Conversion();
$p.constructor = $c_Lgpu_math_package$package$$anon$4;
/** @constructor */
function $h_Lgpu_math_package$package$$anon$4() {
}
export { $h_Lgpu_math_package$package$$anon$4 as $h_Lgpu_math_package$package$$anon$4 };
$h_Lgpu_math_package$package$$anon$4.prototype = $p;
$p.w = (function(_$1) {
  return Math.fround(_$1);
});
$p.l = (function(x) {
  return Math.fround((+x));
});
var $d_Lgpu_math_package$package$$anon$4 = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$TypeData().i($c_Lgpu_math_package$package$$anon$4, "gpu.math.package$package$$anon$4", ({
  bW: 1,
  aS: 1,
  j: 1
}));
export { $d_Lgpu_math_package$package$$anon$4 as $d_Lgpu_math_package$package$$anon$4 };
