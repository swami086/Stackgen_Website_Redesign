# Puck ← Pencil Layer Tree Implementation Plan

**Status:** Abandoned (2026-09-02) — superseded by [StackGen\* editability + PenPage removal](./2026-09-02-puck-stackgen-editability-pen-removal-design.md).

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Import non-image layers from `NextJS.pen` into Payload `pages.puckData` and render them via generic `Pen*` Puck blocks so editors can change content and layout numbers without editing React.

**Architecture:** Pencil importer → typed `LayerNode` JSON → Puck `PenFrame` / `PenText` / `PenRef` / `PenImage` / `PenDiagramSlot` → `PenLayerRenderer`. Diagram motion stays in existing React diagram components behind slots. Single dark structural tree; light via theme tokens. Docs routes excluded.

**Tech Stack:** Next.js 16, Payload 3.88, `@puckeditor/core`, `@delmaredigital/payload-puck`, Pencil MCP / `NextJS.pen`, Vitest, Torbit (index before navigation)

## Global Constraints

- Spec: `docs/superpowers/specs/2026-09-02-puck-pencil-layer-tree-design.md`
- Exclude `/docs/*` and Docs Pencil frames
- Image fills: URL/media only — no pixel editing
- No graph-CRUD custom field
- Do not reintroduce `csrf: [serverURL]` or connect live DB during `next build`
- Torbit: `index` before structural codebase queries
- Prefer extending `web/puck/` over inventing a parallel CMS
- Commits only when the user asks (or when an execution skill explicitly requires a commit step — still confirm if user rules say ask first)

---

## File map

| File | Responsibility |
|------|----------------|
| `web/puck/layers/types.ts` | `LayerNode`, sizing, diagram keys |
| `web/puck/layers/map-pencil-node.ts` | Pure Pencil JSON → `LayerNode` (testable without MCP) |
| `web/puck/layers/diagram-keys.ts` | Name/id → `diagramKey` lookup |
| `web/puck/layers/to-puck-data.ts` | `LayerNode` → Puck `Data` |
| `web/puck/blocks/pen/pen-blocks.tsx` | Puck component defs for Pen* |
| `web/components/puck/pen/PenLayerRenderer.tsx` | Runtime render of Pen* props |
| `web/puck/stackgen-config.tsx` | Register Pen* components |
| `web/puck/fixtures/home-zXASg-sample.json` | Small Pencil subtree fixture |
| `web/scripts/import-pencil-layers.ts` | Seed/sync into Payload pages |
| `web/__tests__/pen-layers-*.test.ts` | Importer + renderer tests |
| `web/app/(site)/page.tsx` (later) | Feature-flag cutover |

---

### Task 1: Layer types + diagram key map

**Files:**
- Create: `web/puck/layers/types.ts`
- Create: `web/puck/layers/diagram-keys.ts`
- Test: `web/__tests__/pen-diagram-keys.test.ts`

**Interfaces:**
- Produces: `LayerNode`, `PenSizing`, `DiagramKey`, `resolveDiagramKey(name: string, pencilId?: string): DiagramKey | null`

- [ ] **Step 1: Write failing test**

```ts
import { describe, expect, it } from "vitest";
import { resolveDiagramKey } from "@/puck/layers/diagram-keys";

describe("resolveDiagramKey", () => {
  it("maps OCG frame name", () => {
    expect(resolveDiagramKey("Operational Context Graph")).toBe("ocg");
  });
  it("returns null for ordinary frames", () => {
    expect(resolveDiagramKey("Hero copy")).toBeNull();
  });
});
```

- [ ] **Step 2: Run test — expect FAIL (module missing)**

Run: `cd web && pnpm exec vitest run __tests__/pen-diagram-keys.test.ts`

- [ ] **Step 3: Implement types + map**

