# Factory-Anchored Experience Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Re-anchor the StackGen site experience on factory.ai's architecture and copy discipline, re-skin it in the positioning deck's warm light system, and replace abstract diagrams with real product footage and ported deck diagrams.

**Architecture:** The existing Next.js App Router app in `web/` is kept and re-tokenised rather than rebuilt. A single `@theme` block flips the whole system from cold dark to warm light, so every component that already reads tokens follows automatically. Motion becomes real because the proof layer is temporal. Diagrams are ported from Figma; proof comes from redacted clips of real product demos.

**Tech Stack:** Next.js 16.3, React 19.2, TypeScript strict, Tailwind v4 `@theme`, motion 13.1.0, Vitest + Testing Library, Playwright + axe, pnpm, Docker.

**Spec:** `docs/superpowers/specs/2026-08-20-factory-anchored-experience-design.md`

---

## Global Constraints

Every task's requirements implicitly include this section. Values are verbatim from the spec.

1. **Naming table is binding, verbatim:** `Autonomous DevOps Factory (ADF)`, `Aiden for Infrastructure`, `Aiden for Automation`, `Aiden for Observability`, `Aiden for SRE`, `AppStacks`, `StackBuilder`, `StackGuard`, `StackAnchor`, `Tirith`, `Aiden OS`, `Operational Context Graph`. **Never** write `Olly`, `Aiden for InfraOps`, or `Aiden for DevOps`. The deck titles two diagrams with banned names; correct them on port.
2. **Banned copy:** em dashes, `single pane of glass`, competitor-replacement claims, modeled dollar ROI.
3. **Schedule demo is the only primary CTA.**
4. **Every metric cites a mechanism. Every quote is published with a source URL or visibly marked `PLACEHOLDER`.** Only greytHR is published.
5. **Colour is ground-aware.** Deck colours are valid on dark plates and invalid on cream. On cream use `--color-text-secondary` `#6B6154` and `--color-accent-text` `#6D28D9`. Never place `#96897C`, `#B898F8`, `#A8E0F8`, `#4ADE80` or `#F0883E` as text on cream.
6. **Status is never encoded by colour alone.** Pass and halt converge under deuteranopia; every state also carries a label, glyph or position.
7. **Copy discipline:** median sentence 7 to 9 words, at least 85% of sentences 15 words or fewer, one idea per section, sentence-case headings.
8. **Diagram rules:** one `<svg>` per diagram, geometry read from source never estimated, `data-part` on every animatable part, real `<text>` never paths, `role="img"` + `<title>` + `<desc>` + `aria-labelledby`, body copy through `DiagramText` with the source box width and a `maxLines` bound.
9. **Motion:** only `transform`, `opacity`, `filter`, `clip-path`. No animation shifts layout. `IntersectionObserver`, never scroll listeners.
10. **Redaction is mandatory.** No product frame or clip ships without passing `web/scripts/redaction.ts`.
11. **Never edit `Stack_Linear.pen`.** Pencil MCP is read-only here.
12. **Accepted deviations:** SC 1.4.10 Reflow and SC 1.4.4 Resize Text not met (desktop-only). Full AA is not claimed. RTL unsupported.

---

## Codebase map

Established with Torbit MCP against project `Stackgen_Website_Redesign`. Import fan-out determines wave order.

| Symbol | Importers | Consequence |
|---|---:|---|
| `@/components/motion/Reveal` | **26** | Highest fan-out. Making it real touches every section, so it lands in Wave 1 before page work |
| `@/components/ComingSoon` | 10 | Out-of-scope routes |
| `@/components/primitives/Nav` · `Footer` · `ButtonPrimary` | 8 each | Chrome, re-tokenised in Wave 1 |
| `@/components/sections/FinalCtaCompact` | 5 | Shared close |
| `@/components/primitives/MonoLabel` | 5 | Micro-labels |
| `@/components/primitives/SectionHeaderSplit` | 4 | Section headers |
| `@/components/diagrams/OperationalContextGraph` | 2 | Shared home + platform variant |
| `@/components/ChangeSurface` | 2 | Tirith policy gate |

Diagram complexity, by definition count, which sets task sizing:

`OperationalContextGraph` 104 · `AutomationMechanism` 95 · `InfrastructureMechanism` 92 · `SreMechanism` 75 · `ObservabilityMechanism` 69 · `AgenticOsDiagram` 56 · `DiagramText` 48 · `ProblemDiagram` 44 · `AdfLoopDiagram` 43 · `AidenOsLinksDiagram` 31 · `FactoryProcessDiagram` 28 · `TwoPlanesDiagram` 19

Current surface: 17 route files, 11 content modules, 2 lib modules, 52 test files, 192 passing tests.

**Warning for every task:** the Torbit graph contains many repositories. Always scope queries by joining `_orbit_manifest` and filtering `repo_path LIKE '%Stackgen_Website_Redesign%'`, or you will read another project's files. An unscoped query returns `web/src/pages/...` paths that do not exist here.

---

## Shared procedure for every task

**Read before starting:**
1. The spec section your task implements.
2. `/Users/swami/.cursor/skills/impeccable/reference/craft-floor.md` — the quality floor, before writing any UI.
3. The skills listed on your task.

**Understand the code with Torbit MCP before editing. This is required, not optional.**

```sql
-- Who imports the thing you are about to change?
SELECT DISTINCT i.file_path
FROM gl_imported_symbol i JOIN _orbit_manifest m ON i.project_id = m.project_id
WHERE m.repo_path LIKE '%Stackgen_Website_Redesign%'
  AND i.import_path = '@/components/<yours>';

-- What does a file define?
SELECT name, definition_type, start_line
FROM gl_definition d JOIN _orbit_manifest m ON d.project_id = m.project_id
WHERE m.repo_path LIKE '%Stackgen_Website_Redesign%' AND d.file_path = 'web/<path>'
ORDER BY start_line;
```

Run `index` first if your task follows another that added files. Report the importer count you found in your task report; a change to a component with importers you did not check is a review failure.

**TDD is mandatory.** Write the failing test, run it, watch it fail for the right reason, write minimal code, watch it pass. Never write implementation first.

**Ownership.** Touch only the files your task lists. `git add` explicit paths, never `-A`. Parallel tasks run in the same working tree.

**Definition of done:** `cd web && pnpm typecheck && pnpm test` green, your own tests included, then commit with the message your task specifies, then write `.superpowers/sdd/factory-task-<N>-report.md`.

---

## Wave 0 — Token foundation (serial, 1 agent)

Nothing else can start. 49 component files read these tokens.

### Task 1: Light design system tokens

**Skills:**
- `/Users/swami/.cursor/skills/impeccable/reference/colorize.md`
- `/Users/swami/.cursor/skills/impeccable/reference/typeset.md`
- `/Users/swami/.cursor/skills/impeccable/reference/craft-floor.md`
- superpowers:test-driven-development

**Files:**
- Modify: `web/app/globals.css`
- Modify: `web/app/layout.tsx` (font wiring)
- Create: `web/lib/__tests__/tokens.test.ts`
- Create: `web/public/fonts/` (Geist woff2, 400/500/600)

**Interfaces produced:** the token names every later task uses. Exact names below; no task may invent a token.

- [ ] **Step 1: Write the failing contrast test**

Create `web/lib/__tests__/tokens.test.ts`:

