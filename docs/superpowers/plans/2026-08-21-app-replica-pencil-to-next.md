# App Replica → Next.js Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a desktop-only (1440), pixel-fidelity Next.js App Router port of all 18 App Replica frames in `Stack_Linear.pen` (9 pages × light/dark via `data-theme`), served from Docker compose `prod` on `http://localhost:3000`.

**Architecture:** Fresh scaffold in `web/`. Pencil themed `ds-*` variables map to CSS custom properties under `:root` / `[data-theme="dark"]`. One React tree per route; theme swaps tokens only. Copy and section order extracted from App Replica frames only — never invent. Shared Nav/Footer/primitives; page sections under `components/sections/*`; typed content modules under `content/*`.

**Tech Stack:** Next.js ~16.3 · React ~19.2 · TypeScript · Tailwind CSS v4 · pnpm · Vitest (smoke) · Docker multi-stage `node:24-alpine` · Pencil MCP Path B (`execute` / `get_app_state` / `get_guidelines`)

**Spec:** `docs/superpowers/specs/2026-08-21-app-replica-pencil-to-next-design.md`

## Global Constraints

1. **Source of truth:** App Replica frames in `Stack_Linear.pen` only. Do not invent copy, metrics, logos, sections, or mobile layouts.
2. **Never modify** `Stack_Linear.pen`. Pencil MCP = read-only (`Get`, `Print`, `TakeScreenshot`, `Export`).
3. **Routes:** `/`, `/product/aiden-for-infrastructure`, `/product/aiden-for-automation`, `/product/aiden-for-observability`, `/product/aiden-for-sre`, `/platform`, `/enterprise`, `/pricing`, `/news`.
4. **Theme:** `data-theme="light"|"dark"` on `<html>`; default `light`; persist `localStorage` key `stackgen-theme`.
5. **Nav hrefs:** Logo `/`; Product → `/product/aiden-for-infrastructure`; Platform `/platform`; Enterprise `/enterprise`; Pricing `/pricing`; News `/news`; Company `#`; Login `#`; Schedule demo → canvas destination or `#`.
6. **Viewport:** `min-width: 1440px` on page shell; no invented responsive breakpoints.
7. **Docker:** implement `web/Dockerfile` for existing root `docker-compose.yml` profile **`prod`** only.
8. **Keep** existing `web/public/media/**` assets.
9. **Server Components by default**; `'use client'` only for ThemeProvider/ThemeToggle and genuine interaction.
10. **Commits:** only when the human asks; plan steps may stage logical checkpoints without forcing `git commit`.
11. **FOUC prevention:** use static file `web/public/theme-init.js` loaded with `next/script` `strategy="beforeInteractive"` — never inject HTML strings into the document.

---

## File map (create unless noted)

| Path | Responsibility |
|---|---|
| `web/package.json`, `pnpm-lock.yaml`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `.npmrc`, `.dockerignore` | Toolchain |
| `web/Dockerfile` | Multi-stage prod image (`deps` → `builder` → `runner`) |
| `web/public/theme-init.js` | Pre-hydration theme from localStorage |
| `web/app/globals.css` | Tailwind + `ds-*` light/dark tokens |
| `web/app/layout.tsx` | Fonts, ThemeProvider, Script |
| `web/app/page.tsx` | Home |
| `web/app/product/[slug]/page.tsx` | Four product pages |
| `web/app/platform/page.tsx` | Platform |
| `web/app/enterprise/page.tsx` | Enterprise |
| `web/app/pricing/page.tsx` | Pricing |
| `web/app/news/page.tsx` | News |
| `web/lib/cn.ts` | `cn(...inputs)` |
| `web/lib/nav.ts` | `NAV_ITEMS`, `PRIMARY_CTA`, product slugs |
| `web/lib/theme.ts` | `Theme` type, storage key |
| `web/lib/products.ts` | Product slug union + frame IDs |
| `web/components/layout/ThemeProvider.tsx` | Client theme state |
| `web/components/layout/ThemeToggle.tsx` | Light/dark control |
| `web/components/layout/Nav.tsx` | Desktop nav |
| `web/components/layout/Footer.tsx` | Footer |
| `web/components/primitives/*` | Logo, ButtonPrimary, ButtonGhost, MonoLabel, SectionShell |
| `web/components/sections/{home,product,platform,enterprise,pricing,news}/*` | Section components |
| `web/content/{home,products,platform,enterprise,pricing,news}.ts` | Extracted copy |
| `web/vitest.config.ts`, `web/vitest.setup.ts` | Smoke tests |
| `web/README.md` | Run instructions |

