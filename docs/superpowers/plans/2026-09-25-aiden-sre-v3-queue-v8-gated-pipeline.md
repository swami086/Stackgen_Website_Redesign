# Aiden SRE V3 Queue V8 Gated Pipeline Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a gated greenfield ~45–60s Aiden SRE ticket-queue product demo: locked human script → silent HyperFrames plates (safe regional zoom) → Clueso Chris VO + Soft BGM preview, with no export until explicit ask.

**Architecture:** Approach 1 greenfield under `videos/aiden-sre-v3-queue-v8/`. Archive `videos/aiden-sre-v3-frontdoor/` is copy-only. Gate A locks `SCRIPT.md` via `expert-pmm-writer`. Gate B renders silent `plate-a.mp4` (beats 1–3) and `plate-b.mp4` (beats 5–7) with `focusPoseSafe` PAD=72. Gate C new Clueso project stitches plate A → `stage-v4-tight-1920x1080.mp4` → plate B; Chris VO inside Clueso; Soft BGM @12%; dissolves only; no crop zooms; no burn-in. Hard stop after each gate until user says the pass phrase.

**Tech Stack:** `expert-pmm-writer` + `check_ai_signs.py` · HyperFrames 0.8.40 / GSAP · Node ≥22 · Clueso MCP (`clueso-skills` → `polish-screen-demo`) · ElevenLabs Chris via Clueso · ffmpeg/ffprobe

**Spec:** `docs/superpowers/specs/2026-09-25-aiden-sre-v3-queue-v8-gated-pipeline-design.md`

## Global Constraints

- Story = V3 ticket queue only (incomplete Jira → Aiden context → write-back → breadth)
- Spoken runtime ~45–60s (target ~50–55s)
- Audience = mixed product-page (SRE + eng leaders)
- Overlays = none (no plate pills, no Clueso burn-in captions)
- Camera = HyperFrames owns safe regional zooms; Clueso does **not** crop-zoom
- Never mutate archive `videos/aiden-sre-v3-frontdoor/` as live SoT
- Never name Visa / Mitratech (or other unapproved customers)
- Never use “front door” metaphor
- Never use em dash (U+2014) or en dash (U+2013) in spoken copy
- No cert/restart/access laundry as hero story
- Breadth = filtered Jira list, not floating montage cards
- Soft BGM file = `bgm-soft.mp3` @ ~12% (Gate C only)
- Voice = Chris (ElevenLabs) generated **inside Clueso**, not a separate ElevenLabs pipeline
- No `export_project` / public export until Gate C pass **and** separate explicit user ask
- Skill-picker re-run at each gate start; locked §3 table in spec wins over noisy hits
- Sourcegraph / Reticle N/A; Chisle on; Ouroboros only if user asks
- Commits only when user asks (do not auto-commit unless requested)

## File map

| Path | Responsibility |
|------|----------------|
| `videos/aiden-sre-v3-queue-v8/BRIEF.md` | Intent, assets, gate status, bans |
| `videos/aiden-sre-v3-queue-v8/SCRIPT.md` | Locked paste block + beat table for Clueso |
| `videos/aiden-sre-v3-queue-v8/VALIDATION.md` | Running pass/fail checklist + URLs |
| `videos/aiden-sre-v3-queue-v8/package.json` | HyperFrames 0.8.40 scripts |
| `videos/aiden-sre-v3-queue-v8/hyperframes.json` | Project registry config |
| `videos/aiden-sre-v3-queue-v8/meta.json` | HyperFrames meta |
| `videos/aiden-sre-v3-queue-v8/compositions/plate-a.html` | Silent beats 1–3 Jira plate |
| `videos/aiden-sre-v3-queue-v8/compositions/plate-b.html` | Silent beats 5–7 Jira plate |
| `videos/aiden-sre-v3-queue-v8/assets/` | Copied jira CSS/marks, stage, Soft BGM |
| `videos/aiden-sre-v3-queue-v8/renders/plate-a.mp4` | Gate B deliverable A |
| `videos/aiden-sre-v3-queue-v8/renders/plate-b.mp4` | Gate B deliverable B |
| `videos/aiden-sre-v3-queue-v8/snapshots/` | Proof PNGs at beat peaks |
| Archive (read/copy only) | `videos/aiden-sre-v3-frontdoor/` |

