# T12–T21 — Shot packages (Phase 3, 10 parallel agents)

Part of `docs/superpowers/plans/2026-09-30-aiden-sre-film.md` (read Global Constraints, Amendments, Interfaces first). Precondition: Gate G2 passed (S12 approved, look constants frozen, real VO timing locked).

**Model:** Grok 4.7 for every package · **Skills:** `hyperframes-core`, `hyperframes-keyframes`, `hyperframes-animation`, `hyperframes-registry`, `motion-graphics`, `hyperframes-cli`

Use `shots/S12/index.html` (T11) as the worked example of the layer APIs; the tables below are the specification for your shots.

## Common procedure (every shot)

- [ ] **1.** `scripts/new_shot.sh Sxx`
- [ ] **2.** Implement the shot's table in SHOT BUILD. Rules:
  - Times: numbers are shot-relative seconds; `ost:<text>` = that OST item's `t`; `cue:<text>` = `cueT(timing, "<text>")`; `D` = `timing.duration`. Never hard-code a time that the table gives as `ost:`/`cue:`.
  - OST rendering: `mountType(fg).fromOst(tl, timing.ost, layout)` with the table's `layout`; callouts are placed explicitly with `type.callout(...)`.
  - Plates: `await mountPlate(mid, {...})`, then `mask` + `overlay` for anything that moves.
  - DOM via `createElement`/`textContent` only. Deterministic only (seeded, no clocks). No CSS transform on a property you tween.
- [ ] **3.** `npx hyperframes check shots/Sxx` → 0 findings. `.venv/bin/python scripts/lint_brand.py` → clean.
- [ ] **4.** Draft review: `npx hyperframes snapshot shots/Sxx --at <25%>,<50%>,<90% of D>`; compare with the table; fix.
- [ ] **5.** `scripts/render-passes.sh Sxx full delivery && scripts/composite.sh Sxx`; for S23 also `scripts/render-passes.sh S23 cut delivery && scripts/composite.sh S23-cut`.
- [ ] **6.** Verify `ffprobe` duration of `renders/shots/Sxx.mov` = `D` ± 0.034 s; extract 3 stills to `renders/review/Sxx-{1,2,3}.png`.
- [ ] **7.** Continuity: the first frame of your first shot must match the "enters from" state; the last frame of your last shot must match the "hands off" state (these are the boundary contracts with neighbouring packages).
- [ ] **8.** Commit only `shots/Sxx/index.html` for your shots → `git commit -m "feat(aiden-sre-film): shots <first>–<last>"`. Report stills paths.

## Mock rule

If `mountPlate` rejects (plate `MISSING` or a required key absent), build a DOM mock panel in the same wrapper geometry (x 120, y 90, width 1680, height 945, `--sg-panel` fill, hairline border), with child elements at the boxes the table uses, named by the same keys, content in Geist/Geist Mono using demo-plausible text. Record the mock in `shots/QA.md` § Mocks (shot, plate, keys mocked). Never use an image model for UI.

## Shared constants

- Standard plate: `{x: 120, y: 90, width: 1680}` (all plate shots unless the table says otherwise).
- Standard ribbons behind UI: `count: 16, modes: [{t: 0, mode: "dormant", opacity: 0.45}]`, seed = shot seed.
- Leak shots (S06, S10, S16, S21, S24): `leak(tl, bg, 0.0, {src: "_shared/assets/gen/G02-<n>.png"})` with n = 1, 2, 3, 1, 2 in that order.
- Alert card (S01/S02): 360×84 px, `--sg-panel`, 1 px hairline, 0 radius; line 1 Geist Mono 15 px `--sg-mute` service; line 2 Geist 19 px `--sg-cream` title; critical cards get a 3 px `--sg-coral` left rule.
- Card texts (cycle in order): `checkout-svc · High latency p99 > 2s`, `cart-svc · Pod restarted (CrashLoopBackOff)`, `k8s-node-3 · CPU > 90%`, `payments-api · Error rate 4.2%` (critical), `redis-cache · Evictions rising`, `orders-svc · Queue depth > 10k`, `auth-svc · Token latency > 800ms`, `inventory-db · Slow queries`, `frontend-web · 5xx spike` (critical), `kafka · Consumer lag`, `search-svc · Timeout ratio 3%`, `api-gateway · Upstream resets`. All `[ILLUSTRATIVE]`.

