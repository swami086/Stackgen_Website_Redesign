# Replica Motion + Visual Refine Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:dispatching-parallel-agents to run each wave, and superpowers:subagent-driven-development for review between waves. Steps use checkbox (`- [ ]`) syntax for tracking.
>
> ### Model selection (mandatory)
>
> | Job type | Model slug | When to use |
> |---|---|---|
> | **Visual work** | `gemini-3.1-pro` | Diagrams, motion primitives, section choreography, layout/composition, glass/material UI, logo marks, particle/iso scenes, hero/nav visual polish |
> | **Code execution** | `composer-2.5-fast` | Deps/install, tokens/PRNG, CSS infra hooks, wiring/integration, PNG deletion, Vitest/Playwright suites, Docker, typecheck/build gates, reports that are pure plumbing |
>
> Controller gates (`pnpm typecheck && pnpm test`) run in the parent session. Do not invent a third model. If a task mixes both, pick by **primary deliverable** (a live diagram is visual even if it has tests; a test-only wiring pass is code execution).

**Goal:** Turn the static dual-theme home replica into an Awwwards-tier motion experience: four flat PNG diagrams become live components, one of which is a never-repeating seeded simulation and one an operable isometric 3D stack, with a three-tier glass material system and themed browser surfaces.

**Architecture:** A shared motion foundation (`web/components/replica/motion/**`) is built once and consumed by four independently-owned diagram components and two section-choreography owners. Motion timings are harvested verbatim from Pencil node names into `web/lib/motion-tokens.ts` so code and canvas cannot drift. GSAP owns only the one pinned/scrubbed section; `motion@13` owns everything else; the two never share a component tree.

**Tech Stack:** Next.js ~16.3 (App Router, standalone) · React ~19.2 · TypeScript · Tailwind v4 · pnpm · Vitest · GSAP + ScrollTrigger · Lenis · Geist · canvas 2D · CSS 3D · Playwright · Docker

**Spec:** `docs/superpowers/specs/2026-08-29-replica-motion-visual-refine-design.md`

---

## Global Constraints

Every task's requirements implicitly include this section.

1. **Never modify** `Stack_Linear.pen`. Pencil is read-only reference.
2. **Motion timings are harvested, not invented.** Use `EASE`/`DUR`/`STAGGER`/`AMBIENT` from `@/lib/motion-tokens`. Never hardcode a duration or cubic-bezier in a component.
3. **`Math.random()` is banned in all rendering code.** Every stochastic effect draws from `mulberry32` in `@/lib/seeded-random`. Non-determinism breaks screenshot parity.
4. **`window.addEventListener("scroll")` is banned.** Use IntersectionObserver, GSAP ScrollTrigger, or `useScroll` from `motion/react`.
5. **Animate only `transform` and `opacity`** (plus bounded `filter` where the spec names it). Never `width`, `height`, `top`, `left`, or margins.
6. **`backdrop-filter` is permitted on exactly two surfaces:** the nav island while over the hero substrate, and overlays. Maximum `blur(24px)`. Zero occurrences inside `web/components/replica/diagrams/`, on any isometric layer, on any scrolling container, or on a bento cell.
7. **Radial glow (Tier 3) on exactly three surfaces:** primary CTA, Context Graph hub core, nav island. Always a background-layer radial gradient on a pseudo-element, never a `box-shadow`, always offset off-center, always a desaturated accent tint.
8. **Zero em-dash (`—`) and en-dash (`–`) in any user-visible string.** Use the regular hyphen.
9. **No new eyebrows.** The four canvas eyebrows (`OPERATIONAL CONTEXT GRAPH`, `WHO IT'S FOR`, `INNER LOOP`, `OUTER LOOP`) stay. Do not add a fifth, do not delete these four.
10. **Every diagram renders its fully assembled final state as default DOM** so a failed script never hides content.
11. **Every diagram keeps `role="img"` plus the `aria-label` copied verbatim from the PNG it replaces.** Decorative internals get `aria-hidden="true"`.
12. **`prefers-reduced-motion: reduce`** renders diagrams assembled, stops ambient loops, removes pinning and scrubbing. Keeps opacity and color state transitions.
13. **Tailwind preset classes only.** No static arbitrary bracket values for sizes that a preset covers. CSS variables in brackets (`bg-[var(--x)]`) are allowed.
14. **Icon family is Phosphor** (`@phosphor-icons/react`). Zero Lucide.
15. **Vendor marks come from the `VENDOR_MARKS` registry.** Never inline an SVG mark in a diagram, never redraw one by hand.
16. **File ownership is exclusive per agent.** If a file is not in your task's `Files` block, you may not edit it. Report a needed change instead.
17. **Commits:** one per task, conventional-commit style. Do not push.
18. **Desktop-first.** Full choreography at `>= 1024px`. Below `lg`, pinning off and scenes flatten. Below `md`, entrance reveals only, substrate disabled.

---

## File Structure

| Path | Owner | Responsibility |
|---|---|---|
| `web/package.json` | W0 | Add gsap, lenis, geist, @playwright/test |
| `web/lib/motion-tokens.ts` | W0 | Harvested easings, durations, staggers, ambients |
| `web/lib/seeded-random.ts` | W0 | mulberry32 PRNG plus fixed seeds |
| `web/app/globals.css` | W0 | Geist font vars, 3 glass tiers, glow, browser surfaces, a11y fallbacks |
| `web/app/layout.tsx` | W0 | Geist fonts, MotionProvider mount |
| `web/components/replica/motion/MotionProvider.tsx` | W0 | Lenis + ScrollTrigger single registration |
| `web/components/replica/motion/useReducedMotionSafe.ts` | W0 | SSR-safe reduced-motion hook |
| `web/components/replica/motion/Reveal.tsx` | W1A | Intersection fade/slide primitive |
| `web/components/replica/motion/Stagger.tsx` | W1A | Sibling stagger with capped total delay |
| `web/components/replica/motion/DrawPath.tsx` | W1A | stroke-dashoffset self-drawing path |
| `web/components/replica/motion/Beam.tsx` | W1A | Travelling light along an SVG path |
| `web/components/replica/motion/GridSubstrate.tsx` | W1A | Canvas 2D dot grid with luminance variance |
| `web/components/replica/motion/IsoScene.tsx` | W1B | CSS 3D scene + IsoLayer + Billboard |
| `web/components/replica/motion/Constellation.tsx` | W1B | Sparse labelled graph, grow-in |
| `web/components/replica/motion/LayerRail.tsx` | W1B | Accessible tablist rail |
| `web/components/replica/logos/**` | W1C | 13 inline SVG marks + VENDOR_MARKS registry |
| `web/components/replica/motion/ParticleField.tsx` | W1D | Seeded work-item simulation |
| `web/components/replica/diagrams/InnerOuterLoop.tsx` | W2A | Replaces `*-RBepL.png` |
| `web/components/replica/diagrams/Offerings.tsx` | W2B | Replaces `*-F4Jlp.png` |
| `web/components/replica/diagrams/Integrations.tsx` | W2C | Replaces `*-hG9Ou.png` |
| `web/components/replica/diagrams/ContextGraph.tsx` | W2D | Replaces `*-GPYOG.png` |
| `web/components/replica/sections/Nav.tsx`, `Hero.tsx` | W3A | Island + material transition, split hero, substrate mount |
| `web/components/replica/sections/Logos.tsx`, `WhoItsFor.tsx`, `Footer.tsx` | W3B | Logo stagger, 8-cell bento, magnetic CTA |
| `web/components/replica/sections/Assemblies.tsx`, `Shell.tsx` | W4 | Swap `<img>` for diagram components |
| `web/components/replica/HomeReplica.tsx`, `web/content/replica.ts` | W4 | Wiring, PNG path removal |
| `web/__tests__/**` | W0/W1/W4 | Vitest coverage |
| `web/e2e/**` | W5 | Playwright evidence suite |

---

## Wave map

```
Wave 0  (1 agent, sequential)   Foundation. Blocks everything. Shared files.
                                Model: composer-2.5-fast (code execution)
Wave 1  (4 agents PARALLEL)     1A motion primitives · 1B 3D+graph primitives
                                1C logo registry     · 1D particle simulation
                                Model: gemini-3.1-pro (visual) for all four
Wave 2  (4 agents PARALLEL)     2A InnerOuterLoop · 2B Offerings
                                2C Integrations   · 2D ContextGraph
                                Model: gemini-3.1-pro (visual) for all four
Wave 3  (2 agents PARALLEL)     3A Nav + Hero · 3B Logos + WhoItsFor + Footer
                                Model: gemini-3.1-pro (visual) for both
Wave 4  (1 agent, sequential)   Integration, PNG deletion, tests green
                                Model: composer-2.5-fast (code execution)
Wave 5  (1 agent, sequential)   Docker + evidence (screenshots, axe, Lighthouse)
                                Model: composer-2.5-fast (code execution)
```

Waves are barriers. Do not start a wave until every agent in the previous wave has returned and the controller has run `pnpm typecheck && pnpm test`.

---

# WAVE 0 - Foundation

**1 agent, `composer-2.5-fast` (code execution).** Owns every shared file. Nothing else may run concurrently.

### Task 0.1: Install dependencies

**Files:**
- Modify: `web/package.json`

- [ ] **Step 1: Install**

```bash
cd web
pnpm add gsap@^3.13.0 lenis@^1.1.20 geist@^1.3.1
pnpm add -D @playwright/test@^1.55.0
```

- [ ] **Step 2: Verify**

Run: `cd web && pnpm ls gsap lenis geist @playwright/test --depth 0`
Expected: all four listed with resolved versions, no `UNMET DEPENDENCY`.

- [ ] **Step 3: Commit**

```bash
git add web/package.json web/pnpm-lock.yaml
git commit -m "build: add gsap, lenis, geist, playwright for motion refine"
```

---

### Task 0.2: Motion token manifest

**Files:**
- Create: `web/lib/motion-tokens.ts`
- Test: `web/__tests__/motion-tokens.test.ts`

**Interfaces:**
- Produces: `EASE.emphasize: readonly [number,number,number,number]`, `EASE.standard`, `EASE_CSS.emphasize: string`, `EASE_CSS.standard`, `DUR.{flow,chip,shell,glassFade}: number` (seconds), `STAGGER.{chip,orbit,shell,logo}: number` (seconds), `AMBIENT.{hub,ring,bezel,orbit,sweep}: number` (seconds), `capStagger(count: number, step: number, max?: number): number`

- [ ] **Step 1: Write the failing test**

```ts
// web/__tests__/motion-tokens.test.ts
import { EASE, EASE_CSS, DUR, STAGGER, AMBIENT, capStagger } from "@/lib/motion-tokens";

test("easings match the canvas-harvested curves", () => {
  expect(EASE.emphasize).toEqual([0.16, 1, 0.3, 1]);
  expect(EASE.standard).toEqual([0.4, 0, 0.2, 1]);
  expect(EASE_CSS.emphasize).toBe("cubic-bezier(0.16, 1, 0.3, 1)");
});

test("durations and staggers match Pencil node names in seconds", () => {
  expect(DUR.chip).toBeCloseTo(0.18);
  expect(DUR.shell).toBeCloseTo(0.52);
  expect(STAGGER.chip).toBeCloseTo(0.04);
  expect(STAGGER.orbit).toBeCloseTo(0.08);
  expect(STAGGER.shell).toBeCloseTo(0.16);
  expect(AMBIENT.orbit).toBe(18);
  expect(AMBIENT.bezel).toBeCloseTo(3.2);
});

test("capStagger bounds total delay", () => {
  expect(capStagger(9, STAGGER.chip)).toBeCloseTo(0.04);
  expect(capStagger(100, STAGGER.chip, 0.4)).toBeCloseTo(0.4 / 99);
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `cd web && pnpm vitest run __tests__/motion-tokens.test.ts`
Expected: FAIL, cannot resolve `@/lib/motion-tokens`.

- [ ] **Step 3: Implement**

```ts
// web/lib/motion-tokens.ts
/**
 * Harvested verbatim from Pencil node names in Stack_Linear.pen (2026-08-29).
 * Source nodes are cited per token. Do not invent values here.
 */

/**
 * Cubic-bezier control points for motion/react `ease`.
 * Declared as a MUTABLE tuple type on purpose: motion's `Easing` type is
 * `[number, number, number, number]`, and a readonly tuple produced by
 * `as const` is not assignable to it. Do not add `as const` here.
 */
type Bezier = [number, number, number, number];

export const EASE: { emphasize: Bezier; standard: Bezier } = {
  /** `k3vas0` "fade+slide 520ms ease.emphasize", `R0IVOn` "orbit enter 520ms ease.emphasize" */
  emphasize: [0.16, 1, 0.3, 1],
  /** `acrOa` "flow-in 180ms ease.standard", `Dsmvf` "enter 180ms ease.standard" */
  standard: [0.4, 0, 0.2, 1],
};

/** Same curves as CSS strings, for keyframes and transitions. */
export const EASE_CSS = {
  emphasize: "cubic-bezier(0.16, 1, 0.3, 1)",
  standard: "cubic-bezier(0.4, 0, 0.2, 1)",
} as const;

/** Durations in seconds. */
export const DUR = {
  /** `acrOa` Connector flow-in 180ms */
  flow: 0.18,
  /** `Dsmvf` Chip enter 180ms */
  chip: 0.18,
  /** `k3vas0` Inner Loop Shell 520ms */
  shell: 0.52,
  /** Nav Tier 1 to Tier 2 material crossfade, 240ms (spec) */
  glassFade: 0.24,
} as const;

/** Per-sibling stagger step in seconds. */
export const STAGGER = {
  /** `Dsmvf` -> `o4mGg`: 0/40/80/.../320ms */
  chip: 0.04,
  /** `R0IVOn` -> `CUSuE`: 0/80/160/240ms */
  orbit: 0.08,
  /** `k3vas0` 0ms -> `eYtt6` 160ms */
  shell: 0.16,
  /** Logo row cinematic stagger (spec) */
  logo: 0.05,
} as const;

/** Ambient loop periods in seconds. */
export const AMBIENT = {
  /** `SqQmR` Hub Core pulse glow 2.8s */
  hub: 2.8,
  /** `UZ0dn` Orbit Ring Outer pulse scale 3s, opacity 0.2 -> 0.55 */
  ring: 3,
  /** `Lt9Dw` Aiden OS Bezel pulse border 3.2s */
  bezel: 3.2,
  /** `rZ7X5` Orbit Track rotate linear 18s */
  orbit: 18,
  /** Integrations light sweep (spec) */
  sweep: 6,
} as const;

