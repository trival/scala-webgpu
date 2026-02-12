'use strict';
import * as $j_java$002elang$002e$002dObject from "./java.lang.-Object.js";
import * as $j_scala$002e$002dProduct$0024$0024anon$00241 from "./scala.-Product$$anon$1.js";
var $p;
/** @constructor */
function $c_sc_Iterator$$anon$20(a$2) {
  this.af = null;
  this.T = false;
  this.af = a$2;
  this.T = false;
}
export { $c_sc_Iterator$$anon$20 as $c_sc_Iterator$$anon$20 };
$p = $c_sc_Iterator$$anon$20.prototype = new $j_scala$002e$002dProduct$0024$0024anon$00241.$h_sc_AbstractIterator();
$p.constructor = $c_sc_Iterator$$anon$20;
/** @constructor */
function $h_sc_Iterator$$anon$20() {
}
export { $h_sc_Iterator$$anon$20 as $h_sc_Iterator$$anon$20 };
$h_sc_Iterator$$anon$20.prototype = $p;
$p.l = (function() {
  return (!this.T);
});
$p.i = (function() {
  if (this.T) {
    return $j_scala$002e$002dProduct$0024$0024anon$00241.$m_sc_Iterator$().F.i();
  } else {
    this.T = true;
    return this.af;
  }
});
var $d_sc_Iterator$$anon$20 = new $j_java$002elang$002e$002dObject.$TypeData().i($c_sc_Iterator$$anon$20, "scala.collection.Iterator$$anon$20", ({
  ax: 1,
  o: 1,
  b: 1,
  e: 1,
  p: 1
}));
export { $d_sc_Iterator$$anon$20 as $d_sc_Iterator$$anon$20 };