```ts
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const css = readFileSync(join(process.cwd(), 'app/globals.css'), 'utf8');

function token(name: string): string {
  const m = css.match(new RegExp(`--color-${name}:\\s*(#[0-9A-Fa-f]{6})`));
  if (!m) throw new Error(`token --color-${name} not found`);
  return m[1];
}
function lin(c: number) {
  const v = c / 255;
  return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
}
function lum(hex: string) {
  const n = hex.slice(1);
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(n.slice(i, i + 2), 16));
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}
function contrast(a: string, b: string) {
  const [x, y] = [lum(a), lum(b)];
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
}

describe('light design system tokens', () => {
  it('renders ink on cream well above AA', () => {
    expect(contrast(token('text-primary'), token('bg-base'))).toBeGreaterThanOrEqual(4.5);
  });

  it('renders muted text on cream at AA', () => {
    expect(contrast(token('text-secondary'), token('bg-base'))).toBeGreaterThanOrEqual(4.5);
  });

  it('renders accent text on cream at AA', () => {
    expect(contrast(token('accent-text'), token('bg-base'))).toBeGreaterThanOrEqual(4.5);
  });

  it('renders cream text on the dark plate at AA', () => {
    expect(contrast(token('text-on-panel'), token('panel'))).toBeGreaterThanOrEqual(4.5);
  });

  it('renders the deck muted value on plates only, never on cream', () => {
    expect(contrast(token('text-muted-panel'), token('panel'))).toBeGreaterThanOrEqual(4.5);
    expect(contrast(token('text-muted-panel'), token('bg-base'))).toBeLessThan(4.5);
  });

  it('gives the primary action a cream label at AA', () => {
    expect(contrast(token('bg-base'), token('action'))).toBeGreaterThanOrEqual(4.5);
  });

  it('pairs every semantic role for both grounds', () => {
    expect(contrast(token('pass-ink'), token('bg-base'))).toBeGreaterThanOrEqual(4.5);
    expect(contrast(token('pass'), token('panel'))).toBeGreaterThanOrEqual(4.5);
    expect(contrast(token('halt-ink'), token('bg-base'))).toBeGreaterThanOrEqual(4.5);
    expect(contrast(token('halt'), token('panel'))).toBeGreaterThanOrEqual(4.5);
  });

  it('keeps the focus ring visible on cream', () => {
    expect(contrast(token('focus'), token('bg-base'))).toBeGreaterThanOrEqual(3);
  });

  it('drops the blanket reduced-motion override', () => {
    expect(css).not.toContain('0.01ms');
  });
});
```

- [ ] **Step 2: Run it and watch it fail**

```bash
cd web && pnpm exec vitest run lib/__tests__/tokens.test.ts
```

Expected: FAIL with `token --color-panel not found`. The current file is the dark system.

- [ ] **Step 3: Replace the theme block**

Replace the `@theme` block and the reduced-motion block in `web/app/globals.css`:

```css
@import "tailwindcss";

@theme {
  /* Grounds */
  --color-bg-base: #F0E8E0;
  --color-bg-raised: #E7DED4;
  --color-panel: #181810;
  --color-panel-raised: #202018;

  /* Lines */
  --color-border-hairline: #D0C8C0;
  --color-border-panel: #2A2820;

  /* Text */
  --color-text-primary: #181810;
  --color-text-secondary: #6B6154;
  --color-text-on-panel: #F0E8E0;
  --color-text-muted-panel: #96897C;

  /* Accents: fields and graphics */
  --color-accent: #B898F8;
  --color-accent-cyan: #A8E0F8;

  /* Ground-aware pairs */
  --color-accent-text: #6D28D9;
  --color-action: #4C1D95;
  --color-focus: #4C1D95;
  --color-focus-on-panel: #B898F8;
  --color-pass: #4ADE80;
  --color-pass-ink: #166534;
  --color-halt: #F0883E;
  --color-halt-ink: #9A3412;
  --color-info-ink: #155E75;

  --font-sans: var(--font-haffer), var(--font-geist), ui-sans-serif, system-ui, sans-serif;
  --font-mono: var(--font-jetbrains-mono), ui-monospace, monospace;

  --spacing-pad-x: 100px;
  --spacing-pad-y: 120px;

  --radius-chip: 3px;
  --radius-card: 4px;
  --radius-plate: 8px;
}

@layer base {
  html {
    background-color: var(--color-bg-base);
    color: var(--color-text-primary);
    -webkit-font-smoothing: antialiased;
    overflow-x: clip;
  }

  body {
    font-family: var(--font-sans);
    min-width: 0;
    overflow-x: hidden;
  }

  :focus-visible {
    outline: 2px solid var(--color-focus);
    outline-offset: 2px;
  }

  /* Plates invert the focus ring, per spec 3.1. */
  [data-ground="panel"] :focus-visible {
    outline-color: var(--color-focus-on-panel);
  }
}

@media (max-width: 767px) {
  :root {
    --spacing-pad-x: 20px;
    --spacing-pad-y: 72px;
  }
}

/*
 * Reduced motion substitutes a calm alternative rather than suppressing
 * feedback. Components read the preference and render final state; clips hold
 * their poster. No blanket duration override, per spec 3.6.
 */
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
}
```

- [ ] **Step 4: Run the test and watch it pass**

```bash
cd web && pnpm exec vitest run lib/__tests__/tokens.test.ts
```

Expected: PASS, 9 tests.

- [ ] **Step 5: Wire the fallback font with metric overrides**

Download Geist 400/500/600 woff2 into `web/public/fonts/`. In `web/app/layout.tsx`, replace the Inter import with a local font declaration. Haffer XH is not licensed yet, so Geist is the active face and the override block is where Haffer lands later.

```ts
import localFont from 'next/font/local';

const geist = localFont({
  variable: '--font-geist',
  display: 'swap',
  src: [
    { path: '../public/fonts/Geist-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/Geist-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../public/fonts/Geist-SemiBold.woff2', weight: '600', style: 'normal' },
  ],
});
```

Apply `geist.variable` to the `<html>` className. Leave `--font-haffer` undeclared so the stack falls through to Geist until the licence lands.

- [ ] **Step 6: Verify the whole suite still runs**

```bash
cd web && pnpm typecheck && pnpm test && pnpm build
```

Expected: typecheck clean, build clean. Tests will show failures in components that assert dark-system colours; record the failing list in your report and leave them for the tasks that own those files. Do not fix another task's tests.

- [ ] **Step 7: Commit**

```bash
git add web/app/globals.css web/app/layout.tsx web/lib/__tests__/tokens.test.ts web/public/fonts
git commit -m "T1: light design system tokens and font loading"
```

---

## Wave 0b — Motion foundation (serial, 1 agent)

`useReducedMotion` is imported by T3 and T4, so motion cannot run beside them. It runs after T1 and before Wave 1.

### Task 2: Real motion

**Skills:**
- `/Users/swami/.cursor/skills/impeccable/reference/animate.md`
- `/Users/swami/.cursor/skills/senior-frontend/SKILL.md`
- superpowers:test-driven-development

**Files:**
- Modify: `web/components/motion/Reveal.tsx`
- Modify: `web/components/motion/MotionProvider.tsx`
- Create: `web/components/motion/useReducedMotion.ts`
- Modify: `web/components/motion/__tests__/Reveal.test.tsx`

**Torbit first:** `Reveal` has 26 importers. Confirm the list before changing its signature; the call sites must not need edits.

**Interfaces produced:**

```ts
export function Reveal(props: { children: ReactNode; delay?: number }): JSX.Element;
export function MotionProvider(props: { children: ReactNode }): JSX.Element;  // 'use client'
export function useReducedMotion(): boolean;                                   // 'use client'
```

- [ ] **Step 1: Write the failing tests**

Replace `web/components/motion/__tests__/Reveal.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { Reveal } from '../Reveal';

