'use strict';
var $p;
var $fileLevelThis = this;
var $L0;
function $Char(c) {
  this.c = c;
}
$p = $Char.prototype;
$p.toString = (function() {
  return String.fromCharCode(this.c);
});
function $noIsInstance(arg0) {
  throw new TypeError("Cannot call isInstance() on a Class representing a JS trait/object");
}
function $objectClone(arg0) {
  return Object.create(Object.getPrototypeOf(arg0), Object.getOwnPropertyDescriptors(arg0));
}
function $objectOrArrayClone(arg0) {
  return (arg0.$classData.Z ? arg0.c() : $objectClone(arg0));
}
function $objectGetClass(arg0) {
  switch ((typeof arg0)) {
    case "string": {
      return $d_T.l();
    }
    case "number": {
      if ($isInt(arg0)) {
        if ((((arg0 << 24) >> 24) === arg0)) {
          return $d_jl_Byte.l();
        } else if ((((arg0 << 16) >> 16) === arg0)) {
          return $d_jl_Short.l();
        } else {
          return $d_jl_Integer.l();
        }
      } else if ($isFloat(arg0)) {
        return $d_jl_Float.l();
      } else {
        return $d_jl_Double.l();
      }
    }
    case "boolean": {
      return $d_jl_Boolean.l();
    }
    case "undefined": {
      return $d_jl_Void.l();
    }
    default: {
      if ((arg0 instanceof $c_RTLong)) {
        return $d_jl_Long.l();
      } else if ((arg0 instanceof $Char)) {
        return $d_jl_Character.l();
      } else if ((!(!(arg0 && arg0.$classData)))) {
        return arg0.$classData.l();
      } else {
        return null;
      }
    }
  }
}
function $objectClassName(arg0) {
  switch ((typeof arg0)) {
    case "string": {
      return "java.lang.String";
    }
    case "number": {
      if ($isInt(arg0)) {
        if ((((arg0 << 24) >> 24) === arg0)) {
          return "java.lang.Byte";
        } else if ((((arg0 << 16) >> 16) === arg0)) {
          return "java.lang.Short";
        } else {
          return "java.lang.Integer";
        }
      } else if ($isFloat(arg0)) {
        return "java.lang.Float";
      } else {
        return "java.lang.Double";
      }
    }
    case "boolean": {
      return "java.lang.Boolean";
    }
    case "undefined": {
      return "java.lang.Void";
    }
    default: {
      if ((arg0 instanceof $c_RTLong)) {
        return "java.lang.Long";
      } else if ((arg0 instanceof $Char)) {
        return "java.lang.Character";
      } else if ((!(!(arg0 && arg0.$classData)))) {
        return arg0.$classData.N;
      } else {
        return null.hx();
      }
    }
  }
}
function $dp_equals__O__Z(instance, x0) {
  switch ((typeof instance)) {
    case "string": {
      return $f_T__equals__O__Z(instance, x0);
    }
    case "number": {
      return $f_jl_Double__equals__O__Z(instance, x0);
    }
    case "boolean": {
      return $f_jl_Boolean__equals__O__Z(instance, x0);
    }
    case "undefined": {
      return $f_jl_Void__equals__O__Z(instance, x0);
    }
    default: {
      if (((!(!(instance && instance.$classData))) || (instance === null))) {
        return instance.H(x0);
      } else if ((instance instanceof $c_RTLong)) {
        return $f_jl_Long__equals__O__Z(instance, x0);
      } else if ((instance instanceof $Char)) {
        return $f_jl_Character__equals__O__Z($uC(instance), x0);
      } else {
        return $c_O.prototype.H.call(instance, x0);
      }
    }
  }
}
function $dp_hashCode__I(instance) {
  switch ((typeof instance)) {
    case "string": {
      return $f_T__hashCode__I(instance);
    }
    case "number": {
      return $f_jl_Double__hashCode__I(instance);
    }
    case "boolean": {
      return $f_jl_Boolean__hashCode__I(instance);
    }
    case "undefined": {
      return $f_jl_Void__hashCode__I(instance);
    }
    default: {
      if (((!(!(instance && instance.$classData))) || (instance === null))) {
        return instance.I();
      } else if ((instance instanceof $c_RTLong)) {
        return $f_jl_Long__hashCode__I(instance);
      } else if ((instance instanceof $Char)) {
        return $f_jl_Character__hashCode__I($uC(instance));
      } else {
        return $c_O.prototype.I.call(instance);
      }
    }
  }
}
function $dp_toString__T(instance) {
  return ((instance === (void 0)) ? "undefined" : instance.toString());
}
function $checkIntDivisor(arg0) {
  if ((arg0 === 0)) {
    throw new $c_jl_ArithmeticException("/ by zero");
  } else {
    return arg0;
  }
}
function $doubleToInt(arg0) {
  return ((arg0 > 2147483647) ? 2147483647 : ((arg0 < (-2147483648)) ? (-2147483648) : (arg0 | 0)));
}
function $cToS(arg0) {
  return String.fromCharCode(arg0);
}
var $fpBitsDataView = new DataView(new ArrayBuffer(8));
function $floatToBits(arg0) {
  var dataView = $fpBitsDataView;
  dataView.setFloat32(0, arg0, true);
  return dataView.getInt32(0, true);
}
function $floatFromBits(arg0) {
  var dataView = $fpBitsDataView;
  dataView.setInt32(0, arg0, true);
  return dataView.getFloat32(0, true);
}
function $doubleToBits(arg0) {
  var dataView = $fpBitsDataView;
  return $s_RTLong__fromDoubleBits__D__O__RTLong(arg0, dataView);
}
function $doubleFromBits(arg0) {
  var dataView = $fpBitsDataView;
  return $s_RTLong__bitsToDouble__RTLong__O__D(arg0, dataView);
}
function $resolveSuperRef(arg0, arg1) {
  var getPrototypeOf = Object.getPrototyeOf;
  var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
  var superProto = arg0.prototype;
  while ((superProto !== null)) {
    var desc = getOwnPropertyDescriptor(superProto, arg1);
    if ((desc !== (void 0))) {
      return desc;
    }
    superProto = getPrototypeOf(superProto);
  }
}
function $superGet(arg0, arg1, arg2) {
  var desc = $resolveSuperRef(arg0, arg2);
  if ((desc !== (void 0))) {
    var getter = desc.get;
    return ((getter !== (void 0)) ? getter.call(arg1) : getter.value);
  }
}
function $superSet(arg0, arg1, arg2, arg3) {
  var desc = $resolveSuperRef(arg0, arg2);
  if ((desc !== (void 0))) {
    var setter = desc.set;
    if ((setter !== (void 0))) {
      setter.call(arg1, arg3);
      return (void 0);
    }
  }
  throw new TypeError((("super has no setter '" + arg2) + "'."));
}
function $arraycopyGeneric(arg0, arg1, arg2, arg3, arg4) {
  if ((((arg0 !== arg2) || (arg3 < arg1)) || (((arg1 + arg4) | 0) < arg3))) {
    for (var i = 0; (i < arg4); i = ((i + 1) | 0)) {
      arg2[((arg3 + i) | 0)] = arg0[((arg1 + i) | 0)];
    }
  } else {
    for (var i = ((arg4 - 1) | 0); (i >= 0); i = ((i - 1) | 0)) {
      arg2[((arg3 + i) | 0)] = arg0[((arg1 + i) | 0)];
    }
  }
}
var $lastIDHash = 0;
var $idHashCodeMap = new WeakMap();
function $systemIdentityHashCode(obj) {
  switch ((typeof obj)) {
    case "string": {
      return $f_T__hashCode__I(obj);
    }
    case "number": {
      return $f_jl_Double__hashCode__I(obj);
    }
    case "bigint": {
      var biHash = 0;
      if ((obj < BigInt(0))) {
        obj = (~obj);
      }
      while ((obj !== BigInt(0))) {
        biHash = (biHash ^ Number(BigInt.asIntN(32, obj)));
        obj = (obj >> BigInt(32));
      }
      return biHash;
    }
    case "boolean": {
      return (obj ? 1231 : 1237);
    }
    case "undefined": {
      return 0;
    }
    case "symbol": {
      var description = obj.description;
      return ((description === (void 0)) ? 0 : $f_T__hashCode__I(description));
    }
    default: {
      if ((obj === null)) {
        return 0;
      } else {
        var hash = $idHashCodeMap.get(obj);
        if ((hash === (void 0))) {
          hash = (($lastIDHash + 1) | 0);
          $lastIDHash = hash;
          $idHashCodeMap.set(obj, hash);
        }
        return hash;
      }
    }
  }
}
function $isByte(arg0) {
  return ((((typeof arg0) === "number") && (((arg0 << 24) >> 24) === arg0)) && ((1 / arg0) !== (1 / (-0))));
}
function $isShort(arg0) {
  return ((((typeof arg0) === "number") && (((arg0 << 16) >> 16) === arg0)) && ((1 / arg0) !== (1 / (-0))));
}
function $isInt(arg0) {
  return ((((typeof arg0) === "number") && ((arg0 | 0) === arg0)) && ((1 / arg0) !== (1 / (-0))));
}
function $isFloat(arg0) {
  return (((typeof arg0) === "number") && ((arg0 !== arg0) || (Math.fround(arg0) === arg0)));
}
function $bC(arg0) {
  return new $Char(arg0);
}
var $bC0 = $bC(0);
function $uC(arg0) {
  return ((arg0 === null) ? 0 : arg0.c);
}
function $uJ(arg0) {
  return ((arg0 === null) ? $L0 : arg0);
}
function $ct_O__($thiz) {
  return $thiz;
}
/** @constructor */
function $c_O() {
}
$p = $c_O.prototype;
$p.constructor = $c_O;
/** @constructor */
function $h_O() {
}
$h_O.prototype = $p;
$p.I = (function() {
  return $systemIdentityHashCode(this);
});
$p.H = (function(that) {
  return (this === that);
});
$p.A = (function() {
  var i = this.I();
  return (($objectClassName(this) + "@") + (i >>> 0.0).toString(16));
});
$p.toString = (function() {
  return this.A();
});
function $ac_O(arg) {
  if (((typeof arg) === "number")) {
    this.a = new Array(arg);
    for (var i = 0; (i < arg); (i++)) {
      this.a[i] = null;
    }
  } else {
    this.a = arg;
  }
}
$p = $ac_O.prototype = new $h_O();
$p.constructor = $ac_O;
$p.j = (function(srcPos, dest, destPos, length) {
  $arraycopyGeneric(this.a, srcPos, dest.a, destPos, length);
});
$p.c = (function() {
  return new $ac_O(this.a.slice());
});
function $ah_O() {
}
$ah_O.prototype = $p;
function $ac_Z(arg) {
  if (((typeof arg) === "number")) {
    this.a = new Array(arg);
    for (var i = 0; (i < arg); (i++)) {
      this.a[i] = false;
    }
  } else {
    this.a = arg;
  }
}
$p = $ac_Z.prototype = new $h_O();
$p.constructor = $ac_Z;
$p.j = (function(srcPos, dest, destPos, length) {
  $arraycopyGeneric(this.a, srcPos, dest.a, destPos, length);
});
$p.c = (function() {
  return new $ac_Z(this.a.slice());
});
function $ac_C(arg) {
  if (((typeof arg) === "number")) {
    this.a = new Uint16Array(arg);
  } else {
    this.a = arg;
  }
}
$p = $ac_C.prototype = new $h_O();
$p.constructor = $ac_C;
$p.j = (function(srcPos, dest, destPos, length) {
  dest.a.set(this.a.subarray(srcPos, ((srcPos + length) | 0)), destPos);
});
$p.c = (function() {
  return new $ac_C(this.a.slice());
});
function $ac_B(arg) {
  if (((typeof arg) === "number")) {
    this.a = new Int8Array(arg);
  } else {
    this.a = arg;
  }
}
$p = $ac_B.prototype = new $h_O();
$p.constructor = $ac_B;
$p.j = (function(srcPos, dest, destPos, length) {
  dest.a.set(this.a.subarray(srcPos, ((srcPos + length) | 0)), destPos);
});
$p.c = (function() {
  return new $ac_B(this.a.slice());
});
function $ac_S(arg) {
  if (((typeof arg) === "number")) {
    this.a = new Int16Array(arg);
  } else {
    this.a = arg;
  }
}
$p = $ac_S.prototype = new $h_O();
$p.constructor = $ac_S;
$p.j = (function(srcPos, dest, destPos, length) {
  dest.a.set(this.a.subarray(srcPos, ((srcPos + length) | 0)), destPos);
});
$p.c = (function() {
  return new $ac_S(this.a.slice());
});
function $ac_I(arg) {
  if (((typeof arg) === "number")) {
    this.a = new Int32Array(arg);
  } else {
    this.a = arg;
  }
}
$p = $ac_I.prototype = new $h_O();
$p.constructor = $ac_I;
$p.j = (function(srcPos, dest, destPos, length) {
  dest.a.set(this.a.subarray(srcPos, ((srcPos + length) | 0)), destPos);
});
$p.c = (function() {
  return new $ac_I(this.a.slice());
});
function $ac_J(arg) {
  if (((typeof arg) === "number")) {
    this.a = new Array(arg);
    for (var i = 0; (i < arg); (i++)) {
      this.a[i] = $L0;
    }
  } else {
    this.a = arg;
  }
}
$p = $ac_J.prototype = new $h_O();
$p.constructor = $ac_J;
$p.j = (function(srcPos, dest, destPos, length) {
  $arraycopyGeneric(this.a, srcPos, dest.a, destPos, length);
});
$p.c = (function() {
  return new $ac_J(this.a.slice());
});
function $ac_F(arg) {
  if (((typeof arg) === "number")) {
    this.a = new Float32Array(arg);
  } else {
    this.a = arg;
  }
}
$p = $ac_F.prototype = new $h_O();
$p.constructor = $ac_F;
$p.j = (function(srcPos, dest, destPos, length) {
  dest.a.set(this.a.subarray(srcPos, ((srcPos + length) | 0)), destPos);
});
$p.c = (function() {
  return new $ac_F(this.a.slice());
});
function $ac_D(arg) {
  if (((typeof arg) === "number")) {
    this.a = new Float64Array(arg);
  } else {
    this.a = arg;
  }
}
$p = $ac_D.prototype = new $h_O();
$p.constructor = $ac_D;
$p.j = (function(srcPos, dest, destPos, length) {
  dest.a.set(this.a.subarray(srcPos, ((srcPos + length) | 0)), destPos);
});
$p.c = (function() {
  return new $ac_D(this.a.slice());
});
function $TypeData() {
  this.C = (void 0);
  this.n = null;
  this.O = null;
  this.B = null;
  this.D = 0;
  this.z = null;
  this.E = "";
  this.L = (void 0);
  this.A = (void 0);
  this.F = (void 0);
  this.w = (void 0);
  this.J = false;
  this.N = "";
  this.X = false;
  this.Y = false;
  this.Z = false;
  this.I = (void 0);
}
$p = $TypeData.prototype;
$p.p = (function(zero, arrayEncodedName, displayName, arrayClass, typedArrayClass) {
  this.n = ({});
  this.z = zero;
  this.E = arrayEncodedName;
  var self = this;
  this.F = ((that) => (that === self));
  this.N = displayName;
  this.X = true;
  this.I = ((obj) => false);
  if ((arrayClass !== (void 0))) {
    this.A = new $TypeData().y(this, arrayClass, typedArrayClass);
  }
  return this;
});
$p.i = (function(kindOrCtor, fullName, ancestors, isInstance) {
  var internalName = Object.getOwnPropertyNames(ancestors)[0];
  this.n = ancestors;
  this.E = (("L" + fullName) + ";");
  this.F = ((that) => (!(!that.n[internalName])));
  this.J = (kindOrCtor === 2);
  this.N = fullName;
  this.Y = (kindOrCtor === 1);
  this.I = (isInstance || ((obj) => (!(!((obj && obj.$classData) && obj.$classData.n[internalName])))));
  if (((typeof kindOrCtor) !== "number")) {
    kindOrCtor.prototype.$classData = this;
  }
  return this;
});
$p.y = (function(componentData, arrayClass, typedArrayClass, isAssignableFromFun) {
  arrayClass.prototype.$classData = this;
  var name = ("[" + componentData.E);
  this.C = arrayClass;
  this.n = ({
    R: 1,
    a: 1
  });
  this.O = componentData;
  this.B = componentData;
  this.D = 1;
  this.E = name;
  this.N = name;
  this.Z = true;
  var self = this;
  this.F = (isAssignableFromFun || ((that) => (self === that)));
  this.w = (typedArrayClass ? ((array) => new arrayClass(new typedArrayClass(array))) : ((array) => new arrayClass(array)));
  this.I = ((obj) => (obj instanceof arrayClass));
  return this;
});
$p.a = (function(componentData) {
  function ArrayClass(arg) {
    if (((typeof arg) === "number")) {
      this.a = new Array(arg);
      for (var i = 0; (i < arg); (i++)) {
        this.a[i] = null;
      }
    } else {
      this.a = arg;
    }
  }
  var $p = ArrayClass.prototype = new $ah_O();
  $p.constructor = ArrayClass;
  $p.j = (function(srcPos, dest, destPos, length) {
    $arraycopyGeneric(this.a, srcPos, dest.a, destPos, length);
  });
  $p.c = (function() {
    return new ArrayClass(this.a.slice());
  });
  $p.$classData = this;
  var arrayBase = (componentData.B || componentData);
  var arrayDepth = (componentData.D + 1);
  var name = ("[" + componentData.E);
  this.C = ArrayClass;
  this.n = ({
    R: 1,
    a: 1
  });
  this.O = componentData;
  this.B = arrayBase;
  this.D = arrayDepth;
  this.E = name;
  this.N = name;
  this.Z = true;
  var isAssignableFromFun = ((that) => {
    var thatDepth = that.D;
    return ((thatDepth === arrayDepth) ? arrayBase.F(that.B) : ((thatDepth > arrayDepth) && (arrayBase === $d_O)));
  });
  this.F = isAssignableFromFun;
  this.w = ((array) => new ArrayClass(array));
  var self = this;
  this.I = ((obj) => {
    var data = (obj && obj.$classData);
    return ((!(!data)) && ((data === self) || isAssignableFromFun(data)));
  });
  return this;
});
$p.r = (function() {
  if ((!this.A)) {
    this.A = new $TypeData().a(this);
  }
  return this.A;
});
$p.l = (function() {
  if ((!this.L)) {
    this.L = new $c_jl_Class(this);
  }
  return this.L;
});
$p.R = (function(that) {
  return ((this === that) || this.F(that));
});
$p.S = (function() {
  return (this.P ? this.P.l() : null);
});
$p.Q = (function() {
  return (this.O ? this.O.l() : null);
});
$p.U = (function(length) {
  if ((this === $d_V)) {
    throw $ct_jl_IllegalArgumentException__(new $c_jl_IllegalArgumentException());
  }
  return new (this.r().C)(length);
});
function $isArrayOf_O(obj, depth) {
  var data = (obj && obj.$classData);
  if ((!data)) {
    return false;
  } else {
    var arrayDepth = data.D;
    return ((arrayDepth === depth) ? (!data.B.X) : (arrayDepth > depth));
  }
}
function $isArrayOf_Z(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && (obj.$classData.B === $d_Z))));
}
function $isArrayOf_C(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && (obj.$classData.B === $d_C))));
}
function $isArrayOf_B(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && (obj.$classData.B === $d_B))));
}
function $isArrayOf_S(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && (obj.$classData.B === $d_S))));
}
function $isArrayOf_I(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && (obj.$classData.B === $d_I))));
}
function $isArrayOf_J(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && (obj.$classData.B === $d_J))));
}
function $isArrayOf_F(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && (obj.$classData.B === $d_F))));
}
function $isArrayOf_D(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && (obj.$classData.B === $d_D))));
}
var $d_O = new $TypeData();
$d_O.n = ({});
$d_O.E = "Ljava.lang.Object;";
$d_O.F = ((that) => (!that.X));
$d_O.N = "java.lang.Object";
$d_O.I = ((obj) => (obj !== null));
$d_O.A = new $TypeData().y($d_O, $ac_O, (void 0), ((that) => {
  var thatDepth = that.D;
  return ((thatDepth === 1) ? (!that.B.X) : (thatDepth > 1));
}));
$c_O.prototype.$classData = $d_O;
var $d_V = new $TypeData().p((void 0), "V", "void", (void 0), (void 0));
var $d_Z = new $TypeData().p(false, "Z", "boolean", $ac_Z, (void 0));
var $d_C = new $TypeData().p(0, "C", "char", $ac_C, Uint16Array);
var $d_B = new $TypeData().p(0, "B", "byte", $ac_B, Int8Array);
var $d_S = new $TypeData().p(0, "S", "short", $ac_S, Int16Array);
var $d_I = new $TypeData().p(0, "I", "int", $ac_I, Int32Array);
var $d_J = new $TypeData().p(null, "J", "long", $ac_J, (void 0));
var $d_F = new $TypeData().p(0.0, "F", "float", $ac_F, Float32Array);
var $d_D = new $TypeData().p(0.0, "D", "double", $ac_D, Float64Array);
function $s_Lexample_Main__main__AT__V(args) {
  $m_Lexample_Main$().h0(args);
}
function $p_Lexample_Main$__setStatus$5__Lorg_scalajs_dom_HTMLElement__T__Z__V($thiz, statusEl$1, msg, isError) {
  statusEl$1.textContent = msg;
  statusEl$1.setAttribute("class", (isError ? "error" : "success"));
}
function $p_Lexample_Main$__render$1__Lexample_GPUDevice__Lexample_GPUCanvasContext__Lexample_GPURenderPipeline__V($thiz, device$1, context$1, pipeline$1) {
  var commandEncoder = device$1.createCommandEncoder();
  var textureView = context$1.getCurrentTexture().createView();
  var _2 = ({
    "r": 0.1,
    "g": 0.1,
    "b": 0.15,
    "a": 1.0
  });
  var _2$1 = [({
    "view": textureView,
    "loadOp": "clear",
    "storeOp": "store",
    "clearValue": _2
  })];
  var renderPass = commandEncoder.beginRenderPass(({
    "colorAttachments": _2$1
  }));
  renderPass.setPipeline(pipeline$1);
  renderPass.draw(3);
  renderPass.end();
  device$1.queue.submit([commandEncoder.finish()]);
}
/** @constructor */
function $c_Lexample_Main$() {
}
$p = $c_Lexample_Main$.prototype = new $h_O();
$p.constructor = $c_Lexample_Main$;
/** @constructor */
function $h_Lexample_Main$() {
}
$h_Lexample_Main$.prototype = $p;
$p.h0 = (function(args) {
  var statusEl = document.getElementById("status");
  var canvas = document.getElementById("canvas");
  matchResult1: {
    var x = $m_Lexample_WebGPUHelpers$().gL();
    var x1 = ((x === (void 0)) ? $m_s_None$() : new $c_s_Some(x));
    if (($m_s_None$() === x1)) {
      $p_Lexample_Main$__setStatus$5__Lorg_scalajs_dom_HTMLElement__T__Z__V(this, statusEl, "WebGPU is not supported in this browser", true);
      break matchResult1;
    }
    if ((x1 instanceof $c_s_Some)) {
      var gpu = x1.cE;
      $p_Lexample_Main$__setStatus$5__Lorg_scalajs_dom_HTMLElement__T__Z__V(this, statusEl, "WebGPU available, initializing...", false);
      this.gU(gpu, canvas, new $c_sr_AbstractFunction2_$$Lambda$286cbfc6187197affcadc8465aaec93d6b7d20dc(((v1$2, v2$2) => {
        $p_Lexample_Main$__setStatus$5__Lorg_scalajs_dom_HTMLElement__T__Z__V(this, statusEl, v1$2, (!(!v2$2)));
      })));
      break matchResult1;
    }
    throw new $c_s_MatchError(x1);
  }
});
$p.gU = (function(gpu, canvas, setStatus) {
  var result = $m_sjs_js_Thenable$ThenableOps$().fT(gpu.requestAdapter()).gE(new $c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28(((adapterOrNull$2) => {
    var this$3 = $m_s_Option$().fw(adapterOrNull$2);
    if (this$3.n()) {
      throw $ct_jl_Exception__T__(new $c_jl_Exception(), "No adapter found");
    }
    var adapter = this$3.aU();
    return $m_sjs_js_Thenable$ThenableOps$().fT(adapter.requestDevice()).h1(new $c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28(((device$2) => new $c_T2(adapter, device$2))), $m_s_concurrent_ExecutionContext$().dT());
  })), $m_s_concurrent_ExecutionContext$().dT());
  result.fB(new $c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28(((x$1$3) => {
    matchResult2: {
      if ((x$1$3 !== null)) {
        var device = x$1$3.ai;
        setStatus.ci("WebGPU initialized! Rendering triangle...", false);
        this.hf(device, canvas, setStatus);
        break matchResult2;
      }
      throw new $c_s_MatchError(x$1$3);
    }
  })), $m_s_concurrent_ExecutionContext$().dT());
  result.gD().fB(new $c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28(((e$3) => {
    setStatus.ci(("Failed to initialize WebGPU: " + e$3.dp()), true);
  })), $m_s_concurrent_ExecutionContext$().dT());
});
$p.hf = (function(device, canvas, setStatus) {
  var triangleShader = new $c_Lgpu_ShaderDef("\n  let positions = array<vec2<f32>, 3>(\n    vec2<f32>(0.0, 0.5),\n    vec2<f32>(-0.5, -0.5),\n    vec2<f32>(0.5, -0.5)\n  );\n  let colors = array<vec4<f32>, 3>(\n    vec4<f32>(1.0, 0.0, 0.0, 1.0),\n    vec4<f32>(0.0, 1.0, 0.0, 1.0),\n    vec4<f32>(0.0, 0.0, 1.0, 1.0)\n  );\n  let idx = in.vertexIndex;\n  out.position = vec4<f32>(positions[idx], 0.0, 1.0);\n  out.color = colors[idx];", "\n  out.color = in.color;");
  var wgslCode = $p_Lgpu_ShaderDef__buildWGSL__T__T__T__T__T__T__T(triangleShader, $p_Lgpu_derive$__generateCombinedStructFromLists__T__sci_List__sci_List__sci_List__T($m_Lgpu_derive$(), "VertexInput", $m_sci_Nil$(), $m_sci_Nil$(), new $c_sci_$colon$colon(new $c_T3("vertexIndex", "vertex_index", "u32"), $m_sci_Nil$())), $p_Lgpu_derive$__generateCombinedStructFromLists__T__sci_List__sci_List__sci_List__T($m_Lgpu_derive$(), "VertexOutput", new $c_sci_$colon$colon("color", $m_sci_Nil$()), new $c_sci_$colon$colon("vec4<f32>", $m_sci_Nil$()), new $c_sci_$colon$colon(new $c_T3("position", "position", "vec4<f32>"), $m_sci_Nil$())), $p_Lgpu_derive$__generateCombinedStructFromLists__T__sci_List__sci_List__sci_List__T($m_Lgpu_derive$(), "FragmentOutput", new $c_sci_$colon$colon("color", $m_sci_Nil$()), new $c_sci_$colon$colon("vec4<f32>", $m_sci_Nil$()), $m_sci_Nil$()), "", triangleShader.cW, triangleShader.cV);
  console.log(("Generated WGSL:\n" + wgslCode));
  var shaderModule = device.createShaderModule(({
    "code": wgslCode
  }));
  var context = $m_Lexample_WebGPUHelpers$().gM(canvas);
  context.configure(({
    "device": device,
    "format": "bgra8unorm"
  }));
  var _2 = ({
    "module": shaderModule,
    "entryPoint": "vs_main"
  });
  var _2$1 = [({
    "format": "bgra8unorm"
  })];
  var _2$2 = ({
    "module": shaderModule,
    "entryPoint": "fs_main",
    "targets": _2$1
  });
  var _2$3 = ({
    "topology": "triangle-list"
  });
  var $x_1 = device.createRenderPipeline(({
    "layout": "auto",
    "vertex": _2,
    "fragment": _2$2,
    "primitive": _2$3
  }));
  $p_Lexample_Main$__render$1__Lexample_GPUDevice__Lexample_GPUCanvasContext__Lexample_GPURenderPipeline__V(this, device, context, $x_1);
  setStatus.ci("Triangle rendered successfully!", false);
});
var $d_Lexample_Main$ = new $TypeData().i($c_Lexample_Main$, "example.Main$", ({
  b9: 1
}));
var $n_Lexample_Main$;
function $m_Lexample_Main$() {
  if ((!$n_Lexample_Main$)) {
    $n_Lexample_Main$ = new $c_Lexample_Main$();
  }
  return $n_Lexample_Main$;
}
/** @constructor */
function $c_Lexample_WebGPUHelpers$() {
}
$p = $c_Lexample_WebGPUHelpers$.prototype = new $h_O();
$p.constructor = $c_Lexample_WebGPUHelpers$;
/** @constructor */
function $h_Lexample_WebGPUHelpers$() {
}
$h_Lexample_WebGPUHelpers$.prototype = $p;
$p.gL = (function() {
  return window.navigator.gpu;
});
$p.gM = (function(canvas) {
  return canvas.getContext("webgpu");
});
var $d_Lexample_WebGPUHelpers$ = new $TypeData().i($c_Lexample_WebGPUHelpers$, "example.WebGPUHelpers$", ({
  ba: 1
}));
var $n_Lexample_WebGPUHelpers$;
function $m_Lexample_WebGPUHelpers$() {
  if ((!$n_Lexample_WebGPUHelpers$)) {
    $n_Lexample_WebGPUHelpers$ = new $c_Lexample_WebGPUHelpers$();
  }
  return $n_Lexample_WebGPUHelpers$;
}
function $p_Lgpu_derive$__generateCombinedStructFromLists__T__sci_List__sci_List__sci_List__T($thiz, structName, locNames, locTypes, builtins) {
  var this$2 = $f_sc_StrictOptimizedIterableOps__zipWithIndex__O($f_sc_StrictOptimizedIterableOps__zip__sc_IterableOnce__O(locNames, locTypes));
  var f = ((x$1$2) => {
    if ((x$1$2 !== null)) {
      var x11 = x$1$2.aw;
      if ((x11 !== null)) {
        var name = x11.aw;
        var typ = x11.ai;
        return (((((("  @location(" + (x$1$2.ai | 0)) + ") ") + name) + ": ") + typ) + ",");
      }
    }
    throw new $c_s_MatchError(x$1$2);
  });
  if ((this$2 === $m_sci_Nil$())) {
    var $x_1 = $m_sci_Nil$();
  } else {
    var x0 = this$2.am();
    var h = new $c_sci_$colon$colon(f(x0), $m_sci_Nil$());
    var t = h;
    var rest = this$2.P();
    while ((rest !== $m_sci_Nil$())) {
      var x0$1 = rest.am();
      var nx = new $c_sci_$colon$colon(f(x0$1), $m_sci_Nil$());
      t.aY = nx;
      t = nx;
      rest = rest.P();
    }
    var $x_1 = h;
  }
  var locationFields = $x_1;
  var f$1 = ((x$1$2$1) => {
    if ((x$1$2$1 !== null)) {
      var name$1 = x$1$2$1.cF;
      var builtin = x$1$2$1.cG;
      var typ$1 = x$1$2$1.cH;
      return (((((("  @builtin(" + builtin) + ") ") + name$1) + ": ") + typ$1) + ",");
    }
    throw new $c_s_MatchError(x$1$2$1);
  });
  if ((builtins === $m_sci_Nil$())) {
    var $x_2 = $m_sci_Nil$();
  } else {
    var x0$2 = builtins.am();
    var h$1 = new $c_sci_$colon$colon(f$1(x0$2), $m_sci_Nil$());
    var t$1 = h$1;
    var rest$1 = builtins.P();
    while ((rest$1 !== $m_sci_Nil$())) {
      var x0$3 = rest$1.am();
      var nx$1 = new $c_sci_$colon$colon(f$1(x0$3), $m_sci_Nil$());
      t$1.aY = nx$1;
      t$1 = nx$1;
      rest$1 = rest$1.P();
    }
    var $x_2 = h$1;
  }
  var builtinFields = $x_2;
  var allFields = locationFields.gd(builtinFields);
  return (allFields.n() ? "" : (((("struct " + structName) + " {\n") + $f_sc_IterableOnceOps__mkString__T__T__T__T(allFields, "", "\n", "")) + "\n}"));
}
/** @constructor */
function $c_Lgpu_derive$() {
}
$p = $c_Lgpu_derive$.prototype = new $h_O();
$p.constructor = $c_Lgpu_derive$;
/** @constructor */
function $h_Lgpu_derive$() {
}
$h_Lgpu_derive$.prototype = $p;
var $d_Lgpu_derive$ = new $TypeData().i($c_Lgpu_derive$, "gpu.derive$", ({
  bb: 1
}));
var $n_Lgpu_derive$;
function $m_Lgpu_derive$() {
  if ((!$n_Lgpu_derive$)) {
    $n_Lgpu_derive$ = new $c_Lgpu_derive$();
  }
  return $n_Lgpu_derive$;
}
var $d_jl_Runnable = new $TypeData().i(1, "java.lang.Runnable", ({
  a6: 1
}));
function $p_jl_StackTrace$__normalizedLinesToStackTrace__O__Ajl_StackTraceElement($thiz, lines) {
  var NormalizedFrameLine = $m_jl_StackTrace$StringRE$().br("^([^@]*)@(.*?):([0-9]+)(?::([0-9]+))?$");
  var trace = [];
  var i = 0;
  while ((i < (lines.length | 0))) {
    var line = lines[i];
    if ((line !== "")) {
      var mtch = NormalizedFrameLine.exec(line);
      if ((mtch !== null)) {
        var classAndMethodName = $p_jl_StackTrace$__extractClassMethod__T__O($thiz, mtch[1]);
        var $x_5 = classAndMethodName[0];
        var $x_4 = classAndMethodName[1];
        var $x_3 = mtch[2];
        var x$2 = mtch[3];
        var $x_2 = parseInt(x$2);
        var x$3 = mtch[4];
        var $x_1 = trace.push(new $c_jl_StackTraceElement($x_5, $x_4, $x_3, ($x_2 | 0), ((x$3 !== (void 0)) ? (parseInt(x$3) | 0) : (-1))));
      } else {
        (trace.push(new $c_jl_StackTraceElement("<jscode>", line, null, (-1), (-1))) | 0);
      }
    }
    i = ((1 + i) | 0);
  }
  var len = (trace.length | 0);
  var result = new ($d_jl_StackTraceElement.r().C)(len);
  i = 0;
  while ((i < len)) {
    result.a[i] = trace[i];
    i = ((1 + i) | 0);
  }
  return result;
}
function $p_jl_StackTrace$__extractClassMethod__T__O($thiz, functionName) {
  var PatBC = $m_jl_StackTrace$StringRE$().br("^(?:Object\\.|\\[object Object\\]\\.|Module\\.)?\\$[bc]_([^\\.]+)(?:\\.prototype)?\\.([^\\.]+)$");
  var PatS = $m_jl_StackTrace$StringRE$().br("^(?:Object\\.|\\[object Object\\]\\.|Module\\.)?\\$(?:ps?|s|f)_((?:_[^_]|[^_])+)__([^\\.]+)$");
  var PatCT = $m_jl_StackTrace$StringRE$().br("^(?:Object\\.|\\[object Object\\]\\.|Module\\.)?\\$ct_((?:_[^_]|[^_])+)__([^\\.]*)$");
  var PatN = $m_jl_StackTrace$StringRE$().br("^new (?:Object\\.|\\[object Object\\]\\.|Module\\.)?\\$c_([^\\.]+)$");
  var PatM = $m_jl_StackTrace$StringRE$().br("^(?:Object\\.|\\[object Object\\]\\.|Module\\.)?\\$m_([^\\.]+)$");
  var matchBC = PatBC.exec(functionName);
  var matchBCOrS = ((matchBC !== null) ? matchBC : PatS.exec(functionName));
  if ((matchBCOrS !== null)) {
    return [$p_jl_StackTrace$__decodeClassName__T__T($thiz, matchBCOrS[1]), $p_jl_StackTrace$__decodeMethodName__T__T($thiz, matchBCOrS[2])];
  } else {
    var matchCT = PatCT.exec(functionName);
    var matchCTOrN = ((matchCT !== null) ? matchCT : PatN.exec(functionName));
    if ((matchCTOrN !== null)) {
      return [$p_jl_StackTrace$__decodeClassName__T__T($thiz, matchCTOrN[1]), "<init>"];
    } else {
      var matchM = PatM.exec(functionName);
      return ((matchM !== null) ? [$p_jl_StackTrace$__decodeClassName__T__T($thiz, matchM[1]), "<clinit>"] : ["<jscode>", functionName]);
    }
  }
}
function $p_jl_StackTrace$__decodeClassName__T__T($thiz, encodedName) {
  var dict = $p_jl_StackTrace$__decompressedClasses__O($thiz);
  if ((!(!$m_jl_Utils$Cache$().e4.call(dict, encodedName)))) {
    var dict$1 = $p_jl_StackTrace$__decompressedClasses__O($thiz);
    var base = dict$1[encodedName];
  } else {
    var base = $p_jl_StackTrace$__loop$1__I__T__T($thiz, 0, encodedName);
  }
  var this$3 = base.split("_").join(".");
  return this$3.split("\uff3f").join("_");
}
function $p_jl_StackTrace$__decompressedClasses$lzycompute__O($thiz) {
  if (((((1 & $thiz.b5) << 24) >> 24) === 0)) {
    var dict = ({});
    dict.O = "java_lang_Object";
    dict.T = "java_lang_String";
    var index = 0;
    while ((index <= 22)) {
      if ((index >= 2)) {
        var key = ("T" + index);
        var value = ("scala_Tuple" + index);
        dict[key] = value;
      }
      var key$1 = ("F" + index);
      var value$1 = ("scala_Function" + index);
      dict[key$1] = value$1;
      index = ((1 + index) | 0);
    }
    $thiz.e0 = dict;
    $thiz.b5 = (((1 | $thiz.b5) << 24) >> 24);
  }
  return $thiz.e0;
}
function $p_jl_StackTrace$__decompressedClasses__O($thiz) {
  return (((((1 & $thiz.b5) << 24) >> 24) === 0) ? $p_jl_StackTrace$__decompressedClasses$lzycompute__O($thiz) : $thiz.e0);
}
function $p_jl_StackTrace$__decompressedPrefixes$lzycompute__O($thiz) {
  if (((((2 & $thiz.b5) << 24) >> 24) === 0)) {
    var dict = ({});
    dict.sjsr_ = "scala_scalajs_runtime_";
    dict.sjs_ = "scala_scalajs_";
    dict.sci_ = "scala_collection_immutable_";
    dict.scm_ = "scala_collection_mutable_";
    dict.scg_ = "scala_collection_generic_";
    dict.sc_ = "scala_collection_";
    dict.sr_ = "scala_runtime_";
    dict.s_ = "scala_";
    dict.jl_ = "java_lang_";
    dict.ju_ = "java_util_";
    $thiz.e1 = dict;
    $thiz.b5 = (((2 | $thiz.b5) << 24) >> 24);
  }
  return $thiz.e1;
}
function $p_jl_StackTrace$__decompressedPrefixes__O($thiz) {
  return (((((2 & $thiz.b5) << 24) >> 24) === 0) ? $p_jl_StackTrace$__decompressedPrefixes$lzycompute__O($thiz) : $thiz.e1);
}
function $p_jl_StackTrace$__compressedPrefixes$lzycompute__O($thiz) {
  if (((((4 & $thiz.b5) << 24) >> 24) === 0)) {
    $thiz.dZ = Object.keys($p_jl_StackTrace$__decompressedPrefixes__O($thiz));
    $thiz.b5 = (((4 | $thiz.b5) << 24) >> 24);
  }
  return $thiz.dZ;
}
function $p_jl_StackTrace$__compressedPrefixes__O($thiz) {
  return (((((4 & $thiz.b5) << 24) >> 24) === 0) ? $p_jl_StackTrace$__compressedPrefixes$lzycompute__O($thiz) : $thiz.dZ);
}
function $p_jl_StackTrace$__decodeMethodName__T__T($thiz, encodedName) {
  if ((!(!encodedName.startsWith("init___")))) {
    return "<init>";
  } else {
    var methodNameLen = (encodedName.indexOf("__") | 0);
    return ((methodNameLen < 0) ? encodedName : encodedName.substring(0, methodNameLen));
  }
}
function $p_jl_StackTrace$__normalizeStackTraceLines__O__O($thiz, e) {
  return ((!(!(!(!(!e))))) ? [] : ((!(!(!(!(e.arguments && e.stack))))) ? $p_jl_StackTrace$__extractChrome__O__O($thiz, e) : ((!(!(!(!(e.stack && e.sourceURL))))) ? $p_jl_StackTrace$__extractSafari__O__O($thiz, e) : ((!(!(!(!(e.stack && e.number))))) ? $p_jl_StackTrace$__extractIE__O__O($thiz, e) : ((!(!(!(!(e.stack && e.fileName))))) ? $p_jl_StackTrace$__extractFirefox__O__O($thiz, e) : ((!(!(!(!(e.message && e["opera#sourceloc"]))))) ? ((!(!(!(!(!e.stacktrace))))) ? $p_jl_StackTrace$__extractOpera9__O__O($thiz, e) : ((!(!(!(!((e.message.indexOf("\n") > (-1.0)) && (e.message.split("\n").length > e.stacktrace.split("\n").length)))))) ? $p_jl_StackTrace$__extractOpera9__O__O($thiz, e) : $p_jl_StackTrace$__extractOpera10a__O__O($thiz, e))) : ((!(!(!(!((e.message && e.stack) && e.stacktrace))))) ? ((!(!(!(!(e.stacktrace.indexOf("called from line") < 0.0))))) ? $p_jl_StackTrace$__extractOpera10b__O__O($thiz, e) : $p_jl_StackTrace$__extractOpera11__O__O($thiz, e)) : ((!(!(!(!(e.stack && (!e.fileName)))))) ? $p_jl_StackTrace$__extractChrome__O__O($thiz, e) : $p_jl_StackTrace$__extractOther__O__O($thiz, e)))))))));
}
function $p_jl_StackTrace$__extractChrome__O__O($thiz, e) {
  return (e.stack + "\n").replace($m_jl_StackTrace$StringRE$().br("^[\\s\\S]+?\\s+at\\s+"), " at ").replace($m_jl_StackTrace$StringRE$().aV("^\\s+(at eval )?at\\s+", "gm"), "").replace($m_jl_StackTrace$StringRE$().aV("^([^\\(]+?)([\\n])", "gm"), "{anonymous}() ($1)$2").replace($m_jl_StackTrace$StringRE$().aV("^Object.<anonymous>\\s*\\(([^\\)]+)\\)", "gm"), "{anonymous}() ($1)").replace($m_jl_StackTrace$StringRE$().aV("^([^\\(]+|\\{anonymous\\}\\(\\)) \\((.+)\\)$", "gm"), "$1@$2").split("\n").slice(0, (-1));
}
function $p_jl_StackTrace$__extractFirefox__O__O($thiz, e) {
  return e.stack.replace($m_jl_StackTrace$StringRE$().aV("(?:\\n@:0)?\\s+$", "m"), "").replace($m_jl_StackTrace$StringRE$().aV("^(?:\\((\\S*)\\))?@", "gm"), "{anonymous}($1)@").split("\n");
}
function $p_jl_StackTrace$__extractIE__O__O($thiz, e) {
  var qual$1 = e.stack.replace($m_jl_StackTrace$StringRE$().aV("^\\s*at\\s+(.*)$", "gm"), "$1").replace($m_jl_StackTrace$StringRE$().aV("^Anonymous function\\s+", "gm"), "{anonymous}() ").replace($m_jl_StackTrace$StringRE$().aV("^([^\\(]+|\\{anonymous\\}\\(\\))\\s+\\((.+)\\)$", "gm"), "$1@$2").split("\n");
  return qual$1.slice(1);
}
function $p_jl_StackTrace$__extractSafari__O__O($thiz, e) {
  return e.stack.replace($m_jl_StackTrace$StringRE$().aV("\\[native code\\]\\n", "m"), "").replace($m_jl_StackTrace$StringRE$().aV("^(?=\\w+Error\\:).*$\\n", "m"), "").replace($m_jl_StackTrace$StringRE$().aV("^@", "gm"), "{anonymous}()@").split("\n");
}
function $p_jl_StackTrace$__extractOpera9__O__O($thiz, e) {
  var lineRE = $m_jl_StackTrace$StringRE$().aV("Line (\\d+).*script (?:in )?(\\S+)", "i");
  var lines = e.message.split("\n");
  var result = [];
  var i = 2;
  var len = (lines.length | 0);
  while ((i < len)) {
    var mtch = lineRE.exec(lines[i]);
    if ((mtch !== null)) {
      (result.push(((("{anonymous}()@" + mtch[2]) + ":") + mtch[1])) | 0);
    }
    i = ((2 + i) | 0);
  }
  return result;
}
function $p_jl_StackTrace$__extractOpera10a__O__O($thiz, e) {
  var lineRE = $m_jl_StackTrace$StringRE$().aV("Line (\\d+).*script (?:in )?(\\S+)(?:: In function (\\S+))?$", "i");
  var lines = e.stacktrace.split("\n");
  var result = [];
  var i = 0;
  var len = (lines.length | 0);
  while ((i < len)) {
    var mtch = lineRE.exec(lines[i]);
    if ((mtch !== null)) {
      var x = mtch[3];
      var fnName = ((x !== (void 0)) ? x : "{anonymous}");
      (result.push(((((fnName + "()@") + mtch[2]) + ":") + mtch[1])) | 0);
    }
    i = ((2 + i) | 0);
  }
  return result;
}
function $p_jl_StackTrace$__extractOpera10b__O__O($thiz, e) {
  var lineRE = $m_jl_StackTrace$StringRE$().br("^(.*)@(.+):(\\d+)$");
  var lines = e.stacktrace.split("\n");
  var result = [];
  var i = 0;
  var len = (lines.length | 0);
  while ((i < len)) {
    var mtch = lineRE.exec(lines[i]);
    if ((mtch !== null)) {
      var x = mtch[1];
      var fnName = ((x !== (void 0)) ? (x + "()") : "global code");
      (result.push(((((fnName + "@") + mtch[2]) + ":") + mtch[3])) | 0);
    }
    i = ((1 + i) | 0);
  }
  return result;
}
function $p_jl_StackTrace$__extractOpera11__O__O($thiz, e) {
  var lineRE = $m_jl_StackTrace$StringRE$().br("^.*line (\\d+), column (\\d+)(?: in (.+))? in (\\S+):$");
  var lines = e.stacktrace.split("\n");
  var result = [];
  var i = 0;
  var len = (lines.length | 0);
  while ((i < len)) {
    var mtch = lineRE.exec(lines[i]);
    if ((mtch !== null)) {
      var location = ((((mtch[4] + ":") + mtch[1]) + ":") + mtch[2]);
      var x$3 = mtch[2];
      var fnName0 = ((x$3 !== (void 0)) ? x$3 : "global code");
      var fnName = fnName0.replace($m_jl_StackTrace$StringRE$().br("<anonymous function: (\\S+)>"), "$1").replace($m_jl_StackTrace$StringRE$().br("<anonymous function>"), "{anonymous}");
      (result.push(((fnName + "@") + location)) | 0);
    }
    i = ((2 + i) | 0);
  }
  return result;
}
function $p_jl_StackTrace$__extractOther__O__O($thiz, e) {
  return [];
}
function $p_jl_StackTrace$__loop$1__I__T__T($thiz, i, encodedName$1) {
  while (true) {
    if ((i < ($p_jl_StackTrace$__compressedPrefixes__O($thiz).length | 0))) {
      var prefix = $p_jl_StackTrace$__compressedPrefixes__O($thiz)[i];
      if ((!(!encodedName$1.startsWith(prefix)))) {
        var dict = $p_jl_StackTrace$__decompressedPrefixes__O($thiz);
        return (("" + dict[prefix]) + encodedName$1.substring(prefix.length));
      } else {
        i = ((1 + i) | 0);
      }
    } else {
      return ((!(!encodedName$1.startsWith("L"))) ? encodedName$1.substring(1) : encodedName$1);
    }
  }
}
/** @constructor */
function $c_jl_StackTrace$() {
  this.e0 = null;
  this.e1 = null;
  this.dZ = null;
  this.b5 = 0;
}
$p = $c_jl_StackTrace$.prototype = new $h_O();
$p.constructor = $c_jl_StackTrace$;
/** @constructor */
function $h_jl_StackTrace$() {
}
$h_jl_StackTrace$.prototype = $p;
$p.gA = (function(jsError) {
  return $p_jl_StackTrace$__normalizedLinesToStackTrace__O__Ajl_StackTraceElement(this, $p_jl_StackTrace$__normalizeStackTraceLines__O__O(this, jsError));
});
var $d_jl_StackTrace$ = new $TypeData().i($c_jl_StackTrace$, "java.lang.StackTrace$", ({
  bz: 1
}));
var $n_jl_StackTrace$;
function $m_jl_StackTrace$() {
  if ((!$n_jl_StackTrace$)) {
    $n_jl_StackTrace$ = new $c_jl_StackTrace$();
  }
  return $n_jl_StackTrace$;
}
/** @constructor */
function $c_jl_StackTrace$StringRE$() {
}
$p = $c_jl_StackTrace$StringRE$.prototype = new $h_O();
$p.constructor = $c_jl_StackTrace$StringRE$;
/** @constructor */
function $h_jl_StackTrace$StringRE$() {
}
$h_jl_StackTrace$StringRE$.prototype = $p;
$p.br = (function(this$) {
  return new RegExp(this$);
});
$p.aV = (function(this$, mods) {
  return new RegExp(this$, mods);
});
var $d_jl_StackTrace$StringRE$ = new $TypeData().i($c_jl_StackTrace$StringRE$, "java.lang.StackTrace$StringRE$", ({
  bA: 1
}));
var $n_jl_StackTrace$StringRE$;
function $m_jl_StackTrace$StringRE$() {
  if ((!$n_jl_StackTrace$StringRE$)) {
    $n_jl_StackTrace$StringRE$ = new $c_jl_StackTrace$StringRE$();
  }
  return $n_jl_StackTrace$StringRE$;
}
/** @constructor */
function $c_jl_System$Streams$() {
  this.cD = null;
  $n_jl_System$Streams$ = this;
  this.cD = new $c_jl_JSConsoleBasedPrintStream(true);
}
$p = $c_jl_System$Streams$.prototype = new $h_O();
$p.constructor = $c_jl_System$Streams$;
/** @constructor */
function $h_jl_System$Streams$() {
}
$h_jl_System$Streams$.prototype = $p;
var $d_jl_System$Streams$ = new $TypeData().i($c_jl_System$Streams$, "java.lang.System$Streams$", ({
  bD: 1
}));
var $n_jl_System$Streams$;
function $m_jl_System$Streams$() {
  if ((!$n_jl_System$Streams$)) {
    $n_jl_System$Streams$ = new $c_jl_System$Streams$();
  }
  return $n_jl_System$Streams$;
}
function $p_jl_System$SystemProperties$__loadSystemProperties__O($thiz) {
  var result = ({});
  result["java.version"] = "1.8";
  result["java.vm.specification.version"] = "1.8";
  result["java.vm.specification.vendor"] = "Oracle Corporation";
  result["java.vm.specification.name"] = "Java Virtual Machine Specification";
  result["java.vm.name"] = "Scala.js";
  result["java.vm.version"] = "1.20.1";
  result["java.specification.version"] = "1.8";
  result["java.specification.vendor"] = "Oracle Corporation";
  result["java.specification.name"] = "Java Platform API Specification";
  result["file.separator"] = "/";
  result["path.separator"] = ":";
  result["line.separator"] = "\n";
  return result;
}
/** @constructor */
function $c_jl_System$SystemProperties$() {
  this.e2 = null;
  this.eH = null;
  $n_jl_System$SystemProperties$ = this;
  this.e2 = $p_jl_System$SystemProperties$__loadSystemProperties__O(this);
  this.eH = null;
}
$p = $c_jl_System$SystemProperties$.prototype = new $h_O();
$p.constructor = $c_jl_System$SystemProperties$;
/** @constructor */
function $h_jl_System$SystemProperties$() {
}
$h_jl_System$SystemProperties$.prototype = $p;
$p.ew = (function(key, default$1) {
  if ((this.e2 !== null)) {
    var dict = this.e2;
    return ((!(!$m_jl_Utils$Cache$().e4.call(dict, key))) ? dict[key] : default$1);
  } else {
    return this.eH.ew(key, default$1);
  }
});
var $d_jl_System$SystemProperties$ = new $TypeData().i($c_jl_System$SystemProperties$, "java.lang.System$SystemProperties$", ({
  bE: 1
}));
var $n_jl_System$SystemProperties$;
function $m_jl_System$SystemProperties$() {
  if ((!$n_jl_System$SystemProperties$)) {
    $n_jl_System$SystemProperties$ = new $c_jl_System$SystemProperties$();
  }
  return $n_jl_System$SystemProperties$;
}
/** @constructor */
function $c_jl_ThreadLocal() {
  this.e3 = false;
  this.eI = null;
  this.e3 = false;
}
$p = $c_jl_ThreadLocal.prototype = new $h_O();
$p.constructor = $c_jl_ThreadLocal;
/** @constructor */
function $h_jl_ThreadLocal() {
}
$h_jl_ThreadLocal.prototype = $p;
$p.aU = (function() {
  if ((!this.e3)) {
    this.du(null);
  }
  return this.eI;
});
$p.du = (function(o) {
  this.eI = o;
  this.e3 = true;
});
var $d_jl_ThreadLocal = new $TypeData().i($c_jl_ThreadLocal, "java.lang.ThreadLocal", ({
  bG: 1
}));
/** @constructor */
function $c_jl_Utils$Cache$() {
  this.e4 = null;
  $n_jl_Utils$Cache$ = this;
  this.e4 = Object.prototype.hasOwnProperty;
}
$p = $c_jl_Utils$Cache$.prototype = new $h_O();
$p.constructor = $c_jl_Utils$Cache$;
/** @constructor */
function $h_jl_Utils$Cache$() {
}
$h_jl_Utils$Cache$.prototype = $p;
var $d_jl_Utils$Cache$ = new $TypeData().i($c_jl_Utils$Cache$, "java.lang.Utils$Cache$", ({
  bI: 1
}));
var $n_jl_Utils$Cache$;
function $m_jl_Utils$Cache$() {
  if ((!$n_jl_Utils$Cache$)) {
    $n_jl_Utils$Cache$ = new $c_jl_Utils$Cache$();
  }
  return $n_jl_Utils$Cache$;
}
function $f_jl_Void__equals__O__Z($thiz, that) {
  return ($thiz === that);
}
function $f_jl_Void__hashCode__I($thiz) {
  return 0;
}
function $f_jl_Void__toString__T($thiz) {
  return "undefined";
}
var $d_jl_Void = new $TypeData().i(0, "java.lang.Void", ({
  bJ: 1
}), ((x) => (x === (void 0))));
function $p_jl_reflect_Array$__mismatch__O__E($thiz, array) {
  throw $ct_jl_IllegalArgumentException__T__(new $c_jl_IllegalArgumentException(), "argument type mismatch");
}
/** @constructor */
function $c_jl_reflect_Array$() {
}
$p = $c_jl_reflect_Array$.prototype = new $h_O();
$p.constructor = $c_jl_reflect_Array$;
/** @constructor */
function $h_jl_reflect_Array$() {
}
$h_jl_reflect_Array$.prototype = $p;
$p.dS = (function(array) {
  return ((array instanceof $ac_O) ? array.a.length : ((array instanceof $ac_Z) ? array.a.length : ((array instanceof $ac_C) ? array.a.length : ((array instanceof $ac_B) ? array.a.length : ((array instanceof $ac_S) ? array.a.length : ((array instanceof $ac_I) ? array.a.length : ((array instanceof $ac_J) ? array.a.length : ((array instanceof $ac_F) ? array.a.length : ((array instanceof $ac_D) ? array.a.length : $p_jl_reflect_Array$__mismatch__O__E(this, array))))))))));
});
var $d_jl_reflect_Array$ = new $TypeData().i($c_jl_reflect_Array$, "java.lang.reflect.Array$", ({
  bK: 1
}));
var $n_jl_reflect_Array$;
function $m_jl_reflect_Array$() {
  if ((!$n_jl_reflect_Array$)) {
    $n_jl_reflect_Array$ = new $c_jl_reflect_Array$();
  }
  return $n_jl_reflect_Array$;
}
/** @constructor */
function $c_ju_Arrays$() {
}
$p = $c_ju_Arrays$.prototype = new $h_O();
$p.constructor = $c_ju_Arrays$;
/** @constructor */
function $h_ju_Arrays$() {
}
$h_ju_Arrays$.prototype = $p;
$p.gj = (function(a, key) {
  var startIndex = 0;
  var endIndex = a.a.length;
  while (true) {
    if ((startIndex === endIndex)) {
      return (((-1) - startIndex) | 0);
    } else {
      var mid = ((((startIndex + endIndex) | 0) >>> 1) | 0);
      var elem = a.a[mid];
      var cmp = ((key === elem) ? 0 : ((key < elem) ? (-1) : 1));
      if ((cmp < 0)) {
        endIndex = mid;
      } else if ((cmp === 0)) {
        return mid;
      } else {
        startIndex = ((1 + mid) | 0);
      }
    }
  }
});
$p.gw = (function(a, b) {
  if ((a === b)) {
    return true;
  }
  if (((a === null) || (b === null))) {
    return false;
  }
  var len = a.a.length;
  if ((b.a.length !== len)) {
    return false;
  }
  var i = 0;
  while ((i !== len)) {
    var i$1 = i;
    var $x_1 = a.a[i$1];
    var i$2 = i;
    if ((!($x_1 === b.a[i$2]))) {
      return false;
    }
    i = ((1 + i) | 0);
  }
  return true;
});
$p.G = (function(original, newLength) {
  if ((newLength < 0)) {
    throw new $c_jl_NegativeArraySizeException();
  }
  var b = original.a.length;
  var copyLength = ((newLength < b) ? newLength : b);
  var ret = $objectGetClass(original).bh.Q().bh.U(newLength);
  original.j(0, ret, 0, copyLength);
  return ret;
});
$p.O = (function(original, from, to) {
  if ((from > to)) {
    throw $ct_jl_IllegalArgumentException__T__(new $c_jl_IllegalArgumentException(), ((from + " > ") + to));
  }
  var len = original.a.length;
  var retLength = ((to - from) | 0);
  var b = ((len - from) | 0);
  var copyLength = ((retLength < b) ? retLength : b);
  var ret = $objectGetClass(original).bh.Q().bh.U(retLength);
  original.j(from, ret, 0, copyLength);
  return ret;
});
var $d_ju_Arrays$ = new $TypeData().i($c_ju_Arrays$, "java.util.Arrays$", ({
  bL: 1
}));
var $n_ju_Arrays$;
function $m_ju_Arrays$() {
  if ((!$n_ju_Arrays$)) {
    $n_ju_Arrays$ = new $c_ju_Arrays$();
  }
  return $n_ju_Arrays$;
}
function $s_RTLong__remainderUnsigned__RTLong__RTLong__RTLong(a, b) {
  var this$1 = $m_RTLong$();
  return new $c_RTLong(this$1.he(a.f, a.g, b.f, b.g), this$1.s);
}
function $s_RTLong__remainder__RTLong__RTLong__RTLong(a, b) {
  var this$1 = $m_RTLong$();
  return new $c_RTLong(this$1.hd(a.f, a.g, b.f, b.g), this$1.s);
}
function $s_RTLong__divideUnsigned__RTLong__RTLong__RTLong(a, b) {
  var this$1 = $m_RTLong$();
  return new $c_RTLong(this$1.gt(a.f, a.g, b.f, b.g), this$1.s);
}
function $s_RTLong__divide__RTLong__RTLong__RTLong(a, b) {
  var this$1 = $m_RTLong$();
  return new $c_RTLong(this$1.gs(a.f, a.g, b.f, b.g), this$1.s);
}
function $s_RTLong__fromDoubleBits__D__O__RTLong(value, fpBitsDataView) {
  fpBitsDataView.setFloat64(0, value, true);
  return new $c_RTLong((fpBitsDataView.getInt32(0, true) | 0), (fpBitsDataView.getInt32(4, true) | 0));
}
function $s_RTLong__fromDouble__D__RTLong(value) {
  var this$1 = $m_RTLong$();
  return new $c_RTLong(this$1.fK(value), this$1.s);
}
function $s_RTLong__fromUnsignedInt__I__RTLong(value) {
  return new $c_RTLong(value, 0);
}
function $s_RTLong__fromInt__I__RTLong(value) {
  return new $c_RTLong(value, (value >> 31));
}
function $s_RTLong__clz__RTLong__I(a) {
  var hi = a.g;
  return ((hi !== 0) ? Math.clz32(hi) : ((32 + Math.clz32(a.f)) | 0));
}
function $s_RTLong__toFloat__RTLong__F(a) {
  var lo = a.f;
  var hi = a.g;
  return Math.fround(((4.294967296E9 * hi) + ((((((-2097152) & (hi ^ (hi >> 10))) === 0) || ((65535 & lo) === 0)) ? lo : (32768 | ((-32768) & lo))) >>> 0.0)));
}
function $s_RTLong__toDouble__RTLong__D(a) {
  var lo = a.f;
  return ((4.294967296E9 * a.g) + (lo >>> 0.0));
}
function $s_RTLong__toInt__RTLong__I(a) {
  return a.f;
}
function $s_RTLong__bitsToDouble__RTLong__O__D(a, fpBitsDataView) {
  fpBitsDataView.setInt32(0, a.f, true);
  fpBitsDataView.setInt32(4, a.g, true);
  return (+fpBitsDataView.getFloat64(0, true));
}
function $s_RTLong__mul__RTLong__RTLong__RTLong(a, b) {
  var alo = a.f;
  var blo = b.f;
  var a0 = (65535 & alo);
  var a1 = ((alo >>> 16) | 0);
  var b0 = (65535 & blo);
  var b1 = ((blo >>> 16) | 0);
  var a0b0 = Math.imul(a0, b0);
  var a1b0 = Math.imul(a1, b0);
  var a0b1 = Math.imul(a0, b1);
  var lo = ((a0b0 + (((a1b0 + a0b1) | 0) << 16)) | 0);
  var c1part = ((((a0b0 >>> 16) | 0) + a0b1) | 0);
  return new $c_RTLong(lo, ((((((((Math.imul(alo, b.g) + Math.imul(a.g, blo)) | 0) + Math.imul(a1, b1)) | 0) + ((c1part >>> 16) | 0)) | 0) + (((((65535 & c1part) + a1b0) | 0) >>> 16) | 0)) | 0));
}
function $s_RTLong__sub__RTLong__RTLong__RTLong(a, b) {
  var alo = a.f;
  var blo = b.f;
  var lo = ((alo - blo) | 0);
  return new $c_RTLong(lo, ((((a.g - b.g) | 0) + ((((~alo) & blo) | ((~(alo ^ blo)) & lo)) >> 31)) | 0));
}
function $s_RTLong__add__RTLong__RTLong__RTLong(a, b) {
  var alo = a.f;
  var blo = b.f;
  var lo = ((alo + blo) | 0);
  return new $c_RTLong(lo, ((((a.g + b.g) | 0) + ((((alo & blo) | ((alo | blo) & (~lo))) >>> 31) | 0)) | 0));
}
function $s_RTLong__sar__RTLong__I__RTLong(a, n) {
  var hi = a.g;
  return new $c_RTLong((((32 & n) === 0) ? (((a.f >>> n) | 0) | ((hi << 1) << ((31 - n) | 0))) : (hi >> n)), (((32 & n) === 0) ? (hi >> n) : (hi >> 31)));
}
function $s_RTLong__shr__RTLong__I__RTLong(a, n) {
  var hi = a.g;
  return new $c_RTLong((((32 & n) === 0) ? (((a.f >>> n) | 0) | ((hi << 1) << ((31 - n) | 0))) : ((hi >>> n) | 0)), (((32 & n) === 0) ? ((hi >>> n) | 0) : 0));
}
function $s_RTLong__shl__RTLong__I__RTLong(a, n) {
  var lo = a.f;
  return new $c_RTLong((((32 & n) === 0) ? (lo << n) : 0), (((32 & n) === 0) ? (((((lo >>> 1) | 0) >>> ((31 - n) | 0)) | 0) | (a.g << n)) : (lo << n)));
}
function $s_RTLong__xor__RTLong__RTLong__RTLong(a, b) {
  return new $c_RTLong((a.f ^ b.f), (a.g ^ b.g));
}
function $s_RTLong__and__RTLong__RTLong__RTLong(a, b) {
  return new $c_RTLong((a.f & b.f), (a.g & b.g));
}
function $s_RTLong__or__RTLong__RTLong__RTLong(a, b) {
  return new $c_RTLong((a.f | b.f), (a.g | b.g));
}
function $s_RTLong__geu__RTLong__RTLong__Z(a, b) {
  var ahi = a.g;
  var bhi = b.g;
  return ((ahi === bhi) ? ((a.f >>> 0) >= (b.f >>> 0)) : ((ahi >>> 0) >= (bhi >>> 0)));
}
function $s_RTLong__gtu__RTLong__RTLong__Z(a, b) {
  var ahi = a.g;
  var bhi = b.g;
  return ((ahi === bhi) ? ((a.f >>> 0) > (b.f >>> 0)) : ((ahi >>> 0) > (bhi >>> 0)));
}
function $s_RTLong__leu__RTLong__RTLong__Z(a, b) {
  var ahi = a.g;
  var bhi = b.g;
  return ((ahi === bhi) ? ((a.f >>> 0) <= (b.f >>> 0)) : ((ahi >>> 0) <= (bhi >>> 0)));
}
function $s_RTLong__ltu__RTLong__RTLong__Z(a, b) {
  var ahi = a.g;
  var bhi = b.g;
  return ((ahi === bhi) ? ((a.f >>> 0) < (b.f >>> 0)) : ((ahi >>> 0) < (bhi >>> 0)));
}
function $s_RTLong__ge__RTLong__RTLong__Z(a, b) {
  var ahi = a.g;
  var bhi = b.g;
  return ((ahi === bhi) ? ((a.f >>> 0) >= (b.f >>> 0)) : (ahi > bhi));
}
function $s_RTLong__gt__RTLong__RTLong__Z(a, b) {
  var ahi = a.g;
  var bhi = b.g;
  return ((ahi === bhi) ? ((a.f >>> 0) > (b.f >>> 0)) : (ahi > bhi));
}
function $s_RTLong__le__RTLong__RTLong__Z(a, b) {
  var ahi = a.g;
  var bhi = b.g;
  return ((ahi === bhi) ? ((a.f >>> 0) <= (b.f >>> 0)) : (ahi < bhi));
}
function $s_RTLong__lt__RTLong__RTLong__Z(a, b) {
  var ahi = a.g;
  var bhi = b.g;
  return ((ahi === bhi) ? ((a.f >>> 0) < (b.f >>> 0)) : (ahi < bhi));
}
function $s_RTLong__notEquals__RTLong__RTLong__Z(a, b) {
  return (!((a.f === b.f) && (a.g === b.g)));
}
function $s_RTLong__equals__RTLong__RTLong__Z(a, b) {
  return ((a.f === b.f) && (a.g === b.g));
}
/** @constructor */
function $c_RTLong(lo, hi) {
  this.f = 0;
  this.g = 0;
  this.f = lo;
  this.g = hi;
}
$p = $c_RTLong.prototype = new $h_O();
$p.constructor = $c_RTLong;
/** @constructor */
function $h_RTLong() {
}
$h_RTLong.prototype = $p;
$p.H = (function(that) {
  return ((that instanceof $c_RTLong) && ((this.f === that.f) && (this.g === that.g)));
});
$p.I = (function() {
  return (this.f ^ this.g);
});
$p.A = (function() {
  return $m_RTLong$().fL(this.f, this.g);
});
$p.hq = (function() {
  return ((this.f << 24) >> 24);
});
$p.hB = (function() {
  return ((this.f << 16) >> 16);
});
$p.hy = (function() {
  return this.f;
});
$p.hz = (function() {
  return this;
});
$p.hw = (function() {
  var lo = this.f;
  var hi = this.g;
  return Math.fround(((4.294967296E9 * hi) + ((((((-2097152) & (hi ^ (hi >> 10))) === 0) || ((65535 & lo) === 0)) ? lo : (32768 | ((-32768) & lo))) >>> 0.0)));
});
$p.ht = (function() {
  var lo = this.f;
  return ((4.294967296E9 * this.g) + (lo >>> 0.0));
});
$p.hs = (function(that) {
  return $m_RTLong$().fJ(this.f, this.g, that.f, that.g);
});
$p.hr = (function(that) {
  return $m_RTLong$().fJ(this.f, this.g, that.f, that.g);
});
function $isArrayOf_RTLong(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.az)));
}
var $d_RTLong = new $TypeData().i($c_RTLong, "org.scalajs.linker.runtime.RuntimeLong", ({
  az: 1
}));
function $p_RTLong$__unsigned_$div__I__I__I__I__I($thiz, alo, ahi, blo, bhi) {
  if ((((-2097152) & ahi) === 0)) {
    if ((((-2097152) & bhi) === 0)) {
      var aDouble = ((4.294967296E9 * ahi) + (alo >>> 0.0));
      var bDouble = ((4.294967296E9 * bhi) + (blo >>> 0.0));
      var rDouble = (aDouble / bDouble);
      $thiz.s = ((rDouble / 4.294967296E9) | 0.0);
      return (rDouble | 0.0);
    } else {
      $thiz.s = 0;
      return 0;
    }
  } else if (((bhi === 0) && ((blo & (((-1) + blo) | 0)) === 0))) {
    var pow = ((31 - Math.clz32(blo)) | 0);
    $thiz.s = ((ahi >>> pow) | 0);
    return (((alo >>> pow) | 0) | ((ahi << 1) << ((31 - pow) | 0)));
  } else if (((blo === 0) && ((bhi & (((-1) + bhi) | 0)) === 0))) {
    var pow$2 = ((31 - Math.clz32(bhi)) | 0);
    $thiz.s = 0;
    return ((ahi >>> pow$2) | 0);
  } else {
    return $p_RTLong$__unsignedDivModHelper__I__I__I__I__Z__I($thiz, alo, ahi, blo, bhi, true);
  }
}
function $p_RTLong$__unsigned_$percent__I__I__I__I__I($thiz, alo, ahi, blo, bhi) {
  if ((((-2097152) & ahi) === 0)) {
    if ((((-2097152) & bhi) === 0)) {
      var aDouble = ((4.294967296E9 * ahi) + (alo >>> 0.0));
      var bDouble = ((4.294967296E9 * bhi) + (blo >>> 0.0));
      var rDouble = (aDouble % bDouble);
      $thiz.s = ((rDouble / 4.294967296E9) | 0.0);
      return (rDouble | 0.0);
    } else {
      $thiz.s = ahi;
      return alo;
    }
  } else if (((bhi === 0) && ((blo & (((-1) + blo) | 0)) === 0))) {
    $thiz.s = 0;
    return (alo & (((-1) + blo) | 0));
  } else if (((blo === 0) && ((bhi & (((-1) + bhi) | 0)) === 0))) {
    $thiz.s = (ahi & (((-1) + bhi) | 0));
    return alo;
  } else {
    return $p_RTLong$__unsignedDivModHelper__I__I__I__I__Z__I($thiz, alo, ahi, blo, bhi, false);
  }
}
function $p_RTLong$__unsignedDivModHelper__I__I__I__I__Z__I($thiz, alo, ahi, blo, bhi, askQuotient) {
  var shift = ((((bhi !== 0) ? Math.clz32(bhi) : ((32 + Math.clz32(blo)) | 0)) - ((ahi !== 0) ? Math.clz32(ahi) : ((32 + Math.clz32(alo)) | 0))) | 0);
  var b = shift;
  var lo = (((32 & b) === 0) ? (blo << b) : 0);
  var hi = (((32 & b) === 0) ? (((((blo >>> 1) | 0) >>> ((31 - b) | 0)) | 0) | (bhi << b)) : (blo << b));
  var bShiftLo = lo;
  var bShiftHi = hi;
  var remLo = alo;
  var remHi = ahi;
  var quotLo = 0;
  var quotHi = 0;
  while (((shift >= 0) && (((-2097152) & remHi) !== 0))) {
    var alo$1 = remLo;
    var ahi$1 = remHi;
    var blo$1 = bShiftLo;
    var bhi$1 = bShiftHi;
    if (((ahi$1 === bhi$1) ? ((alo$1 >>> 0) >= (blo$1 >>> 0)) : ((ahi$1 >>> 0) >= (bhi$1 >>> 0)))) {
      var lo$1 = remLo;
      var hi$1 = remHi;
      var lo$2 = bShiftLo;
      var hi$2 = bShiftHi;
      var lo$3 = ((lo$1 - lo$2) | 0);
      var hi$3 = ((((hi$1 - hi$2) | 0) + ((((~lo$1) & lo$2) | ((~(lo$1 ^ lo$2)) & lo$3)) >> 31)) | 0);
      remLo = lo$3;
      remHi = hi$3;
      if ((shift < 32)) {
        quotLo = (quotLo | (1 << shift));
      } else {
        quotHi = (quotHi | (1 << shift));
      }
    }
    shift = (((-1) + shift) | 0);
    var lo$4 = bShiftLo;
    var hi$4 = bShiftHi;
    var lo$5 = (((lo$4 >>> 1) | 0) | (hi$4 << 31));
    var hi$5 = ((hi$4 >>> 1) | 0);
    bShiftLo = lo$5;
    bShiftHi = hi$5;
  }
  var alo$2 = remLo;
  var ahi$2 = remHi;
  if (((ahi$2 === bhi) ? ((alo$2 >>> 0) >= (blo >>> 0)) : ((ahi$2 >>> 0) >= (bhi >>> 0)))) {
    var lo$6 = remLo;
    var hi$6 = remHi;
    var remDouble = ((4.294967296E9 * hi$6) + (lo$6 >>> 0.0));
    var bDouble = ((4.294967296E9 * bhi) + (blo >>> 0.0));
    if (askQuotient) {
      var x = (remDouble / bDouble);
      var lo$7 = (x | 0.0);
      var hi$7 = ((x / 4.294967296E9) | 0.0);
      var lo$8 = quotLo;
      var hi$8 = quotHi;
      var lo$9 = ((lo$8 + lo$7) | 0);
      var hi$9 = ((((hi$8 + hi$7) | 0) + ((((lo$8 & lo$7) | ((lo$8 | lo$7) & (~lo$9))) >>> 31) | 0)) | 0);
      $thiz.s = hi$9;
      return lo$9;
    } else {
      var rem_mod_bDouble = (remDouble % bDouble);
      $thiz.s = ((rem_mod_bDouble / 4.294967296E9) | 0.0);
      return (rem_mod_bDouble | 0.0);
    }
  } else if (askQuotient) {
    $thiz.s = quotHi;
    return quotLo;
  } else {
    $thiz.s = remHi;
    return remLo;
  }
}
/** @constructor */
function $c_RTLong$() {
  this.s = 0;
}
$p = $c_RTLong$.prototype = new $h_O();
$p.constructor = $c_RTLong$;
/** @constructor */
function $h_RTLong$() {
}
$h_RTLong$.prototype = $p;
$p.fL = (function(lo, hi) {
  if ((hi === (lo >> 31))) {
    return ("" + lo);
  } else if ((((-2097152) & (hi ^ (hi >> 10))) === 0)) {
    return ("" + ((4.294967296E9 * hi) + (lo >>> 0.0)));
  } else {
    var sign = (hi >> 31);
    var xlo = (lo ^ sign);
    var rlo = ((xlo - sign) | 0);
    var rhi = (((hi ^ sign) + (((xlo & (~rlo)) >>> 31) | 0)) | 0);
    var approxNum = ((4.294967296E9 * (rhi >>> 0.0)) + (rlo >>> 0.0));
    var approxQuot = (+Math.floor((1.0E-9 * approxNum)));
    var approxRem = ((rlo - Math.imul(1000000000, (approxQuot | 0.0))) | 0);
    if ((approxRem < 0)) {
      approxQuot = (approxQuot - 1.0);
      approxRem = ((1000000000 + approxRem) | 0);
    } else if ((approxRem >= 1000000000)) {
      approxQuot = (approxQuot + 1.0);
      approxRem = (((-1000000000) + approxRem) | 0);
    }
    var this$4 = approxRem;
    var remStr = ("" + this$4);
    var $x_1 = approxQuot;
    var start = remStr.length;
    var s = ((("" + $x_1) + "000000000".substring(start)) + remStr);
    return ((hi < 0) ? ("-" + s) : s);
  }
});
$p.fK = (function(value) {
  if ((value < (-9.223372036854776E18))) {
    this.s = (-2147483648);
    return 0;
  } else if ((value >= 9.223372036854776E18)) {
    this.s = 2147483647;
    return (-1);
  } else {
    var rawLo = (value | 0.0);
    var rawHi = ((value / 4.294967296E9) | 0.0);
    this.s = (((value < 0.0) && (rawLo !== 0)) ? (((-1) + rawHi) | 0) : rawHi);
    return rawLo;
  }
});
$p.fJ = (function(alo, ahi, blo, bhi) {
  return ((ahi === bhi) ? ((alo === blo) ? 0 : (((alo >>> 0) < (blo >>> 0)) ? (-1) : 1)) : ((ahi < bhi) ? (-1) : 1));
});
$p.gs = (function(alo, ahi, blo, bhi) {
  if (((blo | bhi) === 0)) {
    throw new $c_jl_ArithmeticException("/ by zero");
  }
  if ((ahi === (alo >> 31))) {
    if ((bhi === (blo >> 31))) {
      if (((alo === (-2147483648)) && (blo === (-1)))) {
        this.s = 0;
        return (-2147483648);
      } else {
        var lo = ((alo / $checkIntDivisor(blo)) | 0);
        this.s = (lo >> 31);
        return lo;
      }
    } else if (((alo === (-2147483648)) && ((blo === (-2147483648)) && (bhi === 0)))) {
      this.s = (-1);
      return (-1);
    } else {
      this.s = 0;
      return 0;
    }
  } else {
    var sign = (ahi >> 31);
    var xlo = (alo ^ sign);
    var rlo = ((xlo - sign) | 0);
    var rhi = (((ahi ^ sign) + (((xlo & (~rlo)) >>> 31) | 0)) | 0);
    var sign$1 = (bhi >> 31);
    var xlo$1 = (blo ^ sign$1);
    var rlo$1 = ((xlo$1 - sign$1) | 0);
    var rhi$1 = (((bhi ^ sign$1) + (((xlo$1 & (~rlo$1)) >>> 31) | 0)) | 0);
    var absRLo = $p_RTLong$__unsigned_$div__I__I__I__I__I(this, rlo, rhi, rlo$1, rhi$1);
    if (((ahi ^ bhi) >= 0)) {
      return absRLo;
    } else {
      var hi = this.s;
      var lo$1 = ((-absRLo) | 0);
      var hi$1 = ((((-hi) | 0) + ((absRLo | lo$1) >> 31)) | 0);
      this.s = hi$1;
      return lo$1;
    }
  }
});
$p.gt = (function(alo, ahi, blo, bhi) {
  if (((blo | bhi) === 0)) {
    throw new $c_jl_ArithmeticException("/ by zero");
  }
  if ((ahi === 0)) {
    if ((bhi === 0)) {
      this.s = 0;
      return (((alo >>> 0) / ($checkIntDivisor(blo) >>> 0)) | 0);
    } else {
      this.s = 0;
      return 0;
    }
  } else {
    return $p_RTLong$__unsigned_$div__I__I__I__I__I(this, alo, ahi, blo, bhi);
  }
});
$p.hd = (function(alo, ahi, blo, bhi) {
  if (((blo | bhi) === 0)) {
    throw new $c_jl_ArithmeticException("/ by zero");
  }
  if ((ahi === (alo >> 31))) {
    if ((bhi === (blo >> 31))) {
      var lo = ((alo % $checkIntDivisor(blo)) | 0);
      this.s = (lo >> 31);
      return lo;
    } else if (((alo === (-2147483648)) && ((blo === (-2147483648)) && (bhi === 0)))) {
      this.s = 0;
      return 0;
    } else {
      this.s = ahi;
      return alo;
    }
  } else {
    var sign = (ahi >> 31);
    var xlo = (alo ^ sign);
    var rlo = ((xlo - sign) | 0);
    var rhi = (((ahi ^ sign) + (((xlo & (~rlo)) >>> 31) | 0)) | 0);
    var sign$1 = (bhi >> 31);
    var xlo$1 = (blo ^ sign$1);
    var rlo$1 = ((xlo$1 - sign$1) | 0);
    var rhi$1 = (((bhi ^ sign$1) + (((xlo$1 & (~rlo$1)) >>> 31) | 0)) | 0);
    var absRLo = $p_RTLong$__unsigned_$percent__I__I__I__I__I(this, rlo, rhi, rlo$1, rhi$1);
    if ((ahi < 0)) {
      var hi = this.s;
      var lo$1 = ((-absRLo) | 0);
      var hi$1 = ((((-hi) | 0) + ((absRLo | lo$1) >> 31)) | 0);
      this.s = hi$1;
      return lo$1;
    } else {
      return absRLo;
    }
  }
});
$p.he = (function(alo, ahi, blo, bhi) {
  if (((blo | bhi) === 0)) {
    throw new $c_jl_ArithmeticException("/ by zero");
  }
  if ((ahi === 0)) {
    if ((bhi === 0)) {
      this.s = 0;
      return (((alo >>> 0) % ($checkIntDivisor(blo) >>> 0)) | 0);
    } else {
      this.s = ahi;
      return alo;
    }
  } else {
    return $p_RTLong$__unsigned_$percent__I__I__I__I__I(this, alo, ahi, blo, bhi);
  }
});
var $d_RTLong$ = new $TypeData().i($c_RTLong$, "org.scalajs.linker.runtime.RuntimeLong$", ({
  bO: 1
}));
var $n_RTLong$;
function $m_RTLong$() {
  if ((!$n_RTLong$)) {
    $n_RTLong$ = new $c_RTLong$();
  }
  return $n_RTLong$;
}
function $p_s_Array$__slowcopy__O__I__O__I__I__V($thiz, src, srcPos, dest, destPos, length) {
  var i = srcPos;
  var j = destPos;
  var srcUntil = ((srcPos + length) | 0);
  while ((i < srcUntil)) {
    $m_sr_ScalaRunTime$().fx(dest, j, $m_sr_ScalaRunTime$().gi(src, i));
    i = ((1 + i) | 0);
    j = ((1 + j) | 0);
  }
}
/** @constructor */
function $c_s_Array$() {
}
$p = $c_s_Array$.prototype = new $h_O();
$p.constructor = $c_s_Array$;
/** @constructor */
function $h_s_Array$() {
}
$h_s_Array$.prototype = $p;
$p.gm = (function(src, srcPos, dest, destPos, length) {
  var srcClass = $objectGetClass(src);
  if ((srcClass.bh.Z && $objectGetClass(dest).bh.R(srcClass.bh))) {
    src.j(srcPos, dest, destPos, length);
  } else {
    $p_s_Array$__slowcopy__O__I__O__I__I__V(this, src, srcPos, dest, destPos, length);
  }
});
var $d_s_Array$ = new $TypeData().i($c_s_Array$, "scala.Array$", ({
  bP: 1
}));
var $n_s_Array$;
function $m_s_Array$() {
  if ((!$n_s_Array$)) {
    $n_s_Array$ = new $c_s_Array$();
  }
  return $n_s_Array$;
}
/** @constructor */
function $c_s_Array$EmptyArrays$() {
  this.e5 = null;
  this.eM = null;
  $n_s_Array$EmptyArrays$ = this;
  this.e5 = new $ac_I(0);
  this.eM = new $ac_O(0);
}
$p = $c_s_Array$EmptyArrays$.prototype = new $h_O();
$p.constructor = $c_s_Array$EmptyArrays$;
/** @constructor */
function $h_s_Array$EmptyArrays$() {
}
$h_s_Array$EmptyArrays$.prototype = $p;
var $d_s_Array$EmptyArrays$ = new $TypeData().i($c_s_Array$EmptyArrays$, "scala.Array$EmptyArrays$", ({
  bQ: 1
}));
var $n_s_Array$EmptyArrays$;
function $m_s_Array$EmptyArrays$() {
  if ((!$n_s_Array$EmptyArrays$)) {
    $n_s_Array$EmptyArrays$ = new $c_s_Array$EmptyArrays$();
  }
  return $n_s_Array$EmptyArrays$;
}
/** @constructor */
function $c_s_LowPriorityImplicits2() {
}
$p = $c_s_LowPriorityImplicits2.prototype = new $h_O();
$p.constructor = $c_s_LowPriorityImplicits2;
/** @constructor */
function $h_s_LowPriorityImplicits2() {
}
$h_s_LowPriorityImplicits2.prototype = $p;
/** @constructor */
function $c_s_Option$() {
}
$p = $c_s_Option$.prototype = new $h_O();
$p.constructor = $c_s_Option$;
/** @constructor */
function $h_s_Option$() {
}
$h_s_Option$.prototype = $p;
$p.fw = (function(x) {
  return ((x === null) ? $m_s_None$() : new $c_s_Some(x));
});
var $d_s_Option$ = new $TypeData().i($c_s_Option$, "scala.Option$", ({
  bW: 1
}));
var $n_s_Option$;
function $m_s_Option$() {
  if ((!$n_s_Option$)) {
    $n_s_Option$ = new $c_s_Option$();
  }
  return $n_s_Option$;
}
/** @constructor */
function $c_sc_Hashing$() {
}
$p = $c_sc_Hashing$.prototype = new $h_O();
$p.constructor = $c_sc_Hashing$;
/** @constructor */
function $h_sc_Hashing$() {
}
$h_sc_Hashing$.prototype = $p;
$p.bq = (function(hcode) {
  var h = ((hcode + (~(hcode << 9))) | 0);
  h = (h ^ ((h >>> 14) | 0));
  h = ((h + (h << 4)) | 0);
  return (h ^ ((h >>> 10) | 0));
});
var $d_sc_Hashing$ = new $TypeData().i($c_sc_Hashing$, "scala.collection.Hashing$", ({
  c3: 1
}));
var $n_sc_Hashing$;
function $m_sc_Hashing$() {
  if ((!$n_sc_Hashing$)) {
    $n_sc_Hashing$ = new $c_sc_Hashing$();
  }
  return $n_sc_Hashing$;
}
function $f_sc_IterableOnceOps__forall__F1__Z($thiz, p) {
  var res = true;
  var it = $thiz.p();
  while ((res && it.k())) {
    res = (!(!p.l(it.h())));
  }
  return res;
}
function $f_sc_IterableOnceOps__copyToArray__O__I__I__I($thiz, dest, start, n) {
  var it = $thiz.p();
  var i = start;
  matchResult18: {
    var srclen;
    var x31 = $thiz.D();
    if ((x31 === (-1))) {
      var srclen = $m_jl_reflect_Array$().dS(dest);
      break matchResult18;
    }
    var srclen = x31;
  }
  var destLen = $m_jl_reflect_Array$().dS(dest);
  var limit = ((n < srclen) ? n : srclen);
  var capacity = ((start < 0) ? destLen : ((destLen - start) | 0));
  var total = ((capacity < limit) ? capacity : limit);
  var end = ((start + ((total < 0) ? 0 : total)) | 0);
  while (((i < end) && it.k())) {
    $m_sr_ScalaRunTime$().fx(dest, i, it.h());
    i = ((1 + i) | 0);
  }
  return ((i - start) | 0);
}
function $f_sc_IterableOnceOps__mkString__T__T__T__T($thiz, start, sep, end) {
  return (($thiz.D() === 0) ? (("" + start) + end) : $thiz.dP($ct_scm_StringBuilder__(new $c_scm_StringBuilder()), start, sep, end).bd.an);
}
function $f_sc_IterableOnceOps__addString__scm_StringBuilder__T__T__T__scm_StringBuilder($thiz, b, start, sep, end) {
  var jsb = b.bd;
  if ((start.length !== 0)) {
    jsb.an = (("" + jsb.an) + start);
  }
  var it = $thiz.p();
  if (it.k()) {
    var obj = it.h();
    jsb.an = (("" + jsb.an) + obj);
    while (it.k()) {
      if ((sep.length !== 0)) {
        jsb.an = (("" + jsb.an) + sep);
      }
      var obj$1 = it.h();
      jsb.an = (("" + jsb.an) + obj$1);
    }
  }
  if ((end.length !== 0)) {
    jsb.an = (("" + jsb.an) + end);
  }
  return b;
}
/** @constructor */
function $c_sc_Iterator$ConcatIteratorCell(head, tail) {
  this.eU = null;
  this.d1 = null;
  this.eU = head;
  this.d1 = tail;
}
$p = $c_sc_Iterator$ConcatIteratorCell.prototype = new $h_O();
$p.constructor = $c_sc_Iterator$ConcatIteratorCell;
/** @constructor */
function $h_sc_Iterator$ConcatIteratorCell() {
}
$h_sc_Iterator$ConcatIteratorCell.prototype = $p;
$p.gP = (function() {
  return this.eU.aT().p();
});
var $d_sc_Iterator$ConcatIteratorCell = new $TypeData().i($c_sc_Iterator$ConcatIteratorCell, "scala.collection.Iterator$ConcatIteratorCell", ({
  cd: 1
}));
/** @constructor */
function $c_sc_StringOps$() {
  this.eY = null;
  $n_sc_StringOps$ = this;
  this.eY = new $c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28(((_$1$2) => this.eY));
}
$p = $c_sc_StringOps$.prototype = new $h_O();
$p.constructor = $c_sc_StringOps$;
/** @constructor */
function $h_sc_StringOps$() {
}
$h_sc_StringOps$.prototype = $p;
var $d_sc_StringOps$ = new $TypeData().i($c_sc_StringOps$, "scala.collection.StringOps$", ({
  cm: 1
}));
var $n_sc_StringOps$;
function $m_sc_StringOps$() {
  if ((!$n_sc_StringOps$)) {
    $n_sc_StringOps$ = new $c_sc_StringOps$();
  }
  return $n_sc_StringOps$;
}
/** @constructor */
function $c_scg_CommonErrors$() {
}
$p = $c_scg_CommonErrors$.prototype = new $h_O();
$p.constructor = $c_scg_CommonErrors$;
/** @constructor */
function $h_scg_CommonErrors$() {
}
$h_scg_CommonErrors$.prototype = $p;
$p.gR = (function(index, max) {
  return $ct_jl_IndexOutOfBoundsException__T__(new $c_jl_IndexOutOfBoundsException(), (((index + " is out of bounds (min 0, max ") + max) + ")"));
});
var $d_scg_CommonErrors$ = new $TypeData().i($c_scg_CommonErrors$, "scala.collection.generic.CommonErrors$", ({
  co: 1
}));
var $n_scg_CommonErrors$;
function $m_scg_CommonErrors$() {
  if ((!$n_scg_CommonErrors$)) {
    $n_scg_CommonErrors$ = new $c_scg_CommonErrors$();
  }
  return $n_scg_CommonErrors$;
}
/** @constructor */
function $c_sci_IndexedSeqDefaults$() {
  this.eZ = 0;
  $n_sci_IndexedSeqDefaults$ = this;
  try {
    $m_sc_StringOps$();
    var $x_1 = $m_jl_Integer$().fH($m_jl_System$SystemProperties$().ew("scala.collection.immutable.IndexedSeq.defaultApplyPreferredMaxLength", "64"), 10, 214748364);
  } catch (e) {
    if (false) {
      var $x_1 = 64;
    } else {
      var $x_1;
      throw e;
    }
  }
  this.eZ = $x_1;
}
$p = $c_sci_IndexedSeqDefaults$.prototype = new $h_O();
$p.constructor = $c_sci_IndexedSeqDefaults$;
/** @constructor */
function $h_sci_IndexedSeqDefaults$() {
}
$h_sci_IndexedSeqDefaults$.prototype = $p;
var $d_sci_IndexedSeqDefaults$ = new $TypeData().i($c_sci_IndexedSeqDefaults$, "scala.collection.immutable.IndexedSeqDefaults$", ({
  cv: 1
}));
var $n_sci_IndexedSeqDefaults$;
function $m_sci_IndexedSeqDefaults$() {
  if ((!$n_sci_IndexedSeqDefaults$)) {
    $n_sci_IndexedSeqDefaults$ = new $c_sci_IndexedSeqDefaults$();
  }
  return $n_sci_IndexedSeqDefaults$;
}
/** @constructor */
function $c_sci_MapNode$() {
  this.f1 = null;
  $n_sci_MapNode$ = this;
  $m_s_reflect_ManifestFactory$IntManifest$();
  this.f1 = new $c_sci_BitmapIndexedMapNode(0, 0, new $ac_O(0), new $ac_I(0), 0, 0);
}
$p = $c_sci_MapNode$.prototype = new $h_O();
$p.constructor = $c_sci_MapNode$;
/** @constructor */
function $h_sci_MapNode$() {
}
$h_sci_MapNode$.prototype = $p;
var $d_sci_MapNode$ = new $TypeData().i($c_sci_MapNode$, "scala.collection.immutable.MapNode$", ({
  cK: 1
}));
var $n_sci_MapNode$;
function $m_sci_MapNode$() {
  if ((!$n_sci_MapNode$)) {
    $n_sci_MapNode$ = new $c_sci_MapNode$();
  }
  return $n_sci_MapNode$;
}
function $p_sci_Node__arrayIndexOutOfBounds__O__I__jl_ArrayIndexOutOfBoundsException($thiz, as, ix) {
  return $ct_jl_ArrayIndexOutOfBoundsException__T__(new $c_jl_ArrayIndexOutOfBoundsException(), ((ix + " is out of bounds (min 0, max ") + (((-1) + $m_jl_reflect_Array$().dS(as)) | 0)));
}
/** @constructor */
function $c_sci_Node() {
}
$p = $c_sci_Node.prototype = new $h_O();
$p.constructor = $c_sci_Node;
/** @constructor */
function $h_sci_Node() {
}
$h_sci_Node.prototype = $p;
$p.fN = (function(as, ix) {
  if ((ix < 0)) {
    throw $p_sci_Node__arrayIndexOutOfBounds__O__I__jl_ArrayIndexOutOfBoundsException(this, as, ix);
  }
  if ((ix > (((-1) + as.a.length) | 0))) {
    throw $p_sci_Node__arrayIndexOutOfBounds__O__I__jl_ArrayIndexOutOfBoundsException(this, as, ix);
  }
  var result = new $ac_I((((-1) + as.a.length) | 0));
  as.j(0, result, 0, ix);
  var srcPos = ((1 + ix) | 0);
  var length = (((-1) + ((as.a.length - ix) | 0)) | 0);
  as.j(srcPos, result, ix, length);
  return result;
});
$p.gV = (function(as, ix, elem) {
  if ((ix < 0)) {
    throw $p_sci_Node__arrayIndexOutOfBounds__O__I__jl_ArrayIndexOutOfBoundsException(this, as, ix);
  }
  if ((ix > as.a.length)) {
    throw $p_sci_Node__arrayIndexOutOfBounds__O__I__jl_ArrayIndexOutOfBoundsException(this, as, ix);
  }
  var result = new $ac_I(((1 + as.a.length) | 0));
  as.j(0, result, 0, ix);
  result.a[ix] = elem;
  var destPos = ((1 + ix) | 0);
  var length = ((as.a.length - ix) | 0);
  as.j(ix, result, destPos, length);
  return result;
});
var $d_sci_Node = new $TypeData().i(0, "scala.collection.immutable.Node", ({
  ab: 1
}));
/** @constructor */
function $c_sci_Node$() {
  this.da = 0;
  $n_sci_Node$ = this;
  this.da = $doubleToInt((+Math.ceil(6.4)));
}
$p = $c_sci_Node$.prototype = new $h_O();
$p.constructor = $c_sci_Node$;
/** @constructor */
function $h_sci_Node$() {
}
$h_sci_Node$.prototype = $p;
$p.cq = (function(hash, shift) {
  return (31 & ((hash >>> shift) | 0));
});
$p.c6 = (function(mask) {
  return (1 << mask);
});
$p.gQ = (function(bitmap, bitpos) {
  return $m_jl_Integer$().c5((bitmap & (((-1) + bitpos) | 0)));
});
$p.by = (function(bitmap, mask, bitpos) {
  return ((bitmap === (-1)) ? mask : this.gQ(bitmap, bitpos));
});
var $d_sci_Node$ = new $TypeData().i($c_sci_Node$, "scala.collection.immutable.Node$", ({
  cN: 1
}));
var $n_sci_Node$;
function $m_sci_Node$() {
  if ((!$n_sci_Node$)) {
    $n_sci_Node$ = new $c_sci_Node$();
  }
  return $n_sci_Node$;
}
/** @constructor */
function $c_sci_VectorStatics$() {
  this.ed = null;
  this.aG = null;
  this.bw = null;
  this.cL = null;
  this.ee = null;
  this.f5 = null;
  $n_sci_VectorStatics$ = this;
  this.ed = new $ac_O(0);
  this.aG = new ($d_O.r().r().C)(0);
  this.bw = new ($d_O.r().r().r().C)(0);
  this.cL = new ($d_O.r().r().r().r().C)(0);
  this.ee = new ($d_O.r().r().r().r().r().C)(0);
  this.f5 = new ($d_O.r().r().r().r().r().r().C)(0);
}
$p = $c_sci_VectorStatics$.prototype = new $h_O();
$p.constructor = $c_sci_VectorStatics$;
/** @constructor */
function $h_sci_VectorStatics$() {
}
$h_sci_VectorStatics$.prototype = $p;
$p.cO = (function(a, elem) {
  var alen = a.a.length;
  var ac = new $ac_O(((1 + alen) | 0));
  a.j(0, ac, 0, alen);
  ac.a[alen] = elem;
  return ac;
});
$p.o = (function(a, elem) {
  var ac = $m_ju_Arrays$().G(a, ((1 + a.a.length) | 0));
  ac.a[(((-1) + ac.a.length) | 0)] = elem;
  return ac;
});
$p.bx = (function(elem, a) {
  var ac = $objectGetClass(a).bh.Q().bh.U(((1 + a.a.length) | 0));
  var length$1 = a.a.length;
  a.j(0, ac, 1, length$1);
  ac.a[0] = elem;
  return ac;
});
$p.et = (function(level, a, f) {
  var i = 0;
  var len = a.a.length;
  if ((level === 0)) {
    while ((i < len)) {
      f.l(a.a[i]);
      i = ((1 + i) | 0);
    }
  } else {
    var l = (((-1) + level) | 0);
    while ((i < len)) {
      this.et(l, a.a[i], f);
      i = ((1 + i) | 0);
    }
  }
});
var $d_sci_VectorStatics$ = new $TypeData().i($c_sci_VectorStatics$, "scala.collection.immutable.VectorStatics$", ({
  d4: 1
}));
var $n_sci_VectorStatics$;
function $m_sci_VectorStatics$() {
  if ((!$n_sci_VectorStatics$)) {
    $n_sci_VectorStatics$ = new $c_sci_VectorStatics$();
  }
  return $n_sci_VectorStatics$;
}
/** @constructor */
function $c_scm_MutationTracker$() {
}
$p = $c_scm_MutationTracker$.prototype = new $h_O();
$p.constructor = $c_scm_MutationTracker$;
/** @constructor */
function $h_scm_MutationTracker$() {
}
$h_scm_MutationTracker$.prototype = $p;
$p.gl = (function(expectedCount, actualCount, message) {
  if ((actualCount !== expectedCount)) {
    throw new $c_ju_ConcurrentModificationException(message);
  }
});
var $d_scm_MutationTracker$ = new $TypeData().i($c_scm_MutationTracker$, "scala.collection.mutable.MutationTracker$", ({
  dd: 1
}));
var $n_scm_MutationTracker$;
function $m_scm_MutationTracker$() {
  if ((!$n_scm_MutationTracker$)) {
    $n_scm_MutationTracker$ = new $c_scm_MutationTracker$();
  }
  return $n_scm_MutationTracker$;
}
function $ct_s_concurrent_BatchingExecutor$AbstractBatch__jl_Runnable__Ajl_Runnable__I__($thiz, first, other, size) {
  $thiz.dc = first;
  $thiz.dd = other;
  $thiz.c1 = size;
  return $thiz;
}
function $p_s_concurrent_BatchingExecutor$AbstractBatch__ensureCapacity__I__Ajl_Runnable($thiz, curSize) {
  var curOther = $thiz.dd;
  var curLen = curOther.a.length;
  if ((curSize <= curLen)) {
    return curOther;
  } else {
    var newLen = ((curLen === 0) ? 4 : (curLen << 1));
    if ((newLen <= curLen)) {
      throw new $c_jl_StackOverflowError(("Space limit of asynchronous stack reached: " + curLen));
    }
    var newOther = new ($d_jl_Runnable.r().C)(newLen);
    curOther.j(0, newOther, 0, curLen);
    $thiz.dd = newOther;
    return newOther;
  }
}
/** @constructor */
function $c_s_concurrent_BatchingExecutor$AbstractBatch() {
  this.dc = null;
  this.dd = null;
  this.c1 = 0;
}
$p = $c_s_concurrent_BatchingExecutor$AbstractBatch.prototype = new $h_O();
$p.constructor = $c_s_concurrent_BatchingExecutor$AbstractBatch;
/** @constructor */
function $h_s_concurrent_BatchingExecutor$AbstractBatch() {
}
$h_s_concurrent_BatchingExecutor$AbstractBatch.prototype = $p;
$p.hb = (function(r) {
  var sz = this.c1;
  if ((sz === 0)) {
    this.dc = r;
  } else {
    $p_s_concurrent_BatchingExecutor$AbstractBatch__ensureCapacity__I__Ajl_Runnable(this, sz).a[(((-1) + sz) | 0)] = r;
  }
  this.c1 = ((1 + sz) | 0);
});
$p.hh = (function(n) {
  var n$tailLocal1 = n;
  while (true) {
    if ((n$tailLocal1 > 0)) {
      var x1 = this.c1;
      if ((x1 === 0)) {
        return (void 0);
      }
      if ((x1 === 1)) {
        var x$proxy1 = this.dc;
        if ((x$proxy1 === null)) {
          $m_sr_Scala3RunTime$().b4();
        }
        this.dc = null;
        this.c1 = 0;
        x$proxy1.cu();
        n$tailLocal1 = (((-1) + n$tailLocal1) | 0);
        continue;
      }
      var o = this.dd;
      var x$proxy2 = o.a[(((-2) + x1) | 0)];
      if ((x$proxy2 === null)) {
        $m_sr_Scala3RunTime$().b4();
      }
      o.a[(((-2) + x1) | 0)] = null;
      this.c1 = (((-1) + x1) | 0);
      x$proxy2.cu();
      n$tailLocal1 = (((-1) + n$tailLocal1) | 0);
    } else {
      return (void 0);
    }
  }
});
/** @constructor */
function $c_s_concurrent_BatchingExecutorStatics$() {
  this.f9 = null;
  $n_s_concurrent_BatchingExecutorStatics$ = this;
  this.f9 = new ($d_jl_Runnable.r().C)(0);
}
$p = $c_s_concurrent_BatchingExecutorStatics$.prototype = new $h_O();
$p.constructor = $c_s_concurrent_BatchingExecutorStatics$;
/** @constructor */
function $h_s_concurrent_BatchingExecutorStatics$() {
}
$h_s_concurrent_BatchingExecutorStatics$.prototype = $p;
var $d_s_concurrent_BatchingExecutorStatics$ = new $TypeData().i($c_s_concurrent_BatchingExecutorStatics$, "scala.concurrent.BatchingExecutorStatics$", ({
  dj: 1
}));
var $n_s_concurrent_BatchingExecutorStatics$;
function $m_s_concurrent_BatchingExecutorStatics$() {
  if ((!$n_s_concurrent_BatchingExecutorStatics$)) {
    $n_s_concurrent_BatchingExecutorStatics$ = new $c_s_concurrent_BatchingExecutorStatics$();
  }
  return $n_s_concurrent_BatchingExecutorStatics$;
}
/** @constructor */
function $c_s_concurrent_ExecutionContext$() {
  this.fa = null;
  this.fb = false;
  this.cM = null;
  $n_s_concurrent_ExecutionContext$ = this;
  this.cM = new $c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28(((_$1$3) => {
    _$1$3.ds($m_jl_System$Streams$().cD);
  }));
}
$p = $c_s_concurrent_ExecutionContext$.prototype = new $h_O();
$p.constructor = $c_s_concurrent_ExecutionContext$;
/** @constructor */
function $h_s_concurrent_ExecutionContext$() {
}
$h_s_concurrent_ExecutionContext$.prototype = $p;
$p.dT = (function() {
  if ((!this.fb)) {
    this.fa = $m_sjs_concurrent_JSExecutionContext$().fn;
    this.fb = true;
  }
  return this.fa;
});
var $d_s_concurrent_ExecutionContext$ = new $TypeData().i($c_s_concurrent_ExecutionContext$, "scala.concurrent.ExecutionContext$", ({
  dk: 1
}));
var $n_s_concurrent_ExecutionContext$;
function $m_s_concurrent_ExecutionContext$() {
  if ((!$n_s_concurrent_ExecutionContext$)) {
    $n_s_concurrent_ExecutionContext$ = new $c_s_concurrent_ExecutionContext$();
  }
  return $n_s_concurrent_ExecutionContext$;
}
/** @constructor */
function $c_s_concurrent_Future$() {
  this.fe = null;
  this.fg = null;
  this.eg = null;
  this.ff = null;
  this.fd = null;
  this.eh = null;
  this.fh = null;
  $n_s_concurrent_Future$ = this;
  $m_sci_Map$().gF(new $c_sjsr_WrappedVarArgs([new $c_T2($d_Z.l(), $d_jl_Boolean.l()), new $c_T2($d_B.l(), $d_jl_Byte.l()), new $c_T2($d_C.l(), $d_jl_Character.l()), new $c_T2($d_S.l(), $d_jl_Short.l()), new $c_T2($d_I.l(), $d_jl_Integer.l()), new $c_T2($d_J.l(), $d_jl_Long.l()), new $c_T2($d_F.l(), $d_jl_Float.l()), new $c_T2($d_D.l(), $d_jl_Double.l()), new $c_T2($d_V.l(), $d_jl_Void.l())]));
  this.fe = new $c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28(((t$2) => {
    throw new $c_s_concurrent_Future$$anon$1(t$2);
  }));
  this.fg = new $c_s_util_Failure(new $c_s_concurrent_Future$$anon$2());
  this.eg = new $c_s_util_Failure(new $c_s_concurrent_Future$$anon$3());
  this.ff = $m_s_concurrent_Future$().fE(this.eg);
  this.fd = new $c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28(((v$2) => ((v$2 instanceof $c_s_util_Failure) ? new $c_s_util_Success(v$2.bK) : this.eg)));
  this.eh = $m_s_concurrent_Future$().gB(new $c_s_concurrent_Future$$anon$4());
  this.fh = new $c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28(((t$2$1) => this.eh));
  this.fE(new $c_s_util_Success((void 0)));
}
$p = $c_s_concurrent_Future$.prototype = new $h_O();
$p.constructor = $c_s_concurrent_Future$;
/** @constructor */
function $h_s_concurrent_Future$() {
}
$h_s_concurrent_Future$.prototype = $p;
$p.gB = (function(exception) {
  return $m_s_concurrent_Promise$().gC(exception);
});
$p.fE = (function(result) {
  return $ct_s_concurrent_impl_Promise$DefaultPromise__s_util_Try__(new $c_s_concurrent_impl_Promise$DefaultPromise(), result);
});
var $d_s_concurrent_Future$ = new $TypeData().i($c_s_concurrent_Future$, "scala.concurrent.Future$", ({
  dm: 1
}));
var $n_s_concurrent_Future$;
function $m_s_concurrent_Future$() {
  if ((!$n_s_concurrent_Future$)) {
    $n_s_concurrent_Future$ = new $c_s_concurrent_Future$();
  }
  return $n_s_concurrent_Future$;
}
function $f_s_concurrent_Promise__complete__s_util_Try__s_concurrent_Promise($thiz, result) {
  if ($thiz.hl(result)) {
    return $thiz;
  } else {
    throw new $c_jl_IllegalStateException("Promise already completed.");
  }
}
function $f_s_concurrent_Promise__success__O__s_concurrent_Promise($thiz, value) {
  return $f_s_concurrent_Promise__complete__s_util_Try__s_concurrent_Promise($thiz, new $c_s_util_Success(value));
}
function $f_s_concurrent_Promise__failure__jl_Throwable__s_concurrent_Promise($thiz, cause) {
  return $f_s_concurrent_Promise__complete__s_util_Try__s_concurrent_Promise($thiz, new $c_s_util_Failure(cause));
}
/** @constructor */
function $c_s_concurrent_Promise$() {
}
$p = $c_s_concurrent_Promise$.prototype = new $h_O();
$p.constructor = $c_s_concurrent_Promise$;
/** @constructor */
function $h_s_concurrent_Promise$() {
}
$h_s_concurrent_Promise$.prototype = $p;
$p.gC = (function(exception) {
  return $ct_s_concurrent_impl_Promise$DefaultPromise__s_util_Try__(new $c_s_concurrent_impl_Promise$DefaultPromise(), new $c_s_util_Failure(exception));
});
var $d_s_concurrent_Promise$ = new $TypeData().i($c_s_concurrent_Promise$, "scala.concurrent.Promise$", ({
  ds: 1
}));
var $n_s_concurrent_Promise$;
function $m_s_concurrent_Promise$() {
  if ((!$n_s_concurrent_Promise$)) {
    $n_s_concurrent_Promise$ = new $c_s_concurrent_Promise$();
  }
  return $n_s_concurrent_Promise$;
}
/** @constructor */
function $c_s_concurrent_impl_Promise$() {
  this.de = null;
  $n_s_concurrent_impl_Promise$ = this;
  this.de = $ct_s_concurrent_impl_Promise$Transformation__I__F1__s_concurrent_ExecutionContext__(new $c_s_concurrent_impl_Promise$Transformation(), 0, null, $m_s_concurrent_ExecutionContext$parasitic$());
}
$p = $c_s_concurrent_impl_Promise$.prototype = new $h_O();
$p.constructor = $c_s_concurrent_impl_Promise$;
/** @constructor */
function $h_s_concurrent_impl_Promise$() {
}
$h_s_concurrent_impl_Promise$.prototype = $p;
$p.dt = (function(value) {
  if ((value === null)) {
    throw $ct_jl_NullPointerException__(new $c_jl_NullPointerException());
  }
  if ((value instanceof $c_s_util_Success)) {
    return value;
  } else {
    var t = value.bK;
    return (((false || false) || (t instanceof $c_jl_Error)) ? (false ? new $c_s_util_Success(t.fZ()) : new $c_s_util_Failure(new $c_ju_concurrent_ExecutionException("Boxed Exception", t))) : value);
  }
});
var $d_s_concurrent_impl_Promise$ = new $TypeData().i($c_s_concurrent_impl_Promise$, "scala.concurrent.impl.Promise$", ({
  dt: 1
}));
var $n_s_concurrent_impl_Promise$;
function $m_s_concurrent_impl_Promise$() {
  if ((!$n_s_concurrent_impl_Promise$)) {
    $n_s_concurrent_impl_Promise$ = new $c_s_concurrent_impl_Promise$();
  }
  return $n_s_concurrent_impl_Promise$;
}
function $is_s_concurrent_impl_Promise$Callbacks(obj) {
  return (!(!((obj && obj.$classData) && obj.$classData.n.a3)));
}
function $isArrayOf_s_concurrent_impl_Promise$Callbacks(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.a3)));
}
/** @constructor */
function $c_sr_BoxesRunTime$() {
}
$p = $c_sr_BoxesRunTime$.prototype = new $h_O();
$p.constructor = $c_sr_BoxesRunTime$;
/** @constructor */
function $h_sr_BoxesRunTime$() {
}
$h_sr_BoxesRunTime$.prototype = $p;
$p.i = (function(x, y) {
  return ((x === y) || ($is_jl_Number(x) ? this.gz(x, y) : ((x instanceof $Char) ? this.gx(x, y) : ((x === null) ? (y === null) : $dp_equals__O__Z(x, y)))));
});
$p.gz = (function(xn, y) {
  if ($is_jl_Number(y)) {
    return this.gy(xn, y);
  } else if ((y instanceof $Char)) {
    if (((typeof xn) === "number")) {
      return ((+xn) === y.c);
    } else if ((xn instanceof $c_RTLong)) {
      var t = $uJ(xn);
      var lo = t.f;
      var hi = t.g;
      var value = y.c;
      var hi$1 = (value >> 31);
      return ((lo === value) && (hi === hi$1));
    } else {
      return ((xn === null) ? (y === null) : $dp_equals__O__Z(xn, y));
    }
  } else {
    return ((xn === null) ? (y === null) : $dp_equals__O__Z(xn, y));
  }
});
$p.gy = (function(xn, yn) {
  if (((typeof xn) === "number")) {
    var x2 = (+xn);
    if (((typeof yn) === "number")) {
      return (x2 === (+yn));
    } else if ((yn instanceof $c_RTLong)) {
      var t = $uJ(yn);
      var lo = t.f;
      return (x2 === ((4.294967296E9 * t.g) + (lo >>> 0.0)));
    } else {
      return (false && yn.H(x2));
    }
  } else if ((xn instanceof $c_RTLong)) {
    var t$1 = $uJ(xn);
    var lo$1 = t$1.f;
    var hi$1 = t$1.g;
    if ((yn instanceof $c_RTLong)) {
      var t$2 = $uJ(yn);
      var lo$2 = t$2.f;
      var hi$2 = t$2.g;
      return ((lo$1 === lo$2) && (hi$1 === hi$2));
    } else if (((typeof yn) === "number")) {
      var x3$3 = (+yn);
      return (((4.294967296E9 * hi$1) + (lo$1 >>> 0.0)) === x3$3);
    } else {
      return (false && yn.H(new $c_RTLong(lo$1, hi$1)));
    }
  } else {
    return ((xn === null) ? (yn === null) : $dp_equals__O__Z(xn, yn));
  }
});
$p.gx = (function(xc, y) {
  if ((y instanceof $Char)) {
    return (xc.c === y.c);
  } else if ($is_jl_Number(y)) {
    if (((typeof y) === "number")) {
      return ((+y) === xc.c);
    } else if ((y instanceof $c_RTLong)) {
      var t = $uJ(y);
      var lo = t.f;
      var hi = t.g;
      var value = xc.c;
      var hi$1 = (value >> 31);
      return ((lo === value) && (hi === hi$1));
    } else {
      return ((y === null) ? (xc === null) : $dp_equals__O__Z(y, xc));
    }
  } else {
    return ((xc === null) && (y === null));
  }
});
var $d_sr_BoxesRunTime$ = new $TypeData().i($c_sr_BoxesRunTime$, "scala.runtime.BoxesRunTime$", ({
  dI: 1
}));
var $n_sr_BoxesRunTime$;
function $m_sr_BoxesRunTime$() {
  if ((!$n_sr_BoxesRunTime$)) {
    $n_sr_BoxesRunTime$ = new $c_sr_BoxesRunTime$();
  }
  return $n_sr_BoxesRunTime$;
}
/** @constructor */
function $c_sr_Scala3RunTime$() {
}
$p = $c_sr_Scala3RunTime$.prototype = new $h_O();
$p.constructor = $c_sr_Scala3RunTime$;
/** @constructor */
function $h_sr_Scala3RunTime$() {
}
$h_sr_Scala3RunTime$.prototype = $p;
$p.b4 = (function() {
  throw $ct_jl_NullPointerException__T__(new $c_jl_NullPointerException(), "tried to cast away nullability, but value is null");
});
var $d_sr_Scala3RunTime$ = new $TypeData().i($c_sr_Scala3RunTime$, "scala.runtime.Scala3RunTime$", ({
  dK: 1
}));
var $n_sr_Scala3RunTime$;
function $m_sr_Scala3RunTime$() {
  if ((!$n_sr_Scala3RunTime$)) {
    $n_sr_Scala3RunTime$ = new $c_sr_Scala3RunTime$();
  }
  return $n_sr_Scala3RunTime$;
}
/** @constructor */
function $c_sr_ScalaRunTime$() {
}
$p = $c_sr_ScalaRunTime$.prototype = new $h_O();
$p.constructor = $c_sr_ScalaRunTime$;
/** @constructor */
function $h_sr_ScalaRunTime$() {
}
$h_sr_ScalaRunTime$.prototype = $p;
$p.gi = (function(xs, idx) {
  if ((xs instanceof $ac_O)) {
    return xs.a[idx];
  }
  if ((xs instanceof $ac_I)) {
    return xs.a[idx];
  }
  if ((xs instanceof $ac_D)) {
    return xs.a[idx];
  }
  if ((xs instanceof $ac_J)) {
    return xs.a[idx];
  }
  if ((xs instanceof $ac_F)) {
    return xs.a[idx];
  }
  if ((xs instanceof $ac_C)) {
    return $bC(xs.a[idx]);
  }
  if ((xs instanceof $ac_B)) {
    return xs.a[idx];
  }
  if ((xs instanceof $ac_S)) {
    return xs.a[idx];
  }
  if ((xs instanceof $ac_Z)) {
    return xs.a[idx];
  }
  if ((xs === null)) {
    throw $ct_jl_NullPointerException__(new $c_jl_NullPointerException());
  }
  throw new $c_s_MatchError(xs);
});
$p.fx = (function(xs, idx, value) {
  if ((xs instanceof $ac_O)) {
    xs.a[idx] = value;
    return (void 0);
  }
  if ((xs instanceof $ac_I)) {
    xs.a[idx] = (value | 0);
    return (void 0);
  }
  if ((xs instanceof $ac_D)) {
    xs.a[idx] = (+value);
    return (void 0);
  }
  if ((xs instanceof $ac_J)) {
    xs.a[idx] = $uJ(value);
    return (void 0);
  }
  if ((xs instanceof $ac_F)) {
    xs.a[idx] = Math.fround(value);
    return (void 0);
  }
  if ((xs instanceof $ac_C)) {
    xs.a[idx] = $uC(value);
    return (void 0);
  }
  if ((xs instanceof $ac_B)) {
    xs.a[idx] = (value | 0);
    return (void 0);
  }
  if ((xs instanceof $ac_S)) {
    xs.a[idx] = (value | 0);
    return (void 0);
  }
  if ((xs instanceof $ac_Z)) {
    xs.a[idx] = (!(!value));
    return (void 0);
  }
  if ((xs === null)) {
    throw $ct_jl_NullPointerException__(new $c_jl_NullPointerException());
  }
  throw new $c_s_MatchError(xs);
});
$p.dO = (function(x) {
  return $f_sc_IterableOnceOps__mkString__T__T__T__T(x.c9(), (x.bg() + "("), ",", ")");
});
var $d_sr_ScalaRunTime$ = new $TypeData().i($c_sr_ScalaRunTime$, "scala.runtime.ScalaRunTime$", ({
  dL: 1
}));
var $n_sr_ScalaRunTime$;
function $m_sr_ScalaRunTime$() {
  if ((!$n_sr_ScalaRunTime$)) {
    $n_sr_ScalaRunTime$ = new $c_sr_ScalaRunTime$();
  }
  return $n_sr_ScalaRunTime$;
}
/** @constructor */
function $c_sr_Statics$() {
}
$p = $c_sr_Statics$.prototype = new $h_O();
$p.constructor = $c_sr_Statics$;
/** @constructor */
function $h_sr_Statics$() {
}
$h_sr_Statics$.prototype = $p;
$p.gZ = (function(lv) {
  var lo = lv.f;
  var hi = lv.g;
  return ((hi === (lo >> 31)) ? lo : (lo ^ hi));
});
$p.gu = (function(dv) {
  var iv = $doubleToInt(dv);
  if ((iv === dv)) {
    return iv;
  } else {
    var this$1 = $m_RTLong$();
    var lo = this$1.fK(dv);
    var hi = this$1.s;
    if ((((4.294967296E9 * hi) + (lo >>> 0.0)) === dv)) {
      return (lo ^ hi);
    } else {
      var valueInt = (dv | 0);
      if (((valueInt === dv) && ((1.0 / dv) !== (-Infinity)))) {
        return valueInt;
      } else if ((dv !== dv)) {
        return 2146959360;
      } else {
        var fpBitsDataView = $fpBitsDataView;
        fpBitsDataView.setFloat64(0, dv, true);
        return ((fpBitsDataView.getInt32(0, true) | 0) ^ (fpBitsDataView.getInt32(4, true) | 0));
      }
    }
  }
});
$p.ac = (function(x) {
  if ((x === null)) {
    return 0;
  } else if (((typeof x) === "number")) {
    return this.gu((+x));
  } else if ((x instanceof $c_RTLong)) {
    var t = $uJ(x);
    return this.gZ(new $c_RTLong(t.f, t.g));
  } else {
    return $dp_hashCode__I(x);
  }
});
$p.gW = (function(n) {
  throw $ct_jl_IndexOutOfBoundsException__T__(new $c_jl_IndexOutOfBoundsException(), ("" + n));
});
var $d_sr_Statics$ = new $TypeData().i($c_sr_Statics$, "scala.runtime.Statics$", ({
  dN: 1
}));
var $n_sr_Statics$;
function $m_sr_Statics$() {
  if ((!$n_sr_Statics$)) {
    $n_sr_Statics$ = new $c_sr_Statics$();
  }
  return $n_sr_Statics$;
}
/** @constructor */
function $c_sr_Statics$PFMarker$() {
}
$p = $c_sr_Statics$PFMarker$.prototype = new $h_O();
$p.constructor = $c_sr_Statics$PFMarker$;
/** @constructor */
function $h_sr_Statics$PFMarker$() {
}
$h_sr_Statics$PFMarker$.prototype = $p;
var $d_sr_Statics$PFMarker$ = new $TypeData().i($c_sr_Statics$PFMarker$, "scala.runtime.Statics$PFMarker$", ({
  dO: 1
}));
var $n_sr_Statics$PFMarker$;
function $m_sr_Statics$PFMarker$() {
  if ((!$n_sr_Statics$PFMarker$)) {
    $n_sr_Statics$PFMarker$ = new $c_sr_Statics$PFMarker$();
  }
  return $n_sr_Statics$PFMarker$;
}
/** @constructor */
function $c_sjs_concurrent_JSExecutionContext$() {
  this.fn = null;
  $n_sjs_concurrent_JSExecutionContext$ = this;
  this.fn = $m_sjs_concurrent_QueueExecutionContext$().gh();
}
$p = $c_sjs_concurrent_JSExecutionContext$.prototype = new $h_O();
$p.constructor = $c_sjs_concurrent_JSExecutionContext$;
/** @constructor */
function $h_sjs_concurrent_JSExecutionContext$() {
}
$h_sjs_concurrent_JSExecutionContext$.prototype = $p;
var $d_sjs_concurrent_JSExecutionContext$ = new $TypeData().i($c_sjs_concurrent_JSExecutionContext$, "scala.scalajs.concurrent.JSExecutionContext$", ({
  dP: 1
}));
var $n_sjs_concurrent_JSExecutionContext$;
function $m_sjs_concurrent_JSExecutionContext$() {
  if ((!$n_sjs_concurrent_JSExecutionContext$)) {
    $n_sjs_concurrent_JSExecutionContext$ = new $c_sjs_concurrent_JSExecutionContext$();
  }
  return $n_sjs_concurrent_JSExecutionContext$;
}
/** @constructor */
function $c_sjs_concurrent_QueueExecutionContext$() {
}
$p = $c_sjs_concurrent_QueueExecutionContext$.prototype = new $h_O();
$p.constructor = $c_sjs_concurrent_QueueExecutionContext$;
/** @constructor */
function $h_sjs_concurrent_QueueExecutionContext$() {
}
$h_sjs_concurrent_QueueExecutionContext$.prototype = $p;
$p.gh = (function() {
  return (((typeof Promise) === "undefined") ? new $c_sjs_concurrent_QueueExecutionContext$TimeoutsExecutionContext() : new $c_sjs_concurrent_QueueExecutionContext$PromisesExecutionContext());
});
var $d_sjs_concurrent_QueueExecutionContext$ = new $TypeData().i($c_sjs_concurrent_QueueExecutionContext$, "scala.scalajs.concurrent.QueueExecutionContext$", ({
  dQ: 1
}));
var $n_sjs_concurrent_QueueExecutionContext$;
function $m_sjs_concurrent_QueueExecutionContext$() {
  if ((!$n_sjs_concurrent_QueueExecutionContext$)) {
    $n_sjs_concurrent_QueueExecutionContext$ = new $c_sjs_concurrent_QueueExecutionContext$();
  }
  return $n_sjs_concurrent_QueueExecutionContext$;
}
/** @constructor */
function $c_sjs_js_Thenable$ThenableOps$() {
}
$p = $c_sjs_js_Thenable$ThenableOps$.prototype = new $h_O();
$p.constructor = $c_sjs_js_Thenable$ThenableOps$;
/** @constructor */
function $h_sjs_js_Thenable$ThenableOps$() {
}
$h_sjs_js_Thenable$ThenableOps$.prototype = $p;
$p.fT = (function(this$) {
  var p2 = $ct_s_concurrent_impl_Promise$DefaultPromise__(new $c_s_concurrent_impl_Promise$DefaultPromise());
  this$.then(((arg1$2) => {
    $f_s_concurrent_Promise__success__O__s_concurrent_Promise(p2, arg1$2);
  }), $m_sjs_js_defined$().gg(((arg1$2$1) => {
    $f_s_concurrent_Promise__failure__jl_Throwable__s_concurrent_Promise(p2, ((arg1$2$1 instanceof $c_jl_Throwable) ? arg1$2$1 : new $c_sjs_js_JavaScriptException(arg1$2$1)));
  })));
  return p2;
});
var $d_sjs_js_Thenable$ThenableOps$ = new $TypeData().i($c_sjs_js_Thenable$ThenableOps$, "scala.scalajs.js.Thenable$ThenableOps$", ({
  dW: 1
}));
var $n_sjs_js_Thenable$ThenableOps$;
function $m_sjs_js_Thenable$ThenableOps$() {
  if ((!$n_sjs_js_Thenable$ThenableOps$)) {
    $n_sjs_js_Thenable$ThenableOps$ = new $c_sjs_js_Thenable$ThenableOps$();
  }
  return $n_sjs_js_Thenable$ThenableOps$;
}
/** @constructor */
function $c_sjs_js_defined$() {
}
$p = $c_sjs_js_defined$.prototype = new $h_O();
$p.constructor = $c_sjs_js_defined$;
/** @constructor */
function $h_sjs_js_defined$() {
}
$h_sjs_js_defined$.prototype = $p;
$p.gg = (function(a) {
  return a;
});
var $d_sjs_js_defined$ = new $TypeData().i($c_sjs_js_defined$, "scala.scalajs.js.defined$", ({
  dZ: 1
}));
var $n_sjs_js_defined$;
function $m_sjs_js_defined$() {
  if ((!$n_sjs_js_defined$)) {
    $n_sjs_js_defined$ = new $c_sjs_js_defined$();
  }
  return $n_sjs_js_defined$;
}
function $f_s_util_control_NoStackTrace__fillInStackTrace__jl_Throwable($thiz) {
  return ($m_s_util_control_NoStackTrace$().fp ? $c_jl_Throwable.prototype.cP.call($thiz) : $thiz);
}
/** @constructor */
function $c_s_util_control_NoStackTrace$() {
  this.fp = false;
  this.fp = false;
}
$p = $c_s_util_control_NoStackTrace$.prototype = new $h_O();
$p.constructor = $c_s_util_control_NoStackTrace$;
/** @constructor */
function $h_s_util_control_NoStackTrace$() {
}
$h_s_util_control_NoStackTrace$.prototype = $p;
var $d_s_util_control_NoStackTrace$ = new $TypeData().i($c_s_util_control_NoStackTrace$, "scala.util.control.NoStackTrace$", ({
  e3: 1
}));
var $n_s_util_control_NoStackTrace$;
function $m_s_util_control_NoStackTrace$() {
  if ((!$n_s_util_control_NoStackTrace$)) {
    $n_s_util_control_NoStackTrace$ = new $c_s_util_control_NoStackTrace$();
  }
  return $n_s_util_control_NoStackTrace$;
}
/** @constructor */
function $c_s_util_control_NonFatal$() {
}
$p = $c_s_util_control_NonFatal$.prototype = new $h_O();
$p.constructor = $c_s_util_control_NonFatal$;
/** @constructor */
function $h_s_util_control_NonFatal$() {
}
$h_s_util_control_NonFatal$.prototype = $p;
$p.dQ = (function(t) {
  matchAlts1: {
    matchAlts2: {
      if ((t instanceof $c_jl_VirtualMachineError)) {
        break matchAlts2;
      }
      if (false) {
        break matchAlts2;
      }
      if (false) {
        break matchAlts2;
      }
      if (false) {
        break matchAlts2;
      }
      if (false) {
        break matchAlts2;
      }
      break matchAlts1;
    }
    return false;
  }
  return true;
});
$p.hm = (function(t) {
  return (this.dQ(t) ? new $c_s_Some(t) : $m_s_None$());
});
var $d_s_util_control_NonFatal$ = new $TypeData().i($c_s_util_control_NonFatal$, "scala.util.control.NonFatal$", ({
  e4: 1
}));
var $n_s_util_control_NonFatal$;
function $m_s_util_control_NonFatal$() {
  if ((!$n_s_util_control_NonFatal$)) {
    $n_s_util_control_NonFatal$ = new $c_s_util_control_NonFatal$();
  }
  return $n_s_util_control_NonFatal$;
}
/** @constructor */
function $c_s_util_hashing_MurmurHash3() {
}
$p = $c_s_util_hashing_MurmurHash3.prototype = new $h_O();
$p.constructor = $c_s_util_hashing_MurmurHash3;
/** @constructor */
function $h_s_util_hashing_MurmurHash3() {
}
$h_s_util_hashing_MurmurHash3.prototype = $p;
$p.x = (function(hash, data) {
  var h = this.cr(hash, data);
  var i = h;
  h = ((i << 13) | ((i >>> 19) | 0));
  return (((-430675100) + Math.imul(5, h)) | 0);
});
$p.cr = (function(hash, data) {
  var k = data;
  k = Math.imul((-862048943), k);
  var i = k;
  k = ((i << 15) | ((i >>> 17) | 0));
  k = Math.imul(461845907, k);
  return (hash ^ k);
});
$p.aH = (function(hash, length) {
  return this.dX((hash ^ length));
});
$p.dX = (function(hash) {
  var h = hash;
  h = (h ^ ((h >>> 16) | 0));
  h = Math.imul((-2048144789), h);
  h = (h ^ ((h >>> 13) | 0));
  h = Math.imul((-1028477387), h);
  h = (h ^ ((h >>> 16) | 0));
  return h;
});
$p.fV = (function(x, y, seed) {
  var h = seed;
  h = this.x(h, $f_T__hashCode__I("Tuple2"));
  h = this.x(h, x);
  h = this.x(h, y);
  return this.aH(h, 2);
});
$p.ct = (function(x, seed, ignorePrefix) {
  var arr = x.be();
  if ((arr === 0)) {
    return ((!ignorePrefix) ? $f_T__hashCode__I(x.bg()) : seed);
  } else {
    var h = seed;
    if ((!ignorePrefix)) {
      h = this.x(h, $f_T__hashCode__I(x.bg()));
    }
    var i = 0;
    while ((i < arr)) {
      h = this.x(h, $m_sr_Statics$().ac(x.bf(i)));
      i = ((1 + i) | 0);
    }
    return this.aH(h, arr);
  }
});
$p.fW = (function(xs, seed) {
  var a = 0;
  var b = 0;
  var n = 0;
  var c = 1;
  var iterator = xs.p();
  while (iterator.k()) {
    var x = iterator.h();
    var h = $m_sr_Statics$().ac(x);
    a = ((a + h) | 0);
    b = (b ^ h);
    c = Math.imul(c, (1 | h));
    n = ((1 + n) | 0);
  }
  var h$2 = seed;
  h$2 = this.x(h$2, a);
  h$2 = this.x(h$2, b);
  h$2 = this.cr(h$2, c);
  return this.aH(h$2, n);
});
$p.h8 = (function(xs, seed) {
  var it = xs.p();
  var h = seed;
  if ((!it.k())) {
    return this.aH(h, 0);
  }
  var x0 = it.h();
  if ((!it.k())) {
    return this.aH(this.x(h, $m_sr_Statics$().ac(x0)), 1);
  }
  var x1 = it.h();
  var initial = $m_sr_Statics$().ac(x0);
  h = this.x(h, initial);
  var h0 = h;
  var prev = $m_sr_Statics$().ac(x1);
  var rangeDiff = ((prev - initial) | 0);
  var i = 2;
  while (it.k()) {
    h = this.x(h, prev);
    var hash = $m_sr_Statics$().ac(it.h());
    if (((rangeDiff !== ((hash - prev) | 0)) || (rangeDiff === 0))) {
      h = this.x(h, hash);
      i = ((1 + i) | 0);
      while (it.k()) {
        h = this.x(h, $m_sr_Statics$().ac(it.h()));
        i = ((1 + i) | 0);
      }
      return this.aH(h, i);
    }
    prev = hash;
    i = ((1 + i) | 0);
  }
  return this.dX(this.x(this.x(h0, rangeDiff), prev));
});
$p.hc = (function(start, step, last, seed) {
  return this.dX(this.x(this.x(this.x(seed, start), step), last));
});
$p.gS = (function(a, seed) {
  var h = seed;
  var l = a.w();
  switch (l) {
    case 0: {
      return this.aH(h, 0);
      break;
    }
    case 1: {
      return this.aH(this.x(h, $m_sr_Statics$().ac(a.C(0))), 1);
      break;
    }
    default: {
      var initial = $m_sr_Statics$().ac(a.C(0));
      h = this.x(h, initial);
      var h0 = h;
      var prev = $m_sr_Statics$().ac(a.C(1));
      var rangeDiff = ((prev - initial) | 0);
      var i = 2;
      while ((i < l)) {
        h = this.x(h, prev);
        var hash = $m_sr_Statics$().ac(a.C(i));
        if (((rangeDiff !== ((hash - prev) | 0)) || (rangeDiff === 0))) {
          h = this.x(h, hash);
          i = ((1 + i) | 0);
          while ((i < l)) {
            h = this.x(h, $m_sr_Statics$().ac(a.C(i)));
            i = ((1 + i) | 0);
          }
          return this.aH(h, l);
        }
        prev = hash;
        i = ((1 + i) | 0);
      }
      return this.dX(this.x(this.x(h0, rangeDiff), prev));
    }
  }
});
$p.gY = (function(xs, seed) {
  var n = 0;
  var h = seed;
  var rangeState = 0;
  var rangeDiff = 0;
  var prev = 0;
  var initial = 0;
  var elems = xs;
  while ((!elems.n())) {
    var head = elems.am();
    var tail = elems.P();
    var hash = $m_sr_Statics$().ac(head);
    h = this.x(h, hash);
    switch (rangeState) {
      case 0: {
        initial = hash;
        rangeState = 1;
        break;
      }
      case 1: {
        rangeDiff = ((hash - prev) | 0);
        rangeState = 2;
        break;
      }
      case 2: {
        if (((rangeDiff !== ((hash - prev) | 0)) || (rangeDiff === 0))) {
          rangeState = 3;
        }
        break;
      }
    }
    prev = hash;
    n = ((1 + n) | 0);
    elems = tail;
  }
  return ((rangeState === 2) ? this.hc(initial, rangeDiff, prev, seed) : this.aH(h, n));
});
function $p_jl_Character$__nonASCIIZeroDigitCodePoints$lzycompute__AI($thiz) {
  if (((((32 & $thiz.dw) << 24) >> 24) === 0)) {
    $thiz.dY = new $ac_I(new Int32Array([1632, 1776, 1984, 2406, 2534, 2662, 2790, 2918, 3046, 3174, 3302, 3430, 3558, 3664, 3792, 3872, 4160, 4240, 6112, 6160, 6470, 6608, 6784, 6800, 6992, 7088, 7232, 7248, 42528, 43216, 43264, 43472, 43504, 43600, 44016, 65296, 66720, 68912, 69734, 69872, 69942, 70096, 70384, 70736, 70864, 71248, 71360, 71472, 71904, 72016, 72784, 73040, 73120, 73552, 92768, 92864, 93008, 120782, 120792, 120802, 120812, 120822, 123200, 123632, 124144, 125264, 130032]));
    $thiz.dw = (((32 | $thiz.dw) << 24) >> 24);
  }
  return $thiz.dY;
}
function $p_jl_Character$__nonASCIIZeroDigitCodePoints__AI($thiz) {
  return (((((32 & $thiz.dw) << 24) >> 24) === 0) ? $p_jl_Character$__nonASCIIZeroDigitCodePoints$lzycompute__AI($thiz) : $thiz.dY);
}
/** @constructor */
function $c_jl_Character$() {
  this.dY = null;
  this.dw = 0;
}
$p = $c_jl_Character$.prototype = new $h_O();
$p.constructor = $c_jl_Character$;
/** @constructor */
function $h_jl_Character$() {
}
$h_jl_Character$.prototype = $p;
$p.gr = (function(codePoint, radix) {
  if ((codePoint < 256)) {
    var value = (((codePoint >= 48) && (codePoint <= 57)) ? (((-48) + codePoint) | 0) : (((codePoint >= 65) && (codePoint <= 90)) ? (((-55) + codePoint) | 0) : (((codePoint >= 97) && (codePoint <= 122)) ? (((-87) + codePoint) | 0) : (-1))));
  } else if (((codePoint >= 65313) && (codePoint <= 65338))) {
    var value = (((-65303) + codePoint) | 0);
  } else if (((codePoint >= 65345) && (codePoint <= 65370))) {
    var value = (((-65335) + codePoint) | 0);
  } else {
    var p = $m_ju_Arrays$().gj($p_jl_Character$__nonASCIIZeroDigitCodePoints__AI(this), codePoint);
    var zeroCodePointIndex = ((p < 0) ? (((-2) - p) | 0) : p);
    if ((zeroCodePointIndex < 0)) {
      var value = (-1);
    } else {
      var v = ((codePoint - $p_jl_Character$__nonASCIIZeroDigitCodePoints__AI(this).a[zeroCodePointIndex]) | 0);
      var value = ((v > 9) ? (-1) : v);
    }
  }
  return ((value < radix) ? value : (-1));
});
var $d_jl_Character$ = new $TypeData().i($c_jl_Character$, "java.lang.Character$", ({
  bi: 1,
  a: 1
}));
var $n_jl_Character$;
function $m_jl_Character$() {
  if ((!$n_jl_Character$)) {
    $n_jl_Character$ = new $c_jl_Character$();
  }
  return $n_jl_Character$;
}
/** @constructor */
function $c_jl_Integer$() {
}
$p = $c_jl_Integer$.prototype = new $h_O();
$p.constructor = $c_jl_Integer$;
/** @constructor */
function $h_jl_Integer$() {
}
$h_jl_Integer$.prototype = $p;
$p.dr = (function(s) {
  throw new $c_jl_NumberFormatException((("For input string: \"" + s) + "\""));
});
$p.fH = (function(s, radix, overflowBarrier) {
  if ((s === null)) {
    $m_jl_Integer$().dr(s);
  }
  var len = s.length;
  if ((len === 0)) {
    $m_jl_Integer$().dr(s);
  }
  var character = $m_jl_Character$();
  var firstChar = s.charCodeAt(0);
  var negative = (firstChar === 45);
  var sign = (negative ? (-1) : 0);
  var i = ((negative || (firstChar === 43)) ? 1 : 0);
  if ((i >= len)) {
    $m_jl_Integer$().dr(s);
  }
  var java$lang$IntFloatBits$Int32Box$$value = 0;
  java$lang$IntFloatBits$Int32Box$$value = 0;
  while ((i !== len)) {
    var x = character.gr(s.charCodeAt(i), radix);
    if (((x < 0) || ((java$lang$IntFloatBits$Int32Box$$value >>> 0) > (overflowBarrier >>> 0)))) {
      $m_jl_Integer$().dr(s);
    }
    var x$2 = java$lang$IntFloatBits$Int32Box$$value;
    var x$3 = Math.imul(x$2, radix);
    var v = ((x$3 + x) | 0);
    java$lang$IntFloatBits$Int32Box$$value = v;
    i = ((1 + i) | 0);
  }
  if (((java$lang$IntFloatBits$Int32Box$$value >>> 0) > (((2147483647 - sign) | 0) >>> 0))) {
    $m_jl_Integer$().dr(s);
  }
  return (((java$lang$IntFloatBits$Int32Box$$value ^ sign) - sign) | 0);
});
$p.c5 = (function(i) {
  var t1 = ((i - (1431655765 & (i >> 1))) | 0);
  var t2 = (((858993459 & t1) + (858993459 & (t1 >> 2))) | 0);
  return (Math.imul(16843009, (252645135 & ((t2 + (t2 >> 4)) | 0))) >> 24);
});
var $d_jl_Integer$ = new $TypeData().i($c_jl_Integer$, "java.lang.Integer$", ({
  bo: 1,
  a: 1
}));
var $n_jl_Integer$;
function $m_jl_Integer$() {
  if ((!$n_jl_Integer$)) {
    $n_jl_Integer$ = new $c_jl_Integer$();
  }
  return $n_jl_Integer$;
}
/** @constructor */
function $c_jl_Number() {
}
$p = $c_jl_Number.prototype = new $h_O();
$p.constructor = $c_jl_Number;
/** @constructor */
function $h_jl_Number() {
}
$h_jl_Number.prototype = $p;
function $is_jl_Number(obj) {
  return (((obj instanceof $c_jl_Number) || ((typeof obj) === "number")) || (obj instanceof $c_RTLong));
}
function $isArrayOf_jl_Number(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.O)));
}
/** @constructor */
function $c_jl_StackTraceElement(declaringClass, methodName, fileName, lineNumber, columnNumber) {
  this.cA = null;
  this.cY = null;
  this.cB = null;
  this.cC = 0;
  this.cz = 0;
  this.cA = declaringClass;
  this.cY = methodName;
  this.cB = fileName;
  this.cC = lineNumber;
  this.cz = columnNumber;
}
$p = $c_jl_StackTraceElement.prototype = new $h_O();
$p.constructor = $c_jl_StackTraceElement;
/** @constructor */
function $h_jl_StackTraceElement() {
}
$h_jl_StackTraceElement.prototype = $p;
$p.H = (function(that) {
  return ((that instanceof $c_jl_StackTraceElement) && (((((this.cB === that.cB) && (this.cC === that.cC)) && (this.cz === that.cz)) && (this.cA === that.cA)) && (this.cY === that.cY)));
});
$p.A = (function() {
  var result = "";
  if ((this.cA !== "<jscode>")) {
    result = ((("" + result) + this.cA) + ".");
  }
  result = (("" + result) + this.cY);
  if ((this.cB === null)) {
    result = (result + "(Unknown Source)");
  } else {
    result = ((result + "(") + this.cB);
    if ((this.cC >= 0)) {
      result = ((result + ":") + this.cC);
      if ((this.cz >= 0)) {
        result = ((result + ":") + this.cz);
      }
    }
    result = (result + ")");
  }
  return result;
});
$p.I = (function() {
  return (((($f_T__hashCode__I(this.cA) ^ $f_T__hashCode__I(this.cY)) ^ $f_T__hashCode__I(this.cB)) ^ this.cC) ^ this.cz);
});
function $isArrayOf_jl_StackTraceElement(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.ax)));
}
var $d_jl_StackTraceElement = new $TypeData().i($c_jl_StackTraceElement, "java.lang.StackTraceElement", ({
  ax: 1,
  a: 1
}));
function $ct_jl_Throwable__T__jl_Throwable__Z__Z__($thiz, s, e, enableSuppression, writableStackTrace) {
  $thiz.eK = s;
  $thiz.dx = e;
  $thiz.eL = writableStackTrace;
  if (writableStackTrace) {
    $thiz.cP();
  }
  return $thiz;
}
class $c_jl_Throwable extends Error {
  constructor() {
    super();
    this.eK = null;
    this.dx = null;
    this.eL = false;
    this.eJ = null;
    this.cb = null;
  }
  dp() {
    return this.eK;
  }
  cP() {
    var reference = ((this instanceof $c_sjs_js_JavaScriptException) ? this.bp : this);
    this.eJ = ((Object.prototype.toString.call(reference) === "[object Error]") ? reference : (((Error.captureStackTrace === (void 0)) || (!(!Object.isSealed(this)))) ? new Error() : (Error.captureStackTrace(this), this)));
    return this;
  }
  ex() {
    if ((this.cb === null)) {
      if (this.eL) {
        this.cb = $m_jl_StackTrace$().gA(this.eJ);
      } else {
        this.cb = new ($d_jl_StackTraceElement.r().C)(0);
      }
    }
    return this.cb;
  }
  ds(s) {
    this.ex();
    var t = this.A();
    s.cs(t);
    if ((this.cb.a.length !== 0)) {
      var i = 0;
      while ((i < this.cb.a.length)) {
        var t$1 = ("  at " + this.cb.a[i]);
        s.cs(t$1);
        i = ((1 + i) | 0);
      }
    } else {
      s.cs("  <no stack trace available>");
    }
    var wCause = this;
    while (((wCause !== wCause.dx) && (wCause.dx !== null))) {
      var parentTrace = wCause.ex();
      wCause = wCause.dx;
      var thisTrace = wCause.ex();
      var thisLength = thisTrace.a.length;
      var parentLength = parentTrace.a.length;
      var t$2 = ("Caused by: " + wCause);
      s.cs(t$2);
      if ((thisLength !== 0)) {
        var sameFrameCount = 0;
        while (true) {
          if (((sameFrameCount < thisLength) && (sameFrameCount < parentLength))) {
            var x = thisTrace.a[(((-1) + ((thisLength - sameFrameCount) | 0)) | 0)];
            var x$2 = parentTrace.a[(((-1) + ((parentLength - sameFrameCount) | 0)) | 0)];
            var $x_1 = ((x === null) ? (x$2 === null) : x.H(x$2));
          } else {
            var $x_1 = false;
          }
          if ($x_1) {
            sameFrameCount = ((1 + sameFrameCount) | 0);
          } else {
            break;
          }
        }
        if ((sameFrameCount > 0)) {
          sameFrameCount = (((-1) + sameFrameCount) | 0);
        }
        var lengthToPrint = ((thisLength - sameFrameCount) | 0);
        var i$2 = 0;
        while ((i$2 < lengthToPrint)) {
          var t$3 = ("  at " + thisTrace.a[i$2]);
          s.cs(t$3);
          i$2 = ((1 + i$2) | 0);
        }
        if ((sameFrameCount > 0)) {
          var t$4 = (("  ... " + sameFrameCount) + " more");
          s.cs(t$4);
        }
      } else {
        s.cs("  <no stack trace available>");
      }
    }
  }
  A() {
    var className = $objectClassName(this);
    var message = this.dp();
    return ((message === null) ? className : ((className + ": ") + message));
  }
  I() {
    return $c_O.prototype.I.call(this);
  }
  H(that) {
    return $c_O.prototype.H.call(this, that);
  }
  get "message"() {
    var m = this.dp();
    return ((m === null) ? "" : m);
  }
  get "name"() {
    return $objectClassName(this);
  }
  "toString"() {
    return this.A();
  }
}
function $isArrayOf_jl_Throwable(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.f)));
}
function $ct_ju_concurrent_atomic_AtomicReference__O__($thiz, value) {
  $thiz.y = value;
  return $thiz;
}
/** @constructor */
function $c_ju_concurrent_atomic_AtomicReference() {
  this.y = null;
}
$p = $c_ju_concurrent_atomic_AtomicReference.prototype = new $h_O();
$p.constructor = $c_ju_concurrent_atomic_AtomicReference;
/** @constructor */
function $h_ju_concurrent_atomic_AtomicReference() {
}
$h_ju_concurrent_atomic_AtomicReference.prototype = $p;
$p.dk = (function(expect, update) {
  if (Object.is(expect, this.y)) {
    this.y = update;
    return true;
  } else {
    return false;
  }
});
$p.A = (function() {
  return ("" + this.y);
});
/** @constructor */
function $c_s_LowPriorityImplicits() {
}
$p = $c_s_LowPriorityImplicits.prototype = new $h_s_LowPriorityImplicits2();
$p.constructor = $c_s_LowPriorityImplicits;
/** @constructor */
function $h_s_LowPriorityImplicits() {
}
$h_s_LowPriorityImplicits.prototype = $p;
function $f_s_PartialFunction__applyOrElse__O__F1__O($thiz, x, default$1) {
  return ($thiz.dV(x) ? $thiz.l(x) : default$1.l(x));
}
/** @constructor */
function $c_sci_MapNode() {
}
$p = $c_sci_MapNode.prototype = new $h_sci_Node();
$p.constructor = $c_sci_MapNode;
/** @constructor */
function $h_sci_MapNode() {
}
$h_sci_MapNode.prototype = $p;
function $f_scm_Growable__addAll__sc_IterableOnce__scm_Growable($thiz, elems) {
  if ((elems === $thiz)) {
    $thiz.aS($m_scm_Buffer$().fC(elems));
  } else {
    var it = elems.p();
    while (it.k()) {
      $thiz.b2(it.h());
    }
  }
  return $thiz;
}
function $f_s_concurrent_BatchingExecutor__submitSyncBatched__jl_Runnable__V($thiz, runnable) {
  if ((runnable === null)) {
    throw $ct_jl_NullPointerException__T__(new $c_jl_NullPointerException(), "runnable is null");
  }
  var tl = $thiz.fc;
  var b = tl.aU();
  if ((b instanceof $c_s_concurrent_BatchingExecutor$SyncBatch)) {
    b.hb(runnable);
  } else {
    var i = ((b !== null) ? b : 0);
    if ((i < 16)) {
      tl.du(((1 + i) | 0));
      try {
        runnable.cu();
      } catch (e) {
        var e$2 = ((e instanceof $c_jl_Throwable) ? e : new $c_sjs_js_JavaScriptException(e));
        if (false) {
          $m_s_concurrent_ExecutionContext$().cM.l(e$2);
        } else {
          matchResult3: {
            if ($m_s_util_control_NonFatal$().dQ(e$2)) {
              $m_s_concurrent_ExecutionContext$().cM.l(e$2);
              break matchResult3;
            }
            throw ((e$2 instanceof $c_sjs_js_JavaScriptException) ? e$2.bp : e$2);
          }
        }
      } finally {
        tl.du(b);
      }
    } else {
      var batch = new $c_s_concurrent_BatchingExecutor$SyncBatch($thiz, runnable);
      tl.du(batch);
      batch.cu();
      tl.du(b);
    }
  }
}
/** @constructor */
function $c_s_concurrent_impl_Promise$ManyCallbacks(first, rest) {
  this.ei = null;
  this.ej = null;
  this.ei = first;
  this.ej = rest;
}
$p = $c_s_concurrent_impl_Promise$ManyCallbacks.prototype = new $h_O();
$p.constructor = $c_s_concurrent_impl_Promise$ManyCallbacks;
/** @constructor */
function $h_s_concurrent_impl_Promise$ManyCallbacks() {
}
$h_s_concurrent_impl_Promise$ManyCallbacks.prototype = $p;
$p.A = (function() {
  return "ManyCallbacks";
});
function $isArrayOf_s_concurrent_impl_Promise$ManyCallbacks(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.b4)));
}
var $d_s_concurrent_impl_Promise$ManyCallbacks = new $TypeData().i($c_s_concurrent_impl_Promise$ManyCallbacks, "scala.concurrent.impl.Promise$ManyCallbacks", ({
  b4: 1,
  a3: 1
}));
/** @constructor */
function $c_sr_AbstractFunction0() {
}
$p = $c_sr_AbstractFunction0.prototype = new $h_O();
$p.constructor = $c_sr_AbstractFunction0;
/** @constructor */
function $h_sr_AbstractFunction0() {
}
$h_sr_AbstractFunction0.prototype = $p;
$p.A = (function() {
  return "<function0>";
});
/** @constructor */
function $c_sr_AbstractFunction1() {
}
$p = $c_sr_AbstractFunction1.prototype = new $h_O();
$p.constructor = $c_sr_AbstractFunction1;
/** @constructor */
function $h_sr_AbstractFunction1() {
}
$h_sr_AbstractFunction1.prototype = $p;
$p.A = (function() {
  return "<function1>";
});
/** @constructor */
function $c_sr_AbstractFunction2() {
}
$p = $c_sr_AbstractFunction2.prototype = new $h_O();
$p.constructor = $c_sr_AbstractFunction2;
/** @constructor */
function $h_sr_AbstractFunction2() {
}
$h_sr_AbstractFunction2.prototype = $p;
$p.A = (function() {
  return "<function2>";
});
/** @constructor */
function $c_s_util_hashing_MurmurHash3$() {
  this.dJ = 0;
  this.c3 = 0;
  this.g2 = 0;
  this.el = 0;
  $n_s_util_hashing_MurmurHash3$ = this;
  this.dJ = $f_T__hashCode__I("Seq");
  this.c3 = $f_T__hashCode__I("Map");
  this.g2 = $f_T__hashCode__I("Set");
  this.el = this.fW($m_sci_Nil$(), this.c3);
}
$p = $c_s_util_hashing_MurmurHash3$.prototype = new $h_s_util_hashing_MurmurHash3();
$p.constructor = $c_s_util_hashing_MurmurHash3$;
/** @constructor */
function $h_s_util_hashing_MurmurHash3$() {
}
$h_s_util_hashing_MurmurHash3$.prototype = $p;
$p.bs = (function(x, y) {
  return this.fV($m_sr_Statics$().ac(x), $m_sr_Statics$().ac(y), (-889275714));
});
$p.fR = (function(xs) {
  return ($is_sc_IndexedSeq(xs) ? this.gS(xs, this.dJ) : ((xs instanceof $c_sci_List) ? this.gY(xs, this.dJ) : this.h8(xs, this.dJ)));
});
$p.h2 = (function(xs) {
  if (xs.n()) {
    return this.el;
  } else {
    var accum = new $c_s_util_hashing_MurmurHash3$accum$1();
    var h = this.c3;
    xs.cn(accum);
    h = this.x(h, accum.dK);
    h = this.x(h, accum.dL);
    h = this.cr(h, accum.dM);
    return this.aH(h, accum.dN);
  }
});
var $d_s_util_hashing_MurmurHash3$ = new $TypeData().i($c_s_util_hashing_MurmurHash3$, "scala.util.hashing.MurmurHash3$", ({
  e6: 1,
  e5: 1
}));
var $n_s_util_hashing_MurmurHash3$;
function $m_s_util_hashing_MurmurHash3$() {
  if ((!$n_s_util_hashing_MurmurHash3$)) {
    $n_s_util_hashing_MurmurHash3$ = new $c_s_util_hashing_MurmurHash3$();
  }
  return $n_s_util_hashing_MurmurHash3$;
}
/** @constructor */
function $c_s_util_hashing_MurmurHash3$accum$1() {
  this.dK = 0;
  this.dL = 0;
  this.dN = 0;
  this.dM = 0;
  this.dK = 0;
  this.dL = 0;
  this.dN = 0;
  this.dM = 1;
}
$p = $c_s_util_hashing_MurmurHash3$accum$1.prototype = new $h_O();
$p.constructor = $c_s_util_hashing_MurmurHash3$accum$1;
/** @constructor */
function $h_s_util_hashing_MurmurHash3$accum$1() {
}
$h_s_util_hashing_MurmurHash3$accum$1.prototype = $p;
$p.A = (function() {
  return "<function2>";
});
$p.ge = (function(k, v) {
  var h = $m_s_util_hashing_MurmurHash3$().bs(k, v);
  this.dK = ((this.dK + h) | 0);
  this.dL = (this.dL ^ h);
  this.dM = Math.imul(this.dM, (1 | h));
  this.dN = ((1 + this.dN) | 0);
});
$p.ci = (function(v1, v2) {
  this.ge(v1, v2);
});
var $d_s_util_hashing_MurmurHash3$accum$1 = new $TypeData().i($c_s_util_hashing_MurmurHash3$accum$1, "scala.util.hashing.MurmurHash3$accum$1", ({
  e7: 1,
  aA: 1
}));
/** @constructor */
function $c_jl_Class($data) {
  this.bh = $data;
}
$p = $c_jl_Class.prototype = new $h_O();
$p.constructor = $c_jl_Class;
/** @constructor */
function $h_jl_Class() {
}
$h_jl_Class.prototype = $p;
$p.A = (function() {
  return ((this.bh.Y ? "interface " : (this.bh.X ? "" : "class ")) + this.bh.N);
});
var $d_jl_Class = new $TypeData().i($c_jl_Class, "java.lang.Class", ({
  bj: 1,
  a: 1,
  y: 1
}));
class $c_jl_Error extends $c_jl_Throwable {
}
function $isArrayOf_jl_Error(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.at)));
}
function $ct_jl_Exception__T__($thiz, s) {
  $ct_jl_Throwable__T__jl_Throwable__Z__Z__($thiz, s, null, true, true);
  return $thiz;
}
class $c_jl_Exception extends $c_jl_Throwable {
}
var $d_jl_Exception = new $TypeData().i($c_jl_Exception, "java.lang.Exception", ({
  l: 1,
  f: 1,
  a: 1
}));
/** @constructor */
function $c_s_Predef$() {
  this.g0 = null;
  $n_s_Predef$ = this;
  $m_sci_List$();
  this.g0 = $m_sci_Map$();
}
$p = $c_s_Predef$.prototype = new $h_s_LowPriorityImplicits();
$p.constructor = $c_s_Predef$;
/** @constructor */
function $h_s_Predef$() {
}
$h_s_Predef$.prototype = $p;
$p.hg = (function(requirement) {
  if ((!requirement)) {
    throw $ct_jl_IllegalArgumentException__T__(new $c_jl_IllegalArgumentException(), "requirement failed");
  }
});
var $d_s_Predef$ = new $TypeData().i($c_s_Predef$, "scala.Predef$", ({
  bX: 1,
  bS: 1,
  bT: 1
}));
var $n_s_Predef$;
function $m_s_Predef$() {
  if ((!$n_s_Predef$)) {
    $n_s_Predef$ = new $c_s_Predef$();
  }
  return $n_s_Predef$;
}
function $f_s_Product2__productElement__I__O($thiz, n) {
  switch (n) {
    case 0: {
      return $thiz.aw;
      break;
    }
    case 1: {
      return $thiz.ai;
      break;
    }
    default: {
      throw $ct_jl_IndexOutOfBoundsException__T__(new $c_jl_IndexOutOfBoundsException(), (n + " is out of bounds (min 0, max 1)"));
    }
  }
}
function $f_s_Product3__productElement__I__O($thiz, n) {
  switch (n) {
    case 0: {
      return $thiz.cF;
      break;
    }
    case 1: {
      return $thiz.cG;
      break;
    }
    case 2: {
      return $thiz.cH;
      break;
    }
    default: {
      throw $ct_jl_IndexOutOfBoundsException__T__(new $c_jl_IndexOutOfBoundsException(), (n + " is out of bounds (min 0, max 2)"));
    }
  }
}
function $ct_sc_IterableFactory$Delegate__sc_IterableFactory__($thiz, delegate) {
  $thiz.e6 = delegate;
  return $thiz;
}
/** @constructor */
function $c_sc_IterableFactory$Delegate() {
  this.e6 = null;
}
$p = $c_sc_IterableFactory$Delegate.prototype = new $h_O();
$p.constructor = $c_sc_IterableFactory$Delegate;
/** @constructor */
function $h_sc_IterableFactory$Delegate() {
}
$h_sc_IterableFactory$Delegate.prototype = $p;
$p.b3 = (function() {
  return this.e6.b3();
});
function $f_sc_IterableOps__sizeCompare__I__I($thiz, otherSize) {
  if ((otherSize < 0)) {
    return 1;
  } else {
    var known = $thiz.D();
    if ((known >= 0)) {
      return ((known === otherSize) ? 0 : ((known < otherSize) ? (-1) : 1));
    } else {
      var i = 0;
      var it = $thiz.p();
      while (it.k()) {
        if ((i === otherSize)) {
          return 1;
        }
        it.h();
        i = ((1 + i) | 0);
      }
      return ((i - otherSize) | 0);
    }
  }
}
function $f_sc_Iterator__concat__F0__sc_Iterator($thiz, xs) {
  return new $c_sc_Iterator$ConcatIterator($thiz).eq(xs);
}
function $f_sc_Iterator__sliceIterator__I__I__sc_Iterator($thiz, from, until) {
  var lo = ((from > 0) ? from : 0);
  var rest = ((until < 0) ? (-1) : ((until <= lo) ? 0 : ((until - lo) | 0)));
  return ((rest === 0) ? $m_sc_Iterator$().a2 : new $c_sc_Iterator$SliceIterator($thiz, lo, rest));
}
function $f_sc_Iterator__sameElements__sc_IterableOnce__Z($thiz, that) {
  var those = that.p();
  while ($thiz.k()) {
    if ((!those.k())) {
      return false;
    }
    if ((!$m_sr_BoxesRunTime$().i($thiz.h(), those.h()))) {
      return false;
    }
  }
  return (!those.k());
}
/** @constructor */
function $c_sc_Iterator$() {
  this.a2 = null;
  $n_sc_Iterator$ = this;
  this.a2 = new $c_sc_Iterator$$anon$19();
}
$p = $c_sc_Iterator$.prototype = new $h_O();
$p.constructor = $c_sc_Iterator$;
/** @constructor */
function $h_sc_Iterator$() {
}
$h_sc_Iterator$.prototype = $p;
$p.b3 = (function() {
  return new $c_sc_Iterator$$anon$21();
});
var $d_sc_Iterator$ = new $TypeData().i($c_sc_Iterator$, "scala.collection.Iterator$", ({
  c8: 1,
  a: 1,
  J: 1
}));
var $n_sc_Iterator$;
function $m_sc_Iterator$() {
  if ((!$n_sc_Iterator$)) {
    $n_sc_Iterator$ = new $c_sc_Iterator$();
  }
  return $n_sc_Iterator$;
}
function $ct_sc_MapFactory$Delegate__sc_MapFactory__($thiz, delegate) {
  $thiz.eX = delegate;
  return $thiz;
}
/** @constructor */
function $c_sc_MapFactory$Delegate() {
  this.eX = null;
}
$p = $c_sc_MapFactory$Delegate.prototype = new $h_O();
$p.constructor = $c_sc_MapFactory$Delegate;
/** @constructor */
function $h_sc_MapFactory$Delegate() {
}
$h_sc_MapFactory$Delegate.prototype = $p;
/** @constructor */
function $c_sci_BitmapIndexedMapNode(dataMap, nodeMap, content, originalHashes, size, cachedJavaKeySetHashCode) {
  this.F = 0;
  this.Q = 0;
  this.a0 = null;
  this.aK = null;
  this.ao = 0;
  this.aC = 0;
  this.F = dataMap;
  this.Q = nodeMap;
  this.a0 = content;
  this.aK = originalHashes;
  this.ao = size;
  this.aC = cachedJavaKeySetHashCode;
}
$p = $c_sci_BitmapIndexedMapNode.prototype = new $h_sci_MapNode();
$p.constructor = $c_sci_BitmapIndexedMapNode;
/** @constructor */
function $h_sci_BitmapIndexedMapNode() {
}
$h_sci_BitmapIndexedMapNode.prototype = $p;
$p.az = (function() {
  return this.ao;
});
$p.c7 = (function() {
  return this.aC;
});
$p.c8 = (function(index) {
  return this.a0.a[(index << 1)];
});
$p.bM = (function(index) {
  return this.a0.a[((1 + (index << 1)) | 0)];
});
$p.fF = (function(index) {
  return new $c_T2(this.a0.a[(index << 1)], this.a0.a[((1 + (index << 1)) | 0)]);
});
$p.dn = (function(index) {
  return this.aK.a[index];
});
$p.bL = (function(index) {
  return this.a0.a[(((((-1) + this.a0.a.length) | 0) - index) | 0)];
});
$p.em = (function(key, originalHash, keyHash, shift) {
  var mask = $m_sci_Node$().cq(keyHash, shift);
  var bitpos = $m_sci_Node$().c6(mask);
  if (((this.F & bitpos) !== 0)) {
    var index = $m_sci_Node$().by(this.F, mask, bitpos);
    if ($m_sr_BoxesRunTime$().i(key, this.c8(index))) {
      return this.bM(index);
    } else {
      throw $ct_ju_NoSuchElementException__T__(new $c_ju_NoSuchElementException(), ("key not found: " + key));
    }
  } else if (((this.Q & bitpos) !== 0)) {
    return this.bL($m_sci_Node$().by(this.Q, mask, bitpos)).em(key, originalHash, keyHash, ((5 + shift) | 0));
  } else {
    throw $ct_ju_NoSuchElementException__T__(new $c_ju_NoSuchElementException(), ("key not found: " + key));
  }
});
$p.ev = (function(key, originalHash, keyHash, shift, f) {
  var mask = $m_sci_Node$().cq(keyHash, shift);
  var bitpos = $m_sci_Node$().c6(mask);
  if (((this.F & bitpos) !== 0)) {
    var index = $m_sci_Node$().by(this.F, mask, bitpos);
    return ($m_sr_BoxesRunTime$().i(key, this.c8(index)) ? this.bM(index) : f.aT());
  } else {
    return (((this.Q & bitpos) !== 0) ? this.bL($m_sci_Node$().by(this.Q, mask, bitpos)).ev(key, originalHash, keyHash, ((5 + shift) | 0), f) : f.aT());
  }
});
$p.er = (function(key, originalHash, keyHash, shift) {
  var mask = $m_sci_Node$().cq(keyHash, shift);
  var bitpos = $m_sci_Node$().c6(mask);
  if (((this.F & bitpos) !== 0)) {
    var index = $m_sci_Node$().by(this.F, mask, bitpos);
    return ((this.aK.a[index] === originalHash) && $m_sr_BoxesRunTime$().i(key, this.c8(index)));
  } else {
    return (((this.Q & bitpos) !== 0) && this.bL($m_sci_Node$().by(this.Q, mask, bitpos)).er(key, originalHash, keyHash, ((5 + shift) | 0)));
  }
});
$p.fX = (function(key, value, originalHash, keyHash, shift, replaceValue) {
  var mask = $m_sci_Node$().cq(keyHash, shift);
  var bitpos = $m_sci_Node$().c6(mask);
  if (((this.F & bitpos) !== 0)) {
    var index = $m_sci_Node$().by(this.F, mask, bitpos);
    var key0 = this.c8(index);
    var key0UnimprovedHash = this.dn(index);
    if (((key0UnimprovedHash === originalHash) && $m_sr_BoxesRunTime$().i(key0, key))) {
      if (replaceValue) {
        var value0 = this.bM(index);
        return ((Object.is(key0, key) && Object.is(value0, value)) ? this : this.gq(bitpos, key, value));
      } else {
        return this;
      }
    } else {
      var value0$2 = this.bM(index);
      var key0Hash = $m_sc_Hashing$().bq(key0UnimprovedHash);
      return this.go(bitpos, key0Hash, this.eA(key0, value0$2, key0UnimprovedHash, key0Hash, key, value, originalHash, keyHash, ((5 + shift) | 0)));
    }
  } else if (((this.Q & bitpos) !== 0)) {
    var index$2 = $m_sci_Node$().by(this.Q, mask, bitpos);
    var subNode = this.bL(index$2);
    var subNodeNew$2 = subNode.fY(key, value, originalHash, keyHash, ((5 + shift) | 0), replaceValue);
    return ((subNodeNew$2 === subNode) ? this : this.gp(bitpos, subNode, subNodeNew$2));
  } else {
    return this.gn(bitpos, key, originalHash, keyHash, value);
  }
});
$p.eA = (function(key0, value0, originalHash0, keyHash0, key1, value1, originalHash1, keyHash1, shift) {
  if ((shift >= 32)) {
    return new $c_sci_HashCollisionMapNode(originalHash0, keyHash0, $m_sci_Vector$().fD(new $c_sjsr_WrappedVarArgs([new $c_T2(key0, value0), new $c_T2(key1, value1)])));
  } else {
    var mask0 = $m_sci_Node$().cq(keyHash0, shift);
    var mask1 = $m_sci_Node$().cq(keyHash1, shift);
    var newCachedHash = ((keyHash0 + keyHash1) | 0);
    if ((mask0 !== mask1)) {
      var dataMap = ($m_sci_Node$().c6(mask0) | $m_sci_Node$().c6(mask1));
      if ((mask0 < mask1)) {
        var xs = new $c_sjsr_WrappedVarArgs([key0, value0, key1, value1]);
        var array$2 = new $ac_O(xs.w());
        var iterator = new $c_sc_IndexedSeqView$IndexedSeqViewIterator(new $c_sc_IndexedSeqView$Id(xs));
        var i = 0;
        while ((iterator.aI > 0)) {
          array$2.a[i] = iterator.h();
          i = ((1 + i) | 0);
        }
        return new $c_sci_BitmapIndexedMapNode(dataMap, 0, array$2, new $ac_I(new Int32Array([originalHash0, originalHash1])), 2, newCachedHash);
      } else {
        var xs$1 = new $c_sjsr_WrappedVarArgs([key1, value1, key0, value0]);
        var array$4 = new $ac_O(xs$1.w());
        var iterator$1 = new $c_sc_IndexedSeqView$IndexedSeqViewIterator(new $c_sc_IndexedSeqView$Id(xs$1));
        var i$1 = 0;
        while ((iterator$1.aI > 0)) {
          array$4.a[i$1] = iterator$1.h();
          i$1 = ((1 + i$1) | 0);
        }
        return new $c_sci_BitmapIndexedMapNode(dataMap, 0, array$4, new $ac_I(new Int32Array([originalHash1, originalHash0])), 2, newCachedHash);
      }
    } else {
      var nodeMap = $m_sci_Node$().c6(mask0);
      var node = this.eA(key0, value0, originalHash0, keyHash0, key1, value1, originalHash1, keyHash1, ((5 + shift) | 0));
      var xs$2 = new $c_sjsr_WrappedVarArgs([node]);
      var array$6 = new $ac_O(xs$2.w());
      var iterator$2 = new $c_sc_IndexedSeqView$IndexedSeqViewIterator(new $c_sc_IndexedSeqView$Id(xs$2));
      var i$2 = 0;
      while ((iterator$2.aI > 0)) {
        array$6.a[i$2] = iterator$2.h();
        i$2 = ((1 + i$2) | 0);
      }
      return new $c_sci_BitmapIndexedMapNode(0, nodeMap, array$6, $m_s_Array$EmptyArrays$().e5, node.az(), node.c7());
    }
  }
});
$p.ey = (function() {
  return (this.Q !== 0);
});
$p.eB = (function() {
  return $m_jl_Integer$().c5(this.Q);
});
$p.dU = (function() {
  return (this.F !== 0);
});
$p.eD = (function() {
  return $m_jl_Integer$().c5(this.F);
});
$p.dl = (function(bitpos) {
  return $m_jl_Integer$().c5((this.F & (((-1) + bitpos) | 0)));
});
$p.eC = (function(bitpos) {
  return $m_jl_Integer$().c5((this.Q & (((-1) + bitpos) | 0)));
});
$p.gq = (function(bitpos, newKey, newValue) {
  var dataIx = this.dl(bitpos);
  var idx = (dataIx << 1);
  var src = this.a0;
  var dst = new $ac_O(src.a.length);
  var length = src.a.length;
  src.j(0, dst, 0, length);
  dst.a[((1 + idx) | 0)] = newValue;
  return new $c_sci_BitmapIndexedMapNode(this.F, this.Q, dst, this.aK, this.ao, this.aC);
});
$p.gp = (function(bitpos, oldNode, newNode) {
  var idx = (((((-1) + this.a0.a.length) | 0) - this.eC(bitpos)) | 0);
  var src = this.a0;
  var dst = new $ac_O(src.a.length);
  var length = src.a.length;
  src.j(0, dst, 0, length);
  dst.a[idx] = newNode;
  return new $c_sci_BitmapIndexedMapNode(this.F, this.Q, dst, this.aK, ((((this.ao - oldNode.az()) | 0) + newNode.az()) | 0), ((((this.aC - oldNode.c7()) | 0) + newNode.c7()) | 0));
});
$p.gn = (function(bitpos, key, originalHash, keyHash, value) {
  var dataIx = this.dl(bitpos);
  var idx = (dataIx << 1);
  var src = this.a0;
  var dst = new $ac_O(((2 + src.a.length) | 0));
  src.j(0, dst, 0, idx);
  dst.a[idx] = key;
  dst.a[((1 + idx) | 0)] = value;
  var destPos = ((2 + idx) | 0);
  var length = ((src.a.length - idx) | 0);
  src.j(idx, dst, destPos, length);
  var dstHashes = this.gV(this.aK, dataIx, originalHash);
  return new $c_sci_BitmapIndexedMapNode((this.F | bitpos), this.Q, dst, dstHashes, ((1 + this.ao) | 0), ((this.aC + keyHash) | 0));
});
$p.h3 = (function(bitpos, keyHash, node) {
  var dataIx = this.dl(bitpos);
  var idxOld = (dataIx << 1);
  var idxNew = (((((-2) + this.a0.a.length) | 0) - this.eC(bitpos)) | 0);
  var src = this.a0;
  var dst = new $ac_O((((-1) + src.a.length) | 0));
  src.j(0, dst, 0, idxOld);
  var srcPos = ((2 + idxOld) | 0);
  var length = ((idxNew - idxOld) | 0);
  src.j(srcPos, dst, idxOld, length);
  dst.a[idxNew] = node;
  var srcPos$1 = ((2 + idxNew) | 0);
  var destPos = ((1 + idxNew) | 0);
  var length$1 = (((-2) + ((src.a.length - idxNew) | 0)) | 0);
  src.j(srcPos$1, dst, destPos, length$1);
  var dstHashes = this.fN(this.aK, dataIx);
  this.F = (this.F ^ bitpos);
  this.Q = (this.Q | bitpos);
  this.a0 = dst;
  this.aK = dstHashes;
  this.ao = (((((-1) + this.ao) | 0) + node.az()) | 0);
  this.aC = ((((this.aC - keyHash) | 0) + node.c7()) | 0);
  return this;
});
$p.go = (function(bitpos, keyHash, node) {
  var dataIx = this.dl(bitpos);
  var idxOld = (dataIx << 1);
  var idxNew = (((((-2) + this.a0.a.length) | 0) - this.eC(bitpos)) | 0);
  var src = this.a0;
  var dst = new $ac_O((((-1) + src.a.length) | 0));
  src.j(0, dst, 0, idxOld);
  var srcPos = ((2 + idxOld) | 0);
  var length = ((idxNew - idxOld) | 0);
  src.j(srcPos, dst, idxOld, length);
  dst.a[idxNew] = node;
  var srcPos$1 = ((2 + idxNew) | 0);
  var destPos = ((1 + idxNew) | 0);
  var length$1 = (((-2) + ((src.a.length - idxNew) | 0)) | 0);
  src.j(srcPos$1, dst, destPos, length$1);
  var dstHashes = this.fN(this.aK, dataIx);
  return new $c_sci_BitmapIndexedMapNode((this.F ^ bitpos), (this.Q | bitpos), dst, dstHashes, (((((-1) + this.ao) | 0) + node.az()) | 0), ((((this.aC - keyHash) | 0) + node.c7()) | 0));
});
$p.cn = (function(f) {
  var iN = $m_jl_Integer$().c5(this.F);
  var i$1 = 0;
  while ((i$1 < iN)) {
    f.ci(this.c8(i$1), this.bM(i$1));
    i$1 = ((1 + i$1) | 0);
  }
  var jN = $m_jl_Integer$().c5(this.Q);
  var j = 0;
  while ((j < jN)) {
    this.bL(j).cn(f);
    j = ((1 + j) | 0);
  }
});
$p.H = (function(that) {
  if ((that instanceof $c_sci_BitmapIndexedMapNode)) {
    if ((this === that)) {
      return true;
    } else if ((((((this.aC === that.aC) && (this.Q === that.Q)) && (this.F === that.F)) && (this.ao === that.ao)) && $m_ju_Arrays$().gw(this.aK, that.aK))) {
      var a1 = this.a0;
      var a2 = that.a0;
      var length = this.a0.a.length;
      if ((a1 === a2)) {
        return true;
      } else {
        var isEqual = true;
        var i = 0;
        while ((isEqual && (i < length))) {
          isEqual = $m_sr_BoxesRunTime$().i(a1.a[i], a2.a[i]);
          i = ((1 + i) | 0);
        }
        return isEqual;
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
});
$p.I = (function() {
  throw new $c_jl_UnsupportedOperationException("Trie nodes do not support hashing.");
});
$p.A = (function() {
  var i = $systemIdentityHashCode(this);
  return (($objectClassName(this) + "@") + (i >>> 0.0).toString(16));
});
$p.fz = (function() {
  var this$1 = this.a0;
  var contentClone = this$1.c();
  var contentLength = contentClone.a.length;
  var i$1 = ($m_jl_Integer$().c5(this.F) << 1);
  while ((i$1 < contentLength)) {
    contentClone.a[i$1] = contentClone.a[i$1].fA();
    i$1 = ((1 + i$1) | 0);
  }
  return new $c_sci_BitmapIndexedMapNode(this.F, this.Q, contentClone, this.aK.c(), this.ao, this.aC);
});
$p.eu = (function(index) {
  return this.bL(index);
});
$p.fY = (function(key, value, originalHash, hash, shift, replaceValue) {
  return this.fX(key, value, originalHash, hash, shift, replaceValue);
});
$p.fA = (function() {
  return this.fz();
});
function $isArrayOf_sci_BitmapIndexedMapNode(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.aI)));
}
var $d_sci_BitmapIndexedMapNode = new $TypeData().i($c_sci_BitmapIndexedMapNode, "scala.collection.immutable.BitmapIndexedMapNode", ({
  aI: 1,
  aS: 1,
  ab: 1
}));
/** @constructor */
function $c_sci_HashCollisionMapNode(originalHash, hash, content) {
  this.e8 = 0;
  this.bS = 0;
  this.R = null;
  this.e8 = originalHash;
  this.bS = hash;
  this.R = content;
  $m_s_Predef$().hg((this.R.w() >= 2));
}
$p = $c_sci_HashCollisionMapNode.prototype = new $h_sci_MapNode();
$p.constructor = $c_sci_HashCollisionMapNode;
/** @constructor */
function $h_sci_HashCollisionMapNode() {
}
$h_sci_HashCollisionMapNode.prototype = $p;
$p.cR = (function(key) {
  var iter = this.R.p();
  var i = 0;
  while (iter.k()) {
    if ($m_sr_BoxesRunTime$().i(iter.h().aw, key)) {
      return i;
    }
    i = ((1 + i) | 0);
  }
  return (-1);
});
$p.az = (function() {
  return this.R.w();
});
$p.em = (function(key, originalHash, hash, shift) {
  var this$1 = this.gJ(key, originalHash, hash, shift);
  return (this$1.n() ? $m_sc_Iterator$().a2.h() : this$1.aU());
});
$p.gJ = (function(key, originalHash, hash, shift) {
  if ((this.bS === hash)) {
    var index = this.cR(key);
    return ((index >= 0) ? new $c_s_Some(this.R.C(index).ai) : $m_s_None$());
  } else {
    return $m_s_None$();
  }
});
$p.ev = (function(key, originalHash, hash, shift, f) {
  if ((this.bS === hash)) {
    var x36 = this.cR(key);
    if ((x36 === (-1))) {
      return f.aT();
    }
    return this.R.C(x36).ai;
  } else {
    return f.aT();
  }
});
$p.er = (function(key, originalHash, hash, shift) {
  return ((this.bS === hash) && (this.cR(key) >= 0));
});
$p.fY = (function(key, value, originalHash, hash, shift, replaceValue) {
  var index = this.cR(key);
  return ((index >= 0) ? (replaceValue ? (Object.is(this.R.C(index).ai, value) ? this : new $c_sci_HashCollisionMapNode(originalHash, hash, this.R.ca(index, new $c_T2(key, value)))) : this) : new $c_sci_HashCollisionMapNode(originalHash, hash, this.R.c4(new $c_T2(key, value))));
});
$p.ey = (function() {
  return false;
});
$p.eB = (function() {
  return 0;
});
$p.bL = (function(index) {
  throw $ct_jl_IndexOutOfBoundsException__T__(new $c_jl_IndexOutOfBoundsException(), "No sub-nodes present in hash-collision leaf node.");
});
$p.dU = (function() {
  return true;
});
$p.eD = (function() {
  return this.R.w();
});
$p.c8 = (function(index) {
  return this.R.C(index).aw;
});
$p.bM = (function(index) {
  return this.R.C(index).ai;
});
$p.fF = (function(index) {
  return this.R.C(index);
});
$p.dn = (function(index) {
  return this.e8;
});
$p.cn = (function(f) {
  this.R.dR(new $c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28(((x$1$2) => {
    var k = x$1$2.aw;
    var v = x$1$2.ai;
    return f.ci(k, v);
  })));
});
$p.H = (function(that) {
  if ((that instanceof $c_sci_HashCollisionMapNode)) {
    if ((this === that)) {
      return true;
    } else if (((this.bS === that.bS) && (this.R.w() === that.R.w()))) {
      var iter = this.R.p();
      while (iter.k()) {
        var \u03b412$;
        var \u03b412$ = iter.h();
        var key = \u03b412$.aw;
        var value = \u03b412$.ai;
        var index = that.cR(key);
        if (((index < 0) || (!$m_sr_BoxesRunTime$().i(value, that.R.C(index).ai)))) {
          return false;
        }
      }
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
});
$p.I = (function() {
  throw new $c_jl_UnsupportedOperationException("Trie nodes do not support hashing.");
});
$p.A = (function() {
  var i = $systemIdentityHashCode(this);
  return (($objectClassName(this) + "@") + (i >>> 0.0).toString(16));
});
$p.c7 = (function() {
  return Math.imul(this.R.w(), this.bS);
});
$p.eu = (function(index) {
  return this.bL(index);
});
$p.fA = (function() {
  return new $c_sci_HashCollisionMapNode(this.e8, this.bS, this.R);
});
function $isArrayOf_sci_HashCollisionMapNode(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.aK)));
}
var $d_sci_HashCollisionMapNode = new $TypeData().i($c_sci_HashCollisionMapNode, "scala.collection.immutable.HashCollisionMapNode", ({
  aK: 1,
  aS: 1,
  ab: 1
}));
/** @constructor */
function $c_sci_HashMap$() {
  this.e9 = null;
  $n_sci_HashMap$ = this;
  this.e9 = new $c_sci_HashMap($m_sci_MapNode$().f1);
}
$p = $c_sci_HashMap$.prototype = new $h_O();
$p.constructor = $c_sci_HashMap$;
/** @constructor */
function $h_sci_HashMap$() {
}
$h_sci_HashMap$.prototype = $p;
var $d_sci_HashMap$ = new $TypeData().i($c_sci_HashMap$, "scala.collection.immutable.HashMap$", ({
  cs: 1,
  a: 1,
  a9: 1
}));
var $n_sci_HashMap$;
function $m_sci_HashMap$() {
  if ((!$n_sci_HashMap$)) {
    $n_sci_HashMap$ = new $c_sci_HashMap$();
  }
  return $n_sci_HashMap$;
}
/** @constructor */
function $c_sci_Map$() {
}
$p = $c_sci_Map$.prototype = new $h_O();
$p.constructor = $c_sci_Map$;
/** @constructor */
function $h_sci_Map$() {
}
$h_sci_Map$.prototype = $p;
$p.gF = (function(it) {
  if ($is_sci_Iterable(it)) {
    if (it.n()) {
      return $m_sci_Map$EmptyMap$();
    }
  }
  if ((it instanceof $c_sci_HashMap)) {
    return it;
  }
  if ((it instanceof $c_sci_Map$Map1)) {
    return it;
  }
  if ((it instanceof $c_sci_Map$Map2)) {
    return it;
  }
  if ((it instanceof $c_sci_Map$Map3)) {
    return it;
  }
  if ((it instanceof $c_sci_Map$Map4)) {
    return it;
  }
  if (false) {
    return it;
  }
  if (false) {
    return it;
  }
  if (false) {
    return it;
  }
  if (false) {
    return it;
  }
  if (false) {
    return it;
  }
  if (false) {
    return it;
  }
  if (false) {
    return it;
  }
  return new $c_sci_MapBuilderImpl().fs(it).fP();
});
var $d_sci_Map$ = new $TypeData().i($c_sci_Map$, "scala.collection.immutable.Map$", ({
  cz: 1,
  a: 1,
  a9: 1
}));
var $n_sci_Map$;
function $m_sci_Map$() {
  if ((!$n_sci_Map$)) {
    $n_sci_Map$ = new $c_sci_Map$();
  }
  return $n_sci_Map$;
}
/** @constructor */
function $c_s_concurrent_BatchingExecutor$SyncBatch(outer, runnable) {
  this.dc = null;
  this.dd = null;
  this.c1 = 0;
  this.g1 = null;
  if ((outer === null)) {
    throw $ct_jl_NullPointerException__(new $c_jl_NullPointerException());
  }
  this.g1 = outer;
  $ct_s_concurrent_BatchingExecutor$AbstractBatch__jl_Runnable__Ajl_Runnable__I__(this, runnable, $m_s_concurrent_BatchingExecutorStatics$().f9, 1);
}
$p = $c_s_concurrent_BatchingExecutor$SyncBatch.prototype = new $h_s_concurrent_BatchingExecutor$AbstractBatch();
$p.constructor = $c_s_concurrent_BatchingExecutor$SyncBatch;
/** @constructor */
function $h_s_concurrent_BatchingExecutor$SyncBatch() {
}
$h_s_concurrent_BatchingExecutor$SyncBatch.prototype = $p;
$p.cu = (function() {
  while (true) {
    try {
      this.hh(1024);
    } catch (e) {
      var e$2 = ((e instanceof $c_jl_Throwable) ? e : new $c_sjs_js_JavaScriptException(e));
      if (false) {
        $m_s_concurrent_ExecutionContext$().cM.l(e$2);
      } else {
        matchResult2: {
          if ($m_s_util_control_NonFatal$().dQ(e$2)) {
            $m_s_concurrent_ExecutionContext$().cM.l(e$2);
            break matchResult2;
          }
          throw ((e$2 instanceof $c_sjs_js_JavaScriptException) ? e$2.bp : e$2);
        }
      }
    }
    if ((this.c1 > 0)) {
    } else {
      return (void 0);
    }
  }
});
function $isArrayOf_s_concurrent_BatchingExecutor$SyncBatch(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.b0)));
}
var $d_s_concurrent_BatchingExecutor$SyncBatch = new $TypeData().i($c_s_concurrent_BatchingExecutor$SyncBatch, "scala.concurrent.BatchingExecutor$SyncBatch", ({
  b0: 1,
  di: 1,
  a6: 1
}));
/** @constructor */
function $c_s_concurrent_impl_Promise$Link(to) {
  this.y = null;
  $ct_ju_concurrent_atomic_AtomicReference__O__(this, to);
}
$p = $c_s_concurrent_impl_Promise$Link.prototype = new $h_ju_concurrent_atomic_AtomicReference();
$p.constructor = $c_s_concurrent_impl_Promise$Link;
/** @constructor */
function $h_s_concurrent_impl_Promise$Link() {
}
$h_s_concurrent_impl_Promise$Link.prototype = $p;
$p.cS = (function(owner) {
  var c = this.y;
  var target$tailLocal1 = c;
  var current$tailLocal1 = c;
  while (true) {
    var value = target$tailLocal1.y;
    if ($is_s_concurrent_impl_Promise$Callbacks(value)) {
      if (this.dk(current$tailLocal1, target$tailLocal1)) {
        return target$tailLocal1;
      } else {
        current$tailLocal1 = this.y;
      }
    } else if ((value instanceof $c_s_concurrent_impl_Promise$Link)) {
      target$tailLocal1 = value.y;
    } else {
      owner.ho(value);
      return owner;
    }
  }
});
function $isArrayOf_s_concurrent_impl_Promise$Link(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.b3)));
}
var $d_s_concurrent_impl_Promise$Link = new $TypeData().i($c_s_concurrent_impl_Promise$Link, "scala.concurrent.impl.Promise$Link", ({
  b3: 1,
  a8: 1,
  a: 1
}));
function $isArrayOf_s_math_ScalaNumber(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.du)));
}
/** @constructor */
function $c_sr_AbstractFunction0_$$Lambda$a02b774b97db8234e08c6a02dd06557c99779855(f) {
  this.fi = null;
  this.fi = f;
}
$p = $c_sr_AbstractFunction0_$$Lambda$a02b774b97db8234e08c6a02dd06557c99779855.prototype = new $h_sr_AbstractFunction0();
$p.constructor = $c_sr_AbstractFunction0_$$Lambda$a02b774b97db8234e08c6a02dd06557c99779855;
/** @constructor */
function $h_sr_AbstractFunction0_$$Lambda$a02b774b97db8234e08c6a02dd06557c99779855() {
}
$h_sr_AbstractFunction0_$$Lambda$a02b774b97db8234e08c6a02dd06557c99779855.prototype = $p;
$p.aT = (function() {
  return (0, this.fi)();
});
var $d_sr_AbstractFunction0_$$Lambda$a02b774b97db8234e08c6a02dd06557c99779855 = new $TypeData().i($c_sr_AbstractFunction0_$$Lambda$a02b774b97db8234e08c6a02dd06557c99779855, "scala.runtime.AbstractFunction0.$$Lambda$a02b774b97db8234e08c6a02dd06557c99779855", ({
  dD: 1,
  dC: 1,
  bR: 1
}));
/** @constructor */
function $c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28(f) {
  this.fj = null;
  this.fj = f;
}
$p = $c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28.prototype = new $h_sr_AbstractFunction1();
$p.constructor = $c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28;
/** @constructor */
function $h_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28() {
}
$h_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28.prototype = $p;
$p.l = (function(x0) {
  return (0, this.fj)(x0);
});
var $d_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28 = new $TypeData().i($c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28, "scala.runtime.AbstractFunction1.$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28", ({
  dF: 1,
  dE: 1,
  e: 1
}));
/** @constructor */
function $c_sr_AbstractFunction2_$$Lambda$286cbfc6187197affcadc8465aaec93d6b7d20dc(f) {
  this.fk = null;
  this.fk = f;
}
$p = $c_sr_AbstractFunction2_$$Lambda$286cbfc6187197affcadc8465aaec93d6b7d20dc.prototype = new $h_sr_AbstractFunction2();
$p.constructor = $c_sr_AbstractFunction2_$$Lambda$286cbfc6187197affcadc8465aaec93d6b7d20dc;
/** @constructor */
function $h_sr_AbstractFunction2_$$Lambda$286cbfc6187197affcadc8465aaec93d6b7d20dc() {
}
$h_sr_AbstractFunction2_$$Lambda$286cbfc6187197affcadc8465aaec93d6b7d20dc.prototype = $p;
$p.ci = (function(x0, x1) {
  return (0, this.fk)(x0, x1);
});
var $d_sr_AbstractFunction2_$$Lambda$286cbfc6187197affcadc8465aaec93d6b7d20dc = new $TypeData().i($c_sr_AbstractFunction2_$$Lambda$286cbfc6187197affcadc8465aaec93d6b7d20dc, "scala.runtime.AbstractFunction2.$$Lambda$286cbfc6187197affcadc8465aaec93d6b7d20dc", ({
  dH: 1,
  dG: 1,
  aA: 1
}));
/** @constructor */
function $c_sjs_js_Any$() {
}
$p = $c_sjs_js_Any$.prototype = new $h_O();
$p.constructor = $c_sjs_js_Any$;
/** @constructor */
function $h_sjs_js_Any$() {
}
$h_sjs_js_Any$.prototype = $p;
$p.gI = (function(f) {
  return (() => f.aT());
});
var $d_sjs_js_Any$ = new $TypeData().i($c_sjs_js_Any$, "scala.scalajs.js.Any$", ({
  dT: 1,
  dU: 1,
  dV: 1
}));
var $n_sjs_js_Any$;
function $m_sjs_js_Any$() {
  if ((!$n_sjs_js_Any$)) {
    $n_sjs_js_Any$ = new $c_sjs_js_Any$();
  }
  return $n_sjs_js_Any$;
}
function $isArrayOf_s_util_control_ControlThrowable(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.e2)));
}
function $p_Lgpu_ShaderDef__buildWGSL__T__T__T__T__T__T__T($thiz, vertexInputStruct, vertexOutputStruct, fragmentOutputStruct, uniformDecls, vertexBody, fragmentBody) {
  var this$4 = new $c_sci_$colon$colon(vertexInputStruct, new $c_sci_$colon$colon(vertexOutputStruct, new $c_sci_$colon$colon(fragmentOutputStruct, new $c_sci_$colon$colon(uniformDecls, new $c_sci_$colon$colon($p_Lgpu_ShaderDef__buildVertexMain__T__T($thiz, vertexBody), new $c_sci_$colon$colon($p_Lgpu_ShaderDef__buildFragmentMain__T__T($thiz, fragmentBody), $m_sci_Nil$()))))));
  var f = ((_$1$2) => {
    $m_sc_StringOps$();
    return (_$1$2 !== "");
  });
  _return: {
    var $x_1;
    var l$tailLocal1 = this$4;
    while (true) {
      if (l$tailLocal1.n()) {
        var $x_1 = $m_sci_Nil$();
        break;
      } else {
        var h = l$tailLocal1.am();
        var t = l$tailLocal1.P();
        if (((!(!f(h))) === false)) {
          l$tailLocal1 = t;
          continue;
        }
        var start = l$tailLocal1;
        var remaining$tailLocal1 = t;
        while (true) {
          if (remaining$tailLocal1.n()) {
            var $x_1 = start;
            break _return;
          } else {
            var x = remaining$tailLocal1.am();
            if (((!(!f(x))) !== false)) {
              remaining$tailLocal1 = remaining$tailLocal1.P();
              continue;
            }
            var firstMiss = remaining$tailLocal1;
            var newHead = new $c_sci_$colon$colon(start.am(), $m_sci_Nil$());
            var toProcess = start.P();
            var currentLast = newHead;
            while ((toProcess !== firstMiss)) {
              var newElem = new $c_sci_$colon$colon(toProcess.am(), $m_sci_Nil$());
              currentLast.aY = newElem;
              currentLast = newElem;
              toProcess = toProcess.P();
            }
            var next = firstMiss.P();
            var nextToCopy = next;
            while ((!next.n())) {
              var head = next.am();
              if (((!(!f(head))) !== false)) {
                next = next.P();
              } else {
                while ((nextToCopy !== next)) {
                  var newElem$2 = new $c_sci_$colon$colon(nextToCopy.am(), $m_sci_Nil$());
                  currentLast.aY = newElem$2;
                  currentLast = newElem$2;
                  nextToCopy = nextToCopy.P();
                }
                nextToCopy = next.P();
                next = next.P();
              }
            }
            if ((!nextToCopy.n())) {
              currentLast.aY = nextToCopy;
            }
            var $x_1 = newHead;
            break _return;
          }
        }
      }
    }
  }
  return $f_sc_IterableOnceOps__mkString__T__T__T__T($x_1, "", "\n\n", "");
}
function $p_Lgpu_ShaderDef__buildVertexMain__T__T($thiz, body) {
  return (("@vertex\nfn vs_main(in: VertexInput) -> VertexOutput {\n  var out: VertexOutput;\n" + body) + "\n  return out;\n}");
}
function $p_Lgpu_ShaderDef__buildFragmentMain__T__T($thiz, body) {
  return (("@fragment\nfn fs_main(in: VertexOutput) -> FragmentOutput {\n  var out: FragmentOutput;\n" + body) + "\n  return out;\n}");
}
/** @constructor */
function $c_Lgpu_ShaderDef(vertexBody, fragmentBody) {
  this.cW = null;
  this.cV = null;
  this.cW = vertexBody;
  this.cV = fragmentBody;
}
$p = $c_Lgpu_ShaderDef.prototype = new $h_O();
$p.constructor = $c_Lgpu_ShaderDef;
/** @constructor */
function $h_Lgpu_ShaderDef() {
}
$h_Lgpu_ShaderDef.prototype = $p;
$p.c9 = (function() {
  return new $c_s_Product$$anon$1(this);
});
$p.I = (function() {
  return $m_s_util_hashing_MurmurHash3$().ct(this, (-1488826029), true);
});
$p.H = (function(x$0) {
  return ((this === x$0) || ((x$0 instanceof $c_Lgpu_ShaderDef) && ((this.cW === x$0.cW) && (this.cV === x$0.cV))));
});
$p.A = (function() {
  return $m_sr_ScalaRunTime$().dO(this);
});
$p.be = (function() {
  return 2;
});
$p.bg = (function() {
  return "ShaderDef";
});
$p.bf = (function(n) {
  if ((n === 0)) {
    return this.cW;
  }
  if ((n === 1)) {
    return this.cV;
  }
  throw $ct_jl_IndexOutOfBoundsException__T__(new $c_jl_IndexOutOfBoundsException(), ("" + n));
});
function $isArrayOf_Lgpu_ShaderDef(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.al)));
}
var $d_Lgpu_ShaderDef = new $TypeData().i($c_Lgpu_ShaderDef, "gpu.ShaderDef", ({
  al: 1,
  d: 1,
  z: 1,
  a: 1
}));
/** @constructor */
function $c_Ljava_io_OutputStream() {
}
$p = $c_Ljava_io_OutputStream.prototype = new $h_O();
$p.constructor = $c_Ljava_io_OutputStream;
/** @constructor */
function $h_Ljava_io_OutputStream() {
}
$h_Ljava_io_OutputStream.prototype = $p;
function $f_jl_Boolean__equals__O__Z($thiz, that) {
  return ($thiz === that);
}
function $f_jl_Boolean__hashCode__I($thiz) {
  return ($thiz ? 1231 : 1237);
}
function $f_jl_Boolean__toString__T($thiz) {
  return ("" + $thiz);
}
var $d_jl_Boolean = new $TypeData().i(0, "java.lang.Boolean", ({
  bg: 1,
  a: 1,
  E: 1,
  y: 1
}), ((x) => ((typeof x) === "boolean")));
function $f_jl_Character__hashCode__I($thiz) {
  return $thiz;
}
function $f_jl_Character__equals__O__Z($thiz, that) {
  return ((that instanceof $Char) && ($thiz === that.c));
}
function $f_jl_Character__toString__T($thiz) {
  return ("" + $cToS($thiz));
}
function $isArrayOf_jl_Character(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.ar)));
}
var $d_jl_Character = new $TypeData().i(0, "java.lang.Character", ({
  ar: 1,
  a: 1,
  E: 1,
  y: 1
}), ((x) => (x instanceof $Char)));
function $isArrayOf_jl_InterruptedException(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.bp)));
}
function $isArrayOf_jl_LinkageError(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.bs)));
}
class $c_jl_RuntimeException extends $c_jl_Exception {
}
/** @constructor */
function $c_jl_StringBuilder() {
  this.an = null;
  this.an = "";
}
$p = $c_jl_StringBuilder.prototype = new $h_O();
$p.constructor = $c_jl_StringBuilder;
/** @constructor */
function $h_jl_StringBuilder() {
}
$h_jl_StringBuilder.prototype = $p;
$p.A = (function() {
  return this.an;
});
$p.w = (function() {
  return this.an.length;
});
$p.fy = (function(index) {
  return this.an.charCodeAt(index);
});
var $d_jl_StringBuilder = new $TypeData().i($c_jl_StringBuilder, "java.lang.StringBuilder", ({
  bC: 1,
  a5: 1,
  ap: 1,
  a: 1
}));
function $isArrayOf_jl_ThreadDeath(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.bF)));
}
class $c_jl_VirtualMachineError extends $c_jl_Error {
}
function $isArrayOf_jl_VirtualMachineError(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.ay)));
}
class $c_ju_concurrent_ExecutionException extends $c_jl_Exception {
  constructor(message, cause) {
    super();
    $ct_jl_Throwable__T__jl_Throwable__Z__Z__(this, message, cause, true, true);
  }
}
var $d_ju_concurrent_ExecutionException = new $TypeData().i($c_ju_concurrent_ExecutionException, "java.util.concurrent.ExecutionException", ({
  bN: 1,
  l: 1,
  f: 1,
  a: 1
}));
/** @constructor */
function $c_sc_AbstractIterator() {
}
$p = $c_sc_AbstractIterator.prototype = new $h_O();
$p.constructor = $c_sc_AbstractIterator;
/** @constructor */
function $h_sc_AbstractIterator() {
}
$h_sc_AbstractIterator.prototype = $p;
$p.D = (function() {
  return (-1);
});
$p.cl = (function(dest, start, n) {
  return $f_sc_IterableOnceOps__copyToArray__O__I__I__I(this, dest, start, n);
});
$p.dP = (function(b, start, sep, end) {
  return $f_sc_IterableOnceOps__addString__scm_StringBuilder__T__T__T__scm_StringBuilder(this, b, start, sep, end);
});
$p.p = (function() {
  return this;
});
$p.eq = (function(xs) {
  return $f_sc_Iterator__concat__F0__sc_Iterator(this, xs);
});
$p.cm = (function(n) {
  return this.dv(n, (-1));
});
$p.dv = (function(from, until) {
  return $f_sc_Iterator__sliceIterator__I__I__sc_Iterator(this, from, until);
});
$p.A = (function() {
  return "<iterator>";
});
/** @constructor */
function $c_sc_Map$() {
  this.eX = null;
  this.eV = null;
  this.eW = null;
  $ct_sc_MapFactory$Delegate__sc_MapFactory__(this, $m_sci_Map$());
  $n_sc_Map$ = this;
  this.eV = $ct_O__(new $c_O());
  this.eW = new $c_sr_AbstractFunction0_$$Lambda$a02b774b97db8234e08c6a02dd06557c99779855((() => this.eV));
}
$p = $c_sc_Map$.prototype = new $h_sc_MapFactory$Delegate();
$p.constructor = $c_sc_Map$;
/** @constructor */
function $h_sc_Map$() {
}
$h_sc_Map$.prototype = $p;
var $d_sc_Map$ = new $TypeData().i($c_sc_Map$, "scala.collection.Map$", ({
  cf: 1,
  cg: 1,
  a: 1,
  a9: 1
}));
var $n_sc_Map$;
function $m_sc_Map$() {
  if ((!$n_sc_Map$)) {
    $n_sc_Map$ = new $c_sc_Map$();
  }
  return $n_sc_Map$;
}
function $ct_sc_SeqFactory$Delegate__sc_SeqFactory__($thiz, delegate) {
  $thiz.dA = delegate;
  return $thiz;
}
/** @constructor */
function $c_sc_SeqFactory$Delegate() {
  this.dA = null;
}
$p = $c_sc_SeqFactory$Delegate.prototype = new $h_O();
$p.constructor = $c_sc_SeqFactory$Delegate;
/** @constructor */
function $h_sc_SeqFactory$Delegate() {
}
$h_sc_SeqFactory$Delegate.prototype = $p;
$p.fC = (function(it) {
  return this.dA.cQ(it);
});
$p.b3 = (function() {
  return this.dA.b3();
});
$p.cQ = (function(source) {
  return this.fC(source);
});
function $f_sc_SeqOps__isDefinedAt__I__Z($thiz, idx) {
  return ((idx >= 0) && ($thiz.bN(idx) > 0));
}
function $f_sc_SeqOps__isEmpty__Z($thiz) {
  return ($thiz.bN(0) === 0);
}
function $f_sc_SeqOps__sameElements__sc_IterableOnce__Z($thiz, that) {
  var thisKnownSize = $thiz.D();
  if ((thisKnownSize !== (-1))) {
    var thatKnownSize = that.D();
    if ((thatKnownSize !== (-1))) {
      if ((thisKnownSize !== thatKnownSize)) {
        return false;
      }
      if ((thisKnownSize === 0)) {
        return true;
      }
    }
  }
  return $f_sc_Iterator__sameElements__sc_IterableOnce__Z($thiz.p(), that);
}
function $f_sc_StrictOptimizedIterableOps__zip__sc_IterableOnce__O($thiz, that) {
  var b = $thiz.cp().b3();
  var it1 = $thiz.p();
  var it2 = that.p();
  while ((it1.k() && it2.k())) {
    b.b2(new $c_T2(it1.h(), it2.h()));
  }
  return b.aW();
}
function $f_sc_StrictOptimizedIterableOps__zipWithIndex__O($thiz) {
  var b = $thiz.cp().b3();
  var i = 0;
  var it = $thiz.p();
  while (it.k()) {
    b.b2(new $c_T2(it.h(), i));
    i = ((1 + i) | 0);
  }
  return b.aW();
}
/** @constructor */
function $c_sci_Iterable$() {
  this.e6 = null;
  $ct_sc_IterableFactory$Delegate__sc_IterableFactory__(this, $m_sci_List$());
}
$p = $c_sci_Iterable$.prototype = new $h_sc_IterableFactory$Delegate();
$p.constructor = $c_sci_Iterable$;
/** @constructor */
function $h_sci_Iterable$() {
}
$h_sci_Iterable$.prototype = $p;
var $d_sci_Iterable$ = new $TypeData().i($c_sci_Iterable$, "scala.collection.immutable.Iterable$", ({
  cw: 1,
  c7: 1,
  a: 1,
  J: 1
}));
var $n_sci_Iterable$;
function $m_sci_Iterable$() {
  if ((!$n_sci_Iterable$)) {
    $n_sci_Iterable$ = new $c_sci_Iterable$();
  }
  return $n_sci_Iterable$;
}
/** @constructor */
function $c_scm_Builder$$anon$1(f$2, outer) {
  this.f6 = null;
  this.dD = null;
  this.f6 = f$2;
  if ((outer === null)) {
    throw $ct_jl_NullPointerException__(new $c_jl_NullPointerException());
  }
  this.dD = outer;
}
$p = $c_scm_Builder$$anon$1.prototype = new $h_O();
$p.constructor = $c_scm_Builder$$anon$1;
/** @constructor */
function $h_scm_Builder$$anon$1() {
}
$h_scm_Builder$$anon$1.prototype = $p;
$p.ga = (function(x) {
  this.dD.b2(x);
  return this;
});
$p.g3 = (function(xs) {
  this.dD.aS(xs);
  return this;
});
$p.aW = (function() {
  return this.f6.l(this.dD.aW());
});
$p.b2 = (function(elem) {
  return this.ga(elem);
});
$p.aS = (function(elems) {
  return this.g3(elems);
});
var $d_scm_Builder$$anon$1 = new $TypeData().i($c_scm_Builder$$anon$1, "scala.collection.mutable.Builder$$anon$1", ({
  d6: 1,
  H: 1,
  I: 1,
  G: 1
}));
/** @constructor */
function $c_scm_GrowableBuilder(elems) {
  this.dE = null;
  this.dE = elems;
}
$p = $c_scm_GrowableBuilder.prototype = new $h_O();
$p.constructor = $c_scm_GrowableBuilder;
/** @constructor */
function $h_scm_GrowableBuilder() {
}
$h_scm_GrowableBuilder.prototype = $p;
$p.gb = (function(elem) {
  this.dE.b2(elem);
  return this;
});
$p.g4 = (function(xs) {
  this.dE.aS(xs);
  return this;
});
$p.aW = (function() {
  return this.dE;
});
$p.b2 = (function(elem) {
  return this.gb(elem);
});
$p.aS = (function(elems) {
  return this.g4(elems);
});
var $d_scm_GrowableBuilder = new $TypeData().i($c_scm_GrowableBuilder, "scala.collection.mutable.GrowableBuilder", ({
  d7: 1,
  H: 1,
  I: 1,
  G: 1
}));
class $c_s_concurrent_Future$$anon$4 extends $c_jl_Throwable {
  constructor() {
    super();
    $ct_jl_Throwable__T__jl_Throwable__Z__Z__(this, null, null, true, true);
  }
  cP() {
    return $f_s_util_control_NoStackTrace__fillInStackTrace__jl_Throwable(this);
  }
}
var $d_s_concurrent_Future$$anon$4 = new $TypeData().i($c_s_concurrent_Future$$anon$4, "scala.concurrent.Future$$anon$4", ({
  dr: 1,
  f: 1,
  a: 1,
  a4: 1
}));
function $isArrayOf_sr_NonLocalReturnControl(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.dJ)));
}
/** @constructor */
function $c_sjs_concurrent_QueueExecutionContext$PromisesExecutionContext() {
  this.fo = null;
  this.fo = Promise.resolve((void 0));
}
$p = $c_sjs_concurrent_QueueExecutionContext$PromisesExecutionContext.prototype = new $h_O();
$p.constructor = $c_sjs_concurrent_QueueExecutionContext$PromisesExecutionContext;
/** @constructor */
function $h_sjs_concurrent_QueueExecutionContext$PromisesExecutionContext() {
}
$h_sjs_concurrent_QueueExecutionContext$PromisesExecutionContext.prototype = $p;
$p.es = (function(runnable) {
  this.fo.then(((arg1$2) => {
    try {
      runnable.cu();
    } catch (e) {
      ((e instanceof $c_jl_Throwable) ? e : new $c_sjs_js_JavaScriptException(e)).ds($m_jl_System$Streams$().cD);
    }
  }));
});
$p.eE = (function(t) {
  t.ds($m_jl_System$Streams$().cD);
});
var $d_sjs_concurrent_QueueExecutionContext$PromisesExecutionContext = new $TypeData().i($c_sjs_concurrent_QueueExecutionContext$PromisesExecutionContext, "scala.scalajs.concurrent.QueueExecutionContext$PromisesExecutionContext", ({
  dR: 1,
  ai: 1,
  ah: 1,
  a7: 1
}));
/** @constructor */
function $c_sjs_concurrent_QueueExecutionContext$TimeoutsExecutionContext() {
}
$p = $c_sjs_concurrent_QueueExecutionContext$TimeoutsExecutionContext.prototype = new $h_O();
$p.constructor = $c_sjs_concurrent_QueueExecutionContext$TimeoutsExecutionContext;
/** @constructor */
function $h_sjs_concurrent_QueueExecutionContext$TimeoutsExecutionContext() {
}
$h_sjs_concurrent_QueueExecutionContext$TimeoutsExecutionContext.prototype = $p;
$p.es = (function(runnable) {
  setTimeout($m_sjs_js_Any$().gI(new $c_sr_AbstractFunction0_$$Lambda$a02b774b97db8234e08c6a02dd06557c99779855((() => {
    try {
      runnable.cu();
    } catch (e) {
      ((e instanceof $c_jl_Throwable) ? e : new $c_sjs_js_JavaScriptException(e)).ds($m_jl_System$Streams$().cD);
    }
  }))), 0);
});
$p.eE = (function(t) {
  t.ds($m_jl_System$Streams$().cD);
});
var $d_sjs_concurrent_QueueExecutionContext$TimeoutsExecutionContext = new $TypeData().i($c_sjs_concurrent_QueueExecutionContext$TimeoutsExecutionContext, "scala.scalajs.concurrent.QueueExecutionContext$TimeoutsExecutionContext", ({
  dS: 1,
  ai: 1,
  ah: 1,
  a7: 1
}));
/** @constructor */
function $c_s_util_Try() {
}
$p = $c_s_util_Try.prototype = new $h_O();
$p.constructor = $c_s_util_Try;
/** @constructor */
function $h_s_util_Try() {
}
$h_s_util_Try.prototype = $p;
$p.c9 = (function() {
  return new $c_s_Product$$anon$1(this);
});
function $isArrayOf_s_util_Try(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.ak)));
}
function $ct_Ljava_io_FilterOutputStream__Ljava_io_OutputStream__($thiz, out) {
  return $thiz;
}
/** @constructor */
function $c_Ljava_io_FilterOutputStream() {
}
$p = $c_Ljava_io_FilterOutputStream.prototype = new $h_Ljava_io_OutputStream();
$p.constructor = $c_Ljava_io_FilterOutputStream;
/** @constructor */
function $h_Ljava_io_FilterOutputStream() {
}
$h_Ljava_io_FilterOutputStream.prototype = $p;
class $c_jl_ArithmeticException extends $c_jl_RuntimeException {
  constructor(s) {
    super();
    $ct_jl_Throwable__T__jl_Throwable__Z__Z__(this, s, null, true, true);
  }
}
var $d_jl_ArithmeticException = new $TypeData().i($c_jl_ArithmeticException, "java.lang.ArithmeticException", ({
  be: 1,
  q: 1,
  l: 1,
  f: 1,
  a: 1
}));
function $f_jl_Byte__equals__O__Z($thiz, that) {
  return Object.is($thiz, that);
}
function $f_jl_Byte__hashCode__I($thiz) {
  return $thiz;
}
function $f_jl_Byte__toString__T($thiz) {
  return ("" + $thiz);
}
var $d_jl_Byte = new $TypeData().i(0, "java.lang.Byte", ({
  bh: 1,
  O: 1,
  a: 1,
  E: 1,
  y: 1
}), ((x) => $isByte(x)));
function $isArrayOf_jl_ClassCastException(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.bk)));
}
function $ct_jl_IllegalArgumentException__T__($thiz, s) {
  $ct_jl_Throwable__T__jl_Throwable__Z__Z__($thiz, s, null, true, true);
  return $thiz;
}
function $ct_jl_IllegalArgumentException__($thiz) {
  $ct_jl_Throwable__T__jl_Throwable__Z__Z__($thiz, null, null, true, true);
  return $thiz;
}
class $c_jl_IllegalArgumentException extends $c_jl_RuntimeException {
}
var $d_jl_IllegalArgumentException = new $TypeData().i($c_jl_IllegalArgumentException, "java.lang.IllegalArgumentException", ({
  au: 1,
  q: 1,
  l: 1,
  f: 1,
  a: 1
}));
class $c_jl_IllegalStateException extends $c_jl_RuntimeException {
  constructor(s) {
    super();
    $ct_jl_Throwable__T__jl_Throwable__Z__Z__(this, s, null, true, true);
  }
}
var $d_jl_IllegalStateException = new $TypeData().i($c_jl_IllegalStateException, "java.lang.IllegalStateException", ({
  bm: 1,
  q: 1,
  l: 1,
  f: 1,
  a: 1
}));
function $ct_jl_IndexOutOfBoundsException__T__($thiz, s) {
  $ct_jl_Throwable__T__jl_Throwable__Z__Z__($thiz, s, null, true, true);
  return $thiz;
}
class $c_jl_IndexOutOfBoundsException extends $c_jl_RuntimeException {
}
var $d_jl_IndexOutOfBoundsException = new $TypeData().i($c_jl_IndexOutOfBoundsException, "java.lang.IndexOutOfBoundsException", ({
  av: 1,
  q: 1,
  l: 1,
  f: 1,
  a: 1
}));
/** @constructor */
function $c_jl_JSConsoleBasedPrintStream$DummyOutputStream() {
}
$p = $c_jl_JSConsoleBasedPrintStream$DummyOutputStream.prototype = new $h_Ljava_io_OutputStream();
$p.constructor = $c_jl_JSConsoleBasedPrintStream$DummyOutputStream;
/** @constructor */
function $h_jl_JSConsoleBasedPrintStream$DummyOutputStream() {
}
$h_jl_JSConsoleBasedPrintStream$DummyOutputStream.prototype = $p;
var $d_jl_JSConsoleBasedPrintStream$DummyOutputStream = new $TypeData().i($c_jl_JSConsoleBasedPrintStream$DummyOutputStream, "java.lang.JSConsoleBasedPrintStream$DummyOutputStream", ({
  br: 1,
  ao: 1,
  am: 1,
  aq: 1,
  an: 1
}));
class $c_jl_NegativeArraySizeException extends $c_jl_RuntimeException {
  constructor() {
    super();
    $ct_jl_Throwable__T__jl_Throwable__Z__Z__(this, null, null, true, true);
  }
}
var $d_jl_NegativeArraySizeException = new $TypeData().i($c_jl_NegativeArraySizeException, "java.lang.NegativeArraySizeException", ({
  bt: 1,
  q: 1,
  l: 1,
  f: 1,
  a: 1
}));
function $ct_jl_NullPointerException__T__($thiz, s) {
  $ct_jl_Throwable__T__jl_Throwable__Z__Z__($thiz, s, null, true, true);
  return $thiz;
}
function $ct_jl_NullPointerException__($thiz) {
  $ct_jl_Throwable__T__jl_Throwable__Z__Z__($thiz, null, null, true, true);
  return $thiz;
}
class $c_jl_NullPointerException extends $c_jl_RuntimeException {
}
var $d_jl_NullPointerException = new $TypeData().i($c_jl_NullPointerException, "java.lang.NullPointerException", ({
  bu: 1,
  q: 1,
  l: 1,
  f: 1,
  a: 1
}));
function $isArrayOf_jl_SecurityException(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.bw)));
}
function $f_jl_Short__equals__O__Z($thiz, that) {
  return Object.is($thiz, that);
}
function $f_jl_Short__hashCode__I($thiz) {
  return $thiz;
}
function $f_jl_Short__toString__T($thiz) {
  return ("" + $thiz);
}
var $d_jl_Short = new $TypeData().i(0, "java.lang.Short", ({
  bx: 1,
  O: 1,
  a: 1,
  E: 1,
  y: 1
}), ((x) => $isShort(x)));
class $c_jl_StackOverflowError extends $c_jl_VirtualMachineError {
  constructor(s) {
    super();
    $ct_jl_Throwable__T__jl_Throwable__Z__Z__(this, s, null, true, true);
  }
}
var $d_jl_StackOverflowError = new $TypeData().i($c_jl_StackOverflowError, "java.lang.StackOverflowError", ({
  by: 1,
  ay: 1,
  at: 1,
  f: 1,
  a: 1
}));
class $c_jl_UnsupportedOperationException extends $c_jl_RuntimeException {
  constructor(s) {
    super();
    $ct_jl_Throwable__T__jl_Throwable__Z__Z__(this, s, null, true, true);
  }
}
var $d_jl_UnsupportedOperationException = new $TypeData().i($c_jl_UnsupportedOperationException, "java.lang.UnsupportedOperationException", ({
  bH: 1,
  q: 1,
  l: 1,
  f: 1,
  a: 1
}));
class $c_ju_ConcurrentModificationException extends $c_jl_RuntimeException {
  constructor(s) {
    super();
    $ct_jl_Throwable__T__jl_Throwable__Z__Z__(this, s, null, true, true);
  }
}
var $d_ju_ConcurrentModificationException = new $TypeData().i($c_ju_ConcurrentModificationException, "java.util.ConcurrentModificationException", ({
  bM: 1,
  q: 1,
  l: 1,
  f: 1,
  a: 1
}));
function $ct_ju_NoSuchElementException__T__($thiz, s) {
  $ct_jl_Throwable__T__jl_Throwable__Z__Z__($thiz, s, null, true, true);
  return $thiz;
}
class $c_ju_NoSuchElementException extends $c_jl_RuntimeException {
}
var $d_ju_NoSuchElementException = new $TypeData().i($c_ju_NoSuchElementException, "java.util.NoSuchElementException", ({
  a1: 1,
  q: 1,
  l: 1,
  f: 1,
  a: 1
}));
function $p_s_MatchError__objString__T($thiz) {
  if ((!$thiz.eO)) {
    if (($thiz.dy === null)) {
      var $x_1 = "null";
    } else {
      try {
        var $x_1 = ((($thiz.dy + " (") + $p_s_MatchError__ofClass$1__T($thiz)) + ")");
      } catch (e) {
        var $x_1 = ("an instance " + $p_s_MatchError__ofClass$1__T($thiz));
      }
    }
    $thiz.eN = $x_1;
    $thiz.eO = true;
  }
  return $thiz.eN;
}
function $p_s_MatchError__ofClass$1__T($thiz) {
  var this$1 = $thiz.dy;
  return ("of class " + $objectClassName(this$1));
}
class $c_s_MatchError extends $c_jl_RuntimeException {
  constructor(obj) {
    super();
    this.dy = null;
    this.eN = null;
    this.eO = false;
    this.dy = obj;
    $ct_jl_Throwable__T__jl_Throwable__Z__Z__(this, null, null, true, true);
  }
  dp() {
    return $p_s_MatchError__objString__T(this);
  }
}
var $d_s_MatchError = new $TypeData().i($c_s_MatchError, "scala.MatchError", ({
  bU: 1,
  q: 1,
  l: 1,
  f: 1,
  a: 1
}));
/** @constructor */
function $c_s_Option() {
}
$p = $c_s_Option.prototype = new $h_O();
$p.constructor = $c_s_Option;
/** @constructor */
function $h_s_Option() {
}
$h_s_Option.prototype = $p;
$p.c9 = (function() {
  return new $c_s_Product$$anon$1(this);
});
$p.n = (function() {
  return (this === $m_s_None$());
});
$p.D = (function() {
  return (this.n() ? 0 : 1);
});
$p.p = (function() {
  return (this.n() ? $m_sc_Iterator$().a2 : new $c_sc_Iterator$$anon$20(this.aU()));
});
/** @constructor */
function $c_s_Product$$anon$1(outer) {
  this.cZ = 0;
  this.eQ = 0;
  this.eP = null;
  if ((outer === null)) {
    throw $ct_jl_NullPointerException__(new $c_jl_NullPointerException());
  }
  this.eP = outer;
  this.cZ = 0;
  this.eQ = outer.be();
}
$p = $c_s_Product$$anon$1.prototype = new $h_sc_AbstractIterator();
$p.constructor = $c_s_Product$$anon$1;
/** @constructor */
function $h_s_Product$$anon$1() {
}
$h_s_Product$$anon$1.prototype = $p;
$p.k = (function() {
  return (this.cZ < this.eQ);
});
$p.h = (function() {
  var result = this.eP.bf(this.cZ);
  this.cZ = ((1 + this.cZ) | 0);
  return result;
});
var $d_s_Product$$anon$1 = new $TypeData().i($c_s_Product$$anon$1, "scala.Product$$anon$1", ({
  bY: 1,
  n: 1,
  b: 1,
  c: 1,
  o: 1
}));
/** @constructor */
function $c_T2(_1, _2) {
  this.aw = null;
  this.ai = null;
  this.aw = _1;
  this.ai = _2;
}
$p = $c_T2.prototype = new $h_O();
$p.constructor = $c_T2;
/** @constructor */
function $h_T2() {
}
$h_T2.prototype = $p;
$p.be = (function() {
  return 2;
});
$p.bf = (function(n) {
  return $f_s_Product2__productElement__I__O(this, n);
});
$p.A = (function() {
  return (((("(" + this.aw) + ",") + this.ai) + ")");
});
$p.bg = (function() {
  return "Tuple2";
});
$p.c9 = (function() {
  return new $c_sr_ScalaRunTime$$anon$1(this);
});
$p.I = (function() {
  return $m_s_util_hashing_MurmurHash3$().ct(this, (-116390334), true);
});
$p.H = (function(x$1) {
  return ((this === x$1) || ((x$1 instanceof $c_T2) && ($m_sr_BoxesRunTime$().i(this.aw, x$1.aw) && $m_sr_BoxesRunTime$().i(this.ai, x$1.ai))));
});
function $isArrayOf_T2(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.aD)));
}
var $d_T2 = new $TypeData().i($c_T2, "scala.Tuple2", ({
  aD: 1,
  bZ: 1,
  z: 1,
  d: 1,
  a: 1
}));
/** @constructor */
function $c_T3(_1, _2, _3) {
  this.cF = null;
  this.cG = null;
  this.cH = null;
  this.cF = _1;
  this.cG = _2;
  this.cH = _3;
}
$p = $c_T3.prototype = new $h_O();
$p.constructor = $c_T3;
/** @constructor */
function $h_T3() {
}
$h_T3.prototype = $p;
$p.c9 = (function() {
  return new $c_s_Product$$anon$1(this);
});
$p.be = (function() {
  return 3;
});
$p.bf = (function(n) {
  return $f_s_Product3__productElement__I__O(this, n);
});
$p.I = (function() {
  return $m_s_util_hashing_MurmurHash3$().ct(this, (-192629203), true);
});
$p.H = (function(x$0) {
  return ((this === x$0) || ((x$0 instanceof $c_T3) && (($m_sr_BoxesRunTime$().i(this.cF, x$0.cF) && $m_sr_BoxesRunTime$().i(this.cG, x$0.cG)) && $m_sr_BoxesRunTime$().i(this.cH, x$0.cH))));
});
$p.bg = (function() {
  return "Tuple3";
});
$p.A = (function() {
  return (((((("(" + this.cF) + ",") + this.cG) + ",") + this.cH) + ")");
});
function $isArrayOf_T3(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.aE)));
}
var $d_T3 = new $TypeData().i($c_T3, "scala.Tuple3", ({
  aE: 1,
  d: 1,
  z: 1,
  c0: 1,
  a: 1
}));
function $f_sc_Iterable__toString__T($thiz) {
  return $f_sc_IterableOnceOps__mkString__T__T__T__T($thiz, ($thiz.cj() + "("), ", ", ")");
}
/** @constructor */
function $c_sc_Iterator$$anon$19() {
}
$p = $c_sc_Iterator$$anon$19.prototype = new $h_sc_AbstractIterator();
$p.constructor = $c_sc_Iterator$$anon$19;
/** @constructor */
function $h_sc_Iterator$$anon$19() {
}
$h_sc_Iterator$$anon$19.prototype = $p;
$p.k = (function() {
  return false;
});
$p.h4 = (function() {
  throw $ct_ju_NoSuchElementException__T__(new $c_ju_NoSuchElementException(), "next on empty iterator");
});
$p.D = (function() {
  return 0;
});
$p.h = (function() {
  this.h4();
});
$p.dv = (function(from, until) {
  return this;
});
var $d_sc_Iterator$$anon$19 = new $TypeData().i($c_sc_Iterator$$anon$19, "scala.collection.Iterator$$anon$19", ({
  c9: 1,
  n: 1,
  b: 1,
  c: 1,
  o: 1
}));
/** @constructor */
function $c_sc_Iterator$$anon$20(a$2) {
  this.eS = null;
  this.d0 = false;
  this.eS = a$2;
  this.d0 = false;
}
$p = $c_sc_Iterator$$anon$20.prototype = new $h_sc_AbstractIterator();
$p.constructor = $c_sc_Iterator$$anon$20;
/** @constructor */
function $h_sc_Iterator$$anon$20() {
}
$h_sc_Iterator$$anon$20.prototype = $p;
$p.k = (function() {
  return (!this.d0);
});
$p.h = (function() {
  if (this.d0) {
    return $m_sc_Iterator$().a2.h();
  } else {
    this.d0 = true;
    return this.eS;
  }
});
$p.dv = (function(from, until) {
  return (((this.d0 || (from > 0)) || (until === 0)) ? $m_sc_Iterator$().a2 : this);
});
var $d_sc_Iterator$$anon$20 = new $TypeData().i($c_sc_Iterator$$anon$20, "scala.collection.Iterator$$anon$20", ({
  ca: 1,
  n: 1,
  b: 1,
  c: 1,
  o: 1
}));
/** @constructor */
function $c_sc_Iterator$$anon$9(f$9, outer) {
  this.eT = null;
  this.dz = null;
  this.eT = f$9;
  if ((outer === null)) {
    throw $ct_jl_NullPointerException__(new $c_jl_NullPointerException());
  }
  this.dz = outer;
}
$p = $c_sc_Iterator$$anon$9.prototype = new $h_sc_AbstractIterator();
$p.constructor = $c_sc_Iterator$$anon$9;
/** @constructor */
function $h_sc_Iterator$$anon$9() {
}
$h_sc_Iterator$$anon$9.prototype = $p;
$p.D = (function() {
  return this.dz.D();
});
$p.k = (function() {
  return this.dz.k();
});
$p.h = (function() {
  return this.eT.l(this.dz.h());
});
var $d_sc_Iterator$$anon$9 = new $TypeData().i($c_sc_Iterator$$anon$9, "scala.collection.Iterator$$anon$9", ({
  cc: 1,
  n: 1,
  b: 1,
  c: 1,
  o: 1
}));
function $p_sc_Iterator$ConcatIterator__merge$1__V($thiz) {
  while (true) {
    if (($thiz.aJ instanceof $c_sc_Iterator$ConcatIterator)) {
      var c = $thiz.aJ;
      $thiz.aJ = c.aJ;
      $thiz.bP = c.bP;
      if ((c.b7 !== null)) {
        if (($thiz.b6 === null)) {
          $thiz.b6 = c.b6;
        }
        var x$proxy10 = c.b6;
        if ((x$proxy10 === null)) {
          $m_sr_Scala3RunTime$().b4();
        }
        x$proxy10.d1 = $thiz.b7;
        $thiz.b7 = c.b7;
      }
    } else {
      return (void 0);
    }
  }
}
function $p_sc_Iterator$ConcatIterator__advance$1__Z($thiz) {
  while (true) {
    if (($thiz.b7 === null)) {
      $thiz.aJ = null;
      $thiz.b6 = null;
      return false;
    } else {
      $thiz.aJ = $thiz.b7.gP();
      if (($thiz.b6 === $thiz.b7)) {
        var x$proxy12 = $thiz.b6;
        if ((x$proxy12 === null)) {
          $m_sr_Scala3RunTime$().b4();
        }
        $thiz.b6 = x$proxy12.d1;
      }
      $thiz.b7 = $thiz.b7.d1;
      $p_sc_Iterator$ConcatIterator__merge$1__V($thiz);
      if ($thiz.bP) {
        return true;
      } else if ((($thiz.aJ !== null) && $thiz.aJ.k())) {
        $thiz.bP = true;
        return true;
      }
    }
  }
}
/** @constructor */
function $c_sc_Iterator$ConcatIterator(from) {
  this.aJ = null;
  this.b7 = null;
  this.b6 = null;
  this.bP = false;
  this.aJ = from;
  this.b7 = null;
  this.b6 = null;
  this.bP = false;
}
$p = $c_sc_Iterator$ConcatIterator.prototype = new $h_sc_AbstractIterator();
$p.constructor = $c_sc_Iterator$ConcatIterator;
/** @constructor */
function $h_sc_Iterator$ConcatIterator() {
}
$h_sc_Iterator$ConcatIterator.prototype = $p;
$p.k = (function() {
  if (this.bP) {
    return true;
  } else if ((this.aJ !== null)) {
    if (this.aJ.k()) {
      this.bP = true;
      return true;
    } else {
      return $p_sc_Iterator$ConcatIterator__advance$1__Z(this);
    }
  } else {
    return false;
  }
});
$p.h = (function() {
  if (this.k()) {
    this.bP = false;
    var x$proxy13 = this.aJ;
    if ((x$proxy13 === null)) {
      $m_sr_Scala3RunTime$().b4();
    }
    return x$proxy13.h();
  } else {
    return $m_sc_Iterator$().a2.h();
  }
});
$p.eq = (function(that) {
  var c = new $c_sc_Iterator$ConcatIteratorCell(that, null);
  if ((this.b7 === null)) {
    this.b7 = c;
    this.b6 = c;
  } else {
    var x$proxy14 = this.b6;
    if ((x$proxy14 === null)) {
      $m_sr_Scala3RunTime$().b4();
    }
    x$proxy14.d1 = c;
    this.b6 = c;
  }
  if ((this.aJ === null)) {
    this.aJ = $m_sc_Iterator$().a2;
  }
  return this;
});
function $isArrayOf_sc_Iterator$ConcatIterator(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.aF)));
}
var $d_sc_Iterator$ConcatIterator = new $TypeData().i($c_sc_Iterator$ConcatIterator, "scala.collection.Iterator$ConcatIterator", ({
  aF: 1,
  n: 1,
  b: 1,
  c: 1,
  o: 1
}));
function $p_sc_Iterator$SliceIterator__skip__V($thiz) {
  while (($thiz.bB > 0)) {
    if ($thiz.bQ.k()) {
      $thiz.bQ.h();
      $thiz.bB = (((-1) + $thiz.bB) | 0);
    } else {
      $thiz.bB = 0;
    }
  }
}
function $p_sc_Iterator$SliceIterator__adjustedBound$1__I__I($thiz, lo$1) {
  if (($thiz.aX < 0)) {
    return (-1);
  } else {
    var that = (($thiz.aX - lo$1) | 0);
    return ((that < 0) ? 0 : that);
  }
}
/** @constructor */
function $c_sc_Iterator$SliceIterator(underlying, start, limit) {
  this.bQ = null;
  this.aX = 0;
  this.bB = 0;
  this.bQ = underlying;
  this.aX = limit;
  this.bB = start;
}
$p = $c_sc_Iterator$SliceIterator.prototype = new $h_sc_AbstractIterator();
$p.constructor = $c_sc_Iterator$SliceIterator;
/** @constructor */
function $h_sc_Iterator$SliceIterator() {
}
$h_sc_Iterator$SliceIterator.prototype = $p;
$p.D = (function() {
  var size = this.bQ.D();
  if ((size < 0)) {
    return (-1);
  } else {
    var that = ((size - this.bB) | 0);
    var dropSize = ((that < 0) ? 0 : that);
    if ((this.aX < 0)) {
      return dropSize;
    } else {
      var x = this.aX;
      return ((x < dropSize) ? x : dropSize);
    }
  }
});
$p.k = (function() {
  $p_sc_Iterator$SliceIterator__skip__V(this);
  return ((this.aX !== 0) && this.bQ.k());
});
$p.h = (function() {
  $p_sc_Iterator$SliceIterator__skip__V(this);
  if ((this.aX > 0)) {
    this.aX = (((-1) + this.aX) | 0);
    return this.bQ.h();
  } else {
    return ((this.aX < 0) ? this.bQ.h() : $m_sc_Iterator$().a2.h());
  }
});
$p.dv = (function(from, until) {
  var lo = ((from > 0) ? from : 0);
  if ((until < 0)) {
    var rest = $p_sc_Iterator$SliceIterator__adjustedBound$1__I__I(this, lo);
  } else if ((until <= lo)) {
    var rest = 0;
  } else if ((this.aX < 0)) {
    var rest = ((until - lo) | 0);
  } else {
    var x = $p_sc_Iterator$SliceIterator__adjustedBound$1__I__I(this, lo);
    var that = ((until - lo) | 0);
    var rest = ((x < that) ? x : that);
  }
  var sum = ((this.bB + lo) | 0);
  if ((rest === 0)) {
    return $m_sc_Iterator$().a2;
  } else if ((sum < 0)) {
    this.bB = 2147483647;
    this.aX = 0;
    return $f_sc_Iterator__concat__F0__sc_Iterator(this, new $c_sr_AbstractFunction0_$$Lambda$a02b774b97db8234e08c6a02dd06557c99779855((() => new $c_sc_Iterator$SliceIterator(this.bQ, (((-2147483647) + sum) | 0), rest))));
  } else {
    this.bB = sum;
    this.aX = rest;
    return this;
  }
});
var $d_sc_Iterator$SliceIterator = new $TypeData().i($c_sc_Iterator$SliceIterator, "scala.collection.Iterator$SliceIterator", ({
  ce: 1,
  n: 1,
  b: 1,
  c: 1,
  o: 1
}));
function $f_sc_LinearSeqOps__isDefinedAt__I__Z($thiz, x) {
  return ((x >= 0) && ($thiz.bN(x) > 0));
}
function $f_sc_LinearSeqOps__apply__I__O($thiz, n) {
  if ((n < 0)) {
    throw $ct_jl_IndexOutOfBoundsException__T__(new $c_jl_IndexOutOfBoundsException(), ("" + n));
  }
  var skipped = $thiz.gv(n);
  if (skipped.n()) {
    throw $ct_jl_IndexOutOfBoundsException__T__(new $c_jl_IndexOutOfBoundsException(), ("" + n));
  }
  return skipped.am();
}
function $f_sc_LinearSeqOps__sameElements__sc_IterableOnce__Z($thiz, that) {
  return ($is_sc_LinearSeq(that) ? $p_sc_LinearSeqOps__linearSeqEq$1__sc_LinearSeq__sc_LinearSeq__Z($thiz, $thiz, that) : $f_sc_SeqOps__sameElements__sc_IterableOnce__Z($thiz, that));
}
function $p_sc_LinearSeqOps__linearSeqEq$1__sc_LinearSeq__sc_LinearSeq__Z($thiz, a, b) {
  var b$tailLocal1 = b;
  var a$tailLocal1 = a;
  while (true) {
    if ((a$tailLocal1 === b$tailLocal1)) {
      return true;
    } else if ((((!a$tailLocal1.n()) && (!b$tailLocal1.n())) && $m_sr_BoxesRunTime$().i(a$tailLocal1.am(), b$tailLocal1.am()))) {
      var a$tailLocal1$tmp1 = a$tailLocal1.P();
      var b$tailLocal1$tmp1 = b$tailLocal1.P();
      a$tailLocal1 = a$tailLocal1$tmp1;
      b$tailLocal1 = b$tailLocal1$tmp1;
    } else {
      return (a$tailLocal1.n() && b$tailLocal1.n());
    }
  }
}
/** @constructor */
function $c_sc_StrictOptimizedLinearSeqOps$$anon$1(outer) {
  this.d3 = null;
  if ((outer === null)) {
    throw $ct_jl_NullPointerException__(new $c_jl_NullPointerException());
  }
  this.d3 = outer;
}
$p = $c_sc_StrictOptimizedLinearSeqOps$$anon$1.prototype = new $h_sc_AbstractIterator();
$p.constructor = $c_sc_StrictOptimizedLinearSeqOps$$anon$1;
/** @constructor */
function $h_sc_StrictOptimizedLinearSeqOps$$anon$1() {
}
$h_sc_StrictOptimizedLinearSeqOps$$anon$1.prototype = $p;
$p.k = (function() {
  return (!this.d3.n());
});
$p.h = (function() {
  var r = this.d3.am();
  this.d3 = this.d3.P();
  return r;
});
var $d_sc_StrictOptimizedLinearSeqOps$$anon$1 = new $TypeData().i($c_sc_StrictOptimizedLinearSeqOps$$anon$1, "scala.collection.StrictOptimizedLinearSeqOps$$anon$1", ({
  ck: 1,
  n: 1,
  b: 1,
  c: 1,
  o: 1
}));
function $ct_sci_ChampBaseIterator__($thiz) {
  $thiz.aZ = 0;
  $thiz.d4 = 0;
  $thiz.aL = (-1);
  return $thiz;
}
function $p_sci_ChampBaseIterator__initNodes__V($thiz) {
  if (($thiz.bC === null)) {
    $thiz.bC = new $ac_I(($m_sci_Node$().da << 1));
    $thiz.d5 = new ($d_sci_Node.r().C)($m_sci_Node$().da);
  }
}
function $ct_sci_ChampBaseIterator__sci_Node__($thiz, rootNode) {
  $ct_sci_ChampBaseIterator__($thiz);
  if (rootNode.ey()) {
    $p_sci_ChampBaseIterator__pushNode__sci_Node__V($thiz, rootNode);
  }
  if (rootNode.dU()) {
    $p_sci_ChampBaseIterator__setupPayloadNode__sci_Node__V($thiz, rootNode);
  }
  return $thiz;
}
function $p_sci_ChampBaseIterator__setupPayloadNode__sci_Node__V($thiz, node) {
  $thiz.cc = node;
  $thiz.aZ = 0;
  $thiz.d4 = node.eD();
}
function $p_sci_ChampBaseIterator__pushNode__sci_Node__V($thiz, node) {
  $p_sci_ChampBaseIterator__initNodes__V($thiz);
  $thiz.aL = ((1 + $thiz.aL) | 0);
  var cursorIndex = ($thiz.aL << 1);
  var lengthIndex = ((1 + ($thiz.aL << 1)) | 0);
  $thiz.d5.a[$thiz.aL] = node;
  $thiz.bC.a[cursorIndex] = 0;
  $thiz.bC.a[lengthIndex] = node.eB();
}
function $p_sci_ChampBaseIterator__popNode__V($thiz) {
  $thiz.aL = (((-1) + $thiz.aL) | 0);
}
function $p_sci_ChampBaseIterator__searchNextValueNode__Z($thiz) {
  while (($thiz.aL >= 0)) {
    var cursorIndex = ($thiz.aL << 1);
    var lengthIndex = ((1 + ($thiz.aL << 1)) | 0);
    var nodeCursor = $thiz.bC.a[cursorIndex];
    if ((nodeCursor < $thiz.bC.a[lengthIndex])) {
      var \u03b41$ = $thiz.bC;
      \u03b41$.a[cursorIndex] = ((1 + \u03b41$.a[cursorIndex]) | 0);
      var nextNode = $thiz.d5.a[$thiz.aL].eu(nodeCursor);
      if (nextNode.ey()) {
        $p_sci_ChampBaseIterator__pushNode__sci_Node__V($thiz, nextNode);
      }
      if (nextNode.dU()) {
        $p_sci_ChampBaseIterator__setupPayloadNode__sci_Node__V($thiz, nextNode);
        return true;
      }
    } else {
      $p_sci_ChampBaseIterator__popNode__V($thiz);
    }
  }
  return false;
}
/** @constructor */
function $c_sci_ChampBaseIterator() {
  this.aZ = 0;
  this.d4 = 0;
  this.cc = null;
  this.aL = 0;
  this.bC = null;
  this.d5 = null;
}
$p = $c_sci_ChampBaseIterator.prototype = new $h_sc_AbstractIterator();
$p.constructor = $c_sci_ChampBaseIterator;
/** @constructor */
function $h_sci_ChampBaseIterator() {
}
$h_sci_ChampBaseIterator.prototype = $p;
$p.k = (function() {
  return ((this.aZ < this.d4) || $p_sci_ChampBaseIterator__searchNextValueNode__Z(this));
});
function $ct_sci_ChampBaseReverseIterator__($thiz) {
  $thiz.bR = (-1);
  $thiz.b0 = (-1);
  $thiz.d6 = new $ac_I(((1 + $m_sci_Node$().da) | 0));
  $thiz.d7 = new ($d_sci_Node.r().C)(((1 + $m_sci_Node$().da) | 0));
  return $thiz;
}
function $ct_sci_ChampBaseReverseIterator__sci_Node__($thiz, rootNode) {
  $ct_sci_ChampBaseReverseIterator__($thiz);
  $p_sci_ChampBaseReverseIterator__pushNode__sci_Node__V($thiz, rootNode);
  $p_sci_ChampBaseReverseIterator__searchNextValueNode__Z($thiz);
  return $thiz;
}
function $p_sci_ChampBaseReverseIterator__setupPayloadNode__sci_Node__V($thiz, node) {
  $thiz.dB = node;
  $thiz.bR = (((-1) + node.eD()) | 0);
}
function $p_sci_ChampBaseReverseIterator__pushNode__sci_Node__V($thiz, node) {
  $thiz.b0 = ((1 + $thiz.b0) | 0);
  $thiz.d7.a[$thiz.b0] = node;
  $thiz.d6.a[$thiz.b0] = (((-1) + node.eB()) | 0);
}
function $p_sci_ChampBaseReverseIterator__popNode__V($thiz) {
  $thiz.b0 = (((-1) + $thiz.b0) | 0);
}
function $p_sci_ChampBaseReverseIterator__searchNextValueNode__Z($thiz) {
  while (($thiz.b0 >= 0)) {
    var nodeCursor = $thiz.d6.a[$thiz.b0];
    $thiz.d6.a[$thiz.b0] = (((-1) + nodeCursor) | 0);
    if ((nodeCursor >= 0)) {
      $p_sci_ChampBaseReverseIterator__pushNode__sci_Node__V($thiz, $thiz.d7.a[$thiz.b0].eu(nodeCursor));
    } else {
      var currNode = $thiz.d7.a[$thiz.b0];
      $p_sci_ChampBaseReverseIterator__popNode__V($thiz);
      if (currNode.dU()) {
        $p_sci_ChampBaseReverseIterator__setupPayloadNode__sci_Node__V($thiz, currNode);
        return true;
      }
    }
  }
  return false;
}
/** @constructor */
function $c_sci_ChampBaseReverseIterator() {
  this.bR = 0;
  this.dB = null;
  this.b0 = 0;
  this.d6 = null;
  this.d7 = null;
}
$p = $c_sci_ChampBaseReverseIterator.prototype = new $h_sc_AbstractIterator();
$p.constructor = $c_sci_ChampBaseReverseIterator;
/** @constructor */
function $h_sci_ChampBaseReverseIterator() {
}
$h_sci_ChampBaseReverseIterator.prototype = $p;
$p.k = (function() {
  return ((this.bR >= 0) || $p_sci_ChampBaseReverseIterator__searchNextValueNode__Z(this));
});
function $p_sci_HashMapBuilder__isAliased__Z($thiz) {
  return ($thiz.cI !== null);
}
function $p_sci_HashMapBuilder__insertElement__AI__I__I__AI($thiz, as, ix, elem) {
  if ((ix < 0)) {
    throw $ct_jl_ArrayIndexOutOfBoundsException__(new $c_jl_ArrayIndexOutOfBoundsException());
  }
  if ((ix > as.a.length)) {
    throw $ct_jl_ArrayIndexOutOfBoundsException__(new $c_jl_ArrayIndexOutOfBoundsException());
  }
  var result = new $ac_I(((1 + as.a.length) | 0));
  as.j(0, result, 0, ix);
  result.a[ix] = elem;
  var destPos = ((1 + ix) | 0);
  var length = ((as.a.length - ix) | 0);
  as.j(ix, result, destPos, length);
  return result;
}
function $p_sci_HashMapBuilder__insertValue__sci_BitmapIndexedMapNode__I__O__I__I__O__V($thiz, bm, bitpos, key, originalHash, keyHash, value) {
  var dataIx = bm.dl(bitpos);
  var idx = (dataIx << 1);
  var src = bm.a0;
  var dst = new $ac_O(((2 + src.a.length) | 0));
  src.j(0, dst, 0, idx);
  dst.a[idx] = key;
  dst.a[((1 + idx) | 0)] = value;
  var destPos = ((2 + idx) | 0);
  var length = ((src.a.length - idx) | 0);
  src.j(idx, dst, destPos, length);
  var dstHashes = $p_sci_HashMapBuilder__insertElement__AI__I__I__AI($thiz, bm.aK, dataIx, originalHash);
  bm.F = (bm.F | bitpos);
  bm.a0 = dst;
  bm.aK = dstHashes;
  bm.ao = ((1 + bm.ao) | 0);
  bm.aC = ((bm.aC + keyHash) | 0);
}
function $p_sci_HashMapBuilder__ensureUnaliased__V($thiz) {
  if ($p_sci_HashMapBuilder__isAliased__Z($thiz)) {
    $p_sci_HashMapBuilder__copyElems__V($thiz);
  }
  $thiz.cI = null;
}
function $p_sci_HashMapBuilder__copyElems__V($thiz) {
  $thiz.bt = $thiz.bt.fz();
}
/** @constructor */
function $c_sci_HashMapBuilder() {
  this.cI = null;
  this.bt = null;
  this.bt = new $c_sci_BitmapIndexedMapNode(0, 0, $m_s_Array$EmptyArrays$().eM, $m_s_Array$EmptyArrays$().e5, 0, 0);
}
$p = $c_sci_HashMapBuilder.prototype = new $h_O();
$p.constructor = $c_sci_HashMapBuilder;
/** @constructor */
function $h_sci_HashMapBuilder() {
}
$h_sci_HashMapBuilder.prototype = $p;
$p.cT = (function(mapNode, key, value, originalHash, keyHash, shift) {
  if ((mapNode instanceof $c_sci_BitmapIndexedMapNode)) {
    var mask = $m_sci_Node$().cq(keyHash, shift);
    var bitpos = $m_sci_Node$().c6(mask);
    if (((mapNode.F & bitpos) !== 0)) {
      var index = $m_sci_Node$().by(mapNode.F, mask, bitpos);
      var key0 = mapNode.c8(index);
      var key0UnimprovedHash = mapNode.dn(index);
      if (((key0UnimprovedHash === originalHash) && $m_sr_BoxesRunTime$().i(key0, key))) {
        mapNode.a0.a[((1 + (index << 1)) | 0)] = value;
        return (void 0);
      } else {
        var value0 = mapNode.bM(index);
        var key0Hash = $m_sc_Hashing$().bq(key0UnimprovedHash);
        var subNodeNew = mapNode.eA(key0, value0, key0UnimprovedHash, key0Hash, key, value, originalHash, keyHash, ((5 + shift) | 0));
        mapNode.h3(bitpos, key0Hash, subNodeNew);
        return (void 0);
      }
    } else if (((mapNode.Q & bitpos) !== 0)) {
      var index$2 = $m_sci_Node$().by(mapNode.Q, mask, bitpos);
      var subNode = mapNode.bL(index$2);
      var beforeSize = subNode.az();
      var beforeHash = subNode.c7();
      this.cT(subNode, key, value, originalHash, keyHash, ((5 + shift) | 0));
      mapNode.ao = ((mapNode.ao + ((subNode.az() - beforeSize) | 0)) | 0);
      mapNode.aC = ((mapNode.aC + ((subNode.c7() - beforeHash) | 0)) | 0);
      return (void 0);
    } else {
      $p_sci_HashMapBuilder__insertValue__sci_BitmapIndexedMapNode__I__O__I__I__O__V(this, mapNode, bitpos, key, originalHash, keyHash, value);
      return (void 0);
    }
  }
  if ((mapNode instanceof $c_sci_HashCollisionMapNode)) {
    var index$3 = mapNode.cR(key);
    if ((index$3 < 0)) {
      mapNode.R = mapNode.R.c4(new $c_T2(key, value));
      return (void 0);
    } else {
      mapNode.R = mapNode.R.ca(index$3, new $c_T2(key, value));
      return (void 0);
    }
  }
  throw new $c_s_MatchError(mapNode);
});
$p.fO = (function() {
  if ((this.bt.ao === 0)) {
    return $m_sci_HashMap$().e9;
  } else if ((this.cI !== null)) {
    return this.cI;
  } else {
    this.cI = new $c_sci_HashMap(this.bt);
    return this.cI;
  }
});
$p.fu = (function(elem) {
  $p_sci_HashMapBuilder__ensureUnaliased__V(this);
  var h = $m_sr_Statics$().ac(elem.aw);
  var im = $m_sc_Hashing$().bq(h);
  this.cT(this.bt, elem.aw, elem.ai, h, im, 0);
  return this;
});
$p.ch = (function(key, value) {
  $p_sci_HashMapBuilder__ensureUnaliased__V(this);
  var originalHash = $m_sr_Statics$().ac(key);
  this.cT(this.bt, key, value, originalHash, $m_sc_Hashing$().bq(originalHash), 0);
  return this;
});
$p.fr = (function(xs) {
  $p_sci_HashMapBuilder__ensureUnaliased__V(this);
  if ((xs instanceof $c_sci_HashMap)) {
    new $c_sci_HashMapBuilder$$anon$1(xs, this);
  } else if (false) {
    var iter = xs.hA();
    while (iter.k()) {
      var next = iter.h();
      var originalHash = xs.hn(next.gN());
      var hash = $m_sc_Hashing$().bq(originalHash);
      this.cT(this.bt, next.gX(), next.fZ(), originalHash, hash, 0);
    }
  } else if (false) {
    var iter$2 = xs.hv();
    while (iter$2.k()) {
      var next$2 = iter$2.h();
      var originalHash$2 = xs.hn(next$2.gN());
      var hash$2 = $m_sc_Hashing$().bq(originalHash$2);
      this.cT(this.bt, next$2.gX(), next$2.fZ(), originalHash$2, hash$2, 0);
    }
  } else if ($is_sci_Map(xs)) {
    xs.cn(new $c_sr_AbstractFunction2_$$Lambda$286cbfc6187197affcadc8465aaec93d6b7d20dc(((key$2, value$2) => this.ch(key$2, value$2))));
  } else {
    var it = xs.p();
    while (it.k()) {
      this.fu(it.h());
    }
  }
  return this;
});
$p.aW = (function() {
  return this.fO();
});
$p.b2 = (function(elem) {
  return this.fu(elem);
});
$p.aS = (function(elems) {
  return this.fr(elems);
});
var $d_sci_HashMapBuilder = new $TypeData().i($c_sci_HashMapBuilder, "scala.collection.immutable.HashMapBuilder", ({
  ct: 1,
  H: 1,
  I: 1,
  G: 1,
  Y: 1
}));
/** @constructor */
function $c_sci_List$() {
  $n_sci_List$ = this;
  var _1 = $m_sci_Nil$();
  $m_sci_Nil$();
}
$p = $c_sci_List$.prototype = new $h_O();
$p.constructor = $c_sci_List$;
/** @constructor */
function $h_sci_List$() {
}
$h_sci_List$.prototype = $p;
$p.b3 = (function() {
  return new $c_scm_ListBuffer();
});
$p.cQ = (function(source) {
  return $m_sci_Nil$().h9(source);
});
var $d_sci_List$ = new $TypeData().i($c_sci_List$, "scala.collection.immutable.List$", ({
  cx: 1,
  a: 1,
  J: 1,
  V: 1,
  a0: 1
}));
var $n_sci_List$;
function $m_sci_List$() {
  if ((!$n_sci_List$)) {
    $n_sci_List$ = new $c_sci_List$();
  }
  return $n_sci_List$;
}
function $ct_sci_Map$Map2$Map2Iterator__sci_Map$Map2__($thiz, outer) {
  if ((outer === null)) {
    throw $ct_jl_NullPointerException__(new $c_jl_NullPointerException());
  }
  $thiz.cJ = outer;
  $thiz.bV = 0;
  return $thiz;
}
/** @constructor */
function $c_sci_Map$Map2$Map2Iterator() {
  this.bV = 0;
  this.cJ = null;
}
$p = $c_sci_Map$Map2$Map2Iterator.prototype = new $h_sc_AbstractIterator();
$p.constructor = $c_sci_Map$Map2$Map2Iterator;
/** @constructor */
function $h_sci_Map$Map2$Map2Iterator() {
}
$h_sci_Map$Map2$Map2Iterator.prototype = $p;
$p.k = (function() {
  return (this.bV < 2);
});
$p.h = (function() {
  matchResult5$1: {
    var result;
    var x23 = this.bV;
    if ((x23 === 0)) {
      var result = new $c_T2(this.cJ.bi, this.cJ.bT);
      break matchResult5$1;
    }
    if ((x23 === 1)) {
      var result = new $c_T2(this.cJ.bj, this.cJ.bU);
      break matchResult5$1;
    }
    var result = $m_sc_Iterator$().a2.h();
  }
  this.bV = ((1 + this.bV) | 0);
  return result;
});
$p.cm = (function(n) {
  this.bV = ((this.bV + n) | 0);
  return this;
});
function $ct_sci_Map$Map3$Map3Iterator__sci_Map$Map3__($thiz, outer) {
  if ((outer === null)) {
    throw $ct_jl_NullPointerException__(new $c_jl_NullPointerException());
  }
  $thiz.bW = outer;
  $thiz.bX = 0;
  return $thiz;
}
/** @constructor */
function $c_sci_Map$Map3$Map3Iterator() {
  this.bX = 0;
  this.bW = null;
}
$p = $c_sci_Map$Map3$Map3Iterator.prototype = new $h_sc_AbstractIterator();
$p.constructor = $c_sci_Map$Map3$Map3Iterator;
/** @constructor */
function $h_sci_Map$Map3$Map3Iterator() {
}
$h_sci_Map$Map3$Map3Iterator.prototype = $p;
$p.k = (function() {
  return (this.bX < 3);
});
$p.h = (function() {
  var result;
  switch (this.bX) {
    case 0: {
      var result = new $c_T2(this.bW.b8, this.bW.bD);
      break;
    }
    case 1: {
      var result = new $c_T2(this.bW.b9, this.bW.bE);
      break;
    }
    case 2: {
      var result = new $c_T2(this.bW.ba, this.bW.bF);
      break;
    }
    default: {
      var result = $m_sc_Iterator$().a2.h();
    }
  }
  this.bX = ((1 + this.bX) | 0);
  return result;
});
$p.cm = (function(n) {
  this.bX = ((this.bX + n) | 0);
  return this;
});
function $ct_sci_Map$Map4$Map4Iterator__sci_Map$Map4__($thiz, outer) {
  if ((outer === null)) {
    throw $ct_jl_NullPointerException__(new $c_jl_NullPointerException());
  }
  $thiz.bv = outer;
  $thiz.bY = 0;
  return $thiz;
}
/** @constructor */
function $c_sci_Map$Map4$Map4Iterator() {
  this.bY = 0;
  this.bv = null;
}
$p = $c_sci_Map$Map4$Map4Iterator.prototype = new $h_sc_AbstractIterator();
$p.constructor = $c_sci_Map$Map4$Map4Iterator;
/** @constructor */
function $h_sci_Map$Map4$Map4Iterator() {
}
$h_sci_Map$Map4$Map4Iterator.prototype = $p;
$p.k = (function() {
  return (this.bY < 4);
});
$p.h = (function() {
  var result;
  switch (this.bY) {
    case 0: {
      var result = new $c_T2(this.bv.aM, this.bv.bk);
      break;
    }
    case 1: {
      var result = new $c_T2(this.bv.aN, this.bv.bl);
      break;
    }
    case 2: {
      var result = new $c_T2(this.bv.aO, this.bv.bm);
      break;
    }
    case 3: {
      var result = new $c_T2(this.bv.aP, this.bv.bn);
      break;
    }
    default: {
      var result = $m_sc_Iterator$().a2.h();
    }
  }
  this.bY = ((1 + this.bY) | 0);
  return result;
});
$p.cm = (function(n) {
  this.bY = ((this.bY + n) | 0);
  return this;
});
/** @constructor */
function $c_sci_MapBuilderImpl() {
  this.bG = null;
  this.d8 = false;
  this.ce = null;
  this.bG = $m_sci_Map$EmptyMap$();
  this.d8 = false;
}
$p = $c_sci_MapBuilderImpl.prototype = new $h_O();
$p.constructor = $c_sci_MapBuilderImpl;
/** @constructor */
function $h_sci_MapBuilderImpl() {
}
$h_sci_MapBuilderImpl.prototype = $p;
$p.fP = (function() {
  return (this.d8 ? this.ce.fO() : this.bG);
});
$p.g7 = (function(key, value) {
  if (this.d8) {
    this.ce.ch(key, value);
  } else if ((this.bG.az() < 4)) {
    this.bG = this.bG.cy(key, value);
  } else if (this.bG.ck(key)) {
    this.bG = this.bG.cy(key, value);
  } else {
    this.d8 = true;
    if ((this.ce === null)) {
      this.ce = new $c_sci_HashMapBuilder();
    }
    this.bG.gk(this.ce);
    this.ce.ch(key, value);
  }
  return this;
});
$p.fs = (function(xs) {
  return (this.d8 ? (this.ce.fr(xs), this) : $f_scm_Growable__addAll__sc_IterableOnce__scm_Growable(this, xs));
});
$p.aW = (function() {
  return this.fP();
});
$p.b2 = (function(elem) {
  return this.g7(elem.aw, elem.ai);
});
$p.aS = (function(elems) {
  return this.fs(elems);
});
var $d_sci_MapBuilderImpl = new $TypeData().i($c_sci_MapBuilderImpl, "scala.collection.immutable.MapBuilderImpl", ({
  cH: 1,
  H: 1,
  I: 1,
  G: 1,
  Y: 1
}));
/** @constructor */
function $c_sci_Vector$() {
  this.f3 = 0;
  this.f4 = null;
  $n_sci_Vector$ = this;
  try {
    $m_sc_StringOps$();
    var $x_1 = $m_jl_Integer$().fH($m_jl_System$SystemProperties$().ew("scala.collection.immutable.Vector.defaultApplyPreferredMaxLength", "250"), 10, 214748364);
  } catch (e) {
    if (false) {
      var $x_1 = 250;
    } else {
      var $x_1;
      throw e;
    }
  }
  this.f3 = $x_1;
  this.f4 = new $c_sci_NewVectorIterator($m_sci_Vector0$(), 0, 0);
}
$p = $c_sci_Vector$.prototype = new $h_O();
$p.constructor = $c_sci_Vector$;
/** @constructor */
function $h_sci_Vector$() {
}
$h_sci_Vector$.prototype = $p;
$p.fD = (function(it) {
  if ((it instanceof $c_sci_Vector)) {
    return it;
  } else {
    var knownSize = it.D();
    if ((knownSize === 0)) {
      return $m_sci_Vector0$();
    } else if (((knownSize > 0) && (knownSize <= 32))) {
      matchResult3: {
        var $x_1;
        if (false) {
          var x = it.hu().hi();
          if (((x !== null) && (x === $d_O.l()))) {
            var $x_1 = it.hp;
            break matchResult3;
          }
        }
        if ($is_sci_Iterable(it)) {
          var a1 = new $ac_O(knownSize);
          it.cl(a1, 0, 2147483647);
          var $x_1 = a1;
          break matchResult3;
        }
        var a1$2 = new $ac_O(knownSize);
        it.p().cl(a1$2, 0, 2147483647);
        var $x_1 = a1$2;
      }
      return new $c_sci_Vector1($x_1);
    } else {
      return new $c_sci_VectorBuilder().ft(it).fQ();
    }
  }
});
$p.cQ = (function(source) {
  return this.fD(source);
});
$p.b3 = (function() {
  return new $c_sci_VectorBuilder();
});
var $d_sci_Vector$ = new $TypeData().i($c_sci_Vector$, "scala.collection.immutable.Vector$", ({
  cU: 1,
  a: 1,
  J: 1,
  V: 1,
  a0: 1
}));
var $n_sci_Vector$;
function $m_sci_Vector$() {
  if ((!$n_sci_Vector$)) {
    $n_sci_Vector$ = new $c_sci_Vector$();
  }
  return $n_sci_Vector$;
}
function $p_sci_VectorBuilder__leftAlignPrefix__V($thiz) {
  var a = null;
  var aParent = null;
  if (($thiz.v >= 6)) {
    a = $thiz.ag;
    var i = (($thiz.r >>> 25) | 0);
    if ((i > 0)) {
      var src = a;
      var dest = a;
      var length = ((64 - i) | 0);
      src.j(i, dest, 0, length);
    }
    var newOffset = (($thiz.r % 33554432) | 0);
    $thiz.m = (($thiz.m - (($thiz.r - newOffset) | 0)) | 0);
    $thiz.r = newOffset;
    if (((($thiz.m >>> 25) | 0) === 0)) {
      $thiz.v = 5;
    }
    aParent = a;
    a = a.a[0];
  }
  if (($thiz.v >= 5)) {
    if ((a === null)) {
      a = $thiz.E;
    }
    var i$2 = (31 & (($thiz.r >>> 20) | 0));
    if (($thiz.v === 5)) {
      if ((i$2 > 0)) {
        var src$1 = a;
        var dest$1 = a;
        var length$1 = ((32 - i$2) | 0);
        src$1.j(i$2, dest$1, 0, length$1);
      }
      $thiz.E = a;
      var newOffset$1 = (($thiz.r % 1048576) | 0);
      $thiz.m = (($thiz.m - (($thiz.r - newOffset$1) | 0)) | 0);
      $thiz.r = newOffset$1;
      if (((($thiz.m >>> 20) | 0) === 0)) {
        $thiz.v = 4;
      }
    } else {
      if ((i$2 > 0)) {
        a = $m_ju_Arrays$().O(a, i$2, 32);
      }
      aParent.a[0] = a;
    }
    aParent = a;
    a = a.a[0];
  }
  if (($thiz.v >= 4)) {
    if ((a === null)) {
      a = $thiz.z;
    }
    var i$3 = (31 & (($thiz.r >>> 15) | 0));
    if (($thiz.v === 4)) {
      if ((i$3 > 0)) {
        var src$2 = a;
        var dest$2 = a;
        var length$2 = ((32 - i$3) | 0);
        src$2.j(i$3, dest$2, 0, length$2);
      }
      $thiz.z = a;
      var newOffset$2 = (($thiz.r % 32768) | 0);
      $thiz.m = (($thiz.m - (($thiz.r - newOffset$2) | 0)) | 0);
      $thiz.r = newOffset$2;
      if (((($thiz.m >>> 15) | 0) === 0)) {
        $thiz.v = 3;
      }
    } else {
      if ((i$3 > 0)) {
        a = $m_ju_Arrays$().O(a, i$3, 32);
      }
      aParent.a[0] = a;
    }
    aParent = a;
    a = a.a[0];
  }
  if (($thiz.v >= 3)) {
    if ((a === null)) {
      a = $thiz.t;
    }
    var i$4 = (31 & (($thiz.r >>> 10) | 0));
    if (($thiz.v === 3)) {
      if ((i$4 > 0)) {
        var src$3 = a;
        var dest$3 = a;
        var length$3 = ((32 - i$4) | 0);
        src$3.j(i$4, dest$3, 0, length$3);
      }
      $thiz.t = a;
      var newOffset$3 = (($thiz.r % 1024) | 0);
      $thiz.m = (($thiz.m - (($thiz.r - newOffset$3) | 0)) | 0);
      $thiz.r = newOffset$3;
      if (((($thiz.m >>> 10) | 0) === 0)) {
        $thiz.v = 2;
      }
    } else {
      if ((i$4 > 0)) {
        a = $m_ju_Arrays$().O(a, i$4, 32);
      }
      aParent.a[0] = a;
    }
    aParent = a;
    a = a.a[0];
  }
  if (($thiz.v >= 2)) {
    if ((a === null)) {
      a = $thiz.q;
    }
    var i$5 = (31 & (($thiz.r >>> 5) | 0));
    if (($thiz.v === 2)) {
      if ((i$5 > 0)) {
        var src$4 = a;
        var dest$4 = a;
        var length$4 = ((32 - i$5) | 0);
        src$4.j(i$5, dest$4, 0, length$4);
      }
      $thiz.q = a;
      var newOffset$4 = (($thiz.r % 32) | 0);
      $thiz.m = (($thiz.m - (($thiz.r - newOffset$4) | 0)) | 0);
      $thiz.r = newOffset$4;
      if (((($thiz.m >>> 5) | 0) === 0)) {
        $thiz.v = 1;
      }
    } else {
      if ((i$5 > 0)) {
        a = $m_ju_Arrays$().O(a, i$5, 32);
      }
      aParent.a[0] = a;
    }
    aParent = a;
    a = a.a[0];
  }
  if (($thiz.v >= 1)) {
    if ((a === null)) {
      a = $thiz.B;
    }
    var i$6 = (31 & $thiz.r);
    if (($thiz.v === 1)) {
      if ((i$6 > 0)) {
        var src$5 = a;
        var dest$5 = a;
        var length$5 = ((32 - i$6) | 0);
        src$5.j(i$6, dest$5, 0, length$5);
      }
      $thiz.B = a;
      $thiz.u = (($thiz.u - $thiz.r) | 0);
      $thiz.r = 0;
    } else {
      if ((i$6 > 0)) {
        a = $m_ju_Arrays$().O(a, i$6, 32);
      }
      aParent.a[0] = a;
    }
  }
  $thiz.dC = false;
}
function $p_sci_VectorBuilder__addArr1__AO__V($thiz, data) {
  var dl = data.a.length;
  if ((dl > 0)) {
    if (($thiz.u === 32)) {
      $p_sci_VectorBuilder__advance__V($thiz);
    }
    var a = ((32 - $thiz.u) | 0);
    var copy1 = ((a < dl) ? a : dl);
    var copy2 = ((dl - copy1) | 0);
    var dest = $thiz.B;
    var destPos = $thiz.u;
    data.j(0, dest, destPos, copy1);
    $thiz.u = (($thiz.u + copy1) | 0);
    if ((copy2 > 0)) {
      $p_sci_VectorBuilder__advance__V($thiz);
      var dest$1 = $thiz.B;
      data.j(copy1, dest$1, 0, copy2);
      $thiz.u = (($thiz.u + copy2) | 0);
    }
  }
}
function $p_sci_VectorBuilder__addArrN__AO__I__V($thiz, slice, dim) {
  if ((slice.a.length === 0)) {
    return (void 0);
  }
  if (($thiz.u === 32)) {
    $p_sci_VectorBuilder__advance__V($thiz);
  }
  var sl = slice.a.length;
  switch (dim) {
    case 2: {
      var a = (31 & ((((1024 - $thiz.m) | 0) >>> 5) | 0));
      var copy1 = ((a < sl) ? a : sl);
      var copy2 = ((sl - copy1) | 0);
      var destPos = (31 & (($thiz.m >>> 5) | 0));
      var dest = $thiz.q;
      slice.j(0, dest, destPos, copy1);
      $p_sci_VectorBuilder__advanceN__I__V($thiz, (copy1 << 5));
      if ((copy2 > 0)) {
        var dest$1 = $thiz.q;
        slice.j(copy1, dest$1, 0, copy2);
        $p_sci_VectorBuilder__advanceN__I__V($thiz, (copy2 << 5));
      }
      break;
    }
    case 3: {
      if (((($thiz.m % 1024) | 0) !== 0)) {
        var f = ((e$3) => {
          $p_sci_VectorBuilder__addArrN__AO__I__V($thiz, e$3, 2);
        });
        var len = slice.a.length;
        var i = 0;
        if ((slice !== null)) {
          while ((i < len)) {
            var x0 = slice.a[i];
            f(x0);
            i = ((1 + i) | 0);
          }
        } else if ((slice instanceof $ac_I)) {
          while ((i < len)) {
            var x0$1 = slice.a[i];
            f(x0$1);
            i = ((1 + i) | 0);
          }
        } else if ((slice instanceof $ac_D)) {
          while ((i < len)) {
            var x0$2 = slice.a[i];
            f(x0$2);
            i = ((1 + i) | 0);
          }
        } else if ((slice instanceof $ac_J)) {
          while ((i < len)) {
            var t = slice.a[i];
            var lo = t.f;
            var hi = t.g;
            f(new $c_RTLong(lo, hi));
            i = ((1 + i) | 0);
          }
        } else if ((slice instanceof $ac_F)) {
          while ((i < len)) {
            var x0$3 = slice.a[i];
            f(x0$3);
            i = ((1 + i) | 0);
          }
        } else if ((slice instanceof $ac_C)) {
          while ((i < len)) {
            var x0$4 = slice.a[i];
            f($bC(x0$4));
            i = ((1 + i) | 0);
          }
        } else if ((slice instanceof $ac_B)) {
          while ((i < len)) {
            var x0$5 = slice.a[i];
            f(x0$5);
            i = ((1 + i) | 0);
          }
        } else if ((slice instanceof $ac_S)) {
          while ((i < len)) {
            var x0$6 = slice.a[i];
            f(x0$6);
            i = ((1 + i) | 0);
          }
        } else if ((slice instanceof $ac_Z)) {
          while ((i < len)) {
            var x0$7 = slice.a[i];
            f(x0$7);
            i = ((1 + i) | 0);
          }
        } else {
          throw new $c_s_MatchError(slice);
        }
        return (void 0);
      }
      var a$1 = (31 & ((((32768 - $thiz.m) | 0) >>> 10) | 0));
      var copy1$2 = ((a$1 < sl) ? a$1 : sl);
      var copy2$2 = ((sl - copy1$2) | 0);
      var destPos$2 = (31 & (($thiz.m >>> 10) | 0));
      var dest$2 = $thiz.t;
      slice.j(0, dest$2, destPos$2, copy1$2);
      $p_sci_VectorBuilder__advanceN__I__V($thiz, (copy1$2 << 10));
      if ((copy2$2 > 0)) {
        var dest$3 = $thiz.t;
        slice.j(copy1$2, dest$3, 0, copy2$2);
        $p_sci_VectorBuilder__advanceN__I__V($thiz, (copy2$2 << 10));
      }
      break;
    }
    case 4: {
      if (((($thiz.m % 32768) | 0) !== 0)) {
        var f$1 = ((e$3$1) => {
          $p_sci_VectorBuilder__addArrN__AO__I__V($thiz, e$3$1, 3);
        });
        var len$1 = slice.a.length;
        var i$1 = 0;
        if ((slice !== null)) {
          while ((i$1 < len$1)) {
            var x0$8 = slice.a[i$1];
            f$1(x0$8);
            i$1 = ((1 + i$1) | 0);
          }
        } else if ((slice instanceof $ac_I)) {
          while ((i$1 < len$1)) {
            var x0$9 = slice.a[i$1];
            f$1(x0$9);
            i$1 = ((1 + i$1) | 0);
          }
        } else if ((slice instanceof $ac_D)) {
          while ((i$1 < len$1)) {
            var x0$10 = slice.a[i$1];
            f$1(x0$10);
            i$1 = ((1 + i$1) | 0);
          }
        } else if ((slice instanceof $ac_J)) {
          while ((i$1 < len$1)) {
            var t$1 = slice.a[i$1];
            var lo$1 = t$1.f;
            var hi$1 = t$1.g;
            f$1(new $c_RTLong(lo$1, hi$1));
            i$1 = ((1 + i$1) | 0);
          }
        } else if ((slice instanceof $ac_F)) {
          while ((i$1 < len$1)) {
            var x0$11 = slice.a[i$1];
            f$1(x0$11);
            i$1 = ((1 + i$1) | 0);
          }
        } else if ((slice instanceof $ac_C)) {
          while ((i$1 < len$1)) {
            var x0$12 = slice.a[i$1];
            f$1($bC(x0$12));
            i$1 = ((1 + i$1) | 0);
          }
        } else if ((slice instanceof $ac_B)) {
          while ((i$1 < len$1)) {
            var x0$13 = slice.a[i$1];
            f$1(x0$13);
            i$1 = ((1 + i$1) | 0);
          }
        } else if ((slice instanceof $ac_S)) {
          while ((i$1 < len$1)) {
            var x0$14 = slice.a[i$1];
            f$1(x0$14);
            i$1 = ((1 + i$1) | 0);
          }
        } else if ((slice instanceof $ac_Z)) {
          while ((i$1 < len$1)) {
            var x0$15 = slice.a[i$1];
            f$1(x0$15);
            i$1 = ((1 + i$1) | 0);
          }
        } else {
          throw new $c_s_MatchError(slice);
        }
        return (void 0);
      }
      var a$2 = (31 & ((((1048576 - $thiz.m) | 0) >>> 15) | 0));
      var copy1$3 = ((a$2 < sl) ? a$2 : sl);
      var copy2$3 = ((sl - copy1$3) | 0);
      var destPos$3 = (31 & (($thiz.m >>> 15) | 0));
      var dest$4 = $thiz.z;
      slice.j(0, dest$4, destPos$3, copy1$3);
      $p_sci_VectorBuilder__advanceN__I__V($thiz, (copy1$3 << 15));
      if ((copy2$3 > 0)) {
        var dest$5 = $thiz.z;
        slice.j(copy1$3, dest$5, 0, copy2$3);
        $p_sci_VectorBuilder__advanceN__I__V($thiz, (copy2$3 << 15));
      }
      break;
    }
    case 5: {
      if (((($thiz.m % 1048576) | 0) !== 0)) {
        var f$2 = ((e$3$2) => {
          $p_sci_VectorBuilder__addArrN__AO__I__V($thiz, e$3$2, 4);
        });
        var len$2 = slice.a.length;
        var i$2 = 0;
        if ((slice !== null)) {
          while ((i$2 < len$2)) {
            var x0$16 = slice.a[i$2];
            f$2(x0$16);
            i$2 = ((1 + i$2) | 0);
          }
        } else if ((slice instanceof $ac_I)) {
          while ((i$2 < len$2)) {
            var x0$17 = slice.a[i$2];
            f$2(x0$17);
            i$2 = ((1 + i$2) | 0);
          }
        } else if ((slice instanceof $ac_D)) {
          while ((i$2 < len$2)) {
            var x0$18 = slice.a[i$2];
            f$2(x0$18);
            i$2 = ((1 + i$2) | 0);
          }
        } else if ((slice instanceof $ac_J)) {
          while ((i$2 < len$2)) {
            var t$2 = slice.a[i$2];
            var lo$2 = t$2.f;
            var hi$2 = t$2.g;
            f$2(new $c_RTLong(lo$2, hi$2));
            i$2 = ((1 + i$2) | 0);
          }
        } else if ((slice instanceof $ac_F)) {
          while ((i$2 < len$2)) {
            var x0$19 = slice.a[i$2];
            f$2(x0$19);
            i$2 = ((1 + i$2) | 0);
          }
        } else if ((slice instanceof $ac_C)) {
          while ((i$2 < len$2)) {
            var x0$20 = slice.a[i$2];
            f$2($bC(x0$20));
            i$2 = ((1 + i$2) | 0);
          }
        } else if ((slice instanceof $ac_B)) {
          while ((i$2 < len$2)) {
            var x0$21 = slice.a[i$2];
            f$2(x0$21);
            i$2 = ((1 + i$2) | 0);
          }
        } else if ((slice instanceof $ac_S)) {
          while ((i$2 < len$2)) {
            var x0$22 = slice.a[i$2];
            f$2(x0$22);
            i$2 = ((1 + i$2) | 0);
          }
        } else if ((slice instanceof $ac_Z)) {
          while ((i$2 < len$2)) {
            var x0$23 = slice.a[i$2];
            f$2(x0$23);
            i$2 = ((1 + i$2) | 0);
          }
        } else {
          throw new $c_s_MatchError(slice);
        }
        return (void 0);
      }
      var a$3 = (31 & ((((33554432 - $thiz.m) | 0) >>> 20) | 0));
      var copy1$4 = ((a$3 < sl) ? a$3 : sl);
      var copy2$4 = ((sl - copy1$4) | 0);
      var destPos$4 = (31 & (($thiz.m >>> 20) | 0));
      var dest$6 = $thiz.E;
      slice.j(0, dest$6, destPos$4, copy1$4);
      $p_sci_VectorBuilder__advanceN__I__V($thiz, (copy1$4 << 20));
      if ((copy2$4 > 0)) {
        var dest$7 = $thiz.E;
        slice.j(copy1$4, dest$7, 0, copy2$4);
        $p_sci_VectorBuilder__advanceN__I__V($thiz, (copy2$4 << 20));
      }
      break;
    }
    case 6: {
      if (((($thiz.m % 33554432) | 0) !== 0)) {
        var f$3 = ((e$3$3) => {
          $p_sci_VectorBuilder__addArrN__AO__I__V($thiz, e$3$3, 5);
        });
        var len$3 = slice.a.length;
        var i$3 = 0;
        if ((slice !== null)) {
          while ((i$3 < len$3)) {
            var x0$24 = slice.a[i$3];
            f$3(x0$24);
            i$3 = ((1 + i$3) | 0);
          }
        } else if ((slice instanceof $ac_I)) {
          while ((i$3 < len$3)) {
            var x0$25 = slice.a[i$3];
            f$3(x0$25);
            i$3 = ((1 + i$3) | 0);
          }
        } else if ((slice instanceof $ac_D)) {
          while ((i$3 < len$3)) {
            var x0$26 = slice.a[i$3];
            f$3(x0$26);
            i$3 = ((1 + i$3) | 0);
          }
        } else if ((slice instanceof $ac_J)) {
          while ((i$3 < len$3)) {
            var t$3 = slice.a[i$3];
            var lo$3 = t$3.f;
            var hi$3 = t$3.g;
            f$3(new $c_RTLong(lo$3, hi$3));
            i$3 = ((1 + i$3) | 0);
          }
        } else if ((slice instanceof $ac_F)) {
          while ((i$3 < len$3)) {
            var x0$27 = slice.a[i$3];
            f$3(x0$27);
            i$3 = ((1 + i$3) | 0);
          }
        } else if ((slice instanceof $ac_C)) {
          while ((i$3 < len$3)) {
            var x0$28 = slice.a[i$3];
            f$3($bC(x0$28));
            i$3 = ((1 + i$3) | 0);
          }
        } else if ((slice instanceof $ac_B)) {
          while ((i$3 < len$3)) {
            var x0$29 = slice.a[i$3];
            f$3(x0$29);
            i$3 = ((1 + i$3) | 0);
          }
        } else if ((slice instanceof $ac_S)) {
          while ((i$3 < len$3)) {
            var x0$30 = slice.a[i$3];
            f$3(x0$30);
            i$3 = ((1 + i$3) | 0);
          }
        } else if ((slice instanceof $ac_Z)) {
          while ((i$3 < len$3)) {
            var x0$31 = slice.a[i$3];
            f$3(x0$31);
            i$3 = ((1 + i$3) | 0);
          }
        } else {
          throw new $c_s_MatchError(slice);
        }
        return (void 0);
      }
      var destPos$5 = (($thiz.m >>> 25) | 0);
      if ((((destPos$5 + sl) | 0) > 64)) {
        throw $ct_jl_IllegalArgumentException__T__(new $c_jl_IllegalArgumentException(), "exceeding 2^31 elements");
      }
      var dest$8 = $thiz.ag;
      slice.j(0, dest$8, destPos$5, sl);
      $p_sci_VectorBuilder__advanceN__I__V($thiz, (sl << 25));
      break;
    }
    default: {
      throw new $c_s_MatchError(dim);
    }
  }
}
function $p_sci_VectorBuilder__addVector__sci_Vector__sci_VectorBuilder($thiz, xs) {
  var sliceCount = xs.bA();
  var sliceIdx = 0;
  while ((sliceIdx < sliceCount)) {
    var slice = xs.bz(sliceIdx);
    matchResult26: {
      var idx = sliceIdx;
      var c = ((sliceCount / 2) | 0);
      var a = ((idx - c) | 0);
      var sign = (a >> 31);
      var x37 = ((((1 + c) | 0) - (((a ^ sign) - sign) | 0)) | 0);
      if ((x37 === 1)) {
        $p_sci_VectorBuilder__addArr1__AO__V($thiz, slice);
        break matchResult26;
      }
      if ((($thiz.u === 32) || ($thiz.u === 0))) {
        $p_sci_VectorBuilder__addArrN__AO__I__V($thiz, slice, x37);
        break matchResult26;
      }
      $m_sci_VectorStatics$().et((((-2) + x37) | 0), slice, new $c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28(((data$3) => {
        $p_sci_VectorBuilder__addArr1__AO__V($thiz, data$3);
      })));
    }
    sliceIdx = ((1 + sliceIdx) | 0);
  }
  return $thiz;
}
function $p_sci_VectorBuilder__advance__V($thiz) {
  var idx = ((32 + $thiz.m) | 0);
  var xor = (idx ^ $thiz.m);
  $thiz.m = idx;
  $thiz.u = 0;
  $p_sci_VectorBuilder__advance1__I__I__V($thiz, idx, xor);
}
function $p_sci_VectorBuilder__advanceN__I__V($thiz, n) {
  if ((n > 0)) {
    var idx = (($thiz.m + n) | 0);
    var xor = (idx ^ $thiz.m);
    $thiz.m = idx;
    $thiz.u = 0;
    $p_sci_VectorBuilder__advance1__I__I__V($thiz, idx, xor);
  }
}
function $p_sci_VectorBuilder__advance1__I__I__V($thiz, idx, xor) {
  if ((xor <= 0)) {
    throw $ct_jl_IllegalArgumentException__T__(new $c_jl_IllegalArgumentException(), ((((((((((((((((("advance1(" + idx) + ", ") + xor) + "): a1=") + $thiz.B) + ", a2=") + $thiz.q) + ", a3=") + $thiz.t) + ", a4=") + $thiz.z) + ", a5=") + $thiz.E) + ", a6=") + $thiz.ag) + ", depth=") + $thiz.v));
  } else if ((xor < 1024)) {
    if (($thiz.v <= 1)) {
      $thiz.q = new ($d_O.r().r().C)(32);
      $thiz.q.a[0] = $thiz.B;
      $thiz.v = 2;
    }
    $thiz.B = new $ac_O(32);
    $thiz.q.a[(31 & ((idx >>> 5) | 0))] = $thiz.B;
  } else if ((xor < 32768)) {
    if (($thiz.v <= 2)) {
      $thiz.t = new ($d_O.r().r().r().C)(32);
      $thiz.t.a[0] = $thiz.q;
      $thiz.v = 3;
    }
    $thiz.B = new $ac_O(32);
    $thiz.q = new ($d_O.r().r().C)(32);
    $thiz.q.a[(31 & ((idx >>> 5) | 0))] = $thiz.B;
    $thiz.t.a[(31 & ((idx >>> 10) | 0))] = $thiz.q;
  } else if ((xor < 1048576)) {
    if (($thiz.v <= 3)) {
      $thiz.z = new ($d_O.r().r().r().r().C)(32);
      $thiz.z.a[0] = $thiz.t;
      $thiz.v = 4;
    }
    $thiz.B = new $ac_O(32);
    $thiz.q = new ($d_O.r().r().C)(32);
    $thiz.t = new ($d_O.r().r().r().C)(32);
    $thiz.q.a[(31 & ((idx >>> 5) | 0))] = $thiz.B;
    $thiz.t.a[(31 & ((idx >>> 10) | 0))] = $thiz.q;
    $thiz.z.a[(31 & ((idx >>> 15) | 0))] = $thiz.t;
  } else if ((xor < 33554432)) {
    if (($thiz.v <= 4)) {
      $thiz.E = new ($d_O.r().r().r().r().r().C)(32);
      $thiz.E.a[0] = $thiz.z;
      $thiz.v = 5;
    }
    $thiz.B = new $ac_O(32);
    $thiz.q = new ($d_O.r().r().C)(32);
    $thiz.t = new ($d_O.r().r().r().C)(32);
    $thiz.z = new ($d_O.r().r().r().r().C)(32);
    $thiz.q.a[(31 & ((idx >>> 5) | 0))] = $thiz.B;
    $thiz.t.a[(31 & ((idx >>> 10) | 0))] = $thiz.q;
    $thiz.z.a[(31 & ((idx >>> 15) | 0))] = $thiz.t;
    $thiz.E.a[(31 & ((idx >>> 20) | 0))] = $thiz.z;
  } else {
    if (($thiz.v <= 5)) {
      $thiz.ag = new ($d_O.r().r().r().r().r().r().C)(64);
      $thiz.ag.a[0] = $thiz.E;
      $thiz.v = 6;
    }
    $thiz.B = new $ac_O(32);
    $thiz.q = new ($d_O.r().r().C)(32);
    $thiz.t = new ($d_O.r().r().r().C)(32);
    $thiz.z = new ($d_O.r().r().r().r().C)(32);
    $thiz.E = new ($d_O.r().r().r().r().r().C)(32);
    $thiz.q.a[(31 & ((idx >>> 5) | 0))] = $thiz.B;
    $thiz.t.a[(31 & ((idx >>> 10) | 0))] = $thiz.q;
    $thiz.z.a[(31 & ((idx >>> 15) | 0))] = $thiz.t;
    $thiz.E.a[(31 & ((idx >>> 20) | 0))] = $thiz.z;
    $thiz.ag.a[((idx >>> 25) | 0)] = $thiz.E;
  }
}
/** @constructor */
function $c_sci_VectorBuilder() {
  this.ag = null;
  this.E = null;
  this.z = null;
  this.t = null;
  this.q = null;
  this.B = null;
  this.u = 0;
  this.m = 0;
  this.r = 0;
  this.dC = false;
  this.v = 0;
  this.B = new $ac_O(32);
  this.u = 0;
  this.m = 0;
  this.r = 0;
  this.dC = false;
  this.v = 1;
}
$p = $c_sci_VectorBuilder.prototype = new $h_O();
$p.constructor = $c_sci_VectorBuilder;
/** @constructor */
function $h_sci_VectorBuilder() {
}
$h_sci_VectorBuilder.prototype = $p;
$p.gT = (function(v) {
  var x28 = v.bA();
  switch (x28) {
    case 0: {
      break;
    }
    case 1: {
      this.v = 1;
      var i = v.b.a.length;
      this.u = (31 & i);
      this.m = ((i - this.u) | 0);
      var a = v.b;
      this.B = ((a.a.length === 32) ? a : $m_ju_Arrays$().O(a, 0, 32));
      break;
    }
    case 3: {
      var d2 = v.aF;
      var a$1 = v.d;
      this.B = ((a$1.a.length === 32) ? a$1 : $m_ju_Arrays$().O(a$1, 0, 32));
      this.v = 2;
      this.r = ((32 - v.b1) | 0);
      var i$1 = ((v.e + this.r) | 0);
      this.u = (31 & i$1);
      this.m = ((i$1 - this.u) | 0);
      this.q = new ($d_O.r().r().C)(32);
      this.q.a[0] = v.b;
      var dest = this.q;
      var length = d2.a.length;
      d2.j(0, dest, 1, length);
      this.q.a[((1 + d2.a.length) | 0)] = this.B;
      break;
    }
    case 5: {
      var d3 = v.au;
      var s2 = v.av;
      var a$2 = v.d;
      this.B = ((a$2.a.length === 32) ? a$2 : $m_ju_Arrays$().O(a$2, 0, 32));
      this.v = 3;
      this.r = ((1024 - v.aB) | 0);
      var i$2 = ((v.e + this.r) | 0);
      this.u = (31 & i$2);
      this.m = ((i$2 - this.u) | 0);
      this.t = new ($d_O.r().r().r().C)(32);
      this.t.a[0] = $m_sci_VectorStatics$().bx(v.b, v.aR);
      var dest$1 = this.t;
      var length$1 = d3.a.length;
      d3.j(0, dest$1, 1, length$1);
      this.q = $m_ju_Arrays$().G(s2, 32);
      this.t.a[((1 + d3.a.length) | 0)] = this.q;
      this.q.a[s2.a.length] = this.B;
      break;
    }
    case 7: {
      var d4 = v.ad;
      var s3 = v.af;
      var s2$2 = v.ae;
      var a$3 = v.d;
      this.B = ((a$3.a.length === 32) ? a$3 : $m_ju_Arrays$().O(a$3, 0, 32));
      this.v = 4;
      this.r = ((32768 - v.at) | 0);
      var i$3 = ((v.e + this.r) | 0);
      this.u = (31 & i$3);
      this.m = ((i$3 - this.u) | 0);
      this.z = new ($d_O.r().r().r().r().C)(32);
      this.z.a[0] = $m_sci_VectorStatics$().bx($m_sci_VectorStatics$().bx(v.b, v.ax), v.ay);
      var dest$2 = this.z;
      var length$2 = d4.a.length;
      d4.j(0, dest$2, 1, length$2);
      this.t = $m_ju_Arrays$().G(s3, 32);
      this.q = $m_ju_Arrays$().G(s2$2, 32);
      this.z.a[((1 + d4.a.length) | 0)] = this.t;
      this.t.a[s3.a.length] = this.q;
      this.q.a[s2$2.a.length] = this.B;
      break;
    }
    case 9: {
      var d5 = v.S;
      var s4 = v.V;
      var s3$2 = v.U;
      var s2$3 = v.T;
      var a$4 = v.d;
      this.B = ((a$4.a.length === 32) ? a$4 : $m_ju_Arrays$().O(a$4, 0, 32));
      this.v = 5;
      this.r = ((1048576 - v.a7) | 0);
      var i$4 = ((v.e + this.r) | 0);
      this.u = (31 & i$4);
      this.m = ((i$4 - this.u) | 0);
      this.E = new ($d_O.r().r().r().r().r().C)(32);
      this.E.a[0] = $m_sci_VectorStatics$().bx($m_sci_VectorStatics$().bx($m_sci_VectorStatics$().bx(v.b, v.aj), v.ak), v.al);
      var dest$3 = this.E;
      var length$3 = d5.a.length;
      d5.j(0, dest$3, 1, length$3);
      this.z = $m_ju_Arrays$().G(s4, 32);
      this.t = $m_ju_Arrays$().G(s3$2, 32);
      this.q = $m_ju_Arrays$().G(s2$3, 32);
      this.E.a[((1 + d5.a.length) | 0)] = this.z;
      this.z.a[s4.a.length] = this.t;
      this.t.a[s3$2.a.length] = this.q;
      this.q.a[s2$3.a.length] = this.B;
      break;
    }
    case 11: {
      var d6 = v.J;
      var s5 = v.N;
      var s4$2 = v.M;
      var s3$3 = v.L;
      var s2$4 = v.K;
      var a$5 = v.d;
      this.B = ((a$5.a.length === 32) ? a$5 : $m_ju_Arrays$().O(a$5, 0, 32));
      this.v = 6;
      this.r = ((33554432 - v.a1) | 0);
      var i$5 = ((v.e + this.r) | 0);
      this.u = (31 & i$5);
      this.m = ((i$5 - this.u) | 0);
      this.ag = new ($d_O.r().r().r().r().r().r().C)(64);
      this.ag.a[0] = $m_sci_VectorStatics$().bx($m_sci_VectorStatics$().bx($m_sci_VectorStatics$().bx($m_sci_VectorStatics$().bx(v.b, v.a8), v.a9), v.aa), v.ab);
      var dest$4 = this.ag;
      var length$4 = d6.a.length;
      d6.j(0, dest$4, 1, length$4);
      this.E = $m_ju_Arrays$().G(s5, 32);
      this.z = $m_ju_Arrays$().G(s4$2, 32);
      this.t = $m_ju_Arrays$().G(s3$3, 32);
      this.q = $m_ju_Arrays$().G(s2$4, 32);
      this.ag.a[((1 + d6.a.length) | 0)] = this.E;
      this.E.a[s5.a.length] = this.z;
      this.z.a[s4$2.a.length] = this.t;
      this.t.a[s3$3.a.length] = this.q;
      this.q.a[s2$4.a.length] = this.B;
      break;
    }
    default: {
      throw new $c_s_MatchError(x28);
    }
  }
  if (((this.u === 0) && (this.m > 0))) {
    this.u = 32;
    this.m = (((-32) + this.m) | 0);
  }
  return this;
});
$p.g9 = (function(elem) {
  if ((this.u === 32)) {
    $p_sci_VectorBuilder__advance__V(this);
  }
  this.B.a[this.u] = elem;
  this.u = ((1 + this.u) | 0);
  return this;
});
$p.ft = (function(xs) {
  return ((xs instanceof $c_sci_Vector) ? ((((this.u === 0) && (this.m === 0)) && (!this.dC)) ? this.gT(xs) : $p_sci_VectorBuilder__addVector__sci_Vector__sci_VectorBuilder(this, xs)) : $f_scm_Growable__addAll__sc_IterableOnce__scm_Growable(this, xs));
});
$p.fQ = (function() {
  if (this.dC) {
    $p_sci_VectorBuilder__leftAlignPrefix__V(this);
  }
  var len = ((this.u + this.m) | 0);
  var realLen = ((len - this.r) | 0);
  if ((realLen === 0)) {
    $m_sci_Vector$();
    return $m_sci_Vector0$();
  } else if ((len < 0)) {
    throw $ct_jl_IndexOutOfBoundsException__T__(new $c_jl_IndexOutOfBoundsException(), ("Vector cannot have negative size " + len));
  } else if ((len <= 32)) {
    var a = this.B;
    return new $c_sci_Vector1(((a.a.length === realLen) ? a : $m_ju_Arrays$().G(a, realLen)));
  } else if ((len <= 1024)) {
    var i1 = (31 & (((-1) + len) | 0));
    var i2 = (((((-1) + len) | 0) >>> 5) | 0);
    var data = $m_ju_Arrays$().O(this.q, 1, i2);
    var prefix1 = this.q.a[0];
    var a$1 = this.q.a[i2];
    var len$1 = ((1 + i1) | 0);
    var suffix1 = ((a$1.a.length === len$1) ? a$1 : $m_ju_Arrays$().G(a$1, len$1));
    return new $c_sci_Vector2(prefix1, ((32 - this.r) | 0), data, suffix1, realLen);
  } else if ((len <= 32768)) {
    var i1$2 = (31 & (((-1) + len) | 0));
    var i2$2 = (31 & (((((-1) + len) | 0) >>> 5) | 0));
    var i3 = (((((-1) + len) | 0) >>> 10) | 0);
    var data$2 = $m_ju_Arrays$().O(this.t, 1, i3);
    var a$2 = this.t.a[0];
    var prefix2 = $m_ju_Arrays$().O(a$2, 1, a$2.a.length);
    var prefix1$2 = this.t.a[0].a[0];
    var suffix2 = $m_ju_Arrays$().G(this.t.a[i3], i2$2);
    var a$3 = this.t.a[i3].a[i2$2];
    var len$2 = ((1 + i1$2) | 0);
    var suffix1$2 = ((a$3.a.length === len$2) ? a$3 : $m_ju_Arrays$().G(a$3, len$2));
    var len1 = prefix1$2.a.length;
    return new $c_sci_Vector3(prefix1$2, len1, prefix2, ((len1 + (prefix2.a.length << 5)) | 0), data$2, suffix2, suffix1$2, realLen);
  } else if ((len <= 1048576)) {
    var i1$3 = (31 & (((-1) + len) | 0));
    var i2$3 = (31 & (((((-1) + len) | 0) >>> 5) | 0));
    var i3$2 = (31 & (((((-1) + len) | 0) >>> 10) | 0));
    var i4 = (((((-1) + len) | 0) >>> 15) | 0);
    var data$3 = $m_ju_Arrays$().O(this.z, 1, i4);
    var a$4 = this.z.a[0];
    var prefix3 = $m_ju_Arrays$().O(a$4, 1, a$4.a.length);
    var a$5 = this.z.a[0].a[0];
    var prefix2$2 = $m_ju_Arrays$().O(a$5, 1, a$5.a.length);
    var prefix1$3 = this.z.a[0].a[0].a[0];
    var suffix3 = $m_ju_Arrays$().G(this.z.a[i4], i3$2);
    var suffix2$2 = $m_ju_Arrays$().G(this.z.a[i4].a[i3$2], i2$3);
    var a$6 = this.z.a[i4].a[i3$2].a[i2$3];
    var len$3 = ((1 + i1$3) | 0);
    var suffix1$3 = ((a$6.a.length === len$3) ? a$6 : $m_ju_Arrays$().G(a$6, len$3));
    var len1$2 = prefix1$3.a.length;
    var len12$2 = ((len1$2 + (prefix2$2.a.length << 5)) | 0);
    return new $c_sci_Vector4(prefix1$3, len1$2, prefix2$2, len12$2, prefix3, ((len12$2 + (prefix3.a.length << 10)) | 0), data$3, suffix3, suffix2$2, suffix1$3, realLen);
  } else if ((len <= 33554432)) {
    var i1$4 = (31 & (((-1) + len) | 0));
    var i2$4 = (31 & (((((-1) + len) | 0) >>> 5) | 0));
    var i3$3 = (31 & (((((-1) + len) | 0) >>> 10) | 0));
    var i4$2 = (31 & (((((-1) + len) | 0) >>> 15) | 0));
    var i5 = (((((-1) + len) | 0) >>> 20) | 0);
    var data$4 = $m_ju_Arrays$().O(this.E, 1, i5);
    var a$7 = this.E.a[0];
    var prefix4 = $m_ju_Arrays$().O(a$7, 1, a$7.a.length);
    var a$8 = this.E.a[0].a[0];
    var prefix3$2 = $m_ju_Arrays$().O(a$8, 1, a$8.a.length);
    var a$9 = this.E.a[0].a[0].a[0];
    var prefix2$3 = $m_ju_Arrays$().O(a$9, 1, a$9.a.length);
    var prefix1$4 = this.E.a[0].a[0].a[0].a[0];
    var suffix4 = $m_ju_Arrays$().G(this.E.a[i5], i4$2);
    var suffix3$2 = $m_ju_Arrays$().G(this.E.a[i5].a[i4$2], i3$3);
    var suffix2$3 = $m_ju_Arrays$().G(this.E.a[i5].a[i4$2].a[i3$3], i2$4);
    var a$10 = this.E.a[i5].a[i4$2].a[i3$3].a[i2$4];
    var len$4 = ((1 + i1$4) | 0);
    var suffix1$4 = ((a$10.a.length === len$4) ? a$10 : $m_ju_Arrays$().G(a$10, len$4));
    var len1$3 = prefix1$4.a.length;
    var len12$3 = ((len1$3 + (prefix2$3.a.length << 5)) | 0);
    var len123$2 = ((len12$3 + (prefix3$2.a.length << 10)) | 0);
    return new $c_sci_Vector5(prefix1$4, len1$3, prefix2$3, len12$3, prefix3$2, len123$2, prefix4, ((len123$2 + (prefix4.a.length << 15)) | 0), data$4, suffix4, suffix3$2, suffix2$3, suffix1$4, realLen);
  } else {
    var i1$5 = (31 & (((-1) + len) | 0));
    var i2$5 = (31 & (((((-1) + len) | 0) >>> 5) | 0));
    var i3$4 = (31 & (((((-1) + len) | 0) >>> 10) | 0));
    var i4$3 = (31 & (((((-1) + len) | 0) >>> 15) | 0));
    var i5$2 = (31 & (((((-1) + len) | 0) >>> 20) | 0));
    var i6 = (((((-1) + len) | 0) >>> 25) | 0);
    var data$5 = $m_ju_Arrays$().O(this.ag, 1, i6);
    var a$11 = this.ag.a[0];
    var prefix5 = $m_ju_Arrays$().O(a$11, 1, a$11.a.length);
    var a$12 = this.ag.a[0].a[0];
    var prefix4$2 = $m_ju_Arrays$().O(a$12, 1, a$12.a.length);
    var a$13 = this.ag.a[0].a[0].a[0];
    var prefix3$3 = $m_ju_Arrays$().O(a$13, 1, a$13.a.length);
    var a$14 = this.ag.a[0].a[0].a[0].a[0];
    var prefix2$4 = $m_ju_Arrays$().O(a$14, 1, a$14.a.length);
    var prefix1$5 = this.ag.a[0].a[0].a[0].a[0].a[0];
    var suffix5 = $m_ju_Arrays$().G(this.ag.a[i6], i5$2);
    var suffix4$2 = $m_ju_Arrays$().G(this.ag.a[i6].a[i5$2], i4$3);
    var suffix3$3 = $m_ju_Arrays$().G(this.ag.a[i6].a[i5$2].a[i4$3], i3$4);
    var suffix2$4 = $m_ju_Arrays$().G(this.ag.a[i6].a[i5$2].a[i4$3].a[i3$4], i2$5);
    var a$15 = this.ag.a[i6].a[i5$2].a[i4$3].a[i3$4].a[i2$5];
    var len$5 = ((1 + i1$5) | 0);
    var suffix1$5 = ((a$15.a.length === len$5) ? a$15 : $m_ju_Arrays$().G(a$15, len$5));
    var len1$4 = prefix1$5.a.length;
    var len12$4 = ((len1$4 + (prefix2$4.a.length << 5)) | 0);
    var len123$3 = ((len12$4 + (prefix3$3.a.length << 10)) | 0);
    var len1234$2 = ((len123$3 + (prefix4$2.a.length << 15)) | 0);
    return new $c_sci_Vector6(prefix1$5, len1$4, prefix2$4, len12$4, prefix3$3, len123$3, prefix4$2, len1234$2, prefix5, ((len1234$2 + (prefix5.a.length << 20)) | 0), data$5, suffix5, suffix4$2, suffix3$3, suffix2$4, suffix1$5, realLen);
  }
});
$p.A = (function() {
  return (((((((("VectorBuilder(len1=" + this.u) + ", lenRest=") + this.m) + ", offset=") + this.r) + ", depth=") + this.v) + ")");
});
$p.b2 = (function(elem) {
  return this.g9(elem);
});
$p.aS = (function(elems) {
  return this.ft(elems);
});
$p.aW = (function() {
  return this.fQ();
});
var $d_sci_VectorBuilder = new $TypeData().i($c_sci_VectorBuilder, "scala.collection.immutable.VectorBuilder", ({
  d2: 1,
  H: 1,
  I: 1,
  G: 1,
  Y: 1
}));
/** @constructor */
function $c_scm_Buffer$() {
  this.dA = null;
  $ct_sc_SeqFactory$Delegate__sc_SeqFactory__(this, $m_sjs_js_WrappedArray$());
}
$p = $c_scm_Buffer$.prototype = new $h_sc_SeqFactory$Delegate();
$p.constructor = $c_scm_Buffer$;
/** @constructor */
function $h_scm_Buffer$() {
}
$h_scm_Buffer$.prototype = $p;
var $d_scm_Buffer$ = new $TypeData().i($c_scm_Buffer$, "scala.collection.mutable.Buffer$", ({
  d5: 1,
  ch: 1,
  a: 1,
  J: 1,
  V: 1
}));
var $n_scm_Buffer$;
function $m_scm_Buffer$() {
  if ((!$n_scm_Buffer$)) {
    $n_scm_Buffer$ = new $c_scm_Buffer$();
  }
  return $n_scm_Buffer$;
}
function $ct_scm_ImmutableBuilder__sc_IterableOnce__($thiz, empty) {
  $thiz.db = empty;
  return $thiz;
}
/** @constructor */
function $c_scm_ImmutableBuilder() {
  this.db = null;
}
$p = $c_scm_ImmutableBuilder.prototype = new $h_O();
$p.constructor = $c_scm_ImmutableBuilder;
/** @constructor */
function $h_scm_ImmutableBuilder() {
}
$h_scm_ImmutableBuilder.prototype = $p;
$p.aS = (function(elems) {
  return $f_scm_Growable__addAll__sc_IterableOnce__scm_Growable(this, elems);
});
$p.aW = (function() {
  return this.db;
});
/** @constructor */
function $c_scm_ListBuffer$() {
}
$p = $c_scm_ListBuffer$.prototype = new $h_O();
$p.constructor = $c_scm_ListBuffer$;
/** @constructor */
function $h_scm_ListBuffer$() {
}
$h_scm_ListBuffer$.prototype = $p;
$p.b3 = (function() {
  return new $c_scm_GrowableBuilder(new $c_scm_ListBuffer());
});
$p.cQ = (function(source) {
  return new $c_scm_ListBuffer().eF(source);
});
var $d_scm_ListBuffer$ = new $TypeData().i($c_scm_ListBuffer$, "scala.collection.mutable.ListBuffer$", ({
  dc: 1,
  a: 1,
  J: 1,
  V: 1,
  a0: 1
}));
var $n_scm_ListBuffer$;
function $m_scm_ListBuffer$() {
  if ((!$n_scm_ListBuffer$)) {
    $n_scm_ListBuffer$ = new $c_scm_ListBuffer$();
  }
  return $n_scm_ListBuffer$;
}
/** @constructor */
function $c_scm_MutationTracker$CheckedIterator(underlying, mutationCount) {
  this.ef = null;
  this.f8 = null;
  this.f7 = 0;
  this.ef = underlying;
  this.f8 = mutationCount;
  this.f7 = (mutationCount.aT() | 0);
}
$p = $c_scm_MutationTracker$CheckedIterator.prototype = new $h_sc_AbstractIterator();
$p.constructor = $c_scm_MutationTracker$CheckedIterator;
/** @constructor */
function $h_scm_MutationTracker$CheckedIterator() {
}
$h_scm_MutationTracker$CheckedIterator.prototype = $p;
$p.k = (function() {
  $m_scm_MutationTracker$().gl(this.f7, (this.f8.aT() | 0), "mutation occurred during iteration");
  return this.ef.k();
});
$p.h = (function() {
  return this.ef.h();
});
var $d_scm_MutationTracker$CheckedIterator = new $TypeData().i($c_scm_MutationTracker$CheckedIterator, "scala.collection.mutable.MutationTracker$CheckedIterator", ({
  de: 1,
  n: 1,
  b: 1,
  c: 1,
  o: 1
}));
/** @constructor */
function $c_s_concurrent_ExecutionContext$parasitic$() {
  this.fc = null;
  $n_s_concurrent_ExecutionContext$parasitic$ = this;
  this.fc = new $c_jl_ThreadLocal();
}
$p = $c_s_concurrent_ExecutionContext$parasitic$.prototype = new $h_O();
$p.constructor = $c_s_concurrent_ExecutionContext$parasitic$;
/** @constructor */
function $h_s_concurrent_ExecutionContext$parasitic$() {
}
$h_s_concurrent_ExecutionContext$parasitic$.prototype = $p;
$p.es = (function(runnable) {
  $f_s_concurrent_BatchingExecutor__submitSyncBatched__jl_Runnable__V(this, runnable);
});
$p.eE = (function(t) {
  $m_s_concurrent_ExecutionContext$().cM.l(t);
});
var $d_s_concurrent_ExecutionContext$parasitic$ = new $TypeData().i($c_s_concurrent_ExecutionContext$parasitic$, "scala.concurrent.ExecutionContext$parasitic$", ({
  dl: 1,
  ah: 1,
  a7: 1,
  ai: 1,
  dh: 1
}));
var $n_s_concurrent_ExecutionContext$parasitic$;
function $m_s_concurrent_ExecutionContext$parasitic$() {
  if ((!$n_s_concurrent_ExecutionContext$parasitic$)) {
    $n_s_concurrent_ExecutionContext$parasitic$ = new $c_s_concurrent_ExecutionContext$parasitic$();
  }
  return $n_s_concurrent_ExecutionContext$parasitic$;
}
/** @constructor */
function $c_sr_ScalaRunTime$$anon$1(x$1) {
  this.fm = null;
  this.di = 0;
  this.fl = 0;
  this.fm = x$1;
  this.di = 0;
  this.fl = x$1.be();
}
$p = $c_sr_ScalaRunTime$$anon$1.prototype = new $h_sc_AbstractIterator();
$p.constructor = $c_sr_ScalaRunTime$$anon$1;
/** @constructor */
function $h_sr_ScalaRunTime$$anon$1() {
}
$h_sr_ScalaRunTime$$anon$1.prototype = $p;
$p.k = (function() {
  return (this.di < this.fl);
});
$p.h = (function() {
  var result = this.fm.bf(this.di);
  this.di = ((1 + this.di) | 0);
  return result;
});
var $d_sr_ScalaRunTime$$anon$1 = new $TypeData().i($c_sr_ScalaRunTime$$anon$1, "scala.runtime.ScalaRunTime$$anon$1", ({
  dM: 1,
  n: 1,
  b: 1,
  c: 1,
  o: 1
}));
/** @constructor */
function $c_sjs_js_WrappedArray$() {
}
$p = $c_sjs_js_WrappedArray$.prototype = new $h_O();
$p.constructor = $c_sjs_js_WrappedArray$;
/** @constructor */
function $h_sjs_js_WrappedArray$() {
}
$h_sjs_js_WrappedArray$.prototype = $p;
$p.b3 = (function() {
  return $ct_sjs_js_WrappedArray__(new $c_sjs_js_WrappedArray());
});
$p.gG = (function(source) {
  return $f_scm_Growable__addAll__sc_IterableOnce__scm_Growable($ct_sjs_js_WrappedArray__(new $c_sjs_js_WrappedArray()), source).aW();
});
$p.cQ = (function(source) {
  return this.gG(source);
});
var $d_sjs_js_WrappedArray$ = new $TypeData().i($c_sjs_js_WrappedArray$, "scala.scalajs.js.WrappedArray$", ({
  dY: 1,
  a0: 1,
  a: 1,
  J: 1,
  V: 1
}));
var $n_sjs_js_WrappedArray$;
function $m_sjs_js_WrappedArray$() {
  if ((!$n_sjs_js_WrappedArray$)) {
    $n_sjs_js_WrappedArray$ = new $c_sjs_js_WrappedArray$();
  }
  return $n_sjs_js_WrappedArray$;
}
/** @constructor */
function $c_sjsr_WrappedVarArgs$() {
}
$p = $c_sjsr_WrappedVarArgs$.prototype = new $h_O();
$p.constructor = $c_sjsr_WrappedVarArgs$;
/** @constructor */
function $h_sjsr_WrappedVarArgs$() {
}
$h_sjsr_WrappedVarArgs$.prototype = $p;
$p.gH = (function(source) {
  return this.b3().aS(source).aW();
});
$p.b3 = (function() {
  return new $c_scm_Builder$$anon$1(new $c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28(((x$1$2$2) => new $c_sjsr_WrappedVarArgs(x$1$2$2.c2))), $ct_sjs_js_WrappedArray__sjs_js_Array__(new $c_sjs_js_WrappedArray(), []));
});
$p.cQ = (function(source) {
  return this.gH(source);
});
var $d_sjsr_WrappedVarArgs$ = new $TypeData().i($c_sjsr_WrappedVarArgs$, "scala.scalajs.runtime.WrappedVarArgs$", ({
  e1: 1,
  a0: 1,
  a: 1,
  J: 1,
  V: 1
}));
var $n_sjsr_WrappedVarArgs$;
function $m_sjsr_WrappedVarArgs$() {
  if ((!$n_sjsr_WrappedVarArgs$)) {
    $n_sjsr_WrappedVarArgs$ = new $c_sjsr_WrappedVarArgs$();
  }
  return $n_sjsr_WrappedVarArgs$;
}
/** @constructor */
function $c_s_util_Failure(exception) {
  this.bK = null;
  this.bK = exception;
}
$p = $c_s_util_Failure.prototype = new $h_s_util_Try();
$p.constructor = $c_s_util_Failure;
/** @constructor */
function $h_s_util_Failure() {
}
$h_s_util_Failure.prototype = $p;
$p.I = (function() {
  return $m_s_util_hashing_MurmurHash3$().ct(this, (-1408943127), true);
});
$p.H = (function(x$0) {
  if ((this === x$0)) {
    return true;
  } else if ((x$0 instanceof $c_s_util_Failure)) {
    var x = this.bK;
    var x$2 = x$0.bK;
    return ((x === null) ? (x$2 === null) : x.H(x$2));
  } else {
    return false;
  }
});
$p.A = (function() {
  return $m_sr_ScalaRunTime$().dO(this);
});
$p.be = (function() {
  return 1;
});
$p.bg = (function() {
  return "Failure";
});
$p.bf = (function(n) {
  if ((n === 0)) {
    return this.bK;
  }
  throw $ct_jl_IndexOutOfBoundsException__T__(new $c_jl_IndexOutOfBoundsException(), ("" + n));
});
$p.aU = (function() {
  var $x_1 = this.bK;
  throw (($x_1 instanceof $c_sjs_js_JavaScriptException) ? $x_1.bp : $x_1);
});
$p.dR = (function(f) {
});
$p.fM = (function(pf) {
  var marker = $m_sr_Statics$PFMarker$();
  try {
    var v = pf.dj(this.bK, new $c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28(((x$2) => marker)));
    return ((marker !== v) ? new $c_s_util_Success(v) : this);
  } catch (e) {
    var e$2 = ((e instanceof $c_jl_Throwable) ? e : new $c_sjs_js_JavaScriptException(e));
    var x18 = $m_s_util_control_NonFatal$().hm(e$2);
    if ((!x18.n())) {
      return new $c_s_util_Failure(x18.aU());
    }
    throw ((e$2 instanceof $c_sjs_js_JavaScriptException) ? e$2.bp : e$2);
  }
});
function $isArrayOf_s_util_Failure(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.b7)));
}
var $d_s_util_Failure = new $TypeData().i($c_s_util_Failure, "scala.util.Failure", ({
  b7: 1,
  ak: 1,
  d: 1,
  z: 1,
  a: 1
}));
/** @constructor */
function $c_s_util_Success(value) {
  this.cN = null;
  this.cN = value;
}
$p = $c_s_util_Success.prototype = new $h_s_util_Try();
$p.constructor = $c_s_util_Success;
/** @constructor */
function $h_s_util_Success() {
}
$h_s_util_Success.prototype = $p;
$p.I = (function() {
  return $m_s_util_hashing_MurmurHash3$().ct(this, (-1750213842), true);
});
$p.H = (function(x$0) {
  return ((this === x$0) || ((x$0 instanceof $c_s_util_Success) && $m_sr_BoxesRunTime$().i(this.cN, x$0.cN)));
});
$p.A = (function() {
  return $m_sr_ScalaRunTime$().dO(this);
});
$p.be = (function() {
  return 1;
});
$p.bg = (function() {
  return "Success";
});
$p.bf = (function(n) {
  if ((n === 0)) {
    return this.cN;
  }
  throw $ct_jl_IndexOutOfBoundsException__T__(new $c_jl_IndexOutOfBoundsException(), ("" + n));
});
$p.aU = (function() {
  return this.cN;
});
$p.dR = (function(f) {
  f.l(this.cN);
});
$p.fM = (function(pf) {
  return this;
});
function $isArrayOf_s_util_Success(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.b8)));
}
var $d_s_util_Success = new $TypeData().i($c_s_util_Success, "scala.util.Success", ({
  b8: 1,
  ak: 1,
  d: 1,
  z: 1,
  a: 1
}));
function $ct_jl_ArrayIndexOutOfBoundsException__T__($thiz, s) {
  $ct_jl_Throwable__T__jl_Throwable__Z__Z__($thiz, s, null, true, true);
  return $thiz;
}
function $ct_jl_ArrayIndexOutOfBoundsException__($thiz) {
  $ct_jl_Throwable__T__jl_Throwable__Z__Z__($thiz, null, null, true, true);
  return $thiz;
}
class $c_jl_ArrayIndexOutOfBoundsException extends $c_jl_IndexOutOfBoundsException {
}
var $d_jl_ArrayIndexOutOfBoundsException = new $TypeData().i($c_jl_ArrayIndexOutOfBoundsException, "java.lang.ArrayIndexOutOfBoundsException", ({
  bf: 1,
  av: 1,
  q: 1,
  l: 1,
  f: 1,
  a: 1
}));
function $f_jl_Double__equals__O__Z($thiz, that) {
  return Object.is($thiz, that);
}
function $f_jl_Double__hashCode__I($thiz) {
  var valueInt = ($thiz | 0);
  if (((valueInt === $thiz) && ((1.0 / $thiz) !== (-Infinity)))) {
    return valueInt;
  } else if (($thiz !== $thiz)) {
    return 2146959360;
  } else {
    var fpBitsDataView = $fpBitsDataView;
    fpBitsDataView.setFloat64(0, $thiz, true);
    return ((fpBitsDataView.getInt32(0, true) | 0) ^ (fpBitsDataView.getInt32(4, true) | 0));
  }
}
function $f_jl_Double__toString__T($thiz) {
  return ("" + $thiz);
}
function $isArrayOf_jl_Double(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.as)));
}
var $d_jl_Double = new $TypeData().i(0, "java.lang.Double", ({
  as: 1,
  O: 1,
  a: 1,
  E: 1,
  y: 1,
  Z: 1
}), ((x) => ((typeof x) === "number")));
function $f_jl_Float__equals__O__Z($thiz, that) {
  return Object.is($thiz, that);
}
function $f_jl_Float__hashCode__I($thiz) {
  var value = $thiz;
  var valueInt = (value | 0);
  if (((valueInt === value) && ((1.0 / value) !== (-Infinity)))) {
    return valueInt;
  } else if ((value !== value)) {
    return 2146959360;
  } else {
    var fpBitsDataView = $fpBitsDataView;
    fpBitsDataView.setFloat64(0, value, true);
    return ((fpBitsDataView.getInt32(0, true) | 0) ^ (fpBitsDataView.getInt32(4, true) | 0));
  }
}
function $f_jl_Float__toString__T($thiz) {
  return ("" + $thiz);
}
var $d_jl_Float = new $TypeData().i(0, "java.lang.Float", ({
  bl: 1,
  O: 1,
  a: 1,
  E: 1,
  y: 1,
  Z: 1
}), ((x) => $isFloat(x)));
function $f_jl_Integer__equals__O__Z($thiz, that) {
  return Object.is($thiz, that);
}
function $f_jl_Integer__hashCode__I($thiz) {
  return $thiz;
}
function $f_jl_Integer__toString__T($thiz) {
  return ("" + $thiz);
}
var $d_jl_Integer = new $TypeData().i(0, "java.lang.Integer", ({
  bn: 1,
  O: 1,
  a: 1,
  E: 1,
  y: 1,
  Z: 1
}), ((x) => $isInt(x)));
function $f_jl_Long__equals__O__Z($thiz, that) {
  return ((that instanceof $c_RTLong) && (($thiz.f === that.f) && ($thiz.g === that.g)));
}
function $f_jl_Long__hashCode__I($thiz) {
  return ($thiz.f ^ $thiz.g);
}
function $f_jl_Long__toString__T($thiz) {
  return $m_RTLong$().fL($thiz.f, $thiz.g);
}
function $isArrayOf_jl_Long(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.aw)));
}
var $d_jl_Long = new $TypeData().i(0, "java.lang.Long", ({
  aw: 1,
  O: 1,
  a: 1,
  E: 1,
  y: 1,
  Z: 1
}), ((x) => (x instanceof $c_RTLong)));
class $c_jl_NumberFormatException extends $c_jl_IllegalArgumentException {
  constructor(s) {
    super();
    $ct_jl_Throwable__T__jl_Throwable__Z__Z__(this, s, null, true, true);
  }
}
var $d_jl_NumberFormatException = new $TypeData().i($c_jl_NumberFormatException, "java.lang.NumberFormatException", ({
  bv: 1,
  au: 1,
  q: 1,
  l: 1,
  f: 1,
  a: 1
}));
function $f_T__hashCode__I($thiz) {
  var n = $thiz.length;
  var h = 0;
  var i = 0;
  while ((i !== n)) {
    h = (((((h << 5) - h) | 0) + $thiz.charCodeAt(i)) | 0);
    i = ((1 + i) | 0);
  }
  return h;
}
function $f_T__equals__O__Z($thiz, that) {
  return ($thiz === that);
}
function $f_T__toString__T($thiz) {
  return $thiz;
}
var $d_T = new $TypeData().i(0, "java.lang.String", ({
  bB: 1,
  a: 1,
  E: 1,
  a5: 1,
  y: 1,
  Z: 1
}), ((x) => ((typeof x) === "string")));
/** @constructor */
function $c_s_None$() {
}
$p = $c_s_None$.prototype = new $h_s_Option();
$p.constructor = $c_s_None$;
/** @constructor */
function $h_s_None$() {
}
$h_s_None$.prototype = $p;
$p.I = (function() {
  return 2433880;
});
$p.A = (function() {
  return "None";
});
$p.be = (function() {
  return 0;
});
$p.bg = (function() {
  return "None";
});
$p.bf = (function(n) {
  throw $ct_jl_IndexOutOfBoundsException__T__(new $c_jl_IndexOutOfBoundsException(), ("" + n));
});
$p.gK = (function() {
  throw $ct_ju_NoSuchElementException__T__(new $c_ju_NoSuchElementException(), "None.get");
});
$p.aU = (function() {
  this.gK();
});
var $d_s_None$ = new $TypeData().i($c_s_None$, "scala.None$", ({
  bV: 1,
  aB: 1,
  b: 1,
  d: 1,
  z: 1,
  a: 1
}));
var $n_s_None$;
function $m_s_None$() {
  if ((!$n_s_None$)) {
    $n_s_None$ = new $c_s_None$();
  }
  return $n_s_None$;
}
/** @constructor */
function $c_s_Some(value) {
  this.cE = null;
  this.cE = value;
}
$p = $c_s_Some.prototype = new $h_s_Option();
$p.constructor = $c_s_Some;
/** @constructor */
function $h_s_Some() {
}
$h_s_Some.prototype = $p;
$p.I = (function() {
  return $m_s_util_hashing_MurmurHash3$().ct(this, 1323286827, true);
});
$p.H = (function(x$0) {
  return ((this === x$0) || ((x$0 instanceof $c_s_Some) && $m_sr_BoxesRunTime$().i(this.cE, x$0.cE)));
});
$p.A = (function() {
  return $m_sr_ScalaRunTime$().dO(this);
});
$p.be = (function() {
  return 1;
});
$p.bg = (function() {
  return "Some";
});
$p.bf = (function(n) {
  if ((n === 0)) {
    return this.cE;
  }
  throw $ct_jl_IndexOutOfBoundsException__T__(new $c_jl_IndexOutOfBoundsException(), ("" + n));
});
$p.aU = (function() {
  return this.cE;
});
function $isArrayOf_s_Some(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.aC)));
}
var $d_s_Some = new $TypeData().i($c_s_Some, "scala.Some", ({
  aC: 1,
  aB: 1,
  b: 1,
  d: 1,
  z: 1,
  a: 1
}));
/** @constructor */
function $c_sc_AbstractIterable() {
}
$p = $c_sc_AbstractIterable.prototype = new $h_O();
$p.constructor = $c_sc_AbstractIterable;
/** @constructor */
function $h_sc_AbstractIterable() {
}
$h_sc_AbstractIterable.prototype = $p;
$p.D = (function() {
  return (-1);
});
$p.dm = (function(p) {
  return $f_sc_IterableOnceOps__forall__F1__Z(this, p);
});
$p.cl = (function(dest, start, n) {
  return $f_sc_IterableOnceOps__copyToArray__O__I__I__I(this, dest, start, n);
});
$p.dP = (function(b, start, sep, end) {
  return $f_sc_IterableOnceOps__addString__scm_StringBuilder__T__T__T__scm_StringBuilder(this, b, start, sep, end);
});
$p.cj = (function() {
  return this.cv();
});
function $p_sc_IndexedSeqView$IndexedSeqViewIterator__formatRange$1__I__I($thiz, value) {
  return ((value < 0) ? 0 : ((value > $thiz.aI) ? $thiz.aI : value));
}
/** @constructor */
function $c_sc_IndexedSeqView$IndexedSeqViewIterator(self) {
  this.eR = null;
  this.bO = 0;
  this.aI = 0;
  this.eR = self;
  this.bO = 0;
  this.aI = self.w();
}
$p = $c_sc_IndexedSeqView$IndexedSeqViewIterator.prototype = new $h_sc_AbstractIterator();
$p.constructor = $c_sc_IndexedSeqView$IndexedSeqViewIterator;
/** @constructor */
function $h_sc_IndexedSeqView$IndexedSeqViewIterator() {
}
$h_sc_IndexedSeqView$IndexedSeqViewIterator.prototype = $p;
$p.D = (function() {
  return this.aI;
});
$p.k = (function() {
  return (this.aI > 0);
});
$p.h = (function() {
  if ((this.aI > 0)) {
    var r = this.eR.C(this.bO);
    this.bO = ((1 + this.bO) | 0);
    this.aI = (((-1) + this.aI) | 0);
    return r;
  } else {
    return $m_sc_Iterator$().a2.h();
  }
});
$p.cm = (function(n) {
  if ((n > 0)) {
    this.bO = ((this.bO + n) | 0);
    var b = ((this.aI - n) | 0);
    this.aI = ((b < 0) ? 0 : b);
  }
  return this;
});
$p.dv = (function(from, until) {
  var formatFrom = $p_sc_IndexedSeqView$IndexedSeqViewIterator__formatRange$1__I__I(this, from);
  var formatUntil = $p_sc_IndexedSeqView$IndexedSeqViewIterator__formatRange$1__I__I(this, until);
  var b = ((formatUntil - formatFrom) | 0);
  this.aI = ((b < 0) ? 0 : b);
  this.bO = ((this.bO + formatFrom) | 0);
  return this;
});
var $d_sc_IndexedSeqView$IndexedSeqViewIterator = new $TypeData().i($c_sc_IndexedSeqView$IndexedSeqViewIterator, "scala.collection.IndexedSeqView$IndexedSeqViewIterator", ({
  c6: 1,
  n: 1,
  b: 1,
  c: 1,
  o: 1,
  a: 1
}));
/** @constructor */
function $c_sc_Iterator$$anon$21() {
  this.db = null;
  $ct_scm_ImmutableBuilder__sc_IterableOnce__(this, $m_sc_Iterator$().a2);
}
$p = $c_sc_Iterator$$anon$21.prototype = new $h_scm_ImmutableBuilder();
$p.constructor = $c_sc_Iterator$$anon$21;
/** @constructor */
function $h_sc_Iterator$$anon$21() {
}
$h_sc_Iterator$$anon$21.prototype = $p;
$p.g8 = (function(elem) {
  this.db = this.db.eq(new $c_sr_AbstractFunction0_$$Lambda$a02b774b97db8234e08c6a02dd06557c99779855((() => new $c_sc_Iterator$$anon$20(elem))));
  return this;
});
$p.b2 = (function(elem) {
  return this.g8(elem);
});
var $d_sc_Iterator$$anon$21 = new $TypeData().i($c_sc_Iterator$$anon$21, "scala.collection.Iterator$$anon$21", ({
  cb: 1,
  d9: 1,
  H: 1,
  I: 1,
  G: 1,
  Y: 1
}));
function $f_sc_MapOps__applyOrElse__O__F1__O($thiz, x, default$1) {
  return $thiz.co(x, new $c_sr_AbstractFunction0_$$Lambda$a02b774b97db8234e08c6a02dd06557c99779855((() => default$1.l(x))));
}
function $f_sc_MapOps__foreachEntry__F2__V($thiz, f) {
  var it = $thiz.p();
  while (it.k()) {
    var next = it.h();
    f.ci(next.aw, next.ai);
  }
}
function $f_sc_MapOps__addString__scm_StringBuilder__T__T__T__scm_StringBuilder($thiz, sb, start, sep, end) {
  return $f_sc_IterableOnceOps__addString__scm_StringBuilder__T__T__T__scm_StringBuilder(new $c_sc_Iterator$$anon$9(new $c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28(((x$1$2) => {
    var k = x$1$2.aw;
    var v = x$1$2.ai;
    return ((k + " -> ") + v);
  })), $thiz.p()), sb, start, sep, end);
}
function $f_sc_StrictOptimizedSeqOps__appendedAll__sc_IterableOnce__O($thiz, suffix) {
  var b = $thiz.dq().b3();
  b.aS($thiz);
  b.aS(suffix);
  return b.aW();
}
/** @constructor */
function $c_sci_HashMapBuilder$$anon$1(hm$1, outer) {
  this.aZ = 0;
  this.d4 = 0;
  this.cc = null;
  this.aL = 0;
  this.bC = null;
  this.d5 = null;
  if ((outer === null)) {
    throw $ct_jl_NullPointerException__(new $c_jl_NullPointerException());
  }
  $ct_sci_ChampBaseIterator__sci_Node__(this, hm$1.aD);
  while (this.k()) {
    var originalHash = this.cc.dn(this.aZ);
    outer.cT(outer.bt, this.cc.c8(this.aZ), this.cc.bM(this.aZ), originalHash, $m_sc_Hashing$().bq(originalHash), 0);
    this.aZ = ((1 + this.aZ) | 0);
  }
}
$p = $c_sci_HashMapBuilder$$anon$1.prototype = new $h_sci_ChampBaseIterator();
$p.constructor = $c_sci_HashMapBuilder$$anon$1;
/** @constructor */
function $h_sci_HashMapBuilder$$anon$1() {
}
$h_sci_HashMapBuilder$$anon$1.prototype = $p;
$p.h = (function() {
  return $m_sc_Iterator$().a2.h();
});
var $d_sci_HashMapBuilder$$anon$1 = new $TypeData().i($c_sci_HashMapBuilder$$anon$1, "scala.collection.immutable.HashMapBuilder$$anon$1", ({
  cu: 1,
  aJ: 1,
  n: 1,
  b: 1,
  c: 1,
  o: 1
}));
function $is_sci_Iterable(obj) {
  return (!(!((obj && obj.$classData) && obj.$classData.n.m)));
}
function $isArrayOf_sci_Iterable(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.m)));
}
/** @constructor */
function $c_sci_Map$Map2$$anon$1(outer) {
  this.bV = 0;
  this.cJ = null;
  if ((outer === null)) {
    throw $ct_jl_NullPointerException__(new $c_jl_NullPointerException());
  }
  $ct_sci_Map$Map2$Map2Iterator__sci_Map$Map2__(this, outer);
}
$p = $c_sci_Map$Map2$$anon$1.prototype = new $h_sci_Map$Map2$Map2Iterator();
$p.constructor = $c_sci_Map$Map2$$anon$1;
/** @constructor */
function $h_sci_Map$Map2$$anon$1() {
}
$h_sci_Map$Map2$$anon$1.prototype = $p;
var $d_sci_Map$Map2$$anon$1 = new $TypeData().i($c_sci_Map$Map2$$anon$1, "scala.collection.immutable.Map$Map2$$anon$1", ({
  cB: 1,
  cC: 1,
  n: 1,
  b: 1,
  c: 1,
  o: 1
}));
/** @constructor */
function $c_sci_Map$Map3$$anon$4(outer) {
  this.bX = 0;
  this.bW = null;
  if ((outer === null)) {
    throw $ct_jl_NullPointerException__(new $c_jl_NullPointerException());
  }
  $ct_sci_Map$Map3$Map3Iterator__sci_Map$Map3__(this, outer);
}
$p = $c_sci_Map$Map3$$anon$4.prototype = new $h_sci_Map$Map3$Map3Iterator();
$p.constructor = $c_sci_Map$Map3$$anon$4;
/** @constructor */
function $h_sci_Map$Map3$$anon$4() {
}
$h_sci_Map$Map3$$anon$4.prototype = $p;
var $d_sci_Map$Map3$$anon$4 = new $TypeData().i($c_sci_Map$Map3$$anon$4, "scala.collection.immutable.Map$Map3$$anon$4", ({
  cD: 1,
  cE: 1,
  n: 1,
  b: 1,
  c: 1,
  o: 1
}));
/** @constructor */
function $c_sci_Map$Map4$$anon$7(outer) {
  this.bY = 0;
  this.bv = null;
  if ((outer === null)) {
    throw $ct_jl_NullPointerException__(new $c_jl_NullPointerException());
  }
  $ct_sci_Map$Map4$Map4Iterator__sci_Map$Map4__(this, outer);
}
$p = $c_sci_Map$Map4$$anon$7.prototype = new $h_sci_Map$Map4$Map4Iterator();
$p.constructor = $c_sci_Map$Map4$$anon$7;
/** @constructor */
function $h_sci_Map$Map4$$anon$7() {
}
$h_sci_Map$Map4$$anon$7.prototype = $p;
var $d_sci_Map$Map4$$anon$7 = new $TypeData().i($c_sci_Map$Map4$$anon$7, "scala.collection.immutable.Map$Map4$$anon$7", ({
  cF: 1,
  cG: 1,
  n: 1,
  b: 1,
  c: 1,
  o: 1
}));
/** @constructor */
function $c_sci_MapKeyValueTupleHashIterator(rootNode) {
  this.bR = 0;
  this.dB = null;
  this.b0 = 0;
  this.d6 = null;
  this.d7 = null;
  this.ea = 0;
  this.f0 = null;
  $ct_sci_ChampBaseReverseIterator__sci_Node__(this, rootNode);
  this.ea = 0;
}
$p = $c_sci_MapKeyValueTupleHashIterator.prototype = new $h_sci_ChampBaseReverseIterator();
$p.constructor = $c_sci_MapKeyValueTupleHashIterator;
/** @constructor */
function $h_sci_MapKeyValueTupleHashIterator() {
}
$h_sci_MapKeyValueTupleHashIterator.prototype = $p;
$p.I = (function() {
  return $m_s_util_hashing_MurmurHash3$().fV(this.ea, $m_sr_Statics$().ac(this.f0), (-889275714));
});
$p.h6 = (function() {
  if ((!this.k())) {
    $m_sc_Iterator$().a2.h();
  }
  this.ea = this.dB.dn(this.bR);
  this.f0 = this.dB.bM(this.bR);
  this.bR = (((-1) + this.bR) | 0);
  return this;
});
$p.h = (function() {
  return this.h6();
});
var $d_sci_MapKeyValueTupleHashIterator = new $TypeData().i($c_sci_MapKeyValueTupleHashIterator, "scala.collection.immutable.MapKeyValueTupleHashIterator", ({
  cI: 1,
  cr: 1,
  n: 1,
  b: 1,
  c: 1,
  o: 1
}));
/** @constructor */
function $c_sci_MapKeyValueTupleIterator(rootNode) {
  this.aZ = 0;
  this.d4 = 0;
  this.cc = null;
  this.aL = 0;
  this.bC = null;
  this.d5 = null;
  $ct_sci_ChampBaseIterator__sci_Node__(this, rootNode);
}
$p = $c_sci_MapKeyValueTupleIterator.prototype = new $h_sci_ChampBaseIterator();
$p.constructor = $c_sci_MapKeyValueTupleIterator;
/** @constructor */
function $h_sci_MapKeyValueTupleIterator() {
}
$h_sci_MapKeyValueTupleIterator.prototype = $p;
$p.h5 = (function() {
  if ((!this.k())) {
    $m_sc_Iterator$().a2.h();
  }
  var payload = this.cc.fF(this.aZ);
  this.aZ = ((1 + this.aZ) | 0);
  return payload;
});
$p.h = (function() {
  return this.h5();
});
var $d_sci_MapKeyValueTupleIterator = new $TypeData().i($c_sci_MapKeyValueTupleIterator, "scala.collection.immutable.MapKeyValueTupleIterator", ({
  cJ: 1,
  aJ: 1,
  n: 1,
  b: 1,
  c: 1,
  o: 1
}));
function $p_sci_NewVectorIterator__advanceSlice__V($thiz) {
  if (($thiz.aQ <= $thiz.a3)) {
    $m_sc_Iterator$().a2.h();
  }
  $thiz.c0 = ((1 + $thiz.c0) | 0);
  var slice = $thiz.ec.bz($thiz.c0);
  while ((slice.a.length === 0)) {
    $thiz.c0 = ((1 + $thiz.c0) | 0);
    slice = $thiz.ec.bz($thiz.c0);
  }
  $thiz.d9 = $thiz.cg;
  var count = $thiz.f2;
  var idx = $thiz.c0;
  var c = ((count / 2) | 0);
  var a = ((idx - c) | 0);
  var sign = (a >> 31);
  $thiz.bZ = ((((1 + c) | 0) - (((a ^ sign) - sign) | 0)) | 0);
  var x46 = $thiz.bZ;
  switch (x46) {
    case 1: {
      $thiz.ap = slice;
      break;
    }
    case 2: {
      $thiz.aq = slice;
      break;
    }
    case 3: {
      $thiz.aE = slice;
      break;
    }
    case 4: {
      $thiz.bo = slice;
      break;
    }
    case 5: {
      $thiz.cf = slice;
      break;
    }
    case 6: {
      $thiz.eb = slice;
      break;
    }
    default: {
      throw new $c_s_MatchError(x46);
    }
  }
  $thiz.cg = (($thiz.d9 + Math.imul(slice.a.length, (1 << Math.imul(5, (((-1) + $thiz.bZ) | 0))))) | 0);
  if (($thiz.cg > $thiz.bI)) {
    $thiz.cg = $thiz.bI;
  }
  if (($thiz.bZ > 1)) {
    $thiz.cK = (((-1) + (1 << Math.imul(5, $thiz.bZ))) | 0);
  }
}
function $p_sci_NewVectorIterator__advance__V($thiz) {
  var pos = (((($thiz.a3 - $thiz.aQ) | 0) + $thiz.bI) | 0);
  if ((pos === $thiz.cg)) {
    $p_sci_NewVectorIterator__advanceSlice__V($thiz);
  }
  if (($thiz.bZ > 1)) {
    var io = ((pos - $thiz.d9) | 0);
    $p_sci_NewVectorIterator__advanceA__I__I__V($thiz, io, ($thiz.cK ^ io));
    $thiz.cK = io;
  }
  $thiz.aQ = (($thiz.aQ - $thiz.a3) | 0);
  var a = $thiz.ap.a.length;
  var b = $thiz.aQ;
  $thiz.bH = ((a < b) ? a : b);
  $thiz.a3 = 0;
}
function $p_sci_NewVectorIterator__advanceA__I__I__V($thiz, io, xor) {
  if ((xor < 1024)) {
    $thiz.ap = $thiz.aq.a[(31 & ((io >>> 5) | 0))];
  } else if ((xor < 32768)) {
    $thiz.aq = $thiz.aE.a[(31 & ((io >>> 10) | 0))];
    $thiz.ap = $thiz.aq.a[0];
  } else if ((xor < 1048576)) {
    $thiz.aE = $thiz.bo.a[(31 & ((io >>> 15) | 0))];
    $thiz.aq = $thiz.aE.a[0];
    $thiz.ap = $thiz.aq.a[0];
  } else if ((xor < 33554432)) {
    $thiz.bo = $thiz.cf.a[(31 & ((io >>> 20) | 0))];
    $thiz.aE = $thiz.bo.a[0];
    $thiz.aq = $thiz.aE.a[0];
    $thiz.ap = $thiz.aq.a[0];
  } else {
    $thiz.cf = $thiz.eb.a[((io >>> 25) | 0)];
    $thiz.bo = $thiz.cf.a[0];
    $thiz.aE = $thiz.bo.a[0];
    $thiz.aq = $thiz.aE.a[0];
    $thiz.ap = $thiz.aq.a[0];
  }
}
function $p_sci_NewVectorIterator__setA__I__I__V($thiz, io, xor) {
  if ((xor < 1024)) {
    $thiz.ap = $thiz.aq.a[(31 & ((io >>> 5) | 0))];
  } else if ((xor < 32768)) {
    $thiz.aq = $thiz.aE.a[(31 & ((io >>> 10) | 0))];
    $thiz.ap = $thiz.aq.a[(31 & ((io >>> 5) | 0))];
  } else if ((xor < 1048576)) {
    $thiz.aE = $thiz.bo.a[(31 & ((io >>> 15) | 0))];
    $thiz.aq = $thiz.aE.a[(31 & ((io >>> 10) | 0))];
    $thiz.ap = $thiz.aq.a[(31 & ((io >>> 5) | 0))];
  } else if ((xor < 33554432)) {
    $thiz.bo = $thiz.cf.a[(31 & ((io >>> 20) | 0))];
    $thiz.aE = $thiz.bo.a[(31 & ((io >>> 15) | 0))];
    $thiz.aq = $thiz.aE.a[(31 & ((io >>> 10) | 0))];
    $thiz.ap = $thiz.aq.a[(31 & ((io >>> 5) | 0))];
  } else {
    $thiz.cf = $thiz.eb.a[((io >>> 25) | 0)];
    $thiz.bo = $thiz.cf.a[(31 & ((io >>> 20) | 0))];
    $thiz.aE = $thiz.bo.a[(31 & ((io >>> 15) | 0))];
    $thiz.aq = $thiz.aE.a[(31 & ((io >>> 10) | 0))];
    $thiz.ap = $thiz.aq.a[(31 & ((io >>> 5) | 0))];
  }
}
/** @constructor */
function $c_sci_NewVectorIterator(v, totalLength, sliceCount) {
  this.ec = null;
  this.bI = 0;
  this.f2 = 0;
  this.ap = null;
  this.aq = null;
  this.aE = null;
  this.bo = null;
  this.cf = null;
  this.eb = null;
  this.bH = 0;
  this.a3 = 0;
  this.cK = 0;
  this.aQ = 0;
  this.c0 = 0;
  this.bZ = 0;
  this.d9 = 0;
  this.cg = 0;
  this.ec = v;
  this.bI = totalLength;
  this.f2 = sliceCount;
  this.ap = v.b;
  this.bH = this.ap.a.length;
  this.a3 = 0;
  this.cK = 0;
  this.aQ = this.bI;
  this.c0 = 0;
  this.bZ = 1;
  this.d9 = 0;
  this.cg = this.bH;
}
$p = $c_sci_NewVectorIterator.prototype = new $h_sc_AbstractIterator();
$p.constructor = $c_sci_NewVectorIterator;
/** @constructor */
function $h_sci_NewVectorIterator() {
}
$h_sci_NewVectorIterator.prototype = $p;
$p.D = (function() {
  return ((this.aQ - this.a3) | 0);
});
$p.k = (function() {
  return (this.aQ > this.a3);
});
$p.h = (function() {
  if ((this.a3 === this.bH)) {
    $p_sci_NewVectorIterator__advance__V(this);
  }
  var r = this.ap.a[this.a3];
  this.a3 = ((1 + this.a3) | 0);
  return r;
});
$p.cm = (function(n) {
  if ((n > 0)) {
    var oldpos = ((((this.a3 - this.aQ) | 0) + this.bI) | 0);
    var a = ((oldpos + n) | 0);
    var b = this.bI;
    var newpos = ((a < b) ? a : b);
    if ((newpos === this.bI)) {
      this.a3 = 0;
      this.aQ = 0;
      this.bH = 0;
    } else {
      while ((newpos >= this.cg)) {
        $p_sci_NewVectorIterator__advanceSlice__V(this);
      }
      var io = ((newpos - this.d9) | 0);
      if ((this.bZ > 1)) {
        $p_sci_NewVectorIterator__setA__I__I__V(this, io, (this.cK ^ io));
        this.cK = io;
      }
      this.bH = this.ap.a.length;
      this.a3 = (31 & io);
      this.aQ = ((this.a3 + ((this.bI - newpos) | 0)) | 0);
      if ((this.bH > this.aQ)) {
        this.bH = this.aQ;
      }
    }
  }
  return this;
});
$p.cl = (function(xs, start, len) {
  var xsLen = $m_jl_reflect_Array$().dS(xs);
  var srcLen = ((this.aQ - this.a3) | 0);
  var limit = ((len < srcLen) ? len : srcLen);
  var capacity = ((start < 0) ? xsLen : ((xsLen - start) | 0));
  var total = ((capacity < limit) ? capacity : limit);
  var total$1 = ((total < 0) ? 0 : total);
  var copied = 0;
  var isBoxed = (xs instanceof $ac_O);
  while ((copied < total$1)) {
    if ((this.a3 === this.bH)) {
      $p_sci_NewVectorIterator__advance__V(this);
    }
    var a = ((total$1 - copied) | 0);
    var b = ((this.ap.a.length - this.a3) | 0);
    var count = ((a < b) ? a : b);
    if (isBoxed) {
      var src = this.ap;
      var srcPos = this.a3;
      var destPos = ((start + copied) | 0);
      src.j(srcPos, xs, destPos, count);
    } else {
      $m_s_Array$().gm(this.ap, this.a3, xs, ((start + copied) | 0), count);
    }
    this.a3 = ((this.a3 + count) | 0);
    copied = ((copied + count) | 0);
  }
  return total$1;
});
var $d_sci_NewVectorIterator = new $TypeData().i($c_sci_NewVectorIterator, "scala.collection.immutable.NewVectorIterator", ({
  cL: 1,
  n: 1,
  b: 1,
  c: 1,
  o: 1,
  R: 1
}));
function $ct_Ljava_io_PrintStream__Ljava_io_OutputStream__Z__Ljava_nio_charset_Charset__($thiz, _out, autoFlush, charset) {
  $ct_Ljava_io_FilterOutputStream__Ljava_io_OutputStream__($thiz, _out);
  return $thiz;
}
/** @constructor */
function $c_Ljava_io_PrintStream() {
}
$p = $c_Ljava_io_PrintStream.prototype = new $h_Ljava_io_FilterOutputStream();
$p.constructor = $c_Ljava_io_PrintStream;
/** @constructor */
function $h_Ljava_io_PrintStream() {
}
$h_Ljava_io_PrintStream.prototype = $p;
$p.cs = (function(s) {
  this.ha(s);
  this.fI("\n");
});
function $f_sc_View__toString__T($thiz) {
  return ($thiz.cj() + "(<not computed>)");
}
class $c_s_concurrent_Future$$anon$1 extends $c_ju_NoSuchElementException {
  constructor(t$2) {
    super();
    $ct_jl_Throwable__T__jl_Throwable__Z__Z__(this, ("Future.collect partial function is not defined at: " + t$2), null, true, true);
  }
  cP() {
    return $f_s_util_control_NoStackTrace__fillInStackTrace__jl_Throwable(this);
  }
}
var $d_s_concurrent_Future$$anon$1 = new $TypeData().i($c_s_concurrent_Future$$anon$1, "scala.concurrent.Future$$anon$1", ({
  dn: 1,
  a1: 1,
  q: 1,
  l: 1,
  f: 1,
  a: 1,
  a4: 1
}));
class $c_s_concurrent_Future$$anon$2 extends $c_ju_NoSuchElementException {
  constructor() {
    super();
    $ct_jl_Throwable__T__jl_Throwable__Z__Z__(this, "Future.filter predicate is not satisfied", null, true, true);
  }
  cP() {
    return $f_s_util_control_NoStackTrace__fillInStackTrace__jl_Throwable(this);
  }
}
var $d_s_concurrent_Future$$anon$2 = new $TypeData().i($c_s_concurrent_Future$$anon$2, "scala.concurrent.Future$$anon$2", ({
  dp: 1,
  a1: 1,
  q: 1,
  l: 1,
  f: 1,
  a: 1,
  a4: 1
}));
class $c_s_concurrent_Future$$anon$3 extends $c_ju_NoSuchElementException {
  constructor() {
    super();
    $ct_jl_Throwable__T__jl_Throwable__Z__Z__(this, "Future.failed not completed with a throwable.", null, true, true);
  }
  cP() {
    return $f_s_util_control_NoStackTrace__fillInStackTrace__jl_Throwable(this);
  }
}
var $d_s_concurrent_Future$$anon$3 = new $TypeData().i($c_s_concurrent_Future$$anon$3, "scala.concurrent.Future$$anon$3", ({
  dq: 1,
  a1: 1,
  q: 1,
  l: 1,
  f: 1,
  a: 1,
  a4: 1
}));
function $ct_s_concurrent_impl_Promise$DefaultPromise__O__($thiz, initial) {
  $ct_ju_concurrent_atomic_AtomicReference__O__($thiz, initial);
  return $thiz;
}
function $ct_s_concurrent_impl_Promise$DefaultPromise__s_util_Try__($thiz, result) {
  $ct_s_concurrent_impl_Promise$DefaultPromise__O__($thiz, $m_s_concurrent_impl_Promise$().dt(result));
  return $thiz;
}
function $ct_s_concurrent_impl_Promise$DefaultPromise__($thiz) {
  $ct_s_concurrent_impl_Promise$DefaultPromise__O__($thiz, $m_s_concurrent_impl_Promise$().de);
  return $thiz;
}
function $p_s_concurrent_impl_Promise$DefaultPromise__value0__s_util_Try($thiz) {
  var \u03b4this$tailLocal2 = $thiz;
  while (true) {
    var state = \u03b4this$tailLocal2.y;
    if ((state instanceof $c_s_util_Try)) {
      return state;
    } else if ((state instanceof $c_s_concurrent_impl_Promise$Link)) {
      \u03b4this$tailLocal2 = state.cS(\u03b4this$tailLocal2);
    } else {
      return null;
    }
  }
}
function $p_s_concurrent_impl_Promise$DefaultPromise__dispatchOrAddCallbacks__O__s_concurrent_impl_Promise$Callbacks__s_concurrent_impl_Promise$Callbacks($thiz, state, callbacks) {
  var \u03b4this$tailLocal4 = $thiz;
  var state$tailLocal2 = state;
  while (true) {
    if ((state$tailLocal2 instanceof $c_s_util_Try)) {
      $p_s_concurrent_impl_Promise$DefaultPromise__submitWithValue__s_concurrent_impl_Promise$Callbacks__s_util_Try__V(\u03b4this$tailLocal4, callbacks, state$tailLocal2);
      return callbacks;
    } else if ($is_s_concurrent_impl_Promise$Callbacks(state$tailLocal2)) {
      if (\u03b4this$tailLocal4.dk(state$tailLocal2, ((state$tailLocal2 !== $m_s_concurrent_impl_Promise$().de) ? $p_s_concurrent_impl_Promise$DefaultPromise__concatCallbacks__s_concurrent_impl_Promise$Callbacks__s_concurrent_impl_Promise$Callbacks__s_concurrent_impl_Promise$Callbacks(\u03b4this$tailLocal4, callbacks, state$tailLocal2) : callbacks))) {
        return callbacks;
      } else {
        state$tailLocal2 = \u03b4this$tailLocal4.y;
      }
    } else {
      var p = state$tailLocal2.cS(\u03b4this$tailLocal4);
      var state$tailLocal2$tmp1 = p.y;
      \u03b4this$tailLocal4 = p;
      state$tailLocal2 = state$tailLocal2$tmp1;
    }
  }
}
function $p_s_concurrent_impl_Promise$DefaultPromise__concatCallbacks__s_concurrent_impl_Promise$Callbacks__s_concurrent_impl_Promise$Callbacks__s_concurrent_impl_Promise$Callbacks($thiz, left, right) {
  var right$tailLocal1 = right;
  var left$tailLocal1 = left;
  while (true) {
    if ((left$tailLocal1 instanceof $c_s_concurrent_impl_Promise$Transformation)) {
      return new $c_s_concurrent_impl_Promise$ManyCallbacks(left$tailLocal1, right$tailLocal1);
    } else {
      var m = left$tailLocal1;
      var left$tailLocal1$tmp1 = m.ej;
      var right$tailLocal1$tmp1 = new $c_s_concurrent_impl_Promise$ManyCallbacks(m.ei, right$tailLocal1);
      left$tailLocal1 = left$tailLocal1$tmp1;
      right$tailLocal1 = right$tailLocal1$tmp1;
    }
  }
}
function $p_s_concurrent_impl_Promise$DefaultPromise__submitWithValue__s_concurrent_impl_Promise$Callbacks__s_util_Try__V($thiz, callbacks, resolved) {
  var callbacks$tailLocal1 = callbacks;
  while (true) {
    if ((callbacks$tailLocal1 instanceof $c_s_concurrent_impl_Promise$ManyCallbacks)) {
      var m = callbacks$tailLocal1;
      m.ei.fS(resolved);
      callbacks$tailLocal1 = m.ej;
    } else {
      callbacks$tailLocal1.fS(resolved);
      return (void 0);
    }
  }
}
/** @constructor */
function $c_s_concurrent_impl_Promise$DefaultPromise() {
  this.y = null;
}
$p = $c_s_concurrent_impl_Promise$DefaultPromise.prototype = new $h_ju_concurrent_atomic_AtomicReference();
$p.constructor = $c_s_concurrent_impl_Promise$DefaultPromise;
/** @constructor */
function $h_s_concurrent_impl_Promise$DefaultPromise() {
}
$h_s_concurrent_impl_Promise$DefaultPromise.prototype = $p;
$p.hk = (function(f, executor) {
  return $p_s_concurrent_impl_Promise$DefaultPromise__dispatchOrAddCallbacks__O__s_concurrent_impl_Promise$Callbacks__s_concurrent_impl_Promise$Callbacks(this, this.y, $ct_s_concurrent_impl_Promise$Transformation__I__F1__s_concurrent_ExecutionContext__(new $c_s_concurrent_impl_Promise$Transformation(), 3, f, executor));
});
$p.fB = (function(f, executor) {
  var state = this.y;
  if ((!(state instanceof $c_s_util_Failure))) {
    $p_s_concurrent_impl_Promise$DefaultPromise__dispatchOrAddCallbacks__O__s_concurrent_impl_Promise$Callbacks__s_concurrent_impl_Promise$Callbacks(this, state, $ct_s_concurrent_impl_Promise$Transformation__I__F1__s_concurrent_ExecutionContext__(new $c_s_concurrent_impl_Promise$Transformation(), 5, f, executor));
  }
});
$p.gE = (function(f, executor) {
  var state = this.y;
  return ((!(state instanceof $c_s_util_Failure)) ? $p_s_concurrent_impl_Promise$DefaultPromise__dispatchOrAddCallbacks__O__s_concurrent_impl_Promise$Callbacks__s_concurrent_impl_Promise$Callbacks(this, state, $ct_s_concurrent_impl_Promise$Transformation__I__F1__s_concurrent_ExecutionContext__(new $c_s_concurrent_impl_Promise$Transformation(), 2, f, executor)) : this);
});
$p.h1 = (function(f, executor) {
  var state = this.y;
  return ((!(state instanceof $c_s_util_Failure)) ? $p_s_concurrent_impl_Promise$DefaultPromise__dispatchOrAddCallbacks__O__s_concurrent_impl_Promise$Callbacks__s_concurrent_impl_Promise$Callbacks(this, state, $ct_s_concurrent_impl_Promise$Transformation__I__F1__s_concurrent_ExecutionContext__(new $c_s_concurrent_impl_Promise$Transformation(), 1, f, executor)) : this);
});
$p.h7 = (function(func, executor) {
  $p_s_concurrent_impl_Promise$DefaultPromise__dispatchOrAddCallbacks__O__s_concurrent_impl_Promise$Callbacks__s_concurrent_impl_Promise$Callbacks(this, this.y, $ct_s_concurrent_impl_Promise$Transformation__I__F1__s_concurrent_ExecutionContext__(new $c_s_concurrent_impl_Promise$Transformation(), 6, func, executor));
});
$p.gD = (function() {
  return ((!(this.y instanceof $c_s_util_Success)) ? this.hk($m_s_concurrent_Future$().fd, $m_s_concurrent_ExecutionContext$parasitic$()) : $m_s_concurrent_Future$().ff);
});
$p.A = (function() {
  var \u03b4this$tailLocal1 = this;
  while (true) {
    var state = \u03b4this$tailLocal1.y;
    if ((state instanceof $c_s_util_Try)) {
      return (("Future(" + state) + ")");
    } else if ((state instanceof $c_s_concurrent_impl_Promise$Link)) {
      \u03b4this$tailLocal1 = state.cS(\u03b4this$tailLocal1);
    } else {
      return "Future(<not completed>)";
    }
  }
});
$p.hl = (function(value) {
  var state = this.y;
  return ((!(state instanceof $c_s_util_Try)) && this.cw(state, $m_s_concurrent_impl_Promise$().dt(value)));
});
$p.cw = (function(state, resolved) {
  var \u03b4this$tailLocal3 = this;
  var state$tailLocal1 = state;
  while (true) {
    if ($is_s_concurrent_impl_Promise$Callbacks(state$tailLocal1)) {
      if (\u03b4this$tailLocal3.dk(state$tailLocal1, resolved)) {
        if ((state$tailLocal1 !== $m_s_concurrent_impl_Promise$().de)) {
          $p_s_concurrent_impl_Promise$DefaultPromise__submitWithValue__s_concurrent_impl_Promise$Callbacks__s_util_Try__V(\u03b4this$tailLocal3, state$tailLocal1, resolved);
        }
        return true;
      } else {
        state$tailLocal1 = \u03b4this$tailLocal3.y;
      }
    } else if ((state$tailLocal1 instanceof $c_s_concurrent_impl_Promise$Link)) {
      var p = state$tailLocal1.cS(\u03b4this$tailLocal3);
      if ((p !== \u03b4this$tailLocal3)) {
        var state$tailLocal1$tmp1 = p.y;
        \u03b4this$tailLocal3 = p;
        state$tailLocal1 = state$tailLocal1$tmp1;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
});
$p.ep = (function(other) {
  if ((other !== this)) {
    var state = this.y;
    if ((!(state instanceof $c_s_util_Try))) {
      if ((other instanceof $c_s_concurrent_impl_Promise$DefaultPromise)) {
        var resolved = $p_s_concurrent_impl_Promise$DefaultPromise__value0__s_util_Try(other);
      } else {
        var this$1 = $m_s_Option$().fw($p_s_concurrent_impl_Promise$DefaultPromise__value0__s_util_Try(other));
        var resolved = (this$1.n() ? null : this$1.aU());
      }
      if ((resolved !== null)) {
        this.cw(state, resolved);
      } else {
        other.h7(this, $m_s_concurrent_ExecutionContext$parasitic$());
      }
    }
  }
  return this;
});
$p.ez = (function(target, link) {
  var \u03b4this$tailLocal5 = this;
  var link$tailLocal1 = link;
  var target$tailLocal2 = target;
  while (true) {
    if ((\u03b4this$tailLocal5 !== target$tailLocal2)) {
      var state = \u03b4this$tailLocal5.y;
      if ((state instanceof $c_s_util_Try)) {
        if ((!target$tailLocal2.cw(target$tailLocal2.y, state))) {
          throw new $c_jl_IllegalStateException("Cannot link completed promises together");
        } else {
          return (void 0);
        }
      } else if ($is_s_concurrent_impl_Promise$Callbacks(state)) {
        var l = ((link$tailLocal1 !== null) ? link$tailLocal1 : new $c_s_concurrent_impl_Promise$Link(target$tailLocal2));
        var p = l.cS(\u03b4this$tailLocal5);
        if (((\u03b4this$tailLocal5 !== p) && \u03b4this$tailLocal5.dk(state, l))) {
          if ((state !== $m_s_concurrent_impl_Promise$().de)) {
            $p_s_concurrent_impl_Promise$DefaultPromise__dispatchOrAddCallbacks__O__s_concurrent_impl_Promise$Callbacks__s_concurrent_impl_Promise$Callbacks(p, p.y, state);
            return (void 0);
          } else {
            return (void 0);
          }
        } else {
          target$tailLocal2 = p;
          link$tailLocal1 = l;
        }
      } else {
        \u03b4this$tailLocal5 = state.cS(\u03b4this$tailLocal5);
      }
    } else {
      return (void 0);
    }
  }
});
$p.ho = (function(resolved) {
  var \u03b4this$tailLocal6 = this;
  while (true) {
    var state = \u03b4this$tailLocal6.y;
    if ((state instanceof $c_s_concurrent_impl_Promise$Link)) {
      var next = (\u03b4this$tailLocal6.dk(state, resolved) ? state.y : \u03b4this$tailLocal6);
      \u03b4this$tailLocal6 = next;
    } else {
      \u03b4this$tailLocal6.cw(state, resolved);
      return (void 0);
    }
  }
});
$p.l = (function(v1) {
  this.cw(this.y, v1);
});
function $isArrayOf_s_concurrent_impl_Promise$DefaultPromise(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.aj)));
}
var $d_s_concurrent_impl_Promise$DefaultPromise = new $TypeData().i($c_s_concurrent_impl_Promise$DefaultPromise, "scala.concurrent.impl.Promise$DefaultPromise", ({
  aj: 1,
  a8: 1,
  a: 1,
  b2: 1,
  aZ: 1,
  b1: 1,
  e: 1
}));
/** @constructor */
function $c_s_reflect_AnyValManifest() {
  this.dI = null;
}
$p = $c_s_reflect_AnyValManifest.prototype = new $h_O();
$p.constructor = $c_s_reflect_AnyValManifest;
/** @constructor */
function $h_s_reflect_AnyValManifest() {
}
$h_s_reflect_AnyValManifest.prototype = $p;
$p.A = (function() {
  return this.dI;
});
$p.H = (function(that) {
  return (this === that);
});
$p.I = (function() {
  return $systemIdentityHashCode(this);
});
class $c_sjs_js_JavaScriptException extends $c_jl_RuntimeException {
  constructor(exception) {
    super();
    this.bp = null;
    this.bp = exception;
    $ct_jl_Throwable__T__jl_Throwable__Z__Z__(this, null, null, true, true);
  }
  dp() {
    return $dp_toString__T(this.bp);
  }
  bg() {
    return "JavaScriptException";
  }
  be() {
    return 1;
  }
  bf(x$1) {
    return ((x$1 === 0) ? this.bp : $m_sr_Statics$().gW(x$1));
  }
  c9() {
    return new $c_sr_ScalaRunTime$$anon$1(this);
  }
  I() {
    return $m_s_util_hashing_MurmurHash3$().ct(this, 1744042595, true);
  }
  H(x$1) {
    return ((this === x$1) || ((x$1 instanceof $c_sjs_js_JavaScriptException) && $m_sr_BoxesRunTime$().i(this.bp, x$1.bp)));
  }
}
function $isArrayOf_sjs_js_JavaScriptException(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.b6)));
}
var $d_sjs_js_JavaScriptException = new $TypeData().i($c_sjs_js_JavaScriptException, "scala.scalajs.js.JavaScriptException", ({
  b6: 1,
  q: 1,
  l: 1,
  f: 1,
  a: 1,
  z: 1,
  d: 1
}));
function $p_jl_JSConsoleBasedPrintStream__doWriteLine__T__V($thiz, line) {
  if (((typeof console) !== "undefined")) {
    if (($thiz.eG && (!(!(!(!console.error)))))) {
      console.error(line);
    } else {
      console.log(line);
    }
  }
}
/** @constructor */
function $c_jl_JSConsoleBasedPrintStream(isErr) {
  this.eG = false;
  this.cX = null;
  this.eG = isErr;
  $ct_Ljava_io_PrintStream__Ljava_io_OutputStream__Z__Ljava_nio_charset_Charset__(this, new $c_jl_JSConsoleBasedPrintStream$DummyOutputStream(), false, null);
  this.cX = "";
}
$p = $c_jl_JSConsoleBasedPrintStream.prototype = new $h_Ljava_io_PrintStream();
$p.constructor = $c_jl_JSConsoleBasedPrintStream;
/** @constructor */
function $h_jl_JSConsoleBasedPrintStream() {
}
$h_jl_JSConsoleBasedPrintStream.prototype = $p;
$p.ha = (function(s) {
  this.fI(((s === null) ? "null" : s));
});
$p.fI = (function(s) {
  var rest = s;
  while ((rest !== "")) {
    var this$1 = rest;
    var nlPos = (this$1.indexOf("\n") | 0);
    if ((nlPos < 0)) {
      this.cX = (("" + this.cX) + rest);
      rest = "";
    } else {
      var $x_1 = this.cX;
      var this$2 = rest;
      $p_jl_JSConsoleBasedPrintStream__doWriteLine__T__V(this, (("" + $x_1) + this$2.substring(0, nlPos)));
      this.cX = "";
      var this$3 = rest;
      var beginIndex = ((1 + nlPos) | 0);
      rest = this$3.substring(beginIndex);
    }
  }
});
var $d_jl_JSConsoleBasedPrintStream = new $TypeData().i($c_jl_JSConsoleBasedPrintStream, "java.lang.JSConsoleBasedPrintStream", ({
  bq: 1,
  bd: 1,
  bc: 1,
  ao: 1,
  am: 1,
  aq: 1,
  an: 1,
  ap: 1
}));
function $p_sc_StrictOptimizedLinearSeqOps__loop$2__I__sc_LinearSeq__sc_LinearSeq($thiz, n, s) {
  var s$tailLocal1 = s;
  var n$tailLocal1 = n;
  while (true) {
    if (((n$tailLocal1 <= 0) || s$tailLocal1.n())) {
      return s$tailLocal1;
    } else {
      var n$tailLocal1$tmp1 = (((-1) + n$tailLocal1) | 0);
      var s$tailLocal1$tmp1 = s$tailLocal1.P();
      n$tailLocal1 = n$tailLocal1$tmp1;
      s$tailLocal1 = s$tailLocal1$tmp1;
    }
  }
}
/** @constructor */
function $c_s_reflect_ManifestFactory$IntManifest() {
  this.dI = null;
}
$p = $c_s_reflect_ManifestFactory$IntManifest.prototype = new $h_s_reflect_AnyValManifest();
$p.constructor = $c_s_reflect_ManifestFactory$IntManifest;
/** @constructor */
function $h_s_reflect_ManifestFactory$IntManifest() {
}
$h_s_reflect_ManifestFactory$IntManifest.prototype = $p;
$p.hi = (function() {
  return $d_I.l();
});
/** @constructor */
function $c_sc_AbstractView() {
}
$p = $c_sc_AbstractView.prototype = new $h_sc_AbstractIterable();
$p.constructor = $c_sc_AbstractView;
/** @constructor */
function $h_sc_AbstractView() {
}
$h_sc_AbstractView.prototype = $p;
$p.A = (function() {
  return $f_sc_View__toString__T(this);
});
/** @constructor */
function $c_s_reflect_ManifestFactory$IntManifest$() {
  this.dI = null;
  this.dI = "Int";
}
$p = $c_s_reflect_ManifestFactory$IntManifest$.prototype = new $h_s_reflect_ManifestFactory$IntManifest();
$p.constructor = $c_s_reflect_ManifestFactory$IntManifest$;
/** @constructor */
function $h_s_reflect_ManifestFactory$IntManifest$() {
}
$h_s_reflect_ManifestFactory$IntManifest$.prototype = $p;
var $d_s_reflect_ManifestFactory$IntManifest$ = new $TypeData().i($c_s_reflect_ManifestFactory$IntManifest$, "scala.reflect.ManifestFactory$IntManifest$", ({
  dA: 1,
  dz: 1,
  dv: 1,
  a: 1,
  dB: 1,
  dw: 1,
  d: 1,
  dx: 1,
  dy: 1
}));
var $n_s_reflect_ManifestFactory$IntManifest$;
function $m_s_reflect_ManifestFactory$IntManifest$() {
  if ((!$n_s_reflect_ManifestFactory$IntManifest$)) {
    $n_s_reflect_ManifestFactory$IntManifest$ = new $c_s_reflect_ManifestFactory$IntManifest$();
  }
  return $n_s_reflect_ManifestFactory$IntManifest$;
}
function $f_sc_Seq__equals__O__Z($thiz, o) {
  if (($thiz === o)) {
    return true;
  } else {
    if ($is_sc_Seq(o)) {
      if (o.eo($thiz)) {
        return $thiz.dW(o);
      }
    }
    return false;
  }
}
function $is_sc_Seq(obj) {
  return (!(!((obj && obj.$classData) && obj.$classData.n.r)));
}
function $isArrayOf_sc_Seq(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.r)));
}
function $f_sc_Map__equals__O__Z($thiz, o) {
  if (($thiz === o)) {
    return true;
  } else if ($is_sc_Map(o)) {
    if (($thiz.az() === o.az())) {
      try {
        return $thiz.dm(new $c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28(((map$1) => ((kv$2) => $m_sr_BoxesRunTime$().i(map$1.co(kv$2.aw, new $c_sr_AbstractFunction0_$$Lambda$a02b774b97db8234e08c6a02dd06557c99779855((() => $m_sc_Map$().eW.aT()))), kv$2.ai)))(o)));
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
function $is_sc_Map(obj) {
  return (!(!((obj && obj.$classData) && obj.$classData.n.K)));
}
function $isArrayOf_sc_Map(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.K)));
}
function $ct_s_concurrent_impl_Promise$Transformation__F1__s_concurrent_ExecutionContext__s_util_Try__I__($thiz, _fun, _ec, _arg, _xform) {
  $thiz.dH = _fun;
  $thiz.dg = _ec;
  $thiz.df = _arg;
  $thiz.dh = _xform;
  $ct_s_concurrent_impl_Promise$DefaultPromise__($thiz);
  return $thiz;
}
function $ct_s_concurrent_impl_Promise$Transformation__I__F1__s_concurrent_ExecutionContext__($thiz, xform, f, ec) {
  $ct_s_concurrent_impl_Promise$Transformation__F1__s_concurrent_ExecutionContext__s_util_Try__I__($thiz, f, ec, null, xform);
  return $thiz;
}
function $p_s_concurrent_impl_Promise$Transformation__handleFailure__jl_Throwable__s_concurrent_ExecutionContext__V($thiz, t, e) {
  var wasInterrupted = false;
  if ((wasInterrupted || $m_s_util_control_NonFatal$().dQ(t))) {
    var completed = $thiz.cw($thiz.y, $m_s_concurrent_impl_Promise$().dt(new $c_s_util_Failure(t)));
    if (((($thiz.dh === 5) || ($thiz.dh === 6)) || (!completed))) {
      e.eE(t);
    }
  } else {
    var $x_1 = t;
    throw (($x_1 instanceof $c_sjs_js_JavaScriptException) ? $x_1.bp : $x_1);
  }
}
/** @constructor */
function $c_s_concurrent_impl_Promise$Transformation() {
  this.y = null;
  this.dH = null;
  this.dg = null;
  this.df = null;
  this.dh = 0;
}
$p = $c_s_concurrent_impl_Promise$Transformation.prototype = new $h_s_concurrent_impl_Promise$DefaultPromise();
$p.constructor = $c_s_concurrent_impl_Promise$Transformation;
/** @constructor */
function $h_s_concurrent_impl_Promise$Transformation() {
}
$h_s_concurrent_impl_Promise$Transformation.prototype = $p;
$p.fS = (function(resolved) {
  this.df = resolved;
  var e = this.dg;
  try {
    if ((e === null)) {
      $m_sr_Scala3RunTime$().b4();
    }
    e.es(this);
  } catch (e$2) {
    var e$3 = ((e$2 instanceof $c_jl_Throwable) ? e$2 : new $c_sjs_js_JavaScriptException(e$2));
    this.dH = null;
    this.df = null;
    this.dg = null;
    if ((e === null)) {
      $m_sr_Scala3RunTime$().b4();
    }
    $p_s_concurrent_impl_Promise$Transformation__handleFailure__jl_Throwable__s_concurrent_ExecutionContext__V(this, e$3, e);
  }
  return this;
});
$p.cu = (function() {
  var x$proxy4 = this.df;
  if ((x$proxy4 === null)) {
    $m_sr_Scala3RunTime$().b4();
  }
  var x$proxy5 = this.dH;
  if ((x$proxy5 === null)) {
    $m_sr_Scala3RunTime$().b4();
  }
  var x$proxy6 = this.dg;
  if ((x$proxy6 === null)) {
    $m_sr_Scala3RunTime$().b4();
  }
  this.dH = null;
  this.df = null;
  this.dg = null;
  try {
    var resolvedResult;
    switch (this.dh) {
      case 0: {
        var resolvedResult = null;
        break;
      }
      case 1: {
        var resolvedResult = ((x$proxy4 instanceof $c_s_util_Success) ? new $c_s_util_Success(x$proxy5.l(x$proxy4.aU())) : x$proxy4);
        break;
      }
      case 2: {
        if ((x$proxy4 instanceof $c_s_util_Success)) {
          var f = x$proxy5.l(x$proxy4.aU());
          if ((f instanceof $c_s_concurrent_impl_Promise$DefaultPromise)) {
            f.ez(this, null);
          } else {
            this.ep(f);
          }
          var resolvedResult = null;
        } else {
          var resolvedResult = x$proxy4;
        }
        break;
      }
      case 3: {
        var resolvedResult = $m_s_concurrent_impl_Promise$().dt(x$proxy5.l(x$proxy4));
        break;
      }
      case 4: {
        var f$2 = x$proxy5.l(x$proxy4);
        if ((f$2 instanceof $c_s_concurrent_impl_Promise$DefaultPromise)) {
          f$2.ez(this, null);
        } else {
          this.ep(f$2);
        }
        var resolvedResult = null;
        break;
      }
      case 5: {
        x$proxy4.dR(x$proxy5);
        var resolvedResult = null;
        break;
      }
      case 6: {
        x$proxy5.l(x$proxy4);
        var resolvedResult = null;
        break;
      }
      case 7: {
        var resolvedResult = ((x$proxy4 instanceof $c_s_util_Failure) ? $m_s_concurrent_impl_Promise$().dt(x$proxy4.fM(x$proxy5)) : x$proxy4);
        break;
      }
      case 8: {
        if ((x$proxy4 instanceof $c_s_util_Failure)) {
          var f$3 = x$proxy5.dj(x$proxy4.bK, $m_s_concurrent_Future$().fh);
          var resolvedResult = ((f$3 !== $m_s_concurrent_Future$().eh) ? (((f$3 instanceof $c_s_concurrent_impl_Promise$DefaultPromise) ? f$3.ez(this, null) : this.ep(f$3)), null) : x$proxy4);
        } else {
          var resolvedResult = x$proxy4;
        }
        break;
      }
      case 9: {
        var resolvedResult = (((x$proxy4 instanceof $c_s_util_Failure) || (!(!x$proxy5.l(x$proxy4.aU())))) ? x$proxy4 : $m_s_concurrent_Future$().fg);
        break;
      }
      case 10: {
        var resolvedResult = ((x$proxy4 instanceof $c_s_util_Success) ? new $c_s_util_Success(x$proxy5.dj(x$proxy4.aU(), $m_s_concurrent_Future$().fe)) : x$proxy4);
        break;
      }
      default: {
        var resolvedResult = new $c_s_util_Failure(new $c_jl_IllegalStateException(("BUG: encountered transformation promise with illegal type: " + this.dh)));
      }
    }
    if ((resolvedResult !== null)) {
      this.cw(this.y, resolvedResult);
    }
  } catch (e) {
    $p_s_concurrent_impl_Promise$Transformation__handleFailure__jl_Throwable__s_concurrent_ExecutionContext__V(this, ((e instanceof $c_jl_Throwable) ? e : new $c_sjs_js_JavaScriptException(e)), x$proxy6);
  }
});
function $isArrayOf_s_concurrent_impl_Promise$Transformation(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.b5)));
}
var $d_s_concurrent_impl_Promise$Transformation = new $TypeData().i($c_s_concurrent_impl_Promise$Transformation, "scala.concurrent.impl.Promise$Transformation", ({
  b5: 1,
  aj: 1,
  a8: 1,
  a: 1,
  b2: 1,
  aZ: 1,
  b1: 1,
  e: 1,
  a3: 1,
  a6: 1,
  dg: 1
}));
/** @constructor */
function $c_sc_AbstractSeq() {
}
$p = $c_sc_AbstractSeq.prototype = new $h_sc_AbstractIterable();
$p.constructor = $c_sc_AbstractSeq;
/** @constructor */
function $h_sc_AbstractSeq() {
}
$h_sc_AbstractSeq.prototype = $p;
$p.dj = (function(x, default$1) {
  return $f_s_PartialFunction__applyOrElse__O__F1__O(this, x, default$1);
});
$p.fG = (function(idx) {
  return $f_sc_SeqOps__isDefinedAt__I__Z(this, idx);
});
$p.bN = (function(len) {
  return $f_sc_IterableOps__sizeCompare__I__I(this, len);
});
$p.n = (function() {
  return $f_sc_SeqOps__isEmpty__Z(this);
});
$p.dW = (function(that) {
  return $f_sc_SeqOps__sameElements__sc_IterableOnce__Z(this, that);
});
$p.eo = (function(that) {
  return true;
});
$p.H = (function(o) {
  return $f_sc_Seq__equals__O__Z(this, o);
});
$p.I = (function() {
  return $m_s_util_hashing_MurmurHash3$().fR(this);
});
$p.A = (function() {
  return $f_sc_Iterable__toString__T(this);
});
$p.dV = (function(x) {
  return this.fG((x | 0));
});
/** @constructor */
function $c_sc_AbstractSeqView() {
}
$p = $c_sc_AbstractSeqView.prototype = new $h_sc_AbstractView();
$p.constructor = $c_sc_AbstractSeqView;
/** @constructor */
function $h_sc_AbstractSeqView() {
}
$h_sc_AbstractSeqView.prototype = $p;
function $is_sc_IndexedSeq(obj) {
  return (!(!((obj && obj.$classData) && obj.$classData.n.u)));
}
function $isArrayOf_sc_IndexedSeq(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.u)));
}
function $is_sc_LinearSeq(obj) {
  return (!(!((obj && obj.$classData) && obj.$classData.n.a2)));
}
function $isArrayOf_sc_LinearSeq(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.a2)));
}
/** @constructor */
function $c_sc_AbstractMap() {
}
$p = $c_sc_AbstractMap.prototype = new $h_sc_AbstractIterable();
$p.constructor = $c_sc_AbstractMap;
/** @constructor */
function $h_sc_AbstractMap() {
}
$h_sc_AbstractMap.prototype = $p;
$p.dj = (function(x, default$1) {
  return $f_sc_MapOps__applyOrElse__O__F1__O(this, x, default$1);
});
$p.cn = (function(f) {
  $f_sc_MapOps__foreachEntry__F2__V(this, f);
});
$p.dV = (function(key) {
  return this.ck(key);
});
$p.dP = (function(sb, start, sep, end) {
  return $f_sc_MapOps__addString__scm_StringBuilder__T__T__T__scm_StringBuilder(this, sb, start, sep, end);
});
$p.H = (function(o) {
  return $f_sc_Map__equals__O__Z(this, o);
});
$p.I = (function() {
  return $m_s_util_hashing_MurmurHash3$().h2(this);
});
$p.cv = (function() {
  return "Map";
});
$p.A = (function() {
  return $f_sc_Iterable__toString__T(this);
});
function $ct_sc_SeqView$Id__sc_SeqOps__($thiz, underlying) {
  $thiz.d2 = underlying;
  return $thiz;
}
/** @constructor */
function $c_sc_SeqView$Id() {
  this.d2 = null;
}
$p = $c_sc_SeqView$Id.prototype = new $h_sc_AbstractSeqView();
$p.constructor = $c_sc_SeqView$Id;
/** @constructor */
function $h_sc_SeqView$Id() {
}
$h_sc_SeqView$Id.prototype = $p;
$p.C = (function(idx) {
  return this.d2.C(idx);
});
$p.w = (function() {
  return this.d2.w();
});
$p.n = (function() {
  return this.d2.n();
});
function $is_sci_Map(obj) {
  return (!(!((obj && obj.$classData) && obj.$classData.n.M)));
}
function $isArrayOf_sci_Map(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.M)));
}
/** @constructor */
function $c_sc_IndexedSeqView$Id(underlying) {
  this.d2 = null;
  $ct_sc_SeqView$Id__sc_SeqOps__(this, underlying);
}
$p = $c_sc_IndexedSeqView$Id.prototype = new $h_sc_SeqView$Id();
$p.constructor = $c_sc_IndexedSeqView$Id;
/** @constructor */
function $h_sc_IndexedSeqView$Id() {
}
$h_sc_IndexedSeqView$Id.prototype = $p;
$p.bN = (function(len) {
  var x = this.w();
  return ((x === len) ? 0 : ((x < len) ? (-1) : 1));
});
$p.D = (function() {
  return this.w();
});
$p.p = (function() {
  return new $c_sc_IndexedSeqView$IndexedSeqViewIterator(this);
});
$p.cv = (function() {
  return "IndexedSeqView";
});
var $d_sc_IndexedSeqView$Id = new $TypeData().i($c_sc_IndexedSeqView$Id, "scala.collection.IndexedSeqView$Id", ({
  c5: 1,
  cj: 1,
  c1: 1,
  c2: 1,
  k: 1,
  b: 1,
  c: 1,
  i: 1,
  h: 1,
  g: 1,
  a: 1,
  cn: 1,
  s: 1,
  ci: 1,
  w: 1,
  c4: 1
}));
/** @constructor */
function $c_sci_AbstractSeq() {
}
$p = $c_sci_AbstractSeq.prototype = new $h_sc_AbstractSeq();
$p.constructor = $c_sci_AbstractSeq;
/** @constructor */
function $h_sci_AbstractSeq() {
}
$h_sci_AbstractSeq.prototype = $p;
/** @constructor */
function $c_sci_AbstractMap() {
}
$p = $c_sci_AbstractMap.prototype = new $h_sc_AbstractMap();
$p.constructor = $c_sci_AbstractMap;
/** @constructor */
function $h_sci_AbstractMap() {
}
$h_sci_AbstractMap.prototype = $p;
$p.cp = (function() {
  return $m_sci_Iterable$();
});
function $f_sci_IndexedSeq__canEqual__O__Z($thiz, that) {
  return ((!$is_sci_IndexedSeq(that)) || ($thiz.w() === that.w()));
}
function $f_sci_IndexedSeq__sameElements__sc_IterableOnce__Z($thiz, o) {
  if ($is_sci_IndexedSeq(o)) {
    if (($thiz === o)) {
      return true;
    } else {
      var length = $thiz.w();
      var equal = (length === o.w());
      if (equal) {
        var index = 0;
        var a = $thiz.en();
        var b = o.en();
        var preferredLength = ((a < b) ? a : b);
        var hi = (length >> 31);
        var hi$1 = (preferredLength >> 31);
        var lo = (preferredLength << 1);
        var hi$2 = (((preferredLength >>> 31) | 0) | (hi$1 << 1));
        if (((hi === hi$2) ? ((length >>> 0) > (lo >>> 0)) : (hi > hi$2))) {
          var maxApplyCompare = preferredLength;
        } else {
          var maxApplyCompare = length;
        }
        while (((index < maxApplyCompare) && equal)) {
          equal = $m_sr_BoxesRunTime$().i($thiz.C(index), o.C(index));
          index = ((1 + index) | 0);
        }
        if (((index < length) && equal)) {
          var thisIt = $thiz.p().cm(index);
          var thatIt = o.p().cm(index);
          while ((equal && thisIt.k())) {
            equal = $m_sr_BoxesRunTime$().i(thisIt.h(), thatIt.h());
          }
        }
      }
      return equal;
    }
  } else {
    return $f_sc_SeqOps__sameElements__sc_IterableOnce__Z($thiz, o);
  }
}
function $is_sci_IndexedSeq(obj) {
  return (!(!((obj && obj.$classData) && obj.$classData.n.A)));
}
function $isArrayOf_sci_IndexedSeq(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.A)));
}
function $isArrayOf_sci_SeqMap$SeqMap1(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.cO)));
}
function $isArrayOf_sci_SeqMap$SeqMap2(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.cP)));
}
function $isArrayOf_sci_SeqMap$SeqMap3(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.cQ)));
}
function $isArrayOf_sci_SeqMap$SeqMap4(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.cR)));
}
/** @constructor */
function $c_scm_AbstractSeq() {
}
$p = $c_scm_AbstractSeq.prototype = new $h_sc_AbstractSeq();
$p.constructor = $c_scm_AbstractSeq;
/** @constructor */
function $h_scm_AbstractSeq() {
}
$h_scm_AbstractSeq.prototype = $p;
/** @constructor */
function $c_sci_Map$EmptyMap$() {
}
$p = $c_sci_Map$EmptyMap$.prototype = new $h_sci_AbstractMap();
$p.constructor = $c_sci_Map$EmptyMap$;
/** @constructor */
function $h_sci_Map$EmptyMap$() {
}
$h_sci_Map$EmptyMap$.prototype = $p;
$p.az = (function() {
  return 0;
});
$p.D = (function() {
  return 0;
});
$p.n = (function() {
  return true;
});
$p.gf = (function(key) {
  throw $ct_ju_NoSuchElementException__T__(new $c_ju_NoSuchElementException(), ("key not found: " + key));
});
$p.ck = (function(key) {
  return false;
});
$p.co = (function(key, default$1) {
  return default$1.aT();
});
$p.p = (function() {
  return $m_sc_Iterator$().a2;
});
$p.l = (function(key) {
  this.gf(key);
});
$p.cy = (function(key, value) {
  return new $c_sci_Map$Map1(key, value);
});
var $d_sci_Map$EmptyMap$ = new $TypeData().i($c_sci_Map$EmptyMap$, "scala.collection.immutable.Map$EmptyMap$", ({
  cA: 1,
  W: 1,
  S: 1,
  k: 1,
  b: 1,
  c: 1,
  i: 1,
  h: 1,
  g: 1,
  e: 1,
  j: 1,
  U: 1,
  T: 1,
  d: 1,
  K: 1,
  m: 1,
  X: 1,
  M: 1,
  a: 1
}));
var $n_sci_Map$EmptyMap$;
function $m_sci_Map$EmptyMap$() {
  if ((!$n_sci_Map$EmptyMap$)) {
    $n_sci_Map$EmptyMap$ = new $c_sci_Map$EmptyMap$();
  }
  return $n_sci_Map$EmptyMap$;
}
/** @constructor */
function $c_sci_Map$Map1(key1, value1) {
  this.bu = null;
  this.cd = null;
  this.bu = key1;
  this.cd = value1;
}
$p = $c_sci_Map$Map1.prototype = new $h_sci_AbstractMap();
$p.constructor = $c_sci_Map$Map1;
/** @constructor */
function $h_sci_Map$Map1() {
}
$h_sci_Map$Map1.prototype = $p;
$p.az = (function() {
  return 1;
});
$p.D = (function() {
  return 1;
});
$p.n = (function() {
  return false;
});
$p.l = (function(key) {
  if ($m_sr_BoxesRunTime$().i(key, this.bu)) {
    return this.cd;
  } else {
    throw $ct_ju_NoSuchElementException__T__(new $c_ju_NoSuchElementException(), ("key not found: " + key));
  }
});
$p.ck = (function(key) {
  return $m_sr_BoxesRunTime$().i(key, this.bu);
});
$p.co = (function(key, default$1) {
  return ($m_sr_BoxesRunTime$().i(key, this.bu) ? this.cd : default$1.aT());
});
$p.p = (function() {
  return new $c_sc_Iterator$$anon$20(new $c_T2(this.bu, this.cd));
});
$p.cx = (function(key, value) {
  return ($m_sr_BoxesRunTime$().i(key, this.bu) ? new $c_sci_Map$Map1(this.bu, value) : new $c_sci_Map$Map2(this.bu, this.cd, key, value));
});
$p.dm = (function(p) {
  return (!(!p.l(new $c_T2(this.bu, this.cd))));
});
$p.I = (function() {
  var a = 0;
  var b = 0;
  var c = 1;
  var h = $m_s_util_hashing_MurmurHash3$().bs(this.bu, this.cd);
  a = ((a + h) | 0);
  b = (b ^ h);
  c = Math.imul(c, (1 | h));
  h = $m_s_util_hashing_MurmurHash3$().c3;
  h = $m_s_util_hashing_MurmurHash3$().x(h, a);
  h = $m_s_util_hashing_MurmurHash3$().x(h, b);
  h = $m_s_util_hashing_MurmurHash3$().cr(h, c);
  return $m_s_util_hashing_MurmurHash3$().aH(h, 1);
});
$p.cy = (function(key, value) {
  return this.cx(key, value);
});
function $isArrayOf_sci_Map$Map1(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.aO)));
}
var $d_sci_Map$Map1 = new $TypeData().i($c_sci_Map$Map1, "scala.collection.immutable.Map$Map1", ({
  aO: 1,
  W: 1,
  S: 1,
  k: 1,
  b: 1,
  c: 1,
  i: 1,
  h: 1,
  g: 1,
  e: 1,
  j: 1,
  U: 1,
  T: 1,
  d: 1,
  K: 1,
  m: 1,
  X: 1,
  M: 1,
  p: 1,
  a: 1
}));
/** @constructor */
function $c_sci_Map$Map2(key1, value1, key2, value2) {
  this.bi = null;
  this.bT = null;
  this.bj = null;
  this.bU = null;
  this.bi = key1;
  this.bT = value1;
  this.bj = key2;
  this.bU = value2;
}
$p = $c_sci_Map$Map2.prototype = new $h_sci_AbstractMap();
$p.constructor = $c_sci_Map$Map2;
/** @constructor */
function $h_sci_Map$Map2() {
}
$h_sci_Map$Map2.prototype = $p;
$p.az = (function() {
  return 2;
});
$p.D = (function() {
  return 2;
});
$p.n = (function() {
  return false;
});
$p.l = (function(key) {
  if ($m_sr_BoxesRunTime$().i(key, this.bi)) {
    return this.bT;
  } else if ($m_sr_BoxesRunTime$().i(key, this.bj)) {
    return this.bU;
  } else {
    throw $ct_ju_NoSuchElementException__T__(new $c_ju_NoSuchElementException(), ("key not found: " + key));
  }
});
$p.ck = (function(key) {
  return ($m_sr_BoxesRunTime$().i(key, this.bi) || $m_sr_BoxesRunTime$().i(key, this.bj));
});
$p.co = (function(key, default$1) {
  return ($m_sr_BoxesRunTime$().i(key, this.bi) ? this.bT : ($m_sr_BoxesRunTime$().i(key, this.bj) ? this.bU : default$1.aT()));
});
$p.p = (function() {
  return new $c_sci_Map$Map2$$anon$1(this);
});
$p.cx = (function(key, value) {
  return ($m_sr_BoxesRunTime$().i(key, this.bi) ? new $c_sci_Map$Map2(this.bi, value, this.bj, this.bU) : ($m_sr_BoxesRunTime$().i(key, this.bj) ? new $c_sci_Map$Map2(this.bi, this.bT, this.bj, value) : new $c_sci_Map$Map3(this.bi, this.bT, this.bj, this.bU, key, value)));
});
$p.dm = (function(p) {
  return ((!(!p.l(new $c_T2(this.bi, this.bT)))) && (!(!p.l(new $c_T2(this.bj, this.bU)))));
});
$p.I = (function() {
  var a = 0;
  var b = 0;
  var c = 1;
  var h = $m_s_util_hashing_MurmurHash3$().bs(this.bi, this.bT);
  a = ((a + h) | 0);
  b = (b ^ h);
  c = Math.imul(c, (1 | h));
  h = $m_s_util_hashing_MurmurHash3$().bs(this.bj, this.bU);
  a = ((a + h) | 0);
  b = (b ^ h);
  c = Math.imul(c, (1 | h));
  h = $m_s_util_hashing_MurmurHash3$().c3;
  h = $m_s_util_hashing_MurmurHash3$().x(h, a);
  h = $m_s_util_hashing_MurmurHash3$().x(h, b);
  h = $m_s_util_hashing_MurmurHash3$().cr(h, c);
  return $m_s_util_hashing_MurmurHash3$().aH(h, 2);
});
$p.cy = (function(key, value) {
  return this.cx(key, value);
});
function $isArrayOf_sci_Map$Map2(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.aP)));
}
var $d_sci_Map$Map2 = new $TypeData().i($c_sci_Map$Map2, "scala.collection.immutable.Map$Map2", ({
  aP: 1,
  W: 1,
  S: 1,
  k: 1,
  b: 1,
  c: 1,
  i: 1,
  h: 1,
  g: 1,
  e: 1,
  j: 1,
  U: 1,
  T: 1,
  d: 1,
  K: 1,
  m: 1,
  X: 1,
  M: 1,
  p: 1,
  a: 1
}));
/** @constructor */
function $c_sci_Map$Map3(key1, value1, key2, value2, key3, value3) {
  this.b8 = null;
  this.bD = null;
  this.b9 = null;
  this.bE = null;
  this.ba = null;
  this.bF = null;
  this.b8 = key1;
  this.bD = value1;
  this.b9 = key2;
  this.bE = value2;
  this.ba = key3;
  this.bF = value3;
}
$p = $c_sci_Map$Map3.prototype = new $h_sci_AbstractMap();
$p.constructor = $c_sci_Map$Map3;
/** @constructor */
function $h_sci_Map$Map3() {
}
$h_sci_Map$Map3.prototype = $p;
$p.az = (function() {
  return 3;
});
$p.D = (function() {
  return 3;
});
$p.n = (function() {
  return false;
});
$p.l = (function(key) {
  if ($m_sr_BoxesRunTime$().i(key, this.b8)) {
    return this.bD;
  } else if ($m_sr_BoxesRunTime$().i(key, this.b9)) {
    return this.bE;
  } else if ($m_sr_BoxesRunTime$().i(key, this.ba)) {
    return this.bF;
  } else {
    throw $ct_ju_NoSuchElementException__T__(new $c_ju_NoSuchElementException(), ("key not found: " + key));
  }
});
$p.ck = (function(key) {
  return (($m_sr_BoxesRunTime$().i(key, this.b8) || $m_sr_BoxesRunTime$().i(key, this.b9)) || $m_sr_BoxesRunTime$().i(key, this.ba));
});
$p.co = (function(key, default$1) {
  return ($m_sr_BoxesRunTime$().i(key, this.b8) ? this.bD : ($m_sr_BoxesRunTime$().i(key, this.b9) ? this.bE : ($m_sr_BoxesRunTime$().i(key, this.ba) ? this.bF : default$1.aT())));
});
$p.p = (function() {
  return new $c_sci_Map$Map3$$anon$4(this);
});
$p.cx = (function(key, value) {
  return ($m_sr_BoxesRunTime$().i(key, this.b8) ? new $c_sci_Map$Map3(this.b8, value, this.b9, this.bE, this.ba, this.bF) : ($m_sr_BoxesRunTime$().i(key, this.b9) ? new $c_sci_Map$Map3(this.b8, this.bD, this.b9, value, this.ba, this.bF) : ($m_sr_BoxesRunTime$().i(key, this.ba) ? new $c_sci_Map$Map3(this.b8, this.bD, this.b9, this.bE, this.ba, value) : new $c_sci_Map$Map4(this.b8, this.bD, this.b9, this.bE, this.ba, this.bF, key, value))));
});
$p.dm = (function(p) {
  return (((!(!p.l(new $c_T2(this.b8, this.bD)))) && (!(!p.l(new $c_T2(this.b9, this.bE))))) && (!(!p.l(new $c_T2(this.ba, this.bF)))));
});
$p.I = (function() {
  var a = 0;
  var b = 0;
  var c = 1;
  var h = $m_s_util_hashing_MurmurHash3$().bs(this.b8, this.bD);
  a = ((a + h) | 0);
  b = (b ^ h);
  c = Math.imul(c, (1 | h));
  h = $m_s_util_hashing_MurmurHash3$().bs(this.b9, this.bE);
  a = ((a + h) | 0);
  b = (b ^ h);
  c = Math.imul(c, (1 | h));
  h = $m_s_util_hashing_MurmurHash3$().bs(this.ba, this.bF);
  a = ((a + h) | 0);
  b = (b ^ h);
  c = Math.imul(c, (1 | h));
  h = $m_s_util_hashing_MurmurHash3$().c3;
  h = $m_s_util_hashing_MurmurHash3$().x(h, a);
  h = $m_s_util_hashing_MurmurHash3$().x(h, b);
  h = $m_s_util_hashing_MurmurHash3$().cr(h, c);
  return $m_s_util_hashing_MurmurHash3$().aH(h, 3);
});
$p.cy = (function(key, value) {
  return this.cx(key, value);
});
function $isArrayOf_sci_Map$Map3(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.aQ)));
}
var $d_sci_Map$Map3 = new $TypeData().i($c_sci_Map$Map3, "scala.collection.immutable.Map$Map3", ({
  aQ: 1,
  W: 1,
  S: 1,
  k: 1,
  b: 1,
  c: 1,
  i: 1,
  h: 1,
  g: 1,
  e: 1,
  j: 1,
  U: 1,
  T: 1,
  d: 1,
  K: 1,
  m: 1,
  X: 1,
  M: 1,
  p: 1,
  a: 1
}));
/** @constructor */
function $c_sci_Map$Map4(key1, value1, key2, value2, key3, value3, key4, value4) {
  this.aM = null;
  this.bk = null;
  this.aN = null;
  this.bl = null;
  this.aO = null;
  this.bm = null;
  this.aP = null;
  this.bn = null;
  this.aM = key1;
  this.bk = value1;
  this.aN = key2;
  this.bl = value2;
  this.aO = key3;
  this.bm = value3;
  this.aP = key4;
  this.bn = value4;
}
$p = $c_sci_Map$Map4.prototype = new $h_sci_AbstractMap();
$p.constructor = $c_sci_Map$Map4;
/** @constructor */
function $h_sci_Map$Map4() {
}
$h_sci_Map$Map4.prototype = $p;
$p.az = (function() {
  return 4;
});
$p.D = (function() {
  return 4;
});
$p.n = (function() {
  return false;
});
$p.l = (function(key) {
  if ($m_sr_BoxesRunTime$().i(key, this.aM)) {
    return this.bk;
  } else if ($m_sr_BoxesRunTime$().i(key, this.aN)) {
    return this.bl;
  } else if ($m_sr_BoxesRunTime$().i(key, this.aO)) {
    return this.bm;
  } else if ($m_sr_BoxesRunTime$().i(key, this.aP)) {
    return this.bn;
  } else {
    throw $ct_ju_NoSuchElementException__T__(new $c_ju_NoSuchElementException(), ("key not found: " + key));
  }
});
$p.ck = (function(key) {
  return ((($m_sr_BoxesRunTime$().i(key, this.aM) || $m_sr_BoxesRunTime$().i(key, this.aN)) || $m_sr_BoxesRunTime$().i(key, this.aO)) || $m_sr_BoxesRunTime$().i(key, this.aP));
});
$p.co = (function(key, default$1) {
  return ($m_sr_BoxesRunTime$().i(key, this.aM) ? this.bk : ($m_sr_BoxesRunTime$().i(key, this.aN) ? this.bl : ($m_sr_BoxesRunTime$().i(key, this.aO) ? this.bm : ($m_sr_BoxesRunTime$().i(key, this.aP) ? this.bn : default$1.aT()))));
});
$p.p = (function() {
  return new $c_sci_Map$Map4$$anon$7(this);
});
$p.cx = (function(key, value) {
  return ($m_sr_BoxesRunTime$().i(key, this.aM) ? new $c_sci_Map$Map4(this.aM, value, this.aN, this.bl, this.aO, this.bm, this.aP, this.bn) : ($m_sr_BoxesRunTime$().i(key, this.aN) ? new $c_sci_Map$Map4(this.aM, this.bk, this.aN, value, this.aO, this.bm, this.aP, this.bn) : ($m_sr_BoxesRunTime$().i(key, this.aO) ? new $c_sci_Map$Map4(this.aM, this.bk, this.aN, this.bl, this.aO, value, this.aP, this.bn) : ($m_sr_BoxesRunTime$().i(key, this.aP) ? new $c_sci_Map$Map4(this.aM, this.bk, this.aN, this.bl, this.aO, this.bm, this.aP, value) : $m_sci_HashMap$().e9.cU(this.aM, this.bk).cU(this.aN, this.bl).cU(this.aO, this.bm).cU(this.aP, this.bn).cU(key, value)))));
});
$p.dm = (function(p) {
  return ((((!(!p.l(new $c_T2(this.aM, this.bk)))) && (!(!p.l(new $c_T2(this.aN, this.bl))))) && (!(!p.l(new $c_T2(this.aO, this.bm))))) && (!(!p.l(new $c_T2(this.aP, this.bn)))));
});
$p.gk = (function(builder) {
  return builder.ch(this.aM, this.bk).ch(this.aN, this.bl).ch(this.aO, this.bm).ch(this.aP, this.bn);
});
$p.I = (function() {
  var a = 0;
  var b = 0;
  var c = 1;
  var h = $m_s_util_hashing_MurmurHash3$().bs(this.aM, this.bk);
  a = ((a + h) | 0);
  b = (b ^ h);
  c = Math.imul(c, (1 | h));
  h = $m_s_util_hashing_MurmurHash3$().bs(this.aN, this.bl);
  a = ((a + h) | 0);
  b = (b ^ h);
  c = Math.imul(c, (1 | h));
  h = $m_s_util_hashing_MurmurHash3$().bs(this.aO, this.bm);
  a = ((a + h) | 0);
  b = (b ^ h);
  c = Math.imul(c, (1 | h));
  h = $m_s_util_hashing_MurmurHash3$().bs(this.aP, this.bn);
  a = ((a + h) | 0);
  b = (b ^ h);
  c = Math.imul(c, (1 | h));
  h = $m_s_util_hashing_MurmurHash3$().c3;
  h = $m_s_util_hashing_MurmurHash3$().x(h, a);
  h = $m_s_util_hashing_MurmurHash3$().x(h, b);
  h = $m_s_util_hashing_MurmurHash3$().cr(h, c);
  return $m_s_util_hashing_MurmurHash3$().aH(h, 4);
});
$p.cy = (function(key, value) {
  return this.cx(key, value);
});
function $isArrayOf_sci_Map$Map4(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.aR)));
}
var $d_sci_Map$Map4 = new $TypeData().i($c_sci_Map$Map4, "scala.collection.immutable.Map$Map4", ({
  aR: 1,
  W: 1,
  S: 1,
  k: 1,
  b: 1,
  c: 1,
  i: 1,
  h: 1,
  g: 1,
  e: 1,
  j: 1,
  U: 1,
  T: 1,
  d: 1,
  K: 1,
  m: 1,
  X: 1,
  M: 1,
  p: 1,
  a: 1
}));
/** @constructor */
function $c_sjsr_WrappedVarArgs(array) {
  this.ek = null;
  this.ek = array;
}
$p = $c_sjsr_WrappedVarArgs.prototype = new $h_O();
$p.constructor = $c_sjsr_WrappedVarArgs;
/** @constructor */
function $h_sjsr_WrappedVarArgs() {
}
$h_sjsr_WrappedVarArgs.prototype = $p;
$p.eo = (function(that) {
  return $f_sci_IndexedSeq__canEqual__O__Z(this, that);
});
$p.dW = (function(o) {
  return $f_sci_IndexedSeq__sameElements__sc_IterableOnce__Z(this, o);
});
$p.en = (function() {
  return $m_sci_IndexedSeqDefaults$().eZ;
});
$p.p = (function() {
  return new $c_sc_IndexedSeqView$IndexedSeqViewIterator(new $c_sc_IndexedSeqView$Id(this));
});
$p.bN = (function(len) {
  var x = this.w();
  return ((x === len) ? 0 : ((x < len) ? (-1) : 1));
});
$p.D = (function() {
  return this.w();
});
$p.H = (function(o) {
  return $f_sc_Seq__equals__O__Z(this, o);
});
$p.I = (function() {
  return $m_s_util_hashing_MurmurHash3$().fR(this);
});
$p.A = (function() {
  return $f_sc_Iterable__toString__T(this);
});
$p.n = (function() {
  return $f_sc_SeqOps__isEmpty__Z(this);
});
$p.dj = (function(x, default$1) {
  return $f_s_PartialFunction__applyOrElse__O__F1__O(this, x, default$1);
});
$p.cl = (function(dest, start, n) {
  return $f_sc_IterableOnceOps__copyToArray__O__I__I__I(this, dest, start, n);
});
$p.dP = (function(b, start, sep, end) {
  return $f_sc_IterableOnceOps__addString__scm_StringBuilder__T__T__T__scm_StringBuilder(this, b, start, sep, end);
});
$p.dq = (function() {
  return $m_sjsr_WrappedVarArgs$();
});
$p.w = (function() {
  return (this.ek.length | 0);
});
$p.C = (function(idx) {
  return this.ek[idx];
});
$p.cj = (function() {
  return "WrappedVarArgs";
});
$p.dV = (function(x) {
  return $f_sc_SeqOps__isDefinedAt__I__Z(this, (x | 0));
});
$p.l = (function(v1) {
  return this.C((v1 | 0));
});
$p.cp = (function() {
  return $m_sjsr_WrappedVarArgs$();
});
var $d_sjsr_WrappedVarArgs = new $TypeData().i($c_sjsr_WrappedVarArgs, "scala.scalajs.runtime.WrappedVarArgs", ({
  e0: 1,
  A: 1,
  b: 1,
  c: 1,
  i: 1,
  h: 1,
  g: 1,
  m: 1,
  e: 1,
  j: 1,
  s: 1,
  d: 1,
  r: 1,
  C: 1,
  B: 1,
  w: 1,
  u: 1,
  L: 1,
  D: 1,
  p: 1,
  v: 1,
  a: 1
}));
/** @constructor */
function $c_sci_HashMap(rootNode) {
  this.aD = null;
  this.aD = rootNode;
}
$p = $c_sci_HashMap.prototype = new $h_sci_AbstractMap();
$p.constructor = $c_sci_HashMap;
/** @constructor */
function $h_sci_HashMap() {
}
$h_sci_HashMap.prototype = $p;
$p.D = (function() {
  return this.aD.ao;
});
$p.az = (function() {
  return this.aD.ao;
});
$p.n = (function() {
  return (this.aD.ao === 0);
});
$p.p = (function() {
  return (this.n() ? $m_sc_Iterator$().a2 : new $c_sci_MapKeyValueTupleIterator(this.aD));
});
$p.ck = (function(key) {
  var keyUnimprovedHash = $m_sr_Statics$().ac(key);
  var keyHash = $m_sc_Hashing$().bq(keyUnimprovedHash);
  return this.aD.er(key, keyUnimprovedHash, keyHash, 0);
});
$p.l = (function(key) {
  var keyUnimprovedHash = $m_sr_Statics$().ac(key);
  var keyHash = $m_sc_Hashing$().bq(keyUnimprovedHash);
  return this.aD.em(key, keyUnimprovedHash, keyHash, 0);
});
$p.co = (function(key, default$1) {
  var keyUnimprovedHash = $m_sr_Statics$().ac(key);
  var keyHash = $m_sc_Hashing$().bq(keyUnimprovedHash);
  return this.aD.ev(key, keyUnimprovedHash, keyHash, 0, default$1);
});
$p.cU = (function(key, value) {
  var keyUnimprovedHash = $m_sr_Statics$().ac(key);
  var newRootNode = this.aD.fX(key, value, keyUnimprovedHash, $m_sc_Hashing$().bq(keyUnimprovedHash), 0, true);
  return ((newRootNode === this.aD) ? this : new $c_sci_HashMap(newRootNode));
});
$p.cn = (function(f) {
  this.aD.cn(f);
});
$p.H = (function(that) {
  if ((that instanceof $c_sci_HashMap)) {
    if ((this === that)) {
      return true;
    } else {
      var x = this.aD;
      var x$2 = that.aD;
      return ((x === null) ? (x$2 === null) : x.H(x$2));
    }
  } else {
    return $f_sc_Map__equals__O__Z(this, that);
  }
});
$p.I = (function() {
  if (this.n()) {
    return $m_s_util_hashing_MurmurHash3$().el;
  } else {
    var hashIterator = new $c_sci_MapKeyValueTupleHashIterator(this.aD);
    return $m_s_util_hashing_MurmurHash3$().fW(hashIterator, $m_s_util_hashing_MurmurHash3$().c3);
  }
});
$p.cj = (function() {
  return "HashMap";
});
$p.cy = (function(key, value) {
  return this.cU(key, value);
});
function $isArrayOf_sci_HashMap(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.aL)));
}
var $d_sci_HashMap = new $TypeData().i($c_sci_HashMap, "scala.collection.immutable.HashMap", ({
  aL: 1,
  W: 1,
  S: 1,
  k: 1,
  b: 1,
  c: 1,
  i: 1,
  h: 1,
  g: 1,
  e: 1,
  j: 1,
  U: 1,
  T: 1,
  d: 1,
  K: 1,
  m: 1,
  X: 1,
  M: 1,
  p: 1,
  cl: 1,
  cS: 1,
  a: 1,
  x: 1
}));
function $isArrayOf_sci_TreeSeqMap(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.cT)));
}
function $isArrayOf_sci_VectorMap(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.d3)));
}
/** @constructor */
function $c_scm_AbstractBuffer() {
}
$p = $c_scm_AbstractBuffer.prototype = new $h_scm_AbstractSeq();
$p.constructor = $c_scm_AbstractBuffer;
/** @constructor */
function $h_scm_AbstractBuffer() {
}
$h_scm_AbstractBuffer.prototype = $p;
$p.aS = (function(elems) {
  return $f_scm_Growable__addAll__sc_IterableOnce__scm_Growable(this, elems);
});
function $isArrayOf_sci_ListMap(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.cy)));
}
function $ct_sci_Vector__AO__($thiz, prefix1) {
  $thiz.b = prefix1;
  return $thiz;
}
/** @constructor */
function $c_sci_Vector() {
  this.b = null;
}
$p = $c_sci_Vector.prototype = new $h_sci_AbstractSeq();
$p.constructor = $c_sci_Vector;
/** @constructor */
function $h_sci_Vector() {
}
$h_sci_Vector.prototype = $p;
$p.bN = (function(len) {
  var x = this.w();
  return ((x === len) ? 0 : ((x < len) ? (-1) : 1));
});
$p.D = (function() {
  return this.w();
});
$p.cv = (function() {
  return "IndexedSeq";
});
$p.eo = (function(that) {
  return $f_sci_IndexedSeq__canEqual__O__Z(this, that);
});
$p.dW = (function(o) {
  return $f_sci_IndexedSeq__sameElements__sc_IterableOnce__Z(this, o);
});
$p.dq = (function() {
  return $m_sci_Vector$();
});
$p.w = (function() {
  return ((this instanceof $c_sci_BigVector) ? this.e : this.b.a.length);
});
$p.p = (function() {
  return ((this === $m_sci_Vector0$()) ? $m_sci_Vector$().f4 : new $c_sci_NewVectorIterator(this, this.w(), this.bA()));
});
$p.cj = (function() {
  return "Vector";
});
$p.cl = (function(xs, start, len) {
  return this.p().cl(xs, start, len);
});
$p.en = (function() {
  return $m_sci_Vector$().f3;
});
$p.ah = (function(index) {
  return $m_scg_CommonErrors$().gR(index, (((-1) + this.w()) | 0));
});
$p.dR = (function(f) {
  var c = this.bA();
  var i = 0;
  while ((i < c)) {
    var $x_1 = $m_sci_VectorStatics$();
    var idx = i;
    var c$1 = ((c / 2) | 0);
    var a = ((idx - c$1) | 0);
    var sign = (a >> 31);
    $x_1.et((((-1) + ((((1 + c$1) | 0) - (((a ^ sign) - sign) | 0)) | 0)) | 0), this.bz(i), f);
    i = ((1 + i) | 0);
  }
});
$p.cp = (function() {
  return $m_sci_Vector$();
});
function $isArrayOf_sci_Vector(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.N)));
}
function $isArrayOf_sci_ArraySeq$ofRef(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.cq)));
}
function $p_sci_List__loop$2__I__I__sci_List__I($thiz, len$1, i, xs) {
  var xs$tailLocal1 = xs;
  var i$tailLocal1 = i;
  while (true) {
    if ((i$tailLocal1 === len$1)) {
      return (xs$tailLocal1.n() ? 0 : 1);
    } else if (xs$tailLocal1.n()) {
      return (-1);
    } else {
      var i$tailLocal1$tmp1 = ((1 + i$tailLocal1) | 0);
      var xs$tailLocal1$tmp1 = xs$tailLocal1.P();
      i$tailLocal1 = i$tailLocal1$tmp1;
      xs$tailLocal1 = xs$tailLocal1$tmp1;
    }
  }
}
function $p_sci_List__listEq$1__sci_List__sci_List__Z($thiz, a, b) {
  var b$tailLocal1 = b;
  var a$tailLocal1 = a;
  while (true) {
    if ((a$tailLocal1 === b$tailLocal1)) {
      return true;
    } else {
      var aEmpty = a$tailLocal1.n();
      var bEmpty = b$tailLocal1.n();
      if (((!(aEmpty || bEmpty)) && $m_sr_BoxesRunTime$().i(a$tailLocal1.am(), b$tailLocal1.am()))) {
        var a$tailLocal1$tmp1 = a$tailLocal1.P();
        var b$tailLocal1$tmp1 = b$tailLocal1.P();
        a$tailLocal1 = a$tailLocal1$tmp1;
        b$tailLocal1 = b$tailLocal1$tmp1;
      } else {
        return (aEmpty && bEmpty);
      }
    }
  }
}
/** @constructor */
function $c_sci_List() {
}
$p = $c_sci_List.prototype = new $h_sci_AbstractSeq();
$p.constructor = $c_sci_List;
/** @constructor */
function $h_sci_List() {
}
$h_sci_List.prototype = $p;
$p.fG = (function(x) {
  return $f_sc_LinearSeqOps__isDefinedAt__I__Z(this, x);
});
$p.C = (function(n) {
  return $f_sc_LinearSeqOps__apply__I__O(this, n);
});
$p.dW = (function(that) {
  return $f_sc_LinearSeqOps__sameElements__sc_IterableOnce__Z(this, that);
});
$p.cv = (function() {
  return "LinearSeq";
});
$p.p = (function() {
  return new $c_sc_StrictOptimizedLinearSeqOps$$anon$1(this);
});
$p.dq = (function() {
  return $m_sci_List$();
});
$p.fq = (function(prefix) {
  if (this.n()) {
    return prefix;
  } else if (prefix.n()) {
    return this;
  } else {
    var result = new $c_sci_$colon$colon(prefix.am(), this);
    var curr = result;
    var that = prefix.P();
    while ((!that.n())) {
      var temp = new $c_sci_$colon$colon(that.am(), this);
      curr.aY = temp;
      curr = temp;
      that = that.P();
    }
    return result;
  }
});
$p.n = (function() {
  return (this === $m_sci_Nil$());
});
$p.h9 = (function(prefix) {
  if ((prefix instanceof $c_sci_List)) {
    return this.fq(prefix);
  }
  if ((prefix.D() === 0)) {
    return this;
  }
  if ((prefix instanceof $c_scm_ListBuffer)) {
    if (this.n()) {
      return prefix.fU();
    }
  }
  var iter = prefix.p();
  if (iter.k()) {
    var result = new $c_sci_$colon$colon(iter.h(), this);
    var curr = result;
    while (iter.k()) {
      var temp = new $c_sci_$colon$colon(iter.h(), this);
      curr.aY = temp;
      curr = temp;
    }
    return result;
  } else {
    return this;
  }
});
$p.gd = (function(suffix) {
  return ((suffix instanceof $c_sci_List) ? suffix.fq(this) : $f_sc_StrictOptimizedSeqOps__appendedAll__sc_IterableOnce__O(this, suffix));
});
$p.w = (function() {
  var these = this;
  var len = 0;
  while ((!these.n())) {
    len = ((1 + len) | 0);
    these = these.P();
  }
  return len;
});
$p.bN = (function(len) {
  return ((len < 0) ? 1 : $p_sci_List__loop$2__I__I__sci_List__I(this, len, 0, this));
});
$p.cj = (function() {
  return "List";
});
$p.H = (function(o) {
  return ((o instanceof $c_sci_List) ? $p_sci_List__listEq$1__sci_List__sci_List__Z(this, this, o) : $f_sc_Seq__equals__O__Z(this, o));
});
$p.cp = (function() {
  return $m_sci_List$();
});
$p.gv = (function(n) {
  return $p_sc_StrictOptimizedLinearSeqOps__loop$2__I__sc_LinearSeq__sc_LinearSeq(this, n, this);
});
$p.dV = (function(x) {
  return $f_sc_LinearSeqOps__isDefinedAt__I__Z(this, (x | 0));
});
$p.l = (function(v1) {
  return $f_sc_LinearSeqOps__apply__I__O(this, (v1 | 0));
});
function $isArrayOf_sci_List(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.aa)));
}
/** @constructor */
function $c_sci_VectorImpl() {
  this.b = null;
}
$p = $c_sci_VectorImpl.prototype = new $h_sci_Vector();
$p.constructor = $c_sci_VectorImpl;
/** @constructor */
function $h_sci_VectorImpl() {
}
$h_sci_VectorImpl.prototype = $p;
function $isArrayOf_scm_HashMap(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.d8)));
}
function $ct_sci_BigVector__AO__AO__I__($thiz, _prefix1, suffix1, length0) {
  $thiz.d = suffix1;
  $thiz.e = length0;
  $ct_sci_Vector__AO__($thiz, _prefix1);
  return $thiz;
}
/** @constructor */
function $c_sci_BigVector() {
  this.b = null;
  this.d = null;
  this.e = 0;
}
$p = $c_sci_BigVector.prototype = new $h_sci_VectorImpl();
$p.constructor = $c_sci_BigVector;
/** @constructor */
function $h_sci_BigVector() {
}
$h_sci_BigVector.prototype = $p;
function $isArrayOf_sci_BigVector(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.P)));
}
/** @constructor */
function $c_sci_Vector1(_data1) {
  this.b = null;
  $ct_sci_Vector__AO__(this, _data1);
}
$p = $c_sci_Vector1.prototype = new $h_sci_VectorImpl();
$p.constructor = $c_sci_Vector1;
/** @constructor */
function $h_sci_Vector1() {
}
$h_sci_Vector1.prototype = $p;
$p.C = (function(index) {
  if (((index >= 0) && (index < this.b.a.length))) {
    return this.b.a[index];
  } else {
    throw this.ah(index);
  }
});
$p.ca = (function(index, elem) {
  if (((index >= 0) && (index < this.b.a.length))) {
    var a1 = this.b;
    var a1c = a1.c();
    a1c.a[index] = elem;
    return new $c_sci_Vector1(a1c);
  } else {
    throw this.ah(index);
  }
});
$p.c4 = (function(elem) {
  if ((this.b.a.length < 32)) {
    return new $c_sci_Vector1($m_sci_VectorStatics$().cO(this.b, elem));
  } else {
    var $x_2 = this.b;
    var $x_1 = $m_sci_VectorStatics$().aG;
    var a = new $ac_O(1);
    a.a[0] = elem;
    return new $c_sci_Vector2($x_2, 32, $x_1, a, 33);
  }
});
$p.bA = (function() {
  return 1;
});
$p.bz = (function(idx) {
  return this.b;
});
$p.l = (function(v1) {
  var index = (v1 | 0);
  if (((index >= 0) && (index < this.b.a.length))) {
    return this.b.a[index];
  } else {
    throw this.ah(index);
  }
});
var $d_sci_Vector1 = new $TypeData().i($c_sci_Vector1, "scala.collection.immutable.Vector1", ({
  cW: 1,
  Q: 1,
  N: 1,
  F: 1,
  t: 1,
  k: 1,
  b: 1,
  c: 1,
  i: 1,
  h: 1,
  g: 1,
  e: 1,
  j: 1,
  s: 1,
  d: 1,
  r: 1,
  m: 1,
  C: 1,
  B: 1,
  w: 1,
  u: 1,
  L: 1,
  A: 1,
  p: 1,
  v: 1,
  D: 1,
  a: 1,
  x: 1
}));
/** @constructor */
function $c_sci_$colon$colon(head, next) {
  this.e7 = null;
  this.aY = null;
  this.e7 = head;
  this.aY = next;
}
$p = $c_sci_$colon$colon.prototype = new $h_sci_List();
$p.constructor = $c_sci_$colon$colon;
/** @constructor */
function $h_sci_$colon$colon() {
}
$h_sci_$colon$colon.prototype = $p;
$p.c9 = (function() {
  return new $c_s_Product$$anon$1(this);
});
$p.be = (function() {
  return 2;
});
$p.bg = (function() {
  return "::";
});
$p.bf = (function(n) {
  if ((n === 0)) {
    return this.e7;
  }
  if ((n === 1)) {
    return this.aY;
  }
  throw $ct_jl_IndexOutOfBoundsException__T__(new $c_jl_IndexOutOfBoundsException(), ("" + n));
});
$p.am = (function() {
  return this.e7;
});
$p.P = (function() {
  return this.aY;
});
var $d_sci_$colon$colon = new $TypeData().i($c_sci_$colon$colon, "scala.collection.immutable.$colon$colon", ({
  cp: 1,
  aa: 1,
  F: 1,
  t: 1,
  k: 1,
  b: 1,
  c: 1,
  i: 1,
  h: 1,
  g: 1,
  e: 1,
  j: 1,
  s: 1,
  d: 1,
  r: 1,
  m: 1,
  C: 1,
  B: 1,
  aG: 1,
  a2: 1,
  aN: 1,
  aM: 1,
  p: 1,
  v: 1,
  aH: 1,
  D: 1,
  a: 1,
  x: 1,
  z: 1
}));
/** @constructor */
function $c_sci_Nil$() {
  $n_sci_Nil$ = this;
  var _1 = $m_sci_Nil$();
  $m_sci_Nil$();
}
$p = $c_sci_Nil$.prototype = new $h_sci_List();
$p.constructor = $c_sci_Nil$;
/** @constructor */
function $h_sci_Nil$() {
}
$h_sci_Nil$.prototype = $p;
$p.c9 = (function() {
  return new $c_s_Product$$anon$1(this);
});
$p.be = (function() {
  return 0;
});
$p.bg = (function() {
  return "Nil";
});
$p.bf = (function(n) {
  throw $ct_jl_IndexOutOfBoundsException__T__(new $c_jl_IndexOutOfBoundsException(), ("" + n));
});
$p.gO = (function() {
  throw $ct_ju_NoSuchElementException__T__(new $c_ju_NoSuchElementException(), "head of empty list");
});
$p.hj = (function() {
  throw new $c_jl_UnsupportedOperationException("tail of empty list");
});
$p.D = (function() {
  return 0;
});
$p.p = (function() {
  return $m_sc_Iterator$().a2;
});
$p.am = (function() {
  this.gO();
});
$p.P = (function() {
  this.hj();
});
var $d_sci_Nil$ = new $TypeData().i($c_sci_Nil$, "scala.collection.immutable.Nil$", ({
  cM: 1,
  aa: 1,
  F: 1,
  t: 1,
  k: 1,
  b: 1,
  c: 1,
  i: 1,
  h: 1,
  g: 1,
  e: 1,
  j: 1,
  s: 1,
  d: 1,
  r: 1,
  m: 1,
  C: 1,
  B: 1,
  aG: 1,
  a2: 1,
  aN: 1,
  aM: 1,
  p: 1,
  v: 1,
  aH: 1,
  D: 1,
  a: 1,
  x: 1,
  z: 1
}));
var $n_sci_Nil$;
function $m_sci_Nil$() {
  if ((!$n_sci_Nil$)) {
    $n_sci_Nil$ = new $c_sci_Nil$();
  }
  return $n_sci_Nil$;
}
/** @constructor */
function $c_sci_Vector0$() {
  this.b = null;
  this.d = null;
  this.e = 0;
  $ct_sci_BigVector__AO__AO__I__(this, $m_sci_VectorStatics$().ed, $m_sci_VectorStatics$().ed, 0);
}
$p = $c_sci_Vector0$.prototype = new $h_sci_BigVector();
$p.constructor = $c_sci_Vector0$;
/** @constructor */
function $h_sci_Vector0$() {
}
$h_sci_Vector0$.prototype = $p;
$p.fv = (function(index) {
  throw this.ah(index);
});
$p.ca = (function(index, elem) {
  throw this.ah(index);
});
$p.c4 = (function(elem) {
  var a = new $ac_O(1);
  a.a[0] = elem;
  return new $c_sci_Vector1(a);
});
$p.bA = (function() {
  return 0;
});
$p.bz = (function(idx) {
  return null;
});
$p.H = (function(o) {
  return ((this === o) || ((!(o instanceof $c_sci_Vector)) && $f_sc_Seq__equals__O__Z(this, o)));
});
$p.ah = (function(index) {
  return $ct_jl_IndexOutOfBoundsException__T__(new $c_jl_IndexOutOfBoundsException(), (index + " is out of bounds (empty vector)"));
});
$p.C = (function(i) {
  this.fv(i);
});
$p.l = (function(v1) {
  this.fv((v1 | 0));
});
var $d_sci_Vector0$ = new $TypeData().i($c_sci_Vector0$, "scala.collection.immutable.Vector0$", ({
  cV: 1,
  P: 1,
  Q: 1,
  N: 1,
  F: 1,
  t: 1,
  k: 1,
  b: 1,
  c: 1,
  i: 1,
  h: 1,
  g: 1,
  e: 1,
  j: 1,
  s: 1,
  d: 1,
  r: 1,
  m: 1,
  C: 1,
  B: 1,
  w: 1,
  u: 1,
  L: 1,
  A: 1,
  p: 1,
  v: 1,
  D: 1,
  a: 1,
  x: 1
}));
var $n_sci_Vector0$;
function $m_sci_Vector0$() {
  if ((!$n_sci_Vector0$)) {
    $n_sci_Vector0$ = new $c_sci_Vector0$();
  }
  return $n_sci_Vector0$;
}
/** @constructor */
function $c_sci_Vector2(_prefix1, len1, data2, _suffix1, _length0) {
  this.b = null;
  this.d = null;
  this.e = 0;
  this.b1 = 0;
  this.aF = null;
  this.b1 = len1;
  this.aF = data2;
  $ct_sci_BigVector__AO__AO__I__(this, _prefix1, _suffix1, _length0);
}
$p = $c_sci_Vector2.prototype = new $h_sci_BigVector();
$p.constructor = $c_sci_Vector2;
/** @constructor */
function $h_sci_Vector2() {
}
$h_sci_Vector2.prototype = $p;
$p.C = (function(index) {
  if (((index >= 0) && (index < this.e))) {
    var io = ((index - this.b1) | 0);
    if ((io >= 0)) {
      var i2 = ((io >>> 5) | 0);
      var i1 = (31 & io);
      return ((i2 < this.aF.a.length) ? this.aF.a[i2].a[i1] : this.d.a[(31 & io)]);
    } else {
      return this.b.a[index];
    }
  } else {
    throw this.ah(index);
  }
});
$p.ca = (function(index, elem) {
  if (((index >= 0) && (index < this.e))) {
    if ((index >= this.b1)) {
      var io = ((index - this.b1) | 0);
      var i2 = ((io >>> 5) | 0);
      var i1 = (31 & io);
      if ((i2 < this.aF.a.length)) {
        var a2 = this.aF;
        var a2c = a2.c();
        var a1 = a2c.a[i2];
        var a1c = a1.c();
        a1c.a[i1] = elem;
        a2c.a[i2] = a1c;
        return new $c_sci_Vector2(this.b, this.b1, a2c, this.d, this.e);
      } else {
        var a1$1 = this.d;
        var a1c$1 = a1$1.c();
        a1c$1.a[i1] = elem;
        return new $c_sci_Vector2(this.b, this.b1, this.aF, a1c$1, this.e);
      }
    } else {
      var a1$2 = this.b;
      var a1c$2 = a1$2.c();
      a1c$2.a[index] = elem;
      return new $c_sci_Vector2(a1c$2, this.b1, this.aF, this.d, this.e);
    }
  } else {
    throw this.ah(index);
  }
});
$p.c4 = (function(elem) {
  if ((this.d.a.length < 32)) {
    var suffix1$3 = $m_sci_VectorStatics$().cO(this.d, elem);
    var length0$3 = ((1 + this.e) | 0);
    return new $c_sci_Vector2(this.b, this.b1, this.aF, suffix1$3, length0$3);
  } else if ((this.aF.a.length < 30)) {
    var data2$4 = $m_sci_VectorStatics$().o(this.aF, this.d);
    var a = new $ac_O(1);
    a.a[0] = elem;
    var length0$4 = ((1 + this.e) | 0);
    return new $c_sci_Vector2(this.b, this.b1, data2$4, a, length0$4);
  } else {
    var $x_5 = this.b;
    var $x_4 = this.b1;
    var $x_3 = this.aF;
    var $x_2 = this.b1;
    var $x_1 = $m_sci_VectorStatics$().bw;
    var x = this.d;
    var a$1 = new ($d_O.r().r().C)(1);
    a$1.a[0] = x;
    var a$2 = new $ac_O(1);
    a$2.a[0] = elem;
    return new $c_sci_Vector3($x_5, $x_4, $x_3, ((960 + $x_2) | 0), $x_1, a$1, a$2, ((1 + this.e) | 0));
  }
});
$p.bA = (function() {
  return 3;
});
$p.bz = (function(idx) {
  switch (idx) {
    case 0: {
      return this.b;
      break;
    }
    case 1: {
      return this.aF;
      break;
    }
    case 2: {
      return this.d;
      break;
    }
    default: {
      throw new $c_s_MatchError(idx);
    }
  }
});
$p.l = (function(v1) {
  var index = (v1 | 0);
  if (((index >= 0) && (index < this.e))) {
    var io = ((index - this.b1) | 0);
    if ((io >= 0)) {
      var i2 = ((io >>> 5) | 0);
      var i1 = (31 & io);
      return ((i2 < this.aF.a.length) ? this.aF.a[i2].a[i1] : this.d.a[(31 & io)]);
    } else {
      return this.b.a[index];
    }
  } else {
    throw this.ah(index);
  }
});
var $d_sci_Vector2 = new $TypeData().i($c_sci_Vector2, "scala.collection.immutable.Vector2", ({
  cX: 1,
  P: 1,
  Q: 1,
  N: 1,
  F: 1,
  t: 1,
  k: 1,
  b: 1,
  c: 1,
  i: 1,
  h: 1,
  g: 1,
  e: 1,
  j: 1,
  s: 1,
  d: 1,
  r: 1,
  m: 1,
  C: 1,
  B: 1,
  w: 1,
  u: 1,
  L: 1,
  A: 1,
  p: 1,
  v: 1,
  D: 1,
  a: 1,
  x: 1
}));
/** @constructor */
function $c_sci_Vector3(_prefix1, len1, prefix2, len12, data3, suffix2, _suffix1, _length0) {
  this.b = null;
  this.d = null;
  this.e = 0;
  this.aA = 0;
  this.aR = null;
  this.aB = 0;
  this.au = null;
  this.av = null;
  this.aA = len1;
  this.aR = prefix2;
  this.aB = len12;
  this.au = data3;
  this.av = suffix2;
  $ct_sci_BigVector__AO__AO__I__(this, _prefix1, _suffix1, _length0);
}
$p = $c_sci_Vector3.prototype = new $h_sci_BigVector();
$p.constructor = $c_sci_Vector3;
/** @constructor */
function $h_sci_Vector3() {
}
$h_sci_Vector3.prototype = $p;
$p.C = (function(index) {
  if (((index >= 0) && (index < this.e))) {
    var io = ((index - this.aB) | 0);
    if ((io >= 0)) {
      var i3 = ((io >>> 10) | 0);
      var i2 = (31 & ((io >>> 5) | 0));
      var i1 = (31 & io);
      return ((i3 < this.au.a.length) ? this.au.a[i3].a[i2].a[i1] : ((i2 < this.av.a.length) ? this.av.a[i2].a[i1] : this.d.a[i1]));
    } else if ((index >= this.aA)) {
      var io$2 = ((index - this.aA) | 0);
      return this.aR.a[((io$2 >>> 5) | 0)].a[(31 & io$2)];
    } else {
      return this.b.a[index];
    }
  } else {
    throw this.ah(index);
  }
});
$p.ca = (function(index, elem) {
  if (((index >= 0) && (index < this.e))) {
    if ((index >= this.aB)) {
      var io = ((index - this.aB) | 0);
      var i3 = ((io >>> 10) | 0);
      var i2 = (31 & ((io >>> 5) | 0));
      var i1 = (31 & io);
      if ((i3 < this.au.a.length)) {
        var a3 = this.au;
        var a3c = a3.c();
        var a2 = a3c.a[i3];
        var a2c = a2.c();
        var a1 = a2c.a[i2];
        var a1c = a1.c();
        a1c.a[i1] = elem;
        a2c.a[i2] = a1c;
        a3c.a[i3] = a2c;
        return new $c_sci_Vector3(this.b, this.aA, this.aR, this.aB, a3c, this.av, this.d, this.e);
      } else if ((i2 < this.av.a.length)) {
        var a2$1 = this.av;
        var a2c$1 = a2$1.c();
        var a1$1 = a2c$1.a[i2];
        var a1c$1 = a1$1.c();
        a1c$1.a[i1] = elem;
        a2c$1.a[i2] = a1c$1;
        return new $c_sci_Vector3(this.b, this.aA, this.aR, this.aB, this.au, a2c$1, this.d, this.e);
      } else {
        var a1$2 = this.d;
        var a1c$2 = a1$2.c();
        a1c$2.a[i1] = elem;
        return new $c_sci_Vector3(this.b, this.aA, this.aR, this.aB, this.au, this.av, a1c$2, this.e);
      }
    } else if ((index >= this.aA)) {
      var io$2 = ((index - this.aA) | 0);
      var a2$2 = this.aR;
      var idx2 = ((io$2 >>> 5) | 0);
      var idx1 = (31 & io$2);
      var a2c$2 = a2$2.c();
      var a1$3 = a2c$2.a[idx2];
      var a1c$3 = a1$3.c();
      a1c$3.a[idx1] = elem;
      a2c$2.a[idx2] = a1c$3;
      return new $c_sci_Vector3(this.b, this.aA, a2c$2, this.aB, this.au, this.av, this.d, this.e);
    } else {
      var a1$4 = this.b;
      var a1c$4 = a1$4.c();
      a1c$4.a[index] = elem;
      return new $c_sci_Vector3(a1c$4, this.aA, this.aR, this.aB, this.au, this.av, this.d, this.e);
    }
  } else {
    throw this.ah(index);
  }
});
$p.c4 = (function(elem) {
  if ((this.d.a.length < 32)) {
    var suffix1$16 = $m_sci_VectorStatics$().cO(this.d, elem);
    var length0$16 = ((1 + this.e) | 0);
    return new $c_sci_Vector3(this.b, this.aA, this.aR, this.aB, this.au, this.av, suffix1$16, length0$16);
  } else if ((this.av.a.length < 31)) {
    var suffix2$6 = $m_sci_VectorStatics$().o(this.av, this.d);
    var a = new $ac_O(1);
    a.a[0] = elem;
    var length0$17 = ((1 + this.e) | 0);
    return new $c_sci_Vector3(this.b, this.aA, this.aR, this.aB, this.au, suffix2$6, a, length0$17);
  } else if ((this.au.a.length < 30)) {
    var data3$7 = $m_sci_VectorStatics$().o(this.au, $m_sci_VectorStatics$().o(this.av, this.d));
    var a$1 = new $ac_O(1);
    a$1.a[0] = elem;
    var length0$18 = ((1 + this.e) | 0);
    return new $c_sci_Vector3(this.b, this.aA, this.aR, this.aB, data3$7, $m_sci_VectorStatics$().aG, a$1, length0$18);
  } else {
    var $x_8 = this.b;
    var $x_7 = this.aA;
    var $x_6 = this.aR;
    var $x_5 = this.aB;
    var $x_4 = this.au;
    var $x_3 = this.aB;
    var $x_2 = $m_sci_VectorStatics$().cL;
    var x = $m_sci_VectorStatics$().o(this.av, this.d);
    var a$2 = new ($d_O.r().r().r().C)(1);
    a$2.a[0] = x;
    var $x_1 = $m_sci_VectorStatics$().aG;
    var a$3 = new $ac_O(1);
    a$3.a[0] = elem;
    return new $c_sci_Vector4($x_8, $x_7, $x_6, $x_5, $x_4, ((30720 + $x_3) | 0), $x_2, a$2, $x_1, a$3, ((1 + this.e) | 0));
  }
});
$p.bA = (function() {
  return 5;
});
$p.bz = (function(idx) {
  switch (idx) {
    case 0: {
      return this.b;
      break;
    }
    case 1: {
      return this.aR;
      break;
    }
    case 2: {
      return this.au;
      break;
    }
    case 3: {
      return this.av;
      break;
    }
    case 4: {
      return this.d;
      break;
    }
    default: {
      throw new $c_s_MatchError(idx);
    }
  }
});
$p.l = (function(v1) {
  var index = (v1 | 0);
  if (((index >= 0) && (index < this.e))) {
    var io = ((index - this.aB) | 0);
    if ((io >= 0)) {
      var i3 = ((io >>> 10) | 0);
      var i2 = (31 & ((io >>> 5) | 0));
      var i1 = (31 & io);
      return ((i3 < this.au.a.length) ? this.au.a[i3].a[i2].a[i1] : ((i2 < this.av.a.length) ? this.av.a[i2].a[i1] : this.d.a[i1]));
    } else if ((index >= this.aA)) {
      var io$2 = ((index - this.aA) | 0);
      return this.aR.a[((io$2 >>> 5) | 0)].a[(31 & io$2)];
    } else {
      return this.b.a[index];
    }
  } else {
    throw this.ah(index);
  }
});
var $d_sci_Vector3 = new $TypeData().i($c_sci_Vector3, "scala.collection.immutable.Vector3", ({
  cY: 1,
  P: 1,
  Q: 1,
  N: 1,
  F: 1,
  t: 1,
  k: 1,
  b: 1,
  c: 1,
  i: 1,
  h: 1,
  g: 1,
  e: 1,
  j: 1,
  s: 1,
  d: 1,
  r: 1,
  m: 1,
  C: 1,
  B: 1,
  w: 1,
  u: 1,
  L: 1,
  A: 1,
  p: 1,
  v: 1,
  D: 1,
  a: 1,
  x: 1
}));
/** @constructor */
function $c_sci_Vector4(_prefix1, len1, prefix2, len12, prefix3, len123, data4, suffix3, suffix2, _suffix1, _length0) {
  this.b = null;
  this.d = null;
  this.e = 0;
  this.ar = 0;
  this.ax = null;
  this.as = 0;
  this.ay = null;
  this.at = 0;
  this.ad = null;
  this.af = null;
  this.ae = null;
  this.ar = len1;
  this.ax = prefix2;
  this.as = len12;
  this.ay = prefix3;
  this.at = len123;
  this.ad = data4;
  this.af = suffix3;
  this.ae = suffix2;
  $ct_sci_BigVector__AO__AO__I__(this, _prefix1, _suffix1, _length0);
}
$p = $c_sci_Vector4.prototype = new $h_sci_BigVector();
$p.constructor = $c_sci_Vector4;
/** @constructor */
function $h_sci_Vector4() {
}
$h_sci_Vector4.prototype = $p;
$p.C = (function(index) {
  if (((index >= 0) && (index < this.e))) {
    var io = ((index - this.at) | 0);
    if ((io >= 0)) {
      var i4 = ((io >>> 15) | 0);
      var i3 = (31 & ((io >>> 10) | 0));
      var i2 = (31 & ((io >>> 5) | 0));
      var i1 = (31 & io);
      return ((i4 < this.ad.a.length) ? this.ad.a[i4].a[i3].a[i2].a[i1] : ((i3 < this.af.a.length) ? this.af.a[i3].a[i2].a[i1] : ((i2 < this.ae.a.length) ? this.ae.a[i2].a[i1] : this.d.a[i1])));
    } else if ((index >= this.as)) {
      var io$2 = ((index - this.as) | 0);
      return this.ay.a[((io$2 >>> 10) | 0)].a[(31 & ((io$2 >>> 5) | 0))].a[(31 & io$2)];
    } else if ((index >= this.ar)) {
      var io$3 = ((index - this.ar) | 0);
      return this.ax.a[((io$3 >>> 5) | 0)].a[(31 & io$3)];
    } else {
      return this.b.a[index];
    }
  } else {
    throw this.ah(index);
  }
});
$p.ca = (function(index, elem) {
  if (((index >= 0) && (index < this.e))) {
    if ((index >= this.at)) {
      var io = ((index - this.at) | 0);
      var i4 = ((io >>> 15) | 0);
      var i3 = (31 & ((io >>> 10) | 0));
      var i2 = (31 & ((io >>> 5) | 0));
      var i1 = (31 & io);
      if ((i4 < this.ad.a.length)) {
        var a4 = this.ad;
        var a4c = a4.c();
        var a3 = a4c.a[i4];
        var a3c = a3.c();
        var a2 = a3c.a[i3];
        var a2c = a2.c();
        var a1 = a2c.a[i2];
        var a1c = a1.c();
        a1c.a[i1] = elem;
        a2c.a[i2] = a1c;
        a3c.a[i3] = a2c;
        a4c.a[i4] = a3c;
        return new $c_sci_Vector4(this.b, this.ar, this.ax, this.as, this.ay, this.at, a4c, this.af, this.ae, this.d, this.e);
      } else if ((i3 < this.af.a.length)) {
        var a3$1 = this.af;
        var a3c$1 = a3$1.c();
        var a2$1 = a3c$1.a[i3];
        var a2c$1 = a2$1.c();
        var a1$1 = a2c$1.a[i2];
        var a1c$1 = a1$1.c();
        a1c$1.a[i1] = elem;
        a2c$1.a[i2] = a1c$1;
        a3c$1.a[i3] = a2c$1;
        return new $c_sci_Vector4(this.b, this.ar, this.ax, this.as, this.ay, this.at, this.ad, a3c$1, this.ae, this.d, this.e);
      } else if ((i2 < this.ae.a.length)) {
        var a2$2 = this.ae;
        var a2c$2 = a2$2.c();
        var a1$2 = a2c$2.a[i2];
        var a1c$2 = a1$2.c();
        a1c$2.a[i1] = elem;
        a2c$2.a[i2] = a1c$2;
        return new $c_sci_Vector4(this.b, this.ar, this.ax, this.as, this.ay, this.at, this.ad, this.af, a2c$2, this.d, this.e);
      } else {
        var a1$3 = this.d;
        var a1c$3 = a1$3.c();
        a1c$3.a[i1] = elem;
        return new $c_sci_Vector4(this.b, this.ar, this.ax, this.as, this.ay, this.at, this.ad, this.af, this.ae, a1c$3, this.e);
      }
    } else if ((index >= this.as)) {
      var io$2 = ((index - this.as) | 0);
      var a3$2 = this.ay;
      var idx3 = ((io$2 >>> 10) | 0);
      var idx2 = (31 & ((io$2 >>> 5) | 0));
      var idx1 = (31 & io$2);
      var a3c$2 = a3$2.c();
      var a2$3 = a3c$2.a[idx3];
      var a2c$3 = a2$3.c();
      var a1$4 = a2c$3.a[idx2];
      var a1c$4 = a1$4.c();
      a1c$4.a[idx1] = elem;
      a2c$3.a[idx2] = a1c$4;
      a3c$2.a[idx3] = a2c$3;
      return new $c_sci_Vector4(this.b, this.ar, this.ax, this.as, a3c$2, this.at, this.ad, this.af, this.ae, this.d, this.e);
    } else if ((index >= this.ar)) {
      var io$3 = ((index - this.ar) | 0);
      var a2$4 = this.ax;
      var idx2$1 = ((io$3 >>> 5) | 0);
      var idx1$1 = (31 & io$3);
      var a2c$4 = a2$4.c();
      var a1$5 = a2c$4.a[idx2$1];
      var a1c$5 = a1$5.c();
      a1c$5.a[idx1$1] = elem;
      a2c$4.a[idx2$1] = a1c$5;
      return new $c_sci_Vector4(this.b, this.ar, a2c$4, this.as, this.ay, this.at, this.ad, this.af, this.ae, this.d, this.e);
    } else {
      var a1$6 = this.b;
      var a1c$6 = a1$6.c();
      a1c$6.a[index] = elem;
      return new $c_sci_Vector4(a1c$6, this.ar, this.ax, this.as, this.ay, this.at, this.ad, this.af, this.ae, this.d, this.e);
    }
  } else {
    throw this.ah(index);
  }
});
$p.c4 = (function(elem) {
  if ((this.d.a.length < 32)) {
    var suffix1$33 = $m_sci_VectorStatics$().cO(this.d, elem);
    var length0$33 = ((1 + this.e) | 0);
    return new $c_sci_Vector4(this.b, this.ar, this.ax, this.as, this.ay, this.at, this.ad, this.af, this.ae, suffix1$33, length0$33);
  } else if ((this.ae.a.length < 31)) {
    var suffix2$22 = $m_sci_VectorStatics$().o(this.ae, this.d);
    var a = new $ac_O(1);
    a.a[0] = elem;
    var length0$34 = ((1 + this.e) | 0);
    return new $c_sci_Vector4(this.b, this.ar, this.ax, this.as, this.ay, this.at, this.ad, this.af, suffix2$22, a, length0$34);
  } else if ((this.af.a.length < 31)) {
    var suffix3$9 = $m_sci_VectorStatics$().o(this.af, $m_sci_VectorStatics$().o(this.ae, this.d));
    var a$1 = new $ac_O(1);
    a$1.a[0] = elem;
    var length0$35 = ((1 + this.e) | 0);
    return new $c_sci_Vector4(this.b, this.ar, this.ax, this.as, this.ay, this.at, this.ad, suffix3$9, $m_sci_VectorStatics$().aG, a$1, length0$35);
  } else if ((this.ad.a.length < 30)) {
    var data4$10 = $m_sci_VectorStatics$().o(this.ad, $m_sci_VectorStatics$().o(this.af, $m_sci_VectorStatics$().o(this.ae, this.d)));
    var a$2 = new $ac_O(1);
    a$2.a[0] = elem;
    var length0$36 = ((1 + this.e) | 0);
    return new $c_sci_Vector4(this.b, this.ar, this.ax, this.as, this.ay, this.at, data4$10, $m_sci_VectorStatics$().bw, $m_sci_VectorStatics$().aG, a$2, length0$36);
  } else {
    var $x_11 = this.b;
    var $x_10 = this.ar;
    var $x_9 = this.ax;
    var $x_8 = this.as;
    var $x_7 = this.ay;
    var $x_6 = this.at;
    var $x_5 = this.ad;
    var $x_4 = this.at;
    var $x_3 = $m_sci_VectorStatics$().ee;
    var x = $m_sci_VectorStatics$().o(this.af, $m_sci_VectorStatics$().o(this.ae, this.d));
    var a$3 = new ($d_O.r().r().r().r().C)(1);
    a$3.a[0] = x;
    var $x_2 = $m_sci_VectorStatics$().bw;
    var $x_1 = $m_sci_VectorStatics$().aG;
    var a$4 = new $ac_O(1);
    a$4.a[0] = elem;
    return new $c_sci_Vector5($x_11, $x_10, $x_9, $x_8, $x_7, $x_6, $x_5, ((983040 + $x_4) | 0), $x_3, a$3, $x_2, $x_1, a$4, ((1 + this.e) | 0));
  }
});
$p.bA = (function() {
  return 7;
});
$p.bz = (function(idx) {
  switch (idx) {
    case 0: {
      return this.b;
      break;
    }
    case 1: {
      return this.ax;
      break;
    }
    case 2: {
      return this.ay;
      break;
    }
    case 3: {
      return this.ad;
      break;
    }
    case 4: {
      return this.af;
      break;
    }
    case 5: {
      return this.ae;
      break;
    }
    case 6: {
      return this.d;
      break;
    }
    default: {
      throw new $c_s_MatchError(idx);
    }
  }
});
$p.l = (function(v1) {
  var index = (v1 | 0);
  if (((index >= 0) && (index < this.e))) {
    var io = ((index - this.at) | 0);
    if ((io >= 0)) {
      var i4 = ((io >>> 15) | 0);
      var i3 = (31 & ((io >>> 10) | 0));
      var i2 = (31 & ((io >>> 5) | 0));
      var i1 = (31 & io);
      return ((i4 < this.ad.a.length) ? this.ad.a[i4].a[i3].a[i2].a[i1] : ((i3 < this.af.a.length) ? this.af.a[i3].a[i2].a[i1] : ((i2 < this.ae.a.length) ? this.ae.a[i2].a[i1] : this.d.a[i1])));
    } else if ((index >= this.as)) {
      var io$2 = ((index - this.as) | 0);
      return this.ay.a[((io$2 >>> 10) | 0)].a[(31 & ((io$2 >>> 5) | 0))].a[(31 & io$2)];
    } else if ((index >= this.ar)) {
      var io$3 = ((index - this.ar) | 0);
      return this.ax.a[((io$3 >>> 5) | 0)].a[(31 & io$3)];
    } else {
      return this.b.a[index];
    }
  } else {
    throw this.ah(index);
  }
});
var $d_sci_Vector4 = new $TypeData().i($c_sci_Vector4, "scala.collection.immutable.Vector4", ({
  cZ: 1,
  P: 1,
  Q: 1,
  N: 1,
  F: 1,
  t: 1,
  k: 1,
  b: 1,
  c: 1,
  i: 1,
  h: 1,
  g: 1,
  e: 1,
  j: 1,
  s: 1,
  d: 1,
  r: 1,
  m: 1,
  C: 1,
  B: 1,
  w: 1,
  u: 1,
  L: 1,
  A: 1,
  p: 1,
  v: 1,
  D: 1,
  a: 1,
  x: 1
}));
/** @constructor */
function $c_sci_Vector5(_prefix1, len1, prefix2, len12, prefix3, len123, prefix4, len1234, data5, suffix4, suffix3, suffix2, _suffix1, _length0) {
  this.b = null;
  this.d = null;
  this.e = 0;
  this.a4 = 0;
  this.aj = null;
  this.a5 = 0;
  this.ak = null;
  this.a6 = 0;
  this.al = null;
  this.a7 = 0;
  this.S = null;
  this.V = null;
  this.U = null;
  this.T = null;
  this.a4 = len1;
  this.aj = prefix2;
  this.a5 = len12;
  this.ak = prefix3;
  this.a6 = len123;
  this.al = prefix4;
  this.a7 = len1234;
  this.S = data5;
  this.V = suffix4;
  this.U = suffix3;
  this.T = suffix2;
  $ct_sci_BigVector__AO__AO__I__(this, _prefix1, _suffix1, _length0);
}
$p = $c_sci_Vector5.prototype = new $h_sci_BigVector();
$p.constructor = $c_sci_Vector5;
/** @constructor */
function $h_sci_Vector5() {
}
$h_sci_Vector5.prototype = $p;
$p.C = (function(index) {
  if (((index >= 0) && (index < this.e))) {
    var io = ((index - this.a7) | 0);
    if ((io >= 0)) {
      var i5 = ((io >>> 20) | 0);
      var i4 = (31 & ((io >>> 15) | 0));
      var i3 = (31 & ((io >>> 10) | 0));
      var i2 = (31 & ((io >>> 5) | 0));
      var i1 = (31 & io);
      return ((i5 < this.S.a.length) ? this.S.a[i5].a[i4].a[i3].a[i2].a[i1] : ((i4 < this.V.a.length) ? this.V.a[i4].a[i3].a[i2].a[i1] : ((i3 < this.U.a.length) ? this.U.a[i3].a[i2].a[i1] : ((i2 < this.T.a.length) ? this.T.a[i2].a[i1] : this.d.a[i1]))));
    } else if ((index >= this.a6)) {
      var io$2 = ((index - this.a6) | 0);
      return this.al.a[((io$2 >>> 15) | 0)].a[(31 & ((io$2 >>> 10) | 0))].a[(31 & ((io$2 >>> 5) | 0))].a[(31 & io$2)];
    } else if ((index >= this.a5)) {
      var io$3 = ((index - this.a5) | 0);
      return this.ak.a[((io$3 >>> 10) | 0)].a[(31 & ((io$3 >>> 5) | 0))].a[(31 & io$3)];
    } else if ((index >= this.a4)) {
      var io$4 = ((index - this.a4) | 0);
      return this.aj.a[((io$4 >>> 5) | 0)].a[(31 & io$4)];
    } else {
      return this.b.a[index];
    }
  } else {
    throw this.ah(index);
  }
});
$p.ca = (function(index, elem) {
  if (((index >= 0) && (index < this.e))) {
    if ((index >= this.a7)) {
      var io = ((index - this.a7) | 0);
      var i5 = ((io >>> 20) | 0);
      var i4 = (31 & ((io >>> 15) | 0));
      var i3 = (31 & ((io >>> 10) | 0));
      var i2 = (31 & ((io >>> 5) | 0));
      var i1 = (31 & io);
      if ((i5 < this.S.a.length)) {
        var a5 = this.S;
        var a5c = a5.c();
        var a4 = a5c.a[i5];
        var a4c = a4.c();
        var a3 = a4c.a[i4];
        var a3c = a3.c();
        var a2 = a3c.a[i3];
        var a2c = a2.c();
        var a1 = a2c.a[i2];
        var a1c = a1.c();
        a1c.a[i1] = elem;
        a2c.a[i2] = a1c;
        a3c.a[i3] = a2c;
        a4c.a[i4] = a3c;
        a5c.a[i5] = a4c;
        return new $c_sci_Vector5(this.b, this.a4, this.aj, this.a5, this.ak, this.a6, this.al, this.a7, a5c, this.V, this.U, this.T, this.d, this.e);
      } else if ((i4 < this.V.a.length)) {
        var a4$1 = this.V;
        var a4c$1 = a4$1.c();
        var a3$1 = a4c$1.a[i4];
        var a3c$1 = a3$1.c();
        var a2$1 = a3c$1.a[i3];
        var a2c$1 = a2$1.c();
        var a1$1 = a2c$1.a[i2];
        var a1c$1 = a1$1.c();
        a1c$1.a[i1] = elem;
        a2c$1.a[i2] = a1c$1;
        a3c$1.a[i3] = a2c$1;
        a4c$1.a[i4] = a3c$1;
        return new $c_sci_Vector5(this.b, this.a4, this.aj, this.a5, this.ak, this.a6, this.al, this.a7, this.S, a4c$1, this.U, this.T, this.d, this.e);
      } else if ((i3 < this.U.a.length)) {
        var a3$2 = this.U;
        var a3c$2 = a3$2.c();
        var a2$2 = a3c$2.a[i3];
        var a2c$2 = a2$2.c();
        var a1$2 = a2c$2.a[i2];
        var a1c$2 = a1$2.c();
        a1c$2.a[i1] = elem;
        a2c$2.a[i2] = a1c$2;
        a3c$2.a[i3] = a2c$2;
        return new $c_sci_Vector5(this.b, this.a4, this.aj, this.a5, this.ak, this.a6, this.al, this.a7, this.S, this.V, a3c$2, this.T, this.d, this.e);
      } else if ((i2 < this.T.a.length)) {
        var a2$3 = this.T;
        var a2c$3 = a2$3.c();
        var a1$3 = a2c$3.a[i2];
        var a1c$3 = a1$3.c();
        a1c$3.a[i1] = elem;
        a2c$3.a[i2] = a1c$3;
        return new $c_sci_Vector5(this.b, this.a4, this.aj, this.a5, this.ak, this.a6, this.al, this.a7, this.S, this.V, this.U, a2c$3, this.d, this.e);
      } else {
        var a1$4 = this.d;
        var a1c$4 = a1$4.c();
        a1c$4.a[i1] = elem;
        return new $c_sci_Vector5(this.b, this.a4, this.aj, this.a5, this.ak, this.a6, this.al, this.a7, this.S, this.V, this.U, this.T, a1c$4, this.e);
      }
    } else if ((index >= this.a6)) {
      var io$2 = ((index - this.a6) | 0);
      var a4$2 = this.al;
      var idx4 = ((io$2 >>> 15) | 0);
      var idx3 = (31 & ((io$2 >>> 10) | 0));
      var idx2 = (31 & ((io$2 >>> 5) | 0));
      var idx1 = (31 & io$2);
      var a4c$2 = a4$2.c();
      var a3$3 = a4c$2.a[idx4];
      var a3c$3 = a3$3.c();
      var a2$4 = a3c$3.a[idx3];
      var a2c$4 = a2$4.c();
      var a1$5 = a2c$4.a[idx2];
      var a1c$5 = a1$5.c();
      a1c$5.a[idx1] = elem;
      a2c$4.a[idx2] = a1c$5;
      a3c$3.a[idx3] = a2c$4;
      a4c$2.a[idx4] = a3c$3;
      return new $c_sci_Vector5(this.b, this.a4, this.aj, this.a5, this.ak, this.a6, a4c$2, this.a7, this.S, this.V, this.U, this.T, this.d, this.e);
    } else if ((index >= this.a5)) {
      var io$3 = ((index - this.a5) | 0);
      var a3$4 = this.ak;
      var idx3$1 = ((io$3 >>> 10) | 0);
      var idx2$1 = (31 & ((io$3 >>> 5) | 0));
      var idx1$1 = (31 & io$3);
      var a3c$4 = a3$4.c();
      var a2$5 = a3c$4.a[idx3$1];
      var a2c$5 = a2$5.c();
      var a1$6 = a2c$5.a[idx2$1];
      var a1c$6 = a1$6.c();
      a1c$6.a[idx1$1] = elem;
      a2c$5.a[idx2$1] = a1c$6;
      a3c$4.a[idx3$1] = a2c$5;
      return new $c_sci_Vector5(this.b, this.a4, this.aj, this.a5, a3c$4, this.a6, this.al, this.a7, this.S, this.V, this.U, this.T, this.d, this.e);
    } else if ((index >= this.a4)) {
      var io$4 = ((index - this.a4) | 0);
      var a2$6 = this.aj;
      var idx2$2 = ((io$4 >>> 5) | 0);
      var idx1$2 = (31 & io$4);
      var a2c$6 = a2$6.c();
      var a1$7 = a2c$6.a[idx2$2];
      var a1c$7 = a1$7.c();
      a1c$7.a[idx1$2] = elem;
      a2c$6.a[idx2$2] = a1c$7;
      return new $c_sci_Vector5(this.b, this.a4, a2c$6, this.a5, this.ak, this.a6, this.al, this.a7, this.S, this.V, this.U, this.T, this.d, this.e);
    } else {
      var a1$8 = this.b;
      var a1c$8 = a1$8.c();
      a1c$8.a[index] = elem;
      return new $c_sci_Vector5(a1c$8, this.a4, this.aj, this.a5, this.ak, this.a6, this.al, this.a7, this.S, this.V, this.U, this.T, this.d, this.e);
    }
  } else {
    throw this.ah(index);
  }
});
$p.c4 = (function(elem) {
  if ((this.d.a.length < 32)) {
    var suffix1$54 = $m_sci_VectorStatics$().cO(this.d, elem);
    var length0$54 = ((1 + this.e) | 0);
    return new $c_sci_Vector5(this.b, this.a4, this.aj, this.a5, this.ak, this.a6, this.al, this.a7, this.S, this.V, this.U, this.T, suffix1$54, length0$54);
  } else if ((this.T.a.length < 31)) {
    var suffix2$41 = $m_sci_VectorStatics$().o(this.T, this.d);
    var a = new $ac_O(1);
    a.a[0] = elem;
    var length0$55 = ((1 + this.e) | 0);
    return new $c_sci_Vector5(this.b, this.a4, this.aj, this.a5, this.ak, this.a6, this.al, this.a7, this.S, this.V, this.U, suffix2$41, a, length0$55);
  } else if ((this.U.a.length < 31)) {
    var suffix3$29 = $m_sci_VectorStatics$().o(this.U, $m_sci_VectorStatics$().o(this.T, this.d));
    var a$1 = new $ac_O(1);
    a$1.a[0] = elem;
    var length0$56 = ((1 + this.e) | 0);
    return new $c_sci_Vector5(this.b, this.a4, this.aj, this.a5, this.ak, this.a6, this.al, this.a7, this.S, this.V, suffix3$29, $m_sci_VectorStatics$().aG, a$1, length0$56);
  } else if ((this.V.a.length < 31)) {
    var suffix4$12 = $m_sci_VectorStatics$().o(this.V, $m_sci_VectorStatics$().o(this.U, $m_sci_VectorStatics$().o(this.T, this.d)));
    var a$2 = new $ac_O(1);
    a$2.a[0] = elem;
    var length0$57 = ((1 + this.e) | 0);
    return new $c_sci_Vector5(this.b, this.a4, this.aj, this.a5, this.ak, this.a6, this.al, this.a7, this.S, suffix4$12, $m_sci_VectorStatics$().bw, $m_sci_VectorStatics$().aG, a$2, length0$57);
  } else if ((this.S.a.length < 30)) {
    var data5$13 = $m_sci_VectorStatics$().o(this.S, $m_sci_VectorStatics$().o(this.V, $m_sci_VectorStatics$().o(this.U, $m_sci_VectorStatics$().o(this.T, this.d))));
    var a$3 = new $ac_O(1);
    a$3.a[0] = elem;
    var length0$58 = ((1 + this.e) | 0);
    return new $c_sci_Vector5(this.b, this.a4, this.aj, this.a5, this.ak, this.a6, this.al, this.a7, data5$13, $m_sci_VectorStatics$().cL, $m_sci_VectorStatics$().bw, $m_sci_VectorStatics$().aG, a$3, length0$58);
  } else {
    var $x_14 = this.b;
    var $x_13 = this.a4;
    var $x_12 = this.aj;
    var $x_11 = this.a5;
    var $x_10 = this.ak;
    var $x_9 = this.a6;
    var $x_8 = this.al;
    var $x_7 = this.a7;
    var $x_6 = this.S;
    var $x_5 = this.a7;
    var $x_4 = $m_sci_VectorStatics$().f5;
    var x = $m_sci_VectorStatics$().o(this.V, $m_sci_VectorStatics$().o(this.U, $m_sci_VectorStatics$().o(this.T, this.d)));
    var a$4 = new ($d_O.r().r().r().r().r().C)(1);
    a$4.a[0] = x;
    var $x_3 = $m_sci_VectorStatics$().cL;
    var $x_2 = $m_sci_VectorStatics$().bw;
    var $x_1 = $m_sci_VectorStatics$().aG;
    var a$5 = new $ac_O(1);
    a$5.a[0] = elem;
    return new $c_sci_Vector6($x_14, $x_13, $x_12, $x_11, $x_10, $x_9, $x_8, $x_7, $x_6, ((31457280 + $x_5) | 0), $x_4, a$4, $x_3, $x_2, $x_1, a$5, ((1 + this.e) | 0));
  }
});
$p.bA = (function() {
  return 9;
});
$p.bz = (function(idx) {
  switch (idx) {
    case 0: {
      return this.b;
      break;
    }
    case 1: {
      return this.aj;
      break;
    }
    case 2: {
      return this.ak;
      break;
    }
    case 3: {
      return this.al;
      break;
    }
    case 4: {
      return this.S;
      break;
    }
    case 5: {
      return this.V;
      break;
    }
    case 6: {
      return this.U;
      break;
    }
    case 7: {
      return this.T;
      break;
    }
    case 8: {
      return this.d;
      break;
    }
    default: {
      throw new $c_s_MatchError(idx);
    }
  }
});
$p.l = (function(v1) {
  var index = (v1 | 0);
  if (((index >= 0) && (index < this.e))) {
    var io = ((index - this.a7) | 0);
    if ((io >= 0)) {
      var i5 = ((io >>> 20) | 0);
      var i4 = (31 & ((io >>> 15) | 0));
      var i3 = (31 & ((io >>> 10) | 0));
      var i2 = (31 & ((io >>> 5) | 0));
      var i1 = (31 & io);
      return ((i5 < this.S.a.length) ? this.S.a[i5].a[i4].a[i3].a[i2].a[i1] : ((i4 < this.V.a.length) ? this.V.a[i4].a[i3].a[i2].a[i1] : ((i3 < this.U.a.length) ? this.U.a[i3].a[i2].a[i1] : ((i2 < this.T.a.length) ? this.T.a[i2].a[i1] : this.d.a[i1]))));
    } else if ((index >= this.a6)) {
      var io$2 = ((index - this.a6) | 0);
      return this.al.a[((io$2 >>> 15) | 0)].a[(31 & ((io$2 >>> 10) | 0))].a[(31 & ((io$2 >>> 5) | 0))].a[(31 & io$2)];
    } else if ((index >= this.a5)) {
      var io$3 = ((index - this.a5) | 0);
      return this.ak.a[((io$3 >>> 10) | 0)].a[(31 & ((io$3 >>> 5) | 0))].a[(31 & io$3)];
    } else if ((index >= this.a4)) {
      var io$4 = ((index - this.a4) | 0);
      return this.aj.a[((io$4 >>> 5) | 0)].a[(31 & io$4)];
    } else {
      return this.b.a[index];
    }
  } else {
    throw this.ah(index);
  }
});
var $d_sci_Vector5 = new $TypeData().i($c_sci_Vector5, "scala.collection.immutable.Vector5", ({
  d0: 1,
  P: 1,
  Q: 1,
  N: 1,
  F: 1,
  t: 1,
  k: 1,
  b: 1,
  c: 1,
  i: 1,
  h: 1,
  g: 1,
  e: 1,
  j: 1,
  s: 1,
  d: 1,
  r: 1,
  m: 1,
  C: 1,
  B: 1,
  w: 1,
  u: 1,
  L: 1,
  A: 1,
  p: 1,
  v: 1,
  D: 1,
  a: 1,
  x: 1
}));
/** @constructor */
function $c_sci_Vector6(_prefix1, len1, prefix2, len12, prefix3, len123, prefix4, len1234, prefix5, len12345, data6, suffix5, suffix4, suffix3, suffix2, _suffix1, _length0) {
  this.b = null;
  this.d = null;
  this.e = 0;
  this.W = 0;
  this.a8 = null;
  this.X = 0;
  this.a9 = null;
  this.Y = 0;
  this.aa = null;
  this.Z = 0;
  this.ab = null;
  this.a1 = 0;
  this.J = null;
  this.N = null;
  this.M = null;
  this.L = null;
  this.K = null;
  this.W = len1;
  this.a8 = prefix2;
  this.X = len12;
  this.a9 = prefix3;
  this.Y = len123;
  this.aa = prefix4;
  this.Z = len1234;
  this.ab = prefix5;
  this.a1 = len12345;
  this.J = data6;
  this.N = suffix5;
  this.M = suffix4;
  this.L = suffix3;
  this.K = suffix2;
  $ct_sci_BigVector__AO__AO__I__(this, _prefix1, _suffix1, _length0);
}
$p = $c_sci_Vector6.prototype = new $h_sci_BigVector();
$p.constructor = $c_sci_Vector6;
/** @constructor */
function $h_sci_Vector6() {
}
$h_sci_Vector6.prototype = $p;
$p.C = (function(index) {
  if (((index >= 0) && (index < this.e))) {
    var io = ((index - this.a1) | 0);
    if ((io >= 0)) {
      var i6 = ((io >>> 25) | 0);
      var i5 = (31 & ((io >>> 20) | 0));
      var i4 = (31 & ((io >>> 15) | 0));
      var i3 = (31 & ((io >>> 10) | 0));
      var i2 = (31 & ((io >>> 5) | 0));
      var i1 = (31 & io);
      return ((i6 < this.J.a.length) ? this.J.a[i6].a[i5].a[i4].a[i3].a[i2].a[i1] : ((i5 < this.N.a.length) ? this.N.a[i5].a[i4].a[i3].a[i2].a[i1] : ((i4 < this.M.a.length) ? this.M.a[i4].a[i3].a[i2].a[i1] : ((i3 < this.L.a.length) ? this.L.a[i3].a[i2].a[i1] : ((i2 < this.K.a.length) ? this.K.a[i2].a[i1] : this.d.a[i1])))));
    } else if ((index >= this.Z)) {
      var io$2 = ((index - this.Z) | 0);
      return this.ab.a[((io$2 >>> 20) | 0)].a[(31 & ((io$2 >>> 15) | 0))].a[(31 & ((io$2 >>> 10) | 0))].a[(31 & ((io$2 >>> 5) | 0))].a[(31 & io$2)];
    } else if ((index >= this.Y)) {
      var io$3 = ((index - this.Y) | 0);
      return this.aa.a[((io$3 >>> 15) | 0)].a[(31 & ((io$3 >>> 10) | 0))].a[(31 & ((io$3 >>> 5) | 0))].a[(31 & io$3)];
    } else if ((index >= this.X)) {
      var io$4 = ((index - this.X) | 0);
      return this.a9.a[((io$4 >>> 10) | 0)].a[(31 & ((io$4 >>> 5) | 0))].a[(31 & io$4)];
    } else if ((index >= this.W)) {
      var io$5 = ((index - this.W) | 0);
      return this.a8.a[((io$5 >>> 5) | 0)].a[(31 & io$5)];
    } else {
      return this.b.a[index];
    }
  } else {
    throw this.ah(index);
  }
});
$p.ca = (function(index, elem) {
  if (((index >= 0) && (index < this.e))) {
    if ((index >= this.a1)) {
      var io = ((index - this.a1) | 0);
      var i6 = ((io >>> 25) | 0);
      var i5 = (31 & ((io >>> 20) | 0));
      var i4 = (31 & ((io >>> 15) | 0));
      var i3 = (31 & ((io >>> 10) | 0));
      var i2 = (31 & ((io >>> 5) | 0));
      var i1 = (31 & io);
      if ((i6 < this.J.a.length)) {
        var a6 = this.J;
        var a6c = a6.c();
        var a5 = a6c.a[i6];
        var a5c = a5.c();
        var a4 = a5c.a[i5];
        var a4c = a4.c();
        var a3 = a4c.a[i4];
        var a3c = a3.c();
        var a2 = a3c.a[i3];
        var a2c = a2.c();
        var a1 = a2c.a[i2];
        var a1c = a1.c();
        a1c.a[i1] = elem;
        a2c.a[i2] = a1c;
        a3c.a[i3] = a2c;
        a4c.a[i4] = a3c;
        a5c.a[i5] = a4c;
        a6c.a[i6] = a5c;
        return new $c_sci_Vector6(this.b, this.W, this.a8, this.X, this.a9, this.Y, this.aa, this.Z, this.ab, this.a1, a6c, this.N, this.M, this.L, this.K, this.d, this.e);
      } else if ((i5 < this.N.a.length)) {
        var a5$1 = this.N;
        var a5c$1 = a5$1.c();
        var a4$1 = a5c$1.a[i5];
        var a4c$1 = a4$1.c();
        var a3$1 = a4c$1.a[i4];
        var a3c$1 = a3$1.c();
        var a2$1 = a3c$1.a[i3];
        var a2c$1 = a2$1.c();
        var a1$1 = a2c$1.a[i2];
        var a1c$1 = a1$1.c();
        a1c$1.a[i1] = elem;
        a2c$1.a[i2] = a1c$1;
        a3c$1.a[i3] = a2c$1;
        a4c$1.a[i4] = a3c$1;
        a5c$1.a[i5] = a4c$1;
        return new $c_sci_Vector6(this.b, this.W, this.a8, this.X, this.a9, this.Y, this.aa, this.Z, this.ab, this.a1, this.J, a5c$1, this.M, this.L, this.K, this.d, this.e);
      } else if ((i4 < this.M.a.length)) {
        var a4$2 = this.M;
        var a4c$2 = a4$2.c();
        var a3$2 = a4c$2.a[i4];
        var a3c$2 = a3$2.c();
        var a2$2 = a3c$2.a[i3];
        var a2c$2 = a2$2.c();
        var a1$2 = a2c$2.a[i2];
        var a1c$2 = a1$2.c();
        a1c$2.a[i1] = elem;
        a2c$2.a[i2] = a1c$2;
        a3c$2.a[i3] = a2c$2;
        a4c$2.a[i4] = a3c$2;
        return new $c_sci_Vector6(this.b, this.W, this.a8, this.X, this.a9, this.Y, this.aa, this.Z, this.ab, this.a1, this.J, this.N, a4c$2, this.L, this.K, this.d, this.e);
      } else if ((i3 < this.L.a.length)) {
        var a3$3 = this.L;
        var a3c$3 = a3$3.c();
        var a2$3 = a3c$3.a[i3];
        var a2c$3 = a2$3.c();
        var a1$3 = a2c$3.a[i2];
        var a1c$3 = a1$3.c();
        a1c$3.a[i1] = elem;
        a2c$3.a[i2] = a1c$3;
        a3c$3.a[i3] = a2c$3;
        return new $c_sci_Vector6(this.b, this.W, this.a8, this.X, this.a9, this.Y, this.aa, this.Z, this.ab, this.a1, this.J, this.N, this.M, a3c$3, this.K, this.d, this.e);
      } else if ((i2 < this.K.a.length)) {
        var a2$4 = this.K;
        var a2c$4 = a2$4.c();
        var a1$4 = a2c$4.a[i2];
        var a1c$4 = a1$4.c();
        a1c$4.a[i1] = elem;
        a2c$4.a[i2] = a1c$4;
        return new $c_sci_Vector6(this.b, this.W, this.a8, this.X, this.a9, this.Y, this.aa, this.Z, this.ab, this.a1, this.J, this.N, this.M, this.L, a2c$4, this.d, this.e);
      } else {
        var a1$5 = this.d;
        var a1c$5 = a1$5.c();
        a1c$5.a[i1] = elem;
        return new $c_sci_Vector6(this.b, this.W, this.a8, this.X, this.a9, this.Y, this.aa, this.Z, this.ab, this.a1, this.J, this.N, this.M, this.L, this.K, a1c$5, this.e);
      }
    } else if ((index >= this.Z)) {
      var io$2 = ((index - this.Z) | 0);
      var a5$2 = this.ab;
      var idx5 = ((io$2 >>> 20) | 0);
      var idx4 = (31 & ((io$2 >>> 15) | 0));
      var idx3 = (31 & ((io$2 >>> 10) | 0));
      var idx2 = (31 & ((io$2 >>> 5) | 0));
      var idx1 = (31 & io$2);
      var a5c$2 = a5$2.c();
      var a4$3 = a5c$2.a[idx5];
      var a4c$3 = a4$3.c();
      var a3$4 = a4c$3.a[idx4];
      var a3c$4 = a3$4.c();
      var a2$5 = a3c$4.a[idx3];
      var a2c$5 = a2$5.c();
      var a1$6 = a2c$5.a[idx2];
      var a1c$6 = a1$6.c();
      a1c$6.a[idx1] = elem;
      a2c$5.a[idx2] = a1c$6;
      a3c$4.a[idx3] = a2c$5;
      a4c$3.a[idx4] = a3c$4;
      a5c$2.a[idx5] = a4c$3;
      return new $c_sci_Vector6(this.b, this.W, this.a8, this.X, this.a9, this.Y, this.aa, this.Z, a5c$2, this.a1, this.J, this.N, this.M, this.L, this.K, this.d, this.e);
    } else if ((index >= this.Y)) {
      var io$3 = ((index - this.Y) | 0);
      var a4$4 = this.aa;
      var idx4$1 = ((io$3 >>> 15) | 0);
      var idx3$1 = (31 & ((io$3 >>> 10) | 0));
      var idx2$1 = (31 & ((io$3 >>> 5) | 0));
      var idx1$1 = (31 & io$3);
      var a4c$4 = a4$4.c();
      var a3$5 = a4c$4.a[idx4$1];
      var a3c$5 = a3$5.c();
      var a2$6 = a3c$5.a[idx3$1];
      var a2c$6 = a2$6.c();
      var a1$7 = a2c$6.a[idx2$1];
      var a1c$7 = a1$7.c();
      a1c$7.a[idx1$1] = elem;
      a2c$6.a[idx2$1] = a1c$7;
      a3c$5.a[idx3$1] = a2c$6;
      a4c$4.a[idx4$1] = a3c$5;
      return new $c_sci_Vector6(this.b, this.W, this.a8, this.X, this.a9, this.Y, a4c$4, this.Z, this.ab, this.a1, this.J, this.N, this.M, this.L, this.K, this.d, this.e);
    } else if ((index >= this.X)) {
      var io$4 = ((index - this.X) | 0);
      var a3$6 = this.a9;
      var idx3$2 = ((io$4 >>> 10) | 0);
      var idx2$2 = (31 & ((io$4 >>> 5) | 0));
      var idx1$2 = (31 & io$4);
      var a3c$6 = a3$6.c();
      var a2$7 = a3c$6.a[idx3$2];
      var a2c$7 = a2$7.c();
      var a1$8 = a2c$7.a[idx2$2];
      var a1c$8 = a1$8.c();
      a1c$8.a[idx1$2] = elem;
      a2c$7.a[idx2$2] = a1c$8;
      a3c$6.a[idx3$2] = a2c$7;
      return new $c_sci_Vector6(this.b, this.W, this.a8, this.X, a3c$6, this.Y, this.aa, this.Z, this.ab, this.a1, this.J, this.N, this.M, this.L, this.K, this.d, this.e);
    } else if ((index >= this.W)) {
      var io$5 = ((index - this.W) | 0);
      var a2$8 = this.a8;
      var idx2$3 = ((io$5 >>> 5) | 0);
      var idx1$3 = (31 & io$5);
      var a2c$8 = a2$8.c();
      var a1$9 = a2c$8.a[idx2$3];
      var a1c$9 = a1$9.c();
      a1c$9.a[idx1$3] = elem;
      a2c$8.a[idx2$3] = a1c$9;
      return new $c_sci_Vector6(this.b, this.W, a2c$8, this.X, this.a9, this.Y, this.aa, this.Z, this.ab, this.a1, this.J, this.N, this.M, this.L, this.K, this.d, this.e);
    } else {
      var a1$10 = this.b;
      var a1c$10 = a1$10.c();
      a1c$10.a[index] = elem;
      return new $c_sci_Vector6(a1c$10, this.W, this.a8, this.X, this.a9, this.Y, this.aa, this.Z, this.ab, this.a1, this.J, this.N, this.M, this.L, this.K, this.d, this.e);
    }
  } else {
    throw this.ah(index);
  }
});
$p.c4 = (function(elem) {
  if ((this.d.a.length < 32)) {
    var suffix1$79 = $m_sci_VectorStatics$().cO(this.d, elem);
    var length0$79 = ((1 + this.e) | 0);
    return new $c_sci_Vector6(this.b, this.W, this.a8, this.X, this.a9, this.Y, this.aa, this.Z, this.ab, this.a1, this.J, this.N, this.M, this.L, this.K, suffix1$79, length0$79);
  } else if ((this.K.a.length < 31)) {
    var suffix2$63 = $m_sci_VectorStatics$().o(this.K, this.d);
    var a = new $ac_O(1);
    a.a[0] = elem;
    var length0$80 = ((1 + this.e) | 0);
    return new $c_sci_Vector6(this.b, this.W, this.a8, this.X, this.a9, this.Y, this.aa, this.Z, this.ab, this.a1, this.J, this.N, this.M, this.L, suffix2$63, a, length0$80);
  } else if ((this.L.a.length < 31)) {
    var suffix3$52 = $m_sci_VectorStatics$().o(this.L, $m_sci_VectorStatics$().o(this.K, this.d));
    var a$1 = new $ac_O(1);
    a$1.a[0] = elem;
    var length0$81 = ((1 + this.e) | 0);
    return new $c_sci_Vector6(this.b, this.W, this.a8, this.X, this.a9, this.Y, this.aa, this.Z, this.ab, this.a1, this.J, this.N, this.M, suffix3$52, $m_sci_VectorStatics$().aG, a$1, length0$81);
  } else if ((this.M.a.length < 31)) {
    var suffix4$36 = $m_sci_VectorStatics$().o(this.M, $m_sci_VectorStatics$().o(this.L, $m_sci_VectorStatics$().o(this.K, this.d)));
    var a$2 = new $ac_O(1);
    a$2.a[0] = elem;
    var length0$82 = ((1 + this.e) | 0);
    return new $c_sci_Vector6(this.b, this.W, this.a8, this.X, this.a9, this.Y, this.aa, this.Z, this.ab, this.a1, this.J, this.N, suffix4$36, $m_sci_VectorStatics$().bw, $m_sci_VectorStatics$().aG, a$2, length0$82);
  } else if ((this.N.a.length < 31)) {
    var suffix5$15 = $m_sci_VectorStatics$().o(this.N, $m_sci_VectorStatics$().o(this.M, $m_sci_VectorStatics$().o(this.L, $m_sci_VectorStatics$().o(this.K, this.d))));
    var a$3 = new $ac_O(1);
    a$3.a[0] = elem;
    var length0$83 = ((1 + this.e) | 0);
    return new $c_sci_Vector6(this.b, this.W, this.a8, this.X, this.a9, this.Y, this.aa, this.Z, this.ab, this.a1, this.J, suffix5$15, $m_sci_VectorStatics$().cL, $m_sci_VectorStatics$().bw, $m_sci_VectorStatics$().aG, a$3, length0$83);
  } else if ((this.J.a.length < 62)) {
    var data6$16 = $m_sci_VectorStatics$().o(this.J, $m_sci_VectorStatics$().o(this.N, $m_sci_VectorStatics$().o(this.M, $m_sci_VectorStatics$().o(this.L, $m_sci_VectorStatics$().o(this.K, this.d)))));
    var a$4 = new $ac_O(1);
    a$4.a[0] = elem;
    var length0$84 = ((1 + this.e) | 0);
    return new $c_sci_Vector6(this.b, this.W, this.a8, this.X, this.a9, this.Y, this.aa, this.Z, this.ab, this.a1, data6$16, $m_sci_VectorStatics$().ee, $m_sci_VectorStatics$().cL, $m_sci_VectorStatics$().bw, $m_sci_VectorStatics$().aG, a$4, length0$84);
  } else {
    throw $ct_jl_IllegalArgumentException__(new $c_jl_IllegalArgumentException());
  }
});
$p.bA = (function() {
  return 11;
});
$p.bz = (function(idx) {
  switch (idx) {
    case 0: {
      return this.b;
      break;
    }
    case 1: {
      return this.a8;
      break;
    }
    case 2: {
      return this.a9;
      break;
    }
    case 3: {
      return this.aa;
      break;
    }
    case 4: {
      return this.ab;
      break;
    }
    case 5: {
      return this.J;
      break;
    }
    case 6: {
      return this.N;
      break;
    }
    case 7: {
      return this.M;
      break;
    }
    case 8: {
      return this.L;
      break;
    }
    case 9: {
      return this.K;
      break;
    }
    case 10: {
      return this.d;
      break;
    }
    default: {
      throw new $c_s_MatchError(idx);
    }
  }
});
$p.l = (function(v1) {
  var index = (v1 | 0);
  if (((index >= 0) && (index < this.e))) {
    var io = ((index - this.a1) | 0);
    if ((io >= 0)) {
      var i6 = ((io >>> 25) | 0);
      var i5 = (31 & ((io >>> 20) | 0));
      var i4 = (31 & ((io >>> 15) | 0));
      var i3 = (31 & ((io >>> 10) | 0));
      var i2 = (31 & ((io >>> 5) | 0));
      var i1 = (31 & io);
      return ((i6 < this.J.a.length) ? this.J.a[i6].a[i5].a[i4].a[i3].a[i2].a[i1] : ((i5 < this.N.a.length) ? this.N.a[i5].a[i4].a[i3].a[i2].a[i1] : ((i4 < this.M.a.length) ? this.M.a[i4].a[i3].a[i2].a[i1] : ((i3 < this.L.a.length) ? this.L.a[i3].a[i2].a[i1] : ((i2 < this.K.a.length) ? this.K.a[i2].a[i1] : this.d.a[i1])))));
    } else if ((index >= this.Z)) {
      var io$2 = ((index - this.Z) | 0);
      return this.ab.a[((io$2 >>> 20) | 0)].a[(31 & ((io$2 >>> 15) | 0))].a[(31 & ((io$2 >>> 10) | 0))].a[(31 & ((io$2 >>> 5) | 0))].a[(31 & io$2)];
    } else if ((index >= this.Y)) {
      var io$3 = ((index - this.Y) | 0);
      return this.aa.a[((io$3 >>> 15) | 0)].a[(31 & ((io$3 >>> 10) | 0))].a[(31 & ((io$3 >>> 5) | 0))].a[(31 & io$3)];
    } else if ((index >= this.X)) {
      var io$4 = ((index - this.X) | 0);
      return this.a9.a[((io$4 >>> 10) | 0)].a[(31 & ((io$4 >>> 5) | 0))].a[(31 & io$4)];
    } else if ((index >= this.W)) {
      var io$5 = ((index - this.W) | 0);
      return this.a8.a[((io$5 >>> 5) | 0)].a[(31 & io$5)];
    } else {
      return this.b.a[index];
    }
  } else {
    throw this.ah(index);
  }
});
var $d_sci_Vector6 = new $TypeData().i($c_sci_Vector6, "scala.collection.immutable.Vector6", ({
  d1: 1,
  P: 1,
  Q: 1,
  N: 1,
  F: 1,
  t: 1,
  k: 1,
  b: 1,
  c: 1,
  i: 1,
  h: 1,
  g: 1,
  e: 1,
  j: 1,
  s: 1,
  d: 1,
  r: 1,
  m: 1,
  C: 1,
  B: 1,
  w: 1,
  u: 1,
  L: 1,
  A: 1,
  p: 1,
  v: 1,
  D: 1,
  a: 1,
  x: 1
}));
function $ct_scm_StringBuilder__jl_StringBuilder__($thiz, underlying) {
  $thiz.bd = underlying;
  return $thiz;
}
function $ct_scm_StringBuilder__($thiz) {
  $ct_scm_StringBuilder__jl_StringBuilder__($thiz, new $c_jl_StringBuilder());
  return $thiz;
}
/** @constructor */
function $c_scm_StringBuilder() {
  this.bd = null;
}
$p = $c_scm_StringBuilder.prototype = new $h_scm_AbstractSeq();
$p.constructor = $c_scm_StringBuilder;
/** @constructor */
function $h_scm_StringBuilder() {
}
$h_scm_StringBuilder.prototype = $p;
$p.aS = (function(elems) {
  return $f_scm_Growable__addAll__sc_IterableOnce__scm_Growable(this, elems);
});
$p.p = (function() {
  return new $c_sc_IndexedSeqView$IndexedSeqViewIterator(new $c_sc_IndexedSeqView$Id(this));
});
$p.bN = (function(len) {
  var x = this.bd.w();
  return ((x === len) ? 0 : ((x < len) ? (-1) : 1));
});
$p.cv = (function() {
  return "IndexedSeq";
});
$p.w = (function() {
  return this.bd.w();
});
$p.D = (function() {
  return this.bd.w();
});
$p.g6 = (function(x) {
  var this$1 = this.bd;
  var str = ("" + $cToS(x));
  this$1.an = (this$1.an + str);
  return this;
});
$p.A = (function() {
  return this.bd.an;
});
$p.n = (function() {
  return (this.bd.w() === 0);
});
$p.C = (function(i) {
  return $bC(this.bd.fy(i));
});
$p.l = (function(v1) {
  var i = (v1 | 0);
  return $bC(this.bd.fy(i));
});
$p.b2 = (function(elem) {
  return this.g6($uC(elem));
});
$p.aW = (function() {
  return this.bd.an;
});
var $d_scm_StringBuilder = new $TypeData().i($c_scm_StringBuilder, "scala.collection.mutable.StringBuilder", ({
  df: 1,
  ac: 1,
  t: 1,
  k: 1,
  b: 1,
  c: 1,
  i: 1,
  h: 1,
  g: 1,
  e: 1,
  j: 1,
  s: 1,
  d: 1,
  r: 1,
  ae: 1,
  R: 1,
  ad: 1,
  ag: 1,
  af: 1,
  H: 1,
  I: 1,
  G: 1,
  Y: 1,
  w: 1,
  u: 1,
  aW: 1,
  aV: 1,
  a5: 1,
  a: 1
}));
function $isArrayOf_scm_LinkedHashMap(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.db)));
}
function $p_scm_ListBuffer__copyElems__V($thiz) {
  var buf = new $c_scm_ListBuffer().eF($thiz);
  $thiz.bb = buf.bb;
  $thiz.bJ = buf.bJ;
  $thiz.dF = false;
}
function $p_scm_ListBuffer__ensureUnaliased__V($thiz) {
  $thiz.dG = ((1 + $thiz.dG) | 0);
  if ($thiz.dF) {
    $p_scm_ListBuffer__copyElems__V($thiz);
  }
}
/** @constructor */
function $c_scm_ListBuffer() {
  this.dG = 0;
  this.bb = null;
  this.bJ = null;
  this.dF = false;
  this.bc = 0;
  this.dG = 0;
  this.bb = $m_sci_Nil$();
  this.bJ = null;
  this.dF = false;
  this.bc = 0;
}
$p = $c_scm_ListBuffer.prototype = new $h_scm_AbstractBuffer();
$p.constructor = $c_scm_ListBuffer;
/** @constructor */
function $h_scm_ListBuffer() {
}
$h_scm_ListBuffer.prototype = $p;
$p.p = (function() {
  return new $c_scm_MutationTracker$CheckedIterator(this.bb.p(), new $c_sr_AbstractFunction0_$$Lambda$a02b774b97db8234e08c6a02dd06557c99779855((() => this.dG)));
});
$p.dq = (function() {
  return $m_scm_ListBuffer$();
});
$p.C = (function(i) {
  return $f_sc_LinearSeqOps__apply__I__O(this.bb, i);
});
$p.w = (function() {
  return this.bc;
});
$p.D = (function() {
  return this.bc;
});
$p.n = (function() {
  return (this.bc === 0);
});
$p.fU = (function() {
  this.dF = (!this.n());
  return this.bb;
});
$p.gc = (function(elem) {
  $p_scm_ListBuffer__ensureUnaliased__V(this);
  var last1 = new $c_sci_$colon$colon(elem, $m_sci_Nil$());
  if ((this.bc === 0)) {
    this.bb = last1;
  } else {
    var x$proxy2 = this.bJ;
    if ((x$proxy2 === null)) {
      $m_sr_Scala3RunTime$().b4();
    }
    x$proxy2.aY = last1;
  }
  this.bJ = last1;
  this.bc = ((1 + this.bc) | 0);
  return this;
});
$p.eF = (function(xs) {
  var it = xs.p();
  if (it.k()) {
    var len = 1;
    var last0 = new $c_sci_$colon$colon(it.h(), $m_sci_Nil$());
    this.bb = last0;
    while (it.k()) {
      var last1 = new $c_sci_$colon$colon(it.h(), $m_sci_Nil$());
      last0.aY = last1;
      last0 = last1;
      len = ((1 + len) | 0);
    }
    this.bc = len;
    this.bJ = last0;
  }
  return this;
});
$p.g5 = (function(xs) {
  var it = xs.p();
  if (it.k()) {
    var fresh = new $c_scm_ListBuffer().eF(it);
    $p_scm_ListBuffer__ensureUnaliased__V(this);
    if ((this.bc === 0)) {
      this.bb = fresh.bb;
    } else {
      var x$proxy3 = this.bJ;
      if ((x$proxy3 === null)) {
        $m_sr_Scala3RunTime$().b4();
      }
      x$proxy3.aY = fresh.bb;
    }
    this.bJ = fresh.bJ;
    this.bc = ((this.bc + fresh.bc) | 0);
  }
  return this;
});
$p.cv = (function() {
  return "ListBuffer";
});
$p.cp = (function() {
  return $m_scm_ListBuffer$();
});
$p.l = (function(v1) {
  var i = (v1 | 0);
  return $f_sc_LinearSeqOps__apply__I__O(this.bb, i);
});
$p.aW = (function() {
  return this.fU();
});
$p.b2 = (function(elem) {
  return this.gc(elem);
});
$p.aS = (function(elems) {
  return this.g5(elems);
});
function $isArrayOf_scm_ListBuffer(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.aX)));
}
var $d_scm_ListBuffer = new $TypeData().i($c_scm_ListBuffer, "scala.collection.mutable.ListBuffer", ({
  aX: 1,
  aT: 1,
  ac: 1,
  t: 1,
  k: 1,
  b: 1,
  c: 1,
  i: 1,
  h: 1,
  g: 1,
  e: 1,
  j: 1,
  s: 1,
  d: 1,
  r: 1,
  ae: 1,
  R: 1,
  ad: 1,
  ag: 1,
  af: 1,
  H: 1,
  I: 1,
  aY: 1,
  aU: 1,
  p: 1,
  v: 1,
  G: 1,
  Y: 1,
  a: 1,
  x: 1
}));
function $ct_sjs_js_WrappedArray__sjs_js_Array__($thiz, array) {
  $thiz.c2 = array;
  return $thiz;
}
function $ct_sjs_js_WrappedArray__($thiz) {
  $ct_sjs_js_WrappedArray__sjs_js_Array__($thiz, []);
  return $thiz;
}
/** @constructor */
function $c_sjs_js_WrappedArray() {
  this.c2 = null;
}
$p = $c_sjs_js_WrappedArray.prototype = new $h_scm_AbstractBuffer();
$p.constructor = $c_sjs_js_WrappedArray;
/** @constructor */
function $h_sjs_js_WrappedArray() {
}
$h_sjs_js_WrappedArray.prototype = $p;
$p.cv = (function() {
  return "IndexedSeq";
});
$p.p = (function() {
  return new $c_sc_IndexedSeqView$IndexedSeqViewIterator(new $c_sc_IndexedSeqView$Id(this));
});
$p.bN = (function(len) {
  var x = (this.c2.length | 0);
  return ((x === len) ? 0 : ((x < len) ? (-1) : 1));
});
$p.dq = (function() {
  return $m_sjs_js_WrappedArray$();
});
$p.C = (function(index) {
  return this.c2[index];
});
$p.w = (function() {
  return (this.c2.length | 0);
});
$p.D = (function() {
  return (this.c2.length | 0);
});
$p.cj = (function() {
  return "WrappedArray";
});
$p.aW = (function() {
  return this;
});
$p.b2 = (function(elem) {
  this.c2.push(elem);
  return this;
});
$p.l = (function(v1) {
  var index = (v1 | 0);
  return this.c2[index];
});
$p.cp = (function() {
  return $m_sjs_js_WrappedArray$();
});
var $d_sjs_js_WrappedArray = new $TypeData().i($c_sjs_js_WrappedArray, "scala.scalajs.js.WrappedArray", ({
  dX: 1,
  aT: 1,
  ac: 1,
  t: 1,
  k: 1,
  b: 1,
  c: 1,
  i: 1,
  h: 1,
  g: 1,
  e: 1,
  j: 1,
  s: 1,
  d: 1,
  r: 1,
  ae: 1,
  R: 1,
  ad: 1,
  ag: 1,
  af: 1,
  H: 1,
  I: 1,
  aY: 1,
  aU: 1,
  v: 1,
  p: 1,
  aV: 1,
  w: 1,
  u: 1,
  aW: 1,
  da: 1,
  G: 1,
  a: 1
}));
$L0 = new $c_RTLong(0, 0);
$d_J.z = $L0;
$s_Lexample_Main__main__AT__V(new ($d_T.r().C)([]));
