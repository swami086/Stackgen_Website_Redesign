# Payload Versions + Drafts + Autosave

**Date:** 2026-09-02  
**Status:** Approved (Approach 1)

## Goal

Persist CMS change history with draft/publish and autosave for Stackgen Payload content (not Puck `pages`, which already versions).

## Decisions

| Decision | Choice |
|---|---|
| Model | Versions + drafts + autosave |
| Scope | `posts`, `products`, `cards`, `faqs`, `home` |
| Draft visibility | Logged-in admins only; public sees published |
| Skip | `media`, `users` (`versions: false`), Puck `pages` |
| Scheduled publish | Out of scope |

## Architecture

1. Shared `versions` block on each target collection/global:
   ```ts
   versions: {
     drafts: { autosave: true },
     maxPerDoc: 100,
   }
   ```
2. Shared `authenticatedOrPublished` read access — unauthenticated queries constrained to `_status: published`.
3. `web/lib/payload-cms.ts` keeps `overrideAccess: true` but filters `_status: published` (same pattern as `puck-pages.ts`) so Local API public reads stay correct.
4. `seed-app.ts` writes `_status: 'published'`.
5. Postgres migration adds `_*_v` tables + `_status` columns; data backfill sets existing rows to `published` so the live site does not go empty.

## Out of scope

- Versioning media/users
- Changing Puck `pages` versions config
- `schedulePublish`

## Success criteria

- Admin shows Versions UI + autosave + draft/publish on scoped collections/global
- Public site continues to render existing content after migrate
- Unauthenticated REST cannot read draft documents
