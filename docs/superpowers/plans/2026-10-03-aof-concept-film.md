# AOF Concept Film — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the 12-frame Autonomous Operations Factory concept film in `docs/superpowers/specs/2026-10-03-aof-concept-film-design.md`. It ships in English for the homepage and in Spanish for DevOpsDays Bogotá. Mastered at 3840×2160, 30 fps.

**Architecture:**
- One HyperFrames project, `videos/aof-concept-film/`, with one shared three.js stage module that every frame drives from its own GSAP timeline.
- Product panels are 2× Figma PNG exports.
- Sound is locked before motion. ElevenLabs makes the takes and the score, and `data/timing.json` is the single timing lock for both languages.
- Three or four macro inserts follow a one-way chain: three.js still → Gemini → Veo → Topaz.
- Spanish is a second render of the same compositions, selected by a `lang` parameter.

**Tech Stack:**
- HyperFrames 0.8.103 on Node 22, with GSAP and three.js inside compositions.
- Python 3 (pytest, librosa via the beat analyzer), ffmpeg/ffprobe, whisper via `hyperframes transcribe`.
- MCPs, spend and write (orchestrator only): Figma, Chrome DevTools, ElevenLabs (`user-elevenlabs`), Gemini (`user-genmedia-gemini`), Veo (`user-genmedia-veo`), Apiframe (`user-apiframe`).
- MCPs, context (read-only, used wherever a task reads existing code): Sourcegraph (`user-sourcegraph`), Torbit (`user-torbit`). Rules are in Context tools below.

## Global Constraints

**Authority**
- The spec is the authority. Section numbers below (§) refer to it.

**Commands and files**
- Every HyperFrames command runs as `PATH=/opt/homebrew/opt/node@22/bin:$PATH npx --yes hyperframes@0.8.103 …`. Version 0.8.103 refuses Node 20.
- `videos/aiden-sre-launch/` is read-only. Copy from it and never edit it.

**Picture**
- No generated UI, type, logos, or people (§2.1). Generators make material texture and light only.
- Product pixels come only from `source/figma/*.png`, shown whole on a glass slab. Never rebuild a screen in HTML (§2.2).
- Tokens are frozen to §6.1: ink `#14110C`, cream `#FAF7F2`, lavender `#BA99FD`, pink `#F9B0F1`, cyan `#9EE6FC`, hairline `#3F3B39`, grey ceramic `#8C8580`. Peach is read in Task 4.
- Type is Geist only, following §6.2.
- Master is 3840×2160, 30 fps.

**Determinism**
- Compositions are deterministic: no `Date.now()`, no `Math.random()`, no unseeded noise, no network fetches. Physics is precomputed (§11.2).

**Narration**
- Narration is never time-stretched, sped up, or head-trimmed after transcription (§2.5).
- Word timings always come from transcribing the exact shipped file.
- Words are locked to `source/lines.{en,es}.json` once gate S passes.
- Markup may add only punctuation, capitals, and the respellings in §8.1.

**Spend**
- Spend and write MCP calls run **only in the orchestrator session**: Figma writes, Chrome DevTools, ElevenLabs, Gemini, Veo, Apiframe.
- Context MCPs are read-only except Torbit `index`, which refreshes the local graph and always runs first. Workers may call Sourcegraph search/read tools and Torbit `index`, `get_graph_schema`, and `run_sql`. Workers never `git push` and never call a spend or write MCP.
- Whoever is about to call Torbit runs `index` first, in that same session, immediately before `run_sql`. A previous index does not count. The orchestrator owns the origin push.
- Never call a generator twice to retry. Poll its status tool.
- Estimate any batch before it runs.
- Ask the user before any ElevenLabs batch over 2,000 credits, or any Gemini, Veo, or Apiframe batch with an unknown or higher-than-quoted cost.

**Gates**
- Gates S, A, B, C1, C2, C3, D, E, F, G are hard stops (§12). Nothing that depends on a gate starts before the user says its pass phrase.

**Workers and git**
- Workers never `git commit` and never `git push`. The orchestrator commits each accepted task with explicit paths, then pushes `film/aiden-sre-launch` to origin before the next task that uses Sourcegraph on those paths. Never force-push. Record the pushed SHA in `NOTES.md`.
- Workers may not edit files outside their task's **Files** list.
- At most 8 subagents at once.

---

## Model routing

Each model gets the work it is strongest at. The Task tool slug is fixed per row.

| Model | Slug | Strength used here | Owns |
|---|---|---|---|
| Opus 5.5 | `claude-opus-5-5-high` | Judgment, taste, language, long-context review. Holds every MCP. | Orchestrator session. Spanish translation. Figma screens (MCP writes need the orchestrator). Gold-frame review. Final audit. |
| Grok 4.7 | `grok-4.7-high-fast` | Fast, high-volume creative code: three.js, GSAP choreography, many frames in parallel | three.js stage module, style frames, insert reference renders, all 12 frame compositions, frame fixes |
| Composer 2.5 | `composer-2.5-fast` | Fast, exact mechanical engineering with tests | Scaffold, data contract, Python tools (TDD), Figma export, transcription and splits, timing lock, docs and packets, assembly, mix, subtitles, renders, delivery |
| Sonnet 5.5 | `claude-sonnet-5-5-high` | Careful checklist review | Per-task review of every worker task |

The orchestrator (Opus 5.5) never writes Python tools or frame compositions. It runs MCP steps, gates, reviews, and commits.

## Context tools

Two read-only maps of this repo. They see different clocks. Using the wrong one returns an empty result that is not evidence the code is missing.

| | Sourcegraph `user-sourcegraph` | Torbit `user-torbit` |
|---|---|---|
| Sees | The GitHub remote `github.com/swami086/Stackgen_Website_Redesign` only. Unpushed and uncommitted files are invisible. | The local working tree at `/Users/swami/Documents/Stackgen_Website_Redesign`, after an index. DuckDB at `~/.orbit/graph.duckdb`. |
| Default revision | HEAD of the default branch. This film is on `film/aiden-sre-launch`. A query without that revision reads `main` and misses the film. | The filesystem path you indexed. The manifest stamps `commit_sha` of HEAD at index time. |
| Use for | Exact symbols, "how does the committed SRE film do X", commit history, reading a file that is already on origin. | Locating a node inside HyperFrames HTML and the stage module, then editing or fixing only that line range. Also symbols and imports in files that are local, dirty, or not pushed yet. |

**Repo constants.** `repo:^github\.com/swami086/Stackgen_Website_Redesign$` and `rev:film/aiden-sre-launch` on every Sourcegraph query. `read_file` and `list_files` take `revision: "film/aiden-sre-launch"`. `commit_search` takes `repos: ["github.com/swami086/Stackgen_Website_Redesign"]` and `revisions: ["film/aiden-sre-launch"]`. Do not index any other GitHub repo.

**Sourcegraph tools.** `nls_search` when the symbol name is unknown (2–5 keywords, no boolean words). `keyword_search` when the name is known. `read_file` only after a search or `list_files` has confirmed the path. `commit_search` / `diff_search` for who changed a line and when. `list_repos` only to confirm the repo name.

**Torbit tools.** `get_graph_schema` once per session before the first SQL if the tables are not already known. `run_sql` is read-only, one statement per array element, always `LIMIT`. Tables: `_orbit_manifest`, `gl_file`, `gl_definition` (`fqn`, `name`, `file_path`, `start_line`, `end_line`), `gl_edge`, `gl_imported_symbol`, `gl_directory`. Scope every query with `project_id` from the manifest row whose `repo_path` is this repo, so worktree indexes are not mixed in.

**Index before every Torbit call.** No query runs on a previous index. `index` with `path: "/Users/swami/Documents/Stackgen_Website_Redesign"` is the first call of every Torbit use, including a second query after an edit. Do not skip it because `_orbit_manifest.commit_sha` matches HEAD. That sha does not include HTML written after the index.

1. `index` the repo path.
2. Then `get_graph_schema` if this session has not read the tables yet, then `run_sql`.
3. Edit from the returned `file_path` plus `start_line` / `end_line`.
4. Any later Torbit query, including a check that the edit landed, starts again at step 1.

**HyperFrames HTML.** This is why Torbit is on this plan. Frame compositions, `index.html`, and `compositions/subtitles.html` are long. Before changing one, index, then query `gl_definition` or `gl_file` for that path and use only the returned line range. Fix that range. Do not scan the file to find a node the graph already locates. After the fix, index again before querying to confirm the new text. Tasks: T8, T9, T18, T21, T22, T23, T24, T26.

**Push before Sourcegraph.** After each orchestrator commit, `git push -u origin HEAD` (no force) before a later task searches those paths. If the push fails, the task uses Torbit or a local Read, and `NOTES.md` records that Sourcegraph is behind. An empty Sourcegraph result is handled in this order: the query included `rev:film/aiden-sre-launch`; `git rev-parse HEAD` equals `git rev-parse origin/film/aiden-sre-launch`; if not, push once and retry the query once; if still empty, the file is local-only, so Torbit or Read. Never conclude the symbol does not exist from an empty Sourcegraph result alone.

**Who calls what.**

- Orchestrator: push, and a prefetch for the task's Context line. Its own Torbit prefetch also starts with `index`. Paste the file paths and line ranges into the worker prompt.
- Worker: calls `index` immediately before its own `run_sql`, and again after an HTML edit before the next query. May call Sourcegraph read tools. Does not `git push`. Does not call a spend or write MCP.
- Skip both tools when the task's inputs are the spec, a JSON file in this plan, or a generator API. Local Read of a named path is enough.

**Per-task map.** Prefetch only the row for the task about to run.

| Tasks | First lookup | Why |
|---|---|---|
| T1 | Local copy from `videos/aiden-sre-launch/`. Sourcegraph `list_files` on that path only to confirm a committed file exists before copying. | Scaffold. T1 may already be on disk from a prior session; do not recopy. |
| T2, T3, T4, T11, T12, T15, T17, T19, T27 | Neither. | Spec, Chrome, Figma writes, or generator APIs. |
| T5, T6 | Sourcegraph `list_files` `videos/aiden-sre-launch/source/figma` at `film/aiden-sre-launch`, else local `ls`. | Which SRE plates exist to re-skin. |
| T7 | Sourcegraph `keyword_search` `repo:^github\.com/swami086/Stackgen_Website_Redesign$ rev:film/aiden-sre-launch file:videos/aiden-sre-launch hyperframes figma`. | The export command the SRE film already ran. |
| T8 | `index`, then Torbit on the stage files about to change. Sourcegraph `nls_search` `repo:^github\.com/swami086/Stackgen_Website_Redesign$ rev:film/aiden-sre-launch file:videos/aiden-sre-launch/compositions gsap timeline paused`, then `read_file` on the frame it names. | Seek-safe GSAP pattern is committed. The new stage HTML/JS is local, so Torbit locates the lines to edit. |
| T9, T18 | `index`, then Torbit `gl_definition` where `file_path` like `%aof-concept-film/shared/stage%` or the style-frame HTML. Edit that line range. `index` again before a follow-up query. | HyperFrames HTML and stage. A stale index misses the last edit. |
| T10, T13, T14, T16 | `index`, then Torbit `gl_definition` for the function being patched (`words`, `norm`, `segments`). Sourcegraph `keyword_search` the same name under `file:videos/aiden-sre-launch/scripts` on `rev:film/aiden-sre-launch` when comparing to the read-only original. | Edits are local; the original is on the film branch once pushed. |
| T20 | Sourcegraph `keyword_search` `file:videos/aiden-sre-launch/STORYBOARD.md` on `rev:film/aiden-sre-launch`. | Packet shape already used on the SRE film. |
| T21, T22 | Sourcegraph `read_file` `videos/aiden-sre-launch/compositions/frames/10-investigation.html` revision `film/aiden-sre-launch`. Then `index` and Torbit the frame HTML plus `shared/stage` for the node being changed. Edit that line range. `index` again before confirming. | F10 picture lock is committed. The frame being written is local HTML; Torbit is how the edit stays precise. |
| T23 | Sourcegraph `read_file` `videos/aiden-sre-launch/index.html` revision `film/aiden-sre-launch` for the committed carve markup. `index`, then Torbit this film's `index.html` for the audio nodes being edited. | Remote file is the pattern. Local `index.html` is the file under edit. |
| T24, T26 | `index`, then Torbit the composition HTML named by the task (subtitles, or the frame in the audit row). Fix only that line range. `index` again before the next query. | These passes change HTML. Torbit names the lines. |
| T25 | Local Read of render scripts. `index` first if a step calls Torbit. | QA and finish. No HTML navigation unless a step says so. |

## Lanes and dispatch

```
Wave 0   T1 scaffold (Composer) → T2 data contract (Composer) → T3 script lock, Spanish (Opus + orchestrator) ─ Gate S
              │
Wave 1   ├─ Lane 1 Figma:  T4 live tokens (orch) → T5 SRE re-skins (orch) → T6 new screens (orch) ─ Gate A → T7 exports (Composer)
         ├─ Lane 2 Stage:  T8 stage module (Grok) → T9 style frames (Grok) ─ Gate B
         └─ Lane 3 Sound:  T10 markup + Spanish-safe text (Composer) → T11 Spanish casting (orch) ─ C1
                           → T12 takes EN+ES (orch) ─ C2 → T13 transcribe + split (Composer)
                           → T14 voice timing + spotting (Composer) → T15 score (orch) ─ C3
                           → T16 timing lock (Composer) → T17 SFX (orch)
Wave 2   Lane 4 Inserts (after T16 + Gate B): T18 reference stills (Grok) → T19 Gemini → Veo → Topaz (orch) ─ Gate D
         T20 storyboard, packets (Composer)        (after T7 + T16)
Wave 3   T21 F6 gold frame (Grok) ─ Gate E (Opus review)
         T22 frame workers F1–F5, F7–F12 (Grok, ≤ 8 at once, 2 batches)
Wave 4   T23 assemble + lang switch + mix (Composer) → T24 subtitles (Composer) ─ Gate F
         T25 render, finish, cut-downs, QA (Composer) → T26 audit + fix loop (Opus audit, Grok fixes) → T27 deliver ─ Gate G
```

**Parallel-start rules**
- Lanes 1, 2, and 3 start together right after Gate S.
- Within Lane 3, Task 10 runs while Lane 1 and Lane 2 work.
- The orchestrator interleaves MCP work in Lanes 1 and 3, because MCP work is single-threaded in that session. Lane 2 and every Composer task run as background subagents.

## Prompt templates

**Build worker (Composer 2.5).** `subagent_type: generalPurpose`, `model: composer-2.5-fast`.

```text
You are implementing Task <N> of docs/superpowers/plans/2026-10-03-aof-concept-film.md
in /Users/swami/Documents/Stackgen_Website_Redesign. Read Global Constraints and Task <N> in full,
then the spec sections it cites (docs/superpowers/specs/2026-10-03-aof-concept-film-design.md).
Read the skills listed for Task <N>: router SKILL.md first, then only the named member.
Follow the steps in order. Write the failing test before the code where the task says so.
Do not edit files outside the task's Files list. Do not git commit. Do not git push.
Do not call Figma, Chrome DevTools, ElevenLabs, Gemini, Veo, or Apiframe.
If the task has a Context line, use that lookup. You may call Sourcegraph keyword_search, nls_search,
read_file, list_files, commit_search, diff_search and Torbit index, get_graph_schema, run_sql.
Before every Torbit run_sql, call index on /Users/swami/Documents/Stackgen_Website_Redesign.
Index again after an HTML edit before the next Torbit query. Use the returned start_line and end_line.
Every Sourcegraph query includes repo:^github\.com/swami086/Stackgen_Website_Redesign$ and rev:film/aiden-sre-launch
(or revision "film/aiden-sre-launch"). An empty result is not proof the file is missing: say so and use a local Read.
Run every verification command and paste its real output. Report: files changed, commands run
with output, anything you could not do and why.
```

**Creative code worker (Grok 4.7).** `subagent_type: generalPurpose`, `model: grok-4.7-high-fast`. Same header, plus:

```text
You write HyperFrames compositions and three.js. Read first, in order: spec §6 and the §7 table for
your frame, frame.md, shared/stage/README.md, and (for every frame except F6) the F6 gold lock in this
plan plus compositions/frames/06-sre.html. Use only shared/stage/ for 3D, never your own copy.
Product pixels are source/figma/<screen>.png on a glass slab, shown whole. Every cue lands at its
anchor word ±0.12 s using data/timing.json. Register one paused GSAP timeline under the frame id and
as window.__timelines.main. No Date.now, no Math.random, no fetch. Render, run qa_motion, open stills
at 25/50/75% and at every cue, check spec §6.9 yourself, then report with the output pasted.
Context: follow this task's Context line. Before every Torbit query, index /Users/swami/Documents/Stackgen_Website_Redesign. For HyperFrames HTML, query gl_definition or gl_file for the composition you are changing and edit only the returned line range. Index again after the edit before you query to confirm it. Do not push. Do not call a spend MCP. An empty Sourcegraph result means try Torbit or a local Read, not that the symbol is absent.
```

**Reviewer (Sonnet 5.5; Opus 5.5 for Tasks 21 and 26).** `subagent_type: generalPurpose`.

```text
Review Task <N> against the plan task and the spec sections it cites. Stage 1, spec compliance: list
every requirement with PASS/FAIL and evidence (file:line, or command output you ran yourself).
Stage 2, quality: Critical / Important / Minor. For frames, also open stills at 25/50/75% and at every
cue and check spec §6.9 (signs of AI), §6.2 type, §6.6 panel rest pose, and the F6 gold lock. Do not
fix; report.
For tasks with a Context line, confirm the worker used the named lookup or recorded why it was empty. Do not call spend MCPs.
```

## File structure

All paths below are under `videos/aof-concept-film/`.

| Path | Responsibility | Owner task |
|---|---|---|
| `package.json`, `hyperframes.json`, `meta.json`, `AGENTS.md`, `CLAUDE.md` | HyperFrames project shell (copied) | T1 |
| `BRIEF.md` | Routing brief for `product-launch-video` | T1 |
| `source/frames.json` | 12 frames: id, slug, line, take, John length, screens, inserts, SFX | T2 |
| `source/lines.en.json`, `source/lines.es.json` | Locked voiceover lines L01–L12 | T2, T3 |
| `source/strings.en.json`, `source/strings.es.json` | Every on-screen film string, keyed | T2, T3 |
| `source/live/tokens.json` | Live app tokens and timings read by DevTools | T4 |
| `source/figma/<screen>.png` | 2× exports, 3840×1772 | T7 |
| `data/takes.json` | Takes per language with markup and generation ids | T10, T12 |
| `data/timing.voice.json` | Per-line voice durations, both languages | T14 |
| `data/spotting.json` | Hit list for the score prompt | T14 |
| `data/timing.json` | **The lock.** One picture timeline plus EN/ES voice starts and cues | T16 |
| `data/inserts.json` | Insert ids, frame, source stills, outputs, cost | T18, T19 |
| `shared/stage/` | three.js stage module (`stage.js`, `pieces.js`, `materials.js`, `rig.js`, `README.md`) | T8 |
| `shared/film.css` | Film tokens and type classes (§6.1–6.2) | T8 |
| `shared/fonts/` | Geist, IBM Plex Sans (copied) | T1 |
| `compositions/frames/<NN>-<slug>.html` | One composition per frame | T21, T22 |
| `compositions/subtitles.html` | Burned-in subtitle layer | T24 |
| `index.html` | Master timeline, `lang` switch, audio | T23 |
| `assets/style/B{1..4}.png` | Gate B style frames | T9 |
| `assets/audio/vo/{en,es}/` | Takes, line cuts, word timings | T12, T13 |
| `assets/audio/music/`, `assets/audio/sfx/` | Score and effects | T15, T17 |
| `assets/inserts/<id>/` | Reference stills, Gemini stills, Veo clip, final 4K clip | T18, T19 |
| `scripts/` | Python tools (copied plus new `lock_timing.py`, `build_vtt.py`, `es_budget.py`) | T1, T10, T14, T16, T24 |
| `tests/` | pytest | same |
| `renders/` | Frame renders, masters, delivery files | T21–T27 |
| `NOTES.md` | Generation ids, costs, gate outcomes | every orchestrator task |

---

## Wave 0

### Task 1: Scaffold the project (Composer 2.5)

