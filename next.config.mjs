/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.r2.cloudflarestorage.com',
      },
      {
        protocol: 'https',
        hostname: 'pub-*.r2.dev',
      },
    ],
  },
  trailingSlash: true,
  // Custom robots.txt is placed in public/; do not let Next.js generate one.
  // Robots meta and sitemap references are handled manually via layout and static files.
};

export default nextConfig;
