---
title: "Convertor Timestamp Unix – Marcaj de Timp ↔ Dată, Local și UTC"
description: "Convertește instantaneu timestamp Unix în dată și invers: oră locală, UTC, ISO 8601 și timp relativ. Secunde și milisecunde, timestamp curent live. 100% local, fără server."
toolSlug: "unix-timestamp"
category: "fejleszto"
published_at: "2026-06-17T00:00:00.000Z"
refreshed_at: "2026-06-17T00:00:00.000Z"
articleSchema:
  "@context": "https://schema.org"
  "@type": "Article"
  "headline": "Convertor Timestamp Unix – Marcaj de Timp ↔ Dată, Local și UTC"
  "description": "Convertește instantaneu timestamp Unix în dată și invers: oră locală, UTC, ISO 8601 și timp relativ. Secunde și milisecunde, timestamp curent live. 100% local, fără server."
  "datePublished": "2026-06-17T00:00:00.000Z"
  "dateModified": "2026-06-17T00:00:00.000Z"
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
  "name": "Convertor Timestamp Unix"
  "applicationCategory": "DeveloperApplication"
  "operatingSystem": "Web"
  "description": "Convertor de timestamp Unix care rulează 100% în browser. Conversie în ambele sensuri între marcaj de timp și dată, cu oră locală, UTC, ISO 8601 și timp relativ, suport secunde și milisecunde și timestamp curent live."
  "featureList": "Conversie timestamp → dată și dată → timestamp; oră locală și UTC simultan; ISO 8601; timp relativ; comutare secunde/milisecunde; timestamp curent live; 100% local, fără tracking."
  "url": "https://instrumenteonline.ro/dezvoltator/convertor-timestamp-unix/"
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
    "reviewCount": 52
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
        "name": "Vlad C."
      "reviewBody": "Văd ora locală și UTC în același timp, exact ce îmi trebuie când compar loguri de pe servere din fusuri diferite. Comutarea secunde/milisecunde m-a scăpat de multe greșeli."
      "datePublished": "2026-06-17"
    - "@type": "Review"
      "reviewRating":
        "@type": "Rating"
        "ratingValue": "5"
        "bestRating": "5"
      "author":
        "@type": "Person"
        "name": "Ioana M."
      "reviewBody": "Timestamp-ul curent care rulează live și timpul relativ („acum 3 zile”) sunt mici detalii care fac instrumentul foarte practic la depanarea API-urilor."
      "datePublished": "2026-06-17"
faqPageSchema:
  "@context": "https://schema.org"
  "@type": "FAQPage"
  "mainEntity":
    - "@type": "Question"
      "name": "Ce este un timestamp Unix?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Marcajul de timp Unix este numărul de secunde scurse de la 1 ianuarie 1970, 00:00:00 UTC, momentul numit „epoch”. Identifică un punct în timp printr-un singur număr întreg, independent de fus orar, motiv pentru care este folosit de baze de date, API-uri, loguri și limbaje de programare."
    - "@type": "Question"
      "name": "Care e diferența între secunde și milisecunde?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Timestamp-ul Unix clasic se măsoară în secunde și are în prezent 10 cifre. JavaScript și multe sisteme moderne folosesc milisecunde, adică 13 cifre. Diferența este un factor de 1000; dacă alegi unitatea greșită, data rezultată va fi de aproximativ o mie de ori prea aproape sau prea departe."
    - "@type": "Question"
      "name": "În ce fus orar se afișează rezultatul?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Convertorul afișează simultan ora din fusul orar local al browserului și ora UTC. Timestamp-ul în sine nu conține fus orar – marchează același moment absolut – iar cele două afișări sunt doar perspective diferite asupra aceluiași instant."
    - "@type": "Question"
      "name": "Ce este formatul ISO 8601?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "ISO 8601 este formatul text standard pentru date și ore, lizibil de oameni și de mașini, de exemplu 2025-06-15T14:26:40.000Z. Litera Z de la final indică UTC. Este formatul preferat pentru schimbul de date între sisteme, fiind neambiguu și sortabil alfabetic."
    - "@type": "Question"
      "name": "Ce este problema anului 2038?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Sistemele care stochează timestamp-ul Unix într-un întreg cu semn pe 32 de biți pot reprezenta cel mult valoarea de la 19 ianuarie 2038, ora 03:14:07 UTC. După acel moment, contorul depășește capacitatea și „se rotește”. Soluția modernă este folosirea unui întreg pe 64 de biți, care acoperă miliarde de ani."
    - "@type": "Question"
      "name": "Momentul introdus ajunge pe vreun server?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Nu. Toate conversiile rulează local, în browserul tău, prin JavaScript. Nici timestamp-ul, nici data introdusă nu părăsesc dispozitivul și nimic nu este salvat sau transmis."
---

**Un singur număr care înseamnă același moment oriunde în lume.** Timestamp-ul Unix este modul în care calculatoarele țin evidența timpului fără fusuri orare, fără ora de vară și fără ambiguități. Acest convertor traduce între acel număr și o dată pe care o citești cu ușurință – în ambele sensuri, în timp real, direct în browserul tău, fără ca momentul tău să ajungă pe vreun server.

## Ce este timpul Unix

Timpul Unix (numit și timp epoch sau POSIX) măsoară timpul ca **numărul de secunde scurse de la 1 ianuarie 1970, 00:00:00 UTC**. Acest moment de referință se numește „epoch”. La fiecare secundă care trece, numărul crește cu unu.

