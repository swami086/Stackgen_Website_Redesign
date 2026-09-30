# AOF Homepage Film Refine Implementation Plan

> Paused. The hero asset is specified in `docs/superpowers/specs/2026-09-30-aof-homepage-film-refine-design.md` (12s silent loop). Do not execute the tasks below until that hero spec is accepted. They still describe the 138.745s cut.


> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development. Tasks 2–5 touch different files and may run together only in separate worktrees. On one branch, run them one at a time.

**Goal:** Make the built 138.745s film read as a homepage product film: full-frame product UI, joined factory, no static holds over 4s.

**Architecture:** Keep `videos/aof-homepage/index.html` as the clock. Change the six compositions and replace the three snapshots. No new project. No MP4.

**Tech Stack:** HyperFrames `0.8.40`, GSAP `3.14.2`, Node 22 at `/opt/homebrew/opt/node@22/bin`, IBM Plex Sans from `assets/fonts/IBMPlexSans-Var-Roman.woff2`.

**Spec:** `docs/superpowers/specs/2026-09-30-aof-homepage-film-refine-design.md`

**Worktree:** `/Users/swami/Documents/Stackgen_Website_Redesign/.worktrees/aof-homepage-launch` on `feat/aof-homepage-launch-video`.

## Global Constraints

- Clock table in `docs/superpowers/specs/2026-09-30-aof-homepage-launch-video-design.md` stays. Do not change `data-start` or `data-duration`.
- Font: IBM Plex Sans. No Inter. `@font-face` src is `assets/fonts/IBMPlexSans-Var-Roman.woff2`.
- Approve `#9e33ea`. No `#15803d`, no green fill, no `box-shadow`, no side-tab, no modal, no whole-card punch.
- End card text is exactly `Schedule a demo`. `Explore the products` must not appear.
- No logo wall, no customer quote, no named customer.
- DevOps outcome stays `Scale impact, not tickets.`
- World-model chip stays `rollback fixed checkout`.
- Product body **36px**, titles **56px**, labels **22px**. SRE canvas `#f4f5f8`. Sheet at least 1400px wide, centered.
- No hold longer than 4s without a count, row, cursor, or card change.
- Locked pair `gap: 0` after the factory click, including the close card.
- Selectors prefixed by composition id. No bare `h1`, `#approve`, `#cursor`, `#ripple`, or a second `#root`.
- Do not render an MP4.
- Every command starts with `export PATH="/opt/homebrew/opt/node@22/bin:$PATH"`.
- Read the task’s skills before editing. Web research, if any, uses Firecrawl only.

## Skills by task

| Task | Read, in order |
|---|---|
| 1 Factory join | `hyperframes-animation` |
| 2 SRE surface | `hyperframes-creative`, then `hyperframes-animation` `rules/cursor-click-ripple.md`, then `hyperframes-registry` before drawing a new cursor |
| 3 InfraOps, DevOps, Observability | `hyperframes-creative`, then `hyperframes-animation` |
| 4 World model and Aiden OS | `hyperframes-animation` |
| 5 Close | `hyperframes-creative` |
| 6 Snapshots | `hyperframes-cli` |
| Any `hyperframes check` | `hyperframes-cli` once per session |

Do not load `webinar-marketing`, `ui-concept-animation`, `screenshots-to-walkthrough`, or `video-gated-product-demo`.

---

### Task 1: Factory pieces meet

**Files:** `videos/aof-homepage/compositions/factory.html`

**Skills:** `~/.cursor/skills/hyperframes-animation/SKILL.md`

- [ ] At the lock (local 21.96s), the pair’s gap is 0 and the two 280px tiles share an edge. Before that beat the quarters may stay apart.
- [ ] `npx --yes hyperframes@0.8.40 check` from `videos/aof-homepage`. `factory.html` must not be named in an error.
- [ ] Commit only `factory.html`. Message: `Join the factory pieces on the lock beat.`

### Task 2: SRE sheet fills the frame

**Files:** `videos/aof-homepage/compositions/products.html` (SRE section only)

**Skills:** creative, cursor-click-ripple, registry.

- [ ] Centered sheet, min-width 1400px, canvas `#f4f5f8`, hairline `#e6eaee`, type 56/36/22.
- [ ] Visible stage rail: Discover, Triage, Root cause, Remediate, Learn. Learn lights after the click.
- [ ] Queue count falls in the first cut. RCA card holds 99%, 461.8 ms, 400 ms, and the `CACHE_TTL_SECONDS` sentence. Approve click stays at local 16.2s. Label becomes Approved. Status becomes `Rollback queued`.
- [ ] Prefix every SRE id with `sre-`.
- [ ] `node scripts/check-products.mjs` exits 0. `hyperframes check` does not name `products.html` in an error.
- [ ] Commit only `products.html`. Message: `Draw the SRE investigation at homepage scale.`

### Task 3: The other three products are surfaces

**Files:** `videos/aof-homepage/compositions/products.html` (after Task 2)

**Skills:** `hyperframes-creative`, `hyperframes-animation`.

- [ ] InfraOps: request, Terraform-shaped block, policy row, approval queue. Line `Ship infra at AI speed.`
- [ ] DevOps: one named skill fans to a cost report and a cluster health check, plus a knowledge strip. Line `Scale impact, not tickets.`
- [ ] Observability: integrations row, assembling dashboard, boundary, cause card that names the cache-TTL change. Line `Observability without the upkeep.`
- [ ] Delete the strings `A recent change.`, `Skill` as a card title, `Create the module.`, `Awaiting check`, and `What changed in this service?`.
- [ ] Each product window changes at least every 4s. Crossfades do not leave two titles stacked. Offset the incoming fade by 0.2s.
- [ ] `check-products.mjs` exits 0.
- [ ] Commit only `products.html`. Message: `Show InfraOps, DevOps, and Observability as product surfaces.`

### Task 4: World model and Aiden OS

**Files:** `compositions/world.html`, `compositions/os.html`

**Skills:** `hyperframes-animation`.

- [ ] Connectors meet the chip. Chip text stays `rollback fixed checkout` and finishes under InfraOps.
- [ ] OS cursor tip is the transform origin so the point sits on the button centroid. Ids stay `os-approve`, `os-cursor`, `os-ripple`.
- [ ] `hyperframes check` does not name `world.html` or `os.html` in an error.
- [ ] One commit. Message: `Land the world-model chip and the OS click.`

### Task 5: Close uses the joined pair

**Files:** `compositions/close.html`

**Skills:** `hyperframes-creative`.

- [ ] The cluster is the locked pair with gap 0, scaled as one centered group.
- [ ] One button, `#1c1f24`, text `Schedule a demo`, fade unchanged.
- [ ] `node scripts/check-close.mjs` exits 0.
- [ ] Commit only `close.html`. Message: `Hold the joined factory on the end card.`

### Task 6: Three stills, then stop

**Files:** `videos/aof-homepage/snapshots/`

**Skills:** `~/.cursor/skills/hyperframes-cli/SKILL.md`

- [ ] Snapshot 3s, 50.4s, and 136s. 50.4s must show Approved and Rollback queued.
- [ ] Do not run render.
- [ ] Commit the three frames. Extra contact-sheet files may stay out of the commit.
- [ ] Message: `Snapshot the hook, the approved rollback, and the demo card.`

Stop. Report the three paths. Wait for a render ask.
