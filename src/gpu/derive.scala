package gpu

import scala.compiletime.*
import scala.NamedTuple.AnyNamedTuple
import scala.scalajs.js

/** Utilities for deriving WGSL code from Scala types at compile time */
object derive:

  // ===========================================================================
  // Named Tuple Introspection (handles both empty and non-empty tuples)
  // ===========================================================================

  /** Get field names from a named tuple type as a tuple of strings */
  inline def fieldNames[T]: js.Array[String] =
    inline erasedValue[T] match
      case _: EmptyTuple => js.Array()
      case _: AnyNamedTuple =>
        fieldNamesImpl[NamedTuple.Names[T & AnyNamedTuple]]

  private inline def fieldNamesImpl[T <: Tuple]: js.Array[String] =
    inline erasedValue[T] match
      case _: EmptyTuple => js.Array()
      case _: (name *: rest) =>
        js.Array(constValue[name].asInstanceOf[String]) ++ fieldNamesImpl[rest]

  /** Get WGSL type names for each field in a named tuple */
  inline def fieldWgslTypes[T]: js.Array[String] =
    inline erasedValue[T] match
      case _: EmptyTuple => js.Array()
      case _: AnyNamedTuple =>
        fieldWgslTypesImpl[NamedTuple.DropNames[T & AnyNamedTuple]]

  private inline def fieldWgslTypesImpl[T <: Tuple]: js.Array[String] =
    inline erasedValue[T] match
      case _: EmptyTuple => js.Array()
      case _: (head *: rest) =>
        js.Array(summonInline[WGSLType[head]].wgslName) ++ fieldWgslTypesImpl[rest]

  /** Get builtin info for each field in a named tuple of builtins */
  inline def fieldBuiltins[T]: js.Array[(String, String, String)] =
    inline erasedValue[T] match
      case _: EmptyTuple => js.Array()
      case _: AnyNamedTuple =>
        fieldBuiltinsImpl[
          NamedTuple.Names[T & AnyNamedTuple],
          NamedTuple.DropNames[T & AnyNamedTuple]
        ]

  private inline def fieldBuiltinsImpl[N <: Tuple, T <: Tuple]
      : js.Array[(String, String, String)] =
    inline (erasedValue[N], erasedValue[T]) match
      case (_: EmptyTuple, _: EmptyTuple) => js.Array()
      case (_: (name *: namesRest), _: (head *: typesRest)) =>
        val bt = summonInline[BuiltinType[head]]
        js.Array((
          constValue[name].asInstanceOf[String],
          bt.wgslBuiltin,
          bt.wgslType
        )) ++ fieldBuiltinsImpl[namesRest, typesRest]

  // ===========================================================================
  // WGSL Struct Generation
  // ===========================================================================

  /** Generate a WGSL struct with @location annotations */
  inline def generateLocationStruct[T](structName: String): String =
    val names = fieldNames[T]
    val types = fieldWgslTypes[T]
    generateLocationStructFromLists(structName, names, types)

  private def generateLocationStructFromLists(
      structName: String,
      names: js.Array[String],
      types: js.Array[String]
  ): String =
    if names.isEmpty then ""
    else
      val fields = names.zip(types).zipWithIndex.map { case ((name, typ), idx) =>
        s"  @location($idx) $name: $typ,"
      }
      s"struct $structName {\n${fields.mkString("\n")}\n}"

  /** Generate a WGSL struct with @builtin annotations */
  inline def generateBuiltinStruct[T](structName: String): String =
    val builtins = fieldBuiltins[T]
    generateBuiltinStructFromList(structName, builtins)

  private def generateBuiltinStructFromList(
      structName: String,
      builtins: js.Array[(String, String, String)]
  ): String =
    if builtins.isEmpty then ""
    else
      val fields = builtins.map { case (name, builtin, typ) =>
        s"  @builtin($builtin) $name: $typ,"
      }
      s"struct $structName {\n${fields.mkString("\n")}\n}"

  /** Generate a combined struct with both @location and @builtin fields */
  inline def generateCombinedStruct[Locations, Builtins](
      structName: String
  ): String =
    val locNames = fieldNames[Locations]
    val locTypes = fieldWgslTypes[Locations]
    val builtins = fieldBuiltins[Builtins]
    generateCombinedStructFromLists(structName, locNames, locTypes, builtins)

  private def generateCombinedStructFromLists(
      structName: String,
      locNames: js.Array[String],
      locTypes: js.Array[String],
      builtins: js.Array[(String, String, String)]
  ): String =
    val locationFields = locNames.zip(locTypes).zipWithIndex.map {
      case ((name, typ), idx) =>
        s"  @location($idx) $name: $typ,"
    }
    val builtinFields = builtins.map { case (name, builtin, typ) =>
      s"  @builtin($builtin) $name: $typ,"
    }
    val allFields = locationFields ++ builtinFields
    if allFields.isEmpty then ""
    else s"struct $structName {\n${allFields.mkString("\n")}\n}"

  // ===========================================================================
  // Uniform Generation
  // ===========================================================================

  /** Generate uniform declarations from nested named tuples */
  inline def generateUniforms[T]: String =
    inline erasedValue[T] match
      case _: EmptyTuple => ""
      case _: AnyNamedTuple =>
        // T is a named tuple like (group1: (...), group2: (...))
        // We need to iterate over the values (the inner named tuples)
        generateUniformsFromNamedTuple[T & AnyNamedTuple](0)
      case _ => ""

  private inline def generateUniformsFromNamedTuple[T <: AnyNamedTuple](
      groupIdx: Int
  ): String =
    generateUniformsImpl[NamedTuple.DropNames[T]](groupIdx)

  private inline def generateUniformsImpl[T <: Tuple](groupIdx: Int): String =
    inline erasedValue[T] match
      case _: EmptyTuple => ""
      case _: (head *: rest) =>
        val groupDecls = generateUniformGroup[head](groupIdx)
        val restDecls = generateUniformsImpl[rest](groupIdx + 1)
        if restDecls.isEmpty then groupDecls
        else s"$groupDecls\n$restDecls"

  private inline def generateUniformGroup[T](groupIdx: Int): String =
    inline erasedValue[T] match
      case _: EmptyTuple => ""
      case _: AnyNamedTuple =>
        val names = fieldNames[T]
        val types = uniformFieldTypes[NamedTuple.DropNames[T & AnyNamedTuple]]
        generateUniformGroupFromLists(groupIdx, names, types)
      case _ => ""

  /** Extract WGSL type names, unwrapping VertexUniform/FragmentUniform/SharedUniform */
  private inline def uniformFieldTypes[T <: Tuple]: js.Array[String] =
    inline erasedValue[T] match
      case _: EmptyTuple => js.Array()
      case _: (head *: rest) =>
        js.Array(unwrapUniformType[head]) ++ uniformFieldTypes[rest]

  /** Unwrap uniform wrapper types to get the inner WGSL type name */
  private inline def unwrapUniformType[T]: String =
    // For now, all wrapper types are just type aliases, so T is the actual type
    summonInline[WGSLType[T]].wgslName

  private def generateUniformGroupFromLists(
      groupIdx: Int,
      names: js.Array[String],
      types: js.Array[String]
  ): String =
    names.zip(types).zipWithIndex.map { case ((name, typ), bindingIdx) =>
      s"@group($groupIdx) @binding($bindingIdx) var<uniform> $name: $typ;"
    }.mkString("\n")
