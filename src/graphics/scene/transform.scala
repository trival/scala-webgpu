package graphics.scene

import graphics.math.cpu.{*, given}
import trivalibs.utils.js.*

// ---------------------------------------------------------------------------
// Transform — TRS (Translation, Rotation, Scale) stored separately.
// Matrix is computed on demand via toMatrix(). Mutable, zero-allocation.
// ---------------------------------------------------------------------------

class Transform(
    var translation: Vec3 = Vec3.zero,
    var rotation: Quat = Quat.identity,
    var scale: Vec3 = Vec3(1.0, 1.0, 1.0),
)

object Transform:
  def identity: Transform = new Transform()

  def fromTranslation(t: Vec3): Transform = new Transform(translation = t)
  def fromRotation(r: Quat): Transform = new Transform(rotation = r)
  def fromScale(s: Vec3): Transform = new Transform(scale = s)
  def fromScale(s: Double): Transform = new Transform(scale = Vec3(s, s, s))

  def fromXyz(x: Double, y: Double, z: Double): Transform =
    new Transform(translation = Vec3(x, y, z))

  def fromRotationX(angle: Double): Transform =
    new Transform(rotation = Quat.fromRotationX(angle))
  def fromRotationY(angle: Double): Transform =
    new Transform(rotation = Quat.fromRotationY(angle))
  def fromRotationZ(angle: Double): Transform =
    new Transform(rotation = Quat.fromRotationZ(angle))

extension (t: Transform)

  // ---- Matrix output ----

  def toMatrix: Mat4 =
    Mat4.fromTranslationRotationScale(t.translation, t.rotation, t.scale)

  // ---- Local axes (derived from rotation) ----

  def localX: Vec3 = t.rotation * Vec3.X
  def localY: Vec3 = t.rotation * Vec3.Y
  def localZ: Vec3 = t.rotation * Vec3.Z

  def right: Vec3 = t.localX
  def left: Vec3 = -t.localX
  def up: Vec3 = t.localY
  def down: Vec3 = -t.localY
  def forward: Vec3 = -t.localZ // right-handed: forward is -Z
  def back: Vec3 = t.localZ

  // ---- Rotation ----

  def rotate(q: Quat): Transform =
    new Transform(t.translation, q * t.rotation, t.scale)

  def rotateSelf(q: Quat): Unit =
    t.rotation *= q // pre-multiply: q applied on top

  def rotateX(angle: Double): Transform = t.rotate(Quat.fromRotationX(angle))
  def rotateY(angle: Double): Transform = t.rotate(Quat.fromRotationY(angle))
  def rotateZ(angle: Double): Transform = t.rotate(Quat.fromRotationZ(angle))

  def rotateXSelf(angle: Double): Unit = t.rotateSelf(Quat.fromRotationX(angle))
  def rotateYSelf(angle: Double): Unit = t.rotateSelf(Quat.fromRotationY(angle))
  def rotateZSelf(angle: Double): Unit = t.rotateSelf(Quat.fromRotationZ(angle))

  // ---- Look-at orientation ----

  def lookAt(target: Vec3, up: Vec3 = Vec3.Y): Transform =
    val dir = (t.translation - target).normalize
    new Transform(t.translation, Quat.fromLookRotation(dir, up), t.scale)

  def lookAtSelf(target: Vec3, up: Vec3 = Vec3.Y): Unit =
    val dir = (t.translation - target).normalize
    t.rotation = Quat.fromLookRotation(dir, up)

  def lookTo(dir: Vec3, up: Vec3 = Vec3.Y): Transform =
    new Transform(t.translation, Quat.fromLookRotation(dir, up), t.scale)

  // ---- Composition ----

  /** Combine: parent * child — applies child first, then parent. */
  @scala.annotation.targetName("transformCompose")
  def *(other: Transform): Transform =
    new Transform(
      translation = t.translation + t.rotation * (t.scale * other.translation),
      rotation = t.rotation * other.rotation,
      scale = t.scale * other.scale,
    )

  /** Apply this transform to a world point. */
  def transformPoint(v: Vec3): Vec3 =
    t.rotation * (t.scale * v) + t.translation

  // ---- Translation ----

  def translate(delta: Vec3): Transform =
    new Transform(t.translation + delta, t.rotation, t.scale)

  def translateSelf(delta: Vec3): Unit = t.translation += delta

  // ---- Orbit ----

  def rotateAround(pivot: Vec3, q: Quat): Transform =
    val newTrans = pivot + q * (t.translation - pivot)
    new Transform(newTrans, q * t.rotation, t.scale)
