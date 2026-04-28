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

// ─── Romanian Content Data Imports ───────────────────────────
import { KEP_RO_CONTENT } from "./content/ro/kep-content.ts";
import { ADAT_RO_CONTENT } from "./content/ro/adat-content.ts";
import { SZOVEG_RO_CONTENT } from "./content/ro/szoveg-content.ts";
import { FEJLESZTO_RO_CONTENT } from "./content/ro/fejleszto-content.ts";
import { PDF_RO_CONTENT, EXCEL_RO_CONTENT, MARKDOWN_RO_CONTENT, HTML_RO_CONTENT, FAJL_RO_CONTENT, SEO_TOOL_RO_CONTENT } from "./content/ro/pdf-excel-other-content.ts";
import { CALCULATOR_RO_CONTENT } from "./content/ro/calculator-content.ts";
import { GEOMETRIE_RO_CONTENT } from "./content/ro/geometrie-content.ts";
import { CONVERSII_RO_CONTENT } from "./content/ro/conversii-content.ts";
import { FINANTE_RO_CONTENT } from "./content/ro/finante-content.ts";
import { SANATATE_RO_CONTENT } from "./content/ro/sanatate-content.ts";
import { TIMP_RO_CONTENT } from "./content/ro/timp-content.ts";

// ─── i18n Imports ────────────────────────────────────────────
import { ui } from "./ui-labels.ts";
import { CURRENT_LANG } from "../i18n/index.ts";
import type { SupportedLang } from "../i18n/index.ts";

// ─── Romanian Tool Translations ──────────────────────────────
import { KEP_RO } from "./i18n/ro-tools-kep.ts";
import { PDF_RO } from "./i18n/ro-tools-pdf.ts";
import { ADAT_RO } from "./i18n/ro-tools-adat.ts";
import { SZOVEG_RO } from "./i18n/ro-tools-szoveg.ts";
import { FEJLESZTO_RO } from "./i18n/ro-tools-fejleszto.ts";
import { MARKDOWN_RO } from "./i18n/ro-tools-markdown.ts";
import { HTML_RO } from "./i18n/ro-tools-html.ts";
import { EXCEL_RO } from "./i18n/ro-tools-excel.ts";
import { FAJL_RO, SEO_RO } from "./i18n/ro-tools-fajl-seo.ts";
import { CALCULATOR_RO } from "./i18n/ro-tools-calculator.ts";
import { GEOMETRIE_RO } from "./i18n/ro-tools-geometrie.ts";
import { CONVERSII_RO } from "./i18n/ro-tools-conversii.ts";
import { FINANTE_RO } from "./i18n/ro-tools-finante.ts";
import { SANATATE_RO } from "./i18n/ro-tools-sanatate.ts";
import { TIMP_RO } from "./i18n/ro-tools-timp.ts";

const RO_TRANSLATIONS: Record<string, Record<string, { slug: string; title: string; h1: string; description: string; keywords: string[] }>> = {
  kep: KEP_RO, pdf: PDF_RO, adat: ADAT_RO, szoveg: SZOVEG_RO,
  fejleszto: FEJLESZTO_RO, markdown: MARKDOWN_RO, html: HTML_RO,
  excel: EXCEL_RO, fajl: FAJL_RO, seo: SEO_RO,
  calculator: CALCULATOR_RO, geometrie: GEOMETRIE_RO, conversii: CONVERSII_RO,
  finante: FINANTE_RO, sanatate: SANATATE_RO, timp: TIMP_RO,
};

export type ToolStatus = "active" | "coming-soon";
export type CategoryId =
  | "kep" | "pdf" | "adat" | "szoveg"
  | "fejleszto" | "markdown" | "html" | "excel"
  | "fajl" | "seo"
  // ─── RO-only: matematikai kalkulátorok és konverterek ─────
  | "calculator" | "geometrie" | "conversii"
  | "finante" | "sanatate" | "timp";

export interface ToolFAQ {
  q: string;
  a: string;
}

export interface ToolI18n {
  slug?: string;        // Localized URL slug (e.g., "convertor-jpg-webp" for RO)
  title: string;
  h1: string;
  description: string;
  keywords: string[];
  faq?: ToolFAQ[];
  introText?: string;
  guide?: string[];
  content?: ToolContent;
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
  componentProps?: Record<string, unknown>;  // Props for shared components (e.g., ImageConvertTool)
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
  /** Nyelvenkénti fordítások. Ha nincs megadva az adott nyelvhez,
   *  fallback a hu (alapértelmezett) mezőkre. */
  i18n?: Partial<Record<SupportedLang, Partial<ToolI18n>>>;
  /** Melyik nyelveken jelenjen meg ez a tool.
   *  Ha nincs megadva = örökli a szülő kategória beállítását.
   *  Ha a kategória sincs korlátozva = minden nyelven megjelenik. */
  languages?: SupportedLang[];
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
  /** Kategória label, description és intro fordítások */
  i18n?: Partial<Record<SupportedLang, { label: string; description: string; intro?: string[] }>>;
  /** Melyik nyelveken jelenjen meg ez a kategória (landing + összes tool).
   *  Ha nincs megadva = minden támogatott nyelven megjelenik. */
  languages?: SupportedLang[];
}

