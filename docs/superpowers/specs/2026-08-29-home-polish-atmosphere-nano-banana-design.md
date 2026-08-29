# Design: HomeReplica Polish + Deck-True Atmospheres (Nano Banana 2) + Diagram Redraw/Animate

**Date:** 2026-08-29  
**Status:** Approved in brainstorming (Approach A; §§1–3 locked)  
**Surface:** HomeReplica (`web/app/page.tsx` → `HomeReplica.tsx`) @ `http://localhost:3000/`  
**Mode:** Persuade (Impeccable)  
**Skill path:** using-superpowers → brainstorming → impeccable (`polish` + `animate`) → writing-plans  

**Related (does not supersede motion architecture):** `2026-08-29-replica-motion-visual-refine-design.md`  
**Brand locks:** PRODUCT.md — ADF naming, Schedule demo CTA, sentence-case, cream/near-black dual theme, no “Olly” / “Aiden for DevOps”; no uncleared ROI claims.

---

## Locked decisions

| Decision | Choice |
|---|---|
| Refine type | **Polish + new media** (not full visual-world redesign) |
| Atmosphere scope | **Full-page set**: hero, video still, soft grounds for Assemblies / Shell / WhoItsFor |
| Atmosphere aesthetic | **Deck-true field**: warm cream `#F0E8E0` / near-black `#181810`, soft iridescent lavender→cyan wash; no people, logos, UI chrome, or readable text |
| Image model | **Nano Banana 2** = Gemini 3.1 Flash Image (`gemini-3.1-flash-image`) via Vertex + `gcloud` auth on project `propane-galaxy-498403-n8` |
| Diagram regenerate | **Code redraw + motion improve** (options 1+2). **No** Nano Banana raster plates for diagrams |
| Diagram topology/copy | Factual labels and naming preserved; ask before any claim/copy change |
| Approach | **A — Atmosphere-first polish**: small paired light/dark kit → wire behind sections → one polish pass → bounded verify |

---

## Goal

Ship a coherent HomeReplica refine that:

1. Adds **decorative** deck-true atmosphere images behind hero, video, and major section bands.
2. **Redraws** existing React/SVG/HTML diagrams for material clarity and light-theme contrast, then **animates** them with existing motion primitives.
3. Runs one Impeccable **polish** pass on residual critique debt (theme status, CTA consistency, contrast, glow restraint, spacing).
4. Verifies once (desktop + mobile, light + dark), fixes in one batch, confirms once, stops.

---

## Non-goals

- Replacing the visual world (no new DESIGN.md world; no purple-SaaS / cream-serif cliché pivots away from the deck).
- Fake product UI screenshots or Nano Banana “diagram illustrations.”
- Swapping customer/integration logos or inventing new proof assets.
- Shipping uncleared ROI / dollar claims.
- Open-ended self-QA loops beyond Impeccable’s bounded verify ceiling.
- Blocking the whole refine if Vertex image generation fails (fallback: CSS substrates only).

---

## Architecture

### Page composition (unchanged order)

Nav → Hero → Video → Logos → Assemblies → Shell → WhoItsFor → Footer

### Atmosphere kit

Paired light/dark PNGs under `web/public/media/atmosphere/`:

| Asset ID | Mount | Notes |
|---|---|---|
| `hero-field-{light\|dark}` | Hero, behind `GridSubstrate` | Substrate stays; field is soft atmosphere |
| `video-still-{light\|dark}` | Video placeholder face | Play control + label remain DOM; no fake UI chrome in the image |
| `ground-assemblies-{light\|dark}` | Assemblies section background | Low opacity; diagrams opaque on top |
| `ground-shell-{light\|dark}` | Shell section background | Same |
| `ground-who-{light\|dark}` | WhoItsFor background | Softest wash |

**Wire-up pattern:** theme-aware `background-image` or `next/image` with `aria-hidden`, opacity + CSS mask so type and diagrams remain the primary readable layer. Assets are decorative only.

### Generation pipeline

1. Authenticate with existing `gcloud` config (project `propane-galaxy-498403-n8`).
2. Call Vertex **generateContent** for model `gemini-3.1-flash-image`.
3. Repo-local script writes bytes to fixed filenames under `web/public/media/atmosphere/`.
4. Generate **1–2 candidates per slot**; pick one per theme; do not ship alternates.
5. Prompt negatives (binding): no people, no logos, no UI chrome, no readable text, no purple-on-white SaaS cliché, no photoreal office stock.
6. **Failure mode:** if API/quota/region fails, continue polish + diagram redraw with CSS-only substrates; document the miss in the plan notes — do not block.

### Diagram surfaces (redraw + animate)

| Component | Section | Motion intent |
|---|---|---|
| `Offerings` | Assemblies | Assembly / reveal into factory story |
| `InnerOuterLoop` | Assemblies | Keep Class A simulation quality; refine timing/contrast |
| `Integrations` | Assemblies | Keep L→R marquee; polish edge fades + reduced-motion static row |
| `OperationalContextGraph` | Shell | Keep execution-wave model; refine light-theme contrast/timing |

**Redraw rules**

- Rebuild React/SVG/HTML for deck materials (cream / near-black, iridescent accents, glass tiers) and contrast — especially light theme.
- Prefer existing primitives: `Reveal`, `Stagger`, `DrawPath`, `Beam`, tokens in `web/lib/motion-tokens.ts`.
- Logos marquee: polish only (not a diagram redraw).
- **Reduced motion:** assembled final state; no infinite loops that convey meaning only through motion.

### Polish pass (Impeccable)

Preserve incumbent identity. Target residual critique debt where still true:

- Theme hydration / system-status desync under reduced motion.
- CTA label consistency (“Schedule demo”).
- Dense mono / rail label contrast on light.
- Light-theme Tier-3 glow restraint.
- Spacing rhythm between sections after atmospheres land.

Run mechanical detector once after UI edits:  
`node <impeccable>/scripts/detect.mjs --json <changed targets>`

---

## Error handling & accessibility

- Atmosphere images: decorative (`aria-hidden`); never the sole carrier of meaning.
- Diagrams: keep labels in the DOM (not baked into rasters).
- Video: keep accessible name via existing `aria-label` / label copy.
- If an atmosphere file is missing, section must still render with token backgrounds (no broken `url()` holes).
- Vertex failures must not crash the Next build; assets are optional at build time once fallbacks exist.

---

## Testing & verify

1. Update/extend unit tests only where contracts change (Integrations/Logos marquee, OCG reduced-motion, Offerings structure).
2. Docker prod rebuild → verify `http://localhost:3000/`.
3. One batched visual pass: desktop + mobile, light + dark.
4. One detector pass; one fix batch; one confirm; stop.

---

## Success criteria

- Deck-true atmospheres present on hero, video, Assemblies, Shell, WhoItsFor in both themes (or explicit CSS fallback if Vertex failed).
- Diagrams redrawn in code and animated with shared motion tokens; topology/naming unchanged without prior ask.
- Polish pass landed without redesigning the world.
- Bounded verify complete; no open polish loop.

---

## Implementation order (for writing-plans)

1. Atmosphere generation script + Vertex smoke test (Nano Banana 2).
2. Generate and select the 10-slot kit (5 IDs × 2 themes).
3. Wire atmospheres into Hero / Video / Assemblies / Shell / WhoItsFor with fallbacks.
4. Diagram redraw + animate (Offerings → OCG → Integrations → InnerOuterLoop), reusing motion primitives.
5. Site-wide polish pass from critique leftovers.
6. Tests → Docker rebuild → batched verify → detector → one fix round → stop.
