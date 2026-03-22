# Claude Code – konvertalo.hu Főoldal Redesign (SEO + UX)

> **Önálló implementációs prompt** – ezt a fájlt add át Claude Code-nak.
> Cél: a főoldal (`src/pages/index.astro`) teljes tartalmi és strukturális újraírása.
> A meglévő eszköz oldalakat NEM érinti.
>
> **Futtatási sorrend:** ez a prompt független az 1. és 2. fázis promotoktól,
> de a FAQ szövegeket a freemium bevezetése előtt kell írni (lásd FAQ szekció).
>
> **Nincs AdSense a főoldalon** – a főoldalon nincs timing ablak (nincs `ConvertButton`),
> ezért az ad slot pozíciók nem relevánsak. Az AdSense az eszköz oldalakon működik
> (1. fázis prompt). A főoldal `BaseLayout.astro`-n keresztül örökli az AdSense scriptet,
> de külön `AdSlot` komponenst NE helyezz el rajta.

---

## Kontextus

**Jelenlegi állapot (amit meg kell szüntetni):**
A főoldal jelenleg a navigációs menü kiterjesztett változata – minden kategória alatt
az összes eszköz linkként sorolódik fel (~96 link egy oldalon). Ez három problémát okoz:

1. **SEO:** a PageRank egyenlő arányban oszlik el 96 link között, nincs hierarchia
2. **UX:** az első látogató elvész, nincs vizuális irányítás
3. **Konverzió:** nincs értékpropozíció, nincs kiemelés, nincs CTA

**Cél:** a főoldal legyen önálló, tartalmas landing page, ami:
- Rangsorolható a "konvertalo", "online konvertáló", "fájl konvertáló" kulcsszavakra
- Azonnal kommunikálja az értékpropozíciót
- Irányítja a felhasználót a legtöbbet használt eszközökre
- Minden szekció tartalma valódi SEO értéket képvisel

---

## Kötelező előkészítés – olvasd el ELŐSZÖR

Mielőtt bármit implementálsz, olvasd el:

```
src/pages/index.astro                    ← a jelenlegi főoldal – mit váltasz ki
src/components/home/ToolTabs.svelte      ← KRITIKUS: meglévő tabbed eszközlista
src/lib/tool-registry.ts                 ← eszköz és kategória adatok
src/i18n/hu.json                         ← magyar Astro fordítások (t() kulcsok)
src/i18n/ro.json                         ← román Astro fordítások
src/layouts/BaseLayout.astro             ← az alaplayout – head, nav, footer
src/pages/[category]/index.astro         ← minta a kártyás listázásra
```

**Kritikus szabályok (architecture doksiból):**

| Fájl típus | i18n módszer | Miért |
|---|---|---|
| `.astro` fájlok | `t()` / `hu.json` + `ro.json` | Server-side render, build-time |
| `.svelte` fájlok | `ui-labels.ts` → `ui.*` | Client-side island |

- Az `index.astro` Astro fájl → **CSAK `t()` használható, `ui.*` TILOS**
- Ha új Svelte island komponenst hozol létre a főoldalhoz → ott `ui.*` kell
- `tool-registry.ts`-t NE módosítsd
- Az URL struktúra NEM változik
- A navbar és footer NEM változik

### `ToolTabs.svelte` kezelése

Az architecture doksi szerint a főoldalon már van `src/components/home/ToolTabs.svelte`
– ez a jelenlegi tabbed eszközlista Svelte island.

**Döntés:** olvasd el a `ToolTabs.svelte` kódját, és dönts:
- Ha a meglévő tab logika értékes (fuzzy search, kategória szűrő) → **tartsd meg**,
  helyezd a "Kiemelt eszközök" szekció alá, és csak a statikus szekciók köré adj új tartalmat
- Ha a `ToolTabs` csak egy egyszerű link-lista wrapper → **cseréld le** az új kártyás struktúrára

Ne duplikáld a logikát – ha a `ToolTabs` megmarad, az új statikus kártyák és a `ToolTabs`
ne legyenek egymás mellett ugyanazzal a tartalommal.

---

## Az új főoldal struktúrája

```
1. <head> – SEO meta tagek + JSON-LD schema-k
2. Hero szekció
3. Trust signals sáv
4. Kiemelt eszközök ("Legnépszerűbb") – statikus top 10 kártya
5. Kategória blokkok (kompakt – 4 link + "összes →")
6. [ToolTabs.svelte – ha megtartjuk, ide kerül]
7. "Miért Konvertalo.hu?" szekció
8. Hogyan működik? szekció
9. FAQ szekció (strukturált adat)
10. Footer (meglévő)
```

---

## 1. SEO meta tagek

### `hu.json` és `ro.json` – új kulcsok

Add hozzá a következő kulcsokat az `src/i18n/hu.json` fájlba:

```json
"homepage": {
  "meta_title": "Konvertalo.hu – 96 ingyenes online konvertáló eszköz | Képek, PDF, Adat",
  "meta_description": "Ingyenes online konvertáló eszközök képekhez, PDF-ekhez és adatfájlokhoz. 96 eszköz, szerverfeltöltés nélkül, teljes adatvédelemmel. JPG→WebP, PDF összefűzés, CSV→JSON és sok más – azonnal, böngészőből.",
  "meta_keywords": "online konvertáló, képkonvertáló, pdf eszközök, jpg webp, pdf összefűzés, csv json, fájl konvertáló, ingyenes konvertáló"
}
```

`src/i18n/ro.json`-ba:

```json
"homepage": {
  "meta_title": "Instrumenteonline.ro – 96 instrumente online gratuite | Imagini, PDF, Date",
  "meta_description": "Instrumente online gratuite pentru imagini, PDF și fișiere de date. 96 de instrumente, fără încărcare pe server, cu confidențialitate completă. JPG→WebP, unire PDF, CSV→JSON și multe altele – instant, din browser.",
  "meta_keywords": "convertor online, convertor imagini, instrumente pdf, jpg webp, unire pdf, csv json, convertor fisiere, gratuit"
}
```

### `index.astro` – meta tagek bekötése

```astro
---
import { t } from '../i18n/index.ts';
---
<BaseLayout
  title={t('homepage.meta_title')}
  description={t('homepage.meta_description')}
>
```

### Schema.org JSON-LD – `<head>`-ben

**WebSite + SearchAction:**
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Konvertalo.hu",
  "url": "https://konvertalo.hu/",
  "description": "Ingyenes online konvertáló és eszközgyűjtemény – képek, PDF, adat, szöveg, fejlesztői eszközök böngészőből, szerverfeltöltés nélkül.",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://konvertalo.hu/kereses?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}
```

**SoftwareApplication:**
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Konvertalo.hu",
  "applicationCategory": "UtilitiesApplication",
  "operatingSystem": "Web",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "HUF" },
  "url": "https://konvertalo.hu/"
}
```

A JSON-LD értékeket az `CURRENT_CONFIG` és a `t()` segítségével dinamikusan töltsd ki
ahol lehetséges (pl. `siteUrl`, `siteName` a `CURRENT_CONFIG`-ból).

---

## 2. Hero szekció

**`hu.json` / `ro.json` kulcsok:**

