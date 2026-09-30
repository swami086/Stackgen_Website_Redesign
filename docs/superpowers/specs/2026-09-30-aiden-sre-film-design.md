# Aiden for SRE — product film (GitLab-Duo-grade) — design spec

Date: 2026-09-30 · Status: DRAFT for user review · Author model: Opus (spec only; all build work runs on Sonnet/Haiku subagents)

## 0. One-paragraph summary

A 2:06 (cut) / 2:17 (full) narrated product film for Aiden for SRE, built to the production grade of Infosysta's *GitLab Duo Workflow* film (YouTube `-5JPZoGeHHs`, 3:04). Content, voiceover and beat timing come from the approved storyboard `260925 - AOF Homepage Video Storyboard Visual v2.0.html`, track `sre`. Look comes from the live stackgen.com brand (warm-ink dark, cream type, pale violet + pale cyan accents, sharp hairline panels). Architecture is **Approach A + a slice of C**: every shot renders in HyperFrames as separate alpha passes (background / UI plate / foreground type) driven by one shared camera file, then an ffmpeg composite stage adds the After Effects finish (bloom, motion blur, grain, vignette). Background ribbons are a seeded three.js layer inside HyperFrames. Clueso owns captions, brand conformance, chapters, aspect exports and the social cutdown. This is a greenfield pipeline; it deliberately reuses nothing from `videos/*`.

---

## 1. Inputs and sources of truth

| Input | Location | Authority |
|---|---|---|
| Storyboard (VO, on-screen text, beats, flags, timecodes @145 wpm) | Drive `1YbNf9XchVrp3g4v7wNoJsmLIi_fMFTWR`, parsed copy → `videos/aiden-sre-film/source/storyboard.json` (`sre` key) | Words and order. Do not rewrite VO. |
| Reference film | `https://www.youtube.com/watch?v=-5JPZoGeHHs` → `source/reference/gitlab.mp4` + contact sheets | Technique grammar only. Never copy its palette, icons or layouts. |
| Brand | `https://stackgen.com/` (Firecrawl branding + pixel histogram, §3) | Colors, type, radius, button style. Overrides the storyboard's "cream-to-lilac" background note. |
| Product UI | `https://stage.dev.stackgen.com/app/sre/ai-sre-demo/alerts` (returns 401; needs session) | Pixel authenticity of all UI plates. |

### 1.1 Reference decode — the technique inventory to reproduce

Taken from 23 frames sampled every 8s. Each technique gets a StackGen translation.

| # | GitLab technique | StackGen translation |
|---|---|---|
| T1 | Deep indigo→violet gradient stage, soft vignette, fine noise | Warm ink `#14110C` stage, radial lift to `#1B1811` behind subject, grain + vignette in composite |
| T2 | Glowing neon bezier "data ribbons" that bundle, converge, fan out | three.js ribbon field, violet `#BA99FD` + cyan `#A0EAFC` only, additive blend, seeded |
| T3 | Floating UI panels on 3D perspective tilt with rim light | Captured UI plates on perspective tilt (the stackgen.com hero already does this), hairline `#3F3B39` border, **0px radius**, no glassmorphism blur |
| T4 | Chat pills + avatar orbs for agent beats | Sharp-cornered agent "message rows" with a violet 2px left rule; Aiden mark as the avatar |
| T5 | Icon chips riding along ribbon paths | Square chips (0 radius, hairline) riding ribbon splines via motion-path |
| T6 | Radial concentric glow around a warning triangle | Concentric square/ring pulse around a critical alert row, coral accent (§3.2 derived) |
| T7 | Isometric node lattice with lit nodes | Service map: isometric node lattice, nodes light as dependencies draw |
| T8 | Large two-weight kinetic type, mask reveals | Geist 300 + Geist 500 in one line; per-line mask reveal; tracking settles from +4% to 0 |
| T9 | Code panel with line highlight + cursor | Alert list / investigation panel with row highlight + authored cursor |
| T10 | Camera never static; cuts every 4–8s | Every shot has a camera path; shots 3.2–7.8s (§6) |
| T11 | Logo lockup on plate end card | StackGen wordmark + two sharp CTA buttons (cream primary, hairline secondary with corner ticks) |

---

## 2. Deliverables

| ID | Deliverable | Spec |
|---|---|---|
| D1 | Master, cut | 1920×1080, 30 fps, H.264 High, CRF 16, yuv420p, AAC 320k, 126 s ±1 s (Cut A + Cut B applied) |
| D2 | Master, full | Same, 137 s ±1 s |
| D3 | Mezzanine | ProRes 422 HQ, yuv422p10le, both cuts |
| D4 | Captions | SRT + VTT from VO word timings, max 42 chars/line, 2 lines |
| D5 | Aspect variants | 9:16 1080×1920, 1:1 1080×1080, 4:5 1080×1350 via Clueso (confirm which in §13) |
| D6 | Social cutdown | 30 s from D1 via Clueso `demo-cutdown` |
| D7 | Stems | VO, music, SFX as separate WAV 48k/24-bit |
| D8 | Poster frame | PNG 1920×1080 from S12 at its hold |

---

## 3. Design system

### 3.1 Sampled brand tokens (pixel histogram of stackgen.com hero, 1440×900)

```css
:root {
  --sg-ink:          #14110C; /* stage, 78% of pixels */
  --sg-ink-raised:   #1B1811; /* radial lift behind subject */
  --sg-panel:        #211D15; /* UI panel fill */
  --sg-hairline:     #3F3B39; /* 1px borders, dividers */
  --sg-cream:        #F1EAE0; /* primary type */
  --sg-cream-bright: #FAF7F2; /* primary button, highlights */
  --sg-mute:         #96897C; /* secondary type, eyebrows */
  --sg-violet:       #BA99FD; /* accent 1, hue 260 s.40 v.99 */
  --sg-cyan:         #A0EAFC; /* accent 2, hue 192 s.37 v.99 */
  --sg-radius:       0px;
  --sg-font:         "Geist", sans-serif;
  --sg-mono:         "Geist Mono", monospace;
}
```

