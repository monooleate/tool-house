---
title: "Generator robots.txt – reguli de crawling pentru motoarele de căutare"
description: "Creează fișierul robots.txt cu un asistent: user-agent, Disallow, Allow, crawl-delay, sitemap și blocarea boților AI. Copiere și descărcare, 100% în browser."
toolSlug: "robots-txt-generator"
category: "seo"
published_at: "2026-07-04T00:00:00.000Z"
refreshed_at: "2026-07-04T00:00:00.000Z"
articleSchema:
  "@context": "https://schema.org"
  "@type": "Article"
  "headline": "Generator robots.txt – reguli de crawling pentru motoarele de căutare"
  "description": "Creează fișierul robots.txt cu un asistent: user-agent, Disallow, Allow, crawl-delay, sitemap și blocarea boților AI. Copiere și descărcare, 100% în browser."
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
  "name": "Generator robots.txt"
  "applicationCategory": "DeveloperApplication"
  "operatingSystem": "Web"
  "description": "Generator robots.txt care rulează 100% în browser. Compune directive User-agent, Disallow, Allow, Crawl-delay și Sitemap, cu șabloane rapide și opțiune de blocare a boților AI."
  "featureList": "Șabloane rapide (tot permis, WordPress, fără indexare); reguli Disallow și Allow dinamice; crawl-delay și sitemap; blocare boți AI (GPTBot, CCBot, Google-Extended…); copiere și descărcare; 100% local, fără tracking."
  "url": "https://instrumenteonline.ro/seo/generator-robots-txt/"
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
    "ratingValue": "4.88"
    "reviewCount": 41
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
        "name": "Andrei S."
      "reviewBody": "Șablonul WordPress și opțiunea de blocare a boților AI mi-au economisit timp. Am descărcat fișierul și l-am urcat direct."
      "datePublished": "2026-07-04"
    - "@type": "Review"
      "reviewRating":
        "@type": "Rating"
        "ratingValue": "5"
        "bestRating": "5"
      "author":
        "@type": "Person"
        "name": "Diana C."
      "reviewBody": "În sfârșit un generator care adaugă și linia Sitemap și mă lasă să aleg exact ce boți AI blochez."
      "datePublished": "2026-07-04"
faqPageSchema:
  "@context": "https://schema.org"
  "@type": "FAQPage"
  "mainEntity":
    - "@type": "Question"
      "name": "Ce este robots.txt?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "robots.txt este un fișier text simplu din rădăcina site-ului (exemplu.ro/robots.txt) care le dă instrucțiuni roboților de căutare: ce căi pot parcurge și pe care nu. Majoritatea roboților serioși (Googlebot, Bingbot) îl respectă."
    - "@type": "Question"
      "name": "robots.txt protejează paginile confidențiale?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Nu. robots.txt este doar o cerere, nu o restricție de acces. URL-urile interzise rămân accesibile dacă cineva le știe adresa, iar boții rău intenționați le pot ignora. Protejează conținutul confidențial cu parolă sau protecție pe server."
    - "@type": "Question"
      "name": "Care e diferența dintre Disallow și noindex?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Disallow împiedică parcurgerea, dar pagina interzisă poate apărea totuși în rezultate ca URL. Meta tag-ul noindex, în schimb, exclude explicit din indexare. Dacă interzici o pagină cu Disallow, Google nu vede nici măcar noindex-ul de pe ea."
    - "@type": "Question"
      "name": "Trebuie să blochez boții AI?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Este o decizie personală. Dacă nu vrei ca modelele AI sau motoarele AI să folosească conținutul tău, poți bloca boții GPTBot, CCBot, Google-Extended și alții. Dacă vrei vizibilitate în motoarele AI, lasă-i permiși."
    - "@type": "Question"
      "name": "Unde se pune fișierul robots.txt?"
      "acceptedAnswer":
        "@type": "Answer"
        "text": "Întotdeauna în rădăcina site-ului, exact cu numele robots.txt: exemplu.ro/robots.txt. Fiecare subdomeniu are nevoie de fișier separat. Plasat într-un subdirector nu este valid."
---

**robots.txt este prima pagină pe care o citește Google pe site-ul tău.** Înainte să parcurgă vreo pagină, roboții cer acest fișier ca să afle unde au voie să intre. Un robots.txt greșit poate ascunde tot site-ul din căutare; unul corect ghidează roboții exact unde trebuie. Acest generator îl compune cu un asistent, în browserul tău.

