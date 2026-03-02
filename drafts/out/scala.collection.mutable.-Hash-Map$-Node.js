'use strict';
import * as $j_java$002elang$002e$002dObject from "./java.lang.-Object.js";
var $p;
/** @constructor */
function $c_scm_HashMap$Node(_key, _hash, _value, _next) {
  this.br = null;
  this.aW = 0;
  this.au = null;
  this.L = null;
  this.br = _key;
  this.aW = _hash;
  this.au = _value;
  this.L = _next;
}
export { $c_scm_HashMap$Node as $c_scm_HashMap$Node };
$p = $c_scm_HashMap$Node.prototype = new $j_java$002elang$002e$002dObject.$h_O();
$p.constructor = $c_scm_HashMap$Node;
/** @constructor */
function $h_scm_HashMap$Node() {
}
export { $h_scm_HashMap$Node as $h_scm_HashMap$Node };
$h_scm_HashMap$Node.prototype = $p;
$p.cZ = (function(k, h) {
  var \u03b4this$tailLocal1 = this;
  while (true) {
    if (((h === \u03b4this$tailLocal1.aW) && $j_java$002elang$002e$002dObject.$m_sr_BoxesRunTime$().O(k, \u03b4this$tailLocal1.br))) {
      return \u03b4this$tailLocal1;
    } else if (((\u03b4this$tailLocal1.L === null) || (\u03b4this$tailLocal1.aW > h))) {
      return null;
    } else {
      \u03b4this$tailLocal1 = \u03b4this$tailLocal1.L;
    }
  }
});
$p.cs = (function(f) {
  var \u03b4this$tailLocal3 = this;
  while (true) {
    f.aF(\u03b4this$tailLocal3.br, \u03b4this$tailLocal3.au);
    if ((\u03b4this$tailLocal3.L !== null)) {
      \u03b4this$tailLocal3 = \u03b4this$tailLocal3.L;
    } else {
      return (void 0);
    }
  }
});
$p.m = (function() {
  return ((((((("Node(" + this.br) + ", ") + this.au) + ", ") + this.aW) + ") -> ") + this.L);
});
var $d_scm_HashMap$Node = new $j_java$002elang$002e$002dObject.$TypeData().i($c_scm_HashMap$Node, "scala.collection.mutable.HashMap$Node", ({
  e7: 1
}));
export { $d_scm_HashMap$Node as $d_scm_HashMap$Node };
