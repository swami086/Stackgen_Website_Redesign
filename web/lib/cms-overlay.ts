import { replicaContent, type ReplicaContent } from "@/content/replica";
import {
  getProductContent,
  type ProductCard,
  type ProductPageContent,
} from "@/content/products";
import { PRODUCT_SLUGS, type ProductSlug } from "@/lib/products";

export type CmsFieldData = Record<string, unknown>;

export type CmsPost = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  publishedOn: string | null;
};

export function stripHtml(value: unknown): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

export function hrefPath(value: unknown): string {
  if (value && typeof value === "object" && "url" in value) {
    return hrefPath((value as { url: unknown }).url);
  }
  if (typeof value !== "string" || !value) return "";
  try {
    const url = new URL(value);
    return `${url.pathname}${url.search}${url.hash}` || "/";
  } catch {
    return value;
  }
}

function text(fd: CmsFieldData, key: string): string {
  return typeof fd[key] === "string" ? fd[key] : "";
}

function cardsInSlot(cards: CmsFieldData[], slot: string, productSlug?: string) {
  return cards.filter((card) => {
    if (text(card, "slot") !== slot) return false;
    if (productSlug && text(card, "product-slug") !== productSlug) return false;
    return true;
  });
}

function asCards(items: CmsFieldData[]): ProductCard[] {
  return items
    .map((item) => ({
      title: text(item, "title"),
      body: stripHtml(item.body),
    }))
    .filter((item) => item.title);
}

type Mutable<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T extends ReadonlyArray<infer U>
        ? Mutable<U>[]
        : T extends object
          ? { -readonly [K in keyof T]: Mutable<T[K]> }
          : T;

/** Mutates `next` in place with the `home` global's own text fields only —
 * no cards/pillars/roles. Shared by overlayReplicaContent (server seed) and
 * applyHomeGlobalOverlay (client Live Preview). */
function applyHomeFields(next: Mutable<ReplicaContent>, home: CmsFieldData | undefined): void {
  if (!home) return;
  const h = next.hero;
  const p = next.problem;
  const s = next.solution;
  const a = next.assemblies;
  const sh = next.shell;
  const w = next.whoItsFor;
  const f = next.footer;
  if (text(home, "hero-heading")) h.heading = text(home, "hero-heading");
  if (text(home, "hero-sub")) h.sub = text(home, "hero-sub");
  if (text(home, "hero-primary-cta")) h.primaryCta = text(home, "hero-primary-cta");
  if (text(home, "hero-secondary-cta")) h.secondaryCta = text(home, "hero-secondary-cta");
  if (text(home, "logos-eyebrow")) next.logos.eyebrow = text(home, "logos-eyebrow");
  if (text(home, "problem-eyebrow")) p.eyebrow = text(home, "problem-eyebrow");
  if (text(home, "problem-heading")) p.heading = text(home, "problem-heading");
  if (text(home, "problem-body")) p.body = text(home, "problem-body");
  p.punchline = text(home, "problem-punchline");
  if (text(home, "problem-film-caption")) p.filmCaption = text(home, "problem-film-caption");
  if (text(home, "solution-eyebrow")) s.eyebrow = text(home, "solution-eyebrow");
  if (text(home, "solution-heading")) s.heading = text(home, "solution-heading");
  if (text(home, "solution-body")) s.body = text(home, "solution-body");
  if (text(home, "solution-claim")) s.claim = text(home, "solution-claim");
  if (text(home, "assemblies-eyebrow")) a.eyebrow = text(home, "assemblies-eyebrow");
  if (text(home, "assemblies-heading")) a.heading = text(home, "assemblies-heading");
  const assembliesBody = stripHtml(home["assemblies-body"]);
  if (assembliesBody) a.body = assembliesBody;
  if (text(home, "shell-eyebrow")) sh.eyebrow = text(home, "shell-eyebrow");
  if (text(home, "shell-heading")) sh.heading = text(home, "shell-heading");
  if (text(home, "shell-body-1")) sh.body1 = text(home, "shell-body-1");
  if (text(home, "shell-body-2")) sh.body2 = text(home, "shell-body-2");
  if (text(home, "who-eyebrow")) w.eyebrow = text(home, "who-eyebrow");
  if (text(home, "who-heading")) w.heading = text(home, "who-heading");
  if (text(home, "who-sub")) w.sub = text(home, "who-sub");
  if (text(home, "who-os-title")) w.osTitle = text(home, "who-os-title");
  if (text(home, "footer-cta-heading")) f.ctaHeading = text(home, "footer-cta-heading");
  if (text(home, "footer-cta-sub")) f.ctaSub = text(home, "footer-cta-sub");
  if (text(home, "footer-cta")) f.cta = text(home, "footer-cta");
  if (text(home, "footer-brand")) f.brand = text(home, "footer-brand");
  if (text(home, "footer-legal")) f.legal = text(home, "footer-legal");
}

/** Client-safe: re-applies only the home global's direct text fields onto an
 * already-rendered ReplicaContent (cards-derived sections untouched). Used by
 * HomeReplica's useLivePreview subscription. */
