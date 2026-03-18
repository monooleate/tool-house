# Claude Code: Új képeszközök implementálása – instrumenteonline.ro / konvertalo.hu

## Kontextus

Ez a prompt a Tool House kódbázisba (Astro 5 + Svelte 5, `src/`) implementálja az összes új képeszközt.
Elolvastad az ARCHITECTURE.md-t. A teljes implementációs checklist az ARCHITECTURE.md §16-ban van.

**Fontos alapelvek:**
- Minden feldolgozás client-side, szerver nélkül
- A kódbázis két domaint szolgál ki egyetlen buildből: `konvertalo.hu` (HU) és `instrumenteonline.ro` (RO)
- Minden új eszköznél mind a 8 lépést végig kell csinálni (registry → Svelte → DynamicTool → timing → SEO content → RO fordítás → ui-labels → checklist)
- Az `ImageConvertTool` shared komponens újrahasználható ahol lehet – csak új `componentProps`-t kap

---

## npm csomagok telepítése

Először add hozzá a szükséges új függőségeket a `package.json`-ba:

```bash
npm install heic2any @jsquash/avif @jsquash/webp gifenc gifuct-js color-thief-ts
```

Megjegyzések:
- `heic2any`: HEIC → JPG/PNG böngészőben, WebAssembly decoder
- `@jsquash/avif`: AVIF encoder/decoder (WASM) – a `@jsquash/webp` is kell mellé
- `gifenc`: GIF encoder (Web Worker kompatibilis)
- `gifuct-js`: GIF frame parser (GIF → WebP animációhoz)
- `color-thief-ts`: domináns szín kinyerés Canvas alapon

Az `astro.config.mjs` `optimizeDeps.include` listájához add hozzá:

```javascript
optimizeDeps: {
  include: ["pdf-lib", "pdfjs-dist", "js-yaml", "heic2any", "color-thief-ts"],
  exclude: ["jszip", "@jsquash/avif", "@jsquash/webp", "gifenc", "gifuct-js"],
},
```

A WASM alapú csomagokat (`@jsquash/*`, `gifenc`, `gifuct-js`) exclude-olni kell az optimizeDeps-ből – ezeket dinamikusan kell importálni.

---

## 1. lépés: tool-registry.ts – Új eszközök regisztrálása

**Fájl**: `src/lib/tool-registry.ts`

A `rawTools` tömb `kep` kategóriájú eszközei után add hozzá az alábbi 15 új bejegyzést:

```typescript
// ── ÚJ ESZKÖZÖK ──────────────────────────────────────────────────────────────

// P1-1: HEIC → JPG
{
  slug: "heic-jpg",
  category: "kep",
  title: "HEIC → JPG Konvertáló | Ingyenes Online | Konvertalo.hu",
  h1: "HEIC → JPG Konvertáló",
  description: "Konvertáld iPhone/iPad HEIC képeidet JPG formátumba böngészőben, szerver nélkül. Tömeges feldolgozás, ZIP letöltés.",
  keywords: ["heic jpg", "heic konvertáló", "iphone kép konvertálás", "heif jpg"],
  status: "active",
  component: "HeicJpgTool",
  inputFormats: ["image/heic", "image/heif", ".heic", ".heif"],
  outputFormat: "image/jpeg",
  acceptMultiple: true,
  related: ["jpg-webp", "jpg-png", "heic-png", "stergere-metadata"],
  updatedAt: "2026-03-01",
  faq: [
    { q: "Mi a HEIC formátum?", a: "A HEIC (High Efficiency Image Container) az iPhone és iPad alapértelmezett képformátuma iOS 11 óta. Kiváló tömörítést nyújt, de sok program nem tudja megnyitni." },
    { q: "Feltöltődnek a képeim szerverre?", a: "Nem. Az összes feldolgozás a böngésződben történik – a képeid egyetlen byte-ja sem hagyja el a gépedet." },
    { q: "Lehet egyszerre több HEIC fájlt konvertálni?", a: "Igen! Tölts fel egyszerre több fájlt, és az eszköz ZIP archívumba csomagolja a konvertált JPG fájlokat." },
    { q: "Elvész a kép minősége a konverzió során?", a: "A JPG konverzió alapértelmezetten 90%-os minőséggel dolgozik, ami szinte észrevehetetlen minőségveszteséggel jár." },
  ],
},

// P1-2: HEIC → PNG
{
  slug: "heic-png",
  category: "kep",
  title: "HEIC → PNG Konvertáló | Ingyenes Online | Konvertalo.hu",
  h1: "HEIC → PNG Konvertáló",
  description: "Konvertáld HEIC képeidet veszteségmentes PNG formátumba böngészőben. Átlátszóság megőrzésével, szerver nélkül.",
  keywords: ["heic png", "heic png konvertáló", "heif png", "iphone kép png"],
  status: "active",
  component: "HeicPngTool",
  inputFormats: ["image/heic", "image/heif", ".heic", ".heif"],
  outputFormat: "image/png",
  acceptMultiple: true,
  related: ["heic-jpg", "png-webp", "jpg-png", "stergere-metadata"],
  updatedAt: "2026-03-01",
  faq: [
    { q: "Mikor érdemes PNG-t választani a JPG helyett?", a: "Ha veszteségmentes minőséget szeretnél, vagy ha a képen átlátszóság is van, a PNG a jobb választás." },
    { q: "A HEIC fájlokban lévő átlátszóság megmarad PNG-be konvertáláskor?", a: "Igen, a PNG formátum teljes mértékben támogatja az alfa-csatornát, az átlátszóság megmarad." },
  ],
},

// P1-3: JPG/PNG → AVIF
{
  slug: "jpg-avif",
  category: "kep",
  title: "JPG → AVIF Konvertáló | Kisebb Fájlméret | Konvertalo.hu",
  h1: "JPG → AVIF Konvertáló",
  description: "Konvertáld JPG képeidet AVIF formátumba böngészőben. Az AVIF 40%-kal kisebb fájlméretet ad WebP-nél is – szerver nélkül.",
  keywords: ["jpg avif", "jpeg avif konvertáló", "avif konvertálás", "következő generációs képformátum"],
  status: "active",
  component: "JpgAvifTool",
  inputFormats: ["image/jpeg"],
  outputFormat: "image/avif",
  acceptMultiple: true,
  related: ["jpg-webp", "png-avif", "webp-jpg", "comprimare-imagini"],
  updatedAt: "2026-03-01",
  faq: [
    { q: "Mi az AVIF formátum?", a: "Az AVIF (AV1 Image File Format) egy modern képformátum, amely az AV1 videokodeken alapul. Jobb tömörítést nyújt mint a WebP vagy JPEG, royalty-free." },
    { q: "Minden böngésző támogatja az AVIF-et?", a: "2025-re az összes modern böngésző (Chrome, Firefox, Safari, Edge) támogatja az AVIF-et. Régebbi böngészőkhöz JPG fallback ajánlott." },
    { q: "Mekkora méretcsökkentés várható?", a: "Tipikusan 40-50%-kal kisebb fájlméretet eredményez azonos minőség mellett a JPG-hez képest, 20-25%-kal kisebb a WebP-nél is." },
  ],
},

// P1-4: PNG → AVIF
{
  slug: "png-avif",
  category: "kep",
  title: "PNG → AVIF Konvertáló | Ingyenes Online | Konvertalo.hu",
  h1: "PNG → AVIF Konvertáló",
  description: "Konvertáld PNG képeidet AVIF formátumba böngészőben. Átlátszóság megőrzésével, veszteségmentes és veszteséges módban.",
  keywords: ["png avif", "png avif konvertáló", "avif átlátszóság", "webp alternatíva"],
  status: "active",
  component: "PngAvifTool",
  inputFormats: ["image/png"],
  outputFormat: "image/avif",
  acceptMultiple: true,
  related: ["jpg-avif", "png-webp", "webp-png", "comprimare-imagini"],
  updatedAt: "2026-03-01",
  faq: [
    { q: "Az AVIF megőrzi a PNG átlátszóságát?", a: "Igen, az AVIF teljes mértékben támogatja az alfa-csatornát, az átlátszó területek megmaradnak." },
    { q: "Veszteségmentes AVIF lehetséges?", a: "Igen, az eszköz támogat veszteségmentes módot is, bár a fájlméret ekkor nagyobb lesz." },
  ],
},

// P1-5: Kép → Base64
{
  slug: "kep-base64",
  category: "kep",
  title: "Kép → Base64 Konvertáló | Data URI | Konvertalo.hu",
  h1: "Kép → Base64 / Data URI Konvertáló",
  description: "Alakítsd képeidet Base64 kódolt Data URI stringgé HTML/CSS beágyazáshoz. JPG, PNG, WebP, SVG – böngészőben, szerver nélkül.",
  keywords: ["kép base64", "image base64 konvertáló", "data uri kép", "base64 encode kép"],
  status: "active",
  component: "KepBase64Tool",
  inputFormats: ["image/jpeg", "image/png", "image/webp", "image/svg+xml", "image/gif"],
  outputFormat: "text/plain",
  acceptMultiple: false,
  related: ["jpg-webp", "png-webp", "fejleszto-base64", "comprimare-imagini"],
  updatedAt: "2026-03-01",
  faq: [
    { q: "Mire való a Base64 képkódolás?", a: "A Base64 Data URI lehetővé teszi, hogy képet közvetlenül HTML vagy CSS fájlba ágyazz be, HTTP kérés nélkül. Kis ikonokhoz, logókhoz és e-mail sablonokhoz ideális." },
    { q: "Milyen formátumú a kimenet?", a: "A kimenet `data:image/jpeg;base64,/9j/4AA...` alakú string, amit közvetlenül beilleszthetsz `<img src=\"...\">` tagbe vagy CSS `background-image` tulajdonságba." },
    { q: "Van méretkorlát?", a: "Technikailag nincs, de nagy képeknél a Base64 string 33%-kal nagyobb lesz az eredeti fájlméretnél. 50KB feletti képeknél külső fájlként ajánlott tárolni." },
  ],
},

// P1-6: PNG/JPG → ICO / Favicon
{
  slug: "kep-ico",
  category: "kep",
  title: "Kép → ICO / Favicon Generátor | Ingyenes | Konvertalo.hu",
  h1: "Kép → ICO / Favicon Generátor",
  description: "Készíts ICO favicon fájlt PNG vagy JPG képből böngészőben. Több méretet (16x16, 32x32, 48x48) tartalmaz egyetlen ICO fájlban.",
  keywords: ["favicon generátor", "png ico konvertáló", "ico készítő", "favicon ikon"],
  status: "active",
  component: "KepIcoTool",
  inputFormats: ["image/png", "image/jpeg", "image/webp"],
  outputFormat: "image/x-icon",
  acceptMultiple: false,
  related: ["svg-png", "kep-base64", "jpg-png", "oglindire-imagine"],
  updatedAt: "2026-03-01",
  faq: [
    { q: "Milyen méreteket tartalmaz a generált ICO fájl?", a: "Az eszköz 16×16, 32×32 és 48×48 pixel méretű képeket csomagol egyetlen ICO fájlba, ami maximális böngésző- és OS-kompatibilitást biztosít." },
    { q: "Hogyan teszem fel a favicont a weboldalamra?", a: "Töltsd fel a `favicon.ico` fájlt a weboldal gyökérmappájába, majd add hozzá a HTML `<head>` részbe: `<link rel=\"icon\" href=\"/favicon.ico\">`." },
    { q: "PNG favicon is megfelel, vagy ICO kell?", a: "Modern böngészők elfogadnak PNG favicont is, de az ICO fájl a legkompatibilisebb megoldás, különösen régebbi böngészőknél és Windows rendszereknél." },
  ],
},

// P1-7: Átméretezés KB-ra
{
  slug: "atmeterezas-kb",
  category: "kep",
  title: "Kép Átméretezés KB-ra | Célméret Beállítás | Konvertalo.hu",
  h1: "Kép Átméretezés Megadott KB Méretre",
  description: "Állítsd be a kép célméretét KB-ban – az eszköz automatikusan megkeresi az optimális minőséget. Álláspályázathoz, feltöltési korlátokhoz.",
  keywords: ["kép kb méret", "kép méret csökkentés kb", "kép fájlméret beállítás", "resize to kb"],
  status: "active",
  component: "AtmeterezesKbTool",
  inputFormats: ["image/jpeg", "image/png", "image/webp"],
  outputFormat: "image/jpeg",
  acceptMultiple: false,
  related: ["comprimare-imagini", "setare-calitate-imagine", "redimensionare-imagini", "comprimare-lot"],
  updatedAt: "2026-03-01",
  faq: [
    { q: "Hogyan működik a KB-ra méretezés?", a: "Az eszköz bináris kereséssel megtalálja az optimális minőségi értéket (1-100%), amelynél a fájlméret a legközelebb esik a megadott célhoz, de nem haladja meg azt." },
    { q: "Pontos lesz a célméret?", a: "Az eszköz ±5%-on belül találja el a célméretet. Ennél pontosabb nem érhető el, mivel a JPEG tömörítés nem determinisztikus." },
    { q: "Mikor van szükség erre az eszközre?", a: "Álláspályázatokhoz (pl. max 2MB), hatósági dokumentumokhoz, e-mail mellékletek méretkorlátjához, vagy feltöltési rendszerek korlátaihoz." },
  ],
},

// P2-1: GIF Készítő
{
  slug: "gif-keszito",
  category: "kep",
  title: "Animált GIF Készítő Képekből | Ingyenes Online | Konvertalo.hu",
  h1: "Animált GIF Készítő",
  description: "Készíts animált GIF-et JPG, PNG vagy WebP képekből böngészőben. Frame delay, sorrend, hurok beállítással – szerver nélkül.",
  keywords: ["gif készítő", "animált gif képekből", "gif csináló online", "képek gif-be"],
  status: "active",
  component: "GifKeszito",
  inputFormats: ["image/jpeg", "image/png", "image/webp"],
  outputFormat: "image/gif",
  acceptMultiple: true,
  related: ["gif-webp", "rotire-90-grade", "redimensionare-lot", "impachetare-zip-imagini"],
  updatedAt: "2026-03-01",
  faq: [
    { q: "Hány képet lehet egyszerre feltölteni?", a: "Legfeljebb 100 képet lehet egyszerre feltölteni. Az összes feldolgozás Web Worker segítségével a böngészőben fut." },
    { q: "Mi a frame delay?", a: "A frame delay a képkockák közötti várakozási idő ezredmásodpercben. 100ms = 10 fps, 500ms = lassú diavetítés." },
    { q: "Különböző méretű képeket is lehet keverni?", a: "Igen, az eszköz automatikusan az első kép méretéhez igazítja a többi keretet (crop vagy letterbox módban)." },
  ],
},

