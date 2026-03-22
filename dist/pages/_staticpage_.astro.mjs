import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, d as createAstro, f as Fragment, u as unescapeHTML, b as addAttribute, e as renderScript } from '../chunks/astro/server_DXlwJyk-.mjs';
import 'piccolore';
import { c as categoryUrl, t as toolUrl, s as staticUrl, S as STATIC_URLS } from '../chunks/url-utils_j3NlhMwn.mjs';
import { S as SITE_NAME, $ as $$BaseLayout, g as SITE_URL, h as SITE_DESCRIPTION, f as faqSchema, b as breadcrumbSchema } from '../chunks/BaseLayout_BLqZPMWH.mjs';
import { a as attr, e as escape_html, c as ensure_array_like, d as attr_style, s as stringify, g as attr_class } from '../chunks/_@astro-renderers_BTphoX3x.mjs';
export { r as renderers } from '../chunks/_@astro-renderers_BTphoX3x.mjs';
import { d as getAllTools, a as getLocalizedTool, j as getLocalizedCategories, u as ui, k as getActiveToolsCount, l as getTotalToolsCount, C as CATEGORIES } from '../chunks/tool-registry_BYgjEAb5.mjs';
/* empty css                                        */
import { t, a as tpl, b as CURRENT_CONFIG, C as CURRENT_LANG } from '../chunks/index_ChOr8V1l.mjs';

function SearchPage($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let // ============================================================
			// SearchPage.svelte – Dedikált keresőoldal komponens
			// URL ?q= paraméterből indul, interaktív szűrés
			// ============================================================
			// URL-ből olvassuk a kezdő query-t
			// ─── Keresés ────────────────────────────────────────────────
			results,
			// URL frissítése query változásakor (history replace, nem push)
			// Kategória stat a találatokból
			resultsByCategory;

		const allTools = getAllTools().map((t) => getLocalizedTool(t));
		const activeTools = allTools.filter((t) => t.status === "active");
		const localCats = getLocalizedCategories();
		let query = "";

		// ─── Keresés ────────────────────────────────────────────────
		results = query.trim().length < 1
			? activeTools
			: allTools.filter((t) => {
				const q = query.toLowerCase();

				return t.h1.toLowerCase().includes(q) || t.description.toLowerCase().includes(q) || t.keywords.some((k) => k.includes(q)) || t.category.includes(q);
			});

		// URL frissítése query változásakor (history replace, nem push)
		if (typeof window !== "undefined") {
			const url = new URL(window.location.href);

			if (query.trim()) {
				url.searchParams.set("q", query.trim());
			} else {
				url.searchParams.delete("q");
			}

			window.history.replaceState({}, "", url.toString());
		}

		// Kategória stat a találatokból
		resultsByCategory = (() => {
			const counts = {};

			for (const r of results) {
				counts[r.category] = (counts[r.category] || 0) + 1;
			}

			return counts;
		})();

		$$renderer.push(`<div class="search-page"><div class="sp-input-wrap svelte-1aax9pg"><svg class="sp-search-icon svelte-1aax9pg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.35-4.35"></path></svg> <input${attr('value', query)} type="search"${attr('placeholder', ui.searchPlaceholder)} class="sp-input svelte-1aax9pg" autocomplete="off" spellcheck="false"${attr('aria-label', ui.searchLabel)}/> `);

		{
			$$renderer.push('<!--[!-->');
		}

		$$renderer.push(`<!--]--></div> <div class="sp-status svelte-1aax9pg">`);

		if (query.trim()) {
			$$renderer.push('<!--[-->');
			$$renderer.push(`<span class="sp-status__count svelte-1aax9pg">${escape_html(results.length)} ${escape_html(ui.resultsFor)}</span> <span class="sp-status__query svelte-1aax9pg">${escape_html(ui.searchFor)} <strong class="svelte-1aax9pg">${escape_html(query)}</strong></span>`);
		} else {
			$$renderer.push('<!--[!-->');
			$$renderer.push(`<span class="sp-status__count svelte-1aax9pg">${escape_html(activeTools.length)} ${escape_html(ui.availableTools)}</span>`);
		}

		$$renderer.push(`<!--]--> `);

		if (results.length > 0) {
			$$renderer.push('<!--[-->');
			$$renderer.push(`<div class="sp-cats svelte-1aax9pg"><!--[-->`);

			const each_array = ensure_array_like(localCats);

			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let cat = each_array[$$index];

				if (resultsByCategory[cat.id]) {
					$$renderer.push('<!--[-->');
					$$renderer.push(`<span class="sp-cat-pill svelte-1aax9pg"${attr_style(`--cat-c: ${stringify(cat.color)}`)}>${escape_html(cat.icon)} ${escape_html(cat.label)} <span class="sp-cat-pill__n svelte-1aax9pg">${escape_html(resultsByCategory[cat.id])}</span></span>`);
				} else {
					$$renderer.push('<!--[!-->');
				}

				$$renderer.push(`<!--]-->`);
			}

			$$renderer.push(`<!--]--></div>`);
		} else {
			$$renderer.push('<!--[!-->');
		}

		$$renderer.push(`<!--]--></div> `);

		if (results.length === 0) {
			$$renderer.push('<!--[-->');
			$$renderer.push(`<div class="sp-empty svelte-1aax9pg"><div class="sp-empty__icon svelte-1aax9pg">🔍</div> <p class="sp-empty__text svelte-1aax9pg">${escape_html(ui.noResults)} <strong>${escape_html(query)}</strong></p> <p class="sp-empty__hint svelte-1aax9pg">${escape_html(ui.noResultsHint)}</p> <div class="sp-empty__cats svelte-1aax9pg"><!--[-->`);

			const each_array_1 = ensure_array_like(localCats);

			for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
				let cat = each_array_1[$$index_1];

				$$renderer.push(`<a${attr('href', categoryUrl(cat.id))} class="sp-empty__cat-link svelte-1aax9pg">${escape_html(cat.icon)} ${escape_html(cat.label)}</a>`);
			}

			$$renderer.push(`<!--]--></div></div>`);
		} else {
			$$renderer.push('<!--[!-->');
			$$renderer.push(`<div class="sp-grid svelte-1aax9pg"><!--[-->`);

			const each_array_2 = ensure_array_like(results);

			for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
				let tool = each_array_2[$$index_2];
				const cat = localCats.find((c) => c.id === tool.category);

				$$renderer.push(`<a${attr('href', toolUrl(tool))}${attr_class('sp-card svelte-1aax9pg', void 0, { 'sp-card--coming': tool.status === "coming-soon" })}><div class="sp-card__top svelte-1aax9pg"><span class="sp-card__cat svelte-1aax9pg"${attr_style(`color: ${stringify(cat?.color)}`)}>${escape_html(cat?.icon)} ${escape_html(cat?.label)}</span> `);

				if (tool.status === "coming-soon") {
					$$renderer.push('<!--[-->');
					$$renderer.push(`<span class="sp-card__badge svelte-1aax9pg">${escape_html(ui.comingSoon)}</span>`);
				} else {
					$$renderer.push('<!--[!-->');
				}

				$$renderer.push(`<!--]--></div> <div class="sp-card__title svelte-1aax9pg">${escape_html(tool.h1)}</div> <p class="sp-card__desc svelte-1aax9pg">${escape_html(tool.description)}</p> <span class="sp-card__cta svelte-1aax9pg">${escape_html(tool.status === "active" ? ui.openTool : ui.details)} <span class="sp-card__arrow svelte-1aax9pg">→</span></span></a>`);
			}

			$$renderer.push(`<!--]--></div>`);
		}

		$$renderer.push(`<!--]--></div>`);
	});
}

