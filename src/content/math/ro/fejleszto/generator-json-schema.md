---
title: "Generator JSON Schema – schemă dintr-un exemplu JSON"
description: "Generează automat JSON Schema (draft-07) dintr-un exemplu JSON, prin inferența tipurilor. Pentru validare, documentare și contracte API. 100% în browser."
toolSlug: "json-schema"
category: "fejleszto"
published_at: "2026-07-04T00:00:00.000Z"
refreshed_at: "2026-07-04T00:00:00.000Z"
articleSchema:
  "@context": "https://schema.org"
  "@type": "Article"
  "headline": "Generator JSON Schema – schemă dintr-un exemplu JSON"
  "description": "Generează automat JSON Schema (draft-07) dintr-un exemplu JSON, prin inferența tipurilor. Pentru validare, documentare și contracte API. 100% în browser."
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
  "name": "Generator JSON Schema"
  "applicationCategory": "DeveloperApplication"
  "operatingSystem": "Web"
  "description": "Generator de JSON Schema care rulează 100% în browser. Produce o schemă draft-07 dintr-un exemplu JSON prin inferența tipurilor, cu marcarea opțională a câmpurilor obligatorii."
  "featureList": "Inferența tipurilor (string, integer, number, boolean, object, array); JSON Schema draft-07; marcare required opțională; items din primul element de tablou; copiere cu un clic; 100% local, fără tracking."
  "url": "https://instrumenteonline.ro/dezvoltator/generator-json-schema/"
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
    "reviewCount": 39
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
        "name": "Dan R."
      "reviewBody": "Lipesc un răspuns API real și primesc scheletul schemei în secunde. Apoi doar rafinez câmpurile opționale."
      "datePublished": "2026-07-04"
    - "@type": "Review"
      "reviewRating":
        "@type": "Rating"
        "ratingValue": "5"
        "bestRating": "5"
      "author":
        "@type": "Person"
        "name": "Ioana T."
      "reviewBody": "Folosesc schema pentru validarea datelor de intrare. M-a scutit de scrierea manuală a zeci de câmpuri."
      "datePublished": "2026-07-04"
faqPageSchema:
  "@context": "https://schema.org"
  "@type": "FAQPage"
  "mainEntity":
    - "@type": "Question"
      "name": "Ce este JSON Schema?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "JSON Schema este un standard prin care se descrie structura așteptată a unor date JSON: ce câmpuri, cu ce tip, care sunt obligatorii. Se poate folosi pentru validarea datelor și pentru documentare."
    - "@type": "Question"
      "name": "Ce versiune generează?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Versiunea draft-07, cea mai larg suportată. Schema conține referința $schema, tipurile, câmpurile properties ale obiectelor și, opțional, lista required."
    - "@type": "Question"
      "name": "De ce e totul obligatoriu implicit?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Dintr-un exemplu nu reiese care câmpuri sunt opționale, deci valoarea implicită sigură e ca fiecare câmp observat să fie obligatoriu. Cu comutatorul o poți dezactiva, dacă vrei o schemă mai laxă."
    - "@type": "Question"
      "name": "Datele ajung pe vreun server?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Nu. Generarea schemei are loc în browserul tău, prin JavaScript. Datele exemplu nu părăsesc dispozitivul și nimic nu este salvat."
---

**A scrie o schemă de la zero e migălos.** A o genera dintr-un exemplu real durează secunde. Acest instrument construiește o JSON Schema (draft-07) dintr-un exemplu JSON, prin inferența tipurilor, direct în browserul tău – gata de rafinat și folosit.

## Ce este JSON Schema

JSON Schema este un standard prin care descrii formal structura așteptată a unor date JSON: ce câmpuri există, cu ce tip și care sunt obligatorii. Cu o schemă poți **valida** automat datele de intrare (respectă formatul?) și le poți **documenta** clar, citibil de mașină.

## Cum funcționează inferența

Instrumentul parcurge exemplul și deduce tipul fiecărei valori:

| Valoare exemplu | Tip schemă |
|-----------------|------------|
| `42` | integer |
| `3.14` | number |
| `"text"` | string |
| `true` | boolean |
| `{ … }` | object (cu properties) |
| `[ … ]` | array (items din primul element) |

Pentru obiecte, generează lista `properties`; pentru tablouri, deduce tipul elementelor din primul element.

## De ce totul e obligatoriu implicit

Dintr-un singur exemplu nu se poate ști care câmpuri sunt opționale – exemplul le conține pur și simplu pe cele prezente. De aceea valoarea implicită sigură e ca fiecare câmp observat să fie marcat `required`. Cu comutatorul dezactivezi asta, dacă vrei o schemă mai permisivă, care nu impune prezența câmpurilor.

## Un punct de plecare, nu produsul final

Schema generată e un **schelet excelent**, dar merită rafinată manual:

- Marchează câmpurile cu adevărat opționale.
- Adaugă limite (`minLength`, `maximum`, `pattern`).
- Definește `enum` pentru valorile permise.
- Descrie câmpurile cu `description`.

Astfel treci în câteva minute de la date brute la o schemă riguroasă.

## Cum se folosește

1. **Lipește** un exemplu reprezentativ de date JSON.
2. **Decide** dacă fiecare câmp să fie obligatoriu.
3. **Citește** schema draft-07 generată.
4. **Copiaz-o** pentru validare sau documentare.

## Cazuri de utilizare

- **Validare** – verificarea datelor de intrare pe baza schemei.
- **Documentare** – descrierea formală a unui API.
- **Contract API** – bază comună între backend și frontend.
- **Testare** – generarea de date valide și invalide.

## Confidențialitate: totul rămâne local

Generarea rulează în browserul tău, prin JavaScript. Datele exemplu nu ajung pe niciun server – poți lucra în siguranță și cu structuri interne.

## Instrumente înrudite

- [Vizualizator JSON](/dezvoltator/vizualizator-json/) — arbore restrângibil pentru JSON
- [Convertor JSON ↔ XML](/dezvoltator/convertor-json-xml/) — conversie bidirecțională
- [Validare JSON](/dezvoltator/validare-json/) — verificarea sintaxei JSON
- [Formatare JSON](/dezvoltator/formatare-json/) — beautify și minify JSON