Avantajul este simplitatea radicală: un singur întreg, fără fus orar, fără calendar, fără reguli de lună sau an. Două momente se compară pur și simplu comparând două numere, iar diferența dintre ele este direct durata în secunde. De aceea timpul Unix a devenit limba comună a timpului în software.

## Secunde sau milisecunde

Cea mai frecventă sursă de erori este unitatea de măsură. Există două convenții larg răspândite:

| Unitate | Exemplu | Cifre | Folosit de |
|---------|---------|------:|------------|
| **Secunde** | 1750000000 | 10 | Unix clasic, baze de date, multe API-uri |
| **Milisecunde** | 1750000000000 | 13 | JavaScript (Date.now()), Java, sisteme moderne |

Diferența este un factor de 1000. Dacă interpretezi milisecunde ca secunde, obții o dată de aproximativ o mie de ori mai îndepărtată în viitor; invers, obții o dată foarte aproape de 1970. Regula rapidă: **10 cifre înseamnă secunde, 13 cifre înseamnă milisecunde**. Convertorul are un comutator dedicat tocmai pentru a evita această confuzie.

## Fusurile orare și UTC

Un timestamp nu conține fus orar – el marchează un moment absolut. Același număr reprezintă în același timp ora 17:00 la București și ora 15:00 la Londra, fiindcă este vorba de același instant.

De aceea convertorul afișează **simultan două perspective**:

- **Ora locală** – momentul în fusul orar al browserului tău (pentru vizitatorii din România, ora Europe/Bucharest).
- **Ora UTC** – timpul universal coordonat, referința globală fără ora de vară.

Cele două nu sunt valori diferite, ci doar moduri diferite de a privi același punct în timp. Când compari evenimente de pe servere din regiuni diferite, UTC este referința sigură.

## Formatul ISO 8601

Pe lângă timestamp, convertorul afișează data și în format **ISO 8601**, de exemplu `2025-06-15T14:26:40.000Z`. Acest format standard are mai multe avantaje:

- este lizibil deopotrivă de oameni și de mașini;
- componentele merg de la cea mai mare (anul) la cea mai mică (milisecunde), deci se sortează corect și ca text;
- litera `Z` de la final indică fără echivoc că valoarea este în UTC.

ISO 8601 este formatul preferat pentru câmpurile de dată din JSON, pentru API-uri și pentru schimbul de date între sisteme, tocmai pentru că nu lasă loc de interpretare.

## Timpul relativ

Pentru momentele apropiate de prezent, convertorul afișează și **timpul relativ** în cuvinte: „acum 3 zile”, „peste 2 ore”, „acum un minut”. Această formă este adesea mai utilă decât data exactă atunci când vrei să înțelegi rapid cât de recentă este o intrare de log sau cât mai e până la expirarea unui token.

## Problema anului 2038

Un detaliu important pentru sistemele mai vechi: dacă timestamp-ul Unix este stocat într-un **întreg cu semn pe 32 de biți**, valoarea maximă pe care o poate reprezenta corespunde datei de **19 ianuarie 2038, ora 03:14:07 UTC**. După acel moment, contorul depășește capacitatea și „se rotește” spre valori negative – echivalentul informatic al unei resetări de odometru.

Soluția, deja larg adoptată, este stocarea timestamp-ului într-un **întreg pe 64 de biți**, care extinde intervalul cu mult dincolo de vârsta universului. Este același motiv pentru care precizia numerelor mari contează în orice unealtă care lucrează cu marcaje de timp.

## Unde apare timestamp-ul

Marcajul de timp Unix este peste tot în dezvoltarea software:

- **Baze de date** – coloanele `created_at`, `updated_at`, `deleted_at` stochează adesea timestamp-uri.
- **API-uri** – câmpurile de tip „issued at” și „expires at” din răspunsuri și token-uri.
- **Token-uri JWT** – câmpurile `iat` și `exp` sunt timestamp-uri Unix în secunde.
- **Loguri** – multe formate de log prefixează fiecare linie cu un timestamp.
- **Cron și planificatoare** – momentele de execuție și termenele limită.

În toate aceste cazuri, posibilitatea de a converti rapid numărul într-o dată lizibilă accelerează depanarea.

## Capcane frecvente

1. **Unitate greșită.** Secunde tratate ca milisecunde (sau invers) – cea mai frecventă eroare. Verifică numărul de cifre.
2. **Confuzia de fus orar.** A presupune că un timestamp este în ora locală când de fapt este în UTC. Timestamp-ul nu are fus orar; afișarea da.
3. **Ora de vară.** La conversia dată → timestamp, trecerea la/de la ora de vară poate muta rezultatul cu o oră. Convertorul folosește setările sistemului tău pentru a o gestiona corect.
4. **Secunde de salt (leap seconds).** Timpul Unix le ignoră prin definiție, deci nu te baza pe el pentru măsurători de precizie astronomică.

## Confidențialitate: totul rămâne local

Toate conversiile rulează în browserul tău, prin JavaScript. Poți deschide panoul de rețea din instrumentele de dezvoltator și vei vedea că nu pleacă nicio cerere atunci când convertești un moment. Nimic nu este trimis, salvat sau înregistrat – poți lucra în siguranță și cu timestamp-uri din loguri sau sisteme confidențiale.

## Instrumente înrudite

- [Convertor Baze Numerice](/dezvoltator/convertor-baze-numerice/) — binar, octal, zecimal și hexazecimal în timp real
- [Numărător de Cuvinte și Caractere](/dezvoltator/numarator-cuvinte/) — numără cuvinte, caractere și propoziții în timp real
- [Codificare/Decodificare Base64](/dezvoltator/base64-codificare-decodificare/) — codare reversibilă pentru text și date binare