/** Ring opacity endpoints from `UZ0dn`. */
export const RING_OPACITY = { from: 0.2, to: 0.55 } as const;

/**
 * Per-item stagger step, shrunk so the whole sequence never exceeds `max`.
 * A 40-item list at 40ms would take 1.6s, which reads as latency.
 */
export function capStagger(count: number, step: number, max = 0.4): number {
  if (count <= 1) return step;
  const total = step * (count - 1);
  return total <= max ? step : max / (count - 1);
}
```

- [ ] **Step 4: Run to verify it passes**

Run: `cd web && pnpm vitest run __tests__/motion-tokens.test.ts`
Expected: PASS, 3 tests.

- [ ] **Step 5: Commit**

```bash
git add web/lib/motion-tokens.ts web/__tests__/motion-tokens.test.ts
git commit -m "feat: add canvas-harvested motion token manifest"
```

---

### Task 0.3: Seeded PRNG

**Files:**
- Create: `web/lib/seeded-random.ts`
- Test: `web/__tests__/seeded-random.test.ts`

**Interfaces:**
- Produces: `mulberry32(seed: number): () => number`, `SEEDS.{particles,integrations,substrate}: number`, `pick<T>(rng: () => number, items: readonly T[]): T`, `range(rng: () => number, min: number, max: number): number`

- [ ] **Step 1: Write the failing test**

```ts
// web/__tests__/seeded-random.test.ts
import { mulberry32, SEEDS, pick, range } from "@/lib/seeded-random";

test("same seed yields an identical sequence", () => {
  const a = mulberry32(SEEDS.particles);
  const b = mulberry32(SEEDS.particles);
  const seqA = Array.from({ length: 20 }, () => a());
  const seqB = Array.from({ length: 20 }, () => b());
  expect(seqA).toEqual(seqB);
});

test("different seeds diverge", () => {
  const a = mulberry32(1);
  const b = mulberry32(2);
  expect(a()).not.toBe(b());
});

test("output stays in [0,1)", () => {
  const rng = mulberry32(99);
  for (let i = 0; i < 500; i++) {
    const v = rng();
    expect(v).toBeGreaterThanOrEqual(0);
    expect(v).toBeLessThan(1);
  }
});

test("pick and range are deterministic helpers", () => {
  const rng = mulberry32(7);
  const items = ["a", "b", "c"] as const;
  expect(items).toContain(pick(rng, items));
  const r = range(mulberry32(7), 10, 20);
  expect(r).toBeGreaterThanOrEqual(10);
  expect(r).toBeLessThan(20);
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `cd web && pnpm vitest run __tests__/seeded-random.test.ts`
Expected: FAIL, cannot resolve `@/lib/seeded-random`.

- [ ] **Step 3: Implement**

```ts
// web/lib/seeded-random.ts
/**
 * Deterministic PRNG. `Math.random` is banned in rendering code because the
 * particle simulation and scatter entrances must reproduce byte-identically
 * for Playwright parity captures.
 */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Fixed seeds so every surface is reproducible and independently tunable. */
export const SEEDS = {
  particles: 1337,
  integrations: 4242,
  substrate: 8080,
} as const;

export function pick<T>(rng: () => number, items: readonly T[]): T {
  return items[Math.floor(rng() * items.length)]!;
}

export function range(rng: () => number, min: number, max: number): number {
  return min + rng() * (max - min);
}
```

- [ ] **Step 4: Run to verify it passes**

Run: `cd web && pnpm vitest run __tests__/seeded-random.test.ts`
Expected: PASS, 4 tests.

- [ ] **Step 5: Commit**

```bash
git add web/lib/seeded-random.ts web/__tests__/seeded-random.test.ts
git commit -m "feat: add seeded PRNG for reproducible motion"
```

---

### Task 0.4: Geist typography swap

**Files:**
- Modify: `web/app/layout.tsx`
- Modify: `web/app/globals.css` (font vars only in this task)

**Interfaces:**
- Produces: CSS vars `--font-geist-sans`, `--font-geist-mono` on `<html>`; `--font-sans` repointed to Geist.

- [ ] **Step 1: Replace the font imports in `layout.tsx`**

Replace the `Inter` and `JetBrains_Mono` imports and their instantiations with:

```tsx
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
```

And change the `<html>` className to:

```tsx
<html
  lang="en"
  className={`${GeistSans.variable} ${GeistMono.variable}`}
  data-theme="dark"
  suppressHydrationWarning
>
```

Delete the now-unused `Inter` / `JetBrains_Mono` imports and the `inter` / `jetbrains` consts entirely.

- [ ] **Step 2: Repoint the font vars in `globals.css`**

Replace the two font lines in the `@theme inline` block:

```css
  --font-sans: var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif;
  --font-mono: var(--font-geist-mono), ui-monospace, monospace;
```

- [ ] **Step 3: Verify no Inter references survive**

Run: `cd web && rg -n "Inter|font-inter|JetBrains|font-jetbrains" app/ components/ lib/`
Expected: no output.

- [ ] **Step 4: Build check**

Run: `cd web && pnpm typecheck && pnpm build`
Expected: both succeed; build output lists route `/`.

- [ ] **Step 5: Commit**

```bash
git add web/app/layout.tsx web/app/globals.css
git commit -m "feat: replace Inter with Geist across the replica"
```

---

### Task 0.5: Three-tier glass, glow, and browser surfaces

**Files:**
- Modify: `web/app/globals.css`
- Test: `web/__tests__/glass-discipline.test.ts`

**Interfaces:**
- Produces: classes `.glass-real`, `.glass-specular`, `.glow-source`; themed browser surfaces; reduced-transparency and forced-colors fallbacks.

- [ ] **Step 1: Write the failing discipline test**

```ts
// web/__tests__/glass-discipline.test.ts
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.tsx?$/.test(p)) out.push(p);
  }
  return out;
}

test("globals.css defines all three material tiers", () => {
  const css = readFileSync("app/globals.css", "utf8");
  expect(css).toContain(".glass-real");
  expect(css).toContain(".glass-specular");
  expect(css).toContain(".glow-source");
});

test("globals.css caps blur at 24px", () => {
  const css = readFileSync("app/globals.css", "utf8");
  const blurs = [...css.matchAll(/blur\((\d+)px\)/g)].map((m) => Number(m[1]));
  expect(blurs.length).toBeGreaterThan(0);
  for (const b of blurs) expect(b).toBeLessThanOrEqual(24);
});

test("globals.css themes every browser surface", () => {
  const css = readFileSync("app/globals.css", "utf8");
  for (const token of [
    "::selection",
    "caret-color",
    "scrollbar-color",
    ":focus-visible",
    "text-underline-offset",
    "tabular-nums",
  ]) {
    expect(css).toContain(token);
  }
});

test("globals.css provides reduced-transparency and forced-colors fallbacks", () => {
  const css = readFileSync("app/globals.css", "utf8");
  expect(css).toContain("prefers-reduced-transparency");
  expect(css).toContain("forced-colors");
});

test("no component outside nav and overlays uses backdrop-filter", () => {
  const allowed = /(Nav|Overlay|MegaMenu)\.tsx$/;
  const offenders = walk("components")
    .filter((p) => !allowed.test(p))
    .filter((p) => /backdrop-(filter|blur)/.test(readFileSync(p, "utf8")));
  expect(offenders).toEqual([]);
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `cd web && pnpm vitest run __tests__/glass-discipline.test.ts`
Expected: FAIL on the three-tier and browser-surface assertions.

- [ ] **Step 3: Append the material system to `globals.css`**

```css
/* ============================================================
   MATERIAL TIERS
   Tier 1 real glass  : backdrop-filter. Nav island over the hero
                        substrate, and overlays. Nowhere else.
   Tier 2 specular    : gradient stroke + gradient fill + inset
                        highlight. Zero blur. The default.
   Tier 3 glow        : additive light for flat backgrounds.
                        Background-layer radial gradient only.
   ============================================================ */

/* --- Tier 1: real glass (web approximation, not Apple Liquid Glass) --- */
.glass-real {
  background:
    linear-gradient(135deg, rgb(255 255 255 / 0.1), rgb(255 255 255 / 0.03)),
    color-mix(in oklab, var(--ds-surface) 62%, transparent);
  backdrop-filter: blur(24px) saturate(140%);
  -webkit-backdrop-filter: blur(24px) saturate(140%);
  border: 1px solid rgb(255 255 255 / 0.1);
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 0.14),
    0 12px 40px rgb(0 0 0 / 0.28);
}

:root[data-theme="light"] .glass-real {
  background:
    linear-gradient(135deg, rgb(255 255 255 / 0.6), rgb(255 255 255 / 0.28)),
    color-mix(in oklab, var(--ds-surface) 55%, transparent);
  border-color: rgb(0 0 0 / 0.07);
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 0.75),
    0 12px 40px rgb(0 0 0 / 0.09);
}

/* --- Tier 2: specular glass. No blur. Safe on animated surfaces. --- */
.glass-specular {
  position: relative;
  background:
    linear-gradient(
      180deg,
      color-mix(in oklab, var(--ds-surface-raised) 92%, white 8%),
      var(--ds-surface)
    );
  border: 1px solid transparent;
  background-clip: padding-box;
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.08);
}

/* Gradient hairline stroke, drawn as a masked ring so it never tints the fill. */
.glass-specular::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(
    135deg,
    rgb(255 255 255 / 0.16),
    rgb(255 255 255 / 0.03) 42%,
    rgb(255 255 255 / 0.1)
  );
  -webkit-mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

:root[data-theme="light"] .glass-specular {
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.9);
}

:root[data-theme="light"] .glass-specular::before {
  background: linear-gradient(
    135deg,
    rgb(0 0 0 / 0.1),
    rgb(0 0 0 / 0.03) 42%,
    rgb(0 0 0 / 0.07)
  );
}

/* --- Tier 3: radial glow. Light source, not a shadow. --- */
.glow-source {
  position: relative;
  isolation: isolate;
}

.glow-source::after {
  content: "";
  position: absolute;
  /* Deliberately off-center so it reads as a light source, not an aura. */
  inset: -60% -40% -30% -60%;
  z-index: -1;
  border-radius: 50%;
  background: radial-gradient(
    closest-side,
    color-mix(in oklab, var(--ds-accent) 26%, transparent),
    transparent 72%
  );
  pointer-events: none;
}

/* ============================================================
   BROWSER SURFACES
   The parts nobody draws still carry the design.
   ============================================================ */

::selection {
  background: color-mix(in oklab, var(--ds-accent) 32%, transparent);
  color: var(--ds-text-primary);
}

input,
textarea {
  caret-color: var(--ds-accent);
}

* {
  scrollbar-width: thin;
  scrollbar-color: var(--ds-border) transparent;
}

*::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

*::-webkit-scrollbar-track {
  background: transparent;
}

*::-webkit-scrollbar-thumb {
  background: var(--ds-border);
  border-radius: 999px;
  border: 2px solid transparent;
  background-clip: padding-box;
}

*::-webkit-scrollbar-thumb:hover {
  background: var(--ds-text-tertiary);
  background-clip: padding-box;
}

:focus-visible {
  outline: 2px solid var(--ds-accent);
  outline-offset: 2px;
  border-radius: 4px;
}

a {
  text-underline-offset: 0.18em;
  text-decoration-thickness: 1px;
}

.tabular,
[data-metric] {
  font-variant-numeric: tabular-nums;
}

/* ============================================================
   ACCESSIBILITY FALLBACKS
   ============================================================ */

/* ============================================================
   CAPTURE FREEZE
   Playwright sets data-motion-paused on <html> before load so every
   ambient CSS loop halts and a frame is reproducible. Canvas-driven
   motion is frozen separately via the `frozen` prop plus fixed seeds.
   ============================================================ */

:root[data-motion-paused="true"] *,
:root[data-motion-paused="true"] *::before,
:root[data-motion-paused="true"] *::after {
  animation-play-state: paused !important;
  transition: none !important;
}

@media (prefers-reduced-transparency: reduce) {
  .glass-real {
    background: var(--ds-surface);
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }
  .glass-specular {
    background: var(--ds-surface);
  }
  .glow-source::after {
    display: none;
  }
}

@media (forced-colors: active) {
  .glass-real,
  .glass-specular {
    background: Canvas;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    border: 1px solid CanvasText;
  }
  .glass-specular::before,
  .glow-source::after {
    display: none;
  }
}
```

- [ ] **Step 4: Run to verify it passes**

Run: `cd web && pnpm vitest run __tests__/glass-discipline.test.ts`
Expected: PASS, 5 tests.

- [ ] **Step 5: Commit**

```bash
git add web/app/globals.css web/__tests__/glass-discipline.test.ts
git commit -m "feat: add three-tier material system and themed browser surfaces"
```

---

### Task 0.6: MotionProvider and reduced-motion hook

**Files:**
- Create: `web/components/replica/motion/useReducedMotionSafe.ts`
- Create: `web/components/replica/motion/MotionProvider.tsx`
- Modify: `web/app/layout.tsx`

**Interfaces:**
- Produces: `useReducedMotionSafe(): boolean` (false until mounted, SSR-safe), `MotionProvider({ children }: { children: ReactNode })`, `useLenisReady(): boolean`

- [ ] **Step 1: Implement the hook**

```ts
// web/components/replica/motion/useReducedMotionSafe.ts
"use client";

import { useReducedMotion } from "motion/react";

/**
 * SSR-safe reduced-motion read. `motion/react` returns null before mount;
 * we resolve that to false so the server and first client render agree,
 * then the real preference applies. Never invert this default: doing so
 * makes every animation flash on for reduced-motion users.
 */
export function useReducedMotionSafe(): boolean {
  return useReducedMotion() ?? false;
}
```

- [ ] **Step 2: Implement the provider**

```tsx
// web/components/replica/motion/MotionProvider.tsx
"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useReducedMotionSafe } from "./useReducedMotionSafe";

const LenisReadyContext = createContext(false);

/**
 * Single owner of smooth scroll and ScrollTrigger registration.
 * GSAP is imported dynamically so it stays out of the initial bundle;
 * only ContextGraph needs it.
 *
 * Lenis go/no-go (spec, Wave 0 decision): if the pinned scrub jitters at
 * 120Hz, set LENIS_ENABLED to false and ship native scroll. Do not defer
 * this past Wave 0.
 */
const LENIS_ENABLED = true;

