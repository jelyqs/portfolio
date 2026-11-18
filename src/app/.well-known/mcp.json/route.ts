import { DATA } from "@/data/resume";

// MCP server discovery (SEP-1649 style): points at the live MCP endpoint
// and the full server card.
export function GET() {
  const url = DATA.url;
  const body = {
    name: "thunguyenit-portfolio",
    version: "1.0.0",
    description:
      "MCP server for Thu Nguyen's portfolio: profile, projects, work history, and contact details.",
    serverInfo: { name: "thunguyenit-portfolio", version: "1.0.0" },
    protocolVersion: "2025-06-18",
    capabilities: { tools: {} },
    transport: {
      type: "streamable-http",
      url: `${url}/mcp`,
    },
    serverCard: `${url}/.well-known/mcp/server-card.json`,
    tools: ["get_profile", "list_projects", "list_work", "get_contact"],
  };

  return Response.json(body, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
