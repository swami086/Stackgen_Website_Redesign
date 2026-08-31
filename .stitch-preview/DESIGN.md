# Design System: StackGen Landing (Soft Structuralism)

Source of truth for Google Stitch. Extracted from the live replica (`web/app/globals.css`, `web/content/replica.ts`, `web/components/replica/**`) on 2026-08-31. Do not use the older Linear-console hexes in `website-design-system.md`.

**Design read:** B2B infra landing for SRE / platform buyers. Dual-theme Soft Structuralism. Linear-grade hairlines plus Apple gloss on plates. One violet accent, used as meaning not decoration.

**Dials:** Variance 5 · Motion 6 · Density 6 (diagrams denser than gallery, airier than a cockpit).

---

## 1. Visual Theme & Atmosphere

A machined, quiet operations console sitting on a marketing page. Charcoal or paper canvas. Nested plates that read as hardware (outer tray + inner core). Hairline structure. Specular glass sheen on diagram plates only. No neon mesh, no purple-on-white SaaS, no cyberpunk glow.

Mood: precise, governed, editorial-B2B. The diagram is the product demo. Copy is short. Geometry, chips, hubs, and beams carry the story.

Atmosphere field PNGs may sit *behind* a plate as a whisper. They never compete with nodes.

## 2. Color Palette & Roles

### Dark theme (`data-theme="dark"`) — default for diagram comps

- **Void Ground** `#0B0C0E` — Page / plate canvas (`--ds-bg`)
- **Panel Surface** `#151619` — Outer double-bezel shell (`--ds-surface`)
- **Raised Core** `#1D1F24` — Inner core, chips, hubs (`--ds-surface-raised`)
- **Hairline Border** `#2A2C33` — 1px structure (`--ds-border`)
- **Primary Ink** `#F3F4F6` — Titles, node labels (`--ds-text-primary`)
- **Secondary Ink** `#9AA0AC` — Body, rest-state icons (`--ds-text-secondary`)
- **Tertiary Ink** `#7E8591` — Mono eyebrows, captions (`--ds-text-tertiary`)
- **Factory Violet** `#8C85FF` — The ONE accent: hub, one hot path, primary CTA (`--ds-accent`)
- **Violet Label** `#A79CFF` — Accent text on dark (`--ds-accent-text`)
- **On Accent** `#0B0C0E` — Text sitting on accent fill (`--ds-on-accent`)
- **Pass Green** `#4ADE80` — Resolved / healthy only (`--ds-pass`)
- **Halt Amber** `#F0883E` — Lag, break, attention only (`--ds-halt`)

Layer tints (quiet fills, never neon):

| Layer | Fill | Stroke |
|---|---|---|
| Intent | `#1C193B` | `#352F70` |
| Agent | `#0F291B` | `#1C4E33` |
| Context | `#2E1D13` | `#62351D` |
| OS | `#181A1F` | `#333742` |
| Prod | `#2E151B` | `#6B2338` |

Quiet particle / inner-loop speed highlight (optional, never a second brand): cyan `#A8E0F8` at very low opacity on beads or one orbit. Lavender `#B898F8` is allowed as the *hot-path* violet on dark plates when `#8C85FF` would blow out.

### Light theme (`data-theme="light"`)

- **Paper Ground** `#FCFCFD`
- **Panel Surface** `#F4F5F7`
- **Raised Core** `#ECEDF0`
- **Hairline Border** `#E3E5E9`
- **Primary Ink** `#12141A`
- **Secondary Ink** `#5B6069`
- **Tertiary Ink** `#686E78`
- **Factory Violet** `#5B4FE8`
- **Violet Label** `#4A3FD1`
- **On Accent** `#FFFFFF`
- **Pass Green** `#0F7A3A`
- **Halt Amber** `#B8410A`

Light layer tints: Intent `#EEECFC`/`#C7C2F6` · Agent `#EAF7F0`/`#A9E2BE` · Context `#FEF3EB`/`#FCD2B3` · OS `#F1F2F5`/`#D1D5DB` · Prod `#FDF2F5`/`#F9A8C0`.

**Hard cap:** violet appears on the hub *or* one active route *or* the primary CTA. Never a purple wash across the plate. Never purple-on-white card spam.

## 3. Typography Rules

Live site fonts (Stitch must match):

- **Display / UI:** Geist Sans — not Inter, not a generic system grotesk as the face
- **Mono:** Geist Mono (JetBrains Mono is acceptable *only* for 11px uppercase cadence labels: `INNER LOOP`, `HOW IT WORKS`, node ids)

Scale on a 1440 diagram plate:

- Section H2: 28–32px / 700 / -0.5px tracking
- Plate title / hub label: 13–16px / 600
- Chip label: 11px / 500
- Mono eyebrow: 11px / 500 / +2px letter-spacing / Tertiary Ink / uppercase
- Body under a diagram: 14–15px / 400 / snug leading / Secondary Ink / max ~65ch

