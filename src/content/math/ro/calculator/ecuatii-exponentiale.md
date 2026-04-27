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

## Identități exponențiale fundamentale

Pentru a manipula corect ecuațiile exponențiale e esențial să cunoști aceste reguli (apar la BAC subiectul I):

**Înmulțirea cu aceeași bază — exponentul se adună:**

$$
a^m \cdot a^n = a^{m+n}
$$

**Împărțirea cu aceeași bază — exponentul se scade:**

$$
\frac{a^m}{a^n} = a^{m-n}
$$

**Putere ridicată la putere — exponentul se înmulțește:**

$$
(a^m)^n = a^{m \cdot n}
$$

**Produs ridicat la putere:**

$$
(a \cdot b)^n = a^n \cdot b^n
$$

**Cât ridicat la putere:**

$$
\left(\frac{a}{b}\right)^n = \frac{a^n}{b^n} \quad (b \neq 0)
$$

**Exponent zero și negativ:**

$$
a^0 = 1 \quad (a \neq 0), \qquad a^{-n} = \frac{1}{a^n}
$$

**Exponent fracționar — radicali:**

$$
a^{m/n} = \sqrt[n]{a^m} \quad (a > 0)
$$

> **Numărul lui Euler $e$:** $e \approx 2{,}71828$. Apare în cazurile de creștere/descreștere continuă (dobândă continuu compusă, decădere radioactivă, populație fără limite). Logaritmul natural $\ln(x) = \log_e(x)$.

## Metode de rezolvare — patru tehnici

### Metoda 1 — Aducere la aceeași bază

Cea mai elegantă metodă, dar funcționează doar când ambele părți pot fi scrise cu aceeași bază.

**Exemplu:** $5^{x+1} = 25$.

1. Scriem $25 = 5^2$:
$$
5^{x+1} = 5^2
$$
2. Egalăm exponenții (proprietatea funcției exponențiale injective):
$$
x + 1 = 2 \Rightarrow x = 1
$$

**Exemplu BAC:** $8 \cdot 4^x = 2^{x+5}$.

Scriem totul în bază 2: $8 = 2^3$, $4 = 2^2$:
$$
2^3 \cdot 2^{2x} = 2^{x+5} \Leftrightarrow 2^{2x+3} = 2^{x+5}
$$

Egalăm exponenții: $2x + 3 = x + 5 \Rightarrow x = 2$.

### Metoda 2 — Logaritmare directă

Funcționează întotdeauna, dar dă uneori rezultate iraționale.

**Exemplu:** $3^x = 10$.

$$
\ln(3^x) = \ln(10) \Leftrightarrow x \cdot \ln 3 = \ln 10
$$

$$
x = \frac{\ln 10}{\ln 3} = \frac{2{,}3026}{1{,}0986} \approx 2{,}0959
$$

> **Schimbarea bazei:** $\log_b a = \dfrac{\ln a}{\ln b} = \dfrac{\log_{10} a}{\log_{10} b}$. Calculatorul tău fizic are doar $\log$ (zecimal) și $\ln$ — folosește această formulă pentru orice altă bază.

### Metoda 3 — Substituție

Se aplică când avem ecuații de tipul $a \cdot b^{2x} + c \cdot b^x + d = 0$ (ecuație exponențială transformabilă în pătratică).

**Exemplu:** $4^x - 5 \cdot 2^x + 4 = 0$.

Notăm $t = 2^x$ (cu $t > 0$), atunci $4^x = (2^x)^2 = t^2$. Ecuația devine:
$$
t^2 - 5t + 4 = 0
$$

Rădăcini: $t_1 = 4, t_2 = 1$. Ambele pozitive, deci ambele valide.

- $2^x = 4 \Rightarrow x = 2$
- $2^x = 1 \Rightarrow x = 0$

**Răspuns:** $x \in \{0, 2\}$.

### Metoda 4 — Logaritmare cu același logaritm pe ambele părți

Pentru ecuații cu baze diferite ale exponențialelor.

**Exemplu:** $2^{x+1} = 3^{x-1}$.

Aplicăm $\ln$:
$$
(x+1)\ln 2 = (x-1)\ln 3
$$

$$
x \ln 2 + \ln 2 = x \ln 3 - \ln 3
$$

$$
x(\ln 2 - \ln 3) = -\ln 3 - \ln 2 = -\ln 6
$$

