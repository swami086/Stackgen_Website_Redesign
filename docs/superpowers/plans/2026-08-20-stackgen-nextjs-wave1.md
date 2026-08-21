# StackGen Next.js Prototype — Wave 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
>
> **This plan is built for parallel dispatch (up to 8 concurrent subagents).** Read §A "Parallel Execution Protocol" before dispatching anything. `subagent-driven-development` normally forbids parallel implementers because they conflict; this plan overrides that by assigning every task **exclusive file ownership**. The override is only safe if the ownership table is obeyed literally.

**Goal:** A desktop-only, pixel-parity Next.js prototype of the StackGen redesign, served from a Docker container on `localhost:3000`, with diagrams built as live SVG so Wave 2 motion needs no refactor.

**Architecture:** Next.js 16 App Router, server components by default. Canvas geometry is extracted programmatically from `Stack_Linear.pen` into JSON, then transcribed into SVG diagram components carrying `data-part` motion hooks. Copy lives in typed content modules whose types enforce the governance rules in `PRODUCT.md`. Tailwind v4 `@theme` mirrors the canvas's 22 design variables exactly.

**Tech Stack:** Next.js 16.3 · React 19.2 · TypeScript strict · Tailwind CSS v4 · Motion (motion.dev, installed unused) · Vitest + Testing Library · Playwright (verification wave only) · pnpm · Docker multi-stage on `node:24-alpine`

**Spec:** `docs/superpowers/specs/2026-08-20-stackgen-nextjs-app-design.md`

---

## Global Constraints

Every task's requirements implicitly include this section. Values are copied verbatim from the spec.

1. **Source-of-truth precedence:** `PRODUCT.md` > `Stack_Linear.pen` > `docs/superpowers/specs/2026-08-19-site-ia-page-briefs.md`. If canvas copy contradicts `PRODUCT.md`, `PRODUCT.md` wins and the deviation is logged. Never rewrite canvas copy for any other reason.
2. **Naming table is binding, verbatim:** `Autonomous DevOps Factory (ADF)`, `Aiden for Infrastructure`, `Aiden for Automation`, `Aiden for Observability`, `Aiden for SRE`, `AppStacks`, `StackBuilder`, `StackGuard`, `StackAnchor`, `Tirith`, `Aiden OS`, `Operational Context Graph`. **Never** write `Olly`, `Aiden for InfraOps`, or `Aiden for DevOps`.
3. **Banned copy patterns:** em dashes, `single pane of glass`, `Git / estate` phrasing, any claim that StackGen replaces a named competitor.
4. **Schedule demo is the only primary CTA** on every page.
5. **Every metric cites a mechanism.** Every quote is either published (with a source URL) or visibly marked `PLACEHOLDER`.
6. **Contrast rule (binding):** `--color-accent` `#9437FF` measures 4.03:1 on `#08090A` and fails AA for body text. Use it only for fills, rules, borders, and display type at 24px+ (or 19px+ bold). Any accent-coloured text below that threshold uses `--color-accent-text` `#C9A2FF` (9.6:1). This is the one pre-approved deviation from pixel-parity.
7. **Pixel-parity at 1440px** is the fidelity contract. Desktop-only. No responsive breakpoints below 1440px in Wave 1.
8. **Diagram rules:** one `<svg>` per diagram with `viewBox` matching the canvas frame; geometry read from extracted JSON, never estimated; every animatable part carries `data-part` (and `data-index` when repeated); text is real SVG `<text>`, never paths; meaningful diagrams get `role="img"` + `<title>` + `<desc>` + `aria-labelledby`; decorative parts get `aria-hidden="true"`.
9. **Motion is Wave 2.** Wave 1 ships `Reveal` and `MotionProvider` as inert pass-throughs. No animation is implemented. Only `transform`, `opacity`, `filter`, `clip-path` may ever be animated; no animation may shift layout.
10. **Server components by default.** `'use client'` only where interaction genuinely requires it (Nav, Schedule Demo form).
11. **Never edit a file you do not own** per the §A ownership table. Never run `git clean -fdx`. Never modify `Stack_Linear.pen` — all Pencil MCP calls in this plan are read-only (`Get`, `Print`, `Export`, `TakeScreenshot`).
12. **Accepted, documented deviation:** WCAG 2.2 SC 1.4.10 Reflow will not pass, because the build is desktop-only. Do not attempt to fix it; do not claim full AA conformance.

---

## A. Parallel Execution Protocol

### A.1 Wave structure

Tasks run in **waves**. Every task in a wave may be dispatched in the same message (concurrent). A wave gate must close before the next wave opens.

| Wave | Tasks | Concurrency | Gate to close the wave |
|---|---|---|---|
| **0** | T1 | 1 (serial) | `docker compose --profile prod up` serves a tokenised page at `localhost:3000`; `pnpm typecheck` and `pnpm test` pass |
| **1** | T2, T3, T4 | 3 | All three reviewed clean; `pnpm typecheck` passes with all three merged |
| **2** | T5 | 1 (serial) | Every route renders a stub page; `pnpm build` passes |
| **3** | T6–T13 | **8** | All eight reviewed clean; Home renders fully; `pnpm build` passes |
| **4** | T14–T21 | **8** | All eight reviewed clean; all ten routes render fully; `pnpm build` passes |
| **5** | T22, T23 | 2 (read-only) | Both reports written |
| **6** | T24, T25 | 1 (serial each) | Final confirmation pass clean |

Waves 0, 2, 5-serial exist specifically because their outputs are the shared contract the next wave's parallel agents all depend on. Do not attempt to parallelise them.

### A.2 File ownership table

**A task may create or modify only the paths it owns.** Any task needing a change outside its ownership must report it as a concern rather than making the edit.

| Task | Owns (exclusive write access) |
|---|---|
| T1 | `web/package.json`, `web/pnpm-lock.yaml`, `web/tsconfig.json`, `web/next.config.ts`, `web/vitest.config.ts`, `web/vitest.setup.ts`, `web/Dockerfile`, `web/.dockerignore`, `docker-compose.yml`, `.gitignore`, `web/app/globals.css`, `web/app/layout.tsx`, `web/app/page.tsx` (stub only), `web/lib/types.ts`, `web/lib/nav.ts`, `web/components/motion/**`, `web/public/logos/**` |
| T2 | `web/components/primitives/**` |
| T3 | `web/content/**` |
| T4 | `web/scripts/extract-geometry.mjs`, `design-reference/**` |
| T5 | `web/app/**/page.tsx`, `web/app/**/layout.tsx`, `web/components/sections/**/*.tsx` (stubs only), `web/components/diagrams/**/*.tsx` (stubs only), `web/components/ComingSoon.tsx` |
| T6 | `web/components/sections/home/Hero.tsx`, `web/components/sections/home/FinalCta.tsx` (+ their tests) |
| T7 | `web/components/sections/home/Mechanism.tsx`, `web/components/ChangeSurface.tsx` (+ tests) |
| T8 | `web/components/sections/home/Logos.tsx`, `web/components/sections/home/Integrations.tsx` (+ tests) |
| T9 | `web/components/sections/home/InTheirWords.tsx`, `web/components/sections/home/Compliance.tsx` (+ tests) |
| T10 | `web/components/diagrams/ProblemDiagram.tsx`, `web/components/sections/home/Problem.tsx` (+ tests) |
| T11 | `web/components/diagrams/FactoryProcessDiagram.tsx`, `web/components/sections/home/FactoryProcess.tsx` (+ tests) |
| T12 | `web/components/diagrams/AdfLoopDiagram.tsx`, `web/components/sections/home/AdfLoop.tsx` (+ tests) |
| T13 | `web/components/diagrams/AgenticOsDiagram.tsx`, `web/components/diagrams/OperationalContextGraph.tsx`, `web/components/sections/home/AgenticOs.tsx`, `web/components/sections/home/OperationalContextGraphSection.tsx` (+ tests) |
| T14 | `web/components/sections/product/**` (+ tests) |
| T15 | `web/components/diagrams/product/InfrastructureMechanism.tsx` (+ test) |
| T16 | `web/components/diagrams/product/AutomationMechanism.tsx` (+ test) |
| T17 | `web/components/diagrams/product/ObservabilityMechanism.tsx` (+ test) |
| T18 | `web/components/diagrams/product/SreMechanism.tsx` (+ test) |
| T19 | `web/components/sections/platform/**`, `web/components/diagrams/TwoPlanesDiagram.tsx`, `web/components/diagrams/AidenOsLinksDiagram.tsx` (+ tests) |
| T20 | `web/components/sections/case/**` (+ tests) |
| T21 | `web/components/sections/demo/**` (+ tests) |
| T22 | `.superpowers/sdd/wave1-parity-report.md`, `web/e2e/parity.spec.ts`, `web/playwright.config.ts` |
| T23 | `.superpowers/sdd/wave1-a11y-report.md`, `web/e2e/a11y.spec.ts` |
| T24 | Any file named in T22/T23 reports (single batched fix; runs alone) |
| T25 | `web/README.md`, `.superpowers/sdd/wave1-deviations.md` |

### A.3 Dispatch rules

- **Model slugs:** the Task tool accepts only `inherit` or `composer-2.5-fast`. Use `composer-2.5-fast` for transcription-shaped tasks (marked ⚡ below) and `inherit` for judgment-shaped tasks (marked 🧠). Always specify one explicitly.
- **Branch:** all work happens on branch `wave1-nextjs`. Create it in T1. Every task commits to it.
- **Commits:** each task commits its own files only, prefixed `T<N>:`. Parallel agents committing disjoint files to the same branch will not conflict; agents must `git add` explicit paths, never `git add -A`.
- **Brief handoff:** run `scripts/task-brief` from the `subagent-driven-development` skill directory to extract each task to its own file rather than pasting task text into dispatch prompts.
- **Shared-procedure tasks:** T10–T13 live under one combined heading ("Tasks 10–13: Home diagrams"), as do T15–T18. Their per-task values are in a table; the procedure is written once below it. When extracting briefs for these, extract the **whole combined section** and tell the subagent which row of the table is theirs. A brief containing only the table row is unusable — the agent will have the node ID but not the procedure.
- **Report files:** each task writes its full report to `.superpowers/sdd/wave1-task-<N>-report.md` and returns only status, commits, a one-line test summary, and concerns.
- **Ledger:** append `Task N: complete (commits <base7>..<head7>, review clean)` to `.superpowers/sdd/progress.md` as each review closes. After any compaction, trust the ledger and `git log`, not recollection.
- **Review:** every task gets a task review (spec compliance + code quality) before its wave gate closes. A wave gate does not close on unreviewed work.

### A.4 Reading the canvas

Tasks that read `Stack_Linear.pen` use the Pencil MCP server `project-0-Stackgen_Website_Redesign-pencil-docker`. **Read-only calls only.** Before any other Pencil call, a subagent must run:

```
get_app_state({ include_schema: true, include_canvas_design: true, include_scripts_and_shaders: false })
```

Canvas is multiplayer and may have changed since 2026-08-20; re-read node IDs rather than trusting this plan's transcription if a node is missing.

---

## B. Skill References

Every task lists the skill files its subagent must read first. All paths verified present on 2026-08-20.

**Universal — every implementer reads these two:**
- `/Users/swami/.cursor/plugins/cache/cursor-public/superpowers/d884ae04edebef577e82ff7c4e143debd0bbec99/skills/test-driven-development/SKILL.md`
- `/Users/swami/.cursor/plugins/cache/cursor-public/superpowers/d884ae04edebef577e82ff7c4e143debd0bbec99/skills/verification-before-completion/SKILL.md`

**Every task that writes UI also reads:**
- `/Users/swami/.cursor/skills/impeccable/reference/craft-floor.md` — the quality floor and absolute bans

**Catalogue used by this plan:**

