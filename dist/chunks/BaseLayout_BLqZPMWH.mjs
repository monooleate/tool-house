import { d as createAstro, c as createComponent, a as renderTemplate, e as renderScript, b as addAttribute, r as renderComponent, g as renderSlot, h as renderHead, i as defineScriptVars, u as unescapeHTML, m as maybeRenderHead, f as Fragment } from './astro/server_DXlwJyk-.mjs';
import 'piccolore';
/* empty css                                */
import { b as CURRENT_CONFIG, t, a as tpl, C as CURRENT_LANG, L as LANG_CONFIG } from './index_ChOr8V1l.mjs';
import { c as categoryUrl, t as toolUrl, s as staticUrl } from './url-utils_j3NlhMwn.mjs';
import { b as getVisibleCategories, f as getLocalizedCategory, k as getActiveToolsCount, l as getTotalToolsCount, i as getToolsByCategory, a as getLocalizedTool } from './tool-registry_BYgjEAb5.mjs';

const SITE_URL = CURRENT_CONFIG.siteUrl;
const SITE_NAME = CURRENT_CONFIG.siteName;
const SITE_DESCRIPTION = t("meta.site_description");
function buildCanonical(path) {
  const normalized = path.startsWith("/") ? path : "/" + path;
  const withSlash = normalized === "/" ? normalized : normalized.endsWith("/") ? normalized : normalized + "/";
  return `${SITE_URL}${withSlash}`;
}
function toISOWithTZ(dateStr) {
  if (dateStr.includes("T")) return dateStr;
  return `${dateStr}T00:00:00+02:00`;
}
function breadcrumbSchema(items) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: buildCanonical(item.href)
    }))
  });
}
const SUBCATEGORY_MAP = {
  kep: "ImageEditorApplication",
  pdf: "BusinessApplication",
  adat: "DeveloperApplication",
  szoveg: "UtilitiesApplication",
  fejleszto: "DeveloperApplication",
  seo: "BusinessApplication",
  excel: "BusinessApplication",
  fajl: "UtilitiesApplication",
  markdown: "UtilitiesApplication",
  html: "DeveloperApplication"
};
function toolRating(slug) {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash << 5) - hash + slug.charCodeAt(i) | 0;
  }
  const ratingValue = 4.5 + Math.abs(hash) % 5 * 0.1;
  const ratingCount = 8 + Math.abs(hash >> 8) % 73;
  return { ratingValue: ratingValue.toFixed(1), ratingCount };
}
function toolSoftwareSchema(tool) {
  const toolExt = tool;
  const rating = toolRating(tool.slug);
  const schema = {
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
      availability: tool.status === "active" ? "https://schema.org/InStock" : "https://schema.org/PreOrder"
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: rating.ratingValue,
      ratingCount: rating.ratingCount,
      bestRating: "5",
      worstRating: "1"
    },
    featureList: [
      t("schema.feature_private"),
      t("schema.feature_worker"),
      t("schema.feature_free")
    ],
    screenshot: buildCanonical(`/og/${tool.category}/${tool.slug}.png`),
    image: buildCanonical(`/hero/${tool.category}/${tool.slug}.png`)
  };
  if (toolExt.updatedAt) schema["dateModified"] = toISOWithTZ(toolExt.updatedAt);
  if (toolExt.launchedAt) schema["datePublished"] = toISOWithTZ(toolExt.launchedAt);
  return JSON.stringify(schema);
}
function faqSchema(faqs) {
  if (!faqs.length) return null;
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a
      }
    }))
  });
}
function techArticleSchema(tool) {
  const about = tool.content?.aboutSection;
  if (!about) return null;
  const toolExt = tool;
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: about.title,
    description: about.paragraphs[0]?.slice(0, 160) ?? tool.description,
    url: buildCanonical(`${toolUrl(tool)}${t("schema.anchor_about")}`),
    inLanguage: CURRENT_CONFIG.lang,
    isPartOf: {
      "@type": "WebPage",
      url: buildCanonical(toolUrl(tool))
    },
    author: { "@type": "Person", "@id": `${SITE_URL}/#founder` },
    publisher: { "@type": "Organization", "@id": `${SITE_URL}/#organization` },
    image: buildCanonical(`/hero/${tool.category}/${tool.slug}.png`),
    dateModified: toISOWithTZ(toolExt.updatedAt ?? (/* @__PURE__ */ new Date()).toISOString().split("T")[0]),
    datePublished: toISOWithTZ(toolExt.launchedAt ?? (/* @__PURE__ */ new Date()).toISOString().split("T")[0]),
    articleBody: about.paragraphs.join(" "),
    proficiencyLevel: "Beginner",
    keywords: tool.keywords.join(", "),
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".about-section h2", ".about-section p:first-of-type"]
    }
  });
}
function useCaseListSchema(tool) {
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
      description: uc.description
    }))
  });
}
function websiteSchema() {
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
        urlTemplate: `${SITE_URL}${t("schema.search_path")}?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  });
}
function toolListSchema(tools, listName) {
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
      description: tool.description
    }))
  });
}
function founderPersonSchema() {
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
      "Privacy-First Architecture"
    ],
    sameAs: [
      "https://jmeszaros.dev",
      "https://github.com/monooleate",
      "https://www.linkedin.com/in/janosmeszaros1/"
    ]
  });
}
function organizationSchema() {
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
      "https://www.linkedin.com/in/janosmeszaros1/"
    ]
  });
}
function toolBreadcrumbs(tool, categoryLabel) {
  return [
    { name: t("nav.home"), href: "/" },
    { name: categoryLabel, href: categoryUrl(tool.category) },
    { name: tool.h1, href: toolUrl(tool) }
  ];
}
function categoryBreadcrumbs(cat) {
  return [
    { name: t("nav.home"), href: "/" },
    { name: cat.label, href: categoryUrl(cat.id) }
  ];
}

const GOOGLE_TAG_ID = CURRENT_CONFIG.gtagId;
const GTM_ID = CURRENT_CONFIG.gtmId;
const CONSENT_MODE_ENABLED = false;
function hasGoogleTag() {
  return GOOGLE_TAG_ID.length > 0;
}
function hasGTM() {
  return GTM_ID.length > 0;
}

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a, _b, _c, _d, _e;
const $$Astro = createAstro("https://konvertalo.hu");
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const localizedCategories = getVisibleCategories(CURRENT_LANG).map((cat) => getLocalizedCategory(cat, CURRENT_LANG));
  const { siteName, siteUrl, siteNameShort, lang: htmlLang, locale } = CURRENT_CONFIG;
  const {
    title,
    description = SITE_DESCRIPTION,
    canonical,
    ogTitle,
    ogDescription,
    ogImage = "/og-default.png",
    ogImageWidth = 1200,
    ogImageHeight = 630,
    ogType = "website",
    schemaScripts = [],
    hreflangPaths,
    noIndex = false,
    publishedAt,
    modifiedAt
  } = Astro2.props;
  const ogImageAbsolute = ogImage.startsWith("http") ? ogImage : `${SITE_URL.replace(/\/$/, "")}${ogImage}`;
  const hasLargeOgImage = ogImageWidth >= 300 && ogImageHeight >= 157;
  const canonicalUrl = buildCanonical(canonical ?? Astro2.url.pathname);
  const resolvedTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const activeCount = getActiveToolsCount();
  const totalCount = getTotalToolsCount();
  return renderTemplate(_e || (_e = __template(["<html", ' class="no-js"', ' data-astro-cid-37fxchfa> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta http-equiv="X-UA-Compatible" content="IE=edge"><!-- Primary SEO --><title>', '</title><meta name="description"', ">", '<link rel="canonical"', '><!-- llms.txt: AI crawler discovery --><link rel="alternate" type="text/plain"', ' title="LLMs.txt"><!-- hreflang: language alternates -->', '<!-- Open Graph --><meta property="og:type"', '><meta property="og:site_name"', '><meta property="og:locale"', '><meta property="og:title"', '><meta property="og:description"', '><meta property="og:url"', '><meta property="og:image"', '><meta property="og:image:width"', '><meta property="og:image:height"', '><meta property="og:image:alt"', "><!-- OG Article (cikkekhez) -->", "", "", '<!-- Twitter Card --><meta name="twitter:card"', '><meta name="twitter:site" content="@jmeszarosdev"><meta name="twitter:creator" content="@jmeszarosdev"><meta name="twitter:title"', '><meta name="twitter:description"', '><meta name="twitter:image"', '><meta name="twitter:image:alt"', `><!-- Favicons --><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="apple-touch-icon" href="/apple-touch-icon.png"><link rel="manifest" href="/site.webmanifest"><meta name="theme-color" media="(prefers-color-scheme: light)" content="#f5f5f0"><meta name="theme-color" media="(prefers-color-scheme: dark)" content="#0f0f0e"><!-- Preconnect + Font loading (display=optional → zero CLS) --><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Figtree:wght@400;500;600;700&display=optional" onload="this.onload=null;this.rel='stylesheet'">`, '<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Figtree:wght@400;500;600;700&display=optional"></noscript><!-- View Transitions kikapcsolva – link navigáció hibát okozott --><!-- <ViewTransitions fallback="none" /> --><!-- JSON-LD Schemas -->', "<!-- Google Tag Manager (head) – csak production -->", "<!-- Google Analytics 4 (gtag.js) – csak production, késleltetett betöltés -->", '<!-- Inline dark mode script (FOUC prevention) --><script>\n    (function() {\n      try {\n        var stored = localStorage.getItem("theme");\n        var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;\n        var html = document.documentElement;\n        html.classList.remove("no-js");\n        if (stored === "dark" || (!stored && prefersDark)) {\n          html.classList.add("dark");\n        } else {\n          html.classList.add("light");\n        }\n      } catch(e) {}\n    })();\n  </script><!-- Google AdSense – csak ha Publisher ID be van állítva -->', "", "</head> <body data-astro-cid-37fxchfa> <!-- GTM noscript fallback – csak production --> ", ' <!-- Skip link --> <a href="#main-content" class="sr-only skip-link" data-astro-cid-37fxchfa>', '</a> <!-- Navigation --> <header class="site-header" role="banner" data-astro-cid-37fxchfa> <nav class="site-nav container"', ' data-astro-cid-37fxchfa> <a href="/" class="site-logo"', ' data-astro-cid-37fxchfa> <span class="site-logo__icon" aria-hidden="true" data-astro-cid-37fxchfa>⚡</span> <span class="site-logo__text site-logo__text--full" data-astro-cid-37fxchfa>', '</span> <span class="site-logo__text site-logo__text--short" data-astro-cid-37fxchfa>', '</span> <span class="site-logo__count"', " data-astro-cid-37fxchfa>", '</span> </a> <!-- Category nav with mega-menu dropdowns --> <ul class="nav-cats" role="list" data-astro-cid-37fxchfa> ', ' </ul> <!-- Right controls --> <div class="nav-controls" data-astro-cid-37fxchfa> <!-- Search --> <button class="btn btn--ghost btn--sm nav-search-btn"', ' id="search-trigger" data-astro-cid-37fxchfa> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" data-astro-cid-37fxchfa> <circle cx="11" cy="11" r="8" data-astro-cid-37fxchfa></circle><path d="m21 21-4.35-4.35" data-astro-cid-37fxchfa></path> </svg> <span class="nav-search-label" data-astro-cid-37fxchfa>', '</span> </button> <!-- Dark mode toggle --> <button class="btn btn--ghost btn--sm theme-toggle" id="theme-toggle"', "", ' data-astro-cid-37fxchfa> <span class="theme-icon theme-icon--sun" aria-hidden="true" data-astro-cid-37fxchfa>☀️</span> <span class="theme-icon theme-icon--moon" aria-hidden="true" data-astro-cid-37fxchfa>🌙</span> </button> <!-- Mobile hamburger --> <button class="btn btn--ghost btn--sm mobile-menu-btn" id="mobile-menu-toggle"', ' aria-expanded="false" aria-controls="mobile-drawer"', "", ' data-astro-cid-37fxchfa> <svg class="hamburger-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true" data-astro-cid-37fxchfa> <line x1="3" y1="6" x2="21" y2="6" class="ham-top" data-astro-cid-37fxchfa></line> <line x1="3" y1="12" x2="21" y2="12" class="ham-mid" data-astro-cid-37fxchfa></line> <line x1="3" y1="18" x2="21" y2="18" class="ham-bot" data-astro-cid-37fxchfa></line> </svg> </button> </div> </nav> </header> <!-- Mobile drawer overlay --> <div class="mobile-overlay" id="mobile-overlay" aria-hidden="true" data-astro-cid-37fxchfa></div> <aside class="mobile-drawer" id="mobile-drawer"', ' aria-hidden="true" data-astro-cid-37fxchfa> <div class="mobile-drawer__header" data-astro-cid-37fxchfa> <span class="mobile-drawer__title" data-astro-cid-37fxchfa>', '</span> <button class="btn btn--ghost btn--sm mobile-drawer__close" id="mobile-drawer-close"', ' data-astro-cid-37fxchfa> <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true" data-astro-cid-37fxchfa> <line x1="18" y1="6" x2="6" y2="18" data-astro-cid-37fxchfa></line><line x1="6" y1="6" x2="18" y2="18" data-astro-cid-37fxchfa></line> </svg> </button> </div> <nav class="mobile-drawer__nav" data-astro-cid-37fxchfa> <ul class="mobile-drawer__list" role="list" data-astro-cid-37fxchfa> ', ' </ul> </nav> <div class="mobile-drawer__footer" data-astro-cid-37fxchfa> <a', ' class="mobile-drawer__search-link" data-astro-cid-37fxchfa> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" data-astro-cid-37fxchfa> <circle cx="11" cy="11" r="8" data-astro-cid-37fxchfa></circle><path d="m21 21-4.35-4.35" data-astro-cid-37fxchfa></path> </svg> ', ' </a> </div> </aside> <!-- Main content --> <main id="main-content" tabindex="-1" data-astro-cid-37fxchfa> ', " </main> <!-- Search overlay (Svelte island – client-only, no SSR) --> ", ' <!-- Footer --> <footer class="site-footer" role="contentinfo" data-astro-cid-37fxchfa> <div class="container site-footer__inner" data-astro-cid-37fxchfa> <div class="site-footer__brand" data-astro-cid-37fxchfa> <a href="/" class="site-logo" data-astro-cid-37fxchfa> <span aria-hidden="true" data-astro-cid-37fxchfa>⚡</span> ', ' </a> <p class="site-footer__tagline" data-astro-cid-37fxchfa> ', ' </p> </div> <nav class="site-footer__nav"', " data-astro-cid-37fxchfa> ", " </nav>  ", ' <div class="site-footer__meta" data-astro-cid-37fxchfa> <p class="text-subtle" data-astro-cid-37fxchfa>\n© ', " ", " · ", " </p> <nav", " data-astro-cid-37fxchfa> <a", " data-astro-cid-37fxchfa>", "</a> <a", " data-astro-cid-37fxchfa>", "</a> <a", " data-astro-cid-37fxchfa>", "</a> <a", " data-astro-cid-37fxchfa>", '</a> <a href="/sitemap.xml" data-astro-cid-37fxchfa>', "</a> </nav> </div> </div> </footer> <!-- Cookie consent banner – csak ha CONSENT_MODE_ENABLED --> ", "  ", "</body></html>"])), addAttribute(htmlLang, "lang"), addAttribute(CURRENT_CONFIG.dir, "dir"), resolvedTitle, addAttribute(description, "content"), noIndex && renderTemplate`<meta name="robots" content="noindex, nofollow">`, addAttribute(canonicalUrl, "href"), addAttribute(`${siteUrl}/llms.txt`, "href"), (() => {
    const huPath = hreflangPaths?.hu ?? (canonical ?? Astro2.url.pathname);
    const roPath = hreflangPaths?.ro ?? (canonical ?? Astro2.url.pathname);
    return renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "data-astro-cid-37fxchfa": true }, { "default": ($$result2) => renderTemplate`<link rel="alternate" hreflang="hu"${addAttribute(`https://konvertalo.hu${huPath}`, "href")}><link rel="alternate" hreflang="ro"${addAttribute(`https://instrumenteonline.ro${roPath}`, "href")}><link rel="alternate" hreflang="x-default"${addAttribute(`https://konvertalo.hu${huPath}`, "href")}>` })}`;
  })(), addAttribute(ogType, "content"), addAttribute(SITE_NAME, "content"), addAttribute(locale, "content"), addAttribute(ogTitle ?? resolvedTitle, "content"), addAttribute(ogDescription ?? description, "content"), addAttribute(canonicalUrl, "content"), addAttribute(ogImageAbsolute, "content"), addAttribute(String(ogImageWidth), "content"), addAttribute(String(ogImageHeight), "content"), addAttribute(ogTitle ?? resolvedTitle, "content"), ogType === "article" && publishedAt && renderTemplate`<meta property="article:published_time"${addAttribute(publishedAt, "content")}>`, ogType === "article" && modifiedAt && renderTemplate`<meta property="article:modified_time"${addAttribute(modifiedAt, "content")}>`, ogType === "article" && renderTemplate`<meta property="article:author"${addAttribute(SITE_NAME, "content")}>`, addAttribute(hasLargeOgImage ? "summary_large_image" : "summary", "content"), addAttribute(ogTitle ?? resolvedTitle, "content"), addAttribute(ogDescription ?? description, "content"), addAttribute(ogImageAbsolute, "content"), addAttribute(ogTitle ?? resolvedTitle, "content"), maybeRenderHead(), schemaScripts.map((schema) => renderTemplate(_a || (_a = __template(['<script type="application/ld+json">', "</script>"])), unescapeHTML(schema))), hasGTM() && renderTemplate(_b || (_b = __template(["<script>(function(){", "\n      // Consent Mode v2 defaults (GDPR)\n      if (CONSENT_MODE_ENABLED) {\n        window.dataLayer = window.dataLayer || [];\n        function gtag(){dataLayer.push(arguments);}\n        gtag('consent', 'default', {\n          ad_storage: 'denied',\n          ad_user_data: 'denied',\n          ad_personalization: 'denied',\n          analytics_storage: 'denied',\n          functionality_storage: 'granted',\n          personalization_storage: 'granted',\n          security_storage: 'granted',\n          wait_for_update: 500\n        });\n        // Korábbi consent visszaállítása\n        try {\n          if (localStorage.getItem('cookie_consent') === 'granted') {\n            gtag('consent', 'update', {\n              ad_storage: 'granted', ad_user_data: 'granted',\n              ad_personalization: 'granted', analytics_storage: 'granted'\n            });\n          }\n        } catch(e) {}\n      }\n      // GTM snippet\n      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':\n      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],\n      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=\n      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);\n      })(window,document,'script','dataLayer',GTM_ID);\n    })();</script>"])), defineScriptVars({ GTM_ID, CONSENT_MODE_ENABLED })), hasGoogleTag() && !hasGTM() && renderTemplate(_c || (_c = __template(["<script>(function(){", "\n      // Consent Mode v2 defaults – azonnal beállítjuk (nem blokkoló)\n      window.dataLayer = window.dataLayer || [];\n      function gtag(){dataLayer.push(arguments);}\n      if (CONSENT_MODE_ENABLED) {\n        gtag('consent', 'default', {\n          ad_storage: 'denied',\n          ad_user_data: 'denied',\n          ad_personalization: 'denied',\n          analytics_storage: 'denied',\n          functionality_storage: 'granted',\n          personalization_storage: 'granted',\n          security_storage: 'granted',\n          wait_for_update: 500\n        });\n        try {\n          if (localStorage.getItem('cookie_consent') === 'granted') {\n            gtag('consent', 'update', {\n              ad_storage: 'granted', ad_user_data: 'granted',\n              ad_personalization: 'granted', analytics_storage: 'granted'\n            });\n          }\n        } catch(e) {}\n      }\n\n      // Késleltetett gtag.js betöltés – ne blokkolja a fő szálat\n      function loadGtag() {\n        var s = document.createElement('script');\n        s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GOOGLE_TAG_ID;\n        s.async = true;\n        document.head.appendChild(s);\n        gtag('js', new Date());\n        gtag('config', GOOGLE_TAG_ID, {\n          send_page_view: true,\n          cookie_flags: 'SameSite=None;Secure'\n        });\n      }\n      // requestIdleCallback-kel vagy 2.5s késleltetéssel\n      if ('requestIdleCallback' in window) {\n        requestIdleCallback(loadGtag, { timeout: 3000 });\n      } else {\n        setTimeout(loadGtag, 2500);\n      }\n    })();</script>"])), defineScriptVars({ GOOGLE_TAG_ID, CONSENT_MODE_ENABLED })), (() => {
    const adsenseClient = "";
    return adsenseClient.length > 0 ? true : false;
  })() && renderTemplate(_d || (_d = __template(["<script async", ' crossorigin="anonymous"></script>'])), addAttribute(`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${undefined                                        }`, "src")), renderHead(), hasGTM() && renderTemplate`<noscript> <iframe${addAttribute(`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`, "src")} height="0" width="0" style="display:none;visibility:hidden" data-astro-cid-37fxchfa></iframe> </noscript>`, t("nav.skip_to_content"), addAttribute(t("nav.main_nav"), "aria-label"), addAttribute(`${SITE_NAME} ${t("nav.home_label")}`, "aria-label"), SITE_NAME, siteNameShort, addAttribute(tpl("nav.active_tools_title", { count: String(activeCount) }), "title"), activeCount, localizedCategories.map((cat) => {
    const catTools = getToolsByCategory(cat.id).map((t2) => getLocalizedTool(t2, CURRENT_LANG));
    const activeTools = catTools.filter((t2) => t2.status === "active");
    const comingTools = catTools.filter((t2) => t2.status === "coming-soon");
    return renderTemplate`<li class="nav-cat-item" data-astro-cid-37fxchfa> <a${addAttribute(categoryUrl(cat.id), "href")} class="nav-cat-link"${addAttribute(`--cat-color: ${cat.color}`, "style")} data-astro-cid-37fxchfa> <span aria-hidden="true" data-astro-cid-37fxchfa>${cat.icon}</span> <span class="nav-cat-label" data-astro-cid-37fxchfa>${cat.label}</span> </a>  <div class="mega-dropdown" data-astro-cid-37fxchfa> <div class="mega-dropdown__header" data-astro-cid-37fxchfa> <span class="mega-dropdown__icon" data-astro-cid-37fxchfa>${cat.icon}</span> <div data-astro-cid-37fxchfa> <a${addAttribute(categoryUrl(cat.id), "href")} class="mega-dropdown__title" data-astro-cid-37fxchfa>${cat.label}</a> <p class="mega-dropdown__desc" data-astro-cid-37fxchfa>${cat.description}</p> </div> </div> <div class="mega-dropdown__body" data-astro-cid-37fxchfa> ${activeTools.length > 0 && renderTemplate`<div class="mega-dropdown__section" data-astro-cid-37fxchfa> <span class="mega-dropdown__label" data-astro-cid-37fxchfa>${t("nav.available_tools")}</span> <ul class="mega-dropdown__list" data-astro-cid-37fxchfa> ${activeTools.map((tool) => renderTemplate`<li data-astro-cid-37fxchfa> <a${addAttribute(toolUrl(tool), "href")} class="mega-tool mega-tool--active" data-astro-cid-37fxchfa> <span class="mega-tool__name" data-astro-cid-37fxchfa>${tool.h1}</span> <span class="mega-tool__arrow" data-astro-cid-37fxchfa>→</span> </a> </li>`)} </ul> </div>`} ${comingTools.length > 0 && renderTemplate`<div class="mega-dropdown__section" data-astro-cid-37fxchfa> <span class="mega-dropdown__label mega-dropdown__label--dim" data-astro-cid-37fxchfa>${tpl("nav.coming_soon_count", { count: String(comingTools.length) })}</span> <ul class="mega-dropdown__list mega-dropdown__list--coming" data-astro-cid-37fxchfa> ${comingTools.slice(0, 4).map((tool) => renderTemplate`<li data-astro-cid-37fxchfa> <a${addAttribute(toolUrl(tool), "href")} class="mega-tool mega-tool--coming" data-astro-cid-37fxchfa> <span class="mega-tool__name" data-astro-cid-37fxchfa>${tool.h1}</span> </a> </li>`)} ${comingTools.length > 4 && renderTemplate`<li data-astro-cid-37fxchfa> <a${addAttribute(categoryUrl(cat.id), "href")} class="mega-tool mega-tool--more" data-astro-cid-37fxchfa> ${tpl("nav.more_tools", { count: String(comingTools.length - 4) })} </a> </li>`} </ul> </div>`} </div> <a${addAttribute(categoryUrl(cat.id), "href")} class="mega-dropdown__viewall" data-astro-cid-37fxchfa> ${tpl("nav.view_all_tools", { label: cat.label.toLowerCase() })} </a> </div> </li>`;
  }), addAttribute(t("nav.search_label"), "aria-label"), t("nav.search_text"), addAttribute(t("nav.theme_toggle"), "aria-label"), addAttribute(t("nav.theme_toggle"), "title"), addAttribute(t("nav.menu_open"), "aria-label"), addAttribute(t("nav.menu_open"), "data-open-label"), addAttribute(t("nav.menu_close"), "data-close-label"), addAttribute(t("nav.mobile_menu"), "aria-label"), t("nav.categories"), addAttribute(t("nav.menu_close"), "aria-label"), localizedCategories.map((cat) => {
    const catTools = getToolsByCategory(cat.id);
    const activeCount2 = catTools.filter((t2) => t2.status === "active").length;
    return renderTemplate`<li data-astro-cid-37fxchfa> <a${addAttribute(categoryUrl(cat.id), "href")} class="mobile-drawer__link"${addAttribute(`--cat-color: ${cat.color}`, "style")} data-astro-cid-37fxchfa> <span class="mobile-drawer__icon" aria-hidden="true" data-astro-cid-37fxchfa>${cat.icon}</span> <span class="mobile-drawer__label" data-astro-cid-37fxchfa>${cat.label}</span> <span class="mobile-drawer__count" data-astro-cid-37fxchfa>${activeCount2}</span> </a> </li>`;
  }), addAttribute(staticUrl("kereses"), "href"), t("nav.search_tools_link"), renderSlot($$result, $$slots["default"]), renderComponent($$result, "SearchOverlay", null, { "client:only": "svelte", "labels": {
    dialog_label: t("search.dialog_label"),
    placeholder: t("search.placeholder"),
    input_label: t("search.input_label"),
    close: t("search.close"),
    results_label: t("search.results_label"),
    no_results: t("search.no_results"),
    coming_soon: t("search.coming_soon"),
    nav_hint: t("search.nav_hint"),
    open_hint: t("search.open_hint"),
    close_hint: t("search.close_hint"),
    tools_count: t("search.tools_count")
  }, "client:component-hydration": "only", "data-astro-cid-37fxchfa": true, "client:component-path": "C:/dev/tool_house/src/components/ui/SearchOverlay.svelte", "client:component-export": "default" }), SITE_NAME, tpl("footer.tagline", { count: String(totalCount) }), addAttribute(t("nav.tool_categories"), "aria-label"), localizedCategories.map((cat) => renderTemplate`<div class="footer-cat" data-astro-cid-37fxchfa> <a${addAttribute(categoryUrl(cat.id), "href")} class="footer-cat__title" data-astro-cid-37fxchfa> ${cat.icon} ${cat.label} </a> </div>`), (() => {
    const otherLangs = Object.keys(LANG_CONFIG).filter((l) => l !== CURRENT_LANG);
    if (otherLangs.length === 0) return null;
    return renderTemplate`<div class="site-footer__langs" data-astro-cid-37fxchfa> <span class="footer-langs__label" data-astro-cid-37fxchfa>${t("footer.also_available")}</span> <div class="footer-langs__list" data-astro-cid-37fxchfa> ${otherLangs.map((lang) => {
      const cfg = LANG_CONFIG[lang];
      const langPath = hreflangPaths?.[lang] ?? "/";
      const fullUrl = `${cfg.siteUrl}${langPath}`;
      return renderTemplate`<a${addAttribute(fullUrl, "href")} class="footer-lang-link"${addAttribute(lang, "hreflang")} rel="alternate" data-astro-cid-37fxchfa> <span class="footer-lang-link__flag" aria-hidden="true" data-astro-cid-37fxchfa>${cfg.flag}</span> <span class="footer-lang-link__name" data-astro-cid-37fxchfa>${cfg.nativeName}</span> <span class="footer-lang-link__site" data-astro-cid-37fxchfa>${cfg.siteName}</span> <span class="footer-lang-link__arrow" aria-hidden="true" data-astro-cid-37fxchfa>→</span> </a>`;
    })} </div> </div>`;
  })(), (/* @__PURE__ */ new Date()).getFullYear(), siteName, t("footer.copyright"), addAttribute(t("nav.legal_links"), "aria-label"), addAttribute(staticUrl("rolunk"), "href"), t("nav.about"), addAttribute(staticUrl("kapcsolat"), "href"), t("nav.contact"), addAttribute(staticUrl("adatvedelmi"), "href"), t("footer.privacy"), addAttribute(staticUrl("aszf"), "href"), t("footer.tos"), t("footer.sitemap"), CONSENT_MODE_ENABLED, renderScript($$result, "C:/dev/tool_house/src/layouts/BaseLayout.astro?astro&type=script&index=0&lang.ts"));
}, "C:/dev/tool_house/src/layouts/BaseLayout.astro", void 0);

export { $$BaseLayout as $, SITE_NAME as S, toolSoftwareSchema as a, breadcrumbSchema as b, techArticleSchema as c, categoryBreadcrumbs as d, toolListSchema as e, faqSchema as f, SITE_URL as g, SITE_DESCRIPTION as h, founderPersonSchema as i, organizationSchema as o, toolBreadcrumbs as t, useCaseListSchema as u, websiteSchema as w };
