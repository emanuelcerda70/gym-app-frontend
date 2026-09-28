/** @type {import('next').NextConfig} */
const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  cacheOnFrontEndNav: false,
  aggressiveFrontEndNavCaching: false,
  reloadOnOnline: true,
  publicExcludes: ["!animaciones/*.mp4"],
  workboxOptions: {
    disableDevLogs: true,
    runtimeCaching: [
      {
        urlPattern: /\/animaciones\/.*\.mp4$/i,
        handler: "CacheFirst",
        method: "GET",
        options: {
          cacheName: "videos-on-demand",
          cacheableResponse: { statuses: [0, 200] },
          expiration: { maxEntries: 20, maxAgeSeconds: 31536000 },
          rangeRequests: true,
        },
      },
      {
        urlPattern: ({ url }) =>
          url.pathname.startsWith("/sign-in") ||
          url.pathname.startsWith("/sign-up"),
        handler: "NetworkOnly",
        method: "GET",
      },
      {
        urlPattern: ({ url }) => url.pathname.startsWith("/dashboard"),
        handler: "NetworkFirst",
        method: "GET",
        options: {
          cacheName: "dashboard-pages",
          networkTimeoutSeconds: 3,
          cacheableResponse: { statuses: [0, 200] },
        },
      },
    ],
  },
})

const nextConfig = {}

module.exports = withPWA(nextConfig)