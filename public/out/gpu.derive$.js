'use strict';
import * as $j_java$002elang$002e$002dObject from "./java.lang.-Object.js";
import * as $j_scala$002e$002dMatch$002dError from "./scala.-Match-Error.js";
import * as $j_scala$002e$002dProduct$0024$0024anon$00241 from "./scala.-Product$$anon$1.js";
import * as $j_scala$002escalajs$002ejs$002e$002dArray$002dOps$0024 from "./scala.scalajs.js.-Array-Ops$.js";
import * as $j_scala$002escalajs$002ejs$002e$002dArray$002dOps$002dCommon$0024 from "./scala.scalajs.js.-Array-Ops-Common$.js";
import * as $j_scala$002escalajs$002ejs$002e$002dWrapped$002dArray from "./scala.scalajs.js.-Wrapped-Array.js";
var $p;
function $p_Lgpu_derive$__generateCombinedStructFromLists__T__sjs_js_Array__sjs_js_Array__sjs_js_Array__T($thiz, structName, locNames, locTypes, builtins) {
  var array$1 = $j_scala$002escalajs$002ejs$002e$002dArray$002dOps$0024.$m_sjs_js_ArrayOps$().aA($j_scala$002escalajs$002ejs$002e$002dArray$002dOps$0024.$m_sjs_js_ArrayOps$().az(locNames, new $j_scala$002escalajs$002ejs$002e$002dWrapped$002dArray.$c_sjs_js_WrappedArray(locTypes)));
  var len = (array$1.length | 0);
  var res = new Array(len);
  var i = 0;
  while ((i < len)) {
    var $x_2 = i;
    var x0 = array$1[i];
    matchResult3: {
      var $x_1;
      if ((x0 !== null)) {
        var x11 = x0.j;
        if ((x11 !== null)) {
          var name = x11.j;
          var typ = x11.z;
          var $x_1 = (((((("  @location(" + (x0.z | 0)) + ") ") + name) + ": ") + typ) + ",");
          break matchResult3;
        }
      }
      throw new $j_scala$002e$002dMatch$002dError.$c_s_MatchError(x0);
    }
    res[$x_2] = $x_1;
    i = ((1 + i) | 0);
  }
  var len$1 = (builtins.length | 0);
  var res$1 = new Array(len$1);
  var i$1 = 0;
  while ((i$1 < len$1)) {
    var $x_4 = i$1;
    var x0$1 = builtins[i$1];
    matchResult4: {
      var $x_3;
      if ((x0$1 !== null)) {
        var name$1 = x0$1.P;
        var builtin = x0$1.Q;
        var typ$1 = x0$1.R;
        var $x_3 = (((((("  @builtin(" + builtin) + ") ") + name$1) + ": ") + typ$1) + ",");
        break matchResult4;
      }
      throw new $j_scala$002e$002dMatch$002dError.$c_s_MatchError(x0$1);
    }
    res$1[$x_4] = $x_3;
    i$1 = ((1 + i$1) | 0);
  }
  var allFields = $j_scala$002escalajs$002ejs$002e$002dArray$002dOps$002dCommon$0024.$m_sjs_js_ArrayOpsCommon$().e(res, res$1);
  return (((allFields.length | 0) === 0) ? "" : (((("struct " + structName) + " {\n") + $j_scala$002e$002dProduct$0024$0024anon$00241.$f_sc_IterableOnceOps__mkString__T__T__T__T(new $j_scala$002escalajs$002ejs$002e$002dWrapped$002dArray.$c_sjs_js_WrappedArray(allFields), "", "\n", "")) + "\n}"));
}
export { $p_Lgpu_derive$__generateCombinedStructFromLists__T__sjs_js_Array__sjs_js_Array__sjs_js_Array__T as $p_Lgpu_derive$__generateCombinedStructFromLists__T__sjs_js_Array__sjs_js_Array__sjs_js_Array__T };
function $p_Lgpu_derive$__generateUniformGroupFromLists__I__sjs_js_Array__sjs_js_Array__T($thiz, groupIdx, names, types) {
  var array$1 = $j_scala$002escalajs$002ejs$002e$002dArray$002dOps$0024.$m_sjs_js_ArrayOps$().aA($j_scala$002escalajs$002ejs$002e$002dArray$002dOps$0024.$m_sjs_js_ArrayOps$().az(names, new $j_scala$002escalajs$002ejs$002e$002dWrapped$002dArray.$c_sjs_js_WrappedArray(types)));
  var len = (array$1.length | 0);
  var res = new Array(len);
  var i = 0;
  while ((i < len)) {
    var $x_2 = i;
    var x0 = array$1[i];
    matchResult5: {
      var $x_1;
      if ((x0 !== null)) {
        var x20 = x0.j;
        if ((x20 !== null)) {
          var name = x20.j;
          var typ = x20.z;
          var bindingIdx = (x0.z | 0);
          var $x_1 = (((((((("@group(" + groupIdx) + ") @binding(") + bindingIdx) + ") var<uniform> ") + name) + ": ") + typ) + ";");
          break matchResult5;
        }
      }
      throw new $j_scala$002e$002dMatch$002dError.$c_s_MatchError(x0);
    }
    res[$x_2] = $x_1;
    i = ((1 + i) | 0);
  }
  return $j_scala$002e$002dProduct$0024$0024anon$00241.$f_sc_IterableOnceOps__mkString__T__T__T__T(new $j_scala$002escalajs$002ejs$002e$002dWrapped$002dArray.$c_sjs_js_WrappedArray(res), "", "\n", "");
}
export { $p_Lgpu_derive$__generateUniformGroupFromLists__I__sjs_js_Array__sjs_js_Array__T as $p_Lgpu_derive$__generateUniformGroupFromLists__I__sjs_js_Array__sjs_js_Array__T };
/** @constructor */
function $c_Lgpu_derive$() {
}
export { $c_Lgpu_derive$ as $c_Lgpu_derive$ };
$p = $c_Lgpu_derive$.prototype = new $j_java$002elang$002e$002dObject.$h_O();
$p.constructor = $c_Lgpu_derive$;
/** @constructor */
function $h_Lgpu_derive$() {
}
export { $h_Lgpu_derive$ as $h_Lgpu_derive$ };
$h_Lgpu_derive$.prototype = $p;
var $d_Lgpu_derive$ = new $j_java$002elang$002e$002dObject.$TypeData().i($c_Lgpu_derive$, "gpu.derive$", ({
  Y: 1
}));
export { $d_Lgpu_derive$ as $d_Lgpu_derive$ };
var $n_Lgpu_derive$;
function $m_Lgpu_derive$() {
  if ((!$n_Lgpu_derive$)) {
    $n_Lgpu_derive$ = new $c_Lgpu_derive$();
  }
  return $n_Lgpu_derive$;
}
export { $m_Lgpu_derive$ as $m_Lgpu_derive$ };
