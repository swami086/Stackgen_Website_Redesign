# App Replica Parity Notes

**Date:** 2026-08-21  
**Branch:** `app-replica-next`  
**Baseline:** App Replica frames in `Stack_Linear.pen` (9 routes × light/dark)  
**Demo:** `docker compose --profile prod up --build` → http://localhost:3000

Honest record of known Wave 1 deviations. Structural copy/section order matches canvas; visual fidelity gaps remain.

---

## Screenshot QA (design §9.1)

| Check | Status |
|---|---|
| Pencil `TakeScreenshot` available | ✅ MCP `execute` — captured `nwYaY` (Home light), `kQPf7` (Platform light) |
| All 9 light frames vs browser @ 1440 | ❌ Not run — no side-by-side browser captures |
| All 9 dark frames (`data-theme=dark`) | ❌ Not run |
| Pixel diff / overlay compare | ❌ Deferred |

**Note:** Pencil golden masters exist for spot-check only; browser parity pass is still open.

---

## Token spot-check (design §9.2)

| Token | Pencil `ds-*` | `web/app/globals.css` | Match |
|---|---|---|---|
| `--ds-bg` light | `#fcfcfd` | `#fcfcfd` | ✅ |
| `--ds-bg` dark | `#0b0c0e` | `#0b0c0e` | ✅ |
| `--ds-accent` light | `#5b4fe8` | `#5b4fe8` | ✅ |
| `--ds-accent` dark | `#8c85ff` | `#8c85ff` | ✅ |
| `--ds-text-primary` light | `#12141a` | `#12141a` | ✅ |
| `--radius-sm/md/lg` | 6 / 8 / 12 | 6 / 8 / 12 | ✅ |
| `--spacing-pad-x/y` | 96px | 96px | ✅ |

**Exception:** Nav uses `px-[100px]` from canvas node `zQ0gY`; sections use `--spacing-pad-x` (96px). Intentional replica-fidelity for nav; may show 4px horizontal drift vs section content.

---

## Media & motion

| Area | Canvas expectation | Implementation | Gap |
|---|---|---|---|
| Home Mechanism | Product UI loop / rich still | Static PNG (`hero-HKEV6rkRDzU-1920.png`) | No `<video>` loop though MP4 exists under `public/media/aiden-home-change-surface/` |
| Product Mechanism (infra, obs) | Image plate with chrome | Static PNG + hardcoded hex (`#0B0C0E`, `#1F2124`, `#f3f4f6`, `#9aa0ac`) | Bypasses `ds-*`; dark-theme chrome may not track tokens |
| Product Mechanism (automation, SRE) | Steps/callouts only | No image key — text-only | Matches automation canvas; SRE not re-verified frame-by-frame |

---

## Layout approximations

| Section | Issue |
|---|---|
| Home Integrations | Fixed `w-[124px]` tiles; grid spacing/border rhythm approximate vs canvas |
| Home OCG | 5-column text grid; canvas uses richer diagram treatment |
| Platform OCG | CSS absolute layout (concentric circles + positioned cards) approximates hub-and-spoke diagram; copy correct, geometry approximate |
| Nav vs sections | Nav pad 100px vs section pad 96px (see tokens) |
| ThemeToggle | Minimal text button (`Dark` / `Light`); not styled to canvas chrome shelf |

---

## Copy & routing (acceptable per spec)

| Item | Notes |
|---|---|
| Hero / Final CTA `href="#"` | Canvas has no wired destinations |
| Company / Login | `#` — no App Replica pages |
| Schedule demo | `#` via `PRIMARY_CTA` |
| News placeholders | `PLACEHOLDER` / `No published item yet.` preserved |
| Metadata `\| StackGen` suffix | SEO expansion; not on canvas |
| Decorative ` →` on product links | `AgenticOs`, `AidenOsAndProductLinks` — not in canvas text nodes |

---

## Docker prod smoke (design §9.6)

Cold bring-up from worktree root (`docker compose --profile prod down && up --build -d`):

| Route | HTTP |
|---|---|
| `/` | 200 |
| `/platform` | 200 |
| `/enterprise` | 200 |
| `/pricing` | 200 |
| `/news` | 200 |
| `/product/aiden-for-infrastructure` | 200 |
| `/product/aiden-for-automation` | 200 |
| `/product/aiden-for-observability` | 200 |
| `/product/aiden-for-sre` | 200 |

Container: `app-replica-next-web-prod-1` on `0.0.0.0:3000`.

---

## Follow-ups (post Wave 1)

1. Run full 18-frame screenshot diff @ 1440 (light + dark) vs live routes.
2. Swap Home Mechanism to loop MP4 where canvas shows motion.
3. Reconcile Integrations tile grid and both OCG diagrams against Pencil exports.
4. Tokenize Mechanism image chrome; align nav/section horizontal padding if screenshots show drift.
5. Optional: href assertions in nav tests; route render smoke tests.
