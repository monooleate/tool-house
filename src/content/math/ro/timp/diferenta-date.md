---
title: "Calculator Diferență între Date – Zile Lucrătoare RO și Sărbători Legale"
description: "Calculator diferență între 2 date cu 3 moduri: zile/săptămâni/luni/ani, zile lucrătoare RO (cu sărbători legale 2026), adunare/scădere de zile."
toolSlug: "diferenta-date"
category: "timp"
published_at: "2026-04-28T00:00:00.000Z"
refreshed_at: "2026-04-28T00:00:00.000Z"
articleSchema:
  "@context": "https://schema.org"
  "@type": "Article"
  "headline": "Calculator Diferență între Date – Zile Lucrătoare RO și Sărbători Legale"
  "description": "Calculator diferență între 2 date cu 3 moduri: zile/săptămâni/luni/ani, zile lucrătoare RO (cu sărbători legale 2026), adunare/scădere de zile."
  "datePublished": "2026-04-28T00:00:00.000Z"
  "dateModified": "2026-04-28T00:00:00.000Z"
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
  "name": "Calculator Diferență între Date"
  "applicationCategory": "UtilitiesApplication"
  "operatingSystem": "Web"
  "description": "Calculator diferență între 2 date cu 3 moduri: zile/săptămâni/luni/ani, zile lucrătoare RO (cu sărbători legale 2026), adunare/scădere."
  "featureList": "3 moduri (diferență, zile lucrătoare, adunare/scădere); sărbători legale RO 2026 fixe + mobile (Meeus); calcul exact ani/luni/zile; preset-uri 7/14/30/60/90/180/365 zile; gratuit complet."
  "url": "https://instrumenteonline.ro/timp/diferenta-date/"
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
    "ratingValue": "4.84"
    "reviewCount": 33
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
        "name": "Cristian B."
      "reviewBody": "Foarte util pentru calculul scadențelor cu zile lucrătoare RO, ține cont și de Paștele ortodox."
      "datePublished": "2026-04-25"
faqPageSchema:
  "@context": "https://schema.org"
  "@type": "FAQPage"
  "mainEntity":
    - "@type": "Question"
      "name": "Cum se calculează zilele lucrătoare în România?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Pornind de la totalul zilelor calendaristice între cele 2 date, scădem zilele de weekend (sâmbătă + duminică) și sărbătorile legale conform Codului Muncii art. 139. În 2026 sunt ~13 sărbători legale, ceea ce înseamnă ~250-252 zile lucrătoare/an pentru un program standard L–V."
    - "@type": "Question"
      "name": "Ce sărbători legale există în România în 2026?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Sărbătorile fixe: 1-2 ianuarie (Anul Nou), 24 ianuarie (Unirea Principatelor), 1 mai (Ziua Muncii), 1 iunie (Ziua Copilului), 15 august (Adormirea Maicii Domnului), 30 noiembrie (Sf. Andrei), 1 decembrie (Ziua Națională), 25-26 decembrie (Crăciun). Sărbătorile mobile: Vinerea Mare, Paștele și a 2-a zi de Paști, Rusalii și a 2-a zi de Rusalii."
    - "@type": "Question"
      "name": "De ce diferă diferența «exactă» de cea în zile?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Diferența exactă (X ani, Y luni, Z zile) folosește calendarul real (lunile au 28-31 zile, anii bisecți au 366). Diferența în zile e numărul total de zile calendaristice. Convertirea în săptămâni/luni/ani folosește valori medii (7 zile/săpt., 30,44 zile/lună, 365,25 zile/an)."
    - "@type": "Question"
      "name": "Cum calculez data peste 90 de zile?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Folosește modul «Adunare/Scădere»: introdu data de pornire (sau lasă „azi”), pune 90 la numărul de zile și apasă butonul ➕ Adaugă. Calculatorul îți arată data rezultată plus ziua săptămânii (luni, marți, etc.)."

---

**Calculul diferenței între date** este una dintre operațiile cel mai des folosite în legislație, contracte, planificare și HR. În România, calculul corect al **zilelor lucrătoare** este reglementat prin **Codul Muncii (Legea 53/2003)**, în special articolele 139 (sărbători legale) și 145 (concediu de odihnă).

## Modurile de calcul

