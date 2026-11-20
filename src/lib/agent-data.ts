// Plain, dependency-free portfolio summary for the edge runtime (proxy.ts).
// Content is derived from src/data/resume.tsx (DATA) — keep in sync manually.
// Do NOT import DATA here: resume.tsx pulls in lucide-react/JSX icons,
// which are too heavy for the proxy/edge runtime.

export const AGENT_SITE_URL = "https://thunguyenit.com";

export const AGENT_PROFILE = {
  name: "Thu Nguyen (Jely)",
  jobTitle: "Full-stack Software Engineer & Freelancer",
  location: "Da Nang, Vietnam",
  url: AGENT_SITE_URL,
  description:
    "7+ years experience in software development. Passionate about building scalable and efficient web applications.",
  stats: [
    { value: "7+", label: "Years Experience" },
    { value: "30+", label: "Production Apps" },
    { value: "4", label: "Countries" },
    { value: "8", label: "Companies Served" },
  ],
  email: "jely.big@gmail.com",
  phone: "+84 359 399 320",
  github: "https://github.com/jelyqs",
  facebook: "https://www.facebook.com/Jely.Big/",
  whatsapp: "https://wa.me/84359399320",
  linkedin: "https://www.linkedin.com/in/thu-nguyen-69aa35245",
  itch: "https://jelyqs.itch.io",
  resume: "https://jelyqs.github.io/resume.pdf",
};

export const AGENT_WORK = [
  {
    company: "Kozocom Vietnam Co., Ltd",
    title: "Full-stack Software Engineer",
    period: "Oct 2022 - Present",
    location: "Da Nang, Vietnam",
    notes:
      "Web platforms for Japanese clients (e-commerce, corporate catering, renewable-energy management) with NestJS, React, and AWS serverless.",
  },
  {
    company: "UOYMedia",
    title: "PHP Software Engineer",
    period: "Jun 2021 - Sep 2022",
    location: "Da Nang, Vietnam",
    notes:
      "Tooling for a POD print business serving US/EU markets; synced product data across WooCommerce, Amazon, and Shopify.",
  },
  {
    company: "LINKHOUSE",
    title: "PHP Software Engineer",
    period: "Mar 2019 - May 2021",
    location: "Da Nang, Vietnam",
    notes:
      "Real-estate CRM: HR module, customer management with loyalty points, project management, and REST APIs for the mobile app.",
  },
  {
    company: "MWG",
    title: "IT Support",
    period: "Aug 2016 - Jun 2018",
    location: "Da Nang, Vietnam",
    notes: "Provided software technical support.",
  },
];

export const AGENT_FREELANCE = [
  {
    region: "Vietnam",
    period: "2018 - Present",
    notes:
      "Social-service, file-download, boarding-house, and shop products, plus a friend debt-tracking app.",
  },
  {
    region: "Australia",
    period: "Mar 2025 - Present",
    notes:
      "Digital storefront, eSIM shop, car valuation, horoscope product, and automation tools.",
  },
  {
    region: "Japan",
    period: "May 2025 - Jun 2026",
    notes:
      "Creator marketplace, LED ad bidding, AI auto-reply SaaS, catalog OCR, rental operations, and Amazon selling tools.",
  },
  {
    region: "Singapore",
    period: "Nov 2023 - Dec 2024",
    notes:
      "Booking, HR, lending, fleet, and operations products, plus company and marketing sites.",
  },
];

