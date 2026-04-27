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
        "text": "Media aritmetică = (suma valorilor) / (numărul de valori). Notată x̄ (x-bar) sau M."
    - "@type": "Question"
      "name": "Care este diferența între mediană și medie?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Mediana este valoarea din mijlocul șirului ordonat. Spre deosebire de medie, mediana nu este influențată de valori extreme."
    - "@type": "Question"
      "name": "Ce este modul?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Modul este valoarea care apare cel mai des. Un set poate avea un mod, mai multe (multimodal) sau niciun mod dacă toate valorile sunt unice."
    - "@type": "Question"
      "name": "Cum se calculează media ponderată a notelor?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Înmulțești fiecare notă cu numărul de credite (greutatea), aduni produsele și împarți la suma greutăților. Mod «ponderat» face asta automat."
    - "@type": "Question"
      "name": "Ce este abaterea standard?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Abaterea standard (σ) măsoară împrăștierea valorilor în jurul mediei. σ mică = valori apropiate de medie; σ mare = valori dispersate."

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

## Alte tipuri de medii — geometrică, armonică, pătratică

Pe lângă media aritmetică, există încă trei „medii speciale” utile în contexte specifice.

### Media geometrică

Pentru valori care se înmulțesc (rate de creștere, randamente investiționale):

$$
\bar{x}_g = \sqrt[n]{x_1 \cdot x_2 \cdot \dots \cdot x_n}
$$

**Exemplu RO — randament BVB BET index:** dacă indicele BVB BET a avut creșteri anuale de +20%, +5%, −10% în 3 ani consecutivi, randamentul mediu corect NU este media aritmetică (5%), ci media geometrică:

$$
\bar{x}_g = \sqrt[3]{1{,}20 \cdot 1{,}05 \cdot 0{,}90} - 1 = \sqrt[3]{1{,}134} - 1 \approx 4{,}28\%
$$

> **Regula de aur:** la rate compuse (de creștere/descreștere), media aritmetică supraestimează randamentul real. Întotdeauna folosește media geometrică pentru investiții pe termen lung.

### Media armonică

Pentru rate medii (viteză medie pe distanță fixă, prețuri medii pe unitate):

$$
\bar{x}_h = \frac{n}{\dfrac{1}{x_1} + \dfrac{1}{x_2} + \dots + \dfrac{1}{x_n}}
$$

**Exemplu — viteza medie București–Brașov:** dute 60 km/h, întoarce-te 90 km/h. Care e viteza medie pe drum?

NU este (60+90)/2 = 75 km/h (greșeala clasică), ci media armonică:

$$
\bar{v} = \frac{2}{\dfrac{1}{60} + \dfrac{1}{90}} = \frac{2}{\dfrac{3+2}{180}} = \frac{2 \cdot 180}{5} = 72 \text{ km/h}
$$

### Media pătratică (RMS)

Folosită în fizică (curent alternativ, vibrații) și statistică:

$$
\bar{x}_q = \sqrt{\frac{x_1^2 + x_2^2 + \dots + x_n^2}{n}}
$$

### Inegalitatea mediilor

Pentru orice valori pozitive:

$$
\bar{x}_h \leq \bar{x}_g \leq \bar{x} \leq \bar{x}_q
$$

Egalitatea are loc doar când toate valorile sunt egale. Această inegalitate apare frecvent la BAC M1, problemele de extrem.

## Aplicații practice — ghid RO

### Media de Bacalaureat

Cele 3 probe scrise BAC sunt:
- **E.a** — limba și literatura română (probă comună)
- **E.c** — proba obligatorie a profilului (matematică, istorie etc.)
- **E.d** — proba la alegere a profilului

Media simplă:

$$
M_{\text{BAC}} = \frac{E.a + E.c + E.d}{3}
$$

> **Condiții de promovare:** ≥ **5,00** la fiecare probă scrisă **ȘI** medie ≥ **6,00**.

Cu media de admitere la facultate se poate intra inversă — facultățile importante (Politehnica, ASE, Medicină) cer 7,50–9,50.

### Media de admitere la liceu (Evaluare Națională)

Pentru clasa a 8-a, formula oficială:

$$
M_{\text{adm}} = 0{,}2 \cdot M_{\text{absolvire}} + 0{,}8 \cdot M_{\text{EN}}
$$

unde $M_{\text{absolvire}}$ = media generală de absolvire clasele V–VIII, iar $M_{\text{EN}}$ = media probelor scrise (română + matematică).

**Exemplu:** elev cu media de absolvire 9,20 și media EN 8,75:

$$
M_{\text{adm}} = 0{,}2 \cdot 9{,}20 + 0{,}8 \cdot 8{,}75 = 1{,}84 + 7{,}00 = 8{,}84
$$

### Media notelor pe an școlar (clasa V–XII)

Media anuală la o materie:

$$
M_{\text{anuală}} = \frac{\text{teză} + \text{media orală}}{2}
$$

unde **media orală** este aritmetica simplă a notelor din carnet (≥ 2 note minim).

