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

Each sketch is a self-contained subdirectory under `sketches/`. A sketch is
compiled in isolation — the only inputs are its own sources, `trivalibs/src/`,
and the root `project.scala`. The output lands in `sketches/<name>/out/main.js`
and is loaded directly by the sketch's `index.html` via an ES module import.

The Scala entry point is a top-level `@main` function, so the bundle auto-runs
on import — no JS bootstrap file needed.

### Build a sketch

```bash
bun run sketch <name>          # one-off build
bun run sketch:watch <name>    # rebuild on change
```

Example: `bun run sketch:watch base-triangle`.

### Serve the sketches

```bash
bun run dev                    # http://localhost:3001
```

The custom dev server (`serve_custom.ts`):

- discovers sketches dynamically (any subdir of `sketches/` containing an
  `index.html`),
- serves each sketch at `/<name>/`,
- polls all `sketches/*/out/*.js` mtimes and pushes an SSE reload signal
  whenever the bundle is rewritten by `sketch:watch`.

Run `sketch:watch` and `dev` side-by-side in two terminals to iterate.

### Add a new sketch

1. Create `sketches/my-sketch/`.
2. Add `MySketch.scala` with `package sketches.my_sketch` and an
   `@main def mySketch(): Unit = ...` entry.
3. Add `index.html` with a `<canvas id="canvas">` and
   `<script type="module" src="./out/main.js"></script>`.
4. (Optional) Add a card to `sketches/index.html`.
5. `bun run sketch my-sketch` to build.

The same `project.scala` covers Metals's view of all sketches plus the library
sources, so the IDE type-checks everything as one workspace while each sketch
builds independently.

## Layout

```
.
├── project.scala       # single Metals workspace config
├── package.json        # bun scripts
├── scripts/sketch.ts   # build dispatcher
├── serve_custom.ts     # dev server with auto-reload
├── sketches/
│   ├── index.html      # nav page
│   └── <name>/
│       ├── <Name>.scala
│       ├── index.html
│       └── out/        # generated, gitignored
└── trivalibs/          # submodule — the library + its examples + tests
```

## License

[MIT](LICENSE)
