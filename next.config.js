/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Disable trailing slashes to prevent redirect issues with Google indexing
  trailingSlash: false,
  
  // Image optimization for better performance
  images: {
    domains: ['1ewis.com', 'www.1ewis.com'],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
  
  // Compression for better performance
  compress: true,
  
  // Redirects for SEO
  async redirects() {
    return [
      // Redirect www to non-www
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.1ewis.com',
          },
        ],
        destination: 'https://1ewis.com/:path*',
        permanent: true,
      },
      // Redirect trailing slash URLs to non-trailing slash
      {
        source: '/:path+/',
        destination: '/:path+',
        permanent: true,
      },
    ];
  },
  
  // Rewrites for clean URLs
  async rewrites() {
    return [
      // RSS feed rewrite
      {
        source: '/news/feed.xml',
        destination: '/api/news/feed',
      },
    ];
  },
  
  // Headers for security and SEO
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  
  // Optimize production builds
  productionBrowserSourceMaps: false,
  
  // i18n configuration if you plan to expand internationally
  // i18n: {
  //   locales: ['en'],
  //   defaultLocale: 'en',
  // },
}

module.exports = nextConfig
