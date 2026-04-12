package graphics.geometry

import graphics.math.*
import graphics.math.cpu.Vec3
import graphics.math.cpu.given
import trivalibs.utils.js.*

// Winding convention for all polygons: CCW viewed from front.

opaque type Triangle[T] <: Arr[T] = Arr[T]

object Triangle:
  def apply[T](a: T, b: T, c: T): Triangle[T] = Arr(a, b, c)

  extension [T](tri: Triangle[T])
    def a: T = tri(0)
    def b: T = tri(1)
    def c: T = tri(2)

    def normal(using pos: Position[T]): Vec3 =
      val pa = tri.a.pos; val pb = tri.b.pos; val pc = tri.c.pos
      val e1 = Vec3(pb.x - pa.x, pb.y - pa.y, pb.z - pa.z)
      val e2 = Vec3(pc.x - pa.x, pc.y - pa.y, pc.z - pa.z)
      e1.cross(e2).normalize

    // Returns 0-2 triangles (clipped away, or split into 1 or 2 triangles).
    def splitByPlane(
        plane: Plane,
    )(using pos: Position[T], lerp: Lerp[T]): Arr[Triangle[T]] =
      val out = clipPolygon(tri, 3, plane)
      fanTriangulate(out)

// Quad winding: bl(0), br(1), tr(2), tl(3) — CCW viewed from front.
opaque type Quad[T] <: Arr[T] = Arr[T]

object Quad:
  def apply[T](bl: T, br: T, tr: T, tl: T): Quad[T] = Arr(bl, br, tr, tl)

  extension [T](q: Quad[T])
    def bl: T = q(0)
    def br: T = q(1)
    def tr: T = q(2)
    def tl: T = q(3)

    // Both-diagonals cross product handles non-planar quads.
    def normal(using pos: Position[T]): Vec3 =
      val a = q.bl.pos; val b = q.br.pos; val c = q.tr.pos; val d = q.tl.pos
      val d1 = Vec3(c.x - a.x, c.y - a.y, c.z - a.z) // bl→tr
      val d2 = Vec3(d.x - b.x, d.y - b.y, d.z - b.z) // br→tl
      d1.cross(d2).normalize

    // Horizontal split: bottom half and top half.
    def subdivideH(using Lerp[T]): (Quad[T], Quad[T]) =
      val ml = q.bl.lerp(q.tl, 0.5); val mr = q.br.lerp(q.tr, 0.5)
      (Quad(q.bl, q.br, mr, ml), Quad(ml, mr, q.tr, q.tl))

    // Vertical split: left half and right half.
    def subdivideV(using Lerp[T]): (Quad[T], Quad[T]) =
      val mb = q.bl.lerp(q.br, 0.5); val mt = q.tl.lerp(q.tr, 0.5)
      (Quad(q.bl, mb, mt, q.tl), Quad(mb, q.br, q.tr, mt))

    def toTriangles: (Triangle[T], Triangle[T]) =
      (Triangle(q.bl, q.br, q.tr), Triangle(q.bl, q.tr, q.tl))

    // Returns 0, 1 Triangle, 1 Quad, or 1 Quad + 1 Triangle (5-vert clip output).
    def splitByPlane(
        plane: Plane,
    )(using pos: Position[T], lerp: Lerp[T]): Arr[Triangle[T] | Quad[T]] =
      val out = clipPolygon(q, 4, plane)
      val n = out.length
      if n == 0 then Arr()
      else if n == 3 then Arr(Triangle(out(0), out(1), out(2)))
      else if n == 4 then Arr(Quad(out(0), out(1), out(2), out(3)))
      else
        // n == 5: fan into Quad(0..3) + Triangle(0, 3, 4)
        Arr(
          Quad(out(0), out(1), out(2), out(3)),
          Triangle(out(0), out(3), out(4)),
        )

// ---------------------------------------------------------------------------
// Shared Sutherland-Hodgman clipping core
// ---------------------------------------------------------------------------

private def clipPolygon[T](
    verts: Arr[T],
    n: Int,
    plane: Plane,
)(using pos: Position[T], lerp: Lerp[T]): Arr[T] =
  val out = Arr[T]()
  var i = 0
  while i < n do
    val curr = verts(i)
    val next = verts((i + 1) % n)
    val currIn = !curr.pos.behind(plane)
    val nextIn = !next.pos.behind(plane)
    if currIn then out.push(curr)
    if currIn != nextIn then
      val dc = plane.signedDist(curr.pos)
      val dn = plane.signedDist(next.pos)
      val t = dc / (dc - dn)
      out.push(curr.lerp(next, t))
    i += 1
  out

// Fan-triangulate a convex polygon (3+ verts) — returns triangles.
private def fanTriangulate[T](out: Arr[T]): Arr[Triangle[T]] =
  val n = out.length
  if n < 3 then Arr()
  else
    val tris = Arr[Triangle[T]]()
    var i = 1
    while i < n - 1 do
      tris.push(Triangle(out(0), out(i), out(i + 1)))
      i += 1
    tris
