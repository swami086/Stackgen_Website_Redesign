**STACKGEN  ·  PRODUCT MARKETING**

**StackGen Home Page**

Outline Design & Copy Guidance

| Version | v1.0 |
| :---- | :---- |
| **Date** | 18 August 2026 |
| **Owner** | John Jamie, Product Marketing |
| **Status** | Internal review draft — for AI design-tool generation |
| **Source** | Whiteboard session, 18 August 2026 (IMG\_9480–9484). Tall narrow diagram used as the master page-flow guide. |

# **Contents**

# **1\.  Purpose and how to use this document**

This document turns the 18 August whiteboard session into a build-ready specification for an updated StackGen home page. It has two jobs.

First, it is an internal review artefact: the section order, the message each band carries, and the draft copy are all here to be argued with before anything goes to design.

Second, it is a generation input. Every section carries an explicit layout spec, brand tokens, asset list and a paste-ready design prompt so the page can be generated in an AI design tool (Figma Make, v0, Lovable, Claude Artifacts) without a further translation step.

Copy in this document is draft, not final. Character counts are given against the constraints in the landing-page-content-outline skill so that generated designs do not break when real copy lands.

## **The narrative arc**

The whiteboard column reads top-to-bottom as the page scroll. The narrative arc it encodes is:

| Beat | Section | What it does |
| :---- | :---- | :---- |
| 1\. Claim | Hero | Name the thing and the outcome — 'Build your DevOps Factory'. |
| 2\. Credibility | Social proof — logo bar | Ten to twelve enterprise logos plus analyst validation, before the reader has to think. No quotes here. |
| 3\. Comprehension | How It Works (tabbed) | Inputs → Factory → Outcomes, left to right. This is the band that answers the red-pen question on the whiteboard: 'what is it?' |
| 4\. Substance | The Aiden family | Four named agents. The Factory is not an abstraction — it is these products, composable. |
| 5\. Corroboration | Case studies (scrolling) | Customers in their own words — on the Factory concept and on the individual agents. Proof in a second voice. |
| 6\. Tension | The problem | Why the old model fails: fragmented, siloed, multiple handoffs, narrow tolerance. |
| 7\. Vision | Factory animation | The 3D factory as the closing image — the operating model the reader is being invited into. |

Structural note for review: the whiteboard places the problem statement after the product family. That is a deliberate 'show, then justify' order and it can work — but it is the one sequencing decision worth a deliberate yes/no in review, because most enterprise pages establish tension before product. An alternative order (Hero → Logo bar → Problem → How It Works → Aiden family → Case studies → Animation) is specified as Option B in Appendix A.

Social proof is deliberately split across two bands rather than carried by one. Section 02 is the logo bar only — recognition, no reading required, placed where it buys attention for everything below. Section 05 is the case-study carousel — a second, human voice arriving after the reader has seen what the product actually is, which is the point at which a quote is worth reading rather than skimmed past.

## **A note on the hero naming**

Per direction on 18 August, this document uses the whiteboard hero verbatim: 'Build your DevOps Factory with StackGen'.

Flagged for the record, not to reopen the decision: the two Gartner inquiries held on 4 August 2026 pushed against 'Factory' as a product-level descriptor. Ref\# 20254008 (D.B. Cummings) said 'Factory is a hard term… I never think it resonates' and that DevOps Factory specifically makes I\&O and SRE audiences say 'that's not me'. Ref\# 20253963 (Kumar Dhir) accepted Factory as a target operating model but recommended the construct 'the Autonomous Operations Platform that enables an Autonomous Operations Factory'. A third inquiry (Ref\# 20254010, Ashish Banerjee) is booked for 27 August 2026\.

Practical mitigation used in the copy below: the hero keeps 'Factory' as the aspirational frame, and the sub-head immediately grounds it in operational language an SRE recognises ('first commit to self-healing production… the SLOs and policies you already own'). The Aiden product band then carries the concrete, role-recognisable naming. This lets the Factory frame lead without stranding the practitioner reader.

## **Naming decisions — 18 August 2026**

Naming decided 18 August 2026\. The Autonomous DevOps Factory is the parent category; the four Aiden agents sit beneath it. These names are used consistently throughout this document and must be used verbatim in any generated design.

| Level | Name | Note |
| :---- | :---- | :---- |
| Parent category | Autonomous DevOps Factory (ADF) | The umbrella the four agents sit under. Carried by the hero and the closing band. |
| Agent | Aiden for Infrastructure | Reverted from 'Aiden for InfraOps'. 'Infra' is acceptable as a short form in UI-constrained contexts; spell it out in body copy. |
| Agent | Aiden for Automation | Replaces 'Aiden for DevOps' — resolves the naming conflict with the parent category, which already carries 'DevOps'. |
| Agent | Aiden for SRE | No change. |
| Agent | Aiden for Observability | No change. 'Olly' is internal shorthand only and must never appear on the site. |

### **The four pillars**

Four pillars — Build · Operate · Observe · Remediate — were also agreed. The standing rule from the session is that the pillars appear on one diagram only.

* Applied here: the pillars live on the lifecycle rail in section 04, above the four agent cards, where each pillar sits over the agent that owns it. That is the one place they earn their keep, because they are doing the mapping work.

* They are deliberately NOT repeated in the How It Works diagram in section 03, which uses a different and non-competing set of three stages — Build it right · Prove it compliant · Run it safely.

* Watch item for design: 'Build' appears in both — as a pillar in section 04 and inside 'Build it right' in section 03\. They mean the same thing and that is fine, but the two must not be styled alike, or the reader will hunt for a mapping that does not exist. Keep the pillar rail typographic and small; keep the section 03 stages as diagram objects.

| Pillar | Agent | What it covers |
| :---- | :---- | :---- |
| Build | Aiden for Infrastructure | Provisioning, IaC, policy-checked change |
| Operate | Aiden for Automation | Pipelines, delivery, releases, GitOps |
| Observe | Aiden for Observability | Metrics, logs, traces, APM, SLO management |
| Remediate | Aiden for SRE | Investigation, root cause, bounded self-healing |

# **2\.  Design system constraints**

These are lifted from stackgen-brand-guidelines v2.4.1 and should be passed to any AI design tool as the system constraints. Do not let a generator invent colour or type.

