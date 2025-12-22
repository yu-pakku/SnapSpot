// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8758',
        pathname: '/storage/spots/**',
      },
    ],
  },
};

export default nextConfig;