export function applyHomeGlobalOverlay(
  base: ReplicaContent,
  home: CmsFieldData | undefined,
): ReplicaContent {
  const next = structuredClone(base) as unknown as Mutable<ReplicaContent>;
  applyHomeFields(next, home);
  return next as unknown as ReplicaContent;
}

export function overlayReplicaContent(
  home: CmsFieldData | undefined,
  cards: CmsFieldData[],
): ReplicaContent {
  const next = structuredClone(replicaContent) as unknown as Mutable<ReplicaContent>;
  applyHomeFields(next, home);

  const symptoms = cardsInSlot(cards, "home-symptom")
    .map((card) => text(card, "title"))
    .filter(Boolean);
  if (symptoms.length) next.problem.symptoms = symptoms;

  const pillars = cardsInSlot(cards, "home-pillar");
  if (pillars.length) {
    next.whoItsFor.pillars = PRODUCT_SLUGS.map((slug, index) => {
      const base = replicaContent.whoItsFor.pillars[index]!;
      const card = pillars.find((item) => text(item, "product-slug") === slug);
      if (!card) return base;
      return {
        label: text(card, "label") || base.label,
        title: text(card, "title") || base.title,
        body: stripHtml(card.body) || base.body,
        href: hrefPath(card.href) || base.href,
      };
    });
  }

  const roles = cardsInSlot(cards, "home-role");
  if (roles.length) {
    next.whoItsFor.roles = replicaContent.whoItsFor.roles.map((base) => {
      const card = roles.find((item) => text(item, "title") === base.title);
      if (!card) return base;
      return {
        title: text(card, "title") || base.title,
        body: stripHtml(card.body) || base.body,
        href: hrefPath(card.href) || base.href,
      };
    });
  }

  return next as unknown as ReplicaContent;
}

/** Mutates `next` in place with the product doc's own text fields only — no
 * cards/faqs. Shared by overlayProductContent (server seed) and
 * applyProductGlobalOverlay (client Live Preview). */
function applyProductFields(next: ProductPageContent, product: CmsFieldData | undefined): void {
  if (!product) return;
  if (text(product, "hero-heading")) next.hero.heading = text(product, "hero-heading");
  if (text(product, "hero-subhead")) next.hero.subhead = text(product, "hero-subhead");
  if (text(product, "problem-heading")) next.problem.heading = text(product, "problem-heading");
  if (text(product, "problem-body")) next.problem.body = text(product, "problem-body");
  if (text(product, "final-cta-heading"))
    next.finalCta.heading = text(product, "final-cta-heading");
  if (text(product, "final-cta-subhead"))
    next.finalCta.subhead = text(product, "final-cta-subhead");
  if (text(product, "faq-heading")) next.faq.heading = text(product, "faq-heading");
}

/** Client-safe: re-applies only the product doc's direct text fields onto an
 * already-rendered ProductPageContent (cards/faqs-derived sections
 * untouched). Used by ProductPage's useLivePreview subscription. */
export function applyProductGlobalOverlay(
  base: ProductPageContent,
  product: CmsFieldData | undefined,
): ProductPageContent {
  const next = structuredClone(base);
  applyProductFields(next, product);
  return next;
}

export function overlayProductContent(
  slug: ProductSlug,
  product: CmsFieldData | undefined,
  cards: CmsFieldData[],
  faqs: CmsFieldData[],
): ProductPageContent {
  const next = structuredClone(getProductContent(slug));
  applyProductFields(next, product);

  const faqItems = faqs
    .filter((item) => text(item, "product-slug") === slug)
    .map((item) => ({
      question: text(item, "question"),
      answer: stripHtml(item.answer),
    }))
    .filter((item) => item.question && item.answer);
  if (faqItems.length) next.faq.items = faqItems;

  const pillarCards = asCards(cardsInSlot(cards, "product-pillar", slug));
  if (pillarCards.length) next.pillars.items = pillarCards;
  const spotlightCards = asCards(cardsInSlot(cards, "product-spotlight", slug));
  if (spotlightCards.length) next.spotlight.cards = spotlightCards;
  const capabilityCards = asCards(cardsInSlot(cards, "product-capability", slug));
  if (capabilityCards.length) next.capabilities.items = capabilityCards;
  const enterpriseCards = asCards(cardsInSlot(cards, "product-enterprise", slug));
  if (enterpriseCards.length) next.enterprise.items = enterpriseCards;
  const offerCards = asCards(cardsInSlot(cards, "product-offer", slug));
  if (offerCards.length) next.offers.items = offerCards;
  const resourceCards = asCards(cardsInSlot(cards, "product-resource", slug));
  if (resourceCards.length) next.resources.items = resourceCards;

  return next;
}

export function mapPosts(items: CmsFieldData[]): CmsPost[] {
  return items
    .map((item) => ({
      slug: text(item, "slug"),
      title: text(item, "name"),
      excerpt: text(item, "excerpt"),
      body: typeof item.body === "string" ? item.body : "",
      publishedOn: text(item, "published-on-2") || null,
    }))
    .filter((post) => post.slug && post.title);
}
