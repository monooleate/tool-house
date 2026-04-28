---
title: "Generator Cod de Bare – EAN-13, CODE-128, UPC-A, ITF-14"
description: "Generator coduri de bare online cu validare automată a cifrei de control modulo-10. Suportă EAN-13, CODE-128, UPC-A, ITF-14. Export SVG vectorial și PNG raster."
toolSlug: "generator-cod-bare"
category: "fejleszto"
published_at: "2026-04-28T00:00:00.000Z"
refreshed_at: "2026-04-28T00:00:00.000Z"
articleSchema:
  "@context": "https://schema.org"
  "@type": "Article"
  "headline": "Generator Cod de Bare – EAN-13, CODE-128, UPC-A, ITF-14"
  "description": "Generator coduri de bare online cu validare automată a cifrei de control modulo-10. Suportă EAN-13, CODE-128, UPC-A, ITF-14. Export SVG vectorial și PNG raster."
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
  "name": "Generator Cod de Bare"
  "applicationCategory": "DeveloperApplication"
  "operatingSystem": "Web"
  "description": "Generator coduri de bare EAN-13, CODE-128, UPC-A, ITF-14 cu validare cifră de control modulo-10. Export SVG și PNG."
  "featureList": "4 formate (EAN-13, CODE-128, UPC-A, ITF-14); validare automată cifră de control GTIN; export SVG vectorial + PNG raster; personalizare grosime, înălțime, culori; gratuit complet, fără server."
  "url": "https://instrumenteonline.ro/dezvoltator/generator-cod-bare/"
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
    "reviewCount": 34
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
        "name": "Vlad B."
      "reviewBody": "Validarea automată a cifrei de control EAN-13 m-a salvat de o tipărire greșită — recomand pentru orice producător mic."
      "datePublished": "2026-04-28"
faqPageSchema:
  "@context": "https://schema.org"
  "@type": "FAQPage"
  "mainEntity":
    - "@type": "Question"
      "name": "Care este diferența între EAN-13 și UPC-A?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "EAN-13 (European Article Number) are 13 cifre și este standardul retail în Europa (inclusiv România). UPC-A (Universal Product Code) are 12 cifre și se folosește în SUA și Canada. Cele două sunt compatibile la scanare — un EAN-13 cu prefix 0 este echivalent cu un UPC-A."
    - "@type": "Question"
      "name": "Ce este CODE-128 și când se folosește?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "CODE-128 este un standard alfanumeric foarte compact, capabil să codeze toate cele 128 caractere ASCII (litere, cifre, simboluri). Se folosește în logistică, depozite, etichete interne și aplicații unde valoarea nu este un cod GS1 standardizat."
    - "@type": "Question"
      "name": "Cum se calculează cifra de control EAN-13?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Se aplică o sumă ponderată modulo 10: cifrele de pe poziții impare (de la dreapta, fără cifra de control) se înmulțesc cu 1, cele pare cu 3. Suma totală se modulo 10, iar diferența până la 10 dă cifra de control. Algoritmul e identic pentru UPC-A (11+1) și ITF-14 (13+1)."
    - "@type": "Question"
      "name": "La ce folosește ITF-14?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "ITF-14 (Interleaved 2 of 5, 14 cifre) se folosește pentru ambalaje secundare și terțiare — cartoane comerciale, bax-uri, paleți. Codifică Global Trade Item Number (GTIN-14) și se tipărește direct pe carton fără hârtie albă suplimentară."
    - "@type": "Question"
      "name": "Ce este standardul GS1?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "GS1 este organizația globală non-profit care administrează standardele de identificare a produselor (EAN, UPC, GTIN, GLN, SSCC). Pentru a vinde un produs cu cod EAN/UPC unic la nivel mondial, e necesar un prefix companie alocat de GS1 din țara respectivă (în România: GS1 Romania, gs1ro.org)."
    - "@type": "Question"
      "name": "Pot folosi codurile generate aici pentru produse comerciale?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Pentru uz personal, prototipare, testare sau coduri interne răspunsul este da. Pentru distribuție comercială cu produse fizice (în supermarketuri, online retail) e nevoie de licențierea oficială GS1, care îți alocă un prefix companie unic — astfel codurile tale nu se vor suprapune cu ale altor producători."
---

**Codurile de bare** sunt forma fundamentală de identificare automată a produselor: o reprezentare grafică a unei valori numerice sau alfanumerice, optimizată pentru citire optică rapidă. Acest generator suportă cele 4 standarde majore folosite în retail, logistică și aplicații interne — EAN-13, CODE-128, UPC-A și ITF-14 — cu validare automată a cifrei de control conform standardelor GS1.

