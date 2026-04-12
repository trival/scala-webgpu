# Geometry Library Plan

## Context

The painter abstraction is complete. The next milestone adds a geometry
processing library at `src/graphics/geometry/` that provides type-safe
primitives (Triangle, Quad), a Mesh container with position-sharing index, and
several buffer-generation strategies. At the end, index buffer support is added
to the painter's Form and draw path.

The design is informed by the existing Rust `trivalibs_core` mesh geometry
implementation (same author), adapted to Scala 3 idioms: type classes with
extension methods, opaque types, no stdlib collections, no enums,
`Arr`/`js.Dictionary` everywhere.

---

## File Organisation

```
src/graphics/geometry/
  package.scala       — Position[T], Lerp[T], Vec3 givens, Plane, Vec3 extension methods
  triangle.scala      — Triangle[T] opaque type
  quad.scala          — Quad[T] opaque type
  mesh.scala          — Face[T] type alias, Mesh[T] class, MeshBufferType
  buffers.scala       — toBufferedGeometry (all strategies)

src/graphics/painter/form.scala      — add index buffer fields + setIndices overloads
src/graphics/painter/painter.scala   — branch on form.indexBuffer in draw path
src/webgpu/facades.scala             — add setIndexBuffer + drawIndexed to GPURenderPassEncoder

test/geometry/
  Plane.test.scala
  Triangle.test.scala
  Quad.test.scala
  Mesh.test.scala
  Buffers.test.scala
```

---

## Phase 1 — Type Classes & Plane (`package.scala`)

```scala
package graphics.geometry

trait Position[T]:
  extension (t: T) def pos: Vec3

trait Lerp[T]:
  extension (a: T) def lerp(b: T, t: Double): T

// Vec3 givens — delegate to existing Vec3ImmutableOps.lerp / Vec3 constructor
given Position[Vec3] with
  extension (v: Vec3) def pos: Vec3 = v

given Position[Vec3Tuple] with
  extension (v: Vec3Tuple) def pos: Vec3 = Vec3(v._1, v._2, v._3)

given Lerp[Vec3] with
  extension (a: Vec3) def lerp(b: Vec3, t: Double): Vec3 = a.mix(b, t)

given Lerp[Vec3Tuple] with
  extension (a: Vec3Tuple) def lerp(b: Vec3Tuple, t: Double): Vec3Tuple =
    (a._1 + (b._1 - a._1) * t, a._2 + (b._2 - a._2) * t, a._3 + (b._3 - a._3) * t)

// Plane: normal · p - d = signed distance (positive = in front)
class Plane(val normal: Vec3, val d: Double) extends js.Object:
  inline def signedDist(p: Vec3): Double = normal.dot(p) - d

private inline val ROUNDING = 10000.0
private inline val DELTA    = 1.0 / ROUNDING

extension (v: Vec3)
  def approxEq(w: Vec3): Boolean =
    (v.x * ROUNDING).toInt == (w.x * ROUNDING).toInt &&
    (v.y * ROUNDING).toInt == (w.y * ROUNDING).toInt &&
    (v.z * ROUNDING).toInt == (w.z * ROUNDING).toInt
  def onPlane(p: Plane): Boolean  = math.abs(p.signedDist(v)) < DELTA
  def inFront(p: Plane): Boolean  = p.signedDist(v) >  DELTA
  def behind(p: Plane): Boolean   = p.signedDist(v) < -DELTA
```

---

## Phase 2 — Triangle (`triangle.scala`)

```scala
opaque type Triangle[T] <: Arr[T] = Arr[T]

object Triangle:
  def apply[T](a: T, b: T, c: T): Triangle[T] = Arr(a, b, c).asInstanceOf[Triangle[T]]

  extension [T](tri: Triangle[T])
    def a: T = tri(0)
    def b: T = tri(1)
    def c: T = tri(2)

    def normal(using pos: Position[T]): Vec3 =
      // Cross product of two edges, CCW → outward normal
      val pa = tri.a.pos; val pb = tri.b.pos; val pc = tri.c.pos
      val e1 = Vec3(pb.x - pa.x, pb.y - pa.y, pb.z - pa.z)
      val e2 = Vec3(pc.x - pa.x, pc.y - pa.y, pc.z - pa.z)
      e1.cross(e2).normalize

    def splitByPlane(plane: Plane)(using pos: Position[T], lerp: Lerp[T]): Arr[Triangle[T]] =
      // Sutherland-Hodgman: clip 3 edges → output polygon (0–4 verts), then fan-triangulate
```

