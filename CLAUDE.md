# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with
code in this repository.

## Build & Dev Commands

```bash
bun run build          # Compile Scala.js → drafts/out/ (never use sbt)
bun run watch          # Incremental build with file watching
bun run dev            # Start Bun dev server on :3000
bun run test           # Run all tests (scala-cli test test/)
```

Build uses `scala-cli --power package . --js` targeting ES modules. Scala 3.8.2,
Scala.js 1.20.2.

## Tests

Tests live in `test/` with their own scala-cli config (`test/test-setup.scala`),
separate from the main build. This is necessary because the main build uses ES
module split style (`jsModuleSplitStyleStr fewestmodules`) which breaks MUnit's
test runner on Node.js.

**Test config** (`test/test-setup.scala`): plain `platform js` with no module
split settings.

**Adding a new test file**: create `test/<area>/<Name>.test.scala` (the
`.test.scala` suffix is required — scala-cli uses it to detect test sources).
Extend `munit.FunSuite`. No additional config needed; the file is picked up
automatically.

```scala
// test/shader/MyFeature.test.scala
package gpu.shader.dsl

import munit.FunSuite

class MyFeatureTest extends FunSuite:
  test("description"):
    assertEquals(...)
```

If the new test needs sources from a directory not yet listed in
`test/test-setup.scala`, add a `//> using file ../src/...` line there.

## Project Overview

A Scala.js WebGPU library evolving toward a type-safe painting framework. The
long-term vision is a unified CPU/GPU programming model where Scala types and
math work identically on both sides — replacing WGSL strings with a Scala shader
DSL.

**Current state**: Math library, compile-time shader definition with WGSL
generation, typed buffer bindings, WebGPU facades. Next: Painter abstraction
(see design doc).

## Architecture

### Source Layout

- `src/gpu/math/` — Vec2–4, Mat2–4 with three representations each (mutable
  class, immutable tuple, buffer type). Operations via type class traits
  (`Vec3Base[Num, Vec]`, `Vec3Mutable`, `Vec3ImmutableOps`).
- `src/gpu/shader/` — `ShaderDef` with 7 type parameters. Named tuple type
  params → compile-time WGSL structs + WebGPU layouts. Key files: `types.scala`
  (WGSLType type class), `derive.scala` (WGSL generation), `layouts.scala`
  (vertex/bind group layouts), `builtins.scala`.
- `src/gpu/buffers/` — `BufferBinding[T, F]` (CPU↔GPU uniform sync),
  `AttribLayout` + `allocateAttribs` (typed vertex data).
- `src/webgpu/facades.scala` — Manual WebGPU JS facade traits, extended
  incrementally.
- `trivalibs/` — Git submodule shared library: `StructArray`/`StructRef`
  (zero-cost typed binary buffers), numeric utils, JS helpers.
- `drafts/` — Working examples (simple_triangle, buffer_triangle), each with
  `index.html` + `main.js` + `*.scala`. Compiled JS lands in `drafts/out/`.

### Critical Type-Level Patterns

**Named tuples as schema**: `type Attribs = (position: Vec2, color: Vec4)` —
tuple position = layout index, field name = WGSL variable name, type = WGSLType
mapping.

**Named tuple aliases don't reduce in match types**: The compiler can't prove a
type alias is a `NamedTuple`. Use `given` chains (implicit search) instead of
match types — implicit search unfolds aliases correctly. See
`src/gpu/buffers/attributes.scala` for the pattern.

**`transparent inline` + `summonFrom`**: When a function must return a concrete
`StructArray[F]` derived from a type class, declare return type `Any` with
`transparent inline`. The compiler substitutes the concrete type at each call
site. Used in `allocateAttribs`.

**WGSLType[T] type class**: Maps Scala types → WGSL (name, byteSize, alignment,
vertexFormat). Has associated types `AttribBuffer` and `UniformBuffer` for
GPU-side representations. Vec3 uniforms pad to Vec4Buffer (std140).

### Design Documents

- `documents/painter-implementation-design.md` — Living blueprint for the
  Painter port from Rust. Covers type designs, naming conventions (Rust
  Layer→Panel, Effect→Layer), milestones, and the unified CPU/GPU vision.
- `documents/done/shader-def-implementation-plan.md` — Completed ShaderDef
  design.

## JS Bundle Size Rules

Zero Scala stdlib at runtime — only use the type system and compile-time
features. Every runtime construct must compile to minimal JS:

- **No `enum`**: Use `opaque type Foo = String` with `val` constants in the
  companion. Add `extension (x: Foo) inline def toJs: js.Any` if the opaque type
  must be passed to `js.Dynamic.literal`. Note: `inline val` is not allowed on
  opaque types — use plain `val`.
- **No `scala.collection.*`**: Use `Arr` (`js.Array`), `js.Dictionary`, or
  manual loops. `js.Dictionary[V]` works as a string-keyed cache (plain JS
  object). For integer-indexed sparse data, use `Arr[T | Null]`.
- **No `Option`**: Use `Opt[T]` (`js.UndefOr[T]`) from trivalibs with `Opt.Null`
  as the empty value. Check with `.isEmpty` / `.safe` / `.getOr`.
- **No `case class` for keys**: Build string keys manually with `s"..."` for
  cache lookups in `js.Dictionary`.
- **`.map/.filter/.sortBy` must delegate to JS**: Use `inline` extension methods
  on `Arr` (in trivalibs) that compile to raw `js.Array` methods — never Scala
  collection traits. Add new helpers in trivalibs as needed.
- **JS-native classes for structured data**: `class Foo(...) extends js.Object`
  preserves field names in JS output with zero overhead.
- **`js.Dynamic` / `Obj.literal`** fine internally; user-facing API typed.
- **Trivalibs helpers everywhere**: `Arr`, `Obj.literal`, `Opt`, `Opt.Null`,
  `maybe()`.

## Conventions

- **Formatting**: scalafmt with `trailingCommas = always`, Scala 3 dialect.
- **Vector types**: Double is default (`Vec3`), Float variants suffixed
  (`Vec3f`), buffer types for GPU (`Vec3Buffer` = F32, `Vec3dBuffer` = F64).
- **Painter naming** (in design, not yet implemented): Rust "Layer" = Scala
  "Panel" (render target), Rust "Effect" = Scala "Layer" (post-processing).
  Clear colors are `Vec4Tuple`, not a dedicated Color type.
- **Draft examples**: Each implementation step gets a new draft in `drafts/`.
  Previous drafts are never deleted and must keep compiling.

## Scala Conventions

- make use of named tuples @trivalibs/documents/scala-reference/named-tuples.md
- use new given syntax: @trivalibs/documents/scala-reference/given-syntax.md