## **Typography**

| Element | Specification | Notes |
| :---- | :---- | :---- |
| Primary typeface | Geist | SemiBold for titles, Medium for body |
| Secondary typeface | Geist Mono | Eyebrows, metrics, code, badge labels |
| H1 | Geist Medium · 53px | Letter spacing −3% · line height 93% |
| H2 | Geist Medium · 36px | Letter spacing −2.4% · line height 110% |
| H3 | Geist SemiBold · 30px | Letter spacing −2% · line height 100% |
| Body | Geist Medium · 16px | Letter spacing −2% · line height 127% |
| CTA text | Geist SemiBold · 16px | Letter spacing −2% · line height 162% |

## **Colour**

| Token | Value | Use |
| :---- | :---- | :---- |
| Purple (primary) | \#9437FF | Primary brand colour |
| Pink / Magenta | \#F73DF1 | Primary accent |
| Black / White / Light Gray | \#000000 / \#FFFFFF / \#D9D9D9 | Structural |
| Primary text | \#000000 | Headings and body |
| Secondary text | \#949494 | Supporting copy, metadata |
| Tertiary text | \#677479 | Captions, footnotes |
| Primary CTA fill | \#1A1515 | Main call-to-action buttons |
| Alt CTA fill | \#1F1D20 / \#373637 | Secondary buttons |
| CTA gradient | \#862DFD → \#F73DF1 → \#3FD9FB | Hero accents, primary emphasis |
| Black Space gradient | \#000000 → \#9437FF | Dark section backgrounds |
| Outline Show gradient | \#911BFF → \#FD5ED5 | Card borders and highlights |

## **Fixed agent gradients**

These are fixed, not decorative. They are the only per-product colour on the page and they appear once — on the product cards in section 04\.

| Agent | Gradient (primary → secondary) |
| :---- | :---- |
| Aiden for SRE | \#592FEA → \#4ADE80 |
| Aiden for Automation | \#036F51 → \#7CDEA3 |
| Aiden for Platform Engineering (Anchor) | \#1B23FF → \#64DBFF |
| Aiden for Platform Engineering (Build) | \#F85CF3 → \#FFC964 |
| Aiden for Governance | \#911BFF → \#FD5ED5 |

## **Surfaces, shadows and icons**

| Property | Specification |
| :---- | :---- |
| Corner radius | 10–20px on cards; 16px on website section cards; 20px on image containers |
| Card border | 2px gradient border drawn from the agent or primary palette |
| Shadow — standard | 0 8px 32px rgba(145,27,255,0.15), 0 4px 16px rgba(253,94,213,0.10) |
| Shadow — prominent | 0 16px 48px rgba(145,27,255,0.20), 0 8px 24px rgba(253,94,213,0.15) |
| Shadow rule | Never black or gray. Shadows are always a brand-colour glow. |
| Iconography | 2px line weight, rounded ends, geometric; gradient strokes for emphasis |

# **3\.  Section-by-section specification**

Sections are numbered in scroll order. Each carries the whiteboard source, the job it does, a layout spec, draft copy with character counts, the assets it needs, motion notes, and a paste-ready design prompt.

## **Section 00 — Global navigation**

**FROM THE WHITEBOARD**

Not drawn — implied by the frame at the top of the column.

**THE JOB THIS BAND DOES**

Carry over from the current site. Included here only so a generated page does not invent one.

**LAYOUT**

* Left: StackGen logo (Black+Purple on light, White on dark). Minimum lockup width 96px.

* Centre or left-adjacent: Platform · Solutions · Company · Resources.

