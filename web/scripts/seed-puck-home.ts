/**
 * Idempotent seed — homepage Puck page (isHomepage=true).
 *
 *   cd web && pnpm seed:puck-home
 */
import { getPayload } from "payload";
import config from "@payload-config";
import { buildHomePuckData } from "@/puck/lib/build-page-data";

const HOME_SLUG = "home";

async function main() {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "pages",
    where: { isHomepage: { equals: true } },
    limit: 1,
  });

  const puckData = buildHomePuckData();

  if (docs[0]) {
    console.log(`Homepage pages row exists (id=${docs[0].id}) — skipping`);
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

  console.log(`Created homepage pages row (id=${doc.id}) — visit / after cutover`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
