"use client";

import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { RichText } from "@/components/rich-text";
import Link from "next/link";
import ContactSection from "@/components/section/contact-section";
import HackathonsSection from "@/components/section/hackathons-section";
import ProjectsSection from "@/components/section/projects-section";
import WorkSection from "@/components/section/work-section";
import FreelanceSection from "@/components/section/freelance-section";
import SkillsSection from "@/components/section/skills-section";
import { isActionableHref } from "@/lib/utils";
import { ArrowUpRight, GraduationCap } from "lucide-react";
import { useLocale, useResume } from "@/i18n/locale-provider";
import Image from "next/image";
import { useState } from "react";

const BLUR_FADE_DELAY = 0.04;

function Portrait({
  src,
  alt,
  initials,
}: {
  src: string;
  alt: string;
  initials: string;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative size-24 overflow-hidden rounded-full border shadow-lg ring-4 ring-muted md:size-32">
      {failed ? (
        <span className="flex size-full items-center justify-center bg-muted text-lg font-medium">
          {initials}
        </span>
      ) : (
        <Image
          alt={alt}
          src={src}
          fill
          priority
          sizes="128px"
          className="object-cover"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}

export default function Page() {
  const { messages, t } = useLocale();
  const data = useResume();

  return (
    <main className="min-h-dvh flex flex-col gap-14 relative">
      <section id="hero">
        <div className="mx-auto w-full max-w-2xl space-y-8">
          <div className="gap-2 gap-y-6 flex flex-col md:flex-row justify-between">
            <div className="gap-2 flex flex-col order-2 md:order-1">
              <h1 className="flex items-center gap-2">
                <BlurFadeText
                  delay={BLUR_FADE_DELAY}
                  className="text-3xl font-semibold tracking-tighter sm:text-4xl lg:text-5xl"
                  yOffset={8}
                  text={t(messages.ui.greeting, {
                    name: data.name.split(" ")[0],
                  })}
                />
                <span aria-hidden className="text-3xl leading-none select-none">
                  👋
                </span>
              </h1>
              <BlurFade delay={BLUR_FADE_DELAY}>
                <div className="flex flex-col gap-2">
                  <div className="prose prose-p:my-1 prose-a:text-brand-link max-w-150 text-muted-foreground md:text-lg lg:text-xl dark:prose-invert">
                    <RichText text={data.jobTitle} />
                  </div>
                  <div className="prose prose-p:my-1 prose-a:text-brand-link max-w-150 text-base text-muted-foreground dark:prose-invert">
                    <RichText text={data.description} />
                  </div>
                  {isActionableHref(data.resumeUrl) ? (
                    <p className="text-sm text-muted-foreground">
                      {messages.ui.resume}:{" "}
                      <Link
                        href={data.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-link underline underline-offset-2 hover:text-brand-link/80"
                      >
                        {messages.ui.download}
                      </Link>
                    </p>
                  ) : null}
                </div>
              </BlurFade>
            </div>
            <BlurFade delay={BLUR_FADE_DELAY} className="order-1 md:order-2">
              <Portrait
                src={data.avatarUrl}
                alt={data.name}
                initials={data.initials}
              />
            </BlurFade>
          </div>
          <BlurFade delay={BLUR_FADE_DELAY * 2}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {data.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-border bg-card/60 px-3 py-5 text-center"
                >
                  <div className="text-2xl sm:text-3xl font-bold tracking-tight text-brand-accent tabular-nums">
                    {stat.value}
                  </div>
                  <div className="mt-1.5 text-xs sm:text-sm text-muted-foreground leading-snug">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </BlurFade>
        </div>
      </section>
      <section id="about">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <h2 className="text-xl font-bold">{messages.ui.about}</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <div className="prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
              <RichText text={data.summary} />
            </div>
          </BlurFade>
        </div>
      </section>
      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-8">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <WorkSection />
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 6}>
            <FreelanceSection />
          </BlurFade>
        </div>
      </section>
      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="text-xl font-bold">{messages.ui.education}</h2>
          </BlurFade>
          <div className="flex flex-col gap-8">
            {data.education.map((education, index) => {
              const educationContent = (
                <>
                  <div className="flex items-center gap-x-3 flex-1 min-w-0">
                    {education.logoUrl ? (
                      <Image
                        src={education.logoUrl}
                        alt={education.school}
                        width={40}
                        height={40}
                        className="size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border overflow-hidden object-contain flex-none"
                      />
                    ) : (
                      <div
                        className="size-8 md:size-10 border rounded-full shadow ring-2 ring-border bg-muted flex items-center justify-center flex-none text-foreground"
                        aria-label={education.school}
                      >
                        <GraduationCap className="size-4 md:size-5" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                      <div className="font-semibold leading-none flex items-center gap-2">
                        {education.school}
                        {isActionableHref(education.href) ? (
                          <ArrowUpRight
                            className="h-3.5 w-3.5 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                            aria-hidden
                          />
                        ) : null}
                      </div>
                      <div className="font-sans text-sm text-muted-foreground">
                        {education.degree}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs tabular-nums text-muted-foreground text-right flex-none">
                    <span>
                      {education.start} - {education.end}
                    </span>
                  </div>
                </>
              );

              return (
                <BlurFade
                  key={education.school}
                  delay={BLUR_FADE_DELAY * 8 + index * 0.05}
                >
                  {isActionableHref(education.href) ? (
                    <Link
                      href={education.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-x-3 justify-between group"
                    >
                      {educationContent}
                    </Link>
                  ) : (
                    <div className="flex items-center gap-x-3 justify-between">
                      {educationContent}
                    </div>
                  )}
                </BlurFade>
              );
            })}
          </div>
        </div>
      </section>
      <section id="skills">
        <BlurFade delay={BLUR_FADE_DELAY * 9}>
          <SkillsSection />
        </BlurFade>
      </section>
      <section id="projects">
        <BlurFade delay={BLUR_FADE_DELAY * 11}>
          <ProjectsSection />
        </BlurFade>
      </section>
      {data.hackathons.length > 0 ? (
        <section id="hackathons">
          <BlurFade delay={BLUR_FADE_DELAY * 13}>
            <HackathonsSection />
          </BlurFade>
        </section>
      ) : null}
      <section id="contact">
        <BlurFade delay={BLUR_FADE_DELAY * 16}>
          <ContactSection />
        </BlurFade>
      </section>
    </main>
  );
}
