import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  timeout: 30_000,
  use: {
    baseURL: 'http://localhost:4173',
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: {
    // A plain static server, not `astro preview`: astro's preview/dev
    // commands self-daemonize (spawn a detached server, then the invoking
    // process exits immediately), which Playwright can't track as "still
    // running". Dedicated port + no reuse also keeps this from ever being
    // confused with astro dev's :4321, whose dev-only toolbar injects
    // extra DOM (e.g. duplicate <h1>s) that would break assertions.
    command: 'npm run build && node tests/utils/static-server.mjs 4173',
    url: 'http://localhost:4173',
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
