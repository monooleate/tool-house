---
title: "Medie aritmetică, mediană și mod – formule și calculator online"
description: "Cum se calculează media aritmetică, mediana, modul, abaterea standard și varianța. Cu formule, exemple și diferențele dintre ele."
toolSlug: "medie-aritmetica"
category: "calculator"
published_at: "2026-04-25T00:00:00.000Z"
refreshed_at: "2026-04-25T00:00:00.000Z"
articleSchema:
  "@context": "https://schema.org"
  "@type": "Article"
  "headline": "Medie aritmetică, mediană și mod – formule și calculator online"
  "description": "Cum se calculează media aritmetică, mediana, modul, abaterea standard și varianța. Cu formule, exemple și diferențele dintre ele."
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
  "name": "Calculator Medie Aritmetică & Statistici"
  "applicationCategory": "EducationalApplication"
  "operatingSystem": "Web"
  "description": "Calculator online care determină media aritmetică, mediana, modul, abaterea standard și varianța pentru un set de numere. Suport pentru media ponderată cu greutăți."
  "featureList": "Medie aritmetică simplă; medie ponderată cu greutăți; mediană; mod (multimodal); abatere standard σ; varianță σ²; sumă, min, max, amplitudine; rânduri dinamice; gratuit."
  "url": "https://instrumenteonline.ro/calculator/medie-aritmetica/"
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
    "ratingValue": "4.86"
    "reviewCount": 29
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
        "name": "Diana N."
      "reviewBody": "Calculează rapid media de bacalaureat cu ponderi. Recomand pentru elevi și profesori!"
      "datePublished": "2026-04-05"
faqPageSchema:
  "@context": "https://schema.org"
  "@type": "FAQPage"
  "mainEntity":
    - "@type": "Question"
      "name": "Care este formula mediei aritmetice?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Media aritmetică x̄ = (suma valorilor) / (numărul de valori). Notată și cu M sau cu media."
    - "@type": "Question"
      "name": "Ce diferență este între medie și mediană?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Media este suma împărțită la numărul de valori; mediana este valoarea din mijlocul șirului ordonat. Mediana nu este influențată de valori extreme, media da."
    - "@type": "Question"
      "name": "Ce este modul statistic?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Modul este valoarea care apare cel mai des. Un set poate avea un mod, mai multe (multimodal) sau niciun mod dacă toate valorile sunt unice."
    - "@type": "Question"
      "name": "Cum se calculează media de bacalaureat?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Media de bacalaureat este media aritmetică simplă a celor 3 probe scrise (proba E.a — limba română, E.c — proba obligatorie a profilului, E.d — proba la alegere): media = (E.a + E.c + E.d) / 3. Trebuie să fie cel puțin 6,00 pentru a promova."
    - "@type": "Question"
      "name": "Cum interpretez abaterea standard?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Abaterea standard σ măsoară împrăștierea datelor în jurul mediei. σ mic înseamnă valori apropiate de medie (set omogen); σ mare înseamnă valori dispersate (set eterogen). În distribuții normale, ~68% dintre valori se află în x̄ ± σ."
---

Statisticile descriptive sunt instrumentele de bază pentru a rezuma un set de date. Cele 3 cele mai folosite sunt **media**, **mediana** și **modul** (măsuri de tendință centrală), iar pentru împrăștiere folosim **varianța** și **abaterea standard**.

## Media aritmetică

$$
\bar{x} = \frac{x_1 + x_2 + \dots + x_n}{n} = \frac{\sum_{i=1}^{n} x_i}{n}
$$

**Exemplu:** Notele 8, 9, 7, 10, 6.

$$
\bar{x} = \frac{8 + 9 + 7 + 10 + 6}{5} = \frac{40}{5} = 8
$$

## Media ponderată

Se folosește când valorile au «importanțe» diferite (greutăți):

$$
\bar{x}_p = \frac{\sum_{i=1}^{n} x_i \cdot w_i}{\sum_{i=1}^{n} w_i}
$$

**Exemplu — media notelor cu credite:**

| Disciplina | Notă | Credite (w) |
|:-----------|-----:|------------:|
| Matematică | 9 | 5 |
| Română | 8 | 4 |
| Istorie | 10 | 5 |
| Sport | 7 | 3 |
| Informatică | 9 | 5 |

