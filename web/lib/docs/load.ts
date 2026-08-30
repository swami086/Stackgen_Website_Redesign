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
