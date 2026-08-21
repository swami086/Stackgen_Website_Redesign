export const PRODUCT_SLUGS = [
  "aiden-for-infrastructure",
  "aiden-for-automation",
  "aiden-for-observability",
  "aiden-for-sre",
] as const;

export type ProductSlug = (typeof PRODUCT_SLUGS)[number];

export function isProductSlug(s: string): s is ProductSlug {
  return (PRODUCT_SLUGS as readonly string[]).includes(s);
}
