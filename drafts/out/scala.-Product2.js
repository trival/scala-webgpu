'use strict';
import * as $j_java$002elang$002e$002dObject from "./java.lang.-Object.js";
var $p;
function $f_s_Product2__productElement__I__O($thiz, n) {
  switch (n) {
    case 0: {
      return $thiz.u();
      break;
    }
    case 1: {
      return $thiz.D();
      break;
    }
    default: {
      throw $j_java$002elang$002e$002dObject.$ct_jl_IndexOutOfBoundsException__T__(new $j_java$002elang$002e$002dObject.$c_jl_IndexOutOfBoundsException(), (n + " is out of bounds (min 0, max 1)"));
    }
  }
}
export { $f_s_Product2__productElement__I__O as $f_s_Product2__productElement__I__O };
