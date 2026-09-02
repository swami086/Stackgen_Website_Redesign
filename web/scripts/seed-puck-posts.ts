/**
 * Idempotent seed — pages row per published blog post (same slug).
 *
 *   cd web && pnpm seed:puck-posts
 */
import { getPayload } from "payload";
import config from "@payload-config";
import { buildBlogPuckData } from "@/puck/lib/build-page-data";

async function main() {
  const payload = await getPayload({ config });
  const { docs: posts } = await payload.find({
    collection: "posts",
    where: { _status: { equals: "published" } },
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

    if (existing[0]) {
      console.log(`pages/${slug} exists (id=${existing[0].id}) — skipping`);
      continue;
    }

    const title = String((post as { title?: string }).title ?? slug);
    const excerpt = typeof post.excerpt === "string" ? post.excerpt : "";
    const bodyHtml =
      typeof post.body === "string"
        ? post.body
        : post.body
          ? JSON.stringify(post.body)
          : "<p></p>";

    const doc = await payload.create({
      collection: "pages",
      draft: false,
      data: {
        title,
        slug,
        editorVersion: "puck",
        pageLayout: "default",
        isHomepage: false,
        puckData: buildBlogPuckData({ title, excerpt, bodyHtml }),
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
