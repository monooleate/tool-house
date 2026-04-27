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

## Tabel cu cazuri tipice și valori uzuale

Următorul tabel îți arată cum se schimbă natura rădăcinilor în funcție de coeficienți. E util la BAC pentru intuiție rapidă:

| a | b | c | Δ | Rădăcini ($x_1, x_2$) | Tipul rădăcinilor          |
|--:|--:|--:|--:|------------------------|----------------------------|
| 1 | -3 | 2  | 1   | $x_1=2,\ x_2=1$        | Două rădăcini reale distincte |
| 1 | -5 | 6  | 1   | $x_1=3,\ x_2=2$        | Două rădăcini reale distincte |
| 1 | -2 | 1  | 0   | $x=1$ (dublă)          | Rădăcină dublă              |
| 2 | -4 | 2  | 0   | $x=1$ (dublă)          | Rădăcină dublă              |
| 1 |  0 | 4  | -16 | $x=\pm 2i$             | Rădăcini complex conjugate  |
| 1 |  0 | -9 | 36  | $x=\pm 3$              | Reale, ecuație incompletă (b=0) |
| 1 |  5 | 6  | 1   | $x_1=-2,\ x_2=-3$      | Reale negative (Viète: prod>0, sumă<0) |
| 1 | -1 | -6 | 25  | $x_1=3,\ x_2=-2$       | Reale, semne opuse (c<0)    |

> **Truc Viète pentru BAC:** dacă $a=1$, caută două numere cu suma $-b$ și produsul $c$. Pentru $x^2 - 5x + 6 = 0$ → cauți două numere cu suma 5, produs 6 → 2 și 3. Funcționează în 80% din cazurile întâlnite la examen.

## Levezarea formulei generale (forma canonică)

Pentru cei care vor să înțeleagă DE UNDE vine formula, iată derivarea pas cu pas — apare la BAC M1 ca subiect de demonstrație. Pornim de la:

$$
ax^2 + bx + c = 0, \quad a \neq 0
$$

**Pasul 1.** Împărțim la $a$:

$$
x^2 + \frac{b}{a}x + \frac{c}{a} = 0
$$

**Pasul 2.** Mutăm termenul liber:

$$
x^2 + \frac{b}{a}x = -\frac{c}{a}
$$

**Pasul 3.** Completăm pătratul perfect adunând $\left(\dfrac{b}{2a}\right)^2$ în ambii membri:

$$
x^2 + \frac{b}{a}x + \left(\frac{b}{2a}\right)^2 = -\frac{c}{a} + \frac{b^2}{4a^2}
$$

**Pasul 4.** Membrul stâng e un pătrat perfect:

$$
\left(x + \frac{b}{2a}\right)^2 = \frac{b^2 - 4ac}{4a^2}
$$

**Pasul 5.** Extragem rădăcina pătrată:

$$
x + \frac{b}{2a} = \pm\frac{\sqrt{b^2 - 4ac}}{2a}
$$

**Pasul 6.** Izolăm $x$:

$$
x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a} = \frac{-b \pm \sqrt{\Delta}}{2a}
$$

QED. Această formă se numește **formula canonică** sau **formula de rezolvare a ecuației de gradul II**.

## Forma canonică (forma de vârf) — perspectivă geometrică

Orice trinom de gradul II se poate rescrie sub forma canonică:

$$
ax^2 + bx + c = a\left(x + \frac{b}{2a}\right)^2 - \frac{\Delta}{4a}
$$

De aici se citește direct **vârful parabolei**:

$$
V\left(-\frac{b}{2a},\ -\frac{\Delta}{4a}\right)
$$

**Exemplu:** pentru $f(x) = 2x^2 - 8x + 5$:
- $x_V = 8/(2 \cdot 2) = 2$
- $\Delta = 64 - 40 = 24$
- $y_V = -24/(4 \cdot 2) = -3$
- Vârful: $V(2, -3)$.

> **Aplicație:** la BAC M1 problemele „determinați minimul/maximul funcției $f(x) = ax^2 + bx + c$” se rezolvă în 2 secunde dacă recunoști formula vârfului. Minimul (când $a > 0$) sau maximul (când $a < 0$) este $y_V$.

## Aplicații practice

### Cinematică — căderea liberă a unui corp

Un corp lansat de la înălțimea $h_0$ cu viteză inițială $v_0$ în sus are înălțimea la momentul $t$:

$$
h(t) = h_0 + v_0 t - \frac{g}{2} t^2
$$

unde $g \approx 9{,}81 \text{ m/s}^2$. Întrebarea „când atinge solul ($h = 0$)?” devine o ecuație de gradul II în $t$.

**Exemplu:** o piatră aruncată de pe Castelul Bran (h₀ = 30 m) cu viteza inițială 5 m/s în sus. Când ajunge la sol?