```json
"homepage": {
  "hero_title": "96 ingyenes online eszköz – szerverfeltöltés nélkül",
  "hero_subtitle": "Képek konvertálása, PDF-ek kezelése, adatfájlok átalakítása – közvetlenül a böngészőben, a fájljaid nem hagyják el a gépedet.",
  "hero_search_placeholder": "pl. jpg webp, pdf összefűzés, csv json...",
  "hero_search_btn": "Keresés",
  "hero_categories_label": "Eszköz kategóriák"
}
```

```json
"homepage": {
  "hero_title": "96 de instrumente online gratuite – fără încărcare pe server",
  "hero_subtitle": "Convertiți imagini, gestionați PDF-uri, transformați fișiere de date – direct în browser, fișierele nu părăsesc calculatorul.",
  "hero_search_placeholder": "ex. jpg webp, unire pdf, csv json...",
  "hero_search_btn": "Caută",
  "hero_categories_label": "Categorii de instrumente"
}
```

**`index.astro` HTML struktúra:**

```astro
<section class="hero" aria-labelledby="hero-title">
  <div class="hero__inner">
    <h1 id="hero-title">{t('homepage.hero_title')}</h1>
    <p class="hero__subtitle">{t('homepage.hero_subtitle')}</p>

    <!-- Keresőmező: a meglévő SearchOverlay Ctrl+K keresést triggereli -->
    <!-- NE írj új keresési logikát – használd a meglévő SearchOverlay-t -->
    <div class="hero__search">
      <a href={staticUrl('kereses')} class="hero__search-link" role="searchbox">
        <span class="hero__search-icon" aria-hidden="true">🔍</span>
        <span class="hero__search-placeholder">{t('homepage.hero_search_placeholder')}</span>
      </a>
    </div>

    <!-- Kategória pill linkek -->
    <nav class="hero__categories" aria-label={t('homepage.hero_categories_label')}>
      {getVisibleCategories().map(cat => (
        <a href={categoryUrl(cat.id)} class="hero__cat-pill">
          {cat.icon} {getLocalizedCategory(cat, CURRENT_LANG).label}
        </a>
      ))}
    </nav>
  </div>
</section>
```

**Miért link a hero keresőmező és nem input?**
A meglévő `SearchOverlay.svelte` már tartalmaz egy teljes keresési logikát (Ctrl+K).
Új keresési logikát írni duplikáció és karbantartási teher. A hero "keresőmező"
valójában egy styled link a `/kereses` oldalra – viselkedésre ugyanolyan, kódra egyszerűbb.

---

## 3. Trust signals sáv

**`hu.json` kulcsok:**
```json
"homepage": {
  "trust_privacy_title": "Szervermentes",
  "trust_privacy_desc": "Fájljaid nem hagyják el a géped",
  "trust_gdpr_title": "GDPR-kompatibilis",
  "trust_gdpr_desc": "Nincs adatfeldolgozás a szerveren",
  "trust_speed_title": "Azonnali",
  "trust_speed_desc": "Feldolgozás a böngészőben",
  "trust_free_title": "Teljesen ingyenes",
  "trust_free_desc": "Regisztráció nélkül",
  "trust_mobile_title": "Mobilon is működik",
  "trust_mobile_desc": "Minden modern böngészőben"
}
```

*(ro.json-ba ugyanezek románul – lásd az előző verzió fordításait)*

---

## 4. Kiemelt eszközök szekció

**`hu.json` kulcsok:**
```json
"homepage": {
  "featured_title": "Legnépszerűbb eszközök",
  "featured_subtitle": "A leggyakrabban használt konvertálók – azonnal indítható"
}
```

### Top 10 – hardcoded slug lista (NEM dinamikus!)

```astro
---
import { getToolBySlug, getLocalizedTool } from '../lib/tool-registry.ts';

const TOP_TOOL_SLUGS = [
  { category: 'kep',      slug: 'jpg-webp',       icon: '🖼️' },
  { category: 'kep',      slug: 'tomorites',       icon: '🗜️' },
  { category: 'kep',      slug: 'atmeretezes',     icon: '📐' },
  { category: 'pdf',      slug: 'osszeillesztes',  icon: '📄' },
  { category: 'pdf',      slug: 'szetbontas',      icon: '✂️' },
  { category: 'pdf',      slug: 'tomoritese',      icon: '🗜️' },
  { category: 'adat',     slug: 'csv-json',        icon: '📊' },
  { category: 'kep',      slug: 'png-webp',        icon: '🖼️' },
  { category: 'fejleszto', slug: 'json-formazas',  icon: '⚙️' },
  { category: 'kep',      slug: 'fekete-feher',    icon: '🎨' },
];

const topTools = TOP_TOOL_SLUGS
  .map(({ category, slug, icon }) => {
    const raw = getToolBySlug(category, slug);
    if (!raw) return null;
    return { tool: getLocalizedTool(raw, CURRENT_LANG), icon };
  })
  .filter(Boolean);
---

<ul class="tool-grid tool-grid--featured" role="list">
  {topTools.map(({ tool, icon }) => (
    <li class="tool-card tool-card--featured">
      <a href={toolUrl(tool)} class="tool-card__link">
        <span class="tool-card__icon" aria-hidden="true">{icon}</span>
        <div class="tool-card__body">
          <h3 class="tool-card__title">{tool.h1}</h3>
          <p class="tool-card__desc">{tool.description}</p>
        </div>
        <span class="tool-card__arrow" aria-hidden="true">→</span>
      </a>
    </li>
  ))}
</ul>
```

---

## 5. Kategória blokkok szekció

**`hu.json` kulcsok:**
```json
"homepage": {
  "categories_title": "Összes eszközkategória",
  "categories_more": "további eszköz →"
}
```

```astro
---
const categories = getVisibleCategories(CURRENT_LANG);
---

{categories.map(rawCat => {
  const cat = getLocalizedCategory(rawCat, CURRENT_LANG);
  const allTools = getToolsByCategory(rawCat.id)
    .filter(t => t.status === 'active')
    .map(t => getLocalizedTool(t, CURRENT_LANG));
  const featured = allTools.slice(0, 4);
  const remaining = allTools.length - featured.length;

  return (
    <article class="category-block">
      <header class="category-block__header">
        <a href={categoryUrl(rawCat.id)}>
          <span aria-hidden="true">{rawCat.icon}</span>
          <h3>{cat.label}</h3>
          <span class="category-block__count">{allTools.length}</span>
        </a>
        <p class="category-block__desc">{cat.description}</p>
      </header>
      <ul class="category-block__tools" role="list">
        {featured.map(tool => (
          <li><a href={toolUrl(tool)}>{tool.h1}</a></li>
        ))}
      </ul>
      {remaining > 0 && (
        <a href={categoryUrl(rawCat.id)} class="category-block__more">
          {remaining} {t('homepage.categories_more')}
        </a>
      )}
    </article>
  );
})}
```

---

## 6. "Miért Konvertalo.hu?" szekció