| Skill | Path |
|---|---|
| nextjs-developer | `/Users/swami/.cursor/skills/nextjs-developer/SKILL.md` |
| react-specialist | `/Users/swami/.cursor/skills/react-specialist/SKILL.md` |
| typescript-pro | `/Users/swami/.cursor/skills/typescript-pro/SKILL.md` |
| docker-expert | `/Users/swami/.cursor/skills/docker-expert/SKILL.md` |
| senior-frontend | `/Users/swami/.cursor/skills/senior-frontend/SKILL.md` |
| frontend-developer | `/Users/swami/.cursor/skills/frontend-developer/SKILL.md` |
| ui-design-system | `/Users/swami/.cursor/skills/ui-design-system/SKILL.md` |
| design-bridge | `/Users/swami/.cursor/skills/design-bridge/SKILL.md` |
| ui-ux-pro-max | `/Users/swami/.cursor/skills/ui-ux-pro-max/SKILL.md` |
| epic-design | `/Users/swami/.cursor/skills/epic-design/SKILL.md` |
| a11y-audit | `/Users/swami/.cursor/skills/a11y-audit/SKILL.md` |
| accessibility-tester | `/Users/swami/.cursor/skills/accessibility-tester/SKILL.md` |
| performance-engineer | `/Users/swami/.cursor/skills/performance-engineer/SKILL.md` |
| full-page-screenshot | `/Users/swami/.cursor/skills/full-page-screenshot/SKILL.md` |
| browser-automation | `/Users/swami/.cursor/skills/browser-automation/SKILL.md` |
| copy-editing | `/Users/swami/.cursor/skills/copy-editing/SKILL.md` |
| technical-writer | `/Users/swami/.cursor/skills/technical-writer/SKILL.md` |
| senior-qa | `/Users/swami/.cursor/skills/senior-qa/SKILL.md` |
| code-reviewer | `/Users/swami/.cursor/skills/code-reviewer/SKILL.md` |
| tdd-guide | `/Users/swami/.cursor/skills/tdd-guide/SKILL.md` |
| impeccable (craft floor) | `/Users/swami/.cursor/skills/impeccable/reference/craft-floor.md` |
| impeccable (audit) | `/Users/swami/.cursor/skills/impeccable/reference/audit.md` |
| impeccable (animate) | `/Users/swami/.cursor/skills/impeccable/reference/animate.md` |
| impeccable (polish) | `/Users/swami/.cursor/skills/impeccable/reference/polish.md` |

---

# WAVE 0 — Foundation (serial, 1 agent)

## Task 1: Project scaffold, tokens, Docker 🧠

**Model:** `inherit`

**Skills:**
- `/Users/swami/.cursor/skills/nextjs-developer/SKILL.md`
- `/Users/swami/.cursor/skills/docker-expert/SKILL.md`
- `/Users/swami/.cursor/skills/typescript-pro/SKILL.md`
- `/Users/swami/.cursor/skills/ui-design-system/SKILL.md`
- superpowers:test-driven-development

**Files:**
- Create: `web/package.json`, `web/tsconfig.json`, `web/next.config.ts`, `web/vitest.config.ts`, `web/vitest.setup.ts`
- Create: `web/app/globals.css`, `web/app/layout.tsx`, `web/app/page.tsx`
- Create: `web/lib/types.ts`, `web/lib/nav.ts`
- Create: `web/components/motion/MotionProvider.tsx`, `web/components/motion/Reveal.tsx`
- Create: `web/Dockerfile`, `web/.dockerignore`, `docker-compose.yml`
- Create: `web/lib/__tests__/types.test.ts`, `web/components/motion/__tests__/Reveal.test.tsx`
- Modify: `.gitignore`
- Copy: `.firecrawl/logos-quotes/assets/*` → `web/public/logos/customers/`

**Interfaces produced** (every later task depends on these exact names):

```ts
// web/lib/types.ts
export type Metric = { value: string; label: string; mechanism: string };
export type Quote =
  | { text: string; attribution: string; role: string; company: string;
      status: 'published'; sourceUrl: string }
  | { text: string; attribution: string; role: string; company: string;
      status: 'placeholder' };
export type CustomerLogo = { name: string; file: string; width: number; height: number };
export type Cta = { label: string; href: string };
export type NavItem = { label: string; href: string };
export type DiagramProps = { className?: string; titleId?: string };
export type SectionProps<T> = { content: T; className?: string };
```

One section takes an extra prop: `ProductMechanism` is `SectionProps<ProductMechanismContent> & { slug: string }`, because it dispatches to a per-product diagram. Every other section uses `SectionProps<T>` unchanged.

- [ ] **Step 1: Create the branch**

```bash
cd /Users/swami/Documents/Stackgen_Website_Redesign
git checkout -b wave1-nextjs
```

- [ ] **Step 2: Scaffold the app and install dependencies**

```bash
mkdir -p web && cd web
pnpm init
pnpm add next@16.3 react@19.2 react-dom@19.2 motion
pnpm add -D typescript @types/react @types/react-dom @types/node \
  tailwindcss @tailwindcss/postcss postcss \
  vitest @vitejs/plugin-react jsdom \
  @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

Do not pin `motion` to a guessed version; take whatever `pnpm add motion` resolves and record it in the report.

- [ ] **Step 3: Merge these fields into the generated `web/package.json`**

Step 2 already wrote `dependencies` and `devDependencies`. **Merge** the fields below into that file — do not overwrite it, or you will drop every dependency you just installed.

```json
{
  "name": "stackgen-web",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "next dev --port 3000 --hostname 0.0.0.0",
    "build": "next build",
    "start": "node server.js",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

- [ ] **Step 4: Write `web/next.config.ts`**

```ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  reactStrictMode: true,
};

export default nextConfig;
```

- [ ] **Step 5: Write `web/tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "ES2022"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules", "e2e"]
}
```

- [ ] **Step 6: Write `web/app/globals.css` with the canvas tokens**

Values copied verbatim from `Stack_Linear.pen`. Do not adjust any hex.

```css
@import "tailwindcss";

@theme {
  --color-bg-base: #08090A;
  --color-bg-raised: #0E0F11;
  --color-surface-card: #101113;
  --color-surface-sunken: #050506;
  --color-border-hairline: #1F2023;
  --color-border-card: #26272B;
  --color-text-primary: #F7F8F8;
  --color-text-secondary: #8A8F98;
  --color-text-tertiary: #7E838C;
  --color-accent: #9437FF;
  --color-accent-text: #C9A2FF;
  --color-accent-dim: #2A1447;
  --color-accent-glow: #9437FF40;
  --color-accent-subtle: #9437FF1A;
  --color-glass-bg: #08090ACC;
  --color-glass-border: #FFFFFF14;
  --color-pass: #4ADE80;
  --color-halt: #F0883E;

  --font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
  --font-mono: var(--font-jetbrains-mono), ui-monospace, monospace;

  --spacing-pad-x: 100px;
  --spacing-pad-y: 120px;
}

@layer base {
  html {
    background-color: var(--color-bg-base);
    color: var(--color-text-primary);
    -webkit-font-smoothing: antialiased;
  }

  body {
    font-family: var(--font-sans);
    min-width: 1440px;
  }

  :focus-visible {
    outline: 2px solid var(--color-accent-text);
    outline-offset: 2px;
  }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

`min-width: 1440px` on body is the deliberate desktop-only contract from spec §1; it makes the fixed composition scroll horizontally rather than collapse on narrower windows.

- [ ] **Step 7: Write `web/lib/types.ts`**

Use the exact block from **Interfaces produced** above, verbatim.

- [ ] **Step 8: Write `web/lib/nav.ts`**

```ts
import type { NavItem, Cta } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Product', href: '/product/aiden-for-infrastructure' },
  { label: 'Platform', href: '/platform' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Company', href: '/about' },
];

export const PRIMARY_CTA: Cta = { label: 'Schedule demo', href: '/schedule-demo' };
```

- [ ] **Step 9: Write the inert motion scaffolding**

`web/components/motion/MotionProvider.tsx`:

```tsx
'use client';

import type { ReactNode } from 'react';

// Wave 1: inert pass-through. Wave 2 hosts motion config and reduced-motion context here.
export function MotionProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
```

`web/components/motion/Reveal.tsx`:

```tsx
import type { ReactNode } from 'react';

// Wave 1: renders children with no wrapper element and no animation.
// Wave 2 replaces the body; the call sites do not change.
export function Reveal({ children }: { children: ReactNode; delay?: number }) {
  return <>{children}</>;
}
```

- [ ] **Step 10: Write the failing test for Reveal**

`web/components/motion/__tests__/Reveal.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Reveal } from '../Reveal';

describe('Reveal', () => {
  it('renders children without adding a wrapper element', () => {
    const { container } = render(
      <Reveal>
        <p>visible content</p>
      </Reveal>,
    );
    expect(screen.getByText('visible content')).toBeInTheDocument();
    expect(container.firstElementChild?.tagName).toBe('P');
  });
});
```

- [ ] **Step 11: Run the test to verify it fails**

Run: `cd web && pnpm test`
Expected: FAIL — vitest config does not exist yet.

- [ ] **Step 12: Write `web/vitest.config.ts` and `web/vitest.setup.ts`**

`package.json` sets `"type": "module"`, so `__dirname` does not exist here. Use `import.meta.dirname`, available in Node 24.

```ts
// web/vitest.config.ts
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    globals: true,
    exclude: ['node_modules', 'e2e'],
  },
  resolve: { alias: { '@': path.resolve(import.meta.dirname, '.') } },
});
```

```ts
// web/vitest.setup.ts
import '@testing-library/jest-dom/vitest';
```

- [ ] **Step 13: Run the test to verify it passes**

Run: `cd web && pnpm test`
Expected: PASS, 1 test.

- [ ] **Step 14: Write `web/app/layout.tsx`**

```tsx
import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { MotionProvider } from '@/components/motion/MotionProvider';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'StackGen',
  description: 'Infrastructure change, safe at machine speed.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 15: Write a placeholder `web/app/page.tsx`**

T5 replaces this. It exists now only so the container has something to serve.

```tsx
export default function HomePage() {
  return (
    <main className="px-(--spacing-pad-x) py-(--spacing-pad-y)">
      <h1 className="text-5xl font-medium text-(--color-text-primary)">StackGen</h1>
      <p className="mt-4 text-(--color-text-secondary)">Wave 1 scaffold.</p>
    </main>
  );
}
```

- [ ] **Step 16: Copy the customer logo assets**

`.firecrawl/` is gitignored, so these must be copied, not referenced.

```bash
cd /Users/swami/Documents/Stackgen_Website_Redesign
mkdir -p web/public/logos/customers web/public/logos/tools
cp .firecrawl/logos-quotes/assets/* web/public/logos/customers/
ls web/public/logos/customers/
```

Expected: 12 files — `Autodesk.svg`, `Chamberlain.svg`, `Corcentric.svg`, `GreytHR.svg`, `InMobi.svg`, `Innovaccer.svg`, `Lowes.svg`, `NIQ.svg`, `Nielsen.svg`, `Piramal.svg`, `Rocktop.png`, `SAP-NS2.webp`.

- [ ] **Step 17: Write `web/Dockerfile`**

```dockerfile
# syntax=docker/dockerfile:1.7
FROM node:24-alpine AS base
RUN corepack enable
WORKDIR /app

FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm build

FROM base AS runner
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
ENV PORT=3000 HOSTNAME=0.0.0.0
HEALTHCHECK --interval=30s --timeout=3s --start-period=15s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["node", "server.js"]
```

- [ ] **Step 18: Write `web/.dockerignore`**

```
node_modules
.next
.git
e2e
**/__tests__
*.test.ts
*.test.tsx
```

- [ ] **Step 19: Write `docker-compose.yml` at the repo root**

```yaml
services:
  web-dev:
    profiles: ["dev"]
    build:
      context: ./web
      target: builder
    command: pnpm dev
    ports:
      - "3000:3000"
    environment:
      - NEXT_TELEMETRY_DISABLED=1
    develop:
      watch:
        - action: sync
          path: ./web
          target: /app
          ignore:
            - node_modules/
        - action: rebuild
          path: ./web/package.json

  web-prod:
    profiles: ["prod"]
    build:
      context: ./web
      target: runner
    ports:
      - "3000:3000"
    restart: unless-stopped
```

- [ ] **Step 20: Append to the root `.gitignore`**

```
# Next.js app
web/node_modules/
web/.next/
web/next-env.d.ts
web/test-results/
web/playwright-report/

# Canvas parity exports (regenerable)
design-reference/
```

- [ ] **Step 21: Verify typecheck, tests, and the production container**

```bash
cd web && pnpm typecheck && pnpm test && cd ..
docker compose --profile prod up --build -d
sleep 20
curl -sf -o /dev/null -w '%{http_code}\n' http://localhost:3000/
docker compose --profile prod down
```

Expected: typecheck clean, 1 test passing, `200` from curl.

- [ ] **Step 22: Commit**

```bash
git add web/ docker-compose.yml .gitignore
git commit -m "T1: scaffold Next.js app, canvas tokens, Docker, motion scaffolding"
```