const $$KeresPage = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": `${t("nav.search_text")} | ${SITE_NAME}`, "description": t("nav.search_label"), "canonical": staticUrl("kereses"), "noIndex": true, "data-astro-cid-ady57ovj": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="search-hero container" data-astro-cid-ady57ovj> <h1 class="search-hero__title" data-astro-cid-ady57ovj> <span class="search-hero__icon" aria-hidden="true" data-astro-cid-ady57ovj>🔍</span> ${t("nav.search_text")} </h1> <p class="search-hero__desc" data-astro-cid-ady57ovj>${t("nav.search_label")}</p> </section> <section class="container search-container" data-astro-cid-ady57ovj> ${renderComponent($$result2, "SearchPage", SearchPage, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/dev/tool_house/src/components/ui/SearchPage.svelte", "client:component-export": "default", "data-astro-cid-ady57ovj": true })} </section> ` })} `;
}, "C:/dev/tool_house/src/components/static-pages/KeresPage.astro", void 0);

const $$Astro$1 = createAstro("https://konvertalo.hu");
const $$RolunkPage = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$RolunkPage;
  const activeCount = getActiveToolsCount();
  const totalCount = getTotalToolsCount();
  const catCount = CATEGORIES.length;
  const sn = CURRENT_CONFIG.siteName;
  const faqs = [
    { q: tpl("about.faq1_q", { siteName: sn }), a: t("about.faq1_a") },
    { q: tpl("about.faq2_q", { siteName: sn }), a: t("about.faq2_a") },
    { q: t("about.faq3_q"), a: t("about.faq3_a") },
    { q: t("about.faq4_q"), a: t("about.faq4_a") }
  ];
  const personSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    name: "M\xE9sz\xE1ros J\xE1nos",
    url: "https://jmeszaros.dev",
    jobTitle: t("about.schema_job"),
    worksFor: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL
    },
    sameAs: ["https://jmeszaros.dev"]
  });
  const aboutSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: tpl("about.schema_name", { siteName: CURRENT_CONFIG.siteName }),
    url: `${SITE_URL}${staticUrl("rolunk")}`,
    description: tpl("about.schema_desc", { siteName: CURRENT_CONFIG.siteName }),
    mainEntity: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      founder: {
        "@type": "Person",
        name: "M\xE9sz\xE1ros J\xE1nos",
        url: "https://jmeszaros.dev"
      }
    }
  });
  const faqSchemaStr = faqSchema(faqs);
  const schemas = [
    breadcrumbSchema([
      { name: t("about.breadcrumb_home"), href: "/" },
      { name: t("about.breadcrumb_about"), href: staticUrl("rolunk") }
    ]),
    personSchema,
    aboutSchema,
    ...faqSchemaStr ? [faqSchemaStr] : []
  ];
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": tpl("about.meta_title", { siteName: CURRENT_CONFIG.siteName }), "description": tpl("about.meta_desc", { siteName: CURRENT_CONFIG.siteName }), "canonical": staticUrl("rolunk"), "schemaScripts": schemas, "data-astro-cid-x3x47txf": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="about-page container" data-astro-cid-x3x47txf> <header class="about-header" data-astro-cid-x3x47txf> <nav class="about-breadcrumb" aria-label="Breadcrumb" data-astro-cid-x3x47txf> <a href="/" data-astro-cid-x3x47txf>${t("about.breadcrumb_home")}</a> <span aria-hidden="true" data-astro-cid-x3x47txf>›</span> <span data-astro-cid-x3x47txf>${t("about.breadcrumb_about")}</span> </nav> <h1 class="about-title" data-astro-cid-x3x47txf>${tpl("about.heading", { siteName: CURRENT_CONFIG.siteName })}</h1> <p class="about-desc" data-astro-cid-x3x47txf> ${t("about.desc")} </p> </header> <!-- ═══ MISSZIÓ ══════════════════════════════════════════════ --> <section class="about-section" aria-labelledby="misszio-title" data-astro-cid-x3x47txf> <h2 id="misszio-title" class="about-section__title" data-astro-cid-x3x47txf> <span class="about-section__icon" aria-hidden="true" data-astro-cid-x3x47txf>🎯</span> ${t("about.mission_title")} </h2> <div class="about-section__body" data-astro-cid-x3x47txf> <p data-astro-cid-x3x47txf>${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate`${unescapeHTML(tpl("about.mission_p1", { siteName: CURRENT_CONFIG.siteName }))}` })}</p> <p data-astro-cid-x3x47txf>${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate`${unescapeHTML(tpl("about.mission_p2", { siteName: CURRENT_CONFIG.siteName }))}` })}</p> </div> </section> <!-- ═══ STATISZTIKÁK ═════════════════════════════════════════ --> <div class="about-stats" data-astro-cid-x3x47txf> <div class="about-stat" data-astro-cid-x3x47txf> <span class="about-stat__num" data-astro-cid-x3x47txf>${activeCount}</span> <span class="about-stat__label" data-astro-cid-x3x47txf>${t("about.stat_active")}</span> </div> <div class="about-stat" data-astro-cid-x3x47txf> <span class="about-stat__num" data-astro-cid-x3x47txf>${totalCount}</span> <span class="about-stat__label" data-astro-cid-x3x47txf>${t("about.stat_total")}</span> </div> <div class="about-stat" data-astro-cid-x3x47txf> <span class="about-stat__num" data-astro-cid-x3x47txf>${catCount}</span> <span class="about-stat__label" data-astro-cid-x3x47txf>${t("about.stat_category")}</span> </div> <div class="about-stat" data-astro-cid-x3x47txf> <span class="about-stat__num" data-astro-cid-x3x47txf>0</span> <span class="about-stat__label" data-astro-cid-x3x47txf>${t("about.stat_upload")}</span> </div> </div> <!-- ═══ CSAPAT ═══════════════════════════════════════════════ --> <section class="about-section" aria-labelledby="csapat-title" data-astro-cid-x3x47txf> <h2 id="csapat-title" class="about-section__title" data-astro-cid-x3x47txf> <span class="about-section__icon" aria-hidden="true" data-astro-cid-x3x47txf>👥</span> ${t("about.team_title")} </h2> <div class="team-grid" data-astro-cid-x3x47txf> <!-- Mészáros János --> <div class="team-card team-card--featured" data-astro-cid-x3x47txf> <div class="team-card__avatar" data-astro-cid-x3x47txf> <span class="team-card__avatar-emoji" aria-hidden="true" data-astro-cid-x3x47txf>👨‍💻</span> </div> <div class="team-card__info" data-astro-cid-x3x47txf> <h3 class="team-card__name" data-astro-cid-x3x47txf>Mészáros János</h3> <p class="team-card__role" data-astro-cid-x3x47txf>${t("about.dev_role")}</p> <p class="team-card__bio" data-astro-cid-x3x47txf> ${tpl("about.dev_bio", { siteName: CURRENT_CONFIG.siteName })} </p> <div class="team-card__links" data-astro-cid-x3x47txf> <a href="https://jmeszaros.dev" target="_blank" rel="noopener" class="team-card__link" data-astro-cid-x3x47txf> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" data-astro-cid-x3x47txf> <circle cx="12" cy="12" r="10" data-astro-cid-x3x47txf></circle><path d="M2 12h20" data-astro-cid-x3x47txf></path><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" data-astro-cid-x3x47txf></path> </svg>
jmeszaros.dev
</a> </div> <div class="team-card__tags" data-astro-cid-x3x47txf> <span class="team-tag" data-astro-cid-x3x47txf>Astro</span> <span class="team-tag" data-astro-cid-x3x47txf>Svelte</span> <span class="team-tag" data-astro-cid-x3x47txf>TypeScript</span> <span class="team-tag" data-astro-cid-x3x47txf>Web Workers</span> <span class="team-tag" data-astro-cid-x3x47txf>Netlify</span> </div> </div> </div> <!-- SEOTudás.hu --> <div class="team-card" data-astro-cid-x3x47txf> <div class="team-card__avatar" data-astro-cid-x3x47txf> <span class="team-card__avatar-emoji" aria-hidden="true" data-astro-cid-x3x47txf>📈</span> </div> <div class="team-card__info" data-astro-cid-x3x47txf> <h3 class="team-card__name" data-astro-cid-x3x47txf>SEOTudás.hu</h3> <p class="team-card__role" data-astro-cid-x3x47txf>${t("about.seo_role")}</p> <p class="team-card__bio" data-astro-cid-x3x47txf> ${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate`${unescapeHTML(t("about.seo_bio"))}` })} </p> <div class="team-card__links" data-astro-cid-x3x47txf> <a href="https://seotudas.hu" target="_blank" rel="noopener" class="team-card__link" data-astro-cid-x3x47txf> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" data-astro-cid-x3x47txf> <circle cx="12" cy="12" r="10" data-astro-cid-x3x47txf></circle><path d="M2 12h20" data-astro-cid-x3x47txf></path><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" data-astro-cid-x3x47txf></path> </svg>
seotudas.hu
</a> </div> <div class="team-card__tags" data-astro-cid-x3x47txf> <span class="team-tag" data-astro-cid-x3x47txf>Technikai SEO</span> <span class="team-tag" data-astro-cid-x3x47txf>On-page SEO</span> <span class="team-tag" data-astro-cid-x3x47txf>Core Web Vitals</span> </div> </div> </div> </div> </section> <!-- ═══ TECHNOLÓGIA ══════════════════════════════════════════ --> <section class="about-section" aria-labelledby="tech-title" data-astro-cid-x3x47txf> <h2 id="tech-title" class="about-section__title" data-astro-cid-x3x47txf> <span class="about-section__icon" aria-hidden="true" data-astro-cid-x3x47txf>⚙️</span> ${t("about.tech_title")} </h2> <div class="about-section__body" data-astro-cid-x3x47txf> <p data-astro-cid-x3x47txf>${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate`${unescapeHTML(tpl("about.tech_intro", { siteName: CURRENT_CONFIG.siteName }))}` })}</p> </div> <div class="tech-grid" data-astro-cid-x3x47txf> <div class="tech-card" data-astro-cid-x3x47txf> <strong data-astro-cid-x3x47txf>Astro SSG</strong> <span data-astro-cid-x3x47txf>${t("about.tech_astro")}</span> </div> <div class="tech-card" data-astro-cid-x3x47txf> <strong data-astro-cid-x3x47txf>Svelte</strong> <span data-astro-cid-x3x47txf>${t("about.tech_svelte")}</span> </div> <div class="tech-card" data-astro-cid-x3x47txf> <strong data-astro-cid-x3x47txf>Web Workers</strong> <span data-astro-cid-x3x47txf>${t("about.tech_workers")}</span> </div> <div class="tech-card" data-astro-cid-x3x47txf> <strong data-astro-cid-x3x47txf>Netlify</strong> <span data-astro-cid-x3x47txf>${t("about.tech_netlify")}</span> </div> <div class="tech-card" data-astro-cid-x3x47txf> <strong data-astro-cid-x3x47txf>Google Analytics 4</strong> <span data-astro-cid-x3x47txf>${t("about.tech_ga4")}</span> </div> <div class="tech-card" data-astro-cid-x3x47txf> <strong data-astro-cid-x3x47txf>TypeScript</strong> <span data-astro-cid-x3x47txf>${t("about.tech_ts")}</span> </div> </div> </section> <!-- ═══ KAPCSOLÓDÓ PROJEKTEK (csak HU) ════════════════════════ --> ${renderTemplate`<section class="about-section" aria-labelledby="projects-title" data-astro-cid-x3x47txf> <h2 id="projects-title" class="about-section__title" data-astro-cid-x3x47txf> <span class="about-section__icon" aria-hidden="true" data-astro-cid-x3x47txf>🔗</span> ${t("about.projects_title")} </h2> <div class="projects-grid" data-astro-cid-x3x47txf> <a href="https://matekmegoldasok.hu" target="_blank" rel="noopener" class="project-card" data-astro-cid-x3x47txf> <div class="project-card__icon" aria-hidden="true" data-astro-cid-x3x47txf>📐</div> <div class="project-card__info" data-astro-cid-x3x47txf> <h3 class="project-card__name" data-astro-cid-x3x47txf>MatekMegoldások.hu</h3> <p class="project-card__desc" data-astro-cid-x3x47txf>${t("about.project_matek_desc")}</p> </div> <span class="project-card__arrow" aria-hidden="true" data-astro-cid-x3x47txf>→</span> </a> <a href="https://seotudas.hu" target="_blank" rel="noopener" class="project-card" data-astro-cid-x3x47txf> <div class="project-card__icon" aria-hidden="true" data-astro-cid-x3x47txf>📈</div> <div class="project-card__info" data-astro-cid-x3x47txf> <h3 class="project-card__name" data-astro-cid-x3x47txf>SEOTudás.hu</h3> <p class="project-card__desc" data-astro-cid-x3x47txf>${tpl("about.project_seo_desc", { siteName: CURRENT_CONFIG.siteName })}</p> </div> <span class="project-card__arrow" aria-hidden="true" data-astro-cid-x3x47txf>→</span> </a> <a href="https://hazepitesikalauz.hu" target="_blank" rel="noopener" class="project-card" data-astro-cid-x3x47txf> <div class="project-card__icon" aria-hidden="true" data-astro-cid-x3x47txf>🏠</div> <div class="project-card__info" data-astro-cid-x3x47txf> <h3 class="project-card__name" data-astro-cid-x3x47txf>HázépítésiKalauz.hu</h3> <p class="project-card__desc" data-astro-cid-x3x47txf>${t("about.project_haz_desc")}</p> </div> <span class="project-card__arrow" aria-hidden="true" data-astro-cid-x3x47txf>→</span> </a> <a href="https://iparimegoldasok.hu" target="_blank" rel="noopener" class="project-card" data-astro-cid-x3x47txf> <div class="project-card__icon" aria-hidden="true" data-astro-cid-x3x47txf>🏭</div> <div class="project-card__info" data-astro-cid-x3x47txf> <h3 class="project-card__name" data-astro-cid-x3x47txf>IpariMegoldások.hu</h3> <p class="project-card__desc" data-astro-cid-x3x47txf>${t("about.project_ipari_desc")}</p> </div> <span class="project-card__arrow" aria-hidden="true" data-astro-cid-x3x47txf>→</span> </a> </div> </section>`} <!-- ═══ GYIK ═════════════════════════════════════════════════ --> <section class="about-section" aria-labelledby="faq-title" data-astro-cid-x3x47txf> <h2 id="faq-title" class="about-section__title" data-astro-cid-x3x47txf> <span class="about-section__icon" aria-hidden="true" data-astro-cid-x3x47txf>❓</span> ${t("about.faq_title")} </h2> <div class="faq-grid" data-astro-cid-x3x47txf> ${faqs.map((faq) => renderTemplate`<div class="faq-card" data-astro-cid-x3x47txf> <h3 class="faq-card__q" data-astro-cid-x3x47txf>${faq.q}</h3> <p class="faq-card__a" data-astro-cid-x3x47txf>${faq.a}</p> </div>`)} </div> </section> <!-- ═══ CTA ══════════════════════════════════════════════════ --> <section class="about-cta" data-astro-cid-x3x47txf> <div class="about-cta__inner" data-astro-cid-x3x47txf> <h2 class="about-cta__title" data-astro-cid-x3x47txf>${t("about.cta_title")}</h2> <p class="about-cta__desc" data-astro-cid-x3x47txf>${t("about.cta_desc")}</p> <div class="about-cta__actions" data-astro-cid-x3x47txf> <a${addAttribute(staticUrl("kapcsolat"), "href")} class="btn btn--primary btn--lg" data-astro-cid-x3x47txf>${t("about.cta_contact")}</a> <a href="/" class="btn btn--outline btn--lg" data-astro-cid-x3x47txf>${t("about.cta_tools")}</a> </div> </div> </section> </div> ` })} `;
}, "C:/dev/tool_house/src/components/static-pages/RolunkPage.astro", void 0);

