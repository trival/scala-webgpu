'use strict';
var $p;
var $fileLevelThis = this;
export { $fileLevelThis as $fileLevelThis };
var $L0;
export { $L0 as $L0 };
function $Char(c) {
  this.c = c;
}
export { $Char as $Char };
$p = $Char.prototype;
$p.toString = (function() {
  return String.fromCharCode(this.c);
});
function $noIsInstance(arg0) {
  throw new TypeError("Cannot call isInstance() on a Class representing a JS trait/object");
}
export { $noIsInstance as $noIsInstance };
function $objectClone(arg0) {
  return Object.create(Object.getPrototypeOf(arg0), Object.getOwnPropertyDescriptors(arg0));
}
export { $objectClone as $objectClone };
function $objectOrArrayClone(arg0) {
  return (arg0.$classData.Z ? arg0.o() : $objectClone(arg0));
}
export { $objectOrArrayClone as $objectOrArrayClone };
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
        return null.b0();
      }
    }
  }
}
export { $objectClassName as $objectClassName };
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
        return instance.m();
      } else if ((instance instanceof $c_RTLong)) {
        return $f_jl_Long__hashCode__I(instance);
      } else if ((instance instanceof $Char)) {
        return $f_jl_Character__hashCode__I($uC(instance));
      } else {
        return $c_O.prototype.m.call(instance);
      }
    }
  }
}
export { $dp_hashCode__I as $dp_hashCode__I };
function $dp_toString__T(instance) {
  return ((instance === (void 0)) ? "undefined" : instance.toString());
}
export { $dp_toString__T as $dp_toString__T };
function $checkIntDivisor(arg0) {
  if ((arg0 === 0)) {
    throw new $c_jl_ArithmeticException("/ by zero");
  } else {
    return arg0;
  }
}
export { $checkIntDivisor as $checkIntDivisor };
function $doubleToInt(arg0) {
  return ((arg0 > 2147483647) ? 2147483647 : ((arg0 < (-2147483648)) ? (-2147483648) : (arg0 | 0)));
}
export { $doubleToInt as $doubleToInt };
function $cToS(arg0) {
  return String.fromCharCode(arg0);
}
export { $cToS as $cToS };
var $fpBitsDataView = new DataView(new ArrayBuffer(8));
export { $fpBitsDataView as $fpBitsDataView };
function $floatToBits(arg0) {
  var dataView = $fpBitsDataView;
  dataView.setFloat32(0, arg0, true);
  return dataView.getInt32(0, true);
}
export { $floatToBits as $floatToBits };
function $floatFromBits(arg0) {
  var dataView = $fpBitsDataView;
  dataView.setInt32(0, arg0, true);
  return dataView.getFloat32(0, true);
}
export { $floatFromBits as $floatFromBits };
function $doubleToBits(arg0) {
  var dataView = $fpBitsDataView;
  return $s_RTLong__fromDoubleBits__D__O__RTLong(arg0, dataView);
}
export { $doubleToBits as $doubleToBits };
function $doubleFromBits(arg0) {
  var dataView = $fpBitsDataView;
  return $s_RTLong__bitsToDouble__RTLong__O__D(arg0, dataView);
}
export { $doubleFromBits as $doubleFromBits };
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
export { $resolveSuperRef as $resolveSuperRef };
function $superGet(arg0, arg1, arg2) {
  var desc = $resolveSuperRef(arg0, arg2);
  if ((desc !== (void 0))) {
    var getter = desc.get;
    return ((getter !== (void 0)) ? getter.call(arg1) : getter.value);
  }
}
export { $superGet as $superGet };
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
export { $superSet as $superSet };
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
export { $arraycopyGeneric as $arraycopyGeneric };
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
export { $systemIdentityHashCode as $systemIdentityHashCode };
function $isByte(arg0) {
  return ((((typeof arg0) === "number") && (((arg0 << 24) >> 24) === arg0)) && ((1 / arg0) !== (1 / (-0))));
}
export { $isByte as $isByte };
function $isShort(arg0) {
  return ((((typeof arg0) === "number") && (((arg0 << 16) >> 16) === arg0)) && ((1 / arg0) !== (1 / (-0))));
}
export { $isShort as $isShort };
function $isInt(arg0) {
  return ((((typeof arg0) === "number") && ((arg0 | 0) === arg0)) && ((1 / arg0) !== (1 / (-0))));
}
export { $isInt as $isInt };
function $isFloat(arg0) {
  return (((typeof arg0) === "number") && ((arg0 !== arg0) || (Math.fround(arg0) === arg0)));
}
export { $isFloat as $isFloat };
function $bC(arg0) {
  return new $Char(arg0);
}
export { $bC as $bC };
var $bC0 = $bC(0);
export { $bC0 as $bC0 };
function $uC(arg0) {
  return ((arg0 === null) ? 0 : arg0.c);
}
export { $uC as $uC };
function $uJ(arg0) {
  return ((arg0 === null) ? $L0 : arg0);
}
export { $uJ as $uJ };
/** @constructor */
function $c_O() {
}
export { $c_O as $c_O };
$p = $c_O.prototype;
$p.constructor = $c_O;
/** @constructor */
function $h_O() {
}
export { $h_O as $h_O };
$h_O.prototype = $p;
$p.m = (function() {
  return $systemIdentityHashCode(this);
});
$p.g = (function() {
  var i = this.m();
  return (($objectClassName(this) + "@") + (i >>> 0.0).toString(16));
});
$p.toString = (function() {
  return this.g();
});
function $ac_O(arg) {
  if (((typeof arg) === "number")) {
    this.c = new Array(arg);
    for (var i = 0; (i < arg); (i++)) {
      this.c[i] = null;
    }
  } else {
    this.c = arg;
  }
}
export { $ac_O as $ac_O };
$p = $ac_O.prototype = new $h_O();
$p.constructor = $ac_O;
$p.s = (function(srcPos, dest, destPos, length) {
  $arraycopyGeneric(this.c, srcPos, dest.c, destPos, length);
});
$p.o = (function() {
  return new $ac_O(this.c.slice());
});
function $ah_O() {
}
export { $ah_O as $ah_O };
$ah_O.prototype = $p;
function $ac_Z(arg) {
  if (((typeof arg) === "number")) {
    this.c = new Array(arg);
    for (var i = 0; (i < arg); (i++)) {
      this.c[i] = false;
    }
  } else {
    this.c = arg;
  }
}
export { $ac_Z as $ac_Z };
$p = $ac_Z.prototype = new $h_O();
$p.constructor = $ac_Z;
$p.s = (function(srcPos, dest, destPos, length) {
  $arraycopyGeneric(this.c, srcPos, dest.c, destPos, length);
});
$p.o = (function() {
  return new $ac_Z(this.c.slice());
});
function $ac_C(arg) {
  if (((typeof arg) === "number")) {
    this.c = new Uint16Array(arg);
  } else {
    this.c = arg;
  }
}
export { $ac_C as $ac_C };
$p = $ac_C.prototype = new $h_O();
$p.constructor = $ac_C;
$p.s = (function(srcPos, dest, destPos, length) {
  dest.c.set(this.c.subarray(srcPos, ((srcPos + length) | 0)), destPos);
});
$p.o = (function() {
  return new $ac_C(this.c.slice());
});
function $ac_B(arg) {
  if (((typeof arg) === "number")) {
    this.c = new Int8Array(arg);
  } else {
    this.c = arg;
  }
}
export { $ac_B as $ac_B };
$p = $ac_B.prototype = new $h_O();
$p.constructor = $ac_B;
$p.s = (function(srcPos, dest, destPos, length) {
  dest.c.set(this.c.subarray(srcPos, ((srcPos + length) | 0)), destPos);
});
$p.o = (function() {
  return new $ac_B(this.c.slice());
});
function $ac_S(arg) {
  if (((typeof arg) === "number")) {
    this.c = new Int16Array(arg);
  } else {
    this.c = arg;
  }
}
export { $ac_S as $ac_S };
$p = $ac_S.prototype = new $h_O();
$p.constructor = $ac_S;
$p.s = (function(srcPos, dest, destPos, length) {
  dest.c.set(this.c.subarray(srcPos, ((srcPos + length) | 0)), destPos);
});
$p.o = (function() {
  return new $ac_S(this.c.slice());
});
function $ac_I(arg) {
  if (((typeof arg) === "number")) {
    this.c = new Int32Array(arg);
  } else {
    this.c = arg;
  }
}
export { $ac_I as $ac_I };
$p = $ac_I.prototype = new $h_O();
$p.constructor = $ac_I;
$p.s = (function(srcPos, dest, destPos, length) {
  dest.c.set(this.c.subarray(srcPos, ((srcPos + length) | 0)), destPos);
});
$p.o = (function() {
  return new $ac_I(this.c.slice());
});
function $ac_J(arg) {
  if (((typeof arg) === "number")) {
    this.c = new Array(arg);
    for (var i = 0; (i < arg); (i++)) {
      this.c[i] = $L0;
    }
  } else {
    this.c = arg;
  }
}
export { $ac_J as $ac_J };
$p = $ac_J.prototype = new $h_O();
$p.constructor = $ac_J;
$p.s = (function(srcPos, dest, destPos, length) {
  $arraycopyGeneric(this.c, srcPos, dest.c, destPos, length);
});
$p.o = (function() {
  return new $ac_J(this.c.slice());
});
function $ac_F(arg) {
  if (((typeof arg) === "number")) {
    this.c = new Float32Array(arg);
  } else {
    this.c = arg;
  }
}
export { $ac_F as $ac_F };
$p = $ac_F.prototype = new $h_O();
$p.constructor = $ac_F;
$p.s = (function(srcPos, dest, destPos, length) {
  dest.c.set(this.c.subarray(srcPos, ((srcPos + length) | 0)), destPos);
});
$p.o = (function() {
  return new $ac_F(this.c.slice());
});
function $ac_D(arg) {
  if (((typeof arg) === "number")) {
    this.c = new Float64Array(arg);
  } else {
    this.c = arg;
  }
}
export { $ac_D as $ac_D };
$p = $ac_D.prototype = new $h_O();
$p.constructor = $ac_D;
$p.s = (function(srcPos, dest, destPos, length) {
  dest.c.set(this.c.subarray(srcPos, ((srcPos + length) | 0)), destPos);
});
$p.o = (function() {
  return new $ac_D(this.c.slice());
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
export { $TypeData as $TypeData };
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
    q: 1,
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
      this.c = new Array(arg);
      for (var i = 0; (i < arg); (i++)) {
        this.c[i] = null;
      }
    } else {
      this.c = arg;
    }
  }
  var $p = ArrayClass.prototype = new $ah_O();
  $p.constructor = ArrayClass;
  $p.s = (function(srcPos, dest, destPos, length) {
    $arraycopyGeneric(this.c, srcPos, dest.c, destPos, length);
  });
  $p.o = (function() {
    return new ArrayClass(this.c.slice());
  });
  $p.$classData = this;
  var arrayBase = (componentData.B || componentData);
  var arrayDepth = (componentData.D + 1);
  var name = ("[" + componentData.E);
  this.C = ArrayClass;
  this.n = ({
    q: 1,
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
function $isArrayOf_O(obj, depth) {
  var data = (obj && obj.$classData);
  if ((!data)) {
    return false;
  } else {
    var arrayDepth = data.D;
    return ((arrayDepth === depth) ? (!data.B.X) : (arrayDepth > depth));
  }
}
export { $isArrayOf_O as $isArrayOf_O };
function $isArrayOf_Z(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && (obj.$classData.B === $d_Z))));
}
export { $isArrayOf_Z as $isArrayOf_Z };
function $isArrayOf_C(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && (obj.$classData.B === $d_C))));
}
export { $isArrayOf_C as $isArrayOf_C };
function $isArrayOf_B(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && (obj.$classData.B === $d_B))));
}
export { $isArrayOf_B as $isArrayOf_B };
function $isArrayOf_S(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && (obj.$classData.B === $d_S))));
}
export { $isArrayOf_S as $isArrayOf_S };
function $isArrayOf_I(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && (obj.$classData.B === $d_I))));
}
export { $isArrayOf_I as $isArrayOf_I };
function $isArrayOf_J(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && (obj.$classData.B === $d_J))));
}
export { $isArrayOf_J as $isArrayOf_J };
function $isArrayOf_F(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && (obj.$classData.B === $d_F))));
}
export { $isArrayOf_F as $isArrayOf_F };
function $isArrayOf_D(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && (obj.$classData.B === $d_D))));
}
export { $isArrayOf_D as $isArrayOf_D };
var $d_O = new $TypeData();
export { $d_O as $d_O };
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
export { $d_V as $d_V };
var $d_Z = new $TypeData().p(false, "Z", "boolean", $ac_Z, (void 0));
export { $d_Z as $d_Z };
var $d_C = new $TypeData().p(0, "C", "char", $ac_C, Uint16Array);
export { $d_C as $d_C };
var $d_B = new $TypeData().p(0, "B", "byte", $ac_B, Int8Array);
export { $d_B as $d_B };
var $d_S = new $TypeData().p(0, "S", "short", $ac_S, Int16Array);
export { $d_S as $d_S };
var $d_I = new $TypeData().p(0, "I", "int", $ac_I, Int32Array);
export { $d_I as $d_I };
var $d_J = new $TypeData().p(null, "J", "long", $ac_J, (void 0));
export { $d_J as $d_J };
var $d_F = new $TypeData().p(0.0, "F", "float", $ac_F, Float32Array);
export { $d_F as $d_F };
var $d_D = new $TypeData().p(0.0, "D", "double", $ac_D, Float64Array);
export { $d_D as $d_D };
function $p_Lgpu_derive$__generateCombinedStructFromLists__T__sjs_js_Array__sjs_js_Array__sjs_js_Array__T($thiz, structName, locNames, locTypes, builtins) {
  var array$1 = $m_sjs_js_ArrayOps$().aA($m_sjs_js_ArrayOps$().az(locNames, new $c_sjs_js_WrappedArray(locTypes)));
  var len = (array$1.length | 0);
  var res = new Array(len);
  var i = 0;
  while ((i < len)) {
    var $x_2 = i;
    var x0 = array$1[i];
    matchResult3: {
      var $x_1;
      if ((x0 !== null)) {
        var x11 = x0.j;
        if ((x11 !== null)) {
          var name = x11.j;
          var typ = x11.z;
          var $x_1 = (((((("  @location(" + (x0.z | 0)) + ") ") + name) + ": ") + typ) + ",");
          break matchResult3;
        }
      }
      throw new $c_s_MatchError(x0);
    }
    res[$x_2] = $x_1;
    i = ((1 + i) | 0);
  }
  var len$1 = (builtins.length | 0);
  var res$1 = new Array(len$1);
  var i$1 = 0;
  while ((i$1 < len$1)) {
    var $x_4 = i$1;
    var x0$1 = builtins[i$1];
    matchResult4: {
      var $x_3;
      if ((x0$1 !== null)) {
        var name$1 = x0$1.P;
        var builtin = x0$1.Q;
        var typ$1 = x0$1.R;
        var $x_3 = (((((("  @builtin(" + builtin) + ") ") + name$1) + ": ") + typ$1) + ",");
        break matchResult4;
      }
      throw new $c_s_MatchError(x0$1);
    }
    res$1[$x_4] = $x_3;
    i$1 = ((1 + i$1) | 0);
  }
  var allFields = $m_sjs_js_ArrayOpsCommon$().e(res, res$1);
  return (((allFields.length | 0) === 0) ? "" : (((("struct " + structName) + " {\n") + $f_sc_IterableOnceOps__mkString__T__T__T__T(new $c_sjs_js_WrappedArray(allFields), "", "\n", "")) + "\n}"));
}
export { $p_Lgpu_derive$__generateCombinedStructFromLists__T__sjs_js_Array__sjs_js_Array__sjs_js_Array__T as $p_Lgpu_derive$__generateCombinedStructFromLists__T__sjs_js_Array__sjs_js_Array__sjs_js_Array__T };
function $p_Lgpu_derive$__generateUniformGroupFromLists__I__sjs_js_Array__sjs_js_Array__T($thiz, groupIdx, names, types) {
  var array$1 = $m_sjs_js_ArrayOps$().aA($m_sjs_js_ArrayOps$().az(names, new $c_sjs_js_WrappedArray(types)));
  var len = (array$1.length | 0);
  var res = new Array(len);
  var i = 0;
  while ((i < len)) {
    var $x_2 = i;
    var x0 = array$1[i];
    matchResult5: {
      var $x_1;
      if ((x0 !== null)) {
        var x20 = x0.j;
        if ((x20 !== null)) {
          var name = x20.j;
          var typ = x20.z;
          var bindingIdx = (x0.z | 0);
          var $x_1 = (((((((("@group(" + groupIdx) + ") @binding(") + bindingIdx) + ") var<uniform> ") + name) + ": ") + typ) + ";");
          break matchResult5;
        }
      }
      throw new $c_s_MatchError(x0);
    }
    res[$x_2] = $x_1;
    i = ((1 + i) | 0);
  }
  return $f_sc_IterableOnceOps__mkString__T__T__T__T(new $c_sjs_js_WrappedArray(res), "", "\n", "");
}
export { $p_Lgpu_derive$__generateUniformGroupFromLists__I__sjs_js_Array__sjs_js_Array__T as $p_Lgpu_derive$__generateUniformGroupFromLists__I__sjs_js_Array__sjs_js_Array__T };
/** @constructor */
function $c_Lgpu_derive$() {
}
export { $c_Lgpu_derive$ as $c_Lgpu_derive$ };
$p = $c_Lgpu_derive$.prototype = new $h_O();
$p.constructor = $c_Lgpu_derive$;
/** @constructor */
function $h_Lgpu_derive$() {
}
export { $h_Lgpu_derive$ as $h_Lgpu_derive$ };
$h_Lgpu_derive$.prototype = $p;
var $d_Lgpu_derive$ = new $TypeData().i($c_Lgpu_derive$, "gpu.derive$", ({
  Y: 1
}));
export { $d_Lgpu_derive$ as $d_Lgpu_derive$ };
var $n_Lgpu_derive$;
function $m_Lgpu_derive$() {
  if ((!$n_Lgpu_derive$)) {
    $n_Lgpu_derive$ = new $c_Lgpu_derive$();
  }
  return $n_Lgpu_derive$;
}
export { $m_Lgpu_derive$ as $m_Lgpu_derive$ };
function $f_jl_Void__hashCode__I($thiz) {
  return 0;
}
export { $f_jl_Void__hashCode__I as $f_jl_Void__hashCode__I };
function $f_jl_Void__toString__T($thiz) {
  return "undefined";
}
export { $f_jl_Void__toString__T as $f_jl_Void__toString__T };
var $d_jl_Void = new $TypeData().i(0, "java.lang.Void", ({
  ad: 1
}), ((x) => (x === (void 0))));
export { $d_jl_Void as $d_jl_Void };
function $s_RTLong__remainderUnsigned__RTLong__RTLong__RTLong(a, b) {
  var this$1 = $m_RTLong$();
  return new $c_RTLong(this$1.aQ(a.a, a.b, b.a, b.b), this$1.d);
}
export { $s_RTLong__remainderUnsigned__RTLong__RTLong__RTLong as $s_RTLong__remainderUnsigned__RTLong__RTLong__RTLong };
function $s_RTLong__remainder__RTLong__RTLong__RTLong(a, b) {
  var this$1 = $m_RTLong$();
  return new $c_RTLong(this$1.aP(a.a, a.b, b.a, b.b), this$1.d);
}
export { $s_RTLong__remainder__RTLong__RTLong__RTLong as $s_RTLong__remainder__RTLong__RTLong__RTLong };
function $s_RTLong__divideUnsigned__RTLong__RTLong__RTLong(a, b) {
  var this$1 = $m_RTLong$();
  return new $c_RTLong(this$1.aD(a.a, a.b, b.a, b.b), this$1.d);
}
export { $s_RTLong__divideUnsigned__RTLong__RTLong__RTLong as $s_RTLong__divideUnsigned__RTLong__RTLong__RTLong };
function $s_RTLong__divide__RTLong__RTLong__RTLong(a, b) {
  var this$1 = $m_RTLong$();
  return new $c_RTLong(this$1.aC(a.a, a.b, b.a, b.b), this$1.d);
}
export { $s_RTLong__divide__RTLong__RTLong__RTLong as $s_RTLong__divide__RTLong__RTLong__RTLong };
function $s_RTLong__fromDoubleBits__D__O__RTLong(value, fpBitsDataView) {
  fpBitsDataView.setFloat64(0, value, true);
  return new $c_RTLong((fpBitsDataView.getInt32(0, true) | 0), (fpBitsDataView.getInt32(4, true) | 0));
}
export { $s_RTLong__fromDoubleBits__D__O__RTLong as $s_RTLong__fromDoubleBits__D__O__RTLong };
function $s_RTLong__fromDouble__D__RTLong(value) {
  var this$1 = $m_RTLong$();
  return new $c_RTLong(this$1.aw(value), this$1.d);
}
export { $s_RTLong__fromDouble__D__RTLong as $s_RTLong__fromDouble__D__RTLong };
function $s_RTLong__fromUnsignedInt__I__RTLong(value) {
  return new $c_RTLong(value, 0);
}
export { $s_RTLong__fromUnsignedInt__I__RTLong as $s_RTLong__fromUnsignedInt__I__RTLong };
function $s_RTLong__fromInt__I__RTLong(value) {
  return new $c_RTLong(value, (value >> 31));
}
export { $s_RTLong__fromInt__I__RTLong as $s_RTLong__fromInt__I__RTLong };
function $s_RTLong__clz__RTLong__I(a) {
  var hi = a.b;
  return ((hi !== 0) ? Math.clz32(hi) : ((32 + Math.clz32(a.a)) | 0));
}
export { $s_RTLong__clz__RTLong__I as $s_RTLong__clz__RTLong__I };
function $s_RTLong__toFloat__RTLong__F(a) {
  var lo = a.a;
  var hi = a.b;
  return Math.fround(((4.294967296E9 * hi) + ((((((-2097152) & (hi ^ (hi >> 10))) === 0) || ((65535 & lo) === 0)) ? lo : (32768 | ((-32768) & lo))) >>> 0.0)));
}
export { $s_RTLong__toFloat__RTLong__F as $s_RTLong__toFloat__RTLong__F };
function $s_RTLong__toDouble__RTLong__D(a) {
  var lo = a.a;
  return ((4.294967296E9 * a.b) + (lo >>> 0.0));
}
export { $s_RTLong__toDouble__RTLong__D as $s_RTLong__toDouble__RTLong__D };
function $s_RTLong__toInt__RTLong__I(a) {
  return a.a;
}
export { $s_RTLong__toInt__RTLong__I as $s_RTLong__toInt__RTLong__I };
function $s_RTLong__bitsToDouble__RTLong__O__D(a, fpBitsDataView) {
  fpBitsDataView.setInt32(0, a.a, true);
  fpBitsDataView.setInt32(4, a.b, true);
  return (+fpBitsDataView.getFloat64(0, true));
}
export { $s_RTLong__bitsToDouble__RTLong__O__D as $s_RTLong__bitsToDouble__RTLong__O__D };
function $s_RTLong__mul__RTLong__RTLong__RTLong(a, b) {
  var alo = a.a;
  var blo = b.a;
  var a0 = (65535 & alo);
  var a1 = ((alo >>> 16) | 0);
  var b0 = (65535 & blo);
  var b1 = ((blo >>> 16) | 0);
  var a0b0 = Math.imul(a0, b0);
  var a1b0 = Math.imul(a1, b0);
  var a0b1 = Math.imul(a0, b1);
  var lo = ((a0b0 + (((a1b0 + a0b1) | 0) << 16)) | 0);
  var c1part = ((((a0b0 >>> 16) | 0) + a0b1) | 0);
  return new $c_RTLong(lo, ((((((((Math.imul(alo, b.b) + Math.imul(a.b, blo)) | 0) + Math.imul(a1, b1)) | 0) + ((c1part >>> 16) | 0)) | 0) + (((((65535 & c1part) + a1b0) | 0) >>> 16) | 0)) | 0));
}
export { $s_RTLong__mul__RTLong__RTLong__RTLong as $s_RTLong__mul__RTLong__RTLong__RTLong };
function $s_RTLong__sub__RTLong__RTLong__RTLong(a, b) {
  var alo = a.a;
  var blo = b.a;
  var lo = ((alo - blo) | 0);
  return new $c_RTLong(lo, ((((a.b - b.b) | 0) + ((((~alo) & blo) | ((~(alo ^ blo)) & lo)) >> 31)) | 0));
}
export { $s_RTLong__sub__RTLong__RTLong__RTLong as $s_RTLong__sub__RTLong__RTLong__RTLong };
function $s_RTLong__add__RTLong__RTLong__RTLong(a, b) {
  var alo = a.a;
  var blo = b.a;
  var lo = ((alo + blo) | 0);
  return new $c_RTLong(lo, ((((a.b + b.b) | 0) + ((((alo & blo) | ((alo | blo) & (~lo))) >>> 31) | 0)) | 0));
}
export { $s_RTLong__add__RTLong__RTLong__RTLong as $s_RTLong__add__RTLong__RTLong__RTLong };
function $s_RTLong__sar__RTLong__I__RTLong(a, n) {
  var hi = a.b;
  return new $c_RTLong((((32 & n) === 0) ? (((a.a >>> n) | 0) | ((hi << 1) << ((31 - n) | 0))) : (hi >> n)), (((32 & n) === 0) ? (hi >> n) : (hi >> 31)));
}
export { $s_RTLong__sar__RTLong__I__RTLong as $s_RTLong__sar__RTLong__I__RTLong };
function $s_RTLong__shr__RTLong__I__RTLong(a, n) {
  var hi = a.b;
  return new $c_RTLong((((32 & n) === 0) ? (((a.a >>> n) | 0) | ((hi << 1) << ((31 - n) | 0))) : ((hi >>> n) | 0)), (((32 & n) === 0) ? ((hi >>> n) | 0) : 0));
}
export { $s_RTLong__shr__RTLong__I__RTLong as $s_RTLong__shr__RTLong__I__RTLong };
function $s_RTLong__shl__RTLong__I__RTLong(a, n) {
  var lo = a.a;
  return new $c_RTLong((((32 & n) === 0) ? (lo << n) : 0), (((32 & n) === 0) ? (((((lo >>> 1) | 0) >>> ((31 - n) | 0)) | 0) | (a.b << n)) : (lo << n)));
}
export { $s_RTLong__shl__RTLong__I__RTLong as $s_RTLong__shl__RTLong__I__RTLong };
function $s_RTLong__xor__RTLong__RTLong__RTLong(a, b) {
  return new $c_RTLong((a.a ^ b.a), (a.b ^ b.b));
}
export { $s_RTLong__xor__RTLong__RTLong__RTLong as $s_RTLong__xor__RTLong__RTLong__RTLong };
function $s_RTLong__and__RTLong__RTLong__RTLong(a, b) {
  return new $c_RTLong((a.a & b.a), (a.b & b.b));
}
export { $s_RTLong__and__RTLong__RTLong__RTLong as $s_RTLong__and__RTLong__RTLong__RTLong };
function $s_RTLong__or__RTLong__RTLong__RTLong(a, b) {
  return new $c_RTLong((a.a | b.a), (a.b | b.b));
}
export { $s_RTLong__or__RTLong__RTLong__RTLong as $s_RTLong__or__RTLong__RTLong__RTLong };
function $s_RTLong__geu__RTLong__RTLong__Z(a, b) {
  var ahi = a.b;
  var bhi = b.b;
  return ((ahi === bhi) ? ((a.a >>> 0) >= (b.a >>> 0)) : ((ahi >>> 0) >= (bhi >>> 0)));
}
export { $s_RTLong__geu__RTLong__RTLong__Z as $s_RTLong__geu__RTLong__RTLong__Z };
function $s_RTLong__gtu__RTLong__RTLong__Z(a, b) {
  var ahi = a.b;
  var bhi = b.b;
  return ((ahi === bhi) ? ((a.a >>> 0) > (b.a >>> 0)) : ((ahi >>> 0) > (bhi >>> 0)));
}
export { $s_RTLong__gtu__RTLong__RTLong__Z as $s_RTLong__gtu__RTLong__RTLong__Z };
function $s_RTLong__leu__RTLong__RTLong__Z(a, b) {
  var ahi = a.b;
  var bhi = b.b;
  return ((ahi === bhi) ? ((a.a >>> 0) <= (b.a >>> 0)) : ((ahi >>> 0) <= (bhi >>> 0)));
}
export { $s_RTLong__leu__RTLong__RTLong__Z as $s_RTLong__leu__RTLong__RTLong__Z };
function $s_RTLong__ltu__RTLong__RTLong__Z(a, b) {
  var ahi = a.b;
  var bhi = b.b;
  return ((ahi === bhi) ? ((a.a >>> 0) < (b.a >>> 0)) : ((ahi >>> 0) < (bhi >>> 0)));
}
export { $s_RTLong__ltu__RTLong__RTLong__Z as $s_RTLong__ltu__RTLong__RTLong__Z };
function $s_RTLong__ge__RTLong__RTLong__Z(a, b) {
  var ahi = a.b;
  var bhi = b.b;
  return ((ahi === bhi) ? ((a.a >>> 0) >= (b.a >>> 0)) : (ahi > bhi));
}
export { $s_RTLong__ge__RTLong__RTLong__Z as $s_RTLong__ge__RTLong__RTLong__Z };
function $s_RTLong__gt__RTLong__RTLong__Z(a, b) {
  var ahi = a.b;
  var bhi = b.b;
  return ((ahi === bhi) ? ((a.a >>> 0) > (b.a >>> 0)) : (ahi > bhi));
}
export { $s_RTLong__gt__RTLong__RTLong__Z as $s_RTLong__gt__RTLong__RTLong__Z };
function $s_RTLong__le__RTLong__RTLong__Z(a, b) {
  var ahi = a.b;
  var bhi = b.b;
  return ((ahi === bhi) ? ((a.a >>> 0) <= (b.a >>> 0)) : (ahi < bhi));
}
export { $s_RTLong__le__RTLong__RTLong__Z as $s_RTLong__le__RTLong__RTLong__Z };
function $s_RTLong__lt__RTLong__RTLong__Z(a, b) {
  var ahi = a.b;
  var bhi = b.b;
  return ((ahi === bhi) ? ((a.a >>> 0) < (b.a >>> 0)) : (ahi < bhi));
}
export { $s_RTLong__lt__RTLong__RTLong__Z as $s_RTLong__lt__RTLong__RTLong__Z };
function $s_RTLong__notEquals__RTLong__RTLong__Z(a, b) {
  return (!((a.a === b.a) && (a.b === b.b)));
}
export { $s_RTLong__notEquals__RTLong__RTLong__Z as $s_RTLong__notEquals__RTLong__RTLong__Z };
function $s_RTLong__equals__RTLong__RTLong__Z(a, b) {
  return ((a.a === b.a) && (a.b === b.b));
}
export { $s_RTLong__equals__RTLong__RTLong__Z as $s_RTLong__equals__RTLong__RTLong__Z };
/** @constructor */
function $c_RTLong(lo, hi) {
  this.a = 0;
  this.b = 0;
  this.a = lo;
  this.b = hi;
}
export { $c_RTLong as $c_RTLong };
$p = $c_RTLong.prototype = new $h_O();
$p.constructor = $c_RTLong;
/** @constructor */
function $h_RTLong() {
}
export { $h_RTLong as $h_RTLong };
$h_RTLong.prototype = $p;
$p.aY = (function(that) {
  return ((that instanceof $c_RTLong) && ((this.a === that.a) && (this.b === that.b)));
});
$p.m = (function() {
  return (this.a ^ this.b);
});
$p.g = (function() {
  return $m_RTLong$().ax(this.a, this.b);
});
$p.aU = (function() {
  return ((this.a << 24) >> 24);
});
$p.b3 = (function() {
  return ((this.a << 16) >> 16);
});
$p.b1 = (function() {
  return this.a;
});
$p.b2 = (function() {
  return this;
});
$p.aZ = (function() {
  var lo = this.a;
  var hi = this.b;
  return Math.fround(((4.294967296E9 * hi) + ((((((-2097152) & (hi ^ (hi >> 10))) === 0) || ((65535 & lo) === 0)) ? lo : (32768 | ((-32768) & lo))) >>> 0.0)));
});
$p.aX = (function() {
  var lo = this.a;
  return ((4.294967296E9 * this.b) + (lo >>> 0.0));
});
$p.aW = (function(that) {
  return $m_RTLong$().av(this.a, this.b, that.a, that.b);
});
$p.aV = (function(that) {
  return $m_RTLong$().av(this.a, this.b, that.a, that.b);
});
function $isArrayOf_RTLong(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.E)));
}
export { $isArrayOf_RTLong as $isArrayOf_RTLong };
var $d_RTLong = new $TypeData().i($c_RTLong, "org.scalajs.linker.runtime.RuntimeLong", ({
  E: 1
}));
export { $d_RTLong as $d_RTLong };
function $p_RTLong$__unsigned_$div__I__I__I__I__I($thiz, alo, ahi, blo, bhi) {
  if ((((-2097152) & ahi) === 0)) {
    if ((((-2097152) & bhi) === 0)) {
      var aDouble = ((4.294967296E9 * ahi) + (alo >>> 0.0));
      var bDouble = ((4.294967296E9 * bhi) + (blo >>> 0.0));
      var rDouble = (aDouble / bDouble);
      $thiz.d = ((rDouble / 4.294967296E9) | 0.0);
      return (rDouble | 0.0);
    } else {
      $thiz.d = 0;
      return 0;
    }
  } else if (((bhi === 0) && ((blo & (((-1) + blo) | 0)) === 0))) {
    var pow = ((31 - Math.clz32(blo)) | 0);
    $thiz.d = ((ahi >>> pow) | 0);
    return (((alo >>> pow) | 0) | ((ahi << 1) << ((31 - pow) | 0)));
  } else if (((blo === 0) && ((bhi & (((-1) + bhi) | 0)) === 0))) {
    var pow$2 = ((31 - Math.clz32(bhi)) | 0);
    $thiz.d = 0;
    return ((ahi >>> pow$2) | 0);
  } else {
    return $p_RTLong$__unsignedDivModHelper__I__I__I__I__Z__I($thiz, alo, ahi, blo, bhi, true);
  }
}
export { $p_RTLong$__unsigned_$div__I__I__I__I__I as $p_RTLong$__unsigned_$div__I__I__I__I__I };
function $p_RTLong$__unsigned_$percent__I__I__I__I__I($thiz, alo, ahi, blo, bhi) {
  if ((((-2097152) & ahi) === 0)) {
    if ((((-2097152) & bhi) === 0)) {
      var aDouble = ((4.294967296E9 * ahi) + (alo >>> 0.0));
      var bDouble = ((4.294967296E9 * bhi) + (blo >>> 0.0));
      var rDouble = (aDouble % bDouble);
      $thiz.d = ((rDouble / 4.294967296E9) | 0.0);
      return (rDouble | 0.0);
    } else {
      $thiz.d = ahi;
      return alo;
    }
  } else if (((bhi === 0) && ((blo & (((-1) + blo) | 0)) === 0))) {
    $thiz.d = 0;
    return (alo & (((-1) + blo) | 0));
  } else if (((blo === 0) && ((bhi & (((-1) + bhi) | 0)) === 0))) {
    $thiz.d = (ahi & (((-1) + bhi) | 0));
    return alo;
  } else {
    return $p_RTLong$__unsignedDivModHelper__I__I__I__I__Z__I($thiz, alo, ahi, blo, bhi, false);
  }
}
export { $p_RTLong$__unsigned_$percent__I__I__I__I__I as $p_RTLong$__unsigned_$percent__I__I__I__I__I };
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
      $thiz.d = hi$9;
      return lo$9;
    } else {
      var rem_mod_bDouble = (remDouble % bDouble);
      $thiz.d = ((rem_mod_bDouble / 4.294967296E9) | 0.0);
      return (rem_mod_bDouble | 0.0);
    }
  } else if (askQuotient) {
    $thiz.d = quotHi;
    return quotLo;
  } else {
    $thiz.d = remHi;
    return remLo;
  }
}
export { $p_RTLong$__unsignedDivModHelper__I__I__I__I__Z__I as $p_RTLong$__unsignedDivModHelper__I__I__I__I__Z__I };
/** @constructor */
function $c_RTLong$() {
  this.d = 0;
}
export { $c_RTLong$ as $c_RTLong$ };
$p = $c_RTLong$.prototype = new $h_O();
$p.constructor = $c_RTLong$;
/** @constructor */
function $h_RTLong$() {
}
export { $h_RTLong$ as $h_RTLong$ };
$h_RTLong$.prototype = $p;
$p.ax = (function(lo, hi) {
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
$p.aw = (function(value) {
  if ((value < (-9.223372036854776E18))) {
    this.d = (-2147483648);
    return 0;
  } else if ((value >= 9.223372036854776E18)) {
    this.d = 2147483647;
    return (-1);
  } else {
    var rawLo = (value | 0.0);
    var rawHi = ((value / 4.294967296E9) | 0.0);
    this.d = (((value < 0.0) && (rawLo !== 0)) ? (((-1) + rawHi) | 0) : rawHi);
    return rawLo;
  }
});
$p.av = (function(alo, ahi, blo, bhi) {
  return ((ahi === bhi) ? ((alo === blo) ? 0 : (((alo >>> 0) < (blo >>> 0)) ? (-1) : 1)) : ((ahi < bhi) ? (-1) : 1));
});
$p.aC = (function(alo, ahi, blo, bhi) {
  if (((blo | bhi) === 0)) {
    throw new $c_jl_ArithmeticException("/ by zero");
  }
  if ((ahi === (alo >> 31))) {
    if ((bhi === (blo >> 31))) {
      if (((alo === (-2147483648)) && (blo === (-1)))) {
        this.d = 0;
        return (-2147483648);
      } else {
        var lo = ((alo / $checkIntDivisor(blo)) | 0);
        this.d = (lo >> 31);
        return lo;
      }
    } else if (((alo === (-2147483648)) && ((blo === (-2147483648)) && (bhi === 0)))) {
      this.d = (-1);
      return (-1);
    } else {
      this.d = 0;
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
      var hi = this.d;
      var lo$1 = ((-absRLo) | 0);
      var hi$1 = ((((-hi) | 0) + ((absRLo | lo$1) >> 31)) | 0);
      this.d = hi$1;
      return lo$1;
    }
  }
});
$p.aD = (function(alo, ahi, blo, bhi) {
  if (((blo | bhi) === 0)) {
    throw new $c_jl_ArithmeticException("/ by zero");
  }
  if ((ahi === 0)) {
    if ((bhi === 0)) {
      this.d = 0;
      return (((alo >>> 0) / ($checkIntDivisor(blo) >>> 0)) | 0);
    } else {
      this.d = 0;
      return 0;
    }
  } else {
    return $p_RTLong$__unsigned_$div__I__I__I__I__I(this, alo, ahi, blo, bhi);
  }
});
$p.aP = (function(alo, ahi, blo, bhi) {
  if (((blo | bhi) === 0)) {
    throw new $c_jl_ArithmeticException("/ by zero");
  }
  if ((ahi === (alo >> 31))) {
    if ((bhi === (blo >> 31))) {
      var lo = ((alo % $checkIntDivisor(blo)) | 0);
      this.d = (lo >> 31);
      return lo;
    } else if (((alo === (-2147483648)) && ((blo === (-2147483648)) && (bhi === 0)))) {
      this.d = 0;
      return 0;
    } else {
      this.d = ahi;
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
      var hi = this.d;
      var lo$1 = ((-absRLo) | 0);
      var hi$1 = ((((-hi) | 0) + ((absRLo | lo$1) >> 31)) | 0);
      this.d = hi$1;
      return lo$1;
    } else {
      return absRLo;
    }
  }
});
$p.aQ = (function(alo, ahi, blo, bhi) {
  if (((blo | bhi) === 0)) {
    throw new $c_jl_ArithmeticException("/ by zero");
  }
  if ((ahi === 0)) {
    if ((bhi === 0)) {
      this.d = 0;
      return (((alo >>> 0) % ($checkIntDivisor(blo) >>> 0)) | 0);
    } else {
      this.d = ahi;
      return alo;
    }
  } else {
    return $p_RTLong$__unsigned_$percent__I__I__I__I__I(this, alo, ahi, blo, bhi);
  }
});
var $d_RTLong$ = new $TypeData().i($c_RTLong$, "org.scalajs.linker.runtime.RuntimeLong$", ({
  ae: 1
}));
export { $d_RTLong$ as $d_RTLong$ };
var $n_RTLong$;
function $m_RTLong$() {
  if ((!$n_RTLong$)) {
    $n_RTLong$ = new $c_RTLong$();
  }
  return $n_RTLong$;
}
export { $m_RTLong$ as $m_RTLong$ };
/** @constructor */
function $c_s_PartialFunction$() {
  this.ab = null;
  this.O = null;
  $n_s_PartialFunction$ = this;
  this.ab = new $c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28(((_$2$2) => this.ab));
  this.O = new $c_s_PartialFunction$$anon$1();
}
export { $c_s_PartialFunction$ as $c_s_PartialFunction$ };
$p = $c_s_PartialFunction$.prototype = new $h_O();
$p.constructor = $c_s_PartialFunction$;
/** @constructor */
function $h_s_PartialFunction$() {
}
export { $h_s_PartialFunction$ as $h_s_PartialFunction$ };
$h_s_PartialFunction$.prototype = $p;
var $d_s_PartialFunction$ = new $TypeData().i($c_s_PartialFunction$, "scala.PartialFunction$", ({
  ai: 1
}));
export { $d_s_PartialFunction$ as $d_s_PartialFunction$ };
var $n_s_PartialFunction$;
function $m_s_PartialFunction$() {
  if ((!$n_s_PartialFunction$)) {
    $n_s_PartialFunction$ = new $c_s_PartialFunction$();
  }
  return $n_s_PartialFunction$;
}
export { $m_s_PartialFunction$ as $m_s_PartialFunction$ };
function $f_sc_IterableOnceOps__mkString__T__T__T__T($thiz, start, sep, end) {
  return (($thiz.v() === 0) ? (("" + start) + end) : $thiz.ao($ct_scm_StringBuilder__(new $c_scm_StringBuilder()), start, sep, end).t.h);
}
export { $f_sc_IterableOnceOps__mkString__T__T__T__T as $f_sc_IterableOnceOps__mkString__T__T__T__T };
function $f_sc_IterableOnceOps__addString__scm_StringBuilder__T__T__T__scm_StringBuilder($thiz, b, start, sep, end) {
  var jsb = b.t;
  if ((start.length !== 0)) {
    jsb.h = (("" + jsb.h) + start);
  }
  var it = $thiz.r();
  if (it.l()) {
    var obj = it.i();
    jsb.h = (("" + jsb.h) + obj);
    while (it.l()) {
      if ((sep.length !== 0)) {
        jsb.h = (("" + jsb.h) + sep);
      }
      var obj$1 = it.i();
      jsb.h = (("" + jsb.h) + obj$1);
    }
  }
  if ((end.length !== 0)) {
    jsb.h = (("" + jsb.h) + end);
  }
  return b;
}
export { $f_sc_IterableOnceOps__addString__scm_StringBuilder__T__T__T__scm_StringBuilder as $f_sc_IterableOnceOps__addString__scm_StringBuilder__T__T__T__scm_StringBuilder };
/** @constructor */
function $c_sc_StringOps$() {
  this.ag = null;
  $n_sc_StringOps$ = this;
  this.ag = new $c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28(((_$1$2) => this.ag));
}
export { $c_sc_StringOps$ as $c_sc_StringOps$ };
$p = $c_sc_StringOps$.prototype = new $h_O();
$p.constructor = $c_sc_StringOps$;
/** @constructor */
function $h_sc_StringOps$() {
}
export { $h_sc_StringOps$ as $h_sc_StringOps$ };
$h_sc_StringOps$.prototype = $p;
var $d_sc_StringOps$ = new $TypeData().i($c_sc_StringOps$, "scala.collection.StringOps$", ({
  aD: 1
}));
export { $d_sc_StringOps$ as $d_sc_StringOps$ };
var $n_sc_StringOps$;
function $m_sc_StringOps$() {
  if ((!$n_sc_StringOps$)) {
    $n_sc_StringOps$ = new $c_sc_StringOps$();
  }
  return $n_sc_StringOps$;
}
export { $m_sc_StringOps$ as $m_sc_StringOps$ };
/** @constructor */
function $c_sr_ScalaRunTime$() {
}
export { $c_sr_ScalaRunTime$ as $c_sr_ScalaRunTime$ };
$p = $c_sr_ScalaRunTime$.prototype = new $h_O();
$p.constructor = $c_sr_ScalaRunTime$;
/** @constructor */
function $h_sr_ScalaRunTime$() {
}
export { $h_sr_ScalaRunTime$ as $h_sr_ScalaRunTime$ };
$h_sr_ScalaRunTime$.prototype = $p;
$p.an = (function(x) {
  return $f_sc_IterableOnceOps__mkString__T__T__T__T(x.I(), (x.y() + "("), ",", ")");
});
var $d_sr_ScalaRunTime$ = new $TypeData().i($c_sr_ScalaRunTime$, "scala.runtime.ScalaRunTime$", ({
  aZ: 1
}));
export { $d_sr_ScalaRunTime$ as $d_sr_ScalaRunTime$ };
var $n_sr_ScalaRunTime$;
function $m_sr_ScalaRunTime$() {
  if ((!$n_sr_ScalaRunTime$)) {
    $n_sr_ScalaRunTime$ = new $c_sr_ScalaRunTime$();
  }
  return $n_sr_ScalaRunTime$;
}
export { $m_sr_ScalaRunTime$ as $m_sr_ScalaRunTime$ };
/** @constructor */
function $c_sr_Statics$() {
}
export { $c_sr_Statics$ as $c_sr_Statics$ };
$p = $c_sr_Statics$.prototype = new $h_O();
$p.constructor = $c_sr_Statics$;
/** @constructor */
function $h_sr_Statics$() {
}
export { $h_sr_Statics$ as $h_sr_Statics$ };
$h_sr_Statics$.prototype = $p;
$p.aL = (function(lv) {
  var lo = lv.a;
  var hi = lv.b;
  return ((hi === (lo >> 31)) ? lo : (lo ^ hi));
});
$p.aE = (function(dv) {
  var iv = $doubleToInt(dv);
  if ((iv === dv)) {
    return iv;
  } else {
    var this$1 = $m_RTLong$();
    var lo = this$1.aw(dv);
    var hi = this$1.d;
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
$p.k = (function(x) {
  if ((x === null)) {
    return 0;
  } else if (((typeof x) === "number")) {
    return this.aE((+x));
  } else if ((x instanceof $c_RTLong)) {
    var t = $uJ(x);
    return this.aL(new $c_RTLong(t.a, t.b));
  } else {
    return $dp_hashCode__I(x);
  }
});
var $d_sr_Statics$ = new $TypeData().i($c_sr_Statics$, "scala.runtime.Statics$", ({
  b1: 1
}));
export { $d_sr_Statics$ as $d_sr_Statics$ };
var $n_sr_Statics$;
function $m_sr_Statics$() {
  if ((!$n_sr_Statics$)) {
    $n_sr_Statics$ = new $c_sr_Statics$();
  }
  return $n_sr_Statics$;
}
export { $m_sr_Statics$ as $m_sr_Statics$ };
/** @constructor */
function $c_sjs_js_ArrayOps$() {
}
export { $c_sjs_js_ArrayOps$ as $c_sjs_js_ArrayOps$ };
$p = $c_sjs_js_ArrayOps$.prototype = new $h_O();
$p.constructor = $c_sjs_js_ArrayOps$;
/** @constructor */
function $h_sjs_js_ArrayOps$() {
}
export { $h_sjs_js_ArrayOps$ as $h_sjs_js_ArrayOps$ };
$h_sjs_js_ArrayOps$.prototype = $p;
$p.az = (function(this$, that) {
  var b = [];
  var len = (this$.length | 0);
  var i = 0;
  var it = that.r();
  while (((i < len) && it.l())) {
    b.push(new $c_T2(this$[i], it.i()));
    i = ((1 + i) | 0);
  }
  return b;
});
$p.aA = (function(this$) {
  var len = (this$.length | 0);
  var b = new Array(len);
  var i = 0;
  while ((i < len)) {
    b[i] = new $c_T2(this$[i], i);
    i = ((1 + i) | 0);
  }
  return b;
});
var $d_sjs_js_ArrayOps$ = new $TypeData().i($c_sjs_js_ArrayOps$, "scala.scalajs.js.ArrayOps$", ({
  b3: 1
}));
export { $d_sjs_js_ArrayOps$ as $d_sjs_js_ArrayOps$ };
var $n_sjs_js_ArrayOps$;
function $m_sjs_js_ArrayOps$() {
  if ((!$n_sjs_js_ArrayOps$)) {
    $n_sjs_js_ArrayOps$ = new $c_sjs_js_ArrayOps$();
  }
  return $n_sjs_js_ArrayOps$;
}
export { $m_sjs_js_ArrayOps$ as $m_sjs_js_ArrayOps$ };
/** @constructor */
function $c_sjs_js_ArrayOpsCommon$() {
}
export { $c_sjs_js_ArrayOpsCommon$ as $c_sjs_js_ArrayOpsCommon$ };
$p = $c_sjs_js_ArrayOpsCommon$.prototype = new $h_O();
$p.constructor = $c_sjs_js_ArrayOpsCommon$;
/** @constructor */
function $h_sjs_js_ArrayOpsCommon$() {
}
export { $h_sjs_js_ArrayOpsCommon$ as $h_sjs_js_ArrayOpsCommon$ };
$h_sjs_js_ArrayOpsCommon$.prototype = $p;
$p.e = (function(left, right) {
  var leftLength = (left.length | 0);
  var rightLength = (right.length | 0);
  var result = new Array(((leftLength + rightLength) | 0));
  var i = 0;
  while (true) {
    if ((i !== leftLength)) {
      result[i] = left[i];
      i = ((1 + i) | 0);
      continue;
    }
    break;
  }
  var i$1 = 0;
  while (true) {
    if ((i$1 !== rightLength)) {
      result[((i$1 + leftLength) | 0)] = right[i$1];
      i$1 = ((1 + i$1) | 0);
      continue;
    }
    break;
  }
  return result;
});
var $d_sjs_js_ArrayOpsCommon$ = new $TypeData().i($c_sjs_js_ArrayOpsCommon$, "scala.scalajs.js.ArrayOpsCommon$", ({
  b4: 1
}));
export { $d_sjs_js_ArrayOpsCommon$ as $d_sjs_js_ArrayOpsCommon$ };
var $n_sjs_js_ArrayOpsCommon$;
function $m_sjs_js_ArrayOpsCommon$() {
  if ((!$n_sjs_js_ArrayOpsCommon$)) {
    $n_sjs_js_ArrayOpsCommon$ = new $c_sjs_js_ArrayOpsCommon$();
  }
  return $n_sjs_js_ArrayOpsCommon$;
}
export { $m_sjs_js_ArrayOpsCommon$ as $m_sjs_js_ArrayOpsCommon$ };
/** @constructor */
function $c_s_util_hashing_MurmurHash3() {
}
export { $c_s_util_hashing_MurmurHash3 as $c_s_util_hashing_MurmurHash3 };
$p = $c_s_util_hashing_MurmurHash3.prototype = new $h_O();
$p.constructor = $c_s_util_hashing_MurmurHash3;
/** @constructor */
function $h_s_util_hashing_MurmurHash3() {
}
export { $h_s_util_hashing_MurmurHash3 as $h_s_util_hashing_MurmurHash3 };
$h_s_util_hashing_MurmurHash3.prototype = $p;
$p.f = (function(hash, data) {
  var h = this.au(hash, data);
  var i = h;
  h = ((i << 13) | ((i >>> 19) | 0));
  return (((-430675100) + Math.imul(5, h)) | 0);
});
$p.au = (function(hash, data) {
  var k = data;
  k = Math.imul((-862048943), k);
  var i = k;
  k = ((i << 15) | ((i >>> 17) | 0));
  k = Math.imul(461845907, k);
  return (hash ^ k);
});
$p.q = (function(hash, length) {
  return this.Z((hash ^ length));
});
$p.Z = (function(hash) {
  var h = hash;
  h = (h ^ ((h >>> 16) | 0));
  h = Math.imul((-2048144789), h);
  h = (h ^ ((h >>> 13) | 0));
  h = Math.imul((-1028477387), h);
  h = (h ^ ((h >>> 16) | 0));
  return h;
});
$p.Y = (function(x, seed, ignorePrefix) {
  var arr = x.w();
  if ((arr === 0)) {
    return ((!ignorePrefix) ? $f_T__hashCode__I(x.y()) : seed);
  } else {
    var h = seed;
    if ((!ignorePrefix)) {
      h = this.f(h, $f_T__hashCode__I(x.y()));
    }
    var i = 0;
    while ((i < arr)) {
      h = this.f(h, $m_sr_Statics$().k(x.x(i)));
      i = ((1 + i) | 0);
    }
    return this.q(h, arr);
  }
});
$p.aT = (function(xs, seed) {
  var a = 0;
  var b = 0;
  var n = 0;
  var c = 1;
  var iterator = xs.r();
  while (iterator.l()) {
    var x = iterator.i();
    var h = $m_sr_Statics$().k(x);
    a = ((a + h) | 0);
    b = (b ^ h);
    c = Math.imul(c, (1 | h));
    n = ((1 + n) | 0);
  }
  var h$2 = seed;
  h$2 = this.f(h$2, a);
  h$2 = this.f(h$2, b);
  h$2 = this.au(h$2, c);
  return this.q(h$2, n);
});
$p.aN = (function(xs, seed) {
  var it = xs.r();
  var h = seed;
  if ((!it.l())) {
    return this.q(h, 0);
  }
  var x0 = it.i();
  if ((!it.l())) {
    return this.q(this.f(h, $m_sr_Statics$().k(x0)), 1);
  }
  var x1 = it.i();
  var initial = $m_sr_Statics$().k(x0);
  h = this.f(h, initial);
  var h0 = h;
  var prev = $m_sr_Statics$().k(x1);
  var rangeDiff = ((prev - initial) | 0);
  var i = 2;
  while (it.l()) {
    h = this.f(h, prev);
    var hash = $m_sr_Statics$().k(it.i());
    if (((rangeDiff !== ((hash - prev) | 0)) || (rangeDiff === 0))) {
      h = this.f(h, hash);
      i = ((1 + i) | 0);
      while (it.l()) {
        h = this.f(h, $m_sr_Statics$().k(it.i()));
        i = ((1 + i) | 0);
      }
      return this.q(h, i);
    }
    prev = hash;
    i = ((1 + i) | 0);
  }
  return this.Z(this.f(this.f(h0, rangeDiff), prev));
});
$p.aO = (function(start, step, last, seed) {
  return this.Z(this.f(this.f(this.f(seed, start), step), last));
});
$p.aJ = (function(a, seed) {
  var h = seed;
  var l = a.p();
  switch (l) {
    case 0: {
      return this.q(h, 0);
      break;
    }
    case 1: {
      return this.q(this.f(h, $m_sr_Statics$().k(a.n(0))), 1);
      break;
    }
    default: {
      var initial = $m_sr_Statics$().k(a.n(0));
      h = this.f(h, initial);
      var h0 = h;
      var prev = $m_sr_Statics$().k(a.n(1));
      var rangeDiff = ((prev - initial) | 0);
      var i = 2;
      while ((i < l)) {
        h = this.f(h, prev);
        var hash = $m_sr_Statics$().k(a.n(i));
        if (((rangeDiff !== ((hash - prev) | 0)) || (rangeDiff === 0))) {
          h = this.f(h, hash);
          i = ((1 + i) | 0);
          while ((i < l)) {
            h = this.f(h, $m_sr_Statics$().k(a.n(i)));
            i = ((1 + i) | 0);
          }
          return this.q(h, l);
        }
        prev = hash;
        i = ((1 + i) | 0);
      }
      return this.Z(this.f(this.f(h0, rangeDiff), prev));
    }
  }
});
$p.aK = (function(xs, seed) {
  var n = 0;
  var h = seed;
  var rangeState = 0;
  var rangeDiff = 0;
  var prev = 0;
  var initial = 0;
  var elems = xs;
  while ((!elems.A())) {
    elems.at();
  }
  return ((rangeState === 2) ? this.aO(initial, rangeDiff, prev, seed) : this.q(h, n));
});
/** @constructor */
function $c_Lwebgpu_WebGPU$() {
}
export { $c_Lwebgpu_WebGPU$ as $c_Lwebgpu_WebGPU$ };
$p = $c_Lwebgpu_WebGPU$.prototype = new $h_O();
$p.constructor = $c_Lwebgpu_WebGPU$;
/** @constructor */
function $h_Lwebgpu_WebGPU$() {
}
export { $h_Lwebgpu_WebGPU$ as $h_Lwebgpu_WebGPU$ };
$h_Lwebgpu_WebGPU$.prototype = $p;
$p.as = (function() {
  return window.navigator.gpu;
});
$p.ar = (function(canvas) {
  return canvas.getContext("webgpu");
});
var $d_Lwebgpu_WebGPU$ = new $TypeData().i($c_Lwebgpu_WebGPU$, "webgpu.WebGPU$", ({
  bd: 1
}));
export { $d_Lwebgpu_WebGPU$ as $d_Lwebgpu_WebGPU$ };
var $n_Lwebgpu_WebGPU$;
function $m_Lwebgpu_WebGPU$() {
  if ((!$n_Lwebgpu_WebGPU$)) {
    $n_Lwebgpu_WebGPU$ = new $c_Lwebgpu_WebGPU$();
  }
  return $n_Lwebgpu_WebGPU$;
}
export { $m_Lwebgpu_WebGPU$ as $m_Lwebgpu_WebGPU$ };
/** @constructor */
function $c_jl_Number() {
}
export { $c_jl_Number as $c_jl_Number };
$p = $c_jl_Number.prototype = new $h_O();
$p.constructor = $c_jl_Number;
/** @constructor */
function $h_jl_Number() {
}
export { $h_jl_Number as $h_jl_Number };
$h_jl_Number.prototype = $p;
function $ct_jl_Throwable__T__jl_Throwable__Z__Z__($thiz, s, e, enableSuppression, writableStackTrace) {
  $thiz.M = s;
  if (writableStackTrace) {
    $thiz.aG();
  }
  return $thiz;
}
export { $ct_jl_Throwable__T__jl_Throwable__Z__Z__ as $ct_jl_Throwable__T__jl_Throwable__Z__Z__ };
class $c_jl_Throwable extends Error {
  constructor() {
    super();
    this.M = null;
  }
  a4() {
    return this.M;
  }
  aG() {
    var reference = (false ? this.al : this);
    if ((Object.prototype.toString.call(reference) !== "[object Error]")) {
      if (((Error.captureStackTrace === (void 0)) || (!(!Object.isSealed(this))))) {
        new Error();
      } else {
        Error.captureStackTrace(this);
      }
    }
    return this;
  }
  g() {
    var className = $objectClassName(this);
    var message = this.a4();
    return ((message === null) ? className : ((className + ": ") + message));
  }
  m() {
    return $c_O.prototype.m.call(this);
  }
  get "message"() {
    var m = this.a4();
    return ((m === null) ? "" : m);
  }
  get "name"() {
    return $objectClassName(this);
  }
  "toString"() {
    return this.g();
  }
}
export { $c_jl_Throwable as $c_jl_Throwable };
/** @constructor */
function $c_sr_AbstractFunction1() {
}
export { $c_sr_AbstractFunction1 as $c_sr_AbstractFunction1 };
$p = $c_sr_AbstractFunction1.prototype = new $h_O();
$p.constructor = $c_sr_AbstractFunction1;
/** @constructor */
function $h_sr_AbstractFunction1() {
}
export { $h_sr_AbstractFunction1 as $h_sr_AbstractFunction1 };
$h_sr_AbstractFunction1.prototype = $p;
$p.g = (function() {
  return "<function1>";
});
/** @constructor */
function $c_sr_AbstractFunction2() {
}
export { $c_sr_AbstractFunction2 as $c_sr_AbstractFunction2 };
$p = $c_sr_AbstractFunction2.prototype = new $h_O();
$p.constructor = $c_sr_AbstractFunction2;
/** @constructor */
function $h_sr_AbstractFunction2() {
}
export { $h_sr_AbstractFunction2 as $h_sr_AbstractFunction2 };
$h_sr_AbstractFunction2.prototype = $p;
$p.g = (function() {
  return "<function2>";
});
/** @constructor */
function $c_s_util_hashing_MurmurHash3$() {
  this.V = 0;
  this.am = 0;
  $n_s_util_hashing_MurmurHash3$ = this;
  this.V = $f_T__hashCode__I("Seq");
  this.am = $f_T__hashCode__I("Map");
  $f_T__hashCode__I("Set");
  this.aT($m_sci_Nil$(), this.am);
}
export { $c_s_util_hashing_MurmurHash3$ as $c_s_util_hashing_MurmurHash3$ };
$p = $c_s_util_hashing_MurmurHash3$.prototype = new $h_s_util_hashing_MurmurHash3();
$p.constructor = $c_s_util_hashing_MurmurHash3$;
/** @constructor */
function $h_s_util_hashing_MurmurHash3$() {
}
export { $h_s_util_hashing_MurmurHash3$ as $h_s_util_hashing_MurmurHash3$ };
$h_s_util_hashing_MurmurHash3$.prototype = $p;
$p.aR = (function(xs) {
  return ($is_sc_IndexedSeq(xs) ? this.aJ(xs, this.V) : ((xs instanceof $c_sci_List) ? this.aK(xs, this.V) : this.aN(xs, this.V)));
});
var $d_s_util_hashing_MurmurHash3$ = new $TypeData().i($c_s_util_hashing_MurmurHash3$, "scala.util.hashing.MurmurHash3$", ({
  ba: 1,
  b9: 1
}));
export { $d_s_util_hashing_MurmurHash3$ as $d_s_util_hashing_MurmurHash3$ };
var $n_s_util_hashing_MurmurHash3$;
function $m_s_util_hashing_MurmurHash3$() {
  if ((!$n_s_util_hashing_MurmurHash3$)) {
    $n_s_util_hashing_MurmurHash3$ = new $c_s_util_hashing_MurmurHash3$();
  }
  return $n_s_util_hashing_MurmurHash3$;
}
export { $m_s_util_hashing_MurmurHash3$ as $m_s_util_hashing_MurmurHash3$ };
class $c_jl_Exception extends $c_jl_Throwable {
}
export { $c_jl_Exception as $c_jl_Exception };
function $f_s_Product2__productElement__I__O($thiz, n) {
  switch (n) {
    case 0: {
      return $thiz.j;
      break;
    }
    case 1: {
      return $thiz.z;
      break;
    }
    default: {
      throw new $c_jl_IndexOutOfBoundsException((n + " is out of bounds (min 0, max 1)"));
    }
  }
}
export { $f_s_Product2__productElement__I__O as $f_s_Product2__productElement__I__O };
function $f_s_Product3__productElement__I__O($thiz, n) {
  switch (n) {
    case 0: {
      return $thiz.P;
      break;
    }
    case 1: {
      return $thiz.Q;
      break;
    }
    case 2: {
      return $thiz.R;
      break;
    }
    default: {
      throw new $c_jl_IndexOutOfBoundsException((n + " is out of bounds (min 0, max 2)"));
    }
  }
}
export { $f_s_Product3__productElement__I__O as $f_s_Product3__productElement__I__O };
/** @constructor */
function $c_sc_Iterator$() {
  this.F = null;
  $n_sc_Iterator$ = this;
  this.F = new $c_sc_Iterator$$anon$19();
}
export { $c_sc_Iterator$ as $c_sc_Iterator$ };
$p = $c_sc_Iterator$.prototype = new $h_O();
$p.constructor = $c_sc_Iterator$;
/** @constructor */
function $h_sc_Iterator$() {
}
export { $h_sc_Iterator$ as $h_sc_Iterator$ };
$h_sc_Iterator$.prototype = $p;
var $d_sc_Iterator$ = new $TypeData().i($c_sc_Iterator$, "scala.collection.Iterator$", ({
  av: 1,
  a: 1,
  au: 1
}));
export { $d_sc_Iterator$ as $d_sc_Iterator$ };
var $n_sc_Iterator$;
function $m_sc_Iterator$() {
  if ((!$n_sc_Iterator$)) {
    $n_sc_Iterator$ = new $c_sc_Iterator$();
  }
  return $n_sc_Iterator$;
}
export { $m_sc_Iterator$ as $m_sc_Iterator$ };
/** @constructor */
function $c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28(f) {
  this.ah = null;
  this.ah = f;
}
export { $c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28 as $c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28 };
$p = $c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28.prototype = new $h_sr_AbstractFunction1();
$p.constructor = $c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28;
/** @constructor */
function $h_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28() {
}
export { $h_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28 as $h_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28 };
$h_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28.prototype = $p;
$p.C = (function(x0) {
  return (0, this.ah)(x0);
});
var $d_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28 = new $TypeData().i($c_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28, "scala.runtime.AbstractFunction1.$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28", ({
  aV: 1,
  aU: 1,
  g: 1
}));
export { $d_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28 as $d_sr_AbstractFunction1_$$Lambda$70e1780b84463d18653aacefee3ab989ac625f28 };
/** @constructor */
function $c_sr_AbstractFunction2_$$Lambda$286cbfc6187197affcadc8465aaec93d6b7d20dc(f) {
  this.ai = null;
  this.ai = f;
}
export { $c_sr_AbstractFunction2_$$Lambda$286cbfc6187197affcadc8465aaec93d6b7d20dc as $c_sr_AbstractFunction2_$$Lambda$286cbfc6187197affcadc8465aaec93d6b7d20dc };
$p = $c_sr_AbstractFunction2_$$Lambda$286cbfc6187197affcadc8465aaec93d6b7d20dc.prototype = new $h_sr_AbstractFunction2();
$p.constructor = $c_sr_AbstractFunction2_$$Lambda$286cbfc6187197affcadc8465aaec93d6b7d20dc;
/** @constructor */
function $h_sr_AbstractFunction2_$$Lambda$286cbfc6187197affcadc8465aaec93d6b7d20dc() {
}
export { $h_sr_AbstractFunction2_$$Lambda$286cbfc6187197affcadc8465aaec93d6b7d20dc as $h_sr_AbstractFunction2_$$Lambda$286cbfc6187197affcadc8465aaec93d6b7d20dc };
$h_sr_AbstractFunction2_$$Lambda$286cbfc6187197affcadc8465aaec93d6b7d20dc.prototype = $p;
$p.u = (function(x0, x1) {
  return (0, this.ai)(x0, x1);
});
var $d_sr_AbstractFunction2_$$Lambda$286cbfc6187197affcadc8465aaec93d6b7d20dc = new $TypeData().i($c_sr_AbstractFunction2_$$Lambda$286cbfc6187197affcadc8465aaec93d6b7d20dc, "scala.runtime.AbstractFunction2.$$Lambda$286cbfc6187197affcadc8465aaec93d6b7d20dc", ({
  aX: 1,
  aW: 1,
  af: 1
}));
export { $d_sr_AbstractFunction2_$$Lambda$286cbfc6187197affcadc8465aaec93d6b7d20dc as $d_sr_AbstractFunction2_$$Lambda$286cbfc6187197affcadc8465aaec93d6b7d20dc };
/** @constructor */
function $c_sr_AbstractPartialFunction() {
}
export { $c_sr_AbstractPartialFunction as $c_sr_AbstractPartialFunction };
$p = $c_sr_AbstractPartialFunction.prototype = new $h_O();
$p.constructor = $c_sr_AbstractPartialFunction;
/** @constructor */
function $h_sr_AbstractPartialFunction() {
}
export { $h_sr_AbstractPartialFunction as $h_sr_AbstractPartialFunction };
$h_sr_AbstractPartialFunction.prototype = $p;
$p.g = (function() {
  return "<function1>";
});
$p.C = (function(x) {
  return this.W(x, $m_s_PartialFunction$().O);
});
/** @constructor */
function $c_sjs_js_Any$() {
}
export { $c_sjs_js_Any$ as $c_sjs_js_Any$ };
$p = $c_sjs_js_Any$.prototype = new $h_O();
$p.constructor = $c_sjs_js_Any$;
/** @constructor */
function $h_sjs_js_Any$() {
}
export { $h_sjs_js_Any$ as $h_sjs_js_Any$ };
$h_sjs_js_Any$.prototype = $p;
$p.X = (function(f) {
  return ((arg1$2) => f.C(arg1$2));
});
var $d_sjs_js_Any$ = new $TypeData().i($c_sjs_js_Any$, "scala.scalajs.js.Any$", ({
  b2: 1,
  b6: 1,
  b7: 1
}));
export { $d_sjs_js_Any$ as $d_sjs_js_Any$ };
var $n_sjs_js_Any$;
function $m_sjs_js_Any$() {
  if ((!$n_sjs_js_Any$)) {
    $n_sjs_js_Any$ = new $c_sjs_js_Any$();
  }
  return $n_sjs_js_Any$;
}
export { $m_sjs_js_Any$ as $m_sjs_js_Any$ };
function $p_Lgpu_ShaderDef__buildWGSL__T__T__T__T__T__T__T($thiz, vertexInputStruct, vertexOutputStruct, fragmentOutputStruct, uniformDecls, vertexBody, fragmentBody) {
  var array = [vertexInputStruct, vertexOutputStruct, fragmentOutputStruct, uniformDecls, $p_Lgpu_ShaderDef__buildVertexMain__T__T($thiz, vertexBody), $p_Lgpu_ShaderDef__buildFragmentMain__T__T($thiz, fragmentBody)];
  var res = [];
  var len = (array.length | 0);
  var i = 0;
  while ((i < len)) {
    var x0 = array[i];
    if (($m_sc_StringOps$(), (x0 !== ""))) {
      (res.push(x0) | 0);
    }
    i = ((1 + i) | 0);
  }
  return $f_sc_IterableOnceOps__mkString__T__T__T__T(new $c_sjs_js_WrappedArray(res), "", "\n\n", "");
}
export { $p_Lgpu_ShaderDef__buildWGSL__T__T__T__T__T__T__T as $p_Lgpu_ShaderDef__buildWGSL__T__T__T__T__T__T__T };
function $p_Lgpu_ShaderDef__buildVertexMain__T__T($thiz, body) {
  return (("@vertex\nfn vs_main(in: VertexInput) -> VertexOutput {\n  var out: VertexOutput;\n" + body) + "\n  return out;\n}");
}
export { $p_Lgpu_ShaderDef__buildVertexMain__T__T as $p_Lgpu_ShaderDef__buildVertexMain__T__T };
function $p_Lgpu_ShaderDef__buildFragmentMain__T__T($thiz, body) {
  return (("@fragment\nfn fs_main(in: VertexOutput) -> FragmentOutput {\n  var out: FragmentOutput;\n" + body) + "\n  return out;\n}");
}
export { $p_Lgpu_ShaderDef__buildFragmentMain__T__T as $p_Lgpu_ShaderDef__buildFragmentMain__T__T };
/** @constructor */
function $c_Lgpu_ShaderDef(vertexBody, fragmentBody) {
  this.L = null;
  this.K = null;
  this.L = vertexBody;
  this.K = fragmentBody;
}
export { $c_Lgpu_ShaderDef as $c_Lgpu_ShaderDef };
$p = $c_Lgpu_ShaderDef.prototype = new $h_O();
$p.constructor = $c_Lgpu_ShaderDef;
/** @constructor */
function $h_Lgpu_ShaderDef() {
}
export { $h_Lgpu_ShaderDef as $h_Lgpu_ShaderDef };
$h_Lgpu_ShaderDef.prototype = $p;
$p.I = (function() {
  return new $c_s_Product$$anon$1(this);
});
$p.m = (function() {
  return $m_s_util_hashing_MurmurHash3$().Y(this, (-1488826029), true);
});
$p.g = (function() {
  return $m_sr_ScalaRunTime$().an(this);
});
$p.w = (function() {
  return 2;
});
$p.y = (function() {
  return "ShaderDef";
});
$p.x = (function(n) {
  if ((n === 0)) {
    return this.L;
  }
  if ((n === 1)) {
    return this.K;
  }
  throw new $c_jl_IndexOutOfBoundsException(("" + n));
});
var $d_Lgpu_ShaderDef = new $TypeData().i($c_Lgpu_ShaderDef, "gpu.ShaderDef", ({
  X: 1,
  f: 1,
  m: 1,
  a: 1
}));
export { $d_Lgpu_ShaderDef as $d_Lgpu_ShaderDef };
function $f_jl_Boolean__hashCode__I($thiz) {
  return ($thiz ? 1231 : 1237);
}
export { $f_jl_Boolean__hashCode__I as $f_jl_Boolean__hashCode__I };
function $f_jl_Boolean__toString__T($thiz) {
  return ("" + $thiz);
}
export { $f_jl_Boolean__toString__T as $f_jl_Boolean__toString__T };
var $d_jl_Boolean = new $TypeData().i(0, "java.lang.Boolean", ({
  a2: 1,
  a: 1,
  c: 1,
  d: 1
}), ((x) => ((typeof x) === "boolean")));
export { $d_jl_Boolean as $d_jl_Boolean };
function $f_jl_Character__hashCode__I($thiz) {
  return $thiz;
}
export { $f_jl_Character__hashCode__I as $f_jl_Character__hashCode__I };
function $f_jl_Character__toString__T($thiz) {
  return ("" + $cToS($thiz));
}
export { $f_jl_Character__toString__T as $f_jl_Character__toString__T };
var $d_jl_Character = new $TypeData().i(0, "java.lang.Character", ({
  a4: 1,
  a: 1,
  c: 1,
  d: 1
}), ((x) => (x instanceof $Char)));
export { $d_jl_Character as $d_jl_Character };
class $c_jl_RuntimeException extends $c_jl_Exception {
}
export { $c_jl_RuntimeException as $c_jl_RuntimeException };
/** @constructor */
function $c_jl_StringBuilder() {
  this.h = null;
  this.h = "";
}
export { $c_jl_StringBuilder as $c_jl_StringBuilder };
$p = $c_jl_StringBuilder.prototype = new $h_O();
$p.constructor = $c_jl_StringBuilder;
/** @constructor */
function $h_jl_StringBuilder() {
}
export { $h_jl_StringBuilder as $h_jl_StringBuilder };
$h_jl_StringBuilder.prototype = $p;
$p.g = (function() {
  return this.h;
});
$p.p = (function() {
  return this.h.length;
});
$p.ap = (function(index) {
  return this.h.charCodeAt(index);
});
var $d_jl_StringBuilder = new $TypeData().i($c_jl_StringBuilder, "java.lang.StringBuilder", ({
  ab: 1,
  x: 1,
  a0: 1,
  a: 1
}));
export { $d_jl_StringBuilder as $d_jl_StringBuilder };
/** @constructor */
function $c_s_PartialFunction$$anon$1() {
}
export { $c_s_PartialFunction$$anon$1 as $c_s_PartialFunction$$anon$1 };
$p = $c_s_PartialFunction$$anon$1.prototype = new $h_O();
$p.constructor = $c_s_PartialFunction$$anon$1;
/** @constructor */
function $h_s_PartialFunction$$anon$1() {
}
export { $h_s_PartialFunction$$anon$1 as $h_s_PartialFunction$$anon$1 };
$h_s_PartialFunction$$anon$1.prototype = $p;
$p.g = (function() {
  return "<function1>";
});
$p.aB = (function(x) {
  throw new $c_s_MatchError(x);
});
$p.C = (function(v1) {
  this.aB(v1);
});
var $d_s_PartialFunction$$anon$1 = new $TypeData().i($c_s_PartialFunction$$anon$1, "scala.PartialFunction$$anon$1", ({
  aj: 1,
  g: 1,
  l: 1,
  a: 1
}));
export { $d_s_PartialFunction$$anon$1 as $d_s_PartialFunction$$anon$1 };
/** @constructor */
function $c_sc_AbstractIterator() {
}
export { $c_sc_AbstractIterator as $c_sc_AbstractIterator };
$p = $c_sc_AbstractIterator.prototype = new $h_O();
$p.constructor = $c_sc_AbstractIterator;
/** @constructor */
function $h_sc_AbstractIterator() {
}
export { $h_sc_AbstractIterator as $h_sc_AbstractIterator };
$h_sc_AbstractIterator.prototype = $p;
$p.v = (function() {
  return (-1);
});
$p.ao = (function(b, start, sep, end) {
  return $f_sc_IterableOnceOps__addString__scm_StringBuilder__T__T__T__scm_StringBuilder(this, b, start, sep, end);
});
$p.r = (function() {
  return this;
});
$p.g = (function() {
  return "<iterator>";
});
class $c_jl_ArithmeticException extends $c_jl_RuntimeException {
  constructor(s) {
    super();
    $ct_jl_Throwable__T__jl_Throwable__Z__Z__(this, s, null, true, true);
  }
}
export { $c_jl_ArithmeticException as $c_jl_ArithmeticException };
var $d_jl_ArithmeticException = new $TypeData().i($c_jl_ArithmeticException, "java.lang.ArithmeticException", ({
  a1: 1,
  j: 1,
  h: 1,
  k: 1,
  a: 1
}));
export { $d_jl_ArithmeticException as $d_jl_ArithmeticException };
function $f_jl_Byte__hashCode__I($thiz) {
  return $thiz;
}
export { $f_jl_Byte__hashCode__I as $f_jl_Byte__hashCode__I };
function $f_jl_Byte__toString__T($thiz) {
  return ("" + $thiz);
}
export { $f_jl_Byte__toString__T as $f_jl_Byte__toString__T };
var $d_jl_Byte = new $TypeData().i(0, "java.lang.Byte", ({
  a3: 1,
  i: 1,
  a: 1,
  c: 1,
  d: 1
}), ((x) => $isByte(x)));
export { $d_jl_Byte as $d_jl_Byte };
class $c_jl_IndexOutOfBoundsException extends $c_jl_RuntimeException {
  constructor(s) {
    super();
    $ct_jl_Throwable__T__jl_Throwable__Z__Z__(this, s, null, true, true);
  }
}
export { $c_jl_IndexOutOfBoundsException as $c_jl_IndexOutOfBoundsException };
var $d_jl_IndexOutOfBoundsException = new $TypeData().i($c_jl_IndexOutOfBoundsException, "java.lang.IndexOutOfBoundsException", ({
  a6: 1,
  j: 1,
  h: 1,
  k: 1,
  a: 1
}));
export { $d_jl_IndexOutOfBoundsException as $d_jl_IndexOutOfBoundsException };
class $c_jl_NullPointerException extends $c_jl_RuntimeException {
  constructor() {
    super();
    $ct_jl_Throwable__T__jl_Throwable__Z__Z__(this, null, null, true, true);
  }
}
export { $c_jl_NullPointerException as $c_jl_NullPointerException };
var $d_jl_NullPointerException = new $TypeData().i($c_jl_NullPointerException, "java.lang.NullPointerException", ({
  a8: 1,
  j: 1,
  h: 1,
  k: 1,
  a: 1
}));
export { $d_jl_NullPointerException as $d_jl_NullPointerException };
function $f_jl_Short__hashCode__I($thiz) {
  return $thiz;
}
export { $f_jl_Short__hashCode__I as $f_jl_Short__hashCode__I };
function $f_jl_Short__toString__T($thiz) {
  return ("" + $thiz);
}
export { $f_jl_Short__toString__T as $f_jl_Short__toString__T };
var $d_jl_Short = new $TypeData().i(0, "java.lang.Short", ({
  a9: 1,
  i: 1,
  a: 1,
  c: 1,
  d: 1
}), ((x) => $isShort(x)));
export { $d_jl_Short as $d_jl_Short };
class $c_jl_UnsupportedOperationException extends $c_jl_RuntimeException {
  constructor(s) {
    super();
    $ct_jl_Throwable__T__jl_Throwable__Z__Z__(this, s, null, true, true);
  }
}
export { $c_jl_UnsupportedOperationException as $c_jl_UnsupportedOperationException };
var $d_jl_UnsupportedOperationException = new $TypeData().i($c_jl_UnsupportedOperationException, "java.lang.UnsupportedOperationException", ({
  ac: 1,
  j: 1,
  h: 1,
  k: 1,
  a: 1
}));
export { $d_jl_UnsupportedOperationException as $d_jl_UnsupportedOperationException };
class $c_ju_NoSuchElementException extends $c_jl_RuntimeException {
  constructor(s) {
    super();
    $ct_jl_Throwable__T__jl_Throwable__Z__Z__(this, s, null, true, true);
  }
}
export { $c_ju_NoSuchElementException as $c_ju_NoSuchElementException };
function $isArrayOf_ju_NoSuchElementException(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.D)));
}
export { $isArrayOf_ju_NoSuchElementException as $isArrayOf_ju_NoSuchElementException };
var $d_ju_NoSuchElementException = new $TypeData().i($c_ju_NoSuchElementException, "java.util.NoSuchElementException", ({
  D: 1,
  j: 1,
  h: 1,
  k: 1,
  a: 1
}));
export { $d_ju_NoSuchElementException as $d_ju_NoSuchElementException };
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
  return ("of class " + $objectClassName(this$1));
}
export { $p_s_MatchError__ofClass$1__T as $p_s_MatchError__ofClass$1__T };
class $c_s_MatchError extends $c_jl_RuntimeException {
  constructor(obj) {
    super();
    this.N = null;
    this.a9 = null;
    this.aa = false;
    this.N = obj;
    $ct_jl_Throwable__T__jl_Throwable__Z__Z__(this, null, null, true, true);
  }
  a4() {
    return $p_s_MatchError__objString__T(this);
  }
}
export { $c_s_MatchError as $c_s_MatchError };
var $d_s_MatchError = new $TypeData().i($c_s_MatchError, "scala.MatchError", ({
  ag: 1,
  j: 1,
  h: 1,
  k: 1,
  a: 1
}));
export { $d_s_MatchError as $d_s_MatchError };
/** @constructor */
function $c_s_Option() {
}
export { $c_s_Option as $c_s_Option };
$p = $c_s_Option.prototype = new $h_O();
$p.constructor = $c_s_Option;
/** @constructor */
function $h_s_Option() {
}
export { $h_s_Option as $h_s_Option };
$h_s_Option.prototype = $p;
$p.I = (function() {
  return new $c_s_Product$$anon$1(this);
});
$p.A = (function() {
  return (this === $m_s_None$());
});
$p.v = (function() {
  return (this.A() ? 0 : 1);
});
$p.r = (function() {
  return (this.A() ? $m_sc_Iterator$().F : new $c_sc_Iterator$$anon$20(this.aq()));
});
/** @constructor */
function $c_s_Product$$anon$1(outer) {
  this.D = 0;
  this.ad = 0;
  this.ac = null;
  if ((outer === null)) {
    throw new $c_jl_NullPointerException();
  }
  this.ac = outer;
  this.D = 0;
  this.ad = outer.w();
}
export { $c_s_Product$$anon$1 as $c_s_Product$$anon$1 };
$p = $c_s_Product$$anon$1.prototype = new $h_sc_AbstractIterator();
$p.constructor = $c_s_Product$$anon$1;
/** @constructor */
function $h_s_Product$$anon$1() {
}
export { $h_s_Product$$anon$1 as $h_s_Product$$anon$1 };
$h_s_Product$$anon$1.prototype = $p;
$p.l = (function() {
  return (this.D < this.ad);
});
$p.i = (function() {
  var result = this.ac.x(this.D);
  this.D = ((1 + this.D) | 0);
  return result;
});
var $d_s_Product$$anon$1 = new $TypeData().i($c_s_Product$$anon$1, "scala.Product$$anon$1", ({
  ak: 1,
  o: 1,
  b: 1,
  e: 1,
  p: 1
}));
export { $d_s_Product$$anon$1 as $d_s_Product$$anon$1 };
/** @constructor */
function $c_T2(_1, _2) {
  this.j = null;
  this.z = null;
  this.j = _1;
  this.z = _2;
}
export { $c_T2 as $c_T2 };
$p = $c_T2.prototype = new $h_O();
$p.constructor = $c_T2;
/** @constructor */
function $h_T2() {
}
export { $h_T2 as $h_T2 };
$h_T2.prototype = $p;
$p.w = (function() {
  return 2;
});
$p.x = (function(n) {
  return $f_s_Product2__productElement__I__O(this, n);
});
$p.g = (function() {
  return (((("(" + this.j) + ",") + this.z) + ")");
});
$p.y = (function() {
  return "Tuple2";
});
$p.I = (function() {
  return new $c_sr_ScalaRunTime$$anon$1(this);
});
$p.m = (function() {
  return $m_s_util_hashing_MurmurHash3$().Y(this, (-116390334), true);
});
var $d_T2 = new $TypeData().i($c_T2, "scala.Tuple2", ({
  an: 1,
  al: 1,
  m: 1,
  f: 1,
  a: 1
}));
export { $d_T2 as $d_T2 };
/** @constructor */
function $c_T3(_1, _2, _3) {
  this.P = null;
  this.Q = null;
  this.R = null;
  this.P = _1;
  this.Q = _2;
  this.R = _3;
}
export { $c_T3 as $c_T3 };
$p = $c_T3.prototype = new $h_O();
$p.constructor = $c_T3;
/** @constructor */
function $h_T3() {
}
export { $h_T3 as $h_T3 };
$h_T3.prototype = $p;
$p.I = (function() {
  return new $c_s_Product$$anon$1(this);
});
$p.w = (function() {
  return 3;
});
$p.x = (function(n) {
  return $f_s_Product3__productElement__I__O(this, n);
});
$p.m = (function() {
  return $m_s_util_hashing_MurmurHash3$().Y(this, (-192629203), true);
});
$p.y = (function() {
  return "Tuple3";
});
$p.g = (function() {
  return (((((("(" + this.P) + ",") + this.Q) + ",") + this.R) + ")");
});
var $d_T3 = new $TypeData().i($c_T3, "scala.Tuple3", ({
  ao: 1,
  f: 1,
  m: 1,
  am: 1,
  a: 1
}));
export { $d_T3 as $d_T3 };
function $f_sc_Iterable__toString__T($thiz) {
  return $f_sc_IterableOnceOps__mkString__T__T__T__T($thiz, ($thiz.a3() + "("), ", ", ")");
}
export { $f_sc_Iterable__toString__T as $f_sc_Iterable__toString__T };
/** @constructor */
function $c_sc_Iterator$$anon$19() {
}
export { $c_sc_Iterator$$anon$19 as $c_sc_Iterator$$anon$19 };
$p = $c_sc_Iterator$$anon$19.prototype = new $h_sc_AbstractIterator();
$p.constructor = $c_sc_Iterator$$anon$19;
/** @constructor */
function $h_sc_Iterator$$anon$19() {
}
export { $h_sc_Iterator$$anon$19 as $h_sc_Iterator$$anon$19 };
$h_sc_Iterator$$anon$19.prototype = $p;
$p.l = (function() {
  return false;
});
$p.aM = (function() {
  throw new $c_ju_NoSuchElementException("next on empty iterator");
});
$p.v = (function() {
  return 0;
});
$p.i = (function() {
  this.aM();
});
var $d_sc_Iterator$$anon$19 = new $TypeData().i($c_sc_Iterator$$anon$19, "scala.collection.Iterator$$anon$19", ({
  aw: 1,
  o: 1,
  b: 1,
  e: 1,
  p: 1
}));
export { $d_sc_Iterator$$anon$19 as $d_sc_Iterator$$anon$19 };
/** @constructor */
function $c_sc_Iterator$$anon$20(a$2) {
  this.af = null;
  this.T = false;
  this.af = a$2;
  this.T = false;
}
export { $c_sc_Iterator$$anon$20 as $c_sc_Iterator$$anon$20 };
$p = $c_sc_Iterator$$anon$20.prototype = new $h_sc_AbstractIterator();
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
    return $m_sc_Iterator$().F.i();
  } else {
    this.T = true;
    return this.af;
  }
});
var $d_sc_Iterator$$anon$20 = new $TypeData().i($c_sc_Iterator$$anon$20, "scala.collection.Iterator$$anon$20", ({
  ax: 1,
  o: 1,
  b: 1,
  e: 1,
  p: 1
}));
export { $d_sc_Iterator$$anon$20 as $d_sc_Iterator$$anon$20 };
function $f_sc_LinearSeqOps__apply__I__O($thiz, n) {
  if ((n < 0)) {
    throw new $c_jl_IndexOutOfBoundsException(("" + n));
  }
  var skipped = $thiz.aF(n);
  if (skipped.A()) {
    throw new $c_jl_IndexOutOfBoundsException(("" + n));
  }
  return skipped.aI();
}
export { $f_sc_LinearSeqOps__apply__I__O as $f_sc_LinearSeqOps__apply__I__O };
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
$p = $c_sr_ScalaRunTime$$anon$1.prototype = new $h_sc_AbstractIterator();
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
var $d_sr_ScalaRunTime$$anon$1 = new $TypeData().i($c_sr_ScalaRunTime$$anon$1, "scala.runtime.ScalaRunTime$$anon$1", ({
  b0: 1,
  o: 1,
  b: 1,
  e: 1,
  p: 1
}));
export { $d_sr_ScalaRunTime$$anon$1 as $d_sr_ScalaRunTime$$anon$1 };
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
export { $f_jl_Double__hashCode__I as $f_jl_Double__hashCode__I };
function $f_jl_Double__toString__T($thiz) {
  return ("" + $thiz);
}
export { $f_jl_Double__toString__T as $f_jl_Double__toString__T };
function $isArrayOf_jl_Double(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.B)));
}
export { $isArrayOf_jl_Double as $isArrayOf_jl_Double };
var $d_jl_Double = new $TypeData().i(0, "java.lang.Double", ({
  B: 1,
  i: 1,
  a: 1,
  c: 1,
  d: 1,
  n: 1
}), ((x) => ((typeof x) === "number")));
export { $d_jl_Double as $d_jl_Double };
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
export { $f_jl_Float__hashCode__I as $f_jl_Float__hashCode__I };
function $f_jl_Float__toString__T($thiz) {
  return ("" + $thiz);
}
export { $f_jl_Float__toString__T as $f_jl_Float__toString__T };
var $d_jl_Float = new $TypeData().i(0, "java.lang.Float", ({
  a5: 1,
  i: 1,
  a: 1,
  c: 1,
  d: 1,
  n: 1
}), ((x) => $isFloat(x)));
export { $d_jl_Float as $d_jl_Float };
function $f_jl_Integer__hashCode__I($thiz) {
  return $thiz;
}
export { $f_jl_Integer__hashCode__I as $f_jl_Integer__hashCode__I };
function $f_jl_Integer__toString__T($thiz) {
  return ("" + $thiz);
}
export { $f_jl_Integer__toString__T as $f_jl_Integer__toString__T };
var $d_jl_Integer = new $TypeData().i(0, "java.lang.Integer", ({
  a7: 1,
  i: 1,
  a: 1,
  c: 1,
  d: 1,
  n: 1
}), ((x) => $isInt(x)));
export { $d_jl_Integer as $d_jl_Integer };
function $f_jl_Long__hashCode__I($thiz) {
  return ($thiz.a ^ $thiz.b);
}
export { $f_jl_Long__hashCode__I as $f_jl_Long__hashCode__I };
function $f_jl_Long__toString__T($thiz) {
  return $m_RTLong$().ax($thiz.a, $thiz.b);
}
export { $f_jl_Long__toString__T as $f_jl_Long__toString__T };
function $isArrayOf_jl_Long(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.C)));
}
export { $isArrayOf_jl_Long as $isArrayOf_jl_Long };
var $d_jl_Long = new $TypeData().i(0, "java.lang.Long", ({
  C: 1,
  i: 1,
  a: 1,
  c: 1,
  d: 1,
  n: 1
}), ((x) => (x instanceof $c_RTLong)));
export { $d_jl_Long as $d_jl_Long };
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
export { $f_T__hashCode__I as $f_T__hashCode__I };
function $f_T__toString__T($thiz) {
  return $thiz;
}
export { $f_T__toString__T as $f_T__toString__T };
var $d_T = new $TypeData().i(0, "java.lang.String", ({
  aa: 1,
  a: 1,
  c: 1,
  x: 1,
  d: 1,
  n: 1
}), ((x) => ((typeof x) === "string")));
export { $d_T as $d_T };
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
$p.m = (function() {
  return 2433880;
});
$p.g = (function() {
  return "None";
});
$p.w = (function() {
  return 0;
});
$p.y = (function() {
  return "None";
});
$p.x = (function(n) {
  throw new $c_jl_IndexOutOfBoundsException(("" + n));
});
$p.aH = (function() {
  throw new $c_ju_NoSuchElementException("None.get");
});
$p.aq = (function() {
  this.aH();
});
var $d_s_None$ = new $TypeData().i($c_s_None$, "scala.None$", ({
  ah: 1,
  F: 1,
  b: 1,
  f: 1,
  m: 1,
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
  this.E = null;
  this.E = value;
}
export { $c_s_Some as $c_s_Some };
$p = $c_s_Some.prototype = new $h_s_Option();
$p.constructor = $c_s_Some;
/** @constructor */
function $h_s_Some() {
}
export { $h_s_Some as $h_s_Some };
$h_s_Some.prototype = $p;
$p.m = (function() {
  return $m_s_util_hashing_MurmurHash3$().Y(this, 1323286827, true);
});
$p.g = (function() {
  return $m_sr_ScalaRunTime$().an(this);
});
$p.w = (function() {
  return 1;
});
$p.y = (function() {
  return "Some";
});
$p.x = (function(n) {
  if ((n === 0)) {
    return this.E;
  }
  throw new $c_jl_IndexOutOfBoundsException(("" + n));
});
$p.aq = (function() {
  return this.E;
});
function $isArrayOf_s_Some(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.G)));
}
export { $isArrayOf_s_Some as $isArrayOf_s_Some };
var $d_s_Some = new $TypeData().i($c_s_Some, "scala.Some", ({
  G: 1,
  F: 1,
  b: 1,
  f: 1,
  m: 1,
  a: 1
}));
export { $d_s_Some as $d_s_Some };
/** @constructor */
function $c_sc_AbstractIterable() {
}
export { $c_sc_AbstractIterable as $c_sc_AbstractIterable };
$p = $c_sc_AbstractIterable.prototype = new $h_O();
$p.constructor = $c_sc_AbstractIterable;
/** @constructor */
function $h_sc_AbstractIterable() {
}
export { $h_sc_AbstractIterable as $h_sc_AbstractIterable };
$h_sc_AbstractIterable.prototype = $p;
$p.ao = (function(b, start, sep, end) {
  return $f_sc_IterableOnceOps__addString__scm_StringBuilder__T__T__T__scm_StringBuilder(this, b, start, sep, end);
});
$p.a3 = (function() {
  return this.J();
});
/** @constructor */
function $c_sc_IndexedSeqView$IndexedSeqViewIterator(self) {
  this.ae = null;
  this.S = 0;
  this.B = 0;
  this.ae = self;
  this.S = 0;
  this.B = self.p();
}
export { $c_sc_IndexedSeqView$IndexedSeqViewIterator as $c_sc_IndexedSeqView$IndexedSeqViewIterator };
$p = $c_sc_IndexedSeqView$IndexedSeqViewIterator.prototype = new $h_sc_AbstractIterator();
$p.constructor = $c_sc_IndexedSeqView$IndexedSeqViewIterator;
/** @constructor */
function $h_sc_IndexedSeqView$IndexedSeqViewIterator() {
}
export { $h_sc_IndexedSeqView$IndexedSeqViewIterator as $h_sc_IndexedSeqView$IndexedSeqViewIterator };
$h_sc_IndexedSeqView$IndexedSeqViewIterator.prototype = $p;
$p.v = (function() {
  return this.B;
});
$p.l = (function() {
  return (this.B > 0);
});
$p.i = (function() {
  if ((this.B > 0)) {
    var r = this.ae.n(this.S);
    this.S = ((1 + this.S) | 0);
    this.B = (((-1) + this.B) | 0);
    return r;
  } else {
    return $m_sc_Iterator$().F.i();
  }
});
var $d_sc_IndexedSeqView$IndexedSeqViewIterator = new $TypeData().i($c_sc_IndexedSeqView$IndexedSeqViewIterator, "scala.collection.IndexedSeqView$IndexedSeqViewIterator", ({
  at: 1,
  o: 1,
  b: 1,
  e: 1,
  p: 1,
  a: 1
}));
export { $d_sc_IndexedSeqView$IndexedSeqViewIterator as $d_sc_IndexedSeqView$IndexedSeqViewIterator };
function $f_sc_View__toString__T($thiz) {
  return ($thiz.J() + "(<not computed>)");
}
export { $f_sc_View__toString__T as $f_sc_View__toString__T };
function $isArrayOf_sjs_js_JavaScriptException(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.b5)));
}
export { $isArrayOf_sjs_js_JavaScriptException as $isArrayOf_sjs_js_JavaScriptException };
function $p_sc_StrictOptimizedLinearSeqOps__loop$2__I__sc_LinearSeq__sc_LinearSeq($thiz, n, s) {
  var s$tailLocal1 = s;
  var n$tailLocal1 = n;
  while (true) {
    if (((n$tailLocal1 <= 0) || s$tailLocal1.A())) {
      return s$tailLocal1;
    } else {
      var n$tailLocal1$tmp1 = (((-1) + n$tailLocal1) | 0);
      var s$tailLocal1$tmp1 = s$tailLocal1.aS();
      n$tailLocal1 = n$tailLocal1$tmp1;
      s$tailLocal1 = s$tailLocal1$tmp1;
    }
  }
}
export { $p_sc_StrictOptimizedLinearSeqOps__loop$2__I__sc_LinearSeq__sc_LinearSeq as $p_sc_StrictOptimizedLinearSeqOps__loop$2__I__sc_LinearSeq__sc_LinearSeq };
/** @constructor */
function $c_sc_AbstractView() {
}
export { $c_sc_AbstractView as $c_sc_AbstractView };
$p = $c_sc_AbstractView.prototype = new $h_sc_AbstractIterable();
$p.constructor = $c_sc_AbstractView;
/** @constructor */
function $h_sc_AbstractView() {
}
export { $h_sc_AbstractView as $h_sc_AbstractView };
$h_sc_AbstractView.prototype = $p;
$p.g = (function() {
  return $f_sc_View__toString__T(this);
});
/** @constructor */
function $c_sc_AbstractSeq() {
}
export { $c_sc_AbstractSeq as $c_sc_AbstractSeq };
$p = $c_sc_AbstractSeq.prototype = new $h_sc_AbstractIterable();
$p.constructor = $c_sc_AbstractSeq;
/** @constructor */
function $h_sc_AbstractSeq() {
}
export { $h_sc_AbstractSeq as $h_sc_AbstractSeq };
$h_sc_AbstractSeq.prototype = $p;
$p.m = (function() {
  return $m_s_util_hashing_MurmurHash3$().aR(this);
});
$p.g = (function() {
  return $f_sc_Iterable__toString__T(this);
});
/** @constructor */
function $c_sc_AbstractSeqView() {
}
export { $c_sc_AbstractSeqView as $c_sc_AbstractSeqView };
$p = $c_sc_AbstractSeqView.prototype = new $h_sc_AbstractView();
$p.constructor = $c_sc_AbstractSeqView;
/** @constructor */
function $h_sc_AbstractSeqView() {
}
export { $h_sc_AbstractSeqView as $h_sc_AbstractSeqView };
$h_sc_AbstractSeqView.prototype = $p;
function $is_sc_IndexedSeq(obj) {
  return (!(!((obj && obj.$classData) && obj.$classData.n.s)));
}
export { $is_sc_IndexedSeq as $is_sc_IndexedSeq };
function $isArrayOf_sc_IndexedSeq(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.s)));
}
export { $isArrayOf_sc_IndexedSeq as $isArrayOf_sc_IndexedSeq };
function $ct_sc_SeqView$Id__sc_SeqOps__($thiz, underlying) {
  $thiz.U = underlying;
  return $thiz;
}
export { $ct_sc_SeqView$Id__sc_SeqOps__ as $ct_sc_SeqView$Id__sc_SeqOps__ };
/** @constructor */
function $c_sc_SeqView$Id() {
  this.U = null;
}
export { $c_sc_SeqView$Id as $c_sc_SeqView$Id };
$p = $c_sc_SeqView$Id.prototype = new $h_sc_AbstractSeqView();
$p.constructor = $c_sc_SeqView$Id;
/** @constructor */
function $h_sc_SeqView$Id() {
}
export { $h_sc_SeqView$Id as $h_sc_SeqView$Id };
$h_sc_SeqView$Id.prototype = $p;
$p.n = (function(idx) {
  return this.U.n(idx);
});
$p.p = (function() {
  return this.U.p();
});
/** @constructor */
function $c_sc_IndexedSeqView$Id(underlying) {
  this.U = null;
  $ct_sc_SeqView$Id__sc_SeqOps__(this, underlying);
}
export { $c_sc_IndexedSeqView$Id as $c_sc_IndexedSeqView$Id };
$p = $c_sc_IndexedSeqView$Id.prototype = new $h_sc_SeqView$Id();
$p.constructor = $c_sc_IndexedSeqView$Id;
/** @constructor */
function $h_sc_IndexedSeqView$Id() {
}
export { $h_sc_IndexedSeqView$Id as $h_sc_IndexedSeqView$Id };
$h_sc_IndexedSeqView$Id.prototype = $p;
$p.v = (function() {
  return this.p();
});
$p.r = (function() {
  return new $c_sc_IndexedSeqView$IndexedSeqViewIterator(this);
});
$p.J = (function() {
  return "IndexedSeqView";
});
var $d_sc_IndexedSeqView$Id = new $TypeData().i($c_sc_IndexedSeqView$Id, "scala.collection.IndexedSeqView$Id", ({
  as: 1,
  aB: 1,
  ap: 1,
  aq: 1,
  r: 1,
  b: 1,
  e: 1,
  v: 1,
  u: 1,
  t: 1,
  a: 1,
  aE: 1,
  w: 1,
  aA: 1,
  z: 1,
  ar: 1
}));
export { $d_sc_IndexedSeqView$Id as $d_sc_IndexedSeqView$Id };
/** @constructor */
function $c_sci_AbstractSeq() {
}
export { $c_sci_AbstractSeq as $c_sci_AbstractSeq };
$p = $c_sci_AbstractSeq.prototype = new $h_sc_AbstractSeq();
$p.constructor = $c_sci_AbstractSeq;
/** @constructor */
function $h_sci_AbstractSeq() {
}
export { $h_sci_AbstractSeq as $h_sci_AbstractSeq };
$h_sci_AbstractSeq.prototype = $p;
/** @constructor */
function $c_scm_AbstractSeq() {
}
export { $c_scm_AbstractSeq as $c_scm_AbstractSeq };
$p = $c_scm_AbstractSeq.prototype = new $h_sc_AbstractSeq();
$p.constructor = $c_scm_AbstractSeq;
/** @constructor */
function $h_scm_AbstractSeq() {
}
export { $h_scm_AbstractSeq as $h_scm_AbstractSeq };
$h_scm_AbstractSeq.prototype = $p;
/** @constructor */
function $c_scm_AbstractBuffer() {
}
export { $c_scm_AbstractBuffer as $c_scm_AbstractBuffer };
$p = $c_scm_AbstractBuffer.prototype = new $h_scm_AbstractSeq();
$p.constructor = $c_scm_AbstractBuffer;
/** @constructor */
function $h_scm_AbstractBuffer() {
}
export { $h_scm_AbstractBuffer as $h_scm_AbstractBuffer };
$h_scm_AbstractBuffer.prototype = $p;
/** @constructor */
function $c_sci_List() {
}
export { $c_sci_List as $c_sci_List };
$p = $c_sci_List.prototype = new $h_sci_AbstractSeq();
$p.constructor = $c_sci_List;
/** @constructor */
function $h_sci_List() {
}
export { $h_sci_List as $h_sci_List };
$h_sci_List.prototype = $p;
$p.n = (function(n) {
  return $f_sc_LinearSeqOps__apply__I__O(this, n);
});
$p.J = (function() {
  return "LinearSeq";
});
$p.A = (function() {
  return (this === $m_sci_Nil$());
});
$p.p = (function() {
  var these = this;
  var len = 0;
  while ((!these.A())) {
    len = ((1 + len) | 0);
    these.ay();
  }
  return len;
});
$p.a3 = (function() {
  return "List";
});
$p.aF = (function(n) {
  return $p_sc_StrictOptimizedLinearSeqOps__loop$2__I__sc_LinearSeq__sc_LinearSeq(this, n, this);
});
$p.C = (function(v1) {
  return $f_sc_LinearSeqOps__apply__I__O(this, (v1 | 0));
});
function $isArrayOf_sci_List(obj, depth) {
  return (!(!(((obj && obj.$classData) && (obj.$classData.D === depth)) && obj.$classData.B.n.J)));
}
export { $isArrayOf_sci_List as $isArrayOf_sci_List };
/** @constructor */
function $c_sci_Nil$() {
  $n_sci_Nil$ = this;
  var _1 = $m_sci_Nil$();
  $m_sci_Nil$();
}
export { $c_sci_Nil$ as $c_sci_Nil$ };
$p = $c_sci_Nil$.prototype = new $h_sci_List();
$p.constructor = $c_sci_Nil$;
/** @constructor */
function $h_sci_Nil$() {
}
export { $h_sci_Nil$ as $h_sci_Nil$ };
$h_sci_Nil$.prototype = $p;
$p.I = (function() {
  return new $c_s_Product$$anon$1(this);
});
$p.w = (function() {
  return 0;
});
$p.y = (function() {
  return "Nil";
});
$p.x = (function(n) {
  throw new $c_jl_IndexOutOfBoundsException(("" + n));
});
$p.at = (function() {
  throw new $c_ju_NoSuchElementException("head of empty list");
});
$p.ay = (function() {
  throw new $c_jl_UnsupportedOperationException("tail of empty list");
});
$p.v = (function() {
  return 0;
});
$p.r = (function() {
  return $m_sc_Iterator$().F;
});
$p.aI = (function() {
  this.at();
});
$p.aS = (function() {
  this.ay();
});
var $d_sci_Nil$ = new $TypeData().i($c_sci_Nil$, "scala.collection.immutable.Nil$", ({
  aK: 1,
  J: 1,
  aG: 1,
  y: 1,
  r: 1,
  b: 1,
  e: 1,
  v: 1,
  u: 1,
  t: 1,
  g: 1,
  l: 1,
  w: 1,
  f: 1,
  A: 1,
  aH: 1,
  aM: 1,
  aL: 1,
  az: 1,
  ay: 1,
  aJ: 1,
  aI: 1,
  H: 1,
  I: 1,
  aC: 1,
  aN: 1,
  a: 1,
  aF: 1,
  m: 1
}));
export { $d_sci_Nil$ as $d_sci_Nil$ };
var $n_sci_Nil$;
function $m_sci_Nil$() {
  if ((!$n_sci_Nil$)) {
    $n_sci_Nil$ = new $c_sci_Nil$();
  }
  return $n_sci_Nil$;
}
export { $m_sci_Nil$ as $m_sci_Nil$ };
function $ct_scm_StringBuilder__jl_StringBuilder__($thiz, underlying) {
  $thiz.t = underlying;
  return $thiz;
}
export { $ct_scm_StringBuilder__jl_StringBuilder__ as $ct_scm_StringBuilder__jl_StringBuilder__ };
function $ct_scm_StringBuilder__($thiz) {
  $ct_scm_StringBuilder__jl_StringBuilder__($thiz, new $c_jl_StringBuilder());
  return $thiz;
}
export { $ct_scm_StringBuilder__ as $ct_scm_StringBuilder__ };
/** @constructor */
function $c_scm_StringBuilder() {
  this.t = null;
}
export { $c_scm_StringBuilder as $c_scm_StringBuilder };
$p = $c_scm_StringBuilder.prototype = new $h_scm_AbstractSeq();
$p.constructor = $c_scm_StringBuilder;
/** @constructor */
function $h_scm_StringBuilder() {
}
export { $h_scm_StringBuilder as $h_scm_StringBuilder };
$h_scm_StringBuilder.prototype = $p;
$p.r = (function() {
  return new $c_sc_IndexedSeqView$IndexedSeqViewIterator(new $c_sc_IndexedSeqView$Id(this));
});
$p.J = (function() {
  return "IndexedSeq";
});
$p.p = (function() {
  return this.t.p();
});
$p.v = (function() {
  return this.t.p();
});
$p.g = (function() {
  return this.t.h;
});
$p.n = (function(i) {
  return $bC(this.t.ap(i));
});
$p.C = (function(v1) {
  var i = (v1 | 0);
  return $bC(this.t.ap(i));
});
var $d_scm_StringBuilder = new $TypeData().i($c_scm_StringBuilder, "scala.collection.mutable.StringBuilder", ({
  aT: 1,
  K: 1,
  y: 1,
  r: 1,
  b: 1,
  e: 1,
  v: 1,
  u: 1,
  t: 1,
  g: 1,
  l: 1,
  w: 1,
  f: 1,
  A: 1,
  R: 1,
  q: 1,
  N: 1,
  T: 1,
  S: 1,
  M: 1,
  O: 1,
  L: 1,
  aR: 1,
  z: 1,
  s: 1,
  Q: 1,
  P: 1,
  x: 1,
  a: 1
}));
export { $d_scm_StringBuilder as $d_scm_StringBuilder };
/** @constructor */
function $c_sjs_js_WrappedArray(array) {
  this.H = null;
  this.H = array;
}
export { $c_sjs_js_WrappedArray as $c_sjs_js_WrappedArray };
$p = $c_sjs_js_WrappedArray.prototype = new $h_scm_AbstractBuffer();
$p.constructor = $c_sjs_js_WrappedArray;
/** @constructor */
function $h_sjs_js_WrappedArray() {
}
export { $h_sjs_js_WrappedArray as $h_sjs_js_WrappedArray };
$h_sjs_js_WrappedArray.prototype = $p;
$p.J = (function() {
  return "IndexedSeq";
});
$p.r = (function() {
  return new $c_sc_IndexedSeqView$IndexedSeqViewIterator(new $c_sc_IndexedSeqView$Id(this));
});
$p.n = (function(index) {
  return this.H[index];
});
$p.p = (function() {
  return (this.H.length | 0);
});
$p.v = (function() {
  return (this.H.length | 0);
});
$p.a3 = (function() {
  return "WrappedArray";
});
$p.C = (function(v1) {
  var index = (v1 | 0);
  return this.H[index];
});
var $d_sjs_js_WrappedArray = new $TypeData().i($c_sjs_js_WrappedArray, "scala.scalajs.js.WrappedArray", ({
  b8: 1,
  aO: 1,
  K: 1,
  y: 1,
  r: 1,
  b: 1,
  e: 1,
  v: 1,
  u: 1,
  t: 1,
  g: 1,
  l: 1,
  w: 1,
  f: 1,
  A: 1,
  R: 1,
  q: 1,
  N: 1,
  T: 1,
  S: 1,
  M: 1,
  O: 1,
  aS: 1,
  aP: 1,
  I: 1,
  H: 1,
  P: 1,
  z: 1,
  s: 1,
  Q: 1,
  aQ: 1,
  L: 1,
  a: 1
}));
export { $d_sjs_js_WrappedArray as $d_sjs_js_WrappedArray };
$L0 = new $c_RTLong(0, 0);
$d_J.z = $L0;
