/**
 * Idempotent seed — one pages row per product slug.
 * Merges Payload product doc + cards + faqs into puckData.
 *
 *   cd web && pnpm seed:puck-products
 */
import { getPayload } from "payload";
import config from "@payload-config";
import type { CmsFieldData } from "@/lib/cms-overlay";
import { overlayProductContent } from "@/lib/cms-overlay";
import {
  ALL_PRODUCT_SLUGS,
  buildProductPuckDataFromContent,
} from "@/puck/lib/build-page-data";
import type { ProductSlug } from "@/lib/products";

async function main() {
  const payload = await getPayload({ config });
  const [{ docs: products }, { docs: cards }, { docs: faqs }] = await Promise.all([
    payload.find({ collection: "products", limit: 20 }),
    payload.find({ collection: "cards", limit: 500 }),
    payload.find({ collection: "faqs", limit: 500 }),
  ]);

  for (const slug of ALL_PRODUCT_SLUGS) {
    const { docs } = await payload.find({
      collection: "pages",
      where: { slug: { equals: slug } },
      limit: 1,
    });

    if (docs[0]) {
      console.log(`pages/${slug} exists (id=${docs[0].id}) — skipping`);
      continue;
    }

    const productDoc = products.find(
      (p) => typeof p.slug === "string" && p.slug === slug,
    ) as CmsFieldData | undefined;

    const content = overlayProductContent(
      slug as ProductSlug,
      productDoc,
      cards as unknown as CmsFieldData[],
      faqs as unknown as CmsFieldData[],
    );

    const doc = await payload.create({
      collection: "pages",
      draft: false,
      data: {
        title: content.title,
        slug,
        editorVersion: "puck",
        pageLayout: "default",
        isHomepage: false,
        puckData: buildProductPuckDataFromContent(slug as ProductSlug, content),
        _status: "published",
      },
    });

    console.log(`Created pages/${slug} (id=${doc.id})`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