**`hu.json` kulcsok** (hosszabb szövegek):
```json
"homepage": {
  "why_title": "Miért válaszd a Konvertalo.hu-t?",
  "why_privacy_title": "Teljes adatvédelem",
  "why_privacy_body": "A fájlok feldolgozása kizárólag a te böngésződben történik Web Worker technológiával. Egyetlen bájt sem kerül szerverre – sem a mi szerverünkre, sem harmadik félhez.",
  "why_speed_title": "Azonnali feldolgozás",
  "why_speed_body": "Nincs várakozás szerveres feldolgozásra. A konvertálás azonnal, a te géped processzoron történik – a böngésző reszponzív marad.",
  "why_free_title": "100% ingyenes",
  "why_free_body": "Minden eszköz korlátlanul elérhető, regisztráció nélkül. Nincs vízjel, nincs rejtett korlát. Az oldal hirdetésekből tartja fenn magát.",
  "why_browser_title": "Telepítés nélkül",
  "why_browser_body": "Nincs letöltés, nincs telepítés. Minden modern böngészőben működik – Chrome, Firefox, Safari, Edge.",
  "why_mobile_title": "Mobilon is teljes értékű",
  "why_mobile_body": "Az összes eszköz reszponzív dizájnnal készült és mobilon, tableten is teljes értékűen működik.",
  "why_tools_title": "96 eszköz, egy helyen",
  "why_tools_body": "Képkonvertálástól a PDF kezelésig, fejlesztői segédeszközöktől az adattisztításig – minden egységes felületen."
}
```

---

## 7. "Hogyan működik?" szekció

**`hu.json` kulcsok:**
```json
"homepage": {
  "how_title": "Hogyan működik?",
  "how_subtitle": "Három egyszerű lépés – szoftver telepítése nélkül",
  "how_step1_title": "Válassz eszközt",
  "how_step1_body": "Keresd meg a megfelelő eszközt a kategóriák között. 96 eszköz közül választhatsz.",
  "how_step2_title": "Töltsd fel a fájlt",
  "how_step2_body": "Húzd be a fájlt, vagy kattints a feltöltés gombra. A fájl nem kerül szerverre.",
  "how_step3_title": "Töltsd le az eredményt",
  "how_step3_body": "A feldolgozás azonnal megtörténik. Nincs email regisztráció, nincs várakozás."
}
```

---

## 8. FAQ szekció

### ⚠️ Fontos: FAQ szövegek a freemium bevezetése előtt és után

A FAQ-ban NE szerepeljen *"nincs napi limit"* vagy *"nincs pro verzió"* kijelentés,
mert a 2. fázis freemiumot vezet be. A szövegeket semlegesen kell megfogalmazni.

**`hu.json` kulcsok:**
```json
"homepage": {
  "faq_title": "Gyakran ismételt kérdések",
  "faq_q1": "Ingyenes az összes eszköz?",
  "faq_a1": "Az alapfunkciók ingyenesen elérhetők, regisztráció nélkül. Az oldal hirdetésekből és opcionális Premium előfizetésből tartja fenn magát.",
  "faq_q2": "Biztonságos a fájljaimat feltölteni?",
  "faq_a2": "A Konvertalo.hu nem tölt fel semmit szerverre. Minden feldolgozás kizárólag a te böngésződben, a te gépeden történik. A fájlok egyetlen bájtja sem hagyja el a gépedet.",
  "faq_q3": "Milyen fájlformátumokat támogat?",
  "faq_a3": "Képeknél JPG, PNG, WebP, AVIF, HEIC, GIF, SVG; PDF-eknél bármilyen szabványos PDF; adatoknál CSV, JSON, TSV, XLSX; fejlesztői eszközöknél JSON, YAML, XML, HTML, CSS, JavaScript, Base64, URL formátumok.",
  "faq_q4": "Működnek az eszközök mobilon?",
  "faq_a4": "Igen, minden eszköz reszponzív dizájnnal készült. A fájlfeltöltés elvégezhető a telefon galériájából, fájlkezelőjéből vagy felhőtárhelyről is.",
  "faq_q5": "Mekkora fájlokat lehet feldolgozni?",
  "faq_a5": "Képeknél általában 10-50MB-ig, PDF-eknél a dokumentum komplexitásától függően. Mivel a feldolgozás a böngészőben történik, a tényleges limit a gépednek elérhető RAM-jától függ.",
  "faq_q6": "Kell regisztrálni a használathoz?",
  "faq_a6": "Nem, az alapfunkciók azonnal, fiók nélkül elérhetők. Nincs szükség email-re vagy jelszóra az eszközök használatához."
}
```

### FAQ JSON-LD – `<head>`-ben

```astro
---
const faqItems = [1,2,3,4,5,6].map(i => ({
  q: t(`homepage.faq_q${i}`),
  a: t(`homepage.faq_a${i}`),
}));

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqItems.map(({ q, a }) => ({
    "@type": "Question",
    "name": q,
    "acceptedAnswer": { "@type": "Answer", "text": a }
  }))
};
---
<script type="application/ld+json" set:html={JSON.stringify(faqSchema)} />
```

### FAQ HTML (microdata a JSON-LD mellé)

```astro
<dl class="faq__list" itemscope itemtype="https://schema.org/FAQPage">
  {faqItems.map(({ q, a }) => (
    <div class="faq__item" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
      <dt itemprop="name">{q}</dt>
      <dd itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
        <span itemprop="text">{a}</span>
      </dd>
    </div>
  ))}
</dl>
```

---

## Összefoglalás az implementálónak

### Fájlok amiket módosítasz:
- `src/pages/index.astro` – **teljes újraírás**
- `src/i18n/hu.json` – új `homepage.*` kulcsok
- `src/i18n/ro.json` – új `homepage.*` kulcsok románul

### Fájlok amiket NEM módosítasz:
- `src/lib/tool-registry.ts`
- `src/lib/ui-labels.ts` – főoldal szövegek itt NEM szerepelnek (Astro fájl!)
- Bármilyen eszköz oldal
- A navbar / footer
- Az URL struktúra

### Implementálási sorrend:
1. Adj hozzá minden szöveget `hu.json`-ba és `ro.json`-ba (`homepage.*` namespace)
2. Olvasd el a `ToolTabs.svelte`-t – döntsd el megtartod vagy lecseréled
3. Írd újra az `index.astro`-t szekciónként, felülről lefelé
4. Add hozzá a JSON-LD schema scripteket a `<head>`-be
5. Ellenőrizd RO builddel is (`npm run dev:ro`)

### Tesztelési checklist:
- [ ] `<title>` és `<meta description>` mindkét nyelven helyes és megjelenik
- [ ] WebSite + FAQPage JSON-LD validál (Google Rich Results Test)
- [ ] Hero keresőmező a `/kereses` oldalra vezet (NEM nyit új search logikát)
- [ ] Top 10 eszköz kártya mind helyes URL-re mutat
- [ ] Kategória blokkok "további eszköz →" linkje helyes kategória URL-re mutat
- [ ] Minden szekció látható mobilon (320px minimális szélesség)
- [ ] A főoldal NEM listáz 96 linket (max 10 kártya + kategóriánként 4)
- [ ] RO verzión román szövegek jelennek meg, HU verzión magyarok
- [ ] `t()` hívások mindenhol helyesek – nincs `ui.*` az `index.astro`-ban
- [ ] Nincs `AdSlot` komponens a főoldalon

### Amit NE csinálj:
- Ne használj `ui.*`-t az `index.astro`-ban – csak `t()`
- Ne írj új keresési logikát – a hero keresőmező link a `/kereses` oldalra
- Ne módosítsd a `ToolTabs.svelte`-t ha megtartod – csak integráld
- Ne cseréld le a footert és a navbart
- Ne helyezz el `AdSlot` komponenst a főoldalon

---

