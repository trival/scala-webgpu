package graphics.shader.lib.random

import graphics.math.gpu.{*, given}
import graphics.math.gpu.Expr.*
import graphics.shader.{given}
import graphics.shader.dsl.WgslFnData
import munit.FunSuite

class HashFnsTest extends FunSuite:

  // ---------------------------------------------------------------------------
  // u32_to_f32
  // ---------------------------------------------------------------------------

  test("u32ToF32 emits correct WGSL"):
    val data = Hash.u32ToF32.asInstanceOf[WgslFnData]
    assert(data.src.contains("fn u32_to_f32(x: u32)"), data.src)
    assert(data.src.contains("-> f32"), data.src)
    assert(data.src.contains("f32(x) / f32(0xffffffffu)"), data.src)

  // ---------------------------------------------------------------------------
  // Scalar u32 hashes — WGSL structure checks
  // ---------------------------------------------------------------------------

  test("hashU32 emits hash_u32 with correct body"):
    val data = Hash.hashU32.asInstanceOf[WgslFnData]
    assert(data.src.contains("fn hash_u32(x: u32)"), data.src)
    assert(data.src.contains("-> u32"), data.src)
    assert(data.src.contains("0x21f0aaadu"), data.src)
    assert(data.src.contains("0xd35a2d97u"), data.src)
    assert(data.src.contains(">> 16u"), data.src)

  test("hashU32Triple32 emits hash_u32_triple32 with correct body"):
    val data = Hash.hashU32Triple32.asInstanceOf[WgslFnData]
    assert(data.src.contains("fn hash_u32_triple32(x: u32)"), data.src)
    assert(data.src.contains("0xed5ad4bbu"), data.src)
    assert(data.src.contains("0xac4c1b51u"), data.src)
    assert(data.src.contains("0x31848babu"), data.src)

  test("hash1 calls hash_u32 and u32_to_f32"):
    val data = Hash.hash1.asInstanceOf[WgslFnData]
    assert(data.src.contains("fn hash1(x: u32)"), data.src)
    assert(data.src.contains("-> f32"), data.src)
    assert(data.src.contains("hash_u32(x)"), data.src)
    assert(data.src.contains("u32_to_f32("), data.src)

  // ---------------------------------------------------------------------------
  // 2D scalar (Inigo Quilez family)
  // ---------------------------------------------------------------------------

  test("hash21i emits hash21i with u32 return"):
    val data = Hash.hash21i.asInstanceOf[WgslFnData]
    assert(data.src.contains("fn hash21i(p: vec2<u32>)"), data.src)
    assert(data.src.contains("-> u32"), data.src)
    assert(data.src.contains("73333u"), data.src)
    assert(data.src.contains("3333777777u"), data.src)

  test("hash21 calls hash21i and u32_to_f32"):
    val data = Hash.hash21.asInstanceOf[WgslFnData]
    assert(data.src.contains("fn hash21(p: vec2<u32>)"), data.src)
    assert(data.src.contains("hash21i(p)"), data.src)
    assert(data.src.contains("u32_to_f32("), data.src)

  // ---------------------------------------------------------------------------
  // 2D → 2D (PCG family)
  // ---------------------------------------------------------------------------

  test("hash2di emits hash2di with vec2<u32> return"):
    val data = Hash.hash2di.asInstanceOf[WgslFnData]
    assert(data.src.contains("fn hash2di(v: vec2<u32>)"), data.src)
    assert(data.src.contains("-> vec2<u32>"), data.src)
    assert(data.src.contains("1664525u"), data.src)
    assert(data.src.contains("1013904223u"), data.src)

  test("hash2d calls hash2di and u32_to_f32"):
    val data = Hash.hash2d.asInstanceOf[WgslFnData]
    assert(data.src.contains("fn hash2d(v: vec2<u32>)"), data.src)
    assert(data.src.contains("-> vec2<f32>"), data.src)
    assert(data.src.contains("hash2di(v)"), data.src)

  // ---------------------------------------------------------------------------
  // 3D → 3D
  // ---------------------------------------------------------------------------

  test("hash3di emits hash3di with vec3<u32> return"):
    val data = Hash.hash3di.asInstanceOf[WgslFnData]
    assert(data.src.contains("fn hash3di(v: vec3<u32>)"), data.src)
    assert(data.src.contains("-> vec3<u32>"), data.src)

  test("hash3d calls hash3di"):
    val data = Hash.hash3d.asInstanceOf[WgslFnData]
    assert(data.src.contains("fn hash3d(v: vec3<u32>)"), data.src)
    assert(data.src.contains("-> vec3<f32>"), data.src)
    assert(data.src.contains("hash3di(v)"), data.src)

  // ---------------------------------------------------------------------------
  // 4D → 4D
  // ---------------------------------------------------------------------------

  test("hash4di emits hash4di with vec4<u32> return"):
    val data = Hash.hash4di.asInstanceOf[WgslFnData]
    assert(data.src.contains("fn hash4di(v: vec4<u32>)"), data.src)
    assert(data.src.contains("-> vec4<u32>"), data.src)

  test("hash4d calls hash4di"):
    val data = Hash.hash4d.asInstanceOf[WgslFnData]
    assert(data.src.contains("fn hash4d(v: vec4<u32>)"), data.src)
    assert(data.src.contains("-> vec4<f32>"), data.src)
    assert(data.src.contains("hash4di(v)"), data.src)

  // ---------------------------------------------------------------------------
  // Float-input ergonomic wrappers
  // ---------------------------------------------------------------------------

  test("hash1FromFloat uses bitcast<u32>"):
    val data = Hash.hash1FromFloat.asInstanceOf[WgslFnData]
    assert(data.src.contains("fn hash1_from_float(x: f32)"), data.src)
    assert(data.src.contains("bitcast<u32>(x)"), data.src)
    assert(data.src.contains("hash1("), data.src)

  test("hash2dFromVec uses bitcast<vec2<u32>>"):
    val data = Hash.hash2dFromVec.asInstanceOf[WgslFnData]
    assert(data.src.contains("fn hash2d_from_vec(v: vec2<f32>)"), data.src)
    assert(data.src.contains("bitcast<vec2<u32>>(v)"), data.src)

  test("hash3dFromVec uses bitcast<vec3<u32>>"):
    val data = Hash.hash3dFromVec.asInstanceOf[WgslFnData]
    assert(data.src.contains("fn hash3d_from_vec(v: vec3<f32>)"), data.src)
    assert(data.src.contains("bitcast<vec3<u32>>(v)"), data.src)

  test("hash4dFromVec uses bitcast<vec4<u32>>"):
    val data = Hash.hash4dFromVec.asInstanceOf[WgslFnData]
    assert(data.src.contains("fn hash4d_from_vec(v: vec4<f32>)"), data.src)
    assert(data.src.contains("bitcast<vec4<u32>>(v)"), data.src)

  // ---------------------------------------------------------------------------
  // Apply-site typing
  // ---------------------------------------------------------------------------

  test("hash1 apply-site produces FloatExpr"):
    val result = Hash.hash1(5.u)
    assertEquals(result.toString, "hash1(5u)")

  test("hash2d apply-site produces Vec2Expr"):
    val result = Hash.hash2d(uvec2(1.u, 2.u))
    assertEquals(result.toString, "hash2d(vec2<u32>(1u, 2u))")

  // ---------------------------------------------------------------------------
  // Dependency resolution
  // ---------------------------------------------------------------------------

  test("hash1 carries hashU32 and u32ToF32 as deps"):
    val data = Hash.hash1.asInstanceOf[WgslFnData]
    val depNames = data.deps.map(_.name).toSeq
    assert(depNames.contains("hash_u32"), depNames)
    assert(depNames.contains("u32_to_f32"), depNames)

  test("hash2d carries hash2di and u32ToF32 as deps"):
    val data = Hash.hash2d.asInstanceOf[WgslFnData]
    val depNames = data.deps.map(_.name).toSeq
    assert(depNames.contains("hash2di"), depNames)
    assert(depNames.contains("u32_to_f32"), depNames)

  test("hash1FromFloat carries hash1 as dep"):
    val data = Hash.hash1FromFloat.asInstanceOf[WgslFnData]
    val depNames = data.deps.map(_.name).toSeq
    assert(depNames.contains("hash1"), depNames)

  test("hash2dFromVec carries hash2d as dep"):
    val data = Hash.hash2dFromVec.asInstanceOf[WgslFnData]
    val depNames = data.deps.map(_.name).toSeq
    assert(depNames.contains("hash2d"), depNames)

  test("hashU32 has no deps"):
    val data = Hash.hashU32.asInstanceOf[WgslFnData]
    assertEquals(data.deps.length, 0)
