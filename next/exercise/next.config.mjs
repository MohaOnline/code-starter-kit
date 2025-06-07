/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {serverActions: {bodySizeLimit: '100mb'}},
  output: 'standalone',
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