$$
0 = 30 + 5t - 4{,}905 t^2
$$

$\Delta = 25 + 4 \cdot 4{,}905 \cdot 30 = 613{,}6$, $\sqrt{\Delta} \approx 24{,}77$.

$$
t = \frac{-5 + 24{,}77}{-9{,}81} \approx 2{,}99 \text{ s}
$$

(Rădăcina negativă — $t \approx -2{,}03$ s — se ignoră, fiind înainte de aruncare.)

### Geometrie — probleme cu arii BAC

> Lungimea unui dreptunghi este cu 2 m mai mare decât lățimea, iar aria este de 35 m². Determinați dimensiunile.

Notează lățimea cu $x$. Atunci lungimea = $x + 2$ și:

$$
x(x+2) = 35 \Leftrightarrow x^2 + 2x - 35 = 0
$$

$\Delta = 4 + 140 = 144$, $\sqrt{\Delta} = 12$. $x_{1,2} = (-2 \pm 12)/2 = 5$ sau $-7$.

Dimensiunea fizică e pozitivă, deci lățime = 5 m, lungime = 7 m. **Verificare:** $5 \times 7 = 35$ ✓.

### Optimizare — vârful parabolei

Un fermier din Banat are 200 m de gard pentru a închide un teren dreptunghiular. Care e aria maximă posibilă?

- Lungime + lățime = 100 (jumătate din perimetru). Dacă $L = x$, atunci $l = 100 - x$.
- Arie: $A(x) = x(100-x) = -x^2 + 100x$.
- Vârful: $x_V = -100/(-2) = 50$ → maxim la $x = 50$.
- Aria maximă: $A(50) = 50 \cdot 50 = 2\,500$ m² (un pătrat de 50×50).

**Concluzie:** dintre toate dreptunghiurile cu perimetru fix, pătratul are aria maximă.

### Fizică — energie cinetică și viteză

Un corp de masă $m = 2$ kg are energia cinetică $E_c = 36$ J. Care este viteza?

$$
E_c = \frac{1}{2}mv^2 \Rightarrow 36 = \frac{1}{2} \cdot 2 \cdot v^2
$$

Rezultă $v^2 = 36$ → $v = \pm 6$ m/s. Viteza fizică este pozitivă, deci $v = 6$ m/s. (Cele două rădăcini reflectă cele două direcții posibile — înainte/înapoi.)

### Finanțe — IRR cu două cash-flow-uri

Investești 10 000 RON. Primești după 1 an 5 500 RON și după 2 ani 5 500 RON. Care este IRR-ul?

Notează $1+r = u$. NPV = 0:

$$
-10\,000 + \frac{5\,500}{u} + \frac{5\,500}{u^2} = 0
$$

Înmulțim cu $u^2$ și rearanjăm:

$$
10\,000 u^2 - 5\,500 u - 5\,500 = 0
$$

Împărțim la 500: $20 u^2 - 11 u - 11 = 0$. $\Delta = 121 + 880 = 1001 \approx 31{,}64$. $u = (11 + 31{,}64)/40 \approx 1{,}066$. Deci IRR ≈ **6,6% pe an**.

## Relațiile lui Viète — utilizare avansată

Pentru ecuația $ax^2 + bx + c = 0$ cu rădăcini $x_1, x_2$:

$$
S = x_1 + x_2 = -\frac{b}{a}, \qquad P = x_1 \cdot x_2 = \frac{c}{a}
$$

### Construcția unei ecuații cu rădăcini date

Dacă vrei o ecuație cu rădăcini $x_1$ și $x_2$ cunoscute, e simplu:

$$
x^2 - Sx + P = 0
$$

**Exemplu:** ecuația cu rădăcini 4 și -3:
- $S = 4 + (-3) = 1$
- $P = 4 \cdot (-3) = -12$
- Ecuație: $x^2 - x - 12 = 0$

### Calcul de expresii fără a determina rădăcinile

La BAC apare frecvent: „dacă $x_1, x_2$ sunt rădăcinile ecuației …, calculați $x_1^2 + x_2^2$”. Răspunsul fără rezolvare:

$$
x_1^2 + x_2^2 = (x_1 + x_2)^2 - 2x_1 x_2 = S^2 - 2P
$$

**Exemplu:** $x^2 - 7x + 10 = 0$ → $S = 7, P = 10$ → $x_1^2 + x_2^2 = 49 - 20 = 29$.

Alte formule utile:
- $\dfrac{1}{x_1} + \dfrac{1}{x_2} = \dfrac{S}{P}$
- $x_1^2 + x_2^2 = S^2 - 2P$
- $x_1^3 + x_2^3 = S^3 - 3PS$
- $|x_1 - x_2| = \dfrac{\sqrt{\Delta}}{|a|}$

## Probleme tip BAC — rezolvate complet

