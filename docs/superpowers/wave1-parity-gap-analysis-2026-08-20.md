# Wave 1 Pencil-to-app parity gap analysis

Date: 2026-08-20

## Scope and evidence

Compared the authoritative Pencil route map in `design-reference/README.md` and the
read-only frames in `Stack_Linear.pen` against the running Next.js app at
desktop and responsive widths. Torbit was indexed before code navigation.

Existing desktop parity diagnostics report no SVG text overlap, SVG overflow, or
broken logo images at 1440px. That result is incomplete: it does not exercise
responsive widths and it does not catch a fixed desktop canvas being clipped
inside a narrow viewport.

Observed at 390px and 768px viewport widths on every audited route:

- `document.documentElement.scrollWidth` remains `1440px`.
- The root navigation and main content render at `1440px` wide.
- Content begins at desktop coordinates such as `x=100`, so headings and actions
  are clipped or absent from the visible mobile viewport.
- The current nav has no mobile state; the wordmark, links, and CTA remain in one
  desktop row.
- No image requests are broken. The apparent missing logos are primarily the
  desktop layout being clipped, plus the app's logo treatment differing from the
  mobile Pencil frame.

Desktop route heights also exceed the Pencil frame heights:

| Route | Pencil | App | Delta | Primary parity risk |
|---|---:|---:|---:|---|
| `/` | 9296 | 10150 | +854 | Home diagram/header bands and integration density |
| `/product/aiden-for-infrastructure` | 2685 | 2812 | +127 | Fixed mechanism/header spacing |
| `/product/aiden-for-automation` | 2478 | 2588 | +110 | Fixed mechanism/header spacing |
| `/product/aiden-for-observability` | 1984 | 2108 | +124 | Fixed mechanism/header spacing |
| `/product/aiden-for-sre` | 2346 | 2455 | +109 | Fixed mechanism/header spacing |
| `/platform` | 3338 | 3526 | +188 | Platform diagram/header bands |
| `/case-studies` | 1236 | 1239 | +3 | Near parity |
| `/case-studies/greythr` | 1163 | 1191 | +28 | CTA/footer spacing |
| `/case-studies/innovaccer` | 1026 | 1041 | +15 | CTA/footer spacing |
| `/schedule-demo` | 816 | 1024 | +208 | Form/hero vertical rhythm |

## Root causes to fix

### P0: responsive layout is disabled

`web/app/globals.css` sets `body { min-width: 1440px; }`. Shared navigation,
section padding tokens, fixed two-column headers, fixed-width copy blocks, and
desktop-only grid declarations then compound the overflow.

Fix:

1. Remove the global minimum width.
2. Add responsive spacing tokens and a real mobile nav state that preserves the
   Pencil mobile hierarchy: compact wordmark/mark, primary CTA, and a menu
   disclosure rather than clipped desktop links.
3. Make shared section headers, product mechanisms, problem/compliance rows,
   metrics, logo strips, integration tiles, case cards, footer columns, and demo
   form stack or wrap at the mobile breakpoint.
4. Keep diagrams contained at `width: 100%` with no horizontal overflow; use the
   mobile Pencil composition where the desktop diagram cannot remain legible.

### P1: visual parity is measured only by desktop diagnostics

The existing harness checks overlap and overflow inside SVGs but not:

- viewport overflow at 390px/768px;
- clipped DOM text and controls;
- route height deltas against the authoritative Pencil frame map;
- missing or off-screen brand marks at mobile widths.

Fix:

1. Extend `web/e2e/diagnose.mjs` with 390px and 768px probes.
2. Add a route-level check for elements outside the viewport and unloaded images.
3. Keep the desktop SVG checks and assert route-height deltas as review signals,
   not brittle exact-pixel gates.

### P1: desktop height inflation remains

The app's desktop diagnostic is clean but the home, product, platform, and demo
routes are taller than their corresponding Pencil frames. The likely shared
causes are duplicated section chrome around diagrams and fixed-width bands that
do not collapse to the canvas composition. The home delta is materially larger
than the other routes and should be fixed first.

Fix:

1. Audit each section's outer padding against the frame map.
2. Crop diagram viewBoxes to the diagram content when a DOM
   `SectionHeaderSplit` already owns the heading band.
3. Remove wrapper padding added on top of a canvas-height section.
4. Preserve content and CTA wording; change only layout, wrapping, and spacing.

### P1: logo treatment needs one source of truth

The shared StackGen logo SVG exists and customer wordmarks are intentionally
text-based on the dark ground, but the mobile app currently has no layout state
that keeps the mark/wordmark visible. The implementation should not reintroduce
dark third-party SVGs that the canvas intentionally replaced with text.

Fix:

1. Keep the existing official StackGen path data.
2. Use a compact mark or compact wordmark in the mobile nav, with an accessible
   label.
3. Keep the eight customer wordmarks as text and make them a responsive grid.
4. Verify all visible brand marks against the Pencil frames at both widths.

## Planned file ownership

- `web/app/globals.css`: responsive tokens, minimum-width removal, shared
  viewport safeguards.
- `web/components/primitives/Nav.tsx`: responsive navigation state.
- `web/components/primitives/SectionHeaderSplit.tsx`,
  `web/components/primitives/Footer.tsx`: shared responsive structure.
- `web/components/sections/home/Logos.tsx`,
  `web/components/sections/home/Integrations.tsx`: responsive brand/tool grids.
- `web/components/sections/home/Problem.tsx`,
  `web/components/sections/home/Compliance.tsx`,
  `web/components/sections/home/AdfLoop.tsx`,
  `web/components/sections/home/AgenticOs.tsx`,
  `web/components/sections/home/OperationalContextGraphSection.tsx`: mobile
  composition and diagram containment.
- `web/components/sections/product/ProductHero.tsx`,
  `web/components/sections/product/ProductMetrics.tsx`,
  `web/components/sections/product/ProductMechanism.tsx`,
  `web/components/sections/product/EarlyAccessStrip.tsx`: product route wrapping.
- `web/components/sections/platform/*`,
  `web/components/sections/case/*`, `web/components/sections/demo/*`: shared
  route wrapping and mobile spacing.
- `web/e2e/diagnose.mjs`: responsive parity probes.
- Focused tests for the new nav state and responsive content invariants.

## Verification plan

1. Run focused component tests and the full Vitest suite.
2. Run typecheck and production build.
3. Run `diagnose.mjs` at desktop and responsive widths; target zero viewport
   overflow, zero broken images, zero SVG text overlap, and zero SVG overflow.
4. Capture desktop and mobile screenshots for all ten mapped routes.
5. Run the Impeccable detector once over changed UI targets and apply one bounded
   visual correction pass.