## Kontextus

**Jelenlegi állapot (amit meg kell szüntetni):**
A főoldal jelenleg a navigációs menü kiterjesztett változata – minden kategória alatt
az összes eszköz linkként sorolódik fel (~96 link egy oldalon). Ez három problémát okoz:

1. **SEO:** a PageRank egyenlő arányban oszlik el 96 link között, nincs hierarchia
2. **UX:** az első látogató elvész, nincs vizuális irányítás
3. **Konverzió:** nincs értékpropozíció, nincs kiemelés, nincs CTA

**Cél:** a főoldal legyen önálló, tartalmas landing page, ami:
- Rangsorolható a "konvertalo", "online konvertáló", "fájl konvertáló" kulcsszavakra
- Azonnal kommunikálja az értékpropozíciót
- Irányítja a felhasználót a legtöbbet használt eszközökre
- Minden szekció tartalma valódi SEO értéket képvisel (nem csak link-lista)

---

## Kötelező előkészítés – olvasd el ezeket ELŐSZÖR

Mielőtt bármit implementálsz, olvasd el:
- `src/lib/tool-registry.ts` – az összes eszköz és kategória adatai innen jönnek
- `src/lib/ui-labels.ts` – i18n szövegek (BUILD-TIME, nincs runtime `t()`)
- `src/layouts/BaseLayout.astro` vagy az alaplayout fájl
- A jelenlegi `src/pages/index.astro` – hogy pontosan lásd mit váltasz ki
- Egy meglévő kategória oldal (pl. `src/pages/kep/index.astro`) – minta a kártyás listázásra

**Kritikus szabályok:**
- SOHA ne használj `t()` – csak `ui.*` értékeket `ui-labels.ts`-ből
- A `tool-registry.ts` adatait használd az eszköz linkekhez – ne hard-code-olj URL-eket
- Az oldal SSG marad – minden statikusan generált, nincs kliens oldali fetch
- HU és RO verzió egyaránt frissül (`PUBLIC_SITE_LANG` alapján)
- A meglévő URL struktúra (`/kep/jpg-webp` stb.) NEM változik

---

## Az új főoldal struktúrája

```
1. <head> – SEO meta tagek
2. Hero szekció
3. Trust signals sáv
4. Kiemelt eszközök ("Legnépszerűbb")
5. Kategória blokkok (kompakt)
6. "Miért Konvertalo.hu?" szekció
7. Hogyan működik? szekció
8. FAQ szekció (strukturált adat)
9. Footer (meglévő)
```

---

## 1. SEO meta tagek

### Magyar (hu) verzió

```html
<title>Konvertalo.hu – 96 ingyenes online konvertáló eszköz | Képek, PDF, Adat</title>

<meta name="description"
  content="Ingyenes online konvertáló eszközök képekhez, PDF-ekhez és adatfájlokhoz.
  96 eszköz, szerverfeltöltés nélkül, teljes adatvédelemmel. JPG→WebP, PDF összefűzés,
  CSV→JSON és sok más – azonnal, böngészőből.">

<meta name="keywords"
  content="online konvertáló, képkonvertáló, pdf eszközök, jpg webp, pdf összefűzés,
  csv json, fájl konvertáló, ingyenes konvertáló">

<link rel="canonical" href="https://konvertalo.hu/">
```

**Schema.org – WebSite + SearchAction (főoldalra kötelező):**
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Konvertalo.hu",
  "url": "https://konvertalo.hu/",
  "description": "Ingyenes online konvertáló és eszközgyűjtemény – képek, PDF, adat, szöveg, fejlesztői eszközök böngészőből, szerverfeltöltés nélkül.",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://konvertalo.hu/?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Konvertalo.hu",
    "url": "https://konvertalo.hu/"
  }
}
```

**Schema.org – SoftwareApplication:**
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Konvertalo.hu",
  "applicationCategory": "UtilitiesApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "HUF"
  },
  "description": "96 ingyenes online eszköz képek, PDF-ek és adatfájlok konvertálásához és feldolgozásához – közvetlenül a böngészőben.",
  "url": "https://konvertalo.hu/"
}
```

### Román (ro) verzió

```html
<title>Instrumenteonline.ro – Instrumente online gratuite | Imagini, PDF, Date</title>

<meta name="description"
  content="Instrumente online gratuite pentru imagini, PDF și fișiere de date.
  96 de instrumente, fără încărcare pe server, cu confidențialitate completă.
  JPG→WebP, unire PDF, CSV→JSON și multe altele – instant, din browser.">

<link rel="canonical" href="https://instrumenteonline.ro/">
```

---

## 2. Hero szekció

**Elhelyezés:** közvetlenül a navbar után, `<main>` első eleme.

**HTML struktúra:**
```html
<section class="hero" aria-labelledby="hero-title">
  <div class="hero__inner">
    <h1 id="hero-title">[HERO_TITLE]</h1>
    <p class="hero__subtitle">[HERO_SUBTITLE]</p>

    <!-- Keresőmező – a meglévő keresés funkció bekötve -->
    <div class="hero__search" role="search">
      <label for="hero-search" class="sr-only">[SEARCH_LABEL]</label>
      <input
        id="hero-search"
        type="search"
        placeholder="[SEARCH_PLACEHOLDER]"
        autocomplete="off"
        aria-label="[SEARCH_LABEL]"
      />
      <button type="submit" aria-label="[SEARCH_BTN_LABEL]">
        🔍 [SEARCH_BTN_TEXT]
      </button>
    </div>

    <!-- Gyors kategória linkek -->
    <nav class="hero__categories" aria-label="[CATEGORIES_NAV_LABEL]">
      <a href="/kep">🖼️ [CAT_IMAGES]</a>
      <a href="/pdf">📄 PDF</a>
      <a href="/adat">📊 [CAT_DATA]</a>
      <a href="/szoveg">📝 [CAT_TEXT]</a>
      <a href="/fejleszto">⚙️ [CAT_DEV]</a>
      <a href="/seo">🔍 SEO</a>
    </nav>
  </div>
</section>
```

**ui-labels.ts szövegek – `homepage.hero.*`:**

| Kulcs | HU | RO |
|---|---|---|
| `title` | `96 ingyenes online eszköz – szerverfeltöltés nélkül` | `96 de instrumente online gratuite – fără încărcare pe server` |
| `subtitle` | `Képek konvertálása, PDF-ek kezelése, adatfájlok átalakítása – közvetlenül a böngészőben, a fájljaid nélkül hagyják el a gépedet.` | `Convertiți imagini, gestionați PDF-uri, transformați fișiere de date – direct în browser, fișierele nu părăsesc calculatorul.` |
| `search_label` | `Keress eszközök között` | `Caută instrumente` |
| `search_placeholder` | `pl. jpg webp, pdf összefűzés, csv json...` | `ex. jpg webp, unire pdf, csv json...` |
| `search_btn_label` | `Keresés indítása` | `Caută` |
| `search_btn_text` | `Keresés` | `Caută` |
| `categories_nav_label` | `Eszköz kategóriák` | `Categorii de instrumente` |
| `cat_images` | `Képek` | `Imagini` |
| `cat_data` | `Adat` | `Date` |
| `cat_text` | `Szöveg` | `Text` |
| `cat_dev` | `Fejlesztő` | `Dezvoltator` |

