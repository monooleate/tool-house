---
title: "Generator Cod QR cu Pictogramă Centrală – PNG, SVG, ECC Configurabil"
description: "Generator coduri QR online cu pictogramă în centru: galerie presetări (Wi-Fi, vCard, link, amuzante) sau încărcare imagine. Export PNG + SVG, ECC nivel H."
toolSlug: "generator-cod-qr"
category: "fejleszto"
published_at: "2026-04-28T00:00:00.000Z"
refreshed_at: "2026-04-28T00:00:00.000Z"
articleSchema:
  "@context": "https://schema.org"
  "@type": "Article"
  "headline": "Generator Cod QR cu Pictogramă Centrală – PNG, SVG, ECC Configurabil"
  "description": "Generator coduri QR online cu pictogramă în centru: galerie presetări (Wi-Fi, vCard, link, amuzante) sau încărcare imagine. Export PNG + SVG, ECC nivel H."
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
  "name": "Generator Cod QR cu Pictogramă"
  "applicationCategory": "DeveloperApplication"
  "operatingSystem": "Web"
  "description": "Generator coduri QR online cu pictogramă centrală (galerie presetări sau încărcare imagine), ECC nivel H pentru rezistență. Export PNG și SVG vectorial."
  "featureList": "ECC configurabil L/M/Q/H; pictogramă centrală cu 20 presetări (8 comune + 12 amuzante) sau încărcare imagine; șabloane URL/Wi-Fi/vCard/tel/mail/geo; export SVG vectorial + PNG raster; gratuit complet, fără tracking."
  "url": "https://instrumenteonline.ro/dezvoltator/generator-cod-qr/"
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
    "reviewCount": 42
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
        "name": "Andrei P."
      "reviewBody": "Pictograma în centru cu ECC H funcționează perfect — am tipărit pe meniul restaurantului meu și scanează imediat de pe orice telefon."
      "datePublished": "2026-04-28"
faqPageSchema:
  "@context": "https://schema.org"
  "@type": "FAQPage"
  "mainEntity":
    - "@type": "Question"
      "name": "Cum funcționează corectarea erorilor (ECC) într-un cod QR?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Codul QR utilizează codarea Reed-Solomon pentru a permite recuperarea informației chiar dacă o parte din cod este deteriorată sau acoperită. Există 4 niveluri: L (~7% recuperare), M (~15%), Q (~25%) și H (~30%). Nivelul H permite o pictogramă în centru (până la ~25% din suprafață) fără pierdere de scanabilitate."
    - "@type": "Question"
      "name": "De ce ECC nivel H este recomandat când adaug o pictogramă?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Pictograma centrală acoperă fizic o parte din modulele de date. Nivelul H tolerează ~30% pierdere, deci o pictogramă de 18-25% (cu margine albă) e încă scanabilă fără erori. La nivel L, aceeași pictogramă ar face codul ilizibil."
    - "@type": "Question"
      "name": "Ce este o capsulă vCard într-un cod QR?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "vCard (RFC 6350) este un format text standardizat pentru contacte. Un QR cu vCard permite scanarea cu telefonul și salvarea instantanee în agendă (nume, telefon, e-mail, adresă, organizație). Începe cu BEGIN:VCARD, conține câmpuri FN, TEL, EMAIL, etc., și se închide cu END:VCARD."
    - "@type": "Question"
      "name": "Cum se codează o rețea Wi-Fi într-un QR?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Formatul WIFI:T:WPA;S:NumeReteaWiFi;P:parolaTa;; este standardul de-facto. T este tipul de criptare (WPA/WEP/nopass), S este SSID-ul rețelei, P parola. Telefoanele Android scanează nativ și se conectează cu un singur tap; iOS suportă acest format din iOS 11."
    - "@type": "Question"
      "name": "Care este capacitatea maximă a unui cod QR?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "QR de versiune 40 (cea mai mare) acceptă maxim 4296 caractere alfanumerice la ECC nivel L, dar doar 1852 la nivel H. Pentru utilizare practică (cititor mobil, distanță de scanare normală), recomandăm sub 500 caractere și ECC ≥ M pentru fiabilitate."
    - "@type": "Question"
      "name": "Pot scana codul QR generat aici cu orice telefon?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Da. Standardul QR (ISO/IEC 18004) este deschis și suportat nativ de camerele Android și iOS din ultimii 7 ani, plus de toate aplicațiile populare (Google Lens, Apple Camera). Codurile generate respectă specificațiile, fără proprietar."
---

**Codul QR (Quick Response Code)** a fost inventat în 1994 de Denso Wave (Japonia) pentru urmărirea pieselor auto. Spre deosebire de codurile de bare 1D (EAN, CODE-128), QR este un cod 2D — codează informația în două dimensiuni, ceea ce-i permite o densitate de date mult mai mare. Astăzi, QR-ul este omniprezent: meniuri restaurant, plăți contactless, autentificare în aplicații, vCard pentru contact rapid.

## Anatomy unui cod QR

Un cod QR conține mai multe regiuni funcționale, codificate matematic:

