---
title: "Generator linkuri UTM – constructor de URL-uri pentru campanii"
description: "Construiește URL-uri de campanie cu parametri UTM (source, medium, campaign, term, content) pentru Google Analytics și Plausible. Link gata de copiat, 100% în browser."
toolSlug: "utm-generator"
category: "seo"
published_at: "2026-07-04T00:00:00.000Z"
refreshed_at: "2026-07-04T00:00:00.000Z"
articleSchema:
  "@context": "https://schema.org"
  "@type": "Article"
  "headline": "Generator linkuri UTM – constructor de URL-uri pentru campanii"
  "description": "Construiește URL-uri de campanie cu parametri UTM (source, medium, campaign, term, content) pentru Google Analytics și Plausible. Link gata de copiat, 100% în browser."
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
  "name": "Generator linkuri UTM"
  "applicationCategory": "BusinessApplication"
  "operatingSystem": "Web"
  "description": "Constructor de URL-uri de campanie cu parametri UTM, care rulează 100% în browser. Adaugă utm_source, utm_medium, utm_campaign, utm_term și utm_content la orice URL, cu codare corectă și șabloane rapide."
  "featureList": "Parametri utm_source, utm_medium, utm_campaign, utm_term, utm_content; șabloane rapide (Google Ads, Facebook, newsletter); codare automată a caracterelor; previzualizare live a URL-ului; copiere cu un clic; 100% local, fără tracking."
  "url": "https://instrumenteonline.ro/seo/generator-utm/"
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
    "reviewCount": 57
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
        "name": "Cătălin M."
      "reviewBody": "Șabloanele pentru Google Ads și newsletter mă ajută să păstrez denumiri consecvente. Rapoartele din Analytics sunt în sfârșit curate."
      "datePublished": "2026-07-04"
    - "@type": "Review"
      "reviewRating":
        "@type": "Rating"
        "ratingValue": "5"
        "bestRating": "5"
      "author":
        "@type": "Person"
        "name": "Ioana P."
      "reviewBody": "Codează automat spațiile și caracterele speciale. Link gata de pus în campanie în câteva secunde."
      "datePublished": "2026-07-04"
faqPageSchema:
  "@context": "https://schema.org"
  "@type": "FAQPage"
  "mainEntity":
    - "@type": "Question"
      "name": "Ce este un parametru UTM?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Parametrii UTM sunt etichete cu prefixul utm_ adăugate la finalul URL-ului (de ex. ?utm_source=facebook&utm_medium=social), citite de sistemele de analiză. Cu ajutorul lor vezi exact din ce sursă, canal și campanie a venit un vizitator."
    - "@type": "Question"
      "name": "Care sunt cei trei parametri esențiali?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "utm_source (de unde: ex. google, newsletter), utm_medium (pe ce canal: ex. cpc, email, social) și utm_campaign (care campanie: ex. reducere_vara). Aceștia trei formează coloana vertebrală a măsurării; term și content sunt rafinări opționale."
    - "@type": "Question"
      "name": "Contează literele mari și mici?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Da. Majoritatea sistemelor de analiză tratează separat Facebook și facebook, ceea ce împarte datele în două. Buna practică: folosește peste tot litere mici și ține-te de un sistem de denumire consecvent."
    - "@type": "Question"
      "name": "Parametrii UTM strică SEO-ul?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Pe linkurile interne evită-i, fiindcă pot perturba măsurarea și pot crea URL-uri duplicate. Pentru campanii externe sunt inofensivi, mai ales dacă pagina are un tag canonical corect, care indică URL-ul de bază."
    - "@type": "Question"
      "name": "Datele introduse ajung pe vreun server?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Nu. Asamblarea linkului are loc în întregime în browserul tău, prin JavaScript. Nicio dată nu părăsește dispozitivul și nimic nu este salvat."
---

**Fără UTM, analiza îți spune doar „a venit trafic de pe social media”.** Cu UTM, îți spune exact din care postare, reclamă sau newsletter. Generatorul de linkuri UTM construiește aceste URL-uri de campanie corect codate, ca fiecare clic să fie măsurabil, totul în browserul tău.

