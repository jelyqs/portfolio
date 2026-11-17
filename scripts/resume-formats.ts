/**
 * Plain-text resume renderers, all from the shared ResumeModel
 * (see resume-model.ts). The PDF/HTML formats keep using the TopCV
 * template in resume-template.ts — these formats are the machine- and
 * text-friendly companions, with the same section order and facts.
 *
 * Adding a new format: write a `renderResume<X>(model)` function here,
 * register it in resume-export.ts (FORMATS + EXTENSIONS), done.
 */
import type {
  ResumeFreelanceClient,
  ResumeModel,
  ResumeProject,
  ResumeWorkItem,
} from "./resume-model";

/* ------------------------------------------------------------------ */
/* Markdown                                                            */
/* ------------------------------------------------------------------ */

function mdTechLines(technical: string[], databases: string[]): string[] {
  const lines: string[] = [];
  if (technical.length > 0)
    lines.push(`**Technical:** ${technical.join(", ")}  `);
  if (databases.length > 0)
    lines.push(`**Database:** ${databases.join(", ")}  `);
  return lines.length > 0 ? ["", ...lines] : lines;
}

function mdWorkItem(item: ResumeWorkItem): string {
  const lines: string[] = [
    `### ${item.company}`,
    "",
    `${item.start} - ${item.end}`,
    "",
  ];
  for (const role of item.roles) {
    lines.push(`${role.title}`, "", "**Responsibility:**", "");
    for (const b of role.bullets) lines.push(`- ${b}`);
    lines.push(...mdTechLines(role.technical, role.databases), "");
  }
  return lines.join("\n");
}

function mdFreelanceClient(client: ResumeFreelanceClient): string {
  const baseTitle = [client.name, client.location].filter(Boolean).join(" — ");
  const showEmploymentType =
    Boolean(client.employmentType) && client.employmentType !== client.name;
  const title = showEmploymentType
    ? `${baseTitle} (${client.employmentType})`
    : baseTitle;
  const lines: string[] = [
    `### ${title}`,
    "",
    `${client.start} - ${client.end}`,
    "",
  ];
  if (client.description) lines.push(client.description, "");
  lines.push("**Projects:**", "");
  for (const p of client.projects) {
    lines.push(
      p.description ? `- ${p.title}: ${p.description}` : `- ${p.title}`,
    );
  }
  lines.push(...mdTechLines(client.technical, client.databases), "");
  return lines.join("\n");
}

function mdProject(project: ResumeProject): string {
  const lines: string[] = [
    `### ${project.title}`,
    "",
    `(${project.dates})`,
    "",
    "| | |",
    "|---|---|",
  ];
  if (project.customer) lines.push(`| Customer | ${project.customer} |`);
  if (project.description)
    lines.push(`| Description | ${project.description} |`);
  if (project.teamSize !== undefined && project.teamSize !== "")
    lines.push(`| Team size | ${project.teamSize} |`);
  if (project.position) lines.push(`| My position | ${project.position} |`);
  if (project.responsibilities && project.responsibilities.length > 0)
    lines.push(
      `| My responsibilities | ${project.responsibilities.join("; ")} |`,
    );
  if (project.technologies.length > 0)
    lines.push(`| Technologies used | ${project.technologies.join("; ")} |`);
  lines.push("");
  return lines.join("\n");
}

export function renderResumeMarkdown(model: ResumeModel): string {
  const p = model.profile;
  const lines: string[] = [
    `# ${p.fullName}`,
    "",
    "| | |",
    "|---|---|",
    `| Date of birth | ${p.dateOfBirth} |`,
    `| Gender | ${p.gender} |`,
    `| Phone | ${p.phone} |`,
    `| Email | ${p.email} |`,
    `| Address | ${p.address} |`,
    `| ${p.portfolioLabel} | ${p.portfolioUrl} |`,
    "",
    "## GIT",
    "",
    `- Gitlab: ${p.gitlabUrl}`,
  ];
  if (p.githubUrl) lines.push(`- Github: ${p.githubUrl}`);
  lines.push("");

  if (model.objective) {
    lines.push("## Objective", "", model.objective, "");
  }

  if (model.education.length > 0) {
    lines.push("## Education", "");
    for (const e of model.education) {
      lines.push(
        `### ${e.school}`,
        "",
        `${e.start} - ${e.end}`,
        "",
        `Major: ${e.degree}`,
        "",
      );
    }
  }

  if (model.work.length > 0) {
    lines.push("## Work Experience", "");
    for (const item of model.work) lines.push(mdWorkItem(item));
  }

  if (model.freelance.clients.length > 0) {
    lines.push("## Freelance Experience", "");
    if (model.freelance.ndaNote) lines.push(`_${model.freelance.ndaNote}_`, "");
    for (const client of model.freelance.clients) {
      lines.push(mdFreelanceClient(client));
    }
  }

  if (model.skills.length > 0) {
    lines.push("## Technical Skills", "");
    lines.push("| Category | Skills |", "|---|---|");
    for (const c of model.skills) {
      lines.push(`| ${c.name} | ${c.items.join(", ")} |`);
    }
    lines.push("");
  }

  if (model.projects.length > 0) {
    lines.push("## Projects", "");
    for (const project of model.projects) lines.push(mdProject(project));
  }

  return `${lines.join("\n").trimEnd()}\n`;
}