### Problema 1 — clasa a IX-a

> Determinați $m \in \mathbb{R}$ astfel încât ecuația $x^2 - 2(m+1)x + m^2 + 4 = 0$ să aibă rădăcini reale.

Condiția: $\Delta \geq 0$.

$$
\Delta = 4(m+1)^2 - 4(m^2+4) = 4m^2 + 8m + 4 - 4m^2 - 16 = 8m - 12
$$

$\Delta \geq 0 \Leftrightarrow 8m \geq 12 \Leftrightarrow m \geq 3/2$.

**Răspuns:** $m \in [3/2,\ +\infty)$.

### Problema 2 — clasa a X-a

> Pentru ce valori ale lui $m$ ecuația $x^2 - mx + (m-1) = 0$ are două rădăcini reale pozitive?

Trei condiții:
1. $\Delta \geq 0$: $m^2 - 4(m-1) \geq 0 \Leftrightarrow m^2 - 4m + 4 \geq 0 \Leftrightarrow (m-2)^2 \geq 0$ — adevărat $\forall m$.
2. $S > 0$ (sumă pozitivă): $m > 0$.
3. $P > 0$ (produs pozitiv): $m - 1 > 0 \Leftrightarrow m > 1$.

**Răspuns:** $m \in (1, +\infty)$.

### Problema 3 — Bacalaureat Mate-Info

> Rezolvați în $\mathbb{C}$ ecuația $x^2 - 4x + 13 = 0$.

$\Delta = 16 - 52 = -36 < 0$ → rădăcini complex conjugate.

$$
x_{1,2} = \frac{4 \pm \sqrt{-36}}{2} = \frac{4 \pm 6i}{2} = 2 \pm 3i
$$

**Răspuns:** $x_1 = 2 + 3i$, $x_2 = 2 - 3i$.

## Greșeli frecvente la BAC

1. **Uiți semnul lui $b$** în formula $-b$: dacă $b = -5$, atunci $-b = +5$, NU $-5$. Cea mai des întâlnită eroare la simulare.
2. **Eroare la $4ac$**: $\Delta = b^2 - 4ac$, NU $b^2 - 4a + c$ sau $b^2 - 4(a+c)$. Înmulțești pe rând.
3. **Confuzie semn $\Delta$ pentru ecuație incompletă**: $x^2 + 9 = 0$ are $\Delta = -36 < 0$ → fără rădăcini reale. NU „$x = \pm 3$”.
4. **Rădăcină dublă confundată cu „o singură rădăcină”**: la $\Delta = 0$, scriem $x_1 = x_2 = -b/(2a)$, nu $x = -b/(2a)$ singur. Formal sunt două rădăcini egale.
5. **Confuzia ecuație vs. inecuație**: $x^2 - 4 < 0$ NU se rezolvă cu formula rădăcinilor, ci prin tabel de semne după ce afli rădăcinile $\pm 2$.
6. **Coeficient $a = 0$**: dacă $a = 0$, NU mai e gradul II! Devine ecuație de gradul I ($bx + c = 0$). Verifică întotdeauna $a \neq 0$ la început.
7. **Rotunjire prematură**: dacă $\Delta = 17$, calculezi $\sqrt{17} \approx 4{,}12$ — păstrează măcar 4 zecimale dacă nu poți lăsa exact $\sqrt{17}$.

## Context istoric

Soluționarea ecuațiilor de gradul II a fost cunoscută de **babilonieni** (cca. 1700 î.Hr.) — tăblițe cu probleme echivalente cu $x^2 + bx = c$. **Al-Khwarizmi** (cca. 820 d.Hr.) a sistematizat metoda completării pătratului — de aici vine cuvântul „algebră” (din *al-jabr*). Formula generală $x = (-b \pm \sqrt{\Delta})/(2a)$ în forma sa modernă apare la **René Descartes** (1637, *La Géométrie*).

În România, ecuația de gradul II este parte din programa **clasei a IX-a** (M1, M2) și apare consistent la **subiectul al II-lea** la BAC matematică-info din ultimii 15 ani.

## Surse și referințe

- Programa școlară RO clasa a IX-a, ecuații de gradul II.
- Manuale BAC M1/M2, autori M.O. Tatomir, M. Ganga.
- BAC arhive 2010–2025 — variantele oficiale conțin sistematic ecuații de gradul II la subiectul II.

## Calculatoare conexe

- [Ecuații exponențiale](/calculator/ecuatii-exponentiale/) — pentru $a^x = b$ și transformări logaritmice.
- [Calculator procente](/calculator/procent-calculator/) — formula procentuală inversă.
- [Regula de trei simplă](/calculator/regula-de-trei-simpla/) — proporții directe și inverse.
- [Calculator medie aritmetică](/calculator/medie-aritmetica/) — pentru calcule statistice de bază.
