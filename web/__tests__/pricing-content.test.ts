import pricing from "@/content/pricing";

test("pricing hero has heading and body", () => {
  expect(pricing.hero.heading.length).toBeGreaterThan(0);
  expect(pricing.hero.body.length).toBeGreaterThan(0);
});

test("pricing exposes all section keys from spec", () => {
  for (const key of [
    "hero",
    "pricingModel",
    "publicWebRules",
    "faq",
    "footer",
  ] as const) {
    expect(pricing[key]).toBeDefined();
  }
});

test("pricing public web rules copy is canvas-exact", () => {
  expect(pricing.publicWebRules.heading).toBe(
    "No modeled ROI dollars on this page.",
  );
  expect(pricing.publicWebRules.body).toContain(
    "Slide-style annual value figures stay in sales materials",
  );
});

test("pricing faq has three canvas-exact Q&A pairs", () => {
  expect(pricing.faq.items).toHaveLength(3);
  expect(pricing.faq.items[0]?.question).toBe("Do you publish list prices?");
  expect(pricing.faq.items[1]?.question).toBe("Can we run air-gapped?");
  expect(pricing.faq.items[2]?.question).toBe(
    "What is included in the platform fee?",
  );
});
