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

// ─── Breadcrumb item típus ───────────────────────────────────
export interface BreadcrumbItem {
  name: string;
  href: string;
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

// ============================================================
// UNIFIED @graph SSOT  (Fázis 3 – schema-graph refaktor)
// Minden oldal EGYETLEN self-contained @graph-ot kap, stabil
// @id-kkal. A node-builderek OBJEKTUMOT adnak vissza (nem
// stringet); a buildPageGraph fűzi össze, a serializeGraph
// stringesíti. A korábbi *Schema(): string exportok a cutover
// végéig megmaradnak (legacy fallback a BaseLayout-ban).
// ============================================================

// ─── Kanonikus @id-k ─────────────────────────────────────────
export const PERSON_ID  = "https://jmeszaros.dev/#person";   // hálózati, fix (nem per-site)
export const ORG_ID     = `${SITE_URL}/#organization`;        // per-site
export const WEBSITE_ID = `${SITE_URL}/#website`;             // per-site

// ─── Hálózati testvér-registry (közös founder, külön brandek) ─
interface NetworkBrand { url: string; name: string; lang: "hu" | "ro"; }
export const NETWORK: NetworkBrand[] = [
  { url: "https://matekmegoldasok.hu",   name: "MatekMegoldások",  lang: "hu" },
  { url: "https://instrumenteonline.ro", name: "InstrumenteOnline", lang: "ro" },
  { url: "https://konvertalo.hu",        name: "Konvertalo.hu",    lang: "hu" },
];

type Node = Record<string, any>;

// ─── Person (founder) – site-invariáns, @id=PERSON_ID ────────
export function personNode(): Node {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
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
  };
}

// ─── Organization – @id=ORG_ID, founder→PERSON_ID ────────────
export function orgNode(full = false): Node {
  const node: Node = {
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    foundingDate: "2026-01-15",
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/og-default.png`,
      width: 1200,
      height: 630,
    },
    image: `${SITE_URL}/og-default.png`,
    founder: { "@id": PERSON_ID },
    sameAs: [
      "https://jmeszaros.dev",
      "https://github.com/monooleate",
      "https://www.linkedin.com/in/janosmeszaros1/",
    ],
  };
  if (full) {
    node.contactPoint = {
      "@type": "ContactPoint",
      contactType: "customer support",
      url: `${SITE_URL}/kapcsolat/`,
      availableLanguage: [CURRENT_CONFIG.lang],
    };
  }
  return node;
}

// ─── WebSite – @id=WEBSITE_ID, SearchAction megőrizve ────────
export function websiteNode(): Node {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: CURRENT_CONFIG.lang,
    publisher: { "@id": ORG_ID },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}${t("schema.search_path")}?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

// ─── Testvér-brand node-ok (csak főoldal/about) ──────────────
// A TÖBBI brand Organization+WebSite node-ja, mind founder→PERSON_ID.
// NEM sameAs (külön brandek), NEM hreflang.
export function siblingSiteNodes(): Node[] {
  const nodes: Node[] = [];
  for (const b of NETWORK) {
    if (b.url === SITE_URL) continue; // saját magunkat kihagyjuk
    nodes.push({
      "@type": "Organization",
      "@id": `${b.url}/#organization`,
      name: b.name,
      url: b.url,
      founder: { "@id": PERSON_ID },
    });
    nodes.push({
      "@type": "WebSite",
      "@id": `${b.url}/#website`,
      name: b.name,
      url: b.url,
      inLanguage: b.lang,
      publisher: { "@id": `${b.url}/#organization` },
    });
  }
  return nodes;
}

// ─── Breadcrumb node (@id=#breadcrumb) ───────────────────────
export function breadcrumbNode(pageUrl: string, items: BreadcrumbItem[]): Node {
  return {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: buildCanonical(item.href),
    })),
  };
}

