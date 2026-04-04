# Instance Rendering — Implementation Record

## Status: ✓ Complete (v1)

All stages implemented and verified. The instances draft renders 100 rotating
triangles with per-instance bindings and a panel-level shared camera matrix.

---

## Overview

The painter library now supports:

1. **Panel-level runtime bindings** — a panel provides fallback bindings to all
   its children (shapes/layers) without compile-time type checking (since panels
   are untyped and contain shapes/layers with different shaders)
2. **Instance rendering** — shapes/layers have N instances, each with binding
   overrides, producing N draw calls. Instance bindings are type-safe (compile-
   time checked) since they live on typed `Shape[U,P]`/`Layer[U,P]`

Binding priority (lowest → highest): **Panel → Shape/Layer → Instance**

---

## Stage 1: Panel-Level Runtime Bindings

### Panel.bind — [panel.scala](src/graphics/painter/panel.scala)

- `type PanelBindingValue = BufferBinding[?, ?] | GPUSampler | Panel`
- `var runtimeBindings: js.Dictionary[PanelBindingValue]` on Panel
- 8 overloaded `inline bind` methods (1–8 `BindPair[N, V]` params)
- NO compile-time name/type validation (Panel is untyped)
- `processPanelEntry` handles 4 value types via `inline match`:
  - `GPUSampler` → store directly
  - `BufferBinding[?, ?]` → store directly
  - `Panel` → store directly
  - Raw value → if existing `BufferBinding` at that key, call `.set()`;
    otherwise `summonFrom { case uv: UniformValue[V, f] => ... }` to auto-create
    one
- Varargs not possible: `processPanelEntry` must be `inline` (for `summonFrom`
  on raw values), and inline defs can't be called in a runtime loop over varargs

### Usage

```scala
val panel = painter.panel().set(clearColor = ..., shapes = Arr(shape))

// Auto-creates BufferBinding from raw value:
panel.bind("viewProj" := Mat4.identity)

// Or with pre-created binding:
val viewProj = painter.binding(Mat4.identity)
panel.bind("viewProj" := viewProj)
```

### Merge in Painter — [painter.scala](src/graphics/painter/painter.scala)

- Reusable working arrays: `_workBindings: BindingSlots`,
  `_workPanelBindings: Arr[Opt[Panel]]` (single-threaded JS, safe to reuse per
  frame)
- `copyToWork(bindings, panelBindings)` — copies source arrays into work arrays,
  sets `.length` first to truncate stale data
- `applyPanelRuntimeBindings(panel, shade, workBindings, workPanelBindings)` —
  iterates `panel.runtimeBindings` keys, looks up each name in
  `shade.uniformIndices`/`shade.panelIndices`; fills slot only if currently null
  (lowest priority — never overrides shape/layer/instance bindings)
- `hasPanelRuntimeBindings(panel)` — checks if panel has any runtime bindings
- When panel has no runtime bindings: uses shape/layer arrays directly (zero
  overhead, no copy)

---

## Stage 2: Instance Rendering

### Instance and InstanceList — [instance.scala](src/graphics/painter/instance.scala)

**`Instance`** — plain data holder:

```scala
class Instance:
  var bindings: BindingSlots = Arr()
  var panelBindings: Arr[Opt[Panel]] = Arr()
```

**`InstanceList[U, P]`** — typed manager:

- Constructor: `InstanceList[U, P](shade: Shade[U, P], painter: Painter)`
- `val items: Arr[Instance]`
- `def length: Int`, `def clear(): Unit`
- 8 overloaded `inline add(e1, ..., eN)` methods (1–8 `BindPair` params),
  returns `Int` (index of new instance)
- `processInstanceEntry` mirrors `Bindable.processEntry` — same compile-time
  name/type checks against U and P, writes to Instance's arrays instead of
  `this`. Handles `GPUSampler`, `BufferBinding`, `Panel`, and raw values
  (auto-creates `BufferBinding` via `summonFrom`)

### Shape and Layer — [shape.scala](src/graphics/painter/shape.scala), [layer.scala](src/graphics/painter/layer.scala)