### 3.2 Derived tokens (constructed, not sampled — confirm with brand owner)

Built at the same saturation/value as the two sampled accents so they read as one family.

```css
:root {
  --sg-coral:  #FDA39B; /* critical alerts, hue 5 */
  --sg-amber:  #FDD89B; /* warnings, hue 38 */
  --sg-green:  #A6F0BF; /* resolved, hue 140 */
  --sg-glow-violet: rgba(186,153,253,.35);
  --sg-glow-cyan:   rgba(160,234,252,.30);
}
```

Rule: coral appears only on critical alerts and the pre-fix error sparkline. Green appears only at resolution (S20) and on "passed" policy gates.

### 3.3 Typography

| Role | Font | Size @1080p | Weight | Tracking | Case |
|---|---|---|---|---|---|
| Eyebrow / section label (`ALERT TRIAGE`) | Geist Mono | 22 px | 500 | +12% | UPPER, `--sg-mute` |
| Headline (title card) | Geist | 96 px | 300 + 500 split | −2% | Sentence |
| Support line (OST) | Geist | 40 px | 400 | −1% | Sentence |
| Callout on UI | Geist Mono | 20 px | 500 | +4% | as written |
| Counter / metric | Geist Mono | 120 px | 400 | tabular nums | — |

Fonts ship locally as WOFF2 with `@font-face` in every composition (HyperFrames lint `font_family_without_font_face`).

### 3.4 Motion vocabulary (`tokens/motion.js`)

```js
export const EASE = {
  enter:  "expo.out",        // things arriving
  exit:   "power3.in",       // things leaving
  camera: "power2.inOut",    // all camera moves
  settle: "back.out(1.4)",   // chips, buttons landing
  snap:   "power4.out",      // UI state changes (rows collapsing)
};
export const DUR = { micro: 0.18, ui: 0.42, enter: 0.7, camera: 2.4, hold: 1.2 };
export const STAGGER = { rows: 0.035, chips: 0.08, words: 0.05 };
```

Hard rules:
1. No linear easing anywhere except ribbon flow speed.
2. Overlapping action: a secondary element starts ≥ 0.12 s before the primary finishes.
3. Every shot has a camera move (min 2% scale change or 30 px drift). No static frames.
4. Type enters on the VO word it names, ±120 ms (driven by word timings, §8.1).
5. Nothing tweens `display`, `visibility` or `autoAlpha` on a `.clip` (HyperFrames lint).
6. UI acts must feel like live product use: the cursor always travels on an arc (never teleports), every click = press (0.96 scale, 90 ms) + a square hairline ripple expanding 0 → 48 px and fading over 0.35 s, and any list taller than the viewport scrolls with eased momentum (S06, S09) rather than cutting.

---

## 4. Architecture

### 4.1 Layer / pass model

Each shot is a HyperFrames sub-composition that can render any one of three passes via a `pass` variable:

| Pass | Contents | Render | Parallax factor |
|---|---|---|---|
| `bg` | Ink stage, radial lift, three.js ribbon field, isometric lattice | `--format mov` (alpha off, full fill) | 0.25 |
| `mid` | UI plate(s) on perspective, re-animated DOM overlays, cursor | `--format mov` with alpha | 1.00 |
| `fg` | Eyebrow, OST type, callouts, chips, counters | `--format mov` with alpha | 1.35 |

Passes render at **60 fps** (local cap). Shots flagged `blur: heavy` in §6 render at **120 fps via `hyperframes cloud render --fps 120`**. Composite resamples to 30 fps with frame averaging (§9) — this is where motion blur comes from.

Constraint: HyperFrames' 4k supersample path has no alpha. Passes render at native 1920×1080. A 4k master is out of scope.

### 4.2 Camera contract (`camera/Sxx.json`)

One file per shot, read by all three passes so parallax is coherent.

```json
{
  "shot": "S12",
  "duration": 5.20,
  "perspective": 2400,
  "keys": [
    { "t": 0.00, "x": 0,   "y": 0,  "z": 0,    "rx": 8, "ry": -14, "scale": 1.00 },
    { "t": 5.20, "x": -60, "y": 10, "z": 120,  "rx": 4, "ry": -6,  "scale": 1.06 }
  ],
  "ease": "power2.inOut",
  "blur": "normal"
}
```

Each pass applies `transform` = camera × its parallax factor on its root wrapper (never on a `.clip`). `z` maps to `translateZ` for `mid`, and to a scale term for `bg`/`fg`.

### 4.3 Three.js ribbon field (the slice of C)

Component `layers/ribbon-field.html`, via `/hyperframes-animation` → `adapters/three`.

- N = 18–40 ribbons, each a Catmull-Rom spline of 6–9 control points, extruded as a flat strip 2–6 px wide.
- Material: `MeshBasicMaterial`, `AdditiveBlending`, color `--sg-violet` or `--sg-cyan` (70/30 split), opacity 0.35–0.9 along length via a gradient texture.
- Flow: a UV offset scrolls along each strip; this is the only linear motion allowed.
- Modes (variable `mode`): `dormant` (sparse, slow), `storm` (dense, fast, S01–S02), `converge` (all splines end at one point, S04), `fan` (one origin, many ends, S24), `rail` (parallel horizontal, S25–S26).
- Determinism: seeded PRNG (`mulberry32(seed)`), seed stored per shot. No `Math.random`, no clocks, no `repeat: -1`. Frame t is derived from the HyperFrames timeline only.
- Canvas at devicePixelRatio 2 for clean thin lines.

### 4.4 UI authenticity — "plate + live overlay"

Live screen recording of the stage app is not used: it is 401-gated, un-seekable and not re-timeable. Instead:

