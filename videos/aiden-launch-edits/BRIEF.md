---
workflow: general-video
flow: automation
storyboard: no
message: "Aiden product UI, reframed clean and punched in on the result beats"
destination: website-hero
aspect: 1920x1080
language: en
length: 5 clips (7-82s)
---

## Intent

Re-edit the five Aiden launch screen recordings for the product launch: strip
the recorded browser chrome (tab strip + URL bar, y<80) and desktop padding
(window at x 96..1824, bottom y>1030) so 100% of the product UI fills a
1920x1080 frame, and add Arcade-style snap zooms (fast ease-out punch to
1.15x, hold, ease back) on each result beat. Round 1 ffmpeg zoompan output
was rejected: borders wrong, UI cropped, zoom motion mechanical.

## Assets

- assets/Aiden_devops.mp4 — 7.4074s chat: app-down triage. Punch: 4.5s.
- assets/Aiden_Observability.mp4 — 10.7774s chat: error-spike correlation. Punch: 7.5s.
- assets/Aiden_SRE.mp4 — 12.4124s chat: checkout-api root cause. Punches: 4.2s, 7.8s.
- assets/Aiden_Infraops.mp4 — 30.4304s incident page flow. Punches: 12.2s, 17.7s, 21.5s.
- assets/Combined_Hero.mp4 — 81.8818s full sequence. Punches: 5.0, 25.3, 30.8, 43.9, 51.9, 67.8.

## Customizations

- Crop is CSS layout (video element oversized + negative offsets), not a
  re-encode: source region (96,80)-(1824,1030) fills the card's screen box.
- Round 5 (guiding artifact = Figma AOF dark frame, node 1367:275): the
  COMPLETE product UI is never cropped, and the frame now rides the shipped
  StackGen dark tokens (web/app/(site)/globals.css): canvas radial
  #16171c -> #0b0c0e, card/chrome #151619, hairline #2a2c33, URL pill
  #1d1f24 (URL pill hidden — no host label; traffic-light dots only),
  neutral dots #3a3d45. No shadow —
  defined hairline edge only (impeccable gpt-thin-border-wide-shadow).
  Geist Variable woff2 bundled in assets/fonts (deterministic, no network).
- Camera (Factory rhythm, zoom in AND out, bounded): slow cruise to 35% of
  the punch, 0.35s power3.out punch to 1.08x + tiny pan toward the beat
  content, 1.1s hold, 0.6s power2.inOut release back to rest. Pan clamped
  per-axis to the card's slack (74.4px x / 18.6px y at 1.08) so the card
  always stays fully inside the frame. Ends at rest = seamless loop.
- Camera servo law borrowed from the ui-focus-zoom registry primitive
  (mechanism reused; envelope hand-authored for multi-beat in/out).
- Render: --resolution landscape-4k (3840x2160, 2x deviceScaleFactor) +
  --quality delivery. Source footage is 1080p; 4K makes the vector chrome
  razor sharp and upscales the footage cleanly.

## Notes

- Sources are video-only (no audio track); no <audio> elements needed.
- Factory.ai reference: hero = 31.8s, 1920x1080/30, zero hard cuts
  (scene-detect verified), slow cruise -> fast punch ~18s -> rapid payoff
  -> end hold; rounded-xl hairline plate, autoplay muted loop. Their
  product pages use static images, not video.
- The videos now carry their own light frame plate — embed full-bleed on
  the site; do not wrap in another plate.
- Combined_Hero (82s, 4 scenarios) suits a deeper page; Aiden_Infraops
  (30.4s, one story) matches the Factory hero-loop shape.
- Round 1-3 approaches (ffmpeg zoompan; full-bleed snap; monotonic cruise)
  superseded — user rejected any cropping of the product UI.

## Showcase (compositions/showcase.html -> Showcase_Videos_v2/)

Scripted narrative version of Combined_Hero (user's 4-stage handoff script).
Card layout: screen LEFT + 340px script rail RIGHT (user: rail on the right
is easier to follow). The rail stepper (01 InfraOps / 02 DevOps /
03 Observability / 04 SRE) carries a RUNNING EVENT SEQUENCE under each
active stage's title (user reference: the product's own ServiceNow panel —
H2 with live event list): caption lines append (GSAP height 0 -> auto),
previous lines dim to #7e8591, handoff lines land yellow #fde047; the
completed stage's list collapses at handoff (green check remains). Active
stage highlighted YELLOW (bar #facc15, num #fde047, wash
rgba(250,204,21,0.08)). No rail header, no separate NOW slot (superseded).
Playback: data-playback-rate="0.75" (user default) — comp duration
109.1757s = 81.8818 / 0.75; every schedule is authored in SOURCE time and
converted with T(t) = t / RATE. Stage boundaries (source time): 24.3 /
46.3 / 58.3. Camera punches are logical (environment choice 10.0,
deploy+audit 20.8, incident 25.3, proposed change 38.6, approval 43.9,
correlation 52.4, root cause 68.5, remediation 74.6 — source time) with
x-anchors ~27-30 (screen on left) and bounded so the card never leaves
frame; ends at rest for a seamless loop. Type ramp 12/16/24 (impeccable
flat-type-hierarchy requires max:min >= 2.0). Render:
`npx hyperframes render -c compositions/showcase.html -o Showcase_Videos_v2/Combined_Hero_showcase.mp4 --quality delivery --resolution landscape-4k`.
Gotcha: hyperframes snapshot has no -c flag (renders default entry only) —
temporarily copy the composition over index.html, snapshot, restore.
Showcase_Videos/ (left rail, NOW slot) = superseded v7.
