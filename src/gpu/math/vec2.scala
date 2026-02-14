package gpu.math

import gpu.AttributeLayout
import gpu.UniformLayout
import gpu.WGSLType
import trivalibs.bufferdata.F32

class Vec2(x: Float = 0f, y: Float = 0f)
    extends AttributeLayout[(F32, F32)],
      UniformLayout[(F32, F32)]

object Vec2:
  given WGSLType[Vec2]:
    def wgslName = "vec2<f32>"
    def byteSize = 8
    def alignment = 8
    def vertexFormat = "float32x2"
