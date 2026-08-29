# Wave 1C Vendor Mark Registry Report

**Date:** 2026-08-29  
**Task:** 1C - Vendor mark registry  
**Gate status:** PASS

---

## Registry slugs (13)

`aws`, `backstage`, `cursor`, `datadog`, `eks`, `github`, `gitlab`, `jira`, `opa`, `pagerduty`, `prometheus`, `slack`, `terraform`

---

## Source audit

| Slug | Source | Theme treatment |
|------|--------|-----------------|
| cursor | `.firecrawl/official-logos/Cursor.svg` | Theme-sensitive (ink/cutout invert) |
| github | `.firecrawl/official-logos/GitHub.svg` | Theme-sensitive (white/black) |
| gitlab | `.firecrawl/official-logos/GitLab.svg` | Full color |
| terraform | `.firecrawl/official-logos/Terraform.svg` | Full color |
| eks | `.firecrawl/official-logos/EKS.svg` | Full color |
| aws | `.firecrawl/official-logos/AWS.svg` | Theme-sensitive (navy/white text + orange smile) |
| pagerduty | `.firecrawl/official-logos/PagerDuty_final.svg` | Full color |
| jira | `.firecrawl/official-logos/jira-icon.svg` | Full color |
| opa | `.firecrawl/official-logos/OPA.svg` | Full color |
| slack | `.firecrawl/official-logos/Slack.svg` | Full color |
| backstage | `.firecrawl/official-logos/backstage.svg` | Full color |
| **datadog** | **Simple Icons fallback** (`https://cdn.simpleicons.org/datadog`) | Monochrome `var(--ds-text-secondary)` |
| **prometheus** | **Simple Icons fallback** (`https://cdn.simpleicons.org/prometheus`) | Monochrome `var(--ds-text-secondary)` |

No official SVG existed for Datadog or Prometheus in `.firecrawl/official-logos/` (PNG only). Firecrawl brand scrape was not required after Simple Icons path data was obtained.

---

## Files created

| File | Role |
|------|------|
| `web/components/replica/logos/marks.tsx` | 13 inline SVG mark components, `VENDOR_MARKS`, `VendorMark` |
| `web/components/replica/logos/index.ts` | Public barrel + `VENDOR_NAMES` |
| `web/__tests__/vendor-marks.test.tsx` | Registry coverage, render, theme, a11y tests |

**Note:** `VendorMark` and `VENDOR_MARKS` live in `marks.tsx` (`.tsx` required for JSX). `index.ts` re-exports only.

---

## Tests

```
pnpm vitest run __tests__/vendor-marks.test.tsx
4 passed (4)
```

- Registry keys match exactly 13 required slugs
- Every mark renders `<svg>` in light and dark
- Theme-sensitive marks (`github`, `cursor`, `aws`) differ between themes
- Marks are `aria-hidden="true"` by default

---

## Out of scope (Task 1C agent boundary)

- Lucide to Phosphor migration (plan Step 6) not included in this commit
- Diagram consumers (Wave 2+) not wired yet

---

## Concerns

1. **Datadog / Prometheus** use Simple Icons monochrome, not brand purple/orange. Acceptable per design spec fallback; may need official SVG if brand review rejects monochrome.
2. **Cursor wordmark** is wide (`viewBox="0 0 600 146"`). Diagram pills may need `className` width constraint at integration time.
3. **Accent collision** (Terraform/Datadog purple vs dark accent) documented in design spec; diagrams must not place purple marks on accent surfaces.
