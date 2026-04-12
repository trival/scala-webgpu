package graphics.geometry

import graphics.math.*
import graphics.math.cpu.Vec3
import graphics.math.cpu.given
import scala.scalajs.js
import trivalibs.utils.js.*

trait Position[T]:
  extension (t: T) def pos: Vec3

trait Lerp[T]:
  extension (a: T) def lerp(b: T, t: Double): T

given [V] => Vec3Base[V] => Position[V]:
  extension (v: V) def pos: Vec3 = Vec3(v.x, v.y, v.z)

given [V] => Vec3Base[V] => Vec3ImmutableOps[V] => Lerp[V]:
  extension (a: V) def lerp(b: V, t: Double): V = a.mix(b, t)

class Plane(val normal: Vec3, val d: Double) extends js.Object:
  def signedDist(p: Vec3): Double = normal.dot(p) - d

private inline val ROUNDING = 10000.0
private inline val DELTA    = 1.0 / ROUNDING

def posKey(v: Vec3): String =
  s"${(v.x * ROUNDING).toInt},${(v.y * ROUNDING).toInt},${(v.z * ROUNDING).toInt}"

extension (v: Vec3)
  def approxEq(w: Vec3): Boolean =
    (v.x * ROUNDING).toInt == (w.x * ROUNDING).toInt &&
      (v.y * ROUNDING).toInt == (w.y * ROUNDING).toInt &&
      (v.z * ROUNDING).toInt == (w.z * ROUNDING).toInt
  def onPlane(p: Plane): Boolean = math.abs(p.signedDist(v)) < DELTA
  def inFront(p: Plane): Boolean = p.signedDist(v) > DELTA
  def behind(p: Plane): Boolean  = p.signedDist(v) < -DELTA
