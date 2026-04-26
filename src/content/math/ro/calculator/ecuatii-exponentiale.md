---
title: "Ecuații exponențiale – metoda logaritmilor cu exemple rezolvate"
description: "Cum se rezolvă a · bˣ = c pas cu pas: împărțire, logaritmare, izolare a lui x. Cu exemple practice și greșeli frecvente."
toolSlug: "ecuatii-exponentiale"
category: "calculator"
published_at: "2026-04-25T00:00:00.000Z"
refreshed_at: "2026-04-25T00:00:00.000Z"
articleSchema:
  "@context": "https://schema.org"
  "@type": "Article"
  "headline": "Ecuații exponențiale – metoda logaritmilor cu exemple rezolvate"
  "description": "Cum se rezolvă a · bˣ = c pas cu pas: împărțire, logaritmare, izolare a lui x. Cu exemple practice și greșeli frecvente."
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
  "name": "Calculator Ecuații Exponențiale"
  "applicationCategory": "EducationalApplication"
  "operatingSystem": "Web"
  "description": "Calculator online care rezolvă ecuații exponențiale a · bˣ = c folosind metoda logaritmilor, cu pași detaliați și verificare automată."
  "featureList": "Rezolvare a · bˣ = c cu pași; logaritmare automată; verificare a soluției; exemple predefinite (eˣ, 2ˣ, 10ˣ); gratuit."
  "url": "https://instrumenteonline.ro/calculator/ecuatii-exponentiale/"
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
    "ratingValue": "4.74"
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
        "name": "Stefan L."
      "reviewBody": "Util pentru subiecte de matematică la liceu. Logaritmarea automată cu pași e foarte clară."
      "datePublished": "2026-03-28"
faqPageSchema:
  "@context": "https://schema.org"
  "@type": "FAQPage"
  "mainEntity":
    - "@type": "Question"
      "name": "Cum se rezolvă 2 · 3ˣ = 54?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Împărțim cu 2: 3ˣ = 27. Logaritmăm: x · log(3) = log(27). x = log(27)/log(3) = 3."
    - "@type": "Question"
      "name": "Ce restricții există asupra coeficienților?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Baza b trebuie să fie pozitivă și diferită de 1 (b > 0, b ≠ 1). Coeficientul a nu poate fi zero. Raportul c/a trebuie să fie pozitiv pentru rădăcină reală."
    - "@type": "Question"
      "name": "De ce nu se poate baza 1?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Pentru b = 1, expresia 1ˣ este mereu 1 indiferent de x, deci ecuația fie are infinit de soluții, fie niciuna."
    - "@type": "Question"
      "name": "Pot rezolva eˣ = 7,389?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Da. Folosește bază b ≈ 2,718 (numărul lui Euler). Rezultat: x = ln(7,389) ≈ 2."

---

Ecuațiile exponențiale au necunoscuta în **exponent**. Forma standard este:

$$
a \cdot b^x = c
$$

unde `a`, `b`, `c` sunt numere date, cu condițiile `a ≠ 0`, `b > 0`, `b ≠ 1`. Metoda generală de rezolvare este **logaritmarea**.

## Pașii rezolvării

### Pasul 1. Izolăm bˣ

Împărțim ambele părți cu `a`:

$$
b^x = \frac{c}{a}
$$

Pentru ca soluția reală să existe, raportul `c/a` trebuie să fie strict pozitiv (o putere pozitivă de bază pozitivă este mereu pozitivă).

### Pasul 2. Logaritmăm

Aplicăm `log` (orice bază — natural, zecimal sau orice altă bază pozitivă diferită de 1):

$$
\log(b^x) = \log\left(\frac{c}{a}\right)
$$

Folosind proprietatea `log(bˣ) = x · log(b)`:

$$
x \cdot \log(b) = \log\left(\frac{c}{a}\right)
$$

### Pasul 3. Izolăm x

$$
x = \frac{\log(c/a)}{\log(b)}
$$

## Exemplu rezolvat: 2 · 3ˣ = 54

**Pasul 1.** Împărțim cu 2:

$$
3^x = 27
$$

**Pasul 2.** Logaritmăm:

$$
x \cdot \log(3) = \log(27)
$$

**Pasul 3.** Izolăm x:

$$
x = \frac{\log(27)}{\log(3)} = \frac{3 \log(3)}{\log(3)} = 3
$$

(Aici am folosit faptul că `27 = 3³`, deci `log(27) = 3 · log(3)`.)

**Verificare:** `2 · 3³ = 2 · 27 = 54` ✓

## Exemplu cu rezultat fracționar

**Ecuația:** `2ˣ = 10`

$$
x = \frac{\log(10)}{\log(2)} = \frac{1}{0{,}30103} \approx 3{,}3219
$$

Verificare: `2^3,3219 ≈ 10` ✓

## Tabel cu logaritmi uzuali

| Număr | log₁₀ | ln |
|------:|------:|---:|
| 2 | 0,3010 | 0,6931 |
| 3 | 0,4771 | 1,0986 |
| 5 | 0,6990 | 1,6094 |
| 7 | 0,8451 | 1,9459 |
| 10 | 1,0000 | 2,3026 |
| e ≈ 2,718 | 0,4343 | 1,0000 |

## Aplicații în lumea reală

### Decăderea radioactivă

Numărul de atomi rămași într-un eșantion radioactiv urmează legea exponențială:

$$
N(t) = N_0 \cdot e^{-\lambda t}
$$

Pentru a afla **timpul de înjumătățire** rezolvăm ecuația `N₀/2 = N₀ · e^(−λt)` → `t = ln(2) / λ`.

### Dobânda compusă

O sumă inițială `S₀` plasată cu rată anuală `r` (zecimal) se înmulțește, după `n` ani, cu `(1 + r)ⁿ`:

$$
S = S_0 \cdot (1 + r)^n
$$

Pentru a afla **în câți ani se dublează economia** (n necunoscut): `2 = (1 + r)ⁿ` → `n = ln(2) / ln(1 + r)`.

La `r = 0,07` (7% anual): `n ≈ 10,24 ani`. (Regula 72 oferă o aproximare bună: `72 / 7 ≈ 10,3`.)

### Creșterea populației

Modelele exponențiale descriu adesea creșterea populațiilor în absența limitelor de resurse:

$$
P(t) = P_0 \cdot e^{kt}
$$

## Greșeli frecvente

1. **Uitarea împărțirii cu a** înainte de logaritmare. `log(a · bˣ) ≠ a · log(bˣ)`.
2. **Logaritmare cu baze diferite** la cele două părți: alege una și folosește-o consistent.
3. **Soluții imaginare**: dacă `c/a < 0`, ecuația nu are soluții reale. Calculatorul afișează un mesaj de eroare.
4. **Bază = 1 sau bază = 0**: nu sunt valide pentru ecuații exponențiale standard.

## Calculatoare conexe

- [Calculator ecuație de gradul II](/calculator/ecuatie-grad-doi/)
- [Calculator dobândă compusă](/finante/dobanda-compusa/)
- [Calculator procente](/calculator/procent-calculator/)
