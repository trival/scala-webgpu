# Porting the WebGPU library into trivalibs

Status: plan, not yet executed. Target: move the painter / math / shader-DSL /
geometry / scene / webgpu-facade code from this repo into the `trivalibs`
submodule so other projects can depend on it the same way they already depend on
`trivalibs/utils` and `trivalibs/preact`.

## 1. Scope of the move

Source dirs to relocate (current → new):

- `src/graphics/math/` → `trivalibs/src/graphics/math/`
- `src/graphics/shader/` → `trivalibs/src/graphics/shader/`
- `src/graphics/buffers/` → `trivalibs/src/graphics/buffers/`
- `src/graphics/geometry/` → `trivalibs/src/graphics/geometry/`
- `src/graphics/scene/` → `trivalibs/src/graphics/scene/`
- `src/graphics/painter/` → `trivalibs/src/graphics/painter/`
- `src/graphics/utils/animate.scala` → `trivalibs/src/utils/animate.scala`
  (rendering-agnostic — wraps `requestAnimationFrame` lifecycle, belongs with
  the other generic JS helpers in `trivalibs.utils`)
- `src/webgpu/facades.scala` → `trivalibs/src/graphics/painter/webgpu.scala`
  (the facades are tailored to the painter's needs, not a general WebGPU
  binding; co-locating them with painter makes that explicit and avoids the
  illusion of a reusable generic facade layer)
- `examples/` → `trivalibs/examples/` (they serve as idiomatic-usage docs, one
  per feature, and should ship with the library)
- `test/` → merge into `trivalibs/test/` (current `test/geometry/` and
  `test/shader/` cover trivalibs code, not playground code; they belong with the
  library they test)

Stays in this repo:

- `serve_custom.ts` (the rebuild-aware dev server, tuned for this playground),
  `project.scala`, `package.json`, `documents/`, `memory/`.
- After the move, this repo becomes a _consumer_ of trivalibs — same role as any
  future downstream project. It is the sketch / experiment playground; once an
  experiment matures into a feature-documenting example, it migrates over to
  `trivalibs/examples/`.

### Examples + dev server split

- `trivalibs/examples/` ships with the library and uses a **minimal Bun dev
  server** (`trivalibs/serve.ts`, plain static file server + scala-cli watch in
  parallel — no custom rebuild hooks). Goal: smallest possible footprint so
  downstream consumers can copy the pattern.
- This repo keeps `serve_custom.ts` (and `serve_bun.ts` if still needed for
  comparison) — the custom server is optimized to pick up scala-cli's
  incremental rebuild artifacts and trigger reloads, which is overkill for the
  examples set but valuable when iterating on sketches here.
- `trivalibs/package.json` only needs `@webgpu/types` + `@types/bun` as dev
  deps. No preact/runtime deps — preact is loaded via ESM CDN inside example
  HTML, matching current practice.

## 2. Package rename

All moved files currently use unprefixed packages (`graphics.*`, `webgpu`).
Rename to fit the `trivalibs.*` namespace:

