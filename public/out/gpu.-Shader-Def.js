'use strict';
import * as $j_java$002elang$002e$002dIndex$002dOut$002dOf$002dBounds$002dException from "./java.lang.-Index-Out-Of-Bounds-Exception.js";
import * as $j_java$002elang$002e$002dObject from "./java.lang.-Object.js";
import * as $j_scala$002e$002dProduct$0024$0024anon$00241 from "./scala.-Product$$anon$1.js";
import * as $j_scala$002ecollection$002e$002dString$002dOps$0024 from "./scala.collection.-String-Ops$.js";
import * as $j_scala$002eruntime$002e$002dScala$002dRun$002dTime$0024 from "./scala.runtime.-Scala-Run-Time$.js";
import * as $j_scala$002escalajs$002ejs$002e$002dWrapped$002dArray from "./scala.scalajs.js.-Wrapped-Array.js";
var $p;
function $p_Lgpu_ShaderDef__buildWGSL__T__T__T__T__T__T__T($thiz, vertexInputStruct, vertexOutputStruct, fragmentOutputStruct, uniformDecls, vertexBody, fragmentBody) {
  var array = [vertexInputStruct, vertexOutputStruct, fragmentOutputStruct, uniformDecls, $p_Lgpu_ShaderDef__buildVertexMain__T__T($thiz, vertexBody), $p_Lgpu_ShaderDef__buildFragmentMain__T__T($thiz, fragmentBody)];
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
  return $j_scala$002e$002dProduct$0024$0024anon$00241.$f_sc_IterableOnceOps__mkString__T__T__T__T(new $j_scala$002escalajs$002ejs$002e$002dWrapped$002dArray.$c_sjs_js_WrappedArray(res), "", "\n\n", "");
}
export { $p_Lgpu_ShaderDef__buildWGSL__T__T__T__T__T__T__T as $p_Lgpu_ShaderDef__buildWGSL__T__T__T__T__T__T__T };
function $p_Lgpu_ShaderDef__buildVertexMain__T__T($thiz, body) {
  return (("@vertex\nfn vs_main(in: VertexInput) -> VertexOutput {\n  var out: VertexOutput;\n" + body) + "\n  return out;\n}");
}
export { $p_Lgpu_ShaderDef__buildVertexMain__T__T as $p_Lgpu_ShaderDef__buildVertexMain__T__T };
function $p_Lgpu_ShaderDef__buildFragmentMain__T__T($thiz, body) {
  return (("@fragment\nfn fs_main(in: VertexOutput) -> FragmentOutput {\n  var out: FragmentOutput;\n" + body) + "\n  return out;\n}");
}
export { $p_Lgpu_ShaderDef__buildFragmentMain__T__T as $p_Lgpu_ShaderDef__buildFragmentMain__T__T };
/** @constructor */
function $c_Lgpu_ShaderDef(vertexBody, fragmentBody) {
  this.L = null;
  this.K = null;
  this.L = vertexBody;
  this.K = fragmentBody;
}
export { $c_Lgpu_ShaderDef as $c_Lgpu_ShaderDef };
$p = $c_Lgpu_ShaderDef.prototype = new $j_java$002elang$002e$002dObject.$h_O();
$p.constructor = $c_Lgpu_ShaderDef;
/** @constructor */
function $h_Lgpu_ShaderDef() {
}
export { $h_Lgpu_ShaderDef as $h_Lgpu_ShaderDef };
$h_Lgpu_ShaderDef.prototype = $p;
$p.I = (function() {
  return new $j_scala$002e$002dProduct$0024$0024anon$00241.$c_s_Product$$anon$1(this);
});
$p.m = (function() {
  return $j_scala$002e$002dProduct$0024$0024anon$00241.$m_s_util_hashing_MurmurHash3$().Y(this, (-1488826029), true);
});
$p.g = (function() {
  return $j_scala$002eruntime$002e$002dScala$002dRun$002dTime$0024.$m_sr_ScalaRunTime$().an(this);
});
$p.w = (function() {
  return 2;
});
$p.y = (function() {
  return "ShaderDef";
});
$p.x = (function(n) {
  if ((n === 0)) {
    return this.L;
  }
  if ((n === 1)) {
    return this.K;
  }
  throw new $j_java$002elang$002e$002dIndex$002dOut$002dOf$002dBounds$002dException.$c_jl_IndexOutOfBoundsException(("" + n));
});
var $d_Lgpu_ShaderDef = new $j_java$002elang$002e$002dObject.$TypeData().i($c_Lgpu_ShaderDef, "gpu.ShaderDef", ({
  X: 1,
  f: 1,
  m: 1,
  a: 1
}));
export { $d_Lgpu_ShaderDef as $d_Lgpu_ShaderDef };
