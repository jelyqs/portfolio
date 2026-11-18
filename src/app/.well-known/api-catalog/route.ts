import { DATA } from "@/data/resume";

// API catalog as an RFC 9727 linkset (application/linkset+json).
// The only live API on this site is the MCP server at /mcp; the rest of
// the entries point at the public discovery documents.
export function GET() {
  const url = DATA.url;
  const body = {
    linkset: [
      {
        anchor: `${url}/`,
        "ai-catalog": [
          {
            href: `${url}/.well-known/ai-catalog.json`,
            type: "application/json",
          },
        ],
        "agent-skills": [
          {
            href: `${url}/.well-known/agent-skills/index.json`,
            type: "application/json",
          },
        ],
        "mcp-server": [
          {
            href: `${url}/.well-known/mcp/server-card.json`,
            type: "application/json",
          },
        ],
        "llms-txt": [{ href: `${url}/llms.txt`, type: "text/markdown" }],
      },
      {
        anchor: `${url}/mcp`,
        "service-desc": [
          { href: `${url}/.well-known/mcp.json`, type: "application/json" },
        ],
        "mcp-server": [
          {
            href: `${url}/.well-known/mcp/server-card.json`,
            type: "application/json",
          },
        ],
      },
    ],
  };

  return new Response(JSON.stringify(body, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/linkset+json",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
