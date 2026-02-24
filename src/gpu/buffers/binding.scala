package gpu.buffers

import gpu.math.*
import trivalibs.bufferdata.F32
import trivalibs.bufferdata.StructArray
import trivalibs.bufferdata.StructRef
import trivalibs.utils.js.Obj
import trivalibs.utils.numbers.given
import webgpu.GPUBuffer
import webgpu.GPUBufferUsage
import webgpu.GPUDevice

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
    def read(ref: StructRef[F32 *: EmptyTuple]): Float = ref(0).get

  // --- Double (maps to f32 in WGSL) ---
  given UniformValue[Double, F32 *: EmptyTuple]:
    def write(ref: StructRef[F32 *: EmptyTuple], value: Double): Unit =
      ref(0).set(value.toFloat)
    def read(ref: StructRef[F32 *: EmptyTuple]): Double = ref(0).get

  // --- Vec2 ---
  given UniformValue[Vec2, Vec2Buffer]:
    import Vec2Buffer.given
    def write(ref: StructRef[Vec2Buffer], value: Vec2): Unit =
      ref := value
    def read(ref: StructRef[Vec2Buffer]): Vec2 = Vec2(ref.x, ref.y)

  given UniformValue[Vec2f, Vec2Buffer]:
    import Vec2Buffer.given
    def write(ref: StructRef[Vec2Buffer], value: Vec2f): Unit =
      ref := value
    def read(ref: StructRef[Vec2Buffer]): Vec2f = Vec2f(ref.x, ref.y)

  // --- Vec3 — uses Vec4Buffer for std140 padding; w component ignored ---
  given UniformValue[Vec3, Vec4Buffer]:
    import Vec4Buffer.given
    def write(ref: StructRef[Vec4Buffer], value: Vec3): Unit =
      ref.x = value.x.toFloat; ref.y = value.y.toFloat; ref.z = value.z.toFloat
    def read(ref: StructRef[Vec4Buffer]): Vec3 = Vec3(ref.x, ref.y, ref.z)

  given UniformValue[Vec3f, Vec4Buffer]:
    import Vec4Buffer.given
    def write(ref: StructRef[Vec4Buffer], value: Vec3f): Unit =
      ref.x = value.x; ref.y = value.y; ref.z = value.z
    def read(ref: StructRef[Vec4Buffer]): Vec3f = Vec3f(ref.x, ref.y, ref.z)

  // --- Vec4 ---
  given UniformValue[Vec4, Vec4Buffer]:
    import Vec4Buffer.given
    def write(ref: StructRef[Vec4Buffer], value: Vec4): Unit =
      ref := value
    def read(ref: StructRef[Vec4Buffer]): Vec4 =
      Vec4(ref.x, ref.y, ref.z, ref.w)

  given UniformValue[Vec4f, Vec4Buffer]:
    import Vec4Buffer.given
    def write(ref: StructRef[Vec4Buffer], value: Vec4f): Unit =
      ref := value
    def read(ref: StructRef[Vec4Buffer]): Vec4f =
      Vec4f(ref.x, ref.y, ref.z, ref.w)

  // --- Mat2 ---
  given UniformValue[Mat2, Mat2Buffer]:
    import Mat2Buffer.given
    def write(ref: StructRef[Mat2Buffer], value: Mat2): Unit =
      ref := value
    def read(ref: StructRef[Mat2Buffer]): Mat2 =
      Mat2(ref.m00, ref.m01, ref.m10, ref.m11)

  // --- Mat3 — padded buffer; accessors handle padding offsets ---
  given UniformValue[Mat3, Mat3PaddedBuffer]:
    import Mat3PaddedBuffer.given
    def write(ref: StructRef[Mat3PaddedBuffer], value: Mat3): Unit =
      ref := value
    def read(ref: StructRef[Mat3PaddedBuffer]): Mat3 =
      Mat3(
        ref.m00,
        ref.m01,
        ref.m02,
        ref.m10,
        ref.m11,
        ref.m12,
        ref.m20,
        ref.m21,
        ref.m22,
      )

  // --- Mat4 ---
  given UniformValue[Mat4, Mat4Buffer]:
    import Mat4Buffer.given
    def write(ref: StructRef[Mat4Buffer], value: Mat4): Unit = ref := value
    def read(ref: StructRef[Mat4Buffer]): Mat4 =
      Mat4(
        ref.m00,
        ref.m01,
        ref.m02,
        ref.m03,
        ref.m10,
        ref.m11,
        ref.m12,
        ref.m13,
        ref.m20,
        ref.m21,
        ref.m22,
        ref.m23,
        ref.m30,
        ref.m31,
        ref.m32,
        ref.m33,
      )

// =============================================================================
// UniformValueOf[T] — single-param typeclass that collapses UniformValue[T, F]
// so makeBinding[T] can be called without spelling out F explicitly.
// =============================================================================

trait UniformValueOf[T]:
  type Fields <: Tuple
  def uniformValue: UniformValue[T, Fields]

object UniformValueOf:
  given [T, F <: Tuple] => (uv: UniformValue[T, F]) => UniformValueOf[T]:
    type Fields = F
    def uniformValue = uv

// =============================================================================
// BufferBinding[T, F] — holds CPU array + GPU buffer + device
// =============================================================================

final class BufferBinding[T, F <: Tuple](
    val buffer: StructRef[F],
    val gpuBuffer: GPUBuffer,
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
    device.queue.writeBuffer(gpuBuffer, 0.0, buffer.dataView.buffer)

// =============================================================================
// Factory
//
// Two-param form: makeBinding[Vec4, Vec4Buffer](device) — explicit F.
// One-param form: makeBinding[Vec4](device)             — F from UniformLayout.
// =============================================================================

inline def makeBinding[T, F <: Tuple](
    device: GPUDevice,
)(using uv: UniformValue[T, F]): BufferBinding[T, F] =
  val struct = StructArray.allocate[F](1)(0)
  val gpuBuf = device.createBuffer(
    Obj.literal(
      size = Math.max(16, struct.dataView.byteLength),
      usage = GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    ),
  )
  new BufferBinding[T, F](struct, gpuBuf, device, uv)

inline def makeBinding[T, F <: Tuple](
    device: GPUDevice,
    initialValue: T,
)(using uv: UniformValue[T, F]): BufferBinding[T, F] =
  val b = makeBinding[T, F](device)
  b.set(initialValue)
  b

inline def makeBinding[T: UniformValueOf as ul](
    device: GPUDevice,
): BufferBinding[T, ul.Fields] =
  makeBinding[T, ul.Fields](device)(using ul.uniformValue)

inline def makeBinding[T: UniformValueOf as ul](
    device: GPUDevice,
    initialValue: T,
): BufferBinding[T, ul.Fields] =
  makeBinding[T, ul.Fields](device, initialValue)(using ul.uniformValue)

extension [T](t: T)
  inline def asBinding[F <: Tuple](device: GPUDevice)(using
      uv: UniformValue[T, F],
  ): BufferBinding[T, F] =
    makeBinding[T, F](device, t)
