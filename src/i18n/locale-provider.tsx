"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_LOCALE,
  isLocale,
  LOCALE_META,
  STORAGE_KEY,
  type Locale,
} from "@/i18n/config";
import { MESSAGE_CATALOG, type Messages } from "@/i18n/messages";
import { localizeResume, type LocalizedResume } from "@/i18n/localize";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  messages: Messages;
  resume: LocalizedResume;
  t: (template: string, vars?: Record<string, string | number>) => string;
  mounted: boolean;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function interpolate(
  template: string,
  vars?: Record<string, string | number>,
): string {
  if (!vars) return template;
  return Object.entries(vars).reduce(
    (result, [key, value]) => result.replaceAll(`{${key}}`, String(value)),
    template,
  );
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const next = isLocale(stored) ? stored : DEFAULT_LOCALE;
    setLocaleState(next);
    document.documentElement.lang = next;
    setMounted(true);
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.lang = next;
  }, []);

  const messages = MESSAGE_CATALOG[locale];
  const resume = useMemo(
    () => localizeResume(locale, messages),
    [locale, messages],
  );

  const t = useCallback(
    (template: string, vars?: Record<string, string | number>) =>
      interpolate(template, vars),
    [],
  );

  const value = useMemo(
    () => ({ locale, setLocale, messages, resume, t, mounted }),
    [locale, setLocale, messages, resume, t, mounted],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return context;
}

export function useMessages() {
  return useLocale().messages;
}

export function useResume() {
  return useLocale().resume;
}

export { LOCALE_META };
