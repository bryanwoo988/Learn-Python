/* Offline service worker.

   VERSION must equal the newest entry in js/releases.js (tools/check-release.mjs
   checks it): changing it is what makes installed copies download the new build.
   A new build waits until the reader taps "Update now" (APP-STANDARDS §2).

   Two caches: the app and Python core (precached, replaced on every release) and
   the data pack (numpy, pandas, …), filled on demand and kept across releases
   until the Pyodide version changes. Every app on bryanwoo988.github.io shares
   one cache storage, so only caches with this app's prefix are ever deleted
   (APP-STANDARDS §4). */
const VERSION = '1.0.0';
const PYODIDE = '314.0.7';
const PREFIX = 'py-syntax-';
const CACHE = PREFIX + VERSION;
const PKGS = PREFIX + 'pkgs-' + PYODIDE;
const ASSETS = [
  './',
  'index.html',
  'manifest.webmanifest',
  'favicon.ico',
  'css/style.css',
  'js/icons.js',
  'js/qrcode.js',
  'js/whatsnew.js',
  'js/releases.js',
  'js/errors.js',
  'js/content/core.js',
  'js/content/beginner.js',
  'js/content/intermediate.js',
  'js/content/data.js',
  'js/content/ml.js',
  'js/engine.js',
  'js/py-worker.js',
  'js/app.js',
  'py/runtime.py',
  'vendor/pyodide/pyodide.mjs',
  'vendor/pyodide/pyodide.asm.mjs',
  'vendor/pyodide/pyodide.asm.wasm',
  'vendor/pyodide/python_stdlib.zip',
  'vendor/pyodide/pyodide-lock.json',
  'vendor/pyodide/package.json',
  'vendor/pyodide/pack.json',
  'icons/icon-32.png',
  'icons/icon-180.png',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/maskable-192.png',
  'icons/maskable-512.png'
];
const isPack = url => /\/vendor\/pyodide\/[^/]+\.(whl|zip)$/.test(url.pathname) && !url.pathname.endsWith('python_stdlib.zip');

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    // Fetched past the HTTP cache, one by one: a single failure must not block the rest.
    const results = await Promise.allSettled(ASSETS.map(url => cache.add(new Request(url, { cache: 'reload' }))));
    const failed = results.map((r, i) => (r.status === 'rejected' ? ASSETS[i] : null)).filter(Boolean);
    if (failed.length) console.warn('[sw] could not precache:', failed);
  })());
});

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter(n => n.startsWith(PREFIX) && n !== CACHE && n !== PKGS).map(n => caches.delete(n)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const req = event.request;
  const url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== self.location.origin) return;
  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE);
      const hit = await cache.match('index.html');
      if (hit) return hit;
      try { return await fetch(req); } catch (e) { return new Response('Offline', { status: 503 }); }
    })());
    return;
  }
  if (isPack(url)) {
    // Data pack: cache-first, stored on the first successful download.
    event.respondWith((async () => {
      const cache = await caches.open(PKGS);
      const hit = await cache.match(url.pathname);
      if (hit) return hit;
      const res = await fetch(req);
      if (res.ok) await cache.put(url.pathname, res.clone());
      return res;
    })());
    return;
  }
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const hit = await cache.match(req, { ignoreSearch: true });
    if (hit) return hit;
    try { return await fetch(req); } catch (e) { return new Response('', { status: 504 }); }
  })());
});
