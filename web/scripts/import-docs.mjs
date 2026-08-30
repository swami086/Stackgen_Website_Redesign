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
