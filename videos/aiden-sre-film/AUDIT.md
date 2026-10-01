# Video audit — Aiden for SRE, full master

- Target: `videos/aiden-sre-film/` and `renders/master/aiden-sre-full.mp4`
- Duration / size / fps: 112.200s, 1920×1080, 30 fps, h264 + aac
- Passes run: A B C D E
- Passes skipped: none. Pass A browser-checked `shots/S12` only. The root `index.html` is a placeholder title, not the film. The other 26 shots were reviewed from held master frames, not from `hyperframes check`.

## Ship

picture defects D1–D9 fixed on the 2026-10-01 remaster. Reopen the mp4 before judging it. Audio was not regenerated.

Held frames after the grade: ribbons read, REMEDIATE / BUILD / OPERATE / OBSERVE sit inside the tiles, the S12 rail is ink on white, S11 chips no longer stack, and the S14 line sits in the dark gap under the plate. `composite.sh` weights the current frame 8 and the previous frame 1. Bloom stays 0. Full mp4 112.200s, I −14.6 LUFS, peak −2.6 dBFS. Cut 105.300s, I −14.6, peak −2.7.

## Axes

| Axis | Score | Evidence |
|---|---|---|
| Craft | 2 | S02 at 6.63s doubles every card label. S12 at 48.56s leaves the evidence column illegible. `shots/S12` check reported contrast 30/30 because it never sees the ffmpeg grade. |
| Composition | 2 | S25 at 100.15s and S26 at 104.25s: the lit tile is an empty square and BUILD / OPERATE / OBSERVE sit at opacity 0.3. Ribbons read as hairlines. S14 at 55.65s cuts the support line. |
| Temporal | 3 | Cards, the sparkline, and the slab do move. `composite.sh` blends two frames at equal weight, so motion reprints type. S12 has no `motion.json` (`motion.enabled` false). |
| Engagement | 3 | S01 at 3.06s has a counter and a card column, which is a hook, and the ribbon field behind it does not register. |
| Prompt-intent | 2 | The design spec asks for a GitLab-grade ribbon field and a readable four-part diagram. Held frames of S02, S25, and S26 do not deliver that. |

## Defects

### P0 — Moving type is printed twice

- id: D1
- axis: Craft
- source: master frames
- also_seen: B, E
- where: `renders/master/aiden-sre-full.mp4` at 3.06s (S01) and 6.63s (S02). Cause: `scripts/composite.sh` `tmix=frames=2:weights='1 1'`.
- defect: Alert cards are in motion, and the two-frame blend draws every label twice, offset. "5xx spike", "Slow queries", and "CPU > 90%" each appear as a pair.
- why it matters: The opening diagram, which is the first thing on screen, cannot be read.
- fix: Weight the blend toward the current frame (for example `1 8`), or skip `tmix` on shots whose type is moving. Re-extract 3.06s and 6.63s and confirm a single glyph per label.

### P1 — Ribbon field does not read

- id: D2
- axis: Composition
- source: master frames
- also_seen: C, E
- where: 6.63s (S02 storm), 100.15s (S25), 104.25s (S26). `shots/S02/index.html` dormant opacity 0.45 then storm. `shots/S25/index.html` and `shots/S26/index.html` rail opacity 0.5. Bloom is 0 in `scripts/composite.sh`.
- defect: The data ribbons are a few low-contrast hairlines on `#14110C`. S02's storm, which is the shot, does not read as a field. The same lines barely clear the background on the world-model shots.
- why it matters: The animation the film is built around is not visible on a held frame.
- fix: Raise ribbon stroke contrast against `#14110C` until a still at 6.63s shows a field, not a texture. Do not bring back mid-pass bloom at 0.25; that was what turned plates pink.

### P1 — World-model tiles are an empty box and three ghosts

- id: D3
- axis: Composition
- source: master frames
- also_seen: D
- where: `shots/S25/index.html` `.qtile.is-dim { opacity: 0.3 }` and the lit tile, which gets a label under the box and no mark inside it. Frames at 100.15s and 104.25s.
- defect: REMEDIATE is a blank 420px square. BUILD, OPERATE, and OBSERVE are 18px Geist Mono at 30% opacity on a near-black tile. Borders are hairline on hairline.
- why it matters: The product diagram for the last act does not survive a pause.
- fix: Put a name inside the lit tile at full cream. Hold the other three at an opacity where 18px cream still clears 3:1 on `--sg-panel`, and re-check 100.15s.

