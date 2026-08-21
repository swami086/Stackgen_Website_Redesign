# Factory.ai Experience Brief (quality bar)

**Date:** 2026-08-19  
**Phase:** 2 of StackGen website content process  
**Sources:** Live Firecrawl of [factory.ai](https://factory.ai/) + [factory.ai/enterprise](https://factory.ai/enterprise) → `.firecrawl/factory-ref/home-2026-08-19.md`, `enterprise-2026-08-19.md`  
**Consumes:** `.agents/product-marketing.md` v1 · `PRODUCT.md` · Linear Direction Contract  

**Design read:** B2B enterprise marketing homepage for Platform/SRE buyers; Factory-like *information architecture and density*; Linear visual world (already pinned); StackGen purple `#9437FF` accent.

**Dials (for later Pencil work):** VARIANCE `5–6` (Linear restraint) · MOTION `4–5` (presence, not cinema) · DENSITY `4` (Factory section count, not Factory visual noise).

---

## Purpose

Steal **how Factory makes a visitor feel oriented and convinced** — not their category, copy, Droids metaphor, or dual CTA model.

| Steal | Do not steal |
|---|---|
| Section order and job-per-section clarity | “Industrial revolution / software factory” category language as ours |
| Bold one-line vision hero + short support | Dual primary CTAs (Start building + Contact Sales) |
| Logos early (trust before product dump) | Self-serve “Start building” as primary |
| Product as a **system of surfaces**, not a feature laundry list | Feature-card grids that could be any SaaS |
| Real UI / mechanism imagery as the visual idea | Abstract purple glow / vibecode aesthetics |
| Integrations “plugs into what you run” | Claiming we replace their stack |
| One featured case + quote, then logo/quote wall | Unverified quotes |
| Industry / regulated lanes late | Vibe-coding jokes as voice |
| Enterprise trust strip (compliance badges) | Their compliance badge set verbatim |
| Single closing CTA band | Their exact CTA labels |

---

## What Factory’s homepage actually does (spine)

Observed section order on factory.ai (2026-08-19):

| # | Factory block | Job of the section |
|---|---|---|
| 0 | Nav | Product / Enterprise / Pricing / News / Company + Log in + Contact Sales |
| 1 | **Hero** | One giant thesis (“THE INDUSTRIAL REVOLUTION…”) + short sub (“THE AUTONOMY STACK…”) + dual CTA |
| 2 | **Logo strip** | “Trusted by leading engineering teams” — proof before product |
| 3 | **Surfaces system** | “One platform, every surface…” — 6 numbered work surfaces with real product UI |
| 4 | **Flexibility / anti-lock-in** | Open + closed models; config switch; no vendor lock |
| 5 | **Platform depth** | “Build your software factory” — analytics, compute, automations behind the surfaces |
| 6 | **Integrations** | “Plugs into the stack you already run” + logo row + view all |
| 7 | **Featured case** | Comarch — named quote + link to case + customers |
| 8 | **Quote wall** | Multiple short customer quotes |
| 9 | **Industry lanes** | Finance / Defense / Healthcare / Telecom — regulated need |
| 10 | **Enterprise trust** | SOC2 / GDPR / ISO / air-gap / SAML |
| 11 | **Use-case loop (24/7)** | Numbered autonomous jobs: triage → ticket→code → review → QA → incident → docs |
| 12 | **News** | Freshness / authority |
| 13 | **Final CTA** | “Ready to build…?” → Start building |

**Craft patterns that make it feel “Factory”:**
1. **One job per section** — headline states the job; one short support line; then proof (UI / logos / quote).
2. **Vision-first hero** — category energy in the H1; product mechanics come *after* logos.
3. **System before features** — surfaces / loop diagram before deep feature pages.
4. **Trust sandwiches product** — logos early; compliance late; case in the middle.
5. **Real product as the image** — desktop/CLI/Slack screenshots, not stock.
6. **Numbered sequences** — 01–06 surfaces; 01–06 use cases — scannable for technical buyers.
7. **Enterprise page** compresses to: thesis → big metrics → logos → cases → integrations → security → CTA.

---

## Factory CTA model vs ours

| Factory | StackGen (locked) |
|---|---|
| Primary self-serve: **Start building** | **No** — sales-led |
| Secondary: **Contact Sales** | Replaced by sole primary: **Schedule demo** |
| Login in nav | Login may stay as nav utility, not competing CTA |

**Rule:** Every CTA pill on Home / Product / Platform = **Schedule demo**. Cases and docs are text links, not twin primaries.

---

## StackGen homepage spine (adapted)

Map Factory jobs → our locked messaging (L0–L2, proof stack, ADF loop).

| # | Section | Job | Content source | Factory analog |
|---|---|---|---|---|
| 0 | **Nav** | Orient + Schedule demo | Direction Contract / `Nav Desktop` | Product · Platform · Cases · Company + Schedule demo |
| 1 | **Hero** | Vision + who + CTA | H1: Autonomous DevOps Factory · Sub: L1 · Support: L0 · Body peek: L2 · CTA: Schedule demo | Giant thesis hero |
| 2 | **Logo strip** | Trust early | 12 logos from `docs/proof/customer-logos-and-quotes.md` | Trusted by… |
| 3 | **Problem (L1b)** | Why ADF now | 2–3 attributed stats (DORA / CodeRabbit / New Relic) — not fearmongering | *(Factory skips this; we need it for launch narrative)* |
| 4 | **ADF loop system** | Product as system | Build → Govern → Observe → Remediate → Aiden products | Surfaces system + 24/7 use-case loop (merged) |
| 5 | **Agentic OS depth** | How it works | L2 + deterministic + agentic planes / shared context (mechanism, not jargon dump) | “Build your software factory” depth |
| 6 | **Integrations** | Fits existing stack | Cloud / IaC / observability / CI logos — “plugs into what you run” | Integrations strip |
| 7 | **Featured case** | One deep proof | Prefer greytHR (published quote) or Innovaccer (metrics) | Featured case: Comarch |
| 8 | **In their words** | Quote wall | greytHR real + PLACEHOLDER quotes labeled; swap when approved | Quote wall |
| 9 | **Who it’s for / motions** | Lane entry | Platform (ADF+infra) · SRE · Developers-via-governance | Industry lanes (adapted to persona/motion, not Factory industries) |
| 10 | **Enterprise trust** | Compliance | SOC2 / PCI / HIPAA as on current site + partner badges | Enterprise trust strip |
| 11 | **Final CTA** | Convert | Schedule demo only | Ready to…? |

**Optional later (not Home v1):** News / blog strip — Factory has it; we can omit until content ops is ready.

---

## Section writing rules (Factory craft, StackGen voice)

1. **Hero budget:** Brand · one H1 · one short sub · one support line · one CTA · one dominant product/mechanism visual. No stats, schedules, or chip clusters in viewport one.
2. **Bold on hero only** — Factory energy on H1/sub; body = declarative, mechanism-first (locked brand voice D).
3. **No cards unless interactive** — prefer full-bleed product plane, numbered rows, logo strips, quote blocks.
4. **One composition** — first viewport is not a dashboard.
5. **Avoid:** em dashes · Olly · “single pane of glass” · Git/estate · replace-competitor claims · unverified quotes presented as real.
6. **Proof honesty:** PLACEHOLDER quotes labeled on canvas; industry stats always attributed.

---

## Visual world (already decided — brief only reminds)

- **Pinned:** Linear (linear.app) craft; Railway as secondary atmosphere reference.
- **Accent:** `#9437FF` only.
- **No:** purple-on-white defaults · glow · cream+serif terracotta · broadsheet · emoji · rounded-full pill spam.
- **Motion:** 2–3 intentional motions (hero presence, loop reveal, logo/quote crossfade) — not decorative noise.

---

## Enterprise / secondary page pattern (from Factory enterprise)

When we build Platform / Enterprise-ish pages later, compress to:

1. Thesis (operating model, not feature list)  
2. 3 big metrics (mechanism-backed)  
3. Logos  
4. 1–2 cases  
5. Integrations  
6. Security / compliance  
7. Schedule demo  

---

## Acceptance bar (Phase 2 → Phase 4/5)

A StackGen Home draft **passes** this brief if a reviewer can answer yes:

- [ ] First viewport reads as one composition with ADF as hero-level signal  
- [ ] Logos appear before deep product explanation  
- [ ] Visitor can name the **loop** (build → govern → observe → remediate) without scrolling to footer  
- [ ] Product is shown as a **system**, not six equal feature cards  
- [ ] At least one real case or published quote is visible before final CTA  
- [ ] Only primary CTA is Schedule demo  
- [ ] Problem strip uses attributed industry data (or is omitted — never uncited)  
- [ ] Visual world still reads Linear + StackGen, not Factory clone  

---

## Out of scope for this brief

- Full sitemap / page briefs → Phase 4  
- Competitive battlecard rewrite → Phase 3 (light; mostly already in product-marketing.md)  
- Pencil canvas edits → Phase 5  

---

## Scrapes

| File | URL |
|---|---|
| `.firecrawl/factory-ref/home-2026-08-19.md` | https://factory.ai/ |
| `.firecrawl/factory-ref/enterprise-2026-08-19.md` | https://factory.ai/enterprise |
| Prior | `.firecrawl/factory-brand/`, `.firecrawl/factory-ref/home.md` |

---

## Changelog

- 2026-08-19 — Phase 2 brief from live Factory scrape; StackGen homepage spine mapped to locked L0–L2 + Schedule demo CTA.
