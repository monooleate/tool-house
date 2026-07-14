---
title: "Calculator cerc – arie, perimetru, rază și sector circular"
description: "Formulele cercului: A = πr², P = 2πr, sector circular, segment de cerc. Exemple rezolvate și aplicații practice."
toolSlug: "cerc-calculator"
category: "geometrie"
published_at: "2026-04-25T00:00:00.000Z"
refreshed_at: "2026-04-25T00:00:00.000Z"
articleSchema:
  "@context": "https://schema.org"
  "@type": "Article"
  "headline": "Cercul – arie, perimetru, sector circular și π"
  "description": "Formulele cercului: A = πr², P = 2πr, sector circular, segment de cerc. Exemple rezolvate și aplicații practice."
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
  "name": "Calculator Cerc"
  "applicationCategory": "EducationalApplication"
  "operatingSystem": "Web"
  "description": "Calculator complet pentru cerc: din rază, diametru, perimetru sau arie obține restul automat. Suport pentru sector circular și segment de cerc cu unghi central."
  "featureList": "4 moduri de input (rază, diametru, perimetru, arie); mod sector circular și segment; SVG live; valori uzuale; gratuit."
  "url": "https://instrumenteonline.ro/geometrie/cerc-calculator/"
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
    "ratingValue": "4.95"
    "reviewCount": 39
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
        "name": "Sorin R."
      "reviewBody": "Modul sector + segment cu unghi central e excelent pentru proiectele de arhitectură."
      "datePublished": "2026-04-15"
faqPageSchema:
  "@context": "https://schema.org"
  "@type": "FAQPage"
  "mainEntity":
    - "@type": "Question"
      "name": "Care este formula pentru aria cercului?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "A = π · r², unde r este raza. Exemplu: pentru r = 5 cm, A = π · 25 ≈ 78,54 cm²."
    - "@type": "Question"
      "name": "Care este formula pentru perimetrul cercului?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "P = 2π · r = π · d, unde r este raza și d diametrul. Numit și circumferință sau lungime a cercului."
    - "@type": "Question"
      "name": "Cât este π?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "π (pi) ≈ 3,14159265... este numărul irațional egal cu raportul dintre circumferință și diametru, indiferent de mărimea cercului."
    - "@type": "Question"
      "name": "Cum calculez aria unui sector circular?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "A_sector = (α / 360°) × π · r², unde α este unghiul central în grade. Sau echivalent: A_sector = (1/2) · r² · α (cu α în radiani)."
    - "@type": "Question"
      "name": "Care e diferența între sector și segment?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Sectorul = «felie de tort» (între 2 raze și un arc). Segmentul = «coajă» (între un arc și o coardă). Aria segmentului = aria sector − aria triunghi format din cele 2 raze."

---

Cercul este probabil cea mai studiată figură geometrică din matematică. Definit ca **locul geometric al punctelor egal depărtate de un punct fix** (centrul), are o singură măsură primară (raza) din care derivă toate celelalte: diametru, perimetru, arie.

## Definiții și notații

- **Centrul** O — punctul fix.
- **Raza** r — distanța comună de la centru la orice punct de pe cerc.
- **Diametrul** d = 2r — coarda care trece prin centru.
- **Coarda** — segment care unește două puncte de pe cerc.
- **Arcul** — porțiune de cerc între două puncte.
- **Tangenta** — dreapta care atinge cercul într-un singur punct, perpendiculară pe rază.

## Formulele de bază

### Diametrul

$$
d = 2r
$$

### Perimetrul (circumferința)

$$
P = 2\pi r = \pi d
$$

### Aria

$$
A = \pi r^2
$$

## Numărul π

π (pi) ≈ **3,14159 26535 89793...** este o constantă irațională. Iraționalitatea sa a fost demonstrată de **Lambert** în 1761, iar transcendentă de **Lindemann** în 1882 — rezolvând definitiv problema veche de 2.000 de ani a cuadraturii cercului (imposibilă cu rigla și compasul).

Pentru calcule școlare:
- **3,14** — aproximare uzuală
- **3,1416** — bacalaureat
- **22/7 ≈ 3,143** — aproximare medievală
- **355/113 ≈ 3,141593** — surprinzător de precisă

## Sectorul circular

Sectorul este zona delimitată de două raze și arcul dintre ele (forma de «felie de tort»).

### Lungimea arcului

Cu unghiul central α în **grade**:

$$
\ell = \frac{\alpha}{360°} \cdot 2\pi r
$$

Cu α în **radiani**:

$$
\ell = r \cdot \alpha
$$

### Aria sectorului

Cu α în **grade**:

$$
A_{sector} = \frac{\alpha}{360°} \cdot \pi r^2
$$

Cu α în **radiani**:

$$
A_{sector} = \frac{1}{2} r^2 \alpha
$$

