---
title: "Numărătoare Inversă Paști Ortodox – Algoritm Meeus și Calendar Iulian"
description: "Numărătoare inversă live până la Paștele ortodox calculat cu algoritmul Meeus pe calendarul iulian + 13 zile pentru anii 1900-2099."
toolSlug: "pasti-numaratoare"
category: "timp"
published_at: "2026-04-28T00:00:00.000Z"
refreshed_at: "2026-04-28T00:00:00.000Z"
articleSchema:
  "@context": "https://schema.org"
  "@type": "Article"
  "headline": "Numărătoare Inversă Paști Ortodox – Algoritm Meeus și Calendar Iulian"
  "description": "Numărătoare inversă live până la Paștele ortodox calculat cu algoritmul Meeus pe calendarul iulian + 13 zile pentru anii 1900-2099."
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
  "name": "Numărătoare Inversă Paști Ortodox"
  "applicationCategory": "LifestyleApplication"
  "operatingSystem": "Web"
  "description": "Numărătoare inversă live până la Paștele ortodox calculat cu algoritmul Meeus pe calendarul iulian, conversie în calendar gregorian (+13 zile, 1900-2099)."
  "featureList": "Numărătoare live cu update la fiecare secundă; algoritm Meeus iulian + conversie gregoriană; bara progres prin anul liturgic; share social; mesaj «Hristos a înviat!»; gratuit complet."
  "url": "https://instrumenteonline.ro/timp/pasti-numaratoare/"
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
    "ratingValue": "4.87"
    "reviewCount": 32
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
      "reviewBody": "Apreciez că folosește algoritmul Meeus corect — multe site-uri confundă Paștele ortodox cu cel catolic."
      "datePublished": "2026-04-26"
faqPageSchema:
  "@context": "https://schema.org"
  "@type": "FAQPage"
  "mainEntity":
    - "@type": "Question"
      "name": "De ce diferă Paștele ortodox de Paștele catolic?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Biserica Ortodoxă folosește calendarul iulian pentru calculul Paștelui (regula de la Conciliul de la Niceea, 325), apoi convertește data în calendar gregorian adăugând 13 zile (1900-2099). Biserica Catolică folosește direct calendarul gregorian. Diferența între cele 2 date variază: 0, 1, 4 sau 5 săptămâni."
    - "@type": "Question"
      "name": "Cum se calculează data Paștelui ortodox?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Algoritmul Meeus (anonim, secolul XIX): a = an mod 4, b = an mod 7, c = an mod 19, d = (19c+15) mod 30, e = (2a+4b−d+34) mod 7, lună = floor((d+e+114)/31), zi = (d+e+114) mod 31 + 1. Rezultat în calendar iulian; adaugi 13 zile pentru gregorian."
    - "@type": "Question"
      "name": "Care sunt sărbătorile legate de Paști în RO?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Vinerea Mare (Paști − 2 zile), Paștele (zi de duminică), A doua zi de Paști (Paști + 1, sărbătoare legală), Rusalii (Paști + 49 zile, duminică), A doua zi de Rusalii (Paști + 50, sărbătoare legală). Toate sunt zile nelucrătoare conform Codului Muncii art. 139."
    - "@type": "Question"
      "name": "De ce este Paștele sărbătoare mobilă?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Conform Conciliului de la Niceea (325 d.Hr.), Paștele se sărbătorește în prima duminică după prima lună plină de după echinocțiul de primăvară (~21 martie). Combinația ciclului lunar (29,5 zile) cu cel solar duce la fluctuația datei între ~22 martie și ~25 aprilie pentru calendarul gregorian."

---

**Paștele ortodox** este cea mai importantă sărbătoare a Bisericii Ortodoxe Române, prăznuind învierea lui Iisus Hristos. Spre deosebire de Paștele catolic (calendar gregorian), Paștele ortodox folosește calendarul iulian, iar conversia în calendarul civil (gregorian) se face adăugând **13 zile** (valabil pentru anii 1900-2099).

## Algoritmul Meeus

Algoritmul Meeus (numit după astronomul Jean Meeus, *Astronomical Algorithms*, 1991) este versiunea modernă a calculului „Computus” pentru data Paștelui pe calendarul iulian:

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
\text{lună}_{\text{iul}} = \left\lfloor \frac{d + e + 114}{31} \right\rfloor
$$

$$
\text{zi}_{\text{iul}} = ((d + e + 114) \mod 31) + 1
$$

### Conversia iulian → gregorian

Pentru anii **1900-2099**, calendarul iulian este în urma celui gregorian cu exact **13 zile**:

$$
\text{data}_{\text{greg}} = \text{data}_{\text{iul}} + 13 \text{ zile}
$$

În anul **2100** diferența va deveni 14 zile (datorită faptului că 2100 NU este an bisect în calendarul gregorian, dar ESTE în cel iulian).

## Exemplu: Paști ortodox 2026

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
\text{lună}_{\text{iul}} = \lfloor 122/31 \rfloor = 3
$$

$$
\text{zi}_{\text{iul}} = (122 \mod 31) + 1 = 30
$$

Data în calendar iulian: **30 martie 2026**. Adăugând 13 zile → **12 aprilie 2026** (calendar gregorian).

## Tabel de date Paști ortodox 2025-2035