```ts
// web/puck/layers/types.ts
export type PenSizing = number | "fill_container" | "fit_content" | string;

export type DiagramKey =
  | "ops-lag"
  | "inner-outer-loop"
  | "offerings"
  | "integrations"
  | "ocg"
  | "context-graph";

export type LayerNode =
  | {
      kind: "frame";
      pencilId: string;
      name: string;
      layout?: "none" | "vertical" | "horizontal";
      gap?: number;
      padding?: number | number[];
      width?: PenSizing;
      height?: PenSizing;
      x?: number;
      y?: number;
      fill?: string;
      children: LayerNode[];
    }
  | {
      kind: "text";
      pencilId: string;
      name: string;
      content: string;
      fontSize?: number;
      fontWeight?: string;
      fill?: string;
      width?: PenSizing;
      height?: PenSizing;
      textGrowth?: "auto" | "fixed-width" | "fixed-width-height";
      href?: string;
    }
  | {
      kind: "ref";
      pencilId: string;
      name: string;
      componentKey: "button-primary" | "button-ghost" | "logo";
      label?: string;
      href?: string;
    }
  | {
      kind: "image";
      pencilId: string;
      name: string;
      url: string;
      width?: PenSizing;
      height?: PenSizing;
      mode?: "stretch" | "fill" | "fit";
    }
  | {
      kind: "diagram";
      pencilId: string;
      name: string;
      diagramKey: DiagramKey;
      width?: PenSizing;
      height?: PenSizing;
      copy?: Record<string, string>;
    };
```

```ts
// web/puck/layers/diagram-keys.ts
import type { DiagramKey } from "./types";

const BY_SUBSTR: { match: RegExp; key: DiagramKey }[] = [
  { match: /operational context graph|^\s*ocg\b/i, key: "ocg" },
  { match: /inner.?outer|inner→outer/i, key: "inner-outer-loop" },
  { match: /offerings diagram/i, key: "offerings" },
  { match: /integrations/i, key: "integrations" },
  { match: /opslag|ops lag/i, key: "ops-lag" },
  { match: /context graph/i, key: "context-graph" },
];

export function resolveDiagramKey(name: string): DiagramKey | null {
  for (const row of BY_SUBSTR) {
    if (row.match.test(name)) return row.key;
  }
  return null;
}
```

- [ ] **Step 4: Re-run test — expect PASS**

- [ ] **Step 5: Commit only if user requested** (otherwise stop and note files ready)

---

### Task 2: Pencil node mapper (pure)

**Files:**
- Create: `web/puck/layers/map-pencil-node.ts`
- Create: `web/puck/fixtures/home-zXASg-sample.json` (hand-built mini tree: one frame, one text, one image fill, one button ref, one diagram-named frame)
- Test: `web/__tests__/pen-map-pencil-node.test.ts`

**Interfaces:**
- Consumes: `LayerNode`, `resolveDiagramKey`
- Produces: `mapPencilNode(raw: PencilLike): LayerNode | null`, `mapPencilTree(raw: PencilLike): LayerNode | null`

Pencil-like shape (minimal):

```ts
export type PencilLike = {
  id: string;
  name?: string;
  type: string;
  content?: string;
  ref?: string; // component id
  layout?: string;
  gap?: number;
  padding?: number | number[];
  width?: number | string;
  height?: number | string;
  x?: number;
  y?: number;
  fill?: unknown;
  children?: PencilLike[];
  textGrowth?: string;
  href?: string;
  descendants?: Record<string, unknown>;
};
```

- [ ] **Step 1: Failing tests**

```ts
import sample from "@/puck/fixtures/home-zXASg-sample.json";
import { mapPencilTree } from "@/puck/layers/map-pencil-node";

it("maps text content", () => {
  const tree = mapPencilTree(sample as any);
  expect(tree?.kind).toBe("frame");
  if (tree?.kind !== "frame") return;
  const text = tree.children.find((c) => c.kind === "text");
  expect(text && text.kind === "text" && text.content).toBeTruthy();
});

it("maps image fill to kind image", () => {
  const tree = mapPencilTree(sample as any);
  if (tree?.kind !== "frame") throw new Error("expected frame");
  expect(tree.children.some((c) => c.kind === "image")).toBe(true);
});

it("maps diagram-named frame to kind diagram", () => {
  const tree = mapPencilTree(sample as any);
  if (tree?.kind !== "frame") throw new Error("expected frame");
  expect(tree.children.some((c) => c.kind === "diagram")).toBe(true);
});
```

