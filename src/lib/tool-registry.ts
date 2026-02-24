// ============================================================
// TOOL REGISTRY – Single Source of Truth
// SOHA ne hardcode-olj title/description/faq adatokat az oldalakban.
// ============================================================

// ─── SEO Content Data Imports ────────────────────────────────
import { KEP_CONTENT } from "./content/kep-content.ts";
import { ADAT_CONTENT } from "./content/adat-content.ts";
import { SZOVEG_CONTENT } from "./content/szoveg-content.ts";
import { FEJLESZTO_CONTENT } from "./content/fejleszto-content.ts";
import { PDF_CONTENT, EXCEL_CONTENT, MARKDOWN_CONTENT, HTML_CONTENT, FAJL_CONTENT, SEO_TOOL_CONTENT } from "./content/pdf-excel-other-content.ts";
import type { ContentMap } from "./content/types.ts";

export type ToolStatus = "active" | "coming-soon";
export type CategoryId =
  | "kep" | "pdf" | "adat" | "szoveg"
  | "fejleszto" | "markdown" | "html" | "excel"
  | "fajl" | "seo";

export interface ToolFAQ {
  q: string;
  a: string;
}

export interface Tool {
  slug: string;
  category: CategoryId;
  title: string;           // <title> tag
  h1: string;              // Oldalon megjelenő H1
  description: string;     // meta description (max 160 kar)
  keywords: string[];
  status: ToolStatus;
  related: string[];       // más tool slug-ok
  faq: ToolFAQ[];
  component?: string;
  inputFormats?: string[];
  outputFormat?: string;
  acceptMultiple?: boolean;
  // SEO dátummezők (sitemap lastmod + schema dateModified)
  updatedAt?: string;      // ISO date: "2025-11-15" – utolsó módosítás
  launchedAt?: string;     // ISO date: "2025-10-01" – mikor lett active
  // Tartalom szekciók
  introText?: string;      // Bevezető szöveg az eszköz után, FAQ előtt
  guide?: string[];        // Használati útmutató lépések (sorszámozott)
  content?: ToolContent;   // Részletes SEO tartalom szekciók
}

export interface ToolContent {
  howToSteps: Array<{ title: string; description: string }>;
  useCases: Array<{ icon: string; title: string; description: string }>;
  formatComparison?: {
    title: string;
    columns: string[];
    rows: Array<{ feature: string; values: string[] }>;
  };
  aboutSection: {
    title: string;
    paragraphs: string[];
  };
  tips?: Array<{ icon: string; tip: string }>;
}

export interface Category {
  id: CategoryId;
  label: string;
  icon: string;
  description: string;
  color: string;
  intro?: string[];
}

export const CATEGORIES: Category[] = [
  {
    id: "kep", label: "Képek", icon: "🖼️", color: "var(--cat-kep)",
    description: "Képkonvertálás, átméretezés, tömörítés és szerkesztés böngészőben.",
    intro: [
      "A Konvertalo.hu képeszközei a leggyakoribb képfeldolgozási feladatokat fedik le: formátumváltás (JPG, PNG, WebP), tömörítés, átméretezés, forgatás, vágás, szűrők és vízjel. Minden eszköz a böngésződben fut – a képeid egyetlen bájtja sem kerül szerverre.",
      "Batch feldolgozás támogatott: tölts fel akár több tucat képet egyszerre, és az eredményt egyetlen ZIP fájlban töltsd le. A Web Worker technológia gondoskodik arról, hogy a böngésző ne fagyjon le a konvertálás közben.",
      "Ideális webfejlesztőknek, bloggereknek, e-commerce kereskedőknek és mindenkinek, akinek gyorsan kell képeket optimalizálni anélkül, hogy külön szoftvert kellene telepítenie.",
    ],
  },
  {
    id: "pdf", label: "PDF", icon: "📄", color: "var(--cat-pdf)",
    description: "PDF összefűzés, szétbontás, oldalkezelés szerverfeltöltés nélkül.",
    intro: [
      "A PDF eszközeinkkel szerverfeltöltés nélkül kezelheted a dokumentumaidat: összefűzhetsz több PDF-et, kiolvashatod az oldalszámot, vagy szétbonthatod az egyes oldalakat. A feldolgozás teljes egészében a böngésződben történik a pdf-lib és pdfjs-dist könyvtárak segítségével.",
      "Bizalmas dokumentumokhoz is biztonságos: mivel semmi nem hagyja el a gépedet, nem kell aggódnod a GDPR vagy belső adatvédelmi szabályzatok miatt. Különösen hasznos irodai és jogi környezetben.",
    ],
  },
  {
    id: "adat", label: "Adat", icon: "📊", color: "var(--cat-adat)",
    description: "CSV, JSON, TSV konvertálás és adattisztítás online.",
    intro: [
      "Adateszközeink a leggyakoribb adatformátumok közötti konvertálást és megtekintést biztosítják: CSV, JSON, TSV és egyéb szöveges adatformátumok. Legyen szó export fájlok átalakításáról vagy API válaszok vizsgálatáról, itt mindent megoldasz.",
      "Különösen hasznos elemzőknek, fejlesztőknek és marketingeseknek, akik napi szinten dolgoznak táblázatos adatokkal. A konverzió gyors, privát, és nem kell hozzá sem Python, sem Excel.",
    ],
  },
  {
    id: "szoveg", label: "Szöveg", icon: "📝", color: "var(--cat-szoveg)",
    description: "Szövegszerkesztő eszközök: rendezés, tisztítás, konverzió.",
    intro: [
      "A szövegeszközök a mindennapi szövegfeldolgozási feladatokhoz nyújtanak segítséget: sorok rendezése és szűrése, duplikátumok eltávolítása, kis- és nagybetű konverzió, whitespace tisztítás, ékezetek eltávolítása és URL-barát slug generálás.",
      "Nincs szükség telepítésre vagy regisztrációra – csak illeszd be a szöveget, válaszd ki a műveletet, és azonnal megkapod az eredményt. Tartalomkészítőknek, fordítóknak és fejlesztőknek egyaránt hasznos.",
    ],
  },
  {
    id: "fejleszto", label: "Fejlesztő", icon: "⚙️", color: "var(--cat-fejleszto)",
    description: "JSON, YAML, XML, Base64, URL – fejlesztői segédeszközök.",
    intro: [
      "A fejlesztői eszközgyűjtemény a programozók mindennapi segédeszközeit kínálja: JSON formázás és validálás, Base64 kódolás/dekódolás, URL encode/decode, YAML–JSON konverzió, XML formázás és hash generálás. Minden a böngészőben fut, szerver nélkül.",
      "Ideális API fejlesztéshez, hibakereséshez és konfigurációs fájlok kezeléséhez. Nem kell CLI eszközt telepíteni – nyisd meg a böngészőt és dolgozz.",
    ],
  },
  {
    id: "markdown", label: "Markdown", icon: "✍️", color: "var(--cat-markdown)",
    description: "Markdown HTML-lé alakítása és előnézete.",
    intro: [
      "A Markdown eszközök segítségével azonnal megtekintheted és konvertálhatod a Markdown szöveget HTML-lé. Hasznos dokumentáció írásánál, README fájlok szerkesztésénél vagy blogbejegyzések előkészítésénél.",
      "A konverzió a böngésződben történik, így nincs szükség szerverre. A formázott kimenetet azonnal átmásolhatod vagy letöltheted.",
    ],
  },
  {
    id: "html", label: "HTML", icon: "🌐", color: "var(--cat-html)",
    description: "HTML szöveggé alakítása, minifikálás.",
    intro: [
      "HTML eszközeinkkel gyorsan alakíthatod a HTML kódot tiszta szöveggé, minifikálhatod a forráskódot, vagy más szöveges műveleteket végezhetsz. Hasznos webfejlesztőknek és tartalom-migrációs feladatokhoz.",
      "A feldolgozás pillanatok alatt megtörténik a böngésződben – nem kell semmit sem feltölteni.",
    ],
  },
  {
    id: "excel", label: "Excel", icon: "📈", color: "var(--cat-excel)",
    description: "Excel (XLSX) konvertálás és megtekintés böngészőben.",
    intro: [
      "Az Excel eszközökkel XLSX fájlokat tekinthetsz meg, konvertálhatsz CSV-vé vagy JSON-né, közvetlenül a böngészőben. Nem szükséges Microsoft Office vagy LibreOffice – csak töltsd fel a fájlt és dolgozz.",
      "Ideális, ha gyorsan be kell tekintened egy táblázatba, vagy az adatokat más rendszerbe kell exportálnod. A feldolgozás privát, a fájljaid nem hagyják el a gépedet.",
    ],
  },
  {
    id: "fajl", label: "Fájl", icon: "🗂️", color: "var(--cat-fajl)",
    description: "ZIP, hash-ellenőrzés, fájl-információ eszközök.",
    intro: [
      "A fájleszközök általános fájlkezelési feladatokhoz kínálnak megoldást: ZIP tömörítés és kicsomagolás, fájl hash ellenőrzés (MD5, SHA-256), fájl méret és típus információ. Minden a böngésződben fut.",
      "Hasznos rendszergazdáknak, fejlesztőknek és bármilyen felhasználónak, akinek gyorsan kell fájlokat kezelni telepítés nélkül.",
    ],
  },
  {
    id: "seo", label: "SEO", icon: "🔍", color: "var(--cat-seo)",
    description: "SEO segédeszközök: title/meta hossz, UTM, canonical, robots.txt.",
    intro: [
      "Az SEO eszközök a keresőoptimalizálás mindennapi feladataihoz nyújtanak segítséget: title és meta description hossz ellenőrzés, UTM paraméter építő, canonical URL generátor, robots.txt elemző és tesztelő.",
      "Ideális SEO szakembereknek, tartalomkezelőknek és webfejlesztőknek, akik gyorsan szeretnék ellenőrizni és optimalizálni az oldalak meta adatait. Nincs szükség fizetős eszközökre az alapfeladatokhoz.",
    ],
  },
];