1. **Capture plates.** In an authenticated Chrome session, drive the app to each state in §7.1 and capture PNG at `deviceScaleFactor: 2` (3840×2160 for a full viewport) plus a DOM/accessibility snapshot for element positions.
2. **Author overlays.** Anything that moves in the storyboard (rows collapsing, confidence bars filling, a button pressing, a log line writing, a counter) is rebuilt as DOM on top of the plate, positioned from the snapshot's bounding boxes, in brand tokens. The plate supplies every pixel that doesn't move.
3. **Mask the plate** under each overlay (a `--sg-panel` rectangle) so the static and animated versions never double up.
4. **Illustrative values** (storyboard `[ILLUSTRATIVE]`) are set in overlays only, never painted into plates.

This is how product films are built in After Effects (still + re-animated layers), done deterministically in HTML.

### 4.5 Project layout

```
videos/aiden-sre-film/
  BRIEF.md                    # HyperFrames brief (workflow: product-launch-video)
  source/storyboard.json      # parsed sre track
  source/reference/           # gitlab.mp4, contact sheets (not shipped)
  tokens/brand.css
  tokens/motion.js
  camera/S01.json … S27.json
  layers/ribbon-field.html    # three.js bg component
  layers/lattice.html         # isometric service map
  layers/kinetic-type.html    # eyebrow / headline / OST component
  layers/ui-plate.html        # perspective plate + overlay host
  layers/cursor.html
  compositions/S01.html … S27.html   # one sub-comp per shot, pass variable
  index.html                  # assembles all shots for preview only
  assets/plates/P01.png … P15.png    # @2x captures
  assets/plates/P01.snapshot.json …  # element boxes
  assets/logos/*.svg
  assets/gen/                 # Gemini image outputs
  assets/audio/vo/line-01.wav + line-01.words.json …
  assets/audio/sfx/*.wav
  assets/audio/music/bed.wav
  scripts/capture-plates.md   # capture procedure + state list
  scripts/render-passes.sh
  scripts/composite.sh
  scripts/master.sh
  renders/passes/Sxx-{bg,mid,fg}.mov
  renders/shots/Sxx.mov       # composited, 30fps ProRes
  renders/master/
  QA.md                       # acceptance checklist results
```

---

## 5. Pipeline stages (data flow)

```
storyboard.json ─┬─> VO (ElevenLabs) ──> words.json ─┐
                 │                                    ├─> shot timing lock (§6 retimed to real VO)
                 ├─> plate capture (auth Chrome) ─────┤
                 ├─> Gemini assets ───────────────────┤
                 └─> tokens + camera files ───────────┘
                                                      v
                               HyperFrames: 27 shots × 3 passes (alpha MOV, 60/120 fps)
                                                      v
                               ffmpeg composite: bloom, motion blur, grain, vignette → Sxx.mov
                                                      v
                               ffmpeg conform: concat shots + transitions → silent master
                                                      v
                               HyperFrames audio mix: VO + music + SFX → mixed master
                                                      v
                               Clueso: captions, brand check, chapters, aspects, cutdown → D1–D8
```

Timing lock: storyboard timecodes assume 145 wpm. Real VO will drift. After VO is recorded, every shot boundary is recomputed from the words.json of the line it covers, keeping each shot's start pinned to the first word of its VO beat minus 0.25 s lead-in. §6 durations are targets until then.

---

## 6. Shot list (27 shots)

Timings are storyboard targets (full cut). `L` = layers used. Camera values are start → end. `blur: heavy` = render passes at 120 fps.

### Scene 1 — Intro (0.00–20.43) · Problem → Discover

**S01 · Alert flood builds · 0.00–4.60 (4.60 s)**
- VO: "Your on-call team is buried in alerts, and most of them don't matter."
- OST: none (storyboard). Counter top-right, Geist Mono 120 px, climbs 0 → 1,284.
- L bg: ribbons `dormant`, seed 101. L mid: phone-sized alert card column, cards drop in from top at `STAGGER.rows`, 85% `--sg-mute` cards, 1 in 12 coral. L fg: counter.
- Camera: scale 1.00 → 1.05, y 0 → −20, ry 0 → −4.
- SFX: soft notification ticks, density rising with card rate.

**S02 · Flood overwhelms · 4.60–9.80 (5.20 s) · blur: heavy**
- VO: "The ones that do can take hours to untangle."
- Card column multiplies into 5 columns filling the frame, speed ramps up; ribbons switch to `storm`. On "hours", two coral cards pulse with concentric ring glow (T6).
- Camera: scale 1.05 → 1.18, rz 0 → 1.5°. Ends on a whip-pan left (motion-blurred) into S03.
- SFX: notification density to wall of sound, cut to silence on the whip.

**S03 · Title card · 9.80–13.40 (3.60 s)**
- VO: "Meet Aiden for SRE, your AI SRE teammate."
- OST: eyebrow `AIDEN FOR SRE`; headline "Your AI SRE teammate." with "AI SRE" in Geist 500, rest Geist 300. Mask reveal per word on VO.
- L bg: ribbons settle to `dormant`, radial lift behind type.
- Camera: z 0 → 60, scale 1.00 → 1.03.

**S04 · Tools connect · 13.40–17.20 (3.80 s)**
- VO: "It connects to the observability tools you already run…"
- Tool logo chips (§7.3) arranged in an arc left; ribbons `converge` from each chip into an Aiden mark right (T2, GitLab "Unified single data store" move). Chips light cyan as their ribbon arrives.
- Camera: x 0 → −80, ry −6 → 2.
- `[VERIFY]` logos per storyboard flag.

**S05 · Service map draws · 17.20–20.43 (3.23 s)**
- VO: "…and maps your services on its own."
- OST: "Discovers your services and dependencies".
- L bg: isometric lattice; nodes pop at `STAGGER.chips`, then dependency edges draw with stroke-dashoffset. Violet nodes, cyan edges.
- Camera: rx 20 → 28 (more top-down), scale 1.00 → 1.08. This map is reused in S22–S23; export its final state as `lattice-state.json`.

