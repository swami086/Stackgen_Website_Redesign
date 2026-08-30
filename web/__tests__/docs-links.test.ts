import fs from "node:fs";
import path from "node:path";
import { listDocSlugs, loadDoc } from "@/lib/docs/load";
import { rewriteDocsHref } from "@/lib/docs/paths";

test("appstacks in-body dest links resolve to imported pages", () => {
  const page = loadDoc(["stackgen", "concepts", "appstacks"]);
  expect(page).not.toBeNull();
  expect(rewriteDocsHref("/docs/stackgen/concepts/appstacks/createappstacks")).toBe(
    "/docs/stackgen/concepts/appstacks/createappstacks",
  );
  expect(loadDoc(["stackgen", "concepts", "appstacks", "createappstacks"])).not.toBeNull();
});

test("rewritten article hrefs match imported slugs", () => {
  const pages = new Set(listDocSlugs().map((slug) => `/docs/${slug.join("/")}`));
  pages.add("/docs");
  const root = path.join(process.cwd(), "content/docs");
  const missing: string[] = [];

  function walk(dir: string) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name === "page.md") {
        const body = fs.readFileSync(full, "utf8");
        for (const match of body.matchAll(/\]\((https?:\/\/docs\.stackgen\.com[^)\s]+|\/docs\/[^)\s]+)/g)) {
          const raw = match[1]!;
          if (/Base64-Image-Removed/i.test(raw)) continue;
          if (/\.(svg|png|jpe?g|gif|webp|ico)(\?|$)/i.test(raw)) continue;
          if (/\/cdn\//.test(raw) || /\/assets\//.test(raw)) continue;
          const mapped = rewriteDocsHref(raw);
          if (!mapped.startsWith("/docs")) continue;
          const dest = mapped.split("#")[0]!.replace(/\/+$/, "") || "/docs";
          if (!pages.has(dest)) missing.push(`${dest} <- ${raw}`);
        }
      }
    }
  }
  walk(root);
  expect(missing.slice(0, 15)).toEqual([]);
});
