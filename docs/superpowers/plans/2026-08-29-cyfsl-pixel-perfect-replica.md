# CYfSl Pixel-Perfect Replica Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Next.js landing with a dark-only, pixel-faithful React replica of Pencil frame `CYfSl`, served on `http://localhost:3000` via existing Docker prod compose, with all unused shelf/theme code deleted.

**Architecture:** Full regenerate (Approach B). New `web/components/cyfsl/*` tree built from live Pencil reads (Path B: `execute` / `Get` / `TakeScreenshot` / `Export`). Fixed dark tokens only. Single route `/`. Keep Docker/Next standalone shell; do not patch old `HomeShelfPage` / shelf sections as the primary path.

**Tech Stack:** Next.js ~16.3 · React ~19.2 · TypeScript · Tailwind CSS v4 · pnpm · Vitest · Docker `node:24-alpine` · Pencil MCP `pencil-docker` (Path B)

**Spec:** `docs/superpowers/specs/2026-08-29-cyfsl-pixel-perfect-replica-design.md`

## Global Constraints

1. **Source of truth:** Live Pencil node `CYfSl` in `Stack_Linear.pen` only. Verbatim canvas copy; do not invent sections, light theme, or mobile layouts.
2. **Never modify** `Stack_Linear.pen`. Pencil MCP = read-only (`Get`, `Print`, `TakeScreenshot`, `Export`).
3. **Dark only:** no `LexRf`, no ThemeProvider/ThemeToggle, no `theme-init.js`, no light CSS branches.
4. **Section order (required):** `cYtoM` → `PzSjX` → `coT3f` → `TKCFb` → `C2kYT` → `V2P0L` → `ck4Dy` → `Wp1Dh`.
5. **Viewport:** `min-width: 1440px` on page shell; desktop shelf only.
6. **Docker:** keep `web/Dockerfile` + root `docker-compose.yml` profiles; demo via `docker compose --profile prod up --build`.
7. **Server Components by default;** `'use client'` only for real interaction (e.g. product mega-menu if canvas has it).
8. **Commits:** only when the human asks. Plan checkpoints list `git add` paths; do not `git commit` unless requested.
9. **Skills:** follow `pencil-to-code` + `verification-before-completion`; claim visual parity only with screenshot evidence.
10. **Diagram fallback:** if Assemblies/Shell vector trees are huge, `Export` diagram subtrees to PNG under `web/public/media/cyfsl/` and wrap with React chrome matching canvas bounds.

---

## File map

| Path | Responsibility |
|------|----------------|
| `web/app/globals.css` | Tailwind + dark-only `ds-*` tokens |
| `web/app/layout.tsx` | Fonts, fixed dark `<html>`, no theme providers |
| `web/app/page.tsx` | Renders `CyfslHome` |
| `web/components/cyfsl/CyfslHome.tsx` | Main shell `data-pencil-id="CYfSl"` |
| `web/components/cyfsl/CyfslNav.tsx` | `cYtoM` |
| `web/components/cyfsl/CyfslHero.tsx` | `PzSjX` |
| `web/components/cyfsl/CyfslVideo.tsx` | `coT3f` |
| `web/components/cyfsl/CyfslLogos.tsx` | `TKCFb` |
| `web/components/cyfsl/CyfslAssemblies.tsx` | `C2kYT` |
| `web/components/cyfsl/CyfslShell.tsx` | `V2P0L` |
| `web/components/cyfsl/CyfslWhoItsFor.tsx` | `ck4Dy` |
| `web/components/cyfsl/CyfslFooter.tsx` | `Wp1Dh` |
| `web/components/cyfsl/primitives/CyfslLogo.tsx` | Shared wordmark if repeated |
| `web/components/cyfsl/primitives/CyfslPrimaryPill.tsx` | Shared primary CTA pill if repeated |
| `web/content/cyfsl.ts` | Verbatim strings + asset paths extracted from canvas |
| `web/lib/cyfsl-frames.ts` | Pencil ID constants for tests |
| `web/__tests__/cyfsl-home.test.tsx` | Smoke: 8 section ids + dark root |
| `web/public/media/cyfsl/*` | Exported diagram/media assets |
| **Delete after cutover** | See Task 10 |