### Scene 2 — Alert triage (20.43–42.40)

**S06 · Triage dashboard establish · 20.43–24.86 (4.43 s)**
- VO: "One failure can set off a flood of alerts."
- OST: eyebrow `ALERT TRIAGE`.
- L mid: plate P01 (alerts list, flooded). Enters on perspective tilt ry −18 → −8 from right. New alert rows push in at the top of list (overlay) at `STAGGER.rows`.
- Camera: z −200 → 0, ry −18 → −8.

**S07 · Noise collapses · 24.86–30.20 (5.34 s) · blur: heavy**
- VO: "Aiden triages every alert as it arrives. It groups related alerts, filters the noise…"
- Overlay rows: noise rows fade to 25% and shrink height to 0 (EASE.snap), related rows slide together under a group header with a violet left rule.
- Camera: push toward list, scale 1.00 → 1.10, ry −8 → −4.

**S08 · Re-rank + classification callout · 30.20–35.08 (4.88 s)**
- VO: "…and ranks the rest by impact on your services."
- OST: "Correlated · de-duplicated · ranked by service impact" (three terms enter on their VO words).
- Rows re-sort by FLIP animation. Callout box (hairline, 0 radius) draws around the classification column with a leader line to the callout label.
- Camera: x drift −40, ry −4 → 0.

**S09 · Only what needs you · 35.08–42.40 (7.32 s)**
- VO: "Your engineers see only the alerts that need them, and save their energy for real incidents."
- OST: "Only the alerts that need you".
- Plate P02 (filtered critical list). Counter from S01 returns top-right and counts down 1,284 → 7 (`[ILLUSTRATIVE]`). Hold 1.2 s on the short list.
- Camera: slow pull back scale 1.10 → 1.02, flatten ry → 0.

### Scene 3 — Root cause analysis (42.40–74.99)

**S10 · Click into critical alert · 42.40–48.06 (5.67 s)**
- VO: "When a real incident hits, most of the time goes into investigation."
- OST: eyebrow `ROOT CAUSE ANALYSIS`.
- Cursor travels (arc path, EASE.camera) to the middle of the critical Kubernetes pod alert row (storyboard: click row middle, not "View Investigation"). Press: 0.96 scale, 90 ms. Timer chip starts top-right `00:00` counting.
- Camera: push to row, scale 1.00 → 1.22.

**S11 · Investigation pop-up opens · 48.06–52.80 (4.74 s)**
- VO: "Aiden starts investigating the moment an alert fires. It correlates logs, metrics and events across your dependencies."
- Plate P06 (investigation summary + urgency rationale). Pop-up scales from the clicked row's box (FLIP) to full panel. Three evidence-type chips (logs · metrics · events) ride cyan ribbons in from the edges and dock on the panel (T5).
- Camera: ry 0 → −10 as panel lands.

**S12 · Hypotheses with confidence — the money shot · 52.80–58.00 (5.20 s)**
- VO: "Then it scores every possible cause against the evidence…"
- Plate P07. Overlay: confidence bars fill left→right with stagger 0.12 s, numbers count up in Geist Mono. One high score in violet, the rest `--sg-mute`.
- Hold 1.2 s at full. Poster frame D8 taken here.
- Camera: very slow push scale 1.00 → 1.04. This is the golden shot (§11 Wave 0).

**S13 · Ruled out · 58.00–62.42 (4.42 s)**
- VO: "…and even tries to prove itself wrong."
- OST callout: "ruled out · 4%" on a low-score row; row gets a strikethrough drawn left→right, then dims.
- `[VERIFY — Navin]` null-hypothesis framing.
- Camera: x drift toward the low row, scale 1.04 → 1.12.

**S14 · Root signal vs downstream effect · 62.42–69.32 (6.91 s) · Cut A**
- VO: "When several things break at once, it points you to the one that started it."
- OST: "Root signal · downstream effect".
- Plate P08. A second alert with a "downstream effect" marker; an arrow draws from symptom row to root-signal row; root row rings once (T6, violet not coral).
- Camera: rack from one row to the other, x 0 → 120.
- Removed in D1 (cut). S13 then cuts straight to S15.

**S15 · RCA report flash · 69.32–74.99 (5.67 s)**
- VO: "Your team starts from a probable root cause, and MTTR comes down."
- OST: "Probable cause, with the evidence".
- Plate P09 (full RCA report) flies in on a steep tilt (ry −28 → −10), holds 1.5 s. Timer chip freezes and turns green at an early value (`[ILLUSTRATIVE]`).
- Camera: z −300 → 0.

### Scene 4 — Remediation (74.99–101.09)

**S16 · The manual gap · 74.99–80.24 (5.25 s)**
- VO: "Even with the cause in hand, the fix is often manual."
- OST: eyebrow `REMEDIATION`.
- Motion graphic (not a capture): RCA summary card; cursor hovers, nothing happens. A runbook link card and a Slack-style thread card ("who knows checkout-svc?") float in, stacked, slightly out of focus (CSS blur 2 px on mid pass).
- Camera: slow drift, no push. Slightly desaturated grade on this shot only.

**S17 · Remediation card · 80.24–85.60 (5.36 s)**
- VO: "Aiden runs the remediation, from restarting a service or scaling out…"
- Plate P10. Card slides in from right on tilt. Proposed action row: "Roll back checkout-svc to previous version" (`[ILLUSTRATIVE]` service name).
- Camera: ry −12 → −4.

**S18 · Options row · 85.60–90.60 (5.00 s)**
- VO: "…to rerouting traffic or rolling back a deployment."
- OST: "Restart · scale · reroute traffic · roll back", each term on its VO word; matching option chip in the card lights violet as its word lands.
- `[VERIFY — Navin]` actions demoable.

