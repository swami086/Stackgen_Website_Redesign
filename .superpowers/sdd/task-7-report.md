# Task 7 Report — Preview route + feature flag

**Status:** DONE  
**Date:** 2026-09-02  
**Implementer:** agent b089169c (+ controller verification)

## Deliverables

| File | Status |
|------|--------|
| `web/app/(site)/puck-layers-preview/page.tsx` | Loads slug `puck-layers-preview` via `getPublishedPageBySlug`, mirrors puck-demo |
| `web/app/(site)/page.tsx` | `PUCK_LAYER_TREE=1` prefers preview slug then homepage; default `/` unchanged |
| `web/app/(site)/[slug]/page.tsx` | `puck-layers-preview` added to `RESERVED` |

## Verify

- `:3010/puck-layers-preview` → **200** with PenPage tree (`Outcomes, not agents.`, OCG diagram slot, `data-pen-page`)
- `:3000/puck-layers-preview` → **200**
- Default `/` unchanged without env flag

## Concerns

1. Docker `:3000` image may lag until rebuild for brand-new routes (dev `:3010` is source of truth while iterating).
2. Do **not** `--force` homepage until Task 10 cutover.

## Commits

None (user rule).
