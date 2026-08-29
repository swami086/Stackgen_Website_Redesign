import { EASE, EASE_CSS, DUR, STAGGER, AMBIENT, capStagger } from "@/lib/motion-tokens";

test("easings match the canvas-harvested curves", () => {
  expect(EASE.emphasize).toEqual([0.16, 1, 0.3, 1]);
  expect(EASE.standard).toEqual([0.4, 0, 0.2, 1]);
  expect(EASE_CSS.emphasize).toBe("cubic-bezier(0.16, 1, 0.3, 1)");
});

test("durations and staggers match Pencil node names in seconds", () => {
  expect(DUR.chip).toBeCloseTo(0.18);
  expect(DUR.shell).toBeCloseTo(0.52);
  expect(STAGGER.chip).toBeCloseTo(0.04);
  expect(STAGGER.orbit).toBeCloseTo(0.08);
  expect(STAGGER.shell).toBeCloseTo(0.16);
  expect(AMBIENT.orbit).toBe(18);
  expect(AMBIENT.bezel).toBeCloseTo(3.2);
});

test("capStagger bounds total delay", () => {
  expect(capStagger(9, STAGGER.chip)).toBeCloseTo(0.04);
  expect(capStagger(100, STAGGER.chip, 0.4)).toBeCloseTo(0.4 / 99);
});
