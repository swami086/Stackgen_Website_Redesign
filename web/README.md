# StackGen Wave 1 — Next.js review prototype

Desktop-only, pixel-parity review build of the StackGen marketing redesign. This is a **Wave 1 review prototype**, not a production site: fixed 1440px layout, no responsive breakpoints below 1440px, and motion is stubbed for Wave 2.

**Branch:** `wave1-nextjs`  
**Spec:** `docs/superpowers/specs/2026-08-20-stackgen-nextjs-app-design.md`  
**Accepted departures:** `../docs/superpowers/wave1-deviations.md` (local; folder is gitignored)

---

## Prerequisites

| Path | Requirements |
|------|----------------|
| **Docker (recommended)** | Docker Engine **28+**, Docker Compose v2 |
| **Local dev** | **Node.js 24**, **pnpm 11** (via Corepack) |

From the repo root, all Docker commands use `docker-compose.yml`. Package scripts run from `web/`.

---

## Quick start — review in Docker (prod)

One-command path to serve the production build at [http://localhost:3000](http://localhost:3000):

```bash
# repo root
docker compose --profile prod up --build
```

Wait until the container is healthy, then open the site:

```bash
curl -sf http://localhost:3000/   # expect HTTP 200
```

Stop when done:

```bash
docker compose --profile prod down
```

Detached mode (background):

```bash
docker compose --profile prod up --build -d
docker compose --profile prod down
```

---

## Hot reload — Docker dev profile

For local iteration with file sync and Next.js dev server:

```bash
docker compose --profile dev up --build
```

Same port (`3000`). Uses the `builder` stage and `pnpm dev` with Compose `develop.watch` syncing `./web` into the container.

---

## Local dev (without Docker)

```bash
cd web
corepack enable
pnpm install
pnpm dev          # http://localhost:3000
```

Production build locally:

```bash
cd web
pnpm build
pnpm start
```

---

## Verification commands

Run from `web/` unless noted. These commands were verified on **2026-08-20** on branch `wave1-nextjs`.

| Command | Purpose |
|---------|---------|
| `pnpm typecheck` | TypeScript strict check (`tsc --noEmit`) |
| `pnpm test` | Vitest unit + component tests (157 tests) |
| `pnpm build` | Next.js production build |
| `pnpm exec playwright test` | E2E (requires app on `:3000`) |
| `pnpm exec playwright test e2e/a11y.spec.ts` | axe WCAG audit (11 routes) |
| `pnpm exec playwright test e2e/parity.spec.ts` | Full-page screenshots vs canvas |

**Playwright** expects the prod container (or `pnpm start`) at `http://localhost:3000` with viewport **1440×1024** (see `playwright.config.ts`):

```bash
# repo root
docker compose --profile prod up --build -d
curl -sf http://localhost:3000/

cd web
pnpm exec playwright test              # all e2e specs
pnpm exec playwright test e2e/a11y.spec.ts

docker compose --profile prod down     # from repo root
```

---

## Folder map

```
web/
├── app/                    # Next.js App Router pages & layouts
│   ├── page.tsx            # Home (Wave 1 full)
│   ├── platform/
│   ├── product/[slug]/     # Four Aiden product pages
│   ├── case-studies/
│   ├── schedule-demo/
│   └── …                   # Stub routes (pricing, about, …)
├── components/
│   ├── primitives/         # Nav, Footer, buttons, MetricCell, …
│   ├── sections/           # Page sections (home, product, platform, case, demo)
│   ├── diagrams/           # Live SVG diagrams (geometry-driven)
│   ├── motion/             # Wave 2 hooks (inert in Wave 1)
│   └── ChangeSurface.tsx   # TIRITH policy diff block
├── content/                # Typed copy modules (PRODUCT.md governance)
├── lib/                    # nav.ts, types.ts
├── public/logos/           # Customer + tool SVG assets
├── scripts/                # extract-geometry.mjs (Pencil → JSON)
├── e2e/                    # Playwright parity + a11y specs
├── geometry/               # Committed diagram JSON (subset; full set in design-reference/)
├── Dockerfile              # node:24-alpine multi-stage
└── package.json
```

Repo root:

```
docker-compose.yml          # profiles: prod | dev
design-reference/           # gitignored — canvas PNG + geometry exports
Stack_Linear.pen            # Pencil source (read-only via MCP)
PRODUCT.md                  # Copy/naming source of truth
```

---

## Design tokens (no raw hex in components)

All colours live in `app/globals.css` under Tailwind v4 `@theme` and mirror the canvas variables. Use semantic Tailwind classes in components — **never hard-code hex** in TSX/CSS modules.

| Token | CSS variable | Typical use |
|-------|--------------|-------------|
| `bg-bg-base` | `--color-bg-base` | Page background |
| `bg-surface-card` | `--color-surface-card` | Cards, diagram frames |
| `text-text-primary` | `--color-text-primary` | Headlines, body |
| `text-text-secondary` | `--color-text-secondary` | Supporting copy |
| `text-accent-text` | `--color-accent-text` | Accent **text** below 24px (AA) |
| `bg-accent` / `border-accent` | `--color-accent` | Fills, rules, borders, display type 24px+ |
| `font-mono` | `--font-mono` | Mono labels (JetBrains Mono) |
| `px-pad-x` / `py-pad-y` | `--spacing-pad-x/y` | Section padding (100px / 120px) |

**Contrast rule (Global Constraint 6):** `#9437FF` accent fails AA on dark bg for small text. Use `text-accent-text` (`#C9A2FF`) for accent-coloured copy under 24px (or 19px+ bold). This is the one pre-approved pixel-parity deviation.

Body enforces `min-width: 1440px` — desktop-only by design.

---

## Regenerating `design-reference/`

The `design-reference/` folder at the repo root is **gitignored**. Regenerate when `Stack_Linear.pen` changes.

See `design-reference/README.md` for node ID mappings. Summary:

**Geometry JSON** (diagram frames):

```bash
cd web
node scripts/extract-geometry.mjs <nodeId> <name>
# Save MCP Print output to design-reference/geometry/<name>.json
```

**Screen PNGs** (10 Wave 1 frames) — Pencil MCP `execute`:

```js
Export(["JLg8h","T4FJtW","zTOam","OAfMk","bEaQH","HL34b","k1XEU","gYoDZ","YEXx8","K6I26T"],
       "png", "./design-reference/png", { scale: 1 });
```

**Parity screenshots** (built app vs canvas):

```bash
mkdir -p design-reference/actual
docker compose --profile prod up --build -d
curl -sf http://localhost:3000/
cd web && pnpm exec playwright test e2e/parity.spec.ts
docker compose --profile prod down
```

---

## Wave 2 motion contract (hooks only in Wave 1)

Motion is **not implemented** in Wave 1. These APIs exist so Wave 2 can add animation without reflow:

| Hook | Location | Wave 1 behaviour |
|------|----------|------------------|
| `MotionProvider` | `components/motion/MotionProvider.tsx`, wrapped in `app/layout.tsx` | Inert pass-through; Wave 2 hosts reduced-motion context |
| `Reveal` | `components/motion/Reveal.tsx` | Renders children with no wrapper or animation; wrap major sections |
| `data-part` | Diagram SVG elements | Identifies animatable parts (e.g. `data-part="agent-card"`) |
| `data-index` | Repeated diagram nodes | Disambiguates lists (e.g. `data-index={i}` on metrics) |

**Rules for Wave 2:** only animate `transform`, `opacity`, `filter`, `clip-path` — never properties that shift layout.

Example diagram usage:

```tsx
<g data-part="step-content" data-index={2}>
  …
</g>
```

Example section usage:

```tsx
<Reveal>
  <section>…</section>
</Reveal>
```

---

## Wave 1 routes (review scope)

| Route | Status |
|-------|--------|
| `/` | Full |
| `/platform` | Full |
| `/product/aiden-for-infrastructure` | Full |
| `/product/aiden-for-automation` | Full |
| `/product/aiden-for-observability` | Full |
| `/product/aiden-for-sre` | Full |
| `/case-studies` | Full |
| `/case-studies/greythr` | Full |
| `/case-studies/innovaccer` | Full |
| `/schedule-demo` | Full |
| `/pricing`, `/about`, … | Coming-soon stubs |

Primary CTA on every page: **Schedule demo** → `/schedule-demo`.
