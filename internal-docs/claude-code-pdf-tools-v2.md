# Claude Code – PDF eszközök bővítése (Tool House architektúra)

> **Olvasd el először**: `src/lib/tool-registry.ts`, `src/lib/ui-labels.ts`,
> `src/components/tools/DynamicTool.svelte`, és egy meglévő PDF tool komponenst
> (pl. `src/components/tools/pdf/PdfMergeTool.svelte`) hogy megértsd a meglévő mintákat.

---

## Az architektúra, amit követni kell

Ez egy **Tool House** projekt: Astro 5 SSG + Svelte 5 islands, egyetlen kódbázisból
két domainre build-elve (`PUBLIC_SITE_LANG=hu` → konvertalo.hu, `=ro` → instrumenteonline.ro).

**Kritikus szabályok:**
- A `tool-registry.ts` a **Single Source of Truth** — ide kerül minden tool meta-adat
- Svelte komponensekben **soha ne használj `t()`-t** — csak `ui-labels.ts`-ből jövő `ui.*` értékeket
- A román fordítás **nem opcionális utólag** — az i18n fájlokkal együtt kell elkészíteni
- A `DynamicTool.svelte` `COMPONENT_IMPORTS` map-jébe **minden új tool** bejegyzést kap
- A HU slug a `rawTools`-ban van, a RO slug a `src/lib/i18n/ro-tools-pdf.ts`-ben

---

## Feladat 1 – PdfPreview shared komponens

**Fájl**: `src/components/tools/pdf/PdfPreview.svelte`

Ez egy **újrafelhasználható eredmény-megjelenítő** komponens, amelyet az összes
PDF tool (meglévők és újak) az eredmény szekciójában használ, a sima letöltős
`ConvertButton` helyett vagy mellett.

### Svelte 5 runes interfész

```typescript
// Props
let {
  pdfBytes,        // Uint8Array – feldolgozott PDF
  filename,        // string – letöltési fájlnév
  originalSize,    // number | undefined – eredeti méret byte-ban
  processedSize,   // number | undefined – feldolgozott méret byte-ban
  onReset,         // () => void – "Új fájl" gomb callbackje
}: {
  pdfBytes: Uint8Array;
  filename: string;
  originalSize?: number;
  processedSize?: number;
  onReset: () => void;
} = $props();
```

### UI elemek (sorban)

**1. Méret badge** — csak ha `originalSize` ÉS `processedSize` meg van adva:

```
⬇ 8.4 MB → 2.1 MB (75% csökkentés)   [HU]
⬇ 8.4 MB → 2.1 MB (75% reducere)     [RO]
```

Zöld hátterű, prominens badge — ez a tömörítő tool legfontosabb visszajelzése.
Ha a csökkentés < 5%, sárga badge: `"A fájl már optimalizált"` / `"Fișierul este deja optimizat"`.

**2. Thumbnail grid** — az első max. 4 oldal előnézete:

- `pdfjs-dist` `renderPage()` → `<canvas>` → 150×212px thumbnail-ek
- Oldalszám badge minden kép alatt (`1. oldal` / `Pagina 1`)
- Ha > 4 oldal: `"+ N további oldal"` / `"+ N pagini suplimentare"`
- Renderelés Web Worker-ben (ne blokkolja az UI-t)
- Betöltés közben: szürke skeleton placeholder

**3. Letöltés gomb** (tele szélességű, elsődleges CTA):

```
📥 PDF letöltése (2.1 MB)    [HU]
📥 Descarcă PDF (2.1 MB)     [RO]
```

Kattintásra: `URL.createObjectURL(new Blob([pdfBytes], { type: 'application/pdf' }))` + auto-click letöltés.

**4. Másodlagos akciók** (kisebb gombok egymás mellett):

```
← Új fájl feldolgozása    [HU]  → onReset() hívás
← Procesează alt fișier   [RO]
```

### i18n – ui-labels.ts kiegészítés

Add hozzá az alábbi kulcsokat a meglévő `labels` objektumhoz (`hu` és `ro` ágba egyaránt):

```typescript
// hu:
pdfPreviewTitle: "Előnézet",
pdfDownloadBtn: "PDF letöltése",
pdfResetBtn: "← Új fájl feldolgozása",
pdfSizeReduced: "csökkentés",
pdfAlreadyOptimized: "A fájl már optimalizált",
pdfPage: "oldal",
pdfMorePages: "további oldal",

// ro:
pdfPreviewTitle: "Previzualizare",
pdfDownloadBtn: "Descarcă PDF",
pdfResetBtn: "← Procesează alt fișier",
pdfSizeReduced: "reducere",
pdfAlreadyOptimized: "Fișierul este deja optimizat",
pdfPage: "pagina",
pdfMorePages: "pagini suplimentare",
```

### Integráció a meglévő PDF eszközökbe

Az alábbi meglévő Svelte tool komponensekben cseréld le az eredmény szekciót
(ahol most valószínűleg csak egy letöltős gomb van) `<PdfPreview>` hívásra:

- `PdfMergeTool.svelte`
- `PdfSplitTool.svelte` (ZIP letöltésnél nem kell – ott marad a ZIP gomb; de az egyes oldalak előnézetére igen)
- `PdfPageSelectTool.svelte`
- `PdfReorderTool.svelte`
- `PdfRotateTool.svelte`
- `PdfDeletePagesTool.svelte`
- `ImagesToPdfTool.svelte`

**Minta integráció** (Svelte 5 runes):

```svelte
{#if resultPdfBytes}
  <PdfPreview
    pdfBytes={resultPdfBytes}
    filename={outputFilename}
    onReset={() => { resultPdfBytes = null; files = []; }}
  />
{/if}
```

---

## Feladat 2 – 8 új PDF tool a tool-registry.ts-be

### A 8 lépéses checklist minden tool-nál

Az ARCHITECTURE.md 16. fejezetének ("Új Eszköz Hozzáadása") lépéseit kövesd:

1. `tool-registry.ts` – `rawTools` tömb bejegyzés (HU slug, title, h1, description, keywords, faq, component, inputFormats, related, stb.)
2. `src/components/tools/pdf/[NevTool].svelte` – Svelte 5 tool komponens
3. `src/components/tools/DynamicTool.svelte` – `COMPONENT_IMPORTS` map bejegyzés
4. `src/lib/timing-config.ts` – timing override (ha kell)
5. `src/lib/content/pdf-excel-other-content.ts` – HU SEO tartalom (introText, guide, faq, content)
6. `src/lib/i18n/ro-tools-pdf.ts` – RO slug + meta (title, h1, description, keywords)
7. `src/lib/content/ro/pdf-excel-other-content.ts` – RO SEO tartalom
8. Ellenőrzési lista lefuttatása (ARCHITECTURE.md 16. fejezet, 8. lépés)

---

### Tool 2.1 – PDF tömörítése

#### tool-registry.ts bejegyzés

```typescript
{
  slug: "tomoritese",
  category: "pdf",
  title: "PDF tömörítése online – ingyenes, böngészőben | Konvertalo.hu",
  h1: "PDF tömörítése",
  description: "Tömörítsd PDF fájljaidat ingyenesen böngészőben. Szerverfeltöltés nélkül, teljesen privát. Átlagosan 40-80%-os méretcsökkentés.",
  keywords: ["pdf tömörítése", "pdf méret csökkentése", "pdf kompresszió", "online pdf tömörítő"],
  status: "active",
  component: "PdfCompressTool",
  inputFormats: ["application/pdf"],
  acceptMultiple: false,
  related: ["osszeillesztes", "szetbontas", "pdf-keppe", "kepek-pdfbe"],
  faq: [
    { q: "Mennyire tömöríti a PDF-et?", a: "Az eredmény a PDF tartalmától függ. Képekben gazdag dokumentumoknál 40–80%-os méretcsökkentés is elérhető. Szöveges PDF-eknél kisebb a csökkentés, mivel a szöveg már tömörített." },
    { q: "Romlik a minőség tömörítés után?", a: "A 'Közepes' szint (alapértelmezett) alig észrevehető minőségromlással kb. 60%-ot tömörít. Az 'Erős' szint nagyobb tömörítést ér el, de a képek kicsit elveszíthetnek az élességükből." },
    { q: "Feltöltődik a fájlom valahova?", a: "Nem. A tömörítés teljes egészében a böngésződben fut. A fájl egyetlen bájtja sem hagyja el a gépedet." },
  ],
  launchedAt: "2026-03-01",
},
```

#### PdfCompressTool.svelte logika

```typescript
// Web Worker-ben futtatandó algoritmus:
// 1. PDFDocument.load(inputBytes) – pdf-lib
// 2. pdfjs-dist: minden oldalon getOperatorList() + minden XObject image kinyerése
// 3. Canvas API: createImageBitmap() → OffscreenCanvas.drawImage() → toBlob('image/jpeg', quality)
//    - 'light' / 'Könnyű':  quality = 0.85
//    - 'medium' / 'Közepes': quality = 0.72  (DEFAULT)
//    - 'high' / 'Erős':     quality = 0.50
// 4. pdf-lib: az új JPEG bytesot visszaírjuk az XObject-be
// 5. await pdfDoc.save({ useObjectStreams: true }) – ez önmagában is ~10-15%-ot tömörít
// 6. postMessage({ type: 'done', bytes: result, originalSize, processedSize })

// Ha a tömörítés nem csökkenti a méretet (pl. már tömörített képek):
// postMessage({ type: 'done', bytes: inputBytes, originalSize, processedSize: inputBytes.length })
```

#### UI elemek

- `Dropzone` (accept="application/pdf")
- Tömörítési szint: 3 opciós toggle gomb (nem slider):
  ```
  [ Könnyű ]  [ Közepes ✓ ]  [ Erős ]
  HU: Könnyű / Közepes / Erős
  RO: Ușoară / Medie / Puternică
  ```
- Progress bar a feldolgozás alatt (Worker `postMessage` progress %-ból)
- Eredménynél: `<PdfPreview pdfBytes={...} filename={...} originalSize={...} processedSize={...} onReset={...} />`

#### timing-config.ts

```typescript
"tomoritese": { delayBeforeConvert: 3000, delayBeforeDownload: 3000 },
```

#### ro-tools-pdf.ts bejegyzés

```typescript
"tomoritese": {
  slug: "comprimare-pdf",
  title: "Comprimare PDF online – gratuit, în browser | InstrumenteOnline",
  h1: "Comprimă PDF",
  description: "Comprimă fișierele PDF gratuit în browser. Fără încărcare pe server, complet privat. Reducere medie 40-80%.",
  keywords: ["comprimare pdf", "reducere dimensiune pdf", "compressor pdf online", "micșorare pdf"],
},
```

---

### Tool 2.2 – PDF vízjel

#### tool-registry.ts bejegyzés

```typescript
{
  slug: "vizjel",
  category: "pdf",
  title: "Vízjel hozzáadása PDF-hez – online, ingyenes | Konvertalo.hu",
  h1: "Vízjel hozzáadása PDF-hez",
  description: "Adj szöveges vízjelet PDF dokumentumaidhoz böngészőben. Átlós elhelyezés, átlátszóság és szín beállítható. Szerverfeltöltés nélkül.",
  keywords: ["pdf vízjel", "vízjel hozzáadása pdf-hez", "pdf watermark", "bizalmas pdf"],
  status: "active",
  component: "PdfWatermarkTool",
  inputFormats: ["application/pdf"],
  acceptMultiple: false,
  related: ["oldalszamok", "tomoritese", "jelszo-vedelem", "osszeillesztes"],
  faq: [
    { q: "Eltávolítható-e a vízjel később?", a: "A vízjel beégetődik a PDF-be, és nem távolítható el egyszerűen. Ha fontos dokumentumot védesz, ez az ideális." },
    { q: "Minden oldalra kerül a vízjel?", a: "Igen, alapértelmezetten minden oldalra rákerül. Ez nem változtatható, hogy a védelem teljes legyen." },
  ],
  launchedAt: "2026-03-01",
},
```