---

# WAVE 1 — Independent foundations (parallel, 3 agents)

Dispatch T2, T3, T4 in a single message. They share no files.

## Task 2: Primitive components ⚡

**Model:** `composer-2.5-fast`

**Skills:**
- `/Users/swami/.cursor/skills/react-specialist/SKILL.md`
- `/Users/swami/.cursor/skills/senior-frontend/SKILL.md`
- `/Users/swami/.cursor/skills/ui-design-system/SKILL.md`
- `/Users/swami/.cursor/skills/a11y-audit/SKILL.md`
- `/Users/swami/.cursor/skills/impeccable/reference/craft-floor.md`
- superpowers:test-driven-development

**Files:**
- Create: `web/components/primitives/Logo.tsx`, `ButtonPrimary.tsx`, `ButtonGhost.tsx`, `MonoLabel.tsx`, `MetricCell.tsx`, `SectionHeaderSplit.tsx`, `Nav.tsx`, `Footer.tsx`
- Create: `web/components/primitives/__tests__/` — one test file per component

**Interfaces:**
- Consumes: `web/lib/types.ts` (`Metric`, `Cta`, `NavItem`), `web/lib/nav.ts` (`NAV_ITEMS`, `PRIMARY_CTA`) from T1.
- Produces, exactly:

```ts
export function Logo(props: { className?: string; variant?: 'wordmark' | 'mark' }): JSX.Element
export function ButtonPrimary(props: { href: string; children: ReactNode; className?: string }): JSX.Element
export function ButtonGhost(props: { href: string; children: ReactNode; className?: string }): JSX.Element
export function MonoLabel(props: { children: ReactNode; className?: string }): JSX.Element
export function MetricCell(props: { metric: Metric; className?: string }): JSX.Element
export function SectionHeaderSplit(props: { label: string; heading: string; body?: string; className?: string }): JSX.Element
export function Nav(props: { className?: string }): JSX.Element          // 'use client'
export function Footer(props: { className?: string }): JSX.Element
```

**Canvas source nodes** — read each with the Pencil MCP before writing the component:

| Component | Node ID |
|---|---|
| Nav Desktop | `N6udS` |
| StackGen Logo | `JJx7F` (wordmark paths `Lo7zS`, `QkNeY`, `PS2Js`, `ErlmF`, `TwHBj`, `LIWyU`, `Roqj5`, `EHoJH`; icon mark `T8fHcl`) |
| Btn Primary | `xcXXD` |
| Btn Ghost | `NCL0m` |
| Mono Label | `e9nTl` |
| Metric Cell | `m2UJ8` |
| Section Header Split | `GZSQR` |
| Footer Simple | `igbym` (children `Zhe4w` Footer Top, `S3kaY` Footer Bottom) |

- [ ] **Step 1: Read the canvas geometry for all eight components**

Call the Pencil MCP `execute` tool with `filePath: "/Users/swami/Documents/Stackgen_Website_Redesign/Stack_Linear.pen"` and:

```js
for (const id of ["N6udS","JJx7F","xcXXD","NCL0m","e9nTl","m2UJ8","GZSQR","igbym"]) {
  Print("=== " + id);
  Get(id, (n, c) => Print(n.id, n.name, n.type, JSON.stringify({
    w: Math.round(c.bounds.width), h: Math.round(c.bounds.height),
    fill: n.fill, stroke: n.stroke, radius: n.cornerRadius,
    pad: n.padding, gap: n.gap, layout: n.layout,
    text: n.content, size: n.fontSize, weight: n.fontWeight,
    ls: n.letterSpacing, lh: n.lineHeight, font: n.fontFamily
  })), { resolveVariables: false });
}
```

Record the output in your report file. Use `$variable` names where the canvas uses them — map `$accent` → `text-(--color-accent)` and so on, never a raw hex in a component.

- [ ] **Step 2: Write the failing test for ButtonPrimary**

`web/components/primitives/__tests__/ButtonPrimary.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ButtonPrimary } from '../ButtonPrimary';

describe('ButtonPrimary', () => {
  it('renders as a link with an accessible name', () => {
    render(<ButtonPrimary href="/schedule-demo">Schedule demo</ButtonPrimary>);
    const link = screen.getByRole('link', { name: 'Schedule demo' });
    expect(link).toHaveAttribute('href', '/schedule-demo');
  });
});
```

- [ ] **Step 3: Run it and confirm it fails**

Run: `cd web && pnpm test ButtonPrimary`
Expected: FAIL — `Cannot find module '../ButtonPrimary'`.

- [ ] **Step 4: Implement ButtonPrimary from the canvas geometry**

Use a real `<a>` from `next/link`, never a `<div>` with an onClick. Apply the padding, radius, fill, and type scale you read in Step 1. Accent fill is permitted here because it is a surface, not text.

- [ ] **Step 5: Run it and confirm it passes**

Run: `cd web && pnpm test ButtonPrimary`
Expected: PASS.

- [ ] **Step 6: Repeat steps 2-5 for the remaining seven components**

Each gets its own test asserting the behaviour that matters for that component:

- `Logo` — renders an SVG with `role="img"` and an accessible name `StackGen`.
- `ButtonGhost` — renders a link with an accessible name and no accent fill.
- `MonoLabel` — renders its children inside an element using the mono font variable.
- `MetricCell` — renders `metric.value`, `metric.label`, **and** `metric.mechanism`. The mechanism must be in the DOM; Global Constraint 5 requires every metric to cite one.
- `SectionHeaderSplit` — renders the heading as a heading element and the label as text.
- `Nav` — `'use client'`; renders one link per `NAV_ITEMS` entry plus a `Schedule demo` link pointing at `/schedule-demo`; the whole thing sits inside a `<nav>` landmark.
- `Footer` — renders inside a `<footer>` landmark and contains a `Schedule demo` link.

- [ ] **Step 7: Verify the whole suite and types**

```bash
cd web && pnpm typecheck && pnpm test
```

Expected: clean typecheck, all primitive tests passing.

- [ ] **Step 8: Commit**

```bash
git add web/components/primitives
git commit -m "T2: primitive components ported from canvas"
```

---

## Task 3: Content type system and content modules 🧠

**Model:** `inherit`

**Skills:**
- `/Users/swami/.cursor/skills/typescript-pro/SKILL.md`
- `/Users/swami/.cursor/skills/copy-editing/SKILL.md`
- superpowers:test-driven-development

**Files:**
- Create: `web/content/home.ts`, `product-infrastructure.ts`, `product-automation.ts`, `product-observability.ts`, `product-sre.ts`, `platform.ts`, `case-index.ts`, `case-greythr.ts`, `case-innovaccer.ts`, `schedule-demo.ts`, `shared.ts`
- Create: `web/content/__tests__/governance.test.ts`

**Interfaces:**
- Consumes: `web/lib/types.ts` (`Metric`, `Quote`, `CustomerLogo`, `Cta`) from T1.
- Produces: one default-exported typed object per page. Section components in Waves 3 and 4 receive slices of these as props. Exact shape per page is defined in Step 3.

- [ ] **Step 1: Extract every text string from the Wave 1 screens**

Pencil MCP, read-only:

```js
const screens = {
  JLg8h: "home", T4FJtW: "product-infrastructure", zTOam: "product-automation",
  OAfMk: "product-observability", bEaQH: "product-sre", HL34b: "platform",
  k1XEU: "case-index", gYoDZ: "case-greythr", YEXx8: "case-innovaccer",
  K6I26T: "schedule-demo"
};
for (const [id, name] of Object.entries(screens)) {
  Print("=== " + name);
  Get(id, n => n.type === "text" && n.content
    ? Print(n.id, "|", String(n.fontSize), "|", n.content) : undefined,
    { resolveVariables: true, resolveInstances: true });
}
```

Save the raw output to your report file before transcribing.

- [ ] **Step 2: Run the copy through the governance checklist**

For every extracted string, check Global Constraints 2 and 3. Record in your report:
- any occurrence of `Olly`, `Aiden for InfraOps`, `Aiden for DevOps` → **correct it** to the binding name and log the correction.
- any em dash → replace with a comma, colon, or full stop, whichever preserves the sentence.
- any `single pane of glass` or `Git / estate` phrasing → log it as a **concern** and leave it; rewording marketing claims is the user's call, not yours.

- [ ] **Step 3: Write `web/content/shared.ts`**

```ts
import type { CustomerLogo } from '@/lib/types';

export const CUSTOMER_LOGOS: CustomerLogo[] = [
  { name: 'Nielsen',     file: '/logos/customers/Nielsen.svg',     width: 120, height: 32 },
  { name: 'greytHR',     file: '/logos/customers/GreytHR.svg',     width: 120, height: 32 },
  { name: 'Corcentric',  file: '/logos/customers/Corcentric.svg',  width: 120, height: 32 },
  { name: 'Piramal',     file: '/logos/customers/Piramal.svg',     width: 120, height: 32 },
  { name: 'NIQ',         file: '/logos/customers/NIQ.svg',         width: 120, height: 32 },
  { name: 'SAP NS2',     file: '/logos/customers/SAP-NS2.webp',    width: 120, height: 32 },
  { name: "Lowe's",      file: '/logos/customers/Lowes.svg',       width: 120, height: 32 },
  { name: 'RocTop',      file: '/logos/customers/Rocktop.png',     width: 120, height: 32 },
  { name: 'Chamberlain', file: '/logos/customers/Chamberlain.svg', width: 120, height: 32 },
  { name: 'Autodesk',    file: '/logos/customers/Autodesk.svg',    width: 120, height: 32 },
  { name: 'InMobi',      file: '/logos/customers/InMobi.svg',      width: 120, height: 32 },
  { name: 'Innovaccer',  file: '/logos/customers/Innovaccer.svg',  width: 120, height: 32 },
];
```

Replace each `width`/`height` with the real intrinsic dimensions read from the SVG files in `web/public/logos/customers/`. Do not leave the 120×32 placeholder values.

- [ ] **Step 4: Write the failing governance test**

`web/content/__tests__/governance.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import home from '../home';
import platform from '../platform';
import caseGreythr from '../case-greythr';
import type { Quote, Metric } from '@/lib/types';

const BANNED = [/\bOlly\b/i, /Aiden for InfraOps/i, /Aiden for DevOps/i,
                /single pane of glass/i, /\u2014/];

function allStrings(value: unknown): string[] {
  if (typeof value === 'string') return [value];
  if (Array.isArray(value)) return value.flatMap(allStrings);
  if (value && typeof value === 'object') return Object.values(value).flatMap(allStrings);
  return [];
}

describe('content governance', () => {
  const modules = { home, platform, caseGreythr };

  for (const [name, mod] of Object.entries(modules)) {
    it(`${name} contains no banned terms`, () => {
      for (const text of allStrings(mod)) {
        for (const pattern of BANNED) {
          expect(text, `"${text}" matched ${pattern}`).not.toMatch(pattern);
        }
      }
    });
  }

  it('every quote declares its status', () => {
    const quotes = allQuotes(home);
    expect(quotes.length).toBeGreaterThan(0);
    for (const q of quotes) {
      expect(['published', 'placeholder']).toContain(q.status);
      if (q.status === 'published') expect(q.sourceUrl).toMatch(/^https:\/\//);
    }
  });

  it('every metric cites a mechanism', () => {
    for (const m of allMetrics(home)) {
      expect(m.mechanism.trim().length).toBeGreaterThan(0);
    }
  });
});

function allQuotes(value: unknown): Quote[] {
  if (Array.isArray(value)) return value.flatMap(allQuotes);
  if (value && typeof value === 'object') {
    const v = value as Record<string, unknown>;
    if (typeof v.text === 'string' && typeof v.status === 'string') return [v as unknown as Quote];
    return Object.values(v).flatMap(allQuotes);
  }
  return [];
}

function allMetrics(value: unknown): Metric[] {
  if (Array.isArray(value)) return value.flatMap(allMetrics);
  if (value && typeof value === 'object') {
    const v = value as Record<string, unknown>;
    if (typeof v.value === 'string' && typeof v.mechanism === 'string') return [v as unknown as Metric];
    return Object.values(v).flatMap(allMetrics);
  }
  return [];
}
```

- [ ] **Step 5: Run it and confirm it fails**

Run: `cd web && pnpm test governance`
Expected: FAIL — content modules do not exist.

- [ ] **Step 6: Write `web/content/home.ts`**

