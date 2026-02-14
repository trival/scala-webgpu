package gpu.math

import gpu.AttributeLayout
import gpu.UniformLayout
import gpu.WGSLType
import trivalibs.bufferdata.F32

class Vec3(x: Float = 0f, y: Float = 0f, z: Float = 0f)
    extends AttributeLayout[F32 *: F32 *: F32 *: EmptyTuple],
      UniformLayout[(F32, F32, F32, F32)]

object Vec3:
  given WGSLType[Vec3]:
    def wgslName = "vec3<f32>"
    def byteSize = 12
    def alignment = 16 // WGSL alignment rules
    def vertexFormat = "float32x3"

    type U = Vec3#AttributeLayout
