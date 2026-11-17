/**
 * Shared resume model: assembles ONE normalized object from the portfolio
 * DATA + scripts/resume-config.ts. Every export format (md / csv / json /
 * pdf / html) renders from this model, so the facts never drift between
 * formats.
 *
 * Rules mirror scripts/resume-template.ts (the TopCV PDF template):
 * month abbreviations are expanded, technologies are split into
 * Technical / Database lines, and projects are deduplicated by title
 * (DATA.projects first, then extraProjects, then legacyProjects).
 */
import type { ResumeData } from "./resume-template";
import type { ProjectDetail, ResumeConfig } from "./resume-config";

export interface ResumeProfile {
  fullName: string;
  dateOfBirth: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
  portfolioUrl: string;
  portfolioLabel: string;
  gitlabUrl: string;
  githubUrl: string;
}

export interface ResumeEducation {
  school: string;
  degree: string;
  start: string;
  end: string;
}

export interface ResumeRole {
  title: string;
  start: string;
  end: string;
  bullets: string[];
  technical: string[];
  databases: string[];
}

export interface ResumeWorkItem {
  company: string;
  start: string;
  end: string;
  roles: ResumeRole[];
}

export interface ResumeFreelanceProject {
  title: string;
  description: string;
}

export interface ResumeFreelanceClient {
  name: string;
  location: string;
  employmentType: string;
  start: string;
  end: string;
  description: string;
  projects: ResumeFreelanceProject[];
  technical: string[];
  databases: string[];
}

export interface ResumeSkillCategory {
  name: string;
  items: string[];
}

export interface ResumeProject extends ProjectDetail {
  title: string;
  dates: string;
  description: string;
  technologies: string[];
  source: "data" | "extra" | "legacy";
}

export interface ResumeModel {
  profile: ResumeProfile;
  objective: string;
  education: ResumeEducation[];
  work: ResumeWorkItem[];
  freelance: {
    ndaNote: string;
    clients: ResumeFreelanceClient[];
  };
  skills: ResumeSkillCategory[];
  projects: ResumeProject[];
}

const MONTHS: Record<string, string> = {
  Jan: "January",
  Feb: "February",
  Mar: "March",
  Apr: "April",
  May: "May",
  Jun: "June",
  Jul: "July",
  Aug: "August",
  Sep: "September",
  Oct: "October",
  Nov: "November",
  Dec: "December",
};

/** Technologies treated as databases for the "Database:" line. */
const KNOWN_DATABASES = new Set([
  "MySQL",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "DynamoDB",
  "SQLite",
  "AWS Aurora",
  "Elasticsearch",
  "RDS",
]);

/** "Oct 2022 - Present" -> "October 2022 - Present". Years pass through. */
export function expandMonths(value: string): string {
  return value.replace(
    /\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b/g,
    (m) => MONTHS[m] ?? m,
  );
}

/** Split a technology list into the "Technical:" and "Database:" lines. */
export function splitTech(technologies: string[]): {
  tech: string[];
  db: string[];
} {
  const tech: string[] = [];
  const db: string[] = [];
  for (const item of technologies) {
    (KNOWN_DATABASES.has(item) ? db : tech).push(item);
  }
  return { tech, db };
}

/** Objective = the prose paragraphs of DATA.summary (bullets skipped, ** stripped). */
export function objectiveFromSummary(summary: string): string {
  return summary
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0 && !p.startsWith("-"))
    .map((p) => p.replace(/\*\*/g, ""))
    .join(" ");
}

/** Ensure a bullet ends with a period (same rule as the PDF template). */
export function endSentence(text: string): string {
  const t = text.trim();
  return /[.!?]$/.test(t) ? t : `${t}.`;
}

