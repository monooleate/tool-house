import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../chunks/astro/server_DXlwJyk-.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_BLqZPMWH.mjs';
import { g as getVisibleActiveTools, a as getLocalizedTool, b as getVisibleCategories, C as CATEGORIES } from '../chunks/tool-registry_BYgjEAb5.mjs';
import { t, a as tpl, C as CURRENT_LANG, b as CURRENT_CONFIG } from '../chunks/index_ChOr8V1l.mjs';
import { t as toolUrl, c as categoryUrl } from '../chunks/url-utils_j3NlhMwn.mjs';
/* empty css                               */
export { r as renderers } from '../chunks/_@astro-renderers_BTphoX3x.mjs';

const $$404 = createComponent(($$result, $$props, $$slots) => {
  const suggestions = getVisibleActiveTools(CURRENT_LANG).slice(0, 4).map((tool) => getLocalizedTool(tool, CURRENT_LANG));
  const visibleCats = getVisibleCategories(CURRENT_LANG).slice(0, 2);
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": tpl("404.meta_title", { siteName: CURRENT_CONFIG.siteName }), "description": t("404.meta_desc"), "noIndex": true, "data-astro-cid-zetdm5md": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="not-found container" data-astro-cid-zetdm5md> <div class="not-found__code" aria-hidden="true" data-astro-cid-zetdm5md>404</div> <h1 class="not-found__title" data-astro-cid-zetdm5md>${t("404.title")}</h1> <p class="not-found__desc" data-astro-cid-zetdm5md> ${t("404.subtitle")} </p> ${suggestions.length > 0 && renderTemplate`<div class="suggestions" data-astro-cid-zetdm5md> <p class="suggestions__label" data-astro-cid-zetdm5md>${t("404.active_tools")}</p> <ul class="suggestions__list" role="list" data-astro-cid-zetdm5md> ${suggestions.map((tool) => {
    const cat = CATEGORIES.find((c) => c.id === tool.category);
    return renderTemplate`<li data-astro-cid-zetdm5md> <a${addAttribute(toolUrl(tool), "href")} class="suggestion-card" data-astro-cid-zetdm5md> <span class="suggestion-card__icon" aria-hidden="true" data-astro-cid-zetdm5md>${cat?.icon}</span> <span class="suggestion-card__title" data-astro-cid-zetdm5md>${tool.h1}</span> </a> </li>`;
  })} </ul> </div>`} <div class="not-found__actions" data-astro-cid-zetdm5md> <a href="/" class="btn btn--primary btn--lg" data-astro-cid-zetdm5md>← ${t("404.back_home")}</a> ${visibleCats.map((cat) => renderTemplate`<a${addAttribute(categoryUrl(cat.id), "href")} class="btn btn--outline" data-astro-cid-zetdm5md>${cat.label}</a>`)} </div> </div> ` })} `;
}, "C:/dev/tool_house/src/pages/404.astro", void 0);

const $$file = "C:/dev/tool_house/src/pages/404.astro";
const $$url = "/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$404,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
