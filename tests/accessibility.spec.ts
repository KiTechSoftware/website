import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readRoutes } from './utils/read-routes';

const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

async function assertNoViolations(page: import('@playwright/test').Page, label: string) {
  const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
  const summary = results.violations.map(
    (v) => `${v.id} (${v.impact}): ${v.help} — ${v.nodes.length} node(s): ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`,
  );
  expect(summary, `${label} — axe violations`).toEqual([]);
}

for (const route of readRoutes()) {
  test(`a11y (light): ${route}`, async ({ page }) => {
    await page.goto(route);
    await assertNoViolations(page, `${route} [light]`);
  });

  test(`a11y (dark): ${route}`, async ({ page }) => {
    // Set the theme before the page's own FOUC-prevention script runs so
    // dark styles are applied on first paint — flipping data-theme *after*
    // load would be caught mid CSS-transition and produce false positives.
    await page.addInitScript(() => localStorage.setItem('theme', 'dark'));
    await page.goto(route);
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    await assertNoViolations(page, `${route} [dark]`);
  });
}

// The 404 page isn't in readRoutes() (see its comment there) — visited via
// a genuinely unmatched path instead, same as smoke.spec.ts's 404 test.
test('a11y: 404 page', async ({ page }) => {
  await page.goto('/this-page-does-not-exist/');
  await assertNoViolations(page, '404 page');
});
