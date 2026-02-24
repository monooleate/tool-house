# Claude Code Kiegészítő Prompt – EszközTár SEO + UX + Security

> Ez a fájl a `CLAUDE_CODE_PROMPT.md` folytatása.
> Kontextus: Astro 4 SSG + Svelte 5 islands, statikus deploy (Netlify/CF Pages/Vercel).

---

## A. Dinamikus Sitemap (prioritás + lastmod)

Az `@astrojs/sitemap` alapból mindent 0.5 prioritással ad ki és nem tud
`lastmod`-ot vagy kategória-alapú `changefreq`-et kezelni.
Csere: **saját Astro endpoint**.

### Fájl: `src/pages/sitemap.xml.ts`

```ts
// src/pages/sitemap.xml.ts
import type { APIRoute } from "astro";
import {
  getAllTools, CATEGORIES, type CategoryId,
} from "../lib/tool-registry.ts";

// Prioritás kategória szerint
const CATEGORY_PRIORITY: Record<CategoryId | "home" | "category", string> = {
  home:       "1.0",
  category:   "0.8",
  kep:        "0.9",
  adat:       "0.9",
  szoveg:     "0.85",
  fejleszto:  "0.85",
  pdf:        "0.85",
  excel:      "0.8",
  markdown:   "0.75",
  html:       "0.75",
  fajl:       "0.75",
  seo:        "0.8",
};

// changefreq kategória szerint
const CATEGORY_CHANGEFREQ: Record<CategoryId | "home" | "category", string> = {
  home:       "daily",
  category:   "weekly",
  kep:        "monthly",
  adat:       "monthly",
  szoveg:     "monthly",
  fejleszto:  "monthly",
  pdf:        "monthly",
  excel:      "monthly",
  markdown:   "monthly",
  html:       "monthly",
  fajl:       "monthly",
  seo:        "weekly",
};

function url(
  base: string,
  path: string,
  priority: string,
  changefreq: string,
  lastmod?: string
): string {
  const loc = `${base}${path}`;
  const lm  = lastmod ?? new Date().toISOString().split("T")[0];
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lm}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

export const GET: APIRoute = ({ site }) => {
  const base = (site?.toString() ?? "https://eszkoztár.hu").replace(/\/$/, "");
  const tools = getAllTools();
  const today = new Date().toISOString().split("T")[0];

  const urls: string[] = [];

  // Főoldal
  urls.push(url(base, "/", "1.0", "daily", today));

  // Kategória landing oldalak
  for (const cat of CATEGORIES) {
    urls.push(url(base, `/${cat.id}`, CATEGORY_PRIORITY.category, CATEGORY_CHANGEFREQ.category));
  }

  // Tool oldalak – aktív magasabb prioritással
  for (const tool of tools) {
    const priority   = tool.status === "active"
      ? CATEGORY_PRIORITY[tool.category]
      : "0.5";
    const changefreq = tool.status === "active"
      ? CATEGORY_CHANGEFREQ[tool.category]
      : "monthly";
    // Ha a tool-registry-be kerül `updatedAt` mező, használd:
    // const lastmod = tool.updatedAt ?? today;
    urls.push(url(base, `/${tool.category}/${tool.slug}`, priority, changefreq));
  }

  // Statikus oldalak
  urls.push(url(base, "/adatvedelmi-nyilatkozat", "0.3", "yearly"));

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
    http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urls.join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      // 10 perc kliens cache, 1 óra CDN cache
      "Cache-Control": "public, max-age=600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
};
```

**Fontos:** az Astro SSG módban ez statikus fájlként generálódik build-kor.
Ha dinamikus (SSR) kell, tedd az `astro.config.mjs`-be:

```js
// Ha SSR-t akarsz (Netlify/CF Pages adapter esetén):
export const prerender = false; // a sitemap.xml.ts tetejére
```

---

## B. Scroll kezelés – SvelteKit-szerű UX Astro-ban

Az Astro MPA (Multi Page App) – minden navigáció teljes oldalbetöltés.
A View Transitions API-val viszont SPA-szerű navigáció érhető el,
és a scroll kezelés is kontrolálható.

### B1. View Transitions bekapcsolása

```js
// astro.config.mjs – módosítás
export default defineConfig({
  // ...
  // View Transitions globálisan (opcionális, de javasolt)
  // Az egyedi oldalak is hozzáadhatnak transition direktívákat
});
```