/* ------------------------------------------------------------------ */
/* CSV (one tidy file: Section / Item / Field / Value)                 */
/* ------------------------------------------------------------------ */

type CsvRow = [section: string, item: string, field: string, value: string];

function csvEscape(value: string): string {
  // Quote when the value contains a comma, quote, or newline (RFC 4180).
  return /[",\n\r]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;
}

export function renderResumeCsv(model: ResumeModel): string {
  const p = model.profile;
  const rows: CsvRow[] = [
    ["Profile", p.fullName, "Date of birth", p.dateOfBirth],
    ["Profile", p.fullName, "Gender", p.gender],
    ["Profile", p.fullName, "Phone", p.phone],
    ["Profile", p.fullName, "Email", p.email],
    ["Profile", p.fullName, "Address", p.address],
    ["Profile", p.fullName, p.portfolioLabel, p.portfolioUrl],
    ["Profile", p.fullName, "Gitlab", p.gitlabUrl],
    ["Profile", p.fullName, "Github", p.githubUrl],
  ];
  if (model.objective) {
    rows.push(["Objective", "", "", model.objective]);
  }

  for (const e of model.education) {
    rows.push(
      ["Education", e.school, "Degree", e.degree],
      ["Education", e.school, "Start", e.start],
      ["Education", e.school, "End", e.end],
    );
  }

  for (const item of model.work) {
    rows.push(
      ["Work", item.company, "Start", item.start],
      ["Work", item.company, "End", item.end],
    );
    for (const role of item.roles) {
      const itemKey = `${item.company} / ${role.title}`;
      rows.push(
        ["Work", itemKey, "Start", role.start],
        ["Work", itemKey, "End", role.end],
      );
      for (const b of role.bullets) {
        rows.push(["Work", itemKey, "Responsibility", b]);
      }
      for (const t of role.technical) {
        rows.push(["Work", itemKey, "Technical", t]);
      }
      for (const d of role.databases) {
        rows.push(["Work", itemKey, "Database", d]);
      }
    }
  }

  for (const client of model.freelance.clients) {
    const itemKey = [client.name, client.location].filter(Boolean).join(" — ");
    rows.push(
      ["Freelance", itemKey, "Employment type", client.employmentType],
      ["Freelance", itemKey, "Description", client.description],
      ["Freelance", itemKey, "Start", client.start],
      ["Freelance", itemKey, "End", client.end],
    );
    for (const p of client.projects) {
      rows.push(["Freelance", itemKey, "Project", p.title]);
      if (p.description) {
        rows.push([
          "Freelance",
          `${itemKey} / ${p.title}`,
          "Description",
          p.description,
        ]);
      }
    }
    for (const t of client.technical) {
      rows.push(["Freelance", itemKey, "Technical", t]);
    }
    for (const d of client.databases) {
      rows.push(["Freelance", itemKey, "Database", d]);
    }
  }
  if (model.freelance.ndaNote) {
    rows.push(["Freelance", "", "NDA note", model.freelance.ndaNote]);
  }

  for (const c of model.skills) {
    for (const item of c.items) {
      rows.push(["Skills", c.name, "Skill", item]);
    }
  }

  for (const project of model.projects) {
    rows.push(
      ["Project", project.title, "Dates", project.dates],
      ["Project", project.title, "Source", project.source],
    );
    if (project.description)
      rows.push(["Project", project.title, "Description", project.description]);
    if (project.customer)
      rows.push(["Project", project.title, "Customer", project.customer]);
    if (project.teamSize !== undefined && project.teamSize !== "")
      rows.push([
        "Project",
        project.title,
        "Team size",
        String(project.teamSize),
      ]);
    if (project.position)
      rows.push(["Project", project.title, "My position", project.position]);
    for (const r of project.responsibilities ?? []) {
      rows.push(["Project", project.title, "Responsibility", r]);
    }
    for (const t of project.technologies) {
      rows.push(["Project", project.title, "Technology", t]);
    }
  }

  const header = "Section,Item,Field,Value";
  const body = rows.map((row) => row.map(csvEscape).join(",")).join("\r\n");
  // BOM so Excel opens the UTF-8 (Vietnamese) text correctly.
  return `\uFEFF${header}\r\n${body}\r\n`;
}

/* ------------------------------------------------------------------ */
/* JSON                                                                */
/* ------------------------------------------------------------------ */

export function renderResumeJson(model: ResumeModel): string {
  return `${JSON.stringify(model, null, 2)}\n`;
}