**Files:**
- Create: `videos/aof-concept-film/{package.json,hyperframes.json,meta.json,AGENTS.md,CLAUDE.md,BRIEF.md,NOTES.md}`
- Create: `videos/aof-concept-film/shared/fonts/` (copy)
- Create: `videos/aof-concept-film/scripts/{check_markup.py,split_takes.py,qa_motion.py,qa_loudness.py,el_fetch.py}` (copy)
- Create: `videos/aof-concept-film/tests/{conftest.py,test_check_markup.py,test_split_takes.py,test_qa.py}` (copy)

**Context:** Copy from local videos/aiden-sre-launch/. Sourcegraph list_files on that path only to confirm a committed file exists. Do not recopy if videos/aof-concept-film/ already has package.json.

**Interfaces:**
- Consumes: nothing.
- Produces: a project that lints clean, plus the copied Python tools and tests passing unchanged.

**Skills:** `hyperframes-skills` → `hyperframes`, `product-launch-video` (Steps 0–2 only), `hyperframes-cli`.

- [ ] **Step 1: Copy the shell, fonts, tools, and tests**

```bash
cd /Users/swami/Documents/Stackgen_Website_Redesign/videos
mkdir -p aof-concept-film/{source/figma,source/live,data,shared/stage,compositions/frames,assets/style,assets/audio/vo/en,assets/audio/vo/es,assets/audio/music,assets/audio/sfx,assets/inserts,scripts,tests,renders/frames}
cp aiden-sre-launch/{hyperframes.json,AGENTS.md,CLAUDE.md} aof-concept-film/
cp -R aiden-sre-launch/shared/fonts aof-concept-film/shared/
cp aiden-sre-launch/scripts/{check_markup.py,split_takes.py,qa_motion.py,qa_loudness.py,el_fetch.py} aof-concept-film/scripts/
cp aiden-sre-launch/tests/{conftest.py,test_check_markup.py,test_split_takes.py,test_qa.py} aof-concept-film/tests/
ls aof-concept-film/shared/fonts
```

Expected: Geist and IBM Plex Sans font files are listed. If Geist is missing, stop and report; do not substitute another font.

- [ ] **Step 2: Write `package.json`**

```json
{
  "name": "aof-concept-film",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "npx --yes hyperframes@0.8.103 preview",
    "check": "npx --yes hyperframes@0.8.103 check",
    "render": "npx --yes hyperframes@0.8.103 render",
    "publish": "npx --yes hyperframes@0.8.103 publish"
  }
}
```

- [ ] **Step 3: Write `meta.json`**

```json
{ "id": "aof-concept-film", "name": "AOF Concept Film" }
```

- [ ] **Step 4: Write `BRIEF.md`**

```markdown
# AOF Concept Film

workflow: product-launch-video
flow: automation
storyboard: yes

Message: Your software factory needs an operations factory. StackGen's Aiden agents give you four ways to start.
Audience: platform, DevOps and SRE buyers who land on stackgen.com; DevOpsDays Bogotá main-screen audience.
Destination: 3840×2160 master at 30 fps; 1920×1080 homepage and Bogotá cuts.
Source of truth: docs/superpowers/specs/2026-10-03-aof-concept-film-design.md
VO_MODE: verbatim (source/lines.en.json, source/lines.es.json)
Look: ink stage #14110C, machined jigsaw hero object in three.js, cream Geist type, dark Figma product panels on glass slabs.
Audio: ElevenLabs MCP only (narration eleven_v4, music eleven_music_v2_5, SFX eleven_text_to_sound_v2).
```

- [ ] **Step 5: Write `NOTES.md`**

```markdown
# AOF concept film — project notes

Generation ids, costs, and gate outcomes are appended here by the orchestrator, one section per task.
```

- [ ] **Step 6: Run the copied tests**

```bash
cd /Users/swami/Documents/Stackgen_Website_Redesign/videos/aof-concept-film && python3 -m pytest -q
```

Expected: all copied tests pass. The count must equal the SRE project's count for these four files.

- [ ] **Step 7: Lint the empty project**

```bash
cd /Users/swami/Documents/Stackgen_Website_Redesign/videos/aof-concept-film && PATH=/opt/homebrew/opt/node@22/bin:$PATH npx --yes hyperframes@0.8.103 lint
```

Expected: 0 errors. A warning about a missing `index.html` is acceptable here; T23 creates it.

### Task 2: Data contract (Composer 2.5)

**Files:**
- Create: `source/frames.json`, `source/lines.en.json`, `source/strings.en.json`, `source/cues.json`
- Create: `tests/test_contract.py`

**Interfaces:**
- Consumes: spec §7 and §8.1.
- Produces:
  - `source/frames.json`: a list of `{"frame": int, "id": "F01".."F12", "slug": str, "title": str, "line": "L01".."L12", "take": "T1".."T5", "john": float, "screens": [str], "inserts": [str], "sfx": [str]}`.
  - `source/lines.en.json`: a list of `{"id": "L01", "frame": "F01", "text": str}`.
  - `source/strings.en.json`: a flat object `{"<key>": str}`.
  - `source/cues.json`: `{"F01": [{"key": str, "anchor": str}], …}`. The anchor is the English phrase in that frame's line that a cue lands on (spec §7).

  Every later task reads these names.

**Skills:** superpowers `test-driven-development`.

- [ ] **Step 1: Write the failing contract test**

`tests/test_contract.py`:

```python
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SCREENS = {"6a", "6b", "6c", "7a", "7b", "8a", "8b", "9a", "9b", "10a", "11a"}
INSERTS = {"M0", "M1", "M2", "M3"}


def load(rel):
    return json.loads((ROOT / rel).read_text())


def test_twelve_frames_in_order():
    frames = load("source/frames.json")
    assert [f["id"] for f in frames] == [f"F{i:02d}" for i in range(1, 13)]
    assert [f["frame"] for f in frames] == list(range(1, 13))


def test_john_lengths_sum_to_storyboard():
    total = sum(f["john"] for f in load("source/frames.json"))
    assert abs(total - 138.745) < 0.01


def test_every_frame_has_its_line():
    frames = load("source/frames.json")
    lines = {l["id"]: l for l in load("source/lines.en.json")}
    assert sorted(lines) == [f"L{i:02d}" for i in range(1, 13)]
    for f in frames:
        assert lines[f["line"]]["frame"] == f["id"]


def test_takes_group_lines_by_act():
    groups = {}
    for f in load("source/frames.json"):
        groups.setdefault(f["take"], []).append(f["line"])
    assert groups == {
        "T1": ["L01", "L02", "L03", "L04"],
        "T2": ["L05", "L06"],
        "T3": ["L07", "L08"],
        "T4": ["L09"],
        "T5": ["L10", "L11", "L12"],
    }


def test_screens_and_inserts_are_known():
    for f in load("source/frames.json"):
        assert set(f["screens"]) <= SCREENS
        assert set(f["inserts"]) <= INSERTS
    used = {s for f in load("source/frames.json") for s in f["screens"]}
    assert used == SCREENS


def test_replaced_lines_are_exact():
    lines = {l["id"]: l["text"] for l in load("source/lines.en.json")}
    assert lines["L08"].startswith("Aiden for DevOps takes repeat work off your team. Requests from ServiceNow, Jira and Linear")
    assert lines["L12"] == "Start anywhere and build your operations factory today."


def test_strings_have_no_empty_values():
    strings = load("source/strings.en.json")
    assert strings and all(isinstance(v, str) and v.strip() for v in strings.values())
    assert strings["f12.button"] == "Schedule a demo"


def _toks(s):
    import re
    import unicodedata
    s = unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode().lower()
    return re.sub(r"[^a-z0-9' ]+", " ", s).split()


def _contains(line, phrase):
    a, b = _toks(line), _toks(phrase)
    return any(a[i:i + len(b)] == b for i in range(len(a) - len(b) + 1))


def test_cue_anchors_occur_in_their_english_line():
    lines = {l["frame"]: l["text"] for l in load("source/lines.en.json")}
    cues = load("source/cues.json")
    assert set(cues) <= {f"F{i:02d}" for i in range(1, 13)}
    for fid, rows in cues.items():
        for c in rows:
            assert _contains(lines[fid], c["anchor"]), (fid, c["anchor"])
```

- [ ] **Step 2: Run it to see it fail**

```bash
cd /Users/swami/Documents/Stackgen_Website_Redesign/videos/aof-concept-film && python3 -m pytest tests/test_contract.py -q
```

Expected: FAIL with `FileNotFoundError` for `source/frames.json`.

- [ ] **Step 3: Write `source/frames.json`**

```json
[
{"frame":1,"id":"F01","slug":"software-factory","title":"Software factory alone","line":"L01","take":"T1","john":6.493,"screens":[],"inserts":["M0"],"sfx":["sub-swell","capsule-tick","room-tone"]},
{"frame":2,"id":"F02","slug":"quarters-drift","title":"Four quarters drift","line":"L02","take":"T1","john":9.803,"screens":[],"inserts":[],"sfx":["capsule-tick","footfall-soft","room-tone"]},
{"frame":3,"id":"F03","slug":"quarters-lock","title":"Quarters lock","line":"L03","take":"T1","john":5.666,"screens":[],"inserts":["M1"],"sfx":["seam-seat","sweep-shimmer"]},
{"frame":4,"id":"F04","slug":"click","title":"The two factories click","line":"L04","take":"T1","john":6.493,"screens":[],"inserts":["M2"],"sfx":["heavy-click","impact-low","capsule-tick"]},
{"frame":5,"id":"F05","slug":"four-ways","title":"Four ways to start","line":"L05","take":"T2","john":5.252,"screens":[],"inserts":[],"sfx":["tone-ping"]},
{"frame":6,"id":"F06","slug":"sre","title":"Aiden for SRE","line":"L06","take":"T2","john":21.390,"screens":["6a","6b","6c"],"inserts":[],"sfx":["whoosh-short","row-tick","approve-chime","resolve-chime"]},
{"frame":7,"id":"F07","slug":"infraops","title":"Aiden for InfraOps","line":"L07","take":"T3","john":16.838,"screens":["7a","7b"],"inserts":[],"sfx":["typing-soft","gate-tick","impact-low"]},
{"frame":8,"id":"F08","slug":"devops","title":"Aiden for DevOps","line":"L08","take":"T3","john":18.907,"screens":["8a","8b"],"inserts":[],"sfx":["row-tick","whoosh-short","approve-chime"]},
{"frame":9,"id":"F09","slug":"observability","title":"Aiden for Observability","line":"L09","take":"T4","john":20.562,"screens":["9a","9b"],"inserts":[],"sfx":["row-tick","sub-swell","resolve-chime"]},
{"frame":10,"id":"F10","slug":"world-model","title":"World Model","line":"L10","take":"T5","john":11.045,"screens":["10a"],"inserts":[],"sfx":["plate-thud","whoosh-long","tone-ping"]},
{"frame":11,"id":"F11","slug":"aiden-os","title":"Aiden OS","line":"L11","take":"T5","john":11.872,"screens":["11a"],"inserts":[],"sfx":["plate-thud","gate-tick","approve-chime","typing-soft"]},
{"frame":12,"id":"F12","slug":"close","title":"Close","line":"L12","take":"T5","john":4.424,"screens":[],"inserts":["M3"],"sfx":["logo-sting"]}
]
```

- [ ] **Step 4: Write `source/lines.en.json`** with the twelve lines exactly as spec §8.1.

```json
[
{"id":"L01","frame":"F01","text":"AI turned coding into a software factory. Code is being written faster than ever."},
{"id":"L02","frame":"F02","text":"But operations can't keep pace. Build, operate, observe and remediate still run as separate pieces, on separate tools, held together by people."},
{"id":"L03","frame":"F03","text":"What's missing is an operations factory, where all four work as one."},
{"id":"L04","frame":"F04","text":"Join the two, and the whole software lifecycle runs at the speed AI promised."},
{"id":"L05","frame":"F05","text":"StackGen's Aiden agents give you four ways to start building yours."},
{"id":"L06","frame":"F06","text":"Aiden for SRE is your AI SRE teammate, built to cut toil and MTTR. It learns your environment from the tools you already run, triages every alert, and finds root cause with the evidence behind it. It remediates with your approval, and carries what it learns into the next incident."},
{"id":"L07","frame":"F07","text":"Aiden for InfraOps lets developers request infrastructure from their IDE, a coding agent or ServiceNow. It builds Terraform or OpenTofu from your approved modules, checks it against your policies, and queues it for approval before anything reaches your cloud."},
{"id":"L08","frame":"F08","text":"Aiden for DevOps takes repeat work off your team. Requests from ServiceNow, Jira and Linear land in one operations inbox, where Aiden triages each ticket, matches it to a workflow and shows its reasoning. You choose the autonomy level, and every run keeps a full record."},
{"id":"L09","frame":"F09","text":"Aiden for Observability is fully managed, open-source observability on OpenTelemetry, with Aiden built in. Choose from over three hundred integrations, deploy in minutes, and run it as private SaaS or in your own cloud. When something breaks, ask Aiden, and it shows the likely cause with the evidence."},
{"id":"L10","frame":"F10","text":"All four agents run on unified context: the Aiden World Model. Every agent reads and writes it, so what one learns, the others already know."},
{"id":"L11","frame":"F11","text":"Aiden OS governs all of it. Every action is checked against your policies before it runs. Your team decides what needs approval, and every step is recorded."},
{"id":"L12","frame":"F12","text":"Start anywhere and build your operations factory today."}
]
```

- [ ] **Step 5: Write `source/strings.en.json`.** These are every on-screen film string in spec §7. Product UI text lives in the Figma PNGs, not here.

```json
{
"f01.eyebrow": "SOFTWARE FACTORY",
"f02.label.build": "BUILD",
"f02.label.operate": "OPERATE",
"f02.label.observe": "OBSERVE",
"f02.label.remediate": "REMEDIATE",
"f02.head.1": "Delivery got faster.",
"f02.head.2": "Operations didn't.",
"f03.eyebrow": "OPERATIONS FACTORY",
"f04.head.1": "Your software factory needs",
"f04.head.2": "an operations factory.",
"f05.eyebrow": "START ANYWHERE",
"f06.eyebrow": "REMEDIATE",
"f06.name": "Aiden for SRE",
"f06.claim": "Your AI SRE teammate.",
"f06.rail.1": "DISCOVER",
"f06.rail.2": "TRIAGE",
"f06.rail.3": "ROOT CAUSE",
"f06.rail.4": "REMEDIATE",
"f06.rail.5": "LEARN",
"f07.eyebrow": "BUILD",
"f07.name": "Aiden for InfraOps",
"f07.claim": "Ship infra at AI speed.",
"f08.eyebrow": "OPERATE",
"f08.name": "Aiden for DevOps",
"f08.claim": "Scale impact, not tickets.",
"f09.eyebrow": "OBSERVE",
"f09.name": "Aiden for Observability",
"f09.claim": "Observability without the upkeep.",
"f10.eyebrow": "WORLD MODEL",
"f10.seg.1": "what's deployed",
"f10.seg.2": "what changed",
"f10.seg.3": "what broke",
"f10.seg.4": "what fixed it",
"f10.chip": "rollback fixed checkout",
"f11.eyebrow": "AIDEN OS",
"f11.pill.1": "Policy",
"f11.pill.2": "Approvals",
"f11.pill.3": "Identity",
"f11.pill.4": "Audit",
"f11.pill.5": "Cost controls",
"f11.pill.6": "Integrations",
"f12.eyebrow": "AUTONOMOUS OPERATIONS FACTORY",
"f12.head": "Start anywhere.",
"f12.button": "Schedule a demo"
}
```

- [ ] **Step 6: Write `source/cues.json`.** These are the word-anchored cues from spec §7. Fixed-time cues stay inside the frame compositions.

```json
{
"F01": [{"key": "f01.eyebrow", "anchor": "software factory"}],
"F02": [{"key": "f02.label.build", "anchor": "Build"}, {"key": "f02.label.operate", "anchor": "operate"},
        {"key": "f02.label.observe", "anchor": "observe"}, {"key": "f02.label.remediate", "anchor": "remediate"},
        {"key": "f02.figure", "anchor": "held together by people"}],
"F03": [{"key": "f03.eyebrow", "anchor": "operations factory"}],
"F04": [{"key": "f04.head", "anchor": "Join the two"}],
"F06": [{"key": "f06.6a", "anchor": "triages every alert"}, {"key": "f06.6b", "anchor": "finds root cause"},
        {"key": "f06.6c", "anchor": "remediates with your approval"}, {"key": "f06.rail", "anchor": "carries what it learns"}],
"F07": [{"key": "f07.request", "anchor": "from their IDE"}, {"key": "f07.module", "anchor": "from your approved modules"},
        {"key": "f07.policy", "anchor": "against your policies"}, {"key": "f07.queue", "anchor": "before anything reaches your cloud"}],
"F08": [{"key": "f08.inbox", "anchor": "land in one operations inbox"}, {"key": "f08.triage", "anchor": "triages each ticket"},
        {"key": "f08.autonomy", "anchor": "You choose the autonomy level"}, {"key": "f08.record", "anchor": "every run keeps a full record"}],
"F09": [{"key": "f09.otel", "anchor": "open-source observability on OpenTelemetry"},
        {"key": "f09.integrations", "anchor": "three hundred integrations"},
        {"key": "f09.cloud", "anchor": "in your own cloud"}, {"key": "f09.ask", "anchor": "ask Aiden"}],
"F10": [{"key": "f10.chip", "anchor": "reads and writes it"}],
"F11": [{"key": "f11.gate", "anchor": "checked against your policies"}, {"key": "f11.audit", "anchor": "every step is recorded"}]
}
```

- [ ] **Step 7: Run the contract test**

```bash
cd /Users/swami/Documents/Stackgen_Website_Redesign/videos/aof-concept-film && python3 -m pytest tests/test_contract.py -q
```

Expected: `8 passed`.

### Task 3: Script lock and Spanish (orchestrator + Opus 5.5) → Gate S

**Files:**
- Create: `source/lines.es.json`, `source/strings.es.json`
- Create: `scripts/es_budget.py`, `tests/test_es_budget.py`
- Modify: `tests/test_contract.py` (add the two Spanish tests below)

**Interfaces:**
- Consumes: `source/lines.en.json`, `source/strings.en.json`.
- Produces:
  - `source/lines.es.json`: same ids and `frame` values as English, plus an `anchors` object mapping each English anchor word in §7 to its Spanish counterpart.
  - `source/strings.es.json`: same keys as English.

**Skills:** `expert-pmm-writer` (`scripts/check_ai_signs.py` only), `video-gated-product-demo` (Gate A rules only).

- [ ] **Step 1 (orchestrator): Run the AI-phrasing check on the English lines**

```bash
cd /Users/swami/Documents/Stackgen_Website_Redesign/videos/aof-concept-film
python3 -c "import json;print('\n\n'.join(l['text'] for l in json.load(open('source/lines.en.json'))))" > /tmp/aof-lines-en.txt
python3 ~/.cursor/skills/expert-pmm-writer/scripts/check_ai_signs.py /tmp/aof-lines-en.txt; echo "exit $?"
```

Expected: `exit 0`.

On any non-zero exit, show the user each flagged line with one proposed rewrite and wait. Do not edit `lines.en.json` without the user's choice. If the user changes a line, rerun Task 2 Step 6.

- [ ] **Step 2 (Composer 2.5): Write the Spanish budget check, test first**

`tests/test_es_budget.py`:

```python
from es_budget import ratio, over_budget


def test_ratio_counts_words_not_punctuation():
    assert ratio("Join the two, and go.", "Une las dos y ve.") == 5 / 5


def test_over_budget_flags_long_lines():
    en = [{"id": "L01", "text": "one two three four five"}]
    es = [{"id": "L01", "text": "uno dos tres cuatro cinco seis siete"}]
    assert over_budget(en, es, limit=1.2) == [("L01", 1.4)]
    assert over_budget(en, es, limit=1.5) == []
```

`scripts/es_budget.py`:

```python
#!/usr/bin/env python3
"""Spanish word count vs English per line. Lines over the limit get shortened before Endy's review.
Usage: es_budget.py [--limit 1.2]   (exit 1 if any line is over)"""
import argparse
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def count(s):
    return len(re.findall(r"[\w'’]+", s, flags=re.UNICODE))


def ratio(en, es):
    return count(es) / count(en)


def over_budget(en_lines, es_lines, limit=1.2):
    es = {l["id"]: l["text"] for l in es_lines}
    out = []
    for l in en_lines:
        r = round(ratio(l["text"], es[l["id"]]), 2)
        if r > limit:
            out.append((l["id"], r))
    return out


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--limit", type=float, default=1.2)
    a = ap.parse_args()
    en = json.loads((ROOT / "source/lines.en.json").read_text())
    es = json.loads((ROOT / "source/lines.es.json").read_text())
    for l in en:
        print(l["id"], round(ratio(l["text"], next(x["text"] for x in es if x["id"] == l["id"])), 2))
    bad = over_budget(en, es, a.limit)
    print("budget OK" if not bad else "over budget: " + ", ".join(f"{i} {r}" for i, r in bad))
    sys.exit(1 if bad else 0)
```

