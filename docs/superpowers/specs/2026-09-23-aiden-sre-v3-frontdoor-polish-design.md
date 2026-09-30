# Design: Aiden SRE V3 Front-Door polish (Approach A)

**Date:** 2026-09-23  
**Status:** Approved (user: Proceed · Approach A)  
**Project:** `videos/aiden-sre-v3-frontdoor/`  
**Use case:** Sybill V3 — Clear the SRE front door  
**Prior plate:** `renders/sre-v3-clean.mp4` v2 (70s, silent, laundry-list L6)

## Problem

Current cut is underwhelming for a product-page use-case video:

1. No BGM / SFX — plate feels unfinished.
2. Narration delivery sounds AI/TTS-flat (even when copy passes AI-sign audit).
3. L6 laundry-lists pod / cert / access → both abstract and oddly specific; fights Firecrawl craft (outcome first, not feature tour).
4. Visual density / captions / zooms insufficient for “professional launch” bar.

## Decision: Approach A — hero one ticket

**Hero:** CI/Jenkins enrich (best stage + Jira story).  
**Breadth:** pod / cert / access = fast silent kinetic flashes (~2–3s each) under one short outcome line.  
**Out:** Equal four-ticket montage · Clueso export this pass · new live stage capture unless a beat is unusable.

## Story spine (~65–75s)

| Beat | Time | Picture | Spoken intent |
|------|------|---------|----------------|
| Hook | 0–8s | Dense Jira queue + kinetic title | Front door eats the week |
| Problem | 8–22s | Sparse “Jenkins is broken” · zoom empty link | One bad ticket → on-call digs |
| Reveal | 22–28s | Cut into Aiden chrome | Aiden takes **that ticket** |
| Demo | 28–52s | Stage CI walkthrough · deep focus-zooms | Pipeline → failing stage → change → evidence |
| Breadth | 52–60s | Silent montage: pod / cert / access labels | One outcome line — no laundry list |
| Close | 60–70s | Thinner queue + audit · end card | Soft close · V1 parity energy |

## Script / human VO

- Rewrite for **speech** (`hyperframes-creative` narration.md + `content-humanizer`): contractions, uneven length, intentional pauses, SE-on-a-call tone.
- Kill L6 feature list → e.g. “Same door covers the other high-volume work.”
- TTS: HyperFrames `media-use` path preferred over Clueso Jeff default; natural pace ~2.5 wps; phonetic forms where needed (`forty`).
- Public: never say Visa / Mitratech.
- Gate: `check_ai_signs.py` exit 0 + read-aloud sound human.

## Picture (HyperFrames)

- Rebuild composition timing to spine above.
- Stronger title/caption skin; deeper `#world` zooms (empty link, failing stage, evidence) — not ~1.08× whole-card punches.
- Atmosphere under UI per house-style (no purple glow / generic AI look).
- Transition SFX on hard cuts.
- Reuse `assets/stage-chat-1920x1080.mp4` + Jira lookalike + official Jira mark.

## Audio

- Soft BGM via `media-use` `resolve --type bgm`, ducked under VO (~−18 to −24 dB / ~−31 LUFS bed guidance).
- Mix in HyperFrames (`hyperframes-audio`) so deliverable includes music + VO when ready.
- Clueso optional later for alternate VO review — **no export** unless user asks.

## Deliverables

1. Updated `BRIEF.md`, `SCRIPT.md` (v3.0 Approach A).
2. Regenerated HyperFrames composition + `renders/sre-v3-clean.mp4` (with audio).
3. Proof snapshots.
4. Design + plan docs under `docs/superpowers/`.

## Non-goals

- Shipping to `/product/aiden-for-sre` site slot this pass.
- Naming customers publicly.
- Replacing V1 Autopilot video.

## Sources

- Sybill V3 spec: `docs/superpowers/specs/2026-09-23-ai-sre-demo-video-use-cases.md` §V3
- Firecrawl craft: Arcade SaaS demo practices, D-MAK 6-beat launch, Blare problem–contrast–solution, ngram 60–90s product-page target
- Skills: product-launch-video · hyperframes-creative · hyperframes-keyframes · hyperframes-audio · media-use · content-humanizer · expert-pmm-writer