Both classes gained:

```scala
val instances: InstanceList[U, P] = InstanceList[U, P](shade, painter)
```

### Usage

```scala
// Type-safe: compile-time checks that "model" and "tint" exist in Uniforms
// with correct types
shape.instances.add(
  "model" := Mat4.fromTranslation(x, y, z),
  "tint"  := Vec3(1.0, 0.5, 0.2),
)

// Accessing instance bindings for animation updates:
val modelIdx = shade.uniformIndices("model")
val inst = shape.instances.items(i)
inst.bindings(modelIdx).asInstanceOf[BufferBinding[Mat4, ?]].set(newModel)
```

### Rendering — [painter.scala](src/graphics/painter/painter.scala)

- `applyInstanceBindings(inst, workBindings, workPanelBindings)` — for each
  non-null slot in instance arrays, overrides the corresponding work array slot
  (highest priority)

**Shape rendering** (`renderShapeOnPass`):

- If `instances.length == 0`: single draw (existing behavior + optional panel
  merge)
- If `instances.length > 0`: set pipeline and vertex buffer once, then loop:
  1. `copyToWork(shape.bindings, shape.panelBindings)`
  2. `applyPanelRuntimeBindings(...)` if panel present
  3. `applyInstanceBindings(inst, ...)`
  4. `setValueBindGroup(...)` + `setPanelBindGroup(...)`
  5. `pass.draw(vertexCount)`

**Layer rendering** (`renderLayerOnPass`):

- Same instance loop pattern
- Per-instance srcView resolution: if after full merge `_workPanelBindings(0)`
  is set, don't inject srcView (instance provided its own panel texture);
  otherwise use the ping-pong srcView
- Ping-pong pass structure (in `paint()`) is per-layer, not per-instance — all
  instances render in the same pass

### Bind group helpers (extracted)

- `setValueBindGroup(pass, shade, bindings)` — creates and sets bind group 0
  from value bindings
- `setPanelBindGroup(pass, shade, panelBindings, srcView?)` — creates and sets
  bind group 1 from panel bindings, optionally injecting srcView at slot 0

---

## Cross-cutting: 8-param Bind Overloads

All bind-like methods support 1–8 parameters:

- **`Bindable.bind`** — type-safe, checks names/types against U and P
- **`Panel.bind`** — untyped (no name/type validation), auto-creates bindings
- **`InstanceList.add`** — type-safe, checks names/types against U and P

Each overload follows the same pattern: N type params for names, V type params
for values, call the respective `processEntry` for each pair.

---

## Skipped for v1

**Bind group optimization**: The Rust painter optimizes by checking what varies
across instances (only values, only panels, or both) to minimize `setBindGroup`
calls. Skipped — always creates both bind groups per instance. The overhead is
negligible compared to draw calls.

---

## Files modified

| File                                                             | Changes                                                                   |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------- |
| [panel.scala](src/graphics/painter/panel.scala)                  | `runtimeBindings`, `bind` (1–8), `processPanelEntry`, `PanelBindingValue` |
| [painter.scala](src/graphics/painter/painter.scala)              | Work buffers, merge helpers, bind group helpers, instance loops           |
| [shape.scala](src/graphics/painter/shape.scala)                  | `instances` field, `bind` expanded to 8 overloads (in Bindable)           |
| [layer.scala](src/graphics/painter/layer.scala)                  | `instances` field                                                         |
| NEW [instance.scala](src/graphics/painter/instance.scala)        | `Instance`, `InstanceList[U, P]`                                          |
| NEW [drafts/instances/](drafts/instances/)                       | Demo: 100 rotating triangles with instances + panel camera binding        |
| [drafts/index.html](drafts/index.html)                           | Added Instances link                                                      |
| [serve_bun.ts](serve_bun.ts), [serve_custom.ts](serve_custom.ts) | Added instances route                                                     |

## Verification

- `bun run build` — compiles successfully
- All existing drafts unchanged and still compile
- Instances draft renders 100 rotating triangles with per-instance model/tint
  and shared panel-level viewProj camera matrix
