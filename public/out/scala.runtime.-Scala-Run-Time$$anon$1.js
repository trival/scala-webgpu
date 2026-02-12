'use strict';
import * as $j_java$002elang$002e$002dObject from "./java.lang.-Object.js";
import * as $j_scala$002e$002dProduct$0024$0024anon$00241 from "./scala.-Product$$anon$1.js";
var $p;
/** @constructor */
function $c_sr_ScalaRunTime$$anon$1(x$1) {
  this.ak = null;
  this.G = 0;
  this.aj = 0;
  this.ak = x$1;
  this.G = 0;
  this.aj = x$1.w();
}
export { $c_sr_ScalaRunTime$$anon$1 as $c_sr_ScalaRunTime$$anon$1 };
$p = $c_sr_ScalaRunTime$$anon$1.prototype = new $j_scala$002e$002dProduct$0024$0024anon$00241.$h_sc_AbstractIterator();
$p.constructor = $c_sr_ScalaRunTime$$anon$1;
/** @constructor */
function $h_sr_ScalaRunTime$$anon$1() {
}
export { $h_sr_ScalaRunTime$$anon$1 as $h_sr_ScalaRunTime$$anon$1 };
$h_sr_ScalaRunTime$$anon$1.prototype = $p;
$p.l = (function() {
  return (this.G < this.aj);
});
$p.i = (function() {
  var result = this.ak.x(this.G);
  this.G = ((1 + this.G) | 0);
  return result;
});
var $d_sr_ScalaRunTime$$anon$1 = new $j_java$002elang$002e$002dObject.$TypeData().i($c_sr_ScalaRunTime$$anon$1, "scala.runtime.ScalaRunTime$$anon$1", ({
  b0: 1,
  o: 1,
  b: 1,
  e: 1,
  p: 1
}));
export { $d_sr_ScalaRunTime$$anon$1 as $d_sr_ScalaRunTime$$anon$1 };
