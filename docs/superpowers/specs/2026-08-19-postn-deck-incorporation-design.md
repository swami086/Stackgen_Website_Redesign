# Positioning Deck → Site Incorporation Design

**Date:** 2026-08-19  
**Status:** Approved 2026-08-19 — execution via `docs/superpowers/plans/2026-08-19-postn-deck-incorporation.md`  
**Source folder:** `sg-new-postn-deck/` (PDF slides 0–14)  
**Extracted text:** `.firecrawl/postn-deck/all-slides-text.txt`  
**Canvas:** `Stack_Linear.pen`  
**Approach:** Spec-first reconcile, then diagram waves (Home → Products → Platform)

---

## 1. Decisions locked in intake

| Decision | Choice |
|---|---|
| Authority | **Hybrid C** — deck wins on narrative/mechanism; site locks win on naming, Linear visual world, CTA, evidence gates |
| Diagram treatment | **A** — rebuild in Pencil as **fully editable** Linear layers; high fidelity; no PNG flatten of whole slides |
| Scope order | **4** — Home → Products → Platform (full harvest) |
| Modeled ROI (slide 14) | **C** — off public canvas until finance/AR sign-off |
| Process | Spec → user review → `writing-plans` → Pencil waves → verify |

---

## 2. Non-negotiable site locks (unchanged)

From `PRODUCT.md` + `.agents/product-marketing.md`:

- **Naming:** Aiden for Infrastructure · Automation · Observability · SRE. Never Olly. Never “Aiden for DevOps” / “Aiden for InfraOps” on site.
- **ADF:** Vision / category frame, not a SKU.
- **CTA:** Schedule demo only (primary).
- **Visual world:** Linear-pinned dark; accent `#9437FF` (`$accent`). No glow. No cyan as a second brand accent.
- **Voice:** Declarative, mechanism-first. No em dashes.
- **Evidence:** No fabricated quotes; no public modeled dollar ROI from slide 14 until unlocked.

---

## 3. Naming map (deck → site)

| Deck wording | Site wording |
|---|---|
| Aiden for DevOps | Aiden for Automation |
| Aiden for InfraOps | Aiden for Infrastructure |
| ADF as product-like factory SKU | Autonomous DevOps Factory (vision) + Aiden products |
| Factory Spec / Runtime / Learning | Allowed as **process** vocabulary |
| OCG / Operational Context Graph | Allowed; prefer full name once per page then OCG |
| Temporal / OPA (slide callouts) | Mechanism labels OK; do not invent partner logos/claims |
| Early Access InfraOps & Migration | “Early Access” strip under Infrastructure only; not a nav SKU |
| MLOps Factory H1 2027 | Roadmap label only |

---

## 4. Slide → surface inventory

| Slides | Primary target | Secondary | Artifact type |
|---|---|---|---|
| 0 title | Home hero support only if needed | — | Copy optional |
| 1–4 problem | Home Problem | — | Copy + editable creation/ops + cross-domain gap diagrams |
| 5–6 intent / factory model | Home ADF / mechanism adjacent | Infrastructure Mechanism | Editable Intent → Spec story |
| 7 OCG | **Platform hub** | Home OCG teaser | Editable OCG diagram |
| 8 SRE play | Product — SRE (`bEaQH`) | — | Editable investigation sequence |
| 9 pipelines | Product — Automation (`zTOam`) | — | Editable self-verify pipeline |
| 10 migration | Infrastructure Early Access strip | — | Callout, not full page |
| 11 Aiden OS | Platform hub (`BQ6Ld`) | — | Editable OS modules (orchestration + financial governance) |
| 12 lifecycle | Home | — | Editable Intent→Spec→Runtime→Learning (**factory process**) |
| 13 roadmap | Platform hub (default) | About only if Platform density breaks | Available / Early Access / H1 2027 strip |
| 14 $4–6M ROI | **Excluded from public canvas** | Sales notes only | Do not draw |

### Two diagrams, two jobs (Home)

1. **Factory process (deck 12):** Intent → Factory Spec → Factory Runtime → Factory Learning  
2. **Product loop (existing):** Build → Govern → Observe → Remediate → four Aiden products  

Do not merge into one graphic.

---

## 5. Home design (`JLg8h` + `KUYi6`)

**Preserve spine:** Nav → Hero → Mechanism (policy-gated UI) → Logos → Problem → … → Final CTA.

**Changes:**

1. **Problem** — Enrich with deck paradox (creation vs ops; manual toll; domain silos / stateless agents). Keep attributed industry cites already on canvas. Do not invent deck-only statistics without sources.
2. **Factory process band** — New or upgraded editable Linear diagram from slide 12.
3. **OCG teaser** — Compact editable module; full OCG lives on Platform.
4. **Mobile** — Same order; stack diagrams vertically; drop micro-labels that fail at 390px.

