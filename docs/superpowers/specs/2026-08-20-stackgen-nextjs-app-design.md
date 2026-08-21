# StackGen Next.js App — Design Spec (Wave 1)

**Date:** 2026-08-20
**Status:** Approved for planning
**Reads:** `PRODUCT.md` · `docs/superpowers/specs/2026-08-19-site-ia-page-briefs.md` · `docs/proof/customer-logos-and-quotes.md` · `Stack_Linear.pen`
**Supersedes:** nothing. This is the first code-implementation spec in the project; all prior specs govern the design canvas.

---

## 1. Goal

Build a high-fidelity, desktop-only Next.js prototype of the StackGen redesign, running on `localhost:3000` inside a Docker container, reproducing the `Stack_Linear.pen` canvas at pixel-parity and architected so that cinematic scroll motion can be added in Wave 2 without refactoring.

**This is a review artifact**, not production stackgen.com. Its job is stakeholder sign-off on the redesign.

### Locked decisions

| Decision | Value | Rationale |
|---|---|---|
| Scope | P0 + P1 pages (9 routes) + Schedule Demo | User selection, 2026-08-20 |
| Fidelity | Pixel-parity to the canvas at 1440px | User selection |
| Responsive | Desktop-only; mobile deferred to a later wave | User selection |
| Purpose | Clickable review prototype, forms and analytics stubbed | User selection |
| Motion | Cinematic and scroll-driven, Wave 2. Diagrams built as live SVG now | User selection |
| Approach | Export-assisted component build (canvas geometry drives parity) | User selection |
| Out-of-scope routes | Shared "coming in a later wave" page, real nav and footer | User selection |

### Non-goals

- Mobile and tablet layouts. The canvas has one mobile screen (Home, `A38GWG`); the other eight pages have no mobile design authored. Deferred.
- CMS, database, authentication, form submission, analytics, search.
- Motion implementation. Wave 1 ships the architecture for it and nothing more.
- Solutions IA, Partners, Platform children, Pricing, Contact, About, MCP Server as real pages.
- Deployment beyond `localhost`.

---

## 2. Source of truth

Three sources, in precedence order when they conflict:

1. **`PRODUCT.md`** — naming table, voice rules, evidence rules. Binding and non-negotiable. The naming table is fixed vocabulary, not copy to be improved.
2. **`Stack_Linear.pen`** — visual truth: geometry, tokens, section order, layout.
3. **`docs/superpowers/specs/2026-08-19-site-ia-page-briefs.md`** — IA, routes, per-page job.

If canvas copy contradicts `PRODUCT.md` (for example an "Aiden for InfraOps" string survives somewhere), `PRODUCT.md` wins and the deviation is logged in the lane report. **Do not silently rewrite canvas copy for any other reason.** Copy changes are the user's call.

---

## 3. Stack

| Layer | Choice | Version |
|---|---|---|
| Framework | Next.js App Router | 16.3 |
| Runtime | React | 19.2 |
| Language | TypeScript, `strict: true` | 5.x |
| Bundler | Turbopack (Next 16 default) | — |
| Styling | Tailwind CSS v4, CSS-first `@theme` | 4.x |
| Motion | `motion` (motion.dev) — installed Wave 1, used Wave 2 | latest stable, pinned at install |
| Fonts | `next/font/google`, self-hosted Inter + JetBrains Mono | — |
| Package manager | pnpm | 11.x |
| Container | Docker multi-stage, `node:24-alpine` | Docker 28.x |

Verified locally: Node 24.13.0, pnpm 11.4.0, Docker 28.5.2.

No state management library, no data fetching library, no component library. Wave 1 renders static content; adding any of these would be unused weight.

---

## 4. Repository layout