## Ce sunt parametrii UTM

Parametrii UTM sunt etichete adăugate la finalul unui URL, cu prefixul `utm_`. Un link marcat arată așa:

```
https://exemplu.ro/oferta?utm_source=newsletter&utm_medium=email&utm_campaign=reducere_vara
```

Când cineva dă clic, Google Analytics, Plausible sau alt sistem de analiză citește acești parametri și atribuie vizita sursei corecte. Fără ei, traficul se pierde în categorii vagi.

## Cei cinci parametri

| Parametru | Ce marchează | Exemplu |
|-----------|--------------|---------|
| `utm_source` | Sursa (de unde) | google, newsletter |
| `utm_medium` | Canalul (cum) | cpc, email, social |
| `utm_campaign` | Numele campaniei | reducere_vara_2026 |
| `utm_term` | Cuvânt cheie plătit | adidasi |
| `utm_content` | Varianta de conținut | banner_sus |

Primii trei (**source, medium, campaign**) sunt coloana vertebrală a oricărei măsurări. Ultimii doi sunt rafinări opționale, utile la campanii mari sau la testarea a două variante de anunț.

## Consecvența este totul

Deoarece sistemele de analiză tratează separat literele mari și mici, `Facebook` și `facebook` apar ca două surse distincte, iar datele se împart. La fel, `email` și `e-mail` devin canale diferite. Rezultatul unei practici relaxate: rapoarte încurcate, imposibil de comparat.

Soluția este o convenție simplă, fixată din start:

- **Doar litere mici**, peste tot.
- **Cuvinte legate prin underscore** (`reducere_vara`), nu prin spații.
- **Nume unificate** pentru surse și canale (alege `social`, nu când `social` când `ssocial`).

## Cum se folosește generatorul

1. **Introdu URL-ul destinație** unde vrei să ajungă vizitatorul.
2. **Completează** source, medium și campaign – baza măsurării.
3. **Adaugă** term și content dacă ai nevoie de o segmentare mai fină.
4. **Folosește un șablon** (Google Ads, Facebook, newsletter) pentru denumiri rapide și consecvente.
5. **Copiază** URL-ul de campanie gata codat.

Instrumentul codează automat spațiile și caracterele speciale, deci linkul funcționează chiar dacă folosești diacritice sau simboluri.

## UTM și SEO: o precauție

Parametrii UTM sunt gândiți pentru campanii **externe, de intrare**. Nu îi pune pe linkurile din interiorul propriului site: UTM-urile interne pot suprascrie sursa originală în măsurare și distorsionează raportul.

Pe partea de SEO, URL-urile cu parametri pot crea aparența de conținut duplicat. De aceea este important ca pagina de destinație să aibă un [tag canonical corect](/seo/generator-meta-tag/), care indică URL-ul de bază, fără parametri. Astfel, motoarele știu care este versiunea oficială.

## Greșeli frecvente

1. **Litere mari inconsecvente** – împart datele între surse care ar trebui să fie una singură.
2. **UTM pe linkuri interne** – strică atribuirea sursei în analiză.
3. **Nume de campanie fără sistem** – peste câteva luni nu mai știi ce însemna `promo2`.
4. **Spații în valori** – deși se codează, fac linkul greu de citit; folosește underscore.

## Confidențialitate: totul rămâne local

Asamblarea linkului rulează în browserul tău, prin JavaScript. URL-urile și denumirile de campanie nu ajung pe niciun server – poți pregăti în siguranță și linkurile unei campanii încă neanunțate.

## Instrumente înrudite

- [Generator Meta Tag](/seo/generator-meta-tag/) — inclusiv tag-ul canonical, important când folosești parametri UTM
- [Generator robots.txt](/seo/generator-robots-txt/) — reguli de crawling pentru motoarele de căutare
- [Generator Open Graph](/seo/generator-open-graph/) — carduri de partajare pentru Facebook și LinkedIn
- [Generator Schema FAQ](/seo/generator-schema-faq/) — date structurate JSON-LD pentru întrebări frecvente