#### PdfWatermarkTool.svelte logika

```typescript
// pdf-lib logika (főszálon is elfogadható, egyszerű):
// const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
// for (const page of pdfDoc.getPages()) {
//   const { width, height } = page.getSize()
//   const textWidth = font.widthOfTextAtSize(watermarkText, fontSize)
//   page.drawText(watermarkText, {
//     x: placement === 'diagonal' ? (width - textWidth * Math.cos(Math.PI/4)) / 2 : getX(width, textWidth, placement),
//     y: placement === 'diagonal' ? height / 2 : getY(height, placement),
//     size: fontSize,
//     font,
//     color: rgb(...selectedColor),
//     opacity: opacity / 100,
//     rotate: placement === 'diagonal' ? degrees(45) : degrees(0),
//   })
// }
```

#### UI elemek

- `Dropzone`
- Vízjel szöveg input (default: `"BIZALMAS"` / `"CONFIDENȚIAL"`)
- Elhelyezés – 3 gombos toggle:
  ```
  [ Átlósan ✓ ]  [ Középen ]  [ Jobb alul ]
  RO: [ Diagonal ✓ ]  [ Centrat ]  [ Dreapta jos ]
  ```
- Átlátszóság slider: 10–80% (default: 30%, lépések: 5%)
- Betűméret slider: 20–120pt (default: 60pt)
- Szín választó – 6 preset chip (szürke✓, piros, kék, zöld, fekete, narancs)
- Live preview az 1. oldal kis előnézetén (opcionális, ha implementálható elegánsan)
- Eredménynél: `<PdfPreview>`

#### ro-tools-pdf.ts bejegyzés

```typescript
"vizjel": {
  slug: "watermark-pdf",
  title: "Adaugă watermark la PDF – online, gratuit | InstrumenteOnline",
  h1: "Adaugă watermark PDF",
  description: "Adaugă watermark textual documentelor PDF în browser. Poziție diagonală, opacitate și culoare configurabile. Fără server.",
  keywords: ["watermark pdf", "adaugă marcaj pdf", "pdf confidențial", "ștampilă pdf"],
},
```

---

### Tool 2.3 – Oldalszámok hozzáadása

#### tool-registry.ts bejegyzés

```typescript
{
  slug: "oldalszamok",
  category: "pdf",
  title: "Oldalszámok hozzáadása PDF-hez – online, ingyenes | Konvertalo.hu",
  h1: "Oldalszámok hozzáadása PDF-hez",
  description: "Adj oldalszámokat PDF dokumentumaidhoz böngészőben. Pozíció, formátum és kezdőszám szabadon beállítható. Ingyenes, privát.",
  keywords: ["pdf oldalszámozás", "oldalszám hozzáadása pdf-hez", "pdf számozás", "oldal sorszám pdf"],
  status: "active",
  component: "PdfPageNumbersTool",
  inputFormats: ["application/pdf"],
  acceptMultiple: false,
  related: ["vizjel", "tomoritese", "osszeillesztes", "oldalak-sorrendje"],
  faq: [
    { q: "Melyik oldaltól kezdjem a számozást?", a: "A kezdőszámot te állítod be. Ha pl. egy hosszabb dokumentum 3. fejezetétől számozol, megadhatod, hogy '1' helyett '45'-től induljon." },
    { q: "Mi az 'Oldal X / Y' formátum?", a: "Ez a 'folyó oldalszám / összes oldal' formátum, pl. '3 / 12'. Kényelmesebb, mert az olvasó látja, hány oldal van még hátra." },
  ],
  launchedAt: "2026-03-01",
},
```

#### PdfPageNumbersTool.svelte logika

```typescript
// pdf-lib logika:
// const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
// const pages = pdfDoc.getPages()
// pages.forEach((page, i) => {
//   const { width, height } = page.getSize()
//   const num = startNumber + i
//   const total = pages.length
//   const text = formatPageNumber(num, total, format)
//   // format: '1' | '1 / 12' | '– 1 –' | 'Oldal 1' | 'Pagina 1'
//   const textWidth = font.widthOfTextAtSize(text, fontSize)
//   const { x, y } = getPosition(position, width, height, textWidth, margin)
//   page.drawText(text, { x, y, size: fontSize, font, color: rgb(0,0,0) })
// })

// getPosition(position: '9-grid', ...): 9 pozíció:
//   tl | tc | tr
//   ml | mc | mr   (ezek középen oldalt – ritkán használt)
//   bl | bc | br   ← leggyakoribb: bl/bc/br
```

#### UI elemek

- `Dropzone`
- Pozíció választó: **3×3 vizuális grid** klikkelős cellákkal (nem dropdown!)
  - Alapértelmezett: középső-alsó (`bc`)
  - Minden cella egy kis ikon/ponttal jelzi a pozíciót
- Formátum: 4 opciós radio/toggle:
  ```
  [ 1 ]  [ 1 / 12 ]  [ – 1 – ]  [ Oldal 1 ]
  RO:                             [ Pagina 1 ]
  ```
- Kezdőszám: `<input type="number" min="1" value="1">`
- Betűméret: 8 / 9 / 10 / 11 / 12pt select (default: 10)
- Margó: 10 / 15 / 20 / 25px (default: 15)
- Eredménynél: `<PdfPreview>`

#### ro-tools-pdf.ts bejegyzés

