# Headless Webflow CMS (Data API v2 + Webflow Cloud)

**Status:** implemented (normalized model, 2026-09-01).  
**CMS site:** Stackgen_CMS `6a963636415716d0962707fd` (Designer CMS; Next.js fetches this)  
**Cloud app site:** stackgen-web `6a93a93c010322a33528c733`  
**App:** Path B Cloud SSR, mount `/`, environment `main`

## Goal

Editors change homepage copy, product copy, and blog posts in the Webflow CMS UI. Next.js Server Components fetch published items via Data API v2. Code updates ship with `webflow cloud deploy`. Docs stay markdown.

## Collections

CLI cannot pass Option choices or MultiReference targets, so Cards/Faqs are related by `slot` + `product-slug` PlainText instead of ItemRefSet. Same editorial model: shared card/faq items, not nested blobs.

| Collection | Slug | Role |
|---|---|---|
| Cards | `cards` | Reusable title/body/href/label rows (symptoms, pillars, roles, product cards) |
| Faqs | `faqs` | Question/answer rows keyed to a product slug |
| Posts | `posts` | Blog/news |
| Home | `home` | Singleton (`slug=home`) for homepage strings |
| Products | `products` | One item per `/product/aiden-for-*` slug |

TypeScript modules `web/content/replica.ts` and `web/content/products.ts` remain the fallback when the API is missing, empty, or errors.

## Fetch

Server-only `fetch` in `web/lib/webflow-cms.ts` to `https://api.webflow.com/v2/collections/{id}/items/live`. Env: `WEBFLOW_API_TOKEN` (secret), `WEBFLOW_CMS_SITE_ID=6a963636415716d0962707fd` (non-secret). Keep Cloud `WEBFLOW_SITE_ID` for deploys. `revalidate: 300`. No `webflow-api` SDK.

Collection IDs (Stackgen_CMS):

| Collection | ID |
|---|---|
| Cards | `6a9636cf1715c584f2dd5e15` |
| Faqs | `6a9636d091feefafaa51f2d3` |
| Posts | `6a9636d16f1d9c226162c6b2` |
| Home | `6a9636d2c11a779053907675` |
| Products | `6a9636d22da825b206916f38` |

Cloud dashboard must set `WEBFLOW_API_TOKEN` for runtime fetches. Link fields store full `https://stackgen.com/...` URLs; overlay strips to path.

## Routes

- `/` merges Home + Cards onto `replicaContent`
- `/product/[slug]` merges Products + Cards + Faqs onto `getProductContent(slug)`
- `/blog` index and `/blog/[slug]` from Posts (covers existing homepage learn-more hrefs)

## Blocker (resolved 2026-09-01)

`stackgen-web` is a Webflow **Cloud SSR** companion. Collection-id APIs 404 there. CMS lives on **Stackgen_CMS** (`6a963636415716d0962707fd`), a standard Designer site. Next.js on Cloud fetches that site’s Data API. Site must be published once before CMS items can be published live.

## Deploy

Path B, from `web/`:

```
rm -rf .next
webflow cloud deploy --no-input --site-id 6a93a93c010322a33528c733 --app-id fdccfeab-a8b1-415b-8b1f-47af5d9df687 --mount / --environment main --skip-mount-path-check --skip-update-check
```

Wipe `.next` first. Stale `.next/dev` typedRoutes validators fail Cloud typecheck.
