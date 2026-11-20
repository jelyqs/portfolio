/**
 * English UI chrome only. Resume content for `en` comes from `src/data/resume.tsx`.
 * Content overlays live in `vi.ts` / `ja.ts` and fall back to resume when missing.
 */
export const messages = {
  ui: {
    home: "Home",
    language: "Language",
    theme: "Theme",
    about: "About",
    education: "Education",
    experience: "Experience",
    resume: "Resume",
    download: "Download",
    showLess: "Show less",
    more: "+{count} more",
    projectsCount: "{count} project",
    projectsCountPlural: "{count} projects",
    clientsCount: "{count} client",
    clientsCountPlural: "{count} clients",
    contact: "Contact",
    getInTouch: "Get in Touch",
    contactBodyBefore: "Want to chat? Message me on",
    contactBodyOr: "or email",
    contactBodyAfter: ". I'll respond whenever I can.",
    myProjects: "My Projects",
    projectsHeading: "Check out my latest work",
    projectsIntro:
      "I've worked on a variety of projects, from simple websites to complex web applications. Here are a few of my favorites.",
    greeting: "Hi, I'm {name}",
    present: "Present",
    hireMe: "Hire Me",
    viewProjects: "View Projects",
    available: "Available for freelance",
    copyEmail: "Copy email",
    copied: "Copied!",
    sections: "Sections",
  },
} as const;
