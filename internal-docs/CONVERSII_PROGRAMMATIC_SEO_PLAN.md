# Conversii — Sub-hub + Instant-Answer (Programmatic SEO) Migration Plan

> **Cél:** A `mathSEO_reference` (matekmegoldasok.hu) `atvaltasok/*` mintáját átültetni a román oldalra (`instrumenteonline.ro/conversii/*`):
> 1) **Sub-hub-ok** (gyűjtőoldalak): `/conversii/lungime/`, `/masa/`, `/volum/`, `/suprafata/`, `/temperatura/`, `/densitate/` — átláthatóság + topikus klaszter erősítés.
> 2) **„Hidden" instant-answer oldalak** (programmatic SEO): pl. `/conversii/lungime/170-cm-in-metri/` — long-tail kérdésekre azonnali konkrét választ adnak, nem jelennek meg a navigációs menüben, de szerepelnek a sitemap-ban és belső linkekben.
>
> **Nem érinti:** HU build, meglévő konverter URL-ek (`/conversii/cm-metri/` változatlan), schema-szabályok, KaTeX pipeline.

---

## 1. Architektúra

### 1.1 URL-séma (3 szint)

| Szint | URL | Mit ad | Példa |
|---|---|---|---|
| **L1 — fő hub** | `/conversii/` | meglévő `CategoryLayout` — minden konverter listája | jelenlegi |
| **L2 — sub-hub** | `/conversii/{subcat}/` | egy mértékegység-család gyűjtőoldala (intro + konverter-grid + instant-answer index + FAQ + JSON-LD `CollectionPage` + `ItemList` + `BreadcrumbList`) | `/conversii/lungime/` |
| **L3a — konverter tool** | `/conversii/{tool}/` | meglévő, **változatlan** | `/conversii/cm-metri/` |
| **L3b — instant-answer** | `/conversii/{subcat}/{instant-slug}/` | rövid „X = Y" oldal: válasz hero, képlet, mikor használjuk, kis táblázat, kapcsolódók, FAQ | `/conversii/lungime/170-cm-in-metri/` |

**Miért nem mozgatjuk a konvertereket sub-hub alá?** Az URL-stabilitás a már indexált oldalaknak fontos (matek tartalom 2026-04-25 óta él). A sub-hub csak **plusz** réteg, nem váltja le a tool URL-eket. A sub-hub *belülről* linkel a tool-ra: `/conversii/lungime/` → linkek a `/conversii/cm-metri/`-re.

### 1.2 Astro routing változások

Új route fájlok:

```
src/pages/[category]/
├── [slug].astro                     ← MÓDOSUL: tool VAGY sub-hub branch
├── index.astro                      ← változatlan
└── [subcat]/
    ├── index.astro                  ← ÚJ: sub-hub landing (csak conversii)
    └── [slug].astro                 ← ÚJ: instant-answer page
```

Mivel a `[category]/[slug]` rétegen most **tool** kerül kiszolgálásra, és a sub-hub URL ugyanezt a mintát követi (`/conversii/lungime/`), a `[category]/[slug].astro` `getStaticPaths()` visszaadja a sub-hub-okat is, és a fájl `props`-ban kapja meg, hogy `kind: "tool" | "hub"`. A render branch elágazik.

Alternatíva: külön `[category]/sub/[slug].astro` route. **Elvetve**: gyengébb SEO (mélyebb URL = kevesebb link-juice), és a `mathSEO_reference` is flat sub-hub-ot használ.

### 1.3 Adat-architektúra

Új fájlok:

```
src/lib/content/ro/
└── conversii-hubs.ts                ← ÚJ: sub-hub-ok metaadata-ja (slug, label, intro, FAQ)

src/content/math/ro/conversii/
├── lungime/
│   ├── 170-cm-in-metri.md
│   ├── 175-cm-in-metri.md
│   ├── ... (instant-answer .md fájlok)
├── masa/
├── volum/
├── suprafata/
├── temperatura/
└── densitate/
```

**Astro Content Collection bővítés** — `src/content/config.ts` új mezők:

