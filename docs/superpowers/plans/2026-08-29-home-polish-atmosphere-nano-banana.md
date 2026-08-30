# HomeReplica Polish + Nano Banana 2 Atmospheres Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Polish HomeReplica with deck-true Nano Banana 2 atmospheres behind key sections, redraw/animate the four live diagrams in code, then bounded-verify desktop+mobile light+dark.

**Architecture:** Generate a paired light/dark PNG kit via Vertex `gemini-3.1-flash-image`, mount them decoratively through a shared `AtmosphereField` behind Hero/Video/Assemblies/Shell/WhoItsFor (CSS token fallback if generation fails), then refine Offerings → OCG → Integrations → InnerOuterLoop with existing motion primitives, then one Impeccable polish pass.

**Tech Stack:** Next.js · React 19 · TypeScript · Tailwind v4 · motion/react · GSAP tokens in `web/lib/motion-tokens.ts` · Vitest · Docker prod compose · gcloud + Vertex AI (`propane-galaxy-498403-n8`)

**Spec:** `docs/superpowers/specs/2026-08-29-home-polish-atmosphere-nano-banana-design.md`

## Global Constraints

1. **Refine, do not redesign** the visual world (cream `#F0E8E0` / near-black `#181810` + iridescent lavender→cyan).
2. **Model:** Nano Banana 2 = `gemini-3.1-flash-image` only (not Imagen 3, not 2.5 Flash Image).
3. **No Nano Banana diagram plates** — diagrams stay React/SVG/DOM with factual labels.
4. **Brand locks:** Autonomous DevOps Factory naming; CTA **Schedule demo**; no “Olly” / “Aiden for DevOps”; no uncleared ROI dollars.
5. **Atmospheres are decorative** (`aria-hidden`); never the sole carrier of meaning.
6. **Vertex failure must not block** polish + diagram work — CSS substrates only.
7. **Reduced motion:** assembled finals; no meaning-only infinite loops.
8. **Commits:** stage paths at task end; `git commit` only when the human asks.
9. **Verify ceiling:** one batched visual pass → one fix round → one confirm → stop.
10. **Docker demo:** `docker compose --profile prod up -d --build` → `http://localhost:3000/`.

---

## File map

| Path | Responsibility |
|------|----------------|
| `scripts/generate-atmosphere.mjs` | Vertex Nano Banana 2 generateContent → PNG kit + `manifest.json` |
| `web/public/media/atmosphere/*` | Shipped PNGs + `manifest.json` listing present files |
| `web/lib/atmosphere.ts` | Path helpers + opacity defaults per slot |
| `web/components/replica/shared/AtmosphereField.tsx` | Decorative theme-aware image layer with CSS fallback |
| `web/components/replica/sections/Hero.tsx` | Mount `hero-field` behind `GridSubstrate` |
| `web/components/replica/sections/Video.tsx` | Mount `video-still` under play UI |
| `web/components/replica/sections/Assemblies.tsx` | Mount `ground-assemblies` |
| `web/components/replica/sections/Shell.tsx` | Mount `ground-shell` |
| `web/components/replica/sections/WhoItsFor.tsx` | Mount `ground-who` |
| `web/components/replica/diagrams/Offerings.tsx` | Code redraw + assembly motion |
| `web/components/replica/diagrams/OperationalContextGraph.tsx` | Light-theme contrast + execution-wave timing |
| `web/components/replica/diagrams/Integrations.tsx` | Marquee fade/reduced-motion polish |
| `web/components/replica/diagrams/InnerOuterLoop.tsx` | Class A sim contrast/timing refine |
| `web/components/replica/motion/LayerRail.tsx` | Light-theme label contrast |
| `web/app/globals.css` | Light Tier-3 glow whisper; section spacing if needed |
| `web/content/replica.ts` | CTA consistency audit only (no claim invent) |
| `web/__tests__/atmosphere-field.test.tsx` | Decorative mount + missing-src fallback |
| Existing diagram/section tests | Update only if contracts change |

---

### Task 1: Atmosphere path helpers + failing mount test

