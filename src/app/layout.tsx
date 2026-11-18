import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { LocaleProvider } from "@/i18n/locale-provider";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FlickeringGrid } from "@/components/magicui/flickering-grid-lazy";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),
  alternates: {
    canonical: DATA.url,
  },
  title: {
    default: `${DATA.name} | ${DATA.jobTitle}`,
    template: `%s | ${DATA.name}`,
  },
  description: DATA.description,
  icons: {
    icon: [
      { url: "/favicon/favicon.ico", sizes: "48x48" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/favicon/site.webmanifest",
  openGraph: {
    title: `${DATA.name}`,
    description: DATA.description,
    url: DATA.url,
    siteName: `${DATA.name}`,
    images: [
      {
        url: DATA.bannerUrl,
        width: 3360,
        height: 1280,
        alt: `${DATA.name} — ${DATA.jobTitle}`,
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: `${DATA.name}`,
    description: DATA.description,
    card: "summary_large_image",
    images: [DATA.bannerUrl],
  },
  facebook: {
    appId: "4261157464136425",
  },
  verification: {
    google: "",
    yandex: "",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: DATA.name,
  jobTitle: DATA.jobTitle,
  url: DATA.url,
  image: `${DATA.url}${DATA.avatarUrl}`,
  email: DATA.contact.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Da Nang",
    addressCountry: "VN",
  },
  sameAs: Object.values(DATA.contact.social)
    .map((s) => s.url)
    .filter((url) => url.startsWith("http")),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased relative",
          geist.variable,
          geistMono.variable,
        )}
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Google Analytics 4 (G-6Z3S9KRQWW) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-6Z3S9KRQWW"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-6Z3S9KRQWW');
            `,
          }}
        />
        {/* Cloudflare Web Analytics */}
        <script
          type="module"
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "31dc3199a13b400ab612f5d188549c8d"}'
        />
        <ThemeProvider attribute="class" defaultTheme="dark">
          <LocaleProvider>
            <TooltipProvider delayDuration={0}>
              <div className="absolute inset-0 top-0 left-0 right-0 h-25 overflow-hidden z-0">
                <FlickeringGrid
                  className="h-full w-full"
                  squareSize={4}
                  gridGap={4}
                  style={{
                    maskImage: "linear-gradient(to bottom, black, transparent)",
                    WebkitMaskImage:
                      "linear-gradient(to bottom, black, transparent)",
                  }}
                />
              </div>
              <div className="relative z-10 max-w-2xl mx-auto py-12 pb-24 sm:py-24 px-6">
                {children}
              </div>
              <Navbar />
            </TooltipProvider>
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