```typescript
"oldalszamok": {
  slug: "numerotare-pagini",
  title: "Adaugă numere de pagină la PDF – online, gratuit | InstrumenteOnline",
  h1: "Numerotare pagini PDF",
  description: "Adaugă numere de pagină documentelor PDF în browser. Poziție, format și număr de start configurabile. Gratuit, privat.",
  keywords: ["numerotare pdf", "adaugă pagini pdf", "număr pagină pdf", "paginare pdf"],
},
```

---

### Tool 2.4 – PDF szöveg kinyerése

#### tool-registry.ts bejegyzés

```typescript
{
  slug: "szoveg-kinyerese",
  category: "pdf",
  title: "PDF szöveg kinyerése – szöveg másolása PDF-ből online | Konvertalo.hu",
  h1: "PDF szöveg kinyerése",
  description: "Nyerd ki a szöveget PDF fájlodból böngészőben. Másolható, letölthető TXT formátumban. Szerverfeltöltés nélkül, privát.",
  keywords: ["pdf szöveg kinyerése", "szöveg másolás pdf-ből", "pdf to text", "pdf szöveg kivonatolás"],
  status: "active",
  component: "PdfExtractTextTool",
  inputFormats: ["application/pdf"],
  acceptMultiple: false,
  related: ["pdf-informacio", "tomoritese", "osszeillesztes", "szetbontas"],
  faq: [
    { q: "Miért üres az eredmény?", a: "Ha a PDF szkennelt képekből áll (pl. beszkennelt papír), nincs benne keresható szöveg. Ilyen esetben OCR-szoftverre lenne szükség." },
    { q: "Megőrzi a formázást?", a: "A kinyert szöveg sima szöveg (plain text) lesz – a betűtípusok, táblázatok és képek nem kerülnek át. Ez az alapvető szöveg kinyerésére alkalmas." },
  ],
  launchedAt: "2026-03-01",
},
```

#### PdfExtractTextTool.svelte logika

```typescript
// pdfjs-dist (már be van töltve a projektben):
// const pdf = await pdfjsLib.getDocument({ data: pdfBytes }).promise
// let fullText = ''
// for (let i = 1; i <= pdf.numPages; i++) {
//   const page = await pdf.getPage(i)
//   const content = await page.getTextContent()
//   const pageText = content.items.map((item: any) => item.str).join(' ')
//   fullText += `--- ${ui.pdfPage} ${i} ---\n${pageText}\n\n`
// }
// Szkennelt PDF detektálás: ha fullText.trim().length < numPages * 10 → warning
```

#### UI elemek

- `Dropzone`
- **NINCS `ConvertButton`** – a szöveg kinyerése azonnali (0 delay), a gombok inline vannak
- Eredmény megjelenítés:
  - Statisztika badge: `"1 247 szó · 8 432 karakter · 3 oldal"` / `"1 247 cuvinte · 8 432 caractere · 3 pagini"`
  - Nagy `<textarea readonly>` (kb. 350px magas, monospace font)
  - Ha szkennelt: sárga figyelmeztetés box az eredmény felett
- Akciógombok (egymás mellett):
  ```
  [📋 Másolás]  [💾 TXT letöltése]  [← Új fájl]
  RO: [📋 Copiază]  [💾 Descarcă TXT]  [← Fișier nou]
  ```
- Clipboard API másolás + ToastNotification visszajelzés

#### timing-config.ts

```typescript
"szoveg-kinyerese": { delayBeforeConvert: 0, delayBeforeDownload: 0 },
```

#### ro-tools-pdf.ts bejegyzés

```typescript
"szoveg-kinyerese": {
  slug: "extragere-text-pdf",
  title: "Extragere text din PDF – online, gratuit | InstrumenteOnline",
  h1: "Extrage text din PDF",
  description: "Extrage textul din fișierele PDF în browser. Copiabil și descărcabil ca TXT. Fără încărcare pe server, complet privat.",
  keywords: ["extragere text pdf", "copiere text pdf", "pdf în text", "text din pdf"],
},
```

---

### Tool 2.5 – PDF aláírása

#### tool-registry.ts bejegyzés

```typescript
{
  slug: "alairas",
  category: "pdf",
  title: "PDF aláírása online – ingyenes, böngészőben | Konvertalo.hu",
  h1: "PDF aláírása",
  description: "Írj alá PDF dokumentumokat böngészőben. Rajzolt, gépelt vagy képként feltöltött aláírás. Szerverfeltöltés nélkül, teljesen privát.",
  keywords: ["pdf aláírás", "pdf aláírása online", "elektronikus aláírás pdf", "pdf digitális aláírás"],
  status: "active",
  component: "PdfSignTool",
  inputFormats: ["application/pdf"],
  acceptMultiple: false,
  related: ["jelszo-vedelem", "vizjel", "oldalszamok", "eltakares"],
  faq: [
    { q: "Jogilag érvényes az aláírás?", a: "Ez az eszköz vizuális aláírást helyez el a PDF-en. Egyszerű, nem minősített elektronikus aláírásnak számít. Jogilag kötelező erejű dokumentumokhoz minősített elektronikus aláírás szükséges (pl. Docusign, NISZ)." },
    { q: "Melyik oldalra kerül az aláírás?", a: "Te választod meg: bármely oldalra ráhúzhatod az aláírásodat. Alapértelmezés az utolsó oldal." },
  ],
  launchedAt: "2026-03-01",
},
```

#### PdfSignTool.svelte logika