> **Regulă de rotunjire în RO:** până la 5,49 → coborâre; ≥ 5,50 → urcare. Deci 5,49 = 5, dar 5,50 = 6 (la nivelul mediei anuale; la calcule intermediare păstrează zecimalele).

### Statistici de salariu — INS și echipe

În INS (Institutul Național de Statistică) se publică lunar:
- **Salariul mediu net** (medie aritmetică) — mai 2025: ~5 600 RON.
- **Salariul median** — ~4 800 RON (mai mic decât media).

Diferența reflectă **inegalitatea**: 25% dintre angajați câștigă peste medie tocmai pentru că salariile mari ridică media. Mediana e indicatorul mai „onest” pentru cetățeanul tipic.

**Pentru manageri de echipă:**
- Media e utilă pentru **buget total** (n × medie = total payroll).
- Mediana e utilă pentru **echitate** (cum stă angajatul tipic).
- σ (abaterea standard) indică **dispersia** — σ mare = inegalități mari în echipă.

### Analiză de risc financiar — BVB

Pentru un fond de investiții (FNI Erste Bond, Cititi mai mult):
- **Randament mediu anual** = media aritmetică a randamentelor (sau geometrică pentru perioade lungi).
- **Volatilitate** = σ a randamentelor.
- **Sharpe Ratio** = $(R - R_f) / \sigma$, unde $R_f$ = rata fără risc (titluri de stat RO ~6%).

**Exemplu:** un fond cu randament mediu 10% și σ = 8%, pe o piață cu $R_f$ = 6%:

$$
\text{Sharpe} = \frac{10 - 6}{8} = 0{,}5
$$

Sharpe > 1 = excelent, 0,5–1 = acceptabil, < 0,5 = slab raport randament/risc.

### Vremea & climatologia ANM

Administrația Națională de Meteorologie (ANM) publică temperaturi medii lunare și anuale folosind media aritmetică:

$$
T_{\text{lunară}} = \frac{1}{n} \sum_{i=1}^{n} T_i
$$

unde $T_i$ = temperatura medie zilnică, iar $n$ = numărul zilelor din lună.

Temperatura medie București pe ianuarie: ~−1°C; pe iulie: ~+24°C. Diferența ~25°C reflectă climatul temperat continental al Câmpiei Române.

### Sport — medii liga 1, fotbal, baschet

Mediile sportive sunt simple:
- **Goluri/meci** (FCSB sezon 2024-25): goluri marcate / meciuri jucate.
- **Procent reușită** (NBA, baschet RO): coșuri reușite / aruncări totale × 100.
- **Average de baseball/cricket**: hits / at-bats.

## Exemple rezolvate pas cu pas

### Exemplul 1 — Media simplă cu rotunjire

> Notele unui elev la matematică în semestrul I: 7, 8, 9, 6, 8, 9. Media?

1. Sumă: 7+8+9+6+8+9 = 47.
2. Numărul notelor: 6.
3. Media: 47/6 = 7,8333…
4. **Răspuns:** 7,83 (cu 2 zecimale) sau 8 (rotunjit la întreg, regula RO ≥ 5,50).

### Exemplul 2 — Media ponderată cu credite ECTS

> Sesiunea de iarnă, anul I la ASE:

| Materie | Notă | Credite (ECTS) |
|:--------|-----:|---------------:|
| Microeconomie | 9 | 6 |
| Matematici | 8 | 5 |
| Engleză | 10 | 3 |
| Drept | 7 | 4 |
| Statistică | 8 | 5 |

1. Suma ponderată: $9·6 + 8·5 + 10·3 + 7·4 + 8·5 = 54+40+30+28+40 = 192$.
2. Total credite: $6+5+3+4+5 = 23$.
3. Medie ponderată: $192/23 = 8{,}35$.

> **Notă:** la ASE/UB/UPB, ordinea pentru burse se face după media ponderată cu credite, NU după media aritmetică simplă. Vezi regulamentul facultății.

### Exemplul 3 — Mediana cu n par

> Salariile a 6 angajați (în RON): 3 500, 4 200, 5 800, 4 800, 25 000, 4 100.

1. Sortare: 3 500, 4 100, 4 200, 4 800, 5 800, 25 000.
2. Cele 2 valori centrale (poziții 3 și 4): 4 200 și 4 800.
3. Mediana: $(4\,200 + 4\,800)/2 = 4\,500$ RON.
4. Media (pentru comparație): $47\,400/6 = 7\,900$ RON.

**Concluzie:** outlier-ul (25 000) deformează media; mediana (4 500) reflectă mai onest realitatea.

### Exemplul 4 — Abaterea standard pas cu pas

> Datele: 4, 8, 6, 5, 3.

1. Media: $(4+8+6+5+3)/5 = 26/5 = 5{,}2$.
2. Abateri: $-1{,}2, +2{,}8, +0{,}8, -0{,}2, -2{,}2$.
3. Pătratele abaterilor: $1{,}44, 7{,}84, 0{,}64, 0{,}04, 4{,}84$.
4. Suma pătratelor: $14{,}80$.
5. Varianță: $14{,}80/5 = 2{,}96$.
6. Abatere standard: $\sqrt{2{,}96} \approx 1{,}72$.