$$
x = \frac{-\ln 6}{\ln 2 - \ln 3} = \frac{\ln 6}{\ln 3 - \ln 2} = \frac{\ln 6}{\ln(3/2)} \approx 4{,}419
$$

## Aplicații în lumea reală

### Dobânda compusă — investiții la BCR / BRD / Banca Transilvania

O sumă inițială $S_0$ plasată cu rată anuală $r$ (zecimal) și capitalizare de $n$ ori pe an se înmulțește în $t$ ani la:

$$
S(t) = S_0 \cdot \left(1 + \frac{r}{n}\right)^{n \cdot t}
$$

**Exemplu — depozit Banca Transilvania:** depui 10 000 RON cu dobândă 5% anual, capitalizare trimestrială (n = 4). Cât ai după 3 ani?

$$
S = 10\,000 \cdot \left(1 + \frac{0{,}05}{4}\right)^{12} = 10\,000 \cdot 1{,}0125^{12} \approx 11\,608 \text{ RON}
$$

**Întrebarea inversă — în câți ani se dublează economia?** Rezolvăm $2 = (1 + r)^t$:

$$
t = \frac{\ln 2}{\ln(1 + r)}
$$

La $r = 0{,}05$ (5% anual): $t \approx 14{,}21$ ani. La $r = 0{,}07$: $t \approx 10{,}24$ ani.

> **Regula 72** — aproximare rapidă: numărul de ani de dublare ≈ $72/r\%$. Pentru 6% anual: $72/6 = 12$ ani. Funcționează bine pentru rate între 4% și 10%.

### Decăderea radioactivă — fizică BAC

Numărul de atomi rămași într-un eșantion radioactiv urmează legea exponențială:

$$
N(t) = N_0 \cdot e^{-\lambda t}
$$

unde $\lambda$ este constanta de dezintegrare. **Timpul de înjumătățire** $T_{1/2}$:

$$
\frac{N_0}{2} = N_0 \cdot e^{-\lambda T_{1/2}} \Rightarrow T_{1/2} = \frac{\ln 2}{\lambda}
$$

**Exemplu — datare cu carbon C-14:** $T_{1/2} = 5\,730$ ani. O probă găsită la Sarmizegetusa Regia conține 25% din C-14 inițial. Vârsta?

$$
0{,}25 = e^{-\lambda t} \Rightarrow t = \frac{-\ln 0{,}25}{\lambda} = \frac{\ln 4}{\ln 2} \cdot 5\,730 = 11\,460 \text{ ani}
$$

### Creșterea populației — model Malthus

Pentru populații fără limite de resurse:

$$
P(t) = P_0 \cdot e^{kt}
$$

**Exemplu RO:** populația Bucureștiului în 1900 era ~280 000. Dacă rata anuală de creștere era $k = 0{,}023$ (2,3% pe an), care e proiecția pentru 1950 (50 ani)?

$$
P(50) = 280\,000 \cdot e^{0{,}023 \cdot 50} = 280\,000 \cdot e^{1{,}15} \approx 884\,000
$$

(Date reale 1956: ~1 mil. — modelul Malthus aproximează acceptabil pe perioade scurte; pe termen lung intervin limitele de resurse, model logistic.)

### Răcirea unui obiect — legea lui Newton

Temperatura unui obiect care se răcește în mediu de temperatură $T_a$ urmează:

$$
T(t) = T_a + (T_0 - T_a) \cdot e^{-kt}
$$

**Exemplu domestic:** ai scos o oală cu sarmale din cuptor (T₀ = 95°C) într-o cameră cu T_a = 20°C. După 30 minute s-a răcit la 60°C. Când va ajunge la 25°C (gata de servit)?

Pasul 1 — Aflăm $k$:
$$
60 = 20 + 75 e^{-30k} \Rightarrow e^{-30k} = 40/75 = 0{,}5333 \Rightarrow k = \ln(75/40)/30 \approx 0{,}0210
$$

Pasul 2 — Calculăm timpul pentru 25°C:
$$
25 = 20 + 75 e^{-0{,}021 t} \Rightarrow t = \frac{-\ln(5/75)}{0{,}021} = \frac{\ln 15}{0{,}021} \approx 129 \text{ min}
$$

Aproximativ **2 ore și 9 minute** de la scoaterea din cuptor.

