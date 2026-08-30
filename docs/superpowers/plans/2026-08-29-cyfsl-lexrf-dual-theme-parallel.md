# CYfSl + LexRf Dual-Theme Replica — Parallel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use **dispatching-parallel-agents** within each wave. Every implementer subagent MUST use model **`composer-2.5-fast`** (Composer 2.5). Do not use sequential SDD for section builds.
>
> Steps use checkbox (`- [ ]`) syntax. Controllers dispatch **all agents in a wave in one message**.

**Goal:** Wipe current UX and ship a 100% dual-theme Next.js replica of Pencil `CYfSl` (dark) + `LexRf` (light) with theme toggle, served via Docker on `http://localhost:3000`.

**Architecture:** Clean `web/components/replica/**` tree. CSS `ds-*` light/dark tokens. One page; theme swaps tokens + any theme-specific layout/content. Parallel section owners; Wave 0 owns shared shell only.

**Tech Stack:** Next.js ~16.3 · React ~19.2 · TypeScript · Tailwind v4 · pnpm · Vitest · Docker standalone · Pencil MCP Path B

**Spec:** `docs/superpowers/specs/2026-08-29-cyfsl-lexrf-dual-theme-replica-design.md`

## Global Constraints

1. **Source of truth:** Live `CYfSl` + `LexRf` only. Never invent copy/sections. Never use obsolete light IDs (`B9suO`, `pH0VX`, etc.).
2. **Never modify** `Stack_Linear.pen`.
3. **Both themes + toggle** required. Default dark. Persist `stackgen-theme`.
4. **Section order (both):** Nav → Hero → Video → Logos → Assemblies → Shell → WhoIt'sFor → Footer.
5. **Frame IDs (live):**
   - Dark: `CYfSl`, `cYtoM`, `PzSjX`, `coT3f`, `TKCFb`, `C2kYT`, `V2P0L`, `ck4Dy`, `Wp1Dh`
   - Light: `LexRf`, `e3z1q`, `W1CQS`, `NohsW`, `QKd6D`, `oWWUj`, `HSHAw`, `K4v7zT`, `Svtt6`
6. **Viewport:** `min-width: 1440px` on `html` (prefer CSS over arbitrary Tailwind brackets when equivalent).
7. **Docker:** `docker compose --profile prod up --build` → `:3000`.
8. **Model:** All implementer/fix subagents = `composer-2.5-fast`.
9. **Commits:** only when the human asks.
10. **No FOUC:** `public/theme-init.js` + `beforeInteractive` Script.
11. **File ownership:** agents must only write files listed in their brief (prevent parallel collisions).

## Parallel execution model

```
Wave 0 (sequential, 1 agent)     → shell wipe + tokens + theme + frames + failing smoke
Wave 1 (2 agents parallel)       → extract dark tree dump + extract light tree dump + exports
Wave 2 (8 agents parallel)       → one agent per section slot (implements dark+light for that slot)
Wave 3 (1 agent)                 → wire HomeReplica, delete leftovers, tests green
Wave 4 (1 agent)                 → Docker prod + dual-theme screenshot parity
```

**Abandoned:** `.superpowers/sdd/progress.md` Tasks 1–7 from the dark-only plan. Controller should write a new ledger at `.superpowers/sdd/dual-theme-progress.md`.

---

## File map

| Path | Owner wave | Responsibility |
|------|------------|----------------|
| `web/app/globals.css` | 0 | Dual `ds-*` tokens |
| `web/app/layout.tsx` | 0 | Fonts, ThemeProvider, theme-init |
| `web/public/theme-init.js` | 0 | Pre-hydration theme |
| `web/lib/replica-frames.ts` | 0 | Live ID maps |
| `web/components/replica/theme/*` | 0 | Provider + Toggle |
| `web/content/replica.ts` | 1→2 | Filled by extractors; sections may append |
| `.superpowers/sdd/extract-dark.json` | 1A | Dark structural dump |
| `.superpowers/sdd/extract-light.json` | 1B | Light structural dump |
| `web/public/media/replica/*` | 1 / 2 | Diagram exports |
| `web/components/replica/sections/Nav.tsx` | 2-Nav | |
| `…/Hero.tsx` | 2-Hero | |
| `…/Video.tsx` | 2-Video | |
| `…/Logos.tsx` | 2-Logos | |
| `…/Assemblies.tsx` | 2-Assemblies | |
| `…/Shell.tsx` | 2-Shell | |
| `…/WhoItsFor.tsx` | 2-Who | |
| `…/Footer.tsx` | 2-Footer | |
| `web/components/replica/shared/*` | 0 (stubs) / 2-Nav refine | Logo, Pill |
| `web/components/replica/HomeReplica.tsx` | 3 | Composition |
| `web/app/page.tsx` | 3 | Entry |
| `web/__tests__/replica-home.test.tsx` | 0 create / 3 finalize | |
| `web/Dockerfile` + compose | 0 keep / 4 verify | |

