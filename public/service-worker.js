const CACHE_NAME = "news-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/vite.svg",
  "/imgs/logo.svg",
  "/article-content",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
      .catch((err) => {
        console.log(err, "aca el error");
      }),
  );
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
        .catch((e) => {
          console.log("catched error, ", e, event.request);
          return caches.match(event.request);
        }),
    );
  }
});
