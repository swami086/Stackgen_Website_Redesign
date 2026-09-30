---
workflow: general-video
flow: automation
storyboard: no
message: "V1 Autopilot incident investigation — Alert → RCA → Mitigation with Factory-style focus zoom"
destination: website-hero
aspect: 1920x1080
language: en
length: ~28s (title + 3 focus-zoom beats)
---

## Intent

**Use case (Sybill V1):** Autopilot incident investigation on stage `ai-sre-demo`.
Spine: Alert storm → triage signal → Pod Crash Loop RCA (confidence 0.78) → Mitigation.
Not a generic product tour — one workflow, three feature focuses.

Clean HyperFrames cut of the stage walkthrough in the StackGen dark browser plate.
Camera: Factory/Arcade-style **inner-screen focus zoom** (chrome steady). Clueso VO later.

## Assets

- `assets/stage-walkthrough-1920x1080.mp4` — edit source.
  Hard cuts: alerts media 1–8 · RCA 84–95 · mitigation 106–113.8.
- `assets/stage-walkthrough.mp4` — raw VP9 retina (reference).

## Customizations

- Plate: canvas radial `#16171c→#0b0c0e`, card `#151619`, hairline `#2a2c33`,
  traffic-light dots only (no URL host label).
- **Focus zoom (2026-09-23 redo):** zoom `#world` inside `#screen` only @ **1.72×**,
  `power2.inOut` ~1.1s in / 1.4s hold / 1.1s out. Vignette + kinetic callouts name
  each beat. Opening title states the use case. Rejected prior 1.08× whole-card snap.
- Render → `renders/sre-v1-clean.mp4`.

## Notes

- Sybill chose the V1 workflow; footage is clean stage, not Sybill customer clips.
- Clueso VO/captions deferred until user asks.
