'use strict';
import * as $j_gpu$002eshader$002e$002dShader$002dDef from "./gpu.shader.-Shader-Def.js";
import * as $j_gpu$002eshader$002ederive$0024 from "./gpu.shader.derive$.js";
import * as $j_java$002elang$002e$002dObject from "./java.lang.-Object.js";
import * as $j_scala$002e$002dNone$0024 from "./scala.-None$.js";
import * as $j_scala$002e$002dPartial$002dFunction$0024 from "./scala.-Partial-Function$.js";
import * as $j_scala$002e$002dSome from "./scala.-Some.js";
import * as $j_scala$002e$002dTuple3 from "./scala.-Tuple3.js";
import * as $j_scala$002ecollection$002e$002dString$002dOps$0024 from "./scala.collection.-String-Ops$.js";
import * as $j_scala$002eruntime$002e$002dAbstract$002dFunction1$002e$0024$0024$002dLambda$002470e1780b84463d18653aacefee3ab989ac625f28 from "./scala.runtime.-Abstract-Function1.$$-Lambda$70e1780b84463d18653aacefee3ab989ac625f28.js";
import * as $j_scala$002eruntime$002e$002dAbstract$002dFunction2$002e$0024$0024$002dLambda$0024286cbfc6187197affcadc8465aaec93d6b7d20dc from "./scala.runtime.-Abstract-Function2.$$-Lambda$286cbfc6187197affcadc8465aaec93d6b7d20dc.js";
import * as $j_scala$002escalajs$002ejs$002e$002dAny$0024 from "./scala.scalajs.js.-Any$.js";
import * as $j_scala$002escalajs$002ejs$002e$002dArray$002dOps$002dCommon$0024 from "./scala.scalajs.js.-Array-Ops-Common$.js";
import * as $j_scala$002escalajs$002ejs$002e$002dObject from "./scala.scalajs.js.-Object.js";
import * as $j_scala$002escalajs$002eruntime$002e$002dCompat$0024 from "./scala.scalajs.runtime.-Compat$.js";
import * as $j_simple$005ftriangle$002e$002dSimple$002dTriangle$0024$0024anon$00241 from "./simple_triangle.-Simple-Triangle$$anon$1.js";
import * as $j_webgpu$002e$002dG$002dP$002dU$002dCommand$002dBuffer from "./webgpu.-G-P-U-Command-Buffer.js";
import * as $j_webgpu$002e$002dWeb$002dG$002dP$002dU$0024 from "./webgpu.-Web-G-P-U$.js";
var $p;
function $p_Lsimple\uff3ftriangle_SimpleTriangle$__setStatus$6__Lorg_scalajs_dom_HTMLElement__T__Z__V($thiz, statusEl$1, msg, isError) {
  statusEl$1.textContent = msg;
  statusEl$1.setAttribute("class", (isError ? "error" : "success"));
}
export { $p_Lsimple\uff3ftriangle_SimpleTriangle$__setStatus$6__Lorg_scalajs_dom_HTMLElement__T__Z__V as $p_Lsimple\uff3ftriangle_SimpleTriangle$__setStatus$6__Lorg_scalajs_dom_HTMLElement__T__Z__V };
function $p_Lsimple\uff3ftriangle_SimpleTriangle$__render$1__Lwebgpu_GPUDevice__Lwebgpu_GPUCanvasContext__Lwebgpu_GPURenderPipeline__V($thiz, device$1, context$1, pipeline$1) {
  var commandEncoder = device$1.createCommandEncoder();
  var textureView = context$1.getCurrentTexture().createView();
  var $x_1 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$();
  var _2 = ({
    "r": 0.1,
    "g": 0.1,
    "b": 0.15,
    "a": 1.0
  });
  var items$proxy17 = $x_1.L(new ($j_scala$002escalajs$002ejs$002e$002dObject.$d_sjs_js_Object.r().C)([({
    "view": textureView,
    "loadOp": "clear",
    "storeOp": "store",
    "clearValue": _2
  })]));
  var _2$1 = [...$j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy17)];
  var renderPass = commandEncoder.beginRenderPass(({
    "colorAttachments": _2$1
  }));
  renderPass.setPipeline(pipeline$1);
  renderPass.draw(3);
  renderPass.end();
  var $x_2 = device$1.queue;
  var items$proxy18 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().c(new ($j_webgpu$002e$002dG$002dP$002dU$002dCommand$002dBuffer.$d_Lwebgpu_GPUCommandBuffer.r().C)([commandEncoder.finish()]));
  $x_2.submit([...$j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy18)]);
}
export { $p_Lsimple\uff3ftriangle_SimpleTriangle$__render$1__Lwebgpu_GPUDevice__Lwebgpu_GPUCanvasContext__Lwebgpu_GPURenderPipeline__V as $p_Lsimple\uff3ftriangle_SimpleTriangle$__render$1__Lwebgpu_GPUDevice__Lwebgpu_GPUCanvasContext__Lwebgpu_GPURenderPipeline__V };
/** @constructor */
function $c_Lsimple\uff3ftriangle_SimpleTriangle$() {
}
export { $c_Lsimple\uff3ftriangle_SimpleTriangle$ as $c_Lsimple\uff3ftriangle_SimpleTriangle$ };
$p = $c_Lsimple\uff3ftriangle_SimpleTriangle$.prototype = new $j_java$002elang$002e$002dObject.$h_O();
$p.constructor = $c_Lsimple\uff3ftriangle_SimpleTriangle$;
/** @constructor */
function $h_Lsimple\uff3ftriangle_SimpleTriangle$() {
}
export { $h_Lsimple\uff3ftriangle_SimpleTriangle$ as $h_Lsimple\uff3ftriangle_SimpleTriangle$ };
$h_Lsimple\uff3ftriangle_SimpleTriangle$.prototype = $p;
$p.ag = (function() {
  var statusEl = document.getElementById("status");
  var canvas = document.getElementById("canvas");
  matchResult1: {
    var x = $j_webgpu$002e$002dWeb$002dG$002dP$002dU$0024.$m_Lwebgpu_WebGPU$().aX();
    var x1 = ((x === (void 0)) ? $j_scala$002e$002dNone$0024.$m_s_None$() : new $j_scala$002e$002dSome.$c_s_Some(x));
    if (($j_scala$002e$002dNone$0024.$m_s_None$() === x1)) {
      $p_Lsimple\uff3ftriangle_SimpleTriangle$__setStatus$6__Lorg_scalajs_dom_HTMLElement__T__Z__V(this, statusEl, "WebGPU is not supported in this browser", true);
      break matchResult1;
    }
    if ((x1 instanceof $j_scala$002e$002dSome.$c_s_Some)) {
      var gpu = x1.as;
      $p_Lsimple\uff3ftriangle_SimpleTriangle$__setStatus$6__Lorg_scalajs_dom_HTMLElement__T__Z__V(this, statusEl, "WebGPU available, initializing...", false);
      this.b0(gpu, canvas, new $j_scala$002eruntime$002e$002dAbstract$002dFunction2$002e$0024$0024$002dLambda$0024286cbfc6187197affcadc8465aaec93d6b7d20dc.$c_sr_AbstractFunction2_$$Lambda$286cbfc6187197affcadc8465aaec93d6b7d20dc(((v1$2, v2$2) => {
        $p_Lsimple\uff3ftriangle_SimpleTriangle$__setStatus$6__Lorg_scalajs_dom_HTMLElement__T__Z__V(this, statusEl, v1$2, (!(!v2$2)));
      })));
      break matchResult1;
    }
    throw new $j_java$002elang$002e$002dObject.$c_s_MatchError(x1);
  }
});
$p.b0 = (function(gpu, canvas, setStatus) {
  var promise$proxy1 = gpu.requestAdapter();
  var promise$proxy3 = promise$proxy1.then(((value$2) => {
    if ((value$2 === null)) {
      throw new $j_java$002elang$002e$002dObject.$c_ju_NoSuchElementException("Failed to get WebGPU adapter");
    } else {
      return value$2;
    }
  }));
  var f$proxy2 = new $j_scala$002eruntime$002e$002dAbstract$002dFunction1$002e$0024$0024$002dLambda$002470e1780b84463d18653aacefee3ab989ac625f28.$c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28(((adapter$2) => {
    var promise$proxy2 = adapter$2.requestDevice();
    var f$proxy1 = new $j_scala$002eruntime$002e$002dAbstract$002dFunction1$002e$0024$0024$002dLambda$002470e1780b84463d18653aacefee3ab989ac625f28.$c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28(((device$3) => {
      setStatus.F("WebGPU initialized! Rendering triangle...", false);
      this.b2(device$3, canvas, setStatus);
    }));
    return promise$proxy2.then($j_scala$002escalajs$002ejs$002e$002dAny$0024.$m_sjs_js_Any$().U(f$proxy1));
  }));
  var result = promise$proxy3.then($j_scala$002escalajs$002ejs$002e$002dAny$0024.$m_sjs_js_Any$().U(f$proxy2));
  var pf$proxy1 = new $j_simple$005ftriangle$002e$002dSimple$002dTriangle$0024$0024anon$00241.$c_Lsimple\uff3ftriangle_SimpleTriangle$$anon$1(setStatus);
  result.catch(((err$2) => {
    if (pf$proxy1.b1(err$2)) {
      return pf$proxy1.aF(err$2, $j_scala$002e$002dPartial$002dFunction$0024.$m_s_PartialFunction$().ar);
    } else {
      var $x_1 = err$2;
      throw (($x_1 instanceof $j_java$002elang$002e$002dObject.$c_sjs_js_JavaScriptException) ? $x_1.S : $x_1);
    }
  }));
});
$p.b2 = (function(device, canvas, setStatus) {
  var triangleShader = new $j_gpu$002eshader$002e$002dShader$002dDef.$c_Lgpu_shader_ShaderDef($j_scala$002ecollection$002e$002dString$002dOps$0024.$m_sc_StringOps$().W("\n        |  let positions = array<vec2<f32>, 3>(\n        |    vec2<f32>(0.0, 0.5),\n        |    vec2<f32>(-0.5, -0.5),\n        |    vec2<f32>(0.5, -0.5)\n        |  );\n        |  let colors = array<vec4<f32>, 3>(\n        |    vec4<f32>(1.0, 0.0, 0.0, 1.0),\n        |    vec4<f32>(0.0, 1.0, 0.0, 1.0),\n        |    vec4<f32>(0.0, 0.0, 1.0, 1.0)\n        |  );\n        |  let idx = in.vertexIndex;\n        |  out.position = vec4<f32>(positions[idx], 0.0, 1.0);\n        |  out.color = colors[idx];\n        ", 124), $j_scala$002ecollection$002e$002dString$002dOps$0024.$m_sc_StringOps$().W("\n        |  out.color = in.color;\n        ", 124));
  var $x_23 = $j_gpu$002eshader$002ederive$0024.$m_Lgpu_shader_derive$();
  var items$proxy1 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().c(new ($j_java$002elang$002e$002dObject.$d_T.r().C)([]));
  var $x_22 = $j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy1);
  var items$proxy2 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().c(new ($j_java$002elang$002e$002dObject.$d_T.r().C)([]));
  var $x_21 = $j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy2);
  var $x_20 = $j_scala$002escalajs$002ejs$002e$002dArray$002dOps$002dCommon$0024.$m_sjs_js_ArrayOpsCommon$();
  var items$proxy3 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().c(new ($j_scala$002e$002dTuple3.$d_T3.r().C)([new $j_scala$002e$002dTuple3.$c_T3("vertexIndex", "vertex_index", "u32")]));
  var $x_19 = $j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy3);
  var items$proxy4 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().c(new ($j_scala$002e$002dTuple3.$d_T3.r().C)([]));
  var $x_18 = $j_gpu$002eshader$002ederive$0024.$p_Lgpu_shader_derive$__generateCombinedStructFromLists__T__sjs_js_Array__sjs_js_Array__sjs_js_Array__T($x_23, "VertexInput", [...$x_22], [...$x_21], $x_20.d([...$x_19], [...$j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy4)]));
  var $x_17 = $j_gpu$002eshader$002ederive$0024.$m_Lgpu_shader_derive$();
  var $x_16 = $j_scala$002escalajs$002ejs$002e$002dArray$002dOps$002dCommon$0024.$m_sjs_js_ArrayOpsCommon$();
  var items$proxy5 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().c(new ($j_java$002elang$002e$002dObject.$d_T.r().C)(["color"]));
  var $x_15 = $j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy5);
  var items$proxy6 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().c(new ($j_java$002elang$002e$002dObject.$d_T.r().C)([]));
  var $x_14 = $x_16.d([...$x_15], [...$j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy6)]);
  var $x_13 = $j_scala$002escalajs$002ejs$002e$002dArray$002dOps$002dCommon$0024.$m_sjs_js_ArrayOpsCommon$();
  var items$proxy7 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().c(new ($j_java$002elang$002e$002dObject.$d_T.r().C)(["vec4<f32>"]));
  var $x_12 = $j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy7);
  var items$proxy8 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().c(new ($j_java$002elang$002e$002dObject.$d_T.r().C)([]));
  var $x_11 = $x_13.d([...$x_12], [...$j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy8)]);
  var $x_10 = $j_scala$002escalajs$002ejs$002e$002dArray$002dOps$002dCommon$0024.$m_sjs_js_ArrayOpsCommon$();
  var items$proxy9 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().c(new ($j_scala$002e$002dTuple3.$d_T3.r().C)([new $j_scala$002e$002dTuple3.$c_T3("position", "position", "vec4<f32>")]));
  var $x_9 = $j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy9);
  var items$proxy10 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().c(new ($j_scala$002e$002dTuple3.$d_T3.r().C)([]));
  var $x_8 = $j_gpu$002eshader$002ederive$0024.$p_Lgpu_shader_derive$__generateCombinedStructFromLists__T__sjs_js_Array__sjs_js_Array__sjs_js_Array__T($x_17, "VertexOutput", $x_14, $x_11, $x_10.d([...$x_9], [...$j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy10)]));
  var $x_7 = $j_gpu$002eshader$002ederive$0024.$m_Lgpu_shader_derive$();
  var $x_6 = $j_scala$002escalajs$002ejs$002e$002dArray$002dOps$002dCommon$0024.$m_sjs_js_ArrayOpsCommon$();
  var items$proxy11 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().c(new ($j_java$002elang$002e$002dObject.$d_T.r().C)(["color"]));
  var $x_5 = $j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy11);
  var items$proxy12 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().c(new ($j_java$002elang$002e$002dObject.$d_T.r().C)([]));
  var $x_4 = $x_6.d([...$x_5], [...$j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy12)]);
  var $x_3 = $j_scala$002escalajs$002ejs$002e$002dArray$002dOps$002dCommon$0024.$m_sjs_js_ArrayOpsCommon$();
  var items$proxy13 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().c(new ($j_java$002elang$002e$002dObject.$d_T.r().C)(["vec4<f32>"]));
  var $x_2 = $j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy13);
  var items$proxy14 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().c(new ($j_java$002elang$002e$002dObject.$d_T.r().C)([]));
  var $x_1 = $x_3.d([...$x_2], [...$j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy14)]);
  var items$proxy15 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().c(new ($j_scala$002e$002dTuple3.$d_T3.r().C)([]));
  var wgslCode = $j_gpu$002eshader$002e$002dShader$002dDef.$p_Lgpu_shader_ShaderDef__buildWGSL__T__T__T__T__T__T__T(triangleShader, $x_18, $x_8, $j_gpu$002eshader$002ederive$0024.$p_Lgpu_shader_derive$__generateCombinedStructFromLists__T__sjs_js_Array__sjs_js_Array__sjs_js_Array__T($x_7, "FragmentOutput", $x_4, $x_1, [...$j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy15)]), "", triangleShader.Z, triangleShader.Y);
  console.log(("Generated WGSL:\n" + wgslCode));
  var shaderModule = device.createShaderModule(({
    "code": wgslCode
  }));
  var context = $j_webgpu$002e$002dWeb$002dG$002dP$002dU$0024.$m_Lwebgpu_WebGPU$().aW(canvas);
  context.configure(({
    "device": device,
    "format": "bgra8unorm"
  }));
  var _2 = ({
    "module": shaderModule,
    "entryPoint": "vs_main"
  });
  var items$proxy16 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().L(new ($j_scala$002escalajs$002ejs$002e$002dObject.$d_sjs_js_Object.r().C)([({
    "format": "bgra8unorm"
  })]));
  var _2$1 = [...$j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy16)];
  var _2$2 = ({
    "module": shaderModule,
    "entryPoint": "fs_main",
    "targets": _2$1
  });
  var _2$3 = ({
    "topology": "triangle-list"
  });
  var $x_24 = device.createRenderPipeline(({
    "layout": "auto",
    "vertex": _2,
    "fragment": _2$2,
    "primitive": _2$3
  }));
  $p_Lsimple\uff3ftriangle_SimpleTriangle$__render$1__Lwebgpu_GPUDevice__Lwebgpu_GPUCanvasContext__Lwebgpu_GPURenderPipeline__V(this, device, context, $x_24);
  setStatus.F("Triangle rendered successfully!", false);
});
var $d_Lsimple\uff3ftriangle_SimpleTriangle$ = new $j_java$002elang$002e$002dObject.$TypeData().i($c_Lsimple\uff3ftriangle_SimpleTriangle$, "simple_triangle.SimpleTriangle$", ({
  cf: 1
}));
export { $d_Lsimple\uff3ftriangle_SimpleTriangle$ as $d_Lsimple\uff3ftriangle_SimpleTriangle$ };
var $n_Lsimple\uff3ftriangle_SimpleTriangle$;
function $m_Lsimple\uff3ftriangle_SimpleTriangle$() {
  if ((!$n_Lsimple\uff3ftriangle_SimpleTriangle$)) {
    $n_Lsimple\uff3ftriangle_SimpleTriangle$ = new $c_Lsimple\uff3ftriangle_SimpleTriangle$();
  }
  return $n_Lsimple\uff3ftriangle_SimpleTriangle$;
}
export { $m_Lsimple\uff3ftriangle_SimpleTriangle$ as $m_Lsimple\uff3ftriangle_SimpleTriangle$ };
