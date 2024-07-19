// import { createProxyMiddleware } from 'http-proxy-middleware'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3001/api/:path*', // Koa 服务器的地址
      },
    ];
  },
};

export default nextConfig;
