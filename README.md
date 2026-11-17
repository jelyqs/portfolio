<div align="center">
<img alt="Portfolio" src="https://github.com/user-attachments/assets/c439faae-5d46-4ddb-8822-3b2ec7a4aa69" width="100%">
</div>

# Portfolio [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fjelyqs%2Fportfolio)

Built with next.js, [shadcn/ui](https://ui.shadcn.com/), and [magic ui](https://magicui.design/), deployed on Vercel.

# Features

- Setup only takes a few minutes by editing the [single config file](./src/data/resume.tsx)
- Built using Next.js 16, React, Typescript, Shadcn/UI, TailwindCSS, Motion, Magic UI
- Includes a blog
- Responsive for different devices
- Optimized for Next.js and Vercel

# Getting Started Locally

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/jelyqs/portfolio
   ```

2. Move to the cloned directory

   ```bash
   cd portfolio
   ```

3. Install dependencies:

   ```bash
   pnpm install
   ```

4. Start the local Server:

   ```bash
   pnpm dev
   ```

   The dev server listens on [http://localhost:4000](http://localhost:4000).

5. Open the [Config file](./src/data/resume.tsx) and make changes

# Internationalization (EN / VI / JA)

- English content is sourced from [`src/data/resume.tsx`](./src/data/resume.tsx). Editing that file updates the EN UI immediately.
- Vietnamese and Japanese overlays live in [`src/i18n/messages/overlays/`](./src/i18n/messages/overlays/). Missing keys fall back to English.
- UI chrome strings (`Home`, `Show less`, etc.) are in [`src/i18n/messages/en.ts`](./src/i18n/messages/en.ts), [`vi.ts`](./src/i18n/messages/vi.ts), and [`ja.ts`](./src/i18n/messages/ja.ts).

## Auto-translate overlays (Gemini)

After changing resume content, sync VI/JA overlays with:

```bash
npm run i18n:translate -- --api-key=YOUR_GEMINI_API_KEY
```

Options:

```bash
# One locale only
npm run i18n:translate -- --api-key=YOUR_GEMINI_API_KEY --locale=vi

# Re-translate everything
npm run i18n:translate -- --api-key=YOUR_GEMINI_API_KEY --force

# Preview what would change (no API call required for detection)
npm run i18n:translate -- --api-key=YOUR_GEMINI_API_KEY --dry-run
```

The script reads English from `resume.tsx`, compares against `src/i18n/messages/overlays/en.source.json`, translates new/changed strings with Gemini, and writes `vi.json` / `ja.json`.

# Resume export

Career facts come from [`src/data/resume.tsx`](./src/data/resume.tsx). CV-only fields (photo, date of birth, project customer / team size / position) come from [`scripts/resume-config.ts`](./scripts/resume-config.ts). Every format is rendered from the same model, so the facts stay in sync. Missing fields are omitted — nothing is filled in with a default.

```bash
# PDF + the print HTML
npm run resume

# md, csv, json, pdf, and the print HTML
npm run resume:export

# A subset
npm run resume:export -- --format md,json
```

Files land in `resume-output/`. `pdf`, `md`, `csv`, and `json` use the stem `THU-NGUYEN-PHUOC-CV`. The print HTML is always `resume.html`.

| Format | File                       | Notes                                                              |
| ------ | -------------------------- | ------------------------------------------------------------------ |
| `pdf`  | `THU-NGUYEN-PHUOC-CV.pdf`  | -                                                                  |
| `html` | `resume.html`              | The HTML the PDF is printed from. Also written by `npm run resume` |
| `md`   | `THU-NGUYEN-PHUOC-CV.md`   | Same sections, GitHub-friendly                                     |
| `csv`  | `THU-NGUYEN-PHUOC-CV.csv`  | Header `Section,Item,Field,Value`, UTF-8 with BOM                  |
| `json` | `THU-NGUYEN-PHUOC-CV.json` | Structured resume model                                            |

Rename `pdf` / `md` / `csv` / `json` with `--pdf-name`. The stem is reused: `--pdf-name Thu-CV.pdf` also writes `Thu-CV.md`, `Thu-CV.csv`, and `Thu-CV.json`. `resume.html` keeps its name.

Setup, the DATA → CV mapping, and how to add a format are in [`scripts/README-resume.md`](./scripts/README-resume.md).

# License

Licensed under the [MIT license](https://github.com/jelyqs/portfolio/blob/main/LICENSE).
