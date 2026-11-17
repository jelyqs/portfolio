/**
 * Shared PDF helpers for the resume scripts: load the embedded fonts +
 * photo, and print the rendered HTML to A4 via Playwright.
 *
 * Used by both generate-resume.ts (PDF-only) and resume-export.ts
 * (multi-format), so the PDF output is identical whichever entry
 * point runs it.
 */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { chromium } from "playwright";
import type { ResumeConfig } from "./resume-config";
import type { ResumeAssets } from "./resume-template";

function readBase64(filePath: string): string | null {
  try {
    return fs.readFileSync(filePath).toString("base64");
  } catch {
    return null;
  }
}

/**
 * Load the Inter woff2 fonts (scripts/assets) and the avatar photo.
 * Missing files only warn — the template falls back gracefully.
 */
export function loadResumeAssets(
  scriptDir: string,
  repoRoot: string,
  config: ResumeConfig,
): ResumeAssets {
  const fonts: Record<string, string> = {};
  for (const weight of ["400", "500", "600", "700"]) {
    const b64 = readBase64(
      path.join(scriptDir, "assets", `inter-${weight}.woff2`),
    );
    if (b64) fonts[weight] = b64;
    else
      console.warn(
        `warning: scripts/assets/inter-${weight}.woff2 missing — that weight falls back to a system font.`,
      );
  }

  const photoPath = path.resolve(repoRoot, config.photoPath);
  const photoBase64 = readBase64(photoPath);
  if (!photoBase64) {
    console.warn(
      `warning: photo not found at ${photoPath} — rendering without a photo.`,
    );
  }

  return { fonts, photoBase64 };
}

/** Print an HTML file to PDF (A4, same margins as the TopCV template). */
export async function printResumePdf(
  htmlPath: string,
  pdfPath: string,
): Promise<void> {
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage();
    await page.goto(pathToFileURL(htmlPath).href, { waitUntil: "load" });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(300);
    await page.pdf({
      path: pdfPath,
      format: "A4",
      printBackground: true,
      margin: { top: "13mm", bottom: "13mm", left: "15mm", right: "15mm" },
    });
  } finally {
    await browser.close();
  }
}

/** Best-effort page count for a Chromium-produced PDF. */
export function countPdfPages(pdfPath: string): number | null {
  try {
    const raw = fs.readFileSync(pdfPath).toString("latin1");
    const matches = raw.match(/\/Type\s*\/Page[^s]/g);
    return matches ? matches.length : null;
  } catch {
    return null;
  }
}
