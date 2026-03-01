'use strict';
import * as $j_internal$002d521d3ae75e61be21a6f0408ca972d8f2d0ec7d00 from "./internal-521d3ae75e61be21a6f0408ca972d8f2d0ec7d00.js";
import * as $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e from "./internal-ae9a4288cef3d3827cff28fde9c5ba209927925e.js";
import * as $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee from "./internal-cad23071acfd2512298b5f90a8a6559377448aee.js";
var $p;
function $p_Lsimple\uff3ftriangle_SimpleTriangle$__setStatus$6__Lorg_scalajs_dom_HTMLElement__T__Z__V($thiz, statusEl$1, msg, isError) {
  statusEl$1.textContent = msg;
  statusEl$1.setAttribute("class", (isError ? "error" : "success"));
}
function $p_Lsimple\uff3ftriangle_SimpleTriangle$__render$1__Lwebgpu_GPUDevice__Lwebgpu_GPUCanvasContext__Lwebgpu_GPURenderPipeline__V($thiz, device$1, context$1, pipeline$1) {
  var commandEncoder = device$1.createCommandEncoder();
  var textureView = context$1.getCurrentTexture().createView();
  var $x_1 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sr_ScalaRunTime$();
  var _2 = ({
    "r": 0.1,
    "g": 0.1,
    "b": 0.15,
    "a": 1.0
  });
  var items$proxy17 = $x_1.bu(new ($j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$d_sjs_js_Object.r().C)([({
    "view": textureView,
    "loadOp": "clear",
    "storeOp": "store",
    "clearValue": _2
  })]));
  var _2$1 = [...$j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sjsr_Compat$().b(items$proxy17)];
  var renderPass = commandEncoder.beginRenderPass(({
    "colorAttachments": _2$1
  }));
  renderPass.setPipeline(pipeline$1);
  renderPass.draw(3);
  renderPass.end();
  var $x_2 = device$1.queue;
  var items$proxy18 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sr_ScalaRunTime$().d(new ($j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$d_Lwebgpu_GPUCommandBuffer.r().C)([commandEncoder.finish()]));
  $x_2.submit([...$j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sjsr_Compat$().b(items$proxy18)]);
}
/** @constructor */
function $c_Lsimple\uff3ftriangle_SimpleTriangle$() {
}
$p = $c_Lsimple\uff3ftriangle_SimpleTriangle$.prototype = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$h_O();
$p.constructor = $c_Lsimple\uff3ftriangle_SimpleTriangle$;
/** @constructor */
function $h_Lsimple\uff3ftriangle_SimpleTriangle$() {
}
$h_Lsimple\uff3ftriangle_SimpleTriangle$.prototype = $p;
$p.ct = (function() {
  var statusEl = document.getElementById("status");
  var canvas = document.getElementById("canvas");
  matchResult1: {
    var x = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_Lwebgpu_WebGPU$().dK();
    var x1 = ((x === (void 0)) ? $j_internal$002d521d3ae75e61be21a6f0408ca972d8f2d0ec7d00.$m_s_None$() : new $j_internal$002d521d3ae75e61be21a6f0408ca972d8f2d0ec7d00.$c_s_Some(x));
    if (($j_internal$002d521d3ae75e61be21a6f0408ca972d8f2d0ec7d00.$m_s_None$() === x1)) {
      $p_Lsimple\uff3ftriangle_SimpleTriangle$__setStatus$6__Lorg_scalajs_dom_HTMLElement__T__Z__V(this, statusEl, "WebGPU is not supported in this browser", true);
      break matchResult1;
    }
    if ((x1 instanceof $j_internal$002d521d3ae75e61be21a6f0408ca972d8f2d0ec7d00.$c_s_Some)) {
      var gpu = x1.b0;
      $p_Lsimple\uff3ftriangle_SimpleTriangle$__setStatus$6__Lorg_scalajs_dom_HTMLElement__T__Z__V(this, statusEl, "WebGPU available, initializing...", false);
      this.dM(gpu, canvas, new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$c_sr_AbstractFunction2_$$Lambda$286cbfc6187197affcadc8465aaec93d6b7d20dc(((v1$2, v2$2) => {
        $p_Lsimple\uff3ftriangle_SimpleTriangle$__setStatus$6__Lorg_scalajs_dom_HTMLElement__T__Z__V(this, statusEl, v1$2, (!(!v2$2)));
      })));
      break matchResult1;
    }
    throw new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$c_s_MatchError(x1);
  }
});
$p.dM = (function(gpu, canvas, setStatus) {
  var promise$proxy1 = gpu.requestAdapter();
  var promise$proxy3 = promise$proxy1.then(((value$2) => {
    if ((value$2 === null)) {
      throw new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$c_ju_NoSuchElementException("Failed to get WebGPU adapter");
    } else {
      return value$2;
    }
  }));
  var f$proxy2 = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28(((adapter$2) => {
    var promise$proxy2 = adapter$2.requestDevice();
    var f$proxy1 = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28(((device$3) => {
      setStatus.aF("WebGPU initialized! Rendering triangle...", false);
      this.dP(device$3, canvas, setStatus);
    }));
    return promise$proxy2.then($j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sjs_js_Any$().bQ(f$proxy1));
  }));
  var result = promise$proxy3.then($j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sjs_js_Any$().bQ(f$proxy2));
  var pf$proxy1 = new $c_Lsimple\uff3ftriangle_SimpleTriangle$$anon$1(setStatus);
  result.catch(((err$2) => {
    if (pf$proxy1.dN(err$2)) {
      return pf$proxy1.cX(err$2, $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_s_PartialFunction$().cH);
    } else {
      var $x_1 = err$2;
      throw (($x_1 instanceof $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$c_sjs_js_JavaScriptException) ? $x_1.bb : $x_1);
    }
  }));
});
$p.dP = (function(device, canvas, setStatus) {
  var triangleShader = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$c_Lgpu_shader_ShaderDef($j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sc_StringOps$().bV("\n        |  let positions = array<vec2<f32>, 3>(\n        |    vec2<f32>(0.0, 0.5),\n        |    vec2<f32>(-0.5, -0.5),\n        |    vec2<f32>(0.5, -0.5)\n        |  );\n        |  let colors = array<vec4<f32>, 3>(\n        |    vec4<f32>(1.0, 0.0, 0.0, 1.0),\n        |    vec4<f32>(0.0, 1.0, 0.0, 1.0),\n        |    vec4<f32>(0.0, 0.0, 1.0, 1.0)\n        |  );\n        |  let idx = in.vertexIndex;\n        |  out.position = vec4<f32>(positions[idx], 0.0, 1.0);\n        |  out.color = colors[idx];\n        ", 124), $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sc_StringOps$().bV("\n        |  out.color = in.color;\n        ", 124));
  var $x_23 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_Lgpu_shader_derive$();
  var items$proxy1 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sr_ScalaRunTime$().d(new ($j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$d_T.r().C)([]));
  var $x_22 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sjsr_Compat$().b(items$proxy1);
  var items$proxy2 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sr_ScalaRunTime$().d(new ($j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$d_T.r().C)([]));
  var $x_21 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sjsr_Compat$().b(items$proxy2);
  var $x_20 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sjs_js_ArrayOpsCommon$();
  var items$proxy3 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sr_ScalaRunTime$().d(new ($j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$d_T3.r().C)([new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$c_T3("vertexIndex", "vertex_index", "u32")]));
  var $x_19 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sjsr_Compat$().b(items$proxy3);
  var items$proxy4 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sr_ScalaRunTime$().d(new ($j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$d_T3.r().C)([]));
  var $x_18 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$p_Lgpu_shader_derive$__generateCombinedStructFromLists__T__sjs_js_Array__sjs_js_Array__sjs_js_Array__T($x_23, "VertexInput", [...$x_22], [...$x_21], $x_20.q([...$x_19], [...$j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sjsr_Compat$().b(items$proxy4)]));
  var $x_17 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_Lgpu_shader_derive$();
  var $x_16 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sjs_js_ArrayOpsCommon$();
  var items$proxy5 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sr_ScalaRunTime$().d(new ($j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$d_T.r().C)(["color"]));
  var $x_15 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sjsr_Compat$().b(items$proxy5);
  var items$proxy6 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sr_ScalaRunTime$().d(new ($j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$d_T.r().C)([]));
  var $x_14 = $x_16.q([...$x_15], [...$j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sjsr_Compat$().b(items$proxy6)]);
  var $x_13 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sjs_js_ArrayOpsCommon$();
  var items$proxy7 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sr_ScalaRunTime$().d(new ($j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$d_T.r().C)(["vec4<f32>"]));
  var $x_12 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sjsr_Compat$().b(items$proxy7);
  var items$proxy8 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sr_ScalaRunTime$().d(new ($j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$d_T.r().C)([]));
  var $x_11 = $x_13.q([...$x_12], [...$j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sjsr_Compat$().b(items$proxy8)]);
  var $x_10 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sjs_js_ArrayOpsCommon$();
  var items$proxy9 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sr_ScalaRunTime$().d(new ($j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$d_T3.r().C)([new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$c_T3("position", "position", "vec4<f32>")]));
  var $x_9 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sjsr_Compat$().b(items$proxy9);
  var items$proxy10 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sr_ScalaRunTime$().d(new ($j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$d_T3.r().C)([]));
  var $x_8 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$p_Lgpu_shader_derive$__generateCombinedStructFromLists__T__sjs_js_Array__sjs_js_Array__sjs_js_Array__T($x_17, "VertexOutput", $x_14, $x_11, $x_10.q([...$x_9], [...$j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sjsr_Compat$().b(items$proxy10)]));
  var $x_7 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_Lgpu_shader_derive$();
  var $x_6 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sjs_js_ArrayOpsCommon$();
  var items$proxy11 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sr_ScalaRunTime$().d(new ($j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$d_T.r().C)(["color"]));
  var $x_5 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sjsr_Compat$().b(items$proxy11);
  var items$proxy12 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sr_ScalaRunTime$().d(new ($j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$d_T.r().C)([]));
  var $x_4 = $x_6.q([...$x_5], [...$j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sjsr_Compat$().b(items$proxy12)]);
  var $x_3 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sjs_js_ArrayOpsCommon$();
  var items$proxy13 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sr_ScalaRunTime$().d(new ($j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$d_T.r().C)(["vec4<f32>"]));
  var $x_2 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sjsr_Compat$().b(items$proxy13);
  var items$proxy14 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sr_ScalaRunTime$().d(new ($j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$d_T.r().C)([]));
  var $x_1 = $x_3.q([...$x_2], [...$j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sjsr_Compat$().b(items$proxy14)]);
  var items$proxy15 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sr_ScalaRunTime$().d(new ($j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$d_T3.r().C)([]));
  var wgslCode = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$p_Lgpu_shader_ShaderDef__buildWGSL__T__T__T__T__T__T__T(triangleShader, $x_18, $x_8, $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$p_Lgpu_shader_derive$__generateCombinedStructFromLists__T__sjs_js_Array__sjs_js_Array__sjs_js_Array__T($x_7, "FragmentOutput", $x_4, $x_1, [...$j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sjsr_Compat$().b(items$proxy15)]), "", triangleShader.bj, triangleShader.bi);
  console.log(("Generated WGSL:\n" + wgslCode));
  var shaderModule = device.createShaderModule(({
    "code": wgslCode
  }));
  var context = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_Lwebgpu_WebGPU$().dJ(canvas);
  context.configure(({
    "device": device,
    "format": "bgra8unorm"
  }));
  var _2 = ({
    "module": shaderModule,
    "entryPoint": "vs_main"
  });
  var items$proxy16 = $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sr_ScalaRunTime$().bu(new ($j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$d_sjs_js_Object.r().C)([({
    "format": "bgra8unorm"
  })]));
  var _2$1 = [...$j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sjsr_Compat$().b(items$proxy16)];
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
  setStatus.aF("Triangle rendered successfully!", false);
});
var $d_Lsimple\uff3ftriangle_SimpleTriangle$ = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$TypeData().i($c_Lsimple\uff3ftriangle_SimpleTriangle$, "simple_triangle.SimpleTriangle$", ({
  fu: 1
}));
var $n_Lsimple\uff3ftriangle_SimpleTriangle$;
function $m_Lsimple\uff3ftriangle_SimpleTriangle$() {
  if ((!$n_Lsimple\uff3ftriangle_SimpleTriangle$)) {
    $n_Lsimple\uff3ftriangle_SimpleTriangle$ = new $c_Lsimple\uff3ftriangle_SimpleTriangle$();
  }
  return $n_Lsimple\uff3ftriangle_SimpleTriangle$;
}
/** @constructor */
function $c_Lsimple\uff3ftriangle_SimpleTriangle$$anon$1(setStatus$5) {
  this.du = null;
  this.du = setStatus$5;
}
$p = $c_Lsimple\uff3ftriangle_SimpleTriangle$$anon$1.prototype = new $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$h_sr_AbstractPartialFunction();
$p.constructor = $c_Lsimple\uff3ftriangle_SimpleTriangle$$anon$1;
/** @constructor */
function $h_Lsimple\uff3ftriangle_SimpleTriangle$$anon$1() {
}
$h_Lsimple\uff3ftriangle_SimpleTriangle$$anon$1.prototype = $p;
$p.dN = (function(x) {
  return ((x instanceof $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$c_ju_NoSuchElementException) || true);
});
$p.cX = (function(x, default$1) {
  if ((x instanceof $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$c_ju_NoSuchElementException)) {
    this.du.aF(x.cF, true);
  } else {
    this.du.aF(("WebGPU error: " + x), true);
  }
});
var $d_Lsimple\uff3ftriangle_SimpleTriangle$$anon$1 = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$TypeData().i($c_Lsimple\uff3ftriangle_SimpleTriangle$$anon$1, "simple_triangle.SimpleTriangle$$anon$1", ({
  fv: 1,
  bF: 1,
  j: 1,
  k: 1,
  a: 1
}));
let $e_main = (function() {
  $m_Lsimple\uff3ftriangle_SimpleTriangle$().ct();
});
export { $e_main as main };