---

### Task 1: Scaffold + tokens + theme + Docker

**Files:**
- Create: `web/package.json`, `web/.npmrc`, `web/tsconfig.json`, `web/next.config.ts`, `web/postcss.config.mjs`, `web/Dockerfile`, `web/.dockerignore`, `web/public/theme-init.js`, `web/app/globals.css`, `web/app/layout.tsx`, `web/app/page.tsx`, `web/lib/cn.ts`, `web/lib/theme.ts`, `web/components/layout/ThemeProvider.tsx`, `web/components/layout/ThemeToggle.tsx`, `web/vitest.config.ts`, `web/vitest.setup.ts`, `web/__tests__/theme.test.tsx`, `web/README.md`
- Preserve: `web/public/media/**`

**Interfaces:**
- Produces: `cn(...inputs: ClassValue[]): string`
- Produces: `export type Theme = "light" | "dark"`; `STORAGE_KEY = "stackgen-theme"`
- Produces: `ThemeProvider({ children }: { children: React.ReactNode })`; `useTheme(): { theme: Theme; setTheme: (t: Theme) => void; toggle: () => void }`
- Produces CSS vars: `--color-bg`, `--color-surface`, `--color-surface-raised`, `--color-border`, `--color-text-primary`, `--color-text-secondary`, `--color-text-tertiary`, `--color-accent`, `--color-accent-text`, `--color-on-accent`, `--color-pass`, `--color-halt`, `--font-sans`, `--font-mono`, `--radius-sm|md|lg`, `--spacing-pad-x`, `--spacing-pad-y`

- [ ] **Step 1: Write failing theme smoke test**

Create `web/__tests__/theme.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

test("toggle sets data-theme on documentElement", async () => {
  document.documentElement.dataset.theme = "light";
  const user = userEvent.setup();
  render(
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>,
  );
  await user.click(screen.getByRole("button", { name: /theme|dark|light/i }));
  expect(document.documentElement.dataset.theme).toBe("dark");
});
```

- [ ] **Step 2: Run test — expect fail (modules missing)**

```bash
cd web && pnpm test
```

Expected: FAIL resolving ThemeProvider or missing test script.

- [ ] **Step 3: Create package.json and toolchain**

`web/package.json`:

```json
{
  "name": "stackgen-web",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "next dev --port 3000 --hostname 0.0.0.0",
    "build": "next build",
    "start": "node server.js",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "clsx": "^2.1.1",
    "next": "~16.3.1",
    "react": "~19.2.8",
    "react-dom": "~19.2.8"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.3.3",
    "@testing-library/jest-dom": "^7.0.1",
    "@testing-library/react": "^16.3.2",
    "@testing-library/user-event": "^14.6.5",
    "@types/node": "^26.2.0",
    "@types/react": "^19.2.18",
    "@types/react-dom": "^19.2.4",
    "@vitejs/plugin-react": "^6.0.5",
    "jsdom": "^30.0.1",
    "postcss": "^8.5.26",
    "tailwindcss": "^4.3.3",
    "typescript": "^5.9.0",
    "vitest": "^4.1.11"
  }
}
```

`web/.npmrc`:

```
shamefully-hoist=true
```

`web/tsconfig.json` — Next App Router defaults with `"paths": { "@/*": ["./*"] }`.

`web/next.config.ts`:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
};

export default nextConfig;
```

`web/postcss.config.mjs`:

```js
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

`web/vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, ".") },
  },
});
```

`web/vitest.setup.ts`:

```ts
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 4: Map `ds-*` tokens into globals.css**

Read variables via Pencil:

```js
Print(GetVariables())
```

Write `web/app/globals.css` with light defaults from `ds-*` `theme.mode=light` and dark overrides under `[data-theme="dark"]`. Exact hex values must come from `GetVariables()` (do not hardcode from memory). Required shape:

```css
@import "tailwindcss";

@theme {
  --color-bg: var(--ds-bg);
  --color-surface: var(--ds-surface);
  --color-surface-raised: var(--ds-surface-raised);
  --color-border: var(--ds-border);
  --color-text-primary: var(--ds-text-primary);
  --color-text-secondary: var(--ds-text-secondary);
  --color-text-tertiary: var(--ds-text-tertiary);
  --color-accent: var(--ds-accent);
  --color-accent-text: var(--ds-accent-text);
  --color-on-accent: var(--ds-on-accent);
  --color-pass: var(--ds-pass);
  --color-halt: var(--ds-halt);
  --font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
  --font-mono: var(--font-jetbrains), ui-monospace, monospace;
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --spacing-pad-x: 96px;
  --spacing-pad-y: 96px;
}

