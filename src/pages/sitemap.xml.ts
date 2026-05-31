// src/pages/sitemap.xml.ts
// Dinamikus sitemap – kategória-alapú prioritás és changefreq
// SSG-ben build-time generálódik. SSR-hez: export const prerender = false;
import type { APIRoute } from "astro";
import {
  CATEGORIES,
  getVisibleTools,
  getVisibleCategories,
  type CategoryId,
  type Tool,
} from "../lib/tool-registry.ts";
import { CURRENT_LANG } from "../i18n/index.ts";
import { toolUrl, categoryUrl, subcatUrl, instantAnswerUrl } from "../lib/url-utils.ts";
import { getStaticUrl } from "../lib/url-map.ts";
import { CONVERSII_HUBS } from "../lib/content/ro/conversii-hubs.ts";
import { getCollection } from "astro:content";

const PRIORITY: Record<CategoryId | "home" | "category" | "subhub" | "instant", string> = {
  home:       "1.0",
  category:   "0.8",
  subhub:     "0.85",
  instant:    "0.7",
  kep:        "0.9",
  adat:       "0.9",
  szoveg:     "0.85",
  fejleszto:  "0.85",
  seo:        "0.85",
  pdf:        "0.8",
  excel:      "0.8",
  fajl:       "0.75",
  markdown:   "0.75",
  html:       "0.75",
  // RO-only math kategóriák
  calculator: "0.9",
  geometrie:  "0.85",
  conversii:  "0.9",
  finante:    "0.85",
  sanatate:   "0.8",
  timp:       "0.75",
};

const CHANGEFREQ: Record<CategoryId | "home" | "category" | "subhub" | "instant", string> = {
  home:       "daily",
  category:   "weekly",
  subhub:     "weekly",
  instant:    "monthly",
  kep:        "monthly",
  adat:       "monthly",
  szoveg:     "monthly",
  fejleszto:  "monthly",
  seo:        "weekly",
  pdf:        "monthly",
  excel:      "monthly",
  fajl:       "monthly",
  markdown:   "monthly",
  html:       "monthly",
  // RO-only math kategóriák
  calculator: "monthly",
  geometrie:  "monthly",
  conversii:  "monthly",
  finante:    "monthly",
  sanatate:   "monthly",
  timp:       "weekly",
};

function ensureTrailingSlash(path: string): string {
  return path.endsWith("/") ? path : path + "/";
}

function urlEntry(
  base: string,
  path: string,
  priority: string,
  changefreq: string,
  lastmod?: string
): string {
  const today = new Date().toISOString().split("T")[0];
  const loc = path === "/" ? `${base}/` : `${base}${ensureTrailingSlash(path)}`;
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod ?? today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

export const GET: APIRoute = async ({ site }) => {
  const base  = (site?.toString() ?? "https://konvertalo.hu").replace(/\/$/, "");
  // Only include active tools in sitemap – coming-soon pages have no content
  const tools = getVisibleTools(CURRENT_LANG).filter(t => t.status === "active");
  const visibleCategories = getVisibleCategories(CURRENT_LANG);
  const today = new Date().toISOString().split("T")[0];
  const urls: string[] = [];

  // Főoldal
  urls.push(urlEntry(base, "/", "1.0", "daily", today));

  // Kategória oldalak
  for (const cat of visibleCategories) {
    urls.push(urlEntry(base, categoryUrl(cat.id), PRIORITY.category, CHANGEFREQ.category));
  }

  // Tool oldalak
  for (const tool of tools) {
    const isActive  = tool.status === "active";
    const priority  = isActive ? PRIORITY[tool.category] : "0.5";
    const chfreq    = isActive ? CHANGEFREQ[tool.category] : "monthly";
    // lastmod: tool.updatedAt ha meg van adva, egyébként mai dátum
    const lastmod   = tool.updatedAt ?? undefined;
    urls.push(urlEntry(base, toolUrl(tool), priority, chfreq, lastmod));
  }

  // ─── RO-only: Conversii sub-hub-ok ────────────────────────
  if (CURRENT_LANG === "ro") {
    for (const hub of CONVERSII_HUBS) {
      urls.push(urlEntry(base, subcatUrl(hub.slug), PRIORITY.subhub, CHANGEFREQ.subhub, hub.updatedAt));
    }

    // ─── RO-only: Instant-answer oldalak (programmatic SEO) ──
    const all = await getCollection("math");
    const instantEntries = all.filter(
      e => e.data.category === "conversii" &&
           e.data.subcategory &&
           e.data.instantSlug
    );
    for (const entry of instantEntries) {
      const subcat = entry.data.subcategory as string;
      const slug = entry.data.instantSlug as string;
      const lastmod = entry.data.refreshed_at ?? entry.data.published_at;
      urls.push(urlEntry(base, instantAnswerUrl(subcat, slug), PRIORITY.instant, CHANGEFREQ.instant, lastmod));
    }
  }

  // Statikus oldalak
  urls.push(urlEntry(base, `/${getStaticUrl("rolunk")}`, "0.4", "monthly"));
  urls.push(urlEntry(base, `/${getStaticUrl("kapcsolat")}`, "0.4", "monthly"));
  urls.push(urlEntry(base, `/${getStaticUrl("adatvedelmi")}`, "0.3", "yearly"));
  urls.push(urlEntry(base, `/${getStaticUrl("aszf")}`, "0.3", "yearly"));
  urls.push(urlEntry(base, `/${getStaticUrl("kereses")}`, "0.5", "weekly"));

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
      "Content-Type":  "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
};
