# scala-graphics — sketch playground

This repo is the playground for experimenting with the [trivalibs](trivalibs/)
Scala.js WebGPU library. The library itself lives in the `trivalibs/` submodule
(sources, examples, tests). This outer repo is for **sketches** — ad-hoc
experiments built against trivalibs. Once a sketch matures into a
feature-documenting example, it migrates over into `trivalibs/examples/`.

> **Work in progress** — both the library and the sketch workflow are beta.

## Prerequisites

- [Bun](https://bun.sh)
- [Scala CLI](https://scala-cli.virtuslab.org)
- A WebGPU-capable browser (recent Chrome/Edge, or Firefox with the flag
  enabled)

```bash
git submodule update --init
bun install
```

## Workflow

Each sketch is a self-contained subdirectory under `sketches/`. Sketches can be
nested in arbitrary category folders (e.g. `sketches/geometry/foo/`,
`sketches/layers/bar/`). A sketch is compiled in isolation — the only inputs are
its own sources, `trivalibs/src/`, and the root `project.scala`. The output
lands in `<sketch-dir>/main.js` (checked into git for now) and is loaded
directly by the sketch's `index.html` via an ES module import.

The Scala entry point is a top-level `@main` function, so the bundle auto-runs
on import — no JS bootstrap file needed.

### Build a sketch

```bash
bun run sketch <path>          # one-off build
bun run sketch:watch <path>    # rebuild on change
```

`<path>` is the sketch directory, with or without a leading `sketches/` (so
bash tab-completion from the project root works). Examples:
`bun run sketch:watch base-triangle`,
`bun run sketch:watch sketches/geometry/voronoi/`.

### Serve the sketches

```bash
bun run dev                    # vite, http://localhost:3001
bun run build                  # static build → dist/
```

Vite serves `sketches/` as its root, so each sketch is reachable at its relative
path (e.g. `/base-triangle/`, `/geometry/voronoi/`) and the nav page at `/`.
Vite auto-reloads when `sketch:watch` rewrites a `main.js`. The recursive walk
in [vite.config.ts](vite.config.ts) collects every nested `index.html` as a
rollup input for `bun run build`.

Run `sketch:watch` and `dev` side-by-side in two terminals to iterate.

### Add a new sketch

1. Create `sketches/<category>/my-sketch/` (category folder optional — top level
   works too).
2. Add `MySketch.scala` with a package matching the path (e.g.
   `package sketches.category.my_sketch`) and an
   `@main def mySketch(): Unit = ...` entry.
3. Add `index.html` with a `<canvas id="canvas">` and
   `<script type="module" src="./main.js"></script>`.
4. (Optional) Add a card to `sketches/index.html`.
5. `bun run sketch <category>/my-sketch` to build.

The same `project.scala` covers Metals's view of all sketches plus the library
sources, so the IDE type-checks everything as one workspace while each sketch
builds independently.

## Layout

```
.
├── project.scala       # single Metals workspace config
├── package.json        # bun scripts
├── vite.config.ts      # dev server + build config (root: sketches/)
├── scripts/sketch.ts   # build dispatcher
├── sketches/
│   ├── index.html              # nav page
│   ├── <name>/                 # flat sketch
│   │   ├── <Name>.scala
│   │   ├── index.html
│   │   └── main.js             # scala-cli output (in git, for now)
│   └── <category>/<name>/      # nested sketch (arbitrary depth)
│       ├── <Name>.scala
│       ├── index.html
│       └── main.js
└── trivalibs/          # submodule — the library + its examples + tests
```

## License

[MIT](LICENSE)
