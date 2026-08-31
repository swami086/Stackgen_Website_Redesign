import { readFileSync } from "node:fs";
import path from "node:path";
import type { NextConfig } from "next";

const redirectsJson = JSON.parse(
  readFileSync(path.join(process.cwd(), "content/docs/redirects.json"), "utf8"),
) as { from: string; to: string }[];

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "docs.stackgen.com",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/docs/stackgen/stackgen",
        destination: "/docs/stackgen",
        permanent: true,
      },
      {
        source: "/docs/stackgen/stackgen/:path*",
        destination: "/docs/stackgen/:path*",
        permanent: true,
      },
      {
        source: "/docs/stackgen/aiden",
        destination: "/docs/aiden",
        permanent: true,
      },
      {
        source: "/docs/stackgen/aiden/:path*",
        destination: "/docs/aiden/:path*",
        permanent: true,
      },
      {
        source: "/docs/stackgen/observenow",
        destination: "/docs/observenow",
        permanent: true,
      },
      {
        source: "/docs/stackgen/observenow/:path*",
        destination: "/docs/observenow/:path*",
        permanent: true,
      },
      {
        source: "/product/aiden-for-infrastructure",
        destination: "/product/aiden-for-infraops",
        permanent: true,
      },
      {
        source: "/product/aiden-for-automation",
        destination: "/product/aiden-for-devops",
        permanent: true,
      },
      ...redirectsJson.map(({ from, to }) => ({
        source: from,
        destination: to,
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