**CSS irányelvek** (illeszd a meglévő design tokenekhez):
- Hero háttér: enyhe gradient vagy semleges szín, NE fehér
- H1 méret: min. 2rem, max. 3.5rem, responsive
- Keresőmező: teljes szélességű mobile-on, max-width 600px desktop-on
- Kategória linkek: pill/badge stílusú gombok, vízszintes scrollozható mobile-on

---

## 3. Trust signals sáv

**Közvetlenül a hero alatt**, full-width, kompakt sáv.

```html
<section class="trust-signals" aria-label="[TRUST_ARIA_LABEL]">
  <ul class="trust-signals__list" role="list">
    <li>
      <span aria-hidden="true">🔒</span>
      <strong>[TRUST_PRIVACY_TITLE]</strong>
      <span>[TRUST_PRIVACY_DESC]</span>
    </li>
    <li>
      <span aria-hidden="true">🇪🇺</span>
      <strong>[TRUST_GDPR_TITLE]</strong>
      <span>[TRUST_GDPR_DESC]</span>
    </li>
    <li>
      <span aria-hidden="true">⚡</span>
      <strong>[TRUST_SPEED_TITLE]</strong>
      <span>[TRUST_SPEED_DESC]</span>
    </li>
    <li>
      <span aria-hidden="true">🆓</span>
      <strong>[TRUST_FREE_TITLE]</strong>
      <span>[TRUST_FREE_DESC]</span>
    </li>
    <li>
      <span aria-hidden="true">📱</span>
      <strong>[TRUST_MOBILE_TITLE]</strong>
      <span>[TRUST_MOBILE_DESC]</span>
    </li>
  </ul>
</section>
```

**ui-labels.ts szövegek – `homepage.trust.*`:**

| Kulcs | HU | RO |
|---|---|---|
| `aria_label` | `Miért bízz a Konvertalo.hu-ban` | `De ce să ai încredere în Instrumenteonline.ro` |
| `privacy_title` | `Szervermentes` | `Fără server` |
| `privacy_desc` | `Fájljaid nem hagyják el a géped` | `Fișierele nu părăsesc calculatorul` |
| `gdpr_title` | `GDPR-kompatibilis` | `Conform GDPR` |
| `gdpr_desc` | `Nincs adatfeldolgozás a szerveren` | `Fără procesare pe server` |
| `speed_title` | `Azonnali` | `Instant` |
| `speed_desc` | `Feldolgozás a böngészőben` | `Procesare în browser` |
| `free_title` | `Teljesen ingyenes` | `Complet gratuit` |
| `free_desc` | `Regisztráció nélkül` | `Fără înregistrare` |
| `mobile_title` | `Mobilon is működik` | `Funcționează pe mobil` |
| `mobile_desc` | `Minden modern böngészőben` | `În orice browser modern` |

---

## 4. Kiemelt eszközök szekció

**Cím:** `Legnépszerűbb eszközök` / `Instrumente populare`

Ez a szekció a főoldal legfontosabb SEO+konverziós eleme. **10 kiemelten linkelt eszköz**,
vizuálisan hangsúlyos kártyákban – ezek kapják a legtöbb PageRank-et a főoldalról.

### Az eszközök kiválasztásának logikája

A top 10 lista a várható keresési volumen és az eszköz általánosság alapján:

```typescript
// Hardcode-olt top 10 – ezeket NE a tool-registry-ből dinamikusan, 
// hanem explicit listából add meg, hogy SEO szempontból stabilan 
// ez a 10 kap prioritást a főoldalon

const TOP_TOOLS = [
  { slug: '/kep/jpg-webp',        icon: '🖼️', category: 'Képek' },
  { slug: '/kep/tomorites',       icon: '🗜️', category: 'Képek' },
  { slug: '/kep/atmeretezes',     icon: '📐', category: 'Képek' },
  { slug: '/pdf/osszeillesztes',  icon: '📄', category: 'PDF'   },
  { slug: '/pdf/szetbontas',      icon: '✂️', category: 'PDF'   },
  { slug: '/pdf/tomoritese',      icon: '🗜️', category: 'PDF'   },
  { slug: '/adat/csv-json',       icon: '📊', category: 'Adat'  },
  { slug: '/kep/png-webp',        icon: '🖼️', category: 'Képek' },
  { slug: '/fejleszto/json-formazas', icon: '⚙️', category: 'Fejlesztő' },
  { slug: '/kep/fekete-feher',    icon: '🎨', category: 'Képek' },
];
```

**Az eszközök nevét és leírását a `tool-registry.ts`-ből olvasd ki** a slug alapján –
ne hard-code-old a neveket, hogy ha a registry változik, a főoldal is frissüljön.

### Kártya struktúra

```html
<section class="featured-tools" aria-labelledby="featured-tools-title">
  <div class="section__header">
    <h2 id="featured-tools-title">[FEATURED_TITLE]</h2>
    <p class="section__subtitle">[FEATURED_SUBTITLE]</p>
  </div>

  <ul class="tool-grid tool-grid--featured" role="list">
    {#each TOP_TOOLS as tool}
    <li class="tool-card tool-card--featured">
      <a href="{tool.slug}" class="tool-card__link">
        <span class="tool-card__icon" aria-hidden="true">{tool.icon}</span>
        <div class="tool-card__body">
          <h3 class="tool-card__title">{tool.name}</h3>          <!-- tool-registry-ből -->
          <p class="tool-card__desc">{tool.shortDescription}</p> <!-- tool-registry-ből -->
          <span class="tool-card__category">{tool.category}</span>
        </div>
        <span class="tool-card__arrow" aria-hidden="true">→</span>
      </a>
    </li>
    {/each}
  </ul>
</section>
```

**ui-labels.ts szövegek – `homepage.featured.*`:**

| Kulcs | HU | RO |
|---|---|---|
| `title` | `Legnépszerűbb eszközök` | `Instrumente populare` |
| `subtitle` | `A leggyakrabban használt konvertálók és szerkesztők – azonnal indítható` | `Cele mai utilizate convertoare și editoare – pornire imediată` |

**CSS irányelvek:**
- Grid: 2 oszlop mobile, 3 oszlop tablet, 5 oszlop desktop (2 sor × 5)
- Kártya: border, enyhe árnyék, hover emelkedés animáció
- Ikon: 2rem, kategória badge: kis pill a jobb alsó sarokban

---

## 5. Kategória blokkok szekció

**Cím:** `Összes eszközkategória` / `Toate categoriile de instrumente`

Ez a szekció NEM listáz minden eszközt – csak kategóriánként 3-4 kiemeltet + "összes →" CTA.
Így a főoldal megőrzi a navigációs értéket, de nem válik link-listává.

### Kategória blokk struktúra

