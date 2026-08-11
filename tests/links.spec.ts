import { test, expect, type APIRequestContext } from '@playwright/test';
import { readRoutes } from './utils/read-routes';

const statusCache = new Map<string, number>();

async function statusOf(request: APIRequestContext, path: string): Promise<number> {
  if (!statusCache.has(path)) {
    const res = await request.get(path);
    statusCache.set(path, res.status());
  }
  return statusCache.get(path)!;
}

for (const route of readRoutes()) {
  test(`internal links resolve: ${route}`, async ({ page, request }) => {
    await page.goto(route);

    const hrefs = await page.locator('a[href]').evaluateAll((els) => els.map((el) => el.getAttribute('href')));

    for (const href of hrefs) {
      if (!href || href.startsWith('mailto:') || href.startsWith('tel:')) continue;

      if (href.startsWith('http')) {
        // External link — only assert it targets a new tab safely, don't hit the network.
        const link = page.locator(`a[href="${href}"]`).first();
        if (await link.getAttribute('target') === '_blank') {
          const rel = (await link.getAttribute('rel')) ?? '';
          expect(rel, `external link ${href} on ${route} should have rel="noopener"`).toContain('noopener');
        }
        continue;
      }

      const [pathPart] = href.split('#');
      if (pathPart === '') continue; // pure in-page anchor, checked separately below

      const status = await statusOf(request, pathPart);
      expect(status, `${route} links to ${href} which responded ${status}`).toBeLessThan(400);
    }
  });
}

test('homepage in-page anchors resolve to real ids', async ({ page }) => {
  await page.goto('/');
  const anchorLinks = await page
    .locator('a[href^="#"]')
    .evaluateAll((els) => els.map((el) => el.getAttribute('href')!.slice(1)));

  for (const id of anchorLinks) {
    await expect(page.locator(`#${id}`), `#${id} should exist on the homepage`).toHaveCount(1);
  }
});

test('every mailto link has a non-empty address', async ({ page }) => {
  await page.goto('/');
  const mailtos = await page
    .locator('a[href^="mailto:"]')
    .evaluateAll((els) => els.map((el) => el.getAttribute('href')));
  expect(mailtos.length).toBeGreaterThan(0);
  for (const href of mailtos) {
    expect(href).toMatch(/^mailto:[^?]+@[^?]+/);
  }
});
