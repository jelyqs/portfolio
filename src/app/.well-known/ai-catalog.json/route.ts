import { buildAiCatalog } from "@/lib/ai-catalog";

// Agent Readiness Document (ARD) — discovery entry point for AI agents.
// Legacy location; the current location is /.well-known/ard.json (same body).
// Referenced from the homepage Link header and <link rel="ard"> /
// <link rel="ai-catalog"> tags in the layout.
export function GET() {
  return Response.json(buildAiCatalog(), {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