### Exemplul 5 — Mod multimodal

> Mărimi de încălțăminte la o probă în magazin: 38, 39, 40, 39, 41, 38, 42, 40, 38.

Frecvențe: 38 apare de 3 ori; 39 de 2; 40 de 2; 41 și 42 — câte 1.
**Răspuns:** mod = 38.

## Variantă populațională vs. eșantion

Există **două formule** pentru abaterea standard, în funcție de ce calculezi:

### Populația întreagă (σ — sigma)

$$
\sigma = \sqrt{\frac{1}{n} \sum_{i=1}^{n}(x_i - \bar{x})^2}
$$

Folosit când ai TOATE datele unui grup închis (ex. notele din TOATĂ clasa, salariile din TOATĂ firma).

### Eșantion (s)

$$
s = \sqrt{\frac{1}{n-1} \sum_{i=1}^{n}(x_i - \bar{x})^2}
$$

Folosit când ai doar un EȘANTION dintr-o populație mai mare (sondaje, studii). Împărțirea cu $n-1$ (corecția lui Bessel) compensează subestimarea statistică.

> **În practică:** la BAC și în statistica descriptivă școlară RO se folosește varianta cu $n$ (populație). În cercetare științifică și sondaje folosește $n-1$ (eșantion). Calculatorul nostru folosește $n$ (populație) implicit.

## Distribuția normală și regula 68–95–99,7

În distribuții apropiate de **clopotul Gauss**, valorile se distribuie astfel în jurul mediei:

| Interval     | % din valori |
|:-------------|:-------------|
| $\bar{x} \pm 1\sigma$ | ~68%   |
| $\bar{x} \pm 2\sigma$ | ~95%   |
| $\bar{x} \pm 3\sigma$ | ~99,7% |

**Aplicație — IQ:** distribuția IQ are media 100 și σ = 15.
- 68% din populație: IQ între 85 și 115.
- 95%: IQ între 70 și 130.
- 99,7%: IQ între 55 și 145.

**Aplicație — înălțimea bărbaților RO:** medie ~177 cm, σ ~ 7 cm.
- 68% au între 170 și 184 cm.
- 95% au între 163 și 191 cm.

## Tabel rapid de comparație

| Măsura          | Formulă                    | Sensibilă la outliers? | Pentru date numerice? | Pentru date categorice? |
|:----------------|:---------------------------|:-----------------------|:----------------------|:------------------------|
| Medie aritmetică | $\sum x_i / n$            | DA (puternic)         | DA                    | NU                      |
| Medie geometrică | $\sqrt[n]{\prod x_i}$     | Mediu                 | DA (pozitive)         | NU                      |
| Medie armonică   | $n / \sum (1/x_i)$        | Da, invers            | DA (pozitive)         | NU                      |
| Mediană          | mijlocul șirului ordonat  | NU                    | DA                    | DA (ordonale)           |
| Mod              | valoarea cea mai frecventă| NU                    | DA                    | DA                      |
| Amplitudine $R$  | max − min                 | DA (extrem)           | DA                    | NU                      |
| Varianță σ²      | $\sum (x_i-\bar{x})^2 / n$| DA                    | DA                    | NU                      |
| Abatere stand. σ | $\sqrt{\sigma^2}$         | DA                    | DA                    | NU                      |

## Greșeli frecvente

1. **Confuzia medie ↔ mediană** la prezența outlier-ilor. „Salariul mediu RO este 5 600 RON” NU înseamnă că „jumătate câștigă peste 5 600”. Pentru asta vezi mediana (~4 800).
2. **Media procentelor cu baze diferite** — vezi capitolul medie ponderată.
3. **Media unor rate de creștere** cu media aritmetică — folosește geometrică.
4. **Neglijarea valorilor extreme** — outlier-ii pot fi erori (deci se elimină) sau cazuri reale rare (deci se păstrează). Întotdeauna investighează.
5. **Rotunjire prematură** — la calcule cu mai multe etape, păstrează 4–5 zecimale și rotunjește doar la final.
6. **Confuzie σ vs. σ²** — varianța (σ²) e în unități pătrate, abaterea (σ) în unități originale. Pentru raport „media ± dispersie” folosește σ.

## Surse și referințe

- [INS – Salariul mediu și median RO](https://insse.ro) — date oficiale.
- [Statistica descriptivă – Wikipedia](https://ro.wikipedia.org/wiki/Statistic%C4%83_descriptiv%C4%83) — concepte fundamentale.
- Programa BAC RO — clasa a IX-a și a X-a, capitolul „Statistică”.

## Calculatoare conexe

- [Calculator procente](/calculator/procent-calculator/) — pentru a converti notele/punctajele în procente.
- [Regula de trei simplă](/calculator/regula-de-trei-simpla/) — proporții directe folosite la medie ponderată.
- [Calculator IMC](/sanatate/calculator-imc/) — exemple de medie pentru greutate sănătoasă.
- [Calculator dobândă compusă](/finante/dobanda-compusa/) — folosește media geometrică pentru randament.
