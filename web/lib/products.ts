/** Product route slugs — naming locked to PRODUCT.md. */
export const PRODUCT_SLUGS = [
  "aiden-for-infraops",
  "aiden-for-devops",
  "aiden-for-observability",
  "aiden-for-sre",
] as const;

export type ProductSlug = (typeof PRODUCT_SLUGS)[number];

export const PRODUCT_PHASES = ["Build", "Operate", "Observe", "Remediate"] as const;

export type ProductPhase = (typeof PRODUCT_PHASES)[number];

export type ProductMeta = {
  slug: ProductSlug;
  phase: ProductPhase;
  title: string;
  href: `/product/${ProductSlug}`;
  pencilFrameId: string;
};

export const PRODUCTS: Record<ProductSlug, ProductMeta> = {
  "aiden-for-infraops": {
    slug: "aiden-for-infraops",
    phase: "Build",
    title: "Aiden for InfraOps",
    href: "/product/aiden-for-infraops",
    pencilFrameId: "qwI1S",
  },
  "aiden-for-devops": {
    slug: "aiden-for-devops",
    phase: "Operate",
    title: "Aiden for DevOps",
    href: "/product/aiden-for-devops",
    pencilFrameId: "llzpJ",
  },
  "aiden-for-observability": {
    slug: "aiden-for-observability",
    phase: "Observe",
    title: "Aiden for Observability",
    href: "/product/aiden-for-observability",
    pencilFrameId: "JQkAE",
  },
  "aiden-for-sre": {
    slug: "aiden-for-sre",
    phase: "Remediate",
    title: "Aiden for SRE",
    href: "/product/aiden-for-sre",
    pencilFrameId: "TIh4G",
  },
};

export function productHref(slug: ProductSlug): string {
  return `/product/${slug}`;
}

export function isProductSlug(value: string): value is ProductSlug {
  return (PRODUCT_SLUGS as readonly string[]).includes(value);
}

export function getProduct(slug: string): ProductMeta | undefined {
  return isProductSlug(slug) ? PRODUCTS[slug] : undefined;
}