**S19 · Approve + audit · 90.60–95.42 (4.82 s)**
- VO: "Your team sets which actions need approval, and every action goes into a full audit trail."
- OST: "Approval gate · full audit trail".
- Plate P11. Cursor presses Approve (press 0.96, release back.out). Policy gate chip ticks green. Audit log strip below: a new line types in Geist Mono (typewriter, 0.02 s/char).
- SFX: button thunk, soft tick for the gate, key clicks for the log line.

**S20 · Resolved · 95.42–101.09 (5.67 s)**
- VO: "Incidents close faster, and your team stays in control of what runs."
- OST: "You decide what runs".
- Plate P12. Status pill flips coral → green. Error-rate sparkline redraws from coral spike back to baseline (stroke draw, 1.4 s).
- Camera: pull back scale 1.08 → 1.00.

### Scene 5 — Learn (101.09–115.03)

**S21 · Incident becomes a chip · 101.09–105.80 (4.71 s)**
- VO: "And it keeps learning."
- The resolved incident panel shrinks (FLIP) into a single square chip labelled "checkout-svc · rollback".
- Camera: z 0 → −200 (pull away), ribbons visible again.

**S22 · Chip writes into service map · 105.80–110.40 (4.60 s)**
- VO: "Every investigation adds to what Aiden knows about your environment, so the next incident starts further ahead."
- OST: "Every incident makes the next one easier".
- Lattice from S05 (restored from `lattice-state.json`). Chip rides a ribbon and drops onto the checkout-svc node; node gains a violet marker ring.
- `[VERIFY — Navin]` write-back is current behavior.

**S23 · Seen before + error budget · 110.40–115.03 (4.63 s) · part in Cut B**
- VO: "Aiden watches your error budgets too, and acts before a breach." (Cut B line)
- OST: "Error budget tracking".
- A new alert lands on the same node; its investigation opens with a "seen before" reference row. Error-budget strip fills to 78% (`[ILLUSTRATIVE]`) and a threshold tick glows amber.
- In D1, the Cut B VO line and the error-budget half of this shot are removed; S23 shortens to ~2.2 s (seen-before only).

### Scene 6 — Platform (115.03–128.97)

**S24 · UI becomes the REMEDIATE tile · 115.03–120.00 (4.97 s)**
- VO: "Aiden for SRE runs on the Aiden World Model…"
- Pull back from product UI; the UI plate shrinks and squares off into the cyan REMEDIATE quarter tile. Ribbons `fan` out from it.
- Camera: z 0 → −600, rx 0 → 30 (moves to isometric).

**S25 · Aiden World Model plate · 120.00–124.60 (4.60 s)**
- VO: "…the shared record of what's deployed, what changed, what broke and what fixed it."
- OST: eyebrow `AIDEN WORLD MODEL`; chips `deployed · changed · broke · fixed` light on their VO words.
- Plate slides in under the tile; connector lines drop; ribbons `rail` along the plate. Visual language must match the homepage film Acts 3–4 (storyboard `[ASSET EXISTS]`); if that asset is not available, build it here and export it for reuse.

**S26 · Aiden OS plate · 124.60–128.97 (4.37 s)**
- VO: "And Aiden OS holds every action to your policies."
- OST: `AIDEN OS · policy · approvals · audit`.
- Second plate sets beneath; its pills light left→right at `STAGGER.chips`.
- Camera: rx 30 → 22, scale 1.00 → 1.04, hold final 0.8 s.

### Scene 7 — CTA (128.97–136.71)

**S27 · End card · 128.97–136.71 (7.74 s)**
- VO: "See Aiden for SRE on your own alerts. Book a demo, or try the free Community Edition."
- OST: StackGen wordmark; buttons "Book a demo" (cream `#FAF7F2` fill, ink text, 0 radius) and "Try Community Edition" (transparent, hairline, corner ticks as on stackgen.com); micro-line "free for up to two users".
- Ribbons settle to `dormant` at 40% opacity. Buttons enter with EASE.settle at 0.08 s stagger on "Book a demo" / "Community Edition".
- Camera: z 40 → 0, final 1.5 s near-static drift (still ≥ 30 px).

### 6.1 Transitions

| Between | Transition | Built in |
|---|---|---|
| S02 → S03 | Whip pan left, 8-frame blur | HyperFrames registry transition if available; else camera x −1800 over 0.25 s on both shots, 120 fps |
| Scene boundaries (S05→S06, S09→S10, S15→S16, S20→S21, S23→S24) | Match-move: outgoing subject scales into incoming subject's position, 0.4 s overlap | Authored in both shots |
| Within scene | Hard cut on VO word boundary | Conform |
| S26 → S27 | Ribbon wipe: ribbons sweep across frame and reveal end card | bg pass of S27 |

Search `/hyperframes-registry` for "whip pan", "match cut", "light leak" before hand-authoring any transition.

---

## 7. Asset manifest

### 7.1 UI plates (capture)

| ID | State | Used in | Storyboard ref |
|---|---|---|---|
| P01 | Alerts list, flooded, unfiltered | S06, S07 | 2:25:20 |
| P02 | Alerts list, filtered to critical | S09, S10 | 2:26:30 |
| P03 | Alerts list, grouped/correlated with classification column visible | S07, S08 | 2:25:20–2:26:30 |
| P04 | Critical K8s pod alert row, hover state | S10 | 2:26:30 |
| P05 | Integrations / connected tools page | S04 (logo reference only) | — |
| P06 | Investigation pop-up: summary + urgency rationale | S11 | 2:27:35 |
| P07 | Investigation pop-up: hypotheses + confidence | S12, S13 | 2:27:35–2:29:10 |
| P08 | Downstream-effect alert + incident link | S14 | 2:30:05–2:31:05 |
| P09 | Full RCA report | S15 | 2:30:50 |
| P10 | Remediation card, proposed action | S17, S18 | Datadog-connected env |
| P11 | Remediation card, approved + audit line | S19 | Datadog-connected env |
| P12 | Incident resolved + error-rate chart | S20 | — |
| P13 | Service map / dependency view | S05, S22 reference | — |
| P14 | Error budget view | S23 | — |
| P15 | Alert investigation with "seen before" | S23 | — |

