'use strict';
import * as $j_gpu$002e$002dShader$002dDef from "./gpu.-Shader-Def.js";
import * as $j_gpu$002ederive$0024 from "./gpu.derive$.js";
import * as $j_java$002elang$002e$002dObject from "./java.lang.-Object.js";
import * as $j_java$002eutil$002e$002dNo$002dSuch$002dElement$002dException from "./java.util.-No-Such-Element-Exception.js";
import * as $j_scala$002e$002dMatch$002dError from "./scala.-Match-Error.js";
import * as $j_scala$002e$002dNone$0024 from "./scala.-None$.js";
import * as $j_scala$002e$002dPartial$002dFunction$0024 from "./scala.-Partial-Function$.js";
import * as $j_scala$002e$002dSome from "./scala.-Some.js";
import * as $j_scala$002e$002dTuple3 from "./scala.-Tuple3.js";
import * as $j_scala$002eruntime$002e$002dAbstract$002dFunction1$002e$0024$0024$002dLambda$002470e1780b84463d18653aacefee3ab989ac625f28 from "./scala.runtime.-Abstract-Function1.$$-Lambda$70e1780b84463d18653aacefee3ab989ac625f28.js";
import * as $j_scala$002eruntime$002e$002dAbstract$002dFunction2$002e$0024$0024$002dLambda$0024286cbfc6187197affcadc8465aaec93d6b7d20dc from "./scala.runtime.-Abstract-Function2.$$-Lambda$286cbfc6187197affcadc8465aaec93d6b7d20dc.js";
import * as $j_scala$002escalajs$002ejs$002e$002dAny$0024 from "./scala.scalajs.js.-Any$.js";
import * as $j_scala$002escalajs$002ejs$002e$002dArray$002dOps$002dCommon$0024 from "./scala.scalajs.js.-Array-Ops-Common$.js";
import * as $j_simple$005ftriangle$002e$002dSimple$002dTriangle$0024$0024anon$00241 from "./simple_triangle.-Simple-Triangle$$anon$1.js";
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
  var _2 = ({
    "r": 0.1,
    "g": 0.1,
    "b": 0.15,
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
  renderPass.draw(3);
  renderPass.end();
  device$1.queue.submit([commandEncoder.finish()]);
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
$p.a7 = (function() {
  var statusEl = document.getElementById("status");
  var canvas = document.getElementById("canvas");
  matchResult1: {
    var x = $j_webgpu$002e$002dWeb$002dG$002dP$002dU$0024.$m_Lwebgpu_WebGPU$().as();
    var x1 = ((x === (void 0)) ? $j_scala$002e$002dNone$0024.$m_s_None$() : new $j_scala$002e$002dSome.$c_s_Some(x));
    if (($j_scala$002e$002dNone$0024.$m_s_None$() === x1)) {
      $p_Lsimple\uff3ftriangle_SimpleTriangle$__setStatus$6__Lorg_scalajs_dom_HTMLElement__T__Z__V(this, statusEl, "WebGPU is not supported in this browser", true);
      break matchResult1;
    }
    if ((x1 instanceof $j_scala$002e$002dSome.$c_s_Some)) {
      var gpu = x1.E;
      $p_Lsimple\uff3ftriangle_SimpleTriangle$__setStatus$6__Lorg_scalajs_dom_HTMLElement__T__Z__V(this, statusEl, "WebGPU available, initializing...", false);
      this.a5(gpu, canvas, new $j_scala$002eruntime$002e$002dAbstract$002dFunction2$002e$0024$0024$002dLambda$0024286cbfc6187197affcadc8465aaec93d6b7d20dc.$c_sr_AbstractFunction2_$$Lambda$286cbfc6187197affcadc8465aaec93d6b7d20dc(((v1$2, v2$2) => {
        $p_Lsimple\uff3ftriangle_SimpleTriangle$__setStatus$6__Lorg_scalajs_dom_HTMLElement__T__Z__V(this, statusEl, v1$2, (!(!v2$2)));
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
      setStatus.u("WebGPU initialized! Rendering triangle...", false);
      this.a8(device$3, canvas, setStatus);
    }));
    return promise$proxy2.then($j_scala$002escalajs$002ejs$002e$002dAny$0024.$m_sjs_js_Any$().X(f$proxy1));
  }));
  var result = promise$proxy3.then($j_scala$002escalajs$002ejs$002e$002dAny$0024.$m_sjs_js_Any$().X(f$proxy2));
  var pf$proxy1 = new $j_simple$005ftriangle$002e$002dSimple$002dTriangle$0024$0024anon$00241.$c_Lsimple\uff3ftriangle_SimpleTriangle$$anon$1(setStatus);
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
  var triangleShader = new $j_gpu$002e$002dShader$002dDef.$c_Lgpu_ShaderDef("\n  let positions = array<vec2<f32>, 3>(\n    vec2<f32>(0.0, 0.5),\n    vec2<f32>(-0.5, -0.5),\n    vec2<f32>(0.5, -0.5)\n  );\n  let colors = array<vec4<f32>, 3>(\n    vec4<f32>(1.0, 0.0, 0.0, 1.0),\n    vec4<f32>(0.0, 1.0, 0.0, 1.0),\n    vec4<f32>(0.0, 0.0, 1.0, 1.0)\n  );\n  let idx = in.vertexIndex;\n  out.position = vec4<f32>(positions[idx], 0.0, 1.0);\n  out.color = colors[idx];\n  ", "\n  out.color = in.color;\n  ");
  var wgslCode = $j_gpu$002e$002dShader$002dDef.$p_Lgpu_ShaderDef__buildWGSL__T__T__T__T__T__T__T(triangleShader, $j_gpu$002ederive$0024.$p_Lgpu_derive$__generateCombinedStructFromLists__T__sjs_js_Array__sjs_js_Array__sjs_js_Array__T($j_gpu$002ederive$0024.$m_Lgpu_derive$(), "VertexInput", [], [], $j_scala$002escalajs$002ejs$002e$002dArray$002dOps$002dCommon$0024.$m_sjs_js_ArrayOpsCommon$().e([new $j_scala$002e$002dTuple3.$c_T3("vertexIndex", "vertex_index", "u32")], [])), $j_gpu$002ederive$0024.$p_Lgpu_derive$__generateCombinedStructFromLists__T__sjs_js_Array__sjs_js_Array__sjs_js_Array__T($j_gpu$002ederive$0024.$m_Lgpu_derive$(), "VertexOutput", $j_scala$002escalajs$002ejs$002e$002dArray$002dOps$002dCommon$0024.$m_sjs_js_ArrayOpsCommon$().e(["color"], []), $j_scala$002escalajs$002ejs$002e$002dArray$002dOps$002dCommon$0024.$m_sjs_js_ArrayOpsCommon$().e(["vec4<f32>"], []), $j_scala$002escalajs$002ejs$002e$002dArray$002dOps$002dCommon$0024.$m_sjs_js_ArrayOpsCommon$().e([new $j_scala$002e$002dTuple3.$c_T3("position", "position", "vec4<f32>")], [])), $j_gpu$002ederive$0024.$p_Lgpu_derive$__generateCombinedStructFromLists__T__sjs_js_Array__sjs_js_Array__sjs_js_Array__T($j_gpu$002ederive$0024.$m_Lgpu_derive$(), "FragmentOutput", $j_scala$002escalajs$002ejs$002e$002dArray$002dOps$002dCommon$0024.$m_sjs_js_ArrayOpsCommon$().e(["color"], []), $j_scala$002escalajs$002ejs$002e$002dArray$002dOps$002dCommon$0024.$m_sjs_js_ArrayOpsCommon$().e(["vec4<f32>"], []), []), "", triangleShader.L, triangleShader.K);
  console.log(("Generated WGSL:\n" + wgslCode));
  var shaderModule = device.createShaderModule(({
    "code": wgslCode
  }));
  var context = $j_webgpu$002e$002dWeb$002dG$002dP$002dU$0024.$m_Lwebgpu_WebGPU$().ar(canvas);
  context.configure(({
    "device": device,
    "format": "bgra8unorm"
  }));
  var _2 = ({
    "module": shaderModule,
    "entryPoint": "vs_main"
  });
  var _2$1 = [({
    "format": "bgra8unorm"
  })];
  var _2$2 = ({
    "module": shaderModule,
    "entryPoint": "fs_main",
    "targets": _2$1
  });
  var _2$3 = ({
    "topology": "triangle-list"
  });
  var $x_1 = device.createRenderPipeline(({
    "layout": "auto",
    "vertex": _2,
    "fragment": _2$2,
    "primitive": _2$3
  }));
  $p_Lsimple\uff3ftriangle_SimpleTriangle$__render$1__Lwebgpu_GPUDevice__Lwebgpu_GPUCanvasContext__Lwebgpu_GPURenderPipeline__V(this, device, context, $x_1);
  setStatus.u("Triangle rendered successfully!", false);
});
var $d_Lsimple\uff3ftriangle_SimpleTriangle$ = new $j_java$002elang$002e$002dObject.$TypeData().i($c_Lsimple\uff3ftriangle_SimpleTriangle$, "simple_triangle.SimpleTriangle$", ({
  bb: 1
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