**splitByPlane algorithm** (generalises to N vertices — same core used by Quad):

```
val out: Arr[T] = Arr()
for i in 0 until N:
  val curr = face(i);  val next = face((i+1) % N)
  val currIn = !curr.pos.behind(plane)
  val nextIn = !next.pos.behind(plane)
  if currIn then out.push(curr)
  if currIn != nextIn then
    val dc = plane.signedDist(curr.pos)
    val dn = plane.signedDist(next.pos)
    val t  = dc / (dc - dn)       // t in [0,1] along curr→next
    out.push(curr.lerp(next, t))

// Fan-triangulate:
// 0 verts → empty
// 3 verts → one Triangle
// 4 verts → two Triangles (fan from out(0))
// 5 verts → Quad(0..3) + Triangle(0,3,4)  [Quad only, see below]
```

---

## Phase 3 — Quad (`quad.scala`)

Winding convention: **CCW viewed from front** — `bl(0), br(1), tr(2), tl(3)`.

```scala
opaque type Quad[T] <: Arr[T] = Arr[T]

object Quad:
  def apply[T](bl: T, br: T, tr: T, tl: T): Quad[T] =
    Arr(bl, br, tr, tl).asInstanceOf[Quad[T]]

  extension [T](q: Quad[T])
    def bl: T = q(0);  def br: T = q(1);  def tr: T = q(2);  def tl: T = q(3)

    def normal(using pos: Position[T]): Vec3 =
      // Both diagonals cross product: (tr-bl) × (tl-br), normalised
      // Handles non-planar quads; mirrors Rust's calculate_normal fallback
      val a = q.bl.pos; val b = q.br.pos; val c = q.tr.pos; val d = q.tl.pos
      val d1 = Vec3(c.x - a.x, c.y - a.y, c.z - a.z)   // bl→tr
      val d2 = Vec3(d.x - b.x, d.y - b.y, d.z - b.z)   // br→tl
      d1.cross(d2).normalize

    def subdivideH(using Lerp[T]): (Quad[T], Quad[T]) =
      // horizontal split → top half and bottom half
      val ml = q.bl.lerp(q.tl, 0.5);  val mr = q.br.lerp(q.tr, 0.5)
      (Quad(q.bl, q.br, mr, ml), Quad(ml, mr, q.tr, q.tl))

    def subdivideV(using Lerp[T]): (Quad[T], Quad[T]) =
      // vertical split → left half and right half
      val mb = q.bl.lerp(q.br, 0.5);  val mt = q.tl.lerp(q.tr, 0.5)
      (Quad(q.bl, mb, mt, q.tl), Quad(mb, q.br, q.tr, mt))

    def toTriangles: (Triangle[T], Triangle[T]) =
      (Triangle(q.bl, q.br, q.tr), Triangle(q.bl, q.tr, q.tl))

    def splitByPlane(plane: Plane)(using pos: Position[T], lerp: Lerp[T]): Arr[Triangle[T] | Quad[T]] =
      // Same algorithm, 4 input verts, output 0-5 verts:
      // 0 → empty;  3 → Triangle;  4 → Quad;  5 → Quad(0..3) + Triangle(0,3,4)
```

---

## Phase 4 — Mesh (`mesh.scala`)

Modelled after Rust `MeshGeometry<V>`. Faces are unified (triangle OR quad) via
the union type alias. The position registry is separate from face-vertex data,
matching Rust's `positions: Vec<VertexPosition>`.