Run: `python3 -m pytest tests/test_es_budget.py -q`. Expected: `2 passed`.

- [ ] **Step 3 (Opus 5.5 subagent, `claude-opus-5-5-high`): Translate**

Prompt:

```text
Translate source/lines.en.json and source/strings.en.json in videos/aof-concept-film to natural
Latin American Spanish for platform engineers in Bogotá. Follow spec §8.2 exactly: direct "tu",
the English-kept terms list, Endy's wording (self-service, guardrails, "hace triage", outer loop,
never O11y), quarter words Construir/Operar/Observar/Remediar, button "Agenda una demo". Write it
short from the start: each line should be at most 1.2× the English word count. It must sound like a
person wrote it: no calques, no stacked nouns, no "aprovechar", no "potenciar", no "solución
integral". Write source/lines.es.json with the same ids and frame values plus "anchors": an object mapping
each English anchor in source/cues.json for that frame to the exact Spanish phrase in your line
that the cue should land on (it must appear verbatim in the Spanish line).
Write source/strings.es.json with the same keys. Then run scripts/es_budget.py and shorten any line
it flags. Report the budget output.
```

- [ ] **Step 4 (Composer 2.5): Add the Spanish contract tests and run them**

Append to `tests/test_contract.py`:

```python
def test_spanish_lines_match_english_ids():
    en = load("source/lines.en.json")
    es = load("source/lines.es.json")
    assert [(l["id"], l["frame"]) for l in es] == [(l["id"], l["frame"]) for l in en]
    assert all(l["text"].strip() for l in es)


def test_spanish_strings_match_english_keys():
    assert set(load("source/strings.es.json")) == set(load("source/strings.en.json"))
    assert load("source/strings.es.json")["f12.button"] == "Agenda una demo"


def test_spanish_anchors_cover_every_cue_and_occur_in_line():
    es = {l["frame"]: l for l in load("source/lines.es.json")}
    for fid, rows in load("source/cues.json").items():
        for c in rows:
            phrase = es[fid]["anchors"][c["anchor"]]
            assert _contains(es[fid]["text"], phrase), (fid, phrase)
```

```bash
cd /Users/swami/Documents/Stackgen_Website_Redesign/videos/aof-concept-film && python3 -m pytest -q && python3 scripts/es_budget.py
```

Expected: all tests pass, then `budget OK`.

- [ ] **Step 5 (orchestrator): Gate S**

Show the user a two-column table of English and Spanish for every line and string.

Draft a Slack message for Endy with the same table and the ask: “Please correct anything that doesn't sound natural to a Bogotá platform team.” Send it only if the user says to send it. Otherwise the user forwards it.

Apply Endy's corrections and rerun Step 4.

In the same message, ask the user for the Bogotá delivery date agreed with John and Endy. Tilak said 9 Oct is too late. Record the date in `NOTES.md`. If the gate schedule cannot meet it, say so now, with the tasks that would have to compress.

**STOP** until the user says “Script pass.” Append the outcome to `NOTES.md`. Commit:

```bash
git add videos/aof-concept-film && git commit -m "feat(aof-film): scaffold, data contract, locked EN/ES script" -- videos/aof-concept-film
```

---

## Wave 1 — Lane 1: Figma (product truth)

### Task 4: Live token read (orchestrator, Chrome DevTools MCP)

**Files:**
- Create: `source/live/tokens.json`, `source/live/home.png`

**Interfaces:**
- Produces `source/live/tokens.json`:
  ```json
  {"app": {"url": str, "vars": {}, "samples": []},
   "site": {"url": "https://stackgen.com/", "vars": {}, "samples": []},
   "peach": "#RRGGBB",
   "command_center": {"panel_bg": "#RRGGBB", "card_bg": "#RRGGBB", "hairline": "#RRGGBB", "text": "#RRGGBB", "muted": "#RRGGBB"}}
  ```
  Task 5 and Task 8 read `peach` and `command_center`.

**Skills:** `chrome-devtools-skills` → `chrome-devtools`.

- [ ] **Step 1: Find the logged-in app tab.** Call `list_pages`.
  - If no StackGen app page is listed, stop and ask the user to open and log in to the app in the browser DevTools controls.
  - Never type credentials. A login screen also means stop and ask.
  - Then `select_page` the app tab.

- [ ] **Step 2: Read app tokens.** Call `evaluate_script` with:

```js
() => {
  const root = getComputedStyle(document.documentElement);
  const vars = {};
  for (const sheet of document.styleSheets) {
    try {
      for (const r of sheet.cssRules) {
        if (r.selectorText === ':root' || r.selectorText === 'html') {
          for (const p of r.style) if (p.startsWith('--')) vars[p] = root.getPropertyValue(p).trim();
        }
      }
    } catch (e) {}
  }
  const pick = sel => [...document.querySelectorAll(sel)].slice(0, 5).map(el => {
    const s = getComputedStyle(el);
    return { sel, font: s.fontFamily, size: s.fontSize, weight: s.fontWeight, color: s.color,
             bg: s.backgroundColor, radius: s.borderRadius, transition: s.transition };
  });
  return { url: location.href, vars,
           samples: [...pick('button'), ...pick('[role=row], tr'), ...pick('h1,h2,h3'), ...pick('[class*=card]')] };
}
```

Store the result under `app`. This is read-only: no clicks that change state.

- [ ] **Step 3: Read the homepage.** Call `navigate_page` to `https://stackgen.com/`, then run the same script and store it under `site`. Call `resize_page` to 1920×1080, then `take_screenshot` and save it to `source/live/home.png`. Task 9 uses it for the Gate B board.
  - **Peach:** take the value of the first CSS variable whose name matches `/peach|apricot|orange/i`. If none exists, run `evaluate_script` with `() => [...document.querySelectorAll('*')].map(e => getComputedStyle(e).color).filter((c, i, a) => a.indexOf(c) === i)` and show the user the warm candidates. The user picks one; never guess.

- [ ] **Step 4: Read the Command Center panel colors** on the homepage hero. Call `evaluate_script`:

```js
() => {
  const hit = [...document.querySelectorAll('*')].find(e => /COMMAND CENTER/i.test(e.textContent) && e.children.length < 3);
  let panel = hit; for (let i = 0; i < 6 && panel; i++) panel = panel.parentElement;
  const s = el => getComputedStyle(el);
  const card = panel && panel.querySelector('[class*=card], [class*=tile], div div div');
  return { panel_bg: panel && s(panel).backgroundColor, card_bg: card && s(card).backgroundColor,
           hairline: panel && s(panel).borderColor, text: hit && s(hit).color,
           muted: card && s(card).color };
}
```

Convert each `rgb()` to hex and store it as `command_center`. If any value is null or transparent, take a 2× screenshot of the hero (`take_screenshot`), sample the five colors from it, and note “sampled from screenshot” in `NOTES.md`.

- [ ] **Step 5: Write the file** and validate it:

```bash
cd /Users/swami/Documents/Stackgen_Website_Redesign/videos/aof-concept-film && python3 -c "
import json,re;t=json.load(open('source/live/tokens.json'))
hexes=[t['peach']]+list(t['command_center'].values())
assert all(re.fullmatch(r'#[0-9A-Fa-f]{6}',h) for h in hexes), hexes
print('tokens OK', t['peach'], t['command_center'])"
```

Expected: `tokens OK …`. Append the values to `NOTES.md` under “Live tokens.”

### Task 5: Re-skin the three SRE screens dark (orchestrator, Figma MCP)

**Files:**
- Figma file `zpQTgAfsrkN6PI3eTHOb5p`, new page “AOF concept film.”
- Create: `source/figma/screens.json`, a map of screen id to Figma node id.

**Context:** Sourcegraph list_files videos/aiden-sre-launch/source/figma at revision film/aiden-sre-launch. If that list is empty, ls the same path locally and record in NOTES.md that the film branch is not on origin.

**Interfaces:**
- Consumes: `source/live/tokens.json` (`command_center`); base frames `48:2`, `58:2`, `64:2`.
- Produces: `source/figma/screens.json` → `{"6a": "<nodeId>", "6b": "<nodeId>", "6c": "<nodeId>", …}`. Task 6 adds the rest; Task 7 reads it.

**Skills:** `figma-skills` → `figma-use`, which must be read before the first `use_figma` call in this session. Also `figma-generate-design`.

- [ ] **Step 1: Read the base frames.** `get_metadata` and `get_screenshot` for `48:2`, `58:2`, `64:2`. Record their component and text-node structure in `NOTES.md` (layer names only).

- [ ] **Step 2: Create the page and duplicate.** With `use_figma`:
  - Create page “AOF concept film.”
  - Clone `48:2`, `58:2`, `64:2` onto it, named `6a Alert triage`, `6b Root cause`, `6c Remediation`.
  - Keep each at 1920×886.
  - Place them in row F6 with a text label above each: film frame, screen id, and the voice phrase from spec §7.

- [ ] **Step 3: Switch to dark.** Map light fills to the `command_center` palette:

  | Light role | Dark value |
  |---|---|
  | Canvas `#f4f5f8` | `panel_bg` |
  | Card fills | `card_bg` |
  | Hairlines | `hairline` |
  | Primary text | `text` |
  | Secondary text | `muted` |

  - Approve stays `#9e33ea`.
  - Status colors keep their hue; set their lightness so text contrast is at least 4.5:1 on `card_bg`.
  - Change fills only. Never move, resize, or restyle type.

- [ ] **Step 4: Replace the story content** with the homepage scenario, editing text nodes only:
  - **6a:** `payments-api` · 5xx rate above SLO, triaged P1, “2 pages suppressed.” Queue rows reuse the existing row component.
  - **6b:** root cause “v41 on checkout-worker,” confidence 94%. Evidence rows: “5xx rate on payments-api 4.1%,” “v41 shipped 16s before the spike,” “500s on POST /checkout.”
  - **6c:** runbook RB-114 “Rollback, verify,” Approve button, status “Resolved · 4m 12s,” chip “Learned sig_4f21.”

  Where the base has more rows than this content needs, hide the extras. Never stretch text to fill.

- [ ] **Step 5: Self-check.** `get_screenshot` each new frame at 2×.
  - Every text node is inside its card.
  - No overlapping type.
  - Contrast is at least 4.5:1, spot-checked on five text nodes per frame using the fill values.

  Write `source/figma/screens.json` with the three node ids.

### Task 6: Eight new screens (orchestrator, Figma MCP) → Gate A

**Files:** Figma page “AOF concept film”; `source/figma/screens.json` (add 7a, 7b, 8a, 8b, 9a, 9b, 10a, 11a).

**Context:** Sourcegraph list_files videos/aiden-sre-launch/source/figma at revision film/aiden-sre-launch. If that list is empty, ls the same path locally and record in NOTES.md that the film branch is not on origin.

**Interfaces:**
- Consumes: Task 5's dark frames as the template, and the content table in spec §4.
- Produces: the completed `source/figma/screens.json` with 14 keys: 11 screens plus `6c-approved`, `8b-approved`, `11a-approved`.

**Skills:** as Task 5.

- [ ] **Step 1: Build each new screen** by cloning `6b` (or `6c` for approval layouts). Reuse its chrome, nav, cards, rows, chips, and buttons. Build a new component only when no base piece fits, and list each one in `NOTES.md`. Content comes from spec §4, exact strings:

| Screen | Clone from | Content |
|---|---|---|
| 7a | 6b | Request card “Cursor · new request — prod-grade EKS for payments, EU 10:14”; source chips Cursor, Claude Code, ServiceNow; module card `company-golden/eks 2.4.1`; Terraform block (12 lines, `module "eks" { source = "company-golden/eks" version = "2.4.1" region = "eu-central-1" … }`) |
| 7b | 6c | “Checking 12 policies” list with SOC 2 and PCI rows, “12 / 12 · Passed all policies”; PR card “PR #2431 opened 10:16:02 · policy-checked”; status “Awaiting approval”; reviewer “Romal M.” |
| 8a | 6a | Inbox “Operations inbox”; rows: OPS-2291 “Roll back checkout-worker” (Linear, P2), plus four more from ServiceNow and Jira (“Rotate payments DB credentials”, “Scale checkout-worker to 6 replicas”, “Grant read access to billing logs”, “Renew api.stackgen.io certificate”) |
| 8b | 6c | OPS-2291 detail; “Aiden triaged as P2 · Deploy rollback · payments team”; “Matched a workflow `rollback-verify` · 91% match · L2”; reasoning (3 lines); L1 · L2 · L3 control at L2; Approve; “Maya K. approved”; “Ticket resolved · 2m 29s · trace saved” |
| 9a | 6a | “Remote-write connected · payments-api · 17.2M samples/hr”; chips OpenTelemetry, Prometheus, Grafana; 30 monochrome integration tiles (cream glyph-free squares with names in IBM Plex Sans), counter “300+ integrations”; dashboard with 4 panels |
| 9b | 6b | Ask bar “Why is checkout failing?”; 5xx chart spiking to 4.1%; marker “v41 shipped 16s before the spike”; likely-cause card “deploy v41 · checkout-worker”; chip “Handed to Aiden for SRE” |
| 10a | 6b | “World Model” record; rows “Deployed v41 · checkout-worker 13:41”, “5xx spike · payments-api 13:42”, “Rollback to v40 · RB-114 13:46”, chip “rollback fixed checkout” |
| 11a | 6c | “Policy check · rollback checkout-worker · passed”; approval request “Run RB-114 on production?” with Approve; audit line “13:46:02 · Chris N. approved RB-114 · policy prod-change-v3 · recorded” |

- [ ] **Step 1b: Build the approved-state variants.** Frames swap these under the 1 px press, so the UI text never has to be drawn in HTML.
  - **`6c-approved`:** a clone of 6c. Approve shows the label “Approved,” status “Resolved · 4m 12s,” chip “Learned sig_4f21.” 6c itself shows Approve and “Awaiting approval.”
  - **`8b-approved`:** a clone of 8b with “Maya K. approved” and “Ticket resolved · 2m 29s · trace saved.” 8b itself shows Approve and “Awaiting approval.”
  - **`11a-approved`:** a clone of 11a. Approve shows the label “Approved,” and the audit line is visible. 11a itself shows Approve, and the audit line is absent.

  Only text and state change between a screen and its variant; every position is identical. Add the three ids to `source/figma/screens.json`.

- [ ] **Step 2: Place each screen** in its film-frame row with the same labels as Task 5.

- [ ] **Step 3: Self-check** as Task 5 Step 5, and update `source/figma/screens.json`.

- [ ] **Step 4: Gate A.** Send the user:
  - the Figma page URL
  - a 2× screenshot of every screen beside its base frame
  - the list of any new components

  **STOP** until “Figma pass.” Apply requested changes, and rerun Step 3 after each round. Append the outcome to `NOTES.md`.

### Task 7: Export the screens at 2× (Composer 2.5)

**Files:**
- Create: `source/figma/<screen>.png` ×14 (11 screens plus 3 approved-state variants)
- Create: `tests/test_figma_exports.py`

**Context:** Sourcegraph keyword_search query "repo:^github\.com/swami086/Stackgen_Website_Redesign$ rev:film/aiden-sre-launch file:videos/aiden-sre-launch hyperframes figma". Empty result: read the SRE export script locally.

**Interfaces:**
- Consumes: `source/figma/screens.json`.
- Produces: `source/figma/{6a,6b,6c,6c-approved,7a,7b,8a,8b,8b-approved,9a,9b,10a,11a,11a-approved}.png`, each 3840×1772.

**Skills:** `hyperframes-skills` → `figma`.

- [ ] **Step 1: Write the failing test** `tests/test_figma_exports.py`:

```python
import json
import struct
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def png_size(path):
    with open(path, "rb") as f:
        head = f.read(24)
    assert head[:8] == b"\x89PNG\r\n\x1a\n"
    return struct.unpack(">II", head[16:24])


def test_every_screen_exported_at_2x():
    screens = json.loads((ROOT / "source/figma/screens.json").read_text())
    assert len(screens) == 14
    assert {"6c-approved", "8b-approved", "11a-approved"} <= set(screens)
    for sid in screens:
        assert png_size(ROOT / "source/figma" / f"{sid}.png") == (3840, 1772), sid
```

Run `python3 -m pytest tests/test_figma_exports.py -q`. Expected: FAIL with `FileNotFoundError`.

- [ ] **Step 2: Export.** `.env` supplies `FIGMA_TOKEN`; copy it from `videos/aiden-sre-launch/.env` if it is missing.

```bash
cd /Users/swami/Documents/Stackgen_Website_Redesign/videos/aof-concept-film
cp -n ../aiden-sre-launch/.env .env
export PATH=/opt/homebrew/opt/node@22/bin:$PATH
python3 - <<'PY'
import json, subprocess, shutil, glob, os
m = json.load(open("source/figma/screens.json"))
for sid, node in m.items():
    ref = "zpQTgAfsrkN6PI3eTHOb5p:" + node.replace(":", "-")
    subprocess.run(["npx", "--yes", "hyperframes@0.8.103", "figma", "asset", ref, "--format", "png", "--scale", "2",
                    "--description", f"AOF film screen {sid}"], check=True)
    newest = max(glob.glob(".media/**/*.png", recursive=True), key=os.path.getmtime)
    shutil.copy(newest, f"source/figma/{sid}.png")
    print(sid, node, newest)
PY
```

- [ ] **Step 3: Run the test.** Expected: `1 passed`. If any size differs, the Figma frame is not 1920×886; report which, and do not resize the PNG.

---

## Wave 1 — Lane 2: Stage and direction

### Task 8: three.js stage module (Grok 4.7)

**Files:**
- Create: `shared/vendor/three/` (vendored three@0.181.2, `build/` and `examples/jsm/`), `shared/vendor/gsap.min.js` (copied)
- Create: `scripts/gen_shared.py`, `tests/test_gen_shared.py`. These generate `shared/stage/tokens.js`, `shared/film.css`, `shared/lang.js`, and `shared/strings.js`.
- Create: `shared/stage/{pieces.js,materials.js,rig.js,stage.js,README.md}`
- Create: `compositions/_stage-test.html`, `compositions/_stage-nested.html`

**Context:** Index the repo, then Torbit the stage file you are about to edit and change only the returned line range. Index again before any follow-up Torbit query. Sourcegraph nls_search "repo:^github\.com/swami086/Stackgen_Website_Redesign$ rev:film/aiden-sre-launch file:videos/aiden-sre-launch/compositions gsap timeline paused", then read_file on the path it returns with revision film/aiden-sre-launch.

**Interfaces:**
- Consumes: `source/live/tokens.json` (peach, command_center), `source/strings.{en,es}.json`.
- Produces, for every frame composition:
  - `createStage(canvas, opts)` → a `Stage`:
    - `scene`, `camera`
    - `pieces.software`, `pieces.quarters.{build,operate,observe,remediate}`
    - `addPanel(id, src)`, which returns a panel `Object3D`
    - `state`, a mutable `StageState`
    - `render()`
  - `bind(tl, stage)`, which wires seeking.
  - `TOKENS`
  - `LANG` (`"en"` | `"es"`) and `STRINGS[LANG][key]`
  - CSS classes `.film-eyebrow`, `.film-head`, `.film-sub` in `shared/film.css`.

**Skills:** `hyperframes-animation` (`adapters/three.md`, then `adapters/gsap.md`), `threejs`, `emil-skills` → `apple-design`.

- [ ] **Step 1: Vendor three.js and GSAP**

```bash
cd /Users/swami/Documents/Stackgen_Website_Redesign/videos/aof-concept-film
npm pack three@0.181.2 --silent && mkdir -p shared/vendor && tar -xzf three-0.181.2.tgz -C shared/vendor && mv shared/vendor/package shared/vendor/three && rm three-0.181.2.tgz
cp ../aiden-sre-launch/assets/frames/10/vendor/gsap.min.js shared/vendor/gsap.min.js
ls shared/vendor/three/build/three.module.js shared/vendor/three/examples/jsm/postprocessing/BokehPass.js
```

