# SUPERSEDED (2026-08-31)

This Linear-console token sheet (`#08090A`, `#9437FF`, Inter, zero gloss) is **not** the live replica.

Use:
- `.stitch-preview/DESIGN.md` — Stitch semantic design system (Soft Structuralism, Geist, live `$ds-*`)
- `.stitch-preview/diagram-prompt-template.md` — fill-in prompt for diagram plates

---

# Design System: StackGen ADF Website — Linear Dark Console (archive)

## 1. Visual Theme & Atmosphere
A restrained, engineering-grade dark console — the visual world is pinned to Linear (linear.app): near-black canvas, flat hairline structure, zero shadows, zero gradients, one disciplined violet accent used only where it means something (the primary CTA, an active state, or the single most important number). Precise and technical, never a marketing gradient-scape. Left-aligned, asymmetric — never centered hero or headline blocks. Motion is minimal and purposeful, not decorative.

## 2. Color Palette & Roles
- Void Black `#08090A` — Primary canvas background (`bg-base`)
- Raised Panel `#0E0F11` — Secondary/raised surface, alternating band tier (`bg-raised`)
- Sunken Well `#050506` — Deepest recessed surface, rare (`surface-sunken`)
- Card Surface `#101113` — Fill for cards and diagram nodes (`surface-card`)
- Hairline Border `#1F2023` — Default 1px dividers, connectors, grid cell rules (`border-hairline`)
- Card Border `#26272B` — Slightly stronger edge for elevated cards (`border-card`)
- Primary Text `#F7F8F8` — Headlines, titles, primary labels (`text-primary`)
- Secondary Text `#8A8F98` — Body copy, icons at rest (`text-secondary`)
- Tertiary Text `#7E838C` — Labels, captions, metadata, mono text (`text-tertiary`)
- Factory Violet `#9437FF` — The ONE accent: primary CTA, active state, single most important number. Hard cap ~3 uses per screen. (`accent`)
- Violet Dim `#2A1447` — Accent-tinted fill wash for an active node's background, never a full block (`accent-dim`)
- Violet Text `#C9A2FF` — Accent-colored label text on dark, only inside an active node (`accent-text`)
- Signal Green `#4ADE80` — Pass / resolved state only (`pass`)
- Signal Amber `#F0883E` — Halt / attention state only (`halt`)

No cyan, no second brand hue, no purple glow, no gradient text. Void Black is intentional brand lock, not an accident.

## 3. Typography Rules
Inter throughout; JetBrains Mono reserved strictly for code, policy expressions, measured values, and node identifiers (never a "technical costume" for ordinary labels).

- **Display (H1):** Inter 56px / 500 / -2.5% tracking / line-height 1.05
- **H2 / Section heading:** Inter 40px / 500 / -2% tracking / line-height 1.1
- **H3 / Card title:** Inter 20px / 500 / -1.5% tracking / line-height 1.3
- **Body large:** Inter 18px / 400 / -1% tracking / line-height 1.5
- **Body:** Inter 16px / 400 / -0.5% tracking / line-height 1.55
- **Small:** Inter 14px / 400 / -0.5% tracking / line-height 1.5
- **Mono label:** JetBrains Mono 12px / 500 / +8% tracking / line-height 1.4, `text-tertiary`, uppercase

Banned: no other font families, no eyebrow/kicker text above headings (the heading carries its own weight), no centered headline blocks — always left-aligned and asymmetric.

## 4. Component Stylings
- **Nav:** 64px bar on `bg-base`, hairline bottom border. Logo left; nav links 14px `text-secondary`; right side carries a plain text "Login" link and an `accent`-filled pill primary CTA "Schedule demo".
- **Cards:** `surface-card` fill, 1px `border-card` stroke, 10px corner radius, no shadow. Never nest a card inside a card. Use only when elevation communicates real hierarchy.
- **Hairline grid cells:** for logo strips / repeated items — 1px `border-hairline` dividers between cells rather than floating shadowed cards.
- **Diagram Node:** rounded rect, radius 8px, `surface-card` fill, 1px `border-hairline` stroke, 16px padding, label in mono-label or Inter label style centered inside.
- **Active Diagram Node:** stroke becomes `accent` (1px, no glow), label switches to `accent-text`. Reserve for exactly one state at a time.
- **Connector:** 1px `border-hairline`, strictly orthogonal (horizontal/vertical only, zero diagonals/curves). One flow axis per diagram, never reversed mid-diagram.
- **Junction:** 6px filled ellipse, `accent`, marks a branch or merge point.
- **Buttons:** flat fill, no outer glow, radius 10-12px max (never full pill beyond that), tactile -1px on active. Primary = `accent` fill + white text. Ghost = hairline outline, transparent fill.
- **Metric cell:** big figure in `accent` at 56px/500, caption below in `text-tertiary` mono label.
- **Icons:** Lucide only, 20px, 1.5px stroke, `text-secondary` at rest (`accent` only on the active element). No emoji, no Unicode glyphs.

## 5. Layout Principles
- Desktop page frame: 1440px wide content column, 120px horizontal padding (1200px content width).
- Band vertical padding: 120px standard, 160px for hero.
- Spacing scale: strict multiples of 8 (8, 16, 24, 32, 48, 64, 96, 120).
- Alternate background tiers band-to-band between `bg-base` and `bg-raised` for rhythm.
- No overlapping elements, no 3-equal-card-row cliché as a default, no stray decorative shapes that encode no information.
- Never use percentage or `calc()`-style sizing; layout is fixed-pixel / flex-based.

## 6. Motion & Interaction
Static-first: this is a marketing/product site, not an animated demo. Where motion exists it is purposeful (hover states, one authored transition), never scattered or decorative.

## 7. Anti-Patterns (Banned)
- No emojis, no Unicode-glyph icons — Lucide only
- No gradients, no glow, no drop shadows anywhere
- No cyan or any second brand hue beyond the single violet accent
- No diagonal or curved connectors in diagrams — orthogonal only
- No centered hero/title layouts — left-aligned and asymmetric always
- No nested cards, no colored left-borders-as-accent-decoration
- No monospace used as a "technical" costume for prose labels
- No AI copywriting clichés, no filler text ("scroll to explore," bouncing chevrons)
- No fabricated data, metrics, or customer names beyond what is explicitly specified. All customer quotes are placeholders unless named as a published case study (greytHR, Innovaccer) — any quote block must read clearly as a placeholder otherwise.
- Fixed, verbatim product naming: Autonomous DevOps Factory (ADF), Aiden for Infrastructure, Aiden for Automation, Aiden for SRE, Aiden for Observability. Never "InfraOps", never "Aiden for DevOps", never "Olly".
