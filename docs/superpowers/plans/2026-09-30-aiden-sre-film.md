# Aiden for SRE Film — Implementation Plan (index)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Produce the 2:06 / 2:17 Aiden for SRE product film at GitLab-Duo production grade, per `docs/superpowers/specs/2026-09-30-aiden-sre-film-design.md`.

**Architecture:** 27 shots, each its own small HyperFrames project rendering three alpha passes (bg / mid / fg) driven by one shared camera file. An ffmpeg composite stage adds bloom, motion blur, grain and vignette. VO word timings drive every shot boundary and on-screen-text cue. Clueso does captions, aspects and the social cutdown only.

**Tech Stack:** HyperFrames CLI (HTML + GSAP, three.js adapter), Node 20 (`node:test`), Python 3 + pytest (venv), ffmpeg 9, ElevenLabs (TTS + SFX), Artlist MCP, Gemini image API, Chrome DevTools MCP, Clueso MCP.

## Plan files

Each subagent reads this index (Global Constraints, Amendments, Interfaces) plus **only** its task file.

| File | Tasks |
|---|---|
| `2026-09-30-aiden-sre-film/T00-scaffold.md` | T0 scaffold, data model, timing/camera core, template, tests |
| `2026-09-30-aiden-sre-film/T01-T05-layers-scripts.md` | T1 ribbons, T2 type, T3 plate/cursor/UI, T4 lattice, T5 render/composite/conform/mix scripts |
| `2026-09-30-aiden-sre-film/T06-T10-inputs.md` | T6 plates, T7 VO + timing lock, T8 SFX + music, T9 Gemini textures, T10 logos |
| `2026-09-30-aiden-sre-film/T11-T24-golden-finish.md` | T11 golden shot + look lock, T22 conform + mix, T23 QA, T24 Clueso |
| `2026-09-30-aiden-sre-film/T12-T21-shots.md` | T12–T21 shot packages (10 parallel agents) |

## Global Constraints

- Project root: `videos/aiden-sre-film/` (all paths are relative to it unless they start with `docs/`).
- Canvas 1920×1080. Passes render at 60 fps (`--format mov`); composite outputs 30 fps ProRes 422 HQ 10-bit.
- Brand tokens only (spec §3.1–3.2): `#14110C #1B1811 #211D15 #3F3B39 #F1EAE0 #FAF7F2 #96897C #BA99FD #A0EAFC #FDA39B #FDD89B #A6F0BF`. No other hex values in any shot or layer file.
- `border-radius: 0` everywhere. Fonts: Geist and Geist Mono only, local WOFF2 with `@font-face` in every shot file.
- Coral only on critical alerts and pre-fix error lines; green only at resolution (S20) and passed gates.
- HyperFrames determinism: no `Math.random` (use `mulberry32`), no `Date`/`performance.now`, no network, no `repeat: -1`, never tween `display`/`visibility`/`autoAlpha` on a `.clip`, one paused timeline registered at `window.__timelines["<composition-id>"]` after the build completes.
- DOM is built with `createElement` + `textContent` (no `innerHTML` anywhere — a repo hook blocks it).
- Every shot has camera motion (≥ 2% scale change or ≥ 30 px drift). Shots 3.0–8.0 s after timing lock (S27 end card and S23-cut exempt).
- Type enters on its VO word: every OST time comes from `shared/build/data.js`, never hand-typed.
- Cursor always travels on an arc; every click = press 0.96 for 90 ms + square hairline ripple 0→48 px fading over 0.35 s.
- Product UI pixels come only from captured plates or DOM mocks in brand tokens. Never image-model UI.
- Storyboard VO text is fixed. Do not rewrite copy.
- Models: build/review agents = Grok 4.7 (`grok-4.7-high-fast`); mechanical asset agents = Composer 2.5 (`composer-2.5-fast`). No Opus subagents.
- Git: every task commits only the files it lists (`git add <paths>`; never `git add -A` or `git commit -a`). The repo has unrelated uncommitted work.
- Reticle: not applicable (no web app change). State this in reports.

## Spec amendments made during planning

These supersede the spec where they differ (T0 appends a §16 pointer to the spec).