Keep unchanged: `web/Dockerfile`, `docker-compose.yml`, `web/next.config.ts`, `web/package.json` (unless a dep becomes unused after delete — then prune).

---

### Task 1: Dark-only tokens + layout scaffold + failing smoke test

**Files:**
- Create: `web/lib/cyfsl-frames.ts`
- Create: `web/__tests__/cyfsl-home.test.tsx`
- Modify: `web/app/globals.css`
- Modify: `web/app/layout.tsx`

**Interfaces:**
- Produces: `CYFSL_FRAMES` constant used by all later tasks and tests

- [ ] **Step 1: Extract dark tokens from Pencil (read-only)**

Via Pencil MCP `execute` on `Stack_Linear.pen`:

```js
const v = GetVariables();
const dark = {};
for (const [k, def] of Object.entries(v.variables)) {
  if (!k.startsWith("ds-")) continue;
  if (Array.isArray(def.value)) {
    const d = def.value.find((x) => x.theme && x.theme.mode === "dark");
    dark[k] = d ? d.value : def.value;
  } else {
    dark[k] = def.value;
  }
}
Print(JSON.stringify(dark));
```

Expected: dark `ds-bg` ≈ `#0B0C0E`, fonts Inter / JetBrains Mono, pad-x/pad-y numbers.

- [ ] **Step 2: Write failing smoke test**

`web/lib/cyfsl-frames.ts`:

```ts
/** Pencil node IDs for CYfSl section order — dark home only. */
export const CYFSL_FRAMES = {
  frame: "CYfSl",
  nav: "cYtoM",
  hero: "PzSjX",
  video: "coT3f",
  logos: "TKCFb",
  assemblies: "C2kYT",
  shell: "V2P0L",
  whoItsFor: "ck4Dy",
  footer: "Wp1Dh",
} as const;

export type CyfslFrameId = (typeof CYFSL_FRAMES)[keyof typeof CYFSL_FRAMES];
```

`web/__tests__/cyfsl-home.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";
import { CYFSL_FRAMES } from "@/lib/cyfsl-frames";

test("renders dark-only CYfSl with eight section pencil ids", () => {
  render(<HomePage />);
  expect(document.documentElement.getAttribute("data-theme")).not.toBe("light");
  expect(document.querySelector('[data-pencil-id="CYfSl"]')).toBeInTheDocument();
  for (const id of Object.values(CYFSL_FRAMES)) {
    expect(document.querySelector(`[data-pencil-id="${id}"]`)).toBeInTheDocument();
  }
  expect(document.querySelector('[data-pencil-id="LexRf"]')).not.toBeInTheDocument();
  expect(screen.queryByRole("button", { name: /theme|toggle/i })).not.toBeInTheDocument();
});
```

- [ ] **Step 3: Run test — expect FAIL**

```bash
cd web && pnpm test __tests__/cyfsl-home.test.tsx
```

Expected: FAIL (missing `data-pencil-id`s / page still old shelf, or LexRf/theme still present).

- [ ] **Step 4: Rewrite `globals.css` dark-only**

Replace light/dark dual theme with single `:root` using extracted dark values. Example shape (fill hexes from Step 1 Print output — do not invent):

