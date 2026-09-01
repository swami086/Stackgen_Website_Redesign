import type { MetadataRoute } from "next";
import { listDocSlugs } from "@/lib/docs/load";
import { destHref } from "@/lib/docs/paths";
import { PRODUCT_SLUGS, productHref } from "@/lib/products";
import { getPublishedPosts } from "@/lib/webflow-cms";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://stackgen.com";
  const posts = await getPublishedPosts();
  return [
    { url: `${base}/` },
    { url: `${base}/blog` },
    ...posts.map((post) => ({ url: `${base}/blog/${post.slug}` })),
    ...PRODUCT_SLUGS.map((slug) => ({ url: `${base}${productHref(slug)}` })),
    { url: `${base}/docs` },
    ...listDocSlugs().map((slug) => ({ url: `${base}${destHref(slug)}` })),
  ];
}
