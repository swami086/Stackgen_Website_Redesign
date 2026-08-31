# HomeReplica landing critique — 2026-08-31

**Target:** `web/components/replica` (HomeReplica on `/`)  
**Mode:** Persuade  
**Provenance:** Assessment A + B via isolated subagents (not degraded)

## Nielsen (Persuade)

| H | Score | Note |
|---|---|---|
| H1 Visibility | 3 | Nav scroll states strong; CTA loading absent |
| H2 Real world | 2 | Hero paradigm language vs SRE job language |
| H3 Control | 4 | Theme, dismissible mega-menu, no traps |
| H4 Consistency | 3 | Motion tokens unified; CTA intent mixed |
| H5 Errors | n/a | |
| H6 Recognition | 2 | Diagrams need legend / progressive disclosure |
| H7 Efficiency | 3 | Mega-menu power path; no skip links |
| H8 Minimal | 2 | 8 sections + 3 dense factory diagrams |
| H9 Recover | n/a | |
| H10 Help | 1 | No glossary; “How ADF works” → `#` |

## P0
1. Hero abstraction gap (`Hero.tsx` / replicaContent)
2. Assemblies diagram density (3 diagrams, decode valley)

## P1
3. ProductMegaMenu overload
4. WhoItsFor three taxonomies (pillars / roles / OS)

## Technical (Assessment B)
- `detect.mjs --json` → `[]`
- Reduced-motion respected; no layout thrash; diagram aria present
- Dev: `:3000` and `:3010` up

## 21st.dev inspiration (do not drop-in blindly)
- Tracing Beam / Gradient Tracing → scroll- or time-narrated paths on factory diagrams
- Reveal / Scroll Reveal → compare to existing `motion/Reveal.tsx` + Stagger
- Container Scroll / Immersive Scroll Gallery → optional Assemblies narrative framing
- Logo Marquee variants → polish Logos (already have pause/hover)
- Motion Footer → Footer delight only if Soft Structuralism holds

## Skills for implementation pass
impeccable: layout, animate, quieter, distill, polish  
project: diagram-animation, navigation-menus  
global: design-taste-frontend, high-end-visual-design  
optional: apple-hig-expert (nav glass), a11y-audit
