---
title: "Comparare text – găsește diferența dintre două texte (diff)"
description: "Compară două texte pe rânduri și evidențiază colorat rândurile adăugate și șterse. Mod fără spații și fără majuscule. 100% în browser."
toolSlug: "szoveg-osszehasonlitas"
category: "szoveg"
published_at: "2026-07-04T00:00:00.000Z"
refreshed_at: "2026-07-04T00:00:00.000Z"
articleSchema:
  "@context": "https://schema.org"
  "@type": "Article"
  "headline": "Comparare text – găsește diferența dintre două texte (diff)"
  "description": "Compară două texte pe rânduri și evidențiază colorat rândurile adăugate și șterse. Mod fără spații și fără majuscule. 100% în browser."
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
  "name": "Comparare text (diff)"
  "applicationCategory": "DeveloperApplication"
  "operatingSystem": "Web"
  "description": "Instrument de comparare text care rulează 100% în browser. Confruntă două texte pe rânduri folosind cel mai lung subșir comun și evidențiază colorat rândurile adăugate și șterse."
  "featureList": "Comparare pe rânduri cu algoritm LCS; evidențiere colorată adăugat/șters; mod fără spații; mod fără majuscule/minuscule; totalul modificărilor; 100% local, fără tracking."
  "url": "https://instrumenteonline.ro/text/comparare-text/"
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
    "reviewCount": 41
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
        "name": "Cristina D."
      "reviewBody": "Compar traducerea originală cu cea revizuită și văd instant ce a schimbat editorul. Culorile fac totul clar."
      "datePublished": "2026-07-04"
    - "@type": "Review"
      "reviewRating":
        "@type": "Rating"
        "ratingValue": "5"
        "bestRating": "5"
      "author":
        "@type": "Person"
        "name": "Vlad M."
      "reviewBody": "Modul fără spații e salvator când compari două fișiere de config formatate diferit."
      "datePublished": "2026-07-04"
faqPageSchema:
  "@context": "https://schema.org"
  "@type": "FAQPage"
  "mainEntity":
    - "@type": "Question"
      "name": "La ce nivel compară?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "La nivel de rând: împarte cele două texte în rânduri și, pe baza celui mai lung subșir comun (LCS), determină ce rânduri sunt identice, care au fost adăugate și care au dispărut. Este metoda consacrată a instrumentelor de diff."
    - "@type": "Question"
      "name": "Ce înseamnă culorile?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Fundalul verde marchează rândurile noi (adăugate) apărute în textul B, roșul tăiat rândurile dispărute din A, iar cel neutru rândurile identice în ambele texte."
    - "@type": "Question"
      "name": "La ce folosesc modurile fără spații / fără majuscule?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Cu ele filtrezi diferențele nesemnificative: modul fără spații ignoră spațiile în plus, cel fără majuscule/minuscule ignoră diferența de scriere. Astfel rămân doar diferențele de fond."
    - "@type": "Question"
      "name": "Textele ajung pe vreun server?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Nu. Întreaga comparare are loc în browserul tău, prin JavaScript. Nici originalul, nici textul modificat nu părăsesc dispozitivul și nimic nu este salvat."
---

**Ce s-a schimbat între două versiuni?** E o întrebare frecventă la texte, traduceri și fișiere de configurare – și greu de răspuns citind caracter cu caracter. Instrumentul de comparare confruntă cele două texte pe rânduri și evidențiază colorat diferențele, direct în browserul tău.

## Ce face instrumentul

Lipești textul original (A) și cel modificat (B), iar instrumentul îți arată, rând cu rând:

- 🟢 **rândurile adăugate** – prezente în B, absente în A,
- 🔴 **rândurile șterse** – prezente în A, absente în B,
- ⚪ **rândurile identice** – neschimbate în ambele.

Sub rezultat vezi și totalul: câte rânduri au fost adăugate și câte șterse.

## Cum funcționează diff-ul

În spatele comparării stă algoritmul **celui mai lung subșir comun** (LCS – Longest Common Subsequence). Instrumentul împarte textele în rânduri și caută cea mai lungă succesiune de rânduri care apare în ambele, în aceeași ordine. Acestea sunt rândurile comune; restul este marcat drept adăugat sau șters.

Este aceeași metodă folosită de sistemele de control al versiunilor precum **Git** pentru a afișa modificările din cod. Compararea pe rânduri este ideală pentru majoritatea textelor: arată clar structura schimbărilor, nu doar caracterele diferite.

## Modurile de comparare

Uneori diferențele reale sunt ascunse de detalii nesemnificative. Două opțiuni ajută:

- **Fără spații** – ignoră spațiile, taburile și indentarea în plus. Util la cod și la texte formatate diferit.
- **Fără majuscule/minuscule** – ignoră diferența de scriere. Util când doar conținutul contează, nu forma literelor.

## Cum se folosește

1. **Lipește** textul original în câmpul A.
2. **Lipește** textul modificat în câmpul B.
3. **Activează** modul fără spații sau fără majuscule, dacă e nevoie.
4. **Citește** diff-ul colorat și totalul modificărilor.

## Cazuri de utilizare

- **Traduceri** – compararea variantei originale cu cea revizuită.
- **Versiuni de document** – ce s-a schimbat între două ciorne.
- **Fișiere de configurare** – găsirea diferențelor între două seturi de setări.
- **Editare** – confruntarea corecturilor cu textul inițial.

## Limita de mărime

Diff-ul detaliat rulează rapid până la circa 2000 de rânduri per parte. Peste această valoare, instrumentul semnalează că textul e prea mare, fiindcă algoritmul LCS necesită resurse proporționale cu produsul numărului de rânduri. Pentru sarcinile tipice de editare, limita este mai mult decât suficientă.

## Confidențialitate: totul rămâne local

Întreaga comparare rulează în browserul tău, prin JavaScript. Textele lipite nu ajung pe niciun server – poți compara în siguranță și documente confidențiale.

## Instrumente înrudite

- [Ștergere rânduri duplicate](/text/stergere-duplicate/) — elimină rândurile care se repetă
- [Sortare rânduri](/text/sortare-randuri/) — ordonează rândurile alfabetic
- [Repetare text](/text/repetare-text/) — multiplică un text de oricâte ori
- [Generator Lorem Ipsum](/text/generator-lorem-ipsum/) — text de umplutură pentru design
