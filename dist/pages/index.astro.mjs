import { c as createComponent, r as renderComponent, e as renderScript, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../chunks/astro/server_DXlwJyk-.mjs';
import 'piccolore';
import { S as SITE_NAME, g as SITE_URL, w as websiteSchema, o as organizationSchema, i as founderPersonSchema, e as toolListSchema, f as faqSchema, $ as $$BaseLayout } from '../chunks/BaseLayout_BLqZPMWH.mjs';
import { j as getLocalizedCategories, d as getAllTools, a as getLocalizedTool, k as getActiveToolsCount, m as getToolBySlug, b as getVisibleCategories, f as getLocalizedCategory, i as getToolsByCategory } from '../chunks/tool-registry_BYgjEAb5.mjs';
import { C as CURRENT_LANG, t, a as tpl } from '../chunks/index_ChOr8V1l.mjs';
import { c as categoryUrl, t as toolUrl } from '../chunks/url-utils_j3NlhMwn.mjs';
/* empty css                                 */
export { r as renderers } from '../chunks/_@astro-renderers_BTphoX3x.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  getLocalizedCategories(CURRENT_LANG);
  const allTools = getAllTools().map((t2) => getLocalizedTool(t2, CURRENT_LANG));
  const activeTools = allTools.filter((t2) => t2.status === "active");
  const activeCount = getActiveToolsCount();
  const TOP_TOOL_SLUGS = [
    { category: "kep", slug: "jpg-webp", icon: "\u{1F5BC}\uFE0F" },
    { category: "kep", slug: "tomorites", icon: "\u{1F5DC}\uFE0F" },
    { category: "kep", slug: "atmeretezes", icon: "\u{1F4D0}" },
    { category: "pdf", slug: "osszeillesztes", icon: "\u{1F4C4}" },
    { category: "pdf", slug: "szetbontas", icon: "\u2702\uFE0F" },
    { category: "pdf", slug: "tomoritese", icon: "\u{1F5DC}\uFE0F" },
    { category: "adat", slug: "csv-json", icon: "\u{1F4CA}" },
    { category: "kep", slug: "png-webp", icon: "\u{1F5BC}\uFE0F" },
    { category: "fejleszto", slug: "json-formazas", icon: "\u2699\uFE0F" },
    { category: "kep", slug: "fekete-feher", icon: "\u{1F3A8}" }
  ];
  const topTools = TOP_TOOL_SLUGS.map(({ category, slug, icon }) => {
    const raw = getToolBySlug(category, slug);
    if (!raw) return null;
    return { tool: getLocalizedTool(raw, CURRENT_LANG), icon };
  }).filter(Boolean);
  const categories = getVisibleCategories(CURRENT_LANG);
  const faqItems = [1, 2, 3, 4, 5, 6].map((i) => ({
    q: t(`homepage.faq_q${i}`),
    a: t(`homepage.faq_a${i}`)
  }));
  const softwareAppSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": SITE_NAME,
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Web",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "HUF"  },
    "url": SITE_URL + "/"
  });
  const schemas = [
    websiteSchema(),
    organizationSchema(),
    founderPersonSchema(),
    toolListSchema(activeTools, t("category.all_tools")),
    softwareAppSchema,
    faqSchema(faqItems)
  ].filter(Boolean);
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": tpl("homepage.meta_title", { count: String(activeCount) }), "description": tpl("homepage.meta_description", { count: String(activeCount) }), "canonical": "/", "schemaScripts": schemas, "data-astro-cid-j7pv25f6": true }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="hero" aria-labelledby="hero-title" data-astro-cid-j7pv25f6> <div class="hero__inner container" data-astro-cid-j7pv25f6> <h1 id="hero-title" class="hero__title" data-astro-cid-j7pv25f6>${tpl("homepage.hero_title", { count: String(activeCount) })}</h1> <p class="hero__subtitle" data-astro-cid-j7pv25f6>${t("homepage.hero_subtitle")}</p> <div class="hero__search" data-astro-cid-j7pv25f6> <button type="button" class="hero__search-link" id="hero-search-trigger"${addAttribute(t("homepage.hero_search_btn"), "aria-label")} data-astro-cid-j7pv25f6> <span class="hero__search-icon" aria-hidden="true" data-astro-cid-j7pv25f6>🔍</span> <span class="hero__search-placeholder" data-astro-cid-j7pv25f6>${t("homepage.hero_search_placeholder")}</span> </button> </div> <nav class="hero__categories"${addAttribute(t("homepage.hero_categories_label"), "aria-label")} data-astro-cid-j7pv25f6> ${categories.map((rawCat) => {
    const cat = getLocalizedCategory(rawCat, CURRENT_LANG);
    return renderTemplate`<a${addAttribute(categoryUrl(rawCat.id), "href")} class="hero__cat-pill" data-astro-cid-j7pv25f6> <span aria-hidden="true" data-astro-cid-j7pv25f6>${rawCat.icon}</span> ${cat.label} </a>`;
  })} </nav> </div> </section>  <section class="trust-bar"${addAttribute(t("homepage.trust_privacy_title"), "aria-label")} data-astro-cid-j7pv25f6> <div class="trust-bar__inner container" data-astro-cid-j7pv25f6> <div class="trust-bar__item" data-astro-cid-j7pv25f6> <span class="trust-bar__icon" aria-hidden="true" data-astro-cid-j7pv25f6>🔒</span> <div data-astro-cid-j7pv25f6> <strong data-astro-cid-j7pv25f6>${t("homepage.trust_privacy_title")}</strong> <span data-astro-cid-j7pv25f6>${t("homepage.trust_privacy_desc")}</span> </div> </div> <div class="trust-bar__item" data-astro-cid-j7pv25f6> <span class="trust-bar__icon" aria-hidden="true" data-astro-cid-j7pv25f6>🇪🇺</span> <div data-astro-cid-j7pv25f6> <strong data-astro-cid-j7pv25f6>${t("homepage.trust_gdpr_title")}</strong> <span data-astro-cid-j7pv25f6>${t("homepage.trust_gdpr_desc")}</span> </div> </div> <div class="trust-bar__item" data-astro-cid-j7pv25f6> <span class="trust-bar__icon" aria-hidden="true" data-astro-cid-j7pv25f6>⚡</span> <div data-astro-cid-j7pv25f6> <strong data-astro-cid-j7pv25f6>${t("homepage.trust_speed_title")}</strong> <span data-astro-cid-j7pv25f6>${t("homepage.trust_speed_desc")}</span> </div> </div> <div class="trust-bar__item" data-astro-cid-j7pv25f6> <span class="trust-bar__icon" aria-hidden="true" data-astro-cid-j7pv25f6>🆓</span> <div data-astro-cid-j7pv25f6> <strong data-astro-cid-j7pv25f6>${t("homepage.trust_free_title")}</strong> <span data-astro-cid-j7pv25f6>${t("homepage.trust_free_desc")}</span> </div> </div> <div class="trust-bar__item" data-astro-cid-j7pv25f6> <span class="trust-bar__icon" aria-hidden="true" data-astro-cid-j7pv25f6>📱</span> <div data-astro-cid-j7pv25f6> <strong data-astro-cid-j7pv25f6>${t("homepage.trust_mobile_title")}</strong> <span data-astro-cid-j7pv25f6>${t("homepage.trust_mobile_desc")}</span> </div> </div> </div> </section>  <section class="featured container" aria-labelledby="featured-title" data-astro-cid-j7pv25f6> <div class="section-header" data-astro-cid-j7pv25f6> <h2 id="featured-title" class="section-header__title" data-astro-cid-j7pv25f6>${t("homepage.featured_title")}</h2> <p class="section-header__subtitle" data-astro-cid-j7pv25f6>${t("homepage.featured_subtitle")}</p> </div> <ul class="tool-grid tool-grid--featured" role="list" data-astro-cid-j7pv25f6> ${topTools.map(({ tool, icon }) => renderTemplate`<li class="ftool-card" data-astro-cid-j7pv25f6> <a${addAttribute(toolUrl(tool), "href")} class="ftool-card__link" data-astro-cid-j7pv25f6> <span class="ftool-card__icon" aria-hidden="true" data-astro-cid-j7pv25f6>${icon}</span> <div class="ftool-card__body" data-astro-cid-j7pv25f6> <h3 class="ftool-card__title" data-astro-cid-j7pv25f6>${tool.h1}</h3> <p class="ftool-card__desc" data-astro-cid-j7pv25f6>${tool.description}</p> </div> <span class="ftool-card__arrow" aria-hidden="true" data-astro-cid-j7pv25f6>→</span> </a> </li>`)} </ul> </section>  <section class="categories-section container" aria-labelledby="categories-title" data-astro-cid-j7pv25f6> <h2 id="categories-title" class="section-header__title" data-astro-cid-j7pv25f6>${t("homepage.categories_title")}</h2> <div class="category-grid" data-astro-cid-j7pv25f6> ${categories.map((rawCat) => {
    const cat = getLocalizedCategory(rawCat, CURRENT_LANG);
    const catTools = getToolsByCategory(rawCat.id).filter((t2) => t2.status === "active").map((t2) => getLocalizedTool(t2, CURRENT_LANG));
    const featured = catTools.slice(0, 4);
    const remaining = catTools.length - featured.length;
    return renderTemplate`<article class="cat-block" data-astro-cid-j7pv25f6> <header class="cat-block__header" data-astro-cid-j7pv25f6> <a${addAttribute(categoryUrl(rawCat.id), "href")} class="cat-block__title-link" data-astro-cid-j7pv25f6> <span aria-hidden="true" data-astro-cid-j7pv25f6>${rawCat.icon}</span> <h3 data-astro-cid-j7pv25f6>${cat.label}</h3> <span class="cat-block__count" data-astro-cid-j7pv25f6>${catTools.length}</span> </a> <p class="cat-block__desc" data-astro-cid-j7pv25f6>${cat.description}</p> </header> <ul class="cat-block__tools" role="list" data-astro-cid-j7pv25f6> ${featured.map((tool) => renderTemplate`<li data-astro-cid-j7pv25f6><a${addAttribute(toolUrl(tool), "href")} data-astro-cid-j7pv25f6>${tool.h1}</a></li>`)} </ul> ${remaining > 0 && renderTemplate`<a${addAttribute(categoryUrl(rawCat.id), "href")} class="cat-block__more" data-astro-cid-j7pv25f6>
+${remaining} ${t("homepage.categories_more")} </a>`} </article>`;
  })} </div> </section>  <section class="about-section container" aria-labelledby="about-title" data-astro-cid-j7pv25f6> <div class="about-content" data-astro-cid-j7pv25f6> <h2 id="about-title" class="section-header__title" data-astro-cid-j7pv25f6>${t("homepage.about_title")}</h2> <p data-astro-cid-j7pv25f6>${tpl("homepage.about_p1", { count: String(activeCount) })}</p> <p data-astro-cid-j7pv25f6>${tpl("homepage.about_p2", { count: String(activeCount) })}</p> <h3 data-astro-cid-j7pv25f6>${t("homepage.about_tech_title")}</h3> <p data-astro-cid-j7pv25f6>${t("homepage.about_tech_p1")}</p> <p data-astro-cid-j7pv25f6>${t("homepage.about_tech_p2")}</p> <p data-astro-cid-j7pv25f6>${t("homepage.about_tech_p3")}</p> </div> </section>  <section class="why-section container" aria-labelledby="why-title" data-astro-cid-j7pv25f6> <h2 id="why-title" class="section-header__title" data-astro-cid-j7pv25f6>${t("homepage.why_title")}</h2> <div class="why-grid" data-astro-cid-j7pv25f6> <article class="why-card" data-astro-cid-j7pv25f6> <span class="why-card__icon" aria-hidden="true" data-astro-cid-j7pv25f6>🔒</span> <h3 data-astro-cid-j7pv25f6>${t("homepage.why_privacy_title")}</h3> <p data-astro-cid-j7pv25f6>${t("homepage.why_privacy_body")}</p> </article> <article class="why-card" data-astro-cid-j7pv25f6> <span class="why-card__icon" aria-hidden="true" data-astro-cid-j7pv25f6>⚡</span> <h3 data-astro-cid-j7pv25f6>${t("homepage.why_speed_title")}</h3> <p data-astro-cid-j7pv25f6>${t("homepage.why_speed_body")}</p> </article> <article class="why-card" data-astro-cid-j7pv25f6> <span class="why-card__icon" aria-hidden="true" data-astro-cid-j7pv25f6>🆓</span> <h3 data-astro-cid-j7pv25f6>${t("homepage.why_free_title")}</h3> <p data-astro-cid-j7pv25f6>${t("homepage.why_free_body")}</p> </article> <article class="why-card" data-astro-cid-j7pv25f6> <span class="why-card__icon" aria-hidden="true" data-astro-cid-j7pv25f6>🌍</span> <h3 data-astro-cid-j7pv25f6>${t("homepage.why_browser_title")}</h3> <p data-astro-cid-j7pv25f6>${t("homepage.why_browser_body")}</p> </article> <article class="why-card" data-astro-cid-j7pv25f6> <span class="why-card__icon" aria-hidden="true" data-astro-cid-j7pv25f6>📱</span> <h3 data-astro-cid-j7pv25f6>${t("homepage.why_mobile_title")}</h3> <p data-astro-cid-j7pv25f6>${t("homepage.why_mobile_body")}</p> </article> <article class="why-card" data-astro-cid-j7pv25f6> <span class="why-card__icon" aria-hidden="true" data-astro-cid-j7pv25f6>🔧</span> <h3 data-astro-cid-j7pv25f6>${tpl("homepage.why_tools_title", { count: String(activeCount) })}</h3> <p data-astro-cid-j7pv25f6>${t("homepage.why_tools_body")}</p> </article> </div> </section>  <section class="audience-section container" aria-labelledby="audience-title" data-astro-cid-j7pv25f6> <h2 id="audience-title" class="section-header__title" data-astro-cid-j7pv25f6>${t("homepage.audience_title")}</h2> <div class="audience-grid" data-astro-cid-j7pv25f6> <article class="audience-card" data-astro-cid-j7pv25f6> <span class="audience-card__icon" aria-hidden="true" data-astro-cid-j7pv25f6>💻</span> <h3 data-astro-cid-j7pv25f6>${t("homepage.audience_dev_title")}</h3> <p data-astro-cid-j7pv25f6>${t("homepage.audience_dev_body")}</p> </article> <article class="audience-card" data-astro-cid-j7pv25f6> <span class="audience-card__icon" aria-hidden="true" data-astro-cid-j7pv25f6>✍️</span> <h3 data-astro-cid-j7pv25f6>${t("homepage.audience_content_title")}</h3> <p data-astro-cid-j7pv25f6>${t("homepage.audience_content_body")}</p> </article> <article class="audience-card" data-astro-cid-j7pv25f6> <span class="audience-card__icon" aria-hidden="true" data-astro-cid-j7pv25f6>🏢</span> <h3 data-astro-cid-j7pv25f6>${t("homepage.audience_office_title")}</h3> <p data-astro-cid-j7pv25f6>${t("homepage.audience_office_body")}</p> </article> <article class="audience-card" data-astro-cid-j7pv25f6> <span class="audience-card__icon" aria-hidden="true" data-astro-cid-j7pv25f6>🔐</span> <h3 data-astro-cid-j7pv25f6>${t("homepage.audience_privacy_title")}</h3> <p data-astro-cid-j7pv25f6>${t("homepage.audience_privacy_body")}</p> </article> </div> </section>  <section class="how-section container" aria-labelledby="how-title" data-astro-cid-j7pv25f6> <h2 id="how-title" class="section-header__title" data-astro-cid-j7pv25f6>${t("homepage.how_title")}</h2> <p class="how-section__subtitle" data-astro-cid-j7pv25f6>${t("homepage.how_subtitle")}</p> <ol class="how-steps" role="list" data-astro-cid-j7pv25f6> <li class="how-step" data-astro-cid-j7pv25f6> <span class="how-step__number" aria-hidden="true" data-astro-cid-j7pv25f6>1</span> <div data-astro-cid-j7pv25f6> <h3 data-astro-cid-j7pv25f6>${t("homepage.how_step1_title")}</h3> <p data-astro-cid-j7pv25f6>${tpl("homepage.how_step1_body", { count: String(activeCount) })}</p> </div> </li> <li class="how-step" data-astro-cid-j7pv25f6> <span class="how-step__number" aria-hidden="true" data-astro-cid-j7pv25f6>2</span> <div data-astro-cid-j7pv25f6> <h3 data-astro-cid-j7pv25f6>${t("homepage.how_step2_title")}</h3> <p data-astro-cid-j7pv25f6>${t("homepage.how_step2_body")}</p> </div> </li> <li class="how-step" data-astro-cid-j7pv25f6> <span class="how-step__number" aria-hidden="true" data-astro-cid-j7pv25f6>3</span> <div data-astro-cid-j7pv25f6> <h3 data-astro-cid-j7pv25f6>${t("homepage.how_step3_title")}</h3> <p data-astro-cid-j7pv25f6>${t("homepage.how_step3_body")}</p> </div> </li> </ol> </section>  <section class="faq-section container" aria-labelledby="faq-title" data-astro-cid-j7pv25f6> <h2 id="faq-title" class="section-header__title" data-astro-cid-j7pv25f6>${t("homepage.faq_title")}</h2> <dl class="faq__list" itemscope itemtype="https://schema.org/FAQPage" data-astro-cid-j7pv25f6> ${faqItems.map(({ q, a }) => renderTemplate`<div class="faq__item" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question" data-astro-cid-j7pv25f6> <dt itemprop="name" data-astro-cid-j7pv25f6>${q}</dt> <dd itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer" data-astro-cid-j7pv25f6> <span itemprop="text" data-astro-cid-j7pv25f6>${a}</span> </dd> </div>`)} </dl> </section> ` })}  ${renderScript($$result, "C:/dev/tool_house/src/pages/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/dev/tool_house/src/pages/index.astro", void 0);

const $$file = "C:/dev/tool_house/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