**Out on Home:** ROI dollars, Migration Early Access as hero, DevOps/InfraOps labels, glow/cyan.

---

## 6. Product pages design

Shared: keep Nav / Hero / metrics / Final CTA. Upgrade Mechanism to high-fidelity editable diagrams.

| Product | Frame | Deck | Diagram |
|---|---|---|---|
| SRE | `bEaQH` | 8 | Drift → Alert → OCG RCA → Remediate → Deploy → Verify |
| Automation | `zTOam` | 9 | Commit → build/test → infra/OCG checks → gate → deploy |
| Infrastructure | `T4FJtW` | 5–6 + 10 partial | Intent → policy-checked change; Early Access migration strip only |
| Observability | `OAfMk` | 7 slice | State ↔ anomaly correlations; change attribution |

Copy: deck mechanism language rewritten to site voice. No modeled ROI figures on public product pages.

---

## 7. Platform design (`BQ6Ld`)

1. Full editable **OCG** centerpiece (slide 7).
2. **Aiden OS** band (slide 11 restyle): workflow orchestration + financial/inference governance as Linear modules.
3. Keep deterministic + agentic planes and product cross-links.
4. Optional **Roadmap** strip (slide 13), clearly labeled roadmap (not GA).

Platform children (Integrations, Cloud to Code, Policies, IaC Lifecycle) — no required diagram rebuild in this incorporation unless a wave has spare capacity; OCG/OS on hub is P0.

---

## 8. Diagram craft standard

- **Editable:** frames, text, strokes, fills, icons (lucide) — no flattened slide PNGs as the diagram.
- **Tokens only:** `$bg-base`, `$bg-raised`, `$surface-card`, `$surface-sunken`, `$border-hairline`, `$border-card`, `$text-primary`, `$text-secondary`, `$text-tertiary`, `$accent`, `$accent-dim`, `$accent-text`, `$pass`, `$halt`.
- **Forbidden in diagrams:** glow/blur-as-brand, cyan as second accent, gradient text, em dashes in labels.
- **Fidelity:** preserve information density and step order from the deck; restyle, do not dumb down to three icon cards.
- **Reference:** use `.firecrawl/postn-deck/previews/` and source PDFs for structure; rebuild, don’t paste.

---

## 9. Doc updates before canvas waves

1. `.agents/product-marketing.md` — add OCG, Factory Spec, factory process vocabulary under hybrid C; keep naming table.
2. `docs/superpowers/specs/2026-08-19-site-ia-page-briefs.md` — diagram slots on Home / Products / Platform.
3. This file — living design for the incorporation.
4. Execution plan (after writing-plans): `docs/superpowers/plans/2026-08-19-postn-deck-incorporation.md` (name may vary).

---

## 10. Delivery waves (for writing-plans)

| Wave | Work | Skills |
|---|---|---|
| W0 | Messaging reconcile + brief patches | `product-marketing`, `positioning-ideas`, `copywriting`, `devil-advocate` (claims pass) |
| W1 | Home diagrams + Problem copy; mobile mirror | Pencil MCP, `impeccable` layout/polish |
| W2 | Product diagrams SRE → Automation → Infrastructure → Observability | Pencil MCP, `impeccable` |
| W3 | Platform OCG + Aiden OS + roadmap | Pencil MCP, `impeccable` |
| W4 | Verify naming/CTA/ROI-off/tokens; OpenMemory + openmemory.md | `verification-before-completion` |

Orchestration: `using-superpowers` → this design → `writing-plans` → optional `dispatching-parallel-agents` within a wave when frames don’t collide → `verification-before-completion`.

---

## 11. Acceptance criteria

- [ ] Every harvested diagram is editable Pencil layers (not a single slide image)
- [ ] Linear tokens only; no glow/cyan brand break
- [ ] Naming map applied everywhere new copy appears
- [ ] Factory process and product loop both present and distinct on Home
- [ ] OCG full diagram on Platform; teaser on Home
- [ ] Schedule demo remains sole primary CTA
- [ ] No slide-14 dollar ROI on public frames
- [ ] Mobile Home mirrors new sections at readable density
- [ ] product-marketing + site-ia briefs updated to match canvas

---

## 12. Explicitly out of scope

- Replacing Linear world with deck light/beige or glow aesthetic
- Renaming products back to DevOps / InfraOps
- Publishing $4M–$6M model without sign-off
- New Solutions IA beyond existing Wave B stubs (unless a later brief unlocks)
- Re-opening Gartner hero decision before 27 Aug inquiry (hero H1 stays ADF unless separately unlocked)

---

## 13. Open items (non-blocking)

- Exact Home section order after inserting Factory process + OCG teaser (decide in W1 against Factory experience brief density)
- When/if Migration Early Access becomes its own page
