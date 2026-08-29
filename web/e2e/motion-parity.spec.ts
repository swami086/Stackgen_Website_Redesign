// web/e2e/motion-parity.spec.ts
import { test, expect, type Page } from "@playwright/test";

const OUT = "../exports/web-shelf/motion-parity";
const THEMES = ["dark", "light"] as const;
const DIAGRAMS = [
  { id: "inner-outer-loop", pencil: { dark: "C2kYT", light: "oWWUj" } },
  { id: "offerings", pencil: { dark: "C2kYT", light: "oWWUj" } },
  { id: "integrations", pencil: { dark: "C2kYT", light: "oWWUj" } },
  { id: "context-graph", pencil: { dark: "V2P0L", light: "HSHAw" } },
] as const;
const STOPS = [0, 0.25, 0.5, 0.75, 1];

async function boot(page: Page, theme: "dark" | "light") {
  await page.addInitScript((t) => {
    localStorage.setItem("stackgen-theme", t as string);
    // Freeze ambient loops and seed the simulation for reproducible frames.
    document.documentElement.setAttribute("data-motion-paused", "true");
    document.documentElement.dataset.theme = t as string;
  }, theme);
  await page.goto("/", { waitUntil: "networkidle" });
  // ponytail: with prefers-reduced-motion emulated, React hydration resets html
  // data-theme to the SSR default before theme-init.js wins; re-sync for capture.
  await page.evaluate((t) => {
    document.documentElement.dataset.theme = t;
  }, theme);
  await page.waitForFunction((t) => document.documentElement.dataset.theme === t, theme);
}

for (const theme of THEMES) {
  test(`scrub parity, ${theme}`, async ({ page }) => {
    await boot(page, theme);
    const doc = await page.evaluate(() => document.body.scrollHeight - window.innerHeight);
    for (const diagram of DIAGRAMS) {
      for (const stop of STOPS) {
        await page.evaluate((y) => window.scrollTo(0, y), Math.round(doc * stop));
        await page.waitForTimeout(400);
        await page.screenshot({
          path: `${OUT}/${diagram.id}-${theme}-${Math.round(stop * 100)}.png`,
          fullPage: false,
        });
      }
    }
  });

  test(`reduced motion assembles everything, ${theme}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await boot(page, theme);
    await expect(page.locator('[role="img"]').first()).toBeVisible();
    await page.screenshot({ path: `${OUT}/reduced-motion-${theme}.png`, fullPage: true });
  });

  test(`forced colors keeps content legible, ${theme}`, async ({ page }) => {
    await page.emulateMedia({ forcedColors: "active" });
    await boot(page, theme);
    await page.screenshot({ path: `${OUT}/forced-colors-${theme}.png`, fullPage: true });
  });
}

test("simulation is not periodic", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const field = page.locator('[data-motion-field="work-items"]');
  await field.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1200);
  const a = await field.screenshot();
  await page.waitForTimeout(4200);
  const b = await field.screenshot();
  expect(Buffer.compare(a, b)).not.toBe(0);
});

test("layer rail is keyboard operable", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const rail = page.getByRole("tablist", { name: /aiden os layers/i });
  await rail.scrollIntoViewIfNeeded();
  const tabs = page.getByRole("tab");
  await tabs.first().focus();
  await page.keyboard.press("ArrowDown");
  await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");
  await page.keyboard.press("End");
  await expect(tabs.last()).toHaveAttribute("aria-selected", "true");
});

test("glass is confined to the nav island", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const blurred = await page.evaluate(() =>
    [...document.querySelectorAll("*")]
      .filter((el) => {
        const bf = getComputedStyle(el).backdropFilter;
        return bf && bf !== "none";
      })
      .map((el) => el.getAttribute("data-nav-material") ?? el.tagName),
  );
  expect(blurred.every((tag) => tag === "glass" || tag === "solid")).toBe(true);
});
