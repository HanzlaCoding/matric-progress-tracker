import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Disable Turbopack to use webpack with next-pwa
  webpack: {
    enabled: true,
  },
  turbopack: {}
};

const runtimeCaching = [
  {
    urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,
    handler: 'CacheFirst',
    options: {
      cacheName: 'google-fonts',
      expiration: {
        maxEntries: 20,
        maxAgeSeconds: 60 * 60 * 24 * 365,
      },
    },
  },
  {
    urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/.*/i,
    handler: 'CacheFirst',
    options: {
      cacheName: 'cdn-cache',
      expiration: {
        maxEntries: 32,
        maxAgeSeconds: 60 * 60 * 24 * 7,
      },
    },
  },
  {
    urlPattern: /\.(js|css|woff2?)$/i,
    handler: 'CacheFirst',
    options: {
      cacheName: 'static-assets',
      expiration: {
        maxEntries: 60,
        maxAgeSeconds: 60 * 60 * 24 * 30,
      },
    },
  },
  {
    urlPattern: /\.(png|jpg|jpeg|svg|gif|webp)$/i,
    handler: 'CacheFirst',
    options: {
      cacheName: 'images-cache',
      expiration: {
        maxEntries: 60,
        maxAgeSeconds: 60 * 60 * 24 * 30,
      },
    },
  },
  {
    urlPattern: /^https?:\/\/.*/,
    handler: 'NetworkFirst',
    options: {
      cacheName: 'http-cache',
      expiration: {
        maxEntries: 32,
        maxAgeSeconds: 60 * 60,
      },
    },
  },
];

const pwaConfig = withPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
  runtimeCaching,
})(nextConfig);

// pwaConfig.turbopa = {};

export default pwaConfig;
