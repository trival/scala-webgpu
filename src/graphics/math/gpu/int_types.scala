package graphics.math.gpu

// Zero-cost unsigned 32-bit type for the shader DSL.
// Bit-identical to Int at runtime; distinct in the type system so that
// WgslFn parameter / return types and ToExpr match cases stay unambiguous.
// Keeping it here (alongside Sampler, Texture2D, and the phantom vec types)
// rather than in trivalibs reflects that u32 is a GPU / WGSL concept with no
// general Scala utility.

final class UInt(val toInt: Int) extends AnyVal

object UInt:
  inline def apply(v: Int): UInt = new UInt(v)

extension (v: Int) inline def u: UInt = UInt(v)

// GPU-only phantom markers for integer vector types.
// No CPU-side value representation — these exist only to carry WGSLType
// instances and serve as WgslFn parameter / return types.

sealed trait IVec2
sealed trait IVec3
sealed trait IVec4
sealed trait UVec2
sealed trait UVec3
sealed trait UVec4
