import {
  NAV_SCROLL_DENSITY_DEFAULTS,
  nextNavScrolled,
} from "@/lib/nav-scroll-density";

const { compactY, expandY, dirDelta } = NAV_SCROLL_DENSITY_DEFAULTS;

test("always expanded at / near top", () => {
  expect(nextNavScrolled(true, 0, 10)).toBe(false);
  expect(nextNavScrolled(true, expandY, 20)).toBe(false);
});

test("scroll-down past compactY enters scrolled", () => {
  expect(nextNavScrolled(false, compactY, dirDelta + 1)).toBe(true);
  expect(nextNavScrolled(false, 200, 40)).toBe(true);
});

test("scroll-up expands even mid-page (Apple onScrollDown inverse)", () => {
  expect(nextNavScrolled(true, 400, -(dirDelta + 1))).toBe(false);
});

test("micro jitter does not flip state", () => {
  expect(nextNavScrolled(true, 400, dirDelta - 1)).toBe(true);
  expect(nextNavScrolled(false, 400, dirDelta - 1)).toBe(false);
  expect(nextNavScrolled(true, 400, 1)).toBe(true);
  expect(nextNavScrolled(false, 400, -1)).toBe(false);
});

test("hysteresis: between expandY and compactY keeps prior unless direction wins", () => {
  const mid = Math.floor((expandY + compactY) / 2);
  expect(nextNavScrolled(false, mid, 2)).toBe(false);
  expect(nextNavScrolled(true, mid, 2)).toBe(true);
  // Strong down before compactY still keeps expanded (need y >= compactY)
  expect(nextNavScrolled(false, mid, 40)).toBe(false);
});