// P2-2: GIF → Animált WebP
{
  slug: "gif-webp-animalt",
  category: "kep",
  title: "GIF → Animált WebP Konvertáló | Kisebb Méret | Konvertalo.hu",
  h1: "GIF → Animált WebP Konvertáló",
  description: "Konvertáld GIF animációidat animált WebP formátumba böngészőben. Akár 80%-os méretcsökkentés minőségromlás nélkül.",
  keywords: ["gif webp animált", "animált gif konvertáló", "gif optimalizálás", "gif webp méret"],
  status: "active",
  component: "GifWebpAnimalt",
  inputFormats: ["image/gif"],
  outputFormat: "image/webp",
  acceptMultiple: false,
  related: ["gif-keszito", "jpg-webp", "png-webp", "comprimare-imagini"],
  updatedAt: "2026-03-01",
  faq: [
    { q: "Mennyi méretmegtakarítás várható?", a: "Az animált WebP tipikusan 60-80%-kal kisebb fájlméretet eredményez azonos minőség mellett, mint az animált GIF." },
    { q: "Megmaradnak az animáció frame-jei és időzítése?", a: "Igen, az eszköz pontosan megőrzi az összes frame-t és az eredeti időzítéseket." },
    { q: "Minden böngésző lejátssza az animált WebP-t?", a: "Igen, az animált WebP-t minden modern böngésző (Chrome, Firefox, Safari 14+, Edge) támogatja." },
  ],
},

// P2-3: SVG → PNG/JPG
{
  slug: "svg-png",
  category: "kep",
  title: "SVG → PNG Konvertáló | Vektorgrafika Raszterizálás | Konvertalo.hu",
  h1: "SVG → PNG / JPG Konvertáló",
  description: "Konvertáld SVG vektorgrafikádat PNG vagy JPG képpé böngészőben. Egyedi felbontás megadásával, szerver nélkül.",
  keywords: ["svg png konvertáló", "svg raszterizálás", "svg jpg", "vektorgrafika png"],
  status: "active",
  component: "SvgPngTool",
  inputFormats: ["image/svg+xml", ".svg"],
  outputFormat: "image/png",
  acceptMultiple: false,
  related: ["kep-ico", "kep-base64", "jpg-png", "png-webp"],
  updatedAt: "2026-03-01",
  faq: [
    { q: "Miért kell SVG-t PNG-vé konvertálni?", a: "Egyes programok, e-mail kliensek és platformok (pl. régebbi Word, WhatsApp) nem támogatják az SVG formátumot. PNG-vé konvertálva mindenhol megjelenik." },
    { q: "Beállítható a kimeneti felbontás?", a: "Igen, megadhatod a kívánt szélességet pixelben – az eszköz az arányokat megtartva generálja a PNG-t." },
    { q: "Az SVG átlátszósága megmarad PNG-ben?", a: "Igen, az SVG-ben lévő átlátszó területek az alfa-csatornán megmaradnak a PNG kimenetben." },
  ],
},

// P2-4: Kép összefűző / Collage
{
  slug: "kep-collage",
  category: "kep",
  title: "Kép Összefűző – Collage Készítő | Online | Konvertalo.hu",
  h1: "Kép Összefűző / Collage Készítő",
  description: "Fűzz össze képeket vízszintesen, függőlegesen vagy rácsban egyetlen képpé böngészőben. Szerver nélkül, ZIP letöltés.",
  keywords: ["kép összefűzés", "collage készítő", "képek egyesítése", "kép egymás mellé"],
  status: "active",
  component: "KepCollage",
  inputFormats: ["image/jpeg", "image/png", "image/webp"],
  outputFormat: "image/png",
  acceptMultiple: true,
  related: ["redimensionare-imagini", "rotire-90-grade", "watermark-imagine", "chenar-padding"],
  updatedAt: "2026-03-01",
  faq: [
    { q: "Milyen elrendezések érhetők el?", a: "Vízszintes (egymás mellé), függőleges (egymás alá) és rácsos (pl. 2×2, 3×3) elrendezések." },
    { q: "Különböző méretű képeket is lehet keverni?", a: "Igen. Vízszintes elrendezésnél az eszköz a legkisebb magassághoz igazítja a képeket, a szélességarányokat megtartva." },
    { q: "Hány képet lehet egyszerre összefűzni?", a: "Legfeljebb 20 képet. A kimeneti fájl PNG formátumú." },
  ],
},

// P3-1: Szín Paletta Kinyerő
{
  slug: "szin-paletta",
  category: "kep",
  title: "Kép Szín Paletta Kinyerő | Domináns Színek HEX | Konvertalo.hu",
  h1: "Képből Szín Paletta Kinyerő",
  description: "Nyerd ki egy kép domináns színeit HEX kódokkal böngészőben. Logóhoz, brand palettához, design munkához.",
  keywords: ["szín paletta kép", "domináns szín", "hex szín kinyerés", "brand szín"],
  status: "active",
  component: "SzinPaletta",
  inputFormats: ["image/jpeg", "image/png", "image/webp"],
  outputFormat: "text/plain",
  acceptMultiple: false,
  related: ["kep-base64", "watermark-imagine", "chenar-padding", "contrast-luminozitate"],
  updatedAt: "2026-03-01",
  faq: [
    { q: "Hány domináns színt ad meg az eszköz?", a: "Alapértelmezetten 6 domináns színt jelenít meg HEX, RGB és HSL formátumban. Ez konfigurálható 3-10 szín között." },
    { q: "Mire használható?", a: "Brand identitás kialakításához, webdesign paletta összeállításához, fotók domináns hangulatának azonosításához." },
    { q: "Hogyan másolhatom a HEX kódokat?", a: "Minden szín melletti vágólapra másolás gombbal egyenként másolhatók a kódok, vagy az összes egy kattintással exportálható." },
  ],
},

// P3-2: Automatikus Vágás (autocrop)
{
  slug: "automatikus-vagas",
  category: "kep",
  title: "Automatikus Vágás – Fehér Szél Eltávolítás | Konvertalo.hu",
  h1: "Automatikus Képvágás – Fehér/Egyszínű Szél Eltávolítás",
  description: "Távolítsd el a kép fehér vagy egyszínű széleit automatikusan böngészőben. Termékfotókhoz, szkennelt dokumentumokhoz ideális.",
  keywords: ["automatikus vágás", "fehér szél eltávolítás", "kép cropping", "autocrop"],
  status: "active",
  component: "AutomatikusVagas",
  inputFormats: ["image/jpeg", "image/png", "image/webp"],
  outputFormat: "image/png",
  acceptMultiple: false,
  related: ["decupare-imagine", "redimensionare-imagini", "chenar-padding", "watermark-imagine"],
  updatedAt: "2026-03-01",
  faq: [
    { q: "Hogyan működik az automatikus vágás?", a: "Az eszköz pixelszinten vizsgálja a kép széleit, és levágja az összes sort/oszlopot, ahol a háttérszín (alapértelmezetten fehér) dominál." },
    { q: "Lehet más háttérszínt is beállítani?", a: "Igen, a tolerancia csúszkával és a háttérszín kiválasztóval pontosan beállítható, hogy melyik színt tekintse levágandó háttérnek." },
    { q: "Mire ideális ez az eszköz?", a: "Szkennerből érkező dokumentumok fehér szélének levágásához, webshop termékfotók egységesítéséhez, logók körüli felesleges tér eltávolításához." },
  ],
},

// P3-3: EXIF GPS Térkép
{
  slug: "exif-terkep",
  category: "kep",
  title: "EXIF GPS Helyszín Térkép | Képből Helymeghatározás | Konvertalo.hu",
  h1: "EXIF GPS Helyszín Megjelenítő Térképen",
  description: "Jelenítsd meg egy kép EXIF adataiban tárolt GPS helyszínét interaktív térképen böngészőben. OpenStreetMap alapú, szerver nélkül.",
  keywords: ["exif gps térkép", "kép helyszín", "fotó gps koordináta", "exif helymeghatározás"],
  status: "active",
  component: "ExifTerkep",
  inputFormats: ["image/jpeg"],
  outputFormat: "text/plain",
  acceptMultiple: false,
  related: ["cititor-metadata-exif", "stergere-metadata", "heic-jpg", "jpg-png"],
  updatedAt: "2026-03-01",
  faq: [
    { q: "Milyen képformátumokból olvasható GPS adat?", a: "GPS adatot szinte kizárólag JPEG fájlok tartalmaznak, amelyeket digitális fényképezőgépek, okostelefonok rögzítenek." },
    { q: "Az adatok biztonságosak?", a: "Igen, az összes feldolgozás a böngésződben zajlik, a képed és a koordinátáid nem kerülnek szerverre." },
    { q: "Mit tegyek ha nem látok koordinátákat?", a: "Nem minden fotóban van GPS adat. Ha a fényképezőn ki volt kapcsolva a helymeghatározás, vagy a kép szerkesztőprogramban megnyitva lett mentve, elveszhet az EXIF." },
  ],
},

