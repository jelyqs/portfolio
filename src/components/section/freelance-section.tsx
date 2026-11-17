"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TechTags } from "@/components/tech-tags";
import { cn } from "@/lib/utils";
import { useLocale, useResume } from "@/i18n/locale-provider";
import {
  CalendarDays,
  ChevronDown,
  FolderKanban,
  MapPin,
  Zap,
} from "lucide-react";

function ClientProjects({
  projects,
}: {
  projects: {
    title: string;
    description: string;
    technologies: string[];
  }[];
}) {
  const { messages, t } = useLocale();
  const [open, setOpen] = useState(false);

  if (projects.length === 0) return null;

  return (
    <div className="mt-1 border-t border-border pt-1">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between gap-2 py-2 text-left"
        aria-expanded={open}
      >
        <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <FolderKanban className="size-3.5" />
          <span>
            {t(
              projects.length === 1
                ? messages.ui.projectsCount
                : messages.ui.projectsCountPlural,
              { count: projects.length },
            )}
          </span>
        </div>
        <ChevronDown
          className={cn(
            "size-3.5 shrink-0 text-muted-foreground transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>

      {open ? (
        <div className="flex flex-col gap-2 pb-1">
          {projects.map((project) => (
            <div
              key={project.title}
              className="rounded-lg border border-border/80 bg-muted/20 px-3 py-2.5"
            >
              <h4 className="text-sm font-medium leading-tight">
                {project.title}
              </h4>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                {project.description}
              </p>
              {project.technologies.length > 0 ? (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-border bg-background px-2 py-0.5 text-[10px] text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default function FreelanceSection() {
  const { messages, t } = useLocale();
  const data = useResume();
  const { title, description, badge, ndaNote, clients } = data.freelance;
  const clientCount = clients.length;

  return (
    <Accordion
      type="single"
      collapsible
      defaultValue="freelance"
      className="w-full"
    >
      <AccordionItem value="freelance" className="border-0">
        <div className="rounded-2xl border border-border bg-card/30 overflow-hidden">
          <AccordionTrigger className="hover:no-underline px-4 py-4">
            <div className="flex w-full items-start justify-between gap-3 text-left">
              <div className="flex items-start gap-3 min-w-0">
                <div className="size-10 rounded-lg border border-brand-accent/30 bg-brand-accent/10 flex items-center justify-center flex-none text-brand-accent">
                  <Zap className="size-4 fill-current" />
                </div>
                <div className="min-w-0 flex flex-col gap-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-base leading-tight">
                      {title}
                    </span>
                    <span className="rounded-full bg-brand-accent/15 text-brand-accent border border-brand-accent/25 px-2 py-0.5 text-[11px] font-medium">
                      {badge}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {description} •{" "}
                    {t(
                      clientCount === 1
                        ? messages.ui.clientsCount
                        : messages.ui.clientsCountPlural,
                      { count: clientCount },
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground">{ndaNote}</p>
                </div>
              </div>
              <ChevronDown
                data-accordion-chevron
                className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 mt-1"
              />
            </div>
          </AccordionTrigger>

          <AccordionContent className="px-4 pb-4 pt-0">
            <Accordion
              type="multiple"
              defaultValue={[]}
              className="relative ml-5 border-l border-brand-accent/30 pl-5"
            >
              {clients.map((client) => {
                const clientKey = `${client.location}-${client.start}`;
                return (
                  <AccordionItem
                    key={clientKey}
                    value={clientKey}
                    className="relative border-b-0 pb-3 last:pb-0"
                  >
                    <span
                      aria-hidden
                      className="absolute left-[-1.70rem] top-5 size-2.5 rounded-full bg-brand-accent ring-4 ring-background"
                    />
                    <div className="rounded-xl border border-border bg-background/60">
                      <AccordionTrigger className="hover:no-underline px-3.5 py-3">
                        <div className="flex w-full items-start justify-between gap-3 text-left">
                          <div className="min-w-0 flex flex-col gap-2">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-semibold text-sm sm:text-base leading-tight">
                                {client.name}
                              </span>
                              <span className="rounded-full bg-brand-accent/15 text-brand-accent border border-brand-accent/25 px-2 py-0.5 text-[11px] font-medium">
                                {client.employmentType}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <MapPin className="size-3.5" />
                              <span>{client.location}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground tabular-nums">
                              <CalendarDays className="size-3.5" />
                              <span>
                                {client.start} — {client.end}
                              </span>
                            </div>
                          </div>
                          <ChevronDown
                            data-accordion-chevron
                            className="size-4 shrink-0 text-muted-foreground transition-transform duration-200"
                          />
                        </div>
                      </AccordionTrigger>
                      <div className="px-3.5 pb-3">
                        <TechTags technologies={client.technologies} />
                      </div>
                      <AccordionContent className="px-3.5 pb-3.5 pt-0">
                        <div className="flex flex-col gap-3">
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {client.description}
                          </p>
                          <ClientProjects projects={client.projects} />
                        </div>
                      </AccordionContent>
                    </div>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </AccordionContent>
        </div>
      </AccordionItem>
    </Accordion>
  );
}
