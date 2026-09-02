# Native Payload Live Preview (not the pemedia plugin)

## Why not the linked plugin

`pemedia/payload-visual-editor` — researched via Firecrawl:

- Latest npm version `2.0.6`, published **2 years ago**, 15 weekly downloads
- README: *"Version 2.x.x is compatible with Payload 2.x.x"* — no 3.x support
- Project runs Payload **3.88.0** — installing it risks a broken admin build

A community fork (`payload-plugin-visual-editor`, 5 GitHub stars, tagged
`payloadcms-v3`) exists but is young/single-maintainer and explicitly
disclaims any relation to Payload's own tooling.

**Decision (user-confirmed):** use Payload's own first-party [Live
Preview](https://payloadcms.com/docs/live-preview/overview) instead — zero
new third-party risk, officially maintained, does the same job.

## What was implemented

- `web/payload/payload.config.ts` — `admin.livePreview` enabled on the
  `home` global and `products` collection, with a `url` resolver and mobile/
  tablet/desktop breakpoints.
- `@payloadcms/live-preview-react@3.88.0` added (pinned to match server
  Payload version).
- `web/lib/cms-overlay.ts` — factored the home/product "direct field" overlay
  logic out of `overlayReplicaContent` / `overlayProductContent` into
  `applyHomeGlobalOverlay` / `applyProductGlobalOverlay`, reusable client-side
  without duplicating the merge rules.
- `web/lib/payload-cms.ts` + `web/lib/cms.ts` — new `getHomeGlobalRaw()` /
  `getProductRaw(slug)` exports (unmerged Payload doc shape, required by
  `useLivePreview`'s postMessage protocol).
- `HomeReplica.tsx` / `ProductPage.tsx` — both already client components with
  a `content` prop; added `useLivePreview` + live re-merge on top of the
  existing server-rendered `content`.

## Scope / limitation (by design)

Live Preview is **document-scoped** in Payload — it syncs the one document
currently open in the admin editor. That covers:

- `home` global's own text fields (hero, problem, solution, shell, who,
  footer copy)
- a `products` doc's own text fields (hero, problem, final CTA, FAQ heading)

It does **not** live-update Cards or Faqs, since those are separate
documents feeding fragments into the same pages — editing a Card doc doesn't
carry a page URL to preview against. Cards/Faqs still render from whatever
was last loaded server-side. This is an accepted v1 scope, not a bug.

## Verification

- `pnpm typecheck` — clean
- `pnpm build` — all routes build, including `/`, `/product/[slug]`,
  `/admin/[[...segments]]`
- Focused non-DOM vitest (`payload-cms.test.ts`) — passes
- Full `pnpm test` has a **pre-existing** `React.act is not a function`
  failure (106/158) reproduced identically with this change fully reverted —
  not caused by this work; a testing-library/React 19 environment issue to
  fix separately.

## Not yet done

- Not deployed to `stackgen-web-vm` — pending confirmation (new dependency +
  rebuild + redeploy on the e2-micro that OOM'd once already tonight).
