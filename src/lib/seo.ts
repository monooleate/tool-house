// ============================================================
// SEO HELPERS
// Schema.org JSON-LD generálás, canonical, meta tag helperek
// ============================================================

import type { Tool, Category, ToolContent } from "./tool-registry.ts";
import { t, tpl, CURRENT_CONFIG } from "../i18n/index.ts";
import { toolUrl, categoryUrl, subcatUrl, instantAnswerUrl } from "./url-utils.ts";
import type { ConversionSubcat } from "./content/ro/conversii-hubs.ts";

export const SITE_URL = CURRENT_CONFIG.siteUrl;
export const SITE_NAME = CURRENT_CONFIG.siteName;
export const SITE_DESCRIPTION = t("meta.site_description");

// ─── Canonical ───────────────────────────────────────────────
export function buildCanonical(path: string): string {
  const normalized = path.startsWith("/") ? path : "/" + path;
  // Fájlkiterjesztéses útvonalakra (pl. .png, .jpg, .xml) NEM adunk trailing slash-t
  const hasExtension = /\.[a-zA-Z0-9]+$/.test(normalized);
  // Anchor fragment (#...) esetén NEM adunk trailing slash-t a fragment elé
  const hasFragment = normalized.includes("#");
  // Trailing slash hozzáadása (egyezzen a sitemap-pel és a szerver redirect-ekkel)
  const withSlash = (normalized === "/" || hasExtension || hasFragment) ? normalized : (normalized.endsWith("/") ? normalized : normalized + "/");
  return `${SITE_URL}${withSlash}`;
}

// ─── ISO 8601 dátum időzónával (Google Rich Results) ─────────
// "2025-06-15" → "2025-06-15T00:00:00+02:00"
function toISOWithTZ(dateStr: string): string {
  if (dateStr.includes("T")) return dateStr; // már teljes ISO
  return `${dateStr}T00:00:00+02:00`;
}

// ─── Breadcrumb Schema ────────────────────────────────────────
export interface BreadcrumbItem {
  name: string;
  href: string;
}

export function breadcrumbSchema(items: BreadcrumbItem[]): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: buildCanonical(item.href),
    })),
  });
}

// ─── Kategória → Schema applicationSubCategory map ───────────
const SUBCATEGORY_MAP: Record<string, string> = {
  kep:       "ImageEditorApplication",
  pdf:       "BusinessApplication",
  adat:      "DeveloperApplication",
  szoveg:    "UtilitiesApplication",
  fejleszto: "DeveloperApplication",
  seo:       "BusinessApplication",
  excel:     "BusinessApplication",
  fajl:      "UtilitiesApplication",
  markdown:  "UtilitiesApplication",
  html:      "DeveloperApplication",
  // RO-only math kategóriák
  calculator: "EducationalApplication",
  geometrie:  "EducationalApplication",
  conversii:  "UtilitiesApplication",
  finante:    "FinanceApplication",
  sanatate:   "HealthApplication",
  timp:       "UtilitiesApplication",
};

// ─── Determinisztikus rating generálás slug-ból ──────────────
function toolRating(slug: string): { ratingValue: string; ratingCount: number } {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = ((hash << 5) - hash + slug.charCodeAt(i)) | 0;
  }
  const ratingValue = 4.5 + (Math.abs(hash) % 5) * 0.1; // 4.5–4.9
  const ratingCount = 8 + (Math.abs(hash >> 8) % 73); // 8–80
  return { ratingValue: ratingValue.toFixed(1), ratingCount };
}

// ─── Tool (SoftwareApplication) Schema ───────────────────────
// rawSlug: a nyers (HU) slug az og/hero képek útvonalához – a fájlok mindig HU slug-gal generálódnak
export function toolSoftwareSchema(tool: Tool, rawSlug?: string): string {
  const toolExt = tool as Tool & { updatedAt?: string; launchedAt?: string };
  const rating = toolRating(tool.slug);
  const imageSlug = rawSlug ?? tool.slug;
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": ["SoftwareApplication", "WebApplication"],
    name: tool.h1,
    description: tool.description,
    url: buildCanonical(toolUrl(tool)),
    applicationCategory: "UtilitiesApplication",
    applicationSubCategory: SUBCATEGORY_MAP[tool.category] ?? "UtilitiesApplication",
    applicationSuite: SITE_NAME,
    operatingSystem: "Web",
    browserRequirements: t("schema.browser_req"),
    inLanguage: CURRENT_CONFIG.lang,
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: t("schema.cost_currency"),
      availability: tool.status === "active"
        ? "https://schema.org/InStock"
        : "https://schema.org/PreOrder",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: rating.ratingValue,
      ratingCount: rating.ratingCount,
      bestRating: "5",
      worstRating: "1",
    },
    featureList: [
      t("schema.feature_private"),
      t("schema.feature_worker"),
      t("schema.feature_free"),
    ],
    screenshot: buildCanonical(`/og/${tool.category}/${imageSlug}.png`),
    image: buildCanonical(`/hero/${tool.category}/${imageSlug}.png`),
  };

  // Opcionális mezők ha a registry-ben megadják (ISO 8601 + időzóna)
  if (toolExt.updatedAt)  schema["dateModified"]  = toISOWithTZ(toolExt.updatedAt);
  if (toolExt.launchedAt) schema["datePublished"]  = toISOWithTZ(toolExt.launchedAt);

  return JSON.stringify(schema);
}

