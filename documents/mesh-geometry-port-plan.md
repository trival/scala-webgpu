# CPU Geometry Helpers Port — Grid, 2D Lines, Shape Builders

Planning document for porting three CPU geometry feature sets from Rust
`trivalibs_core` to the Scala WebGPU codebase. The destination is
`documents/mesh-geometry-port-plan.md` (this file moves there on approval).

Companion documents:

- [documents/geometry-library-plan.md](/home/trival/code/personal/scala/webgpu/documents/geometry-library-plan.md)
  — base geometry library already shipped (Phases 1–5 complete). This plan
  builds on top of it.
- [documents/trivalibs-nostd-port-plan.md](/home/trival/code/personal/scala/webgpu/documents/trivalibs-nostd-port-plan.md)
  — sibling port plan for shader-DSL helpers (integer DSL, hash, noise, color).
  Out of scope here; same structural style.
- [documents/rust-painter/scala-port-comparison.md](/home/trival/code/personal/scala/webgpu/documents/rust-painter/scala-port-comparison.md)
  — reference for Rust ↔ Scala API mapping. Same style of "naming flip" tables
  is used below.
- [documents/rust-painter/repomix-trivalibs-core.xml](/home/trival/code/personal/scala/webgpu/documents/rust-painter/repomix-trivalibs-core.xml)
  — full Rust source bundle. Key sections: lines 119–1755 (`data/grid`,
  `data/neighbour_list`), 3136–3946 (`rendering/line_2d`), 5307–5893
  (`rendering/mesh_geometry/utils`, `rendering/shapes/*`).

---

## 1. Context

`src/graphics/geometry/` already contains the _core_ of the Rust
`trivalibs_core::rendering::mesh_geometry` port: `Mesh[T]`, `Triangle[T]`,
`Quad[T]`, `Plane`, five buffer-generation strategies, and index-buffer support
in the painter. What is **missing** are the surface-level helpers that sketches
actually use to _build_ geometry:

1. **`Grid[T]`** — 2D coordinate grid with wrap-around strategies (clamp-to-edge
   / circle-rows / circle-cols / circle-all), column/row mutation, subdivision
   via `Lerp[T]`, mapping with vertex neighbours, and direct conversion to
   `Quad[T]`s.
2. **2D line geometry** — `Line` builder (variable width, mitre joins,
   smoothing, vertex cleanup) and the stroke → buffered-geometry converter that
   the Rust painter uses for all brush/stroke work.
3. **Shape builders** — `Cuboid` factory with six per-face `Quad` extractors,
   `Quad` 3D factories (from-dimensions, from-partial-verts, etc.), and a sphere
   mesh generator.

These three feature sets are **independent**. Sketches mix-and-match; most
sketches use one or two of them. The ported core of `Mesh[T]` / `Quad[T]` is the
integration point.

### 1.1 Design principles (DSL-first port, not a transliteration)

The Rust source is shaped by Rust's constraints (no overloading, monomorphised
generics, explicit trait bounds everywhere, `Option` chains, trait object
stores). Scala 3 on this project has better levers. The port replaces Rust's
verbose APIs with tighter Scala equivalents:

