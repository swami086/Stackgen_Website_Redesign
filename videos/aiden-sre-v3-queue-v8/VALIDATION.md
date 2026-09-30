# VALIDATION — aiden-sre-v3-queue-v8

| Gate | Status | Evidence | Pass phrase |
|------|--------|----------|-------------|
| A Script | **PASS** | SCRIPT.md v8.0 · check_ai_signs 0 · 124w ~53s | Gate A pass |
| B Plate | **PASS** | plate-a 26s + plate-b 19s silent · snapshots/plate-{a,b}/ | Gate B pass |
| C Clueso | **PASS** | SCRIPT v8.4 · settle + soft open · scenario + stay on real incidents close · [Preview](https://web.clueso.io/guide/267a94dc-0582-44c9-8b49-99e804912488) | Gate C pass (export ask) |
| Export | **started** | 1080p · 30fps · no captions · Exports tab | explicit export ask |

## Notes

### 2026-09-25 Gate B — plate check results

**plate-a.html** (beats 1–3, 26s, `data-composition-id="plate-a"`):
- lint: 0 errors · 3 warnings (`composition_file_too_large` — advisory, non-blocking)
- runtime: PASS
- layout: PASS (0 errors)
- contrast: 78 errors — **non-blocking** · all from Jira Cloud UI palette (`--jira-n100 #758195`, `--jira-n200 #626F86` on `#fff` background). Same colors used in archive v3-frontdoor. WCAG AA ratio ~3.0–4.0; design fidelity requires Jira's actual tokens. Not a render blocker in non-strict mode.

**plate-b.html** (beats 5–7, 19s, `data-composition-id="plate-b"`):
- lint: 0 errors · 0 warnings
- runtime: PASS
- layout: PASS (0 errors — fixed by adding `data-layout-allow-occlusion data-layout-allow-overlap` to `#end-card`, `data-layout-allow-occlusion` to `#scene-done`/`#scene-montage`, and switching to scene-done before end-card fade-in, mirroring archive pattern)
- contrast: PASS

**CLI pin:** hyperframes@0.8.40 · latest 0.8.74 available (not upgraded — task pins 0.8.40)

### 2026-09-25 Gate B — render + snapshot evidence (Task 4)

**Renders:**
- `renders/plate-a.mp4` · 7.0 MB · ffprobe duration: **26.000000s** · no audio stream ✓
- `renders/plate-b.mp4` · 5.7 MB · ffprobe duration: **19.000000s** · no audio stream ✓

**Snapshots — plate A (--at 5,14,22) → `snapshots/plate-a/`:**
- `snapshots/plate-a/frame-00-at-5s.png` — Jira list view, SRE Ticket Queue, 7 tickets, full titles visible ✓
- `snapshots/plate-a/frame-01-at-14s.png` — Jira list view, same state (steady hold) ✓
- `snapshots/plate-a/frame-02-at-22s.png` — Wide hold; full title "Build failed — no pipeline link" fully readable ✓ (timing fix applied 2026-09-25)
- `snapshots/plate-a/frame-03-at-25.22s.png` — end-of-timeline auto-frame (added by CLI)

**Snapshots — plate B (--at 4,10,16) → `snapshots/plate-b/`:**
- `snapshots/plate-b/frame-00-at-4s.png` — Jira ticket detail, "Build failed — no pipeline link", Aiden write-back text visible, DONE status ✓
- `snapshots/plate-b/frame-01-at-10s.png` — Jira list view filtered Assignee: Aiden, resolved tickets shown, all titles readable ✓
- `snapshots/plate-b/frame-02-at-16s.png` — End card overlay "The queue clears. / Try Aiden for SRE today" over dimmed Jira — intentional CTA, not a caption pill ✓
- `snapshots/plate-b/frame-03-at-18.43s.png` — end-of-timeline auto-frame (added by CLI)

**Visual check notes:**
- No caption/pill UI artifacts visible in any frame ✓
- No montage cards ✓
- Plate A frame-02-at-22s.png (re-rendered): full title "Build failed — no pipeline link" visible — wide hold confirmed via vision ✓
- All other frames: Jira UI only, full-bleed, all titles in list view fully readable ✓

**plate-a re-render details (2026-09-25 fix):**
- Timing change: beat-3 zoom-out duration shortened from 0.95s to 0.45s (start still t=21.5); OUT completes at ~21.95s → t=22 is wide hold
- ffprobe: `renders/plate-a.mp4` duration **26.000000s** · no audio ✓
- Peak times: A @ 5, 14, 22 (unchanged) · B @ 4, 10, 16 (unchanged)

**Awaiting Gate B pass from controller before starting Task 5 (Clueso).**

## Dead-air trim (2026-09-25)

Cause: clip durations locked to plate lengths (26/10/19) while VO ended earlier → silence before each dissolve.

Fix (skill-picker → `demo-cutdown` signal; executed via `polish-screen-demo` cut-dead-time recipe):
- Clip durations → speech last-word + ~0.5s breath: 21.4 / 6.6 / 16.1
- Dissolves 0.4 → 0.25s
- Regenerated Chris VO so voiceover_duration matches clip
- BGM guide_end_time → 45s
- Total ~44.1s (was 55s)

Preview: https://web.clueso.io/guide/267a94dc-0582-44c9-8b49-99e804912488
