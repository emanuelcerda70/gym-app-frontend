/** @type {import('next').NextConfig} */
const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  cacheOnFrontEndNav: false,
  aggressiveFrontEndNavCaching: false,
  reloadOnOnline: true,
  workboxOptions: {
    disableDevLogs: true,
    runtimeCaching: [
      {
        urlPattern: ({ url }) =>
          url.pathname.startsWith("/sign-in") ||
          url.pathname.startsWith("/sign-up") ||
          url.pathname.startsWith("/dashboard"),
        handler: "NetworkOnly",
        method: "GET",
      },
    ],
  },
})

const nextConfig = {}

module.exports = withPWA(nextConfig)