Expected: both paths are listed.

- [ ] **Step 2: Write the failing generator test** `tests/test_gen_shared.py`:

```python
import json
from gen_shared import tokens_js, strings_js, lang_js


def test_tokens_js_has_every_token():
    js = tokens_js({"peach": "#FFB38A", "command_center": {"panel_bg": "#1A1712", "card_bg": "#211D18",
                    "hairline": "#3F3B39", "text": "#FAF7F2", "muted": "#A8A29A"}})
    for name in ["ink: 0x14110c", "cream: 0xfaf7f2", "lavender: 0xba99fd", "pink: 0xf9b0f1",
                 "cyan: 0x9ee6fc", "hairline: 0x3f3b39", "grey: 0x8c8580", "peach: 0xffb38a"]:
        assert name in js


def test_strings_js_holds_both_languages():
    js = strings_js({"f12.button": "Schedule a demo"}, {"f12.button": "Agenda una demo"})
    assert js.startswith("export const STRINGS = ")
    data = json.loads(js[len("export const STRINGS = "):].rstrip(";\n"))
    assert data["es"]["f12.button"] == "Agenda una demo"


def test_lang_js():
    assert lang_js("es") == 'export const LANG = "es";\n'
```

Run: `python3 -m pytest tests/test_gen_shared.py -q`. Expected: FAIL (`ModuleNotFoundError: gen_shared`).

- [ ] **Step 3: Write `scripts/gen_shared.py`**

```python
#!/usr/bin/env python3
"""Generate shared/stage/tokens.js, shared/film.css, shared/strings.js, shared/lang.js.
Compositions import these instead of fetching JSON (no network at render).
Usage: gen_shared.py [--lang en|es]"""
import argparse
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
FIXED = {"ink": "#14110C", "cream": "#FAF7F2", "lavender": "#BA99FD", "pink": "#F9B0F1",
         "cyan": "#9EE6FC", "hairline": "#3F3B39", "grey": "#8C8580"}


def hexnum(h):
    return "0x" + h.lstrip("#").lower()


def tokens_js(live):
    t = dict(FIXED, peach=live["peach"])
    body = ",\n  ".join(f"{k}: {hexnum(v)}" for k, v in t.items())
    cc = json.dumps(live["command_center"])
    return f"export const TOKENS = {{\n  {body}\n}};\nexport const COMMAND_CENTER = {cc};\n"


def film_css(live):
    t = dict(FIXED, peach=live["peach"])
    vars_ = "\n".join(f"  --{k}: {v};" for k, v in t.items())
    return f""":root {{
{vars_}
}}
@font-face {{ font-family: "Geist"; src: url("fonts/Geist-Regular.woff2") format("woff2"); font-weight: 400; }}
@font-face {{ font-family: "Geist"; src: url("fonts/Geist-Medium.woff2") format("woff2"); font-weight: 500; }}
.film-head {{ font-family: "Geist", sans-serif; font-weight: 400; font-size: 112px; letter-spacing: -0.01em; color: var(--cream); line-height: 1.08; }}
.film-eyebrow {{ font-family: "Geist", sans-serif; font-weight: 500; font-size: 28px; letter-spacing: 0.12em; text-transform: uppercase; color: color-mix(in srgb, var(--cream) 72%, transparent); }}
.film-sub {{ font-family: "Geist", sans-serif; font-weight: 400; font-size: 52px; color: var(--cream); text-shadow: 0 2px 12px rgba(20,17,12,.85); }}
.film-mask {{ overflow: hidden; display: block; }}
.film-frame {{ border: 2px solid var(--hairline); position: relative; }}
"""


def strings_js(en, es):
    return "export const STRINGS = " + json.dumps({"en": en, "es": es}, ensure_ascii=False) + ";\n"


def lang_js(lang):
    return f'export const LANG = "{lang}";\n'


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--lang", choices=["en", "es"], default="en")
    a = ap.parse_args()
    live = json.loads((ROOT / "source/live/tokens.json").read_text())
    en = json.loads((ROOT / "source/strings.en.json").read_text())
    es = json.loads((ROOT / "source/strings.es.json").read_text())
    (ROOT / "shared/stage").mkdir(parents=True, exist_ok=True)
    (ROOT / "shared/stage/tokens.js").write_text(tokens_js(live))
    (ROOT / "shared/film.css").write_text(film_css(live))
    (ROOT / "shared/strings.js").write_text(strings_js(en, es))
    (ROOT / "shared/lang.js").write_text(lang_js(a.lang))
    print("shared written, lang", a.lang)
```

Run the test (expected `3 passed`), then `python3 scripts/gen_shared.py --lang en`.

Check the font file names with `ls shared/fonts`. If they differ from `Geist-Regular.woff2` / `Geist-Medium.woff2`, change only the two `url()` values to the real names, then rerun.

- [ ] **Step 4: Write `shared/stage/pieces.js`.** This is the jigsaw geometry: one software piece with a center tab, and four ops quarters whose TL/BL pair carries the matching socket. Quarter placement: Build TL, Operate TR, Observe BR, Remediate BL, which is clockwise from Build and matches the booth floor.

```js
import * as THREE from "three";

export const NECK = 0.6;   // neck half-width as a fraction of knob radius
export const OFF = 0.9;    // knob center offset from the edge, fraction of radius

function knob(r) {
  const w = r * NECK, c = r * OFF;
  return { w, c, R: Math.hypot(w, c) };
}

// Software piece: x in [-S, 0], y in [-S/2, S/2]; tab on the right edge, centered at y = 0.
export function softwareShape(S, r) {
  const h = S / 2, { w, c, R } = knob(r);
  const s = new THREE.Shape();
  s.moveTo(-S, -h); s.lineTo(0, -h); s.lineTo(0, -w);
  s.absarc(c, 0, R, Math.atan2(-w, -c), Math.atan2(w, -c), false); // bulges toward +x
  s.lineTo(0, h); s.lineTo(-S, h); s.closePath();
  return s;
}

// Ops piece: x in [0, S]; quarters are h = S/2 squares. TL and BL share the socket at (0, 0).
export function quarterShapes(S, r) {
  const h = S / 2, { w, c, R } = knob(r);
  if (c + R >= h) throw new Error("knob too large for quarter");
  const tl = new THREE.Shape();
  tl.moveTo(c + R, 0); tl.lineTo(h, 0); tl.lineTo(h, h); tl.lineTo(0, h); tl.lineTo(0, w);
  tl.absarc(c, 0, R, Math.atan2(w, -c), 0, true);

  const bl = new THREE.Shape();
  bl.moveTo(0, -h); bl.lineTo(h, -h); bl.lineTo(h, 0); bl.lineTo(c + R, 0);
  bl.absarc(c, 0, R, 0, Math.atan2(-w, -c), true); bl.closePath();

  const rect = (x0, y0) => {
    const s = new THREE.Shape();
    s.moveTo(x0, y0); s.lineTo(x0 + h, y0); s.lineTo(x0 + h, y0 + h); s.lineTo(x0, y0 + h); s.closePath();
    return s;
  };
  return { build: tl, operate: rect(h, 0), observe: rect(h, -h), remediate: bl };
}

export function extrude(shape, S) {
  const g = new THREE.ExtrudeGeometry(shape, {
    depth: 0.12 * S, bevelEnabled: true, bevelThickness: 0.012 * S, bevelSize: 0.012 * S,
    bevelSegments: 6, curveSegments: 48,
  });
  g.rotateX(-Math.PI / 2);          // lie flat: shape +y becomes world -z
  g.computeVertexNormals();
  return g;
}
```

- [ ] **Step 5: Write `shared/stage/materials.js`.** These are the §6.3 values.

```js
import * as THREE from "three";
import { TOKENS } from "./tokens.js";

export function makeMaterials() {
  const software = new THREE.MeshPhysicalMaterial({
    color: TOKENS.lavender, metalness: 0.85, roughness: 0.32, clearcoat: 0.4, anisotropy: 0.3,
  });
  const quarter = () => new THREE.MeshPhysicalMaterial({
    color: TOKENS.pink, metalness: 0, roughness: 0.45, clearcoat: 0.6, clearcoatRoughness: 0.2,
    sheen: 0.2, sheenColor: new THREE.Color(TOKENS.cream), emissive: new THREE.Color(0x000000),
  });
  const capsule = new THREE.MeshStandardMaterial({ color: TOKENS.cream, emissive: TOKENS.cream, emissiveIntensity: 0.6 });
  const floor = new THREE.MeshPhysicalMaterial({ color: TOKENS.ink, roughness: 0.35, metalness: 0 });
  return { software, quarter, capsule, floor };
}

export const ACCENT = {
  build: TOKENS.lavender, operate: TOKENS.peach, observe: TOKENS.pink, remediate: TOKENS.cyan,
};
export const GLOW_MAX = { build: 1.4, operate: 1.4, observe: 2.0, remediate: 1.4 };

// lit: 0..1 accent glow. grey: 0..1 toward grey ceramic.
export function setQuarterLook(mat, edge, name, lit, grey) {
  const base = new THREE.Color(TOKENS.pink).lerp(new THREE.Color(TOKENS.grey), grey);
  mat.color.copy(base);
  mat.roughness = 0.45 + 0.10 * grey;
  mat.emissive.set(ACCENT[name]).multiplyScalar(0.15 * lit);
  edge.material.color.set(ACCENT[name]);
  edge.material.opacity = Math.min(1, lit * GLOW_MAX[name]);
}
```

- [ ] **Step 6: Write `shared/stage/rig.js`.** Camera in lens terms (§6.5).

```js
import * as THREE from "three";

export function makeCamera(width, height) {
  const cam = new THREE.PerspectiveCamera(30, width / height, 0.05, 200);
  cam.filmGauge = 36;
  return cam;
}

// state.camera: { x, y, z, tx, ty, tz, focal (mm), focus (world units), aperture }
export function applyCamera(cam, s) {
  cam.position.set(s.x, s.y, s.z);
  cam.setFocalLength(s.focal);
  cam.lookAt(s.tx, s.ty, s.tz);
  cam.updateProjectionMatrix();
}
```

- [ ] **Step 7: Write `shared/stage/stage.js`.** It covers the renderer, lights, floor, fog, post-processing, pieces, panels, capsules, the state model, and `bind`.

```js
import * as THREE from "three";
import { RectAreaLightUniformsLib } from "three/addons/lights/RectAreaLightUniformsLib.js";
import { Reflector } from "three/addons/objects/Reflector.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { BokehPass } from "three/addons/postprocessing/BokehPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { softwareShape, quarterShapes, extrude } from "./pieces.js";
import { makeMaterials, setQuarterLook } from "./materials.js";
import { makeCamera, applyCamera } from "./rig.js";
import { TOKENS } from "./tokens.js";

export { TOKENS };
export const S = 2;          // piece size, world units
export const KNOB_R = 0.36;  // 0.18 * S
const NAMES = ["build", "operate", "observe", "remediate"];

export function defaultState() {
  return {
    camera: { x: 0, y: 2.2, z: 6.5, tx: 0, ty: 0, tz: 0, focal: 50, focus: 6.5, aperture: 0.0008 },
    key: 0, rim: 0.35,
    sweep: { u: -1, intensity: 0 },                  // u in [0,1] travels across the bevels; -1 = off
    software: { x: -0.05, y: 0, z: 0, ry: 0, lift: 0 },
    quarters: Object.fromEntries(NAMES.map(n => [n, { x: 0, y: 0, z: 0, ry: 0, lit: 0, grey: 0, edges: 0 }])),
    ops: { x: 0.05, y: 0, z: 0, lift: 0 },          // group offset of all four quarters
    capsules: { emitted: 0, mode: "stream", gapX: 0.4, through: 0 },
    plates: { wm: { y: -2, o: 0 }, os: { y: -2, o: 0 } },
    panels: {},                                      // id -> { x, y, z, rx, ry, s, o }
  };
}

export function createStage(canvas, { width = 3840, height = 2160 } = {}) {
  RectAreaLightUniformsLib.init();
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, preserveDrawingBuffer: true });
  renderer.setPixelRatio(1);
  renderer.setSize(width, height, false);
  renderer.toneMapping = THREE.AgXToneMapping;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(TOKENS.ink);
  scene.fog = new THREE.FogExp2(0x1b1712, 0.035);
  const camera = makeCamera(width, height);
  const mats = makeMaterials();

  const key = new THREE.RectAreaLight(0xfff4e6, 0, 6, 3);
  key.position.set(-4, 6, 3); key.lookAt(0, 0, 0); scene.add(key);
  const rim = new THREE.RectAreaLight(TOKENS.cyan, 0, 6, 1.5);
  rim.position.set(2, 3, -5); rim.lookAt(0, 0, 0); scene.add(rim);
  const sweep = new THREE.RectAreaLight(0xffffff, 0, 0.35, 6);
  sweep.position.set(-3, 3.5, 1.5); sweep.lookAt(0, 0, 0); scene.add(sweep);

  const floor = new THREE.Mesh(new THREE.PlaneGeometry(80, 80), mats.floor);
  floor.rotation.x = -Math.PI / 2; floor.position.y = -0.001; scene.add(floor);
  const mirror = new Reflector(new THREE.PlaneGeometry(80, 80), { textureWidth: 1920, textureHeight: 1080, color: 0x222222 });
  mirror.rotation.x = -Math.PI / 2; mirror.position.y = -0.002;
  mirror.material.transparent = true; mirror.material.opacity = 0.15; scene.add(mirror);

  const software = new THREE.Mesh(extrude(softwareShape(S, KNOB_R), S), mats.software);
  scene.add(software);
  const opsGroup = new THREE.Group(); scene.add(opsGroup);
  const shapes = quarterShapes(S, KNOB_R);
  const quarters = {};
  for (const n of NAMES) {
    const mat = mats.quarter();
    const mesh = new THREE.Mesh(extrude(shapes[n], S), mat);
    const edge = new THREE.LineSegments(new THREE.EdgesGeometry(mesh.geometry, 30),
      new THREE.LineBasicMaterial({ transparent: true, opacity: 0, toneMapped: false }));
    mesh.add(edge);
    opsGroup.add(mesh);
    quarters[n] = { mesh, mat, edge };
  }

  const panels = new Map();
  const loader = new THREE.TextureLoader();
  function addPanel(id, src) {
    const tex = loader.load(src);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
    const w = 3.2, h = w * (1772 / 3840);
    const face = new THREE.Mesh(new THREE.PlaneGeometry(w, h),
      new THREE.MeshBasicMaterial({ map: tex, toneMapped: false, transparent: true }));
    const edge = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.PlaneGeometry(w, h)),
      new THREE.LineBasicMaterial({ color: TOKENS.cream, transparent: true, opacity: 0.35, toneMapped: false }));
    face.add(edge);
    scene.add(face);
    panels.set(id, face);
    return face;
  }

  const CAPS = 160;
  const capsules = new THREE.InstancedMesh(new THREE.CapsuleGeometry(0.035, 0.05, 4, 12), mats.capsule, CAPS);
  scene.add(capsules);

  const composer = new EffectComposer(renderer, new THREE.WebGLRenderTarget(width, height, { samples: 4 }));
  composer.addPass(new RenderPass(scene, camera));
  const bokeh = new BokehPass(scene, camera, { focus: 6.5, aperture: 0.0008, maxblur: 0.008 });
  composer.addPass(bokeh);
  composer.addPass(new OutputPass());

  const state = defaultState();
  const m4 = new THREE.Matrix4();

  function capsuleAt(i, st) {
    // Deterministic: capsule i's position is a pure function of its index and st.capsules.
    const c = st.capsules, age = c.emitted - i;
    if (age < 0) return null;
    const lane = ((i * 7919) % 13) / 13 - 0.5;            // fixed per-index lateral offset, no randomness
    if (c.mode === "pile") {
      const slot = Math.min(i, 59), col = slot % 6, row = Math.floor(slot / 6);
      const settle = Math.min(1, age / 3);
      const x = Math.min(c.gapX, 0.1 + age * 0.9) - col * 0.075 * settle;
      return [x, 0.04 + row * 0.07 * settle, lane * 0.6];
    }
    const x = 0.1 + age * 0.9;                             // stream / through
    const maxX = c.mode === "through" ? 12 : 9;
    return x > maxX ? null : [x, 0.08 + 0.02 * Math.sin(i), lane * 0.8];
  }

  function apply(st) {
    applyCamera(camera, st.camera);
    bokeh.uniforms.focus.value = st.camera.focus;
    bokeh.uniforms.aperture.value = st.camera.aperture;
    key.intensity = 6 * st.key;
    rim.intensity = 2 * st.rim;
    sweep.intensity = st.sweep.u < 0 ? 0 : 14 * st.sweep.intensity;
    sweep.position.x = -3 + 6 * Math.max(0, st.sweep.u);
    const sw = st.software;
    software.position.set(sw.x, sw.y + sw.lift, sw.z); software.rotation.y = sw.ry;
    opsGroup.position.set(st.ops.x, st.ops.y + st.ops.lift, st.ops.z);
    for (const n of NAMES) {
      const q = st.quarters[n], o = quarters[n];
      o.mesh.position.set(q.x, q.y, q.z); o.mesh.rotation.y = q.ry;
      setQuarterLook(o.mat, o.edge, n, q.lit, q.grey);
    }
    for (const [id, p] of Object.entries(st.panels)) {
      const face = panels.get(id); if (!face) continue;
      face.position.set(p.x, p.y, p.z); face.rotation.set(p.rx, p.ry, 0); face.scale.setScalar(p.s);
      face.material.opacity = p.o; face.visible = p.o > 0.001;
    }
    for (let i = 0; i < CAPS; i++) {
      const pos = capsuleAt(i, st);
      m4.makeRotationZ(Math.PI / 2);
      if (pos) m4.setPosition(pos[0], pos[1], pos[2]); else m4.makeScale(0, 0, 0);
      capsules.setMatrixAt(i, m4);
    }
    capsules.instanceMatrix.needsUpdate = true;
  }

  function render() { apply(state); composer.render(); }

  return { scene, camera, renderer, pieces: { software, quarters, opsGroup }, addPanel, state, render };
}

// GSAP tweens stage.state. HyperFrames seeks the registered timeline; we render after any seek.
export function bind(tl, stage) {
  tl.eventCallback("onUpdate", () => stage.render());
  window.addEventListener("hf-seek", () => Promise.resolve().then(() => stage.render()));
  stage.render();
}
```

- [ ] **Step 8: Write `shared/stage/README.md`.** Frame workers read this first.

```markdown
# Stage module

Import from a frame composition (paths resolve from the project root):

    <script src="shared/vendor/gsap.min.js"></script>
    <script type="importmap">{"imports":{"three":"./shared/vendor/three/build/three.module.js","three/addons/":"./shared/vendor/three/examples/jsm/"}}</script>
    <script type="module">
      import { createStage, bind } from "./shared/stage/stage.js";
      import { STRINGS } from "./shared/strings.js";
      import { LANG } from "./shared/lang.js";
      const stage = createStage(document.getElementById("stage"));
      const st = stage.state;
      const tl = gsap.timeline({ paused: true });
      tl.to(st.camera, { z: 4.2, duration: 6, ease: "power3.inOut" }, 0);
      window.__timelines = window.__timelines || {};
      window.__timelines["<frame-id>"] = tl; window.__timelines.main = tl;
      bind(tl, stage);
    </script>

Rules:
- Tween only `stage.state` fields (see defaultState in stage.js). Never move meshes directly.
- Lit quarter: tween quarters.<name>.lit 0→1 over 0.6 s; unlit: grey 0→1 over 0.6 s.
- Specular sweep: tween sweep.u 0→1 over 1.2 s, power2.inOut, with sweep.intensity 1; set u back to -1 after.
- Panels: stage.addPanel("6a", "source/figma/6a.png"), then tween state.panels["6a"]
  (rest pose rx 2°, ry −4° in radians: 0.0349, −0.0698).
- Capsules: tween capsules.emitted (count, may be fractional); set capsules.mode "stream" | "pile" | "through".
- Type is DOM over the canvas using shared/film.css classes and STRINGS[LANG][key]. Never draw type in WebGL.
- The root element needs data-duration (the three adapter does not infer duration).
```