```css
@import "tailwindcss";

@theme {
  --color-bg: var(--ds-bg);
  --color-surface: var(--ds-surface);
  --color-surface-raised: var(--ds-surface-raised);
  --color-border: var(--ds-border);
  --color-text-primary: var(--ds-text-primary);
  --color-text-secondary: var(--ds-text-secondary);
  --color-text-tertiary: var(--ds-text-tertiary);
  --color-accent: var(--ds-accent);
  --color-accent-text: var(--ds-accent-text);
  --color-on-accent: var(--ds-on-accent);
  --color-pass: var(--ds-pass);
  --color-halt: var(--ds-halt);
  --font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
  --font-mono: var(--font-jetbrains), ui-monospace, monospace;
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --spacing-pad-x: 96px;
  --spacing-pad-y: 96px;
}

:root {
  --ds-bg: #0b0c0e;
  --ds-surface: #151619;
  --ds-surface-raised: #1d1f24;
  --ds-border: #2a2c33;
  --ds-text-primary: #f3f4f6;
  --ds-text-secondary: #9aa0ac;
  --ds-text-tertiary: #7e8591;
  --ds-accent: #8c85ff;
  --ds-accent-text: #a79cff;
  --ds-on-accent: #0b0c0e;
  --ds-pass: #4ade80;
  --ds-halt: #f0883e;
  /* include ds-layer-* dark values from Step 1 Print */
}

@layer base {
  html {
    background: var(--color-bg);
    color: var(--color-text-primary);
    min-width: 1440px;
  }
  body {
    margin: 0;
    font-family: var(--font-sans);
  }
}
```

Remove `[data-theme="light"]` and `[data-theme="dark"]` selectors entirely.

- [ ] **Step 5: Simplify `layout.tsx` — no theme**

```tsx
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "The Autonomous DevOps Factory | StackGen",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

No `ThemeProvider`, `MotionProvider`, or `theme-init.js` Script.

- [ ] **Step 6: Checkpoint (stage only)**

```bash
git add web/lib/cyfsl-frames.ts web/__tests__/cyfsl-home.test.tsx web/app/globals.css web/app/layout.tsx
# commit only if user asks
```

---

### Task 2: CyfslHome stubs + page wire (make smoke test pass)

**Files:**
- Create: `web/components/cyfsl/CyfslHome.tsx`
- Create stub section files under `web/components/cyfsl/` (Nav through Footer)
- Modify: `web/app/page.tsx`

**Interfaces:**
- Consumes: `CYFSL_FRAMES` from `web/lib/cyfsl-frames.ts`
- Produces: `CyfslHome` default export; each section accepts optional `className?: string` and sets `data-pencil-id`

- [ ] **Step 1: Create stub sections**

Each stub file pattern (example Nav):

```tsx
// web/components/cyfsl/CyfslNav.tsx
import { CYFSL_FRAMES } from "@/lib/cyfsl-frames";

export function CyfslNav() {
  return (
    <header data-pencil-id={CYFSL_FRAMES.nav} className="w-full">
      {/* filled in Task 4 from Pencil Get("cYtoM") */}
    </header>
  );
}
```

Repeat for Hero (`section`), Video, Logos, Assemblies, Shell, WhoItsFor, Footer (`footer`) with matching `CYFSL_FRAMES.*` ids.

- [ ] **Step 2: Create `CyfslHome`**

```tsx
import { CYFSL_FRAMES } from "@/lib/cyfsl-frames";
import { CyfslNav } from "./CyfslNav";
import { CyfslHero } from "./CyfslHero";
import { CyfslVideo } from "./CyfslVideo";
import { CyfslLogos } from "./CyfslLogos";
import { CyfslAssemblies } from "./CyfslAssemblies";
import { CyfslShell } from "./CyfslShell";
import { CyfslWhoItsFor } from "./CyfslWhoItsFor";
import { CyfslFooter } from "./CyfslFooter";

export function CyfslHome() {
  return (
    <main
      data-pencil-id={CYFSL_FRAMES.frame}
      className="flex w-full min-w-[1440px] flex-col bg-bg text-text-primary"
    >
      <CyfslNav />
      <CyfslHero />
      <CyfslVideo />
      <CyfslLogos />
      <CyfslAssemblies />
      <CyfslShell />
      <CyfslWhoItsFor />
      <CyfslFooter />
    </main>
  );
}
```

- [ ] **Step 3: Wire `page.tsx`**

```tsx
import { CyfslHome } from "@/components/cyfsl/CyfslHome";