beforeEach(() => {
  vi.stubGlobal('IntersectionObserver', class {
    constructor(private cb: IntersectionObserverCallback) {}
    observe() { this.cb([{ isIntersecting: true } as IntersectionObserverEntry], this as never); }
    disconnect() {}
    unobserve() {}
  });
  window.matchMedia = vi.fn().mockReturnValue({
    matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn(),
  }) as never;
});

describe('Reveal', () => {
  it('renders its children', () => {
    render(<Reveal><p>Policy evaluated at every boundary.</p></Reveal>);
    expect(screen.getByText('Policy evaluated at every boundary.')).toBeInTheDocument();
  });

  it('animates only transform and opacity, never layout properties', () => {
    const { container } = render(<Reveal><p>Body</p></Reveal>);
    const style = (container.firstElementChild as HTMLElement).getAttribute('style') ?? '';
    expect(style).not.toMatch(/(^|;)\s*(top|left|width|height)\s*:/);
  });

  it('renders content at final state when reduced motion is preferred', () => {
    window.matchMedia = vi.fn().mockReturnValue({
      matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn(),
    }) as never;
    const { container } = render(<Reveal><p>Body</p></Reveal>);
    const el = container.firstElementChild as HTMLElement;
    expect(el.style.opacity === '' || el.style.opacity === '1').toBe(true);
  });
});
```

- [ ] **Step 2: Run and watch it fail**

```bash
cd web && pnpm exec vitest run components/motion
```

Expected: FAIL on the style assertions. The current `Reveal` renders a fragment with no element.

- [ ] **Step 3: Implement**

`web/components/motion/useReducedMotion.ts`:

```ts
'use client';
import { useEffect, useState } from 'react';

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const q = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(q.matches);
    const on = (e: MediaQueryListEvent) => setReduced(e.matches);
    q.addEventListener('change', on);
    return () => q.removeEventListener('change', on);
  }, []);
  return reduced;
}
```

`web/components/motion/Reveal.tsx`:

```tsx
'use client';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useReducedMotion } from './useReducedMotion';

export function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || shown) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries[0]?.isIntersecting && setShown(true),
      { rootMargin: '0px 0px -10% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced, shown]);

  const animate = !reduced;
  return (
    <div
      ref={ref}
      style={
        animate
          ? {
              opacity: shown ? 1 : 0,
              transform: shown ? 'translateY(0)' : 'translateY(16px)',
              transition: `opacity 600ms cubic-bezier(0.32,0.72,0,1) ${delay}ms, transform 600ms cubic-bezier(0.32,0.72,0,1) ${delay}ms`,
            }
          : undefined
      }
    >
      {children}
    </div>
  );
}
```

`web/components/motion/MotionProvider.tsx` keeps its signature and simply renders children; the preference is read per component by `useReducedMotion`, so no context is needed. Add a comment saying so, and delete nothing else.

- [ ] **Step 4: Run and watch it pass**

```bash
cd web && pnpm exec vitest run components/motion && pnpm typecheck
```

Expected: PASS.

- [ ] **Step 5: Confirm the 26 call sites still compile**

```bash
cd web && pnpm build
```

Expected: clean. `Reveal` now emits a `<div>`; if any parent relied on `Reveal` being transparent to flex or grid layout, fix it in that parent and note it in your report.

- [ ] **Step 6: Commit**

```bash
git add web/components/motion
git commit -m "T2: real scroll-entry motion with reduced-motion fallback"
```

---

## Wave 1 — Shared primitives (parallel, 4 agents)

Dispatch T3, T4, T5, T20 together. All depend on T1 and T2.

### Task 3: Product proof components

**Skills:**
- `/Users/swami/.cursor/skills/react-specialist/SKILL.md`
- `/Users/swami/.cursor/skills/performance-engineer/SKILL.md`
- `/Users/swami/.cursor/skills/a11y-audit/SKILL.md`
- superpowers:test-driven-development

**Files:**
- Create: `web/components/media/ProductFrame.tsx`
- Create: `web/components/media/ProductClip.tsx`
- Create: `web/components/media/VideoFigure.tsx`
- Create: `web/components/media/__tests__/ProductClip.test.tsx`
- Create: `web/components/media/__tests__/VideoFigure.test.tsx`

**Interfaces produced:**

```ts
export function ProductFrame(props: { children: ReactNode; className?: string }): JSX.Element;
export function ProductClip(props: {
  src: { webm: string; mp4: string };
  poster: string;
  label: string;      // accessible name, names the surface
  caption: string;    // visible one-sentence description
}): JSX.Element;      // 'use client'
export function VideoFigure(props: {
  poster: string; src: string; label: string; caption: string;
}): JSX.Element;      // 'use client'
```

- [ ] **Step 1: Write the failing tests**

`web/components/media/__tests__/ProductClip.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { ProductClip } from '../ProductClip';

const props = {
  src: { webm: '/product/audit.webm', mp4: '/product/audit.mp4' },
  poster: '/product/audit.webp',
  label: 'Aiden running an AWS security audit',
  caption: 'Three agents scan the account and produce a standardised report.',
};

beforeEach(() => {
  vi.stubGlobal('IntersectionObserver', class {
    observe() {} disconnect() {} unobserve() {}
  });
  window.matchMedia = vi.fn().mockReturnValue({
    matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn(),
  }) as never;
});

describe('ProductClip', () => {
  it('carries the four attributes autoplay requires on Safari and iOS', () => {
    const { container } = render(<ProductClip {...props} />);
    const v = container.querySelector('video')!;
    expect(v.muted).toBe(true);
    expect(v.hasAttribute('playsinline')).toBe(true);
    expect(v.hasAttribute('loop')).toBe(true);
    expect(v.getAttribute('poster')).toBe(props.poster);
  });

  it('never preloads, so clips do not compete with first paint', () => {
    const { container } = render(<ProductClip {...props} />);
    expect(container.querySelector('video')!.getAttribute('preload')).toBe('none');
  });

  it('offers both encodes with the efficient one first', () => {
    const { container } = render(<ProductClip {...props} />);
    const types = [...container.querySelectorAll('source')].map((s) => s.getAttribute('type'));
    expect(types).toEqual(['video/webm', 'video/mp4']);
  });

  it('names the surface for assistive technology', () => {
    const { container } = render(<ProductClip {...props} />);
    expect(container.querySelector('video')!.getAttribute('aria-label')).toBe(props.label);
  });

  it('shows a visible caption, because a silent clip needs a text equivalent', () => {
    render(<ProductClip {...props} />);
    expect(screen.getByText(props.caption)).toBeInTheDocument();
  });

  it('does not autoplay under reduced motion and exposes controls instead', () => {
    window.matchMedia = vi.fn().mockReturnValue({
      matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn(),
    }) as never;
    const { container } = render(<ProductClip {...props} />);
    const v = container.querySelector('video')!;
    expect(v.hasAttribute('autoplay')).toBe(false);
    expect(v.hasAttribute('controls')).toBe(true);
  });
});
```

`web/components/media/__tests__/VideoFigure.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { VideoFigure } from '../VideoFigure';

const props = {
  poster: '/product/greythr.webp',
  src: 'https://www.youtube.com/embed/V0zsWdJz2rs',
  label: 'greytHR on running SRE with Aiden',
  caption: 'Abhishek Gaurav, Head of Engineering and DevOps, greytHR.',
};

