'use strict';
import * as $j_java$002elang$002e$002dObject from "./java.lang.-Object.js";
var $p;
/** @constructor */
function $c_sjs_js_ArrayOpsCommon$() {
}
export { $c_sjs_js_ArrayOpsCommon$ as $c_sjs_js_ArrayOpsCommon$ };
$p = $c_sjs_js_ArrayOpsCommon$.prototype = new $j_java$002elang$002e$002dObject.$h_O();
$p.constructor = $c_sjs_js_ArrayOpsCommon$;
/** @constructor */
function $h_sjs_js_ArrayOpsCommon$() {
}
export { $h_sjs_js_ArrayOpsCommon$ as $h_sjs_js_ArrayOpsCommon$ };
$h_sjs_js_ArrayOpsCommon$.prototype = $p;
$p.e = (function(left, right) {
  var leftLength = (left.length | 0);
  var rightLength = (right.length | 0);
  var result = new Array(((leftLength + rightLength) | 0));
  var i = 0;
  while (true) {
    if ((i !== leftLength)) {
      result[i] = left[i];
      i = ((1 + i) | 0);
      continue;
    }
    break;
  }
  var i$1 = 0;
  while (true) {
    if ((i$1 !== rightLength)) {
      result[((i$1 + leftLength) | 0)] = right[i$1];
      i$1 = ((1 + i$1) | 0);
      continue;
    }
    break;
  }
  return result;
});
var $d_sjs_js_ArrayOpsCommon$ = new $j_java$002elang$002e$002dObject.$TypeData().i($c_sjs_js_ArrayOpsCommon$, "scala.scalajs.js.ArrayOpsCommon$", ({
  b4: 1
}));
export { $d_sjs_js_ArrayOpsCommon$ as $d_sjs_js_ArrayOpsCommon$ };
var $n_sjs_js_ArrayOpsCommon$;
function $m_sjs_js_ArrayOpsCommon$() {
  if ((!$n_sjs_js_ArrayOpsCommon$)) {
    $n_sjs_js_ArrayOpsCommon$ = new $c_sjs_js_ArrayOpsCommon$();
  }
  return $n_sjs_js_ArrayOpsCommon$;
}
export { $m_sjs_js_ArrayOpsCommon$ as $m_sjs_js_ArrayOpsCommon$ };
