'use strict';
import * as $j_java$002elang$002e$002dIndex$002dOut$002dOf$002dBounds$002dException from "./java.lang.-Index-Out-Of-Bounds-Exception.js";
import * as $j_java$002elang$002e$002dObject from "./java.lang.-Object.js";
var $p;
function $f_sc_LinearSeqOps__apply__I__O($thiz, n) {
  if ((n < 0)) {
    throw new $j_java$002elang$002e$002dIndex$002dOut$002dOf$002dBounds$002dException.$c_jl_IndexOutOfBoundsException(("" + n));
  }
  var skipped = $thiz.aF(n);
  if (skipped.A()) {
    throw new $j_java$002elang$002e$002dIndex$002dOut$002dOf$002dBounds$002dException.$c_jl_IndexOutOfBoundsException(("" + n));
  }
  return skipped.aI();
}
export { $f_sc_LinearSeqOps__apply__I__O as $f_sc_LinearSeqOps__apply__I__O };
