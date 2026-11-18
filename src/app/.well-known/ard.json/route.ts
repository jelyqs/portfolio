import { buildAiCatalog } from "@/lib/ai-catalog";

// Agent Readiness Document (ARD) — current standard location.
// Same body as /.well-known/ai-catalog.json (legacy location).
export function GET() {
  return Response.json(buildAiCatalog(), {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