| Rust pattern                                                                                                             | Scala replacement                                                                                                                                                                      |
| ------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CoordOpsFn` trait + 4 zero-sized structs + `static` instances                                                           | `opaque type CoordOps <: Int = Int` + `val` constants in the companion — same pattern as `MeshBufferType`                                                                              |
| `Quad3D<P>` struct (separate from `Quad[T]` in mesh lib)                                                                 | **Reuse** existing `Quad[T]` opaque; add factory methods as extension methods                                                                                                          |
| `Position3D` trait                                                                                                       | **Reuse** existing `Position[T]` typeclass from `geometry/package.scala`                                                                                                               |
| `Lerp<f32>` trait — ad-hoc `impl` per type                                                                               | **Reuse** existing `Lerp[T]` typeclass; add missing `given`s for `Double` / `Vec2*` / `Vec4*` (Vec3 already has one)                                                                   |
| `Quad3D::from_dimensions_at_pos_f(w, h, n, pos, uv, f)` with 4 sibling factories `from_verts_f`, `from_tl_bl_tr_f`, etc. | Named arguments on a single `Quad.fromDimensions(...)` + `Quad.fromCorners(tl, bl, br, tr)` with optional-corner overloads                                                             |
| `{front,back,left,right,top,bottom}_face` + `_face_f` pair (12 methods)                                                  | Six `*Face` methods each taking an optional mapper — Scala's default-argument handles both cases with one name per face                                                                |
| `LineVertexData<T>` with `T: Default + Copy + Clone + Lerp<f32>`                                                         | `class LineVertex[T]` with `using Lerp[T]` only at operations that need it; construction requires no bound                                                                             |
| `NeighbourList<T>` generic linked-list data structure (rust/data/neighbour_list)                                         | **Not ported**. The only consumer is the `with_neighbours` / `map_with_prev_next` iterator in line_2d; replace with a small inline iterator helper                                     |
| Bundled `BufferedGeometry` (raw `Vec<u8>` + `Vec<u32>`)                                                                  | **Reuse** existing `BufferedGeometry[F]` (typed `StructArray[F]` + `Uint16Array \| Uint32Array`) from `geometry/buffers.scala`                                                         |
| Line's hard-coded vertex layout (`position`, `width`, `length`, `uv`, `localUv`)                                         | Named tuple `type LineAttribs = (position: Vec2, width: F32, length: F32, uv: Vec2, localUv: Vec2)` — the existing `allocateAttribs` machinery handles layout derivation automatically |

### 1.2 Explicit non-goals

- **`rust/data/neighbour_list/`**. Doubly-linked node structure with
  `adjust_to_next` hooks. The only two consumers in `trivalibs_core` are (a) the
  `with_neighbours` / `map_with_prev_next` iterator combinators that we inline
  as a ~20-line helper in `line2d.scala`, and (b) an unused `NeighbourList`
  container that no sketch references. Porting the container is dead weight.
- **`rust/data/vertex_index.rs`**. `VertIdx3f` / `VertIdx2Usize` / `VertIdx2U`
  are hashable position keys for the Rust `FxHashMap`-based position registry
  inside `MeshGeometry`. The Scala port already uses a stringified 4-decimal key
  (`posKey` in `geometry/package.scala`), so no analogue is needed.
- **WebGL vertex layout** (`webgl_buffered_geometry`). Our buffer pipeline uses
  `StructArray[F]` + the WGPU vertex layout derived from named tuples, not the
  Rust WebGL `VertexType` / `AttributeType` enums.
- **`gpu_data!` / `bytemuck` derives**. Handled end-to-end by `StructArray` +
  `allocateAttribs`.
- **Rust `MeshGeometry` re-port**. Already in
  `src/graphics/geometry/mesh.scala`.

---

## 2. Prerequisite — additional `Lerp` givens (shared)

Currently `geometry/package.scala:18` only declares:

```scala
given [V] => Vec3Base[V] => Vec3ImmutableOps[V] => Lerp[V]
```

Grid subdivision needs `Lerp` over whatever vertex type the caller chose (often
`Vec3` or a named tuple of vector-like things). Line vertices need `Lerp` over
`Vec2` (position, dir) and `Double` (width, length, plus user data). Extend
`geometry/package.scala` with three more givens next to the existing one:

```scala
given Lerp[Double]:
  extension (a: Double) def lerp(b: Double, t: Double): Double = a + (b - a) * t

given [V] => Vec2Base[V] => Vec2ImmutableOps[V] => Lerp[V]:
  extension (a: V) def lerp(b: V, t: Double): V = a.mix(b, t)

given [V] => Vec4Base[V] => Vec4ImmutableOps[V] => Lerp[V]:
  extension (a: V) def lerp(b: V, t: Double): V = a.mix(b, t)