Shape, filled with the copy extracted in Step 1:

```ts
import type { Metric, Quote, Cta } from '@/lib/types';

const home = {
  hero: {
    h1: '',            // from node XPc1X
    sub: '',
    support: '',
    cta: { label: 'Schedule demo', href: '/schedule-demo' } satisfies Cta,
  },
  mechanism: { label: '', heading: '', body: '', intent: '', diff: '', verdict: '', mergeTarget: '' },
  logos:      { heading: '' },
  problem:    { label: '', heading: '', body: '', citations: [] as { claim: string; source: string }[] },
  factoryProcess: { label: '', heading: '', steps: [] as { title: string; body: string }[] },
  adfLoop:    { label: '', heading: '', stages: [] as { index: string; title: string; product: string; body: string }[] },
  agenticOs:  { label: '', heading: '', body: '' },
  contextGraph: { label: '', heading: '', body: '' },
  integrations: { label: '', heading: '' },
  inTheirWords: { label: '', heading: '', quotes: [] as Quote[] },
  compliance: { label: '', heading: '', badges: [] as string[] },
  finalCta:   { heading: '', body: '', cta: { label: 'Schedule demo', href: '/schedule-demo' } satisfies Cta },
  metrics:    [] as Metric[],
};

export default home;
```

Every empty string and empty array must be filled from the canvas. An empty string surviving into the commit is a task failure.

- [ ] **Step 7: Write the remaining nine content modules**

Same discipline. The four product modules share this shape:

```ts
const product = {
  slug: '',                    // e.g. 'aiden-for-infrastructure'
  hero: { h1: '', sub: '', support: '', cta: { label: 'Schedule demo', href: '/schedule-demo' } },
  metrics: [] as Metric[],
  mechanism: { label: '', heading: '', body: '' },
  earlyAccess: null as null | { label: string; heading: string; body: string },
  finalCta: { heading: '', body: '', cta: { label: 'Schedule demo', href: '/schedule-demo' } },
};
```

`earlyAccess` is non-null only for `product-infrastructure` (canvas node `lUtF2`); the other three set it to `null`.

For `case-greythr`, the Abhishek Gaurav quote is the one published quote in the project — status `'published'`, `sourceUrl: 'https://stackgen.com/case-studies/greythr'`. Every other quote across all modules is `status: 'placeholder'`.

- [ ] **Step 8: Run the governance test and confirm it passes**

Run: `cd web && pnpm test governance && pnpm typecheck`
Expected: all governance assertions pass, typecheck clean.

- [ ] **Step 9: Commit**

```bash
git add web/content
git commit -m "T3: typed content modules with governance tests"
```

---

## Task 4: Canvas geometry extraction and parity references ⚡

**Model:** `composer-2.5-fast`

**Skills:**
- `/Users/swami/.cursor/skills/design-bridge/SKILL.md`
- `/Users/swami/.cursor/skills/technical-writer/SKILL.md`

**Files:**
- Create: `web/scripts/extract-geometry.mjs`
- Create: `design-reference/geometry/*.json` (one per diagram)
- Create: `design-reference/png/*.png` (one per Wave 1 screen)
- Create: `design-reference/README.md`

**Interfaces produced:** a JSON file per diagram with this exact shape, consumed by every diagram task in Waves 3 and 4:

```json
{
  "nodeId": "vU48B",
  "name": "Problem",
  "viewBox": [0, 0, 1440, 1481],
  "nodes": [
    {
      "id": "abc12",
      "name": "Stage Card",
      "type": "frame",
      "x": 100, "y": 240, "width": 380, "height": 160,
      "fill": "$surface-card",
      "stroke": "$border-card",
      "strokeWidth": 1,
      "cornerRadius": 8,
      "text": null,
      "fontSize": null,
      "fontWeight": null,
      "fontFamily": null,
      "depth": 2
    }
  ]
}
```