```astro
<!-- src/layouts/BaseLayout.astro <head> bővítése: -->
import { ViewTransitions } from "astro:transitions";

<!-- a <head>-be: -->
<ViewTransitions />
```

### B2. Scroll manager – `src/scripts/scroll-manager.ts`

```ts
// src/scripts/scroll-manager.ts
// Astro View Transitions scroll kezelés
// Forward nav → scroll top | Back/forward → pozíció visszaállítás

const SCROLL_KEY_PREFIX = "scroll:";

function saveScroll(): void {
  const key = SCROLL_KEY_PREFIX + window.location.pathname;
  try {
    sessionStorage.setItem(key, String(Math.round(window.scrollY)));
  } catch {}
}

function restoreScroll(path: string): void {
  try {
    const saved = sessionStorage.getItem(SCROLL_KEY_PREFIX + path);
    if (saved !== null) {
      window.scrollTo({ top: parseInt(saved, 10), behavior: "instant" });
      sessionStorage.removeItem(SCROLL_KEY_PREFIX + path);
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  } catch {
    window.scrollTo({ top: 0, behavior: "instant" });
  }
}

// Astro View Transitions events
document.addEventListener("astro:before-swap", () => {
  // Mentjük az aktuális scroll pozíciót mielőtt az oldal felváltódik
  saveScroll();
});

document.addEventListener("astro:after-swap", () => {
  // Visszaállítjuk vagy tetejére görgetünk
  // Az Astro átad navigationType infót
  const navType = (window.navigation?.currentEntry?.id) ? "traverse" : "push";
  if (navType === "push") {
    window.scrollTo({ top: 0, behavior: "instant" });
  } else {
    restoreScroll(window.location.pathname);
  }
});

// Fallback: history API alapú megközelítés ha nincs View Transitions
if (!document.startViewTransition) {
  history.scrollRestoration = "manual";

  let isPopState = false;
  window.addEventListener("popstate", () => { isPopState = true; });

  window.addEventListener("beforeunload", saveScroll);

  window.addEventListener("load", () => {
    if (isPopState) {
      restoreScroll(window.location.pathname);
      isPopState = false;
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  });
}
```

**Beillesztés a BaseLayout.astro-ba:**

```astro
<!-- src/layouts/BaseLayout.astro – </body> előtt -->
<script>
  import "../scripts/scroll-manager.ts";
</script>
```

---

## C. OG + Twitter meta tag bővítés

### C1. BaseLayout.astro – teljes meta csomag

Cseréld le a meglévő OG blokkot erre:

```astro
---
// BaseLayout.astro Props bővítése:
export interface Props {
  title: string;
  description?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogImageWidth?: number;
  ogImageHeight?: number;
  ogType?: "website" | "article";
  schemaScripts?: string[];
  noIndex?: boolean;
  // Új mezők:
  publishedAt?: string;   // ISO date, cikkekhez
  modifiedAt?: string;    // ISO date, frissítési dátumhoz
}

const {
  ogImage      = "/og-default.png",
  ogImageWidth  = 1200,
  ogImageHeight = 630,
  publishedAt,
  modifiedAt,
  // ... többi meglévő prop
} = Astro.props;

const ogImageAbsolute = new URL(ogImage, site).toString();
const hasLargeImage = ogImageWidth >= 300 && ogImageHeight >= 157;
---

<!-- HEAD-be, a meglévő OG blokk helyére: -->

<!-- Open Graph -->
<meta property="og:type"        content={ogType ?? "website"} />
<meta property="og:site_name"   content={SITE_NAME} />
<meta property="og:locale"      content="hu_HU" />
<meta property="og:title"       content={ogTitle ?? resolvedTitle} />
<meta property="og:description" content={ogDescription ?? description} />
<meta property="og:url"         content={canonicalUrl} />
<meta property="og:image"       content={ogImageAbsolute} />
<meta property="og:image:width"  content={String(ogImageWidth)} />
<meta property="og:image:height" content={String(ogImageHeight)} />
<meta property="og:image:alt"    content={ogTitle ?? resolvedTitle} />

<!-- Cikk-specifikus OG (ha article type) -->
{ogType === "article" && publishedAt && (
  <meta property="article:published_time" content={publishedAt} />
)}
{ogType === "article" && modifiedAt && (
  <meta property="article:modified_time" content={modifiedAt} />
)}
{ogType === "article" && (
  <meta property="article:author" content={SITE_NAME} />
)}

<!-- Twitter Card -->
<meta name="twitter:card"        content={hasLargeImage ? "summary_large_image" : "summary"} />
<meta name="twitter:title"       content={ogTitle ?? resolvedTitle} />
<meta name="twitter:description" content={ogDescription ?? description} />
<meta name="twitter:image"       content={ogImageAbsolute} />
<meta name="twitter:image:alt"   content={ogTitle ?? resolvedTitle} />
```

