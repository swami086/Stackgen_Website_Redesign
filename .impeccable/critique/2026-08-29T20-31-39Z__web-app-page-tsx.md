---
target: web/app/page.tsx (HomeReplica landing)
total_score: 17
max_score: 28
na_heuristics: 5,7,9,10
p0_count: 1
p1_count: 3
timestamp: 2026-08-29T20-31-39Z
slug: web-app-page-tsx
---
# Critique: StackGen Home Replica (`web/app/page.tsx`)

**Method:** dual-agent (A: 19240cce-a251-4ccc-9343-e53f5dc60751 · B: cd311e56-e5c0-4b49-931b-0e551f9fa446)
**Themes:** dark + light (equal)
**Mode:** Persuade
**Date:** 2026-08-29

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Diagram rails/simulation communicate well; theme can desync under reduced-motion (SSR dark vs theme-init light default) |
| 2 | Match System / Real World | 2 | Locked name is Autonomous DevOps Factory; live H1 says Operations Factory; Remidiate typo; Book Demo vs Schedule demo |
| 3 | User Control and Freedom | 3 | GPYOG rail + reversible pin are strong; nested-interactive (role=img wrapping focusables) muddies AT |
| 4 | Consistency and Standards | 3 | Glass tiers + tokens disciplined; CTA label split and Devops/Operations naming drift |
| 5 | Error Prevention | n/a | Persuade landing; no forms beyond CTA links |
| 6 | Recognition Rather Than Recall | 3 | Topology is drawn; dense mono 10px rail labels fail contrast (~2.29:1 light) |
| 7 | Flexibility and Efficiency | n/a | Persuade surface |
| 8 | Aesthetic and Minimalist Design | 3 | Authored motion thesis; WhoItsFor is the densest valley; Tier-3 glow needs light-theme care |
| 9 | Error Recovery | n/a | No transactional error paths |
| 10 | Help and Documentation | n/a | Persuade; Docs link present in nav |
| **Total** | | **17/28** | **Acceptable → weak Good band (~61%)** |

na_heuristics: 5,7,9,10

## Design Specificity Verdict

**LLM (A):** Authored for StackGen — factory-assembles-itself thesis, Class A simulation (RBepL) vs Class B+C isometric (GPYOG), deck cream/near-black + iridescent accents, three-tier glass. Not generic SaaS Lottie.

**Deterministic (B):** CLI `detect.mjs` on replica tree: **0** findings (exit 0). Live DOM inject: **47** findings (nested-cards 21, undersized-ui-text 10, icon-tile-stack 8, text-overflow 4, tiny-text 2, wide-tracking 2). Most nested-cards / icon-tile / tracking treated as soft/FP for intentional diagram density; axe is the sharper signal (contrast + nested-interactive).

**Overlays:** Injection succeeded (live-server :8400); ~45 overlays on live DOM. CLI empty ≠ clean — engines differ.

## Overall Impression

Craft and motion architecture are unusually strong for a mid-rebuild. Trust is undermined by copy governance slips on the first viewport and by light-theme a11y on the shell rail. Biggest opportunity: lock naming/CTA vocabulary, then close Wave 5 a11y/hydration debt so the kinetic story earns belief from Dana (on-call SRE).

## What's Working

1. Motion thesis division of labor — living RBepL vs resolving GPYOG.
2. Glass tier discipline (Tier 1 only over hero substrate).
3. Seeded simulation + dual-theme token path (engineering maturity).

## Priority Issues

### [P0] Hero naming violates locked ADF vocabulary
- **What:** H1 is "The Autonomous Operations Factory" (double space); PRODUCT.md locks **Autonomous DevOps Factory**.
- **Why:** Gartner risk + governance; first viewport is wrong product name.
- **Fix:** `web/content/replica.ts` hero.heading → exact locked string; strip double space.
- **Suggested command:** `/impeccable clarify`

### [P1] Hero sub typo + CTA vocabulary split
- **What:** "Remidiate"; nav CTA "Book Demo" vs hero/footer "Schedule demo"; assemblies "The Devops Factory".
- **Why:** Undercuts precision voice; primary action has two names.
- **Fix:** Spell Remediate; unify Schedule demo; sentence-case DevOps Factory only where allowed.
- **Suggested command:** `/impeccable clarify`

### [P1] Theme hydration race (light + reduced-motion)
- **What:** `theme-init.js` defaults light; layout SSR `data-theme="dark"`; Wave 5 documented resync need.
- **Why:** Light users with OS reduced-motion can flash/wrong-theme after hydration.
- **Fix:** Re-apply preference post-hydration in ThemeProvider; align SSR default with init.
- **Suggested command:** `/impeccable harden`

### [P1] Shell rail contrast fails WCAG on light
- **What:** axe: `#rail-tab-*` mono `text-[10px] opacity-60` ≈ **2.29:1** on light ground (3 nodes).
- **Why:** Operable instrument becomes unreadable for Dana/Sam on light theme.
- **Fix:** Raise opacity/size or use `#6B6154`+ on cream; re-axe.
- **Suggested command:** `/impeccable audit`

### [P2] Nested interactive inside ContextGraph `role="img"`
- **What:** Focusable rail/controls inside role=img (1 axe node).
- **Why:** Screen readers treat graph as single image; controls hidden/confusing.
- **Fix:** role=img only on decorative SVG subtree; rail outside.
- **Suggested command:** `/impeccable harden`

### [P2] Logo inventory ≠ Wave 5 "28 marks"
- **What:** VENDOR_MARKS 13 + customers 8 = 21; diagram slug instances 15.
- **Why:** Incomplete proof strip vs stated target.
- **Fix:** Audit registry vs PRODUCT customer list; fill or revise target count.
- **Suggested command:** `/impeccable polish`

### [P2] Light-theme Tier-3 glow on cream CTA
- **What:** Additive `.glow-source` on Hero CTA (and Nav / InnerOuterLoop hub).
- **Why:** Can wash cream and soft-focus the primary action.
- **Fix:** Attenuate/disable glow under `[data-theme=light]`.
- **Suggested command:** `/impeccable quieter` or `/impeccable audit`

### [P3] 3D mark billboard / motion-justification debt
- **What:** IsoScene billboard not visually reconfirmed; ContextGraph/IsoScene/Reveal/WhoItsFor lack one-sentence motion "why" comments.
- **Suggested command:** `/impeccable polish`

## Persona Red Flags

- **Jordan:** Acronym ADF / factory jargon without inline gloss on secondary CTA.
- **Riley:** Will hit nested-interactive + theme race; scrub parity exists but axe gaps remain.
- **Casey (awareness):** Complex isometric degrades; not scored as P0/P1 per desktop-only acceptance.
- **Dana (SRE):** Wrong H1 name + soft vendor-mark inventory + light rail illegibility = credibility fail before Schedule demo.

## Minor Observations

- Browser surfaces (selection, caret, scrollbar, focus-visible) implemented — Wave 5 4f largely closed.
- Pillars appear in WhoItsFor (and offerings diagram) — watch PRODUCT standing rule (pillars on one diagram only).
- New concept comps ready: trust-ladder, cross-domain-play, two-planes under `.impeccable/mocks/diagram-concepts/`.

## Questions to Consider

- Should Trust Ladder replace WhoItsFor's visual spine as the CAB-facing proof?
- Is light theme a first-class ship surface or a toggle courtesy?