```
Stackgen_Website_Redesign/            # existing dir, becomes a git repo
├── web/                              # the Next.js app
│   ├── app/
│   │   ├── layout.tsx                # html shell, fonts, MotionProvider
│   │   ├── globals.css               # @theme tokens, base layer
│   │   ├── page.tsx                  # Home
│   │   ├── product/[slug]/page.tsx   # 4 product pages
│   │   ├── platform/page.tsx
│   │   ├── case-studies/
│   │   │   ├── page.tsx
│   │   │   ├── greythr/page.tsx
│   │   │   └── innovaccer/page.tsx
│   │   ├── schedule-demo/page.tsx
│   │   └── (later-wave)/             # route group → shared ComingSoon page
│   ├── components/
│   │   ├── primitives/               # 8 canvas components
│   │   ├── sections/                 # one per canvas section frame
│   │   ├── diagrams/                 # SVG diagram components
│   │   └── motion/                   # Reveal, MotionProvider
│   ├── content/                      # typed copy modules, one per page
│   ├── lib/
│   ├── public/logos/                 # 12 customer + 8 tool logos
│   ├── Dockerfile
│   └── next.config.ts
├── design-reference/                 # GITIGNORED — canvas PNG + HTML exports
├── docker-compose.yml
└── docs/superpowers/specs/
```

`git init` runs at the repo root. `.gitignore` gains `design-reference/`, `node_modules/`, `.next/`, and keeps the existing `.firecrawl/` and `.figma-assets/` entries.

---

## 5. Design tokens

All 22 variables in `Stack_Linear.pen` map one-to-one into a Tailwind v4 `@theme` block in `web/app/globals.css`. Hex values are copied verbatim from the canvas; the canvas remains the source of truth.

```css
@theme {
  --color-bg-base: #08090A;
  --color-bg-raised: #0E0F11;
  --color-surface-card: #101113;
  --color-surface-sunken: #050506;
  --color-border-hairline: #1F2023;
  --color-border-card: #26272B;
  --color-text-primary: #F7F8F8;
  --color-text-secondary: #8A8F98;
  --color-text-tertiary: #7E838C;
  --color-accent: #9437FF;
  --color-accent-text: #C9A2FF;
  --color-accent-dim: #2A1447;
  --color-accent-glow: #9437FF40;
  --color-accent-subtle: #9437FF1A;
  --color-glass-bg: #08090ACC;
  --color-glass-border: #FFFFFF14;
  --color-pass: #4ADE80;
  --color-halt: #F0883E;
  --font-sans: var(--font-inter);
  --font-mono: var(--font-jetbrains-mono);
  --spacing-pad-x: 100px;
  --spacing-pad-y: 120px;
}
```

### Contrast rule (binding)

Measured against `--color-bg-base` `#08090A`:

| Token | Ratio | Verdict |
|---|---|---|
| `text-primary` `#F7F8F8` | 18.1:1 | Pass AA and AAA |
| `text-secondary` `#8A8F98` | 6.1:1 | Pass AA |
| `text-tertiary` `#7E838C` | 5.2:1 | Pass AA |
| `accent` `#9437FF` | 4.03:1 | **Fails AA for body text**; passes 3:1 for large text and UI |
| `accent-text` `#C9A2FF` | 9.6:1 | Pass AA and AAA |

**Rule:** `--color-accent` is for fills, rules, borders, and display type at 24px+ / 19px+ bold. Any accent-coloured text below that threshold uses `--color-accent-text`. This preserves the brand accent while honouring the WCAG 2.2 AA commitment in `PRODUCT.md`.

Where the canvas uses `#9437FF` for body-size text, switching to `#C9A2FF` is an approved, logged deviation from pixel-parity. It is the only category of colour deviation permitted without asking the user.

---

## 6. Page and section mapping

Read from `Stack_Linear.pen` on 2026-08-20. Canvas node IDs are recorded so implementation can read exact geometry rather than estimate it.

### Home — `JLg8h` (1440 × ~9296)

| Order | Section | Node | Height | Build as |
|---|---|---|---|---|
| 1 | Nav Desktop | `N6udS` | 60 | Primitive (client) |
| 2 | Hero | `XPc1X` | 474 | DOM |
| 3 | Mechanism | `sK5Fc` | 619 | DOM (change surface, `<pre><code>`) |
| 4 | Logos | `d751F` | 162 | DOM + SVG logo files |
| 5 | Problem | `vU48B` | 1481 | SVG diagram |
| 6 | Factory Process | `pnlIy` | 604 | SVG diagram |
| 7 | ADF Loop | `t5DPzG` | 870 | SVG diagram |
| 8 | Agentic OS | `YQTAQ` | 964 | SVG diagram |
| 9 | Operational Context Graph | `RBIMd` | 543 | SVG diagram |
| 10 | Integrations | `K1zfG` | 1278 | DOM + SVG logo files |
| 11 | In Their Words | `f4Wpn4` | 714 | DOM |
| 12 | Compliance | `sWPEe` | 652 | DOM |
| 13 | Final CTA | `ZHuzU` | 875 | DOM |