- `graphics.math` → `trivalibs.graphics.math`
- `graphics.math.cpu` → `trivalibs.graphics.math.cpu`
- `graphics.math.gpu` → `trivalibs.graphics.math.gpu`
- `graphics.shader` → `trivalibs.graphics.shader`
- `graphics.shader.dsl` → `trivalibs.graphics.shader.dsl`
- `graphics.shader.lib.*` → `trivalibs.graphics.shader.lib.*`
- `graphics.buffers` → `trivalibs.graphics.buffers`
- `graphics.geometry` → `trivalibs.graphics.geometry`
- `graphics.scene` → `trivalibs.graphics.scene`
- `graphics.painter` → `trivalibs.graphics.painter`
- `graphics.utils.animation` → `trivalibs.utils.animation`
- `webgpu` → `trivalibs.graphics.painter` (merge facade types into the painter
  package; they aren't a standalone module)

Open question: keep the `graphics.` segment or flatten (e.g.
`trivalibs.painter`, `trivalibs.shader`, `trivalibs.math`)? Recommendation:
**keep `graphics.`**. The whole rendering stack is one coherent group; a top
level `trivalibs.graphics` umbrella keeps it discoverable and leaves space for
non-graphics additions (`trivalibs.preact`, `trivalibs.utils`,
`trivalibs.bufferdata`).

The old bare-`webgpu` package gets folded into `trivalibs.graphics.painter`.
The facades aren't a generic WebGPU binding — every type and method in there
exists to serve the painter's needs. Keeping them as a sibling package would
falsely advertise a reusable facade layer; making them painter-internal is
honest and lets us evolve them freely.

## 3. Mechanical migration steps

Do this in a single PR — the package rename is purely textual and the build is
all-or-nothing.

1. `git mv` the directories listed in §1.
2. Rewrite `package` declarations in every moved file (sed by package, ~55
   files).
3. Rewrite imports across the whole repo:
   - `import graphics.` → `import trivalibs.graphics.`
   - `import webgpu.` → `import trivalibs.graphics.painter.`
   - `import graphics.utils.animation.` → `import trivalibs.utils.animation.`
   - Also fix wildcard `import graphics.*` etc. in examples and tests.
4. Move `examples/` → `trivalibs/examples/`. Add `trivalibs/serve.ts` (minimal
   static Bun server) and `trivalibs/package.json` with build/dev scripts
   mirroring this repo's but pointing at the new locations.
5. Merge `test/geometry/` and `test/shader/` into `trivalibs/test/`. Drop the
   now-stale `using file ../trivalibs/src` line from `test/test-setup.scala` and
   delete the file; `trivalibs/test/test-setup.scala` already has the right
   `using file ../src` reference. Bump its munit version to 1.2.4 to match the
   merged suite. Delete the empty `test/` from this repo (it has no
   playground-specific tests).
6. Update this repo's `project.scala`: keep `using exclude trivalibs/test/**`
   and also exclude `trivalibs/examples/**` so the playground build doesn't pull
   example sources in.
7. Update `trivalibs/README.md` Contents section to list `graphics/`, `webgpu/`,
   and `examples/`. Document the minimal `serve.ts` dev workflow.
8. Update this repo's `CLAUDE.md` Source Layout — point at
   `trivalibs/src/graphics/...`, drop references to local `src/graphics/...` and
   the example list (examples now live in trivalibs).
9. Run `bun run build` and `scala-cli test trivalibs/test` (in trivalibs) and
   `bun run build` in this repo; rebuild every example in
   `trivalibs/examples/*/index.html` — examples never get deleted per project
   convention, so every one must still compile.

Risk surface is low: no runtime behavior changes, just package paths.

## 4. trivalibs as a standalone buildable unit

**IDE constraint:** Metals gets confused when two `project.scala` files coexist
in the same workspace, and scala-cli is deliberately not a multi-project build
tool. The existing convention already works around this: nested setups
(`test/test-setup.scala`, `trivalibs/test/test-setup.scala`) live in folders
that the outer build excludes via `using exclude …/test/**`. The IDE only sees
one set of directives at a time because only the outer build picks up the
outer `project.scala`.

We extend the same pattern to trivalibs itself:

- The outer `project.scala` (in this playground repo) remains the **only**
  project file Metals sees for normal day-to-day work, including when editing
  files inside `trivalibs/src/`.
- A nested setup file `trivalibs/lib-setup.scala` (different name, no
  conflict) carries the directives needed to build / package trivalibs in
  isolation. Outer `project.scala` excludes it with
  `using exclude trivalibs/lib-setup.scala` so Metals never loads two configs.
- Standalone build is invoked from inside trivalibs:
  `cd trivalibs && scala-cli package src --js -o dist/trivalibs.js` (or
  whatever the publish flow needs — see Option 3/4 in §5). At that point
  scala-cli sees only `lib-setup.scala`, not the outer file.

`trivalibs/lib-setup.scala` content (mirrors the outer build's relevant
directives, minus example/test inclusion):

```scala
//> using scala 3.8.4-RC2
//> using platform js
//> using option -Wconf:msg=differs.only.in.case:s

//> using jsVersion 1.21.0
//> using jsModuleKind es

//> using dep org.scala-js::scalajs-dom::2.8.1

//> using exclude examples/**
//> using exclude test/**
```

Outer `project.scala` additions:

```scala
//> using exclude trivalibs/test/**
//> using exclude trivalibs/examples/**
//> using exclude trivalibs/lib-setup.scala
```

Yes, the directive set is duplicated between the two files. That's the price
of avoiding Metals confusion, and the set is small enough that drift is easy
to spot in review. If duplication becomes painful, the cleaner long-term
solution is **publishing trivalibs as an artifact** (§5 Option 3/4) so
consumers stop needing the outer-build trick at all — the IDE constraint then
only applies inside trivalibs's own repo, which is a single-project workspace.

## 5. Workflow options for downstream projects

The user explicitly wants to compare integration strategies. Four realistic
options, ordered from least to most upfront work:

### Option 1 — Submodule + recompile from source (status quo)

```bash
git submodule add git@github.com:trival/trivalibs.git trivalibs
```

In the consumer's `project.scala`:

```scala
//> using exclude trivalibs/test/**
//> using dep org.scala-js::scalajs-dom::2.8.1
```

Pros: zero packaging ceremony; consumer can edit trivalibs in place; matches how
the user works today. Cons: ~4 s rebuild penalty on every full compile (the
whole library re-compiles into the consumer's JS output).

**Use when:** actively co-evolving trivalibs and a consumer project. This is the
recommended default while trivalibs is pre-1.0.

### Option 2 — Submodule + scala-cli `using file`

Same as Option 1 but using `//> using file trivalibs/src` instead of the exclude
trick. Slightly more explicit; scala-cli treats trivalibs as a sibling module
rather than "all sources in the tree". Compile cost identical.

### Option 3 — Local published JAR (`publishLocal`)

scala-cli supports `scala-cli --power publish local trivalibs` which installs an
artifact into `~/.ivy2/local`. Consumers then use:

```scala
//> using dep me.trival::trivalibs::0.1.0-SNAPSHOT
```

Pros: skips recompilation; the JAR is consumed like any Maven dep, so
incremental builds drop the 4 s tax to whatever scala-cli's resolver + linker
overhead is (typically <1 s for an unchanged dep). Cons: every trivalibs change
requires `publish local` again; easy to forget and end up with stale artifacts;
needs a `publish.*` directive block in `trivalibs/project.scala`
(`organization`, `name`, `version`, `licenses`, `url`, `vcs`, `developers`,
`repository`).

**Use when:** trivalibs has stabilized enough that consumer-side edits to it are
rare.

### Option 4 — Published to a real repo (Maven Central / GitHub Packages)

End-state, post-beta. Same `using dep` line as Option 3 but resolvable without
local publish. scala-cli supports this directly via
`scala-cli --power publish trivalibs` once the publish directives and signing
keys are configured.

**Recommended path:** stay on **Option 1** until the API truly settles, then
jump straight to **Option 4**. Option 3 is a useful intermediate if the 4 s cost
starts hurting iteration but the API still churns weekly.

## 6. Addressing the 4-second compile

A 4 s full-build is mostly Scala.js linking + Scala 3 macros (the shader DSL
uses inline + summonFrom heavily). Worth measuring before optimizing. Likely
contributors, in descending order:

1. **Scala.js linker** turning all transitively-referenced classes into ES
   modules. `fewestmodules` mode (current) is already the cheap option.
2. **Macro expansion** in shader derivation (`ShaderDef`, `WGSLType` summons,
   `allocateAttribs`).
3. **Scala 3 typer** on the math library (lots of given chains).

Mitigations, again in order of bang-for-buck:

- **Incremental: use `bun run watch`.** It already does the right thing — the ~4
  s number is cold-build only.
- **Precompile trivalibs to a JAR** (Option 3/4). This removes ~all of cost (1)
  and (3) for trivalibs sources. Cost (2) stays because macros expand at the
  _consumer_ call site regardless of whether the macro definition is in source
  or JAR form.
- **Move heavy macros behind smaller surface APIs** so call sites trigger less
  work. Out of scope for this port; track separately.

Suggested action: do the port first (Option 1), measure clean-build numbers in a
real downstream project, decide on Option 3/4 based on data.

## 7. Consumer project template

Once the port lands, a fresh scala-cli project consuming trivalibs looks like:

```
my-graphics-sketch/
├── package.json        # bun scripts identical to this repo's
├── project.scala
├── src/main.scala
├── public/index.html
├── trivalibs/          # git submodule
└── out/                # scala-cli --js output
```

`project.scala`:

```scala
//> using scala 3.8.4-RC2
//> using platform js

//> using jsVersion 1.21.0
//> using jsMode full
//> using jsModuleKind es
//> using jsEsVersionStr es2021
//> using jsModuleSplitStyleStr fewestmodules

//> using exclude trivalibs/test/**
//> using exclude trivalibs/examples/**
//> using dep org.scala-js::scalajs-dom::2.8.1
```

Starter scaffold lives at `trivalibs/examples/_starter/` — `cp -r` it to seed a
new sketch. The minimal `trivalibs/serve.ts` is the reference dev server; copy
it if all you need is static serving + reload, or swap in this repo's
`serve_custom.ts` when you want the incremental-rebuild-aware variant.

This is identical to today's setup, only with `graphics.*` imports replaced by
`trivalibs.graphics.*`.

## 8. Migration order (recommended commit sequence)

1. `chore: rename packages graphics.* → trivalibs.graphics.*` — file moves +
   package rewrites + import rewrites in one atomic commit.
2. `chore: relocate webgpu facade to trivalibs.webgpu`.
3. `chore: move examples/ to trivalibs/examples/` — includes adding
   `trivalibs/serve.ts` (minimal Bun static server) and `trivalibs/package.json`
   with build / watch / dev scripts.
4. `chore: merge test/ into trivalibs/test/` — consolidate test suites, collapse
   the two `test-setup.scala` files into one.
5. `chore: add trivalibs/project.scala for standalone builds` (§4).
6. `chore: add trivalibs/examples/_starter/` scaffold for downstream consumers.
7. `docs: update CLAUDE.md and trivalibs README for new layout`.
8. `docs: add trivalibs-port notes to design docs/done/`.

Each commit independently leaves the build green.

## 9. Open questions for the user

- Confirm namespace shape: `trivalibs.graphics.{painter,shader,math,…}` vs flat
  `trivalibs.{painter,shader,math,…}`. (Recommendation: keep `graphics.`)
- Submodule URL: keep trivalibs as a subdirectory of this repo's history, or
  spin out a fresh standalone repo? A standalone repo is cleaner for downstream
  consumers but means losing the colocated history. Probably do this **before**
  the rename PR, so the rename happens in the new repo.