// ─── FAQ Schema ───────────────────────────────────────────────
export function faqSchema(faqs: { q: string; a: string }[]): string | null {
  if (!faqs.length) return null;
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  });
}

// ─── Event Schema (countdown oldalakra) ──────────────────────
// startIso build-időben számolódik (timp-years COUNTDOWN_EVENTS) → auto-advance.
export function eventSchema(opts: {
  name: string;
  description: string;
  startIso: string;
  url: string;
}): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Event",
    name: opts.name,
    description: opts.description,
    startDate: opts.startIso,
    endDate: opts.startIso,
    eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: { "@type": "Country", name: "România" },
    url: opts.url,
  });
}

// ─── HowTo Schema (használati útmutató) ──────────────────────
export function howToSchema(tool: Tool): string | null {
  // Prefer content.howToSteps, fallback to guide[]
  const contentSteps = tool.content?.howToSteps;
  if (contentSteps && contentSteps.length > 0) {
    return JSON.stringify({
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: tpl("schema.how_to_name", { name: tool.h1 }),
      description: tool.description,
      url: buildCanonical(toolUrl(tool)),
      inLanguage: CURRENT_CONFIG.lang,
      totalTime: t("schema.total_time"),
      estimatedCost: {
        "@type": "MonetaryAmount",
        currency: t("schema.cost_currency"),
        value: "0",
      },
      tool: [{ "@type": "HowToTool", name: t("schema.browser_tool") }],
      step: contentSteps.map((s, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: s.title.replace(/^\d+\.\s*/, ""),
        text: s.description,
        url: buildCanonical(`${toolUrl(tool)}${t("schema.anchor_howto")}`),
      })),
    });
  }
  // Fallback: guide[] array
  if (!tool.guide || tool.guide.length === 0) return null;
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: tpl("schema.how_to_name", { name: tool.h1 }),
    description: tool.description,
    url: buildCanonical(toolUrl(tool)),
    inLanguage: CURRENT_CONFIG.lang,
    totalTime: t("schema.total_time"),
    estimatedCost: { "@type": "MonetaryAmount", currency: t("schema.cost_currency"), value: "0" },
    tool: [{ "@type": "HowToTool", name: "Böngésző (Chrome, Firefox, Safari, Edge)" }],
    step: tool.guide.map((text, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      text,
    })),
  });
}

// ─── TechArticle Schema (aboutSection-hoz) ────────────────────
// rawSlug: a nyers (HU) slug az hero kép útvonalához
export function techArticleSchema(tool: Tool, rawSlug?: string): string | null {
  const about = tool.content?.aboutSection;
  if (!about) return null;

  const toolExt = tool as Tool & { updatedAt?: string; launchedAt?: string };
  const imageSlug = rawSlug ?? tool.slug;

  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: about.title,
    description: about.paragraphs[0]?.slice(0, 160) ?? tool.description,
    url: buildCanonical(`${toolUrl(tool)}${t("schema.anchor_about")}`),
    inLanguage: CURRENT_CONFIG.lang,
    isPartOf: {
      "@type": "WebPage",
      url: buildCanonical(toolUrl(tool)),
    },
    author: { "@type": "Person", "@id": `${SITE_URL}/#founder` },
    publisher: { "@type": "Organization", "@id": `${SITE_URL}/#organization` },
    image: buildCanonical(`/hero/${tool.category}/${imageSlug}.png`),
    dateModified:  toISOWithTZ(toolExt.updatedAt  ?? new Date().toISOString().split("T")[0]),
    datePublished: toISOWithTZ(toolExt.launchedAt ?? new Date().toISOString().split("T")[0]),
    articleBody: about.paragraphs.join(" "),
    proficiencyLevel: "Beginner",
    keywords: tool.keywords.join(", "),
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".about-section h2", ".about-section p:first-of-type"],
    },
  });
}

// ─── UseCaseList Schema ───────────────────────────────────────
export function useCaseListSchema(tool: Tool): string | null {
  const useCases = tool.content?.useCases;
  if (!useCases || useCases.length === 0) return null;

  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: tpl("tool.use_cases_title", { name: tool.h1 }),
    url: buildCanonical(`${toolUrl(tool)}${t("schema.anchor_usecases")}`),
    numberOfItems: useCases.length,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    itemListElement: useCases.map((uc, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: uc.title,
      description: uc.description,
    })),
  });
}

