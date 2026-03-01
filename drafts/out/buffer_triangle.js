'use strict';
import * as $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee from "./internal-cad23071acfd2512298b5f90a8a6559377448aee.js";
var $p;
function $p_Lbuffer\uff3ftriangle_BufferTriangle$__setStatus$6__Lorg_scalajs_dom_HTMLElement__T__Z__V($thiz, statusEl$1, msg, isError) {
  statusEl$1.textContent = msg;
  statusEl$1.setAttribute("class", (isError ? "error" : "success"));
}
function $p_Lbuffer\uff3ftriangle_BufferTriangle$__render$1__sr_DoubleRef__Lgpu_buffers_BufferBinding__Lwebgpu_GPUDevice__Lwebgpu_GPUCanvasContext__Lwebgpu_GPURenderPipeline__Lwebgpu_GPUBindGroup__Lwebgpu_GPUBuffer__D__V($thiz, startTime$1, tintColor$1, device$2, context$1, pipeline$1, bindGroup$1, vertexBuffer$1, time) {
  var elapsed = ((time - startTime$1.av) / 2000.0);
  var a = (2.0 * elapsed);
  var r = ((0.5 * (+Math.sin(a))) + 0.5);
  var a$1 = ((2.0 * elapsed) + 2.0);
  var g = ((0.5 * (+Math.sin(a$1))) + 0.5);
  var a$2 = ((2.0 * elapsed) + 4.0);
  var b = ((0.5 * (+Math.sin(a$2))) + 0.5);
  var c = tintColor$1.ar;
  var value$proxy15 = $m_Lgpu_math_package$package$().u().s(r);
  var offset$proxy24 = (c.C() | 0);
  var _1 = c.w();
  _1.setFloat32(offset$proxy24, value$proxy15, true);
  var value$proxy16 = $m_Lgpu_math_package$package$().u().s(g);
  var offset$proxy25 = ((4 + (c.C() | 0)) | 0);
  var _1$1 = c.w();
  _1$1.setFloat32(offset$proxy25, value$proxy16, true);
  var value$proxy17 = $m_Lgpu_math_package$package$().u().s(b);
  var offset$proxy26 = ((8 + (c.C() | 0)) | 0);
  var _1$2 = c.w();
  _1$2.setFloat32(offset$proxy26, value$proxy17, true);
  var $x_2 = tintColor$1.aH.queue;
  var $x_1 = tintColor$1.as;
  var s$proxy27 = tintColor$1.ar;
  $x_2.writeBuffer($x_1, 0.0, s$proxy27.w().buffer);
  var commandEncoder = device$2.createCommandEncoder();
  var textureView = context$1.getCurrentTexture().createView();
  var $x_3 = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sr_ScalaRunTime$();
  var _2 = ({
    "r": 0.15,
    "g": 0.1,
    "b": 0.1,
    "a": 1.0
  });
  var items$proxy38 = $x_3.P(new ($j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$d_sjs_js_Object.r().C)([({
    "view": textureView,
    "loadOp": "clear",
    "storeOp": "store",
    "clearValue": _2
  })]));
  var _2$1 = [...$j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sjsr_Compat$().d(items$proxy38)];
  var renderPass = commandEncoder.beginRenderPass(({
    "colorAttachments": _2$1
  }));
  renderPass.setPipeline(pipeline$1);
  renderPass.setBindGroup(0, bindGroup$1);
  renderPass.setVertexBuffer(0, vertexBuffer$1);
  renderPass.draw(3);
  renderPass.end();
  var $x_4 = device$2.queue;
  var items$proxy39 = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sr_ScalaRunTime$().e(new ($j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$d_Lwebgpu_GPUCommandBuffer.r().C)([commandEncoder.finish()]));
  $x_4.submit([...$j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sjsr_Compat$().d(items$proxy39)]);
  window.requestAnimationFrame(((t$3) => {
    $p_Lbuffer\uff3ftriangle_BufferTriangle$__render$1__sr_DoubleRef__Lgpu_buffers_BufferBinding__Lwebgpu_GPUDevice__Lwebgpu_GPUCanvasContext__Lwebgpu_GPURenderPipeline__Lwebgpu_GPUBindGroup__Lwebgpu_GPUBuffer__D__V($thiz, startTime$1, tintColor$1, device$2, context$1, pipeline$1, bindGroup$1, vertexBuffer$1, (+t$3));
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
$p.aC = (function() {
  var statusEl = document.getElementById("status");
  var canvas = document.getElementById("canvas");
  var gpu = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_Lwebgpu_WebGPU$().bk();
  if ((gpu === (void 0))) {
    $p_Lbuffer\uff3ftriangle_BufferTriangle$__setStatus$6__Lorg_scalajs_dom_HTMLElement__T__Z__V(this, statusEl, "WebGPU is not supported in this browser", true);
  } else {
    $p_Lbuffer\uff3ftriangle_BufferTriangle$__setStatus$6__Lorg_scalajs_dom_HTMLElement__T__Z__V(this, statusEl, "WebGPU available, initializing...", false);
    this.aA(gpu, canvas, new $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$c_sr_AbstractFunction2_$$Lambda$286cbfc6187197affcadc8465aaec93d6b7d20dc(((v1$2, v2$2) => {
      $p_Lbuffer\uff3ftriangle_BufferTriangle$__setStatus$6__Lorg_scalajs_dom_HTMLElement__T__Z__V(this, statusEl, v1$2, (!(!v2$2)));
    })));
  }
});
$p.aA = (function(gpu, canvas, setStatus) {
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
      setStatus.E("WebGPU initialized! Rendering triangle with buffers...", false);
      this.aD(device$3, canvas, setStatus);
    }));
    return promise$proxy2.then($j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sjs_js_Any$().am(f$proxy1));
  }));
  var result = promise$proxy3.then($j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sjs_js_Any$().am(f$proxy2));
  var pf$proxy1 = new $c_Lbuffer\uff3ftriangle_BufferTriangle$$anon$1(setStatus);
  result.catch(((err$2) => {
    if (pf$proxy1.aB(err$2)) {
      return pf$proxy1.al(err$2, $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_s_PartialFunction$().ab);
    } else {
      var $x_1 = err$2;
      throw (false ? $x_1.b5 : $x_1);
    }
  }));
});
$p.aD = (function(device, canvas, setStatus) {
  var context = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_Lwebgpu_WebGPU$().bj(canvas);
  context.configure(({
    "device": device,
    "format": "bgra8unorm"
  }));
  var triangleShader = new $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$c_Lgpu_shader_ShaderDef("\n  out.position = vec4<f32>(in.position, 0.0, 1.0);\n  out.color = in.color;\n  ", "\n  out.color = in.color * tintColor;\n  ");
  var $x_36 = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_Lgpu_shader_derive$();
  var $x_35 = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sjs_js_ArrayOpsCommon$();
  var items$proxy1 = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sr_ScalaRunTime$().e(new ($j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$d_T.r().C)(["position"]));
  var $x_34 = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sjsr_Compat$().d(items$proxy1);
  var $x_33 = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sjs_js_ArrayOpsCommon$();
  var items$proxy2 = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sr_ScalaRunTime$().e(new ($j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$d_T.r().C)(["color"]));
  var $x_32 = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sjsr_Compat$().d(items$proxy2);
  var items$proxy3 = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sr_ScalaRunTime$().e(new ($j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$d_T.r().C)([]));
  var $x_31 = $x_35.i([...$x_34], $x_33.i([...$x_32], [...$j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sjsr_Compat$().d(items$proxy3)]));
  var $x_30 = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sjs_js_ArrayOpsCommon$();
  var items$proxy4 = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sr_ScalaRunTime$().e(new ($j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$d_T.r().C)(["vec2<f32>"]));
  var $x_29 = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sjsr_Compat$().d(items$proxy4);
  var $x_28 = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sjs_js_ArrayOpsCommon$();
  var items$proxy5 = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sr_ScalaRunTime$().e(new ($j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$d_T.r().C)(["vec4<f32>"]));
  var $x_27 = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sjsr_Compat$().d(items$proxy5);
  var items$proxy6 = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sr_ScalaRunTime$().e(new ($j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$d_T.r().C)([]));
  var $x_26 = $x_30.i([...$x_29], $x_28.i([...$x_27], [...$j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sjsr_Compat$().d(items$proxy6)]));
  var items$proxy7 = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sr_ScalaRunTime$().e(new ($j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$d_T3.r().C)([]));
  var $x_25 = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$p_Lgpu_shader_derive$__generateCombinedStructFromLists__T__sjs_js_Array__sjs_js_Array__sjs_js_Array__T($x_36, "VertexInput", $x_31, $x_26, [...$j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sjsr_Compat$().d(items$proxy7)]);
  var $x_24 = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_Lgpu_shader_derive$();
  var $x_23 = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sjs_js_ArrayOpsCommon$();
  var items$proxy8 = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sr_ScalaRunTime$().e(new ($j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$d_T.r().C)(["color"]));
  var $x_22 = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sjsr_Compat$().d(items$proxy8);
  var items$proxy9 = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sr_ScalaRunTime$().e(new ($j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$d_T.r().C)([]));
  var $x_21 = $x_23.i([...$x_22], [...$j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sjsr_Compat$().d(items$proxy9)]);
  var $x_20 = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sjs_js_ArrayOpsCommon$();
  var items$proxy10 = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sr_ScalaRunTime$().e(new ($j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$d_T.r().C)(["vec4<f32>"]));
  var $x_19 = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sjsr_Compat$().d(items$proxy10);
  var items$proxy11 = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sr_ScalaRunTime$().e(new ($j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$d_T.r().C)([]));
  var $x_18 = $x_20.i([...$x_19], [...$j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sjsr_Compat$().d(items$proxy11)]);
  var $x_17 = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sjs_js_ArrayOpsCommon$();
  var items$proxy12 = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sr_ScalaRunTime$().e(new ($j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$d_T3.r().C)([new $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$c_T3("position", "position", "vec4<f32>")]));
  var $x_16 = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sjsr_Compat$().d(items$proxy12);
  var items$proxy13 = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sr_ScalaRunTime$().e(new ($j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$d_T3.r().C)([]));
  var $x_15 = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$p_Lgpu_shader_derive$__generateCombinedStructFromLists__T__sjs_js_Array__sjs_js_Array__sjs_js_Array__T($x_24, "VertexOutput", $x_21, $x_18, $x_17.i([...$x_16], [...$j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sjsr_Compat$().d(items$proxy13)]));
  var $x_14 = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_Lgpu_shader_derive$();
  var $x_13 = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sjs_js_ArrayOpsCommon$();
  var items$proxy14 = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sr_ScalaRunTime$().e(new ($j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$d_T.r().C)(["color"]));
  var $x_12 = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sjsr_Compat$().d(items$proxy14);
  var items$proxy15 = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sr_ScalaRunTime$().e(new ($j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$d_T.r().C)([]));
  var $x_11 = $x_13.i([...$x_12], [...$j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sjsr_Compat$().d(items$proxy15)]);
  var $x_10 = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sjs_js_ArrayOpsCommon$();
  var items$proxy16 = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sr_ScalaRunTime$().e(new ($j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$d_T.r().C)(["vec4<f32>"]));
  var $x_9 = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sjsr_Compat$().d(items$proxy16);
  var items$proxy17 = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sr_ScalaRunTime$().e(new ($j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$d_T.r().C)([]));
  var $x_8 = $x_10.i([...$x_9], [...$j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sjsr_Compat$().d(items$proxy17)]);
  var items$proxy18 = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sr_ScalaRunTime$().e(new ($j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$d_T3.r().C)([]));
  var $x_7 = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$p_Lgpu_shader_derive$__generateCombinedStructFromLists__T__sjs_js_Array__sjs_js_Array__sjs_js_Array__T($x_14, "FragmentOutput", $x_11, $x_8, [...$j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sjsr_Compat$().d(items$proxy18)]);
  var $x_6 = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_Lgpu_shader_derive$();
  var $x_5 = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sjs_js_ArrayOpsCommon$();
  var items$proxy19 = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sr_ScalaRunTime$().e(new ($j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$d_T.r().C)(["tintColor"]));
  var $x_4 = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sjsr_Compat$().d(items$proxy19);
  var items$proxy20 = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sr_ScalaRunTime$().e(new ($j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$d_T.r().C)([]));
  var $x_3 = $x_5.i([...$x_4], [...$j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sjsr_Compat$().d(items$proxy20)]);
  var $x_2 = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sjs_js_ArrayOpsCommon$();
  var items$proxy21 = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sr_ScalaRunTime$().e(new ($j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$d_T.r().C)(["vec4<f32>"]));
  var $x_1 = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sjsr_Compat$().d(items$proxy21);
  var items$proxy22 = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sr_ScalaRunTime$().e(new ($j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$d_T.r().C)([]));
  var wgslCode = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$p_Lgpu_shader_ShaderDef__buildWGSL__T__T__T__T__T__T__T(triangleShader, $x_25, $x_15, $x_7, $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$p_Lgpu_shader_derive$__generateUniformGroupFromLists__I__sjs_js_Array__sjs_js_Array__T($x_6, 0, $x_3, $x_2.i([...$x_1], [...$j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sjsr_Compat$().d(items$proxy22)])), triangleShader.a8, triangleShader.a7);
  console.log(("Generated WGSL:\n" + wgslCode));
  var shaderModule = device.createShaderModule(({
    "code": wgslCode
  }));
  $m_Lgpu_buffers_AttribLayoutHelper$().bA();
  var buffer = new ArrayBuffer(72);
  var _1 = new DataView(buffer);
  var other$proxy1 = new $c_Lgpu_math_Vec2(0.0, 0.5);
  var value$proxy1 = $m_Lgpu_math_package$package$().u().s(other$proxy1.aJ);
  _1.setFloat32(0, value$proxy1, true);
  var value$proxy2 = $m_Lgpu_math_package$package$().u().s(other$proxy1.aK);
  _1.setFloat32(4, value$proxy2, true);
  var value$proxy3 = $m_Lgpu_math_package$package$().an().a3(1.0);
  _1.setFloat32(8, value$proxy3, true);
  var value$proxy4 = $m_Lgpu_math_package$package$().an().a3(0.0);
  _1.setFloat32(12, value$proxy4, true);
  var value$proxy5 = $m_Lgpu_math_package$package$().an().a3(0.0);
  _1.setFloat32(16, value$proxy5, true);
  var value$proxy6 = $m_Lgpu_math_package$package$().an().a3(1.0);
  _1.setFloat32(20, value$proxy6, true);
  var value$proxy7 = $m_Lgpu_math_package$package$().u().s((-0.5));
  _1.setFloat32(24, value$proxy7, true);
  var value$proxy8 = $m_Lgpu_math_package$package$().u().s((-0.5));
  _1.setFloat32(28, value$proxy8, true);
  var value$proxy9 = $m_Lgpu_math_package$package$().u().s(0.0);
  _1.setFloat32(32, value$proxy9, true);
  var value$proxy10 = $m_Lgpu_math_package$package$().u().s(1.0);
  _1.setFloat32(36, value$proxy10, true);
  var value$proxy11 = $m_Lgpu_math_package$package$().u().s(0.0);
  _1.setFloat32(40, value$proxy11, true);
  var value$proxy12 = $m_Lgpu_math_package$package$().u().s(1.0);
  _1.setFloat32(44, value$proxy12, true);
  var value$proxy13 = $m_Lgpu_math_package$package$().u().s(0.5);
  _1.setFloat32(48, value$proxy13, true);
  var value$proxy14 = $m_Lgpu_math_package$package$().u().s((-0.5));
  _1.setFloat32(52, value$proxy14, true);
  _1.setFloat32(64, 1.0, true);
  _1.setFloat32(68, 1.0, true);
  var value = (_1.buffer.byteLength | 0);
  var vertexBuffer = device.createBuffer(({
    "size": value,
    "usage": 40
  }));
  device.queue.writeBuffer(vertexBuffer, 0.0, _1.buffer);
  var ul$proxy1 = new $c_Lgpu_buffers_UniformLayout$given\uff3fUniformLayout\uff3fT($m_Lgpu_buffers_UniformValue$given\uff3fUniformValue\uff3fVec4\uff3fVec4Buffer$());
  var uv$proxy1 = ul$proxy1.aI;
  var buffer$2 = new ArrayBuffer(16);
  var tintColor = new $c_Lgpu_buffers_BufferBinding(new $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$c_T2(new DataView(buffer$2), 0), device, uv$proxy1);
  var $x_41 = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sjs_js_ArrayOpsCommon$();
  var $x_39 = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sr_ScalaRunTime$();
  var _2 = ({
    "type": "uniform"
  });
  var entry = ({
    "binding": 0,
    "visibility": 3,
    "buffer": _2
  });
  var $x_38 = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sjs_js_ArrayOpsCommon$();
  var items$proxy23 = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sr_ScalaRunTime$().P(new ($j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$d_sjs_js_Object.r().C)([entry]));
  var $x_37 = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sjsr_Compat$().d(items$proxy23);
  var items$proxy24 = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sr_ScalaRunTime$().e(new ($d_sjs_js_Dynamic.r().C)([]));
  var items$proxy25 = $x_39.e(new ($d_sjs_js_Array.r().C)([$x_38.i([...$x_37], [...$j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sjsr_Compat$().d(items$proxy24)])]));
  var $x_40 = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sjsr_Compat$().d(items$proxy25);
  var items$proxy26 = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sr_ScalaRunTime$().e(new ($d_sjs_js_Array.r().C)([]));
  var descriptors = $x_41.i([...$x_40], [...$j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sjsr_Compat$().d(items$proxy26)]);
  var items$proxy27 = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sr_ScalaRunTime$().e(new ($d_Lwebgpu_GPUBindGroupLayout.r().C)([]));
  var result = [...$j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sjsr_Compat$().d(items$proxy27)];
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
  var \u03b42$___2 = $m_Lgpu_shader_layouts$().bt(device, result);
  var bindGroupLayouts = \u03b42$___1;
  var pipelineLayout$2 = \u03b42$___2;
  var $x_51 = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sr_ScalaRunTime$();
  var $x_45 = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sjs_js_ArrayOpsCommon$();
  var items$proxy28 = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sr_ScalaRunTime$().e(new ($j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$d_T.r().C)(["float32x2"]));
  var $x_44 = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sjsr_Compat$().d(items$proxy28);
  var $x_43 = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sjs_js_ArrayOpsCommon$();
  var items$proxy29 = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sr_ScalaRunTime$().e(new ($j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$d_T.r().C)(["float32x4"]));
  var $x_42 = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sjsr_Compat$().d(items$proxy29);
  var items$proxy30 = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sr_ScalaRunTime$().e(new ($j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$d_T.r().C)([]));
  var formats = $x_45.i([...$x_44], $x_43.i([...$x_42], [...$j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sjsr_Compat$().d(items$proxy30)]));
  var $x_49 = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sjs_js_ArrayOpsCommon$();
  var items$proxy31 = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sr_ScalaRunTime$().ap(new $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$ac_I(new Int32Array([8])));
  var $x_48 = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sjsr_Compat$().d(items$proxy31);
  var $x_47 = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sjs_js_ArrayOpsCommon$();
  var items$proxy32 = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sr_ScalaRunTime$().ap(new $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$ac_I(new Int32Array([16])));
  var $x_46 = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sjsr_Compat$().d(items$proxy32);
  var items$proxy33 = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sr_ScalaRunTime$().ap(new $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$ac_I(new Int32Array([])));
  var sizes = $x_49.i([...$x_48], $x_47.i([...$x_46], [...$j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sjsr_Compat$().d(items$proxy33)]));
  var offsets = $p_Lgpu_shader_layouts$__calculateOffsets__sjs_js_Array__sjs_js_Array($m_Lgpu_shader_layouts$(), sizes);
  var stride$3 = $p_Lgpu_shader_layouts$__calculateStride__sjs_js_Array__I($m_Lgpu_shader_layouts$(), sizes);
  var items$proxy34 = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sr_ScalaRunTime$().e(new ($d_sjs_js_Dynamic.r().C)([]));
  var attributes = [...$j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sjsr_Compat$().d(items$proxy34)];
  var end = (formats.length | 0);
  var isEmpty = (end <= 0);
  var scala$collection$immutable$Range$$lastElement = (((-1) + end) | 0);
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
  var items$proxy35 = $x_51.e(new ($d_sjs_js_Dynamic.r().C)([({
    "arrayStride": stride$3,
    "attributes": attributes
  })]));
  var _2$1 = [...$j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sjsr_Compat$().d(items$proxy35)];
  var _2$2 = ({
    "module": shaderModule,
    "entryPoint": "vs_main",
    "buffers": _2$1
  });
  var items$proxy36 = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sr_ScalaRunTime$().P(new ($j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$d_sjs_js_Object.r().C)([({
    "format": "bgra8unorm"
  })]));
  var _2$3 = [...$j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sjsr_Compat$().d(items$proxy36)];
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
  var $x_52 = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sr_ScalaRunTime$();
  var _2$7 = tintColor.as;
  var _2$8 = ({
    "buffer": _2$7
  });
  var items$proxy37 = $x_52.P(new ($j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$d_sjs_js_Object.r().C)([({
    "binding": 0,
    "resource": _2$8
  })]));
  var _2$9 = [...$j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sjsr_Compat$().d(items$proxy37)];
  var bindGroup = device.createBindGroup(({
    "layout": _2$6,
    "entries": _2$9
  }));
  var startTime = new $c_sr_DoubleRef((+Date.now()));
  window.requestAnimationFrame(((t$3) => {
    $p_Lbuffer\uff3ftriangle_BufferTriangle$__render$1__sr_DoubleRef__Lgpu_buffers_BufferBinding__Lwebgpu_GPUDevice__Lwebgpu_GPUCanvasContext__Lwebgpu_GPURenderPipeline__Lwebgpu_GPUBindGroup__Lwebgpu_GPUBuffer__D__V(this, startTime, tintColor, device, context, pipeline, bindGroup, vertexBuffer, (+t$3));
  }));
  setStatus.E("Buffer triangle with animated tint!", false);
});
var $d_Lbuffer\uff3ftriangle_BufferTriangle$ = new $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$TypeData().i($c_Lbuffer\uff3ftriangle_BufferTriangle$, "buffer_triangle.BufferTriangle$", ({
  a9: 1
}));
var $n_Lbuffer\uff3ftriangle_BufferTriangle$;
function $m_Lbuffer\uff3ftriangle_BufferTriangle$() {
  if ((!$n_Lbuffer\uff3ftriangle_BufferTriangle$)) {
    $n_Lbuffer\uff3ftriangle_BufferTriangle$ = new $c_Lbuffer\uff3ftriangle_BufferTriangle$();
  }
  return $n_Lbuffer\uff3ftriangle_BufferTriangle$;
}
/** @constructor */
function $c_Lgpu_buffers_AttribLayoutHelper$() {
  this.aF = null;
  this.aG = false;
}
$p = $c_Lgpu_buffers_AttribLayoutHelper$.prototype = new $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$h_O();
$p.constructor = $c_Lgpu_buffers_AttribLayoutHelper$;
/** @constructor */
function $h_Lgpu_buffers_AttribLayoutHelper$() {
}
$h_Lgpu_buffers_AttribLayoutHelper$.prototype = $p;
$p.bA = (function() {
  if ((!this.aG)) {
    this.aF = new $c_Lgpu_buffers_AttribLayoutHelper$$anon$2();
    this.aG = true;
  }
  return this.aF;
});
var $d_Lgpu_buffers_AttribLayoutHelper$ = new $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$TypeData().i($c_Lgpu_buffers_AttribLayoutHelper$, "gpu.buffers.AttribLayoutHelper$", ({
  ac: 1
}));
var $n_Lgpu_buffers_AttribLayoutHelper$;
function $m_Lgpu_buffers_AttribLayoutHelper$() {
  if ((!$n_Lgpu_buffers_AttribLayoutHelper$)) {
    $n_Lgpu_buffers_AttribLayoutHelper$ = new $c_Lgpu_buffers_AttribLayoutHelper$();
  }
  return $n_Lgpu_buffers_AttribLayoutHelper$;
}
/** @constructor */
function $c_Lgpu_buffers_BufferBinding(buffer, device, uv) {
  this.ar = null;
  this.aH = null;
  this.as = null;
  this.ar = buffer;
  this.aH = device;
  var b = (buffer.w().byteLength | 0);
  var value = ((b < 16) ? 16 : b);
  var $x_1 = device.createBuffer(({
    "size": value,
    "usage": 72
  }));
  this.as = $x_1;
}
$p = $c_Lgpu_buffers_BufferBinding.prototype = new $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$h_O();
$p.constructor = $c_Lgpu_buffers_BufferBinding;
/** @constructor */
function $h_Lgpu_buffers_BufferBinding() {
}
$h_Lgpu_buffers_BufferBinding.prototype = $p;
var $d_Lgpu_buffers_BufferBinding = new $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$TypeData().i($c_Lgpu_buffers_BufferBinding, "gpu.buffers.BufferBinding", ({
  ae: 1
}));
/** @constructor */
function $c_Lgpu_math_Vec2(x, y) {
  this.aJ = 0.0;
  this.aK = 0.0;
  this.aJ = x;
  this.aK = y;
}
$p = $c_Lgpu_math_Vec2.prototype = new $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$h_O();
$p.constructor = $c_Lgpu_math_Vec2;
/** @constructor */
function $h_Lgpu_math_Vec2() {
}
$h_Lgpu_math_Vec2.prototype = $p;
var $d_Lgpu_math_Vec2 = new $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$TypeData().i($c_Lgpu_math_Vec2, "gpu.math.Vec2", ({
  aj: 1
}));
/** @constructor */
function $c_Lgpu_math_package$package$() {
  this.aN = null;
  this.aO = false;
  this.aL = null;
  this.aM = false;
}
$p = $c_Lgpu_math_package$package$.prototype = new $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$h_O();
$p.constructor = $c_Lgpu_math_package$package$;
/** @constructor */
function $h_Lgpu_math_package$package$() {
}
$h_Lgpu_math_package$package$.prototype = $p;
$p.an = (function() {
  if ((!this.aO)) {
    this.aN = new $c_Lgpu_math_package$package$$anon$1();
    this.aO = true;
  }
  return this.aN;
});
$p.u = (function() {
  if ((!this.aM)) {
    this.aL = new $c_Lgpu_math_package$package$$anon$4();
    this.aM = true;
  }
  return this.aL;
});
var $d_Lgpu_math_package$package$ = new $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$TypeData().i($c_Lgpu_math_package$package$, "gpu.math.package$package$", ({
  ak: 1
}));
var $n_Lgpu_math_package$package$;
function $m_Lgpu_math_package$package$() {
  if ((!$n_Lgpu_math_package$package$)) {
    $n_Lgpu_math_package$package$ = new $c_Lgpu_math_package$package$();
  }
  return $n_Lgpu_math_package$package$;
}
function $p_Lgpu_shader_layouts$__calculateOffsets__sjs_js_Array__sjs_js_Array($thiz, sizes) {
  var items$proxy1 = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sr_ScalaRunTime$().ap(new $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$ac_I(new Int32Array([])));
  var offsets = [...$j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sjsr_Compat$().d(items$proxy1)];
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
/** @constructor */
function $c_Lgpu_shader_layouts$() {
}
$p = $c_Lgpu_shader_layouts$.prototype = new $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$h_O();
$p.constructor = $c_Lgpu_shader_layouts$;
/** @constructor */
function $h_Lgpu_shader_layouts$() {
}
$h_Lgpu_shader_layouts$.prototype = $p;
$p.bt = (function(device, bindGroupLayouts) {
  return device.createPipelineLayout(({
    "bindGroupLayouts": bindGroupLayouts
  }));
});
var $d_Lgpu_shader_layouts$ = new $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$TypeData().i($c_Lgpu_shader_layouts$, "gpu.shader.layouts$", ({
  ap: 1
}));
var $n_Lgpu_shader_layouts$;
function $m_Lgpu_shader_layouts$() {
  if ((!$n_Lgpu_shader_layouts$)) {
    $n_Lgpu_shader_layouts$ = new $c_Lgpu_shader_layouts$();
  }
  return $n_Lgpu_shader_layouts$;
}
var $d_Lwebgpu_GPUBindGroupLayout = new $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$TypeData().i(2, "webgpu.GPUBindGroupLayout", ({
  c5: 1
}), $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$noIsInstance);
/** @constructor */
function $c_Lgpu_buffers_AttribLayoutHelper$$anon$2() {
}
$p = $c_Lgpu_buffers_AttribLayoutHelper$$anon$2.prototype = new $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$h_O();
$p.constructor = $c_Lgpu_buffers_AttribLayoutHelper$$anon$2;
/** @constructor */
function $h_Lgpu_buffers_AttribLayoutHelper$$anon$2() {
}
$h_Lgpu_buffers_AttribLayoutHelper$$anon$2.prototype = $p;
var $d_Lgpu_buffers_AttribLayoutHelper$$anon$2 = new $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$TypeData().i($c_Lgpu_buffers_AttribLayoutHelper$$anon$2, "gpu.buffers.AttribLayoutHelper$$anon$2", ({
  ad: 1,
  ab: 1
}));
/** @constructor */
function $c_Lgpu_buffers_UniformLayout$given\uff3fUniformLayout\uff3fT(uv) {
  this.aI = null;
  this.aI = uv;
}
$p = $c_Lgpu_buffers_UniformLayout$given\uff3fUniformLayout\uff3fT.prototype = new $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$h_O();
$p.constructor = $c_Lgpu_buffers_UniformLayout$given\uff3fUniformLayout\uff3fT;
/** @constructor */
function $h_Lgpu_buffers_UniformLayout$given\uff3fUniformLayout\uff3fT() {
}
$h_Lgpu_buffers_UniformLayout$given\uff3fUniformLayout\uff3fT.prototype = $p;
var $d_Lgpu_buffers_UniformLayout$given\uff3fUniformLayout\uff3fT = new $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$TypeData().i($c_Lgpu_buffers_UniformLayout$given\uff3fUniformLayout\uff3fT, "gpu.buffers.UniformLayout$given_UniformLayout_T", ({
  ag: 1,
  af: 1
}));
/** @constructor */
function $c_Lgpu_buffers_UniformValue$given\uff3fUniformValue\uff3fVec4\uff3fVec4Buffer$() {
}
$p = $c_Lgpu_buffers_UniformValue$given\uff3fUniformValue\uff3fVec4\uff3fVec4Buffer$.prototype = new $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$h_O();
$p.constructor = $c_Lgpu_buffers_UniformValue$given\uff3fUniformValue\uff3fVec4\uff3fVec4Buffer$;
/** @constructor */
function $h_Lgpu_buffers_UniformValue$given\uff3fUniformValue\uff3fVec4\uff3fVec4Buffer$() {
}
$h_Lgpu_buffers_UniformValue$given\uff3fUniformValue\uff3fVec4\uff3fVec4Buffer$.prototype = $p;
var $d_Lgpu_buffers_UniformValue$given\uff3fUniformValue\uff3fVec4\uff3fVec4Buffer$ = new $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$TypeData().i($c_Lgpu_buffers_UniformValue$given\uff3fUniformValue\uff3fVec4\uff3fVec4Buffer$, "gpu.buffers.UniformValue$given_UniformValue_Vec4_Vec4Buffer$", ({
  ai: 1,
  ah: 1
}));
var $n_Lgpu_buffers_UniformValue$given\uff3fUniformValue\uff3fVec4\uff3fVec4Buffer$;
function $m_Lgpu_buffers_UniformValue$given\uff3fUniformValue\uff3fVec4\uff3fVec4Buffer$() {
  if ((!$n_Lgpu_buffers_UniformValue$given\uff3fUniformValue\uff3fVec4\uff3fVec4Buffer$)) {
    $n_Lgpu_buffers_UniformValue$given\uff3fUniformValue\uff3fVec4\uff3fVec4Buffer$ = new $c_Lgpu_buffers_UniformValue$given\uff3fUniformValue\uff3fVec4\uff3fVec4Buffer$();
  }
  return $n_Lgpu_buffers_UniformValue$given\uff3fUniformValue\uff3fVec4\uff3fVec4Buffer$;
}
/** @constructor */
function $c_s_Conversion() {
}
$p = $c_s_Conversion.prototype = new $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$h_O();
$p.constructor = $c_s_Conversion;
/** @constructor */
function $h_s_Conversion() {
}
$h_s_Conversion.prototype = $p;
$p.o = (function() {
  return "<function1>";
});
$p.a3 = (function(x$0) {
  return Math.fround(this.k(x$0));
});
$p.s = (function(x$0) {
  return Math.fround(this.k(x$0));
});
/** @constructor */
function $c_sr_DoubleRef(elem) {
  this.av = 0.0;
  this.av = elem;
}
$p = $c_sr_DoubleRef.prototype = new $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$h_O();
$p.constructor = $c_sr_DoubleRef;
/** @constructor */
function $h_sr_DoubleRef() {
}
$h_sr_DoubleRef.prototype = $p;
$p.o = (function() {
  return ("" + this.av);
});
var $d_sr_DoubleRef = new $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$TypeData().i($c_sr_DoubleRef, "scala.runtime.DoubleRef", ({
  bK: 1,
  a: 1
}));
var $d_sjs_js_Dynamic = new $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$TypeData().i(2, "scala.scalajs.js.Dynamic", ({
  bT: 1,
  T: 1
}), $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$noIsInstance);
/** @constructor */
function $c_Lgpu_math_package$package$$anon$1() {
}
$p = $c_Lgpu_math_package$package$$anon$1.prototype = new $h_s_Conversion();
$p.constructor = $c_Lgpu_math_package$package$$anon$1;
/** @constructor */
function $h_Lgpu_math_package$package$$anon$1() {
}
$h_Lgpu_math_package$package$$anon$1.prototype = $p;
$p.a3 = (function(x) {
  return x;
});
$p.k = (function(x) {
  return Math.fround(x);
});
var $d_Lgpu_math_package$package$$anon$1 = new $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$TypeData().i($c_Lgpu_math_package$package$$anon$1, "gpu.math.package$package$$anon$1", ({
  al: 1,
  a0: 1,
  e: 1
}));
/** @constructor */
function $c_Lgpu_math_package$package$$anon$4() {
}
$p = $c_Lgpu_math_package$package$$anon$4.prototype = new $h_s_Conversion();
$p.constructor = $c_Lgpu_math_package$package$$anon$4;
/** @constructor */
function $h_Lgpu_math_package$package$$anon$4() {
}
$h_Lgpu_math_package$package$$anon$4.prototype = $p;
$p.s = (function(_$1) {
  return Math.fround(_$1);
});
$p.k = (function(x) {
  return Math.fround((+x));
});
var $d_Lgpu_math_package$package$$anon$4 = new $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$TypeData().i($c_Lgpu_math_package$package$$anon$4, "gpu.math.package$package$$anon$4", ({
  am: 1,
  a0: 1,
  e: 1
}));
var $d_sjs_js_Array = new $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$TypeData().i(2, "scala.scalajs.js.Array", ({
  bQ: 1,
  a8: 1,
  T: 1,
  bU: 1
}), ((x) => (x instanceof Array)));
/** @constructor */
function $c_Lbuffer\uff3ftriangle_BufferTriangle$$anon$1(setStatus$5) {
  this.aq = null;
  this.aq = setStatus$5;
}
$p = $c_Lbuffer\uff3ftriangle_BufferTriangle$$anon$1.prototype = new $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$h_sr_AbstractPartialFunction();
$p.constructor = $c_Lbuffer\uff3ftriangle_BufferTriangle$$anon$1;
/** @constructor */
function $h_Lbuffer\uff3ftriangle_BufferTriangle$$anon$1() {
}
$h_Lbuffer\uff3ftriangle_BufferTriangle$$anon$1.prototype = $p;
$p.aB = (function(x) {
  return true;
});
$p.al = (function(x, default$1) {
  if ((x instanceof $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$c_ju_NoSuchElementException)) {
    this.aq.E(x.a9, true);
  } else {
    this.aq.E(("WebGPU error: " + x), true);
  }
});
var $d_Lbuffer\uff3ftriangle_BufferTriangle$$anon$1 = new $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$TypeData().i($c_Lbuffer\uff3ftriangle_BufferTriangle$$anon$1, "buffer_triangle.BufferTriangle$$anon$1", ({
  aa: 1,
  a7: 1,
  e: 1,
  f: 1,
  a: 1
}));
let $e_main = (function() {
  $m_Lbuffer\uff3ftriangle_BufferTriangle$().aC();
});
export { $e_main as main };
