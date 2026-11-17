/**
 * TopCV-style resume template, rendered from the portfolio DATA object.
 *
 * Layout follows the original TopCV CV: round avatar + info table, GIT,
 * Objective, Education, Work Experience (two-column), Freelance
 * Experience, Technical Skills (table), Projects (detail tables).
 *
 * This module is pure: it takes DATA + config + assets and returns HTML.
 * Content comes from the shared model (resume-model.ts), so the PDF and
 * the md / csv / json exports always carry the same facts.
 */
import type { ResumeConfig } from "./resume-config";
import {
  assembleResumeModel,
  endSentence,
  type ResumeProject,
} from "./resume-model";

/** Minimal shape of the portfolio DATA object (only what the CV uses). */
export interface ResumeData {
  url?: string;
  summary?: string;
  contact?: {
    email?: string;
    tel?: string;
    social?: Record<string, { name?: string; url?: string }>;
  };
  skills?: { categories?: { name?: string; items?: string[] }[] };
  work?: {
    items?: {
      company?: string;
      roles?: {
        title?: string;
        start?: string;
        end?: string;
        responsibilities?: string[];
        achievements?: string[];
        technologies?: string[];
      }[];
    }[];
  };
  freelance?: {
    ndaNote?: string;
    clients?: {
      name?: string;
      location?: string;
      employmentType?: string;
      start?: string;
      end?: string;
      description?: string;
      technologies?: string[];
      projects?: { title?: string; description?: string }[];
    }[];
  };
  education?: {
    school?: string;
    degree?: string;
    start?: string;
    end?: string;
  }[];
  projects?: {
    id?: string;
    title?: string;
    dates?: string;
    description?: string;
    technologies?: string[];
  }[];
}

export interface ResumeAssets {
  /** base64 woff2 per weight (400/500/600/700); missing weights fall back to system sans. */
  fonts: Record<string, string>;
  /** base64 JPEG for the avatar, or null to render without a photo. */
  photoBase64: string | null;
}

