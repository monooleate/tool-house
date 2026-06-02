# Schema @graph — implementációs terv (Fázis 2)

**Ág:** `feat/schema-unified-graph` · **Dátum:** 2026-06-02 · **Előzmény:** [`schema-graph-audit.md`](schema-graph-audit.md)
**Állapot:** terv — **kód nem módosul a jóváhagyásig.**

## Jóváhagyott döntések
- **`PERSON_ID = https://jmeszaros.dev/#person`** (hálózati, NEM per-site, NEM a spec-default).
- **Brand-nevek a configból:** RO = `InstrumenteOnline`, HU = `Konvertalo.hu` (`CURRENT_CONFIG.siteName`).
- **`aggregateRating` MARAD** az eszköz-node-okban (tulajdonosi döntés, 2026-06-02). Felülírja a
  spec „ne fabrikálj rating-et" szabályát; **policy-kockázat jegyzőkönyvezve** (Google
  structured-data: kitalált értékelés). A builder megtartja a [`toolRating`](../src/lib/seo.ts:75)
  determinisztikus logikát. `review` node-ot továbbra **sem** gyártunk.

---

## 1. Architektúra — SSOT a `src/lib/seo.ts`-ben

Nincs új csomag. A `seo.ts` az egyetlen igazságforrás, `CURRENT_CONFIG`-gal parametrizálva,
így **egy fájl mindkét site-ot lefedi**. A jelenlegi `*Schema(): string` függvények helyett
**node-builderek** (objektumot adnak vissza, NEM stringet), és egy `buildGraph()` állítja össze
őket egyetlen `@graph`-ba. A `serializeGraph()` ad végül stringet.

### 1.1 Konstans `@id`-séma

```ts
export const PERSON_ID  = "https://jmeszaros.dev/#person";   // hálózati, fix
export const ORG_ID     = `${SITE_URL}/#organization`;        // per-site
export const WEBSITE_ID = `${SITE_URL}/#website`;             // per-site
// per-oldal (pageUrl = abszolút canonical, trailing slash-sel):
//   `${pageUrl}#webpage` `${pageUrl}#breadcrumb` `${pageUrl}#faq`
//   `${pageUrl}#article` `${pageUrl}#calculator` `${pageUrl}#itemlist`
```

**Elv (a 0 lógó ref garanciája):** minden oldal graph-ja **mindig** tartalmazza az
`Organization`, `WebSite`, `Person`, `WebPage` node-okat → minden `@id`-ref oldalon belül
feloldható. Per-oldal node-ok (`#calculator/#article/#faq/#breadcrumb/#itemlist`) csak ott,
ahol releváns.

### 1.2 Hálózati testvér-registry

```ts
interface Brand { url: string; name: string; lang: "hu" | "ro"; }
export const NETWORK: Brand[] = [
  { url: "https://matekmegoldasok.hu",   name: "MatekMegoldások", lang: "hu" },
  { url: "https://instrumenteonline.ro", name: "InstrumenteOnline", lang: "ro" },
  { url: "https://konvertalo.hu",        name: "Konvertalo.hu",   lang: "hu" },
];
```

**Testvér-modell:** a referencia (`matekmegoldasok/utils/schema.ts`) `org.hasPart`-ot használ,
de **mi a spec által leírt önálló node-modellt választjuk**: a főoldal/about graph-ja a TÖBBI
brand `Organization` + `WebSite` node-ját is tartalmazza, mindegyik `founder → {@id: PERSON_ID}`
kötéssel. Ez tisztább entitás-linkelés (nem `sameAs`, mert külön brandek; nem hreflang).
*Divergencia-jegyzet:* eltér a referencia `hasPart`-jától — ezt szándékosan, a spec
testvér-linkelési modellje miatt.

### 1.3 Node-builderek (a `string`-builderek leváltása)

