/**
 * Translate resume content overlays (VI/JA) from English source in resume.tsx.
 *
 * Usage:
 *   npm run i18n:translate -- --api-key=YOUR_GEMINI_API_KEY
 *   npm run i18n:translate -- --api-key=YOUR_GEMINI_API_KEY --locale=vi
 *   npm run i18n:translate -- --api-key=YOUR_GEMINI_API_KEY --force
 *   npm run i18n:translate -- --api-key=YOUR_GEMINI_API_KEY --dry-run
 *
 * Also accepts GEMINI_API_KEY from the environment if --api-key is omitted.
 */
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { DATA } from "../src/data/resume";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const OVERLAY_DIR = resolve(ROOT, "src/i18n/messages/overlays");
const SOURCE_PATH = resolve(OVERLAY_DIR, "en.source.json");

const SOFT_SKILL_KEYS = [
  "problemInvestigation",
  "presentationSkills",
  "projectManagement",
  "solutionDesign",
  "technicalManagement",
] as const;

type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

type FlatMap = Record<string, string>;

const LOCALE_META: Record<string, { name: string; file: string }> = {
  vi: { name: "Vietnamese", file: "vi.json" },
  ja: { name: "Japanese", file: "ja.json" },
};

function parseArgs(argv: string[]) {
  const locales = new Set<string>();
  let force = false;
  let dryRun = false;
  let apiKey = process.env.GEMINI_API_KEY ?? "";

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--force") force = true;
    else if (arg === "--dry-run") dryRun = true;
    else if (arg.startsWith("--locale=")) {
      const value = arg.slice("--locale=".length);
      for (const part of value.split(",")) {
        if (part) locales.add(part);
      }
    } else if (arg.startsWith("--api-key=")) {
      apiKey = arg.slice("--api-key=".length);
    } else if (arg === "--api-key") {
      apiKey = argv[i + 1] ?? "";
      i += 1;
    }
  }

  const targetLocales =
    locales.size > 0 ? [...locales] : Object.keys(LOCALE_META);

  for (const locale of targetLocales) {
    if (!LOCALE_META[locale]) {
      throw new Error(`Unsupported locale: ${locale}`);
    }
  }

  return { targetLocales, force, dryRun, apiKey };
}

function buildEnglishSource(): Json {
  const softItems =
    DATA.skills.categories.find((c) => c.id === "soft")?.items ?? [];

  const workRoles: Record<string, string> = {};
  for (const company of DATA.work.items) {
    for (const role of company.roles) {
      workRoles[role.titleKey] = role.title;
    }
  }

  const workBodies: Record<string, string[]> = {};
  for (const company of DATA.work.items) {
    workBodies[company.id] = company.roles[0]?.responsibilities ?? [];
  }

  const freelanceRegions: Record<string, Json> = {};
  for (const client of DATA.freelance.clients) {
    freelanceRegions[client.id] = {
      description: client.description,
      projects: Object.fromEntries(
        client.projects.map((project) => [
          project.id,
          { title: project.title, description: project.description },
        ]),
      ),
    };
  }

  return {
    hero: {
      jobTitle: DATA.jobTitle,
      description: DATA.description,
    },
    about: {
      summary: DATA.summary,
    },
    stats: Object.fromEntries(DATA.stats.map((stat) => [stat.id, stat.label])),
    skills: {
      title: DATA.skills.title,
      description: DATA.skills.description,
      categories: Object.fromEntries(
        DATA.skills.categories.map((category) => [category.id, category.name]),
      ),
      softSkills: Object.fromEntries(
        SOFT_SKILL_KEYS.map((key, index) => [key, softItems[index] ?? key]),
      ),
    },
    work: {
      description: DATA.work.description,
      fullTime: "Full-time",
      partTime: "Part-time",
      freelance: "Freelance",
      roles: workRoles,
      ...workBodies,
    },
    freelance: {
      title: DATA.freelance.title,
      description: DATA.freelance.description,
      badge: DATA.freelance.badge,
      ndaNote: DATA.freelance.ndaNote,
      ...freelanceRegions,
    },
    education: {
      degree: DATA.education[0]?.degree ?? "Computer Science",
    },
    projects: Object.fromEntries(
      DATA.projects.map((project) => [
        project.id,
        { title: project.title, description: project.description },
      ]),
    ),
  };
}

function flatten(value: Json, prefix = "", out: FlatMap = {}): FlatMap {
  if (typeof value === "string") {
    out[prefix] = value;
    return out;
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      flatten(item as Json, prefix ? `${prefix}.${index}` : String(index), out);
    });
    return out;
  }
  if (value && typeof value === "object") {
    for (const [key, child] of Object.entries(value)) {
      flatten(child as Json, prefix ? `${prefix}.${key}` : key, out);
    }
  }
  return out;
}

function unflatten(flat: FlatMap): Json {
  const root: Record<string, Json> = {};

  for (const [path, value] of Object.entries(flat)) {
    const parts = path.split(".");
    let cursor: Record<string, Json> | Json[] = root;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const isLast = i === parts.length - 1;
      const nextIsIndex = !isLast && /^\d+$/.test(parts[i + 1] ?? "");

      if (Array.isArray(cursor)) {
        const index = Number(part);
        if (isLast) {
          cursor[index] = value;
        } else {
          if (cursor[index] == null) {
            cursor[index] = nextIsIndex ? [] : {};
          }
          cursor = cursor[index] as Record<string, Json> | Json[];
        }
        continue;
      }

      if (isLast) {
        cursor[part] = value;
      } else {
        if (cursor[part] == null) {
          cursor[part] = nextIsIndex ? [] : {};
        }
        cursor = cursor[part] as Record<string, Json> | Json[];
      }
    }
  }

  return root;
}

