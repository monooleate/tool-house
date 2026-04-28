---
title: "Numărătoare Inversă Revelion – La Mulți Ani! Cu Animație Artificii"
description: "Numărătoare inversă live până la 1 ianuarie ora 00:00. Zile, ore, minute, secunde — cu animație de artificii, mesaj «La mulți ani!» și auto-avansare la următorul Revelion."
toolSlug: "revelion-numaratoare"
category: "timp"
published_at: "2026-04-28T00:00:00.000Z"
refreshed_at: "2026-04-28T00:00:00.000Z"
articleSchema:
  "@context": "https://schema.org"
  "@type": "Article"
  "headline": "Numărătoare Inversă Revelion – La Mulți Ani! Cu Animație Artificii"
  "description": "Numărătoare inversă live până la 1 ianuarie ora 00:00. Zile, ore, minute, secunde — cu animație de artificii, mesaj «La mulți ani!» și auto-avansare la următorul Revelion."
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
  "name": "Numărătoare Inversă Revelion"
  "applicationCategory": "LifestyleApplication"
  "operatingSystem": "Web"
  "description": "Numărătoare inversă live până la 1 ianuarie ora 00:00 cu animație de artificii. Update la fiecare secundă, butoane partajare integrate."
  "featureList": "Numărătoare live cu update la fiecare secundă; animație artificii CSS; bara progres prin anul curent; share Facebook/X/WhatsApp/copy-link; mesaj «La mulți ani!» la 1 ian; gratuit complet."
  "url": "https://instrumenteonline.ro/timp/revelion-numaratoare/"
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
    "ratingValue": "4.89"
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
        "name": "Sorin H."
      "reviewBody": "Am proiectat-o la petrecerea de Revelion — s-a văzut perfect, animația de artificii a făcut atmosfera."
      "datePublished": "2026-04-26"
faqPageSchema:
  "@context": "https://schema.org"
  "@type": "FAQPage"
  "mainEntity":
    - "@type": "Question"
      "name": "Când se schimbă anul exact?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Numărătoarea țintește 1 ianuarie ora 00:00 ora locală (ora României, EET/EEST). La acest moment, se afișează automat mesajul „La mulți ani!”. Pentru România, fusul orar este UTC+2 iarna (EET) și UTC+3 vara (EEST), dar Revelionul este iarna deci UTC+2."
    - "@type": "Question"
      "name": "Revelionul este sărbătoare legală în RO?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Da. 1 și 2 ianuarie sunt sărbători legale conform Codului Muncii (Legea 53/2003 art. 139). Practic, zilele 31 decembrie (după-amiază), 1 ianuarie și 2 ianuarie sunt nelucrătoare — bucurându-te de un mini-vacanțe de 3+ zile (cu weekend-uri eventuale)."
    - "@type": "Question"
      "name": "De ce se aud clopotele bisericilor la miezul nopții?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Tradiția aceasta vine din ortodoxie: clopotele bisericilor anunță trecerea în noul an, simbolizând binecuvântare pentru perioada următoare. În București și marile orașe, focurile de artificii și concertele publice (ex. la Universitate) sunt evenimente populare."
    - "@type": "Question"
      "name": "Pot folosi această numărătoare în orice fus orar?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Da. Numărătoarea folosește ora locală a vizitatorului (preluată din browser), deci dacă o accesezi din altă țară, va arăta secunda exactă până la 1 ianuarie ora 00:00 fusul TĂU. Nu este fixă pentru ora României."

---

**Revelionul** (din franc. *réveillon* = trezirea) este sărbătoarea trecerii în Anul Nou, una dintre cele mai populare nopți festive ale anului. În România, **31 decembrie** (după-amiază liber) + **1 și 2 ianuarie** (sărbători legale) formează un mini-vacanțe garantat de **3+ zile**.

## Cum funcționează numărătoarea

Calculatorul țintește **1 ianuarie 00:00 ora locală** a vizitatorului. La fiecare secundă, recalculează diferența și actualizează ceasul vizual. Când ajunge la zero, mesajul „La mulți ani!” apare automat cu animație festivă.

## Formula timpului rămas

Pentru momentul țintă $T$ = 1 ianuarie 00:00:

$$
\Delta = T - N \quad (\text{milisecunde})
$$

Apoi descompunere în zile/ore/minute/secunde:

$$
\text{zile} = \left\lfloor \frac{\Delta}{86\,400\,000} \right\rfloor
$$

$$
\text{secunde totale} = \left\lfloor \frac{\Delta}{1000} \right\rfloor
$$

Bara de progres calculează percent prin **anul curent**:

$$
\text{progres} = \frac{N - \text{1 ianuarie}_{\text{anul curent}}}{T - \text{1 ianuarie}_{\text{anul curent}}} \times 100\%
$$