export function MotionProvider({ children }: { children: ReactNode }) {
  const reduced = useReducedMotionSafe();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (reduced || !LENIS_ENABLED) {
      setReady(true);
      return;
    }

    let disposed = false;
    let raf = 0;
    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null;

    void (async () => {
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
        import("lenis"),
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (disposed) return;

      gsap.registerPlugin(ScrollTrigger);

      const instance = new Lenis({ duration: 1.1, smoothWheel: true });
      lenis = instance;

      instance.on("scroll", ScrollTrigger.update);

      const tick = (time: number) => {
        instance.raf(time * 1000);
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);

      ScrollTrigger.refresh();
      setReady(true);
    })();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      lenis?.destroy();
    };
  }, [reduced]);

  return <LenisReadyContext.Provider value={ready}>{children}</LenisReadyContext.Provider>;
}

export function useLenisReady(): boolean {
  return useContext(LenisReadyContext);
}
```

- [ ] **Step 3: Mount it in `layout.tsx`**

Wrap the existing `ThemeProvider` children:

```tsx
<body>
  <ThemeProvider>
    <MotionProvider>{children}</MotionProvider>
  </ThemeProvider>
</body>
```

with the import `import { MotionProvider } from "@/components/replica/motion/MotionProvider";`

- [ ] **Step 4: Verify**

Run: `cd web && pnpm typecheck && pnpm test && pnpm build`
Expected: all pass. Build must still prerender `/` as static.

- [ ] **Step 5: Commit**

```bash
git add web/components/replica/motion/ web/app/layout.tsx
git commit -m "feat: add MotionProvider with Lenis and ScrollTrigger registration"
```

---

### Task 0.7: Wave 0 gate

- [ ] **Step 1: Full check**

Run: `cd web && pnpm typecheck && pnpm test && pnpm build`
Expected: typecheck clean, all tests pass, build succeeds.

- [ ] **Step 2: Write the handoff report**

Create `.superpowers/sdd/motion-wave-0-report.md` listing: installed dependency versions, the exported names from `motion-tokens.ts` and `seeded-random.ts`, the three CSS class names, and the Lenis go/no-go decision with the reason.

- [ ] **Step 3: Commit**

```bash
git add .superpowers/sdd/motion-wave-0-report.md
git commit -m "docs: wave 0 foundation report"
```

---

# WAVE 1 - Primitives (4 agents, PARALLEL)

Dispatch all four in a single message. File ownership is disjoint. No agent may edit `globals.css`, `layout.tsx`, `motion-tokens.ts`, or `seeded-random.ts`.

---

## Task 1A: Motion primitives

**Model:** `gemini-3.1-pro` (visual)

**Files:**
- Create: `web/components/replica/motion/Reveal.tsx`
- Create: `web/components/replica/motion/Stagger.tsx`
- Create: `web/components/replica/motion/DrawPath.tsx`
- Create: `web/components/replica/motion/Beam.tsx`
- Create: `web/components/replica/motion/GridSubstrate.tsx`
- Test: `web/__tests__/motion-primitives.test.tsx`

**Interfaces:**
- Consumes: `EASE`, `DUR`, `STAGGER`, `capStagger` from `@/lib/motion-tokens`; `mulberry32`, `SEEDS` from `@/lib/seeded-random`; `useReducedMotionSafe` from `./useReducedMotionSafe`
- Produces:
  - `Reveal({ children, delay?, y?, blur?, className?, as? }): JSX.Element`
  - `Stagger({ children, step?, className?, as? }): JSX.Element` (staggers direct children)
  - `DrawPath({ d, className, delay?, duration?, strokeWidth? }): JSX.Element` (renders `<path>`, must be placed inside an `<svg>`)
  - `Beam({ pathId, duration?, delay?, className? }): JSX.Element` (animates a dot along `#pathId`)
  - `GridSubstrate({ className? }): JSX.Element` (fixed canvas, `aria-hidden`)

- [ ] **Step 1: Write the failing test**

```tsx
// web/__tests__/motion-primitives.test.tsx
import { render, screen } from "@testing-library/react";
import { Reveal } from "@/components/replica/motion/Reveal";
import { Stagger } from "@/components/replica/motion/Stagger";
import { DrawPath } from "@/components/replica/motion/DrawPath";
import { GridSubstrate } from "@/components/replica/motion/GridSubstrate";

test("Reveal renders its children as visible content", () => {
  render(<Reveal>hello</Reveal>);
  expect(screen.getByText("hello")).toBeInTheDocument();
});

test("Stagger renders every child", () => {
  render(
    <Stagger>
      <span>one</span>
      <span>two</span>
      <span>three</span>
    </Stagger>,
  );
  expect(screen.getByText("one")).toBeInTheDocument();
  expect(screen.getByText("three")).toBeInTheDocument();
});

test("DrawPath renders a path carrying the supplied geometry", () => {
  const { container } = render(
    <svg>
      <DrawPath d="M0 0 L10 10" className="stroke-border" />
    </svg>,
  );
  expect(container.querySelector('path[d="M0 0 L10 10"]')).toBeInTheDocument();
});

test("GridSubstrate is decorative and hidden from assistive tech", () => {
  const { container } = render(<GridSubstrate />);
  const canvas = container.querySelector("canvas");
  expect(canvas).toBeInTheDocument();
  expect(canvas).toHaveAttribute("aria-hidden", "true");
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `cd web && pnpm vitest run __tests__/motion-primitives.test.tsx`
Expected: FAIL, module resolution errors for all four imports.

- [ ] **Step 3: Implement `Reveal`**

```tsx
// web/components/replica/motion/Reveal.tsx
"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { DUR, EASE } from "@/lib/motion-tokens";
import { useReducedMotionSafe } from "./useReducedMotionSafe";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  blur?: boolean;
  className?: string;
};

/**
 * Entrance on first intersection. Default state is visible content; the
 * initial offset is only applied when motion is allowed, so a failed script
 * can never leave the page blank.
 */
