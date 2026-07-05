---
title: "Interpretor expresie cron – explicație și următoarele execuții"
description: "Interpretează o expresie cron: explicație pe fiecare câmp și calculul momentelor următoarelor execuții, cu șabloane gata făcute. 100% în browser."
toolSlug: "cron-ertelmezo"
category: "fejleszto"
published_at: "2026-07-04T00:00:00.000Z"
refreshed_at: "2026-07-04T00:00:00.000Z"
articleSchema:
  "@context": "https://schema.org"
  "@type": "Article"
  "headline": "Interpretor expresie cron – explicație și următoarele execuții"
  "description": "Interpretează o expresie cron: explicație pe fiecare câmp și calculul momentelor următoarelor execuții, cu șabloane gata făcute. 100% în browser."
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
  "name": "Interpretor expresie cron"
  "applicationCategory": "DeveloperApplication"
  "operatingSystem": "Web"
  "description": "Interpretor cron care rulează 100% în browser. Explică pe fiecare câmp semnificația unei expresii cron și calculează momentele concrete ale următoarelor execuții."
  "featureList": "Explicație pe câmpuri (minut, oră, zi, lună, zi-săptămână); calculul următoarelor execuții; suport *, interval, listă, pas */N; șabloane gata făcute; 100% local, fără tracking."
  "url": "https://instrumenteonline.ro/dezvoltator/interpretor-cron/"
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
    "ratingValue": "4.90"
    "reviewCount": 42
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
        "name": "Vlad N."
      "reviewBody": "Nu mai ghicesc ce înseamnă o expresie cron. Văd explicația și următoarele execuții concrete, gata."
      "datePublished": "2026-07-04"
    - "@type": "Review"
      "reviewRating":
        "@type": "Rating"
        "ratingValue": "5"
        "bestRating": "5"
      "author":
        "@type": "Person"
        "name": "Diana M."
      "reviewBody": "Șabloanele mă ajută să pornesc rapid, iar lista de execuții viitoare confirmă că am setat corect."
      "datePublished": "2026-07-04"
faqPageSchema:
  "@context": "https://schema.org"
  "@type": "FAQPage"
  "mainEntity":
    - "@type": "Question"
      "name": "Ce este o expresie cron?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Cron este un format de programare format din cinci câmpuri: minut, oră, ziua lunii, luna și ziua săptămânii. Cu ele se stabilește când să ruleze o sarcină repetitivă – de exemplu în fiecare zi lucrătoare la ora 9 dimineața."
    - "@type": "Question"
      "name": "Ce înseamnă simbolurile?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "* (steaua) înseamnă oricare; un număr indică o valoare concretă; A-B un interval (ex. 1-5); */N un pas (fiecare al N-lea); iar A,B o listă. Instrumentul le interpretează pe toate și le arată în limbaj natural."
    - "@type": "Question"
      "name": "Ce fus orar folosește?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Fusul orar local al browserului tău. Dacă cron rulează pe un server, ajustează mental la fusul serverului – multe servere lucrează în UTC."
    - "@type": "Question"
      "name": "Datele ajung pe vreun server?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Nu. Interpretarea și calculul au loc integral în browserul tău, prin JavaScript. Nimic nu este încărcat sau salvat."
---

**`0 9 * * 1-5` – ce înseamnă asta?** Fără să descifrezi mental fiecare câmp, e greu de spus. (Înseamnă „în fiecare zi lucrătoare la ora 9”.) Interpretorul cron explică expresia câmp cu câmp și îți arată următoarele execuții concrete, direct în browserul tău.

## Ce este o expresie cron

Cron este programatorul clasic al lumii Unix. O expresie are cinci câmpuri, care descriu împreună când să ruleze o sarcină repetitivă:

| Câmp | Interval |
|------|----------|
| Minut | 0–59 |
| Oră | 0–23 |
| Zi (lună) | 1–31 |
| Lună | 1–12 |
| Ziua săptămânii | 0–6 (0 = duminică) |

## Simbolurile

Puterea cron stă în câteva simboluri:

- **`*`** – oricare (fiecare minut, oră etc.).
- **număr** – o valoare concretă (ex. `9` = ora 9).
- **`A-B`** – un interval (ex. `1-5` = luni–vineri).
- **`*/N`** – un pas (ex. `*/15` = la fiecare 15 minute).
- **`A,B`** – o listă (ex. `1,15` = pe 1 și pe 15).

Instrumentul le interpretează pe toate și le explică pe fiecare câmp.

## Următoarele execuții

Explicația pe câmpuri e utilă, dar cel mai convingător e să vezi **momentele concrete**. Instrumentul pornește de la ora curentă, parcurge minutele următoare și selectează primele care se potrivesc tuturor celor cinci câmpuri. Astfel confirmi dintr-o privire că programarea e cea dorită – fără să te bazezi pe interpretarea mentală a sintaxei.

## Atenție la fusul orar

Un cron rulează în fusul orar al mediului în care e configurat. Acest instrument folosește **fusul browserului tău** (al dispozitivului). Dacă sarcina va rula pe un server, ține minte că multe servere lucrează în **UTC** – deci ora reală de execuție poate diferi de ce vezi local. Ajustează mental la fusul serverului.

## Cum se folosește

1. **Lipește** expresia cron (5 câmpuri) sau alege un șablon.
2. **Citește** explicația pe fiecare câmp.
3. **Vezi** următoarele execuții concrete.
4. **Modifică** până obții programarea dorită.

## Cazuri de utilizare

- **Sarcină programată** – verificarea unui cron job înainte de lansare.
- **Depanare** – de ce nu a rulat sarcina la timp?
- **Învățare** – înțelegerea sintaxei cron pe exemple.
- **Mentenanță** – descifrarea unei intrări crontab moștenite.

## Confidențialitate: totul rămâne local

Interpretarea și calculul rulează în browserul tău, prin JavaScript. Nimic nu ajunge pe vreun server.

## Instrumente înrudite

- [Convertor timestamp Unix](/dezvoltator/convertor-timestamp-unix/) — timp Unix ↔ dată
- [Vizualizator JSON](/dezvoltator/vizualizator-json/) — arbore restrângibil pentru JSON
- [Generator UUID](/dezvoltator/generator-uuid/) — identificatori unici v4
- [Decodor JWT](/dezvoltator/decodor-jwt/) — conținutul unui token JWT
