import { DATA } from "@/data/resume";

// Agent Readiness Document (ARD) — discovery entry point for AI agents.
// Referenced from robots.txt (Agentmap), the homepage Link header, and
// a <link rel="ai-catalog"> tag in the layout.
export function GET() {
  const url = DATA.url;
  const body = {
    protocol_version: "1.0",
    site: {
      name: `${DATA.name} — Portfolio`,
      description: DATA.description,
      url,
      type: "personal-portfolio",
      owner: {
        name: DATA.name,
        jobTitle: DATA.jobTitle,
        location: DATA.location,
        email: DATA.contact.email,
      },
    },
    capabilities: [
      {
        name: "read-portfolio",
        description:
          "Read Thu Nguyen's profile, work history, freelance engagements, and skills.",
        endpoints: [`${url}/llms.txt`, `${url}/llms-full.txt`],
      },
      {
        name: "list-projects",
        description:
          "List the 8 portfolio projects with descriptions, dates, and technologies.",
        endpoints: [`${url}/llms-full.txt`, `${url}/mcp`],
      },
      {
        name: "contact",
        description:
          "Find how to contact Thu Nguyen (email, phone, GitHub, Facebook, WhatsApp).",
        endpoints: [`${url}/auth.md`, `${url}/mcp`],
      },
      {
        name: "mcp-tools",
        description:
          "Call MCP tools over Streamable HTTP: get_profile, list_projects, list_work, get_contact.",
        endpoints: [`${url}/mcp`],
      },
    ],
    discovery: {
      llms_txt: `${url}/llms.txt`,
      llms_full_txt: `${url}/llms-full.txt`,
      auth: `${url}/auth.md`,
      api_catalog: `${url}/.well-known/api-catalog`,
      agent_skills: `${url}/.well-known/agent-skills/index.json`,
      mcp_server_card: `${url}/.well-known/mcp/server-card.json`,
      mcp_endpoint: `${url}/mcp`,
      sitemap: `${url}/sitemap.xml`,
      robots: `${url}/robots.txt`,
    },
    content_signals: {
      ai_train: "no",
      search: "yes",
      ai_input: "yes",
    },
    authentication: {
      required: false,
      note: "This is a public portfolio site. No authentication is required for any discovery endpoint. See /auth.md.",
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
