# Video audit — Aiden for SRE, full master

- Target: `videos/aiden-sre-film/` and `renders/master/aiden-sre-full.mp4`
- Duration / size / fps: 112.200s, 1920×1080, 30 fps, h264 + aac
- Sampled: one hold frame per shot (62% through each shot in `build/timing.full.json`), 2026-10-01
- Passes run: B, D, E on the graded mp4. Pass A (`hyperframes check`) not re-run; it samples the shot before the ffmpeg grade and already passed S12 while the master did not.
- Passes skipped: C (motion-code review). This pass is the picture.
- Bar: `docs/superpowers/specs/2026-09-30-aiden-sre-film-design.md` §3. Panel `#211D15`, cream type, Geist / Geist Mono sizes, ribbons as a field, square corners.

## Ship

do not ship

The signature ribbons and a few panels already read. The story shots are still white product screenshots, empty dark slabs, or labeled boxes with nothing inside.

Leave these alone: S04 (ribbons converge on Aiden), S20 (sparkline and Resolved), the card column in S01, the ribbon settle in S27.

## Axes

| Axis | Score | Evidence |
|---|---|---|
| Craft | 2 | S07 prints two alert titles on top of each other. S02's counter sits on the card text. S25/S26 cut the bottom tiles off the frame. |
| Composition | 2 | S06/S07/S24 are large empty dark rectangles. S25/S26 tiles are labels with no interior. S11/S12/S14 are white plates in a near-black film. |
| Temporal | unscored | Not re-reviewed this pass. |
| Engagement | 3 | S01 and S04 stop the eye. S06's alert list and S24's resolution card do not. |
| Prompt-intent | 2 | Spec asks for a dark GitLab-grade product on an ink stage. The triage and investigation shots are light-mode screenshots. |

## Defects

### P0 — Story plates are light mode

- id: D1
- axis: Prompt-intent
- source: hold frames
- also_seen: D, E
- where: S11 at 43.54s, S12 at 48.24s, S14 at 55.20s
- defect: The investigation, hypothesis, and root-signal plates are white (`#F5F5F5`–`#FAF9FA`). Spec panel is `#211D15`. S12 is the poster frame.
- why it matters: The three shots that explain the product jump out of the film's world, and a plate that bright feeds the bloom.
- fix: Recapture those plates in the dark theme, or rebuild them as DOM on `#211D15` with cream type. Plate luminance should land near S20.

### P0 — Alert list is an empty dark slab under a white header

- id: D2
- axis: Composition
- source: hold frames
- also_seen: D
- where: S06 at 19.59s, S07 at 24.10s
- defect: The list is a `#2D2820` rectangle with a handful of bare titles and a wide empty right side. The chrome above it is still light gray. S07 also draws "Pod Crash Loop" on top of "System Load is High", and again over the redis line.
- why it matters: The shot that should feel like a live inbox reads as a broken render.
- fix: One dark treatment for the whole plate. Each row gets severity, title, source, and time at Geist Mono 20px. Put a solid mask under every overlay row so plate text and overlay text cannot double.

### P0 — Resolution card is a blank panel

- id: D3
- axis: Composition
- source: hold frames
- also_seen: D
- where: S24 at 95.68s
- defect: A plate about 1566×815px holds four lines in the top corner. Title is far under the 40px support size. No green, which the spec reserves for resolution.
- why it matters: The "it's fixed" shot is the largest empty box in the film.
- fix: Shrink the plate to the copy, or fill the lower two-thirds the way S20 fills its panel (sparkline, rollback line, time). Title 40px, body 20px, "Resolved" in `#A6F0BF`.

### P0 — World-model tiles are empty and cropped

- id: D4
- axis: Composition
- source: hold frames
- also_seen: D, E
- where: S25 at 99.69s, S26 at 103.86s
- defect: BUILD, OPERATE, and OBSERVE are hairline boxes with one word. REMEDIATE is the only tile with a subtitle. The bottom pair runs off the frame. The chip bars ("deployed", "broke", "fixed", "policy") sit on top of the tiles.
- why it matters: The platform diagram never resolves, and the words that name the quarters collide with the boxes.
- fix: Close all four tiles inside the title-safe box. Give each tile two or three Geist Mono 20px lines. Move the chip bars below the group with a clear gap. Drop amber borders; amber is for warnings.