**Files:**
- Create: `web/lib/atmosphere.ts`
- Create: `web/components/replica/shared/AtmosphereField.tsx`
- Create: `web/__tests__/atmosphere-field.test.tsx`

**Interfaces:**
- Produces:
  - `export type AtmosphereSlot = "hero-field" | "video-still" | "ground-assemblies" | "ground-shell" | "ground-who"`
  - `export type Theme = "light" | "dark"`
  - `export function atmosphereSrc(slot: AtmosphereSlot, theme: Theme): string` → `/media/atmosphere/${slot}-${theme}.png`
  - `export const ATMOSPHERE_OPACITY: Record<AtmosphereSlot, number>`
  - `export function AtmosphereField(props: { slot: AtmosphereSlot; theme: Theme; className?: string; srcOverride?: string | null }): JSX.Element`

- [ ] **Step 1: Write the failing test**

```tsx
// web/__tests__/atmosphere-field.test.tsx
import { render } from "@testing-library/react";
import { AtmosphereField } from "@/components/replica/shared/AtmosphereField";
import { atmosphereSrc } from "@/lib/atmosphere";

test("atmosphereSrc builds fixed public paths", () => {
  expect(atmosphereSrc("hero-field", "light")).toBe(
    "/media/atmosphere/hero-field-light.png",
  );
  expect(atmosphereSrc("ground-who", "dark")).toBe(
    "/media/atmosphere/ground-who-dark.png",
  );
});

test("AtmosphereField is aria-hidden and decorative", () => {
  const { container } = render(
    <AtmosphereField slot="hero-field" theme="dark" />,
  );
  const root = container.firstElementChild;
  expect(root).toHaveAttribute("aria-hidden", "true");
});

test("AtmosphereField with srcOverride null renders no img and no broken bg url", () => {
  const { container } = render(
    <AtmosphereField slot="hero-field" theme="dark" srcOverride={null} />,
  );
  expect(container.querySelector("img")).toBeNull();
  const el = container.firstElementChild as HTMLElement;
  expect(el.style.backgroundImage || "").not.toMatch(/url\(/);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd web && pnpm exec vitest run __tests__/atmosphere-field.test.tsx`
Expected: FAIL (module not found)

- [ ] **Step 3: Minimal implementation**

```ts
// web/lib/atmosphere.ts
export type AtmosphereSlot =
  | "hero-field"
  | "video-still"
  | "ground-assemblies"
  | "ground-shell"
  | "ground-who";

export type AtmosphereTheme = "light" | "dark";

export const ATMOSPHERE_OPACITY: Record<AtmosphereSlot, number> = {
  "hero-field": 0.45,
  "video-still": 0.55,
  "ground-assemblies": 0.28,
  "ground-shell": 0.22,
  "ground-who": 0.18,
};

export function atmosphereSrc(
  slot: AtmosphereSlot,
  theme: AtmosphereTheme,
): string {
  return `/media/atmosphere/${slot}-${theme}.png`;
}
```

```tsx
// web/components/replica/shared/AtmosphereField.tsx
"use client";

import { useState } from "react";
import {
  ATMOSPHERE_OPACITY,
  atmosphereSrc,
  type AtmosphereSlot,
  type AtmosphereTheme,
} from "@/lib/atmosphere";
import { cn } from "@/lib/cn";

type Props = {
  slot: AtmosphereSlot;
  theme: AtmosphereTheme;
  className?: string;
  /** Pass null to force CSS-only fallback (tests / Vertex miss). */
  srcOverride?: string | null;
};

export function AtmosphereField({
  slot,
  theme,
  className,
  srcOverride,
}: Props) {
  const resolved =
    srcOverride === undefined ? atmosphereSrc(slot, theme) : srcOverride;
  const [failed, setFailed] = useState(resolved === null);

  if (failed || resolved === null) {
    return (
      <div
        aria-hidden="true"
        className={cn("pointer-events-none absolute inset-0 -z-10", className)}
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className,
      )}
      style={{ opacity: ATMOSPHERE_OPACITY[slot] }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- decorative static public asset */}
      <img
        src={resolved}
        alt=""
        className="h-full w-full object-cover"
        onError={() => setFailed(true)}
      />
    </div>
  );
}
```

