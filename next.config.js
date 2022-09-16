const { withPlaiceholder } = require('@plaiceholder/next');

/** @type {import('next').NextConfig}*/
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.cdninstagram.com',
      },
    ],
  },
  experimental: {},
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['loremflickr.com'],
  },
};

module.exports = withPlaiceholder(nextConfig);
