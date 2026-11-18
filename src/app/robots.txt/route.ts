import { DATA } from "@/data/resume";

// robots.txt as a route handler (MetadataRoute.Robots cannot express
// Content-Signal).
// NOTE: no Agentmap line here — it is not a valid robots.txt directive and
// Lighthouse/SEO validators flag it ("Unknown directive"). Agent discovery
// stays covered by the homepage Link header and <link rel="ard"> tag.
export function GET() {
  const body = [
    "User-Agent: *",
    "Allow: /",
    "",
    "# AI content signals (draft: content-signal)",
    "Content-Signal: ai-train=no, search=yes, ai-input=yes",
    "",
    `Sitemap: ${DATA.url}/sitemap.xml`,
    "",
  ].join("\n");

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
