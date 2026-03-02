'use strict';
import * as $j_java$002elang$002e$002dObject from "./java.lang.-Object.js";
var $p;
/** @constructor */
function $c_sc_Iterator$$anon$20(a$2) {
  this.bt = null;
  this.aD = false;
  this.bt = a$2;
  this.aD = false;
}
export { $c_sc_Iterator$$anon$20 as $c_sc_Iterator$$anon$20 };
$p = $c_sc_Iterator$$anon$20.prototype = new $j_java$002elang$002e$002dObject.$h_sc_AbstractIterator();
$p.constructor = $c_sc_Iterator$$anon$20;
/** @constructor */
function $h_sc_Iterator$$anon$20() {
}
export { $h_sc_Iterator$$anon$20 as $h_sc_Iterator$$anon$20 };
$h_sc_Iterator$$anon$20.prototype = $p;
$p.t = (function() {
  return (!this.aD);
});
$p.p = (function() {
  if (this.aD) {
    return $j_java$002elang$002e$002dObject.$m_sc_Iterator$().K.p();
  } else {
    this.aD = true;
    return this.bt;
  }
});
var $d_sc_Iterator$$anon$20 = new $j_java$002elang$002e$002dObject.$TypeData().i($c_sc_Iterator$$anon$20, "scala.collection.Iterator$$anon$20", ({
  be: 1,
  G: 1,
  b: 1,
  d: 1,
  H: 1
}));
export { $d_sc_Iterator$$anon$20 as $d_sc_Iterator$$anon$20 };