- [ ] **Step 2: Run — expect FAIL**

- [ ] **Step 3: Implement mapper rules**

1. `type === "text"` → `kind: "text"`
2. `type === "ref"` → map `ref` id: `WjkJH`→`button-primary`, `Xo9hR`→`button-ghost`, `OX8YG`→`logo` (constants in file)
3. `fill.type === "image"` (or fill object with `url`) → `kind: "image"` (do not recurse children)
4. `type === "frame"` + `resolveDiagramKey(name)` → `kind: "diagram"` (children become optional `copy` extraction of nested texts only, or empty `copy` in v1)
5. Else `type === "frame"` → `kind: "frame"` with mapped children (drop nulls)
6. Else return `null` (skip path/ellipse/etc. unless needed later)

- [ ] **Step 4: Tests PASS**

---

### Task 3: LayerNode → Puck Data

**Files:**
- Create: `web/puck/layers/to-puck-data.ts`
- Test: `web/__tests__/pen-to-puck-data.test.ts`

**Interfaces:**
- Produces: `layerTreeToPuckData(root: LayerNode): { content: Array<{ type: string; props: Record<string, unknown> }>; root: { props: Record<string, unknown> } }` matching `@puckeditor/core` Data shape used by existing seeds in `build-page-data.ts`

- [ ] Inspect `web/puck/lib/build-page-data.ts` for exact `Data` shape (Torbit + Read) — mirror `content` items `{ type, props }` and nested `slots` if using Puck slot fields.

- [ ] Prefer **slot field** on `PenFrame` named `children` for nesting (Puck slot API). If slot nesting is awkward with payload-puck, flatten to a single root `PenFrame` whose `children` prop is a JSON array rendered manually (document choice in code comment `ponytail: slot vs json children`).

**Recommended v1 (ponytail):** store nested tree as `props.tree: LayerNode` on a single root component `PenPage` to avoid deep Puck slot limits — editor still edits via custom fields later; Phase 1 can expose JSON field + selected path. **Spec wants Pen* blocks** — implement `PenPage` root with `tree` prop typed as LayerNode for Phase 1 editor (object field), then Task 4 renderer.

Actually re-read spec: PenFrame children slot. Plan:

- `PenPage` root block: `{ tree: LayerNode }` serialized  
- Renderer walks tree  
- Puck fields on `PenPage`: custom field later; Phase 1 use `type: "textarea"` JSON for smoke, replace with structured fields in Task 5  

For true per-layer Puck selection, Task 5 converts tree → nested slot components. Phase 1 deliverable = tree in puckData + public render.

- [ ] **Test:** `layerTreeToPuckData` wraps root in `{ content: [{ type: "PenPage", props: { tree } }] }`

---

### Task 4: PenLayerRenderer + PenPage Puck block

**Files:**
- Create: `web/components/puck/pen/PenLayerRenderer.tsx`
- Create: `web/puck/blocks/pen/pen-blocks.tsx`
- Modify: `web/puck/stackgen-config.tsx` — register `PenPage`
- Test: `web/__tests__/pen-layer-renderer.test.tsx`

**Interfaces:**
- Produces: `PenLayerRenderer({ node: LayerNode })`, Puck `PenPage.render`

- [ ] Render rules:
  - `frame` → `<div>` with flex styles from layout/gap/padding/width/height
  - `text` → `<p>` or `<a>` if href
  - `ref` → reuse existing `ButtonPrimary` / `ButtonGhost` / `Logo` from replica primitives
  - `image` → `<img src={url} />` or next/image
  - `diagram` → switch `diagramKey` to existing diagram components; on unknown, `DiagramPlaceholder`

- [ ] Vitest: render a tiny tree, expect text content in document

- [ ] Register in `stackgenConfig.components.PenPage`

---

### Task 5: Fixture import script (Home) without live Pencil (JSON)

**Files:**
- Create: `web/scripts/import-pencil-layers.ts`
- Modify: `web/package.json` script `seed:puck-layers`