| Builder | Visszaad | Lényeg / mező-örökség |
|---|---|---|
| `personNode()` | Person | `@id:PERSON_ID`, „Mészáros János", `url:jmeszaros.dev`, `jobTitle`, `knowsAbout`, `sameAs`. **Site-invariáns** (nincs per-site `worksFor`, hogy ugyanaz az `@id` ne kapjon ütköző definíciót két domainen). A founder-kötés az Org-oldalon él. |
| `orgNode({full})` | Organization | `@id:ORG_ID`, `name:SITE_NAME`, `url`, `description`, `foundingDate`, **`logo` → ImageObject w/h (P2-1 fix)**, `founder:{@id:PERSON_ID}`, `sameAs`. `full=true` (főoldal/about): + `contactPoint`. |
| `websiteNode()` | WebSite | `@id:WEBSITE_ID`, `url`, `name`, `description`, `inLanguage`, `publisher:{@id:ORG_ID}`, **`potentialAction` SearchAction megőrizve** ([seo.ts:287](../src/lib/seo.ts:287)). |
| `webPageNode({url,name,description,type,inLanguage,image,primaryId,hasBreadcrumb})` | WebPage / `type` altípus (CollectionPage, AboutPage, ContactPage, ItemPage) | `@id:${url}#webpage`, `url`, `name`, `description`, `inLanguage`, `isPartOf:{@id:WEBSITE_ID}`, `about:{@id:ORG_ID}`, `publisher:{@id:ORG_ID}`, `breadcrumb:{@id:#breadcrumb}` (ha `hasBreadcrumb`), `primaryImageOfPage` (ha `image`), `mainEntity:{@id:primaryId}` (ha `primaryId` — pl. `#calculator` vagy `#itemlist`). |
| `breadcrumbNode(url, items)` | BreadcrumbList | `@id:${url}#breadcrumb`. A [`breadcrumbSchema`](../src/lib/seo.ts:40) tartalma változatlan. |
| `faqNode(url, items)` | FAQPage | `@id:${url}#faq`. A [`faqSchema`](../src/lib/seo.ts:136) `mainEntity` változatlan. |
| `calculatorNode(tool, rawSlug)` | [SoftwareApplication, WebApplication] | `@id:${pageUrl}#calculator`. **Minden jelenlegi mező megmarad** (offers price:0 + per-site currency, **aggregateRating MARAD**, featureList, screenshot, image, dateModified/Published, applicationSubCategory map). + `isPartOf:{@id:#webpage}`, `publisher:{@id:ORG_ID}`. |
| `articleNode(...)` | TechArticle / Article | `@id:${pageUrl}#article`, `author:{@id:PERSON_ID}`, `publisher:{@id:ORG_ID}`, `mainEntityOfPage:{@id:#webpage}`, **speakable megőrizve**, `about:{@id:#calculator}` ha van kalkulátor. |
| `itemListNode(items, name, url)` | ItemList | `@id:${url}#itemlist`. Kategória/főoldal/al-hub listák. |
| `eventNode(opts)` | Event | A [`eventSchema`](../src/lib/seo.ts:154) tartalma változatlan, csak `@id:${pageUrl}#event` + a graph-ba kerül. |
| `howToNode(tool)` | HowTo | A [`howToSchema`](../src/lib/seo.ts:175) tartalma változatlan (ha aktív), `@id:${pageUrl}#howto`. |
| `useCaseNode(tool)` | ItemList | [`useCaseListSchema`](../src/lib/seo.ts:258) tartalma, `@id:${pageUrl}#usecases`. |
| `siblingSiteNodes()` | (Organization \| WebSite)[] | A NETWORK többi brandjének Org+WebSite node-ja, `founder:{@id:PERSON_ID}`. |
| `buildGraph({url, primary, breadcrumb, faq, page, extraNodes, orgFull, includeSiblings})` | `{@context, @graph}` | Összefűz: `[orgNode, websiteNode, personNode, webPageNode, breadcrumb?, primary?, faq?, ...extraNodes, ...siblings?]`. |
| `serializeGraph(graph)` | string | `JSON.stringify(graph).replaceAll("<", "\\u003c")` — XSS-guard. |
| `normalizeFrontmatterSchema(raw, {pageUrl})` | node \| node[] | md-frontmatter objektum → graph-node: **`@context` törlése**, `@id` = `${pageUrl}#article\|#calculator\|#faq`, `author/publisher → {@id: PERSON_ID/ORG_ID}`, `mainEntityOfPage:{@id:#webpage}`. **NEM szerkeszt md-fájlt.** |

> A régi `*Schema(): string` exportok **átmenetileg megmaradnak** (a fokozatos migráció
> miatt), és a cutover végén törlődnek. Lásd 4. szakasz.

---

## 2. Per-oldaltípus graph-összeállítás

Minden sor egyetlen `<script type="application/ld+json" id="graph">`-ot ad. **Alapnégyes
(Org, WebSite, Person, WebPage) mindenhol jelen.**

