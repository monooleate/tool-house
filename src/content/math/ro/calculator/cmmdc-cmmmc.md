---
title: "Calculator CMMDC și CMMMC – Algoritmul lui Euclid și Factori Primi"
description: "Calculează cel mai mare divizor comun (CMMDC) și cel mai mic multiplu comun (CMMMC) pentru oricâte numere, cu descompunere în factori primi și pași."
toolSlug: "cmmdc-cmmmc"
category: "calculator"
published_at: "2026-05-31T00:00:00.000Z"
refreshed_at: "2026-05-31T00:00:00.000Z"
articleSchema:
  "@context": "https://schema.org"
  "@type": "Article"
  "headline": "Calculator CMMDC și CMMMC – Algoritmul lui Euclid și Factori Primi"
  "description": "Calculează CMMDC și CMMMC pentru oricâte numere, cu descompunere în factori primi și algoritmul lui Euclid."
  "datePublished": "2026-05-31T00:00:00.000Z"
  "dateModified": "2026-05-31T00:00:00.000Z"
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
  "name": "Calculator CMMDC și CMMMC"
  "applicationCategory": "EducationalApplication"
  "operatingSystem": "Web"
  "description": "Calculează cel mai mare divizor comun și cel mai mic multiplu comun pentru oricâte numere naturale, cu descompunere în factori primi."
  "featureList": "CMMDC + CMMMC pentru oricâte numere; algoritmul lui Euclid; descompunere în factori primi; relația CMMDC×CMMMC; gratuit, fără înregistrare."
  "url": "https://instrumenteonline.ro/calculator/cmmdc-cmmmc/"
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
    "ratingValue": "4.85"
    "reviewCount": 21
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
        "name": "Raluca I."
      "reviewBody": "Exact ce trebuia pentru temele copilului — arată și factorii primi, nu doar rezultatul."
      "datePublished": "2026-05-30"
faqPageSchema:
  "@context": "https://schema.org"
  "@type": "FAQPage"
  "mainEntity":
    - "@type": "Question"
      "name": "Ce este CMMDC (c.m.m.d.c.)?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Cel mai mare divizor comun al unor numere este cel mai mare număr natural care le împarte pe toate fără rest. Exemplu: CMMDC(12, 18) = 6, deoarece 6 este cel mai mare număr care împarte și 12, și 18."
    - "@type": "Question"
      "name": "Ce este CMMMC (c.m.m.m.c.)?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Cel mai mic multiplu comun este cel mai mic număr natural diferit de zero care este multiplu al tuturor numerelor date. Exemplu: CMMMC(4, 6) = 12."
    - "@type": "Question"
      "name": "Cum funcționează algoritmul lui Euclid?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Pentru două numere, se împarte cel mare la cel mic și se reține restul; apoi se repetă cu (împărțitorul, restul) până când restul devine 0. Ultimul împărțitor nenul este CMMDC. Exemplu: 18 = 1×12 + 6; 12 = 2×6 + 0 → CMMDC = 6."
    - "@type": "Question"
      "name": "Care este relația dintre CMMDC și CMMMC?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Pentru două numere: CMMDC(a, b) × CMMMC(a, b) = a × b. De aceea CMMMC(a, b) = (a × b) / CMMDC(a, b)."

---

**Calculatorul CMMDC și CMMMC** determină **cel mai mare divizor comun** și **cel mai mic multiplu comun** pentru oricâte numere naturale, cu descompunere în factori primi.

## Ce sunt CMMDC și CMMMC

- **CMMDC** (cel mai mare divizor comun) — cel mai mare număr care împarte toate numerele date, fără rest.
- **CMMMC** (cel mai mic multiplu comun) — cel mai mic număr (nenul) care este multiplu al tuturor.

## Algoritmul lui Euclid (pas cu pas)

Pentru două numere, CMMDC se calculează prin împărțiri succesive cu rest:

$$
\text{CMMDC}(a, b) = \text{CMMDC}(b,\ a \bmod b)
$$

repetat până când restul devine 0. Exemplu pentru **18 și 12**:

$$
18 = 1 \times 12 + 6
$$
$$
12 = 2 \times 6 + 0 \;\Rightarrow\; \text{CMMDC}(18, 12) = 6
$$

## Metoda factorilor primi

Se descompun numerele în factori primi:

$$
12 = 2^2 \times 3, \qquad 18 = 2 \times 3^2
$$

- **CMMDC** = produsul factorilor **comuni** la puterea **minimă**: $2^1 \times 3^1 = 6$.
- **CMMMC** = produsul **tuturor** factorilor la puterea **maximă**: $2^2 \times 3^2 = 36$.

## Relația fundamentală

Pentru două numere, produsul lor este egal cu produsul dintre CMMDC și CMMMC:

$$
\text{CMMDC}(a, b) \times \text{CMMMC}(a, b) = a \times b
$$

De exemplu: $6 \times 36 = 216 = 12 \times 18$.

## Exemple

| Numere | CMMDC | CMMMC |
|--------|------:|------:|
| 12, 18 | 6 | 36 |
| 8, 12 | 4 | 24 |
| 15, 25 | 5 | 75 |
| 6, 10, 15 | 1 | 30 |

## Aplicații practice

- **Simplificarea fracțiilor:** împarte numărătorul și numitorul la CMMDC.
- **Numitor comun:** adu fracțiile la același numitor folosind CMMMC.
- **Probleme de coincidență:** când se întâlnesc din nou două evenimente periodice (CMMMC).

## Întrebări frecvente

Răspunsurile detaliate (definiții, algoritmul lui Euclid, relația CMMDC × CMMMC) sunt afișate în secțiunea de întrebări frecvente de pe această pagină.

## Instrumente similare

- [Convertor numere romane](/calculator/numere-romane/) — romane ↔ arabe
- [Regula de trei simplă](/calculator/regula-de-trei-simpla/) — proporții
- [Calculator procente](/calculator/procent-calculator/) — procente și raporturi