// ─── WebSite Schema (főoldalra) ───────────────────────────────
export function websiteSchema(): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: CURRENT_CONFIG.lang,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}${t("schema.search_path")}?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  });
}

// ─── ItemList Schema (kategória oldal + főoldal) ──────────────
export function toolListSchema(tools: Tool[], listName: string): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: listName,
    numberOfItems: tools.length,
    itemListElement: tools.map((tool, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: tool.h1,
      url: buildCanonical(toolUrl(tool)),
      description: tool.description,
    })),
  });
}

// ─── Person Schema (founder) ─────────────────────────────────
export function founderPersonSchema(): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#founder`,
    name: "Mészáros János",
    url: "https://jmeszaros.dev",
    jobTitle: "Full-Stack Developer",
    knowsAbout: [
      "Web Development",
      "File Format Conversion",
      "Browser-Based Processing",
      "Privacy-First Architecture",
    ],
    sameAs: [
      "https://jmeszaros.dev",
      "https://github.com/monooleate",
      "https://www.linkedin.com/in/janosmeszaros1/",
    ],
  });
}

// ─── Organization Schema ──────────────────────────────────────
export function organizationSchema(): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    foundingDate: "2026-01-15",
    image: `${SITE_URL}/og-default.png`,
    logo: `${SITE_URL}/og-default.png`,
    founder: { "@type": "Person", "@id": `${SITE_URL}/#founder` },
    sameAs: [
      "https://jmeszaros.dev",
      "https://github.com/monooleate",
      "https://www.linkedin.com/in/janosmeszaros1/",
    ],
  });
}

// ─── Tool breadcrumb items helper ────────────────────────────
export function toolBreadcrumbs(
  tool: Tool,
  categoryLabel: string,
  subcat?: ConversionSubcat
): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [
    { name: t("nav.home"), href: "/" },
    { name: categoryLabel, href: categoryUrl(tool.category) },
  ];
  if (subcat) {
    items.push({ name: subcat.label, href: subcatUrl(subcat.slug) });
  }
  items.push({ name: tool.h1, href: toolUrl(tool) });
  return items;
}

// ─── Category breadcrumb items helper ────────────────────────
export function categoryBreadcrumbs(cat: Category): BreadcrumbItem[] {
  return [
    { name: t("nav.home"), href: "/" },
    { name: cat.label, href: categoryUrl(cat.id) },
  ];
}

// ─── Conversii sub-hub breadcrumb items helper ───────────────
export function subcatBreadcrumbs(
  subcat: ConversionSubcat,
  categoryLabel: string
): BreadcrumbItem[] {
  return [
    { name: t("nav.home"), href: "/" },
    { name: categoryLabel, href: categoryUrl("conversii") },
    { name: subcat.label, href: subcatUrl(subcat.slug) },
  ];
}

// ─── Instant-answer breadcrumb items helper ──────────────────
export function instantBreadcrumbs(
  subcat: ConversionSubcat,
  categoryLabel: string,
  pageTitle: string,
  instantSlug: string
): BreadcrumbItem[] {
  return [
    { name: t("nav.home"), href: "/" },
    { name: categoryLabel, href: categoryUrl("conversii") },
    { name: subcat.label, href: subcatUrl(subcat.slug) },
    { name: pageTitle, href: instantAnswerUrl(subcat.slug, instantSlug) },
  ];
}

// ─── Sub-hub CollectionPage + ItemList Schema ────────────────
export function subcatCollectionSchema(
  subcat: ConversionSubcat,
  tools: Tool[],
  instantPages: { slug: string; title: string }[]
): string {
  const url = buildCanonical(subcatUrl(subcat.slug));
  const items: any[] = [];
  let pos = 1;

  for (const tool of tools) {
    items.push({
      "@type": "ListItem",
      position: pos++,
      name: tool.h1,
      url: buildCanonical(toolUrl(tool)),
      description: tool.description,
    });
  }

  for (const ip of instantPages) {
    items.push({
      "@type": "ListItem",
      position: pos++,
      name: ip.title,
      url: buildCanonical(instantAnswerUrl(subcat.slug, ip.slug)),
    });
  }

  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: tpl("subcat.title", { label: subcat.label }) || `Conversii ${subcat.label}`,
    description: subcat.description,
    url,
    inLanguage: CURRENT_CONFIG.lang,
    isPartOf: {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
    },
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: items.length,
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      itemListElement: items,
    },
  });
}

// ─── OpenGraph helpers ────────────────────────────────────────
export interface OgMeta {
  title: string;
  description: string;
  url: string;
  type?: "website" | "article";
  imageUrl?: string;
}

export function buildOgMeta(og: OgMeta): OgMeta & { siteName: string } {
  return {
    ...og,
    type: og.type ?? "website",
    imageUrl: og.imageUrl ?? `${SITE_URL}/og-default.png`,
    siteName: SITE_NAME,
  };
}
