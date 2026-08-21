import platform from "@/content/platform";

test("platform hero has heading and body", () => {
  expect(platform.hero.heading.length).toBeGreaterThan(0);
  expect(platform.hero.body.length).toBeGreaterThan(0);
});

test("platform exposes all section keys from spec", () => {
  for (const key of [
    "hero",
    "trustedBy",
    "byTheNumbers",
    "twoPlanes",
    "ocg",
    "aidenOs",
    "compliance",
    "finalCta",
    "footer",
  ] as const) {
    expect(platform[key]).toBeDefined();
  }
});

test("platform product links use four product routes", () => {
  expect(platform.aidenOs.productLinks.links).toHaveLength(4);
  for (const link of platform.aidenOs.productLinks.links) {
    expect(link.href).toMatch(/^\/product\/aiden-for-/);
  }
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

test("platform content has no .firecrawl paths", () => {
  const strings = collectStrings(platform);
  const firecrawlRefs = strings.filter((s) => s.includes(".firecrawl"));
  expect(firecrawlRefs).toEqual([]);
});
