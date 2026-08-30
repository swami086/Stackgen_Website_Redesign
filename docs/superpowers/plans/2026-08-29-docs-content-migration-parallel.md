# Docs Content Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use **dispatching-parallel-agents** within each wave. Every implementer subagent MUST use model **`composer-2.5-fast`** (Composer 2.5). Do not use sequential SDD for cluster builds.
>
> Steps use checkbox (`- [ ]`) syntax. Controllers dispatch **all agents in a wave in one message**.
>
> ### Model selection (mandatory)
>
> | Job type | Model slug | When to use |
> |---|---|---|
> | **Code execution** | `composer-2.5-fast` | All waves. Import scripts, markdown pipeline, docs shell, cluster cleanup, SEO, Vitest, Playwright, Docker |
>
> Controller gates (`cd web && pnpm typecheck && pnpm test`) run in the parent session between waves. Do not invent a second model.

**Goal:** Ship every live page from [docs.stackgen.com](https://docs.stackgen.com/) as a first-party `/docs` section on the Next.js marketing site, with the existing replica chrome, dual theme, and internal links rewritten to the new tree.

**Architecture:** Firecrawl corpus in `.firecrawl/docs.stackgen.com/**/index.md` is imported once into `web/content/docs/{product}/**/page.md`. A catch-all App Router route `web/app/docs/[[...slug]]/page.tsx` loads markdown at request/build time. Product hubs live at `/docs`, `/docs/stackgen`, `/docs/aiden`, `/docs/observenow`. Wave 0 ships a working site from raw corpus. Wave 1 agents repair clusters in parallel without touching loaders.

**Tech Stack:** Next.js ~16.3 (App Router, `await params`) · React ~19.2 · TypeScript · Tailwind v4 · pnpm · Vitest · Playwright · `gray-matter` · `react-markdown` · `remark-gfm` · Firecrawl CLI v1.16 · Docker standalone

**Corpus (already mapped + downloading):** 422 URLs on docs.stackgen.com (Docusaurus v3.10.2). Import 417 pages. Skip `/search`, `/blog`, `/markdown-page`, `/docs/category/*`. Firecrawl download writes `.firecrawl/docs.stackgen.com/{path}/index.md` (gitignored). Imported markdown is committed under `web/content/docs/`.

**Torbit:** Indexed `Stackgen_Website_Redesign` @ `homepage-p0`. Current app is homepage-only: `web/app/page.tsx` + `web/components/replica/**`. No existing docs route. Nav already has a Docs item pointed at `#` in `web/content/replica.ts`.

---

## Global Constraints

Every task's requirements implicitly include this section.

1. **Never modify** `Stack_Linear.pen`. Pencil is read-only.
2. **Never edit a file that is not in your task's `Files` block.** Report a needed change instead.
3. **Do not commit** unless the human asks. Leave a clean working tree of your owned files.
4. **Do not push.**
5. **Imported body copy is verbatim** from Firecrawl markdown after chrome-stripping. Do not rewrite product docs to marketing voice. Do not run the homepage em-dash / Olly / InfraOps bans against `web/content/docs/**`.
6. **Chrome/UI strings** (hub cards, sidebar labels you invent, search placeholder, empty states) follow the marketing bans: no em-dash, no en-dash, no Olly, no InfraOps, no "single pane of glass".
7. **URL map is locked** (see below). Do not invent a fourth product namespace.
8. **Aiden 2.0 pages 403 without a trailing slash.** Import and any re-scrape MUST request `.../` and `--wait-for 2500`.
9. **`html { min-width: 1440px }` stays for marketing pages.** Docs routes opt out via `html:has([data-docs-root]) { min-width: 0; }`. Do not remove the homepage rule.
10. **Reuse replica chrome.** Docs layout mounts `ReplicaNav` + `ReplicaFooter`. Do not fork a second logo or CTA.
11. **Tailwind preset classes only** in new components. No static arbitrary bracket sizes. CSS variables in brackets (`bg-[var(--x)]`) are allowed.
12. **Icon family is Phosphor.** `book-open` and `magnifying-glass` already exist in `web/lib/phosphor-icons.ts`.
13. **No new docs engine** (no Fumadocs, no Nextra, no Docusaurus submodule, no Algolia). Markdown files + catch-all route.
14. **`pnpm add` only these:** `gray-matter` `react-markdown` `remark-gfm`.
15. **Images stay remote** on `docs.stackgen.com` for v1. Add `images.remotePatterns`. Do not download the image CDN in this plan.
16. **Desktop-first, but docs must be readable below 1440.** Sidebar stacks under `lg`. Do not add a new design system.
17. **Next 16 `params` are a Promise.** Always `const { slug } = await params`.
18. **Model:** `composer-2.5-fast` for every implementer.

---

## Locked URL map

| Source on docs.stackgen.com | Dest on this site | Count |
|---|---|---|
| `/` | `/docs` (React hub, not markdown) | 1 |
| `/docs` | `/docs/stackgen` | 1 |
| `/docs/{rest}` | `/docs/stackgen/{rest}` | 224 |
| `/aiden` | `/docs/aiden` | 1 |
| `/aiden/{rest}` | `/docs/aiden/{rest}` | 103 |
| `/observenow` | `/docs/observenow` | 1 |
| `/observenow/{rest}` | `/docs/observenow/{rest}` | 86 |
| `/search`, `/blog`, `/markdown-page`, `/docs/category/*` | skip | 5 |

Unversioned `/aiden/integrations/*` (no `1.0`/`2.0`) import as their own slugs AND add a redirect in `web/content/docs/redirects.json` to the `1.0` twin when that twin exists.

Canonicalize trailing slashes: `/aiden/2.0/` and `/aiden/2.0` are one page.

---

## File Structure

| Path | Owner | Responsibility |
|---|---|---|
| `.firecrawl/docs.stackgen.com/**/index.md` | W0 (read-only corpus) | Firecrawl download output. Gitignored. |
| `web/scripts/import-docs.mjs` | W0 | Strip chrome, rewrite links, write `page.md` + manifest + nav.json |
| `web/lib/docs/paths.ts` | W0 | Source path to dest slug. Single source of truth. |
| `web/lib/docs/load.ts` | W0 | Read `page.md`, parse frontmatter, list slugs |
| `web/lib/docs/nav.ts` | W0 | Load `nav.json` |
| `web/content/docs/hub.ts` | W0 | Hub card copy harvested from the live docs homepage |
| `web/content/docs/manifest.json` | W0 generate / W1 patch status | Per-page import status |
| `web/content/docs/nav.json` | W0 generate | Sidebar tree |
| `web/content/docs/redirects.json` | W0 generate / W1C fill aliases | Internal aliases |
| `web/content/docs/stackgen/**/page.md` | W0 generate / W1A+W1B+W1E repair | StackGen platform docs |
| `web/content/docs/aiden/**/page.md` | W0 generate / W1C repair | Aiden 1.0 + 2.0 |
| `web/content/docs/observenow/**/page.md` | W0 generate / W1D repair | ObserveNow |
| `web/components/docs/DocsShell.tsx` | W0 | `data-docs-root` wrapper + replica nav/footer |
| `web/components/docs/DocsMarkdown.tsx` | W0 | `react-markdown` + GFM + link rewrite |
| `web/components/docs/DocsSidebar.tsx` | W2A | Tree nav from `nav.json` |
| `web/components/docs/DocsToc.tsx` | W2A | In-page heading list |
| `web/components/docs/DocsSearch.tsx` | W2B | Client filter over nav titles |
| `web/app/docs/layout.tsx` | W0 | Docs chrome |
| `web/app/docs/page.tsx` | W0 | Product picker hub |
| `web/app/docs/[[...slug]]/page.tsx` | W0 | Article + product hubs |
| `web/app/sitemap.ts` | W3 | `/` plus every docs href |
| `web/next.config.ts` | W0 | remotePatterns |
| `web/package.json` | W0 | Three deps |
| `web/app/globals.css` | W0 | docs min-width override + prose lists |
| `web/content/replica.ts` | W0 | Nav Docs `href: "/docs"` |
| `web/components/replica/sections/Nav.tsx` | W2A | Active state when path starts with `/docs` |
| `web/components/replica/sections/Footer.tsx` | W3 | Company "Docs" to `/docs` |
| `web/__tests__/docs-paths.test.ts` | W0 | Mapping |
| `web/__tests__/docs-import-strip.test.ts` | W0 | Chrome strip |
| `web/__tests__/docs-hub.test.tsx` | W0 | Hub renders 3 products |
| `web/__tests__/docs-article.test.tsx` | W0 | Sample article |
| `web/e2e/docs-smoke.spec.ts` | W3 | Hub + one page per product |

---

## Wave map

```
Wave 0  (1 agent, sequential)   Corpus wait, deps, paths, import script, loaders,
                                shell, hub, catch-all, nav href, unit tests.
                                Blocks everything.
Wave 1  (5 agents PARALLEL)     Repair imported markdown by cluster.
                                1A stackgen concepts/setup/integrations/mcp/support
                                1B stackgen CLI
                                1C aiden
                                1D observenow
                                1E release notes + help center + known issues
Wave 2  (2 agents PARALLEL)     2A sidebar + TOC + prev/next + nav active
                                2B client search
Wave 3  (1 agent, sequential)   Footer Docs link, metadata, sitemap, Playwright
                                smoke, coverage gate vs manifest
```

Waves are barriers. Do not start a wave until every agent in the previous wave has returned and the controller has run `cd web && pnpm typecheck && pnpm test`.

---

# WAVE 0 - Foundation

**1 agent, `composer-2.5-fast`.** Owns every shared file. Nothing else may run concurrently.

### Task 0.1: Confirm Firecrawl corpus

**Files:**
- Read-only: `.firecrawl/docs.stackgen.com/**/index.md`
- Read-only: `.firecrawl/docs-stackgen/urls.json`

- [ ] **Step 1: If download is still running, wait.** Expected terminal line: `Scraping 421 of 424 pages`. Corpus root is `.firecrawl/docs.stackgen.com/`.

If the folder has fewer than 400 `index.md` files, resume:

```bash
firecrawl experimental download "https://docs.stackgen.com/" \
  --limit 450 \
  --only-main-content \
  --wait-for 2500 \
  --exclude-paths "/search,/blog,/markdown-page" \
  -y
```

- [ ] **Step 2: Count**

```bash
find .firecrawl/docs.stackgen.com -name index.md | wc -l
```

Expected: `>= 400`. Sitemap.xml may also land as a folder; ignore it in the importer.

---

### Task 0.2: Install markdown deps and allow remote docs images

**Files:**
- Modify: `web/package.json`
- Modify: `web/next.config.ts`

- [ ] **Step 1: Install**

```bash
cd web
pnpm add gray-matter react-markdown remark-gfm
```

- [ ] **Step 2: Replace `web/next.config.ts` with**

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "docs.stackgen.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
```

---

### Task 0.3: Path mapping (write the failing test first)

**Files:**
- Create: `web/lib/docs/paths.ts`
- Create: `web/__tests__/docs-paths.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
import { destFromSourcePath, sourceFromDestSlug } from "@/lib/docs/paths";

test("hub and product roots", () => {
  expect(destFromSourcePath("/")).toEqual({ kind: "hub", slug: [] });
  expect(destFromSourcePath("/docs")).toEqual({
    kind: "page",
    slug: ["stackgen"],
  });
  expect(destFromSourcePath("/aiden")).toEqual({
    kind: "page",
    slug: ["aiden"],
  });
  expect(destFromSourcePath("/observenow")).toEqual({
    kind: "page",
    slug: ["observenow"],
  });
});

test("nests stackgen under /docs/stackgen", () => {
  expect(destFromSourcePath("/docs/cli-guide/usage/appstack/create")).toEqual({
    kind: "page",
    slug: ["stackgen", "cli-guide", "usage", "appstack", "create"],
  });
});

test("keeps aiden and observenow prefixes", () => {
  expect(destFromSourcePath("/aiden/2.0/settings/workspace")).toEqual({
    kind: "page",
    slug: ["aiden", "2.0", "settings", "workspace"],
  });
  expect(
    destFromSourcePath("/observenow/integrations/infrastructure/kubernetes"),
  ).toEqual({
    kind: "page",
    slug: ["observenow", "integrations", "infrastructure", "kubernetes"],
  });
});

test("skips docusaurus chrome routes", () => {
  expect(destFromSourcePath("/search").kind).toBe("skip");
  expect(destFromSourcePath("/blog").kind).toBe("skip");
  expect(destFromSourcePath("/markdown-page").kind).toBe("skip");
  expect(destFromSourcePath("/docs/category/quickstart").kind).toBe("skip");
});

test("strips trailing slashes", () => {
  expect(destFromSourcePath("/aiden/2.0/")).toEqual(
    destFromSourcePath("/aiden/2.0"),
  );
});

test("round-trips dest slugs", () => {
  const slug = ["stackgen", "concepts", "appstacks"];
  expect(sourceFromDestSlug(slug)).toBe("/docs/concepts/appstacks");
  expect(sourceFromDestSlug(["aiden", "1.0", "integrations", "github"])).toBe(
    "/aiden/1.0/integrations/github",
  );
  expect(sourceFromDestSlug([])).toBe("/");
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
cd web && pnpm exec vitest run __tests__/docs-paths.test.ts
```

Expected: FAIL with `Cannot find module '@/lib/docs/paths'` or `destFromSourcePath is not a function`.

- [ ] **Step 3: Write `web/lib/docs/paths.ts`**

```ts
export type Dest =
  | { kind: "hub"; slug: [] }
  | { kind: "page"; slug: string[] }
  | { kind: "skip"; slug: [] };

function normalize(path: string): string {
  const noHash = path.split("#")[0] ?? path;
  const trimmed = noHash.replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
}

export function destFromSourcePath(path: string): Dest {
  const p = normalize(path);
  if (
    p === "/search" ||
    p === "/blog" ||
    p === "/markdown-page" ||
    p.startsWith("/docs/category/") ||
    p === "/docs/category"
  ) {
    return { kind: "skip", slug: [] };
  }
  if (p === "/") return { kind: "hub", slug: [] };
  if (p === "/docs") return { kind: "page", slug: ["stackgen"] };
  if (p.startsWith("/docs/")) {
    return { kind: "page", slug: ["stackgen", ...p.slice("/docs/".length).split("/")] };
  }
  if (p === "/aiden") return { kind: "page", slug: ["aiden"] };
  if (p.startsWith("/aiden/")) {
    return { kind: "page", slug: ["aiden", ...p.slice("/aiden/".length).split("/")] };
  }
  if (p === "/observenow") return { kind: "page", slug: ["observenow"] };
  if (p.startsWith("/observenow/")) {
    return {
      kind: "page",
      slug: ["observenow", ...p.slice("/observenow/".length).split("/")],
    };
  }
  return { kind: "skip", slug: [] };
}

export function sourceFromDestSlug(slug: string[]): string {
  if (slug.length === 0) return "/";
  const [product, ...rest] = slug;
  if (product === "stackgen") {
    return rest.length === 0 ? "/docs" : `/docs/${rest.join("/")}`;
  }
  if (product === "aiden") {
    return rest.length === 0 ? "/aiden" : `/aiden/${rest.join("/")}`;
  }
  if (product === "observenow") {
    return rest.length === 0 ? "/observenow" : `/observenow/${rest.join("/")}`;
  }
  return "/";
}

export function destHref(slug: string[]): string {
  return slug.length === 0 ? "/docs" : `/docs/${slug.join("/")}`;
}

export function rewriteDocsHref(href: string): string {
  if (!href) return href;
  try {
    const url = new URL(href, "https://docs.stackgen.com");
    if (url.hostname !== "docs.stackgen.com") return href;
    const dest = destFromSourcePath(url.pathname);
    if (dest.kind === "skip") return href;
    const mapped = destHref(dest.slug);
    return `${mapped}${url.hash}`;
  } catch {
    return href;
  }
}
```

- [ ] **Step 4: Re-run the test**

```bash
cd web && pnpm exec vitest run __tests__/docs-paths.test.ts
```

Expected: PASS.

---

### Task 0.4: Chrome strip + importer

**Files:**
- Create: `web/lib/docs/strip.ts`
- Create: `web/__tests__/docs-import-strip.test.ts`
- Create: `web/scripts/import-docs.mjs`

- [ ] **Step 1: Write the failing strip test**

```ts
import { stripDocusaurusChrome, titleFromMarkdown } from "@/lib/docs/strip";

const RAW = `[Skip to main content](https://docs.stackgen.com/docs/concepts/appstacks#__docusaurus_skipToContent_fallback)

**Estimated read time: 2 min read**

On this page

Focus mode

Text sizeAAA

## Overview [direct](https://docs.stackgen.com/docs/concepts/appstacks#overview "Direct link to Overview")

An **appStack** is a collection of resources.

- [Overview](https://docs.stackgen.com/docs/concepts/appstacks#overview)
`;

test("strips skip-link, read time, focus chrome, and trailing toc", () => {
  const out = stripDocusaurusChrome(RAW);
  expect(out).not.toMatch(/Skip to main content/);
  expect(out).not.toMatch(/Estimated read time/);
  expect(out).not.toMatch(/Focus mode/);
  expect(out).not.toMatch(/Text size/);
  expect(out).toContain("An **appStack** is a collection of resources.");
  expect(out).toMatch(/^## Overview$/m);
});

test("titleFromMarkdown uses first heading", () => {
  expect(titleFromMarkdown("## Overview\n\nHello")).toBe("Overview");
});
```

Note: live Firecrawl files prefix the read-time line with an hourglass emoji. `strip.ts` must match both `Estimated read time` and the emoji form.

- [ ] **Step 2: Run it (expect FAIL), then add `web/lib/docs/strip.ts`**

```ts
const SKIP_LINE =
  /^\[Skip to main content\]\([^)]*__docusaurus_skipToContent_fallback\)\s*$/;
const READ_TIME = /Estimated read time/;
const CHROME = /^(On this page|Focus mode|Text sizeAAA|Version [\d.]+)\s*$/;
const HEADING_LINK = /^(#{1,6} .+?) \[[^\]]*\]\([^)]+\)\s*$/;
const ZWSP = /\u200B/g;

export function stripDocusaurusChrome(raw: string): string {
  const lines = raw.replace(/\r\n/g, "\n").split("\n");
  const kept: string[] = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (SKIP_LINE.test(trimmed)) continue;
    if (READ_TIME.test(trimmed)) continue;
    if (CHROME.test(trimmed)) continue;
    const heading = trimmed.match(HEADING_LINK);
    if (heading) {
      kept.push(heading[1]!.replace(ZWSP, ""));
      continue;
    }
    kept.push(line.replace(ZWSP, ""));
  }
  let body = kept.join("\n").trim();
  body = body.replace(/\n(?:- \[[^\]]+\]\([^)]+#[^)]+\)\n?)+$/g, "");
  return body.trim() + "\n";
}

export function titleFromMarkdown(md: string, fallback = "Untitled"): string {
  const m = md.match(/^#{1,6}\s+(.+)$/m);
  return m ? m[1]!.replace(ZWSP, "").trim() : fallback;
}

export function titleFromSlug(slug: string[]): string {
  const last = slug[slug.length - 1] ?? "Docs";
  return last
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
```

- [ ] **Step 3: Re-run strip tests until PASS**

- [ ] **Step 4: Write `web/scripts/import-docs.mjs`**

The script is Node ESM (repo `type: module`). It must:

1. Walk `.firecrawl/docs.stackgen.com/**/index.md` (repo root relative).
2. Skip `sitemap.xml`.
3. Derive source path from the folder after `docs.stackgen.com`.
4. Duplicate the small `normalize` / `destFromSourcePath` / `destHref` functions from `paths.ts` so the script runs without tsx.
5. Skip `kind === "skip"` and `kind === "hub"`.
6. Strip chrome using the same regexes as `strip.ts`.
7. Rewrite every markdown link whose host is `docs.stackgen.com` to `/docs/...`.
8. Collapse scrape-broken bash fences: `\\\n\n` to `\\\n` inside fenced blocks.
9. Mark status `denied` if body includes `AccessDenied`.
10. Mark status `empty` if stripped body length `< 40`.
11. Write `web/content/docs/{slug...}/page.md` with YAML frontmatter fields `title`, `product`, `sourcePath`, `sourceUrl`, `status`.
12. Write `web/content/docs/manifest.json` as an array of `{ sourcePath, href, title, status, bytes, slug }`.
13. Write `web/content/docs/nav.json` as three roots (`stackgen`, `aiden`, `observenow`).
14. Write `web/content/docs/redirects.json` starting as `[]`. Wave 1C fills unversioned Aiden aliases.

Use `JSON.stringify` for YAML scalar values so titles with colons stay valid.

Minimal complete script:

```js
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const CORPUS = path.join(ROOT, ".firecrawl/docs.stackgen.com");
const OUT = path.join(ROOT, "web/content/docs");

function normalize(p) {
  const trimmed = p.replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
}

function destFromSourcePath(pathName) {
  const p = normalize(pathName);
  if (
    p === "/search" ||
    p === "/blog" ||
    p === "/markdown-page" ||
    p.startsWith("/docs/category")
  ) {
    return { kind: "skip", slug: [] };
  }
  if (p === "/") return { kind: "hub", slug: [] };
  if (p === "/docs") return { kind: "page", slug: ["stackgen"] };
  if (p.startsWith("/docs/"))
    return { kind: "page", slug: ["stackgen", ...p.slice(6).split("/")] };
  if (p === "/aiden") return { kind: "page", slug: ["aiden"] };
  if (p.startsWith("/aiden/"))
    return { kind: "page", slug: ["aiden", ...p.slice(7).split("/")] };
  if (p === "/observenow") return { kind: "page", slug: ["observenow"] };
  if (p.startsWith("/observenow/"))
    return { kind: "page", slug: ["observenow", ...p.slice(12).split("/")] };
  return { kind: "skip", slug: [] };
}

function destHref(slug) {
  return slug.length === 0 ? "/docs" : `/docs/${slug.join("/")}`;
}

function rewriteHref(href) {
  try {
    const url = new URL(href, "https://docs.stackgen.com");
    if (url.hostname !== "docs.stackgen.com") return href;
    const dest = destFromSourcePath(url.pathname);
    if (dest.kind === "skip") return href;
    return `${destHref(dest.slug)}${url.hash}`;
  } catch {
    return href;
  }
}

function strip(raw) {
  const skip =
    /^\[Skip to main content\]\([^)]*__docusaurus_skipToContent_fallback\)\s*$/;
  const read = /Estimated read time/;
  const chrome = /^(On this page|Focus mode|Text sizeAAA|Version [\d.]+)\s*$/;
  const headingLink = /^(#{1,6} .+?) \[[^\]]*\]\([^)]+\)\s*$/;
  const lines = raw.replace(/\r\n/g, "\n").split("\n");
  const kept = [];
  for (const line of lines) {
    const t = line.trim();
    if (skip.test(t) || read.test(t) || chrome.test(t)) continue;
    const h = t.match(headingLink);
    if (h) {
      kept.push(h[1].replace(/\u200B/g, ""));
      continue;
    }
    kept.push(line.replace(/\u200B/g, ""));
  }
  return (
    kept
      .join("\n")
      .trim()
      .replace(/\n(?:- \[[^\]]+\]\([^)]+#[^)]+\)\n?)+$/g, "")
      .trim() + "\n"
  );
}

function rewriteLinks(md) {
  return md.replace(/\]\((https?:\/\/docs\.stackgen\.com[^)]+)\)/g, (_, href) => {
    return `](${rewriteHref(href)})`;
  });
}

function collapseBashContinuations(md) {
  return md.replace(/```bash\n[\s\S]*?```/g, (block) =>
    block.replace(/\\\n\n/g, "\\\n"),
  );
}

function titleFrom(md, slug) {
  const m = md.match(/^#{1,6}\s+(.+)$/m);
  if (m) return m[1].trim();
  const last = slug[slug.length - 1] ?? "Docs";
  return last.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function yamlEscape(s) {
  return JSON.stringify(s);
}

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p, out);
    else if (entry.name === "index.md") out.push(p);
  }
  return out;
}

function sourcePathFromFile(file) {
  const rel = path.relative(CORPUS, path.dirname(file)).split(path.sep).join("/");
  if (!rel || rel === ".") return "/";
  return `/${rel}`;
}

const files = walk(CORPUS).filter((f) => !f.includes(`${path.sep}sitemap.xml${path.sep}`));
const manifest = [];

for (const file of files) {
  const sourcePath = sourcePathFromFile(file);
  const dest = destFromSourcePath(sourcePath);
  if (dest.kind !== "page") continue;
  const raw = fs.readFileSync(file, "utf8");
  const body = collapseBashContinuations(rewriteLinks(strip(raw)));
  let status = "ok";
  if (/AccessDenied/i.test(raw) && body.length < 400) status = "denied";
  else if (body.trim().length < 40) status = "empty";
  const title = titleFrom(body, dest.slug);
  const href = destHref(dest.slug);
  const dir = path.join(OUT, ...dest.slug);
  fs.mkdirSync(dir, { recursive: true });
  const fm = [
    "---",
    `title: ${yamlEscape(title)}`,
    `product: ${yamlEscape(dest.slug[0])}`,
    `sourcePath: ${yamlEscape(sourcePath)}`,
    `sourceUrl: ${yamlEscape(`https://docs.stackgen.com${sourcePath}`)}`,
    `status: ${yamlEscape(status)}`,
    "---",
    "",
    body,
  ].join("\n");
  fs.writeFileSync(path.join(dir, "page.md"), fm);
  manifest.push({
    sourcePath,
    href,
    title,
    status,
    bytes: body.length,
    slug: dest.slug,
  });
}

fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(path.join(OUT, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
fs.writeFileSync(path.join(OUT, "redirects.json"), "[]\n");

function navFor(product) {
  const items = manifest.filter((m) => m.slug[0] === product);
  const children = new Map();
  for (const m of items) {
    const rest = m.slug.slice(1);
    const key = rest[0] ?? "_root";
    if (!children.has(key)) children.set(key, []);
    children.get(key).push({
      title: m.title,
      href: m.href,
      slug: m.slug,
    });
  }
  return {
    title: product === "stackgen" ? "StackGen" : product === "aiden" ? "Aiden" : "ObserveNow",
    href: destHref([product]),
    children: [...children.entries()].map(([key, pages]) => ({
      title: key === "_root" ? "Overview" : key.replace(/[-_]/g, " "),
      href: pages.find((p) => p.slug.length === (key === "_root" ? 1 : 2))?.href ?? pages[0].href,
      children: pages,
    })),
  };
}

fs.writeFileSync(
  path.join(OUT, "nav.json"),
  JSON.stringify(
    { stackgen: navFor("stackgen"), aiden: navFor("aiden"), observenow: navFor("observenow") },
    null,
    2,
  ) + "\n",
);

const counts = manifest.reduce((acc, m) => {
  acc[m.status] = (acc[m.status] ?? 0) + 1;
  return acc;
}, {});
console.log(`imported ${manifest.length}`, counts);
```

- [ ] **Step 5: Run the importer**

```bash
node web/scripts/import-docs.mjs
```

Expected stdout like `imported 4xx { ok: N, denied: M, empty: K }` with `ok` in the hundreds. `web/content/docs/stackgen/concepts/appstacks/page.md` exists and starts with `---`.

---

### Task 0.5: Loaders, markdown renderer, docs shell, catch-all route

**Files:**
- Create: `web/lib/docs/load.ts`
- Create: `web/lib/docs/nav.ts`
- Create: `web/content/docs/hub.ts`
- Create: `web/components/docs/DocsMarkdown.tsx`
- Create: `web/components/docs/DocsShell.tsx`
- Create: `web/app/docs/layout.tsx`
- Create: `web/app/docs/page.tsx`
- Create: `web/app/docs/[[...slug]]/page.tsx`
- Modify: `web/app/globals.css` (docs min-width + pre/code only)
- Modify: `web/content/replica.ts` (Docs href only)

- [ ] **Step 1: `web/lib/docs/load.ts`**

```ts
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const DOCS_ROOT = path.join(process.cwd(), "content/docs");

export type DocsFrontmatter = {
  title: string;
  product: "stackgen" | "aiden" | "observenow";
  sourcePath: string;
  sourceUrl: string;
  status: "ok" | "denied" | "empty";
};

export type DocsPage = {
  slug: string[];
  href: string;
  frontmatter: DocsFrontmatter;
  body: string;
};

function walk(dir: string, prefix: string[] = [], out: string[][] = []): string[][] {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "hub.ts" || entry.name.endsWith(".json")) continue;
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p, [...prefix, entry.name], out);
    else if (entry.name === "page.md") out.push(prefix);
  }
  return out;
}

export function listDocSlugs(): string[][] {
  return walk(DOCS_ROOT);
}

export function loadDoc(slug: string[]): DocsPage | null {
  const file = path.join(DOCS_ROOT, ...slug, "page.md");
  if (!fs.existsSync(file)) return null;
  const parsed = matter(fs.readFileSync(file, "utf8"));
  const data = parsed.data as DocsFrontmatter;
  return {
    slug,
    href: `/docs/${slug.join("/")}`,
    frontmatter: data,
    body: parsed.content,
  };
}
```

- [ ] **Step 2: `web/lib/docs/nav.ts`**

```ts
import nav from "@/content/docs/nav.json";

export type DocsNavPage = {
  title: string;
  href: string;
  slug: string[];
};

export type DocsNavGroup = {
  title: string;
  href: string;
  children: DocsNavPage[];
};

export type DocsNavRoot = {
  title: string;
  href: string;
  children: DocsNavGroup[];
};

export const docsNav = nav as {
  stackgen: DocsNavRoot;
  aiden: DocsNavRoot;
  observenow: DocsNavRoot;
};

export function navForProduct(product: string): DocsNavRoot | null {
  if (product === "stackgen" || product === "aiden" || product === "observenow") {
    return docsNav[product];
  }
  return null;
}
```

`resolveJsonModule` is already true in `web/tsconfig.json`.

- [ ] **Step 3: `web/content/docs/hub.ts`** (copy harvested from the live hub scrape; do not invent)

```ts
export const docsHub = {
  title: "Everything you need to Get Started with StackGen",
  productsEyebrow: "Start from a product",
  productsBody:
    "Pick a product to open its docs hub. Each area is grouped so onboarding, how-tos, and deeper reference stay easy to scan.",
  products: [
    {
      href: "/docs/stackgen",
      title: "StackGen",
      body: "Design and ship cloud infrastructure and applications, with clear paths from first setup to production.",
    },
    {
      href: "/docs/aiden",
      title: "Aiden",
      body: "AI help for everyday DevOps: answers, guided tasks, and the integrations your team already uses.",
    },
    {
      href: "/docs/observenow",
      title: "ObserveNow",
      body: "Bring metrics, dashboards, and alerts together so your team can spot and fix issues quickly.",
    },
  ],
  toolsEyebrow: "Developer tools",
  toolsLead:
    "Build, deploy, and manage StackGen from your workflows. Use the CLI, Integrations and MCP tools to move from configuration to production with control and consistency.",
  tools: [
    {
      href: "/docs/stackgen/cli-guide",
      title: "StackGen CLI",
      kicker: "Configure and deploy from your terminal.",
      body: "Run workflows, manage environments, and access the full command surface when you need precision.",
    },
    {
      href: "/docs/stackgen/integrations",
      title: "Integrations",
      kicker: "Connect StackGen to your existing stack.",
      body: "Work seamlessly with tools like Backstage, Terraform Cloud, and Wiz, keeping one flow from portal to production.",
    },
    {
      href: "/docs/stackgen/mcp",
      title: "MCP",
      kicker: "Bring StackGen context into your tools.",
      body: "Enable IDEs and AI assistants to act with awareness and guardrails you define.",
    },
  ],
} as const;
```

- [ ] **Step 4: `web/components/docs/DocsMarkdown.tsx`**

```tsx
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { rewriteDocsHref } from "@/lib/docs/paths";

export function DocsMarkdown({ body }: { body: string }) {
  return (
    <div className="docs-prose flex max-w-3xl flex-col gap-4 text-text-secondary">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children }) => {
            const mapped = href ? rewriteDocsHref(href) : href;
            if (mapped && mapped.startsWith("/")) {
              return (
                <Link href={mapped} className="text-accent-text underline">
                  {children}
                </Link>
              );
            }
            return (
              <a href={mapped} className="text-accent-text underline" rel="noreferrer">
                {children}
              </a>
            );
          },
          h1: ({ children }) => (
            <h1 className="text-3xl font-medium text-text-primary">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="mt-8 text-xl font-medium text-text-primary">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="mt-6 text-lg font-medium text-text-primary">{children}</h3>
          ),
          code: ({ className, children }) => (
            <code className={`font-mono text-sm text-text-primary ${className ?? ""}`}>
              {children}
            </code>
          ),
          pre: ({ children }) => (
            <pre className="overflow-x-auto rounded-lg border border-border bg-surface p-4 text-sm">
              {children}
            </pre>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">{children}</table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border-b border-border py-2 text-left text-text-primary">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border-b border-border py-2">{children}</td>
          ),
        }}
      >
        {body}
      </ReactMarkdown>
    </div>
  );
}
```

- [ ] **Step 5: `web/components/docs/DocsShell.tsx`**

```tsx
"use client";