export default function HomePage() {
  return <CyfslHome />;
}
```

- [ ] **Step 4: Run smoke test — expect PASS**

```bash
cd web && pnpm test __tests__/cyfsl-home.test.tsx
```

Expected: PASS (structure only; fidelity comes in later tasks).

- [ ] **Step 5: Checkpoint (stage only)**

```bash
git add web/components/cyfsl web/app/page.tsx web/__tests__/cyfsl-home.test.tsx
```

---

### Task 3: Content module + shared primitives from canvas

**Files:**
- Create: `web/content/cyfsl.ts`
- Create: `web/components/cyfsl/primitives/CyfslLogo.tsx`
- Create: `web/components/cyfsl/primitives/CyfslPrimaryPill.tsx`
- Test: extend `web/__tests__/cyfsl-home.test.tsx` or add `web/__tests__/cyfsl-content.test.ts`

**Interfaces:**
- Produces: `cyfslContent` object with keys `nav`, `hero`, `video`, `logos`, `assemblies`, `shell`, `whoItsFor`, `footer`
- Produces: `CyfslLogo`, `CyfslPrimaryPill({ label: string; href?: string })`

- [ ] **Step 1: Dump text from each section**

For each id in `cYtoM`, `PzSjX`, `coT3f`, `TKCFb`, `C2kYT`, `V2P0L`, `ck4Dy`, `Wp1Dh`:

```js
Get("PzSjX", (n) => n.type === "text" && Print(n.id, "|", n.content, "|", n.fontSize, "|", n.fontWeight), { resolveVariables: true, depth: 8 });
```

Record verbatim strings into `web/content/cyfsl.ts`.

- [ ] **Step 2: Write content test (fail then pass)**

```ts
import { cyfslContent } from "@/content/cyfsl";

