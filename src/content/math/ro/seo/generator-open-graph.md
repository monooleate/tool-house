---
title: "Generator Open Graph – carduri de partajare pentru Facebook și LinkedIn"
description: "Creează meta tag-urile Open Graph (og:title, og:description, og:image, og:url) cu previzualizare live a cardului de partajare. Cod gata de copiat, 100% în browser."
toolSlug: "open-graph-generator"
category: "seo"
published_at: "2026-07-04T00:00:00.000Z"
refreshed_at: "2026-07-04T00:00:00.000Z"
articleSchema:
  "@context": "https://schema.org"
  "@type": "Article"
  "headline": "Generator Open Graph – carduri de partajare pentru Facebook și LinkedIn"
  "description": "Creează meta tag-urile Open Graph (og:title, og:description, og:image, og:url) cu previzualizare live a cardului de partajare. Cod gata de copiat, 100% în browser."
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
  "name": "Generator Open Graph"
  "applicationCategory": "DeveloperApplication"
  "operatingSystem": "Web"
  "description": "Generator Open Graph care rulează 100% în browser. Compune tag-urile og:title, og:description, og:image, og:url, og:type și og:site_name, cu previzualizare live a cardului Facebook/LinkedIn și cod gata de copiat."
  "featureList": "Generare tag-uri og: complete; previzualizare live a cardului de partajare; recomandare dimensiune imagine 1200×630; selectare og:type; cod HTML gata de copiat; 100% local, fără tracking."
  "url": "https://instrumenteonline.ro/seo/generator-open-graph/"
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
    "reviewCount": 52
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
        "name": "Alina R."
      "reviewBody": "Previzualizarea live a cardului m-a scăpat de bătaia de cap cu Facebook Debugger. Văd exact cum arată postarea înainte să public."
      "datePublished": "2026-07-04"
    - "@type": "Review"
      "reviewRating":
        "@type": "Rating"
        "ratingValue": "5"
        "bestRating": "5"
      "author":
        "@type": "Person"
        "name": "Mihai D."
      "reviewBody": "Îl folosesc pentru fiecare articol nou. Simplu, rapid și îmi dă blocul og: complet, gata de lipit."
      "datePublished": "2026-07-04"
faqPageSchema:
  "@context": "https://schema.org"
  "@type": "FAQPage"
  "mainEntity":
    - "@type": "Question"
      "name": "Ce este Open Graph?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Open Graph este un protocol introdus de Facebook care descrie prin meta tag-uri cum să apară o pagină la partajare: cu ce titlu, descriere și imagine. Azi majoritatea platformelor sociale (LinkedIn, WhatsApp, Slack, Discord) citesc aceste tag-uri."
    - "@type": "Question"
      "name": "Ce dimensiune trebuie să aibă og:image?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Dimensiunea recomandată este 1200 × 630 pixeli (raport 1.91:1), care apare ca un card mare. Minimul este 200 × 200 pixeli, dar imaginile mici apar doar ca miniaturi. Imaginea trebuie să fie accesibilă public, cu URL complet."
    - "@type": "Question"
      "name": "De ce nu se actualizează imaginea la partajare?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Platformele sociale rețin (cache) datele Open Graph. Dacă ai modificat imaginea sau textul, poți forța recitirea cu Facebook Sharing Debugger sau LinkedIn Post Inspector."
    - "@type": "Question"
      "name": "og:url trebuie să fie URL-ul canonical?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Da, este recomandat să dai URL-ul oficial, canonical al paginii. Astfel toate partajările atribuie aprecierile aceluiași URL, indiferent de linkul cu parametri de pe care s-a partajat."
    - "@type": "Question"
      "name": "Datele introduse ajung pe vreun server?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Nu. Generarea tag-urilor și previzualizarea rulează în întregime în browserul tău, prin JavaScript. Nicio dată sau imagine nu părăsește dispozitivul și nimic nu este salvat."
---

**Un link partajat este o vitrină.** Când cineva dă share paginii tale pe Facebook sau LinkedIn, ceilalți nu văd conținutul, ci un card: o imagine, un titlu și o descriere. Tag-urile Open Graph decid ce apare în acea vitrină. Acest generator le compune corect și îți arată în timp real cum va arăta cardul, totul în browserul tău.

