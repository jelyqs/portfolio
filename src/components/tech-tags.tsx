"use client";

import { useState } from "react";
import { useLocale } from "@/i18n/locale-provider";

const VISIBLE_COUNT = 5;

export function TechTags({
  technologies,
}: {
  technologies: readonly string[];
}) {
  const { messages, t } = useLocale();
  const [expanded, setExpanded] = useState(false);
  const remaining = technologies.length - VISIBLE_COUNT;
  const visible = expanded
    ? technologies
    : technologies.slice(0, VISIBLE_COUNT);

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {visible.map((tech) => (
        <span
          key={tech}
          className="rounded-full border border-border bg-muted/50 px-2.5 py-0.5 text-[11px] text-muted-foreground"
        >
          {tech}
        </span>
      ))}
      {remaining > 0 ? (
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          className="text-[11px] font-medium text-brand-accent hover:underline underline-offset-2 min-h-6 min-w-6 px-1.5"
          aria-expanded={expanded}
        >
          {expanded
            ? messages.ui.showLess
            : t(messages.ui.more, { count: remaining })}
        </button>
      ) : null}
    </div>
  );
}