1. **Shots are separate HyperFrames projects** (`shots/Sxx/index.html`), because `check`/`render` operate on a project directory and a directly rendered file must be standalone. Shared code and assets live in `shared/`, reached via a `shots/Sxx/_shared` symlink (T0 verifies; hard-link copy fallback). Layers are ES modules in `shared/layers/`, not sub-composition HTML.
2. **16 VO lines**, not 15: beat B13 splits into L13 and L14 (Cut B) so both cuts are file-level removals.
3. **Audio mix is `scripts/mix.py` (ffmpeg)**, not `/hyperframes-audio`, because audio is assembled outside any HyperFrames composition.
4. **OST cue fixes:** S08 shows "Correlated" and "de-duplicated" at shot start and "ranked by service impact" on "ranks"; the options row builds across S17 ("Restart" on "restarting", "scale" on "scaling") and S18 ("reroute traffic", "roll back"); S22's anchor moves to "so the next", its OST cues on "next".
5. **Match-move transitions are hard cuts at a matched state** (no overlap). Scene-opening shots (S06, S10, S16, S21, S24) carry a G02 light leak in their bg pass.
6. **Gemini images via direct API** (`GEMINI_API_KEY` is set; the nanobanana MCP is not connected).
7. **S12 camera** is `(0,0,0,6,-10,0,1.00) → (-40,0,0,4,-6,0,1.04)`; the §4.2 JSON is illustrative only.
8. **Heavy-blur shots** are S02, S07, S24. 120 fps cloud rendering is used only if T5 verifies the cloud CLI supports it; otherwise all passes render at 60 fps (2-sample blur).
9. **Lattice state** lives in `data/graph.json` (the graph is the state); no `lattice-state.json`.

## Skills matrix (from skill-picker MCP, 2026-09-30)

Every subagent reads each listed `SKILL.md` (under `~/.cursor/skills/`) before starting. Routers first, then only the named member.

| Task | Work | Skills (read in order) | Picker notes |
|---|---|---|---|
| T0 | Scaffold, data, libs, tests | `hyperframes`, `hyperframes-core`, `hyperframes-cli`, superpowers `test-driven-development` | HyperFrames' own contracts |
| T1 | three.js ribbon field | `hyperframes-animation` (+ its three.js adapter file), `hyperframes-core`, `hyperframes-keyframes` | picker #1–2 for three.js in HyperFrames |
| T2 | Kinetic type | `hyperframes-keyframes`, `masked-reveal`, `staggered-word-reveal` | picker hits are scroll-triggered web patterns: reuse mask/stagger technique, drive from the paused timeline |
| T3 | UI plate, cursor, UI helpers | `motion-graphics`, `hyperframes-keyframes`, `clueso-skills` → `ui-concept-animation` (choreography reference only; no Clueso MCP calls) | picker ranked `ui-concept-animation` first; it's Clueso-only, so it informs choreography, not tooling |
| T4 | Isometric service map | `hyperframes-keyframes`, `motion-graphics` | **picker gap:** nothing matched isometric graph drawing; nearest two |
| T5 | Render/composite/conform/mix scripts | superpowers `test-driven-development`, `hyperframes-cli` | **picker gap:** no ffmpeg skill |
| T6 | Plate capture | `chrome-devtools-skills` → `chrome-devtools` | |
| T7 | VO + timing lock | `elevenlabs-skills` → `text-to-speech` | |
| T8 | SFX + music | `elevenlabs-skills` → `sound-effects`; fallback `elevenlabs-skills` → `music`; Artlist MCP (`user-artlist`) | `hyperframes-audio` ranked #1 but covers in-composition audio (amendment 3) |
| T9 | Texture images | `blog-image` (prompt structure only) | direct Gemini API (amendment 6) |
| T10 | Vendor logos | `company-logos` | Iconify Simple Icons |
| T11–T21 | Shots | `hyperframes-core`, `hyperframes-keyframes`, `hyperframes-animation`, `hyperframes-registry` (named transitions before hand-building), `motion-graphics`, `hyperframes-cli` | |
| T22 | Conform + mix | superpowers `verification-before-completion` | |
| T23 | QA | `emil-skills` → `review-animations`, `motion-graphics`, `video-to-superprompt` | picker top 3 for rendered-video review |
| T24 | Clueso finish | `clueso-skills` → `polish-screen-demo`, then `clueso-skills` → `demo-cutdown` | |

