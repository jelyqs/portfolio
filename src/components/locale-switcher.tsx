"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { LOCALE_META, type Locale } from "@/i18n/config";
import { useLocale } from "@/i18n/locale-provider";

function FlagIcon({
  flag,
  className,
}: {
  flag: (typeof LOCALE_META)[number]["flag"];
  className?: string;
}) {
  const clipId = useId().replace(/:/g, "");
  const common = cn(
    "size-5 shrink-0 overflow-hidden rounded-full ring-1 ring-border/60",
    className,
  );

  if (flag === "us") {
    return (
      <svg viewBox="0 0 32 32" className={common} aria-hidden>
        <clipPath id={clipId}>
          <circle cx="16" cy="16" r="16" />
        </clipPath>
        <g clipPath={`url(#${clipId})`}>
          <rect width="32" height="32" fill="#B22234" />
          <path
            fill="#fff"
            d="M0 3.7h32v2.5H0zm0 4.9h32v2.5H0zm0 4.9h32v2.5H0zm0 4.9h32v2.5H0zm0 4.9h32v2.5H0z"
          />
          <rect width="14" height="15.5" fill="#3C3B6E" />
        </g>
      </svg>
    );
  }

  if (flag === "vn") {
    return (
      <svg viewBox="0 0 32 32" className={common} aria-hidden>
        <clipPath id={clipId}>
          <circle cx="16" cy="16" r="16" />
        </clipPath>
        <g clipPath={`url(#${clipId})`}>
          <rect width="32" height="32" fill="#DA251D" />
          <path
            fill="#FF0"
            d="m16 7.2 1.9 5.8h6.1l-4.9 3.6 1.9 5.8-5-3.6-5 3.6 1.9-5.8-4.9-3.6h6.1z"
          />
        </g>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 32 32" className={common} aria-hidden>
      <clipPath id={clipId}>
        <circle cx="16" cy="16" r="16" />
      </clipPath>
      <g clipPath={`url(#${clipId})`}>
        <rect width="32" height="32" fill="#fff" />
        <circle cx="16" cy="16" r="7.2" fill="#BC002D" />
      </g>
    </svg>
  );
}

export function LocaleSwitcher({ className }: { className?: string }) {
  const { locale, setLocale, messages, mounted } = useLocale();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function selectLocale(next: Locale) {
    setLocale(next);
    setOpen(false);
  }

  const activeLocale =
    LOCALE_META.find((item) => item.code === (mounted ? locale : "en")) ??
    LOCALE_META[0];

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        type="button"
        className="inline-flex h-full w-full items-center justify-center gap-0.5 rounded-full text-muted-foreground hover:text-foreground transition-colors"
        aria-label={`${messages.ui.language}: ${activeLocale.label}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
      >
        <FlagIcon flag={activeLocale.flag} className="size-4" />
        <ChevronDown
          className={cn(
            "size-3 shrink-0 transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>

      {open ? (
        <div
          id={menuId}
          role="listbox"
          aria-label={messages.ui.language}
          className="absolute bottom-[calc(100%+0.75rem)] left-1/2 z-50 min-w-40 -translate-x-1/2 rounded-xl border border-border bg-card/95 p-1 shadow-lg backdrop-blur-xl"
        >
          {LOCALE_META.map((item) => {
            const active = locale === item.code;
            return (
              <button
                key={item.code}
                type="button"
                role="option"
                aria-selected={active}
                className={cn(
                  "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-xs transition-colors",
                  active
                    ? "bg-brand-accent/10 text-brand-accent"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
                onClick={() => selectLocale(item.code)}
              >
                <FlagIcon flag={item.flag} />
                <span className="flex-1 font-medium">{item.label}</span>
                {active ? <Check className="size-3.5 shrink-0" /> : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
