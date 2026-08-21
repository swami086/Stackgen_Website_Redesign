# App Replica → Next.js Pencil-to-Code Design

**Date:** 2026-08-21  
**Status:** Approved 2026-08-21 — execution via `docs/superpowers/plans/2026-08-21-app-replica-pencil-to-next.md`  
**Source canvas:** `Stack_Linear.pen` (App Replica frames only)  
**Target:** `web/` (fresh scaffold) + root `docker-compose.yml` profile `prod`  
**Skills:** `pencil-to-code`, `engineering-skills2` → `senior-frontend`, `using-superpowers` / brainstorming  
**Approach:** Structured React port (Approach 1) — one component tree per page; light/dark via themed `ds-*` tokens

---

## 1. Decisions locked in intake

| Decision | Choice |
|---|---|
| Scope | **A** — all 18 App Replica frames (9 pages × light + dark) |
| Codebase base | **A** — fresh Next.js scaffold in `web/`; keep existing `web/public/media` |
| Theme mapping | **A** — one route per page + `data-theme` token swap; in-app toggle + `localStorage` |
| Docker | **A** — compose **`prod`** only → `http://localhost:3000` |
| Viewport | **A** — desktop 1440 fidelity only; no invented mobile layout |
| Implementation approach | **1** — structured React/Tailwind port; Pencil screenshots as golden masters for QA |

---

## 2. Non-negotiables

- **100% fidelity** to App Replica frames: no invented copy, metrics, logos, or section reordering.
- **Do not modify** `Stack_Linear.pen` as part of this work.
- **Placeholder canvas copy stays placeholder** (especially News “Placeholder Items”).
- **Company / Login** appear as nav labels only — there is no App Replica page for Company; do not invent a Company page. Href = canvas destination if present; otherwise non-navigating `#`.
- **Product naming** stays canvas-exact: Aiden for Infrastructure · Automation · Observability · SRE.
- **Primary CTA** copy from canvas (“Schedule demo”); do not add extra CTAs beyond what replicas show.

---

## 3. Frame → route map

| Route | Light frame | Dark frame |
|---|---|---|
| `/` | `nwYaY` Replica — Home | `y1kHUi` |
| `/product/aiden-for-infrastructure` | `qwI1S` | `GGu5s` |
| `/product/aiden-for-automation` | `llzpJ` | `ZjYRz` |
| `/product/aiden-for-observability` | `JQkAE` | `VB4gY` |
| `/product/aiden-for-sre` | `TIh4G` | `Q6ZkwE` |
| `/platform` | `kQPf7` | `ueTsZ` |
| `/enterprise` | `o8Fqkk` | `R08yJ` |
| `/pricing` | `V8R69l` | `xLEsu` |
| `/news` | `o303yj` | `TtoXl` |

Nav labels observed on Home replica: Product · Platform · Enterprise · Pricing · News · Company · Login · Schedule demo.

**Nav href wiring (explicit — canvas has labels only, no dropdown chrome):**

| Label | Href |
|---|---|
| Logo | `/` |
| Product | `/product/aiden-for-infrastructure` (no invented mega-menu; Platform page carries the four product links) |
| Platform | `/platform` |
| Enterprise | `/enterprise` |
| Pricing | `/pricing` |
| News | `/news` |
| Company | `#` (no App Replica page) |
| Login | `#` (no auth surface in replicas) |
| Schedule demo | canvas-exact destination if present on the CTA node; else `#` |

---

## 4. Theme system

Canvas already defines themed design-system variables (`ds-*`) with axis `mode: ["light","dark"]` (examples: `ds-bg`, `ds-surface`, `ds-text-primary`, `ds-accent`, `ds-pad-x`, `ds-radius-*`, fonts Inter / JetBrains Mono).

**Runtime mapping:**

1. Extract `ds-*` (and any replica-specific overrides required for parity) into CSS custom properties under `@theme` / `:root` and `[data-theme="dark"]`.
2. Set `data-theme` on `<html>` (default **`light`** to match primary replica column).
3. Client `ThemeProvider` + toggle; persist preference in `localStorage`.
4. If replicas lack a visible toggle control, add a minimal toggle that does **not** invent new marketing chrome beyond what is needed for the dual-mode requirement; document as intentional chrome.

Do **not** maintain parallel `/dark` route trees.

---

## 5. Section inventory (port order)

### Home (`nwYaY` / `y1kHUi`)

