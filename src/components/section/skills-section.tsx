"use client";

import { useState } from "react";
import {
  Braces,
  Cloud,
  Code2,
  Database,
  Layers,
  Layout,
  Package,
  Plug,
  Server,
  ShoppingBag,
  Sparkles,
  TestTube2,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { useLocale, useResume } from "@/i18n/locale-provider";

const VISIBLE_COUNT = 10;

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  languages: Code2,
  databases: Database,
  frameworks: Layers,
  frontend: Layout,
  ai: Sparkles,
  cloud: Cloud,
  devops: Server,
  practices: Braces,
  api: Plug,
  cms: ShoppingBag,
  libraries: Package,
  testing: TestTube2,
  tools: Wrench,
  soft: Users,
};

function SkillCategoryCard({
  name,
  icon,
  items,
}: {
  name: string;
  icon: string;
  items: string[];
}) {
  const { messages, t } = useLocale();
  const [expanded, setExpanded] = useState(false);
  const Icon = CATEGORY_ICONS[icon] ?? Braces;
  const remaining = items.length - VISIBLE_COUNT;
  const visibleItems = expanded ? items : items.slice(0, VISIBLE_COUNT);

  return (
    <div className="rounded-xl border border-border bg-card/40 p-4 flex flex-col gap-3 h-full">
      <div className="flex items-center gap-2">
        <Icon className="size-4 text-brand-accent" />
        <h3 className="text-xs font-semibold tracking-wider uppercase text-foreground">
          {name}
        </h3>
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        {visibleItems.map((skill) => (
          <span
            key={skill}
            className="rounded-md border border-border bg-muted/40 px-2.5 py-1 text-xs text-foreground/90"
          >
            {skill}
          </span>
        ))}
        {remaining > 0 ? (
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            className="text-xs font-medium text-brand-accent hover:underline underline-offset-2"
            aria-expanded={expanded}
          >
            {expanded
              ? messages.ui.showLess
              : t(messages.ui.more, { count: remaining })}
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default function SkillsSection() {
  const data = useResume();
  const { title, description, categories } = data.skills;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <span className="font-mono text-brand-accent text-sm font-semibold select-none">
            &gt;_
          </span>
          <h2 className="text-xl font-bold">{title}</h2>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
        <div className="h-0.5 w-10 rounded-full bg-brand-accent/80" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {categories.map((category) => (
          <SkillCategoryCard
            key={category.name}
            name={category.name}
            icon={category.icon}
            items={category.items}
          />
        ))}
      </div>
    </div>
  );
}
