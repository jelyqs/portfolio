"use client";

import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useLocale } from "@/i18n/locale-provider";
import { flushSync } from "react-dom";
import type { MouseEvent } from "react";

export function ModeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const { messages } = useLocale();

  const toggleTheme = (event: MouseEvent<HTMLButtonElement>) => {
    const next = theme === "dark" ? "light" : "dark";
    // Circular reveal from the click/tap point where the browser supports
    // View Transitions; otherwise fall back to an instant switch.
    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => void;
    };
    if (!doc.startViewTransition) {
      setTheme(next);
      return;
    }
    const root = document.documentElement;
    root.style.setProperty("--vt-x", `${event.clientX}px`);
    root.style.setProperty("--vt-y", `${event.clientY}px`);
    doc.startViewTransition(() => {
      // flushSync so the theme class lands before the browser captures
      // the "new" snapshot; without it React may batch past the capture.
      flushSync(() => setTheme(next));
    });
  };

  return (
    <Button
      type="button"
      variant="link"
      size="icon"
      className={cn("relative", className)}
      aria-label={messages.ui.theme}
      onClick={toggleTheme}
    >
      <SunIcon className="h-full w-full rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <MoonIcon className="absolute inset-0 h-full w-full rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
}