```

(Grid & Cuboid don't need `Double` / `Vec2` / `Vec4`; line_2d does — group them
here to avoid churn later.)

No test file — existence verified indirectly by Grid and Line tests.

---

## 3. Phase 1 — Grid

**New file:** `src/graphics/geometry/grid.scala`. **New test:**
`test/geometry/Grid.test.scala`.

### 3.1 Coordinate-overflow strategy (`CoordOps`)

Match Rust's `CoordOpsFn` with an opaque-Int constant, consistent with
`MeshBufferType`. The `circleX` / `circleY` bits are packed into the constant
itself so adjust logic stays branchless:

```scala
opaque type CoordOps = Int
object CoordOps:
  val ClampToEdge: CoordOps = 0        // bit 0 = circle cols, bit 1 = circle rows
  val CircleCols:  CoordOps = 1
  val CircleRows:  CoordOps = 2
  val CircleAll:   CoordOps = 3

  extension (c: CoordOps)
    inline def circleCols: Boolean = (c & 1) != 0
    inline def circleRows: Boolean = (c & 2) != 0

    def adjust(x: Int, y: Int, w: Int, h: Int): (Int, Int) =
      val nx = if c.circleCols then ((x % w) + w) % w else math.max(0, math.min(x, w - 1))
      val ny = if c.circleRows then ((y % h) + h) % h else math.max(0, math.min(y, h - 1))
      (nx, ny)
```

Simpler and smaller than Rust's four struct types + trait.

### 3.2 `Grid[T]`

```scala
class Grid[T](val coordOps: CoordOps = CoordOps.ClampToEdge):
  private val cols: Arr[Arr[T]] = Arr()
  def width:  Int = cols.length
  def height: Int = if cols.length == 0 then 0 else cols(0).length

  def get(x: Int, y: Int): T
  def set(x: Int, y: Int, v: T): Unit
  def vertex(x: Int, y: Int): Vertex[T]

  def col(x: Int): Arr[T]
  def row(y: Int): Arr[T]
  def firstCol: Arr[T];  def firstRow: Arr[T]
  def lastCol:  Arr[T];  def lastRow:  Arr[T]

  def addCol(vals: Arr[T]): Unit     // panics if length mismatches height
  def addRow(vals: Arr[T]): Unit     // panics if length mismatches width

  def map[B](f: Vertex[T] => B): Grid[B]
  def flatMapCols[B](f: Arr[Vertex[T]] => Arr[Arr[B]]): Grid[B]
  def flatMapRows[B](f: Arr[Vertex[T]] => Arr[Arr[B]]): Grid[B]

  def quadCount: (Int, Int)          // (w, h) accounting for circular wrap
  def toCcwQuads: Arr[Quad[T]]
  def toCwQuads:  Arr[Quad[T]]

  def subdivide(countX: Int, countY: Int)(using Lerp[T]): Grid[T]
```

`Vertex[T]` is a minimal inner view — no allocation beyond the class itself:

```scala
class Vertex[T](val x: Int, val y: Int, val value: T, grid: Grid[T]):
  def next(dx: Int, dy: Int): Opt[Vertex[T]] =
    val v = grid.vertex(x + dx, y + dy)
    if v.x == x && v.y == y then null else v
  inline def left   = next(-1,  0)
  inline def right  = next( 1,  0)
  inline def top    = next( 0, -1)
  inline def bottom = next( 0,  1)
```

### 3.3 Factories (Scala-idiomatic)

Rust has a proliferation of `make_grid`, `make_grid_from_cols`,
`make_grid_with_coord_ops`, `make_grid_from_cols_with_coord_ops`. Collapse into
the companion:

```scala
object Grid:
  def apply[T](coordOps: CoordOps = CoordOps.ClampToEdge): Grid[T] =
    new Grid[T](coordOps)

  def fromCols[T](cols: Arr[Arr[T]], coordOps: CoordOps = CoordOps.ClampToEdge): Grid[T]
  def fromRows[T](rows: Arr[Arr[T]], coordOps: CoordOps = CoordOps.ClampToEdge): Grid[T]
