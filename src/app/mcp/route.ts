import { DATA } from "@/data/resume";

// Minimal, dependency-free MCP server (Streamable HTTP, JSON-RPC 2.0).
// Stateless: no session id, no SSE. All data comes from DATA (src/data/resume.tsx).
// Protocol version: 2025-06-18.

export const runtime = "nodejs";

const SERVER_INFO = { name: "thunguyenit-portfolio", version: "1.0.0" };
const PROTOCOL_VERSION = "2025-06-18";

type JsonRpcRequest = {
  jsonrpc?: string;
  id?: string | number | null;
  method?: string;
  params?: Record<string, unknown>;
};

type ToolResult = {
  content: { type: "text"; text: string }[];
  structuredContent?: Record<string, unknown>;
  isError?: boolean;
};

function jsonResult(id: string | number | null, result: unknown) {
  return Response.json({ jsonrpc: "2.0", id, result });
}

function jsonError(
  id: string | number | null,
  code: number,
  message: string,
) {
  return Response.json(
    { jsonrpc: "2.0", id, error: { code, message } },
    { status: 200 },
  );
}

function textResult(payload: unknown): ToolResult {
  return {
    content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
  };
}

function getProfile(): ToolResult {
  return textResult({
    name: DATA.name,
    jobTitle: DATA.jobTitle,
    location: DATA.location,
    url: DATA.url,
    description: DATA.description,
    summary: DATA.summary,
    stats: DATA.stats,
    education: DATA.education,
    skillCategories: DATA.skills.categories.map((c) => ({
      name: c.name,
      items: c.items,
    })),
  });
}

function listProjects(args: Record<string, unknown>): ToolResult {
  const activeOnly = args.active_only === true;
  const projects = DATA.projects
    .filter((p) => !activeOnly || p.active)
    .map((p) => ({
      id: p.id,
      title: p.title,
      href: p.href,
      dates: p.dates,
      active: p.active,
      description: p.description,
      technologies: p.technologies,
      links: p.links.map((l) => ({ type: l.type, href: l.href })),
    }));
  return textResult({ count: projects.length, projects });
}

function listWork(): ToolResult {
  return textResult({
    work: DATA.work.items.map((w) => ({
      company: w.company,
      location: w.location,
      roles: w.roles.map((r) => ({
        title: r.title,
        employmentType: r.employmentType,
        start: r.start,
        end: r.end,
        responsibilities: r.responsibilities,
        technologies: r.technologies,
      })),
    })),
    freelance: DATA.freelance.clients.map((c) => ({
      location: c.location,
      employmentType: c.employmentType,
      start: c.start,
      end: c.end,
      description: c.description,
      technologies: c.technologies,
      projects: c.projects.map((p) => ({
        title: p.title,
        description: p.description,
        technologies: p.technologies,
      })),
    })),
  });
}

function getContact(): ToolResult {
  return textResult({
    email: DATA.contact.email,
    tel: DATA.contact.tel,
    social: Object.fromEntries(
      Object.entries(DATA.contact.social).map(([key, s]) => [
        key,
        { name: s.name, url: s.url },
      ]),
    ),
    resume: DATA.resumeUrl,
  });
}

const TOOLS = [
  {
    name: "get_profile",
    description:
      "Get Thu Nguyen's profile: name, job title, location, summary, stats, education, and skill categories.",
    inputSchema: {
      type: "object",
      properties: {},
      additionalProperties: false,
    },
  },
  {
    name: "list_projects",
    description:
      "List Thu Nguyen's portfolio projects with descriptions, dates, and technologies.",
    inputSchema: {
      type: "object",
      properties: {
        active_only: {
          type: "boolean",
          description: "Only return projects currently active.",
        },
      },
      additionalProperties: false,
    },
  },
  {
    name: "list_work",
    description:
      "List Thu Nguyen's work history (full-time roles) and freelance engagements by region.",
    inputSchema: {
      type: "object",
      properties: {},
      additionalProperties: false,
    },
  },
  {
    name: "get_contact",
    description:
      "Get Thu Nguyen's contact details: email, phone, social profiles, and resume link.",
    inputSchema: {
      type: "object",
      properties: {},
      additionalProperties: false,
    },
  },
];

function callTool(name: string, args: Record<string, unknown>): ToolResult {
  switch (name) {
    case "get_profile":
      return getProfile();
    case "list_projects":
      return listProjects(args);
    case "list_work":
      return listWork();
    case "get_contact":
      return getContact();
    default:
      return {
        content: [{ type: "text", text: `Unknown tool: ${name}` }],
        isError: true,
      };
  }
}

export async function POST(request: Request) {
  let body: JsonRpcRequest;
  try {
    body = (await request.json()) as JsonRpcRequest;
  } catch {
    return jsonError(null, -32700, "Parse error: body is not valid JSON");
  }

  const id = body.id ?? null;
  const method = body.method ?? "";
  const params = (body.params ?? {}) as Record<string, unknown>;

  // Notifications (no id) get no JSON-RPC response — 202 Accepted.
  if (method.startsWith("notifications/")) {
    return new Response(null, { status: 202 });
  }

  switch (method) {
    case "initialize":
      return jsonResult(id, {
        protocolVersion: PROTOCOL_VERSION,
        capabilities: { tools: {} },
        serverInfo: SERVER_INFO,
      });
    case "ping":
      return jsonResult(id, {});
    case "tools/list":
      return jsonResult(id, { tools: TOOLS });
    case "tools/call": {
      const name = params.name;
      if (typeof name !== "string") {
        return jsonError(id, -32602, "Invalid params: tools/call requires a string 'name'");
      }
      const args = (params.arguments ?? {}) as Record<string, unknown>;
      return jsonResult(id, callTool(name, args));
    }
    default:
      return jsonError(id, -32601, `Method not found: ${method}`);
  }
}

export async function GET() {
  return new Response("Method Not Allowed: this endpoint accepts POST only", {
    status: 405,
    headers: { Allow: "POST" },
  });
}
