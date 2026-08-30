# Audit note — HomeReplica post clarify/harden/quieter

Date: 2026-08-29
Target: web/app/page.tsx → HomeReplica

## Scores (post-fix estimate)

| Dimension | Score | Note |
|---|---|---|
| Accessibility | 3 | Rail tertiary no longer opacity-60; nested-interactive fixed; theme race hardened |
| Performance | 3 | Unchanged; Lighthouse Wave 5 still reference |
| Theming | 4 | theme-init default aligned to dark SSR; post-hydration re-apply |
| Responsive | 2 | Desktop-accepted; mobile awareness only |
| Implementation integrity | 3 | Copy governance restored to PRODUCT.md |
| **Total** | **15/20** | **Good** |

## Fixed this session
- P0/P1 copy (ADF H1, Remediate, Schedule demo, DevOps casing, sentence-case headings)
- Theme hydration race + theme-init default
- ContextGraph rail outside role=img
- LayerRail index contrast (text-text-tertiary, no opacity-60)
- Light-theme Tier-3 glow attenuated to 10%

## Remaining
- P2 logo inventory 21 ≠ 28 (polish)
- P3 motion-why comments on ContextGraph/IsoScene/Reveal/WhoItsFor
- P3 IsoScene billboard visual confirm
- Trust ladder / cross-domain / two-planes comps ready under `.impeccable/mocks/diagram-concepts/` — not implemented in page yet
