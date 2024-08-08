const CACHE_NAME = "news-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/vite.svg",
  "/imgs/logo.svg",
  "/article-content",
  "/fonts/Raleway-Bold.ttf",
  "/fonts/Raleway-Bold.woff",
  "/fonts/Raleway-Bold.woff2",
  "/fonts/Raleway-Regular.ttf",
  "/fonts/Raleway-Regular.woff",
  "/fonts/Raleway-Regular.woff2",
  "/fonts/Raleway-Medium.ttf",
  "/fonts/Raleway-Medium.woff",
  "/fonts/Raleway-Medium.woff2",
];

// const urlsToCache = [
//   "/",
//   "/index.html",
//   "/vite.svg",
//   "/static/js/bundle.js",
//   "/static/js/main.chunk.js",
//   "/static/js/0.chunk.js",
//   "/article-content",
// ];
async function fetchManifest() {
  try {
    const response = await fetch("/manifest.json");
    console.log("🚀 ~ fetchManifest ~ response:", response);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const manifest = await response.json();
    console.log("🚀 ~ fetchManifest ~ manifest:", manifest);

    const files = [
      ...Object.values(manifest).map((entry) => `/${entry.file}`),
      manifest["index.html"]?.css,
    ];
    return files;
  } catch (error) {
    console.error("Failed to fetch manifest:", error);
    return [];
  }
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    fetchManifest()
      .then(async (files) => {
        const cache = await caches.open(CACHE_NAME);
        return await cache.addAll([...urlsToCache, ...files]);
      })
      .catch((err) => {
        console.log(err, "Catched error");
      }),
  );
  self.skipWaiting(); // Esto hará que el Service Worker se active inmediatamente después de la instalación
});

self.addEventListener("fetch", (event) => {
  if (!navigator.onLine) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      }),
    );
  } else {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, response.clone());
            return response;
          });
        })
        .catch(() => {
          return caches.match(event.request);
        }),
    );
  }
});
