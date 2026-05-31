---
title: "Calculator Logaritmi – log în orice bază, ln, lg, log₂ și proprietăți"
description: "Calculează logaritmul în orice bază, ln, lg și log₂, cu formula schimbării de bază și proprietățile logaritmilor. Exemple și exerciții."
toolSlug: "logaritmi"
category: "calculator"
published_at: "2026-05-31T00:00:00.000Z"
refreshed_at: "2026-05-31T00:00:00.000Z"
articleSchema:
  "@context": "https://schema.org"
  "@type": "Article"
  "headline": "Calculator Logaritmi – log în orice bază, ln, lg, log₂ și proprietăți"
  "description": "Calculează logaritmul în orice bază, ln, lg și log₂, cu formula schimbării de bază și proprietățile logaritmilor."
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
  "name": "Calculator Logaritmi"
  "applicationCategory": "EducationalApplication"
  "operatingSystem": "Web"
  "description": "Calculează logaritmul în orice bază, ln, lg și log₂, cu formula schimbării de bază și proprietățile logaritmilor."
  "featureList": "Logaritm în orice bază; ln (bază e); lg (bază 10); log₂; schimbarea de bază; proprietăți; gratuit."
  "url": "https://instrumenteonline.ro/calculator/logaritmi/"
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
    "ratingValue": "4.83"
    "reviewCount": 20
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
        "name": "Ștefan R."
      "reviewBody": "Calculează logaritmul în orice bază și arată și schimbarea de bază. Exact ce trebuia pentru bac."
      "datePublished": "2026-05-30"
faqPageSchema:
  "@context": "https://schema.org"
  "@type": "FAQPage"
  "mainEntity":
    - "@type": "Question"
      "name": "Ce este logaritmul?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Logaritmul în baza b al unui număr x este exponentul la care trebuie ridicată baza b pentru a obține x: dacă b^y = x, atunci log_b(x) = y. Exemplu: log₂(8) = 3, deoarece 2³ = 8."
    - "@type": "Question"
      "name": "Care este formula schimbării de bază?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "log_b(x) = ln(x) / ln(b) = lg(x) / lg(b). Această formulă permite calculul logaritmului în orice bază folosind logaritmul natural sau zecimal."
    - "@type": "Question"
      "name": "Ce diferență e între ln, lg și log?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "ln este logaritmul natural (baza e ≈ 2,718), lg este logaritmul zecimal (baza 10), iar log₂ este logaritmul binar (baza 2). „log” fără indice înseamnă de obicei baza 10 sau baza e (în analiză)."
    - "@type": "Question"
      "name": "Care sunt proprietățile logaritmilor?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "log(a·b) = log a + log b (produs → sumă); log(a/b) = log a − log b (cât → diferență); log(aⁿ) = n·log a (putere → înmulțire). Aceste proprietăți transformă înmulțirile în adunări."

---

**Calculatorul de logaritmi** determină logaritmul unui număr în **orice bază**, plus logaritmul natural (**ln**), zecimal (**lg**) și binar (**log₂**).

## Ce este logaritmul

Logaritmul este operația inversă a ridicării la putere:

$$
\log_b(x) = y \iff b^{\,y} = x
$$

Exemplu: $\log_2(8) = 3$, deoarece $2^3 = 8$.

## Formula schimbării de bază

Orice logaritm se poate calcula folosind logaritmul natural sau zecimal:

$$
\log_b(x) = \frac{\ln(x)}{\ln(b)} = \frac{\lg(x)}{\lg(b)}
$$

## Bazele uzuale

| Notație | Bază | Domeniu |
|---------|------|---------|
| ln | e ≈ 2,718 | analiză matematică, științe |
| lg (log) | 10 | inginerie, scări logaritmice |
| log₂ | 2 | informatică |

## Proprietățile logaritmilor

$$
\log_b(x \cdot y) = \log_b x + \log_b y
$$
$$
\log_b\!\left(\frac{x}{y}\right) = \log_b x - \log_b y
$$
$$
\log_b(x^{\,n}) = n \cdot \log_b x
$$

Aceste proprietăți transformă înmulțirile în adunări — principiul istoric din spatele riglei de calcul.

## Exemple

- $\lg(1000) = 3$ (deoarece $10^3 = 1000$)
- $\log_2(1024) = 10$ (deoarece $2^{10} = 1024$)
- $\ln(e) = 1$
- $\log_5(125) = 3$ (deoarece $5^3 = 125$)

## Aplicații practice

- **Scara Richter** (cutremure) și **decibelii** (sunet) sunt scări logaritmice.
- **pH-ul** măsoară aciditatea ca logaritm negativ al concentrației de ioni.
- **Informatică:** complexitatea algoritmilor eficienți (ex. căutarea binară) este $O(\log_2 n)$.
- **Finanțe:** timpul de dublare a unei investiții se calculează cu logaritmi.

## Întrebări frecvente

Răspunsurile detaliate (definiție, schimbarea de bază, ln/lg/log, proprietăți) sunt afișate în secțiunea de întrebări frecvente de pe această pagină.

## Instrumente similare

- [Ecuații exponențiale](/calculator/ecuatii-exponentiale/) — rezolvare cu logaritmi
- [Calculator progresii](/calculator/progresii/) — șiruri aritmetice și geometrice
- [Calculator procente](/calculator/procent-calculator/) — procente și raporturi
