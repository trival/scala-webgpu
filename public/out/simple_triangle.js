'use strict';
import * as $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee from "./internal-cad23071acfd2512298b5f90a8a6559377448aee.js";
var $p;
function $p_Lsimple\uff3ftriangle_SimpleTriangle$__setStatus$6__Lorg_scalajs_dom_HTMLElement__T__Z__V($thiz, statusEl$1, msg, isError) {
  statusEl$1.textContent = msg;
  statusEl$1.setAttribute("class", (isError ? "error" : "success"));
}
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
/** @constructor */
function $c_Lsimple\uff3ftriangle_SimpleTriangle$() {
}
$p = $c_Lsimple\uff3ftriangle_SimpleTriangle$.prototype = new $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$h_O();
$p.constructor = $c_Lsimple\uff3ftriangle_SimpleTriangle$;
/** @constructor */
function $h_Lsimple\uff3ftriangle_SimpleTriangle$() {
}
$h_Lsimple\uff3ftriangle_SimpleTriangle$.prototype = $p;
$p.a7 = (function() {
  var statusEl = document.getElementById("status");
  var canvas = document.getElementById("canvas");
  matchResult1: {
    var x = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_Lwebgpu_WebGPU$().as();
    var x1 = ((x === (void 0)) ? $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_s_None$() : new $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$c_s_Some(x));
    if (($j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_s_None$() === x1)) {
      $p_Lsimple\uff3ftriangle_SimpleTriangle$__setStatus$6__Lorg_scalajs_dom_HTMLElement__T__Z__V(this, statusEl, "WebGPU is not supported in this browser", true);
      break matchResult1;
    }
    if ((x1 instanceof $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$c_s_Some)) {
      var gpu = x1.E;
      $p_Lsimple\uff3ftriangle_SimpleTriangle$__setStatus$6__Lorg_scalajs_dom_HTMLElement__T__Z__V(this, statusEl, "WebGPU available, initializing...", false);
      this.a5(gpu, canvas, new $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$c_sr_AbstractFunction2_$$Lambda$286cbfc6187197affcadc8465aaec93d6b7d20dc(((v1$2, v2$2) => {
        $p_Lsimple\uff3ftriangle_SimpleTriangle$__setStatus$6__Lorg_scalajs_dom_HTMLElement__T__Z__V(this, statusEl, v1$2, (!(!v2$2)));
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
      setStatus.u("WebGPU initialized! Rendering triangle...", false);
      this.a8(device$3, canvas, setStatus);
    }));
    return promise$proxy2.then($j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sjs_js_Any$().X(f$proxy1));
  }));
  var result = promise$proxy3.then($j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sjs_js_Any$().X(f$proxy2));
  var pf$proxy1 = new $c_Lsimple\uff3ftriangle_SimpleTriangle$$anon$1(setStatus);
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
  var triangleShader = new $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$c_Lgpu_ShaderDef("\n  let positions = array<vec2<f32>, 3>(\n    vec2<f32>(0.0, 0.5),\n    vec2<f32>(-0.5, -0.5),\n    vec2<f32>(0.5, -0.5)\n  );\n  let colors = array<vec4<f32>, 3>(\n    vec4<f32>(1.0, 0.0, 0.0, 1.0),\n    vec4<f32>(0.0, 1.0, 0.0, 1.0),\n    vec4<f32>(0.0, 0.0, 1.0, 1.0)\n  );\n  let idx = in.vertexIndex;\n  out.position = vec4<f32>(positions[idx], 0.0, 1.0);\n  out.color = colors[idx];\n  ", "\n  out.color = in.color;\n  ");
  var wgslCode = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$p_Lgpu_ShaderDef__buildWGSL__T__T__T__T__T__T__T(triangleShader, $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$p_Lgpu_derive$__generateCombinedStructFromLists__T__sjs_js_Array__sjs_js_Array__sjs_js_Array__T($j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_Lgpu_derive$(), "VertexInput", [], [], $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sjs_js_ArrayOpsCommon$().e([new $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$c_T3("vertexIndex", "vertex_index", "u32")], [])), $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$p_Lgpu_derive$__generateCombinedStructFromLists__T__sjs_js_Array__sjs_js_Array__sjs_js_Array__T($j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_Lgpu_derive$(), "VertexOutput", $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sjs_js_ArrayOpsCommon$().e(["color"], []), $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sjs_js_ArrayOpsCommon$().e(["vec4<f32>"], []), $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sjs_js_ArrayOpsCommon$().e([new $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$c_T3("position", "position", "vec4<f32>")], [])), $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$p_Lgpu_derive$__generateCombinedStructFromLists__T__sjs_js_Array__sjs_js_Array__sjs_js_Array__T($j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_Lgpu_derive$(), "FragmentOutput", $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sjs_js_ArrayOpsCommon$().e(["color"], []), $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_sjs_js_ArrayOpsCommon$().e(["vec4<f32>"], []), []), "", triangleShader.L, triangleShader.K);
  console.log(("Generated WGSL:\n" + wgslCode));
  var shaderModule = device.createShaderModule(({
    "code": wgslCode
  }));
  var context = $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$m_Lwebgpu_WebGPU$().ar(canvas);
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
var $d_Lsimple\uff3ftriangle_SimpleTriangle$ = new $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$TypeData().i($c_Lsimple\uff3ftriangle_SimpleTriangle$, "simple_triangle.SimpleTriangle$", ({
  bb: 1
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
  this.a2 = null;
  this.a2 = setStatus$5;
}
$p = $c_Lsimple\uff3ftriangle_SimpleTriangle$$anon$1.prototype = new $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$h_sr_AbstractPartialFunction();
$p.constructor = $c_Lsimple\uff3ftriangle_SimpleTriangle$$anon$1;
/** @constructor */
function $h_Lsimple\uff3ftriangle_SimpleTriangle$$anon$1() {
}
$h_Lsimple\uff3ftriangle_SimpleTriangle$$anon$1.prototype = $p;
$p.a6 = (function(x) {
  return true;
});
$p.W = (function(x, default$1) {
  if ((x instanceof $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$c_ju_NoSuchElementException)) {
    this.a2.u(x.M, true);
  } else {
    this.a2.u(("WebGPU error: " + x), true);
  }
});
var $d_Lsimple\uff3ftriangle_SimpleTriangle$$anon$1 = new $j_internal$002dcad23071acfd2512298b5f90a8a6559377448aee.$TypeData().i($c_Lsimple\uff3ftriangle_SimpleTriangle$$anon$1, "simple_triangle.SimpleTriangle$$anon$1", ({
  bc: 1,
  U: 1,
  g: 1,
  l: 1,
  a: 1
}));
let $e_main = (function() {
  $m_Lsimple\uff3ftriangle_SimpleTriangle$().a7();
});
export { $e_main as main };
