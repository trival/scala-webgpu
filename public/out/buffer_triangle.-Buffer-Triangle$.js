'use strict';
import * as $j_buffer$005ftriangle$002e$002dBuffer$002dTriangle$0024$0024anon$00241 from "./buffer_triangle.-Buffer-Triangle$$anon$1.js";
import * as $j_gpu$002e$002dShader$002dDef from "./gpu.-Shader-Def.js";
import * as $j_gpu$002ederive$0024 from "./gpu.derive$.js";
import * as $j_gpu$002elayouts$0024 from "./gpu.layouts$.js";
import * as $j_java$002elang$002e$002dObject from "./java.lang.-Object.js";
import * as $j_java$002eutil$002e$002dNo$002dSuch$002dElement$002dException from "./java.util.-No-Such-Element-Exception.js";
import * as $j_scala$002e$002dMatch$002dError from "./scala.-Match-Error.js";
import * as $j_scala$002e$002dNone$0024 from "./scala.-None$.js";
import * as $j_scala$002e$002dPartial$002dFunction$0024 from "./scala.-Partial-Function$.js";
import * as $j_scala$002e$002dSome from "./scala.-Some.js";
import * as $j_scala$002e$002dTuple2 from "./scala.-Tuple2.js";
import * as $j_scala$002e$002dTuple3 from "./scala.-Tuple3.js";
import * as $j_scala$002eruntime$002e$002dAbstract$002dFunction1$002e$0024$0024$002dLambda$002470e1780b84463d18653aacefee3ab989ac625f28 from "./scala.runtime.-Abstract-Function1.$$-Lambda$70e1780b84463d18653aacefee3ab989ac625f28.js";
import * as $j_scala$002eruntime$002e$002dAbstract$002dFunction2$002e$0024$0024$002dLambda$0024286cbfc6187197affcadc8465aaec93d6b7d20dc from "./scala.runtime.-Abstract-Function2.$$-Lambda$286cbfc6187197affcadc8465aaec93d6b7d20dc.js";
import * as $j_scala$002eruntime$002e$002dDouble$002dRef from "./scala.runtime.-Double-Ref.js";
import * as $j_scala$002escalajs$002ejs$002e$002dAny$0024 from "./scala.scalajs.js.-Any$.js";
import * as $j_scala$002escalajs$002ejs$002e$002dArray$002dOps$002dCommon$0024 from "./scala.scalajs.js.-Array-Ops-Common$.js";
import * as $j_webgpu$002e$002dWeb$002dG$002dP$002dU$0024 from "./webgpu.-Web-G-P-U$.js";
var $p;
function $p_Lbuffer\uff3ftriangle_BufferTriangle$__setStatus$6__Lorg_scalajs_dom_HTMLElement__T__Z__V($thiz, statusEl$1, msg, isError) {
  statusEl$1.textContent = msg;
  statusEl$1.setAttribute("class", (isError ? "error" : "success"));
}
export { $p_Lbuffer\uff3ftriangle_BufferTriangle$__setStatus$6__Lorg_scalajs_dom_HTMLElement__T__Z__V as $p_Lbuffer\uff3ftriangle_BufferTriangle$__setStatus$6__Lorg_scalajs_dom_HTMLElement__T__Z__V };
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
export { $p_Lbuffer\uff3ftriangle_BufferTriangle$__render$1__sr_DoubleRef__T2__Lwebgpu_GPUDevice__Lwebgpu_GPUBuffer__Lwebgpu_GPUCanvasContext__Lwebgpu_GPURenderPipeline__Lwebgpu_GPUBindGroup__Lwebgpu_GPUBuffer__D__V as $p_Lbuffer\uff3ftriangle_BufferTriangle$__render$1__sr_DoubleRef__T2__Lwebgpu_GPUDevice__Lwebgpu_GPUBuffer__Lwebgpu_GPUCanvasContext__Lwebgpu_GPURenderPipeline__Lwebgpu_GPUBindGroup__Lwebgpu_GPUBuffer__D__V };
/** @constructor */
function $c_Lbuffer\uff3ftriangle_BufferTriangle$() {
}
export { $c_Lbuffer\uff3ftriangle_BufferTriangle$ as $c_Lbuffer\uff3ftriangle_BufferTriangle$ };
$p = $c_Lbuffer\uff3ftriangle_BufferTriangle$.prototype = new $j_java$002elang$002e$002dObject.$h_O();
$p.constructor = $c_Lbuffer\uff3ftriangle_BufferTriangle$;
/** @constructor */
function $h_Lbuffer\uff3ftriangle_BufferTriangle$() {
}
export { $h_Lbuffer\uff3ftriangle_BufferTriangle$ as $h_Lbuffer\uff3ftriangle_BufferTriangle$ };
$h_Lbuffer\uff3ftriangle_BufferTriangle$.prototype = $p;
$p.a7 = (function() {
  var statusEl = document.getElementById("status");
  var canvas = document.getElementById("canvas");
  matchResult1: {
    var x = $j_webgpu$002e$002dWeb$002dG$002dP$002dU$0024.$m_Lwebgpu_WebGPU$().as();
    var x1 = ((x === (void 0)) ? $j_scala$002e$002dNone$0024.$m_s_None$() : new $j_scala$002e$002dSome.$c_s_Some(x));
    if (($j_scala$002e$002dNone$0024.$m_s_None$() === x1)) {
      $p_Lbuffer\uff3ftriangle_BufferTriangle$__setStatus$6__Lorg_scalajs_dom_HTMLElement__T__Z__V(this, statusEl, "WebGPU is not supported in this browser", true);
      break matchResult1;
    }
    if ((x1 instanceof $j_scala$002e$002dSome.$c_s_Some)) {
      var gpu = x1.E;
      $p_Lbuffer\uff3ftriangle_BufferTriangle$__setStatus$6__Lorg_scalajs_dom_HTMLElement__T__Z__V(this, statusEl, "WebGPU available, initializing...", false);
      this.a5(gpu, canvas, new $j_scala$002eruntime$002e$002dAbstract$002dFunction2$002e$0024$0024$002dLambda$0024286cbfc6187197affcadc8465aaec93d6b7d20dc.$c_sr_AbstractFunction2_$$Lambda$286cbfc6187197affcadc8465aaec93d6b7d20dc(((v1$2, v2$2) => {
        $p_Lbuffer\uff3ftriangle_BufferTriangle$__setStatus$6__Lorg_scalajs_dom_HTMLElement__T__Z__V(this, statusEl, v1$2, (!(!v2$2)));
      })));
      break matchResult1;
    }
    throw new $j_scala$002e$002dMatch$002dError.$c_s_MatchError(x1);
  }
});
$p.a5 = (function(gpu, canvas, setStatus) {
  var promise$proxy1 = gpu.requestAdapter();
  var promise$proxy3 = promise$proxy1.then(((value$2) => {
    if ((value$2 === null)) {
      throw new $j_java$002eutil$002e$002dNo$002dSuch$002dElement$002dException.$c_ju_NoSuchElementException("Failed to get WebGPU adapter");
    } else {
      return value$2;
    }
  }));
  var f$proxy2 = new $j_scala$002eruntime$002e$002dAbstract$002dFunction1$002e$0024$0024$002dLambda$002470e1780b84463d18653aacefee3ab989ac625f28.$c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28(((adapter$2) => {
    var promise$proxy2 = adapter$2.requestDevice();
    var f$proxy1 = new $j_scala$002eruntime$002e$002dAbstract$002dFunction1$002e$0024$0024$002dLambda$002470e1780b84463d18653aacefee3ab989ac625f28.$c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28(((device$3) => {
      setStatus.u("WebGPU initialized! Rendering triangle with buffers...", false);
      this.a8(device$3, canvas, setStatus);
    }));
    return promise$proxy2.then($j_scala$002escalajs$002ejs$002e$002dAny$0024.$m_sjs_js_Any$().X(f$proxy1));
  }));
  var result = promise$proxy3.then($j_scala$002escalajs$002ejs$002e$002dAny$0024.$m_sjs_js_Any$().X(f$proxy2));
  var pf$proxy1 = new $j_buffer$005ftriangle$002e$002dBuffer$002dTriangle$0024$0024anon$00241.$c_Lbuffer\uff3ftriangle_BufferTriangle$$anon$1(setStatus);
  result.catch(((err$2) => {
    if (pf$proxy1.a6(err$2)) {
      return pf$proxy1.W(err$2, $j_scala$002e$002dPartial$002dFunction$0024.$m_s_PartialFunction$().O);
    } else {
      var $x_1 = err$2;
      throw (false ? $x_1.al : $x_1);
    }
  }));
});
$p.a8 = (function(device, canvas, setStatus) {
  var triangleShader = new $j_gpu$002e$002dShader$002dDef.$c_Lgpu_ShaderDef("\n  out.position = vec4<f32>(in.position, 0.0, 1.0);\n  out.color = in.color;\n  ", "\n  out.color = in.color * tintColor;\n  ");
  var wgslCode = $j_gpu$002e$002dShader$002dDef.$p_Lgpu_ShaderDef__buildWGSL__T__T__T__T__T__T__T(triangleShader, $j_gpu$002ederive$0024.$p_Lgpu_derive$__generateCombinedStructFromLists__T__sjs_js_Array__sjs_js_Array__sjs_js_Array__T($j_gpu$002ederive$0024.$m_Lgpu_derive$(), "VertexInput", $j_scala$002escalajs$002ejs$002e$002dArray$002dOps$002dCommon$0024.$m_sjs_js_ArrayOpsCommon$().e(["position"], $j_scala$002escalajs$002ejs$002e$002dArray$002dOps$002dCommon$0024.$m_sjs_js_ArrayOpsCommon$().e(["color"], [])), $j_scala$002escalajs$002ejs$002e$002dArray$002dOps$002dCommon$0024.$m_sjs_js_ArrayOpsCommon$().e(["vec2<f32>"], $j_scala$002escalajs$002ejs$002e$002dArray$002dOps$002dCommon$0024.$m_sjs_js_ArrayOpsCommon$().e(["vec4<f32>"], [])), []), $j_gpu$002ederive$0024.$p_Lgpu_derive$__generateCombinedStructFromLists__T__sjs_js_Array__sjs_js_Array__sjs_js_Array__T($j_gpu$002ederive$0024.$m_Lgpu_derive$(), "VertexOutput", $j_scala$002escalajs$002ejs$002e$002dArray$002dOps$002dCommon$0024.$m_sjs_js_ArrayOpsCommon$().e(["color"], []), $j_scala$002escalajs$002ejs$002e$002dArray$002dOps$002dCommon$0024.$m_sjs_js_ArrayOpsCommon$().e(["vec4<f32>"], []), $j_scala$002escalajs$002ejs$002e$002dArray$002dOps$002dCommon$0024.$m_sjs_js_ArrayOpsCommon$().e([new $j_scala$002e$002dTuple3.$c_T3("position", "position", "vec4<f32>")], [])), $j_gpu$002ederive$0024.$p_Lgpu_derive$__generateCombinedStructFromLists__T__sjs_js_Array__sjs_js_Array__sjs_js_Array__T($j_gpu$002ederive$0024.$m_Lgpu_derive$(), "FragmentOutput", $j_scala$002escalajs$002ejs$002e$002dArray$002dOps$002dCommon$0024.$m_sjs_js_ArrayOpsCommon$().e(["color"], []), $j_scala$002escalajs$002ejs$002e$002dArray$002dOps$002dCommon$0024.$m_sjs_js_ArrayOpsCommon$().e(["vec4<f32>"], []), []), $j_gpu$002ederive$0024.$p_Lgpu_derive$__generateUniformGroupFromLists__I__sjs_js_Array__sjs_js_Array__T($j_gpu$002ederive$0024.$m_Lgpu_derive$(), 0, $j_scala$002escalajs$002ejs$002e$002dArray$002dOps$002dCommon$0024.$m_sjs_js_ArrayOpsCommon$().e(["tintColor"], []), $j_scala$002escalajs$002ejs$002e$002dArray$002dOps$002dCommon$0024.$m_sjs_js_ArrayOpsCommon$().e(["vec4<f32>"], [])), triangleShader.L, triangleShader.K);
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
  var tintData = new $j_scala$002e$002dTuple2.$c_T2(new DataView(buffer$2), 1);
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
  var context = $j_webgpu$002e$002dWeb$002dG$002dP$002dU$0024.$m_Lwebgpu_WebGPU$().ar(canvas);
  context.configure(({
    "device": device,
    "format": "bgra8unorm"
  }));
  var formats = $j_scala$002escalajs$002ejs$002e$002dArray$002dOps$002dCommon$0024.$m_sjs_js_ArrayOpsCommon$().e(["float32x2"], $j_scala$002escalajs$002ejs$002e$002dArray$002dOps$002dCommon$0024.$m_sjs_js_ArrayOpsCommon$().e(["float32x4"], []));
  var sizes = $j_scala$002escalajs$002ejs$002e$002dArray$002dOps$002dCommon$0024.$m_sjs_js_ArrayOpsCommon$().e([8], $j_scala$002escalajs$002ejs$002e$002dArray$002dOps$002dCommon$0024.$m_sjs_js_ArrayOpsCommon$().e([16], []));
  var offsets = $j_gpu$002elayouts$0024.$p_Lgpu_layouts$__calculateOffsets__sjs_js_Array__sjs_js_Array($j_gpu$002elayouts$0024.$m_Lgpu_layouts$(), sizes);
  var stride$3 = $j_gpu$002elayouts$0024.$p_Lgpu_layouts$__calculateStride__sjs_js_Array__I($j_gpu$002elayouts$0024.$m_Lgpu_layouts$(), sizes);
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
  var startTime = new $j_scala$002eruntime$002e$002dDouble$002dRef.$c_sr_DoubleRef((+Date.now()));
  window.requestAnimationFrame(((t$3) => {
    $p_Lbuffer\uff3ftriangle_BufferTriangle$__render$1__sr_DoubleRef__T2__Lwebgpu_GPUDevice__Lwebgpu_GPUBuffer__Lwebgpu_GPUCanvasContext__Lwebgpu_GPURenderPipeline__Lwebgpu_GPUBindGroup__Lwebgpu_GPUBuffer__D__V(this, startTime, tintData, device, uniformBuffer, context, pipeline, bindGroup, vertexBuffer, (+t$3));
  }));
  setStatus.u("Buffer triangle with animated tint!", false);
});
var $d_Lbuffer\uff3ftriangle_BufferTriangle$ = new $j_java$002elang$002e$002dObject.$TypeData().i($c_Lbuffer\uff3ftriangle_BufferTriangle$, "buffer_triangle.BufferTriangle$", ({
  V: 1
}));
export { $d_Lbuffer\uff3ftriangle_BufferTriangle$ as $d_Lbuffer\uff3ftriangle_BufferTriangle$ };
var $n_Lbuffer\uff3ftriangle_BufferTriangle$;
function $m_Lbuffer\uff3ftriangle_BufferTriangle$() {
  if ((!$n_Lbuffer\uff3ftriangle_BufferTriangle$)) {
    $n_Lbuffer\uff3ftriangle_BufferTriangle$ = new $c_Lbuffer\uff3ftriangle_BufferTriangle$();
  }
  return $n_Lbuffer\uff3ftriangle_BufferTriangle$;
}
export { $m_Lbuffer\uff3ftriangle_BufferTriangle$ as $m_Lbuffer\uff3ftriangle_BufferTriangle$ };
