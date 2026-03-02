'use strict';
import * as $j_gpu$002ebuffers$002e$002dAttrib$002dLayout$002dHelper$0024 from "./gpu.buffers.-Attrib-Layout-Helper$.js";
import * as $j_gpu$002emath$002epackage$0024package$0024 from "./gpu.math.package$package$.js";
import * as $j_gpu$002epainter$002e$002dForm from "./gpu.painter.-Form.js";
import * as $j_gpu$002epainter$002e$002dShade from "./gpu.painter.-Shade.js";
import * as $j_gpu$002epainter$002e$002dShape from "./gpu.painter.-Shape.js";
import * as $j_gpu$002epainter$002e$002dShape$0024 from "./gpu.painter.-Shape$.js";
import * as $j_gpu$002epainter$002einit$0024package$0024 from "./gpu.painter.init$package$.js";
import * as $j_gpu$002eshader$002e$002dShader$002dDef from "./gpu.shader.-Shader-Def.js";
import * as $j_gpu$002eshader$002ederive$0024 from "./gpu.shader.derive$.js";
import * as $j_gpu$002eshader$002elayouts$0024 from "./gpu.shader.layouts$.js";
import * as $j_java$002elang$002e$002dObject from "./java.lang.-Object.js";
import * as $j_scala$002e$002dTuple3 from "./scala.-Tuple3.js";
import * as $j_scala$002e$002dTuple4 from "./scala.-Tuple4.js";
import * as $j_scala$002ecollection$002e$002dString$002dOps$0024 from "./scala.collection.-String-Ops$.js";
import * as $j_scala$002eruntime$002e$002dAbstract$002dFunction1$002e$0024$0024$002dLambda$002470e1780b84463d18653aacefee3ab989ac625f28 from "./scala.runtime.-Abstract-Function1.$$-Lambda$70e1780b84463d18653aacefee3ab989ac625f28.js";
import * as $j_scala$002escalajs$002ejs$002e$002dArray$002dOps$002dCommon$0024 from "./scala.scalajs.js.-Array-Ops-Common$.js";
import * as $j_scala$002escalajs$002ejs$002e$002dDynamic from "./scala.scalajs.js.-Dynamic.js";
import * as $j_scala$002escalajs$002eruntime$002e$002dCompat$0024 from "./scala.scalajs.runtime.-Compat$.js";
import * as $j_trivalibs$002eutils$002ejs$002ejs$0024package$0024$002dOpt$0024 from "./trivalibs.utils.js.js$package$-Opt$.js";
import * as $j_webgpu$002e$002dG$002dP$002dU$002dBind$002dGroup$002dLayout from "./webgpu.-G-P-U-Bind-Group-Layout.js";
var $p;
/** @constructor */
function $c_Lpainter\uff3ftriangle_PainterTriangle$package$() {
}
export { $c_Lpainter\uff3ftriangle_PainterTriangle$package$ as $c_Lpainter\uff3ftriangle_PainterTriangle$package$ };
$p = $c_Lpainter\uff3ftriangle_PainterTriangle$package$.prototype = new $j_java$002elang$002e$002dObject.$h_O();
$p.constructor = $c_Lpainter\uff3ftriangle_PainterTriangle$package$;
/** @constructor */
function $h_Lpainter\uff3ftriangle_PainterTriangle$package$() {
}
export { $h_Lpainter\uff3ftriangle_PainterTriangle$package$ as $h_Lpainter\uff3ftriangle_PainterTriangle$package$ };
$h_Lpainter\uff3ftriangle_PainterTriangle$package$.prototype = $p;
$p.ag = (function() {
  $j_gpu$002epainter$002einit$0024package$0024.$m_Lgpu_painter_init$package$().c9(document.getElementById("canvas"), new $j_scala$002eruntime$002e$002dAbstract$002dFunction1$002e$0024$0024$002dLambda$002470e1780b84463d18653aacefee3ab989ac625f28.$c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28(((statusEl) => ((painter$3) => {
    var vertBody$proxy1 = $j_scala$002ecollection$002e$002dString$002dOps$0024.$m_sc_StringOps$().W("\n        |  out.position = vec4<f32>(in.position, 0.0, 1.0);\n        |  out.color = in.color;\n        ", 124);
    var fragBody$proxy1 = $j_scala$002ecollection$002e$002dString$002dOps$0024.$m_sc_StringOps$().W("\n        |  out.color = vec4<f32>(in.color, 1.0);\n        ", 124);
    var id = painter$3.aj;
    painter$3.aj = ((1 + painter$3.aj) | 0);
    var sd = new $j_gpu$002eshader$002e$002dShader$002dDef.$c_Lgpu_shader_ShaderDef(vertBody$proxy1, fragBody$proxy1);
    var $x_29 = $j_gpu$002eshader$002ederive$0024.$m_Lgpu_shader_derive$();
    var $x_28 = $j_scala$002escalajs$002ejs$002e$002dArray$002dOps$002dCommon$0024.$m_sjs_js_ArrayOpsCommon$();
    var items$proxy1 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().c(new ($j_java$002elang$002e$002dObject.$d_T.r().C)(["position"]));
    var $x_27 = $j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy1);
    var $x_26 = $j_scala$002escalajs$002ejs$002e$002dArray$002dOps$002dCommon$0024.$m_sjs_js_ArrayOpsCommon$();
    var items$proxy2 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().c(new ($j_java$002elang$002e$002dObject.$d_T.r().C)(["color"]));
    var $x_25 = $j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy2);
    var items$proxy3 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().c(new ($j_java$002elang$002e$002dObject.$d_T.r().C)([]));
    var $x_24 = $x_28.d([...$x_27], $x_26.d([...$x_25], [...$j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy3)]));
    var $x_23 = $j_scala$002escalajs$002ejs$002e$002dArray$002dOps$002dCommon$0024.$m_sjs_js_ArrayOpsCommon$();
    var items$proxy4 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().c(new ($j_java$002elang$002e$002dObject.$d_T.r().C)(["vec2<f32>"]));
    var $x_22 = $j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy4);
    var $x_21 = $j_scala$002escalajs$002ejs$002e$002dArray$002dOps$002dCommon$0024.$m_sjs_js_ArrayOpsCommon$();
    var items$proxy5 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().c(new ($j_java$002elang$002e$002dObject.$d_T.r().C)(["vec3<f32>"]));
    var $x_20 = $j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy5);
    var items$proxy6 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().c(new ($j_java$002elang$002e$002dObject.$d_T.r().C)([]));
    var $x_19 = $x_23.d([...$x_22], $x_21.d([...$x_20], [...$j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy6)]));
    var items$proxy7 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().c(new ($j_scala$002e$002dTuple3.$d_T3.r().C)([]));
    var $x_18 = $j_gpu$002eshader$002ederive$0024.$p_Lgpu_shader_derive$__generateCombinedStructFromLists__T__sjs_js_Array__sjs_js_Array__sjs_js_Array__T($x_29, "VertexInput", $x_24, $x_19, [...$j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy7)]);
    var $x_17 = $j_gpu$002eshader$002ederive$0024.$m_Lgpu_shader_derive$();
    var $x_16 = $j_scala$002escalajs$002ejs$002e$002dArray$002dOps$002dCommon$0024.$m_sjs_js_ArrayOpsCommon$();
    var items$proxy8 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().c(new ($j_java$002elang$002e$002dObject.$d_T.r().C)(["color"]));
    var $x_15 = $j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy8);
    var items$proxy9 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().c(new ($j_java$002elang$002e$002dObject.$d_T.r().C)([]));
    var $x_14 = $x_16.d([...$x_15], [...$j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy9)]);
    var $x_13 = $j_scala$002escalajs$002ejs$002e$002dArray$002dOps$002dCommon$0024.$m_sjs_js_ArrayOpsCommon$();
    var items$proxy10 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().c(new ($j_java$002elang$002e$002dObject.$d_T.r().C)(["vec3<f32>"]));
    var $x_12 = $j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy10);
    var items$proxy11 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().c(new ($j_java$002elang$002e$002dObject.$d_T.r().C)([]));
    var $x_11 = $x_13.d([...$x_12], [...$j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy11)]);
    var $x_10 = $j_scala$002escalajs$002ejs$002e$002dArray$002dOps$002dCommon$0024.$m_sjs_js_ArrayOpsCommon$();
    var items$proxy12 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().c(new ($j_scala$002e$002dTuple3.$d_T3.r().C)([new $j_scala$002e$002dTuple3.$c_T3("position", "position", "vec4<f32>")]));
    var $x_9 = $j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy12);
    var items$proxy13 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().c(new ($j_scala$002e$002dTuple3.$d_T3.r().C)([]));
    var $x_8 = $j_gpu$002eshader$002ederive$0024.$p_Lgpu_shader_derive$__generateCombinedStructFromLists__T__sjs_js_Array__sjs_js_Array__sjs_js_Array__T($x_17, "VertexOutput", $x_14, $x_11, $x_10.d([...$x_9], [...$j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy13)]));
    var $x_7 = $j_gpu$002eshader$002ederive$0024.$m_Lgpu_shader_derive$();
    var $x_6 = $j_scala$002escalajs$002ejs$002e$002dArray$002dOps$002dCommon$0024.$m_sjs_js_ArrayOpsCommon$();
    var items$proxy14 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().c(new ($j_java$002elang$002e$002dObject.$d_T.r().C)(["color"]));
    var $x_5 = $j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy14);
    var items$proxy15 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().c(new ($j_java$002elang$002e$002dObject.$d_T.r().C)([]));
    var $x_4 = $x_6.d([...$x_5], [...$j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy15)]);
    var $x_3 = $j_scala$002escalajs$002ejs$002e$002dArray$002dOps$002dCommon$0024.$m_sjs_js_ArrayOpsCommon$();
    var items$proxy16 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().c(new ($j_java$002elang$002e$002dObject.$d_T.r().C)(["vec4<f32>"]));
    var $x_2 = $j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy16);
    var items$proxy17 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().c(new ($j_java$002elang$002e$002dObject.$d_T.r().C)([]));
    var $x_1 = $x_3.d([...$x_2], [...$j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy17)]);
    var items$proxy18 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().c(new ($j_scala$002e$002dTuple3.$d_T3.r().C)([]));
    var wgsl = $j_gpu$002eshader$002e$002dShader$002dDef.$p_Lgpu_shader_ShaderDef__buildWGSL__T__T__T__T__T__T__T(sd, $x_18, $x_8, $j_gpu$002eshader$002ederive$0024.$p_Lgpu_shader_derive$__generateCombinedStructFromLists__T__sjs_js_Array__sjs_js_Array__sjs_js_Array__T($x_7, "FragmentOutput", $x_4, $x_1, [...$j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy18)]), "", sd.Z, sd.Y);
    var $x_41 = painter$3.H.createShaderModule(({
      "code": wgsl
    }));
    var $x_35 = $j_scala$002escalajs$002ejs$002e$002dArray$002dOps$002dCommon$0024.$m_sjs_js_ArrayOpsCommon$();
    var items$proxy19 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().c(new ($j_java$002elang$002e$002dObject.$d_T.r().C)(["float32x2"]));
    var $x_34 = $j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy19);
    var $x_33 = $j_scala$002escalajs$002ejs$002e$002dArray$002dOps$002dCommon$0024.$m_sjs_js_ArrayOpsCommon$();
    var items$proxy20 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().c(new ($j_java$002elang$002e$002dObject.$d_T.r().C)(["float32x3"]));
    var $x_32 = $j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy20);
    var items$proxy21 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().c(new ($j_java$002elang$002e$002dObject.$d_T.r().C)([]));
    var formats = $x_35.d([...$x_34], $x_33.d([...$x_32], [...$j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy21)]));
    var $x_39 = $j_scala$002escalajs$002ejs$002e$002dArray$002dOps$002dCommon$0024.$m_sjs_js_ArrayOpsCommon$();
    var items$proxy22 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().O(new $j_java$002elang$002e$002dObject.$ac_I(new Int32Array([8])));
    var $x_38 = $j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy22);
    var $x_37 = $j_scala$002escalajs$002ejs$002e$002dArray$002dOps$002dCommon$0024.$m_sjs_js_ArrayOpsCommon$();
    var items$proxy23 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().O(new $j_java$002elang$002e$002dObject.$ac_I(new Int32Array([12])));
    var $x_36 = $j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy23);
    var items$proxy24 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().O(new $j_java$002elang$002e$002dObject.$ac_I(new Int32Array([])));
    var sizes = $x_39.d([...$x_38], $x_37.d([...$x_36], [...$j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy24)]));
    var offsets = $j_gpu$002eshader$002elayouts$0024.$p_Lgpu_shader_layouts$__calculateOffsets__sjs_js_Array__sjs_js_Array($j_gpu$002eshader$002elayouts$0024.$m_Lgpu_shader_layouts$(), sizes);
    var stride = $j_gpu$002eshader$002elayouts$0024.$p_Lgpu_shader_layouts$__calculateStride__sjs_js_Array__I($j_gpu$002eshader$002elayouts$0024.$m_Lgpu_shader_layouts$(), sizes);
    var items$proxy25 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().c(new ($j_scala$002escalajs$002ejs$002e$002dDynamic.$d_sjs_js_Dynamic.r().C)([]));
    var attributes = [...$j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy25)];
    var end = (formats.length | 0);
    var isEmpty = (end <= 0);
    var scala$collection$immutable$Range$$lastElement = ((end - 1) | 0);
    if ((!isEmpty)) {
      var i = 0;
      while (true) {
        var x0 = i;
        var value = (offsets[x0] | 0);
        var s = formats[x0];
        var $x_40 = attributes.push(({
          "shaderLocation": x0,
          "offset": value,
          "format": s
        }));
        if ((i === scala$collection$immutable$Range$$lastElement)) {
          break;
        }
        i = ((1 + i) | 0);
      }
    }
    var $x_31 = $j_gpu$002eshader$002elayouts$0024.$m_Lgpu_shader_layouts$();
    var $x_30 = painter$3.H;
    var items$proxy26 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().c(new ($j_webgpu$002e$002dG$002dP$002dU$002dBind$002dGroup$002dLayout.$d_Lwebgpu_GPUBindGroupLayout.r().C)([]));
    var shade = new $j_gpu$002epainter$002e$002dShade.$c_Lgpu_painter_Shade(id, $x_41, ({
      "arrayStride": stride,
      "attributes": attributes
    }), null, $x_31.bM($x_30, [...$j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy26)]), false);
    $j_gpu$002ebuffers$002e$002dAttrib$002dLayout$002dHelper$0024.$m_Lgpu_buffers_AttribLayoutHelper$().bQ();
    var buffer = new ArrayBuffer(60);
    var _1 = new DataView(buffer);
    var value$proxy1 = $j_gpu$002emath$002epackage$0024package$0024.$m_Lgpu_math_package$package$().g().f(0.0);
    _1.setFloat32(0, value$proxy1, true);
    var value$proxy2 = $j_gpu$002emath$002epackage$0024package$0024.$m_Lgpu_math_package$package$().g().f(0.5);
    _1.setFloat32(4, value$proxy2, true);
    var value$proxy3 = $j_gpu$002emath$002epackage$0024package$0024.$m_Lgpu_math_package$package$().g().f(1.0);
    _1.setFloat32(8, value$proxy3, true);
    var value$proxy4 = $j_gpu$002emath$002epackage$0024package$0024.$m_Lgpu_math_package$package$().g().f(0.0);
    _1.setFloat32(12, value$proxy4, true);
    var value$proxy5 = $j_gpu$002emath$002epackage$0024package$0024.$m_Lgpu_math_package$package$().g().f(0.0);
    _1.setFloat32(16, value$proxy5, true);
    var value$proxy6 = $j_gpu$002emath$002epackage$0024package$0024.$m_Lgpu_math_package$package$().g().f((-0.5));
    _1.setFloat32(20, value$proxy6, true);
    var value$proxy7 = $j_gpu$002emath$002epackage$0024package$0024.$m_Lgpu_math_package$package$().g().f((-0.5));
    _1.setFloat32(24, value$proxy7, true);
    var value$proxy8 = $j_gpu$002emath$002epackage$0024package$0024.$m_Lgpu_math_package$package$().g().f(0.0);
    _1.setFloat32(28, value$proxy8, true);
    var value$proxy9 = $j_gpu$002emath$002epackage$0024package$0024.$m_Lgpu_math_package$package$().g().f(1.0);
    _1.setFloat32(32, value$proxy9, true);
    var value$proxy10 = $j_gpu$002emath$002epackage$0024package$0024.$m_Lgpu_math_package$package$().g().f(0.0);
    _1.setFloat32(36, value$proxy10, true);
    var value$proxy11 = $j_gpu$002emath$002epackage$0024package$0024.$m_Lgpu_math_package$package$().g().f(0.5);
    _1.setFloat32(40, value$proxy11, true);
    var value$proxy12 = $j_gpu$002emath$002epackage$0024package$0024.$m_Lgpu_math_package$package$().g().f((-0.5));
    _1.setFloat32(44, value$proxy12, true);
    var value$proxy13 = $j_gpu$002emath$002epackage$0024package$0024.$m_Lgpu_math_package$package$().g().f(0.0);
    _1.setFloat32(48, value$proxy13, true);
    var value$proxy14 = $j_gpu$002emath$002epackage$0024package$0024.$m_Lgpu_math_package$package$().g().f(0.0);
    _1.setFloat32(52, value$proxy14, true);
    var value$proxy15 = $j_gpu$002emath$002epackage$0024package$0024.$m_Lgpu_math_package$package$().g().f(1.0);
    _1.setFloat32(56, value$proxy15, true);
    var $x_42 = painter$3.H;
    var value$1 = (_1.buffer.byteLength | 0);
    var buffer$1 = $x_42.createBuffer(({
      "size": value$1,
      "usage": 40
    }));
    painter$3.aO.writeBuffer(buffer$1, 0.0, _1.buffer);
    var form = new $j_gpu$002epainter$002e$002dForm.$c_Lgpu_painter_Form(buffer$1, 3, "triangle-list", "ccw");
    var shape = new $j_gpu$002epainter$002e$002dShape.$c_Lgpu_painter_Shape(form, shade, $j_gpu$002epainter$002e$002dShape$0024.$m_Lgpu_painter_Shape$().bX(), "none", ($j_trivalibs$002eutils$002ejs$002ejs$0024package$0024$002dOpt$0024.$m_Ltrivalibs_utils_js_js$package$Opt$(), (void 0)));
    painter$3.c3(shape, new $j_scala$002e$002dTuple4.$c_T4(0.1, 0.1, 0.1, 1.0));
    statusEl.textContent = "Painter triangle rendered!";
    statusEl.setAttribute("class", "success");
  }))(document.getElementById("status"))));
});
var $d_Lpainter\uff3ftriangle_PainterTriangle$package$ = new $j_java$002elang$002e$002dObject.$TypeData().i($c_Lpainter\uff3ftriangle_PainterTriangle$package$, "painter_triangle.PainterTriangle$package$", ({
  aP: 1
}));
export { $d_Lpainter\uff3ftriangle_PainterTriangle$package$ as $d_Lpainter\uff3ftriangle_PainterTriangle$package$ };
var $n_Lpainter\uff3ftriangle_PainterTriangle$package$;
function $m_Lpainter\uff3ftriangle_PainterTriangle$package$() {
  if ((!$n_Lpainter\uff3ftriangle_PainterTriangle$package$)) {
    $n_Lpainter\uff3ftriangle_PainterTriangle$package$ = new $c_Lpainter\uff3ftriangle_PainterTriangle$package$();
  }
  return $n_Lpainter\uff3ftriangle_PainterTriangle$package$;
}
export { $m_Lpainter\uff3ftriangle_PainterTriangle$package$ as $m_Lpainter\uff3ftriangle_PainterTriangle$package$ };
