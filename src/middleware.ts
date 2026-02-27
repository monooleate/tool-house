// ============================================================
// src/middleware.ts
// Security + Cache-Control fejlécek minden response-ra
//
// Astro middleware: automatikusan fut minden kérés előtt.
// SSG deploy esetén (Netlify/CF Pages/Vercel) a statikus fájlok
// nem érintik ezt – csak SSR/hybrid módban aktív minden kérésnél.
// Statikus hostingon: _headers fájlt is adj hozzá (lásd lent).
// ============================================================
import { defineMiddleware } from "astro:middleware";

// ─── Cache stratégia típusonként ─────────────────────────────
const CACHE_RULES: Array<{ pattern: RegExp; value: string }> = [
  // Vite hash-elt assets (pl. _astro/main.Bx3fQ.css) – soha nem változnak
  {
    pattern: /\/_astro\/.+\.(js|css|woff2?|ttf|otf)$/,
    value:   "public, max-age=31536000, immutable",
  },
  // Fontok (Google Fonts proxy, saját font fájlok)
  {
    pattern: /\.(woff2?|ttf|otf|eot)$/,
    value:   "public, max-age=31536000, immutable",
  },
  // Képek, SVG, favicon
  {
    pattern: /\.(png|jpg|jpeg|webp|avif|svg|ico|gif)$/,
    value:   "public, max-age=2592000, stale-while-revalidate=86400",
  },
  // Sitemap – gyakran frissül
  {
    pattern: /\/sitemap(-.+)?\.xml$/,
    value:   "public, max-age=600, s-maxage=3600, stale-while-revalidate=86400",
  },
  // RSS (ha lesz)
  {
    pattern: /\/rss\.xml$/,
    value:   "public, max-age=1800, s-maxage=7200",
  },
  // robots.txt
  {
    pattern: /\/robots\.txt$/,
    value:   "public, max-age=86400",
  },
  // Webmanifest
  {
    pattern: /\/site\.webmanifest$/,
    value:   "public, max-age=86400",
  },
];

// ─── Security headers (minden response) ──────────────────────
const SECURITY_HEADERS: Record<string, string> = {
  "X-Content-Type-Options":   "nosniff",
  "X-Frame-Options":          "SAMEORIGIN",
  "Referrer-Policy":          "strict-origin-when-cross-origin",
  "X-DNS-Prefetch-Control":   "on",
  "Permissions-Policy":       "camera=(), microphone=(), geolocation=(), payment=()",
  // CSP – megengedő, de blokkolja az inline JS-t kivéve Astro saját script-jeit
  // Megjegyzés: Google Analytics/GTM és Google Fonts miatt külső domének engedélyezve
  "Content-Security-Policy": [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: blob: https: https://www.googletagmanager.com",
    "connect-src 'self' https://*.google-analytics.com https://www.googletagmanager.com https://analytics.google.com https://*.analytics.google.com",
    "worker-src 'self' blob:",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join("; "),
};

export const onRequest = defineMiddleware(async (ctx, next) => {
  const response = await next();
  const { pathname } = ctx.url;

  // ─── Security headers hozzáadása ────────────────────────────
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    if (!response.headers.has(key)) {
      response.headers.set(key, value);
    }
  }

  // ─── Cache-Control per asset type ───────────────────────────
  if (!response.headers.has("Cache-Control")) {
    const rule = CACHE_RULES.find((r) => r.pattern.test(pathname));
    if (rule) {
      response.headers.set("Cache-Control", rule.value);
    }
    // HTML oldalak: rövid cache + SWR (CDN frissít, böngésző ellenőriz)
    else if (response.headers.get("Content-Type")?.includes("text/html")) {
      response.headers.set(
        "Cache-Control",
        "public, max-age=0, s-maxage=300, stale-while-revalidate=600"
      );
    }
  }

  return response;
});
