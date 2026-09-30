# Aiden SRE V10 Gate F — Figma authenticity screens

> **For agentic workers:** Gate F only. **STOP for user Figma pass** before HyperFrames (Gate B).

**Goal:** High-fidelity authentic UI masters on Figma for HyperFrames plate inputs.

**Architecture:** Capture/Mobbin/Firecrawl → Figma authenticity board → user **Figma pass** → export `assets/` → HyperFrames. No invented chrome.

**Tech Stack:** Figma MCP · Mobbin MCP · firecrawl-cli · Chrome stage (Aiden) · video-gated-product-demo Gate F

## Global Constraints

- Accurate replication of authentic screens is very, very important
- SoT: live Html→Figma > live screenshot > Mobbin `image_url` > honest traced recreate
- Never stub rectangles as product UI; never low-res Mobbin previews as fills
- File: `YUgx6CRwXJT0s7Vz9BRHAV` page `V10 RCA — Gate F`
- Masters target ~1920×1080 story pixels; board thumbs may scale

## Screen checklist

| # | Surface | Status | Source |
|---|---------|--------|--------|
| 1 | Aiden Alerts | ✅ `6:144` | Html→Figma live |
| 2 | Aiden Investigation | ✅ `3:9` | stage `rca-deep` PNG — **prefer Html→Figma replace** |
| 3 | Datadog Log Explorer | ✅ editable `25:2` (Tools) + `18:2` (row) | Fully editable TEXT — PNG PH removed |
| 4 | GitHub Actions failed | ✅ editable `25:120` + `19:70` | Fully editable TEXT — Mobbin PNG PH removed |
| 5 | kubectl CrashLoop | ✅ editable `25:189` + `19:2` | Fully editable TEXT — Railway PNG PH removed |
| 6 | Slack `#incidents` | ✅ editable `27:2` (authentic) | Top search + rail + Threads/Channels/DMs/Apps + composer — Mobbin chrome; story RCA copy |

**Tools row:** zero IMAGE fills on masters. REF row `16:194–197` stays PNG stills (labeled `REF ONLY`).  
**Investigation `3:9`:** still stage PNG — replace via Html→Figma when ready.

**Editable row:** `15:82` — fully editable Inter frames (not PNG fills)  
**Ref stills row:** `16:198` Firecrawl/Mobbin PNGs  

Board: https://www.figma.com/design/YUgx6CRwXJT0s7Vz9BRHAV/Untitled?node-id=3-2

**STOP** — await user **Figma pass** before HyperFrames.


## Tasks

### Task 1: Investigation master
- [ ] Clear stale overlay on `3:9`
- [ ] Upload authentic investigation still (stage SoT)
- [ ] Label as Investigation master

### Task 2: Datadog
- [x] Firecrawl/Mobbin search for Logs Explorer chrome
- [x] Editable master `18:2` (Watchdog + story logs)

### Task 3: GitHub Actions
- [x] Mobbin failed Actions run
- [x] Editable master `19:70`

### Task 4: Kubernetes
- [x] Firecrawl Sysdig + Komodor YT CrashLoop refs
- [x] Editable master `19:2` (`kubectl get/describe`)

### Task 5: Slack
- [x] Mobbin aubergine channel
- [x] Editable master `21:2` (`#incidents` Aiden RCA)

### Task 6: Layout + prove
- [x] Editable row `15:82` + ref row `16:198`
- [x] `get_screenshot` each master
- [ ] **STOP** — await **Figma pass**
