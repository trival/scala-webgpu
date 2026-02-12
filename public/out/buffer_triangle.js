'use strict';
import * as $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee from "./internal-cad23071acfd2512298b5f90a8a6559377448aee.js";
var $p;
function $p_Lbuffer\uff3ftriangle_BufferTriangle$__setStatus$6__Lorg_scalajs_dom_HTMLElement__T__Z__V($thiz, statusEl$1, msg, isError) {
  statusEl$1.textContent = msg;
  statusEl$1.setAttribute("class", (isError ? "error" : "success"));
}
function $p_Lbuffer\uff3ftriangle_BufferTriangle$__render$1__sr_DoubleRef__T2__Lwebgpu_GPUDevice__Lwebgpu_GPUBuffer__Lwebgpu_GPUCanvasContext__Lwebgpu_GPURenderPipeline__Lwebgpu_GPUBindGroup__Lwebgpu_GPUBuffer__D__V($thiz, startTime$1, tintData$1, device$1, uniformBuffer$1, context$1, pipeline$1, bindGroup$1, vertexBuffer$1, time) {
  var elapsed = ((time - startTime$1.a1) / 2000.0);
  var a = (2.0 * elapsed);
  var r = Math.fround(((0.5 * (+Math.sin(a))) + 0.5));
  var a$1 = ((2.0 * elapsed) + 2.0);
  var g = Math.fround(((0.5 * (+Math.sin(a$1))) + 0.5));
  var a$2 = ((2.0 * elapsed) + 4.0);
  var b = Math.fround(((0.5 * (+Math.sin(a$2))) + 0.5));
  var _1 = tintData$1.j;
  var value;
  var value = r;
  _1.setFloat32(0, value, true);
  var value$2;
  var value$2 = g;
  _1.setFloat32(4, value$2, true);
  var value$3;
  var value$3 = b;
  _1.setFloat32(8, value$3, true);
  var value$4;
  var value$4 = 1.0;
  _1.setFloat32(12, value$4, true);
  device$1.queue.writeBuffer(uniformBuffer$1, 0, tintData$1.j.buffer);
  var commandEncoder = device$1.createCommandEncoder();
  var textureView = context$1.getCurrentTexture().createView();
  var _2 = ({
    "r": 0.15,
    "g": 0.1,
    "b": 0.1,
    "a": 1.0
  });
  var _2$1 = [({
    "view": textureView,
    "loadOp": "clear",
    "storeOp": "store",
    "clearValue": _2
  })];
  var renderPass = commandEncoder.beginRenderPass(({
    "colorAttachments": _2$1
  }));
  renderPass.setPipeline(pipeline$1);
  renderPass.setBindGroup(0, bindGroup$1);
  renderPass.setVertexBuffer(0, vertexBuffer$1);
  renderPass.draw(3);
  renderPass.end();
  device$1.queue.submit([commandEncoder.finish()]);
  window.requestAnimationFrame(((t$3) => {
    $p_Lbuffer\uff3ftriangle_BufferTriangle$__render$1__sr_DoubleRef__T2__Lwebgpu_GPUDevice__Lwebgpu_GPUBuffer__Lwebgpu_GPUCanvasContext__Lwebgpu_GPURenderPipeline__Lwebgpu_GPUBindGroup__Lwebgpu_GPUBuffer__D__V($thiz, startTime$1, tintData$1, device$1, uniformBuffer$1, context$1, pipeline$1, bindGroup$1, vertexBuffer$1, (+t$3));
  }));
}
/** @constructor */
function $c_Lbuffer\uff3ftriangle_BufferTriangle$() {
}
$p = $c_Lbuffer\uff3ftriangle_BufferTriangle$.prototype = new $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$h_O();
$p.constructor = $c_Lbuffer\uff3ftriangle_BufferTriangle$;
/** @constructor */
function $h_Lbuffer\uff3ftriangle_BufferTriangle$() {
}
$h_Lbuffer\uff3ftriangle_BufferTriangle$.prototype = $p;
$p.a7 = (function() {
  var statusEl = document.getElementById("status");
  var canvas = document.getElementById("canvas");
  matchResult1: {
    var x = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_Lwebgpu_WebGPU$().as();
    var x1 = ((x === (void 0)) ? $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_s_None$() : new $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$c_s_Some(x));
    if (($j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_s_None$() === x1)) {
      $p_Lbuffer\uff3ftriangle_BufferTriangle$__setStatus$6__Lorg_scalajs_dom_HTMLElement__T__Z__V(this, statusEl, "WebGPU is not supported in this browser", true);
      break matchResult1;
    }
    if ((x1 instanceof $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$c_s_Some)) {
      var gpu = x1.E;
      $p_Lbuffer\uff3ftriangle_BufferTriangle$__setStatus$6__Lorg_scalajs_dom_HTMLElement__T__Z__V(this, statusEl, "WebGPU available, initializing...", false);
      this.a5(gpu, canvas, new $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$c_sr_AbstractFunction2_$$Lambda$286cbfc6187197affcadc8465aaec93d6b7d20dc(((v1$2, v2$2) => {
        $p_Lbuffer\uff3ftriangle_BufferTriangle$__setStatus$6__Lorg_scalajs_dom_HTMLElement__T__Z__V(this, statusEl, v1$2, (!(!v2$2)));
      })));
      break matchResult1;
    }
    throw new $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$c_s_MatchError(x1);
  }
});
$p.a5 = (function(gpu, canvas, setStatus) {
  var promise$proxy1 = gpu.requestAdapter();
  var promise$proxy3 = promise$proxy1.then(((value$2) => {
    if ((value$2 === null)) {
      throw new $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$c_ju_NoSuchElementException("Failed to get WebGPU adapter");
    } else {
      return value$2;
    }
  }));
  var f$proxy2 = new $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28(((adapter$2) => {
    var promise$proxy2 = adapter$2.requestDevice();
    var f$proxy1 = new $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28(((device$3) => {
      setStatus.u("WebGPU initialized! Rendering triangle with buffers...", false);
      this.a8(device$3, canvas, setStatus);
    }));
    return promise$proxy2.then($j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sjs_js_Any$().X(f$proxy1));
  }));
  var result = promise$proxy3.then($j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sjs_js_Any$().X(f$proxy2));
  var pf$proxy1 = new $c_Lbuffer\uff3ftriangle_BufferTriangle$$anon$1(setStatus);
  result.catch(((err$2) => {
    if (pf$proxy1.a6(err$2)) {
      return pf$proxy1.W(err$2, $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_s_PartialFunction$().O);
    } else {
      var $x_1 = err$2;
      throw (false ? $x_1.al : $x_1);
    }
  }));
});
$p.a8 = (function(device, canvas, setStatus) {
  var triangleShader = new $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$c_Lgpu_ShaderDef("\n  out.position = vec4<f32>(in.position, 0.0, 1.0);\n  out.color = in.color;\n  ", "\n  out.color = in.color * tintColor;\n  ");
  var wgslCode = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$p_Lgpu_ShaderDef__buildWGSL__T__T__T__T__T__T__T(triangleShader, $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$p_Lgpu_derive$__generateCombinedStructFromLists__T__sjs_js_Array__sjs_js_Array__sjs_js_Array__T($j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_Lgpu_derive$(), "VertexInput", $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sjs_js_ArrayOpsCommon$().e(["position"], $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sjs_js_ArrayOpsCommon$().e(["color"], [])), $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sjs_js_ArrayOpsCommon$().e(["vec2<f32>"], $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sjs_js_ArrayOpsCommon$().e(["vec4<f32>"], [])), []), $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$p_Lgpu_derive$__generateCombinedStructFromLists__T__sjs_js_Array__sjs_js_Array__sjs_js_Array__T($j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_Lgpu_derive$(), "VertexOutput", $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sjs_js_ArrayOpsCommon$().e(["color"], []), $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sjs_js_ArrayOpsCommon$().e(["vec4<f32>"], []), $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sjs_js_ArrayOpsCommon$().e([new $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$c_T3("position", "position", "vec4<f32>")], [])), $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$p_Lgpu_derive$__generateCombinedStructFromLists__T__sjs_js_Array__sjs_js_Array__sjs_js_Array__T($j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_Lgpu_derive$(), "FragmentOutput", $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sjs_js_ArrayOpsCommon$().e(["color"], []), $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sjs_js_ArrayOpsCommon$().e(["vec4<f32>"], []), []), $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$p_Lgpu_derive$__generateUniformGroupFromLists__I__sjs_js_Array__sjs_js_Array__T($j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_Lgpu_derive$(), 0, $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sjs_js_ArrayOpsCommon$().e(["tintColor"], []), $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sjs_js_ArrayOpsCommon$().e(["vec4<f32>"], [])), triangleShader.L, triangleShader.K);
  console.log(("Generated WGSL:\n" + wgslCode));
  var shaderModule = device.createShaderModule(({
    "code": wgslCode
  }));
  var buffer = new ArrayBuffer(72);
  var _1 = new DataView(buffer);
  _1.setFloat32(0, 0.0, true);
  _1.setFloat32(4, 0.5, true);
  var value$3;
  var value$3 = 1.0;
  _1.setFloat32(8, value$3, true);
  var value$4;
  var value$4 = 0.0;
  _1.setFloat32(12, value$4, true);
  var value$5;
  var value$5 = 0.0;
  _1.setFloat32(16, value$5, true);
  var value$6;
  var value$6 = 1.0;
  _1.setFloat32(20, value$6, true);
  _1.setFloat32(24, (-0.5), true);
  _1.setFloat32(28, (-0.5), true);
  var value$9;
  var value$9 = 0.0;
  _1.setFloat32(32, value$9, true);
  var value$10;
  var value$10 = 1.0;
  _1.setFloat32(36, value$10, true);
  var value$11;
  var value$11 = 0.0;
  _1.setFloat32(40, value$11, true);
  var value$12;
  var value$12 = 1.0;
  _1.setFloat32(44, value$12, true);
  _1.setFloat32(48, 0.5, true);
  _1.setFloat32(52, (-0.5), true);
  var value$15;
  var value$15 = 0.0;
  _1.setFloat32(56, value$15, true);
  var value$16;
  var value$16 = 0.0;
  _1.setFloat32(60, value$16, true);
  var value$17;
  var value$17 = 1.0;
  _1.setFloat32(64, value$17, true);
  var value$18;
  var value$18 = 1.0;
  _1.setFloat32(68, value$18, true);
  var value = (_1.buffer.byteLength | 0);
  var vertexBuffer = device.createBuffer(({
    "size": value,
    "usage": 40
  }));
  device.queue.writeBuffer(vertexBuffer, 0, _1.buffer);
  var buffer$2 = new ArrayBuffer(16);
  var tintData = new $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$c_T2(new DataView(buffer$2), 1);
  var _1$2 = tintData.j;
  var value$19;
  var value$19 = 1.0;
  _1$2.setFloat32(0, value$19, true);
  var value$20;
  var value$20 = 1.0;
  _1$2.setFloat32(4, value$20, true);
  var value$21;
  var value$21 = 1.0;
  _1$2.setFloat32(8, value$21, true);
  var value$22;
  var value$22 = 1.0;
  _1$2.setFloat32(12, value$22, true);
  var value$1 = (tintData.j.buffer.byteLength | 0);
  var uniformBuffer = device.createBuffer(({
    "size": value$1,
    "usage": 72
  }));
  device.queue.writeBuffer(uniformBuffer, 0, tintData.j.buffer);
  var context = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_Lwebgpu_WebGPU$().ar(canvas);
  context.configure(({
    "device": device,
    "format": "bgra8unorm"
  }));
  var formats = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sjs_js_ArrayOpsCommon$().e(["float32x2"], $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sjs_js_ArrayOpsCommon$().e(["float32x4"], []));
  var sizes = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sjs_js_ArrayOpsCommon$().e([8], $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sjs_js_ArrayOpsCommon$().e([16], []));
  var offsets = $p_Lgpu_layouts$__calculateOffsets__sjs_js_Array__sjs_js_Array($m_Lgpu_layouts$(), sizes);
  var stride$3 = $p_Lgpu_layouts$__calculateStride__sjs_js_Array__I($m_Lgpu_layouts$(), sizes);
  var attributes = [];
  var end = (formats.length | 0);
  var isEmpty = (end <= 0);
  var scala$collection$immutable$Range$$lastElement = (((-1) + end) | 0);
  if ((!isEmpty)) {
    var i = 0;
    while (true) {
      var x0 = i;
      var value$2 = (offsets[x0] | 0);
      var s = formats[x0];
      var $x_1 = attributes.push(({
        "shaderLocation": x0,
        "offset": value$2,
        "format": s
      }));
      if ((i === scala$collection$immutable$Range$$lastElement)) {
        break;
      }
      i = ((1 + i) | 0);
    }
  }
  var _2 = [({
    "arrayStride": stride$3,
    "attributes": attributes
  })];
  var _2$1 = ({
    "module": shaderModule,
    "entryPoint": "vs_main",
    "buffers": _2
  });
  var _2$2 = [({
    "format": "bgra8unorm"
  })];
  var _2$3 = ({
    "module": shaderModule,
    "entryPoint": "fs_main",
    "targets": _2$2
  });
  var _2$4 = ({
    "topology": "triangle-list"
  });
  var pipeline = device.createRenderPipeline(({
    "layout": "auto",
    "vertex": _2$1,
    "fragment": _2$3,
    "primitive": _2$4
  }));
  var _2$5 = pipeline.getBindGroupLayout(0);
  var _2$6 = ({
    "buffer": uniformBuffer
  });
  var _2$7 = [({
    "binding": 0,
    "resource": _2$6
  })];
  var bindGroup = device.createBindGroup(({
    "layout": _2$5,
    "entries": _2$7
  }));
  var startTime = new $c_sr_DoubleRef((+Date.now()));
  window.requestAnimationFrame(((t$3) => {
    $p_Lbuffer\uff3ftriangle_BufferTriangle$__render$1__sr_DoubleRef__T2__Lwebgpu_GPUDevice__Lwebgpu_GPUBuffer__Lwebgpu_GPUCanvasContext__Lwebgpu_GPURenderPipeline__Lwebgpu_GPUBindGroup__Lwebgpu_GPUBuffer__D__V(this, startTime, tintData, device, uniformBuffer, context, pipeline, bindGroup, vertexBuffer, (+t$3));
  }));
  setStatus.u("Buffer triangle with animated tint!", false);
});
var $d_Lbuffer\uff3ftriangle_BufferTriangle$ = new $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$TypeData().i($c_Lbuffer\uff3ftriangle_BufferTriangle$, "buffer_triangle.BufferTriangle$", ({
  V: 1
}));
var $n_Lbuffer\uff3ftriangle_BufferTriangle$;
function $m_Lbuffer\uff3ftriangle_BufferTriangle$() {
  if ((!$n_Lbuffer\uff3ftriangle_BufferTriangle$)) {
    $n_Lbuffer\uff3ftriangle_BufferTriangle$ = new $c_Lbuffer\uff3ftriangle_BufferTriangle$();
  }
  return $n_Lbuffer\uff3ftriangle_BufferTriangle$;
}
function $p_Lgpu_layouts$__calculateOffsets__sjs_js_Array__sjs_js_Array($thiz, sizes) {
  var offsets = [];
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
function $p_Lgpu_layouts$__calculateStride__sjs_js_Array__I($thiz, sizes) {
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
/** @constructor */
function $c_Lgpu_layouts$() {
}
$p = $c_Lgpu_layouts$.prototype = new $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$h_O();
$p.constructor = $c_Lgpu_layouts$;
/** @constructor */
function $h_Lgpu_layouts$() {
}
$h_Lgpu_layouts$.prototype = $p;
var $d_Lgpu_layouts$ = new $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$TypeData().i($c_Lgpu_layouts$, "gpu.layouts$", ({
  Z: 1
}));
var $n_Lgpu_layouts$;
function $m_Lgpu_layouts$() {
  if ((!$n_Lgpu_layouts$)) {
    $n_Lgpu_layouts$ = new $c_Lgpu_layouts$();
  }
  return $n_Lgpu_layouts$;
}
/** @constructor */
function $c_sr_DoubleRef(elem) {
  this.a1 = 0.0;
  this.a1 = elem;
}
$p = $c_sr_DoubleRef.prototype = new $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$h_O();
$p.constructor = $c_sr_DoubleRef;
/** @constructor */
function $h_sr_DoubleRef() {
}
$h_sr_DoubleRef.prototype = $p;
$p.g = (function() {
  return ("" + this.a1);
});
var $d_sr_DoubleRef = new $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$TypeData().i($c_sr_DoubleRef, "scala.runtime.DoubleRef", ({
  aY: 1,
  a: 1
}));
/** @constructor */
function $c_Lbuffer\uff3ftriangle_BufferTriangle$$anon$1(setStatus$5) {
  this.a0 = null;
  this.a0 = setStatus$5;
}
$p = $c_Lbuffer\uff3ftriangle_BufferTriangle$$anon$1.prototype = new $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$h_sr_AbstractPartialFunction();
$p.constructor = $c_Lbuffer\uff3ftriangle_BufferTriangle$$anon$1;
/** @constructor */
function $h_Lbuffer\uff3ftriangle_BufferTriangle$$anon$1() {
}
$h_Lbuffer\uff3ftriangle_BufferTriangle$$anon$1.prototype = $p;
$p.a6 = (function(x) {
  return true;
});
$p.W = (function(x, default$1) {
  if ((x instanceof $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$c_ju_NoSuchElementException)) {
    this.a0.u(x.M, true);
  } else {
    this.a0.u(("WebGPU error: " + x), true);
  }
});
var $d_Lbuffer\uff3ftriangle_BufferTriangle$$anon$1 = new $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$TypeData().i($c_Lbuffer\uff3ftriangle_BufferTriangle$$anon$1, "buffer_triangle.BufferTriangle$$anon$1", ({
  W: 1,
  U: 1,
  g: 1,
  l: 1,
  a: 1
}));
let $e_main = (function() {
  $m_Lbuffer\uff3ftriangle_BufferTriangle$().a7();
});
export { $e_main as main };
