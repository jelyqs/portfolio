"use client";

import { Dock, DockIcon } from "@/components/magicui/dock";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { ModeToggle } from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { useLocale, useResume } from "@/i18n/locale-provider";

const DOCK_ICON_CLASS =
  "size-full cursor-pointer rounded-3xl border border-border bg-background p-0 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground";

const TOOLTIP_CLASS =
  "rounded-xl bg-primary px-4 py-2 text-sm text-primary-foreground shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] dark:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]";

const NAVBAR_SOCIALS = Object.entries(DATA.contact.social).filter(
  ([, social]) => social.navbar,
);

export default function Navbar() {
  const { messages } = useLocale();
  const data = useResume();

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-30">
      <Dock className="z-50 pointer-events-auto relative h-14 p-2 w-fit mx-auto flex gap-2 border bg-card/90 backdrop-blur-md shadow-[0_0_10px_3px] shadow-primary/5">
        {data.navbar.map((item) => {
          const isExternal = item.href.startsWith("http");
          return (
            <Tooltip key={item.href}>
              <TooltipTrigger asChild>
                <a
                  href={item.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  aria-label={item.label}
                >
                  <DockIcon className={DOCK_ICON_CLASS}>
                    <item.icon className="size-full rounded-sm overflow-hidden object-contain" />
                  </DockIcon>
                </a>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                sideOffset={8}
                className={TOOLTIP_CLASS}
              >
                <p>{item.label}</p>
                <TooltipArrow className="fill-primary" />
              </TooltipContent>
            </Tooltip>
          );
        })}
        <Separator
          orientation="vertical"
          className="h-2/3 m-auto w-px bg-border"
        />
        {NAVBAR_SOCIALS.map(([name, social]) => {
          const isExternal = social.url.startsWith("http");
          const IconComponent = social.icon;
          return (
            <Tooltip key={name}>
              <TooltipTrigger asChild>
                <a
                  href={social.url}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  aria-label={social.name}
                >
                  <DockIcon className={DOCK_ICON_CLASS}>
                    <IconComponent className="size-full rounded-sm overflow-hidden object-contain" />
                  </DockIcon>
                </a>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                sideOffset={8}
                className={TOOLTIP_CLASS}
              >
                <p>{name}</p>
                <TooltipArrow className="fill-primary" />
              </TooltipContent>
            </Tooltip>
          );
        })}
        <Tooltip>
          <TooltipTrigger asChild>
            <DockIcon className={`${DOCK_ICON_CLASS} min-w-11`}>
              <LocaleSwitcher className="size-full" />
            </DockIcon>
          </TooltipTrigger>
          <TooltipContent side="top" sideOffset={8} className={TOOLTIP_CLASS}>
            <p>{messages.ui.language}</p>
            <TooltipArrow className="fill-primary" />
          </TooltipContent>
        </Tooltip>
        <Separator
          orientation="vertical"
          className="h-2/3 m-auto w-px bg-border"
        />
        <Tooltip>
          <TooltipTrigger asChild>
            <DockIcon className={DOCK_ICON_CLASS}>
              <ModeToggle className="size-full cursor-pointer" />
            </DockIcon>
          </TooltipTrigger>
          <TooltipContent side="top" sideOffset={8} className={TOOLTIP_CLASS}>
            <p>{messages.ui.theme}</p>
            <TooltipArrow className="fill-primary" />
          </TooltipContent>
        </Tooltip>
      </Dock>
    </div>
  );
}
