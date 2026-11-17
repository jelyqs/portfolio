export const LOCALES = ["en", "vi", "ja"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export const STORAGE_KEY = "portfolio-locale";

export const LOCALE_META = [
  { code: "en", label: "English", flag: "us" },
  { code: "vi", label: "Tiếng Việt", flag: "vn" },
  { code: "ja", label: "日本語", flag: "jp" },
] as const;

export function isLocale(value: string | null | undefined): value is Locale {
  return LOCALES.includes(value as Locale);
}