| Anul | Paști ortodox (gregorian) | Paști catolic | Diferența |
|-----:|---------------------------|---------------|-----------|
| 2025 | 20 aprilie | 20 aprilie | 0 zile |
| 2026 | 12 aprilie | 5 aprilie | 7 zile |
| 2027 | 2 mai | 28 martie | 5 săpt. |
| 2028 | 16 aprilie | 16 aprilie | 0 zile |
| 2029 | 8 aprilie | 1 aprilie | 7 zile |
| 2030 | 28 aprilie | 21 aprilie | 7 zile |
| 2031 | 13 aprilie | 13 aprilie | 0 zile |
| 2032 | 2 mai | 28 martie | 5 săpt. |
| 2033 | 24 aprilie | 17 aprilie | 7 zile |
| 2034 | 9 aprilie | 9 aprilie | 0 zile |
| 2035 | 29 aprilie | 25 martie | 5 săpt. |

## Sărbătorile derivate din Paști

| Sărbătoare | Calcul | Caracteristică |
|------------|--------|----------------|
| Vinerea Mare | Paști − 2 zile | Sărbătoare legală RO (din 2018) |
| Sâmbăta Mare | Paști − 1 zi | Pregătire pentru Înviere |
| Paștele (Duminica) | – | Sărbătoare legală |
| A doua zi de Paști (Lunea Luminată) | Paști + 1 | Sărbătoare legală |
| Rusalii | Paști + 49 (duminică) | Sărbătoare mobilă, sosirea Sf. Duh |
| A doua zi de Rusalii | Paști + 50 (luni) | Sărbătoare legală |

## Tradițiile RO de Paști

### Postul Paștelui (7 săptămâni înainte)

Cel mai lung și sever post din calendarul ortodox: **40+ zile** plus **Săptămâna Patimilor** (ultima săptămână). Începe în Lunea Curată (după Duminica Lăsatului Sec). În prima și ultima săptămână, postul este strict (fără mâncare animală sau ulei).

### Săptămâna Patimilor (ultima săptămână)

- **Lunea Mare** — pregătirea curățării casei
- **Marțea Mare** — citirile evanghelice
- **Miercurea Mare** — Maslu (slujba pentru bolnavi)
- **Joia Mare** — vopsirea ouălor (tradiție: 12 ouă, simbol al apostolilor)
- **Vinerea Mare** — Denia, post negru, prohodul
- **Sâmbăta Mare** — pregătirea coșului de Paști
- **Duminica Învierii** — slujba de la miezul nopții

### Coșul de Paști

Tradițional, conține:

- **Pască** (cozonac dulce cu brânză)
- **Ouă roșii** (vopsite cu ceapă, sfeclă sau coloranți alimentari)
- **Cozonac** cu nucă sau mac
- **Miel** (friptură) sau drob (organe miel + verdeață)
- **Vin** și **lumânări** pentru sfințire

### Salutul de Paști

În ziua de Paști, oamenii își spun:

- *„Hristos a înviat!”* — răspuns: *„Adevărat a înviat!”*

Salutul se folosește timp de 40 de zile, până la Înălțarea Domnului.

## Aplicații practice ale numărătorii

### Pentru pregătirea spirituală

Numărătoarea inversă spre Paști poate fi folosită ca instrument de:

- **Conștientizare a Postului** — câte zile mai sunt de respectat
- **Plan de spovedanie** — săptămâni dinainte
- **Pregătirea coșului** — cu zile/săptămâni pentru cumpărături

### Pentru planificare familială

- **Călătorie acasă** — în România, mulți merg la familie pentru Paști
- **Concediu de primăvară** — combinând zilele lucrătoare cu sărbătoarea
- **Coordonare familie** — când vine bunica, când se vopsesc ouăle

### Pentru retail și industrie alimentară

- **Comenzi de Paști** (cozonac, miel, ouă) au sezonalitate clară
- **Florării** — lalele, narcise, zambile sunt cele mai vândute
- **Restaurante și catering** — meniuri speciale

## Greșeli frecvente

1. **Confundarea cu Paștele catolic** — diferența poate fi 0, 1, 4 sau 5 săptămâni; verifică întotdeauna calendarul ortodox.
2. **Neglijarea Vinerii Mari ca sărbătoare** — devenită sărbătoare legală în RO din 2018, mulți o uită.
3. **Calculul greșit al zilelor de post** — postul are 7 săptămâni, dar cu zile de dezlegare la pește pe parcurs.
4. **Confuzia anilor bisecți** — algoritmul Meeus funcționează corect și pentru anii bisecți (2024, 2028, 2032).

## Referințe științifice

- **Meeus J.** — *Astronomical Algorithms*, 1991 (formula completă a Paștelui)
- **Conciliul de la Niceea** (325 d.Hr.) — definiția canonică a Paștelui
- **Codul Muncii** (art. 139) — sărbătorile legale RO
- **Sinodul Bisericii Ortodoxe Române** — calendarul liturgic anual

## Calculatoare înrudite

- [Numărătoare Crăciun](/timp/craciun-numaratoare/) — Sărbătoare fixă pe 25 decembrie
- [Diferență date](/timp/diferenta-date/) — calculul zilelor lucrătoare cu sărbători
- [Generator numărătoare](/timp/generator-numaratoare/) — pentru orice eveniment custom
