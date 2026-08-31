# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js 16.3, React 19.2, TypeScript strict, Tailwind v4 `@theme` tokens, Vitest and Playwright, pnpm, in `web/`. Docker multi-stage on `node:24-alpine` with compose profiles `dev` and `prod` on `:3000`. Decided and shipped 20 Aug 2026; the earlier record that the deliverable was a Pencil canvas with no framework decision is superseded.

`Stack_Linear.pen` remains a design artifact edited through the Pencil MCP server, but it no longer gates the build. Code leads and the canvas is updated to match what ships (20 Aug 2026).

## Users

Primary: the SRE and platform engineer. They are on call, they own the SLOs and error budgets, and they evaluate infrastructure tooling from inside a running production estate — then carry a recommendation upward. Confirmed 18 Aug 2026 as the reader this page is optimised for: the first viewport must show the mechanism working, not name a category.

Secondary: the executive buyer (CIO, VP Infrastructure, VP Platform Engineering) who sets operating-model direction and signs. They arrive already primed by campaign or analyst contact.

Known risk on record: Gartner inquiry Ref# 20254008 (D.B. Cummings, 4 Aug 2026) found that "DevOps Factory" as a product-level descriptor makes I&O and SRE audiences say "that's not me". Ref# 20253963 (Kumar Dhir) accepted Factory as a target operating model but not as the product. A third inquiry (Ref# 20254010) is booked for 27 Aug 2026, after this page would need to lock.

## Product Purpose

StackGen makes infrastructure change safe at machine speed. Intent stated in plain language becomes policy-checked Terraform/OpenTofu that lands in the customer's own Git, with policy evaluated at every action boundary before execution. Success is a production estate that detects and heals inside the SLOs and cost guardrails the customer already set, with humans pulled in — context pre-assembled — only when something crosses those limits.

## Positioning

The core differentiator is that StackGen *changes* infrastructure safely rather than only observing or advising it: intent becomes policy-checked Terraform that lands in the customer's own Git. Two planes make that possible and a single-domain competitor cannot truthfully claim both:

- **Deterministic plane** — AppStacks, Terraform/OpenTofu, the Tirith policy framework, topology.
- **Agentic plane** — Aiden.

All agents run on Aiden OS and read one Operational Context Graph. That shared memory is what enables cross-domain plays, defined as: the context comes from one domain and the action lands in another. Single-domain agents cap at Level 3 autonomy on StackGen's L0–L5 model because a person remains the integration layer.

Trust ladder, in order: recommend → approve → act-within-policy.

Competitor set: AWS DevOps Agent, Traversal, Last9, Resolve.

## Operating Context

Buyers evaluate from inside a live estate: existing repos and IaC, telemetry, policies and SLOs, and current cloud state are the inputs. Evaluation artefacts that matter to this reader are diffs, pull requests, policy evaluation results, alert and incident timelines, and error-budget math — not brochures. Change advisory boards and risk functions are real gatekeepers; a bounded, refusable autonomy limit is what gets sign-off.

## Capabilities and Constraints

Named products, **verbatim and binding** (naming locked 2026-08-31 per Website Sequencing deck + AOF site IA design):

- Parent category: **Autonomous Operations Factory (AOF)**
- **Aiden for InfraOps**
- **Aiden for DevOps**
- **Aiden for Observability**
- **Aiden for SRE**

Superseded 2026-08-31: Infrastructure / Automation / ADF per Website Sequencing deck + AOF site IA design.

Four pillars, mapped one-to-one: Build → Aiden for InfraOps · Operate → Aiden for DevOps · Observe → Aiden for Observability · Remediate → Aiden for SRE. Standing rule: the pillars appear on one diagram only.

"Olly" is internal shorthand and must never appear on the site.

Other named assets: AppStacks, StackBuilder, StackGuard, StackAnchor, Tirith, Aiden OS, Operational Context Graph.

Undecided / not to be assumed: whether the hero holds for the 27 Aug Gartner inquiry; the Haffer XH web licence.

## Brand Commitments

- The visual world is pinned by the user to the **StackGen positioning deck**, Figma `sg-new-postn-deck_editable` (file `YBfVxdQOKKZm7NcgceiacD`). Confirmed 20 Aug 2026. Warm cream ground `#F0E8E0`, warm near-black plates `#181810`, an iridescent lavender-to-cyan field as the signature, Haffer XH as the face. This overrides the StackGen brand guidelines v2.4.1 palette, typography and surface treatments.
- **Superseded 20 Aug 2026:** the Linear (linear.app) pin with Railway as secondary reference, and `#9437FF` as the single accent, both confirmed 18 Aug 2026. Recorded here so the change is auditable rather than silent.
- Colour strategy is **Committed**: the iridescent field owns whole regions rather than accenting a neutral ground. Accent violet `#B898F8` and cyan `#A8E0F8` are valid on dark plates and on cream only as fills; accent *text* on cream is `#6D28D9`.
- The ground is light because the page is a document about the product, not an imitation of it. The product appears in dark plates, in the SRE's own register.
- **factory.ai** is the experience reference for structure, page rhythm and copy discipline only. It contributes no colour, type or form. One world owns the page and it is the deck's.
- The **logo** mark and wordmark geometry are fixed. Colour adapts to ground: ink on cream, cream on plates.
- Voice rules: declarative sentences, no hedging, every claim cites a mechanism. Median sentence length 7 to 9 words; at least 85% of sentences 15 words or fewer.