---

### Task 1: Scaffold greenfield project + copy assets

**Files:**
- Create: `videos/aiden-sre-v3-queue-v8/` tree per File map
- Create: `BRIEF.md`, `VALIDATION.md`, `package.json`, `hyperframes.json`, `meta.json`
- Create: `assets/` copies from archive (do not edit archive)
- Test: `ls` + `test -f` checks below

**Interfaces:**
- Consumes: archive assets listed in spec §4
- Produces: empty project ready for Gate A script (no `SCRIPT.md` paste yet)

- [ ] **Step 1: Create directories**

```bash
mkdir -p videos/aiden-sre-v3-queue-v8/{assets,renders,snapshots,compositions,refs}
cd videos/aiden-sre-v3-queue-v8
```

Expected: dirs exist; cwd is new project.

- [ ] **Step 2: Copy assets from archive (read-only source)**

```bash
SRC=../aiden-sre-v3-frontdoor/assets
cp "$SRC/jira-mock.css" \
   "$SRC/jira-mark.svg" \
   "$SRC/jira-logo-banner-crop.png" \
   "$SRC/jira-logo-chrome-crop.png" \
   "$SRC/stage-v4-tight-1920x1080.mp4" \
   "$SRC/bgm-soft.mp3" \
   assets/
# fonts if plate HTML needs them
cp -R "$SRC/fonts" assets/ 2>/dev/null || true
```

Expected: six core files present under `assets/`.

- [ ] **Step 3: Write `package.json`**

```json
{
  "name": "aiden-sre-v3-queue-v8",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "npx --yes hyperframes@0.8.40 preview",
    "check": "npx --yes hyperframes@0.8.40 check",
    "render": "npx --yes hyperframes@0.8.40 render",
    "snapshot": "npx --yes hyperframes@0.8.40 snapshot"
  }
}
```

- [ ] **Step 4: Write `hyperframes.json`**

```json
{
  "$schema": "https://hyperframes.heygen.com/schema/hyperframes.json",
  "registry": "https://raw.githubusercontent.com/heygen-com/hyperframes/main/registry",
  "paths": {
    "blocks": "compositions",
    "components": "compositions/components",
    "assets": "assets"
  },
  "media": { "autoProxy": true },
  "authoringSkill": "general-video",
  "registryItems": []
}
```

- [ ] **Step 5: Write `meta.json`**

```json
{
  "title": "Aiden SRE V3 Queue V8",
  "aspect": "1920x1080"
}
```

- [ ] **Step 6: Write `BRIEF.md`**

```markdown
---
workflow: general-video
flow: automation
storyboard: no
message: "SRE ticket queue — incomplete tickets to Aiden write-back"
destination: product-page
aspect: 1920x1080
language: en
length: ~45-60s
approach: queue-v8-gated
audio: clueso
---

## Intent

Greenfield gated rebuild for `/product/aiden-for-sre`. HyperFrames = silent
picture plates only. Clueso owns Chris VO + Soft BGM after Gate B pass.

## Gates

- Gate A: SCRIPT.md (expert-pmm-writer) — awaiting
- Gate B: plate-a.mp4 + plate-b.mp4 — blocked on A
- Gate C: new Clueso project — blocked on B
- Gate D: optional skills.md — after full pass

## Assets (copied)

- jira-mock.css, jira-mark.svg, jira-logo-*.png
- stage-v4-tight-1920x1080.mp4
- bgm-soft.mp3

## Bans

Visa/Mitratech · front door · cert laundry · em/en dashes · plate pills · montage cards

## Archive (do not mutate)

videos/aiden-sre-v3-frontdoor/
Clueso V7: https://web.clueso.io/guide/17f6140f-9f97-4a29-b830-62aa552d9354
```

- [ ] **Step 7: Write `VALIDATION.md` stub**

```markdown
# VALIDATION — aiden-sre-v3-queue-v8

| Gate | Status | Evidence | Pass phrase |
|------|--------|----------|-------------|
| A Script | pending | | Gate A pass |
| B Plate | blocked | | Gate B pass |
| C Clueso | blocked | | Gate C pass |
| Export | blocked | | explicit export ask |

## Notes

(append dated notes as gates run)
```

