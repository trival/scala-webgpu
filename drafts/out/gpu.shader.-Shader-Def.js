'use strict';
import * as $j_java$002elang$002e$002dObject from "./java.lang.-Object.js";
import * as $j_scala$002ecollection$002e$002dString$002dOps$0024 from "./scala.collection.-String-Ops$.js";
import * as $j_scala$002escalajs$002ejs$002e$002dWrapped$002dArray from "./scala.scalajs.js.-Wrapped-Array.js";
import * as $j_scala$002escalajs$002eruntime$002e$002dCompat$0024 from "./scala.scalajs.runtime.-Compat$.js";
var $p;
function $p_Lgpu_shader_ShaderDef__buildWGSL__T__T__T__T__T__T__T($thiz, vertexInputStruct, vertexOutputStruct, fragmentOutputStruct, uniformDecls, vertexBody, fragmentBody) {
  var items$proxy1 = $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().c(new ($j_java$002elang$002e$002dObject.$d_T.r().C)([vertexInputStruct, vertexOutputStruct, fragmentOutputStruct, uniformDecls, $p_Lgpu_shader_ShaderDef__buildVertexMain__T__T($thiz, vertexBody), $p_Lgpu_shader_ShaderDef__buildFragmentMain__T__T($thiz, fragmentBody)]));
  var array = [...$j_scala$002escalajs$002eruntime$002e$002dCompat$0024.$m_sjsr_Compat$().b(items$proxy1)];
  var res = [];
  var len = (array.length | 0);
  var i = 0;
  while ((i < len)) {
    var x0 = array[i];
    if (($j_scala$002ecollection$002e$002dString$002dOps$0024.$m_sc_StringOps$(), (x0 !== ""))) {
      (res.push(x0) | 0);
    }
    i = ((1 + i) | 0);
  }
  return $j_java$002elang$002e$002dObject.$f_sc_IterableOnceOps__mkString__T__T__T__T($j_scala$002escalajs$002ejs$002e$002dWrapped$002dArray.$ct_sjs_js_WrappedArray__sjs_js_Array__(new $j_scala$002escalajs$002ejs$002e$002dWrapped$002dArray.$c_sjs_js_WrappedArray(), res), "", "\n\n", "");
}
export { $p_Lgpu_shader_ShaderDef__buildWGSL__T__T__T__T__T__T__T as $p_Lgpu_shader_ShaderDef__buildWGSL__T__T__T__T__T__T__T };
function $p_Lgpu_shader_ShaderDef__buildVertexMain__T__T($thiz, body) {
  return (("@vertex\nfn vs_main(in: VertexInput) -> VertexOutput {\n  var out: VertexOutput;\n" + body) + "\n  return out;\n}");
}
export { $p_Lgpu_shader_ShaderDef__buildVertexMain__T__T as $p_Lgpu_shader_ShaderDef__buildVertexMain__T__T };
function $p_Lgpu_shader_ShaderDef__buildFragmentMain__T__T($thiz, body) {
  return (("@fragment\nfn fs_main(in: VertexOutput) -> FragmentOutput {\n  var out: FragmentOutput;\n" + body) + "\n  return out;\n}");
}
export { $p_Lgpu_shader_ShaderDef__buildFragmentMain__T__T as $p_Lgpu_shader_ShaderDef__buildFragmentMain__T__T };
/** @constructor */
function $c_Lgpu_shader_ShaderDef(vertexBody, fragmentBody) {
  this.aP = null;
  this.aO = null;
  this.aP = vertexBody;
  this.aO = fragmentBody;
}
export { $c_Lgpu_shader_ShaderDef as $c_Lgpu_shader_ShaderDef };
$p = $c_Lgpu_shader_ShaderDef.prototype = new $j_java$002elang$002e$002dObject.$h_O();
$p.constructor = $c_Lgpu_shader_ShaderDef;
/** @constructor */
function $h_Lgpu_shader_ShaderDef() {
}
export { $h_Lgpu_shader_ShaderDef as $h_Lgpu_shader_ShaderDef };
$h_Lgpu_shader_ShaderDef.prototype = $p;
$p.a6 = (function() {
  return new $j_java$002elang$002e$002dObject.$c_s_Product$$anon$1(this);
});
$p.j = (function() {
  return $j_java$002elang$002e$002dObject.$m_s_util_hashing_MurmurHash3$().aI(this, (-1488826029), true);
});
$p.m = (function() {
  return $j_java$002elang$002e$002dObject.$m_sr_ScalaRunTime$().de(this);
});
$p.I = (function() {
  return 2;
});
$p.K = (function() {
  return "ShaderDef";
});
$p.J = (function(n) {
  if ((n === 0)) {
    return this.aP;
  }
  if ((n === 1)) {
    return this.aO;
  }
  throw $j_java$002elang$002e$002dObject.$ct_jl_IndexOutOfBoundsException__T__(new $j_java$002elang$002e$002dObject.$c_jl_IndexOutOfBoundsException(), ("" + n));
});
var $d_Lgpu_shader_ShaderDef = new $j_java$002elang$002e$002dObject.$TypeData().i($c_Lgpu_shader_ShaderDef, "gpu.shader.ShaderDef", ({
  b5: 1,
  d: 1,
  S: 1,
  a: 1
}));
export { $d_Lgpu_shader_ShaderDef as $d_Lgpu_shader_ShaderDef };
