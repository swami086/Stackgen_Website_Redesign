/**
 * Idempotent seed — one pages row per product slug.
 *
 *   cd web && pnpm seed:puck-products
 */
import { getPayload } from "payload";
import config from "@payload-config";
import {
  ALL_PRODUCT_SLUGS,
  buildProductPuckData,
} from "@/puck/lib/build-page-data";
import { getProductContent } from "@/content/products";

async function main() {
  const payload = await getPayload({ config });

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

    const meta = getProductContent(slug);
    const doc = await payload.create({
      collection: "pages",
      draft: false,
      data: {
        title: meta.title,
        slug,
        editorVersion: "puck",
        pageLayout: "default",
        isHomepage: false,
        puckData: buildProductPuckData(slug),
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
