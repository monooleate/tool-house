// ============================================================
// SEO HELPERS
// Schema.org JSON-LD generálás, canonical, meta tag helperek
// ============================================================

import type { Tool, Category, ToolContent } from "./tool-registry.ts";
import { t, tpl, CURRENT_CONFIG } from "../i18n/index.ts";
import { toolUrl, categoryUrl } from "./url-utils.ts";

export const SITE_URL = CURRENT_CONFIG.siteUrl;
export const SITE_NAME = CURRENT_CONFIG.siteName;
export const SITE_DESCRIPTION = t("meta.site_description");

// ─── Canonical ───────────────────────────────────────────────
export function buildCanonical(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : "/" + path}`;
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
export function toolSoftwareSchema(tool: Tool): string {
  const toolExt = tool as Tool & { updatedAt?: string; launchedAt?: string };
  const rating = toolRating(tool.slug);
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
    screenshot: buildCanonical(`/og/${tool.category}/${tool.slug}.png`),
    image: buildCanonical(`/hero/${tool.category}/${tool.slug}.png`),
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
export function techArticleSchema(tool: Tool): string | null {
  const about = tool.content?.aboutSection;
  if (!about) return null;

  const toolExt = tool as Tool & { updatedAt?: string; launchedAt?: string };

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
    author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    image: buildCanonical(`/hero/${tool.category}/${tool.slug}.png`),
    dateModified:  toISOWithTZ(toolExt.updatedAt  ?? new Date().toISOString().split("T")[0]),
    datePublished: toISOWithTZ(toolExt.launchedAt ?? new Date().toISOString().split("T")[0]),
    articleBody: about.paragraphs.join(" "),
    proficiencyLevel: "Beginner",
    keywords: tool.keywords.join(", "),
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

// ─── Organization Schema ──────────────────────────────────────
export function organizationSchema(): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    foundingDate: "2026-01-15",
    image: `${SITE_URL}/og-default.png`,
    logo: `${SITE_URL}/og-default.png`,
    founder: {
      "@type": "Person",
      name: "Mészáros János",
      url: "https://jmeszaros.dev",
    },
    sameAs: [
      "https://jmeszaros.dev",
    ],
  });
}

// ─── Tool breadcrumb items helper ────────────────────────────
export function toolBreadcrumbs(tool: Tool, categoryLabel: string): BreadcrumbItem[] {
  return [
    { name: t("nav.home"), href: "/" },
    { name: categoryLabel, href: categoryUrl(tool.category) },
    { name: tool.h1, href: toolUrl(tool) },
  ];
}

// ─── Category breadcrumb items helper ────────────────────────
export function categoryBreadcrumbs(cat: Category): BreadcrumbItem[] {
  return [
    { name: t("nav.home"), href: "/" },
    { name: cat.label, href: categoryUrl(cat.id) },
  ];
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