**Open parity item:** the Home frame has no Footer child, unlike every other page. Lane 1 resolves this by appending the shared `Footer` primitive and logging it as an intentional addition, unless the user directs otherwise.

### Product pages

All four share one template with per-page content and one distinct diagram each.

| Page | Route | Node | Sections |
|---|---|---|---|
| Aiden for Infrastructure | `/product/aiden-for-infrastructure` | `T4FJtW` | Nav, Hero `GJDna`, Metrics `QP77r`, Mechanism `w8Wb0v`, Early Access Strip `lUtF2`, Final CTA `v47e5`, Footer |
| Aiden for Automation | `/product/aiden-for-automation` | `zTOam` | Nav, Hero `o2H1D`, Metrics `AauBS`, Mechanism `u2Jbr`, Final CTA `gLZpr`, Footer |
| Aiden for Observability | `/product/aiden-for-observability` | `OAfMk` | Nav, Hero `j5Bg3l`, Metrics `V3fts`, Mechanism `y3RwQr`, Final CTA `t5O6v`, Footer |
| Aiden for SRE | `/product/aiden-for-sre` | `bEaQH` | Nav, Hero `RfraO`, Metrics `fYn6m`, Mechanism `k3S5j`, Final CTA `GuzVo`, Footer |

Infrastructure carries an Early Access Strip the others lack; the template renders it conditionally from content, not from a branch in JSX.

### Platform — `HL34b` (1440 × 3338)

Nav, Hero `Q3gT0H`, Two Planes `KGZ7Q`, Operational Context Graph `O4fic7`, Aiden OS and Product Links `gWRK3`, Final CTA `q8grMq`, Footer.

`O4fic7` is a larger variant of Home's `RBIMd`. Both render from one parameterised `OperationalContextGraph` component with a `variant` prop, not two copies.

### Case Studies

| Page | Route | Node | Sections |
|---|---|---|---|
| Index | `/case-studies` | `k1XEU` | Nav, Hero `eeTWI`, Featured `j3jJ5`, Final CTA `qIKEH`, Footer |
| greytHR | `/case-studies/greythr` | `gYoDZ` | Nav, Hero `Z1p1oB`, Metrics `UUADq`, Final CTA `o0WWaf`, Footer |
| Innovaccer | `/case-studies/innovaccer` | `YEXx8` | Nav, Hero `IFvsO`, Final CTA `yhFJB`, Footer |

### Schedule Demo — `K6I26T`

Nav, Hero `e05qlm`, Form Stub `a8pHq`, Footer. Built as a real page despite P2 priority because it is the destination of the only primary CTA on all nine other pages; a dead end there would invalidate the flow under review. The form renders and validates client-side but does not submit; on submit it shows an inline "prototype — not wired" state.

### Later-wave routes

One shared `ComingSoon` page, rendered via a route group at: `/about`, `/pricing`, `/contact`, `/mcp-server`, `/platform/integrations`, `/platform/cloud-to-code`, `/platform/custom-policies`, `/platform/iac-lifecycle`, `/solutions`, `/partners`. Real nav and footer, on-brand, one line of copy, and a Schedule demo CTA.

---

## 7. Component architecture

### Tier 1 — primitives (`components/primitives/`)

Direct ports of the canvas's eight reusable components: `Nav`, `Logo`, `ButtonPrimary`, `ButtonGhost`, `MonoLabel`, `MetricCell`, `SectionHeaderSplit`, `Footer`.

All server components except `Nav`, which is `'use client'` for interactive state. Wave 1 ships near-zero client JavaScript.

### Tier 2 — sections (`components/sections/`)

One component per canvas section frame, named to match the canvas layer name. A page is an ordered list of sections and nothing else. This keeps a one-to-one mental map between canvas and code, so "fix the Agentic OS section" resolves to exactly one file in each place.

Sections take their copy as props from the page's content module. They contain no hardcoded strings.

