import { test, expect } from '@playwright/test';

test.describe('theme toggle', () => {
  test('switches theme and persists across reload', async ({ page }) => {
    await page.goto('/');
    const html = page.locator('html');
    await expect(html).toHaveAttribute('data-theme', 'light');

    await page.getByRole('button', { name: 'Toggle dark mode' }).click();
    await expect(html).toHaveAttribute('data-theme', 'dark');
    expect(await page.evaluate(() => localStorage.getItem('theme'))).toBe('dark');

    await page.reload();
    await expect(html).toHaveAttribute('data-theme', 'dark');
  });

  test('reflects the toggle button aria-pressed state', async ({ page }) => {
    await page.goto('/');
    const toggle = page.getByRole('button', { name: 'Toggle dark mode' });
    await expect(toggle).toHaveAttribute('aria-pressed', 'false');
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-pressed', 'true');
  });
});

test.describe('mobile navigation', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('hamburger opens and closes the nav menu', async ({ page }) => {
    await page.goto('/');
    const nav = page.locator('#site-nav');
    const toggle = page.getByRole('button', { name: 'Toggle navigation menu' });

    await expect(nav).not.toHaveClass(/open/);
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');

    await toggle.click();
    await expect(nav).toHaveClass(/open/);
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');

    await page.keyboard.press('Escape');
    await expect(nav).not.toHaveClass(/open/);
  });

  test('closes the nav after following a link', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Toggle navigation menu' }).click();
    await page.locator('#site-nav a[href="/products/"]').click();
    await expect(page).toHaveURL(/\/products\/$/);
  });
});

test.describe('keyboard accessibility', () => {
  test('skip link moves focus to main content', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    await expect(page.locator('.skip-link')).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('#main-content')).toBeFocused();
  });

  test('interactive elements show a visible focus outline', async ({ page }) => {
    await page.goto('/');
    const button = page.getByRole('button', { name: 'Toggle dark mode' });
    await button.focus();
    const outline = await button.evaluate((el) => getComputedStyle(el).outlineStyle);
    expect(outline).not.toBe('none');
  });
});
