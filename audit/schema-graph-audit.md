# Schema @graph audit — instrumenteonline.ro + konvertalo.hu

**Fázis:** 1 (read-only audit) · **Ág:** `feat/schema-unified-graph` · **Dátum:** 2026-06-02
**Cél:** a jelenlegi, blokkonként külön emittált JSON-LD felmérése a matekmegoldasok.hu
@graph referencia-implementációjához képest. **Ez a kör NEM módosít kódot.**

**Jóváhagyott döntések (Fázis 2 inputja):**
- `PERSON_ID = https://jmeszaros.dev/#person` (NEM a spec-default `matekmegoldasok.hu/#founder`)
- Brand-nevek a configból: RO = `InstrumenteOnline`, HU = `Konvertalo.hu`

---

## Vezetői összefoglaló

A repó **nem többcsomagos monorepo**, hanem **egyetlen Astro kódbázis**, amit env-var
parametrizál két site-ra (`build:ro` → instrumenteonline.ro, `build:hu` → konvertalo.hu).
Minden site-konfig egy helyen van: [`src/i18n/index.ts`](../src/i18n/index.ts) `CURRENT_CONFIG`.
A JSON-LD egyetlen helyen, [`src/lib/seo.ts`](../src/lib/seo.ts)-ben generálódik, és a
[`BaseLayout.astro`](../src/layouts/BaseLayout.astro:162) **stringek tömbjét** rendereli ki
**N db külön `<script type="application/ld+json">` blokként**. Ez a tény a feladatot a
spec-nél **egyszerűbbé** teszi: egy SSOT-fájl (`seo.ts`) átírása mindkét site-ot lefedi.

A jelenlegi állapot **funkcionálisan sok jó jelet hordoz** (SoftwareApplication+WebApplication
dupla típus, Offer/AggregateRating, TechArticle speakable, FAQ, Breadcrumb, Event, hreflang,
robots AI-bot allow), **de gráf-szempontból töredezett**: nincs sehol `@graph`, nincs egyetlen
`WebPage` node sem, a lánc `BreadcrumbList → WebPage → WebSite → Organization` **nem létezik**,
és **több oldaltípuson lógó `@id`-referenciák vannak már most is**. A refaktor tehát nem
kockázat, hanem **meglévő hibák javítása** — a SEO/GEO jelek csak erősödhetnek.

### Gráf-szerűségi pontszám: **2 / 10**

| Szempont | Pont | Indok |
|---|---|---|
| `@graph` használat | 0/2 | Sehol nincs; minden node külön blokk, külön `@context` |
| Node-kapcsoltság (@id-ref feloldható) | 0/2 | **Lógó refek** tool- és conversii-hub oldalon (lásd P0-1/P0-2) |
| Org/WebSite/WebPage lánc | 0/2 | `WebPage` node **egyáltalán nincs**; WebSite-nak nincs `@id` a főoldalon |
| Entitás-id stabilitás | 1/2 | Org/Person `@id` létezik, de **per-site**, nem hálózati; WebSite `@id` hiányzik |
| Típus-helyesség (calculator stb.) | 1/2 | SoftwareApplication+WebApplication jó; de nincs top-level `#calculator` mainEntity-kötés, és Org-as-author keveredik Person-nel |

---

## 0. Hozzáférhetőség (robots + élő AI-bot edge-teszt)

**robots.txt** ([dinamikus](../src/pages/robots.txt.ts)): AI-botok explicit `Allow: /` —
GPTBot, ChatGPT-User, Google-Extended, ClaudeBot, PerplexityBot, Applebot-Extended,
cohere-ai, OAI-SearchBot. Tiltva: CCBot, AhrefsBot, SemrushBot. Sitemap per-domain. **OK.**

**Élő edge-teszt (2026-06-02, mindkét domain, 3 UA):**

| Domain | UA | HTTP | CF-challenge | ld+json |
|---|---|---|---|---|
| instrumenteonline.ro | GPTBot / ClaudeBot / PerplexityBot | **200** | **0** | jelen |
| konvertalo.hu | GPTBot / ClaudeBot / PerplexityBot | **200** | **0** | jelen |

→ **Nincs Cloudflare-blokk, valódi HTML megy ki a botoknak.** Hozzáférhetőség: **zöld.**
Megjegyzés: élesben még `0 db id="graph"` (várt — a refaktor előtt vagyunk).

---

## 1. Inventár — oldaltípus → jelen lévő schema → hiány

Mindkét site ugyanazt a kódot futtatja; az eltérés csak nyelv/brand/URL. A táblázat tehát
**mindkét site-ra érvényes** (a RO-only math kategóriák csak RO-n jelennek meg tartalom híján).

