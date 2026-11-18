"use client";

import { Badge } from "@/components/ui/badge";
import { cn, isActionableHref } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

function ProjectImage({ src, alt }: { src: string; alt: string }) {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    return <div className="h-48 w-full bg-muted" />;
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(min-width: 640px) 380px, 100vw"
      className="object-cover"
      unoptimized={src.endsWith(".svg")}
      onError={() => setImageError(true)}
    />
  );
}

interface Props {
  title: string;
  href?: string;
  description: string;
  dates: string;
  tags: readonly string[];
  link?: string;
  image?: string;
  video?: string;
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  className?: string;
}

export function ProjectCard({
  title,
  href,
  description,
  dates,
  tags,
  link,
  image,
  video,
  links,
  className,
}: Props) {
  const hasHref = isActionableHref(href);
  const media = video ? (
    <video
      src={video}
      autoPlay
      loop
      muted
      playsInline
      preload="none"
      className="h-48 w-full object-cover"
    />
  ) : image ? (
    <div className="relative h-48 w-full">
      <ProjectImage src={image} alt={title} />
    </div>
  ) : (
    <div className="h-48 w-full bg-muted" />
  );

  return (
    <div
      className={cn(
        "flex flex-col h-full border border-border rounded-xl overflow-hidden transition-all duration-200",
        hasHref && "hover:ring-2 cursor-pointer hover:ring-muted",
        className,
      )}
    >
      <div className="relative shrink-0">
        {hasHref ? (
          <Link
            href={href!}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            {media}
          </Link>
        ) : (
          <div className="block">{media}</div>
        )}
        {links && links.length > 0 && (
          <div className="absolute top-2 right-2 flex flex-wrap gap-2">
            {links.map((link, idx) =>
              isActionableHref(link.href) ? (
                <Link
                  href={link.href}
                  key={idx}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Badge
                    className="flex items-center gap-1.5 text-xs bg-black text-white hover:bg-black/90 min-h-6"
                    variant="default"
                  >
                    {link.icon}
                    {link.type}
                  </Badge>
                </Link>
              ) : (
                <Badge
                  key={idx}
                  className="flex items-center gap-1.5 text-xs bg-black text-white min-h-6"
                  variant="default"
                >
                  {link.icon}
                  {link.type}
                </Badge>
              ),
            )}
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1">
            <h3 className="font-semibold">{title}</h3>
            <time className="text-xs text-muted-foreground">{dates}</time>
          </div>
          {hasHref ? (
            <Link
              href={href!}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
              aria-label={`Open ${title}`}
            >
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
          ) : null}
        </div>
        <p className="flex-1 text-xs font-sans leading-relaxed text-pretty text-muted-foreground">
          {description}
        </p>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-auto">
            {tags.map((tag) => (
              <Badge
                key={tag}
                className="text-[11px] font-medium border border-border h-6 w-fit px-2"
                variant="outline"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