---

## D. Security + Cache Headers

Astro SSG-ben nincs middleware, ezért **platform-specifikusan** kell beállítani.

### D1. Netlify – `public/_headers`

```
# public/_headers
# Biztonság – minden oldalra
/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: SAMEORIGIN
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
  X-DNS-Prefetch-Control: on
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob:; worker-src 'self' blob:; connect-src 'self';

# Vite hash-elt JS/CSS – immutable (örökre cache-elhető)
/_astro/*
  Cache-Control: public, max-age=31536000, immutable

# Képek/SVG – 30 nap + stale-while-revalidate
/images/*
  Cache-Control: public, max-age=2592000, stale-while-revalidate=86400

/*.svg
  Cache-Control: public, max-age=2592000, stale-while-revalidate=86400

# Fontok – 1 év
/fonts/*
  Cache-Control: public, max-age=31536000, immutable

# Webmanifest – 1 nap
/site.webmanifest
  Cache-Control: public, max-age=86400

# Sitemap – 1 óra (ha statikus)
/sitemap.xml
  Cache-Control: public, max-age=3600, s-maxage=3600

# robots.txt – 1 nap
/robots.txt
  Cache-Control: public, max-age=86400

# HTML oldalak – ne cache-elje aggresszívan
/*.html
  Cache-Control: public, max-age=0, must-revalidate
```

### D2. Cloudflare Pages – `public/_headers` (ugyanaz mint Netlify, CF is olvassa)

### D3. Vercel – `vercel.json`

```json
{
  "headers": [
    {
      "source": "/_astro/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    },
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options",    "value": "nosniff" },
        { "key": "X-Frame-Options",            "value": "SAMEORIGIN" },
        { "key": "Referrer-Policy",            "value": "strict-origin-when-cross-origin" },
        { "key": "X-DNS-Prefetch-Control",     "value": "on" },
        { "key": "Permissions-Policy",         "value": "camera=(), microphone=(), geolocation=()" }
      ]
    }
  ],
  "buildCommand": "pnpm build",
  "outputDirectory": "dist"
}
```

### D4. Content Security Policy – Worker miatt szükséges kivételek

A Web Workerek `blob:` URL-eket használnak. A CSP-be kötelező:

```
worker-src 'self' blob:;
```

Képek preview-nál `createObjectURL` → `img src=blob:...`, ezért:

```
img-src 'self' data: blob:;
```

---

## E. OG Kép generálás – Satori alapú build-time

Tool oldalakhoz automatikus OG képek generálása.

### E1. Telepítés

```bash
pnpm add @vercel/og satori @resvg/resvg-js sharp
```

### E2. `src/pages/og/[category]/[slug].png.ts`