```html
<section class="categories" aria-labelledby="categories-title">
  <h2 id="categories-title">[CATEGORIES_TITLE]</h2>

  <div class="category-grid">

    <!-- Ismétlődő blokk minden kategóriára -->
    <article class="category-block" aria-labelledby="cat-kep-title">
      <header class="category-block__header">
        <a href="/kep" class="category-block__title-link">
          <span aria-hidden="true">🖼️</span>
          <h3 id="cat-kep-title">Képek</h3>
          <span class="category-block__count">27 eszköz</span>
        </a>
        <p class="category-block__desc">
          Képkonvertálás, átméretezés, tömörítés és szerkesztés – közvetlenül a böngészőben.
        </p>
      </header>
      <ul class="category-block__tools" role="list">
        <li><a href="/kep/jpg-webp">JPG → WebP</a></li>
        <li><a href="/kep/tomorites">Képtömörítés</a></li>
        <li><a href="/kep/atmeretezes">Átméretezés</a></li>
        <li><a href="/kep/png-webp">PNG → WebP</a></li>
      </ul>
      <a href="/kep" class="category-block__more">
        [CAT_MORE_PREFIX] 23 [CAT_MORE_SUFFIX] →
      </a>
    </article>

    <!-- ... többi kategória ugyanígy ... -->

  </div>
</section>
```

### Mind a 10 kategória blokk tartalma

Az alábbi 3-4 "kiemelt link" minden kategóriában hard-code-olt (SEO optimalizált sorrend),
a neveket a `tool-registry.ts`-ből olvasd:

| Kategória | URL | Kiemelt 4 eszköz slug |
|---|---|---|
| 🖼️ Képek (27) | `/kep` | `jpg-webp`, `tomorites`, `atmeretezes`, `png-webp` |
| 📄 PDF (17) | `/pdf` | `osszeillesztes`, `szetbontas`, `tomoritese`, `pdf-keppe` |
| 📊 Adat (11) | `/adat` | `csv-json`, `json-csv`, `csv-tisztitas`, `tsv-csv` |
| 📝 Szöveg (12) | `/szoveg` | `slug-generator`, `kereses-csere`, `kisbetu-nagybetu`, `sorok-rendezese` |
| ⚙️ Fejlesztő (17) | `/fejleszto` | `json-formazas`, `base64-kodolo-dekodolo`, `url-kodolo-dekodolo`, `xml-formazas` |
| ✍️ Markdown (1) | `/markdown` | `markdown-html` |
| 🌐 HTML (2) | `/html` | `html-szovegge`, `html-minimalas-html` |
| 📈 Excel (4) | `/excel` | `xlsx-csv`, `xlsx-json`, `csv-xlsx`, `xlsx-megtekinto` |
| 🗂️ Fájl (4) | `/fajl` | `zip-keszito`, `zip-kibonto`, `hash-ellenorzo`, `fajl-informacio` |
| 🔍 SEO (1+) | `/seo` | `title-meta-hossz` |

**ui-labels.ts szövegek – `homepage.categories.*`:**

| Kulcs | HU | RO |
|---|---|---|
| `title` | `Összes eszközkategória` | `Toate categoriile de instrumente` |
| `more_prefix` | `Még` | `Încă` |
| `more_suffix` | `eszköz →` | `instrumente →` |
| `tool_count_suffix` | `eszköz` | `instrumente` |

**Kategória leírások** – ezek SEO szövegek, mind a `ui-labels.ts`-be kerülnek
`homepage.categories.descriptions.*` alatt:

| Kategória | HU leírás | RO leírás |
|---|---|---|
| kep | `JPG, PNG, WebP, AVIF, HEIC képformátumok közötti konvertálás, tömörítés, átméretezés és szerkesztés – szerverfeltöltés nélkül.` | `Conversie între formate JPG, PNG, WebP, AVIF, HEIC, comprimare, redimensionare și editare – fără încărcare pe server.` |
| pdf | `PDF összefűzés, szétbontás, tömörítés, vízjel, jelszóvédelem és oldalkezelés – a fájlok nem hagyják el a böngészőt.` | `Unire, împărțire, comprimare, filigran, protecție parolă și gestionare pagini PDF – fișierele nu părăsesc browserul.` |
| adat | `CSV, JSON, TSV adatfájlok konvertálása, tisztítása és átalakítása – gyorsan, böngészőből, regisztráció nélkül.` | `Conversia, curățarea și transformarea fișierelor CSV, JSON, TSV – rapid, din browser, fără înregistrare.` |
| szoveg | `Szövegsorok rendezése, tisztítása, ismétlődők törlése, keresés-csere és karakterkonverzió – egy kattintással.` | `Sortarea, curățarea liniilor de text, eliminarea duplicatelor, căutare-înlocuire și conversie caractere – cu un clic.` |
| fejleszto | `JSON, YAML, XML, HTML, CSS, JavaScript formázása és minifikálása, Base64 és URL kódolás – fejlesztői segédeszközök.` | `Formatarea și minificarea JSON, YAML, XML, HTML, CSS, JavaScript, codificare Base64 și URL – instrumente pentru dezvoltatori.` |
| excel | `Excel (XLSX) fájlok konvertálása CSV-be, JSON-ba, és visszafelé – böngészőből, telepítés nélkül.` | `Conversia fișierelor Excel (XLSX) în CSV, JSON și invers – din browser, fără instalare.` |
| fajl | `ZIP archívum készítése és kibontása, fájl hash ellenőrzése és fájl metaadatok megjelenítése online.` | `Crearea și extragerea arhivelor ZIP, verificarea hash-ului fișierelor și afișarea metadatelor online.` |
| seo | `SEO segédeszközök: title és meta description hosszellenőrzés, UTM paraméterek, canonical tag és robots.txt generálás.` | `Instrumente SEO: verificare lungime title și meta description, parametri UTM, canonical tag și generare robots.txt.` |

---

## 6. "Miért Konvertalo.hu?" szekció

Ez a szekció az E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) szempontból
kritikus – tartalmas magyarázó szöveg, ami egyszerre szól a felhasználónak és a Google-nek.

```html
<section class="why-section" aria-labelledby="why-title">
  <h2 id="why-title">[WHY_TITLE]</h2>

  <div class="why-grid">
    <article class="why-card">
      <span class="why-card__icon" aria-hidden="true">🔒</span>
      <h3>[WHY_PRIVACY_TITLE]</h3>
      <p>[WHY_PRIVACY_BODY]</p>
    </article>
    <article class="why-card">
      <span class="why-card__icon" aria-hidden="true">⚡</span>
      <h3>[WHY_SPEED_TITLE]</h3>
      <p>[WHY_SPEED_BODY]</p>
    </article>
    <article class="why-card">
      <span class="why-card__icon" aria-hidden="true">🆓</span>
      <h3>[WHY_FREE_TITLE]</h3>
      <p>[WHY_FREE_BODY]</p>
    </article>
    <article class="why-card">
      <span class="why-card__icon" aria-hidden="true">🌐</span>
      <h3>[WHY_BROWSER_TITLE]</h3>
      <p>[WHY_BROWSER_BODY]</p>
    </article>
    <article class="why-card">
      <span class="why-card__icon" aria-hidden="true">📱</span>
      <h3>[WHY_MOBILE_TITLE]</h3>
      <p>[WHY_MOBILE_BODY]</p>
    </article>
    <article class="why-card">
      <span class="why-card__icon" aria-hidden="true">🔧</span>
      <h3>[WHY_TOOLS_TITLE]</h3>
      <p>[WHY_TOOLS_BODY]</p>
    </article>
  </div>
</section>
```

**ui-labels.ts szövegek – `homepage.why.*`:**

