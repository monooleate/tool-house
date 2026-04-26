---
title: "Ecuație de gradul II – formulă, discriminant și exemple rezolvate"
description: "Cum se rezolvă ax² + bx + c = 0 pas cu pas: discriminant, formula rădăcinilor, rădăcini reale și complexe."
toolSlug: "ecuatie-grad-doi"
category: "calculator"
published_at: "2026-04-25T00:00:00.000Z"
refreshed_at: "2026-04-25T00:00:00.000Z"
articleSchema:
  "@context": "https://schema.org"
  "@type": "Article"
  "headline": "Ecuație de gradul II – formulă, discriminant și exemple rezolvate"
  "description": "Cum se rezolvă ax² + bx + c = 0 pas cu pas: discriminant, formula rădăcinilor, rădăcini reale și complexe."
  "datePublished": "2026-04-25T00:00:00.000Z"
  "dateModified": "2026-04-25T00:00:00.000Z"
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
  "name": "Calculator Ecuație de Gradul II"
  "applicationCategory": "EducationalApplication"
  "operatingSystem": "Web"
  "description": "Calculator online care rezolvă ecuații de gradul al doilea cu pași detaliați, discriminantul Δ, formula generală și suport pentru rădăcini complexe."
  "featureList": "Rezolvare ax² + bx + c = 0 cu pași; calcul discriminant Δ; rădăcini reale și complexe; reprezentare grafică a parabolei; exemple predefinite; gratuit."
  "url": "https://instrumenteonline.ro/calculator/ecuatie-grad-doi/"
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
    "ratingValue": "4.91"
    "reviewCount": 36
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
        "name": "Ana D."
      "reviewBody": "Pașii detaliați m-au ajutat să înțeleg materia pentru bacalaureat. Parabola live e bonus."
      "datePublished": "2026-04-14"
faqPageSchema:
  "@context": "https://schema.org"
  "@type": "FAQPage"
  "mainEntity":
    - "@type": "Question"
      "name": "Care este formula pentru rădăcinile ecuației de gradul II?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "x = (−b ± √Δ) / (2a), unde Δ = b² − 4ac este discriminantul."
    - "@type": "Question"
      "name": "Ce înseamnă discriminant negativ?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Δ < 0 înseamnă că ecuația nu are rădăcini reale, ci două rădăcini complex conjugate de forma α ± βi."
    - "@type": "Question"
      "name": "Cum se rezolvă x² − 5x + 6 = 0?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "a=1, b=−5, c=6. Δ = 25 − 24 = 1. x₁ = (5+1)/2 = 3, x₂ = (5−1)/2 = 2."
    - "@type": "Question"
      "name": "Ce înseamnă rădăcină dublă?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Când Δ = 0, ecuația are o singură soluție repetată: x = −b/(2a). Geometric, parabola atinge axa Ox într-un singur punct (vârful)."

---

Ecuația de gradul al doilea este forma `ax² + bx + c = 0`, cu `a ≠ 0`. Este una dintre cele mai studiate ecuații în matematică și apare frecvent la **Bacalaureat** (M1, M2), la **Evaluarea Națională** și în problemele aplicative din fizică (cinematică, traiectorii) și inginerie.

## Formula generală

Soluțiile (rădăcinile) ecuației sunt date de formula:

$$
x_{1,2} = \frac{-b \pm \sqrt{\Delta}}{2a}
$$

unde **Δ** (discriminantul) este:

$$
\Delta = b^2 - 4ac
$$

## Cele 3 cazuri în funcție de Δ

### Δ > 0 — două rădăcini reale distincte

Parabola intersectează axa Ox în două puncte diferite.

$$
x_1 = \frac{-b + \sqrt{\Delta}}{2a}, \quad x_2 = \frac{-b - \sqrt{\Delta}}{2a}
$$

### Δ = 0 — rădăcină dublă

Parabola atinge axa Ox într-un singur punct (vârful parabolei).

