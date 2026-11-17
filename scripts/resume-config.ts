/**
 * CV-only facts that do NOT live in src/data/resume.tsx.
 *
 * The generator takes career facts (work, freelance, skills, projects,
 * education, contact) from DATA and combines them with this config:
 * personal details, the photo, and the extra
 * fields the CV project tables need (customer / team size / position),
 * which DATA.projects does not carry. Missing fields are omitted from
 * the PDF — no invented defaults.
 *
 * Edit this file to change anything CV-specific. To change a career
 * fact, edit DATA instead — the CV follows automatically.
 */

export interface ProjectDetail {
  customer?: string;
  teamSize?: number | string;
  position?: string;
  /** Optional. Row is hidden when empty / omitted. */
  responsibilities?: string[];
}

export interface ExtraProject extends ProjectDetail {
  title: string;
  dates: string;
  description: string;
  technologies: string[];
}

export interface ResumeConfig {
  /** Full legal name, printed at the top of the CV. */
  fullName: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  /** GitLab profile shown in the GIT section (DATA only carries GitHub). */
  gitlabUrl: string;
  /** Photo path, relative to the repo root. Rendered as a round avatar. */
  photoPath: string;
  /** Label for the website row in the header info table. */
  websiteLabel: string;
  /**
   * CV table details for each project in DATA.projects, keyed by the
   * project id. A project missing here still renders; only title,
   * dates, description, and technologies from DATA are shown.
   */
  projectDetails: Record<string, ProjectDetail>;
  /** Personal projects that are NOT in DATA.projects (rendered after them). */
  extraProjects: ExtraProject[];
  /** Pre-2023 company projects, kept only in the CV (not in DATA). */
  legacyProjects: ExtraProject[];
  includeExtraProjects: boolean;
  includeLegacyProjects: boolean;
}