- [ ] **Step 9: Write the two test compositions.**
  - `compositions/_stage-test.html`: root `data-composition-id="stage-test"`, `data-width="3840" data-height="2160" data-duration="2"`. It contains one full-size `<canvas id="stage">` and a 2 s timeline:
    - `camera.z` 6.5→4.5
    - `key` 0→1
    - `quarters.remediate.lit` 0→1
    - `sweep.u` 0→1 from 0.4 to 1.6
    - `capsules.emitted` 0→40
  - `compositions/_stage-nested.html`: a root of 3 s that mounts `_stage-test.html` via `data-composition-src` at `data-start="1"`.

- [ ] **Step 10: Prove determinism and nested seeking**

```bash
cd /Users/swami/Documents/Stackgen_Website_Redesign/videos/aof-concept-film
export PATH=/opt/homebrew/opt/node@22/bin:$PATH
npx --yes hyperframes@0.8.103 lint
for n in a b; do npx --yes hyperframes@0.8.103 render . -c compositions/_stage-test.html --fps 30 --quality draft -o renders/frames/_stage-$n.mp4; done
for n in a b; do ffmpeg -loglevel error -y -ss 1.0 -i renders/frames/_stage-$n.mp4 -frames:v 1 -f rawvideo -pix_fmt rgb24 - | md5; done
npx --yes hyperframes@0.8.103 render . -c compositions/_stage-nested.html --fps 30 --quality draft -o renders/frames/_stage-nested.mp4
ffmpeg -loglevel error -y -ss 2.0 -i renders/frames/_stage-nested.mp4 -frames:v 1 -f rawvideo -pix_fmt rgb24 - | md5
```

Expected:
- lint 0 errors.
- The two `_stage-a/b` hashes are identical.
- The nested hash at 2.0 s equals the standalone hash at 1.0 s.

If the nested hash differs, the `hf-seek` microtask render is firing before GSAP seeks the child timeline. Change `bind` to render from `tl.eventCallback("onUpdate")` only, rerun, and report which variant passed. Do not move on with a mismatch.

### Task 9: Style frames (Grok 4.7) → Gate B

**Files:**
- Create: `compositions/style/B{1,2,3,4}.html`, `assets/style/B{1,2,3,4}.png`, `assets/style/board.png`

**Context:** Index, then Torbit gl_definition where file_path LIKE '%aof-concept-film/shared/stage%' or the HTML you are changing. Edit that line range. Index again before the next Torbit query.

**Interfaces:**
- Consumes: `shared/stage/*`, `shared/film.css`, `source/figma/6a.png` (or the Task 5 screenshot of 6a if Task 7 is not done yet), `source/live/home.png`.
- Produces: four 3840×2160 stills plus one comparison board.

**Skills:** as Task 8, plus `emil-skills` → `apple-design`, `animation-systems`.

- [ ] **Step 1: Build four static compositions**, each `data-duration="0.5"` and posed per spec §7 at:
  - **B1:** F1 at 1.0 s. Lavender right edge, sweep at u=0.4, 85 mm.
  - **B2:** F4 at the click. Both pieces mated, joint pulse, 50 mm low orbit.
  - **B3:** F6 at 5.0 s. Remediate lit cyan, the others grey, panel 6a at rest pose, title frame visible.
  - **B4:** F12 at 2.5 s. Full assembly lit, eyebrow, “Start anywhere.”, cream button.

- [ ] **Step 2: Render and extract each still**

```bash
cd /Users/swami/Documents/Stackgen_Website_Redesign/videos/aof-concept-film
export PATH=/opt/homebrew/opt/node@22/bin:$PATH
for b in B1 B2 B3 B4; do
  npx --yes hyperframes@0.8.103 render . -c compositions/style/$b.html --fps 30 --quality high -o renders/frames/$b.mp4
  ffmpeg -loglevel error -y -ss 0.2 -i renders/frames/$b.mp4 -frames:v 1 assets/style/$b.png
done
ffmpeg -loglevel error -y -i source/live/home.png -i assets/style/B1.png -i assets/style/B3.png -i assets/style/B4.png \
  -filter_complex "[0]scale=1920:1080[a];[1]scale=1920:1080[b];[2]scale=1920:1080[c];[3]scale=1920:1080[d];[a][b]hstack[t];[c][d]hstack[u];[t][u]vstack" assets/style/board.png
ffprobe -v error -select_streams v -show_entries stream=width,height -of csv=p=0 assets/style/B1.png
```

Expected: `3840,2160`.

- [ ] **Step 3: Self-check against spec §6.9.**
  - No pure-black crush: the ink background reads `#14110C` ±3 when sampled.
  - The type matches the homepage’s weight and tracking on the board.
  - Panel text in B3 is legible at 100% crop.

- [ ] **Step 4 (orchestrator): Opus 5.5 review, then Gate B.** Dispatch the reviewer at `claude-opus-5-5-high`, with these extra checks:
  - Is this an Apple-grade product shot?
  - Does it sit on the homepage without looking foreign?

  Show the user `board.png` and B2. **STOP** until “Direction pass.” Grok applies any changes and rerenders.

  After pass, the orchestrator records the approved values in this plan under “Direction lock” (below T9): key and rim intensity, sweep intensity, fog density, aperture, and panel scale.

**Direction lock:** written by the orchestrator at Gate B.

---

## Wave 1 — Lane 3: Sound

### Task 10: Spanish-safe text checks and take markup (Composer 2.5)

**Files:**
- Modify: `scripts/check_markup.py` (accent folding, per-language check, OpenTofu respelling)
- Modify: `scripts/split_takes.py` (accent folding, `--lang`)
- Modify: `tests/test_check_markup.py`, `tests/test_split_takes.py`
- Create: `data/takes.json`

**Context:** Torbit gl_definition for words and norm in videos/aof-concept-film/scripts. Sourcegraph keyword_search the same names under file:videos/aiden-sre-launch/scripts rev:film/aiden-sre-launch when comparing to the read-only original.

**Interfaces:**
- Consumes: `source/lines.{en,es}.json`, `source/frames.json`.
- Produces:
  - `data/takes.json`: a list of `{"id": "T1".."T5", "lang": "en"|"es", "lines": ["L01", …], "voice_id": str|null, "markup": str, "generation_id": null}`.
  - `check_markup.words(s, ipa=None) -> list[str]`, which folds accents.
  - `split_takes.main(argv)`, which accepts `--lang en|es`.

**Why:** the SRE versions strip every character outside `a-z`. “qué” becomes `qu` and “señal” becomes `seal`, so every Spanish transcript match would fail.

**Skills:** superpowers `test-driven-development`.

- [ ] **Step 1: Write the failing tests.** Append to `tests/test_check_markup.py`:

```python
def test_spanish_accents_fold_to_ascii():
    assert words("¿Por qué falla el checkout? Señal.") == ["por", "que", "falla", "el", "checkout", "senal"]


def test_open_tofu_respelling_maps_back():
    assert words("Terraform u Open Tofu") == ["terraform", "u", "opentofu"]
```

Append to `tests/test_split_takes.py`:

```python
from split_takes import norm


def test_norm_folds_spanish():
    assert norm("qué") == "que"
    assert norm("Señal,") == "senal"
```

Run `python3 -m pytest tests/test_check_markup.py tests/test_split_takes.py -q`. Expected: the three new tests FAIL.

- [ ] **Step 2: Patch `scripts/check_markup.py`.** Replace the module body below the docstring with:

```python
import json
import re
import sys
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
RESPELL = {"M-T-T-R": "MTTR", "S-R-E": "SRE", "Open Tofu": "OpenTofu"}


def fold(s):
    return unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode()


def strip_markup(s, ipa=None):
    for k, v in (ipa or {}).items():
        s = s.replace(k, v)
    s = re.sub(r"\[[^\]]*\]", " ", s)
    for k, v in RESPELL.items():
        s = s.replace(k, v)
    return s


def words(s, ipa=None):
    return re.sub(r"[^a-z0-9' ]+", " ", fold(strip_markup(s, ipa)).lower()).split()


def check(takes, lines):
    bad = []
    for t in takes:
        expected = words(" ".join(lines[l] for l in t["lines"]))
        if words(t["markup"], t.get("ipa")) != expected:
            bad.append(t["id"] + "/" + t.get("lang", "en"))
    return bad


if __name__ == "__main__":
    takes = json.loads((ROOT / "data/takes.json").read_text())
    bad = []
    for lang in ("en", "es"):
        lines = {l["id"]: l["text"] for l in json.loads((ROOT / f"source/lines.{lang}.json").read_text())}
        bad += check([t for t in takes if t.get("lang", "en") == lang], lines)
    print("markup OK" if not bad else "markup changes words in: " + ", ".join(bad))
    sys.exit(1 if bad else 0)
```

The copied test `test_check_flags_changed_words` asserts `["T"]`. Update that expectation to `["T/en"]`, the new id format.

- [ ] **Step 3: Patch `scripts/split_takes.py`.** Change `norm`, and replace `main`:

```python
import unicodedata


def norm(w):
    w = unicodedata.normalize("NFKD", w).encode("ascii", "ignore").decode()
    return re.sub(r"[^a-z0-9]", "", w.lower())


def main(argv):
    lang = "en"
    if argv[:1] == ["--lang"]:
        lang, argv = argv[1], argv[2:]
    vo = VO / lang
    takes = [t for t in json.loads((ROOT / "data/takes.json").read_text()) if t["lang"] == lang]
    lines = {l["id"]: l["text"] for l in json.loads((ROOT / f"source/lines.{lang}.json").read_text())}
    report_path = ROOT / "data/vo_report.json"
    report = json.loads(report_path.read_text()) if report_path.exists() else {}
    want = set(argv) or {t["id"] for t in takes}
    for t in takes:
        if t["id"] not in want:
            continue
        wav = vo / (t["id"] + ".wav")
        words = load_words(vo / (t["id"] + ".transcript.json"))
        texts = [lines[l] for l in t["lines"]]
        ratio = match_ratio(words, texts)
        for lid, (s, e, ws) in zip(t["lines"], segments(words, texts, duration(wav))):
            dst = vo / (lid + ".wav")
            cut(wav, s, e, dst)
            rebased = [{"id": "w" + str(i), "text": x["text"], "start": round(x["start"] - s, 3), "end": round(x["end"] - s, 3)}
                       for i, x in enumerate(ws)]
            rebased = clamp_to_file(rebased, duration(dst))
            (vo / (lid + ".words.json")).write_text(json.dumps(rebased, indent=1))
        report[f"{t['id']}/{lang}"] = {"match_ratio": round(ratio, 3)}
        print(t["id"], lang, len(t["lines"]), "lines, match", round(ratio, 3))
    report_path.write_text(json.dumps(report, indent=1))
```

Update the module docstring's usage line to `split_takes.py [--lang en|es] [T1 T2 ...]`.

- [ ] **Step 4: Run all tests.** `python3 -m pytest -q`. Expected: all pass.

- [ ] **Step 5: Write `data/takes.json`** from the frames and lines. Lines are joined with a blank line so the read breathes at each frame boundary. MTTR is respelled as proven on the SRE film.

```bash
cd /Users/swami/Documents/Stackgen_Website_Redesign/videos/aof-concept-film && python3 - <<'PY'
import json
frames = json.load(open("source/frames.json"))
takes = []
for lang, voice in (("en", "SAz9YHcvj6GT2YYXdXww"), ("es", None)):
    lines = {l["id"]: l["text"] for l in json.load(open(f"source/lines.{lang}.json"))}
    for tid in ["T1", "T2", "T3", "T4", "T5"]:
        ids = [f["line"] for f in frames if f["take"] == tid]
        markup = "\n\n".join(lines[i] for i in ids).replace("MTTR", "M-T-T-R")
        takes.append({"id": tid, "lang": lang, "lines": ids, "voice_id": voice, "markup": markup, "generation_id": None})
json.dump(takes, open("data/takes.json", "w"), indent=1, ensure_ascii=False)
print(len(takes), "takes")
PY
python3 scripts/check_markup.py
```

Expected: `10 takes`, then `markup OK`.

### Task 11: Spanish casting (orchestrator, ElevenLabs MCP) → Gate C1

**Files:** `assets/audio/vo/casting/es-<name>.mp3` (+ `.json` provenance), `data/takes.json` (`voice_id` on Spanish takes), `NOTES.md`.

**Skills:** `elevenlabs-skills` → `creative-studio`; reference `text-to-speech`; `hyperframes-creative` `references/narration.md`.

- [ ] **Step 1:** `creative_get_model_guide(model_id: "eleven_v4")`. Record the recommended settings in `NOTES.md`. Use them unchanged, with no style exaggeration (spec §9.1).

- [ ] **Step 2:** `creative_list_voices` for Spanish narration voices with a Latin American accent and a neutral, mid-pitch, warm narration style.
  - Shortlist three. Prefer professional voice clones of real narrators.
  - Exclude voices described as Castilian or Spain, and character or announcer voices.
  - Record ids and descriptions in `NOTES.md`.

- [ ] **Step 3:** `creative_create_flow` named “aof-es-casting.” For each voice, run `creative_generate_speech(model_id: "eleven_v4", voice_id, prompt: <Spanish T1 markup>, generations_count: 1, flow_id, estimate_only: true)`.
  - If the total estimate is 2,000 credits or less, run the three real calls.
  - Otherwise ask the user first.

- [ ] **Step 4:** Poll with `creative_get_flow_run_status`, never rerun. Download each with:

```bash
python3 scripts/el_fetch.py "<media url>" assets/audio/vo/casting/es-<name>.mp3 --meta '{"flow_id":"…","node_id":"…","generation_id":"…","model_id":"eleven_v4","prompt":"T1 es"}'
```

- [ ] **Step 5: Gate C1.** `creative_show_flow_results` for the user.
  - Draft a Slack note to Endy with the three files. Send it only if the user says so.
  - The user names the voice.
  - Write its `voice_id` on every `"lang": "es"` take in `data/takes.json`.
  - Append the outcome to `NOTES.md`.

### Task 12: Narration takes, English and Spanish (orchestrator, ElevenLabs MCP)

**Files:** `assets/audio/vo/{en,es}/T{1..5}.mp3` and `.wav` (+ provenance), `data/takes.json` (`generation_id`), `NOTES.md`.

**Skills:** as Task 11.

- [ ] **Step 1:** `python3 scripts/check_markup.py` → `markup OK`.

- [ ] **Step 2:** `creative_create_flow` named “aof-narration.”
  - For each of the 10 takes, run `creative_generate_speech(model_id: "eleven_v4", voice_id, prompt: markup, generations_count: 1, flow_id, estimate_only: true)`.
  - Sum the estimates. If the sum is over 2,000 credits, show it and ask.
  - Then make the real calls, once each.

- [ ] **Step 3:** Poll, then download each take twice: the `.mp3` as delivered, and the `.wav` at 48 kHz, 24-bit.

```bash
python3 scripts/el_fetch.py "<url>" assets/audio/vo/<lang>/<T>.mp3 --meta '{…}'
python3 scripts/el_fetch.py "<url>" assets/audio/vo/<lang>/<T>.wav --meta '{…}'
```

Write `generation_id` on each take in `data/takes.json`.

- [ ] **Step 4: Ear test.** Spec §9.1, pass/fail per take. Write a table in `NOTES.md` with these columns:
  - shimmer
  - stress on product names
  - cadence
  - breaths
  - energy match
  - pause placement

  A failing take is reported to the user with the reason. Do not regenerate without the user's yes. Gate C2 comes after Task 13's transcript check.

### Task 13: Transcribe and split (Composer 2.5) → Gate C2

**Files:** `assets/audio/vo/{en,es}/T*.transcript.json`, `assets/audio/vo/{en,es}/L*.wav`, `assets/audio/vo/{en,es}/L*.words.json`, `data/vo_report.json`.

**Context:** Torbit gl_definition name segments in split_takes.py. Local Read of the file being patched. Sourcegraph only for the committed SRE original, with rev:film/aiden-sre-launch.

**Interfaces:**
- Produces `assets/audio/vo/<lang>/<Lxx>.words.json`: `[{"id", "text", "start", "end"}]`, rebased to the line file. Tasks 14, 16, and 24 read these.

**Skills:** `media-use` (`audio/references/tts.md`, transcribe section), `hyperframes-cli`.

- [ ] **Step 1: Find the language flag.**

```bash
cd /Users/swami/Documents/Stackgen_Website_Redesign/videos/aof-concept-film && export PATH=/opt/homebrew/opt/node@22/bin:$PATH
npx --yes hyperframes@0.8.103 transcribe --help
```

Use the flag the help names (for example `--language es`) on the Spanish takes. If there is none, run without it and confirm in Step 3 that the Spanish match ratio is at least 0.95.

- [ ] **Step 2: Transcribe all ten takes**

```bash
for t in T1 T2 T3 T4 T5; do
  npx --yes hyperframes@0.8.103 transcribe assets/audio/vo/en/$t.wav --json > assets/audio/vo/en/$t.transcript.json
  npx --yes hyperframes@0.8.103 transcribe assets/audio/vo/es/$t.wav --json <LANG_FLAG_FROM_STEP_1> > assets/audio/vo/es/$t.transcript.json
done
```

Replace `<LANG_FLAG_FROM_STEP_1>` with the exact flag found in Step 1, or with nothing if there is none.

- [ ] **Step 3: Split**

```bash
python3 scripts/split_takes.py --lang en && python3 scripts/split_takes.py --lang es
```

Expected: ten lines `Tn <lang> k lines, match 0.9xx`, every match ≥ 0.95. List each mismatched word in `NOTES.md`.

A mismatch caused by the recognizer (for example “Aden” for “Aiden”) is noted, not fixed. A mismatch where the voice said a different word fails the take.

- [ ] **Step 4: Seam check.** For each take, concatenate its line files and listen for clicks:

```bash
for lang in en es; do
  ffmpeg -loglevel error -y -i assets/audio/vo/$lang/L01.wav -i assets/audio/vo/$lang/L02.wav -i assets/audio/vo/$lang/L03.wav -i assets/audio/vo/$lang/L04.wav \
    -filter_complex "concat=n=4:v=0:a=1" /tmp/aof-T1-$lang.wav
done
```

Repeat for T2 (L05, L06), T3 (L07, L08), T4 (L09), and T5 (L10–L12). Report.

- [ ] **Step 5 (orchestrator): Gate C2.** Present:
  - the ten takes
  - the ear-test table
  - the match ratios

  **STOP** until “Takes pass.” A rejected take goes back to Task 12 for that take only, with the user's approval of the spend.

### Task 14: Voice timing and spotting sheet (Composer 2.5)

**Files:**
- Create: `scripts/lock_timing.py`, `tests/test_lock_timing.py`
- Create: `data/timing.voice.json`, `data/spotting.json`

**Context:** Same as Task 13, for the SRE timing script the plan names. Local files win if Sourcegraph is behind origin.

**Interfaces:**
- Consumes: `source/frames.json`, `source/cues.json`, `source/lines.es.json` (`anchors`), `assets/audio/vo/<lang>/<Lxx>.wav`, `assets/audio/vo/<lang>/<Lxx>.words.json`.
- Produces:
  - `voice_plan(frames, vo) -> {"total", "frames": [{"id", "slug", "line", "start", "dur", "floor"}]}`
  - `snap(plan, downbeats) -> plan` with `snap_next: bool` per frame
  - `hits(plan, downbeats) -> {frame_id: [{"label", "t"}]}`
  - `add_cues(locked, cues_src, words, anchors_es) -> locked`, with `vo.{en,es}` and `cues[{"key", "en", "es"}]` per frame
  - `find_phrase(words, phrase) -> float`

  Task 16 calls `snap`, `hits`, and `add_cues`.

