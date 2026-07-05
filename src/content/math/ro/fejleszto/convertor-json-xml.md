---
title: "Convertor JSON ↔ XML – transformă date în ambele direcții"
description: "Conversie bidirecțională între JSON și XML, cu valori implicite rezonabile (element repetat → tablou, recunoașterea numerelor). 100% în browser."
toolSlug: "json-xml"
category: "fejleszto"
published_at: "2026-07-04T00:00:00.000Z"
refreshed_at: "2026-07-04T00:00:00.000Z"
articleSchema:
  "@context": "https://schema.org"
  "@type": "Article"
  "headline": "Convertor JSON ↔ XML – transformă date în ambele direcții"
  "description": "Conversie bidirecțională între JSON și XML, cu valori implicite rezonabile (element repetat → tablou, recunoașterea numerelor). 100% în browser."
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
  "name": "Convertor JSON ↔ XML"
  "applicationCategory": "DeveloperApplication"
  "operatingSystem": "Web"
  "description": "Convertor JSON-XML care rulează 100% în browser. Transformă în ambele direcții între JSON și XML, cu recunoașterea tablourilor, a numerelor și a valorilor logice."
  "featureList": "Conversie bidirecțională JSON↔XML; element repetat → tablou; recunoașterea numerelor și logicii; rezultat indentat; copiere cu un clic; 100% local, fără tracking."
  "url": "https://instrumenteonline.ro/dezvoltator/convertor-json-xml/"
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
    "ratingValue": "4.87"
    "reviewCount": 35
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
        "name": "Cristian P."
      "reviewBody": "Lucrez cu un API SOAP vechi și un frontend modern. Convertesc răspunsurile XML în JSON într-o secundă."
      "datePublished": "2026-07-04"
    - "@type": "Review"
      "reviewRating":
        "@type": "Rating"
        "ratingValue": "5"
        "bestRating": "5"
      "author":
        "@type": "Person"
        "name": "Monica S."
      "reviewBody": "Recunoaște tablourile corect și rezultatul e indentat frumos. Exact ce aveam nevoie."
      "datePublished": "2026-07-04"
faqPageSchema:
  "@context": "https://schema.org"
  "@type": "FAQPage"
  "mainEntity":
    - "@type": "Question"
      "name": "După ce reguli convertește?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Din cheile obiectului rezultă elemente XML, valorile primitive devin conținut text. La XML → JSON, din elementele repetate cu același nume rezultă un tablou, iar numerele și valorile logice sunt recunoscute."
    - "@type": "Question"
      "name": "De ce nu e mereu perfectă conversia?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Modelul de date al JSON și al XML diferă: XML cunoaște atribute, spații de nume și conținut mixt ordonat, pe care JSON nu le are. De aceea conversia dus-întors poate fi ușor cu pierderi la cazurile limită."
    - "@type": "Question"
      "name": "Există element rădăcină?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "XML trebuie să aibă un singur element rădăcină. Dacă JSON-ul conține o singură cheie de nivel superior, aceasta e folosită ca rădăcină; altfel se adaugă o rădăcină root."
    - "@type": "Question"
      "name": "Datele ajung pe vreun server?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Nu. Întreaga conversie are loc în browserul tău, prin JavaScript. Datele tale nu părăsesc dispozitivul și nimic nu este salvat."
---

**JSON și XML sunt două limbaje pentru aceleași date.** Un serviciu modern vorbește JSON, un sistem de întreprindere vechi vorbește XML – iar când trebuie să comunice, e nevoie de un traducător. Acest convertor face traducerea în ambele direcții, direct în browserul tău.

## Ce face convertorul

Alegi direcția, lipești datele și primești rezultatul convertit, indentat:

- **JSON → XML** – din cheile obiectului rezultă elemente, din valori conținut text.
- **XML → JSON** – din elementele XML rezultă chei, din elementele repetate tablouri, cu recunoașterea numerelor și logicii.

## Regulile de conversie

| JSON | XML |
|------|-----|
| `{ "a": 1 }` | `<a>1</a>` |
| element repetat într-un tablou | `<tag>…</tag><tag>…</tag>` |
| număr / logic | conținut text (recunoscut la revenire) |

La XML → JSON, elementele frate cu același nume devin un tablou; textul `42` devine numărul `42`, iar `true`/`false` devin valori logice.

## De ce conversia nu e mereu perfectă

JSON și XML au modele de date diferite. XML cunoaște **atribute** (`<a id="1">`), **spații de nume** și **conținut mixt ordonat** – concepte pe care JSON nu le are. De aceea, la structuri complexe, conversia dus-întors poate pierde detalii. Pentru datele simple, plate, de zi cu zi – care sunt majoritatea cazurilor – conversia e rapidă și fiabilă.

## Elementul rădăcină

XML impune un singur element rădăcină. Convertorul gestionează asta automat: dacă JSON-ul are o singură cheie de nivel superior (de exemplu `{ "carte": … }`), aceasta devine rădăcina; altfel adaugă o rădăcină `root` care încadrează totul.

## Cum se folosește

1. **Alege** direcția: JSON → XML sau XML → JSON.
2. **Lipește** datele sursă.
3. **Citește** rezultatul convertit, indentat.
4. **Copiază-l** în clipboard.

## Cazuri de utilizare

- **Integrare de sisteme** – JSON modern ↔ XML de întreprindere.
- **API-uri vechi** – răspunsuri SOAP/XML transformate în JSON.
- **Migrare date** – transfer între sisteme cu formate diferite.
- **Date de test** – varianta XML a unui JSON existent.

## Confidențialitate: totul rămâne local

Conversia rulează în browserul tău, prin JavaScript. Datele lipite nu ajung pe niciun server – poți lucra în siguranță și cu date confidențiale.

## Instrumente înrudite

- [Vizualizator JSON](/dezvoltator/vizualizator-json/) — arbore restrângibil pentru JSON
- [Generator JSON Schema](/dezvoltator/generator-json-schema/) — schemă dintr-un exemplu JSON
- [Formatare JSON](/dezvoltator/formatare-json/) — beautify și minify JSON
- [Formatare XML](/dezvoltator/formatare-xml/) — indentare și minificare XML