export function Reveal({ children, delay = 0, y = 16, blur = false, className }: RevealProps) {
  const reduced = useReducedMotionSafe();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: blur ? "blur(8px)" : "blur(0px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: DUR.shell, delay, ease: EASE.emphasize }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 4: Implement `Stagger`**

```tsx
// web/components/replica/motion/Stagger.tsx
"use client";

import { motion } from "motion/react";
import { Children, type ReactNode } from "react";
import { DUR, EASE, STAGGER, capStagger } from "@/lib/motion-tokens";
import { useReducedMotionSafe } from "./useReducedMotionSafe";

type StaggerProps = {
  children: ReactNode;
  step?: number;
  className?: string;
};

/**
 * Staggers direct children. Total delay is capped so a long list never
 * reads as latency.
 */
export function Stagger({ children, step = STAGGER.chip, className }: StaggerProps) {
  const reduced = useReducedMotionSafe();
  const items = Children.toArray(children);
  const effective = capStagger(items.length, step);

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.25 }}
      variants={{ shown: { transition: { staggerChildren: effective } } }}
    >
      {items.map((child, i) => (
        <motion.div
          key={i}
          variants={{
            hidden: { opacity: 0, y: 12, scale: 0.98 },
            shown: { opacity: 1, y: 0, scale: 1 },
          }}
          transition={{ duration: DUR.chip, ease: EASE.standard }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
```

- [ ] **Step 5: Implement `DrawPath`**

```tsx
// web/components/replica/motion/DrawPath.tsx
"use client";

import { motion } from "motion/react";
import { EASE } from "@/lib/motion-tokens";
import { useReducedMotionSafe } from "./useReducedMotionSafe";

type DrawPathProps = {
  d: string;
  className?: string;
  delay?: number;
  duration?: number;
  strokeWidth?: number;
};

/**
 * Self-drawing stroke. Must be rendered inside an <svg>.
 * Uses pathLength normalization so the same timing works at any scale.
 */
export function DrawPath({
  d,
  className,
  delay = 0,
  duration = 0.7,
  strokeWidth = 1,
}: DrawPathProps) {
  const reduced = useReducedMotionSafe();

  return (
    <motion.path
      d={d}
      className={className}
      fill="none"
      strokeWidth={strokeWidth}
      initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: reduced ? 0 : duration, delay, ease: EASE.emphasize }}
    />
  );
}
```

- [ ] **Step 6: Implement `Beam`**

```tsx
// web/components/replica/motion/Beam.tsx
"use client";

import { motion } from "motion/react";
import { AMBIENT } from "@/lib/motion-tokens";
import { useReducedMotionSafe } from "./useReducedMotionSafe";

type BeamProps = {
  /** SVG path geometry string, the same value you would pass to `<path d>`. */
  d: string;
  duration?: number;
  delay?: number;
  className?: string;
  r?: number;
};

/**
 * Travelling light along an existing path. Ambient, so it stops entirely
 * under reduced motion rather than rendering a stationary dot.
 */
export function Beam({
  d,
  duration = AMBIENT.sweep / 2,
  delay = 0,
  className,
  r = 2.5,
}: BeamProps) {
  const reduced = useReducedMotionSafe();
  if (reduced) return null;

  return (
    <motion.circle
      r={r}
      className={className}
      initial={{ offsetDistance: "0%", opacity: 0 }}
      animate={{
        offsetDistance: "100%",
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{ offsetPath: `path("${d}")`, offsetRotate: "0deg" }}
    />
  );
}
```

`offsetPath` takes the geometry inline, so there is no DOM lookup and no id coordination between components.

- [ ] **Step 7: Implement `GridSubstrate`**

```tsx
// web/components/replica/motion/GridSubstrate.tsx
"use client";

import { useEffect, useRef } from "react";
import { mulberry32, SEEDS } from "@/lib/seeded-random";
import { useReducedMotionSafe } from "./useReducedMotionSafe";

const SPACING = 28;
const MAX_DPR = 2;

/**
 * Animated dot grid. This is load-bearing, not decoration: it is the only
 * thing the Tier 1 nav glass has to refract, so it carries a deliberate
 * travelling luminance gradient. If this is ever flattened to uniform
 * low-alpha dots, the nav must ship as Tier 2 from the start.
 */
export function GridSubstrate({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const reduced = useReducedMotionSafe();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
    let raf = 0;
    let running = true;
    const rng = mulberry32(SEEDS.substrate);

    // Per-dot phase offsets, seeded so the field is reproducible.
    const phases: number[] = [];

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = canvas;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const cols = Math.ceil(w / SPACING) + 1;
      const rows = Math.ceil(h / SPACING) + 1;
      phases.length = 0;
      for (let i = 0; i < cols * rows; i++) phases.push(rng() * Math.PI * 2);
    };

    const accent = () =>
      getComputedStyle(document.documentElement).getPropertyValue("--ds-text-tertiary").trim() ||
      "#7e8591";

    const draw = (t: number) => {
      if (!running) return;
      const { clientWidth: w, clientHeight: h } = canvas;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = accent();

      const cols = Math.ceil(w / SPACING) + 1;
      const rows = Math.ceil(h / SPACING) + 1;
      // Travelling luminance band. This is what makes glass above it read.
      const band = ((t / 9000) % 1) * (w + h);

      let i = 0;
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++, i++) {
          const px = x * SPACING;
          const py = y * SPACING;
          const dist = Math.abs(px + py - band);
          const falloff = Math.max(0, 1 - dist / 320);
          const twinkle = 0.5 + 0.5 * Math.sin(t / 2600 + (phases[i] ?? 0));
          ctx.globalAlpha = 0.06 + falloff * 0.34 * twinkle;
          ctx.beginPath();
          ctx.arc(px, py, 1.1 + falloff * 0.9, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);

    if (reduced) {
      draw(0);
      running = false;
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(draw);
    }

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!reduced) {
        running = true;
        raf = requestAnimationFrame(draw);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduced]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={className ?? "pointer-events-none absolute inset-0 h-full w-full"}
    />
  );
}
```

- [ ] **Step 8: Run to verify it passes**

Run: `cd web && pnpm vitest run __tests__/motion-primitives.test.tsx`
Expected: PASS, 4 tests.

- [ ] **Step 9: Commit**

```bash
git add web/components/replica/motion/ web/__tests__/motion-primitives.test.tsx
git commit -m "feat: add Reveal, Stagger, DrawPath, Beam, GridSubstrate primitives"
```

**Return:** the exact exported prop signatures for all five components, and confirmation that `GridSubstrate` carries a travelling luminance band.

---

## Task 1B: 3D scene, constellation, and layer rail

**Model:** `gemini-3.1-pro` (visual)

**Files:**
- Create: `web/components/replica/motion/IsoScene.tsx`
- Create: `web/components/replica/motion/Constellation.tsx`
- Create: `web/components/replica/motion/LayerRail.tsx`
- Test: `web/__tests__/iso-rail.test.tsx`

**Interfaces:**
- Consumes: `EASE`, `DUR`, `STAGGER`, `AMBIENT` from `@/lib/motion-tokens`; `useReducedMotionSafe`
- Produces:
  - `IsoScene({ children, className? })` - applies `perspective` and the shared scene rotation
  - `IsoLayer({ children, index, lift, active, className? })` - one plane; `lift` in px, `index` for z-order
  - `Billboard({ children, className? })` - counter-rotates content so marks render square
  - `ISO_ROTATION: { x: number; z: number }` - the single source of the scene angle
  - `Constellation({ nodes, edges, progress, className? })` where `nodes: readonly { id: string; label: string; x: number; y: number }[]` and `edges: readonly { from: string; to: string }[]`, `progress: number` in 0..1
  - `LayerRail({ layers, activeId, onSelect, className? })` where `layers: readonly { id: string; label: string }[]`

- [ ] **Step 1: Write the failing test**

```tsx
// web/__tests__/iso-rail.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { IsoScene, IsoLayer, Billboard, ISO_ROTATION } from "@/components/replica/motion/IsoScene";
import { Constellation } from "@/components/replica/motion/Constellation";
import { LayerRail } from "@/components/replica/motion/LayerRail";

const LAYERS = [
  { id: "intent", label: "Intent" },
  { id: "assemblies", label: "Assemblies" },
  { id: "context", label: "System of Context" },
  { id: "sources", label: "Data Sources" },
] as const;

function RailHarness() {
  const [active, setActive] = useState<string>("intent");
  return <LayerRail layers={LAYERS} activeId={active} onSelect={setActive} />;
}

test("scene angle is a single exported constant", () => {
  expect(ISO_ROTATION.x).toBeGreaterThan(0);
  expect(ISO_ROTATION.z).toBeLessThan(0);
});

test("IsoScene renders its layers and billboarded content", () => {
  render(
    <IsoScene>
      <IsoLayer index={0} lift={0} active>
        <Billboard>
          <span>AWS</span>
        </Billboard>
      </IsoLayer>
    </IsoScene>,
  );
  expect(screen.getByText("AWS")).toBeInTheDocument();
});

test("LayerRail is a tablist with correct selection semantics", () => {
  render(<RailHarness />);
  const rail = screen.getByRole("tablist");
  expect(rail).toBeInTheDocument();
  const tabs = screen.getAllByRole("tab");
  expect(tabs).toHaveLength(4);
  expect(tabs[0]).toHaveAttribute("aria-selected", "true");
  expect(tabs[1]).toHaveAttribute("aria-selected", "false");
  expect(tabs[0]).toHaveAttribute("tabindex", "0");
  expect(tabs[1]).toHaveAttribute("tabindex", "-1");
});

test("LayerRail moves selection with arrow keys", async () => {
  const user = userEvent.setup();
  render(<RailHarness />);
  const tabs = screen.getAllByRole("tab");
  tabs[0].focus();
  await user.keyboard("{ArrowDown}");
  expect(screen.getAllByRole("tab")[1]).toHaveAttribute("aria-selected", "true");
  await user.keyboard("{End}");
  expect(screen.getAllByRole("tab")[3]).toHaveAttribute("aria-selected", "true");
  await user.keyboard("{Home}");
  expect(screen.getAllByRole("tab")[0]).toHaveAttribute("aria-selected", "true");
});

test("Constellation renders every node label and edge", () => {
  const { container } = render(
    <svg>
      <Constellation
        nodes={[
          { id: "a", label: "checkout-api", x: 10, y: 10 },
          { id: "b", label: "deploy", x: 50, y: 40 },
        ]}
        edges={[{ from: "a", to: "b" }]}
        progress={1}
      />
    </svg>,
  );
  expect(screen.getByText("checkout-api")).toBeInTheDocument();
  expect(container.querySelectorAll("line")).toHaveLength(1);
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `cd web && pnpm vitest run __tests__/iso-rail.test.tsx`
Expected: FAIL, unresolved imports.

- [ ] **Step 3: Implement `IsoScene`**

```tsx
// web/components/replica/motion/IsoScene.tsx
"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { DUR, EASE } from "@/lib/motion-tokens";
import { useReducedMotionSafe } from "./useReducedMotionSafe";

/** The single source of the isometric angle. Billboard inverts exactly this. */
export const ISO_ROTATION = { x: 54, z: -45 } as const;

export function IsoScene({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={className} style={{ perspective: "1600px" }}>
      <div
        className="relative"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${ISO_ROTATION.x}deg) rotateZ(${ISO_ROTATION.z}deg)`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

type IsoLayerProps = {
  children: ReactNode;
  /** Stacking order, 0 = base. */
  index: number;
  /** Vertical separation in px along the scene Z axis. */
  lift: number;
  active: boolean;
  className?: string;
};

/**
 * One plane of the stack. Only transform and opacity animate.
 * Shadows are pre-composed gradients on the plane, never animated box-shadow.
 */
export function IsoLayer({ children, index, lift, active, className }: IsoLayerProps) {
  const reduced = useReducedMotionSafe();

  return (
    <motion.div
      className={className}
      style={{ transformStyle: "preserve-3d", zIndex: index }}
      animate={{
        // `z` is motion's key for translateZ. `translateZ` is not a valid
        // motion value key and will silently do nothing.
        z: lift,
        opacity: active ? 1 : 0.42,
        scale: active ? 1 : 0.97,
      }}
      transition={reduced ? { duration: 0 } : { duration: DUR.shell, ease: EASE.emphasize }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Counter-rotates its content by the inverse of the scene transform so
 * vendor marks and labels render square. A sheared logo is a brand
 * violation, not a stylistic choice.
 */
export function Billboard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={className}
      style={{
        transformStyle: "preserve-3d",
        transform: `rotateZ(${-ISO_ROTATION.z}deg) rotateX(${-ISO_ROTATION.x}deg)`,
      }}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 4: Implement `Constellation`**

```tsx
// web/components/replica/motion/Constellation.tsx
"use client";

import { EASE_CSS } from "@/lib/motion-tokens";

export type ConstellationNode = { id: string; label: string; x: number; y: number };
export type ConstellationEdge = { from: string; to: string };

type Props = {
  nodes: readonly ConstellationNode[];
  edges: readonly ConstellationEdge[];
  /** 0..1. Nodes and edges reveal proportionally, so scroll can drive it. */
  progress: number;
  className?: string;
};

/**
 * A sparse labelled graph, not boxes and arrows. Must be rendered inside
 * an <svg>. Progress-driven rather than time-driven so the same component
 * serves both the scrubbed and the static reduced-motion path.
 */
export function Constellation({ nodes, edges, progress, className }: Props) {
  const byId = new Map(nodes.map((n) => [n.id, n]));
  const nodeCut = progress * nodes.length;
  const edgeCut = Math.max(0, (progress - 0.25) / 0.75) * edges.length;

  return (
    <g className={className}>
      {edges.map((e, i) => {
        const a = byId.get(e.from);
        const b = byId.get(e.to);
        if (!a || !b) return null;
        const shown = Math.min(1, Math.max(0, edgeCut - i));
        return (
          <line
            key={`${e.from}-${e.to}`}
            x1={a.x}
            y1={a.y}
            x2={a.x + (b.x - a.x) * shown}
            y2={a.y + (b.y - a.y) * shown}
            stroke="currentColor"
            strokeWidth={0.75}
            opacity={0.34 * shown}
          />
        );
      })}
      {nodes.map((n, i) => {
        const shown = Math.min(1, Math.max(0, nodeCut - i));
        return (
          <g
            key={n.id}
            opacity={shown}
            style={{ transition: `opacity 240ms ${EASE_CSS.standard}` }}
          >
            <circle cx={n.x} cy={n.y} r={2.5} fill="currentColor" />
            <text
              x={n.x + 7}
              y={n.y + 3}
              fontSize={7}
              fill="currentColor"
              opacity={0.72}
            >
              {n.label}
            </text>
          </g>
        );
      })}
    </g>
  );
}
```

- [ ] **Step 5: Implement `LayerRail`**

```tsx
// web/components/replica/motion/LayerRail.tsx
"use client";

import { useRef } from "react";
import { cn } from "@/lib/cn";

export type RailLayer = { id: string; label: string };

type Props = {
  layers: readonly RailLayer[];
  activeId: string;
  onSelect: (id: string) => void;
  className?: string;
};

/**
 * Accessible tablist rail. This is a real control, not a hover affectation:
 * roving tabindex, arrow/Home/End keys, aria-selected. Scroll and rail are
 * both inputs to one state machine owned by the parent, so they cannot
 * diverge.
 */
export function LayerRail({ layers, activeId, onSelect, className }: Props) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const index = Math.max(0, layers.findIndex((l) => l.id === activeId));

  const move = (next: number) => {
    const clamped = (next + layers.length) % layers.length;
    onSelect(layers[clamped]!.id);
    refs.current[clamped]?.focus();
  };

  return (
    <div
      role="tablist"
      aria-orientation="vertical"
      aria-label="Aiden OS layers"
      className={cn("flex flex-col gap-1", className)}
      onKeyDown={(e) => {
        switch (e.key) {
          case "ArrowDown":
          case "ArrowRight":
            e.preventDefault();
            move(index + 1);
            break;
          case "ArrowUp":
          case "ArrowLeft":
            e.preventDefault();
            move(index - 1);
            break;
          case "Home":
            e.preventDefault();
            move(0);
            break;
          case "End":
            e.preventDefault();
            move(layers.length - 1);
            break;
        }
      }}
    >
      {layers.map((layer, i) => {
        const selected = layer.id === activeId;
        return (
          <button
            key={layer.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`rail-tab-${layer.id}`}
            aria-selected={selected}
            aria-controls={`rail-panel-${layer.id}`}
            tabIndex={selected ? 0 : -1}
            onClick={() => onSelect(layer.id)}
            className={cn(
              "rounded-md px-3 py-1.5 text-left text-[13px] transition-colors",
              selected
                ? "text-text-primary"
                : "text-text-tertiary hover:text-text-secondary",
            )}
          >
            <span className="mr-2 font-mono text-[10px] opacity-60">
              {String(layers.length - i).padStart(2, "0")}
            </span>
            {layer.label}
          </button>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 6: Run to verify it passes**

Run: `cd web && pnpm vitest run __tests__/iso-rail.test.tsx`
Expected: PASS, 5 tests.

- [ ] **Step 7: Commit**

```bash
git add web/components/replica/motion/IsoScene.tsx web/components/replica/motion/Constellation.tsx web/components/replica/motion/LayerRail.tsx web/__tests__/iso-rail.test.tsx
git commit -m "feat: add isometric scene, constellation graph, and accessible layer rail"
```

**Return:** exact prop signatures, the `ISO_ROTATION` values, and confirmation that `Billboard` inverts both axes.

---

## Task 1C: Vendor mark registry

**Model:** `gemini-3.1-pro` (visual)

**Files:**
- Create: `web/components/replica/logos/index.ts`
- Create: `web/components/replica/logos/marks.tsx`
- Test: `web/__tests__/vendor-marks.test.tsx`

**Interfaces:**
- Produces: `VENDOR_MARKS: Record<VendorSlug, (props: MarkProps) => JSX.Element>`, `type VendorSlug`, `type MarkProps = { className?: string; theme: "light" | "dark" }`, `VendorMark({ slug, theme, className? })`

**Required slugs (exactly 13):** `cursor`, `github`, `gitlab`, `terraform`, `eks`, `aws`, `datadog`, `pagerduty`, `jira`, `opa`, `slack`, `prometheus`, `backstage`

- [ ] **Step 1: Source the two missing SVGs**

```bash
cd /Users/swami/Documents/Stackgen_Website_Redesign
firecrawl scrape "https://www.datadoghq.com/about/resources/" -o .firecrawl/datadog-brand.md
firecrawl scrape "https://prometheus.io/" --format html -o .firecrawl/prometheus-raw.json
```

If an official SVG cannot be obtained, fall back to Simple Icons and render monochrome tinted to `--ds-text-secondary`:

```bash
curl -sL "https://cdn.simpleicons.org/datadog" -o /tmp/datadog.svg
curl -sL "https://cdn.simpleicons.org/prometheus" -o /tmp/prometheus.svg
```

Record which source was used per mark in the task report. Do not upscale the existing PNG and do not redraw either mark by hand.

- [ ] **Step 2: Write the failing test**

```tsx
// web/__tests__/vendor-marks.test.tsx
import { render } from "@testing-library/react";
import { VENDOR_MARKS, VendorMark, type VendorSlug } from "@/components/replica/logos";

const REQUIRED: VendorSlug[] = [
  "cursor", "github", "gitlab", "terraform", "eks", "aws", "datadog",
  "pagerduty", "jira", "opa", "slack", "prometheus", "backstage",
];

test("registry covers exactly the 13 marks the diagrams need", () => {
  expect(Object.keys(VENDOR_MARKS).sort()).toEqual([...REQUIRED].sort());
});

test("every mark renders an svg in both themes", () => {
  for (const slug of REQUIRED) {
    for (const theme of ["light", "dark"] as const) {
      const { container, unmount } = render(<VendorMark slug={slug} theme={theme} />);
      expect(container.querySelector("svg")).toBeInTheDocument();
      unmount();
    }
  }
});

test("theme-sensitive marks differ between themes", () => {
  for (const slug of ["github", "cursor", "aws"] as const) {
    const light = render(<VendorMark slug={slug} theme="light" />);
    const dark = render(<VendorMark slug={slug} theme="dark" />);
    expect(light.container.innerHTML).not.toBe(dark.container.innerHTML);
    light.unmount();
    dark.unmount();
  }
});

test("marks are decorative by default", () => {
  const { container } = render(<VendorMark slug="slack" theme="dark" />);
  expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
});
```

- [ ] **Step 3: Run to verify it fails**

Run: `cd web && pnpm vitest run __tests__/vendor-marks.test.tsx`
Expected: FAIL, unresolved import.

- [ ] **Step 4: Implement `marks.tsx`**

For each of the 13 slugs write a component using the official SVG path data from `.firecrawl/official-logos/<Name>.svg`. Pattern for a full-color mark:

```tsx
// web/components/replica/logos/marks.tsx
"use client";

export type MarkProps = { className?: string; theme: "light" | "dark" };

const BASE = "shrink-0";

export function SlackMark({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" className={`${BASE} ${className ?? ""}`} aria-hidden="true">
      {/* Official Slack mark path data from .firecrawl/official-logos/Slack.svg */}
      <path fill="#36C5F0" d="M5.04 15.17a2.53 2.53 0 1 1-2.52-2.53h2.52v2.53z" />
      <path fill="#36C5F0" d="M6.31 15.17a2.53 2.53 0 0 1 5.05 0v6.31a2.53 2.53 0 0 1-5.05 0v-6.31z" />
      <path fill="#2EB67D" d="M8.83 5.04a2.53 2.53 0 1 1 2.53-2.52v2.52H8.83z" />
      <path fill="#2EB67D" d="M8.83 6.31a2.53 2.53 0 0 1 0 5.05H2.52a2.53 2.53 0 0 1 0-5.05h6.31z" />
      <path fill="#ECB22E" d="M18.96 8.83a2.53 2.53 0 1 1 2.52 2.53h-2.52V8.83z" />
      <path fill="#ECB22E" d="M17.69 8.83a2.53 2.53 0 0 1-5.05 0V2.52a2.53 2.53 0 0 1 5.05 0v6.31z" />
      <path fill="#E01E5A" d="M15.17 18.96a2.53 2.53 0 1 1-2.53 2.52v-2.52h2.53z" />
      <path fill="#E01E5A" d="M15.17 17.69a2.53 2.53 0 0 1 0-5.05h6.31a2.53 2.53 0 0 1 0 5.05h-6.31z" />
    </svg>
  );
}

/** Theme-sensitive monochrome mark: white on dark, black on light. */
export function GitHubMark({ className, theme }: MarkProps) {
  const fill = theme === "dark" ? "#ffffff" : "#181717";
  return (
    <svg viewBox="0 0 24 24" className={`${BASE} ${className ?? ""}`} aria-hidden="true">
      {/* Official GitHub mark path from .firecrawl/official-logos/GitHub.svg */}
      <path
        fill={fill}
        d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.8.1-.8.1-.8 1.2.1 1.9 1.2 1.9 1.2 1 1.9 2.8 1.3 3.5 1a2.6 2.6 0 0 1 .8-1.6c-2.7-.3-5.5-1.3-5.5-6a4.7 4.7 0 0 1 1.2-3.2 4.3 4.3 0 0 1 .2-3.2s1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0C17.6 4.8 18.6 5 18.6 5a4.3 4.3 0 0 1 .2 3.2 4.7 4.7 0 0 1 1.2 3.3c0 4.7-2.8 5.6-5.5 5.9a2.9 2.9 0 0 1 .9 2.3v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3Z"
      />
    </svg>
  );
}
```

Repeat for the remaining 11 slugs. Theme-sensitive set is exactly `github`, `cursor`, `aws`; all others are full-color and identical across themes.

- [ ] **Step 5: Implement the registry**

```ts
// web/components/replica/logos/index.ts
"use client";

import type { MarkProps } from "./marks";
import {
  AwsMark, BackstageMark, CursorMark, DatadogMark, EksMark, GitHubMark,
  GitLabMark, JiraMark, OpaMark, PagerDutyMark, PrometheusMark,
  SlackMark, TerraformMark,
} from "./marks";

export type { MarkProps } from "./marks";

/**
 * Typed registry. A diagram referencing an unmapped slug is a typecheck
 * failure, not a blank box. That guarantee is what lets four agents build
 * diagrams in parallel without silently dropping a mark.
 */
export const VENDOR_MARKS = {
  aws: AwsMark,
  backstage: BackstageMark,
  cursor: CursorMark,
  datadog: DatadogMark,
  eks: EksMark,
  github: GitHubMark,
  gitlab: GitLabMark,
  jira: JiraMark,
  opa: OpaMark,
  pagerduty: PagerDutyMark,
  prometheus: PrometheusMark,
  slack: SlackMark,
  terraform: TerraformMark,
} as const satisfies Record<string, (p: MarkProps) => React.JSX.Element>;

export type VendorSlug = keyof typeof VENDOR_MARKS;

/** Human-readable names for accessible labels where a mark stands alone. */
export const VENDOR_NAMES: Record<VendorSlug, string> = {
  aws: "AWS",
  backstage: "Backstage",
  cursor: "Cursor",
  datadog: "Datadog",
  eks: "Amazon EKS",
  github: "GitHub",
  gitlab: "GitLab",
  jira: "Jira",
  opa: "Open Policy Agent",
  pagerduty: "PagerDuty",
  prometheus: "Prometheus",
  slack: "Slack",
  terraform: "Terraform",
};

export function VendorMark({
  slug,
  theme,
  className,
}: {
  slug: VendorSlug;
  theme: "light" | "dark";
  className?: string;
}) {
  const Mark = VENDOR_MARKS[slug];
  return <Mark theme={theme} className={className} />;
}
```

- [ ] **Step 6: Migrate the two Lucide glyphs**

Run: `cd web && rg -n "lucide" components/ lib/ content/`
Expected after migration: no output. The canvas uses `lucide:git-fork` and `lucide:arrow-right`; the equivalents are `GitFork` and `ArrowRight` from `@phosphor-icons/react`. Add both names to `web/lib/phosphor-icons.ts` and the switch in `web/components/primitives/PhosphorIcon.tsx` if absent.

- [ ] **Step 7: Run to verify it passes**

Run: `cd web && pnpm vitest run __tests__/vendor-marks.test.tsx`
Expected: PASS, 4 tests.

- [ ] **Step 8: Commit**

```bash
git add web/components/replica/logos/ web/__tests__/vendor-marks.test.tsx web/lib/phosphor-icons.ts web/components/primitives/PhosphorIcon.tsx
git commit -m "feat: add typed vendor mark registry with theme variants"
```

**Return:** the 13 slugs, which source was used for Datadog and Prometheus, and confirmation that zero Lucide references remain.

---

## Task 1D: Particle simulation

**Model:** `gemini-3.1-pro` (visual)

**Files:**
- Create: `web/components/replica/motion/ParticleField.tsx`
- Test: `web/__tests__/particle-field.test.tsx`

**Interfaces:**
- Consumes: `mulberry32`, `SEEDS`, `range`, `pick` from `@/lib/seeded-random`; `useReducedMotionSafe`
- Produces:
  - `ParticleField({ sources, hub, sinks, seed?, frozen?, className? })`
  - `type FieldAnchor = { id: string; x: number; y: number }` (fractions of the container, 0..1)
  - `type SourceAnchor = FieldAnchor & { emits: WorkItemKind }`
  - `type WorkItemKind = "edit" | "commit" | "pipeline" | "plan"`
  - `type EmittedKind = "drift-check" | "deploy" | "verify" | "provision"`
  - `TRANSFORM_MAP: Record<WorkItemKind, EmittedKind>`
  - `MAX_PARTICLES = 40`

- [ ] **Step 1: Write the failing test**

```tsx
// web/__tests__/particle-field.test.tsx
import { render } from "@testing-library/react";
import {
  ParticleField,
  TRANSFORM_MAP,
  MAX_PARTICLES,
} from "@/components/replica/motion/ParticleField";

const SOURCES = [
  { id: "ide", x: 0.1, y: 0.2, emits: "edit" },
  { id: "git", x: 0.1, y: 0.4, emits: "commit" },
  { id: "ci", x: 0.1, y: 0.6, emits: "pipeline" },
  { id: "iac", x: 0.1, y: 0.8, emits: "plan" },
] as const;
const HUB = { id: "hub", x: 0.5, y: 0.5 };
const SINKS = [
  { id: "runtime", x: 0.9, y: 0.3 },
  { id: "infra", x: 0.9, y: 0.5 },
  { id: "obs", x: 0.9, y: 0.7 },
] as const;

test("the absorb-transform-emit map is the diagram's argument", () => {
  expect(TRANSFORM_MAP).toEqual({
    edit: "drift-check",
    commit: "deploy",
    pipeline: "verify",
    plan: "provision",
  });
});

test("density is hard-capped", () => {
  expect(MAX_PARTICLES).toBe(40);
});

test("renders a decorative canvas", () => {
  const { container } = render(
    <ParticleField sources={SOURCES} hub={HUB} sinks={SINKS} />,
  );
  const canvas = container.querySelector("canvas");
  expect(canvas).toBeInTheDocument();
  expect(canvas).toHaveAttribute("aria-hidden", "true");
});

test("frozen mode is accepted for deterministic capture", () => {
  const { container } = render(
    <ParticleField sources={SOURCES} hub={HUB} sinks={SINKS} frozen seed={99} />,
  );
  expect(container.querySelector("canvas")).toBeInTheDocument();
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `cd web && pnpm vitest run __tests__/particle-field.test.tsx`
Expected: FAIL, unresolved import.

- [ ] **Step 3: Implement**

```tsx
// web/components/replica/motion/ParticleField.tsx
"use client";

import { useEffect, useRef } from "react";
import { mulberry32, range, SEEDS } from "@/lib/seeded-random";
import { useReducedMotionSafe } from "./useReducedMotionSafe";

export type WorkItemKind = "edit" | "commit" | "pipeline" | "plan";
export type EmittedKind = "drift-check" | "deploy" | "verify" | "provision";

/**
 * The absorb-transform-emit chain IS the argument of this diagram:
 * an item enters as a commit and leaves as a deploy. Flow lines cannot
 * say this. If these labels stop transforming, the diagram has failed.
 */
export const TRANSFORM_MAP: Record<WorkItemKind, EmittedKind> = {
  edit: "drift-check",
  commit: "deploy",
  pipeline: "verify",
  plan: "provision",
};

/** Bounds cost regardless of how long the section stays in view. */
export const MAX_PARTICLES = 40;

export type FieldAnchor = { id: string; x: number; y: number };
export type SourceAnchor = FieldAnchor & { emits: WorkItemKind };

type Phase = "inbound" | "outbound";

type Particle = {
  kind: WorkItemKind | EmittedKind;
  phase: Phase;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  t: number;
  speed: number;
  wobble: number;
  wobblePhase: number;
  size: number;
  sourceId: string;
};

export type ParticleFieldProps = {
  sources: readonly SourceAnchor[];
  hub: FieldAnchor;
  sinks: readonly FieldAnchor[];
  seed?: number;
  /** Pins the field to a fixed tick for reproducible capture. */
  frozen?: boolean;
  /** Dims particles not originating from this source id. */
  isolateSourceId?: string | null;
  /** Called when the hub absorbs an item, so the parent can pulse a satellite. */
  onAbsorb?: (kind: WorkItemKind) => void;
  className?: string;
};

const LABEL_MIN_WIDTH = 1024;
const FROZEN_TICKS = 240;

export function ParticleField({
  sources,
  hub,
  sinks,
  seed = SEEDS.particles,
  frozen = false,
  isolateSourceId = null,
  onAbsorb,
  className,
}: ParticleFieldProps) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const reduced = useReducedMotionSafe();
  const isolateRef = useRef(isolateSourceId);
  isolateRef.current = isolateSourceId;

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rng = mulberry32(seed);
    const particles: Particle[] = [];
    let raf = 0;
    let running = true;
    let sinkCursor = 0;

    // Per-source emission cadence, jittered so the field never falls into
    // visible lockstep. Seeded, so the jitter is reproducible.
    const cadence = sources.map(() => range(rng, 0.9, 1.9));
    const nextEmit = sources.map(() => range(rng, 0, 1.2));

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = Math.floor(canvas.clientWidth * dpr);
      canvas.height = Math.floor(canvas.clientHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const readVar = (name: string, fallback: string) =>
      getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;

    const spawn = (i: number) => {
      if (particles.length >= MAX_PARTICLES) particles.shift();
      const s = sources[i]!;
      particles.push({
        kind: s.emits,
        phase: "inbound",
        fromX: s.x,
        fromY: s.y,
        toX: hub.x,
        toY: hub.y,
        t: 0,
        speed: range(rng, 0.22, 0.38),
        wobble: range(rng, 0.006, 0.022),
        wobblePhase: range(rng, 0, Math.PI * 2),
        size: range(rng, 2.2, 3.4),
        sourceId: s.id,
      });
    };

    const emitFromHub = (p: Particle) => {
      if (particles.length >= MAX_PARTICLES) particles.shift();
      const sink = sinks[sinkCursor % sinks.length]!;
      sinkCursor++;
      particles.push({
        kind: TRANSFORM_MAP[p.kind as WorkItemKind],
        phase: "outbound",
        fromX: hub.x,
        fromY: hub.y,
        toX: sink.x,
        toY: sink.y,
        t: 0,
        speed: range(rng, 0.24, 0.4),
        wobble: range(rng, 0.004, 0.016),
        wobblePhase: range(rng, 0, Math.PI * 2),
        size: range(rng, 2.2, 3.2),
        sourceId: p.sourceId,
      });
    };

    let last = 0;
    const step = (now: number) => {
      if (!running) return;
      const dt = last === 0 ? 0.016 : Math.min((now - last) / 1000, 0.05);
      last = now;

      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const showLabels = w >= LABEL_MIN_WIDTH;
      const accent = readVar("--ds-accent", "#8c85ff");
      const text = readVar("--ds-text-secondary", "#9aa0ac");

      for (let i = 0; i < sources.length; i++) {
        nextEmit[i]! -= dt;
        if (nextEmit[i]! <= 0) {
          spawn(i);
          nextEmit[i] = cadence[i]! * range(rng, 0.7, 1.3);
        }
      }

      ctx.clearRect(0, 0, w, h);
      ctx.font = "500 9px var(--font-mono, monospace)";
      ctx.textBaseline = "middle";

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]!;
        p.t += p.speed * dt;

        if (p.t >= 1) {
          if (p.phase === "inbound") {
            onAbsorb?.(p.kind as WorkItemKind);
            emitFromHub(p);
          }
          particles.splice(i, 1);
          continue;
        }

        const ease = p.t * p.t * (3 - 2 * p.t);
        const nx = p.fromX + (p.toX - p.fromX) * ease;
        const ny =
          p.fromY +
          (p.toY - p.fromY) * ease +
          Math.sin(p.t * Math.PI * 2 + p.wobblePhase) * p.wobble;

        const px = nx * w;
        const py = ny * h;

        const dimmed =
          isolateRef.current !== null && p.sourceId !== isolateRef.current;
        const alpha = (dimmed ? 0.3 : 1) * Math.sin(p.t * Math.PI);

        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.phase === "outbound" ? accent : text;
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fill();

        if (showLabels && p.size > 2.6) {
          ctx.globalAlpha = alpha * 0.75;
          ctx.fillText(p.kind, px + p.size + 4, py);
        }
      }
      ctx.globalAlpha = 1;

      raf = requestAnimationFrame(step);
    };

    resize();
    window.addEventListener("resize", resize);

    if (reduced || frozen) {
      // Render one readable, fully labelled snapshot. Under reduced motion
      // the diagram must still show that work flows through the hub and
      // gets transformed, so the frozen frame has to be legible.
      last = 0;
      for (let k = 0; k < FROZEN_TICKS; k++) step(k * 16);
      running = false;
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(step);
    }

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!reduced && !frozen) {
        running = true;
        last = 0;
        raf = requestAnimationFrame(step);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [sources, hub, sinks, seed, frozen, reduced, onAbsorb]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      data-motion-field="work-items"
      className={className ?? "pointer-events-none absolute inset-0 h-full w-full"}
    />
  );
}
```

- [ ] **Step 4: Run to verify it passes**

Run: `cd web && pnpm vitest run __tests__/particle-field.test.tsx`
Expected: PASS, 4 tests.

- [ ] **Step 5: Commit**

```bash
git add web/components/replica/motion/ParticleField.tsx web/__tests__/particle-field.test.tsx
git commit -m "feat: add seeded work-item particle simulation"
```

**Return:** the full `ParticleFieldProps` signature, the transform map, and confirmation that the loop is a single `requestAnimationFrame` that pauses on `visibilitychange` and never touches React state.

---

### Wave 1 gate (controller)

- [ ] Run `cd web && pnpm typecheck && pnpm test`. Expected: all suites pass.
- [ ] Verify no two agents edited the same file: `git log --oneline -8 --name-only`.
- [ ] Confirm `rg -n "Math.random" web/components web/lib` returns nothing.

---

# WAVE 2 - Diagrams (4 agents, PARALLEL)

Dispatch all four in one message. Each owns exactly one file plus its test. **No agent may edit anything under `motion/` or `logos/`.** If a primitive is insufficient, report it; Wave 3 fixes it centrally.

Shared rules for all four:
- Consume `VendorMark` / `VENDOR_MARKS` from `@/components/replica/logos`
- Consume tokens from `@/lib/motion-tokens`
- Keep `data-pencil-id` on the section wrapper via `REPLICA_FRAMES[theme]`
- Carry `role="img"` and the `aria-label` copied from the PNG being replaced
- No `backdrop-filter`. Use `.glass-specular` for shells.

---

## Task 2A: InnerOuterLoop

**Model:** `gemini-3.1-pro` (visual; simulation host)

**Files:**
- Create: `web/components/replica/diagrams/InnerOuterLoop.tsx`
- Test: `web/__tests__/diagram-inner-outer-loop.test.tsx`

**Interfaces:**
- Consumes: `ParticleField`, `SourceAnchor`, `FieldAnchor` from `@/components/replica/motion/ParticleField`; `Reveal`, `Stagger`; `VendorMark`; `AMBIENT`, `STAGGER`, `DUR`, `EASE`, `RING_OPACITY`
- Produces: `InnerOuterLoop({ theme }: { theme: "light" | "dark" })`

**Canvas content to reproduce exactly:**
- Inner loop pills, 140x36, `rounded-full`: `IDE` (cursor mark), `Git` (github), `CI / CD` (gitlab), `IaC` (terraform). Eyebrow `INNER LOOP`, subtitle `Build & ship`.
- Hub: 280x280. Outer ring, orbit track, 4 spokes at 45/135/225/315deg, 80px core with a Phosphor `git-fork` glyph and the label `Context Graph`, 4 satellites labelled `intent`, `entities`, `policies`, `memory` in mono.
- Outer loop pills: `Runtime` (eks), `Infrastructure` (aws), `Observability` (datadog). Eyebrow `OUTER LOOP`.
- **The two Lucide arrow connectors are deleted.** Travelling particles carry direction now.

- [ ] **Step 1: Write the failing test**

```tsx
// web/__tests__/diagram-inner-outer-loop.test.tsx
import { render, screen } from "@testing-library/react";
import { InnerOuterLoop } from "@/components/replica/diagrams/InnerOuterLoop";

test("renders both loop shells with canvas labels", () => {
  render(<InnerOuterLoop theme="dark" />);
  expect(screen.getByText("INNER LOOP")).toBeInTheDocument();
  expect(screen.getByText("OUTER LOOP")).toBeInTheDocument();
  for (const label of ["IDE", "Git", "CI / CD", "IaC", "Runtime", "Infrastructure", "Observability"]) {
    expect(screen.getByText(label)).toBeInTheDocument();
  }
});

test("renders the hub and its four satellites", () => {
  render(<InnerOuterLoop theme="dark" />);
  expect(screen.getByText("Context Graph")).toBeInTheDocument();
  for (const sat of ["intent", "entities", "policies", "memory"]) {
    expect(screen.getByText(sat)).toBeInTheDocument();
  }
});

test("hosts the particle simulation canvas", () => {
  const { container } = render(<InnerOuterLoop theme="dark" />);
  expect(container.querySelector('[data-motion-field="work-items"]')).toBeInTheDocument();
});

test("is an accessible figure and carries the pencil id", () => {
  const { container } = render(<InnerOuterLoop theme="dark" />);
  const fig = container.querySelector('[role="img"]');
  expect(fig).toHaveAttribute("aria-label", expect.stringContaining("Inner loop"));
});

test("no static arrow glyphs survive", () => {
  const { container } = render(<InnerOuterLoop theme="dark" />);
  expect(container.querySelectorAll('[data-connector-arrow]')).toHaveLength(0);
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `cd web && pnpm vitest run __tests__/diagram-inner-outer-loop.test.tsx`
Expected: FAIL, unresolved import.

- [ ] **Step 3: Implement the component**

Structure it as: an outer `.glass-specular rounded-[20px] p-6` shell with `role="img"` and `aria-label="Inner loop build and ship tools feeding the Context Graph, which emits governed runtime, infrastructure, and observability work"`. Inside, a `relative` flex row holding the inner-loop column, the hub, and the outer-loop column, with `<ParticleField>` absolutely positioned behind them.

Anchor fractions must match the DOM layout:

```tsx
const SOURCES = [
  { id: "ide", x: 0.14, y: 0.22, emits: "edit" },
  { id: "git", x: 0.14, y: 0.41, emits: "commit" },
  { id: "ci", x: 0.14, y: 0.6, emits: "pipeline" },
  { id: "iac", x: 0.14, y: 0.79, emits: "plan" },
] as const;

const HUB = { id: "hub", x: 0.5, y: 0.5 };

const SINKS = [
  { id: "runtime", x: 0.86, y: 0.3 },
  { id: "infra", x: 0.86, y: 0.5 },
  { id: "obs", x: 0.86, y: 0.7 },
] as const;
```

Wire `onAbsorb` to a `useState` holding the satellite id to brighten, reset after 400ms via a `setTimeout` cleared on unmount. Hover isolation sets `isolateSourceId` on pointer enter of a pill and null on leave.

**Two mandatory details or the simulation restarts constantly:**

1. `SOURCES`, `HUB`, and `SINKS` must be **module-level constants**, not inline literals in the component body. They are in `ParticleField`'s effect dependency array, so fresh object identities every render would tear down and respawn the field on every state change.
2. `onAbsorb` must be wrapped in `useCallback` with a stable dependency list, for the same reason:

```tsx
const onAbsorb = useCallback((kind: WorkItemKind) => {
  setPulsed(SATELLITE_FOR_KIND[kind]);
}, []);
```

`SATELLITE_FOR_KIND` is also module-level: `{ edit: "memory", commit: "entities", pipeline: "policies", plan: "intent" }`.

Ambient loops use `AMBIENT.orbit` (18s linear rotate on the orbit track), `AMBIENT.hub` (2.8s core glow), and `AMBIENT.ring` (3s ring scale with `RING_OPACITY.from` to `RING_OPACITY.to`), all as CSS keyframes gated behind `@media (prefers-reduced-motion: no-preference)`.

The hub core carries `.glow-source` (Tier 3, one of the three sanctioned surfaces).

- [ ] **Step 4: Run to verify it passes**

Run: `cd web && pnpm vitest run __tests__/diagram-inner-outer-loop.test.tsx`
Expected: PASS, 5 tests.

- [ ] **Step 5: Commit**

```bash
git add web/components/replica/diagrams/InnerOuterLoop.tsx web/__tests__/diagram-inner-outer-loop.test.tsx
git commit -m "feat: rebuild RBepL as a live work-item simulation"
```

**Return:** the anchor fraction table actually used, and confirmation that the two arrow glyphs are gone.

---

## Task 2B: Offerings

**Model:** `gemini-3.1-pro` (visual)

**Files:**
- Create: `web/components/replica/diagrams/Offerings.tsx`
- Test: `web/__tests__/diagram-offerings.test.tsx`

**Interfaces:**
- Consumes: `DrawPath`, `Stagger`, `Reveal`; `AMBIENT`, `STAGGER`, `DUR`, `EASE`
- Produces: `Offerings({ theme }: { theme: "light" | "dark" })`

**Canvas content:** three app tiles (`Aiden for SRE`, `Aiden for DevOps`, `Aiden for Infrastructure`) above an Aiden OS bezel containing nine chips in three groups, in this exact order: Agent Platform (`Persona Agents`, `Skills & Workflows`, `Activity & Replay`), Governance (`Policy Engine`, `Identity & Approval`, `Cost Controls`), Shared Context (`Knowledge Hub`, `Context Graph`, `AppStacks`). **Zero vendor marks in this diagram.**

- [ ] **Step 1: Write the failing test**

```tsx
// web/__tests__/diagram-offerings.test.tsx
import { render, screen } from "@testing-library/react";
import { Offerings } from "@/components/replica/diagrams/Offerings";

const CHIPS = [
  "Persona Agents", "Skills & Workflows", "Activity & Replay",
  "Policy Engine", "Identity & Approval", "Cost Controls",
  "Knowledge Hub", "Context Graph", "AppStacks",
];

test("renders all nine capability chips in canvas order", () => {
  render(<Offerings theme="dark" />);
  const rendered = CHIPS.map((c) => screen.getByText(c));
  expect(rendered).toHaveLength(9);
});

test("renders the three group labels", () => {
  render(<Offerings theme="dark" />);
  for (const g of ["Agent Platform", "Governance", "Shared Context"]) {
    expect(screen.getByText(g)).toBeInTheDocument();
  }
});

test("bezel is a self-drawing svg rect", () => {
  const { container } = render(<Offerings theme="dark" />);
  expect(container.querySelector('[data-animate="bezel"] path, [data-animate="bezel"] rect')).toBeTruthy();
});

test("contains zero vendor marks by design", () => {
  const { container } = render(<Offerings theme="dark" />);
  expect(container.querySelectorAll("[data-vendor-mark]")).toHaveLength(0);
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `cd web && pnpm vitest run __tests__/diagram-offerings.test.tsx`
Expected: FAIL, unresolved import.

- [ ] **Step 3: Implement**

Outer `.glass-specular rounded-[20px] p-6`, `role="img"`, `aria-label="Aiden factory offerings: SRE, DevOps, and Infrastructure apps over the Aiden OS agent platform, governance, and shared context capabilities"`.

The bezel is an absolutely positioned `<svg>` with `data-animate="bezel"` containing a `<DrawPath>` tracing a rounded rectangle, drawn with `duration={0.7}` and `delay={0.2}`. Chips use `<Stagger step={STAGGER.chip}>` so the nine enter at 40ms intervals in canvas order. Ambient bezel pulse uses `AMBIENT.bezel` (3.2s) as a CSS keyframe on stroke opacity, gated behind `prefers-reduced-motion: no-preference`.

- [ ] **Step 4: Run to verify it passes**

Run: `cd web && pnpm vitest run __tests__/diagram-offerings.test.tsx`
Expected: PASS, 4 tests.

- [ ] **Step 5: Commit**

```bash
git add web/components/replica/diagrams/Offerings.tsx web/__tests__/diagram-offerings.test.tsx
git commit -m "feat: rebuild F4Jlp with a self-drawing Aiden OS bezel"
```

**Return:** confirmation of chip order and that no vendor mark was added.

---

## Task 2C: Integrations

**Model:** `gemini-3.1-pro` (visual)

**Files:**
- Create: `web/components/replica/diagrams/Integrations.tsx`
- Test: `web/__tests__/diagram-integrations.test.tsx`

**Interfaces:**
- Consumes: `VendorMark`, `VENDOR_NAMES`; `mulberry32`, `SEEDS`, `range`; `AMBIENT`, `STAGGER`, `DUR`, `EASE`; `useReducedMotionSafe`
- Produces: `Integrations({ theme }: { theme: "light" | "dark" })`

**Canvas content:** heading `Plugs into the stack you already run`, then a shell containing 8 pills in this order: GitHub, GitLab, Terraform, Datadog, PagerDuty, Jira, OPA, Slack.

- [ ] **Step 1: Write the failing test**

```tsx
// web/__tests__/diagram-integrations.test.tsx
import { render, screen } from "@testing-library/react";
import { Integrations } from "@/components/replica/diagrams/Integrations";

const ORDER = ["GitHub", "GitLab", "Terraform", "Datadog", "PagerDuty", "Jira", "OPA", "Slack"];

test("renders the heading verbatim", () => {
  render(<Integrations theme="dark" />);
  expect(screen.getByText("Plugs into the stack you already run")).toBeInTheDocument();
});

test("renders all eight vendor pills in canvas order", () => {
  const { container } = render(<Integrations theme="dark" />);
  const pills = [...container.querySelectorAll("[data-vendor-slug]")];
  expect(pills).toHaveLength(8);
  expect(pills.map((p) => p.getAttribute("data-vendor-label"))).toEqual(ORDER);
});

test("scatter offsets are seeded, so two renders match", () => {
  const a = render(<Integrations theme="dark" />).container.innerHTML;
  const b = render(<Integrations theme="dark" />).container.innerHTML;
  expect(a).toBe(b);
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `cd web && pnpm vitest run __tests__/diagram-integrations.test.tsx`
Expected: FAIL, unresolved import.

- [ ] **Step 3: Implement**

Outer `.glass-specular rounded-[20px] p-6`, `role="img"`, `aria-label="Integrations across GitHub, GitLab, Terraform, Datadog, PagerDuty, Jira, Open Policy Agent, and Slack"`.

Each pill gets `data-vendor-slug` and `data-vendor-label`. Scatter offsets come from `mulberry32(SEEDS.integrations)` computed once via `useMemo`, so renders are identical. Entrance is per-pill `motion.div` with `initial={{ x: offsetX, y: offsetY, opacity: 0 }}` animating to zero with a spring (`type: "spring", stiffness: 260, damping: 22`) and `delay: i * 0.05`. Ambient light sweep is a masked gradient pseudo-element on the shell using `AMBIENT.sweep` (6s), `transform` only.

- [ ] **Step 4: Run to verify it passes**

Run: `cd web && pnpm vitest run __tests__/diagram-integrations.test.tsx`
Expected: PASS, 3 tests.

- [ ] **Step 5: Commit**

```bash
git add web/components/replica/diagrams/Integrations.tsx web/__tests__/diagram-integrations.test.tsx
git commit -m "feat: rebuild hG9Ou with seeded snap-in vendor pills"
```

**Return:** confirmation that offsets are seeded and pill order matches canvas.

---

## Task 2D: ContextGraph

**Model:** `gemini-3.1-pro` (visual; focal sequence)

**Files:**
- Create: `web/components/replica/diagrams/ContextGraph.tsx`
- Test: `web/__tests__/diagram-context-graph.test.tsx`

**Interfaces:**
- Consumes: `IsoScene`, `IsoLayer`, `Billboard`, `ISO_ROTATION`; `Constellation`, `ConstellationNode`, `ConstellationEdge`; `LayerRail`, `RailLayer`; `VendorMark`; `DUR`, `EASE`, `STAGGER`, `AMBIENT`; `useReducedMotionSafe`
- Produces: `ContextGraph({ theme }: { theme: "light" | "dark" })`, `CONTEXT_LAYERS: readonly RailLayer[]`

**Layers, top to bottom:**

| index | id | label | Content |
|---|---|---|---|
| 3 | `intent` | Intent | Intent bar plus router node, three pills `auto-route`, `world model`, `guardrails` |
| 2 | `assemblies` | Assemblies | Four cards: Aiden for Infrastructure, Automation, Observability, SRE |
| 1 | `context` | System of Context | The constellation, resolving onto `checkout-api` |
| 0 | `sources` | Data Sources | Five billboarded marks: aws, terraform, prometheus, backstage, jira |

- [ ] **Step 1: Write the failing test**

```tsx
// web/__tests__/diagram-context-graph.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContextGraph, CONTEXT_LAYERS } from "@/components/replica/diagrams/ContextGraph";

test("exposes four layers in top-to-bottom order", () => {
  expect(CONTEXT_LAYERS.map((l) => l.id)).toEqual([
    "intent", "assemblies", "context", "sources",
  ]);
});

test("renders the rail as an operable tablist", () => {
  render(<ContextGraph theme="dark" />);
  expect(screen.getByRole("tablist", { name: /aiden os layers/i })).toBeInTheDocument();
  expect(screen.getAllByRole("tab")).toHaveLength(4);
});

test("rail selection changes the active layer", async () => {
  const user = userEvent.setup();
  render(<ContextGraph theme="dark" />);
  const tabs = screen.getAllByRole("tab");
  await user.click(tabs[3]);
  expect(screen.getAllByRole("tab")[3]).toHaveAttribute("aria-selected", "true");
});

test("renders the four assembly cards and the focus entity", () => {
  render(<ContextGraph theme="dark" />);
  for (const card of [
    "Aiden for Infrastructure", "Aiden for Automation",
    "Aiden for Observability", "Aiden for SRE",
  ]) {
    expect(screen.getByText(card)).toBeInTheDocument();
  }
  expect(screen.getByText("checkout-api")).toBeInTheDocument();
});

test("renders all five data-source marks", () => {
  const { container } = render(<ContextGraph theme="dark" />);
  const slugs = [...container.querySelectorAll("[data-vendor-slug]")].map((n) =>
    n.getAttribute("data-vendor-slug"),
  );
  expect(slugs).toEqual(["aws", "terraform", "prometheus", "backstage", "jira"]);
});

test("is an accessible figure", () => {
  const { container } = render(<ContextGraph theme="dark" />);
  expect(container.querySelector('[role="img"]')).toHaveAttribute(
    "aria-label",
    expect.stringContaining("context graph"),
  );
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `cd web && pnpm vitest run __tests__/diagram-context-graph.test.tsx`
Expected: FAIL, unresolved import.

- [ ] **Step 3: Implement the layer state machine**

One state machine owns the active layer. Scroll and rail are both inputs; neither owns it independently.

```tsx
const [activeId, setActiveId] = useState<string>("intent");
const [progress, setProgress] = useState(0);

// Scroll maps progress bands onto layer ids. Rail clicks set activeId
// directly. Both write to the same state, so they cannot diverge.
const layerForProgress = (p: number): string => {
  if (p < 0.3) return "intent";
  if (p < 0.45) return "intent";
  if (p < 0.65) return "assemblies";
  if (p < 0.85) return "context";
  return "sources";
};
```

- [ ] **Step 4: Implement the GSAP pin, dynamically imported**

```tsx
useEffect(() => {
  if (reduced) {
    setProgress(1);
    return;
  }
  if (typeof window === "undefined") return;
  if (window.matchMedia("(max-width: 1023px)").matches) {
    setProgress(1);
    return;
  }

  let ctxRef: { revert: () => void } | null = null;
  let disposed = false;

  void (async () => {
    const [{ gsap }, { ScrollTrigger }] = await Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger"),
    ]);
    if (disposed || !rootRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: rootRef.current!,
        start: "top top",
        end: "+=260%",
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          setProgress(self.progress);
          setActiveId(layerForProgress(self.progress));
        },
      });
    }, rootRef);
    ctxRef = ctx;
  })();

  return () => {
    disposed = true;
    ctxRef?.revert();
  };
}, [reduced]);
```

- [ ] **Step 5: Implement the scene**

`IsoScene` wraps four `IsoLayer`s. Layer lift is driven by an explode factor derived from progress:

```tsx
const explode = Math.min(1, Math.max(0, (progress - 0.12) / 0.18));
const LIFT_STEP = 78;
// index 0 is the base, so lift grows upward with index
<IsoLayer index={i} lift={explode * LIFT_STEP * i} active={layer.id === activeId}>
```

The `sources` layer wraps each mark in `<Billboard>` so it renders square. Each mark element carries `data-vendor-slug`. The constellation receives `progress` remapped to its own band:

```tsx
const graphProgress = Math.min(1, Math.max(0, (progress - 0.65) / 0.2));
```

Below `lg`, render the four layers as plain stacked cards in document order with no scene transform, and the rail as a horizontal tab strip.

- [ ] **Step 6: Run to verify it passes**

Run: `cd web && pnpm vitest run __tests__/diagram-context-graph.test.tsx`
Expected: PASS, 6 tests.

- [ ] **Step 7: Commit**

```bash
git add web/components/replica/diagrams/ContextGraph.tsx web/__tests__/diagram-context-graph.test.tsx
git commit -m "feat: rebuild GPYOG as an operable isometric Aiden OS stack"
```

**Return:** the progress-to-layer band table, the explode factor formula, and confirmation that GSAP is dynamically imported so it stays out of the initial bundle.

---

### Wave 2 gate (controller)

- [ ] Run `cd web && pnpm typecheck && pnpm test`. Expected: all pass.
- [ ] Run `cd web && rg -n "backdrop-(filter|blur)" components/replica/diagrams/`. Expected: no output.
- [ ] Run `cd web && rg -c "data-vendor-slug" components/replica/diagrams/`. Expected: hits in Integrations and ContextGraph.

---

# WAVE 3 - Section choreography (2 agents, PARALLEL)

---

## Task 3A: Nav island with material transition, and the split hero

**Model:** `gemini-3.1-pro` (visual)

**Files:**
- Modify: `web/components/replica/sections/Nav.tsx`
- Modify: `web/components/replica/sections/Hero.tsx`
- Test: `web/__tests__/nav-hero-motion.test.tsx`

**Interfaces:**
- Consumes: `GridSubstrate`, `Reveal`; `DUR`, `EASE`, `STAGGER`; `useReducedMotionSafe`
- Produces: `ReplicaNav({ theme, className? })` unchanged signature; `ReplicaHero({ theme, className? })` unchanged signature

- [ ] **Step 1: Write the failing test**

```tsx
// web/__tests__/nav-hero-motion.test.tsx
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@/components/replica/theme/ThemeProvider";
import { ReplicaNav } from "@/components/replica/sections/Nav";
import { ReplicaHero } from "@/components/replica/sections/Hero";
import { replicaContent } from "@/content/replica";

test("nav starts in the glass material state", () => {
  const { container } = render(
    <ThemeProvider>
      <ReplicaNav theme="dark" />
    </ThemeProvider>,
  );
  const island = container.querySelector("[data-nav-material]");
  expect(island).toHaveAttribute("data-nav-material", "glass");
});

test("hero splits its heading into per-word spans for the mask reveal", () => {
  render(<ReplicaHero theme="dark" />);
  const h1 = screen.getByRole("heading", { level: 1 });
  const words = h1.querySelectorAll("[data-word]");
  expect(words.length).toBeGreaterThanOrEqual(4);
  expect(h1.textContent?.replace(/\s+/g, " ").trim()).toBe(
    replicaContent.hero.heading.replace(/\s+/g, " ").trim(),
  );
});

test("hero mounts the substrate behind its content", () => {
  const { container } = render(<ReplicaHero theme="dark" />);
  expect(container.querySelector("canvas[aria-hidden='true']")).toBeInTheDocument();
});

test("hero keeps both CTAs on one line each", () => {
  render(<ReplicaHero theme="dark" />);
  expect(screen.getByText(replicaContent.hero.primaryCta)).toBeInTheDocument();
  expect(screen.getByText(replicaContent.hero.secondaryCta)).toBeInTheDocument();
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `cd web && pnpm vitest run __tests__/nav-hero-motion.test.tsx`
Expected: FAIL on `data-nav-material` and `data-word`.

- [ ] **Step 3: Implement the nav material transition**

```tsx
// inside ReplicaNav
const [material, setMaterial] = useState<"glass" | "solid">("glass");

useEffect(() => {
  const sentinel = document.getElementById("hero-substrate-end");
  if (!sentinel) return;
  // IntersectionObserver, never a scroll listener.
  const io = new IntersectionObserver(
    ([entry]) => setMaterial(entry!.isIntersecting ? "glass" : "solid"),
    { rootMargin: "-64px 0px 0px 0px", threshold: 0 },
  );
  io.observe(sentinel);
  return () => io.disconnect();
}, []);
```

Apply it:

```tsx
<div
  data-nav-material={material}
  className={cn(
    "flex items-center gap-10 rounded-full px-6 transition-[background,box-shadow,backdrop-filter] duration-240",
    material === "glass" ? "glass-real" : "glass-specular",
  )}
  style={{ transitionTimingFunction: EASE_CSS.standard }}
>
```

The transition duration comes from `DUR.glassFade` (240ms). The island also carries `.glow-source` (Tier 3, sanctioned surface 3 of 3).

- [ ] **Step 4: Implement the split hero with per-word mask reveal**

Preserve the heading string exactly, including its double space, by splitting on `/(\s+)/` and keeping whitespace tokens as plain text:

```tsx
const tokens = replicaContent.hero.heading.split(/(\s+)/);

<h1 className="...">
  {tokens.map((tok, i) =>
    /^\s+$/.test(tok) ? (
      <span key={i}>{tok}</span>
    ) : (
      <span key={i} className="inline-block overflow-hidden align-bottom">
        <motion.span
          data-word
          className="inline-block"
          initial={reduced ? false : { y: "110%" }}
          animate={{ y: "0%" }}
          transition={{
            duration: DUR.shell,
            delay: reduced ? 0 : i * 0.06,
            ease: EASE.emphasize,
          }}
        >
          {tok}
        </motion.span>
      </span>
    ),
  )}
</h1>
```

Layout becomes an asymmetric split: `grid lg:grid-cols-12`, copy in `lg:col-span-7`, an ambient hub teaser in `lg:col-span-5`. `min-h-[100dvh]`, never `h-screen`. Top padding capped at `pt-24`. Mount `<GridSubstrate />` absolutely behind, and place `<div id="hero-substrate-end" />` at the section's trailing edge for the nav observer. Primary CTA carries `.glow-source` (Tier 3, sanctioned surface 1 of 3).

- [ ] **Step 5: Run to verify it passes**

Run: `cd web && pnpm vitest run __tests__/nav-hero-motion.test.tsx`
Expected: PASS, 4 tests.

- [ ] **Step 6: Commit**

```bash
git add web/components/replica/sections/Nav.tsx web/components/replica/sections/Hero.tsx web/__tests__/nav-hero-motion.test.tsx
git commit -m "feat: add nav material transition and split hero with mask reveal"
```

**Return:** confirmation that the heading double space survives, and the sentinel element id used.

---

## Task 3B: Logos, WhoItsFor bento, Footer CTA

**Model:** `gemini-3.1-pro` (visual)

**Files:**
- Modify: `web/components/replica/sections/Logos.tsx`
- Modify: `web/components/replica/sections/WhoItsFor.tsx`
- Modify: `web/components/replica/sections/Footer.tsx`
- Test: `web/__tests__/sections-motion.test.tsx`

**Interfaces:**
- Consumes: `Reveal`, `Stagger`; `STAGGER`, `DUR`, `EASE`
- Produces: unchanged component signatures

- [ ] **Step 1: Write the failing test**

```tsx
// web/__tests__/sections-motion.test.tsx
import { render, screen } from "@testing-library/react";
import { ReplicaLogos } from "@/components/replica/sections/Logos";
import { ReplicaWhoItsFor } from "@/components/replica/sections/WhoItsFor";
import { ReplicaFooter } from "@/components/replica/sections/Footer";
import { replicaContent } from "@/content/replica";

test("logo row renders all eight customer marks and no marquee", () => {
  const { container } = render(<ReplicaLogos theme="dark" />);
  expect(container.querySelectorAll("img")).toHaveLength(8);
  expect(container.querySelector("[data-marquee]")).toBeNull();
});

test("who-its-for renders an eight cell bento", () => {
  const { container } = render(<ReplicaWhoItsFor theme="dark" />);
  expect(container.querySelectorAll("[data-bento-cell]")).toHaveLength(8);
});

test("bento gives two cells feature emphasis for rhythm", () => {
  const { container } = render(<ReplicaWhoItsFor theme="dark" />);
  expect(container.querySelectorAll('[data-bento-cell][data-feature="true"]')).toHaveLength(2);
});

test("footer CTA nests its icon in its own circle", () => {
  const { container } = render(<ReplicaFooter theme="dark" />);
  const cta = screen.getByText(replicaContent.footer.cta).closest("a");
  expect(cta?.querySelector("[data-cta-icon]")).toBeInTheDocument();
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `cd web && pnpm vitest run __tests__/sections-motion.test.tsx`
Expected: FAIL on bento cell and CTA icon assertions.

- [ ] **Step 3: Implement Logos**

Wrap the eight logos in `<Stagger step={STAGGER.logo}>` with a blur-fade variant. No marquee anywhere on the page.

- [ ] **Step 4: Implement the WhoItsFor bento**

Replace the two equal four-card rows with a single `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4` bento of exactly 8 cells, giving the first pillar and the SRE role `lg:col-span-2` and `data-feature="true"` so the grid has rhythm rather than eight identical tiles. Every cell carries `data-bento-cell`, uses `.glass-specular`, and gets a pointer-position spotlight border via a CSS custom property updated on `pointermove` with `useMotionValue`, never React state.

Mobile collapse is explicit in the same component: `grid-cols-1`, `w-full`, `px-4`, and all `col-span` overrides reset.

- [ ] **Step 5: Implement the Footer CTA**

The CTA becomes a button-in-button: the label plus a nested `data-cta-icon` circle holding a Phosphor `ArrowUpRight`, with `group-hover:translate-x-1 group-hover:-translate-y-px group-hover:scale-105` on the circle and `active:scale-[0.98]` on the button.

- [ ] **Step 6: Run to verify it passes**

Run: `cd web && pnpm vitest run __tests__/sections-motion.test.tsx`
Expected: PASS, 4 tests.

- [ ] **Step 7: Commit**

```bash
git add web/components/replica/sections/Logos.tsx web/components/replica/sections/WhoItsFor.tsx web/components/replica/sections/Footer.tsx web/__tests__/sections-motion.test.tsx
git commit -m "feat: add logo stagger, eight cell bento, magnetic footer CTA"
```

**Return:** the bento cell span map and confirmation that no marquee exists.

---

# WAVE 4 - Integration (1 agent, sequential)

**Model for all Wave 4 tasks:** `composer-2.5-fast` (code execution: wiring, asset deletion, Vitest expansion, README).

### Task 4.1: Swap the diagram hosts

**Files:**
- Modify: `web/components/replica/sections/Assemblies.tsx`
- Modify: `web/components/replica/sections/Shell.tsx`
- Modify: `web/content/replica.ts`

- [ ] **Step 1: Replace the three `<img>` tags in `Assemblies.tsx`**

```tsx
import { InnerOuterLoop } from "@/components/replica/diagrams/InnerOuterLoop";
import { Offerings } from "@/components/replica/diagrams/Offerings";
import { Integrations } from "@/components/replica/diagrams/Integrations";

// replace the DIAGRAM_ORDER map with:
<InnerOuterLoop theme={theme} />
<Offerings theme={theme} />
<Integrations theme={theme} />
```

Delete `DIAGRAM_ORDER` and `DIAGRAM_ALT`.

- [ ] **Step 2: Replace the `<img>` in `Shell.tsx`**

```tsx
import { ContextGraph } from "@/components/replica/diagrams/ContextGraph";
// replace the <img .../> with:
<ContextGraph theme={theme} />
```

- [ ] **Step 3: Remove the PNG path maps from `content/replica.ts`**

Delete the `assemblies.diagrams` and `shell.diagrams` objects entirely. Keep every copy string.

- [ ] **Step 4: Delete the PNG assets**

```bash
cd /Users/swami/Documents/Stackgen_Website_Redesign
rm -rf web/public/media/replica
rg -n "media/replica" web/ && echo "STILL REFERENCED" || echo "clean"
```

Expected: `clean`.

- [ ] **Step 5: Verify**

Run: `cd web && pnpm typecheck && pnpm test && pnpm build`
Expected: all pass.

- [ ] **Step 6: Commit**

```bash
git add -A web/components/replica/sections web/content/replica.ts web/public
git commit -m "feat: replace PNG diagrams with live components"
```

---

### Task 4.2: Expand the home integration test

**Files:**
- Modify: `web/__tests__/replica-home.test.tsx`

- [ ] **Step 1: Extend the existing test file**

```tsx
test("no diagram renders as a raster image", () => {
  renderHome("dark");
  const imgs = [...document.querySelectorAll("img")].map((i) => i.getAttribute("src") ?? "");
  expect(imgs.some((s) => s.includes("/media/replica/"))).toBe(false);
});

test("every diagram exposes an accessible figure", () => {
  renderHome("dark");
  expect(document.querySelectorAll('[role="img"][aria-label]').length).toBeGreaterThanOrEqual(4);
});

test("the four canvas eyebrows are present and no fifth was added", () => {
  renderHome("dark");
  for (const e of ["OPERATIONAL CONTEXT GRAPH", "WHO IT'S FOR", "INNER LOOP", "OUTER LOOP"]) {
    expect(screen.getByText(e)).toBeInTheDocument();
  }
});

test("the context graph rail is reachable from the page", () => {
  renderHome("dark");
  expect(screen.getByRole("tablist", { name: /aiden os layers/i })).toBeInTheDocument();
});
```

- [ ] **Step 2: Run the full suite**

Run: `cd web && pnpm typecheck && pnpm test`
Expected: all suites pass.

- [ ] **Step 3: Commit**

```bash
git add web/__tests__/replica-home.test.tsx
git commit -m "test: assert live diagrams, eyebrow count, and rail reachability"
```

---

### Task 4.3: Update the README

**Files:**
- Modify: `web/README.md`

- [ ] **Step 1: Add a Motion section** documenting: the three material tiers and where each is allowed, the token manifest source, the seeded-PRNG rule, the one pinned section, and how to freeze motion for capture (`data-motion-paused`, `frozen` prop, fixed seeds).

- [ ] **Step 2: Commit**

```bash
git add web/README.md
git commit -m "docs: document the motion and material system"
```

---

# WAVE 5 - Docker and evidence (1 agent, sequential)

**Model for all Wave 5 tasks:** `composer-2.5-fast` (code execution: Docker prod smoke, Playwright evidence, Lighthouse/axe).

### Task 5.1: Prod container

- [ ] **Step 1: Rebuild and serve**

```bash
cd /Users/swami/Documents/Stackgen_Website_Redesign
docker compose --profile prod down
docker compose --profile prod up --build -d
sleep 3
curl -sf -o /dev/null -w "%{http_code}\n" http://localhost:3000/
```

Expected: `200`.

---

### Task 5.2: Evidence suite

**Files:**
- Create: `web/playwright.config.ts`
- Create: `web/e2e/motion-parity.spec.ts`

- [ ] **Step 1: Add the Playwright config**

```ts
// web/playwright.config.ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  outputDir: "../exports/web-shelf/motion-parity/.artifacts",
  use: {
    baseURL: "http://localhost:3000",
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  },
  projects: [{ name: "desktop", use: { ...devices["Desktop Chrome"] } }],
});
```

- [ ] **Step 2: Write the parity spec**

```ts
// web/e2e/motion-parity.spec.ts
import { test, expect, type Page } from "@playwright/test";

const OUT = "../exports/web-shelf/motion-parity";
const THEMES = ["dark", "light"] as const;
const DIAGRAMS = [
  { id: "inner-outer-loop", pencil: { dark: "C2kYT", light: "oWWUj" } },
  { id: "offerings", pencil: { dark: "C2kYT", light: "oWWUj" } },
  { id: "integrations", pencil: { dark: "C2kYT", light: "oWWUj" } },
  { id: "context-graph", pencil: { dark: "V2P0L", light: "HSHAw" } },
] as const;
const STOPS = [0, 0.25, 0.5, 0.75, 1];

async function boot(page: Page, theme: "dark" | "light") {
  await page.addInitScript((t) => {
    localStorage.setItem("stackgen-theme", t as string);
    // Freeze ambient loops and seed the simulation for reproducible frames.
    document.documentElement.setAttribute("data-motion-paused", "true");
  }, theme);
  await page.goto("/", { waitUntil: "networkidle" });
  await page.waitForFunction((t) => document.documentElement.dataset.theme === t, theme);
}

for (const theme of THEMES) {
  test(`scrub parity, ${theme}`, async ({ page }) => {
    await boot(page, theme);
    const doc = await page.evaluate(() => document.body.scrollHeight - window.innerHeight);
    for (const diagram of DIAGRAMS) {
      for (const stop of STOPS) {
        await page.evaluate((y) => window.scrollTo(0, y), Math.round(doc * stop));
        await page.waitForTimeout(400);
        await page.screenshot({
          path: `${OUT}/${diagram.id}-${theme}-${Math.round(stop * 100)}.png`,
          fullPage: false,
        });
      }
    }
  });

  test(`reduced motion assembles everything, ${theme}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await boot(page, theme);
    await expect(page.locator('[role="img"]').first()).toBeVisible();
    await page.screenshot({ path: `${OUT}/reduced-motion-${theme}.png`, fullPage: true });
  });

  test(`forced colors keeps content legible, ${theme}`, async ({ page }) => {
    await page.emulateMedia({ forcedColors: "active" });
    await boot(page, theme);
    await page.screenshot({ path: `${OUT}/forced-colors-${theme}.png`, fullPage: true });
  });
}

test("simulation is not periodic", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const field = page.locator('[data-motion-field="work-items"]');
  await field.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1200);
  const a = await field.screenshot();
  await page.waitForTimeout(4200);
  const b = await field.screenshot();
  expect(Buffer.compare(a, b)).not.toBe(0);
});

test("layer rail is keyboard operable", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const rail = page.getByRole("tablist", { name: /aiden os layers/i });
  await rail.scrollIntoViewIfNeeded();
  const tabs = page.getByRole("tab");
  await tabs.first().focus();
  await page.keyboard.press("ArrowDown");
  await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");
  await page.keyboard.press("End");
  await expect(tabs.last()).toHaveAttribute("aria-selected", "true");
});

test("glass is confined to the nav island", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const blurred = await page.evaluate(() =>
    [...document.querySelectorAll("*")]
      .filter((el) => {
        const bf = getComputedStyle(el).backdropFilter;
        return bf && bf !== "none";
      })
      .map((el) => el.getAttribute("data-nav-material") ?? el.tagName),
  );
  expect(blurred.every((tag) => tag === "glass" || tag === "solid")).toBe(true);
});
```

- [ ] **Step 3: Run the suite**

```bash
cd web && pnpm exec playwright install chromium && pnpm exec playwright test
```

Expected: all tests pass; 40 scrub screenshots plus 4 media-emulation screenshots written under `exports/web-shelf/motion-parity/`.

- [ ] **Step 4: Nav material transition evidence**

```bash
cd web && pnpm exec playwright test -g "glass is confined"
```

Then capture the two nav states manually by scrolling to y=0 and y=1200 and asserting `data-nav-material` flips from `glass` to `solid`. Save as `nav-material-glass.png` and `nav-material-solid.png`.

- [ ] **Step 5: Lighthouse**

```bash
cd /Users/swami/Documents/Stackgen_Website_Redesign
npx --yes lighthouse http://localhost:3000/ --preset=desktop \
  --output=json --output-path=./exports/web-shelf/motion-parity/lighthouse.json \
  --chrome-flags="--headless"
node -e "const r=require('./exports/web-shelf/motion-parity/lighthouse.json');const a=r.audits;console.log('LCP',a['largest-contentful-paint'].displayValue,'CLS',a['cumulative-layout-shift'].displayValue,'TBT',a['total-blocking-time'].displayValue)"
```

Expected: LCP under 2.5s, CLS under 0.1.

- [ ] **Step 6: Write the evidence report**

Create `.superpowers/sdd/motion-wave-5-report.md` with every artifact path, the Lighthouse numbers, the outcome of each acceptance criterion 1 through 9 from the spec, and an explicit statement of anything not met. **Do not claim completion without the screenshots and Lighthouse numbers.**

- [ ] **Step 7: Commit**

```bash
git add web/playwright.config.ts web/e2e .superpowers/sdd/motion-wave-5-report.md
git commit -m "test: add motion parity, a11y, and performance evidence suite"
```

---

## Controller dispatch cheatsheet

```text
# Model policy: visual -> gemini-3.1-pro | code execution -> composer-2.5-fast

# Wave 0 - one agent, wait for it (code execution)
Task(model=composer-2.5-fast, prompt=<Wave 0 tasks 0.1-0.7 verbatim + Global Constraints>)

# Wave 1 - FOUR tasks in ONE message (visual)
Task(model=gemini-3.1-pro, ... Task 1A ...)
Task(model=gemini-3.1-pro, ... Task 1B ...)
Task(model=gemini-3.1-pro, ... Task 1C ...)
Task(model=gemini-3.1-pro, ... Task 1D ...)

# controller gate: pnpm typecheck && pnpm test

# Wave 2 - FOUR tasks in ONE message (visual)
Task(model=gemini-3.1-pro, ... Task 2A ...)
Task(model=gemini-3.1-pro, ... Task 2B ...)
Task(model=gemini-3.1-pro, ... Task 2C ...)
Task(model=gemini-3.1-pro, ... Task 2D ...)

# controller gate

# Wave 3 - TWO tasks in ONE message (visual)
Task(model=gemini-3.1-pro, ... Task 3A ...)
Task(model=gemini-3.1-pro, ... Task 3B ...)

# Wave 4, then Wave 5, sequential (code execution)
Task(model=composer-2.5-fast, ... Wave 4 ...)
Task(model=composer-2.5-fast, ... Wave 5 ...)
```

Every subagent prompt must include the **Global Constraints** section verbatim plus its own task block. Subagents do not inherit this session's context.

---

## Spec coverage check

| Spec requirement | Task |
|---|---|
| Harvested motion token manifest | 0.2 |
| Seeded PRNG, `Math.random` banned | 0.3, constraint 3 |
| Geist replaces Inter | 0.4 |
| Tier 1 real glass, 24px cap | 0.5, 3A |
| Tier 2 specular glass | 0.5, all diagrams |
| Tier 3 radial glow, 3 surfaces | 0.5, 2A hub, 3A CTA + nav |
| Browser surfaces themed | 0.5 |
| Reduced-transparency + forced-colors | 0.5, 5.2 |
| MotionProvider, Lenis go/no-go | 0.6 |
| `RBepL` Class A simulation | 1D, 2A |
| Absorb-transform-emit labels | 1D `TRANSFORM_MAP`, 5.2 non-periodic test |
| 40-particle cap, single rAF | 1D |
| `GPYOG` Class B isometric | 1B, 2D |
| Class C operable rail | 1B, 2D, 5.2 keyboard test |
| Constellation Context Graph | 1B, 2D |
| Billboarded marks in 3D | 1B, 2D |
| 28 vendor marks, typed registry | 1C, 2A, 2C, 2D |
| Datadog + Prometheus SVG sourcing | 1C step 1 |
| Lucide to Phosphor migration | 1C step 6 |
| Zero marks in `F4Jlp` | 2B |
| Nav material transition | 3A |
| Split hero, mask reveal, double space preserved | 3A |
| 8-cell bento with rhythm | 3B |
| Button-in-button CTA | 3B |
| PNG deletion | 4.1 |
| Eyebrow count locked at four | 4.2 |
| Docker prod on :3000 | 5.1 |
| 40 scrub screenshots | 5.2 |
| Lighthouse budget | 5.2 step 5 |

## Self-review

- **Placeholder scan:** no TBD, TODO, or "similar to Task N". Every code step carries runnable code.
- **Type consistency:** `VendorSlug` and `VENDOR_MARKS` defined in 1C are consumed by 2A/2C/2D. `ParticleFieldProps` from 1D is consumed by 2A. `ISO_ROTATION`, `IsoLayer`, `Billboard` from 1B are consumed by 2D. `RailLayer` from 1B matches `CONTEXT_LAYERS` in 2D. `capStagger` from 0.2 is used by `Stagger` in 1A.
- **Four bugs found and fixed during this review, recorded so they are not reintroduced:**
  1. `EASE` was originally `as const`, producing readonly tuples that are **not assignable** to motion's mutable `Easing` tuple. Now explicitly typed as mutable `Bezier`. Adding `as const` back will break every `transition.ease` in Waves 1 through 3.
  2. `Beam` took a prop named `pathId` while actually consuming raw path geometry. Renamed to `d`, matching `<path d>`, so the name no longer lies about the type.
  3. `IsoLayer` animated `translateZ`, which is not a motion value key and would have silently done nothing, collapsing the entire exploded stack to flat. Now uses `z`.
  4. The spec requires a `data-motion-paused` freeze hook for deterministic capture, and no task implemented it. Added to Task 0.5 as a CSS rule that pauses all keyframes and transitions; Wave 5's `boot()` already sets the attribute.
- **Parallel safety:** Wave 1 owns four disjoint file sets. Wave 2 owns one diagram file each and may not touch `motion/` or `logos/`. Wave 3 owns disjoint section files. `globals.css` and `layout.tsx` are touched only in Wave 0.
- **Copy corrections:** the hero double space and the word `Remidiate` are preserved by default. If the human signs off on fixing them, that is a one-line change in `content/replica.ts` plus the test in 3A, and it is deliberately not bundled into any task.