## Evidence on Hand

Real and usable:

- Product metrics — Aiden for SRE: 50% MTTR reduction, 66% faster RCA, 90% less alert noise, 10–15 hrs/week reclaimed per SRE, 2–5 FTEs reclaimed. InfraOps: 10× velocity, 100% policy-checked deploys, 95% less IaC toil, 60% lower IaC cost. DevOps: ~30% fewer pipeline tickets. Observability: 60%+ lower cost, 300+ integrations, native PromQL.
- Problem-side figures: 24% of change effort is rework (one leading Latin American bank, 53,000 deployments/week, 60-day lead time — anonymisation to hold for public web); $400B/year lost to downtime (Splunk / Oxford Economics, *Hidden Costs of Downtime*, 2024, across the Global 2000); Level 3 autonomy cap (StackGen L0–L5 model).
- Customer logo set from live homepage (2026-08-19): Nielsen, greytHR, Corcentric, Piramal, NIQ, SAP-NS2, Lowe's, RocTop, Chamberlain, Autodesk, InMobi, Innovaccer. Assets + design quotes: `docs/proof/customer-logos-and-quotes.md`. Published case studies: greytHR (named quote) and Innovaccer (metrics only). Oro / ContextQA were in prior drafts but are not on the current strip.
- Analyst credentials: Gartner Cool Vendor in AI for IT Operations; named in 4 Gartner Hype Cycles; AWS Advanced Technology Partner; Google Cloud Partner.
- **Real product footage** on the StackGen YouTube channel, usable as site proof (recorded 20 Aug 2026): Auto-Generate Compliance and Security Audits `i31kMgVn_Xk` (4:17), Approval and Auto Remediation Flow `HKEV6rkRDzU` (2:38), Module Editor / MCP Server / IDE `92UTOY9C1UY` (3:13), StackOptimizer `2PsieosSyAw` (5:47), Introducing Autonomous Infrastructure Platform `NBl7pkkxxZM` (2:01). Raw frames contain live identifiers and must be cleared before use; see the redaction rule below.

Absent — must not be fabricated:

- **All ten customer quotes are placeholders** (tracker rows P-01 to P-10 in `StackGen_Quote_Approval_Tracker_v1.0.xlsx`). No quote may appear as real. Any quote on the site is labelled as a placeholder.
- The 90-second AOF film and the 3D factory animation do not exist. The demo footage above is the proof layer instead; no cinematic asset may be implied.
- Aiden product logo marks for InfraOps and DevOps are not yet produced as separate assets; the current set uses legacy InfraOps / DevOps labels. Superseded deck diagram titles (Infrastructure / Automation) are corrected on port.
- Legal / analyst-relations sign-off on the Splunk attribution is not yet obtained.
- Modeled dollar ROI (deck slide 14, $4M to $6M) is not cleared for public web and must not ship.

**Redaction rule, binding.** Product footage carries live identifiers: an AWS account ID and real bucket names were observed in `i31kMgVn_Xk`. Frames and clips ship only after every frame of the chosen segment has been scanned for account IDs, ARNs, bucket and repository names, internal hostnames, email addresses, customer names and tokens. Selection over editing: choose segments that were never sensitive, because a ten-second clip is roughly 300 frames and cannot be redacted one at a time.

## Product Principles

1. **Prove with the artifact.** This reader believes diffs, policy results and incident timelines. Every claim earns its place by showing the mechanism that produces it.
2. **Bounded autonomy is the product, not a caveat.** The refusal line — remediation stops at the limit you drew — is what gets change advisory board sign-off. Lead with the boundary, not around it.
3. **Shared memory is the moat.** One Operational Context Graph across four surfaces is the thing a single-domain competitor cannot answer. The cross-domain play is the test.
4. **The estate is the customer's.** Their Git, their SLOs, their policies, their cloud. Nothing lands outside it.
5. **Name things once, exactly.** The naming table is fixed vocabulary, not copy to be improved.

## Accessibility & Inclusion

No product-specific standard has been established by the user. The site holds itself to WCAG 2.2 AA contrast for all text.

Under the light world this constrains the deck's own values rather than inherited greys, and the constraint runs one way. The deck's muted `#96897C` reads 5.2:1 on a dark plate and 2.8:1 on cream; its violet and cyan are 7.5:1 and 12.5:1 on plates and 2.0:1 and 1.2:1 on cream. **Deck colours are valid inside dark plates and invalid on cream.** On cream, muted text is `#6B6154` (5.0:1) and accent text is `#6D28D9` (5.9:1). Enforced by the content governance test.

Desktop-only remains an accepted deviation: SC 1.4.10 Reflow and SC 1.4.4 Resize Text are not met, and full AA conformance is not claimed. Motion respects `prefers-reduced-motion` by substituting a calm alternative that preserves state and hierarchy, never by suppressing feedback globally.