- [ ] **Step 4: Run tests — expect PASS**

Run: `cd web && pnpm exec vitest run __tests__/atmosphere-field.test.tsx`
Expected: PASS

- [ ] **Step 5: Stage (commit only if human asks)**

```bash
git add web/lib/atmosphere.ts web/components/replica/shared/AtmosphereField.tsx web/__tests__/atmosphere-field.test.tsx
```

---

### Task 2: Vertex Nano Banana 2 generator script + smoke

**Files:**
- Create: `scripts/generate-atmosphere.mjs`
- Create: `web/public/media/atmosphere/.gitkeep`

**Interfaces:**
- Consumes: gcloud access token; env `GCP_PROJECT` default `propane-galaxy-498403-n8`; `GCP_LOCATION` default `us-central1`
- Produces: PNGs at `web/public/media/atmosphere/{slot}-{theme}.png` and `manifest.json`
- CLI: `node scripts/generate-atmosphere.mjs [--slot hero-field] [--theme light] [--all]`

- [ ] **Step 1: Ensure gcloud auth works**

```bash
gcloud config get-value project
# expect: propane-galaxy-498403-n8
gcloud auth print-access-token >/dev/null && echo OK
```

If token fails: run `gcloud auth login` (and if needed `gcloud auth application-default login`), then retry. Do not proceed to generation without a token.

- [ ] **Step 2: Write generator script**

