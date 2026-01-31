const CACHE_NAME = "mufradat-pwa-v2"; // GANTI SETIAP UPDATE BESAR
const ASSETS = [
  "/",
  "/index.html",
  "css/main.css",
  "css/responsive.css",
  "js/app.js",
  "js/data.js",
  "js/form.js",
  "js/search.js",
  "js/sort.js",
  "js/utils.js",
  "/manifest.json",
  "assets/icons/icon-192.png",
  "assets/icons/icon-512.png"
];

// Install
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activate (hapus cache lama)
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Fetch
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(res => {
      return res || fetch(event.request);
    })
  );
});
