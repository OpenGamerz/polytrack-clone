const CACHE_NAME = "polytrack-cache-v1";
const PRECACHE_ASSETS = [
  "/index.html",
  "/main.bundle.js",
  "/simulation_worker.bundle.js",
  "/README.md",
  "/manifest.json",
  "/forcedsquare.json",
  "/a82f15d48dbc61b6edeb.woff2",
  "/tracks/track1.track",
  "/tracks/track2.track",
  "/tracks/track3.track",
  "/tracks/track4.track",
  "/tracks/track5.track",
  "/tracks/track6.track",
  "/tracks/track7.track",
  "/tracks/track8.track",
  "/tracks/track9.track",
  "/tracks/track10.track",
  "/tracks/track11.track",
  "/tracks/track12.track",
  "/tracks/track13.track",
  "/models/block.glb",
  "/models/car.glb",
  "/models/pillar.glb",
  "/models/plane.glb",
  "/models/road_wide.glb",
  "/models/road.glb",
  "/models/signs.glb",
  "/models/wall_track.glb",
  "/lib/ammo.wasm.js",
  "/lib/ammo.wasm.wasm",
  "/images/apply.svg",
  "/images/arrow_down.svg",
  "/images/arrow_left.svg",
  "/images/arrow_right.svg",
  "/images/arrow_up.svg",
  "/images/back.svg",
  "/images/cancel.svg",
  "/images/car_stripe.svg",
  "/images/checkpoint.svg",
  "/images/clouds.jpg",
  "/images/copy.svg",
  "/images/customize.svg",
  "/images/delete.svg",
  "/images/discord.svg",
  "/images/editor.svg",
  "/images/erase.svg",
  "/images/export.svg",
  "/images/helmet.svg",
  "/images/help.svg",
  "/images/icon.svg",
  "/images/import.svg",
  "/images/load.svg",
  "/images/logo.svg",
  "/images/pause.svg",
  "/images/pin.svg",
  "/images/play.svg",
  "/images/preview.svg",
  "/images/quit.svg",
  "/images/random.svg",
  "/images/reset_settings.svg",
  "/images/reset.svg",
  "/images/rotate.svg",
  "/images/save.svg",
  "/images/settings.svg",
  "/images/smoke.png",
  "/images/state_invalid.svg",
  "/images/state_pending.svg",
  "/images/state_verified.svg",
  "/images/test.svg",
  "/images/verified.svg",
  "/audio/checkpoin.flac",
  "/audio/click.flac",
  "/audio/collision.flac",
  "/audio/editor_edit.flac",
  "/audio/engine.flac",
  "/audio/music.mp3",
  "/audio/skidding.flac",
  "/audio/suspension.flac",
  "/audio/tires.flac"
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
  self.clients.claim();
});

// Fetch event - serve from cache or fetch from network
self.addEventListener("fetch", event => {
  // Match requests in cache
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;  // Serve from cache if found
      }

      // Otherwise, try to fetch from the network
      return fetch(event.request).then(networkResponse => {
        // If the network response is successful, cache it for future use
        return caches.open(CACHE_NAME).then(cache => {
          if (networkResponse && networkResponse.status === 200) {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;  // Return the network response
        });
      }).catch(err => {
        // Network is unavailable (offline mode), return fallback or nothing.
        console.log("Fetch failed; returning fallback", err);
        
        // If you want to ensure that assets are still served even when offline,
        // you should cache them during install, or do a more complex fallback.
        // For example, for images, JS, CSS, etc., you'd want to have cached resources.
        
        // If you want to return nothing on failure (just keep empty responses),
        // you can do something like:
        // return new Response('Offline', {status: 503});
      });
    })
  );
});

// Register service worker update event
self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});
