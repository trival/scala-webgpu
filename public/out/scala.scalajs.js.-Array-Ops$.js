'use strict';
import * as $j_java$002elang$002e$002dObject from "./java.lang.-Object.js";
import * as $j_scala$002e$002dTuple2 from "./scala.-Tuple2.js";
var $p;
/** @constructor */
function $c_sjs_js_ArrayOps$() {
}
export { $c_sjs_js_ArrayOps$ as $c_sjs_js_ArrayOps$ };
$p = $c_sjs_js_ArrayOps$.prototype = new $j_java$002elang$002e$002dObject.$h_O();
$p.constructor = $c_sjs_js_ArrayOps$;
/** @constructor */
function $h_sjs_js_ArrayOps$() {
}
export { $h_sjs_js_ArrayOps$ as $h_sjs_js_ArrayOps$ };
$h_sjs_js_ArrayOps$.prototype = $p;
$p.az = (function(this$, that) {
  var b = [];
  var len = (this$.length | 0);
  var i = 0;
  var it = that.r();
  while (((i < len) && it.l())) {
    b.push(new $j_scala$002e$002dTuple2.$c_T2(this$[i], it.i()));
    i = ((1 + i) | 0);
  }
  return b;
});
$p.aA = (function(this$) {
  var len = (this$.length | 0);
  var b = new Array(len);
  var i = 0;
  while ((i < len)) {
    b[i] = new $j_scala$002e$002dTuple2.$c_T2(this$[i], i);
    i = ((1 + i) | 0);
  }
  return b;
});
var $d_sjs_js_ArrayOps$ = new $j_java$002elang$002e$002dObject.$TypeData().i($c_sjs_js_ArrayOps$, "scala.scalajs.js.ArrayOps$", ({
  b3: 1
}));
export { $d_sjs_js_ArrayOps$ as $d_sjs_js_ArrayOps$ };
var $n_sjs_js_ArrayOps$;
function $m_sjs_js_ArrayOps$() {
  if ((!$n_sjs_js_ArrayOps$)) {
    $n_sjs_js_ArrayOps$ = new $c_sjs_js_ArrayOps$();
  }
  return $n_sjs_js_ArrayOps$;
}
export { $m_sjs_js_ArrayOps$ as $m_sjs_js_ArrayOps$ };
