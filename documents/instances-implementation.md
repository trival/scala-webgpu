# Instance Rendering Implementation Plan

## Context

The Scala painter library currently supports one draw call per shape/layer with
bindings set directly on each. We want to add:

1. **Panel-level runtime bindings** — a panel can provide fallback bindings to
   all its children (shapes/layers) without compile-time type checking (since
   panels are untyped)
2. **Instance rendering** — shapes/layers can have N instances, each with
   binding overrides, producing N draw calls. Instance bindings are type-safe
   since they live on typed Shape[U,P]/Layer[U,P].

Binding priority (lowest to highest): **Panel → Shape/Layer → Instance**

---

## Stage 1: Panel-Level Runtime Bindings

### 1.1 Add binding storage and methods to Panel

**File:** [panel.scala](src/graphics/painter/panel.scala)

- Add `type PanelBindingValue = BufferBinding[?, ?] | GPUSampler | Panel`
- Add `var runtimeBindings: Dict[PanelBindingValue] = Dict()` to Panel
- Add overloaded `inline bind` methods (1–8 params) accepting `BindPair[N, V]`
  where `N <: String & Singleton`
- Note: varargs would be cleaner since Panel is untyped, but `processPanelEntry`
  must be `inline` (for `summonFrom` on raw values), and inline defs can't be
  called inside a runtime loop over varargs. So we use fixed overloads like
  Bindable.
- Methods are `inline` so that `summonFrom` can resolve `UniformValue[V, f]` at
  the call site for raw values — but NO name/type validation against shader
  types (Panel is untyped)
- Each pair is processed by `processPanelEntry` which handles the same 3 cases
  as `Bindable.processEntry`:
  - `GPUSampler` → store directly in `runtimeBindings(name)`
  - `BufferBinding[?, ?]` → store directly
  - `Panel` → store directly
  - Raw value → check if `runtimeBindings(name)` already has a `BufferBinding`,
    if so `.set(rawValue)`; otherwise
    `summonFrom { case uv: UniformValue[V, f] => ... }` to auto-create one
- This gives the same ergonomics as Shape: `panel.bind("color" := Vec3(1,0,0))`
  auto-creates a binding, and re-calling it updates the existing one

### 1.2 Add working buffers and merge helpers to Painter

**File:** [painter.scala](src/graphics/painter/painter.scala)

- Add reusable working arrays to Painter (single-threaded JS, safe to reuse):
  ```
  _workBindings: BindingSlots = Arr()
  _workPanelBindings: Arr[Opt[Panel]] = Arr()
  ```
- Add `copyToWork(bindings, panelBindings)` — copies into work arrays, sets
  `.length` first to truncate stale data
- Add `applyPanelBindings(panel, shade, workBindings, workPanelBindings)` —
  iterates `panel.runtimeBindings` keys, for each: look up name in
  `shade.uniformIndices`/`shade.panelIndices`, if slot exists AND work array at
  that slot is null, fill it in

### 1.3 Update render methods to accept panel and merge

**File:** [painter.scala](src/graphics/painter/painter.scala)

- Add `panel: Opt[Panel] = null` parameter to `renderShapeOnPass` and
  `renderLayerOnPass`
- Extract
  `setBindGroupsAndDraw(pass, shade, bindings, panelBindings, vertexCount, srcView)`
  helper from existing inline code — reusable for both single-draw and instance
  loop
- When panel has runtime bindings: `copyToWork` → `applyPanelBindings` → use
  work arrays for bind group creation
- When panel has no runtime bindings: use shape/layer arrays directly (zero
  overhead, no copy)
- Update `paint()` to pass panel to both render methods

---

## Stage 2: Instance Rendering

### 2.1 Define Instance and InstanceList

**File:** new [instance.scala](src/graphics/painter/instance.scala)

**`Instance`** — plain data holder:

```
class Instance:
  var bindings: BindingSlots = Arr()
  var panelBindings: Arr[Opt[Panel]] = Arr()
```

**`InstanceList[U, P]`** — typed manager with compile-time checked `add()`:

- Constructor takes `shade: Shade[U, P]`, `painter: Painter` (always obtain GPU
  resources via painter, not device directly)