- [ ] **Step 8: Verify scaffold**

```bash
test -f assets/stage-v4-tight-1920x1080.mp4 && test -f assets/bgm-soft.mp3 \
  && test -f assets/jira-mock.css && test -f BRIEF.md && test -f VALIDATION.md \
  && echo OK
```

Expected: `OK`

**Done when:** Greenfield tree + assets + BRIEF/VALIDATION exist; archive untouched.

**Hard stop:** None. Proceed to Task 2.

---

### Task 2: Gate A — Lock spoken script (`expert-pmm-writer`)

**Files:**
- Create: `videos/aiden-sre-v3-queue-v8/SCRIPT.md`
- Modify: `BRIEF.md`, `VALIDATION.md`
- Read: spec §2/§5; `docs/superpowers/specs/2026-09-23-ai-sre-demo-video-use-cases.md` (V3 facts only); optional archive `SCRIPT.md` v6.3 as **reference not paste**

**Interfaces:**
- Consumes: Sybill-safe facts (hundreds/mo · ~4/10 incomplete · chase hours)
- Produces: paste block (~120–150 words, ~45–60s spoken) + 7-row beat table aligned to spec §5

- [ ] **Step 1: Skill-picker Gate A**

```
find_helpful_skills(task="expert PMM writer anti-AI-slop spoken VO script check_ai_signs", category="marketing")
```

Confirm primary = `expert-pmm-writer`. Ignore Clueso if ranked. Load `~/.cursor/skills/expert-pmm-writer/SKILL.md` and follow its pipeline.

- [ ] **Step 2: Context**

Read first existing product-marketing context file if present (`.agents/product-marketing.md` etc.). Else use BRIEF + use-cases spec V3 public facts only.

- [ ] **Step 3: Brief (already locked — do not re-ask user)**

| Need | Value |
|------|-------|
| Artifact | spoken VO paste block for product demo |
| Audience | mixed product-page (SRE + eng leaders) |
| Job | believe Aiden clears incomplete ticket chase; light CTA |
| Proof | hundreds/mo · ~4 in 10 incomplete · chase = engineer hours |
| Constraints | 45–60s · no Visa/Mitratech · no front door · no cert laundry · no em/en dashes · contractions OK · peer tone · light CTA |

- [ ] **Step 4: Draft paste block**

Write 7 spoken beats matching VO intent in spec §5. Prefer uneven spoken rhythm. Mirror archive v6.3 structure only if it still passes bans; **rewrite** if it feels brochure-stiff or uses banned metaphor.

Target shape (replace with real draft in `SCRIPT.md`):

```markdown
# SCRIPT v8.0 — Aiden SRE V3 Queue V8

**Status:** Draft · awaiting Gate A pass  
**Tone:** Peer product-page · light CTA  
**Voice (Gate C):** Chris (ElevenLabs via Clueso) · Soft BGM @12% · no burn-in  
**Rules:** No Visa/Mitratech. No front-door. No cert laundry. No em/en dashes.

## Paste block (spoken only)

\`\`\`
<7 short spoken paragraphs matching beats 1–7>
\`\`\`

**Word count:** <N> · **spoken ~Xs**

## Locked beats

| Beat | ~time | Picture | VO (one line) | Camera | Plate |
|------|-------|---------|---------------|--------|-------|
| 1 | 0–10s | Jira List | … | Soft safe row | A |
| 2 | 10–18s | Jira List | … | Soft hold | A |
| 3 | 18–26s | Jira Issue empty | … | Soft empty field | A |
| 4 | 26–36s | Stage | … | Wide / mild | stage |
| 5 | 36–44s | Jira Done write-back | … | Soft description | B |
| 6 | 44–50s | Jira filtered Aiden DONE | … | Soft insight→rows | B |
| 7 | 50–55s | End card | … | Wide hold | B |
```

- [ ] **Step 5: Detect AI signs → rewrite until clean**

Follow `expert-pmm-writer` references/anti-slop.md. Zero em/en dashes from first draft.

- [ ] **Step 6: Mechanical check**

```bash
python3 ~/.cursor/skills/expert-pmm-writer/scripts/check_ai_signs.py \
  videos/aiden-sre-v3-queue-v8/SCRIPT.md
echo EXIT:$?
```

