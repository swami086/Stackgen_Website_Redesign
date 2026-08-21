# Wave 1 — Accepted deviations log

Every deliberate departure from canvas pixel-parity or full WCAG 2.2 AA conformance, gathered from task reports T2–T24, Global Constraints, and the T22 parity audit.

**Branch:** `wave1-nextjs`  
**Last updated:** 2026-08-20 (T25)

| # | Deviation | Type | Reason | Canvas node / route | Approved by |
|---|-----------|------|--------|---------------------|-------------|
| 1 | Accent-coloured body text uses `--color-accent-text` (`#C9A2FF`) instead of canvas `--color-accent` (`#9437FF`) for copy below 24px | A11y / Parity | Global Constraint 6: `#9437FF` is 4.03:1 on `#08090A` and fails AA for small text; pre-approved contrast substitution | All routes | Wave 1 spec (GC 6) |
| 2 | Home page includes shared `Footer` primitive | Parity | Spec §6 open item: canvas frame `JLg8h` has no Footer child; every other Wave 1 page does | `JLg8h` / `/` | T5 report / spec §6 |
| 3 | WCAG 2.2 SC 1.4.10 Reflow not met | A11y | Desktop-only prototype; `min-width: 1440px`, no responsive breakpoints (Global Constraint 12) | All routes | Wave 1 spec (GC 12) |
| 4 | WCAG 2.2 SC 1.4.4 Resize Text not met at 200% zoom without horizontal scroll | A11y | Accepted companion to desktop-only scope (Global Constraint 12) | All routes | Wave 1 spec (GC 12) |
| 5 | `MetricCell` renders a third line (`metric.mechanism`) where canvas stat ribbons show value + label only | Parity | Global Constraint 5 requires every metric to cite a mechanism in the DOM | `m2UJ8` / home + non-compact metrics | T2 report (GC 5) |
| 6 | `MetricCell` `compact` mode omits mechanism line from product/case metric ribbons | Parity / Content | T24 parity fix: canvas ribbons are two-line; mechanism remains elsewhere on page (mechanism section + content modules) | Product + case routes | T24 batch |
| 7 | Nav IA: Product · Platform · Case Studies · Company (no Login) vs canvas Solutions · Company · Resources + Login | Parity (Major) | Wave 1 IA locked in spec / page briefs; reverting to canvas nav would be a silent IA change | Nav `JJx7F` / all routes | T24 accepted |
| 8 | Home section order: Hero → Mechanism (`ChangeSurface`) → Logos vs canvas logo row immediately below hero visual | Parity (Major) | Spec §6 section order; canvas full-frame screenshot conflates hero terminal UI with mechanism frame `sK5Fc` | `JLg8h` / `/` | T24 accepted |
| 9 | Schedule Demo page ships working stub form (email, company, role, client validation) vs canvas placeholder note | Parity (Major) | Spec §6 requires functional stub form; canvas placeholder is stale relative to approved spec | `K6I26T` / `/schedule-demo` | T24 accepted |
| 10 | Integrations section: 8-icon featured strip vs canvas 36-tool categorized grid (7 category rows) | Parity (Major) | T3 `home.integrations` lacks category/tool arrays; full grid deferred pending content expansion | `K1zfG` / `/` | T8 + T24 deferred |
| 11 | Integration tool logos are local SVGs under `web/public/logos/tools/` (originally fetched from Simple Icons because Pencil logo component IDs were MISSING) | Asset / Parity | Recorded Pencil IDs (`j8jzF`, `HoxfJ`, …) missing from `Stack_Linear.pen`; T8 substituted Simple Icons assets and committed them locally — not live CDN at runtime | `K1zfG` / `/` | T8 report; final review I10 |
| 12 | Home hero is text-only; no large dashboard/terminal visual below headline | Parity (Critical) | Pencil read of `XPc1X` (2026-08-20) has copy + CTA only—no dashboard child nodes, no `hero-*.json` export; terminal UI belongs to Mechanism `sK5Fc` per spec §6 | `XPc1X` / `/` | T24 escalated |
| 13 | Platform page ~917px taller than scaled canvas at 1440px width | Parity (Major) | Excess vertical padding in mid-page sections (`PlatformContextGraphSection`, `AidenOsLinks`); not batch-fixed in T24 | `T4FJtW` / `/platform` | T22 parity report |
| 14 | Home hero typography: H1 at 64px with no visual counterweight; fold feels text-heavy | Parity (Minor) | No hero product mockup (see #12); typography matches tokens but canvas balance differs | `XPc1X` / `/` | T24 deferred |
| 15 | Home cumulative page height ~23px shorter than scaled canvas | Parity (Minor) | Section spacing token drift vs canvas vertical rhythm | `JLg8h` / `/` | T24 deferred |
| 16 | Platform OCG diagram: hub-and-spoke connector/node styling lighter than canvas | Parity (Minor) | SVG topology correct; purple node connectors and hairline weight differ visually | `O4fic7` / `/platform` | T24 deferred |
| 17 | Product Infrastructure hero top padding `pt-24` (96px) vs canvas ~88px clearance below nav | Parity (Minor) | Tokenised spacing differs from measured canvas frame | `zTOam` / `/product/aiden-for-infrastructure` | T24 deferred |
| 18 | Product Automation mechanism: Active Gating / Self-Verification cards vertically closer to pipeline than canvas | Parity (Minor) | Layout gap in `AutomationMechanism.tsx` tighter than reference | `bEaQH` / `/product/aiden-for-automation` | T24 deferred |
| 19 | Product SRE mechanism: heading appears in card header area as well as section header | Parity (Minor) | Residual duplication after T24 layout rebuild vs single heading above card on canvas | `HL34b` / `/product/aiden-for-sre` | T24 deferred |
| 20 | Case studies index: no `PROOF` mono label above hero h1 | Parity (Minor) | Canvas places section label in hero; built omits label | `k1XEU` / `/case-studies` | T24 deferred |
| 21 | Case studies index: Final CTA includes extra body copy under heading | Parity (Minor) | Canvas shows heading + button only; content module adds subtext | `k1XEU` / `/case-studies` | T24 deferred |
| 22 | Case studies index: +400px total height vs scaled canvas (hero-to-cards gap) | Parity (Minor) | Vertical rhythm drift | `k1XEU` / `/case-studies` | T24 deferred |
| 23 | Case greytHR: no `CASE STUDY` mono label above title | Parity (Minor) | Canvas label in hero; built omits | `gYoDZ` / `/case-studies/greythr` | T24 deferred |
| 24 | Case greytHR: Final CTA center-aligned with subtext vs canvas left-aligned heading + button | Parity (Minor) | Shared `FinalCta` layout differs from case canvas frame | `gYoDZ` / `/case-studies/greythr` | T24 deferred |
| 25 | Case greytHR: published quote includes inline “Source” link (a11y fixed in T24; canvas shows single-line attribution) | Parity (Minor) | `PRODUCT.md` / content requires published quote with `sourceUrl`; persistent underline added for WCAG 1.4.1 | `gYoDZ` / `/case-studies/greythr` | T3 content + T24 a11y |
| 26 | Case Innovaccer: no `CASE STUDY` mono label above title | Parity (Minor) | Same pattern as greytHR | `YEXx8` / `/case-studies/innovaccer` | T24 deferred |
| 27 | Case Innovaccer: Final CTA includes extra subtext paragraph | Parity (Minor) | Content module shape vs canvas heading + button | `YEXx8` / `/case-studies/innovaccer` | T24 deferred |
| 28 | Case Innovaccer: placeholder governance line retained (canvas copy; flagged for future content pass) | Content (Minor) | Canvas and built both show placeholder; logged for editorial follow-up, not a build defect | `YEXx8` / `/case-studies/innovaccer` | T22 flag |
| 29 | Schedule Demo: no `GET STARTED` mono label above h1 | Parity (Minor) | Canvas label in hero; built omits | `K6I26T` / `/schedule-demo` | T24 deferred |
| 30 | Schedule Demo: no secondary purple “Schedule demo” button under hero copy | Parity (Minor) | Conversion path is form-only per spec §6; canvas shows redundant hero CTA | `K6I26T` / `/schedule-demo` | T24 deferred |
| 31 | `SectionHeaderSplit` API requires `label` prop; some canvas heading blocks show heading + body only | Parity (Minor) | Wave 1 component interface adds optional mono label slot not present on every canvas node | Various section headers | T2 report |

## Notes

- **T3 / PRODUCT.md:** No naming copy overrides were required; canvas already uses binding product names. Git/estate phrasing on canvas diagram nodes (`cZRZ6`, `eua8k`, `Bn2Nk`) was not transcribed into marketing content modules.
- **T23 a11y:** All Critical, Major, and Minor axe/manual findings were fixed in T24. Rows 3–4 remain the only accepted WCAG gaps.
- **T24 fixes not listed:** Items repaired in T24 (mechanism diagram layouts, compact metrics, hero mono labels, page titles, skip link, nested-interactive diagram, etc.) are intentionally omitted—they are no longer departures.

**Total accepted deviations:** 31