export const AGENT_PROJECTS = [
  {
    title: "Cozy Game Assets (itch.io)",
    dates: "2024 - Present",
    description:
      "Original cozy pixel icons, UI kits, combat VFX, and game audio packs — made with code, no generative AI art.",
    tech: ["Pixel Art", "Game Audio", "UI Kits", "itch.io"],
    href: "https://jelyqs.itch.io",
  },
  {
    title: "Friend Debt Tracker",
    dates: "Oct 2026",
    description:
      "Mobile app for tracking money lent between friends: two-sided confirmations, auto reminders, history, and 30-day trash. Includes a web admin.",
    tech: ["React Native", "TypeScript", "Firebase", "FCM"],
  },
  {
    title: "PayPal Sandbox Autofill",
    dates: "Oct 2026",
    description:
      "Chrome extension (MV3) that fills PayPal sandbox test-card data into checkout forms.",
    tech: ["TypeScript", "Chrome Extension"],
  },
  {
    title: "Online Wedding Invitation",
    dates: "Oct 2026",
    description:
      "Online wedding invitation in two editions (deep red / navy) for the 29 Dec 2026 wedding: program, maps, and a separate guestbook per edition.",
    tech: ["HTML", "CSS", "JavaScript", "Cloudflare Pages"],
    href: "https://hang-thinh.pages.dev",
  },
  {
    title: "Digital Storefront",
    dates: "2025",
    description:
      "Storefront for accounts, courses, and downloadable content, with cart, PayPal checkout, gift codes, and an admin console. Built for an Australian client.",
    tech: ["Next.js", "NestJS", "PostgreSQL", "Prisma", "PayPal", "RAG"],
  },
  {
    title: "eSIM Shop",
    dates: "2025",
    description:
      "eSIM shop with country catalogs, checkout, top-ups, order history, referrals, loyalty, and an admin. Built for an Australian client.",
    tech: ["Next.js", "MySQL", "Prisma", "Cloudflare R2"],
  },
  {
    title: "AI Auto-Reply",
    dates: "2025",
    description:
      "AI auto-reply SaaS that replies on Slack, LINE, Chatwork, and Facebook Messenger, then creates Google Calendar tasks. Built for a Japanese client.",
    tech: ["React", "TypeScript", "Express", "MongoDB", "Stripe", "OpenAI"],
  },
  {
    title: "Service Booking",
    dates: "2023",
    description:
      "Service booking platform with a customer web app, a mobile app, a vendor portal, and an admin console. Built for a Singapore client.",
    tech: ["React", "TypeScript", "React Native", "Node.js", "MySQL", "Stripe"],
  },
];

export const AGENT_SKILLS = [
  "TypeScript",
  "JavaScript",
  "PHP",
  "Python",
  "React",
  "Next.js",
  "React Native",
  "Node.js",
  "NestJS",
  "Express",
  "FastAPI",
  "Laravel",
  "MySQL",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "Prisma",
  "AWS (Lambda, Amplify, AppSync, DynamoDB)",
  "Firebase",
  "Docker",
  "CI/CD",
  "WordPress",
  "Shopify",
  "Stripe",
  "PayPal",
  "OpenAI",
  "RAG",
];

export function buildPortfolioMarkdown(): string {
  const p = AGENT_PROFILE;
  const lines: string[] = [
    `# ${p.name}`,
    "",
    `${p.jobTitle} — ${p.location}`,
    "",
    p.description,
    "",
    `Website: ${p.url} | Resume: ${p.resume}`,
    "",
    "## Highlights",
    "",
    ...p.stats.map((s) => `- ${s.value} ${s.label}`),
    "",
    "## Work History",
    "",
    ...AGENT_WORK.flatMap((w) => [
      `### ${w.company} — ${w.title}`,
      `${w.period} · ${w.location}`,
      w.notes,
      "",
    ]),
    "## Freelance",
    "",
    ...AGENT_FREELANCE.map(
      (f) => `- ${f.region} (${f.period}): ${f.notes}`,
    ),
    "",
    "## Projects",
    "",
    ...AGENT_PROJECTS.flatMap((pr) => [
      `### ${pr.title} (${pr.dates})`,
      pr.description,
      `Tech: ${pr.tech.join(", ")}`,
      ...(pr.href ? [`Link: ${pr.href}`] : []),
      "",
    ]),
    "## Skills",
    "",
    AGENT_SKILLS.join(", "),
    "",
    "## Contact",
    "",
    `- Email: ${p.email}`,
    `- Phone: ${p.phone}`,
    `- GitHub: ${p.github}`,
    `- Facebook: ${p.facebook}`,
    `- WhatsApp: ${p.whatsapp}`,
    `- LinkedIn: ${p.linkedin}`,
    `- itch.io: ${p.itch}`,
    "",
    "## Machine-readable versions",
    "",
    `- llms.txt: ${AGENT_SITE_URL}/llms.txt`,
    `- Full text: ${AGENT_SITE_URL}/llms-full.txt`,
    `- AI catalog: ${AGENT_SITE_URL}/.well-known/ai-catalog.json`,
    `- MCP server (Streamable HTTP): ${AGENT_SITE_URL}/mcp`,
    "",
  ];
  return lines.join("\n");
}
