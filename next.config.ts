import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

const githubPagesBasePath = "/Stratix-Solutions";

export default function nextConfig(phase: string): NextConfig {
  const isDevelopment = phase === PHASE_DEVELOPMENT_SERVER;
  const basePath = isDevelopment ? "" : githubPagesBasePath;

  return {
    // Export for GitHub Pages, but keep `next dev` compatible with the proxy.
    output: isDevelopment ? undefined : "export",
    trailingSlash: true,
    basePath,
    assetPrefix: isDevelopment ? undefined : basePath,
    // Expose basePath so client-side image src helpers can prepend it.
    // With images.unoptimized:true the <Image> component doesn't auto-add basePath,
    // so all public-folder src="/foo.png" usages must be wrapped with publicPath().
    env: {
      NEXT_PUBLIC_BASE_PATH: basePath,
    },
    images: {
      unoptimized: true, // Required for output:"export" — Next.js image optimization needs a server

      remotePatterns: [
        {
          protocol: "https",
          hostname: "**",
        },
      ],
    },
  };
}
