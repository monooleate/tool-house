import { C as CURRENT_LANG } from './index_ChOr8V1l.mjs';

const CATEGORY_URLS = {
  hu: {
    kep: "kep",
    pdf: "pdf",
    adat: "adat",
    szoveg: "szoveg",
    fejleszto: "fejleszto",
    markdown: "markdown",
    html: "html",
    excel: "excel",
    fajl: "fajl",
    seo: "seo"
  },
  ro: {
    kep: "imagine",
    pdf: "pdf",
    adat: "date",
    szoveg: "text",
    fejleszto: "dezvoltator",
    markdown: "markdown",
    html: "html",
    excel: "excel",
    fajl: "fisiere",
    seo: "seo"
  }
};
const STATIC_URLS = {
  hu: {
    rolunk: "rolunk",
    kapcsolat: "kapcsolat",
    adatvedelmi: "adatvedelmi-nyilatkozat",
    koszonjuk: "koszonjuk",
    kereses: "kereses",
    aszf: "felhasznalasi-feltetelek"
  },
  ro: {
    rolunk: "despre-noi",
    kapcsolat: "contact",
    adatvedelmi: "politica-confidentialitate",
    koszonjuk: "multumim",
    kereses: "cautare",
    aszf: "termeni-conditii"
  }
};
function getCategoryUrl(catId, lang = CURRENT_LANG) {
  return CATEGORY_URLS[lang]?.[catId] ?? CATEGORY_URLS.hu[catId] ?? catId;
}
function getStaticUrl(key, lang = CURRENT_LANG) {
  return STATIC_URLS[lang]?.[key] ?? STATIC_URLS.hu[key] ?? key;
}

function toolUrl(tool, lang = CURRENT_LANG) {
  const catSlug = getCategoryUrl(tool.category, lang);
  const toolSlug = lang !== "hu" && tool.i18n?.[lang]?.slug || tool.slug;
  return `/${catSlug}/${toolSlug}`;
}
function categoryUrl(catId, lang = CURRENT_LANG) {
  return `/${getCategoryUrl(catId, lang)}`;
}
function staticUrl(key, lang = CURRENT_LANG) {
  return `/${getStaticUrl(key, lang)}`;
}

export { STATIC_URLS as S, categoryUrl as c, getStaticUrl as g, staticUrl as s, toolUrl as t };
