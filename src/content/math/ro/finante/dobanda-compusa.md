---
title: "Dobândă compusă – formula A = P × (1 + r/n)^(n·t), regula 72 și exemple"
description: "Cum se calculează dobânda compusă (compound interest). Formula completă, capitalizare lunară/zilnică, regula 72 și exemple cu depozite, ETF, Tezaur."
toolSlug: "dobanda-compusa"
category: "finante"
published_at: "2026-04-27T00:00:00.000Z"
refreshed_at: "2026-04-27T00:00:00.000Z"
articleSchema:
  "@context": "https://schema.org"
  "@type": "Article"
  "headline": "Dobândă compusă – formula A = P × (1 + r/n)^(n·t), regula 72 și exemple"
  "description": "Cum se calculează dobânda compusă (compound interest). Formula completă, capitalizare lunară/zilnică, regula 72 și exemple cu depozite, ETF, Tezaur."
  "datePublished": "2026-04-27T00:00:00.000Z"
  "dateModified": "2026-04-27T00:00:00.000Z"
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
  "name": "Calculator Dobândă Compusă"
  "applicationCategory": "FinanceApplication"
  "operatingSystem": "Web"
  "description": "Calculator dobândă compusă cu capitalizare lunară/anuală/zilnică și depuneri lunare opționale, util pentru depozite, titluri Tezaur și investiții ETF."
  "featureList": "Formula compound interest; 5 frecvențe capitalizare; depuneri lunare opționale; presets RO 2026; randament total; gratuit complet."
  "url": "https://instrumenteonline.ro/finante/dobanda-compusa/"
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
    "reviewCount": 34
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
        "name": "Ștefan M."
      "reviewBody": "L-am folosit să simulez randamentul ETF-ului meu pe 20 ani — interfața simplă, dar cu opțiuni de care aveam nevoie."
      "datePublished": "2026-04-20"
faqPageSchema:
  "@context": "https://schema.org"
  "@type": "FAQPage"
  "mainEntity":
    - "@type": "Question"
      "name": "Care este formula dobânzii compuse?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "A = P × (1 + r/n)^(n·t), unde A = suma finală, P = suma inițială, r = rata anuală (zecimală), n = numărul de capitalizări pe an, t = numărul de ani."
    - "@type": "Question"
      "name": "Care este diferența între dobândă simplă și compusă?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Dobânda simplă se calculează doar pe principalul inițial (I = P × r × t). Dobânda compusă reinvestește dobânda câștigată, generând «dobândă la dobândă». Pe termen lung, diferența este uriașă: la 10.000 lei, 7%, 30 ani, simplă = 21.000 lei, compusă = 76.123 lei."
    - "@type": "Question"
      "name": "Cât crește 10.000 lei la 6,5% anual capitalizat lunar timp de 10 ani?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "A = 10.000 × (1 + 0,065/12)^(12×10) ≈ 19.116 lei. Câștig dobândă ≈ 9.116 lei (≈ 91% randament total)."
    - "@type": "Question"
      "name": "Cum afectează frecvența capitalizării rezultatul?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Capitalizarea mai deasă crește ușor randamentul: la 10.000 lei, 6%, 10 ani → anual = 17.908 lei, lunar = 18.194 lei, zilnic = 18.221 lei. Diferența max anual→zilnic e ~1,8%."

---

**Dobânda compusă** este principiul «dobândă la dobândă»: orice dobândă câștigată se reinvestește și generează la rândul ei dobândă. Spre deosebire de dobânda simplă, efectul este **exponențial**, nu liniar.

## Formula generală

$$
A = P \cdot \left(1 + \frac{r}{n}\right)^{n \cdot t}
$$

unde:

- **A** = suma finală
- **P** = principal (suma inițială)
- **r** = rata anuală (în formă zecimală: 7% → 0,07)
- **n** = numărul de capitalizări pe an
- **t** = numărul de ani

## Dobândă simplă vs compusă

Dobândă simplă:

$$
I_{\text{simplă}} = P \cdot r \cdot t
$$

Dobândă compusă (anual):

$$
I_{\text{compusă}} = P \cdot \left[(1 + r)^t - 1\right]
$$

Comparație la **10.000 lei** dobândă **7%** pe **30 ani**:

| Tip | Suma finală | Câștig dobândă |
|------|------------:|---------------:|
| Simplă (7%, 30 ani) | 31.000 lei | 21.000 lei |
| Compusă anual | 76.123 lei | **66.123 lei** |
| Compusă lunar | 81.235 lei | **71.235 lei** |
| Compusă zilnic | 81.658 lei | **71.658 lei** |

Diferența compusă vs simplă pe 30 ani: **peste 3×** câștigul.

## Regula 72 (Rule of 72)

Aproximație rapidă pentru a afla **în câți ani se dublează banii**:

$$
\text{ani de dublare} \approx \frac{72}{r\%}
$$

| Rată anuală | Ani până la dublare |
|------------:|--------------------:|
| 3% | 24 ani |
| 6% | 12 ani |
| 9% | 8 ani  |
| 12% | 6 ani  |
| 15% | 4,8 ani |

