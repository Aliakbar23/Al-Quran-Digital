const CACHE_NAME = "quran-pwa-cache-v2";
const ASSETS_TO_CACHE = [
  "/",
  "/manifest.json",
  "/icon-192.png",
  "/icon-512.png",
];

// Install Event: Melakukan caching aset statis dasar dan memaksa aktif langsung
self.addEventListener("install", (event) => {
  console.log("Service Worker: Installing...");
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("Service Worker: Caching static assets...");
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => self.skipWaiting()) // skipWaiting memaksa SW baru langsung aktif menggantikan SW lama
  );
});

// Activate Event: Membersihkan cache lama dan mengambil kendali seluruh tab/klien
self.addEventListener("activate", (event) => {
  console.log("Service Worker: Activating...");
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cache) => {
            if (cache !== CACHE_NAME) {
              console.log("Service Worker: Clearing Old Cache", cache);
              return caches.delete(cache);
            }
          })
        );
      })
      .then(() => self.clients.claim()) // claim memaksa seluruh tab langsung dikendalikan oleh SW baru
  );
});

// Fetch Event: Menerapkan strategi Stale-While-Revalidate untuk performa offline
self.addEventListener("fetch", (event) => {
  const req = event.request;

  // Lewati caching sepenuhnya di localhost demi kenyamanan local development (HMR / Hot Module Replacement)
  const isLocalhost = self.location.hostname === "localhost" || self.location.hostname === "127.0.0.1";
  if (isLocalhost) {
    return;
  }

  // Hanya layani request GET untuk internal origin (menghindari caching API eksternal dinamis secara langsung)
  if (req.method !== "GET" || !req.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(req).then((cachedResponse) => {
      if (cachedResponse) {
        // Ambil versi terbaru di latar belakang untuk memperbarui cache
        fetch(req)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(req, networkResponse);
              });
            }
          })
          .catch(() => {
            // Abaikan kegagalan jaringan di background
          });
        return cachedResponse;
      }

      // Jika tidak ada di cache, lakukan fetch ke jaringan
      return fetch(req).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== "basic") {
          return networkResponse;
        }

        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(req, responseToCache);
        });

        return networkResponse;
      });
    })
  );
});

// Notification Click Event: Klik notifikasi memfokuskan tab dan menghentikan suara adzan
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url && "focus" in client) {
          client.postMessage({ action: "stopAdhan" });
          return client.focus();
        }
      }
      if (self.clients.openWindow) {
        return self.clients.openWindow("/");
      }
    })
  );
});

// Notification Close Event: Geser (dismiss/swipe away) notifikasi di HP mematikan suara adzan
self.addEventListener("notificationclose", (event) => {
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      clientList.forEach((client) => {
        client.postMessage({ action: "stopAdhan" });
      });
    })
  );
});