const rawTools: Tool[] = [

  // ═══ KÉP ════════════════════════════════════════════════
  {
    slug: "jpg-webp", category: "kep",
    title: "JPG → WebP konvertáló | Ingyenes, szervermentes",
    h1: "JPG → WebP konvertáló",
    description: "Konvertálj JPG/PNG képeket WebP formátumba böngészőben – szerver nélkül. Minőség és méret állítható, batch feldolgozás ZIP exporttal.",
    keywords: ["jpg webp", "képkonvertáló", "webp konverter", "online ingyenes"],
    status: "active", component: "JpgWebpTool",
    updatedAt: "2025-11-01", launchedAt: "2025-10-15",
    inputFormats: ["image/jpeg", "image/png"], outputFormat: "image/webp", acceptMultiple: true,
    related: ["png-webp", "tomorites", "tomeges-konvertalas"],
    faq: [
      { q: "Feltöltődnek a képeim szerverre?", a: "Nem. A konverzió 100%-ban a böngésződben fut Web Worker segítségével. A fájlok nem hagyják el a gépedet." },
      { q: "Hány fájlt dolgozhatok fel egyszerre?", a: "Nincs limit – batch módban akármennyi JPG-t feltölthetsz, az eredmény ZIP-ben töltődik le." },
      { q: "Miért érdemes WebP-t használni?", a: "A WebP 25–35%-kal kisebb fájlokat eredményez azonos minőség mellett, ami gyorsabb oldalbetöltést és jobb Core Web Vitals-t jelent." },
      { q: "Elveszítem a minőséget?", a: "A quality slider-rel szabályozhatod. 80 felett a különbség alig észrevehető." },
    ],
  },
  {
    slug: "png-webp", category: "kep",
    title: "PNG → WebP konvertáló | Ingyenes online",
    h1: "PNG → WebP konvertáló",
    description: "PNG képek konvertálása WebP formátumra, alfa-csatorna megőrzéssel, böngészőben. Veszteségmentes és veszteséges mód.",
    keywords: ["png webp", "png to webp", "png konvertáló", "webp lossless"],
    status: "active", component: "PngWebpTool",
    updatedAt: "2026-02-23", launchedAt: "2026-02-23",
    inputFormats: ["image/png"], outputFormat: "image/webp", acceptMultiple: true,
    related: ["jpg-webp", "png-jpg", "tomorites"],
    faq: [
      { q: "Megőrzi az átlátszóságot?", a: "Igen, a WebP teljes mértékben támogatja az alfa-csatornát – az átlátszó háttér megmarad." },
      { q: "Mi a különbség a lossless és lossy WebP között?", a: "A lossless (veszteségmentes) mód pixelről pixelre azonos minőséget ad, de nagyobb fájlmérettel. A lossy (veszteséges) mód 25–35%-kal kisebb fájlt ad, minimális, szabad szemmel alig látható minőségveszteséggel." },
    ],
  },
  { slug: "jpg-png", category: "kep", title: "JPG → PNG konvertáló | Ingyenes online", h1: "JPG → PNG konvertáló", description: "JPG képek konvertálása veszteségmentes PNG formátumba böngészőben, szerver nélkül. Átlátszó háttér, batch feldolgozás.", keywords: ["jpg png", "jpeg png", "jpg to png", "jpg png konvertáló", "kép konvertálás online"], status: "active", component: "ImageConvertTool", related: ["jpg-webp", "png-jpg", "tomorites"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "png-jpg", category: "kep", title: "PNG → JPG konvertáló | Ingyenes online", h1: "PNG → JPG konvertáló", description: "PNG képek konvertálása JPG formátumba minőség-beállítással, háttérszín választással. Böngészőben, szervermentes.", keywords: ["png jpg", "png to jpg", "png jpeg konvertáló", "png jpg konvertálás online"], status: "active", component: "ImageConvertTool", related: ["jpg-png", "png-webp", "tomorites"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "webp-jpg", category: "kep", title: "WebP → JPG konvertáló | Ingyenes online", h1: "WebP → JPG konvertáló", description: "WebP képek visszakonvertálása JPG formátumba minőség-beállítással. Böngészőben, szerver nélkül, batch módban.", keywords: ["webp jpg", "webp to jpg", "webp jpeg konvertáló", "webp visszaalakítás"], status: "active", component: "ImageConvertTool", related: ["webp-png", "jpg-webp", "tomorites"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "webp-png", category: "kep", title: "WebP → PNG konvertáló | Ingyenes online", h1: "WebP → PNG konvertáló", description: "WebP képek visszakonvertálása veszteségmentes PNG formátumba, alfa-csatorna megőrzéssel. Böngészőben, szervermentes.", keywords: ["webp png", "webp to png", "webp png konvertáló", "webp visszaalakítás lossless"], status: "active", component: "ImageConvertTool", related: ["webp-jpg", "png-webp", "jpg-png"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "atmeretezes", category: "kep", title: "Kép átméretező online | Ingyenes, szervermentes", h1: "Kép átméretezés", description: "Képek átméretezése px vagy százalék alapján, képarány megőrzéssel. Batch feldolgozás ZIP kimenettel, böngészőben.", keywords: ["kép átméretezés", "resize image online", "kép átméretező", "képméret csökkentés", "kép méretre vágás"], status: "active", component: "AtmererezesTool", related: ["tomorites", "tomeges-atmeretezes", "levagas"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "tomorites", category: "kep", title: "Képtömörítő online | JPG PNG WebP tömörítés", h1: "Képtömörítés online", description: "JPG, PNG, WebP képek tömörítése minőségveszteség minimalizálásával. Böngészőben, szerver nélkül, batch feldolgozással.", keywords: ["képtömörítés", "compress image", "kép tömörítő online", "jpg tömörítés", "png compress", "webp tömörítés"], status: "active", component: "ImageConvertTool", related: ["jpg-webp", "tomeges-tomorites", "minoseg-allitas"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "minoseg-allitas", category: "kep", title: "Kép minőség-beállítás online | Quality slider", h1: "Kép minőség állítása", description: "JPG/WebP képek quality értékének pontos beállítása fájlméret optimalizáláshoz. Valós idejű előnézet.", keywords: ["kép minőség", "jpg quality", "kép quality beállítás", "jpeg minőség csökkentés", "webp quality"], status: "active", component: "ImageConvertTool", related: ["tomorites", "jpg-webp"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "felbontas-kiszamolo", category: "kep", title: "Képfelbontás kalkulátor – DPI/PPI számítás online", h1: "Képfelbontás kiszámolása", description: "DPI és pixel méret kalkulátor nyomtatáshoz és képernyőhöz. Inch, cm, mm konverzió, valós idejű eredmény.", keywords: ["felbontás kalkulátor", "dpi számítás", "ppi kalkulátor", "pixel cm", "nyomtatási méret", "dpi kiszámítás online"], status: "active", component: "FelbontasKiszamoloTool", related: ["atmeretezes", "tomeges-atmeretezes"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "levagas", category: "kep", title: "Kép kivágó online (crop) | Ingyenes", h1: "Kép kivágása", description: "Képek kivágása egyéni méretben vagy arányban böngészőben, szervermentes. Előnézet és pontos pixelkoordináták.", keywords: ["kép kivágás", "crop online", "kép crop", "kép vágás", "image crop online ingyenes"], status: "active", component: "LevagoTool", related: ["forgatas", "atmeretezes", "tukrozes"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "forgatas", category: "kep", title: "Kép forgatás online | Ingyenes, szervermentes", h1: "Kép forgatása", description: "Képek forgatása tetszőleges szögben vagy 90°-os lépésekben, böngészőben. Előnézettel, szervermentes.", keywords: ["kép forgatás", "rotate image online", "kép elforgatás", "kép forgatás online ingyenes"], status: "active", component: "ForgatoTool", related: ["tukrozes", "90-fokos-forgatas", "levagas"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "tukrozes", category: "kep", title: "Kép tükrözés online (flip) | Ingyenes", h1: "Kép tükrözése", description: "Vízszintes és függőleges tükrözés böngészőben, szervermentes. Előnézet, egy kattintásos letöltés.", keywords: ["kép tükrözés", "flip image online", "kép horizontális tükrözés", "kép flip online ingyenes"], status: "active", component: "TukrozesTool", related: ["forgatas", "90-fokos-forgatas"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "90-fokos-forgatas", category: "kep", title: "Kép 90°-os forgatás | Gyors online eszköz", h1: "Kép 90°-os forgatása", description: "Gyors 90°-os forgatás balra vagy jobbra egy kattintással. Batch feldolgozás, böngészőben.", keywords: ["90 fok forgatás", "rotate 90 online", "kép 90 fokos forgatás", "quick rotate image"], status: "active", component: "NinetyDegRotateTool", related: ["forgatas", "tukrozes"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "elmosas", category: "kep", title: "Kép elmosás (Gaussian blur) online | Ingyenes", h1: "Kép elmosása", description: "Gaussian blur szűrő képekre állítható erősséggel. Előnézet, böngészőben, szervermentes.", keywords: ["kép elmosás", "blur online", "gaussian blur kép", "kép homályosítás", "blur image online ingyenes"], status: "active", component: "ElmosasTool", related: ["pixelates", "fekete-feher"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "pixelates", category: "kep", title: "Kép pixelesítés online | Cenzúra, pixelart", h1: "Kép pixelesítése", description: "Pixelart és cenzúra hatás képekre állítható pixel mérettel. Böngészőben, szervermentes.", keywords: ["pixelate online", "cenzúra kép", "kép pixelesítés", "pixelart effect", "mosaic image online"], status: "active", component: "PixelatesTool", related: ["elmosas", "fekete-feher"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "fekete-feher", category: "kep", title: "Kép fekete-fehér konverzió online | Grayscale", h1: "Kép fekete-fehérré alakítása", description: "Színes képek grayscale átalakítása Canvas API-val, böngészőben. Előnézet, batch feldolgozás.", keywords: ["fekete fehér kép", "grayscale online", "kép szürkeárnyalatos", "black and white image online"], status: "active", component: "FeketeFeherTool", related: ["kontraszt-fenyero", "elmosas"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "kontraszt-fenyero", category: "kep", title: "Kép kontraszt és fényerő beállítás online", h1: "Kontraszt és fényerő állítása", description: "Képek kontrasztjának és fényerejének módosítása csúszkákkal, valós idejű előnézettel. Böngészőben, szervermentes.", keywords: ["kontraszt állítás", "fényerő beállítás", "brightness contrast online", "kép fényerő", "kép kontraszt online"], status: "active", component: "KontrasztFenyeroTool", related: ["fekete-feher", "tomorites"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "vizjel", category: "kep", title: "Vízjel hozzáadása képekhez online | Ingyenes", h1: "Vízjel hozzáadása", description: "Szöveges vízjel elhelyezése képekre pozíció, betűméret és átlátszóság beállítással. Böngészőben, szervermentes.", keywords: ["vízjel online", "watermark kép", "vízjel hozzáadás", "watermark image online", "kép vízjelezés"], status: "active", component: "VizjelTool", related: ["keret-padding", "tomeges-konvertalas"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "keret-padding", category: "kep", title: "Keret és padding hozzáadása képekhez online", h1: "Keret és padding hozzáadása", description: "Egyszínű keret hozzáadása képek köré méret és szín beállítással. Böngészőben, szervermentes.", keywords: ["keret kép", "padding kép", "border image online", "kép keret hozzáadás", "image border online"], status: "active", component: "KeretPaddingTool", related: ["vizjel", "atmeretezes"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "metadata-megjelenites", category: "kep", title: "EXIF metadata olvasó online | Kép információk", h1: "Kép EXIF/metadata megjelenítése", description: "JPG EXIF adatok megjelenítése: dátum, GPS koordináták, kamera modell, rekesz, zársebesség. Böngészőben, szervermentes.", keywords: ["exif olvasó", "metadata megjelenítés", "exif adatok", "kép információ", "exif viewer online", "kamera adatok kép"], status: "active", component: "MetadataMegjelenitesTool", related: ["metadata-torles", "fajl-informacio"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "metadata-torles", category: "kep", title: "Kép EXIF metadata törlése online | Adatvédelem", h1: "Kép metadata törlése", description: "EXIF és metadata eltávolítása képekből adatvédelmi okokból. GPS, kamera info törlése böngészőben, szervermentes.", keywords: ["exif törlés", "metadata eltávolítás", "exif remove online", "kép metadata törlés", "gps adatok törlés kép"], status: "active", component: "MetadataTorleseTool", related: ["metadata-megjelenites", "tomorites"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "tomeges-konvertalas", category: "kep", title: "Tömeges képkonvertálás online | Batch convert", h1: "Tömeges képkonvertálás", description: "Több tucat kép konvertálása egyszerre különböző formátumok között, ZIP kimenettel. Böngészőben, szervermentes.", keywords: ["batch konvertálás", "bulk image convert", "tömeges kép konvertáló", "kép batch convert online"], status: "active", component: "TomegesKonvertalasTool", related: ["tomeges-atmeretezes", "tomeges-tomorites", "jpg-webp"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "tomeges-atmeretezes", category: "kep", title: "Tömeges képátméretezés online | Batch resize", h1: "Tömeges képátméretezés", description: "Több kép átméretezése egyszerre azonos paraméterekkel, ZIP letöltéssel. Böngészőben, szervermentes.", keywords: ["batch resize", "tömeges átméretezés", "bulk resize image", "kép batch átméretezés online"], status: "active", component: "TomegesAtmererezesTool", related: ["tomeges-konvertalas", "atmeretezes"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "tomeges-tomorites", category: "kep", title: "Tömeges képtömörítés online | Batch compress", h1: "Tömeges képtömörítés", description: "Több kép tömörítése egyszerre quality beállítással, ZIP letöltéssel. Böngészőben, szervermentes.", keywords: ["batch tömörítés", "bulk compress image", "tömeges képtömörítés", "kép batch compress online"], status: "active", component: "TomegesTomoritesTool", related: ["tomorites", "tomeges-konvertalas"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "tomeges-atnevezes", category: "kep", title: "Tömeges képátnevezés online | Batch rename", h1: "Tömeges képátnevezés", description: "Képfájlok tömeges átnevezése sablon alapján (pl. 'termek-{001}.jpg'), ZIP letöltéssel. Böngészőben.", keywords: ["batch rename image", "bulk rename", "tömeges átnevezés", "kép átnevezés sablon"], status: "active", component: "TomegesAtnevezesTool", related: ["tomeges-zip-letoltes", "tomeges-konvertalas"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "tomeges-zip-letoltes", category: "kep", title: "Képek ZIP-be csomagolása online | Batch ZIP", h1: "Képek ZIP-be csomagolása", description: "Feltöltött képek ZIP archívumba csomagolása egy kattintással. Böngészőben, szervermentes.", keywords: ["zip képek", "batch download zip", "kép zip csomagolás", "images to zip online"], status: "active", component: "TomegesZipLetoltesTool", related: ["tomeges-atnevezes", "zip-keszito"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },

  // ═══ PDF ════════════════════════════════════════════════
  { slug: "osszeillesztes", category: "pdf", title: "PDF összefűzés online | Merge PDF ingyenes", h1: "PDF összefűzés", description: "Több PDF összefűzése egyetlen dokumentummá drag&drop sorrenddel, böngészőben. Szervermentes, privát, korlátlan méret.", keywords: ["pdf merge", "pdf összefűzés", "pdf összeillesztés online", "merge pdf ingyenes", "pdf egyesítés"], status: "active", component: "PdfMergeTool", related: ["szetbontas", "oldalak-kivalasztasa", "oldalak-sorrendje"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [{ q: "Feltöltődnek a PDF-jeim szerverre?", a: "Nem – minden feldolgozás a böngésződben történik." }] },
  { slug: "szetbontas", category: "pdf", title: "PDF szétbontás oldalakra online | Split PDF", h1: "PDF szétbontása", description: "PDF felosztása különálló oldalakra vagy oldalcsoportokra, ZIP letöltéssel. Böngészőben, szervermentes.", keywords: ["pdf split", "pdf szétbontás", "pdf darabolás", "pdf oldalak szétválasztás", "split pdf online ingyenes"], status: "active", component: "PdfSplitTool", related: ["osszeillesztes", "oldalak-kivalasztasa"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "oldalak-kivalasztasa", category: "pdf", title: "PDF oldalak kiválasztása és kinyerése online", h1: "PDF oldalak kiválasztása", description: "Adott oldalak kinyerése PDF-ből oldalszám tartományokkal. Előnézet, böngészőben, szervermentes.", keywords: ["pdf extract pages", "pdf oldalak kinyerés", "pdf oldal kiválasztás", "pdf page extract online"], status: "active", component: "PdfOldalakKivalasztasaTool", related: ["szetbontas", "oldalak-sorrendje", "oldalak-torlese"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "oldalak-sorrendje", category: "pdf", title: "PDF oldalak átrendezése online | Reorder", h1: "PDF oldalak átrendezése", description: "PDF oldalak átrendezése drag&drop segítségével, thumbnail előnézettel. Böngészőben, szervermentes.", keywords: ["pdf reorder", "pdf pages order", "pdf oldalak rendezés", "pdf sorrend változtatás"], status: "active", component: "PdfOldalakSorrendjeTool", related: ["oldalak-kivalasztasa", "osszeillesztes"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "oldalak-forgatasa", category: "pdf", title: "PDF oldalak forgatása online | Rotate", h1: "PDF oldalak forgatása", description: "Egyes PDF oldalak elforgatása 90°/180°/270° fokkal. Előnézet, böngészőben, szervermentes.", keywords: ["pdf rotate", "pdf forgatás", "pdf oldal elforgatás", "pdf rotate online"], status: "active", component: "PdfOldalakForgatasaTool", related: ["oldalak-sorrendje", "oldalak-kivalasztasa"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "oldalak-torlese", category: "pdf", title: "PDF oldalak törlése online | Remove pages", h1: "PDF oldalak törlése", description: "Meghatározott oldalak törlése PDF dokumentumból előnézettel. Böngészőben, szervermentes.", keywords: ["pdf delete pages", "pdf oldal törlés", "pdf remove pages", "pdf oldal eltávolítás online"], status: "active", component: "PdfOldalakTorleseTool", related: ["oldalak-kivalasztasa", "szetbontas"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "pdf-keppe", category: "pdf", title: "PDF → Kép konvertáló online | PNG/JPG export", h1: "PDF → Kép konvertálás", description: "PDF oldalak exportálása PNG/JPG képekként felbontás beállítással, ZIP letöltéssel. Böngészőben, szervermentes.", keywords: ["pdf to image", "pdf png", "pdf kép konvertálás", "pdf to jpg online", "pdf képpé alakítás"], status: "active", component: "PdfKeppeTool", related: ["kepek-pdfbe", "osszeillesztes"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "kepek-pdfbe", category: "pdf", title: "Képek PDF-be összefűzése online | Image to PDF", h1: "Képek → PDF konvertálás", description: "JPG/PNG képek PDF dokumentummá alakítása oldal méret beállítással. Drag&drop sorrend, böngészőben.", keywords: ["image to pdf", "jpg pdf", "kép pdf konvertálás", "képek pdf-be", "jpg to pdf online ingyenes"], status: "active", component: "KepekPdfbeTool", related: ["pdf-keppe", "osszeillesztes"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "pdf-informacio", category: "pdf", title: "PDF információk megjelenítése online | Metadata", h1: "PDF fájl információk", description: "PDF metadata megjelenítése: oldalszám, méret, szerző, létrehozás dátuma, biztonsági beállítások. Böngészőben.", keywords: ["pdf info", "pdf metadata", "pdf fájl információ", "pdf properties online", "pdf adatok megjelenítés"], status: "active", component: "PdfInfoTool", related: ["osszeillesztes", "fajl-informacio"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },

  // ═══ ADAT ════════════════════════════════════════════════
  {
    slug: "csv-json", category: "adat",
    title: "CSV → JSON konvertáló | Ingyenes online",
    h1: "CSV → JSON konvertáló",
    description: "CSV fájl JSON-né alakítása böngészőben, szerverfeltöltés nélkül. Delimiter auto-detect, header opció, előnézet.",
    keywords: ["csv json", "csv to json online", "csv konvertáló"],
    status: "active", component: "CsvJsonTool",
    updatedAt: "2025-11-01", launchedAt: "2025-10-20",
    inputFormats: ["text/csv", "text/plain"], outputFormat: "application/json", acceptMultiple: false,
    related: ["json-csv", "tsv-csv", "csv-tisztitas"],
    faq: [
      { q: "Milyen delimiter-eket ismer fel?", a: "Vesszőt (,), pontosvesszőt (;), tabulátort és pipe (|) karaktert – auto-detect módban." },
      { q: "Nagy fájlokon is működik?", a: "Igen, a feldolgozás Web Workerben fut, az UI nem fagy le." },
      { q: "Megőrzi a számok típusát?", a: "Igen, auto-type detection opcionálisan bekapcsolható." },
    ],
  },
  {
    slug: "json-csv", category: "adat",
    title: "JSON → CSV konvertáló online | Ingyenes",
    h1: "JSON → CSV konvertáló",
    description: "JSON tömb konvertálása CSV táblázattá böngészőben, delimiter választással. Szerverfeltöltés nélkül, privát.",
    keywords: ["json csv", "json to csv", "json konvertáló", "csv export"],
    status: "active", component: "JsonCsvTool",
    updatedAt: "2026-02-23", launchedAt: "2026-02-23",
    inputFormats: ["application/json"], outputFormat: "text/csv", acceptMultiple: false,
    related: ["csv-json", "tsv-csv", "csv-tisztitas"],
    faq: [
      { q: "Milyen JSON formátumot fogad?", a: "Objektumok tömbjét (array of objects) – pl. [{\"nev\": \"Béla\", \"kor\": 30}]. A kulcsok lesznek a CSV fejlécek." },
      { q: "Nagy fájloknál is működik?", a: "Igen, a feldolgozás Web Workerben fut, az UI nem fagy le. Akár több ezer sor is feldolgozható." },
    ],
  },
  { slug: "tsv-csv", category: "adat", title: "TSV → CSV konvertáló online | Ingyenes", h1: "TSV → CSV konvertáló", description: "Tab-separated values fájl konvertálása comma-separated CSV-vé böngészőben. Szervermentes, privát.", keywords: ["tsv csv", "tsv to csv", "tsv konvertálás", "tab separated csv"], status: "active", component: "DelimiterConvertTool", related: ["csv-json", "csv-tsv", "csv-tisztitas"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "csv-tsv", category: "adat", title: "CSV → TSV konvertáló online | Ingyenes", h1: "CSV → TSV konvertáló", description: "CSV fájl konvertálása tab-elválasztású TSV formátumba böngészőben. Szervermentes, privát.", keywords: ["csv tsv", "csv to tsv", "csv tab konvertálás"], status: "active", component: "DelimiterConvertTool", related: ["tsv-csv", "csv-json", "csv-tisztitas"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "csv-tisztitas", category: "adat", title: "CSV adattisztítás online | Üres sorok, duplikátumok", h1: "CSV adattisztítás", description: "CSV tisztítása: üres sorok törlése, whitespace normalizálás, duplikált sorok eltávolítása. Böngészőben, szervermentes.", keywords: ["csv tisztítás", "csv clean", "csv adattisztítás online", "csv üres sorok"], status: "active", component: "CsvTisztitasTool", related: ["csv-json", "fejlec-atnevezes", "oszlopok-kivalasztasa"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "fejlec-atnevezes", category: "adat", title: "CSV fejlécek átnevezése online | Header rename", h1: "CSV fejlécek átnevezése", description: "CSV oszlopfejlécek átnevezése vizuális szerkesztővel. Feltöltés, szerkesztés, letöltés – böngészőben.", keywords: ["csv fejléc rename", "csv header rename", "csv oszlopnév"], status: "active", component: "FejlecAtnevezesTool", related: ["csv-tisztitas", "oszlopok-kivalasztasa", "csv-json"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "oszlopok-kivalasztasa", category: "adat", title: "CSV oszlopok kiválasztása online | Column select", h1: "CSV oszlopok kiválasztása", description: "CSV fájlból meghatározott oszlopok megtartása vagy törlése checkbox-szal. Böngészőben, szervermentes.", keywords: ["csv columns select", "csv oszlop kiválasztás", "csv column filter"], status: "active", component: "OszlopKivalasztasTool", related: ["fejlec-atnevezes", "sorok-szurese", "csv-tisztitas"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "sorok-szurese", category: "adat", title: "CSV sorok szűrése online | Row filter", h1: "CSV sorok szűrése", description: "CSV sorok szűrése feltétel alapján: tartalmaz, egyenlő, nagyobb, kisebb, nem üres. Böngészőben.", keywords: ["csv filter", "csv sorok szűrése", "csv row filter online"], status: "active", component: "SorokSzureseTool", related: ["oszlopok-kivalasztasa", "csv-tisztitas"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "oszlop-szetvalasztas", category: "adat", title: "CSV oszlop szétválasztás online | Column split", h1: "CSV oszlop szétválasztása", description: "Egy CSV oszlop felosztása több oszlopra delimiter alapján. Automatikus oszlopszám detektálás.", keywords: ["csv split column", "csv oszlop szétválasztás", "csv column split"], status: "active", component: "OszlopSzetvalasztasTool", related: ["csv-tisztitas", "oszlopok-kivalasztasa"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "ertekek-normalizalasa", category: "adat", title: "CSV értékek normalizálása online | Min-Max, Z-score", h1: "CSV értékek normalizálása", description: "Számoszlopok normalizálása 0–1 skálára (Min-Max) vagy z-score alapján. Automatikus numerikus oszlop detektálás.", keywords: ["normalizálás", "csv normalize", "min-max normalizálás", "z-score csv"], status: "active", component: "ErtekekNormalizalasaTool", related: ["csv-tisztitas", "oszlopok-kivalasztasa"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "tomeges-konvertalas-zip", category: "adat", title: "Tömeges CSV/JSON konvertálás ZIP-be | Batch", h1: "Tömeges adatkonvertálás", description: "Több CSV fájl egyszerre JSON-né alakítása ZIP letöltéssel. Böngészőben, szervermentes, batch feldolgozás.", keywords: ["batch csv json", "tömeges csv konvertálás", "bulk csv json", "csv batch convert zip"], status: "active", component: "TomegesKonvertalasZipTool", related: ["csv-json", "json-csv"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },

  // ═══ SZÖVEG ══════════════════════════════════════════════
  {
    slug: "slug-generator", category: "szoveg",
    title: "Slug generátor online | URL-barát szöveg",
    h1: "Slug generátor",
    description: "Szövegből URL-barát slug generálása: ékezetek eltávolítása, kisbetű, kötőjel. Magyar ékezetek kezelésével.",
    keywords: ["slug generator", "url slug", "slug készítő"],
    status: "active", component: "SlugGeneratorTool",
    updatedAt: "2025-11-05", launchedAt: "2025-10-25",
    related: ["ekezetek-eltavolitasa", "kisbetu-nagybetu", "case-konverter"],
    faq: [
      { q: "Mire jó a slug?", a: "A slug URL-barát szöveg: csak kisbetűk, számok és kötőjelek – pl. 'Alma Körte' → 'alma-korte'." },
      { q: "Kezel ékezetes karaktereket?", a: "Igen, az összes magyar ékezetet (á,é,í,ó,ö,ő,ú,ü,ű) automatikusan konvertálja." },
    ],
  },
  { slug: "sorok-rendezese", category: "szoveg", title: "Szöveg sorok rendezése online | Ingyenes ABC rendezés", h1: "Szövegsorok rendezése", description: "Sorok ABC rendezése növekvő, csökkenő vagy véletlenszerű sorrendbe – böngészőben, szerver nélkül. Magyar ékezetes rendezés támogatással.", keywords: ["sorok rendezése", "sort lines", "abc rendezés online", "szöveg sorba rendezés", "szöveg rendezés online"], status: "active", component: "TextTransformTool", related: ["ismetlodok-torlese", "ures-sorok-torlese"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "ismetlodok-torlese", category: "szoveg", title: "Ismétlődő sorok törlése online | Duplikátum szűrő", h1: "Ismétlődő sorok törlése", description: "Duplikált sorok eltávolítása szövegből – kis-/nagybetű érzékeny és érzéketlen mód. Böngészőben, privát.", keywords: ["duplikált sorok", "deduplicate", "ismétlődő sorok törlése", "duplicate remover online", "szöveg deduplikálás"], status: "active", component: "TextTransformTool", related: ["sorok-rendezese", "ures-sorok-torlese"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "ures-sorok-torlese", category: "szoveg", title: "Üres sorok törlése szövegből | Online eszköz", h1: "Üres sorok törlése", description: "Üres és whitespace-only sorok eltávolítása szövegből egy kattintással. Böngészőben, privát.", keywords: ["üres sorok törlése", "remove blank lines", "üres sorok eltávolítása", "blank lines remover", "szöveg tisztítás"], status: "active", component: "TextTransformTool", related: ["whitespace-tisztitas", "ismetlodok-torlese"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "whitespace-tisztitas", category: "szoveg", title: "Whitespace tisztítás online | Szóközök normalizálása", h1: "Whitespace tisztítása", description: "Felesleges szóközök, tabulátorok és sortörések normalizálása – szöveg tisztítás böngészőben.", keywords: ["whitespace", "trim", "whitespace tisztítás", "szóköz eltávolítás", "szöveg trim online"], status: "active", component: "TextTransformTool", related: ["ures-sorok-torlese", "specialis-karakterek-torlese"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "ekezetek-eltavolitasa", category: "szoveg", title: "Ékezetek eltávolítása online | Magyar ékezet konverter", h1: "Ékezetek eltávolítása", description: "Magyar és egyéb ékezetes karakterek latin megfelelőre cserélése – á→a, ö→o, ű→u. Böngészőben, szerver nélkül.", keywords: ["ékezet eltávolítás", "diacritics remove", "ékezet konvertáló", "magyar ékezet eltávolítás", "remove accents online"], status: "active", component: "TextTransformTool", related: ["slug-generator", "specialis-karakterek-torlese"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "specialis-karakterek-torlese", category: "szoveg", title: "Speciális karakterek törlése online | Szöveg tisztítás", h1: "Speciális karakterek törlése", description: "Nem ASCII és speciális karakterek eltávolítása szövegből – csak betűk, számok és alapvető írásjelek maradnak.", keywords: ["speciális karakterek", "special chars remove", "karakter törlés", "szöveg tisztítás online", "speciális karakter eltávolítás"], status: "active", component: "TextTransformTool", related: ["ekezetek-eltavolitasa", "whitespace-tisztitas"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "karaktercsere", category: "szoveg", title: "Karakter csere online | Szöveg keresés és csere", h1: "Karakter csere", description: "Karakterek és szövegrészek egyszerű cseréje regex nélkül – kis-/nagybetű érzékeny mód. Böngészőben, privát.", keywords: ["karakter csere", "find replace", "szöveg csere online", "karakter csere online", "text replace"], status: "active", component: "KarakterCsereTool", related: ["kereses-csere", "regex-kereses-csere"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "kereses-csere", category: "szoveg", title: "Keresés és csere online szövegben | Find & Replace", h1: "Keresés és csere", description: "Szövegben keresés és csere case-sensitive és teljes szó egyezés opcióval – böngészőben, szervermentes.", keywords: ["keresés csere", "find replace text", "szöveg keresés csere online", "find and replace online", "szöveg csere eszköz"], status: "active", component: "KeresesCsereTool", related: ["karaktercsere", "regex-kereses-csere"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "regex-kereses-csere", category: "szoveg", title: "Regex keresés és csere online | Reguláris kifejezés", h1: "Regex keresés és csere", description: "Reguláris kifejezéssel keresés és csere szövegben – flag választás, match szám, példa minták. Böngészőben.", keywords: ["regex", "regex replace online", "reguláris kifejezés", "regex tesztelő", "regex csere online"], status: "active", component: "RegexCsereTool", related: ["kereses-csere", "karaktercsere"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "kisbetu-nagybetu", category: "szoveg", title: "Kisbetű-nagybetű konvertáló online | Case convert", h1: "Kisbetű/nagybetű konvertálás", description: "Szöveg átalakítása NAGYBETŰ, kisbetű vagy Első Betű Nagy formátumba – egy kattintással, böngészőben.", keywords: ["uppercase lowercase", "case convert", "kisbetű nagybetű", "nagybetű konvertálás", "szöveg kisbetű online"], status: "active", component: "TextTransformTool", related: ["case-konverter", "slug-generator"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "case-konverter", category: "szoveg", title: "Case konverter | camelCase, snake_case, PascalCase online", h1: "Case konverter", description: "Szöveg átalakítása camelCase, snake_case, PascalCase, kebab-case formátumra – fejlesztőknek és tartalom készítőknek.", keywords: ["case converter", "camelcase", "snake_case", "pascalcase", "kebab-case", "case konverter online"], status: "active", component: "TextTransformTool", related: ["kisbetu-nagybetu", "slug-generator"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },

  // ═══ FEJLESZTŐ ════════════════════════════════════════════
  {
    slug: "json-formazas", category: "fejleszto",
    title: "JSON formázó (prettify + minify) online | Ingyenes",
    h1: "JSON formázása",
    description: "JSON beautify és minify – behúzás, sortörések, szintaxiskiemelés, validálás hibajelzéssel. Böngészőben, szerver nélkül.",
    keywords: ["json format", "json prettify", "json beautify", "json minify", "json validátor"],
    status: "active", component: "JsonFormazasTool",
    updatedAt: "2026-02-23", launchedAt: "2026-02-23",
    related: ["json-minimalas", "json-ellenorzes", "json-csv"],
    faq: [
      { q: "Validálja is a JSON-t?", a: "Igen, valós időben – ha a JSON érvénytelen, azonnal piros kerettel és a hiba sorszámával jelzi a problémát." },
      { q: "Elveszítem az adataimat formázásnál?", a: "Nem, a formázás (prettify/minify) kizárólag a whitespace-t módosítja, az adatok érintetlenül maradnak." },
    ],
  },
  { slug: "json-minimalas", category: "fejleszto", title: "JSON minifikáló online | Whitespace eltávolítás", h1: "JSON minifikálása", description: "JSON whitespace eltávolítása production build-hez – méretcsökkentés százalékkal. Böngészőben, szerver nélkül.", keywords: ["json minify", "json tömörítés", "json minimalizálás online", "json whitespace"], status: "active", component: "JsonMinimalasTool", related: ["json-formazas", "json-ellenorzes"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "json-ellenorzes", category: "fejleszto", title: "JSON validátor online | Szintaxis ellenőrzés", h1: "JSON érvényesítése", description: "JSON szintaxis validálás hibajelzéssel és sor-szám megjelöléssel – valós idejű, böngészőben.", keywords: ["json validate", "json validator", "json ellenőrzés", "json szintaxis", "json validátor online"], status: "active", component: "JsonEllenorzesTool", related: ["json-formazas", "json-minimalas"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "yaml-ellenorzes", category: "fejleszto", title: "YAML validátor online | Szintaxis ellenőrzés", h1: "YAML érvényesítése", description: "YAML szintaxis ellenőrzés részletes hibajelzéssel – sor és pozíció megjelölése. Böngészőben, szervermentes.", keywords: ["yaml validate", "yaml validátor", "yaml ellenőrzés", "yaml szintaxis", "yaml validator online"], status: "active", component: "CodeFormatterTool", related: ["yaml-formazas", "json-ellenorzes"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "yaml-formazas", category: "fejleszto", title: "YAML formázó online | Prettify", h1: "YAML formázása", description: "YAML prettify és normalizálás konzisztens behúzással – js-yaml alapú. Böngészőben, szervermentes.", keywords: ["yaml format", "yaml prettify", "yaml formázó", "yaml beautify online"], status: "active", component: "CodeFormatterTool", related: ["yaml-ellenorzes", "json-formazas"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "xml-formazas", category: "fejleszto", title: "XML formázó online | Prettify és behúzás", h1: "XML formázása", description: "XML beautify és behúzás normalizálás – szintaxiskiemelés nélkül, tiszta kimenet. Böngészőben.", keywords: ["xml format", "xml prettify", "xml formázó", "xml beautify online", "xml indent"], status: "active", component: "CodeFormatterTool", related: ["xml-minimalas", "xml-ellenorzes"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "xml-minimalas", category: "fejleszto", title: "XML minifikáló online | Tömörítés", h1: "XML minifikálása", description: "XML whitespace és kommentek eltávolítása minimális méretű kimenethez. Méretcsökkentés százalékkal.", keywords: ["xml minify", "xml tömörítés", "xml minifikálás online"], status: "active", component: "CodeFormatterTool", related: ["xml-formazas", "xml-ellenorzes"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "xml-ellenorzes", category: "fejleszto", title: "XML validátor online | Well-formedness", h1: "XML érvényesítése", description: "XML szintaxis validálás és well-formedness ellenőrzés DOMParser-rel. Böngészőben, szervermentes.", keywords: ["xml validate", "xml validátor", "xml ellenőrzés online", "xml well-formed"], status: "active", component: "CodeFormatterTool", related: ["xml-formazas", "yaml-ellenorzes"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "html-formazas", category: "fejleszto", title: "HTML formázó online | Beautify", h1: "HTML formázása", description: "HTML kód beautify és behúzás normalizálás – void elemek kezelése, konzisztens indent. Böngészőben.", keywords: ["html format", "html beautify", "html formázó", "html indent online", "html prettify"], status: "active", component: "CodeFormatterTool", related: ["html-minimalas", "xml-formazas"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "html-minimalas", category: "fejleszto", title: "HTML minifikáló online | Fejlesztő eszköz", h1: "HTML minifikálása", description: "HTML whitespace és kommentek eltávolítása production build-hez. Méretcsökkentés százalékkal.", keywords: ["html minify", "html tömörítés", "html minifikálás fejlesztő"], status: "active", component: "CodeFormatterTool", related: ["html-formazas", "css-minimalas"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "css-formazas", category: "fejleszto", title: "CSS formázó online | Beautify", h1: "CSS formázása", description: "CSS kód beautify konzisztens behúzással – property rendezés, szelektorok elválasztása. Böngészőben.", keywords: ["css format", "css beautify", "css formázó online", "css prettify", "css indent"], status: "active", component: "CodeFormatterTool", related: ["css-minimalas", "html-formazas"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "css-minimalas", category: "fejleszto", title: "CSS minifikáló online | Tömörítés", h1: "CSS minifikálása", description: "CSS whitespace és kommentek eltávolítása, rövidítések – kisebb fájlméret production-hoz.", keywords: ["css minify", "css tömörítés", "css minifikálás online", "css compress"], status: "active", component: "CodeFormatterTool", related: ["css-formazas", "js-minimalas"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "js-formazas", category: "fejleszto", title: "JavaScript formázó online | Beautify", h1: "JavaScript formázása", description: "JavaScript kód prettify és behúzás normalizálás – string-aware, blokk szintű indent. Böngészőben.", keywords: ["js format", "js beautify", "javascript formázó", "js prettify online", "javascript beautify"], status: "active", component: "CodeFormatterTool", related: ["js-minimalas", "json-formazas"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "js-minimalas", category: "fejleszto", title: "JavaScript minifikáló online | Tömörítés", h1: "JavaScript minifikálása", description: "JavaScript kód minifikálása: kommentek, whitespace eltávolítása production build-hez.", keywords: ["js minify", "javascript minify", "js tömörítés online", "javascript minifikálás"], status: "active", component: "CodeFormatterTool", related: ["js-formazas", "css-minimalas"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "base64-kodolo-dekodolo", category: "fejleszto", title: "Base64 kódoló/dekódoló online | Ingyenes", h1: "Base64 kódolás és dekódolás", description: "Szöveg Base64 kódolása és dekódolása böngészőben – UTF-8 támogatás, valós idejű. Szervermentes.", keywords: ["base64 encode decode", "base64 online", "base64 kódoló", "base64 dekódoló", "base64 konvertáló"], status: "active", component: "Base64Tool", related: ["url-kodolo-dekodolo", "html-entity-kodolo-dekodolo"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "url-kodolo-dekodolo", category: "fejleszto", title: "URL kódoló/dekódoló online | Percent encoding", h1: "URL kódolás és dekódolás", description: "URL encode/decode: %XX formátum kódolása és visszaalakítása – encodeURIComponent és encodeURI mód.", keywords: ["url encode decode", "percent encoding", "url kódoló", "url dekódoló", "encodeURIComponent online"], status: "active", component: "UrlKodoloTool", related: ["base64-kodolo-dekodolo", "html-entity-kodolo-dekodolo"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "html-entity-kodolo-dekodolo", category: "fejleszto", title: "HTML entity kódoló/dekódoló online | Escape", h1: "HTML entity kódolás/dekódolás", description: "HTML entity-k kódolása (&amp;, &lt;, &gt;, &quot;) és visszaalakítása – valós idejű, böngészőben.", keywords: ["html entity", "html escape", "html entity kódoló", "html escape online", "html karakter kódolás"], status: "active", component: "HtmlEntityTool", related: ["url-kodolo-dekodolo", "base64-kodolo-dekodolo"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },

  // ═══ MARKDOWN ════════════════════════════════════════════
  { slug: "markdown-html", category: "markdown", title: "Markdown → HTML konvertáló online | Ingyenes", h1: "Markdown → HTML konvertálás", description: "Markdown szöveg HTML-lé alakítása valós idejű előnézettel és nyers HTML kimenettel. Böngészőben, szervermentes.", keywords: ["markdown html", "md to html", "markdown konvertáló", "markdown html online", "md konvertálás"], status: "active", component: "MarkdownHtmlTool", related: ["html-szovegge", "html-minimalas-html"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },

  // ═══ HTML ════════════════════════════════════════════════
  { slug: "html-szovegge", category: "html", title: "HTML → Szöveg konvertáló online | Tag eltávolítás", h1: "HTML szöveggé alakítása", description: "HTML kód tag-ek eltávolítása, tiszta szöveg kinyerése DOMParser-rel. Böngészőben, szervermentes.", keywords: ["html to text", "html strip tags", "html szöveggé", "html tag eltávolítás", "html text online"], status: "active", component: "HtmlTextTool", related: ["markdown-html", "html-minimalas-html"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "html-minimalas-html", category: "html", title: "HTML minifikáló online | Tömörítés", h1: "HTML minifikálása", description: "HTML kód tömörítése: felesleges whitespace, kommentek és sortörések eltávolítása. Méretcsökkentés százalékkal.", keywords: ["html minify online", "html tömörítés", "html minifikálás", "html compress online"], status: "active", component: "HtmlMinTool", related: ["html-szovegge", "markdown-html"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },

  // ═══ EXCEL ════════════════════════════════════════════════
  { slug: "xlsx-csv", category: "excel", title: "Excel (XLSX) → CSV konvertáló online | Ingyenes", h1: "Excel → CSV konvertálás", description: "Excel konvertálása CSV-vé böngészőben munkalap kiválasztással. SheetJS alapú, szervermentes, privát.", keywords: ["xlsx csv", "excel csv", "excel csv konvertálás", "xlsx to csv online", "excel konvertáló"], status: "active", component: "XlsxCsvTool", related: ["xlsx-json", "csv-xlsx", "xlsx-megtekinto"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "xlsx-json", category: "excel", title: "Excel (XLSX) → JSON konvertáló online | Ingyenes", h1: "Excel → JSON konvertálás", description: "Excel fájl JSON-né alakítása munkalap és fejléc opciókkal. Böngészőben, szervermentes.", keywords: ["xlsx json", "excel to json", "excel json konvertálás", "xlsx json online", "excel api adat"], status: "active", component: "XlsxJsonTool", related: ["xlsx-csv", "csv-json", "json-csv"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "csv-xlsx", category: "excel", title: "CSV → Excel (XLSX) konvertáló online | Ingyenes", h1: "CSV → Excel konvertálás", description: "CSV fájl Excel XLSX formátumba alakítása böngészőben. Auto-detect delimiter, szervermentes.", keywords: ["csv xlsx", "csv to excel", "csv excel konvertálás", "csv xlsx online", "csv excel konvertáló"], status: "active", component: "CsvXlsxTool", related: ["xlsx-csv", "csv-json"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "xlsx-megtekinto", category: "excel", title: "Excel fájl megtekintő online | XLSX viewer ingyenes", h1: "Excel fájl megtekintése", description: "Excel fájlok megtekintése böngészőben szoftver telepítése nélkül. Munkalap váltás, keresés, szervermentes.", keywords: ["xlsx viewer", "excel megtekintő", "excel online megtekintés", "xlsx fájl megnyitás", "excel viewer ingyenes"], status: "active", component: "XlsxMegtekinteTool", related: ["xlsx-csv", "xlsx-json"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },

  // ═══ FÁJL ════════════════════════════════════════════════
  { slug: "zip-keszito", category: "fajl", title: "ZIP fájl készítő online | Ingyenes", h1: "ZIP archívum készítése", description: "Fájlok ZIP archívumba csomagolása böngészőben, szerverfeltöltés nélkül. Drag & drop, méretjelzés.", keywords: ["zip készítő", "zip creator online", "fájlok zip-be", "zip csomagolás online", "zip archívum készítés"], status: "active", component: "ZipKeszitoTool", related: ["zip-kibonto", "fajl-informacio"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "zip-kibonto", category: "fajl", title: "ZIP fájl kibontása online | Unzip", h1: "ZIP archívum kibontása", description: "ZIP fájlok kibontása böngészőben, tartalom előnézettel és egyenkénti letöltéssel. Szervermentes.", keywords: ["unzip online", "zip extract", "zip kibontás", "zip fájl megnyitás online", "zip tartalom"], status: "active", component: "ZipKibontoTool", related: ["zip-keszito", "fajl-informacio"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "hash-ellenorzo", category: "fajl", title: "Fájl hash ellenőrző | SHA-256, SHA-1 online", h1: "Fájl hash ellenőrzése", description: "Fájlok SHA-256, SHA-1 hash értékének kiszámítása böngészőben SubtleCrypto API-val. Biztonságos, szervermentes.", keywords: ["hash ellenőrző", "sha256 checksum", "sha1 hash", "fájl hash online", "hash kiszámítás"], status: "active", component: "HashTool", related: ["fajl-informacio", "zip-keszito"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "fajl-informacio", category: "fajl", title: "Fájl információk megjelenítése online | MIME type", h1: "Fájl információk", description: "Fájl neve, mérete, típusa, MIME type-ja és módosítás dátuma – File API-val, böngészőben.", keywords: ["fájl info", "file info", "mime type check", "fájl méret", "fájl típus ellenőrzés"], status: "active", component: "FajlInfoTool", related: ["hash-ellenorzo", "zip-keszito"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },

  // ═══ SEO ════════════════════════════════════════════════
  {
    slug: "title-meta-hossz", category: "seo",
    title: "Title és meta description hossz ellenőrző online",
    h1: "Title és meta description ellenőrzés",
    description: "SEO title és meta description karakter- és pixel-szélesség ellenőrzése SERP előnézettel. Valós idejű, böngészőben.",
    keywords: ["title hossz", "meta description hossz", "seo check", "serp preview", "title tag ellenőrző"],
    status: "active", component: "TitleMetaHosszTool",
    updatedAt: "2026-02-23", launchedAt: "2026-02-23",
    related: ["canonical-epito", "url-normalizalo", "fajlnev-optimalizalo"],
    faq: [
      { q: "Mi az ideális title tag hossz?", a: "A Google jellemzően 50–60 karaktert (kb. 580–600 pixel szélességet) jelenít meg. Ennél hosszabb title-ök csonkolódnak a keresési találatokban." },
      { q: "Hogyan működik a pixel szélesség becslése?", a: "A betűk átlagos szélességét (kb. 7px/karakter az Arial 16px-nél) veszi alapul. Ez közelítés – a Google pontos pixelszélessége betűtípustól és böngészőtől függ." },
    ],
  },
  { slug: "utm-eltavolito", category: "seo", title: "UTM paraméterek eltávolítása URL-ből", h1: "UTM paraméterek törlése", description: "URL-ből az összes UTM és tracking paraméter eltávolítása (utm_source, fbclid stb.).", keywords: ["utm remove", "url clean tracking"], status: "coming-soon", related: ["url-normalizalo", "canonical-epito"], faq: [] },
  { slug: "url-normalizalo", category: "seo", title: "URL normalizáló online", h1: "URL normalizálása", description: "URL tisztítása: trailing slash, protokoll, www, kisbetűsítés normalizálása.", keywords: ["url normalize", "url normalizálás"], status: "coming-soon", related: ["utm-eltavolito", "canonical-epito"], faq: [] },
  { slug: "canonical-epito", category: "seo", title: "Canonical URL tag generátor", h1: "Canonical tag generátor", description: "Canonical link tag HTML kód generálása URL alapján, egy kattintással másolható.", keywords: ["canonical url", "canonical tag generator"], status: "coming-soon", related: ["url-normalizalo"], faq: [] },
  { slug: "fajlnev-optimalizalo", category: "seo", title: "SEO fájlnév optimalizáló online", h1: "SEO fájlnév optimalizálás", description: "Fájlok nevének SEO optimalizálása: ékezetek, szóközök, speciális karakterek.", keywords: ["fájlnév seo", "image filename seo"], status: "coming-soon", related: ["slug-generator", "url-normalizalo"], faq: [] },
  { slug: "alt-szoveg-sablon", category: "seo", title: "Kép alt szöveg sablon generátor", h1: "Alt szöveg sablon", description: "Tömeges kép alt szöveg generálás sablon alapján, CSV exporttal.", keywords: ["alt text", "alt szöveg seo"], status: "coming-soon", related: ["fajlnev-optimalizalo"], faq: [] },
  { slug: "robots-txt-ellenorzo", category: "seo", title: "robots.txt ellenőrző és tesztelő online", h1: "robots.txt ellenőrzése", description: "robots.txt fájl beillesztése és URL-ek tesztelése: engedélyezett-e a crawling?", keywords: ["robots txt tester", "robots ellenőrző"], status: "coming-soon", related: ["sitemap-url-ellenorzo"], faq: [] },
  { slug: "sitemap-url-ellenorzo", category: "seo", title: "Sitemap URL ellenőrző online", h1: "Sitemap URL-ek ellenőrzése", description: "XML sitemap beillesztése és URL-ek listázása, státusz megjelenítéssel.", keywords: ["sitemap ellenőrző", "xml sitemap check"], status: "coming-soon", related: ["robots-txt-ellenorzo"], faq: [] },
];

// ─── SEO Content Merge ──────────────────────────────────────────────────────
// Auto-merge content data from separate files into tools
const ALL_SEO_CONTENT: ContentMap = {
  ...KEP_CONTENT,
  ...ADAT_CONTENT,
  ...SZOVEG_CONTENT,
  ...FEJLESZTO_CONTENT,
  ...PDF_CONTENT,
  ...EXCEL_CONTENT,
  ...MARKDOWN_CONTENT,
  ...HTML_CONTENT,
  ...FAJL_CONTENT,
  ...SEO_TOOL_CONTENT,
};

for (const tool of rawTools) {
  const seoData = ALL_SEO_CONTENT[tool.slug];
  if (seoData) {
    tool.content = seoData.content;
    tool.introText = seoData.introText;
    tool.guide = seoData.guide;
    // Merge FAQ: use content FAQ if tool has empty FAQ, otherwise keep existing
    if (!tool.faq || tool.faq.length === 0) {
      tool.faq = seoData.faq;
    } else if (seoData.faq.length > tool.faq.length) {
      // Append additional FAQ items from content data
      const existingQs = new Set(tool.faq.map(f => f.q));
      for (const faq of seoData.faq) {
        if (!existingQs.has(faq.q)) tool.faq.push(faq);
      }
    }
  }
}

const tools: Tool[] = rawTools;

// ─── Exports ─────────────────────────────────────────────────────────────────

export function getAllTools(): Tool[] { return tools; }
export function getToolBySlug(category: string, slug: string): Tool | undefined {
  return tools.find((t) => t.category === category && t.slug === slug);
}
export function getToolsByCategory(category: CategoryId): Tool[] {
  return tools.filter((t) => t.category === category);
}
export function getActiveTools(): Tool[] {
  return tools.filter((t) => t.status === "active");
}
export function getRelatedTools(tool: Tool): Tool[] {
  return tool.related
    .map((slug) => tools.find((t) => t.slug === slug))
    .filter((t): t is Tool => t !== undefined)
    .slice(0, 4);
}
export function getCategoryInfo(id: CategoryId): Category | undefined {
  return CATEGORIES.find((c) => c.id === id);
}
export function getActiveToolsCount(): number { return tools.filter((t) => t.status === "active").length; }
export function getTotalToolsCount(): number { return tools.length; }