const $$KapcsolatPage = createComponent(($$result, $$props, $$slots) => {
  const schemas = [
    breadcrumbSchema([
      { name: t("contact.breadcrumb_home"), href: "/" },
      { name: t("contact.breadcrumb"), href: staticUrl("kapcsolat") }
    ])
  ];
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": tpl("contact.meta_title", { siteName: CURRENT_CONFIG.siteName }), "description": tpl("contact.meta_desc", { siteName: CURRENT_CONFIG.siteName }), "canonical": staticUrl("kapcsolat"), "schemaScripts": schemas, "data-astro-cid-oeuwhmd3": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="contact-page container" data-astro-cid-oeuwhmd3> <header class="contact-header" data-astro-cid-oeuwhmd3> <nav class="contact-breadcrumb" aria-label="Breadcrumb" data-astro-cid-oeuwhmd3> <a href="/" data-astro-cid-oeuwhmd3>${t("contact.breadcrumb_home")}</a> <span aria-hidden="true" data-astro-cid-oeuwhmd3>›</span> <span data-astro-cid-oeuwhmd3>${t("contact.breadcrumb")}</span> </nav> <h1 class="contact-title" data-astro-cid-oeuwhmd3>${t("contact.heading")}</h1> <p class="contact-desc" data-astro-cid-oeuwhmd3> ${t("contact.desc")} </p> </header> <div class="contact-grid" data-astro-cid-oeuwhmd3> <!-- Kapcsolati űrlap --> <div class="contact-form-wrap" data-astro-cid-oeuwhmd3> <form name="contact" method="POST"${addAttribute(staticUrl("koszonjuk"), "action")} data-netlify="true" netlify-honeypot="bot-field" class="contact-form" id="contact-form" data-astro-cid-oeuwhmd3> <input type="hidden" name="form-name" value="contact" data-astro-cid-oeuwhmd3> <!-- Honeypot (spam védelem – rejtett mező) --> <p class="hp-field" aria-hidden="true" data-astro-cid-oeuwhmd3> <label data-astro-cid-oeuwhmd3>${t("contact.hp_label")} <input name="bot-field" tabindex="-1" autocomplete="off" data-astro-cid-oeuwhmd3></label> </p> <div class="form-group" data-astro-cid-oeuwhmd3> <label for="name" class="form-label" data-astro-cid-oeuwhmd3>${t("contact.name_label")} <span class="form-required" data-astro-cid-oeuwhmd3>*</span></label> <input type="text" id="name" name="name" required${addAttribute(t("contact.name_placeholder"), "placeholder")} class="form-input" autocomplete="name" data-astro-cid-oeuwhmd3> </div> <div class="form-group" data-astro-cid-oeuwhmd3> <label for="email" class="form-label" data-astro-cid-oeuwhmd3>${t("contact.email_label")} <span class="form-required" data-astro-cid-oeuwhmd3>*</span></label> <input type="email" id="email" name="email" required${addAttribute(t("contact.email_placeholder"), "placeholder")} class="form-input" autocomplete="email" data-astro-cid-oeuwhmd3> </div> <div class="form-group" data-astro-cid-oeuwhmd3> <label for="subject" class="form-label" data-astro-cid-oeuwhmd3>${t("contact.subject_label")} <span class="form-required" data-astro-cid-oeuwhmd3>*</span></label> <select id="subject" name="subject" required class="form-input form-select" data-astro-cid-oeuwhmd3> <option value="" disabled selected data-astro-cid-oeuwhmd3>${t("contact.subject_default")}</option> <option value="kerdes" data-astro-cid-oeuwhmd3>${t("contact.subject_question")}</option> <option value="hiba" data-astro-cid-oeuwhmd3>${t("contact.subject_bug")}</option> <option value="eszkoz-otlet" data-astro-cid-oeuwhmd3>${t("contact.subject_idea")}</option> <option value="egyuttmukodes" data-astro-cid-oeuwhmd3>${t("contact.subject_collab")}</option> <option value="egyeb" data-astro-cid-oeuwhmd3>${t("contact.subject_other")}</option> </select> </div> <div class="form-group" data-astro-cid-oeuwhmd3> <label for="message" class="form-label" data-astro-cid-oeuwhmd3>${t("contact.message_label")} <span class="form-required" data-astro-cid-oeuwhmd3>*</span></label> <textarea id="message" name="message" required rows="6"${addAttribute(t("contact.message_placeholder"), "placeholder")} class="form-input form-textarea" data-astro-cid-oeuwhmd3></textarea> </div> <button type="submit" class="btn btn--primary btn--lg contact-submit" id="contact-submit"${addAttribute(t("contact.submit"), "data-submit-text")}${addAttribute(t("contact.submitting"), "data-submitting-text")} data-astro-cid-oeuwhmd3> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true" data-astro-cid-oeuwhmd3> <path d="M22 2L11 13" data-astro-cid-oeuwhmd3></path><path d="M22 2L15 22L11 13L2 9L22 2" data-astro-cid-oeuwhmd3></path> </svg> ${t("contact.submit")} </button> </form> </div> <!-- Oldalsáv infók --> <aside class="contact-sidebar" data-astro-cid-oeuwhmd3> <div class="contact-info-card" data-astro-cid-oeuwhmd3> <div class="contact-info-card__icon" aria-hidden="true" data-astro-cid-oeuwhmd3>📧</div> <h3 class="contact-info-card__title" data-astro-cid-oeuwhmd3>${t("contact.sidebar_email_title")}</h3> <a${addAttribute("mailto:" + t("contact.email_address"), "href")} class="contact-info-card__link" data-astro-cid-oeuwhmd3>${t("contact.email_address")}</a> </div> <div class="contact-info-card" data-astro-cid-oeuwhmd3> <div class="contact-info-card__icon" aria-hidden="true" data-astro-cid-oeuwhmd3>🌐</div> <h3 class="contact-info-card__title" data-astro-cid-oeuwhmd3>${t("contact.sidebar_web_title")}</h3> <a href="https://jmeszaros.dev" target="_blank" rel="noopener" class="contact-info-card__link" data-astro-cid-oeuwhmd3>jmeszaros.dev</a> </div> <div class="contact-info-card" data-astro-cid-oeuwhmd3> <div class="contact-info-card__icon" aria-hidden="true" data-astro-cid-oeuwhmd3>⚡</div> <h3 class="contact-info-card__title" data-astro-cid-oeuwhmd3>${t("contact.sidebar_response_title")}</h3> <p class="contact-info-card__text" data-astro-cid-oeuwhmd3>${t("contact.sidebar_response_time")}</p> </div> <div class="contact-info-card contact-info-card--highlight" data-astro-cid-oeuwhmd3> <div class="contact-info-card__icon" aria-hidden="true" data-astro-cid-oeuwhmd3>💡</div> <h3 class="contact-info-card__title" data-astro-cid-oeuwhmd3>${t("contact.sidebar_bug_title")}</h3> <p class="contact-info-card__text" data-astro-cid-oeuwhmd3>${t("contact.sidebar_bug_desc")}</p> </div> </aside> </div> </div> ` })}  ${renderScript($$result, "C:/dev/tool_house/src/components/static-pages/KapcsolatPage.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/dev/tool_house/src/components/static-pages/KapcsolatPage.astro", void 0);

const $$KoszonjukPage = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": tpl("thankyou.meta_title", { siteName: CURRENT_CONFIG.siteName }), "description": t("thankyou.meta_desc"), "noIndex": true, "data-astro-cid-ioze4v43": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="thankyou-page container" data-astro-cid-ioze4v43> <div class="thankyou-icon" aria-hidden="true" data-astro-cid-ioze4v43>✅</div> <h1 class="thankyou-title" data-astro-cid-ioze4v43>${t("thankyou.heading")}</h1> <p class="thankyou-desc" data-astro-cid-ioze4v43> ${t("thankyou.desc")} </p> <div class="thankyou-actions" data-astro-cid-ioze4v43> <a href="/" class="btn btn--primary btn--lg" data-astro-cid-ioze4v43>${t("thankyou.back_home")}</a> <a${addAttribute(staticUrl("kapcsolat"), "href")} class="btn btn--outline" data-astro-cid-ioze4v43>${t("thankyou.new_message")}</a> </div> </div> ` })} `;
}, "C:/dev/tool_house/src/components/static-pages/KoszonjukPage.astro", void 0);

const $$AdatvedelmiPage = createComponent(($$result, $$props, $$slots) => {
  const sn = CURRENT_CONFIG.siteName;
  const contactEmail = t("contact.email_address");
  const schemas = [
    breadcrumbSchema([
      { name: t("privacy.breadcrumb_home"), href: "/" },
      { name: t("privacy.breadcrumb"), href: staticUrl("adatvedelmi") }
    ])
  ];
  const lastUpdated = "2025-06-01";
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": tpl("privacy.meta_title", { siteName: sn }), "description": tpl("privacy.meta_desc", { siteName: sn }), "canonical": staticUrl("adatvedelmi"), "schemaScripts": schemas, "data-astro-cid-fpxhpmyy": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="legal-page container" data-astro-cid-fpxhpmyy> <header class="legal-header" data-astro-cid-fpxhpmyy> <nav class="legal-breadcrumb" aria-label="Breadcrumb" data-astro-cid-fpxhpmyy> <a href="/" data-astro-cid-fpxhpmyy>${t("privacy.breadcrumb_home")}</a> <span aria-hidden="true" data-astro-cid-fpxhpmyy>›</span> <span data-astro-cid-fpxhpmyy>${t("privacy.breadcrumb")}</span> </nav> <h1 class="legal-title" data-astro-cid-fpxhpmyy>${t("privacy.heading")}</h1> <p class="legal-updated" data-astro-cid-fpxhpmyy>${t("privacy.last_updated")} ${lastUpdated}</p> </header> <div class="legal-body" data-astro-cid-fpxhpmyy> <!-- Összefoglaló --> <section class="legal-section" data-astro-cid-fpxhpmyy> <div class="legal-highlight" data-astro-cid-fpxhpmyy> <span class="legal-highlight__icon" aria-hidden="true" data-astro-cid-fpxhpmyy>🔒</span> <div data-astro-cid-fpxhpmyy>${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate`${unescapeHTML(tpl("privacy.summary", { siteName: sn }))}` })}</div> </div> </section> <!-- 1. Adatkezelő --> <section class="legal-section" data-astro-cid-fpxhpmyy> <h2 class="legal-section__title" id="adatkezelo" data-astro-cid-fpxhpmyy>${t("privacy.s1_title")}</h2> <p data-astro-cid-fpxhpmyy>${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate`${unescapeHTML(t("privacy.s1_text"))}` })}</p> <ul data-astro-cid-fpxhpmyy> <li data-astro-cid-fpxhpmyy>${t("privacy.s1_website")} <a${addAttribute(SITE_URL, "href")} data-astro-cid-fpxhpmyy>${SITE_NAME}</a></li> <li data-astro-cid-fpxhpmyy>${t("privacy.s1_email")} <a${addAttribute("mailto:" + contactEmail, "href")} data-astro-cid-fpxhpmyy>${contactEmail}</a></li> </ul> </section> <!-- 2. Adatfeldolgozási elvek --> <section class="legal-section" data-astro-cid-fpxhpmyy> <h2 class="legal-section__title" id="adatfeldolgozas" data-astro-cid-fpxhpmyy>${t("privacy.s2_title")}</h2> <p data-astro-cid-fpxhpmyy>${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate`${unescapeHTML(tpl("privacy.s2_intro", { siteName: sn }))}` })}</p> <ul data-astro-cid-fpxhpmyy> <li data-astro-cid-fpxhpmyy>${t("privacy.s2_li1")}</li> <li data-astro-cid-fpxhpmyy>${t("privacy.s2_li2")}</li> <li data-astro-cid-fpxhpmyy>${t("privacy.s2_li3")}</li> <li data-astro-cid-fpxhpmyy>${t("privacy.s2_li4")}</li> </ul> </section> <!-- 3. Személyes adatok --> <section class="legal-section" data-astro-cid-fpxhpmyy> <h2 class="legal-section__title" id="szemelyes-adatok" data-astro-cid-fpxhpmyy>${t("privacy.s3_title")}</h2> <p data-astro-cid-fpxhpmyy>${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate`${unescapeHTML(tpl("privacy.s3_intro", { siteName: sn }))}` })}</p> <h3 class="legal-subsection" data-astro-cid-fpxhpmyy>${t("privacy.s3_1_title")}</h3> <p data-astro-cid-fpxhpmyy>${t("privacy.s3_1_text")}</p> <h3 class="legal-subsection" data-astro-cid-fpxhpmyy>${t("privacy.s3_2_title")}</h3> <p data-astro-cid-fpxhpmyy>${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate`${unescapeHTML(t("privacy.s3_2_text"))}` })}</p> <ul data-astro-cid-fpxhpmyy> <li data-astro-cid-fpxhpmyy>${t("privacy.s3_2_li1")}</li> <li data-astro-cid-fpxhpmyy>${t("privacy.s3_2_li2")}</li> <li data-astro-cid-fpxhpmyy>${t("privacy.s3_2_li3")}</li> <li data-astro-cid-fpxhpmyy>${t("privacy.s3_2_li4")}</li> </ul> <p data-astro-cid-fpxhpmyy>${t("privacy.s3_2_details")}</p> </section> <!-- 4. Cookie (süti) szabályzat --> <section class="legal-section" data-astro-cid-fpxhpmyy> <h2 class="legal-section__title" id="cookie-szabalyzat" data-astro-cid-fpxhpmyy>${t("privacy.s4_title")}</h2> <p data-astro-cid-fpxhpmyy>${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate`${unescapeHTML(tpl("privacy.s4_intro", { siteName: sn }))}` })}</p> <div class="cookie-table-wrap" data-astro-cid-fpxhpmyy> <table class="cookie-table" data-astro-cid-fpxhpmyy> <thead data-astro-cid-fpxhpmyy> <tr data-astro-cid-fpxhpmyy> <th data-astro-cid-fpxhpmyy>${t("privacy.s4_th_name")}</th> <th data-astro-cid-fpxhpmyy>${t("privacy.s4_th_type")}</th> <th data-astro-cid-fpxhpmyy>${t("privacy.s4_th_purpose")}</th> <th data-astro-cid-fpxhpmyy>${t("privacy.s4_th_expiry")}</th> </tr> </thead> <tbody data-astro-cid-fpxhpmyy> <tr data-astro-cid-fpxhpmyy> <td data-astro-cid-fpxhpmyy><code data-astro-cid-fpxhpmyy>theme</code></td> <td data-astro-cid-fpxhpmyy>${t("privacy.s4_theme_type")}</td> <td data-astro-cid-fpxhpmyy>${t("privacy.s4_theme_purpose")}</td> <td data-astro-cid-fpxhpmyy>${t("privacy.s4_theme_expiry")}</td> </tr> <tr data-astro-cid-fpxhpmyy> <td data-astro-cid-fpxhpmyy><code data-astro-cid-fpxhpmyy>_ga</code></td> <td data-astro-cid-fpxhpmyy>${t("privacy.s4_ga_type")}</td> <td data-astro-cid-fpxhpmyy>${t("privacy.s4_ga_purpose")}</td> <td data-astro-cid-fpxhpmyy>${t("privacy.s4_ga_expiry")}</td> </tr> <tr data-astro-cid-fpxhpmyy> <td data-astro-cid-fpxhpmyy><code data-astro-cid-fpxhpmyy>_ga_*</code></td> <td data-astro-cid-fpxhpmyy>${t("privacy.s4_ga_type")}</td> <td data-astro-cid-fpxhpmyy>${t("privacy.s4_ga4_purpose")}</td> <td data-astro-cid-fpxhpmyy>${t("privacy.s4_ga_expiry")}</td> </tr> </tbody> </table> </div> <h3 class="legal-subsection" data-astro-cid-fpxhpmyy>${t("privacy.s4_not_used")}</h3> <ul class="legal-no-list" data-astro-cid-fpxhpmyy> <li data-astro-cid-fpxhpmyy><span class="legal-no" aria-hidden="true" data-astro-cid-fpxhpmyy>✕</span> ${t("privacy.s4_no1")}</li> <li data-astro-cid-fpxhpmyy><span class="legal-no" aria-hidden="true" data-astro-cid-fpxhpmyy>✕</span> ${t("privacy.s4_no2")}</li> <li data-astro-cid-fpxhpmyy><span class="legal-no" aria-hidden="true" data-astro-cid-fpxhpmyy>✕</span> ${t("privacy.s4_no3")}</li> <li data-astro-cid-fpxhpmyy><span class="legal-no" aria-hidden="true" data-astro-cid-fpxhpmyy>✕</span> ${t("privacy.s4_no4")}</li> </ul> <p class="legal-note" data-astro-cid-fpxhpmyy>${t("privacy.s4_note")}</p> </section> <!-- 5. Harmadik féltől származó szolgáltatások --> <section class="legal-section" data-astro-cid-fpxhpmyy> <h2 class="legal-section__title" id="harmadik-fel" data-astro-cid-fpxhpmyy>${t("privacy.s5_title")}</h2> <div class="cookie-table-wrap" data-astro-cid-fpxhpmyy> <table class="cookie-table" data-astro-cid-fpxhpmyy> <thead data-astro-cid-fpxhpmyy> <tr data-astro-cid-fpxhpmyy> <th data-astro-cid-fpxhpmyy>${t("privacy.s5_th_service")}</th> <th data-astro-cid-fpxhpmyy>${t("privacy.s5_th_purpose")}</th> <th data-astro-cid-fpxhpmyy>${t("privacy.s5_th_link")}</th> </tr> </thead> <tbody data-astro-cid-fpxhpmyy> <tr data-astro-cid-fpxhpmyy> <td data-astro-cid-fpxhpmyy>Netlify</td> <td data-astro-cid-fpxhpmyy>${t("privacy.s5_netlify_purpose")}</td> <td data-astro-cid-fpxhpmyy><a href="https://www.netlify.com/privacy/" target="_blank" rel="noopener" data-astro-cid-fpxhpmyy>netlify.com/privacy</a></td> </tr> <tr data-astro-cid-fpxhpmyy> <td data-astro-cid-fpxhpmyy>Google Analytics 4</td> <td data-astro-cid-fpxhpmyy>${t("privacy.s5_ga4_purpose")}</td> <td data-astro-cid-fpxhpmyy><a href="https://policies.google.com/privacy" target="_blank" rel="noopener" data-astro-cid-fpxhpmyy>policies.google.com/privacy</a></td> </tr> <tr data-astro-cid-fpxhpmyy> <td data-astro-cid-fpxhpmyy>Google Fonts</td> <td data-astro-cid-fpxhpmyy>${t("privacy.s5_fonts_purpose")}</td> <td data-astro-cid-fpxhpmyy><a href="https://policies.google.com/privacy" target="_blank" rel="noopener" data-astro-cid-fpxhpmyy>policies.google.com/privacy</a></td> </tr> </tbody> </table> </div> </section> <!-- 6. Adatbiztonság --> <section class="legal-section" data-astro-cid-fpxhpmyy> <h2 class="legal-section__title" id="adatbiztonsag" data-astro-cid-fpxhpmyy>${t("privacy.s6_title")}</h2> <ul data-astro-cid-fpxhpmyy> <li data-astro-cid-fpxhpmyy>${t("privacy.s6_li1")}</li> <li data-astro-cid-fpxhpmyy>${t("privacy.s6_li2")}</li> <li data-astro-cid-fpxhpmyy>${t("privacy.s6_li3")}</li> <li data-astro-cid-fpxhpmyy>${t("privacy.s6_li4")}</li> </ul> </section> <!-- 7. Jogaid --> <section class="legal-section" data-astro-cid-fpxhpmyy> <h2 class="legal-section__title" id="jogaid" data-astro-cid-fpxhpmyy>${t("privacy.s7_title")}</h2> <p data-astro-cid-fpxhpmyy>${t("privacy.s7_intro")}</p> <ul data-astro-cid-fpxhpmyy> <li data-astro-cid-fpxhpmyy>${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate`${unescapeHTML(t("privacy.s7_li1"))}` })}</li> <li data-astro-cid-fpxhpmyy>${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate`${unescapeHTML(t("privacy.s7_li2"))}` })}</li> <li data-astro-cid-fpxhpmyy>${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate`${unescapeHTML(t("privacy.s7_li3"))}` })}</li> <li data-astro-cid-fpxhpmyy>${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate`${unescapeHTML(t("privacy.s7_li4"))}` })}</li> <li data-astro-cid-fpxhpmyy>${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate`${unescapeHTML(t("privacy.s7_li5"))}` })}</li> </ul> <p data-astro-cid-fpxhpmyy>${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate`${unescapeHTML(tpl("privacy.s7_contact", { email: contactEmail }))}` })}</p> ${t("privacy.s7_authority_hu") && renderTemplate`<p data-astro-cid-fpxhpmyy>${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate`${unescapeHTML(t("privacy.s7_authority_hu"))}` })}</p>`} ${CURRENT_LANG === "ro"} </section> <!-- 8. Módosítások --> <section class="legal-section" data-astro-cid-fpxhpmyy> <h2 class="legal-section__title" id="modositasok" data-astro-cid-fpxhpmyy>${t("privacy.s8_title")}</h2> <p data-astro-cid-fpxhpmyy>${t("privacy.s8_text")}</p> </section> </div> </div> ` })} `;
}, "C:/dev/tool_house/src/components/static-pages/AdatvedelmiPage.astro", void 0);

const $$AszfPage = createComponent(($$result, $$props, $$slots) => {
  const sn = CURRENT_CONFIG.siteName;
  const contactEmail = t("contact.email_address");
  const schemas = [
    breadcrumbSchema([
      { name: t("tos.breadcrumb_home"), href: "/" },
      { name: t("tos.breadcrumb"), href: staticUrl("aszf") }
    ])
  ];
  const lastUpdated = "2026-03-22";
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": tpl("tos.meta_title", { siteName: sn }), "description": tpl("tos.meta_desc", { siteName: sn }), "canonical": staticUrl("aszf"), "schemaScripts": schemas, "data-astro-cid-z5dwe6ak": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="legal-page container" data-astro-cid-z5dwe6ak> <header class="legal-header" data-astro-cid-z5dwe6ak> <nav class="legal-breadcrumb" aria-label="Breadcrumb" data-astro-cid-z5dwe6ak> <a href="/" data-astro-cid-z5dwe6ak>${t("tos.breadcrumb_home")}</a> <span aria-hidden="true" data-astro-cid-z5dwe6ak>›</span> <span data-astro-cid-z5dwe6ak>${t("tos.breadcrumb")}</span> </nav> <h1 class="legal-title" data-astro-cid-z5dwe6ak>${t("tos.heading")}</h1> <p class="legal-updated" data-astro-cid-z5dwe6ak>${t("tos.last_updated")} ${lastUpdated}</p> </header> <div class="legal-body" data-astro-cid-z5dwe6ak> <section class="legal-section" data-astro-cid-z5dwe6ak> <div class="legal-highlight" data-astro-cid-z5dwe6ak> <span class="legal-highlight__icon" aria-hidden="true" data-astro-cid-z5dwe6ak>📋</span> <div data-astro-cid-z5dwe6ak>${tpl("tos.intro", { siteName: sn })}</div> </div> </section> <section class="legal-section" data-astro-cid-z5dwe6ak> <h2 class="legal-section__title" id="szolgaltatas" data-astro-cid-z5dwe6ak>${t("tos.s1_title")}</h2> <p data-astro-cid-z5dwe6ak>${tpl("tos.s1_p1", { siteName: sn })}</p> </section> <section class="legal-section" data-astro-cid-z5dwe6ak> <h2 class="legal-section__title" id="hasznalat" data-astro-cid-z5dwe6ak>${t("tos.s2_title")}</h2> <p data-astro-cid-z5dwe6ak>${t("tos.s2_p1")}</p> <p data-astro-cid-z5dwe6ak>${t("tos.s2_p2")}</p> </section> <section class="legal-section" data-astro-cid-z5dwe6ak> <h2 class="legal-section__title" id="felelosseg" data-astro-cid-z5dwe6ak>${t("tos.s3_title")}</h2> <p data-astro-cid-z5dwe6ak>${t("tos.s3_p1")}</p> <p data-astro-cid-z5dwe6ak>${t("tos.s3_p2")}</p> </section> <section class="legal-section" data-astro-cid-z5dwe6ak> <h2 class="legal-section__title" id="szellemi-tulajdon" data-astro-cid-z5dwe6ak>${t("tos.s4_title")}</h2> <p data-astro-cid-z5dwe6ak>${tpl("tos.s4_p1", { siteName: sn })}</p> </section> <section class="legal-section" data-astro-cid-z5dwe6ak> <h2 class="legal-section__title" id="adatvedelem" data-astro-cid-z5dwe6ak>${t("tos.s5_title")}</h2> <p data-astro-cid-z5dwe6ak>${t("tos.s5_p1")}</p> <p data-astro-cid-z5dwe6ak><a${addAttribute(staticUrl("adatvedelmi"), "href")} data-astro-cid-z5dwe6ak>${t("tos.privacy_link")}</a></p> </section> <section class="legal-section" data-astro-cid-z5dwe6ak> <h2 class="legal-section__title" id="modositasok" data-astro-cid-z5dwe6ak>${t("tos.s6_title")}</h2> <p data-astro-cid-z5dwe6ak>${t("tos.s6_p1")}</p> </section> <section class="legal-section" data-astro-cid-z5dwe6ak> <h2 class="legal-section__title" id="kapcsolat" data-astro-cid-z5dwe6ak>${t("tos.s7_title")}</h2> <p data-astro-cid-z5dwe6ak>${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate`${unescapeHTML(tpl("tos.s7_p1", { email: contactEmail }))}` })}</p> </section> </div> </div> ` })} `;
}, "C:/dev/tool_house/src/components/static-pages/AszfPage.astro", void 0);

const $$Astro = createAstro("https://konvertalo.hu");
function getStaticPaths() {
  const lang = "hu";
  const urls = STATIC_URLS[lang] ?? STATIC_URLS.hu;
  return Object.entries(urls).map(([key, slug]) => ({
    params: { staticPage: slug },
    props: { pageKey: key }
  }));
}
const $$staticPage = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$staticPage;
  const PAGE_COMPONENTS = {
    rolunk: $$RolunkPage,
    kapcsolat: $$KapcsolatPage,
    kereses: $$KeresPage,
    koszonjuk: $$KoszonjukPage,
    adatvedelmi: $$AdatvedelmiPage,
    aszf: $$AszfPage
  };
  const { pageKey } = Astro2.props;
  const PageComponent = PAGE_COMPONENTS[pageKey];
  return renderTemplate`${renderComponent($$result, "PageComponent", PageComponent, {})}`;
}, "C:/dev/tool_house/src/pages/[staticPage].astro", void 0);
const $$file = "C:/dev/tool_house/src/pages/[staticPage].astro";
const $$url = "/[staticPage]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$staticPage,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