```ts
// src/pages/og/[category]/[slug].png.ts
import type { APIRoute } from "astro";
import { getAllTools, getCategoryInfo } from "../../../lib/tool-registry.ts";

export async function getStaticPaths() {
  const tools = getAllTools();
  return tools.map((tool) => ({
    params: { category: tool.category, slug: tool.slug },
    props:  { tool },
  }));
}

export const GET: APIRoute = async ({ props }) => {
  const { tool } = props;
  const cat = getCategoryInfo(tool.category)!;

  // Satori HTML → SVG → PNG
  const { default: satori }  = await import("satori");
  const { Resvg }            = await import("@resvg/resvg-js");

  // Inter font betöltése (vagy Space Mono)
  const fontData = await fetch(
    "https://fonts.gstatic.com/s/spacemono/v13/i7dMIFZifjKcF5UAWdDRaPpZYXE.woff"
  ).then((r) => r.arrayBuffer());

  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          width:      "100%",
          height:     "100%",
          display:    "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding:    "60px",
          background: "#0f0f0e",
          fontFamily: "'Space Mono'",
        },
        children: [
          {
            type: "div",
            props: {
              style: { display: "flex", alignItems: "center", gap: "16px" },
              children: [
                {
                  type: "span",
                  props: {
                    style: { fontSize: "48px" },
                    children: cat.icon,
                  },
                },
                {
                  type: "span",
                  props: {
                    style: {
                      fontSize: "20px",
                      color: "#00c896",
                      fontWeight: "700",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    },
                    children: cat.label,
                  },
                },
              ],
            },
          },
          {
            type: "div",
            props: {
              style: {
                fontSize:   "56px",
                fontWeight: "700",
                color:      "#f0f0e8",
                lineHeight: "1.1",
                maxWidth:   "800px",
              },
              children: tool.h1,
            },
          },
          {
            type: "div",
            props: {
              style: {
                fontSize: "24px",
                color:    "#9e9e8e",
                maxWidth: "700px",
              },
              children: tool.description.slice(0, 100) + "…",
            },
          },
          {
            type: "div",
            props: {
              style: {
                display:    "flex",
                alignItems: "center",
                justifyContent: "space-between",
              },
              children: [
                {
                  type: "span",
                  props: {
                    style: {
                      fontSize:   "22px",
                      fontWeight: "700",
                      color:      "#00c896",
                    },
                    children: "⚡ EszközTár",
                  },
                },
                {
                  type: "span",
                  props: {
                    style: {
                      fontSize:        "16px",
                      color:           "#00c896",
                      background:      "#00c89615",
                      border:          "1px solid #00c89640",
                      borderRadius:    "999px",
                      padding:         "6px 16px",
                      textTransform:   "uppercase",
                      letterSpacing:   "0.08em",
                    },
                    children: tool.status === "active" ? "Aktív eszköz" : "Hamarosan",
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width:  1200,
      height: 630,
      fonts: [
        {
          name: "Space Mono",
          data: fontData,
          weight: 700,
          style: "normal",
        },
      ],
    }
  );

  const resvg = new Resvg(svg);
  const png   = resvg.render().asPng();

  return new Response(png, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=2592000, immutable",
    },
  });
};
```

### E3. ToolLayout.astro – OG kép bekötése

```astro
<!-- ToolLayout.astro – a BaseLayout hívásában: -->
<BaseLayout
  title={tool.title}
  description={tool.description}
  canonical={`/${tool.category}/${tool.slug}`}
  ogImage={`/og/${tool.category}/${tool.slug}.png`}
  ogImageWidth={1200}
  ogImageHeight={630}
  schemaScripts={schemas}
/>
```

> **Megjegyzés:** A Satori build-time fut SSG-ben – nem kell szerver.
> Ha a Resvg deps gondot okoz, alternatíva: `astro-og-canvas` csomag.

---

## F. Plausible Analytics (privacy-first)

Illeszkedik a „szervermentes, privát" brandhez. Google Analytics kerülendő.

```astro
<!-- src/layouts/BaseLayout.astro <head> végére: -->
{import.meta.env.PROD && (
  <script
    defer
    data-domain="eszkoztár.hu"
    src="https://plausible.io/js/script.js"
  ></script>
)}
```

Vagy self-hosted Plausible esetén:

```astro
<script
  defer
  data-domain="eszkoztár.hu"
  src="https://analytics.sajatnev.hu/js/script.js"
></script>
```

**Event tracking tool használathoz (Plausible custom events):**

```ts
// src/lib/analytics.ts
export function trackToolUse(toolSlug: string, action: "convert" | "download" | "error"): void {
  if (typeof window === "undefined") return;
  // @ts-expect-error – Plausible globális
  window.plausible?.("tool_use", {
    props: { tool: toolSlug, action },
  });
}
```

Svelte komponensben:

```ts
import { trackToolUse } from "../../lib/analytics.ts";
// Letöltéskor:
trackToolUse("jpg-webp", "download");
```

---

## G. Robots.txt frissítés + AI crawler tiltás

```txt
# public/robots.txt
User-agent: *
Allow: /

# AI crawlerek tiltása (opcionális, de egyre inkább best practice)
User-agent: GPTBot
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: anthropic-ai
Disallow: /

Sitemap: https://eszkoztár.hu/sitemap.xml
```

---