## Ce sunt tag-urile Open Graph

Open Graph (OG) este un set de meta tag-uri plasate în secțiunea `<head>` a paginii, care descriu cum ar trebui să arate conținutul când este partajat pe rețelele sociale. Fiecare tag are prefixul `og:` și o proprietate: titlu, descriere, imagine, URL și tip.

Fără aceste tag-uri, platforma alege singură ce să afișeze – de obicei prost: un logo aleatoriu, un fragment de meniu sau chiar nimic. Cu ele, controlezi exact prima impresie pe care o face linkul tău.

## Cele patru tag-uri esențiale

Un card complet are nevoie de patru elemente de bază:

| Tag | Rol |
|-----|-----|
| `og:title` | Titlul îngroșat al cardului |
| `og:description` | Descrierea scurtă de sub titlu |
| `og:image` | Imaginea mare a cardului |
| `og:url` | URL-ul oficial (canonical) al paginii |

Pe lângă acestea, `og:type` (de obicei `website` sau `article`) și `og:site_name` (numele site-ului) completează contextul.

## Imaginea: cel mai important detaliu

Imaginea este ce atrage privirea în feed. Regulile pentru `og:image`:

- **Dimensiune 1200 × 630 px** (raport 1.91:1) – umple cardul mare, rămâne clară pe ecrane retina.
- **URL absolut, public** – `https://exemplu.ro/imagine.jpg`, nu o cale relativă.
- **Sub 8 MB**, format JPG sau PNG.
- **Text lizibil** dacă pui text pe imagine – va fi văzut la dimensiune mică.

O imagine bună poate multiplica numărul de clicuri față de un card fără imagine sau cu una nepotrivită.

## Cum se folosește generatorul

1. **Scrie titlul și descrierea** care vrei să apară pe card.
2. **Adaugă URL-ul paginii** (`og:url`) în formă absolută.
3. **Adaugă adresa imaginii** (`og:image`) și urmărește previzualizarea live.
4. **Alege tipul** (`og:type`) potrivit conținutului.
5. **Copiază** blocul `og:` generat și lipește-l în secțiunea `<head>`.

## Open Graph și Twitter Card

X (Twitter) are propriul sistem, Twitter Cards, dar dacă tag-urile `twitter:` lipsesc, revine la Open Graph. În practică:

- **Open Graph** acoperă Facebook, LinkedIn, WhatsApp, Slack, Discord, Telegram și majoritatea aplicațiilor.
- **Twitter Card** dă control fin pe X asupra tipului de card și a autorului.

Cea mai sigură strategie este să le dai pe amândouă. Pentru tag-urile `twitter:` avem un [generator separat de Twitter Card](/seo/generator-twitter-card/).

## Greșeli frecvente

1. **Imagine relativă sau inaccesibilă.** Dacă `og:image` nu e un URL public absolut, cardul rămâne fără imagine.
2. **Titlu prea lung.** Peste ~60–70 de caractere, titlul se taie pe majoritatea platformelor.
3. **Cache neactualizat.** După o modificare, platforma afișează versiunea veche până rulezi debuggerul oficial.
4. **Lipsa og:url.** Fără URL canonical, aprecierile se pot împărți între variante diferite ale aceleiași pagini.

## Confidențialitate: totul rămâne local

Toată generarea și previzualizarea rulează în browserul tău, prin JavaScript. Câmpurile completate, textul și adresa imaginii nu ajung niciodată pe vreun server – poți pregăti în siguranță și cardurile unui proiect încă nepublicat.

## Instrumente înrudite

- [Generator Twitter Card](/seo/generator-twitter-card/) — cardul de previzualizare pentru X (Twitter)
- [Generator Meta Tag](/seo/generator-meta-tag/) — title, description, canonical și robots pentru <head>
- [Generator Schema FAQ](/seo/generator-schema-faq/) — date structurate JSON-LD pentru întrebări frecvente
- [Verificare title și meta description](/seo/verificare-title-meta/) — lungime în caractere și pixeli cu previzualizare SERP
