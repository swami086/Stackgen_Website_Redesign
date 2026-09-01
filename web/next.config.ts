import { withPayload } from "@payloadcms/next/withPayload";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const __filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(__filename);

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
      {
        protocol: "http",
        hostname: "127.0.0.1",
        pathname: "/api/media/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "/api/media/**",
      },
    ],
    localPatterns: [
      {
        pathname: "/api/media/file/**",
      },
    ],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      ".cjs": [".cts", ".cjs"],
      ".js": [".ts", ".tsx", ".js", ".jsx"],
      ".mjs": [".mts", ".mjs"],
    };
    return webpackConfig;
  },
  turbopack: {
    root: path.resolve(dirname),
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

export default withPayload(nextConfig, { devBundleServerPackages: false });