| Kulcs | HU | RO |
|---|---|---|
| `title` | `Miért válaszd a Konvertalo.hu-t?` | `De ce să alegi Instrumenteonline.ro?` |
| `privacy_title` | `Teljes adatvédelem` | `Confidențialitate totală` |
| `privacy_body` | `A fájlok feldolgozása kizárólag a te böngésződben történik, Web Worker technológiával. Egyetlen bájt sem kerül szerverre – sem a mi szerverünkre, sem harmadik félhez. Ez különösen fontos bizalmas dokumentumok, személyes fotók és üzleti adatok esetén.` | `Fișierele sunt procesate exclusiv în browserul tău, folosind tehnologia Web Worker. Nici un octet nu ajunge pe server – nici pe al nostru, nici la terți. Acest lucru este deosebit de important pentru documente confidențiale, fotografii personale și date de afaceri.` |
| `speed_title` | `Azonnali feldolgozás` | `Procesare instantă` |
| `speed_body` | `Nincs várakozás szerveres feldolgozásra, nincs feltöltési sor. A konvertálás azonnal, a te géped processzoron történik. Még nagy fájlok esetén is a böngésző reszponzív marad – a feldolgozás háttérszálon fut.` | `Fără așteptare pentru procesare pe server, fără coadă de încărcare. Conversia are loc imediat, pe procesorul tău. Chiar și în cazul fișierelor mari, browserul rămâne responsive – procesarea rulează în fundal.` |
| `free_title` | `100% ingyenes` | `100% gratuit` |
| `free_body` | `Minden eszköz korlátlanul elérhető, regisztráció és fizetés nélkül. Nincs napi limit, nincs vízjel, nincs "freemium trükk". A Konvertalo.hu hirdetésekből tartja fenn magát, nem a felhasználóitól.` | `Toate instrumentele sunt disponibile fără limită, fără înregistrare și fără plată. Fără limită zilnică, fără filigran, fără „trucuri freemium". Instrumenteonline.ro se susține din publicitate, nu de la utilizatori.` |
| `browser_title` | `Telepítés nélkül` | `Fără instalare` |
| `browser_body` | `Nincs letöltés, nincs telepítés, nincs frissítés. A Konvertalo.hu minden modern böngészőben működik – Chrome, Firefox, Safari, Edge. Elég megnyitni az oldalt, és máris dolgozhat.` | `Fără descărcare, fără instalare, fără actualizări. Instrumenteonline.ro funcționează în orice browser modern – Chrome, Firefox, Safari, Edge. E suficient să deschizi pagina și poți începe lucrul.` |
| `mobile_title` | `Mobilon is teljes értékű` | `Complet funcțional pe mobil` |
| `mobile_body` | `Az összes eszköz reszponzív dizájnnal készült, és mobilon, tableten is teljes értékűen működik. A fájlfeltöltés a telefon galériájából vagy fájlkezelőjéből is elvégezhető.` | `Toate instrumentele au design responsiv și funcționează complet pe mobil și tabletă. Încărcarea fișierelor se poate face și din galeria telefonului sau din managerul de fișiere.` |
| `tools_title` | `96 eszköz, egy helyen` | `96 de instrumente, într-un loc` |
| `tools_body` | `Képkonvertálástól a PDF kezelésig, fejlesztői segédeszközöktől az adattisztításig – minden egységes felületen, egységes UX-szel. Nem kell eszközről eszközre vándorolni különböző oldalak között.` | `De la conversia imaginilor la gestionarea PDF-urilor, de la instrumentele pentru dezvoltatori la curățarea datelor – totul într-o interfață unificată, cu UX uniform. Nu trebuie să sari de la un instrument la altul pe site-uri diferite.` |

---

## 7. "Hogyan működik?" szekció

Rövid, 3 lépéses folyamat – SEO szempontból a how-to tartalom értékes.

```html
<section class="how-it-works" aria-labelledby="how-title">
  <h2 id="how-title">[HOW_TITLE]</h2>
  <p class="how-it-works__subtitle">[HOW_SUBTITLE]</p>

  <ol class="how-steps" role="list">
    <li class="how-step">
      <span class="how-step__number" aria-hidden="true">1</span>
      <div>
        <h3>[HOW_STEP1_TITLE]</h3>
        <p>[HOW_STEP1_BODY]</p>
      </div>
    </li>
    <li class="how-step">
      <span class="how-step__number" aria-hidden="true">2</span>
      <div>
        <h3>[HOW_STEP2_TITLE]</h3>
        <p>[HOW_STEP2_BODY]</p>
      </div>
    </li>
    <li class="how-step">
      <span class="how-step__number" aria-hidden="true">3</span>
      <div>
        <h3>[HOW_STEP3_TITLE]</h3>
        <p>[HOW_STEP3_BODY]</p>
      </div>
    </li>
  </ol>
</section>
```

**ui-labels.ts szövegek – `homepage.how.*`:**

| Kulcs | HU | RO |
|---|---|---|
| `title` | `Hogyan működik?` | `Cum funcționează?` |
| `subtitle` | `Három egyszerű lépés – szoftver telepítése nélkül` | `Trei pași simpli – fără a instala software` |
| `step1_title` | `Válassz eszközt` | `Alege un instrument` |
| `step1_body` | `Keresd meg a megfelelő eszközt a kategóriák között, vagy használd a keresőt. 96 eszköz közül választhatsz – képkonvertálástól a PDF kezelésig.` | `Găsește instrumentul potrivit printre categorii sau folosește căutarea. Poți alege din 96 de instrumente – de la conversia imaginilor la gestionarea PDF-urilor.` |
| `step2_title` | `Töltsd fel a fájlt` | `Încarcă fișierul` |
| `step2_body` | `Húzd be a fájlt az eszköz területére, vagy kattints a feltöltés gombra. A fájl nem kerül szerverre – közvetlenül a böngésződbe töltődik be.` | `Glisează fișierul în zona instrumentului sau apasă butonul de încărcare. Fișierul nu ajunge pe server – se încarcă direct în browserul tău.` |
| `step3_title` | `Töltsd le az eredményt` | `Descarcă rezultatul` |
| `step3_body` | `A feldolgozás azonnal megtörténik, az eredményt egy kattintással letöltheted. Nincs email regisztráció, nincs várakozás, nincs vízjel.` | `Procesarea are loc imediat, poți descărca rezultatul cu un clic. Fără înregistrare email, fără așteptare, fără filigran.` |

---

## 8. FAQ szekció (strukturált adat kötelező)

Ez a szekció dupla értéket termel: tartalmas szöveg + FAQ schema = Google rich snippet esély.

```html
<section class="faq" aria-labelledby="faq-title">
  <h2 id="faq-title">[FAQ_TITLE]</h2>

  <dl class="faq__list">
    <div class="faq__item" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
      <dt itemprop="name">[FAQ_Q1]</dt>
      <dd itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
        <span itemprop="text">[FAQ_A1]</span>
      </dd>
    </div>
    <!-- ... többi kérdés ugyanígy ... -->
  </dl>
</section>
```

