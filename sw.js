const CACHE = 'my-memory-v2';
const ASSETS = ['./', './index.html', './app.js', './styles.css', './manifest.webmanifest', './apple-touch-icon.png',
  './icons/icon.svg', './icons/icon-192.png', './icons/icon-512.png', './icons/icon-maskable-512.png'];

/* The worker is registered from the repo root, so its scope is the whole
   GitHub Pages site. Only the memory app's own files are cached. Everything
   else (demos, mylavaram, dance-studio, unity, …) goes straight to the network
   and is never replaced with the memory app shell. */
function isMemoryAsset(url) {
  try {
    var scope = new URL(self.registration.scope);
    if (url.origin !== scope.origin) return false;
    var base = scope.pathname.endsWith('/') ? scope.pathname : scope.pathname + '/';
    if (url.pathname.indexOf(base) !== 0) return false;
    var rel = decodeURIComponent(url.pathname.slice(base.length));
    if (rel.indexOf('..') >= 0) return false;
    if (rel === '' || rel === 'index.html' || rel === 'app.js' || rel === 'styles.css' ||
        rel === 'manifest.webmanifest' || rel === 'apple-touch-icon.png') return true;
    return rel.indexOf('icons/') === 0;
  } catch (err) {
    return false;
  }
}

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  if (!isMemoryAsset(new URL(req.url))) return;
  e.respondWith(caches.match(req, { ignoreSearch: true }).then(hit => {
    const net = fetch(req).then(res => {
      if (res && res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
      return res;
    }).catch(() => hit);
    return hit || net.then(r => r || caches.match('./index.html'));
  }));
});
