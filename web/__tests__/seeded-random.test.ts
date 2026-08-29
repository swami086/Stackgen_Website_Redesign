import { mulberry32, SEEDS, pick, range } from "@/lib/seeded-random";

test("same seed yields an identical sequence", () => {
  const a = mulberry32(SEEDS.particles);
  const b = mulberry32(SEEDS.particles);
  const seqA = Array.from({ length: 20 }, () => a());
  const seqB = Array.from({ length: 20 }, () => b());
  expect(seqA).toEqual(seqB);
});

test("different seeds diverge", () => {
  const a = mulberry32(1);
  const b = mulberry32(2);
  expect(a()).not.toBe(b());
});

test("output stays in [0,1)", () => {
  const rng = mulberry32(99);
  for (let i = 0; i < 500; i++) {
    const v = rng();
    expect(v).toBeGreaterThanOrEqual(0);
    expect(v).toBeLessThan(1);
  }
});

test("pick and range are deterministic helpers", () => {
  const rng = mulberry32(7);
  const items = ["a", "b", "c"] as const;
  expect(items).toContain(pick(rng, items));
  const r = range(mulberry32(7), 10, 20);
  expect(r).toBeGreaterThanOrEqual(10);
  expect(r).toBeLessThan(20);
});