### Anuitate — credit ipotecar

Formula anuității standard, folosită și de BCR/BRD pentru calculul ratei lunare:

$$
R = C \cdot \frac{r(1+r)^n}{(1+r)^n - 1}
$$

unde $C$ = capital, $r$ = dobândă lunară, $n$ = numărul de luni. Exponent prezent în $(1+r)^n$.

**Exemplu — credit ipotecar 200 000 RON, 25 ani, DAE 6,5%:**
- $r = 0{,}065/12 \approx 0{,}005417$
- $n = 25 \times 12 = 300$
- $(1+r)^n \approx 5{,}064$
- $R \approx 200\,000 \cdot 0{,}005417 \cdot 5{,}064 / 4{,}064 \approx 1\,350$ RON/lună

Vezi și [Calculator credit ipotecar](/finante/credit-ipotecar/).

## Probleme tip BAC — rezolvate

### Problema 1 (clasa a X-a)

> Rezolvați în $\mathbb{R}$: $9^x - 4 \cdot 3^x + 3 = 0$.

Substituție $t = 3^x > 0$, $9^x = t^2$:
$$
t^2 - 4t + 3 = 0 \Rightarrow t \in \{1, 3\}
$$

- $3^x = 1 \Rightarrow x = 0$
- $3^x = 3 \Rightarrow x = 1$

**Răspuns:** $x \in \{0, 1\}$.

### Problema 2 (clasa a XI-a)

> Rezolvați $5^{2x+1} = 125$.

$125 = 5^3$, deci:
$$
5^{2x+1} = 5^3 \Rightarrow 2x+1 = 3 \Rightarrow x = 1
$$

### Problema 3 (BAC Mate-Info)

> Rezolvați $2^x + 2^{x+1} + 2^{x+2} = 56$.

Factorizare: $2^x(1 + 2 + 4) = 56 \Rightarrow 2^x \cdot 7 = 56 \Rightarrow 2^x = 8 \Rightarrow x = 3$.

## Greșeli frecvente

1. **Uitarea împărțirii cu $a$** înainte de logaritmare. $\log(a \cdot b^x) = \log a + x \log b$, NU $a \log b^x$.
2. **Logaritmare cu baze diferite** la cele două părți. Alege una și folosește-o consistent.
3. **Soluții fără verificare**: dacă $c/a < 0$, ecuația $a \cdot b^x = c$ nu are soluții reale (o putere pozitivă cu bază pozitivă e mereu pozitivă).
4. **Bază $= 1$ sau bază $= 0$**: nu sunt valide pentru ecuații exponențiale standard. La $b = 1$, $1^x = 1$ pentru orice $x$ — fie infinit de soluții, fie niciuna.
5. **Substituție $t = b^x$ fără condiția $t > 0$**: când rezolvi pătratica în $t$, rădăcinile $\leq 0$ se elimină.
6. **Confuzie $\ln$ vs. $\log$**: $\ln$ = bază $e$, $\log$ (fără indice) de obicei bază 10 (în matematică școlară RO) sau bază $e$ (în limbaje de programare). În calculator: butonul „log” = bază 10, „ln” = bază $e$.
7. **Aplicarea logaritmului la sumă**: $\log(a+b) \neq \log a + \log b$. Greșeală absolut clasică. Doar produsul devine sumă: $\log(ab) = \log a + \log b$.

## Surse și referințe

- [Funcția exponențială – Wikipedia](https://ro.wikipedia.org/wiki/Func%C8%9Bia_exponen%C8%9Bial%C4%83) — definiție și proprietăți matematice.
- [Logarithm – MathWorld](https://mathworld.wolfram.com/Logarithm.html) — derivări detaliate.
- Programa BAC RO — clasa a X-a și a XI-a, capitolul „Funcții exponențiale și logaritmice”.

## Calculatoare conexe

- [Calculator ecuație de gradul II](/calculator/ecuatie-grad-doi/) — pentru substituții pătratice de tip $4^x - 5 \cdot 2^x + 4 = 0$.
- [Calculator dobândă compusă](/finante/dobanda-compusa/) — aplicația practică principală.
- [Calculator credit ipotecar](/finante/credit-ipotecar/) — formula anuității utilizează exponenți.
- [Calculator procente](/calculator/procent-calculator/) — bazele pentru a interpreta ratele de dobândă.