:root,
[data-theme="light"] {
  /* paste light ds-* values from GetVariables() */
}

[data-theme="dark"] {
  /* paste dark ds-* values from GetVariables() */
}

@layer base {
  html {
    background: var(--color-bg);
    color: var(--color-text-primary);
    min-width: 1440px;
  }
  body {
    font-family: var(--font-sans);
    margin: 0;
  }
}
```

- [ ] **Step 5: Theme init script + helpers + provider + toggle**

`web/public/theme-init.js` (static, trusted first-party):

```js
(function () {
  try {
    var t = localStorage.getItem("stackgen-theme");
    document.documentElement.dataset.theme =
      t === "light" || t === "dark" ? t : "light";
  } catch (e) {
    document.documentElement.dataset.theme = "light";
  }
})();
```

`web/lib/cn.ts`:

```ts
import { clsx, type ClassValue } from "clsx";
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
```

`web/lib/theme.ts`:

```ts
export type Theme = "light" | "dark";
export const STORAGE_KEY = "stackgen-theme";
```

`ThemeProvider.tsx` — `'use client'`; sync `document.documentElement.dataset.theme` + `localStorage`; export `useTheme`.

`ThemeToggle.tsx` — `aria-label="Toggle color theme"` button calling `toggle()`.

- [ ] **Step 6: Root layout + stub home**

`web/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import Script from "next/script";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = { title: "StackGen" };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrains.variable}`}>
        <Script src="/theme-init.js" strategy="beforeInteractive" />
        <ThemeProvider>
          <ThemeToggle />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

`web/app/page.tsx` stub:

```tsx
export default function HomePage() {
  return (
    <main className="min-h-screen bg-bg text-text-primary p-[var(--spacing-pad-x)]">
      <h1 className="text-2xl font-semibold">StackGen</h1>
      <p className="text-text-secondary">App Replica scaffold</p>
    </main>
  );
}
```

- [ ] **Step 7: Dockerfile + ignore**

Use multi-stage pattern from `.worktrees/factory-experience/web/Dockerfile` (stages `base` / `deps` / `builder` / `runner`). `.dockerignore`:

```
node_modules
.next
.git
**/*.test.tsx
**/__tests__
```

- [ ] **Step 8: Install, test, typecheck, docker smoke**

```bash
cd web && corepack enable && pnpm install
pnpm test
pnpm typecheck
pnpm build
cd .. && docker compose --profile prod up --build -d
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/
docker compose --profile prod down
```

Expected: tests PASS; typecheck PASS; build PASS; curl `200`.

- [ ] **Step 9: Checkpoint** — Task 1 complete (commit only if human requests).

---

### Task 2: Nav, Footer, primitives, nav config

**Files:**
- Create: `web/lib/nav.ts`, `web/lib/products.ts`, `web/components/primitives/Logo.tsx`, `web/components/primitives/ButtonPrimary.tsx`, `web/components/primitives/ButtonGhost.tsx`, `web/components/primitives/MonoLabel.tsx`, `web/components/primitives/SectionShell.tsx`, `web/components/layout/Nav.tsx`, `web/components/layout/Footer.tsx`, `web/__tests__/nav.test.tsx`
- Modify: `web/app/layout.tsx` — remove standalone ThemeToggle; Nav owns toggle placement

**Interfaces:**
- Consumes: `cn`, `ThemeToggle`, theme tokens
- Produces:

```ts
export const PRODUCT_SLUGS = [
  "aiden-for-infrastructure",
  "aiden-for-automation",
  "aiden-for-observability",
  "aiden-for-sre",
] as const;
export type ProductSlug = (typeof PRODUCT_SLUGS)[number];
export function isProductSlug(s: string): s is ProductSlug;

export type NavItem = { label: string; href: string };
export const NAV_ITEMS: NavItem[];
export const PRIMARY_CTA: { label: "Schedule demo"; href: string };
export const LOGIN_ITEM: { label: "Login"; href: "#" };
```

- Produces: `Logo`, `ButtonPrimary`, `ButtonGhost`, `MonoLabel`, `SectionShell`, `Nav`, `Footer({ columns })` (columns from page content later — no invented footer links in Task 2 defaults beyond empty array).

- [ ] **Step 1: Failing nav test**

```tsx
import { render, screen } from "@testing-library/react";
import { Nav } from "@/components/layout/Nav";
import { ThemeProvider } from "@/components/layout/ThemeProvider";