```

### 3.4 Quad winding match to existing `Quad[T]`

The Scala `Quad[T]` opaque uses `bl / br / tr / tl` (CCW viewed from front).
Grid axis convention is "0,0 at lower-left". Mapping:

- CCW quad at `(w_i, h_i)`:
  `Quad(bl = get(w_i, h_i), br = get(w_i+1, h_i), tr = get(w_i+1, h_i+1), tl = get(w_i, h_i+1))`
- CW quad: swap `br` / `tl` — matches Rust's `to_cw_quads` flip.

Quad indices wrap via `CoordOps.adjust` so circular grids generate the
seam-closing quads automatically (same as Rust lines 384–396 / 437–472).

### 3.5 Test coverage (`Grid.test.scala`)

| Case                             | Assertion                                                          |
| -------------------------------- | ------------------------------------------------------------------ |
| `get` / `set` clamp              | negative and oversized indices clamp correctly                     |
| `get` / `set` circle_all         | wrap on both axes; setting at `(4, 4)` on 3×3 affects `(1, 1)`     |
| `addCol` / `addRow` length check | mismatched length throws                                           |
| `Vertex.left/right/top/bottom`   | ClampToEdge returns `null` at edge; CircleAll wraps                |
| `map`                            | shape preserved, values transformed, neighbour access in `f` works |
| `flatMapCols` / `flatMapRows`    | expand factor honored; returned grid width/height correct          |
| `subdivide(1, 1)`                | 2×2 → 3×3 with midpoints via `Lerp`                                |
| `subdivide(3, 0)`                | rows unchanged, cols multiplied by 4                               |
| `toCcwQuads` on 2×2              | single `Quad` with correct bl/br/tr/tl                             |
| `toCcwQuads` with `CircleAll`    | includes seam-closing quads (counts matches `quadCount`)           |

---

## 4. Phase 2 — Shape builders (Cuboid, Quad factories, Sphere)

**New file:** `src/graphics/geometry/shapes.scala`. **New test:**
`test/geometry/Shapes.test.scala`.

### 4.1 Quad construction factories

Extend the existing `Quad` companion object (in `polygon.scala`) with the
named-tuple / flexible-corner factories that Rust has as `Quad3D`. Adding to the
existing companion keeps `Quad[T]` as one concept — do not introduce a separate
`Quad3D` type:

```scala
object Quad:
  // already: def apply[T](bl, br, tr, tl): Quad[T]

  // Dimensioned construction around a pivot. uv = (0.5, 0.5) → center.
  def fromDimensions[T](
      width: Double,
      height: Double,
      normal: Vec3,
      pivot: Vec3,
      uv: Vec2 = Vec2(0.5, 0.5),  // 0 = TL, 0.5 = center, 1 = BR
  )(f: (Vec3, Vec2) => T): Quad[T]

  // Shorthand with pivot interpretation baked in:
  inline def fromDimensionsCenter[T](w, h, n, center)(f) =
    fromDimensions(w, h, n, center, Vec2(0.5, 0.5))(f)
  inline def fromDimensionsTopLeft[T](w, h, n, tl)(f) =
    fromDimensions(w, h, n, tl, Vec2(0.0, 0.0))(f)

  // From 4 corner positions — asserts planarity, derives normal.
  def fromCorners[T](tl: Vec3, bl: Vec3, br: Vec3, tr: Vec3)(f: (Vec3, Vec2) => T): Quad[T]

  // Infer the missing 4th corner from 3 adjacent corners.
  // Replaces Rust's from_tl_bl_tr_f / from_tl_bl_br_f / from_tl_br_tr_f / from_br_bl_tr_f.
  def fromThreeCorners[T](a: Vec3, b: Vec3, c: Vec3, missing: QuadCorner)(f: (Vec3, Vec2) => T): Quad[T]

opaque type QuadCorner = Int
object QuadCorner:
  val TopLeft:     QuadCorner = 0
  val BottomLeft:  QuadCorner = 1
  val BottomRight: QuadCorner = 2
  val TopRight:    QuadCorner = 3
```

The four "from three corners" Rust factories collapse into one with a
`QuadCorner` marker — six named-argument calls become one call with a single
intent flag. Concrete examples in the Rust sketches (see `repomix-sketches.xml`)
only exercise `from_dimensions_center_f` and `from_verts_f`; the partial-corner
factories are used in exactly one file.

### 4.2 `Cuboid`

```scala
class Cuboid(
    val center: Vec3,
    val size: Vec3,
    val frontTopLeft:     Vec3, val frontTopRight:    Vec3,
    val frontBottomLeft:  Vec3, val frontBottomRight: Vec3,
    val backTopLeft:      Vec3, val backTopRight:     Vec3,
    val backBottomLeft:   Vec3, val backBottomRight:  Vec3,
):

  // Six face methods, each with an overload:
  //   - no args: returns Quad[Vec3] (position only)
  //   - with mapper: (pos: Vec3, uvw: Vec3) => T → Quad[T]
  // `uvw` is the face's local (0..1) coord in cube space, matching Rust.
  def frontFace:  Quad[Vec3]
  def frontFace[T](f: (Vec3, Vec3) => T): Quad[T]
  // ... same pair for back / left / right / top / bottom

  // All six faces at once, with identical mapper. Normal of each face is known
  // up-front (±X/±Y/±Z) so the caller can pass them to Mesh.addFace:
  def faces:                                                Arr[(Quad[Vec3], Vec3)]
  def faces[T](f: (Vec3, Vec3) => T):                       Arr[(Quad[T],    Vec3)]

