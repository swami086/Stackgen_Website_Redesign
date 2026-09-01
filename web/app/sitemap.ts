import type { MetadataRoute } from "next";
import { listDocSlugs } from "@/lib/docs/load";
import { destHref } from "@/lib/docs/paths";
import { PRODUCT_SLUGS, productHref } from "@/lib/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://stackgen.com";
  return [
    { url: `${base}/` },
    ...PRODUCT_SLUGS.map((slug) => ({ url: `${base}${productHref(slug)}` })),
    { url: `${base}/docs` },
    ...listDocSlugs().map((slug) => ({ url: `${base}${destHref(slug)}` })),
  ];
}
