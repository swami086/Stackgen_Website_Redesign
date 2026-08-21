import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const ROUTES = [
  '/',
  '/product/aiden-for-infrastructure',
  '/product/aiden-for-automation',
  '/product/aiden-for-observability',
  '/product/aiden-for-sre',
  '/platform',
  '/case-studies',
  '/case-studies/greythr',
  '/case-studies/innovaccer',
  '/schedule-demo',
  '/pricing',
];

for (const route of ROUTES) {
  test(`a11y ${route}`, async ({ page }, testInfo) => {
    await page.goto(route, { waitUntil: 'networkidle' });
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();
    await testInfo.attach(`axe-${route.replace(/\//g, '_')}.json`, {
      body: JSON.stringify(results.violations, null, 2),
      contentType: 'application/json',
    });
    expect(results.violations).toEqual([]);
  });
}