```js
// scripts/generate-atmosphere.mjs
#!/usr/bin/env node
/**
 * Nano Banana 2 (gemini-3.1-flash-image) → HomeReplica atmosphere kit.
 * Usage:
 *   node scripts/generate-atmosphere.mjs --all
 *   node scripts/generate-atmosphere.mjs --slot hero-field --theme light
 */
import { mkdir, writeFile, readFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "web/public/media/atmosphere");
const PROJECT = process.env.GCP_PROJECT || "propane-galaxy-498403-n8";
const LOCATION = process.env.GCP_LOCATION || "us-central1";
const MODEL = "gemini-3.1-flash-image";

const SLOTS = [
  "hero-field",
  "video-still",
  "ground-assemblies",
  "ground-shell",
  "ground-who",
];
const THEMES = ["light", "dark"];

const NEGATIVE =
  "no people, no faces, no hands, no logos, no brand marks, no UI chrome, no buttons, no windows, no readable text, no letters, no numbers, no watermarks, no purple-on-white SaaS cliché, no photoreal office stock photo";

function promptFor(slot, theme) {
  const plate =
    theme === "light"
      ? "warm cream plate #F0E8E0 as dominant ground"
      : "warm near-black plate #181810 as dominant ground";
  const wash =
    "soft iridescent lavender-to-cyan atmospheric wash, very subtle, factory haze abstraction, editorial B2B tech, shallow depth, soft grain";
  const role = {
    "hero-field": "full-bleed soft field for a marketing hero; quiet center, edges fall off",
    "video-still": "slightly denser field suitable behind a video placeholder; still abstract",
    "ground-assemblies": "soft section ground wash; low contrast; must not compete with diagrams",
    "ground-shell": "soft section ground wash; quieter than hero",
    "ground-who": "softest whisper wash for dense content section",
  }[slot];
  return `Abstract atmosphere texture only. ${plate}. ${wash}. Role: ${role}. ${NEGATIVE}. Square-ish 16:9 cinematic crop, seamless soft edges.`;
}

function token() {
  return execFileSync("gcloud", ["auth", "print-access-token"], {
    encoding: "utf8",
  }).trim();
}

function parseArgs(argv) {
  const out = { all: false, slot: null, theme: null };
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === "--all") out.all = true;
    if (argv[i] === "--slot") out.slot = argv[++i];
    if (argv[i] === "--theme") out.theme = argv[++i];
  }
  return out;
}

async function generateOne(slot, theme) {
  const access = token();
  const url = `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT}/locations/${LOCATION}/publishers/google/models/${MODEL}:generateContent`;
  const body = {
    contents: [
      {
        role: "user",
        parts: [{ text: promptFor(slot, theme) }],
      },
    ],
    generationConfig: {
      responseModalities: ["TEXT", "IMAGE"],
      temperature: 0.4,
    },
  };
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${access}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`${slot}-${theme}: ${res.status} ${errText.slice(0, 500)}`);
  }
  const json = await res.json();
  const parts = json?.candidates?.[0]?.content?.parts || [];
  const inline = parts.find((p) => p.inlineData?.data || p.inline_data?.data);
  const data = inline?.inlineData?.data || inline?.inline_data?.data;
  const mime =
    inline?.inlineData?.mimeType ||
    inline?.inline_data?.mime_type ||
    "image/png";
  if (!data) throw new Error(`${slot}-${theme}: no image bytes in response`);
  const ext = mime.includes("jpeg") ? "jpg" : "png";
  const file = path.join(OUT, `${slot}-${theme}.${ext === "jpg" ? "png" : "png"}`);
  // Always write .png extension; if JPEG bytes, still save as .png name only when PNG.
  // Prefer PNG: if JPEG, convert by writing bytes with .png only when mime is png.
  const outFile = path.join(OUT, `${slot}-${theme}.png`);
  await writeFile(outFile, Buffer.from(data, "base64"));
  return outFile;
}

async function writeManifest(files) {
  const manifest = { generatedAt: new Date().toISOString(), model: MODEL, files };
  await writeFile(path.join(OUT, "manifest.json"), JSON.stringify(manifest, null, 2));
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const args = parseArgs(process.argv);
  const jobs = [];
  if (args.all) {
    for (const slot of SLOTS) for (const theme of THEMES) jobs.push([slot, theme]);
  } else if (args.slot && args.theme) {
    jobs.push([args.slot, args.theme]);
  } else {
    console.error("Use --all or --slot <id> --theme <light|dark>");
    process.exit(1);
  }
  const files = [];
  for (const [slot, theme] of jobs) {
    console.log(`Generating ${slot}-${theme}…`);
    try {
      const f = await generateOne(slot, theme);
      files.push(path.basename(f));
      console.log(`  → ${f}`);
    } catch (e) {
      console.error(`  FAIL ${e.message}`);
      // continue other slots — Vertex miss must not abort kit partially if --all
    }
  }
  let prior = [];
  try {
    prior = JSON.parse(await readFile(path.join(OUT, "manifest.json"), "utf8")).files || [];
  } catch {
    /* first run */
  }
  const merged = [...new Set([...prior, ...files])];
  await writeManifest(merged);
  console.log(`Done. ${files.length}/${jobs.length} new files. Manifest has ${merged.length}.`);
  if (files.length === 0) process.exit(2);
}

main();
```

- [ ] **Step 3: Smoke one image**

```bash
mkdir -p web/public/media/atmosphere
node scripts/generate-atmosphere.mjs --slot hero-field --theme dark
ls -la web/public/media/atmosphere/hero-field-dark.png
```

Expected: PNG exists and size > 10KB. If exit 2 / API error: log the error in a short note under `.impeccable/mocks/atmosphere/README.md` and continue later tasks with CSS fallback (`onError` / missing files).

- [ ] **Step 4: Stage**

```bash
git add scripts/generate-atmosphere.mjs web/public/media/atmosphere/.gitkeep
# add PNGs + manifest only after human visual pick in Task 3
```

---

### Task 3: Generate full kit + human pick

**Files:**
- Create/overwrite: `web/public/media/atmosphere/{slot}-{theme}.png` (10 files)
- Create: `web/public/media/atmosphere/manifest.json`
- Optional rejects: `.impeccable/mocks/atmosphere/rejects/` (do not ship)

- [ ] **Step 1: Generate all slots**

```bash
node scripts/generate-atmosphere.mjs --all
```

Expected: up to 10 PNGs. If partial, keep what succeeded.

- [ ] **Step 2: Visual pick**

Open each PNG. Reject any with text, logos, UI, people, or purple-SaaS look. Re-run single slot:

```bash
node scripts/generate-atmosphere.mjs --slot video-still --theme light
```

