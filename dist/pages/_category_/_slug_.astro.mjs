import { d as createAstro, c as createComponent, m as maybeRenderHead, a as renderTemplate, b as addAttribute, r as renderComponent, e as renderScript, f as Fragment, g as renderSlot } from '../../chunks/astro/server_DXlwJyk-.mjs';
import 'piccolore';
import { t as toolBreadcrumbs, a as toolSoftwareSchema, b as breadcrumbSchema, f as faqSchema, c as techArticleSchema, u as useCaseListSchema, $ as $$BaseLayout } from '../../chunks/BaseLayout_BLqZPMWH.mjs';
import 'clsx';
import { a as tpl, t, C as CURRENT_LANG } from '../../chunks/index_ChOr8V1l.mjs';
/* empty css                                     */
import { a as getLocalizedTool, f as getLocalizedCategory, c as getCategoryInfo, h as getRelatedTools, d as getAllTools } from '../../chunks/tool-registry_BYgjEAb5.mjs';
import { t as toolUrl, c as categoryUrl } from '../../chunks/url-utils_j3NlhMwn.mjs';
import { f as fallback, b as bind_props } from '../../chunks/_@astro-renderers_BTphoX3x.mjs';
export { r as renderers } from '../../chunks/_@astro-renderers_BTphoX3x.mjs';

const $$Astro$2 = createAstro("https://konvertalo.hu");
const $$ToolContentSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$ToolContentSection;
  const { content, toolName } = Astro2.props;
  const { howToSteps, useCases, formatComparison, aboutSection, tips } = content;
  return renderTemplate`${maybeRenderHead()}<div class="tool-content-sections" data-astro-cid-b4g2fgvi> <!-- Hogyan használd? --> <section class="content-section" id="hogyan-hasznald" aria-labelledby="how-to-heading" data-astro-cid-b4g2fgvi> <h2 id="how-to-heading" class="content-section__title" data-astro-cid-b4g2fgvi> ${tpl("tool.how_to_title", { name: toolName })} </h2> <ol class="how-to-steps" role="list" data-astro-cid-b4g2fgvi> ${howToSteps.map((step, i) => renderTemplate`<li class="how-to-step" data-astro-cid-b4g2fgvi> <div class="how-to-step__number" aria-hidden="true" data-astro-cid-b4g2fgvi>${i + 1}</div> <div class="how-to-step__body" data-astro-cid-b4g2fgvi> <h3 class="how-to-step__title" data-astro-cid-b4g2fgvi>${step.title.replace(/^\d+\.\s*/, "")}</h3> <p class="how-to-step__desc" data-astro-cid-b4g2fgvi>${step.description}</p> </div> </li>`)} </ol> </section> <!-- Mikor érdemes használni? --> <section class="content-section" id="mikor-hasznald" aria-labelledby="use-cases-heading" data-astro-cid-b4g2fgvi> <h2 id="use-cases-heading" class="content-section__title" data-astro-cid-b4g2fgvi> ${t("tool.use_cases_title")} </h2> <ul class="use-cases" role="list" data-astro-cid-b4g2fgvi> ${useCases.map((uc) => renderTemplate`<li class="use-case-card" data-astro-cid-b4g2fgvi> <span class="use-case-card__icon" aria-hidden="true" data-astro-cid-b4g2fgvi>${uc.icon}</span> <div data-astro-cid-b4g2fgvi> <h3 class="use-case-card__title" data-astro-cid-b4g2fgvi>${uc.title}</h3> <p class="use-case-card__desc" data-astro-cid-b4g2fgvi>${uc.description}</p> </div> </li>`)} </ul> </section> <!-- Formátum összehasonlítás (opcionális) --> ${formatComparison && renderTemplate`<section class="content-section" id="formatumok" aria-labelledby="format-heading" data-astro-cid-b4g2fgvi> <h2 id="format-heading" class="content-section__title" data-astro-cid-b4g2fgvi> ${formatComparison.title} </h2> <div class="format-table-wrapper" role="region"${addAttribute(formatComparison.title, "aria-label")} tabindex="0" data-astro-cid-b4g2fgvi> <table class="format-table" data-astro-cid-b4g2fgvi> <thead data-astro-cid-b4g2fgvi> <tr data-astro-cid-b4g2fgvi> ${formatComparison.columns.map((col, i) => renderTemplate`<th scope="col"${addAttribute(i === 0 ? "format-table__feature-col" : "", "class")} data-astro-cid-b4g2fgvi> ${col} </th>`)} </tr> </thead> <tbody data-astro-cid-b4g2fgvi> ${formatComparison.rows.map((row) => renderTemplate`<tr data-astro-cid-b4g2fgvi> <th scope="row" class="format-table__feature" data-astro-cid-b4g2fgvi>${row.feature}</th> ${row.values.map((val) => renderTemplate`<td class="format-table__value" data-astro-cid-b4g2fgvi>${val}</td>`)} </tr>`)} </tbody> </table> </div> </section>`} <!-- Részletes leírás --> <section class="content-section" id="tudnivalok" aria-labelledby="about-heading" data-astro-cid-b4g2fgvi> <h2 id="about-heading" class="content-section__title" data-astro-cid-b4g2fgvi> ${aboutSection.title} </h2> ${aboutSection.paragraphs.map((p) => renderTemplate`<p class="content-section__para" data-astro-cid-b4g2fgvi>${p}</p>`)} </section> <!-- Tippek (opcionális) --> ${tips && tips.length > 0 && renderTemplate`<section class="content-section" id="tippek" aria-labelledby="tips-heading" data-astro-cid-b4g2fgvi> <h2 id="tips-heading" class="content-section__title" data-astro-cid-b4g2fgvi>${t("tool.tips_title")}</h2> <ul class="tips-list" role="list" data-astro-cid-b4g2fgvi> ${tips.map((tip) => renderTemplate`<li class="tip-item" data-astro-cid-b4g2fgvi> <span class="tip-item__icon" aria-hidden="true" data-astro-cid-b4g2fgvi>${tip.icon}</span> <p class="tip-item__text" data-astro-cid-b4g2fgvi>${tip.tip}</p> </li>`)} </ul> </section>`} </div> `;
}, "C:/dev/tool_house/src/components/sections/ToolContentSection.astro", void 0);

