package graphics.scene

import graphics.math.cpu.{*, given}
import trivalibs.utils.js.*

// ---------------------------------------------------------------------------
// Normal matrix helper
// ---------------------------------------------------------------------------

/** Upper-left 3×3 of the model matrix, inverted and transposed. Used to
  * transform surface normals correctly under non-uniform scale.
  */
def normalMat(m: Mat4): Mat3 =
  Mat3.fromUpperLeft(m).inverse.transpose

// ---------------------------------------------------------------------------
// SceneObject — structural trait for anything with a Transform + optional parent.
// Hierarchies are computed lazily by walking the parent chain.
// ---------------------------------------------------------------------------

trait SceneObject:
  def transform: Transform
  def parent: Opt[SceneObject]

  def modelMat: Mat4 =
    // Compose transforms cheaply in TRS space; call toMatrix() only once
    var t = transform
    var p = parent
    while p.isDefined do
      t = p.get.transform * t
      p = p.get.parent
    t.toMatrix

  def modelViewMat(cam: PerspectiveCamera): Mat4 = cam.viewMat * modelMat
  def modelViewProjMat(cam: PerspectiveCamera): Mat4 =
    cam.viewProjMat * modelMat
  def modelNormalMat: Mat3 = normalMat(modelMat)
  def viewNormalMat(cam: PerspectiveCamera): Mat3 = normalMat(modelViewMat(cam))