## Segmentul de cerc

Segmentul este zona dintre un arc și coarda corespunzătoare (forma de «coajă»). Aria sa se obține scăzând triunghiul format din cele două raze:

$$
A_{segment} = A_{sector} - A_{triunghi} = \frac{1}{2} r^2 (\alpha - \sin \alpha)
$$

unde α este în radiani.

## Exemple rezolvate

### Exemplu 1: aria și perimetrul unui cerc cu r = 7 cm

$$
A = \pi \cdot 7^2 = 49\pi \approx 153{,}94 \text{ cm}^2
$$

$$
P = 2\pi \cdot 7 = 14\pi \approx 43{,}98 \text{ cm}
$$

### Exemplu 2: găsește raza dacă A = 314 cm²

$$
r = \sqrt{\frac{A}{\pi}} = \sqrt{\frac{314}{\pi}} \approx 9{,}998 \approx 10 \text{ cm}
$$

### Exemplu 3: sector cu r = 6 cm, α = 60°

$$
A_{sector} = \frac{60}{360} \cdot \pi \cdot 6^2 = \frac{1}{6} \cdot 36\pi = 6\pi \approx 18{,}85 \text{ cm}^2
$$

$$
\ell = \frac{60}{360} \cdot 2\pi \cdot 6 = 2\pi \approx 6{,}28 \text{ cm}
$$

## Tabel — corespondențe rapide între r, d, P, A

Tabel util pentru estimări mentale și verificare rapidă pe șantier:

| Sugar (r) | Diametru (d) | Perimetru (P) | Arie (A)        |
|----------:|-------------:|--------------:|----------------:|
| 1 cm      | 2 cm         | 6,28 cm       | 3,14 cm²        |
| 5 cm      | 10 cm        | 31,42 cm      | 78,54 cm²       |
| 10 cm     | 20 cm        | 62,83 cm      | 314,16 cm²      |
| 15 cm     | 30 cm        | 94,25 cm      | 706,86 cm²      |
| 20 cm     | 40 cm        | 125,66 cm     | 1 256,64 cm²    |
| 50 cm     | 100 cm = 1 m | 314,16 cm     | 7 853,98 cm² ≈ 0,79 m² |
| 1 m       | 2 m          | 6,28 m        | 3,14 m²         |
| 5 m       | 10 m         | 31,42 m       | 78,54 m²        |
| 10 m      | 20 m         | 62,83 m       | 314,16 m²       |

> **Truc rapid:** dublu diametru → arie de 4 ori mai mare (din $A = \pi r^2$, raza crește la dublu). Pizza de 40 cm = 4 × pizza de 20 cm! Atenție la prețuri: o pizza familială (40 cm) la 80 RON e mai economică decât 4 pizze mici (20 cm) la 25 RON fiecare = 100 RON.

## Tabel — sectoare și segmente la r = 10

Pentru un cerc cu raza 10 (orice unitate), iată valorile clasice:

| Unghi α | Lungime arc $\ell$ | Arie sector | Arie segment |
|--------:|-------------------:|------------:|-------------:|
| 30°     | 5,24               | 26,18       | 1,31         |
| 45°     | 7,85               | 39,27       | 3,86         |
| 60°     | 10,47              | 52,36       | 9,06         |
| 90°     | 15,71              | 78,54       | 28,54        |
| 120°    | 20,94              | 104,72      | 61,42        |
| 180°    | 31,42 (=π·d/2)     | 157,08 (=A/2)| 157,08 (semicerc) |
| 270°    | 47,12              | 235,62      | 285,62       |
| 360°    | 62,83 (=P)         | 314,16 (=A) | -            |

## Cercul în context geometric

### Cercul circumscris unui poligon

Pentru un poligon regulat cu $n$ laturi de lungime $a$, raza cercului circumscris este:

$$
R = \frac{a}{2 \sin(180°/n)}
$$

**Exemple:**
- Triunghi echilateral ($n=3$): $R = a/\sqrt{3}$.
- Pătrat ($n=4$): $R = a\sqrt{2}/2$ (jumătate din diagonală).
- Hexagon ($n=6$): $R = a$ (raza = latura — proprietate remarcabilă).

### Cercul înscris

Raza cercului înscris într-un poligon regulat:

$$
r = \frac{a}{2 \tan(180°/n)}
$$

### Triunghi dreptunghic & cerc

**Proprietatea fundamentală:** într-un triunghi dreptunghic, **mijlocul ipotenuzei este centrul cercului circumscris**, iar **raza este jumătate din ipotenuză** (vezi articolul [Triunghi dreptunghic](/geometrie/triunghi-dreptunghic/)).

Aceasta e cunoscută ca **teorema lui Thales**: dacă un punct $P$ se află pe un cerc cu diametrul $AB$, atunci unghiul $\widehat{APB} = 90°$.