```scala
// Union type alias — Face can hold either 3 or 4 vertices; check .length to discriminate
type Face[T] = Triangle[T] | Quad[T]

// Which vertex slot within a face a shared position appears at
class PositionFaceRef(val faceIndex: Int, val vertexSlot: Int) extends js.Object

// Position registry entry (mirrors Rust's VertexPosition)
class VertexPosition[T](val position: Vec3, val faces: Arr[PositionFaceRef]) extends js.Object

// Per-face metadata; normal is computed lazily via ensureFaceNormals()
class FaceData(var normal: Opt[Vec3], val section: Int) extends js.Object

// Buffer strategy — opaque Int with companion val constants (no enum)
opaque type MeshBufferType = Int
object MeshBufferType:
  val FaceVertices:                 MeshBufferType = 0  // no normals
  val FaceVerticesWithFaceNormal:   MeshBufferType = 1  // same normal for all verts of a face
  val FaceVerticesWithVertexNormal: MeshBufferType = 2  // averaged from adjacent faces
  val CompactVertices:              MeshBufferType = 3  // deduped by position, always indexed
  val CompactVerticesWithNormal:    MeshBufferType = 4  // compact + averaged normals

class Mesh[T](using pos: Position[T]):
  val faces:       Arr[Face[T]]           = Arr()   // all faces, unified
  val faceData:    Arr[FaceData]          = Arr()   // parallel array of metadata
  val positions:   Arr[VertexPosition[T]] = Arr()   // unique position registry
  val positionMap: js.Dictionary[Int]     = js.Dictionary()  // posKey → positions index

  // section defaults to 0; caller can supply a pre-computed normal
  def addFace(face: Face[T], normal: Opt[Vec3] = Opt.Null, section: Int = 0): Unit
  def removeFace(faceIdx: Int): Unit  // swap-remove + rewrite position refs

  def getPosition(v: Vec3): Opt[VertexPosition[T]]
  def adjacentFaces(v: Vec3): Arr[Face[T]]

  // Lazily compute face normals; returns true if any quads present (signals index needed)
  def ensureFaceNormals(): Boolean

  // Functional mesh transforms (mirrors Rust map / flat_map / flat_map_data)
  def map[U: Position](f: Face[T] => Face[U]): Mesh[U]
  def flatMap[U: Position](f: Face[T] => Arr[Face[U]]): Mesh[U]
  def flatMapWithData[U: Position](f: (Face[T], FaceData) => Arr[(Face[U], FaceData)]): Mesh[U]

  def newFromSection(section: Int): Mesh[T]
```

**Position key**:
`s"${(v.x*10000).toInt},${(v.y*10000).toInt},${(v.z*10000).toInt}"`

**`addFace`** flow: for each vertex `v` in the face, compute its key, look it up
in `positionMap`; if missing, append a new `VertexPosition` to `positions` and
record the key. Push a `PositionFaceRef(faceIndex, slot)` onto the matching
`VertexPosition.faces`.

**`removeFace`** uses swap-remove and rewrites position refs, mirroring Rust's
`unregister_face_refs` + `rewrite_face_refs`.

---

## Phase 5 — Buffer Generation (`buffers.scala`)

### Writer types

```scala
// Basic: write vertex data into a pre-allocated StructRef slot
type VertexWriter[T, F <: Tuple]  = (T, StructRef[F]) => Unit

// With normal: used when strategy includes normals
type VertexWriterN[T, F <: Tuple] = (T, Vec3, StructRef[F]) => Unit
```

### Strategies

**`FaceVertices`** — no normals. Emit vertices per-face in order. If quads
present (signalled by `ensureFaceNormals()` return value), automatically emit a
per-face local index buffer so quads triangulate correctly: for a quad starting
at offset `base`, indices are `[base, base+1, base+2, base, base+2, base+3]`.
Triangles get no local index.

**`FaceVerticesWithFaceNormal`** — same layout, face normal repeated for all
vertices of a face. Uses `VertexWriterN`.

**`FaceVerticesWithVertexNormal`** — vertex normal averaged from adjacent faces
in the same section. Look up per-position normals from `mesh.positions`; sum
face normals → normalize. Uses `VertexWriterN`.

**`CompactVertices`** — walk `mesh.positions` in order; emit one vertex per
unique position using `VertexWriter`. Then emit index buffer from each face's
position indices (always has index buffer).