| Route | WebPage `type` | primary (`mainEntity`) | Extra node-ok | siblings |
|---|---|---|---|---|
| `/` (főoldal) | WebPage | `#itemlist` (tools) | Breadcrumb, FAQ, ItemList | **igen** |
| `/{cat}/{slug}/` non-math tool | ItemPage | `#calculator` | Breadcrumb, calculatorNode, articleNode(TechArticle), faqNode, useCase?, event?, howTo? | nem |
| `/{cat}/{slug}/` math longform | ItemPage | `#calculator` | Breadcrumb, **normalizeFrontmatterSchema → #article+#calculator+#faq** | nem |
| `/{cat}/` kategória | CollectionPage | `#itemlist` | Breadcrumb, ItemList | nem |
| `/conversii/{subcat}/` al-hub | CollectionPage | `#itemlist` | Breadcrumb, ItemList, faqNode | nem |
| `/conversii/{subcat}/{slug}/` instant | ItemPage | `#article` (vagy `#calculator` ha van software) | Breadcrumb, **normalizeFrontmatterSchema → #article+#faq(+#calculator)** | nem |
| `/rolunk/` (RO: about) | **AboutPage** | `#person` | Breadcrumb, FAQ, **orgFull**, personNode kiemelt | **igen** |
| `/kapcsolat/` | **ContactPage** | `#organization` | Breadcrumb, orgFull (+contactPoint) | nem |
| `/aszf/`, `/adatvedelmi/` | WebPage | — | Breadcrumb | nem |
| `404` | WebPage | — | (opcionális, P2) | nem |

**Lógó-ref megszüntetés leképezése:**
- P0-1 (tool author/publisher): a `#calculator`/`#article` author→PERSON_ID, publisher→ORG_ID,
  és **most már a Person+Org node is jelen** → feloldva.
- P0-2 (conversii `#website`/`#organization`): WebSite+Org node mostantól minden al-hubon → feloldva.
- P0-3 (WebSite `@id` hiány): `websiteNode()` mindig ad `@id:WEBSITE_ID`-t → feloldva.
- P1-1 (lánc): `Breadcrumb → WebPage(isPartOf) → WebSite(publisher) → Organization` minden oldalon.
- P1-4 (Org-as-author): `normalizeFrontmatterSchema` author-t Person-re (`PERSON_ID`) írja.

---

## 3. Render-réteg: `BaseLayout` cutover

Jelenleg: `schemaScripts: string[]` → N blokk ([BaseLayout:162](../src/layouts/BaseLayout.astro:162)).

**Új prop, visszafelé kompatibilis a migráció alatt:**
```astro
// Props: graph?: object  (buildGraph kimenete)  — ha megvan, EZ nyer
{graph
  ? <script type="application/ld+json" id="graph" set:html={serializeGraph(graph)} />
  : schemaScripts.map((s) => <script type="application/ld+json" set:html={s} />)}
```
A migráció során minden layout átáll `graph={buildGraph({...})}`-ra; amikor mind átállt, a
`schemaScripts` ág és a régi string-builderek **törlődnek** → végállapot: pontosan 1 `id="graph"`.

---

## 4. Cutover-sorrend (sorrend-kötött — route-migrációk ELŐBB)

1. **SSOT additív bevezetés** — node-builderek + `buildGraph`/`serializeGraph`/`normalizeFrontmatterSchema`
   a `seo.ts`-be. Régi exportok maradnak. *Viselkedés nem változik.* ✔ verifikáció: `astro check` 0 új hiba.
2. **`BaseLayout` `graph` prop** hozzáadása (kompatibilis ág). ✔ build zöld.
3. **Rólunk/About** → `buildGraph` (Person-egységesítés, orgFull, siblings). ✔ harness `/rolunk/`.
4. **Tool oldalak** (ToolLayout, non-math + math longform) → `buildGraph`. ✔ harness 2 tool-típus.
5. **Kategória + Conversii al-hub** → `buildGraph`. ✔ harness `/{cat}/`, `/conversii/{subcat}/`.
6. **Instant-answer** → `buildGraph` + `normalizeFrontmatterSchema`. ✔ harness instant route.
7. **Kapcsolat + ÁSZF + Adatvédelmi (+404)** → `buildGraph`. ✔ harness statikus.
8. **Főoldal** → `buildGraph` (siblings, orgFull). ✔ harness `/`.
9. **Legacy törlés** — `schemaScripts` ág + elárvult string-builderek kivezetése. ✔ teljes harness.
10. **Záró verifikáció** — mindkét site, minden route, 0 lógó ref, 0 legacy blokk, regresszió-check.