test("nav exposes canvas labels", () => {
  render(
    <ThemeProvider>
      <Nav />
    </ThemeProvider>,
  );
  for (const label of [
    "Product",
    "Platform",
    "Enterprise",
    "Pricing",
    "News",
    "Company",
    "Login",
    "Schedule demo",
  ]) {
    expect(screen.getByText(label)).toBeInTheDocument();
  }
});
```

- [ ] **Step 2: Run — expect fail**

```bash
cd web && pnpm test
```

- [ ] **Step 3: Extract Logo path data**

```js
Get("mF7lt", { depth: 5 })
```

Port SVG paths into `Logo.tsx`.

- [ ] **Step 4: Implement nav.ts, products.ts, primitives, Nav, Footer**

Nav: horizontal ~60px height; pad from replica; `ThemeToggle` in actions with comment `/* intentional: dual-mode requirement */`. Product href `/product/aiden-for-infrastructure`.

- [ ] **Step 5: Wire Nav into pages via layout or per-page; remove Task 1 floating toggle from layout**

- [ ] **Step 6: `pnpm test && pnpm typecheck` — PASS**

---

### Task 3: Home content extraction

**Files:**
- Create: `web/content/home.ts`, `web/__tests__/home-content.test.ts`

**Interfaces:**
- Produces default export `home` with keys: `hero`, `logos`, `surfaces`, `mechanism`, `problem`, `factoryProcess`, `adfLoop`, `agenticOs`, `ocg`, `integrations`, `inTheirWords`, `industries`, `compliance`, `useCases`, `finalCta`

**Extraction procedure (binding for Tasks 3–7):**

1. `Get("<frameId>", (n) => n.type === "text" && Print(n.id, n.content))`
2. Map by depth-1 section frame name.
3. For image/video fills, resolve `fill.url` into `web/public/` (prefer existing `web/public/media/**`).
4. Never paraphrase.

- [ ] **Step 1: Failing test**

```ts
import home from "@/content/home";

test("home hero has heading and body", () => {
  expect(home.hero.heading.length).toBeGreaterThan(0);
  expect(home.hero.body.length).toBeGreaterThan(0);
});
```

- [ ] **Step 2: Extract from `nwYaY`; write `content/home.ts`**
- [ ] **Step 3: `pnpm test` — PASS**

---

### Task 4: Home page sections

**Files:**
- Create: `web/components/sections/home/Hero.tsx`, `Logos.tsx`, `Surfaces.tsx`, `Mechanism.tsx`, `Problem.tsx`, `FactoryProcess.tsx`, `AdfLoop.tsx`, `AgenticOs.tsx`, `OperationalContextGraph.tsx`, `Integrations.tsx`, `InTheirWords.tsx`, `Industries.tsx`, `Compliance.tsx`, `UseCases.tsx`, `FinalCta.tsx`
- Modify: `web/app/page.tsx`

**Interfaces:**
- Each section imports `home` from `@/content/home` and renders that slice only.

- [ ] **Step 1: Implement each depth-1 section under `nwYaY` via `Get(id, { depth: 4 })`**
- [ ] **Step 2: Compose `app/page.tsx` in spec §5 order with `<Nav />` first**
- [ ] **Step 3: Screenshot QA — `TakeScreenshot(["nwYaY"])` vs `/` light; dark vs `y1kHUi`**
- [ ] **Step 4: `pnpm build` — PASS**

---

### Task 5: Product pages (4 slugs)

**Files:**
- Create: `web/content/products.ts`, `web/components/sections/product/Hero.tsx`, `Metrics.tsx`, `KeyCapabilities.tsx`, `Mechanism.tsx`, `EarlyAccessStrip.tsx`, `Testimonial.tsx`, `FinalCta.tsx`, `web/app/product/[slug]/page.tsx`, `web/__tests__/products.test.ts`

**Interfaces:**

```ts
export type ProductContent = {
  slug: ProductSlug;
  frameLight: string;
  frameDark: string;
  hero: { heading: string; body: string; /* canvas fields */ };
  metrics: { value: string; label: string }[];
  capabilities: { title: string; body: string }[];
  mechanism: Record<string, string>;
  earlyAccess?: Record<string, string>;
  testimonial: Record<string, string>;
  finalCta: { heading: string; ctaLabel: string; href: string };
  footer: { columns: { title: string; links: { label: string; href: string }[] }[] };
};
export const products: Record<ProductSlug, ProductContent>;
```

| slug | light | dark |
|---|---|---|
| aiden-for-infrastructure | `qwI1S` | `GGu5s` |
| aiden-for-automation | `llzpJ` | `ZjYRz` |
| aiden-for-observability | `JQkAE` | `VB4gY` |
| aiden-for-sre | `TIh4G` | `Q6ZkwE` |

- [ ] **Step 1: Test**

```ts
import { isProductSlug } from "@/lib/products";
test("rejects unknown", () => expect(isProductSlug("nope")).toBe(false));
```

- [ ] **Step 2: Extract four product frames into `content/products.ts`**
- [ ] **Step 3: Shared sections; render `EarlyAccessStrip` only when `earlyAccess` is defined**
- [ ] **Step 4: `product/[slug]/page.tsx` with `await params`, `notFound()` for bad slug**
- [ ] **Step 5: Build + spot-check four routes light/dark**

---

### Task 6: Platform page

**Files:**
- Create: `web/content/platform.ts`, sections under `web/components/sections/platform/`, `web/app/platform/page.tsx`

**Frame IDs:** light `kQPf7`, dark `ueTsZ`

- [ ] **Step 1: Extract from `kQPf7`**
- [ ] **Step 2: Implement sections + Footer (`X5I1cB`)**
- [ ] **Step 3: Aiden OS product links use the four `/product/...` hrefs**
- [ ] **Step 4: `pnpm build` + screenshot vs `kQPf7` / `ueTsZ`**

---

### Task 7: Enterprise + Pricing + News

**Files:**
- Create: `web/content/enterprise.ts`, `web/content/pricing.ts`, `web/content/news.ts`, sections under `components/sections/{enterprise,pricing,news}/`, `app/enterprise/page.tsx`, `app/pricing/page.tsx`, `app/news/page.tsx`

| page | light | dark |
|---|---|---|
| enterprise | `o8Fqkk` | `R08yJ` |
| pricing | `V8R69l` | `xLEsu` |
| news | `o303yj` | `TtoXl` |

- [ ] **Step 1: Enterprise full stack**
- [ ] **Step 2: Pricing — Public Web Rules + FAQ exact**
- [ ] **Step 3: News — Placeholder Items stay placeholders**
- [ ] **Step 4: `pnpm build` + smoke `/enterprise` `/pricing` `/news`**

---

### Task 8: Fidelity QA + Docker prod demo

**Files:**
- Create: `docs/superpowers/specs/2026-08-21-app-replica-parity-notes.md`
- Modify: `web/README.md`

- [ ] **Step 1: Screenshot all 9 light frames vs browser at 1440**
- [ ] **Step 2: Screenshot all 9 dark frames with `data-theme=dark`**
- [ ] **Step 3: Token spot-check from spec §9**
- [ ] **Step 4: Cold Docker**

```bash
docker compose --profile prod down
docker compose --profile prod up --build -d
for p in / /platform /enterprise /pricing /news \
  /product/aiden-for-infrastructure /product/aiden-for-automation \
  /product/aiden-for-observability /product/aiden-for-sre; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000$p")
  echo "$p $code"
