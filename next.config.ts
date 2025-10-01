import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      // Ensure common favicon requests resolve to our SVG to avoid 404s
      {
        source: "/favicon.ico",
        destination: "/favicon.svg",
      },
      {
        source: "/apple-touch-icon.png",
        destination: "/favicon.svg",
      },
    ];
  },
};

export default nextConfig;