Coordinates are **absolute within the diagram frame** (subtract the frame's own origin), so they drop straight into an SVG whose `viewBox` starts at 0,0.

- [ ] **Step 1: Write `web/scripts/extract-geometry.mjs`**

The script prints a Pencil `execute` snippet for a given node ID; it does not call the MCP itself (the MCP is only reachable from an agent session). Usage: `node scripts/extract-geometry.mjs vU48B Problem`.

```js
const [, , nodeId, name] = process.argv;
if (!nodeId || !name) {
  console.error('usage: node extract-geometry.mjs <nodeId> <name>');
  process.exit(1);
}
console.log(`
const root = Get(${JSON.stringify(nodeId)}, { depth: 0 });
const out = { nodeId: ${JSON.stringify(nodeId)}, name: ${JSON.stringify(name)},
  viewBox: [0, 0, Math.round(root.width || 0), Math.round(root.height || 0)], nodes: [] };
let ox = null, oy = null;
Get(${JSON.stringify(nodeId)}, (n, c) => {
  if (ox === null) { ox = c.bounds.x; oy = c.bounds.y; }
  out.nodes.push({
    id: n.id, name: n.name || null, type: n.type,
    x: Math.round(c.bounds.x - ox), y: Math.round(c.bounds.y - oy),
    width: Math.round(c.bounds.width), height: Math.round(c.bounds.height),
    fill: n.fill ?? null, stroke: n.stroke ?? null,
    strokeWidth: n.strokeWidth ?? null, cornerRadius: n.cornerRadius ?? null,
    text: n.content ?? null, fontSize: n.fontSize ?? null,
    fontWeight: n.fontWeight ?? null, fontFamily: n.fontFamily ?? null,
    depth: c.depth
  });
  if (c.problems) Print("PROBLEM", n.id, n.name, c.problems);
}, { resolveVariables: false, resolveInstances: true });
Print(JSON.stringify(out));
`);
```

- [ ] **Step 2: Extract geometry for all twelve diagram frames**

Run the script for each pair below, execute the printed snippet via the Pencil MCP, and write the printed JSON to `design-reference/geometry/<name>.json`.

| Name | Node | Page |
|---|---|---|
| `problem` | `vU48B` | Home |
| `factory-process` | `pnlIy` | Home |
| `adf-loop` | `t5DPzG` | Home |
| `agentic-os` | `YQTAQ` | Home |
| `context-graph-home` | `RBIMd` | Home |
| `context-graph-platform` | `O4fic7` | Platform |
| `two-planes` | `KGZ7Q` | Platform |
| `aiden-os-links` | `gWRK3` | Platform |
| `mechanism-infrastructure` | `w8Wb0v` | Product |
| `mechanism-automation` | `u2Jbr` | Product |
| `mechanism-observability` | `y3RwQr` | Product |
| `mechanism-sre` | `k3S5j` | Product |

Also extract `mechanism-home` from `sK5Fc` — T7 builds it as DOM, but needs the same measurements.

- [ ] **Step 3: Export a parity PNG per Wave 1 screen**

Pencil MCP, one call:

```js
Export(["JLg8h","T4FJtW","zTOam","OAfMk","bEaQH","HL34b","k1XEU","gYoDZ","YEXx8","K6I26T"],
       "png", "./design-reference/png", { scale: 1 });
```

Confirm ten files land in `design-reference/png/`, named `<nodeId>.png`.

- [ ] **Step 4: Write `design-reference/README.md`**

Document: what each folder holds, the exact commands that regenerate it, the node-ID-to-page mapping table from Step 2, and a warning that the folder is gitignored and regenerable.

- [ ] **Step 5: Verify every geometry file parses and is non-trivial**

```bash
cd /Users/swami/Documents/Stackgen_Website_Redesign
for f in design-reference/geometry/*.json; do
  node -e "const d=require('./$f'); if(!d.nodes||d.nodes.length<3) { console.error('THIN: $f', d.nodes?.length); process.exit(1);} console.log('OK  $f', d.nodes.length, 'nodes', JSON.stringify(d.viewBox));"
done
ls design-reference/png | wc -l
```

Expected: every file `OK` with a plausible node count, `10` PNGs. A geometry file with fewer than 3 nodes means the extraction failed — re-run it rather than proceeding.

- [ ] **Step 6: Commit**

`design-reference/` is gitignored, so only the script is committed.

```bash
git add web/scripts/extract-geometry.mjs
git commit -m "T4: canvas geometry extraction script"
```

Report the geometry node counts and any `PROBLEM` lines printed in Step 2 — a clipped node in the canvas will otherwise reappear as a mystery parity defect in Wave 5.

---

# WAVE 2 — Route skeleton (serial, 1 agent)

## Task 5: All routes and section stubs 🧠

This task exists solely to create the shared contract that lets Waves 3 and 4 run 8-wide without file conflicts. It writes every page and every section/diagram file as a typed stub; later tasks fill exactly one stub each and never touch a page file.

**Model:** `inherit`

**Skills:**
- `/Users/swami/.cursor/skills/nextjs-developer/SKILL.md`
- `/Users/swami/.cursor/skills/react-specialist/SKILL.md`
- superpowers:test-driven-development

**Files:**
- Create: `web/app/page.tsx` (replaces T1's placeholder), `web/app/product/[slug]/page.tsx`, `web/app/platform/page.tsx`, `web/app/case-studies/page.tsx`, `web/app/case-studies/greythr/page.tsx`, `web/app/case-studies/innovaccer/page.tsx`, `web/app/schedule-demo/page.tsx`
- Create: `web/app/about/page.tsx`, `web/app/pricing/page.tsx`, `web/app/contact/page.tsx`, `web/app/mcp-server/page.tsx`, `web/app/platform/integrations/page.tsx`, `web/app/platform/cloud-to-code/page.tsx`, `web/app/platform/custom-policies/page.tsx`, `web/app/platform/iac-lifecycle/page.tsx`, `web/app/solutions/page.tsx`, `web/app/partners/page.tsx`
- Create: `web/components/ComingSoon.tsx`
- Create: every file listed under T6–T21 in the §A.2 ownership table, **as a stub**
- Create: `web/app/__tests__/routes.test.tsx`

**Interfaces:**
- Consumes: `web/lib/types.ts` (T1), `web/components/primitives/*` (T2), `web/content/*` (T3).
- Produces: every section and diagram file exists and exports a component with its final signature, so Waves 3 and 4 only replace bodies.

- [ ] **Step 1: Write the stub convention**

Every section stub follows this exact shape. `SectionProps<T>` comes from `web/lib/types.ts`.

```tsx
// web/components/sections/home/Problem.tsx — STUB, filled by T10
import type { SectionProps } from '@/lib/types';
import home from '@/content/home';

type ProblemContent = typeof home.problem;

export function Problem({ content }: SectionProps<ProblemContent>) {
  return (
    <section aria-labelledby="problem-heading" data-stub="Problem">
      <h2 id="problem-heading">{content.heading}</h2>
    </section>
  );
}
```

Every diagram stub follows this exact shape:

```tsx
// web/components/diagrams/ProblemDiagram.tsx — STUB, filled by T10
import type { DiagramProps } from '@/lib/types';

export function ProblemDiagram({ className, titleId = 'problem-diagram-title' }: DiagramProps) {
  return (
    <svg
      viewBox="0 0 1440 1481"
      className={className}
      role="img"
      aria-labelledby={titleId}
      data-stub="ProblemDiagram"
    >
      <title id={titleId}>Problem diagram</title>
    </svg>
  );
}
```

The `data-stub` attribute is how the wave gate finds unfilled stubs. Filling a stub means removing that attribute.

- [ ] **Step 2: Write `web/app/page.tsx` composing all Home sections**

```tsx
import { Nav } from '@/components/primitives/Nav';
import { Footer } from '@/components/primitives/Footer';
import { Hero } from '@/components/sections/home/Hero';
import { Mechanism } from '@/components/sections/home/Mechanism';
import { Logos } from '@/components/sections/home/Logos';
import { Problem } from '@/components/sections/home/Problem';
import { FactoryProcess } from '@/components/sections/home/FactoryProcess';
import { AdfLoop } from '@/components/sections/home/AdfLoop';
import { AgenticOs } from '@/components/sections/home/AgenticOs';
import { OperationalContextGraphSection } from '@/components/sections/home/OperationalContextGraphSection';
import { Integrations } from '@/components/sections/home/Integrations';
import { InTheirWords } from '@/components/sections/home/InTheirWords';
import { Compliance } from '@/components/sections/home/Compliance';
import { FinalCta } from '@/components/sections/home/FinalCta';
import home from '@/content/home';

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero content={home.hero} />
        <Mechanism content={home.mechanism} />
        <Logos content={home.logos} />
        <Problem content={home.problem} />
        <FactoryProcess content={home.factoryProcess} />
        <AdfLoop content={home.adfLoop} />
        <AgenticOs content={home.agenticOs} />
        <OperationalContextGraphSection content={home.contextGraph} />
        <Integrations content={home.integrations} />
        <InTheirWords content={home.inTheirWords} />
        <Compliance content={home.compliance} />
        <FinalCta content={home.finalCta} />
      </main>
      <Footer />
    </>
  );
}
```

The `Footer` here resolves spec §6's open item: Home's canvas frame has no Footer child, and every other page does. Adding it is an intentional, logged deviation — record it in your report.

- [ ] **Step 3: Write `web/app/product/[slug]/page.tsx`**

```tsx
import { notFound } from 'next/navigation';
import { Nav } from '@/components/primitives/Nav';
import { Footer } from '@/components/primitives/Footer';
import { ProductHero } from '@/components/sections/product/ProductHero';
import { ProductMetrics } from '@/components/sections/product/ProductMetrics';
import { ProductMechanism } from '@/components/sections/product/ProductMechanism';
import { EarlyAccessStrip } from '@/components/sections/product/EarlyAccessStrip';
import { ProductFinalCta } from '@/components/sections/product/ProductFinalCta';
import infrastructure from '@/content/product-infrastructure';
import automation from '@/content/product-automation';
import observability from '@/content/product-observability';
import sre from '@/content/product-sre';

const PRODUCTS = {
  'aiden-for-infrastructure': infrastructure,
  'aiden-for-automation': automation,
  'aiden-for-observability': observability,
  'aiden-for-sre': sre,
} as const;

export function generateStaticParams() {
  return Object.keys(PRODUCTS).map((slug) => ({ slug }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = PRODUCTS[slug as keyof typeof PRODUCTS];
  if (!product) notFound();

  return (
    <>
      <Nav />
      <main>
        <ProductHero content={product.hero} />
        <ProductMetrics content={product.metrics} />
        <ProductMechanism content={product.mechanism} slug={slug} />
        {product.earlyAccess && <EarlyAccessStrip content={product.earlyAccess} />}
        <ProductFinalCta content={product.finalCta} />
      </main>
      <Footer />
    </>
  );
}
```

`params` is a Promise in Next 16 — the `await` is required, not optional.

- [ ] **Step 4: Write `web/components/ComingSoon.tsx` and the ten later-wave routes**

```tsx
import { Nav } from '@/components/primitives/Nav';
import { Footer } from '@/components/primitives/Footer';
import { ButtonPrimary } from '@/components/primitives/ButtonPrimary';
import { MonoLabel } from '@/components/primitives/MonoLabel';

export function ComingSoon({ title }: { title: string }) {
  return (
    <>
      <Nav />
      <main className="px-(--spacing-pad-x) py-(--spacing-pad-y)">
        <MonoLabel>Later wave</MonoLabel>
        <h1 className="mt-6 text-5xl font-medium text-(--color-text-primary)">{title}</h1>
        <p className="mt-4 max-w-xl text-lg text-(--color-text-secondary)">
          This page is not part of the current review build. Everything else in the
          navigation is live.
        </p>
        <div className="mt-10">
          <ButtonPrimary href="/schedule-demo">Schedule demo</ButtonPrimary>
        </div>
      </main>
      <Footer />
    </>
  );
}
```

Each of the ten routes is four lines, for example `web/app/pricing/page.tsx`:

```tsx
import { ComingSoon } from '@/components/ComingSoon';

export default function PricingPage() {
  return <ComingSoon title="Pricing" />;
}
```

Titles: `About`, `Pricing`, `Contact`, `MCP Server`, `Integrations`, `Cloud to Code`, `Custom Policies`, `IaC Lifecycle`, `Solutions`, `Partners`.

- [ ] **Step 5: Write the failing route test**

`web/app/__tests__/routes.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import HomePage from '../page';
import PricingPage from '../pricing/page';

describe('routes', () => {
  it('home renders exactly one h1 inside a main landmark', () => {
    render(<HomePage />);
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  });

  it('home has nav and footer landmarks', () => {
    render(<HomePage />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('coming-soon pages still offer the primary CTA', () => {
    render(<PricingPage />);
    expect(screen.getAllByRole('link', { name: 'Schedule demo' }).length).toBeGreaterThan(0);
  });
});
```

- [ ] **Step 6: Run it, confirm it fails, then create every stub until it passes**

Run: `cd web && pnpm test routes`

Create every section and diagram stub named in the §A.2 ownership table for T6–T21, following the Step 1 conventions. Exactly one `<h1>` lives on each page — it belongs to that page's Hero section; every other section uses `<h2>`.

- [ ] **Step 7: Verify the full build and every route**

```bash
cd web && pnpm typecheck && pnpm test && pnpm build
```

Expected: build succeeds and lists all 17 routes.

- [ ] **Step 8: Confirm the stub inventory is complete**

```bash
cd web && grep -rl 'data-stub' components | sort | wc -l
```

Record the count in your report. Wave 3 and Wave 4 gates check this number decreases to zero.

- [ ] **Step 9: Commit**

```bash
git add web/app web/components
git commit -m "T5: route skeleton, ComingSoon pages, and typed section stubs"
```

---

# WAVE 3 — Home (parallel, 8 agents)

Dispatch T6–T13 in a single message. Each owns disjoint files; none touches `web/app/page.tsx`.

**Shared instructions for every Wave 3 and Wave 4 task:**

1. Read `/Users/swami/.cursor/skills/impeccable/reference/craft-floor.md` before writing UI.
2. Read your section's geometry from `design-reference/geometry/<name>.json` (T4) — never estimate a coordinate.
3. Compare against `design-reference/png/<nodeId>.png` for the visual target.
4. Consume copy from `web/content/*` via props. **Never** hardcode a string that belongs in content.
5. Map canvas `$variable` fills to Tailwind theme tokens (`$accent` → `(--color-accent)`). **Never** write a raw hex.
6. Apply Global Constraint 6: accent text below 24px uses `--color-accent-text`.
7. Remove the `data-stub` attribute when the component is real.
8. Wrap the section body in `<Reveal>` from `@/components/motion/Reveal` so Wave 2 has its hook. It renders nothing in Wave 1.

## Task 6: Home Hero and Final CTA ⚡

**Model:** `composer-2.5-fast`
**Canvas:** Hero `XPc1X` (1440×474), Final CTA `ZHuzU` (1440×875)

**Skills:**
- `/Users/swami/.cursor/skills/senior-frontend/SKILL.md`
- `/Users/swami/.cursor/skills/ui-ux-pro-max/SKILL.md`
- `/Users/swami/.cursor/skills/impeccable/reference/craft-floor.md`
- superpowers:test-driven-development

**Files:**
- Modify: `web/components/sections/home/Hero.tsx`, `web/components/sections/home/FinalCta.tsx`
- Create: `web/components/sections/home/__tests__/Hero.test.tsx`, `FinalCta.test.tsx`

**Interfaces:**
- Consumes: `home.hero` and `home.finalCta` from T3; `ButtonPrimary`, `ButtonGhost`, `MonoLabel` from T2.
- Produces: no new exports; signatures are unchanged from the T5 stubs.

- [ ] **Step 1: Write the failing Hero test**

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Hero } from '../Hero';
import home from '@/content/home';

describe('Home Hero', () => {
  it('renders the h1 from content', () => {
    render(<Hero content={home.hero} />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(home.hero.h1);
  });

  it('offers Schedule demo as the primary action', () => {
    render(<Hero content={home.hero} />);
    expect(screen.getByRole('link', { name: 'Schedule demo' }))
      .toHaveAttribute('href', '/schedule-demo');
  });

  it('is no longer a stub', () => {
    const { container } = render(<Hero content={home.hero} />);
    expect(container.querySelector('[data-stub]')).toBeNull();
  });
});
```

- [ ] **Step 2: Run it and confirm the stub test fails**

Run: `cd web && pnpm test Hero`
Expected: FAIL on `is no longer a stub`.

- [ ] **Step 3: Implement Hero from geometry**

Per the direction contract, the headline is left-aligned at 56px above the change surface. The change surface itself belongs to T7 — Hero renders the headline block, support copy, and inline CTA only, and must not duplicate it.

- [ ] **Step 4: Run the Hero tests and confirm they pass**

Run: `cd web && pnpm test Hero`
Expected: PASS, 3 tests.

- [ ] **Step 5: Repeat steps 1-4 for FinalCta**

Its test asserts the heading renders as `<h2>` (not `<h1>` — one `h1` per page) and that a `Schedule demo` link is present.

- [ ] **Step 6: Verify and commit**

```bash
cd web && pnpm typecheck && pnpm test Hero FinalCta && cd ..
git add web/components/sections/home/Hero.tsx web/components/sections/home/FinalCta.tsx web/components/sections/home/__tests__
git commit -m "T6: Home hero and final CTA"
```

---

## Task 7: Home Mechanism change surface 🧠

The single most important composition on the site — the direction contract says this page proves bounded autonomy *with the artifact*. Build it as real DOM so the diff is selectable and screen-readable.

**Model:** `inherit`
**Canvas:** Mechanism `sK5Fc` (1440×619); geometry in `design-reference/geometry/mechanism-home.json`

**Skills:**
- `/Users/swami/.cursor/skills/senior-frontend/SKILL.md`
- `/Users/swami/.cursor/skills/a11y-audit/SKILL.md`
- `/Users/swami/.cursor/skills/impeccable/reference/craft-floor.md`
- superpowers:test-driven-development

**Files:**
- Modify: `web/components/sections/home/Mechanism.tsx`
- Create: `web/components/ChangeSurface.tsx`
- Create: `web/components/__tests__/ChangeSurface.test.tsx`

**Interfaces produced:**

```ts
export type ChangeSurfaceProps = {
  intent: string;
  diff: string;              // unified diff text, newline separated
  verdict: { state: 'pass' | 'halt'; label: string; rule: string };
  mergeTarget: string;
  className?: string;
};
export function ChangeSurface(props: ChangeSurfaceProps): JSX.Element
```

T14 reuses `ChangeSurface` for the product Mechanism sections, so this signature is load-bearing.

- [ ] **Step 1: Write the failing test**

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ChangeSurface } from '../ChangeSurface';

const props = {
  intent: 'Give the payments service a read replica in eu-west-1',
  diff: '+ resource "aws_db_instance" "replica" {\n+   instance_class = "db.r6g.large"\n+ }',
  verdict: { state: 'halt' as const, label: 'Halted by policy',
             rule: 'tirith.data.residency.eu_only' },
  mergeTarget: 'payments-infra / main',
};

describe('ChangeSurface', () => {
  it('renders the diff inside a preformatted code element', () => {
    const { container } = render(<ChangeSurface {...props} />);
    const code = container.querySelector('pre > code');
    expect(code).not.toBeNull();
    expect(code!.textContent).toContain('aws_db_instance');
  });

  it('names the policy rule that produced the verdict', () => {
    render(<ChangeSurface {...props} />);
    expect(screen.getByText('tirith.data.residency.eu_only')).toBeInTheDocument();
  });

  it('conveys the verdict with text, not colour alone', () => {
    render(<ChangeSurface {...props} />);
    expect(screen.getByText('Halted by policy')).toBeInTheDocument();
  });
});
```

The third test enforces WCAG 1.4.1 — a green or amber chip with no label fails for colour-blind readers.

- [ ] **Step 2: Run it and confirm it fails**

Run: `cd web && pnpm test ChangeSurface`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement ChangeSurface**

Requirements:
- The diff is a real `<pre><code>` using `font-mono`. Added lines use `--color-pass`, removed lines use `--color-halt`, and each line is additionally prefixed with its `+` or `-` character so meaning does not depend on colour.
- The verdict chip uses `--color-pass` or `--color-halt` as a *border and background tint*, with the label as text.
- The rule identifier renders in `font-mono` at `--color-text-secondary`.
- `data-part` attributes on each region: `intent`, `diff`, `diff-line`, `verdict`, `merge-target`. Wave 2 animates these.

- [ ] **Step 4: Run and confirm the tests pass**

Run: `cd web && pnpm test ChangeSurface`
Expected: PASS, 3 tests.

- [ ] **Step 5: Wire ChangeSurface into the Mechanism section**

`Mechanism.tsx` renders the section header from `home.mechanism` plus `<ChangeSurface>` fed from the same content slice. Remove `data-stub`.

- [ ] **Step 6: Verify and commit**

```bash
cd web && pnpm typecheck && pnpm test ChangeSurface Mechanism && cd ..
git add web/components/ChangeSurface.tsx web/components/sections/home/Mechanism.tsx web/components/__tests__
git commit -m "T7: change surface and Home mechanism section"
```

---

## Task 8: Home Logos and Integrations ⚡

**Model:** `composer-2.5-fast`
**Canvas:** Logos `d751F` (1440×162), Integrations `K1zfG` (1440×1278)

**Skills:**
- `/Users/swami/.cursor/skills/senior-frontend/SKILL.md`
- `/Users/swami/.cursor/skills/performance-engineer/SKILL.md`
- `/Users/swami/.cursor/skills/impeccable/reference/craft-floor.md`
- superpowers:test-driven-development

**Files:**
- Modify: `web/components/sections/home/Logos.tsx`, `web/components/sections/home/Integrations.tsx`
- Create: tests for both
- Create: `web/public/logos/tools/*.svg` (exported from canvas)

**Interfaces:** consumes `CUSTOMER_LOGOS` from `@/content/shared` (T3) and `home.logos` / `home.integrations`.

- [ ] **Step 1: Export the eight tool logos from the canvas**

Component IDs recorded 2026-08-20: AWS `j8jzF`, Azure `HoxfJ`, Google Cloud `n2DyG`, Kubernetes `SgvCA`, Docker `PQOV4`, Terraform `l2zNQN`, Git `USeuP`, SonarQube `qp4rE`.

Verify each still exists before exporting:

```js
for (const id of ["j8jzF","HoxfJ","n2DyG","SgvCA","PQOV4","l2zNQN","USeuP","qp4rE"]) {
  const n = Get(id, { depth: 0 });
  Print(id, n ? n.name : "MISSING");
}
```

Export as PNG at scale 2 into `web/public/logos/tools/`, then record the mapping from node ID to vendor name in your report. If a node is missing, report it rather than substituting a logo from elsewhere.

- [ ] **Step 2: Write the failing Logos test**

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Logos } from '../Logos';
import home from '@/content/home';
import { CUSTOMER_LOGOS } from '@/content/shared';

describe('Home Logos', () => {
  it('renders every customer logo with an accessible name', () => {
    render(<Logos content={home.logos} />);
    for (const logo of CUSTOMER_LOGOS) {
      expect(screen.getByAltText(logo.name)).toBeInTheDocument();
    }
  });

  it('renders exactly twelve logos', () => {
    render(<Logos content={home.logos} />);
    expect(screen.getAllByRole('img')).toHaveLength(12);
  });
});
```

- [ ] **Step 3: Run it, confirm it fails, implement, confirm it passes**

Use `next/image` with explicit `width` and `height` from `CUSTOMER_LOGOS` so no layout shift occurs. Every logo carries `alt={logo.name}` — these are informational, not decorative, so empty alt is wrong.

- [ ] **Step 4: Repeat for Integrations**

Its test asserts the tool logos render with accessible names. Tool logos are decorative *only* if the vendor name appears as adjacent text; if it does not, they need alt text. Read the canvas to determine which case applies and note the decision in your report.

- [ ] **Step 5: Verify and commit**

```bash
cd web && pnpm typecheck && pnpm test Logos Integrations && cd ..
git add web/components/sections/home/Logos.tsx web/components/sections/home/Integrations.tsx web/components/sections/home/__tests__ web/public/logos/tools
git commit -m "T8: customer logo strip and integrations grid"
```

---

## Task 9: Home In Their Words and Compliance ⚡

**Model:** `composer-2.5-fast`
**Canvas:** In Their Words `f4Wpn4` (1440×714), Compliance `sWPEe` (1440×652)

**Skills:**
- `/Users/swami/.cursor/skills/senior-frontend/SKILL.md`
- `/Users/swami/.cursor/skills/a11y-audit/SKILL.md`
- `/Users/swami/.cursor/skills/impeccable/reference/craft-floor.md`
- superpowers:test-driven-development

**Files:**
- Modify: `web/components/sections/home/InTheirWords.tsx`, `web/components/sections/home/Compliance.tsx`
- Create: tests for both

- [ ] **Step 1: Write the failing quote-labelling test**

This is the section where Global Constraint 5 is most likely to be violated, so the test enforces it directly.

```tsx
import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { InTheirWords } from '../InTheirWords';
import home from '@/content/home';

describe('In Their Words', () => {
  it('renders every quote as a blockquote', () => {
    const { container } = render(<InTheirWords content={home.inTheirWords} />);
    expect(container.querySelectorAll('blockquote'))
      .toHaveLength(home.inTheirWords.quotes.length);
  });

  it('visibly marks every placeholder quote', () => {
    const { container } = render(<InTheirWords content={home.inTheirWords} />);
    const blocks = Array.from(container.querySelectorAll('blockquote'));
    home.inTheirWords.quotes.forEach((quote, i) => {
      if (quote.status === 'placeholder') {
        expect(within(blocks[i] as HTMLElement).getByText(/PLACEHOLDER/)).toBeInTheDocument();
      }
    });
  });

  it('links published quotes to their source', () => {
    render(<InTheirWords content={home.inTheirWords} />);
    for (const quote of home.inTheirWords.quotes) {
      if (quote.status === 'published') {
        expect(screen.getByRole('link', { name: /source/i }))
          .toHaveAttribute('href', quote.sourceUrl);
      }
    }
  });
});
```

- [ ] **Step 2: Run it, confirm it fails, implement, confirm it passes**

Use semantic `<blockquote>` with `<cite>` for attribution. The `PLACEHOLDER` marker is visible text, not a `title` attribute or a colour — a reviewer must be unable to mistake it for real customer voice.

- [ ] **Step 3: Repeat for Compliance**

Its test asserts every badge from `home.compliance.badges` renders as text. Badges are SOC2, PCI, HIPAA and the analyst credentials; do not invent any not present in content.

- [ ] **Step 4: Verify and commit**

```bash
cd web && pnpm typecheck && pnpm test InTheirWords Compliance && cd ..
git add web/components/sections/home/InTheirWords.tsx web/components/sections/home/Compliance.tsx web/components/sections/home/__tests__
git commit -m "T9: quotes and compliance strip"
```

---

## Tasks 10–13: Home diagrams (parallel)

These four tasks share one procedure. Each owns different files and runs concurrently.

| Task | Diagram component | Section | Canvas node | Geometry file | Model |
|---|---|---|---|---|---|
| **T10** | `ProblemDiagram.tsx` | `home/Problem.tsx` | `vU48B` (1440×1481) | `problem.json` | `inherit` 🧠 |
| **T11** | `FactoryProcessDiagram.tsx` | `home/FactoryProcess.tsx` | `pnlIy` (1440×604) | `factory-process.json` | `composer-2.5-fast` ⚡ |
| **T12** | `AdfLoopDiagram.tsx` | `home/AdfLoop.tsx` | `t5DPzG` (1440×870) | `adf-loop.json` | `inherit` 🧠 |
| **T13** | `AgenticOsDiagram.tsx` + `OperationalContextGraph.tsx` | `home/AgenticOs.tsx` + `home/OperationalContextGraphSection.tsx` | `YQTAQ` (1440×964) + `RBIMd` (1440×543) | `agentic-os.json` + `context-graph-home.json`, `context-graph-platform.json` | `inherit` 🧠 |

**Skills for all four:**
- `/Users/swami/.cursor/skills/design-bridge/SKILL.md`
- `/Users/swami/.cursor/skills/epic-design/SKILL.md` — read for the depth and motion-hook discipline, **not** to add animation in Wave 1
- `/Users/swami/.cursor/skills/a11y-audit/SKILL.md`
- `/Users/swami/.cursor/skills/impeccable/reference/craft-floor.md`
- superpowers:test-driven-development

**Shared procedure — every step applies to your assigned diagram:**

- [ ] **Step 1: Load your geometry file**

```bash
cd /Users/swami/Documents/Stackgen_Website_Redesign
node -e "const d=require('./design-reference/geometry/<YOUR_FILE>.json'); console.log('viewBox', d.viewBox, 'nodes', d.nodes.length); d.nodes.slice(0,40).forEach(n=>console.log(n.depth, n.type, n.name, n.x, n.y, n.width, n.height, n.text??''));"
```

Never estimate a coordinate. If the geometry file is missing or has under 3 nodes, stop and report `NEEDS_CONTEXT` rather than inventing a layout.

- [ ] **Step 2: Write the failing diagram test**

Substitute your component and node names. This exact test shape is required for all four:

```tsx
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ProblemDiagram } from '../ProblemDiagram';