**Schema.org FAQPage JSON-LD** (a `<head>`-be):
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "[FAQ_Q1]",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[FAQ_A1]"
      }
    }
    // ... többi kérdés
  ]
}
```

**ui-labels.ts szövegek – `homepage.faq.*`:**

| Kulcs | HU | RO |
|---|---|---|
| `title` | `Gyakran ismételt kérdések` | `Întrebări frecvente` |
| `q1` | `Valóban ingyenes az összes eszköz?` | `Sunt cu adevărat gratuite toate instrumentele?` |
| `a1` | `Igen, a Konvertalo.hu összes eszköze teljesen ingyenes, regisztráció és fizetés nélkül elérhető. Nincs napi használati limit, nincs vízjel az eredményen, és nincs "pro verzió" amire egyes funkciók korlátoznák. Az oldal hirdetésekből tartja fenn magát.` | `Da, toate instrumentele de pe Instrumenteonline.ro sunt complet gratuite, disponibile fără înregistrare și fără plată. Nu există limită zilnică de utilizare, nu există filigran pe rezultat și nu există „versiune pro" care să restricționeze unele funcții. Site-ul se susține din publicitate.` |
| `q2` | `Biztonságos a fájljaimat feltölteni?` | `Este sigur să încarc fișierele mele?` |
| `a2` | `A Konvertalo.hu nem tölt fel semmit szerverre. Minden feldolgozás kizárólag a te böngésződben, a te gépeden történik JavaScript és Web Worker technológia segítségével. A fájlok egyetlen bájtja sem hagyja el a gépedet – ez azt jelenti, hogy bizalmas dokumentumok, személyes fotók és üzleti adatok is teljes biztonságban feldolgozhatók.` | `Instrumenteonline.ro nu încarcă nimic pe server. Toată procesarea are loc exclusiv în browserul tău, pe calculatorul tău, cu ajutorul tehnologiei JavaScript și Web Worker. Nici un octet din fișierele tale nu părăsește calculatorul – ceea ce înseamnă că documentele confidențiale, fotografiile personale și datele de afaceri pot fi procesate în deplină siguranță.` |
| `q3` | `Milyen fájlformátumokat támogat a Konvertalo.hu?` | `Ce formate de fișiere suportă Instrumenteonline.ro?` |
| `a3` | `A Konvertalo.hu széles formátumpalettát támogat: képeknél JPG, PNG, WebP, AVIF, HEIC, GIF, SVG; PDF-eknél bármilyen szabványos PDF fájl; adatoknál CSV, JSON, TSV, XLSX; fejlesztői eszközöknél JSON, YAML, XML, HTML, CSS, JavaScript, Base64, URL formátumok. Az elérhető konverziók teljes listáját a kategória oldalakon találod.` | `Instrumenteonline.ro suportă o paletă largă de formate: pentru imagini JPG, PNG, WebP, AVIF, HEIC, GIF, SVG; pentru PDF orice fișier PDF standard; pentru date CSV, JSON, TSV, XLSX; pentru instrumente de dezvoltare JSON, YAML, XML, HTML, CSS, JavaScript, Base64, formate URL. Lista completă a conversiilor disponibile o găsești pe paginile de categorie.` |
| `q4` | `Működnek az eszközök mobilon is?` | `Funcționează instrumentele și pe mobil?` |
| `a4` | `Igen, minden eszköz reszponzív dizájnnal készült és teljes értékűen működik okostelefonon és tableten is. A fájlfeltöltés elvégezhető a telefon galériájából, fájlkezelőjéből vagy akár felhőtárhelyről (Google Drive, iCloud) is. A legjobb teljesítmény Chrome és Safari böngészőkben érhető el mobilon.` | `Da, toate instrumentele au design responsiv și funcționează complet pe smartphone și tabletă. Încărcarea fișierelor se poate face din galeria telefonului, managerul de fișiere sau chiar din stocare cloud (Google Drive, iCloud). Cea mai bună performanță se obține în browsere Chrome și Safari pe mobil.` |
| `q5` | `Mekkora fájlokat lehet feldolgozni?` | `Ce dimensiune de fișiere pot fi procesate?` |
| `a5` | `Az eszközök a legtöbb tipikus fájlméretet kezelik – képeknél általában 50MB-ig, PDF-eknél a dokumentum komplexitásától függően. Mivel a feldolgozás a böngészőben történik, a tényleges limit a te gépednek elérhető RAM-jától függ. Nagyon nagy fájlok (100MB+) esetén a feldolgozás lassabb lehet, de általában elvégezhető.` | `Instrumentele gestionează cele mai tipice dimensiuni de fișiere – pentru imagini de obicei până la 50MB, pentru PDF-uri în funcție de complexitatea documentului. Deoarece procesarea are loc în browser, limita reală depinde de RAM-ul disponibil al calculatorului tău. Pentru fișiere foarte mari (100MB+) procesarea poate fi mai lentă, dar de obicei se poate finaliza.` |
| `q6` | `Kell regisztrálni a Konvertalo.hu használatához?` | `Trebuie să mă înregistrez pentru a folosi Instrumenteonline.ro?` |
| `a6` | `Nem, semmilyen regisztráció nem szükséges. Az összes eszköz azonnal, fiók nélkül elérhető. Nem kell email-t megadni, nem kell jelszót beállítani, és nem kérdezünk személyes adatokat. Egyszerűen megnyitod az eszközt, feltöltöd a fájlt, és letöltöd az eredményt.` | `Nu, nu este necesară nicio înregistrare. Toate instrumentele sunt disponibile imediat, fără cont. Nu trebuie să furnizezi email, nu trebuie să setezi parolă și nu cerem date personale. Pur și simplu deschizi instrumentul, încarci fișierul și descarci rezultatul.` |

---

## Összefoglalás az implementálónak

### Fájlok amiket módosítasz:
- `src/pages/index.astro` (vagy a HU főoldal fájl) – **teljes újraírás**
- `src/lib/ui-labels.ts` – új `homepage.*` namespace hozzáadása

### Fájlok amiket NEM módosítasz:
- `src/lib/tool-registry.ts`
- Bármilyen eszköz oldal
- A navbar / footer
- Az URL struktúra

### Implementálási sorrend:
1. Adj hozzá minden új szöveget `ui-labels.ts`-be (`homepage.*` namespace)
2. Írj egy `HomepageToolCard` Astro komponenst a kártyákhoz (ha nincs ilyen)
3. Írd újra az `index.astro`-t szekciónként, felülről lefelé
4. Add hozzá a JSON-LD schema scripteket a `<head>`-be
5. Ellenőrizd hogy a RO verzió is helyesen renderelődik (`PUBLIC_SITE_LANG=ro`)

### Tesztelési checklist:
- [ ] `<title>` és `<meta description>` mindkét nyelven helyes
- [ ] WebSite + FAQPage JSON-LD validál (Google Rich Results Test)
- [ ] Hero keresőmező funkcionál (a meglévő keresés logikával)
- [ ] Top 10 eszköz kártya mind helyes URL-re mutat (tool-registry-ből)
- [ ] Kategória blokkok "összes →" linkje helyes kategória URL-re mutat
- [ ] Minden szekció látható mobilon (320px minimális szélesség)
- [ ] A főoldal NEM listáz 96 linket (max 10 kártya + kategóriánként 4)
- [ ] RO verzión román szövegek jelennek meg, HU verzión magyarok
- [ ] Nincs egyetlen hard-code-olt eszköz neve sem – mind tool-registry-ből jön

### Amit NE csinálj:
- Ne adj hozzá JavaScript-et a főoldalra Svelte island nélkül
- Ne módosítsd a meglévő keresés implementációját, csak kösd be a hero inputhoz
- Ne cseréld le a footert
- Ne használj `t()` függvényt – csak `ui.*`
- Ne commitolj inline style attribútumokat – csak CSS class-okat
