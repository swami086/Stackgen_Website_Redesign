# AOF Concept Film — Design

**Status:** Design approved in conversation, 3 Oct 2026, section by section. Not built.
**Project:** `videos/aof-concept-film/` (new). HyperFrames 0.8.103 on Node 22, same pin as `videos/aiden-sre-launch/`.
**Story source:** John’s homepage storyboard, 25 Sept 2026. [Visual board](https://drive.google.com/file/d/1YbNf9XchVrp3g4v7wNoJsmLIi_fMFTWR/view), [voiceover doc](https://docs.google.com/document/d/1D9EZLh3_S2jFOVf2Zr1viyeVlVrY6kwS/edit). Twelve frames, 138.74 s before the beat fit.
**Quality bar:** Apple, [Introducing the new iPhone 18 Pro](https://www.youtube.com/watch?v=Q3zwkxqh1t0). One physical hero object, studio light moving across its materials, one motivated camera move per shot, very little type.
**Home:** [stackgen.com](https://stackgen.com/). The film must sit on the homepage without looking like a different site.
**Two versions:** English for the homepage. Spanish for the DevOpsDays Bogotá main screen, 23 Oct 2026, played once with no speaker.
**Replaces:** the earlier one-page concept-film spec at this path.

## 1. Decisions

| Topic | Decision |
|---|---|
| Pipeline | Five stages, each a hard gate. Figma first. |
| Picture | Hybrid. Every jigsaw move and camera move is real-time three.js in HyperFrames. Generated media only for three or four macro material inserts. |
| Hero object | A machined jigsaw on the ink stage. Software Factory piece and four Operations Factory quarters, lit like a product shot. |
| Product screens | Designed in Figma from the six SRE film frames. Dark theme, matching the homepage Command Center. English in both cuts. |
| Screen story | The homepage scenario on every screen: `payments-api` 5xx, deploy `v41` on `checkout-worker`, rollback. |
| Master | 3840×2160, 30 fps. 1920×1080 homepage and Bogotá files are cut down from it. |
| Voice | English: River (`SAz9YHcvj6GT2YYXdXww`) on `eleven_v4`. Spanish: a native Latin American voice, cast with Endy. |
| Music | New ElevenLabs score in the approved SRE palette: warm synth, felt piano, sub, brushed percussion. |
| Subtitles | English: sidecar VTT for the homepage player, plus a burned-in copy for social. Spanish: burned in on the Bogotá file. |
| End card | One flat cream button. “Schedule a demo.” Spanish: “Agenda una demo.” No URL. |
| Script | John’s 25 Sept lines, full length, with two replacements (§8). |

## 2. Hard rules

These hold in every stage and override any skill default.

1. **No generated UI, type, logos, or people.** Generators make material texture and light only.
2. **Figma owns every product pixel.** HyperFrames shows the exported PNG whole. It never rebuilds a screen in HTML. The SRE film proved why: HTML rebuilds broke fonts and stacked labels on their bodies.
3. **One source per job.** Figma for screens. HyperFrames for motion, time, and type. ElevenLabs for every sound. Gemini, Veo, and Apiframe for photographic texture.
4. **Each stage only reads the stage before it.** No stage edits an upstream file. An upstream change reopens that stage’s gate.
5. **Narration is never altered.** No time-stretch, no speed change, no head trim after transcription. A line that does not fit loses words.
6. **No sign of AI anywhere.** That covers script phrasing, voice artifacts, generated texture, and motion clichés. Details per stage below.
7. **Every move answers a word.** Each animation in §7 is tied to a word or beat in the voiceover.

## 3. How the tools feed each other

Five stages, in this order. Each writes files the next reads.

| Stage | Tool | Reads | Writes | Gate |
|---|---|---|---|---|
| 0. Script | Opus 5.5, `check_ai_signs.py`, Endy | §8 lines | `source/lines.en.json`, `source/lines.es.json` | S |
| 1. Product truth | Chrome DevTools (read-only), Figma MCP | Six SRE frames, live app tokens | Figma page “AOF concept film”, `source/figma/*.png` at 2× | A |
| 2. Direction | HyperFrames + three.js | Section 6 look, Figma PNGs | Four 4K style frames, `frame.md` | B |
| 3. Sound | ElevenLabs MCP | Locked lines | Takes, transcripts, score, SFX, `data/timing.json` (the lock) | C1–C3 |
| 4. Generated media | Gemini MCP, Veo MCP, Apiframe MCP | Timing lock, 4K three.js close-up renders | `assets/inserts/*.mp4` at 4K | D |
| 5. Build | HyperFrames | Everything above | Frame compositions, master, delivery files | E, F, G |

Stages 1, 2, and 3 run in parallel after gate S. Stage 4 and the frame builds start only after the timing lock.

The chain for generated inserts is one direction only:

1. HyperFrames renders the real three.js close-up as a 4K still.
2. Gemini 3 Pro Image turns it into photographic material. Geometry stays locked.
3. Veo 3.1 first-and-last-frame animates a light sweep between two of those stills.
4. Topaz on Apiframe upscales the clip to 4K.
5. HyperFrames cuts it in on the beat.

No step sends work back to an earlier tool.

## 4. Product truth — Figma (gate A)

**File and page.** The SRE film’s Figma file, `zpQTgAfsrkN6PI3eTHOb5p`. New page “AOF concept film,” next to the six base frames `48:2`, `51:2`, `54:2`, `58:2`, `61:2`, `64:2`.

**Layout of the page.** One row per film frame. Each screen carries a label naming its film frame and the voice line it illustrates.

**Base system.** Copied from the six SRE frames, never redrawn: the same app chrome and nav, IBM Plex Sans, hairline cards, row heights, and spacing. The theme is switched to dark to match the homepage Command Center.

- Approve stays product purple `#9e33ea`.
- Confirmation is a label and status swap. It is not a green fill.

**Size.** Every screen is 1920×886, the SRE frame size, and exports at 2× (3840×1772).

**Live check, read-only.** Chrome DevTools MCP opens the logged-in app and reads computed fonts, colors, spacing, and CSS transition durations and easing. Where Figma and the app differ, Figma wins for pixels and the live app wins for motion timing.

- No clicks that change state.
- The app has to be open and logged in, in the browser DevTools controls. Credentials are never typed. A login screen stops the task until the user signs in.

**Screens.**

| Film frame | Screen | Base | Content |
|---|---|---|---|
| F6 SRE | 6a Alert triage | `48:2` | `payments-api` 5xx rate above SLO, triaged P1, “2 pages suppressed,” queue count falling |
| F6 SRE | 6b Root cause | `58:2` | `v41` on `checkout-worker`, 94%, evidence rows |
| F6 SRE | 6c Remediation | `64:2` | Runbook RB-114, rollback and verify, Approve → Approved, “Resolved · 4m 12s,” “Learned sig_4f21” |
| F7 InfraOps | 7a Request to Terraform | new | Cursor request “prod-grade EKS for payments, EU,” golden module `company-golden/eks` 2.4.1, Terraform block |
| F7 InfraOps | 7b Policy and approval | new | “Checking 12 policies” to 12/12 (SOC 2, PCI), PR #2431 “Awaiting approval” |
| F8 DevOps | 8a Operations inbox | new | Tickets from ServiceNow, Jira, Linear; OPS-2291 “Roll back checkout-worker” on top |
| F8 DevOps | 8b Ticket detail | new | Triaged P2, `rollback-verify` 91% match, reasoning, L1 · L2 · L3 at L2, “Maya K. approved,” “Ticket resolved · 2m 29s · trace saved” |
| F9 Observability | 9a Integrations and dashboard | new | OpenTelemetry, Prometheus, Grafana; “Remote-write connected · 17.2M samples/hr”; monochrome integration tiles to 300+ |
| F9 Observability | 9b Ask Aiden | new, card from `58:2` | “Why is checkout failing?”, 5xx at 4.1%, “`v41` shipped 16s before,” likely-cause card, “Handed to Aiden for SRE” |
| F10 World Model | 10a Record | new | Deployed `v41`, 5xx spike, rollback, “rollback fixed checkout” |
| F11 Aiden OS | 11a Governance | new, approval from `64:2` | Policy check pass, approval request, audit log line for the same rollback |

Eleven screens in all. Three are re-skins of SRE frames, eight are new. All copy is real; there is no placeholder text.

**Integration tiles are monochrome.** That avoids the vendor-logo licensing problem raised on the SRE film. Grafana requires an attribution line and a licence for commercial use.

**Gate A checklist.**

- Every screen sits beside its base frame and shares its chrome, type, and spacing.
- No new component appears unless a base frame lacks it.
- Copy matches the table above and the homepage cards.
- Exports exist at `source/figma/<screen-id>.png`, 3840×1772.
- The user says “Figma pass.”

## 5. Generator choices

Checked against each MCP’s model catalogue on 3 Oct 2026.

| Job | Tool | Model | Why |
|---|---|---|---|
| Photographic stills | Gemini MCP `gemini_image_generation` | `gemini-3-pro-image` (Nano Banana Pro), `image_size` 4K, 16:9, reference image in `images` | Native 4K straight to disk. On the SRE film, the same model via ElevenLabs returned 2K at about 1,827 credits each. |
| Insert motion | Veo MCP `veo_first_last_to_video` | `veo-3.1-generate-001`, 1080p, 4–8 s | Two locked stills define the start and end, so the clip cannot drift off the object. |
| Upscale to 4K | Apiframe `upscale_video` | `topaz-video-upscale`, `target_resolution` 4k, `target_fps` 30 | Also used for any still that needs it. |
| Native 4K fallback | Apiframe `generate_video` | `seedance-2`, 4k | Only if Topaz shows artifacts on a shot. |
| Narration | ElevenLabs MCP | `eleven_v4` | Proven natural on the SRE film. |
| Music | ElevenLabs MCP | `eleven_music_v2_5` | Proven on the SRE film. |
| SFX | ElevenLabs MCP | `eleven_text_to_sound_v2` | Proven on the SRE film. |
| Transcription | `hyperframes transcribe` (whisper) | — | Word timings from the exact shipped file. |

**Not used.**

- ElevenLabs image and video nodes. They duplicate Gemini and Veo at a higher cost and lower delivered resolution.
- ElevenLabs Dubbing v2. It re-times speech and cannot be cast by ear.
- Any other generator in the Apiframe catalogue.

## 6. Look and motion language (gate B)

The film’s stage is the homepage itself. Values come from [stackgen.com](https://stackgen.com/) as read on 3 Oct 2026.

### 6.1 Tokens

| Token | Value | Use |
|---|---|---|
| Ink | `#14110C` | Stage, floor, end card |
| Cream | `#FAF7F2` | Film type, capsules, button |
| Lavender | `#BA99FD` | Software Factory piece, Build glow |
| Pink | `#F9B0F1` | Operations Factory body, Observe glow |
| Cyan | `#9EE6FC` | Remediate glow, rim light tint, action capsule |
| Peach | the homepage peach accent, read from the live site CSS in the Gate A live check | Operate glow |
| Hairline | `#3F3B39`, 1 px at 1080, 2 px at 4K | Frames, rules, gates, connectors |
| Grey ceramic | `#8C8580` | Unlit quarters |

### 6.2 Type

- Geist only.
- Headline: regular weight, sentence case, cream, 112 px at 4K (the homepage’s 56 px H1 at 2×), tracking −1%.
- Eyebrow: uppercase, 28 px at 4K, tracking +12%, cream at 72%.
- Seven words on screen at most.
- Reveal: each line masks up from below, 0.6 s, `expo.out`, lines 0.6 s apart.
- Exit: opacity to 0 over 0.3 s with a 12 px upward drift.
- Subtitles: Geist 52 px at 4K, cream, soft ink shadow, in a lower band 160 px tall at 4K. Film type and subtitles never share that band.

### 6.3 Hero object

- **Geometry.** Extruded jigsaw pieces with real tab-and-socket profiles. Bevel 1.2% of the piece width, 6 bevel segments, square outer corners to match the site’s zero-radius language.
- **Software Factory piece.** Lavender anodized metal. `MeshPhysicalMaterial`: metalness 0.85, roughness 0.32, clearcoat 0.4, anisotropy 0.3.
- **Operations Factory quarters.** Pink satin ceramic: metalness 0, roughness 0.45, clearcoat 0.6, clearcoat roughness 0.2, sheen 0.2.
- **Lit quarter.** A thin emissive strip on the top edge in the product accent, intensity animated from 0 to 1.4 over 0.6 s. Observe, being pink on pink, gets intensity 2.0 plus its rim light.
- **Unlit quarter.** Color lerps to grey ceramic over 0.6 s and roughness rises to 0.55.
- **Work units.** Cream capsules, emissive 0.6, about 4% of a piece width. Motion blur at speed.
- **The figure (F2).** A slim, featureless cream silhouette, rim-lit, one-sixth of a piece tall. No face, no detail.

### 6.4 Stage and light

- Floor: ink plane, roughness 0.35, reflection at 15% opacity with a soft blur.
- Haze: exponential fog, color `#1B1712`, density low enough that the far edge only softens.
- Key: one large rectangular area light, top left, warm white.
- Rim: one cool light behind, tinted cyan at low intensity.
- No fill light. Contrast stays high, as in the Apple reference.
- Specular sweep: a narrow rectangular area light that travels across the bevels at each reveal, 1.2 s, `power2.inOut`.
- Tone mapping: AgX, sRGB output.
- No lens flares, no bloom haze, no god rays.

### 6.5 Camera

- Lenses: 50 mm for wides and 85 mm for close shots, on a 36 mm film gauge (`setFocalLength`).
- One motivated move per shot: dolly, orbit, crane, or push.
- Camera eases: `power3.inOut` with long tails. No linear moves, no bounce.
- No shake.
- Depth of field: a real bokeh pass. Focus racks only where the eye must move to a new subject, over 0.5–0.8 s.

### 6.6 Product panels

- The Figma PNG on a thin dark glass slab: 1 px edge highlight, a subtle top reflection, no drop shadow.
- Rest pose: rotateX 2°, rotateY −4°, the SRE film’s locked rest.
- Panels rise out of their quarter and sink back into it.
- Entry: 0.9 s, `power3.out`. Exit: 0.7 s, `power2.in`.

### 6.7 Edit and transitions

- Cuts and big moves land on downbeats of the locked score.
- Allowed transitions: a match cut on the object, a push through a seam, the specular sweep used as a wipe, and the camera continuing through a cut.
- No stock dissolves. A soft cross only between plates in F10 and F11.
- Product frames F6–F9 share one grammar: the quarter lights, the others go grey, the title rises, the panels play, then they sink back. Each product has its own panel move so the pattern never repeats exactly (§7).

### 6.8 Finish

- Grain at 3% luma, vignette at 12%, applied in HyperFrames at the master.
- No color grade beyond tone mapping. The site colors must survive unchanged.

### 6.9 Signs of AI that fail review

Any of these sends the shot back:

- warped or melting geometry, or a piece shape that differs from the three.js model
- text, glyphs, logos, or UI inside a generated asset
- plastic or waxy surfaces, over-sharpened edges, halos
- floating particle fields, confetti, or a glow on everything
- a move with no word or beat behind it
- a layer held fully still for more than 0.6 s, except the F12 hold, which keeps a slow light drift

### 6.10 Gate B

Four 4K stills rendered from the real three.js stage, not generated:

1. F1 opening edge
2. F4 click
3. F6 SRE quarter with its panel at rest
4. F12 close

Each sits beside the homepage screenshot for side-by-side comparison. The user says “Direction pass.”

## 7. Animation script

**Times.** Local seconds within each frame, using John’s beat lengths. The timing lock (§9.4) can move a frame boundary by up to ±0.4 s to land on a downbeat. Every cue keeps its anchor word, so cue times shift with the word, not with the frame.

**Accuracy.** Each cue lands within ±0.12 s of its anchor word’s start in the shipped transcript.

**Spanish.** Cues anchored to a word use that word’s Spanish counterpart, named in `source/lines.es.json`.

### F1 — Software factory alone · 6.49 s

| Time | Layer | Action |
|---|---|---|
| 0.0–0.8 | Light | From black, the key fades up. Only the right edge of the lavender piece reads. |
| 0.0–6.0 | Camera | 85 mm, close on the right tab. Slow dolly back with an 8° orbit to three-quarter view. One `power3.inOut` move with a long tail. |
| 0.4–1.6 | Light | Specular sweep left to right along the top bevel. |
| 1.2–6.49 | Capsules | Leave the right edge at 2 per second, rising to 12 per second by 6.0. Motion blur scales with speed. |
| 1.5 | Graph | A hairline rate graph inside corner ticks draws on lower right, then climbs with the emission rate. |
| on “software factory” (≈2.4) | Type | Eyebrow SOFTWARE FACTORY masks up. |
| Out | Cut | None. The dolly continues into F2. |

Sound: sub swell 0.0–2.0. A soft tick per capsule spawn, pitch rising with the rate. Room tone throughout.

### F2 — Four quarters drift · 9.80 s

| Time | Layer | Action |
|---|---|---|
| 0.0–2.0 | Camera | Same dolly. The lens widens to 50 mm and opens the gap to the right of the software piece. |
| 0.0–9.80 | Quarters | Four pink quarters float apart in depth, each yawing slowly within ±3°. Edges unlit. |
| on each of “Build,” “operate,” “observe,” “remediate” | Type | That quarter’s eyebrow (BUILD, OPERATE, OBSERVE, REMEDIATE) sets under it. |
| 1.0–9.80 | Capsules | Reach the gap, slow, and stack against its edge. A physical pile with collisions, not a particle effect. |
| on “held together by people” | Figure | The cream figure walks the stage floor and carries one capsule across the gap. |
| ≈6.5 | Type | “Delivery got faster.” masks up center. “Operations didn’t.” follows 0.6 s later. |
| Out | Cut | Push in toward the quarters (F3 opens on the push). |

Sound: capsule ticks slow and thin as they pile. Soft footfalls under the figure. Room tone.

### F3 — Quarters lock · 5.67 s

| Time | Layer | Action |
|---|---|---|
| 0.0–5.67 | Camera | Push in to three-quarter on the ops piece, tilting slightly down. |
| 0.3–1.8 | Quarters | Slide in, staggered 80 ms apart. Each overshoots 1.5% and seats (`back.out(1.2)`) with a hairline seam flash. |
| on “operations factory” (≈1.6) | Type | Eyebrow OPERATIONS FACTORY sets. |
| 1.8–2.6 | Object | Seam walls drop to hairlines. One specular sweep runs across the joined piece. |
| 2.0–5.67 | Capsules | The pile drains into the piece. |
| Macro insert | Insert M1 | Up to 1.6 s on the last quarter seating (§10). |

Sound: one mechanical click per quarter, the fourth one heavier. A short sweep shimmer on the specular pass.

### F4 — The two factories click · 6.49 s

| Time | Layer | Action |
|---|---|---|
| 0.0–6.49 | Camera | Low 15° orbit around both pieces, 50 mm. |
| 0.4–2.4 | Object | The ops piece travels left, lifts 2%, and drops onto the center tab exactly on a downbeat. A light pulse runs along the joint. |
| Downbeat | Insert M2 | Up to 1.2 s macro of the click (§10). |
| after the click | Capsules | Flow straight through both pieces, smooth and even. No pile. |
| on “Join the two” (≈3.4) | Type | “Your software factory needs an operations factory.” masks up as two lines and holds. |
| Out | Cut | The camera begins its push toward the ops piece and carries into F5. |

Sound: one heavy click and a low impact on the downbeat. The capsule ticks become one steady pulse.

### F5 — Four ways to start · 5.25 s

| Time | Layer | Action |
|---|---|---|
| 0.0–5.25 | Camera | Rises 20° and pushes in on the ops piece. |
| 0.3–1.2 | Object | Quarter seams draw on as hairlines. |
| 0.6 | Type | Eyebrow START ANYWHERE sets. |
| 2.0, 2.55, 3.10, 3.65 | Quarters | Each edge glows once in product order: Remediate cyan, Build lavender, Operate peach, Observe pink. |
| Out | Cut | The camera arcs toward Remediate and carries into F6. |

Sound: four soft tonal pings, one per glow, tuned to the score’s key.

### F6 — Aiden for SRE · 21.39 s (gold frame, gate E)

| Time | Layer | Action |
|---|---|---|
| 0.0–1.6 | Object, camera | The Remediate quarter lights cyan. The other three fade to grey over 0.6 s. The camera arcs to hero the quarter. |
| 1.6–3.4 | Title | Rises out of the quarter inside a hairline frame with corner ticks. Eyebrow REMEDIATE, name “Aiden for SRE,” claim “Your AI SRE teammate.” |
| 3.4–9.0 | Panel 6a | On “triages every alert.” Rises from the quarter to the rest pose. The alert count falls, “2 pages suppressed” sets, and the camera pushes toward the P1 `payments-api` row. |
| 9.0–14.5 | Panel 6b | On “root cause with the evidence.” 6a slides left and recedes, and 6b enters from the right. Evidence rows light in sequence, confidence counts up to 94%, and focus racks to `v41` on `checkout-worker`. |
| 14.5–19.5 | Panel 6c | On “remediates with your approval.” RB-114 steps tick. Approve depresses 1 px and its label swaps to Approved. Status becomes “Resolved · 4m 12s.” |
| 19.5–21.39 | Rail | On “carries what it learns.” DISCOVER → TRIAGE → ROOT CAUSE → REMEDIATE → LEARN lights in sequence, the chip “Learned sig_4f21” sets, and the panel sinks back into the quarter. |

Sound: whoosh-short on each panel entry, a soft row tick on each evidence row, an approve chime on Approve, and a resolve chime on “Resolved.”

### F7 — Aiden for InfraOps · 16.84 s

Panel move: the panels stand in depth like a pipeline, and the camera dollies through them.

| Time | Layer | Action |
|---|---|---|
| 0.0–1.4 | Camera, object | Orbit about 90° to the Build quarter. It lights lavender, and Remediate returns to grey. |
| 1.4–3.0 | Title | BUILD · “Aiden for InfraOps” · “Ship infra at AI speed.” |
| 3.0–6.5 | Panel 7a | On “from their IDE, a coding agent or ServiceNow.” The Cursor request types on at a fixed 28 characters per second. Source chips set beside it: Cursor, Claude Code, ServiceNow. |
| 6.5–10.0 | Panel 7a | On “from your approved modules.” The card `company-golden/eks` 2.4.1 slides in, and the Terraform block reveals line by line. |
| 10.0–13.2 | Panel 7b | On “against your policies.” The camera dollies to the next panel in depth. “Checking 12 policies” counts to 12/12, and SOC 2 and PCI rows tick. |
| 13.2–16.84 | Panel 7b | On “before anything reaches your cloud.” PR #2431 drops into the queue as “Awaiting approval.” A dashed hairline runs toward an outlined cloud boundary and stops short of it. The panels sink into the quarter. |

Sound: soft key ticks under the typing, one tick per policy, a low settle on the queue drop.

### F8 — Aiden for DevOps · 18.91 s

Panel move: one row lifts out of a list toward camera.

| Time | Layer | Action |
|---|---|---|
| 0.0–1.4 | Camera, object | Orbit to Operate, which lights peach. |
| 1.4–3.0 | Title | OPERATE · “Aiden for DevOps” · “Scale impact, not tickets.” |
| 3.0–6.0 | Panel 8a | On “land in one operations inbox.” Tickets fall in from ServiceNow, Jira, and Linear chips. Five rows fill, with OPS-2291 on top. |
| 6.0–10.5 | Panel 8b | On “triages each ticket, matches it to a workflow and shows its reasoning.” OPS-2291 lifts toward camera and expands. The P2 chip, `rollback-verify` at a 91% match, and the reasoning lines reveal in turn. |
| 10.5–14.5 | Panel 8b | On “you choose the autonomy level.” The L1 · L2 · L3 control slides to L2, and Approve swaps to “Maya K. approved.” |
| 14.5–18.91 | Panel 8b | On “every run keeps a full record.” Run steps tick, then “Ticket resolved · 2m 29s · trace saved.” The trace draws on, the card returns to the list, and the list sinks into the quarter. |

Sound: a soft drop per ticket, a lift whoosh, the approve chime, a row tick per run step.

### F9 — Aiden for Observability · 20.56 s

Panel move: the camera cranes down into the dashboard.

| Time | Layer | Action |
|---|---|---|
| 0.0–1.4 | Camera, object | Orbit to Observe, which lights pink. |
| 1.4–3.0 | Title | OBSERVE · “Aiden for Observability” · “Observability without the upkeep.” |
| 3.0–7.0 | Panel 9a | On “open-source observability on OpenTelemetry.” Stack chips set, and “Remote-write connected · 17.2M samples/hr” counts up. |
| 7.0–11.5 | Panel 9a | On “three hundred integrations.” Monochrome tiles fill in a diagonal wave and the counter reaches 300+. |
| 11.5–15.5 | Panel 9a | On “in your own cloud.” Dashboard panels assemble, and a hairline cloud boundary draws around them. |
| 15.5–20.56 | Panel 9b | On “ask Aiden.” The camera cranes down. “Why is checkout failing?” types into the ask bar, and the 5xx line spikes to 4.1%. The marker “`v41` shipped 16s before” sets, then the likely-cause card. “Handed to Aiden for SRE” slides toward the Remediate quarter, setting up F10. |

Sound: a tile tick per wave row, a soft rise under the spike, a resolve tone on the likely-cause card.

### F10 — World Model · 11.04 s

| Time | Layer | Action |
|---|---|---|
| 0.0–2.0 | Camera, object | Crane up and back to all four quarters, each lit at 40% of its accent. A dark machined plate slides in beneath, edge-lit. |
| 2.0 | Type | Eyebrow WORLD MODEL. Then “what’s deployed · what changed · what broke · what fixed it” sets one segment per beat. |
| 3.0–5.0 | Connectors | Four hairlines draw down from the quarters into the plate, staggered 0.2 s. |
| 5.0–9.0 | Chip, panel 10a | On “reads and writes it.” The chip “rollback fixed checkout” rises from under Remediate, travels the plate with a light trail, and stops under Build, which glows lavender as it reads it. Above the plate, record 10a fills three rows: `v41` shipped, 5xx spike, rollback. |
| 9.0–11.04 | Camera | Slow orbit hold. |

Sound: a low plate thud on landing, a soft whoosh under the chip’s travel, a read ping under Build.

### F11 — Aiden OS · 11.87 s

| Time | Layer | Action |
|---|---|---|
| 0.0–2.0 | Object, camera | A second plate slides under the World Model plate. The camera lowers slightly. |
| 2.0–3.5 | Type | Eyebrow AIDEN OS. Pills set left to right, 0.25 s apart: Policy, Approvals, Identity, Audit, Cost controls, Integrations. |
| 3.0–8.0 | Capsule, panel 11a | On “checked against your policies.” A cyan action capsule leaves Remediate, descends to a hairline policy gate that ticks pass, then reaches the approval gate. Panel 11a shows the request, and Approve swaps to Approved. |
| 8.0–11.87 | Panel 11a, camera | On “every step is recorded.” An audit line types on, the capsule continues, and the camera starts pulling back. |

Sound: a second plate thud, a pill tick each, a gate tick, the approve chime, soft key ticks under the audit line.

### F12 — Close · 4.42 s

| Time | Layer | Action |
|---|---|---|
| 0.0–4.42 | Camera | Wide on the full assembly. Slow pull back. |
| 0.2–1.6 | Light, object | Every quarter at full accent. One specular sweep across the whole object. |
| 1.2 | Type | Eyebrow AUTONOMOUS OPERATIONS FACTORY. |
| 1.6 | Type | “Start anywhere.” |
| 2.2 | Button | The flat cream button sets, in the homepage’s button style: “Schedule a demo” (Spanish: “Agenda una demo”). |
| 2.2–4.42 | Light | Slow light drift. Nothing is fully still. |
| Macro insert | Insert M3 | Optional, up to 1.0 s of surface sweep before the type (§10). |

Sound: the score resolves on the button. One soft logo-sting tone.

## 8. Script (gate S)

### 8.1 English voiceover

John’s 25 Sept lines, full length, including the two phrases he had marked as optional cuts. Two lines are replaced: L08 aligns DevOps to the homepage, and L12 is the user’s close.

| Line | Frame | Text |
|---|---|---|
| L01 | F1 | AI turned coding into a software factory. Code is being written faster than ever. |
| L02 | F2 | But operations can't keep pace. Build, operate, observe and remediate still run as separate pieces, on separate tools, held together by people. |
| L03 | F3 | What's missing is an operations factory, where all four work as one. |
| L04 | F4 | Join the two, and the whole software lifecycle runs at the speed AI promised. |
| L05 | F5 | StackGen's Aiden agents give you four ways to start building yours. |
| L06 | F6 | Aiden for SRE is your AI SRE teammate, built to cut toil and MTTR. It learns your environment from the tools you already run, triages every alert, and finds root cause with the evidence behind it. It remediates with your approval, and carries what it learns into the next incident. |
| L07 | F7 | Aiden for InfraOps lets developers request infrastructure from their IDE, a coding agent or ServiceNow. It builds Terraform or OpenTofu from your approved modules, checks it against your policies, and queues it for approval before anything reaches your cloud. |
| L08 | F8 | Aiden for DevOps takes repeat work off your team. Requests from ServiceNow, Jira and Linear land in one operations inbox, where Aiden triages each ticket, matches it to a workflow and shows its reasoning. You choose the autonomy level, and every run keeps a full record. |
| L09 | F9 | Aiden for Observability is fully managed, open-source observability on OpenTelemetry, with Aiden built in. Choose from over three hundred integrations, deploy in minutes, and run it as private SaaS or in your own cloud. When something breaks, ask Aiden, and it shows the likely cause with the evidence. |
| L10 | F10 | All four agents run on unified context: the Aiden World Model. Every agent reads and writes it, so what one learns, the others already know. |
| L11 | F11 | Aiden OS governs all of it. Every action is checked against your policies before it runs. Your team decides what needs approval, and every step is recorded. |
| L12 | F12 | Start anywhere and build your operations factory today. |

**Lock rules.**

- Words are fixed once gate S passes.
- Markup may add only punctuation, capitals, and respellings for words the voice mishears: “Aiden,” MTTR as `M-T-T-R`, OpenTofu as “Open Tofu.”
- `python3 ~/.cursor/skills/expert-pmm-writer/scripts/check_ai_signs.py` must exit 0 on the twelve lines. Any line it flags goes back to the user with a proposed rewrite. Nothing is rewritten silently.

### 8.2 Spanish

- **Translator:** Opus 5.5, natural Latin American Spanish for a platform-engineering audience in Bogotá. Formal “usted” is avoided; the site and Endy’s wall copy use direct “tu.”
- **Kept in English:** Aiden, Aiden for SRE, Aiden for InfraOps, Aiden for DevOps, Aiden for Observability, Aiden OS, World Model, Autonomous Operations Factory, StackGen, Terraform, OpenTofu, OpenTelemetry, ServiceNow, Jira, Linear, MTTR, IDE, SaaS.
- **Endy’s wording wins.** “Self-service” and “guardrails” stay in English, “hace triage” is the verb for triaging, “outer loop” stays in English, and Observability is never shortened to O11y.
- **Quarter words on screen:** Construir, Operar, Observar, Remediar.
- **Time budget.** Each Spanish line must fit its English line’s frame. Spanish reads longer, so the translation is written short from the start. If a line still cannot fit, that frame lengthens for both cuts (§9.4).
- **On-screen strings.** Every film string — headlines, eyebrows, titles, claims, the button — lives in `source/strings.{en,es}.json`. Product names stay English on both.
- **Gate S.** Endy approves the Spanish lines and strings.

## 9. Sound (gates C1–C3)

### 9.1 What keeps the voice human

- **Scene takes.** One take per act, never line by line: T1 F1–F4, T2 F5–F6, T3 F7–F8, T4 F9, T5 F10–F12. The same grouping applies in Spanish.
- **Default model settings.** From `creative_get_model_guide(eleven_v4)`. No style exaggeration and no stacked emotion tags.
- **Ear test, pass or fail per take:**
  - no metallic shimmer or warble
  - no wrong stress on product names
  - no sing-song or flat cadence
  - breaths present
  - energy steady across takes
  - pauses fall where a person would breathe
- **Transcript check.** Each take is transcribed back. Every word must match the locked line; a respelling counts as a match.
- **One generation per take.** Never rerun a generation to retry. A failed take goes back to the user with the reason before anything is spent again.

### 9.2 Casting

- **English:** River, already cast. No new round.
- **Spanish (C1):** a shortlist of three native Latin American voices from the ElevenLabs library — neutral accent, mid pitch, warm, narration-grade. Each reads T1. Endy and the user pick by ear.

### 9.3 Takes (C2)

Five English takes and five Spanish takes, one generation each.

Files:
- `assets/audio/vo/{en,es}/T{1..5}.wav` at 48 kHz, 24-bit
- source MP3s beside them

Word timings come from `hyperframes transcribe` on the exact shipped files.

### 9.4 Timing lock

1. Split each take into lines from its transcript.
2. Per frame, voice time = the longer of the English and Spanish line.
3. Frame length = the larger of John’s beat length for that frame and voice time + 0.8 s. Silent frames keep John’s length.
4. Write the spotting sheet (§9.5). Generate the score.
5. Analyze the score’s beat grid. Snap each frame start to the nearest downbeat within ±0.4 s.
6. Write `data/timing.json`: one picture timeline, with English and Spanish voice starts per line. Both languages share every frame boundary.

Nothing downstream may change `data/timing.json`. A change reopens C2 or C3.

### 9.5 Score (C3)

- **Model:** `eleven_music_v2_5`. **Length:** the locked total plus a 3 s tail.
- **Palette:** warm synth, felt piano, sub, brushed percussion, no drum-machine kick. This is the SRE film’s approved palette.
- **Shape:**
  - quiet pulse from the first second
  - build through F1–F4
  - a downbeat hit on the F4 click
  - four rising tones under F5
  - a steady, lighter bed under F6–F9 so the voice leads
  - a lift on the F10 plate
  - resolve on the F12 button
- **Target:** about 96 BPM, so the grid lands near the John-length frames.
- **One generation.** A regeneration needs the user’s approval and an estimate first.

### 9.6 Sound effects

`eleven_text_to_sound_v2`, one take each, `prompt_influence` 0.6. Reuse the SRE film’s effects where they fit: clicks, chimes, whooshes, ticks, sub swell, room tone.

New effects:
- seam seat
- heavy click
- plate thud
- capsule tick
- gate tick
- typing soft
- footfall soft

Files: `assets/audio/sfx/<id>.wav`.

### 9.7 Mix

- Voice at −16 LUFS integrated for web. True peak −1 dBTP.
- Music carved −6 dB under speech.
- Room tone under the voice at about −42 LUFS, so there is never dead silence.
- Spanish uses the same music and effects stems with its own voice track.

## 10. Generated inserts (gate D)

Three inserts, one optional. Each is cut to the beat and never on screen longer than listed.

| Id | Frame | Max on screen | Subject |
|---|---|---|---|
| M1 | F3 | 1.6 s | Extreme macro of the fourth quarter seating. Bevel and seam under the moving specular sweep. |
| M2 | F4 | 1.2 s | Macro of the center tab mating, with the light pulse along the joint. |
| M3 | F12 | 1.0 s | Slow surface sweep across lavender metal meeting pink ceramic. |
| M0 (optional) | F1 | 1.6 s | Macro of the lavender right edge as the key light wakes. |

Chain per insert, one direction only:

1. **Reference stills.** HyperFrames renders the three.js shot at its first and last frame as 4K stills, `assets/inserts/<id>/ref-{first,last}.png`.
2. **Material.** Gemini `gemini-3-pro-image`, 4K, 16:9, with the reference in `images`. Prompt template:

   > Photograph this exact object as macro studio product photography. Keep every edge, tab, bevel, seam, proportion and camera angle exactly as in the reference. Materials: [lavender anodized aluminium / pink satin ceramic]. Light: one large soft key from top left, faint cool rim behind, deep ink background `#14110C`. Shallow depth of field. No text, no logos, no people, no added objects.

   Output: `assets/inserts/<id>/{first,last}.png`.
3. **Motion.** Veo `veo_first_last_to_video`, `veo-3.1-generate-001`, 1080p, 8 s, those two stills. The prompt names only the motion: the light sweep, a slow camera creep, and the seat. Output: `assets/inserts/<id>/veo.mp4`.
4. **Upscale.** Apiframe `upscale_video`, `topaz-video-upscale`, `target_resolution` 4k, `target_fps` 30. If artifacts remain, run one Seedance 2 4K generation from the same stills instead. Output: `assets/inserts/<id>/final.mp4`.
5. **Cut.** HyperFrames trims the best continuous 1.0–1.6 s and cuts it on the beat. Video clips can be trimmed; narration cannot.

**Gate D checklist.**

- Geometry matches the three.js model when compared side by side.
- None of the §6.9 failures appear.
- Each insert is 3840×2160 at 30 fps.
- Spend stays within the estimate shown before the batch.

## 11. Build

### 11.1 Project

- `videos/aof-concept-film/` on the `product-launch-video` workflow.
- Proven pieces are copied from `videos/aiden-sre-launch/` rather than rewritten: takes splitter, timing fit, beat analyzer, motion QA, finish, and data contract. The SRE project is read-only.
- Every HyperFrames command runs as `PATH=/opt/homebrew/opt/node@22/bin:$PATH npx --yes hyperframes@0.8.103 …`.

### 11.2 Stage

- One shared three.js stage module in `shared/stage/`: geometry, materials, lights, floor, haze, camera rig.
- Every frame imports it and drives it from its own GSAP timeline, registered under the frame id.
- Seek-safe: no `Date.now()`, no `Math.random()`, no unseeded noise, no network fetches. Physics for the F2 capsule pile is precomputed into keyframes, not simulated at render time.

### 11.3 Frames

- One composition per frame: `compositions/frames/<NN>-<slug>.html`. Product panels are the 2× Figma PNGs on glass slabs.
- F6 is built first as the gold frame (gate E). Every other frame copies its stage, panel, and type rules.
- Frame workers may not edit `shared/`, `data/`, `source/`, or `index.html`.

### 11.4 Master and delivery

| File | Spec |
|---|---|
| `renders/master-en-4k.mp4` | 3840×2160, 30 fps, H.264 high, English voice |
| `renders/master-es-4k.mp4` | Same picture, Spanish voice and strings, Spanish subtitles burned in |
| `renders/aof-homepage-en-1080.mp4` | 1920×1080, 30 fps, from the English master |
| `renders/aof-homepage-en.vtt` | English subtitles for the homepage player |
| `renders/aof-social-en-1080-subs.mp4` | 1920×1080, English subtitles burned in |
| `renders/aof-bogota-es-1080.mp4` | 1920×1080, 30 fps, Spanish subtitles burned in. Bogotá rules: max 5 min, horizontal, no speaker. |

Spanish is a second render of the same compositions, switched by one `lang` parameter that selects the voice track, `strings.es.json`, and the burned subtitles. There is no separate Spanish edit.

## 12. Gates

| Gate | What the user sees | Pass phrase |
|---|---|---|
| S | Twelve English lines with `check_ai_signs` at exit 0, Spanish lines and strings approved by Endy | “Script pass” |
| A | Figma page “AOF concept film” | “Figma pass” |
| B | Four 4K style frames next to the homepage screenshot | “Direction pass” |
| C1 | Three Spanish voice samples | named voice |
| C2 | Ten takes (EN and ES) with transcript match | “Takes pass” |
| C3 | Score preview under both voice tracks | “Score pass” |
| D | Three or four 4K inserts beside their three.js references | “Inserts pass” |
| E | F6 gold frame, 4K, with voice and sound | “Gold pass” |
| F | Full previews, both languages, with mix and subtitles | “Preview pass” |
| G | Final files, `video-production-audit` ledger clean | “Ship” |

No stage starts work that depends on a gate before the user says its pass phrase.

## 13. Execution

### 13.1 Models

| Work | Model | Task tool slug |
|---|---|---|
| Spec, plan, Spanish translation, gold-frame review, final audit | Opus 5.5 | `claude-opus-5-5-high` |
| three.js stage and every frame composition | Grok 4.7 | `grok-4.7-high-fast` |
| Scripts, data contract, timing fit, QA tooling, assembly, render, delivery | Composer 2.5 | `composer-2.5-fast` |
| Per-task review | Sonnet 5.5 | `claude-sonnet-5-5-high` |

### 13.2 Rules

- **MCP calls stay in the orchestrator session:** Figma writes, ElevenLabs, Gemini, Veo, Apiframe, Chrome DevTools. That keeps spend in one place, and no worker is assumed to have MCP access.
- **Spend.**
  - Estimate any batch before it runs.
  - Ask the user before any batch over 2,000 ElevenLabs credits, or before any Apiframe or Veo batch whose estimate is unknown.
  - Never rerun a generator to retry.
- **Concurrency.** At most 8 subagents at once.
- **Git.** Workers never commit. The orchestrator commits each accepted task with explicit paths.

### 13.3 Parallel lanes

```
Gate S
 ├─ Lane 1  Figma: live token read → 11 screens → exports ─────────── Gate A ─┐
 ├─ Lane 2  Stage: three.js module → 4 style frames ─────────────────── Gate B ─┼─► F6 gold (E) ─► F1–F5, F7–F12 workers (≤ 8) ─► assemble + mix ─► Gate F ─► render, cut, subtitles, audit ─► Gate G
 └─ Lane 3  Sound: ES casting C1 → takes C2 → split → score C3 → timing lock ─┤
                                                     Lane 4 inserts (after lock + B) ─ Gate D ─┘
```

## 14. Skills per task

Picked with the skill-picker MCP, then read and checked against the task. Load the router first, then only the named member.

| Task | Skills | Why |
|---|---|---|
| Script lock | `expert-pmm-writer` (`check_ai_signs.py`) | Pass/fail check for AI phrasing |
| Gated flow rules | `video-gated-product-demo` (Gate F and Gate A rules only) | The user’s own gated pipeline. Its Clueso voice stage is not used. |
| Live token read | `chrome-devtools-skills` → `chrome-devtools` | Read-only computed styles and timings |
| Figma screens | `figma-skills` → `figma-use` (before every `use_figma`), `figma-generate-design` | Builds screens from existing frames and components |
| Figma exports into the project | `hyperframes-skills` → `figma` | 2× exports, tokens |
| three.js stage | `hyperframes-animation` (`adapters/three.md`), `threejs` | Seek-safe three.js under a paused timeline |
| Motion craft | `emil-skills` → `apple-design`, `animation-systems` | Apple restraint, easing, type |
| Frame compositions | `hyperframes-core`, `hyperframes-keyframes`, `hyperframes-animation`, `hyperframes-registry` | Composition rules |
| Voice, music, SFX | `elevenlabs-skills` → `creative-studio`; refs `text-to-speech`, `music`, `sound-effects`; `hyperframes-creative` `references/narration.md` | Proven on the SRE film |
| Transcribe and split | `media-use` (`audio/references/tts.md`), `hyperframes-cli` | Word timings from shipped files |
| Beat fit | `music-to-video` (`scripts/analyze-beatgrid.py` only) | Downbeat grid |
| Inserts | `veo` (prompt grammar only), `media-use` `references/media-treatments.md` | Calls go through the Gemini, Veo, and Apiframe MCPs |
| Mix | `hyperframes-audio` | Voice carve, loudness |
| Subtitles | `media-use`, `hyperframes transcribe --to srt/vtt` | Timing from shipped audio |
| Render and verify | `hyperframes-cli`, superpowers `verification-before-completion` | Fresh evidence before claims |
| Final audit | `hyperframes-skills` → `video-production-audit`; `emil-skills` → `review-animations`; `critique-composition`; `critique-visual-hierarchy` | Defect ledger and motion review |

**Rejected, with reasons.**

- `webgl-3d-object`: its idle floating motion is not seek-safe.
- The Clueso skills (`brief-to-launch-video`, `video-dubbing-localization`, `script-to-voiceover`, `multilingual-captions`): Clueso is not in this film’s stack.
- ElevenLabs `dubbing`: re-times speech, and the voice cannot be cast by ear.
- `full-page-screenshot`: screens are designed, not captured.

## 15. Out of scope

- A second story, extra scenes, or a cut stretched toward five minutes.
- A URL, logo wall, or customer quote on the end card.
- The Sachin English intro for Bogotá. If it happens, it is a separate clip placed in front of the Spanish file.
- A looping file for the booth’s 43-inch screen.
- Any render before the gate that allows it.

## 16. Open flags

- **World Model cross-agent read (F10).** John marked this “verify with Raj.” The chip is shown; the flag stays until Raj confirms it.
- **Peach accent.** Read from the live site CSS in the Gate A live check.
- **Chrome DevTools session.** The browser DevTools controls must have the app open and logged in before the Lane 1 live read.
- **Bogotá submit date.** Tilak said 9 Oct is too late. The delivery date is set from the gate schedule in the plan and confirmed with John and Endy.