Expected: exit code `0`. If non-zero, rewrite and re-run until 0.

- [ ] **Step 7: Read-aloud timing check**

Read paste block aloud (or word-count estimate: ~130–150 words ≈ 50–60s). Adjust if outside 45–60s.

- [ ] **Step 8: Update VALIDATION + BRIEF**

Set Gate A row to `awaiting user pass` with path to SCRIPT.md. Update BRIEF gates section.

- [ ] **Step 9: HARD STOP — wait for user**

Present paste block + word count + check exit 0. Ask for **“Gate A pass”** or edits.

**Do not start Task 3 until user says `Gate A pass`.**

**Done when:** `SCRIPT.md` locked; `check_ai_signs.py` exit 0; user said Gate A pass.

---

### Task 3: Gate B scaffold — plate compositions (no render yet)

**Files:**
- Create: `compositions/plate-a.html`, `compositions/plate-b.html`
- Copy reference patterns from archive `index.html` (focusPoseSafe, Jira DOM) — strip `#caption` / pills entirely
- Modify: `VALIDATION.md`

**Interfaces:**
- Consumes: Gate A locked beat timings (adjust plate A duration ≈ sum beats 1–3; plate B ≈ 5–7)
- Produces: two HyperFrames compositions that `check` clean enough to snapshot

- [ ] **Step 1: Skill-picker Gate B**

```
find_helpful_skills(task="HyperFrames plate keyframes GSAP focus zoom CLI check snapshot render", category="video-media")
```

Load in order: `hyperframes` → `hyperframes-core` → `hyperframes-keyframes` → `hyperframes-cli`. Add `hyperframes-animation` if needed. Do **not** load Clueso.

- [ ] **Step 2: Ensure Node ≥22**

```bash
export PATH="/opt/homebrew/opt/node@22/bin:$PATH"
node -v
```

Expected: `v22.x` or higher.

- [ ] **Step 3: Seed plate-a from archive HTML**

Copy useful pieces from `videos/aiden-sre-v3-frontdoor/index.html`:
- Jira List / Issue / Done DOM + `jira-mock.css` link
- `#world` transform camera
- `focusPoseSafe` with `PAD = 72` (keep exact math)

Remove:
- All `#caption` / lower-third / narration pill nodes and CSS
- Montage / floating card scenes if present
- Any audio tags
- Stage video (stage is Clueso-only)

Plate A timeline (silent, relative 0):
- 0–10s list + soft zoom focus row
- 10–18s row hold / nudge
- 18–26s issue empty description zoom
- End ~26s

Set `data-composition-id="plate-a"` and duration attributes per hyperframes-core.

- [ ] **Step 4: Seed plate-b**

Plate B timeline (silent, relative 0):
- 0–8s Done ticket write-back zoom (~spec 36–44)
- 8–14s filtered Assignee:Aiden DONE list (~44–50)
- 14–19s end card / wide hold (~50–55)
- End ~19s

`data-composition-id="plate-b"`. Same safe zoom helper. No captions.

- [ ] **Step 5: Keep safe zoom helper verbatim pattern**

```javascript
const PAD = 72;
function focusPoseSafe(m, desiredS) {
  const maxByW = (W - 2 * PAD) / Math.max(m.w, 1);
  const maxByH = (H - 2 * PAD) / Math.max(m.h, 1);
  const s = Math.min(desiredS, maxByW, maxByH);
  // Tx = W/2 - tx*s; Ty = H/2 - ty*s; then clamp so edges stay ≥ PAD
  // (copy full clamp from archive index.html — do not invent weaker math)
  return { x, y, s };
}
```

Desired scales stay in ~1.22–1.38 range; never force a scale that fails the pad fit.

- [ ] **Step 6: Run check**

```bash
cd videos/aiden-sre-v3-queue-v8
# copy active comp to index.html if CLI requires root index, or use -c if supported
cp compositions/plate-a.html index.html
npx --yes hyperframes@0.8.40 check
```

Expected: no layout/crop failures that hide titles. Jira contrast warnings may be non-blocking (note in VALIDATION.md).

**Done when:** Both compositions exist; captions gone; check reviewed; ready to snapshot.