| Oldaltípus / route | Forrás | Jelenlegi blokkok (külön `@context`) | Hiány a @graph-célhoz |
|---|---|---|---|
| Főoldal `/` | [`index.astro:129`](../src/pages/index.astro:129) | WebSite, Organization, **Person(founder)**, ItemList(tools), FAQ | nincs `@graph`; **WebSite-nak nincs `@id`**; nincs WebPage; nincs testvér-brand node |
| Tool oldal `/{cat}/{slug}/` (non-math) | [`ToolLayout.astro:107`](../src/layouts/ToolLayout.astro:107) | Breadcrumb, SoftwareApplication, FAQ, TechArticle, (UseCase ItemList), (Event) | **lógó `#founder`+`#organization` ref** (P0-1); nincs WebPage/WebSite/Org/Person node; nincs `@graph` |
| Tool oldal (math longform) | ToolLayout + md-frontmatter | Breadcrumb + **md: articleSchema, softwareSchema, faqPageSchema** | md-blokkok saját `@context`-tel; Org-as-author; nincs WebPage/Person/WebSite node; nincs `@graph` |
| Kategória `/{cat}/` | [`CategoryLayout.astro:36`](../src/layouts/CategoryLayout.astro:36) | Breadcrumb, ItemList(tools) | nincs WebPage/WebSite/Org node; lánc hiányzik; nincs `@graph` |
| Conversii al-hub `/conversii/{subcat}/` | [`ConversionHubLayout.astro:36`](../src/layouts/ConversionHubLayout.astro:36) | Breadcrumb, **CollectionPage+ItemList**, FAQ | **lógó `#website`+`#organization` ref** (P0-2); nincs Org/WebSite node; nincs `@graph` |
| Instant-answer `/conversii/{subcat}/{slug}/` | [`[subcat]/[slug].astro:60`](../src/pages/[category]/[subcat]/[slug].astro:60) | Breadcrumb + **md: articleSchema, faqPageSchema** (+softwareSchema ha van) | md `@context`; nincs WebPage/Org/Person/WebSite node; nincs `@graph` |
| Rólunk/About | [`RolunkPage.astro:62`](../src/components/static-pages/RolunkPage.astro:62) | Breadcrumb, FAQ | **nincs Person/Org node** egy „rólunk" oldalon (!); nincs WebPage; nincs testvér-brand |
| Kapcsolat | [`KapcsolatPage.astro:11`](../src/components/static-pages/KapcsolatPage.astro:11) | Breadcrumb | nincs Org/ContactPoint/WebPage node |
| ÁSZF / Adatvédelmi | Aszf/Adatvedelmi Page | Breadcrumb | nincs WebPage/Org node |
| 404 | [`404.astro`](../src/pages/404.astro) | — (ellenőrzendő) | nincs strukturált adat |

**Frontmatter-schema terjedelem** (render-időben normalizálandó, NEM tömeg-szerkesztve):
`articleSchema` = **158** md, `faqPageSchema` = **158** md, `softwareSchema` = **75** md,
beágyazott `@context` = **158** md.

---

## 2. Entitás-konzisztencia

- **Organization `@id`**: `${SITE_URL}/#organization` — stabil, per-site. ✅ (de a node csak
  a főoldalon emittálódik; máshol csak *hivatkozzák* → lógó ref).
- **WebSite `@id`**: **HIÁNYZIK** a főoldali [`websiteSchema()`](../src/lib/seo.ts:280)-ből —
  a node-nak **nincs `@id`-je**, miközben a [`subcatCollectionSchema`](../src/lib/seo.ts:449)
  `${SITE_URL}/#website`-re hivatkozik. → id-ütközés/lógó ref (P0-2).
- **Person `@id`**: jelenleg `${SITE_URL}/#founder` (per-site), és **csak a főoldalon** van
  Person-node. A tool-oldali TechArticle author-ja `${SITE_URL}/#founder`-re mutat, de ott
  nincs Person-node → lógó ref (P0-1). **Cél:** egységes `PERSON_ID = jmeszaros.dev/#person`
  minden oldal Person-node-jában, + `sameAs` a profilokra (a hálózati konszolidáció így
  `@id` + `sameAs` páron áll; a `sameAs` már most tartalmazza jmeszaros.dev/GitHub/LinkedIn).
- **Szerző-típus keveredés**: a md-frontmatter `author` = **Organization** (`#organization`),
  míg a [`techArticleSchema`](../src/lib/seo.ts:242) `author` = **Person** (`#founder`).
  → render-időben egységesíteni kell (spec: `author → {@id: PERSON_ID}`). Ez **átszervezés,
  nem jel-törlés**, de jelölendő döntés (Org→Person szerző).
- **Hálózati testvér-linkelés**: jelenleg **nincs** — sem a matekmegoldasok, sem a másik
  brand Org/WebSite node-ja nem jelenik meg a főoldal/about graph-jában.

