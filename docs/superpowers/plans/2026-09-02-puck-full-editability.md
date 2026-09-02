# Puck full editability — implementation plan

> **Status:** Implemented 2026-09-02

**Goal:** All visible copy, logos, cards, and FAQs editable inline in Puck; canvas shows full page stack.

**Architecture:** Expand block fields (logos `items[]`), canvas UX (hero preview height + dark theme), `--force` seeds rebuild `puckData` from overlay, hide legacy collections.

**Spec:** [2026-09-02-puck-full-editability-design.md](../specs/2026-09-02-puck-full-editability-design.md)

## Completed tasks

- [x] `PuckCanvasContext` + hero `min-h-[50vh]` in canvas only
- [x] `ThemeProvider.initialTheme="dark"` in `PuckRenderProviders`
- [x] Home logos `items[]` field + `mergeReplicaContent` + seed builder
- [x] Blog `StackGenBlogParagraph` blocks in `buildBlogPuckData`
- [x] `--force` on `seed-puck-home`, `seed-puck-products`, `seed-puck-posts`
- [x] `pnpm migrate:puck-inline` script
- [x] Hide `cards` / `faqs` admin; remove from Live Preview

## Post-deploy

```bash
cd web
export $(grep -v '^#' .env | xargs)
pnpm migrate:puck-inline
```

Reload Puck admin — homepage should show 9 blocks with dark theme; scroll reveals all sections.
