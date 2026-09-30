# AOF Homepage Launch Video

**Status:** Design approved in conversation, 30 Sept 2026. Not built.
**Route:** HyperFrames `product-launch-video`
**Project:** `videos/aof-homepage/` (new). Pin `hyperframes@0.8.40`.
**Frame:** 1920×1080, 16:9 homepage embed.
**Length:** 138.745s, the storyboard beat list. The file’s “2:09” label is not the timeline.
**Source:** Drive storyboard `260925 - AOF Homepage Video Storyboard Visual v2.0.html` (`DATA.home`) for structure, timings, and unrevised scene action. On-screen and spoken lines in this spec replace the storyboard where they differ.
**Audience:** The on-call SRE, the primary homepage reader.
**CTA:** Schedule a demo. One button. No URL in the end card. The viewer is already on the site.

## Intent

This is the homepage product-launch film. It sells the Autonomous Operations Factory. It is not a site tour and not a feature list.

The first 6.5 seconds name the pain the page already states. The product appears inside the four-products act as honest UI, with SRE first. The close asks for one action.

## Architecture

One master composition. Six sub-compositions in storyboard order. `BRIEF.md` in the project is the routing file: workflow `product-launch-video`, promo, these lines, 16:9.

| Composition | Start | Length | Job |
|---|---|---|---|
| Why an operations factory | 0.000s | 28.455s | Hook, then the problem, then the two factories join |
| Four ways to start | 28.455s | 5.252s | Name the category |
| The four products | 33.707s | 77.697s | One outcome per product. SRE is live UI |
| Unified context | 111.403s | 11.045s | World model plate |
| Aiden OS | 122.448s | 11.872s | Governance plate and one approval |
| Close | 134.321s | 4.424s | End card, one button |

The table is the master clock. Beat notes below use the storyboard’s rounded marks and must stay inside these windows.

`videos/aof-remediation-card` is a reference for the SRE Approve beat. It is not the master timeline.

## Lines

Spoken lines must fit the beat at about 120–140 words a minute. If a line is long, cut words. Do not speed the read.

### Why an operations factory

Factory jigsaw, cream-to-lilac, violet Software Factory piece, pink Ops Factory piece. Four beats.

1. **0.00–6.49s.** Violet piece alone. Tokens speed off the right edge. On screen: “Take control of production.” Voice: “AI code is hitting production faster than you can see it.”
2. **6.49–16.30s.** Ops Factory arrives as four drifting quarters: Build, Operate, Observe, Remediate. A person carries one token across the gap. On screen: “Delivery got faster. Operations didn’t.”
3. **16.30–21.96s.** Quarters lock into one piece. On screen: “OPERATIONS FACTORY.” Voice: “What’s missing is an operations factory, where all four work as one.”
4. **21.96–28.46s.** The two pieces click on the center tab. Tokens flow through both halves. On screen: “Your software factory needs an operations factory.”

### Four ways to start

**28.46–33.71s.** Push in. Quarter seams draw on. Each quarter pulses once, in product order. On screen: “Autonomous Operations Factory.” Voice: “Aiden gives you four ways to start.”

### The four products

Same pattern four times: the matching quarter lights, the other three go grey, a title card, then the product motion.

**SRE, 33.71–55.10s.** Quarter lights cyan. Title: “REMEDIATE · Aiden for SRE.” Three cuts from the live Auth Validation investigation:

- Alert queue, the active count dropping.
- Confirmed root cause. Confidence 99%. New pod p95 461.8 ms. Alert threshold 400 ms. Cause: `CACHE_TTL_SECONDS` went from 300 to 0, and a 450 ms sleep was added on the cache-miss path.
- In-document proposed action: roll `auth-service` back to `4d229239`. Approve stays product purple `#9e33ea`. After the click the label is Approved and the status is “Rollback queued.” A Learn chip closes Discover, Triage, Root cause, Remediate, Learn.

One metric on this beat, tied to the queue: “90% less alert noise.”

The stage app has no Approve control. That cut is authored HTML in the product’s own chrome: IBM Plex Sans, canvas `#f4f5f8`, hairline cards, no floating modal, no drop shadow, no side-tab accent.

**InfraOps, 55.10–71.93s.** Quarter lights violet. Title: “BUILD · Aiden for InfraOps.” A plain-language request in an IDE becomes a Terraform block from the approved catalog. A policy row ticks green. The change lands in an approval queue. Outcome line: “Ship infra at AI speed.”

**DevOps, 71.93–90.84s.** Quarter lights peach. Title: “OPERATE · Aiden for DevOps.” One skill fans out to a team. A trigger runs a cost report and a cluster health check. A knowledge-hub strip sits underneath. On-screen outcome: “Scale impact, not tickets.” The storyboard still marks that title as an open decision. Keep the line. Do not replace it in this film.

**Observability, 90.84–111.40s.** Quarter lights pink. Title: “OBSERVE · Aiden for Observability.” An integrations grid fills. A dashboard assembles. A cloud boundary draws around it. A question to Aiden returns a likely-cause card. Outcome line: “Observability without the upkeep.”

### Unified context

**111.40–122.45s.** A plate slides under the four quarters. On screen: “AIDEN WORLD MODEL” and “what’s deployed · what changed · what broke · what fixed it.” Connectors drop from each quarter. A chip written by SRE, “rollback fixed checkout,” travels the plate and lights under InfraOps. Voice: “All four agents run on unified context: the Aiden World Model. Every agent reads and writes it, so what one learns, the others already know.”

The storyboard marks this cross-agent read as still to verify. Show the chip. Keep the flag in the project brief.

### Aiden OS

**122.45–134.32s.** A second plate sets. Pills light left to right: Policy, Approvals, Identity, Audit, Cost controls, Integrations. An action token leaves the SRE quarter, passes a policy gate, waits while a person taps Approve, then writes an audit line. Voice: “Aiden OS governs all of it. Every action is checked against your policies before it runs. Your team decides what needs approval, and every step is recorded.”

### Close

**134.32–138.74s.** The full assembly holds. Lower third: “AUTONOMOUS OPERATIONS FACTORY” and “Start anywhere.” One button: “Schedule a demo.” No “Explore the products.” No logo wall. No customer quote.

## What this film does not include

- A second CTA.
- A logo strip or a named customer quote. Quotes on AOF need approval. This cut does not use one.
- Live UI for InfraOps, DevOps, or Observability. Those quarters are designed motion.
- An MP4 in the design phase. Render only after an explicit ask.
- The existing remediation plate as the timeline. It is reference art for the SRE Approve beat.

## Check

Before any render:

- `hyperframes check` passes on the master and each composition.
- Snapshots at the hook (“Take control of production.”), the SRE Approve click, and the “Schedule a demo” card.
- Spoken lines fit their beats at 120–140 words a minute.
- Approve stays `#9e33ea`. Confirmation is a label and status swap, not a green fill and not a whole-card punch.

## Build order

After this spec is accepted and an implementation plan exists:

1. Scaffold `videos/aof-homepage/` and write `BRIEF.md` from this spec.
2. Jigsaw open and the category reveal.
3. Four product quarters, SRE from the live investigation facts above.
4. World model, Aiden OS, close.
5. Check and the three snapshots. Stop. Wait for a render ask.