```ts
const mathCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/math" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    toolSlug: z.string().optional(),       // marad: meglévő tool oldalakhoz
    instantSlug: z.string().optional(),    // ← ÚJ: instant-answer oldal azonosító
    subcategory: z.enum([                  // ← ÚJ: melyik sub-hubba tartozik
      "lungime","masa","volum","suprafata","temperatura","densitate",
    ]).optional(),
    category: z.enum([
      "calculator","geometrie","conversii","finante","sanatate","timp",
    ]),
    published_at: z.string(),
    refreshed_at: z.string().optional(),
    heroImage: z.string().optional(),
    articleSchema: schemaObjectSchema,
    softwareSchema: schemaObjectSchema,
    faqPageSchema: schemaObjectSchema,
    separatePage: z.boolean().default(false),
  }),
});
```

### 1.4 Tool-registry NEM változik

Az instant-answer és sub-hub oldalak **nem** kerülnek a `tool-registry`-be (nincs Svelte komponens, nincs `applicationCategory`, nincs FAQ a tool-fiókon). Külön content-driven oldalak.

A `conversii-hubs.ts` lesz a single source of truth a sub-hub-oknak:

```ts
export interface ConversionSubcategory {
  slug: "lungime" | "masa" | "volum" | "suprafata" | "temperatura" | "densitate";
  label: string;          // "Lungime", "Masă", ...
  icon: string;           // "📏", "⚖️", ...
  description: string;    // meta description
  intro: string[];        // 2-3 SEO bekezdés
  toolSlugs: string[];    // melyik konverter-tool-ok tartoznak ide (tool-registry slug)
  faq: { q: string; a: string }[]; // 5-6 kérdés
  // SEO
  keywords: string[];
}

export const CONVERSII_HUBS: ConversionSubcategory[] = [
  {
    slug: "lungime",
    label: "Lungime",
    icon: "📏",
    description: "...",
    intro: ["...", "..."],
    toolSlugs: ["cm-metri", "km-metri", "cm-inch", "inch-cm", "picioare-cm"],
    faq: [...],
    keywords: ["convertor lungime", "transformare cm m", ...],
  },
  // ...
];
```

---

## 2. Sub-hub-ok lebontása (L2)

### 2.1 Lungime — `/conversii/lungime/`
- **Konverterek:** cm-metri, km-metri, cm-inch, inch-cm, picioare-cm
- **Instant-answer-ok (~12-15):** `170-cm-in-metri`, `175-cm-in-metri`, `180-cm-in-metri`, `185-cm-in-metri`, `190-cm-in-metri`, `1-km-in-metri`, `5-km-in-metri`, `10-km-in-metri`, `21-km-in-metri` (semi-marathon), `42-km-in-metri` (maraton), `27-inch-in-cm` (monitor), `32-inch-in-cm` (TV), `55-inch-in-cm`, `65-inch-in-cm`, `5-picioare-9-inch-in-cm`, `6-picioare-in-cm`
- **Keresési indok (RO long-tail):** „cât e 170 cm în metri", „1 km câți metri are", „32 inch în cm"

### 2.2 Masă (Greutate) — `/conversii/masa/`
- **Konverterek:** kg-grame, kg-livre, tone-kg
- **Instant-answer-ok (~10):** `1-kg-in-grame`, `2-kg-in-grame`, `5-kg-in-grame`, `100-grame-in-kg`, `500-grame-in-kg`, `70-kg-in-livre` (tipică greutate), `80-kg-in-livre`, `100-kg-in-livre`, `1-tona-in-kg`, `2-tone-in-kg`, `1000-kg-in-tone`

### 2.3 Volum — `/conversii/volum/`
- **Konverterek:** litri-mililitri, litri-decilitri, litri-metri-cubi, galon-litri
- **Instant-answer-ok (~12):** `1-litru-in-ml`, `2-litri-in-ml`, `500-ml-in-litri`, `750-ml-in-litri`, `1-litru-in-dl`, `2-litri-in-dl`, `5-dl-in-litri`, `1-m3-in-litri`, `5-m3-in-litri`, `1000-litri-in-m3`, `1-galon-in-litri` (US/UK), `5-galoane-in-litri`, `10-galoane-in-litri`

