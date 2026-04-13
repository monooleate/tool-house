// src/pages/sitemap.xml.ts
// Dinamikus sitemap – kategória-alapú prioritás és changefreq
// SSG-ben build-time generálódik. SSR-hez: export const prerender = false;
import type { APIRoute } from "astro";
import {
  getAllTools,
  CATEGORIES,
  getVisibleTools,
  getVisibleCategories,
  type CategoryId,
  type Tool,
} from "../lib/tool-registry.ts";
import { CURRENT_LANG } from "../i18n/index.ts";
import { toolUrl, categoryUrl } from "../lib/url-utils.ts";
import { getStaticUrl } from "../lib/url-map.ts";

const PRIORITY: Record<CategoryId | "home" | "category", string> = {
  home:       "1.0",
  category:   "0.8",
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
};

const CHANGEFREQ: Record<CategoryId | "home" | "category", string> = {
  home:       "daily",
  category:   "weekly",
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

export const GET: APIRoute = ({ site }) => {
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