Minden lépés **önállóan tesztelhető** és külön commit (Fázis 5, csak ha kéred).

---

## 5. Verifikáció minden lépés után

**A) Statikus:** `npm run check` (astro check) + `npm run lint` (tsc) a módosított fájlokon → 0 ÚJ hiba.

**B) Élő dev-harness** — **mindkét site**, minden érintett route. Indítás:
`npm run dev` (HU, default) és `npm run dev:ro` (RO). **Astro dev port = 4321** (nem 5173!).
A spec Deno-harness-ét futtatjuk, **két igazítással**:
- `BASE = 'http://localhost:4321'`
- a Person-assert a jóváhagyott id-re:
  ```js
  ok(person && person['@id']==='https://jmeszaros.dev/#person','Person @id=PERSON_ID');
  ```
Assertek: pontosan **1 `id="graph"`**, **0 legacy ld+json**, parse OK, **0 lógó `@id`-ref**,
Person `@id=PERSON_ID`, Organization jelen, **testvér-Org-ok jelen** (`/` és about),
`inLanguage` = site nyelve, és **minden korábbi típus/mező megvan** (regresszió).

**Regresszió-mátrix (jel → új hely):**

| Korábbi jel | Új node-hely |
|---|---|
| BreadcrumbList | `#breadcrumb`, WebPage `breadcrumb`-ról hivatkozva |
| SoftwareApplication+WebApplication / offers / **aggregateRating** / featureList / screenshot | `#calculator` |
| TechArticle headline/about/**speakable**/keywords | `#article` |
| FAQPage mainEntity | `#faq` |
| Event / HowTo / UseCase ItemList | `#event` / `#howto` / `#usecases` |
| WebSite SearchAction | `websiteNode().potentialAction` |
| Organization sameAs/founder/logo | `#organization` (logo → ImageObject) |
| Person founder + sameAs | `#person` (`@id=PERSON_ID`) |
| md articleSchema/softwareSchema/faqPageSchema (158/75/158 fájl) | normalizálva `#article/#calculator/#faq` |
| **canonical / robots / hreflang hu↔ro / OG / Twitter** | **érintetlen** (BaseLayout külön rétege) |

**C) Éles AI-bot edge-teszt** (deploy után, mindkét domain): 200 + valódi HTML, 0 challenge
(Fázis 1-ben már zöld volt — regresszió-ellenőrzés).

**D) Google Rich Results Test + validator.schema.org** típusonként 1-1 oldalra (deploy után):
0 error a cél; warningok dokumentálva.

---

## 6. Érintett fájlok (várható)

| Fájl | Változás |
|---|---|
| [`src/lib/seo.ts`](../src/lib/seo.ts) | node-builderek, `buildGraph`, `serializeGraph`, `normalizeFrontmatterSchema`, NETWORK, konstansok; legacy exportok kivezetése a végén |
| [`src/layouts/BaseLayout.astro`](../src/layouts/BaseLayout.astro) | `graph` prop + 1 `id="graph"` blokk; `schemaScripts` ág kivezetése |
| `src/layouts/ToolLayout.astro` | `graph={buildGraph(...)}` |
| `src/layouts/CategoryLayout.astro` | `graph={buildGraph(...)}` |
| `src/layouts/ConversionHubLayout.astro` | `graph={buildGraph(...)}` |
| `src/layouts/InstantAnswerLayout.astro` | `graph={buildGraph(...)}` |
| `src/pages/index.astro` | `graph={buildGraph(... includeSiblings ...)}` |
| `src/pages/[category]/[subcat]/[slug].astro` | `normalizeFrontmatterSchema` használat |
| `src/components/static-pages/*.astro` (Rolunk, Kapcsolat, Aszf, Adatvedelmi) | `graph={buildGraph(...)}` |
| **md tartalom** | **NEM módosul** (render-idejű normalizálás) |

---

## 7. Kockázatok / nyitott pontok

- **Cross-domain testvér Org-node** (pl. instrumenteonline.ro graph-jában `konvertalo.hu/#organization`)
  — szándékos entitás-linkelés, valid; csak főoldal/about-on. Ha a Google „about another domain"
  warningot adna, csak warning (nem error) — dokumentáljuk.