Capture rules: viewport 1920×1080 at DPR 2; browser chrome hidden; demo data only (no real customer names); one PNG + one snapshot JSON (element boxes from the accessibility tree) per state. If a state does not exist in the demo environment, mark it `MISSING` in `scripts/capture-plates.md` and it is rebuilt as a pure-DOM mock in brand tokens — never generated by an image model (image models garble UI text).

### 7.2 Generated imagery (Gemini 2.5 Flash Image / "nano-banana")

Scope is intentionally narrow. Image models are used for texture and atmosphere, never for UI or type.

| ID | Asset | Prompt core | Output |
|---|---|---|---|
| G01 | Stage texture | "Near-black warm ink surface #14110C, extremely subtle paper-grain and dust, soft radial lift to #1B1811 at center, no objects, no text, 16:9, photographic macro" | 3840×2160 PNG, blended at 12% over bg |
| G02 | Light leak set (×3) | "Soft anamorphic light leak on pure black, pale violet #BA99FD and pale cyan #A0EAFC, no hard edges, no text" | 3840×2160 PNG, screen-blended on transitions |
| G03 | Bokeh depth plate | "Out-of-focus bokeh particles, pale violet and pale cyan on pure black, sparse, shallow depth of field, no text" | 3840×2160 PNG, far-bg parallax 0.1 |

Every generated image passes a manual reject check: no visible text, no logos, no hue outside 180–270 plus neutrals. Keep prompt, model, seed and date in `assets/gen/manifest.json`.

Veo is not used. Abstract motion is the ribbon field; generative video would not be seekable, seed-stable or on-palette.

### 7.3 Logos

Datadog, Prometheus, Grafana, OpenTelemetry, Kubernetes, AWS, Google Cloud, Azure, PagerDuty, Slack — official SVGs from each vendor's press/brand page, rendered monochrome `--sg-cream` at 70% inside square hairline chips (consistent with brand; avoids clashing vendor colors). Final list is gated by the storyboard `[VERIFY]` flag and marketing's partner-logo approval.

### 7.4 Audio

| Asset | Source | Spec |
|---|---|---|
| VO | ElevenLabs (voice chosen by user, §13), one file per storyboard beat, with word-level timestamps | 48 kHz 24-bit WAV + `line-NN.words.json` |
| Music bed | Artlist (MCP available) — "minimal electronic, tech, building, 100–110 BPM, no vocals", ≥ 2:20 | Licensed WAV |
| SFX | ElevenLabs sound-effects: notification tick, notification wall, whoosh (short/long), UI click, button thunk, gate tick, key clicks, low riser for S24, resolve chime | 48 kHz WAV, one per file |

Why ElevenLabs VO rather than Clueso voices: the build needs word-level timestamps inside HyperFrames to land type on VO words (§3.4 rule 4) and to recompute shot boundaries (§5 timing lock). Clueso keeps captions, where it reads those same timings.

---

## 8. Audio mix

### 8.1 VO → timing

1. Generate 15 VO lines (one per storyboard beat, cut lines as separate files so Cut A/B are file-level removals).
2. Store words.json per line. A script derives `timing.json`: each shot's start/end and each OST term's appear time (first frame of the named word − 3 frames).
3. Shot compositions read `timing.json` via HyperFrames variables; no hard-coded times in shot HTML.

### 8.2 Mix targets (via `/hyperframes-audio`)

| Bus | Level |
|---|---|
| VO | −16 LUFS integrated, true peak ≤ −1.5 dBTP, light de-ess, HPF 80 Hz |
| Music | −26 LUFS under VO, ducked −6 dB with 120 ms attack / 400 ms release under VO; −20 LUFS in S01–S02 and S27 |
| SFX | −22 to −18 LUFS, never masking VO consonants; S02 notification wall peaks at −14 LUFS then hard-cuts to silence on the whip |
| Master | −14 LUFS integrated (web), −1.0 dBTP |

Music edit: hit points at S03 title (downbeat), S06 (new section), S20 resolve (tension release), S24 riser, S27 final chord ringing out.

---

## 9. Composite recipe (the After Effects finish)

`scripts/composite.sh Sxx` — per shot, deterministic.

```bash
#!/usr/bin/env bash
set -euo pipefail
S="$1"; FPS_IN="${2:-60}"
P="renders/passes/$S"
# temporal samples per output frame: 60->30 = 2, 120->30 = 4
N=$(( FPS_IN / 30 ))
WEIGHTS=$(printf '1 %.0s' $(seq 1 $N))

ffmpeg -y -i "$P-bg.mov" -i "$P-mid.mov" -i "$P-fg.mov" -filter_complex "
 [0:v]format=rgba64le[bg];
 [1:v]format=rgba64le,split[mid][midb];
 [midb]colorlevels=rimin=0.78:gimin=0.78:bimin=0.78,gblur=sigma=14[midglow];
 [2:v]format=rgba64le,split[fg][fgb];
 [fgb]colorlevels=rimin=0.82:gimin=0.82:bimin=0.82,gblur=sigma=10[fgglow];
 [bg][mid]overlay=format=auto[a];
 [a][midglow]blend=all_mode=screen:all_opacity=0.35[b];
 [b][fg]overlay=format=auto[c];
 [c][fgglow]blend=all_mode=screen:all_opacity=0.25[d];
 [d]tmix=frames=$N:weights='$WEIGHTS',fps=30,
    vignette=angle=PI/5:mode=backward,
    noise=c0s=4:c0f=t+u,
    format=yuv422p10le[out]" \
 -map "[out]" -c:v prores_ks -profile:v 3 -vendor apl0 "renders/shots/$S.mov"
```