## Lungimea arcului — derivare din unghi

### Formula pentru unghi în grade

$$
\ell = \frac{\alpha}{360°} \cdot 2\pi r
$$

### Formula pentru unghi în radiani

$$
\ell = r \cdot \alpha
$$

> **Conversie rapidă:** $1 \text{ rad} = 180°/\pi \approx 57{,}30°$. Pentru a converte un unghi din grade în radiani: $\alpha_{\text{rad}} = \alpha_{\text{grade}} \cdot \pi/180$. Vezi și [Convertor radiani-grade](/geometrie/radiani-grade/).

## Probleme rezolvate pas cu pas

### Exemplul 1 — pizza Hanul lui Manuc

> O pizza din meniul Hanul lui Manuc are diametrul 32 cm. Câți cm² de pizza primești?

$$
r = 16 \text{ cm}, \quad A = \pi \cdot 16^2 = 256\pi \approx 804{,}25 \text{ cm}^2
$$

### Exemplul 2 — terenul circular din Bărăgan

> Un fermier din Bărăgan dorește să iriguie un teren circular cu pivot central. Pivotul are 250 m. Cât teren irigă?

$$
A = \pi \cdot 250^2 = 62\,500\pi \approx 196\,350 \text{ m}^2 \approx 19{,}6 \text{ ha}
$$

Perimetrul gardului: $P = 2\pi \cdot 250 \approx 1\,571$ m.

### Exemplul 3 — Arena Națională, București

> Pista de atletism de la Arena Națională are raza interioară 36,5 m la curbe. Care e lungimea unei curbe (semicerc, 180°)?

$$
\ell = \pi \cdot 36{,}5 \approx 114{,}67 \text{ m}
$$

Pista de atletism standard IAAF are 400 m totală, cu 2 curbe (~ 230 m) și 2 linii drepte (~ 170 m).

### Exemplul 4 — sector pentru tort

> Tăiem un tort rotund cu diametrul 28 cm în 8 felii egale. Care e aria unei felii și lungimea „crustei” (arcul exterior)?

- Raza: $r = 14$ cm.
- Unghi felie: $\alpha = 360°/8 = 45°$.
- Arie felie: $A = (45/360) \cdot \pi \cdot 14^2 = (\pi \cdot 196)/8 \approx 76{,}97$ cm².
- Arc: $\ell = (45/360) \cdot 2\pi \cdot 14 \approx 11{,}00$ cm.

### Exemplul 5 — fereastra rotundă (oculus)

> O fereastră rotundă (de tip „oculus”) la o vilă în Predeal are diametrul 80 cm. Câtă suprafață de geam și cât profil metalic se cumpără pentru ramă?

- Suprafață geam: $A = \pi \cdot 40^2 = 5\,026{,}55$ cm² ≈ 0,503 m².
- Lungime profil ramă (perimetru): $P = \pi \cdot 80 \approx 251{,}33$ cm.

### Exemplul 6 — cisternă cilindrică (volumul folosește aria circulară)

> O cisternă de apă pentru o casă din Bran are raza interioară 1,2 m și înălțimea 3 m. Câți litri încape?

$$
V = \pi r^2 \cdot h = \pi \cdot 1{,}44 \cdot 3 \approx 13{,}57 \text{ m}^3 = 13\,570 \text{ litri}
$$

## Aplicații practice — ghid RO

### Construcții și design

- **Bolți, arcade, fereastră circulară (oculus)** — în arhitectura mănăstirilor moldovenești (Voroneț, Sucevița, Putna), arcadele se calculează pe bază de sectoare circulare.
- **Plan teren circular** — în zonele agricole (Bărăgan, Câmpia de Vest), terenurile irigate cu pivot central sunt cercuri perfecte vizibile pe hartă.
- **Bazine și fântâni** — fântâni publice (Piața Universității, București), volum apă pentru bazine de înot rotunde.

### Inginerie auto & cauciucuri RO

Cauciucuri auto disponibile la Vianor, Continental, Cordiant — diametrul total se calculează din eticheta tip „205/55 R16”:
- 205 = lățime banda (mm)
- 55 = înălțime profil (% din lățime)
- R16 = diametru jantă (inch)

Diametru total: $d = 16 \cdot 25{,}4 + 2 \cdot 0{,}55 \cdot 205 = 406{,}4 + 225{,}5 = 631{,}9$ mm. Circumferință: $P = \pi \cdot 631{,}9 \approx 1\,985$ mm. La 1 km parcurs, roata face $1\,000\,000 / 1\,985 \approx 504$ rotații.

### Bucătărie

