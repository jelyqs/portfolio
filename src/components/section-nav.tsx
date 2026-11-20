"use client";

import { useEffect, useRef, useState } from "react";
import { List } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { DockIcon } from "@/components/magicui/dock";
import { useLocale, useResume } from "@/i18n/locale-provider";
import { cn } from "@/lib/utils";

const SECTION_IDS = [
  "about",
  "work",
  "education",
  "skills",
  "projects",
  "contact",
] as const;

/**
 * One dock button that opens a popover jumping to page sections, with a
 * scrollspy dot on the section currently in view. Closes on selection,
 * outside click, or Escape.
 */
export function SectionNav({ className }: { className?: string }) {
  const { messages } = useLocale();
  const data = useResume();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("about");
  const rootRef = useRef<HTMLDivElement>(null);

  const sections = [
    { id: "about", label: messages.ui.about },
    { id: "work", label: messages.ui.experience },
    { id: "education", label: messages.ui.education },
    { id: "skills", label: data.skills.title },
    { id: "projects", label: messages.ui.myProjects },
    { id: "contact", label: messages.ui.contact },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (
        rootRef.current &&
        !rootRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open ]);

  return (
    <div ref={rootRef} className="relative">
      {/* On narrow screens the popover would overflow the left edge if
          centered on the button (2nd icon from the left), so it aligns
          to the button's left edge instead; centered from sm up. */}
      <AnimatePresence>
        {open ? (
          <motion.div
            key="sections-popover"
            initial={{ opacity: 0, scale: 0.95, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 6 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="absolute bottom-full left-0 mb-3 w-52 origin-bottom rounded-xl border border-border bg-card p-1.5 shadow-xl sm:left-1/2 sm:-translate-x-1/2"
          >
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted",
                active === section.id
                  ? "font-medium text-foreground"
                  : "text-muted-foreground",
              )}
            >
              {section.label}
              {active === section.id ? (
                <span
                  aria-hidden
                  className="size-1.5 shrink-0 rounded-full bg-brand-accent"
                />
              ) : null}
            </a>
          ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
      <DockIcon className={className}>
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label={messages.ui.sections}
          className="size-full cursor-pointer"
        >
          <List className="size-full rounded-sm overflow-hidden object-contain" />
        </button>
      </DockIcon>
    </div>
  );
}
