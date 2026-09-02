/**
 * Idempotent seed for Puck POC page at /puck-demo.
 *
 *   cd web
 *   export DATABASE_URL=postgresql://payload:<pw>@127.0.0.1:5433/payload
 *   pnpm seed:puck-demo
 */
import { getPayload } from "payload";
import config from "@payload-config";

const DEMO_SLUG = "puck-demo";

const initialPuckData = {
  root: {
    props: {
      title: "Puck Demo",
      pageLayout: "default",
    },
  },
  content: [
    {
      type: "Heading",
      props: {
        id: "hero-heading",
        text: "StackGen Puck POC",
        level: "h1",
        alignment: "center",
      },
    },
    {
      type: "Text",
      props: {
        id: "hero-sub",
        text: "Visual page builder integrated with Payload CMS. Edit this page in /admin → Pages → Edit with Puck.",
        alignment: "center",
      },
    },
    {
      type: "Button",
      props: {
        id: "hero-cta",
        text: "Back to home",
        link: "/",
        variant: "default",
        alignment: "center",
      },
    },
  ],
  zones: {},
};

async function main() {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "pages",
    where: { slug: { equals: DEMO_SLUG } },
    limit: 1,
  });

  if (docs[0]) {
    console.log(`pages/${DEMO_SLUG} already exists (id=${docs[0].id}) — skipping`);
    return;
  }

  const doc = await payload.create({
    collection: "pages",
    draft: false,
    data: {
      title: "Puck Demo",
      slug: DEMO_SLUG,
      editorVersion: "puck",
      pageLayout: "default",
      isHomepage: false,
      puckData: initialPuckData,
      _status: "published",
    },
  });

  console.log(`Created pages/${DEMO_SLUG} (id=${doc.id}) — visit /puck-demo`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
