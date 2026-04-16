package graphics.geometry

import graphics.math.cpu.Vec3
import scala.scalajs.js
import scala.scalajs.js.typedarray.{Uint16Array, Uint32Array}
import trivalibs.utils.js.*
import trivalibs.bufferdata.{StructArray, StructRef}

type VertexWriter[T, F <: Tuple] = (T, StructRef[F]) => Unit
type VertexWriterN[T, F <: Tuple] = (T, Vec3, StructRef[F]) => Unit

class BufferedGeometry[F <: Tuple](
    val vertices: StructArray[F],
    val indices: Opt[Uint16Array | Uint32Array],
)

// ---------------------------------------------------------------------------
// Buffer generation — transparent inline so F is concrete at every call site,
// allowing StructArray.allocate[F] to evaluate constValue[TupleSize[F]].
// ---------------------------------------------------------------------------

transparent inline def toBufferedGeometry[T: Position, F <: Tuple](
    mesh: Mesh[T],
    bufferType: MeshBufferType,
    writer: VertexWriter[T, F],
    writerN: Opt[VertexWriterN[T, F]] = null,
): BufferedGeometry[F] =
  if bufferType == MeshBufferType.FaceVertices then
    buildFaceVertices(mesh, writer)
  else if bufferType == MeshBufferType.FaceVerticesWithFaceNormal then
    buildFaceVerticesWithFaceNormal(mesh, writerN.get)
  else if bufferType == MeshBufferType.FaceVerticesWithVertexNormal then
    buildFaceVerticesWithVertexNormal(mesh, writerN.get)
  else if bufferType == MeshBufferType.CompactVertices then
    buildCompactVertices(mesh, writer)
  else buildCompactVerticesWithNormal(mesh, writerN.get)

// ---------------------------------------------------------------------------
// Strategy implementations (also transparent inline — each calls allocate[F])
// ---------------------------------------------------------------------------

transparent inline def buildFaceVertices[T: Position, F <: Tuple](
    mesh: Mesh[T],
    writer: VertexWriter[T, F],
): BufferedGeometry[F] =
  // Count vertices and check for quads
  var vertexCount = 0
  var hasQuads = false
  var fi = 0
  while fi < mesh.faces.length do
    val n = mesh.faces(fi).asInstanceOf[Arr[T]].length
    vertexCount += n
    if n == 4 then hasQuads = true
    fi += 1

  val verts = StructArray.allocate[F](vertexCount)
  var vi = 0

  if !hasQuads then
    // No index buffer needed — pure triangle mesh
    fi = 0
    while fi < mesh.faces.length do
      val arr = mesh.faces(fi).asInstanceOf[Arr[T]]
      var si = 0
      while si < arr.length do
        writer(arr(si), verts(vi))
        vi += 1
        si += 1
      fi += 1
    BufferedGeometry(verts, null)
  else
    // Mixed: emit index buffer so quads become 2 triangles
    val idxBuf = Arr[Int]()
    var base = 0
    fi = 0
    while fi < mesh.faces.length do
      val arr = mesh.faces(fi).asInstanceOf[Arr[T]]
      val n = arr.length
      var si = 0
      while si < n do
        writer(arr(si), verts(vi))
        vi += 1
        si += 1
      if n == 3 then idxBuf.push(base, base + 1, base + 2)
      else
        idxBuf.push(base, base + 1, base + 2)
        idxBuf.push(base, base + 2, base + 3)
      base += n
      fi += 1
    BufferedGeometry(verts, makeIndexArray(idxBuf, vertexCount))

