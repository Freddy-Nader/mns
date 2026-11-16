import type { NextConfig } from "next";
import { paginas } from "./lib/routes";

const nextConfig: NextConfig = {
  // Spanish is the site's primary language and lives at the root; English
  // lives under /en. The [lang] route segment is an implementation detail,
  // so /es is never a public URL (docs/adr/0005).
  async rewrites() {
    return [
      { source: "/", destination: "/es" },
      ...paginas.map((p) => ({ source: p, destination: `/es${p}` })),
    ];
  },
  async redirects() {
    return [
      { source: "/es", destination: "/", permanent: false },
      ...paginas.map((p) => ({ source: `/es${p}`, destination: p, permanent: false })),
    ];
  },
  images: {
    // Video posters come straight from YouTube's thumbnail CDN.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "/vi/**",
      }
    ],
  },
};

export default nextConfig;
