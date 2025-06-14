/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {serverActions: {bodySizeLimit: '100mb'}},
  output: 'standalone',
  transpilePackages: ['@prisma/client', 'prisma'],
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