const $$Astro$1 = createAstro("https://konvertalo.hu");
const $$ToolLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ToolLayout;
  const { tool: rawTool } = Astro2.props;
  const tool = getLocalizedTool(rawTool, CURRENT_LANG);
  const category = getLocalizedCategory(getCategoryInfo(tool.category), CURRENT_LANG);
  const related = getRelatedTools(tool).map((t2) => getLocalizedTool(t2, CURRENT_LANG));
  const breadcrumbs = toolBreadcrumbs(tool, category.label);
  const schemas = [
    toolSoftwareSchema(tool),
    breadcrumbSchema(breadcrumbs)
  ];
  if (tool.faq.length > 0) {
    const faq = faqSchema(tool.faq);
    if (faq) schemas.push(faq);
  }
  const techArticle = techArticleSchema(tool);
  if (techArticle) schemas.push(techArticle);
  const useCaseList = useCaseListSchema(tool);
  if (useCaseList) schemas.push(useCaseList);
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": tool.title, "description": tool.description, "canonical": toolUrl(rawTool), "hreflangPaths": { hu: toolUrl(rawTool, "hu"), ro: toolUrl(rawTool, "ro") }, "ogImage": `/og/${tool.category}/${tool.slug}.png`, "ogImageWidth": 1200, "ogImageHeight": 630, "ogType": "website", "modifiedAt": tool.updatedAt, "schemaScripts": schemas, "data-astro-cid-mqzpnqfb": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="tool-page container" data-astro-cid-mqzpnqfb> <!-- Breadcrumb --> <nav class="breadcrumb" aria-label="Breadcrumb" data-astro-cid-mqzpnqfb> <ol class="breadcrumb__list" role="list" data-astro-cid-mqzpnqfb> ${breadcrumbs.map((item, i) => renderTemplate`<li class="breadcrumb__item" data-astro-cid-mqzpnqfb> ${i < breadcrumbs.length - 1 ? renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-mqzpnqfb": true }, { "default": ($$result3) => renderTemplate` <a${addAttribute(item.href, "href")} class="breadcrumb__link" data-astro-cid-mqzpnqfb>${item.name}</a> <span class="breadcrumb__sep" aria-hidden="true" data-astro-cid-mqzpnqfb>/</span> ` })}` : renderTemplate`<span class="breadcrumb__current" aria-current="page" data-astro-cid-mqzpnqfb>${item.name}</span>`} </li>`)} </ol> </nav> <!-- Tool header --> <header class="tool-header" data-astro-cid-mqzpnqfb> <div class="tool-header__meta" data-astro-cid-mqzpnqfb> <a${addAttribute(categoryUrl(tool.category), "href")} class="tool-cat-badge"${addAttribute(`--cat-color: ${category.color}`, "style")} data-astro-cid-mqzpnqfb> <span aria-hidden="true" data-astro-cid-mqzpnqfb>${category.icon}</span> ${category.label} </a> ${tool.status === "active" ? renderTemplate`<span class="badge badge--active" data-astro-cid-mqzpnqfb>${t("tool.badge_active")}</span>` : renderTemplate`<span class="badge badge--coming-soon" data-astro-cid-mqzpnqfb>${t("tool.badge_coming")}</span>`} </div> <h1 class="tool-header__h1" data-astro-cid-mqzpnqfb>${tool.h1}</h1> <p class="tool-header__desc" data-astro-cid-mqzpnqfb>${tool.description}</p> ${tool.status === "active" && renderTemplate`<div class="tool-header__trust" data-astro-cid-mqzpnqfb> <span class="trust-item" data-astro-cid-mqzpnqfb> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true" data-astro-cid-mqzpnqfb><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" data-astro-cid-mqzpnqfb></path></svg> ${t("tool.trust_serverless")} </span> <span class="trust-item" data-astro-cid-mqzpnqfb> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true" data-astro-cid-mqzpnqfb><circle cx="12" cy="12" r="10" data-astro-cid-mqzpnqfb></circle><polyline points="12 6 12 12 16 14" data-astro-cid-mqzpnqfb></polyline></svg> ${t("tool.trust_instant")} </span> <span class="trust-item" data-astro-cid-mqzpnqfb> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true" data-astro-cid-mqzpnqfb><rect x="3" y="11" width="18" height="11" rx="2" ry="2" data-astro-cid-mqzpnqfb></rect><path d="M7 11V7a5 5 0 0 1 10 0v4" data-astro-cid-mqzpnqfb></path></svg> ${t("tool.trust_private")} </span> <span class="trust-item" data-astro-cid-mqzpnqfb> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true" data-astro-cid-mqzpnqfb><line x1="12" y1="1" x2="12" y2="23" data-astro-cid-mqzpnqfb></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" data-astro-cid-mqzpnqfb></path></svg> ${t("tool.trust_free")} </span> </div>`} </header> <!-- Tool UI (Svelte island) --> <section class="tool-ui"${addAttribute(t("tool.ui_label"), "aria-label")} data-astro-cid-mqzpnqfb> ${tool.status === "active" ? renderTemplate`${renderSlot($$result2, $$slots["default"])}` : renderTemplate`<!-- Coming Soon fallback -->
        <div class="coming-soon-card" data-astro-cid-mqzpnqfb> <div class="coming-soon-card__icon" aria-hidden="true" data-astro-cid-mqzpnqfb>🚧</div> <h2 class="coming-soon-card__title" data-astro-cid-mqzpnqfb>${t("tool.coming_soon_title")}</h2> <p class="coming-soon-card__text" data-astro-cid-mqzpnqfb> ${t("tool.coming_soon_desc")} </p> <form class="coming-soon-form" action="/api/notify" method="post" data-astro-cid-mqzpnqfb> <input type="hidden" name="tool"${addAttribute(`${tool.category}/${tool.slug}`, "value")} data-astro-cid-mqzpnqfb> <input type="email" name="email"${addAttribute(t("tool.email_placeholder"), "placeholder")} class="input coming-soon-form__input" required${addAttribute(t("tool.notify_email_label"), "aria-label")} data-astro-cid-mqzpnqfb> <button type="submit" class="btn btn--primary" data-astro-cid-mqzpnqfb>${t("tool.notify_button")}</button> </form> <!-- Kapcsolódó aktív eszközök --> ${related.filter((r) => r.status === "active").length > 0 && renderTemplate`<div class="coming-soon-active" data-astro-cid-mqzpnqfb> <p class="coming-soon-active__label" data-astro-cid-mqzpnqfb>${t("tool.coming_soon_meanwhile")}</p> <div class="coming-soon-active__list" data-astro-cid-mqzpnqfb> ${related.filter((r) => r.status === "active").map((rel) => renderTemplate`<a${addAttribute(toolUrl(rel), "href")} class="btn btn--outline btn--sm" data-astro-cid-mqzpnqfb>${rel.h1}</a>`)} </div> </div>`} </div>`} </section> <!-- Bevezető szöveg --> ${tool.introText && renderTemplate`<section class="intro-section" aria-labelledby="intro-title" data-astro-cid-mqzpnqfb> <h2 id="intro-title" class="section-title" data-astro-cid-mqzpnqfb>${t("tool.intro_title")}</h2> <div class="intro-text" data-astro-cid-mqzpnqfb> <p data-astro-cid-mqzpnqfb>${tool.introText}</p> </div> </section>`} <!-- SEO Content szekciók (ToolContent) --> ${tool.content && renderTemplate`${renderComponent($$result2, "ToolContentSection", $$ToolContentSection, { "content": tool.content, "toolName": tool.h1, "data-astro-cid-mqzpnqfb": true })}`} <!-- FAQ --> ${tool.faq.length > 0 && renderTemplate`<section class="faq-section" aria-labelledby="faq-title" data-astro-cid-mqzpnqfb> <h2 id="faq-title" class="section-title" data-astro-cid-mqzpnqfb>${t("faq.title")}</h2> <dl class="faq-list" data-astro-cid-mqzpnqfb> ${tool.faq.map((item, i) => renderTemplate`<div class="faq-item" data-astro-cid-mqzpnqfb> <dt class="faq-item__q" data-astro-cid-mqzpnqfb> <button class="faq-toggle" aria-expanded="false"${addAttribute(`faq-answer-${i}`, "aria-controls")}${addAttribute(`faq-btn-${i}`, "id")} data-astro-cid-mqzpnqfb> <span data-astro-cid-mqzpnqfb>${item.q}</span> <svg class="faq-toggle__icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true" data-astro-cid-mqzpnqfb> <polyline points="6 9 12 15 18 9" data-astro-cid-mqzpnqfb></polyline> </svg> </button> </dt> <dd class="faq-item__a"${addAttribute(`faq-answer-${i}`, "id")} hidden data-astro-cid-mqzpnqfb> ${item.a} </dd> </div>`)} </dl> </section>`} <!-- Related tools --> ${related.length > 0 && renderTemplate`<section class="related-section" aria-labelledby="related-title" data-astro-cid-mqzpnqfb> <h2 id="related-title" class="section-title" data-astro-cid-mqzpnqfb>${t("tool.related")}</h2> <ul class="related-grid" role="list" data-astro-cid-mqzpnqfb> ${related.map((rel) => renderTemplate`<li data-astro-cid-mqzpnqfb> <a${addAttribute(toolUrl(rel), "href")}${addAttribute(`related-card ${rel.status === "coming-soon" ? "related-card--dim" : ""}`, "class")} data-astro-cid-mqzpnqfb> <div class="related-card__header" data-astro-cid-mqzpnqfb> <span class="related-card__icon" aria-hidden="true" data-astro-cid-mqzpnqfb> ${getCategoryInfo(rel.category)?.icon} </span> ${rel.status === "coming-soon" && renderTemplate`<span class="badge badge--coming-soon" data-astro-cid-mqzpnqfb>${t("tool.badge_coming")}</span>`} </div> <div class="related-card__title" data-astro-cid-mqzpnqfb>${rel.h1}</div> <p class="related-card__desc" data-astro-cid-mqzpnqfb>${rel.description}</p> </a> </li>`)} </ul> </section>`} </div> ` })}  ${renderScript($$result, "C:/dev/tool_house/src/layouts/ToolLayout.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/dev/tool_house/src/layouts/ToolLayout.astro", void 0);

function DynamicTool($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		// ============================================================
		// DynamicTool.svelte
		// Wrapper that dynamically imports and renders a tool component
		// by name. Used by the [category]/[slug].astro dynamic route.
		// ============================================================
		let componentName = fallback($$props['componentName'], "");

		let componentProps = fallback($$props['componentProps'], () => ({}), true);

		{
			$$renderer.push('<!--[-->');
			$$renderer.push(`<div class="tool-loading svelte-ugul17"><div class="tool-loading__spinner svelte-ugul17"></div></div>`);
		}

		$$renderer.push(`<!--]-->`);
		bind_props($$props, { componentName, componentProps });
	});
}

const $$Astro = createAstro("https://konvertalo.hu");
function getStaticPaths() {
  const tools = getAllTools();
  return tools.map((tool) => {
    const url = toolUrl(tool);
    const parts = url.split("/").filter(Boolean);
    return {
      params: { category: parts[0], slug: parts[1] },
      props: {
        tool,
        componentName: tool.component ?? "",
        componentProps: tool.componentProps ?? {}
      }
    };
  });
}
const $$slug = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { tool, componentName, componentProps: cProps } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "ToolLayout", $$ToolLayout, { "tool": tool }, { "default": ($$result2) => renderTemplate`${tool.status === "active" && componentName && renderTemplate`${renderComponent($$result2, "DynamicTool", DynamicTool, { "client:visible": true, "componentName": componentName, "componentProps": cProps, "client:component-hydration": "visible", "client:component-path": "C:/dev/tool_house/src/components/tools/DynamicTool.svelte", "client:component-export": "default" })}`}` })}`;
}, "C:/dev/tool_house/src/pages/[category]/[slug].astro", void 0);

const $$file = "C:/dev/tool_house/src/pages/[category]/[slug].astro";
const $$url = "/[category]/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
