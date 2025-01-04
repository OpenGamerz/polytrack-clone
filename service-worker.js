// Define cache names
const CACHE_NAME = "polytrack-cache-v1";

// List of assets to precache
const PRECACHE_ASSETS = [
  "/index.html",
  "/main.bundle.js",
  "/manifest.json",
  "/forced_square.json",
  "/a82f15d48dbc61b6edeb.woff2",
  "/simulation_worker.bundle.js",
  "/images/", // Example for folders; dynamic caching will handle specifics
  "/audio/",
  "/tracks/",
  "/models/"
];

// Install event - cache assets
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(PRECACHE_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Fetch event - serve from cache or fetch from network
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request).then(networkResponse => {
        return caches.open(CACHE_NAME).then(cache => {
          // Cache the new response for future requests
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      });
    })
  );
});