```typescript
// Függőség: `signature_pad` npm csomag (vagy natív canvas PointerEvent implementáció)
// npm install signature_pad

// 3 tab: Rajzolás | Gépelés | Kép feltöltése
// 1. RAJZOLÁS: SignaturePad canvas → toDataURL('image/png') → Uint8Array
// 2. GÉPELÉS: canvas drawText kurzív fonttal → toDataURL → Uint8Array
// 3. KÉP: FileReader → Uint8Array (PNG/JPG)

// Elhelyezés:
// - pdfjs-dist rendereli az oldalt canvas-ra (kicsinyítve, ~600px széles)
// - Az aláírás overlay div draggable (PointerEvents)
// - Méret slider: 100–400px szélesség
// - Oldal selector: 1..numPages (default: utolsó oldal)

// Beégetés:
// const sigImg = await pdfDoc.embedPng(signatureBytes)  // vagy embedJpg
// const page = pdfDoc.getPage(pageIndex)
// const { width: pageWidth, height: pageHeight } = page.getSize()
// // Canvas koordináta → PDF koordináta konverzió (scale factor)
// page.drawImage(sigImg, { x: pdfX, y: pdfY, width: pdfW, height: pdfH })
```

#### UI elemek

- PDF feltöltés (`Dropzone`)
- Tab switcher:
  ```
  [ ✏️ Rajzolás ]  [ ⌨️ Gépelés ]  [ 🖼️ Kép ]
  RO: [ ✏️ Desen ]  [ ⌨️ Tastare ]  [ 🖼️ Imagine ]
  ```
- Rajzolás tab: canvas signature pad, "Törlés" / "Curăță" gomb, vékony / vastag ecset toggle
- Gépelés tab: szövegmező + kurzív live preview (Caveat vagy Dancing Script Google font embed)
- Kép tab: kis Dropzone (PNG/JPG, 2MB max)
- Elhelyezés szekció:
  - Az oldal pdfjs-renderelt előnézete (kb. 400px széles)
  - Az aláírás drag&drop-pal pozicionálható felette
  - Méret slider
  - Oldal választó select
- Eredménynél: `<PdfPreview>`

#### ro-tools-pdf.ts bejegyzés

```typescript
"alairas": {
  slug: "semnare-pdf",
  title: "Semnătură PDF online – gratuit, în browser | InstrumenteOnline",
  h1: "Semnează PDF online",
  description: "Semnează documente PDF în browser. Semnătură desenată, scrisă sau încărcată ca imagine. Fără server, complet privat.",
  keywords: ["semnătură pdf", "semnat pdf online", "semnătură electronică pdf", "adaugă semnătură pdf"],
},
```

---

### Tool 2.6 – PDF jelszóvédelem

#### tool-registry.ts bejegyzés

```typescript
{
  slug: "jelszo-vedelem",
  category: "pdf",
  title: "PDF jelszóval védése – online, ingyenes | Konvertalo.hu",
  h1: "PDF jelszóval védése",
  description: "Védd jelszóval PDF dokumentumaidat böngészőben. Megnyitási jelszó beállítása, opcionális szerkesztési korlátok. Szerverfeltöltés nélkül.",
  keywords: ["pdf jelszó", "pdf jelszóval védése", "pdf titkosítás", "pdf zárolás"],
  status: "active",
  component: "PdfPasswordProtectTool",
  inputFormats: ["application/pdf"],
  acceptMultiple: false,
  related: ["jelszo-eltavolitasa", "eltakares", "alairas", "vizjel"],
  faq: [
    { q: "Mennyi ideig véd a jelszó?", a: "A pdf-lib AES-128 titkosítást alkalmaz. Ez a legtöbb esetben elegendő, de rendkívül érzékeny dokumentumokhoz erősebb eszközt javaslunk." },
    { q: "Mi történik, ha elveszítem a jelszót?", a: "A fájl megnyithatatlan lesz. Nincs 'elfelejtett jelszó' funkció – ezt nem lehet megkerülni." },
  ],
  launchedAt: "2026-03-01",
},
```

#### PdfPasswordProtectTool.svelte logika

```typescript
// pdf-lib EncryptionAlgorithm (ellenőrizd a 1.17-es verzió API-ját):
// await pdfDoc.save({
//   userPassword: userPwd,
//   ownerPassword: ownerPwd || generateRandomString(32),
//   permissions: {
//     printing: allowPrint ? 'highResolution' : 'none',
//     modifying: false,
//     copying: allowCopy,
//     annotating: false,
//     fillingForms: false,
//   },
//   encryptionAlgorithm: EncryptionAlgorithm.AES_128,
// })

// Jelszóerősség számítás (kliens oldali):
// 0–2: 'gyenge' / 'slabă'
// 3–4: 'közepes' / 'medie'
// 5+:  'erős' / 'puternică'
// Kritériumok: hossz>8, nagybetű, szám, speciális karakter
```

#### UI elemek

- `Dropzone`
- Jelszó mező + megerősítés mező (mindkettőn show/hide szemgolyó ikon)
- Jelszóerősség vizuális indicator (3 szín: piros / sárga / zöld + szöveges label)
- Összecsukható "Haladó beállítások" szekció:
  ```
  [✓] Nyomtatás engedélyezése     / Permite tipărirea
  [ ] Másolás engedélyezése       / Permite copierea
  ```
- Prominens figyelmeztetés box (sárga, ikon):
  ```
  ⚠️ Jegyezd fel a jelszót! Ha elveszíted, a PDF megnyithatatlan lesz.
  RO: ⚠️ Notează parola! Dacă o pierzi, PDF-ul nu va putea fi deschis.
  ```
- `ConvertButton` (3s delay)
- Eredménynél: `<PdfPreview>`

#### ro-tools-pdf.ts bejegyzés

```typescript
"jelszo-vedelem": {
  slug: "protejare-pdf",
  title: "Protejează PDF cu parolă – online, gratuit | InstrumenteOnline",
  h1: "Adaugă parolă la PDF",
  description: "Protejează fișierele PDF cu parolă în browser. Setare parolă de deschidere și restricții opționale. Fără server.",
  keywords: ["protejare pdf", "parolă pdf", "criptare pdf", "blocare pdf"],
},
```

---

### Tool 2.7 – PDF jelszó eltávolítása

#### tool-registry.ts bejegyzés