import { ReplicaNav } from "@/components/replica/sections/Nav";
import { ReplicaFooter } from "@/components/replica/sections/Footer";
import { useTheme } from "@/components/replica/theme/ThemeProvider";

export function DocsShell({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  return (
    <div data-docs-root className="flex min-h-screen w-full flex-col bg-bg text-text-primary">
      <ReplicaNav theme={theme} />
      <div className="mx-auto flex w-full max-w-5xl flex-1 gap-10 px-6 pt-28 pb-16">
        {children}
      </div>
      <ReplicaFooter theme={theme} />
    </div>
  );
}
```

Wave 2A will insert the sidebar into this shell. Wave 0 ships a single article column.

- [ ] **Step 6: `web/app/docs/layout.tsx`**

```tsx
import { DocsShell } from "@/components/docs/DocsShell";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return <DocsShell>{children}</DocsShell>;
}
```

- [ ] **Step 7: `web/app/docs/page.tsx` (hub)**

```tsx
import Link from "next/link";
import { docsHub } from "@/content/docs/hub";

export default function DocsHubPage() {
  return (
    <article className="flex w-full flex-col gap-12">
      <header className="flex max-w-3xl flex-col gap-3">
        <h1 className="text-4xl font-medium text-text-primary">{docsHub.title}</h1>
        <p className="text-text-secondary">{docsHub.productsBody}</p>
      </header>
      <section className="flex flex-col gap-4">
        <p className="font-mono text-xs tracking-widest text-text-tertiary uppercase">
          {docsHub.productsEyebrow}
        </p>
        <div className="grid grid-cols-3 gap-4">
          {docsHub.products.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="rounded-lg border border-border bg-surface p-6 no-underline"
            >
              <h2 className="text-lg font-medium text-text-primary">{p.title}</h2>
              <p className="mt-2 text-sm text-text-secondary">{p.body}</p>
            </Link>
          ))}
        </div>
      </section>
      <section className="flex flex-col gap-4">
        <p className="font-mono text-xs tracking-widest text-text-tertiary uppercase">
          {docsHub.toolsEyebrow}
        </p>
        <p className="max-w-3xl text-text-secondary">{docsHub.toolsLead}</p>
        <div className="grid grid-cols-3 gap-4">
          {docsHub.tools.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="rounded-lg border border-border bg-surface p-6 no-underline"
            >
              <h2 className="text-lg font-medium text-text-primary">{t.title}</h2>
              <p className="mt-2 text-sm font-medium text-text-primary">{t.kicker}</p>
              <p className="mt-2 text-sm text-text-secondary">{t.body}</p>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
```

- [ ] **Step 8: `web/app/docs/[[...slug]]/page.tsx`**

```tsx
import { notFound } from "next/navigation";
import { DocsMarkdown } from "@/components/docs/DocsMarkdown";
import { listDocSlugs, loadDoc } from "@/lib/docs/load";

type PageProps = { params: Promise<{ slug?: string[] }> };

export function generateStaticParams() {
  return listDocSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug = [] } = await params;
  const page = loadDoc(slug);
  if (!page) return { title: "Docs | StackGen" };
  return {
    title: `${page.frontmatter.title} | StackGen Docs`,
    alternates: { canonical: `https://stackgen.com${page.href}` },
  };
}

