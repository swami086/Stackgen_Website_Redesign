import type { MetadataRoute } from "next";
import { listDocSlugs } from "@/lib/docs/load";
import { destHref } from "@/lib/docs/paths";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://stackgen.com";
  return [
    { url: `${base}/` },
    { url: `${base}/docs` },
    ...listDocSlugs().map((slug) => ({ url: `${base}${destHref(slug)}` })),
  ];
}
