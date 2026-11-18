import { DATA } from "@/data/resume";

// Agent Skills Discovery index (v0.2.0).
export function GET() {
  const url = DATA.url;
  const body = {
    version: "0.2.0",
    skills: [
      {
        name: "hire-thu-nguyen",
        description:
          "How to evaluate Thu Nguyen for a software project and how to contact him: stack, work history, process, and contact channels.",
        version: "1.0.0",
        tags: ["hiring", "freelance", "full-stack", "contact"],
        locations: [
          {
            type: "skill-md",
            url: `${url}/skills/hire-thu-nguyen/SKILL.md`,
          },
        ],
        metadata: {
          author: DATA.name,
          homepage: url,
        },
      },
      {
        name: "portfolio-overview",
        description:
          "Navigate Thu Nguyen's portfolio content: profile, projects, work history, skills, and the machine-readable endpoints (llms.txt, MCP, AI catalog).",
        version: "1.0.0",
        tags: ["portfolio", "navigation", "overview"],
        locations: [
          {
            type: "skill-md",
            url: `${url}/skills/portfolio-overview/SKILL.md`,
          },
        ],
        metadata: {
          author: DATA.name,
          homepage: url,
        },
      },
    ],
  };

  return Response.json(body, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