describe('ProblemDiagram', () => {
  it('exposes an accessible name via title', () => {
    const { container } = render(<ProblemDiagram />);
    const svg = container.querySelector('svg')!;
    expect(svg).toHaveAttribute('role', 'img');
    const titleId = svg.getAttribute('aria-labelledby')!;
    expect(container.querySelector(`#${titleId}`)?.textContent).toBeTruthy();
  });

  it('describes the flow for screen readers', () => {
    const { container } = render(<ProblemDiagram />);
    expect(container.querySelector('desc')?.textContent?.length ?? 0)
      .toBeGreaterThan(40);
  });

  it('carries motion hooks on every animatable part', () => {
    const { container } = render(<ProblemDiagram />);
    expect(container.querySelectorAll('[data-part]').length).toBeGreaterThan(2);
  });

  it('renders diagram labels as real SVG text, not paths', () => {
    const { container } = render(<ProblemDiagram />);
    expect(container.querySelectorAll('text').length).toBeGreaterThan(0);
  });

  it('is no longer a stub', () => {
    const { container } = render(<ProblemDiagram />);
    expect(container.querySelector('[data-stub]')).toBeNull();
  });
});
```

- [ ] **Step 3: Run it and confirm it fails**

Run: `cd web && pnpm test <YourDiagram>`
Expected: FAIL on `is no longer a stub` and on the `data-part` count.

- [ ] **Step 4: Transcribe the geometry into SVG**

Rules, all from Global Constraint 8:
- `viewBox` is exactly the value in your geometry file.
- Rectangles become `<rect>` with `x`, `y`, `width`, `height`, `rx` from `cornerRadius`.
- Text becomes `<text>` with `x`, `y`, `fontSize`, `fontFamily` — never a path, never a `<foreignObject>`.
- Fills reference CSS variables: `fill="var(--color-surface-card)"`, matching the `$variable` in the geometry file. No raw hex.
- Repeated structures (stage cards, loop segments, graph nodes) are generated with `.map()` over a typed array, not copy-pasted. Repeated elements carry `data-part="<kind>"` and `data-index={i}`.
- Connectors are `<path>` with `stroke-dasharray` left unset in Wave 1 — Wave 2 animates `stroke-dashoffset`, which needs an unbroken path.
- Purely decorative shapes get `aria-hidden="true"`.
- The `<desc>` describes the flow in a sentence a screen-reader user can act on, for example: "Four stages run left to right: intent, factory spec, factory runtime, factory learning; learning feeds back into intent."

- [ ] **Step 5: Run the tests and confirm they pass**

Run: `cd web && pnpm test <YourDiagram>`
Expected: PASS, 5 tests.

- [ ] **Step 6: Wire the diagram into its section and remove that stub too**

The section component renders its header from content plus your diagram. The section's own test asserts its `<h2>` renders and no `data-stub` remains.

**T13 only:** `OperationalContextGraph` takes `variant: 'home' | 'platform'` and switches `viewBox` and node set between `context-graph-home.json` (1440×543) and `context-graph-platform.json` (1440×945). Build one parameterised component, not two. T19 consumes the `platform` variant.

```ts
export type ContextGraphProps = DiagramProps & { variant: 'home' | 'platform' };
export function OperationalContextGraph(props: ContextGraphProps): JSX.Element
```

- [ ] **Step 7: Verify and commit**

```bash
cd web && pnpm typecheck && pnpm test <YourDiagram> <YourSection> && cd ..
git add web/components/diagrams/<YourDiagram>.tsx web/components/sections/home/<YourSection>.tsx web/components/diagrams/__tests__ web/components/sections/home/__tests__
git commit -m "T<N>: <diagram name> as live SVG with motion hooks"
```

### Wave 3 gate

```bash
cd web && pnpm typecheck && pnpm test && pnpm build
grep -rl 'data-stub' components/sections/home components/diagrams | sort
```

Expected: clean build; the grep returns only files owned by Wave 4.

---

# WAVE 4 — Products, Platform, Cases, Demo (parallel, 8 agents)

Dispatch T14–T21 in a single message.

## Task 14: Product page sections 🧠

**Model:** `inherit`
**Canvas:** Hero `GJDna`, Metrics `QP77r`, Early Access Strip `lUtF2`, Final CTA `v47e5` (Infrastructure page `T4FJtW` is the reference; the other three reuse the template)

**Skills:**
- `/Users/swami/.cursor/skills/react-specialist/SKILL.md`
- `/Users/swami/.cursor/skills/senior-frontend/SKILL.md`
- `/Users/swami/.cursor/skills/impeccable/reference/craft-floor.md`
- superpowers:test-driven-development

**Files:**
- Modify: `web/components/sections/product/ProductHero.tsx`, `ProductMetrics.tsx`, `ProductMechanism.tsx`, `EarlyAccessStrip.tsx`, `ProductFinalCta.tsx`
- Create: tests for each

**Interfaces:**
- Consumes: the four product content modules (T3), `MetricCell` (T2), `ChangeSurface` (T7).
- Produces: `ProductMechanism` dispatches to the per-product diagram by slug:

```tsx
const MECHANISM_DIAGRAMS = {
  'aiden-for-infrastructure': InfrastructureMechanism,
  'aiden-for-automation': AutomationMechanism,
  'aiden-for-observability': ObservabilityMechanism,
  'aiden-for-sre': SreMechanism,
} as const;
```

T15–T18 fill those four diagram components; this task imports them from their stub state, which already type-checks.

- [ ] **Step 1: Write the failing template test**

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ProductMetrics } from '../ProductMetrics';
import infrastructure from '@/content/product-infrastructure';

describe('ProductMetrics', () => {
  it('renders each metric with its mechanism', () => {
    render(<ProductMetrics content={infrastructure.metrics} />);
    for (const metric of infrastructure.metrics) {
      expect(screen.getByText(metric.value)).toBeInTheDocument();
      expect(screen.getByText(metric.mechanism)).toBeInTheDocument();
    }
  });
});
```

