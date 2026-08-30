import { test, expect } from "@playwright/test";

test("docs hub and three product pages render", async ({ page }) => {
  await page.goto("/docs");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Get Started");
  await page.goto("/docs/stackgen/concepts/appstacks");
  await expect(page.locator("body")).toContainText("appStack");
  await page.goto("/docs/aiden/2.0");
  await expect(page.locator("body")).not.toContainText("AccessDenied");
  await page.goto("/docs/observenow");
  await expect(page.locator("body")).toContainText("ObserveNow");
});
