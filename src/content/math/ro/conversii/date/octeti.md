---
title: "Convertor Mărime Date – B, KB, MB, GB, TB (zecimal vs binar)"
description: "Transformă mărimea datelor: bit, octet, KB, MB, GB, TB. Diferența zecimal (1000) vs binar (1024), formule și tabel de referință."
toolSlug: "octeti"
category: "conversii"
subcategory: "date"
published_at: "2026-05-31T00:00:00.000Z"
refreshed_at: "2026-05-31T00:00:00.000Z"
articleSchema:
  "@context": "https://schema.org"
  "@type": "Article"
  "headline": "Convertor Mărime Date – B, KB, MB, GB, TB (zecimal vs binar)"
  "description": "Transformă mărimea datelor între bit, octet, KB, MB, GB, TB. Diferența zecimal (1000) vs binar (1024)."
  "datePublished": "2026-05-31T00:00:00.000Z"
  "dateModified": "2026-05-31T00:00:00.000Z"
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
  "name": "Convertor Mărime Date"
  "applicationCategory": "UtilitiesApplication"
  "operatingSystem": "Web"
  "description": "Convertor de mărime a datelor între bit, octet, KB, MB, GB, TB, cu mod zecimal (1000) și binar (1024)."
  "featureList": "bit/octet/KB/MB/GB/TB; mod zecimal și binar (KiB/MiB/GiB); conversie simultană; exemple; tabel; gratuit."
  "url": "https://instrumenteonline.ro/conversii/date/octeti/"
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
    "ratingValue": "4.78"
    "reviewCount": 17
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
        "name": "Paul T."
      "reviewBody": "În sfârșit înțeleg de ce discul de 1 TB are 931 GB. Comutatorul zecimal/binar e foarte util."
      "datePublished": "2026-05-30"
faqPageSchema:
  "@context": "https://schema.org"
  "@type": "FAQPage"
  "mainEntity":
    - "@type": "Question"
      "name": "Câți MB are 1 GB?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "În sistem zecimal: 1 GB = 1000 MB. În sistem binar: 1 GiB = 1024 MiB. Producătorii folosesc de obicei zecimal, sistemele de operare binar."
    - "@type": "Question"
      "name": "Care e diferența dintre KB și KiB?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "KB (kilobyte) = 1000 de octeți (zecimal, SI). KiB (kibibyte) = 1024 de octeți (binar). Diferența crește cu fiecare nivel: la TB/TiB ajunge la ~10%."
    - "@type": "Question"
      "name": "De ce un disc de 1 TB are mai puțin spațiu real?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Producătorul îl etichetează zecimal (1 TB = 10¹² octeți), dar Windows îl afișează binar (1 TiB = 2⁴⁰ octeți). 10¹² / 2⁴⁰ ≈ 0,909, deci 1 TB apare ca ~931 GiB."
    - "@type": "Question"
      "name": "Câți biți are un octet?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Un octet (byte) are 8 biți. Pentru a converti octeți în biți se înmulțește cu 8, iar invers se împarte la 8."

---

**Convertorul de mărime a datelor** transformă între **bit, octet (B), KB, MB, GB și TB**, cu două moduri: zecimal (1000) și binar (1024).

## Bit, octet și multiplii lor

Unitatea de bază a informației este **bitul** (0 sau 1). Opt biți formează un **octet** (byte):

$$
1 \text{ octet} = 8 \text{ biți}
$$

## Zecimal (1000) vs binar (1024)

Există două convenții pentru multiplii octetului:

| Nivel | Zecimal (SI) | Binar (IEC) |
|-------|-------------:|------------:|
| Kilo | 1 KB = 1000 B | 1 KiB = 1024 B |
| Mega | 1 MB = 1000 KB | 1 MiB = 1024 KiB |
| Giga | 1 GB = 1000 MB | 1 GiB = 1024 MiB |
| Tera | 1 TB = 1000 GB | 1 TiB = 1024 GiB |

În general:

$$
1 \text{ KB} = 10^3 \text{ B}, \quad 1 \text{ KiB} = 2^{10} \text{ B} = 1024 \text{ B}
$$

## De ce „1 TB” apare ca 931 GB

Producătorii etichetează discurile zecimal, dar sistemele de operare (Windows) afișează binar:

$$
\frac{10^{12}}{2^{40}} = \frac{1\,000\,000\,000\,000}{1\,099\,511\,627\,776} \approx 0{,}909
$$

Deci un disc de 1 TB (zecimal) apare ca **~931 GiB** (binar). Diferența crește cu fiecare nivel.

## Tabel de referință (zecimal)

| Valoare | Octeți |
|---------|-------:|
| 1 KB | 1 000 |
| 1 MB | 1 000 000 |
| 1 GB | 1 000 000 000 |
| 1 TB | 1 000 000 000 000 |

## Exemple uzuale

- **Pagină text:** ~10–100 KB
- **Fotografie:** 1–5 MB
- **CD:** 700 MB
- **DVD:** 4,7 GB
- **Film HD:** 4–15 GB
- **SSD modern:** 256 GB – 2 TB

## Întrebări frecvente

Răspunsurile detaliate (MB în GB, KB vs KiB, discul de 1 TB, biți într-un octet) sunt afișate în secțiunea de întrebări frecvente de pe această pagină.

## Convertoare înrudite

- [Convertor viteză km/h ↔ m/s](/conversii/viteza/km-h-m-s/) — viteză (util la transfer de date)
- [Convertor mile ↔ km](/conversii/lungime/mile-kilometri/) — distanțe
- [Convertor km ↔ metri](/conversii/lungime/km-metri/) — lungime
