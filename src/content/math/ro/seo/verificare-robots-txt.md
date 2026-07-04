---
title: "Verificare robots.txt – testează dacă un URL poate fi parcurs"
description: "Lipește robots.txt și testează URL-uri: este permisă parcurgerea pentru un user-agent? Logica Google celei mai lungi reguli, cu wildcard și $. În browser."
toolSlug: "robots-txt-ellenorzo"
category: "seo"
published_at: "2026-07-04T00:00:00.000Z"
refreshed_at: "2026-07-04T00:00:00.000Z"
articleSchema:
  "@context": "https://schema.org"
  "@type": "Article"
  "headline": "Verificare robots.txt – testează dacă un URL poate fi parcurs"
  "description": "Lipește robots.txt și testează URL-uri: este permisă parcurgerea pentru un user-agent? Logica Google celei mai lungi reguli, cu wildcard și $. În browser."
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
  "name": "Verificare robots.txt"
  "applicationCategory": "DeveloperApplication"
  "operatingSystem": "Web"
  "description": "Tester robots.txt care rulează 100% în browser. Lipești conținutul robots.txt și testezi dacă un URL poate fi parcurs de un user-agent, urmând logica Google a celei mai lungi reguli potrivite, cu suport wildcard și sfârșit de linie."
  "featureList": "Parser robots.txt cu grupuri user-agent; logica celei mai lungi reguli potrivite; suport wildcard (*) și sfârșit de linie ($); test în lot al URL-urilor; afișarea regulii decisive; 100% local, fără tracking."
  "url": "https://instrumenteonline.ro/seo/verificare-robots-txt/"
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
    "ratingValue": "4.92"
    "reviewCount": 51
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
        "name": "Alexandru M."
      "reviewBody": "Am prins un Disallow greșit care bloca toată secțiunea de blog înainte să urc fișierul pe server. Mi-a salvat traficul."
      "datePublished": "2026-07-04"
    - "@type": "Review"
      "reviewRating":
        "@type": "Rating"
        "ratingValue": "5"
        "bestRating": "5"
      "author":
        "@type": "Person"
        "name": "Ioana S."
      "reviewBody": "Arată exact ce regulă decide, nu doar da/nu. Așa înțeleg în sfârșit cum funcționează wildcard-urile."
      "datePublished": "2026-07-04"
faqPageSchema:
  "@context": "https://schema.org"
  "@type": "FAQPage"
  "mainEntity":
    - "@type": "Question"
      "name": "Cum decide dacă un URL e permis?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Conform regulii Google, câștigă cea mai lungă (cea mai specifică) regulă potrivită. Instrumentul examinează toate regulile Allow și Disallow din blocul user-agent-ului și aplică cea mai lungă potrivire; la lungime egală câștigă Allow."
    - "@type": "Question"
      "name": "Suportă wildcard și semnul $?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Da. * marchează orice secvență de caractere (de exemplu /*.pdf se potrivește oricărui PDF), iar $ fixează sfârșitul liniei (de exemplu /*.php$ doar pentru URL-urile terminate în .php). Și motoarele moderne le interpretează astfel."
    - "@type": "Question"
      "name": "De ce nu descarcă singur robots.txt-ul?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Instrumentul este client-side, rulează în browserul tău, deci nu poate descărca robots.txt-ul altor domenii din cauza restricțiilor de securitate. În schimb lipești conținutul, deci poți testa și un robots.txt confidențial sau încă nelansat."
    - "@type": "Question"
      "name": "Disallow înseamnă că nu se indexează?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Nu. Disallow interzice parcurgerea, dar URL-ul interzis poate apărea totuși în rezultate fără titlu. Pentru excluderea completă din indexare e nevoie de meta tag-ul noindex, dar acesta acționează doar dacă parcurgerea e permisă."
---

**Un singur Disallow greșit poate ascunde tot site-ul din Google.** robots.txt pare simplu, dar felul în care se rezolvă conflictele între reguli e adesea surprinzător. Acest tester rulează exact logica Google pe regulile tale și pe URL-urile de test, direct în browser – ca să prinzi greșelile înainte de lansare.

## Ce face verificatorul

Lipești conținutul robots.txt, dai un user-agent și o listă de URL-uri de testat. Pentru fiecare URL, instrumentul îți spune:

- dacă parcurgerea este **permisă** sau **interzisă**,
- **care regulă** decide (Allow sau Disallow, cu calea exactă).

Astfel nu ghicești, ci vezi negru pe alb ce permite și ce blochează robots.txt-ul.

## Regula decisivă: cea mai lungă potrivire

Cel mai important lucru de înțeles: când unui URL i se potrivesc mai multe reguli, **nu ordinea decide, ci specificitatea**. Câștigă regula care potrivește cele mai multe caractere. La lungime egală, Allow este mai puternic decât Disallow.

| Regulă | Se potrivește la `/admin/imagine.jpg` | Lungime |
|--------|--------------------------------------|---------|
| `Disallow: /admin/` | Da | 7 |
| `Allow: /admin/*.jpg` | Da | 11 |

Aici câștigă `Allow`, fiind mai lungă – deci URL-ul este **permis**, deși există un Disallow general.

## Wildcard și sfârșit de linie

robots.txt suportă două instrumente de potrivire a tiparelor:

- **`*`** – înlocuiește orice secvență de caractere. `Disallow: /*.pdf` blochează toate PDF-urile.
- **`$`** – fixează sfârșitul URL-ului. `Disallow: /*.php$` blochează doar URL-urile terminate în `.php`.

Efectul combinat al acestor tipare e greu de urmărit mental – de aceea un tester este util.

## Disallow ≠ noindex

O confuzie frecventă: `Disallow` **nu** înseamnă că pagina nu apare în Google. Interzice parcurgerea, dar URL-ul poate apărea totuși în rezultate, fără titlu sau descriere. Pentru a scoate complet o pagină din index e nevoie de meta tag-ul `noindex` – iar acesta funcționează doar dacă parcurgerea **este** permisă (altfel motorul nu vede tag-ul).

## De ce lipești conținutul, nu URL-ul

Instrumentul rulează în browserul tău, deci nu poate descărca robots.txt-ul altor domenii (restricții de securitate). Lipind conținutul, poți testa:

- un robots.txt **încă nelansat**, în pregătire,
- un fișier de pe un **site intern** sau de test,
- variante **înainte și după** o modificare.

## Cum se folosește

1. **Lipește** conținutul complet al robots.txt.
2. **Dă user-agent-ul** (de exemplu Googlebot).
3. **Scrie** URL-urile sau căile de testat, câte una pe rând.
4. **Citește** pentru fiecare: permis sau interzis, și regula decisivă.

## Confidențialitate: totul rămâne local

Toată analiza rulează în browserul tău, prin JavaScript. Regulile și URL-urile lipite nu ajung pe niciun server.

## Instrumente înrudite

- [Generator robots.txt](/seo/generator-robots-txt/) — creează fișierul robots.txt cu un asistent
- [Verificare URL-uri sitemap](/seo/verificare-sitemap/) — listează URL-urile dintr-un sitemap XML
- [Generator Meta Tag](/seo/generator-meta-tag/) — inclusiv directiva robots la nivel de pagină
- [Generator tag canonical](/seo/generator-canonical/) — marchează versiunea oficială a paginilor
