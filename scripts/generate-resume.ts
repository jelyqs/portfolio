/**
 * Generate the TopCV-style CV (PDF + HTML) from the portfolio DATA object.
 *
 *   pnpm resume
 *   pnpm resume -- --data src/data/resume.tsx --out resume-output
 *
 * Input : src/data/resume.tsx (DATA) + scripts/resume-config.ts (CV-only facts)
 * Output: resume-output/THU-NGUYEN-PHUOC-CV.pdf + resume-output/resume.html
 *
 * Run from the repo root. Requires devDependencies: tsx, playwright
 * (see scripts/README-resume.md for setup).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { RESUME_CONFIG } from "./resume-config";
import { countPdfPages, loadResumeAssets, printResumePdf } from "./resume-pdf";
import { renderResumeHTML, type ResumeData } from "./resume-template";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(SCRIPT_DIR, "..");

function argValue(flag: string, fallback: string): string {
  const idx = process.argv.indexOf(flag);
  return idx >= 0 && process.argv[idx + 1] ? process.argv[idx + 1] : fallback;
}

async function main(): Promise<void> {
  const dataArg = argValue("--data", "src/data/resume.tsx");
  const outArg = argValue("--out", "resume-output");
  const pdfName = argValue("--pdf-name", "THU-NGUYEN-PHUOC-CV.pdf");

  const dataPath = path.resolve(REPO_ROOT, dataArg);
  const outDir = path.resolve(REPO_ROOT, outArg);
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

  // Fonts (bundled woff2 in scripts/assets) + photo — embedded so the
  // HTML is portable. Missing files only warn; the template falls back.
  const assets = loadResumeAssets(SCRIPT_DIR, REPO_ROOT, RESUME_CONFIG);

  const html = renderResumeHTML(data, RESUME_CONFIG, assets);

  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(htmlPath, html, "utf-8");
  await printResumePdf(htmlPath, pdfPath);

  const pages = countPdfPages(pdfPath);
  console.log(`\nCV generated from ${path.relative(REPO_ROOT, dataPath)}:`);
  console.log(`  PDF : ${pdfPath}${pages ? ` (${pages} pages)` : ""}`);
  console.log(`  HTML: ${htmlPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