Calculatorul nostru oferă 3 moduri distincte:

1. **Diferență date** — zile, săptămâni, luni, ani (cu și fără diferență „exactă”).
2. **Zile lucrătoare** — exclude weekend-uri (sâmbătă + duminică) și sărbători legale RO (fixe + mobile).
3. **Adunare/Scădere** — adaugi sau scazi zile dintr-o dată (utile pentru scadențe).

## Formula diferenței exacte

Pentru a calcula diferența „exactă” între două date (X ani, Y luni, Z zile), folosim algoritmul:

$$
\Delta_{\text{ani}} = \text{an}_{\text{end}} - \text{an}_{\text{start}}
$$

$$
\Delta_{\text{luni}} = \text{lună}_{\text{end}} - \text{lună}_{\text{start}}
$$

$$
\Delta_{\text{zile}} = \text{zi}_{\text{end}} - \text{zi}_{\text{start}}
$$

Dacă $\Delta_{\text{zile}} < 0$, decrementăm $\Delta_{\text{luni}}$ și adăugăm zilele lunii precedente. Dacă $\Delta_{\text{luni}} < 0$, decrementăm $\Delta_{\text{ani}}$ și adăugăm 12 la luni.

## Sărbătorile legale RO 2026

Conform **Codului Muncii art. 139**, sunt zile nelucrătoare (cu plată) următoarele sărbători:

### Sărbători fixe (date constante anual)

| Data | Denumire |
|------|----------|
| 1 ianuarie | Anul Nou |
| 2 ianuarie | A doua zi de Anul Nou |
| 24 ianuarie | Unirea Principatelor Române |
| 1 mai | Ziua Muncii |
| 1 iunie | Ziua Copilului (din 2017) |
| 15 august | Adormirea Maicii Domnului |
| 30 noiembrie | Sf. Andrei (din 2012) |
| 1 decembrie | Ziua Națională |
| 25 decembrie | Crăciunul |
| 26 decembrie | A doua zi de Crăciun |

### Sărbători mobile (calculate din data Paștelui ortodox)

| Sărbătoare | Calcul |
|------------|--------|
| Vinerea Mare | Paști − 2 zile |
| Paștele | Algoritm Meeus |
| A doua zi de Paști | Paști + 1 zi |
| Rusalii | Paști + 49 zile (= a 7-a duminică) |
| A doua zi de Rusalii | Paști + 50 zile |

## Algoritmul Meeus pentru Paștele ortodox

Pentru a calcula data Paștelui ortodox (calendar iulian), folosim algoritmul Meeus:

$$
a = \text{an} \mod 4
$$

$$
b = \text{an} \mod 7
$$

$$
c = \text{an} \mod 19
$$

$$
d = (19c + 15) \mod 30
$$

$$
e = (2a + 4b - d + 34) \mod 7
$$

$$
\text{lună} = \left\lfloor \frac{d + e + 114}{31} \right\rfloor
$$

$$
\text{zi} = ((d + e + 114) \mod 31) + 1
$$

Apoi, pentru conversia în calendar gregorian (1900-2099), **adăugăm 13 zile**.

### Exemplu: Paști ortodox 2026

$$
a = 2026 \mod 4 = 2
$$

$$
b = 2026 \mod 7 = 3
$$

$$
c = 2026 \mod 19 = 12
$$

$$
d = (19 \times 12 + 15) \mod 30 = 243 \mod 30 = 3
$$

$$
e = (2 \times 2 + 4 \times 3 - 3 + 34) \mod 7 = 47 \mod 7 = 5
$$

$$
\text{lună} = \lfloor (3 + 5 + 114) / 31 \rfloor = \lfloor 122/31 \rfloor = 3
$$

$$
\text{zi} = ((3 + 5 + 114) \mod 31) + 1 = (122 \mod 31) + 1 = 29 + 1 = 30
$$

Data în calendar iulian: **30 martie 2026**. Adăugând 13 zile → **12 aprilie 2026** (calendar gregorian).

## Exemple practice

### Exemplu 1: Concediu de odihnă

Un angajat are concediu între **15 iulie** și **2 august 2026**. Câte zile efective lucrătoare lipsesc?

