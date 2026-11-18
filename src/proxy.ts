import { buildPortfolioMarkdown } from "@/lib/agent-data";
import { NextResponse, type NextRequest } from "next/server";

// Next.js 16: proxy.ts replaces middleware.ts.
// Content negotiation for the homepage only: if a client asks for
// text/markdown, serve a Markdown summary of the portfolio instead of HTML.
// Normal browsers (Accept: text/html) pass through untouched.
export function proxy(request: NextRequest) {
  const accept = request.headers.get("accept") ?? "";
  if (accept.toLowerCase().includes("text/markdown")) {
    return new NextResponse(buildPortfolioMarkdown(), {
      status: 200,
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    });
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/",
};
