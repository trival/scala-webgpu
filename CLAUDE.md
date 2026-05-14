# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with
code in this repository.

This repo is the **sketch / experiment playground**. It is a _consumer_ of the
`trivalibs` library (included as a git submodule under `trivalibs/`) — the same
role any downstream project has. The graphics / math / shader-DSL / painter code
lives in trivalibs, not here. When an experiment matures into a
feature-documenting example, it migrates over to `trivalibs/examples/`.

For library development, optimization, and the full architecture reference, see
`trivalibs/CLAUDE.md`.

## Build & Dev Commands

```bash
bun run sketch <name>        # Build one sketch → sketches/<name>/out/main.js
bun run sketch:watch <name>  # Incremental build of one sketch with file watching
bun run dev                  # Bun dev server (serve_custom.ts)
```

Each sketch builds in isolation via `scripts/sketch.ts`, which passes only that
sketch dir + `trivalibs/src` + `project.scala` to scala-cli — never a bare `.`.
Never use sbt.

## Sketches

Sketches live in `sketches/<name>/` — each is self-contained:

```
sketches/<name>/
├── <Name>.scala     # the sketch source
├── index.html       # loads out/main.js
└── out/main.js      # compiled output (gitignored build artifact)
```

`sketches/base-triangle/` is the starter template — `cp -r` it to seed a new
sketch.

Sketches are **user code**: Scala convenience shorthands (`for`-comprehensions,
string interpolation, etc.) are fine here — readability wins, and the bundle
cost is local to one sketch. The strict bundle-size discipline applies to
library code in `trivalibs/`, not here. See `trivalibs/CLAUDE.md` for that.

## Using trivalibs

Sketches import from the `trivalibs.*` namespace:

- `trivalibs.graphics.math` — Vec2–4, Mat2–4
- `trivalibs.graphics.shader` / `.shader.dsl` / `.shader.lib.*` — shader DSL
- `trivalibs.graphics.buffers` — typed buffer bindings
- `trivalibs.graphics.geometry` / `.scene` — geometry + scene graph
- `trivalibs.graphics.painter` — the Painter abstraction (incl. WebGPU facades)
- `trivalibs.utils.*` — JS helpers, numeric extensions, `animate`, bufferdata
- `trivalibs.preact` — type-safe Preact bindings for the interactive DOM layer

Prefer the trivalibs helpers (`Arr`, `Dict`, `Opt`, `Obj.literal`, `maybe()`)
over raw `js.*` / Scala stdlib even in sketch code — they keep the API
consistent and they compile to native JS.

When writing new shader code, prefer the Scala shader DSL over raw WGSL strings.

If a sketch needs a trivalibs feature that doesn't exist yet, add it in the
`trivalibs/` submodule (see `trivalibs/CLAUDE.md`), not here.

## project.scala

`project.scala` is this repo's only scala-cli config. It pulls in
`trivalibs/src` and excludes the submodule's own standalone-workspace files so
Metals only loads one config:

```scala
//> using exclude trivalibs/project.scala
//> using exclude trivalibs/test/**
//> using exclude trivalibs/examples/**
```

## Design Documents

- `documents/*.md` — Living blueprints for feature designs and implementations,
  for not yet completed features.
- `documents/done/*.md` — Completed designs, for reference and historical
  record.

## Scala Conventions

- make use of named tuples @trivalibs/documents/scala-reference/named-tuples.md
- use new given syntax: @trivalibs/documents/scala-reference/given-syntax.md
- never put multiple statements on the same line, even if they are short. We
  don't want semicolons anywhere in Scala.
- the same one-statement-per-line rule applies to WGSL bodies in shader strings
  (`WgslFn.raw` bodies, `ShaderDef` bodies, etc.). Each statement gets its own
  line — no collapsing pairs of statements onto a single line.
- when working with typeclasses, use [T: Typeclass] notation instead of
  [T](using Typeclass[T]) where possible
- When doing floating point math, prefer trivalibs NumExt extensions instead of
  math library methods if possible. I.e. `x.sin` instead of `math.sin(x)`,
  `x.sqrt` instead of `math.sqrt(x)`, etc.
