# Resume generator

Generates the resume from the portfolio `DATA` object in
`src/data/resume.tsx`, plus CV-only facts in `scripts/resume-config.ts`,
in several formats. The **PDF always follows the TopCV template**
(`scripts/resume-template.ts`); the other formats render the same facts
from the shared model in `scripts/resume-model.ts`.

## Setup (once)

```bash
pnpm add -D tsx playwright
npx playwright install chromium
```

Add the scripts to `package.json`:

```json
"scripts": {
  "resume": "tsx scripts/generate-resume.ts",
  "resume:export": "tsx scripts/resume-export.ts"
}
```

Optional: add `resume-output/` to `.gitignore` (the generated files are
build artifacts, like `.next/`).

## Usage

PDF only (TopCV template):

```bash
pnpm resume
# -> resume-output/THU-NGUYEN-PHUOC-CV.pdf
# -> resume-output/resume.html   (same content, editable, print-to-PDF-able)
```

Any format, or all at once:

```bash
pnpm resume:export
# -> resume-output/THU-NGUYEN-PHUOC-CV.{md,csv,json,pdf} + resume.html

pnpm resume:export -- --format md,json   # markdown + JSON only
pnpm resume:export -- --format pdf       # PDF only (same as `pnpm resume`)
pnpm resume:export -- --format csv --out resume-output
```

| Format | Output                     | Notes                                                                                         |
| ------ | -------------------------- | --------------------------------------------------------------------------------------------- |
| `md`   | `THU-NGUYEN-PHUOC-CV.md`   | Same sections as the CV, GitHub-friendly                                                      |
| `csv`  | `THU-NGUYEN-PHUOC-CV.csv`  | One tidy file: `Section, Item, Field, Value`; UTF-8 + BOM so Excel reads Vietnamese correctly |
| `json` | `THU-NGUYEN-PHUOC-CV.json` | Structured resume model (profile, objective, education, work, freelance, skills, projects)    |
| `pdf`  | `THU-NGUYEN-PHUOC-CV.pdf`  | TopCV template, identical to `pnpm resume`                                                    |
| `html` | `resume.html`              | The TopCV HTML the PDF is printed from (also written with `pdf`)                              |
| `all`  | (default)                  | `md` + `csv` + `json` + `pdf` (+ `html`)                                                      |

Options (both entry points):

```bash
pnpm resume:export -- --data src/data/resume.tsx --out resume-output --pdf-name THU-NGUYEN-PHUOC-CV.pdf
```

The `--pdf-name` stem also names the other files: `--pdf-name Thu-CV.pdf`
produces `Thu-CV.md`, `Thu-CV.csv`, `Thu-CV.json`.

## How it maps DATA → CV

| CV section                 | Source                                                                                                                                                                                                                             |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Header (name, photo, info) | `resume-config.ts` (full name, DoB, gender, address, photo) + `DATA.contact` (email, phone) + `DATA.url`                                                                                                                           |
| GIT                        | `resume-config.ts` (GitLab) + `DATA.contact.social.GitHub`                                                                                                                                                                         |
| Objective                  | Prose paragraphs of `DATA.summary` (bullet lines skipped, `**` stripped)                                                                                                                                                           |
| Education                  | `DATA.education`                                                                                                                                                                                                                   |
| Work Experience            | `DATA.work.items` (technologies split into Technical / Database lines)                                                                                                                                                             |
| Freelance Experience       | `DATA.freelance.clients` (each project as "Title: description"; employment type shown when it differs from the client name; NDA note shown when present)                                                                           |
| Technical Skills           | `DATA.skills.categories` (all categories, as-is)                                                                                                                                                                                   |
| Projects                   | `DATA.projects` (customer / team size / position from `projectDetails` by `id` when present; missing fields and **My responsibilities** are omitted — no invented defaults). `extraProjects` / `legacyProjects` are off by default |

Not used in the CV: `DATA.stats` (portfolio-hero numbers), `DATA.description`,
`DATA.hackathons`, project images/links.

## Editing

- **Career fact changed** (new job, skill, project): edit `src/data/resume.tsx`,
  run `pnpm resume` again. The CV follows automatically.
- **CV-only detail** (photo, project customer/team size):
  edit `scripts/resume-config.ts`.
- **New project in DATA.projects**: optionally add a `projectDetails` entry in
  `resume-config.ts` under the project's `id` (customer, team size, position).
  Missing fields are omitted from the table (no defaults).
- **Longer CV**: set `includeLegacyProjects: true` (adds the 8 pre-2023
  projects) or `includeExtraProjects: true` in `resume-config.ts`. Both are
  off by default so the CV matches `resume.tsx`.
- **Layout / styling**: edit `scripts/resume-template.ts` (CSS + section builders).

## Files

- `scripts/generate-resume.ts` — entry point (PDF only): loads DATA, renders HTML, prints PDF via Playwright (A4, 13/15mm margins).
- `scripts/resume-export.ts` — entry point (multi-format): `--format md,csv,json,pdf,html,all`.
- `scripts/resume-model.ts` — shared model: assembles one normalized resume object from DATA + config (month expansion, Technical/Database split, project dedupe).
- `scripts/resume-formats.ts` — pure renderers for md / csv / json. To add a format, write a `renderResume<X>` here and register it in `resume-export.ts`.
- `scripts/resume-pdf.ts` — shared PDF helpers (fonts + photo loading, Playwright print, page count) used by both entry points.
- `scripts/resume-template.ts` — pure HTML renderer (TopCV layout) — the PDF template.
- `scripts/resume-config.ts` — CV-only facts + project table details.
- `scripts/assets/inter-*.woff2` — Inter font files, embedded into the HTML.
- `public/images/me.jpeg` — avatar photo (round-cropped by the template), same as the portfolio avatar.
