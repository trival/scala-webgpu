package gpu.math

import gpu.AttributeLayout
import gpu.UniformLayout
import gpu.WGSLType
import trivalibs.bufferdata.F32

class Vec4(x: Float = 0f, y: Float = 0f, z: Float = 0f, w: Float = 0f)
    extends AttributeLayout[(F32, F32, F32, F32)],
      UniformLayout[(F32, F32, F32, F32)]

object Vec4:
  given WGSLType[Vec4]:
    def wgslName = "vec4<f32>"
    def byteSize = 16
    def alignment = 16
    def vertexFormat = "float32x4"