done
```

Expected: every path `200`.

- [ ] **Step 5: Parity notes + README with:**

```bash
docker compose --profile prod up --build
# open http://localhost:3000
```

---

## Self-review (plan vs spec)

| Spec requirement | Task |
|---|---|
| All 18 frames / 9 routes | T4–T7 |
| Fresh `web/` + keep media | T1 |
| `data-theme` + toggle + localStorage | T1–T2 |
| Docker prod :3000 | T1, T8 |
| Desktop 1440 only | T1 `min-width` |
| Nav href table | T2 |
| Section inventories | T4–T7 |
| No invented copy / News placeholders | T3, T7 |
| Company/Login `#` | T2 |
| Fidelity QA | T8 |
| Do not edit `.pen` | Global |

**Placeholder scan:** token hex filled live from `GetVariables()` in Task 1. FOUC uses static `theme-init.js` (no HTML string injection).

**Type consistency:** `ProductSlug`, `Theme`, `NAV_ITEMS`, content shapes align T2–T5.

---

## Execution handoff

Plan complete and saved to `docs/superpowers/plans/2026-08-21-app-replica-pencil-to-next.md`.

**Two execution options:**

1. **Subagent-Driven (recommended)** — fresh subagent per task, review between tasks
2. **Inline Execution** — execute tasks in this session with checkpoints

Which approach?