object Cuboid:
  def apply(center: Vec3, width: Double, height: Double, depth: Double): Cuboid
  def unit: Cuboid = apply(Vec3.zero, 1.0, 1.0, 1.0)
```

Critical winding: the Rust `front_face_f` returns
`Quad3D { top_left, bottom_left, bottom_right, top_right }` which — interpreted
as our CCW-from- front ordering — is the same `(tl, bl, br, tr)` going clockwise
around the quad as you look at it from the front, or equivalently `bl/br/tr/tl`
CCW starting from bottom-left. Each face's mapping is written once in a table
inside the Cuboid class body (matching Rust lines 5436–5524 verbatim).

### 4.3 Sphere generator

```scala
// In shapes.scala, as a top-level helper:
def sphereMesh[T: Position](
    verticalSegments:   Int,
    horizontalSegments: Int,
)(f: (u: Double, v: Double) => T): Mesh[T]
```

Mirrors Rust's `create_sphere_mesh` (lines 5839–5893). Uses `Mesh[T].addFace`
for body quads and pole triangles. `u` and `v` are supplied in angle space
(0..2π for u, -π/2..π/2 for v) matching Rust semantics.

### 4.4 Test coverage (`Shapes.test.scala`)

| Case                                  | Assertion                                                                         |
| ------------------------------------- | --------------------------------------------------------------------------------- |
| `Cuboid(center, 1, 1, 1)` corners     | all 8 corners match expected `Vec3`s                                              |
| `frontFace` normal / corner positions | normal = +Z; bl/br/tr/tl = front_bottom_left / \_right / \_top_right / \_top_left |
| `frontFace(f)` vs `frontFace`         | mapper invoked with correct UVW (uvw.z == 0 for front)                            |
| all six faces have the right normal   | table-drive: (face, expectedNormal) pairs                                         |
| `Quad.fromDimensionsCenter`           | reproduces Rust test at lines 5793–5808                                           |
| `Quad.fromDimensions` w/ uv=(1,1)     | reproduces Rust test at lines 5810–5829                                           |
| `Quad.fromCorners` non-planar throws  | assertion failure                                                                 |
| `Quad.fromThreeCorners(BottomRight)`  | recovers a known cuboid face from 3 of its 4 corners                              |
| `sphereMesh(4, 6)` face count         | correct poles + body: `4 * 6 - (4 + 4)` triangles + etc.                          |
| `sphereMesh` vertex positions         | sampled points lie on the unit sphere                                             |

---

## 5. Phase 3 — 2D Line geometry

**New file:** `src/graphics/geometry/line2d.scala`. **New test:**
`test/geometry/Line2d.test.scala`.

Largest of the three phases. Port the Rust `rendering/line_2d/mod.rs` +
`buffered_geometry.rs` (lines 3136–3946) into one Scala file — a single module
is natural because `LineVertex`, `Line`, the smoothing helpers, and
`toBufferedGeometry` all reference each other.

### 5.1 Inline neighbour iterator (replaces `data/neighbour_list/traits.rs`)

The only construct we need from `neighbour_list/traits.rs` is the
`map_with_prev_next` / `flat_map_with_prev_next` / `with_neighbours` transforms
— and only inside `line2d.scala`. Inline:

```scala
// Private to line2d.scala. ~20 lines total.
inline def forEachWithNeighbours[T](arr: Arr[T])(
    inline f: (prev: Opt[T], curr: T, next: Opt[T]) => Unit
): Unit =
  var i = 0
  val n = arr.length
  while i < n do
    val prev: Opt[T] = if i == 0     then null else arr(i - 1)
    val next: Opt[T] = if i == n - 1 then null else arr(i + 1)
    f(prev, arr(i), next)
    i += 1