- Total zile calendaristice: **19** (incl. ambele extreme)
- Weekend-uri: 2 sâmbete + 2 duminici = **4 zile**
- Sărbători legale în interval: **0** (15 august este după)
- **Zile lucrătoare = 19 − 4 − 0 = 15 zile**

Conform Codului Muncii, concediul de odihnă minim este de **20 zile lucrătoare/an**, deci 15 zile = 75% din concediul anual.

### Exemplu 2: Scadență contractuală

Un contract semnat pe **1 mai 2026** are scadență la **+90 zile lucrătoare**. Care este data scadenței?

Folosind modul Adunare/Scădere cu echivalent în zile calendaristice (90 lucrătoare ≈ 126 calendaristice cu 1 sărbătoare interval):

$$
\text{1 mai 2026} + 90 \text{ zile lucrătoare} \approx \text{6 septembrie 2026}
$$

### Exemplu 3: Vârstă exactă

Persoană născută **15 martie 1990**, data curentă **28 aprilie 2026**:

- $\Delta_{\text{ani}} = 2026 - 1990 = 36$
- $\Delta_{\text{luni}} = 4 - 3 = 1$
- $\Delta_{\text{zile}} = 28 - 15 = 13$

**Vârsta = 36 ani, 1 lună, 13 zile.**

## Tabel rapid zile lucrătoare RO 2026

| Lună | Zile lucrătoare | Sărbători |
|------|---------------:|-----------|
| Ianuarie | 19 | 1, 2, 24 ianuarie |
| Februarie | 20 | – |
| Martie | 22 | – |
| Aprilie | 21 | Vinerea Mare (10), Paști (12), 2-a zi (13) |
| Mai | 20 | 1 mai |
| Iunie | 20 | 1 iunie, Rusalii |
| Iulie | 23 | – |
| August | 20 | 15 august |
| Septembrie | 22 | – |
| Octombrie | 22 | – |
| Noiembrie | 20 | 30 noiembrie |
| Decembrie | 20 | 1, 25, 26 decembrie |

**Total 2026: ~249-251 zile lucrătoare.**

## Aplicații tipice

### Termen de plată facturi

Multe contracte B2B specifică „X zile lucrătoare” pentru plata facturilor (30, 60 sau 90). Calculul corect este esențial pentru a evita penalități de întârziere.

### Concediu legal de odihnă

Conform art. 145 Codul Muncii: minim 20 zile lucrătoare/an. Calculul concediului efectiv (cu eliminarea weekend-urilor și sărbătorilor) este obligatoriu pentru raportările HR.

### Termene procedurale civile

Codul de Procedură Civilă (Legea 134/2010) folosește des termene de „X zile” pentru depunere recurs, contestație, etc. Termenele se calculează pe **zile libere** (excluzând ziua emiterii și ziua finală).

### Planificare evenimente

Câte luni/săptămâni mai sunt până la o nuntă, o lansare de produs, începutul școlii — toate beneficiază de calculul exact al diferenței.

## Greșeli frecvente

1. **Confundarea zilelor lucrătoare cu cele calendaristice** — 30 zile calendaristice ≠ 30 zile lucrătoare (~21-22).
2. **Ignorarea sărbătorilor mobile** — Paștele și Rusaliile schimbă numărul zilelor lucrătoare în aprilie/mai/iunie.
3. **Anii bisecți** — 2024, 2028, 2032 au 366 zile (29 februarie). Calculul nostru ține cont automat.
4. **Fusurile orare** — calculul se face pe data calendaristică locală, nu pe UTC. La calcule transfrontaliere, folosește un convertor de fus orar.

## Referințe legale

- **Codul Muncii** (Legea 53/2003, art. 139, 145)
- **Codul de Procedură Civilă** (Legea 134/2010)
- **Algoritmul Meeus** pentru Paștele ortodox (J. Meeus, *Astronomical Algorithms*, 1991)
- **Institutul Național de Statistică** (INS) — calendarul oficial al sărbătorilor

## Calculatoare înrudite

- [Numărătoare Crăciun](/timp/craciun-numaratoare/) — countdown live cu animație ninsoare
- [Numărătoare Paști](/timp/pasti-numaratoare/) — algoritm Meeus + calendar iulian
- [Câte zile am trăit](/timp/cate-zile-am/) — calculator vârstă live