export function assembleResumeModel(
  data: ResumeData,
  config: ResumeConfig,
): ResumeModel {
  const contact = data.contact ?? {};
  const socials = Object.values(contact.social ?? {});
  const githubUrl =
    socials.find((s) => (s.name ?? "").toLowerCase() === "github")?.url ?? "";

  const work: ResumeWorkItem[] = (data.work?.items ?? []).map((item) => {
    const roles = item.roles ?? [];
    const firstRole = roles[0];
    return {
      company: item.company ?? "",
      start: expandMonths(firstRole?.start ?? ""),
      end: expandMonths(firstRole?.end ?? ""),
      roles: roles.map((role) => {
        const { tech, db } = splitTech(role.technologies ?? []);
        return {
          title: role.title ?? "",
          start: expandMonths(role.start ?? ""),
          end: expandMonths(role.end ?? ""),
          bullets: [
            ...(role.responsibilities ?? []),
            ...(role.achievements ?? []),
          ].map(endSentence),
          technical: tech,
          databases: db,
        };
      }),
    };
  });

  const freelanceClients: ResumeFreelanceClient[] = (
    data.freelance?.clients ?? []
  ).map((client) => {
    const { tech, db } = splitTech(client.technologies ?? []);
    return {
      name: client.name ?? "",
      location: client.location ?? "",
      employmentType: client.employmentType ?? "",
      start: expandMonths(client.start ?? ""),
      end: expandMonths(client.end ?? ""),
      description: client.description ?? "",
      projects: (client.projects ?? [])
        .filter((p) => p.title)
        .map((p) => ({
          title: p.title ?? "",
          description: p.description ?? "",
        })),
      technical: tech,
      databases: db,
    };
  });

  const skills: ResumeSkillCategory[] = (data.skills?.categories ?? [])
    .filter((c) => (c.items ?? []).length > 0)
    .map((c) => ({ name: c.name ?? "", items: c.items ?? [] }));

  // DATA.projects first; extra/legacy projects only if not already in DATA
  // (avoids duplicates when a personal project moves into DATA.projects).
  const seenTitles = new Set<string>();
  const projects: ResumeProject[] = [];
  for (const p of data.projects ?? []) {
    const title = p.title ?? "";
    seenTitles.add(title);
    // Only fields that exist — never invent defaults for the PDF/exports.
    const detail: ProjectDetail | undefined = p.id
      ? config.projectDetails[p.id]
      : undefined;
    projects.push({
      title,
      dates: expandMonths(p.dates ?? ""),
      description: p.description ?? "",
      technologies: p.technologies ?? [],
      source: "data",
      customer: detail?.customer,
      teamSize: detail?.teamSize,
      position: detail?.position,
      // Not in DATA.projects — never invent; row stays hidden.
      responsibilities: undefined,
    });
  }
  if (config.includeExtraProjects) {
    for (const p of config.extraProjects) {
      if (seenTitles.has(p.title)) continue;
      seenTitles.add(p.title);
      projects.push({
        title: p.title,
        dates: expandMonths(p.dates),
        description: p.description,
        technologies: p.technologies,
        source: "extra",
        customer: p.customer,
        teamSize: p.teamSize,
        position: p.position,
        responsibilities: p.responsibilities?.length
          ? [...p.responsibilities]
          : undefined,
      });
    }
  }
  if (config.includeLegacyProjects) {
    for (const p of config.legacyProjects) {
      if (seenTitles.has(p.title)) continue;
      seenTitles.add(p.title);
      projects.push({
        title: p.title,
        dates: expandMonths(p.dates),
        description: p.description,
        technologies: p.technologies,
        source: "legacy",
        customer: p.customer,
        teamSize: p.teamSize,
        position: p.position,
        responsibilities: p.responsibilities?.length
          ? [...p.responsibilities]
          : undefined,
      });
    }
  }

  return {
    profile: {
      fullName: config.fullName,
      dateOfBirth: config.dateOfBirth,
      gender: config.gender,
      phone: contact.tel ?? "",
      email: contact.email ?? "",
      address: config.address,
      portfolioUrl: data.url ?? "",
      portfolioLabel: config.websiteLabel,
      gitlabUrl: config.gitlabUrl,
      githubUrl,
    },
    objective: objectiveFromSummary(data.summary ?? ""),
    education: (data.education ?? []).map((e) => ({
      school: e.school ?? "",
      degree: e.degree ?? "",
      start: e.start ?? "",
      end: e.end ?? "",
    })),
    work,
    freelance: {
      ndaNote: data.freelance?.ndaNote ?? "",
      clients: freelanceClients,
    },
    skills,
    projects,
  };
}
