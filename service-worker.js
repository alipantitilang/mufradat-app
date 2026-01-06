// =========================
// SERVICE WORKER - MUFRADAT APP
// =========================

const CACHE_NAME = "mufradat-cache-v1";

// file inti yang wajib di-cache
const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/manifest.json",

  "/css/main.css",
  "/css/responsive.css",

  "/js/app.js",
  "/js/data.js",
  "/js/form.js",
  "/js/search.js",
  "/js/sort.js",
  "/js/utils.js"
];

// =========================
// INSTALL
// =========================
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// =========================
// ACTIVATE
// =========================
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// =========================
// FETCH (CACHE FIRST)
// =========================
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
