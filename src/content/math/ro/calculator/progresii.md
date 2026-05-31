---
title: "Calculator Progresii Aritmetice și Geometrice – Termen și Sumă"
description: "Calculează termenul de rang n și suma primilor n termeni pentru progresii aritmetice (a₁, d) și geometrice (a₁, q), cu formule și exemple."
toolSlug: "progresii"
category: "calculator"
published_at: "2026-05-31T00:00:00.000Z"
refreshed_at: "2026-05-31T00:00:00.000Z"
articleSchema:
  "@context": "https://schema.org"
  "@type": "Article"
  "headline": "Calculator Progresii Aritmetice și Geometrice – Termen și Sumă"
  "description": "Calculează termenul de rang n și suma primilor n termeni pentru progresii aritmetice și geometrice."
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
  "name": "Calculator Progresii"
  "applicationCategory": "EducationalApplication"
  "operatingSystem": "Web"
  "description": "Calculează termenul de rang n și suma primilor n termeni pentru progresii aritmetice și geometrice, cu formule afișate."
  "featureList": "Progresii aritmetice și geometrice; termen general aₙ; suma Sₙ; formule afișate; primii termeni; gratuit."
  "url": "https://instrumenteonline.ro/calculator/progresii/"
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
    "ratingValue": "4.81"
    "reviewCount": 18
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
        "name": "Andrei V."
      "reviewBody": "Foarte util la clasa a IX-a. Arată formula și primii termeni, nu doar suma."
      "datePublished": "2026-05-30"
faqPageSchema:
  "@context": "https://schema.org"
  "@type": "FAQPage"
  "mainEntity":
    - "@type": "Question"
      "name": "Care este formula termenului general la progresia aritmetică?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "aₙ = a₁ + (n−1)·d, unde a₁ este primul termen și d este rația. Exemplu: a₁=2, d=3 → al 5-lea termen este 2 + 4·3 = 14."
    - "@type": "Question"
      "name": "Cum se calculează suma unei progresii aritmetice?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Sₙ = n·(a₁ + aₙ)/2 = n/2·(2a₁ + (n−1)d). Exemplu: suma primelor 10 numere naturale (a₁=1, d=1): S₁₀ = 10·(1+10)/2 = 55."
    - "@type": "Question"
      "name": "Care este formula la progresia geometrică?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Termenul general: aₙ = a₁·qⁿ⁻¹. Suma: Sₙ = a₁·(qⁿ−1)/(q−1) pentru q≠1, sau Sₙ = n·a₁ când q=1."
    - "@type": "Question"
      "name": "Care e diferența dintre progresia aritmetică și geometrică?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "La progresia aritmetică, fiecare termen se obține ADUNÂND rația d la precedentul (creștere liniară). La cea geometrică, fiecare termen se obține ÎNMULȚIND cu rația q (creștere/descreștere exponențială)."

---

**Calculatorul de progresii** determină **termenul de rang n** și **suma primilor n termeni**, pentru progresii aritmetice și geometrice.

## Progresia aritmetică

Un șir în care diferența dintre doi termeni consecutivi este constantă (rația $d$):

$$
a_n = a_1 + (n-1)\,d
$$

Suma primilor n termeni:

$$
S_n = \frac{n\,(a_1 + a_n)}{2} = \frac{n}{2}\bigl(2a_1 + (n-1)d\bigr)
$$

Exemplu: $a_1 = 2$, $d = 3$. Al 5-lea termen: $a_5 = 2 + 4 \cdot 3 = 14$. Suma primilor 5: $S_5 = \frac{5(2+14)}{2} = 40$.

## Progresia geometrică

Un șir în care raportul dintre doi termeni consecutivi este constant (rația $q$):

$$
a_n = a_1 \cdot q^{\,n-1}
$$

Suma primilor n termeni (pentru $q \ne 1$):

$$
S_n = a_1 \cdot \frac{q^{\,n} - 1}{q - 1}
$$

Exemplu: $a_1 = 3$, $q = 2$. Al 4-lea termen: $a_4 = 3 \cdot 2^3 = 24$. Suma primilor 4: $S_4 = 3 \cdot \frac{2^4 - 1}{2 - 1} = 45$.

## Aritmetică vs. geometrică

| Caracteristică | Aritmetică | Geometrică |
|----------------|-----------|------------|
| Operație | adunare (+d) | înmulțire (×q) |
| Termen general | a₁ + (n−1)d | a₁·qⁿ⁻¹ |
| Creștere | liniară | exponențială |
| Exemplu | 2, 5, 8, 11… | 3, 6, 12, 24… |

## Aplicații practice

- **Economii:** depuneri lunare constante (aritmetică) sau capital cu dobândă compusă (geometrică).
- **Creștere:** modelarea creșterii liniare sau exponențiale a unui fenomen.
- **Matematică:** probleme de șiruri din clasa a IX-a și de la bacalaureat.

## Întrebări frecvente

Răspunsurile detaliate (termen general, suma, progresie geometrică, diferența dintre tipuri) sunt afișate în secțiunea de întrebări frecvente de pe această pagină.

## Instrumente similare

- [Calculator combinatorică](/calculator/combinatorica/) — factorial, permutări, combinări
- [Ecuații exponențiale](/calculator/ecuatii-exponentiale/) — rezolvare cu logaritmi
- [Calculator procente](/calculator/procent-calculator/) — creșteri și raporturi
