/**
 * Idempotent seed: web/content → Payload (home, cards, products, faqs, posts).
 *
 *   cd web
 *   export DATABASE_URL=postgresql://payload:<pw>@127.0.0.1:5433/payload
 *   pnpm seed:app
 *
 * Remote/GKE: use scripts/seed-payload-gke.sh (sets NODE_ENV=production).
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getPayload } from "payload";
import config from "@payload-config";
import { replicaContent } from "../content/replica";
import { productContentBySlug } from "../content/products";
import { PRODUCT_SLUGS, type ProductSlug } from "../lib/products";
import type { ProductCard, ProductPageContent } from "../content/products";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

type Payload = Awaited<ReturnType<typeof getPayload>>;

function productSlugFromHref(href: string): string {
  const m = href.match(/\/product\/([^/?#]+)/);
  return m?.[1] ?? "";
}

async function clearCollection(
  payload: Payload,
  slug: "cards" | "products" | "faqs" | "posts",
) {
  const { docs } = await payload.find({ collection: slug, limit: 1000, pagination: false });
  for (const doc of docs) {
    await payload.delete({ collection: slug, id: doc.id });
  }
}

async function seedHome(payload: Payload) {
  const c = replicaContent;
  await payload.updateGlobal({
    slug: "home",
    data: {
      "hero-heading": c.hero.heading,
      "hero-sub": c.hero.sub,
      "hero-primary-cta": c.hero.primaryCta,
      "hero-secondary-cta": c.hero.secondaryCta,
      "logos-eyebrow": c.logos.eyebrow,
      "problem-eyebrow": c.problem.eyebrow,
      "problem-heading": c.problem.heading,
      "problem-body": c.problem.body,
      "problem-punchline": c.problem.punchline,
      "problem-film-caption": c.problem.filmCaption,
      "solution-eyebrow": c.solution.eyebrow,
      "solution-heading": c.solution.heading,
      "solution-body": c.solution.body,
      "solution-claim": c.solution.claim,
      "assemblies-eyebrow": c.assemblies.eyebrow,
      "assemblies-heading": c.assemblies.heading,
      "assemblies-body": c.assemblies.body,
      "shell-eyebrow": c.shell.eyebrow,
      "shell-heading": c.shell.heading,
      "shell-body-1": c.shell.body1,
      "shell-body-2": c.shell.body2,
      "who-eyebrow": c.whoItsFor.eyebrow,
      "who-heading": c.whoItsFor.heading,
      "who-sub": c.whoItsFor.sub,
      "who-os-title": c.whoItsFor.osTitle,
      "footer-cta-heading": c.footer.ctaHeading,
      "footer-cta-sub": c.footer.ctaSub,
      "footer-cta": c.footer.cta,
      "footer-brand": c.footer.brand,
      "footer-legal": c.footer.legal,
    },
  });

  for (const title of c.problem.symptoms) {
    await payload.create({ collection: "cards", data: { slot: "home-symptom", title } });
  }
  for (const pillar of c.whoItsFor.pillars) {
    await payload.create({
      collection: "cards",
      data: {
        slot: "home-pillar",
        label: pillar.label,
        title: pillar.title,
        body: pillar.body,
        href: pillar.href,
        "product-slug": productSlugFromHref(pillar.href),
      },
    });
  }
  for (const role of c.whoItsFor.roles) {
    await payload.create({
      collection: "cards",
      data: { slot: "home-role", title: role.title, body: role.body, href: role.href },
    });
  }
}

async function seedProductCards(
  payload: Payload,
  slug: ProductSlug,
  items: readonly ProductCard[],
  slot: string,
) {
  for (const item of items) {
    if (!item.title) continue;
    await payload.create({
      collection: "cards",
      data: { slot, "product-slug": slug, title: item.title, body: item.body },
    });
  }
}

async function seedProduct(payload: Payload, slug: ProductSlug, p: ProductPageContent) {
  await payload.create({
    collection: "products",
    data: {
      slug,
      "hero-heading": p.hero.heading,
      "hero-subhead": p.hero.subhead,
      "problem-heading": p.problem.heading,
      "problem-body": p.problem.body,
      "final-cta-heading": p.finalCta.heading,
      "final-cta-subhead": p.finalCta.subhead,
      "faq-heading": p.faq.heading,
    },
  });

  await seedProductCards(payload, slug, p.pillars.items, "product-pillar");
  await seedProductCards(payload, slug, p.spotlight.cards, "product-spotlight");
  await seedProductCards(payload, slug, p.capabilities.items, "product-capability");
  await seedProductCards(payload, slug, p.enterprise.items, "product-enterprise");
  await seedProductCards(payload, slug, p.offers.items, "product-offer");
  await seedProductCards(payload, slug, p.resources.items, "product-resource");

  for (const item of p.faq.items) {
    if (!item.question) continue;
    await payload.create({
      collection: "faqs",
      data: { "product-slug": slug, question: item.question, answer: item.answer },
    });
  }
}

async function main() {
  const payload = await getPayload({ config });

  await clearCollection(payload, "cards");
  await clearCollection(payload, "products");
  await clearCollection(payload, "faqs");
  await clearCollection(payload, "posts");

  await seedHome(payload);

  for (const slug of PRODUCT_SLUGS) {
    await seedProduct(payload, slug, productContentBySlug[slug]);
  }

  const counts = await Promise.all(
    (["cards", "products", "faqs", "posts"] as const).map(async (col) => {
      const { totalDocs } = await payload.find({ collection: col, limit: 1 });
      return [col, totalDocs] as const;
    }),
  );

  console.log("Seeded Payload from web/content:");
  for (const [col, n] of counts) console.log(`  ${col}: ${n}`);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
