/** @type {import('next').NextConfig} */
const nextConfig = {
  removeHeaderHTML: true,
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.cloudinary.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