Banned: Inter as the display face, generic serifs, gradient text, 6-line headings, section-number eyebrows (`01 / INDEX`).

## 4. Component Stylings (diagram grammar)

**Double-bezel (mandatory on every major plate and hub):**
- Outer shell: Panel Surface, 1px Hairline Border, padding 8–10px, radius 12px
- Inner core: Raised Core, concentric radius (outer minus padding), inset top highlight `rgba(255,255,255,0.22)` dark / stronger edge on light
- Never a flat card dropped on the canvas

**Specular glass plate (Tier 2, default for diagrams):**
- Gradient fill Raised Core → Panel Surface, bright top catch, 1px gradient hairline
- **Zero backdrop-blur** on the diagram. Blur is reserved for the floating nav island only (Tier 1 Liquid Glass)
- Nested chips use `glass-tile`: smaller radius 6–8px, Raised Core, 1px border, 8×4px padding

**Chips / pills:**
- Compact Offerings density: `rounded-md` (~6px), border Hairline, fill Raised Core, pad ~4×8px, 11px label
- Not tall consumer pills. Never clip pill caps against the shell

**Hub:**
- Machined disc or rounded square, double-bezel, optional `glass-hub-shine`
- Quiet by default. Accent only when it is the story (Context Graph, Intent Router)
- Size large enough to be the brightest object, not a neon orb

**Connectors:**
- Hairline 1px Border or Tertiary Ink
- Orthogonal or gentle Bezier. Isotropic stroke (`vector-effect: non-scaling-stroke` energy)
- Accent stroke on **one** hot path only
- Motion-ready: tiny beads / packets on the active beam. Static comps still show 2–4 beads in-flight
- No fat glowing tubes, no rainbow wires

**Ask bar (OCG-family only):**
- Top of plate, not nested inside the graph
- Input + Submit. Short prompt copy. No chip cluster in the bar

**Icons:** Phosphor Light or Lucide 1.5px stroke, Secondary Ink at rest. Official vendor marks when named (AWS, GitHub, Datadog, etc.). Never hand-drawn fake logos. Never emoji.

**Buttons (if a plate includes chrome):**
- Primary: accent fill, On Accent text, radius 8–12px, no outer glow
- Ghost: hairline outline
- CTA label on the marketing site: "Schedule a demo" (not Sign up / Get started)

## 5. Layout Principles

- Desktop source of truth: 1440px wide. Content column ~1200px after 96–120px side pad. Diagrams full-width of the column.
- Landing section order (do not invent a different spine): Nav → Hero → Logos → Problem → Solution → Assemblies (Inner/Outer, Offerings, Integrations) → Shell / OCG → Who it's for → Footer
- One diagram = one horizontal plate. Landscape 16:9 or 16:10. Never a tall collage of multiple sections.
- Anti-squeeze: chips have internal padding 8–14px and gaps 8–12px. Caps never clipped.
- No overlapping copy. No 3-equal-card feature row as the diagram.
- Light and dark are the **same structure**, swapped tokens. Do not redesign the composition per theme.

## 6. Motion & Interaction (static Stitch frame)

Stitch outputs a still. Draw the *ready state* of the live motion grammar:

- Reveal order implied: nodes → edges → labels
- One hot path lit; other routes at rest opacity
- Packets on feeders / spokes if the metaphor is neural-mesh or signal-drop
- No ambient looping glow pulses
- Reduced-motion equivalent = the same frame without beads

Live metaphors on the replica (pick one, name it in the prompt): `signal-drop` · `neural-mesh` · `corridor-stitch` · `assemble` · `chaos-film`

## 7. Naming & copy lock (landing replica)

Public product names on `/` today:

- Aiden for Infrastructure · Aiden for Automation · Aiden for Observability · Aiden for SRE
- Aiden OS · Operational Context Graph · Autonomous DevOps Factory (below-fold Assemblies heading)
- Primary CTA: Schedule a demo

Banned on any generated plate: Olly · InfraOps · "Aiden for DevOps" · single pane of glass · em dash (`—`) · Elevate / Seamless / Unleash / Next-Gen

Headings: sentence case. Short labels. No essays inside nodes.

## 8. Anti-Patterns (Banned)

- Neon / outer glow spam, mesh blobs, rainbow gradients, purple-on-white SaaS
- Glass-on-glass (Tier 1 blur stacked on a specular plate)
- Backdrop-blur on the diagram itself
- Pure `#000000` or pure `#FFFFFF` fills
- Inter as the display face
- Centered generic 3-card rows
- Nested cards inside cards
- Fake dashboards, fake metrics (`99.99%`), people photography, watermarks
- Truncated labels (`Open Policy…`). Use short forms: OPA, SRE, CI / CD
- Second brand hue competing with Factory Violet (cyan is particles only)
- Invented customer logos. Generic monochrome tool glyphs OK when vendors are not named
- Floating decorative triangles that ignore hubs
- Section-number eyebrows, scroll cues, bouncing chevrons
