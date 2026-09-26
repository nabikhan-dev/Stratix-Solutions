import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    // The dashboard lets an admin paste any image URL for blog/project
    // covers — there's no fixed set of hosts to allow-list anymore, so
    // this accepts any HTTPS host instead of only images.unsplash.com.
    // (Previously scoped to Unsplash only, which broke next/image for
    // every non-Unsplash URL added through /dashboard.)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
