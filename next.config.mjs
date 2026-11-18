/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "motion"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        // Agent discovery (RFC 8288 Link headers) — homepage only.
        source: "/",
        headers: [
          {
            key: "Link",
            value:
              '<https://thunguyenit.com/.well-known/agent-skills/index.json>; rel="agent-skills", <https://thunguyenit.com/.well-known/api-catalog>; rel="api-catalog", <https://thunguyenit.com/.well-known/mcp/server-card.json>; rel="mcp-server", <https://thunguyenit.com/.well-known/ai-catalog.json>; rel="ai-catalog"',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