### 2.4 Suprafață — `/conversii/suprafata/`
- **Konverterek:** hectare-metri-patrati, ari-metri-patrati
- **Instant-answer-ok (~10):** `1-hectar-in-m2`, `2-hectare-in-m2`, `5-hectare-in-m2`, `10-hectare-in-m2`, `0-5-hectare-in-m2`, `1-ar-in-m2`, `5-ari-in-m2`, `10-ari-in-m2`, `20-ari-in-m2`, `50-ari-in-m2`, `1000-m2-in-ari`, `5000-m2-in-hectare`
- **Keresési indok:** ingatlanpiac RO („teren 5 ari", „lot 1 ha")

### 2.5 Temperatură — `/conversii/temperatura/`
- **Konverter:** celsius-fahrenheit
- **Instant-answer-ok (~12):** `0-c-in-fahrenheit`, `20-c-in-fahrenheit` (kamera), `25-c-in-fahrenheit`, `30-c-in-fahrenheit`, `37-c-in-fahrenheit` (corp uman), `100-c-in-fahrenheit`, `32-f-in-celsius`, `60-f-in-celsius`, `70-f-in-celsius` (room temp US), `100-f-in-celsius` (febră), `212-f-in-celsius`, `350-f-in-celsius` (cuptor)

### 2.6 Densitate (Materiale construcții) — `/conversii/densitate/`
- **Konverterek:** beton-greutate-volum, nisip-greutate-volum, pietris-greutate-volum, balast-greutate-volum, densitate-kg-m3-g-cm3
- **Instant-answer-ok (~14):** `1-m3-beton-in-kg`, `1-tona-beton-in-m3`, `2-tone-beton-in-m3`, `500-kg-beton-in-m3`, `1-m3-nisip-in-kg`, `1-tona-nisip-in-m3`, `2-tone-nisip-in-m3`, `1-m3-pietris-in-kg`, `1-tona-pietris-in-m3`, `2-tone-pietris-in-m3`, `1-m3-balast-in-kg`, `1-tona-balast-in-m3`, `2-tone-balast-in-m3`

**Becsült össz oldalszám:** 6 sub-hub + ~70-80 instant-answer = **~76-86 új oldal** (RO-only).

---

## 3. Oldal-template-ek

### 3.1 Sub-hub layout (ConversionHubLayout.astro)
```
┌──────────────────────────────────────────┐
│ Breadcrumb: Acasă › Conversii › Lungime  │
├──────────────────────────────────────────┤
│ <h1>Convertoare lungime</h1>             │
│ Intro 2-3 paragraf (SEO + AI-citability) │
├──────────────────────────────────────────┤
│ Convertoare disponibile (grid)           │
│ [cm↔m] [km↔m] [cm↔inch] [inch↔cm] ...     │
├──────────────────────────────────────────┤
│ Răspunsuri rapide (instant-answer index) │
│ - 170 cm în metri  - 32 inch în cm       │
│ - 175 cm în metri  - 27 inch în cm       │
│ - 1 km în metri    - 5 picioare 9 inch   │
│ ...                                      │
├──────────────────────────────────────────┤
│ FAQ (5-6 kérdés)                         │
└──────────────────────────────────────────┘
```

**Schema.org (3 blokk):**
- `BreadcrumbList`
- `CollectionPage` + `ItemList` (mind a konverterek + instant-answer-ok)
- `FAQPage`