```typescript
{
  slug: "jelszo-eltavolitasa",
  category: "pdf",
  title: "PDF jelszó eltávolítása – online, ingyenes | Konvertalo.hu",
  h1: "PDF jelszó eltávolítása",
  description: "Távolítsd el a jelszóvédelmet PDF fájlodból böngészőben. Add meg a meglévő jelszót, majd töltsd le a védelem nélküli verziót.",
  keywords: ["pdf jelszó eltávolítása", "pdf védelem feloldása", "pdf jelszó törlése", "pdf unlock"],
  status: "active",
  component: "PdfPasswordRemoveTool",
  inputFormats: ["application/pdf"],
  acceptMultiple: false,
  related: ["jelszo-vedelem", "eltakares", "tomoritese", "pdf-informacio"],
  faq: [
    { q: "Mi van, ha nem tudom a jelszót?", a: "Sajnos jelszó nélkül nem tudjuk eltávolítani a védelmet. A jelszó feltörése nem lehetséges ezzel az eszközzel." },
    { q: "Automatikusan felismeri a védett PDF-et?", a: "Igen, a feltöltés után azonnal jelzi, ha a PDF jelszóval védett, és kéri a jelszót." },
  ],
  launchedAt: "2026-03-01",
},
```

#### PdfPasswordRemoveTool.svelte logika

```typescript
// 1. PDFDocument.load(pdfBytes) – try/catch:
//    - Ha nem jelszavas: siker, de figyelmeztetés: "Ez a PDF nincs jelszóval védve"
//    - Ha jelszavas, jelszó nélkül: error → mutasd a jelszó mezőt
// 2. PDFDocument.load(pdfBytes, { password: userPassword }) – try/catch:
//    - Siker: await pdfDoc.save() → PdfPreview
//    - Hibás jelszó: piros hibaüzenet

// Fontos: a pdf-lib 1.17-ben a `load()` dobja az EncryptedPDFError-t jelszó nélküli esetben
```

#### UI elemek

- `Dropzone`
- Ha a feltöltött PDF jelszó nélkül is megnyílik: info badge `"Ez a PDF nincs jelszóval védve"` + közvetlen eredmény
- Ha jelszó kell: jelszó mező (show/hide) + "Jelszó feloldása" gomb
- Sikertelen kísérlet: piros hibaüzenet: `"❌ Helytelen jelszó – próbáld újra"` / `"❌ Parolă incorectă"`
- Sikernél: `<PdfPreview>`

#### ro-tools-pdf.ts bejegyzés

```typescript
"jelszo-eltavolitasa": {
  slug: "eliminare-parola-pdf",
  title: "Elimină parola din PDF – online, gratuit | InstrumenteOnline",
  h1: "Elimină parola din PDF",
  description: "Elimină protecția cu parolă din fișierele PDF în browser. Introdu parola existentă și descarcă versiunea neprotejată.",
  keywords: ["eliminare parolă pdf", "deprotejare pdf", "deblocare pdf", "scoate parolă pdf"],
},
```

---

### Tool 2.8 – PDF eltakarása (Redakálás)

#### tool-registry.ts bejegyzés

```typescript
{
  slug: "eltakares",
  category: "pdf",
  title: "PDF eltakarása – érzékeny adatok törlése online | Konvertalo.hu",
  h1: "PDF eltakarása (redakálás)",
  description: "Takard el az érzékeny adatokat PDF dokumentumokban. Fekete téglalapok visszafordíthatatlanul beégethetők. Böngészőben, szerverfeltöltés nélkül.",
  keywords: ["pdf eltakarás", "pdf redakálás", "érzékeny adat törlése pdf", "pdf fekete csík", "pdf szerkesztés"],
  status: "active",
  component: "PdfRedactTool",
  inputFormats: ["application/pdf"],
  acceptMultiple: false,
  related: ["alairas", "jelszo-vedelem", "vizjel", "oldalak-torlese"],
  faq: [
    { q: "Visszafordítható az eltakarás?", a: "NEM. A fekete téglalapok véglegesen beégetődnek a PDF-be. Mentés előtt ellenőrizd alaposan, mit takarsz el – visszavonás nem lehetséges." },
    { q: "A szöveg valóban törlődik vagy csak el van takarva?", a: "Valóban törlődik. A pdf-lib a fekete téglalapot közvetlenül a PDF tartalom-streambe égeti be, felülírva az alatta lévő szöveget és képet." },
  ],
  launchedAt: "2026-03-01",
},
```

#### PdfRedactTool.svelte logika

```typescript
// 1. pdfjs-dist: az aktuálisan szerkesztett oldal renderelése canvas-ra
//    const viewport = page.getViewport({ scale: canvasWidth / page.getWidth() })
//    renderContext: { canvasContext, viewport }
//
// 2. A canvas felett egy overlay div, amelyen a user téglalapokat rajzol:
//    PointerDown → start point, PointerMove → live preview rect, PointerUp → rögzítés
//    Tárolt adatok: [{ pageIndex, x, y, width, height, color }]
//
// 3. Koordináta konverzió:
//    const scaleX = pdfPage.getWidth() / canvasDisplayWidth
//    const scaleY = pdfPage.getHeight() / canvasDisplayHeight
//    pdfX = rect.x * scaleX
//    pdfY = pdfPage.getHeight() - (rect.y + rect.height) * scaleY  // PDF Y tengely fordított!
//    pdfW = rect.width * scaleX
//    pdfH = rect.height * scaleY
//
// 4. Beégetés (pdf-lib):
//    for (const r of redactions.filter(r => r.pageIndex === i)) {
//      page.drawRectangle({ x: r.pdfX, y: r.pdfY, width: r.pdfW, height: r.pdfH,
//                           color: rgb(0,0,0), borderWidth: 0 })
//    }
//    await pdfDoc.save({ useObjectStreams: false })
//    // useObjectStreams: false → nem tömörített stream → a tartalom valóban felülíródik
```

#### UI elemek

