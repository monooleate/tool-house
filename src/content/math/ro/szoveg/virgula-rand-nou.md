---
title: "Convertor virgulă ↔ rând nou – transformă liste și coloane"
description: "Din rânduri în listă cu virgule sau invers, cu separator la alegere, curățare, ștergere duplicate și ghilimele. 100% în browser."
toolSlug: "vesszo-sortores"
category: "szoveg"
published_at: "2026-07-04T00:00:00.000Z"
refreshed_at: "2026-07-04T00:00:00.000Z"
articleSchema:
  "@context": "https://schema.org"
  "@type": "Article"
  "headline": "Convertor virgulă ↔ rând nou – transformă liste și coloane"
  "description": "Din rânduri în listă cu virgule sau invers, cu separator la alegere, curățare, ștergere duplicate și ghilimele. 100% în browser."
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
  "name": "Convertor virgulă ↔ rând nou"
  "applicationCategory": "UtilitiesApplication"
  "operatingSystem": "Web"
  "description": "Convertor de liste care rulează 100% în browser. Transformă între rânduri și liste separate prin separator, cu curățare, ștergere duplicate și punere între ghilimele."
  "featureList": "Ambele direcții rânduri↔listă; separator virgulă, punct și virgulă, spațiu, tab sau personalizat; curățare; omitere goale; ștergere duplicate; ghilimele; 100% local, fără tracking."
  "url": "https://instrumenteonline.ro/text/virgula-rand-nou/"
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
    "reviewCount": 33
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
        "name": "Mihai T."
      "reviewBody": "Transform o coloană de Excel în listă IN pentru SQL, cu ghilimele, în două secunde. Îmi economisește timp zilnic."
      "datePublished": "2026-07-04"
    - "@type": "Review"
      "reviewRating":
        "@type": "Rating"
        "ratingValue": "5"
        "bestRating": "5"
      "author":
        "@type": "Person"
        "name": "Laura P."
      "reviewBody": "Curățarea și ștergerea duplicatelor într-un singur pas fac lista gata de folosit imediat."
      "datePublished": "2026-07-04"
faqPageSchema:
  "@context": "https://schema.org"
  "@type": "FAQPage"
  "mainEntity":
    - "@type": "Question"
      "name": "Ce fac cele două direcții?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Din rânduri în listă unește textul pe mai multe rânduri într-un singur rând, cu elementele separate prin separator. Din listă în rânduri este inversul: împarte o listă separată prin separator în rânduri distincte."
    - "@type": "Question"
      "name": "Ce separatoare pot alege?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Virgulă, punct și virgulă, spațiu, tab, sau separator personalizat pe care îl dai tu. Astfel gestionează cele mai frecvente formate de liste și coloane."
    - "@type": "Question"
      "name": "Ce face punerea între ghilimele?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Pune fiecare element între ghilimele, util dacă vrei să inserezi rezultatul într-un cod, o interogare SQL (listă IN) sau un CSV, unde valorile trebuie puse între ghilimele."
    - "@type": "Question"
      "name": "Datele ajung pe vreun server?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Nu. Transformarea are loc integral în browserul tău, prin JavaScript. Datele tale nu părăsesc dispozitivul și nimic nu este salvat."
---

**Aceeași listă, formate diferite.** Într-un tabel valorile stau pe rânduri, într-un cod ca listă cu virgule, între ghilimele. A trece de la o formă la alta manual e lent și predispus la greșeli. Acest convertor face transformarea în ambele direcții, curățând datele pe parcurs, direct în browserul tău.

## Ce face convertorul

Lucrează în două direcții:

- **Din rânduri în listă** – textul pe mai multe rânduri devine un singur rând, cu elementele separate prin separator (de exemplu o listă cu virgule).
- **Din listă în rânduri** – o listă separată prin separator se împarte în rânduri distincte.

## Separatoare

Poți alege între virgulă, punct și virgulă, spațiu, tab sau un separator personalizat. Astfel instrumentul acoperă cele mai frecvente formate: liste cu virgule, coloane cu tab, enumerări cu punct și virgulă.

## Opțiuni de curățare

Pe parcursul transformării, datele pot fi curățate:

| Opțiune | Efect |
|---------|-------|
| **Curățare** | Taie spațiile de la începutul și sfârșitul elementelor |
| **Omitere goale** | Elimină elementele fără conținut |
| **Ștergere duplicate** | Păstrează doar valorile unice |
| **Ghilimele** | Pune fiecare element între ghilimele |

Împreună, aceste opțiuni transformă o listă dezordonată într-una curată, gata de folosit.

## Un caz practic: lista IN pentru SQL

Un exemplu frecvent: ai o coloană de valori copiată din Excel (fiecare pe un rând) și vrei o listă IN pentru o interogare SQL. Alegi direcția „din rânduri în listă”, separatorul virgulă și activezi ghilimelele. Rezultatul – `"valoare1", "valoare2", "valoare3"` – e gata de lipit direct în `WHERE coloana IN (…)`.

## Cum se folosește

1. **Alege** direcția: din rânduri în listă, sau invers.
2. **Setează** separatorul.
3. **Activează** opțiunile de curățare dorite.
4. **Lipește** intrarea și **copiază** rezultatul.

## Cazuri de utilizare

- **Cod și SQL** – liste IN, tablouri, seturi de valori.
- **Coloane de tabel** – conversia între valori pe rânduri și listă cu virgule.
- **Liste de adrese** – e-mailuri de pe rânduri pe un singur rând.
- **Curățare date** – trim, eliminarea celor goale și a duplicatelor într-un pas.

## Confidențialitate: totul rămâne local

Transformarea rulează în browserul tău, prin JavaScript. Datele lipite nu ajung pe niciun server – poți lucra în siguranță și cu date confidențiale.

## Instrumente înrudite

- [Repetare text](/text/repetare-text/) — multiplică un text de oricâte ori
- [Ștergere rânduri duplicate](/text/stergere-duplicate/) — elimină rândurile care se repetă
- [Sortare rânduri](/text/sortare-randuri/) — ordonează rândurile alfabetic
- [Curățare whitespace](/text/curatare-whitespace/) — normalizează spațiile în exces
