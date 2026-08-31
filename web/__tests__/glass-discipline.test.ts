import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.tsx?$/.test(p)) out.push(p);
  }
  return out;
}

test("globals.css defines all three material tiers", () => {
  const css = readFileSync("app/globals.css", "utf8");
  expect(css).toContain(".glass-real");
  expect(css).toContain(".glass-specular");
  expect(css).toContain(".glow-source");
  expect(css).toContain(".glass-tile");
  expect(css).toContain(".glass-hub-shine");
  expect(css).toContain('svg[data-neural="mesh"]');
});

test("globals.css light glass-specular uses stronger edge definition", () => {
  const css = readFileSync("app/globals.css", "utf8");
  expect(css).toContain(':root[data-theme="light"] .glass-specular');
  expect(css).toContain("layer-intent-bg");
  expect(css).toContain(':root[data-theme="light"] .glass-hub-shine::after');
  expect(css).toContain(
    ':root[data-theme="light"] [data-who-roles].glass-specular',
  );
  expect(css).toContain(
    ':root[data-theme="light"] [data-who-os].glass-specular',
  );
});


test("globals.css caps non–Liquid-Glass blur at 24px; Tier-1 may go to 48", () => {
  const css = readFileSync("app/globals.css", "utf8");
  // Strip Tier-1 liquid glass blocks — Apple Liquid Glass needs heavier frost.
  const withoutTier1 = css
    .replace(/\.glass-real[\s\S]*?(?=\/\* --- Tier 2)/, "")
    .replace(/\.glass-real-dense[\s\S]*?(?=\/\*\n \* Scroll edge)/, "")
    .replace(
      /:root\[data-theme="light"\] \[data-liquid-variant="clear"\]\.glass-real[\s\S]*?(?=\/\*\n \* Scroll edge|\.nav-scroll-edge)/,
      "",
    );
  const tier1Blurs = [
    ...css.matchAll(
      /\.glass-real[\s\S]*?backdrop-filter:\s*blur\((\d+)px\)/g,
    ),
  ].map((m) => Number(m[1]));
  const otherBlurs = [...withoutTier1.matchAll(/blur\((\d+)px\)/g)].map((m) =>
    Number(m[1]),
  );
  expect(tier1Blurs.length).toBeGreaterThan(0);
  for (const b of tier1Blurs) expect(b).toBeLessThanOrEqual(48);
  for (const b of otherBlurs) expect(b).toBeLessThanOrEqual(24);
});

test("globals.css defines light-theme Liquid Glass materials", () => {
  const css = readFileSync("app/globals.css", "utf8");
  expect(css).toContain(':root[data-theme="light"] .glass-real');
  expect(css).toContain(':root[data-theme="light"] .glass-real-dense');
  expect(css).toContain(':root[data-theme="light"] .nav-scroll-edge');
});

test("globals.css themes every browser surface", () => {
  const css = readFileSync("app/globals.css", "utf8");
  for (const token of [
    "::selection",
    "caret-color",
    "scrollbar-color",
    ":focus-visible",
    "text-underline-offset",
    "tabular-nums",
  ]) {
    expect(css).toContain(token);
  }
});

test("globals.css provides reduced-transparency and forced-colors fallbacks", () => {
  const css = readFileSync("app/globals.css", "utf8");
  expect(css).toContain("prefers-reduced-transparency");
  expect(css).toContain("forced-colors");
});

test("no component outside nav and overlays uses backdrop-filter", () => {
  const allowed = /(Nav|Overlay|MegaMenu)\.tsx$/;
  const offenders = walk("components")
    .filter((p) => !allowed.test(p))
    .filter((p) => /backdrop-(filter|blur)/.test(readFileSync(p, "utf8")));
  expect(offenders).toEqual([]);
});