```

Plus a `flatMapWithNeighbours` helper that collects each `f` return into a fresh
`Arr[T]`. Both are ~10 lines. No separate module; no trait.

### 5.2 `LineVertex[T]` and `Line[T]`

```scala
class LineVertex[T](
    val pos:   Vec2,
    var width: Double,
    var len:   Double,
    var dir:   Vec2,
    val data:  T,
):
  def pointTo(next: Vec2): Unit
  def smoothEdge(prev: LineVertex[T], next: LineVertex[T], ratio: Double, angleThreshold: Double)
      (using Lerp[T]): Arr[LineVertex[T]]

object LineVertex:
  def apply[T](pos: Vec2, width: Double, data: T): LineVertex[T]
  def apply(pos: Vec2, width: Double): LineVertex[Unit]

class Line[T](val defaultWidth: Double, val offset: Double = 0.0):
  // Storage is private; exposed via iter / vertCount / first / last.
  private val list: Arr[LineVertex[T]] = Arr()
  var totalLength: Double = 0.0

  def vertCount: Int
  def iter: Arr[LineVertex[T]]          // returns `list` (shallow view)
  def first: LineVertex[T];  def last: LineVertex[T]
  def get(i: Int): LineVertex[T]

  // Building
  def add(pos: Vec2): Unit                               // width = defaultWidth, data = default
  def add(pos: Vec2, width: Double): Unit
  def add(pos: Vec2, width: Double, data: T): Unit
  def addVert(v: LineVertex[T]): Unit                    // auto-links prev.pointTo(v.pos)
  def addVertRaw(v: LineVertex[T]): Unit                 // no linkage; power-user

  // Transformations (all return new Line[T]; original untouched)
  def smoothEdges(ratio: Double, minDist: Double, angleThreshold: Double = 0.0)(using Lerp[T]): Line[T]
  def cleanup(minLenWidRatio: Double, widthThreshold: Double, angleThreshold: Double)(using Lerp[T]): Line[T]
  def splitAtAngle(angleThreshold: Double): Arr[Line[T]]

object Line:
  def apply[T](defaultWidth: Double): Line[T]
  def apply[T](defaultWidth: Double, offset: Double): Line[T]
  def fromPoints[T](defaultWidth: Double, points: Arr[Vec2]): Line[Unit]
```

The Rust `LineData<T>` type alias (`Line = LineData<EmptyData>`) collapses to
`Line[Unit]` in Scala. `EmptyData` is just `Unit`, and `Lerp[Unit]` is trivial
(add `given Lerp[Unit]` alongside the others in `geometry/package.scala`).

### 5.3 Line → `BufferedGeometry[LineAttribs]`

Fixed vertex layout matches Rust's `VertexData` at lines 3154–3162 exactly:

```scala
type LineAttribs = (position: Vec2, width: F32, length: F32, uv: Vec2, localUv: Vec2)

class LineGeometryProps(
    val smoothDepth:             Int     = 0,
    val smoothAngleThreshold:    Double  = 0.05,
    val smoothMinLength:         Double  = 3.0,
    val capWidthLengthRatio:     Double  = 1.0,
    val totalLength:             Opt[Double] = null,
    val prevDirection:           Opt[Vec2]   = null,
    val nextDirection:           Opt[Vec2]   = null,
    val swapTextureOrientation:  Boolean = false,
)
object LineGeometryProps:
  val Default: LineGeometryProps = LineGeometryProps()

extension [T](line: Line[T])
  def toBufferedGeometry(
      props: LineGeometryProps = LineGeometryProps.Default,
  )(using Lerp[T]): BufferedGeometry[LineAttribs]

extension [T](lines: Arr[Line[T]])
  def toBufferedGeometries(
      props: LineGeometryProps = LineGeometryProps.Default,
  )(using Lerp[T]): Arr[BufferedGeometry[LineAttribs]]
