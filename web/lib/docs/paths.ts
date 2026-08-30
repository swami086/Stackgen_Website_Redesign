export type Dest =
  | { kind: "hub"; slug: [] }
  | { kind: "page"; slug: string[] }
  | { kind: "skip"; slug: [] };

const DEST_PRODUCTS = ["stackgen", "aiden", "observenow"] as const;
const STATIC_PREFIXES = ["/assets/", "/img/", "/cdn/", "/static/"];
const STATIC_FILE = /\.(svg|png|jpe?g|gif|webp|ico|pdf|css|js|woff2?|ttf|map)$/i;

function normalize(path: string): string {
  const noHash = path.split("#")[0] ?? path;
  const trimmed = noHash.replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
}

function isChromeSkip(p: string): boolean {
  return (
    p === "/search" ||
    p === "/blog" ||
    p === "/markdown-page" ||
    p.startsWith("/docs/category/") ||
    p === "/docs/category"
  );
}

function isStaticPath(p: string): boolean {
  return STATIC_PREFIXES.some((prefix) => p.startsWith(prefix)) || STATIC_FILE.test(p);
}

function destProductSlug(p: string): string[] | null {
  for (const product of DEST_PRODUCTS) {
    const prefix = `/docs/${product}`;
    if (p === prefix) return [product];
    if (p.startsWith(`${prefix}/`)) return p.slice("/docs/".length).split("/");
  }
  return null;
}

export function destFromSourcePath(path: string): Dest {
  const p = normalize(path);
  if (isChromeSkip(p)) return { kind: "skip", slug: [] };
  const already = destProductSlug(p);
  if (already) return { kind: "page", slug: already };
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
  if (p.startsWith("/") && p !== "/" && !isStaticPath(p)) {
    return { kind: "page", slug: ["stackgen", ...p.slice(1).split("/")] };
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
  if (!href || href.startsWith("#") || href.startsWith("mailto:")) return href;
  try {
    const url = new URL(href, "https://docs.stackgen.com");
    if (url.hostname !== "docs.stackgen.com") return href;
    if (isStaticPath(url.pathname)) return href;
    const dest = destFromSourcePath(url.pathname);
    if (dest.kind === "skip") return href;
    return `${destHref(dest.slug)}${url.hash}`;
  } catch {
    return href;
  }
}
