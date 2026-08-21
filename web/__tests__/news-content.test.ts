import news from "@/content/news";

test("news hero has heading and body", () => {
  expect(news.hero.heading.length).toBeGreaterThan(0);
  expect(news.hero.body.length).toBeGreaterThan(0);
});

test("news exposes all section keys from spec", () => {
  for (const key of [
    "hero",
    "realMomentum",
    "placeholderItems",
    "footer",
  ] as const) {
    expect(news[key]).toBeDefined();
  }
});

test("news placeholder items stay placeholders", () => {
  expect(news.placeholderItems.items).toHaveLength(3);
  for (const item of news.placeholderItems.items) {
    expect(item.tag).toBe("PLACEHOLDER");
    expect(item.body).toBe("No published item yet.");
  }
});

test("news real momentum has three confirmed items", () => {
  expect(news.realMomentum.label).toBe("CONFIRMED");
  expect(news.realMomentum.items).toHaveLength(3);
});
