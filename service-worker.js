importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js"
);

const { registerRoute } = workbox.routing;
const { StaleWhileRevalidate, NetworkFirst } = workbox.strategies;
const { CacheableResponsePlugin } = workbox.cacheableResponse;
const { precacheAndRoute } = workbox.precaching;

precacheAndRoute([
  { url: "/index.html", revision: "18" },
  { url: "/manifest.webmanifest", revision: "17" },
  { url: "https://unpkg.com/notyf@3.6.0/notyf.min.css", revision: null },
  {
    url: "https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-window.prod.mjs",
    revision: null,
  },
]);

registerRoute(
  ({ url }) => url.origin === "https://cdn.pika.dev",
  new NetworkFirst({
    cacheName: "pika-skypack",
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

registerRoute(
  ({ request }) => request.destination === "image",
  new NetworkFirst({
    cacheName: "images",
    plugins: [
      new CacheableResponsePlugin({
        statuses: [200],
      }),
    ],
  })
);