## H. Tool Registry bővítés – `updatedAt` mező

A sitemap `lastmod` értékéhez add hozzá a registry típushoz:

```ts
// src/lib/tool-registry.ts – Tool interface bővítés:
export interface Tool {
  // ... meglévő mezők
  updatedAt?: string;   // ISO date, pl. "2025-03-15"
  launchedAt?: string;  // ISO date – mikor lett active
}

// Aktív tooloknál töltsd ki:
{
  slug: "jpg-webp",
  // ...
  updatedAt:  "2025-11-01",
  launchedAt: "2025-10-15",
},
```

Sitemap-ban:

```ts
// routes/sitemap.xml.ts-ben:
const lastmod = tool.updatedAt ?? tool.launchedAt ?? today;
urls.push(url(base, `/${tool.category}/${tool.slug}`, priority, changefreq, lastmod));
```

---

## I. Structured Data – WebApplication schema tool.status alapján

A meglévő `SoftwareApplication` sémát egészítsd ki:

```ts
// src/lib/seo.ts – toolSoftwareSchema bővítés:
export function toolSoftwareSchema(tool: Tool): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name:        tool.h1,
    description: tool.description,
    url:         buildCanonical(`/${tool.category}/${tool.slug}`),
    applicationCategory: "UtilitiesApplication",
    applicationSubCategory: categoryToSubCategory(tool.category),
    operatingSystem: "Web",
    browserRequirements: "Requires JavaScript. Requires HTML5 File API.",
    // Bővítések:
    dateModified:  tool.updatedAt  ?? undefined,
    datePublished: tool.launchedAt ?? undefined,
    inLanguage:    "hu",
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      price:         "0",
      priceCurrency: "HUF",
      availability:  tool.status === "active"
        ? "https://schema.org/InStock"
        : "https://schema.org/PreOrder",
    },
    featureList: [
      "Böngészőben fut – nincs szerverfeltöltés",
      "Ingyenes, regisztráció nélkül",
      "Azonnali feldolgozás Web Worker technológiával",
      "Privát – a fájlok nem hagyják el a böngészőt",
    ],
    screenshot: tool.status === "active"
      ? buildCanonical(`/og/${tool.category}/${tool.slug}.png`)
      : undefined,
  });
}

function categoryToSubCategory(cat: string): string {
  const map: Record<string, string> = {
    kep:       "ImageEditorApplication",
    pdf:       "BusinessApplication",
    adat:      "DeveloperApplication",
    szoveg:    "UtilitiesApplication",
    fejleszto: "DeveloperApplication",
    seo:       "BusinessApplication",
    excel:     "BusinessApplication",
    fajl:      "UtilitiesApplication",
  };
  return map[cat] ?? "UtilitiesApplication";
}
```

---

## J. Performance – `client:visible` vs `client:load`

Coming-soon tooloknál nincs értelme azonnal hydratálni.
Az aktív tooloknál is javítja a LCP-t a lazy hydration:

```astro
<!-- src/pages/kep/jpg-webp.astro módosítás: -->
<!-- Régi: -->
<JpgWebpTool client:load />

<!-- Új: a fold alatt van a tool UI, a dropzone scroll után látszik -->
<JpgWebpTool client:visible />
```

**Kivétel:** Ha a tool azonnal, pageload-on látható (above the fold), hagyd `client:load`.
A legtöbb tool esetén a header + breadcrumb + tool-header után következik a UI,
tehát `client:visible` szinte mindenhol jobb.

---

## K. Prefetch – gyorsabb navigáció

```astro
<!-- src/layouts/BaseLayout.astro <head>-be: -->
<!-- Astro prefetch – hover-re előtölti a belső linkeket -->
<script>
  // Astro beépített prefetch aktiválása
</script>
```

```js
// astro.config.mjs bővítés:
export default defineConfig({
  prefetch: {
    prefetchAll: false,          // ne prefetch-elje az összeset
    defaultStrategy: "hover",   // hover-re tölt be előre
  },
  // ...
});
```

```astro
<!-- Kategória landing oldalakon a tool card linkekre: -->
<a href={`/${tool.category}/${tool.slug}`} data-astro-prefetch>
```

---

## L. `rel="preload"` fontokhoz