export default async function DocsArticlePage({ params }: PageProps) {
  const { slug = [] } = await params;
  if (slug.length === 0) notFound();
  const page = loadDoc(slug);
  if (!page) notFound();
  return (
    <article className="flex w-full flex-col gap-6">
      <p className="font-mono text-xs tracking-widest text-text-tertiary uppercase">
        {page.frontmatter.product}
      </p>
      <h1 className="text-3xl font-medium text-text-primary">{page.frontmatter.title}</h1>
      {page.frontmatter.status !== "ok" ? (
        <p className="rounded-md border border-border bg-surface p-3 text-sm">
          This page imported with status {page.frontmatter.status}. Source:{" "}
          <a href={page.frontmatter.sourceUrl}>{page.frontmatter.sourceUrl}</a>
        </p>
      ) : null}
      <DocsMarkdown body={page.body} />
    </article>
  );
}
```

`web/app/docs/page.tsx` AND `web/app/docs/[[...slug]]/page.tsx` both exist. That is correct: the static `page.tsx` wins for `/docs`, the catch-all handles `/docs/*`.

- [ ] **Step 9: Patch `web/app/globals.css`**

Inside `@layer base`, after the existing `html { min-width: 1440px; }` block, add:

```css
  html:has([data-docs-root]) {
    min-width: 0;
  }
```

After the existing `@layer base` block, add:

```css
.docs-prose :where(ul) {
  list-style: disc;
  padding-left: 1.25rem;
}
.docs-prose :where(ol) {
  list-style: decimal;
  padding-left: 1.25rem;
}
```

Do not change any replica motion CSS.

- [ ] **Step 10: In `web/content/replica.ts` change only the Docs nav href**

From `{ label: "Docs", href: "#" }` to `{ label: "Docs", href: "/docs" }`.

Leave footer company strings for Wave 3.

---

### Task 0.6: Hub + article tests

**Files:**
- Create: `web/__tests__/docs-hub.test.tsx`
- Create: `web/__tests__/docs-article.test.tsx`

- [ ] **Step 1: Hub test**

```tsx
import { render, screen } from "@testing-library/react";
import DocsHubPage from "@/app/docs/page";
import { docsHub } from "@/content/docs/hub";

test("hub lists three products and three developer tools", () => {
  render(<DocsHubPage />);
  expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(docsHub.title);
  for (const p of docsHub.products) {
    expect(screen.getByRole("link", { name: new RegExp(p.title) })).toHaveAttribute(
      "href",
      p.href,
    );
  }
  for (const t of docsHub.tools) {
    expect(screen.getByRole("link", { name: new RegExp(t.title) })).toHaveAttribute(
      "href",
      t.href,
    );
  }
});
```

- [ ] **Step 2: Article test using a known imported page**

```tsx
import { loadDoc } from "@/lib/docs/load";

test("appstacks page imported", () => {
  const page = loadDoc(["stackgen", "concepts", "appstacks"]);
  expect(page).not.toBeNull();
  expect(page!.body).toMatch(/appStack/i);
  expect(page!.body).not.toMatch(/Skip to main content/);
  expect(page!.frontmatter.sourcePath).toBe("/docs/concepts/appstacks");
});
```

- [ ] **Step 3: Typecheck and unit tests**

```bash
cd web && pnpm typecheck && pnpm test
```

Expected: PASS. Existing replica tests still green.

If `nav.json` import fails under vitest, only then add a vitest `server.deps.inline` entry for `gray-matter`. Do not add it speculatively.

---

# WAVE 1 - Cluster repair (5 agents PARALLEL)

All five use `composer-2.5-fast`. Repair `page.md` files in place. Prefer not to re-run the importer.

**Shared repair protocol (every Wave 1 agent):**

1. Read `web/content/docs/manifest.json`.
2. Filter to your `Files` glob.
3. For `status: denied`, re-scrape with trailing slash and wait, then replace body:

```bash
firecrawl scrape "https://docs.stackgen.com<SOURCE_PATH>/" \
  --only-main-content --wait-for 2500 \
  -o /tmp/docs-rescrape.md
```

Then pass that file through the same strip/rewrite rules from `web/lib/docs/strip.ts` and `rewriteDocsHref`. Set `status: ok` in frontmatter when the body is real.

4. For `status: empty`, same re-scrape. If still empty, leave `status: empty` and a one-line body: `This page had no extractable content on docs.stackgen.com.`
5. Rewrite any remaining `https://docs.stackgen.com` links with `rewriteDocsHref`.
6. Collapse `\\\n\n` inside bash fences.
7. Do not edit `web/lib/**`, `web/app/**`, or another cluster's markdown.
8. Update the matching rows in `web/content/docs/manifest.json` status/bytes/title. Multiple agents touch this file: **each agent updates only JSON objects whose `href` starts with their prefix** listed below. Do not reformat the whole file.

### Task 1A: StackGen platform (not CLI, not releases)

**Files:**
- Modify: `web/content/docs/stackgen/page.md`
- Modify: `web/content/docs/stackgen/concepts/**`
- Modify: `web/content/docs/stackgen/setup/**`
- Modify: `web/content/docs/stackgen/integrations/**`
- Modify: `web/content/docs/stackgen/mcp/**`
- Modify: `web/content/docs/stackgen/support-and-kb/**`
- Modify: `web/content/docs/stackgen/analytics/**`
- Modify: `web/content/docs/stackgen/quickstart/**`
- Modify: `web/content/docs/stackgen/cloud2code/**`
- Modify: `web/content/docs/stackgen/aiden-mcp/**`
- Modify: `web/content/docs/stackgen/stackgen-mcp/**`
- Modify: `web/content/docs/manifest.json` (only hrefs in the allowlist below)

Manifest href allowlist: `/docs/stackgen/concepts`, `/docs/stackgen/setup`, `/docs/stackgen/integrations`, `/docs/stackgen/mcp`, `/docs/stackgen/support-and-kb`, `/docs/stackgen/analytics`, `/docs/stackgen/quickstart`, `/docs/stackgen/cloud2code`, `/docs/stackgen/aiden-mcp`, `/docs/stackgen/stackgen-mcp`, and exact `/docs/stackgen`.

About 90 pages.

- [ ] **Step 1:** Grep your tree for `AccessDenied`, `Skip to main content`, `docs.stackgen.com`.
- [ ] **Step 2:** Repair every hit via the shared protocol.
- [ ] **Step 3:** Spot-check `web/content/docs/stackgen/concepts/appstacks/page.md` still contains the appStack definition.
- [ ] **Step 4:** `cd web && pnpm exec vitest run __tests__/docs-article.test.ts`

### Task 1B: StackGen CLI

**Files:**
- Modify: `web/content/docs/stackgen/cli-guide/**`
- Modify: `web/content/docs/manifest.json` (only `href` starting `/docs/stackgen/cli-guide`)
- Create: `web/__tests__/docs-cli-create.test.ts`

66 pages. CLI pages have GFM tables and bash fences. Priority: `usage/appstack/create` must show a single `stackgen appstack create [flags]` fence without extra blank lines after `\`.

- [ ] **Step 1:** Repair denied/empty/chrome/links.
- [ ] **Step 2:** For every bash fence, ensure continuation lines are backslash + newline + indent, never backslash + blank line + indent.
- [ ] **Step 3:** Add:

```ts
import { loadDoc } from "@/lib/docs/load";

test("cli create fence has no blank line after backslash", () => {
  const page = loadDoc(["stackgen", "cli-guide", "usage", "appstack", "create"]);
  expect(page).not.toBeNull();
  expect(page!.body).toContain("stackgen appstack create [flags]");
  expect(page!.body).not.toMatch(/\\\n\n/);
});
```

Run: `cd web && pnpm exec vitest run __tests__/docs-cli-create.test.ts` Expected: PASS.

### Task 1C: Aiden

**Files:**
- Modify: `web/content/docs/aiden/**`
- Modify: `web/content/docs/manifest.json` (only `href` starting `/docs/aiden`)
- Modify: `web/content/docs/redirects.json`
- Create: `web/__tests__/docs-aiden.test.ts`

104 pages. Unversioned `/aiden/integrations/*` should redirect to `/docs/aiden/1.0/...` when the 1.0 file exists.

`redirects.json` items: `{ "from": "/docs/aiden/integrations/github", "to": "/docs/aiden/1.0/integrations/github" }`.

- [ ] **Step 1:** Re-scrape every `denied` Aiden 2.0 URL **with trailing slash**.
- [ ] **Step 2:** Fill `redirects.json` for unversioned twins. Do not delete the unversioned `page.md` files; keep them so the catch-all still resolves, with a sentence linking to the 1.0 twin.
- [ ] **Step 3:** Test:

```ts
import { loadDoc } from "@/lib/docs/load";

test("aiden 2 overview is not access denied", () => {
  const page = loadDoc(["aiden", "2.0"]);
  expect(page).not.toBeNull();
  expect(page!.frontmatter.status).toBe("ok");
  expect(page!.body).toMatch(/Agentic AI Operating System/i);
  expect(page!.body).not.toMatch(/AccessDenied/);
});
```

Run vitest on `docs-aiden.test.ts`. Expected: PASS.

### Task 1D: ObserveNow

**Files:**
- Modify: `web/content/docs/observenow/**`
- Modify: `web/content/docs/manifest.json` (only `href` starting `/docs/observenow`)
- Create: `web/__tests__/docs-observenow.test.ts`

87 pages. Duplicate path pair exists (`opentelemetry-reccommendations` vs `opentelemetry-recommendations`). Keep both files if both exist in the corpus; do not merge.

- [ ] **Step 1:** Shared repair protocol.
- [ ] **Step 2:** Test:

```ts
import { loadDoc } from "@/lib/docs/load";

test("observenow hub has telemetry intro", () => {
  const page = loadDoc(["observenow"]);
  expect(page).not.toBeNull();
  expect(page!.body).toMatch(/metrics, logs, and traces/i);
});
```

Run vitest. Expected: PASS.

### Task 1E: Release notes, help center, known issues, change-log

**Files:**
- Modify: `web/content/docs/stackgen/release-notes/**`
- Modify: `web/content/docs/stackgen/help-center/**`
- Modify: `web/content/docs/stackgen/known-issues/**`
- Modify: `web/content/docs/stackgen/change-log/**`
- Modify: `web/content/docs/manifest.json` (only those four href prefixes)
- Create: `web/__tests__/docs-releases.test.ts`

About 64 pages. Dated notes. Do not rewrite dates or version strings.

- [ ] **Step 1:** Shared repair protocol.
- [ ] **Step 2:** Test:

```ts
import { loadDoc } from "@/lib/docs/load";

test("release notes versions page imported", () => {
  const page = loadDoc(["stackgen", "release-notes"]);
  expect(page).not.toBeNull();
  expect(page!.frontmatter.status).not.toBe("denied");
});
```

Run vitest. Expected: PASS.

---

# WAVE 2 - Docs chrome (2 agents PARALLEL)

Controller must merge Wave 1 first (`pnpm typecheck && pnpm test` green) before dispatch.

### Task 2A: Sidebar, TOC, prev/next, nav active

**Files:**
- Modify: `web/components/docs/DocsShell.tsx`
- Create: `web/components/docs/DocsSidebar.tsx`
- Create: `web/components/docs/DocsToc.tsx`
- Modify: `web/app/docs/[[...slug]]/page.tsx`
- Modify: `web/components/replica/sections/Nav.tsx`
- Create: `web/__tests__/docs-sidebar.test.tsx`

Sidebar reads `docsNav` from `web/lib/docs/nav.ts`. Show the tree for `slug[0]` (product). Highlight the current `href`.

TOC: parse `h2`/`h3` from the article body on the server (regex on markdown headings) and pass `{ id, text, depth }[]`. Add `id` slugs on `h2`/`h3` in `DocsMarkdown`.

Prev/next: flatten the product nav pages in tree order; find current href; render two links.

Nav.tsx: for each `replicaContent.nav.links` item, if `item.href !== "#"` and `usePathname()` equals or starts with `item.href + "/"`, add `text-text-primary`. Exact `/docs` should also match `/docs`. `ReplicaNav` is already a client component.

- [ ] **Step 1:** Write `docs-sidebar.test.tsx` that renders `DocsSidebar` for product `stackgen` and asserts at least one link whose `href` starts with `/docs/stackgen/`.
- [ ] **Step 2:** Implement until that test and `pnpm typecheck` pass.
- [ ] **Step 3:** Do not restyle ReplicaNav beyond the active color class already used for hover (`text-text-primary`).

### Task 2B: Client search

**Files:**
- Create: `web/components/docs/DocsSearch.tsx`
- Modify: `web/components/docs/DocsShell.tsx` (search slot only)
- Create: `web/__tests__/docs-search.test.tsx`

**Collision rule:** 2A owns the left sidebar column. 2B owns a search input above the article, inside the article column, `aria-label="Search docs"`. If both need DocsShell, 2B may add the search component and 2A must leave a search slot at the top of the article column. Controller: if 2A and 2B conflict on `DocsShell.tsx`, keep 2A's sidebar structure and re-apply 2B's search import.

Search behavior: flatten all `nav.json` page titles, filter on `query.toLowerCase()`, show up to 12 `Link`s. No Algolia. Keyboard: `/` focuses the input via a `useEffect` keydown on `window` (not a scroll listener).

- [ ] **Step 1:** Test types a known title fragment from `nav.json` and expects a result link.
- [ ] **Step 2:** Implement. A labelled input is enough; Phosphor `magnifying-glass` is optional.

---

# WAVE 3 - SEO, footer, e2e, coverage gate

**1 agent, `composer-2.5-fast`.**

**Files:**
- Modify: `web/components/replica/sections/Footer.tsx`
- Create: `web/app/sitemap.ts`
- Modify: `web/app/docs/layout.tsx` (`generateMetadata` title template `Docs | StackGen`)
- Modify: `web/next.config.ts` (redirects from `redirects.json` if non-empty)
- Create: `web/e2e/docs-smoke.spec.ts`
- Create: `web/__tests__/docs-coverage.test.ts`

### Footer

Inside `FooterColumn`, if `item === "Docs"` then `href = "/docs"`, else `"#"`. Do not invent other footer URLs.

### Sitemap

`web/app/sitemap.ts` returns `{ url, lastModified? }[]` for `https://stackgen.com/`, `https://stackgen.com/docs`, and every `listDocSlugs()` href. No `priority` or `changefreq` fields.

### Metadata

Article pages already set `generateMetadata` in Wave 0. Wave 3 adds `description` from the first paragraph of `page.body` (strip markdown, slice 160 chars) and Open Graph `title`. Do not inject a raw HTML script tag for JSON-LD.

### Coverage test

```ts
import manifest from "@/content/docs/manifest.json";

test("imported page count covers the live map minus skips", () => {
  expect(manifest.length).toBeGreaterThanOrEqual(400);
  const denied = manifest.filter((m: { status: string }) => m.status === "denied");
  expect(denied).toEqual([]);
});
```

If a handful of pages remain denied after Wave 1, the controller may temporarily assert `denied.length <= 5` and list those source URLs in the Wave 3 report. Do not silently drop pages.

### Playwright

`web/e2e/docs-smoke.spec.ts` does not replace motion-parity. Assumes the app on :3000.

```ts
import { test, expect } from "@playwright/test";

test("docs hub and three product pages render", async ({ page }) => {
  await page.goto("/docs");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Get Started");
  await page.goto("/docs/stackgen/concepts/appstacks");
  await expect(page.locator("body")).toContainText("appStack");
  await page.goto("/docs/aiden/2.0");
  await expect(page.locator("body")).not.toContainText("AccessDenied");
  await page.goto("/docs/observenow");
  await expect(page.locator("body")).toContainText("ObserveNow");
});
```

Run: `cd web && pnpm exec playwright test e2e/docs-smoke.spec.ts`

Expected: PASS against a running server. If the server is not up, start `pnpm dev` (or Docker prod) first.

### Redirects

If `redirects.json` is non-empty, `web/next.config.ts` `redirects()` maps each `{ from, to }` to `{ source, destination, permanent: true }`. Read the JSON with `readFileSync` + `JSON.parse` so next.config does not depend on import assertions.

---

## Controller runbook

1. Dispatch Wave 0 as a single `composer-2.5-fast` agent with this plan's Wave 0 section pasted. Wait. Run `cd web && pnpm typecheck && pnpm test`.
2. Dispatch Wave 1A-1E in **one message**, five agents, each pasted only their task + Global Constraints + Shared repair protocol. Wait for all five. Re-run typecheck + test.
3. Dispatch Wave 2A + 2B in one message. If both edit `DocsShell.tsx`, resolve by keeping 2A structure and re-applying 2B search. Re-run typecheck + test.
4. Dispatch Wave 3. Run typecheck, test, and docs Playwright.
5. Do not start Wave N+1 while Wave N files are still dirty.

## Out of scope

- Replacing docs.stackgen.com DNS or CloudFront.
- DocSearch/Algolia.
- Downloading `/docimages` into `public/`.
- Translating or rewriting docs into factory-launch marketing copy.
- Building product, platform, or pricing pages.
- Pencil frames for docs.

## Self-review

- Live map 422 URLs: skip 5, hub 1 React, 417 markdown. Tasks cover import (W0) + repair by cluster (W1) + chrome (W2) + SEO/e2e (W3).
- No TBD placeholders in task steps.
- `destFromSourcePath` / `loadDoc` / `docsHub` names are consistent across tasks.
- File ownership: Wave 1 clusters do not overlap. Manifest.json is row-partitioned. DocsShell conflict between 2A/2B is explicit.
