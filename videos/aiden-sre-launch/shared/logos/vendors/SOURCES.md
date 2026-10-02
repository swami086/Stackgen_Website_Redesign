# Official vendor logos (F03) — Task 7b

Partner-logo approval still pending (U5). These files replace the Iconify Simple Icons copies in `shared/logos/` for F03 only.

**Film usage (all vendors):** Full-color primary mark on a small light tile `#FAF7F2`, `0px` border-radius. Preserve official colors; do not recolor. Apply vendor clear-space as padding inside the tile (minimum size per guideline below).

| File | Source page | Download URL | Fetched | Variant |
|---|---|---|---|---|
| `datadog.svg` | [Datadog Logos & Press Kit](https://www.datadoghq.com/about/resources/) | [Logo_Assets.zip](https://corp.dd-static.net/zip/Logo_Assets.zip) → `Logo Assets/DD Vector Logos/Vertical/SVG/dd_logo_v_rgb.svg` | 2026-10-01 | Vertical RGB (purple on light) |
| `grafana.svg` | [Grafana Trademark Policy](https://grafana.com/trademark-policy/) · mark served on [grafana.com](https://grafana.com/) | [grafana-header-logo.svg](https://a-us.storyblok.com/f/567658451994139/143x24/8360e7918b/grafana-header-logo.svg) | 2026-10-01 | Full-color wordmark + gear (`#FF671D`) |
| `prometheus.svg` | [CNCF artwork (Prometheus)](https://github.com/cncf/artwork/tree/master/projects/prometheus) | [prometheus-horizontal-color.svg](https://raw.githubusercontent.com/cncf/artwork/master/projects/prometheus/horizontal/color/prometheus-horizontal-color.svg) | 2026-10-01 | Horizontal color |
| `new-relic.svg` | [New Relic Media Assets](https://newrelic.com/about/media-assets) | [New-relic-logo-green.svg](https://newrelic.com/sites/default/files/2026-05/%20New-relic-logo-green.svg) | 2026-10-01 | Green wordmark (`#46b978`) |
| `pagerduty.svg` | [PagerDuty brand guidelines](https://brandguides.brandfolder.com/pagerduty) · [Public assets](https://brandfolder.com/pagerduty/external) | Brandfolder asset **PagerDuty logos** → `PagerDuty-GreenRGB.svg` (via [Brandfolder API](https://brandfolder.com/api/v4/assets/q62dl7-dveke8-2u9rcd/attachments)) | 2026-10-01 | Green RGB (`#048A24`) |
| `aws.svg` | [AWS Architecture Icons](https://aws.amazon.com/architecture/icons/) | [Icon-package_07312026.zip](https://d1.awsstatic.com/onedam/marketing-channels/website/public/shared/architecture-icon-release/Icon-package_07312026.5846e92413caa21490223536cc97f1269e44fa92.zip) → `Architecture-Group-Icons_07312026/AWS-Cloud-logo_32.svg` | 2026-10-01 | AWS Cloud group logo (official icon set) |
| `google-cloud.svg` | [Google Cloud Press Corner — Digital Assets](https://www.googlecloudpresscorner.com/digital-assets) | [Google_Cloud_Logos.zip](https://www.googlecloudpresscorner.com/download/Google_Cloud_Logos.zip) → `Google_Cloud_Logos/RGB-20260806T162906Z-1-001/RGB/Full Color/GC_Logo_FullColor_rgb.svg` | 2026-10-01 | Full-color RGB |
| `microsoft-azure.svg` | [Azure Architecture Icons](https://learn.microsoft.com/en-us/azure/architecture/icons/) | [Azure_Public_Service_Icons_V24.zip](https://arch-center.azureedge.net/icons/Azure_Public_Service_Icons_V24.zip) → `Azure_Public_Service_Icons/Icons/other/10018-icon-service-Azure-A.svg` | 2026-10-01 | Azure “A” service icon (official set) |

All eight SVGs validated with `xmllint --noout` on 2026-10-01. None are byte-identical to the prior Iconify files in `shared/logos/`.

## Guideline notes (dark film + light tile)

### Datadog
- **Clear space / size:** Use vertical logo; maintain proportion; no alteration to mark/type ratio.
- **Color / background:** Purple logo (`#632CA6`) on white/light; white logo on purple or neutral/dark. Do not invert, recolor, gradient, outline, or distort.
- **Don’ts:** No logo inside a decorative box or shape ([press kit](https://www.datadoghq.com/about/resources/)).
- **On-tile:** `#FAF7F2` tile is acceptable as a light background for the purple mark; avoid framing that reads as a “contained box” around the logo.

### Grafana
- **Clear space / size:** Do not alter logo colors, proportions, or design; scaling allowed if proportions preserved ([trademark policy](https://grafana.com/trademark-policy/)).
- **Attribution:** Required on materials using Grafana Marks: *“The Grafana Labs Marks are trademarks of Grafana Labs, and are used with Grafana Labs’ permission. We are not affiliated with, endorsed or sponsored by Grafana Labs or its affiliates.”*
- **License:** OSS/community discussion use is covered by policy; **other uses (including commercial/co-branded film) require a trademark license** — contact `hello@grafana.com`.
- **On-tile / co-brand:** **Flag for orchestrator** — attribution + license before F03 ships.

### Prometheus (CNCF)
- **Clear space / size:** Use CNCF-supplied artwork without modification ([CNCF artwork repo](https://github.com/cncf/artwork)).
- **Color / background:** Use official color horizontal logo; do not recolor.
- **On-tile:** Standard integration display on light background is typical for CNCF project marks; follow CNCF/project trademark notices if shown alongside other brands.

### New Relic
- **Clear space / size:** Use authorized logos from media kit only; “New Relic” two words, both capitals ([media assets](https://newrelic.com/about/media-assets)).
- **Don’ts:** Do not modify marks or imply sponsorship/endorsement ([trademark section on same page](https://newrelic.com/about/media-assets#guidelines)).
- **On-tile:** Light tile for green/black marks is consistent with kit; avoid endorsement language in surrounding copy.

### PagerDuty
- **Clear space / size:** Use approved assets from Brandfolder; do not modify marks ([brand guidelines](https://brandguides.brandfolder.com/pagerduty)).
- **Don’ts:** No confusing use, sponsorship implication, or modification (per asset usage text on **PagerDuty logos** collection).
- **On-tile:** Green logo on `#FAF7F2` matches light-background usage; keep clear space inside tile.

### AWS
- **Clear space / size:** AWS Marks need reasonable spacing from other elements ([AWS Trademark Guidelines](https://aws.amazon.com/trademark-guidelines/)).
- **Color / background:** Official architecture icon includes `#242F3E` tile with white “aws” lettering — use unmodified.
- **Don’ts:** Do not distort, rotate, or misuse marks to imply AWS endorsement of StackGen.
- **On-tile:** Nested dark icon square on `#FAF7F2` is intentional official artwork; ensure outer padding satisfies spacing rules.

### Google Cloud
- **Clear space / size:** Use logos from Press Corner / brand resources without alteration ([digital assets](https://www.googlecloudpresscorner.com/digital-assets)).
- **Color / background:** Full-color logo on light backgrounds per RGB kit.
- **Don’ts:** Follow Google trademark / product icon rules ([Brand Resource Center](https://about.google/brand-resource-center/rules/)).
- **On-tile:** `#FAF7F2` light tile aligns with full-color RGB usage.

### Microsoft Azure
- **Clear space / size:** Icons only for permitted diagram/documentation use; do not crop, flip, rotate, or distort ([Azure icons terms](https://learn.microsoft.com/en-us/azure/architecture/icons/#icon-terms)).
- **Color / background:** Use icon as provided (full-color Azure “A”).
- **Don’ts:** Do not use Microsoft product icons to represent your product; no endorsement implication.
- **On-tile:** Light tile for contrast on dark stage is fine if icon is unmodified and labeled in context if required.

## media-use ledger

Ingested via `npx hyperframes media-use resolve --type logo --from shared/logos/vendors/<file> --entity "<Vendor>"` (2026-10-01): `logo_001`–`logo_008` in `.media/images/`.

## Compliance flags for orchestrator

| Vendor | Concern |
|---|---|
| **Grafana** | Commercial/co-branded use likely needs **trademark license** + **mandatory attribution** copy on or adjacent to the mark. |
| **New Relic, PagerDuty, AWS, Google, Microsoft, Datadog** | Do not imply **partnership, sponsorship, or endorsement** in F03 layout/copy. |
| **Datadog** | Avoid treatment that reads as logo **inside a decorative box** (guideline don’t). |