### 3.2 Instant-answer layout (InstantAnswerLayout.astro)
```
┌──────────────────────────────────────────┐
│ Breadcrumb: Acasă › Conversii ›          │
│            Lungime › 170 cm în metri     │
├──────────────────────────────────────────┤
│ <h1>170 cm în metri = 1,70 m</h1>        │
│ ★ Hero answer card (ki nem hagyható)    │
├──────────────────────────────────────────┤
│ ## Cum se calculează?                    │
│ Formulă: m = cm ÷ 100                    │
│ KaTeX renderelt képlet                   │
├──────────────────────────────────────────┤
│ ## Când îți trebuie?                     │
│ Top 3-4 use case (RO-specifikus)         │
├──────────────────────────────────────────┤
│ ## Tabel rapid (±2-3 érték)              │
│ 168 cm → 1,68 m                          │
│ 169 cm → 1,69 m                          │
│ **170 cm → 1,70 m** (kiemelve)           │
│ 171 cm → 1,71 m                          │
│ 172 cm → 1,72 m                          │
├──────────────────────────────────────────┤
│ ## Conversii înrudite (4-6 link)         │
│ → 175 cm în metri, 180 cm în metri,      │
│   /conversii/cm-metri/ (full converter)  │
├──────────────────────────────────────────┤
│ FAQ (3 kérdés)                           │
└──────────────────────────────────────────┘
```

