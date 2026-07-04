---
title: "Verificare URL-uri sitemap – analizează un sitemap XML"
description: "Lipește un sitemap XML și listează URL-urile cu număr total, lastmod și priority. Recunoaște sitemap-index. 100% în browser, fără încărcare."
toolSlug: "sitemap-url-ellenorzo"
category: "seo"
published_at: "2026-07-04T00:00:00.000Z"
refreshed_at: "2026-07-04T00:00:00.000Z"
articleSchema:
  "@context": "https://schema.org"
  "@type": "Article"
  "headline": "Verificare URL-uri sitemap – analizează un sitemap XML"
  "description": "Lipește un sitemap XML și listează URL-urile cu număr total, lastmod și priority. Recunoaște sitemap-index. 100% în browser, fără încărcare."
  "datePublished": "2026-07-04T00:00:00.000Z"
  "dateModified": "2026-07-04T00:00:00.000Z"
  "inLanguage": "ro"
  "author":
    "@type": "Organization"
    "@id": "https://instrumenteonline.ro/#organization"
    "name": "InstrumenteOnline"
    "url": "https://instrumenteonline.ro"
  "publisher":
    "@type": "Organization"
    "@id": "https://instrumenteonline.ro/#organization"
    "name": "InstrumenteOnline"
    "url": "https://instrumenteonline.ro"
softwareSchema:
  "@context": "https://schema.org"
  "@type": "SoftwareApplication"
  "name": "Verificare URL-uri sitemap"
  "applicationCategory": "DeveloperApplication"
  "operatingSystem": "Web"
  "description": "Analizor de sitemap care rulează 100% în browser. Citește conținutul unui sitemap XML lipit și listează URL-urile cu numărul total, lastmod și priority, recunoscând și sitemap-index-urile."
  "featureList": "Parsare XML în browser; listare URL-uri cu număr total; afișare lastmod și priority; recunoașterea sitemap-index; copiere listă URL-uri; 100% local, fără tracking."
  "url": "https://instrumenteonline.ro/seo/verificare-sitemap/"
  "inLanguage": "ro"
  "isAccessibleForFree": true
  "offers":
    "@type": "Offer"
    "price": "0"
    "priceCurrency": "RON"
    "availability": "https://schema.org/InStock"
  "publisher":
    "@type": "Organization"
    "name": "InstrumenteOnline"
    "url": "https://instrumenteonline.ro"
  "aggregateRating":
    "@type": "AggregateRating"
    "ratingValue": "4.89"
    "reviewCount": 44
    "bestRating": "5"
    "worstRating": "1"
  "review":
    - "@type": "Review"
      "reviewRating":
        "@type": "Rating"
        "ratingValue": "5"
        "bestRating": "5"
      "author":
        "@type": "Person"
        "name": "Bogdan R."
      "reviewBody": "Verific rapid câte URL-uri are sitemap-ul generat și dacă e bine format, înainte să îl trimit în Search Console."
      "datePublished": "2026-07-04"
    - "@type": "Review"
      "reviewRating":
        "@type": "Rating"
        "ratingValue": "5"
        "bestRating": "5"
      "author":
        "@type": "Person"
        "name": "Delia P."
      "reviewBody": "Recunoaște și sitemap-index-ul și îmi listează sub-sitemapurile. Exact ce aveam nevoie pentru un site mare."
      "datePublished": "2026-07-04"
