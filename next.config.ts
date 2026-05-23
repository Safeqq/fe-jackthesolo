import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: process.env.BACKEND_URL ? `${process.env.BACKEND_URL}/api/v1/:path*` : "https://jack-the-solo.vercel.app/api/v1/:path*", // Proxy to Backend
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "online-fix.me",
      },
      {
        protocol: "http",
        hostname: "online-fix.me",
      },
    ],
  },
};

export default nextConfig;
