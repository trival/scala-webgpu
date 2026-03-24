package graphics.scene

import graphics.math.cpu.{*, given}
import trivalibs.utils.numbers.NumExt.given

// ---------------------------------------------------------------------------
// PerspectiveCamera — FPS-style orientation with yaw + pitch angles.
// Projection matrix is cached and only recomputed when params change.
// ---------------------------------------------------------------------------

class PerspectiveCamera(
    var fov: Double = math.Pi / 4.0, // vertical fov, radians
    var aspect: Double = 1.0,
    var near: Double = 0.1,
    var far: Double = 1000.0,
    var rotHoriz: Double = 0.0, // yaw around Y
    var rotVert: Double = 0.0, // pitch around X, clamped ±π/2
    var translation: Vec3 = Vec3.zero,
):
  private var _proj: Mat4 = Mat4.identity
  recalculateProjection()

  // ---- Projection management ----

  def recalculateProjection(): Unit =
    _proj = Mat4.perspective(fov, aspect, near, far)

  def setAspect(newAspect: Double): Unit =
    if aspect != newAspect then
      aspect = newAspect
      recalculateProjection()

  def setFov(newFov: Double): Unit =
    if fov != newFov then
      fov = newFov
      recalculateProjection()

  def set(
      fov: Double = this.fov,
      aspect: Double = this.aspect,
      near: Double = this.near,
      far: Double = this.far,
  ): Unit =
    val needsProj = fov != this.fov || aspect != this.aspect ||
      near != this.near || far != this.far
    this.fov = fov; this.aspect = aspect; this.near = near; this.far = far
    if needsProj then recalculateProjection()

  // ---- Rotation constraints ----

  def setRotHoriz(a: Double): Unit =
    rotHoriz = a % (2 * math.Pi)
    if rotHoriz < 0 then rotHoriz += 2 * math.Pi

  def setRotVert(a: Double): Unit =
    rotVert = a.clamp(-math.Pi / 2.0, math.Pi / 2.0)

  // ---- Transform ----

  def transform = Transform(
    translation,
    Quat.fromRotationY(rotHoriz) * Quat.fromRotationX(rotVert),
  )

  // ---- Matrix accessors ----

  def projectionMat: Mat4 = _proj
  def viewMat: Mat4 = transform.toMatrix.inverse
  def viewProjMat: Mat4 = projectionMat * viewMat

  // ---- FPS-style movement ----

  def resetTransform(pos: Vec3, rotH: Double, rotV: Double): Unit =
    translation = pos
    setRotHoriz(rotH)
    setRotVert(rotV)

  def updateTransform(
      forward: Double = 0.0,
      left: Double = 0.0,
      up: Double = 0.0,
      deltaH: Double = 0.0,
      deltaV: Double = 0.0,
  ): Unit =
    if deltaH != 0.0 then setRotHoriz(rotHoriz + deltaH)
    if deltaV != 0.0 then setRotVert(rotVert + deltaV)
    if up != 0.0 then
      translation = Vec3(translation.x, translation.y + up, translation.z)
    if forward != 0.0 then
      translation = translation +
        Vec3(-math.sin(rotHoriz), 0.0, -math.cos(rotHoriz)) * forward
    if left != 0.0 then
      translation = translation +
        Vec3(-math.cos(rotHoriz), 0.0, math.sin(rotHoriz)) * left

  // ---- Ground reflection (for water / mirror effects) ----

  def reflectedGroundCam(): PerspectiveCamera =
    val c = new PerspectiveCamera(fov, aspect, near, far)
    c.rotHoriz = rotHoriz
    c.setRotVert(-rotVert)
    c.translation = Vec3(translation.x, -translation.y, translation.z)
    c._proj = _proj
    c
