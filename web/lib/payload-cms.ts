import type { ProductSlug } from "@/lib/products";
import type { ReplicaContent } from "@/content/replica";
import type { ProductPageContent } from "@/content/products";
import {
  mapPosts,
  overlayProductContent,
  overlayReplicaContent,
  type CmsFieldData,
  type CmsPost,
} from "@/lib/webflow-cms";

export function isPayloadCmsEnabled(): boolean {
  if (process.env.CMS_PROVIDER === "webflow") return false;
  if (process.env.CMS_PROVIDER === "payload") return true;
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
      limit: 100,
      depth: 0,
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
    return docToFieldData(doc as unknown as PayloadDoc);
  } catch {
    return undefined;
  }
}

export async function getPayloadOverlayReplicaContent(): Promise<ReplicaContent> {
  const [home, cards] = await Promise.all([fetchHomeGlobal(), fetchCollection("cards")]);
  return overlayReplicaContent(home, cards);
}

export async function getPayloadOverlayProductContent(
  slug: ProductSlug,
): Promise<ProductPageContent> {
  const [products, cards, faqs] = await Promise.all([
    fetchCollection("products"),
    fetchCollection("cards"),
    fetchCollection("faqs"),
  ]);
  const product = products.find((item) => item.slug === slug);
  return overlayProductContent(slug, product, cards, faqs);
}

export async function getPayloadPublishedPosts(): Promise<CmsPost[]> {
  return mapPosts(await fetchCollection("posts"));
}

export async function getPayloadPublishedPost(slug: string): Promise<CmsPost | undefined> {
  return (await getPayloadPublishedPosts()).find((post) => post.slug === slug);
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