$$
x_1 = x_2 = \frac{-b}{2a}
$$

### Δ < 0 — două rădăcini complex conjugate

Parabola NU intersectează axa Ox. Rădăcinile sunt numere complexe de forma α ± βi.

$$
x_{1,2} = \frac{-b \pm i\sqrt{|\Delta|}}{2a}
$$

## Exemplu rezolvat: x² − 5x + 6 = 0

**Date:** `a = 1`, `b = −5`, `c = 6`.

**Pasul 1.** Calculăm discriminantul:

$$
\Delta = (-5)^2 - 4 \cdot 1 \cdot 6 = 25 - 24 = 1
$$

**Pasul 2.** Δ > 0, deci avem două rădăcini reale distincte:

$$
x_1 = \frac{-(-5) + \sqrt{1}}{2 \cdot 1} = \frac{5 + 1}{2} = 3
$$

$$
x_2 = \frac{-(-5) - \sqrt{1}}{2 \cdot 1} = \frac{5 - 1}{2} = 2
$$

**Pasul 3.** Verificare cu relațiile lui Viète:

- `x₁ + x₂ = 3 + 2 = 5` și `−b/a = 5` ✓
- `x₁ · x₂ = 3 · 2 = 6` și `c/a = 6` ✓

## Relațiile lui Viète

Foarte utile la **verificare** sau la **descompunere mintală**:

$$
x_1 + x_2 = -\frac{b}{a}, \qquad x_1 \cdot x_2 = \frac{c}{a}
$$

Pentru ecuația `x² − 7x + 12 = 0`: caut două numere care se adună la 7 și au produsul 12 → `3` și `4`. Direct: `x₁ = 3, x₂ = 4`.

## Cazuri particulare (ecuații incomplete)

### Caz A: b = 0 → ax² + c = 0

$$
x^2 = -\frac{c}{a} \Rightarrow x = \pm\sqrt{-\frac{c}{a}}
$$

Exemplu: `x² − 9 = 0` → `x = ±3`.

### Caz B: c = 0 → ax² + bx = 0

Factorizare:

$$
x(ax + b) = 0 \Rightarrow x_1 = 0, \quad x_2 = -\frac{b}{a}
$$

Exemplu: `2x² − 6x = 0` → `2x(x − 3) = 0` → `x₁ = 0, x₂ = 3`.

## Reprezentarea grafică

Parabola `y = ax² + bx + c` are:

- **Vârf** la `xᵥ = −b / (2a)`, `yᵥ = −Δ / (4a)`
- **Direcție de deschidere**: în sus dacă `a > 0`, în jos dacă `a < 0`
- **Intersecție cu Oy** la `(0, c)`
- **Intersecție cu Ox**: rădăcinile reale (dacă există)

## Aplicații practice

- **Cinematică**: timpul de cădere liberă a unui corp se determină dintr-o ecuație de gradul II în t
- **Geometrie**: probleme cu arii, în care una dintre dimensiuni se exprimă în funcție de cealaltă
- **Optimizare**: maximul/minimul unei funcții patratice se obține în vârful parabolei
- **Finanțe**: rata internă de rentabilitate (IRR) cu doi cash-flow viitori conduce uneori la o ecuație de gradul II

## Greșeli frecvente

1. **Uiți semnul lui b** în formula `−b`: dacă `b = −5`, atunci `−b = 5` (nu −5).
2. **Eroare la 4ac**: nu împărți la 4, ci înmulțești cu 4.
3. **Confuzia rădăcină dublă vs două rădăcini egale**: e același lucru — Δ = 0 înseamnă o singură soluție repetată.
4. **a = 0**: nu mai e gradul II! Devine ecuație de gradul I (`bx + c = 0`).

## Calculatoare conexe

- [Ecuații exponențiale](/calculator/ecuatii-exponentiale/)
- [Calculator procente](/calculator/procent-calculator/)
- [Regula de trei simplă](/calculator/regula-de-trei-simpla/)