export const CATEGORIES: Category[] = [
  {
    id: "kep", label: "Képek", icon: "🖼️", color: "var(--cat-kep)",
    description: "Képkonvertálás, átméretezés, tömörítés és szerkesztés böngészőben.",
    i18n: { ro: { label: "Imagini", description: "Conversie, redimensionare, comprimare și editare imagini în browser.", intro: [
      "Instrumentele de imagine InstrumenteOnline acoperă cele mai frecvente sarcini de procesare a imaginilor: conversie de format (JPG, PNG, WebP), compresie, redimensionare, rotire, decupare, filtre și filigran. Toate instrumentele rulează în browserul tău – nici un byte din imaginile tale nu ajunge pe server.",
      "Procesarea în lot este suportată: încarcă zeci de imagini deodată și descarcă rezultatul într-un singur fișier ZIP. Tehnologia Web Worker asigură că browserul nu se blochează în timpul conversiei.",
      "Ideal pentru dezvoltatori web, bloggeri, comercianți e-commerce și oricine are nevoie să optimizeze rapid imagini fără a instala software suplimentar.",
    ] } },
    intro: [
      "A Konvertalo.hu képeszközei a leggyakoribb képfeldolgozási feladatokat fedik le: formátumváltás (JPG, PNG, WebP), tömörítés, átméretezés, forgatás, vágás, szűrők és vízjel. Minden eszköz a böngésződben fut – a képeid egyetlen bájtja sem kerül szerverre.",
      "Batch feldolgozás támogatott: tölts fel akár több tucat képet egyszerre, és az eredményt egyetlen ZIP fájlban töltsd le. A Web Worker technológia gondoskodik arról, hogy a böngésző ne fagyjon le a konvertálás közben.",
      "Ideális webfejlesztőknek, bloggereknek, e-commerce kereskedőknek és mindenkinek, akinek gyorsan kell képeket optimalizálni anélkül, hogy külön szoftvert kellene telepítenie.",
    ],
  },
  {
    id: "pdf", label: "PDF", icon: "📄", color: "var(--cat-pdf)",
    description: "PDF összefűzés, szétbontás, oldalkezelés szerverfeltöltés nélkül.",
    i18n: { ro: { label: "PDF", description: "Combinare, separare și gestionare pagini PDF fără încărcare pe server.", intro: [
      "Cu instrumentele noastre PDF poți gestiona documentele fără încărcare pe server: combini mai multe PDF-uri, citești numărul de pagini sau separi paginile individuale. Procesarea se face în întregime în browserul tău cu ajutorul bibliotecilor pdf-lib și pdfjs-dist.",
      "Sigur și pentru documente confidențiale: deoarece nimic nu părăsește dispozitivul tău, nu trebuie să îți faci griji pentru GDPR sau politicile interne de protecție a datelor. Deosebit de util în mediul de birou și juridic.",
    ] } },
    intro: [
      "A PDF eszközeinkkel szerverfeltöltés nélkül kezelheted a dokumentumaidat: összefűzhetsz több PDF-et, kiolvashatod az oldalszámot, vagy szétbonthatod az egyes oldalakat. A feldolgozás teljes egészében a böngésződben történik a pdf-lib és pdfjs-dist könyvtárak segítségével.",
      "Bizalmas dokumentumokhoz is biztonságos: mivel semmi nem hagyja el a gépedet, nem kell aggódnod a GDPR vagy belső adatvédelmi szabályzatok miatt. Különösen hasznos irodai és jogi környezetben.",
    ],
  },
  {
    id: "adat", label: "Adat", icon: "📊", color: "var(--cat-adat)",
    description: "CSV, JSON, TSV konvertálás és adattisztítás online.",
    i18n: { ro: { label: "Date", description: "Conversie CSV, JSON, TSV și curățare date online.", intro: [
      "Instrumentele noastre de date asigură conversia și vizualizarea între cele mai frecvente formate de date: CSV, JSON, TSV și alte formate de date text. Fie că transformi fișiere de export sau examinezi răspunsuri API, aici rezolvi totul.",
      "Deosebit de util pentru analiști, dezvoltatori și marketeri care lucrează zilnic cu date tabulare. Conversia este rapidă, privată și nu necesită nici Python, nici Excel.",
    ] } },
    intro: [
      "Adateszközeink a leggyakoribb adatformátumok közötti konvertálást és megtekintést biztosítják: CSV, JSON, TSV és egyéb szöveges adatformátumok. Legyen szó export fájlok átalakításáról vagy API válaszok vizsgálatáról, itt mindent megoldasz.",
      "Különösen hasznos elemzőknek, fejlesztőknek és marketingeseknek, akik napi szinten dolgoznak táblázatos adatokkal. A konverzió gyors, privát, és nem kell hozzá sem Python, sem Excel.",
    ],
  },
  {
    id: "szoveg", label: "Szöveg", icon: "📝", color: "var(--cat-szoveg)",
    description: "Szövegszerkesztő eszközök: rendezés, tisztítás, konverzió.",
    i18n: { ro: { label: "Text", description: "Instrumente de editare text: sortare, curățare, conversie.", intro: [
      "Instrumentele de text oferă ajutor pentru sarcinile zilnice de procesare a textului: sortarea și filtrarea rândurilor, eliminarea duplicatelor, conversia majuscule/minuscule, curățarea spațiilor, eliminarea diacriticelor și generarea slug-urilor URL.",
      "Nu este nevoie de instalare sau înregistrare – doar lipește textul, alege operația și primești rezultatul imediat. Util pentru creatori de conținut, traducători și dezvoltatori deopotrivă.",
    ] } },
    intro: [
      "A szövegeszközök a mindennapi szövegfeldolgozási feladatokhoz nyújtanak segítséget: sorok rendezése és szűrése, duplikátumok eltávolítása, kis- és nagybetű konverzió, whitespace tisztítás, ékezetek eltávolítása és URL-barát slug generálás.",
      "Nincs szükség telepítésre vagy regisztrációra – csak illeszd be a szöveget, válaszd ki a műveletet, és azonnal megkapod az eredményt. Tartalomkészítőknek, fordítóknak és fejlesztőknek egyaránt hasznos.",
    ],
  },
  {
    id: "fejleszto", label: "Fejlesztő", icon: "⚙️", color: "var(--cat-fejleszto)",
    description: "JSON, YAML, XML, Base64, URL – fejlesztői segédeszközök.",
    i18n: { ro: { label: "Dezvoltator", description: "JSON, YAML, XML, Base64, URL – instrumente pentru dezvoltatori.", intro: [
      "Colecția de instrumente pentru dezvoltatori oferă uneltele zilnice ale programatorilor: formatare și validare JSON, codare/decodare Base64, URL encode/decode, conversie YAML–JSON, formatare XML și generare hash. Totul rulează în browser, fără server.",
      "Ideal pentru dezvoltare API, depanare și gestionarea fișierelor de configurare. Nu trebuie să instalezi instrumente CLI – deschide browserul și lucrează.",
    ] } },
    intro: [
      "A fejlesztői eszközgyűjtemény a programozók mindennapi segédeszközeit kínálja: JSON formázás és validálás, Base64 kódolás/dekódolás, URL encode/decode, YAML–JSON konverzió, XML formázás és hash generálás. Minden a böngészőben fut, szerver nélkül.",
      "Ideális API fejlesztéshez, hibakereséshez és konfigurációs fájlok kezeléséhez. Nem kell CLI eszközt telepíteni – nyisd meg a böngészőt és dolgozz.",
    ],
  },
  {
    id: "markdown", label: "Markdown", icon: "✍️", color: "var(--cat-markdown)",
    description: "Markdown HTML-lé alakítása és előnézete.",
    i18n: { ro: { label: "Markdown", description: "Conversie Markdown în HTML și previzualizare.", intro: [
      "Cu instrumentele Markdown poți vizualiza și converti instantaneu textul Markdown în HTML. Util la scrierea documentației, editarea fișierelor README sau pregătirea postărilor de blog.",
      "Conversia se face în browserul tău, deci nu este nevoie de server. Rezultatul formatat poate fi copiat sau descărcat imediat.",
    ] } },
    intro: [
      "A Markdown eszközök segítségével azonnal megtekintheted és konvertálhatod a Markdown szöveget HTML-lé. Hasznos dokumentáció írásánál, README fájlok szerkesztésénél vagy blogbejegyzések előkészítésénél.",
      "A konverzió a böngésződben történik, így nincs szükség szerverre. A formázott kimenetet azonnal átmásolhatod vagy letöltheted.",
    ],
  },
  {
    id: "html", label: "HTML", icon: "🌐", color: "var(--cat-html)",
    description: "HTML szöveggé alakítása, minifikálás.",
    i18n: { ro: { label: "HTML", description: "Conversie HTML în text, minificare.", intro: [
      "Cu instrumentele noastre HTML poți transforma rapid codul HTML în text curat, minifica codul sursă sau efectua alte operații pe text. Util pentru dezvoltatori web și sarcini de migrare a conținutului.",
      "Procesarea se face instantaneu în browserul tău – nu trebuie să încarci nimic.",
    ] } },
    intro: [
      "HTML eszközeinkkel gyorsan alakíthatod a HTML kódot tiszta szöveggé, minifikálhatod a forráskódot, vagy más szöveges műveleteket végezhetsz. Hasznos webfejlesztőknek és tartalom-migrációs feladatokhoz.",
      "A feldolgozás pillanatok alatt megtörténik a böngésződben – nem kell semmit sem feltölteni.",
    ],
  },
  {
    id: "excel", label: "Excel", icon: "📈", color: "var(--cat-excel)",
    description: "Excel (XLSX) konvertálás és megtekintés böngészőben.",
    i18n: { ro: { label: "Excel", description: "Conversie și vizualizare Excel (XLSX) în browser.", intro: [
      "Cu instrumentele Excel poți vizualiza fișiere XLSX, le poți converti în CSV sau JSON, direct în browser. Nu este nevoie de Microsoft Office sau LibreOffice – doar încarcă fișierul și lucrează.",
      "Ideal când trebuie să verifici rapid un tabel sau să exporti datele în alt sistem. Procesarea este privată, fișierele tale nu părăsesc dispozitivul.",
    ] } },
    intro: [
      "Az Excel eszközökkel XLSX fájlokat tekinthetsz meg, konvertálhatsz CSV-vé vagy JSON-né, közvetlenül a böngészőben. Nem szükséges Microsoft Office vagy LibreOffice – csak töltsd fel a fájlt és dolgozz.",
      "Ideális, ha gyorsan be kell tekintened egy táblázatba, vagy az adatokat más rendszerbe kell exportálnod. A feldolgozás privát, a fájljaid nem hagyják el a gépedet.",
    ],
  },
  {
    id: "fajl", label: "Fájl", icon: "🗂️", color: "var(--cat-fajl)",
    description: "ZIP, hash-ellenőrzés, fájl-információ eszközök.",
    i18n: { ro: { label: "Fișiere", description: "ZIP, verificare hash, informații fișiere.", intro: [
      "Instrumentele de fișiere oferă soluții pentru sarcinile generale de gestionare a fișierelor: compresie și extragere ZIP, verificare hash fișiere (MD5, SHA-256), informații despre dimensiune și tip fișier. Totul rulează în browserul tău.",
      "Util pentru administratori de sistem, dezvoltatori și orice utilizator care are nevoie să gestioneze rapid fișiere fără instalare.",
    ] } },
    intro: [
      "A fájleszközök általános fájlkezelési feladatokhoz kínálnak megoldást: ZIP tömörítés és kicsomagolás, fájl hash ellenőrzés (MD5, SHA-256), fájl méret és típus információ. Minden a böngésződben fut.",
      "Hasznos rendszergazdáknak, fejlesztőknek és bármilyen felhasználónak, akinek gyorsan kell fájlokat kezelni telepítés nélkül.",
    ],
  },
  {
    id: "seo", label: "SEO", icon: "🔍", color: "var(--cat-seo)",
    description: "SEO segédeszközök: title/meta hossz, UTM, canonical, robots.txt.",
    i18n: { ro: { label: "SEO", description: "Instrumente SEO: lungime title/meta, UTM, canonical, robots.txt.", intro: [
      "Instrumentele SEO oferă ajutor pentru sarcinile zilnice de optimizare pentru motoarele de căutare: verificarea lungimii title și meta description, constructor parametri UTM, generator URL canonical, analizor și tester robots.txt.",
      "Ideal pentru specialiști SEO, manageri de conținut și dezvoltatori web care doresc să verifice și optimizeze rapid meta datele paginilor. Nu este nevoie de instrumente plătite pentru sarcinile de bază.",
    ] } },
    intro: [
      "Az SEO eszközök a keresőoptimalizálás mindennapi feladataihoz nyújtanak segítséget: title és meta description hossz ellenőrzés, UTM paraméter építő, canonical URL generátor, robots.txt elemző és tesztelő.",
      "Ideális SEO szakembereknek, tartalomkezelőknek és webfejlesztőknek, akik gyorsan szeretnék ellenőrizni és optimalizálni az oldalak meta adatait. Nincs szükség fizetős eszközökre az alapfeladatokhoz.",
    ],
  },

  // ═══ RO-ONLY: Matematikai kalkulátorok és konverterek ════════════
  // Minden lentebbi kategória `languages: ["ro"]` – a HU build automatikusan
  // kiszűri (isCategoryVisibleInLang / getVisibleCategories).
  {
    id: "calculator", label: "Calculator", icon: "🧮", color: "var(--cat-calculator, #4f46e5)",
    description: "Calculatoare matematice: procente, ecuații, medie aritmetică.",
    languages: ["ro"],
    i18n: { ro: { label: "Calculator", description: "Calculatoare matematice: procente, ecuații, medie aritmetică, regula de trei.", intro: [
      "Calculatoarele matematice InstrumenteOnline acoperă cele mai folosite operații din matematica de zi cu zi și din programa școlară: calcul procentual, ecuații de gradul doi și exponențiale, medie aritmetică, mediană, mod și regula de trei simplă. Fiecare calculator afișează pașii de rezolvare, nu doar rezultatul.",
      "Toate calculatoarele rulează integral în browserul tău – nu se încarcă nimic pe server. Formulele matematice sunt afișate clar cu ajutorul KaTeX, astfel încât notația să fie profesională și ușor de citit.",
      "Ideal pentru elevi, studenți, profesori și oricine are nevoie de răspunsuri rapide la calcule matematice uzuale, fără a instala aplicații sau a plăti abonamente.",
    ] } },
    intro: [
      "Calculatoare matematice online – procent, ecuații, medie, regula de trei.",
    ],
  },
  {
    id: "geometrie", label: "Geometrie", icon: "📐", color: "var(--cat-geometrie, #10b981)",
    description: "Calculatoare geometrice: triunghi, cerc, dreptunghi, trigonometrie.",
    languages: ["ro"],
    i18n: { ro: { label: "Geometrie", description: "Calculatoare geometrice: triunghi dreptunghic, cerc, dreptunghi, funcții trigonometrice, radiani-grade.", intro: [
      "Calculatoarele de geometrie te ajută să rezolvi rapid probleme clasice: arie, perimetru și diagonală pentru dreptunghi, lungimi de laturi și unghiuri pentru triunghi dreptunghic cu teorema lui Pitagora, aria cercului și a sectorului circular, valorile funcțiilor trigonometrice (sin, cos, tan) și conversia între radiani și grade.",
      "Fiecare calculator include o vizualizare SVG live – modifici un parametru și forma se redesenează în timp real. Formulele sunt afișate cu KaTeX, cu pași detaliați de calcul.",
      "Util pentru temele de geometrie, pregătirea pentru Evaluarea Națională, Bacalaureat și pentru calcule practice (construcții, amenajări, design).",
    ] } },
    intro: [
      "Instrumente geometrice: triunghi, cerc, dreptunghi, trigonometrie.",
    ],
  },
  {
    id: "conversii", label: "Conversii", icon: "⇄", color: "var(--cat-conversii, #8b5cf6)",
    description: "Convertoare unități: lungime, masă, volum, suprafață, temperatură, densitate.",
    languages: ["ro"],
    i18n: { ro: { label: "Conversii", description: "Convertoare unități de măsură: lungime, masă, volum, suprafață, temperatură, densitate materiale.", intro: [
      "Convertoarele noastre de unități transformă instantaneu între cele mai uzuale unități de măsură: lungime (cm, m, km, inch, picior), masă (kg, grame, livre, tone), volum (litri, mililitri, decilitri, metri cubi, galoane), suprafață (metri pătrați, hectare, ari), temperatură (Celsius, Fahrenheit) și densitatea materialelor de construcție (beton, nisip, pietriș, balast).",
      "Fiecare convertor funcționează bidirecțional – scrii într-un câmp, rezultatul apare imediat în celălalt. Formulele de conversie sunt afișate transparent, astfel încât să înțelegi cum se face calculul.",
      "Util pentru rețete culinare, DIY, agricultură și sectorul imobiliar (hectare ↔ metri pătrați), construcții (densități) și sport (mile, picioare, livre).",
    ] } },
    intro: [
      "Convertoare unități: lungime, masă, volum, suprafață, temperatură.",
    ],
  },
  {
    id: "finante", label: "Finanțe", icon: "💰", color: "var(--cat-finante, #059669)",
    description: "Calculatoare financiare: TVA, credit, dobândă, reducere, adaos.",
    languages: ["ro"],
    i18n: { ro: { label: "Finanțe", description: "Calculatoare financiare: TVA (19%, 9%, 5%), credit anuitar, dobândă compusă, reducere, marjă și adaos comercial.", intro: [
      "Instrumentele financiare acoperă calculele pe care le faci cel mai des: calculator TVA pentru cotele din România (19%, 9%, 5%), calculator credit cu rate anuitare, calculator dobândă compusă pentru economii și investiții, calculator reducere pentru oferte comerciale, calculator marjă și adaos pentru comerț.",
      "Toate calculele se fac în browserul tău, fără ca datele financiare să ajungă pe server. Rezultatele sunt afișate cu formulele din spate și pașii de calcul.",
      "Util pentru antreprenori, comercianți, persoane care planifică un credit ipotecar sau o investiție, precum și pentru elevii de la profilul economic.",
    ] } },
    intro: [
      "Calculatoare financiare: TVA, credit, dobândă compusă, reducere.",
    ],
  },
  {
    id: "sanatate", label: "Sănătate", icon: "⚖️", color: "var(--cat-sanatate, #e11d48)",
    description: "Calculatoare de sănătate: IMC, greutate ideală, calorii zilnice.",
    languages: ["ro"],
    i18n: { ro: { label: "Sănătate", description: "Calculatoare de sănătate: IMC (BMI), greutate ideală, necesar caloric zilnic cu formula Mifflin-St Jeor.", intro: [
      "Calculatoarele de sănătate sunt bazate pe formulele standard din medicină și nutriție: IMC (Indicele de Masă Corporală) cu clasificarea OMS, greutate ideală calculată după patru formule științifice (Devine, Robinson, Miller, Hamwi), necesar caloric zilnic (BMR și TDEE) cu formula Mifflin-St Jeor și distribuția macronutrienților.",
      "Rezultatele sunt orientative și nu înlocuiesc sfatul unui medic sau nutriționist, dar oferă un punct de plecare solid pentru planificarea alimentației și a activității fizice.",
      "Util pentru pasionați de fitness, persoane care urmăresc o dietă, sportivi și oricine dorește să înțeleagă mai bine cifrele din spatele sănătății personale.",
    ] } },
    intro: [
      "IMC, greutate ideală, calorii zilnice – formule medicale standard.",
    ],
  },
  {
    id: "timp", label: "Timp", icon: "📅", color: "var(--cat-timp, #f97316)",
    description: "Diferență de date, numărători inverse, câte zile am trăit.",
    languages: ["ro"],
    i18n: { ro: { label: "Timp", description: "Calculatoare de timp: diferență între date, numărători inverse (Crăciun, Paști, Revelion, zi de naștere), câte zile am trăit.", intro: [
      "Instrumentele de timp te ajută cu sarcinile cotidiene legate de date: câte zile între două date, câte zile lucrătoare într-o perioadă, câte zile ai trăit de la naștere, precum și numărători inverse live pentru evenimente importante (Crăciun, Paști ortodox cu algoritmul Gauss, Revelion, zi de naștere personalizabilă, Bacalaureat).",
      "Fiecare numărătoare inversă se actualizează în timp real și include animații festive și curiozități matematice despre timp. Poți crea și propriile numărători pentru evenimente personale, cu link partajabil.",
      "Util pentru planificare personală, pedagogi, părinți și orice situație unde contează precizia datelor.",
    ] } },
    intro: [
      "Numărători inverse și calcule cu date – în timp real.",
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
  { slug: "jpg-png", category: "kep", title: "JPG → PNG konvertáló | Ingyenes online", h1: "JPG → PNG konvertáló", description: "JPG képek konvertálása veszteségmentes PNG formátumba böngészőben, szerver nélkül. Átlátszó háttér, batch feldolgozás.", keywords: ["jpg png", "jpeg png", "jpg to png", "jpg png konvertáló", "kép konvertálás online"], status: "active", component: "ImageConvertTool", componentProps: { acceptFormats: "image/jpeg,.jpg,.jpeg", acceptLabel: "JPG", outputFormat: "image/png", outputExt: "png", showQuality: false, zipName: "png-kepek.zip", toolSlug: "jpg-png", convertLabel: "PNG konvertálás", downloadLabel: "PNG letöltése" }, related: ["jpg-webp", "png-jpg", "tomorites"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "png-jpg", category: "kep", title: "PNG → JPG konvertáló | Ingyenes online", h1: "PNG → JPG konvertáló", description: "PNG képek konvertálása JPG formátumba minőség-beállítással, háttérszín választással. Böngészőben, szervermentes.", keywords: ["png jpg", "png to jpg", "png jpeg konvertáló", "png jpg konvertálás online"], status: "active", component: "ImageConvertTool", componentProps: { acceptFormats: "image/png,.png", acceptLabel: "PNG", outputFormat: "image/jpeg", outputExt: "jpg", showQuality: true, defaultQuality: 90, zipName: "jpg-kepek.zip", toolSlug: "png-jpg", convertLabel: "JPG konvertálás", downloadLabel: "JPG letöltése" }, related: ["jpg-png", "png-webp", "tomorites"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "webp-jpg", category: "kep", title: "WebP → JPG konvertáló | Ingyenes online", h1: "WebP → JPG konvertáló", description: "WebP képek visszakonvertálása JPG formátumba minőség-beállítással. Böngészőben, szerver nélkül, batch módban.", keywords: ["webp jpg", "webp to jpg", "webp jpeg konvertáló", "webp visszaalakítás"], status: "active", component: "ImageConvertTool", componentProps: { acceptFormats: "image/webp,.webp", acceptLabel: "WebP", outputFormat: "image/jpeg", outputExt: "jpg", showQuality: true, defaultQuality: 90, zipName: "jpg-kepek.zip", toolSlug: "webp-jpg", convertLabel: "JPG konvertálás", downloadLabel: "JPG letöltése" }, related: ["webp-png", "jpg-webp", "tomorites"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "webp-png", category: "kep", title: "WebP → PNG konvertáló | Ingyenes online", h1: "WebP → PNG konvertáló", description: "WebP képek visszakonvertálása veszteségmentes PNG formátumba, alfa-csatorna megőrzéssel. Böngészőben, szervermentes.", keywords: ["webp png", "webp to png", "webp png konvertáló", "webp visszaalakítás lossless"], status: "active", component: "ImageConvertTool", componentProps: { acceptFormats: "image/webp,.webp", acceptLabel: "WebP", outputFormat: "image/png", outputExt: "png", showQuality: false, zipName: "png-kepek.zip", toolSlug: "webp-png", convertLabel: "PNG konvertálás", downloadLabel: "PNG letöltése" }, related: ["webp-jpg", "png-webp", "jpg-png"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "atmeretezes", category: "kep", title: "Kép átméretező online | Ingyenes, szervermentes", h1: "Kép átméretezés", description: "Képek átméretezése px vagy százalék alapján, képarány megőrzéssel. Batch feldolgozás ZIP kimenettel, böngészőben.", keywords: ["kép átméretezés", "resize image online", "kép átméretező", "képméret csökkentés", "kép méretre vágás"], status: "active", component: "AtmererezesTool", related: ["tomorites", "tomeges-atmeretezes", "levagas"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "tomorites", category: "kep", title: "Képtömörítő online | JPG PNG WebP tömörítés", h1: "Képtömörítés online", description: "JPG, PNG, WebP képek tömörítése minőségveszteség minimalizálásával. Böngészőben, szerver nélkül, batch feldolgozással.", keywords: ["képtömörítés", "compress image", "kép tömörítő online", "jpg tömörítés", "png compress", "webp tömörítés"], status: "active", component: "ImageConvertTool", componentProps: { acceptFormats: "image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp", acceptLabel: "JPG, PNG, WebP", outputFormat: "image/webp", outputExt: "webp", showQuality: true, defaultQuality: 75, zipName: "tomorites-kepek.zip", toolSlug: "tomorites", convertLabel: "Tömörítés", downloadLabel: "Tömörített letöltése" }, related: ["jpg-webp", "tomeges-tomorites", "minoseg-allitas"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "minoseg-allitas", category: "kep", title: "Kép minőség-beállítás online | Quality slider", h1: "Kép minőség állítása", description: "JPG/WebP képek quality értékének pontos beállítása fájlméret optimalizáláshoz. Valós idejű előnézet.", keywords: ["kép minőség", "jpg quality", "kép quality beállítás", "jpeg minőség csökkentés", "webp quality"], status: "active", component: "ImageConvertTool", componentProps: { acceptFormats: "image/jpeg,image/webp,.jpg,.jpeg,.webp", acceptLabel: "JPG, WebP", outputFormat: "image/jpeg", outputExt: "jpg", showQuality: true, defaultQuality: 80, zipName: "minoseg-kepek.zip", toolSlug: "minoseg-allitas", convertLabel: "Konvertálás", downloadLabel: "Kép letöltése" }, related: ["tomorites", "jpg-webp"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
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

  // ── ÚJ KÉPESZKÖZÖK ──────────────────────────────────────────────────────────
  { slug: "heic-jpg", category: "kep", title: "HEIC → JPG Konvertáló | Ingyenes Online | Konvertalo.hu", h1: "HEIC → JPG Konvertáló", description: "Konvertáld iPhone/iPad HEIC képeidet JPG formátumba böngészőben, szerver nélkül. Tömeges feldolgozás, ZIP letöltés.", keywords: ["heic jpg", "heic konvertáló", "iphone kép konvertálás", "heif jpg"], status: "active", component: "HeicJpgTool", inputFormats: ["image/heic", "image/heif", ".heic", ".heif"], outputFormat: "image/jpeg", acceptMultiple: true, related: ["jpg-webp", "jpg-png", "heic-png", "metadata-torles"], updatedAt: "2026-03-01", faq: [{ q: "Mi a HEIC formátum?", a: "A HEIC (High Efficiency Image Container) az iPhone és iPad alapértelmezett képformátuma iOS 11 óta. Kiváló tömörítést nyújt, de sok program nem tudja megnyitni." }, { q: "Feltöltődnek a képeim szerverre?", a: "Nem. Az összes feldolgozás a böngésződben történik – a képeid egyetlen byte-ja sem hagyja el a gépedet." }, { q: "Lehet egyszerre több HEIC fájlt konvertálni?", a: "Igen! Tölts fel egyszerre több fájlt, és az eszköz ZIP archívumba csomagolja a konvertált JPG fájlokat." }, { q: "Elvész a kép minősége a konverzió során?", a: "A JPG konverzió alapértelmezetten 90%-os minőséggel dolgozik, ami szinte észrevehetetlen minőségveszteséggel jár." }] },
  { slug: "heic-png", category: "kep", title: "HEIC → PNG Konvertáló | Ingyenes Online | Konvertalo.hu", h1: "HEIC → PNG Konvertáló", description: "Konvertáld HEIC képeidet veszteségmentes PNG formátumba böngészőben. Átlátszóság megőrzésével, szerver nélkül.", keywords: ["heic png", "heic png konvertáló", "heif png", "iphone kép png"], status: "active", component: "HeicPngTool", inputFormats: ["image/heic", "image/heif", ".heic", ".heif"], outputFormat: "image/png", acceptMultiple: true, related: ["heic-jpg", "png-webp", "jpg-png", "metadata-torles"], updatedAt: "2026-03-01", faq: [{ q: "Mikor érdemes PNG-t választani a JPG helyett?", a: "Ha veszteségmentes minőséget szeretnél, vagy ha a képen átlátszóság is van, a PNG a jobb választás." }, { q: "A HEIC fájlokban lévő átlátszóság megmarad PNG-be konvertáláskor?", a: "Igen, a PNG formátum teljes mértékben támogatja az alfa-csatornát, az átlátszóság megmarad." }] },
  { slug: "jpg-avif", category: "kep", title: "JPG → AVIF Konvertáló | Kisebb Fájlméret | Konvertalo.hu", h1: "JPG → AVIF Konvertáló", description: "Konvertáld JPG képeidet AVIF formátumba böngészőben. Az AVIF 40%-kal kisebb fájlméretet ad WebP-nél is – szerver nélkül.", keywords: ["jpg avif", "jpeg avif konvertáló", "avif konvertálás", "következő generációs képformátum"], status: "active", component: "JpgAvifTool", inputFormats: ["image/jpeg"], outputFormat: "image/avif", acceptMultiple: true, related: ["jpg-webp", "png-avif", "webp-jpg", "tomorites"], updatedAt: "2026-03-01", faq: [{ q: "Mi az AVIF formátum?", a: "Az AVIF (AV1 Image File Format) egy modern képformátum, amely az AV1 videokodeken alapul. Jobb tömörítést nyújt mint a WebP vagy JPEG, royalty-free." }, { q: "Minden böngésző támogatja az AVIF-et?", a: "2025-re az összes modern böngésző (Chrome, Firefox, Safari, Edge) támogatja az AVIF-et. Régebbi böngészőkhöz JPG fallback ajánlott." }, { q: "Mekkora méretcsökkentés várható?", a: "Tipikusan 40-50%-kal kisebb fájlméretet eredményez azonos minőség mellett a JPG-hez képest, 20-25%-kal kisebb a WebP-nél is." }] },
  { slug: "png-avif", category: "kep", title: "PNG → AVIF Konvertáló | Ingyenes Online | Konvertalo.hu", h1: "PNG → AVIF Konvertáló", description: "Konvertáld PNG képeidet AVIF formátumba böngészőben. Átlátszóság megőrzésével, veszteségmentes és veszteséges módban.", keywords: ["png avif", "png avif konvertáló", "avif átlátszóság", "webp alternatíva"], status: "active", component: "PngAvifTool", inputFormats: ["image/png"], outputFormat: "image/avif", acceptMultiple: true, related: ["jpg-avif", "png-webp", "webp-png", "tomorites"], updatedAt: "2026-03-01", faq: [{ q: "Az AVIF megőrzi a PNG átlátszóságát?", a: "Igen, az AVIF teljes mértékben támogatja az alfa-csatornát, az átlátszó területek megmaradnak." }, { q: "Veszteségmentes AVIF lehetséges?", a: "Igen, az eszköz támogat veszteségmentes módot is, bár a fájlméret ekkor nagyobb lesz." }] },
  { slug: "kep-base64", category: "kep", title: "Kép → Base64 Konvertáló | Data URI | Konvertalo.hu", h1: "Kép → Base64 / Data URI Konvertáló", description: "Alakítsd képeidet Base64 kódolt Data URI stringgé HTML/CSS beágyazáshoz. JPG, PNG, WebP, SVG – böngészőben, szerver nélkül.", keywords: ["kép base64", "image base64 konvertáló", "data uri kép", "base64 encode kép"], status: "active", component: "KepBase64Tool", inputFormats: ["image/jpeg", "image/png", "image/webp", "image/svg+xml", "image/gif"], outputFormat: "text/plain", acceptMultiple: false, related: ["jpg-webp", "png-webp", "base64-kodolo-dekodolo", "tomorites"], updatedAt: "2026-03-01", faq: [{ q: "Mire való a Base64 képkódolás?", a: "A Base64 Data URI lehetővé teszi, hogy képet közvetlenül HTML vagy CSS fájlba ágyazz be, HTTP kérés nélkül. Kis ikonokhoz, logókhoz és e-mail sablonokhoz ideális." }, { q: "Milyen formátumú a kimenet?", a: "A kimenet data:image/jpeg;base64,/9j/4AA... alakú string, amit közvetlenül beilleszthetsz <img src> tagbe vagy CSS background-image tulajdonságba." }, { q: "Van méretkorlát?", a: "Technikailag nincs, de nagy képeknél a Base64 string 33%-kal nagyobb lesz az eredeti fájlméretnél. 50KB feletti képeknél külső fájlként ajánlott tárolni." }] },
  { slug: "kep-ico", category: "kep", title: "Kép → ICO / Favicon Generátor | Ingyenes | Konvertalo.hu", h1: "Kép → ICO / Favicon Generátor", description: "Készíts ICO favicon fájlt PNG vagy JPG képből böngészőben. Több méretet (16x16, 32x32, 48x48) tartalmaz egyetlen ICO fájlban.", keywords: ["favicon generátor", "png ico konvertáló", "ico készítő", "favicon ikon"], status: "active", component: "KepIcoTool", inputFormats: ["image/png", "image/jpeg", "image/webp"], outputFormat: "image/x-icon", acceptMultiple: false, related: ["svg-png", "kep-base64", "jpg-png", "tukrozes"], updatedAt: "2026-03-01", faq: [{ q: "Milyen méreteket tartalmaz a generált ICO fájl?", a: "Az eszköz 16×16, 32×32 és 48×48 pixel méretű képeket csomagol egyetlen ICO fájlba, ami maximális böngésző- és OS-kompatibilitást biztosít." }, { q: "Hogyan teszem fel a favicont a weboldalamra?", a: "Töltsd fel a favicon.ico fájlt a weboldal gyökérmappájába, majd add hozzá a HTML <head> részbe: <link rel=\"icon\" href=\"/favicon.ico\">." }, { q: "PNG favicon is megfelel, vagy ICO kell?", a: "Modern böngészők elfogadnak PNG favicont is, de az ICO fájl a legkompatibilisebb megoldás, különösen régebbi böngészőknél és Windows rendszereknél." }] },
  { slug: "atmeterezas-kb", category: "kep", title: "Kép Átméretezés KB-ra | Célméret Beállítás | Konvertalo.hu", h1: "Kép Átméretezés Megadott KB Méretre", description: "Állítsd be a kép célméretét KB-ban – az eszköz automatikusan megkeresi az optimális minőséget. Álláspályázathoz, feltöltési korlátokhoz.", keywords: ["kép kb méret", "kép méret csökkentés kb", "kép fájlméret beállítás", "resize to kb"], status: "active", component: "AtmeterezesKbTool", inputFormats: ["image/jpeg", "image/png", "image/webp"], outputFormat: "image/jpeg", acceptMultiple: false, related: ["tomorites", "minoseg-allitas", "atmeretezes", "tomeges-tomorites"], updatedAt: "2026-03-01", faq: [{ q: "Hogyan működik a KB-ra méretezés?", a: "Az eszköz bináris kereséssel megtalálja az optimális minőségi értéket (1-100%), amelynél a fájlméret a legközelebb esik a megadott célhoz, de nem haladja meg azt." }, { q: "Pontos lesz a célméret?", a: "Az eszköz ±5%-on belül találja el a célméretet. Ennél pontosabb nem érhető el, mivel a JPEG tömörítés nem determinisztikus." }, { q: "Mikor van szükség erre az eszközre?", a: "Álláspályázatokhoz (pl. max 2MB), hatósági dokumentumokhoz, e-mail mellékletek méretkorlátjához, vagy feltöltési rendszerek korlátaihoz." }] },
  { slug: "gif-keszito", category: "kep", title: "Animált GIF Készítő Képekből | Ingyenes Online | Konvertalo.hu", h1: "Animált GIF Készítő", description: "Készíts animált GIF-et JPG, PNG vagy WebP képekből böngészőben. Frame delay, sorrend, hurok beállítással – szerver nélkül.", keywords: ["gif készítő", "animált gif képekből", "gif csináló online", "képek gif-be"], status: "active", component: "GifKeszito", inputFormats: ["image/jpeg", "image/png", "image/webp"], outputFormat: "image/gif", acceptMultiple: true, related: ["gif-webp-animalt", "90-fokos-forgatas", "tomeges-atmeretezes", "tomeges-zip-letoltes"], updatedAt: "2026-03-01", faq: [{ q: "Hány képet lehet egyszerre feltölteni?", a: "Legfeljebb 100 képet lehet egyszerre feltölteni. Az összes feldolgozás Web Worker segítségével a böngészőben fut." }, { q: "Mi a frame delay?", a: "A frame delay a képkockák közötti várakozási idő ezredmásodpercben. 100ms = 10 fps, 500ms = lassú diavetítés." }, { q: "Különböző méretű képeket is lehet keverni?", a: "Igen, az eszköz automatikusan az első kép méretéhez igazítja a többi keretet (crop vagy letterbox módban)." }] },
  { slug: "gif-webp-animalt", category: "kep", title: "GIF → Animált WebP Konvertáló | Kisebb Méret | Konvertalo.hu", h1: "GIF → Animált WebP Konvertáló", description: "Konvertáld GIF animációidat animált WebP formátumba böngészőben. Akár 80%-os méretcsökkentés minőségromlás nélkül.", keywords: ["gif webp animált", "animált gif konvertáló", "gif optimalizálás", "gif webp méret"], status: "active", component: "GifWebpAnimalt", inputFormats: ["image/gif"], outputFormat: "image/webp", acceptMultiple: false, related: ["gif-keszito", "jpg-webp", "png-webp", "tomorites"], updatedAt: "2026-03-01", faq: [{ q: "Mennyi méretmegtakarítás várható?", a: "Az animált WebP tipikusan 60-80%-kal kisebb fájlméretet eredményez azonos minőség mellett, mint az animált GIF." }, { q: "Megmaradnak az animáció frame-jei és időzítése?", a: "Igen, az eszköz pontosan megőrzi az összes frame-t és az eredeti időzítéseket." }, { q: "Minden böngésző lejátssza az animált WebP-t?", a: "Igen, az animált WebP-t minden modern böngésző (Chrome, Firefox, Safari 14+, Edge) támogatja." }] },
  { slug: "svg-png", category: "kep", title: "SVG → PNG Konvertáló | Vektorgrafika Raszterizálás | Konvertalo.hu", h1: "SVG → PNG / JPG Konvertáló", description: "Konvertáld SVG vektorgrafikádat PNG vagy JPG képpé böngészőben. Egyedi felbontás megadásával, szerver nélkül.", keywords: ["svg png konvertáló", "svg raszterizálás", "svg jpg", "vektorgrafika png"], status: "active", component: "SvgPngTool", inputFormats: ["image/svg+xml", ".svg"], outputFormat: "image/png", acceptMultiple: false, related: ["kep-ico", "kep-base64", "jpg-png", "png-webp"], updatedAt: "2026-03-01", faq: [{ q: "Miért kell SVG-t PNG-vé konvertálni?", a: "Egyes programok, e-mail kliensek és platformok (pl. régebbi Word, WhatsApp) nem támogatják az SVG formátumot. PNG-vé konvertálva mindenhol megjelenik." }, { q: "Beállítható a kimeneti felbontás?", a: "Igen, megadhatod a kívánt szélességet pixelben – az eszköz az arányokat megtartva generálja a PNG-t." }, { q: "Az SVG átlátszósága megmarad PNG-ben?", a: "Igen, az SVG-ben lévő átlátszó területek az alfa-csatornán megmaradnak a PNG kimenetben." }] },
  { slug: "kep-collage", category: "kep", title: "Kép Összefűző – Collage Készítő | Online | Konvertalo.hu", h1: "Kép Összefűző / Collage Készítő", description: "Fűzz össze képeket vízszintesen, függőlegesen vagy rácsban egyetlen képpé böngészőben. Szerver nélkül, ZIP letöltés.", keywords: ["kép összefűzés", "collage készítő", "képek egyesítése", "kép egymás mellé"], status: "active", component: "KepCollage", inputFormats: ["image/jpeg", "image/png", "image/webp"], outputFormat: "image/png", acceptMultiple: true, related: ["atmeretezes", "90-fokos-forgatas", "vizjel", "keret-padding"], updatedAt: "2026-03-01", faq: [{ q: "Milyen elrendezések érhetők el?", a: "Vízszintes (egymás mellé), függőleges (egymás alá) és rácsos (pl. 2×2, 3×3) elrendezések." }, { q: "Különböző méretű képeket is lehet keverni?", a: "Igen. Vízszintes elrendezésnél az eszköz a legkisebb magassághoz igazítja a képeket, a szélességarányokat megtartva." }, { q: "Hány képet lehet egyszerre összefűzni?", a: "Legfeljebb 20 képet. A kimeneti fájl PNG formátumú." }] },
  { slug: "szin-paletta", category: "kep", title: "Kép Szín Paletta Kinyerő | Domináns Színek HEX | Konvertalo.hu", h1: "Képből Szín Paletta Kinyerő", description: "Nyerd ki egy kép domináns színeit HEX kódokkal böngészőben. Logóhoz, brand palettához, design munkához.", keywords: ["szín paletta kép", "domináns szín", "hex szín kinyerés", "brand szín"], status: "active", component: "SzinPaletta", inputFormats: ["image/jpeg", "image/png", "image/webp"], outputFormat: "text/plain", acceptMultiple: false, related: ["kep-base64", "vizjel", "keret-padding", "kontraszt-fenyero"], updatedAt: "2026-03-01", faq: [{ q: "Hány domináns színt ad meg az eszköz?", a: "Alapértelmezetten 6 domináns színt jelenít meg HEX, RGB és HSL formátumban. Ez konfigurálható 3-10 szín között." }, { q: "Mire használható?", a: "Brand identitás kialakításához, webdesign paletta összeállításához, fotók domináns hangulatának azonosításához." }, { q: "Hogyan másolhatom a HEX kódokat?", a: "Minden szín melletti vágólapra másolás gombbal egyenként másolhatók a kódok, vagy az összes egy kattintással exportálható." }] },
  { slug: "automatikus-vagas", category: "kep", title: "Automatikus Vágás – Fehér Szél Eltávolítás | Konvertalo.hu", h1: "Automatikus Képvágás – Fehér/Egyszínű Szél Eltávolítás", description: "Távolítsd el a kép fehér vagy egyszínű széleit automatikusan böngészőben. Termékfotókhoz, szkennelt dokumentumokhoz ideális.", keywords: ["automatikus vágás", "fehér szél eltávolítás", "kép cropping", "autocrop"], status: "active", component: "AutomatikusVagas", inputFormats: ["image/jpeg", "image/png", "image/webp"], outputFormat: "image/png", acceptMultiple: false, related: ["levagas", "atmeretezes", "keret-padding", "vizjel"], updatedAt: "2026-03-01", faq: [{ q: "Hogyan működik az automatikus vágás?", a: "Az eszköz pixelszinten vizsgálja a kép széleit, és levágja az összes sort/oszlopot, ahol a háttérszín (alapértelmezetten fehér) dominál." }, { q: "Lehet más háttérszínt is beállítani?", a: "Igen, a tolerancia csúszkával és a háttérszín kiválasztóval pontosan beállítható, hogy melyik színt tekintse levágandó háttérnek." }, { q: "Mire ideális ez az eszköz?", a: "Szkennerből érkező dokumentumok fehér szélének levágásához, webshop termékfotók egységesítéséhez, logók körüli felesleges tér eltávolításához." }] },
  { slug: "exif-terkep", category: "kep", title: "EXIF GPS Helyszín Térkép | Képből Helymeghatározás | Konvertalo.hu", h1: "EXIF GPS Helyszín Megjelenítő Térképen", description: "Jelenítsd meg egy kép EXIF adataiban tárolt GPS helyszínét interaktív térképen böngészőben. OpenStreetMap alapú, szerver nélkül.", keywords: ["exif gps térkép", "kép helyszín", "fotó gps koordináta", "exif helymeghatározás"], status: "active", component: "ExifTerkep", inputFormats: ["image/jpeg"], outputFormat: "text/plain", acceptMultiple: false, related: ["metadata-megjelenites", "metadata-torles", "heic-jpg", "jpg-png"], updatedAt: "2026-03-01", faq: [{ q: "Milyen képformátumokból olvasható GPS adat?", a: "GPS adatot szinte kizárólag JPEG fájlok tartalmaznak, amelyeket digitális fényképezőgépek, okostelefonok rögzítenek." }, { q: "Az adatok biztonságosak?", a: "Igen, az összes feldolgozás a böngésződben zajlik, a képed és a koordinátáid nem kerülnek szerverre." }, { q: "Mit tegyek ha nem látok koordinátákat?", a: "Nem minden fotóban van GPS adat. Ha a fényképezőn ki volt kapcsolva a helymeghatározás, vagy a kép szerkesztőprogramban megnyitva lett mentve, elveszhet az EXIF." }] },
  { slug: "sprite-vagas", category: "kep", title: "Sprite Sheet Vágó | Képszeletelő | Konvertalo.hu", h1: "Sprite Sheet Vágó – Képek Kiszeletelése", description: "Várd fel a sprite sheet-et egyedi képekre megadott rácsméret alapján böngészőben. Játékfejlesztőknek, UI designereknek.", keywords: ["sprite sheet vágó", "sprite cutter", "képszeletelés", "sprite export"], status: "active", component: "SpriteVago", inputFormats: ["image/jpeg", "image/png", "image/webp"], outputFormat: "image/png", acceptMultiple: false, related: ["levagas", "atmeretezes", "tomeges-zip-letoltes", "90-fokos-forgatas"], updatedAt: "2026-03-01", faq: [{ q: "Mi az a sprite sheet?", a: "Egy sprite sheet egyetlen nagy képfájl, amely több kisebb képet (például animációs kereteket, ikonokat, játékbeli karaktereket) tartalmaz egységes rácsban." }, { q: "Hogyan kell beállítani a vágást?", a: "Add meg az egy cella szélességét és magasságát pixelben. Az eszköz automatikusan kiszámítja, hány sor és oszlop van, és egyenként exportálja a cellákat." }, { q: "Milyen formátumban tölthetők le a kivágott képek?", a: "ZIP archívumban, ahol minden cella sprite-0-0.png, sprite-0-1.png stb. névvel kerül be." }] },

  // ═══ PDF ════════════════════════════════════════════════
  { slug: "osszeillesztes", category: "pdf", title: "PDF összefűzés online | Merge PDF ingyenes", h1: "PDF összefűzés", description: "Több PDF összefűzése egyetlen dokumentummá drag&drop sorrenddel, böngészőben. Szervermentes, privát, korlátlan méret.", keywords: ["pdf merge", "pdf összefűzés", "pdf összeillesztés online", "merge pdf ingyenes", "pdf egyesítés"], status: "active", component: "PdfMergeTool", related: ["szetbontas", "oldalak-kivalasztasa", "oldalak-sorrendje"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [{ q: "Feltöltődnek a PDF-jeim szerverre?", a: "Nem – minden feldolgozás a böngésződben történik." }] },
  { slug: "szetbontas", category: "pdf", title: "PDF szétbontás oldalakra online | Split PDF", h1: "PDF szétbontása", description: "PDF felosztása különálló oldalakra vagy oldalcsoportokra, ZIP letöltéssel. Böngészőben, szervermentes.", keywords: ["pdf split", "pdf szétbontás", "pdf darabolás", "pdf oldalak szétválasztás", "split pdf online ingyenes"], status: "active", component: "PdfSplitTool", related: ["osszeillesztes", "oldalak-kivalasztasa"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "oldalak-kivalasztasa", category: "pdf", title: "PDF oldalak kiválasztása és kinyerése online", h1: "PDF oldalak kiválasztása", description: "Adott oldalak kinyerése PDF-ből oldalszám tartományokkal. Előnézet, böngészőben, szervermentes.", keywords: ["pdf extract pages", "pdf oldalak kinyerés", "pdf oldal kiválasztás", "pdf page extract online"], status: "active", component: "PdfOldalakKivalasztasaTool", related: ["szetbontas", "oldalak-sorrendje", "oldalak-torlese"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "oldalak-sorrendje", category: "pdf", title: "PDF oldalak átrendezése online | Reorder", h1: "PDF oldalak átrendezése", description: "PDF oldalak átrendezése drag&drop segítségével, thumbnail előnézettel. Böngészőben, szervermentes.", keywords: ["pdf reorder", "pdf pages order", "pdf oldalak rendezés", "pdf sorrend változtatás"], status: "active", component: "PdfOldalakSorrendjeTool", related: ["oldalak-kivalasztasa", "osszeillesztes"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "oldalak-forgatasa", category: "pdf", title: "PDF oldalak forgatása online | Rotate", h1: "PDF oldalak forgatása", description: "Egyes PDF oldalak elforgatása 90°/180°/270° fokkal. Előnézet, böngészőben, szervermentes.", keywords: ["pdf rotate", "pdf forgatás", "pdf oldal elforgatás", "pdf rotate online"], status: "active", component: "PdfOldalakForgatasaTool", related: ["oldalak-sorrendje", "oldalak-kivalasztasa"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "oldalak-torlese", category: "pdf", title: "PDF oldalak törlése online | Remove pages", h1: "PDF oldalak törlése", description: "Meghatározott oldalak törlése PDF dokumentumból előnézettel. Böngészőben, szervermentes.", keywords: ["pdf delete pages", "pdf oldal törlés", "pdf remove pages", "pdf oldal eltávolítás online"], status: "active", component: "PdfOldalakTorleseTool", related: ["oldalak-kivalasztasa", "szetbontas"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "pdf-keppe", category: "pdf", title: "PDF → Kép konvertáló online | PNG/JPG export", h1: "PDF → Kép konvertálás", description: "PDF oldalak exportálása PNG/JPG képekként felbontás beállítással, ZIP letöltéssel. Böngészőben, szervermentes.", keywords: ["pdf to image", "pdf png", "pdf kép konvertálás", "pdf to jpg online", "pdf képpé alakítás"], status: "active", component: "PdfKeppeTool", related: ["kepek-pdfbe", "osszeillesztes"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "kepek-pdfbe", category: "pdf", title: "Képek PDF-be összefűzése online | Image to PDF", h1: "Képek → PDF konvertálás", description: "JPG/PNG képek PDF dokumentummá alakítása oldal méret beállítással. Drag&drop sorrend, böngészőben.", keywords: ["image to pdf", "jpg pdf", "kép pdf konvertálás", "képek pdf-be", "jpg to pdf online ingyenes"], status: "active", component: "KepekPdfbeTool", related: ["pdf-keppe", "osszeillesztes"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "pdf-informacio", category: "pdf", title: "PDF információk megjelenítése online | Metadata", h1: "PDF fájl információk", description: "PDF metadata megjelenítése: oldalszám, méret, szerző, létrehozás dátuma, biztonsági beállítások. Böngészőben.", keywords: ["pdf info", "pdf metadata", "pdf fájl információ", "pdf properties online", "pdf adatok megjelenítés"], status: "active", component: "PdfInfoTool", related: ["osszeillesztes", "fajl-informacio", "szoveg-kinyerese"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "tomoritese", category: "pdf", title: "PDF tömörítése online – ingyenes, böngészőben | Konvertalo.hu", h1: "PDF tömörítése", description: "Tömörítsd PDF fájljaidat ingyenesen böngészőben. Szerverfeltöltés nélkül, teljesen privát. Átlagosan 40-80%-os méretcsökkentés.", keywords: ["pdf tömörítése", "pdf méret csökkentése", "pdf kompresszió", "online pdf tömörítő"], status: "active", component: "PdfCompressTool", inputFormats: ["application/pdf"], acceptMultiple: false, related: ["osszeillesztes", "szetbontas", "pdf-keppe", "kepek-pdfbe"], launchedAt: "2026-03-01", faq: [{ q: "Mennyire tömöríti a PDF-et?", a: "Az eredmény a PDF tartalmától függ. Képekben gazdag dokumentumoknál 40–80%-os méretcsökkentés is elérhető." }, { q: "Romlik a minőség tömörítés után?", a: "A Közepes szint alig észrevehető minőségromlással kb. 60%-ot tömörít. Az Erős szint nagyobb tömörítést ér el." }, { q: "Feltöltődik a fájlom valahova?", a: "Nem. A tömörítés teljes egészében a böngésződben fut." }] },
  { slug: "pdf-vizjel", category: "pdf", title: "Vízjel hozzáadása PDF-hez – online, ingyenes | Konvertalo.hu", h1: "Vízjel hozzáadása PDF-hez", description: "Adj szöveges vízjelet PDF dokumentumaidhoz böngészőben. Átlós elhelyezés, átlátszóság és szín beállítható. Szerverfeltöltés nélkül.", keywords: ["pdf vízjel", "vízjel hozzáadása pdf-hez", "pdf watermark", "bizalmas pdf"], status: "active", component: "PdfWatermarkTool", inputFormats: ["application/pdf"], acceptMultiple: false, related: ["oldalszamok", "tomoritese", "jelszo-vedelem", "osszeillesztes"], launchedAt: "2026-03-01", faq: [{ q: "Eltávolítható-e a vízjel később?", a: "A vízjel beégetődik a PDF-be, és nem távolítható el egyszerűen." }, { q: "Minden oldalra kerül a vízjel?", a: "Igen, alapértelmezetten minden oldalra rákerül." }] },
  { slug: "oldalszamok", category: "pdf", title: "Oldalszámok hozzáadása PDF-hez – online, ingyenes | Konvertalo.hu", h1: "Oldalszámok hozzáadása PDF-hez", description: "Adj oldalszámokat PDF dokumentumaidhoz böngészőben. Pozíció, formátum és kezdőszám szabadon beállítható. Ingyenes, privát.", keywords: ["pdf oldalszámozás", "oldalszám hozzáadása pdf-hez", "pdf számozás", "oldal sorszám pdf"], status: "active", component: "PdfPageNumbersTool", inputFormats: ["application/pdf"], acceptMultiple: false, related: ["pdf-vizjel", "tomoritese", "osszeillesztes", "oldalak-sorrendje"], launchedAt: "2026-03-01", faq: [{ q: "Melyik oldaltól kezdjem a számozást?", a: "A kezdőszámot te állítod be. Megadhatod, hogy pl. 45-től induljon." }, { q: "Mi az 'Oldal X / Y' formátum?", a: "Ez a folyó oldalszám / összes oldal formátum, pl. 3 / 12." }] },
  { slug: "szoveg-kinyerese", category: "pdf", title: "PDF szöveg kinyerése – szöveg másolása PDF-ből online | Konvertalo.hu", h1: "PDF szöveg kinyerése", description: "Nyerd ki a szöveget PDF fájlodból böngészőben. Másolható, letölthető TXT formátumban. Szerverfeltöltés nélkül, privát.", keywords: ["pdf szöveg kinyerése", "szöveg másolás pdf-ből", "pdf to text", "pdf szöveg kivonatolás"], status: "active", component: "PdfExtractTextTool", inputFormats: ["application/pdf"], acceptMultiple: false, related: ["pdf-informacio", "tomoritese", "osszeillesztes", "szetbontas"], launchedAt: "2026-03-01", faq: [{ q: "Miért üres az eredmény?", a: "Ha a PDF szkennelt képekből áll, nincs benne keresható szöveg. OCR-szoftver lenne szükséges." }, { q: "Megőrzi a formázást?", a: "A kinyert szöveg sima szöveg lesz – betűtípusok, táblázatok és képek nem kerülnek át." }] },
  { slug: "alairas", category: "pdf", title: "PDF aláírása online – ingyenes, böngészőben | Konvertalo.hu", h1: "PDF aláírása", description: "Írj alá PDF dokumentumokat böngészőben. Rajzolt, gépelt vagy képként feltöltött aláírás. Szerverfeltöltés nélkül, teljesen privát.", keywords: ["pdf aláírás", "pdf aláírása online", "elektronikus aláírás pdf", "pdf digitális aláírás"], status: "active", component: "PdfSignTool", inputFormats: ["application/pdf"], acceptMultiple: false, related: ["jelszo-vedelem", "pdf-vizjel", "oldalszamok", "eltakares"], launchedAt: "2026-03-01", faq: [{ q: "Jogilag érvényes az aláírás?", a: "Vizuális aláírást helyez el a PDF-en. Egyszerű, nem minősített elektronikus aláírás." }, { q: "Melyik oldalra kerül az aláírás?", a: "Te választod meg – alapértelmezés az utolsó oldal." }] },
  { slug: "jelszo-vedelem", category: "pdf", title: "PDF jelszóval védése – online, ingyenes | Konvertalo.hu", h1: "PDF jelszóval védése", description: "Védd jelszóval PDF dokumentumaidat böngészőben. Megnyitási jelszó beállítása, opcionális szerkesztési korlátok. Szerverfeltöltés nélkül.", keywords: ["pdf jelszó", "pdf jelszóval védése", "pdf titkosítás", "pdf zárolás"], status: "active", component: "PdfPasswordProtectTool", inputFormats: ["application/pdf"], acceptMultiple: false, related: ["jelszo-eltavolitasa", "eltakares", "alairas", "pdf-vizjel"], launchedAt: "2026-03-01", faq: [{ q: "Mennyi ideig véd a jelszó?", a: "AES-128 titkosítást alkalmaz. A legtöbb esetben elegendő." }, { q: "Mi történik, ha elveszítem a jelszót?", a: "A fájl megnyithatatlan lesz. Nincs elfelejtett jelszó funkció." }] },
  { slug: "jelszo-eltavolitasa", category: "pdf", title: "PDF jelszó eltávolítása – online, ingyenes | Konvertalo.hu", h1: "PDF jelszó eltávolítása", description: "Távolítsd el a jelszóvédelmet PDF fájlodból böngészőben. Add meg a meglévő jelszót, majd töltsd le a védelem nélküli verziót.", keywords: ["pdf jelszó eltávolítása", "pdf védelem feloldása", "pdf jelszó törlése", "pdf unlock"], status: "active", component: "PdfPasswordRemoveTool", inputFormats: ["application/pdf"], acceptMultiple: false, related: ["jelszo-vedelem", "eltakares", "tomoritese", "pdf-informacio"], launchedAt: "2026-03-01", faq: [{ q: "Mi van, ha nem tudom a jelszót?", a: "Sajnos jelszó nélkül nem tudjuk eltávolítani a védelmet." }, { q: "Automatikusan felismeri a védett PDF-et?", a: "Igen, feltöltés után azonnal jelzi, ha jelszóval védett." }] },
  { slug: "eltakares", category: "pdf", title: "PDF eltakarása – érzékeny adatok törlése online | Konvertalo.hu", h1: "PDF eltakarása (redakálás)", description: "Takard el az érzékeny adatokat PDF dokumentumokban. Fekete téglalapok visszafordíthatatlanul beégethetők. Böngészőben, szerverfeltöltés nélkül.", keywords: ["pdf eltakarás", "pdf redakálás", "érzékeny adat törlése pdf", "pdf fekete csík", "pdf szerkesztés"], status: "active", component: "PdfRedactTool", inputFormats: ["application/pdf"], acceptMultiple: false, related: ["alairas", "jelszo-vedelem", "pdf-vizjel", "oldalak-torlese"], launchedAt: "2026-03-01", faq: [{ q: "Visszafordítható az eltakarás?", a: "NEM. A fekete téglalapok véglegesen beégetődnek a PDF-be." }, { q: "A szöveg valóban törlődik?", a: "Igen, a téglalapot beégetjük a tartalom-streambe." }] },

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
  { slug: "tsv-csv", category: "adat", title: "TSV → CSV konvertáló online | Ingyenes", h1: "TSV → CSV konvertáló", description: "Tab-separated values fájl konvertálása comma-separated CSV-vé böngészőben. Szervermentes, privát.", keywords: ["tsv csv", "tsv to csv", "tsv konvertálás", "tab separated csv"], status: "active", component: "DelimiterConvertTool", componentProps: { inputLabel: "TSV fajl", outputLabel: "CSV kimenet", inputAccept: ".tsv,.txt", workerType: "tsv-to-csv", outputExtension: "csv" }, related: ["csv-json", "csv-tsv", "csv-tisztitas"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "csv-tsv", category: "adat", title: "CSV → TSV konvertáló online | Ingyenes", h1: "CSV → TSV konvertáló", description: "CSV fájl konvertálása tab-elválasztású TSV formátumba böngészőben. Szervermentes, privát.", keywords: ["csv tsv", "csv to tsv", "csv tab konvertálás"], status: "active", component: "DelimiterConvertTool", componentProps: { inputLabel: "CSV fajl", outputLabel: "TSV kimenet", inputAccept: ".csv,.txt", workerType: "csv-to-tsv", outputExtension: "tsv" }, related: ["tsv-csv", "csv-json", "csv-tisztitas"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
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
  { slug: "sorok-rendezese", category: "szoveg", title: "Szöveg sorok rendezése online | Ingyenes ABC rendezés", h1: "Szövegsorok rendezése", description: "Sorok ABC rendezése növekvő, csökkenő vagy véletlenszerű sorrendbe – böngészőben, szerver nélkül. Magyar ékezetes rendezés támogatással.", keywords: ["sorok rendezése", "sort lines", "abc rendezés online", "szöveg sorba rendezés", "szöveg rendezés online"], status: "active", component: "TextTransformTool", componentProps: { operation: "sort-lines", operationLabel: "Rendezés", placeholder: "Illeszd be a szöveget – minden sor külön elemként rendeződik...", modeKey: "direction", modes: [{ value: "asc", label: "Növekvő (A→Z)" }, { value: "desc", label: "Csökkenő (Z→A)" }] }, related: ["ismetlodok-torlese", "ures-sorok-torlese"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "ismetlodok-torlese", category: "szoveg", title: "Ismétlődő sorok törlése online | Duplikátum szűrő", h1: "Ismétlődő sorok törlése", description: "Duplikált sorok eltávolítása szövegből – kis-/nagybetű érzékeny és érzéketlen mód. Böngészőben, privát.", keywords: ["duplikált sorok", "deduplicate", "ismétlődő sorok törlése", "duplicate remover online", "szöveg deduplikálás"], status: "active", component: "TextTransformTool", componentProps: { operation: "dedupe-lines", operationLabel: "Duplikátumok törlése", placeholder: "Illeszd be a szöveget – az ismétlődő sorok eltávolításra kerülnek..." }, related: ["sorok-rendezese", "ures-sorok-torlese"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "ures-sorok-torlese", category: "szoveg", title: "Üres sorok törlése szövegből | Online eszköz", h1: "Üres sorok törlése", description: "Üres és whitespace-only sorok eltávolítása szövegből egy kattintással. Böngészőben, privát.", keywords: ["üres sorok törlése", "remove blank lines", "üres sorok eltávolítása", "blank lines remover", "szöveg tisztítás"], status: "active", component: "TextTransformTool", componentProps: { operation: "remove-empty-lines", operationLabel: "Üres sorok törlése", placeholder: "Illeszd be a szöveget – az üres sorok automatikusan törlődnek..." }, related: ["whitespace-tisztitas", "ismetlodok-torlese"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "whitespace-tisztitas", category: "szoveg", title: "Whitespace tisztítás online | Szóközök normalizálása", h1: "Whitespace tisztítása", description: "Felesleges szóközök, tabulátorok és sortörések normalizálása – szöveg tisztítás böngészőben.", keywords: ["whitespace", "trim", "whitespace tisztítás", "szóköz eltávolítás", "szöveg trim online"], status: "active", component: "TextTransformTool", componentProps: { operation: "trim-whitespace", operationLabel: "Whitespace tisztítás", placeholder: "Illeszd be a szöveget – a felesleges szóközök normalizálásra kerülnek..." }, related: ["ures-sorok-torlese", "specialis-karakterek-torlese"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "ekezetek-eltavolitasa", category: "szoveg", title: "Ékezetek eltávolítása online | Magyar ékezet konverter", h1: "Ékezetek eltávolítása", description: "Magyar és egyéb ékezetes karakterek latin megfelelőre cserélése – á→a, ö→o, ű→u. Böngészőben, szerver nélkül.", keywords: ["ékezet eltávolítás", "diacritics remove", "ékezet konvertáló", "magyar ékezet eltávolítás", "remove accents online"], status: "active", component: "TextTransformTool", componentProps: { operation: "remove-accents", operationLabel: "Ékezetek eltávolítása", placeholder: "Illeszd be az ékezetes szöveget – á→a, ö→o, ű→u stb." }, related: ["slug-generator", "specialis-karakterek-torlese"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "specialis-karakterek-torlese", category: "szoveg", title: "Speciális karakterek törlése online | Szöveg tisztítás", h1: "Speciális karakterek törlése", description: "Nem ASCII és speciális karakterek eltávolítása szövegből – csak betűk, számok és alapvető írásjelek maradnak.", keywords: ["speciális karakterek", "special chars remove", "karakter törlés", "szöveg tisztítás online", "speciális karakter eltávolítás"], status: "active", component: "TextTransformTool", componentProps: { operation: "remove-special-chars", operationLabel: "Speciális karakterek törlése", placeholder: "Illeszd be a szöveget – a speciális karakterek eltávolításra kerülnek..." }, related: ["ekezetek-eltavolitasa", "whitespace-tisztitas"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "karaktercsere", category: "szoveg", title: "Karakter csere online | Szöveg keresés és csere", h1: "Karakter csere", description: "Karakterek és szövegrészek egyszerű cseréje regex nélkül – kis-/nagybetű érzékeny mód. Böngészőben, privát.", keywords: ["karakter csere", "find replace", "szöveg csere online", "karakter csere online", "text replace"], status: "active", component: "KarakterCsereTool", related: ["kereses-csere", "regex-kereses-csere"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "kereses-csere", category: "szoveg", title: "Keresés és csere online szövegben | Find & Replace", h1: "Keresés és csere", description: "Szövegben keresés és csere case-sensitive és teljes szó egyezés opcióval – böngészőben, szervermentes.", keywords: ["keresés csere", "find replace text", "szöveg keresés csere online", "find and replace online", "szöveg csere eszköz"], status: "active", component: "KeresesCsereTool", related: ["karaktercsere", "regex-kereses-csere"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "regex-kereses-csere", category: "szoveg", title: "Regex keresés és csere online | Reguláris kifejezés", h1: "Regex keresés és csere", description: "Reguláris kifejezéssel keresés és csere szövegben – flag választás, match szám, példa minták. Böngészőben.", keywords: ["regex", "regex replace online", "reguláris kifejezés", "regex tesztelő", "regex csere online"], status: "active", component: "RegexCsereTool", related: ["kereses-csere", "karaktercsere"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "kisbetu-nagybetu", category: "szoveg", title: "Kisbetű-nagybetű konvertáló online | Case convert", h1: "Kisbetű/nagybetű konvertálás", description: "Szöveg átalakítása NAGYBETŰ, kisbetű vagy Első Betű Nagy formátumba – egy kattintással, böngészőben.", keywords: ["uppercase lowercase", "case convert", "kisbetű nagybetű", "nagybetű konvertálás", "szöveg kisbetű online"], status: "active", component: "TextTransformTool", componentProps: { operation: "lowercase", operationLabel: "Betűméret konvertálás", placeholder: "Illeszd be a szöveget – válaszd ki a kívánt betűméretet...", modes: [{ value: "lowercase", label: "kisbetű" }, { value: "uppercase", label: "NAGYBETŰ" }, { value: "titlecase", label: "Első Betű Nagy" }] }, related: ["case-konverter", "slug-generator"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "case-konverter", category: "szoveg", title: "Case konverter | camelCase, snake_case, PascalCase online", h1: "Case konverter", description: "Szöveg átalakítása camelCase, snake_case, PascalCase, kebab-case formátumra – fejlesztőknek és tartalom készítőknek.", keywords: ["case converter", "camelcase", "snake_case", "pascalcase", "kebab-case", "case konverter online"], status: "active", component: "TextTransformTool", componentProps: { operation: "camelcase", operationLabel: "Case konvertálás", placeholder: "Illeszd be a szöveget – válaszd ki a kívánt case formátumot...", modes: [{ value: "camelcase", label: "camelCase" }, { value: "snakecase", label: "snake_case" }, { value: "pascalcase", label: "PascalCase" }, { value: "kebabcase", label: "kebab-case" }] }, related: ["kisbetu-nagybetu", "slug-generator"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },

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
  { slug: "yaml-formazas", category: "fejleszto", title: "YAML formázó online | Prettify", h1: "YAML formázása", description: "YAML prettify és normalizálás konzisztens behúzással – js-yaml alapú. Böngészőben, szervermentes.", keywords: ["yaml format", "yaml prettify", "yaml formázó", "yaml beautify online"], status: "active", component: "CodeFormatterTool", componentProps: { mode: "format", language: "yaml", placeholder: ui.pasteYamlCode }, related: ["yaml-ellenorzes", "json-formazas"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "xml-formazas", category: "fejleszto", title: "XML formázó online | Prettify és behúzás", h1: "XML formázása", description: "XML beautify és behúzás normalizálás – szintaxiskiemelés nélkül, tiszta kimenet. Böngészőben.", keywords: ["xml format", "xml prettify", "xml formázó", "xml beautify online", "xml indent"], status: "active", component: "CodeFormatterTool", componentProps: { mode: "format", language: "xml", placeholder: "Illeszd be az XML kódot..." }, related: ["xml-minimalas", "xml-ellenorzes"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "xml-minimalas", category: "fejleszto", title: "XML minifikáló online | Tömörítés", h1: "XML minifikálása", description: "XML whitespace és kommentek eltávolítása minimális méretű kimenethez. Méretcsökkentés százalékkal.", keywords: ["xml minify", "xml tömörítés", "xml minifikálás online"], status: "active", component: "CodeFormatterTool", componentProps: { mode: "minify", language: "xml", placeholder: "Illeszd be az XML kódot..." }, related: ["xml-formazas", "xml-ellenorzes"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "xml-ellenorzes", category: "fejleszto", title: "XML validátor online | Well-formedness", h1: "XML érvényesítése", description: "XML szintaxis validálás és well-formedness ellenőrzés DOMParser-rel. Böngészőben, szervermentes.", keywords: ["xml validate", "xml validátor", "xml ellenőrzés online", "xml well-formed"], status: "active", component: "CodeFormatterTool", related: ["xml-formazas", "yaml-ellenorzes"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "html-formazas", category: "fejleszto", title: "HTML formázó online | Beautify", h1: "HTML formázása", description: "HTML kód beautify és behúzás normalizálás – void elemek kezelése, konzisztens indent. Böngészőben.", keywords: ["html format", "html beautify", "html formázó", "html indent online", "html prettify"], status: "active", component: "CodeFormatterTool", componentProps: { mode: "format", language: "html", placeholder: "Illeszd be a HTML kódot..." }, related: ["html-minimalas", "xml-formazas"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "html-minimalas", category: "fejleszto", title: "HTML minifikáló online | Fejlesztő eszköz", h1: "HTML minifikálása", description: "HTML whitespace és kommentek eltávolítása production build-hez. Méretcsökkentés százalékkal.", keywords: ["html minify", "html tömörítés", "html minifikálás fejlesztő"], status: "active", component: "CodeFormatterTool", componentProps: { mode: "minify", language: "html", placeholder: "Illeszd be a HTML kódot..." }, related: ["html-formazas", "css-minimalas"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "css-formazas", category: "fejleszto", title: "CSS formázó online | Beautify", h1: "CSS formázása", description: "CSS kód beautify konzisztens behúzással – property rendezés, szelektorok elválasztása. Böngészőben.", keywords: ["css format", "css beautify", "css formázó online", "css prettify", "css indent"], status: "active", component: "CodeFormatterTool", componentProps: { mode: "format", language: "css", placeholder: "Illeszd be a CSS kódot..." }, related: ["css-minimalas", "html-formazas"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "css-minimalas", category: "fejleszto", title: "CSS minifikáló online | Tömörítés", h1: "CSS minifikálása", description: "CSS whitespace és kommentek eltávolítása, rövidítések – kisebb fájlméret production-hoz.", keywords: ["css minify", "css tömörítés", "css minifikálás online", "css compress"], status: "active", component: "CodeFormatterTool", componentProps: { mode: "minify", language: "css", placeholder: "Illeszd be a CSS kódot..." }, related: ["css-formazas", "js-minimalas"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "js-formazas", category: "fejleszto", title: "JavaScript formázó online | Beautify", h1: "JavaScript formázása", description: "JavaScript kód prettify és behúzás normalizálás – string-aware, blokk szintű indent. Böngészőben.", keywords: ["js format", "js beautify", "javascript formázó", "js prettify online", "javascript beautify"], status: "active", component: "CodeFormatterTool", componentProps: { mode: "format", language: "js", placeholder: "Illeszd be a JavaScript kódot..." }, related: ["js-minimalas", "json-formazas"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
  { slug: "js-minimalas", category: "fejleszto", title: "JavaScript minifikáló online | Tömörítés", h1: "JavaScript minifikálása", description: "JavaScript kód minifikálása: kommentek, whitespace eltávolítása production build-hez.", keywords: ["js minify", "javascript minify", "js tömörítés online", "javascript minifikálás"], status: "active", component: "CodeFormatterTool", componentProps: { mode: "minify", language: "js", placeholder: "Illeszd be a JavaScript kódot..." }, related: ["js-formazas", "css-minimalas"], updatedAt: "2026-02-23", launchedAt: "2026-02-23", faq: [] },
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

  // ═══ RO-ONLY: CALCULATOR – Fázis 2 ═══════════════════════════════════════
  // Algebra + statistici. Minden entry `languages: ["ro"]`.
  { slug: "procent-calculator",     category: "calculator", title: "Calculator Procente",        h1: "Calculator Procente",        description: "Calculator procente: 4 moduri.",     keywords: [], status: "active", component: "ProcentCalculator",        languages: ["ro"], related: ["medie-aritmetica", "regula-de-trei-simpla"],         updatedAt: "2026-04-25", launchedAt: "2026-04-25", faq: [] },
  { slug: "ecuatie-grad-doi",       category: "calculator", title: "Ecuație Grad II",            h1: "Ecuație de Gradul II",        description: "ax² + bx + c = 0.",                  keywords: [], status: "active", component: "EcuatieGradDoiCalculator", languages: ["ro"], related: ["ecuatii-exponentiale", "procent-calculator"],        updatedAt: "2026-04-25", launchedAt: "2026-04-25", faq: [] },
  { slug: "ecuatii-exponentiale",   category: "calculator", title: "Ecuații Exponențiale",       h1: "Ecuații Exponențiale",        description: "a · bˣ = c cu logaritmi.",           keywords: [], status: "active", component: "EcuatieExponentialaCalculator", languages: ["ro"], related: ["ecuatie-grad-doi", "procent-calculator"],     updatedAt: "2026-04-25", launchedAt: "2026-04-25", faq: [] },
  { slug: "medie-aritmetica",       category: "calculator", title: "Calculator Medie",           h1: "Calculator Medie Aritmetică", description: "Medie, mediană, mod, abatere.",      keywords: [], status: "active", component: "MedieCalculator",          languages: ["ro"], related: ["procent-calculator", "regula-de-trei-simpla"],        updatedAt: "2026-04-25", launchedAt: "2026-04-25", faq: [] },
  { slug: "regula-de-trei-simpla",  category: "calculator", title: "Regula de Trei Simplă",      h1: "Regula de Trei Simplă",       description: "Proporție directă și inversă.",      keywords: [], status: "active", component: "RegulaDeTreiCalculator",   languages: ["ro"], related: ["procent-calculator", "medie-aritmetica"],            updatedAt: "2026-04-25", launchedAt: "2026-04-25", faq: [] },

  // ═══ RO-ONLY: CALCULATOR – Fázis 4 cleanup (consum combustibil mutat din /conversii/) ═══
  { slug: "consum-combustibil",     category: "calculator", title: "Calculator Consum Combustibil", h1: "Calculator Consum Combustibil", description: "l/100 km, mpg, cost drum, CO₂.",     keywords: [], status: "active", component: "ConsumCombustibilCalculator", languages: ["ro"], related: ["galon-litri", "regula-de-trei-simpla", "procent-calculator"],   updatedAt: "2026-04-27", launchedAt: "2026-04-27", faq: [] },

  // ═══ RO-ONLY: GEOMETRIE – Fázis 3 ═══════════════════════════════════════════
  // 5 calculatoare de geometrie cu vizualizare SVG live.
  { slug: "triunghi-dreptunghic",   category: "geometrie",  title: "Triunghi Dreptunghic",       h1: "Calculator Triunghi Dreptunghic", description: "Pitagora + arie + unghiuri.",     keywords: [], status: "active", component: "TriunghiDreptCalculator",  languages: ["ro"], related: ["functii-trigonometrice", "cerc-calculator"],         updatedAt: "2026-04-25", launchedAt: "2026-04-25", faq: [] },
  { slug: "functii-trigonometrice", category: "geometrie",  title: "Funcții Trigonometrice",     h1: "Calculator Funcții Trigonometrice", description: "sin, cos, tan, cot.",          keywords: [], status: "active", component: "FunctiiTrigCalculator",    languages: ["ro"], related: ["radiani-grade", "triunghi-dreptunghic"],            updatedAt: "2026-04-25", launchedAt: "2026-04-25", faq: [] },
  { slug: "radiani-grade",          category: "geometrie",  title: "Radiani ↔ Grade",            h1: "Convertor Radiani ↔ Grade",       description: "Conversie bidirecțională.",       keywords: [], status: "active", component: "RadianiGradeCalculator",   languages: ["ro"], related: ["functii-trigonometrice", "cerc-calculator"],        updatedAt: "2026-04-25", launchedAt: "2026-04-25", faq: [] },
  { slug: "cerc-calculator",        category: "geometrie",  title: "Calculator Cerc",            h1: "Calculator Cerc",                 description: "Rază, diametru, perimetru, arie.", keywords: [], status: "active", component: "CercCalculator",           languages: ["ro"], related: ["radiani-grade", "dreptunghi-calculator"],            updatedAt: "2026-04-25", launchedAt: "2026-04-25", faq: [] },
  { slug: "dreptunghi-calculator",  category: "geometrie",  title: "Calculator Dreptunghi",      h1: "Calculator Dreptunghi",           description: "Arie, perimetru, diagonală.",     keywords: [], status: "active", component: "DreptunghiCalculator",     languages: ["ro"], related: ["triunghi-dreptunghic", "cerc-calculator"],          updatedAt: "2026-04-25", launchedAt: "2026-04-25", faq: [] },

  // ═══ RO-ONLY: CONVERSII – Fázis 1 pilot ═══════════════════════════════════
  // Minden entry `languages: ["ro"]` – HU build automatikusan kiszűri.
  // Custom Svelte komponensek a math reference site-ról portolva.
  { slug: "cm-metri",          category: "conversii", title: "Convertor cm ↔ metri",          h1: "Convertor cm ↔ metri",          description: "Convertor centimetri ↔ metri.",          keywords: [], status: "active", component: "CmMeterCalculator",    languages: ["ro"], related: ["km-metri", "cm-inch"],         updatedAt: "2026-04-25", launchedAt: "2026-04-25", faq: [] },
  { slug: "km-metri",          category: "conversii", title: "Convertor km ↔ metri",          h1: "Convertor km ↔ metri",          description: "Convertor kilometri ↔ metri.",           keywords: [], status: "active", component: "KmMeterCalculator",    languages: ["ro"], related: ["cm-metri"],                       updatedAt: "2026-04-25", launchedAt: "2026-04-25", faq: [] },
  { slug: "cm-inch",           category: "conversii", title: "Convertor cm ↔ inch",           h1: "Convertor cm ↔ inch",           description: "Convertor centimetri ↔ inch (țoli).",    keywords: [], status: "active", component: "RulerConverter",       languages: ["ro"], related: ["cm-metri"],                       updatedAt: "2026-04-25", launchedAt: "2026-04-25", faq: [] },
  { slug: "kg-grame",          category: "conversii", title: "Convertor kg ↔ grame",          h1: "Convertor kg ↔ grame",          description: "Convertor kilograme ↔ grame.",           keywords: [], status: "active", component: "KgGramCalculator",     languages: ["ro"], related: ["litri-mililitri"],                updatedAt: "2026-04-25", launchedAt: "2026-04-25", faq: [] },
  { slug: "litri-mililitri",   category: "conversii", title: "Convertor litri ↔ ml",          h1: "Convertor litri ↔ ml",          description: "Convertor litri ↔ mililitri.",           keywords: [], status: "active", component: "LiterMlCalculator",    languages: ["ro"], related: ["kg-grame"],                       updatedAt: "2026-04-25", launchedAt: "2026-04-25", faq: [] },
  { slug: "celsius-fahrenheit",category: "conversii", title: "Convertor Celsius ↔ Fahrenheit",h1: "Convertor Celsius ↔ Fahrenheit",description: "Convertor Celsius ↔ Fahrenheit.",        keywords: [], status: "active", component: "ThermometerConverter", languages: ["ro"], related: [],                                 updatedAt: "2026-04-25", launchedAt: "2026-04-25", faq: [] },

  // ═══ RO-ONLY: CONVERSII – Fázis 4 (set complet de unități) ════════════════
  // 11 noi convertoare: lungime (foot, inch), masă (livre, tone), suprafață
  // (hectare, ari), volum (decilitri, m³, galon), construcții (beton, densitate).
  { slug: "picioare-cm",             category: "conversii", title: "Convertor picioare ↔ cm",       h1: "Convertor picioare ↔ cm",       description: "Convertor picioare + țoli ↔ cm.",            keywords: [], status: "active", component: "FootCmCalculator",     languages: ["ro"], related: ["inch-cm", "cm-metri"],                          updatedAt: "2026-04-26", launchedAt: "2026-04-26", faq: [] },
  { slug: "inch-cm",                 category: "conversii", title: "Convertor inch ↔ cm",            h1: "Convertor inch ↔ cm",           description: "Convertor inch ↔ centimetri.",               keywords: [], status: "active", component: "InchCmCalculator",     languages: ["ro"], related: ["cm-inch", "picioare-cm"],                       updatedAt: "2026-04-26", launchedAt: "2026-04-26", faq: [] },
  { slug: "kg-livre",                category: "conversii", title: "Convertor kg ↔ livre",           h1: "Convertor kg ↔ livre",          description: "Convertor kilograme ↔ livre / pounds (lb).", keywords: [], status: "active", component: "KgLivreCalculator",    languages: ["ro"], related: ["kg-grame", "tone-kg"],                          updatedAt: "2026-04-26", launchedAt: "2026-04-26", faq: [] },
  { slug: "tone-kg",                 category: "conversii", title: "Convertor tone ↔ kg",            h1: "Convertor tone ↔ kg",           description: "Convertor tone metrice ↔ kilograme.",        keywords: [], status: "active", component: "ToneKgCalculator",     languages: ["ro"], related: ["kg-grame", "kg-livre"],                         updatedAt: "2026-04-26", launchedAt: "2026-04-26", faq: [] },
  { slug: "hectare-metri-patrati",   category: "conversii", title: "Convertor hectare ↔ m²",         h1: "Convertor hectare ↔ m²",        description: "Convertor hectare ↔ metri pătrați.",         keywords: [], status: "active", component: "HectareCalculator",    languages: ["ro"], related: ["ari-metri-patrati"],                            updatedAt: "2026-04-26", launchedAt: "2026-04-26", faq: [] },
  { slug: "ari-metri-patrati",       category: "conversii", title: "Convertor ari ↔ m²",             h1: "Convertor ari ↔ m²",            description: "Convertor ari ↔ metri pătrați (imobiliar RO).", keywords: [], status: "active", component: "AriCalculator",        languages: ["ro"], related: ["hectare-metri-patrati"],                         updatedAt: "2026-04-26", launchedAt: "2026-04-26", faq: [] },
  { slug: "litri-decilitri",         category: "conversii", title: "Convertor litri ↔ decilitri",    h1: "Convertor litri ↔ decilitri",   description: "Convertor litri ↔ decilitri.",               keywords: [], status: "active", component: "LitriDlCalculator",    languages: ["ro"], related: ["litri-mililitri"],                              updatedAt: "2026-04-26", launchedAt: "2026-04-26", faq: [] },
  { slug: "litri-metri-cubi",        category: "conversii", title: "Convertor litri ↔ m³",           h1: "Convertor litri ↔ m³",          description: "Convertor litri ↔ metri cubi.",              keywords: [], status: "active", component: "LitriM3Calculator",    languages: ["ro"], related: ["litri-mililitri", "litri-decilitri"],           updatedAt: "2026-04-26", launchedAt: "2026-04-26", faq: [] },
  { slug: "galon-litri",             category: "conversii", title: "Convertor galon ↔ litri",        h1: "Convertor galon ↔ litri",       description: "Convertor galoane (US/UK) ↔ litri.",         keywords: [], status: "active", component: "GalonLitriCalculator", languages: ["ro"], related: ["litri-mililitri", "litri-metri-cubi"],          updatedAt: "2026-04-26", launchedAt: "2026-04-26", faq: [] },
  { slug: "beton-greutate-volum",    category: "conversii", title: "Beton: greutate ↔ volum",        h1: "Beton: greutate ↔ volum",       description: "Convertor beton greutate ↔ volum (ρ=2400 kg/m³).", keywords: [], status: "active", component: "BetonCalculator",      languages: ["ro"], related: ["densitate-kg-m3-g-cm3", "litri-metri-cubi"],   updatedAt: "2026-04-26", launchedAt: "2026-04-26", faq: [] },
  { slug: "densitate-kg-m3-g-cm3",   category: "conversii", title: "Convertor densitate kg/m³ ↔ g/cm³", h1: "Convertor densitate kg/m³ ↔ g/cm³", description: "Convertor densitate între kg/m³ și g/cm³.", keywords: [], status: "active", component: "DensitateCalculator",  languages: ["ro"], related: ["beton-greutate-volum"],                         updatedAt: "2026-04-26", launchedAt: "2026-04-26", faq: [] },

  // ═══ RO-ONLY: CONVERSII – Fázis 4 cleanup (3 convertoare densitate construcții) ═══════
  { slug: "nisip-greutate-volum",    category: "conversii", title: "Nisip: greutate ↔ volum",        h1: "Nisip: greutate ↔ volum",       description: "Convertor nisip greutate ↔ volum (ρ=1500 kg/m³).",  keywords: [], status: "active", component: "NisipCalculator",    languages: ["ro"], related: ["pietris-greutate-volum", "balast-greutate-volum", "beton-greutate-volum"], updatedAt: "2026-04-27", launchedAt: "2026-04-27", faq: [] },
  { slug: "pietris-greutate-volum",  category: "conversii", title: "Pietriș: greutate ↔ volum",      h1: "Pietriș: greutate ↔ volum",     description: "Convertor pietriș greutate ↔ volum (ρ=1500 kg/m³).", keywords: [], status: "active", component: "PietrisCalculator", languages: ["ro"], related: ["nisip-greutate-volum", "balast-greutate-volum", "beton-greutate-volum"], updatedAt: "2026-04-27", launchedAt: "2026-04-27", faq: [] },
  { slug: "balast-greutate-volum",   category: "conversii", title: "Balast: greutate ↔ volum",       h1: "Balast: greutate ↔ volum",      description: "Convertor balast greutate ↔ volum (ρ=1600 kg/m³).",  keywords: [], status: "active", component: "BalastCalculator",  languages: ["ro"], related: ["nisip-greutate-volum", "pietris-greutate-volum", "beton-greutate-volum"], updatedAt: "2026-04-27", launchedAt: "2026-04-27", faq: [] },

  // ═══ RO-ONLY: FINANTE – Fázis 5 (calculatoare financiare RO) ════════════════
  // 6 tools: TVA RO (19/9/5%), credit anuitar (BCR/BRD presets), dobândă compusă,
  // reducere (forward + reverse), marjă vs adaos, salariu lunar→orar.
  { slug: "calculator-tva",         category: "finante", title: "Calculator TVA România",         h1: "Calculator TVA România",         description: "Calculator TVA cu cotele oficiale RO (19%, 9%, 5%).", keywords: [], status: "active", component: "TvaCalculator",          languages: ["ro"], related: ["calculator-reducere", "marja-adaos"],            updatedAt: "2026-04-27", launchedAt: "2026-04-27", faq: [] },
  { slug: "calculator-credit",      category: "finante", title: "Calculator Credit Anuitar",      h1: "Calculator Credit Anuitar",      description: "Calculator credit anuitar cu rate dobândă tipice 2026 RO.", keywords: [], status: "active", component: "CreditCalculator",      languages: ["ro"], related: ["dobanda-compusa", "calculator-tva"],             updatedAt: "2026-04-27", launchedAt: "2026-04-27", faq: [] },
  { slug: "dobanda-compusa",        category: "finante", title: "Calculator Dobândă Compusă",     h1: "Calculator Dobândă Compusă",     description: "Calculator dobândă compusă cu compoundare lunară/zilnică.", keywords: [], status: "active", component: "DobandaCompusaCalculator", languages: ["ro"], related: ["calculator-credit", "marja-adaos"],          updatedAt: "2026-04-27", launchedAt: "2026-04-27", faq: [] },
  { slug: "calculator-reducere",    category: "finante", title: "Calculator Reducere",            h1: "Calculator Reducere",            description: "Calculator reducere bidirecțional pentru Black Friday și verificare oferte.", keywords: [], status: "active", component: "ReducereCalculator",  languages: ["ro"], related: ["calculator-tva", "marja-adaos"],                 updatedAt: "2026-04-27", launchedAt: "2026-04-27", faq: [] },
  { slug: "marja-adaos",            category: "finante", title: "Calculator Marjă & Adaos",       h1: "Calculator Marjă & Adaos Comercial", description: "Convertor între marjă brută și adaos comercial pentru e-commerce.", keywords: [], status: "active", component: "MarjaCalculator",        languages: ["ro"], related: ["calculator-tva", "calculator-reducere"],         updatedAt: "2026-04-27", launchedAt: "2026-04-27", faq: [] },
  { slug: "calculator-salariu-ora", category: "finante", title: "Salariu Lunar → Orar",           h1: "Calculator Salariu Lunar → Orar",description: "Convertor salariu lunar brut în orar/zilnic/săptămânal — norma RO 168 h/lună.", keywords: [], status: "active", component: "SalariuOraCalculator", languages: ["ro"], related: ["calculator-tva", "calculator-credit"],           updatedAt: "2026-04-27", launchedAt: "2026-04-27", faq: [] },

  // ═══ RO-ONLY: SANATATE – Fázis 6 (calculatoare de sănătate RO) ════════════════
  // 3 tools: IMC (BMI WHO), greutate ideală (4 formule), calorii zilnice (Mifflin-St Jeor).
  { slug: "calculator-imc",       category: "sanatate", title: "Calculator IMC (BMI)",          h1: "Calculator IMC (Indice Masă Corporală)", description: "Calculator IMC cu clasificare WHO și greutate ideală.",                       keywords: [], status: "active", component: "ImcCalculator",            languages: ["ro"], related: ["greutate-ideala", "calculator-calorii"], updatedAt: "2026-04-27", launchedAt: "2026-04-27", faq: [] },
  { slug: "greutate-ideala",      category: "sanatate", title: "Calculator Greutate Ideală",    h1: "Calculator Greutate Ideală",              description: "4 formule științifice: Devine, Robinson, Miller, Hamwi.",                  keywords: [], status: "active", component: "GreutateIdealaCalculator", languages: ["ro"], related: ["calculator-imc", "calculator-calorii"],   updatedAt: "2026-04-27", launchedAt: "2026-04-27", faq: [] },
  { slug: "calculator-calorii",   category: "sanatate", title: "Calculator Calorii Zilnice",    h1: "Calculator Calorii Zilnice (BMR + TDEE)", description: "BMR Mifflin-St Jeor + TDEE + macro split (P/C/F) cu donut chart.", keywords: [], status: "active", component: "CaloriiCalculator",        languages: ["ro"], related: ["calculator-imc", "greutate-ideala"],     updatedAt: "2026-04-27", launchedAt: "2026-04-27", faq: [] },

  // ═══ RO-ONLY: TIMP – Fázis 7 (countdown-uri + diferență date RO) ════════════════
  // 8 tools: diferență date (3 moduri), 4 countdown-uri fixe (Crăciun, Revelion, Paști,
  // BAC) + 2 personalizate (zi naștere, generator) + 1 vârstă live (câte zile am trăit).
  { slug: "diferenta-date",          category: "timp", title: "Diferență între Date",          h1: "Calculator Diferență între Date",          description: "Zile, săptămâni, luni, ani între 2 date + zile lucrătoare RO + adunare/scădere.",         keywords: [], status: "active", component: "DiferentaDateCalculator",   languages: ["ro"], related: ["cate-zile-am", "generator-numaratoare"],         updatedAt: "2026-04-28", launchedAt: "2026-04-28", faq: [] },
  { slug: "craciun-numaratoare",     category: "timp", title: "Numărătoare Crăciun",           h1: "Numărătoare Inversă până la Crăciun",      description: "Live countdown până la 25 decembrie cu animație ninsoare.",                            keywords: [], status: "active", component: "CraciunCountdown",           languages: ["ro"], related: ["revelion-numaratoare", "generator-numaratoare"], updatedAt: "2026-04-28", launchedAt: "2026-04-28", faq: [] },
  { slug: "revelion-numaratoare",    category: "timp", title: "Numărătoare Revelion",          h1: "Numărătoare Inversă până la Revelion",     description: "Live countdown până la 1 ianuarie cu animație artificii.",                              keywords: [], status: "active", component: "RevelionCountdown",          languages: ["ro"], related: ["craciun-numaratoare", "generator-numaratoare"], updatedAt: "2026-04-28", launchedAt: "2026-04-28", faq: [] },
  { slug: "pasti-numaratoare",       category: "timp", title: "Numărătoare Paști Ortodox",     h1: "Numărătoare Inversă până la Paști",        description: "Live countdown până la Paștele ortodox (algoritm Meeus, calendar iulian + 13 zile).", keywords: [], status: "active", component: "PastiCountdown",             languages: ["ro"], related: ["craciun-numaratoare", "diferenta-date"],        updatedAt: "2026-04-28", launchedAt: "2026-04-28", faq: [] },
  { slug: "zi-de-nastere",           category: "timp", title: "Numărătoare Zi de Naștere",     h1: "Numărătoare Inversă Zi de Naștere",        description: "Live countdown personalizat cu data ta de naștere + URL share.",                       keywords: [], status: "active", component: "ZiNastereCountdown",         languages: ["ro"], related: ["cate-zile-am", "generator-numaratoare"],         updatedAt: "2026-04-28", launchedAt: "2026-04-28", faq: [] },
  { slug: "generator-numaratoare",   category: "timp", title: "Generator Numărătoare",         h1: "Generator Numărătoare Inversă",            description: "Creează numărătoare custom pentru orice eveniment + URL partajabil.",                  keywords: [], status: "active", component: "CountdownGenerator",         languages: ["ro"], related: ["zi-de-nastere", "diferenta-date"],              updatedAt: "2026-04-28", launchedAt: "2026-04-28", faq: [] },
  { slug: "cate-zile-am",            category: "timp", title: "Câte Zile Am Trăit",            h1: "Câte Zile Am Trăit?",                       description: "Live age clock cu mérföldkövek (10k zile, 1 milion min, 1 miliard sec).",              keywords: [], status: "active", component: "CateZileAmCalculator",       languages: ["ro"], related: ["zi-de-nastere", "diferenta-date"],              updatedAt: "2026-04-28", launchedAt: "2026-04-28", faq: [] },
  { slug: "bacalaureat-numaratoare", category: "timp", title: "Numărătoare Bacalaureat",       h1: "Numărătoare Inversă până la Bacalaureat", description: "Live countdown BAC RO sesiunea de vară cu plan studiu și mesaje motivaționale.",      keywords: [], status: "active", component: "BacalaureatCountdown",       languages: ["ro"], related: ["diferenta-date", "generator-numaratoare"],     updatedAt: "2026-04-28", launchedAt: "2026-04-28", faq: [] },
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

// ─── Apply Romanian translations to i18n.ro ─────────────────
for (const tool of rawTools) {
  const catTranslations = RO_TRANSLATIONS[tool.category];
  const roData = catTranslations?.[tool.slug];
  if (roData) {
    tool.i18n = tool.i18n ?? {};
    tool.i18n.ro = { ...roData, ...(tool.i18n.ro ?? {}) };
  }
}

// ─── Apply Romanian SEO content to i18n.ro ──────────────────
const ALL_RO_CONTENT: ContentMap = {
  ...KEP_RO_CONTENT,
  ...ADAT_RO_CONTENT,
  ...SZOVEG_RO_CONTENT,
  ...FEJLESZTO_RO_CONTENT,
  ...PDF_RO_CONTENT,
  ...EXCEL_RO_CONTENT,
  ...MARKDOWN_RO_CONTENT,
  ...HTML_RO_CONTENT,
  ...FAJL_RO_CONTENT,
  ...SEO_TOOL_RO_CONTENT,
  ...CALCULATOR_RO_CONTENT,
  ...GEOMETRIE_RO_CONTENT,
  ...CONVERSII_RO_CONTENT,
  ...FINANTE_RO_CONTENT,
  ...SANATATE_RO_CONTENT,
  ...TIMP_RO_CONTENT,
};

for (const tool of rawTools) {
  const roContent = ALL_RO_CONTENT[tool.slug];
  if (roContent) {
    tool.i18n = tool.i18n ?? {};
    tool.i18n.ro = tool.i18n.ro ?? {} as any;
    tool.i18n.ro!.content = roContent.content;
    tool.i18n.ro!.introText = roContent.introText;
    tool.i18n.ro!.guide = roContent.guide;
    tool.i18n.ro!.faq = roContent.faq;
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

// ─── i18n Helpers ────────────────────────────────────────────────────────────

/**
 * Visszaadja a tool-t az aktuális nyelvre lokalizálva.
 * Ha nincs i18n fordítás az adott nyelvhez, az eredeti hu mezők maradnak.
 */
export function getLocalizedTool(tool: Tool, lang: SupportedLang = CURRENT_LANG): Tool {
  const langOverride = tool.i18n?.[lang];
  if (!langOverride) return tool;
  return { ...tool, ...langOverride };
}

/**
 * Visszaadja a kategóriát az aktuális nyelvre lokalizálva.
 */
export function getLocalizedCategory(cat: Category, lang: SupportedLang = CURRENT_LANG): Category {
  const langOverride = cat.i18n?.[lang];
  if (!langOverride) return cat;
  const { intro: roIntro, ...rest } = langOverride;
  const result = { ...cat, ...rest };
  if (roIntro && roIntro.length > 0) result.intro = roIntro;
  return result;
}

/**
 * Visszaadja az összes kategóriát lokalizálva.
 */
export function getLocalizedCategories(lang: SupportedLang = CURRENT_LANG): Category[] {
  return CATEGORIES.map(cat => getLocalizedCategory(cat, lang));
}

/**
 * Meghatározza hogy az adott tool megjelenik-e az aktuális nyelven.
 */
export function isToolVisibleInLang(
  tool: Tool,
  lang: SupportedLang = CURRENT_LANG
): boolean {
  if (tool.languages && tool.languages.length > 0) {
    return tool.languages.includes(lang);
  }
  const category = CATEGORIES.find(c => c.id === tool.category);
  if (category?.languages && category.languages.length > 0) {
    return category.languages.includes(lang);
  }
  return true;
}

/**
 * Meghatározza hogy az adott kategória megjelenik-e az aktuális nyelven.
 */
export function isCategoryVisibleInLang(
  category: Category,
  lang: SupportedLang = CURRENT_LANG
): boolean {
  if (category.languages && category.languages.length > 0) {
    return category.languages.includes(lang);
  }
  return true;
}

/**
 * Visszaadja az aktuális nyelvhez tartozó aktív tool-okat.
 */
export function getVisibleActiveTools(lang: SupportedLang = CURRENT_LANG): Tool[] {
  return tools.filter(
    t => t.status === "active" && isToolVisibleInLang(t, lang)
  );
}

/**
 * Visszaadja az aktuális nyelvhez tartozó összes tool-t (active + coming-soon).
 */
export function getVisibleTools(lang: SupportedLang = CURRENT_LANG): Tool[] {
  return tools.filter(t => isToolVisibleInLang(t, lang));
}

/**
 * Visszaadja az aktuális nyelvhez tartozó kategóriákat.
 */
export function getVisibleCategories(lang: SupportedLang = CURRENT_LANG): Category[] {
  return CATEGORIES.filter(cat => {
    if (!isCategoryVisibleInLang(cat, lang)) return false;
    const hasVisibleTool = tools.some(
      t => t.category === cat.id && isToolVisibleInLang(t, lang)
    );
    return hasVisibleTool;
  });
}