// P3-4: Sprite Sheet Vágó
{
  slug: "sprite-vagas",
  category: "kep",
  title: "Sprite Sheet Vágó | Képszeletelő | Konvertalo.hu",
  h1: "Sprite Sheet Vágó – Képek Kiszeletelése",
  description: "Várd fel a sprite sheet-et egyedi képekre megadott rácsméret alapján böngészőben. Játékfejlesztőknek, UI designereknek.",
  keywords: ["sprite sheet vágó", "sprite cutter", "képszeletelés", "sprite export"],
  status: "active",
  component: "SpriteVago",
  inputFormats: ["image/jpeg", "image/png", "image/webp"],
  outputFormat: "image/png",
  acceptMultiple: false,
  related: ["decupare-imagine", "redimensionare-imagini", "impachetare-zip-imagini", "rotire-90-grade"],
  updatedAt: "2026-03-01",
  faq: [
    { q: "Mi az a sprite sheet?", a: "Egy sprite sheet egyetlen nagy képfájl, amely több kisebb képet (például animációs kereteket, ikonokat, játékbeli karaktereket) tartalmaz egységes rácsban." },
    { q: "Hogyan kell beállítani a vágást?", a: "Add meg az egy cella szélességét és magasságát pixelben. Az eszköz automatikusan kiszámítja, hány sor és oszlop van, és egyenként exportálja a cellákat." },
    { q: "Milyen formátumban tölthetők le a kivágott képek?", a: "ZIP archívumban, ahol minden cella `sprite-0-0.png`, `sprite-0-1.png` stb. névvel kerül be." },
  ],
},
```

---

## 2. lépés: Svelte komponensek létrehozása

Minden fájl helye: `src/components/tools/kep/`

### 2.1 HeicJpgTool.svelte és HeicPngTool.svelte

Mindkét fájl azonos struktúrán alapul – a `targetFormat` prop határozza meg a kimenetet.

**`src/components/tools/kep/HeicJpgTool.svelte`**:

```svelte
<script lang="ts">
  import { ui } from "../../lib/ui-labels.ts";
  import Dropzone from "../ui/Dropzone.svelte";
  import ConvertButton from "../ui/ConvertButton.svelte";
  import ProgressQueue from "../ui/ProgressQueue.svelte";
  import { getTimingConfig } from "../../lib/timing-config.ts";
  import { trackToolEvent } from "../../lib/analytics.ts";

  const timing = getTimingConfig("heic-jpg");
  const TARGET_FORMAT = "image/jpeg";
  const TARGET_EXT = "jpg";

  let files: File[] = [];
  let results: { name: string; blob: Blob }[] = [];
  let processing = false;
  let progress = 0;
  let errorMsg = "";

  async function handleFiles(event: CustomEvent<File[]>) {
    files = event.detail;
    results = [];
    errorMsg = "";
  }

  async function convert() {
    if (!files.length) return;
    processing = true;
    progress = 0;
    errorMsg = "";
    trackToolEvent("heic-jpg", "convert_start");

    try {
      // Dinamikus import – csak szükség esetén töltődik be
      const heic2any = (await import("heic2any")).default;
      results = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        try {
          const blob = await heic2any({
            blob: file,
            toType: TARGET_FORMAT,
            quality: 0.9,
          }) as Blob;

          const baseName = file.name.replace(/\.(heic|heif)$/i, "");
          results.push({ name: `${baseName}.${TARGET_EXT}`, blob });
        } catch (e) {
          console.error(`${file.name} konvertálása sikertelen:`, e);
        }
        progress = Math.round(((i + 1) / files.length) * 100);
      }

      trackToolEvent("heic-jpg", "convert_done", { count: results.length });
    } catch (e) {
      errorMsg = ui.errorGeneric ?? "Hiba történt a konverzió során.";
      trackToolEvent("heic-jpg", "error");
    } finally {
      processing = false;
    }
  }

  async function download() {
    if (!results.length) return;
    trackToolEvent("heic-jpg", "download");

    if (results.length === 1) {
      const url = URL.createObjectURL(results[0].blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = results[0].name;
      a.click();
      URL.revokeObjectURL(url);
    } else {
      // ZIP csomagolás fflate-tal (már a projektben van)
      const { zip } = await import("fflate");
      trackToolEvent("heic-jpg", "zip_download");

      const zipFiles: Record<string, Uint8Array> = {};
      for (const r of results) {
        const buf = await r.blob.arrayBuffer();
        zipFiles[r.name] = new Uint8Array(buf);
      }

      zip(zipFiles, {}, (err, data) => {
        if (err) return;
        const blob = new Blob([data], { type: "application/zip" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `heic-to-${TARGET_EXT}.zip`;
        a.click();
        URL.revokeObjectURL(url);
      });
    }
  }
</script>

<div class="tool-ui">
  <Dropzone
    accept=".heic,.heif"
    multiple={true}
    on:files={handleFiles}
  />

  {#if errorMsg}
    <p class="tool-error">{errorMsg}</p>
  {/if}

  {#if processing}
    <ProgressQueue {progress} label={ui.converting ?? "Konvertálás..."} />
  {/if}

  {#if results.length > 0 && !processing}
    <div class="tool-result-summary">
      <p>{results.length} fájl sikeresen konvertálva.</p>
    </div>
  {/if}

  <ConvertButton
    {timing}
    canConvert={files.length > 0 && !processing}
    onConvert={convert}
    onDownload={download}
    hasResult={results.length > 0}
  />
</div>
```

**`src/components/tools/kep/HeicPngTool.svelte`**: Ugyanez, de `TARGET_FORMAT = "image/png"`, `TARGET_EXT = "png"`, timing slug `"heic-png"`, tracking slug `"heic-png"`.

---

### 2.2 JpgAvifTool.svelte és PngAvifTool.svelte

Az AVIF encode WASM alapú – Web Workerben fut az UI blokkolásának elkerülése érdekében.

**`src/components/tools/kep/JpgAvifTool.svelte`**:

```svelte
<script lang="ts">
  import { ui } from "../../lib/ui-labels.ts";
  import Dropzone from "../ui/Dropzone.svelte";
  import ConvertButton from "../ui/ConvertButton.svelte";
  import ProgressQueue from "../ui/ProgressQueue.svelte";
  import { getTimingConfig } from "../../lib/timing-config.ts";
  import { trackToolEvent } from "../../lib/analytics.ts";

  const timing = getTimingConfig("jpg-avif");
  const INPUT_ACCEPT = "image/jpeg";
  const TOOL_SLUG = "jpg-avif";

  let files: File[] = [];
  let results: { name: string; blob: Blob }[] = [];
  let processing = false;
  let progress = 0;
  let quality = 60; // AVIF CQ érték (alacsonyabb = jobb minőség, nagyobb fájl; 0-63)
  let lossless = false;

  async function handleFiles(event: CustomEvent<File[]>) {
    files = event.detail;
    results = [];
  }

  async function convert() {
    if (!files.length) return;
    processing = true;
    progress = 0;
    trackToolEvent(TOOL_SLUG, "convert_start");

    try {
      const { encode, decode } = await import("@jsquash/avif");
      results = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const imageBitmap = await createImageBitmap(file);

        // ImageBitmap → ImageData via OffscreenCanvas
        const canvas = new OffscreenCanvas(imageBitmap.width, imageBitmap.height);
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(imageBitmap, 0, 0);
        const imageData = ctx.getImageData(0, 0, imageBitmap.width, imageBitmap.height);
        imageBitmap.close();

        const avifBuffer = await encode(imageData, {
          quality: lossless ? 0 : quality,
          qualityAlpha: lossless ? 0 : quality,
        });

        const blob = new Blob([avifBuffer], { type: "image/avif" });
        const baseName = file.name.replace(/\.(jpg|jpeg)$/i, "");
        results.push({ name: `${baseName}.avif`, blob });
        progress = Math.round(((i + 1) / files.length) * 100);
      }

      trackToolEvent(TOOL_SLUG, "convert_done", { count: results.length });
    } catch (e) {
      console.error(e);
      trackToolEvent(TOOL_SLUG, "error");
    } finally {
      processing = false;
    }
  }

  async function download() {
    if (!results.length) return;
    trackToolEvent(TOOL_SLUG, "download");

    if (results.length === 1) {
      const url = URL.createObjectURL(results[0].blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = results[0].name;
      a.click();
      URL.revokeObjectURL(url);
    } else {
      const { zip } = await import("fflate");
      trackToolEvent(TOOL_SLUG, "zip_download");
      const zipFiles: Record<string, Uint8Array> = {};
      for (const r of results) {
        zipFiles[r.name] = new Uint8Array(await r.blob.arrayBuffer());
      }
      zip(zipFiles, {}, (err, data) => {
        if (err) return;
        const url = URL.createObjectURL(new Blob([data], { type: "application/zip" }));
        const a = document.createElement("a");
        a.href = url;
        a.download = "jpg-to-avif.zip";
        a.click();
        URL.revokeObjectURL(url);
      });
    }
  }
</script>

<div class="tool-ui">
  <Dropzone accept={INPUT_ACCEPT} multiple={true} on:files={handleFiles} />

  <div class="tool-options">
    <label>
      {ui.quality ?? "Minőség"}: {lossless ? "Veszteségmentes" : quality}
      {#if !lossless}
        <input type="range" min="1" max="63" bind:value={quality} />
      {/if}
    </label>
    <label>
      <input type="checkbox" bind:checked={lossless} />
      {ui.lossless ?? "Veszteségmentes"}
    </label>
  </div>

  {#if processing}
    <ProgressQueue {progress} label={ui.converting ?? "Konvertálás..."} />
  {/if}

  {#if results.length > 0 && !processing}
    <p class="tool-result-summary">{results.length} AVIF fájl elkészült.</p>
  {/if}

  <ConvertButton
    {timing}
    canConvert={files.length > 0 && !processing}
    onConvert={convert}
    onDownload={download}
    hasResult={results.length > 0}
  />
</div>
```

**`src/components/tools/kep/PngAvifTool.svelte`**: Ugyanez, `INPUT_ACCEPT = "image/png"`, `TOOL_SLUG = "png-avif"`, letöltési fájlnév `"png-to-avif.zip"`.

---

### 2.3 KepBase64Tool.svelte

```svelte
<script lang="ts">
  import { ui } from "../../lib/ui-labels.ts";
  import Dropzone from "../ui/Dropzone.svelte";
  import { trackToolEvent } from "../../lib/analytics.ts";

  let file: File | null = null;
  let dataUri = "";
  let copied = false;
  let outputFormat: "img" | "css" | "raw" = "img";

  async function handleFiles(event: CustomEvent<File[]>) {
    file = event.detail[0] ?? null;
    if (!file) return;
    trackToolEvent("kep-base64", "convert_start");

    const reader = new FileReader();
    reader.onload = (e) => {
      dataUri = e.target?.result as string ?? "";
      trackToolEvent("kep-base64", "convert_done");
    };
    reader.readAsDataURL(file);
  }

  function getOutput(): string {
    if (!dataUri) return "";
    if (outputFormat === "img") return `<img src="${dataUri}" alt="">`;
    if (outputFormat === "css") return `background-image: url('${dataUri}');`;
    return dataUri;
  }

  async function copyToClipboard() {
    await navigator.clipboard.writeText(getOutput());
    copied = true;
    setTimeout(() => (copied = false), 2000);
    trackToolEvent("kep-base64", "download");
  }
</script>

<div class="tool-ui">
  <Dropzone
    accept="image/jpeg,image/png,image/webp,image/svg+xml,image/gif"
    multiple={false}
    on:files={handleFiles}
  />

  {#if dataUri}
    <div class="tool-options">
      <label>
        <input type="radio" bind:group={outputFormat} value="img" /> HTML &lt;img&gt;
      </label>
      <label>
        <input type="radio" bind:group={outputFormat} value="css" /> CSS background
      </label>
      <label>
        <input type="radio" bind:group={outputFormat} value="raw" /> Raw Base64
      </label>
    </div>

    <div class="tool-result">
      <textarea
        readonly
        rows="4"
        value={getOutput()}
        class="tool-textarea"
      ></textarea>
      <button class="btn-copy" on:click={copyToClipboard}>
        {copied ? (ui.copied ?? "Másolva!") : (ui.copy ?? "Másolás")}
      </button>
      <p class="tool-meta">
        Méret: {Math.round(dataUri.length / 1024)} KB (Base64 ~33%-kal nagyobb az eredetinél)
      </p>
    </div>
  {/if}
</div>
```

---

### 2.4 KepIcoTool.svelte

Az ICO formátumot Canvas API-val generáljuk: minden mérethez rajzolunk egy canvas-t, majd összecsomagoljuk az ICO bináris struktúrába.

```svelte
<script lang="ts">
  import { ui } from "../../lib/ui-labels.ts";
  import Dropzone from "../ui/Dropzone.svelte";
  import ConvertButton from "../ui/ConvertButton.svelte";
  import { getTimingConfig } from "../../lib/timing-config.ts";
  import { trackToolEvent } from "../../lib/analytics.ts";

  const timing = getTimingConfig("kep-ico");
  const ICO_SIZES = [16, 32, 48];

  let file: File | null = null;
  let resultBlob: Blob | null = null;

  async function handleFiles(event: CustomEvent<File[]>) {
    file = event.detail[0] ?? null;
    resultBlob = null;
  }

  async function convert() {
    if (!file) return;
    trackToolEvent("kep-ico", "convert_start");

    try {
      const img = await createImageBitmap(file);
      const pngBuffers: ArrayBuffer[] = [];

      // Minden mérethez PNG buffer generálása
      for (const size of ICO_SIZES) {
        const canvas = new OffscreenCanvas(size, size);
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0, size, size);
        const blob = await canvas.convertToBlob({ type: "image/png" });
        pngBuffers.push(await blob.arrayBuffer());
      }
      img.close();

      // ICO bináris összeállítása
      resultBlob = buildIcoBlob(pngBuffers, ICO_SIZES);
      trackToolEvent("kep-ico", "convert_done");
    } catch (e) {
      console.error(e);
      trackToolEvent("kep-ico", "error");
    }
  }

  function buildIcoBlob(pngBuffers: ArrayBuffer[], sizes: number[]): Blob {
    // ICO fájl struktúra:
    // Header: 6 byte
    // Directory: 16 byte × N (képek száma)
    // Képadatok: egymás után

    const count = sizes.length;
    const headerSize = 6;
    const dirEntrySize = 16;
    const dirSize = dirEntrySize * count;
    let dataOffset = headerSize + dirSize;

    // Header
    const header = new DataView(new ArrayBuffer(headerSize));
    header.setUint16(0, 0, true);  // reserved
    header.setUint16(2, 1, true);  // type: 1 = ICO
    header.setUint16(4, count, true);

    const dirParts: ArrayBuffer[] = [header.buffer];
    const dataParts: ArrayBuffer[] = [];

    for (let i = 0; i < count; i++) {
      const png = pngBuffers[i];
      const size = sizes[i];
      const entry = new DataView(new ArrayBuffer(dirEntrySize));
      entry.setUint8(0, size === 256 ? 0 : size);  // width
      entry.setUint8(1, size === 256 ? 0 : size);  // height
      entry.setUint8(2, 0);   // color count
      entry.setUint8(3, 0);   // reserved
      entry.setUint16(4, 1, true);   // planes
      entry.setUint16(6, 32, true);  // bit count
      entry.setUint32(8, png.byteLength, true);
      entry.setUint32(12, dataOffset, true);
      dataOffset += png.byteLength;
      dirParts.push(entry.buffer);
      dataParts.push(png);
    }

    return new Blob([...dirParts, ...dataParts], { type: "image/x-icon" });
  }

  function download() {
    if (!resultBlob) return;
    trackToolEvent("kep-ico", "download");
    const url = URL.createObjectURL(resultBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "favicon.ico";
    a.click();
    URL.revokeObjectURL(url);
  }
</script>

<div class="tool-ui">
  <Dropzone accept="image/png,image/jpeg,image/webp" multiple={false} on:files={handleFiles} />

  {#if resultBlob}
    <p class="tool-result-summary">ICO fájl elkészült: 16×16, 32×32, 48×48 px</p>
  {/if}

  <ConvertButton
    {timing}
    canConvert={!!file}
    onConvert={convert}
    onDownload={download}
    hasResult={!!resultBlob}
  />
</div>
```

---

### 2.5 AtmeterezesKbTool.svelte

Bináris kereséssel találja meg az optimális JPEG minőséget a célmérethez.

```svelte
<script lang="ts">
  import { ui } from "../../lib/ui-labels.ts";
  import Dropzone from "../ui/Dropzone.svelte";
  import ConvertButton from "../ui/ConvertButton.svelte";
  import { getTimingConfig } from "../../lib/timing-config.ts";
  import { trackToolEvent } from "../../lib/analytics.ts";

  const timing = getTimingConfig("atmeterezas-kb");

  let file: File | null = null;
  let targetKb = 200;
  let resultBlob: Blob | null = null;
  let actualKb = 0;
  let processing = false;

  async function handleFiles(event: CustomEvent<File[]>) {
    file = event.detail[0] ?? null;
    resultBlob = null;
  }

  async function convert() {
    if (!file) return;
    processing = true;
    trackToolEvent("atmeterezas-kb", "convert_start");

    try {
      const img = await createImageBitmap(file);
      const canvas = new OffscreenCanvas(img.width, img.height);
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      img.close();

      const targetBytes = targetKb * 1024;

      // Bináris keresés: 0.01 - 1.0 között keressük az optimális quality-t
      let low = 0.01, high = 1.0, bestBlob: Blob | null = null;

      for (let iter = 0; iter < 12; iter++) {
        const mid = (low + high) / 2;
        const blob = await canvas.convertToBlob({ type: "image/jpeg", quality: mid });

        if (blob.size <= targetBytes) {
          bestBlob = blob;
          low = mid;
        } else {
          high = mid;
        }

        if (high - low < 0.005) break;
      }

      // Ha a legkisebb minőséggel is nagyobb, az eredetit adjuk vissza 10%-os minőséggel
      if (!bestBlob) {
        bestBlob = await canvas.convertToBlob({ type: "image/jpeg", quality: 0.01 });
      }

      resultBlob = bestBlob;
      actualKb = Math.round(resultBlob.size / 1024);
      trackToolEvent("atmeterezas-kb", "convert_done", { targetKb, actualKb });
    } catch (e) {
      console.error(e);
      trackToolEvent("atmeterezas-kb", "error");
    } finally {
      processing = false;
    }
  }

  function download() {
    if (!resultBlob || !file) return;
    trackToolEvent("atmeterezas-kb", "download");
    const url = URL.createObjectURL(resultBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name.replace(/\.[^.]+$/, "") + `-${actualKb}kb.jpg`;
    a.click();
    URL.revokeObjectURL(url);
  }
</script>

<div class="tool-ui">
  <Dropzone accept="image/jpeg,image/png,image/webp" multiple={false} on:files={handleFiles} />

  <div class="tool-options">
    <label>
      Célméret (KB): <strong>{targetKb} KB</strong>
      <input type="range" min="10" max="5000" step="10" bind:value={targetKb} />
    </label>
    <input type="number" min="10" max="10000" bind:value={targetKb} />
  </div>

  {#if file}
    <p class="tool-meta">Eredeti méret: {Math.round(file.size / 1024)} KB</p>
  {/if}

  {#if resultBlob && !processing}
    <p class="tool-result-summary">
      Elkészült: <strong>{actualKb} KB</strong>
      (cél: {targetKb} KB, eltérés: {Math.abs(actualKb - targetKb)} KB)
    </p>
  {/if}

  <ConvertButton
    {timing}
    canConvert={!!file && !processing}
    onConvert={convert}
    onDownload={download}
    hasResult={!!resultBlob}
  />
</div>
```

---

### 2.6 GifKeszito.svelte

```svelte
<script lang="ts">
  import { ui } from "../../lib/ui-labels.ts";
  import Dropzone from "../ui/Dropzone.svelte";
  import ConvertButton from "../ui/ConvertButton.svelte";
  import ProgressQueue from "../ui/ProgressQueue.svelte";
  import { getTimingConfig } from "../../lib/timing-config.ts";
  import { trackToolEvent } from "../../lib/analytics.ts";

  const timing = getTimingConfig("gif-keszito");

  let files: File[] = [];
  let resultBlob: Blob | null = null;
  let processing = false;
  let progress = 0;
  let delay = 100;  // ms frame delay
  let loop = true;

  async function handleFiles(event: CustomEvent<File[]>) {
    files = event.detail;
    resultBlob = null;
  }

  async function convert() {
    if (!files.length) return;
    processing = true;
    progress = 0;
    trackToolEvent("gif-keszito", "convert_start");

    try {
      // gifenc dinamikus import
      const { GIFEncoder, quantize, applyPalette } = await import("gifenc");

      // Az első kép méretét vesszük alapul
      const firstImg = await createImageBitmap(files[0]);
      const WIDTH = firstImg.width;
      const HEIGHT = firstImg.height;
      firstImg.close();

      const gif = GIFEncoder();

      for (let i = 0; i < files.length; i++) {
        const img = await createImageBitmap(files[i]);
        const canvas = new OffscreenCanvas(WIDTH, HEIGHT);
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0, WIDTH, HEIGHT);
        img.close();

        const imageData = ctx.getImageData(0, 0, WIDTH, HEIGHT);
        const palette = quantize(imageData.data, 256);
        const index = applyPalette(imageData.data, palette);

        gif.writeFrame(index, WIDTH, HEIGHT, {
          palette,
          delay,
          repeat: loop ? 0 : -1,
        });

        progress = Math.round(((i + 1) / files.length) * 100);
      }

      gif.finish();
      const buffer = gif.bytes();
      resultBlob = new Blob([buffer], { type: "image/gif" });
      trackToolEvent("gif-keszito", "convert_done", { frames: files.length });
    } catch (e) {
      console.error(e);
      trackToolEvent("gif-keszito", "error");
    } finally {
      processing = false;
    }
  }

  function download() {
    if (!resultBlob) return;
    trackToolEvent("gif-keszito", "download");
    const url = URL.createObjectURL(resultBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "animalt.gif";
    a.click();
    URL.revokeObjectURL(url);
  }
</script>

<div class="tool-ui">
  <Dropzone accept="image/jpeg,image/png,image/webp" multiple={true} on:files={handleFiles} />

  {#if files.length > 0}
    <p class="tool-meta">{files.length} kép kiválasztva</p>
  {/if}

  <div class="tool-options">
    <label>
      Frame delay: <strong>{delay} ms</strong>
      <input type="range" min="20" max="2000" step="10" bind:value={delay} />
    </label>
    <label>
      <input type="checkbox" bind:checked={loop} />
      Végtelen hurok
    </label>
  </div>

  {#if processing}
    <ProgressQueue {progress} label="GIF generálás..." />
  {/if}

  {#if resultBlob && !processing}
    <p class="tool-result-summary">
      GIF elkészült: {Math.round(resultBlob.size / 1024)} KB, {files.length} frame
    </p>
  {/if}

  <ConvertButton
    {timing}
    canConvert={files.length >= 2 && !processing}
    onConvert={convert}
    onDownload={download}
    hasResult={!!resultBlob}
  />
</div>
```

---

### 2.7 GifWebpAnimalt.svelte

```svelte
<script lang="ts">
  import { ui } from "../../lib/ui-labels.ts";
  import Dropzone from "../ui/Dropzone.svelte";
  import ConvertButton from "../ui/ConvertButton.svelte";
  import ProgressQueue from "../ui/ProgressQueue.svelte";
  import { getTimingConfig } from "../../lib/timing-config.ts";
  import { trackToolEvent } from "../../lib/analytics.ts";

  const timing = getTimingConfig("gif-webp-animalt");

  let file: File | null = null;
  let resultBlob: Blob | null = null;
  let processing = false;
  let progress = 0;
  let quality = 80;

  async function handleFiles(event: CustomEvent<File[]>) {
    file = event.detail[0] ?? null;
    resultBlob = null;
  }

  async function convert() {
    if (!file) return;
    processing = true;
    progress = 0;
    trackToolEvent("gif-webp-animalt", "convert_start");

    try {
      const { parseGIF, decompressFrames } = await import("gifuct-js");
      const { animate } = await import("@jsquash/webp");

      const arrayBuffer = await file.arrayBuffer();
      const gif = parseGIF(arrayBuffer);
      const frames = decompressFrames(gif, true);

      if (!frames.length) throw new Error("Nincs frame a GIF-ben");

      const WIDTH = frames[0].dims.width;
      const HEIGHT = frames[0].dims.height;
      const webpFrames = [];

      for (let i = 0; i < frames.length; i++) {
        const frame = frames[i];
        const canvas = new OffscreenCanvas(WIDTH, HEIGHT);
        const ctx = canvas.getContext("2d")!;

        // Frame patch-elés
        const imageData = ctx.createImageData(frame.dims.width, frame.dims.height);
        imageData.data.set(frame.patch);
        ctx.putImageData(imageData, frame.dims.left, frame.dims.top);

        const frameImageData = ctx.getImageData(0, 0, WIDTH, HEIGHT);
        webpFrames.push({
          data: frameImageData,
          delay: frame.delay * 10,  // centiseconds → milliseconds
        });

        progress = Math.round(((i + 1) / frames.length) * 100);
      }

      const webpBuffer = await animate(webpFrames, { quality });
      resultBlob = new Blob([webpBuffer], { type: "image/webp" });
      trackToolEvent("gif-webp-animalt", "convert_done", { frames: frames.length });
    } catch (e) {
      console.error(e);
      trackToolEvent("gif-webp-animalt", "error");
    } finally {
      processing = false;
    }
  }

  function download() {
    if (!resultBlob || !file) return;
    trackToolEvent("gif-webp-animalt", "download");
    const url = URL.createObjectURL(resultBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name.replace(/\.gif$/i, "") + ".webp";
    a.click();
    URL.revokeObjectURL(url);
  }
</script>

<div class="tool-ui">
  <Dropzone accept="image/gif" multiple={false} on:files={handleFiles} />

  <div class="tool-options">
    <label>
      Minőség: {quality}%
      <input type="range" min="1" max="100" bind:value={quality} />
    </label>
  </div>

  {#if processing}
    <ProgressQueue {progress} label="Frame-ek feldolgozása..." />
  {/if}

  {#if resultBlob && !processing}
    <p class="tool-result-summary">
      Animált WebP elkészült: {Math.round(resultBlob.size / 1024)} KB
    </p>
  {/if}

  <ConvertButton
    {timing}
    canConvert={!!file && !processing}
    onConvert={convert}
    onDownload={download}
    hasResult={!!resultBlob}
  />
</div>
```

---

### 2.8 SvgPngTool.svelte

```svelte
<script lang="ts">
  import { ui } from "../../lib/ui-labels.ts";
  import Dropzone from "../ui/Dropzone.svelte";
  import ConvertButton from "../ui/ConvertButton.svelte";
  import { getTimingConfig } from "../../lib/timing-config.ts";
  import { trackToolEvent } from "../../lib/analytics.ts";

  const timing = getTimingConfig("svg-png");

  let file: File | null = null;
  let resultBlob: Blob | null = null;
  let outputFormat: "image/png" | "image/jpeg" = "image/png";
  let targetWidth = 0;  // 0 = eredeti méret
  let naturalWidth = 0;
  let naturalHeight = 0;

  async function handleFiles(event: CustomEvent<File[]>) {
    file = event.detail[0] ?? null;
    resultBlob = null;
    if (!file) return;

    // SVG natural size kiolvasása
    const text = await file.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "image/svg+xml");
    const svg = doc.querySelector("svg");
    naturalWidth = parseInt(svg?.getAttribute("width") ?? "0") || 512;
    naturalHeight = parseInt(svg?.getAttribute("height") ?? "0") || 512;
    targetWidth = naturalWidth;
  }

  async function convert() {
    if (!file) return;
    trackToolEvent("svg-png", "convert_start");

    try {
      const url = URL.createObjectURL(file);
      const img = new Image();

      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = reject;
        img.src = url;
      });

      const scale = targetWidth > 0 ? targetWidth / img.naturalWidth : 1;
      const W = Math.round(img.naturalWidth * scale);
      const H = Math.round(img.naturalHeight * scale);

      const canvas = new OffscreenCanvas(W, H);
      const ctx = canvas.getContext("2d")!;
      if (outputFormat === "image/jpeg") {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, W, H);
      }
      ctx.drawImage(img, 0, 0, W, H);
      URL.revokeObjectURL(url);

      resultBlob = await canvas.convertToBlob({ type: outputFormat, quality: 0.92 });
      trackToolEvent("svg-png", "convert_done");
    } catch (e) {
      console.error(e);
      trackToolEvent("svg-png", "error");
    }
  }

  function download() {
    if (!resultBlob || !file) return;
    trackToolEvent("svg-png", "download");
    const ext = outputFormat === "image/png" ? "png" : "jpg";
    const url = URL.createObjectURL(resultBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name.replace(/\.svg$/i, "") + `.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  }
</script>

<div class="tool-ui">
  <Dropzone accept="image/svg+xml,.svg" multiple={false} on:files={handleFiles} />

  {#if naturalWidth > 0}
    <div class="tool-options">
      <label>
        Kimenet: 
        <select bind:value={outputFormat}>
          <option value="image/png">PNG</option>
          <option value="image/jpeg">JPG</option>
        </select>
      </label>
      <label>
        Szélesség (px):
        <input type="number" min="16" max="8000" bind:value={targetWidth} />
        <small>Eredeti: {naturalWidth}×{naturalHeight}px</small>
      </label>
    </div>
  {/if}

  <ConvertButton
    {timing}
    canConvert={!!file}
    onConvert={convert}
    onDownload={download}
    hasResult={!!resultBlob}
  />
</div>
```

---

### 2.9 KepCollage.svelte

```svelte
<script lang="ts">
  import { ui } from "../../lib/ui-labels.ts";
  import Dropzone from "../ui/Dropzone.svelte";
  import ConvertButton from "../ui/ConvertButton.svelte";
  import { getTimingConfig } from "../../lib/timing-config.ts";
  import { trackToolEvent } from "../../lib/analytics.ts";

  const timing = getTimingConfig("kep-collage");

  let files: File[] = [];
  let resultBlob: Blob | null = null;
  let layout: "horizontal" | "vertical" | "grid" = "horizontal";
  let gap = 8;
  let bgColor = "#ffffff";

  async function handleFiles(event: CustomEvent<File[]>) {
    files = event.detail;
    resultBlob = null;
  }

  async function convert() {
    if (files.length < 2) return;
    trackToolEvent("kep-collage", "convert_start");

    try {
      const bitmaps = await Promise.all(files.map(f => createImageBitmap(f)));

      let canvas: OffscreenCanvas;
      const ctx_temp = new OffscreenCanvas(1, 1).getContext("2d")!;

      if (layout === "horizontal") {
        const totalW = bitmaps.reduce((s, b) => s + b.width, 0) + gap * (bitmaps.length - 1);
        const maxH = Math.max(...bitmaps.map(b => b.height));
        canvas = new OffscreenCanvas(totalW, maxH);
        const ctx = canvas.getContext("2d")!;
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, totalW, maxH);
        let x = 0;
        for (const bm of bitmaps) {
          ctx.drawImage(bm, x, 0);
          x += bm.width + gap;
          bm.close();
        }
      } else if (layout === "vertical") {
        const maxW = Math.max(...bitmaps.map(b => b.width));
        const totalH = bitmaps.reduce((s, b) => s + b.height, 0) + gap * (bitmaps.length - 1);
        canvas = new OffscreenCanvas(maxW, totalH);
        const ctx = canvas.getContext("2d")!;
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, maxW, totalH);
        let y = 0;
        for (const bm of bitmaps) {
          ctx.drawImage(bm, 0, y);
          y += bm.height + gap;
          bm.close();
        }
      } else {
        // Grid: négyzetgyök-alapú rács
        const cols = Math.ceil(Math.sqrt(bitmaps.length));
        const rows = Math.ceil(bitmaps.length / cols);
        const cellW = Math.max(...bitmaps.map(b => b.width));
        const cellH = Math.max(...bitmaps.map(b => b.height));
        canvas = new OffscreenCanvas(
          cols * cellW + (cols - 1) * gap,
          rows * cellH + (rows - 1) * gap
        );
        const ctx = canvas.getContext("2d")!;
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < bitmaps.length; i++) {
          const col = i % cols;
          const row = Math.floor(i / cols);
          ctx.drawImage(bitmaps[i], col * (cellW + gap), row * (cellH + gap));
          bitmaps[i].close();
        }
      }

      resultBlob = await canvas.convertToBlob({ type: "image/png" });
      trackToolEvent("kep-collage", "convert_done", { count: files.length, layout });
    } catch (e) {
      console.error(e);
      trackToolEvent("kep-collage", "error");
    }
  }

  function download() {
    if (!resultBlob) return;
    trackToolEvent("kep-collage", "download");
    const url = URL.createObjectURL(resultBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `collage-${layout}.png`;
    a.click();
    URL.revokeObjectURL(url);
  }
</script>

<div class="tool-ui">
  <Dropzone accept="image/jpeg,image/png,image/webp" multiple={true} on:files={handleFiles} />

  <div class="tool-options">
    <label>
      Elrendezés:
      <select bind:value={layout}>
        <option value="horizontal">Vízszintes</option>
        <option value="vertical">Függőleges</option>
        <option value="grid">Rácsos</option>
      </select>
    </label>
    <label>
      Rés (px): {gap}
      <input type="range" min="0" max="50" bind:value={gap} />
    </label>
    <label>
      Háttérszín: <input type="color" bind:value={bgColor} />
    </label>
  </div>

  <ConvertButton
    {timing}
    canConvert={files.length >= 2}
    onConvert={convert}
    onDownload={download}
    hasResult={!!resultBlob}
  />
</div>
```

---

### 2.10 SzinPaletta.svelte

```svelte
<script lang="ts">
  import { ui } from "../../lib/ui-labels.ts";
  import Dropzone from "../ui/Dropzone.svelte";
  import { trackToolEvent } from "../../lib/analytics.ts";

  let file: File | null = null;
  let colors: { hex: string; rgb: string; hsl: string }[] = [];
  let colorCount = 6;
  let previewUrl = "";

  async function handleFiles(event: CustomEvent<File[]>) {
    file = event.detail[0] ?? null;
    colors = [];
    if (file) {
      previewUrl = URL.createObjectURL(file);
      await extractColors();
    }
  }

  async function extractColors() {
    if (!file) return;
    trackToolEvent("szin-paletta", "convert_start");

    try {
      const { default: ColorThief } = await import("color-thief-ts");
      const thief = new ColorThief();
      const img = new Image();
      img.crossOrigin = "anonymous";

      await new Promise<void>((resolve) => {
        img.onload = () => resolve();
        img.src = previewUrl;
      });

      const palette = thief.getPalette(img, colorCount);
      colors = palette.map(([r, g, b]: [number, number, number]) => ({
        hex: `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`,
        rgb: `rgb(${r}, ${g}, ${b})`,
        hsl: rgbToHsl(r, g, b),
      }));

      trackToolEvent("szin-paletta", "convert_done");
    } catch (e) {
      console.error(e);
    }
  }

  function rgbToHsl(r: number, g: number, b: number): string {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }
    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
  }

  async function copyColor(text: string) {
    await navigator.clipboard.writeText(text);
    trackToolEvent("szin-paletta", "download");
  }
</script>

<div class="tool-ui">
  <Dropzone accept="image/jpeg,image/png,image/webp" multiple={false} on:files={handleFiles} />

  {#if file}
    <div class="tool-options">
      <label>
        Színek száma: {colorCount}
        <input type="range" min="3" max="10" bind:value={colorCount}
          on:change={extractColors} />
      </label>
    </div>
  {/if}

  {#if colors.length > 0}
    <div class="color-palette">
      {#each colors as color}
        <div class="color-card">
          <div class="color-swatch" style="background: {color.hex}"></div>
          <div class="color-values">
            <button on:click={() => copyColor(color.hex)}>{color.hex}</button>
            <small>{color.rgb}</small>
            <small>{color.hsl}</small>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>
```

---

### 2.11 AutomatikusVagas.svelte

```svelte
<script lang="ts">
  import { ui } from "../../lib/ui-labels.ts";
  import Dropzone from "../ui/Dropzone.svelte";
  import ConvertButton from "../ui/ConvertButton.svelte";
  import { getTimingConfig } from "../../lib/timing-config.ts";
  import { trackToolEvent } from "../../lib/analytics.ts";

  const timing = getTimingConfig("automatikus-vagas");

  let file: File | null = null;
  let resultBlob: Blob | null = null;
  let tolerance = 10;  // 0-255 szín tolerancia
  let bgColor = "#ffffff";

  async function handleFiles(event: CustomEvent<File[]>) {
    file = event.detail[0] ?? null;
    resultBlob = null;
  }

  function hexToRgb(hex: string): [number, number, number] {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return [r, g, b];
  }

  function isBackground(r: number, g: number, b: number, a: number, bgR: number, bgG: number, bgB: number): boolean {
    if (a < 10) return true;  // Átlátszó pixel = háttér
    return (
      Math.abs(r - bgR) <= tolerance &&
      Math.abs(g - bgG) <= tolerance &&
      Math.abs(b - bgB) <= tolerance
    );
  }

  async function convert() {
    if (!file) return;
    trackToolEvent("automatikus-vagas", "convert_start");

    try {
      const img = await createImageBitmap(file);
      const canvas = new OffscreenCanvas(img.width, img.height);
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      img.close();

      const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = data.data;
      const W = canvas.width, H = canvas.height;
      const [bgR, bgG, bgB] = hexToRgb(bgColor);

      let top = H, bottom = 0, left = W, right = 0;

      for (let y = 0; y < H; y++) {
        for (let x = 0; x < W; x++) {
          const i = (y * W + x) * 4;
          if (!isBackground(pixels[i], pixels[i+1], pixels[i+2], pixels[i+3], bgR, bgG, bgB)) {
            if (y < top) top = y;
            if (y > bottom) bottom = y;
            if (x < left) left = x;
            if (x > right) right = x;
          }
        }
      }

      // 2px padding
      top = Math.max(0, top - 2);
      bottom = Math.min(H - 1, bottom + 2);
      left = Math.max(0, left - 2);
      right = Math.min(W - 1, right + 2);

      const cropW = right - left + 1;
      const cropH = bottom - top + 1;

      if (cropW <= 0 || cropH <= 0) throw new Error("Nem találtam levágható tartalmat.");

      const outCanvas = new OffscreenCanvas(cropW, cropH);
      const outCtx = outCanvas.getContext("2d")!;
      outCtx.drawImage(canvas, left, top, cropW, cropH, 0, 0, cropW, cropH);

      resultBlob = await outCanvas.convertToBlob({ type: "image/png" });
      trackToolEvent("automatikus-vagas", "convert_done");
    } catch (e) {
      console.error(e);
      trackToolEvent("automatikus-vagas", "error");
    }
  }

  function download() {
    if (!resultBlob || !file) return;
    trackToolEvent("automatikus-vagas", "download");
    const url = URL.createObjectURL(resultBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name.replace(/\.[^.]+$/, "") + "-vágott.png";
    a.click();
    URL.revokeObjectURL(url);
  }
</script>

<div class="tool-ui">
  <Dropzone accept="image/jpeg,image/png,image/webp" multiple={false} on:files={handleFiles} />

  <div class="tool-options">
    <label>
      Háttérszín: <input type="color" bind:value={bgColor} />
    </label>
    <label>
      Tolerancia: {tolerance}
      <input type="range" min="0" max="80" bind:value={tolerance} />
    </label>
  </div>

  <ConvertButton
    {timing}
    canConvert={!!file}
    onConvert={convert}
    onDownload={download}
    hasResult={!!resultBlob}
  />
</div>
```

---

### 2.12 ExifTerkep.svelte

```svelte
<script lang="ts">
  import { ui } from "../../lib/ui-labels.ts";
  import Dropzone from "../ui/Dropzone.svelte";
  import { trackToolEvent } from "../../lib/analytics.ts";
  import { onMount, onDestroy } from "svelte";

  let file: File | null = null;
  let gpsData: { lat: number; lon: number; alt?: number } | null = null;
  let exifData: Record<string, string> = {};
  let mapContainer: HTMLDivElement;
  let leafletMap: any = null;
  let noGps = false;

  async function handleFiles(event: CustomEvent<File[]>) {
    file = event.detail[0] ?? null;
    gpsData = null;
    noGps = false;
    exifData = {};
    if (leafletMap) { leafletMap.remove(); leafletMap = null; }
    if (!file) return;

    trackToolEvent("exif-terkep", "convert_start");

    try {
      const { default: exifr } = await import("exifr");
      const result = await exifr.parse(file, { gps: true });

      if (result?.latitude && result?.longitude) {
        gpsData = {
          lat: result.latitude,
          lon: result.longitude,
          alt: result.GPSAltitude,
        };
        exifData = {
          "GPS": `${gpsData.lat.toFixed(6)}, ${gpsData.lon.toFixed(6)}`,
          ...(gpsData.alt ? { "Magasság": `${Math.round(gpsData.alt)} m` } : {}),
          ...(result.Make ? { "Gyártó": result.Make } : {}),
          ...(result.Model ? { "Modell": result.Model } : {}),
          ...(result.DateTimeOriginal ? { "Dátum": result.DateTimeOriginal.toLocaleString("hu-HU") } : {}),
        };
        trackToolEvent("exif-terkep", "convert_done");
        await initMap();
      } else {
        noGps = true;
      }
    } catch (e) {
      console.error(e);
      noGps = true;
    }
  }

  async function initMap() {
    if (!gpsData || !mapContainer) return;

    // Leaflet dinamikus betöltés
    const L = await import("leaflet");
    await import("leaflet/dist/leaflet.css");

    leafletMap = L.map(mapContainer).setView([gpsData.lat, gpsData.lon], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
      maxZoom: 19,
    }).addTo(leafletMap);

    L.marker([gpsData.lat, gpsData.lon])
      .addTo(leafletMap)
      .bindPopup(`📍 ${gpsData.lat.toFixed(6)}, ${gpsData.lon.toFixed(6)}`)
      .openPopup();
  }

  onDestroy(() => {
    if (leafletMap) leafletMap.remove();
  });
</script>

<div class="tool-ui">
  <Dropzone accept="image/jpeg" multiple={false} on:files={handleFiles} />

  {#if noGps}
    <p class="tool-warning">Ebben a képben nincs GPS adat. Próbálj egy okostelefonnal készített, szerkesztetlen fotót.</p>
  {/if}

  {#if gpsData}
    <div class="exif-data">
      {#each Object.entries(exifData) as [key, val]}
        <div class="exif-row"><strong>{key}:</strong> {val}</div>
      {/each}
    </div>
    <div bind:this={mapContainer} class="exif-map" style="height: 400px; border-radius: 8px;"></div>
  {/if}
</div>
```

> **Megjegyzés**: A `exifr` csomagot fel kell venni: `npm install exifr leaflet @types/leaflet`. A Leaflet CSS dinamikus importáláshoz szükség lehet `?url` Vite trick-re: `import leafletCss from "leaflet/dist/leaflet.css?url"` majd `<link rel="stylesheet" href={leafletCss}>`.

---

### 2.13 SpriteVago.svelte

```svelte
<script lang="ts">
  import { ui } from "../../lib/ui-labels.ts";
  import Dropzone from "../ui/Dropzone.svelte";
  import ConvertButton from "../ui/ConvertButton.svelte";
  import { getTimingConfig } from "../../lib/timing-config.ts";
  import { trackToolEvent } from "../../lib/analytics.ts";

  const timing = getTimingConfig("sprite-vagas");

  let file: File | null = null;
  let cellW = 32, cellH = 32;
  let cols = 0, rows = 0, imgW = 0, imgH = 0;
  let processing = false;

  async function handleFiles(event: CustomEvent<File[]>) {
    file = event.detail[0] ?? null;
    if (!file) return;
    const bm = await createImageBitmap(file);
    imgW = bm.width; imgH = bm.height;
    bm.close();
    updateGrid();
  }

  function updateGrid() {
    cols = imgW > 0 && cellW > 0 ? Math.floor(imgW / cellW) : 0;
    rows = imgH > 0 && cellH > 0 ? Math.floor(imgH / cellH) : 0;
  }

  $: if (imgW > 0) updateGrid();

  async function convert() {
    if (!file || cols <= 0 || rows <= 0) return;
    processing = true;
    trackToolEvent("sprite-vagas", "convert_start");

    try {
      const img = await createImageBitmap(file);
      const { zip } = await import("fflate");
      const zipFiles: Record<string, Uint8Array> = {};

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const canvas = new OffscreenCanvas(cellW, cellH);
          const ctx = canvas.getContext("2d")!;
          ctx.drawImage(img, col * cellW, row * cellH, cellW, cellH, 0, 0, cellW, cellH);
          const blob = await canvas.convertToBlob({ type: "image/png" });
          const rowStr = row.toString().padStart(2, "0");
          const colStr = col.toString().padStart(2, "0");
          zipFiles[`sprite-${rowStr}-${colStr}.png`] = new Uint8Array(await blob.arrayBuffer());
        }
      }

      img.close();

      zip(zipFiles, {}, (err, data) => {
        if (err) return;
        const url = URL.createObjectURL(new Blob([data], { type: "application/zip" }));
        const a = document.createElement("a");
        a.href = url;
        a.download = "sprite-frames.zip";
        a.click();
        URL.revokeObjectURL(url);
        trackToolEvent("sprite-vagas", "zip_download");
      });
    } catch (e) {
      console.error(e);
      trackToolEvent("sprite-vagas", "error");
    } finally {
      processing = false;
    }
  }
</script>

<div class="tool-ui">
  <Dropzone accept="image/png,image/jpeg,image/webp" multiple={false} on:files={handleFiles} />

  {#if imgW > 0}
    <div class="tool-options">
      <label>Cella szélesség (px): <input type="number" min="1" max={imgW} bind:value={cellW} on:change={updateGrid} /></label>
      <label>Cella magasság (px): <input type="number" min="1" max={imgH} bind:value={cellH} on:change={updateGrid} /></label>
    </div>
    {#if cols > 0 && rows > 0}
      <p class="tool-meta">{cols} × {rows} rács → {cols * rows} kép</p>
    {/if}
  {/if}

  <ConvertButton
    {timing}
    canConvert={!!file && cols > 0 && rows > 0 && !processing}
    onConvert={convert}
    onDownload={() => {}}
    hasResult={false}
  />
</div>
```

---

## 3. lépés: DynamicTool.svelte – regisztrálás

**Fájl**: `src/components/tools/DynamicTool.svelte`

A `COMPONENT_IMPORTS` map-hez add hozzá:

```typescript
// Képeszközök – új bejegyzések
HeicJpgTool:       () => import("../tools/kep/HeicJpgTool.svelte"),
HeicPngTool:       () => import("../tools/kep/HeicPngTool.svelte"),
JpgAvifTool:       () => import("../tools/kep/JpgAvifTool.svelte"),
PngAvifTool:       () => import("../tools/kep/PngAvifTool.svelte"),
KepBase64Tool:     () => import("../tools/kep/KepBase64Tool.svelte"),
KepIcoTool:        () => import("../tools/kep/KepIcoTool.svelte"),
AtmeterezesKbTool: () => import("../tools/kep/AtmeterezesKbTool.svelte"),
GifKeszito:        () => import("../tools/kep/GifKeszito.svelte"),
GifWebpAnimalt:    () => import("../tools/kep/GifWebpAnimalt.svelte"),
SvgPngTool:        () => import("../tools/kep/SvgPngTool.svelte"),
KepCollage:        () => import("../tools/kep/KepCollage.svelte"),
SzinPaletta:       () => import("../tools/kep/SzinPaletta.svelte"),
AutomatikusVagas:  () => import("../tools/kep/AutomatikusVagas.svelte"),
ExifTerkep:        () => import("../tools/kep/ExifTerkep.svelte"),
SpriteVago:        () => import("../tools/kep/SpriteVago.svelte"),
```

---

## 4. lépés: timing-config.ts – delay beállítások

**Fájl**: `src/lib/timing-config.ts`

A `TOOL_TIMING` objektumhoz add hozzá:

```typescript
// Kép eszközök – 3s delay (default, nem kell külön bejegyezni, hacsak nem eltérő)
// Azonnali feedback eszközök:
"kep-base64":    { delayBeforeConvert: 0, delayBeforeDownload: 0 },
"szin-paletta":  { delayBeforeConvert: 0, delayBeforeDownload: 0 },
"exif-terkep":   { delayBeforeConvert: 0, delayBeforeDownload: 0 },
```

---

## 5. lépés: kep-content.ts – Magyar SEO tartalom

**Fájl**: `src/lib/content/kep-content.ts`

A `KEP_CONTENT: ContentMap` objektumhoz add hozzá az összes új eszközt. Minden bejegyzés ugyanazt a `ToolSEOData` struktúrát követi. Íme a teljes sablon minden eszközre:

```typescript
"heic-jpg": {
  introText: "A HEIC (High Efficiency Image Container) az iPhone és iPad alapértelmezett képformátuma iOS 11 óta. Bár kiváló tömörítést nyújt, sok Windows program, weboldal és szerkesztőeszköz nem tudja megnyitni. Ez az eszköz böngészőben, szerver nélkül alakítja át a HEIC fájlokat universálisan kompatibilis JPG formátumba.",
  guide: [
    "1. Húzd be vagy tallózd ki a HEIC fájl(oka)t az eszközbe.",
    "2. Az eszköz automatikusan konvertálja a fájlokat 90%-os JPG minőséggel.",
    "3. Egyetlen fájlnál közvetlenül letölthető; több fájlnál ZIP archívumban.",
  ],
  faq: [
    { q: "Miért nem nyílik meg a HEIC képem Windows-on?", a: "Windows alapértelmezetten nem tartalmaz HEIC dekódert. Konvertáld JPG-vé, amely minden rendszeren megnyílik." },
    { q: "Elvész a kép minősége?", a: "90%-os JPG minőséggel konvertálunk, ami szemmel alig észrevehető különbséget jelent." },
  ],
  content: {
    howToSteps: [
      { title: "Fájl kiválasztása", description: "Húzd be a HEIC fájlt az eszközbe, vagy kattints a tallózás gombra. Egyszerre több fájl is feltölthető." },
      { title: "Automatikus konverzió", description: "Az eszköz azonnal elkezdi a feldolgozást. A HEIC/HEIF dekódolás WebAssembly-vel, böngészőben zajlik." },
      { title: "Letöltés", description: "Egyetlen fájlnál JPG-ként töltsd le. Több fájlnál ZIP archívumba csomagolva kerülnek a JPG fájlok." },
    ],
    useCases: [
      { icon: "📱", title: "iPhone fotók megosztása", description: "Az iPhone-ról átmásolt fotók HEIC formátumban érkeznek. Konvertálással mindenki meg tudja nyitni őket." },
      { icon: "💼", title: "Önéletrajz és pályázat", description: "Hatósági rendszerek és HR szoftverek általában JPG-t fogadnak el, HEIC-et nem." },
      { icon: "🖥️", title: "Windows kompatibilitás", description: "Windows Photo Viewer és a legtöbb szerkesztőprogram JPG-t kezel, HEIC-et nem feltétlenül." },
    ],
    aboutSection: {
      title: "A HEIC formátumról",
      paragraphs: [
        "A HEIC (High Efficiency Image Coding) az Apple által adoptált képformátum, amely az HEVC (H.265) videokodeken alapul. Fő előnye, hogy azonos képminőség mellett körülbelül feleakkora fájlméretet eredményez, mint a JPEG.",
        "Hátránya az alacsony kompatibilitás: Windows, Android és legtöbb webalkalmazás alapértelmezetten nem tudja megnyitni. Éppen ezért a JPG-vé konvertálás az egyik leggyakoribb képmanipulációs igény iPhone-felhasználók körében.",
      ],
    },
    tips: [
      { icon: "💡", tip: "Ha GPS adatot is szeretnéd megőrizni, a HEIC → JPG konverzió megtartja az EXIF metaadatokat, beleértve a helyszín koordinátáit." },
      { icon: "📦", tip: "Egyszerre akár 50+ HEIC fájlt is feltölthetsz – az eredmény ZIP archívumban kerül letöltésre." },
    ],
  },
},

"heic-png": {
  introText: "A HEIC → PNG konvertáló veszteségmentesen alakítja át iPhone és iPad képeidet PNG formátumba, megőrizve az alfa-csatornát és a teljes képminőséget.",
  guide: [
    "1. Töltsd fel a HEIC/HEIF fájlt vagy fájlokat.",
    "2. Az eszköz PNG-vé konvertálja őket böngészőben.",
    "3. Töltsd le az eredményt.",
  ],
  faq: [
    { q: "Mikor érdemes PNG-t választani JPG helyett?", a: "Ha veszteségmentes minőség kell, vagy ha átlátszóság is szerepel a képben." },
  ],
  content: {
    howToSteps: [
      { title: "Fájl feltöltése", description: "Válaszd ki a HEIC fájlt." },
      { title: "PNG konverzió", description: "Veszteségmentes PNG kimenet alfa-csatornával." },
      { title: "Letöltés", description: "PNG fájlként töltsd le az eredményt." },
    ],
    useCases: [
      { icon: "🎨", title: "Grafikai szerkesztés", description: "PNG formátum szükséges veszteségmentes szerkesztéshez." },
      { icon: "🌐", title: "Webes használat", description: "PNG az egyik legelterjedtebb webes képformátum." },
    ],
    aboutSection: {
      title: "HEIC → PNG konverzió",
      paragraphs: ["A PNG veszteségmentes tömörítést alkalmaz, így ideális logókhoz, ikonokhoz és minden olyan képhez, ahol a minőség nem kompromisszálható."],
    },
  },
},

"jpg-avif": {
  introText: "Az AVIF (AV1 Image File Format) a legmodernebb képformátum, amely 2025-re minden főbb böngészőben támogatott. JPG képeidből AVIF-et generálva akár 50%-kal kisebb fájlméretet érhetsz el – teljesen szerver nélkül, a böngésződben.",
  guide: [
    "1. Töltsd fel a JPG fájlt vagy fájlokat.",
    "2. Állítsd be a kívánt minőséget (1-63 CQ érték, alacsonyabb = jobb).",
    "3. Kattints a Konvertálás gombra.",
    "4. Töltsd le az AVIF fájlt.",
  ],
  faq: [
    { q: "Az AVIF minden böngészőben működik?", a: "Igen, 2025-re Chrome, Firefox, Safari 16+, Edge mind támogatja az AVIF-et." },
    { q: "Mekkora méretmegtakarítás várható?", a: "Tipikusan 40-50% azonos szubjektív minőség mellett a JPEG-hez képest." },
  ],
  content: {
    howToSteps: [
      { title: "JPG feltöltése", description: "Húzd be a JPG fájl(oka)t – tömeges feldolgozás is lehetséges." },
      { title: "Minőség beállítása", description: "A CQ (Constant Quality) értéket 1-63 között állíthatod. 30-40 körüli érték ajánlott webes használatra." },
      { title: "AVIF letöltése", description: "Töltsd le az AVIF fájlt, amelyet közvetlenül beilleszthetsz a weboldaladba." },
    ],
    useCases: [
      { icon: "⚡", title: "Weboldal optimalizálás", description: "Az AVIF a leghatékonyabb módszer a képek méretének csökkentésére a Core Web Vitals javítása érdekében." },
      { icon: "🛒", title: "E-commerce termékképek", description: "Webshop termékképeknél drasztikusan csökkenthető az oldal betöltési ideje AVIF-fel." },
      { icon: "📰", title: "Tartalomoldalak", description: "Cikkek, blogbejegyzések illusztrációinak optimalizálása." },
    ],
    aboutSection: {
      title: "Az AVIF formátumról",
      paragraphs: [
        "Az AVIF az AV1 videokodeken alapuló, royalty-free képformátum. A WebP utódjának tekinthető, mivel általában 20-25%-kal jobb tömörítést nyújt azonos vizuális minőség mellett.",
        "2025-ben az AVIF már Baseline 2024 státuszt ért el, ami azt jelenti, hogy az összes modern böngésző stabilan támogatja. A WebP mellé vagy helyett ideális választás webfejlesztők számára.",
      ],
    },
    formatComparison: {
      title: "Képformátumok összehasonlítása (2000×2000 px termékkép)",
      columns: ["Formátum", "Fájlméret", "Minőség", "Böngésző támogatás"],
      rows: [
        { feature: "JPEG", values: ["~540 KB", "Közepes", "Mindenhol"] },
        { feature: "WebP", values: ["~350 KB", "Jó", "Modern böngészők"] },
        { feature: "AVIF", values: ["~210 KB", "Kiváló", "Modern böngészők (2024+)"] },
      ],
    },
    tips: [
      { icon: "💡", tip: "30-as CQ érték webes használatra optimális: jó minőség, kis méret." },
      { icon: "🔄", tip: "Ha AVIF-et nem tudsz használni, a <picture> elemmel WebP és JPEG fallback-et is megadhat a böngészőnek." },
    ],
  },
},

"png-avif": {
  introText: "Konvertáld PNG képeidet AVIF formátumba böngészőben – az átlátszóság (alfa-csatorna) teljes megőrzésével. Az AVIF veszteségmentes módban is kisebb fájlméretet nyújt, mint a PNG.",
  guide: [
    "1. Töltsd fel a PNG fájlt.",
    "2. Válaszd ki a módot: veszteséges (kisebb méret) vagy veszteségmentes.",
    "3. Konvertálj és töltsd le az AVIF-et.",
  ],
  faq: [
    { q: "Az AVIF megőrzi az átlátszóságot?", a: "Igen, az AVIF teljes alfa-csatorna támogatással rendelkezik." },
  ],
  content: {
    howToSteps: [
      { title: "PNG feltöltése", description: "Válaszd ki a PNG fájlt, akár átlátszó háttérrel." },
      { title: "Mód kiválasztása", description: "Veszteséges (kisebb méret) vagy veszteségmentes (azonos minőség, kisebb méret mint PNG)." },
      { title: "AVIF letöltése", description: "Töltsd le az eredményt." },
    ],
    useCases: [
      { icon: "🖼️", title: "UI elemek és ikonok", description: "Átlátszó hátterű UI elemek optimalizálása." },
      { icon: "🎨", title: "Logók és grafika", description: "Vektoros exportok és logók." },
    ],
    aboutSection: {
      title: "PNG vs AVIF",
      paragraphs: ["Az AVIF veszteségmentes módban általában 10-20%-kal kisebb fájlméretet ér el, mint a PNG, miközben teljesen azonos képminőséget nyújt."],
    },
  },
},

"kep-base64": {
  introText: "A Base64 kódolás lehetővé teszi, hogy képet közvetlenül HTML vagy CSS fájlba ágyazz be, külön HTTP kérés nélkül. Kis ikonokhoz, e-mail sablonokhoz és inline CSS háttérképekhez ideális megoldás.",
  guide: [
    "1. Töltsd fel a képet (JPG, PNG, WebP, SVG, GIF).",
    "2. Válaszd ki a kimeneti formátumot: HTML <img>, CSS background-image, vagy nyers Base64.",
    "3. Másold a vágólapra a generált kódot.",
  ],
  faq: [
    { q: "Mikor érdemes Base64-et használni?", a: "50KB alatti kis képeknél, ikonoknál, logóknál – ahol a HTTP kérés overhead nagyobb, mint a Base64 mérettöbblet (33%)." },
    { q: "Mi a hátránya a Base64 kódolásnak?", a: "A Base64 kép 33%-kal nagyobb fájlméretet eredményez, és nem cachelhető külön böngészőben. Nagy képeknél nem ajánlott." },
  ],
  content: {
    howToSteps: [
      { title: "Kép feltöltése", description: "Válaszd ki a képet – JPG, PNG, WebP, SVG vagy GIF." },
      { title: "Formátum kiválasztása", description: "HTML img tag, CSS background-image, vagy nyers data URI." },
      { title: "Másolás", description: "Másold a generált kódot a vágólapra és illeszd be a projektedbe." },
    ],
    useCases: [
      { icon: "📧", title: "E-mail sablonok", description: "E-mailekben a külső képek blokkolhatók, a Base64 beágyazott képek mindig megjelennek." },
      { icon: "⚡", title: "Kritikus above-the-fold képek", description: "A fold feletti kis képeket Base64-ként beágyazva elkerülheted a render-blocking HTTP kéréseket." },
      { icon: "🔧", title: "Fejlesztői eszközök", description: "CSS ikonok, favicon beágyazás, canvas adatforrások." },
    ],
    aboutSection: {
      title: "A Base64 kódolásról",
      paragraphs: ["A Base64 egy kódolási séma, amely bináris adatot (pl. képet) ASCII szövegként ábrázol. A `data:image/jpeg;base64,` előtagú string közvetlenül használható img src attribútumként vagy CSS background-image értékeként."],
    },
  },
},

"kep-ico": {
  introText: "Minden weboldalnak szüksége van faviconiconra – az a kis ikon, ami a böngésző fülén és a könyvjelzőkben jelenik meg. Ez az eszköz PNG, JPG vagy WebP képből ICO fájlt generál böngészőben, 16×16, 32×32 és 48×48 px méreteket tartalmazva egyetlen fájlban.",
  guide: [
    "1. Töltsd fel a forrásképet (legjobb: legalább 512×512 px PNG átlátszó háttérrel).",
    "2. Az eszköz automatikusan legenerálja a 16×16, 32×32 és 48×48 px méreteket.",
    "3. Töltsd le a favicon.ico fájlt és töltsd fel a weboldal gyökérmappájába.",
  ],
  faq: [
    { q: "Milyen méretű forrásképet használjak?", a: "Legalább 64×64 px ajánlott, de 512×512 px az ideális – az ICO generátor lefelé méretez." },
    { q: "Szükséges a favicon.ico, ha van PNG favicon?", a: "Modern böngészők elfogadnak PNG favicont is, de az ICO biztosítja a maximális kompatibilitást, beleértve a régebbi böngészőket és a Windows Explorert." },
  ],
  content: {
    howToSteps: [
      { title: "Forráskép feltöltése", description: "PNG ajánlott átlátszó háttérrel. Legalább 48×48 px méret szükséges." },
      { title: "ICO generálás", description: "Az eszköz 16×16, 32×32 és 48×48 px méreteket csomagol egyetlen ICO fájlba." },
      { title: "Beillesztés a weboldalba", description: "Töltsd fel a favicon.ico-t a gyökérmappába, és add hozzá: <link rel=\"icon\" href=\"/favicon.ico\">." },
    ],
    useCases: [
      { icon: "🌐", title: "Weboldal favicon", description: "A böngésző fülén és könyvjelzőkben megjelenő ikon." },
      { icon: "🖥️", title: "Windows alkalmazás ikon", description: "Desktop alkalmazások és parancsikonok ikonja." },
    ],
    aboutSection: {
      title: "Az ICO formátumról",
      paragraphs: ["Az ICO egy Windows ikon formátum, amely több méretű képet tárol egyetlen fájlban. A böngészők az oldalhoz legmegfelelőbb méretet automatikusan választják ki."],
    },
  },
},

"atmeterezas-kb": {
  introText: "Sokszor pontos fájlméret-korlátot kell teljesíteni: álláspályázatnál max 2MB, hatósági feltöltésnél max 500KB. Ez az eszköz bináris kereséssel automatikusan megtalálja az optimális JPEG minőséget, amely a legközelebb esik a megadott célhoz.",
  guide: [
    "1. Töltsd fel a képet (JPG, PNG vagy WebP).",
    "2. Add meg a célméretet KB-ban.",
    "3. Kattints a Konvertálás gombra – az eszköz megkeresi az optimális minőséget.",
    "4. Töltsd le az eredményt.",
  ],
  faq: [
    { q: "Mekkora a pontosság?", a: "Az eszköz ±5%-on belül találja el a célméretet. Ennél pontosabb JPEG esetén nem lehetséges, mivel a tömörítés nem teljesen determinisztikus." },
    { q: "Elvész a kép minősége?", a: "A minimálisan szükséges minőségveszteséggel dolgozik az eszköz. Ha a célméret túl kicsi, a kép homályos lehet." },
  ],
  content: {
    howToSteps: [
      { title: "Kép feltöltése", description: "JPG, PNG vagy WebP fájlt tölthetsz fel." },
      { title: "Célméret megadása", description: "Add meg a maximálisan elfogadható fájlméretet KB-ban." },
      { title: "Optimalizálás", description: "Az eszköz bináris kereséssel megtalálja az optimális minőségi értéket." },
      { title: "Letöltés", description: "Töltsd le a megcélzott méretű JPG képet." },
    ],
    useCases: [
      { icon: "💼", title: "Álláspályázat", description: "HR rendszerek általában max 2MB fájlméretet fogadnak el profilképekhez." },
      { icon: "🏛️", title: "Hatósági feltöltések", description: "Kormányzati és hatósági portálok sokszor strict méretkorlátot alkalmaznak." },
      { icon: "📧", title: "E-mail melléklet", description: "Csökkentsd a kép méretét az e-mail csatoláshoz elfogadható szintre." },
    ],
    aboutSection: {
      title: "Hogyan működik a KB-ra méretezés?",
      paragraphs: ["Az algoritmus bináris keresést alkalmaz: a 0.01 és 1.0 közötti JPEG minőségi tartományban iteratívan szűkíti a keresési teret, amíg a fájlméret a megadott célhoz nem kerül közel."],
    },
  },
},

"gif-keszito": {
  introText: "Az animált GIF az internet egyik legismertebb képformátuma – reakciókhoz, rövid animációkhoz, termékbemutatókhoz és prezentációkhoz használják. Ez az eszköz képek sorozatából böngészőben, szerver nélkül generál animált GIF-et.",
  guide: [
    "1. Töltsd fel a képeket (JPG, PNG, WebP) – ezek lesznek a GIF frame-jei.",
    "2. Állítsd be a frame delay értéket (ms) és a hurok beállítást.",
    "3. Kattints a Konvertálás gombra.",
    "4. Töltsd le az animált GIF-et.",
  ],
  faq: [
    { q: "Hány frame-t lehet egy GIF-be tenni?", a: "Legfeljebb 100 képet, de a nagyméretű GIF-ek böngészőben lassabbak lehetnek." },
    { q: "Miért homályos a GIF színei?", a: "A GIF formátum maximálisan 256 színt tárol frame-enként. Fotóknál ez látható minőségromlást okozhat – animált WebP jobb alternatíva." },
  ],
  content: {
    howToSteps: [
      { title: "Képek feltöltése", description: "Húzd be a képeket – a feltöltés sorrendje lesz az animáció sorrendje." },
      { title: "Timing beállítása", description: "Frame delay: 100ms ≈ 10fps (sima animáció), 500ms = lassú diavetítés." },
      { title: "GIF generálás", description: "A gifenc könyvtár Web Worker-ben futtatja a kvantálást és kódolást." },
    ],
    useCases: [
      { icon: "😂", title: "Reakció GIF-ek", description: "Képekből egyedi reakció GIF-ek Discord-ra, Slack-re, Telegram-ra." },
      { icon: "🛍️", title: "Termékanimáció", description: "Termékek különböző szögekből való bemutatása egy animált GIF-ben." },
      { icon: "📊", title: "Prezentáció", description: "Folyamatok, workflow-k animált illusztrációja." },
    ],
    aboutSection: {
      title: "A GIF formátumról",
      paragraphs: ["A GIF (Graphics Interchange Format) 1987 óta az animált képek standard formátuma az interneten. 256 színes palettájával korlátozott, de az összes böngésző és platform natívan támogatja, ezért ma is releváns."],
    },
  },
},

"gif-webp-animalt": {
  introText: "Az animált WebP az animált GIF modern alternatívája: azonos minőség mellett akár 80%-kal kisebb fájlméretet nyújt. Ez az eszköz GIF-et alakít animált WebP-vé böngészőben, megőrizve az összes frame-et és időzítést.",
  guide: [
    "1. Töltsd fel a GIF fájlt.",
    "2. Állítsd be a kívánt minőséget.",
    "3. Konvertálj és töltsd le az animált WebP-t.",
  ],
  faq: [
    { q: "Minden böngésző lejátssza az animált WebP-t?", a: "Igen, Chrome, Firefox, Safari 14+ és Edge mind támogatja." },
    { q: "Mekkora a méretmegtakarítás?", a: "Tipikusan 60-80% azonos minőség mellett." },
  ],
  content: {
    howToSteps: [
      { title: "GIF feltöltése", description: "Válaszd ki az animált GIF fájlt." },
      { title: "Minőség beállítása", description: "80% ajánlott – jó minőség, kis méret." },
      { title: "WebP letöltése", description: "Az animált WebP fájl közvetlenül használható HTML img tagben." },
    ],
    useCases: [
      { icon: "⚡", title: "Weboldal sebesség", description: "Cseréld le a GIF-eket animált WebP-re a gyorsabb betöltéshez." },
      { icon: "📱", title: "Mobilhálózat", description: "Kisebb fájlméret = kevesebb adatforgalom mobilon." },
    ],
    aboutSection: {
      title: "Animált WebP vs GIF",
      paragraphs: ["Az animált WebP mind veszteséges, mind veszteségmentes módban sokkal jobb tömörítést nyújt mint a GIF, miközben teljes alfa-csatorna-támogatással rendelkezik."],
    },
  },
},

"svg-png": {
  introText: "Az SVG vektorgrafika bármilyen méretben élesen jelenik meg, de nem minden program és platform támogatja. Ez az eszköz SVG-t alakít PNG vagy JPG rasztergrafikává megadott felbontásban, böngészőben, szerver nélkül.",
  guide: [
    "1. Töltsd fel az SVG fájlt.",
    "2. Válaszd ki a kimeneti formátumot (PNG vagy JPG) és a kívánt szélességet.",
    "3. Töltsd le a raszterített képet.",
  ],
  faq: [
    { q: "Mekkora felbontást adjak meg?", a: "Retina/HiDPI kijelzőkre 2× az eredeti CSS méretnél. Pl. ha 200px-en jelenik meg, adj meg 400px-t." },
    { q: "Az SVG animációk is konvertálódnak?", a: "Nem – csak az SVG statikus állapota renderelődik." },
  ],
  content: {
    howToSteps: [
      { title: "SVG feltöltése", description: "Válaszd ki az SVG fájlt." },
      { title: "Beállítások", description: "PNG (átlátszóság megtartva) vagy JPG (fehér háttér), és a kívánt szélesség pixelben." },
      { title: "Letöltés", description: "Töltsd le a raszterített képet." },
    ],
    useCases: [
      { icon: "📧", title: "E-mail", description: "E-mail kliensek sokszor blokkolják az SVG-t – PNG-vé konvertálva biztonságos." },
      { icon: "📄", title: "Word/PDF dokumentumok", description: "Logók, diagramok beillesztése Word vagy PDF dokumentumokba." },
    ],
    aboutSection: {
      title: "SVG raszterizálásról",
      paragraphs: ["Az SVG (Scalable Vector Graphics) XML alapú vektorgrafika-formátum. Böngészőkben a native img.onload + Canvas API segítségével raszterizálható szerver nélkül."],
    },
  },
},

"kep-collage": {
  introText: "Fűzz össze több képet egyetlen kompozícióba – vízszintesen, függőlegesen vagy rácsban. Webbolt termékképekhez, közösségi médiaposzt-ok összeállításához és prezentációs anyagokhoz ideális.",
  guide: [
    "1. Töltsd fel a képeket (min. 2, max. 20).",
    "2. Válaszd ki az elrendezést és a rés méretét.",
    "3. Konvertálj és töltsd le a kompozíciót.",
  ],
  faq: [
    { q: "Különböző méretű képeket is lehet kombinálni?", a: "Igen – az eszköz a kiválasztott elrendezéstől függően automatikusan igazítja a méreteket." },
  ],
  content: {
    howToSteps: [
      { title: "Képek feltöltése", description: "Töltsd fel a kombinálni kívánt képeket." },
      { title: "Elrendezés kiválasztása", description: "Vízszintes, függőleges vagy rácsos kompozíció." },
      { title: "Letöltés", description: "PNG formátumban töltsd le a kész collage-t." },
    ],
    useCases: [
      { icon: "🛒", title: "Termékbemutató", description: "Egy termék több nézetből egyetlen képen." },
      { icon: "📱", title: "Instagram kollázs", description: "Több fotó kombinálása közösségi médiára." },
    ],
    aboutSection: {
      title: "Képkombinálás böngészőben",
      paragraphs: ["A Canvas API lehetővé teszi több kép összeillesztését egyetlen OffscreenCanvas-ra, amelyből PNG-ként exportálható az eredmény."],
    },
  },
},

"szin-paletta": {
  introText: "Nyerd ki egy kép domináns színeit másodpercek alatt. A color-thief algoritmus Canvas API-val elemzi a képet és a legtöbbször előforduló színcsoportokat adja vissza HEX, RGB és HSL formátumban.",
  guide: [
    "1. Töltsd fel a képet.",
    "2. Állítsd be a kívánt számú domináns színt (3-10).",
    "3. Másold a HEX kódokat a vágólapra.",
  ],
  faq: [
    { q: "Milyen algoritmus alapján határozza meg a domináns színeket?", a: "Módosított median cut algoritmus, amely a képet kis területekre osztja és területenkénti átlagszíneket számít." },
  ],
  content: {
    howToSteps: [
      { title: "Kép feltöltése", description: "Töltsd fel a kép, amelyből a palettát ki szeretnéd nyerni." },
      { title: "Szín beállítása", description: "Add meg, hány domináns színt szeretnél (3-10)." },
      { title: "Másolás", description: "Kattints bármely szín HEX kódjára a másoláshoz." },
    ],
    useCases: [
      { icon: "🎨", title: "Brand dizájn", description: "Meglévő logóból vagy fotóból brand szín paletta összeállítása." },
      { icon: "🖥️", title: "UI/UX tervezés", description: "Webdizájn szín témák képből való kinyerése." },
    ],
    aboutSection: {
      title: "Szín paletta kinyerésről",
      paragraphs: ["A color-thief-ts könyvtár a képet egy kis méretű OffscreenCanvas-on rendereli, majd pixel-szintű statisztikával határozza meg a domináns színcsoportokat."],
    },
  },
},

"automatikus-vagas": {
  introText: "Távolítsd el a felesleges fehér vagy egyszínű széleket a képeidről automatikusan. Pixel-szintű elemzéssel találja meg a tényleges tartalom határait és levágja a háttérszínt.",
  guide: [
    "1. Töltsd fel a képet.",
    "2. Állítsd be a háttérszínt és a toleranciát.",
    "3. Konvertálj és töltsd le a levágott képet.",
  ],
  faq: [
    { q: "Működik nem fehér háttéren is?", a: "Igen – a szín-kiválasztóval bármelyik egyszínű háttérszínt megadhatod." },
    { q: "Mi a tolerancia beállítás?", a: "A tolerancia azt határozza meg, mennyire hasonlíthatnak a szélső pixelek a háttérszínhez – magasabb érték agresszívabb levágást jelent." },
  ],
  content: {
    howToSteps: [
      { title: "Kép feltöltése", description: "JPG, PNG vagy WebP fájlt tölthetsz fel." },
      { title: "Beállítások", description: "Háttérszín (alapértelmezett: fehér) és tolerancia (0-80)." },
      { title: "Letöltés", description: "PNG formátumban töltsd le a levágott képet." },
    ],
    useCases: [
      { icon: "📷", title: "Szkennerből érkező dokumentumok", description: "A szkennelt lapok fehér szélének automatikus levágása." },
      { icon: "🛒", title: "Webshop termékképek", description: "Fehér hátteres termékképek egységesítése: felesleges fehér szél eltávolítása." },
    ],
    aboutSection: {
      title: "Automatikus képvágásról",
      paragraphs: ["Az algoritmus a képet pixelenként végigpásztázza a szélek mentén, és megtalálja az első nem-háttérszínű sort/oszlopot. Ezekből határozza meg a minimális befoglaló téglalapot."],
    },
  },
},

"exif-terkep": {
  introText: "Tudtad, hogy az okostelefonod minden fotóba beleírja a GPS koordinátáit? Ez az eszköz kinyeri az EXIF adatokban tárolt helyszínt és interaktív OpenStreetMap térképen jeleníti meg – teljesen böngészőben, szerver nélkül.",
  guide: [
    "1. Töltsd fel a JPEG képet (okostelefonnal készített fotó).",
    "2. Az eszköz kinyeri a GPS koordinátákat az EXIF adatokból.",
    "3. A helyszín interaktív térképen jelenik meg.",
  ],
  faq: [
    { q: "Minden fotóban van GPS adat?", a: "Nem – csak ha a fotó készítésekor be volt kapcsolva a helymeghatározás, és a képet nem szerkesztőprogramon mentették át." },
    { q: "Adatbiztonság: feltöltődik a kép szerverre?", a: "Nem – az összes feldolgozás a böngésződben zajlik." },
  ],
  content: {
    howToSteps: [
      { title: "JPEG feltöltése", description: "Töltsd fel az okostelefonnal készített JPEG fotót." },
      { title: "EXIF elemzés", description: "Az exifr könyvtár kinyeri a GPS koordinátákat és egyéb metaadatokat." },
      { title: "Térkép megjelenítés", description: "OpenStreetMap térképen jelöli meg a fotó készítési helyszínét." },
    ],
    useCases: [
      { icon: "📍", title: "Fotó helyszín azonosítás", description: "Régi fotók helyszínének meghatározása az EXIF adatok alapján." },
      { icon: "🔒", title: "Adatvédelmi ellenőrzés", description: "Ellenőrizd, hogy a feltöltendő képeidben van-e GPS adat, amit esetleg törölni érdemes." },
    ],
    aboutSection: {
      title: "EXIF GPS adatokról",
      paragraphs: ["Az EXIF (Exchangeable Image File Format) metaadatok a JPEG fájlok fejlécében tárolódnak. Az okostelefonok alapértelmezetten rögzítik a GPS koordinátákat, kamera adatokat és időbélyeget."],
    },
  },
},

"sprite-vagas": {
  introText: "A sprite sheet egyetlen nagy képfájl, amely több kisebb képet tartalmaz egységes rácsban. Ez az eszköz megadott cellaméret alapján feldarabolja a sprite sheet-et és ZIP-be csomagolva exportálja az egyedi frame-eket.",
  guide: [
    "1. Töltsd fel a sprite sheet képet.",
    "2. Add meg egy cella szélességét és magasságát pixelben.",
    "3. Az eszköz automatikusan kiszámolja a rácsot és exportál.",
  ],
  faq: [
    { q: "Milyen névvel kerülnek a képek a ZIP-be?", a: "`sprite-00-00.png`, `sprite-00-01.png` stb. – sor-oszlop sorrendben." },
    { q: "Aszimmetrikus sprite sheet-eket is kezel?", a: "Igen, a cellaméret szélességben és magasságban külön megadható." },
  ],
  content: {
    howToSteps: [
      { title: "Sprite sheet feltöltése", description: "Töltsd fel a PNG/JPG/WebP sprite sheet képet." },
      { title: "Cellaméret megadása", description: "Add meg egy sprite cella szélességét és magasságát pixelben." },
      { title: "ZIP letöltés", description: "Töltsd le a ZIP archívumot, amely minden egyedi sprite-ot tartalmaz." },
    ],
    useCases: [
      { icon: "🎮", title: "Játékfejlesztés", description: "Animációs frame-ek, karakter sprite-ok szétválasztása." },
      { icon: "🖥️", title: "UI ikonkészletek", description: "Icon sprite sheet-ek feldolgozása egyedi SVG/PNG ikonokra." },
    ],
    aboutSection: {
      title: "Sprite sheet vágásról",
      paragraphs: ["Az algoritmus a rácsméret alapján kiszámolja a cellák számát, majd OffscreenCanvas-on kivágja és PNG-ként exportálja az egyes frame-eket."],
    },
  },
},
```

---

## 6. lépés: ro-tools-kep.ts – Román fordítások

**Fájl**: `src/lib/i18n/ro-tools-kep.ts`

Add hozzá az új eszközöket a meglévő objektumhoz:

```typescript
"heic-jpg": {
  slug: "convertor-heic-jpg",
  title: "Convertor HEIC → JPG | Gratuit Online | InstrumenteOnline",
  h1: "Convertor HEIC → JPG",
  description: "Convertește imaginile HEIC de pe iPhone/iPad în format JPG în browser, fără server. Procesare în lot cu export ZIP.",
  keywords: ["heic jpg", "convertor heic", "conversia imaginilor iphone", "heif jpg"],
},
"heic-png": {
  slug: "convertor-heic-png",
  title: "Convertor HEIC → PNG | Gratuit Online | InstrumenteOnline",
  h1: "Convertor HEIC → PNG",
  description: "Convertește imagini HEIC în format PNG fără pierderi în browser. Cu păstrarea canalului alfa, fără server.",
  keywords: ["heic png", "convertor heic png", "heif png"],
},
"jpg-avif": {
  slug: "convertor-jpg-avif",
  title: "Convertor JPG → AVIF | Fișier mai mic | InstrumenteOnline",
  h1: "Convertor JPG → AVIF",
  description: "Convertește imagini JPG în format AVIF în browser. AVIF oferă cu 40% mai puțin spațiu decât WebP – fără server.",
  keywords: ["jpg avif", "convertor jpeg avif", "format imagine modern", "optimizare imagini"],
},
"png-avif": {
  slug: "convertor-png-avif",
  title: "Convertor PNG → AVIF | Gratuit Online | InstrumenteOnline",
  h1: "Convertor PNG → AVIF",
  description: "Convertește imagini PNG în format AVIF în browser, cu păstrarea canalului alfa. Mod lossless și lossy.",
  keywords: ["png avif", "convertor png avif", "avif transparent"],
},
"kep-base64": {
  slug: "imagine-base64",
  title: "Imagine → Base64 / Data URI | Gratuit | InstrumenteOnline",
  h1: "Convertor Imagine → Base64 / Data URI",
  description: "Transformă imaginile în șiruri Base64 pentru integrare HTML/CSS. JPG, PNG, WebP, SVG – în browser, fără server.",
  keywords: ["imagine base64", "data uri imagine", "base64 encode imagine"],
},
"kep-ico": {
  slug: "generator-favicon-ico",
  title: "Generator Favicon ICO | PNG → ICO | InstrumenteOnline",
  h1: "Generator Favicon / Convertor PNG → ICO",
  description: "Creează fișier ICO favicon din PNG sau JPG în browser. Conține dimensiunile 16×16, 32×32 și 48×48 px într-un singur fișier.",
  keywords: ["generator favicon", "convertor png ico", "favicon ico online"],
},
"atmeterezas-kb": {
  slug: "redimensionare-imagine-kb",
  title: "Redimensionare Imagine la KB | Dimensiune Exactă | InstrumenteOnline",
  h1: "Redimensionare Imagine la Dimensiune Exactă (KB)",
  description: "Setează dimensiunea țintă în KB – instrumentul găsește automat calitatea optimă. Ideal pentru aplicații, formulare oficiale.",
  keywords: ["redimensionare imagine kb", "micșorare imagine dimensiune", "resize to kb"],
},
"gif-keszito": {
  slug: "creator-gif-animat",
  title: "Creator GIF Animat din Imagini | Gratuit | InstrumenteOnline",
  h1: "Creator GIF Animat",
  description: "Creează GIF-uri animate din imagini JPG, PNG sau WebP în browser. Cu setări de delay și buclă – fără server.",
  keywords: ["creator gif animat", "gif din imagini", "face gif online"],
},
"gif-webp-animalt": {
  slug: "convertor-gif-webp-animat",
  title: "Convertor GIF → WebP Animat | Fișier mai mic | InstrumenteOnline",
  h1: "Convertor GIF → WebP Animat",
  description: "Convertește animații GIF în format WebP animat în browser. Până la 80% reducere a dimensiunii fișierului.",
  keywords: ["gif webp animat", "convertor gif animat", "optimizare gif"],
},
"svg-png": {
  slug: "convertor-svg-png",
  title: "Convertor SVG → PNG / JPG | Rasterizare | InstrumenteOnline",
  h1: "Convertor SVG → PNG / JPG",
  description: "Convertește grafică vectorială SVG în imagini PNG sau JPG în browser. Rezoluție personalizabilă, fără server.",
  keywords: ["svg png convertor", "rasterizare svg", "svg jpg online"],
},
"kep-collage": {
  slug: "creator-colaj-imagini",
  title: "Creator Colaj Imagini Online | Gratuit | InstrumenteOnline",
  h1: "Creator Colaj / Combinare Imagini",
  description: "Combină imagini orizontal, vertical sau în grilă într-o singură imagine. În browser, fără server.",
  keywords: ["creator colaj imagini", "combinare imagini", "colaj foto online"],
},
"szin-paletta": {
  slug: "paleta-culori-imagine",
  title: "Extractor Paletă Culori din Imagine | HEX | InstrumenteOnline",
  h1: "Extractor Paletă de Culori din Imagine",
  description: "Extrage culorile dominante dintr-o imagine cu coduri HEX, RGB și HSL. Pentru design brand, UI/UX.",
  keywords: ["paleta culori imagine", "culori dominante", "extragere culori hex"],
},
"automatikus-vagas": {
  slug: "decupare-automata-imagine",
  title: "Decupare Automată – Eliminare Margini Albe | InstrumenteOnline",
  h1: "Decupare Automată – Eliminare Margini Albe/Unicolore",
  description: "Elimină automat marginile albe sau unicolore ale imaginilor în browser. Ideal pentru fotografii de produse, scanate.",
  keywords: ["decupare automata imagine", "eliminare margini albe", "autocrop imagine"],
},
"exif-terkep": {
  slug: "harta-gps-exif-imagine",
  title: "Hartă GPS EXIF Imagine | Localizare Fotografie | InstrumenteOnline",
  h1: "Vizualizator GPS EXIF – Hartă Interactivă",
  description: "Afișează locul de fotografiere dintr-o imagine JPEG pe hartă interactivă OpenStreetMap. În browser, fără server.",
  keywords: ["harta gps exif", "localizare fotografie", "exif gps online"],
},
"sprite-vagas": {
  slug: "decupare-sprite-sheet",
  title: "Instrument Decupare Sprite Sheet | Export ZIP | InstrumenteOnline",
  h1: "Instrument Decupare Sprite Sheet",
  description: "Taie sprite sheet-ul în imagini individuale după dimensiunea celulei. Export ZIP în browser, fără server.",
  keywords: ["decupare sprite sheet", "sprite cutter online", "export frame sprite"],
},
```

---

## 7. lépés: ui-labels.ts – Új UI szövegek

**Fájl**: `src/lib/ui-labels.ts`

Ha az alábbi kulcsok még nincsenek benne, add hozzá mindkét nyelvhez:

```typescript
hu: {
  // ... meglévő
  lossless: "Veszteségmentes",
  losslessMode: "Veszteségmentes mód",
  frameDelay: "Frame delay (ms)",
  infiniteLoop: "Végtelen hurok",
  targetSizeKb: "Célméret (KB)",
  originalSize: "Eredeti méret",
  resultSize: "Eredmény méret",
  frameCount: "Frame-ek száma",
  cellWidth: "Cella szélesség (px)",
  cellHeight: "Cella magasság (px)",
  gridInfo: "rács →",
  outputFormat: "Kimeneti formátum",
  targetWidth: "Célszélesség (px)",
  bgColor: "Háttérszín",
  tolerance: "Tolerancia",
  colorCount: "Színek száma",
  noGpsData: "Ebben a képben nincs GPS adat.",
  layout: "Elrendezés",
  layoutHorizontal: "Vízszintes",
  layoutVertical: "Függőleges",
  layoutGrid: "Rácsos",
  gap: "Rés (px)",
},
ro: {
  // ... meglévő
  lossless: "Fără pierderi",
  losslessMode: "Mod fără pierderi",
  frameDelay: "Delay cadru (ms)",
  infiniteLoop: "Buclă infinită",
  targetSizeKb: "Dimensiune țintă (KB)",
  originalSize: "Dimensiune originală",
  resultSize: "Dimensiune rezultat",
  frameCount: "Număr cadre",
  cellWidth: "Lățime celulă (px)",
  cellHeight: "Înălțime celulă (px)",
  gridInfo: "grilă →",
  outputFormat: "Format ieșire",
  targetWidth: "Lățime țintă (px)",
  bgColor: "Culoare fundal",
  tolerance: "Toleranță",
  colorCount: "Număr culori",
  noGpsData: "Această imagine nu conține date GPS.",
  layout: "Aspect",
  layoutHorizontal: "Orizontal",
  layoutVertical: "Vertical",
  layoutGrid: "Grilă",
  gap: "Spațiu (px)",
},
```

---

## 8. lépés: Román SEO tartalom

**Fájl**: `src/lib/content/ro/kep-content.ts`

Ugyanolyan struktúrával, mint a magyar `kep-content.ts`, de román nyelvű szöveggel. Minden eszközhöz:

```typescript
"heic-jpg": {
  introText: "HEIC (High Efficiency Image Container) este formatul implicit pentru imaginile iPhone și iPad. Deși oferă compresie excelentă, multe aplicații Windows, site-uri web și instrumente de editare nu-l pot deschide. Acest instrument convertește fișierele HEIC în JPG universal compatibil, direct în browser.",
  guide: [
    "1. Trage sau selectează fișierele HEIC în instrument.",
    "2. Instrumentul convertește automat fișierele cu calitate JPG de 90%.",
    "3. Descarcă JPG-ul (sau arhiva ZIP pentru mai multe fișiere).",
  ],
  faq: [
    { q: "De ce nu se deschide imaginea HEIC pe Windows?", a: "Windows nu include implicit un decodor HEIC. Convertind în JPG, imaginea se va deschide pe orice sistem." },
    { q: "Se pierde calitatea imaginii?", a: "Convertim cu calitate JPG de 90%, ceea ce înseamnă o diferență aproape imperceptibilă." },
  ],
  content: {
    howToSteps: [
      { title: "Selectare fișier", description: "Trage fișierul HEIC în instrument sau dă clic pentru a răsfoi." },
      { title: "Conversie automată", description: "Decodificarea HEIC/HEIF se face cu WebAssembly, direct în browser." },
      { title: "Descărcare", description: "Un singur fișier: descarcă ca JPG. Mai multe fișiere: arhivă ZIP." },
    ],
    useCases: [
      { icon: "📱", title: "Partajare fotografii iPhone", description: "Fotografiile copiate de pe iPhone vin în format HEIC. Prin conversie, oricine le poate deschide." },
      { icon: "💼", title: "CV și aplicații", description: "Sistemele HR și software-ul accept de obicei JPG, nu neapărat HEIC." },
    ],
    aboutSection: {
      title: "Despre formatul HEIC",
      paragraphs: [
        "HEIC (High Efficiency Image Coding) este formatul de imagine adoptat de Apple, bazat pe codecul video HEVC (H.265). Principalul avantaj: la aceeași calitate vizuală, dimensiunea fișierului este aproximativ la jumătate față de JPEG.",
        "Dezavantajul este compatibilitatea redusă: Windows, Android și cele mai multe aplicații web nu-l pot deschide implicit.",
      ],
    },
    tips: [
      { icon: "💡", tip: "Conversia HEIC → JPG păstrează metadatele EXIF, inclusiv coordonatele GPS." },
    ],
  },
},
// ... ugyanilyen struktúra a többi eszközre is (jpg-avif, png-avif, kep-base64, kep-ico, stb.)
```

> **Folytatás**: Ugyanezt a román SEO tartalmat hozd létre az összes többi 14 új eszközhöz is, azonos struktúrával, román nyelvű szövegekkel. Az `introText`, `guide`, `faq`, `howToSteps`, `useCases`, `aboutSection` és `tips` mezőket mind töltsd ki.

---

## 9. lépés: astro.config.mjs – WASM csomagok kezelése

**Fájl**: `astro.config.mjs`

Az `@jsquash/avif` és `@jsquash/webp` WASM modulok speciális Vite konfigurációt igényelnek:

```javascript
vite: {
  worker: { format: "es" },
  optimizeDeps: {
    include: ["pdf-lib", "pdfjs-dist", "js-yaml", "heic2any", "color-thief-ts"],
    exclude: ["jszip", "@jsquash/avif", "@jsquash/webp", "gifenc", "gifuct-js"],
  },
  // WASM fájlok kezelése
  assetsInclude: ["**/*.wasm"],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          svelte: ["svelte"],
          // WASM csomagok külön chunk-ba (lazy loading)
          "avif-codec": ["@jsquash/avif"],
          "webp-codec": ["@jsquash/webp"],
          "heic-codec": ["heic2any"],
        },
      },
    },
  },
},
```

---

## 10. lépés: Ellenőrzési lista

Az ARCHITECTURE.md §16 szerinti checklist minden egyes eszközre:

- [ ] Bejegyezve a `tool-registry.ts` `rawTools` tömbben
- [ ] Svelte komponens létrehozva: `src/components/tools/kep/{ComponentName}.svelte`
- [ ] Regisztrálva a `DynamicTool.svelte` `COMPONENT_IMPORTS` map-ben
- [ ] Timing konfiguráció beállítva (ha eltér az alapértéktől)
- [ ] Magyar SEO tartalom hozzáadva: `src/lib/content/kep-content.ts`
- [ ] Román fordítás hozzáadva: `src/lib/i18n/ro-tools-kep.ts`
- [ ] Román SEO tartalom hozzáadva: `src/lib/content/ro/kep-content.ts`
- [ ] Új UI label-ek hozzáadva: `src/lib/ui-labels.ts` (ha szükséges)
- [ ] `npm run dev` – eszköz betöltődik hiba nélkül
- [ ] `npm run dev:ro` – román verzió betöltődik
- [ ] File input fogad fájlt, Dropzone működik
- [ ] ConvertButton konvertál, letöltés működik
- [ ] Analytics tracking hív: `convert_start`, `convert_done`, `download`
- [ ] `npm run build:hu` – hibamentes build
- [ ] `npm run build:ro` – hibamentes build
- [ ] Sitemap tartalmazza az új URL-eket

---

## Összefoglaló: 15 új eszköz

| Slug | Komponens | npm csomag |
|------|-----------|------------|
| `heic-jpg` | `HeicJpgTool` | `heic2any` |
| `heic-png` | `HeicPngTool` | `heic2any` |
| `jpg-avif` | `JpgAvifTool` | `@jsquash/avif` |
| `png-avif` | `PngAvifTool` | `@jsquash/avif` |
| `kep-base64` | `KepBase64Tool` | Canvas API |
| `kep-ico` | `KepIcoTool` | Canvas API |
| `atmeterezas-kb` | `AtmeterezesKbTool` | Canvas API |
| `gif-keszito` | `GifKeszito` | `gifenc` |
| `gif-webp-animalt` | `GifWebpAnimalt` | `gifuct-js` + `@jsquash/webp` |
| `svg-png` | `SvgPngTool` | Canvas API |
| `kep-collage` | `KepCollage` | Canvas API |
| `szin-paletta` | `SzinPaletta` | `color-thief-ts` |
| `automatikus-vagas` | `AutomatikusVagas` | Canvas API |
| `exif-terkep` | `ExifTerkep` | `exifr` + `leaflet` |
| `sprite-vagas` | `SpriteVago` | `fflate` (már a projektben) |