Notes:
- `tmix` before `fps` is the motion blur: it averages N consecutive high-rate frames into one output frame (a 180°-ish shutter at N=2, 360° at N=4). Do not add blur on shots with fine UI text held static — text is static so averaging leaves it sharp; only moving pixels blur. This is why passes must render above 30 fps.
- Bright-pass uses `colorlevels` input-black (0–1 scale, bit-depth independent) so only pixels above ~78% luminance feed the glow. Pipeline stays 16-bit RGBA until the ProRes encode.
- Bloom thresholds are starting values; tune on the golden shot S12 and freeze them in the script.
- Grain (`noise`) runs after blur so it is not averaged away; it also breaks gradient banding on the ink stage.
- Shot files are 10-bit ProRes 422 HQ; only the final delivery encode drops to 8-bit H.264. Chain verified on synthetic 60 fps alpha passes (2026-09-30): output 30 fps, yuv422p10le.

`scripts/master.sh` — concat composited shots per the edit decision list (full or cut), apply transitions that span shots, lay the mixed audio, then encode D1/D2/D3. Loudness verified with `ffmpeg -af ebur128`.

---

## 10. Clueso stage

Clueso receives the finished, mixed master; it does not re-time or re-animate anything.

| Step | Clueso MCP | Skill |
|---|---|---|
| Confirm workspace "Stackgen" (region aps1) | `find(type='workspaces')` | — |
| Create project, import D1 master | `create_project`, `upload_file`, `add_clips` | `clueso-skills` → `polish-screen-demo` |
| Brand conformance check (fonts, colors, safe areas) | `get_design_guide`, `get_clip(render=…)` | same |
| Captions from VO timings (upload SRT) | `update_clips` / caption elements | same |
| Chapters: Triage · Root cause · Remediation · Learn · Platform | project metadata | same |
| Aspect variants 9:16, 1:1, 4:5 with subject-aware reframing | `duplicate_project`, `update_project`, `export_project` | same |
| 30 s social cutdown | `run_script` for the batch edit, `export_project` | `clueso-skills` → `demo-cutdown` |
| Exports | `export_project`, `get_export` | — |

Build the Clueso work as a single `run_script` where possible (one round trip), and preview frames with direct `get_clip(render=…)` calls, since images cannot return from inside a script.

Vertical variants need recomposed OST, not just a crop: the 9:16 export must move OST into the top 30% of frame. If Clueso reframing cannot move type independently, re-render the `fg` pass at 1080×1920 in HyperFrames (the pass model makes this cheap) and composite again.

---

## 11. Parallel execution plan (subagents)

Opus writes this spec only. All build work runs on Sonnet (`claude-sonnet-5-thinking-high`) and Haiku (`claude-4.5-haiku-thinking`). Every subagent prompt includes: this spec path, its section numbers, the skills to load (read `SKILL.md` first), its exact output paths, and the acceptance checks from §12 that apply to it.

### Wave 0 — foundation + golden shot (serial, 1 agent, Sonnet)

Proves the whole chain on one shot before fan-out. Nothing else starts until W0 passes review.

- Scaffold `videos/aiden-sre-film/` with `npx hyperframes init`; write `BRIEF.md` (workflow `product-launch-video`), `tokens/brand.css`, `tokens/motion.js`, Geist fonts, `camera/` schema.
- Build `layers/ribbon-field.html`, `layers/kinetic-type.html`, `layers/ui-plate.html`, `layers/cursor.html`.
- Build **S12** end-to-end using a placeholder plate if P07 is not captured yet: 3 passes → `composite.sh` → review frames.
- Tune bloom thresholds, grain amount, parallax factors on S12; freeze them.
- Skills: `hyperframes`, `hyperframes-core`, `hyperframes-animation` (adapters/three), `hyperframes-keyframes`, `hyperframes-cli`, `hyperframes-registry`.
- Gate: user approves a 5 s S12 render and 4 stills.

### Wave 1 — inputs (parallel, 4 agents)

| Agent | Model | Task | Skills | Outputs |
|---|---|---|---|---|
| W1-plates | Haiku | Capture P01–P15 in authenticated Chrome, write snapshots, mark MISSING states | `chrome-devtools` (or cursor-ide-browser MCP) | `assets/plates/*`, `scripts/capture-plates.md` |
| W1-audio | Sonnet | VO 15 lines + words.json; SFX set; music bed search + licence; derive `timing.json` | `elevenlabs-skills` → `sound-effects`; `hyperframes-audio`; Artlist MCP | `assets/audio/**`, `timing.json` |
| W1-gen | Haiku | G01–G03 via Gemini image model; manifest; reject check | `media-use` | `assets/gen/*` |
| W1-logos | Haiku | Source + normalize 10 vendor SVGs to monochrome chips | `media-use` | `assets/logos/*` |

Gate: `timing.json` exists (shots need it), all plates present or explicitly MISSING.

### Wave 2 — shots (parallel, 5 agents, Sonnet)

Each agent owns one scene, builds its shots against the frozen W0 components, renders passes, composites, and reports.

| Agent | Shots | Special attention |
|---|---|---|
| W2-intro | S01–S05 | ribbons `storm`/`converge`, whip pan S02→S03, lattice + `lattice-state.json` |
| W2-triage | S06–S09 | FLIP re-sort, row collapse, counter continuity from S01 |
| W2-rca | S10–S15 (S12 exists) | pop-up FLIP from row, confidence bars, S14 as removable unit |
| W2-remed | S16–S20 | cursor press physics, typewriter log line, sparkline redraw |
| W2-close | S21–S27 | lattice restore, plates in isometric, end card buttons exact to stackgen.com |

Skills for all W2 agents: `hyperframes-core`, `hyperframes-keyframes`, `hyperframes-animation`, `hyperframes-registry`, `hyperframes-cli`. Add `motion-graphics` for W2-intro and W2-close.

