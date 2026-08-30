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