**Behavior:**

```bash
cd web && pnpm seed:puck-layers -- --fixture puck/fixtures/home-zXASg-sample.json --slug home --force
```

- Loads fixture → `mapPencilTree` → `layerTreeToPuckData` → Payload `pages` upsert (`isHomepage` / slug per existing seed patterns in `seed-puck-*.ts`)
- `--preserve-text`: when updating, keep prior `PenPage.props.tree` text nodes by `pencilId`

- [ ] Dry-run against local Docker Payload (`DATABASE_URL` from compose)
- [ ] Confirm admin page shows `PenPage` block

---

### Task 6: Live Pencil export helper (optional automation)

**Files:**
- Create: `web/scripts/export-pencil-home.md` (operator notes) OR script that documents MCP execute visitor dump

**Operator steps (no secrets):**

1. Pencil MCP `execute` on `NextJS.pen`: visit `zXASg`, Print/collect JSON-serializable nodes (id, name, type, layout, sizing, fill, content, ref, children ids)
2. Write `web/puck/fixtures/home-zXASg-full.json`
3. Re-run `pnpm seed:puck-layers -- --fixture … --force`

- [ ] Produce full Home fixture once via MCP in implementation session
- [ ] Snapshot test size smoke: `children.length > 5` on mapped root

---

### Task 7: Preview route + feature flag (no default cutover)

**Files:**
- Create or modify: `web/app/(site)/puck-layers-preview/page.tsx` (or query `?layers=1` on home)
- Modify: `web/app/(site)/page.tsx` — only if `process.env.PUCK_LAYER_TREE === "1"` use PenPage data

**Default:** production home stays current `StackGen*` tree until explicit cutover task.

- [ ] Preview URL returns 200 with fixture strings
- [ ] Default `/` unchanged

---

### Task 8: Diagram slots wired on full Home fixture

**Files:**
- Modify: `PenLayerRenderer` diagram switch
- Modify: fixture / import after full Home dump

- [ ] Assert each `diagramKey` used on Home resolves to a component
- [ ] Manual check: motion still runs on preview for OCG / InnerOuterLoop

---

### Task 9: Product + blog imports (after Home preview OK)

**Files:**
- Fixtures per route frame ids from spec
- `import-pencil-layers.ts` multi-slug
- Ensure `/blog` gets a `pages` row (closes blog-index gap)

- [ ] Seed four products + blog index + one post template
- [ ] Preview routes only until cutover

---

### Task 10: Cutover + deprecate StackGen* (last)

**Files:**
- `web/app/(site)/page.tsx`, product/blog pages
- `web/puck/stackgen-config.tsx` — move StackGen* to `legacy` category or remove from sidebar

- [x] Set `PUCK_LAYER_TREE=1` in local compose; verify `/`, product, blog
- [x] Screenshot compare Home vs prior (HTML snapshots under `.superpowers/sdd/task-10-*.html`; pixel diff optional)
- [x] Update `openmemory.md` Patterns
- [x] Update full-editability spec status → superseded by layer-tree for structure

---

## Spec coverage checklist

| Spec requirement | Task |
|------------------|------|
| Pen* / layer tree in puckData | 1–4 |
| Image URL only | 2, 4 |
| Docs excluded | 5–6 (importer skips docs frames) |
| Single dark tree / theme tokens | 6 notes + renderer uses CSS vars |
| PenDiagramSlot / React motion | 4, 8 |
| Home → products/blog phases | 7–10 |
| Re-sync preserve text | 5 `--preserve-text` |
| Tests importer + renderer | 2, 4 |
| No live DB at build | unchanged; preview dynamic |

## Placeholder scan

No TBD steps; live Pencil dump is Task 6 with concrete MCP procedure.

---

## Execution handoff

Plan complete and saved to `docs/superpowers/plans/2026-09-02-puck-pencil-layer-tree.md`.

**Two execution options:**

1. **Subagent-Driven (recommended)** — fresh subagent per task, review between tasks  
2. **Inline Execution** — run tasks in this session with checkpoints  

Which approach?
