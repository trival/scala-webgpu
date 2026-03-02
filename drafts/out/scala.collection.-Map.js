'use strict';
import * as $j_java$002elang$002e$002dClass$002dCast$002dException from "./java.lang.-Class-Cast-Exception.js";
import * as $j_java$002elang$002e$002dObject from "./java.lang.-Object.js";
import * as $j_scala$002ecollection$002e$002dMap$0024 from "./scala.collection.-Map$.js";
var $p;
function $f_sc_Map__equals__O__Z($thiz, o) {
  if (($thiz === o)) {
    return true;
  } else if ($is_sc_Map(o)) {
    if (($thiz.dT() === o.dT())) {
      try {
        return $thiz.gF(new $j_java$002elang$002e$002dObject.$c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28(((map$1) => ((kv$2) => $j_java$002elang$002e$002dObject.$m_sr_BoxesRunTime$().O(map$1.fr(kv$2.S(), new $j_java$002elang$002e$002dObject.$c_sr_AbstractFunction0_$$Lambda$a02b774b97db8234e08c6a02dd06557c99779855((() => $j_scala$002ecollection$002e$002dMap$0024.$m_sc_Map$().ev.a0()))), kv$2.a8())))(o)));
      } catch (e) {
        if (false) {
          return false;
        } else {
          throw e;
        }
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
}
export { $f_sc_Map__equals__O__Z as $f_sc_Map__equals__O__Z };
function $is_sc_Map(obj) {
  return (!(!((obj && obj.$classData) && obj.$classData.n.an)));
}
export { $is_sc_Map as $is_sc_Map };
function $isArrayOf_sc_Map(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.an)));
}
export { $isArrayOf_sc_Map as $isArrayOf_sc_Map };
