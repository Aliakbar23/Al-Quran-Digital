const CACHE_NAME_STATIC = 'alquran-static-v1';
const CACHE_NAME_PAGES = 'alquran-pages-v1';
const CACHE_NAME_API = 'alquran-api-v1';

const STATIC_ASSETS = [
  '/offline.html',
  '/manifest.json',
  '/icon-72x72.png',
  '/icon-96x96.png',
  '/icon-128x128.png',
  '/icon-144x144.png',
  '/icon-152x152.png',
  '/icon-192x192.png',
  '/icon-384x384.png',
  '/icon-512x512.png',
  '/apple-touch-icon.png',
  '/screenshot-mobile.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME_STATIC).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME_STATIC && key !== CACHE_NAME_PAGES && key !== CACHE_NAME_API)
            .map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

const isApiUrl = (url) => {
  return url.includes('equran.id') || url.includes('aladhan.com') || url.includes('/api/');
};

const isStaticAsset = (url) => {
  const path = new URL(url).pathname;
  return (
    path.startsWith('/_next/') ||
    path.startsWith('/static/') ||
    path.endsWith('.js') ||
    path.endsWith('.css') ||
    path.endsWith('.png') ||
    path.endsWith('.jpg') ||
    path.endsWith('.jpeg') ||
    path.endsWith('.svg') ||
    path.endsWith('.ico') ||
    path.endsWith('.woff2')
  );
};

self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = request.url;

  if (request.method !== 'GET') return;

  // 1. Network-First Strategy for API calls
  if (isApiUrl(url)) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.status === 200) {
            const copy = response.clone();
            caches.open(CACHE_NAME_API).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => {
          return caches.match(request);
        })
    );
    return;
  }

  // 2. Cache-First Strategy for Static Assets
  if (isStaticAsset(url)) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) return cachedResponse;
        return fetch(request).then((response) => {
          if (response.status === 200) {
            const copy = response.clone();
            caches.open(CACHE_NAME_STATIC).then((cache) => cache.put(request, copy));
          }
          return response;
        });
      })
    );
    return;
  }

  // 3. Stale-While-Revalidate for Page Navigations with Offline Fallback
  if (request.mode === 'navigate') {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        const fetchPromise = fetch(request)
          .then((networkResponse) => {
            if (networkResponse.status === 200) {
              const copy = networkResponse.clone();
              caches.open(CACHE_NAME_PAGES).then((cache) => cache.put(request, copy));
            }
            return networkResponse;
          })
          .catch(() => {
            return caches.match('/offline.html');
          });
        return cachedResponse || fetchPromise;
      })
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        fetch(request).then((networkResponse) => {
          if (networkResponse.status === 200) {
            caches.open(CACHE_NAME_STATIC).then((cache) => cache.put(request, networkResponse));
          }
        }).catch(() => {});
        return cachedResponse;
      }
      return fetch(request).then((networkResponse) => {
        if (networkResponse.status === 200) {
          const copy = networkResponse.clone();
          caches.open(CACHE_NAME_STATIC).then((cache) => cache.put(request, copy));
        }
        return networkResponse;
      });
    })
  );
});

// AZAN PUSH NOTIFICATION HANDLER
self.addEventListener('push', (event) => {
  let data = {
    title: 'Waktunya Salat',
    body: 'Mari tunaikan ibadah salat.',
    icon: '/icon-192x192.png',
    tag: 'azan-notification'
  };

  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data.body = event.data.text();
    }
  }

  const options = {
    body: data.body,
    icon: data.icon || '/icon-192x192.png',
    badge: '/icon-72x72.png',
    vibrate: [200, 100, 200, 100, 200, 100, 400],
    tag: data.tag || 'azan-notification',
    renotify: true,
    requireInteraction: true,
    data: {
      url: '/'
    }
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// NOTIFICATION CLICK HANDLER
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('/');
      }
    })
  );
});
