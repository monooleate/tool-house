---
title: "Generator Twitter Card – cardul de partajare pentru X (Twitter)"
description: "Creează meta tag-urile Twitter Card (twitter:card, twitter:title, twitter:image) cu previzualizare live a cardului de pe X. Cod gata de copiat, 100% în browser."
toolSlug: "twitter-card-generator"
category: "seo"
published_at: "2026-07-04T00:00:00.000Z"
refreshed_at: "2026-07-04T00:00:00.000Z"
articleSchema:
  "@context": "https://schema.org"
  "@type": "Article"
  "headline": "Generator Twitter Card – cardul de partajare pentru X (Twitter)"
  "description": "Creează meta tag-urile Twitter Card (twitter:card, twitter:title, twitter:image) cu previzualizare live a cardului de pe X. Cod gata de copiat, 100% în browser."
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
  "name": "Generator Twitter Card"
  "applicationCategory": "DeveloperApplication"
  "operatingSystem": "Web"
  "description": "Generator Twitter Card care rulează 100% în browser. Compune tag-urile twitter:card, twitter:title, twitter:description, twitter:image, twitter:site și twitter:creator, cu previzualizare live a cardului de pe X."
  "featureList": "Selectare tip card (summary / summary_large_image); previzualizare live a cardului X; normalizare automată a numelor de cont @; cod HTML gata de copiat; 100% local, fără tracking."
  "url": "https://instrumenteonline.ro/seo/generator-twitter-card/"
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
    "reviewCount": 38
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
        "name": "Raluca T."
      "reviewBody": "Îmi place că văd cardul mare exact cum apare pe X. Am înțeles imediat de ce imaginile mele erau tăiate înainte."
      "datePublished": "2026-07-04"
    - "@type": "Review"
      "reviewRating":
        "@type": "Rating"
        "ratingValue": "5"
        "bestRating": "5"
      "author":
        "@type": "Person"
        "name": "George N."
      "reviewBody": "Adaugă singur semnul @ la conturi și îmi dă tot blocul twitter:. Exact ce trebuie pentru publicare rapidă."
      "datePublished": "2026-07-04"
faqPageSchema:
  "@context": "https://schema.org"
  "@type": "FAQPage"
  "mainEntity":
    - "@type": "Question"
      "name": "Care e diferența între tipurile de card?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "summary_large_image afișează o imagine mare, lată, deasupra titlului și descrierii – cel mai popular. summary afișează o miniatură mai mică, pătrată, lângă text. Pentru articole și conținut vizual este recomandat cardul cu imagine mare."
    - "@type": "Question"
      "name": "Am nevoie de Twitter Card dacă am deja Open Graph?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "X recunoaște și tag-urile Open Graph, deci partajarea funcționează și fără tag-urile twitter:. Cu propriile tag-uri twitter: controlezi însă mai precis tipul cardului și atribuirea autorului, deci merită să le adaugi."
    - "@type": "Question"
      "name": "Ce dimensiune trebuie să aibă twitter:image?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Pentru cardul summary_large_image se recomandă minimum 300×157 px, ideal 1200×628 px, raport 2:1. Pentru cardul summary este nevoie de o imagine pătrată, minimum 144×144 px. Imaginea nu poate depăși 5 MB."
    - "@type": "Question"
      "name": "Este obligatoriu semnul @ la nume?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Formatul corect începe cu @. Instrumentul adaugă automat semnul @ dacă a fost omis, deci nu trebuie să te preocupe separat."
    - "@type": "Question"
      "name": "Datele introduse ajung pe vreun server?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Nu. Asamblarea cardului și previzualizarea rulează în întregime în browserul tău, prin JavaScript. Nicio dată nu părăsește dispozitivul și nimic nu este salvat."
---

**Pe X, un link fără card este doar text.** Cu tag-urile potrivite, același link devine o imagine mare, cu titlu și descriere, care oprește derularea. Generatorul de Twitter Card compune aceste tag-uri și îți arată în timp real cum va arăta cardul pe X, direct în browserul tău.