Contract per shot: reads `camera/Sxx.json` + `timing.json`; writes `compositions/Sxx.html`, `renders/passes/Sxx-{bg,mid,fg}.mov`, `renders/shots/Sxx.mov`, and 3 snapshot PNGs at 25/50/90% into `renders/review/`. `npx hyperframes check` must be clean before render.

Cross-shot continuity (owned by the pair on each boundary): end state of shot N = start state of shot N+1 for match-moves in §6.1. The earlier shot's agent exports its last-frame element boxes as JSON; the later shot's agent reads them.

### Wave 3 — conform, mix, finish (serial, 2 agents, Sonnet)

- W3-conform: `master.sh` for full and cut EDLs, transitions spanning shots, mix via `/hyperframes-audio`, loudness check → D1, D2, D3, D7, D8.
- W3-clueso: §10 → D4, D5, D6. Skill `clueso-skills` → `polish-screen-demo`, then `demo-cutdown`.

### Wave 4 — review (1 agent, Sonnet)

Runs §12 against the masters, frame-samples every shot, writes `QA.md` with pass/fail per check and timecodes of failures. Skills: `audit-ai-design-slop`, `motion-graphics` (quality bar), `hyperframes-cli` (snapshot/compare). Failures route back to the owning W2 agent. Reticle is not applicable (no web app change).

---

## 12. Acceptance criteria

| # | Check | Pass condition | How measured |
|---|---|---|---|
| A1 | Runtime | D1 126 s ±1, D2 137 s ±1 | ffprobe |
| A2 | Lint/runtime | `npx hyperframes check` 0 findings, every composition | CLI |
| A3 | No static shots | Every shot's camera file has ≥ 2% scale change or ≥ 30 px drift | camera JSON script |
| A4 | Cut rhythm | Every shot 3.0–8.0 s after timing lock (S23-cut excepted at ~2.2 s) | timing.json |
| A5 | VO/type sync | Every OST term appears within ±120 ms of its named VO word | timing.json vs render frame sampling |
| A6 | Motion blur present | Frames during camera moves show blur on moving edges; held text stays sharp | visual review at 3 points per blur:heavy shot |
| A7 | No banding | Ink stage gradient shows no visible steps at 100% on a calibrated display; grain present | visual + `signalstats` |
| A8 | Brand | Only §3 tokens; 0 px radius everywhere; Geist/Geist Mono only; accents violet/cyan (coral/amber/green only per §3.2 rule) | CSS grep + visual |
| A9 | Legibility | Cream on ink ≥ 7:1; mute on ink ≥ 4.5:1; OST inside 90% title-safe | contrast calc, safe-area overlay |
| A10 | UI authenticity | Every product UI pixel comes from a captured plate or a DOM mock in brand tokens; no image-model UI | asset manifest review |
| A11 | Audio | VO −16 LUFS ±1; master −14 LUFS ±1; TP ≤ −1.0 dBTP; no VO masked by SFX | `ebur128`, listen pass |
| A12 | Claims | Every storyboard `[VERIFY]` item signed off or reworded before D1 | sign-off list in QA.md |
| A13 | Illustrative values | Any `[ILLUSTRATIVE]` number is plausible for the demo env and not presented as a customer result | review |
| A14 | Reference parity | Side-by-side with GitLab reference: all T1–T11 techniques present somewhere | checklist in QA.md |

---

## 13. Inputs needed from the user

| # | Input | Needed by | Default if not given |
|---|---|---|---|
| U1 | Stage credentials or a logged-in Chrome profile for `stage.dev.stackgen.com`, and which env has the Datadog-connected remediation flow | W1-plates | Blocks P01–P15; W0 uses placeholder |
| U2 | ElevenLabs voice ID (or "pick one": calm, mid-pitch, US/neutral, confident) | W1-audio | Agent proposes 3 voices with a 10 s sample each |
| U3 | Aspect variants wanted (9:16, 1:1, 4:5) | W3-clueso | 9:16 only |
| U4 | Music licence route (Artlist account) | W1-audio | Agent shortlists 3 tracks for approval |
| U5 | Partner logo approval list | W1-logos | Observability-only set, no cloud logos |
| U6 | `[VERIFY]` sign-offs: Navin (null-hypothesis testing, demoable actions, write-back), Raj (cross-agent world model) | before D1 | Lines stay as written; flagged in QA.md |
| U7 | Homepage film World Model / Aiden OS plates, if they exist as assets | W2-close | Built fresh in S25–S26 |
| U8 | Confirm derived tokens coral/amber/green (§3.2) | W0 | Used as specified |

---

## 14. Risks

| Risk | Impact | Mitigation |
|---|---|---|
| Stage app states missing (esp. remediation, error budget) | Gaps in UI authenticity | DOM mocks in brand tokens, marked in manifest; never image-model UI |
| Real VO pacing differs from 145 wpm | Shot durations shift | Timing lock from words.json (§5); shots read `timing.json` |
| 120 fps needs HyperFrames cloud render | Cost / account dependency | Only `blur: heavy` shots (S02, S07, + transitions); fall back to 60 fps with N=2 |
| Alpha + 4k not supported together | No 4k master | Out of scope; 1080p master with DPR-2 plates stays sharp |
| Parallel agents drift visually | Inconsistent film | Frozen W0 components + tokens; W2 agents may not edit `layers/` or `tokens/` (changes go through W0 owner) |
| Vendor logo trademark | Legal hold | U5 approval before W2-intro renders S04 |
| Composite tuning per shot sprawl | Inconsistent look | Bloom/grain constants frozen after S12; per-shot overrides need a QA.md note |

---

## 15. Out of scope

Homepage film (`home` track); 4k master; localisation; talking-head presenter; live screen recording; Veo/generative video; any reuse of previous `videos/*` projects.

## 16. Planning amendments

See "Spec amendments made during planning" in docs/superpowers/plans/2026-09-30-aiden-sre-film.md. Those items supersede §4.2, §4.5, §6 (S08, S17, S18, S22), §6.1, §7.2, §8.1 and §8.2 where they differ.