### Tier 3 — diagrams (`components/diagrams/`)

Roughly twelve components: five on Home (Problem, Factory Process, ADF Loop, Agentic OS, Operational Context Graph), four product Mechanism diagrams, and three on Platform (Two Planes, the Operational Context Graph variant, Aiden OS and Product Links). Rules, all binding:

1. **One `<svg>` per diagram**, `viewBox` matching the canvas frame's dimensions exactly.
2. **Geometry is read, not estimated.** Coordinates come from `ctx.bounds` on the `.pen` nodes via the Pencil MCP `Get` visitor, transcribed into the SVG. This is what makes pixel-parity achievable for diagrams.
3. **Every animatable part carries `data-part` and, where repeated, `data-index`.** Wave 2 motion targets these selectors. No refactor.
4. **Text is real SVG `<text>`**, never converted to paths. Selectable, translatable, readable.
5. **Meaningful diagrams get `role="img"`**, a `<title>`, a `<desc>`, and `aria-labelledby` wiring. Purely decorative parts get `aria-hidden="true"`.
6. **Server components by default.** Wave 2 wraps them in thin client boundaries; the SVG stays server-rendered so first paint is immediate.

**Exception — the change surface.** Home's Mechanism section (`sK5Fc`) and the product Mechanism sections are typographic content, not geometry: intent line, generated Terraform diff, Tirith policy verdict, merge target. These are DOM and CSS with a real `<pre><code>` block, so the diff is selectable and screen-readable. Building them as SVG would make the artifact — the thing the direction contract says must carry the proof — unreadable to assistive technology.

### Tier 4 — motion scaffolding (`components/motion/`)

Ships in Wave 1 as inert pass-throughs:

- `MotionProvider` — client boundary in `layout.tsx`. Wave 1: renders children. Wave 2: hosts config and reduced-motion context.
- `Reveal` — wraps sections and diagram parts. Wave 1: renders children unchanged, emits no DOM. Wave 2: becomes the scroll-reveal primitive.

Rules encoded from day one:
- `prefers-reduced-motion` respected via `useReducedMotion()` plus a global CSS fallback in `globals.css`.
- Only `transform`, `opacity`, `filter`, `clip-path` are animated.
- No animation may shift layout. Sections reserve their final space.

---

## 8. Content model

Typed modules in `content/`, one per page: `home.ts`, `product-infrastructure.ts`, `platform.ts`, and so on. Each exports a typed object consumed by that page's sections.

The types enforce the governance rules in `PRODUCT.md` at compile time:

```ts
export type Quote = {
  text: string;
  attribution: string;
  status: 'published' | 'placeholder';   // required
  sourceUrl?: string;                    // required when status is 'published'
};

export type Metric = {
  value: string;
  label: string;
  mechanism: string;                     // required — PRODUCT.md: metrics cite a mechanism
};
```

An unlabelled quote or a mechanism-less metric becomes a type error, not a review miss. Placeholder quotes render with a visible `PLACEHOLDER` marker in the prototype so no reviewer mistakes one for real customer voice.

Copy is transcribed from the canvas verbatim, subject only to the `PRODUCT.md` precedence rule in §2.

---

## 9. Assets

| Asset | Source | Destination |
|---|---|---|
| 12 customer logos | `.firecrawl/logos-quotes/assets/` (SVG, one PNG, one WebP) | `web/public/logos/customers/` |
| 8 tool logos (AWS, Azure, GCP, Kubernetes, Docker, Terraform, Git, SonarQube) | Canvas components — export as SVG via Pencil | `web/public/logos/tools/` |
| StackGen wordmark and icon mark | Canvas paths `JJx7F` | Inline React SVG component |

`.firecrawl/` is gitignored, so logo files are **copied** into `web/public/`, not referenced in place. Copying is a one-time setup step in Lane 0.

No AI-generated or stock imagery. The direction contract refuses decorative abstraction; every visual is the mechanism or a real logo.

---

## 10. Docker

**`web/Dockerfile`** — three stages:

1. `deps` — `pnpm install --frozen-lockfile`, cached on lockfile only.
2. `builder` — `next build` with `output: 'standalone'` in `next.config.ts`.
3. `runner` — `node:24-alpine`, copies `.next/standalone`, `.next/static`, `public`. Runs as non-root `nextjs` user. `EXPOSE 3000`. `HEALTHCHECK` hitting `/`.

