const CACHE_NAME = 'shringarika-v1.3';

// These paths must match exactly what is in your folder
const assets = [
  '/',
  '/index.html',
  '/about.html',
  '/programs.html',
  '/blogs.html',
  '/contact.html',
  '/testimonials.html',
  '/style.css'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // We use add() one by one instead of addAll()
      // This way, if one file fails, the whole process doesn't crash
      return Promise.all(assets.map(url => {
        return cache.add(url).catch(err => console.log('Failed to cache:', url, err));
      }));
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});