Max 2 candidates per slot (rename reject to `.impeccable/mocks/atmosphere/rejects/`). Ship only the winner at the fixed public path.

- [ ] **Step 3: Stage winners**

```bash
git add web/public/media/atmosphere/*.png web/public/media/atmosphere/manifest.json
```

---

### Task 4: Wire atmospheres into sections

**Files:**
- Modify: `web/components/replica/sections/Hero.tsx`
- Modify: `web/components/replica/sections/Video.tsx`
- Modify: `web/components/replica/sections/Assemblies.tsx`
- Modify: `web/components/replica/sections/Shell.tsx`
- Modify: `web/components/replica/sections/WhoItsFor.tsx`
- Modify: `web/__tests__/replica-home.test.tsx` (assert `aria-hidden` atmosphere nodes if present)

**Interfaces:**
- Consumes: `AtmosphereField`, section `theme` prop

- [ ] **Step 1: Hero — field behind GridSubstrate**

In `Hero.tsx`, ensure the section is `relative`, then:

```tsx
import { AtmosphereField } from "@/components/replica/shared/AtmosphereField";

// inside section, replace absolute inset substrate wrapper contents:
<div className="absolute inset-0 -z-10 overflow-hidden">
  <AtmosphereField slot="hero-field" theme={theme} />
  <GridSubstrate />
</div>
```

- [ ] **Step 2: Video — still under play UI**

```tsx
import { AtmosphereField } from "@/components/replica/shared/AtmosphereField";

// on the inner 480px face:
<div
  className="relative flex h-[480px] w-full flex-col items-center justify-center gap-4 overflow-hidden rounded-[14px] border border-border bg-surface-raised"
  role="img"
  aria-label={`Video placeholder: ${label}`}
>
  <AtmosphereField slot="video-still" theme={theme} className="z-0" />
  <div className="relative z-10 flex flex-col items-center gap-4">
    {/* existing play button + label */}
  </div>
</div>
```

- [ ] **Step 3: Assemblies / Shell / WhoItsFor**

Each section root: add `relative overflow-hidden` if missing, then first child:

```tsx
<AtmosphereField slot="ground-assemblies" theme={theme} />
// Shell:
<AtmosphereField slot="ground-shell" theme={theme} />
// WhoItsFor:
<AtmosphereField slot="ground-who" theme={theme} />
```

Ensure diagram/content wrappers stay `relative z-10` so they paint above the field.

- [ ] **Step 4: Tests**

```bash
cd web && pnpm exec vitest run __tests__/atmosphere-field.test.tsx __tests__/replica-home.test.tsx
```

Expected: PASS. Missing PNGs still PASS via `onError` fallback.

- [ ] **Step 5: Stage**

```bash
git add web/components/replica/sections/Hero.tsx web/components/replica/sections/Video.tsx web/components/replica/sections/Assemblies.tsx web/components/replica/sections/Shell.tsx web/components/replica/sections/WhoItsFor.tsx web/__tests__/replica-home.test.tsx
```

---

### Task 5: Offerings redraw + assembly motion

**Files:**
- Modify: `web/components/replica/diagrams/Offerings.tsx`
- Test: `web/__tests__/diagram-offerings.test.tsx`

**Interfaces:**
- Consumes: `Stagger`, `DUR`/`EASE`/`STAGGER` from `motion-tokens`, `useReducedMotionSafe`
- Preserves: app titles `Aiden for SRE` / `Aiden for Automation` / `Aiden for Infrastructure`; OS groups Agent Platform / Governance / Shared Context

- [ ] **Step 1: Confirm failing/contract tests still green before edit**

```bash
cd web && pnpm exec vitest run __tests__/diagram-offerings.test.tsx
```

- [ ] **Step 2: Redraw materials (light-safe)**

- Use `bg-surface` / `bg-surface-raised` / `border-border` / `text-text-*` only (no hard-coded purple).
- Soften glass: keep `glass-specular`; ensure app cards have readable contrast on light (`text-text-primary` ≥ existing).
- Add a subtle substrate band behind OS chip groups (DOM, not image).
- Motion: apps drop/assemble with `EASE.emphasize` + `STAGGER.chip`; OS chips via existing `Stagger`. Reduced motion → `initial={false}` / no loop.

