# i18n overlay translator

Keeps the Vietnamese and Japanese content overlays
(`src/i18n/messages/overlays/{vi,ja}.json`) in sync with the English
content in `src/data/resume.tsx`. Only new or changed English strings
are sent to Gemini; existing translations (including hand edits) are kept.

English is never translated: the `en` locale renders `DATA` directly.
Any key missing from an overlay falls back to English at runtime
(`src/i18n/localize.ts`).

## Setup (once)

```bash
pnpm add -D tsx
```

Add the script to `package.json`:

```json
"scripts": {
  "i18n:translate": "tsx scripts/i18n-translate.ts"
}
```

Get a Gemini API key from [Google AI Studio](https://aistudio.google.com/apikey).

## Usage

After editing `src/data/resume.tsx`:

```bash
pnpm i18n:translate -- --api-key=YOUR_GEMINI_API_KEY
# -> src/i18n/messages/overlays/vi.json
# -> src/i18n/messages/overlays/ja.json
# -> src/i18n/messages/overlays/en.source.json   (snapshot of the English source)
```

The key can also come from the environment:

```bash
export GEMINI_API_KEY=...
pnpm i18n:translate
```

| Option                            | Effect                                                                               |
| --------------------------------- | ------------------------------------------------------------------------------------ |
| `--api-key=KEY` / `--api-key KEY` | Gemini API key (overrides `GEMINI_API_KEY`)                                          |
| `--locale=vi` / `--locale=vi,ja`  | Only these locales (default: all)                                                    |
| `--force`                         | Re-translate every string, discarding existing translations                          |
| `--dry-run`                       | List the paths that would be translated; no API call, no key needed, nothing written |

| Env var          | Default            | Notes                            |
| ---------------- | ------------------ | -------------------------------- |
| `GEMINI_API_KEY` | —                  | Used when `--api-key` is omitted |
| `GEMINI_MODEL`   | `gemini-2.0-flash` | Any `generateContent` model      |

Check before spending API calls:

```bash
pnpm i18n:translate -- --dry-run
# English source strings: 136
# [vi] 0 string(s) to translate
# [vi] up to date
```

## How it decides what to translate

1. Builds the English source tree from `DATA` (see mapping below) and
   flattens it to dot paths, e.g. `projects.paypal.description`,
   `work.kozocom.2`.
2. For each locale, a path is translated when:
   - it is missing from the overlay, or
   - its English text differs from the last run's `en.source.json`, or
   - `--force` is set.
3. Sends those strings to Gemini in batches of ~10k characters
   (temperature 0.2, JSON response). The prompt keeps tech/brand names,
   emails, `**bold**` and `{placeholders}` intact.
4. Writes the overlay with exactly the paths in the English source:
   stale paths are dropped, untouched paths keep their current translation.
5. Overwrites `en.source.json` with the new English snapshot (skipped on `--dry-run`).

`en.source.json` is the change-detection baseline. **Commit it** together
with `vi.json` / `ja.json`; deleting it makes the next run only fill
missing paths (it cannot see edited English text).

## How it maps DATA → overlay keys

| Overlay key                                              | Source                                                                                 |
| -------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `hero.jobTitle`, `hero.description`                      | `DATA.jobTitle`, `DATA.description`                                                    |
| `about.summary`                                          | `DATA.summary`                                                                         |
| `stats.<id>`                                             | `DATA.stats[].label`                                                                   |
| `skills.title`, `skills.description`                     | `DATA.skills`                                                                          |
| `skills.categories.<id>`                                 | `DATA.skills.categories[].name`                                                        |
| `skills.softSkills.<key>`                                | Items of the `soft` category, matched **by position** to `SOFT_SKILL_KEYS`             |
| `work.description`                                       | `DATA.work.description`                                                                |
| `work.fullTime` / `partTime` / `freelance`               | Fixed employment-type labels                                                           |
| `work.roles.<titleKey>`                                  | `DATA.work.items[].roles[].title`                                                      |
| `work.<companyId>`                                       | Responsibilities of the company's **first** role (used for every role of that company) |
| `freelance.title` / `description` / `badge` / `ndaNote`  | `DATA.freelance`                                                                       |
| `freelance.<clientId>.description`                       | `DATA.freelance.clients[].description`                                                 |
| `freelance.<clientId>.projects.<id>.{title,description}` | Client projects                                                                        |
| `education.degree`                                       | `DATA.education[0].degree`                                                             |
| `projects.<id>.{title,description}`                      | `DATA.projects[]`                                                                      |

Not translated by the script: UI chrome strings (`ui.*` in
`src/i18n/messages/{en,vi,ja}.ts`), company/school names, dates,
technologies, links and images.

## Editing

- **Resume content changed**: edit `src/data/resume.tsx`, run
  `pnpm i18n:translate`, review the diff of `vi.json` / `ja.json`, commit
  all three overlay files.
- **Fix a bad translation**: edit `vi.json` / `ja.json` by hand. It stays
  until the English text at that path changes (or `--force` is used).
- **UI label** (`Home`, `Show less`, `{count} projects`, …): edit the `ui`
  block in `src/i18n/messages/en.ts`, `vi.ts` and `ja.ts` by hand.
- **New soft skill**: add it to the `soft` category in `resume.tsx`, then
  add its key to `SOFT_SKILL_KEYS` (same position) in `i18n-translate.ts`
  and to `SOFT_SKILL_BY_LABEL` in `src/i18n/localize.ts`.
- **New work company / freelance region**: give it an `id` in `resume.tsx`
  and add the id to `WorkCompanyKey` / `FreelanceRegionKey` in
  `src/i18n/localize.ts`.
- **New locale** (e.g. `ko`):
  1. Add it to `LOCALES` and `LOCALE_META` in `src/i18n/config.ts`.
  2. Add `ko: { name: "Korean", file: "ko.json" }` to `LOCALE_META` in
     `scripts/i18n-translate.ts`.
  3. Create `src/i18n/messages/ko.ts` (copy `vi.ts`, translate `ui`,
     import `./overlays/ko.json`) and register it in
     `src/i18n/messages/index.ts`.
  4. Run `pnpm i18n:translate -- --locale=ko` (missing overlay = translate everything).

## Files

- `scripts/i18n-translate.ts` — entry point: builds the English source from DATA, diffs, calls Gemini, writes overlays.
- `src/i18n/messages/overlays/en.source.json` — English snapshot from the last run (change-detection baseline).
- `src/i18n/messages/overlays/vi.json`, `ja.json` — generated (and hand-editable) content translations.
- `src/i18n/messages/{en,vi,ja}.ts` — UI chrome strings + overlay import per locale.
- `src/i18n/localize.ts` — applies an overlay to `DATA` at render time, with English fallback.
- `src/i18n/config.ts` — supported locales, default locale, switcher labels/flags.
