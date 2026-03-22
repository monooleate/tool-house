import { e as getVisibleTools, b as getVisibleCategories } from '../chunks/tool-registry_BYgjEAb5.mjs';
import { C as CURRENT_LANG } from '../chunks/index_ChOr8V1l.mjs';
import { c as categoryUrl, t as toolUrl, g as getStaticUrl } from '../chunks/url-utils_j3NlhMwn.mjs';
export { r as renderers } from '../chunks/_@astro-renderers_BTphoX3x.mjs';

const PRIORITY = {
  home: "1.0",
  category: "0.8",
  kep: "0.9",
  adat: "0.9",
  szoveg: "0.85",
  fejleszto: "0.85",
  seo: "0.85",
  pdf: "0.8",
  excel: "0.8",
  fajl: "0.75",
  markdown: "0.75",
  html: "0.75"
};
const CHANGEFREQ = {
  home: "daily",
  category: "weekly",
  kep: "monthly",
  adat: "monthly",
  szoveg: "monthly",
  fejleszto: "monthly",
  seo: "weekly",
  pdf: "monthly",
  excel: "monthly",
  fajl: "monthly",
  markdown: "monthly",
  html: "monthly"
};
function ensureTrailingSlash(path) {
  return path.endsWith("/") ? path : path + "/";
}
function urlEntry(base, path, priority, changefreq, lastmod) {
  const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  const loc = path === "/" ? `${base}/` : `${base}${ensureTrailingSlash(path)}`;
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod ?? today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}
const GET = ({ site }) => {
  const base = (site?.toString() ?? "https://konvertalo.hu").replace(/\/$/, "");
  const tools = getVisibleTools(CURRENT_LANG);
  const visibleCategories = getVisibleCategories(CURRENT_LANG);
  const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  const urls = [];
  urls.push(urlEntry(base, "/", "1.0", "daily", today));
  for (const cat of visibleCategories) {
    urls.push(urlEntry(base, categoryUrl(cat.id), PRIORITY.category, CHANGEFREQ.category));
  }
  for (const tool of tools) {
    const isActive = tool.status === "active";
    const priority = isActive ? PRIORITY[tool.category] : "0.5";
    const chfreq = isActive ? CHANGEFREQ[tool.category] : "monthly";
    const lastmod = tool.updatedAt ?? void 0;
    urls.push(urlEntry(base, toolUrl(tool), priority, chfreq, lastmod));
  }
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
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=600, s-maxage=3600, stale-while-revalidate=86400"
    }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
