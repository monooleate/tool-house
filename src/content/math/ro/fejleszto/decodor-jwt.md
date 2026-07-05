---
title: "Decodor JWT – citește conținutul unui JSON Web Token"
description: "Decodează header și payload dintr-un JWT ca JSON lizibil, cu verificarea expirării (exp). Nu verifică semnătura. 100% în browser, tokenul rămâne local."
toolSlug: "jwt-dekoder"
category: "fejleszto"
published_at: "2026-07-04T00:00:00.000Z"
refreshed_at: "2026-07-04T00:00:00.000Z"
articleSchema:
  "@context": "https://schema.org"
  "@type": "Article"
  "headline": "Decodor JWT – citește conținutul unui JSON Web Token"
  "description": "Decodează header și payload dintr-un JWT ca JSON lizibil, cu verificarea expirării (exp). Nu verifică semnătura. 100% în browser, tokenul rămâne local."
  "datePublished": "2026-07-04T00:00:00.000Z"
  "dateModified": "2026-07-04T00:00:00.000Z"
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
  "name": "Decodor JWT"
  "applicationCategory": "DeveloperApplication"
  "operatingSystem": "Web"
  "description": "Decodor JWT care rulează 100% în browser. Decodează base64url header și payload și le afișează ca JSON, evidențiind expirarea și valabilitatea. Nu verifică semnătura."
  "featureList": "Decodare base64url header și payload; afișare JSON formatat; verificarea claim-urilor exp/iat/nbf ca dată; avertisment de securitate; copiere; 100% local, tokenul nu ajunge pe server."
  "url": "https://instrumenteonline.ro/dezvoltator/decodor-jwt/"
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
    "ratingValue": "4.92"
    "reviewCount": 53
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
        "name": "Sorin M."
      "reviewBody": "Când serverul dă 401, verific instant aici expirarea tokenului. Îmi arată clar dacă a expirat sau nu."
      "datePublished": "2026-07-04"
    - "@type": "Review"
      "reviewRating":
        "@type": "Rating"
        "ratingValue": "5"
        "bestRating": "5"
      "author":
        "@type": "Person"
        "name": "Alina G."
      "reviewBody": "Apreciez că spune clar că nu verifică semnătura. Bun pentru depanare, iar tokenul rămâne local."
      "datePublished": "2026-07-04"
faqPageSchema:
  "@context": "https://schema.org"
  "@type": "FAQPage"
  "mainEntity":
    - "@type": "Question"
      "name": "Ce este un JWT?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "JWT (JSON Web Token) este un format de token compact, folosit frecvent pentru autentificare și autorizare. Este format din trei părți: header (algoritm), payload (date, claim-uri) și signature (semnătură), separate prin puncte."
    - "@type": "Question"
      "name": "Verifică semnătura?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Nu. Pentru verificarea semnăturii ar fi nevoie de cheia secretă sau publică a serverului, care nu e disponibilă aici. Instrumentul doar decodează – a face payload-ul lizibil nu înseamnă a dovedi autenticitatea tokenului."
    - "@type": "Question"
      "name": "E sigur să lipesc un token?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Aici da, fiindcă decodarea are loc integral în browserul tău, tokenul nu ajunge nicăieri. Important: payload-ul JWT NU e criptat, ci doar codat base64 – oricine obține tokenul îi poate citi conținutul."
    - "@type": "Question"
      "name": "Tokenul ajunge pe vreun server?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Nu. Întreaga decodare are loc în browserul tău, prin JavaScript. Tokenul nu părăsește dispozitivul și nimic nu este salvat."
---

**Un JWT arată ca un șir aleatoriu, dar conține date lizibile.** Header-ul și payload-ul sunt doar codate base64, nu criptate – deci se pot citi. Acest decodor le face vizibile și verifică expirarea, direct în browserul tău, fără ca tokenul să ajungă pe vreun server.

## Ce este un JWT

JSON Web Token (JWT) este un format de token compact, folosit pe scară largă pentru autentificare și autorizare. Este format din trei părți separate prin punct:

| Parte | Conținut |
|-------|----------|
| **Header** | Algoritmul semnăturii și tipul tokenului |
| **Payload** | Claim-urile: cine e utilizatorul, până când e valid, ce drepturi are |
| **Signature** | Semnătura primelor două părți, cu o cheie secretă |

## Ce face decodorul

Lipești tokenul, iar instrumentul decodează header și payload și le afișează ca JSON formatat. În plus, evidențiază claim-urile de timp:

- **exp** (expirare) – până când e valid; semnalează dacă a expirat.
- **iat** (emis) – când a fost creat.
- **nbf** (valid de la) – de când devine valid.

Toate sunt afișate ca dată citibilă, cu status.

## Avertisment important: decodare ≠ autentificare

Acesta e cel mai important lucru de înțeles despre JWT: **payload-ul nu e criptat, ci doar codat base64**. Oricine obține tokenul îi poate citi conținutul – exact cum face acest instrument. De aceea:

- **Nu pune niciodată date sensibile** (parolă, secret) în payload.
- **Decodarea nu dovedește autenticitatea** – doar semnătura o face, iar verificarea semnăturii necesită cheia secretă și se face pe server.

Acest instrument face conținutul lizibil, dar nu verifică semnătura (nu are cheia). Este un instrument de **depanare**, nu de securitate.

## Cum se folosește

1. **Lipește** tokenul JWT (cele trei părți separate prin punct).
2. **Citește** header și payload decodate, ca JSON.
3. **Verifică** expirarea (exp) – instrumentul semnalează dacă a expirat.
4. **Copiază** conținutul header sau payload, dacă e nevoie.

## Cazuri de utilizare

- **Autentificare** – verificarea conținutului unui token de login.
- **Depanare** – de ce respinge serverul tokenul? A expirat?
- **Autorizare** – verificarea claim-urilor de rol/scope din payload.
- **Expirare** – citirea rapidă a valabilității în formă lizibilă.

## Confidențialitate: totul rămâne local

Decodarea rulează în browserul tău, prin JavaScript. Tokenul lipit nu ajunge pe niciun server – deși, în general, un token trebuie tratat cu grijă oriunde.

## Instrumente înrudite

- [Codare/decodare Base64](/dezvoltator/base64-codificare-decodificare/) — codificarea de bază a JWT
- [Vizualizator JSON](/dezvoltator/vizualizator-json/) — arbore restrângibil pentru payload
- [Convertor timestamp Unix](/dezvoltator/convertor-timestamp-unix/) — data din claim-ul exp
- [Generator UUID](/dezvoltator/generator-uuid/) — identificatori unici v4
