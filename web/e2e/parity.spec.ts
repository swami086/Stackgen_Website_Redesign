import { test } from '@playwright/test';

const ROUTES: [string, string][] = [
  ['/', 'home'],
  ['/product/aiden-for-infrastructure', 'product-infrastructure'],
  ['/product/aiden-for-automation', 'product-automation'],
  ['/product/aiden-for-observability', 'product-observability'],
  ['/product/aiden-for-sre', 'product-sre'],
  ['/platform', 'platform'],
  ['/case-studies', 'case-index'],
  ['/case-studies/greythr', 'case-greythr'],
  ['/case-studies/innovaccer', 'case-innovaccer'],
  ['/schedule-demo', 'schedule-demo'],
];

for (const [route, name] of ROUTES) {
  test(`capture ${name}`, async ({ page }) => {
    await page.goto(route, { waitUntil: 'networkidle' });
    await page.screenshot({ path: `../design-reference/actual/${name}.png`, fullPage: true });
  });
}