function esc(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function bulletLines(items: string[]): string {
  return items.map((item) => `<li>${esc(endSentence(item))}</li>`).join("\n");
}

function techLines(technical: string[], databases: string[]): string {
  const lines: string[] = [];
  if (technical.length > 0)
    lines.push(
      `<div class="meta-line"><span class="meta-label">Technical:</span> ${esc(technical.join(", "))}</div>`,
    );
  if (databases.length > 0)
    lines.push(
      `<div class="meta-line"><span class="meta-label">Database:</span> ${esc(databases.join(", "))}</div>`,
    );
  return lines.length > 0 ? `<div class="meta">${lines.join("\n")}</div>` : "";
}

function projectTable(project: ResumeProject): string {
  const rows: string[] = [];
  if (project.customer)
    rows.push(
      `<tr><td class="label">Customer</td><td>${esc(project.customer)}</td></tr>`,
    );
  if (project.description)
    rows.push(
      `<tr><td class="label">Description</td><td>${esc(project.description)}</td></tr>`,
    );
  if (project.teamSize !== undefined && project.teamSize !== "")
    rows.push(
      `<tr><td class="label">Team size</td><td>${esc(project.teamSize)}</td></tr>`,
    );
  if (project.position)
    rows.push(
      `<tr><td class="label">My position</td><td>${esc(project.position)}</td></tr>`,
    );
  if (project.responsibilities && project.responsibilities.length > 0)
    rows.push(
      `<tr><td class="label">My responsibilities</td><td><ul>${bulletLines(project.responsibilities)}</ul></td></tr>`,
    );
  if (project.technologies.length > 0)
    rows.push(
      `<tr><td class="label">Technologies used</td><td><ul>${project.technologies.map((t) => `<li>${esc(t)}</li>`).join("")}</ul></td></tr>`,
    );
  return `<div class="project">
    <div class="project-head"><div class="title">${esc(project.title)}</div><div class="dates">(${esc(project.dates)})</div></div>
    <table class="project-table">
      ${rows.join("\n")}
    </table>
  </div>`;
}

function fontFace(weight: string, b64: string | undefined): string {
  if (!b64) return "";
  return `@font-face { font-family: "Inter"; font-weight: ${weight}; font-style: normal; src: url(data:font/woff2;base64,${b64}) format("woff2"); }`;
}

export function renderResumeHTML(
  data: ResumeData,
  config: ResumeConfig,
  assets: ResumeAssets,
): string {
  const model = assembleResumeModel(data, config);
  const { profile, objective, education, work, freelance, skills, projects } =
    model;

  const workHtml = work
    .map((item, itemIdx) => {
      const roleBlocks = item.roles
        .map(
          (role) => `<div class="role">${esc(role.title)}</div>
      <div class="meta"><div class="meta-line"><span class="meta-label">Responsibility:</span></div></div>
      <ul>
        ${bulletLines(role.bullets)}
      </ul>
      ${techLines(role.technical, role.databases)}`,
        )
        .join("\n");
      const sep = itemIdx < work.length - 1 ? `<hr class="entry-sep">` : "";
      return `<div class="entry">
    <div class="entry-dates">${esc(`${item.start} - ${item.end}`)}</div>
    <div class="entry-body">
      <div class="company">${esc(item.company)}</div>
      ${roleBlocks}
    </div>
  </div>${sep}`;
    })
    .join("\n");

  const freelanceHtml = freelance.clients
    .map((client, idx) => {
      const baseTitle = [client.name, client.location]
        .filter(Boolean)
        .join(" — ");
      const showEmploymentType =
        Boolean(client.employmentType) && client.employmentType !== client.name;
      const title = showEmploymentType
        ? `${baseTitle} (${client.employmentType})`
        : baseTitle;
      const projectLines = client.projects
        .map(
          (p) =>
            `<li>${esc(p.title)}${p.description ? `: ${esc(endSentence(p.description))}` : ""}</li>`,
        )
        .join("\n");
      const sep =
        idx < freelance.clients.length - 1 ? `<hr class="entry-sep">` : "";
      return `<div class="entry">
    <div class="entry-dates">${esc(`${client.start} - ${client.end}`)}</div>
    <div class="entry-body">
      <div class="company">${esc(title)}</div>
      ${client.description ? `<div class="desc">${esc(client.description)}</div>` : ""}
      <div class="meta"><div class="meta-line"><span class="meta-label">Projects:</span></div></div>
      <ul>
        ${projectLines}
      </ul>
      ${techLines(client.technical, client.databases)}
    </div>
  </div>${sep}`;
    })
    .join("\n");

  const skillsHtml = skills
    .map(
      (c) =>
        `<tr><td class="label">${esc(c.name)}</td><td>${esc(c.items.join(", "))}</td></tr>`,
    )
    .join("\n");

  const educationHtml = education
    .map(
      (e) => `<div class="entry">
    <div class="entry-dates">${esc(e.start)} - ${esc(e.end)}</div>
    <div class="entry-body">
      <div class="school">${esc(e.school)}</div>
      <div>Major: ${esc(e.degree)}</div>
    </div>
  </div>`,
    )
    .join("\n");

  const projectTables = projects.map(projectTable);

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${esc(profile.fullName)} — CV</title>
<style>
  ${fontFace("400", assets.fonts["400"])}
  ${fontFace("500", assets.fonts["500"])}
  ${fontFace("600", assets.fonts["600"])}
  ${fontFace("700", assets.fonts["700"])}
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: "Inter", sans-serif; font-size: 10.5pt; line-height: 1.5; color: #000; }
  a { color: #000; text-decoration: none; }

  .header { display: flex; justify-content: space-between; gap: 20pt; margin-bottom: 22pt; }
  .header-left { flex: 1; }
  h1 { font-size: 26pt; font-weight: 700; color: #1f3864; letter-spacing: 0.01em; line-height: 1.15; margin-bottom: 8pt; }
  .info-table { border-collapse: collapse; }
  .info-table td { padding: 2.5pt 0; vertical-align: top; }
  .info-table td.label { font-weight: 700; padding-right: 18pt; white-space: nowrap; }
  .photo { flex: none; width: 120pt; height: 120pt; object-fit: cover; border-radius: 50%; }

  section { margin-bottom: 20pt; }
  section:last-child { margin-bottom: 0; }
  h2 { font-size: 13pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.02em; border-bottom: 1.2pt solid #000; padding-bottom: 4pt; margin-bottom: 12pt; break-after: avoid; }
  .objective { text-align: justify; }
  .section-note { font-size: 9.5pt; color: #57534e; margin: -6pt 0 10pt 0; break-after: avoid; }

  .entry { display: flex; gap: 14pt; margin-bottom: 14pt; }
  .entry:last-child { margin-bottom: 0; }
  .entry-dates { flex: 0 0 150pt; }
  .entry-body { flex: 1; min-width: 0; }
  .entry-body .company { font-weight: 700; }
  .entry-body .role { margin-top: 2pt; }
  .entry-body .desc { margin-top: 1pt; }
  .entry-body ul { list-style: none; margin-top: 1pt; }
  .entry-body li { padding-left: 9pt; text-indent: -9pt; }
  .entry-body li::before { content: "- "; }
  .entry-body .meta { margin-top: 4pt; }
  .entry-body .meta-label { font-weight: 600; }
  .entry-sep { border: none; border-top: 0.6pt solid #e5e5e5; margin: 12pt 0; }
  .school { font-weight: 700; text-transform: uppercase; }

  .skills-table { width: 100%; border-collapse: collapse; }
  .skills-table td { padding: 5pt 0; vertical-align: top; border-bottom: 0.6pt solid #e5e5e5; }
  .skills-table tr:last-child td { border-bottom: none; }
  .skills-table td.label { font-weight: 700; width: 150pt; padding-right: 14pt; }

  .project { margin-bottom: 16pt; }
  .project:last-child { margin-bottom: 0; }
  .project-head { break-inside: avoid; break-after: avoid; margin-bottom: 5pt; }
  .project-head .title { font-size: 12pt; font-weight: 700; }
  .project-head .dates { font-size: 10.5pt; }
  table.project-table { width: 100%; border-collapse: collapse; }
  table.project-table td { border: 0.7pt solid #8a8a8a; padding: 4pt 6pt; vertical-align: top; }
  table.project-table td.label { font-weight: 700; width: 145pt; }
  table.project-table ul { list-style: none; }
  table.project-table li::before { content: "- "; }
</style>
</head>
<body>

<div class="header">
  <div class="header-left">
    <h1>${esc(profile.fullName)}</h1>
    <table class="info-table">
      <tr><td class="label">Date of birth</td><td>${esc(profile.dateOfBirth)}</td></tr>
      <tr><td class="label">Gender</td><td>${esc(profile.gender)}</td></tr>
      <tr><td class="label">Phone</td><td>${esc(profile.phone)}</td></tr>
      <tr><td class="label">Email</td><td><a href="mailto:${esc(profile.email)}">${esc(profile.email)}</a></td></tr>
      <tr><td class="label">Address</td><td>${esc(profile.address)}</td></tr>
      <tr><td class="label">${esc(profile.portfolioLabel)}</td><td><a href="${esc(profile.portfolioUrl)}">${esc(profile.portfolioUrl)}</a></td></tr>
    </table>
  </div>
  ${assets.photoBase64 ? `<img class="photo" src="data:image/jpeg;base64,${assets.photoBase64}" alt="${esc(profile.fullName)}">` : ""}
</div>

<section>
  <h2>GIT</h2>
  <div>Gitlab: <a href="${esc(profile.gitlabUrl)}">${esc(profile.gitlabUrl)}</a></div>
  ${profile.githubUrl ? `<div>Github: <a href="${esc(profile.githubUrl)}">${esc(profile.githubUrl)}</a></div>` : ""}
</section>

${
  objective
    ? `<section>
  <h2>Objective</h2>
  <p class="objective">${esc(objective)}</p>
</section>`
    : ""
}

${
  education.length > 0
    ? `<section>
  <h2>Education</h2>
  ${educationHtml}
</section>`
    : ""
}

${
  work.length > 0
    ? `<section>
  <h2>Work Experience</h2>
  ${workHtml}
</section>`
    : ""
}

${
  freelance.clients.length > 0
    ? `<section>
  <h2>Freelance Experience</h2>
  ${freelance.ndaNote ? `<div class="section-note">${esc(freelance.ndaNote)}</div>` : ""}
  ${freelanceHtml}
</section>`
    : ""
}

${
  skills.length > 0
    ? `<section>
  <h2>Technical Skills</h2>
  <table class="skills-table">
    ${skillsHtml}
  </table>
</section>`
    : ""
}

${
  projectTables.length > 0
    ? `<section>
  <h2>Projects</h2>
  ${projectTables.join("\n")}
</section>`
    : ""
}

</body>
</html>`;
}