- [ ] **Step 2: Run it, confirm it fails, implement all five sections, confirm they pass**

`ProductHero` renders the page's single `<h1>`. `EarlyAccessStrip` renders only when content is non-null — the conditional lives in `web/app/product/[slug]/page.tsx` (T5), so this component may assume its content exists.

- [ ] **Step 3: Verify all four product routes build**

```bash
cd web && pnpm typecheck && pnpm test product && pnpm build
```

- [ ] **Step 4: Commit**

```bash
git add web/components/sections/product
git commit -m "T14: shared product page template sections"
```

---

## Tasks 15–18: Product mechanism diagrams (parallel) ⚡

Four independent tasks, one per product. **Follow the Wave 3 diagram procedure (T10–T13, Steps 1–7) exactly** — same test shape, same transcription rules, same commit pattern.

| Task | Component | Canvas node | Geometry file | Diagram intent from the IA brief |
|---|---|---|---|---|
| **T15** | `diagrams/product/InfrastructureMechanism.tsx` | `w8Wb0v` (1240×1275) | `mechanism-infrastructure.json` | Intent to policy-checked change; show a diff, pull request, and policy evaluation, never abstract shapes |
| **T16** | `diagrams/product/AutomationMechanism.tsx` | `u2Jbr` (1240×1275) | `mechanism-automation.json` | Commit, build and test, infrastructure and context-graph checks, gate, deploy |
| **T17** | `diagrams/product/ObservabilityMechanism.tsx` | `y3RwQr` (1240×781) | `mechanism-observability.json` | State and anomaly correlation with change attribution |
| **T18** | `diagrams/product/SreMechanism.tsx` | `k3S5j` (1240×1146) | `mechanism-sre.json` | Drift, alert, root-cause analysis on the Operational Context Graph, remediate, deploy, verify, including the refusal boundary |

**Model:** `composer-2.5-fast` for all four.

**Skills for all four:**
- `/Users/swami/.cursor/skills/design-bridge/SKILL.md`
- `/Users/swami/.cursor/skills/epic-design/SKILL.md`
- `/Users/swami/.cursor/skills/a11y-audit/SKILL.md`
- `/Users/swami/.cursor/skills/impeccable/reference/craft-floor.md`
- superpowers:test-driven-development

**T18 additional requirement:** the SRE diagram must render the refusal boundary as a labelled element with `data-part="refusal-boundary"`. Per Product Principle 2, bounded autonomy is the product, not a caveat — the boundary is the point of the diagram, and the `<desc>` must say so.

---

## Task 19: Platform sections and diagrams 🧠

**Model:** `inherit`
**Canvas:** Platform `HL34b` — Hero `Q3gT0H`, Two Planes `KGZ7Q` (1440×165), Operational Context Graph `O4fic7` (1440×945), Aiden OS and Product Links `gWRK3` (1440×846), Final CTA `q8grMq`

**Skills:**
- `/Users/swami/.cursor/skills/design-bridge/SKILL.md`
- `/Users/swami/.cursor/skills/senior-frontend/SKILL.md`
- `/Users/swami/.cursor/skills/a11y-audit/SKILL.md`
- `/Users/swami/.cursor/skills/impeccable/reference/craft-floor.md`
- superpowers:test-driven-development

**Files:**
- Modify: `web/components/sections/platform/*.tsx`
- Modify: `web/components/diagrams/TwoPlanesDiagram.tsx`, `web/components/diagrams/AidenOsLinksDiagram.tsx`
- Create: tests

**Interfaces:**
- Consumes: `OperationalContextGraph` from T13 with `variant="platform"`. **Do not build a second context-graph component.**

- [ ] **Step 1: Write the failing test for the two planes**

```tsx
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { TwoPlanesDiagram } from '../TwoPlanesDiagram';

describe('TwoPlanesDiagram', () => {
  it('labels both planes as text', () => {
    const { container } = render(<TwoPlanesDiagram />);
    const text = Array.from(container.querySelectorAll('text'))
      .map((t) => t.textContent).join(' ');
    expect(text).toMatch(/Deterministic/i);
    expect(text).toMatch(/Agentic/i);
  });

  it('carries motion hooks', () => {
    const { container } = render(<TwoPlanesDiagram />);
    expect(container.querySelectorAll('[data-part]').length).toBeGreaterThan(1);
  });
});
```

- [ ] **Step 2: Run it, confirm it fails, then follow the Wave 3 diagram procedure for both diagrams**

- [ ] **Step 3: Implement the Platform sections**

`AidenOsLinks` cross-links to all four product routes. Its test asserts four links resolving to `/product/aiden-for-infrastructure`, `/product/aiden-for-automation`, `/product/aiden-for-observability`, `/product/aiden-for-sre`.

- [ ] **Step 4: Verify and commit**

```bash
cd web && pnpm typecheck && pnpm test platform TwoPlanes AidenOs && cd ..
git add web/components/sections/platform web/components/diagrams/TwoPlanesDiagram.tsx web/components/diagrams/AidenOsLinksDiagram.tsx web/components/diagrams/__tests__
git commit -m "T19: platform sections, two planes and Aiden OS links diagrams"
```

---

## Task 20: Case study sections ⚡

**Model:** `composer-2.5-fast`
**Canvas:** Index `k1XEU` (Hero `eeTWI`, Featured `j3jJ5`), greytHR `gYoDZ` (Hero `Z1p1oB`, Metrics `UUADq`), Innovaccer `YEXx8` (Hero `IFvsO`)

**Skills:**
- `/Users/swami/.cursor/skills/senior-frontend/SKILL.md`
- `/Users/swami/.cursor/skills/a11y-audit/SKILL.md`
- `/Users/swami/.cursor/skills/impeccable/reference/craft-floor.md`
- superpowers:test-driven-development

**Files:**
- Modify: `web/components/sections/case/CaseHero.tsx`, `CaseMetrics.tsx`, `FeaturedCases.tsx`
- Create: tests

- [ ] **Step 1: Write the failing test for the published greytHR quote**

greytHR carries the only published quote in the project. The test enforces that it is attributed and sourced, and that Innovaccer carries no fabricated named quote.

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CaseHero } from '../CaseHero';
import greythr from '@/content/case-greythr';
import innovaccer from '@/content/case-innovaccer';

describe('CaseHero', () => {
  it('attributes and sources the published greytHR quote', () => {
    render(<CaseHero content={greythr.hero} />);
    expect(screen.getByText(/Abhishek Gaurav/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /source/i }))
      .toHaveAttribute('href', 'https://stackgen.com/case-studies/greythr');
  });

  it('renders Innovaccer without a named quote', () => {
    const { container } = render(<CaseHero content={innovaccer.hero} />);
    expect(container.querySelector('blockquote')).toBeNull();
  });
});
```

- [ ] **Step 2: Run it, confirm it fails, implement all three sections, confirm they pass**

`FeaturedCases` links to `/case-studies/greythr` and `/case-studies/innovaccer`.

- [ ] **Step 3: Verify and commit**

```bash
cd web && pnpm typecheck && pnpm test case && cd ..
git add web/components/sections/case
git commit -m "T20: case study sections"
```

---

## Task 21: Schedule Demo page and form 🧠

**Model:** `inherit`
**Canvas:** Schedule Demo `K6I26T` — Hero `e05qlm` (1440×380), Form Stub `a8pHq` (1440×105)

The destination of every primary CTA on the site. It must not feel like a stub even though it does not submit.

**Skills:**
- `/Users/swami/.cursor/skills/senior-frontend/SKILL.md`
- `/Users/swami/.cursor/skills/a11y-audit/SKILL.md`
- `/Users/swami/.cursor/skills/impeccable/reference/craft-floor.md`
- superpowers:test-driven-development

**Files:**
- Modify: `web/components/sections/demo/DemoHero.tsx`
- Create: `web/components/sections/demo/DemoForm.tsx` (`'use client'`)
- Create: tests

**Interfaces produced:**

```ts
export function DemoForm(props: { className?: string }): JSX.Element   // 'use client'
```

- [ ] **Step 1: Write the failing form test**

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { DemoForm } from '../DemoForm';

describe('DemoForm', () => {
  it('labels every field visibly', () => {
    render(<DemoForm />);
    for (const label of ['Work email', 'Company', 'Role']) {
      expect(screen.getByLabelText(label)).toBeInTheDocument();
    }
  });

  it('reports a validation error without submitting', async () => {
    const user = userEvent.setup();
    render(<DemoForm />);
    await user.click(screen.getByRole('button', { name: /request demo/i }));
    expect(await screen.findByRole('alert')).toHaveTextContent(/work email/i);
  });

  it('states plainly that the prototype does not submit', async () => {
    const user = userEvent.setup();
    render(<DemoForm />);
    await user.type(screen.getByLabelText('Work email'), 'sre@example.com');
    await user.type(screen.getByLabelText('Company'), 'Example');
    await user.type(screen.getByLabelText('Role'), 'SRE');
    await user.click(screen.getByRole('button', { name: /request demo/i }));
    expect(await screen.findByRole('status'))
      .toHaveTextContent(/prototype/i);
  });
});
```

- [ ] **Step 2: Run it, confirm it fails, implement, confirm it passes**

Requirements:
- Every field has a real visible `<label>` with `htmlFor`. A placeholder is not a label.
- Validation errors render in a `role="alert"` container and are wired to their field via `aria-describedby` and `aria-invalid`.
- Success renders in a `role="status"` container saying plainly that this is a prototype and nothing was sent.
- The submit control is a real `<button type="submit">` inside a `<form>` with `onSubmit` calling `preventDefault()`.

- [ ] **Step 3: Verify and commit**

```bash
cd web && pnpm typecheck && pnpm test Demo && cd ..
git add web/components/sections/demo
git commit -m "T21: schedule demo page with validated non-submitting form"
```

### Wave 4 gate

```bash
cd web && pnpm typecheck && pnpm test && pnpm build
grep -rn 'data-stub' components | sort
```

Expected: clean build, **zero** `data-stub` matches. Any remaining stub means a Wave 3 or 4 task did not finish.

---

# WAVE 5 — Verification (parallel, 2 read-only agents)

T22 and T23 write reports only. Neither edits application code, so they run concurrently without conflict.

## Task 22: Parity verification 🧠

**Model:** `inherit`