- **`aggregateRating` policy-kockázat** — tudatos tulajdonosi döntés (lásd fent). Ha a Search
  Console manuális akciót/„best-practice" figyelmeztetést adna, újraértékelhető a feltételes irányra.
- **md frontmatter `inLanguage` hardcode** (`ro`) — egyezik a RO build-del; HU build math-tartalom
  nincs, így nem ütközik. Normalizáláskor a `CURRENT_CONFIG.lang`-ot tekintjük igazságnak.
- **Astro dev port 4321** — a harness BASE-t ehhez igazítjuk (a spec 5173-at feltételez).

---

## Sikerkritérium (a matekmegoldasok-szint)
Mindkét site minden oldala: **pontosan 1 egységes `@graph`**, **0 lógó `@id`-ref**, egységes
founder (`PERSON_ID`), `Org/WebSite/WebPage/Breadcrumb` lánc mindenhol; testvér-brandek
entitás-szinten linkelve közös founderrel; **0 elveszett SEO/GEO jel** (harness igazolja);
0 Rich Results error.

**Következő lépés a jóváhagyásod után: Fázis 3 (implementáció), lépésenként, minden lépés után verifikáció.**

---

## ✅ Fázis 3-4 végrehajtás (changelog, 2026-06-02)

**Mit:** Egységes `@graph` bevezetve mindkét site minden oldaltípusára. Eltérés a tervtől:
a `buildGraph` helyett **centralizált assembler** a `BaseLayout`-ban (`buildPageGraph`) — a
base Org/WebSite/Person/WebPage node-okat a layout adja, a callerek csak az oldal-specifikus
node-okat. Funkcionálisan azonos, kevesebb a hibafelület.

**Fájlok:**
- `src/lib/seo.ts` — SSOT: konstansok (PERSON_ID/ORG_ID/WEBSITE_ID), NETWORK, node-builderek
  (person/org/website/sibling/breadcrumb/faq/calculator/article/itemlist/usecase/event),
  `buildPageGraph`, `serializeGraph`, `normalizeFrontmatterSchema`. (Legacy string-builderek
  bent maradtak holt kódként — 0 emittált legacy blokk; törlésük opcionális follow-up.)
- `src/layouts/BaseLayout.astro` — `graphNodes`/`graphPrimaryId`/`graphPageType`/`orgFull`/
  `includeSiblings` propok; 1 db `<script id="graph">` (legacy `schemaScripts` fallback megmaradt 404-hez).
- Migrálva: `ToolLayout`, `CategoryLayout`, `ConversionHubLayout`, `InstantAnswerLayout`,
  `index.astro`, `[category]/[subcat]/[slug].astro` (mdSchema flow), `RolunkPage` (AboutPage),
  `KapcsolatPage` (ContactPage), `AszfPage`, `AdatvedelmiPage`.
- `scripts/verify-graph.mjs` — dist-szkenner (dangling + regresszió + sibling + Person-id).

**Validáció:**
- `npm run build:ro` → 309 oldal, 0 hiba. `npm run build:hu` → 137 oldal, 0 hiba.
- Scanner: **RO 2142 PASS / 0 FAIL**, **HU 938 PASS / 0 FAIL**. Minden graph-os oldalon:
  pontosan 1 `id="graph"`, 0 legacy blokk, 0 lógó `@id`-ref, Person `@id=jmeszaros.dev/#person`,
  Org+WebSite+WebPage lánc. Sibling Org-ok (mindhárom brand) a főoldalon ÉS az about-on.
- Regresszió spot-check: hreflang hu↔ro ÉRINTETLEN; calculator offers+aggregateRating(4.7) megvan;
  TechArticle speakable+author(PERSON_ID); frontmatter `@context` törölve, author Org→Person átírva.
- P0-1/P0-2/P0-3 (Fázis 1 lógó-ref hibák) **megszűntek**.

**Roadmap-eltérés:** (a) centralizált assembler a per-caller buildGraph helyett; (b) legacy
string-builder törlés elhalasztva (holt kód, 0 hatás). **Git:** `feat/schema-unified-graph`,
commitálatlan (commit/push csak kérésre).

**Next (opcionális):** legacy builderek törlése; 404/multumim/cautare oldalakra is graph;
éles deploy után Rich Results Test + AI-bot edge-teszt (Fázis 4/C-D).