describe('VideoFigure', () => {
  it('shows a poster and a play control before anything loads', () => {
    render(<VideoFigure {...props} />);
    expect(screen.getByRole('button', { name: /play/i })).toBeInTheDocument();
    expect(document.querySelector('iframe')).toBeNull();
  });

  it('loads the player only after the visitor asks for it', async () => {
    render(<VideoFigure {...props} />);
    await userEvent.click(screen.getByRole('button', { name: /play/i }));
    expect(document.querySelector('iframe')).not.toBeNull();
  });
});
```

- [ ] **Step 2: Run and watch them fail**

```bash
cd web && pnpm exec vitest run components/media
```

Expected: FAIL, module not found.

- [ ] **Step 3: Implement the three components**

`web/components/media/ProductFrame.tsx`:

```tsx
import type { ReactNode } from 'react';

/** Dark plate with the iridescent field behind it, per spec 3.4. */
export function ProductFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={['relative', className].filter(Boolean).join(' ')}>
      <div
        aria-hidden="true"
        className="absolute -inset-4 rounded-plate opacity-60 blur-2xl"
        style={{
          background:
            'linear-gradient(120deg, var(--color-accent) 0%, var(--color-accent-cyan) 55%, #F5C2DC 100%)',
        }}
      />
      <div className="relative overflow-hidden rounded-plate border border-border-panel bg-panel" data-ground="panel">
        {children}
      </div>
    </div>
  );
}
```

`web/components/media/ProductClip.tsx`:

```tsx
'use client';
import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/components/motion/useReducedMotion';
import { ProductFrame } from './ProductFrame';

export function ProductClip({
  src, poster, label, caption,
}: { src: { webm: string; mp4: string }; poster: string; label: string; caption: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) void el.play().catch(() => {}); else el.pause(); },
      { threshold: 0.25 },
    );
    io.observe(el);
    const onHide = () => { if (document.hidden) el.pause(); };
    document.addEventListener('visibilitychange', onHide);
    return () => { io.disconnect(); document.removeEventListener('visibilitychange', onHide); };
  }, [reduced]);

  return (
    <figure className="flex flex-col gap-3">
      <ProductFrame>
        <video
          ref={ref}
          muted
          loop
          playsInline
          preload="none"
          poster={poster}
          controls={reduced}
          aria-label={label}
          className="block h-auto w-full"
        >
          <source src={src.webm} type="video/webm" />
          <source src={src.mp4} type="video/mp4" />
        </video>
      </ProductFrame>
      <figcaption className="text-[15px] leading-6 tracking-[0.01em] text-text-secondary">
        {caption}
      </figcaption>
    </figure>
  );
}
```

`web/components/media/VideoFigure.tsx`:

```tsx
'use client';
import { useState } from 'react';
import { ProductFrame } from './ProductFrame';

export function VideoFigure({
  poster, src, label, caption,
}: { poster: string; src: string; label: string; caption: string }) {
  const [playing, setPlaying] = useState(false);
  return (
    <figure className="flex flex-col gap-3">
      <ProductFrame>
        {playing ? (
          <iframe
            src={`${src}?autoplay=1`}
            title={label}
            allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            className="block aspect-video w-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play video: ${label}`}
            className="group relative block w-full"
          >
            <img src={poster} alt="" className="block h-auto w-full" />
            <span className="absolute inset-0 grid place-items-center">
              <span className="rounded-chip bg-action px-4 py-2 text-[13px] font-medium text-text-on-panel">
                Play
              </span>
            </span>
          </button>
        )}
      </ProductFrame>
      <figcaption className="text-[15px] leading-6 tracking-[0.01em] text-text-secondary">
        {caption}
      </figcaption>
    </figure>
  );
}
```

- [ ] **Step 4: Run and watch them pass**

```bash
cd web && pnpm exec vitest run components/media && pnpm typecheck
```

Expected: PASS, 8 tests.

- [ ] **Step 5: Commit**

```bash
git add web/components/media
git commit -m "T3: product proof components with reduced-motion and autoplay correctness"
```

### Task 4: Structural primitives

**Skills:**
- `/Users/swami/.cursor/skills/impeccable/reference/layout.md`
- `/Users/swami/.cursor/skills/senior-frontend/SKILL.md`
- superpowers:test-driven-development

**Files:**
- Create: `web/components/primitives/NumberedSequence.tsx`
- Create: `web/components/primitives/StatBand.tsx`
- Create: `web/components/primitives/IridescentBand.tsx`
- Create: `web/components/primitives/Marquee.tsx`
- Create: `web/components/primitives/PromptLine.tsx`
- Create: `web/components/primitives/__tests__/NumberedSequence.test.tsx`
- Create: `web/components/primitives/__tests__/StatBand.test.tsx`
- Create: `web/components/primitives/__tests__/PromptLine.test.tsx`
- Create: `web/components/primitives/__tests__/Marquee.test.tsx`

**Interfaces produced:**

```ts
export type SequenceItem = { title: string; body: string; href?: string };
export function NumberedSequence(props: { items: SequenceItem[]; className?: string }): JSX.Element;

export type Stat = { value: string; label: string; mechanism: string };
export function StatBand(props: { stats: Stat[] }): JSX.Element;

export function IridescentBand(props: { children: ReactNode }): JSX.Element;
export function Marquee(props: { items: string[]; label: string }): JSX.Element;   // 'use client'
export function PromptLine(props: { prompt: string }): JSX.Element;                // 'use client'
```

- [ ] **Step 1: Write the failing tests**

`web/components/primitives/__tests__/NumberedSequence.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { NumberedSequence } from '../NumberedSequence';

const items = [
  { title: 'Intent', body: 'State the operational outcome in plain language.' },
  { title: 'Factory Spec', body: 'A reviewable spec defines agents and boundaries.' },
  { title: 'Factory Runtime', body: 'Agents execute; novel cases escalate to humans.' },
];

describe('NumberedSequence', () => {
  it('numbers every item from 01 with a leading zero', () => {
    render(<NumberedSequence items={items} />);
    expect(screen.getByText('01')).toBeInTheDocument();
    expect(screen.getByText('03')).toBeInTheDocument();
  });

  it('renders each title and body', () => {
    render(<NumberedSequence items={items} />);
    for (const i of items) {
      expect(screen.getByText(i.title)).toBeInTheDocument();
      expect(screen.getByText(i.body)).toBeInTheDocument();
    }
  });

  it('marks the numbers decorative, because the titles carry the meaning', () => {
    const { container } = render(<NumberedSequence items={items} />);
    expect(container.querySelector('[data-part="index"]')?.getAttribute('aria-hidden')).toBe('true');
  });

  it('exposes the sequence as a list', () => {
    render(<NumberedSequence items={items} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });
});
```

`web/components/primitives/__tests__/StatBand.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { StatBand } from '../StatBand';

const stats = [
  { value: '10×', label: 'provisioning velocity', mechanism: 'policy-checked Terraform from intent' },
  { value: '100%', label: 'policy-checked deploys', mechanism: 'Tirith evaluates every action boundary' },
];

describe('StatBand', () => {
  it('renders the figure as the heading', () => {
    render(<StatBand stats={stats} />);
    expect(screen.getByRole('heading', { name: '10×' })).toBeInTheDocument();
  });

  it('cites a mechanism for every metric, per Global Constraint 4', () => {
    render(<StatBand stats={stats} />);
    for (const s of stats) expect(screen.getByText(s.mechanism)).toBeInTheDocument();
  });

  it('uses tabular figures so columns align', () => {
    const { container } = render(<StatBand stats={stats} />);
    expect(container.querySelector('[data-part="figure"]')?.className).toContain('tabular-nums');
  });
});
```

`web/components/primitives/__tests__/PromptLine.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { PromptLine } from '../PromptLine';

const prompt = 'scan my prod AWS account and do a security audit';

describe('PromptLine', () => {
  it('shows the prompt verbatim', () => {
    render(<PromptLine prompt={prompt} />);
    expect(screen.getByText(prompt)).toBeInTheDocument();
  });

  it('copies the prompt to the clipboard', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });
    render(<PromptLine prompt={prompt} />);
    await userEvent.click(screen.getByRole('button', { name: /copy/i }));
    expect(writeText).toHaveBeenCalledWith(prompt);
  });

  it('confirms the copy in text, not by colour alone', async () => {
    Object.assign(navigator, { clipboard: { writeText: vi.fn().mockResolvedValue(undefined) } });
    render(<PromptLine prompt={prompt} />);
    await userEvent.click(screen.getByRole('button', { name: /copy/i }));
    expect(await screen.findByText(/copied/i)).toBeInTheDocument();
  });
});
```

`web/components/primitives/__tests__/Marquee.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { Marquee } from '../Marquee';

