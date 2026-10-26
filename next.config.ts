import type { NextConfig } from "next";

const isGitHubPagesBuild = process.env.BREAD_DEPLOY_TARGET === "github-pages";

const nextConfig: NextConfig = isGitHubPagesBuild
  ? {
      output: "export",
      basePath: "/bread-site",
      trailingSlash: true,
      images: { unoptimized: true },
    }
  : {};

export default nextConfig;