### P1 — Counters collide with the cards

- id: D5
- axis: Craft
- source: hold frames
- also_seen: D
- where: S01 at 2.64s, S02 at 6.30s
- defect: "1,275" overlaps the card column. "4,875" is printed across "Pod restarted". Digits are proportional, so a count will jitter.
- why it matters: The hook number and the alert text erase each other.
- fix: Park the counter with a clear margin from any card. Geist Mono 120px, tabular numbers. S02 needs a card-free band or a dark scrim behind the number.

### P1 — The alert count is not one story

- id: D6
- axis: Prompt-intent
- source: hold frames
- also_seen: E
- where: S01 1,275 → S02 4,875 → S06 856 → S07 1,284 → S14 7
- defect: The number climbs, drops, climbs, then collapses.
- why it matters: "Buried in alerts" only works if the count moves in one direction until triage.
- fix: Climb through S02, hold one triage baseline in S06 and S07, then count down to 7. Drop 856.

### P1 — UI type is under the 20px floor

- id: D7
- axis: Composition
- source: hold frames
- also_seen: D
- where: S01 card labels, S06/S07 rows, S16 thread, S24 body, S25 subtitle
- defect: On-screen UI type measures about 13–17px. Spec callout is Geist Mono 20px. S16's thread is mute gray on a dark card.
- why it matters: The product copy is the story, and it is the smallest thing in the frame.
- fix: Floor every UI string at 20px. On dark panels, secondary lines go to cream at reduced opacity, not to a smaller mute size.

### P1 — Magenta nav button is off the palette

- id: D8
- axis: Composition
- source: hold frames
- also_seen: D
- where: "New Conversation" on S06, S07, S11, S14
- defect: The button is a saturated magenta. Brand violet is `#BA99FD`.
- why it matters: The brightest object in those shots is a nav control that is not the story.
- fix: Retint it to `#BA99FD` in the plate or cover it in the overlay.

### P1 — S12 bars and S14's pointer do not explain the plate

- id: D9
- axis: Composition
- source: hold frames
- also_seen: D
- where: S12 at 48.24s, S14 at 55.20s
- defect: Confidence bars cross body copy, and an 87% bar sits on a row under "What was ruled out". S14's downstream box is empty and the arrow does not land on a row. "Root signal · downstream effect" sits below the title-safe line.
- why it matters: The golden shot and the "it points at the cause" shot both fail their one job.
- fix: Bars only on hypothesis rows, with a mask under each bar. Put "downstream effect" in the box and draw leaders to the root row and one symptom. Raise the support line so it clears y=1010.

### P1 — S16 button and S27 end card are unfinished

- id: D10
- axis: Engagement
- source: hold frames
- also_seen: D
- where: S16 at 63.53s, S27 at 109.54s
- defect: The cursor covers the word "fix", so it reads as "Nix", and the RCA card is mostly empty. S27 has the wordmark and one button. The spec's second button and the "free for up to two users" line are absent, and the ribbons run through the wordmark at full strength.
- why it matters: The remediation beat and the close are the two places a viewer decides.
- fix: Cursor beside the label, label at 20px, card either smaller or filled. Add the second button and the micro-line. Drop ribbon opacity behind the wordmark.

## Already improved since the previous ledger

Double-printed moving type is gone on these holds. S14's support line is no longer clipped by the plate. S11's chips no longer smash into one smudge. Ribbons read as a field on S01, S04, and S27.

## Appendix

- Frames: `/tmp/aiden-audit/S01`–`S27` hold stills. Near-black (`max RGB ≤ 10`) rectangle scan found none; the "black boxes" are panel fills (`#211D15`–`#2E2920`) with too little type inside them.
- Impeccable `detect.mjs` was not run. The failures are in the graded picture.
- Critique skills applied to the stills: `critique-composition`, `critique-visual-hierarchy`, against spec §3.