```

The returned `BufferedGeometry[LineAttribs]` plugs directly into the painter via
`Form` / `Shape`, because `LineAttribs` is a named tuple with matching
`AttribLayout`. No WebGL enum ceremony, no `bytemuck::cast_slice`.

Implementation follows Rust `buffered_geometry.rs` algorithm verbatim — mitre
join math, top/bottom line generation, zig-zag index emission, conditional cap
adjustment using `prev_direction` / `next_direction`. Uses
`allocateAttribs[LineAttribs](n)` for the vertex buffer.

`Arr[Line].toBufferedGeometries` automatically threads `prevDirection` /
`nextDirection` between adjacent lines (Rust lines 3438–3453) and alternates
`swapTextureOrientation` per index, so stroke continuity is the default, not an
extra knob.

### 5.4 Test coverage (`Line2d.test.scala`)

| Case                                                 | Assertion                                                                  |
| ---------------------------------------------------- | -------------------------------------------------------------------------- |
| `LineVertex.pointTo`                                 | mirrors Rust `vert_point_to` test (lines 3856–3872)                        |
| `Line.lineLength`                                    | mirrors Rust `line_length` test (lines 3875–3887)                          |
| `Line.fromPoints`                                    | mirrors Rust `from_vecs` test (lines 3889–3903)                            |
| `Line.cleanup` thresholds                            | mirrors Rust `cleanup_vertices` test (lines 3906–3945) — 5 sub-cases       |
| `Line.splitAtAngle`                                  | corner detection splits into expected segment count / segment lengths      |
| `toBufferedGeometry` shape                           | vert count = 2N + cap fudges; index count = correct triangle-strip pattern |
| `toBufferedGeometry` UV math                         | first / last vertex has `v = 0.5` (cap center); middle verts alternate     |
| `Arr[Line].toBufferedGeometries` direction threading | segment-N's `prev_direction` equals segment-(N-1)'s last vertex `dir`      |

---

## 6. Implementation order

Strictly sequential at the _phase_ level; within a phase the test/impl loop is
tight.

1. **Prerequisite** — `geometry/package.scala`: add `Lerp[Double]`,
   `Lerp[Unit]`, `Vec2Base`-given `Lerp`, `Vec4Base`-given `Lerp`. Verify no
   regressions in existing tests (`scala test .`).
2. **Phase 1 — Grid**: `grid.scala` + `Grid.test.scala`. No integration with
   painter; pure CPU tests. Done when all cases in §3.5 pass.
3. **Phase 2 — Shapes**: `shapes.scala` + `Shapes.test.scala`. Extensions on
   `Quad` companion; `Cuboid` class; `sphereMesh` top-level. Done when all §4.4
   cases pass. Add a new example `examples/cuboid_mesh/` that builds a textured
   cube via `Cuboid.faces` and renders it — exercises the Grid-free path
   end-to-end.
4. **Phase 3 — Line2D**: `line2d.scala` + `Line2d.test.scala`. Done when all
   §5.4 cases pass. Add `examples/line2d_stroke/` — polyline stroke that feeds
   `toBufferedGeometry` into `painter.form`.
5. **End-to-end example** — `examples/grid_surface/` that uses all three feature
   sets: Grid for a subdivided plane, Cuboid for a reference frame marker,
   Line2D for UI overlay strokes. Proves integration.

Phases 1–3 are independent at the source level; 2 and 3 have no dependency on 1.
The order above reflects prioritisation, not dependency.

---

## 7. Critical files

| File                                                                                                               | Action                                                                                 |
| ------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- |
| [src/graphics/geometry/package.scala](/home/trival/code/personal/scala/webgpu/src/graphics/geometry/package.scala) | **Edit** — add 4 new `given Lerp[…]`                                                   |
| [src/graphics/geometry/grid.scala](/home/trival/code/personal/scala/webgpu/src/graphics/geometry/grid.scala)       | **New** (Phase 1)                                                                      |
| [src/graphics/geometry/shapes.scala](/home/trival/code/personal/scala/webgpu/src/graphics/geometry/shapes.scala)   | **New** (Phase 2)                                                                      |
| [src/graphics/geometry/polygon.scala](/home/trival/code/personal/scala/webgpu/src/graphics/geometry/polygon.scala) | **Edit** — extend `object Quad` companion with factories (Phase 2)                     |
| [src/graphics/geometry/line2d.scala](/home/trival/code/personal/scala/webgpu/src/graphics/geometry/line2d.scala)   | **New** (Phase 3)                                                                      |
| [test/geometry/Grid.test.scala](/home/trival/code/personal/scala/webgpu/test/geometry/Grid.test.scala)             | **New**                                                                                |
| [test/geometry/Shapes.test.scala](/home/trival/code/personal/scala/webgpu/test/geometry/Shapes.test.scala)         | **New**                                                                                |
| [test/geometry/Line2d.test.scala](/home/trival/code/personal/scala/webgpu/test/geometry/Line2d.test.scala)         | **New**                                                                                |
| [test/test-setup.scala](/home/trival/code/personal/scala/webgpu/test/test-setup.scala)                             | **Edit if needed** — confirm `src/graphics/geometry` is already on the using-file list |
| `examples/cuboid_mesh/`, `examples/line2d_stroke/`, `examples/grid_surface/`                                       | **New** end-to-end examples (§6 step 3, 4, 5)                                          |

### Existing files to reuse (do not duplicate):

- [src/graphics/geometry/polygon.scala](/home/trival/code/personal/scala/webgpu/src/graphics/geometry/polygon.scala)
  — `Quad[T]`, `Triangle[T]` opaque types, winding convention
- [src/graphics/geometry/mesh.scala](/home/trival/code/personal/scala/webgpu/src/graphics/geometry/mesh.scala)
  — `Mesh[T]`, `Face[T]`, `addFace`
- [src/graphics/geometry/buffers.scala](/home/trival/code/personal/scala/webgpu/src/graphics/geometry/buffers.scala)
  — `BufferedGeometry[F]`, `toBufferedGeometry` (5 strategies)
- [src/graphics/math/vec2.scala](/home/trival/code/personal/scala/webgpu/src/graphics/math/vec2.scala),
  [vec3.scala](/home/trival/code/personal/scala/webgpu/src/graphics/math/vec3.scala),
  [vec4.scala](/home/trival/code/personal/scala/webgpu/src/graphics/math/vec4.scala)
  — vector ops
- [src/graphics/buffers/attributes.scala](/home/trival/code/personal/scala/webgpu/src/graphics/buffers/attributes.scala)
  — `allocateAttribs` (used by line2d for `LineAttribs`)
- [trivalibs/src/utils/js.scala](/home/trival/code/personal/scala/webgpu/trivalibs/src/utils/js.scala)
  — `Arr`, `Dict`, `Opt`
- [trivalibs/src/utils/numbers.scala](/home/trival/code/personal/scala/webgpu/trivalibs/src/utils/numbers.scala)
  — `NumExt` (`.sin`, `.cos`, `.sqrt`, etc.)

---

## 8. Verification

After each phase:

```bash
bun run build        # must pass with zero errors
scala test .         # all geometry tests must pass (per CLAUDE.md, prefer scala test over bun run test)
```

At milestone completion, run the new examples manually in the dev server
(`bun run dev`, `:3000`) to confirm GPU output matches expectation —
particularly Line2D strokes (mitre joins visible on sharp corners; UV continuity
across segments) and Cuboid faces (correct normal direction, textures not
mirrored).

---

## 9. Open questions / deferred

- **Grid neighbour access in `f` closures**. Rust's `grid.flat_map_cols` passes
  a `Vec<Vertex>` so `f` can call `.right()` / `.bottom()` on each. Scala
  version keeps this API but the `Vertex` class holds a back-pointer to the grid
  which makes generic serialisation awkward. Not a concern for the initial port;
  revisit if we ever need to lift these to the GPU.
- **Cuboid UV layout**. Rust's UVW mapping for each face is baked in — no way
  for a caller to flip axes without doing it inside `f`. Fine for V1; if common
  patterns emerge, lift them to a `CuboidUVStyle` helper later.
- **Line2D cap styles**. Current plan ports only the mitre-join + ratio-cap
  algorithm. No round / square / butt options — Rust doesn't have them either.
  Add if required by a sketch.
- **Grid → Mesh convenience**. Could add
  `extension [T: Position](g: Grid[T]) def toMesh: Mesh[T] = { val m = Mesh[T](); g.toCcwQuads.foreach(m.addFace(_)); m }`
  but that's two lines at the call site already. Defer until needed.
- **Sphere mesh via Grid**. `sphereMesh` could be implemented as
  `Grid.fromCols(...).subdivide(...).toMesh(...)` using a `CircleCols` grid, at
  the cost of being slightly slower (no pole-triangle optimisation). Keep the
  dedicated implementation; revisit if Grid-based version is measurably
  competitive.
