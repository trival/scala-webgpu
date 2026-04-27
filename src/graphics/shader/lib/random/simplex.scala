package graphics.shader.lib.random

// Ported from https://github.com/johanhelsing/noisy_bevy
// MIT License. © Ian McEwan, Stefan Gustavson, Munrocket, Johan Helsing

import graphics.math.cpu.{Vec2, Vec3, Vec4}
import graphics.shader.{given}
import graphics.shader.dsl.WgslFn

object Simplex:

  // ---------------------------------------------------------------------------
  // Shared helpers — reused across 2D, 3D, and Worley algorithms
  // ---------------------------------------------------------------------------

  val permute3: WgslFn[(x: Vec3), Vec3] =
    WgslFn.raw("permute_3_")("  return (((x * 34.) + 1.) * x) % vec3(289.);")

  val permute4: WgslFn[(x: Vec4), Vec4] =
    WgslFn.raw("permute_4_")("  return ((x * 34. + 1.) * x) % vec4<f32>(289.);")

  val taylorInvSqrt4: WgslFn[(r: Vec4), Vec4] =
    WgslFn.raw("taylor_inv_sqrt_4_")(
      "  return 1.79284291400159 - 0.85373472095314 * r;",
    )

  // ---------------------------------------------------------------------------
  // 2D simplex noise
  // ---------------------------------------------------------------------------

  val simplexNoise2d: WgslFn[(v: Vec2), Float] =
    WgslFn
      .raw("simplex_noise_2d")("""
    let C = vec4(
        0.211324865405187,
        0.366025403784439,
        -0.577350269189626,
        0.024390243902439
    );
    // first corner
    var i = floor(v + dot(v, C.yy));
    let x0 = v - i + dot(i, C.xx);
    // other corners
    var i1 = select(vec2(0., 1.), vec2(1., 0.), x0.x > x0.y);
    var x12 = x0.xyxy + C.xxzz - vec4(i1, 0., 0.);
    // permutations
    i = i % vec2(289.);
    let p = permute_3_(permute_3_(i.y + vec3(0., i1.y, 1.)) + i.x + vec3(0., i1.x, 1.));
    var m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), vec3(0.));
    m *= m;
    m *= m;
    // gradients: 41 points uniformly over a line, mapped onto a diamond
    let x = 2. * fract(p * C.www) - 1.;
    let h = abs(x) - 0.5;
    let ox = floor(x + 0.5);
    let a0 = x - ox;
    m = m * (1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h));
    let g = vec3(a0.x * x0.x + h.x * x0.y, a0.yz * x12.xz + h.yz * x12.yw);
    return 130. * dot(m, g);""")
      .withDeps(permute3)

  val simplexNoise2dSeeded: WgslFn[(v: Vec2, seed: Float), Float] =
    WgslFn
      .raw("simplex_noise_2d_seeded")("""
    let C = vec4(
        0.211324865405187,
        0.366025403784439,
        -0.577350269189626,
        0.024390243902439
    );
    // first corner
    var i = floor(v + dot(v, C.yy));
    let x0 = v - i + dot(i, C.xx);
    // other corners
    var i1 = select(vec2(0., 1.), vec2(1., 0.), x0.x > x0.y);
    var x12 = x0.xyxy + C.xxzz - vec4(i1, 0., 0.);
    // permutations
    i = i % vec2(289.);
    var p = permute_3_(permute_3_(i.y + vec3(0., i1.y, 1.)) + i.x + vec3(0., i1.x, 1.));
    p = permute_3_(p + vec3(seed));
    var m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), vec3(0.));
    m *= m;
    m *= m;
    let x = 2. * fract(p * C.www) - 1.;
    let h = abs(x) - 0.5;
    let ox = floor(x + 0.5);
    let a0 = x - ox;
    m = m * (1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h));
    let g = vec3(a0.x * x0.x + h.x * x0.y, a0.yz * x12.xz + h.yz * x12.yw);
    return 130. * dot(m, g);""")
      .withDeps(permute3)

  // ---------------------------------------------------------------------------
  // 3D simplex noise
  // ---------------------------------------------------------------------------

  val simplexNoise3d: WgslFn[(v: Vec3), Float] =
    WgslFn
      .raw("simplex_noise_3d")(
        """
    let C = vec2(1. / 6., 1. / 3.);
    let D = vec4(0., 0.5, 1., 2.);
    // first corner
    var i = floor(v + dot(v, C.yyy));
    let x0 = v - i + dot(i, C.xxx);
    // other corners
    let g = step(x0.yzx, x0.xyz);
    let l = 1. - g;
    let i1 = min(g.xyz, l.zxy);
    let i2 = max(g.xyz, l.zxy);
    let x1 = x0 - i1 + 1. * C.xxx;
    let x2 = x0 - i2 + 2. * C.xxx;
    let x3 = x0 - 1. + 3. * C.xxx;
    // permutations
    i = i % vec3(289.);
    let p = permute_4_(permute_4_(permute_4_(
        i.z + vec4(0., i1.z, i2.z, 1.)) +
        i.y + vec4(0., i1.y, i2.y, 1.)) +
        i.x + vec4(0., i1.x, i2.x, 1.)
    );
    // gradients (NxN points uniformly over a square, mapped onto an octahedron)
    let n_ = 1. / 7.;
    let ns = n_ * D.wyz - D.xzx;
    let j = p - 49. * floor(p * ns.z * ns.z);
    let x_ = floor(j * ns.z);
    let y_ = floor(j - 7. * x_);
    let x = x_ * ns.x + ns.yyyy;
    let y = y_ * ns.x + ns.yyyy;
    let h = 1. - abs(x) - abs(y);
    let b0 = vec4(x.xy, y.xy);
    let b1 = vec4(x.zw, y.zw);
    let s0 = floor(b0) * 2. + 1.;
    let s1 = floor(b1) * 2. + 1.;
    let sh = -step(h, vec4(0.));
    let a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    let a1 = b1.xzyw + s1.xzyw * sh.zzww;
    var p0 = vec3(a0.xy, h.x);
    var p1 = vec3(a0.zw, h.y);
    var p2 = vec3(a1.xy, h.z);
    var p3 = vec3(a1.zw, h.w);
    // normalize gradients
    let norm = taylor_inv_sqrt_4_(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 = p0 * norm.x;
    p1 = p1 * norm.y;
    p2 = p2 * norm.z;
    p3 = p3 * norm.w;
    // mix final noise value
    var m = 0.5 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3));
    m = max(m, vec4(0.));
    m *= m;
    return 105. * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));""",
      )
      .withDeps(permute4, taylorInvSqrt4)

  val simplexNoise3dSeeded: WgslFn[(v: Vec3, seed: Vec3), Float] =
    WgslFn
      .raw("simplex_noise_3d_seeded")(
        """
    let C = vec2(1. / 6., 1. / 3.);
    let D = vec4(0., 0.5, 1., 2.);
    // first corner
    var i = floor(v + dot(v, C.yyy));
    let x0 = v - i + dot(i, C.xxx);
    // other corners
    let g = step(x0.yzx, x0.xyz);
    let l = 1. - g;
    let i1 = min(g.xyz, l.zxy);
    let i2 = max(g.xyz, l.zxy);
    let x1 = x0 - i1 + 1. * C.xxx;
    let x2 = x0 - i2 + 2. * C.xxx;
    let x3 = x0 - 1. + 3. * C.xxx;
    // permutations
    i = i % vec3(289.);
    let s = floor(seed + vec3(0.5));
    let p = permute_4_(permute_4_(permute_4_(
        i.z + vec4(0., i1.z, i2.z, 1.) + s.z) +
        i.y + vec4(0., i1.y, i2.y, 1.) + s.y) +
        i.x + vec4(0., i1.x, i2.x, 1.) + s.x
    );
    // gradients (NxN points uniformly over a square, mapped onto an octahedron)
    let n_ = 1. / 7.;
    let ns = n_ * D.wyz - D.xzx;
    let j = p - 49. * floor(p * ns.z * ns.z);
    let x_ = floor(j * ns.z);
    let y_ = floor(j - 7. * x_);
    let x = x_ * ns.x + ns.yyyy;
    let y = y_ * ns.x + ns.yyyy;
    let h = 1. - abs(x) - abs(y);
    let b0 = vec4(x.xy, y.xy);
    let b1 = vec4(x.zw, y.zw);
    let s0 = floor(b0) * 2. + 1.;
    let s1 = floor(b1) * 2. + 1.;
    let sh = -step(h, vec4(0.));
    let a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    let a1 = b1.xzyw + s1.xzyw * sh.zzww;
    var p0 = vec3(a0.xy, h.x);
    var p1 = vec3(a0.zw, h.y);
    var p2 = vec3(a1.xy, h.z);
    var p3 = vec3(a1.zw, h.w);
    // normalize gradients
    let norm = taylor_inv_sqrt_4_(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 = p0 * norm.x;
    p1 = p1 * norm.y;
    p2 = p2 * norm.z;
    p3 = p3 * norm.w;
    // mix final noise value
    var m = 0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3));
    m = max(m, vec4(0.));
    m *= m;
    return 42. * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));""",
      )
      .withDeps(permute4, taylorInvSqrt4)

  // ---------------------------------------------------------------------------
  // Fractional brownian motion
  // ---------------------------------------------------------------------------

  val fbmSimplex2d: WgslFn[
    (pos: Vec2, octaves: Int, lacunarity: Float, gain: Float),
    Float,
  ] =
    WgslFn
      .raw("fbm_simplex_2d")("""
    var sum = 0.;
    var amplitude = 1.;
    var frequency = 1.;
    for (var i = 0; i < octaves; i += 1) {
        sum += simplex_noise_2d(pos * frequency) * amplitude;
        amplitude *= gain;
        frequency *= lacunarity;
    }
    return sum;""")
      .withDeps(simplexNoise2d)

  val fbmSimplex2dSeeded: WgslFn[
    (pos: Vec2, octaves: Int, lacunarity: Float, gain: Float, seed: Float),
    Float,
  ] =
    WgslFn
      .raw("fbm_simplex_2d_seeded")("""
    var sum = 0.;
    var amplitude = 1.;
    var frequency = 1.;
    for (var i = 0; i < octaves; i += 1) {
        sum += simplex_noise_2d_seeded(pos * frequency, seed) * amplitude;
        amplitude *= gain;
        frequency *= lacunarity;
    }
    return sum;""")
      .withDeps(simplexNoise2dSeeded)

  val fbmSimplex3d: WgslFn[
    (pos: Vec3, octaves: Int, lacunarity: Float, gain: Float),
    Float,
  ] =
    WgslFn
      .raw("fbm_simplex_3d")("""
    var sum = 0.;
    var amplitude = 1.;
    var frequency = 1.;
    for (var i = 0; i < octaves; i += 1) {
        sum += simplex_noise_3d(pos * frequency) * amplitude;
        amplitude *= gain;
        frequency *= lacunarity;
    }
    return sum;""")
      .withDeps(simplexNoise3d)

  val fbmSimplex3dSeeded: WgslFn[
    (pos: Vec3, octaves: Int, lacunarity: Float, gain: Float, seed: Vec3),
    Float,
  ] =
    WgslFn
      .raw("fbm_simplex_3d_seeded")("""
    var sum = 0.;
    var amplitude = 1.;
    var frequency = 1.;
    for (var i = 0; i < octaves; i += 1) {
        sum += simplex_noise_3d_seeded(pos * frequency, seed) * amplitude;
        amplitude *= gain;
        frequency *= lacunarity;
    }
    return sum;""")
      .withDeps(simplexNoise3dSeeded)

  // ---------------------------------------------------------------------------
  // Worley / Cellular noise
  // ---------------------------------------------------------------------------

  /** Cellular noise. Returns (F1, F2) — distances to the nearest two feature
    * points. Lower jitter makes the pattern more regular.
    */
  val worley2d: WgslFn[(pos: Vec2, jitter: Float), Vec2] =
    WgslFn
      .raw("worley_2d")("""
    let k = 0.142857142857;
    let ko = 0.428571428571;
    let pi = floor(pos);
    let pf = fract(pos);
    let oi = vec3(-1.0, 0.0, 1.0);
    let of_ = vec3(-0.5, 0.5, 1.5);
    let px = permute_3_(pi.x + oi);
    var p = permute_3_(px.x + pi.y + oi);
    var ox = fract(p * k) - ko;
    var oy = (floor(p * k) % 7.0) * k - ko;
    var dx = pf.x + 0.5 + jitter * ox;
    var dy = pf.y - of_ + jitter * oy;
    var d1 = dx * dx + dy * dy;
    p = permute_3_(px.y + pi.y + oi);
    ox = fract(p * k) - ko;
    oy = (floor(p * k) % 7.0) * k - ko;
    dx = pf.x - 0.5 + jitter * ox;
    dy = pf.y - of_ + jitter * oy;
    var d2 = dx * dx + dy * dy;
    p = permute_3_(px.z + pi.y + oi);
    ox = fract(p * k) - ko;
    oy = (floor(p * k) % 7.0) * k - ko;
    dx = pf.x - 1.5 + jitter * ox;
    dy = pf.y - of_ + jitter * oy;
    let d3 = dx * dx + dy * dy;
    let d1a = min(d1, d2);
    d2 = max(d1, d2);
    d2 = min(d2, d3);
    d1 = min(d1a, d2);
    d2 = max(d1a, d2);
    if d1.x > d1.y {
        let tmp = d1.x;
        d1.x = d1.y;
        d1.y = tmp;
    }
    if d1.x > d1.z {
        let tmp = d1.x;
        d1.x = d1.z;
        d1.z = tmp;
    }
    d1.y = min(d1.y, d2.y);
    d1.z = min(d1.z, d2.z);
    d1.y = min(d1.y, d1.z);
    d1.y = min(d1.y, d2.x);
    return sqrt(d1.xy);""")
      .withDeps(permute3)