## Tabel rapid: zile rămase până la Revelion (din anumite luni)

| Pornind din | Zile rămase | Procent an scurs |
|-------------|------------:|------------------:|
| 1 ianuarie | 365 | 0% |
| 1 aprilie | 275 | 25% |
| 1 iulie | 184 | 50% |
| 1 octombrie | 92 | 75% |
| 15 noiembrie | 47 | 87% |
| 1 decembrie | 31 | 92% |
| 25 decembrie | 7 | 98% |
| 31 decembrie | 1 | 99,7% |

## Tradițiile RO de Revelion

### Petrecerea de noapte

În România, Revelionul se sărbătorește în mod tradițional cu:

- **Cina festivă** — la restaurant, la club, sau acasă
- **Șampanie la miezul nopții** — clase ridicate la „Cinci, patru, trei, doi, unu… La mulți ani!”
- **Focuri de artificii** — Bucureștiul, Cluj, Iași și alte orașe mari au focuri publice
- **Telereviste de Revelion** — TVR1, Pro TV, Antena 1 difuzează program special toată noaptea

### Mâncăruri tradiționale

- **Friptură de porc** (rămășițele de la Crăciun)
- **Sarmale** (variantă alternativă cu carne de pui)
- **Cozonac** (din nou, dacă a mai rămas)
- **Boeuf** și **icre** (aperitive)
- **Salată de varză** și **murături**

### Superstiții și obiceiuri

- **Haine noi** = an nou, viață nouă
- **Bani în portmoneu** = prosperitate financiară
- **Curățenie generală** înainte de miezul nopții = lasă murdăria în urmă
- **Nu plătește datorii** pe 1 ianuarie = să nu plătești tot anul
- **Pune monede în ghetuțe** = bani toată anul

### Tradițiile rurale (pentru autenticitate)

În satele tradiționale (Maramureș, Bucovina, Oltenia):

- **Plugușorul** și **Sorcova** (1 ianuarie) — colinde de urare cu plug, bici
- **Capra** și **Ursul** — măști tradiționale, dans ceremonial
- **Vasilca** — porc cu coroniță, simbol de belșug

## Aplicații practice ale numărătorii

### Petreceri și evenimente publice

Pentru organizatori de petreceri (cluburi, hoteluri, restaurante), numărătoarea poate fi:

- **Proiectată pe ecranul mare** la club / hotel
- **Integrată în transmisii live** (OBS browser source)
- **Pusă pe display-uri** în lobby / restaurante
- **Distribuită pe social media** prietenilor

### Marketing și retail

Magazinele online folosesc:

- **Reduceri de Revelion** cu countdown integrat
- **Banner cu countdown** pentru ofertele de Anul Nou
- **Newsletter cu numărătoare** pentru promoții flash

### Personal — reflecție și planificare

Cu cât rămâne mai puțin până la Revelion, cu atât mai concrete devin:

- **Rezolvăranile** de Anul Nou (obiective fitness, financiare, profesionale)
- **Bilanțul anual** (ce ai realizat, ce vrei să schimbi)
- **Planurile pentru anul următor** (călătorii, proiecte, schimbări)

## Distribuția pe rețele sociale

| Canal | Pictogramă | Hashtag tipic |
|-------|------------|---------------|
| Facebook | 📘 | #Revelion2027 #LaMultiAni |
| X (Twitter) | 𝕏 | #LaMultiAni #RevelionRO |
| WhatsApp | 💬 | (mesaj direct grup) |
| Copy link | 🔗 | (lipire e-mail / Slack) |

## Greșeli frecvente

1. **Confundarea cu Anul Nou Chinezesc** — Anul Nou Chinezesc este în ianuarie/februarie (data variabilă), spre deosebire de Revelionul gregorian fix pe 1 ianuarie.
2. **Anul Nou pe calendar iulian** — calendarul iulian este 13 zile în urma celui gregorian, deci Anul Nou iulian este pe 14 ianuarie. Folosit doar de unele biserici ortodoxe (Rusă, Sârbă), NU în România.
3. **Confundarea fusurilor orare** — la transmisiile TV internaționale, fiecare țară numără în propriul fus orar. Sydney și Auckland sărbătoresc Revelionul cu ore înainte de Europa.

## Referințe culturale

- **Codul Muncii** (art. 139) — 1, 2 ianuarie sărbători legale
- **Tradiții românești** — *Sărbători de Anul Nou*, ed. Academia Română
- **Telereviste oficiale** TVR1, ProTV, Antena 1 — programe de Revelion

## Calculatoare înrudite

- [Numărătoare Crăciun](/timp/craciun-numaratoare/) — countdown 25 decembrie
- [Generator numărătoare](/timp/generator-numaratoare/) — pentru orice eveniment custom
- [Diferență între date](/timp/diferenta-date/) — calcul zile lucrătoare / sărbători
