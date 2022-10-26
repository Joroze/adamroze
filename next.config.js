const { withPlaiceholder } = require('@plaiceholder/next');

/** @type {import('next').NextConfig}*/
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    adjustFontFallbacks: true,
  },
  images: {
    domains: ['loremflickr.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.cdninstagram.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {},
};

module.exports = withPlaiceholder(nextConfig);