## Ce este robots.txt

robots.txt este un fișier text simplu, așezat în rădăcina site-ului (`exemplu.ro/robots.txt`). El conține directive pentru roboții motoarelor de căutare: ce căi pot parcurge și pe care ar trebui să le ocolească. Este o convenție respectată de toți roboții serioși, precum Googlebot și Bingbot.

## Cum arată un robots.txt

Fișierul este format din blocuri. Fiecare bloc începe cu un `User-agent` (robotul vizat), urmat de reguli:

```
User-agent: *
Disallow: /admin/
Allow: /

Sitemap: https://exemplu.ro/sitemap.xml
```

Semnul `*` înseamnă „toți roboții”. `Disallow` interzice o cale, `Allow` face o excepție, iar `Sitemap` indică harta site-ului.

## Principalele directive

| Directivă | Semnificație |
|-----------|--------------|
| `User-agent` | Pentru care robot se aplică regulile |
| `Disallow` | Nu parcurge această cale |
| `Allow` | Poate parcurge această cale (excepție) |
| `Crawl-delay` | Așteptare între cereri (secunde) |
| `Sitemap` | URL-ul complet al sitemap.xml |

## Limita importantă: nu este securitate

robots.txt este o **cerere**, nu o barieră. Roboții binevoitori o respectă, dar fișierul nu impune nimic: URL-urile interzise rămân accesibile public dacă cineva le știe adresa, iar boții rău intenționați le pot ignora complet. **Nu proteja niciodată conținut confidențial doar cu robots.txt** – folosește parolă sau protecție pe server.

De asemenea, `Disallow` împiedică parcurgerea, dar nu neapărat indexarea. O pagină interzisă poate apărea în rezultate ca simplu URL. Pentru a o scoate complet, folosește meta tag-ul `noindex` – dar atunci nu o bloca și cu Disallow, altfel Google nu ajunge să vadă noindex-ul.

## Boții AI: o decizie nouă

Tot mai multe crawlere adună date pentru antrenarea modelelor de limbaj sau pentru motoarele AI. În robots.txt le poți gestiona pe nume:

- **GPTBot, ChatGPT-User** (OpenAI)
- **Google-Extended** (Google AI)
- **anthropic-ai, ClaudeBot** (Anthropic)
- **CCBot** (Common Crawl)
- **PerplexityBot, Bytespider** (alți furnizori)

Generatorul le poate bloca pe toate cu o singură bifă. Tu decizi: dacă vrei să protejezi conținutul de antrenarea AI, blochează-i; dacă vrei vizibilitate în motoarele AI, lasă-i permiși.

## Cum se folosește generatorul

1. **Pornește de la un șablon** (tot permis, WordPress, fără indexare) sau setează manual.
2. **Adaugă căile** Disallow și Allow în liste.
3. **Scrie URL-ul sitemap** și, opțional, crawl-delay.
4. **Bifează** blocarea boților AI, dacă vrei.
5. **Copiază sau descarcă** fișierul și pune-l în rădăcina site-ului.

## Greșeli frecvente

1. **`Disallow: /` uitat în producție** – blochează tot site-ul din căutare. Cea mai costisitoare greșeală de SEO.
2. **Fișier într-un subdirector** – doar `exemplu.ro/robots.txt` este valid, nu `exemplu.ro/folder/robots.txt`.
3. **Blocarea folderelor de CSS/JS** – poate împiedica Google să redea corect pagina.
4. **Lipsa liniei Sitemap** – o ocazie ratată de a ghida roboții spre toate paginile.

## Confidențialitate: totul rămâne local

Asamblarea fișierului rulează în browserul tău, prin JavaScript. Regulile pe care le compui nu ajung pe niciun server – poți pregăti robots.txt-ul și pentru un site aflat încă în dezvoltare.

## Instrumente înrudite

- [Generator Meta Tag](/seo/generator-meta-tag/) — inclusiv directiva robots la nivel de pagină (index/noindex)
- [Generator UTM](/seo/generator-utm/) — construiește URL-uri de campanie pentru măsurarea traficului
- [Generator Schema FAQ](/seo/generator-schema-faq/) — date structurate JSON-LD pentru întrebări frecvente
- [Verificare title și meta description](/seo/verificare-title-meta/) — lungime în caractere și pixeli cu previzualizare SERP