test("cyfsl content has eight section keys and hero heading", () => {
  expect(Object.keys(cyfslContent).sort()).toEqual(
    ["assemblies", "footer", "hero", "logos", "nav", "shell", "video", "whoItsFor"].sort(),
  );
  expect(cyfslContent.hero.heading.replace(/\s/g, "")).toMatch(/AutonomousDevOpsFactory/i);
});
```

- [ ] **Step 3: Implement `cyfsl.ts` from Print output**

Structure (fill from canvas — example keys only):

```ts
export const cyfslContent = {
  nav: { /* links + cta labels from cYtoM */ },
  hero: { heading: "...", sub: "...", primaryCta: "...", secondaryCta: "..." },
  video: { label: "..." },
  logos: { eyebrow: "...", items: [{ src: "/logos/customers/...", alt: "..." }] },
  assemblies: { /* headings, pillars, os chips */ },
  shell: { /* headings / captions */ },
  whoItsFor: { /* roles */ },
  footer: { /* columns, legal, socials */ },
} as const;
```

Asset `src` paths must exist under `web/public/` or be exported in Task 7/8.

- [ ] **Step 4: Implement Logo + PrimaryPill from canvas measurements**

Read logo/CTA nodes from `cYtoM` / hero:

```js
Print(Get("cYtoM", { depth: 4, resolveVariables: true, resolveInstances: true }));
```

Implement minimal components using Tailwind mapped from fills/padding/radius. Prefer SVG path data from canvas over inventing.

- [ ] **Step 5: Run tests**

```bash
cd web && pnpm test __tests__/cyfsl-content.test.ts __tests__/cyfsl-home.test.tsx
```

Expected: PASS.

- [ ] **Step 6: Checkpoint (stage only)**

```bash
git add web/content/cyfsl.ts web/components/cyfsl/primitives web/__tests__/cyfsl-content.test.ts
```

---

### Task 4: CyfslNav (`cYtoM`)

**Files:**
- Modify: `web/components/cyfsl/CyfslNav.tsx`
- May use: `CyfslLogo`, `CyfslPrimaryPill`, `cyfslContent.nav`

**Interfaces:**
- Consumes: `cyfslContent.nav`, primitives from Task 3

- [ ] **Step 1: Read full nav tree + screenshot**

```js
Print(Get("cYtoM", { depth: 6, resolveVariables: true, resolveInstances: true }));
TakeScreenshot(["cYtoM"]);
```

Record height (60), pad-x, gap, link styles, CTA pill.

- [ ] **Step 2: Write nav assertion into smoke or dedicated test**

```tsx
test("nav exposes schedule demo cta", () => {
  render(<HomePage />);
  expect(screen.getByRole("link", { name: /schedule demo/i })).toBeInTheDocument();
});
```

- [ ] **Step 3: Implement `CyfslNav` to match layout**

Map horizontal flex, 60px height, left logo, center/right links, primary pill. Use semantic `<nav>` / `<a>`. No theme toggle.

- [ ] **Step 4: Run tests + visual compare nav strip**

```bash
cd web && pnpm test __tests__/cyfsl-home.test.tsx
pnpm dev
```

Compare browser nav to Pencil screenshot. Fix spacing/type until match.

- [ ] **Step 5: Checkpoint (stage only)**

```bash
git add web/components/cyfsl/CyfslNav.tsx web/__tests__/cyfsl-home.test.tsx
```

---

### Task 5: CyfslHero (`PzSjX`)

**Files:**
- Modify: `web/components/cyfsl/CyfslHero.tsx`
- Consumes: `cyfslContent.hero`, `CyfslPrimaryPill`

- [ ] **Step 1: Get + screenshot**

```js
Print(Get("PzSjX", { depth: 6, resolveVariables: true }));
TakeScreenshot(["PzSjX"]);
```

- [ ] **Step 2: Failing heading assertion (if not already covered)**

```tsx
expect(screen.getByRole("heading", { level: 1 }).textContent?.replace(/\s/g, "")).toBe(
  /* exact canvas string without whitespace */,
);
```

- [ ] **Step 3: Implement hero layout**

Match canvas padding, heading size/weight, subcopy color (`text-secondary`), CTA row gap. No invented badges/overlays.

- [ ] **Step 4: Test + visual check**

```bash
cd web && pnpm test && # spot-check hero in browser vs TakeScreenshot
```

- [ ] **Step 5: Checkpoint (stage only)**

```bash
git add web/components/cyfsl/CyfslHero.tsx
```

---

### Task 6: CyfslVideo (`coT3f`) + CyfslLogos (`TKCFb`)

**Files:**
- Modify: `web/components/cyfsl/CyfslVideo.tsx`
- Modify: `web/components/cyfsl/CyfslLogos.tsx`

- [ ] **Step 1: Get + screenshot both**

```js
Print(Get("coT3f", { depth: 5, resolveVariables: true }));
Print(Get("TKCFb", { depth: 5, resolveVariables: true }));
TakeScreenshot(["coT3f", "TKCFb"]);
```

- [ ] **Step 2: Implement Video**

Match label typography and media frame (aspect, bezel, radius). Point `<img>`/`<video>` at existing `public/media` if canvas uses it; otherwise Export fill assets to `web/public/media/cyfsl/`.

- [ ] **Step 3: Implement Logos**

Eyebrow + logo row from `cyfslContent.logos.items`. Use `next/image` or `<img>` with exact heights from canvas.

- [ ] **Step 4: Test logos render**

```tsx
for (const item of cyfslContent.logos.items) {
  expect(screen.getByAltText(item.alt)).toBeInTheDocument();
}
```

- [ ] **Step 5: Checkpoint (stage only)**

```bash
git add web/components/cyfsl/CyfslVideo.tsx web/components/cyfsl/CyfslLogos.tsx web/public/media/cyfsl
```

---

### Task 7: CyfslAssemblies (`C2kYT`)

**Files:**
- Modify: `web/components/cyfsl/CyfslAssemblies.tsx`
- Optional: `web/public/media/cyfsl/assemblies-*.png` via Pencil `Export`

- [ ] **Step 1: Inventory complexity**

```js
let count = 0;
Get("C2kYT", () => { count++; }, { depth: 12 });
Print("nodeCount", count);
TakeScreenshot(["C2kYT"]);
```

If nodeCount is large or contains dense diagrams: Export diagram subframes only:

```js
Export(["<diagramChildId>"], "png", "./exports/web-shelf/cyfsl-regen/", { scale: 2 });
```

Copy into `web/public/media/cyfsl/` and reference from React.

- [ ] **Step 2: Implement section chrome in React**

Heading/sub, pillar cards, OS bar — from `cyfslContent.assemblies` + canvas layout (gap, pad, radius, borders). Embed exported PNGs for diagram regions with exact width/height.

- [ ] **Step 3: Assertion**

```tsx
expect(screen.getByText(cyfslContent.assemblies.heading)).toBeInTheDocument();
```

- [ ] **Step 4: Visual compare Assemblies screenshot vs browser**

- [ ] **Step 5: Checkpoint (stage only)**

```bash
git add web/components/cyfsl/CyfslAssemblies.tsx web/public/media/cyfsl web/content/cyfsl.ts
```

---

### Task 8: CyfslShell (`V2P0L`)

**Files:**
- Modify: `web/components/cyfsl/CyfslShell.tsx`
- Optional exports under `web/public/media/cyfsl/shell-*.png`

Same method as Task 7: Get → count → Export heavy diagrams → React chrome → screenshot compare.

- [ ] **Step 1: Get + screenshot + optional Export**
- [ ] **Step 2: Implement `CyfslShell`**
- [ ] **Step 3: Assert key shell copy present**
- [ ] **Step 4: Visual compare**
- [ ] **Step 5: Checkpoint (stage only)**

```bash
git add web/components/cyfsl/CyfslShell.tsx web/public/media/cyfsl
```

---

### Task 9: CyfslWhoItsFor (`ck4Dy`) + CyfslFooter (`Wp1Dh`)

**Files:**
- Modify: `web/components/cyfsl/CyfslWhoItsFor.tsx`
- Modify: `web/components/cyfsl/CyfslFooter.tsx`

- [ ] **Step 1: Get + screenshot both**

```js
Print(Get("ck4Dy", { depth: 6, resolveVariables: true }));
Print(Get("Wp1Dh", { depth: 6, resolveVariables: true }));
TakeScreenshot(["ck4Dy", "Wp1Dh"]);
```

- [ ] **Step 2: Implement WhoItsFor**

Role cards from content; match icon treatment (Phosphor only if canvas uses those icons; otherwise SVG/img from canvas).

- [ ] **Step 3: Implement Footer**

CTA strip + Brand/Product/Platform/Company columns + legal/socials bottom per canvas (`Wp1Dh`). Semantic `<footer>`.

- [ ] **Step 4: Assert footer CTA**

```tsx
expect(screen.getAllByRole("link", { name: /schedule demo/i }).length).toBeGreaterThanOrEqual(1);
```

- [ ] **Step 5: Checkpoint (stage only)**

```bash
git add web/components/cyfsl/CyfslWhoItsFor.tsx web/components/cyfsl/CyfslFooter.tsx web/content/cyfsl.ts
```

---

### Task 10: Delete unused code + rewrite README

**Files:**
- Delete (when no longer imported):
  - `web/components/home/HomeShelfPage.tsx`
  - `web/components/sections/home/shelf/**`
  - `web/components/layout/ThemeProvider.tsx`
  - `web/components/layout/ThemeToggle.tsx`
  - `web/components/layout/Nav.tsx` (old)
  - `web/components/layout/ProductMegaMenu.tsx` (unless reimplemented inside CyfslNav)
  - `web/public/theme-init.js`
  - `web/lib/shelf-frames.ts`
  - `web/lib/theme.ts`
  - `web/content/home-shelf.ts`
  - `web/__tests__/home-shelf-*.tsx|ts`
  - `web/__tests__/theme.test.tsx`
  - Unused `web/components/motion/**` and `web/components/primitives/**` not imported by `cyfsl/`
- Modify: `web/README.md` to describe dark-only CYfSl + Docker demo
- Modify: delete or rewrite `web/__tests__/nav.test.tsx` if it targets old Nav

- [ ] **Step 1: Confirm Cyfsl tree is the only page import**

```bash
cd web && rg -n "HomeShelfPage|ThemeProvider|shelf-frames|home-shelf" --glob '!node_modules'
```

Expected: no hits outside files about to be deleted / docs.

- [ ] **Step 2: Delete listed files**

Use `git rm` / delete; fix any broken imports.

- [ ] **Step 3: Rewrite README**

Document:
- Source: Pencil `CYfSl` dark only
- `pnpm dev` / `docker compose --profile prod up --build`
- Single route `/`

- [ ] **Step 4: Full test + typecheck**

```bash
cd web && pnpm typecheck && pnpm test
```

Expected: all PASS; no references to LexRf/theme toggle.

- [ ] **Step 5: Checkpoint (stage only)**

```bash
git add -u web/ web/README.md
```

---

### Task 11: Visual parity + Docker prod verification

**Files:**
- Evidence under `exports/web-shelf/cyfsl-parity/` (Pencil PNG + browser PNG)

- [ ] **Step 1: Pencil full-frame screenshot**

```js
TakeScreenshot(["CYfSl"]);
# and/or
Export(["CYfSl"], "png", "./exports/web-shelf/cyfsl-parity/", { scale: 2 });
```

- [ ] **Step 2: Prod container**

```bash
cd /Users/swami/Documents/Stackgen_Website_Redesign
docker compose --profile prod down
docker compose --profile prod up --build -d
# wait for healthy
curl -sf -o /dev/null -w "%{http_code}\n" http://localhost:3000/
```

Expected: `200`.

- [ ] **Step 3: Browser screenshot at 1440 width**

Capture `/` and compare section-by-section to Pencil. Fix mismatches in the owning `Cyfsl*` component; re-run container if CSS/token changes require rebuild.

- [ ] **Step 4: Final verification commands**

```bash
cd web && pnpm typecheck && pnpm test
curl -sf http://localhost:3000/ | head -c 200
```

Do **not** claim done without screenshot evidence (verification-before-completion).

- [ ] **Step 5: Update `openmemory.md` Components row** for Cyfsl dark-only landing + note Docker demo path.

- [ ] **Step 6: Checkpoint (stage only); commit when user asks**

```bash
git add exports/web-shelf/cyfsl-parity openmemory.md web/
```

---

## Spec coverage checklist

| Spec requirement | Task |
|------------------|------|
| Approach B full regenerate | 2–9 |
| Dark only / no LexRf / no toggle | 1, 10 |
| Eight sections in canvas order | 2, `CYFSL_FRAMES` |
| pencil-to-code Path B | 3–9 |
| Diagram Export fallback | 7, 8 |
| Delete unused | 10 |
| Docker `:3000` | 11 |
| Screenshot evidence | 4–9, 11 |
| No `.pen` mutations | Global Constraints |

## Placeholder / consistency self-review

- No TBD/TODO left in task steps.
- Frame IDs match spec table throughout (`CYFSL_FRAMES`).
- Component names consistent: `Cyfsl*` under `web/components/cyfsl/`.
- Commits gated on user request (Global Constraint 8).
