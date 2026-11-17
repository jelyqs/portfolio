import { Icons } from "@/components/icons";
import { HomeIcon } from "lucide-react";

export const DATA = {
  name: "Thu Nguyen (Jely)",
  jobTitle: "Full-stack Software Engineer & Freelancer",
  initials: "ThuNg",
  url: "https://thunguyenit.com",
  location: "Da Nang, Vietnam",
  locationLink: "https://www.google.com/maps/place/Da+Nang",
  description: `7+ years experience in software development. Passionate about building scalable and efficient web applications.`,
  resumeUrl: "https://jelyqs.github.io/resume.pdf",
  summary: `I'm a seasoned Software Engineer with over 7 years of hands-on experience in designing, developing, and deploying high-quality web and mobile applications. My passion lies in solving complex problems and building robust, scalable solutions from the ground up.

My expertise spans the full stack, from creating intuitive user interfaces with **React / Next.js** to engineering powerful back-end systems with **PHP / Laravel** and **Node.js / Express / NestJS**. I am also proficient in leveraging **AWS services** for scalable cloud infrastructure and have strong **DevOps** skills in managing and automating deployments on **Linux (Ubuntu) servers**.

- 🔭 I'm currently working on building scalable microservices and enhancing cloud infrastructure.
- 🌱 I'm currently learning more about Serverless Architecture and advanced CI/CD pipelines.
- 💬 Ask me about **anything** related to web development!
- 📫 How to reach me: **jely.big@gmail.com** | **thunguyen.developer@gmail.com**
- ⚡ Fun fact: I believe the best code is simple, elegant, and easy to maintain.
`,
  avatarUrl: "/images/me.jpeg",
  logoUrl: "/favicon/favicon.svg",
  bannerUrl: "/images/banner.png",
  faviconUrl: "/favicon/favicon.svg",
  stats: [
    { id: "yearsExperience", value: "7+", label: "Years Experience" },
    { id: "productionApps", value: "30+", label: "Production Apps" },
    { id: "countries", value: "4", label: "Countries" },
    { id: "companiesServed", value: "8", label: "Companies Served" },
  ],
  skills: {
    title: "Technical Skills",
    description: "Technologies I work with in production environments",
    categories: [
      {
        id: "languages",
        name: "Languages",
        icon: "languages",
        items: ["JavaScript", "TypeScript", "PHP", "Python", "Bash Shell"],
      },
      {
        id: "practices",
        name: "Engineering Practices",
        icon: "practices",
        items: [
          "OOP",
          "Clean Code",
          "Design Patterns (Factory, Singleton, Observer)",
        ],
      },
      {
        id: "backend",
        name: "Backend",
        icon: "frameworks",
        items: [
          "Laravel",
          "Node.js",
          "Express",
          "NestJS",
          "FastAPI",
          "CodeIgniter",
        ],
      },
      {
        id: "frontend",
        name: "Frontend",
        icon: "frontend",
        items: [
          "React",
          "Next.js",
          "React Native",
          "Vue",
          "Redux",
          "Apollo Client",
          "Tailwind CSS",
          "shadcn/ui",
          "MUI",
          "Bootstrap",
          "SASS",
          "HTML5",
          "CSS3",
          "Responsive Web Design",
          "Vite",
          "Webpack",
          "Babel",
          "Ajax",
        ],
      },
      {
        id: "databases",
        name: "Databases & ORM",
        icon: "databases",
        items: [
          "MySQL",
          "PostgreSQL",
          "MongoDB",
          "Redis",
          "DynamoDB",
          "SQLite",
          "AWS Aurora",
          "Elasticsearch",
          "Prisma",
          "Eloquent",
          "Doctrine",
          "Sequelize",
          "TypeORM",
        ],
      },
      {
        id: "cms",
        name: "CMS & E-commerce",
        icon: "cms",
        items: ["WordPress", "Shopify"],
      },
      {
        id: "cloud",
        name: "Cloud",
        icon: "cloud",
        items: [
          "AWS",
          "EC2",
          "Lambda",
          "API Gateway",
          "AppSync",
          "Amplify",
          "RDS",
          "AWS S3",
          "CloudWatch",
          "Load Balancer",
          "Auto Scaling",
          "AWS CDK",
          "AWS SAM",
          "Serverless Framework",
          "AWS IVS",
          "Amazon Chime",
          "Firebase",
          "Cloud Functions",
        ],
      },
      {
        id: "devops",
        name: "DevOps & Servers",
        icon: "devops",
        items: [
          "Docker",
          "CI/CD",
          "GitHub Actions",
          "CircleCI",
          "Jenkins",
          "Terraform",
          "Ansible",
          "Linux (Ubuntu, CentOS, Amazon Linux)",
          "VPS setup (Ubuntu 20.x – 26.x)",
          "Nginx",
          "Apache2",
          "PHP-FPM",
          "PM2",
          "Supervisor",
          "Crontab",
          "Prometheus",
          "Grafana",
          "cPanel",
        ],
      },
      {
        id: "api",
        name: "APIs, Auth & Payments",
        icon: "api",
        items: [
          "REST API",
          "GraphQL",
          "WebSocket",
          "WebRTC",
          "Swagger",
          "JWT",
          "OAuth2",
          "Auth0",
          "Stripe",
          "PayPal",
        ],
      },
      {
        id: "ai",
        name: "AI",
        icon: "ai",
        items: ["OpenAI", "RAG", "Prompt Engineering"],
      },
      {
        id: "libraries",
        name: "Libraries & Integrations",
        icon: "libraries",
        items: [
          "Chrome Extension",
          "Telegram Bot",
          "Discord.js",
          "mediasoup",
          "ElevenLabs",
        ],
      },
      {
        id: "testing",
        name: "Testing",
        icon: "testing",
        items: ["Unit test", "Performance testing", "Jest"],
      },
      {
        id: "tools",
        name: "Tools",
        icon: "tools",
        items: [
          "Git",
          "VS Code",
          "Cursor",
          "GitHub Copilot",
          "Postman",
          "Altair GraphQL",
          "Laravel Valet",
          "npm",
          "Yarn",
          "pnpm",
          "Jira",
          "Backlog",
          "Notion",
          "Figma",
          "Adobe XD",
        ],
      },
      {
        id: "soft",
        name: "Soft Skills",
        icon: "soft",
        items: [
          "Problem investigation",
          "Presentation skills",
          "Project management",
          "Solution design",
          "Technical management",
        ],
      },
    ],
  },
  navbar: [{ href: "/", icon: HomeIcon, label: "Home" }],
  contact: {
    email: "jely.big@gmail.com",
    tel: "+84359399320",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/jelyqs",
        icon: Icons.github,
        navbar: true,
      },
      Facebook: {
        name: "Facebook",
        url: "https://www.facebook.com/Jely.Big/",
        icon: Icons.facebook,
        navbar: true,
      },
      WhatsApp: {
        name: "WhatsApp",
        url: "https://wa.me/84359399320",
        icon: Icons.whatsapp,
        navbar: true,
      },
      Itch: {
        name: "itch.io",
        url: "https://jelyqs.itch.io",
        icon: Icons.globe,
        navbar: false,
      },
      email: {
        name: "Send Email",
        url: "mailto:jely.big@gmail.com",
        icon: Icons.email,
        navbar: false,
      },
    },
  },

  work: {
    description:
      "My professional journey — full-time roles and independent projects",
    items: [
      {
        id: "kozocom",
        company: "Kozocom Vietnam Co., Ltd",
        href: "#",
        location: "Da Nang, Vietnam",
        logoUrl: "",
        roles: [
          {
            titleKey: "fullstack",
            title: "Full-stack Software Engineer",
            employmentType: "Full-time",
            start: "Oct 2022",
            end: "Present",
            responsibilities: [
              "Build and maintain web platforms for Japanese clients in e-commerce, corporate catering, and renewable-energy management",
              "Ship features and fix production bugs across the stack with NestJS, React, and AWS serverless (Amplify, AppSync, Lambda, DynamoDB)",
              "Maintain management tools and sync product data across WooCommerce, Amazon, and Shopify",
              "Customize Shopify storefronts and integrate third-party packages, plugins, and APIs",
              "Work with AWS services including IAM, Amplify, Lambda, API Gateway, and CloudWatch",
              "Set up an AI-assisted workflow with Claude Code for specs, QA, and code review",
              "Boosted productivity and shortened codebase investigation",
              "Caught bugs earlier and kept project documentation consistent",
            ],
            achievements: [],
            technologies: [
              "TypeScript",
              "React/Next.js",
              "PHP/Laravel",
              "Node.js/NestJS",
              "WordPress",
              "Shopify",
              "Docker",
              "AWS",
              "MySQL",
              "PostgreSQL",
              "DynamoDB",
              "REST API",
              "API Gateway",
              "Amplify",
              "AppSync",
              "Lambda",
              "CloudWatch",
            ],
          },
        ],
      },
      {
        id: "uoy",
        company: "UOYMedia",
        href: "#",
        location: "Da Nang, Vietnam",
        logoUrl: "",
        roles: [
          {
            titleKey: "php",
            title: "PHP Software Engineer",
            employmentType: "Full-time",
            start: "Jun 2021",
            end: "Sep 2022",
            responsibilities: [
              "Built and maintained tooling for a POD print business serving US/EU markets",
              "Synced product data between WooCommerce, Amazon, and Shopify",
              "Customized WordPress landing pages and Shopify interfaces",
              "Wrote shortcodes and plugins for cart and order flows",
              "Integrated Google Sheets, Google Analytics, and Facebook Ads APIs",
            ],
            achievements: [],
            technologies: [
              "JavaScript",
              "PHP/Laravel",
              "WordPress",
              "Shopify",
              "Docker",
              "MySQL",
              "REST API",
            ],
          },
        ],
      },
      {
        id: "linkhouse",
        company: "LINKHOUSE",
        href: "#",
        location: "Da Nang, Vietnam",
        logoUrl: "",
        roles: [
          {
            titleKey: "php",
            title: "PHP Software Engineer",
            employmentType: "Full-time",
            start: "Mar 2019",
            end: "May 2021",
            responsibilities: [
              "Built the HR module of a real-estate CRM: attendance, payroll, commission, leave, and overtime",
              "Built customer management with profiles and loyalty points",
              "Built project management with booking and listings",
              "Delivered REST APIs for the mobile app",
            ],
            achievements: [],
            technologies: [
              "JavaScript",
              "PHP/Laravel",
              "Firebase",
              "MySQL",
              "REST API",
            ],
          },
        ],
      },
      {
        id: "mwg",
        company: "MWG",
        href: "#",
        location: "Da Nang, Vietnam",
        logoUrl: "",
        roles: [
          {
            titleKey: "itSupport",
            title: "IT Support",
            employmentType: "Full-time",
            start: "Aug 2016",
            end: "Jun 2018",
            responsibilities: ["Provided software technical support"],
            achievements: [],
            technologies: ["IT Support", "Software"],
          },
        ],
      },
    ],
  },
  freelance: {
    title: "Freelance & Side Projects",
    description: "Running alongside full-time",
    badge: "Concurrent",
    ndaNote: "Project names have been changed for NDA reasons.",
    clients: [
      {
        name: "Freelance",
        href: "#",
        id: "vietnam",
        location: "Vietnam",
        employmentType: "Freelance",
        start: "2018",
        end: "Present",
        description:
          "Built social-service, file-download, boarding-house, and shop products for Vietnamese clients, plus a friend debt-tracking app.",
        technologies: [
          "PHP/Laravel",
          "MySQL",
          "React Native",
          "Firebase",
          "JavaScript",
          "Tailwind CSS",
          "Docker",
          "Chrome Extension",
        ],
        projects: [
          {
            id: "socialServicePanel",
            title: "Social Service Panel",
            description:
              "Social-service platform for TikTok, YouTube, and Facebook orders, with a wallet, proxy inventory, and seller tools. A browser extension shows when seller orders are completed.",
            technologies: ["PHP/Laravel", "MySQL", "Docker", "JavaScript"],
          },
          {
            id: "fileDownload",
            title: "File Download Service",
            description:
              "File download service with membership packages, download history, referrals, and withdrawals.",
            technologies: ["PHP/Laravel", "MySQL"],
          },
          {
            id: "boardingHouse",
            title: "Boarding House Manager",
            description:
              "Boarding-house system for buildings, rooms, check-in and check-out, deposits, invoices, and repair costs.",
            technologies: ["PHP/Laravel", "MySQL", "Tailwind CSS"],
          },
          {
            id: "onlineShop",
            title: "Online Shop",
            description:
              "Online shop with product pages, a cart, checkout, VietQR payment, and order history.",
            technologies: ["PHP/Laravel", "MySQL"],
          },
          {
            id: "friendDebt",
            title: "Friend Debt Tracker",
            description:
              "Mobile app for tracking money lent between friends, with confirmations, reminders, and an admin console.",
            technologies: [
              "React Native",
              "TypeScript",
              "Firebase",
              "Cloud Functions",
            ],
          },
          {
            id: "socialId",
            title: "Social ID Lookup",
            description:
              "Browser extension that reads a Facebook profile, page, or group URL and returns its ID.",
            technologies: ["JavaScript", "Chrome Extension"],
          },
        ],
      },
      {
        name: "Freelance",
        href: "#",
        id: "australia",
        location: "Australia",
        employmentType: "Freelance",
        start: "Mar 2025",
        end: "Present",
        description:
          "Shipped a digital storefront, an eSIM shop, car valuation, a horoscope product, and automation tools for Australian clients.",
        technologies: [
          "Next.js",
          "NestJS",
          "Python",
          "MySQL",
          "PostgreSQL",
          "Prisma",
          "PayPal",
          "Redis",
          "Telegram",
          "Cloudflare R2",
          "OpenAI",
          "RAG",
        ],
        projects: [
          {
            id: "digitalStorefront",
            title: "Digital Storefront",
            description:
              "Storefront for accounts, courses, and downloadable content, with cart, PayPal checkout, gift codes, and an admin console. A NestJS API serves the web app and mobile clients. A chat bot answers from shop data with RAG.",
            technologies: [
              "Next.js",
              "NestJS",
              "PostgreSQL",
              "Prisma",
              "PayPal",
              "RAG",
            ],
          },
          {
            id: "esimShop",
            title: "eSIM Shop",
            description:
              "eSIM shop with country catalogs, checkout, top-ups, order history, referrals, loyalty, and an admin for products, providers, and commissions.",
            technologies: ["Next.js", "MySQL", "Prisma", "Cloudflare R2"],
          },
          {
            id: "horoscope",
            title: "Horoscope Studio",
            description:
              "Horoscope product for chart lookups, predictions, feng shui, lunar dates, and paid readings. OpenAI writes the interpretations from chart data with RAG.",
            technologies: [
              "Next.js",
              "Python",
              "PostgreSQL",
              "Prisma",
              "OpenAI",
              "RAG",
            ],
          },
          {
            id: "vehicle",
            title: "Vehicle Valuation",
            description:
              "Car valuation flow covering vehicle details, photo listings, and payment history. OpenAI writes the appraisal from the vehicle data and photos with RAG.",
            technologies: ["Next.js", "PostgreSQL", "Prisma", "OpenAI", "RAG"],
          },
          {
            id: "proxyBot",
            title: "Proxy Sales Bot",
            description:
              "Telegram bot for selling and managing proxies, with wallet top-up, orders, and an admin dashboard.",
            technologies: ["Python", "PostgreSQL", "Redis", "Telegram"],
          },
          {
            id: "accessCode",
            title: "Access Code Forwarder",
            description:
              "Service that scans household account emails and forwards access codes to matching customers.",
            technologies: ["Python", "FastAPI"],
          },
          {
            id: "tts",
            title: "Text-to-Speech",
            description:
              "Text-to-speech app that generates voices from written text.",
            technologies: ["Next.js", "ElevenLabs"],
          },
          {
            id: "transcription",
            title: "Short-Video Transcription",
            description:
              "Command-line pipeline that transcribes short-form videos.",
            technologies: ["Python"],
          },
          {
            id: "landing",
            title: "Service Marketing Site",
            description:
              "Marketing site for website and design packages, with a portfolio, FAQs, and a contact form.",
            technologies: ["Next.js", "Tailwind CSS"],
          },
        ],
      },
      {
        name: "Freelance",
        href: "#",
        id: "japan",
        location: "Japan",
        employmentType: "Freelance",
        start: "May 2025",
        end: "Jun 2026",
        description:
          "Shipped full-stack products for Japanese clients: a creator marketplace, LED ad bidding, an AI auto-reply SaaS, catalog OCR, rental operations, and Amazon selling tools.",
        technologies: [
          "React/TypeScript",
          "Node.js/Express",
          "Python/FastAPI",
          "MongoDB",
          "PostgreSQL",
          "Stripe",
          "AWS",
          "WebRTC",
          "Tailwind CSS",
          "OpenAI",
        ],
        projects: [
          {
            id: "creator",
            title: "Creator Marketplace",
            description:
              "Creator platform for paid livestreams, VOD sales, 1:1 video calls, fan clubs, tickets, and Stripe billing including konbini.",
            technologies: [
              "React/TypeScript",
              "Express",
              "MongoDB",
              "Stripe",
              "AWS IVS",
              "Amazon Chime",
              "mediasoup",
            ],
          },
          {
            id: "billboard",
            title: "Billboard Marketplace",
            description:
              "Billboard ad marketplace with time-slot bidding, video upload and approval, invoices, and an admin dashboard.",
            technologies: ["React", "Express", "MongoDB", "Tailwind CSS"],
          },
          {
            id: "autoReply",
            title: "AI Auto-Reply",
            description:
              "AI auto-reply SaaS that replies on Slack, LINE, Chatwork, and Facebook Messenger, then creates Google Calendar tasks from the conversation.",
            technologies: [
              "React/TypeScript",
              "Express",
              "MongoDB",
              "Stripe",
              "OpenAI",
            ],
          },
          {
            id: "ocr",
            title: "Catalog OCR",
            description:
              "Extracts structured fields from Japanese product catalogs — name, SKU, character, release date, and price — then exports CSV and Excel.",
            technologies: ["React", "FastAPI", "MongoDB", "OpenAI"],
          },
          {
            id: "rental",
            title: "Rental Operations",
            description:
              "Property operations system covering contracts, partners, delinquency, remittance, renewal fees, and collection-agency workflows.",
            technologies: ["React", "Express", "MongoDB", "JWT"],
          },
          {
            id: "listings",
            title: "Cross-Border Listings",
            description:
              "Japan–US Amazon selling tool with regional storefronts for the US, Australia, Canada, Singapore, and eBay — listings, price updates, and sales management.",
            technologies: ["React", "HTML/CSS", "JavaScript"],
          },
          {
            id: "subBot",
            title: "Subscription Bot",
            description:
              "Discord bot that sells monthly plans through Stripe, assigns premium roles from webhooks, and keeps a grandfathered free tier.",
            technologies: ["Node.js", "Stripe", "Discord.js", "SQLite"],
          },
        ],
      },
      {
        name: "Freelance",
        href: "#",
        id: "singapore",
        location: "Singapore",
        employmentType: "Part-time",
        start: "Nov 2023",
        end: "Dec 2024",
        description:
          "Built booking, HR, lending, fleet, and operations products for Singapore clients, plus company and marketing sites.",
        technologies: [
          "React/TypeScript",
          "React Native",
          "Node.js/Express",
          "PHP/Laravel",
          "MySQL",
          "WordPress",
          "Stripe",
          "Redis",
          "Docker",
          "CodeIgniter",
        ],
        projects: [
          {
            id: "booking",
            title: "Service Booking",
            description:
              "Service booking platform with a customer web app, a mobile app, a vendor portal, and an admin console. Covers one-time and recurring bookings, quotes, invoices, GST, and technician scheduling.",
            technologies: [
              "React/TypeScript",
              "React Native",
              "Node.js",
              "MySQL",
              "Stripe",
              "Redis",
            ],
          },
          {
            id: "hr",
            title: "HR Platform",
            description:
              "HR platform for payroll and payslips, leave, hiring and interviews, organization structure, and desk and room booking.",
            technologies: ["React", "MySQL"],
          },
          {
            id: "field",
            title: "Field Operations",
            description:
              "Operations system for door projects: customers, employees, phased jobs, inventory, products and services, warranty and maintenance, and GST reports.",
            technologies: ["React", "Bootstrap"],
          },
          {
            id: "fleet",
            title: "Fleet Operations",
            description:
              "Fleet and courier operations for drivers, vehicles, route planning, customers, promotions, and finance.",
            technologies: ["PHP/CodeIgniter", "Node.js", "MySQL"],
          },
          {
            id: "loan",
            title: "Loan Platform",
            description:
              "Loan platform for applications, offers and counter-offers, repayments, appointments, and Singpass sign-in.",
            technologies: ["PHP/Laravel", "Vue", "MySQL", "Docker"],
          },
          {
            id: "company",
            title: "Company Site",
            description:
              "Company marketing site with home, services, and contact, shipped as a React frontend and a WordPress site.",
            technologies: ["React", "WordPress", "PHP"],
          },
          {
            id: "marketing",
            title: "Marketing Sites",
            description: "Marketing sites built and maintained on WordPress.",
            technologies: ["WordPress", "PHP", "Elementor", "MySQL"],
          },
        ],
      },
    ],
  },
  education: [
    {
      school:
        "Vietnam - Korea University of Information and Communication Technology",
      href: "#",
      degree: "Computer Science",
      logoUrl: "",
      start: "2013",
      end: "2016",
    },
  ],
  projects: [
    {
      id: "cozy",
      title: "Cozy Game Assets (itch.io)",
      href: "https://jelyqs.itch.io",
      dates: "2024 - Present",
      active: true,
      description:
        "Original cozy pixel icons, UI kits, combat VFX, and game audio packs — made with code, no generative AI art. Free minis and full packs for indie developers.",
      technologies: ["Pixel Art", "Game Audio", "UI Kits", "itch.io"],
      links: [
        {
          type: "Store",
          href: "https://jelyqs.itch.io",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/projects/cozy-assets.png",
      video: "",
    },
    {
      id: "friendDebt",
      title: "Friend Debt Tracker",
      href: "#",
      dates: "Oct 2026",
      active: true,
      description:
        "Mobile app for tracking money lent between friends: two-sided confirmations, auto reminders, history, and 30-day trash. Includes a web admin for users, debts, and violation reports.",
      technologies: ["React Native", "TypeScript", "Firebase", "FCM"],
      links: [],
      image: "/projects/no-ban-social.jpg",
      video: "",
    },
    {
      id: "paypal",
      title: "PayPal Sandbox Autofill",
      href: "#",
      dates: "Oct 2026",
      active: false,
      description:
        "Chrome extension (MV3) that fills PayPal sandbox test-card data into checkout forms — no more copy-pasting sandbox emails and passwords for every test run.",
      technologies: ["TypeScript", "Chrome Extension"],
      links: [],
      image: "/projects/paypal-autofill.jpg",
      video: "",
    },
    {
      id: "wedding",
      title: "Online Wedding Invitation",
      href: "https://hang-thinh.pages.dev",
      dates: "Oct 2026",
      active: false,
      description:
        "Online wedding invitation in two editions (deep red / navy) for the 29 Dec 2026 wedding: program, maps, and a separate guestbook per edition. Deployed on Cloudflare Pages, fast on mobile.",
      technologies: ["HTML", "CSS", "JavaScript", "Cloudflare Pages"],
      links: [
        {
          type: "Red Edition",
          href: "https://hang-thinh.pages.dev",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Navy Edition",
          href: "https://thinh-hang.pages.dev",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/projects/thiep-cuoi.jpg",
      video: "",
    },
    {
      id: "digital",
      title: "Digital Storefront",
      href: "#",
      dates: "2025",
      active: true,
      description:
        "Storefront for accounts, courses, and downloadable content, with cart, PayPal checkout, gift codes, and an admin console. A NestJS API serves web and mobile clients, and a chat bot answers from shop data with RAG. Built for an Australian client.",
      technologies: [
        "Next.js",
        "NestJS",
        "PostgreSQL",
        "Prisma",
        "PayPal",
        "RAG",
      ],
      links: [],
      image: "/projects/digital-storefront.jpg",
      video: "",
    },
    {
      id: "esimShop",
      title: "eSIM Shop",
      href: "#",
      dates: "2025",
      active: true,
      description:
        "eSIM shop with country catalogs, checkout, top-ups, order history, referrals, loyalty, and an admin for products, providers, and commissions. Built for an Australian client.",
      technologies: ["Next.js", "MySQL", "Prisma", "Cloudflare R2"],
      links: [],
      image: "/projects/esim-shop.jpg",
      video: "",
    },
    {
      id: "autoReply",
      title: "AI Auto-Reply",
      href: "#",
      dates: "2025",
      active: false,
      description:
        "AI auto-reply SaaS that replies on Slack, LINE, Chatwork, and Facebook Messenger, then creates Google Calendar tasks from the conversation. Built for a Japanese client.",
      technologies: [
        "React",
        "TypeScript",
        "Express",
        "MongoDB",
        "Stripe",
        "OpenAI",
      ],
      links: [],
      image: "/projects/ai-auto-reply.svg",
      video: "",
    },
    {
      id: "booking",
      title: "Service Booking",
      href: "#",
      dates: "2023",
      active: false,
      description:
        "Service booking platform with a customer web app, a mobile app, a vendor portal, and an admin console. Covers one-time and recurring bookings, quotes, invoices, GST, and technician scheduling. Built for a Singapore client.",
      technologies: [
        "React",
        "TypeScript",
        "React Native",
        "Node.js",
        "MySQL",
        "Stripe",
      ],
      links: [],
      image: "/projects/service-booking.jpg",
      video: "",
    },
  ],
  hackathons: [] as {
    title: string;
    dates: string;
    location: string;
    description: string;
    image?: string;
    mlh?: string;
    win?: string;
    icon?: string;
    links: {
      title: string;
      icon: React.ReactNode;
      href: string;
    }[];
  }[],
};