- **Pizza & tort:** suprafața crește cu pătratul razei. Pizza de 40 cm = 4 pizze de 20 cm.
- **Tigaie & wok:** alegerea diametrului = aria de gătire utilă.
- **Tava de pâine** rotundă (diametru 25 cm): $A = \pi \cdot 12{,}5^2 \approx 491$ cm² — suprafață de coacere.

### Sport — pista atletism, terenuri, mingi

- **Pista de atletism** standard IAAF — 400 m, cu 2 semicercuri de raze între 36,5 și 38 m.
- **Cercul central fotbal** (Arena Națională) — raza 9,15 m, arie $\approx 263$ m².
- **Cercul de aruncări** atletism (greutate, disc, ciocan) — diametru 2,135 m.
- **Mingea** de fotbal — circumferința 68–70 cm (FIFA), raza ~ 11 cm.

### Astronomie — orbite circulare

Aproximarea orbitelor planetare ca cercuri:
- Raza orbitei Pământului ≈ 149,6 milioane km (1 UA).
- Perimetru: $P = 2\pi \cdot 149{,}6 \cdot 10^6 \approx 940$ milioane km/an.
- Viteza Pământului: $940/365{,}25 \approx 2{,}57$ milioane km/zi ≈ 107 270 km/h.

## Curiozități despre π

- **Iraționalitate:** demonstrată de **Lambert** (1761) — π nu se poate scrie ca raport de două întregi.
- **Transcendență:** demonstrată de **Lindemann** (1882) — π nu este rădăcina niciunei ecuații polinomiale cu coeficienți raționali. Aceasta a rezolvat problema veche de 2 000 de ani a **cuadraturii cercului** (imposibilă cu rigla și compasul).
- **Babilonienii** foloseau aproximarea $\pi \approx 3$ (sau $25/8 = 3{,}125$).
- **Arhimede** (~250 î.Hr.) a calculat $223/71 < \pi < 22/7$ folosind poligoane înscrise/circumscrise cu 96 laturi.
- **Zhu Chongzhi** (China, sec. V) a obținut $\pi \approx 355/113$ — corect la 7 zecimale, recordul timp de 800 de ani.
- **Calcule moderne:** în 2022, Google Cloud a calculat π cu **100 trilioane de cifre**.
- **3,14159…** — primele 6 cifre sunt suficiente pentru a calcula circumferința Pământului cu eroare < 1 cm.

### Tabel π — diferite aproximări

| Pretenție de precizie | Valoare        | Eroare relativă       |
|:----------------------|:---------------|:----------------------|
| 3                     | 3              | 4,5%                  |
| 22/7                  | 3,14286…       | 0,04%                 |
| 3,14                  | 3,14           | 0,05%                 |
| 3,1416                | 3,1416         | 0,0002%               |
| 355/113               | 3,14159292…    | 0,00001%              |
| Real (la 10 zec.)     | 3,1415926536   | -                     |

## Greșeli frecvente

1. **$A = 2\pi r$ (greșit)** — confuzia cu perimetrul. Aria are $r^2$, perimetrul are $r$.
2. **Diametrul în loc de rază** în formule — verifică ÎNTOTDEAUNA dacă datele sunt rază sau diametru. Diferență: factor 2 (sau 4 la arie).
3. **Sector în grade vs. radiani** — formulele sunt diferite după unitate. Pentru calcul rapid, păstrează-te cu gradele; la BAC clasa a XI-a se cer adesea radiani.
4. **Aproximare cu 3,14 când e nevoie de 3,1416** — la subiecte de bacalaureat unde se cere precizie, aproximarea grosieră dă răspuns greșit.
5. **Confuzia perimetru cu lungime arc** — perimetrul cercului ÎNTREG e $2\pi r$; lungimea unui arc parțial e proporțională cu unghiul.
6. **Calcul aria sector cu unghi în radiani fără ajustare** — pentru radiani: $A = r^2 \alpha / 2$, NU $A = (\alpha/360) \cdot \pi r^2$.

## Surse și referințe

- [Cerc – Wikipedia](https://ro.wikipedia.org/wiki/Cerc) — definiție și proprietăți matematice.
- [Pi – Wolfram MathWorld](https://mathworld.wolfram.com/Pi.html) — istoric și calculul lui π.
- Programa BAC RO — clasa a VII-a (introducere cerc), a IX-a (cercul în plan), a XI-a (radiani și sectoare).

## Calculatoare conexe

- [Triunghi dreptunghic](/geometrie/triunghi-dreptunghic/) — cercul circumscris triunghiului dreptunghic.
- [Funcții trigonometrice](/geometrie/functii-trigonometrice/) — pentru calculul lungimilor în sectoare.
- [Convertor radiani-grade](/geometrie/radiani-grade/) — conversia necesară pentru formulele cu unghi.
- [Calculator dreptunghi](/geometrie/dreptunghi-calculator/) — diagonala dreptunghiului folosește Pitagora.
