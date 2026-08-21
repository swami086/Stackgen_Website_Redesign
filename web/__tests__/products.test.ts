import { products } from "@/content/products";
import { isProductSlug, PRODUCT_SLUGS } from "@/lib/products";

test("rejects unknown slug", () => {
  expect(isProductSlug("nope")).toBe(false);
});

test("accepts all product slugs", () => {
  for (const slug of PRODUCT_SLUGS) {
    expect(isProductSlug(slug)).toBe(true);
  }
});

test("each product has hero heading and body", () => {
  for (const slug of PRODUCT_SLUGS) {
    const product = products[slug];
    expect(product.hero.heading.length).toBeGreaterThan(0);
    expect(product.hero.body.length).toBeGreaterThan(0);
  }
});

test("only infrastructure defines earlyAccess", () => {
  expect(products["aiden-for-infrastructure"].earlyAccess).toBeDefined();
  expect(products["aiden-for-automation"].earlyAccess).toBeUndefined();
  expect(products["aiden-for-observability"].earlyAccess).toBeUndefined();
  expect(products["aiden-for-sre"].earlyAccess).toBeUndefined();
});

function collectStrings(value: unknown, out: string[] = []): string[] {
  if (typeof value === "string") {
    out.push(value);
    return out;
  }
  if (Array.isArray(value)) {
    for (const item of value) collectStrings(item, out);
    return out;
  }
  if (value && typeof value === "object") {
    for (const item of Object.values(value)) collectStrings(item, out);
  }
  return out;
}

test("product content has no .firecrawl paths", () => {
  const strings = collectStrings(products);
  const firecrawlRefs = strings.filter((s) => s.includes(".firecrawl"));
  expect(firecrawlRefs).toEqual([]);
});
