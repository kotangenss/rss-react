/** @type {import('next').NextConfig} */

const nextConfig = {
  distDir: './dist',
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'i.annihil.us',
      },
    ],
  },
};

export default nextConfig;