**Pozitív:** Person.sameAs és Organization.sameAs **egyezik** mindkét node-ban
([`seo.ts:330`](../src/lib/seo.ts:330), [`seo.ts:351`](../src/lib/seo.ts:351)) — nincs
ütköző entitásdefiníció név/logó szinten.

---

## 3. Gráf-szerkezet

- **`@graph` sehol.** Minden node önálló blokk, saját `@context`-tel → a keresők külön,
  kapcsolat nélküli entitásokként látják.
- **Lánc hiányzik:** `BreadcrumbList → WebPage → WebSite → Organization` **egyetlen oldalon
  sincs összekötve**, mert **`WebPage` node sehol nem keletkezik**. A Breadcrumb és az
  ItemList „lebeg".
- **Kalkulátor-típus:** [`toolSoftwareSchema`](../src/lib/seo.ts:93) helyesen
  `["SoftwareApplication","WebApplication"]`, Offer (`price:0`, per-site currency),
  AggregateRating, featureList, screenshot/image. **Jó alap**, de nincs top-level
  `#calculator` `@id`, és sem a WebPage `mainEntity`, sem az Article nem hivatkozik rá.
- **Lógó cross-page ref kockázat (P0):** a `#website`/`#organization`/`#founder` refek
  olyan oldalakon szerepelnek, ahol a cél-node nem emittálódik.

---

## 4. Nyelv (inLanguage vs hreflang/lang)

- `inLanguage` mindenhol `CURRENT_CONFIG.lang` (RO=`ro`, HU=`hu`) — **egyezik** a HTML
  `lang`-gal és az OG locale-lal. ✅
- **hreflang hu↔ro** a [`BaseLayout.astro:102-104`](../src/layouts/BaseLayout.astro:102)
  `<link rel="alternate">`-ben él, **a JSON-LD-n KÍVÜL**. A két site (konvertalo.hu ↔
  instrumenteonline.ro) **1:1 eszköz-fordítások**, ezért ez a hreflang **helyes és
  megőrzendő**. A spec „nincs per-URL hreflang a brandek között" szabálya **csak a
  matekmegoldasok-ra** vonatkozik, erre a két site-ra nem. **A @graph-refaktor ezt nem
  érinti** (külön réteg) — regresszió-kockázat: nincs, de a Fázis 4 harness ellenőrizze,
  hogy a hreflang-link tagek megmaradnak.

---

## 5. Validálás (parse + kötelező/ajánlott property-k)

- Minden jelenlegi generátor `JSON.stringify`-ot ad vissza → **parse-olható**. A
  frontmatter-schema YAML→objektum, szintén stringify-olható.
- **Ajánlott property-hiányok a célhoz:** WebPage node nincs (`isPartOf`/`breadcrumb`/
  `primaryImageOfPage`/`inLanguage`); WebSite `@id` + `publisher` a főoldalon hiányos;
  Organization-nak nincs `logo` ImageObject (csak string URL — a referencia ImageObject-et
  használ width/height-tel).
- **Megőrzendő, EL NEM EJTHETŐ jelek (spec §2):** SoftwareApplication offers/aggregateRating,
  TechArticle speakable/about, FAQ mainEntity, BreadcrumbList, Event, HowTo (ha aktiválva),
  UseCase ItemList, canonical/robots/hreflang/OG/Twitter. Mind a graph node-okba kerül át.

---

## Hibalista (route-tal)

### P0 — lógó `@id`-refek (már most élő hibák)
- **P0-1** — *minden non-math tool oldal*: TechArticle `author{@id:…/#founder}` +
  `publisher{@id:…/#organization}`, de a Person/Organization node **nem emittálódik** az
  oldalon. Route: `/{cat}/{slug}/`. Forrás: [`seo.ts:242`](../src/lib/seo.ts:242).
- **P0-2** — *minden conversii al-hub*: CollectionPage `isPartOf{@id:…/#website}` +
  `publisher{@id:…/#organization}`, egyik node sincs az oldalon. Route:
  `/conversii/{subcat}/`. Forrás: [`seo.ts:449`](../src/lib/seo.ts:449).
- **P0-3** — *főoldal*: WebSite node `@id` nélkül → nem hivatkozható, az Org sem kötődik
  hozzá. Forrás: [`seo.ts:280`](../src/lib/seo.ts:280).

### P1 — hiányzó gráf-gerinc
- **P1-1** — `WebPage` node egyetlen oldaltípuson sincs → nincs `Breadcrumb→WebPage→
  WebSite→Organization` lánc. (összes route)
- **P1-2** — Person `@id` per-site és csak a főoldalon; cél: `PERSON_ID` minden oldalon.
- **P1-3** — testvér-brand linkelés hiányzik a főoldal/about graph-ból.
- **P1-4** — md-frontmatter `author` = Organization, a generált TechArticle = Person →
  egységesítendő render-időben.

