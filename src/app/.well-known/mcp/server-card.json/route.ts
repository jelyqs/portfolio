import { DATA } from "@/data/resume";

// MCP server card (SEP-1649): full description of the live MCP server.
export function GET() {
  const url = DATA.url;
  const body = {
    name: "thunguyenit-portfolio",
    version: "1.0.0",
    description:
      "MCP server for Thu Nguyen's portfolio — a full-stack software engineer based in Da Nang, Vietnam. Exposes read-only tools for profile, projects, work history, and contact details.",
    serverInfo: { name: "thunguyenit-portfolio", version: "1.0.0" },
    protocolVersion: "2025-06-18",
    capabilities: {
      tools: {},
    },
    transport: {
      type: "streamable-http",
      url: `${url}/mcp`,
    },
    tools: [
      {
        name: "get_profile",
        description:
          "Get Thu Nguyen's profile: name, job title, location, summary, stats, education, and skill categories.",
      },
      {
        name: "list_projects",
        description:
          "List Thu Nguyen's portfolio projects with descriptions, dates, and technologies. Optional arg: active_only (boolean).",
      },
      {
        name: "list_work",
        description:
          "List Thu Nguyen's work history (full-time roles) and freelance engagements by region.",
      },
      {
        name: "get_contact",
        description:
          "Get Thu Nguyen's contact details: email, phone, social profiles, and resume link.",
      },
    ],
    authentication: {
      required: false,
      note: "Public read-only server. No auth, no session, no API key.",
    },
    owner: {
      name: DATA.name,
      url,
      email: DATA.contact.email,
    },
  };

  return Response.json(body, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
