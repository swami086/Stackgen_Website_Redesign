/**
 * Idempotent seed — homepage Puck page (isHomepage=true).
 * Merges Payload home global + cards into puckData.
 *
 *   cd web && pnpm seed:puck-home
 */
import { getPayload } from "payload";
import config from "@payload-config";
import type { CmsFieldData } from "@/lib/cms-overlay";
import { overlayReplicaContent } from "@/lib/cms-overlay";
import { buildHomePuckDataFromContent } from "@/puck/lib/build-page-data";

const HOME_SLUG = "home";

async function main() {
  const payload = await getPayload({ config });
  const [{ docs: existing }, homeGlobal, { docs: cards }] = await Promise.all([
    payload.find({
      collection: "pages",
      where: { isHomepage: { equals: true } },
      limit: 1,
    }),
    payload.findGlobal({ slug: "home" }),
    payload.find({ collection: "cards", limit: 500 }),
  ]);

  const content = overlayReplicaContent(
    homeGlobal as unknown as CmsFieldData,
    cards as unknown as CmsFieldData[],
  );
  const puckData = buildHomePuckDataFromContent(content);

  if (existing[0]) {
    console.log(`Homepage pages row exists (id=${existing[0].id}) — skipping`);
    return;
  }

  const doc = await payload.create({
    collection: "pages",
    draft: false,
    data: {
      title: "Home",
      slug: HOME_SLUG,
      editorVersion: "puck",
      pageLayout: "default",
      isHomepage: true,
      puckData,
      _status: "published",
    },
  });

  console.log(`Created homepage pages row (id=${doc.id}) — visit /`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
