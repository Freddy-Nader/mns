import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Spanish is the site's primary language and lives at the root; English
  // lives under /en. The [lang] route segment is an implementation detail,
  // so /es is never a public URL (docs/adr/0005).
  async rewrites() {
    return [
      { source: "/", destination: "/es" },
      { source: "/fechas", destination: "/es/fechas" },
    ];
  },
  async redirects() {
    return [
      { source: "/", destination: "/es", permanent: true},
      { source: "/es", destination: "/", permanent: false },
      { source: "/es/fechas", destination: "/fechas", permanent: false },
    ];
  },
  images: {
    // Video posters come straight from YouTube's thumbnail CDN.
    remotePatterns: [new URL("https://i.ytimg.com/vi/**")],
  },
};

export default nextConfig;
