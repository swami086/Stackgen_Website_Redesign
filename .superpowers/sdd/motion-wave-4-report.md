# Motion Wave 4 Report — Integration

**Date:** 2026-08-29  
**Model:** composer-2.5-fast  
**Scope:** Tasks 4.1–4.3 (PNG → live diagrams, home test expansion, README)

## Task 4.1 — Swap diagram hosts

| File | Change |
|------|--------|
| `web/components/replica/sections/Assemblies.tsx` | Replaced three `<img>` tags with `<InnerOuterLoop>`, `<Offerings>`, `<Integrations>` |
| `web/components/replica/sections/Shell.tsx` | Replaced `<img>` with `<ContextGraph theme={theme} />` |
| `web/content/replica.ts` | Removed `assemblies.diagrams` and `shell.diagrams` PNG path maps |
| `web/public/media/replica/` | Deleted (8 PNG files) |

`HomeReplica.tsx` — no changes needed; it delegates to section components only.

**Verification:** `pnpm typecheck && pnpm test && pnpm build` — all pass.

**Commit:** `09adf93` — `feat: replace PNG diagrams with live components`

## Task 4.2 — Home integration tests

Added four tests to `web/__tests__/replica-home.test.tsx`:

- No diagram renders as `/media/replica/` raster
- ≥4 accessible `[role="img"][aria-label]` figures
- Four canvas eyebrows present (OPERATIONAL CONTEXT GRAPH, WHO IT'S FOR, INNER LOOP, OUTER LOOP)
- Context Graph layer rail reachable (`tablist` named "Aiden OS layers")

**Verification:** 63 tests pass (15 files).

**Commit:** `24d0369` — `test: assert live diagrams, eyebrow count, and rail reachability`

## Task 4.3 — README

Added **Motion and material system** section to `web/README.md` covering tiers, token source, seeded PRNG rule, pinned section budget, and capture freeze hooks.

**Commit:** `2b07553` — `docs: document the motion and material system` (includes wave report via `git add -f`)

## Asset cleanup

```bash
rg -n "media/replica" web/  # → clean (no references)
ls web/public/media/replica  # → No such file or directory
```

## Concerns

- `web/public/media/replica/` PNGs were never tracked in git; deletion is filesystem-only.
- Initial commit accidentally staged unrelated `web/public` changes; reset and recommitted with scope-limited files only.