## Dispatch schedule (max 10 concurrent subagents)

```
Phase 0  T0 ───────────────────────────────── 1 agent (Grok 4.7)
Gate G0  orchestrator: tests green + smoke render OK; open stage page in Chrome DevTools MCP → user logs in
Phase 1  T1 T2 T3 T4 T5 T6 T7 T8 T9 T10 ───── 10 agents (T6, T9, T10 Composer 2.5; rest Grok 4.7)
         reviewers take slots as implementers finish
Gate G1  build_data.py clean on real VO; plates present or MISSING-listed; all tests green
Phase 2  T11 golden shot S12 ──────────────── 1 agent + remaining Phase-1 reviews
Gate G2  USER approves S12 render + stills; bloom/grain frozen
Phase 3  T12 … T21 shot packages ──────────── 10 agents (Grok 4.7); reviewers take freed slots
Phase 4  T22 conform+mix → T23 QA → T24 Clueso (serial, Grok 4.7)
```

Reviews per subagent-driven-development: spec-compliance review, then quality review, each a fresh Grok 4.7 subagent. A freed slot goes to that task's reviewer first.

User gates: U2 voice pick (T7), U4 music pick (T8), G2 golden-shot approval, U3 aspects + workspace confirmation (T24). The orchestrator relays these; subagents report `DONE_WITH_CONCERNS` and stop at them.

## Standard subagent prompt

```
You are implementing {TASK_ID} from docs/superpowers/plans/2026-09-30-aiden-sre-film/{FILE}.
Read in order: (1) docs/superpowers/plans/2026-09-30-aiden-sre-film.md — Global Constraints,
Spec amendments, Interfaces; (2) your task section only; (3) every SKILL.md listed for your task
in the Skills matrix — follow them. Spec context: {SPEC_SECTIONS} of
docs/superpowers/specs/2026-09-30-aiden-sre-film-design.md.
Work only in the files your task lists. Do not edit shared/tokens, shared/layers, data/, scripts/
unless your task owns them — report a needed change instead.
Commit only your files with the exact message in your task.
Report: DONE | DONE_WITH_CONCERNS | BLOCKED; files changed; commands run with real output
(last 20 lines); acceptance checks passed/failed; anything you could not do.
```

## Interfaces (cross-task contract)

Changes go through the orchestrator.

### Data (T0 produces; everyone reads `window.SG_DATA` from `shared/build/data.js`)

```js
window.SG_DATA = {
  shots:   { S01: { meta: <data/shots.json entry>, full: ShotTiming, cut?: ShotTiming }, ... },
  cameras: { S01: Camera, ... },
  plates:  { P01: PlateSnapshot, ... },  // once T6 lands
  graph:   Graph | null,                 // once T4 lands
  placeholder: boolean                   // true until real VO words exist
}
ShotTiming    = { id, start, duration, ost: [{ kind, text, cue, bold?, full_only?, t }] }   // t = shot-relative s
// kind ∈ eyebrow | headline | support | callout | cta | cue   — "cue" is an invisible VO-sync marker, never rendered
Camera        = { shot, duration, perspective, keys: [{ t, x, y, z, rx, ry, rz, scale }], ease, blur }
PlateSnapshot = { id, viewport: { w: 1920, h: 1080, dpr: 2 }, image: "P07.png",
                  boxes: { <key>: { x, y, w, h, label } }, missing: [<key>] }              // CSS px of viewport
Graph         = { nodes: [{ id, label, gx, gy }], edges: [[fromId, toId]] }                // isometric grid coords
```

### Shared modules (`shared/layers/`)