Target image size under 200MB.

**`docker-compose.yml`** — two profiles, both binding `localhost:3000`:

| Profile | Command | Purpose |
|---|---|---|
| `dev` | `pnpm dev` with bind mount and Compose Watch | Hot reload during lane work |
| `prod` | Standalone server from the built image | The review deliverable |

`docker compose --profile prod up` is the single command that produces the review site.

---

## 11. Verification

Bounded passes, not an open-ended polish loop. Per lane:

1. Export that lane's canvas screens as PNG at 1440 into `design-reference/`.
2. Run the app in the dev container, screenshot each route at 1440 width, full height.
3. **One batched comparison pass.** Record every defect in a single list.
4. **Fix everything in that list in one batch.**
5. **One confirmation pass.** Stop.

Deviations found and accepted (contrast substitutions, the Home footer addition, any `PRODUCT.md` copy overrides) are logged in a per-lane report under `.superpowers/sdd/`, following the convention already used in this project.

### Accessibility — WCAG 2.2 AA, desktop scope

In scope and enforced: semantic landmarks; exactly one `h1` per page with sequential heading levels; native `<button>` and `<a>` for all interactives; visible `:focus-visible` indicators meeting 3:1 against adjacent colour; the §5 contrast rule; SVG diagram text alternatives; `aria-hidden` on decorative layers; `prefers-reduced-motion` honoured.

**Accepted deviation, recorded not hidden:** SC 1.4.10 Reflow will not pass, because the build is scoped desktop-only at a fixed 1440px composition. SC 1.4.4 Resize Text is partially at risk for the same reason. Both are resolved when the deferred mobile wave lands. This spec does not claim full AA conformance; it claims AA on every criterion that a fixed-width desktop artifact can satisfy.

---

## 12. Build sequence

Five lanes. Each ends with something viewable in the container.

| Lane | Work | Done when |
|---|---|---|
| **0 — Foundation** | `git init`; scaffold `web/`; tokens; fonts; copy logo assets; Dockerfile and compose; 8 primitives; root layout; Nav and Footer; motion scaffolding; `ComingSoon` page and later-wave routes | `docker compose --profile prod up` serves a tokenised shell with working nav and footer at `localhost:3000` |
| **1 — Home** | 13 sections, 5 SVG diagrams, the change surface, `content/home.ts`; verification pass | Home matches the canvas in the batched comparison |
| **2 — Products** | Shared product template, 4 content modules, 4 Mechanism diagrams, Metrics, Early Access Strip; verification pass | All four product routes match |
| **3 — Platform + Cases** | Platform page with Two Planes, OCG variant, Aiden OS links; 3 case pages; verification pass | All four routes match |
| **4 — Schedule Demo + close-out** | Schedule Demo page and stubbed form; full-site a11y pass; deviation log; README | Nine routes plus Schedule Demo walkable end to end with no dead ends |

**Wave 2 — motion.** Separate spec, separate plan. Not started until Wave 1 is signed off.

---

## 13. Risks

| Risk | Mitigation |
|---|---|
| Diagram transcription is the dominant cost and could stall a lane | Geometry is read programmatically from `.pen` bounds, not eyeballed. If a diagram exceeds its budget, it ships as a static SVG export with `data-part` hooks deferred, and is logged for Wave 2 rework. |
| Pixel-parity and WCAG contrast conflict | Resolved by the §5 rule. Accent-text substitution is pre-approved; any other conflict escalates to the user. |
| Canvas changes during the build (Pencil is multiplayer) | Section node IDs are recorded in §6. Re-read before starting each lane rather than trusting this spec's transcription. |
| Home has no Footer in the canvas | Flagged in §6 as an open item for Lane 1. |
| Desktop-only leaves the artifact unusable on a reviewer's laptop below 1440px | Accepted per user decision. The dev container serves at any width; the layout simply does not adapt. |

---

## 14. Open questions for the user

None blocking. The following are deferred by decision, not oversight: mobile layouts, motion implementation, production plumbing, Solutions and Partners IA, and the 27 Aug Gartner inquiry outcome that could affect hero copy.
