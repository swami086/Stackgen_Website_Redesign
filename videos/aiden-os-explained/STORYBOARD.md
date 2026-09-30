---
format: 1920x1080
duration: 93s
message: "Outcomes, not agents. Aiden OS runs production."
arc: "PAS + feature-benefit progression — Hook → Pain → Agitate → Product intro → Four persona beats → Mechanism → Governance → CTA"
audience: SRE/DevOps/platform engineers and engineering leaders evaluating AI operations
mode: collaborative
music: dark minimal tech underscore, slow pulse, restrained
---

## Video direction

- **palette system** — Broadside remixed to shipped StackGen dark (frame.md): canvas `#0b0c0e`, card `#151619`, raised `#1d1f24`, hairline `#2a2c33`, ink `#e8eaee`, muted `#9aa0ac`, dim `#7e8591`. Accent yellow `#facc15` is scarce: the 78% stat, the govern hot-word + policy chip, the CTA pill. Violet `#8c85ff` appears ONCE: the Context Graph hub ring (F9). No other accent usage.
- **type** — Geist Variable display, lowercase, negative tracking, 800–900 for heroes; Geist Mono uppercase kickers/labels/chips (0.14em); body muted. Type ramp 16/20/34/64/110+ (max:min ≥ 2).
- **motion grammar** — smooth long-tail settles (`power3` default; `expo.out` on fast arrivals); never bounce/elastic. VO-paced reveal model: at t=0 only what the VO is saying enters; each further piece reveals on its spoken cue (cue times below are frame-relative seconds from the real Daniel word timings). Holds stay alive with subtle jitter at most (`sine-wave-loop`, low amplitude); no breathing loops, no back-half pan/push. Internal seams are velocity-matched cuts (cut-catalog).
- **rhythm / held frames** — type-type-type-type then four footage beats, then type-type-type. F2 ends on a held stat read; F4 holds the assembled row; F8 is the footage climax (longest frame, two punches); F11 is the held closer. Footage frames play real 4K product video whose baked camera punches are windowed to land on the VO's key phrase (source windows per frame below).
- **negative list** — no bounce/overshoot, no lazy breathing, no back-half drift, no purple-blue AI gradients, no generic decorative shapes, no nav/scrollbars/cursors, no em dashes in any text, nothing important in the bottom ~17% (caption band).
- **captions** — on; `.hyperframes/caption-skin.html` pill, bottom band, brand tokens.

## Frame 1 — The bottleneck

- scene: Kinetic type beats on the bare dark canvas: three short lines land one by one, each harder than the last.
- voiceover: "AI writes more code than your team can review. Agents and IDEs ship all day. And alerts struggle to keep up."
- duration: 9.6s
- transition_in: cut
- status: animated
- src: compositions/frames/01-the-bottleneck.html
- type: hook
- persuasion: Pain validation
- beat: tension
- blueprint: kinetic-type-beats (Reproduce)
- focal: the three statement lines
- roles: statement lines = cutout · canvas = background
- sfx: none

narrativeRole: Cold open; names the pain in the viewer's own language before any product.
keyMessage: AI code is hitting production faster than you can see it.

Reproduce: the in-place statement swap IS the signature move — one center slot, three escalating lines.
Scene 1 (0.0–3.2s): bare canvas; line 1 "ai writes more code than your team can review." enters center via per-word staggered reveal (`dynamic-content-sequencing`), ink, ~64px — Centered, single element ~50% width.
Scene 2 (3.2–6.4s): on the VO's second sentence, line 1 slides up and dims to `#7e8591` at 34px as line 2 "agents and ides ship all day." takes the center slot at 64px — scale-swap handoff (`scale-swap-transition`), velocity-matched.
Scene 3 (6.4–9.6s): on "and alerts struggle…", line 3 lands center at 110px/800 — "alerts struggle to keep up." — the escalation payoff; both priors dim above. Held read to the cut; subtle jitter only.

## Frame 2 — The cost

- scene: One hero stat fills the field: "78%" counts up, caption "more production incidents once AI-generated code goes live — New Relic, 2026". A second small stat fades in below: "AI PRs carry ~1.7x more issues — CodeRabbit".
- voiceover: "Speed without a governed loop is how agent-driven change becomes the next incident on your watch."
- duration: 7.6s
- transition_in: crossfade
- status: animated
- src: compositions/frames/02-the-cost.html
- type: pain_point
- persuasion: Statistical proof
- beat: anxiety
- blueprint: dataviz-countup (Adapt)
- focal: the 78% hero stat
- roles: 78% = cutout · caption + secondary stat = supporting · canvas = background
- sfx: impact-soft on the stat landing