### P2 — finomítás
- **P2-1** — Organization.logo string, nem ImageObject (referencia: ImageObject w/h).
- **P2-2** — kalkulátor nincs top-level `#calculator` node-ként a WebPage `mainEntity`-jében.
- **P2-3** — `aggregateRating` **determinisztikusan fabrikált** minden tool-ra
  ([`seo.ts:75`](../src/lib/seo.ts:75)); a spec tiltja eszközre a rating-gyártást.
  **Meglévő jel — NEM némán törlöm**; tulajdonosi döntés kell (megtartás vs. eltávolítás).
  Fázis 2-ben külön kérdésként visszahozom.
- **P2-4** — 404 és statikus jogi oldalak: nincs WebPage/Org node (alacsony prioritás).

---

## Megosztott-helper terv (vázlat — részletek Fázis 2-ben)

Nincs új csomag; **`src/lib/seo.ts` lesz az SSOT**, `CURRENT_CONFIG`-gal parametrizálva.
Új node-builderek (a matekmegoldasok `utils/schema.ts` mintára, de gazdagabb per-oldal):

```
orgNode({full})            personNode()  // PERSON_ID=jmeszaros.dev/#person
websiteNode()              webPageNode({url,name,description,type,inLanguage,image,primaryId,hasBreadcrumb})
breadcrumbNode(url,items)  faqNode(url,items)
calculatorNode(tool)       articleNode(...)   itemListNode(...)
siblingSiteNodes()         buildGraph({url,page,primary,breadcrumb,faq,extraNodes,orgFull,includeSiblings})
serializeGraph(graph)      // JSON.stringify + `<` → < XSS-guard
```

Elv: **minden oldal graph-ja tartalmazza legalább Organization/WebSite/Person/WebPage
node-okat** → minden `@id`-ref oldalon belül feloldható (0 lógó ref). Per-oldal id-k:
`${pageUrl}#webpage|#breadcrumb|#faq|#article|#calculator|#itemlist`.

---

## 3 konkrét diff-javaslat (Fázis 3 előhang)

**Diff A — WebSite kap `@id`-t + `publisher` kötést** ([`seo.ts:280`](../src/lib/seo.ts:280)):
```diff
  "@type": "WebSite",
+ "@id": `${SITE_URL}/#website`,
  name: SITE_NAME, url: SITE_URL, ...
+ publisher: { "@id": `${SITE_URL}/#organization` },
```
→ azonnal megszünteti a P0-2/P0-3 lógó `#website` refet.

**Diff B — `buildGraph()` + `serializeGraph()` bevezetése**, a `BaseLayout` `schemaScripts`
tömb helyett **egyetlen** `<script type="application/ld+json" id="graph">`. A layoutok a
külön builder-hívások helyett `buildGraph({...})`-ot adnak át. A korábbi blokkok **mezői
megmaradnak**, csak egy `@graph`-ba költöznek, és minden node `#fragment` `@id`-t kap.

**Diff C — render-idejű frontmatter-normalizálás** (NEM md-szerkesztés): a math/instant
oldalon a `articleSchema`/`softwareSchema`/`faqPageSchema` objektumokról `@context` törlése,
`author/publisher → {@id: PERSON_ID/ORG_ID}`, `#article`/`#calculator`/`#faq` `@id`
hozzáadása, majd a graph node-jaiba fűzés. A WebPage `mainEntity → {@id:#calculator}` és az
Article `isPartOf → {@id:#webpage}` kötés.

---

## Verifikációs harness — szükséges igazítás

A spec dangling-ref harness-e hardcode-olja a Person `@id`-t a `matekmegoldasok.hu/#founder`
értékre. A jóváhagyott döntés miatt **ezt `https://jmeszaros.dev/#person`-re kell állítani**:
```js
ok(person && person['@id']==='https://jmeszaros.dev/#person','Person @id=PERSON_ID');
```
Tesztelendő útvonalak site-onként (1-1 oldaltípus): `/`, egy tool, egy math-longform tool,
egy kategória, egy `/conversii/{subcat}/`, egy instant-answer, `/rolunk/` (vagy RO megfelelő),
`/kapcsolat/`.

---

## Konklúzió

A feladat **megvalósítható**, és a kódbázis a spec-nél kedvezőbb (egy SSOT-fájl). A refaktor
**meglévő lógó-ref hibákat (P0-1..3) javít**, a hiányzó gráf-gerincet (P1) bevezeti, és
**egyetlen korábbi tartalmi jelet sem ejt el** — a SEO/GEO jelek nettó erősödnek.
**Következő lépés: Fázis 2 implementációs terv** (a P2-3 rating-kérdéssel és a node-builder
részletekkel). Kód addig nem módosul.
