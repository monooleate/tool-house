import { d as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, f as Fragment, b as addAttribute } from '../chunks/astro/server_DXlwJyk-.mjs';
import 'piccolore';
import { d as categoryBreadcrumbs, b as breadcrumbSchema, e as toolListSchema, $ as $$BaseLayout } from '../chunks/BaseLayout_BLqZPMWH.mjs';
import { f as getLocalizedCategory, a as getLocalizedTool, c as getCategoryInfo, i as getToolsByCategory, C as CATEGORIES } from '../chunks/tool-registry_BYgjEAb5.mjs';
import { C as CURRENT_LANG, t } from '../chunks/index_ChOr8V1l.mjs';
import { c as categoryUrl, t as toolUrl } from '../chunks/url-utils_j3NlhMwn.mjs';
/* empty css                                 */
export { r as renderers } from '../chunks/_@astro-renderers_BTphoX3x.mjs';

const $$Astro$1 = createAstro("https://konvertalo.hu");
const $$CategoryLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$CategoryLayout;
  const { category: rawCategory, tools: rawTools, title, description } = Astro2.props;
  const category = getLocalizedCategory(rawCategory, CURRENT_LANG);
  const tools = rawTools.map((tool) => getLocalizedTool(tool, CURRENT_LANG));
  const activeTools = tools.filter((t2) => t2.status === "active");
  const pendingTools = tools.filter((t2) => t2.status === "coming-soon");
  const breadcrumbs = categoryBreadcrumbs(category);
  const schemas = [
    breadcrumbSchema(breadcrumbs),
    toolListSchema(tools, `${category.label} ${t("category.tools_suffix")}`)
  ];
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": title, "description": description, "canonical": categoryUrl(rawCategory.id), "hreflangPaths": { hu: categoryUrl(rawCategory.id, "hu"), ro: categoryUrl(rawCategory.id, "ro") }, "schemaScripts": schemas, "data-astro-cid-5stfgk4a": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="cat-page container" data-astro-cid-5stfgk4a> <!-- Breadcrumb --> <nav class="breadcrumb" aria-label="Breadcrumb" data-astro-cid-5stfgk4a> <ol class="breadcrumb__list" role="list" data-astro-cid-5stfgk4a> ${breadcrumbs.map((item, i) => renderTemplate`<li class="breadcrumb__item" data-astro-cid-5stfgk4a> ${i < breadcrumbs.length - 1 ? renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-5stfgk4a": true }, { "default": ($$result3) => renderTemplate` <a${addAttribute(item.href, "href")} class="breadcrumb__link" data-astro-cid-5stfgk4a>${item.name}</a> <span aria-hidden="true" data-astro-cid-5stfgk4a> / </span> ` })}` : renderTemplate`<span aria-current="page" data-astro-cid-5stfgk4a>${item.name}</span>`} </li>`)} </ol> </nav> <!-- Category header --> <header class="cat-header"${addAttribute(`--cat-color: ${category.color}`, "style")} data-astro-cid-5stfgk4a> <div class="cat-header__icon" aria-hidden="true" data-astro-cid-5stfgk4a>${category.icon}</div> <div class="cat-header__content" data-astro-cid-5stfgk4a> <h1 data-astro-cid-5stfgk4a>${category.label} ${t("category.tools_suffix")}</h1> <p data-astro-cid-5stfgk4a>${description}</p> <div class="cat-header__stats" data-astro-cid-5stfgk4a> <span class="stat-pill" data-astro-cid-5stfgk4a> <span class="stat-pill__num" data-astro-cid-5stfgk4a>${activeTools.length}</span> ${t("category.active_label")} </span> <span class="stat-pill stat-pill--dim" data-astro-cid-5stfgk4a> <span class="stat-pill__num" data-astro-cid-5stfgk4a>${pendingTools.length}</span> ${t("category.coming_label")} </span> </div> </div> </header> <!-- Category intro (SEO) --> ${category.intro && category.intro.length > 0 && renderTemplate`<section class="cat-intro"${addAttribute(`${category.label} ${t("category.description_label")}`, "aria-label")} data-astro-cid-5stfgk4a> ${category.intro.map((p) => renderTemplate`<p class="cat-intro__para" data-astro-cid-5stfgk4a>${p}</p>`)} </section>`} <!-- Active tools --> ${activeTools.length > 0 && renderTemplate`<section aria-labelledby="active-title" data-astro-cid-5stfgk4a> <h2 id="active-title" class="section-label" data-astro-cid-5stfgk4a> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true" data-astro-cid-5stfgk4a><circle cx="12" cy="12" r="10" data-astro-cid-5stfgk4a></circle><polyline points="12 6 12 12 16 14" data-astro-cid-5stfgk4a></polyline></svg> ${t("category.available_tools")} </h2> <ul class="tool-grid" role="list" data-astro-cid-5stfgk4a> ${activeTools.map((tool) => renderTemplate`<li data-astro-cid-5stfgk4a> <a${addAttribute(toolUrl(tool), "href")} class="tool-card tool-card--active" data-astro-cid-5stfgk4a> <div class="tool-card__title" data-astro-cid-5stfgk4a>${tool.h1}</div> <p class="tool-card__desc" data-astro-cid-5stfgk4a>${tool.description}</p> <span class="tool-card__cta" data-astro-cid-5stfgk4a>${t("category.open_tool")}</span> </a> </li>`)} </ul> </section>`} <!-- Coming soon tools --> ${pendingTools.length > 0 && renderTemplate`<section aria-labelledby="coming-title" class="coming-section" data-astro-cid-5stfgk4a> <h2 id="coming-title" class="section-label section-label--muted" data-astro-cid-5stfgk4a> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true" data-astro-cid-5stfgk4a><circle cx="12" cy="12" r="10" data-astro-cid-5stfgk4a></circle><line x1="12" y1="8" x2="12" y2="16" data-astro-cid-5stfgk4a></line><line x1="8" y1="12" x2="16" y2="12" data-astro-cid-5stfgk4a></line></svg> ${t("category.coming_soon_tools")} </h2> <ul class="tool-grid tool-grid--compact" role="list" data-astro-cid-5stfgk4a> ${pendingTools.map((tool) => renderTemplate`<li data-astro-cid-5stfgk4a> <a${addAttribute(toolUrl(tool), "href")} class="tool-card tool-card--pending" data-astro-cid-5stfgk4a> <div class="tool-card__title" data-astro-cid-5stfgk4a>${tool.h1}</div> <p class="tool-card__desc" data-astro-cid-5stfgk4a>${tool.description}</p> </a> </li>`)} </ul> </section>`} </div> ` })} `;
}, "C:/dev/tool_house/src/layouts/CategoryLayout.astro", void 0);

const $$Astro = createAstro("https://konvertalo.hu");
function getStaticPaths() {
  return CATEGORIES.map((cat) => {
    const url = categoryUrl(cat.id);
    const catSlug = url.replace(/^\//, "");
    return {
      params: { category: catSlug },
      props: { categoryId: cat.id }
    };
  });
}
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const { categoryId } = Astro2.props;
  const category = getCategoryInfo(categoryId);
  const tools = getToolsByCategory(categoryId);
  return renderTemplate`${renderComponent($$result, "CategoryLayout", $$CategoryLayout, { "category": category, "tools": tools, "title": t(`cat_meta.${categoryId}_title`), "description": t(`cat_meta.${categoryId}_desc`) })}`;
}, "C:/dev/tool_house/src/pages/[category]/index.astro", void 0);

const $$file = "C:/dev/tool_house/src/pages/[category]/index.astro";
const $$url = "/[category]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
