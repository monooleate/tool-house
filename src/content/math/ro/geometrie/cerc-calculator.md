---
title: "Cercul – arie, perimetru, sector circular și π"
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

## Aplicații practice

### Construcții și design

- **Boltă, arcadă, fereastră circulară** — calcul material, aria de zidărie.
- **Plan teren circular** — suprafață utilă, lungime gard.
- **Bazine și fântâni** — volum apă, suprafață luciu.

### Calcul pizza/tort

Pentru o pizza cu **diametrul 30 cm** (rază 15 cm):
$$A = \pi \cdot 15^2 = 225\pi \approx 706{,}86 \text{ cm}^2$$

Pentru aceeași suprafață cu diametrul 40 cm (rază 20 cm), aria e 1.256,64 cm² — adică **77% mai mult**, deși diametrul a crescut doar cu 33%. (Aria crește cu pătratul razei.)

### Inginerie auto

- **Roți și pneuri** — circumferință = lungimea care contactează drumul într-o rotație.
- **Frâne cu disc** — calcul torsiune, suprafață frânare.
- **Raza de viraj** — minim necesar pentru a face un U-turn.

## Greșeli frecvente

1. **A = 2πr (greșit)** — confuzia cu perimetrul. Aria are r², perimetrul are r.
2. **Diametrul în loc de rază** în formule — verifică *mereu* dacă datele sunt rază sau diametru. Diferența: factor de 2 (sau 4 la arie).
3. **Sector în grade vs radiani** — formula e diferită după unitate; folosește cea care se potrivește.
4. **Aproximare cu 3.14 când e nevoie de 3.1416** — la subiecte de bacalaureat unde se cere 4 zecimale, aproximarea grosieră dă răspuns greșit.

## Calculatoare conexe

- [Triunghi dreptunghic](/geometrie/triunghi-dreptunghic/)
- [Funcții trigonometrice](/geometrie/functii-trigonometrice/)
- [Convertor radiani-grade](/geometrie/radiani-grade/)
- [Calculator dreptunghi](/geometrie/dreptunghi-calculator/)
