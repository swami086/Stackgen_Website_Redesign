# Aiden SRE film — frame polish

Date: 2026-10-01. Source ledger: `videos/aiden-sre-film/AUDIT.md`. Product frame: `videos/aiden-sre-film/shared/assets/plates/` P01 (Alerts, light). Technique bar: GitLab reference `videos/aiden-sre-film/source/reference/gitlab.mp4` — camera and type only, never its palette.

## Decision

The product is a light Alerts screen: pastel metric cards, a purple New Conversation button, a full table. The unpolished black boxes are not missing pixels. They are `var(--sg-panel)` masks and row fills painted over that screen (`shared/layers/ui.css` `.sg-mask`, `shots/S06` `.s06-row`, `shots/S07` `.s07-row`, `shots/S25` / `S26` `.qtile`).

Do not recapture the plates dark. Extend the plate. New chrome uses the plate’s card: fill `#F4EFFA`, hairline `#E3D8F2`, ink `#1C1A22`, label `#6B6280`, Geist Mono. Counters sit in that card instead of as 120px cream type stamped on the cards.

Leave S04 ribbon converge, S20 sparkline, S01 card column, and S27 ribbon settle alone.

## Changes

1. `shared/layers/type.js` `counter` and `shared/layers/type.css` `.sg-counter`. Wrap the number in a metric card with label “All Active”. Number 72px tabular, label 20px. S01 at x 1480 y 96. S02 at x 1480 y 48. The card is opaque so it no longer ghosts across alert cards.
2. `shots/S06/index.html`. Remove `plate.mask("list")` and the synthetic row track. The P01 table stays visible. Keep the header-count tween.
3. `shots/S07/index.html`. Remove `plate.mask("list")`. Rows transparent, titles hidden, so the plate table shows. Group heads become the same metric chip at 20px, not a 13px black bar.
4. `shots/S25/index.html` and `shots/S26/index.html`. Tiles 300×300, top 200, so the bottom pair clears y 1026. Fill matches the metric card. One hairline, no amber or coral frames. Every tile gets one 20px line: Remediate “Act on the open alert”, Build “Change the service”, Operate “Run the fix”, Observe “Watch the queue”.

## Not in this pass

S12 bars, S14 leader, S16 cursor, S24 empty panel, S27 second CTA, count continuity 1275→4875→856. Those stay on the ledger. Magenta New Conversation stays, because that button is on the captured plate.

## Check

Re-render S01, S02, S06, S07, S25, S26. Hold frames must show the P01 table on S06 and S07, a metric card clear of the S01 column, and four filled tiles inside the frame on S25.