// ─── FAQ node (@id=#faq) ─────────────────────────────────────
export function faqNode(pageUrl: string, faqs: { q: string; a: string }[]): Node | null {
  if (!faqs.length) return null;
  return {
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
}

// ─── Calculator (SoftwareApplication) node (@id=#calculator) ─
// A toolSoftwareSchema mező-örökségét viszi tovább objektumként,
// + isPartOf(#webpage) + publisher(ORG_ID). aggregateRating MARAD
// (tulajdonosi döntés 2026-06-02).
export function calculatorNode(tool: Tool, pageUrl: string, rawSlug?: string): Node {
  const toolExt = tool as Tool & { updatedAt?: string; launchedAt?: string };
  const rating = toolRating(tool.slug);
  const imageSlug = rawSlug ?? tool.slug;
  const node: Node = {
    "@type": ["SoftwareApplication", "WebApplication"],
    "@id": `${pageUrl}#calculator`,
    name: tool.h1,
    description: tool.description,
    url: pageUrl,
    applicationCategory: "UtilitiesApplication",
    applicationSubCategory: SUBCATEGORY_MAP[tool.category] ?? "UtilitiesApplication",
    applicationSuite: SITE_NAME,
    operatingSystem: "Web",
    browserRequirements: t("schema.browser_req"),
    inLanguage: CURRENT_CONFIG.lang,
    isAccessibleForFree: true,
    isPartOf: { "@id": `${pageUrl}#webpage` },
    publisher: { "@id": ORG_ID },
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
  if (toolExt.updatedAt)  node.dateModified  = toISOWithTZ(toolExt.updatedAt);
  if (toolExt.launchedAt) node.datePublished = toISOWithTZ(toolExt.launchedAt);
  return node;
}

// ─── Article (TechArticle) node (@id=#article) ───────────────
export function articleNode(tool: Tool, pageUrl: string, rawSlug?: string, hasCalculator = false): Node | null {
  const about = tool.content?.aboutSection;
  if (!about) return null;
  const toolExt = tool as Tool & { updatedAt?: string; launchedAt?: string };
  const imageSlug = rawSlug ?? tool.slug;
  const node: Node = {
    "@type": "TechArticle",
    "@id": `${pageUrl}#article`,
    headline: about.title,
    description: about.paragraphs[0]?.slice(0, 160) ?? tool.description,
    url: `${pageUrl}${t("schema.anchor_about")}`,
    inLanguage: CURRENT_CONFIG.lang,
    mainEntityOfPage: { "@id": `${pageUrl}#webpage` },
    author: { "@id": PERSON_ID },
    publisher: { "@id": ORG_ID },
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
  };
  if (hasCalculator) node.about = { "@id": `${pageUrl}#calculator` };
  return node;
}

// ─── ItemList node (@id=#itemlist) – kategória/főoldal/al-hub ─
export function itemListNode(
  pageUrl: string,
  name: string,
  items: { name: string; url: string; description?: string }[],
): Node {
  return {
    "@type": "ItemList",
    "@id": `${pageUrl}#itemlist`,
    name,
    numberOfItems: items.length,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      url: it.url,
      ...(it.description ? { description: it.description } : {}),
    })),
  };
}

// ─── UseCase ItemList node (@id=#usecases) ───────────────────
export function useCaseNode(tool: Tool, pageUrl: string): Node | null {
  const useCases = tool.content?.useCases;
  if (!useCases || useCases.length === 0) return null;
  return {
    "@type": "ItemList",
    "@id": `${pageUrl}#usecases`,
    name: tpl("tool.use_cases_title", { name: tool.h1 }),
    numberOfItems: useCases.length,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    itemListElement: useCases.map((uc, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: uc.title,
      description: uc.description,
    })),
  };
}

// ─── Event node (@id=#event) – countdown oldalak ─────────────
export function eventNode(opts: {
  name: string; description: string; startIso: string; pageUrl: string;
}): Node {
  return {
    "@type": "Event",
    "@id": `${opts.pageUrl}#event`,
    name: opts.name,
    description: opts.description,
    startDate: opts.startIso,
    endDate: opts.startIso,
    eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: { "@type": "Country", name: "România" },
    url: opts.pageUrl,
  };
}

