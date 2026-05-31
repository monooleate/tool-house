---
title: "Calculator Combinatorică – Factorial, Permutări, Aranjamente, Combinări"
description: "Calculează factorialul, permutările, aranjamentele și combinările cu formule și calcul exact. Pentru bacalaureat și probabilități."
toolSlug: "combinatorica"
category: "calculator"
published_at: "2026-05-31T00:00:00.000Z"
refreshed_at: "2026-05-31T00:00:00.000Z"
articleSchema:
  "@context": "https://schema.org"
  "@type": "Article"
  "headline": "Calculator Combinatorică – Factorial, Permutări, Aranjamente, Combinări"
  "description": "Calculează factorialul, permutările, aranjamentele și combinările cu formule și calcul exact."
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
  "name": "Calculator Combinatorică"
  "applicationCategory": "EducationalApplication"
  "operatingSystem": "Web"
  "description": "Calculează factorial, permutări, aranjamente și combinări, cu formule afișate și calcul exact pentru numere mari."
  "featureList": "Factorial n!; permutări P(n); aranjamente A(n,k); combinări C(n,k); calcul exact (BigInt); formule afișate; gratuit."
  "url": "https://instrumenteonline.ro/calculator/combinatorica/"
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
    "ratingValue": "4.84"
    "reviewCount": 22
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
        "name": "Diana L."
      "reviewBody": "Perfect pentru bacalaureat — arată și formula, nu doar rezultatul. C(49,6) calculat instant."
      "datePublished": "2026-05-30"
faqPageSchema:
  "@context": "https://schema.org"
  "@type": "FAQPage"
  "mainEntity":
    - "@type": "Question"
      "name": "Ce este factorialul?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Factorialul lui n (notat n!) este produsul tuturor numerelor naturale de la 1 la n: n! = n × (n−1) × … × 2 × 1. Prin convenție, 0! = 1. Exemplu: 5! = 120."
    - "@type": "Question"
      "name": "Care e diferența dintre aranjamente și combinări?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "La aranjamente A(n,k) contează ordinea elementelor (ex. parole, clasamente). La combinări C(n,k) ordinea NU contează (ex. extragerea la loto, alegerea unei echipe). De aceea C(n,k) = A(n,k) / k!."
    - "@type": "Question"
      "name": "Cum se calculează combinările C(n,k)?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "C(n,k) = n! / (k! × (n−k)!). Exemplu, la loto 6 din 49: C(49,6) = 49! / (6! × 43!) = 13.983.816 combinații posibile."
    - "@type": "Question"
      "name": "Ce sunt permutările?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Permutările P(n) reprezintă numărul de moduri de a ordona n elemente distincte: P(n) = n!. Exemplu: 4 cărți pot fi aranjate în P(4) = 4! = 24 de moduri."

---

**Calculatorul de combinatorică** determină **factorialul, permutările, aranjamentele și combinările**, cu formulele afișate și calcul exact pentru numere mari.

## Factorialul

$$
n! = n \times (n-1) \times \cdots \times 2 \times 1, \qquad 0! = 1
$$

Exemplu: $5! = 5 \times 4 \times 3 \times 2 \times 1 = 120$.

## Permutările P(n)

Numărul de moduri de a ordona n elemente distincte:

$$
P(n) = n!
$$

Exemplu: 4 cărți pot fi așezate în $P(4) = 4! = 24$ moduri.

## Aranjamentele A(n,k) — contează ordinea

Numărul de grupe ordonate de k elemente alese din n:

$$
A_n^k = \frac{n!}{(n-k)!}
$$

Exemplu: un podium (locurile 1–3) din 8 sportivi: $A_8^3 = \frac{8!}{5!} = 336$.

## Combinările C(n,k) — nu contează ordinea

Numărul de grupe neordonate de k elemente alese din n:

$$
C_n^k = \binom{n}{k} = \frac{n!}{k! \,(n-k)!}
$$

Exemplu: la loto 6 din 49: $C_{49}^6 = \dfrac{49!}{6! \cdot 43!} = 13\,983\,816$.

## Relația dintre aranjamente și combinări

$$
C_n^k = \frac{A_n^k}{k!}
$$

Aranjamentele numără grupele ordonate; împărțind la k! (numărul de ordonări ale celor k elemente) obținem combinările.

## Când folosim fiecare

| Situație | Tip | Exemplu |
|----------|-----|---------|
| Ordonare totală | Permutări | Așezarea a n persoane |
| Selecție ordonată | Aranjamente | Podium, parole |
| Selecție neordonată | Combinări | Loto, echipe, mâini de cărți |

## Întrebări frecvente

Răspunsurile detaliate (factorial, aranjamente vs combinări, C(n,k), permutări) sunt afișate în secțiunea de întrebări frecvente de pe această pagină.

## Instrumente similare

- [Calculator CMMDC și CMMMC](/calculator/cmmdc-cmmmc/) — divizori și multipli
- [Calculator fracții](/calculator/calculator-fractii/) — operații cu fracții
- [Calculator procente](/calculator/procent-calculator/) — procente și raporturi