**Skills:**
- `/Users/swami/.cursor/skills/full-page-screenshot/SKILL.md`
- `/Users/swami/.cursor/skills/browser-automation/SKILL.md`
- `/Users/swami/.cursor/skills/senior-qa/SKILL.md`
- `/Users/swami/.cursor/skills/impeccable/reference/audit.md`

**Files:**
- Create: `web/playwright.config.ts`, `web/e2e/parity.spec.ts`
- Create: `.superpowers/sdd/wave1-parity-report.md`

**Constraint:** this is **one batched pass**, per the spec's bounded-verification rule. Capture every defect in a single list. Do not fix anything — T24 fixes them all in one batch.

- [ ] **Step 1: Install Playwright and write the config**

```bash
cd web && pnpm add -D @playwright/test && pnpm exec playwright install chromium
```

```ts
// web/playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  use: {
    baseURL: 'http://localhost:3000',
    viewport: { width: 1440, height: 1024 },
  },
});
```

- [ ] **Step 2: Write the screenshot spec**

```ts
// web/e2e/parity.spec.ts
import { test } from '@playwright/test';

const ROUTES: [string, string][] = [
  ['/', 'home'],
  ['/product/aiden-for-infrastructure', 'product-infrastructure'],
  ['/product/aiden-for-automation', 'product-automation'],
  ['/product/aiden-for-observability', 'product-observability'],
  ['/product/aiden-for-sre', 'product-sre'],
  ['/platform', 'platform'],
  ['/case-studies', 'case-index'],
  ['/case-studies/greythr', 'case-greythr'],
  ['/case-studies/innovaccer', 'case-innovaccer'],
  ['/schedule-demo', 'schedule-demo'],
];

for (const [route, name] of ROUTES) {
  test(`capture ${name}`, async ({ page }) => {
    await page.goto(route, { waitUntil: 'networkidle' });
    await page.screenshot({ path: `../design-reference/actual/${name}.png`, fullPage: true });
  });
}
```

- [ ] **Step 3: Run the container and capture all ten routes**

```bash
cd /Users/swami/Documents/Stackgen_Website_Redesign
mkdir -p design-reference/actual
docker compose --profile prod up --build -d
sleep 25
cd web && pnpm exec playwright test && cd ..
docker compose --profile prod down
ls design-reference/actual | wc -l
```

Expected: `10`.

- [ ] **Step 4: Compare each capture against its canvas export**

Read both images for each route: `design-reference/png/<nodeId>.png` (canvas) and `design-reference/actual/<name>.png` (built). The node-ID-to-name mapping is in `design-reference/README.md` from T4.

For each route record every difference in: section order, vertical rhythm and section heights, type scale and weight, colour, spacing, alignment, and missing or extra elements.

- [ ] **Step 5: Write the report**

`.superpowers/sdd/wave1-parity-report.md`, one table per route:

| # | Section | Severity | Expected (canvas) | Actual (built) | File to fix |
|---|---|---|---|---|---|

Severity is `Critical` (wrong content or missing section), `Major` (visibly wrong layout or type), or `Minor` (a few pixels). Name the exact owning file for every row so T24 can act without re-investigating.

- [ ] **Step 6: Commit the harness only**

```bash
git add web/playwright.config.ts web/e2e/parity.spec.ts web/package.json
git commit -m "T22: parity screenshot harness"
```

The report lives in gitignored scratch; state its path and the defect count by severity in your returned summary.

---

## Task 23: Accessibility audit 🧠

**Model:** `inherit`

**Skills:**
- `/Users/swami/.cursor/skills/a11y-audit/SKILL.md`
- `/Users/swami/.cursor/skills/accessibility-tester/SKILL.md`
- `/Users/swami/.cursor/skills/browser-automation/SKILL.md`

**Files:**
- Create: `web/e2e/a11y.spec.ts`
- Create: `.superpowers/sdd/wave1-a11y-report.md`

**Constraint:** report only, no fixes. **Do not report SC 1.4.10 Reflow or SC 1.4.4 Resize Text as defects** — Global Constraint 12 records them as accepted deviations of the desktop-only scope. Every other Level A and AA criterion is in scope.

- [ ] **Step 1: Add axe and write the spec**

```bash
cd web && pnpm add -D @axe-core/playwright
```

```ts
// web/e2e/a11y.spec.ts
import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const ROUTES = [
  '/', '/product/aiden-for-infrastructure', '/product/aiden-for-automation',
  '/product/aiden-for-observability', '/product/aiden-for-sre', '/platform',
  '/case-studies', '/case-studies/greythr', '/case-studies/innovaccer',
  '/schedule-demo', '/pricing',
];

for (const route of ROUTES) {
  test(`a11y ${route}`, async ({ page }, testInfo) => {
    await page.goto(route, { waitUntil: 'networkidle' });
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();
    await testInfo.attach(`axe-${route.replace(/\//g, '_')}.json`, {
      body: JSON.stringify(results.violations, null, 2),
      contentType: 'application/json',
    });
    expect(results.violations).toEqual([]);
  });
}
```

- [ ] **Step 2: Run against the container**

```bash
cd /Users/swami/Documents/Stackgen_Website_Redesign
docker compose --profile prod up --build -d && sleep 25
cd web && pnpm exec playwright test e2e/a11y.spec.ts; cd ..
docker compose --profile prod down
```

Failures here are expected on a first run — they are the finding, not an error.

- [ ] **Step 3: Run the manual checks axe cannot automate**

Keyboard-only: tab through every route and confirm every interactive element is reachable, focus is always visible, and order is logical. Confirm each diagram's `<desc>` actually describes the flow rather than restating the title. Confirm the `PLACEHOLDER` markers are visible text. Confirm the change surface's diff conveys added and removed lines without relying on colour.

- [ ] **Step 4: Write the report**

`.superpowers/sdd/wave1-a11y-report.md`:

| # | Route | WCAG SC | Severity | Issue | File to fix | Fix |
|---|---|---|---|---|---|---|

Use the a11y-audit skill's severity definitions: Critical blocks a user group, Major degrades significantly, Minor causes friction. Include the exact fix code for each row.

- [ ] **Step 5: Commit the harness only**

```bash
git add web/e2e/a11y.spec.ts web/package.json
git commit -m "T23: axe accessibility harness"
```

---

# WAVE 6 — Fix and close out (serial)

## Task 24: Batched fix pass 🧠

Runs **alone**. It is the only task permitted to edit files owned by other tasks, and only those named in the two reports.

**Model:** `inherit`

**Skills:**
- `/Users/swami/.cursor/skills/a11y-audit/SKILL.md`
- `/Users/swami/.cursor/skills/senior-frontend/SKILL.md`
- `/Users/swami/.cursor/skills/impeccable/reference/polish.md`
- `/Users/swami/.cursor/skills/code-reviewer/SKILL.md`

**Files:** any file named in `.superpowers/sdd/wave1-parity-report.md` or `.superpowers/sdd/wave1-a11y-report.md`.

- [ ] **Step 1: Read both reports and build one ordered fix list**

Order: a11y Critical, parity Critical, a11y Major, parity Major, a11y Minor, parity Minor. Deduplicate rows pointing at the same file and line.

- [ ] **Step 2: Apply every Critical and Major fix in one pass**

Do not re-screenshot between individual fixes — that is the polish loop the spec forbids. Fix the whole batch, then verify once.

- [ ] **Step 3: Escalate rather than guess on conflicts**

If a parity fix would violate Global Constraint 6, or an a11y fix would change copy, stop and report it as a concern for the user. Contrast substitutions are pre-approved; nothing else is.

- [ ] **Step 4: Re-run everything once**

```bash
cd web && pnpm typecheck && pnpm test && pnpm build && cd ..
docker compose --profile prod up --build -d && sleep 25
cd web && pnpm exec playwright test; cd ..
docker compose --profile prod down
```

Expected: typecheck clean, unit tests passing, build clean, axe violations zero. Remaining Minor parity items are acceptable if listed in the deviation log; Critical and Major are not.

- [ ] **Step 5: Commit**

```bash
git add web/
git commit -m "T24: batched parity and accessibility fixes"
```

---

## Task 25: Documentation and deviation log ⚡

**Model:** `composer-2.5-fast`

**Skills:**
- `/Users/swami/.cursor/skills/technical-writer/SKILL.md`
- `/Users/swami/.cursor/skills/docker-expert/SKILL.md`

**Files:**
- Create: `web/README.md`, `.superpowers/sdd/wave1-deviations.md`

- [ ] **Step 1: Write `web/README.md`**

Cover, with commands that have actually been run: what this is (a desktop-only Wave 1 review prototype, not production); prerequisites (Docker 28+, or Node 24 and pnpm 11 for local dev); `docker compose --profile prod up` as the one-command review path and `--profile dev` for hot reload; `pnpm typecheck`, `pnpm test`, `pnpm exec playwright test`; the folder map; how tokens map to the canvas and the rule that hex values are never written in components; how to regenerate `design-reference/`; and the Wave 2 motion contract — `Reveal`, `MotionProvider`, `data-part` — so the next implementer knows the hooks exist.

- [ ] **Step 2: Write `.superpowers/sdd/wave1-deviations.md`**

Every accepted departure from pixel-parity or full AA, one row each, gathered from all task reports:

| # | Deviation | Type | Reason | Canvas node / route | Approved by |
|---|---|---|---|---|---|

Seed rows already known: the accent-to-accent-text substitutions (Global Constraint 6); the Footer added to Home (spec §6); SC 1.4.10 Reflow and SC 1.4.4 Resize Text not met (Global Constraint 12); any `PRODUCT.md` copy override logged by T3; any Minor parity item consciously left unfixed by T24.

- [ ] **Step 3: Verify the README's commands actually work**

Run every command the README gives a reader, from a clean shell, and confirm each behaves as documented. A README command that fails is a defect.

- [ ] **Step 4: Commit**

```bash
git add web/README.md
git commit -m "T25: README and Wave 1 deviation log"
```

---

## Final whole-branch review

After T25, dispatch one final code reviewer on `inherit` using `superpowers:requesting-code-review`'s `code-reviewer.md` template, with a review package covering `git merge-base main HEAD..HEAD`. Hand it the Global Constraints block from this plan verbatim as its attention lens, plus the Minor findings roll-up from the progress ledger so it can triage what must be fixed before merge.

If it returns findings, dispatch **one** fix subagent with the complete list, not one per finding.

Then use `superpowers:finishing-a-development-branch`.

---

## Appendix: Task index

| # | Task | Wave | Model | Parallel with |
|---|---|---|---|---|
| 1 | Project scaffold, tokens, Docker | 0 | inherit | — |
| 2 | Primitive components | 1 | fast | 3, 4 |
| 3 | Content type system and modules | 1 | inherit | 2, 4 |
| 4 | Canvas geometry extraction | 1 | fast | 2, 3 |
| 5 | Route skeleton and stubs | 2 | inherit | — |
| 6 | Home hero and final CTA | 3 | fast | 7–13 |
| 7 | Home mechanism change surface | 3 | inherit | 6, 8–13 |
| 8 | Home logos and integrations | 3 | fast | 6, 7, 9–13 |
| 9 | Home quotes and compliance | 3 | fast | 6–8, 10–13 |
| 10 | Problem diagram | 3 | inherit | 6–9, 11–13 |
| 11 | Factory Process diagram | 3 | fast | 6–10, 12, 13 |
| 12 | ADF Loop diagram | 3 | inherit | 6–11, 13 |
| 13 | Agentic OS and Context Graph diagrams | 3 | inherit | 6–12 |
| 14 | Product page sections | 4 | inherit | 15–21 |
| 15 | Infrastructure mechanism diagram | 4 | fast | 14, 16–21 |
| 16 | Automation mechanism diagram | 4 | fast | 14, 15, 17–21 |
| 17 | Observability mechanism diagram | 4 | fast | 14–16, 18–21 |
| 18 | SRE mechanism diagram | 4 | fast | 14–17, 19–21 |
| 19 | Platform sections and diagrams | 4 | inherit | 14–18, 20, 21 |
| 20 | Case study sections | 4 | fast | 14–19, 21 |
| 21 | Schedule demo page and form | 4 | inherit | 14–20 |
| 22 | Parity verification | 5 | inherit | 23 |
| 23 | Accessibility audit | 5 | inherit | 22 |
| 24 | Batched fix pass | 6 | inherit | — |
| 25 | Documentation and deviation log | 6 | fast | — |