---

### Task 4: Gate B — Snapshots + render plate A and plate B

**Files:**
- Create: `renders/plate-a.mp4`, `renders/plate-b.mp4`
- Create: `snapshots/plate-a-*.png`, `snapshots/plate-b-*.png`
- Modify: `VALIDATION.md`, `BRIEF.md`

**Interfaces:**
- Consumes: compositions from Task 3; beat peaks from SCRIPT.md (defaults: A @5/14/22; B @4/10/16)
- Produces: silent MP4s for Clueso

- [ ] **Step 1: Snapshot plate A peaks**

```bash
export PATH="/opt/homebrew/opt/node@22/bin:$PATH"
cd videos/aiden-sre-v3-queue-v8
cp compositions/plate-a.html index.html
npx --yes hyperframes@0.8.40 snapshot --at 5,14,22 -o snapshots/
```

- [ ] **Step 2: Visually verify plate A PNGs**

Open each PNG. Fail if:
- Left-aligned titles cropped (esp. “Jenkins”-style)
- Caption/pill UI visible
- Not full-bleed Jira UI

- [ ] **Step 3: Render plate A**

```bash
npx --yes hyperframes@0.8.40 render --quality looks \
  -o renders/plate-a.mp4
ffprobe -v error -show_entries format=duration -of default=nw=1:nk=1 renders/plate-a.mp4
ffprobe -v error -select_streams a -show_entries stream=codec_type -of csv=p=0 renders/plate-a.mp4
```

Expected: duration ≈ 26s ±1s; **no audio stream** (or empty).

- [ ] **Step 4: Snapshot plate B peaks**

```bash
cp compositions/plate-b.html index.html
npx --yes hyperframes@0.8.40 snapshot --at 4,10,16 -o snapshots/
```

Verify: write-back text readable; filtered list still Jira (not montage cards); end card OK.

- [ ] **Step 5: Render plate B**

```bash
npx --yes hyperframes@0.8.40 render --quality looks \
  -o renders/plate-b.mp4
ffprobe -v error -show_entries format=duration -of default=nw=1:nk=1 renders/plate-b.mp4
```

Expected: duration ≈ 19s ±1s; silent.

- [ ] **Step 6: Record evidence + HARD STOP**

Update VALIDATION.md with ffprobe numbers + snapshot paths. Present plates + PNGs to user. Ask for **“Gate B pass”** or edits.

**Do not start Task 5 until user says `Gate B pass`.**

**Done when:** Both plates rendered silent; snapshots pass crop check; user said Gate B pass.

---

### Task 5: Gate C — New Clueso project (VO + Soft BGM)

**Files:**
- Modify: `VALIDATION.md`, `SCRIPT.md` (add Clueso URL)
- Upload/use: `renders/plate-a.mp4`, `assets/stage-v4-tight-1920x1080.mp4`, `renders/plate-b.mp4`, `assets/bgm-soft.mp3`
- Clueso project: **new** (never reopen V7 as live)

**Interfaces:**
- Consumes: Gate A paste block; Gate B plates
- Produces: Clueso preview URL (no export)

- [ ] **Step 1: Skill-picker Gate C**

```
find_helpful_skills(task="Clueso polish screen demo Chris ElevenLabs Soft BGM dissolves no crop no captions", category="video-media")
```

Load `clueso-skills` → `polish-screen-demo`. Optionally `elevenlabs-skills` → `text-to-speech` only if voice picker needs it. **Constrain skill defaults:** skip crop zooms; skip burn-in captions.

- [ ] **Step 2: Create new Clueso project**

Via Clueso MCP (`create_project` or equivalent in polish-screen-demo). Title e.g. `Aiden SRE V3 Queue V8`. Record project id + URL in VALIDATION.md.

- [ ] **Step 3: Build timeline**

1. Import `plate-a.mp4`
2. Import `stage-v4-tight-1920x1080.mp4` (trim to ~10s speech window for beat 4)
3. Import `plate-b.mp4`
4. Dissolve transitions only (~0.25–0.5s)
5. Paste Gate A paste block → generate **Chris** VO inside Clueso
6. Add `bgm-soft.mp3` @ **~12%**, fade in/out; full timeline under VO
7. **Do not** add Clueso crop zooms
8. **Do not** enable burn-in captions / caption pills

