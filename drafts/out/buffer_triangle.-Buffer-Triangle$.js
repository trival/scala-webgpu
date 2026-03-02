'use strict';
import * as $j_buffer$005ftriangle$002e$002dBuffer$002dTriangle$0024$0024anon$00241 from "./buffer_triangle.-Buffer-Triangle$$anon$1.js";
import * as $j_gpu$002ebuffers$002e$002dAttrib$002dLayout$002dHelper$0024 from "./gpu.buffers.-Attrib-Layout-Helper$.js";
import * as $j_gpu$002ebuffers$002e$002dBuffer$002dBinding from "./gpu.buffers.-Buffer-Binding.js";
import * as $j_gpu$002ebuffers$002e$002dUniform$002dLayout$0024given$005f$002dUniform$002dLayout$005f$002dT from "./gpu.buffers.-Uniform-Layout$given_-Uniform-Layout_-T.js";
import * as $j_gpu$002ebuffers$002e$002dUniform$002dValue$0024given$005f$002dUniform$002dValue$005f$002dVec4$005f$002dVec4$002dBuffer$0024 from "./gpu.buffers.-Uniform-Value$given_-Uniform-Value_-Vec4_-Vec4-Buffer$.js";
import * as $j_gpu$002emath$002e$002dVec2 from "./gpu.math.-Vec2.js";
import * as $j_gpu$002emath$002epackage$0024package$0024 from "./gpu.math.package$package$.js";
import * as $j_gpu$002eshader$002e$002dShader$002dDef from "./gpu.shader.-Shader-Def.js";
import * as $j_gpu$002eshader$002ederive$0024 from "./gpu.shader.derive$.js";
import * as $j_gpu$002eshader$002elayouts$0024 from "./gpu.shader.layouts$.js";
import * as $j_java$002elang$002e$002dObject from "./java.lang.-Object.js";
import * as $j_scala$002e$002dPartial$002dFunction$0024 from "./scala.-Partial-Function$.js";
import * as $j_scala$002e$002dTuple2 from "./scala.-Tuple2.js";
import * as $j_scala$002e$002dTuple3 from "./scala.-Tuple3.js";
import * as $j_scala$002ecollection$002e$002dString$002dOps$0024 from "./scala.collection.-String-Ops$.js";
import * as $j_scala$002eruntime$002e$002dAbstract$002dFunction2$002e$0024$0024$002dLambda$0024286cbfc6187197affcadc8465aaec93d6b7d20dc from "./scala.runtime.-Abstract-Function2.$$-Lambda$286cbfc6187197affcadc8465aaec93d6b7d20dc.js";
import * as $j_scala$002eruntime$002e$002dDouble$002dRef from "./scala.runtime.-Double-Ref.js";
import * as $j_scala$002eruntime$002e$002dInt$002dRef from "./scala.runtime.-Int-Ref.js";
import * as $j_scala$002escalajs$002ejs$002e$002dAny$0024 from "./scala.scalajs.js.-Any$.js";
import * as $j_scala$002escalajs$002ejs$002e$002dArray from "./scala.scalajs.js.-Array.js";
import * as $j_scala$002escalajs$002ejs$002e$002dArray$002dOps$002dCommon$0024 from "./scala.scalajs.js.-Array-Ops-Common$.js";
import * as $j_scala$002escalajs$002ejs$002e$002dDynamic from "./scala.scalajs.js.-Dynamic.js";
import * as $j_scala$002escalajs$002ejs$002e$002dObject from "./scala.scalajs.js.-Object.js";
import * as $j_scala$002escalajs$002eruntime$002e$002dCompat$0024 from "./scala.scalajs.runtime.-Compat$.js";
import * as $j_webgpu$002e$002dG$002dP$002dU$002dBind$002dGroup$002dLayout from "./webgpu.-G-P-U-Bind-Group-Layout.js";
import * as $j_webgpu$002e$002dG$002dP$002dU$002dCommand$002dBuffer from "./webgpu.-G-P-U-Command-Buffer.js";
import * as $j_webgpu$002e$002dWeb$002dG$002dP$002dU$0024 from "./webgpu.-Web-G-P-U$.js";
var $p;
function $p_Lbuffer\uff3ftriangle_BufferTriangle$__setStatus$6__Lorg_scalajs_dom_HTMLElement__T__Z__V($thiz, statusEl$1, msg, isError) {
  statusEl$1.textContent = msg;
  statusEl$1.setAttribute("class", (isError ? "error" : "success"));
}
export { $p_Lbuffer\uff3ftriangle_BufferTriangle$__setStatus$6__Lorg_scalajs_dom_HTMLElement__T__Z__V as $p_Lbuffer\uff3ftriangle_BufferTriangle$__setStatus$6__Lorg_scalajs_dom_HTMLElement__T__Z__V };
function $p_Lbuffer\uff3ftriangle_BufferTriangle$__render$1__sr_IntRef__sr_DoubleRef__sr_DoubleRef__Lorg_scalajs_dom_HTMLElement__sr_DoubleRef__Lgpu_buffers_BufferBinding__Lwebgpu_GPUDevice__Lwebgpu_GPUCanvasContext__Lwebgpu_GPURenderPipeline__Lwebgpu_GPUBindGroup__Lwebgpu_GPUBuffer__D__V($thiz, frameCount$1, lastFpsTime$1, lastFpsLog$1, fpsEl$1, startTime$1, tintColor$1, device$2, context$1, pipeline$1, bindGroup$1, vertexBuffer$1, time) {
  frameCount$1.C = ((1 + frameCount$1.C) | 0);
  if ((lastFpsTime$1.v === 0.0)) {
    lastFpsTime$1.v = time;
    lastFpsLog$1.v = time;
  }
  var fpsElapsed = (time - lastFpsTime$1.v);
  if ((fpsElapsed >= 1000.0)) {
    var fps = ((1000.0 * frameCount$1.C) / fpsElapsed);
    var frameTime = (fpsElapsed / frameCount$1.C);
    fpsEl$1.textContent = $j_scala$002ecollection$002e$002dString$002dOps$0024.$m_sc_StringOps$().bF("%.1f FPS (%.2f ms/frame)", $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().E(new $j_java$002elang$002e$002dObject.$ac_O([fps, frameTime])));
    if (((time - lastFpsLog$1.v) >= 1000.0)) {
      console.log($j_scala$002ecollection$002e$002dString$002dOps$0024.$m_sc_StringOps$().bF("%.1f FPS \u2014 %.2f ms/frame", $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().E(new $j_java$002elang$002e$002dObject.$ac_O([fps, frameTime]))));
      lastFpsLog$1.v = time;
    }
    frameCount$1.C = 0;
    lastFpsTime$1.v = time;
  }
  var elapsed = ((time - startTime$1.v) / 2000.0);
  var a = (2.0 * elapsed);
  var r = ((0.5 * (+Math.sin(a))) + 0.5);
  var a$1 = ((2.0 * elapsed) + 2.0);
  var g = ((0.5 * (+Math.sin(a$1))) + 0.5);
  var a$2 = ((2.0 * elapsed) + 4.0);
  var b = ((0.5 * (+Math.sin(a$2))) + 0.5);
  var c = tintColor$1.aK;
  var value$proxy15 = $j_gpu$002emath$002epackage$0024package$0024.$m_Lgpu_math_package$package$().l().k(r);
  var offset$proxy24 = (c.z() | 0);
  var _1 = c.w();
  _1.setFloat32(offset$proxy24, value$proxy15, true);
  var value$proxy16 = $j_gpu$002emath$002epackage$0024package$0024.$m_Lgpu_math_package$package$().l().k(g);
  var offset$proxy25 = ((4 + (c.z() | 0)) | 0);
  var _1$1 = c.w();
  _1$1.setFloat32(offset$proxy25, value$proxy16, true);
  var value$proxy17 = $j_gpu$002emath$002epackage$0024package$0024.$m_Lgpu_math_package$package$().l().k(b);
  var offset$proxy26 = ((8 + (c.z() | 0)) | 0);
  var _1$2 = c.w();
  _1$2.setFloat32(offset$proxy26, value$proxy17, true);
  var $x_2 = tintColor$1.bK.queue;
  var $x_1 = tintColor$1.aL;
  var s$proxy27 = tintColor$1.aK;
  $x_2.writeBuffer($x_1, 0.0, s$proxy27.w().buffer);
  var commandEncoder = device$2.createCommandEncoder();
  var textureView = context$1.getCurrentTexture().createView();
  var $x_3 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$();
  var _2 = ({
    "r": 0.15,
    "g": 0.1,
    "b": 0.1,
    "a": 1.0
  });
  var items$proxy38 = $x_3.E(new ($j_scala$002escalajs$002ejs$002e$002dObject.$d_sjs_js_Object.r().C)([({
    "view": textureView,
    "loadOp": "clear",
    "storeOp": "store",
    "clearValue": _2
  })]));
  var _2$1 = [...$j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy38)];
  var renderPass = commandEncoder.beginRenderPass(({
    "colorAttachments": _2$1
  }));
  renderPass.setPipeline(pipeline$1);
  renderPass.setBindGroup(0, bindGroup$1);
  renderPass.setVertexBuffer(0, vertexBuffer$1);
  renderPass.draw(3);
  renderPass.end();
  var $x_4 = device$2.queue;
  var items$proxy39 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().c(new ($j_webgpu$002e$002dG$002dP$002dU$002dCommand$002dBuffer.$d_Lwebgpu_GPUCommandBuffer.r().C)([commandEncoder.finish()]));
  $x_4.submit([...$j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy39)]);
  window.requestAnimationFrame(((t$3) => {
    $p_Lbuffer\uff3ftriangle_BufferTriangle$__render$1__sr_IntRef__sr_DoubleRef__sr_DoubleRef__Lorg_scalajs_dom_HTMLElement__sr_DoubleRef__Lgpu_buffers_BufferBinding__Lwebgpu_GPUDevice__Lwebgpu_GPUCanvasContext__Lwebgpu_GPURenderPipeline__Lwebgpu_GPUBindGroup__Lwebgpu_GPUBuffer__D__V($thiz, frameCount$1, lastFpsTime$1, lastFpsLog$1, fpsEl$1, startTime$1, tintColor$1, device$2, context$1, pipeline$1, bindGroup$1, vertexBuffer$1, (+t$3));
  }));
}
export { $p_Lbuffer\uff3ftriangle_BufferTriangle$__render$1__sr_IntRef__sr_DoubleRef__sr_DoubleRef__Lorg_scalajs_dom_HTMLElement__sr_DoubleRef__Lgpu_buffers_BufferBinding__Lwebgpu_GPUDevice__Lwebgpu_GPUCanvasContext__Lwebgpu_GPURenderPipeline__Lwebgpu_GPUBindGroup__Lwebgpu_GPUBuffer__D__V as $p_Lbuffer\uff3ftriangle_BufferTriangle$__render$1__sr_IntRef__sr_DoubleRef__sr_DoubleRef__Lorg_scalajs_dom_HTMLElement__sr_DoubleRef__Lgpu_buffers_BufferBinding__Lwebgpu_GPUDevice__Lwebgpu_GPUCanvasContext__Lwebgpu_GPURenderPipeline__Lwebgpu_GPUBindGroup__Lwebgpu_GPUBuffer__D__V };
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
$p.bc = (function() {
  var statusEl = document.getElementById("status");
  var canvas = document.getElementById("canvas");
  var gpu = $j_webgpu$002e$002dWeb$002dG$002dP$002dU$0024.$m_Lwebgpu_WebGPU$().c6();
  if ((gpu === (void 0))) {
    $p_Lbuffer\uff3ftriangle_BufferTriangle$__setStatus$6__Lorg_scalajs_dom_HTMLElement__T__Z__V(this, statusEl, "WebGPU is not supported in this browser", true);
  } else {
    $p_Lbuffer\uff3ftriangle_BufferTriangle$__setStatus$6__Lorg_scalajs_dom_HTMLElement__T__Z__V(this, statusEl, "WebGPU available, initializing...", false);
    this.c7(gpu, canvas, new $j_scala$002eruntime$002e$002dAbstract$002dFunction2$002e$0024$0024$002dLambda$0024286cbfc6187197affcadc8465aaec93d6b7d20dc.$c_sr_AbstractFunction2_$$Lambda$286cbfc6187197affcadc8465aaec93d6b7d20dc(((v1$2, v2$2) => {
      $p_Lbuffer\uff3ftriangle_BufferTriangle$__setStatus$6__Lorg_scalajs_dom_HTMLElement__T__Z__V(this, statusEl, v1$2, (!(!v2$2)));
    })));
  }
});
$p.c7 = (function(gpu, canvas, setStatus) {
  var promise$proxy1 = gpu.requestAdapter();
  var promise$proxy3 = promise$proxy1.then(((value$2) => {
    if ((value$2 === null)) {
      throw new $j_java$002elang$002e$002dObject.$c_ju_NoSuchElementException("Failed to get WebGPU adapter");
    } else {
      return value$2;
    }
  }));
  var f$proxy2 = new $j_java$002elang$002e$002dObject.$c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28(((adapter$2) => {
    var promise$proxy2 = adapter$2.requestDevice();
    var f$proxy1 = new $j_java$002elang$002e$002dObject.$c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28(((device$3) => {
      setStatus.a3("WebGPU initialized! Rendering triangle with buffers...", false);
      this.cc(device$3, canvas, setStatus);
    }));
    return promise$proxy2.then($j_scala$002escalajs$002ejs$002e$002dAny$0024.$m_sjs_js_Any$().aH(f$proxy1));
  }));
  var result = promise$proxy3.then($j_scala$002escalajs$002ejs$002e$002dAny$0024.$m_sjs_js_Any$().aH(f$proxy2));
  var pf$proxy1 = new $j_buffer$005ftriangle$002e$002dBuffer$002dTriangle$0024$0024anon$00241.$c_Lbuffer\uff3ftriangle_BufferTriangle$$anon$1(setStatus);
  result.catch(((err$2) => {
    if (pf$proxy1.c8(err$2)) {
      return pf$proxy1.bD(err$2, $j_scala$002e$002dPartial$002dFunction$0024.$m_s_PartialFunction$().bm);
    } else {
      var $x_1 = err$2;
      throw (($x_1 instanceof $j_java$002elang$002e$002dObject.$c_sjs_js_JavaScriptException) ? $x_1.aF : $x_1);
    }
  }));
});
$p.cc = (function(device, canvas, setStatus) {
  var context = $j_webgpu$002e$002dWeb$002dG$002dP$002dU$0024.$m_Lwebgpu_WebGPU$().c5(canvas);
  context.configure(({
    "device": device,
    "format": "bgra8unorm"
  }));
  var triangleShader = new $j_gpu$002eshader$002e$002dShader$002dDef.$c_Lgpu_shader_ShaderDef($j_scala$002ecollection$002e$002dString$002dOps$0024.$m_sc_StringOps$().aJ("\n        |  out.position = vec4<f32>(in.position, 0.0, 1.0);\n        |  out.color = in.color;\n        ", 124), $j_scala$002ecollection$002e$002dString$002dOps$0024.$m_sc_StringOps$().aJ("\n        |  out.color = in.color * tintColor;\n        ", 124));
  var $x_36 = $j_gpu$002eshader$002ederive$0024.$m_Lgpu_shader_derive$();
  var $x_35 = $j_scala$002escalajs$002ejs$002e$002dArray$002dOps$002dCommon$0024.$m_sjs_js_ArrayOpsCommon$();
  var items$proxy1 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().c(new ($j_java$002elang$002e$002dObject.$d_T.r().C)(["position"]));
  var $x_34 = $j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy1);
  var $x_33 = $j_scala$002escalajs$002ejs$002e$002dArray$002dOps$002dCommon$0024.$m_sjs_js_ArrayOpsCommon$();
  var items$proxy2 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().c(new ($j_java$002elang$002e$002dObject.$d_T.r().C)(["color"]));
  var $x_32 = $j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy2);
  var items$proxy3 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().c(new ($j_java$002elang$002e$002dObject.$d_T.r().C)([]));
  var $x_31 = $x_35.g([...$x_34], $x_33.g([...$x_32], [...$j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy3)]));
  var $x_30 = $j_scala$002escalajs$002ejs$002e$002dArray$002dOps$002dCommon$0024.$m_sjs_js_ArrayOpsCommon$();
  var items$proxy4 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().c(new ($j_java$002elang$002e$002dObject.$d_T.r().C)(["vec2<f32>"]));
  var $x_29 = $j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy4);
  var $x_28 = $j_scala$002escalajs$002ejs$002e$002dArray$002dOps$002dCommon$0024.$m_sjs_js_ArrayOpsCommon$();
  var items$proxy5 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().c(new ($j_java$002elang$002e$002dObject.$d_T.r().C)(["vec4<f32>"]));
  var $x_27 = $j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy5);
  var items$proxy6 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().c(new ($j_java$002elang$002e$002dObject.$d_T.r().C)([]));
  var $x_26 = $x_30.g([...$x_29], $x_28.g([...$x_27], [...$j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy6)]));
  var items$proxy7 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().c(new ($j_scala$002e$002dTuple3.$d_T3.r().C)([]));
  var $x_25 = $j_gpu$002eshader$002ederive$0024.$p_Lgpu_shader_derive$__generateCombinedStructFromLists__T__sjs_js_Array__sjs_js_Array__sjs_js_Array__T($x_36, "VertexInput", $x_31, $x_26, [...$j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy7)]);
  var $x_24 = $j_gpu$002eshader$002ederive$0024.$m_Lgpu_shader_derive$();
  var $x_23 = $j_scala$002escalajs$002ejs$002e$002dArray$002dOps$002dCommon$0024.$m_sjs_js_ArrayOpsCommon$();
  var items$proxy8 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().c(new ($j_java$002elang$002e$002dObject.$d_T.r().C)(["color"]));
  var $x_22 = $j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy8);
  var items$proxy9 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().c(new ($j_java$002elang$002e$002dObject.$d_T.r().C)([]));
  var $x_21 = $x_23.g([...$x_22], [...$j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy9)]);
  var $x_20 = $j_scala$002escalajs$002ejs$002e$002dArray$002dOps$002dCommon$0024.$m_sjs_js_ArrayOpsCommon$();
  var items$proxy10 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().c(new ($j_java$002elang$002e$002dObject.$d_T.r().C)(["vec4<f32>"]));
  var $x_19 = $j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy10);
  var items$proxy11 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().c(new ($j_java$002elang$002e$002dObject.$d_T.r().C)([]));
  var $x_18 = $x_20.g([...$x_19], [...$j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy11)]);
  var $x_17 = $j_scala$002escalajs$002ejs$002e$002dArray$002dOps$002dCommon$0024.$m_sjs_js_ArrayOpsCommon$();
  var items$proxy12 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().c(new ($j_scala$002e$002dTuple3.$d_T3.r().C)([new $j_scala$002e$002dTuple3.$c_T3("position", "position", "vec4<f32>")]));
  var $x_16 = $j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy12);
  var items$proxy13 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().c(new ($j_scala$002e$002dTuple3.$d_T3.r().C)([]));
  var $x_15 = $j_gpu$002eshader$002ederive$0024.$p_Lgpu_shader_derive$__generateCombinedStructFromLists__T__sjs_js_Array__sjs_js_Array__sjs_js_Array__T($x_24, "VertexOutput", $x_21, $x_18, $x_17.g([...$x_16], [...$j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy13)]));
  var $x_14 = $j_gpu$002eshader$002ederive$0024.$m_Lgpu_shader_derive$();
  var $x_13 = $j_scala$002escalajs$002ejs$002e$002dArray$002dOps$002dCommon$0024.$m_sjs_js_ArrayOpsCommon$();
  var items$proxy14 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().c(new ($j_java$002elang$002e$002dObject.$d_T.r().C)(["color"]));
  var $x_12 = $j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy14);
  var items$proxy15 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().c(new ($j_java$002elang$002e$002dObject.$d_T.r().C)([]));
  var $x_11 = $x_13.g([...$x_12], [...$j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy15)]);
  var $x_10 = $j_scala$002escalajs$002ejs$002e$002dArray$002dOps$002dCommon$0024.$m_sjs_js_ArrayOpsCommon$();
  var items$proxy16 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().c(new ($j_java$002elang$002e$002dObject.$d_T.r().C)(["vec4<f32>"]));
  var $x_9 = $j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy16);
  var items$proxy17 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().c(new ($j_java$002elang$002e$002dObject.$d_T.r().C)([]));
  var $x_8 = $x_10.g([...$x_9], [...$j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy17)]);
  var items$proxy18 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().c(new ($j_scala$002e$002dTuple3.$d_T3.r().C)([]));
  var $x_7 = $j_gpu$002eshader$002ederive$0024.$p_Lgpu_shader_derive$__generateCombinedStructFromLists__T__sjs_js_Array__sjs_js_Array__sjs_js_Array__T($x_14, "FragmentOutput", $x_11, $x_8, [...$j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy18)]);
  var $x_6 = $j_gpu$002eshader$002ederive$0024.$m_Lgpu_shader_derive$();
  var $x_5 = $j_scala$002escalajs$002ejs$002e$002dArray$002dOps$002dCommon$0024.$m_sjs_js_ArrayOpsCommon$();
  var items$proxy19 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().c(new ($j_java$002elang$002e$002dObject.$d_T.r().C)(["tintColor"]));
  var $x_4 = $j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy19);
  var items$proxy20 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().c(new ($j_java$002elang$002e$002dObject.$d_T.r().C)([]));
  var $x_3 = $x_5.g([...$x_4], [...$j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy20)]);
  var $x_2 = $j_scala$002escalajs$002ejs$002e$002dArray$002dOps$002dCommon$0024.$m_sjs_js_ArrayOpsCommon$();
  var items$proxy21 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().c(new ($j_java$002elang$002e$002dObject.$d_T.r().C)(["vec4<f32>"]));
  var $x_1 = $j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy21);
  var items$proxy22 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().c(new ($j_java$002elang$002e$002dObject.$d_T.r().C)([]));
  var wgslCode = $j_gpu$002eshader$002e$002dShader$002dDef.$p_Lgpu_shader_ShaderDef__buildWGSL__T__T__T__T__T__T__T(triangleShader, $x_25, $x_15, $x_7, $j_gpu$002eshader$002ederive$0024.$p_Lgpu_shader_derive$__generateUniformGroupFromLists__I__sjs_js_Array__sjs_js_Array__T($x_6, 0, $x_3, $x_2.g([...$x_1], [...$j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy22)])), triangleShader.aP, triangleShader.aO);
  console.log(("Generated WGSL:\n" + wgslCode));
  var shaderModule = device.createShaderModule(({
    "code": wgslCode
  }));
  $j_gpu$002ebuffers$002e$002dAttrib$002dLayout$002dHelper$0024.$m_Lgpu_buffers_AttribLayoutHelper$().dk();
  var buffer = new ArrayBuffer(72);
  var _1 = new DataView(buffer);
  var other$proxy1 = new $j_gpu$002emath$002e$002dVec2.$c_Lgpu_math_Vec2(0.0, 0.5);
  var value$proxy1 = $j_gpu$002emath$002epackage$0024package$0024.$m_Lgpu_math_package$package$().l().k(other$proxy1.ci);
  _1.setFloat32(0, value$proxy1, true);
  var value$proxy2 = $j_gpu$002emath$002epackage$0024package$0024.$m_Lgpu_math_package$package$().l().k(other$proxy1.cj);
  _1.setFloat32(4, value$proxy2, true);
  var value$proxy3 = $j_gpu$002emath$002epackage$0024package$0024.$m_Lgpu_math_package$package$().bG().ba(1.0);
  _1.setFloat32(8, value$proxy3, true);
  var value$proxy4 = $j_gpu$002emath$002epackage$0024package$0024.$m_Lgpu_math_package$package$().bG().ba(0.0);
  _1.setFloat32(12, value$proxy4, true);
  var value$proxy5 = $j_gpu$002emath$002epackage$0024package$0024.$m_Lgpu_math_package$package$().bG().ba(0.0);
  _1.setFloat32(16, value$proxy5, true);
  var value$proxy6 = $j_gpu$002emath$002epackage$0024package$0024.$m_Lgpu_math_package$package$().bG().ba(1.0);
  _1.setFloat32(20, value$proxy6, true);
  var value$proxy7 = $j_gpu$002emath$002epackage$0024package$0024.$m_Lgpu_math_package$package$().l().k((-0.5));
  _1.setFloat32(24, value$proxy7, true);
  var value$proxy8 = $j_gpu$002emath$002epackage$0024package$0024.$m_Lgpu_math_package$package$().l().k((-0.5));
  _1.setFloat32(28, value$proxy8, true);
  var value$proxy9 = $j_gpu$002emath$002epackage$0024package$0024.$m_Lgpu_math_package$package$().l().k(0.0);
  _1.setFloat32(32, value$proxy9, true);
  var value$proxy10 = $j_gpu$002emath$002epackage$0024package$0024.$m_Lgpu_math_package$package$().l().k(1.0);
  _1.setFloat32(36, value$proxy10, true);
  var value$proxy11 = $j_gpu$002emath$002epackage$0024package$0024.$m_Lgpu_math_package$package$().l().k(0.0);
  _1.setFloat32(40, value$proxy11, true);
  var value$proxy12 = $j_gpu$002emath$002epackage$0024package$0024.$m_Lgpu_math_package$package$().l().k(1.0);
  _1.setFloat32(44, value$proxy12, true);
  var value$proxy13 = $j_gpu$002emath$002epackage$0024package$0024.$m_Lgpu_math_package$package$().l().k(0.5);
  _1.setFloat32(48, value$proxy13, true);
  var value$proxy14 = $j_gpu$002emath$002epackage$0024package$0024.$m_Lgpu_math_package$package$().l().k((-0.5));
  _1.setFloat32(52, value$proxy14, true);
  _1.setFloat32(64, 1.0, true);
  _1.setFloat32(68, 1.0, true);
  var value = (_1.buffer.byteLength | 0);
  var vertexBuffer = device.createBuffer(({
    "size": value,
    "usage": 40
  }));
  device.queue.writeBuffer(vertexBuffer, 0.0, _1.buffer);
  var ul$proxy1 = new $j_gpu$002ebuffers$002e$002dUniform$002dLayout$0024given$005f$002dUniform$002dLayout$005f$002dT.$c_Lgpu_buffers_UniformLayout$given\uff3fUniformLayout\uff3fT($j_gpu$002ebuffers$002e$002dUniform$002dValue$0024given$005f$002dUniform$002dValue$005f$002dVec4$005f$002dVec4$002dBuffer$0024.$m_Lgpu_buffers_UniformValue$given\uff3fUniformValue\uff3fVec4\uff3fVec4Buffer$());
  var uv$proxy1 = ul$proxy1.bL;
  var buffer$2 = new ArrayBuffer(16);
  var tintColor = new $j_gpu$002ebuffers$002e$002dBuffer$002dBinding.$c_Lgpu_buffers_BufferBinding(new $j_scala$002e$002dTuple2.$c_T2(new DataView(buffer$2), 0), device, uv$proxy1);
  var $x_41 = $j_scala$002escalajs$002ejs$002e$002dArray$002dOps$002dCommon$0024.$m_sjs_js_ArrayOpsCommon$();
  var $x_39 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$();
  var _2 = ({
    "type": "uniform"
  });
  var entry = ({
    "binding": 0,
    "visibility": 3,
    "buffer": _2
  });
  var $x_38 = $j_scala$002escalajs$002ejs$002e$002dArray$002dOps$002dCommon$0024.$m_sjs_js_ArrayOpsCommon$();
  var items$proxy23 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().E(new ($j_scala$002escalajs$002ejs$002e$002dObject.$d_sjs_js_Object.r().C)([entry]));
  var $x_37 = $j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy23);
  var items$proxy24 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().c(new ($j_scala$002escalajs$002ejs$002e$002dDynamic.$d_sjs_js_Dynamic.r().C)([]));
  var items$proxy25 = $x_39.c(new ($j_scala$002escalajs$002ejs$002e$002dArray.$d_sjs_js_Array.r().C)([$x_38.g([...$x_37], [...$j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy24)])]));
  var $x_40 = $j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy25);
  var items$proxy26 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().c(new ($j_scala$002escalajs$002ejs$002e$002dArray.$d_sjs_js_Array.r().C)([]));
  var descriptors = $x_41.g([...$x_40], [...$j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy26)]);
  var items$proxy27 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().c(new ($j_webgpu$002e$002dG$002dP$002dU$002dBind$002dGroup$002dLayout.$d_Lwebgpu_GPUBindGroupLayout.r().C)([]));
  var result = [...$j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy27)];
  var len = (descriptors.length | 0);
  var i = 0;
  while ((i < len)) {
    var x0 = descriptors[i];
    (result.push(device.createBindGroupLayout(({
      "entries": x0
    }))) | 0);
    i = ((1 + i) | 0);
  }
  var \u03b42$___1 = result;
  var \u03b42$___2 = $j_gpu$002eshader$002elayouts$0024.$m_Lgpu_shader_layouts$().dh(device, result);
  var bindGroupLayouts = \u03b42$___1;
  var pipelineLayout$2 = \u03b42$___2;
  var $x_51 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$();
  var $x_45 = $j_scala$002escalajs$002ejs$002e$002dArray$002dOps$002dCommon$0024.$m_sjs_js_ArrayOpsCommon$();
  var items$proxy28 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().c(new ($j_java$002elang$002e$002dObject.$d_T.r().C)(["float32x2"]));
  var $x_44 = $j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy28);
  var $x_43 = $j_scala$002escalajs$002ejs$002e$002dArray$002dOps$002dCommon$0024.$m_sjs_js_ArrayOpsCommon$();
  var items$proxy29 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().c(new ($j_java$002elang$002e$002dObject.$d_T.r().C)(["float32x4"]));
  var $x_42 = $j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy29);
  var items$proxy30 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().c(new ($j_java$002elang$002e$002dObject.$d_T.r().C)([]));
  var formats = $x_45.g([...$x_44], $x_43.g([...$x_42], [...$j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy30)]));
  var $x_49 = $j_scala$002escalajs$002ejs$002e$002dArray$002dOps$002dCommon$0024.$m_sjs_js_ArrayOpsCommon$();
  var items$proxy31 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().ak(new $j_java$002elang$002e$002dObject.$ac_I(new Int32Array([8])));
  var $x_48 = $j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy31);
  var $x_47 = $j_scala$002escalajs$002ejs$002e$002dArray$002dOps$002dCommon$0024.$m_sjs_js_ArrayOpsCommon$();
  var items$proxy32 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().ak(new $j_java$002elang$002e$002dObject.$ac_I(new Int32Array([16])));
  var $x_46 = $j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy32);
  var items$proxy33 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().ak(new $j_java$002elang$002e$002dObject.$ac_I(new Int32Array([])));
  var sizes = $x_49.g([...$x_48], $x_47.g([...$x_46], [...$j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy33)]));
  var offsets = $j_gpu$002eshader$002elayouts$0024.$p_Lgpu_shader_layouts$__calculateOffsets__sjs_js_Array__sjs_js_Array($j_gpu$002eshader$002elayouts$0024.$m_Lgpu_shader_layouts$(), sizes);
  var stride$3 = $j_gpu$002eshader$002elayouts$0024.$p_Lgpu_shader_layouts$__calculateStride__sjs_js_Array__I($j_gpu$002eshader$002elayouts$0024.$m_Lgpu_shader_layouts$(), sizes);
  var items$proxy34 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().c(new ($j_scala$002escalajs$002ejs$002e$002dDynamic.$d_sjs_js_Dynamic.r().C)([]));
  var attributes = [...$j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy34)];
  var end = (formats.length | 0);
  var isEmpty = (end <= 0);
  var scala$collection$immutable$Range$$lastElement = ((end - 1) | 0);
  if ((!isEmpty)) {
    var i$1 = 0;
    while (true) {
      var x0$1 = i$1;
      var value$1 = (offsets[x0$1] | 0);
      var s = formats[x0$1];
      var $x_50 = attributes.push(({
        "shaderLocation": x0$1,
        "offset": value$1,
        "format": s
      }));
      if ((i$1 === scala$collection$immutable$Range$$lastElement)) {
        break;
      }
      i$1 = ((1 + i$1) | 0);
    }
  }
  var items$proxy35 = $x_51.c(new ($j_scala$002escalajs$002ejs$002e$002dDynamic.$d_sjs_js_Dynamic.r().C)([({
    "arrayStride": stride$3,
    "attributes": attributes
  })]));
  var _2$1 = [...$j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy35)];
  var _2$2 = ({
    "module": shaderModule,
    "entryPoint": "vs_main",
    "buffers": _2$1
  });
  var items$proxy36 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().E(new ($j_scala$002escalajs$002ejs$002e$002dObject.$d_sjs_js_Object.r().C)([({
    "format": "bgra8unorm"
  })]));
  var _2$3 = [...$j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy36)];
  var _2$4 = ({
    "module": shaderModule,
    "entryPoint": "fs_main",
    "targets": _2$3
  });
  var _2$5 = ({
    "topology": "triangle-list"
  });
  var pipeline = device.createRenderPipeline(({
    "layout": pipelineLayout$2,
    "vertex": _2$2,
    "fragment": _2$4,
    "primitive": _2$5
  }));
  var _2$6 = bindGroupLayouts[0];
  var $x_52 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$();
  var _2$7 = tintColor.aL;
  var _2$8 = ({
    "buffer": _2$7
  });
  var items$proxy37 = $x_52.E(new ($j_scala$002escalajs$002ejs$002e$002dObject.$d_sjs_js_Object.r().C)([({
    "binding": 0,
    "resource": _2$8
  })]));
  var _2$9 = [...$j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy37)];
  var bindGroup = device.createBindGroup(({
    "layout": _2$6,
    "entries": _2$9
  }));
  var startTime = new $j_scala$002eruntime$002e$002dDouble$002dRef.$c_sr_DoubleRef((+Date.now()));
  var fpsEl = document.getElementById("fps");
  var frameCount = new $j_scala$002eruntime$002e$002dInt$002dRef.$c_sr_IntRef(0);
  var lastFpsTime = new $j_scala$002eruntime$002e$002dDouble$002dRef.$c_sr_DoubleRef(0.0);
  var lastFpsLog = new $j_scala$002eruntime$002e$002dDouble$002dRef.$c_sr_DoubleRef(0.0);
  window.requestAnimationFrame(((t$3) => {
    $p_Lbuffer\uff3ftriangle_BufferTriangle$__render$1__sr_IntRef__sr_DoubleRef__sr_DoubleRef__Lorg_scalajs_dom_HTMLElement__sr_DoubleRef__Lgpu_buffers_BufferBinding__Lwebgpu_GPUDevice__Lwebgpu_GPUCanvasContext__Lwebgpu_GPURenderPipeline__Lwebgpu_GPUBindGroup__Lwebgpu_GPUBuffer__D__V(this, frameCount, lastFpsTime, lastFpsLog, fpsEl, startTime, tintColor, device, context, pipeline, bindGroup, vertexBuffer, (+t$3));
  }));
  setStatus.a3("Buffer triangle with animated tint!", false);
});
var $d_Lbuffer\uff3ftriangle_BufferTriangle$ = new $j_java$002elang$002e$002dObject.$TypeData().i($c_Lbuffer\uff3ftriangle_BufferTriangle$, "buffer_triangle.BufferTriangle$", ({
  aM: 1
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
