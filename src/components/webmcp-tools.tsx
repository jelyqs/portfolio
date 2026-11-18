"use client";

import { DATA } from "@/data/resume";
import { useEffect } from "react";

// WebMCP: register portfolio tools with the host page's model context when
// the browser exposes it (experimental API). Feature-detected, wrapped in
// try/catch, and a no-op in browsers without WebMCP support.

type WebMcpTool = {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  execute: (args: Record<string, unknown>) => Promise<unknown>;
};

type ModelContextHost = {
  modelContext?: {
    registerTool: (tool: WebMcpTool) => unknown;
  };
};

function getModelContext(): ModelContextHost["modelContext"] | undefined {
  try {
    const doc = document as unknown as ModelContextHost;
    if (doc.modelContext?.registerTool) return doc.modelContext;
    const nav = navigator as unknown as ModelContextHost;
    if (nav.modelContext?.registerTool) return nav.modelContext;
  } catch {
    // WebMCP unavailable — ignore.
  }
  return undefined;
}

export default function WebMcpTools() {
  useEffect(() => {
    const modelContext = getModelContext();
    if (!modelContext) return;

    const tools: WebMcpTool[] = [
      {
        name: "getProfile",
        description:
          "Get Thu Nguyen's profile: name, job title, location, summary, stats, and skill categories.",
        inputSchema: { type: "object", properties: {} },
        execute: async () => ({
          name: DATA.name,
          jobTitle: DATA.jobTitle,
          location: DATA.location,
          url: DATA.url,
          description: DATA.description,
          stats: DATA.stats,
          skillCategories: DATA.skills.categories.map((c) => ({
            name: c.name,
            items: c.items,
          })),
        }),
      },
      {
        name: "listProjects",
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
        },
        execute: async (args) => {
          const activeOnly = args.active_only === true;
          return DATA.projects
            .filter((p) => !activeOnly || p.active)
            .map((p) => ({
              id: p.id,
              title: p.title,
              href: p.href,
              dates: p.dates,
              active: p.active,
              description: p.description,
              technologies: p.technologies,
            }));
        },
      },
      {
        name: "getContact",
        description:
          "Get Thu Nguyen's contact details: email, phone, social profiles, and resume link.",
        inputSchema: { type: "object", properties: {} },
        execute: async () => ({
          email: DATA.contact.email,
          tel: DATA.contact.tel,
          social: Object.fromEntries(
            Object.entries(DATA.contact.social).map(([key, s]) => [
              key,
              { name: s.name, url: s.url },
            ]),
          ),
          resume: DATA.resumeUrl,
        }),
      },
    ];

    for (const tool of tools) {
      try {
        modelContext.registerTool(tool);
      } catch {
        // Registration failed (e.g. duplicate) — ignore.
      }
    }
  }, []);

  return null;
}