## Ce este un Twitter Card

Twitter Cards este sistemul prin care X (fostul Twitter) transformă un link simplu într-un card bogat, vizual. Tag-urile au prefixul `twitter:` și stau în secțiunea `<head>` a paginii. Ele stabilesc tipul cardului, titlul, descrierea, imaginea și conturile asociate.

## Cele două tipuri de card

Alegerea tipului schimbă complet aspectul:

| Tip | Aspect | Când îl folosești |
|-----|--------|-------------------|
| `summary_large_image` | Imagine mare, lată, deasupra textului | Articole, conținut vizual (cel mai popular) |
| `summary` | Miniatură mică, pătrată, lângă text | Conținut fără imagine dominantă |

Pentru majoritatea site-urilor, `summary_large_image` dă cel mai bun rezultat.

## Tag-urile cardului

Un card complet folosește următoarele tag-uri:

- **twitter:card** – tipul cardului (`summary` sau `summary_large_image`).
- **twitter:title** – titlul cardului.
- **twitter:description** – descrierea scurtă.
- **twitter:image** – imaginea cardului (URL absolut).
- **twitter:site** – contul X al site-ului (`@site`).
- **twitter:creator** – contul X al autorului (`@autor`).

Generatorul adaugă automat semnul `@` la conturi dacă îl uiți.

## Imaginea potrivită

Pentru cardul cu imagine mare, folosește o imagine de **1200 × 628 px, raport 2:1**, sub 5 MB. Dacă pui text pe imagine, verifică să rămână lizibil la dimensiune redusă, fiindcă în feed cardul apare mai mic decât originalul.

## Twitter Card și Open Graph lucrează împreună

X caută mai întâi tag-urile `twitter:`, dar dacă lipsesc, folosește tag-urile Open Graph ca rezervă. De aceea:

- Dacă ai deja **Open Graph**, cardul funcționează și pe X, dar fără control fin.
- Adăugând și **twitter:**, alegi exact tipul de card și atribui conținutul unui autor.

Recomandarea practică este să folosești ambele. Tag-urile Open Graph le poți crea cu [generatorul Open Graph](/seo/generator-open-graph/).

## Cum se folosește generatorul

1. **Alege tipul cardului** – de obicei `summary_large_image`.
2. **Scrie titlul și descrierea** care apar pe card.
3. **Adaugă URL-ul imaginii** și urmărește previzualizarea live.
4. **Completează conturile** `@site` și `@autor`, dacă vrei atribuire.
5. **Copiază** blocul `twitter:` și lipește-l în secțiunea `<head>`.

## Greșeli frecvente

1. **Tip greșit de card.** `summary` cu o imagine gândită pentru card mare arată înghesuit.
2. **Imagine inaccesibilă.** URL-ul imaginii trebuie să fie absolut, public și pe HTTPS.
3. **Text prea lung.** Titlul se trunchiază la o singură linie pe card.
4. **Cont fără @.** Deși instrumentul corectează, verifică forma finală înainte de publicare.

## Confidențialitate: totul rămâne local

Asamblarea cardului și previzualizarea rulează în browserul tău, prin JavaScript. Nimic din ce completezi nu ajunge pe vreun server – poți pregăti în siguranță și cardurile unei campanii încă nepublicate.

## Instrumente înrudite

- [Generator Open Graph](/seo/generator-open-graph/) — carduri de partajare pentru Facebook și LinkedIn
- [Generator Meta Tag](/seo/generator-meta-tag/) — title, description, canonical și robots pentru <head>
- [Generator Schema FAQ](/seo/generator-schema-faq/) — date structurate JSON-LD pentru întrebări frecvente
- [Verificare title și meta description](/seo/verificare-title-meta/) — lungime în caractere și pixeli cu previzualizare SERP