- `val items: Arr[Instance] = Arr()`
- `def length: Int`, `def clear(): Unit`
- Overloaded inline `add(e1: BindPair[N1, V1], ...)` methods (1–8 params) — each
  creates an Instance, calls `processInstanceEntry` per pair, pushes to items,
  returns index
- `processInstanceEntry` mirrors `Bindable.processEntry` logic (same
  compile-time name/type checks against U and P) but writes to the Instance's
  arrays instead of `this`

### 2.2 Add instances field to Shape and Layer

**Files:** [shape.scala](src/graphics/painter/shape.scala),
[layer.scala](src/graphics/painter/layer.scala)

- Add `val instances: InstanceList[U, P] = InstanceList[U, P](shade, painter)`
  to both classes

### 2.3 Add instance merge and loop to rendering

**File:** [painter.scala](src/graphics/painter/painter.scala)

- Add `applyInstanceBindings(inst, workBindings, workPanelBindings)` — for each
  non-null slot in instance arrays, override work array at that slot

**Shape rendering** (`renderShapeOnPass`):

- If `instances.length == 0`: single draw (existing behavior + panel merge)
- If `instances.length > 0`: set pipeline and vertex buffer once, then loop
  instances:
  - `copyToWork(shape.bindings, shape.panelBindings)`
  - `applyPanelBindings(...)` if panel present
  - `applyInstanceBindings(inst, ...)`
  - `setBindGroupsAndDraw(...)`

**Layer rendering** (`renderLayerOnPass`):

- Same instance loop pattern
- Per-instance srcView resolution: if after full merge the work panelBindings
  slot 0 is set, don't inject srcView (instance provided its own panel texture);
  otherwise use the ping-pong srcView
- Ping-pong pass structure (in `paint()`) is still determined per-layer, not
  per-instance — all instances render in the same pass, with per-instance bind
  groups

### 2.4 Bind group optimization (skip for v1)

The Rust painter optimizes by checking what varies across instances (only
values, only panels, or both) to minimize `setBindGroup` calls. **Skip this for
v1** — always create both bind groups per instance. The overhead is negligible
compared to draw calls, and the code complexity is substantial.

---

## Cross-cutting: Expand bind overloads to 8 params

Currently `Bindable.bind` only has overloads for 1–4 params, which is
insufficient for real usage. Expand to 1–8 overloads in all bind-like methods:

- **`Bindable.bind`** in [shape.scala](src/graphics/painter/shape.scala) — add
  overloads for 5, 6, 7, 8 params
- **`Panel.bind`** in [panel.scala](src/graphics/painter/panel.scala) — 1–8
  param overloads from the start
- **`InstanceList.add`** in
  [instance.scala](src/graphics/painter/instance.scala) — 1–8 param overloads
  from the start

Each overload follows the same pattern: N type params for names, V type params
for values, call `processEntry`/`processPanelEntry`/`processInstanceEntry` for
each pair.

---

## Files to modify

| File                                                      | Changes                                                                                     |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| [panel.scala](src/graphics/painter/panel.scala)           | Add `runtimeBindings`, `bind` methods, `PanelBindingValue` type                             |
| [painter.scala](src/graphics/painter/painter.scala)       | Work buffers, merge helpers, `setBindGroupsAndDraw` extraction, instance loops, panel param |
| [shape.scala](src/graphics/painter/shape.scala)           | Add `instances` field                                                                       |
| [layer.scala](src/graphics/painter/layer.scala)           | Add `instances` field                                                                       |
| NEW [instance.scala](src/graphics/painter/instance.scala) | `Instance` class, `InstanceList[U, P]` class                                                |

## Verification

1. **Compile**: `bun run build` — must succeed with no errors
2. **Existing drafts**: all existing drafts must still work (no regressions)
3. **New draft**: create a `drafts/instances/` example that demonstrates:
   - Panel-level bindings shared across multiple shapes
   - Shape instances with per-instance uniform overrides (e.g., different
     colors/positions)
   - Layer instances (e.g., deferred lighting: one fullscreen layer drawn per
     light with additive blending)
4. **Tests**: `scala test .` for any new unit tests on binding merge logic