beforeEach(() => {
  window.matchMedia = vi.fn().mockReturnValue({
    matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn(),
  }) as never;
});

describe('Marquee', () => {
  it('holds still under reduced motion', () => {
    const { container } = render(<Marquee items={['AWS', 'Azure']} label="Clouds" />);
    expect(container.querySelector('[data-part="track"]')?.getAttribute('data-animated')).toBe('false');
  });

  it('names the group for assistive technology', () => {
    render(<Marquee items={['AWS', 'Azure']} label="Clouds" />);
    expect(screen.getByRole('list', { name: 'Clouds' })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run and watch them fail**

```bash
cd web && pnpm exec vitest run components/primitives/__tests__/NumberedSequence.test.tsx components/primitives/__tests__/StatBand.test.tsx components/primitives/__tests__/PromptLine.test.tsx components/primitives/__tests__/Marquee.test.tsx
```

Expected: FAIL, modules not found.

- [ ] **Step 3: Implement**

`NumberedSequence.tsx`:

```tsx
import type { ReactNode } from 'react';

export type SequenceItem = { title: string; body: string; href?: string };

export function NumberedSequence({ items, className }: { items: SequenceItem[]; className?: string }) {
  return (
    <ol className={['grid gap-8', className].filter(Boolean).join(' ')}>
      {items.map((item, i) => (
        <li key={item.title} className="flex flex-col gap-3 border-t border-border-hairline pt-4">
          <span
            data-part="index"
            aria-hidden="true"
            className="font-mono text-[11px] tracking-[0.2em] text-accent-text"
          >
            {String(i + 1).padStart(2, '0')}
          </span>
          <h3 className="text-2xl leading-[29px] tracking-[0.01em] text-text-primary">{item.title}</h3>
          <p className="max-w-[52ch] text-base leading-6 tracking-[0.04em] text-text-secondary">
            {item.body}
          </p>
        </li>
      ))}
    </ol>
  );
}
```

`StatBand.tsx`:

```tsx
export type Stat = { value: string; label: string; mechanism: string };

export function StatBand({ stats }: { stats: Stat[] }) {
  return (
    <ul className="grid grid-cols-4 gap-8">
      {stats.map((s) => (
        <li key={s.label} className="flex flex-col gap-2">
          <h3
            data-part="figure"
            className="text-[56px] font-medium leading-none tracking-[-0.02em] tabular-nums text-text-primary"
          >
            {s.value}
          </h3>
          <p className="text-base leading-6 text-text-primary">{s.label}</p>
          <p className="text-[13px] leading-5 tracking-[0.04em] text-text-secondary">{s.mechanism}</p>
        </li>
      ))}
    </ul>
  );
}
```

`IridescentBand.tsx`:

```tsx
import type { ReactNode } from 'react';

export function IridescentBand({ children }: { children: ReactNode }) {
  return (
    <section className="relative overflow-hidden px-pad-x py-pad-y">
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(115deg, var(--color-accent) 0%, #D8C8F8 30%, var(--color-accent-cyan) 65%, #F5C2DC 100%)',
        }}
      />
      <div className="relative mx-auto max-w-[1240px]">{children}</div>
    </section>
  );
}
```

`Marquee.tsx`:

```tsx
'use client';
import { useReducedMotion } from '@/components/motion/useReducedMotion';

export function Marquee({ items, label }: { items: string[]; label: string }) {
  const reduced = useReducedMotion();
  const animated = !reduced;
  return (
    <ul
      aria-label={label}
      data-part="track"
      data-animated={String(animated)}
      className="flex gap-12 overflow-hidden"
      style={animated ? { animation: 'marquee 40s linear infinite' } : undefined}
    >
      {items.map((item) => (
        <li key={item} className="shrink-0 text-[15px] font-semibold text-text-secondary">
          {item}
        </li>
      ))}
    </ul>
  );
}
```

Add the keyframes to `globals.css` in this task:

```css
@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
```

`PromptLine.tsx`:

```tsx
'use client';
import { useState } from 'react';

export function PromptLine({ prompt }: { prompt: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div
      data-ground="panel"
      className="flex items-center gap-4 rounded-card border border-border-panel bg-panel px-4 py-3"
    >
      <code className="font-mono text-[13px] text-text-on-panel">{prompt}</code>
      <button
        type="button"
        onClick={async () => {
          await navigator.clipboard.writeText(prompt);
          setCopied(true);
        }}
        className="ml-auto rounded-chip border border-border-panel px-3 py-1 font-mono text-[11px] tracking-[0.1em] text-accent uppercase"
      >
        Copy
      </button>
      <span role="status" className="font-mono text-[11px] text-text-muted-panel">
        {copied ? 'Copied' : ''}
      </span>
    </div>
  );
}
```

- [ ] **Step 4: Run and watch them pass**

```bash
cd web && pnpm exec vitest run components/primitives && pnpm typecheck
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add web/components/primitives web/app/globals.css
git commit -m "T4: structural primitives for sequences, stats, marquee and prompt"
```

### Task 5: Content model for the new sections

**Skills:**
- `/Users/swami/.agents/skills/copywriting/SKILL.md`
- `/Users/swami/.cursor/skills/technical-writer/SKILL.md`
- superpowers:test-driven-development

**Files:**
- Modify: `web/lib/types.ts`
- Modify: `web/content/home.ts`
- Modify: `web/content/product-infrastructure.ts`, `product-automation.ts`, `product-observability.ts`, `product-sre.ts`
- Create: `web/content/industries.ts`
- Modify: `web/content/__tests__/governance.test.ts`

**Interfaces produced:**

```ts
export type Industry = { slug: string; name: string; promise: string; evidence: string; href: string };
export type MomentumItem = { kind: 'report' | 'event' | 'credential'; title: string; detail: string; href?: string };
// home gains: useCases: SequenceItem[]; momentum: MomentumItem[]; featuredCase { videoId, poster, quoteRef }
// each product module gains: prompt: string; testimonial?: Quote
```

- [ ] **Step 1: Write the failing governance tests**

Append to `web/content/__tests__/governance.test.ts`:

```ts
import industries from '../industries';

describe('new content surfaces', () => {
  it('gives every product a copyable prompt from its own demo', () => {
    for (const [name, mod] of Object.entries({
      productInfrastructure, productAutomation, productObservability, productSre,
    })) {
      expect(typeof (mod as { prompt?: string }).prompt, name).toBe('string');
    }
  });

  it('ships an industry only where evidence exists', () => {
    expect(industries.length).toBeGreaterThan(0);
    for (const i of industries) {
      expect(i.evidence.length).toBeGreaterThan(20);
      expect(i.href).toBe(`/industries/${i.slug}`);
    }
  });

  it('keeps copy inside the discipline: 85% of sentences at 15 words or fewer', () => {
    const strings = allStrings(contentModules);
    const sentences = strings
      .flatMap((s) => s.split(/(?<=[.?!])\s+/))
      .map((s) => s.trim().split(/\s+/).length)
      .filter((n) => n > 3);
    const short = sentences.filter((n) => n <= 15).length;
    expect(short / sentences.length).toBeGreaterThanOrEqual(0.85);
  });
});
```

- [ ] **Step 2: Run and watch it fail**

```bash
cd web && pnpm exec vitest run content
```

Expected: FAIL, cannot resolve `../industries`.

- [ ] **Step 3: Add the types and content**

`web/lib/types.ts` gains:

```ts
export type Industry = {
  slug: string;
  name: string;
  promise: string;
  evidence: string;
  href: string;
};

export type MomentumItem = {
  kind: 'report' | 'event' | 'credential';
  title: string;
  detail: string;
  href?: string;
};
```

Create `web/content/industries.ts`. Only verticals with evidence in `PRODUCT.md` appear:

```ts
import type { Industry } from '@/lib/types';

const industries: Industry[] = [
  {
    slug: 'financial-services',
    name: 'Financial services',
    promise: 'Change lands inside the controls your risk function already set.',
    evidence:
      'One leading Latin American bank runs 53,000 deployments a week with a 60-day lead time, and 24% of change effort is rework.',
    href: '/industries/financial-services',
  },
  {
    slug: 'healthcare',
    name: 'Healthcare',
    promise: 'Environments land in a day, aligned to the controls healthcare requires.',
    evidence:
      'Innovaccer replaced days of cloud-specific glue with environments that land in under a day.',
    href: '/industries/healthcare',
  },
];

export default industries;
```

Add to `web/content/home.ts`: `useCases` (six `SequenceItem`), `momentum` (State of Reliability 2026 on 178,000 incidents; the AI SRE meetup series; Gartner Cool Vendor and four Hype Cycles), and `featuredCase` (`videoId: 'V0zsWdJz2rs'`, poster path, and the greytHR quote reference). Add `prompt` to each product module, taken from that product's own demo; Infrastructure uses `scan my prod AWS account and do a security audit`.

- [ ] **Step 4: Run and watch it pass**

```bash
cd web && pnpm exec vitest run content && pnpm typecheck
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add web/lib/types.ts web/content
git commit -m "T5: content model for use cases, industries, momentum and prompts"
```

---

### Task 20: Chrome, logo and interaction states

Covers spec 3.5.1 and 3.7, which no other task owns.

**Skills:**
- `/Users/swami/.cursor/skills/impeccable/reference/craft-floor.md`
- `/Users/swami/.cursor/skills/senior-frontend/SKILL.md`
- superpowers:test-driven-development

**Files:**
- Modify: `web/components/primitives/ButtonPrimary.tsx`, `ButtonGhost.tsx`, `Nav.tsx`, `Footer.tsx`, `Logo.tsx`
- Modify: their existing tests under `web/components/primitives/__tests__/`

**Torbit first:** `ButtonPrimary`, `Nav` and `Footer` have 8 importers each. Confirm before changing signatures.

- [ ] **Step 1: Write the failing tests**

Append to `web/components/primitives/__tests__/ButtonPrimary.test.tsx`:

```tsx
it('declares all five interaction states, not just rest and hover', () => {
  render(<ButtonPrimary href="/schedule-demo">Schedule demo</ButtonPrimary>);
  const cls = screen.getByRole('link').className;
  expect(cls).toContain('hover:');
  expect(cls).toContain('active:scale-');
  expect(cls).toContain('focus-visible:');
  expect(cls).toContain('aria-disabled:');
});

it('uses the action colour, never the decorative field colour', () => {
  render(<ButtonPrimary href="/schedule-demo">Schedule demo</ButtonPrimary>);
  const cls = screen.getByRole('link').className;
  expect(cls).toContain('bg-action');
  expect(cls).not.toContain('bg-accent');
});

it('gates hover behind a hover-capable pointer', () => {
  render(<ButtonPrimary href="/schedule-demo">Schedule demo</ButtonPrimary>);
  expect(screen.getByRole('link').className).toMatch(/\[@media\(hover:hover\)\]:|hover:/);
});
```

Append to `web/components/primitives/__tests__/Logo.test.tsx`:

```tsx
it('takes its colour from the ground rather than hard-coding a fill', () => {
  const { container } = render(<Logo />);
  const svg = container.querySelector('svg')!;
  expect(svg.innerHTML).toContain('currentColor');
  expect(svg.innerHTML).not.toMatch(/#F7F8F8|#FFFFFF/i);
});
```

- [ ] **Step 2: Run and watch them fail**

```bash
cd web && pnpm exec vitest run components/primitives/__tests__/ButtonPrimary.test.tsx components/primitives/__tests__/Logo.test.tsx
```

Expected: FAIL. Buttons currently declare rest only; the logo hard-codes the old light-on-dark fill.

- [ ] **Step 3: Implement**

`ButtonPrimary` className becomes:

```tsx
'inline-flex h-8 items-center justify-center rounded-chip bg-action px-[14px] py-2 ' +
'text-[13.5px] font-medium tracking-[-0.01em] text-text-on-panel ' +
'transition-[transform,opacity] duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] ' +
'hover:opacity-90 active:scale-[0.98] ' +
'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus ' +
'aria-disabled:cursor-not-allowed aria-disabled:opacity-50 ' +
'[@media(pointer:coarse)]:min-h-11 [@media(pointer:coarse)]:min-w-11'
```

Apply the same five-state pattern to `ButtonGhost`. Change `Logo` paths to `fill="currentColor"` so the mark inherits ink on cream and cream on plates; set `text-text-primary` in `Nav` and `text-text-on-panel` wherever the logo sits on a plate.

- [ ] **Step 4: Run and watch them pass**

```bash
cd web && pnpm exec vitest run components/primitives && pnpm typecheck
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add web/components/primitives
git commit -m "T20: chrome, ground-aware logo and five interaction states"
```


---

## Wave 2 — Media pipeline (parallel with Wave 1, 1 agent)

### Task 6: Clip extraction with a redaction gate

**Skills:**
- `/Users/swami/.cursor/skills/performance-engineer/SKILL.md`
- superpowers:test-driven-development

**Files:**
- Create: `web/scripts/clips.mjs`
- Create: `web/scripts/__tests__/clips.test.ts`
- Create: `web/public/product/*.webm|mp4|webp`
- Create: `.superpowers/sdd/redaction-signoff.md`

**Consumes:** `findSensitive` from `web/scripts/redaction.ts` (already built and tested).

- [ ] **Step 1: Write the failing budget test**

`web/scripts/__tests__/clips.test.ts`:

```ts
import { existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const dir = join(process.cwd(), 'public/product');

describe('product clip budget', () => {
  it('keeps every encode under the 3 MB budget', () => {
    if (!existsSync(dir)) return;
    for (const f of readdirSync(dir).filter((f) => /\.(webm|mp4)$/.test(f))) {
      expect(statSync(join(dir, f)).size, f).toBeLessThanOrEqual(3 * 1024 * 1024);
    }
  });

  it('ships a poster beside every clip', () => {
    if (!existsSync(dir)) return;
    const files = readdirSync(dir);
    for (const f of files.filter((f) => f.endsWith('.webm'))) {
      expect(files, `poster for ${f}`).toContain(f.replace('.webm', '.webp'));
    }
  });
});
```

- [ ] **Step 2: Run it**

```bash
cd web && pnpm exec vitest run scripts/__tests__/clips.test.ts
```

Expected: PASS trivially, because `public/product` does not exist. That is the correct starting state; the test becomes meaningful in step 4.

- [ ] **Step 3: Write the extraction script**

`web/scripts/clips.mjs` downloads with `yt-dlp`, cuts a segment with `ffmpeg`, encodes AV1 in WebM plus H.264 in MP4, and writes a WebP poster. Encode commands:

```bash
ffmpeg -ss <start> -t <dur> -i <src> -vf "scale=1440:-2,fps=30" \
  -c:v libsvtav1 -crf 34 -b:v 0 -an public/product/<name>.webm
ffmpeg -ss <start> -t <dur> -i <src> -vf "scale=1440:-2,fps=30" \
  -c:v libx264 -crf 24 -preset slow -pix_fmt yuv420p -movflags +faststart -an public/product/<name>.mp4
ffmpeg -ss <start> -i <src> -vframes 1 -vf "scale=1440:-2" public/product/<name>.webp
```

`-an` is mandatory: the clips are silent, so shipping an audio track wastes budget.

- [ ] **Step 4: Cut the clips and clear them**

Cut three clips per product page plus the home surfaces, from the videos in spec 7. For each candidate segment, extract every frame, OCR or read the visible text, and run it through `findSensitive`. A segment with any hit is rejected and a different segment chosen; frames are not edited.

Record every cleared clip in `.superpowers/sdd/redaction-signoff.md` with the video id, the timecodes, and the confirmation that the scan returned no hits.

Then run the budget test again; it is now meaningful.

```bash
cd web && pnpm exec vitest run scripts/__tests__/clips.test.ts
```

Expected: PASS with real files present.

- [ ] **Step 5: Commit**

```bash
git add web/scripts/clips.mjs web/scripts/__tests__/clips.test.ts web/public/product
git commit -m "T6: product clips with redaction sign-off and weight budget"
```

---

## Wave 3 — Diagram port (parallel, 5 agents)

Dispatch T7 to T11 together after Wave 0. They share `DiagramText`, which already exists with the `maxLines` bound.

**Shared procedure for every diagram task:**

1. Read the deck frame with Figma MCP: `get_metadata` then `get_design_context` on the node id your task names, then `get_screenshot` to see the target.
2. Never estimate a coordinate. The deck slides are **1920 wide**; the site content column is **1240**. Port geometry proportionally by deriving a viewBox from the frame's own bounds. Do not drop a 1920 viewBox into a 1240 container, which silently scales everything down; that was the cause of the previous parity defects.
3. Body copy goes through `DiagramText` with the source box width and a `maxLines` bound.
4. Correct banned names on port: the deck's `Aiden for DevOps` is **Aiden for Automation**; `InfraOps` is **Aiden for Infrastructure**.
5. Diagram plates set `data-ground="panel"` so the focus ring inverts.
6. Write this exact test first, substituting your component name. Geometry is read from Figma at execution time, which is why the plan gives you the contract rather than the coordinates.

```tsx
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { YourDiagram } from '../YourDiagram';

describe('YourDiagram', () => {
  it('exposes an accessible name through its title', () => {
    const { container } = render(<YourDiagram />);
    const svg = container.querySelector('svg')!;
    expect(svg).toHaveAttribute('role', 'img');
    const id = svg.getAttribute('aria-labelledby')!;
    expect(container.querySelector(`#${id}`)?.textContent).toBeTruthy();
  });

  it('describes the flow for screen readers', () => {
    const { container } = render(<YourDiagram />);
    expect(container.querySelector('desc')?.textContent?.length ?? 0).toBeGreaterThan(40);
  });

  it('carries motion hooks on every animatable part', () => {
    const { container } = render(<YourDiagram />);
    expect(container.querySelectorAll('[data-part]').length).toBeGreaterThan(2);
  });

  it('renders labels as real SVG text, never paths', () => {
    const { container } = render(<YourDiagram />);
    expect(container.querySelectorAll('text').length).toBeGreaterThan(0);
  });

  it('is no longer a stub', () => {
    const { container } = render(<YourDiagram />);
    expect(container.querySelector('[data-stub]')).toBeNull();
  });

  it('uses no banned product name', () => {
    const { container } = render(<YourDiagram />);
    const text = container.textContent ?? '';
    expect(text).not.toMatch(/Aiden for DevOps|InfraOps|Olly/);
  });

  it('bounds every wrapped block so translated copy cannot overflow its plate', () => {
    const { container } = render(<YourDiagram />);
    const wrapped = [...container.querySelectorAll('text')].filter(
      (t) => t.querySelectorAll('tspan').length > 1,
    );
    expect(wrapped.length).toBeGreaterThan(0);
    for (const t of wrapped) expect(t.querySelectorAll('tspan').length).toBeLessThanOrEqual(4);
  });
});
```

Run it, watch it fail, then port the geometry until it passes.

**Skills for all five:**
- `/Users/swami/.cursor/skills/epic-design/SKILL.md`
- `/Users/swami/.cursor/skills/a11y-audit/SKILL.md`
- `/Users/swami/.cursor/skills/impeccable/reference/craft-floor.md`
- superpowers:test-driven-development

| Task | Component | Deck slide | Figma node | Replaces |
|---|---|---|---|---|
| **T7** | `ProblemDiagram.tsx` | 1 | `1:7514` | Current ProblemDiagram |
| **T8** | `AdfLifecycleDiagram.tsx` | 12 | `1:13727` | `AdfLoopDiagram` and `FactoryProcessDiagram` |
| **T9** | `OperationalContextGraph.tsx` | 7 | `1:7929` | Current OCG, both variants, 2 importers |
| **T10** | `AidenOsDiagram.tsx` | 11 | `1:8708` | `AidenOsLinksDiagram` |
| **T11** | `product/*Mechanism.tsx` | 8, 9, 10 | `1:8055`, `1:14411`, `1:8591` | SRE, Automation, Infrastructure mechanisms |

**T11 note:** `ObservabilityMechanism` has no deck source. Keep the existing SVG and restyle it to the plate language; do not invent a deck diagram for it.

**T9 note:** run the Torbit importer query first. The OCG has two importers, home and platform, and the `variant` prop must survive the port.

Each task commits as `T<N>: port <name> from deck slide <n>`.

---

## Wave 4 — Page assembly (parallel, 5 agents)

Depends on Waves 0, 0b, 1, 3. Dispatch T12, T13, T14, T15, T21 together.

**Skills for all four:**
- `/Users/swami/.cursor/skills/senior-frontend/SKILL.md`
- `/Users/swami/.cursor/skills/impeccable/reference/layout.md`
- `/Users/swami/.cursor/skills/impeccable/reference/craft-floor.md`
- superpowers:test-driven-development

### Task 12: Home, sections 1 to 8

**Files:** `web/app/page.tsx`, `web/components/sections/home/Hero.tsx`, `Logos.tsx`, `Problem.tsx`, `Mechanism.tsx`, plus new `Surfaces.tsx`; tests for each.

Sections: hero with prompt line and a clip, logo wall with framing sentence, the gap as a `StatBand`, surfaces `01–04` with clips, Tirith policy gate, ADF lifecycle, Operational Context Graph, integrations.

### Task 13: Home, sections 9 to 16

**Files:** new `FeaturedCase.tsx`, `IndustryGrid.tsx`, `UseCases.tsx`, `MomentumBand.tsx`, modify `InTheirWords.tsx`, `Compliance.tsx`, `FinalCta.tsx`; tests for each.

The featured case pairs `VideoFigure` with `V0zsWdJz2rs` against the published greytHR quote. The industry grid renders `industries` from T5 and links to real pages built in T15.

### Task 14: Product template

**Files:** `web/components/sections/product/*`, `web/app/product/[slug]/page.tsx`; tests.

Seven sections per spec 5.2. The hero carries `PromptLine`. The testimonial renders only where a published quote exists, which today is Observability alone.

### Task 15: Platform and industry pages

**Files:** `web/components/sections/platform/*`, `web/app/platform/page.tsx`, new `web/app/industries/[slug]/page.tsx`, new `web/components/sections/industry/*`; tests.

Industry pages are compact: hero, the evidence, the close. `generateStaticParams` reads `industries` so a vertical without evidence produces no route.

---

### Task 21: Interface states and the 404

Covers spec 3.9, which no other task owns. An unknown route currently renders the framework default and breaks the world.

**Skills:**
- `/Users/swami/.cursor/skills/impeccable/reference/harden.md`
- `/Users/swami/.cursor/skills/a11y-audit/SKILL.md`
- superpowers:test-driven-development

**Files:**
- Create: `web/app/not-found.tsx`
- Create: `web/app/__tests__/not-found.test.tsx`
- Modify: `web/components/sections/demo/DemoForm.tsx` and its test

- [ ] **Step 1: Write the failing tests**

`web/app/__tests__/not-found.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import NotFound from '../not-found';

describe('404', () => {
  it('explains what happened in one sentence', () => {
    render(<NotFound />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('always offers a route back home', () => {
    render(<NotFound />);
    expect(screen.getByRole('link', { name: /home/i })).toHaveAttribute('href', '/');
  });
});
```

Append to `web/components/sections/demo/__tests__/DemoForm.test.tsx`:

```tsx
it('cannot be submitted twice', async () => {
  const user = userEvent.setup();
  render(<DemoForm />);
  await user.type(screen.getByLabelText('Work email'), 'dana@example.com');
  const submit = screen.getByRole('button', { name: /request demo/i });
  await user.click(submit);
  expect(submit).toBeDisabled();
});
```

- [ ] **Step 2: Run and watch them fail**

```bash
cd web && pnpm exec vitest run app/__tests__/not-found.test.tsx components/sections/demo
```

Expected: FAIL, `not-found` module missing and the submit button stays enabled.

- [ ] **Step 3: Implement**

`web/app/not-found.tsx` renders `Nav`, a single `h1`, one sentence, a link to `/`, and `Footer`, inside the cream ground. In `DemoForm`, add a `sending` state that disables the submit button and swaps its label to `Sending`, then resolves to the existing prototype notice.

- [ ] **Step 4: Run and watch them pass**

```bash
cd web && pnpm exec vitest run app components/sections/demo && pnpm typecheck && pnpm build
```

Expected: PASS, and the build lists the `/_not-found` route.

- [ ] **Step 5: Commit**

```bash
git add web/app/not-found.tsx web/app/__tests__/not-found.test.tsx web/components/sections/demo
git commit -m "T21: branded 404 and guarded form states"
```


---

## Wave 5 — Verification (parallel, 2 read-only agents)

### Task 16: Accessibility and colour verification

**Skills:** `/Users/swami/.cursor/skills/a11y-audit/SKILL.md`, `/Users/swami/.cursor/skills/accessibility-tester/SKILL.md`

Run `pnpm exec playwright test e2e/a11y.spec.ts` across all routes. Regenerate the contrast matrix against shipped tokens. Verify reduced motion: no clip autoplays, every poster is visible, `Reveal` content is present. Verify no status is colour-only. Write `.superpowers/sdd/factory-a11y-report.md`. Report only; fixes belong to T18.

### Task 17: Craft and layout verification

**Skills:** `/Users/swami/.cursor/skills/impeccable/reference/audit.md`, `/Users/swami/.cursor/skills/ui-ux-tester/SKILL.md`

Run `node e2e/diagnose.mjs` for overlaps, overflow and dark-on-dark. Run `node /Users/swami/.cursor/skills/impeccable/scripts/detect.mjs --json` over changed targets. Capture desktop screenshots into `.impeccable/review/`. Apply the squint test per page. Measure CLS across the font swap. Write `.superpowers/sdd/factory-craft-report.md`.

---

## Wave 6 — Close out (serial)

### Task 18: Batched fixes

Runs alone. The only task permitted to edit files owned by other tasks, and only those named in the two Wave 5 reports. Order: a11y Critical, craft Critical, a11y Major, craft Major. One batch, then verify once. Commit as `T18: batched accessibility and craft fixes`.

### Task 19: Documentation and finish

Write the direction contract into `web/app/layout.tsx` as an HTML comment in the emitted markup, five blocks per spec 12. Spawn `impeccable-finish-reviewer` with the artifact paths, screenshots, contract and detector findings; act on its disposition word. Then spawn `impeccable-documenter` to write `DESIGN.md` from the built world. Update `web/README.md` and `docs/superpowers/wave1-deviations.md`. Commit as `T19: direction contract, DESIGN.md and deviation log`.

---

## Task index

| Wave | Tasks | Parallel | Depends on |
|---|---|---|---|
| 0 | T1 tokens | serial | — |
| 0b | T2 motion | serial | T1 |
| 1 | T3 media, T4 primitives, T5 content, T20 chrome | 4 | T1, T2 |
| 2 | T6 clips | 1, concurrent with Wave 1 | `redaction.ts`, already built |
| 3 | T7–T11 diagrams | 5 | T1 |
| 4 | T12–T15 pages, T21 states | 5 | Waves 0, 0b, 1, 2, 3 |
| 5 | T16 a11y, T17 craft | 2, read-only | Wave 4 |
| 6 | T18 fixes, T19 docs | serial | Wave 5 |

Twenty-one tasks. Peak parallelism five.

**Why T2 is not in Wave 1.** `ProductClip` and `Marquee` both import `useReducedMotion`, which T2 creates. Running them beside T2 would fail on a missing module, so motion is serialised ahead of the wave that consumes it.

## Spec coverage

| Spec section | Task |
|---|---|
| 3.1 Palette, 3.2 Contrast | T1, verified T16 |
| 3.2.1 Colour vision | Global Constraint 6, verified T16 |
| 3.3 Typography, font loading | T1, measure applied in T12–T15 |
| 3.4 Material inventory | T3 `ProductFrame`, T7–T11 |
| 3.5 Form, spacing, grid | T1 |
| 3.5.1 Interaction states | T20 |
| 3.6 Motion | T2 |
| 3.7 Logo | T20 |
| 3.8 Calibration self-check | Process, audited at T19 finish review |
| 3.9 Interface states, 404 | T21 |
| 3.10 Resilience | `DiagramText` bound already shipped; applied T7–T11 |
| 4 Content system | T5, enforced by governance test |
| 5.1 Home | T12, T13 |
| 5.2 Product pages | T14 |
| 5.3 Platform, industries | T15 |
| 5.4 Case study depth | Recorded gap, no task by design |
| 6 Diagram port | T7–T11 |
| 7 Proof pipeline | T6 |
| 8 Component inventory | T3, T4, T20, T21 |
| 11 Verification | T16, T17 |
| 12 Process contract | T19 |