## Compararea formatelor

| Format | Lungime | Tipuri caractere | Utilizare tipică | Cifră de control |
|--------|---------|------------------|------------------|------------------|
| **EAN-13** | 13 cifre | doar cifre | Retail Europa (RO inclus) | Modulo-10 GTIN |
| **CODE-128** | variabil | ASCII complet (litere + cifre + simboluri) | Logistică, depozite, intern | Internă (auto) |
| **UPC-A** | 12 cifre | doar cifre | Retail SUA / Canada | Modulo-10 GTIN |
| **ITF-14** | 14 cifre | doar cifre | Cartoane comerciale, paleți | Modulo-10 GTIN |

EAN-13 și UPC-A fac parte din familia GTIN (Global Trade Item Number) administrată de GS1. ITF-14 este un GTIN-14 codat în formatul Interleaved 2 of 5, optimizat pentru tipărire directă pe carton ondulat. CODE-128 nu este reglementat de GS1 — poate codifica orice șir ASCII și se folosește pentru identificatori interni.

## Algoritmul cifrei de control GTIN (modulo-10)

Cifra de control GTIN este calculată identic pentru EAN-13 (12+1), UPC-A (11+1) și ITF-14 (13+1). Algoritmul protejează împotriva erorilor de transcriere — dacă un singur digit este introdus greșit la scanare manuală, suma de control nu mai produce 0 modulo 10, iar codul este respins.

Fie $d_1, d_2, ..., d_{n-1}$ cifrele fără ultima (cifra de control), numerotate de la stânga. Pornind **de la dreapta** (de la $d_{n-1}$), aplicăm alternativ ponderile 3 și 1:

$$
\text{sum} = \sum_{i=1}^{n-1} w_i \cdot d_i, \quad w_i = \begin{cases} 3 & \text{dacă } (n-1-i) \text{ este par} \\ 1 & \text{altfel} \end{cases}
$$

Cifra de control este apoi:

$$
\text{check} = (10 - (\text{sum} \mod 10)) \mod 10
$$

### Exemplu: EAN-13 pentru codul "5901234123457"

Primele 12 cifre (fără cifra de control): **590123412345**.

Ponderile alternative pornind de la dreapta (poziția 12 = pondere 3):

| Poziție (de la stânga) | Cifra | Pondere | Produs |
|------------------------|-------|---------|--------|
| 1  | 5 | 1 | 5  |
| 2  | 9 | 3 | 27 |
| 3  | 0 | 1 | 0  |
| 4  | 1 | 3 | 3  |
| 5  | 2 | 1 | 2  |
| 6  | 3 | 3 | 9  |
| 7  | 4 | 1 | 4  |
| 8  | 1 | 3 | 3  |
| 9  | 2 | 1 | 2  |
| 10 | 3 | 3 | 9  |
| 11 | 4 | 1 | 4  |
| 12 | 5 | 3 | 15 |

$$
\text{sum} = 5 + 27 + 0 + 3 + 2 + 9 + 4 + 3 + 2 + 9 + 4 + 15 = 83
$$

$$
\text{check} = (10 - (83 \mod 10)) \mod 10 = (10 - 3) \mod 10 = 7
$$

Codul EAN-13 complet și valid este așadar **5901234123457** (cifra de control 7).

### Exemplu: UPC-A pentru codul "036000291452"

Primele 11 cifre: **03600029145**. Aplicăm același algoritm modulo-10:

$$
\text{sum} = 0\cdot 3 + 3\cdot 1 + 6\cdot 3 + 0\cdot 1 + 0\cdot 3 + 0\cdot 1 + 2\cdot 3 + 9\cdot 1 + 1\cdot 3 + 4\cdot 1 + 5\cdot 3
$$

$$
= 0 + 3 + 18 + 0 + 0 + 0 + 6 + 9 + 3 + 4 + 15 = 58
$$

$$
\text{check} = (10 - (58 \mod 10)) \mod 10 = (10 - 8) \mod 10 = 2
$$

Codul UPC-A complet: **036000291452**.

## Structura prefixelor EAN-13

Primele 3 cifre din EAN-13 codifică zona/țara de înregistrare GS1:

| Prefix | Țară / Regiune |
|--------|----------------|
| 590    | Polonia        |
| 594    | România        |
| 599    | Ungaria        |
| 690-695 | China         |
| 729    | Israel         |
| 750    | Mexic          |
| 76     | Elveția (760-769) |
| 800-839 | Italia        |
| 840-849 | Spania        |
| 880    | Coreea de Sud  |
| 890    | India          |
| 893    | Vietnam        |

Următoarele 4-7 cifre identifică unic compania (alocate de GS1 național), restul codifică articolul individual din portofoliul producătorului.

## CODE-128 vs CODE-39

CODE-128 este urmașul modern al CODE-39, cu mai multă densitate și completitudine ASCII. Comparația rapidă:

| Caracteristică | CODE-128 | CODE-39 |
|----------------|----------|---------|
| Set de caractere | ASCII complet (128) | A-Z, 0-9, simboluri (43) |
| Densitate | Mare (mod compact) | Medie |
| Ratio mediu (caractere/cm) | ~3-4 | ~1.5-2 |
| Subseturi (A/B/C) | Da (auto-switch) | Nu |
| Cifră de control | Implicită (calculată automat) | Opțională |

Pentru aplicații interne moderne, CODE-128 este alegerea standard. CODE-39 rămâne în uz în industrii vechi (auto, defense) datorită simplității.

## Aplicații tipice

### Retail (EAN-13)

Magazinele alimentare, drogheriile și retail-ul fizic în general folosesc EAN-13 pe etichetă pentru scanare la POS. Codul trebuie să respecte standardul GS1 — cu prefix de țară corect și cifră de control validă — altfel sistemul de POS îl va respinge.

### Logistică (CODE-128)

Etichetele de carton, bonurile de transfer intern și fișele de inventar folosesc CODE-128 pentru valori arbitrare (numere de comandă, bin-uri, lot-uri). Avantajul CODE-128 este că poate codifica string-uri lungi (până la ~80 caractere practic).

### Cartoane comerciale (ITF-14)

Producătorii care livrează la supermarketuri pun pe cartonul exterior un cod ITF-14 care codifică GTIN-14. ITF-14 e tipărit direct pe carton ondulat — cu „indicator de bordură” (bearer bar) care îmbunătățește scanabilitatea în condiții de imprimare slabă.

### Bonuri și facturi (CODE-128)

Aplicațiile de facturare modernă pun un cod de bare CODE-128 pe bon (cu numărul facturii) pentru a permite căutare instantanee într-un sistem ERP — un cititor scanează bonul, sistemul deschide factura.

## Greșeli frecvente

1. **Cifră de control greșită** — la introducere manuală a EAN-13/UPC-A/ITF-14, dacă tastezi toate 12/11/13 cifre + un control întâmplător, codul nu va scana. Mai bine introdu doar cifrele de bază și lasă generatorul să calculeze cifra de control.
2. **Folosirea CODE-128 pentru produse retail** — supermarketurile cer EAN-13 sau UPC-A. CODE-128 funcționează la scanare, dar nu se va găsi în baza de date GS1 a magazinului.
3. **Tipărire la rezoluție prea mică** — pentru EAN-13, lățimea minimă a barei celei mai înguste este 0.264 mm (1x „X-dimension”). Tipărirea sub 200 dpi poate duce la coduri ne-scanabile.
4. **Lipsa „quiet zone”** — codurile au nevoie de o margine albă de cel puțin 10x lățimea barei celei mai înguste. Generatorul nostru adaugă automat această margine la export.
5. **Distribuție comercială fără licență GS1** — codul tău poate fi valid matematic, dar dacă alți producători au înregistrat aceleași cifre, va exista coliziune în sistemele POS.

## Recomandări tipar profesional

| Element | Valoare recomandată |
|---------|---------------------|
| Rezoluție tipar | min. 300 dpi |
| Lățime modul (X-dim) | 0.33 mm pentru retail (100% scale EAN) |
| Înălțime cod | min. 25 mm pentru EAN-13 |
| Quiet zone | min. 10x X-dim (≈3.3 mm pentru EAN) |
| Format export | SVG vectorial (orice rezoluție) |
| Contrast tipar | bare 100% K negru pe fundal alb (PCS ≥ 70%) |

## Calculatoare înrudite

- [Generator Cod QR cu Pictogramă](/dezvoltator/generator-cod-qr/) — cod QR 2D cu logo central, ECC nivel H
- [Codificare Base64](/dezvoltator/base64-codificare-decodificare/) — codare reversibilă pentru transmitere date
- [Codificare URL](/dezvoltator/url-codificare-decodificare/) — percent-encoding pentru parametri URL