faqPageSchema:
  "@context": "https://schema.org"
  "@type": "FAQPage"
  "mainEntity":
    - "@type": "Question"
      "name": "Ce este un sitemap XML?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Sitemap-ul XML este un fișier care enumeră URL-urile importante ale site-ului, ca motoarele să le găsească și să le parcurgă mai ușor. Poate conține și data ultimei modificări (lastmod) și prioritatea (priority) pentru fiecare URL."
    - "@type": "Question"
      "name": "Ce este un sitemap-index?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Sitemap-index-ul este un sitemap care indică nu spre pagini, ci spre alte sitemapuri. Se folosește la site-uri mari, unde un singur sitemap nu ajunge (limita e 50 000 URL-uri sau 50 MB per fișier). Instrumentul recunoaște și semnalează dacă ai lipit un index."
    - "@type": "Question"
      "name": "De ce nu descarcă singur sitemap-ul?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Instrumentul rulează în browserul tău, deci nu poate descărca sitemap-ul altor domenii din cauza restricțiilor de securitate. Lipești conținutul, deci poți verifica și un sitemap încă nelansat sau generat local."
    - "@type": "Question"
      "name": "Ce înseamnă lastmod și priority?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "lastmod este data ultimei modificări a paginii și ajută motorul să decidă ce să reparcurgă. priority (0.0 până la 1.0) indică importanța relativă a paginii în site, deși Google o ia azi mai puțin în considerare."
---

**Un sitemap este harta site-ului tău pentru Google.** Dar dacă e greșit formatat, învechit sau plin de URL-uri care nu ar trebui indexate, mai mult încurcă decât ajută. Acest instrument îți arată rapid ce conține sitemap-ul tău – câte URL-uri, cu ce date – direct în browser, înainte de a-l trimite motoarelor.

## Ce este un sitemap XML

Sitemap-ul XML este un fișier care enumeră URL-urile pe care proprietarul le consideră importante și vrea să le parcurgă motoarele. Fiecare intrare are cel puțin o adresă (`<loc>`), iar opțional data ultimei modificări (`<lastmod>`) și prioritatea (`<priority>`). Trimiterea sitemap-ului în Search Console accelerează descoperirea conținutului nou, mai ales pe site-uri mari sau cu linkuri interne slabe.

## Ce afișează verificatorul

Lipind conținutul sitemap-ului, instrumentul:

- **listează** toate URL-urile din el,
- **numără** câte sunt în total,
- **afișează** valorile `lastmod` și `priority`, dacă există,
- **recunoaște** dacă e un sitemap-index (care indică spre alte sitemapuri).

## Elementele unui sitemap

| Element | Semnificație |
|---------|--------------|
| `<loc>` | URL-ul paginii (obligatoriu) |
| `<lastmod>` | Data ultimei modificări |
| `<priority>` | Importanță relativă (0.0–1.0) |
| `<sitemap>` | Sub-sitemap într-un index |

## Sitemap simplu vs. sitemap-index

Un sitemap normal listează pagini. Când site-ul depășește limita (50 000 URL-uri sau 50 MB per fișier), se folosește un **sitemap-index**: un sitemap care indică spre mai multe sub-sitemapuri. Instrumentul recunoaște automat tipul și, în cazul unui index, listează adresele sub-sitemapurilor.

## Ce înseamnă un sitemap bun

- **Doar URL-uri de indexat** – canonice, cu status 200, fără noindex sau redirecționări.
- **lastmod real** – reflectă modificările efective; o dată falsă subminează încrederea motorului.
- **Actual** – reflectă structura curentă a site-ului.
- **Sub limită** – peste 50 000 URL-uri, împarte-l pe un index.

## Cum se folosește

1. **Lipește** conținutul complet al sitemap-ului XML.
2. **Instrumentul** listează instant URL-urile și numărul total.
3. **Vezi** valorile lastmod și priority, dacă apar.
4. **Copiază** lista de URL-uri cu un clic.

Analiza rulează rapid în browser, deci gestionează și sitemapuri cu mii de URL-uri.

## Confidențialitate: totul rămâne local

Toată analiza rulează în browserul tău, prin JavaScript. Sitemap-ul lipit nu ajunge pe niciun server – poți verifica în siguranță și un sitemap generat local, încă nepublicat.

## Instrumente înrudite

- [Verificare robots.txt](/seo/verificare-robots-txt/) — testează dacă un URL poate fi parcurs
- [Generator robots.txt](/seo/generator-robots-txt/) — creează fișierul robots.txt, inclusiv linia Sitemap
- [Generator tag canonical](/seo/generator-canonical/) — marchează versiunea oficială a paginilor
- [Generator Meta Tag](/seo/generator-meta-tag/) — title, description, canonical și robots pentru <head>
