// ============================================================
// Romanian (RO) translations – Fajl (File) + SEO category tools
// Slug-urile raman in maghiara; textul vizibil e in romana.
// Site name RO: "InstrumenteOnline"
// ============================================================

export const FAJL_RO: Record<
  string,
  { slug: string; title: string; h1: string; description: string; keywords: string[] }
> = {
  "zip-keszito": {
    slug: "creare-zip",
    title: "Creator arhiva ZIP online | Gratuit | InstrumenteOnline",
    h1: "Creare arhiva ZIP",
    description:
      "Impachetare fisiere in arhiva ZIP in browser, fara incarcare pe server. Drag & drop, indicator dimensiune.",
    keywords: [
      "creator zip",
      "zip creator online",
      "creare fisier zip",
      "impachetare zip online",
      "creare arhiva zip",
      "zip file creator free",
    ],
  },

  "zip-kibonto": {
    slug: "extragere-zip",
    title: "Extragere fisiere ZIP online | Unzip gratuit | InstrumenteOnline",
    h1: "Extragere arhiva ZIP",
    description:
      "Extragere fisiere ZIP in browser cu previzualizare continut si descarcare individuala. Fara server.",
    keywords: [
      "unzip online",
      "extragere zip",
      "dezarhivare zip",
      "deschidere fisier zip",
      "zip extract online",
      "unzip files free",
    ],
  },

  "hash-ellenorzo": {
    slug: "verificare-hash",
    title: "Verificare hash fisier | SHA-256, SHA-1 online | InstrumenteOnline",
    h1: "Verificare hash fisier",
    description:
      "Calculare hash SHA-256 si SHA-1 pentru fisiere in browser cu SubtleCrypto API. Sigur, fara server.",
    keywords: [
      "verificare hash",
      "sha256 checksum",
      "sha1 hash",
      "hash fisier online",
      "calcul hash",
      "file hash checker online",
    ],
  },

  "fajl-informacio": {
    slug: "informatii-fisier",
    title: "Informatii fisier online | MIME type | InstrumenteOnline",
    h1: "Informatii fisier",
    description:
      "Nume, dimensiune, tip, MIME type si data modificarii fisierului – cu File API, in browser.",
    keywords: [
      "informatii fisier",
      "file info",
      "mime type check",
      "dimensiune fisier",
      "verificare tip fisier",
      "file info online tool",
    ],
  },
};

export const SEO_RO: Record<
  string,
  { slug: string; title: string; h1: string; description: string; keywords: string[] }
> = {
  "title-meta-hossz": {
    slug: "verificare-title-meta",
    title: "Verificare lungime title si meta description online | InstrumenteOnline",
    h1: "Verificare title si meta description",
    description:
      "Verificare caractere si latime pixeli pentru SEO title si meta description cu previzualizare SERP. In browser.",
    keywords: [
      "lungime title tag",
      "lungime meta description",
      "seo check",
      "serp preview",
      "verificare title tag",
      "title meta length checker",
    ],
  },

  "utm-eltavolito": {
    slug: "eliminare-utm",
    title: "Eliminare parametri UTM din URL online | InstrumenteOnline",
    h1: "Eliminare parametri UTM",
    description:
      "Eliminare parametri UTM si tracking din URL (utm_source, fbclid etc.). Curatare URL rapida, in browser.",
    keywords: [
      "eliminare utm",
      "utm remove online",
      "curatare url tracking",
      "stergere parametri utm",
      "url cleaner utm",
      "remove utm parameters",
    ],
  },

  "url-normalizalo": {
    slug: "normalizare-url",
    title: "Normalizare URL online | Curatare URL | InstrumenteOnline",
    h1: "Normalizare URL",
    description:
      "Curatare URL: trailing slash, protocol, www, conversie la litere mici. Normalizare completa.",
    keywords: [
      "normalizare url",
      "url normalize online",
      "curatare url",
      "url cleaner",
      "url standardizare",
      "normalize url online",
    ],
  },

  "canonical-epito": {
    slug: "generator-canonical",
    title: "Generator tag canonical URL online | InstrumenteOnline",
    h1: "Generator tag canonical",
    description:
      "Generare cod HTML pentru tag canonical link pe baza URL-ului, copiere cu un singur clic.",
    keywords: [
      "canonical url",
      "canonical tag generator",
      "generator tag canonical",
      "link canonical html",
      "canonical url generator",
      "canonical tag tool",
    ],
  },

  "fajlnev-optimalizalo": {
    slug: "optimizare-nume-fisier",
    title: "Optimizare nume fisier SEO online | InstrumenteOnline",
    h1: "Optimizare nume fisier SEO",
    description:
      "Optimizare SEO a numelor de fisiere: diacritice, spatii, caractere speciale. URL-friendly automat.",
    keywords: [
      "optimizare nume fisier seo",
      "filename seo",
      "image filename seo",
      "redenumire fisiere seo",
      "seo filename optimizer",
      "seo file rename",
    ],
  },

  "alt-szoveg-sablon": {
    slug: "generator-text-alt",
    title: "Generator sablon text alt imagine online | InstrumenteOnline",
    h1: "Generator sablon text alt",
    description:
      "Generare in masa a textului alt pentru imagini pe baza sablonului, cu export CSV.",
    keywords: [
      "text alt imagine",
      "alt text generator",
      "alt tag seo",
      "generator alt text",
      "image alt text tool",
      "alt text template",
    ],
  },

  "robots-txt-ellenorzo": {
    slug: "verificare-robots-txt",
    title: "Verificare si testare robots.txt online | InstrumenteOnline",
    h1: "Verificare robots.txt",
    description:
      "Lipiti fisierul robots.txt si testati URL-uri: este crawling-ul permis? Verificare rapida, in browser.",
    keywords: [
      "robots txt tester",
      "verificare robots txt",
      "testare robots txt",
      "robots.txt validator",
      "robots txt checker online",
      "robots.txt tester free",
    ],
  },

  "sitemap-url-ellenorzo": {
    slug: "verificare-sitemap",
    title: "Verificare URL-uri sitemap online | InstrumenteOnline",
    h1: "Verificare URL-uri sitemap",
    description:
      "Lipiti un XML sitemap si listati URL-urile cu afisare status. Verificare rapida in browser.",
    keywords: [
      "verificare sitemap",
      "xml sitemap check",
      "validator sitemap",
      "sitemap url checker",
      "verificare url sitemap",
      "xml sitemap validator online",
    ],
  },
};