$$
\bar{x}_p = \frac{9 \cdot 5 + 8 \cdot 4 + 10 \cdot 5 + 7 \cdot 3 + 9 \cdot 5}{5 + 4 + 5 + 3 + 5} = \frac{193}{22} \approx 8{,}77
$$

## Mediana

**Mediana** este valoarea din mijlocul șirului ordonat.

- Pentru `n` impar: mediana este valoarea de pe poziția `(n+1)/2`
- Pentru `n` par: mediana este media celor două valori centrale

**Exemplu (n = 5, impar):** `{6, 7, 8, 9, 10}` → mediana = `8`.

**Exemplu (n = 6, par):** `{5, 6, 8, 9, 10, 12}` → mediana = `(8 + 9) / 2 = 8,5`.

### Când e mai bună mediana ca media?

În prezența **valorilor extreme** (outliers). Exemplu: salariile a 5 angajați:

`2.500, 2.800, 3.000, 3.200, 30.000`

- **Media:** 8.300 RON (înșelătoare — deformată de patron)
- **Mediana:** 3.000 RON (reflectă realitatea grupului)

## Modul

**Modul** este valoarea care apare cel mai des în set. Un set poate fi:

- **Unimodal** — un singur mod (ex: `{1, 2, 3, 3, 4}` → mod = 3)
- **Bimodal** — două valori cu aceeași frecvență maximă
- **Fără mod** — toate valorile sunt unice (ex: `{1, 2, 3}`)

Modul este singura măsură de tendință centrală **valabilă pentru date categorice** (preferințe, voturi, mărimi de îmbrăcăminte).

## Abaterea standard și varianța

**Varianța** σ² măsoară împrăștierea datelor în jurul mediei:

$$
\sigma^2 = \frac{\sum_{i=1}^{n}(x_i - \bar{x})^2}{n}
$$

**Abaterea standard** σ este rădăcina pătrată a varianței:

$$
\sigma = \sqrt{\sigma^2}
$$

**Exemplu:** Notele `{8, 9, 7, 10, 6}`. Media `x̄ = 8`.

| xᵢ | xᵢ − x̄ | (xᵢ − x̄)² |
|---:|------:|----------:|
| 8 | 0 | 0 |
| 9 | 1 | 1 |
| 7 | −1 | 1 |
| 10 | 2 | 4 |
| 6 | −2 | 4 |

$$
\sigma^2 = \frac{0 + 1 + 1 + 4 + 4}{5} = 2
$$

$$
\sigma = \sqrt{2} \approx 1{,}41
$$

### Regula 68–95–99,7 (distribuții normale)

În distribuții apropiate de cea normală (clopot Gauss):

- ~68% din valori se află în `x̄ ± σ`
- ~95% se află în `x̄ ± 2σ`
- ~99,7% se află în `x̄ ± 3σ`

## Aplicații practice

### Media de Bacalaureat

Cele 3 probe scrise sunt `E.a` (limba și literatura română), `E.c` (proba obligatorie a profilului) și `E.d` (proba la alegere a profilului). Media simplă:

$$
M = \frac{E.a + E.c + E.d}{3}
$$

Pentru promovare: minim **6,00**, fiecare probă cu nota minim **5,00**.

### Statistici de salariu echipă

Pentru o echipă, **mediana** este indicatorul mai onest de «salariu reprezentativ» decât media. **Abaterea standard** indică cât de unitar este pachetul salarial.

### Analiză de risc financiar

Pentru un fond de investiții, randamentul anual mediu indică performanța, dar **σ** indică riscul (volatilitatea). Sharpe Ratio combină cele două: `(media randament − rată fără risc) / σ`.

## Tabel rapid de comparație

| Măsura | Formulă | Sensibil la outliers? | Pentru date numerice? | Pentru date categorice? |
|:-------|:--------|:----------------------|:----------------------|:------------------------|
| Medie aritmetică | Σx / n | Da | Da | Nu |
| Mediană | mijlocul șir ordonat | Nu | Da | Nu |
| Mod | valoarea cea mai frecventă | Nu | Da | Da |

## Calculatoare conexe

- [Calculator procente](/calculator/procent-calculator/)
- [Regula de trei simplă](/calculator/regula-de-trei-simpla/)
- [Calculator IMC](/sanatate/calculator-imc/)