function hashText(value: string): string {
  return createHash("sha1").update(value).digest("hex").slice(0, 12);
}

function readJson<T>(path: string, fallback: T): T {
  if (!existsSync(path)) return fallback;
  return JSON.parse(readFileSync(path, "utf8")) as T;
}

async function translateBatch(
  apiKey: string,
  locale: string,
  localeName: string,
  entries: FlatMap,
): Promise<FlatMap> {
  const model = process.env.GEMINI_MODEL ?? "gemini-2.0-flash";
  const paths = Object.keys(entries);

  const prompt = `You translate portfolio resume copy from English to ${localeName}.
Return a JSON object with key "translations" whose value is an object mapping the same string paths to translated strings.
Keep technical terms, product names, and brand tokens in English when natural (React, NestJS, AWS, PayPal, Stripe, Shopify, RAG, OpenAI, eSIM, OCR, itch.io, etc.).
Keep email addresses and markdown emphasis (**bold**) intact.
Keep placeholders like {name} and {count} unchanged.
Do not add commentary.

Input:
${JSON.stringify({ locale, entries }, null, 2)}`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.2,
        responseMimeType: "application/json",
      },
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Gemini error ${response.status}: ${body}`);
  }

  const payload = (await response.json()) as {
    candidates?: Array<{
      content?: { parts?: Array<{ text?: string }> };
    }>;
  };
  const content = payload.candidates?.[0]?.content?.parts
    ?.map((part) => part.text ?? "")
    .join("");
  if (!content) throw new Error("Empty Gemini response");

  const parsed = JSON.parse(content) as {
    translations?: FlatMap;
  } & FlatMap;

  const translations = parsed.translations ?? parsed;
  const missing = paths.filter(
    (path) => typeof translations[path] !== "string",
  );
  if (missing.length > 0) {
    throw new Error(
      `Translation response missing paths: ${missing.slice(0, 8).join(", ")}`,
    );
  }

  return Object.fromEntries(paths.map((path) => [path, translations[path]]));
}

function chunkEntries(entries: FlatMap, maxChars = 10000): FlatMap[] {
  const chunks: FlatMap[] = [];
  let current: FlatMap = {};
  let size = 0;

  for (const [path, value] of Object.entries(entries)) {
    const cost = path.length + value.length;
    if (size > 0 && size + cost > maxChars) {
      chunks.push(current);
      current = {};
      size = 0;
    }
    current[path] = value;
    size += cost;
  }

  if (Object.keys(current).length > 0) chunks.push(current);
  return chunks;
}

async function translateLocale(
  locale: string,
  enFlat: FlatMap,
  previousSourceFlat: FlatMap,
  options: { force: boolean; dryRun: boolean; apiKey: string },
) {
  const meta = LOCALE_META[locale];
  const overlayPath = resolve(OVERLAY_DIR, meta.file);
  const existing = readJson<Json>(overlayPath, {});
  const existingFlat = flatten(existing);

  const toTranslate: FlatMap = {};
  for (const [path, enValue] of Object.entries(enFlat)) {
    const prev = previousSourceFlat[path];
    const changed = prev !== undefined && prev !== enValue;
    const missing = typeof existingFlat[path] !== "string";
    if (options.force || missing || changed) {
      toTranslate[path] = enValue;
    }
  }

  console.log(
    `[${locale}] ${Object.keys(toTranslate).length} string(s) to translate` +
      (options.force ? " (force)" : ""),
  );

  if (Object.keys(toTranslate).length === 0) {
    console.log(`[${locale}] up to date`);
    return;
  }

  if (options.dryRun) {
    console.log(
      `[${locale}] dry-run paths:\n- ${Object.keys(toTranslate).join("\n- ")}`,
    );
    return;
  }

  const translated: FlatMap = { ...existingFlat };
  for (const batch of chunkEntries(toTranslate)) {
    const result = await translateBatch(
      options.apiKey,
      locale,
      meta.name,
      batch,
    );
    Object.assign(translated, result);
  }

  // Keep only paths that still exist in English source (+ preserve extras? drop stale)
  const nextFlat: FlatMap = {};
  for (const path of Object.keys(enFlat)) {
    nextFlat[path] = translated[path] ?? existingFlat[path] ?? enFlat[path];
  }

  const nextOverlay = unflatten(nextFlat);
  writeFileSync(overlayPath, `${JSON.stringify(nextOverlay, null, 2)}\n`);
  console.log(`[${locale}] wrote ${meta.file}`);
}

async function main() {
  const { targetLocales, force, dryRun, apiKey } = parseArgs(
    process.argv.slice(2),
  );
  mkdirSync(OVERLAY_DIR, { recursive: true });

  if (!dryRun && !apiKey) {
    throw new Error(
      "Missing Gemini API key. Pass --api-key=YOUR_GEMINI_API_KEY",
    );
  }

  const enSource = buildEnglishSource();
  const enFlat = flatten(enSource);
  const previousSource = readJson<Json>(SOURCE_PATH, {});
  const previousSourceFlat = flatten(previousSource);

  console.log(`English source strings: ${Object.keys(enFlat).length}`);

  for (const locale of targetLocales) {
    await translateLocale(locale, enFlat, previousSourceFlat, {
      force,
      dryRun,
      apiKey,
    });
  }

  if (!dryRun) {
    writeFileSync(SOURCE_PATH, `${JSON.stringify(enSource, null, 2)}\n`);
    console.log(`Updated ${SOURCE_PATH}`);
  }

  // Helpful fingerprint in logs
  const fingerprint = hashText(JSON.stringify(enFlat));
  console.log(`Source fingerprint: ${fingerprint}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