- [ ] **Step 4: Preview checklist**

| Check | Pass? |
|-------|-------|
| VO matches SCRIPT.md paste | |
| Chris voice (not Jeff / generic flat) | |
| Soft bed audible but not fighting VO | |
| No crop zoom on plate or stage | |
| No on-screen captions | |
| Total ~45–60s | |
| No Visa/Mitratech / front door heard | |

- [ ] **Step 5: HARD STOP**

Share preview URL. Ask for **“Gate C pass”** or edits.

**Do not export. Do not start Task 6 until Gate C pass.**

**Done when:** Preview URL recorded; checklist green; user said Gate C pass.

---

### Task 6: Export (only on explicit ask)

**Files:**
- Modify: `VALIDATION.md`, `renders/` if downloading master

- [ ] **Step 1: Confirm separate export ask**

If user has not said something like “export” / “download the MP4”, **stop**. Gate C pass alone is not enough.

- [ ] **Step 2: Export via Clueso**

Follow polish-screen-demo export path. Save master under `videos/aiden-sre-v3-queue-v8/renders/` with a clear name e.g. `sre-v8-preview.mp4`.

- [ ] **Step 3: ffprobe + note**

```bash
ffprobe -v error -show_entries format=duration -show_streams \
  renders/sre-v8-preview.mp4
```

Expected: has video + audio; duration ~45–60s.

**Done when:** Master on disk; VALIDATION.md export row filled.

---

### Task 7: Gate D — Optional skills.md (after full A→C pass)

**Files:**
- Create: e.g. `videos/aiden-sre-v3-queue-v8/skills.md` and/or a global skill under `~/.cursor/skills/` only if user wants install

- [ ] **Step 1: Skill-picker Gate D**

Load `anthropic-skills` → `skill-creator` or `~/.cursor/skills-cursor/create-skill`, plus `agent-workflow-designer` for handoff contracts.

- [ ] **Step 2: Encode pipeline**

Document Gates A→C with pass phrases, asset copy list, constrain list (no crop, no burn-in), skill-picker routing rule.

- [ ] **Step 3: User confirm before publishing skill**

Do not install a global skill without explicit ask.

**Done when:** Workflow documented; optional skill only if requested.

---

### Task 8: Spec + guide hygiene

**Files:**
- Modify: `docs/superpowers/specs/2026-09-25-aiden-sre-v3-queue-v8-gated-pipeline-design.md` status line → `Approved · implementing`
- Modify: `openmemory.md` Patterns row if deliverables change
- OpenMemory: add project fact with plate paths + Clueso URL when Gate C done

- [ ] **Step 1: Flip spec status** after plan starts executing
- [ ] **Step 2: Append VALIDATION final summary** when Gate C passes
- [ ] **Step 3: Store memory** (no secrets) with final URLs/paths

**Done when:** Spec/guide/memory match shipped state.

---

## Execution order & stops

```
Task 1 scaffold
Task 2 Gate A  ── STOP until "Gate A pass"
Task 3 plate HTML
Task 4 render  ── STOP until "Gate B pass"
Task 5 Clueso  ── STOP until "Gate C pass"
Task 6 export  ── STOP until explicit export ask
Task 7 Gate D  ── optional
Task 8 hygiene
```

## Plan self-review

| Spec requirement | Task |
|------------------|------|
| Greenfield folder + archive copy-only | 1 |
| Skill-picker per gate + locked stack | 2/3/5/7 |
| Gate A expert-pmm-writer + check_ai_signs | 2 |
| Beat map + plate A/stage/plate B cut | 3–5 |
| Safe focus-zoom PAD=72, no caption pills | 3–4 |
| Silent plates | 4 |
| Clueso Chris + Soft@12% + dissolves; no crop/burn-in | 5 |
| No export without ask | 6 |
| Optional skills.md | 7 |
| Bans (Visa, front door, dashes, montage) | Global + 2/5 |
| Out of scope (V1, site embed, Ouroboros) | omitted from tasks |

No TBD/placeholder steps. Types/paths consistent (`plate-a`/`plate-b`, Chris via Clueso, `bgm-soft.mp3`).
