import { DATA } from "@/data/resume";

// Agent Readiness Document (ARD) — discovery entry point for AI agents.
// Served at both /.well-known/ai-catalog.json (legacy) and
// /.well-known/ard.json (current ARD location), and linked from the homepage
// via <link rel="ard"> and the Link header.
// NOTE: keep this in sync with the route handlers that serve it.

export function buildAiCatalog() {
  const url = DATA.url;
  const discovery = {
    llms_txt: `${url}/llms.txt`,
    llms_full_txt: `${url}/llms-full.txt`,
    auth: `${url}/auth.md`,
    api_catalog: `${url}/.well-known/api-catalog`,
    agent_skills: `${url}/.well-known/agent-skills/index.json`,
    mcp_server_card: `${url}/.well-known/mcp/server-card.json`,
    mcp_endpoint: `${url}/mcp`,
    sitemap: `${url}/sitemap.xml`,
    robots: `${url}/robots.txt`,
  };
  return {
    protocol_version: "1.0",
    specVersion: "1.0",
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
    // ARD schema requires an `entries` array listing the discoverable resources.
    entries: [
      {
        identifier: "urn:air:thunguyenit.com:llms-txt",
        name: "llms.txt",
        displayName: "llms.txt",
        url: discovery.llms_txt,
        type: "text/plain",
        description: "Short portfolio summary for AI agents.",
        representativeQueries: [
          "Thu Nguyen portfolio summary",
          "Thu Nguyen profile and skills",
          "hire Thu Nguyen freelancer",
        ],
      },
      {
        identifier: "urn:air:thunguyenit.com:llms-full-txt",
        name: "llms-full.txt",
        displayName: "llms-full.txt",
        url: discovery.llms_full_txt,
        type: "text/plain",
        description: "Full portfolio details for AI agents.",
        representativeQueries: [
          "Thu Nguyen full work history",
          "Thu Nguyen projects and experience",
          "Thu Nguyen detailed portfolio",
        ],
      },
      {
        identifier: "urn:air:thunguyenit.com:auth",
        name: "auth.md",
        displayName: "auth.md",
        url: discovery.auth,
        type: "text/markdown",
        description: "Authentication info (public site, no login needed).",
        representativeQueries: [
          "Thu Nguyen portfolio authentication",
          "do I need login for thunguyenit.com",
        ],
      },
      {
        identifier: "urn:air:thunguyenit.com:api-catalog",
        name: "api-catalog",
        displayName: "api-catalog",
        url: discovery.api_catalog,
        type: "application/json",
        description: "Machine-readable API catalog.",
        representativeQueries: [
          "Thu Nguyen portfolio API",
          "thunguyenit.com endpoints",
        ],
      },
      {
        identifier: "urn:air:thunguyenit.com:agent-skills",
        name: "agent-skills",
        displayName: "agent-skills",
        url: discovery.agent_skills,
        type: "application/json",
        description: "Agent skills index.",
        representativeQueries: [
          "Thu Nguyen agent skills",
          "hire Thu Nguyen skill",
        ],
      },
      {
        identifier: "urn:air:thunguyenit.com:mcp-server-card",
        name: "mcp-server-card",
        displayName: "mcp-server-card",
        url: discovery.mcp_server_card,
        type: "application/json",
        description: "MCP server card.",
        representativeQueries: [
          "Thu Nguyen MCP server",
          "thunguyenit.com MCP tools",
        ],
      },
      {
        identifier: "urn:air:thunguyenit.com:mcp",
        name: "mcp",
        displayName: "mcp",
        url: discovery.mcp_endpoint,
        type: "application/json",
        description:
          "MCP endpoint (Streamable HTTP): get_profile, list_projects, list_work, get_contact.",
        representativeQueries: [
          "Thu Nguyen get profile tool",
          "list Thu Nguyen projects",
          "contact Thu Nguyen",
        ],
      },
    ],
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
    discovery,
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
}