- `Dropzone`
- Oldal selector (ha > 1 oldal): `"1. oldal"` / `"Pagina 1"` lapozó
- Canvas area az oldal előnézetével (teljes szélességen)
  - A eltakarható területek piros/fekete téglalap previewként jelennek meg rajzolás közben
- Eltakarások listája (jobb oldali panel vagy az eszköz alatt):
  ```
  Oldal 1, 45×12px (bal felső saroktól)  [🗑 Törlés]
  Oldal 2, 120×20px                      [🗑 Törlés]
  ```
- Undo gomb (utolsó téglalap visszavonása)
- Szín: Fekete (default) / Fehér toggle
- **PROMINENS FIGYELMEZTETÉS** (piros keret, !-ikon, jól látható):
  ```
  ⚠️ FIGYELEM: Az eltakarás VISSZAFORDÍTHATATLAN.
  A fekete téglalapok alatti tartalom véglegesen és visszavonhatatlanul törlődik.
  Mentés előtt ellenőrizd alaposan a kijelölt területeket!

  RO:
  ⚠️ ATENȚIE: Redactarea este IREVERSIBILĂ.
  Conținutul de sub dreptunghiurile negre va fi șters definitiv și irevocabil.
  Verifică cu atenție zonele selectate înainte de a salva!
  ```
- `ConvertButton` (3s delay, plusz "Biztosan eltakarod?" confirmation modal a kattintásra)
- Eredménynél: `<PdfPreview>`

#### ro-tools-pdf.ts bejegyzés

```typescript
"eltakares": {
  slug: "redactare-pdf",
  title: "Redactare PDF – ascundere date sensibile online | InstrumenteOnline",
  h1: "Redactare PDF",
  description: "Ascunde datele sensibile din documentele PDF. Dreptunghiuri negre arse ireversibil. În browser, fără încărcare pe server.",
  keywords: ["redactare pdf", "ascundere date pdf", "cenzurare pdf", "ștergere informații pdf"],
},
```

---

## Feladat 3 – PDF kategória landing oldal frissítése

A `src/lib/tool-registry.ts`-ban a PDF kategória `intro` mezőjét egészítsd ki vagy frissítsd
(ha szükséges), és az `i18n.ro.intro` román változatát is.

A 8 új tool automatikusan megjelenik a kategória oldalon, miután a `rawTools`-ban szerepelnek —
**nincs külön teendő**, a `CategoryLayout.astro` dinamikusan listázza a tool-okat.

Ellenőrizd, hogy az új toolok `related` mezői kölcsönösen visszahivatkoznak egymásra,
ahol logikus (pl. `jelszo-vedelem` ↔ `jelszo-eltavolitasa`).

---

## Feladat 4 – ui-labels.ts kiegészítések összesítve

Az alábbi kulcsok **nem léteznek még** – add hozzá mind a `hu` mind a `ro` ágba:

```typescript
// hu:
pdfPreviewTitle: "Előnézet",
pdfDownloadBtn: "PDF letöltése",
pdfResetBtn: "← Új fájl feldolgozása",
pdfSizeReduced: "csökkentés",
pdfSizeReducedFull: "⬇ {from} → {to} ({percent}% csökkentés)",
pdfAlreadyOptimized: "A fájl már optimalizált",
pdfPage: "oldal",
pdfMorePages: "további oldal",
pdfCompressLight: "Könnyű",
pdfCompressMedium: "Közepes",
pdfCompressHeavy: "Erős",
pdfWatermarkDefault: "BIZALMAS",
pdfWatermarkDiagonal: "Átlósan",
pdfWatermarkCenter: "Középen",
pdfWatermarkBottomRight: "Jobb alul",
pdfPasswordWarning: "Jegyezd fel a jelszót! Ha elveszíted, a PDF megnyithatatlan lesz.",
pdfRedactWarning: "FIGYELEM: Az eltakarás VISSZAFORDÍTHATATLAN. A kijelölt tartalom véglegesen törlődik.",
pdfExtractCopy: "Másolás",
pdfExtractDownloadTxt: "TXT letöltése",
pdfExtractStats: "{words} szó · {chars} karakter · {pages} oldal",
pdfExtractScannedWarning: "Ez a PDF szkennelt képeket tartalmaz, a szöveg kinyerése korlátozott.",
pdfSignDrawTab: "Rajzolás",
pdfSignTypeTab: "Gépelés",
pdfSignImageTab: "Kép",
pdfSignClear: "Törlés",
pdfPasswordStrengthWeak: "gyenge",
pdfPasswordStrengthMedium: "közepes",
pdfPasswordStrengthStrong: "erős",
pdfPasswordMismatch: "A két jelszó nem egyezik",
pdfPasswordWrong: "❌ Helytelen jelszó – próbáld újra",
pdfNoPassword: "Ez a PDF nincs jelszóval védve",
pdfRedactUndo: "Visszavonás",
pdfRedactConfirm: "Biztosan eltakarod a kijelölt területeket? Ez nem vonható vissza.",
pdfPageNumber1: "1",
pdfPageNumberFraction: "1 / {total}",
pdfPageNumberDash: "– 1 –",
pdfPageNumberFull: "Oldal {n}",

// ro: (minden fenti kulcs román megfelelője)
pdfPreviewTitle: "Previzualizare",
pdfDownloadBtn: "Descarcă PDF",
pdfResetBtn: "← Procesează alt fișier",
pdfSizeReduced: "reducere",
pdfSizeReducedFull: "⬇ {from} → {to} ({percent}% reducere)",
pdfAlreadyOptimized: "Fișierul este deja optimizat",
pdfPage: "pagina",
pdfMorePages: "pagini suplimentare",
pdfCompressLight: "Ușoară",
pdfCompressMedium: "Medie",
pdfCompressHeavy: "Puternică",
pdfWatermarkDefault: "CONFIDENȚIAL",
pdfWatermarkDiagonal: "Diagonal",
pdfWatermarkCenter: "Centrat",
pdfWatermarkBottomRight: "Dreapta jos",
pdfPasswordWarning: "Notează parola! Dacă o pierzi, PDF-ul nu va putea fi deschis.",
pdfRedactWarning: "ATENȚIE: Redactarea este IREVERSIBILĂ. Conținutul selectat va fi șters definitiv.",
pdfExtractCopy: "Copiază",
pdfExtractDownloadTxt: "Descarcă TXT",
pdfExtractStats: "{words} cuvinte · {chars} caractere · {pages} pagini",
pdfExtractScannedWarning: "Acest PDF conține imagini scanate, extragerea textului este limitată.",
pdfSignDrawTab: "Desen",
pdfSignTypeTab: "Tastare",
pdfSignImageTab: "Imagine",
pdfSignClear: "Curăță",
pdfPasswordStrengthWeak: "slabă",
pdfPasswordStrengthMedium: "medie",
pdfPasswordStrengthStrong: "puternică",
pdfPasswordMismatch: "Cele două parole nu coincid",
pdfPasswordWrong: "❌ Parolă incorectă – încearcă din nou",
pdfNoPassword: "Acest PDF nu este protejat cu parolă",
pdfRedactUndo: "Anulează",
pdfRedactConfirm: "Sigur vrei să redactezi zonele selectate? Această acțiune este ireversibilă.",
pdfPageNumber1: "1",
pdfPageNumberFraction: "1 / {total}",
pdfPageNumberDash: "– 1 –",
pdfPageNumberFull: "Pagina {n}",
```