narrativeRole: Agitation; makes the pain expensive and attributed, not vibes.
keyMessage: Ungoverned agent speed creates incidents.

Adapt: keep the count-up signature; one hero number, no chart — the worsening is carried by the VO, not a trend line.
Scene 1 (0.0–1.9s): mono kicker "new relic, 2026" enters top-of-center; the hero "78%" counts 0→78 on a value-scaled counter (`counting-dynamic-scale`), accent yellow, ~300px — Centered, dominant 3:1 over everything else.
Scene 2 (1.9–4.0s): as the VO says "is how agent-driven change", the caption line reveals beneath per-word (`dynamic-content-sequencing`), ink 34px.
Scene 3 (4.0–7.6s): on "becomes the next incident on your watch", the secondary mono stat "ai prs carry ~1.7x more issues — coderabbit" fades in low (above caption band); hero holds still — deliberate held read; subtle jitter at most.

## Frame 3 — Introducing Aiden OS

- scene: Chapter card resolves into the product: "introducing" kicker, then "Aiden OS" massive lowercase display, then the L2 line in muted text.
- voiceover: "Meet Aiden OS. The Agentic OS for DevOps. Build, govern, observe, and remediate production, with guardrails baked in."
- duration: 10.8s
- transition_in: zoom-through
- status: animated
- src: compositions/frames/03-introducing-aiden-os.html
- type: product_intro
- persuasion: Category announcement
- beat: intrigue
- blueprint: kinetic-type-beats (Adapt)
- focal: the "aiden os" name lockup
- roles: name = cutout · kicker/sub/verbs = supporting · hairline frame = background
- sfx: riser into the name reveal

narrativeRole: The reveal; the promise lands here, everything after is evidence.
keyMessage: Aiden OS is the Agentic OS for DevOps.