```astro
<!-- src/layouts/BaseLayout.astro <head> tetejére (a CSS link előtt): -->
<link
  rel="preconnect"
  href="https://fonts.gstatic.com"
  crossorigin
/>
<link
  rel="preload"
  as="style"
  href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Figtree:wght@400;500;600;700&display=swap"
/>
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Figtree:wght@400;500;600;700&display=swap"
/>
```

**Vagy self-host a fontokat** (jobb Core Web Vitals):

```bash
npx fontsource-cli Space+Mono Figtree
pnpm add @fontsource/space-mono @fontsource/figtree
```

```astro
<!-- BaseLayout.astro ---frontmatter-be: -->
import "@fontsource/space-mono/400.css";
import "@fontsource/space-mono/700.css";
import "@fontsource/figtree/400.css";
import "@fontsource/figtree/700.css";
```

```css
/* src/styles/global.css – font stack módosítás: */
--font-mono: "Space Mono", monospace;
--font-body: "Figtree", system-ui, sans-serif;
```

---

## M. 404 oldal

```astro
<!-- src/pages/404.astro -->
---
import BaseLayout from "../layouts/BaseLayout.astro";
import { getActiveTools } from "../lib/tool-registry.ts";

const suggestions = getActiveTools().slice(0, 3);
---

<BaseLayout
  title="404 – Az oldal nem található | EszközTár"
  description="Ez az oldal nem létezik. Keress az eszközök között!"
  noIndex={true}
>
  <div class="container not-found">
    <div class="not-found__icon">🔍</div>
    <h1>Az oldal nem található</h1>
    <p>A keresett URL nem létezik, vagy megváltozott.</p>

    <div class="not-found__suggestions">
      <h2>Talán ezeket keresed?</h2>
      <ul>
        {suggestions.map(t => (
          <li><a href={`/${t.category}/${t.slug}`}>{t.h1}</a></li>
        ))}
      </ul>
    </div>

    <a href="/" class="btn btn--primary">← Vissza a főoldalra</a>
  </div>
</BaseLayout>

<style>
.not-found {
  text-align: center;
  padding: var(--sp-16) 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--sp-5);
}
.not-found__icon { font-size: 4rem; }
.not-found__suggestions { text-align: left; }
.not-found__suggestions ul { list-style: none; padding: 0; display: flex; flex-direction: column; gap: var(--sp-2); }
.not-found__suggestions a { color: var(--accent); font-family: var(--font-mono); font-weight: 700; }
</style>
```

---

## Módosított fájlok összefoglalója

| Fájl | Változás | Prioritás |
|---|---|---|
| `src/pages/sitemap.xml.ts` | ÚJ – dinamikus sitemap prioritással | 🔴 Magas |
| `public/_headers` | ÚJ – security + cache headers | 🔴 Magas |
| `vercel.json` | ÚJ – Vercel headers (ha Vercel-t használsz) | 🟡 Platform-függő |
| `src/layouts/BaseLayout.astro` | OG/Twitter bővítés, View Transitions, prefetch | 🔴 Magas |
| `src/lib/seo.ts` | toolSoftwareSchema bővítés, screenshot, availability | 🟡 Közepes |
| `src/lib/tool-registry.ts` | `updatedAt`, `launchedAt` mezők | 🟡 Közepes |
| `src/scripts/scroll-manager.ts` | ÚJ – scroll kezelés | 🟡 Közepes |
| `src/pages/og/[category]/[slug].png.ts` | ÚJ – OG kép generálás | 🟢 Alacsony (de nagy CTR hatás) |
| `src/pages/404.astro` | ÚJ – 404 oldal | 🟡 Közepes |
| `src/lib/analytics.ts` | ÚJ – Plausible event tracking | 🟢 Alacsony |
| `public/robots.txt` | AI crawler tiltás | 🟢 Alacsony |
| `astro.config.mjs` | prefetch, ViewTransitions | 🟡 Közepes |

## Sorrend ajánlás

1. `public/_headers` + security headers (5 perc, nagy hatás)
2. OG/Twitter meta bővítés a BaseLayout-ban (15 perc)
3. `sitemap.xml.ts` dinamikus sitemap (20 perc)
4. View Transitions + scroll manager (30 perc)
5. OG kép generálás Satori-val (60 perc, opcionális de CTR-re nagy hatás)
6. Plausible analytics (10 perc)
7. Font self-hosting (30 perc, Core Web Vitals javítás)