- [ ] **Step 3: Re-run offerings tests**

```bash
cd web && pnpm exec vitest run __tests__/diagram-offerings.test.tsx
```

Expected: PASS; still no “Aiden for DevOps”.

- [ ] **Step 4: Stage**

```bash
git add web/components/replica/diagrams/Offerings.tsx web/__tests__/diagram-offerings.test.tsx
```

---

### Task 6: Operational Context Graph light-theme + wave timing

**Files:**
- Modify: `web/components/replica/diagrams/OperationalContextGraph.tsx`
- Test: `web/__tests__/diagram-ocg-v2p0l.test.tsx`

**Interfaces:**
- Preserves: Intent Router; four assemblies including Automation (not DevOps); spider paths; governance chips
- Consumes: `DrawPath`, `Beam`, `Reveal`/`Stagger` as already wired; `useReducedMotionSafe`

- [ ] **Step 1: Baseline tests**

```bash
cd web && pnpm exec vitest run __tests__/diagram-ocg-v2p0l.test.tsx
```

- [ ] **Step 2: Light-theme contrast + timing refine**

- Branch stroke/fill opacities on `theme === "light"` so rails/labels clear WCAG-ish on cream (prefer token colors `text-text-secondary` / stronger borders).
- Keep execution-wave story; shorten or soften ambient loops on light if they wash out type.
- Reduced motion: final assembled graph, no wave loop.

- [ ] **Step 3: Re-run OCG tests**

```bash
cd web && pnpm exec vitest run __tests__/diagram-ocg-v2p0l.test.tsx
```

Expected: PASS including banned-name test.

- [ ] **Step 4: Stage**

```bash
git add web/components/replica/diagrams/OperationalContextGraph.tsx
```

---

### Task 7: Integrations + InnerOuterLoop polish

**Files:**
- Modify: `web/components/replica/diagrams/Integrations.tsx`
- Modify: `web/components/replica/diagrams/InnerOuterLoop.tsx`
- Test: `web/__tests__/diagram-integrations.test.tsx`

- [ ] **Step 1: Integrations**

Keep L→R marquee (`data-marquee`, duplicate set). Polish:
- Edge mask fades (existing linear-gradient masks).
- Pause on hover retained.
- `prefers-reduced-motion`: static single row, no CSS animation.
- Card materials: deck borders/surfaces only.

```bash
cd web && pnpm exec vitest run __tests__/diagram-integrations.test.tsx
```

- [ ] **Step 2: InnerOuterLoop**

Keep Class A simulation semantics. Refine:
- Light-theme stroke/label contrast.
- Timing via `DUR`/`AMBIENT` tokens only (no new magic numbers unless matching Pencil).
- Reduced motion → assembled final.

```bash
cd web && pnpm exec vitest run __tests__/sections-motion.test.tsx
```

(If InnerOuterLoop has a dedicated test file, run that too.)

- [ ] **Step 3: Stage**

```bash
git add web/components/replica/diagrams/Integrations.tsx web/components/replica/diagrams/InnerOuterLoop.tsx web/__tests__/diagram-integrations.test.tsx
```

---

### Task 8: Site-wide Impeccable polish

**Files:**
- Modify as needed: `web/content/replica.ts`, `web/components/replica/motion/LayerRail.tsx`, `web/app/globals.css`, `web/components/replica/theme/ThemeProvider.tsx`, `web/public/theme-init.js`, `web/components/replica/sections/Nav.tsx`

- [ ] **Step 1: CTA + naming audit**

Grep and fix mismatches only:

```bash
rg -n "Book Demo|Book demo|Remidiate|Operations Factory|Aiden for DevOps|Olly" web/content web/components/replica
```

Expected: no banned strings; CTAs are `Schedule demo`. Do not invent new claims.

- [ ] **Step 2: Light Tier-3 glow**

Confirm/adjust in `globals.css`:

```css
:root[data-theme="light"] .glow-source::after {
  /* keep whisper — do not increase opacity */
}
```