export const RESUME_CONFIG: ResumeConfig = {
  fullName: "NGUYEN PHUOC THU",
  dateOfBirth: "Feb 03, 1995",
  gender: "Male",
  address: "Da Nang, Viet Nam",
  gitlabUrl: "https://gitlab.com/jely.big",
  photoPath: "public/images/me.jpeg",
  websiteLabel: "Portfolio",

  projectDetails: {
    friendDebt: {
      customer: "Personal client",
      teamSize: 1,
      position: "Developer",
      responsibilities: [
        "Analysis and design",
        "Full-stack development (mobile app + admin web)",
        "Dual-confirmation flow, push reminders, 30-day trash",
        "156 automated tests",
      ],
    },
    creator: {
      customer: "Japanese client",
      teamSize: 1,
      position: "Developer",
      responsibilities: [
        "Analysis and design",
        "Full-stack development",
        "Paid livestreams, VOD sales, 1:1 video calls",
        "Stripe billing including konbini",
      ],
    },
    digital: {
      customer: "Australian client",
      teamSize: 1,
      position: "Developer",
      responsibilities: [
        "Analysis and design",
        "Full-stack development",
        "NestJS API serving web and mobile clients",
        "RAG chat bot answering from shop data",
      ],
    },
    esimShop: {
      customer: "Australian client",
      teamSize: 1,
      position: "Developer",
      responsibilities: [
        "Analysis and design",
        "Full-stack development",
        "Country catalogs, checkout, top-ups, referrals and loyalty",
        "Admin for products, providers and commissions",
      ],
    },
    autoReply: {
      customer: "Japanese client",
      teamSize: 1,
      position: "Developer",
      responsibilities: [
        "Analysis and design",
        "Full-stack development",
        "Multi-platform auto-reply (Slack, LINE, Chatwork, Messenger)",
        "Google Calendar task creation from conversations",
      ],
    },
    booking: {
      customer: "Singapore client",
      teamSize: 1,
      position: "Developer",
      responsibilities: [
        "Analysis and design",
        "Full-stack development",
        "Customer web app, mobile app, vendor portal, admin console",
      ],
    },
    cozy: {
      customer: "Indie developers (itch.io)",
      teamSize: 1,
      position: "Creator / Developer",
      responsibilities: [
        "Design and build all assets with code",
        "Store publishing and bundle/sale setup on itch.io",
      ],
    },
    wedding: {
      customer: "Private client (wedding)",
      teamSize: 1,
      position: "Developer",
      responsibilities: [
        "Analysis and design",
        "Development",
        "Deploy Cloudflare Pages",
      ],
    },
    paypal: {
      customer: "Personal project",
      teamSize: 1,
      position: "Developer",
      responsibilities: [
        "Analysis and design",
        "Extension development (Chrome MV3)",
      ],
    },
  },

  extraProjects: [
    {
      title: "dog-rpr",
      dates: "10/2026 - Present",
      description:
        "Auto-combat idle RPG starring a dog: 32 breeds up to Lv1000, each with a signature skill; offline rewards.",
      customer: "Personal project",
      teamSize: 1,
      position: "Developer",
      responsibilities: [
        "Game design and balance (365-day pacing)",
        "Phaser 3 client development",
        "Supabase backend (RPC-first)",
      ],
      technologies: ["Phaser 3, TypeScript", "Database: Supabase (PostgreSQL)"],
    },
    {
      title: "Bot Quân Sư",
      dates: "10/2026",
      description:
        "AI dating advisor app: analyzes chat screenshots and suggests replies with follow-up reminders.",
      customer: "Personal project",
      teamSize: 1,
      position: "Developer",
      responsibilities: [
        "Analysis and design",
        "Flutter app with share-target flow",
        "FastAPI backend (image analysis API)",
      ],
      technologies: ["Flutter, Python, FastAPI"],
    },
  ],

  legacyProjects: [
    {
      title: "News",
      dates: "10/2021 - 02/2022",
      description:
        "Social networking news site, managing readers, collaborators, internal staff, posting and reviewing articles, calculating bonus points, ...",
      customer: "DCC Holding JSC",
      teamSize: 5,
      position: "Developer",
      responsibilities: [
        "List features by module",
        "Business analysis and participation in system design",
        "Build VPS server Ubuntu 20.04",
        "Optimize code",
        "Bug Fixing",
        "SEO Support",
        "Development",
      ],
      technologies: [
        "HTML, CSS, JavaScript",
        "PHP 7.4",
        "Laravel framework 7.29",
        "Database: MySQL",
      ],
    },
    {
      title: "Document Management",
      dates: "08/2021 - 10/2021",
      description:
        "Management of staff information and legal documents. Authorization to publish and download legal documents",
      customer: "Hoa Vang District Police",
      teamSize: 4,
      position: "Developer",
      responsibilities: [
        "Analysis and design",
        "Deploy cPanel",
        "Optimize code",
        "Bug Fixing",
        "Development",
      ],
      technologies: [
        "HTML, CSS, JavaScript",
        "PHP 7.4, Laravel framework 7.29",
        "Database: MySQL",
      ],
    },
    {
      title: "SaleBuy Shop",
      dates: "06/2021 - 07/2021",
      description: "Online shop for SaleBuy",
      customer: "SaleBuy",
      teamSize: 3,
      position: "Developer",
      responsibilities: [
        "Analysis and design",
        "Deploy cPanel",
        "Optimize code",
        "Bug Fixing",
        "SEO Support",
        "Development",
      ],
      technologies: [
        "HTML, CSS, JavaScript",
        "PHP 5.5, Laravel framework 5.2",
        "Database: MySQL",
      ],
    },
    {
      title: "Bestaff",
      dates: "02/2020 - 09/2020",
      description:
        "Software for personnel management, division of work shifts, ... of coffee shops",
      customer: "Bestaff",
      teamSize: 6,
      position: "Developer",
      responsibilities: [
        "List features by module",
        "Business analysis and participation in system design",
        "Collaborate with the FE team to build the interface",
        "Development",
        "Optimize code",
        "Bug Fixing",
        "Writing APIs for android/ios apps",
      ],
      technologies: [
        "HTML, CSS, JavaScript",
        "PHP 7.2, Laravel framework 6.19",
        "Database: MySQL",
      ],
    },
    {
      title: "Linkconnect",
      dates: "03/2019 - 04/2020",
      description:
        "Build CRM system: Personnel management application (Timekeeping, salary calculation, commission, leave, overtime, ...), customers (personal information, bonus points), real estate projects (booking, information)",
      customer: "Linkhouse Mien Trung",
      teamSize: 8,
      position: "Developer",
      responsibilities: [
        "List features by module",
        "Business analysis and participation in system design",
        "Collaborate with the FE team to build the interface",
        "Writing APIs for mobile apps",
        "Development",
        "Optimize code",
        "Bug Fixing",
      ],
      technologies: [
        "HTML, CSS, JavaScript",
        "PHP 7.1, Laravel framework 6.0",
        "Database: MySQL",
      ],
    },
    {
      title: "Recruitment",
      dates: "08/2020 - 09/2020",
      description: "List jobs, users submit CV online",
      customer: "DCC Holding JSC",
      teamSize: 2,
      position: "Developer",
      responsibilities: [
        "Analysis and design",
        "Deploy cPanel",
        "Development",
        "Optimize code",
        "Bug Fixing",
      ],
      technologies: [
        "HTML, CSS, JavaScript",
        "PHP 5.5, Laravel framework 5.2",
        "Database: MySQL",
      ],
    },
    {
      title: "Company Introduction",
      dates: "08/2020 - 09/2020",
      description: "Company introduction, projects, partners, customers, ...",
      customer: "DCC Holding JSC",
      teamSize: 2,
      position: "Developer",
      responsibilities: [
        "Analysis and design",
        "Deploy cPanel",
        "Development",
        "Optimize code",
        "Bug Fixing",
      ],
      technologies: [
        "HTML, CSS, JavaScript",
        "PHP 5.5, Laravel framework 5.2",
        "Database: MySQL",
      ],
    },
    {
      title: "Shop (DCC Holding JSC)",
      dates: "03/2020 - 05/2020",
      description: "Online shop for DCC Holding JSC",
      customer: "DCC Holding JSC",
      teamSize: 2,
      position: "Developer",
      responsibilities: [
        "Analysis and design",
        "Deploy cPanel",
        "Optimize code",
        "Bug Fixing",
        "SEO Support",
        "Development",
      ],
      technologies: [
        "HTML, CSS, JavaScript",
        "PHP 5.5, Laravel framework 5.2",
        "Database: MySQL",
      ],
    },
  ],

  includeExtraProjects: false,
  includeLegacyProjects: false,
};
