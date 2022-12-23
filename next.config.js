/** @type {import('next').NextConfig} */
const nextConfig = {
  headers: [
    {
      source: '/:path*',
      headers: [
        {
          key: 'Link',
          value: '</static/translate.png>; rel=translate',
          action: 'remove',
        },
      ],
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
