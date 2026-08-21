# StackGen Home Page — Linear Design System Draft

| | |
|---|---|
| **Date** | 18 August 2026 |
| **Canvas** | `Stack_Linear.pen` |
| **Copy source** | `StackGen_Home_Page_Outline_and_Copy_v1.0.docx.md` |
| **Visual source** | Linear (linear.app), via Mobbin reference set |
| **Status** | Approved for first draft build |

## Premise

Copy, section order and narrative come from the StackGen home page outline v1.0. The **visual system is replaced wholesale by Linear's** — this overrides section 2 of that document (typography, colour, surfaces, shadows, agent gradients).

Decisions taken 18 August 2026:

| Decision | Choice |
|---|---|
| Accent colour | Linear's neutral base, StackGen purple `#9437FF` as the single accent (not Linear's indigo) |
| Typeface | Inter (overrides Geist) |
| Page order | Option A — whiteboard order |
| Aiden card order | Pillar order: Infrastructure → Automation → Observability → SRE |
| Scope | Sections 00–07. Persona selector and below-fold retained bands excluded |
| Band rhythm | Approach B — two dark tiers, alternating on the doc's cadence |

## Why Linear looks like Linear

Observed from the reference set, and binding on this build:

1. One near-black canvas end to end. Depth comes from 1px hairlines and ~3% luminance shifts, never from light bands.
2. Type carries the design. Large headlines at **medium weight**, tight negative tracking. Never bold, never gradient-filled.
3. Two-tone text only: primary and secondary. A third tone is reserved for micro-labels.
4. A single accent, used almost exclusively on the primary action.
5. Uppercase monospace micro-labels as the signature texture.
6. Split section headers — headline left, descriptor right — not centred.
7. Hairline-divided grids rather than floating cards with shadows.

Three things are explicitly forbidden because they break the resemblance fastest: **gradients, glow shadows, per-agent colour.**

## Tokens

### Colour

| Token | Value | Use |
|---|---|---|
| `bg-base` | `#08090A` | Nav, hero, How It Works, Aiden family, closing |
| `bg-raised` | `#0E0F11` | Logo bar, case studies, problem band |
| `surface-card` | `#101113` | Card fills |
| `border-hairline` | `#1F2023` | Band dividers, grid cell rules |
| `border-card` | `#232427` | Card outlines |
| `text-primary` | `#F7F8F8` | Headlines, card titles |
| `text-secondary` | `#8A8F98` | Body copy, rail descriptors |
| `text-tertiary` | `#62666D` | Mono labels, source lines, captions |
| `accent` | `#9437FF` | Primary CTA, active tab outline, metric figures |

### Type

Inter throughout; JetBrains Mono for micro-labels.

| Role | Size | Weight | Tracking | Line height |
|---|---|---|---|---|
| Display (H1) | 56 | 500 | −2.5% | 1.05 |
| H2 | 40 | 500 | −2% | 1.1 |
| H3 / card title | 20 | 500 | −1.5% | 1.3 |
| Body large | 18 | 400 | −1% | 1.5 |
| Body | 16 | 400 | −0.5% | 1.55 |
| Small | 14 | 400 | −0.5% | 1.5 |
| Mono label | 12 | 500 | +8% | 1.4 |

### Layout

- Page frame 1440 wide, vertical layout, `clip: true`.
- 120px horizontal padding → 1200px content column.
- Band vertical padding 120px; hero 160px.
- Card corner radius 10px. Borders 1px.

## Sections

Scroll order is Option A.

### 00 — Global navigation
64px bar on `bg-base`, hairline bottom border. Logo left; Platform · Solutions · Company · Resources at 14px `text-secondary`; right side carries a plain "Login to StackGen" text link and a `accent`-filled pill "Schedule demo".

### 01 — Hero
Left-aligned single axis. Mono eyebrow `THE DEVOPS FACTORY` → H1 "Build your DevOps Factory with StackGen" → 18px subhead in `text-secondary` → CTA pair (accent pill "Get a demo", hairline-outlined ghost "Watch the 90-second tour") → mono trust badge row.

Below the copy, a full-width schematic panel with a hairline border, bleeding downward — Linear's product-shot placement. This is the static How It Works fallback the copy doc specifies; the 90-second ADF film does not exist yet and is marked as a placeholder on the canvas.

### 02 — Social proof
`bg-raised`. Centred intro line, then a 6×2 grid of **hairline-divided cells**, one logo per cell — Linear's customer-grid treatment, replacing the doc's floating monochrome logos. "Read case study" pill retained on the two cells with published studies. Mono credential row beneath a hairline rule.

### 03 — How It Works
`bg-base`. Split header: H2 "How the Factory works" left, subhead right. Module below is 70/30 — schematic canvas left, four-row selector rail right. Active row outlined in `accent`; inactive rows `text-secondary`. Canvas holds three zones left to right with mono zone labels: Inputs (Intent / Factory Spec card + four chips), The Factory (three stages over the Aiden OS base bar), Outcomes (three rows with trend indicators).

### 04 — The Aiden family
`bg-base`. Mono pillar rail — BUILD · OPERATE · OBSERVE · REMEDIATE — above four cards in a hairline grid, each pillar over the agent that owns it. Card internals: mono index, agent name at H3, one-line promise, 2×2 mono metric block, four capability bullets, text CTA with trailing arrow. Band closer line beneath.

Per the accent decision, the four fixed agent gradients from the copy doc are **not** used.

### 05 — Case studies
`bg-raised`. Accent dot + `CASE STUDIES` mono eyebrow, H2 "Built with the teams running it" left-aligned. Horizontal card row, ~340px cards, bleeding off the right edge with a partial card visible. Card internals: customer logo top-left, generous empty space, quote low in the card, two-line mono attribution, circled arrow bottom-right. All ten quotes are placeholders (tracker rows P-01 to P-10).

### 06 — The problem
`bg-raised`. Centred H2 "Machine-speed change. Human-speed control." and subhead. Three hairline cards, each with its metric at 56px in `accent` (24%, L3, $400B), a title, description and a `text-tertiary` source line. Full-width centred pull line beneath.

### 07 — The Factory — closing
`bg-base`, full bleed. Generated isometric factory artwork as the band visual, with H2 "This is the operating model", one line of body copy and a single `accent` CTA "See it running on your stack". Marked as a placeholder keyframe — the 3D animation is a net-new asset.

## Build method

Pencil MCP, bounded batches — one section per `execute` call, screenshot review after each completed section. Reusable components created first for the repeated units: nav item, button, mono label, card shell, metric cell.

## Known open items carried from the copy doc

- Both animated assets (90-second ADF film, 3D factory close) are unproduced. Draft ships static fallbacks.
- All ten case study quotes are unapproved placeholders.
- Aiden logo marks still say InfraOps and DevOps; renamed marks not yet produced.
- Bancolombia anonymisation and the Splunk / Oxford Economics attribution need legal sign-off before publication.