transparent inline def buildFaceVerticesWithFaceNormal[T: Position, F <: Tuple](
    mesh: Mesh[T],
    writer: VertexWriterN[T, F],
): BufferedGeometry[F] =
  mesh.ensureFaceNormals()

  var vertexCount = 0
  var hasQuads = false
  var fi = 0
  while fi < mesh.faces.length do
    val n = mesh.faces(fi).asInstanceOf[Arr[T]].length
    vertexCount += n
    if n == 4 then hasQuads = true
    fi += 1

  val verts = StructArray.allocate[F](vertexCount)
  var vi = 0

  if !hasQuads then
    fi = 0
    while fi < mesh.faces.length do
      val arr = mesh.faces(fi).asInstanceOf[Arr[T]]
      val normal = mesh.faceData(fi).normal.get
      var si = 0
      while si < arr.length do
        writer(arr(si), normal, verts(vi))
        vi += 1
        si += 1
      fi += 1
    BufferedGeometry(verts, null)
  else
    val idxBuf = Arr[Int]()
    var base = 0
    fi = 0
    while fi < mesh.faces.length do
      val arr = mesh.faces(fi).asInstanceOf[Arr[T]]
      val n = arr.length
      val normal = mesh.faceData(fi).normal.get
      var si = 0
      while si < n do
        writer(arr(si), normal, verts(vi))
        vi += 1
        si += 1
      if n == 3 then idxBuf.push(base, base + 1, base + 2)
      else
        idxBuf.push(base, base + 1, base + 2)
        idxBuf.push(base, base + 2, base + 3)
      base += n
      fi += 1
    BufferedGeometry(verts, makeIndexArray(idxBuf, vertexCount))

transparent inline def buildFaceVerticesWithVertexNormal[
    T: Position,
    F <: Tuple,
](
    mesh: Mesh[T],
    writer: VertexWriterN[T, F],
): BufferedGeometry[F] =
  mesh.ensureFaceNormals()

  var vertexCount = 0
  var hasQuads = false
  var fi = 0
  while fi < mesh.faces.length do
    val n = mesh.faces(fi).asInstanceOf[Arr[T]].length
    vertexCount += n
    if n == 4 then hasQuads = true
    fi += 1

  val verts = StructArray.allocate[F](vertexCount)
  var vi = 0

  if !hasQuads then
    fi = 0
    while fi < mesh.faces.length do
      val arr = mesh.faces(fi).asInstanceOf[Arr[T]]
      val section = mesh.faceData(fi).section
      var si = 0
      while si < arr.length do
        val v = arr(si)
        val normal = calcVertexNormal(mesh, v.pos, section)
        writer(v, normal, verts(vi))
        vi += 1
        si += 1
      fi += 1
    BufferedGeometry(verts, null)
  else
    val idxBuf = Arr[Int]()
    var base = 0
    fi = 0
    while fi < mesh.faces.length do
      val arr = mesh.faces(fi).asInstanceOf[Arr[T]]
      val n = arr.length
      val section = mesh.faceData(fi).section
      var si = 0
      while si < n do
        val v = arr(si)
        val normal = calcVertexNormal(mesh, v.pos, section)
        writer(v, normal, verts(vi))
        vi += 1
        si += 1
      if n == 3 then idxBuf.push(base, base + 1, base + 2)
      else
        idxBuf.push(base, base + 1, base + 2)
        idxBuf.push(base, base + 2, base + 3)
      base += n
      fi += 1
    BufferedGeometry(verts, makeIndexArray(idxBuf, vertexCount))

