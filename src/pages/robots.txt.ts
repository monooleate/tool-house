// src/pages/robots.txt.ts
// Dinamikus robots.txt – domain-specifikus sitemap URL
import type { APIRoute } from "astro";
import { CURRENT_CONFIG } from "../i18n/index.ts";

export const GET: APIRoute = () => {
  const siteUrl = CURRENT_CONFIG.siteUrl;

  const body = `User-agent: *
Allow: /

# AI crawlerek engedélyezése (AI visibility)
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: cohere-ai
Allow: /

User-agent: OAI-SearchBot
Allow: /

# Rossz botok tiltása
User-agent: CCBot
Disallow: /

User-agent: AhrefsBot
Disallow: /

User-agent: SemrushBot
Disallow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
};
