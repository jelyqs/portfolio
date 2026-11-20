"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Copy } from "lucide-react";
import { FlickeringGrid } from "@/components/magicui/flickering-grid-lazy";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { DATA } from "@/data/resume";
import { useLocale } from "@/i18n/locale-provider";

export default function ContactSection() {
  const { messages } = useLocale();
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(DATA.contact.email);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = DATA.contact.email;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border rounded-xl p-10 relative">
      <div className="absolute -top-4 border bg-primary z-10 rounded-xl px-4 py-1 left-1/2 -translate-x-1/2">
        <span className="text-background text-sm font-medium">
          {messages.ui.contact}
        </span>
      </div>
      <div className="absolute inset-0 top-0 left-0 right-0 h-1/2 rounded-xl overflow-hidden">
        <FlickeringGrid
          className="h-full w-full"
          squareSize={4}
          gridGap={4}
          style={{
            maskImage: "linear-gradient(to bottom, black, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
          }}
        />
      </div>
      <div className="relative flex flex-col items-center gap-4 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
          {messages.ui.getInTouch}
        </h2>
        <p className="mx-auto max-w-lg text-muted-foreground text-balance">
          {messages.ui.contactBodyBefore}{" "}
          <Link
            href={DATA.contact.social.Facebook.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-link underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
          >
            Facebook
          </Link>{" "}
          {messages.ui.contactBodyOr}{" "}
          <Link
            href={DATA.contact.social.email.url}
            className="text-brand-link underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
          >
            {DATA.contact.email}
          </Link>
          {messages.ui.contactBodyAfter}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
          <Button asChild variant="outline">
            <a
              href={DATA.contact.social.WhatsApp.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icons.whatsapp className="mr-2 size-4" aria-hidden />
              WhatsApp
            </a>
          </Button>
          <Button asChild variant="outline">
            <a href={DATA.contact.social.email.url}>
              <Icons.email className="mr-2 size-4" aria-hidden />
              Email
            </a>
          </Button>
          <Button asChild variant="outline">
            <a
              href={DATA.contact.social.Facebook.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icons.facebook className="mr-2 size-4" aria-hidden />
              Facebook
            </a>
          </Button>
          <Button asChild variant="outline">
            <a
              href={DATA.contact.social.LinkedIn.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icons.linkedin className="mr-2 size-4" aria-hidden />
              LinkedIn
            </a>
          </Button>
          <Button variant="outline" onClick={copyEmail}>
            {copied ? (
              <Check className="mr-2 size-4" aria-hidden />
            ) : (
              <Copy className="mr-2 size-4" aria-hidden />
            )}
            {copied ? messages.ui.copied : messages.ui.copyEmail}
          </Button>
        </div>
      </div>
    </div>
  );
}
