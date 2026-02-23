package gpu.buffers

import gpu.math.*
import trivalibs.bufferdata.{F32, StructArray, StructRef}
import trivalibs.utils.js.Obj
import webgpu.{GPUBuffer, GPUBufferUsage, GPUDevice}

// =============================================================================
// UniformValue[T, F] typeclass
//
// Maps a single Scala value T to its GPU buffer layout F and provides
// read/write operations on StructRef[F]. Instances live in the companion
// object so they are found via implicit search without explicit imports.
// =============================================================================

trait UniformValue[T, F <: Tuple]:
  def write(ref: StructRef[F], value: T): Unit
  def read(ref: StructRef[F]): T

object UniformValue:
  // --- Float ---
  given UniformValue[Float, F32 *: EmptyTuple]:
    def write(ref: StructRef[F32 *: EmptyTuple], value: Float): Unit =
      ref(0).set(value)
    def read(ref: StructRef[F32 *: EmptyTuple]): Float =
      ref(0).get

  // --- Double (maps to f32 in WGSL per WGSLType[Double]) ---
  given UniformValue[Double, F32 *: EmptyTuple]:
    def write(ref: StructRef[F32 *: EmptyTuple], value: Double): Unit =
      ref(0).set(value.toFloat)
    def read(ref: StructRef[F32 *: EmptyTuple]): Double =
      ref(0).get.toDouble

  // --- Vec2 (Double) ---
  given UniformValue[Vec2, Vec2Buffer]:
    def write(ref: StructRef[Vec2Buffer], value: Vec2): Unit =
      ref(0).set(value.x.toFloat)
      ref(1).set(value.y.toFloat)
    def read(ref: StructRef[Vec2Buffer]): Vec2 =
      Vec2(ref(0).get.toDouble, ref(1).get.toDouble)

  // --- Vec2f (Float) ---
  given UniformValue[Vec2f, Vec2Buffer]:
    def write(ref: StructRef[Vec2Buffer], value: Vec2f): Unit =
      ref(0).set(value.x)
      ref(1).set(value.y)
    def read(ref: StructRef[Vec2Buffer]): Vec2f =
      Vec2f(ref(0).get, ref(1).get)

  // --- Vec3 (Double) — UniformBuffer is Vec4Buffer due to WGSL std140 padding ---
  given UniformValue[Vec3, Vec4Buffer]:
    def write(ref: StructRef[Vec4Buffer], value: Vec3): Unit =
      ref(0).set(value.x.toFloat)
      ref(1).set(value.y.toFloat)
      ref(2).set(value.z.toFloat)
      // ref(3) is std140 padding, leave unchanged
    def read(ref: StructRef[Vec4Buffer]): Vec3 =
      Vec3(ref(0).get.toDouble, ref(1).get.toDouble, ref(2).get.toDouble)

  // --- Vec3f (Float) — same std140 padding treatment ---
  given UniformValue[Vec3f, Vec4Buffer]:
    def write(ref: StructRef[Vec4Buffer], value: Vec3f): Unit =
      ref(0).set(value.x)
      ref(1).set(value.y)
      ref(2).set(value.z)
    def read(ref: StructRef[Vec4Buffer]): Vec3f =
      Vec3f(ref(0).get, ref(1).get, ref(2).get)

  // --- Vec4 (Double) ---
  given UniformValue[Vec4, Vec4Buffer]:
    def write(ref: StructRef[Vec4Buffer], value: Vec4): Unit =
      ref(0).set(value.x.toFloat)
      ref(1).set(value.y.toFloat)
      ref(2).set(value.z.toFloat)
      ref(3).set(value.w.toFloat)
    def read(ref: StructRef[Vec4Buffer]): Vec4 =
      Vec4(
        ref(0).get.toDouble,
        ref(1).get.toDouble,
        ref(2).get.toDouble,
        ref(3).get.toDouble,
      )

  // --- Vec4f (Float) ---
  given UniformValue[Vec4f, Vec4Buffer]:
    def write(ref: StructRef[Vec4Buffer], value: Vec4f): Unit =
      ref(0).set(value.x)
      ref(1).set(value.y)
      ref(2).set(value.z)
      ref(3).set(value.w)
    def read(ref: StructRef[Vec4Buffer]): Vec4f =
      Vec4f(ref(0).get, ref(1).get, ref(2).get, ref(3).get)

  // --- Mat2 (Double) — col-major: m00,m01,m10,m11 ---
  given UniformValue[Mat2, Mat2Buffer]:
    def write(ref: StructRef[Mat2Buffer], value: Mat2): Unit =
      ref(0).set(value.m00.toFloat)
      ref(1).set(value.m01.toFloat)
      ref(2).set(value.m10.toFloat)
      ref(3).set(value.m11.toFloat)
    def read(ref: StructRef[Mat2Buffer]): Mat2 =
      Mat2(ref(0).get.toDouble, ref(1).get.toDouble, ref(2).get.toDouble, ref(3).get.toDouble)

  // --- Mat3 (Double) — UniformBuffer is Mat3PaddedBuffer (F32×12), padding at indices 3,7,11 ---
  given UniformValue[Mat3, Mat3PaddedBuffer]:
    def write(ref: StructRef[Mat3PaddedBuffer], value: Mat3): Unit =
      ref(0).set(value.m00.toFloat); ref(1).set(value.m01.toFloat); ref(2).set(value.m02.toFloat)
      // index 3 is padding
      ref(4).set(value.m10.toFloat); ref(5).set(value.m11.toFloat); ref(6).set(value.m12.toFloat)
      // index 7 is padding
      ref(8).set(value.m20.toFloat); ref(9).set(value.m21.toFloat); ref(10).set(value.m22.toFloat)
      // index 11 is padding
    def read(ref: StructRef[Mat3PaddedBuffer]): Mat3 =
      Mat3(
        ref(0).get.toDouble, ref(1).get.toDouble, ref(2).get.toDouble,
        ref(4).get.toDouble, ref(5).get.toDouble, ref(6).get.toDouble,
        ref(8).get.toDouble, ref(9).get.toDouble, ref(10).get.toDouble,
      )

  // --- Mat4 (Double) — col-major: m00,m01,m02,m03,m10,m11,... ---
  given UniformValue[Mat4, Mat4Buffer]:
    def write(ref: StructRef[Mat4Buffer], value: Mat4): Unit =
      ref(0).set(value.m00.toFloat);  ref(1).set(value.m01.toFloat)
      ref(2).set(value.m02.toFloat);  ref(3).set(value.m03.toFloat)
      ref(4).set(value.m10.toFloat);  ref(5).set(value.m11.toFloat)
      ref(6).set(value.m12.toFloat);  ref(7).set(value.m13.toFloat)
      ref(8).set(value.m20.toFloat);  ref(9).set(value.m21.toFloat)
      ref(10).set(value.m22.toFloat); ref(11).set(value.m23.toFloat)
      ref(12).set(value.m30.toFloat); ref(13).set(value.m31.toFloat)
      ref(14).set(value.m32.toFloat); ref(15).set(value.m33.toFloat)
    def read(ref: StructRef[Mat4Buffer]): Mat4 =
      Mat4(
        ref(0).get.toDouble,  ref(1).get.toDouble,  ref(2).get.toDouble,  ref(3).get.toDouble,
        ref(4).get.toDouble,  ref(5).get.toDouble,  ref(6).get.toDouble,  ref(7).get.toDouble,
        ref(8).get.toDouble,  ref(9).get.toDouble,  ref(10).get.toDouble, ref(11).get.toDouble,
        ref(12).get.toDouble, ref(13).get.toDouble, ref(14).get.toDouble, ref(15).get.toDouble,
      )