**Schema.org (3 blokk):**
- `BreadcrumbList`
- `Article` (headline = „170 cm în metri = 1,70 m", `mainEntity` = a konkrét answer)
- `FAQPage` (3 Q&A)
- **NEM** `SoftwareApplication` (nincs interaktív kalkulátor az oldalon)

### 3.3 Markdown frontmatter (instant-answer)
```yaml
---
title: "170 cm în metri | Răspuns: 1,70 m"
description: "170 cm = 1,70 m. Înălțime medie pentru femei. Formula, exemple și conversii similare."
instantSlug: "170-cm-in-metri"
subcategory: "lungime"
category: "conversii"
published_at: "2026-04-27"
refreshed_at: "2026-04-27"
articleSchema:
  "@context": "https://schema.org"
  "@type": "Article"
  headline: "170 cm în metri = 1,70 m"
  description: "..."
  inLanguage: "ro"
  datePublished: "2026-04-27"
  dateModified: "2026-04-27"
  author: { "@id": "https://instrumenteonline.ro/#organization" }
  publisher: { "@id": "https://instrumenteonline.ro/#organization" }
faqPageSchema:
  "@context": "https://schema.org"
  "@type": "FAQPage"
  mainEntity:
    - "@type": "Question"
      name: "Cât este 170 cm în metri?"
      acceptedAnswer: { "@type": "Answer", text: "170 cm = 1,70 m. Formulă: m = cm ÷ 100." }
    - "@type": "Question"
      name: "Cât e 170 cm în picioare și inch?"
      acceptedAnswer: { "@type": "Answer", text: "170 cm ≈ 5 picioare 7 inch (5'7\")." }
    - "@type": "Question"
      name: "170 cm e înalt sau scund?"
      acceptedAnswer: { "@type": "Answer", text: "170 cm e înălțime medie pentru femei (RO) și sub medie pentru bărbați." }
---

**170 cm = 1,70 metri.**

Pentru a converti centimetri în metri, împarte valoarea la 100:

$$170 \div 100 = 1{,}70 \text{ m}$$

## Când îți trebuie?
- Buletin / pașaport (înălțime)
- Documente medicale, fișa școlară
- Profil sportiv

...
```

---

## 4. Belső linkelési stratégia (SEO)

### 4.1 Hub → klaszter
- `/conversii/` (fő hub) — új „Categorii" szekció: **6 kártya** sub-hub-ra mutat (mellé/elé/után a meglévő konverter-grid)
- `/conversii/lungime/` (sub-hub) — minden konverter és instant-answer URL link

### 4.2 Konverter → instant-answer
- A meglévő `cm-metri.md` „Conversii înrudite" szekciójához hozzáadunk: `→ 170 cm în metri`, `→ 175 cm în metri`, … (5-8 link)
- **Kétirányú:** instant-answer oldal vissza-linkel a teljes konverterre („Folosește calculatorul complet →")

### 4.3 Instant-answer ↔ instant-answer
- Minden instant-answer min. 4-6 kapcsolódó instant-answer linket tartalmaz (pl. `170-cm-in-metri` linkel: `175-cm-in-metri`, `180-cm-in-metri`, `5-picioare-7-inch-in-cm` (cross-unit))

### 4.4 Sitemap
- Sub-hub-ok: priority 0.85, changefreq weekly
- Instant-answer-ok: priority 0.7, changefreq monthly
- Mindkettő bekerül a meglévő `sitemap.xml.ts`-be (új helper függvény: `getConversionHubs()`, `getInstantAnswerPages()`).

---

## 5. SEO / GEO best practice (be kell tartani)

| Szempont | Megoldás |
|---|---|
| **Cannibalization** | Sub-hub és instant-answer **nem ugyanazt a kulcsszót** célozza. Sub-hub: „convertor lungime", „transformare metri cm". Instant: „cât e 170 cm în metri", „170 cm câți metri sunt". |
| **Thin content kockázat** | Minden instant-answer min. **300-400 szó** (hero answer + formulă + use cases + tabel + 3 FAQ). Csak hero+képlet = thin → büntetés. |
| **Schema.org duplikáció** | Instant-answer-en **nincs** `SoftwareApplication` (nincs kalkulátor). Csak `Article` + `FAQPage` + `BreadcrumbList`. Audit script futtatandó deploy előtt. |
| **AI-citability** | Hero answer card („170 cm = 1,70 m") = ChatGPT/Perplexity könnyen idézhető passage. Frontmatter description = 150-160 kar, magában is válasz. |
| **E-E-A-T** | Minden instant-answer publisher = `InstrumenteOnline` Organization, `dateModified` aktuális. Sub-hub publisher = ugyanaz, az intro-ban szakértői kontextus. |
| **Internal linking** | Minimum 6 belső link instant-answer-enként (4 instant + 1 sub-hub + 1 konverter). |
| **Hreflang** | A teljes `/conversii/*` cluster RO-only (nincs HU pár) → **nincs** hreflang. |
| **Canonical** | Trailing slash mindenütt, abszolút URL: `https://instrumenteonline.ro/conversii/lungime/170-cm-in-metri/`. |
| **noindex** | Sub-hub és instant-answer **indexelt** (van valódi tartalom + lekérdezési intent). |
| **404-mentesség** | Az új instant-answer URL-ek a sub-hub indexéből és a related linkekből hivatkozottak — sosem orphan. |
| **Mobile-first** | A meglévő layout reszponzív, csak a táblázatokra figyelni (overflow-x: auto). |
| **Core Web Vitals** | Az instant-answer-ek **nem** töltenek be Svelte islandet (csak markdown render) → LCP/INP minimális. |
| **llms.txt** | Új szekció: `## Quick conversion answers (RO)` — top 30 instant-answer URL listával. |

---

## 6. Ütemterv (3 fázis, kis lépésekben)

### Fázis 0 — Infrastruktúra (1 nap)
1. `src/lib/content/ro/conversii-hubs.ts` — 6 sub-hub metaadat
2. `src/content/config.ts` bővítés (`instantSlug`, `subcategory` mezők)
3. Új `src/layouts/ConversionHubLayout.astro` (sub-hub render)
4. Új `src/layouts/InstantAnswerLayout.astro` (instant-answer render)
5. Új route `src/pages/[category]/[subcat]/index.astro` — sub-hub generálás (csak conversii)
6. Új route `src/pages/[category]/[subcat]/[slug].astro` — instant-answer generálás (csak conversii)
7. Sitemap bővítés (új URL-ek)
8. `[category]/[slug].astro` változatlan (a tool URL-ek nem ütköznek a 3-szegmensű URL-ekkel)

**Ellenőrzés:** HU build = 0 új oldal generálódik. RO build = 6 új sub-hub URL (még üres tartalommal, vagy csak a konverter-grid-del).

### Fázis 1 — Sub-hub-ok (1-2 nap)
9. 6 sub-hub teljes RO content (intro, FAQ, kulcsszavak) a `conversii-hubs.ts`-ben
10. `/conversii/` fő hub bővítés: új „Categorii" szekció a 6 sub-hub kártyával
11. Belső linkek: minden meglévő konverter-tool `i18n/ro-tools-conversii.ts`-ben kiegészül a megfelelő sub-hub linkkel (a tool oldalakon megjelenő related/breadcrumb)
12. Schema.org validálás (Rich Results Test, Schema.org Validator)
13. Audit script: `node scripts/audit-schemas.mjs`

**Deploy ellenőrzés:** 6 új URL Search Console-ban submit, indexelés mérése.

### Fázis 2 — Instant-answer pilot (1 nap)
14. **Pilot 1:** `lungime` sub-hub — 8-10 instant-answer page a `mathSEO_reference` legjobban indexelt oldalai alapján (170-180 cm sorozat + 27/32 inch)
15. Markdown sablon véglegesítés
16. Schema audit pilot oldalakon
17. Belső link sűrűség ellenőrzés
18. Deploy + 1 hét mérés

### Fázis 3 — Skálázás (3-5 nap)
19. **Lungime full** (~15 oldal) — a maradék (km, picioare/inch szériák)
20. **Suprafata full** (~10) — hectare/ari/m² (RO ingatlan kulcsszavak)
21. **Volum full** (~12)
22. **Masa full** (~10)
23. **Temperatura full** (~12)
24. **Densitate full** (~14) — beton/nisip/pietris/balast szériák
25. llms.txt + sitemap frissítés
26. Search Console resubmit

---

## 7. Technikai részletek (implementáció szempontjából)

### 7.1 `[subcat]/index.astro` getStaticPaths
Csak a `conversii` kategória sub-hub-jai generálódnak (6 oldal). Más kategóriák (`calculator`, `geometrie`, …) nem hoznak létre statikus path-et erről a route-ról — a `[slug].astro` továbbra is működik a tool-okra.

```ts
export function getStaticPaths() {
  if (CURRENT_LANG !== "ro") return [];
  return CONVERSII_HUBS.map(hub => ({
    params: { category: "conversii", subcat: hub.slug },
    props: { hub },
  }));
}
```

### 7.2 `[subcat]/[slug].astro` getStaticPaths
Beolvassa a `math` content collection összes `subcategory != null && instantSlug != null` entry-jét.

```ts
export async function getStaticPaths() {
  if (CURRENT_LANG !== "ro") return [];
  const all = await getCollection("math");
  return all
    .filter(e => e.data.subcategory && e.data.instantSlug)
    .map(e => ({
      params: { category: "conversii", subcat: e.data.subcategory!, slug: e.data.instantSlug! },
      props: { entry: e },
    }));
}
```

### 7.3 Sub-hub kártyák a `/conversii/` (fő hub) oldalon
A meglévő `CategoryLayout.astro` jelenleg csak tool-list-et rajzol. Két opció:
- **A)** Új extra szekció direkt `CategoryLayout.astro`-ba (ha `category.id === "conversii"`, render hubs above tools)
- **B)** Új komponens `<ConversionHubsSection>` → csak akkor render, ha `category.id === "conversii"`

**Javaslat: B** — kevésbé invazív, könnyen újrahasznosítható, ha más kategóriák is sub-hub-okat kapnak később.

### 7.4 OG kép pipeline
- Sub-hub OG kép: új ikon (📏, ⚖️, …) + cím + InstrumenteOnline branding. Generátor: `src/pages/og/[category]/[subcat].png.ts` (új route).
- Instant-answer OG: cím = a teljes válasz („170 cm = 1,70 m") + kis számblock. Új route `src/pages/og/[category]/[subcat]/[slug].png.ts`.
- **Optimalizálás:** ha túl sok oldal (~80+), az OG-pipeline-t lehet később batch-elni — első körben elég a default kategória OG-vel.

### 7.5 Schema audit script
A meglévő `scripts/audit-schemas.mjs` valószínűleg már fut tool oldalakra. Bővíteni kell, hogy a sub-hub és instant-answer URL-eket is végigjárja, és ellenőrizze:
- 0× duplikált `@type`
- 1× `BreadcrumbList`
- Sub-hub: `CollectionPage` + `ItemList` + `FAQPage`
- Instant-answer: `Article` + `FAQPage`
- **Tilos:** `SoftwareApplication` instant-answer-en (mert nincs UI)

---

## 8. Kockázatok és mitigáció

| Kockázat | Mitigáció |
|---|---|
| **Thin content** (instant-answer < 300 szó) → algoritmikus de-rank | Minimum 350-400 szó/oldal: hero answer + KaTeX képlet + 3-4 use case + tabela ±2-3 érték körül + 3 FAQ |
| **Cannibalization** sub-hub vs. konverter | Eltérő keresési intent: sub-hub = browse, konverter = interaktív, instant = exact match. Cím + h1 + meta description **kulcsszó-szótárak elkülönítve** |
| **Spam-perception** (sok hasonló oldal generálva) | Minden oldal **egyedi** táblázattal (a kérdéses érték körüli ±2-3), egyedi RO-specifikus use case-ekkel, egyedi FAQ-val. Nincs „mass-produced" template. |
| **404 risk** ha valaki más URL-pattern-t vár | Sub-hub szlugek a fő hub-ból elérhetőek, instant-answer szlugek a sub-hub-ból elérhetőek. Sitemap teljes. |
| **Schema duplikáció** Article + SoftwareApplication | Instant-answer-en **csak** Article (mert nincs kalkulátor); sub-hub-on **csak** CollectionPage. Audit script kötelezi. |
| **KaTeX bundle** | Az instant-answer oldalakon csak SSR-renderelt KaTeX HTML. Nincs JS bundle, csak CSS — már be van állítva math kategóriákra. |
| **Sitemap-túl nagy** | 80 új URL-lel a sitemap még bőven a 50.000 limit alatt. Single sitemap.xml elegendő. |
| **Build time** | 80 markdown oldal × 200 ms = ~16 sec extra build. Elhanyagolható. |

---

## 9. Mit NEM csinálunk (most)

- ❌ HU oldalra portolás — `mathSEO_reference` HU oldal saját Deno Fresh app, ezt nem érintjük
- ❌ Konverter URL-ek mozgatása sub-hub alá — törne a Search Console history-t
- ❌ Calculator/Geometrie/Finante kategóriáknak sub-hub bevezetése (most csak `conversii`)
- ❌ Külön footer link a sub-hub-okra (a fő hub linkeli őket, ez elég)
- ❌ Új Svelte komponens (instant-answer = pure markdown + layout)
- ❌ Magyar mértékegységek (hold, négyszögöl) — RO-piacon nincs jelentésük

---

## 10. Sikermutatók (KPI)

- **Indexelés:** mind a 80+ új URL Google Search Console-ban indexelt 2 héten belül
- **Forgalom:** a `/conversii/*` cluster organikus forgalma +50% 60 nap alatt (baseline: jelenlegi konverter-tool forgalom)
- **CTR:** instant-answer oldalak átl. CTR > 8% (long-tail kifejezetten kérdő-szándékú keresésre)
- **AI citability:** a top 10 instant-answer URL idézhető Perplexity / ChatGPT keresésen RO-ul (manuális teszt 30 nap után)
- **Schema-validitás:** 100% — Rich Results Test 0 hiba minden új URL-en
- **Core Web Vitals:** LCP < 1.5s, INP < 200ms minden új oldalon (SSR-only, nincs JS island)

---

## Mellékletek

- A — Mintaadatok az első instant-answer-hez: lásd 3.3 frontmatter
- B — Konverter-tool ↔ sub-hub mapping (5.):
  ```
  cm-metri          → lungime
  km-metri          → lungime
  cm-inch           → lungime
  inch-cm           → lungime
  picioare-cm       → lungime
  kg-grame          → masa
  kg-livre          → masa
  tone-kg           → masa
  litri-mililitri   → volum
  litri-decilitri   → volum
  litri-metri-cubi  → volum
  galon-litri       → volum
  hectare-metri-patrati → suprafata
  ari-metri-patrati     → suprafata
  celsius-fahrenheit → temperatura
  beton-greutate-volum   → densitate
  nisip-greutate-volum   → densitate
  pietris-greutate-volum → densitate
  balast-greutate-volum  → densitate
  densitate-kg-m3-g-cm3  → densitate
  ```