---

## Feladat 5 – HU SEO tartalom (pdf-excel-other-content.ts)

Minden új tool-hoz add hozzá a bejegyzést a `PDF_CONTENT` (vagy az aktuális PDF content) map-hez.
Minta struktúra (a többihez hasonlóan):

```typescript
"tomoritese": {
  introText: "A PDF tömörítése eszköz lecsökkenti a PDF fájlok méretét...",
  guide: [
    "1. Húzd be vagy tallózd ki a PDF fájlt.",
    "2. Válaszd ki a tömörítési szintet (Könnyű / Közepes / Erős).",
    "3. Kattints a 'Tömörítés' gombra.",
    "4. Az eredménynél látod az előtte/utána méretet. Töltsd le a tömörített PDF-et.",
  ],
  faq: [ /* a registry faq-ja kerülhet ide vagy eltérő, részletesebb változat */ ],
  content: {
    howToSteps: [
      { title: "PDF fájl feltöltése", description: "..." },
      { title: "Tömörítési szint kiválasztása", description: "..." },
      { title: "Tömörítés indítása", description: "..." },
      { title: "Eredmény letöltése", description: "..." },
    ],
    useCases: [
      { icon: "📧", title: "E-mail melléklet", description: "Csökkentsd a PDF méretét, hogy beleférjen az e-mail méretlimitbe." },
      { icon: "☁️", title: "Felhőtárhely", description: "Spórolj tárhelyen a felhős szolgáltatásokban." },
      { icon: "📱", title: "Mobilon való megosztás", description: "Kisebb fájlok gyorsabban töltődnek le mobilon." },
      { icon: "🖨️", title: "Nyomtatás előtt", description: "Kisebb fájl gyorsabban nyomtat és kevesebb memóriát igényel." },
    ],
    aboutSection: {
      title: "Mi a PDF tömörítése?",
      paragraphs: [
        "A PDF fájlok sokszor tartalmaznak nagy felbontású képeket, amelyek feleslegesen nagy méretűvé teszik a dokumentumot. A tömörítési folyamat ezeket a képeket optimalizálja – csökkenti a felbontásukat vagy JPEG tömörítést alkalmaz – anélkül, hogy a dokumentum tartalmát megváltoztatná.",
        "Az eszköz teljes egészében a böngésződben fut. Nincs szerverfeltöltés, nincs várakozás – a feldolgozás közvetlenül a te gépeden történik.",
      ],
    },
    tips: [
      { icon: "💡", tip: "Szöveges PDF-eken kisebb a hatás – ezek már eleve tömörítve vannak." },
      { icon: "⚡", tip: "Nagy (50+ MB) PDF-eknél a 'Könnyű' szintet ajánljuk első körben." },
    ],
  },
},
```

Hasonló struktúrát kell megírni mind a 8 új tool-hoz.

---

## Összefoglalt ellenőrzési lista (minden toolhoz)

Az ARCHITECTURE.md 16. fejezetének 8. lépése alapján, PDF-specifikus kiegészítésekkel:

- [ ] `rawTools` bejegyzés hozzáadva `tool-registry.ts`-be
- [ ] Svelte 5 komponens létrehozva (`src/components/tools/pdf/`)
- [ ] `DynamicTool.svelte` `COMPONENT_IMPORTS`-ba bejegyezve
- [ ] `timing-config.ts` override hozzáadva (ha eltér az alapértelmezetttől)
- [ ] HU SEO tartalom hozzáadva (`pdf-excel-other-content.ts`)
- [ ] RO slug + meta hozzáadva (`ro-tools-pdf.ts`)
- [ ] RO SEO tartalom hozzáadva (`content/ro/pdf-excel-other-content.ts`)
- [ ] `ui-labels.ts` új kulcsok hozzáadva (hu + ro)
- [ ] A tool megjelenik `/pdf` és `/pdf` (RO) kategória oldalon
- [ ] `PdfPreview` integrálva az eredmény szekciójában
- [ ] `related` mezők kölcsönösek (a hivatkozott toolok visszahivatkoznak)
- [ ] HU build: `npm run build:hu` – 0 hiba
- [ ] RO build: `npm run build:ro` – 0 hiba
- [ ] `npm run dev` – az eszköz megnyílik, működik
- [ ] Mobile responsive ellenőrzés
- [ ] Analytics: `trackToolEvent(slug, 'convert_start')` és `'download'` hívások a toolban