### P1 — S12 evidence column does not clear the plate

- id: D4
- axis: Craft
- source: master frames
- also_seen: A
- where: 48.56s, right rail of the S12 plate. `hyperframes check` on `shots/S12` reported contrast 30/30.
- defect: The evidence rows (Datadog event, monitor, logs) are green-gray on white and do not read. The score bars (87%, 34%, 22%, 11%, 6%, 4%) do read.
- why it matters: The golden shot's product UI fails in the master even though the DOM contrast gate passes, because the gate samples the shot before the ffmpeg grade.
- fix: Replace or overlay that rail with cream-on-ink or ink-on-cream type at ≥4.5:1, then sample 48.56s. Do not treat the S12 check as a pass for the master.

### P1 — Investigation chips collide and leave the frame

- id: D5
- axis: Composition
- source: master frames
- also_seen: E
- where: 44.26s (S11). Title-safe inset is 10% (192×108). Action-safe inset is 5%.
- defect: The chips "logs" and "metrics events" overlap into one smudge on the right. "events" is cut off on the left edge.
- why it matters: The words that name the investigation are the shot's diagram, and they are not legible.
- fix: One chip per label, inside x=192 and x=1728, with no overlap. Re-extract 44.26s.

### P1 — Support line collides with the plate

- id: D6
- axis: Composition
- source: master frames
- also_seen: E
- where: 55.65s (S14), line "Root signal · downstream effect".
- defect: The line sits on the bottom edge of the alerts plate and is clipped on the right, so "effect" is partly gone.
- why it matters: The sentence that explains the diagram is the one that does not finish.
- fix: Move the line fully below the plate, inside the title-safe box (y ≤ 972), and re-extract 55.65s with the full phrase visible.

### P2 — Motion intent is not checked

- id: D7
- axis: Temporal
- source: hyperframes check
- also_seen: C
- where: `shots/S12` check, `motion.enabled` false. No `*.motion.json` beside the shot.
- defect: The browser gate cannot tell whether an entrance fired. A frozen shot would still return `ok: true`.
- why it matters: Pass A will keep passing shots whose animation never runs.
- fix: Add a sidecar that asserts the score bars and the plate are on screen by the hold, then re-run `check --json`.

### P2 — Exit eases in

- id: D8
- axis: Temporal
- source: review-animations
- also_seen: none
- where: `shots/S02/index.html` whip `ease: "power3.in"` over 0.45s at `D - 0.45`. `shots/S20/index.html` `scaleY` `power2.in` over 0.15s.
- defect: Those exits start slow. The standards bar for an exit is ease-out.
- why it matters: The card wall lingers, then snaps away, which reads as a stall rather than a cut.
- fix: Change those two eases to `power3.out` / `power2.out`. Leave durations.

### P2 — Counter sits on the title-safe line

- id: D9
- axis: Composition
- source: shot source
- also_seen: E
- where: `shots/S01/index.html` counter `y: 100`. Title-safe top is 108px. Held frame 3.06s.
- defect: The top of "1,282" starts 8px above the title-safe box. The same counter treatment is on S02.
- why it matters: The hook number is the first thing a crop or a caption band will fight.
- fix: Set `y` to at least 108 and confirm 3.06s.

## Appendix

- check JSON summary: `shots/S12`, hyperframes 0.8.96, `ok: true`, lint 0/0/0, runtime 0, layout 0, contrast 30 checked / 30 passed, motion disabled, 5 snapshots under `shots/S12/snapshots/`. `--at-transitions` added no samples (`transitionSamplesDropped` 0).
- info-level findings omitted: 0
- Frames reviewed: held frame per shot S01–S27 from the full master, at 72% of each shot (`/tmp/aofvid/audit/beats/`). S07, S20 read clearly. S20's sparkline is the control: a diagram can read on this grade.
- Impeccable `detect.mjs` was not run. It scans markup, and the failures above are in the graded mp4. Hero stills S02, S12, S14, S25, S26 were reviewed against the critique bar (hierarchy, type, contrast) instead.
- Root `index.html` was not checked. It is a placeholder, not a shot.
