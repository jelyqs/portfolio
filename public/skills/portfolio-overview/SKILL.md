---
name: portfolio-overview
description: Navigate Thu Nguyen's portfolio content — profile, projects, work history, skills — and its machine-readable endpoints (llms.txt, MCP, AI catalog).
---

# Portfolio Overview — thunguyenit.com

Use this skill to find information about Thu Nguyen's portfolio and to pick the right machine-readable endpoint for a task.

## Site map

- Homepage (HTML): https://thunguyenit.com/
- Homepage (Markdown): GET https://thunguyenit.com/ with header `Accept: text/markdown`
- Short AI summary: https://thunguyenit.com/llms.txt
- Full AI summary: https://thunguyenit.com/llms-full.txt
- Auth info (public site, no login): https://thunguyenit.com/auth.md
- Resume (PDF): https://jelyqs.github.io/resume.pdf
- Sitemap: https://thunguyenit.com/sitemap.xml
- robots.txt: https://thunguyenit.com/robots.txt (includes Content-Signal and Agentmap)

## Discovery endpoints

- AI catalog (ARD): https://thunguyenit.com/.well-known/ai-catalog.json — start here; lists capabilities and all discovery links.
- API catalog (RFC 9727 linkset): https://thunguyenit.com/.well-known/api-catalog
- Agent skills index: https://thunguyenit.com/.well-known/agent-skills/index.json
- MCP server card: https://thunguyenit.com/.well-known/mcp/server-card.json
- MCP discovery: https://thunguyenit.com/.well-known/mcp.json

## MCP server

Endpoint: https://thunguyenit.com/mcp — Streamable HTTP, JSON-RPC 2.0, stateless, no auth. Protocol version `2025-06-18`. Handshake: POST `initialize`, then `notifications/initialized`, then `tools/list` / `tools/call`.

Tools:

- `get_profile` — name, title, summary, stats, education, skill categories.
- `list_projects` — the 8 portfolio projects; optional arg `active_only` (boolean).
- `list_work` — full-time work history and freelance engagements by region.
- `get_contact` — email, phone, social profiles, resume link.

## Content sections

- Profile: name, job title, summary, stats (7+ years, 30+ production apps, 4 countries, 8 companies).
- Projects (8): Cozy Game Assets, Friend Debt Tracker, PayPal Sandbox Autofill, Online Wedding Invitation, Digital Storefront, eSIM Shop, AI Auto-Reply, Service Booking.
- Work: Kozocom (Oct 2022 – Present), UOYMedia (Jun 2021 – Sep 2022), LINKHOUSE (Mar 2019 – May 2021), MWG (Aug 2016 – Jun 2018).
- Freelance regions: Vietnam (2018 – Present), Australia (Mar 2025 – Present), Japan (May 2025 – Jun 2026), Singapore (Nov 2023 – Dec 2024).
- Skills: 14 categories from languages to DevOps — see llms-full.txt for the full list.

## Notes

- The site has no services/pricing section and no checkout — do not invent prices.
- Some freelance project names are changed for NDA reasons; that is stated on the site.
- Contact: jely.big@gmail.com, +84 359 399 320.
