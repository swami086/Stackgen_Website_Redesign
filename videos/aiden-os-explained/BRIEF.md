---
workflow: product-launch-video
flow: automation
storyboard: yes
message: "Outcomes, not agents. Aiden OS runs production."
destination: youtube (+ silent website-hero cut)
aspect: 1920x1080
language: en
audience: SRE/DevOps/platform engineers and engineering leaders evaluating AI operations
length: ~110s narrated (GitLab reference is 111s) + short silent hero loop
angle: chaptered product explainer mirroring the GitLab Duo Agent Platform reference structure
voice: heygen male
---

## Intent

A narrated product explainer for Aiden OS in the shape of the GitLab Duo Agent
Platform explainer (https://www.youtube.com/watch?v=hXb_JJmjiRg, 1:51, 9
chapters): problem hook, product reveal, capability beats, trust beats, closer
with CTA. Voiceover-driven with kinetic-type chapter cards alternating with the
real product UI footage we already shipped. Tone: calm, senior, no hype — the
shipped site's voice (locked copy in .agents/product-marketing.md v1.7).

Two deliverables: (1) the narrated ~110s YouTube/launch cut, (2) a short silent
trimmed loop for the website hero.

## Assets

- ../Edited_Launch_Videos/Aiden_Infraops_edited.mp4 — 30.4s 4K dark-card incident flow; InfraOps beat.
- ../Edited_Launch_Videos/Aiden_devops_edited.mp4 — 7.4s 4K chat triage; DevOps beat.
- ../Edited_Launch_Videos/Aiden_Observability_edited.mp4 — 10.8s 4K error-spike correlation; Observability beat.
- ../Edited_Launch_Videos/Aiden_SRE_edited.mp4 — 12.4s 4K checkout-api root cause; SRE beat.
- ../Edited_Launch_Videos/Combined_Hero_edited.mp4 — 81.9s full 4-scenario sequence; source for the "see it in action" montage.
- ../Showcase_Videos_v2/Combined_Hero_showcase.mp4 — 109.2s scripted 4-stage handoff with rail; reference for stage boundaries, not a source.
- ../videos/aiden-launch-edits/assets/fonts/ — Geist Variable + Geist Mono woff2 (deterministic, bundle these).
- Brand tokens from the shipped site (web/app/(site)/globals.css): canvas radial #16171c -> #0b0c0e, card/chrome #151619, hairline #2a2c33, pill #1d1f24, muted #9aa0ac, accent yellow #facc15/#fde047 (showcase rail), violet #8C85FF reserved for one hot path.

## Customizations

- Chapter cards: kinetic-type interstitials naming each beat (GitLab chapter map), on the dark canvas tokens.
- Narration: HeyGen male voice; word-level timings drive captions and card reveals.
- BGM: quiet dark bed under the whole cut, voiceover carve so the voice stays legible.
- Camera: reuse the Factory rhythm from aiden-launch-edits (bounded punch 1.06-1.08x, clamped pan, release to rest) on footage beats.
- Locked copy rules: product loop is Build -> Govern -> Observe -> Remediate; CTA is Schedule a demo; personas SRE / Developer / DevOps; no em dashes; nothing that reads AI-written (check_ai_signs.py discipline).

## Notes

- Do not modify or re-render anything in videos/aiden-launch-edits; this project references its outputs read-only.
- Copy source of truth: .agents/product-marketing.md (v1.7) and web/content/replica.ts. Homepage H1 "Outcomes, not agents." stays the closer.
- Guiding visual artifact: Figma AOF 3j6C3yecgFKFfQva31ECS8 node 1367:275 (dark browser-frame card). Product UI is never cropped.
- Render: --resolution landscape-4k --quality delivery for the final; 1920x1080 cut derived from the same composition.
