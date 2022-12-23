/** @type {import('next').NextConfig} */
const nextConfig = {
  removeHeadTags: [
    {
      tagName: 'link',
      attributes: {
        rel: 'translate',
      },
    },
  ],
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
