const CACHE = 'varios-v3';
const ASSETS = [
  '/varios-app/',
  '/varios-app/index.html',
  '/varios-app/manifest.json',
  '/varios-app/icon-192.png',
  '/varios-app/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS).catch(() => {}))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request)
      .catch(() => caches.match(e.request))
  );
});