Nav → Hero → Logos → Surfaces → Mechanism → Problem → Factory Process → ADF Loop → Agentic OS → Operational Context Graph → Integrations → In Their Words → Industries → Compliance → Use Cases → Final CTA

### Product ×4

Nav → Hero → Metrics → Key Capabilities → Mechanism → **[Early Access Strip — Infrastructure only]** → Testimonial → Final CTA → Footer

### Platform (`kQPf7` / `ueTsZ`)

Nav → Hero → Trusted By → By The Numbers → Two Planes → Operational Context Graph → Aiden OS and Product Links → Compliance → Final CTA → Footer

### Enterprise (`o8Fqkk` / `R08yJ`)

Nav → Hero → Metrics → Enterprise Capabilities → Compliance → Testimonial → Final CTA → Footer

### Pricing (`V8R69l` / `xLEsu`)

Nav → Hero → Pricing Model → Public Web Rules → FAQ → Footer

### News (`o303yj` / `TtoXl`)

Nav → Hero → Real Momentum → Placeholder Items → Footer

---

## 6. Frontend architecture

```
web/
  app/
    layout.tsx              # fonts, ThemeProvider, globals
    page.tsx                # Home
    product/[slug]/page.tsx
    platform/page.tsx
    enterprise/page.tsx
    pricing/page.tsx
    news/page.tsx
  components/
    layout/                 # Nav, Footer, ThemeToggle, ThemeProvider
    primitives/             # Logo, ButtonPrimary, ButtonGhost, MonoLabel, …
    sections/
      home/
      product/
      platform/
      enterprise/
      pricing/
      news/
  content/                  # typed modules; strings extracted from Pencil only
  lib/                      # cn(), nav config, theme helpers, types
  public/media/             # existing product UI assets (reuse)
  Dockerfile                # multi-stage → runner for compose prod
  package.json              # pnpm
```

**Rules:**

- Server Components by default; `'use client'` only for theme toggle, nav interactivity, video players if needed.
- Reuse primitives across pages; page sections compose primitives + content modules.
- Content modules are extraction artifacts from Pencil — not a place to rewrite marketing.

---

## 7. Stack defaults

| Concern | Choice |
|---|---|
| Framework | Next.js App Router (latest stable) + React + TypeScript |
| Styling | Tailwind CSS v4 + `@theme` from `ds-*` |
| Fonts | Inter + JetBrains Mono |
| Package manager | pnpm |
| Media | `next/image` for stills; `<video>` for existing loop MP4s under `public/media` |
| Tests | Minimal smoke (route renders / `data-theme`); visual fidelity is the gate |
| Docker | `web/Dockerfile` multi-stage; root compose profile **`prod`** on port **3000** |

---

## 8. Build sequence

1. Scaffold Next.js in `web/` + map `ds-*` tokens + ThemeProvider + Dockerfile wired to existing compose `prod`.
2. Primitives + Nav + Footer (from shared replica patterns).
3. Home full section stack.
4. Product section template → four slugs (Infra Early Access Strip conditional).
5. Platform → Enterprise → Pricing → News.
6. Fidelity QA (screenshots) + `docker compose --profile prod up --build` smoke on all 9 routes.

---

## 9. Fidelity QA checklist

1. Per page: Pencil `TakeScreenshot` of light + dark frames vs browser at **1440** width.
2. Token spot-check: `ds-bg`, `ds-text-*`, `ds-accent`, radii, padding.
3. Section order and count match §5.
4. Product UI media resolves from `web/public/media` (or canvas-referenced assets copied into `public/`); no stock substitutes.
5. Theme toggle: light ↔ dark without inventing layout differences beyond paired frames.
6. Cold Docker prod bring-up serves all 9 routes without requiring host `pnpm install` for the demo path.

---

## 10. Success criteria

1. All 9 routes live at `http://localhost:3000` via `docker compose --profile prod up --build`.
2. Each route supports light and dark with visual parity to paired App Replica frames at 1440.
3. Zero invented copy.
4. Section order/count matches this spec.
5. Existing media reused where frames reference product UI.

---

## 11. Out of scope (Wave 1)

- Mobile / responsive invented layouts
- Compose `dev` profile
- Editing `Stack_Linear.pen`
- CMS, auth for Login, inventing Company page content
- SEO content expansion beyond canvas copy
- Restoring legacy Wave-1 stubs from `.worktrees/*/web` as runtime source

---

## 12. Process

Spec (this file) → **user review** → `writing-plans` → implement via `pencil-to-code` + `senior-frontend` → visual QA → Docker prod demo.
