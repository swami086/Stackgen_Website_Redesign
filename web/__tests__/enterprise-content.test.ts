import enterprise from "@/content/enterprise";

test("enterprise hero has heading and body", () => {
  expect(enterprise.hero.heading.length).toBeGreaterThan(0);
  expect(enterprise.hero.body.length).toBeGreaterThan(0);
});

test("enterprise exposes all section keys from spec", () => {
  for (const key of [
    "hero",
    "metrics",
    "capabilities",
    "compliance",
    "testimonial",
    "finalCta",
    "footer",
  ] as const) {
    expect(enterprise[key]).toBeDefined();
  }
});

test("enterprise metrics has four stats with mech copy", () => {
  expect(enterprise.metrics.stats).toHaveLength(4);
  for (const stat of enterprise.metrics.stats) {
    expect(stat.mech.length).toBeGreaterThan(0);
  }
});

test("enterprise capabilities has six items", () => {
  expect(enterprise.capabilities.items).toHaveLength(6);
});
