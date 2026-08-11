#!/usr/bin/env node
// Minimal static file server for dist/, used only to run the Playwright
// suite. `astro preview` self-daemonizes (spawns a detached server and
// exits immediately), which Playwright's webServer can't track as "still
// running" — this stays attached in the foreground instead.
import { createReadStream, existsSync, statSync } from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const distDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '..', 'dist');
const port = Number(process.argv[2] ?? process.env.PORT ?? 4173);

const CONTENT_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.webmanifest': 'application/manifest+json',
};

function resolveFile(urlPath) {
  const decoded = decodeURIComponent(urlPath.split('?')[0]);
  let candidate = path.join(distDir, decoded);

  if (existsSync(candidate) && statSync(candidate).isDirectory()) {
    candidate = path.join(candidate, 'index.html');
  }
  if (!existsSync(candidate) && !path.extname(candidate)) {
    candidate = `${candidate}.html`;
  }
  return existsSync(candidate) && statSync(candidate).isFile() ? candidate : null;
}

const server = http.createServer((req, res) => {
  const file = resolveFile(req.url ?? '/');

  if (!file) {
    const notFound = path.join(distDir, '404.html');
    res.writeHead(404, { 'Content-Type': CONTENT_TYPES['.html'] });
    if (existsSync(notFound)) {
      createReadStream(notFound).pipe(res);
    } else {
      res.end('404 Not Found');
    }
    return;
  }

  const type = CONTENT_TYPES[path.extname(file)] ?? 'application/octet-stream';
  res.writeHead(200, { 'Content-Type': type });
  createReadStream(file).pipe(res);
});

server.listen(port, () => {
  console.log(`Static preview server serving dist/ at http://localhost:${port}`);
});