// =============================================================================
// BufferBinding[T, F] — holds CPU array + GPU buffer + device
// =============================================================================

final class BufferBinding[T, F <: Tuple](
    val buffer: StructRef[F],
    val gpuBuffer: GPUBuffer,
    private val cpuArray: StructArray[F],
    private val device: GPUDevice,
    private val uv: UniformValue[T, F],
):
  /** Write value to CPU buffer and immediately upload to GPU. */
  def set(value: T): Unit =
    uv.write(buffer, value)
    upload()

  /** Read value from CPU buffer (does NOT read back from GPU). */
  def get: T = uv.read(buffer)

  /** Upload current CPU buffer contents to GPU without changing them. */
  def upload(): Unit =
    device.queue.writeBuffer(gpuBuffer, 0.0, cpuArray.arrayBuffer)

// =============================================================================
// Factory
//
// Both T and F are provided explicitly by the caller, so F is always concrete
// at the call site. No summonFrom needed — just a regular using clause.
//
// Usage: makeBinding[Vec4, Vec4Buffer](device, Vec4(1,1,1,1))
// =============================================================================

inline def makeBinding[T, F <: Tuple](
    device: GPUDevice,
)(using uv: UniformValue[T, F]): BufferBinding[T, F] =
  val cpuArray = StructArray.allocate[F](1)
  val gpuBuf = device.createBuffer(
    Obj.literal(
      size = Math.max(16, cpuArray.stride),
      usage = GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    ),
  )
  new BufferBinding[T, F](cpuArray(0), gpuBuf, cpuArray, device, uv)

inline def makeBinding[T, F <: Tuple](
    device: GPUDevice,
    initialValue: T,
)(using uv: UniformValue[T, F]): BufferBinding[T, F] =
  val b = makeBinding[T, F](device)
  b.set(initialValue)
  b

extension [T](t: T)
  inline def asBinding[F <: Tuple](device: GPUDevice)(using uv: UniformValue[T, F]): BufferBinding[T, F] =
    makeBinding[T, F](device, t)
