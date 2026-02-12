'use strict';
import * as $j_java$002elang$002e$002dObject from "./java.lang.-Object.js";
var $p;
function $p_s_MatchError__objString__T($thiz) {
  if ((!$thiz.aa)) {
    if (($thiz.N === null)) {
      var $x_1 = "null";
    } else {
      try {
        var $x_1 = ((($thiz.N + " (") + $p_s_MatchError__ofClass$1__T($thiz)) + ")");
      } catch (e) {
        var $x_1 = ("an instance " + $p_s_MatchError__ofClass$1__T($thiz));
      }
    }
    $thiz.a9 = $x_1;
    $thiz.aa = true;
  }
  return $thiz.a9;
}
export { $p_s_MatchError__objString__T as $p_s_MatchError__objString__T };
function $p_s_MatchError__ofClass$1__T($thiz) {
  var this$1 = $thiz.N;
  return ("of class " + $j_java$002elang$002e$002dObject.$objectClassName(this$1));
}
export { $p_s_MatchError__ofClass$1__T as $p_s_MatchError__ofClass$1__T };
class $c_s_MatchError extends $j_java$002elang$002e$002dObject.$c_jl_RuntimeException {
  constructor(obj) {
    super();
    this.N = null;
    this.a9 = null;
    this.aa = false;
    this.N = obj;
    $j_java$002elang$002e$002dObject.$ct_jl_Throwable__T__jl_Throwable__Z__Z__(this, null, null, true, true);
  }
  a4() {
    return $p_s_MatchError__objString__T(this);
  }
}
export { $c_s_MatchError as $c_s_MatchError };
var $d_s_MatchError = new $j_java$002elang$002e$002dObject.$TypeData().i($c_s_MatchError, "scala.MatchError", ({
  ag: 1,
  j: 1,
  h: 1,
  k: 1,
  a: 1
}));
export { $d_s_MatchError as $d_s_MatchError };
