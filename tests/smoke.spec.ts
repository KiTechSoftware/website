import { test, expect } from '@playwright/test';
import { readRoutes } from './utils/read-routes';

for (const route of readRoutes()) {
  test.describe(`smoke: ${route}`, () => {
    test('loads with the expected document shape', async ({ page }) => {
      const response = await page.goto(route);
      expect(response?.status(), `${route} should respond 200`).toBe(200);

      await expect(page).toHaveTitle(/.+/);

      const description = page.locator('meta[name="description"]');
      await expect(description).toHaveCount(1);
      expect(await description.getAttribute('content')).toBeTruthy();

      await expect(page.locator('html')).toHaveAttribute('lang', /.+/);

      // Exactly one h1 in the document, even where it's visually hidden
      // (legal pages hide the redundant markdown h1 via CSS).
      await expect(page.locator('h1')).toHaveCount(1);

      // Every page shares the same header/footer chrome.
      await expect(page.locator('a.brand').first()).toBeVisible();
      await expect(page.locator('footer.site-footer')).toHaveCount(1);
    });
  });
}

test('404 route actually returns HTTP 404', async ({ page }) => {
  const response = await page.goto('/this-page-does-not-exist/');
  expect(response?.status()).toBe(404);
  await expect(page.locator('h1')).toContainText(/not found/i);
});
