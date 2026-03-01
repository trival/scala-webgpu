# Scala.js WebGPU

A type-safe WebGPU library for Scala.js, targeting browser-based GPU programming
with compile-time safety.

> **Work in progress** — this library is in early development. APIs will change.

## What it does

Define GPU shader interfaces as Scala types. The compiler derives WGSL shader
code, vertex buffer layouts, and bind group layouts automatically — no manual
synchronization between CPU and GPU code.

```scala
type Attribs  = (position: Vec2, color: Vec4)
type Varyings = (color: Vec4)
type Uniforms = (tintColor: Vec4)

val shader = Shader[Attribs, Varyings, Uniforms](
  vertexBody = """
    |output.position = vec4f(input.position, 0.0, 1.0);
    |output.color = input.color;
    """.stripMargin,
  fragmentBody = "output.color = input.color * uniforms.tintColor;",
)

// shader.generateWGSL       → complete WGSL source
// shader.vertexBufferLayout  → WebGPU vertex descriptor
// shader.createPipelineLayout → WebGPU bind group layouts
```

## Current features

- **Math library** — Vec2–4, Mat2–4 with mutable, immutable, and GPU buffer
  representations
- **Compile-time shader generation** — named tuple type parameters derive WGSL
  structs and WebGPU layouts
- **Typed buffer bindings** — `BufferBinding[T]` for CPU/GPU uniform sync with
  zero-cost binary access
- **WebGPU facades** — Scala.js trait bindings for the browser WebGPU API

## Getting started

Requires [Bun](https://bun.sh) and [Scala CLI](https://scala-cli.virtuslab.org).

```bash
bun install
bun run build   # compile to drafts/out/
bun run dev     # start dev server on :3000
```

Open `http://localhost:3000` to see the draft examples.

## License

[MIT](LICENSE)
