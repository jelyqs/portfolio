"use client";

import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useLocale } from "@/i18n/locale-provider";

export function ModeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const { messages } = useLocale();

  return (
    <Button
      type="button"
      variant="link"
      size="icon"
      className={cn(className)}
      aria-label={messages.ui.theme}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <SunIcon className="h-full w-full" />
      <MoonIcon className="hidden h-full w-full" />
    </Button>
  );
}
