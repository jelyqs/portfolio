import { DATA } from "@/data/resume";
import type { Locale } from "@/i18n/config";
import type { Messages } from "@/i18n/messages";

type SoftSkillKey = keyof NonNullable<Messages["skills"]>["softSkills"];
type RoleKey = keyof NonNullable<Messages["work"]>["roles"];
type WorkCompanyKey = "kozocom" | "uoy" | "linkhouse" | "mwg";
type FreelanceRegionKey = "vietnam" | "australia" | "japan" | "singapore";

const SOFT_SKILL_BY_LABEL: Record<string, SoftSkillKey> = {
  "Problem investigation": "problemInvestigation",
  "Presentation skills": "presentationSkills",
  "Project management": "projectManagement",
  "Solution design": "solutionDesign",
  "Technical management": "technicalManagement",
};

function pick<T>(
  locale: Locale,
  translated: T | undefined | null,
  fallback: T,
): T {
  if (locale === "en") return fallback;
  return translated ?? fallback;
}

function localizePresent(
  locale: Locale,
  value: string,
  present: string,
): string {
  if (locale === "en") return value;
  return value.replaceAll("Present", present);
}

function employmentLabel(
  locale: Locale,
  type: string,
  messages: Messages,
): string {
  if (locale === "en") return type;
  if (type === "Full-time") return messages.work?.fullTime ?? type;
  if (type === "Part-time") return messages.work?.partTime ?? type;
  if (type === "Freelance") return messages.work?.freelance ?? type;
  return type;
}

export function localizeResume(locale: Locale, messages: Messages) {
  const present = messages.ui.present;

  const stats = DATA.stats.map((stat) => ({
    ...stat,
    label: pick(
      locale,
      messages.stats?.[stat.id as keyof NonNullable<Messages["stats"]>],
      stat.label,
    ),
  }));

  const skills = {
    title: pick(locale, messages.skills?.title, DATA.skills.title),
    description: pick(
      locale,
      messages.skills?.description,
      DATA.skills.description,
    ),
    categories: DATA.skills.categories.map((category) => {
      const categoryName = pick(
        locale,
        messages.skills?.categories?.[
          category.id as keyof NonNullable<
            NonNullable<Messages["skills"]>["categories"]
          >
        ],
        category.name,
      );

      const items =
        category.id === "soft"
          ? category.items.map((item) => {
              const softKey = SOFT_SKILL_BY_LABEL[item];
              return pick(
                locale,
                softKey ? messages.skills?.softSkills?.[softKey] : undefined,
                item,
              );
            })
          : category.items;

      return {
        ...category,
        name: categoryName,
        items,
      };
    }),
  };

  const work = {
    description: pick(
      locale,
      messages.work?.description,
      DATA.work.description,
    ),
    items: DATA.work.items.map((company) => {
      const companyKey = company.id as WorkCompanyKey;
      const translatedResponsibilities = messages.work?.[companyKey];

      return {
        ...company,
        roles: company.roles.map((role) => {
          const titleKey = role.titleKey as RoleKey;
          return {
            ...role,
            title: pick(locale, messages.work?.roles?.[titleKey], role.title),
            employmentType: employmentLabel(
              locale,
              role.employmentType,
              messages,
            ),
            end: localizePresent(locale, role.end, present),
            responsibilities: pick(
              locale,
              translatedResponsibilities
                ? [...translatedResponsibilities]
                : undefined,
              role.responsibilities,
            ),
          };
        }),
      };
    }),
  };

  const freelance = {
    title: pick(locale, messages.freelance?.title, DATA.freelance.title),
    description: pick(
      locale,
      messages.freelance?.description,
      DATA.freelance.description,
    ),
    badge: pick(locale, messages.freelance?.badge, DATA.freelance.badge),
    ndaNote: pick(locale, messages.freelance?.ndaNote, DATA.freelance.ndaNote),
    clients: DATA.freelance.clients.map((client) => {
      const regionKey = client.id as FreelanceRegionKey;
      const region = messages.freelance?.[regionKey];

      return {
        ...client,
        name: employmentLabel(locale, client.name, messages),
        employmentType: employmentLabel(
          locale,
          client.employmentType,
          messages,
        ),
        end: localizePresent(locale, client.end, present),
        description: pick(locale, region?.description, client.description),
        projects: client.projects.map((project) => {
          const localized = region?.projects?.[
            project.id as keyof NonNullable<typeof region>["projects"]
          ] as { title?: string; description?: string } | undefined;

          return {
            ...project,
            title: pick(locale, localized?.title, project.title),
            description: pick(
              locale,
              localized?.description,
              project.description,
            ),
          };
        }),
      };
    }),
  };

  const education = DATA.education.map((item) => ({
    ...item,
    degree: pick(locale, messages.education?.degree, item.degree),
  }));

  const projects = DATA.projects.map((project) => {
    const localized = messages.projects?.[
      project.id as keyof NonNullable<Messages["projects"]>
    ] as { title?: string; description?: string } | undefined;

    return {
      ...project,
      title: pick(locale, localized?.title, project.title),
      description: pick(locale, localized?.description, project.description),
      dates: localizePresent(locale, project.dates, present),
    };
  });

  return {
    ...DATA,
    jobTitle: pick(locale, messages.hero?.jobTitle, DATA.jobTitle),
    description: pick(locale, messages.hero?.description, DATA.description),
    summary: pick(locale, messages.about?.summary, DATA.summary),
    stats,
    skills,
    work,
    freelance,
    education,
    projects,
    navbar: DATA.navbar.map((item) =>
      item.href === "/" ? { ...item, label: messages.ui.home } : item,
    ),
  };
}

export type LocalizedResume = ReturnType<typeof localizeResume>;