Adapt: keep the introducing→name-drop resolution; the lockup gains a hairline frame that draws on at the guardrails cue (the brand's card language).
Scene 1 (0.0–2.0s): hairline frame is present but empty; kicker "introducing" types on (mono, uppercase); on "meet aiden os" the name "aiden os" reveals with a vertical clip-path wipe per line (190px/800, lowercase) — the 21st.dev Vertical Cut Reveal choreography ported to GSAP.
Scene 2 (2.0–4.4s): on "the agentic os for devops", the sub line reveals beneath the name, muted 38px.
Scene 3 (4.4–7.9s): on "build, govern, observe, and remediate", the mono verb row steps through — each verb lights from dim to ink on its word (`asr-keyword-glow` envelope minus glow: color/weight only).
Scene 4 (7.9–10.8s): on "with guardrails baked in", the hairline frame's border draws itself around the lockup (`svg-path-draw` on the rect); held read to the cut.

## Frame 4 — Four personas

- scene: Four hairline cards self-assemble in a row: Aiden for InfraOps / DevOps / Observability / SRE, each with its one-line persona job.
- voiceover: "Four persona agents. One shared memory. InfraOps, DevOps, Observability, and SRE."
- duration: 8.8s
- transition_in: crossfade
- status: animated
- src: compositions/frames/04-four-personas.html
- type: feature_showcase
- persuasion: Value stacking
- beat: curiosity
- blueprint: grid-card-assemble (Adapt)
- focal: the four-card row
- roles: cards = cutout · title line = supporting · canvas = background
- sfx: none

narrativeRole: Cast introduction; sets up the four footage beats that follow.
keyMessage: Four products, one OS.

Adapt: keep the self-assembling grid; four cards not a wall — each card lands on its spoken name.
Scene 1 (0.0–1.8s): title line "four persona agents." reveals center-top (64px/700); four empty hairline card shells fade in at rest positions.
Scene 2 (1.8–3.6s): on "one shared memory", the title's second clause appends; a hairline connector hairline draws between the four card tops (shared-memory hint).
Scene 3 (3.6–8.8s): cards populate on their spoken names — InfraOps @3.6, DevOps @4.4, Observability @5.2, SRE @7.1: number + product name + job line spring-settle in per card (`spring-pop-entrance`, smooth register). Held read on the full row to the cut.

## Frame 5 — InfraOps

- scene: The InfraOps 4K card footage plays full-frame inside its browser chrome: environment intent to policy-checked deploy. The baked punch lands on "ten times the velocity".
- voiceover: "Aiden for InfraOps turns intent into policy-checked change. Ten times the velocity. Every deploy checked."
- duration: 9.3s
- transition_in: push-slide LEFT
- status: animated
- src: compositions/frames/05-infraops.html
- type: feature_showcase
- persuasion: Show-don't-tell proof
- beat: confidence
- blueprint: device-surface-showcase (Adapt)
- focal: assets/Aiden_Infraops_edited.mp4
- roles: video = cutout (full-bleed) · product chip = supporting
- sfx: none
- media: source window 7.2s → 16.5s (data-media-start 7.2); baked punch (source 12.2s) lands ~5.0s in-frame, just after "ten times the velocity" @4.7

narrativeRole: First proof beat; the product actually changes infrastructure, not advise-only.
keyMessage: Intent to policy-checked change.

Adapt: keep the held-window hero; the surface is real recorded product video, not a live DOM — motion comes from the footage's own baked camera, plus one entrance.
Scene 1 (0.0–0.6s): the video card enters full-bleed with a quick scale-from-0.97 settle (`spring-pop-entrance`, smooth register); mono chip "aiden for infraops" fades in top-left.
Scene 2 (0.6–5.0s): footage plays; the baked punch swells into frame at ~5.0s on the velocity claim.
Scene 3 (5.0–9.3s): punch releases to rest per the footage; held playout to the cut. No added camera — the footage owns the motion.

## Frame 6 — DevOps

- scene: The DevOps chat footage: app-down triage, ticket intake to workflow match. Held on its baked punch as the review line lands.
- voiceover: "Aiden for DevOps triages the ticket queue. Every execution reviewed before it runs."
- duration: 7s
- transition_in: crossfade
- status: animated
- src: compositions/frames/06-devops.html
- type: feature_showcase
- persuasion: Friction reduction
- beat: relief
- blueprint: device-surface-showcase (Adapt)
- focal: assets/Aiden_devops_edited.mp4
- roles: video = cutout (full-bleed) · product chip = supporting
- sfx: none
- media: source window 1.0s → 8.0s (data-media-start 1.0); baked punch (source 4.5s) lands ~3.5s in-frame, on "every execution reviewed" @3.2

narrativeRole: Second proof beat; delivery control without ticket-ops.
keyMessage: Keep control of how software ships.

Adapt: same held-window shape as F5 — the rhythm of identical framing across the four beats is the point.
Scene 1 (0.0–0.6s): video card enters full-bleed, quick settle; chip "aiden for devops" top-left.
Scene 2 (0.6–3.5s): footage plays toward the punch as the VO names the queue.
Scene 3 (3.5–7.0s): punch lands + releases on the review line; held playout.

## Frame 7 — Observability

- scene: The Observability chat footage: error-spike correlation across metrics, logs, and traces.
- voiceover: "Aiden for Observability correlates the signal. Ninety percent less alert noise."
- duration: 6.4s
- transition_in: crossfade
- status: animated
- src: compositions/frames/07-observability.html
- type: feature_showcase
- persuasion: Feature-to-benefit translation
- beat: clarity
- blueprint: device-surface-showcase (Adapt)
- focal: assets/Aiden_Observability_edited.mp4
- roles: video = cutout (full-bleed) · product chip = supporting
- sfx: none
- media: source window 4.0s → 10.4s (data-media-start 4.0); baked punch (source 7.5s) lands ~3.5s in-frame, on "ninety percent less alert noise" @3.2

narrativeRole: Third proof beat; signal over noise.
keyMessage: Filter false positives.

Adapt: same held-window shape; shortest footage beat — a breather before the SRE climax.
Scene 1 (0.0–0.6s): video card enters; chip "aiden for observability".
Scene 2 (0.6–3.5s): footage plays to the punch on the noise claim.
Scene 3 (3.5–6.4s): release + held playout.

## Frame 8 — SRE

- scene: The SRE chat footage: checkout-api root cause, alert to remediation. Two baked punches carry the beat.
- voiceover: "And Aiden for SRE finds root cause and remediates inside policy. Fifty percent lower MTTR. You keep the call."
- duration: 11.1s
- transition_in: crossfade
- status: animated
- src: compositions/frames/08-sre.html
- type: feature_showcase
- persuasion: Show-don't-tell proof
- beat: relief + control
- blueprint: device-surface-showcase (Adapt)
- focal: assets/Aiden_SRE_edited.mp4
- roles: video = cutout (full-bleed) · product chip = supporting
- sfx: none
- media: source window 1.2s → 12.3s (data-media-start 1.2); punch 1 (source 4.2s) lands ~3.0s in-frame on "root cause"; punch 2 (source 7.8s) lands ~6.6s in-frame, just after "fifty percent lower MTTR" @5.9

narrativeRole: Lead-persona proof beat; gets the longest footage window.
keyMessage: Detect the real incident. Let agents act. You keep the call.

Adapt: same held-window shape, longest dwell — the persona climax of the footage act.
Scene 1 (0.0–0.6s): video card enters; chip "aiden for sre".
Scene 2 (0.6–6.6s): footage plays through punch 1 (~3.0s) as root cause is named, into punch 2 (~6.6s) on the MTTR claim.
Scene 3 (6.6–11.1s): release to rest; the footage holds through "you keep the call" — stillness under the persona line.

## Frame 9 — The Context Graph

- scene: Kinetic diagram beat: four persona word-chips orbit and connect into one hub labeled "Operational Context Graph"; sub-line: topology, change attribution, drift history, incident causality.
- voiceover: "All four share one Operational Context Graph. What one domain learns, every domain acts on."
- duration: 8.6s
- transition_in: zoom-through
- status: animated
- src: compositions/frames/09-context-graph.html
- type: feature_showcase
- persuasion: Mechanism reveal
- beat: awe
- blueprint: constellation-hub (Adapt)
- focal: the violet hub ring
- roles: hub = cutout · chips = supporting · sub-line = supporting
- sfx: none

narrativeRole: The mechanism that separates a factory from stateless agents.
keyMessage: One shared memory across domains.

Adapt: keep nodes-ringing-a-center + the push-IN; four chips (the F4 cast) not a logo cloud; violet rides the hub ring only.
Scene 1 (0.0–3.8s): the four persona chips spring into a ring around the empty center (`orbit-3d-entry` settle, no continuous orbit); hairline connectors draw from each chip to center (`svg-path-draw`).
Scene 2 (3.8–5.5s): on "what one domain learns…", the camera pushes IN toward center (`multi-phase-camera` push leg) as the violet hub ring draws itself and the label "operational context graph" resolves inside.
Scene 3 (5.5–8.6s): the sub-line "topology · change attribution · drift history · incident causality" reveals beneath the hub, mono dim; held read; ring gets subtle jitter at most.

## Frame 10 — Governance

- scene: Type relay on the loop: "build → govern → observe → remediate" with a "policy: passed" chip landing on govern; below, the recommend → approve → act-within-policy ladder.
- voiceover: "Every action inside policy. Bounded autonomy that scales at the pace of your confidence."
- duration: 6.9s
- transition_in: crossfade
- status: animated
- src: compositions/frames/10-governance.html
- type: benefit_highlight
- persuasion: Risk reversal
- beat: trust
- blueprint: fixed-anchor-cycle (Adapt)
- focal: the loop line with the policy chip
- roles: loop line = cutout · ladder = supporting
- sfx: none

narrativeRole: The trust beat; answers "we don't trust agents to change production".
keyMessage: Guardrails baked in.

Adapt: keep the pinned anchor with stepping states; the loop line pins, the chip and ladder step beneath it.
Scene 1 (0.0–2.4s): the loop line "build → govern → observe → remediate" reveals center-upper, mono; on "every action inside policy" @0.1 the word "govern" lights accent yellow and the "policy: passed" chip spring-settles onto it (`spring-pop-entrance`).
Scene 2 (2.4–5.2s): on "bounded autonomy that scales…", the three-step ladder builds left to right — recommend → approve → act within policy — each step a hairline card landing in sequence.
Scene 3 (5.2–6.9s): held read; stillness.

## Frame 11 — Closer

- scene: The claim lands massive: "outcomes, not agents." then the CTA card: "Schedule a demo" with stackgen.com.
- voiceover: "Aiden OS. Outcomes, not agents. Schedule a demo at stackgen.com."
- duration: 7.3s
- transition_in: zoom-through
- status: animated
- src: compositions/frames/11-closer.html
- type: cta
- persuasion: Future pacing
- beat: motivation
- blueprint: kinetic-type-beats (Reproduce)
- focal: the claim + CTA pill
- roles: claim = cutout · brand kicker + url = supporting · CTA pill = cutout
- sfx: none

narrativeRole: Closer; the claim plus the sole CTA.
keyMessage: Schedule a demo.

Reproduce: closing line snapping beat-by-beat onto the CTA.
Scene 1 (0.0–1.8s): bare canvas; mono kicker "aiden os" fades in center.
Scene 2 (1.8–3.6s): on "outcomes, not agents", the claim reveals per-word at 120px/800 (`dynamic-content-sequencing`), ink.
Scene 3 (3.6–7.3s): on "schedule a demo at stackgen.com", the accent CTA pill "schedule a demo" settles beneath the claim with "stackgen.com" mono muted under it; held to the final frame — the video's only real exit is a fade to canvas at the very end.