transparent inline def buildCompactVertices[T: Position, F <: Tuple](
    mesh: Mesh[T],
    writer: VertexWriter[T, F],
): BufferedGeometry[F] =
  val vertexCount = mesh.positions.length
  val verts = StructArray.allocate[F](vertexCount)

  // Emit one vertex per unique position (use first occurrence)
  var pi = 0
  while pi < mesh.positions.length do
    val vp = mesh.positions(pi)
    val ref = vp.faces(0)
    val v = mesh.faces(ref.faceIndex).asInstanceOf[Arr[T]](ref.vertexSlot)
    writer(v, verts(pi))
    pi += 1

  // Build index buffer from face vertices → position indices
  val idxBuf = Arr[Int]()
  var fi = 0
  while fi < mesh.faces.length do
    val arr = mesh.faces(fi).asInstanceOf[Arr[T]]
    val n = arr.length
    if n == 3 then
      idxBuf.push(
        mesh.positionMap(posKey(arr(0).pos)),
        mesh.positionMap(posKey(arr(1).pos)),
        mesh.positionMap(posKey(arr(2).pos)),
      )
    else
      val i0 = mesh.positionMap(posKey(arr(0).pos))
      val i1 = mesh.positionMap(posKey(arr(1).pos))
      val i2 = mesh.positionMap(posKey(arr(2).pos))
      val i3 = mesh.positionMap(posKey(arr(3).pos))
      idxBuf.push(i0, i1, i2)
      idxBuf.push(i0, i2, i3)
    fi += 1

  BufferedGeometry(verts, makeIndexArray(idxBuf, vertexCount))

transparent inline def buildCompactVerticesWithNormal[T: Position, F <: Tuple](
    mesh: Mesh[T],
    writer: VertexWriterN[T, F],
): BufferedGeometry[F] =
  mesh.ensureFaceNormals()
  val vertexCount = mesh.positions.length
  val verts = StructArray.allocate[F](vertexCount)

  var pi = 0
  while pi < mesh.positions.length do
    val vp = mesh.positions(pi)
    val ref = vp.faces(0)
    val v = mesh.faces(ref.faceIndex).asInstanceOf[Arr[T]](ref.vertexSlot)
    val normal =
      calcVertexNormal(mesh, vp.position, mesh.faceData(ref.faceIndex).section)
    writer(v, normal, verts(pi))
    pi += 1

  val idxBuf = Arr[Int]()
  var fi = 0
  while fi < mesh.faces.length do
    val arr = mesh.faces(fi).asInstanceOf[Arr[T]]
    val n = arr.length
    if n == 3 then
      idxBuf.push(
        mesh.positionMap(posKey(arr(0).pos)),
        mesh.positionMap(posKey(arr(1).pos)),
        mesh.positionMap(posKey(arr(2).pos)),
      )
    else
      val i0 = mesh.positionMap(posKey(arr(0).pos))
      val i1 = mesh.positionMap(posKey(arr(1).pos))
      val i2 = mesh.positionMap(posKey(arr(2).pos))
      val i3 = mesh.positionMap(posKey(arr(3).pos))
      idxBuf.push(i0, i1, i2)
      idxBuf.push(i0, i2, i3)
    fi += 1

  BufferedGeometry(verts, makeIndexArray(idxBuf, vertexCount))

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

private def calcVertexNormal[T: Position](
    mesh: Mesh[T],
    p: Vec3,
    section: Int,
): Vec3 =
  import graphics.math.cpu.given
  var sx = 0.0
  var sy = 0.0
  var sz = 0.0
  val vp = mesh.getPosition(p)
  if vp != null then
    var i = 0
    while i < vp.faces.length do
      val ref = vp.faces(i)
      if mesh.faceData(ref.faceIndex).section == section then
        val n = mesh.faceData(ref.faceIndex).normal
        if n != null then
          sx += n.get.x
          sy += n.get.y
          sz += n.get.z
      i += 1
  val len = math.sqrt(sx * sx + sy * sy + sz * sz)
  if len < 1e-10 then Vec3(0, 0, 0)
  else Vec3(sx / len, sy / len, sz / len)

private def makeIndexArray(
    idxBuf: Arr[Int],
    vertexCount: Int,
): Opt[Uint16Array | Uint32Array] =
  if idxBuf.length == 0 then null
  else if vertexCount <= 65535 then
    val ua = new Uint16Array(idxBuf.length)
    var i = 0
    while i < idxBuf.length do
      ua(i) = idxBuf(i)
      i += 1
    ua
  else
    val ua = new Uint32Array(idxBuf.length)
    var i = 0
    while i < idxBuf.length do
      ua(i) = idxBuf(i)
      i += 1
    ua
