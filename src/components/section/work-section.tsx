"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionUnderline } from "@/components/section-underline";
import { TechTags } from "@/components/tech-tags";
import { isActionableHref } from "@/lib/utils";
import { useLocale, useResume } from "@/i18n/locale-provider";
import {
  Briefcase,
  Building2,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  MapPin,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function CompanyLogo({ src, alt }: { src: string; alt: string }) {
  const [imageError, setImageError] = useState(false);
  const useIcon = !src || imageError;

  if (useIcon) {
    return (
      <div
        className="size-10 rounded-lg border border-border bg-muted flex items-center justify-center flex-none text-foreground"
        role="img"
        aria-label={alt}
      >
        <Building2 className="size-5" />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={40}
      height={40}
      className="size-10 rounded-lg border border-border bg-background object-contain p-1.5 flex-none"
      onError={() => setImageError(true)}
    />
  );
}

function BulletList({ title, items }: { title?: string; items: string[] }) {
  return (
    <div className="flex flex-col gap-2.5">
      {title ? (
        <h4 className="text-[11px] font-semibold tracking-wider uppercase text-muted-foreground">
          {title}
        </h4>
      ) : null}
      <ul className="flex flex-col gap-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-1.5">
            <ChevronRight className="size-3.5 shrink-0 mt-[3px] text-brand-accent" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function WorkSection() {
  const { messages } = useLocale();
  const data = useResume();
  const { description, items } = data.work;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <Briefcase className="size-5 text-brand-accent" />
          <h2 className="text-xl font-bold">{messages.ui.experience}</h2>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
        <SectionUnderline />
      </div>

      <div className="flex flex-col gap-8">
        {items.map((company) => (
          <div key={company.company} className="flex flex-col gap-3">
            <div className="flex items-start gap-3">
              <CompanyLogo src={company.logoUrl} alt={company.company} />
              <div className="min-w-0 flex flex-col gap-1">
                <div className="flex items-center gap-1.5 min-w-0">
                  {isActionableHref(company.href) ? (
                    <Link
                      href={company.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold leading-none hover:underline underline-offset-2 inline-flex items-center gap-1.5"
                    >
                      {company.company}
                      <ExternalLink className="size-3.5 text-muted-foreground" />
                    </Link>
                  ) : (
                    <span className="font-semibold leading-none">
                      {company.company}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="size-3.5 shrink-0" />
                  <span>{company.location}</span>
                </div>
              </div>
            </div>

            <Accordion
              type="multiple"
              defaultValue={[]}
              className="relative ml-5 border-l border-border pl-6"
            >
              {company.roles.map((role) => {
                const roleKey = `${company.company}-${role.start}-${role.title}`;
                return (
                  <AccordionItem
                    key={roleKey}
                    value={roleKey}
                    className="relative border-b-0 pb-4 last:pb-0"
                  >
                    <span
                      aria-hidden
                      className="absolute left-[-1.8rem] top-5 size-2.5 rounded-full bg-brand-accent ring-4 ring-background"
                    />
                    <div className="rounded-xl border border-border bg-card/40">
                      <AccordionTrigger className="hover:no-underline px-3.5 py-3">
                        <div className="flex w-full items-start justify-between gap-3 text-left">
                          <div className="min-w-0 flex flex-col gap-2">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-semibold text-sm sm:text-base leading-tight">
                                {role.title}
                              </span>
                              <span className="rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 px-2 py-0.5 text-[11px] font-medium">
                                {role.employmentType}
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground tabular-nums">
                              <CalendarDays className="size-3.5" />
                              <span>
                                {role.start} — {role.end}
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
                        <TechTags technologies={role.technologies} />
                      </div>
                      <AccordionContent className="px-3.5 pb-3.5 pt-0 text-sm text-muted-foreground leading-relaxed">
                        <div className="flex flex-col gap-5 border-t border-border pt-4">
                          <div
                            className={
                              role.achievements.length > 0
                                ? "grid grid-cols-1 sm:grid-cols-2 gap-5"
                                : "grid grid-cols-1"
                            }
                          >
                            <BulletList items={role.responsibilities} />
                            {role.achievements.length > 0 ? (
                              <BulletList
                                title="Achievements"
                                items={role.achievements}
                              />
                            ) : null}
                          </div>
                        </div>
                      </AccordionContent>
                    </div>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        ))}
      </div>
    </div>
  );
}