- [ ] **Step 3: LayerRail contrast**

Bump light-theme mono label color toward `text-text-secondary` / higher opacity so dense 10–11px labels are readable on cream.

- [ ] **Step 4: Theme hydration**

Confirm `theme-init.js` + `ThemeProvider` agree on default and `localStorage` key `stackgen-theme` (or existing `STORAGE_KEY`). Fix desync if reduced-motion path still flashes wrong theme.

- [ ] **Step 5: Section rhythm**

After atmospheres, if Assemblies/`p-24` fights hero, tighten only vertical gaps between Video→Logos→Assemblies using existing spacing tokens — no layout redesign.

- [ ] **Step 6: Stage**

```bash
git add web/content/replica.ts web/components/replica/motion/LayerRail.tsx web/app/globals.css web/components/replica/theme/ThemeProvider.tsx web/public/theme-init.js web/components/replica/sections/Nav.tsx
```

---

### Task 9: Verify ceiling (tests → Docker → detector → one fix)

**Files:** only fix files proven broken by this task’s evidence

- [ ] **Step 1: Unit suite (replica-focused)**

```bash
cd web && pnpm exec vitest run __tests__/atmosphere-field.test.tsx __tests__/replica-home.test.tsx __tests__/diagram-offerings.test.tsx __tests__/diagram-ocg-v2p0l.test.tsx __tests__/diagram-integrations.test.tsx __tests__/sections-motion.test.tsx __tests__/theme.test.tsx
```

Expected: all PASS.

- [ ] **Step 2: Docker prod rebuild**

```bash
docker compose --profile prod up -d --build
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:3000/
```

Expected: `200`.

- [ ] **Step 3: Batched visual pass**

Capture/screenshots or browser inspect:
- Desktop 1440 + mobile ~390
- Light + dark
- Sections: Hero, Video, Assemblies (3 diagrams), Shell OCG, WhoItsFor

Checklist: atmospheres soft (not overpowering); diagrams readable; no text baked into PNGs; marquees OK; reduced-motion sane if toggled.

- [ ] **Step 4: Mechanical detector once**

```bash
node /Users/swami/.cursor/skills/impeccable/scripts/detect.mjs --json \
  web/components/replica/sections/Hero.tsx \
  web/components/replica/sections/Video.tsx \
  web/components/replica/sections/Assemblies.tsx \
  web/components/replica/sections/Shell.tsx \
  web/components/replica/sections/WhoItsFor.tsx \
  web/components/replica/diagrams/Offerings.tsx \
  web/components/replica/diagrams/OperationalContextGraph.tsx \
  web/components/replica/diagrams/Integrations.tsx \
  web/components/replica/diagrams/InnerOuterLoop.tsx \
  web/components/replica/shared/AtmosphereField.tsx
```

- [ ] **Step 5: One fix batch + one confirm**

Fix only material findings from Steps 3–4. Re-run affected vitest + one Docker refresh. **Stop.** No open polish loop.

- [ ] **Step 6: Stage final deltas**

```bash
git add -u web/ scripts/generate-atmosphere.mjs web/public/media/atmosphere/
```

---

## Spec coverage (self-review)

| Spec requirement | Task |
|---|---|
| Atmosphere kit 5×2 deck-true | 2, 3 |
| Nano Banana 2 via gcloud/Vertex | 2 |
| Wire behind Hero/Video/Assemblies/Shell/WhoItsFor | 4 |
| Decorative + CSS fallback | 1, 4 |
| Diagram code redraw + animate (no Banana plates) | 5, 6, 7 |
| Offerings → OCG → Integrations → InnerOuterLoop order | 5→6→7 |
| Polish critique leftovers | 8 |
| Bounded verify + detector | 9 |
| Vertex failure non-blocking | 2 note + `onError` |

## Placeholder scan

No TBD/TODO left in task steps. Generator includes concrete prompts, paths, and CLI.

## Type consistency

`AtmosphereSlot` / `atmosphereSrc` / `AtmosphereField` names match across Tasks 1 and 4. Model id `gemini-3.1-flash-image` matches the spec.