**Rules from spec §9.4:**
- `LEAD` = 0.3 s from frame start to voice start.
- `PAD` = 0.8 s.
- Frame length = max(John's length, longer voice + `PAD`).
- Snap moves a boundary at most `SHIFT` = 0.4 s and never below `floor` = longer voice + `PAD`.

**Skills:** superpowers `test-driven-development`.

- [ ] **Step 1: Write the failing tests** `tests/test_lock_timing.py`:

```python
import pytest
from lock_timing import voice_plan, snap, hits, add_cues, find_phrase

FRAMES = [
    {"id": "F01", "slug": "a", "line": "L01", "john": 6.0},
    {"id": "F02", "slug": "b", "line": "L02", "john": 4.0},
    {"id": "F03", "slug": "c", "line": "L03", "john": 3.0},
]
VO = {"en": {"L01": 4.0, "L02": 4.0, "L03": 1.0}, "es": {"L01": 4.5, "L02": 4.9, "L03": 1.2}}


def test_voice_plan_takes_longer_of_john_and_voice():
    p = voice_plan(FRAMES, VO)
    assert [f["dur"] for f in p["frames"]] == [6.0, 5.7, 3.0]
    assert [f["start"] for f in p["frames"]] == [0.0, 6.0, 11.7]
    assert p["total"] == 14.7


def test_snap_moves_boundary_to_downbeat_within_window():
    p = voice_plan(FRAMES, VO)
    s = snap(p, [5.8, 11.9, 20.0])
    assert [f["start"] for f in s["frames"]] == [0.0, 5.8, 11.9]
    assert s["frames"][0]["snap_next"] and s["frames"][1]["snap_next"]


def test_snap_never_cuts_below_voice_floor():
    p = voice_plan(FRAMES, VO)
    s = snap(p, [5.0, 11.4])          # 5.0 would leave F01 at 5.0 < floor 5.3; 11.4 is 0.3 early
    assert s["frames"][1]["start"] == 6.0
    assert not s["frames"][0]["snap_next"]


def test_hits_snap_to_nearest_downbeat():
    p = {"frames": [{"id": "F04", "start": 10.0, "dur": 6.0}]}
    assert hits(p, [12.2, 12.9]) == {"F04": [{"label": "click", "t": 12.2}]}


def test_find_phrase_folds_accents():
    words = [{"text": "¿Por", "start": 0.1}, {"text": "qué", "start": 0.3}, {"text": "falla?", "start": 0.6}]
    assert find_phrase(words, "por que falla") == 0.1
    with pytest.raises(KeyError):
        find_phrase(words, "checkout")


def test_add_cues_uses_spanish_anchor():
    locked = {"frames": [{"id": "F01", "line": "L01", "start": 2.0, "dur": 6.0}]}
    cues = {"F01": [{"key": "f01.eyebrow", "anchor": "software factory"}]}
    words = {"en": {"L01": [{"text": "a", "start": 0.0}, {"text": "software", "start": 1.0}, {"text": "factory", "start": 1.3}]},
             "es": {"L01": [{"text": "una", "start": 0.0}, {"text": "fábrica", "start": 1.6}]}}
    anchors = {"L01": {"software factory": "fábrica"}}
    out = add_cues(locked, cues, words, anchors)
    f = out["frames"][0]
    assert f["vo"] == {"en": 2.3, "es": 2.3}
    assert f["cues"] == [{"key": "f01.eyebrow", "en": 3.3, "es": 3.9}]
```

Run: `python3 -m pytest tests/test_lock_timing.py -q`. Expected: FAIL (`ModuleNotFoundError`).

- [ ] **Step 2: Write `scripts/lock_timing.py`**

```python
#!/usr/bin/env python3
"""Two-language timing lock (spec §9.4).
Usage: lock_timing.py voice              -> data/timing.voice.json, data/spotting.json
       lock_timing.py lock --offset S    -> data/timing.json   (reads audiomap.json)"""
import argparse
import json
import re
import subprocess
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
LEAD, PAD, SHIFT, HIT_SHIFT, EPS = 0.3, 0.8, 0.4, 0.3, 1e-9
LANGS = ("en", "es")
HITS = {"F04": [("click", 2.4)],
        "F05": [("pulse-1", 2.0), ("pulse-2", 2.55), ("pulse-3", 3.10), ("pulse-4", 3.65)],
        "F10": [("plate", 2.0)], "F11": [("plate-2", 2.0)], "F12": [("resolve", 2.2)]}


def norm(w):
    w = unicodedata.normalize("NFKD", w).encode("ascii", "ignore").decode()
    return re.sub(r"[^a-z0-9]", "", w.lower())


def find_phrase(words, phrase):
    target = [norm(x) for x in phrase.split() if norm(x)]
    toks = [norm(w["text"]) for w in words]
    for i in range(len(toks) - len(target) + 1):
        if toks[i:i + len(target)] == target:
            return words[i]["start"]
    raise KeyError(phrase)


def voice_plan(frames, vo):
    out, t = [], 0.0
    for f in frames:
        v = max(vo[l][f["line"]] for l in LANGS)
        d = round(max(f["john"], v + PAD), 3)
        out.append({"id": f["id"], "slug": f["slug"], "line": f["line"], "start": round(t, 3), "dur": d,
                    "floor": round(v + PAD, 3), "john": f["john"]})
        t = round(t + d, 3)
    return {"total": t, "frames": out}


def snap(plan, downbeats):
    frames, t, n = [], 0.0, len(plan["frames"])
    for i, f in enumerate(plan["frames"]):
        target, snapped = t + f["dur"], False
        if i < n - 1:
            cands = [b for b in downbeats if abs(b - target) <= SHIFT + EPS and b - t >= f["floor"] - EPS]
            if cands:
                target, snapped = min(cands, key=lambda b: abs(b - target)), True
        d = round(target - t, 3)
        frames.append(dict(f, start=round(t, 3), dur=d, snap_next=snapped))
        t = round(t + d, 3)
    return {"total": t, "frames": frames}


def hits(plan, downbeats):
    out = {}
    for f in plan["frames"]:
        for label, local in HITS.get(f["id"], []):
            want = f["start"] + local
            near = [b for b in downbeats if abs(b - want) <= HIT_SHIFT + EPS and f["start"] <= b <= f["start"] + f["dur"]]
            t = min(near, key=lambda b: abs(b - want)) if near else want
            out.setdefault(f["id"], []).append({"label": label, "t": round(t, 3)})
    return out


def add_cues(locked, cues_src, words, anchors_es):
    for f in locked["frames"]:
        f["vo"] = {l: round(f["start"] + LEAD, 3) for l in LANGS}
        f["cues"] = []
        for c in cues_src.get(f["id"], []):
            row = {"key": c["key"]}
            for l in LANGS:
                phrase = c["anchor"] if l == "en" else anchors_es[f["line"]][c["anchor"]]
                row[l] = round(f["vo"][l] + find_phrase(words[l][f["line"]], phrase), 3)
            f["cues"].append(row)
    return locked


def duration(path):
    return float(subprocess.check_output(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(path)]))


def load(rel):
    return json.loads((ROOT / rel).read_text())


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("mode", choices=["voice", "lock"])
    ap.add_argument("--offset", type=float, default=0.0)
    a = ap.parse_args()
    frames = load("source/frames.json")
    vo = {l: {f["line"]: duration(ROOT / f"assets/audio/vo/{l}/{f['line']}.wav") for f in frames} for l in LANGS}
    if a.mode == "voice":
        plan = voice_plan(frames, vo)
        (ROOT / "data/timing.voice.json").write_text(json.dumps(plan, indent=1))
        spot = [{"label": f["id"] + "-start", "t": f["start"]} for f in plan["frames"]]
        spot += [{"label": f["id"] + "-" + k, "t": round(f["start"] + lt, 3)} for f in plan["frames"] for k, lt in HITS.get(f["id"], [])]
        spot.append({"label": "end", "t": plan["total"]})
        (ROOT / "data/spotting.json").write_text(json.dumps(sorted(spot, key=lambda x: x["t"]), indent=1))
        print("voice timing total", plan["total"])
        return
    am = load("audiomap.json")
    downbeats = [round(x - a.offset, 3) for x in am["grid"]["downbeats_sec"] if x >= a.offset]
    plan = load("data/timing.voice.json")
    locked = snap(plan, downbeats)
    hit_map = hits(locked, downbeats)
    for f in locked["frames"]:
        f["hits"] = hit_map.get(f["id"], [])
    words = {l: {f["line"]: load(f"assets/audio/vo/{l}/{f['line']}.words.json") for f in frames} for l in LANGS}
    anchors = {l["id"]: l.get("anchors", {}) for l in load("source/lines.es.json")}
    locked = add_cues(locked, load("source/cues.json"), words, anchors)
    locked["music_offset"] = a.offset
    (ROOT / "data/timing.json").write_text(json.dumps(locked, indent=1, ensure_ascii=False))
    for f in locked["frames"]:
        print(f["id"], f["start"], f["dur"], "snap" if f["snap_next"] else "-")
    print("lock total", locked["total"])


if __name__ == "__main__":
    main()
```

- [ ] **Step 3: Run the tests.** Expected: `6 passed`.

- [ ] **Step 4: Write the voice plan and spotting sheet**

```bash
cd /Users/swami/Documents/Stackgen_Website_Redesign/videos/aof-concept-film && python3 scripts/lock_timing.py voice && python3 -m json.tool data/spotting.json | head -40
```

Expected: `voice timing total 1xx.xxx`, at least 138.745. `data/spotting.json` lists 12 frame starts, the F04 click, four F05 pulses, the F10 and F11 plates, the F12 resolve, and `end`. Report every frame whose length grew past John's, with its language and the extra seconds.

### Task 15: Score (orchestrator, ElevenLabs MCP) → Gate C3

**Files:** `assets/audio/music/M1.mp3`, `assets/audio/music/bed.wav` (+ provenance), `assets/audio/music/preview-{en,es}.mp3`, `NOTES.md`.

**Skills:** `elevenlabs-skills` → `creative-studio`; reference `music`.

- [ ] **Step 1:** `creative_get_model_guide(model_id: "eleven_music_v2_5")`.

- [ ] **Step 2: Write the prompt** from spec §9.5 and `data/spotting.json`, with times as m:ss:

```text
Instrumental score for a premium product launch film, about 96 BPM, 4/4. Palette: warm analog synth pads,
felt piano, deep sub bass, soft brushed percussion. No drum-machine kick, no vocals, no risers that sound
like stock trailers. A quiet pulse from the first second. Builds gently through <F01-start>–<F04-click>;
a clean downbeat hit at <F04-click>. Four rising tonal notes at <F05-pulse-1>, <F05-pulse-2>,
<F05-pulse-3>, <F05-pulse-4>. Steady, lighter bed from <F06-start> to <F10-start> so narration leads.
A lift at <F10-plate>, a second at <F11-plate-2>. Resolves on <F12-resolve>, then a 3 second tail.
```

Replace each `<…>` with its m:ss value from `data/spotting.json` before sending.

- [ ] **Step 3: Generate once.**
  - `creative_create_flow` named “aof-score.”
  - Add a music node with model `eleven_music_v2_5`, `instrumental: true`, `duration_seconds` = `timing.voice.json` total + 3, `generations_count: 1`.
  - Run `estimate_only` first. Ask the user if the estimate is over 2,000 credits.
  - Run once and poll.

- [ ] **Step 4: Download and prepare**

```bash
python3 scripts/el_fetch.py "<url>" assets/audio/music/M1.mp3 --meta '{…}'
ffmpeg -loglevel error -y -i assets/audio/music/M1.mp3 -ar 48000 -c:a pcm_s24le assets/audio/music/bed.wav
```

- [ ] **Step 5: Build previews.** Lay each language's line files at their `timing.voice.json` voice starts (frame start + 0.3) over the bed:

```bash
cd /Users/swami/Documents/Stackgen_Website_Redesign/videos/aof-concept-film && python3 - <<'PY'
import json, subprocess
plan = json.load(open("data/timing.voice.json"))
for lang in ("en", "es"):
    ins, fl = ["-i", "assets/audio/music/bed.wav"], []
    for k, f in enumerate(plan["frames"], start=1):
        ins += ["-i", f"assets/audio/vo/{lang}/{f['line']}.wav"]
        ms = int(round((f["start"] + 0.3) * 1000))
        fl.append(f"[{k}:a]adelay={ms}|{ms}[v{k}]")
    n = len(plan["frames"])
    fl.append("[0:a]volume=-14dB[m]")
    fl.append("[m]" + "".join(f"[v{k}]" for k in range(1, n + 1)) + f"amix=inputs={n + 1}:normalize=0[out]")
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", *ins, "-filter_complex", ";".join(fl), "-map", "[out]",
                    f"assets/audio/music/preview-{lang}.mp3"], check=True)
    print("preview", lang)
PY
```

- [ ] **Step 6: Gate C3.** Play both previews for the user.
  - The user confirms the score and the head offset (0–2 s, default 0).
  - Record the offset in `NOTES.md`.
  - **STOP** until “Score pass.” A second generation needs the user's yes and a new estimate.

### Task 16: Beat grid and timing lock (Composer 2.5)

**Files:** `audiomap.json`, `data/timing.json`.

**Context:** Torbit for lock_timing once it exists. Sourcegraph keyword_search file:videos/aiden-sre-launch/scripts rev:film/aiden-sre-launch for the beat-grid script. Reindex if the new file has no row.

**Interfaces:**
- Produces `data/timing.json`:
  ```json
  {"total": float, "music_offset": float,
   "frames": [{"id", "slug", "line", "start", "dur", "floor", "john", "snap_next",
               "vo": {"en": abs, "es": abs},
               "cues": [{"key", "en": abs, "es": abs}],
               "hits": [{"label", "t"}]}]}
  ```
  Every frame worker and Task 23 read it. Nothing downstream may write it.

**Skills:** `music-to-video` (`scripts/analyze-beatgrid.py` only).

- [ ] **Step 1: Analyze the bed**

```bash
cd /Users/swami/Documents/Stackgen_Website_Redesign/videos/aof-concept-film
python3 -m pip install --user librosa numpy soundfile
python3 ~/.cursor/skills/music-to-video/scripts/analyze-beatgrid.py assets/audio/music/bed.wav -o audiomap.json --print
python3 -c "import json;g=json.load(open('audiomap.json'))['grid'];print(g.get('bpm'), g['downbeats_sec'][:4], len(g['downbeats_sec']))"
```

Expected: a BPM near 96, and a first downbeat inside the first 2 s. On the SRE film the tracker skipped a quiet opening. If the first downbeat is later than 2 s, report it to the orchestrator and stop; do not lock from a wrong grid.

- [ ] **Step 2: Lock**

```bash
python3 scripts/lock_timing.py lock --offset <offset from NOTES.md Gate C3>
```

Expected: 12 rows `Fnn start dur snap|-`, then `lock total …`.
- At least 8 of the 11 boundaries are `snap`.
- The F04 `click` hit is within 0.3 s of 2.4 s local.
- Every cue key from `source/cues.json` appears in both languages.

- [ ] **Step 3: Check the lock**

```bash
python3 - <<'PY'
import json
t = json.load(open("data/timing.json"))
assert len(t["frames"]) == 12
for a, b in zip(t["frames"], t["frames"][1:]):
    assert abs(a["start"] + a["dur"] - b["start"]) < 1e-6
for f in t["frames"]:
    assert f["dur"] >= f["floor"] - 1e-6, f["id"]
    for c in f["cues"]:
        for l in ("en", "es"):
            assert f["start"] <= c[l] <= f["start"] + f["dur"], (f["id"], c["key"], l)
print("lock OK", t["total"])
PY
```

Expected: `lock OK …`.

The orchestrator commits `data/`, `audiomap.json`, `assets/audio/`, and `NOTES.md`.

### Task 17: Sound effects (orchestrator, ElevenLabs MCP)

**Files:** `assets/audio/sfx/<id>.wav` (+ provenance), `data/sfx.json`.

**Interfaces:**
- Produces `data/sfx.json`: `{"<id>": "assets/audio/sfx/<id>.wav"}`, one entry per id used in `source/frames.json` `sfx`.

**Skills:** `elevenlabs-skills` → `creative-studio`; reference `sound-effects`.

- [ ] **Step 1: Reuse.** Copy the SRE effects that fit: `whoosh-short`, `whoosh-long`, `row-tick`, `approve-chime`, `resolve-chime`, `sub-swell`, `impact-low`, `logo-sting`, `room-tone`.

```bash
cd /Users/swami/Documents/Stackgen_Website_Redesign/videos/aof-concept-film
for s in whoosh-short whoosh-long row-tick approve-chime resolve-chime sub-swell impact-low logo-sting room-tone; do
  cp ../aiden-sre-launch/assets/audio/sfx/$s.wav ../aiden-sre-launch/assets/audio/sfx/$s.json assets/audio/sfx/ 2>/dev/null || echo "missing $s"
done
```

Any `missing` id joins Step 2's list.

- [ ] **Step 2: Generate the new effects** with `eleven_text_to_sound_v2`, `prompt_influence` 0.6, `generations_count` 1, estimate first.
  - Create each node with `estimate_only`.
  - Set `model_parameters.duration_seconds` via `creative_update_node` (the duration is not a generate argument; SRE NOTES).
  - Then call `creative_run_flow_nodes`.

| id | Prompt | Seconds |
|---|---|---|
| capsule-tick | tiny soft glassy tick, single, close, dry | 0.3 |
| seam-seat | precise machined part seating into place, small metallic click with soft ceramic body | 0.6 |
| sweep-shimmer | very soft airy shimmer, light passing across polished metal, no whoosh | 1.2 |
| heavy-click | heavy precise mechanical click of two machined parts locking, satisfying, short low body | 0.9 |
| tone-ping | single soft sine-like ping, warm, short decay | 0.8 |
| typing-soft | quiet soft keyboard typing, a few keys, distant | 1.5 |
| gate-tick | small soft confirmation tick, UI, warm | 0.3 |
| plate-thud | low soft thud of a heavy slab settling on a surface, felt not heard | 1.0 |
| footfall-soft | two soft footsteps on a hard studio floor, distant | 1.0 |

- [ ] **Step 3: Download** each to `assets/audio/sfx/<id>.wav` with `scripts/el_fetch.py`. Write `data/sfx.json` and check it:

```bash
python3 -c "
import json;f=json.load(open('source/frames.json'));s=json.load(open('data/sfx.json'))
need={x for fr in f for x in fr['sfx']};print('missing', sorted(need-set(s)) or 'none')"
```

Expected: `missing none`.

---

## Wave 2

### Task 18: Insert reference stills (Grok 4.7)

**Files:**
- Create: `compositions/inserts/{M0,M1,M2,M3}.html`
- Create: `assets/inserts/<id>/ref-first.png`, `assets/inserts/<id>/ref-last.png`
- Create: `data/inserts.json`

**Context:** Same as Task 9: index, Torbit the stage or insert HTML, edit the returned line range, index again before a follow-up query. Do not Sourcegraph-search shared/stage until NOTES.md records that the T8 commit was pushed.

**Interfaces:**
- Consumes: `shared/stage/*`, the Direction lock, `data/timing.json` (for the shot each insert covers).
- Produces `data/inserts.json`:
  ```json
  {"M1": {"frame": "F03", "max": 1.6, "material": "pink satin ceramic",
          "first": "assets/inserts/M1/ref-first.png", "last": "assets/inserts/M1/ref-last.png"}, …}
  ```
  Task 19 fills `gemini_first`, `gemini_last`, `veo`, `final`, and `cost`.

**Skills:** as Task 8.

- [ ] **Step 1: Build one 2 s macro composition per insert** on the shared stage, matching spec §10 exactly:
  - **M1:** 85 mm, 0.35 m from the fourth quarter's seam. The seat happens across the 2 s.
  - **M2:** the center tab mating at the click, with the joint pulse.
  - **M3:** a slow surface sweep across the lavender-to-pink joint.
  - **M0:** the lavender right edge as the key wakes.

  Aperture is double the Direction lock's value, for macro depth of field. No type, no panels, no capsules.

- [ ] **Step 2: Render and extract the first and last frames at 4K**

```bash
cd /Users/swami/Documents/Stackgen_Website_Redesign/videos/aof-concept-film && export PATH=/opt/homebrew/opt/node@22/bin:$PATH
for m in M0 M1 M2 M3; do
  mkdir -p assets/inserts/$m
  npx --yes hyperframes@0.8.103 render . -c compositions/inserts/$m.html --fps 30 --quality high -o renders/frames/insert-$m.mp4
  ffmpeg -loglevel error -y -ss 0 -i renders/frames/insert-$m.mp4 -frames:v 1 assets/inserts/$m/ref-first.png
  ffmpeg -loglevel error -y -sseof -0.04 -i renders/frames/insert-$m.mp4 -frames:v 1 assets/inserts/$m/ref-last.png
done
ffprobe -v error -select_streams v -show_entries stream=width,height -of csv=p=0 assets/inserts/M1/ref-first.png
```

Expected: `3840,2160`. Write `data/inserts.json` with the four entries.

### Task 19: Gemini → Veo → Topaz chain (orchestrator) → Gate D

**Files:**
- `assets/inserts/<id>/{first,last}.png` (Gemini)
- `assets/inserts/<id>/veo.mp4`
- `assets/inserts/<id>/final.mp4`
- `data/inserts.json`
- `NOTES.md`

**Skills:** `veo` (prompt grammar only), `media-use` (`references/media-treatments.md`).

- [ ] **Step 1: Pick a bucket.** Veo reads its two stills from `gs://` URIs.
  - With the gcloud MCP, run `gcloud storage buckets list --format="value(name)"` and show the user the list.
  - The user names the bucket. Never create one without the user's yes.
  - Record it in `NOTES.md`.

- [ ] **Step 2: Material stills (Gemini MCP).** For each insert and each of `first` and `last`, call `gemini_image_generation` with:
  - `model: "gemini-3-pro-image"`
  - `image_size: "4K"`
  - `aspect_ratio: "16:9"`
  - `images: ["<abs path>/assets/inserts/<id>/ref-<first|last>.png"]`
  - `output_directory: "<abs path>/assets/inserts/<id>"`
  - `output_filename: "<first|last>.png"`
  - `gcs_bucket_uri: "<bucket>/aof-inserts/<id>/"`
  - `prompt`: the spec §10 template with the insert's material filled in

  That is 8 calls, or 6 if the user drops M0. Report the cost before the first call if the MCP shows one. Never repeat a call.

  Check each output with `ffprobe` (3840×2160). Then visually compare it with its reference: the same edges, tabs, and camera angle, and nothing from spec §6.9. A failed still goes to the user before anything is spent again.

- [ ] **Step 3: Motion (Veo MCP).** For each insert, call `veo_first_last_to_video` with:
  - `model: "veo-3.1-generate-001"`
  - `first_image_uri` / `last_image_uri`: the `gs://` paths from Step 2
  - `duration: 8`
  - `aspect_ratio: "16:9"`
  - `generate_audio: false`
  - `person_generation: "dont_allow"`
  - `num_videos: 1`
  - `output_directory: "<abs>/assets/inserts/<id>"`
  - `output_filename: "veo.mp4"`
  - `prompt`: motion only, for example *“Slow continuous macro camera creep to the right. A single soft light highlight travels left to right across the bevelled edge. The piece settles one millimetre into place at the end. No other motion, no new objects.”*

  Record the clip's `gs://` path.

- [ ] **Step 4: Upscale to 4K at 30 fps.**
  - **Primary:** sign a 2-hour URL for the clip with the gcloud MCP: `gcloud storage sign-url <gs path> --duration=2h`. Then call Apiframe `upscale_video` with `video: <signed url>`, `target_resolution: "4k"`, `target_fps: 30`, and poll `get_job` until COMPLETED. Download the result to `assets/inserts/<id>/final.mp4`.
  - **Fallback**, if signing fails: ElevenLabs.
    - Upload `veo.mp4` with the proven sequence: `creative_create_asset_upload`, PUT, `creative_finalize_asset_upload`.
    - Add a video node with model `topaz-video-upscale`, connected to the upload node, target 4K and 30 fps.
    - Estimate, run once, download with `scripts/el_fetch.py`.
  - **If artifacts remain after upscaling** (shimmer, smeared edges): show the user. With the user's yes, make one Apiframe `generate_video` call with `model: "seedance-2"`, `resolution: "4k"`, the two Gemini stills as `images`, and the same motion prompt.

- [ ] **Step 5: Verify every insert**

```bash
cd /Users/swami/Documents/Stackgen_Website_Redesign/videos/aof-concept-film
for m in M0 M1 M2 M3; do [ -f assets/inserts/$m/final.mp4 ] && ffprobe -v error -select_streams v -show_entries stream=width,height,r_frame_rate -of csv=p=0 assets/inserts/$m/final.mp4; done
```

Expected: `3840,2160,30/1` per insert. Write the paths, generation or job ids, and costs into `data/inserts.json` and `NOTES.md`.

- [ ] **Step 6: Gate D.** For each insert, show the user a side-by-side of `ref-first.png`, `first.png`, and a still from the middle of `final.mp4`, plus the clip itself. **STOP** until “Inserts pass.”

### Task 20: Storyboard, frame packets, shared timing (Composer 2.5)

**Files:**
- Create: `scripts/gen_timing_js.py`, `tests/test_gen_timing_js.py`, `shared/timing.js`
- Create: `STORYBOARD.md`, `SCRIPT.md`, `frame.md`, `.hyperframes/frame-packets/_role.md`, `.hyperframes/frame-packets/<NN>-<slug>.md` ×12

**Context:** Sourcegraph keyword_search "repo:^github\.com/swami086/Stackgen_Website_Redesign$ rev:film/aiden-sre-launch file:videos/aiden-sre-launch/STORYBOARD.md". Empty: local Read of that file.

**Interfaces:**
- Consumes: `data/timing.json`, `source/*`, spec §6–§7.
- Produces:
  - `shared/timing.js`: `export const TIMING = {...}`, the full `data/timing.json`; `export const FRAME = (id) => …`; `export const cue = (id, key, lang) => local seconds`.
  - One packet per frame.

**Skills:** `product-launch-video` (Steps 4–5), `hyperframes/references/subagent-dispatch.md`.

- [ ] **Step 1: Failing test** `tests/test_gen_timing_js.py`:

```python
import json
from gen_timing_js import timing_js


def test_timing_js_exposes_local_cue_helper():
    t = {"total": 10, "frames": [{"id": "F01", "start": 2.0, "dur": 6.0, "vo": {"en": 2.3, "es": 2.3},
                                  "cues": [{"key": "k", "en": 3.3, "es": 3.9}], "hits": []}]}
    js = timing_js(t)
    assert js.startswith("export const TIMING = ")
    assert "export const FRAME" in js and "export const cue" in js
    body = js.split("export const TIMING = ", 1)[1].split(";\n", 1)[0]
    assert json.loads(body)["frames"][0]["cues"][0]["es"] == 3.9
```

- [ ] **Step 2: Write `scripts/gen_timing_js.py`**

```python
#!/usr/bin/env python3
"""Write shared/timing.js from data/timing.json so compositions never fetch JSON."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def timing_js(t):
    return ("export const TIMING = " + json.dumps(t, ensure_ascii=False) + ";\n"
            "export const FRAME = (id) => TIMING.frames.find((f) => f.id === id);\n"
            "export const cue = (id, key, lang) => {\n"
            "  const f = FRAME(id); const c = f.cues.find((x) => x.key === key);\n"
            "  return +(c[lang] - f.start).toFixed(3);\n"
            "};\n"
            "export const hit = (id, label) => {\n"
            "  const f = FRAME(id); const h = f.hits.find((x) => x.label === label);\n"
            "  return +(h.t - f.start).toFixed(3);\n"
            "};\n")


if __name__ == "__main__":
    t = json.loads((ROOT / "data/timing.json").read_text())
    (ROOT / "shared/timing.js").write_text(timing_js(t))
    print("shared/timing.js written,", len(t["frames"]), "frames")
```

Run the test (expected `1 passed`), then `python3 scripts/gen_timing_js.py`.

- [ ] **Step 3: Write `STORYBOARD.md`** (HyperFrames storyboard format, `hyperframes/references/storyboard-format.md`). Per frame, use spec §7 verbatim for scene and actions, plus:
  - `duration` from `data/timing.json`
  - `voiceover` from `lines.en.json`
  - `src: compositions/frames/<NN>-<slug>.html`
  - `screens`, `inserts`, `sfx` from `source/frames.json`

  Write `SCRIPT.md` with the English and Spanish lines side by side.

- [ ] **Step 4: Write `frame.md`.** The frame-worker rules, from spec §6 verbatim:
  - tokens
  - type
  - materials
  - light
  - camera
  - panels
  - transitions
  - finish
  - signs of AI

  Add the Direction lock values.

- [ ] **Step 5: Write `.hyperframes/frame-packets/_role.md`** and one packet per frame. Each packet holds:
  - the §7 table for the frame
  - its `data/timing.json` entry
  - its cue keys and hit labels, with the `cue()` and `hit()` calls to use
  - its screens and their PNG paths
  - its inserts and their `final.mp4` paths, with max on-screen seconds
  - its SFX ids and paths
  - the transition in and out from the neighbouring frames' §7 rows

  Cap each packet at 48 KB:

```bash
find .hyperframes/frame-packets -name '*.md' -size +48k
```

Expected: no output.

---

## Wave 3 — Frames

### Frame composition contract (every frame, Tasks 21–22)

- **File:** `compositions/frames/<NN>-<slug>.html`.
- **Root element:**
  - `<div id="root" data-composition-id="<NN>-<slug>" data-width="3840" data-height="2160" data-duration="<dur from data/timing.json>">`
  - Inside it, `<canvas id="stage" class="clip" data-start="0" data-duration="<dur>">` sized 3840×2160.
  - DOM type layers above the canvas, as `.clip` elements with `data-start` and `data-duration`.
- **Imports:** exactly as `shared/stage/README.md`, plus:
  - `import { cue, hit, FRAME } from "./shared/timing.js";`
  - `<link rel="stylesheet" href="shared/film.css">`
- **Timing:**
  - Every word-anchored cue is placed at `cue("<Fnn>", "<key>", LANG)`. Every hit is placed at `hit("<Fnn>", "<label>")`.
  - Fixed-time cues use the §7 local time, scaled by `FRAME(id).dur / FRAME(id).john`, only when the frame grew by more than 10%.
- **Strings:** type comes from `STRINGS[LANG][key]` only. No literal film strings in the HTML.
- **Sound effects:** each one is an `<audio class="clip" src="assets/audio/sfx/<id>.wav" data-start="<local s>" data-duration="<len>" data-volume="<0..1>">` at the moment its §7 row names. Voice and music live in `index.html`, never in a frame.
- **Inserts:** each one is a `<video class="clip" src="assets/inserts/<id>/final.mp4" muted data-start="…" data-duration="≤ max">`. It is cut in on a beat or hit and covers the canvas full-frame.
- **Timeline registration:** `window.__timelines["<NN>-<slug>"] = tl; window.__timelines.main = tl;` then `bind(tl, stage)`.

### Task 21: F6 gold frame (Grok 4.7) → Gate E

**Files:** `compositions/frames/06-sre.html`, `renders/frames/06.mp4`, `renders/frames/06-with-vo-{en,es}.mp4`.

**Context:** Sourcegraph read_file videos/aiden-sre-launch/compositions/frames/10-investigation.html revision film/aiden-sre-launch. Local Read if that is empty. Index, then Torbit this frame's HTML and shared/stage for the node you will change. Edit that line range. Index again before confirming.

**Interfaces:**
- Consumes: packet `06-sre.md`, `source/figma/6a.png`, `6b.png`, `6c.png`, `shared/*`.
- Produces: the reference every other frame copies for stage setup, title frame, panel entry and exit, type reveals, SFX placement, and the timeline pattern.

**Skills:** `hyperframes-core`, `hyperframes-keyframes`, `hyperframes-animation`, `hyperframes-registry`, `emil-skills` → `apple-design`.

- [ ] **Step 1: Build F6** to the spec §7 F6 table and the packet. Required moves:
  - Remediate `lit` 0→1 over 0.6 s; the other three `grey` 0→1 over 0.6 s.
  - Camera arc to hero the quarter.
  - Title frame rising out of the quarter: the hairline `.film-frame` with corner ticks, eyebrow, name, and claim, each masked up 0.6 s `expo.out`, 0.6 s apart.
  - Panel 6a rises (0.9 s `power3.out`) to the rest pose `rx 0.0349, ry -0.0698`.
  - At `cue("F06","f06.6b",LANG)`, 6a slides left and recedes while 6b enters from the right.
  - Evidence rows light in turn. These are DOM highlight bars over the panel's canvas position, not edits to the PNG.
  - The confidence count to 94% is a DOM numeral placed over the PNG's numeral. Hide the PNG digits beneath it with an ink patch only if they would double.
  - Focus racks to the `v41` row, 0.6 s.
  - At `cue("F06","f06.6c",LANG)`, 6c enters, the Approve press is shown 1 px deep, and the label and status swap to the Approved and Resolved states.
  - At `cue("F06","f06.rail",LANG)`, the rail lights in turn and the panel sinks into the quarter (0.7 s `power2.in`).

  The Approved and Resolved states come from `source/figma/6c-approved.png` (Task 6 Step 1b). Cross-fade 6c to 6c-approved over 0.12 s under the 1 px press. Do not draw UI text in HTML except numerals that count. F08 and F11 use `8b-approved.png` and `11a-approved.png` the same way.

- [ ] **Step 2: Render and check**

```bash
cd /Users/swami/Documents/Stackgen_Website_Redesign/videos/aof-concept-film && export PATH=/opt/homebrew/opt/node@22/bin:$PATH
python3 scripts/gen_shared.py --lang en
npx --yes hyperframes@0.8.103 lint
npx --yes hyperframes@0.8.103 render . -c compositions/frames/06-sre.html --fps 30 --quality draft -o renders/frames/06.mp4
python3 scripts/qa_motion.py renders/frames/06.mp4
for p in 0.25 0.5 0.75; do ffmpeg -loglevel error -y -ss $(python3 -c "import json;f=[x for x in json.load(open('data/timing.json'))['frames'] if x['id']=='F06'][0];print(round(f['dur']*$p,2))") -i renders/frames/06.mp4 -frames:v 1 renders/frames/06-$p.png; done
```

Expected: lint 0 errors; `qa_motion` passes (no freeze over 0.6 s).

Open the three stills and one still at each cue time, and check them against spec §6.9.

- [ ] **Step 3: Voice previews.** Mux the frame with its line in each language at the voice start (0.3 s local):

```bash
for lang in en es; do
  python3 scripts/gen_shared.py --lang $lang
  npx --yes hyperframes@0.8.103 render . -c compositions/frames/06-sre.html --fps 30 --quality draft -o renders/frames/06-$lang.mp4
  ffmpeg -loglevel error -y -i renders/frames/06-$lang.mp4 -itsoffset 0.3 -i assets/audio/vo/$lang/L06.wav -map 0:v -map 1:a -c:v copy -c:a aac renders/frames/06-with-vo-$lang.mp4
done
python3 scripts/gen_shared.py --lang en
```

- [ ] **Step 4 (orchestrator): Opus 5.5 review, then Gate E.** Dispatch the reviewer at `claude-opus-5-5-high` with the review template, plus:
  - Apple-grade?
  - Homepage-native?
  - Do the cues land on their words in both languages?

  Show the user both voice previews. **STOP** until “Gold pass.”

  The orchestrator then writes the **F6 gold lock** below: the exact stage, title, panel, type, and SFX patterns that every other frame copies, with line references into `06-sre.html`.

**F6 gold lock:** written by the orchestrator at Gate E.

### Task 22: Frame workers (Grok 4.7, ≤ 8 at once)

**Files:** one `compositions/frames/<NN>-<slug>.html` and one `renders/frames/<NN>.mp4` per frame.

**Context:** Same as Task 21 for each frame HTML you change: index, Torbit, edit the line range, index again before the next query. Also local-read compositions/frames/06-sre.html. Do not read F6 from Sourcegraph until the T21 commit is recorded as pushed in NOTES.md.

**Batches:**
- **Batch 1 (8 at once):** F01, F02, F03, F04, F05, F07, F08, F09.
- **Batch 2 (3 at once):** F10, F11, F12.

Each worker gets the creative-code prompt template with `Your frame: F<NN> (<slug>)` and its packet.

**Per-frame extras the packet already holds, repeated here so workers never miss them:**
- **F01:** the dolly continues into F02 with no cut. End on the same camera state F02 starts from.
- **F02:** the capsule pile uses `capsules.mode = "pile"`. The figure is a group of cream capsules (torso, head, limbs), rim-lit, featureless, walking with a deterministic `sin(t)` gait.
- **F03 and F04:** cut inserts M1 and M2 per their `data/inserts.json` max and the F04 `click` hit.
- **F05:** four pulses at `hit("F05","pulse-1")` … `pulse-4`, in the order Remediate, Build, Operate, Observe.
- **F07, F08, F09:** use the gold-lock panel and title patterns. Each frame's own panel move follows the spec §7 header:
  - F07: pipeline in depth, with a dolly through it.
  - F08: a row lifts toward the camera.
  - F09: a crane down into the dashboard.
- **F10 and F11:** the plates are machined slabs added in-frame with `THREE.BoxGeometry` and the stage materials. They land on `hit("F10","plate")` and `hit("F11","plate-2")`.
- **F12:** the button follows the homepage primary button: cream fill, ink text, 0 radius, no shadow. M3 is optional and cut before the type. The end light drifts so nothing is fully still.

- [ ] **Step 1: Dispatch batch 1.** For each worker the orchestrator dispatches a Sonnet 5.5 reviewer when it reports. Failed review findings go back to the same frame's Grok worker, once per finding set.

- [ ] **Step 2: Dispatch batch 2** after batch 1 frees slots.

- [ ] **Step 3: Verify all twelve**

```bash
cd /Users/swami/Documents/Stackgen_Website_Redesign/videos/aof-concept-film
for f in renders/frames/0[1-9].mp4 renders/frames/1[0-2].mp4; do python3 scripts/qa_motion.py $f || echo "FAIL $f"; done
PATH=/opt/homebrew/opt/node@22/bin:$PATH npx --yes hyperframes@0.8.103 lint
```

Expected: no `FAIL` lines; lint 0 errors.

The orchestrator commits frames as each one passes review.

---

## Wave 4 — Assemble, subtitles, render, audit, deliver

### Task 23: Master index, language switch, mix (Composer 2.5)

**Files:**
- Create: `scripts/build_index.py`, `tests/test_build_index.py`
- Create: `index.html` (generated per language), `assets/audio/music/bed.fit.wav`, `assets/audio/sfx/room-tone.fit.wav`

**Context:** Sourcegraph read_file videos/aiden-sre-launch/index.html revision film/aiden-sre-launch for the audio and carve markup. Local Read if empty. Index, then Torbit this film's index.html and edit only the audio-node line range. Index again before a follow-up query.

**Interfaces:**
- Consumes: `data/timing.json`, `assets/audio/vo/<lang>/*.wav`, `assets/audio/music/bed.wav`, the music offset in `NOTES.md`.
- Produces: `build_index(timing, lang, vo_len, subs) -> str`. Task 24 calls it with `subs=True`, and Task 25 calls it for each render.

**Skills:** `product-launch-video` (Steps 5–6), `hyperframes-audio` (voiceover carve, `scripts/carve.mjs`).

- [ ] **Step 1: Failing test** `tests/test_build_index.py`:

```python
from build_index import build_index

T = {"total": 12.0, "music_offset": 0.0, "frames": [
    {"id": "F01", "slug": "software-factory", "line": "L01", "start": 0.0, "dur": 6.0, "vo": {"en": 0.3, "es": 0.3}},
    {"id": "F02", "slug": "quarters-drift", "line": "L02", "start": 6.0, "dur": 6.0, "vo": {"en": 6.3, "es": 6.3}}]}
LEN = {"L01": 4.1, "L02": 5.0}


def test_mounts_every_frame_at_its_start():
    html = build_index(T, "en", LEN, subs=False)
    assert 'data-composition-src="compositions/frames/01-software-factory.html"' in html
    assert 'data-composition-src="compositions/frames/02-quarters-drift.html" data-start="6.0" data-duration="6.0"' in html
    assert 'data-duration="12.0"' in html


def test_voice_clips_are_grouped_and_language_specific():
    html = build_index(T, "es", LEN, subs=False)
    assert html.count('data-audio-group="voiceover"') == 2
    assert 'src="assets/audio/vo/es/L02.wav" data-start="6.3" data-duration="5.0"' in html
    assert "assets/audio/vo/en/" not in html


def test_music_bed_carves_against_the_voice_group():
    html = build_index(T, "en", LEN, subs=False)
    assert 'id="music-bed"' in html and '"sources":["voiceover"]' in html


def test_subtitle_layer_only_when_asked():
    assert "subtitles.en.html" not in build_index(T, "en", LEN, subs=False)
    assert 'data-composition-src="compositions/subtitles.en.html"' in build_index(T, "en", LEN, subs=True)
```

- [ ] **Step 2: Write `scripts/build_index.py`**

```python
#!/usr/bin/env python3
"""Write index.html (the master) for one language from data/timing.json.
Usage: build_index.py --lang en|es [--subs]"""
import argparse
import json
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def build_index(t, lang, vo_len, subs):
    total = t["total"]
    rows = []
    for f in t["frames"]:
        nn = f["id"][1:]
        rows.append(f'      <div id="el-{f["id"]}" class="scene" data-composition-id="{nn}-{f["slug"]}" '
                    f'data-composition-src="compositions/frames/{nn}-{f["slug"]}.html" data-start="{f["start"]}" '
                    f'data-duration="{f["dur"]}" data-track-index="1"></div>')
        rows.append(f'      <audio id="vo-{f["line"]}" data-audio-group="voiceover" src="assets/audio/vo/{lang}/{f["line"]}.wav" '
                    f'data-start="{f["vo"][lang]}" data-duration="{vo_len[f["line"]]}" data-track-index="10" data-volume="1"></audio>')
    carve = json.dumps({"enabled": True, "sources": ["voiceover"], "strength": 0.8}, separators=(",", ":"))
    rows.append(f'      <audio id="music-bed" src="assets/audio/music/bed.fit.wav" data-start="0" data-duration="{total}" '
                f"data-track-index=\"11\" data-volume=\"1\" data-fx-carve='{carve}'></audio>")
    rows.append(f'      <audio id="room-tone" src="assets/audio/sfx/room-tone.fit.wav" data-start="0" data-duration="{total}" '
                f'data-track-index="12" data-volume="0.08"></audio>')
    if subs:
        rows.append(f'      <div id="subtitles" class="scene" data-composition-id="subtitles-{lang}" '
                    f'data-composition-src="compositions/subtitles.{lang}.html" data-start="0" data-duration="{total}" '
                    f'data-track-index="2"></div>')
    body = "\n".join(rows)
    return f"""<!doctype html>
<html lang="{lang}">
<head>
  <meta charset="utf-8">
  <link rel="stylesheet" href="shared/film.css">
  <style>html, body {{ margin: 0; background: #14110C; }}</style>
</head>
<body>
  <div id="root" data-composition-id="aof-concept-film" data-width="3840" data-height="2160" data-duration="{total}">
{body}
  </div>
  <script src="shared/vendor/gsap.min.js"></script>
  <script>
    window.__timelines = window.__timelines || {{}};
    window.__timelines["aof-concept-film"] = gsap.timeline({{ paused: true }}).to({{}}, {{ duration: {total} }});
  </script>
</body>
</html>
"""


def duration(path):
    return round(float(subprocess.check_output(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(path)])), 3)


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--lang", choices=["en", "es"], required=True)
    ap.add_argument("--subs", action="store_true")
    a = ap.parse_args()
    t = json.loads((ROOT / "data/timing.json").read_text())
    vo_len = {f["line"]: duration(ROOT / f"assets/audio/vo/{a.lang}/{f['line']}.wav") for f in t["frames"]}
    (ROOT / "index.html").write_text(build_index(t, a.lang, vo_len, a.subs))
    print("index.html", a.lang, "subs" if a.subs else "no subs", t["total"])
```

Run `python3 -m pytest tests/test_build_index.py -q`. Expected: `4 passed`.

- [ ] **Step 3: Fit the bed and the room tone** to the lock, using the Gate C3 offset:

```bash
cd /Users/swami/Documents/Stackgen_Website_Redesign/videos/aof-concept-film
OFF=$(python3 -c "import json;print(json.load(open('data/timing.json'))['music_offset'])")
TOT=$(python3 -c "import json;print(json.load(open('data/timing.json'))['total'])")
ffmpeg -loglevel error -y -ss $OFF -i assets/audio/music/bed.wav -t $TOT -af "afade=t=out:st=$(python3 -c "print($TOT-2)"):d=2" -ar 48000 -c:a pcm_s24le assets/audio/music/bed.fit.wav
ffmpeg -loglevel error -y -stream_loop -1 -i assets/audio/sfx/room-tone.wav -t $TOT -ar 48000 -c:a pcm_s24le assets/audio/sfx/room-tone.fit.wav
```

- [ ] **Step 4: Build, carve, check**

```bash
export PATH=/opt/homebrew/opt/node@22/bin:$PATH
python3 scripts/gen_shared.py --lang en && python3 scripts/build_index.py --lang en
node ~/.cursor/skills/hyperframes-audio/scripts/carve.mjs --comp index.html --bed music-bed
npx --yes hyperframes@0.8.103 lint && npx --yes hyperframes@0.8.103 check
```

Expected: carve reports one bed and the `voiceover` group; lint and check show 0 errors.

- [ ] **Step 5: Draft preview** for both languages, at 1080 for speed:

```bash
for lang in en es; do
  python3 scripts/gen_shared.py --lang $lang && python3 scripts/build_index.py --lang $lang
  node ~/.cursor/skills/hyperframes-audio/scripts/carve.mjs --comp index.html --bed music-bed
  npx --yes hyperframes@0.8.103 render . --fps 30 --quality draft -o renders/preview-$lang.mp4
  python3 scripts/qa_loudness.py renders/preview-$lang.mp4
done
```

Expected: both render; integrated loudness within −16 ±1 LUFS. If it is out of range, adjust only `music-bed` `data-volume` and rerun. Never change voice gain per line.

### Task 24: Subtitles (Composer 2.5) → Gate F

**Files:**
- Create: `scripts/build_subs.py`, `tests/test_build_subs.py`
- Create: `renders/aof-homepage-en.vtt`, `renders/aof-es.vtt`, `compositions/subtitles.en.html`, `compositions/subtitles.es.html`

**Context:** Torbit or local Read under videos/aof-concept-film only. No Sourcegraph.

**Interfaces:**
- Consumes: `data/timing.json`, `source/lines.{en,es}.json`, `assets/audio/vo/<lang>/<Lxx>.words.json`.
- Produces:
  - `align(script_text, words) -> [{"text","start","end"}]`, which puts locked script words on transcript times.
  - `chunks(words, limit=42)`, `cues_for(timing, aligned_by_line, lang)`, `vtt(rows) -> str`, `subs_html(rows, lang, total) -> str`.

**Skills:** `media-use`, superpowers `test-driven-development`.

- [ ] **Step 1: Failing tests** `tests/test_build_subs.py`:

```python
from build_subs import align, chunks, cues_for, vtt, ts


def test_align_uses_script_words_with_transcript_times():
    words = [{"text": "Meet", "start": 0.0, "end": 0.3}, {"text": "Aden", "start": 0.35, "end": 0.7}]
    out = align("Meet Aiden.", words)
    assert [w["text"] for w in out] == ["Meet", "Aiden."]
    assert out[1]["start"] == 0.35


def test_chunks_break_at_sentence_end_and_length():
    ws = [{"text": t, "start": i, "end": i + 0.5} for i, t in enumerate("One two three. Four five".split())]
    assert [[w["text"] for w in c] for c in chunks(ws, limit=42)] == [["One", "two", "three."], ["Four", "five"]]
    long = [{"text": "abcdefghij", "start": i, "end": i + 0.5} for i in range(6)]
    assert all(len(" ".join(w["text"] for w in c)) <= 42 for c in chunks(long, limit=42))


def test_cues_never_overlap():
    t = {"frames": [{"line": "L01", "vo": {"en": 1.0}}]}
    aligned = {"L01": [{"text": "A.", "start": 0.0, "end": 0.5}, {"text": "B.", "start": 0.52, "end": 1.0}]}
    rows = cues_for(t, aligned, "en")
    assert rows[0]["end"] <= rows[1]["start"]


def test_vtt_format():
    assert ts(75.5) == "00:01:15.500"
    assert vtt([{"start": 1.0, "end": 2.0, "text": "Hola"}]).startswith("WEBVTT\n\n1\n00:00:01.000 --> 00:00:02.000\nHola\n")
```

- [ ] **Step 2: Write `scripts/build_subs.py`**

```python
#!/usr/bin/env python3
"""Subtitles from the locked script on transcript timings.
Usage: build_subs.py --lang en|es   -> renders/<name>.vtt and compositions/subtitles.<lang>.html"""
import argparse
import difflib
import json
import re
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
GAP = 0.04
MIN_DUR = 1.0


def norm(w):
    w = unicodedata.normalize("NFKD", w).encode("ascii", "ignore").decode()
    return re.sub(r"[^a-z0-9]", "", w.lower())


def align(script_text, words):
    toks = script_text.split()
    a, b = [norm(t) for t in toks], [norm(w["text"]) for w in words]
    times = [None] * len(toks)
    for tag, i1, i2, j1, j2 in difflib.SequenceMatcher(a=a, b=b, autojunk=False).get_opcodes():
        if tag in ("equal", "replace") and i2 - i1 == j2 - j1:
            for k in range(i2 - i1):
                times[i1 + k] = (words[j1 + k]["start"], words[j1 + k]["end"])
    for i in range(len(times)):
        if times[i] is None:
            prev = next((times[j] for j in range(i - 1, -1, -1) if times[j]), (0.0, 0.0))
            nxt = next((times[j] for j in range(i + 1, len(times)) if times[j]), (prev[1], prev[1]))
            times[i] = (prev[1], max(prev[1], nxt[0]))
    return [{"text": t, "start": s, "end": e} for t, (s, e) in zip(toks, times)]


def chunks(words, limit=42):
    out, cur = [], []
    for w in words:
        if cur and len(" ".join(x["text"] for x in cur + [w])) > limit:
            out.append(cur)
            cur = []
        cur.append(w)
        if w["text"].endswith((".", "?", "!")):
            out.append(cur)
            cur = []
    if cur:
        out.append(cur)
    return out


def cues_for(timing, aligned, lang):
    rows = []
    for f in timing["frames"]:
        base = f["vo"][lang]
        for c in chunks(aligned[f["line"]]):
            start = round(base + c[0]["start"], 3)
            rows.append({"start": start, "end": round(max(base + c[-1]["end"] + 0.1, start + MIN_DUR), 3),
                         "text": " ".join(x["text"] for x in c)})
    for a, b in zip(rows, rows[1:]):
        a["end"] = round(min(a["end"], b["start"] - GAP), 3)
    return rows


def ts(t):
    h, rem = divmod(t, 3600)
    m, s = divmod(rem, 60)
    return f"{int(h):02d}:{int(m):02d}:{s:06.3f}"


def vtt(rows):
    return "WEBVTT\n\n" + "\n".join(f"{i}\n{ts(r['start'])} --> {ts(r['end'])}\n{r['text']}\n" for i, r in enumerate(rows, 1))


def subs_html(rows, lang, total):
    clips = "\n".join(
        f'    <div class="clip film-sub sub" data-start="{r["start"]}" data-duration="{round(r["end"] - r["start"], 3)}">'
        f'{r["text"]}</div>' for r in rows)
    return f"""<!doctype html>
<html lang="{lang}"><head><meta charset="utf-8"><link rel="stylesheet" href="shared/film.css">
<style>
  .sub {{ position: absolute; left: 0; right: 0; bottom: 56px; height: 104px; display: flex;
          align-items: center; justify-content: center; text-align: center; }}
</style></head>
<body>
  <div id="root" data-composition-id="subtitles-{lang}" data-width="3840" data-height="2160" data-duration="{total}">
{clips}
  </div>
  <script src="shared/vendor/gsap.min.js"></script>
  <script>
    window.__timelines = window.__timelines || {{}};
    window.__timelines["subtitles-{lang}"] = gsap.timeline({{ paused: true }}).to({{}}, {{ duration: {total} }});
  </script>
</body></html>
"""


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--lang", choices=["en", "es"], required=True)
    a = ap.parse_args()
    t = json.loads((ROOT / "data/timing.json").read_text())
    lines = {l["id"]: l["text"] for l in json.loads((ROOT / f"source/lines.{a.lang}.json").read_text())}
    aligned = {f["line"]: align(lines[f["line"]], json.loads(
        (ROOT / f"assets/audio/vo/{a.lang}/{f['line']}.words.json").read_text())) for f in t["frames"]}
    rows = cues_for(t, aligned, a.lang)
    name = "aof-homepage-en" if a.lang == "en" else "aof-es"
    (ROOT / f"renders/{name}.vtt").write_text(vtt(rows))
    (ROOT / f"compositions/subtitles.{a.lang}.html").write_text(subs_html(rows, a.lang, t["total"]))
    print(a.lang, len(rows), "cues")
```

Run the tests. Expected: `4 passed`.

- [ ] **Step 3: Build both languages and check the band**

```bash
python3 scripts/build_subs.py --lang en && python3 scripts/build_subs.py --lang es
PATH=/opt/homebrew/opt/node@22/bin:$PATH npx --yes hyperframes@0.8.103 lint
```

Render a draft of each language with `build_index.py --subs`, as in Task 23 Step 5, writing `renders/preview-<lang>-subs.mp4`.

Check stills at five cue times per language:
- Subtitles sit in the lower 160 px band (4K) and never overlap film type.
- No line runs past 42 characters.

- [ ] **Step 4 (orchestrator): Gate F.** Show the user all four previews: EN, ES, EN with subtitles, ES with subtitles. **STOP** until “Preview pass.” Frame fixes go to that frame's Grok worker; mix fixes go to Task 23.

### Task 25: Render, finish, cut-downs, QA (Composer 2.5)

**Files:** every delivery file in spec §11.4, plus `scripts/finish.sh`.

**Context:** Torbit or local Read under videos/aof-concept-film only. No Sourcegraph.

**Skills:** `hyperframes-cli`, superpowers `verification-before-completion`.

- [ ] **Step 1: Write `scripts/finish.sh`.** It applies the spec §6.8 finish: vignette 12% and grain 3% luma, with a fixed seed so it is deterministic. Audio passes through.

```bash
#!/usr/bin/env bash
# Finish one 4K render: grain + vignette, H.264 high. Usage: finish.sh IN.mov OUT.mp4
set -euo pipefail
ffmpeg -loglevel error -y -i "$1" \
  -vf "vignette=angle=PI/6:mode=backward,noise=c0s=4:c0f=t:all_seed=7,format=yuv420p" \
  -c:v libx264 -profile:v high -preset slow -crf 14 -r 30 -c:a aac -b:a 320k -movflags +faststart "$2"
ffprobe -v error -show_entries stream=codec_name,width,height,r_frame_rate -show_entries format=duration -of compact "$2"
```

- [ ] **Step 2: Three 4K renders**

```bash
cd /Users/swami/Documents/Stackgen_Website_Redesign/videos/aof-concept-film && export PATH=/opt/homebrew/opt/node@22/bin:$PATH
chmod +x scripts/finish.sh
render () {  # lang, subs flag, out
  python3 scripts/gen_shared.py --lang $1 && python3 scripts/build_index.py --lang $1 $2
  node ~/.cursor/skills/hyperframes-audio/scripts/carve.mjs --comp index.html --bed music-bed
  npx --yes hyperframes@0.8.103 render . --fps 30 --quality high -o renders/$3.mov
  scripts/finish.sh renders/$3.mov renders/$3.mp4
}
render en "" master-en-4k
render en --subs social-en-4k-subs
render es --subs master-es-4k
python3 scripts/gen_shared.py --lang en && python3 scripts/build_index.py --lang en
```

The last line leaves the working tree on English.

- [ ] **Step 3: 1080p cut-downs**

```bash
d () { ffmpeg -loglevel error -y -i renders/$1.mp4 -vf "scale=1920:1080:flags=lanczos" -c:v libx264 -profile:v high -preset slow -crf 16 -c:a copy -movflags +faststart renders/$2.mp4; }
d master-en-4k aof-homepage-en-1080
d social-en-4k-subs aof-social-en-1080-subs
d master-es-4k aof-bogota-es-1080
```

- [ ] **Step 4: QA every file**

```bash
TOT=$(python3 -c "import json;print(json.load(open('data/timing.json'))['total'])")
for f in master-en-4k master-es-4k aof-homepage-en-1080 aof-social-en-1080-subs aof-bogota-es-1080; do
  ffprobe -v error -select_streams v -show_entries stream=width,height,r_frame_rate -show_entries format=duration -of csv=p=0 renders/$f.mp4
  python3 scripts/qa_loudness.py renders/$f.mp4
done
python3 scripts/qa_motion.py renders/master-en-4k.mp4
python3 -c "import sys;t=$TOT;sys.exit(0 if t<=300 else 1)" && echo "Bogotá length OK"
```

Expected:
- 4K files report `3840,2160,30/1`; 1080 files report `1920,1080,30/1`.
- Every duration is within one frame (0.034 s) of the lock total.
- Loudness is −16 ±1 LUFS with true peak ≤ −1 dBTP.
- `qa_motion` passes.
- `Bogotá length OK`.

### Task 26: Audit and fix loop (Opus 5.5 audit, Grok 4.7 fixes)

**Files:** `renders/audit.md`, plus fixes in the frames the ledger names.

**Context:** Torbit or local Read under videos/aof-concept-film only. No Sourcegraph.

**Skills:** `hyperframes-skills` → `video-production-audit`; `emil-skills` → `review-animations`; `critique-composition`; `critique-visual-hierarchy`.

- [ ] **Step 1:** Dispatch the auditor at `claude-opus-5-5-high`. It runs `video-production-audit` on `master-en-4k.mp4` and `master-es-4k.mp4` and writes one defect ledger to `renders/audit.md`. Each row has:
  - frame
  - time
  - defect
  - spec clause
  - severity (Critical / Important / Minor)

  Spec §6.9 failures are always Critical.

- [ ] **Step 2:** Every Critical and Important row goes to that frame's Grok 4.7 worker with the row text. The worker fixes it, rerenders its frame, and reruns `qa_motion`.

- [ ] **Step 3:** Rerun Task 25 for the affected files. Then rerun Step 1 on them only.

- [ ] **Step 4:** At most two rounds. If Critical or Important rows remain after the second round, show the ledger to the user and ask how to proceed.

### Task 27: Deliver (orchestrator) → Gate G

- [ ] **Step 1:** Show the user:
  - the five delivery files and the VTT
  - the clean audit ledger
  - spend per vendor, from `NOTES.md`
  - the World Model flag (spec §16): whether Raj has confirmed that agents read each other's World Model entries. If not confirmed, ask whether F10 ships as is or the L10 line and the chip are softened.

- [ ] **Step 2: Gate G.** **STOP** until “Ship.”

- [ ] **Step 3:** Draft two Slack messages: John (the homepage file and the VTT) and Endy (the Bogotá file). Send only with the user's yes.

- [ ] **Step 4:** Save an OpenMemory entry: the delivery paths, gate outcomes, and lessons. Commit:

```bash
git add videos/aof-concept-film docs/superpowers/plans/2026-10-03-aof-concept-film.md
git commit -m "feat(aof-film): ship EN homepage and ES Bogotá cuts" -- videos/aof-concept-film docs/superpowers/plans/2026-10-03-aof-concept-film.md
```

Renders over 100 MB stay out of git. Add them to `videos/aof-concept-film/.gitignore` (`renders/*.mov`, `renders/master-*.mp4`) before the first render commit.

---

## Self-review (writing-plans)

**Spec coverage.**

| Spec section | Tasks |
|---|---|
| §2 hard rules | Global Constraints |
| §4 Figma | T4–T7 (11 screens plus 3 approved-state variants the frames need for state swaps) |
| §5 generators | T19 |
| §6 look | T8, T9, T20 `frame.md` |
| §7 animation | T20 packets, T21, T22 |
| §8 script | T2, T3 |
| §9 sound | T10–T17, T23 |
| §10 inserts | T18, T19 |
| §11 build and delivery | T23–T25 |
| §12 gates | S (T3), A (T6), B (T9), C1 (T11), C2 (T13), C3 (T15), D (T19), E (T21), F (T24), G (T27) |
| §13 models | Model routing |
| Context tools | Context tools section. Sourcegraph on origin with rev:film/aiden-sre-launch. Torbit for HyperFrames HTML line ranges. Index immediately before every Torbit query, including after an edit. |
| §14 skills | the **Skills** line on every task |
| §16 open flags | Peach and Chrome session (T4), Bogotá date (T3), World Model (T27) |

**Spec edits made while planning.**
- §6.8: grain and vignette are a fixed-seed ffmpeg finish pass, as on the SRE film.
- §9.7: music uses the HyperFrames group carve rather than a flat −6 dB duck.

**Code checked before writing this plan.** Every Python block in Tasks 2, 3, 8, 10, 14, 20, 23, and 24 was extracted from this file and run with its tests in a scratch directory: 33 passed. That includes the contract tests against this plan's own `frames.json`, `lines.en.json`, `strings.en.json`, and `cues.json`.

**Proven only at execution.**
- How three.js and GSAP interact when a frame is seeked inside the master. Task 8 Step 10 proves it, with a named fallback.
- Whether `hyperframes transcribe` takes a language flag (Task 13 Step 1).
- The `gs://` bucket and URL signing for Veo and Apiframe (Task 19 Steps 1 and 4).
