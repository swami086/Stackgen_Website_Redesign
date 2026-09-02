/**
 * Idempotent seed — pages row per published blog post (same slug).
 *
 *   cd web && pnpm seed:puck-posts
 *   cd web && pnpm seed:puck-posts -- --force
 */
import { getPayload } from "payload";
import config from "@payload-config";
import { buildBlogPuckData } from "@/puck/lib/build-page-data";
import { seedForceFlag } from "./lib/seed-args";

async function main() {
  const force = seedForceFlag();
  const payload = await getPayload({ config });
  const { docs: posts } = await payload.find({
    collection: "posts",
    limit: 500,
  });

  for (const post of posts) {
    const slug = typeof post.slug === "string" ? post.slug : "";
    if (!slug) continue;

    const { docs: existing } = await payload.find({
      collection: "pages",
      where: { slug: { equals: slug } },
      limit: 1,
    });

    const title = String(
      (post as { name?: string; title?: string }).name ??
        (post as { title?: string }).title ??
        slug,
    );
    const excerpt = typeof post.excerpt === "string" ? post.excerpt : "";
    const bodyHtml =
      typeof post.body === "string"
        ? post.body
        : post.body
          ? JSON.stringify(post.body)
          : "<p></p>";

    const puckData = buildBlogPuckData({ title, excerpt, bodyHtml });

    if (existing[0]) {
      if (!force) {
        console.log(`pages/${slug} exists (id=${existing[0].id}) — skipping (use --force)`);
        continue;
      }
      await payload.update({
        collection: "pages",
        id: existing[0].id,
        draft: false,
        data: { puckData, title },
      });
      console.log(`Updated blog pages/${slug} (id=${existing[0].id})`);
      continue;
    }

    const doc = await payload.create({
      collection: "pages",
      draft: false,
      data: {
        title,
        slug,
        editorVersion: "puck",
        pageLayout: "default",
        isHomepage: false,
        puckData,
        _status: "published",
      },
    });

    console.log(`Created blog pages/${slug} (id=${doc.id})`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
