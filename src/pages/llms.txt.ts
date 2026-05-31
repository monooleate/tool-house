// src/pages/llms.txt.ts
// Dinamikus llms.txt — lang-aware (HU vs RO), tool-registry-ből generálva.
// Standard: https://llmstxt.org/
import type { APIRoute } from "astro";
import {
  getVisibleActiveTools,
  getVisibleCategories,
  getLocalizedTool,
  getLocalizedCategory,
  getToolsByCategory,
  type CategoryId,
} from "../lib/tool-registry.ts";
import { CURRENT_LANG, CURRENT_CONFIG } from "../i18n/index.ts";
import { toolUrl, categoryUrl, staticUrl } from "../lib/url-utils.ts";

const SITE_TITLES: Record<"hu" | "ro", { title: string; tagline: string; intro: string }> = {
  hu: {
    title: "Konvertalo.hu",
    tagline: "Free online file conversion and processing tools",
    intro:
      "Browser-only conversion and file processing tools. All processing happens in your browser — no server uploads, no registration. Privacy-first, GDPR compliant.",
  },
  ro: {
    title: "InstrumenteOnline.ro",
    tagline: "Free online tools, calculators and converters in Romanian",
    intro:
      "Browser-only tools, calculators, converters and generators in Romanian. Math (algebra, geometry), unit conversions, finance (TVA, credit, dobândă compusă, salariu net), health (IMC, calorii, greutate ideală), time (countdowns, working days with RO public holidays), QR + barcode generators. All processing client-side — no server, no tracking, GDPR compliant.",
  },
};

const CATEGORY_DESC_OVERRIDE_RO: Partial<Record<CategoryId, string>> = {
  calculator: "Romanian math calculators (percentages, quadratic equations, exponential equations, averages, rule of three, fuel consumption)",
  geometrie:  "Romanian geometry calculators (right triangle, trig functions, radians/degrees, circle, rectangle)",
  conversii:  "Romanian unit converters (length, mass, volume, area, temperature, density)",
  finante:    "Romanian finance calculators (Romanian VAT 19%, credit/loan with APR, compound interest, discount, margin, hourly wage)",
  sanatate:   "Romanian health calculators (BMI WHO, ideal weight 4 formulas, daily calories Mifflin-St Jeor + macros)",
  timp:       "Romanian time tools (date difference with RO working days, countdowns: Christmas/New Year/Orthodox Easter/Bacalaureat/birthday/age live clock, custom countdown generator)",
  fejleszto:  "Developer tools (JSON/YAML/XML/CSS/JS format+minify, Base64/URL/HTML entity encode-decode, EAN-13/CODE-128/UPC-A/ITF-14 barcode generator with GS1 check digit, QR code generator with center icon and module styles)",
};

function escapeMd(s: string): string {
  return s.replace(/\(/g, "\\(").replace(/\)/g, "\\)").replace(/\[/g, "\\[").replace(/\]/g, "\\]");
}

export const GET: APIRoute = ({ site }) => {
  const lang = (CURRENT_LANG === "ro" ? "ro" : "hu") as "hu" | "ro";
  const base = (site?.toString() ?? CURRENT_CONFIG.siteUrl).replace(/\/$/, "");
  const meta = SITE_TITLES[lang];

  // Csak az aktuális nyelv (deploy) aktív tooljai — nincs HU↔RO szivárgás az llms.txt-ben.
  const localizedActive = getVisibleActiveTools(lang).map(t => getLocalizedTool(t, lang));
  const visibleCategories = getVisibleCategories(lang);

  // Counts per category (visible only)
  const sectionsBody: string[] = [];
  for (const rawCat of visibleCategories) {
    const cat = getLocalizedCategory(rawCat, lang);
    const catTools = getToolsByCategory(rawCat.id, lang)
      .filter(t => t.status === "active")
      .map(t => getLocalizedTool(t, lang));
    if (catTools.length === 0) continue;

    const sectionTitle = `## ${cat.label} (${catTools.length})`;
    const desc = (lang === "ro" ? CATEGORY_DESC_OVERRIDE_RO[rawCat.id] : undefined) ?? cat.description ?? "";
    sectionsBody.push(sectionTitle);
    if (desc) sectionsBody.push(`> ${desc.replace(/\n/g, " ")}`);
    for (const tool of catTools) {
      const url = `${base}${toolUrl(tool, lang)}`;
      const title = escapeMd(tool.h1);
      const summary = (tool.description || "").replace(/\n/g, " ").replace(/\s+/g, " ").trim();
      sectionsBody.push(`- [${title}](${url}): ${summary}`);
    }
    sectionsBody.push(""); // blank between sections
  }

  // About / static pages (staticUrl already returns "/path/" with leading + trailing slashes)
  const aboutLines: string[] = [];
  aboutLines.push("## About");
  aboutLines.push(`- [About](${base}${staticUrl("rolunk", lang)}): platform info and founder`);
  aboutLines.push(`- [Contact](${base}${staticUrl("kapcsolat", lang)}): support contact`);
  aboutLines.push(`- [Privacy](${base}${staticUrl("adatvedelmi", lang)}): GDPR privacy policy`);
  aboutLines.push(`- [Terms](${base}${staticUrl("aszf", lang)}): terms of use`);

  // Notes section — useful guidance to AI consumers
  const notesLines: string[] = [];
  notesLines.push("## Notes for AI assistants");
  notesLines.push(`- Total active tools: ${localizedActive.length}`);
  notesLines.push(`- Total categories: ${visibleCategories.length}`);
  notesLines.push(`- All tools run client-side in the browser (no server upload, no API).`);
  notesLines.push(`- Each tool page contains structured data (Schema.org JSON-LD): SoftwareApplication, FAQPage, BreadcrumbList, and Article (for math/calculator tools).`);
  if (lang === "ro") {
    notesLines.push(`- Math/calculator pages include detailed long-form articles in Romanian with KaTeX-rendered formulas, applicable Romanian legislation references (Codul Muncii art. 139 for working days, BNR for credit, etc.), worked examples, and FAQ.`);
    notesLines.push(`- Romanian holiday calculations use the Meeus algorithm for Orthodox Easter (Julian calendar + 13 days for Gregorian).`);
    notesLines.push(`- QR code generator supports module styles (square/dots/rounded) with finder patterns always solid for scan reliability, ECC level H recommended with center icon.`);
    notesLines.push(`- Barcode generator validates GTIN check digit (modulo-10 weighted sum) for EAN-13, UPC-A, ITF-14.`);
  }
  notesLines.push(`- Sitemap: ${base}/sitemap.xml`);
  notesLines.push(`- Robots: ${base}/robots.txt (AI crawlers GPTBot, ClaudeBot, PerplexityBot, Google-Extended explicitly allowed)`);

  const lines: string[] = [];
  lines.push(`# ${meta.title}`);
  lines.push("");
  lines.push(`> ${meta.tagline}`);
  lines.push("");
  lines.push(meta.intro);
  lines.push("");
  lines.push(...sectionsBody);
  lines.push(...aboutLines);
  lines.push("");
  lines.push(...notesLines);
  lines.push("");

  const body = lines.join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
};
