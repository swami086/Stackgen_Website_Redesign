import type { ProductSlug } from "@/lib/products";
import type { ReplicaContent } from "@/content/replica";
import type { ProductPageContent } from "@/content/products";
import {
  mapPosts,
  overlayProductContent,
  overlayReplicaContent,
  type CmsFieldData,
  type CmsPost,
} from "@/lib/cms-overlay";

export type { CmsFieldData, CmsPost };

export function isPayloadCmsEnabled(): boolean {
  return Boolean(process.env.DATABASE_URL && process.env.PAYLOAD_SECRET);
}

/** Public site origin (admin + REST live here). */
export function payloadBaseUrl(): string {
  return (process.env.PAYLOAD_PUBLIC_SERVER_URL ?? "http://127.0.0.1:3000").replace(/\/$/, "");
}

type PayloadDoc = Record<string, unknown>;

const SKIP_KEYS = new Set([
  "id",
  "createdAt",
  "updatedAt",
  "_status",
  "globalType",
]);

function docToFieldData(doc: PayloadDoc | null | undefined): CmsFieldData | undefined {
  if (!doc) return undefined;
  const fd: CmsFieldData = {};
  for (const [key, value] of Object.entries(doc)) {
    if (SKIP_KEYS.has(key)) continue;
    fd[key] = value;
  }
  return Object.keys(fd).length ? fd : undefined;
}

async function payload() {
  const [{ getPayload }, { default: config }] = await Promise.all([
    import("payload"),
    import("@payload-config"),
  ]);
  return getPayload({ config });
}

async function fetchCollection(slug: string): Promise<CmsFieldData[]> {
  try {
    const p = await payload();
    const result = await p.find({
      collection: slug as "cards" | "products" | "faqs" | "posts" | "media" | "users",
      where: { _status: { equals: "published" } },
      limit: 100,
      depth: 0,
      // overrideAccess + published filter: Local API must not surface drafts
      // even though access would also constrain unauthenticated REST.
      overrideAccess: true,
    });
    return (result.docs as unknown as PayloadDoc[])
      .map((doc) => docToFieldData(doc))
      .filter((item): item is CmsFieldData => Boolean(item));
  } catch {
    return [];
  }
}

async function fetchHomeGlobal(): Promise<CmsFieldData | undefined> {
  try {
    const p = await payload();
    const doc = await p.findGlobal({
      slug: "home",
      depth: 0,
      overrideAccess: true,
    });
    // Globals: published lives on the main row; skip if never published.
    const status = (doc as unknown as PayloadDoc)._status;
    if (status && status !== "published") return undefined;
    return docToFieldData(doc as unknown as PayloadDoc);
  } catch {
    return undefined;
  }
}

/** Raw `home` global fields (unmerged) — for client-side Live Preview, which
 * needs the same shape Payload's admin sends over postMessage. */
export async function getHomeGlobalRaw(): Promise<CmsFieldData | undefined> {
  return fetchHomeGlobal();
}

/** Raw product doc fields (unmerged) — for client-side Live Preview. */
export async function getProductRaw(slug: ProductSlug): Promise<CmsFieldData | undefined> {
  const products = await fetchCollection("products");
  return products.find((item) => typeof item.slug === "string" && item.slug === slug);
}

/** Raw post doc fields (unmerged) — for client-side Live Preview. */
export async function getPostRaw(slug: string): Promise<CmsFieldData | undefined> {
  const posts = await fetchCollection("posts");
  return posts.find((item) => typeof item.slug === "string" && item.slug === slug);
}

/** All card docs — for Live Preview merge on home/product pages. */
export async function getCardsRaw(): Promise<CmsFieldData[]> {
  return fetchCollection("cards");
}

/** All FAQ docs — for Live Preview merge on product pages. */
export async function getFaqsRaw(): Promise<CmsFieldData[]> {
  return fetchCollection("faqs");
}

export async function getOverlayReplicaContent(): Promise<ReplicaContent> {
  const [home, cards] = await Promise.all([fetchHomeGlobal(), fetchCollection("cards")]);
  return overlayReplicaContent(home, cards);
}

export async function getOverlayProductContent(
  slug: ProductSlug,
): Promise<ProductPageContent> {
  const [products, cards, faqs] = await Promise.all([
    fetchCollection("products"),
    fetchCollection("cards"),
    fetchCollection("faqs"),
  ]);
  const product = products.find(
    (item) => typeof item.slug === "string" && item.slug === slug,
  );
  return overlayProductContent(slug, product, cards, faqs);
}

export async function getPublishedPosts(): Promise<CmsPost[]> {
  return mapPosts(await fetchCollection("posts"));
}

export async function getPublishedPost(slug: string): Promise<CmsPost | undefined> {
  return (await getPublishedPosts()).find((post) => post.slug === slug);
}

/** Server-side health check — Local API connected. */
export async function pingPayload(): Promise<boolean> {
  try {
    const p = await payload();
    await p.find({ collection: "users", limit: 1, overrideAccess: true });
    return true;
  } catch {
    return false;
  }
}
