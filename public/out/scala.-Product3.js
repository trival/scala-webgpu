'use strict';
import * as $j_java$002elang$002e$002dIndex$002dOut$002dOf$002dBounds$002dException from "./java.lang.-Index-Out-Of-Bounds-Exception.js";
import * as $j_java$002elang$002e$002dObject from "./java.lang.-Object.js";
var $p;
function $f_s_Product3__productElement__I__O($thiz, n) {
  switch (n) {
    case 0: {
      return $thiz.P;
      break;
    }
    case 1: {
      return $thiz.Q;
      break;
    }
    case 2: {
      return $thiz.R;
      break;
    }
    default: {
      throw new $j_java$002elang$002e$002dIndex$002dOut$002dOf$002dBounds$002dException.$c_jl_IndexOutOfBoundsException((n + " is out of bounds (min 0, max 2)"));
    }
  }
}
export { $f_s_Product3__productElement__I__O as $f_s_Product3__productElement__I__O };
