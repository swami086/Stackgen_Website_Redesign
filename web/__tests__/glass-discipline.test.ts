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
});

test("globals.css caps blur at 24px", () => {
  const css = readFileSync("app/globals.css", "utf8");
  const blurs = [...css.matchAll(/blur\((\d+)px\)/g)].map((m) => Number(m[1]));
  expect(blurs.length).toBeGreaterThan(0);
  for (const b of blurs) expect(b).toBeLessThanOrEqual(24);
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
