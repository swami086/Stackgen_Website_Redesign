# Aiden SRE film — QA log

## Look lock (T11)
- BLOOM_MID = 0.25, BLOOM_FG = 0.25, GRAIN = 5
- Reason: Of the six frame-75 variants, 0.25 is the opacity where the violet bar still reads as a glow and plate text keeps the most green (mean G 237 vs 221 at 0.50). 0.35 and 0.50 lift the ink margin from about (139, 0, 152) toward (187, 0, 210), a magenta flood, because the white P07 plate sits above the 0.78 colorlevels cutoff and feeds the screen blend. GRAIN 5 is the stronger of the two noise settings; 3 vs 5 is a small delta (mean channel-sum difference 0.72) but 5 is the one that breaks leftover bloom banding. Sheet layout: columns BLOOM_MID 0.25 / 0.35 / 0.50, rows GRAIN 3 then 5.
- Evidence: renders/review/S12-look.png, S12-1..4.png

## Mocks
- S12, plate P07, keys mocked: hyp-1-bar, hyp-1-score, hyp-2-bar, hyp-2-score, hyp-3-bar, hyp-3-score, hyp-4-bar, hyp-4-score, hyp-5-bar, hyp-5-score, hyp-6-bar, hyp-6-score.
- P07.png is mounted. Those twelve keys are listed in missing, and mask/overlay throw on a missing key. Each bar and score is a DOM mock aligned to the existing hyp-N row (viewport y from the snapshot), sitting in the clear column at viewport x 1220 (bar, 230 px) and x 1464 (score). Track is --sg-ink-raised, fill is --sg-violet on hyp-1 and --sg-mute on the rest, labels are Geist Mono 20 px on --sg-panel. Values [ILLUSTRATIVE]: 87, 34, 22, 11, 6, 4. No image model was used.
- S16, plate P09, keys mocked: rca-summary, fix, runbook, chat.
- S17, plate P10, keys mocked: action-row, opt-restart, opt-scale, opt-reroute, opt-rollback.
- S18, plate P10, keys mocked: action-row, opt-restart, opt-scale, opt-reroute, opt-rollback.
- S24, plate P12, whole plate mocked (missing). Standard box x 120, y 90, 1680×945. DOM copy: checkout-svc, Incident resolved, Status · Resolved, Error rate back to baseline, Rollback held. No plate keys.
