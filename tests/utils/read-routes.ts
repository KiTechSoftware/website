import { execSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, rmdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const sitemapPath = path.join(rootDir, 'dist', 'sitemap-0.xml');
const lockDir = path.join(rootDir, '.routes-build.lock');

let built = false;

/**
 * Ensures dist/ is built exactly once, even though every parallel Playwright
 * worker independently re-imports this module (each worker re-executes a
 * spec file's top-level code to register its tests, including the
 * `for (const route of readRoutes())` loops). mkdirSync is atomic, so it
 * doubles as a cross-process lock: exactly one process wins the race to
 * create it and runs the build; the rest poll until it's gone.
 */
function ensureBuilt() {
  if (built || existsSync(sitemapPath)) {
    built = true;
    return;
  }
  try {
    mkdirSync(lockDir);
  } catch {
    while (existsSync(lockDir)) {
      execSync('sleep 0.2');
    }
    built = true;
    return;
  }
  try {
    execSync('npm run build', { cwd: rootDir, stdio: 'inherit' });
  } finally {
    rmdirSync(lockDir);
  }
  built = true;
}

/**
 * Discovers every published page from the built sitemap (rather than a
 * hardcoded list) so the suite stays correct as pages are added or removed.
 * Read directly from the static dist/ output — at spec-file collection time
 * (when this runs) the preview webServer isn't guaranteed to be up yet, so
 * this can't fetch over HTTP.
 *
 * Deliberately excludes the 404 page: it's a fallback file (dist/404.html),
 * not a route with its own URL, so it doesn't behave like the rest of this
 * list (visiting "/404/" directly 404s, same as any other unmatched path).
 * It has its own dedicated tests instead.
 */
export function readRoutes(): string[] {
  ensureBuilt();
  const xml = readFileSync(sitemapPath, 'utf-8');
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const paths = locs.map((loc) => new URL(loc).pathname);
  const routes = [...new Set(paths)].sort();

  if (routes.length < 25) {
    throw new Error(`Sitemap only yielded ${routes.length} routes — expected ~29. dist/ may be stale; try npm run build.`);
  }

  return routes;
}