⚠️ Regula este aproximare. Formula exactă: `ani = ln(2) / ln(1 + r) ≈ 0,693 / r`. Eroarea regulii 72 este sub 1% pentru rate 4–10%.

## Frecvența capitalizării

| Frecvență | n |
|-----------|---:|
| Anual | 1 |
| Semestrial | 2 |
| Trimestrial | 4 |
| Lunar | 12 |
| Zilnic | 365 |
| Continuu | ∞ → A = P · e^(r·t) |

Capitalizare **continuă** (limita matematică, n → ∞):

$$
A_\infty = P \cdot e^{r \cdot t}
$$

## Exemple rezolvate

### Exemplu 1: Depozit BCR clasic (5,5%, capitalizare anuală, 5 ani)

$$
A = 10\,000 \cdot (1 + 0{,}055)^5 = 10\,000 \cdot 1{,}3070 \approx 13\,070 \text{ lei}
$$

Câștig dobândă: **3.070 lei** (30,7%).

### Exemplu 2: Titluri de stat Tezaur (7,5% anual, 3 ani)

$$
A = 10\,000 \cdot (1{,}075)^3 = 10\,000 \cdot 1{,}2423 \approx 12\,423 \text{ lei}
$$

Câștig dobândă: **2.423 lei** (24,2% pe 3 ani ≈ 7,5% efectiv anual, scutit de impozit).

### Exemplu 3: ETF S&P 500 (9% randament istoric, capitalizare anuală, 20 ani)

$$
A = 10\,000 \cdot (1{,}09)^{20} = 10\,000 \cdot 5{,}604 \approx 56\,044 \text{ lei}
$$

Câștig dobândă: **46.044 lei** (peste 5,5× suma inițială).

### Exemplu 4: Cu depuneri lunare 500 lei (10.000 inițial, 7%, lunar, 20 ani)

Pentru anuitate lunară (depuneri regulate), se folosește formula:

$$
A_{\text{depuneri}} = D \cdot \frac{(1 + r_{\text{lunar}})^N - 1}{r_{\text{lunar}}}
$$

unde $D$ = depunerea lunară, $r_{\text{lunar}}$ = rata lunară, $N$ = total luni.

Total final ≈ **289.000 lei** (din care: principal 10.000 + depuneri 120.000 = 130.000 lei investit, dobândă **159.000 lei**).

## Impactul taxelor și inflației în RO

Calculatorul **NU include** automat:

- **Impozit pe dobândă**: 10% în România (din 2025) pentru dobânzi bancare clasice. Excepții: titlurile de stat Tezaur și PFA-urile cu venituri din investiții care optează pentru regim diferit.
- **Inflația**: ~5% RO 2026 (BNR target 2,5% ± 1%). Randament real net = rata nominală − inflația − impozit.

Exemplu: depozit la 6%, inflație 5%, impozit 10% pe dobândă:

$$
\text{rand. real net} = 6\% \times 0{,}9 - 5\% = 5{,}4\% - 5\% = 0{,}4\%
$$

Banii cresc abia peste inflație. Pentru a câștiga semnificativ peste inflație, ai nevoie de instrumente cu randament real **>3%** după impozite.

## Aplicații practice

### 1. Economie pe termen lung pentru pensie

Investiția anuală de 10.000 lei la 7% randament timp de 30 ani:

$$
A = 10\,000 \cdot \frac{(1{,}07)^{30} - 1}{0{,}07} \approx 944\,608 \text{ lei}
$$

→ Aproape 1 milion lei dintr-o investiție totală de 300.000 lei.

### 2. Fond de urgență (depozit la termen)

Pentru un fond de urgență de 50.000 lei la depozit BRD 6 luni cu rata 5%:

$$
A = 50\,000 \cdot (1 + 0{,}05/2) = 51\,250 \text{ lei}
$$

Câștig: 1.250 lei brut, ~1.125 lei net după impozit 10%.

### 3. Comparare oferte

Trei opțiuni pentru 100.000 lei pe 5 ani:

| Opțiune | Rată | Frecv. | Suma finală |
|---------|-----:|--------|------------:|
| Depozit BCR clasic | 5,5% | anual | 130.696 lei |
| Tezaur 5 ani | 7,8% | anual (scutit impozit) | 145.658 lei |
| ETF (estimare) | 9% | anual | 153.862 lei |

## Greșeli frecvente

1. **Confuzia rată nominală vs efectivă** — la capitalizare lunară, rata efectivă e ușor mai mare decât cea nominală (ex: 6% nominal → 6,17% efectiv anual).
2. **Ignorarea taxelor** — randament 7% brut la depozit ≠ 7% net. Impozit 10% reduce la 6,3% net.
3. **Așteptări nerealiste** — randament istoric ETF S&P 500 (9%) NU e garantat pe orice 10 ani. Pe perioade rele (2000–2010) randamentul a fost negativ.

## Calculatoare înrudite

- [Calculator credit](/finante/calculator-credit/) — pentru ipotecar
- [Calculator TVA](/finante/calculator-tva/) — pentru facturi
- [Marjă vs adaos](/finante/marja-adaos/) — pentru pricing