| Module | Owner | Exports |
|---|---|---|
| `prng.js` | T0 | `mulberry32(seed) → () => number in [0,1)` |
| `camera.js` | T0 | `PARALLAX = {bg:.25, mid:1, fg:1.35}`, `poseAt(cam, p)`, `transformFor(pose, factor, pass, perspective)`, `applyCamera(tl, cam, roots, duration)` |
| `shot.js` | T0 | `selectPass(id, pass) → {bg?, mid?, fg?}`, `shotData(id, mode) → {meta, timing, cam}`, `cueT(timing, text) → t` (throws if absent) |
| `ribbon-math.js` | T1 | `STAGE`, `ribbonSeeds(seed, count)`, `pointsFor(s, mode, t, target)`, `modeWeights(modes, t, blend)`, `ribbonAt(s, modes, t) → {points, opacity}` |
| `ribbons.js` | T1 | `mountRibbons(host, {seed, count=28, modes, split=0.7}) → {render(t), bind(tl, duration)}`; `modes = [{t, mode, target?, opacity?}]`, mode ∈ `dormant storm converge fan rail` |
| `type.js` | T2 | `splitWords(text, bold)`; `mountType(host) → {eyebrow(tl,text,t,pos?), headline(tl,{text,bold},t,pos?), support(tl,text,t,{x,y,append}), callout(tl,text,t,{x,y,box?,leader?}), counter(tl,{from,to,t,dur,x,y}), cta(tl,{primary,secondary,micro},tPrimary,tSecondary), fromOst(tl,ost,layout)}` |
| `plate.js` | T3 | `mountPlate(host, {id, x=120, y=90, width=1680}) → Promise<{el, box(key), mask(key), overlay(key), enter(tl,t,{from,dur})}>` — `box` returns stage px; `overlay` returns an empty positioned container the caller fills via DOM methods |
| `cursor.js` | T3 | `arcPoint(a, b, u, bend=0.12)`; `mountCursor(host) → {path(tl, [{t,x,y}]), click(tl,t), show(tl,t), hide(tl,t)}` |
| `ui.js` | T3 | `collapseRows`, `flipReorder`, `fillBars`, `typewriter`, `ringPulse`, `strike`, `drawPath`, `countUp`, `chipAlong`, `leak` (signatures in T3) |
| `lattice.js` | T4 | `isoToStage(gx, gy)`; `mountLattice(host, {graph, seed}) → {drawIn(tl,t,dur), showAll(), node(id) → {x,y}, mark(tl,id,t,{color}), pulse(tl,id,t)}` |

Positions are stage px (1920×1080) inside the pass's `.cam` wrapper; times are shot-relative seconds.

### Scripts (T0 / T5)

| Script | Contract |
|---|---|
| `scripts/build_data.py [--placeholder]` | writes `build/timing.{full,cut}.json`, `camera/Sxx.json`, `shared/build/data.js`; exit 1 on duration/camera problems (real VO only) |
| `scripts/new_shot.sh <ID>` | creates `shots/<ID>/` from template with `_shared` link |
| `scripts/render-passes.sh <Sxx> [full\|cut] [draft\|delivery]` | → `renders/passes/<Sxx>[-cut]-{bg,mid,fg}.mov` + `.fps` file |
| `scripts/composite.sh <Sxx[-cut]>` | → `renders/shots/<Sxx[-cut]>.mov` |
| `scripts/master.py <full\|cut> [--audio wav]` | → `renders/master/aiden-sre-<mode>.{mov,mp4}` |
| `scripts/mix.py <full\|cut>` | → `renders/master/{mix,vo,music,sfx}-<mode>.wav` |
| SFX cue sheet (T8) | `shared/assets/audio/sfx/cues.json` = `[{file, shot, t, gain_db}]`, `t` shot-relative |

All scripts honor `SG_ROOT` (default: project root) so tests can run in temp dirs.

## Self-review

- Spec coverage: §2 D1–D3, D7, D8 → T22; D4–D6 → T24. §3 → T0 tokens + lint. §4.1–4.3 → T0, T1, T5. §4.4 → T3, T6. §5 → T0, T7. §6 → T11 + shots file. §7 → T6, T9, T10, T7, T8. §8 → T5, T22. §9 → T5, T11. §10 → T24. §11 → schedule. §12 → T23. §13 U1–U8 → gates in T6, T7, T24, T8, T10, T23, package J, T0.
- Names checked across files: `mountRibbons/bind`, `mountType/fromOst`, `mountPlate/box/mask/overlay/enter`, `mountCursor/path/click`, `arcPoint`, `mountLattice/drawIn/showAll/mark`, `isoToStage`, `shotData`, `selectPass`, `applyCamera`, `SG_ROOT`, `cues.json` fields.
