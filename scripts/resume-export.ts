/**
 * Export the resume in one or more formats from the portfolio DATA object.
 *
 *   pnpm resume:export                          # all formats
 *   pnpm resume:export -- --format md,json      # markdown + JSON only
 *   pnpm resume:export -- --format pdf          # PDF only (same as `pnpm resume`)
 *   pnpm resume:export -- --format csv --out resume-output
 *
 * Formats:
 *   md   — Markdown resume (same sections as the CV, GitHub-friendly)
 *   csv  — one tidy CSV: Section, Item, Field, Value (UTF-8 + BOM for Excel)
 *   json — the assembled resume model as structured JSON
 *   pdf  — TopCV-style PDF, identical to `pnpm resume` (same template, same margins)
 *   html — the TopCV HTML the PDF is printed from (also written with pdf)
 *   all  — md + csv + json + pdf (+ html as the PDF's companion file)
 *
 * Input : src/data/resume.tsx (DATA) + scripts/resume-config.ts (CV-only facts)
 * Output: resume-output/THU-NGUYEN-PHUOC-CV.{md,csv,json,pdf} + resume.html
 *
 * Run from the repo root. Requires devDependencies: tsx, playwright
 * (see scripts/README-resume.md for setup).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { RESUME_CONFIG } from "./resume-config";
import {
  renderResumeCsv,
  renderResumeJson,
  renderResumeMarkdown,
} from "./resume-formats";
import { assembleResumeModel } from "./resume-model";
import { countPdfPages, loadResumeAssets, printResumePdf } from "./resume-pdf";
import { renderResumeHTML, type ResumeData } from "./resume-template";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(SCRIPT_DIR, "..");

type Format = "md" | "csv" | "json" | "pdf" | "html";
const FORMATS: Format[] = ["md", "csv", "json", "pdf", "html"];
/** What "all" expands to (html comes along with pdf anyway). */
const ALL_FORMATS: Format[] = ["md", "csv", "json", "pdf"];

function argValue(flag: string, fallback: string): string {
  const idx = process.argv.indexOf(flag);
  return idx >= 0 && process.argv[idx + 1] ? process.argv[idx + 1] : fallback;
}

function parseFormats(raw: string): Format[] {
  const requested = raw
    .split(",")
    .map((f) => f.trim().toLowerCase())
    .filter(Boolean);
  if (requested.length === 0) return ALL_FORMATS;
  if (requested.includes("all")) return [...ALL_FORMATS];
  const unknown = requested.filter((f) => !(FORMATS as string[]).includes(f));
  if (unknown.length > 0) {
    console.error(
      `Unknown format(s): ${unknown.join(", ")}. Valid: ${[...FORMATS, "all"].join(", ")}.`,
    );
    process.exit(1);
  }
  // Keep a stable order, drop duplicates.
  return FORMATS.filter((f) => requested.includes(f));
}

async function main(): Promise<void> {
  const formats = parseFormats(argValue("--format", "all"));
  const dataArg = argValue("--data", "src/data/resume.tsx");
  const outArg = argValue("--out", "resume-output");
  const pdfName = argValue("--pdf-name", "THU-NGUYEN-PHUOC-CV.pdf");

  const dataPath = path.resolve(REPO_ROOT, dataArg);
  const outDir = path.resolve(REPO_ROOT, outArg);
  const stem = pdfName.replace(/\.pdf$/i, "") || "resume";
  const htmlPath = path.join(outDir, "resume.html");
  const pdfPath = path.join(outDir, pdfName);

  if (!fs.existsSync(dataPath)) {
    console.error(`DATA file not found: ${dataPath}`);
    process.exit(1);
  }

  const mod = (await import(pathToFileURL(dataPath).href)) as {
    DATA?: ResumeData;
  };
  const data = mod.DATA;
  if (!data) {
    console.error(`No exported DATA found in ${dataPath}`);
    process.exit(1);
  }

  // Warn about DATA projects missing CV table details in the config.
  for (const p of data.projects ?? []) {
    if (!p.id || !RESUME_CONFIG.projectDetails[p.id]) {
      console.warn(
        `warning: no projectDetails for "${p.id ?? p.title}" in resume-config.ts — Customer / Team size / My position omitted.`,
      );
    }
  }

  const model = assembleResumeModel(data, RESUME_CONFIG);
  fs.mkdirSync(outDir, { recursive: true });
  const written: string[] = [];

  if (formats.includes("md")) {
    const out = path.join(outDir, `${stem}.md`);
    fs.writeFileSync(out, renderResumeMarkdown(model), "utf-8");
    written.push(`MD  : ${out}`);
  }
  if (formats.includes("csv")) {
    const out = path.join(outDir, `${stem}.csv`);
    fs.writeFileSync(out, renderResumeCsv(model), "utf-8");
    written.push(`CSV : ${out}`);
  }
  if (formats.includes("json")) {
    const out = path.join(outDir, `${stem}.json`);
    fs.writeFileSync(out, renderResumeJson(model), "utf-8");
    written.push(`JSON: ${out}`);
  }

  const needsHtml = formats.includes("html") || formats.includes("pdf");
  if (needsHtml) {
    const assets = loadResumeAssets(SCRIPT_DIR, REPO_ROOT, RESUME_CONFIG);
    const html = renderResumeHTML(data, RESUME_CONFIG, assets);
    fs.writeFileSync(htmlPath, html, "utf-8");
    written.push(`HTML: ${htmlPath}`);
  }
  if (formats.includes("pdf")) {
    await printResumePdf(htmlPath, pdfPath);
    const pages = countPdfPages(pdfPath);
    written.push(`PDF : ${pdfPath}${pages ? ` (${pages} pages)` : ""}`);
  }

  console.log(
    `\nResume exported from ${path.relative(REPO_ROOT, dataPath)} (${formats.join(", ")}):`,
  );
  for (const line of written) console.log(`  ${line}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