| Regiune | Rol |
|---------|-----|
| **Finder Patterns** (3 colțuri) | Pătratele mari în 3 colțuri — ajută cititorul să detecteze rotația și perspectiva |
| **Alignment Patterns** | Pătrate mici (de la versiunea 2 în sus) — corecție pentru distorsiune perspectivă |
| **Timing Patterns** | Linii alternate negru/alb între finder patterns — ghid pentru spațierea modulelor |
| **Format Information** | 15 biți codificați la baza finder patterns — codifică nivelul ECC + masca aplicată |
| **Version Information** | (de la versiunea 7) — codifică numărul versiunii |
| **Data + Error Correction** | Modulele rămase — datele utile codate Reed-Solomon |

## Niveluri de corectare a erorilor (ECC)

Codul QR folosește **codarea Reed-Solomon** — o tehnică matematică din anii 1960, originar dezvoltată pentru transmisii spațiale. Reed-Solomon adaugă bytes redundanți care permit recuperarea informației chiar dacă o parte din cod este deteriorată, murdară sau acoperită cu o pictogramă.

| Nivel | Recuperare | Capacitate alfanumerică (v40) | Recomandare |
|-------|-----------:|------------------------------:|-------------|
| **L** (Low)      |  ~7% | 4296 | doar text scurt, mediu curat |
| **M** (Medium)   | ~15% | 3391 | uz general, fără pictogramă |
| **Q** (Quartile) | ~25% | 2420 | medii dificile, pictogramă mică |
| **H** (High)     | ~30% | 1852 | **pictogramă centrală până la 25%** |

### Capacitatea matematică a unui cod QR

Numărul de module pentru o versiune $v$ (1 ≤ v ≤ 40) este:

$$
n_{\text{modules}}(v) = (4v + 17)^2
$$

De exemplu, versiunea 1 are $21 \times 21 = 441$ module, versiunea 40 are $177 \times 177 = 31\,329$ module.

Capacitatea utilă de date depinde de nivelul ECC. Notăm cu $d_v$ numărul total de bytes de date și cu $e_v^{(L)}$ bytes-ii ECC pentru nivelul L. Atunci:

$$
\text{capacitate utilă} = d_v - e_v^{(L)}
$$

Pentru nivelul H, regula de bază este aproximativă:

$$
\text{recuperabil}_H \approx 0.30 \cdot d_v
$$

ceea ce înseamnă că până la 30% din simbolurile de date pot fi pierdute fără ca informația originală să fie afectată.

## De ce ECC nivel H este obligatoriu cu pictogramă

Pictograma centrală nu doar acoperă vizual zona — fizic *înlocuiește* modulele cu pixeli necunoscuți pentru cititor (interpretați ca erori). Mărimea suprafeței acoperite trebuie să fie sub limita de recuperare a nivelului ECC.

### Calculul suprafeței acoperite

Pentru o pictogramă pătrată de scală $s$ (raport față de lățimea totală a codului), suprafața acoperită este:

$$
A_{\text{acoperit}} = s^2
$$

Cu $s = 0.20$ (20%): $A = 0.04 = 4\%$ din suprafață.
Cu $s = 0.25$ (25%): $A = 0.0625 = 6.25\%$.

Dar atenție: **pictograma acoperă module date, nu pixeli proporțional**. La QR cu finder/alignment patterns, modulele active de date acoperite sunt aproximativ:

$$
A_{\text{module-data}} \approx s^2 \cdot \frac{n_{\text{data}}}{n_{\text{modules}}}
$$

unde $n_{\text{data}} / n_{\text{modules}} \approx 0.55$ (modulele de funcție ocupă ~45%).

Astfel, o pictogramă de $s = 0.25$ acoperă aproximativ:

$$
A_{\text{module-data}} \approx 0.0625 \cdot 0.55 \approx 3.4\%
$$

— mult sub 30% recuperabili la nivel H. **De aceea ECC H este sigur cu pictogramă până la 25%.**

### Exemplu numeric: pictogramă 25%, ECC H

Pentru un QR de versiune 5, ECC H:

- $n_{\text{modules}} = 37 \times 37 = 1369$
- $n_{\text{data}}$ ≈ 752 module
- Pictogramă de 25%: acoperă $\lfloor 1369 \cdot 0.0625 \rfloor = 85$ module
- Module data acoperite: ~$85 \cdot 0.55 \approx 47$ module
- Limită ECC H: $\lfloor 752 \cdot 0.30 \rfloor = 225$ module recuperabile

**Marjă de siguranță: 225 - 47 = 178 module** disponibile pentru orice altă deteriorare (zgârieturi, lumină, unghi).

## Formate de date standard în QR

Codul QR e doar o codare a unui șir de text. Aplicațiile interpretează acest text după convenții cunoscute:

### URL (cel mai comun)

```
https://instrumenteonline.ro
```

Telefoanele detectează automat schema `http://` / `https://` și afișează butonul „Deschide în browser”.

### Wi-Fi (WIFI:)

```
WIFI:T:WPA;S:NumeReteaWiFi;P:parolaTa123;;
```

Câmpuri:

| Câmp | Valori |
|------|--------|
| `T:` | tipul criptării — `WPA`, `WEP`, `nopass` |
| `S:` | SSID (numele rețelei) — atenție la caractere speciale (escape cu `\`) |
| `P:` | parola |
| `H:true` | (opțional) rețea ascunsă |

### vCard (RFC 6350)

```
BEGIN:VCARD
VERSION:3.0
FN:Ion Popescu
TEL:+40712345678
EMAIL:ion@exemplu.ro
ORG:InstrumenteOnline
URL:https://instrumenteonline.ro
END:VCARD
```

Permite salvare instantanee a contactului cu un singur tap pe telefon.

### Geo-locație

```
geo:44.4268,26.1025
```

(Latitudine, longitudine — București, Piața Unirii ca exemplu.) Se deschide direct în Maps / Google Maps.

### Telefon și e-mail

```
tel:+40712345678
mailto:contact@exemplu.ro?subject=Salut
```

### Plăți (EPC QR — SEPA Credit Transfer)

Standard european pentru plăți instant:

```
BCD
002
1
SCT
[BIC]
[Beneficiar]
[IBAN]
EUR12.50
[Referință]
```

Folosit larg în Germania, Austria, Olanda. România îl adoptă treptat odată cu plățile instant SEPA.

## Algoritmul de generare (overview)

Generarea unui cod QR implică următoarele etape:

1. **Analiză date** — alegerea modului optim (numeric, alfanumeric, byte, kanji)
2. **Codificare** — conversie la flux de biți cu prefix mod (4 biți) + lungime
3. **Padding** — completare la lungimea blocului versiunii alese
4. **Generare ECC Reed-Solomon** — calcul polinom de corecție pe blocuri
5. **Intercalare** — combinare date + ECC într-un flux ordonat
6. **Plasare module** — finder, timing, alignment, format, version, date
7. **Aplicare mască** — alegerea celei mai bune din 8 măști posibile (criteriu de uniformitate)
8. **Format info final** — codarea Reed-Solomon a 5 biți (mască + ECC) → 15 biți

Algoritmul respectă **ISO/IEC 18004:2015**.

## Aplicații tipice

### Wi-Fi pentru oaspeți

Generează un QR cu credențialele Wi-Fi și afișează-l în recepție / cameră. Oaspeții se conectează scanând cu telefonul (Android nativ; iOS din 11) — fără să tasteze parola lungă.

### Carte de vizită digitală (vCard)

Adaugă un QR mic (cu vCard) pe spatele cărții de vizită clasice. La networking, în loc să rugi cealaltă persoană să introducă manual contactul, scanează codul — telefonul salvează în 1 secundă în agendă.

### Meniu restaurant

QR pe masă cu URL spre meniul digital sau PDF. Pictograma centrală cu logo restaurant + ECC nivel H asigură recunoaștere instantanee și brand consistency.

### Bilete și evenimente

QR pe bilet cu UUID unic — la check-in se scanează, sistemul validează. Pictograma cu logo evenimentului previne falsificarea simplă (un QR fără logo este vizibil suspect).

### Plăți și tipsuri

QR cu IBAN preformatat — clientul deschide aplicația de banking, scanează, confirmă suma. Inițiat în Germania, adoptat treptat în zona euro.

## Greșeli frecvente

1. **ECC nivel L cu pictogramă** — codul devine neclar. Folosește mereu H când există pictogramă.
2. **Pictogramă peste 30% din suprafață** — chiar și cu ECC H, riscul devine semnificativ. Ține-te sub 25%.
3. **Contrast slab între module și fundal** — culorile pastel sau gradiente reduc rata de detecție. Recomandare: bare negre pe fundal alb, sau cel puțin contrast PCS ≥ 70%.
4. **Tipărire la rezoluție prea mică** — codul are nevoie de minim 0.4 mm/modul pentru scanare normală. La 21x21 module (versiunea 1), asta înseamnă min. ~10 mm latura totală.
5. **Lipsa quiet zone** — minim 4 module margine albă în jurul codului. Generatorul nostru o adaugă automat (configurabil în avansat).
6. **Date prea lungi** — >500 caractere creează un QR extrem de dens, greu de scanat de pe distanță. Folosește un URL scurt în loc.

## Recomandări tipar profesional

| Element | Valoare recomandată |
|---------|---------------------|
| Rezoluție tipar | min. 300 dpi |
| Mărime modul | min. 0.4 mm (~10 mm latura QR la versiunea 1) |
| Quiet zone | min. 4 module în jur (preferabil 6-8) |
| ECC cu pictogramă | **H** (obligatoriu) |
| Pictogramă centrală | max 25% din lățime, fundal alb +8-10% padding |
| Format export | SVG vectorial pentru orice scală |

## Calculatoare înrudite

- [Generator Cod de Bare](/dezvoltator/generator-cod-bare/) — EAN-13, CODE-128, UPC-A, ITF-14 cu cifră de control GS1
- [Codificare Base64](/dezvoltator/base64-codificare-decodificare/) — codare reversibilă pentru transmitere date binare
- [Codificare URL](/dezvoltator/url-codificare-decodificare/) — percent-encoding pentru parametri URL utilizați în QR
