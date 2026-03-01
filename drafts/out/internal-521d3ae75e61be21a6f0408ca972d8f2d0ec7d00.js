'use strict';
import * as $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e from "./internal-ae9a4288cef3d3827cff28fde9c5ba209927925e.js";
var $p;
/** @constructor */
function $c_s_Option() {
}
export { $c_s_Option as $c_s_Option };
$p = $c_s_Option.prototype = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$h_O();
$p.constructor = $c_s_Option;
/** @constructor */
function $h_s_Option() {
}
export { $h_s_Option as $h_s_Option };
$h_s_Option.prototype = $p;
$p.am = (function() {
  return new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$c_s_Product$$anon$1(this);
});
$p.n = (function() {
  return (this === $m_s_None$());
});
$p.o = (function() {
  return (this.n() ? 0 : 1);
});
$p.c = (function() {
  return (this.n() ? $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sc_Iterator$().G : new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$c_sc_Iterator$$anon$20(this.dI()));
});
/** @constructor */
function $c_s_None$() {
}
export { $c_s_None$ as $c_s_None$ };
$p = $c_s_None$.prototype = new $h_s_Option();
$p.constructor = $c_s_None$;
/** @constructor */
function $h_s_None$() {
}
export { $h_s_None$ as $h_s_None$ };
$h_s_None$.prototype = $p;
$p.j = (function() {
  return 2433880;
});
$p.m = (function() {
  return "None";
});
$p.H = (function() {
  return 0;
});
$p.J = (function() {
  return "None";
});
$p.I = (function(n) {
  throw $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$ct_jl_IndexOutOfBoundsException__T__(new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$c_jl_IndexOutOfBoundsException(), ("" + n));
});
$p.gO = (function() {
  throw new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$c_ju_NoSuchElementException("None.get");
});
$p.dI = (function() {
  this.gO();
});
var $d_s_None$ = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$TypeData().i($c_s_None$, "scala.None$", ({
  cY: 1,
  aU: 1,
  c: 1,
  b: 1,
  r: 1,
  a: 1
}));
export { $d_s_None$ as $d_s_None$ };
var $n_s_None$;
function $m_s_None$() {
  if ((!$n_s_None$)) {
    $n_s_None$ = new $c_s_None$();
  }
  return $n_s_None$;
}
export { $m_s_None$ as $m_s_None$ };
/** @constructor */
function $c_s_Some(value) {
  this.b0 = null;
  this.b0 = value;
}
export { $c_s_Some as $c_s_Some };
$p = $c_s_Some.prototype = new $h_s_Option();
$p.constructor = $c_s_Some;
/** @constructor */
function $h_s_Some() {
}
export { $h_s_Some as $h_s_Some };
$h_s_Some.prototype = $p;
$p.j = (function() {
  return $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_s_util_hashing_MurmurHash3$().bS(this, 1323286827, true);
});
$p.h = (function(x$0) {
  return ((this === x$0) || ((x$0 instanceof $c_s_Some) && $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sr_BoxesRunTime$().O(this.b0, x$0.b0)));
});
$p.m = (function() {
  return $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$m_sr_ScalaRunTime$().dv(this);
});
$p.H = (function() {
  return 1;
});
$p.J = (function() {
  return "Some";
});
$p.I = (function(n) {
  if ((n === 0)) {
    return this.b0;
  }
  throw $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$ct_jl_IndexOutOfBoundsException__T__(new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$c_jl_IndexOutOfBoundsException(), ("" + n));
});
$p.dI = (function() {
  return this.b0;
});
function $isArrayOf_s_Some(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.aV)));
}
export { $isArrayOf_s_Some as $isArrayOf_s_Some };
var $d_s_Some = new $j_internal$002dae9a4288cef3d3827cff28fde9c5ba209927925e.$TypeData().i($c_s_Some, "scala.Some", ({
  aV: 1,
  aU: 1,
  c: 1,
  b: 1,
  r: 1,
  a: 1
}));
export { $d_s_Some as $d_s_Some };