---

## T12 — Package A: S01–S02 (Intro, problem)

**Enters from:** black ink frame. **Hands off to S03:** whip pan left at full motion blur.

**S01 — Alert flood builds**

| t | Pass | Action |
|---|---|---|
| 0 | bg | ribbons seed 101, `count: 18`, `modes: [{t:0, mode:"dormant", opacity:0.5}]` |
| 0.3 → D−0.5 | mid | one centred column (x 780): 12 alert cards; card *i* enters at `t_i = 0.3 + (D − 0.8) · (i/12)^0.8` from y −100 to slot top y 140, pushing older cards down 96 px (`EASE.snap`, 0.35 s); cards 4 and 9 are critical |
| 0.3 | fg | `type.counter(tl, {from: 0, to: 1284, t: 0.3, dur: D − 0.5})` (`[ILLUSTRATIVE]`) |
| 0 → D | — | camera per data |

**S02 — Flood overwhelms** (`blur: heavy`)

| t | Pass | Action |
|---|---|---|
| 0 | bg | ribbons seed 102, `modes: [{t:0, mode:"dormant"}, {t:0.4, mode:"storm"}]` |
| 0 | mid | centre column starts in S01's end state; four more columns at x 120, 480, 1200, 1560 |
| 0.05 → D−0.6 | mid | each column drops 14 cards, card *i* of column *c* at `0.05 + c·0.07 + i·0.22·(1 − i/28)` (accelerating), same card style |
| cue:hours | mid | the two critical cards nearest centre get `ringPulse` (coral, 3 rings) |
| 0 → D | fg | counter continues 1284 → 4,906 |
| D−0.45 → D | all | whip: add to the camera an extra x offset 0 → −1800 on all passes (`power3.in`), applied to each pass root after `applyCamera` via a wrapper element (don't fight the camera tween) |

Registry first: search `/hyperframes-registry` for "whip pan"; use it for the last 0.45 s if it exists and composes with the pass model, otherwise the manual offset above.

---

## T13 — Package B: S03–S05 (Intro, discover)

**Enters from:** whip pan arriving from the right (first 0.3 s of S03: extra x +1800 → 0, `power3.out`). **Hands off to S06:** lattice fully drawn, checkout-svc marked, camera at rx 28.

**S03 — Title card** — `layout: {eyebrow: {x: 120, y: 360}, headline: {x: 120, y: 420}}`

| t | Pass | Action |
|---|---|---|
| 0 | bg | ribbons seed 103 `dormant`, opacity 0.5; radial lift: full-bleed div `radial-gradient(ellipse at 30% 50%, var(--sg-ink-raised), var(--sg-ink) 70%)` under the canvas |
| 0 → 0.3 | all | whip arrival (see "Enters from") |
| ost:AIDEN FOR SRE | fg | eyebrow |
| ost:Your AI SRE teammate. | fg | headline, bold "AI SRE" |
| D−0.35 → D | fg | headline + eyebrow slide x −60 and fade to 0 (`EASE.exit`) |

**S04 — Tools connect** (logo chips arc → Aiden mark)

| t | Pass | Action |
|---|---|---|
| 0 | bg | ribbons seed 104, `modes: [{t:0, mode:"dormant"}, {t:0.3, mode:"converge", target:{x:1480, y:540}}]` |
| 0.1 | mid | Aiden mark at (1480, 540): 120×120 hairline square, `--sg-panel`, "Aiden" Geist 500 28 px, violet 2 px top rule |
| 0.2 + 0.12·i | mid | logo chips (i = 0…7: datadog, prometheus, grafana, opentelemetry, kubernetes, aws, googlecloud, azure — trim per U5 approval) on an arc x 260–520, y 200–880; each 72×72 hairline square with the SVG in `--sg-cream` at 70% |
| 0.6 + 0.12·i | mid | each chip's colour flips cream → `--sg-cyan` as its ribbon arrives (0.2 s) |
| D−0.6 | mid | Aiden mark `ringPulse` in violet |

**S05 — Service map draws** — `layout: {support: {x: 120, y: 940}}`

| t | Pass | Action |
|---|---|---|
| 0 | bg | lattice: `mountLattice(bg, {graph: SG_DATA.graph, seed: 105})` — put it in **bg** (depth), ribbons seed 105 `dormant` opacity 0.3 behind it |
| 0.1 | bg | `drawIn(tl, 0.1, D − 0.9)` |
| ost:Discovers your services and dependencies | fg | support line |
| D−0.6 | bg | `mark(tl, "checkout-svc", D − 0.6)` |

---

## T14 — Package C: S06–S07 (Alert triage, problem → sorting)

**Enters from:** lattice from S05 (cut on scene boundary; leak masks it). **Hands off to S08:** P03 grouped state, camera scale 1.10, ry −4.

**S06 — Triage dashboard establish** — `layout: {eyebrow: {x: 120, y: 60}}`

| t | Pass | Action |
|---|---|---|
| 0 | bg | standard ribbons; `leak` G02-1 |
| 0 | mid | plate P01 standard; `enter(tl, 0.05, {from: "right"})` |
| 0.2 → D | mid | `mask("list")`; overlay `list`: DOM rows cloned from P01 labels (use `box(row-N).label`), new rows push in at the top every 0.28 s (`EASE.snap`), list scrolls with eased momentum (spec §3.4 rule 6); `header-count` overlay counts 312 → 1,284 |
| ost:ALERT TRIAGE | fg | eyebrow |

**S07 — Noise collapses** (`blur: heavy`)

| t | Pass | Action |
|---|---|---|
| 0 | mid | P01 overlay rows in S06's end state (12 visible) |
| cue:groups | mid | related rows (3 groups: rows {1,4,7}, {2,5}, {3,9,11}) slide together (`flipReorder`) under group headers; each header gets a 2 px violet left rule |
| cue:filters | mid | `collapseRows` on noise rows {6, 8, 10, 12} |
| D−0.5 → D | mid | crossfade overlay to plate P03 (`mountPlate` P03 at same geometry beneath, overlay opacity → 0) |

---

## T15 — Package D: S08–S09 (Alert triage, rank → outcome)

**Enters from:** P03 grouped, scale 1.10. **Hands off to S10:** P02 critical list, flat (ry 0), scale 1.02, x −40.

**S08 — Re-rank + classification callout** — `layout: {support: {x: 120, y: 960, inline: true}}`

| t | Pass | Action |
|---|---|---|
| 0 | mid | plate P03; overlays on `row-1…row-12` |
| 0.3 | mid | `flipReorder` rows to impact order `[3,1,7,2,9,4,5,11,6,8,10,12]` (by `[ILLUSTRATIVE]` impact) |
| ost:ranked by service impact | fg | `type.callout(tl, "CLASSIFICATION", t, {box: <stage box of col-classification>, leader: true, x: box.x + box.w + 24, y: box.y})` |
| ost:Correlated / de-duplicated / ranked by service impact | fg | `fromOst` support line (inline append) |

**S09 — Only what needs you** — `layout: {support: {x: 120, y: 960}}`

| t | Pass | Action |
|---|---|---|
| 0 | mid | plate P02 standard (cut from P03; match the list box position) |
| 0 | fg | counter at (1560, 80) showing 1,284 |
| 0.4 | fg | counter counts 1,284 → 7 over 1.6 s (`EASE.snap`) (`[ILLUSTRATIVE]`) |
| 0.6 → 2.4 | mid | list scrolls up gently 60 px (momentum ease) then holds |
| ost:Only the alerts that need you | fg | support line |
| last 1.2 s | — | hold (camera pull back only) |

---

## T16 — Package E: S10–S11 (RCA, click → pop-up)

**Enters from:** P02, flat, scale 1.0 (leak masks scene cut). **Hands off to S12:** P07 pop-up in place at standard geometry, camera `(0,0,0,6,-10,0,1.00)`.

**S10 — Click into the critical alert** — `layout: {eyebrow: {x: 120, y: 60}}`

| t | Pass | Action |
|---|---|---|
| 0 | bg | standard ribbons; `leak` G02-2 |
| 0 | mid | plate P02 standard; hover state from P04 prepared on `row-critical-k8s` (overlay with the P04 row crop or a hover tint `--sg-ink-raised`) |
| ost:ROOT CAUSE ANALYSIS | fg | eyebrow |
| 0.3 | mid | cursor `show`; `path` from (1500, 900) to the **middle** of `row-critical-k8s`, arriving at `cue:hits − 0.1` |
| cue:hits − 0.3 | mid | hover state on |
| cue:hits | mid | `click` |
| cue:hits + 0.1 | fg | timer chip at (1560, 60): hairline box, Geist Mono 28 px `00:00`, counts up at real seconds via `countUp` formatter `mm:ss` until D |

**S11 — Investigation pop-up opens**

| t | Pass | Action |
|---|---|---|
| 0 | mid | P02 underneath dimmed to 35% |
| 0 → 0.5 | mid | plate P06 scales from the stage box of P02 `row-critical-k8s` to standard geometry (FLIP: from scale/translate matching the row box, `EASE.enter`) |
| ost:logs / metrics / events | mid | `chipAlong` three chips "logs", "metrics", "events" from off-frame left (−80, 300/540/780) to the `summary` box right edge, stacked 56 px apart; ribbons for this shot: `modes: [{t:0, mode:"dormant"}, {t:ost:logs − 0.3, mode:"converge", target: <summary box centre>}]` |
| D−0.4 → D | mid | crossfade P06 → P07 (same geometry) |
| 0 → D | fg | timer chip continues from S10 (start value = S10 final value) |

---

## T17 — Package F: S13–S15 (RCA, ruled out → report)

**Enters from:** S12 end state (P07, bars filled `[87,34,22,11,6,4]`, camera `(-40,0,0,4,-6,0,1.04)`). **Hands off to S16:** motion-graphic scene (cut + leak).

**S13 — Ruled out** 

| t | Pass | Action |
|---|---|---|
| 0 | mid | P07 + S12's bar overlays at final values (rebuild them identically, no animation) |
| ost:ruled out · 4% | mid | `strike` on `hyp-6` row |
| ost:ruled out · 4% | fg | `type.callout(tl, "ruled out · 4%", t, {box: <hyp-6 box>, leader: true, x: box.x + box.w − 260, y: box.y − 44})` |
| 0 → D | fg | timer chip continues |

**S14 — Root signal vs downstream effect** (full cut only) — `layout: {support: {x: 120, y: 960}}`

| t | Pass | Action |
|---|---|---|
| 0 | mid | plate P08 standard, `enter(tl, 0, {from: "z"})` |
| 0.4 | mid | `marker-downstream` overlay pulses once (cyan) |
| ost:Root signal · downstream effect − 0.4 | mid | SVG arrow from `row-symptom` right edge to `row-root` right edge (curved, 1 px cream), `drawPath` 0.6 s |
| ost:Root signal · downstream effect | mid | `ringPulse` on `row-root` in **violet** |
| ost:… | fg | support line |

This shot must be removable: S13's last frame and S15's first frame must cut cleanly without it (verify by cutting S13 → S15 in a scratch concat).

**S15 — RCA report flash** — `layout: {support: {x: 120, y: 960}}`

| t | Pass | Action |
|---|---|---|
| 0 | mid | plate P09 standard, starts at camera's steep tilt (camera does the fly-in) |
| 0.2 → 0.9 | mid | `section-1…3` boxes get a 1 px cream underline drawn left→right, 0.15 s stagger |
| ost:Probable cause, with the evidence | fg | support line |
| cue:down | fg | timer chip freezes; its border and text turn `--sg-green` over 0.3 s (value `[ILLUSTRATIVE]`) |

---

## T18 — Package G: S16–S18 (Remediation, gap → options)

**Enters from:** S15 report (cut + leak). **Hands off to S19:** P10 card with all four option chips lit, camera `(-50,0,0,0,-4,0,1.05)`.

**S16 — The manual gap** (motion graphic) — `layout: {eyebrow: {x: 120, y: 60}}`

| t | Pass | Action |
|---|---|---|
| 0 | bg | standard ribbons at opacity 0.3; `leak` G02-3 |
| 0 | mid | DOM card "RCA summary" (820×420, standard card style, 3 text rows from P09 labels or mock) at (560, 260) |
| 0.4 | mid | cursor `show`, `path` to the card's "Fix" area and hovers; no click |
| 1.2 | mid | runbook link card (520×120, "runbook: checkout-svc rollback.md", Geist Mono) floats in at (1180, 620), CSS `filter: blur(2px)` |
| 1.6 | mid | chat thread card (560×200: "#oncall · who knows checkout-svc?" + two reply stubs) floats in at (1120, 760), blur 2 px |
| 0 → D | mid | this shot only: `filter: saturate(0.6)` on the mid root |
| ost:REMEDIATION | fg | eyebrow |

**S17 — Remediation card** — `layout: {support: {x: 120, y: 960, inline: true}}`

| t | Pass | Action |
|---|---|---|
| 0 | mid | plate P10 standard, `enter(tl, 0, {from: "right"})` |
| 0.5 | mid | `action-row` overlay: text "Roll back checkout-svc to previous version" types in (`typewriter`, 60 cps) (`[ILLUSTRATIVE]` service) |
| ost:Restart | mid + fg | `opt-restart` chip border → violet; support "Restart" |
| ost:scale | mid + fg | `opt-scale` chip → violet; support append "scale" |

**S18 — Options row** — `layout: {support: {x: 120, y: 960, inline: true}}`

| t | Pass | Action |
|---|---|---|
| 0 | mid + fg | S17 end state: P10, restart + scale lit; support line "Restart · scale" already visible (rebuild without animation) |
| ost:reroute traffic | mid + fg | `opt-reroute` → violet; append "reroute traffic" |
| ost:roll back | mid + fg | `opt-rollback` → violet **and** gets a 2 px violet outline (the proposed action); append "roll back" |

---

## T19 — Package H: S19–S20 (Remediation, approve → resolved)

**Enters from:** S18 end state. **Hands off to S21:** P12 resolved, camera scale 1.00.

**S19 — Approve + audit** — `layout: {support: {x: 120, y: 960, inline: true}}`

| t | Pass | Action |
|---|---|---|
| 0 | mid | plate P11 standard (cut from P10; match the card box) with the approve button overlay in its pre-approved look |
| 0.2 | mid | cursor `show`, `path` to `approve-btn` centre, arriving at `ost:Approval gate − 0.15` |
| ost:Approval gate | mid | `click`; button fill → `--sg-cream-bright`, text "Approved" |
| ost:Approval gate + 0.25 | mid | `gate-policy` chip ticks: 1 px border → `--sg-green`, check glyph draws (`drawPath` 0.25 s) |
| ost:full audit trail | mid | `audit-line-last` overlay: `typewriter` "10:42:07  aiden  rollback checkout-svc → v1.41.2  approved by s.patel" at 50 cps (`[ILLUSTRATIVE]`) |
| ost:… | fg | support "Approval gate · full audit trail" |

**S20 — Resolved** — `layout: {support: {x: 120, y: 960}}`

| t | Pass | Action |
|---|---|---|
| 0 | mid | plate P12 standard; `status-pill` overlay starts coral "Active" |
| cue:close | mid | pill flips to `--sg-green` "Resolved" (0.3 s) |
| cue:close + 0.2 | mid | `chart-error-rate` overlay: SVG polyline, first 60% coral spike (drawn already), then a new segment returning to baseline draws in `--sg-green`, `drawPath` 1.4 s |
| ost:You decide what runs | fg | support line |

---

## T20 — Package I: S21–S23 (Learn) — including the S23 cut variant

**Enters from:** P12 resolved (cut + leak). **Hands off to S24:** product UI tile (P12 plate) at standard geometry, camera scale 1.00 — i.e. S23 must end with a 0.4 s crossfade from the lattice back to the P12 plate (so S24 starts on it).

**S21 — Incident becomes a chip**

| t | Pass | Action |
|---|---|---|
| 0 | bg | standard ribbons opacity 0.5; `leak` G02-1 |
| 0 | mid | plate P12 standard |
| cue:learning | mid | plate shrinks (FLIP) into a 220×56 chip "checkout-svc · rollback" at (850, 512): scale + clip-path inset to chip box, 0.8 s `EASE.enter`; chip text fades in last 0.2 s |
| cue:learning + 1.0 → D | mid | chip floats slowly up 20 px; ribbons visible around it |

**S22 — Chip writes into the service map** — `layout: {support: {x: 120, y: 960}}`

| t | Pass | Action |
|---|---|---|
| 0 | bg | lattice `showAll()` (same graph as S05), ribbons seed 122 `dormant` 0.3 |
| 0 | mid | chip at S21 end position |
| 0.2 | mid | `chipAlong` chip → `node("checkout-svc")` (stage coords from the bg lattice; bg parallax 0.25 vs mid 1.0 — compute the landing point at t = 0.2 + dur using `poseAt` so it lands visually on the node), dur 1.0 |
| 1.2 | bg | `mark(tl, "checkout-svc", 1.2)` violet; chip fades out as the mark lands |
| ost:Every incident makes the next one easier | fg | support line |

**S23 — Seen before + error budget** — `layout: {support: {x: 120, y: 960}}`

| t | Pass | Action (full) |
|---|---|---|
| 0 | bg | lattice `showAll()` + mark on checkout-svc (S22 end state) |
| 0.2 | bg | `pulse(tl, "checkout-svc", 0.2)` — a new alert lands (small coral chip drops onto the node) |
| 0.5 | mid | plate P15 at `{x: 980, y: 240, width: 820}` (secondary size), `enter` from right; `seen-before-row` gets a 2 px violet left rule at 0.9 |
| ost:Error budget tracking | mid | plate P14 at `{x: 120, y: 640, width: 820}`, `enter` from below; `budget-bar` overlay fills to 78% (`[ILLUSTRATIVE]`), `budget-threshold` tick glows `--sg-amber` |
| ost:Error budget tracking | fg | support line |
| D−0.4 → D | mid | crossfade everything to plate P12 standard (hand-off to S24) |

**Cut variant (`mode = "cut"`, D ≈ 2.1 s):** only rows t = 0, 0.2, 0.5 (P15 seen-before) and the final crossfade (at D − 0.4). No P14, no support line (its OST item is `full_only`, so `fromOst` already omits it). Branch on `mode` inside SHOT BUILD.

---

## T21 — Package J: S24–S27 (Platform + CTA)

**Enters from:** P12 plate standard, camera scale 1.00. **Hands off:** end of film.

Before building S25/S26, ask the orchestrator whether the homepage film's World Model / Aiden OS plates exist (U7). If yes, match their geometry and labels; if not, build per the tables and export stills of S25/S26 final frames to `renders/review/` for reuse.

**S24 — UI becomes the REMEDIATE tile** (`blur: heavy`)

| t | Pass | Action |
|---|---|---|
| 0 | bg | ribbons seed 124, `modes: [{t:0, mode:"dormant"}, {t: cue:world − 0.4, mode:"fan", target:{x:960, y:540}}]`; `leak` G02-2 |
| 0 | mid | plate P12 standard |
| 0.2 | — | SFX riser (cue sheet) |
| cue:world − 0.6 → cue:world + 0.4 | mid | plate squares off into a 420×420 tile centred (960, 540): FLIP scale + clip-path to square; `--sg-cyan` 2 px border fades in; label "REMEDIATE · Aiden for SRE" Geist Mono 18 px below |
| 0 → D | — | camera pulls back (z −600) and tilts to isometric rx 30 (per data) |

**S25 — Aiden World Model plate** — `layout: {eyebrow: {x: 120, y: 60}}`

| t | Pass | Action |
|---|---|---|
| 0 | mid | REMEDIATE tile (S24 end) at (960, 420) plus three dim tiles for BUILD (violet), OPERATE (`--sg-amber`), OBSERVE (`--sg-coral`) at 30% opacity, 2×2 layout, 16 px gaps — the four quarters of the ops piece |
| 0.2 → 0.9 | mid | World Model plate: 1000×80 hairline slab under the tiles, `--sg-panel`, slides in from x −1200 (`EASE.enter`); label "AIDEN WORLD MODEL" Geist Mono 16 px inside |
| 0.9 | mid | four 1 px connector lines drop from tiles to the slab (`drawPath`, 0.3 s, 0.08 s stagger) |
| ost:AIDEN WORLD MODEL | fg | eyebrow |
| ost:deployed / changed / broke / fixed | mid | chips on the slab, left→right, each lights `--sg-cyan` on its `ost:` time |
| 0 → D | bg | ribbons `rail` along the slab (`modes: [{t:0, mode:"rail"}]`, opacity 0.5) |

**S26 — Aiden OS plate** — `layout: {eyebrow: {x: 120, y: 60}}`

| t | Pass | Action |
|---|---|---|
| 0 | mid | S25 end state |
| 0.1 → 0.8 | mid | Aiden OS slab (1000×80) slides in beneath the World Model slab from x +1200 |
| ost:AIDEN OS | fg | eyebrow (replaces S25's with a 0.2 s crossfade) |
| ost:policy, then +0.25, +0.5 | mid | pills "policy", "approvals", "audit" on the OS slab light violet left→right (the table's null-cue OST items `approvals`, `audit` are timed from `ost:policy` + 0.25 / + 0.5 — override their `t`) |
| 1.0 | mid | an action token (12 px square, cream) leaves the REMEDIATE tile, passes down through the OS slab (pauses 0.2 s at "policy" — pill flashes green), continues off-frame |
| last 0.8 s | — | hold |

**S27 — End card**

| t | Pass | Action |
|---|---|---|
| 0 | bg | ribbons seed 127 `dormant` opacity 0.4; sweep-in: `modes: [{t:0, mode:"rail", opacity:1}, {t:0.6, mode:"dormant", opacity:0.4}]` (ribbon wipe reveal) |
| 0.3 | fg | StackGen wordmark: text "StackGen" Geist 500 56 px cream at (960, 440) centred (use the official SVG if provided later), fades up 0.5 s |
| ost:Book a demo / ost:Try Community Edition | fg | `type.cta(tl, {primary: "Book a demo", secondary: "Try Community Edition", micro: "free for up to two users"}, ost:Book a demo, ost:Try Community Edition)` |
| last 1.5 s | — | near-static hold (camera drift ≥ 30 px continues) |
