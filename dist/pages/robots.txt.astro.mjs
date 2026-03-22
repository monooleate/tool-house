import { b as CURRENT_CONFIG } from '../chunks/index_ChOr8V1l.mjs';
export { r as renderers } from '../chunks/_@astro-renderers_BTphoX3x.mjs';

const GET = () => {
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
      "Cache-Control": "public, max-age=86400"
    }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
