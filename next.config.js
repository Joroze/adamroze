/** @type {import('next').NextConfig} */

const { withPlaiceholder } = require('@plaiceholder/next');

const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: [
      'scontent-iad3-1.cdninstagram.com',
      'scontent-atl3-2.cdninstagram.com',
      'scontent-atl3-1.cdninstagram.com',
      'video-atl3-2.cdninstagram.com',
      'video-iad3-1.cdninstagram.com',
      'loremflickr.com',
    ],
  },
};

module.exports = withPlaiceholder(nextConfig);