---

### Wave 0 — Foundation wipe (1 × composer-2.5-fast)

**Files owned:** globals.css, layout.tsx, theme-init.js, replica-frames.ts, theme/*, shared Logo+Pill stubs, `__tests__/replica-home.test.tsx` (RED ok), delete cyfsl/shelf/home UX paths listed in spec.

- [ ] **Step 1: Delete UX trees**

```bash
# From repo root — adjust if paths missing
rm -rf web/components/cyfsl \
       web/components/home \
       web/components/sections/home/shelf
# Also remove other unused sections/motion as needed if nothing imports them after cutover
```

- [ ] **Step 2: Write `lib/replica-frames.ts`** with live IDs from Global Constraints (both themes).

- [ ] **Step 3: Dual-theme `globals.css`**

`:root` = Pencil light `ds-*`; `[data-theme="dark"]` = dark `ds-*`. Include layer tokens. `html { min-width: 1440px; }`.

- [ ] **Step 4: ThemeProvider + ThemeToggle + theme-init.js**

- Toggle in nav slot later; Wave 0 exports `<ThemeToggle />` usable by Nav.
- `localStorage` key `stackgen-theme`; values `light` | `dark`; default `dark`.

- [ ] **Step 5: Stub shared `ReplicaLogo`, `ReplicaPrimaryPill`** (token-based).

- [ ] **Step 6: Failing smoke test**

```tsx
// web/__tests__/replica-home.test.tsx
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@/components/replica/theme/ThemeProvider";
import { HomeReplica } from "@/components/replica/HomeReplica";
import { REPLICA_FRAMES } from "@/lib/replica-frames";

function renderDark() {
  document.documentElement.dataset.theme = "dark";
  return render(
    <ThemeProvider>
      <HomeReplica />
    </ThemeProvider>,
  );
}

test("dark theme exposes CYfSl frame ids", () => {
  renderDark();
  expect(document.querySelector('[data-pencil-id="CYfSl"]')).toBeInTheDocument();
  for (const id of Object.values(REPLICA_FRAMES.dark)) {
    expect(document.querySelector(`[data-pencil-id="${id}"]`)).toBeInTheDocument();
  }
  expect(screen.getByRole("button", { name: /theme|toggle|switch/i })).toBeInTheDocument();
});
```

Expect RED until Wave 3 wires `HomeReplica`.

- [ ] **Step 7: Temporary `page.tsx` placeholder** (empty main) so app builds; Wave 3 replaces.

- [ ] **Step 8: Report** → `.superpowers/sdd/wave-0-report.md`. No commit unless asked.

**Gate:** typecheck passes; smoke RED with clear missing HomeReplica or missing ids.

---

### Wave 1 — Parallel extract (2 × composer-2.5-fast)

Dispatch **both in one controller message**.

#### Agent 1A — Dark extractor

**Owns:** `.superpowers/sdd/extract-dark.json`, `exports/web-shelf/replica-extract/dark/*`, copies into `web/public/media/replica/dark-*`

- [ ] `Get("CYfSl", {depth:1})` + per-section `Get` depth 6–10 with `resolveVariables`
- [ ] Dump text nodes + layout (padding, gap, fill, radius, fontSize) into JSON keyed by section
- [ ] `Export` heavy diagram children under Assemblies/Shell to PNG
- [ ] `TakeScreenshot(["CYfSl"])` once
- [ ] Report: `.superpowers/sdd/wave-1a-report.md`

#### Agent 1B — Light extractor

**Owns:** `.superpowers/sdd/extract-light.json`, `exports/web-shelf/replica-extract/light/*`, `web/public/media/replica/light-*`

Same procedure for `LexRf` and light section IDs.

**Gate:** both JSON files exist; at least Assemblies+Shell diagrams exported per theme if dense.

**Controller after Wave 1:** merge text into starter `web/content/replica.ts` skeleton (or dispatch a 30s merge agent) so Wave 2 agents have content keys.

---

### Wave 2 — Parallel sections (8 × composer-2.5-fast)

Dispatch **all eight in one message**. Each agent implements **both themes** for one section file only.

Shared inputs for every agent:
- Spec path
- `extract-dark.json` + `extract-light.json`
- `content/replica.ts` (read/append only own section key if needed)
- `REPLICA_FRAMES`
- Must set `data-pencil-id` from props or theme map
- Must not edit other section files, layout, or globals

| Agent | File | Dark ID | Light ID |
|-------|------|---------|----------|
| 2-Nav | `sections/Nav.tsx` | `cYtoM` | `e3z1q` |
| 2-Hero | `sections/Hero.tsx` | `PzSjX` | `W1CQS` |
| 2-Video | `sections/Video.tsx` | `coT3f` | `NohsW` |
| 2-Logos | `sections/Logos.tsx` | `TKCFb` | `QKd6D` |
| 2-Assemblies | `sections/Assemblies.tsx` | `C2kYT` | `oWWUj` |
| 2-Shell | `sections/Shell.tsx` | `V2P0L` | `HSHAw` |
| 2-Who | `sections/WhoItsFor.tsx` | `ck4Dy` | `K4v7zT` |
| 2-Footer | `sections/Footer.tsx` | `Wp1Dh` | `Svtt6` |

#### Per-section agent contract

```text
Model: composer-2.5-fast
Read: extract-*.json for your two IDs; content/replica.ts your key
Write ONLY: web/components/replica/sections/<YourSection>.tsx
           (optional) append your key in content/replica.ts
           (optional) web/public/media/replica/* for your diagrams
Interface:
  export function ReplicaNav(props: { theme: "light" | "dark"; className?: string })
  // same pattern for each section name
  // data-pencil-id = REPLICA_FRAMES[theme].nav (etc.)
Include ThemeToggle ONLY in Nav (right actions), matching canvas placement.
Diagram sections: prefer exported PNGs sized to canvas width; React for headers/chrome.
Self-check: no imports from deleted cyfsl/shelf paths.
Report: .superpowers/sdd/wave-2-<section>-report.md
Do not commit.
```

**Nav-specific:** height 60, pad-x from extract, bottom border, Book Demo / Schedule CTA per canvas, ThemeToggle.

**Assemblies/Shell-specific:** use Wave 1 PNGs; do not rebuild 100+ node SVGs in React unless extract shows trivial structure.

**Gate:** eight section files exist; each exports the agreed function name; controller spot-checks `data-pencil-id` usage.

---

### Wave 3 — Compose + cleanup (1 × composer-2.5-fast)

**Owns:** `HomeReplica.tsx`, `app/page.tsx`, test finalize, delete any remaining unused UX, README.

- [ ] **Step 1: `HomeReplica.tsx`**

```tsx
"use client";
import { useTheme } from "@/components/replica/theme/ThemeProvider";
import { REPLICA_FRAMES } from "@/lib/replica-frames";
import { ReplicaNav } from "./sections/Nav";
// ... other sections

export function HomeReplica() {
  const { theme } = useTheme();
  const frames = REPLICA_FRAMES[theme];
  return (
    <main data-pencil-id={frames.frame} data-pencil-theme={theme} className="flex w-full flex-col bg-bg text-text-primary">
      <ReplicaNav theme={theme} />
      <ReplicaHero theme={theme} />
      <ReplicaVideo theme={theme} />
      <ReplicaLogos theme={theme} />
      <ReplicaAssemblies theme={theme} />
      <ReplicaShell theme={theme} />
      <ReplicaWhoItsFor theme={theme} />
      <ReplicaFooter theme={theme} />
    </main>
  );
}
```

(Exact export names must match Wave 2; adjust imports if agents used different names — normalize here.)

- [ ] **Step 2: Wire `page.tsx` → `<HomeReplica />` inside providers already in layout.**

- [ ] **Step 3: Expand tests** — dark ids + light ids after toggle; no stale LexRf/CYfSl mismatch.

- [ ] **Step 4: `pnpm typecheck && pnpm test` GREEN.**

- [ ] **Step 5: Delete leftover unused files; update `web/README.md`.**

- [ ] Report: `.superpowers/sdd/wave-3-report.md`

---

### Wave 4 — Docker + parity (1 × composer-2.5-fast)

- [ ] `docker compose --profile prod down && docker compose --profile prod up --build -d`
- [ ] `curl -sf -o /dev/null -w "%{http_code}\n" http://localhost:3000/` → `200`
- [ ] Capture browser dark + light screenshots; compare to Pencil `TakeScreenshot` / exports under `exports/web-shelf/replica-parity/`
- [ ] Fix only token/spacing mismatches found (may touch section files — list them in report)
- [ ] Report with evidence paths; **do not claim 100% without screenshots**

---

## Controller dispatch cheatsheet

```text
# Wave 0
Task(model=composer-2.5-fast, prompt=Wave 0 brief…)

# Wave 1 — SAME MESSAGE
Task(model=composer-2.5-fast, prompt=Wave 1A dark extract…)
Task(model=composer-2.5-fast, prompt=Wave 1B light extract…)

# Wave 2 — SAME MESSAGE (8 tasks)
Task(… Nav …) Task(… Hero …) … Task(… Footer …)

# Wave 3 then Wave 4 sequential
```

## Spec coverage

| Spec requirement | Wave |
|------------------|------|
| Wipe UX | 0 |
| Dual theme + toggle | 0, 2-Nav, 3 |
| Live frame IDs both themes | 0, 2, 3 |
| 100% section replica | 1–2, 4 |
| Docker | 4 |
| Parallel Composer 2.5 | 1–2 |
| No .pen mutations | Global |

## Self-review

- No TBD placeholders.
- Parallel file ownership prevents collisions.
- Supersedes dark-only plan explicitly.
- Composer 2.5 mandated on every implementer.
- LexRf IDs are live IDs, not stale shelf-frames.