* Right: 'Login to StackGen' (text link) and 'Schedule demo' (filled button, \#1A1515).

* Sticky on scroll; background goes to a translucent dark blur once the hero has passed.

**ASSETS REQUIRED**

* StackGen logo — SVG, Black+Purple and White variants

**MOTION AND INTERACTION**

Nav background fades in over 200ms once scroll position exceeds hero height.

**DESIGN PROMPT — PASTE INTO YOUR AI DESIGN TOOL**

Design a sticky top navigation bar for an enterprise AI infrastructure company. Left: wordmark logo. Right: four text nav items (Platform, Solutions, Company, Resources), a plain text link 'Login', and a solid near-black pill button 'Schedule demo'. Geist typeface, 16px, letter spacing \-2%. Transparent over the hero, then a dark translucent blur on scroll. Restrained and technical, not consumer-playful.

## **Section 01 — Hero**

**FROM THE WHITEBOARD**

'Build your DevOps Factory with StackGen' as the headline, a sub-line beneath, two button shapes side by side, a dotted rule below, and a circled note 'Diag?' to the right with an arrow to '90s cutaway style or video' and 'ADF'.

**THE JOB THIS BAND DOES**

Make the claim and name the category in one screen. The reader should be able to say what StackGen does before they scroll.

**LAYOUT**

* Full-bleed dark section using the Black Space gradient (\#000000 → \#9437FF), vignetted toward the edges.

* Two-column at ≥1200px: copy stack left (approx. 45% width), hero visual right (approx. 55%). Single column stacked on mobile, visual below copy.

* Copy stack order: eyebrow (Geist Mono, uppercase, letter-spaced) → H1 → sub-head → CTA pair → trust badge row.

* CTA pair: primary filled button, secondary ghost button with a 1px gradient border, 16px gap between them.

* Trust badge row sits beneath the CTAs at 13px Geist Mono in secondary text colour, separated by middot characters.

* Hero visual is contained in a Section Image Container: 20px radius, 2–3px gradient border, prominent shadow.

**DRAFT COPY**

| Element | Draft copy | Count |
| :---- | :---- | :---- |
| Eyebrow (≤3 words) | The DevOps Factory | 3 words · 18 chars |
| H1 (≤7 words) | Build your DevOps Factory with StackGen | 6 words · 39 chars |
| Sub-head (≤130 chars) | From first commit to self-healing production — governed by the SLOs, policies and cost guardrails you already own. | 114 chars |
| Primary CTA | Get a demo | 10 chars |
| Secondary CTA | Watch the 90-second tour | 24 chars |
| Trust badges | Stack-agnostic · Policy-enforced · Audit-ready · SOC 2 / PCI / HIPAA | 68 chars |

### **Alternate headlines**

Alternate H1s, should the Factory frame need softening for the practitioner reader (see naming note):

* "Your DevOps Factory. Built on the stack you already run."

* "From first commit to self-healing production."

* "The Autonomous DevOps Factory, on your terms."

**ASSETS REQUIRED**

* PRIMARY — ADF intro film, approx. 90 seconds, cutaway/cross-section style, with factory animation sequences illustrating inputs → factory → outcomes. This is the asset the whiteboard arrow points at ('90s cutaway style or video' → 'ADF'). Autoplay muted loop of the first 8 seconds as the hero poster; full film on click in a lightbox.

* FALLBACK — static 'How It Works' diagram (the same left-to-right inputs → factory → outcomes artwork used in section 03), for the period before the film is delivered and as the reduced-motion alternative.

* Poster frame at 2560×1440 for the video element.

**MOTION AND INTERACTION**

Hero visual: 8-second silent loop, no controls, with a play affordance overlaid. Copy stack: 300ms staggered fade-and-rise on load, 60ms between elements. Respect prefers-reduced-motion — serve the static diagram instead of the loop.

**DESIGN PROMPT — PASTE INTO YOUR AI DESIGN TOOL**

Design a dark full-bleed hero for an enterprise AI DevOps platform. Background: black to deep purple gradient, subtly vignetted. Left column: small uppercase monospace eyebrow 'THE DEVOPS FACTORY'; a large 53px headline in Geist Medium, tight tracking (-3%), reading 'Build your DevOps Factory with StackGen'; a 16px grey sub-head below; then two buttons side by side — a solid near-black primary 'Get a demo' and a ghost button with a purple-to-pink gradient border 'Watch the 90-second tour'; beneath them a row of small monospace trust badges separated by middots. Right column: a large rounded rectangle (20px radius) with a 2px purple-to-pink-to-cyan gradient border and a soft purple glow shadow, containing a video still of an isometric cutaway factory diagram. Serious, technical, high-contrast. No stock photography, no people.

**OPEN QUESTIONS**

* 'Comms cost' is written in the hero region of the whiteboard with an arrow into the video note. Read as production-cost commentary on the film rather than page copy — confirm.

## **Section 02 — Social proof — logo bar**

**FROM THE WHITEBOARD**

A row of four boxes marked 'logo', with the annotation 'Social proof 10–12'.

**THE JOB THIS BAND DOES**

Buy the reader's attention for everything below. Recognition only — no reading required. Quotes are deliberately held back to section 05, where they will actually be read.

**LAYOUT**

* Light band immediately below the hero — the tonal switch from dark to light is what signals 'the page has started'.

* Centred single-line intro, then a logo grid: 6 across × 2 rows at desktop (12 slots), 4 across at tablet, 3 across at mobile. This matches the current site's layout, which works — do not redesign it.

* Logos rendered monochrome at \#737373, sized to optical weight rather than bounding box. No logo cards, no borders.

* Retain the small 'Read case study' pill beneath the two logos that have a published study (currently GreytHR and Innovaccer). It is an unobtrusive route into deeper proof without breaking the band's rhythm.

* Beneath the grid, a thin separator and a second row of analyst / partner credentials in Geist Mono, 13px.

**DRAFT COPY**

| Element | Draft copy | Count |
| :---- | :---- | :---- |
| Intro line (≤60 chars) | Trusted by the enterprises that can't afford downtime | 53 chars |
| Credential row | Gartner Cool Vendor in AI for IT Operations · Named in 4 Gartner Hype Cycles · AWS Advanced Technology Partner · Google Cloud Partner | 133 chars |
| Case study pill | Read case study | 15 chars |

Logo set to draw from the current site: Nielsen, GreytHR, Corcentric, Piramal, Oro, SAP-NS2, ContextQA, RocTop, Chamberlain, Autodesk, InMobi, Innovaccer. Twelve available — the whiteboard calls for 10–12, so the full set works. Order by recognition, strongest top-left.

**ASSETS REQUIRED**

* 12 customer logos, SVG, single-colour

* Gartner / AWS / Google Cloud credential marks

**MOTION AND INTERACTION**

None. This band should feel static and factual. No auto-scrolling logo marquee — a moving logo bar reads as thin, and the page already has a horizontal scroll in section 05\.

**DESIGN PROMPT — PASTE INTO YOUR AI DESIGN TOOL**

Design a light social-proof band directly beneath a dark hero. A single centred line of 16px grey text: 'Trusted by the enterprises that can't afford downtime'. Below it, a 6-column by 2-row grid of twelve monochrome grey customer logos, generously spaced, optically balanced, no boxes or borders. Two of the logos have a small outlined pill button beneath them reading 'Read case study'. Below the grid, a thin hairline rule and a single centred row of small monospace credential text separated by middots. White background, lots of vertical breathing room. Understated.

## **Section 03 — How It Works — tabbed explainer**

**FROM THE WHITEBOARD**

Labelled 'TAB'. A large panel containing three circles and stacked text bars, with a right-hand column of one pill and two boxes. Annotated 'How it works' and 'Selection'.

**THE JOB THIS BAND DOES**

Answer the question written in red on the whiteboard: 'what is it?' This is the comprehension band and the most important module on the page. Inputs on the left, the Factory in the middle, outcomes on the right.

**LAYOUT**

* Dark band (Black Space gradient) to give the diagram contrast and to visually bracket it against the light bands either side.

* Section header centred above the module: H2 plus a one-line sub-head.

* Module is a two-part split: LEFT/MAIN canvas approx. 70% width holding the diagram; RIGHT rail approx. 30% holding the selectable titles.

* RIGHT rail is a vertical list of 4 selectable items. The active item is a filled pill with the Outline Show gradient border and white text; inactive items are ghost rows at \#949494. Each row is a title plus a one-line descriptor.

* LEFT canvas renders the diagram in three zones, left to right, with flow arrows between them:

  * ZONE 1 — INPUTS (approx. 20% of canvas width): a document card labelled 'Intent / Factory Spec', beneath it smaller chips for Repos & IaC, Telemetry, Policies & SLOs, Cloud state.

  * ZONE 2 — THE FACTORY (approx. 45%): a rounded container with three stacked stages — Build it right · Prove it compliant · Run it safely. Beneath the three stages, a full-width base bar labelled 'Aiden OS · Operational Context Graph · policy gate at every action'.

  * ZONE 3 — OUTCOMES (approx. 35%): three stacked outcome rows, each a label with a small trend sparkline — Reliability (rising), Cost (falling), Release velocity / autonomy (rising).

* Selecting a right-rail item highlights the corresponding path through the diagram and swaps the caption beneath the canvas. The diagram frame never changes — only the emphasis. This is what makes the module feel like one system rather than four slides.

* Mobile: the rail collapses to a horizontal scrolling tab strip above the diagram; the diagram rotates to a vertical top-to-bottom flow.

**DRAFT COPY**

| Element | Draft copy | Count |
| :---- | :---- | :---- |
| H2 (≤7 words) | How the Factory works | 4 words · 21 chars |
| Sub-head (≤130 chars) | Your intent goes in. Governed, verified change comes out — and production holds the line on its own. | 100 chars |

### **Tab content**

Four selectable items for the right rail. Title ≤4 words, descriptor ≤75 chars, canvas caption ≤130 chars.

| Tab title | Rail descriptor | Canvas caption |
| :---- | :---- | :---- |
| Build it right | Every rule — security, cost, quality — written as code in the Factory Spec | You state the outcome in plain language. The Factory turns it into a reviewable, diffable spec and enforces it on every change. |
| Prove it compliant | Audit evidence generated continuously as changes ship, not at audit time | Policy is evaluated at every action boundary before execution — deterministic, replayable, and attributable to an actor. |
| Run it safely | Production detects and heals inside the SLOs and cost guardrails you set | Self-healing runs only within SLO and policy limits. Outside them, humans are pulled in with the context already assembled. |
| Improve it every cycle | Prod signals become pre-prod gates, so the same failure ships only once | What production learns becomes a deploy-time gate. Detect-and-remediate in prod turns into predict-and-prevent at deploy. |

**ASSETS REQUIRED**

* Master 'How It Works' diagram — vector, four emphasis states (one per tab). This is the single most reusable asset on the page: it also serves as the hero fallback and as a stills source for the ADF film.

* Four sparkline glyphs for the outcome zone (two rising, one falling).

* Aiden OS / Operational Context Graph base-bar treatment.

**MOTION AND INTERACTION**

Tab switch: 250ms cross-fade of the emphasis layer only — the diagram skeleton stays put. Flow arrows animate left-to-right on first scroll into view, once. No looping ambient motion; it competes with the hero.

**DESIGN PROMPT — PASTE INTO YOUR AI DESIGN TOOL**

Design an interactive 'how it works' module on a dark purple-black gradient background. Layout: a large diagram canvas on the left (70% width) and a narrow vertical tab rail on the right (30%). The rail has four selectable rows; the active row is a pill with a purple-to-pink gradient border and white text, the inactive rows are dim grey. The diagram reads left to right in three zones connected by thin glowing arrows: on the left, a document card labelled 'Intent / Factory Spec' with four small input chips beneath it; in the middle, a large rounded container holding three stacked stages labelled 'Build it right', 'Prove it compliant', 'Run it safely', sitting on a full-width base bar labelled 'Aiden OS · Operational Context Graph'; on the right, three outcome rows each with a small trend sparkline — Reliability rising, Cost falling, Release velocity rising. Thin 2px rounded-end line icons. Geist typeface. Technical schematic feel, like a well-drawn architecture diagram, not an infographic.

**OPEN QUESTIONS**

* Confirm the four tab titles. They are drawn from the ADF Bank CIO deck's spec-driven shift (Build it right / Prove it compliant / Run it safely); the fourth is added to carry the 'prod signals become pre-prod gates' play family from ADF\_Play\_Criteria\_v1.0.

* The whiteboard panel shows three circles. Read as the three Factory stages rather than three avatars — confirm.

## **Section 04 — The Aiden family**

**FROM THE WHITEBOARD**

'Aiden for SRE   DevOps' written across a band beneath the tabbed module. Neighbouring board lists Aiden for Infra, Aiden for DevOps, Aiden for Observability and Aiden for SRE against Build / Operate / Observe / Remediate.

**THE JOB THIS BAND DOES**

Make the Factory concrete. A reader who does not buy the Factory frame still recognises the agent that maps to their job — this band is the practitioner's landing point.

**LAYOUT**

* Light band. Section header left-aligned with the grid, not centred — the shift in alignment separates it from the explainer above.

* Four cards in a row at desktop, 2×2 at tablet, stacked at mobile. Equal height, 16px radius, white fill.

* Each card carries a 2px top border in that agent's fixed gradient — this is the only place on the page where the per-agent colours appear, which is what makes them read as a family.

* Card internals, top to bottom: agent logo mark (40px) → agent name (H3) → one-line promise → a 2×2 metric block in Geist Mono → up to four capability bullets → a text CTA with a trailing arrow.

* Above the four cards, a thin pillar rail: Build → Operate → Observe → Remediate, with each label sitting over the agent that owns it. This is the whiteboard's own framing and it does a lot of work cheaply. Per the 18 August decision, this is the ONLY place on the page the four pillars appear — do not repeat them in the section 03 diagram.

**DRAFT COPY**

| Element | Draft copy | Count |
| :---- | :---- | :---- |
| H2 (≤7 words) | One agent. Four surfaces. One context graph. | 7 words · 44 chars |
| Sub-head (≤130 chars) | Each agent earns its keep alone. Together they run the plays no single-domain tool can — because they share one memory. | 119 chars |

### **Product cards**

**BUILD   Aiden for Infrastructure**

Promise: "Stop choosing between fast and compliant."

| Metric block (2×2) | Capability bullets (≤4) |
| :---- | :---- |
| 10× velocity — minutes, not days   ·   100% policy-checked deploys | AI IDE-based infra creation via MCP   ·   Producer / consumer model |
| 95% less IaC toil   ·   60% lower IaC cost | Cloud discovery and cloud-to-code   ·   Continuous drift detection and remediation |

Card CTA: "Explore Aiden for Infrastructure"

**OPERATE   Aiden for Automation**

Promise: "Pipelines that check themselves before they ship."

| Metric block (2×2) | Capability bullets (≤4) |
| :---- | :---- |
| \~30% fewer pipeline tickets   ·   Pre-deploy infra checks | Self-verifying, drift-aware pipelines   ·   Pre-deploy infrastructure validation |
| Canary gates   ·   Automatic rollback | Canary gates and auto-rollback   ·   GitOps-native |

Card CTA: "Explore Aiden for Automation"

**OBSERVE   Aiden for Observability**

Promise: "Your monitoring stack shouldn't need its own on-call."

| Metric block (2×2) | Capability bullets (≤4) |
| :---- | :---- |
| 60%+ lower observability cost   ·   2–5 SRE FTEs reclaimed | Unified metrics, logs, traces and APM   ·   Drop-in Prometheus remote-write |
| 300+ integrations   ·   Native PromQL | Open standards, managed OTel stack   ·   SLO management built in |

Card CTA: "Explore Aiden for Observability"

**REMEDIATE   Aiden for SRE**

Promise: "Less toil. Faster recovery. Your SREs, amplified."

| Metric block (2×2) | Capability bullets (≤4) |
| :---- | :---- |
| 50% MTTR reduction   ·   66% faster RCA | Automatic service discovery   ·   SLO-based alert triage |
| 90% less alert noise   ·   10–15 hrs/week reclaimed per SRE | Evidence-backed root cause analysis   ·   Human-approved remediation |

Card CTA: "Try Aiden for SRE in action"

Band closer (130 chars): "All four run on Aiden OS and read one Operational Context Graph. That shared memory is what makes the cross-domain plays possible."

**ASSETS REQUIRED**

* Four per-offering Aiden logos — SVG, from the June 2026 Base \+ SVG set. NOTE: the DevOps mark needs renaming to Automation per the 18 August naming decision; the InfraOps mark reverts to Infrastructure.

* Lifecycle rail treatment (Build → Operate → Observe → Remediate)

**MOTION AND INTERACTION**

Cards rise 4px with a deepened brand-glow shadow on hover. Staggered 80ms entrance on scroll into view. No card flipping.

**DESIGN PROMPT — PASTE INTO YOUR AI DESIGN TOOL**

Design a light product band with four equal-height white cards in a row, 16px corner radius, soft purple-glow shadows. Above the cards, a thin horizontal pillar rail with four small uppercase labels — Build, Operate, Observe, Remediate — each positioned over its card. Each card has a 2px gradient top border in its own colour pair: card 1 blue-to-cyan, card 2 dark-green-to-mint, card 3 purple-to-pink, card 4 indigo-to-green. Card contents top to bottom: a 40px rounded-square product logo mark, a 30px semibold product name, a one-line italic-weight promise, a 2x2 grid of monospace metrics, four short bullet lines with 2px rounded-end check icons, and a text link with a trailing arrow. Geist typeface throughout. Clean, dense, enterprise SaaS — the cards should feel like specification sheets, not marketing tiles.

**OPEN QUESTIONS**

* Card order currently follows the pillars (Infrastructure → Automation → Observability → SRE). The whiteboard writes 'Aiden for SRE' first, and the case-study band in section 05 is weighted 60% to SRE. If SRE is the priority agent for launch, lead with it and let the pillar rail run Remediate-first — but the pillar sequence reads better left to right. Decision needed.

## **Section 05 — Case studies — scrolling quote carousel**

**FROM THE WHITEBOARD**

Not on the whiteboard. Added by direction on 18 August: social proof splits into a logo bar at the top (section 02\) and a case-study band further down, in the horizontally scrolling card format used by factory.ai.

**THE JOB THIS BAND DOES**

Hand the argument to a second voice. By this point the reader knows what the Factory is and which agent maps to their job — a quote here is read rather than skimmed. The mix is deliberate: broad endorsement of the Factory concept, then specific agent-level proof weighted to SRE.

**LAYOUT**

* Light band, tonally a half-step off white (\#FAFAFA or similar) so the white cards separate from the background. This is the factory.ai treatment and it is the right one — pure white cards on pure white read as a flat list.

* Eyebrow above the header: a small coloured dot followed by 'CASE STUDIES' in Geist Mono, uppercase, letter-spaced.

* Section header left-aligned at H2, single line. No sub-head — the cards carry the argument.

* Cards in a single horizontal row that scrolls sideways. Card width approx. 320–360px, fixed height, 16px radius, white fill, very soft shadow. Gap approx. 24px.

* Critical detail from the reference: the row bleeds off both edges of the viewport with partial cards visible and a soft white fade mask at each end. The partial card is what tells the reader there is more to see — without it the band reads as a static four-up and nobody scrolls.

* Card internals: customer logo top-left at approx. 28px height → generous empty space → the quote → attribution in Geist Mono (name on line one, ROLE, COMPANY on line two, both uppercase) → a circled arrow bottom-right linking to the full case study.

* The quote sits low in the card, not centred. The empty space above it is doing deliberate work — it makes each card feel like a considered statement rather than a testimonial tile.

* Controls: drag/swipe, trackpad horizontal scroll, and arrow keys. Add left/right chevron buttons at desktop for discoverability. No dots — with 10 cards a dot row is noise.

* Mobile: same horizontal scroll with snap points, one card per viewport plus a visible sliver of the next.

**DRAFT COPY**

| Element | Draft copy | Count |
| :---- | :---- | :---- |
| Eyebrow | CASE STUDIES | 12 chars |
| H2 (≤7 words) | Built with the teams running it | 6 words · 31 chars |
| Card CTA (icon) | Circled arrow → full case study | 31 chars |

### **Placeholder quotes**

PLACEHOLDER QUOTES — none of the following is a real customer statement. They are written to the right length, register and subject mix so that layout and design can be finalised before customer approvals land. Every one must be replaced with an approved, attributed quote before publication. Names and companies are deliberately bracketed so a placeholder cannot be shipped by accident.

Mix by design: 3 cards on the Factory concept as a whole (including 1 that bridges concept and multiple agents), then 7 agent-level cards weighted to SRE — 5 of the 8 product-referencing cards touch SRE (\~62%), with the remainder on Infrastructure, Observability and Automation.

| \# | Theme | Placeholder quote | Attribution |
| :---- | :---- | :---- | :---- |
| 1 | ADF concept — the future | "The autonomous factory is where operations is going. It is the first model we have seen that treats speed and control as the same problem rather than two teams arguing." | \[NAME\] · CTO, \[GLOBAL FINANCIAL SERVICES FIRM\] |
| 2 | ADF concept — built together | "We are not buying a finished product, we are building this with StackGen. Our SLOs, our policies, our sequencing — that is what made it credible to our risk function." | \[NAME\] · VP PLATFORM ENGINEERING, \[ENTERPRISE SAAS\] |
| 3 | ADF concept \+ multiple agents (bridge card) | "SRE told us what production actually needed, and infrastructure acted on it before the change shipped. That handoff used to be a person and a meeting. That is the whole idea, working." | \[NAME\] · DIRECTOR OF SRE, \[GLOBAL RETAILER\] |
| 4 | SRE | "Mean time to resolution went from hours to minutes, and the on-call rota stopped being the reason people leave the team." | \[NAME\] · HEAD OF SRE, \[FINTECH\] |
| 5 | SRE | "Every root cause comes back with its sources attached. My engineers stopped arguing about what happened and started arguing about what to do next." | \[NAME\] · PRINCIPAL SRE, \[HEALTHCARE PLATFORM\] |
| 6 | SRE | "Three hundred alerts became one incident that mattered. The first night it ran, nobody was paged and the thing still got fixed." | \[NAME\] · SRE MANAGER, \[LOGISTICS\] |
| 7 | SRE | "It remediates inside our error budgets and stops at the line we drew. That boundary is why our change advisory board signed off at all." | \[NAME\] · DIRECTOR OF RELIABILITY, \[INSURER\] |
| 8 | SRE \+ Observability (bridge card) | "We halved the observability bill and got faster investigations out of the same move. I did not expect those two to arrive together." | \[NAME\] · VP INFRASTRUCTURE, \[MEDIA GROUP\] |
| 9 | Infrastructure | "Provisioning went from a two-week ticket to an afternoon, and every deploy is policy-checked. Our auditors have stopped asking for screenshots." | \[NAME\] · HEAD OF CLOUD PLATFORM, \[MANUFACTURER\] |
| 10 | Automation | "The pipeline checks the infrastructure before it ships instead of finding out in production. Pipeline tickets are down and nobody misses them." | \[NAME\] · HEAD OF DELIVERY ENGINEERING, \[TELECOMS\] |

**ASSETS REQUIRED**

* Ten customer logos, single-colour, for the card headers — reuse the section 02 set where the customer has agreed to be quoted

* Circled arrow icon, 2px stroke, rounded ends

* Edge fade masks (left and right) matching the band background

* Approval tracking: StackGen\_Quote\_Approval\_Tracker\_v1.0.xlsx — Approved and Proposed sheets. No quote reaches this band until its row sits on the Approved sheet with Still current? \= Yes.

**MOTION AND INTERACTION**

No autoplay. The carousel moves only when the reader moves it — an auto-advancing quote band steals reading time and is the single most common reason testimonial carousels go unread. Momentum scrolling with snap-to-card. Cards lift 2px with a deepened shadow on hover. Arrow buttons fade in on hover at desktop.

**DESIGN PROMPT — PASTE INTO YOUR AI DESIGN TOOL**

Design a horizontally scrolling case-study carousel band on a very light warm-grey background. Top left: a small coloured dot followed by uppercase monospace eyebrow text 'CASE STUDIES', and beneath it a large 36px headline 'Built with the teams running it'. Below, a single row of white cards with 16px rounded corners and very soft shadows, roughly 340px wide and 440px tall, spaced 24px apart. The row bleeds off both the left and right edges of the frame with partially visible cards and a soft white fade mask at each end. Each card contains: a small monochrome customer logo at the top left, a large area of empty white space, then a two-to-three-line quote in 18px regular text sitting low in the card, then two lines of small uppercase monospace attribution (person's name, then role and company), and a circled arrow icon in the bottom-right corner. Calm, editorial, generous white space. No portraits, no star ratings, no quotation-mark graphics.

**OPEN QUESTIONS**

* All ten quotes are placeholders. Every one is logged as row P-01 to P-10 in StackGen\_Quote\_Approval\_Tracker\_v1.0.xlsx with Status \= Placeholder (design only); that workbook, not this document, is the master record of approval state. Confirm who owns customer approvals and how many real quotes are realistically available by the 7 September launch — the band degrades gracefully to six cards but not to three.

* Confirm the SRE weighting reads correctly: 5 of the 8 product-referencing cards touch SRE. If SRE should be 60% of all ten cards rather than of the product cards, two of the concept quotes need to become SRE quotes.

* Placement: currently after the Aiden family and before the problem band. If Option B ordering is chosen (Appendix A), this band stays immediately after the Aiden family regardless.

## **Section 06 — The problem**

**FROM THE WHITEBOARD**

'Problem defn' with a placeholder squiggle beneath. The adjacent board carries the substance: 'Fragmented, siloed / Multiple handoffs / Tolerance is narrow' → 'Context loss / knowledge'.

**THE JOB THIS BAND DOES**

Justify the Factory. Having shown what it is and what it's made of, name the failure mode it exists to remove. Three cards, each a structural failure, each quantified.

**LAYOUT**

* Dark band — the second and last dark section on the page, which makes it land as the serious moment.

* Centred H2 and sub-head, then three equal cards in a row (stacked on mobile).

* Cards use the Stats/Feature card treatment: dashed or thin gradient outline on a transparent fill, not solid white — the problem section should feel unfinished and open, in visual contrast to the resolved product cards above.

* Each card: a large metric in Geist Mono at H2 scale, gradient-filled → a title → a description → a small source attribution at 12px in tertiary text.

* Beneath the three cards, a single full-width pull line, centred, at H3 scale — the 'Verification Gap' statement. This is the line that earns the section.

**DRAFT COPY**

| Element | Draft copy | Count |
| :---- | :---- | :---- |
| H2 (≤7 words) | Machine-speed change. Human-speed control. | 4 words · 42 chars |
| Sub-head (≤130 chars) | AI writes code faster than your operations can safely run it. The gap between those two speeds is where failure lives. | 118 chars |

### **Problem cards**

| Metric | Card title | Description | Source line |
| :---- | :---- | :---- | :---- |
| 24% | 24% of change effort is rework | Fragmented, siloed tooling means the same work is redone downstream, at scale. | One leading Latin American bank — 53,000 deployments a week, 60-day lead time, 24% rework |
| L3 | Single-domain agents cap at Level 3 autonomy | A person is still the integration layer, carrying context between tools and teams. | StackGen autonomy model (L0–L5) |
| $400B | $400B a year lost to downtime | Narrow tolerance, multiple handoffs — and no one holding the whole picture when it breaks. | Splunk / Oxford Economics, Hidden Costs of Downtime (2024), across the Global 2000 |

Pull line (116 chars): "The test for any point tool: show me a play where the context comes from one domain and the action lands in another."

**ASSETS REQUIRED**

* No imagery. This band is typographic. Optional: a faint background schematic of broken handoff arrows at 6% opacity.

**MOTION AND INTERACTION**

Metric numbers count up on scroll into view, 600ms, once. Nothing else moves.

**DESIGN PROMPT — PASTE INTO YOUR AI DESIGN TOOL**

Design a dark problem-statement band on a black-to-deep-purple gradient. Centred 36px headline 'Machine-speed change. Human-speed control.' and a grey sub-head beneath. Below, three equal-width cards with thin dashed purple-gradient outlines on a transparent fill — deliberately lighter and less solid than typical product cards. Each card: a very large monospace metric at the top with a purple-to-pink gradient fill (24%, L3, $400B), then a bold title, then two lines of grey body copy, then a very small dim source line at the bottom. Beneath all three cards, a single centred 30px pull-quote line spanning the full width. High contrast, sparse, serious. No illustration.

**OPEN QUESTIONS**

* The three metrics are drawn from ADF\_Bank\_CIO\_Deck\_v1.0 slides 3 and 20\. The Bancolombia figure is anonymised as 'a leading Latin American bank' per standing practice — confirm that anonymisation holds for public web, where it is more exposed than in a deck.

* Legal / analyst-relations check needed on the Splunk / Oxford Economics attribution before publication.

## **Section 07 — The Factory — closing animation**

**FROM THE WHITEBOARD**

'3D' circled, with 'Animation of factory' beneath it, as the final band in the column.

**THE JOB THIS BAND DOES**

Leave the reader with the operating model as an image, not a claim. This is the vision band and the emotional close before the conversion ask.

**LAYOUT**

* Full-bleed, edge to edge, minimal chrome. Dark.

* The animation occupies the full width; copy is overlaid or sits beneath it, not beside it.

* Copy is short: an H2 and one line. Anything longer competes with the visual.

* A single primary CTA beneath, centred.

* Optional but recommended: the animation is scroll-scrubbed rather than autoplaying, so the reader drives the factory forward as they scroll. It ties the page's final movement to their own input, which suits the message.

**DRAFT COPY**

| Element | Draft copy | Count |
| :---- | :---- | :---- |
| H2 (≤7 words) | This is the operating model | 5 words · 27 chars |
| Body (≤130 chars) | Not a tool you add. A factory you run — staged, measured at every gate, and handed more autonomy only as it earns it. | 117 chars |
| CTA | See it running on your stack | 28 chars |

**ASSETS REQUIRED**

* 3D factory animation — isometric or cross-section cutaway, matching the style of the 90-second ADF film so the page bookends visually. Recommend the same production so the hero and the close are recognisably one asset family.

* Static hero frame for reduced-motion and for social/OG sharing.

**MOTION AND INTERACTION**

Scroll-scrubbed playback across the band's viewport height. Falls back to a static key frame under prefers-reduced-motion. Total asset budget: keep under 3MB or lazy-load below the fold.

**DESIGN PROMPT — PASTE INTO YOUR AI DESIGN TOOL**

Design a full-bleed dark closing band for an enterprise infrastructure website. The full width is occupied by a stylised isometric 3D cutaway of an automated factory floor rendered in black, deep purple and magenta with thin glowing cyan accent lines — abstract and diagrammatic rather than literal machinery, suggesting code and infrastructure flowing through automated stages. Overlaid on it, centred: a 36px headline 'This is the operating model', one line of grey body copy beneath, and a single solid near-black pill CTA button 'See it running on your stack'. Cinematic, restrained, no clutter.

**OPEN QUESTIONS**

* Production dependency: both the 90-second ADF film (section 01\) and this 3D animation are net-new assets. Confirm the production owner and whether the page ships with the static diagram fallback in the interim.

# **4\.  The persona selector — an unplaced whiteboard element**

The whiteboard carries one element that does not have a fixed slot in the column: a persona selector, written as 'I am a SRE / PE / Olly'. Alongside it: 'urgent DS → SSOR on home page → SRE proposal'.

Recommendation: build it as a slim, sticky-adjacent band placed between section 02 (social proof) and section 03 (How It Works). Three or four role chips — 'I'm an SRE' · 'I'm a platform engineer' · 'I run observability' · 'I'm an architect' — that scroll-jump to, and pre-select, the matching state in the sections below.

Why there: it gives the practitioner reader a fast exit from the Factory-level framing into role-recognisable language, which directly mitigates the 'that's not me' risk the Gartner inquiry raised. It costs one thin band and no new copy.

The fourth chip, architect, is worth adding even though it is not on the whiteboard — enterprise architects were named as an added persona in Gartner Ref\# 20254008 on anti-lock-in and modularity grounds.

'SSOR on home page' is read as a request to surface a single source of record / single source of truth message prominently. That is currently carried by the Factory Spec language in section 03 — confirm whether it needs its own treatment.

## **Retained sections below the fold**

The whiteboard column covers the top of the page. These existing home page bands sit below section 07 and are retained. They are listed so a generated page reproduces the full scroll rather than stopping at the animation.

| Band | Current headline | Recommendation |
| :---- | :---- | :---- |
| Governance | 'Autonomy needs guardrails.' | Retain. Strong reinforcement of the controllability concern Gartner flagged as the real buyer blocker. Consider promoting it above the problem band in a later iteration. |
| Integrations | 'Stack-agnostic, by design.' | Retain unchanged. Cloud · IaC · CI/CD · Observability · Security & Identity · ChatOps & ITSM · IDEs & MCP. |
| Demo CTA | 'See Aiden running in your environment.' | Retain. Note that section 07's CTA now partly duplicates it — either soften section 07's CTA to a secondary style, or cut this band. |
| Footer | Agents · Solutions · Company · Resources · Insights | Retain unchanged. |

### **Recommended for removal or absorption**

| Current band | Recommendation |
| :---- | :---- |
| 'The state of agentic DevOps' | Superseded by the new problem band (section 06), which says the same thing with numbers. Recommend removing to avoid two problem statements on one page. |
| 'Same Aiden agent. More surfaces.' | Partly absorbed into the Aiden family band. Pipelines, FinOps, Compliance Reporting and Custom Workflows still need a home — recommend a compact secondary row inside section 04 rather than a separate band. |

# **5\.  Generating this page in an AI design tool**

How to use this document with an AI design tool.

1. Pass the design tokens table (colour, typography, surfaces) as a system-level constraint before any section prompt. Generators will otherwise invent a palette, and StackGen's purple-to-magenta system is distinctive enough that a generic AI palette will look obviously wrong.

2. Generate one section at a time using the 'Design prompt' block in each section. Do not ask for the whole page in one pass — the tabbed module in section 03 is complex enough that it will be flattened into a static graphic if it competes for attention with five other bands.

3. Generate sections 01, 03 and 07 first. They carry the page's visual identity; sections 02, 04, 05 and 06 are conventional and will resolve easily once the tone is set.

4. Feed the draft copy verbatim rather than letting the generator write placeholder text. Character counts in this document are set against the constraints in the landing-page-content-outline skill, so real copy will fit the generated layout.

5. Explicitly instruct against: stock photography, human faces, isometric cartoon illustration, and rounded consumer-app styling. StackGen's brand reads technical and restrained; every one of those defaults pulls it toward generic SaaS.

6. For the two animated assets (sections 01 and 07), generate a key frame as a still first and approve the style before commissioning motion.

# **Appendix A — Option B, problem-first ordering**

Option B — problem-first ordering. Specified so it can be compared directly in review rather than debated in the abstract.

| \# | Section | Change |
| :---- | :---- | :---- |
| 01 | Hero | Unchanged. |
| 02 | Social proof — logo bar | Unchanged. |
| 03 | The problem | Moves up. Establishes tension before explanation. |
| 04 | How It Works | Now reads as the answer to a question just asked, which is a stronger position for it. |
| 05 | The Aiden family | Now the proof that the answer is real and shippable. |
| 06 | Case studies | Unchanged in position — stays immediately after the Aiden family. |
| 07 | Factory animation | Unchanged. |

Option B is the more conventional enterprise structure and is likely to convert better on cold traffic. The whiteboard order (Option A) is stronger for warm traffic that already knows the problem and wants to see the thing. If the page is primarily a launch destination for the 7 September ADF launch — where inbound will have been primed by the campaign — Option A is defensible. If it is the permanent home page carrying organic search traffic, Option B is the safer choice.

Recommend Option A for launch, with the problem band instrumented so it can be moved up without a redesign if scroll-depth data shows drop-off before section 06\.

# **Appendix B — Open questions for review**

Consolidated from the section specifications. These are the decisions needed before design generation starts in earnest.

| Section | Question |
| :---- | :---- |
| Hero | Confirm 'Comms cost' on the whiteboard refers to film production cost, not page copy. |
| Hero \+ close | Confirm production owner and timeline for the 90-second ADF film and the 3D factory animation, and whether the page ships with static fallbacks. |
| How It Works | Approve the four tab titles and confirm the three circles on the whiteboard are the three Factory stages. |
| Aiden family | Decide card order — pillar order (Infrastructure first) or SRE first. |
| Aiden family | Decide where Pipelines, FinOps, Compliance Reporting and Custom Workflows live. |
| Case studies | All ten quotes are placeholders (tracker rows P-01 to P-10). Confirm the approvals owner and how many real, attributed quotes land before 7 September. |
| Case studies | Confirm the SRE weighting: 60% of the product-referencing cards, or 60% of all ten cards? |
| Naming | Confirm the renamed Aiden marks (Infrastructure, Automation) are produced before design generation — the current asset set still says InfraOps and DevOps. |
| Problem | Confirm the Bancolombia anonymisation holds for public web; legal / AR sign-off on the Splunk / Oxford Economics figure. |
| Persona module | Approve or drop the 'I am a…' role chips, and confirm what 'SSOR on home page' requires. |
| Page order | Choose Option A (whiteboard order) or Option B (problem-first) — see Appendix A. |
| Naming | Note the 27 August Gartner inquiry (Ref\# 20254010\) lands after this page would need to be locked. Decide whether the hero is held until then. |

# **Appendix C — Sources**

* Whiteboard photographs, 18 August 2026 — IMG\_9480 (master page-flow column), IMG\_9481, IMG\_9482, IMG\_9483, IMG\_9484. Website Updates (FY27Q3) / Home Page.

* ADF\_Bank\_CIO\_Deck\_v1.0.pptx — messaging frames, the Verification Gap, the spec-driven shift, evidence base (slide B10). 260907 \- DevOps Factory.

* ADF\_Play\_Criteria\_v1.0.md — the cross-domain definition of an ADF play and the 'prod signals become pre-prod gates' family.

* Gartner inquiries, 4 August 2026 — Ref\# 20254008 (D.B. Cummings) and Ref\# 20253963 (Kumar Dhir), on Factory vs Platform naming.

* stackgen.com, retrieved 18 August 2026 — current section inventory, product metrics, logo set and footer structure.

* stackgen-brand-guidelines skill v2.4.1 — colour, typography, agent gradients, card and shadow treatments.

* landing-page-content-outline skill — character constraints applied to all draft copy.

* StackGen\_Quote\_Approval\_Tracker\_v1.0.xlsx — the master quote approval tracker built alongside this document, replacing the Google Doc tracker (1Q9e0lVS2RXtV31awwKSJBf2cGHF-pgeauu4QTnT44u0). Section 05 placeholders are logged there as P-01 to P-10.

# **Version history**

| Version | Date | Changes | Skills used |
| :---- | :---- | :---- | :---- |
| v1.0 | 18 Aug 2026 | Initial creation from the 18 August whiteboard session. Whiteboard hero retained per direction; Gartner naming tension flagged rather than resolved. | landing-page-content-outline · stackgen-brand-guidelines v2.4.1 · docx · john-file-versioning v2.0 |

