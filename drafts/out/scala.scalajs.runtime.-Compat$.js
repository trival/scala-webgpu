'use strict';
import * as $j_java$002elang$002e$002dObject from "./java.lang.-Object.js";
import * as $j_scala$002escalajs$002eruntime$002e$002dWrapped$002dVar$002dArgs from "./scala.scalajs.runtime.-Wrapped-Var-Args.js";
var $p;
/** @constructor */
function $c_sjsr_Compat$() {
}
export { $c_sjsr_Compat$ as $c_sjsr_Compat$ };
$p = $c_sjsr_Compat$.prototype = new $j_java$002elang$002e$002dObject.$h_O();
$p.constructor = $c_sjsr_Compat$;
/** @constructor */
function $h_sjsr_Compat$() {
}
export { $h_sjsr_Compat$ as $h_sjsr_Compat$ };
$h_sjsr_Compat$.prototype = $p;
$p.b = (function(seq) {
  if ((seq instanceof $j_scala$002escalajs$002eruntime$002e$002dWrapped$002dVar$002dArgs.$c_sjsr_WrappedVarArgs)) {
    return seq.bC;
  } else {
    var result = [];
    seq.bE(new $j_java$002elang$002e$002dObject.$c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28(((x$2$2) => (result.push(x$2$2) | 0))));
    return result;
  }
});
var $d_sjsr_Compat$ = new $j_java$002elang$002e$002dObject.$TypeData().i($c_sjsr_Compat$, "scala.scalajs.runtime.Compat$", ({
  dt: 1
}));
export { $d_sjsr_Compat$ as $d_sjsr_Compat$ };
var $n_sjsr_Compat$;
function $m_sjsr_Compat$() {
  if ((!$n_sjsr_Compat$)) {
    $n_sjsr_Compat$ = new $c_sjsr_Compat$();
  }
  return $n_sjsr_Compat$;
}
export { $m_sjsr_Compat$ as $m_sjsr_Compat$ };
