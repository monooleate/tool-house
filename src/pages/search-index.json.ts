// src/pages/search-index.json.ts
// Nyelvre szűrt keresési index — build-időben generálódik (SSG), deploy-onként
// külön (HU vs RO). A kliens kereső-szigetek (SearchOverlay, SearchPage) ezt
// fetch-elik, így a tool-registry (és a másik nyelv tooljai) NEM kerül a kliens
// JS bundle-be. Lásd getVisibleTools / isToolVisibleInLang.
import type { APIRoute } from "astro";
import {
  getVisibleTools,
  getLocalizedTool,
  getVisibleCategories,
  getLocalizedCategory,
} from "../lib/tool-registry.ts";
import { CURRENT_LANG } from "../i18n/index.ts";
import { toolUrl, categoryUrl } from "../lib/url-utils.ts";

export const GET: APIRoute = () => {
  const lang = CURRENT_LANG;

  const tools = getVisibleTools(lang).map((t) => {
    const lt = getLocalizedTool(t, lang);
    return {
      slug: lt.slug,
      category: lt.category,
      h1: lt.h1,
      description: lt.description,
      keywords: lt.keywords ?? [],
      status: lt.status,
      url: toolUrl(lt, lang),
    };
  });

  const categories = getVisibleCategories(lang).map((c) => {
    const lc = getLocalizedCategory(c, lang);
    return { id: lc.id, label: lc.label, icon: lc.icon, color: lc.color, url: categoryUrl(lc.id, lang) };
  });

  return new Response(JSON.stringify({ tools, categories }), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
