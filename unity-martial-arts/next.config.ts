import type { NextConfig } from "next";

const basePath = process.env.GITHUB_PAGES === "true" ? "/my-memeory" : "";

const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