**`CompactVerticesWithNormal`** — same, but compute and append averaged vertex
normal per position.

### Output

```scala
class BufferedGeometry[F <: Tuple](
  val vertices: StructArray[F],
  val indices:  Opt[scala.scalajs.js.typedarray.Uint16Array | scala.scalajs.js.typedarray.Uint32Array],
) extends js.Object
```

Auto-select Uint16 vs Uint32 based on vertex count (>65535 → Uint32).

### Top-level entry point

```scala
def toBufferedGeometry[T, F <: Tuple](
  mesh:         Mesh[T],
  bufferType:   MeshBufferType,
  writer:       VertexWriter[T, F],
  writerN:      Opt[VertexWriterN[T, F]] = Opt.Null,
): BufferedGeometry[F]
```

---

## Phase 6 — Index Buffer in Painter

### `src/webgpu/facades.scala`

Add to `GPURenderPassEncoder`:

```scala
def setIndexBuffer(buffer: GPUBuffer, format: String): Unit = js.native
def drawIndexed(indexCount: Int): Unit = js.native
```

### `src/graphics/painter/form.scala`

```scala
// New fields alongside existing vertexBuffer / vertexCount:
var indexBuffer: Opt[GPUBuffer] = null
var indexFormat: String = "uint16"
var indexCount: Int = 0

// Two overloads — union type can't be pattern-matched on erased JS arrays
def setIndices(data: scala.scalajs.js.typedarray.Uint16Array): this.type = ...
def setIndices(data: scala.scalajs.js.typedarray.Uint32Array): this.type = ...
// Each: destroy old buffer, create GPUBuffer(INDEX | COPY_DST), writeBuffer(data.buffer), set fields
```

### `src/graphics/painter/painter.scala`

In `renderShapeOnPass` (and any other `pass.draw` call site):

```scala
// replace:
pass.draw(shape.form.vertexCount)
// with:
if shape.form.indexBuffer.notNull then
  pass.setIndexBuffer(shape.form.indexBuffer.get, shape.form.indexFormat)
  pass.drawIndexed(shape.form.indexCount)
else
  pass.draw(shape.form.vertexCount)
```

---

## Implementation Order

1. `package.scala` — Position, Lerp, Vec3 givens, Plane, Vec3 extensions →
   `test/geometry/Plane.test.scala`
2. `triangle.scala` → `test/geometry/Triangle.test.scala`
3. `quad.scala` → `test/geometry/Quad.test.scala`
4. `mesh.scala` → `test/geometry/Mesh.test.scala`
5. `buffers.scala` → `test/geometry/Buffers.test.scala`
6. facades + form + painter → verify existing painter tests pass

Phases 1–5 are pure CPU, testable without WebGPU.

---

## Tests

Add `//> using file ../src/graphics/geometry` to `test/test-setup.scala`.

| File                  | Key cases                                                                                                          |
| --------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `Plane.test.scala`    | signedDist sign, approxEq at boundary (0.00009 → equal, 0.00012 → not), onPlane/inFront/behind                     |
| `Triangle.test.scala` | normal is unit-length and points +Z for CCW XY triangle; splitByPlane 0/1/2/3 verts in-front                       |
| `Quad.test.scala`     | normal points +Z for flat quad; subdivideH/V midpoints correct; toTriangles CCW; splitByPlane 0/3/4/5-vert outputs |
| `Mesh.test.scala`     | addFace builds positionMap; adjacentFaces; removeFace keeps refs consistent; ensureFaceNormals                     |
| `Buffers.test.scala`  | vertex/index counts per strategy; CompactVertices deduplicates; mixed tri+quad FaceVertices index output           |

---

## Open Questions / Deferred

- **splitByPlane on Mesh** — add later as a `flatMap` call once primitives are
  solid.
- **Polygon trait/type class** — not needed; `Face[T] = Triangle[T] | Quad[T]`
  union serves the role.
- **`section` support** — include from the start as a plain `Int` field on
  `FaceData`, default 0.
- **Normal in addFace** — caller can supply (e.g. from `Triangle.normal`) or
  leave for lazy computation.
