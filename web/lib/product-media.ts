export type ProductHeroSlug =
  | "aiden-for-infrastructure"
  | "aiden-for-automation"
  | "aiden-for-observability"
  | "aiden-for-sre";

export type ProductHeroTheme = "light" | "dark";

/** Public path to a generated Nano Banana Pro product hero atmosphere PNG. */
export function productHeroSrc(
  slug: ProductHeroSlug,
  theme: ProductHeroTheme,
): string {
  return `/media/product/${slug}-${theme}.png`;
}
