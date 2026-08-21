import home from "@/content/home";

test("home hero has heading and body", () => {
  expect(home.hero.heading.length).toBeGreaterThan(0);
  expect(home.hero.body.length).toBeGreaterThan(0);
});

test("home exposes all section keys from spec", () => {
  for (const key of [
    "hero",
    "logos",
    "surfaces",
    "mechanism",
    "problem",
    "factoryProcess",
    "adfLoop",
    "agenticOs",
    "ocg",
    "integrations",
    "inTheirWords",
    "industries",
    "compliance",
    "useCases",
    "finalCta",
  ] as const) {
    expect(home[key]).toBeDefined();
  }
});

test("home surfaces and agenticOs have items", () => {
  expect(home.surfaces.items.length).toBeGreaterThan(0);
  expect(home.agenticOs.products.length).toBe(4);
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

test("home content has no .firecrawl paths", () => {
  const strings = collectStrings(home);
  const firecrawlRefs = strings.filter((s) => s.includes(".firecrawl"));
  expect(firecrawlRefs).toEqual([]);
});