// ─── Render-idejű frontmatter-normalizálás (NEM md-szerkesztés) ─
// A math/instant oldalak frontmatter schema-objektumait graph-node-okká
// alakítja: @context törlés, stabil @id, author→PERSON_ID, publisher→ORG_ID,
// mainEntityOfPage/isPartOf → #webpage. Visszaadja a node-okat (+ jelzi, van-e
// kalkulátor, hogy a WebPage mainEntity-t arra állíthassuk).
export function normalizeFrontmatterSchema(
  data: Record<string, any>,
  pageUrl: string,
): { nodes: Node[]; primaryId: string | null } {
  const nodes: Node[] = [];
  let primaryId: string | null = null;

  const strip = (o: Record<string, any>) => {
    const { ["@context"]: _ctx, ...rest } = o;
    return rest as Node;
  };

  const sw = data.softwareSchema;
  if (sw) {
    const n = strip(sw);
    n["@id"] = `${pageUrl}#calculator`;
    n.isPartOf = { "@id": `${pageUrl}#webpage` };
    n.publisher = { "@id": ORG_ID };
    nodes.push(n);
    primaryId = `${pageUrl}#calculator`;
  }

  const art = data.articleSchema;
  if (art) {
    const n = strip(art);
    n["@id"] = `${pageUrl}#article`;
    n.author = { "@id": PERSON_ID };
    n.publisher = { "@id": ORG_ID };
    n.mainEntityOfPage = { "@id": `${pageUrl}#webpage` };
    if (sw) n.about = { "@id": `${pageUrl}#calculator` };
    nodes.push(n);
    if (!primaryId) primaryId = `${pageUrl}#article`;
  }

  const faqP = data.faqPageSchema;
  if (faqP) {
    const n = strip(faqP);
    n["@id"] = `${pageUrl}#faq`;
    nodes.push(n);
  }

  return { nodes, primaryId };
}

// ─── A teljes oldal-graph összeállítása ──────────────────────
export interface PageGraphInput {
  pageUrl: string;                 // abszolút canonical (trailing slash-sel)
  name: string;                    // oldal név (title)
  description: string;
  inLanguage?: string;
  pageType?: string;               // "WebPage" | "CollectionPage" | "AboutPage" | "ContactPage" | "ItemPage"
  primaryId?: string | null;       // WebPage.mainEntity fragment @id (pl. "#calculator")
  image?: string;                  // abszolút kép URL (primaryImageOfPage)
  hasBreadcrumb?: boolean;
  nodes?: Node[];                  // oldal-specifikus extra node-ok
  orgFull?: boolean;
  includeSiblings?: boolean;
}

export function buildPageGraph(input: PageGraphInput): { "@context": string; "@graph": Node[] } {
  const {
    pageUrl, name, description, pageType = "WebPage",
    primaryId, image, hasBreadcrumb = false,
    nodes = [], orgFull = false, includeSiblings = false,
  } = input;

  const webpage: Node = {
    "@type": pageType,
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name,
    description,
    inLanguage: input.inLanguage ?? CURRENT_CONFIG.lang,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
  };
  if (hasBreadcrumb) webpage.breadcrumb = { "@id": `${pageUrl}#breadcrumb` };
  if (primaryId) webpage.mainEntity = { "@id": primaryId.startsWith("http") ? primaryId : `${pageUrl}${primaryId}` };
  if (image) {
    webpage.primaryImageOfPage = {
      "@type": "ImageObject",
      url: image.startsWith("http") ? image : buildCanonical(image),
    };
  }

  const graph: Node[] = [
    orgNode(orgFull),
    websiteNode(),
    personNode(),
    webpage,
    ...nodes.filter(Boolean),
  ];
  if (includeSiblings) graph.push(...siblingSiteNodes());

  return { "@context": "https://schema.org", "@graph": graph };
}

// ─── Szerializálás XSS-guarddal ──────────────────────────────
export function serializeGraph(graph: unknown): string {
  return JSON.stringify(graph).replaceAll("<", "\\u003c");
}
