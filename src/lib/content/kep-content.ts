import type { ContentMap } from "./types.ts";

export const KEP_CONTENT: ContentMap = {
  // ═══ SVG OPTIMALIZÁLÓ (HU+RO bilingual) ══════════════════════════════════
  "svg-optimalizalo": {
    introText:
      "Az SVG optimalizáló minifikálja a vektorgrafikus fájljaidat: eltávolítja a kommenteket, a metaadatokat, a szerkesztőprogramok (Inkscape, Illustrator) felesleges attribútumait és namespace-eit, valamint a felesleges szóközöket és sortöréseket. A kép megjelenése változatlan marad, a fájlméret viszont jelentősen csökken – gyorsabb betöltést és tisztább kódot eredményezve. Webfejlesztőknek és designereknek, akik ikonokat és illusztrációkat tesznek élesbe.",
    guide: [
      "1. Húzd be vagy tallózd ki az SVG fájlt.",
      "2. Kattints az «Optimalizálás» gombra – az eszköz azonnal minifikálja a kódot.",
      "3. Nézd meg a méretcsökkenést (eredeti vs. optimalizált), és másold ki a kódot vagy töltsd le a fájlt.",
      "4. A letöltött SVG funkcionálisan azonos, csak kisebb és tisztább.",
    ],
    faq: [
      { q: "Mit távolít el az optimalizáló?", a: "XML deklarációt, DOCTYPE-ot, kommenteket, a <metadata> blokkot, a szerkesztői (Inkscape, Sodipodi) attribútumokat és namespace-eket, valamint a tagok közötti és a többszörös whitespace-t." },
      { q: "Megváltozik a kép a minifikálás után?", a: "Nem. Csak a megjelenítést nem befolyásoló elemek (kommentek, metaadatok, whitespace) kerülnek eltávolításra – a rajzolási utasítások (path, alakzatok, színek) érintetlenek maradnak." },
      { q: "Mennyivel lesz kisebb a fájl?", a: "Ez a forrástól függ: a szerkesztőből exportált SVG-k gyakran sok felesleges metaadatot tartalmaznak, ezeknél 30–60% csökkenés is elérhető; a már tiszta SVG-knél kevesebb." },
      { q: "Biztonságos az adataim szempontjából?", a: "Igen, a teljes feldolgozás a böngésződben történik – az SVG fájl egyetlen bájtja sem kerül szerverre." },
      { q: "Megőrzi a <title> és <desc> elemeket?", a: "Igen, az akadálymentességhez fontos <title> és <desc> elemeket megtartja; csak a megjelenítéshez és kódhoz felesleges részeket törli." },
    ],
    content: {
      howToSteps: [
        { title: "1. SVG feltöltése", description: "Húzd be az SVG fájlt a feltöltési területre vagy tallózd ki." },
        { title: "2. Optimalizálás", description: "Kattints az «Optimalizálás» gombra – a minifikálás azonnal lefut." },
        { title: "3. Eredmény ellenőrzése", description: "Megjelenik az eredeti és az optimalizált méret, valamint a százalékos csökkenés." },
        { title: "4. Másolás vagy letöltés", description: "Másold a tiszta SVG kódot a vágólapra, vagy töltsd le fájlként." },
      ],
      useCases: [
        { icon: "🌐", title: "Weboldal-teljesítmény", description: "Kisebb SVG-k gyorsabb betöltést és jobb Core Web Vitals értékeket adnak." },
        { icon: "🎨", title: "Ikonkészletek", description: "Szerkesztőből exportált ikonok megtisztítása a felesleges metaadatoktól élesítés előtt." },
        { icon: "📦", title: "Inline SVG", description: "Tisztább kód, ha az SVG-t közvetlenül a HTML-be vagy komponensbe ágyazod." },
        { icon: "🔧", title: "Build pipeline", description: "Kézi optimalizálás gyors ellenőrzéshez, build-eszköz beállítása előtt." },
      ],
      aboutSection: {
        title: "Miért érdemes optimalizálni az SVG-t?",
        paragraphs: [
          "Az SVG (Scalable Vector Graphics) egy XML-alapú vektorformátum, amely tetszőleges méretben éles marad, és webre ideális. A grafikus szerkesztők (Inkscape, Illustrator) azonban exportáláskor gyakran rengeteg felesleges adatot tesznek a fájlba: szerkesztői metaadatokat, rejtett réteginformációkat, hosszú namespace-deklarációkat és bőséges whitespace-t.",
          "Ezek az elemek nem befolyásolják a kép megjelenését, viszont feleslegesen növelik a fájlméretet. Az optimalizálás eltávolítja őket, így a fájl kisebb lesz, gyorsabban töltődik, és a kódja is áttekinthetőbb – különösen fontos ez, ha az SVG-t inline módon ágyazod a HTML-be, ahol minden bájt a HTML-súlyt növeli.",
        ],
      },
      tips: [
        { icon: "💡", tip: "A szerkesztőből exportált SVG-knél a legnagyobb a megtakarítás – ezek tele vannak felesleges metaadattal." },
        { icon: "🗜️", tip: "Az optimalizált SVG-t a szerveren gzip/brotli tömörítéssel kombinálva még kisebb lesz az átvitt méret." },
        { icon: "🔒", tip: "A fájl a böngésződben marad – bizalmas, publikálatlan grafikákat is nyugodtan optimalizálhatsz." },
      ],
    },
  },

  // ═══ PNG → SVG VEKTORIZÁLÓ (HU+RO bilingual) ═════════════════════════════
  "png-svg": {
    introText:
      "A PNG → SVG vektorizáló valódi kontúrkövetéssel alakítja át a raszteres képeket (PNG, JPG) skálázható vektorgrafikává. Nem csak beágyazza a képet egy SVG-be, hanem ténylegesen vektor-útvonalakat (path) rajzol az alakzatok köré – így az eredmény tetszőleges méretben éles marad. A színek számát te állítod be. Egyszerű, kontrasztos képeknél (logók, ikonok, sziluettek) a legjobb az eredmény.",
    guide: [
      "1. Húzd be a PNG vagy JPG képet.",
      "2. Állítsd be a színek számát – kevesebb tisztább, több részletesebb eredményt ad.",
      "3. Kattints a «Vektorizálás» gombra, és nézd meg a vektoros előnézetet.",
      "4. Töltsd le a kész SVG fájlt.",
    ],
    faq: [
      { q: "Ez valódi vektorizálás, vagy csak beágyazás?", a: "Valódi vektorizálás: az imagetracerjs könyvtár kontúrkövetéssel tényleges vektor-útvonalakat hoz létre az alakzatokból, nem a raszteres képet ágyazza be. Az eredmény nagyítva is éles marad." },
      { q: "Milyen képekhez ajánlott?", a: "Egyszerű, kontrasztos, kevés színű képekhez: logók, ikonok, emblémák, sziluettek. Fotóknál a vektorizálás kevésbé hasznos, mert a sok árnyalat miatt nagy és bonyolult SVG keletkezne." },
      { q: "Mire jó a színszám beállítás?", a: "Ez határozza meg, hány színre egyszerűsítse az eszköz a képet a vektorizálás előtt. Kevesebb szín tisztább, kisebb SVG-t ad; több szín részletesebbet, de nagyobbat. Logókhoz 8–16 általában ideális." },
      { q: "Szerverre kerül a kép?", a: "Nem, a vektorizálás teljes egészében a böngésződben fut – a kép nem hagyja el a gépedet." },
      { q: "Miért kisebb a feldolgozott kép?", a: "A nagyon nagy képeket az eszköz a vektorizálás előtt lekicsinyíti (max. 1000 px), hogy a feldolgozás gyors maradjon; a kimeneti SVG ettől függetlenül tetszőleges méretre skálázható." },
    ],
    content: {
      howToSteps: [
        { title: "1. Kép feltöltése", description: "Húzd be a PNG vagy JPG képet a feltöltési területre." },
        { title: "2. Színszám beállítása", description: "Válaszd ki, hány színre egyszerűsödjön a kép a vektorizálás előtt." },
        { title: "3. Vektorizálás", description: "Kattints a gombra – az eszköz kontúrkövetéssel SVG-vé alakítja a képet." },
        { title: "4. Előnézet és letöltés", description: "Ellenőrizd a vektoros előnézetet, majd töltsd le az SVG-t." },
      ],
      useCases: [
        { icon: "🎯", title: "Logó-vektorizálás", description: "Egy régi, csak raszteres formátumban meglévő logó újra-vektorizálása skálázható SVG-vé." },
        { icon: "🖨️", title: "Nyomdai előkészítés", description: "Vektoros formátum nagy méretű nyomtatáshoz, ahol a raszteres kép pixeles lenne." },
        { icon: "✏️", title: "Szerkeszthetőség", description: "A vektor-útvonalak szerkesztővel (pl. Inkscape) tovább módosíthatók." },
        { icon: "🎨", title: "Ikonok", description: "Egyszerű ikonok és sziluettek vektorrá alakítása webes és UI használathoz." },
      ],
      formatComparison: {
        title: "Raszter vs. vektor",
        columns: ["Tulajdonság", "Raszter (PNG/JPG)", "Vektor (SVG)"],
        rows: [
          { feature: "Skálázhatóság", values: ["Nagyításnál pixeles", "Bármilyen méretben éles"] },
          { feature: "Tárolás", values: ["Pixelek színe", "Matematikai útvonalak"] },
          { feature: "Ideális tartalom", values: ["Fotók", "Logók, ikonok, ábrák"] },
        ],
      },
      aboutSection: {
        title: "Raszteres és vektoros képek",
        paragraphs: [
          "A raszteres képek (PNG, JPG) pixelek rácsából állnak: minden ponthoz egy szín tartozik. Nagyításkor a pixelek láthatóvá válnak, a kép „pixeles” lesz. A vektorgrafika ezzel szemben matematikai leírással – pontokkal, vonalakkal, görbékkel – tárolja az alakzatokat, így bármilyen méretben tökéletesen éles marad.",
          "A vektorizálás (image tracing) a raszteres kép alakzatait próbálja vektor-útvonalakká alakítani: érzékeli a színhatárokat, és kontúrokat rajzol köréjük. Ez kontrasztos, kevés színű képeknél (logók, ikonok) működik a legjobban; fotóknál a sok árnyalat miatt az eredmény túl bonyolult és nagy lenne, ezért azokhoz a raszteres formátum marad a megfelelő.",
        ],
      },
      tips: [
        { icon: "💡", tip: "A legjobb eredményhez használj tiszta, kontrasztos, egyszínű hátterű forrásképet." },
        { icon: "🎚️", tip: "Ha az eredmény túl részletes vagy nagy, csökkentsd a színek számát; ha túl durva, növeld." },
        { icon: "🔍", tip: "Fotókat ne vektorizálj – azokhoz a PNG/JPG vagy a WebP a megfelelő formátum." },
      ],
    },
  },

  // ═══ FAVICON-CSOMAG GENERÁTOR (HU+RO bilingual) ══════════════════════════
  "favicon-generator": {
    introText:
      "A favicon-csomag generátor egyetlen képből legenerálja a teljes, modern favicon-készletet: a klasszikus favicon.ico fájlt (16/32/48 px), a különböző méretű PNG-ket, az apple-touch-icon ikont, a site.webmanifest fájlt és a HTML kódot, amit be kell illesztened az oldal fejlécébe. Mindezt egy letölthető ZIP-ben. Webfejlesztőknek, akik gyorsan, kézi méretezgetés nélkül szeretnének teljes favicon-támogatást.",
    guide: [
      "1. Tölts fel egy négyzetes képet (ideálisan 512×512 px PNG).",
      "2. Kattints a «Favicon-csomag generálása» gombra.",
      "3. Töltsd le a ZIP-et, és csomagold ki a fájlokat a weboldalad gyökérmappájába.",
      "4. Másold a HTML kódot az oldalad <head> részébe.",
    ],
    faq: [
      { q: "Mit tartalmaz a csomag?", a: "favicon.ico (16/32/48 px egyben), külön PNG-k (16, 32, 48, 192, 512 px), apple-touch-icon (180 px), site.webmanifest és egy head-snippet.html a beillesztendő <link> tagekkel." },
      { q: "Milyen képet töltsek fel?", a: "Egy négyzetes, lehetőleg 512×512 px-es képet a legjobb minőséghez. Az eszköz ebből kicsinyíti le az összes szükséges méretet." },
      { q: "Hová tegyem a fájlokat?", a: "A PNG-ket, az ICO-t és a manifestet általában a weboldal gyökérmappájába; a HTML <link> tageket pedig az oldal <head> részébe kell beilleszteni." },
      { q: "Miért kell ennyi különböző méret?", a: "A böngészők, az operációs rendszerek és a mobil eszközök különböző méretű ikonokat használnak (böngészőfül, könyvjelző, kezdőképernyő). A teljes csomag mindenhol éles ikont biztosít." },
      { q: "Szerverre kerül a kép?", a: "Nem, a teljes generálás a böngésződben történik – a forráskép nem hagyja el a gépedet." },
    ],
    content: {
      howToSteps: [
        { title: "1. Kép feltöltése", description: "Tölts fel egy négyzetes forrásképet, ideálisan 512×512 px méretben." },
        { title: "2. Generálás", description: "Kattints a gombra – az eszköz legenerálja az összes méretet és fájlt." },
        { title: "3. ZIP letöltése", description: "Töltsd le a teljes favicon-csomagot egyetlen ZIP archívumban." },
        { title: "4. Beillesztés", description: "Másold a fájlokat a gyökérmappába, a HTML kódot pedig a <head>-be." },
      ],
      useCases: [
        { icon: "🚀", title: "Új weboldal", description: "Teljes favicon-támogatás beállítása egy projekt indításakor, percek alatt." },
        { icon: "📱", title: "PWA / mobil", description: "A site.webmanifest és a nagy ikonok a kezdőképernyőre mentett webalkalmazáshoz." },
        { icon: "🍎", title: "Apple eszközök", description: "Az apple-touch-icon biztosítja az éles ikont iPhone/iPad könyvjelzőhöz." },
        { icon: "🔖", title: "Márkamegjelenés", description: "Egységes, éles ikon a böngészőfülön és a könyvjelzők között." },
      ],
      aboutSection: {
        title: "Mi az a favicon, és miért kell több méret?",
        paragraphs: [
          "A favicon az a kis ikon, amely a böngészőfülön, a könyvjelzők között és a kezdőképernyőn jelenik meg a weboldalad mellett. Régen elég volt egyetlen favicon.ico fájl, ma azonban a böngészők, az operációs rendszerek és a mobil platformok különböző méretű és formátumú ikonokat várnak el a különféle helyeken.",
          "Ezért készít ez az eszköz egy teljes csomagot: a klasszikus, maximálisan kompatibilis favicon.ico-t (több méret egy fájlban), külön PNG-ket a modern böngészőkhöz, egy nagyobb apple-touch-icon-t az iOS kezdőképernyőhöz, és egy site.webmanifest fájlt, amely a progresszív webalkalmazásokhoz (PWA) szükséges. A mellékelt HTML kóddal mindezt egy lépésben bekötheted.",
        ],
      },
      tips: [
        { icon: "⬛", tip: "Használj négyzetes forrásképet – a nem négyzetes kép torzulhat a kicsinyítésnél." },
        { icon: "🎨", tip: "Az ikon kis méretben is felismerhető legyen: kerüld a sok apró részletet és a vékony vonalakat." },
        { icon: "🔒", tip: "A generálás a böngésződben fut – a forráskép nem kerül szerverre." },
      ],
    },
  },

  // ═══ 1. JPG → WEBP KONVERTÁLÁS ═══════════════════════════════════════════
  "jpg-webp": {
    introText:
      "A JPG-ről WebP-re konvertáló eszközünkkel egyetlen kattintással alakíthatod át JPEG képeidet modern WebP formátumba. A WebP akár 25-35%-kal kisebb fájlméretet eredményez azonos vizuális minőség mellett, ami gyorsabb weboldal-betöltést jelent.",
    guide: [
      "1. Húzd be vagy tallózd ki a konvertálni kívánt JPG fájl(oka)t.",
      "2. Állítsd be a kívánt minőséget (1–100) – az alapértelmezett 80-as érték jó egyensúlyt ad.",
      "3. Kattints a «Konvertálás» gombra – a WebP fájl azonnal elkészül a böngésződben.",
      "4. Töltsd le az elkészült WebP képet, vagy konvertálj további fájlokat.",
    ],
    faq: [
      { q: "Mire jó a JPG→WebP konvertálás?", a: "A WebP formátum jelentősen kisebb fájlméretet eredményez a JPG-hez képest, miközben a képminőség gyakorlatilag azonos marad. Weboldalakon gyorsabb betöltést és kevesebb sávszélesség-felhasználást jelent." },
      { q: "Biztonságos a konvertálás?", a: "Igen, teljes mértékben. A konvertálás kizárólag a böngésződben történik – a képeid egyetlen bájtnyi adata sem kerül szerverre." },
      { q: "Milyen minőséget válasszak?", a: "Webes képekhez a 75–85 közötti érték ideális: szinte észrevehetetlen minőségveszteséggel jelentős méretcsökkenést ér el. Fotóarchívumhoz 90+ ajánlott." },
      { q: "Hány képet konvertálhatok egyszerre?", a: "Nincs korlát – egyszerre akár több tucat képet is feldolgozhatsz, mivel a konvertálás a böngésződben történik." },
      { q: "Mobilon is működik?", a: "Igen, az eszköz teljesen reszponzív és minden modern böngészőben működik, beleértve a mobil eszközöket is." },
      { q: "Minden böngésző támogatja a WebP-t?", a: "Igen, 2024 óta minden modern böngésző (Chrome, Firefox, Safari, Edge) teljes mértékben támogatja a WebP formátumot." },
    ],
    content: {
      howToSteps: [
        { title: "1. JPG fájl kiválasztása", description: "Húzd be a JPG/JPEG képet a feltöltési területre, vagy kattints a tallózás gombra a fájl kiválasztásához." },
        { title: "2. Minőség beállítása", description: "Állítsd be a kívánt WebP minőséget a csúszkával (1–100). Az alacsonyabb érték kisebb fájlt, de gyengébb minőséget ad." },
        { title: "3. Konvertálás és letöltés", description: "Kattints a konvertálás gombra, majd töltsd le az elkészült WebP fájlt. A méretcsökkenés azonnal látható." },
      ],
      useCases: [
        { icon: "🌐", title: "Weboldal optimalizálás", description: "WebP képek használatával akár 30%-kal csökkentheted a weboldal betöltési idejét a JPG-hez képest." },
        { icon: "📱", title: "Mobil alkalmazások", description: "Kisebb képméret kevesebb adatforgalmat és gyorsabb betöltést jelent mobil felhasználóknak." },
        { icon: "📧", title: "E-mail kampányok", description: "Kisebb fájlméretű képekkel gyorsabban töltődnek be a hírlevél-sablonok." },
        { icon: "🛒", title: "Webshop termékképek", description: "Több száz termékkép konvertálásával jelentős tárhelyet és sávszélességet takaríthatsz meg." },
      ],
      aboutSection: {
        title: "A JPG és WebP formátumokról",
        paragraphs: [
          "A JPEG (JPG) az egyik legelterjedtebb képformátum, amelyet 1992-ben szabványosítottak. Veszteséges tömörítést alkalmaz, ami jó egyensúlyt teremt a fájlméret és a képminőség között, de a modern WebP formátum ezen a téren is felülmúlja.",
          "A WebP-t a Google fejlesztette ki 2010-ben, és mára minden nagy böngésző támogatja. Veszteséges és veszteségmentes tömörítést is kínál, valamint támogatja az átlátszóságot (alfa csatornát) és az animációkat is – mindezt kisebb fájlméret mellett.",
          "A JPG→WebP konvertálás különösen weboldalak és alkalmazások képeinél ajánlott, ahol a kisebb fájlméret közvetlen hatással van a betöltési sebességre, a felhasználói élményre és a keresőoptimalizálásra (SEO).",
        ],
      },
      tips: [
        { icon: "💡", tip: "Webes használathoz a 75–85 közötti minőség az ideális – szinte észrevehetetlen különbség a JPG-hez képest, de jelentősen kisebb fájl." },
        { icon: "📊", tip: "Figyeld a konvertálás utáni méretcsökkenést: 25–35% megtakarítás teljesen normális JPG→WebP esetén." },
        { icon: "🖼️", tip: "Fotóknál érdemes magasabb (85+), grafikáknál alacsonyabb (60–75) minőséget választani." },
        { icon: "⚡", tip: "A Google PageSpeed Insights kifejezetten ajánlja a WebP formátum használatát a jobb teljesítménypontszámért." },
      ],
      formatComparison: {
        title: "JPG vs WebP összehasonlítás",
        columns: ["Tulajdonság", "JPG", "WebP"],
        rows: [
          { feature: "Tömörítés típusa", values: ["Veszteséges", "Veszteséges + veszteségmentes"] },
          { feature: "Átlagos fájlméret", values: ["Nagyobb", "25–35%-kal kisebb"] },
          { feature: "Átlátszóság (alfa)", values: ["Nem támogatja", "Támogatja"] },
          { feature: "Animáció", values: ["Nem támogatja", "Támogatja"] },
          { feature: "Böngészőtámogatás", values: ["Univerzális", "Minden modern böngésző"] },
        ],
      },
    },
  },

  // ═══ 2. PNG → WEBP KONVERTÁLÁS ═══════════════════════════════════════════
  "png-webp": {
    introText:
      "Konvertáld PNG képeidet WebP formátumba a kisebb fájlméret érdekében, miközben megőrzöd az átlátszóságot. A WebP a PNG-nél akár 40-60%-kal kisebb fájlméretet eredményez veszteségmentes tömörítés esetén is.",
    guide: [
      "1. Húzd be vagy válaszd ki a konvertálni kívánt PNG fájl(oka)t.",
      "2. Válaszd ki a tömörítés típusát: veszteségmentes (tökéletes minőség) vagy veszteséges (kisebb fájl).",
      "3. Kattints a «Konvertálás» gombra – a WebP azonnal elkészül a böngészőben.",
      "4. Töltsd le az eredményt vagy folytasd további képek konvertálásával.",
    ],
    faq: [
      { q: "Mire jó a PNG→WebP konvertálás?", a: "A WebP formátum a PNG-nél lényegesen kisebb fájlméretet eredményez, miközben megőrzi az átlátszóságot és – veszteségmentes mód esetén – a tökéletes képminőséget." },
      { q: "Biztonságos a konvertálás?", a: "Igen, a feldolgozás teljes egészében a böngésződben történik. Semmilyen adat nem hagyja el a gépedet." },
      { q: "Megmarad az átlátszóság?", a: "Igen, a WebP formátum teljes mértékben támogatja az alfa csatornát, így a PNG átlátszósága megmarad." },
      { q: "Melyik tömörítést válasszam?", a: "Ha pixel-pontos minőség kell (logók, ikonok), válaszd a veszteségmentest. Fotókhoz és webes képekhez a veszteséges mód kisebb fájlméretet ad." },
      { q: "Mobilon is működik?", a: "Igen, az eszköz minden modern böngészőben működik, beleértve a mobil eszközök böngészőit is." },
      { q: "Van fájlméret-korlát?", a: "Nincs szerveres korlát, mivel a konvertálás helyben történik. A feldolgozási sebesség a géped teljesítményétől függ." },
    ],
    content: {
      howToSteps: [
        { title: "1. PNG fájl feltöltése", description: "Húzd be a PNG képet a feltöltési területre, vagy kattints a tallózás gombra." },
        { title: "2. Tömörítési mód kiválasztása", description: "Válassz veszteségmentes (lossless) vagy veszteséges (lossy) konvertálást az igényeidnek megfelelően." },
        { title: "3. Konvertálás és letöltés", description: "Indítsd el a konvertálást, majd töltsd le a kész WebP fájlt. Az átlátszóság automatikusan megmarad." },
      ],
      useCases: [
        { icon: "🎨", title: "Logók és ikonok", description: "Átlátszó hátterű logókat és ikonokat kisebb fájlmérettel tárolhatsz WebP-ben, a minőség romlása nélkül." },
        { icon: "🌐", title: "Weboldal sebesség", description: "A PNG-ről WebP-re váltás drasztikusan csökkenti a képek méretét, gyorsítva az oldalbetöltést." },
        { icon: "🎮", title: "UI elemek", description: "Felhasználói felület elemeit (gombok, háttérgrafika) hatékonyan tömörítheted WebP-be." },
        { icon: "📊", title: "Infografikák", description: "Szöveget és grafikát tartalmazó infografikák WebP-ben jóval kisebb méretűek lesznek." },
      ],
      aboutSection: {
        title: "A PNG és WebP formátumokról",
        paragraphs: [
          "A PNG (Portable Network Graphics) veszteségmentes tömörítésű formátum, amely tökéletes minőségű képeket garantál átlátszóság-támogatással. Hátránya a viszonylag nagy fájlméret, különösen fotók esetén.",
          "A WebP a PNG előnyeit (átlátszóság, veszteségmentes mód) a modern tömörítési algoritmusokkal ötvözi, így azonos minőség mellett akár 40-60%-kal kisebb fájlméretet ér el. A Google fejlesztésének köszönhetően optimálisan illeszkedik a webes ökoszisztémába.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Logók és ikonok esetén válaszd a veszteségmentes módot a tökéletes élek megőrzéséhez." },
        { icon: "🔍", tip: "Fotók esetén a veszteséges mód akár 70%-os méretcsökkenést is hozhat elfogadható minőségveszteség mellett." },
        { icon: "📦", tip: "Ha sok PNG-d van, konvertáld egyszerre mindet – a böngésző párhuzamosan dolgozza fel őket." },
      ],
      formatComparison: {
        title: "PNG vs WebP összehasonlítás",
        columns: ["Tulajdonság", "PNG", "WebP"],
        rows: [
          { feature: "Tömörítés típusa", values: ["Veszteségmentes", "Veszteségmentes + veszteséges"] },
          { feature: "Átlagos fájlméret", values: ["Nagy", "40–60%-kal kisebb"] },
          { feature: "Átlátszóság (alfa)", values: ["Támogatja", "Támogatja"] },
          { feature: "Színmélység", values: ["Akár 48 bit", "Akár 32 bit"] },
          { feature: "Böngészőtámogatás", values: ["Univerzális", "Minden modern böngésző"] },
        ],
      },
    },
  },

  // ═══ 3. JPG → PNG KONVERTÁLÁS ════════════════════════════════════════════
  "jpg-png": {
    introText:
      "Alakítsd át JPG képeidet PNG formátumba, ha veszteségmentes minőségre vagy átlátszó háttérre van szükséged. A konvertálás pillanatok alatt megtörténik a böngésződben, szerverfeltöltés nélkül.",
    guide: [
      "1. Húzd be vagy tallózd ki a JPG/JPEG fájlt.",
      "2. Kattints a «Konvertálás» gombra.",
      "3. Töltsd le az elkészült PNG fájlt – a képminőség tökéletesen megőrződik.",
    ],
    faq: [
      { q: "Mire jó a JPG→PNG konvertálás?", a: "Ha a JPG képet tovább kell szerkesztened, vagy veszteségmentes formátumban szeretnéd megőrizni, a PNG biztosítja, hogy a további mentéseknél ne romoljon a minőség." },
      { q: "Biztonságos a konvertálás?", a: "Igen, minden feldolgozás a böngészőben történik – a képeid nem kerülnek szerverre." },
      { q: "A PNG fájl nagyobb lesz, mint a JPG?", a: "Igen, általában a PNG fájl nagyobb, mivel veszteségmentes tömörítést alkalmaz. A minőség viszont tökéletes marad további szerkesztésnél is." },
      { q: "Kaphatok átlátszó hátteret?", a: "A konvertálás önmagában nem teszi átlátszóvá a hátteret, de a PNG formátum támogatja az átlátszóságot, így utólag szerkesztővel eltávolíthatod a hátteret." },
      { q: "Mobilon is működik?", a: "Igen, az eszköz minden modern mobil és asztali böngészőben használható." },
      { q: "Romlik a minőség a konvertálásnál?", a: "Nem, a JPG→PNG konvertálás veszteségmentes: a JPG eredeti minősége teljes egészében megőrződik (de a JPG tömörítés korábbi minőségvesztése nem vonható vissza)." },
    ],
    content: {
      howToSteps: [
        { title: "1. JPG kép kiválasztása", description: "Húzd be a JPEG/JPG fájlt a feltöltési területre, vagy használd a tallózás gombot." },
        { title: "2. Konvertálás indítása", description: "Kattints a konvertálás gombra – a feldolgozás azonnal megtörténik a böngésződben." },
        { title: "3. PNG letöltése", description: "Töltsd le az elkészült PNG fájlt. A kép minősége változatlan marad." },
      ],
      useCases: [
        { icon: "✏️", title: "Képszerkesztés", description: "A PNG formátum ideális további szerkesztéshez, mivel a mentéseknél nem romlik a minőség." },
        { icon: "🏷️", title: "Logók és grafikák", description: "Ha a JPG-ből logót vagy grafikát szeretnél készíteni, a PNG formátum jobb alapot ad az átlátszóság-kezeléshez." },
        { icon: "🖨️", title: "Nyomtatás", description: "Nyomtatási célra a PNG veszteségmentes formátum jobb minőséget biztosít." },
        { icon: "📋", title: "Dokumentumokba illesztés", description: "Prezentációkba, dokumentumokba illesztve a PNG megőrzi a tiszta éleket és szöveget." },
      ],
      aboutSection: {
        title: "Miért válts JPG-ről PNG-re?",
        paragraphs: [
          "A JPG veszteséges tömörítése minden mentésnél tovább rontja a képminőséget. Ha egy JPG képet többször szerkesztesz és mentesz, a minőségveszteség halmozódik. PNG-re konvertálva megállíthatod ezt a folyamatot.",
          "A PNG formátum veszteségmentes tömörítést használ, így bármennyi mentés és szerkesztés után is megőrzi az eredeti minőséget. Ezen felül támogatja az átlátszóságot (alfa csatorna), ami grafikai munkához elengedhetetlen.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Ha további szerkesztést tervezel, mindig konvertálj előbb PNG-re – így elkerülöd a JPG halmozódó minőségveszteségét." },
        { icon: "⚠️", tip: "A JPG tömörítés korábbi minőségveszteségét a PNG konvertálás nem tudja visszaállítani." },
        { icon: "📁", tip: "Tartsd szem előtt, hogy a PNG fájlok nagyobbak – webes publikáláshoz a WebP jobb választás." },
      ],
      formatComparison: {
        title: "JPG vs PNG összehasonlítás",
        columns: ["Tulajdonság", "JPG", "PNG"],
        rows: [
          { feature: "Tömörítés típusa", values: ["Veszteséges", "Veszteségmentes"] },
          { feature: "Fájlméret", values: ["Kisebb", "Nagyobb"] },
          { feature: "Átlátszóság", values: ["Nem támogatja", "Támogatja"] },
          { feature: "Többszöri mentés", values: ["Minőség romlik", "Minőség megmarad"] },
          { feature: "Legjobb felhasználás", values: ["Fotók weben", "Grafikák, szerkesztés"] },
        ],
      },
    },
  },

  // ═══ 4. PNG → JPG KONVERTÁLÁS ════════════════════════════════════════════
  "png-jpg": {
    introText:
      "Konvertáld PNG képeidet JPG formátumba a kisebb fájlméret érdekében. Ideális, ha fotókat szeretnél megosztani vagy webre feltölteni, ahol az átlátszóságra nincs szükség. A konvertálás a böngésződben történik, villámgyorsan.",
    guide: [
      "1. Húzd be vagy tallózd ki a PNG fájl(oka)t.",
      "2. Állítsd be a kívánt JPG minőséget a csúszkával (1–100).",
      "3. Válaszd ki a háttérszínt az átlátszó területekhez (alapértelmezetten fehér).",
      "4. Kattints a «Konvertálás» gombra, majd töltsd le a JPG fájlt.",
    ],
    faq: [
      { q: "Mire jó a PNG→JPG konvertálás?", a: "Ha a PNG képeid túl nagyok e-mailhez, webre feltöltéshez vagy közösségi médiához, a JPG formátum jelentősen kisebb fájlméretet eredményez." },
      { q: "Biztonságos a konvertálás?", a: "Igen, a konvertálás kizárólag a böngésződben történik. Semmilyen kép nem kerül szerverre." },
      { q: "Mi történik az átlátszó háttérrel?", a: "A JPG nem támogatja az átlátszóságot, ezért az átlátszó területek a választott háttérszínnel (alapértelmezetten fehér) lesznek kitöltve." },
      { q: "Milyen minőséget válasszak?", a: "Webes használathoz 80–90, közösségi médiához 85–95, nyomtatáshoz 95–100 az ajánlott érték." },
      { q: "Mobilon is működik?", a: "Igen, az eszköz minden modern böngészőben és mobileszközön tökéletesen működik." },
      { q: "Konvertálhatok egyszerre több fájlt?", a: "Igen, egyszerre több PNG fájlt is feldolgozhatsz – a konvertálás párhuzamosan történik a böngésződben." },
    ],
    content: {
      howToSteps: [
        { title: "1. PNG fájl kiválasztása", description: "Húzd be a PNG képet a feltöltési területre, vagy kattints a tallózás gombra." },
        { title: "2. Minőség és háttérszín beállítása", description: "Állítsd be a JPG minőségét és válaszd ki az átlátszó területek háttérszínét." },
        { title: "3. Konvertálás", description: "Kattints a konvertálás gombra – a JPG fájl pillanatok alatt elkészül." },
        { title: "4. Letöltés", description: "Töltsd le az elkészült JPG fájlt, vagy folytasd további képek konvertálásával." },
      ],
      useCases: [
        { icon: "📧", title: "E-mail mellékletek", description: "A JPG fájlok sokkal kisebbek, így gyorsabban küldhetők és fogadhatók e-mailben." },
        { icon: "📱", title: "Közösségi média", description: "A legtöbb közösségi platform a JPG-t preferálja a gyorsabb feltöltés és megjelenítés érdekében." },
        { icon: "💾", title: "Tárhelymegtakarítás", description: "Nagy PNG fotógyűjtemények JPG-re konvertálásával jelentős tárhelyet szabadíthatsz fel." },
        { icon: "🌐", title: "Webes feltöltés", description: "Blogokhoz, webshopokhoz a JPG formátum a legszélesebb körben támogatott." },
      ],
      aboutSection: {
        title: "Miért válts PNG-ről JPG-re?",
        paragraphs: [
          "A PNG formátum veszteségmentes tömörítése kiváló minőséget biztosít, de a fájlméret – különösen fotók esetén – többszöröse lehet a JPG-nek. Ha nincs szükséged átlátszóságra, a JPG hatékonyabb választás.",
          "A JPG veszteséges tömörítése kifejezetten fotókra lett optimalizálva: a szem számára szinte észrevehetetlen részleteket hagy el, miközben akár 80%-kal kisebb fájlméretet ér el. Ez gyorsabb feltöltést, kisebb tárhelyigényt és jobb webes teljesítményt jelent.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Fotóknál 85-ös minőség a legjobb kompromisszum a fájlméret és a képminőség között." },
        { icon: "🎨", tip: "Ha az átlátszó hátteret nem fehérre, hanem más színre szeretnéd cserélni, állítsd be a háttérszín-választóval." },
        { icon: "⚠️", tip: "Vékony vonalakat és szöveget tartalmazó grafikáknál a JPG tömörítés műtermékeket okozhat – ilyenkor használj magas minőséget (95+)." },
        { icon: "📊", tip: "A konvertálás előtti és utáni fájlméret összehasonlításából láthatod a megtakarítást." },
      ],
      formatComparison: {
        title: "PNG vs JPG összehasonlítás",
        columns: ["Tulajdonság", "PNG", "JPG"],
        rows: [
          { feature: "Tömörítés típusa", values: ["Veszteségmentes", "Veszteséges"] },
          { feature: "Fájlméret (fotók)", values: ["Nagy", "Kicsi"] },
          { feature: "Átlátszóság", values: ["Támogatja", "Nem támogatja"] },
          { feature: "Legjobb felhasználás", values: ["Grafikák, logók", "Fotók, webes képek"] },
          { feature: "Színek száma", values: ["Akár 16 millió + alfa", "Akár 16 millió"] },
        ],
      },
    },
  },

  // ═══ 5. WEBP → JPG KONVERTÁLÁS ═══════════════════════════════════════════
  "webp-jpg": {
    introText:
      "Konvertáld WebP képeidet JPG formátumba, ha szélesebb kompatibilitásra van szükséged. A JPG formátumot minden eszköz, szoftver és platform támogatja. A konvertálás pillanatok alatt megtörténik, közvetlenül a böngésződben.",
    guide: [
      "1. Húzd be vagy tallózd ki a WebP fájl(oka)t.",
      "2. Állítsd be a JPG minőséget a csúszkával (1–100).",
      "3. Kattints a «Konvertálás» gombra.",
      "4. Töltsd le az elkészült JPG képet.",
    ],
    faq: [
      { q: "Mire jó a WebP→JPG konvertálás?", a: "Ha egy WebP képet szeretnél megnyitni olyan programmal vagy eszközzel, ami nem támogatja a WebP-t, vagy ha JPG formátumra van szükséged feltöltéshez, nyomtatáshoz." },
      { q: "Biztonságos a konvertálás?", a: "Igen, a teljes folyamat a böngésződben zajlik. Semmilyen kép nem kerül szerverre vagy harmadik félhez." },
      { q: "Nőni fog a fájlméret?", a: "A JPG formátum hatékonyan tömöríti a fotókat, így a fájlméret-növekedés általában minimális, különösen 80-85-ös minőség mellett." },
      { q: "Mi történik az átlátszó részekkel?", a: "A JPG nem támogatja az átlátszóságot – az átlátszó területek fehér háttérszínnel lesznek kitöltve." },
      { q: "Mobilon is működik?", a: "Igen, az eszköz minden modern böngészőben elérhető mobilon és asztali gépen egyaránt." },
      { q: "Hány képet konvertálhatok?", a: "Nincs korlát, mivel a feldolgozás a böngésződben történik. Több képet is konvertálhatsz egymás után vagy egyszerre." },
    ],
    content: {
      howToSteps: [
        { title: "1. WebP fájl kiválasztása", description: "Húzd be a WebP képet a feltöltési területre, vagy kattints a tallózás gombra." },
        { title: "2. JPG minőség beállítása", description: "Válaszd ki a kívánt tömörítési szintet – magasabb érték jobb minőséget, de nagyobb fájlt jelent." },
        { title: "3. Konvertálás és letöltés", description: "Indítsd el a konvertálást, majd töltsd le a kész JPG fájlt." },
      ],
      useCases: [
        { icon: "🖨️", title: "Nyomtatás", description: "Nyomtatóműhelyek és nyomtatási szolgáltatások többsége JPG vagy PDF formátumot fogad el." },
        { icon: "📂", title: "Szoftver kompatibilitás", description: "Régebbi képszerkesztők és programok nem mindig támogatják a WebP-t – JPG-vel biztosra mehetsz." },
        { icon: "📤", title: "Feltöltés platformokra", description: "Egyes platformok, űrlapok és rendszerek még nem fogadják el a WebP formátumot." },
        { icon: "🤝", title: "Megosztás", description: "A JPG az univerzálisan elfogadott képformátum, amit mindenki meg tud nyitni." },
      ],
      aboutSection: {
        title: "Miért válts WebP-ről JPG-re?",
        paragraphs: [
          "Bár a WebP kiváló modern formátum, a kompatibilitás nem mindig garantált. Régebbi operációs rendszerek, képszerkesztők, nyomtatási szoftverek és egyes online platformok nem támogatják a WebP-t.",
          "A JPG az elmúlt több mint 30 évben a világ legelterjedtebb képformátumává vált. Gyakorlatilag minden eszköz, szoftver és platform kezeli – a konvertálás tehát biztosítja a maximális kompatibilitást.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Ha csak kompatibilitás miatt konvertálsz, használj 90+ minőséget a lehető legjobb képminőség megőrzéséhez." },
        { icon: "⚠️", tip: "Ha a WebP képben átlátszóság van, fontold meg a PNG-re konvertálást a JPG helyett." },
        { icon: "📊", tip: "Nyomtatáshoz mindig 95-100-as minőséget használj." },
      ],
      formatComparison: {
        title: "WebP vs JPG összehasonlítás",
        columns: ["Tulajdonság", "WebP", "JPG"],
        rows: [
          { feature: "Tömörítési hatékonyság", values: ["Kiváló", "Jó"] },
          { feature: "Kompatibilitás", values: ["Modern böngészők", "Univerzális"] },
          { feature: "Átlátszóság", values: ["Támogatja", "Nem támogatja"] },
          { feature: "Szerkesztő támogatás", values: ["Korlátozott", "Szinte minden szoftver"] },
          { feature: "Nyomtatási támogatás", values: ["Korlátozott", "Teljes"] },
        ],
      },
    },
  },

  // ═══ 6. WEBP → PNG KONVERTÁLÁS ═══════════════════════════════════════════
  "webp-png": {
    introText:
      "Konvertáld WebP képeidet PNG formátumba az átlátszóság megőrzésével és a veszteségmentes minőséggel. A PNG formátumot szinte minden képszerkesztő és platform támogatja, így biztosíthatod a kompatibilitást.",
    guide: [
      "1. Húzd be vagy tallózd ki a WebP fájl(oka)t.",
      "2. Kattints a «Konvertálás» gombra.",
      "3. Az átlátszóság automatikusan megőrződik a PNG-ben.",
      "4. Töltsd le az elkészült PNG fájlt.",
    ],
    faq: [
      { q: "Mire jó a WebP→PNG konvertálás?", a: "Ha a WebP képet átlátszó háttérrel szeretnéd felhasználni olyan szoftverben, ami nem kezeli a WebP-t, vagy ha veszteségmentes formátumra van szükséged szerkesztéshez." },
      { q: "Biztonságos a konvertálás?", a: "Igen, minden feldolgozás a böngésződben történik – a képeid nem kerülnek szerverre." },
      { q: "Megmarad az átlátszóság?", a: "Igen, a PNG formátum teljes mértékben támogatja az alfa csatornát, így a WebP átlátszósága tökéletesen megőrződik." },
      { q: "A PNG fájl nagyobb lesz?", a: "Igen, a PNG veszteségmentes tömörítése nagyobb fájlméretet eredményez, mint a WebP. Ez az ára a maximális kompatibilitásnak és minőségnek." },
      { q: "Mobilon is működik?", a: "Igen, az eszköz teljesen reszponzív és minden modern böngészőben elérhető." },
      { q: "Lehet egyszerre több képet konvertálni?", a: "Igen, egyszerre több WebP fájlt is feldolgozhatsz – a konvertálás párhuzamosan történik." },
    ],
    content: {
      howToSteps: [
        { title: "1. WebP fájl feltöltése", description: "Húzd be a WebP képet a feltöltési területre, vagy használd a fájlválasztó gombot." },
        { title: "2. Konvertálás indítása", description: "Kattints a konvertálás gombra – a PNG azonnal elkészül a böngészőben." },
        { title: "3. PNG letöltése", description: "Töltsd le a kész PNG fájlt – az átlátszóság és a minőség tökéletesen megőrződik." },
      ],
      useCases: [
        { icon: "✏️", title: "Képszerkesztés", description: "A PNG-t minden képszerkesztő támogatja (Photoshop, GIMP, Canva), így könnyedén dolgozhatod fel tovább a képet." },
        { icon: "🎨", title: "Grafikai munka", description: "Átlátszó hátterű elemeket (logók, ikonok) PNG-ben minden grafikai szoftver kezel." },
        { icon: "📱", title: "Alkalmazás-fejlesztés", description: "Mobil és asztali alkalmazásokhoz a PNG formátum szélesebb támogatottsággal bír." },
        { icon: "🖨️", title: "Nyomtatás", description: "Veszteségmentes PNG formátumban biztosíthatod a nyomtatási minőséget." },
      ],
      aboutSection: {
        title: "Miért válts WebP-ről PNG-re?",
        paragraphs: [
          "A WebP modern formátum, de sok képszerkesztő, grafikai szoftver és régebbi rendszer nem támogatja. A PNG konvertálás biztosítja a széles körű kompatibilitást, miközben megőrzi a veszteségmentes minőséget és az átlátszóságot.",
          "A PNG különösen ideális, ha a képet tovább szeretnéd szerkeszteni: a veszteségmentes tömörítésnek köszönhetően bármennyi mentés és módosítás után is megőrzi az eredeti minőséget.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Ha az átlátszóságra nincs szükséged és a fájlméret fontos, fontold meg a JPG-re konvertálást a PNG helyett." },
        { icon: "🎨", tip: "A PNG ideális grafikai elemekhez, logókhoz és ikonokhoz, ahol az éles élek fontosak." },
        { icon: "📁", tip: "A PNG fájlok nagyobbak a WebP-nél – nagy mennyiségű kép esetén gondolj a tárhelyigényre." },
      ],
      formatComparison: {
        title: "WebP vs PNG összehasonlítás",
        columns: ["Tulajdonság", "WebP", "PNG"],
        rows: [
          { feature: "Tömörítés", values: ["Veszteséges + veszteségmentes", "Veszteségmentes"] },
          { feature: "Fájlméret", values: ["Kisebb", "Nagyobb"] },
          { feature: "Átlátszóság", values: ["Támogatja", "Támogatja"] },
          { feature: "Szerkesztő támogatás", values: ["Korlátozott", "Univerzális"] },
          { feature: "Animáció", values: ["Támogatja", "Nem (APNG korlátozott)"] },
        ],
      },
    },
  },

  // ═══ 7. KÉP ÁTMÉRETEZÉS ══════════════════════════════════════════════════
  "atmeretezes": {
    introText:
      "Méretezd át képeidet pixel-pontosan a kívánt szélességre és magasságra. Támogatja a képarány megtartását, az egyedi méretek beállítását és a százalékos átméretezést is. Minden feldolgozás a böngésződben történik.",
    guide: [
      "1. Húzd be vagy válaszd ki az átméretezni kívánt képet (JPG, PNG, WebP).",
      "2. Add meg a kívánt szélességet és magasságot pixelben, vagy válassz egy előre beállított méretet.",
      "3. Döntsd el, hogy megtartod-e a képarányt (ajánlott).",
      "4. Kattints az «Átméretezés» gombra, majd töltsd le az eredményt.",
    ],
    faq: [
      { q: "Mire jó ez az eszköz?", a: "Képek szélességének és magasságának megváltoztatására szolgál: közösségi média profilképek, weboldal-képek vagy nyomtatási méretek beállítására egyaránt alkalmas." },
      { q: "Biztonságos az adataim szempontjából?", a: "Igen, a képfeldolgozás teljes egészében a böngésződben történik – semmilyen kép nem kerül szerverre." },
      { q: "Milyen formátumokat támogat?", a: "JPG, PNG és WebP formátumú képeket tudsz átméretezni. A kimeneti formátum megegyezik a bemenetivel." },
      { q: "Romlik a minőség átméretezésnél?", a: "Kicsinyítésnél minimális a minőségveszteség. Nagyításnál a kép elmosódhat – nagyobb képet nem lehet kisebből veszteségmentesen előállítani." },
      { q: "Mobilon is működik?", a: "Igen, az eszköz teljesen reszponzív és minden modern böngészőben elérhető, beleértve a mobil eszközöket." },
      { q: "Megtarthatom a képarányt?", a: "Igen, alapértelmezetten a képarány zárolva van: az egyik oldal megadásakor a másik automatikusan kiszámolódik, hogy ne torzuljon a kép." },
    ],
    content: {
      howToSteps: [
        { title: "1. Kép feltöltése", description: "Húzd be a képet a feltöltési területre, vagy kattints a tallózás gombra a fájl kiválasztásához." },
        { title: "2. Méret megadása", description: "Add meg a kívánt szélességet és magasságot pixelben. Kapcsold be a képarány-zárolást, ha nem szeretnéd, hogy a kép torzuljon." },
        { title: "3. Átméretezés", description: "Kattints az átméretezés gombra – az eredmény azonnal megjelenik az előnézetben." },
        { title: "4. Letöltés", description: "Töltsd le az átméretezett képet az eredeti formátumban." },
      ],
      useCases: [
        { icon: "📱", title: "Közösségi média", description: "Készítsd el a tökéletes méretű profilképet, borítóképet vagy posztot bármely platformhoz (Facebook, Instagram, LinkedIn)." },
        { icon: "🌐", title: "Weboldal képek", description: "Optimalizáld a képek méretét a gyorsabb betöltés érdekében – ne tölts be 4000px-es képet egy 800px-es helyre." },
        { icon: "📧", title: "E-mail mellékletek", description: "Csökkentsd a kép méretét, hogy az e-mail melléklet ne haladja meg a méretkorlátot." },
        { icon: "🖨️", title: "Nyomtatás", description: "Állítsd be a kép pixelméretét a kívánt nyomtatási méretnek és felbontásnak megfelelően." },
      ],
      aboutSection: {
        title: "A képátméretezésről",
        paragraphs: [
          "A képátméretezés a kép pixelszámának megváltoztatását jelenti. Kicsinyítésnél a felesleges pixelek eltávolításra kerülnek, nagyításnál pedig új pixelek interpolálódnak a meglévőkből. Az átméretezés hatással van a fájlméretre és a megjelenítési minőségre is.",
          "A képarány (aspect ratio) a szélesség és magasság aránya. Ha az átméretezésnél nem tartjuk meg az eredeti képarányt, a kép torzulni fog – ezért érdemes mindig bekapcsolva hagyni a képarány-zárolást.",
          "A modern böngészők kiváló minőségű interpolációs algoritmusokat használnak, így a böngészőalapú átméretezés is professzionális eredményt ad.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Mindig tartsd meg a képarányt, hacsak nem szándékosan szeretnéd torzítani a képet." },
        { icon: "📏", tip: "Közösségi média méretek: Facebook borító 820×312, Instagram poszt 1080×1080, LinkedIn banner 1584×396." },
        { icon: "⚠️", tip: "Kis képet nagyra méretezni minőségveszteséggel jár – lehetőleg mindig a nagyobb eredetiből kicsinyíts." },
        { icon: "🔢", tip: "Százalékos átméretezéssel arányosan csökkentheted vagy növelheted a képet az eredeti mérethez képest." },
      ],
    },
  },

  // ═══ 8. KÉPTÖMÖRÍTÉS ═════════════════════════════════════════════════════
  "tomorites": {
    introText:
      "Tömörítsd képeidet a lehető legkisebb fájlméretre a minőség elfogadható megőrzése mellett. Az eszköz JPG, PNG és WebP formátumokat is kezel, és a tömörítés teljes egészében a böngésződben történik.",
    guide: [
      "1. Húzd be vagy válaszd ki a tömöríteni kívánt képeket.",
      "2. Állítsd be a tömörítési szintet a csúszkával (alacsonyabb = kisebb fájl).",
      "3. Kattints a «Tömörítés» gombra – az előnézet és a méretcsökkenés azonnal megjelenik.",
      "4. Töltsd le a tömörített képet, vagy dolgozz tovább a következő fájlon.",
    ],
    faq: [
      { q: "Mire jó a képtömörítés?", a: "A képtömörítés csökkenti a fájlméretet, ami gyorsabb weboldalakat, kisebb e-mail mellékleteket és kevesebb tárhelyigényt eredményez." },
      { q: "Biztonságos az adataim szempontjából?", a: "Igen, a tömörítés kizárólag a böngésződben történik – a képeid nem kerülnek szerverre." },
      { q: "Mekkora méretcsökkenést érhetek el?", a: "A tömörítési szinttől és a kép típusától függően 30–80% méretcsökkenés érhető el. Fotóknál jellemzően 40–60%." },
      { q: "Láthatóan romlik a minőség?", a: "Közepes tömörítésnél (60–80-as minőség) a különbség szabad szemmel szinte észrevehetetlen. Erős tömörítésnél (30 alatt) látható műtermékek jelenhetnek meg." },
      { q: "Mobilon is működik?", a: "Igen, az eszköz minden modern böngészőben használható mobilon és asztali gépen egyaránt." },
      { q: "Milyen formátumokat támogat?", a: "JPG, PNG és WebP formátumú képeket tudsz tömöríteni. A kimeneti formátum megegyezik a bemenetivel." },
    ],
    content: {
      howToSteps: [
        { title: "1. Kép kiválasztása", description: "Húzd be a tömöríteni kívánt képet, vagy használd a tallózás gombot. JPG, PNG és WebP egyaránt támogatott." },
        { title: "2. Tömörítési szint beállítása", description: "Mozgasd a csúszkát a kívánt minőség–méret egyensúly eléréséhez. Az előnézet azonnal frissül." },
        { title: "3. Tömörítés és letöltés", description: "Kattints a tömörítés gombra, ellenőrizd az eredményt az előnézetben, majd töltsd le a fájlt." },
      ],
      useCases: [
        { icon: "🌐", title: "Weboldal gyorsítás", description: "A tömörített képek gyorsabb oldalbetöltést és jobb Google PageSpeed pontszámot eredményeznek." },
        { icon: "📧", title: "E-mail mellékletek", description: "Csökkentsd a képméretet, hogy az e-mail ne haladja meg a szolgáltató méretkorlátját (általában 25 MB)." },
        { icon: "💾", title: "Tárhelymegtakarítás", description: "Felhőalapú tárhelyeken (Google Drive, OneDrive) a tömörített képek kevesebb helyet foglalnak." },
        { icon: "📱", title: "Mobilos tartalomkezelés", description: "Kisebb képek gyorsabban töltődnek mobilhálózaton, javítva a felhasználói élményt." },
      ],
      aboutSection: {
        title: "A képtömörítésről",
        paragraphs: [
          "A képtömörítés a fájlméret csökkentésének művészete: a cél a lehető legkisebb fájl, miközben a vizuális minőség elfogadható marad. A tömörítés két fő típusa a veszteséges (lossy) és a veszteségmentes (lossless).",
          "A veszteséges tömörítés eltávolítja az emberi szem számára kevésbé észrevehető részleteket, ezzel jelentős méretcsökkenést ér el. A veszteségmentes tömörítés matematikai módszerekkel tömöríti az adatokat minőségveszteség nélkül, de a méretcsökkenés kisebb.",
          "A modern tömörítő algoritmusok rendkívül hatékonyan működnek: egy tipikus fotó mérete 50–70%-kal csökkenthető anélkül, hogy szabad szemmel észrevehető különbség lenne.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Webes képekhez a 70–80-as minőség a legjobb kompromisszum: szinte észrevehetetlen különbség, de jelentős méretcsökkenés." },
        { icon: "🔍", tip: "Használd az előnézetet a tömörítés utáni minőség ellenőrzéséhez – nagyítsd ki a részleteket." },
        { icon: "📊", tip: "Fotóknál a JPG formátum hatékonyabban tömöríthető, mint a PNG. Fontold meg a formátumváltást is." },
        { icon: "⚡", tip: "Webshopokhoz tömörítsd a termékképeket 80-as minőségre – a vásárlók nem veszik észre a különbséget, de az oldal jóval gyorsabb lesz." },
      ],
    },
  },

  // ═══ 9. KÉP MINŐSÉG ÁLLÍTÁSA ═════════════════════════════════════════════
  "minoseg-allitas": {
    introText:
      "Állítsd be képeid tömörítési minőségét finoman szabályozva a minőség és a fájlméret közötti egyensúlyt. Valós idejű előnézettel láthatod az eredményt, mielőtt letöltenéd. Minden feldolgozás a böngésződben történik.",
    guide: [
      "1. Töltsd fel a képet (JPG, PNG vagy WebP).",
      "2. Állítsd be a minőségi szintet a csúszkával (1–100).",
      "3. Figyeld az előnézetben a minőségváltozást és a fájlméret alakulását valós időben.",
      "4. Ha elégedett vagy, töltsd le az eredményt.",
    ],
    faq: [
      { q: "Mire jó a minőségállítás?", a: "Lehetővé teszi, hogy pontosan beállítsd a képminőség és fájlméret közötti kompromisszumot – finomabb kontrollt ad, mint az egyszerű tömörítés." },
      { q: "Biztonságos az adataim szempontjából?", a: "Igen, a feldolgozás kizárólag a böngésződben történik, semmilyen adat nem hagyja el a gépedet." },
      { q: "Mi a különbség a tömörítés és a minőségállítás között?", a: "A minőségállítás finomabb kontrollt ad: valós idejű előnézettel látod a különbséget, és pontosan te döntöd el, melyik minőségi szint a megfelelő." },
      { q: "Melyik minőségi érték az ideális?", a: "90–100: archívum, nyomtatás. 75–89: webes felhasználás. 50–74: előnézeti képek. 50 alatt: vázlatok, bélyegképek." },
      { q: "Mobilon is használhatom?", a: "Igen, az eszköz minden modern böngészőben és mobileszközön tökéletesen működik." },
      { q: "Támogatja a PNG-t is?", a: "Igen, JPG, PNG és WebP formátumú képek minőségét egyaránt beállíthatod." },
    ],
    content: {
      howToSteps: [
        { title: "1. Kép feltöltése", description: "Húzd be a képet a feltöltési területre, vagy kattints a tallózás gombra. JPG, PNG és WebP támogatott." },
        { title: "2. Minőség beállítása", description: "Használd a csúszkát a kívánt minőségi szint megadásához. A valós idejű előnézet azonnal mutatja az eredményt." },
        { title: "3. Összehasonlítás", description: "Hasonlítsd össze az eredeti és a módosított képet az előnézetben, és ellenőrizd a fájlméret csökkenését." },
        { title: "4. Letöltés", description: "Ha elégedett vagy az eredménnyel, töltsd le a képet a kívánt minőségben." },
      ],
      useCases: [
        { icon: "🎯", title: "Precíz optimalizálás", description: "Webfejlesztők számára, akik pontosan akarják kontrollálni a képminőséget és a fájlméretet." },
        { icon: "📸", title: "Fotó exportálás", description: "Fotósok számára, akik különböző célokra (web, nyomtatás, közösségi média) eltérő minőségű képeket készítenek." },
        { icon: "🔬", title: "Minőség-összehasonlítás", description: "Vizuálisan összehasonlíthatod a különböző minőségi szintek eredményét, mielőtt döntenél." },
        { icon: "📊", title: "Tömeges optimalizálás előkészítése", description: "Kísérletezz különböző beállításokkal, mielőtt nagy mennyiségű képet dolgoznál fel." },
      ],
      aboutSection: {
        title: "A képminőségről és a tömörítésről",
        paragraphs: [
          "A digitális képek minőségét a tömörítési szint határozza meg. A minőségi skála 1-től 100-ig terjed, ahol 100 a legjobb minőség (legnagyobb fájl) és 1 a legerősebb tömörítés (legkisebb fájl). A legtöbb felhasználási célra a 70–85 közötti tartomány ideális.",
          "A minőségveszteség nem lineáris: 100-ról 80-ra csökkentve a fájlméret akár 60%-kal is csökkenhet, miközben a vizuális különbség alig észlelhető. 80-ról 50-re csökkentve viszont a minőségromlás már egyre szembetűnőbb lesz.",
        ],
      },
      tips: [
        { icon: "💡", tip: "A 75–85 közötti tartomány a legtöbb webes felhasználáshoz ideális egyensúlyt ad." },
        { icon: "🔍", tip: "Nagyítsd ki a képet az előnézetben, hogy a finom részleteket is megvizsgálhasd a tömörítés után." },
        { icon: "📊", tip: "Figyeld a fájlméret változását: a legnagyobb megtakarítás a 100→80 tartományban van, minimális vizuális különbséggel." },
      ],
    },
  },

  // ═══ 10. KÉPFELBONTÁS KISZÁMOLÁSA ═════════════════════════════════════════
  "felbontas-kiszamolo": {
    introText:
      "Számold ki a kép felbontását (DPI/PPI) a pixelméret és a nyomtatási méret alapján, vagy fordítva: tudd meg, mekkora lesz a nyomtatott kép adott felbontás mellett. Tervezők és nyomdai szakemberek nélkülözhetetlen eszköze.",
    guide: [
      "1. Add meg a kép szélességét és magasságát pixelben, vagy tölts fel egy képet az automatikus kiolvasáshoz.",
      "2. Add meg a kívánt nyomtatási méretet (cm vagy inch) vagy a cél DPI-t.",
      "3. A kalkulátor azonnal kiszámolja a hiányzó értéket (DPI, pixelméret vagy nyomtatási méret).",
    ],
    faq: [
      { q: "Mire jó ez az eszköz?", a: "Kiszámolja, hogy egy adott pixelméretű kép milyen felbontásban nyomtatható ki, vagy mekkora pixelméret szükséges egy adott méretű és felbontású nyomathoz." },
      { q: "Biztonságos a feltöltött kép?", a: "Igen, a kép adatait kizárólag a böngésző olvassa ki – nem kerül szerverre. A képet a kalkulátor csak a pixelméret megállapítására használja." },
      { q: "Mi az a DPI?", a: "A DPI (Dots Per Inch) a nyomtatási felbontás mértékegysége: megmutatja, hány képpont kerül egy hüvelyk (2,54 cm) hosszú szakaszra. Nyomtatáshoz 300 DPI az ajánlott." },
      { q: "Milyen DPI kell nyomtatáshoz?", a: "Professzionális nyomtatáshoz 300 DPI, otthoni nyomtatáshoz 150–200 DPI, nagy plakátokhoz (távolról nézik) 72–150 DPI elegendő." },
      { q: "Mobilon is használhatom?", a: "Igen, a kalkulátor bármely modern böngészőben és mobileszközön elérhető." },
      { q: "Mi a különbség a DPI és a PPI között?", a: "A PPI (Pixels Per Inch) a képernyő felbontását, a DPI a nyomtatási felbontást jelöli. A gyakorlatban gyakran szinonimaként használják őket." },
    ],
    content: {
      howToSteps: [
        { title: "1. Pixelméret megadása", description: "Add meg a kép szélességét és magasságát pixelben, vagy tölts fel egy képet az automatikus kiolvasáshoz." },
        { title: "2. Nyomtatási paraméterek", description: "Add meg a kívánt nyomtatási méretet (cm vagy inch) vagy a cél DPI/PPI értéket." },
        { title: "3. Eredmény kiolvasása", description: "A kalkulátor azonnal megmutatja a kiszámolt értéket: DPI-t, pixelméretet vagy nyomtatási méretet." },
      ],
      useCases: [
        { icon: "🖨️", title: "Nyomtatás-előkészítés", description: "Ellenőrizd, hogy a képed elegendő felbontással rendelkezik-e a kívánt nyomtatási mérethez." },
        { icon: "📐", title: "Grafikai tervezés", description: "Számold ki a szükséges pixelméretet plakátokhoz, szórólapokhoz, névjegykártyákhoz." },
        { icon: "📸", title: "Fotónyomtatás", description: "Tudd meg, mekkora méretben nyomtathatod ki a fotóidat 300 DPI-s minőségben." },
        { icon: "🖼️", title: "Vászonnyomat tervezés", description: "Vászonnyomathoz kiszámolhatod a szükséges képfelbontást a kívánt méretben." },
      ],
      aboutSection: {
        title: "A képfelbontásról",
        paragraphs: [
          "A képfelbontás a kép részletességét határozza meg. Digitális képeknél a pixelméret (pl. 3000×2000 pixel) adja meg a felbontást, nyomtatáskor pedig a DPI (Dots Per Inch) mutatja, milyen sűrűn helyezkednek el a képpontok.",
          "A nyomtatási minőség a pixelméret és a fizikai méret együttes függvénye: egy 3000×2000 pixeles kép 300 DPI-vel 25,4×16,9 cm-es nyomatot ad kiváló minőségben, de 72 DPI-vel ugyanez a kép 105,8×70,6 cm-es, ám gyengébb minőségű nyomatot eredményez.",
          "Az összefüggés egyszerű: Nyomtatási méret (inch) = Pixelméret / DPI. Ebből bármelyik érték kiszámolható, ha a másik kettőt ismerjük.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Professzionális nyomtatáshoz mindig 300 DPI-t célozz meg. Otthoni nyomtatáshoz 150-200 DPI is elegendő." },
        { icon: "📏", tip: "Nagy plakátoknál (amelyeket távolról néznek) 72-150 DPI is elfogadható minőséget ad." },
        { icon: "🔢", tip: "Képlet: DPI = Pixelméret / Nyomtatási méret (inch). 1 inch = 2,54 cm." },
      ],
    },
  },

  // ═══ 11. KÉP KIVÁGÁSA ════════════════════════════════════════════════════
  "levagas": {
    introText:
      "Vágd ki a kép kívánt részletét egyedi méretben vagy előre beállított képarányban. Ideális közösségi média képekhez, profilképekhez és bármilyen kivágáshoz. A szerkesztés a böngésződben történik, szerverfeltöltés nélkül.",
    guide: [
      "1. Töltsd fel a képet (JPG, PNG vagy WebP).",
      "2. Jelöld ki a kivágni kívánt területet az egérrel, vagy válassz előre beállított képarányt.",
      "3. Finomítsd a kijelölést húzással és méretezéssel.",
      "4. Kattints a «Kivágás» gombra, majd töltsd le az eredményt.",
    ],
    faq: [
      { q: "Mire jó a képkivágás?", a: "A kép egy részletét emelheted ki, eltávolíthatod a felesleges széleket, vagy a kívánt képarányra vághatod a képet (pl. négyzet alakú Instagram-poszthoz)." },
      { q: "Biztonságos az adataim szempontjából?", a: "Igen, a képszerkesztés kizárólag a böngésződben történik – semmilyen adat nem kerül szerverre." },
      { q: "Milyen képarányokat választhatok?", a: "Szabad kivágás mellett előre beállított arányok is elérhetők: 1:1 (négyzet), 16:9 (szélesvásznú), 4:3, 3:2 és egyéni arány." },
      { q: "Mekkora lesz a kivágott kép?", a: "A kivágott kép pixelmérete a kijelölt terület méretétől függ. Az eszköz mutatja a kivágás aktuális méretét pixelben." },
      { q: "Mobilon is működik?", a: "Igen, az eszköz érintőképernyőn is használható, és minden modern böngészőben elérhető." },
      { q: "Milyen formátumban kapom meg a kivágott képet?", a: "A kivágott kép az eredeti formátumban (JPG, PNG vagy WebP) tölthető le, megőrizve az eredeti minőséget." },
    ],
    content: {
      howToSteps: [
        { title: "1. Kép feltöltése", description: "Húzd be a képet, vagy kattints a tallózás gombra. JPG, PNG és WebP formátumok támogatottak." },
        { title: "2. Kivágási terület kijelölése", description: "Húzd az egérrel a kívánt kivágási területet, vagy válassz előre beállított képarányt a legördülőből." },
        { title: "3. Kijelölés finomítása", description: "Mozgasd és méretezd a kijelölő keretet a pontos pozíció beállításához." },
        { title: "4. Kivágás és letöltés", description: "Kattints a kivágás gombra, majd töltsd le az eredményt az eredeti formátumban." },
      ],
      useCases: [
        { icon: "📱", title: "Közösségi média", description: "Vágd négyzet alakúra az Instagram-posztot, 16:9-re a YouTube-bélyegképet, vagy más platformnak megfelelő arányra." },
        { icon: "👤", title: "Profilképek", description: "Vágd ki a megfelelő részt a fotóból, hogy tökéletes profilképet kapj." },
        { icon: "🛒", title: "Termékfotók", description: "Egységes méretű és arányú termékképeket készíthetsz a webshopodhoz." },
        { icon: "🎨", title: "Grafikai munka", description: "Vágd ki a szükséges részletet egy nagyobb képből prezentációhoz, bannerhez vagy bármilyen vizuális anyaghoz." },
      ],
      aboutSection: {
        title: "A képkivágásról",
        paragraphs: [
          "A képkivágás (crop) az egyik leggyakrabban használt képszerkesztési művelet: eltávolítja a kép felesleges részeit, kiemelve a lényeges tartalmat. A kompozíció javításától a közösségi média méretek beállításáig számos célra használható.",
          "A kivágás nem jár minőségveszteséggel: a kijelölt terület pixelei változatlanul megmaradnak. A kivágott kép felbontása a kijelölt terület méretétől függ – minél nagyobb területet vágsz ki, annál nagyobb felbontású lesz az eredmény.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Használd az előre beállított képarányokat a közösségi média platformok pontos méreteihez." },
        { icon: "📐", tip: "A harmadolás szabálya: helyezd a kép fő elemeit a harmadoló vonalak metszéspontjaira a jobb kompozícióért." },
        { icon: "🔍", tip: "Nagyítsd ki a képet a kivágás előtt, hogy pontosabban tudd pozícionálni a kijelölést." },
        { icon: "📱", tip: "Érintőképernyőn csípőmozdulattal (pinch) nagyíthatsz és a kijelölést az ujjaddal mozgathatod." },
      ],
    },
  },

  // ═══ 12. KÉP FORGATÁSA ═══════════════════════════════════════════════════
  "forgatas": {
    introText:
      "Forgasd el képeidet tetszőleges szögben vagy pontosan 90°-os lépésekben. Szabad szögű forgatással bármilyen dőlésszöget beállíthatsz, a háttérszín szabadon választható. A feldolgozás teljes egészében a böngésződben történik.",
    guide: [
      "1. Töltsd fel a forgatni kívánt képet (JPG, PNG vagy WebP).",
      "2. Állítsd be a forgatás szögét a csúszkával, vagy adj meg pontos értéket.",
      "3. Válaszd ki a háttérszínt a szabad szögű forgatásnál keletkező üres területekhez.",
      "4. Kattints a «Forgatás» gombra, majd töltsd le az eredményt.",
    ],
    faq: [
      { q: "Mire jó a képforgatás?", a: "Elforgatott, ferde fotók kiegyenesítésére, kreatív kompozíciók készítésére, vagy egyszerűen a kép tájolásának megváltoztatására szolgál." },
      { q: "Biztonságos a feldolgozás?", a: "Igen, a forgatás kizárólag a böngésződben történik – a kép nem kerül szerverre." },
      { q: "Milyen szögben forgathatom a képet?", a: "0° és 360° között bármilyen szögben, akár tizedes pontossággal is. A 90°, 180° és 270°-os forgatás veszteségmentes." },
      { q: "Mi történik a sarkoknál szabad szögű forgatásnál?", a: "A forgatásnál keletkező üres területeket a választott háttérszín tölti ki. PNG esetén átlátszó háttér is választható." },
      { q: "Mobilon is működik?", a: "Igen, az eszköz minden modern böngészőben és mobileszközön tökéletesen használható." },
      { q: "Megváltozik a kép mérete forgatásnál?", a: "90°-os forgatásnál a szélesség és magasság felcserélődik. Szabad szögű forgatásnál a kép mérete nőhet, hogy a teljes elforgatott tartalom beleférjen." },
    ],
    content: {
      howToSteps: [
        { title: "1. Kép feltöltése", description: "Húzd be a képet a feltöltési területre, vagy kattints a tallózás gombra." },
        { title: "2. Forgatási szög beállítása", description: "Használd a csúszkát vagy add meg a pontos szöget. Az előnézet valós időben frissül." },
        { title: "3. Forgatás és letöltés", description: "Kattints a forgatás gombra, majd töltsd le az elkészült képet." },
      ],
      useCases: [
        { icon: "📸", title: "Ferde fotók kiegyenesítése", description: "Kézből fényképezésnél gyakori a kis dőlésszög – néhány fokos forgatással kiegyenesítheted." },
        { icon: "🎨", title: "Kreatív kompozíció", description: "Dinamikus hatást érhetsz el a kép szándékos elforgatásával." },
        { icon: "📱", title: "Tájolás javítása", description: "Álló képet fektetve, vagy fektetve képet állóra forgathatod." },
        { icon: "🖼️", title: "Szkennelt dokumentumok", description: "Ferdén szkennelt dokumentumokat és képeket egyenesíthetsz ki." },
      ],
      aboutSection: {
        title: "A képforgatásról",
        paragraphs: [
          "A képforgatás a kép elforgatása egy központi pont körül. A 90°-os lépésekben végzett forgatás veszteségmentes, mivel a pixelek egyszerűen átrendeződnek. Szabad szögű forgatásnál interpoláció szükséges, ami minimális minőségváltozással jár.",
          "A forgatás különösen hasznos ferde fényképek javításánál, szkennelt dokumentumok kiegyenesítésénél, és kreatív grafikai munkáknál.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Ferde fotóknál általában 1–5° forgatás elegendő a kiegyenesítéshez." },
        { icon: "🔄", tip: "90°-os forgatáshoz használd a dedikált gombot a pontosabb és veszteségmentes eredményért." },
        { icon: "🎨", tip: "PNG formátumban átlátszó hátteret is választhatsz a forgatásnál keletkező üres területekhez." },
      ],
    },
  },

  // ═══ 13. KÉP TÜKRÖZÉSE ══════════════════════════════════════════════════
  "tukrozes": {
    introText:
      "Tükrözd képeidet horizontálisan (vízszintesen) vagy vertikálisan (függőlegesen) egyetlen kattintással. A tükrözés veszteségmentes művelet, amely megőrzi a kép teljes minőségét. A feldolgozás a böngésződben történik.",
    guide: [
      "1. Töltsd fel a tükrözni kívánt képet.",
      "2. Válaszd ki a tükrözés irányát: horizontális (balról jobbra) vagy vertikális (fentről lefelé).",
      "3. Az előnézet azonnal mutatja az eredményt.",
      "4. Töltsd le a tükrözött képet.",
    ],
    faq: [
      { q: "Mire jó a képtükrözés?", a: "Szelfi tükörképének megfordítására, szimmetrikus kompozíciók készítésére, vagy a kép irányának megváltoztatására szolgál." },
      { q: "Biztonságos a feldolgozás?", a: "Igen, a tükrözés a böngésződben történik, semmilyen adat nem kerül szerverre." },
      { q: "Mi a különbség a horizontális és vertikális tükrözés között?", a: "Horizontális tükrözés balról jobbra fordítja a képet (mint egy tükörben). Vertikális tükrözés fejjel lefelé fordítja." },
      { q: "Romlik a minőség tükrözésnél?", a: "Nem, a tükrözés veszteségmentes művelet – a pixelek csak átrendeződnek, nem változnak." },
      { q: "Mobilon is működik?", a: "Igen, minden modern böngészőben és mobileszközön elérhető." },
      { q: "Kombinálhatom forgatással?", a: "A tükrözés és a forgatás egymástól független műveletek. A tükrözött képet utána szabadon forgathatod is." },
    ],
    content: {
      howToSteps: [
        { title: "1. Kép feltöltése", description: "Húzd be a képet, vagy kattints a tallózás gombra a fájl kiválasztásához." },
        { title: "2. Tükrözési irány kiválasztása", description: "Kattints a horizontális vagy vertikális tükrözés gombra. Az előnézet azonnal frissül." },
        { title: "3. Letöltés", description: "Töltsd le a tükrözött képet az eredeti formátumban és minőségben." },
      ],
      useCases: [
        { icon: "🤳", title: "Szelfi javítás", description: "A telefon szelfikamerája tükörképet készít – a tükrözéssel visszaállíthatod a természetes irányt." },
        { icon: "🎨", title: "Szimmetrikus design", description: "Szimmetrikus grafikai elemeket és mintákat hozhatsz létre tükrözéssel." },
        { icon: "🖼️", title: "Kompozíció finomítás", description: "A kép irányának megfordításával javíthatod a vizuális egyensúlyt." },
        { icon: "📐", title: "Tervezési sablon", description: "Egyetlen elem tükrözésével készíthetsz szimmetrikus sablonokat és kereteket." },
      ],
      aboutSection: {
        title: "A képtükrözésről",
        paragraphs: [
          "A képtükrözés (flip) a kép pixeleinek tükörirányú átrendezése. Horizontális tükrözésnél a bal és jobb oldal felcserélődik, vertikálisnál a felső és alsó rész. A művelet teljesen veszteségmentes.",
          "A tükrözés gyakran használt művelet szelfik javításánál, szimmetrikus grafikák készítésénél és kompozíciós kísérletezésnél.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Szelfik tükrözésekor a feliratokra figyelj – azok is tükröződnek, és olvashatatlanná válhatnak." },
        { icon: "🔄", tip: "Kétszeri ugyanolyan irányú tükrözés visszaadja az eredeti képet." },
        { icon: "📸", tip: "Ha a fénykép kompozíciója nem tetszik, próbáld meg horizontálisan tükrözni – meglepően sokat változtathat." },
      ],
    },
  },

  // ═══ 14. KÉP 90°-OS FORGATÁSA ══════════════════════════════════════════
  "90-fokos-forgatas": {
    introText:
      "Forgasd el képeidet pontosan 90°-kal jobbra vagy balra egyetlen kattintással. A 90°-os forgatás veszteségmentes művelet, amely tökéletesen megőrzi a képminőséget. Ideális álló és fekvő tájolás közötti váltáshoz.",
    guide: [
      "1. Töltsd fel a forgatni kívánt képet.",
      "2. Kattints a «90° jobbra» vagy «90° balra» gombra.",
      "3. Szükség esetén forgasd tovább 180° vagy 270°-ra.",
      "4. Töltsd le az elforgatott képet.",
    ],
    faq: [
      { q: "Mire jó a 90°-os forgatás?", a: "Álló képet fekvővé vagy fekvőt állóvá alakíthatsz, illetve javíthatod a rosszul tájolt fényképek irányát." },
      { q: "Biztonságos a feldolgozás?", a: "Igen, a forgatás a böngésződben történik – semmilyen kép nem kerül szerverre." },
      { q: "Veszteségmentes a 90°-os forgatás?", a: "Igen, a 90°-os forgatás pixelszinten pontos: a pixelek egyszerűen átrendeződnek, minőségveszteség nélkül." },
      { q: "Hogyan forgathatok 180°-ot?", a: "Kattints kétszer a 90°-os forgatás gombra, és a kép 180°-kal fordul el." },
      { q: "Mobilon is működik?", a: "Igen, az eszköz teljesen reszponzív és minden modern böngészőben elérhető." },
      { q: "Megváltozik a fájlméret?", a: "A fájlméret gyakorlatilag változatlan marad, mivel a 90°-os forgatás nem igényel újratömörítést." },
    ],
    content: {
      howToSteps: [
        { title: "1. Kép feltöltése", description: "Húzd be a képet a feltöltési területre, vagy kattints a tallózás gombra." },
        { title: "2. Forgatási irány kiválasztása", description: "Kattints a 90° jobbra (CW) vagy 90° balra (CCW) gombra." },
        { title: "3. Letöltés", description: "Töltsd le az elforgatott képet – a minőség és a fájlméret változatlan marad." },
      ],
      useCases: [
        { icon: "📱", title: "Telefonfotók javítása", description: "Rosszul tájolt mobilfotókat egyetlen kattintással a helyes irányba fordíthatsz." },
        { icon: "📄", title: "Dokumentumok forgatása", description: "Ferdén szkennelt vagy rosszul tájolt dokumentumokat javíthatsz gyorsan." },
        { icon: "🖥️", title: "Tájolás váltás", description: "Fekvő képet állóvá, vagy álló képet fekvővé alakíthatsz." },
        { icon: "📸", title: "Fotórendezés", description: "Albumok rendezésekor gyorsan javíthatod az elforgatott képek irányát." },
      ],
      aboutSection: {
        title: "A 90°-os forgatásról",
        paragraphs: [
          "A 90°-os forgatás a leggyakrabban használt forgatási művelet: a kép szélességét és magasságát felcseréli, miközben a pixelek tökéletesen megőrződnek. Ez az egyetlen forgatási mód, amely garantáltan veszteségmentes.",
          "A modern kamerák és telefonok EXIF-adatokban tárolják a tájolást, de nem minden szoftver értelmezi ezeket helyesen. A 90°-os forgatás végleges megoldást ad a tájolási problémákra.",
        ],
      },
      tips: [
        { icon: "💡", tip: "A 90°-os forgatás veszteségmentes – bátran használd, nem romlik a minőség." },
        { icon: "🔄", tip: "180°-os forgatáshoz kattints kétszer a 90°-os gombra." },
        { icon: "📸", tip: "Ha sok fotót kell forgatnod, használd a tömeges forgatás lehetőséget." },
      ],
    },
  },

  // ═══ 15. KÉP ELMOSÁSA ═══════════════════════════════════════════════════
  "elmosas": {
    introText:
      "Alkalmazz Gaussian blur elmosási hatást a képeidre, akár a teljes képen, akár csak egy kijelölt területen. Ideális háttér elmosásához, érzékeny adatok eltakarásához és művészi effektekhez. A feldolgozás a böngésződben történik.",
    guide: [
      "1. Töltsd fel az elmosni kívánt képet.",
      "2. Állítsd be az elmosás erősségét (sugár) a csúszkával.",
      "3. Válaszd ki, hogy a teljes képet vagy csak egy kijelölt területet mosol el.",
      "4. Kattints az «Elmosás» gombra, majd töltsd le az eredményt.",
    ],
    faq: [
      { q: "Mire jó a kép elmosása?", a: "Háttér elmosására (portrészerű hatás), érzékeny információk eltakarására, vagy művészi blur effekt létrehozására." },
      { q: "Biztonságos a feldolgozás?", a: "Igen, az elmosás a böngésződben történik – a kép nem kerül szerverre." },
      { q: "Mi az a Gaussian blur?", a: "A Gaussian blur egy matematikai szűrő, amely a pixelek értékeit a szomszédos pixelekkel átlagolja, lágy, természetes elmosást eredményezve." },
      { q: "El tudok mosni csak egy részt a képből?", a: "Igen, kijelölheted az elmosni kívánt területet, és csak az lesz elmosva, a kép többi része érintetlen marad." },
      { q: "Mobilon is működik?", a: "Igen, az eszköz minden modern böngészőben és mobileszközön elérhető." },
      { q: "Visszaállítható az elmosás?", a: "Nem, az elmosás végleges művelet – az eredeti részletek nem nyerhetők vissza. Mindig őrizd meg az eredeti képet is." },
    ],
    content: {
      howToSteps: [
        { title: "1. Kép feltöltése", description: "Húzd be a képet, vagy kattints a tallózás gombra a fájl kiválasztásához." },
        { title: "2. Elmosás beállítása", description: "Állítsd be az elmosás erősségét a csúszkával. Nagyobb sugár erősebb elmosást jelent." },
        { title: "3. Elmosás és letöltés", description: "Kattints az elmosás gombra, majd töltsd le az eredményt." },
      ],
      useCases: [
        { icon: "👤", title: "Portré háttér", description: "Elmosott háttérrel kiemelheted a portré alanyát, DSLR-szerű mélységélesség hatást érve el." },
        { icon: "🔒", title: "Érzékeny adatok", description: "Személyes adatok, arcok vagy rendszámok eltakarására használhatod az elmosást." },
        { icon: "🎨", title: "Művészi hatás", description: "Álomszerű, lágy hangulatú képeket hozhatsz létre erősebb elmosással." },
        { icon: "🖼️", title: "Háttérképek", description: "Elmosott fotókból kiváló asztali és mobil háttérképeket készíthetsz." },
      ],
      aboutSection: {
        title: "A kép elmosásáról",
        paragraphs: [
          "A Gaussian blur a képfeldolgozás egyik legalapvetőbb művelete: egy matematikai függvény (Gauss-görbe) segítségével átlagolja a pixeleket, természetes, lágy elmosást eredményezve. Az elmosás erőssége a sugár (radius) paraméterrel állítható.",
          "Az elmosás számos praktikus és kreatív célra használható: háttér elmosásával kiemelhetjük a fő témát, érzékeny adatok eltakarásával védhetjük a magánszférát, és művészi effektként is alkalmazható.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Érzékeny adatok eltakarásához használj erős elmosást (20+ sugár) – a gyenge elmosás visszafejthető lehet." },
        { icon: "🎨", tip: "Háttérképekhez 10–15 sugár általában elegendő a kellemes, lágy hatáshoz." },
        { icon: "⚠️", tip: "Mindig őrizd meg az eredeti képet – az elmosás nem vonható vissza." },
      ],
    },
  },

  // ═══ 16. KÉP PIXELESÍTÉSE ══════════════════════════════════════════════
  "pixelates": {
    introText:
      "Pixelesítsd képeidet cenzúrázáshoz vagy pixel art stílusú effekt készítéséhez. Kiválaszthatod a teljes képet vagy csak egy adott területet. A feldolgozás a böngésződben történik, szerverfeltöltés nélkül.",
    guide: [
      "1. Töltsd fel a pixelesíteni kívánt képet.",
      "2. Állítsd be a pixelméret értékét – nagyobb érték durvább pixelesítést ad.",
      "3. Jelöld ki a pixelesíteni kívánt területet, vagy alkalmazd a teljes képre.",
      "4. Kattints a «Pixelesítés» gombra, majd töltsd le az eredményt.",
    ],
    faq: [
      { q: "Mire jó a pixelesítés?", a: "Érzékeny adatok (arcok, rendszámok) cenzúrázására és retró pixel art stílusú effektek készítésére egyaránt alkalmas." },
      { q: "Biztonságos a feldolgozás?", a: "Igen, minden feldolgozás a böngésződben történik – a kép nem kerül szerverre." },
      { q: "Mi a különbség a pixelesítés és az elmosás között?", a: "A pixelesítés négyzetrácsos blokkokra bontja a képet (retró hatás), míg az elmosás lágy, folyamatos átmeneteket hoz létre." },
      { q: "Mennyire biztonságos a cenzúrázás?", a: "Erős pixelesítés (nagy blokkméretek) gyakorlatilag visszafejthetetlen. Kis blokkmérettel a tartalom kitalálható lehet." },
      { q: "Mobilon is működik?", a: "Igen, az eszköz minden modern böngészőben és mobileszközön elérhető." },
      { q: "Készíthetek pixel art-ot a képeimből?", a: "Igen, a teljes kép pixelesítésével retró, pixel art stílusú képeket hozhatsz létre bármely fotóból." },
    ],
    content: {
      howToSteps: [
        { title: "1. Kép feltöltése", description: "Húzd be a képet, vagy válaszd ki a tallózás gombbal." },
        { title: "2. Pixelméret beállítása", description: "Állítsd be a pixel-blokk méretét – nagyobb blokkok erősebb pixelesítést adnak." },
        { title: "3. Pixelesítés és letöltés", description: "Alkalmazd a pixelesítést, ellenőrizd az előnézetet, majd töltsd le az eredményt." },
      ],
      useCases: [
        { icon: "🔒", title: "Cenzúrázás", description: "Arcok, rendszámok és személyes adatok hatékony eltakarása pixelesítéssel." },
        { icon: "🎮", title: "Pixel art", description: "Retró, pixeles stílusú grafikákat készíthetsz bármely fotóból vagy képből." },
        { icon: "📱", title: "Közösségi média", description: "Kreatív pixeles effektekkel egyedi posztokat hozhatsz létre." },
        { icon: "🖼️", title: "Előnézeti képek", description: "Tartalom elrejtése előnézeti képeken – a pixelesítés jelzi, hogy van tartalom, de nem fedi fel." },
      ],
      aboutSection: {
        title: "A képpixelesítésről",
        paragraphs: [
          "A pixelesítés a kép felbontásának csökkentése blokkokra bontással: minden blokk egyetlen színt kap az eredeti pixelek átlaga alapján. Az eredmény a jellegzetes négyzetrácsos, retró megjelenés.",
          "Cenzúrázáshoz a pixelesítés megbízhatóbb az elmosásnál, mivel a blokkátlagolás több információt semmisít meg. Kreatív célra a pixel art stílus a 8-bites játékok nosztalgiáját idézi.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Cenzúrázáshoz legalább 15–20 pixeles blokkméret ajánlott a biztonságos eltakaráshoz." },
        { icon: "🎮", tip: "Pixel art effekthez kísérletezz 8–12 pixeles blokkmérettel a legjobb retró hatás eléréséhez." },
        { icon: "⚠️", tip: "A pixelesítés végleges művelet – mindig őrizd meg az eredeti képet." },
      ],
    },
  },

  // ═══ 17. KÉP FEKETE-FEHÉRRÉ ALAKÍTÁSA ══════════════════════════════════
  "fekete-feher": {
    introText:
      "Alakítsd át színes képeidet fekete-fehér (grayscale) változatra egyetlen kattintással. Állítsd be a kontrasztot és a fényerőt a tökéletes monokróm eredményért. A feldolgozás teljes egészében a böngésződben történik.",
    guide: [
      "1. Töltsd fel a színes képet.",
      "2. Az eszköz automatikusan fekete-fehérré alakítja a képet.",
      "3. Finomítsd az eredményt a kontraszt és fényerő csúszkákkal.",
      "4. Töltsd le a fekete-fehér képet.",
    ],
    faq: [
      { q: "Mire jó a fekete-fehér átalakítás?", a: "Művészi fekete-fehér fotók készítésére, dokumentumok tisztítására, nyomtatási költség csökkentésére és drámai vizuális hatás elérésére." },
      { q: "Biztonságos a feldolgozás?", a: "Igen, a konverzió a böngésződben történik – semmilyen adat nem kerül szerverre." },
      { q: "Hogyan működik a grayscale konverzió?", a: "Az eszköz a színes pixelek RGB értékeiből számítja ki a szürkeárnyalatot, figyelembe véve az emberi szem eltérő színérzékenységét." },
      { q: "Visszaállítható a szín?", a: "Nem, a fekete-fehér konverzió végleges – a színinformáció elvész. Mindig őrizd meg az eredeti színes képet." },
      { q: "Mobilon is működik?", a: "Igen, az eszköz minden modern böngészőben és mobileszközön elérhető." },
      { q: "Milyen formátumokat támogat?", a: "JPG, PNG és WebP formátumú képeket tudsz fekete-fehérré alakítani." },
    ],
    content: {
      howToSteps: [
        { title: "1. Színes kép feltöltése", description: "Húzd be a képet, vagy használd a tallózás gombot. JPG, PNG és WebP formátumok támogatottak." },
        { title: "2. Grayscale alkalmazása", description: "Az eszköz automatikusan fekete-fehérré alakítja a képet az előnézetben." },
        { title: "3. Finomhangolás és letöltés", description: "Állítsd be a kontrasztot és fényerőt, majd töltsd le az elkészült képet." },
      ],
      useCases: [
        { icon: "📸", title: "Művészi fotók", description: "Klasszikus, drámai fekete-fehér fotókat készíthetsz bármilyen színes képből." },
        { icon: "🖨️", title: "Nyomtatási előkészítés", description: "Fekete-fehér nyomtatáshoz előre konvertálhatod a képeket a kívánt eredmény biztosításához." },
        { icon: "📄", title: "Dokumentumok", description: "Szkennelt dokumentumok tisztítása és olvashatóságának javítása grayscale konverzióval." },
        { icon: "🎨", title: "Design elemek", description: "Monokróm grafikai elemeket hozhatsz létre weboldalakhoz és nyomtatványokhoz." },
      ],
      aboutSection: {
        title: "A fekete-fehér konverzióról",
        paragraphs: [
          "A grayscale konverzió a színes kép szürkeárnyalatossá alakítása. A professzionális konverzió figyelembe veszi az emberi szem eltérő érzékenységét: a zöld csatornát nagyobb súllyal számítja, mint a pirosat vagy a kéket.",
          "A fekete-fehér fotózás művészi hagyománya az analóg korszakba nyúlik vissza. A monokróm képek a formákra, textúrákra és kontrasztokra irányítják a figyelmet, drámai és időtlen hatást keltve.",
        ],
      },
      tips: [
        { icon: "💡", tip: "A kontraszt növelése drámaivá teszi a fekete-fehér képet – kísérletezz vele." },
        { icon: "📸", tip: "Erős textúrákat és mintákat tartalmazó képek különösen jól mutatnak fekete-fehérben." },
        { icon: "⚠️", tip: "A színek elvesznek – mentsd el az eredetit, ha később szükséged lehet rá." },
      ],
    },
  },

  // ═══ 18. KONTRASZT ÉS FÉNYERŐ ÁLLÍTÁSA ═════════════════════════════════
  "kontraszt-fenyero": {
    introText:
      "Állítsd be képeid kontrasztját és fényerőjét valós idejű előnézettel. Sötét fotókat világosíthatsz, túlexponált képeket javíthatsz, vagy kreatív hatásokat érhetsz el. A feldolgozás a böngésződben történik.",
    guide: [
      "1. Töltsd fel a szerkeszteni kívánt képet.",
      "2. Mozgasd a fényerő csúszkát a kívánt világosság beállításához.",
      "3. Állítsd be a kontrasztot a részletek kiemelése vagy lágyítása érdekében.",
      "4. Töltsd le a módosított képet.",
    ],
    faq: [
      { q: "Mire jó a kontraszt és fényerő állítás?", a: "Sötét vagy túlexponált fotók javítására, a részletek kiemelesére és a kép vizuális hatásának fokozására." },
      { q: "Biztonságos a feldolgozás?", a: "Igen, minden művelet a böngésződben történik – a kép nem kerül szerverre." },
      { q: "Mi a különbség a kontraszt és a fényerő között?", a: "A fényerő a kép egészének világosságát változtatja, a kontraszt pedig a sötét és világos részek közötti különbséget szabályozza." },
      { q: "Lehet egyszerre mindkettőt állítani?", a: "Igen, a két csúszka egymástól függetlenül működik, és az előnézet mindkét módosítást valós időben mutatja." },
      { q: "Mobilon is működik?", a: "Igen, az eszköz teljesen reszponzív és minden modern böngészőben elérhető." },
      { q: "Milyen formátumokat támogat?", a: "JPG, PNG és WebP formátumú képek kontrasztját és fényerőjét egyaránt állíthatod." },
    ],
    content: {
      howToSteps: [
        { title: "1. Kép feltöltése", description: "Húzd be a képet, vagy kattints a tallózás gombra. JPG, PNG és WebP támogatott." },
        { title: "2. Beállítások módosítása", description: "Használd a fényerő és kontraszt csúszkákat. Az előnézet valós időben frissül." },
        { title: "3. Letöltés", description: "Ha elégedett vagy az eredménnyel, töltsd le a módosított képet." },
      ],
      useCases: [
        { icon: "📸", title: "Fotójavítás", description: "Alul- vagy túlexponált fotók gyors korrekciója fényerő-beállítással." },
        { icon: "📄", title: "Dokumentumok", description: "Halvány szkennelt dokumentumok olvashatóságának javítása kontraszt-növeléssel." },
        { icon: "🌅", title: "Hangulatfotók", description: "Drámai hatást érhetsz el a kontraszt növelésével, vagy lágy hangulatot a csökkentéssel." },
        { icon: "🛒", title: "Termékfotók", description: "Termékképek világosítása és kontrasztjának javítása a jobb megjelenés érdekében." },
      ],
      aboutSection: {
        title: "A kontrasztról és a fényerőről",
        paragraphs: [
          "A fényerő (brightness) a kép egészének világosságát szabályozza: növelése világosabb, csökkentése sötétebb képet eredményez. A kontraszt a legvilágosabb és legsötétebb részek közötti különbséget határozza meg.",
          "A két paraméter együttes beállításával kiegyensúlyozott, professzionális eredményt érhetsz el. Sötét fotóknál érdemes először a fényerőt növelni, majd a kontraszttal kiemelni a részleteket.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Sötét fotóknál először a fényerőt növeld, majd utána finomítsd a kontrasztot." },
        { icon: "📊", tip: "Túl magas kontraszt részletvesztést okozhat a nagyon sötét és világos területeken." },
        { icon: "🔍", tip: "Használd az előnézetet a beállítások hatásának azonnali ellenőrzéséhez." },
      ],
    },
  },

  // ═══ 19. VÍZJEL HOZZÁADÁSA ══════════════════════════════════════════════
  "vizjel": {
    introText:
      "Adj vízjelet képeidhez szöveg vagy kép formájában a szerzői jogok védelme érdekében. Állítsd be a vízjel pozícióját, méretét és átlátszóságát. A feldolgozás teljes egészében a böngésződben történik.",
    guide: [
      "1. Töltsd fel a képet, amelyhez vízjelet szeretnél adni.",
      "2. Válaszd ki a vízjel típusát: szöveg vagy kép.",
      "3. Állítsd be a pozíciót, méretet, átlátszóságot és elforgatást.",
      "4. Kattints az «Alkalmazás» gombra, majd töltsd le a vízjeles képet.",
    ],
    faq: [
      { q: "Mire jó a vízjel?", a: "A vízjel védi a szerzői jogaidat azáltal, hogy jelzi a kép tulajdonosát. Elrettenti a jogosulatlan felhasználást." },
      { q: "Biztonságos a feldolgozás?", a: "Igen, a vízjel hozzáadása a böngésződben történik – a kép nem kerül szerverre." },
      { q: "Milyen vízjelet adhatok hozzá?", a: "Szöveges vízjelet (pl. neved, weboldalad) vagy képes vízjelet (pl. logód) egyaránt hozzáadhatsz." },
      { q: "Hová helyezhetem a vízjelet?", a: "A vízjel pozíciója szabadon állítható: sarkok, közép, vagy ismétlődő minta az egész képen." },
      { q: "Mobilon is működik?", a: "Igen, az eszköz minden modern böngészőben és mobileszközön elérhető." },
      { q: "Eltávolítható a vízjel utólag?", a: "A vízjel a képbe «beleég» – eltávolítása csak az eredeti, vízjel nélküli kép birtokában lehetséges. Ezért hatékony védelmi eszköz." },
    ],
    content: {
      howToSteps: [
        { title: "1. Kép feltöltése", description: "Húzd be a képet, vagy kattints a tallózás gombra." },
        { title: "2. Vízjel konfigurálása", description: "Válaszd ki a szöveges vagy képes vízjelet, állítsd be a pozíciót és az átlátszóságot." },
        { title: "3. Alkalmazás és letöltés", description: "Ellenőrizd az előnézetet, majd töltsd le a vízjellel ellátott képet." },
      ],
      useCases: [
        { icon: "📸", title: "Fotós portfólió", description: "Védd meg fotóidat vízjellel, amikor online portfóliódban mutatod be munkáidat." },
        { icon: "🏢", title: "Céges tartalom", description: "Céges logó vízjelként való elhelyezése marketinganyagokon és prezentációs képeken." },
        { icon: "🛒", title: "Termékkatalógus", description: "Termékfotók védelme a jogosulatlan felhasználás ellen vízjellel." },
        { icon: "🎨", title: "Előnézeti képek", description: "Alacsony felbontású, vízjeles előnézeteket készíthetsz ügyfeleknek a végleges képek átadása előtt." },
      ],
      aboutSection: {
        title: "A vízjelekről",
        paragraphs: [
          "A vízjel (watermark) a képre helyezett félig átlátszó szöveg vagy logó, amely jelzi a szerzői jogok tulajdonosát. A digitális korban a vízjel az egyik legegyszerűbb és leghatékonyabb módja a képek védelmének.",
          "A jó vízjel kellően feltűnő ahhoz, hogy elrettentse a jogosulatlan felhasználást, de nem zavarja túlzottan a kép élvezetét. Az átlátszóság, méret és pozíció helyes beállítása kulcsfontosságú.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Az átlátszóságot 30–50% közé állítsd: eléggé látható, de nem zavaró." },
        { icon: "📐", tip: "A sarokban elhelyezett kis vízjel kevésbé zavaró, de könnyebben levágható." },
        { icon: "🔄", tip: "Ismétlődő minta (tiled) vízjel nehezebben távolítható el, mint az egypontos." },
      ],
    },
  },

  // ═══ 20. KERET ÉS PADDING HOZZÁADÁSA ═══════════════════════════════════
  "keret-padding": {
    introText:
      "Adj keretet és belső margót (padding) a képeidhez. Választhatsz egyszínű keretet, árnyékos hatást, vagy egyszerű térközt a kép köré. A szerkesztés teljes egészében a böngésződben történik.",
    guide: [
      "1. Töltsd fel a képet, amelyhez keretet szeretnél adni.",
      "2. Állítsd be a keret vastagságát, színét és stílusát.",
      "3. Add meg a belső margó (padding) méretét, ha szükséges.",
      "4. Töltsd le a keretezett képet.",
    ],
    faq: [
      { q: "Mire jó a keret és padding hozzáadás?", a: "Képek esztétikus keretezésére, közösségi média posztok formázására, és nyomtatási szegélyek hozzáadására." },
      { q: "Biztonságos a feldolgozás?", a: "Igen, a képszerkesztés a böngésződben történik – semmilyen adat nem kerül szerverre." },
      { q: "Mi a különbség a keret és a padding között?", a: "A keret (border) a kép szélén jelenik meg megadott színnel és vastagsággal. A padding üres tér a kép és a keret között." },
      { q: "Milyen keretszíneket választhatok?", a: "Bármilyen színt választhatsz a színválasztóval, vagy megadhatsz HEX kódot. Átlátszó háttér is lehetséges PNG-nél." },
      { q: "Mobilon is működik?", a: "Igen, az eszköz minden modern böngészőben és mobileszközön elérhető." },
      { q: "Megváltozik a kép mérete?", a: "Igen, a keret és padding hozzáadásával a végső kép mérete megnő a megadott értékekkel." },
    ],
    content: {
      howToSteps: [
        { title: "1. Kép feltöltése", description: "Húzd be a képet, vagy kattints a tallózás gombra." },
        { title: "2. Keret beállítása", description: "Válaszd ki a keret vastagságát, színét és a belső margó méretét." },
        { title: "3. Letöltés", description: "Ellenőrizd az előnézetet, majd töltsd le a keretezett képet." },
      ],
      useCases: [
        { icon: "📱", title: "Közösségi média", description: "Egységes megjelenésű keretezett képeket készíthetsz Instagram- és Facebook-posztokhoz." },
        { icon: "🖼️", title: "Galéria előkészítés", description: "Nyomtatott képekhez és digitális galériákhoz esztétikus kereteket adhatsz." },
        { icon: "📊", title: "Prezentációk", description: "Prezentációs képeket kerettel és margóval teheted professzionálisabbá." },
        { icon: "🎨", title: "Design elemek", description: "Fehér vagy színes szegéllyel kiegészítve az egyszerű fotó is design elemmé válik." },
      ],
      aboutSection: {
        title: "A keret és padding hozzáadásáról",
        paragraphs: [
          "A képkeret vizuálisan elválasztja a képet a környezetétől, kiemelve a tartalmat. A belső margó (padding) levegőssé teszi a kompozíciót, míg a keret (border) hangsúlyos vizuális elemet ad.",
          "A megfelelő keret és margó kiválasztása sokat javíthat a kép összbenyomásán. Minimalista designhoz vékony keret és bő fehér margó, drámai hatáshoz vastag, kontrasztos keret ajánlott.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Fehér padding és vékony szürke keret klasszikus, galériaszerű megjelenést ad." },
        { icon: "📱", tip: "Instagram posztokhoz egységes fehér keret kiváló, összetartó feed megjelenést teremt." },
        { icon: "🎨", tip: "Kísérletezz a keret és a kép domináns színeinek összhangjával a legjobb hatásért." },
      ],
    },
  },

  // ═══ 21. KÉP EXIF/METADATA MEGJELENÍTÉSE ════════════════════════════════
  "metadata-megjelenites": {
    introText:
      "Tekintsd meg a képeidbe ágyazott EXIF és egyéb metaadatokat: kamera típusa, expozíció, GPS koordináták, dátum és sok más. Az adatok kiolvasása a böngésződben történik, a kép nem kerül szerverre.",
    guide: [
      "1. Töltsd fel a képet, amelynek metaadatait meg szeretnéd tekinteni.",
      "2. Az eszköz automatikusan kiolvas és megjelenít minden elérhető metaadatot.",
      "3. Böngészd a különböző kategóriákat: kamera, expozíció, GPS, szoftver stb.",
    ],
    faq: [
      { q: "Mire jó a metadata megjelenítés?", a: "Megtudhatod, milyen kamerával, beállításokkal és mikor készült a kép, és hogy tartalmaz-e GPS koordinátákat." },
      { q: "Biztonságos a feldolgozás?", a: "Igen, a metaadatok kiolvasása a böngésződben történik – a kép nem hagyja el a gépedet." },
      { q: "Mi az az EXIF adat?", a: "Az EXIF (Exchangeable Image File Format) a digitális kamerák által a képfájlba ágyazott technikai adatok: kameramodell, expozíciós idő, ISO, blende, GPS stb." },
      { q: "Minden képben van metaadat?", a: "A legtöbb kamerával és telefonnal készült fotó tartalmaz EXIF-adatokat. Egyes szoftverek és közösségi platformok eltávolítják ezeket." },
      { q: "Mobilon is működik?", a: "Igen, az eszköz minden modern böngészőben és mobileszközön elérhető." },
      { q: "Szerkeszthetem a metaadatokat?", a: "Ez az eszköz csak a megjelenítésre szolgál. A metaadatok törléséhez használd a metadata-törlés eszközt." },
    ],
    content: {
      howToSteps: [
        { title: "1. Kép feltöltése", description: "Húzd be a képet, vagy kattints a tallózás gombra. JPG formátumú képek tartalmazzák a legtöbb EXIF-adatot." },
        { title: "2. Metaadatok megtekintése", description: "Az eszköz automatikusan kiolvas és kategóriánként megjelenít minden elérhető metaadatot." },
        { title: "3. Adatok böngészése", description: "Vizsgáld meg a kamera, expozíció, GPS és egyéb adatokat az egyes kategóriákban." },
      ],
      useCases: [
        { icon: "📸", title: "Fotó elemzés", description: "Tudd meg, milyen beállításokkal készült egy jól sikerült fotó, hogy reprodukálhasd." },
        { icon: "🔒", title: "Adatvédelem", description: "Ellenőrizd, hogy a megosztani kívánt kép tartalmaz-e érzékeny GPS koordinátákat." },
        { icon: "📅", title: "Fájlkezelés", description: "A készítés dátuma és ideje alapján rendezheted és szervezheted fotóidat." },
        { icon: "🔍", title: "Hitelességvizsgálat", description: "A metaadatok segítenek megállapítani, mikor és mivel készült egy kép." },
      ],
      aboutSection: {
        title: "A kép metaadatokról",
        paragraphs: [
          "A digitális képek nem csak pixeleket tartalmaznak: a fájlba ágyazott metaadatok (EXIF, IPTC, XMP) rengeteg információt hordoznak a kép készítésének körülményeiről, a kamerabeállításokról és akár a készítés pontos helyszínéről.",
          "Az EXIF-adatok hasznosak lehetnek fotósoknak a beállítások tanulmányozásához, de adatvédelmi kockázatot is jelenthetnek: a GPS koordináták elárulhatják a készítés pontos helyét. Érdemes ellenőrizni és szükség esetén törölni a metaadatokat megosztás előtt.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Megosztás előtt mindig ellenőrizd, hogy a kép tartalmaz-e GPS koordinátákat." },
        { icon: "📸", tip: "Fotósként tanulmányozd sikeres képeid EXIF-adatait a fejlődés érdekében." },
        { icon: "🔒", tip: "Ha érzékeny adatokat találsz, használd a metadata-törlés eszközt a biztonságos megosztáshoz." },
      ],
    },
  },

  // ═══ 22. KÉP METADATA TÖRLÉSE ══════════════════════════════════════════
  "metadata-torles": {
    introText:
      "Töröld a képeidbe ágyazott EXIF és egyéb metaadatokat (GPS koordináták, kameraadatok, dátum stb.) a magánszféra védelme érdekében. A feldolgozás a böngésződben történik, szerverfeltöltés nélkül.",
    guide: [
      "1. Töltsd fel a képet, amelynek metaadatait törölni szeretnéd.",
      "2. Az eszköz megjeleníti az elérhető metaadatokat törlés előtt.",
      "3. Kattints a «Metaadatok törlése» gombra.",
      "4. Töltsd le a megtisztított képet.",
    ],
    faq: [
      { q: "Mire jó a metadata törlés?", a: "Eltávolítja a képbe ágyazott személyes adatokat (GPS hely, kameraadatok) a biztonságos online megosztás érdekében." },
      { q: "Biztonságos a feldolgozás?", a: "Igen, a metaadatok törlése a böngésződben történik – a kép nem kerül szerverre." },
      { q: "Milyen adatokat töröl az eszköz?", a: "EXIF adatok (kamera, expozíció, GPS), IPTC adatok (szerzői jog, leírás) és XMP adatok egyaránt eltávolításra kerülnek." },
      { q: "Romlik a képminőség a törlés miatt?", a: "Nem, a metaadatok törlése nem érinti a kép pixeleit – a vizuális minőség változatlan marad." },
      { q: "Mobilon is működik?", a: "Igen, az eszköz minden modern böngészőben és mobileszközön elérhető." },
      { q: "Visszaállíthatók a törölt adatok?", a: "Nem, a törlés végleges. Ha szükséged van a metaadatokra, mentsd el az eredeti fájlt is." },
    ],
    content: {
      howToSteps: [
        { title: "1. Kép feltöltése", description: "Húzd be a képet, vagy kattints a tallózás gombra. Az eszköz mutatja a jelenlegi metaadatokat." },
        { title: "2. Metaadatok törlése", description: "Kattints a törlés gombra – minden beágyazott metaadat eltávolításra kerül." },
        { title: "3. Megtisztított kép letöltése", description: "Töltsd le a metaadatoktól megtisztított képet biztonságos megosztáshoz." },
      ],
      useCases: [
        { icon: "🔒", title: "Adatvédelem", description: "GPS koordináták eltávolítása a fotókról, mielőtt online megosztanád őket." },
        { icon: "📱", title: "Közösségi média", description: "Tisztítsd meg a fotóidat személyes metaadatoktól a közösségi platformokra feltöltés előtt." },
        { icon: "📧", title: "Biztonságos küldés", description: "E-mailben küldött képek metaadatainak eltávolítása a magánszféra érdekében." },
        { icon: "🏢", title: "Üzleti felhasználás", description: "Céges képek metaadatainak törlése a versenytársak elől elrejtve a kamera és szoftver információkat." },
      ],
      aboutSection: {
        title: "A metadata törlésről",
        paragraphs: [
          "A képek metaadatai számos személyes információt tartalmazhatnak: pontos GPS helymeghatározás, készítés dátuma és ideje, kamera típusa, sőt akár a tulajdonos neve is. Online megosztásnál ezek az adatok bárki számára kiolvashatók.",
          "A metaadatok törlése egyszerű, de hatékony lépés a digitális magánszféra védelmében. Különösen fontos lakásról, munkahelyről vagy rendszeresen látogatott helyekről készült fotók esetében.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Megosztás előtt mindig érdemes törölni a GPS koordinátákat a fotókról." },
        { icon: "📸", tip: "Ha fotósként fontos a beállítások megőrzése, tartsd meg az eredeti fájlt a törlés előtt." },
        { icon: "🔒", tip: "Különösen figyelj az otthonról és munkahelyről készült fotók GPS-adataira." },
      ],
    },
  },

  // ═══ 23. TÖMEGES KÉPKONVERTÁLÁS ═════════════════════════════════════════
  "tomeges-konvertalas": {
    introText:
      "Konvertálj egyszerre akár több száz képet a kívánt formátumba (JPG, PNG, WebP). A tömeges feldolgozás a böngésződben történik párhuzamosan, szerverfeltöltés nélkül.",
    guide: [
      "1. Húzd be vagy válaszd ki az összes konvertálni kívánt képet.",
      "2. Válaszd ki a cél formátumot (JPG, PNG vagy WebP).",
      "3. Állítsd be a minőséget és egyéb opciókat.",
      "4. Indítsd el a konvertálást, majd töltsd le az eredményeket egyenként vagy ZIP-ben.",
    ],
    faq: [
      { q: "Mire jó a tömeges konvertálás?", a: "Ha sok képet kell egyszerre más formátumba alakítanod, például egy teljes mappaszerkezet PNG-jeit WebP-re konvertálnád." },
      { q: "Biztonságos a feldolgozás?", a: "Igen, minden kép a böngésződben kerül feldolgozásra – semmilyen fájl nem kerül szerverre." },
      { q: "Hány képet dolgozhat fel egyszerre?", a: "Nincs szigorú korlát, a feldolgozási sebesség a géped teljesítményétől és a képek méretétől függ." },
      { q: "Milyen formátumok között konvertálhatok?", a: "JPG, PNG és WebP formátumok között bármilyen irányban konvertálhatsz." },
      { q: "Mobilon is működik?", a: "Igen, bár nagy mennyiségű kép esetén asztali gépen gyorsabb a feldolgozás." },
      { q: "Letölthetem az eredményt ZIP fájlban?", a: "Igen, a konvertált képeket egyetlen ZIP fájlba csomagolva is letöltheted." },
    ],
    content: {
      howToSteps: [
        { title: "1. Képek kiválasztása", description: "Húzd be az összes konvertálandó képet, vagy válaszd ki őket a tallózás gombbal." },
        { title: "2. Formátum és beállítások", description: "Válaszd ki a cél formátumot és állítsd be a minőséget. A beállítás minden képre érvényes lesz." },
        { title: "3. Konvertálás és letöltés", description: "Indítsd el a tömeges konvertálást, majd töltsd le az eredményeket ZIP-ben vagy egyenként." },
      ],
      useCases: [
        { icon: "🌐", title: "Weboldal migráció", description: "Weboldal képeinek tömeges konvertálása WebP formátumba a gyorsabb betöltés érdekében." },
        { icon: "📂", title: "Archívum rendezés", description: "Régi képgyűjtemények egységes formátumba alakítása az egyszerűbb kezelhetőség érdekében." },
        { icon: "🛒", title: "Webshop", description: "Több száz termékkép egyidejű konvertálása a kívánt formátumba." },
        { icon: "📸", title: "Fotó export", description: "Fotósorozatok egységes formátumba konvertálása kiadásra vagy megosztásra." },
      ],
      aboutSection: {
        title: "A tömeges képkonvertálásról",
        paragraphs: [
          "A tömeges konvertálás lehetővé teszi, hogy egyetlen művelettel sok képet alakíts át más formátumba. A böngészőalapú feldolgozás kihasználja a modern processzorok többmagos képességét a párhuzamos feldolgozáshoz.",
          "A tömeges konvertálás időt és energiát takarít meg: ahelyett, hogy egyesével konvertálnád a képeket, beállítod a paramétereket és a rendszer automatikusan feldolgozza az összeset.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Egységes minőségi beállítással biztosítsd a konzisztens eredményt minden képnél." },
        { icon: "📦", tip: "Használd a ZIP letöltést, ha sok képet konvertálsz – egyszerűbb a kezelés." },
        { icon: "⚡", tip: "Asztali gépen a tömeges feldolgozás jelentősen gyorsabb, mint mobilon." },
      ],
    },
  },

  // ═══ 24. TÖMEGES KÉPÁTMÉRETEZÉS ═════════════════════════════════════════
  "tomeges-atmeretezes": {
    introText:
      "Méretezd át egyszerre több képet azonos méretre vagy arányra. Ideális weboldal képek, termékfotók és közösségi média tartalmak egységes méretezéséhez. A feldolgozás a böngésződben történik.",
    guide: [
      "1. Húzd be vagy válaszd ki az átméretezendő képeket.",
      "2. Add meg a kívánt méretet pixelben vagy százalékban.",
      "3. Válaszd ki a képarány-kezelés módját (megtartás, levágás, kitöltés).",
      "4. Indítsd el az átméretezést, majd töltsd le az eredményeket.",
    ],
    faq: [
      { q: "Mire jó a tömeges átméretezés?", a: "Ha sok képet kell egyszerre azonos méretre hoznod, például webshop termékképeket vagy galériafotókat." },
      { q: "Biztonságos a feldolgozás?", a: "Igen, az átméretezés a böngésződben történik – a képek nem kerülnek szerverre." },
      { q: "Megtarthatom a képarányt?", a: "Igen, választhatsz a képarány megtartása, levágás (crop) és kitöltés (padding) módok között." },
      { q: "Milyen formátumú képeket támogat?", a: "JPG, PNG és WebP formátumú képek egyaránt átméretezhetők." },
      { q: "Mobilon is működik?", a: "Igen, bár nagy mennyiségű és nagy méretű képek esetén asztali gépen gyorsabb." },
      { q: "Hány képet dolgozhatok fel egyszerre?", a: "Nincs szigorú korlát – a sebesség a géped teljesítményétől függ." },
    ],
    content: {
      howToSteps: [
        { title: "1. Képek kiválasztása", description: "Húzd be az összes átméretezendő képet, vagy válaszd ki őket a tallózás gombbal." },
        { title: "2. Méret beállítása", description: "Add meg a cél szélességet és magasságot pixelben. Válaszd ki a képarány-kezelés módját." },
        { title: "3. Átméretezés és letöltés", description: "Indítsd el a feldolgozást, majd töltsd le az eredményeket ZIP-ben vagy egyenként." },
      ],
      useCases: [
        { icon: "🛒", title: "Webshop", description: "Több száz termékkép egységes méretre hozása a konzisztens megjelenés érdekében." },
        { icon: "🌐", title: "Weboldal", description: "Galériafotók és blogképek azonos méretezése a gyors betöltéshez." },
        { icon: "📱", title: "Közösségi média", description: "Képsorozatok egységes méretezése Instagram-, Facebook- vagy LinkedIn-posztokhoz." },
        { icon: "📧", title: "Hírlevél", description: "Hírlevél-képek egységes szélességre méretezése a tökéletes megjelenésért." },
      ],
      aboutSection: {
        title: "A tömeges átméretezésről",
        paragraphs: [
          "A tömeges átméretezés lehetővé teszi, hogy egyetlen beállítással sok képet hozz azonos méretre. Ez különösen hasznos webshopok, galériák és közösségi média tartalmak előkészítésénél.",
          "A képarány-kezelés kulcsfontosságú: a megtartás módban a kép nem torzul, de lehet, hogy nem tölti ki pontosan a kívánt méretet. A levágás (crop) mód kitölti a teljes méretet, de a kép széleiből levághat.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Termékfotóknál a levágás (crop) mód biztosítja a tökéletesen egységes méretet." },
        { icon: "📏", tip: "Galériafotóknál a képarány megtartása ajánlott a torzítás elkerülése érdekében." },
        { icon: "📦", tip: "Használd a ZIP letöltést a könnyebb fájlkezeléshez." },
      ],
    },
  },

  // ═══ 25. TÖMEGES KÉPTÖMÖRÍTÉS ═══════════════════════════════════════════
  "tomeges-tomorites": {
    introText:
      "Tömörítsd egyszerre több kép fájlméretét egyetlen beállítással. Ideális weboldalak, webshopok és e-mail kampányok képeinek optimalizálásához. A feldolgozás a böngésződben történik, szerverfeltöltés nélkül.",
    guide: [
      "1. Húzd be vagy válaszd ki a tömörítendő képeket.",
      "2. Állítsd be a tömörítési szintet a csúszkával.",
      "3. Indítsd el a tömeges tömörítést.",
      "4. Töltsd le a tömörített képeket egyenként vagy ZIP-ben.",
    ],
    faq: [
      { q: "Mire jó a tömeges tömörítés?", a: "Ha sok képet kell egyszerre optimalizálnod fájlméret szempontjából, például egy weboldal összes képét." },
      { q: "Biztonságos a feldolgozás?", a: "Igen, a tömörítés a böngésződben történik – semmilyen kép nem kerül szerverre." },
      { q: "Mekkora méretcsökkenés érhető el?", a: "A képtípustól és a tömörítési szinttől függően 30–70% méretcsökkenés általában elérhető." },
      { q: "Milyen formátumokat támogat?", a: "JPG, PNG és WebP formátumú képek egyaránt tömöríthetők." },
      { q: "Mobilon is működik?", a: "Igen, bár nagy mennyiségű kép tömörítéséhez asztali gép ajánlott." },
      { q: "Minden képre azonos tömörítés vonatkozik?", a: "Igen, a beállított tömörítési szint egységesen alkalmazódik minden kiválasztott képre." },
    ],
    content: {
      howToSteps: [
        { title: "1. Képek kiválasztása", description: "Húzd be az összes tömörítendő képet, vagy válaszd ki őket a tallózás gombbal." },
        { title: "2. Tömörítési szint beállítása", description: "Állítsd be a kívánt minőség–méret egyensúlyt a csúszkával." },
        { title: "3. Tömörítés és letöltés", description: "Indítsd el a tömeges tömörítést, majd töltsd le az eredményeket." },
      ],
      useCases: [
        { icon: "🌐", title: "Weboldal optimalizálás", description: "Teljes weboldal képanyagának egyszeri tömörítése a gyorsabb betöltés érdekében." },
        { icon: "🛒", title: "Webshop", description: "Több száz termékkép egyidejű tömörítése a sávszélesség csökkentéséhez." },
        { icon: "📧", title: "E-mail marketing", description: "Hírlevél-képek tömörítése a gyorsabb e-mail betöltés és jobb kézbesíthetőség érdekében." },
        { icon: "💾", title: "Tárhelymegtakarítás", description: "Fotógyűjtemények tömörítésével jelentős tárhelyet szabadíthatsz fel." },
      ],
      aboutSection: {
        title: "A tömeges képtömörítésről",
        paragraphs: [
          "A tömeges tömörítés lehetővé teszi, hogy egyszerre optimalizáld sok kép fájlméretét, ahelyett hogy egyesével dolgoznád fel őket. A párhuzamos feldolgozás kihasználja a modern böngészők teljesítményét.",
          "Az egységes tömörítési szint biztosítja a konzisztens minőséget az összes képnél. Webes felhasználáshoz a 70–80-as minőség a legjobb kompromisszum a méret és a minőség között.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Weboldalakhoz 70–80-as minőség az ideális – jelentős méretcsökkenés, minimális minőségveszteség." },
        { icon: "📊", tip: "A tömörítés után ellenőrizd a teljes méretmegtakarítást az összesítőben." },
        { icon: "📦", tip: "ZIP letöltéssel egyetlen fájlban kapod meg az összes tömörített képet." },
      ],
    },
  },

  // ═══ 26. TÖMEGES KÉPÁTNEVEZÉS ═══════════════════════════════════════════
  "tomeges-atnevezes": {
    introText:
      "Nevezd át egyszerre több képfájlt egységes névkonvenció szerint. Használj sorszámozást, dátumot, prefixet vagy egyedi mintát. A feldolgozás a böngésződben történik, szerverfeltöltés nélkül.",
    guide: [
      "1. Húzd be vagy válaszd ki az átnevezni kívánt képeket.",
      "2. Add meg az átnevezési mintát (pl. «termek-{szam}» vagy «{datum}-{nev}»).",
      "3. Tekintsd meg az előnézetet az új fájlnevekről.",
      "4. Töltsd le az átnevezett fájlokat.",
    ],
    faq: [
      { q: "Mire jó a tömeges átnevezés?", a: "Ha sok képfájlt kell egységes, rendezett fájlnévvel ellátni, például termékfotókat, albumfotókat vagy archívumi anyagokat." },
      { q: "Biztonságos a feldolgozás?", a: "Igen, a fájlok átnevezése a böngésződben történik – semmilyen kép nem kerül szerverre." },
      { q: "Milyen átnevezési minták érhetők el?", a: "Sorszámozás, dátum, prefix, suffix, egyedi szöveg és ezek kombinációi is használhatók." },
      { q: "Megváltozik a kép tartalma?", a: "Nem, az átnevezés kizárólag a fájlnevet módosítja – a kép minősége és tartalma változatlan marad." },
      { q: "Mobilon is működik?", a: "Igen, az eszköz minden modern böngészőben és mobileszközön elérhető." },
      { q: "Láthatom előre az új fájlneveket?", a: "Igen, az előnézeti lista mutatja az eredeti és az új fájlneveket a letöltés előtt." },
    ],
    content: {
      howToSteps: [
        { title: "1. Képek kiválasztása", description: "Húzd be a képeket, vagy válaszd ki őket a tallózás gombbal." },
        { title: "2. Névminta beállítása", description: "Add meg az átnevezési mintát: prefix, sorszám, dátum és egyéb elemek kombinálhatók." },
        { title: "3. Előnézet és letöltés", description: "Ellenőrizd az előnézetben az új fájlneveket, majd töltsd le az átnevezett fájlokat." },
      ],
      useCases: [
        { icon: "🛒", title: "Termékfotók", description: "Egységes névkonvenciót adhatsz a termékképeknek (pl. «termek-001-elol.jpg»)." },
        { icon: "📸", title: "Fotóalbumok", description: "Eseményfotókat rendezhetsz dátum és sorszám alapján egységes névvel." },
        { icon: "📂", title: "Archívum rendezés", description: "Régi, rendezetlen fájlneveket cserélhetsz egységes, kereshető nevekre." },
        { icon: "🌐", title: "SEO-barát nevek", description: "Weboldal képeinek átnevezése leíró, keresőoptimalizált fájlnevekre." },
      ],
      aboutSection: {
        title: "A tömeges átnevezésről",
        paragraphs: [
          "A tömeges fájlátnevezés rendszerezett, egységes névkonvenciót biztosít nagy mennyiségű képfájlhoz. Az egységes elnevezés megkönnyíti a keresést, rendezést és archiválást.",
          "Az átnevezési minták rugalmasan kombinálhatók: sorszámozás (001, 002...), dátum, egyedi prefix és suffix segítségével professzionális fájlkezelést valósíthatsz meg.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Használj leíró prefixet (pl. «termek-», «esemeny-»), hogy a fájlnévből kiderüljön a tartalom." },
        { icon: "🔢", tip: "Sorszámozásnál nullával töltsd ki az elejét (001, 002) a helyes sorrendezés érdekében." },
        { icon: "🌐", tip: "SEO-hoz használj kötőjeles, ékezet nélküli, leíró fájlneveket." },
      ],
    },
  },

  // ═══ 27. KÉPEK ZIP-BE CSOMAGOLÁSA ═══════════════════════════════════════
  "tomeges-zip-letoltes": {
    introText:
      "Csomagold össze képeidet egyetlen ZIP fájlba a könnyebb megosztás és archiválás érdekében. A ZIP létrehozása a böngésződben történik, szerverfeltöltés nélkül.",
    guide: [
      "1. Húzd be vagy válaszd ki a ZIP-be csomagolandó képeket.",
      "2. Opcionálisan add meg a ZIP fájl nevét.",
      "3. Kattints a «ZIP létrehozása» gombra.",
      "4. Töltsd le az elkészült ZIP fájlt.",
    ],
    faq: [
      { q: "Mire jó a ZIP csomagolás?", a: "Több kép egyetlen fájlba csomagolására, ami megkönnyíti a megosztást, e-mail küldést és archiválást." },
      { q: "Biztonságos a feldolgozás?", a: "Igen, a ZIP fájl a böngésződben jön létre – semmilyen kép nem kerül szerverre." },
      { q: "Tömöríti a ZIP a képeket?", a: "A ZIP formátum enyhe tömörítést alkalmaz, de ez képeknél (amelyek már tömörítettek) minimális méretcsökkenést jelent. A fő cél a csomagolás." },
      { q: "Van fájlméret-korlát?", a: "Nincs szerveres korlát, mivel a feldolgozás helyben történik. A böngésző memóriakorlátja az egyetlen határ." },
      { q: "Mobilon is működik?", a: "Igen, bár nagy mennyiségű kép esetén asztali gépen gyorsabb a ZIP létrehozása." },
      { q: "Milyen képformátumokat csomagolhatok?", a: "Bármilyen képformátumot (JPG, PNG, WebP, GIF, BMP stb.) egyetlen ZIP-be csomagolhatsz." },
    ],
    content: {
      howToSteps: [
        { title: "1. Képek kiválasztása", description: "Húzd be az összecsomagolandó képeket, vagy válaszd ki őket a tallózás gombbal." },
        { title: "2. ZIP fájl konfigurálása", description: "Adj meg egy nevet a ZIP fájlnak, és ellenőrizd a tartalomlistát." },
        { title: "3. ZIP létrehozása és letöltés", description: "Kattints a ZIP létrehozása gombra, majd töltsd le az elkészült csomagot." },
      ],
      useCases: [
        { icon: "📧", title: "E-mail küldés", description: "Sok képet egyetlen ZIP mellékletben küldhetsz el, ahelyett hogy egyesével csatolnád." },
        { icon: "💾", title: "Archiválás", description: "Fotógyűjtemények és projektek képeinek rendezett archiválása ZIP fájlokba." },
        { icon: "🤝", title: "Megosztás", description: "Ügyfeleknek, kollégáknak egyetlen letölthető fájlban adhatod át a képanyagot." },
        { icon: "☁️", title: "Felhő feltöltés", description: "Felhőtárhelyekre egyetlen ZIP fájlt könnyebb feltölteni, mint sok különálló képet." },
      ],
      aboutSection: {
        title: "A ZIP csomagolásról",
        paragraphs: [
          "A ZIP a legelterjedtebb fájlcsomagoló formátum: több fájlt egyetlen tömörített archívumba fog össze. Minden operációs rendszer és eszköz natívan kezeli, így a megosztás problémamentes.",
          "Képfájlok esetén a ZIP tömörítés méretcsökkentő hatása minimális (mivel a képek már tömörítettek), de a csomagolás előnye a könnyű kezelés és megosztás.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Adj leíró nevet a ZIP fájlnak (pl. «projekt-fotok-2024.zip\») a könnyebb azonosítás érdekében." },
        { icon: "📂", tip: "Ha sok képet csomagolsz, előbb nevezd át őket egységesen a jobb rendezettségért." },
        { icon: "📧", tip: "E-mailhez figyeld a melléklet méretkorlátot – ha túl nagy a ZIP, oszd kisebb részekre." },
      ],
    },
  },

  // ── ÚJ KÉPESZKÖZÖK SEO TARTALOM ──────────────────────────────

  "heic-jpg": {
    introText: "Konvertáld iPhone és iPad HEIC képeidet JPG formátumba egyetlen kattintással, közvetlenül a böngésződben. A HEIC az Apple készülékek alapértelmezett formátuma, de Windows-on, Androidon és a legtöbb weboldalon nem nyílik meg – a JPG-re konvertálás biztosítja az univerzális kompatibilitást.",
    guide: [
      "1. Húzd be vagy tallózd ki a HEIC/HEIF fájl(oka)t az eszközbe.",
      "2. Az eszköz automatikusan dekódolja a HEIC fájlokat WebAssembly segítségével a böngésződben.",
      "3. Egyetlen fájlnál közvetlenül letölthető JPG-ként; több fájlnál ZIP archívumban kapod meg az összes konvertált képet.",
      "4. Ellenőrizd az eredményt és szükség esetén töltsd fel a következő adag HEIC fájlt.",
    ],
    faq: [
      { q: "Miért nem nyílik meg a HEIC képem Windows-on?", a: "A Windows alapértelmezetten nem tartalmaz HEIC/HEVC dekódert. A Microsoft Store-ból telepíthető bővítmény fizetős, de a HEIC→JPG konvertálással egyszerűbben megoldható a probléma, és a JPG minden rendszeren megnyílik." },
      { q: "Elvész a kép minősége a konvertálásnál?", a: "Az eszköz 90%-os JPG minőséggel konvertál, ami szemmel szinte észrevehetetlen különbséget jelent az eredetihez képest. A HEIC fájl részletgazdagsága megőrződik." },
      { q: "Biztonságos a HEIC konvertálás?", a: "Igen, a teljes feldolgozás a böngésződben történik WebAssembly technológiával. A képeid egyetlen bájtja sem kerül szerverre vagy harmadik félhez." },
      { q: "Megmaradnak az EXIF adatok (dátum, GPS) a konvertálás után?", a: "Igen, a HEIC fájlokban tárolt EXIF metaadatok – beleértve a készítés dátumát, GPS koordinátákat és kamerabeállításokat – átkerülnek a JPG fájlba." },
      { q: "Hány HEIC fájlt konvertálhatok egyszerre?", a: "Nincs korlát – egyszerre akár 50 vagy több HEIC fájlt is feltölthetsz. Tömeges konvertálásnál az eredmény ZIP archívumban kerül letöltésre." },
      { q: "Mobilon is működik az eszköz?", a: "Igen, az eszköz minden modern böngészőben működik, beleértve a mobil eszközöket is. iPhone-on közvetlenül a Fotók alkalmazásból is kiválaszthatod a képeket." },
    ],
    content: {
      howToSteps: [
        { title: "1. HEIC fájl kiválasztása", description: "Húzd be a HEIC/HEIF fájl(oka)t a feltöltési területre, vagy kattints a tallózás gombra. iPhone-ról közvetlenül is kiválaszthatod a képeket – az eszköz automatikusan felismeri a HEIC formátumot." },
        { title: "2. Automatikus konverzió", description: "Az eszköz azonnal elkezdi a feldolgozást WebAssembly-alapú HEIC dekóderrel. A konvertálás teljes egészében a böngésződben zajlik, szerverfeltöltés nélkül." },
        { title: "3. Előnézet és ellenőrzés", description: "Az elkészült JPG kép előnézetben megjelenik, ahol ellenőrizheted a minőséget és a fájlméretet az eredetihez képest." },
        { title: "4. Letöltés", description: "Egyetlen fájlnál JPG-ként töltsd le közvetlenül. Több fájlnál az összes konvertált kép ZIP archívumba csomagolva kerül letöltésre." },
      ],
      useCases: [
        { icon: "📱", title: "iPhone fotók megosztása", description: "Az iPhone-ról átmásolt fotók HEIC formátumban érkeznek, amit nem mindenki tud megnyitni. JPG-re konvertálva bármilyen eszközön, operációs rendszeren és alkalmazásban megtekinthetők." },
        { icon: "💼", title: "Önéletrajz és pályázat", description: "Hatósági rendszerek, HR szoftverek és online űrlapok általában JPG vagy PNG formátumot fogadnak el – HEIC-et szinte soha. A konvertálás biztosítja, hogy a feltöltés sikeres legyen." },
        { icon: "🖥️", title: "Windows kompatibilitás", description: "A Windows Photo Viewer, Paint és a legtöbb asztali szerkesztőprogram natívan nem kezeli a HEIC-et. JPG-re konvertálva azonnal megnyithatók és szerkeszthetők a képek." },
        { icon: "🌐", title: "Weboldalra feltöltés", description: "Blogok, webshopok, közösségi média platformok és CMS rendszerek túlnyomó többsége JPG-t vár – a HEIC→JPG konvertálás biztosítja a problémamentes feltöltést." },
      ],
      aboutSection: {
        title: "A HEIC formátumról és a konvertálásról",
        paragraphs: [
          "A HEIC (High Efficiency Image Coding) az Apple által 2017-ben, iOS 11-gyel bevezetett képformátum, amely az HEVC (H.265) videokodeken alapul. Fő előnye, hogy azonos képminőség mellett körülbelül feleakkora fájlméretet eredményez, mint a JPEG, így az iPhone és iPad tárhelyét hatékonyan kihasználja.",
          "A formátum legnagyobb hátránya az alacsony kompatibilitás: Windows alapértelmezetten nem tartalmaz HEIC dekódert, az Android rendszerek többsége sem kezeli, és a webalkalmazások, HR rendszerek, hatósági portálok szinte kizárólag JPG-t vagy PNG-t fogadnak el. Emiatt a HEIC→JPG konvertálás az egyik leggyakrabban keresett képkonverziós feladat.",
          "Az eszközünk WebAssembly technológiát használ a HEIC dekódoláshoz, ami azt jelenti, hogy a konvertálás teljes egészében a böngésződben történik – nem kell szoftvert telepítened, és a képeid nem kerülnek fel semmilyen szerverre.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Ha az iPhone-odon szeretnéd elkerülni a HEIC problémát a jövőben, a Beállítások → Kamera → Formátumok menüben átállíthatod a formátumot Legjobb kompatibilitásra (JPG)." },
        { icon: "📦", tip: "Egyszerre akár 50+ HEIC fájlt is feltölthetsz – az eredmény egyetlen ZIP archívumban kerül letöltésre, így könnyen kezelheted a nagy mennyiséget." },
        { icon: "🔍", tip: "A 90%-os JPG minőség az esetek túlnyomó többségében tökéletes eredményt ad. Ha kifejezetten nyomtatási célra kell a kép, fontold meg a HEIC→PNG konvertálást a veszteségmentes minőségért." },
        { icon: "📧", tip: "E-mailben történő küldéshez a JPG az ideális formátum: minden levelezőprogram kezeli, és a fájlméret is elfogadható marad." },
      ],
      formatComparison: {
        title: "HEIC vs JPG összehasonlítás",
        columns: ["Tulajdonság", "HEIC", "JPG"],
        rows: [
          { feature: "Tömörítési hatékonyság", values: ["Kiváló (HEVC alapú)", "Jó (DCT alapú)"] },
          { feature: "Fájlméret (azonos minőség)", values: ["~50%-kal kisebb", "Nagyobb"] },
          { feature: "Kompatibilitás", values: ["Apple eszközök", "Univerzális"] },
          { feature: "Átlátszóság (alfa)", values: ["Támogatja", "Nem támogatja"] },
          { feature: "EXIF metaadatok", values: ["Támogatja", "Támogatja"] },
        ],
      },
    },
  },

  "heic-png": {
    introText: "Alakítsd át iPhone és iPad HEIC képeidet veszteségmentes PNG formátumba, teljes képminőség és átlátszóság megőrzésével. A konvertálás a böngésződben történik WebAssembly technológiával – a képeid nem kerülnek szerverre, és szoftvertelepítés sem szükséges.",
    guide: [
      "1. Húzd be vagy tallózd ki a HEIC/HEIF fájl(oka)t az eszközbe.",
      "2. Az eszköz WebAssembly-alapú dekóderrel feldolgozza a fájlokat a böngésződben.",
      "3. Az elkészült PNG képek veszteségmentes minőségben, az alfa-csatorna megőrzésével készülnek el.",
      "4. Töltsd le az eredményt: egyetlen fájlnál közvetlenül, több fájlnál ZIP archívumban.",
    ],
    faq: [
      { q: "Mikor érdemes PNG-t választani JPG helyett HEIC konvertálásnál?", a: "Ha veszteségmentes minőségre van szükséged (pl. nyomtatáshoz, további szerkesztéshez), vagy ha a HEIC kép átlátszóságot tartalmaz. A PNG megőrzi a teljes képminőséget és az alfa-csatornát." },
      { q: "Biztonságos a HEIC→PNG konvertálás?", a: "Igen, a feldolgozás teljes egészében a böngésződben történik WebAssembly technológiával. Semmilyen kép nem kerül szerverre vagy harmadik félhez." },
      { q: "Nagyobb lesz a PNG fájl, mint az eredeti HEIC?", a: "Igen, a PNG veszteségmentes tömörítése miatt a fájlméret általában 3-5-ször nagyobb, mint a HEIC. Ez a veszteségmentes minőség ára – ha a fájlméret fontos, válaszd a HEIC→JPG konvertálást." },
      { q: "Megmaradnak az EXIF metaadatok?", a: "A PNG formátum korlátozottan támogatja az EXIF adatokat. Ha a készítés dátuma, GPS koordináták fontosak, a HEIC→JPG konvertálás jobb választás a metaadatok megőrzéséhez." },
      { q: "Hány HEIC fájlt konvertálhatok egyszerre?", a: "Nincs korlát – egyszerre több tucat fájlt is feldolgozhatsz. Tömeges konvertálásnál az eredmény ZIP archívumban kerül letöltésre." },
      { q: "Mobilon is működik?", a: "Igen, az eszköz minden modern böngészőben működik, beleértve iPhone, iPad és Android eszközöket is." },
    ],
    content: {
      howToSteps: [
        { title: "1. HEIC fájl kiválasztása", description: "Húzd be a HEIC/HEIF fájl(oka)t a feltöltési területre, vagy kattints a tallózás gombra. Az eszköz automatikusan felismeri a HEIC és HEIF kiterjesztéseket." },
        { title: "2. Automatikus dekódolás és konverzió", description: "A WebAssembly-alapú HEIC dekóder feldolgozza a fájlt és veszteségmentes PNG formátumba konvertálja, megőrizve az átlátszóságot (alfa-csatornát) is." },
        { title: "3. Előnézet ellenőrzése", description: "Az elkészült PNG kép előnézetben megjelenik, ahol összevetheted az eredetivel és ellenőrizheted a minőséget." },
        { title: "4. Letöltés", description: "Töltsd le a kész PNG fájlt közvetlenül, vagy több fájl esetén egyetlen ZIP archívumban az összes konvertált képet." },
      ],
      useCases: [
        { icon: "🎨", title: "Grafikai szerkesztés", description: "A PNG veszteségmentes formátum ideális a további szerkesztéshez Photoshopban, GIMP-ben vagy Canva-ban – a mentéseknél nem romlik a minőség." },
        { icon: "🖨️", title: "Nyomtatás és archiválás", description: "Nyomtatási célra a veszteségmentes PNG biztosítja a maximális képminőséget, szemben a JPG veszteséges tömörítésével." },
        { icon: "🏷️", title: "Logók és átlátszó képek", description: "Ha a HEIC kép átlátszó elemeket tartalmaz (pl. logó, grafika), a PNG megőrzi az alfa-csatornát – a JPG nem tudja ezt." },
        { icon: "📋", title: "Dokumentumokba illesztés", description: "Prezentációkba, Word dokumentumokba és PDF-ekbe a PNG formátum biztosítja a tiszta éleket és az éles szöveget." },
      ],
      aboutSection: {
        title: "HEIC → PNG konverzió részletesen",
        paragraphs: [
          "A HEIC (High Efficiency Image Coding) az Apple által 2017-ben bevezetett képformátum, amely az HEVC (H.265) videokodeken alapul. Kiváló tömörítési hatékonysága miatt az iPhone és iPad alapértelmezett képformátuma, de a kompatibilitása korlátozott: Windows, Android és a legtöbb webalkalmazás nem kezeli natívan.",
          "A PNG (Portable Network Graphics) veszteségmentes tömörítést alkalmaz, így ideális minden olyan felhasználáshoz, ahol a képminőség nem kompromisszálható: nyomtatás, grafikai szerkesztés, logók és átlátszó hátterű képek. A PNG-t szinte minden eszköz, szoftver és platform támogatja.",
          "A HEIC→PNG konvertálás a legjobb választás, ha a veszteségmentes minőség és/vagy az átlátszóság megőrzése fontos. Ha a fájlméret a prioritás, a HEIC→JPG konvertálás hatékonyabb megoldás.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Ha nem szükséges veszteségmentes minőség és az átlátszóság sem fontos, válaszd inkább a HEIC→JPG konvertálást – a JPG fájlok lényegesen kisebbek." },
        { icon: "🖼️", tip: "A PNG különösen alkalmas éles széleket, szöveget vagy vonalas grafikát tartalmazó képekhez, ahol a JPG tömörítés műtermékeket okozhat." },
        { icon: "📦", tip: "Tömeges konvertálásnál az eredmény automatikusan ZIP archívumba kerül, ami megkönnyíti a letöltést és a rendszerezést." },
        { icon: "⚠️", tip: "Figyelj a fájlméretre: egy 12 MP-es iPhone fotó PNG-ként akár 15-25 MB is lehet, míg HEIC-ként csak 2-4 MB." },
      ],
      formatComparison: {
        title: "HEIC vs PNG összehasonlítás",
        columns: ["Tulajdonság", "HEIC", "PNG"],
        rows: [
          { feature: "Tömörítés típusa", values: ["Veszteséges (HEVC)", "Veszteségmentes"] },
          { feature: "Fájlméret (12 MP fotó)", values: ["~2-4 MB", "~15-25 MB"] },
          { feature: "Átlátszóság (alfa)", values: ["Támogatja", "Támogatja"] },
          { feature: "Kompatibilitás", values: ["Apple eszközök", "Univerzális"] },
          { feature: "Szerkesztő támogatás", values: ["Korlátozott", "Szinte minden szoftver"] },
        ],
      },
    },
  },

  "jpg-avif": {
    introText: "Konvertáld JPG képeidet a legmodernebb AVIF formátumba, és érj el akár 50%-kal kisebb fájlméretet azonos vizuális minőség mellett. Az AVIF az AV1 videokodeken alapul, és 2024 óta minden modern böngésző stabilan támogatja. A konvertálás a böngésződben történik, szerver nélkül.",
    guide: [
      "1. Húzd be vagy tallózd ki a konvertálni kívánt JPG/JPEG fájl(oka)t.",
      "2. Állítsd be a kívánt minőséget a CQ (Constant Quality) csúszkával – alacsonyabb érték jobb minőséget jelent.",
      "3. Kattints a «Konvertálás» gombra – az AVIF fájl a böngésződben készül el.",
      "4. Töltsd le az elkészült AVIF képet, vagy konvertálj további fájlokat.",
    ],
    faq: [
      { q: "Az AVIF minden böngészőben működik?", a: "Igen, 2024 óta az AVIF Baseline státuszt ért el: Chrome, Firefox, Safari 16+, Edge és az összes modern mobil böngésző stabilan támogatja. A globális böngészőtámogatás meghaladja a 95%-ot." },
      { q: "Mekkora méretmegtakarítás várható JPG→AVIF konvertálásnál?", a: "Tipikusan 40-50%-os méretcsökkenés érhető el azonos szubjektív minőség mellett. Ez azt jelenti, hogy egy 500 KB-os JPG fájl AVIF-ként akár 250 KB alá csökkenthető." },
      { q: "Mi az a CQ (Constant Quality) érték?", a: "A CQ az AVIF tömörítés minőségi paramétere, 1-63 közötti skálán. Az alacsonyabb érték jobb minőséget (és nagyobb fájlt), a magasabb érték erősebb tömörítést jelent. Webes képekhez a 30-40 közötti tartomány ajánlott." },
      { q: "Biztonságos a konvertálás?", a: "Igen, a teljes feldolgozás a böngésződben történik. A képeid nem kerülnek szerverre – az adataid biztonságban vannak." },
      { q: "Miért jobb az AVIF a WebP-nél?", a: "Az AVIF az AV1 kodek fejlettebb tömörítési algoritmusait használja, ami azonos minőség mellett 20-25%-kal kisebb fájlméretet eredményez, mint a WebP. Emellett jobb színhűséget és szélesebb színskálát (HDR) is támogat." },
      { q: "Használhatom az AVIF-et e-mailben vagy dokumentumokban?", a: "Az AVIF elsősorban webes formátum. E-mailekhez és dokumentumokhoz továbbra is a JPG vagy PNG a biztonságosabb választás a szélesebb kompatibilitás miatt." },
    ],
    content: {
      howToSteps: [
        { title: "1. JPG fájl kiválasztása", description: "Húzd be a JPG/JPEG képe(ke)t a feltöltési területre, vagy kattints a tallózás gombra. Tömeges konvertálás is lehetséges – egyszerre több fájlt is feldolgozhatsz." },
        { title: "2. Minőség (CQ) beállítása", description: "Állítsd be a Constant Quality értéket az 1-63 skálán. Webes képekhez a 30-40 közötti tartomány ideális, fotó archívumhoz 20-30 ajánlott a magasabb minőségért." },
        { title: "3. Konvertálás", description: "Kattints a konvertálás gombra – az AVIF enkóder a böngésződben dolgozza fel a képet. A méretcsökkenés azonnal látható az előnézetben." },
        { title: "4. Letöltés és felhasználás", description: "Töltsd le az AVIF fájlt, és használd közvetlenül a weboldaladban img vagy picture elemmel. A <picture> elemmel JPG fallback-et is megadhatsz régebbi böngészőkhöz." },
      ],
      useCases: [
        { icon: "⚡", title: "Core Web Vitals optimalizálás", description: "Az AVIF a leghatékonyabb módszer a Largest Contentful Paint (LCP) javítására – a kisebb képfájlok gyorsabb betöltést és jobb Google rangsorolást eredményeznek." },
        { icon: "🛒", title: "E-commerce termékképek", description: "Webshopokban több száz termékkép AVIF-re konvertálásával drasztikusan csökkenthető az oldal betöltési ideje és a sávszélesség-költség." },
        { icon: "📱", title: "Mobil felhasználói élmény", description: "Mobilhálózaton a kisebb AVIF fájlok lényegesen gyorsabban töltődnek be, javítva a felhasználói élményt és csökkentve az adatforgalmat." },
        { icon: "💰", title: "CDN és tárhelyköltség csökkentés", description: "A 40-50%-kal kisebb fájlméretek jelentős megtakarítást jelentenek CDN sávszélességben és tárhelyköltségben, különösen nagy forgalmú weboldalaknál." },
      ],
      aboutSection: {
        title: "Az AVIF formátumról részletesen",
        paragraphs: [
          "Az AVIF (AV1 Image File Format) az Alliance for Open Media által fejlesztett, royalty-free képformátum, amely az AV1 videokodek technológiáján alapul. A WebP utódjának tekinthető: azonos vizuális minőség mellett általában 20-25%-kal jobb tömörítést nyújt, mint a WebP, és 40-50%-kal kisebb fájlokat eredményez, mint a hagyományos JPEG.",
          "Az AVIF támogatja a veszteséges és veszteségmentes tömörítést, az átlátszóságot (alfa-csatorna), az animációkat és a HDR (High Dynamic Range) színskálát is. A formátum 2024-ben elérte a Baseline státuszt, ami azt jelenti, hogy minden modern böngésző – Chrome, Firefox, Safari, Edge – stabilan támogatja.",
          "A JPG→AVIF konvertálás különösen ajánlott webfejlesztők számára, akik a Core Web Vitals metrikákat és a Google PageSpeed pontszámot szeretnék javítani. A <picture> HTML elem használatával AVIF-et szolgálhatsz ki modern böngészőknek, miközben JPG fallback-et biztosítasz régebbi klienseknek.",
        ],
      },
      formatComparison: {
        title: "JPG vs WebP vs AVIF összehasonlítás",
        columns: ["Tulajdonság", "JPG", "WebP", "AVIF"],
        rows: [
          { feature: "Átlagos fájlméret (fotó)", values: ["~540 KB", "~350 KB", "~210 KB"] },
          { feature: "Tömörítési hatékonyság", values: ["Alapszint", "25-35% jobb", "40-50% jobb"] },
          { feature: "Átlátszóság", values: ["Nem", "Igen", "Igen"] },
          { feature: "HDR támogatás", values: ["Nem", "Korlátozott", "Teljes"] },
          { feature: "Böngészőtámogatás", values: ["Univerzális", "Modern (2020+)", "Modern (2024+)"] },
        ],
      },
      tips: [
        { icon: "💡", tip: "Webes használathoz a 30-40 közötti CQ érték a legjobb kompromisszum: szinte észrevehetetlen különbség a JPG-hez képest, de 40-50%-kal kisebb fájl." },
        { icon: "🔄", tip: "Használd a HTML <picture> elemet AVIF és JPG fallback kombinálásához: így minden böngésző a legjobb támogatott formátumot kapja." },
        { icon: "📊", tip: "A Google PageSpeed Insights és a Lighthouse kifejezetten ajánlja az AVIF formátum használatát a teljesítmény maximalizálásához." },
        { icon: "⚠️", tip: "Az AVIF kódolás számításigényesebb, mint a JPG – nagy fájlok konvertálása néhány másodpercet igényelhet a böngészőben." },
      ],
    },
  },

  "png-avif": {
    introText: "Konvertáld PNG képeidet a modern AVIF formátumba az átlátszóság (alfa-csatorna) teljes megőrzésével. Az AVIF veszteségmentes módban is 10-20%-kal kisebb fájlméretet ér el a PNG-nél, veszteséges módban pedig akár 80%-os méretcsökkenés is elérhető. A konvertálás a böngésződben történik.",
    guide: [
      "1. Húzd be vagy tallózd ki a konvertálni kívánt PNG fájl(oka)t.",
      "2. Válaszd ki a tömörítési módot: veszteséges (kisebb fájl) vagy veszteségmentes (tökéletes minőség).",
      "3. Veszteséges mód esetén állítsd be a CQ minőségi értéket az igényeidnek megfelelően.",
      "4. Kattints a «Konvertálás» gombra, majd töltsd le az AVIF fájlt.",
    ],
    faq: [
      { q: "Az AVIF megőrzi a PNG átlátszóságát?", a: "Igen, az AVIF teljes alfa-csatorna támogatással rendelkezik, így az átlátszó háttér, félátlátszó elemek és rétegek tökéletesen megőrződnek a konvertálás során." },
      { q: "Melyik módot válasszam: veszteséges vagy veszteségmentes?", a: "Webes képekhez a veszteséges mód ajánlott – akár 80%-os méretcsökkenést ér el minimális, szabad szemmel észrevehetetlen minőségveszteséggel. Nyomtatáshoz vagy archíváláshoz válaszd a veszteségmentest." },
      { q: "Biztonságos a konvertálás?", a: "Igen, a feldolgozás teljes egészében a böngésződben történik. A képeid nem kerülnek szerverre, és semmilyen adat nem hagyja el a gépedet." },
      { q: "Mekkora méretcsökkenés várható PNG→AVIF konvertálásnál?", a: "Veszteségmentes módban 10-20%, veszteséges módban 60-80% méretcsökkenés érhető el. Az eredmény függ a kép típusától és a beállított minőségi szinttől." },
      { q: "Minden böngésző támogatja az AVIF-et?", a: "Igen, 2024 óta az AVIF Baseline státuszt ért el: Chrome, Firefox, Safari 16+, Edge és minden modern mobil böngésző stabilan támogatja." },
      { q: "Mobilon is működik az eszköz?", a: "Igen, az eszköz teljesen reszponzív és minden modern böngészőben elérhető mobilon és asztali gépen egyaránt." },
    ],
    content: {
      howToSteps: [
        { title: "1. PNG fájl feltöltése", description: "Húzd be a PNG képet a feltöltési területre, vagy kattints a tallózás gombra. Az átlátszó hátterű képek is támogatottak – az alfa-csatorna automatikusan megőrződik." },
        { title: "2. Tömörítési mód kiválasztása", description: "Válassz veszteséges (lossy) módot a maximális méretcsökkenéshez, vagy veszteségmentes (lossless) módot a tökéletes minőség megőrzéséhez. Veszteséges módnál a CQ csúszkával finomhangolhatod a minőséget." },
        { title: "3. Konvertálás", description: "Kattints a konvertálás gombra – az AVIF enkóder a böngésződben dolgozza fel a képet. Az előnézetben azonnal láthatod az eredményt és a méretcsökkenést." },
        { title: "4. Letöltés", description: "Töltsd le az elkészült AVIF fájlt, és használd közvetlenül weboldaladban, alkalmazásodban vagy tárold el hatékonyabb formátumban." },
      ],
      useCases: [
        { icon: "🖼️", title: "UI elemek és ikonok", description: "Átlátszó hátterű UI elemek, gombok és ikonok méretét drasztikusan csökkentheted AVIF-fel, miközben az alfa-csatorna tökéletesen megmarad." },
        { icon: "🎨", title: "Logók és brand grafika", description: "Vektoros exportból készült PNG logókat és brand elemeket hatékonyan tömörítheted AVIF-be a webes megjelenítéshez." },
        { icon: "🌐", title: "Weboldalak teljesítménye", description: "A PNG→AVIF váltás jelentősen csökkenti az oldalbetöltési időt, különösen átlátszó hátterű hero képek és banner-ek esetén." },
        { icon: "📊", title: "Infografikák és diagramok", description: "Szöveget és grafikát tartalmazó infografikák AVIF-ben jóval kisebbek, miközben a szöveg élessége megmarad." },
      ],
      aboutSection: {
        title: "PNG és AVIF formátumok összehasonlítása",
        paragraphs: [
          "A PNG (Portable Network Graphics) a web egyik alappillére: veszteségmentes tömörítéssel és átlátszóság-támogatással az ikonok, logók és grafikai elemek standard formátuma. Hátránya a viszonylag nagy fájlméret, ami különösen fotóknál és nagy felbontású képeknél probléma.",
          "Az AVIF (AV1 Image File Format) a legmodernebb képformátum, amely az AV1 videokodek technológiáján alapul. Veszteségmentes módban is 10-20%-kal kisebb fájlokat eredményez a PNG-nél, veszteséges módban pedig a méretkülönbség 60-80%-ot is elérhet. Támogatja az átlátszóságot, a HDR színskálát és az animációkat is.",
          "A PNG→AVIF konvertálás ideális webfejlesztők számára, akik csökkenteni szeretnék az átlátszó képek méretét a Core Web Vitals javítása érdekében. A HTML <picture> elem használatával AVIF-et szolgálhatsz ki modern böngészőknek, miközben PNG fallback-et biztosítasz.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Logóknál és ikonoknál a veszteségmentes mód ajánlott – így az éles élek és a szöveg tökéletesen megőrződik, a fájlméret pedig 10-20%-kal kisebb lesz a PNG-nél." },
        { icon: "📊", tip: "Fotószerű PNG-knél a veszteséges mód akár 80%-os méretcsökkenést eredményez szinte észrevehetetlen minőségkülönbséggel." },
        { icon: "🔄", tip: "Használd a <picture> elemet a weboldaladban: <source type='image/avif'> és <img src='fallback.png'> kombinációval minden böngésző a legjobb formátumot kapja." },
        { icon: "⚠️", tip: "Veszteséges módban a nagyon finom átmenetek és gradiensek enyhe sávosodást mutathatnak – ilyen esetben használj magasabb minőségi beállítást." },
      ],
      formatComparison: {
        title: "PNG vs AVIF összehasonlítás",
        columns: ["Tulajdonság", "PNG", "AVIF"],
        rows: [
          { feature: "Tömörítés típusa", values: ["Veszteségmentes", "Veszteségmentes + veszteséges"] },
          { feature: "Átlagos fájlméret", values: ["Nagy", "10-80%-kal kisebb"] },
          { feature: "Átlátszóság (alfa)", values: ["Támogatja", "Támogatja"] },
          { feature: "HDR támogatás", values: ["Nem", "Igen"] },
          { feature: "Böngészőtámogatás", values: ["Univerzális", "Modern böngészők (2024+)"] },
        ],
      },
    },
  },

  "kep-base64": {
    introText: "Alakítsd át képeidet Base64 kódolt szöveggé, amelyet közvetlenül beágyazhatsz HTML, CSS vagy JavaScript fájlokba külön HTTP kérés nélkül. Kis ikonokhoz, e-mail sablonokhoz és inline CSS háttérképekhez ideális megoldás – a konvertálás a böngésződben történik.",
    guide: [
      "1. Húzd be vagy tallózd ki a kódolni kívánt képet (JPG, PNG, WebP, SVG vagy GIF).",
      "2. Válaszd ki a kimeneti formátumot: HTML img tag, CSS background-image vagy nyers data URI.",
      "3. Az eszköz azonnal generálja a Base64 kódot az előnézettel együtt.",
      "4. Másold a generált kódot a vágólapra egyetlen kattintással, és illeszd be a projektedbe.",
    ],
    faq: [
      { q: "Mikor érdemes Base64 kódolást használni képeknél?", a: "Elsősorban 5-50 KB alatti kis képeknél, ikonoknál, logóknál és dekoratív elemeknél érdemes, ahol az extra HTTP kérés elkerülése fontosabb, mint a fájlméret-növekedés. E-mail sablonokban különösen hasznos, mivel a legtöbb levelezőkliens blokkolja a külső képeket." },
      { q: "Mi a Base64 kódolás hátránya?", a: "A Base64 kódolás 33%-kal növeli a fájlméretet a bináris eredetihez képest. Emellett a beágyazott képek nem cachelhetők külön a böngésző által, és a nagy Base64 blokkok lassíthatják a HTML/CSS feldolgozását." },
      { q: "Biztonságos az eszköz?", a: "Igen, a Base64 kódolás teljes egészében a böngésződben történik. A képed nem kerül szerverre – a JavaScript FileReader API végzi a konvertálást." },
      { q: "Milyen képformátumokat támogat?", a: "JPG, PNG, WebP, SVG és GIF formátumú képeket egyaránt Base64-re kódolhatsz. A kimeneti data URI automatikusan tartalmazza a helyes MIME típust." },
      { q: "Mekkora képet érdemes Base64-ként beágyazni?", a: "Az ajánlott maximum 5-50 KB. Ennél nagyobb képeknél a 33%-os méretfelár és a cachelhetetlenség miatt hatékonyabb a külön fájlként való betöltés." },
      { q: "Hogyan használhatom a Base64 képet HTML-ben?", a: "A generált data URI-t közvetlenül beillesztheted az <img> tag src attribútumába, vagy CSS-ben a background-image: url() értékeként. Az eszköz mindkét formátumban előállítja a kódot." },
    ],
    content: {
      howToSteps: [
        { title: "1. Kép feltöltése", description: "Húzd be a képet a feltöltési területre, vagy kattints a tallózás gombra. Támogatott formátumok: JPG, PNG, WebP, SVG és GIF – a legtöbb webes képformátum." },
        { title: "2. Kimeneti formátum kiválasztása", description: "Válaszd ki, milyen formátumban szeretnéd a Base64 kódot: HTML <img> tag (beilleszthető HTML-be), CSS background-image (háttérképként használható), vagy nyers data URI (bármilyen célra)." },
        { title: "3. Előnézet és ellenőrzés", description: "Az eszköz azonnal megjeleníti a generált kódot és az előnézeti képet. Ellenőrizd, hogy a kép megfelelően renderelődik-e a Base64 verzióban." },
        { title: "4. Másolás a vágólapra", description: "Kattints a másolás gombra a generált kód vágólapra másolásához, majd illeszd be közvetlenül a HTML, CSS vagy JavaScript fájlodba." },
      ],
      useCases: [
        { icon: "📧", title: "E-mail sablonok", description: "E-mail kliensek gyakran blokkolják a külső képeket. Base64-ként beágyazott képek minden levelezőprogramban azonnal megjelennek, külön letöltés nélkül." },
        { icon: "⚡", title: "Kritikus above-the-fold képek", description: "A hajtás feletti kis képeket (logó, ikonok) Base64-ként beágyazva elkerülheted a render-blocking HTTP kéréseket és gyorsíthatod az oldal első megjelenítését." },
        { icon: "🎨", title: "CSS sprite alternatíva", description: "Kis ikonokat és dekoratív elemeket CSS-ben Base64-ként beágyazva egyszerűsítheted a build pipeline-t és csökkentheted a HTTP kérések számát." },
        { icon: "📦", title: "Önálló HTML dokumentumok", description: "Egyetlen HTML fájlba ágyazott képekkel önálló, hordozható dokumentumokat hozhatsz létre, amelyeket offline is meg lehet nyitni." },
      ],
      aboutSection: {
        title: "A Base64 képkódolásról részletesen",
        paragraphs: [
          "A Base64 egy kódolási séma, amely bináris adatot ASCII szövegként ábrázol. A képek esetében ez azt jelenti, hogy a kép teljes tartalma szöveges formában beágyazható HTML-be, CSS-be vagy JavaScript-be, egy ún. data URI segítségével (pl. data:image/png;base64,iVBOR...).",
          "A beágyazott képek előnye, hogy nem igényelnek külön HTTP kérést, így csökkentik a hálózati overhead-et. Ez kis képeknél (5-50 KB) nettó előnyt jelent, de nagyobb fájloknál a 33%-os méretfelár és a cachelhetetlenség miatt a külön fájlként való betöltés hatékonyabb.",
          "A modern webfejlesztésben a Base64 kódolás elsősorban e-mail sablonoknál, kritikus CSS-ben (above-the-fold képek), valamint önálló HTML dokumentumoknál és prototípusoknál terjedt el. Build eszközök (Webpack, Vite) automatikusan is Base64-re alakíthatják a kis képeket.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Csak 5-50 KB alatti képeknél érdemes Base64-et használni. Ennél nagyobb fájloknál a méretfelár és a cachelhetetlenség több hátrányt okoz, mint amennyit az HTTP kérés megtakarítása ér." },
        { icon: "📧", tip: "E-mail sablonokban a Base64 a legmegbízhatóbb módszer a képek megjelenítésére, mivel a legtöbb levelezőkliens alapértelmezetten blokkolja a külső képeket." },
        { icon: "🔧", tip: "Modern build eszközök (Vite, Webpack) automatikusan Base64-re konvertálják a kis képeket – érdemes ellenőrizni, hogy a build konfigurációd nem duplikálja-e a munkát." },
        { icon: "⚠️", tip: "Ne ágyazz be nagy képeket Base64-ként: a HTML/CSS fájl mérete felduzzad, ami lassítja a feldolgozást és lehetetlenné teszi a külön cachelést." },
      ],
    },
  },

  "kep-ico": {
    introText: "Készíts professzionális favicon.ico fájlt weboldaladhoz PNG, JPG vagy WebP képből, közvetlenül a böngésződben. Az eszköz automatikusan legenerálja a szükséges méreteket (16×16, 32×32, 48×48 px) és egyetlen ICO fájlba csomagolja őket a maximális kompatibilitás érdekében.",
    guide: [
      "1. Húzd be vagy tallózd ki a forrásképet (PNG, JPG vagy WebP – négyzetes, átlátszó hátterű PNG az ideális).",
      "2. Az eszköz automatikusan átméretezi és legenerálja a 16×16, 32×32 és 48×48 pixeles verziókat.",
      "3. Ellenőrizd az egyes méreteket az előnézetben – győződj meg róla, hogy a kis méretben is felismerhető az ikon.",
      "4. Töltsd le a favicon.ico fájlt és helyezd el a weboldalad gyökérmappájába.",
    ],
    faq: [
      { q: "Milyen méretű és formátumú forrásképet használjak?", a: "Legalább 64×64 px szükséges, de az ideális a 512×512 px négyzetes kép. PNG formátum ajánlott átlátszó háttérrel – így a favicon minden böngészőben és operációs rendszeren jól mutat." },
      { q: "Szükséges-e a favicon.ico a weboldalamhoz?", a: "Igen, a favicon fontos a felhasználói élmény és a brand felismerhetőség szempontjából. A böngészők fülein, könyvjelzőkben és a keresőtalálatokban is megjelenik. Modern böngészők PNG favicont is elfogadnak, de az ICO biztosítja a maximális kompatibilitást, beleértve a régebbi böngészőket is." },
      { q: "Hogyan illeszthetem be a favicon.ico-t a weboldalamba?", a: "Helyezd a favicon.ico fájlt a weboldal gyökérmappájába (a domain gyökerébe). A böngészők automatikusan keresik itt. Emellett a HTML fejlécben is hivatkozhatsz rá: <link rel='icon' href='/favicon.ico'>." },
      { q: "Biztonságos az eszköz?", a: "Igen, a teljes feldolgozás a böngésződben történik Canvas API segítségével. A képed nem kerül szerverre." },
      { q: "Milyen méreteket tartalmaz az ICO fájl?", a: "Az ICO fájl három méretet tartalmaz: 16×16 px (böngészőfül), 32×32 px (könyvjelzők, tálca) és 48×48 px (Windows asztali ikon). Ezeket az eszköz automatikusan generálja a forrásképből." },
      { q: "Támogatja az átlátszó hátteret?", a: "Igen, ha a forrásképed PNG formátumú és átlátszó háttérrel rendelkezik, az átlátszóság megőrződik az ICO fájlban is." },
    ],
    content: {
      howToSteps: [
        { title: "1. Forráskép feltöltése", description: "Húzd be a képet a feltöltési területre, vagy kattints a tallózás gombra. PNG formátum ajánlott átlátszó háttérrel. A négyzetes (1:1 képarányú) kép az ideális – nem négyzetes képek automatikusan vágásra kerülnek." },
        { title: "2. Automatikus méretgenerálás", description: "Az eszköz automatikusan elkészíti a 16×16, 32×32 és 48×48 pixeles verziókat intelligens átméretezéssel, majd egyetlen ICO fájlba csomagolja őket." },
        { title: "3. Előnézet ellenőrzése", description: "Nézd meg az előnézetben, hogyan fest az ikon a különböző méretekben. Különösen a 16×16 px-es méret fontos – győződj meg róla, hogy a böngészőfülön is felismerhető marad." },
        { title: "4. Letöltés és beillesztés", description: "Töltsd le a favicon.ico fájlt, és helyezd el a weboldalad gyökérmappájába. A HTML fejlécben hivatkozz rá: <link rel='icon' href='/favicon.ico'>." },
      ],
      useCases: [
        { icon: "🌐", title: "Weboldal favicon", description: "A böngésző fülén, könyvjelzőkben és a keresőtalálatokban megjelenő ikon – a weboldalad vizuális azonosítója, ami segíti a felhasználókat a böngészőfülek közötti navigálásban." },
        { icon: "🖥️", title: "Windows alkalmazás ikon", description: "Desktop alkalmazások, parancsikonok és Windows tálca ikonjaként is felhasználhatod az ICO fájlt." },
        { icon: "📱", title: "PWA és mobil ikon", description: "Progressive Web Appok (PWA) és mobil böngészők kezdőképernyő ikonjaként is fontos a favicon – kiegészítve a manifest.json-ban megadott nagyobb méretű ikonokkal." },
        { icon: "🏢", title: "Brand azonosítás", description: "A favicon a márkád vizuális megjelenítése a böngészőfülön – segíti a felismerhetőséget és professzionális megjelenést kölcsönöz a weboldaladnak." },
      ],
      aboutSection: {
        title: "Az ICO formátumról és a faviconokról",
        paragraphs: [
          "Az ICO (Windows Icon) formátumot a Microsoft fejlesztette ki, és egyetlen fájlban több különböző méretű képet tárol. A webfejlesztésben elsősorban faviconként (favorites icon) használják: ez a kis ikon jelenik meg a böngésző fülén, a könyvjelzőknél és a keresőtalálatokban.",
          "A modern böngészők PNG és SVG formátumú favicont is elfogadnak, de az ICO formátum biztosítja a legszélesebb kompatibilitást, beleértve a régebbi böngészőket (Internet Explorer) és az operációs rendszereket. Az ICO előnye, hogy egyetlen fájlban több méretet tartalmaz, így a böngésző mindig az optimális méretet választja.",
          "A favicon fontossága nem csak esztétikai: a keresőoptimalizálásban (SEO) is szerepet játszik, mivel a Google keresőtalálatokban is megjeleníti a weboldal faviconját. Egy professzionális, jól felismerhető favicon növeli a kattintási arányt (CTR) és erősíti a márkád online jelenlétét.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Használj egyszerű, kontrasztos dizájnt a faviconhoz – a 16×16 pixeles méretben a finom részletek elvesznek, ezért a felismerhetőség a legfontosabb." },
        { icon: "🎨", tip: "Átlátszó hátterű PNG forrásképet használj, hogy a favicon minden böngészőtémában (világos/sötét mód) jól mutasson." },
        { icon: "📏", tip: "Az ideális forráskép 512×512 px vagy nagyobb, négyzetes, egyszerű grafikával. A túl részletes fotók vagy szövegek kis méretben olvashatatlanok lesznek." },
        { icon: "🔧", tip: "A favicon.ico-n kívül érdemes apple-touch-icon (180×180 px PNG) és manifest.json ikonokat (192×192, 512×512 px) is készítened a teljes lefedettséghez." },
      ],
    },
  },

  "atmeterezas-kb": {
    introText: "Méretezd át képeidet pontos fájlméret-korláthoz: add meg a célméretet kilobájtban (KB) vagy megabájtban (MB), és az eszköz bináris kereséssel automatikusan megtalálja az optimális JPEG minőséget. Ideális álláspályázatokhoz, hatósági feltöltésekhez és minden olyan helyzethez, ahol pontos fájlméret-korlátot kell teljesíteni.",
    guide: [
      "1. Húzd be vagy tallózd ki a képet (JPG, PNG vagy WebP).",
      "2. Add meg a célméretet KB-ban vagy MB-ban (pl. 500 KB, 2 MB).",
      "3. Kattints a «Konvertálás» gombra – az eszköz bináris kereséssel megkeresi az optimális minőséget.",
      "4. Ellenőrizd az eredményt az előnézetben, majd töltsd le a pontos méretű képet.",
    ],
    faq: [
      { q: "Mennyire pontos a célméret elérése?", a: "Az eszköz ±5%-os pontossággal találja el a megadott célméretet. A bináris keresési algoritmus iteratívan szűkíti a keresési teret, amíg az optimális JPEG minőségi értéket meg nem találja." },
      { q: "Elvész a kép minősége a méretezésnél?", a: "Az eszköz a minimálisan szükséges minőségveszteséggel dolgozik: mindig a lehető legmagasabb JPEG minőséget választja, ami még belefér a megadott méretkorlátba. Így a képminőség a lehető legjobb marad." },
      { q: "Biztonságos az eszköz használata?", a: "Igen, a teljes feldolgozás a böngésződben történik. A képed nem kerül szerverre – a bináris keresés és a JPEG kódolás helyben, JavaScript-tel zajlik." },
      { q: "Milyen fájlformátumokat fogad el bemenetként?", a: "JPG, PNG és WebP formátumú képeket tölthetsz fel. A kimenet mindig JPEG formátumú, mivel ez a leghatékonyabb a célméretre tömörítéshez." },
      { q: "Mi a minimális célméret, amit megadhatok?", a: "A minimális célméret a kép méretétől és tartalmától függ. Nagyon alacsony célméretnél a képminőség jelentősen romolhat. Az eszköz figyelmeztet, ha a célméret irreálisan alacsony." },
      { q: "Mobilon is működik?", a: "Igen, az eszköz minden modern böngészőben és mobileszközön tökéletesen működik. A feldolgozás helyben történik, így nem szükséges erős internetkapcsolat." },
    ],
    content: {
      howToSteps: [
        { title: "1. Kép feltöltése", description: "Húzd be a képet a feltöltési területre, vagy kattints a tallózás gombra. JPG, PNG és WebP formátumú képeket egyaránt elfogad az eszköz." },
        { title: "2. Célméret megadása", description: "Add meg a maximálisan elfogadható fájlméretet KB-ban vagy MB-ban. Például: álláspályázathoz 2000 KB (2 MB), útlevélképhez 500 KB, hatósági feltöltéshez az adott rendszer által megkövetelt maximumot." },
        { title: "3. Automatikus optimalizálás", description: "Az eszköz bináris kereséssel iteratívan teszteli a különböző JPEG minőségi szinteket, és megtalálja a lehető legmagasabb minőséget, ami még belefér a megadott méretkorlátba." },
        { title: "4. Ellenőrzés és letöltés", description: "Az előnézetben ellenőrizd az eredményt: az eszköz megjeleníti a pontos fájlméretet, a minőségi szintet és az eredetihez képesti csökkenést. Elégedettség esetén töltsd le a képet." },
      ],
      useCases: [
        { icon: "💼", title: "Álláspályázat és önéletrajz", description: "HR rendszerek, állásportálok (Profession.hu, LinkedIn) és online pályázati felületek gyakran maximálisan 2 MB-os fájlméretet fogadnak el profilképhez és dokumentumokhoz." },
        { icon: "🏛️", title: "Hatósági és hivatalos feltöltések", description: "Kormányzati portálok (Ügyfélkapu, NEAK, NAV) és hatósági rendszerek sokszor szigorú méretkorlátot alkalmaznak – pl. útlevélkép max 500 KB, okmánycsatolmány max 1 MB." },
        { icon: "📋", title: "Online űrlapok és regisztráció", description: "Sok weboldal, fórum és közösségi platform korlátoz a feltölthető képek méretében. Az eszközzel pontosan a megengedett méretre tömörítheted a képed." },
        { icon: "📧", title: "E-mail mellékletek", description: "Vállalati levelezőrendszerek gyakran 10-25 MB-os mellékletkorlátozást alkalmaznak. Több kép esetén érdemes egyenként méretezni a képeket a korlát betartásához." },
      ],
      aboutSection: {
        title: "Hogyan működik a KB-ra méretezés?",
        paragraphs: [
          "Az eszköz bináris keresési algoritmust alkalmaz a JPEG minőségi skálán (0.01–1.0). Első lépésben a skála közepén próbálkozik, majd az eredmény alapján szűkíti a keresési tartományt: ha a kapott fájl túl nagy, alacsonyabb minőséget próbál; ha túl kicsi, magasabbat. Néhány iteráció után megtalálja az optimális értéket.",
          "A módszer előnye, hogy mindig a lehető legmagasabb JPEG minőséget választja, ami még belefér a megadott méretkorlátba. Így a képminőség nem romlik jobban, mint amennyire feltétlenül szükséges. Az algoritmus tipikusan 6-8 iteráció után konvergál, ami a böngészőben pillanatok alatt megtörténik.",
          "A célméretre optimalizálás különösen hasznos olyan helyzetekben, ahol a feltöltő rendszer pontos fájlméret-korlátot alkalmaz – ilyenkor a hagyományos tömörítéssel próbálgatni kellene a megfelelő minőségi szintet, amit ez az eszköz automatikusan megold.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Állítsd be a célméretet 5-10%-kal a korlát alá – így biztosan belefér a feltöltésbe, és a minőség sem romlik jelentősen." },
        { icon: "📏", tip: "Ha a képminőség a célmérettel nagyon alacsony, fontold meg az átméretezés eszköz használatát is: kisebb pixelméret mellett a tömörítés is hatékonyabb." },
        { icon: "📊", tip: "Tipikus méretkorlátok: útlevélkép ~500 KB, HR rendszerek ~2 MB, e-mail mellékletek ~5-10 MB egyenként." },
        { icon: "⚠️", tip: "A kimenet mindig JPEG formátumú, mivel a JPEG tömörítési szintje a legfinomabban szabályozható. Ha PNG kell, konvertáld vissza a kész JPEG-et." },
      ],
    },
  },

  "gif-keszito": {
    introText: "Készíts animált GIF-et képek sorozatából közvetlenül a böngésződben, szerver nélkül. Állítsd be a képkockák sebességét, a hurok módot és az animáció sorrendjét – az eszköz pillanatok alatt elkészíti a GIF fájlt. Ideális reakció GIF-ekhez, termékbemutatókhoz és oktatóanyagokhoz.",
    guide: [
      "1. Húzd be vagy tallózd ki a képeket – ezek lesznek a GIF képkockái (frame-jei). A feltöltés sorrendje határozza meg az animáció sorrendjét.",
      "2. Állítsd be a frame delay értéket (képkockák közötti késleltetés milliszekundumban) és a hurok beállítást (végtelen ismétlés vagy egyszeri lejátszás).",
      "3. Az előnézetben ellenőrizd az animáció sebességét és sorrendjét – szükség esetén módosítsd a beállításokat.",
      "4. Kattints a «GIF készítése» gombra, majd töltsd le az elkészült animált GIF fájlt.",
    ],
    faq: [
      { q: "Hány képkockát (frame-et) lehet egy GIF-be tenni?", a: "Az eszköz legfeljebb 100 képkockát támogat egyetlen GIF-ben. Ez a legtöbb felhasználási célra bőven elegendő – egy 10 fps-es animációnál ez 10 másodperc." },
      { q: "Miért tűnnek homályosnak vagy sávosnak a GIF színei?", a: "A GIF formátum technikai korlátja, hogy képkockánként maximálisan 256 színt tárol (8 bites színpaletta). Fotóknál ez színátmenet-sávosodást okozhat. Egyszerű grafikáknál, logóknál és szövegnél viszont tökéletesen működik." },
      { q: "Biztonságos az eszköz?", a: "Igen, a teljes GIF generálás a böngésződben történik JavaScript és a gifenc könyvtár segítségével. A képeid nem kerülnek szerverre." },
      { q: "Milyen képformátumokat tölthetek fel?", a: "JPG, PNG és WebP formátumú képeket egyaránt feltölthetsz. Az eszköz automatikusan egységesíti a méreteket és kvantálja a színeket a GIF formátum követelményeinek megfelelően." },
      { q: "Hogyan állíthatom be az animáció sebességét?", a: "A frame delay értékkel szabályozható: 100 ms ≈ 10 fps (folyékony animáció), 200 ms ≈ 5 fps (közepes sebesség), 500 ms ≈ 2 fps (lassú diavetítés). Az optimális érték az animáció jellegétől függ." },
      { q: "Megadhatom az egyes képkockák sorrendjét?", a: "Igen, a képek feltöltés utáni sorrendje határozza meg az animáció sorrendjét. Drag-and-drop módon átrendezheted a képkockákat a kívánt sorrend eléréséhez." },
    ],
    content: {
      howToSteps: [
        { title: "1. Képek feltöltése", description: "Húzd be a képeket a feltöltési területre, vagy kattints a tallózás gombra. A feltöltés sorrendje lesz az animáció képkocka-sorrendje. JPG, PNG és WebP formátumok támogatottak." },
        { title: "2. Sebesség és hurok beállítása", description: "Állítsd be a frame delay értéket milliszekundumban (pl. 100 ms = 10 fps folyékony animáció, 500 ms = lassú diavetítés). Válaszd ki a hurok módot: végtelen ismétlés vagy egyszeri lejátszás." },
        { title: "3. Előnézet ellenőrzése", description: "Az előnézetben valós időben megtekintheted az animációt. Ha a sebesség nem megfelelő, módosítsd a frame delay-t és nézd meg újra az eredményt." },
        { title: "4. GIF generálás és letöltés", description: "Kattints a GIF készítése gombra – a gifenc könyvtár kvantálja a színeket és kódolja az animációt. Az elkészült GIF fájlt azonnal letöltheted." },
      ],
      useCases: [
        { icon: "😂", title: "Reakció GIF-ek", description: "Készíts egyedi reakció GIF-eket Discord-ra, Slack-re, Teams-re vagy bármely üzenetküldő alkalmazásba. Személyre szabott mémek és reakciók készítése pillanatok alatt." },
        { icon: "🛍️", title: "Termékbemutató animáció", description: "Mutasd be termékeidet különböző szögekből egyetlen animált GIF-ben. Webshopokban és közösségi médiában hatékonyan vonzzák a figyelmet a termékanimációk." },
        { icon: "📚", title: "Oktatóanyagok és útmutatók", description: "Lépésről lépésre bemutató animációk, szoftverhasználati útmutatók és vizuális instrukciók készítése – ahol a videó túl sok, de az egyetlen kép nem elég." },
        { icon: "📱", title: "Közösségi média tartalom", description: "Animált posztok és banner-ek készítése közösségi médiához. A GIF-ek automatikusan lejátszódnak a legtöbb platformon, így nagyobb figyelmet vonzanak a statikus képeknél." },
      ],
      aboutSection: {
        title: "A GIF formátumról és az animált GIF készítéséről",
        paragraphs: [
          "A GIF (Graphics Interchange Format) 1987 óta az animált képek standard formátuma az interneten. Egyedülálló előnye, hogy szinte minden platform, böngésző, üzenetküldő és közösségi média alkalmazás natívan támogatja az animált GIF-ek megjelenítését – nincs szükség lejátszóra vagy pluginre.",
          "A GIF formátum képkockánként maximálisan 256 színt tárol (8 bites színpaletta), ami a fájlméret csökkentése érdekében szín-kvantálással érhető el. Ez fotóknál némi színveszteséget okozhat, de egyszerű grafikáknál, ikonoknál és szöveges animációknál kiváló eredményt ad.",
          "Az animált GIF készítés során a forrásképek sorozata képkockákként (frame-ekként) kerül a GIF fájlba, megadott időzítéssel. A hurok (loop) beállítás határozza meg, hogy az animáció egyszer vagy végtelenszer ismétlődjön. Modern alternatívák (animált WebP, AVIF) kisebb fájlméretet nyújtanak, de a GIF univerzális kompatibilitása továbbra is páratlan.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Folyékony animációhoz használj 100 ms frame delay-t (10 fps). Diavetítéshez vagy lépésről lépésre bemutatóhoz 500-1000 ms ajánlott." },
        { icon: "🎨", tip: "Egyszerű, kevés színt tartalmazó képekből (logók, ikonok, szöveg) készített GIF-ek jobbak lesznek, mint fotókból, a 256 színes korlát miatt." },
        { icon: "📏", tip: "A fájlméret csökkentéséhez használj kisebb méretű forrásképeket (pl. 480×360 px) – a GIF mérete arányosan nő a pixelmérettel és a képkockák számával." },
        { icon: "⚡", tip: "Ha a GIF fájlméret túl nagy, fontold meg az animált WebP konvertálást – azonos minőség mellett akár 60-80%-kal kisebb fájlt kapsz." },
      ],
    },
  },

  "gif-webp-animalt": {
    introText: "Konvertáld animált GIF fájljaidat modern animált WebP formátumba, és érj el akár 60-80%-kal kisebb fájlméretet azonos vizuális minőség mellett. Az animált WebP minden modern böngészőben támogatott, és a GIF-ek tökéletes helyettesítője weboldalak teljesítményoptimalizálásához.",
    guide: [
      "1. Húzd be vagy tallózd ki az animált GIF fájlt.",
      "2. Állítsd be a WebP minőséget a csúszkával (ajánlott: 75-85 a legjobb méret/minőség arányért).",
      "3. Az előnézetben ellenőrizd az animáció minőségét és a fájlméret-csökkenést az eredetihez képest.",
      "4. Töltsd le az elkészült animált WebP fájlt, és cseréld le vele a GIF-et a weboldaladban.",
    ],
    faq: [
      { q: "Minden böngésző lejátssza az animált WebP-t?", a: "Igen, minden modern böngésző támogatja: Chrome, Firefox, Safari 14+, Edge és az összes modern mobil böngésző. A globális böngészőtámogatás meghaladja a 96%-ot." },
      { q: "Mekkora méretmegtakarítás várható GIF→WebP konvertálásnál?", a: "Tipikusan 60-80%-os méretcsökkenés érhető el azonos vizuális minőség mellett. Egy 5 MB-os animált GIF akár 1 MB alatti animált WebP-vé konvertálható." },
      { q: "Biztonságos a konvertálás?", a: "Igen, a teljes feldolgozás a böngésződben történik. A GIF fájlod nem kerül szerverre – a dekódolás és az animált WebP kódolás helyben zajlik." },
      { q: "Megmarad az animáció sebessége és a hurok beállítás?", a: "Igen, az animáció sebessége (frame timing), a képkockák sorrendje és a hurok (loop) beállítás tökéletesen megőrződik a konvertálás során." },
      { q: "Hogyan cserélhetem le a GIF-eket WebP-re a weboldalamon?", a: "A legegyszerűbb módszer a HTML <picture> elem használata: <source type='image/webp'> az animált WebP-hez, és <img src='fallback.gif'> a régebbi böngészőkhöz. Így minden böngésző a legjobb formátumot kapja." },
      { q: "Mobilon is működik az eszköz?", a: "Igen, az eszköz minden modern böngészőben elérhető mobilon és asztali gépen egyaránt." },
    ],
    content: {
      howToSteps: [
        { title: "1. Animált GIF feltöltése", description: "Húzd be az animált GIF fájlt a feltöltési területre, vagy kattints a tallózás gombra. Az eszköz automatikusan felismeri az animált GIF-eket és megjeleníti a képkockák számát." },
        { title: "2. Minőség beállítása", description: "Állítsd be a WebP minőséget a csúszkával. 75-85 közötti érték a legjobb kompromisszum a fájlméret és a vizuális minőség között. Alacsonyabb érték kisebb fájlt, de gyengébb minőséget ad." },
        { title: "3. Előnézet és összehasonlítás", description: "Az előnézetben valós időben összehasonlíthatod az eredeti GIF-et és a konvertált WebP-t. Az eszköz megjeleníti a fájlméret-csökkenést és a megtakarítás százalékát." },
        { title: "4. Letöltés", description: "Töltsd le az animált WebP fájlt, és használd a weboldaladban. A HTML <img> tag vagy <picture> elem is támogatja az animált WebP megjelenítését." },
      ],
      useCases: [
        { icon: "⚡", title: "Weboldal teljesítmény optimalizálás", description: "Cseréld le az animált GIF-eket animált WebP-re a weboldaladban – a 60-80%-os fájlméret-csökkenés jelentősen gyorsítja az oldalbetöltést és javítja a Core Web Vitals metrikákat." },
        { icon: "📱", title: "Mobilhálózati adatforgalom", description: "A kisebb fájlméret kevesebb mobiladatot fogyaszt, ami gyorsabb betöltést és jobb felhasználói élményt jelent mobilhálózaton." },
        { icon: "💰", title: "CDN és sávszélesség költség", description: "Nagy forgalmú weboldalaknál a GIF→WebP váltás jelentős megtakarítást jelent CDN sávszélességben és tárhelyköltségben." },
        { icon: "🛒", title: "E-commerce termékanimációk", description: "Webshopokban a termékbemutatókat, 360 fokos nézeteket és akciós banner-eket hatékonyabban kiszolgálhatod animált WebP-vel." },
      ],
      aboutSection: {
        title: "Animált WebP vs animált GIF összehasonlítás",
        paragraphs: [
          "Az animált GIF 1989 óta az internet standard animációs formátuma, de technikai korlátai (256 szín per képkocka, alacsony tömörítési hatékonyság) miatt a fájlméretek rendkívül nagyok lehetnek. Egy rövid, néhány másodperces animáció is könnyen eléri az 5-10 MB-ot.",
          "Az animált WebP a Google által fejlesztett modern alternatíva, amely VP8 videokodek technológiát használ az animációk tömörítéséhez. Veszteséges módban 60-80%-kal, veszteségmentes módban is 20-40%-kal kisebb fájlméretet ér el az animált GIF-hez képest, miközben a vizuális minőség azonos vagy jobb.",
          "A GIF→WebP konvertálás az egyik leghatékonyabb módszer a weboldalak teljesítményének javítására. A Google PageSpeed Insights és a Lighthouse kifejezetten ajánlja az animált GIF-ek WebP-re cserélését a jobb Core Web Vitals pontszámokért.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Webes animációkhoz a 75-85 közötti WebP minőség a legjobb kompromisszum: szinte észrevehetetlen különbség az eredeti GIF-hez képest, de 60-80%-kal kisebb fájl." },
        { icon: "🔄", tip: "Használd a <picture> elemet a weboldaladban: <source type='image/webp'> az animált WebP-hez, és <img src='fallback.gif'> a régi böngészőkhöz." },
        { icon: "📊", tip: "A legnagyobb megtakarítás fotószerű animációknál érhető el, ahol a GIF 256 színes korlátja amúgy is minőségveszteséget okoz." },
        { icon: "⚡", tip: "Ha a GIF-ed nagyon rövid és kis méretű (100 KB alatt), a konvertálás nem feltétlenül éri meg – a HTTP overhead csökkentése fontosabb lehet." },
      ],
      formatComparison: {
        title: "Animált GIF vs Animált WebP összehasonlítás",
        columns: ["Tulajdonság", "Animált GIF", "Animált WebP"],
        rows: [
          { feature: "Színek száma", values: ["Max. 256 / frame", "16,7 millió (24 bit)"] },
          { feature: "Tömörítés", values: ["LZW (gyenge)", "VP8 (hatékony)"] },
          { feature: "Átlagos fájlméret", values: ["Nagy", "60-80%-kal kisebb"] },
          { feature: "Átlátszóság", values: ["1 bit (van/nincs)", "8 bit alfa csatorna"] },
          { feature: "Böngészőtámogatás", values: ["Univerzális", "Minden modern böngésző"] },
        ],
      },
    },
  },

  "svg-png": {
    introText: "Konvertáld SVG vektorgrafikai fájljaidat PNG vagy JPG raszterképpé tetszőleges felbontásban, közvetlenül a böngésződben. Az SVG bármilyen méretben élesen jelenik meg, de nem minden program, platform és e-mail kliens támogatja – a PNG/JPG konvertálás biztosítja az univerzális kompatibilitást.",
    guide: [
      "1. Húzd be vagy tallózd ki az SVG fájlt a feltöltési területre.",
      "2. Válaszd ki a kimeneti formátumot (PNG az átlátszósághoz, JPG a kisebb fájlmérethez).",
      "3. Add meg a kívánt szélességet pixelben – a magasság automatikusan számolódik a képarány megtartásával.",
      "4. Kattints a «Konvertálás» gombra, majd töltsd le a raszterített képet.",
    ],
    faq: [
      { q: "Mekkora felbontást (szélességet) adjak meg?", a: "Normál kijelzőkhöz az SVG eredeti CSS mérete elegendő. Retina/HiDPI kijelzőkre a 2×-os méret ajánlott (pl. 200px-es SVG → 400px szélesség). Nyomtatáshoz 300 DPI-nek megfelelő méretet használj." },
      { q: "Az SVG animációk is konvertálódnak?", a: "Nem, az eszköz az SVG statikus (első frame) állapotát raszterizálja. CSS és SMIL animációk nem kerülnek bele a kimeneti képbe." },
      { q: "Biztonságos a konvertálás?", a: "Igen, a raszterizálás teljes egészében a böngésződben történik a Canvas API segítségével. Az SVG fájlod nem kerül szerverre." },
      { q: "PNG-t vagy JPG-t válasszak?", a: "PNG-t válassz, ha az SVG-dben átlátszó háttér van (logó, ikon), vagy ha veszteségmentes minőségre van szükséged. JPG-t válassz, ha a fájlméret fontosabb és nincs átlátszóság." },
      { q: "Miért nem jelenik meg jól az SVG egyes programokban?", a: "Az SVG XML alapú vektorgrafika, amelyet nem minden szoftver támogat: régebbi képszerkesztők, Word, PowerPoint és a legtöbb e-mail kliens nem kezeli. PNG/JPG-re konvertálva univerzálisan kompatibilissá válik." },
      { q: "Mobilon is működik az eszköz?", a: "Igen, az eszköz minden modern böngészőben elérhető mobilon és asztali gépen egyaránt." },
    ],
    content: {
      howToSteps: [
        { title: "1. SVG fájl feltöltése", description: "Húzd be az SVG fájlt a feltöltési területre, vagy kattints a tallózás gombra. Az eszköz automatikusan felismeri az SVG formátumot és megjeleníti az előnézetet." },
        { title: "2. Formátum és méret beállítása", description: "Válaszd ki a kimeneti formátumot (PNG átlátszó háttérrel vagy JPG kisebb fájlmérettel) és add meg a kívánt szélességet pixelben. A magasság automatikusan a képarány megtartásával számolódik." },
        { title: "3. Raszterizálás", description: "Kattints a konvertálás gombra – a Canvas API pixel-pontosan raszterizálja az SVG-t a megadott méretben. Az eredmény az előnézetben azonnal megjelenik." },
        { title: "4. Letöltés", description: "Töltsd le a kész PNG vagy JPG fájlt, és használd dokumentumokban, e-mailekben, prezentációkban vagy bármely platformon, ami nem támogatja az SVG-t." },
      ],
      useCases: [
        { icon: "📧", title: "E-mail és hírlevél", description: "E-mail kliensek (Outlook, Gmail, Apple Mail) döntő többsége blokkolja vagy nem jeleníti meg az SVG képeket. PNG-re konvertálva a logó, ikon és grafika minden levelezőprogramban megjelenik." },
        { icon: "📄", title: "Word, PowerPoint és PDF", description: "Logók, diagramok és infografikák beillesztése Office dokumentumokba és PDF-ekbe. Az SVG támogatás ezen programokban korlátozott, de a PNG/JPG univerzálisan működik." },
        { icon: "🖨️", title: "Nyomtatás", description: "Nyomtatási célra nagy felbontású (300 DPI) PNG-t készíthetsz az SVG-ből. A vektor alapú forrás biztosítja, hogy bármilyen méretben éles marad a raszterizált kép." },
        { icon: "📱", title: "Közösségi média feltöltés", description: "Közösségi platformok (Facebook, Instagram, Twitter) nem fogadnak el SVG formátumot. PNG-re konvertálva a grafika bármely platformon feltölthető és megosztható." },
      ],
      aboutSection: {
        title: "Az SVG raszterizálásról részletesen",
        paragraphs: [
          "Az SVG (Scalable Vector Graphics) egy XML alapú vektorgrafika-formátum, amely matematikai alakzatokkal (görbék, vonalak, formák) írja le a képet. Legnagyobb előnye, hogy bármilyen méretben élesen jelenik meg – nincs pixelesedés. A webfejlesztésben logókhoz, ikonokhoz és illusztrációkhoz használják.",
          "A raszterizálás a vektorgrafika pixelekké alakításának folyamata. Az eszközünk a böngésző beépített Canvas API-ját használja a raszterizáláshoz, ami szerver nélkül, helyben történik. A kimeneti kép felbontása szabadon megadható, így akár Retina-minőségű vagy nyomtatásra alkalmas nagy felbontású képet is készíthetsz.",
          "Az SVG→PNG konvertálás különösen fontos e-mail sablonokhoz (ahol az SVG blokkolva van), Office dokumentumokhoz (ahol az SVG támogatás korlátozott) és közösségi média platformokhoz (ahol az SVG nem feltölthető). A PNG megőrzi az átlátszóságot, a JPG pedig kisebb fájlméretet eredményez.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Retina kijelzőkre dupla méretben (2×) raszterizáld az SVG-t – így HiDPI kijelzőkön is éles marad a kép." },
        { icon: "🎨", tip: "Ha az SVG-dben átlátszó háttér van, válaszd a PNG kimenetet – a JPG nem támogatja az átlátszóságot és fehér hátteret kap." },
        { icon: "📏", tip: "Nyomtatáshoz számold ki a szükséges pixelméretet: kívánt cm × 118 ≈ szükséges pixel 300 DPI-hez (pl. 10 cm ≈ 1181 px)." },
        { icon: "⚠️", tip: "Az SVG-ben használt külső betűtípusok és hivatkozott képek nem mindig raszterizálódnak helyesen. Használj beágyazott (embedded) betűtípusokat a jobb eredményért." },
      ],
      formatComparison: {
        title: "SVG vs PNG összehasonlítás",
        columns: ["Tulajdonság", "SVG", "PNG"],
        rows: [
          { feature: "Típus", values: ["Vektor (matematikai)", "Raszter (pixeles)"] },
          { feature: "Méretezhetőség", values: ["Korlátlan, éles", "Fix felbontás"] },
          { feature: "Fájlméret (egyszerű ikon)", values: ["Nagyon kicsi", "Közepes"] },
          { feature: "Átlátszóság", values: ["Támogatja", "Támogatja"] },
          { feature: "Kompatibilitás", values: ["Böngészők, korlátozott szoftver", "Univerzális"] },
        ],
      },
    },
  },

  "kep-collage": {
    introText: "Fűzz össze több képet egyetlen kompozícióba – vízszintesen, függőlegesen vagy rácsban elrendezve. Az eszköz automatikusan igazítja a különböző méretű képeket, és szabadon beállíthatod a rések (gap) méretét és a háttérszínt. A képkombinálás a böngésződben történik, szerver nélkül.",
    guide: [
      "1. Húzd be vagy tallózd ki a kombinálni kívánt képeket (minimum 2, maximum 20 kép).",
      "2. Válaszd ki az elrendezést: vízszintes (egymás mellé), függőleges (egymás alá) vagy rácsos (grid) kompozíció.",
      "3. Állítsd be a képek közötti rés méretét és a háttérszínt az igényeidnek megfelelően.",
      "4. Kattints a «Kollázs készítése» gombra, majd töltsd le az elkészült képet.",
    ],
    faq: [
      { q: "Különböző méretű képeket is lehet kombinálni?", a: "Igen, az eszköz automatikusan igazítja a képek méretét az elrendezésnek megfelelően. Vízszintes elrendezésnél a magasság, függőleges elrendezésnél a szélesség kerül egységesítésre." },
      { q: "Hány képet kombinálhatok egyszerre?", a: "Minimum 2 és maximum 20 képet fűzhetsz össze egyetlen kollázsba. A legtöbb felhasználási célra (termékbemutató, Instagram kollázs, összehasonlítás) ez bőven elegendő." },
      { q: "Biztonságos az eszköz?", a: "Igen, a képkombinálás teljes egészében a böngésződben történik a Canvas API segítségével. A képeid nem kerülnek szerverre." },
      { q: "Milyen formátumú a kimenet?", a: "Az elkészült kollázs PNG formátumban kerül letöltésre, ami veszteségmentes minőséget és az átlátszóság megőrzését biztosítja." },
      { q: "Beállíthatom a képek közötti térközt?", a: "Igen, a rés (gap) méretét pixelben szabadon megadhatod. Az alapértelmezett 0 px (képek közvetlenül egymás mellett), de akár 20-50 px-es térközt is beállíthatsz a jobb vizuális hatás érdekében." },
      { q: "Mobilon is működik?", a: "Igen, az eszköz teljesen reszponzív és minden modern böngészőben elérhető. Mobilon is könnyedén készíthetsz kollázst a telefonodon lévő képekből." },
    ],
    content: {
      howToSteps: [
        { title: "1. Képek feltöltése", description: "Húzd be a kombinálni kívánt képeket a feltöltési területre, vagy kattints a tallózás gombra. JPG, PNG és WebP formátumok támogatottak. A feltöltés sorrendje határozza meg a képek pozícióját a kollázsban." },
        { title: "2. Elrendezés kiválasztása", description: "Válaszd ki a kívánt elrendezést: vízszintes (képek egymás mellé), függőleges (képek egymás alá) vagy rácsos (grid) kompozíció. A rácsos módnál az oszlopok száma automatikusan számolódik." },
        { title: "3. Finomhangolás", description: "Állítsd be a képek közötti rés méretét pixelben, válaszd ki a háttérszínt, és szükség esetén rendezd át a képek sorrendjét a kívánt kompozícióhoz." },
        { title: "4. Kollázs készítése és letöltés", description: "Kattints a kollázs készítése gombra – az eszköz a Canvas API-val összeilleszti a képeket egyetlen kompozícióba. Töltsd le az eredményt PNG formátumban." },
      ],
      useCases: [
        { icon: "🛒", title: "Termékbemutató", description: "Egy termék több nézetből (elöl, hátul, oldalt, részlet) egyetlen képen bemutatva. Webshopokban és piactéri hirdetésekben különösen hatékony." },
        { icon: "📱", title: "Közösségi média kollázs", description: "Több fotó kombinálása egyetlen Instagram posztba, Facebook bejegyzésbe vagy Pinterest pinbe. Utazási élmények, előtte/utána képek és eseményfotók bemutatásához ideális." },
        { icon: "🔄", title: "Előtte/utána összehasonlítás", description: "Felújítás, fogyókúra, dizájn változtatás vagy bármilyen vizuális összehasonlítás bemutatása két kép egymás melletti elhelyezésével." },
        { icon: "📊", title: "Prezentáció és dokumentáció", description: "Több képernyőkép, diagram vagy fotó összefűzése egyetlen képpé prezentációkhoz, dokumentációkhoz és jelentésekhez." },
      ],
      aboutSection: {
        title: "Képkombinálás és kollázskészítés böngészőben",
        paragraphs: [
          "A képkollázs (image collage) több kép egyetlen kompozícióba való összeillesztése. Az eszközünk a böngésző beépített Canvas API-ját (pontosabban az OffscreenCanvas technológiát) használja a képek összeillesztéséhez, ami szerver nélkül, helyben történik.",
          "Az elrendezési módok közül a vízszintes mód egymás mellé, a függőleges mód egymás alá helyezi a képeket. A rácsos (grid) mód egy egyenletes rácsban rendezi el a képeket, ami sok kép esetén a legáttekinthetőbb. A különböző méretű képek automatikusan átméretezésre kerülnek, hogy a kompozíció egységes legyen.",
          "A kollázskészítés különösen hasznos közösségi médiához (ahol egyetlen kép jobban teljesít több külön képnél), termékbemutatókhoz (ahol egy kép több nézetet mutat) és összehasonlításokhoz (előtte/utána, verzió A/B).",
        ],
      },
      tips: [
        { icon: "💡", tip: "Hasonló méretarányú képeket használj a legszebb eredményért – a nagyon eltérő méretű képek esetén az átméretezés torzítást okozhat." },
        { icon: "🎨", tip: "Állíts be 10-20 px-es rést (gap) a képek között, és válassz háttérszínt – ez professzionálisabb megjelenést ad, mint a képek közvetlen érintkezése." },
        { icon: "📏", tip: "Instagram poszthoz négyzetes (1:1) képeket használj, és vízszintesen 2-3 képet illessz egymás mellé a legjobb eredményért." },
        { icon: "📱", tip: "A feltöltött képek sorrendje meghatározza a pozíciót a kollázsban – ügyelj a sorrendre a feltöltésnél, vagy rendezd át utólag." },
      ],
    },
  },

  "szin-paletta": {
    introText: "Nyerd ki egy kép domináns színeit másodpercek alatt, közvetlenül a böngésződben. Az eszköz módosított median cut algoritmussal elemzi a képet és a leggyakoribb színcsoportokat adja vissza HEX, RGB és HSL formátumban – egyetlen kattintással másolhatod a színkódokat a vágólapra.",
    guide: [
      "1. Húzd be vagy tallózd ki a képet, amelyből ki szeretnéd nyerni a színpalettát.",
      "2. Állítsd be a kívánt domináns színek számát (3-10 között).",
      "3. Az eszköz azonnal elemzi a képet és megjeleníti a domináns színeket HEX, RGB és HSL formátumban.",
      "4. Kattints bármely szín kódjára a vágólapra másoláshoz, és használd a projektedben.",
    ],
    faq: [
      { q: "Milyen algoritmus alapján határozza meg a domináns színeket?", a: "Módosított median cut algoritmust használunk, amely a kép összes pixelének színértékét elemzi, és iteratív felosztással megtalálja a leggyakoribb színcsoportokat. Az eredmény az egyes csoportok átlagszíne lesz." },
      { q: "Biztonságos az eszköz?", a: "Igen, a teljes képelemzés a böngésződben történik a Canvas API segítségével. A képed nem kerül szerverre – a pixel-szintű elemzés helyben, JavaScript-tel zajlik." },
      { q: "Milyen formátumokban kapom meg a színkódokat?", a: "Minden domináns szín HEX (#FF5733), RGB (rgb(255, 87, 51)) és HSL (hsl(14, 100%, 60%)) formátumban is elérhető. Bármely formátumot egyetlen kattintással a vágólapra másolhatod." },
      { q: "Hány domináns színt érdemes kinyerni?", a: "Logókhoz és brand palettához 3-5 szín ajánlott. Részletesebb elemzéshez (fotók, festmények) 6-10 szín ad átfogóbb képet. Az alapértelmezett 5 szín a legtöbb célra ideális." },
      { q: "Milyen képformátumokat támogat?", a: "JPG, PNG, WebP és GIF formátumú képeket egyaránt elfogad az eszköz. A legjobb eredményt nagy felbontású, jó minőségű képek adják." },
      { q: "Felhasználhatom a kinyert színeket kereskedelmi projektekben?", a: "Igen, a kinyert színkódok szabadon felhasználhatók bármilyen célra – a színek nem állnak szerzői jogi védelem alatt." },
    ],
    content: {
      howToSteps: [
        { title: "1. Kép feltöltése", description: "Húzd be a képet a feltöltési területre, vagy kattints a tallózás gombra. JPG, PNG, WebP és GIF formátumok támogatottak. Fotók, logók, illusztrációk és bármilyen kép elemezésére alkalmas." },
        { title: "2. Domináns színek számának beállítása", description: "Válaszd ki, hány domináns színt szeretnél kinyerni a képből (3-10). Brand palettához 3-5, részletesebb elemzéshez 6-10 szín ajánlott." },
        { title: "3. Elemzés és eredmény", description: "Az eszköz a Canvas API-val pixel-szintű elemzést végez, majd megjeleníti a domináns színeket vizuális sávokban, HEX, RGB és HSL kódokkal együtt." },
        { title: "4. Színkódok másolása", description: "Kattints bármely szín HEX, RGB vagy HSL kódjára a vágólapra másoláshoz. A kódok közvetlenül felhasználhatók CSS-ben, Figma-ban, Photoshopban vagy bármely dizájn eszközben." },
      ],
      useCases: [
        { icon: "🎨", title: "Brand dizájn és arculat", description: "Meglévő logóból, fotóból vagy inspirációs képből brand színpaletta összeállítása. A kinyert színek alapját képezhetik a teljes vizuális arculatnak." },
        { icon: "🖥️", title: "UI/UX és webdizájn", description: "Weboldalak, alkalmazások és landing page-ek szín témáinak kialakítása képek alapján. Az inspirációs fotóból kinyert színek konzisztens dizájnt biztosítanak." },
        { icon: "🏠", title: "Lakberendezés és divat", description: "Inspirációs fotók színeinek elemzése lakberendezéshez, divathoz vagy bármilyen kreatív projekthez. A pontos színkódok segítenek a színek azonosításában és reprodukálásában." },
        { icon: "📊", title: "Adatvizualizáció", description: "Infografikák, diagramok és adatvizualizációk színsémáinak összeállítása. A harmonikus, képből kinyert színpaletta esztétikus és konzisztens adatvizualizációt eredményez." },
      ],
      aboutSection: {
        title: "Hogyan működik a szín paletta kinyerés?",
        paragraphs: [
          "A színpaletta-kinyerés a kép összes pixelének elemzésével határozza meg a domináns színeket. Az eszközünk a képet OffscreenCanvas-ra rendereli, majd pixel-szintű statisztikai elemzéssel – módosított median cut algoritmussal – azonosítja a leggyakoribb színcsoportokat.",
          "A median cut algoritmus a kép színterét (RGB kocka) iteratívan felezi a legnagyobb szórású tengely mentén, amíg el nem éri a kívánt számú csoportot. Az egyes csoportok átlagszíne adja a domináns színeket. Ez a módszer hatékonyabb, mint az egyszerű hisztogram-elemzés, mert figyelembe veszi a színek térbeli eloszlását is.",
          "A kinyert színek HEX, RGB és HSL formátumban is elérhetők, így közvetlenül felhasználhatók CSS-ben, dizájn eszközökben (Figma, Sketch, Adobe XD), prezentációkban és bármilyen kreatív projektben.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Brand palettához 3-5 domináns szín az ideális: egy elsődleges (primary), egy másodlagos (secondary) és 1-3 kiegészítő (accent) szín." },
        { icon: "🎨", tip: "A kinyert színeket érdemes kiegészíteni árnyalatokkal és tintákkal (tints & shades) a teljes dizájn rendszer felépítéséhez." },
        { icon: "🔍", tip: "Jó minőségű, nagy felbontású képet használj a pontosabb színelemzéshez – a tömörítési műtermékek torzíthatják a színeket." },
        { icon: "📋", tip: "A HEX kódok a webes felhasználáshoz, az RGB a digitális dizájnhoz, a HSL pedig a szín-manipulációhoz (világosítás, sötétítés) a leghasznosabb." },
      ],
    },
  },

  "automatikus-vagas": {
    introText: "Távolítsd el automatikusan a felesleges fehér vagy egyszínű széleket a képeidről pixel-szintű elemzéssel. Az eszköz megtalálja a tényleges tartalom határait és levágja a felesleges hátteret – ideális szkennerből érkező dokumentumokhoz, termékképekhez és grafikai elemekhez. A feldolgozás a böngésződben történik.",
    guide: [
      "1. Húzd be vagy tallózd ki a vágni kívánt képet (JPG, PNG vagy WebP).",
      "2. Állítsd be a háttérszínt (alapértelmezetten fehér) és a tolerancia értéket (milyen mértékű színeltérés számítson még háttérnek).",
      "3. Az eszköz automatikusan megtalálja a tartalom határait és megjeleníti az előnézetet a vágási területtel.",
      "4. Töltsd le a levágott képet PNG formátumban.",
    ],
    faq: [
      { q: "Működik nem fehér háttéren is?", a: "Igen, a szín-kiválasztóval bármilyen egyszínű háttérszínt megadhatsz (fekete, szürke, kék stb.). Az eszköz az adott színtől mért eltérés alapján határozza meg a háttér és a tartalom határát." },
      { q: "Mi a tolerancia beállítás és hogyan működik?", a: "A tolerancia (0-80) azt határozza meg, mennyire térhetnek el a szélső pixelek a megadott háttérszíntől ahhoz, hogy még háttérnek számítsanak. Alacsony tolerancia (0-10) pontos egyezést követel, magas tolerancia (30-60) enyhe színeltéréseket is elfogad – ez hasznos fényképeknél, ahol a háttér nem teljesen egyszínű." },
      { q: "Biztonságos az eszköz?", a: "Igen, a képfeldolgozás teljes egészében a böngésződben történik a Canvas API segítségével. A képed nem kerül szerverre." },
      { q: "Milyen formátumú a kimenet?", a: "A levágott kép PNG formátumban kerül mentésre, ami veszteségmentes minőséget biztosít. Ha JPG-re van szükséged, használd a PNG→JPG konvertáló eszközünket." },
      { q: "Beállíthatok margót a levágott tartalom körül?", a: "Az eszköz a tartalom pontos befoglaló téglalapjára vágja a képet. Ha extra margóra van szükséged, az átméretezés eszközzel hozzáadhatsz padding-et a levágott képhez." },
      { q: "Mobilon is működik?", a: "Igen, az eszköz minden modern böngészőben elérhető mobilon és asztali gépen egyaránt." },
    ],
    content: {
      howToSteps: [
        { title: "1. Kép feltöltése", description: "Húzd be a képet a feltöltési területre, vagy kattints a tallózás gombra. JPG, PNG és WebP formátumú képeket egyaránt elfogad az eszköz. A kép előnézetben azonnal megjelenik." },
        { title: "2. Háttérszín megadása", description: "Válaszd ki a vágni kívánt háttérszínt a szín-kiválasztóval. Alapértelmezetten fehér, de bármilyen egyszínű háttérre működik (fekete, szürke, kék stb.)." },
        { title: "3. Tolerancia beállítása", description: "Állítsd be a tolerancia értéket (0-80): alacsony érték pontos színegyezést követel, magas érték enyhe színeltéréseket is elfogad. Szkennerből érkező dokumentumokhoz 10-20, fotókhoz 20-40 ajánlott." },
        { title: "4. Vágás és letöltés", description: "Az eszköz automatikusan megkeresi a tartalom határait és megjeleníti az előnézetet. Ellenőrizd az eredményt, majd töltsd le a levágott képet PNG formátumban." },
      ],
      useCases: [
        { icon: "📷", title: "Szkennerből érkező dokumentumok", description: "Szkennelt dokumentumok, számlák és igazolványok felesleges fehér szélének automatikus eltávolítása. A vágott kép kisebb fájlméretet és tisztább megjelenést eredményez." },
        { icon: "🛒", title: "Webshop termékképek egységesítése", description: "Fehér hátteres termékfotók automatikus körülvágása egységes mérethez. A konzisztens termékképek professzionálisabb webshop megjelenést adnak." },
        { icon: "🎨", title: "Grafikai elemek vágása", description: "Logók, ikonok és grafikai elemek felesleges háttérének eltávolítása, hogy csak a tényleges tartalom maradjon – ideális további szerkesztéshez vagy beillesztéshez." },
        { icon: "📄", title: "Prezentáció és dokumentáció", description: "Képernyőképek és diagramok felesleges szélének eltávolítása prezentációkba és dokumentumokba való beillesztés előtt." },
      ],
      aboutSection: {
        title: "Az automatikus képvágás működése",
        paragraphs: [
          "Az automatikus képvágás (auto-crop vagy auto-trim) algoritmusa pixelenként pásztázza végig a kép széleit, és meghatározza azt a minimális befoglaló téglalapot (bounding box), amely az összes nem-háttér pixelt magában foglalja. A háttér azonosítása a megadott szín és tolerancia alapján történik.",
          "Az algoritmus négy irányból (felülről, alulról, balról, jobbról) halad befelé soronként/oszloponként, és megáll, amikor olyan pixelt talál, amelynek színe a tolerancián kívül esik a háttérszíntől. A négy irányból kapott határértékek adják a vágási téglalapot.",
          "Az automatikus vágás különösen hasznos nagy mennyiségű kép feldolgozásánál (pl. webshop termékképek egységesítése), szkennelt dokumentumok tisztításánál és grafikai elemek előkészítésénél. A tolerancia beállítás lehetővé teszi, hogy a nem teljesen egyszínű hátteret (pl. enyhe árnyalateltérések, szkennelési zajok) is eltávolítsd.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Szkennerből érkező dokumentumokhoz 10-20 közötti tolerancia értéket használj, hogy a szkennelési zajtól és a papír enyhe elszíneződésétől eltekintsen az algoritmus." },
        { icon: "🎨", tip: "Ha a háttér nem teljesen egyszínű (pl. enyhe gradiens), emeld a tolerancia értéket 30-50-re, hogy a teljes hátteret eltávolítsd." },
        { icon: "⚠️", tip: "Ügyelj arra, hogy a kívánt tartalom ne legyen túl hasonló a háttérszínhez – magas tolerancia esetén a tartalom szélei is levágódhatnak." },
        { icon: "📏", tip: "A vágás után érdemes ellenőrizni az eredményt az előnézetben, különösen ha a tartalom halvány vagy a háttérszínhez hasonló elemeket tartalmaz." },
      ],
    },
  },

  "exif-terkep": {
    introText: "Kinyeri a JPEG fotóid EXIF metaadataiban tárolt GPS koordinátákat és interaktív OpenStreetMap térképen jeleníti meg a készítés helyszínét. Ideális régi fotók helyszínének azonosításához, utazási fotók rendszerezéséhez és adatvédelmi ellenőrzéshez – a feldolgozás a böngésződben történik.",
    guide: [
      "1. Húzd be vagy tallózd ki a JPEG képet, amelynek helyszínét szeretnéd megtudni.",
      "2. Az eszköz az exifr könyvtárral kinyeri az EXIF adatokat, beleértve a GPS koordinátákat, készítés dátumát és kamerabeállításokat.",
      "3. A fotó készítési helyszíne interaktív OpenStreetMap térképen jelenik meg, a pontos koordinátákkal együtt.",
      "4. Tekintsd meg a további EXIF adatokat (kameramodell, expozíció, ISO, blende) és szükség esetén másold a koordinátákat.",
    ],
    faq: [
      { q: "Minden fotóban van GPS adat?", a: "Nem, csak azokban a fotókban, amelyek készítésekor be volt kapcsolva a helymeghatározás (Location Services) a telefonon. A legtöbb okostelefon alapértelmezetten rögzíti a GPS koordinátákat, de a felhasználó kikapcsolhatja ezt a funkciót." },
      { q: "Biztonságos az eszköz? A képem felkerül valahová?", a: "Nem, az összes feldolgozás kizárólag a böngésződben zajlik. A képed és a GPS koordinátáid nem kerülnek szerverre – az exifr JavaScript könyvtár helyben olvassa ki az EXIF adatokat." },
      { q: "Milyen EXIF adatokat nyeri ki az eszköz?", a: "GPS koordináták (szélesség, hosszúság), készítés dátuma és ideje, kameramodell és gyártó, fókusztávolság, blende (f-szám), záridő, ISO érzékenység és a kép tájolása. Nem minden kép tartalmaz minden adatot." },
      { q: "Működik HEIC vagy PNG képekkel is?", a: "Az eszköz elsősorban JPEG fájlokkal működik, mivel az EXIF metaadatokat leggyakrabban JPEG formátumban tárolják. A PNG formátum nem tartalmaz szabványos EXIF adatokat, a HEIC fájlokat pedig először JPG-re kell konvertálni." },
      { q: "Miért fontos tudni, hogy van-e GPS adat a fotóimban?", a: "Adatvédelmi szempontból kritikus: ha GPS-es fotókat osztasz meg közösségi médiában vagy küldöd el, mások megtudhatják a fotó készítési helyszínét – akár az otthonod címét is. Érdemes ellenőrizni a metaadatokat feltöltés előtt." },
      { q: "Hogyan törölhetem a GPS adatokat a fotóimból?", a: "A legtöbb operációs rendszer és képszerkesztő lehetővé teszi az EXIF adatok törlését. Windows-on: jobb klikk → Tulajdonságok → Részletek → Tulajdonságok és személyes adatok eltávolítása. iPhone-on: a Beállítások → Adatvédelem → Helymeghatározás → Kamera menüben kikapcsolhatod." },
    ],
    content: {
      howToSteps: [
        { title: "1. JPEG feltöltése", description: "Húzd be az okostelefonnal vagy digitális fényképezőgéppel készített JPEG fotót a feltöltési területre. Az eszköz automatikusan felismeri és feldolgozza az EXIF fejlécet." },
        { title: "2. EXIF adatok kinyerése", description: "Az exifr JavaScript könyvtár a böngésződben elemzi a JPEG fájl EXIF fejlécét, és kinyeri a GPS koordinátákat, készítés dátumát, kameraadatokat és egyéb metaadatokat." },
        { title: "3. Térkép megjelenítés", description: "A GPS koordináták alapján az eszköz interaktív OpenStreetMap térképen jelöli meg a fotó készítési helyszínét. A térképet nagyíthatod, kicsinyítheted és navigálhatod." },
        { title: "4. Adatok áttekintése", description: "Tekintsd meg a teljes EXIF adatlistát: kameramodell, blende, záridő, ISO, fókusztávolság és a pontos GPS koordináták. A koordináták másolhatók a vágólapra Google Maps vagy más navigációs alkalmazásba illesztéshez." },
      ],
      useCases: [
        { icon: "📍", title: "Fotó helyszín azonosítása", description: "Régi fotók készítési helyszínének meghatározása. Ha évek múltán nem emlékszel, hol készült egy fotó, az EXIF GPS adatok segítenek felidézni a helyszínt." },
        { icon: "🔒", title: "Adatvédelmi ellenőrzés", description: "Ellenőrizd, hogy a megosztani vagy feltölteni kívánt képeidben van-e GPS adat, mielőtt közösségi médiába vagy nyilvános fórumra töltenéd. Ezzel megvéded a magánszférádat." },
        { icon: "🗺️", title: "Utazási fotók rendszerezése", description: "Utazási fotók helyszín szerinti rendszerezése és térképes megjelenítése. A GPS adatok alapján könnyen azonosíthatod, melyik fotó melyik városban, látnivalónál készült." },
        { icon: "📸", title: "Kamerabeállítások elemzése", description: "Fotósok számára hasznos a kamerabeállítások (blende, záridő, ISO, fókusztávolság) utólagos elemzése – tanulj a korábbi képeidből, és értsd meg, milyen beállítások adták a legjobb eredményt." },
      ],
      aboutSection: {
        title: "Az EXIF GPS adatokról és a fotó metaadatokról",
        paragraphs: [
          "Az EXIF (Exchangeable Image File Format) a digitális fényképezőgépek és okostelefonok által a JPEG fájlok fejlécébe írt metaadat-szabvány. A legfontosabb tárolt adatok: készítés dátuma és ideje, kameramodell, fókusztávolság, blende, záridő, ISO érzékenység, fehéregyensúly és – ha a helymeghatározás engedélyezve van – a GPS koordináták.",
          "Az okostelefonok (iPhone, Android) alapértelmezetten rögzítik a GPS koordinátákat minden fotóban, amit a felhasználók gyakran nem tudnak. Ez adatvédelmi kockázatot jelent: ha egy GPS-es fotót megosztasz nyilvánosan, bárki megtudhatja a készítés pontos helyszínét. Ezért fontos a metaadatok ellenőrzése és szükség esetén törlése.",
          "Az eszközünk az exifr JavaScript könyvtárat használja az EXIF adatok kinyeréséhez, és a Leaflet térkép-könyvtárral jeleníti meg a helyszínt interaktív OpenStreetMap térképen. A teljes feldolgozás a böngészőben történik – a képed és a koordinátáid nem kerülnek szerverre.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Ha nem jelenik meg GPS adat, ellenőrizd, hogy a fotó készítésekor be volt-e kapcsolva a helymeghatározás a telefonodon. Digitális fényképezőgépek általában nem rögzítenek GPS-t (kivéve beépített GPS modullal rendelkező modellek)." },
        { icon: "🔒", tip: "Közösségi médiára feltöltés előtt érdemes ellenőrizni a fotóid EXIF adatait – a legtöbb platform (Facebook, Instagram) automatikusan eltávolítja a GPS-t, de nem mind!" },
        { icon: "📱", tip: "iPhone-on a Beállítások → Adatvédelem → Helymeghatározás → Kamera menüben kikapcsolhatod a GPS rögzítést. Android-on a Kamera alkalmazás beállításaiban találod ezt az opciót." },
        { icon: "🗺️", tip: "A kinyert GPS koordinátákat másolhatod a vágólapra, és közvetlenül beillesztheted Google Maps-be vagy más navigációs alkalmazásba a helyszín részletesebb megtekintéséhez." },
      ],
    },
  },

  "sprite-vagas": {
    introText: "Darabolj fel sprite sheet képeket egyedi frame-ekre automatikusan, megadott cellaméret alapján. Az eszköz PNG, JPG vagy WebP sprite sheet-eket kezel, és az összes kivágott képkockát ZIP archívumban exportálja. Ideális játékfejlesztéshez, animációs frame-ek kinyeréséhez és ikonkészletek feldolgozásához.",
    guide: [
      "1. Húzd be vagy tallózd ki a sprite sheet képet (PNG, JPG vagy WebP).",
      "2. Add meg egy cella szélességét és magasságát pixelben – az eszköz automatikusan kiszámolja a cellák számát a rácsban.",
      "3. Az előnézetben ellenőrizd a rácsfelosztást: a vonalaknak pontosan a sprite-ok határain kell futniuk.",
      "4. Kattints az «Exportálás» gombra – az összes kivágott frame PNG fájlként, ZIP archívumban kerül letöltésre.",
    ],
    faq: [
      { q: "Milyen névvel kerülnek a képek a ZIP archívumba?", a: "sprite-00-00.png, sprite-00-01.png, sprite-01-00.png stb. formátumban – az első szám a sor, a második az oszlop indexe (0-tól számozva). Ez megkönnyíti a programozási célú felhasználást." },
      { q: "Aszimmetrikus sprite sheet-eket is kezel az eszköz?", a: "Igen, a cellaméret szélességben és magasságban külön-külön megadható, így téglalap alakú cellák is támogatottak. Ha a sprite sheet nem osztható pontosan a cellákkal, a maradék pixelek levágásra kerülnek." },
      { q: "Biztonságos az eszköz?", a: "Igen, a teljes feldolgozás a böngésződben történik az OffscreenCanvas API segítségével. A sprite sheet képed nem kerül szerverre." },
      { q: "Milyen képformátumokat támogat bemenetként?", a: "PNG, JPG és WebP formátumú sprite sheet-eket egyaránt elfogad. A kimenet mindig PNG formátumú az átlátszóság megőrzése érdekében." },
      { q: "Hogyan tudom meg a pontos cellaméretet?", a: "Nyisd meg a sprite sheet-et egy képszerkesztőben és mérd meg egy cella szélességét és magasságát pixelben. Vagy oszd el a teljes kép méretét az oszlopok/sorok számával. Az előnézeti rács segít ellenőrizni, hogy a méret helyes-e." },
      { q: "Hány cellát tud feldolgozni egyszerre?", a: "Az eszköz akár több száz cellát is feldolgozhat egyetlen sprite sheet-ből. A feldolgozási sebesség a géped teljesítményétől függ, de tipikusan néhány másodperc alatt elkészül." },
    ],
    content: {
      howToSteps: [
        { title: "1. Sprite sheet feltöltése", description: "Húzd be a sprite sheet képet a feltöltési területre, vagy kattints a tallózás gombra. PNG, JPG és WebP formátumok támogatottak. Az előnézetben azonnal megjelenik a kép teljes mérete." },
        { title: "2. Cellaméret megadása", description: "Add meg egy sprite cella szélességét és magasságát pixelben. Az eszköz automatikusan kiszámolja, hány sor és oszlop fér a sprite sheet-be, és megjeleníti a rácsfelosztást az előnézetben." },
        { title: "3. Rácsfelosztás ellenőrzése", description: "Az előnézetben rácsvonalas overlay-vel ellenőrizheted, hogy a felosztás pontosan illeszkedik-e a sprite-okhoz. Ha a vonalak nem a megfelelő helyen vannak, módosítsd a cellaméretet." },
        { title: "4. Exportálás és letöltés", description: "Kattints az exportálás gombra – az OffscreenCanvas API kivágja az egyes cellákat, és az összes frame-et PNG fájlként, egyetlen ZIP archívumba csomagolva töltheted le." },
      ],
      useCases: [
        { icon: "🎮", title: "Játékfejlesztés", description: "Animációs frame-ek, karakter sprite-ok, ellenségek és effektek szétválasztása sprite sheet-ekből. A kivágott frame-ek közvetlenül felhasználhatók Unity-ben, Godot-ban vagy bármilyen játékfejlesztő környezetben." },
        { icon: "🖥️", title: "UI ikonkészletek feldolgozása", description: "CSS sprite sheet-ek és ikonkészletek egyedi ikonokra bontása. Hasznos, ha egy nagy ikon sprite-ból egyedi PNG fájlokat szeretnél készíteni." },
        { icon: "🎬", title: "Animáció elemzés és szerkesztés", description: "Animációs sprite sheet-ek frame-enkénti szétválasztása egyéni szerkesztéshez, módosításhoz vagy újrakombináláshoz." },
        { icon: "📦", title: "Asset exportálás és konverzió", description: "Játékfejlesztési és grafikai asset-ek sprite sheet-ből való kinyerése egyedi fájlokba, más formátumba konvertáláshoz vagy átszervezéshez." },
      ],
      aboutSection: {
        title: "A sprite sheet vágásról és a sprite-ok felhasználásáról",
        paragraphs: [
          "A sprite sheet (más néven texture atlas) egy hatékony grafikai technika, amelyben több kisebb képet (sprite-ot) egyetlen nagy képfájlba rendeznek egységes rácsban. A játékfejlesztésben animációs képkockák, karakterek és effektek tárolására használják, a webfejlesztésben pedig CSS sprite-ként ikonkészletek optimalizálására.",
          "Az eszközünk a megadott cellaméret alapján kiszámolja a rácsban lévő sorok és oszlopok számát, majd az OffscreenCanvas API segítségével pixelpontos vágásokkal kinyeri az egyes cellákat. A kivágott frame-ek PNG formátumban kerülnek exportálásra (az átlátszóság megőrzéséért), és egyetlen ZIP archívumba csomagolva tölthetők le.",
          "A sprite sheet vágás különösen hasznos, ha egy meglévő sprite sheet-ből egyedi frame-eket szeretnél kinyerni szerkesztéshez, konvertáláshoz vagy más játékmotorba való importáláshoz. Az sor-oszlop alapú fájlnevezés (sprite-00-00.png) megkönnyíti a programozási célú felhasználást és az animációs szekvenciák összeállítását.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Ha nem tudod pontosan a cellaméretet, oszd el a sprite sheet teljes szélességét az oszlopok számával és a magasságot a sorok számával – az eredmény lesz a cellaméret." },
        { icon: "🔍", tip: "Használd az előnézeti rácsvonal overlay-t a cellaméret ellenőrzéséhez: a vonalaknak pontosan a sprite-ok határain kell futniuk. Ha nem illeszkednek, módosítsd a méretet." },
        { icon: "📏", tip: "Ha a sprite sheet szélein üres cellák vannak (pl. az utolsó sor nem telt), az eszköz ezeket is exportálja – a feleslegeseket utólag törölheted a ZIP-ből." },
        { icon: "🎮", tip: "Játékfejlesztéshez érdemes a kivágott frame-eket szekvenciálisan elnevezni (sprite-00-00, sprite-00-01, ...) – ez megkönnyíti az animációs importálást a legtöbb game engine-ben." },
      ],
    },
  },

  // ─── Placeholder kép generátor ──────────────────────────────────────────────
  "placeholder-kep": {
    introText:
      "A placeholder kép generátor egyszínű, felirattal ellátott helykitöltő képeket készít tetszőleges méretben – tervezéshez, mockupokhoz és teszteléshez. Állítsd be a szélességet, magasságot, a háttér- és szövegszínt, opcionálisan egy saját feliratot, és töltsd le a kész PNG-t. Kész méret-sablonok (OG, Instagram, banner) gyorsítják a munkát. Minden a böngésződben, canvas-szal készül – nincs szükség szerverre vagy külső placeholder-szolgáltatásra.",
    guide: [
      "1. Válassz egy méret-sablont, vagy add meg a szélességet és magasságot.",
      "2. Állítsd be a háttér- és szövegszínt.",
      "3. Opcionálisan írj be saját feliratot (üresen a méret jelenik meg).",
      "4. Töltsd le a kész PNG képet.",
    ],
    faq: [
      { q: "Mire jó egy placeholder kép?", a: "Tervezés és fejlesztés közben gyakran kell kép a helyére, mielőtt a végleges elkészülne. A placeholder kitölti a helyet a pontos méretben, így látszik az elrendezés – anélkül, hogy a valódi képre kellene várni." },
      { q: "Milyen méretet adhatok meg?", a: "Bármilyen egyénit 1 és 4000 pixel között, vagy válaszd a kész sablonokat (OG 1200×630, Instagram 1080×1080, Story, Full HD, banner). A felirat alapból a megadott méretet mutatja." },
      { q: "Miért jobb, mint egy online placeholder-szolgáltatás?", a: "A klasszikus placeholder-URL-ek (pl. via.placeholder.com) külső szervertől függnek – ha az leáll, a képed eltűnik. Ez az eszköz helyben, a böngésződben generálja a PNG-t, amit letöltesz és a saját projektedbe teszel." },
      { q: "Átlátszó lehet a háttér?", a: "Ez a generátor egyszínű, tömör háttérrel dolgozik a jó láthatóságért. Ha átlátszó, kör alakú képre van szükséged, használd a kör alakú kivágás eszközünket." },
      { q: "A kép szerverre kerül?", a: "Nem. A teljes generálás a böngésződben, canvas-szal történik – semmi nem kerül feltöltésre." },
    ],
    content: {
      howToSteps: [
        { title: "1. Méret", description: "Válassz sablont, vagy add meg a szélességet és magasságot." },
        { title: "2. Színek", description: "Állítsd be a háttér- és szövegszínt." },
        { title: "3. Felirat", description: "Írj saját szöveget, vagy hagyd üresen a méret megjelenítéséhez." },
        { title: "4. Letöltés", description: "Töltsd le a kész PNG képet." },
      ],
      useCases: [
        { icon: "🎨", title: "Webdesign", description: "Elrendezések kitöltése kép-helyekkel a valódi tartalom előtt." },
        { icon: "🧑‍💻", title: "Fejlesztés", description: "Pontos méretű teszt-képek gyors előállítása UI-fejlesztéshez." },
        { icon: "📱", title: "Mockup", description: "Prototípusok és bemutatók feltöltése hihető méretű képekkel." },
        { icon: "📐", title: "Méret-teszt", description: "Egy adott képméret megjelenésének gyors ellenőrzése az elrendezésben." },
      ],
      formatComparison: {
        title: "Népszerű méretek",
        columns: ["Sablon", "Méret"],
        rows: [
          { feature: "Open Graph", values: ["1200 × 630"] },
          { feature: "Instagram", values: ["1080 × 1080"] },
          { feature: "Story", values: ["1080 × 1920"] },
          { feature: "Banner", values: ["300 × 250"] },
        ],
      },
      aboutSection: {
        title: "A placeholder képek szerepe",
        paragraphs: [
          "A tervezés és fejlesztés ritkán halad lineárisan: az elrendezés gyakran előbb készül el, mint a végleges képek. A placeholder kép áthidalja ezt – kitölti a kép helyét a pontos méretben, így a tördelés, az arányok és a vizuális ritmus már a valódi tartalom előtt értékelhető.",
          "Sokan külső placeholder-szolgáltatásokat használnak erre, de azok hálózati függőséget jelentenek: ha a szolgáltatás lassú vagy leáll, a mockup széttörik. Egy helyben generált, letöltött PNG ezzel szemben megbízható és offline is működik – ezért praktikusabb a saját, böngészőben készült placeholder.",
        ],
      },
      tips: [
        { icon: "📐", tip: "A valódi tartalom méretéhez közeli placeholder adja a leghitelesebb elrendezés-képet." },
        { icon: "🎨", tip: "Kontrasztos háttér- és szövegszínt válassz, hogy a méret jól olvasható legyen." },
        { icon: "🔗", tip: "OG-kép teszteléséhez a 1200×630 sablon a szabvány méret." },
        { icon: "⚠️", tip: "Élesítés előtt cseréld le a placeholdert valódi képre – a helykitöltő nem publikációra való." },
      ],
    },
  },

  // ─── Kép → ASCII art ────────────────────────────────────────────────────────
  "kep-ascii": {
    introText:
      "A kép → ASCII art eszköz a feltöltött képet szöveges (ASCII) művészetté alakítja: a pixelek fényereje alapján karaktereket választ, a sötét területekre sűrűbb, a világosakra ritkább jeleket. Állítsd a szélességet, válassz karakterkészletet, és igény szerint invertálj. Az eredményt másolhatod vagy szövegfájlként letöltheted. Retro terminál-hangulathoz, e-mail-aláíráshoz vagy csak szórakozásból. Minden a böngésződben fut, a kép nem kerül szerverre.",
    guide: [
      "1. Tölts fel egy képet (húzd a mezőbe vagy tallózz).",
      "2. Állítsd be a szélességet (karakterben) a csúszkával.",
      "3. Válassz karakterkészletet (sűrű, egyszerű, blokkok) és igény szerint invertálj.",
      "4. Másold ki az ASCII szöveget, vagy töltsd le .txt fájlként.",
    ],
    faq: [
      { q: "Hogyan lesz a képből ASCII?", a: "Az eszköz a képet a megadott szélességre kicsinyíti, majd minden pixel fényerejét (luminanciáját) kiszámolja, és egy karaktert választ hozzá a készletből: sötét pixelhez sűrű jelet (pl. @), világoshoz ritkát (pl. szóköz). Az eredmény soronként összefűzve adja az ASCII képet." },
      { q: "Miért monospace betűvel néz ki jól?", a: "Az ASCII art abból él, hogy minden karakter egyforma széles – így a karakterrács pontosan leképezi a pixeleket. Nem monospace (arányos) betűvel a kép torzul. A megjelenítés és a letöltött szöveg is monospace-re van szánva." },
      { q: "Mit csinál az invertálás?", a: "Alapból a sötét pixelhez tartozik a sűrű karakter (sötét háttéren jól néz ki). Az invertálás megfordítja ezt – világos háttéren, sötét szövegnél lesz helyes az eredmény." },
      { q: "Mekkora a legjobb szélesség?", a: "A 80–120 karakter általában jó egyensúly a részletesség és a méret között. Nagyobb szélesség több részletet ad, de nehezebben fér el; kisebb absztraktabb, stílusosabb eredményt hoz." },
      { q: "A kép szerverre kerül?", a: "Nem. Az átalakítás a böngésződben, canvas-szal történik – a kép nem hagyja el a gépedet." },
    ],
    content: {
      howToSteps: [
        { title: "1. Kép feltöltése", description: "Húzd a képet a mezőbe vagy tallózz." },
        { title: "2. Szélesség", description: "Állítsd be a karakterszélességet a csúszkával." },
        { title: "3. Stílus", description: "Válassz karakterkészletet és igény szerint invertálj." },
        { title: "4. Export", description: "Másold vagy töltsd le az ASCII eredményt." },
      ],
      useCases: [
        { icon: "🖥️", title: "Retro terminál", description: "Szöveges kép terminálhoz, README-hez vagy konzol-alkalmazáshoz." },
        { icon: "✉️", title: "E-mail aláírás", description: "Egyedi, szöveges logó vagy kép e-mail-aláírásba." },
        { icon: "🎨", title: "Kreatív projekt", description: "ASCII art poszterekhez, kódkommentekhez, kreatív felhasználásra." },
        { icon: "😄", title: "Szórakozás", description: "Kedvenc képed szöveges változata megosztásra vagy chatbe." },
      ],
      formatComparison: {
        title: "Karakterkészletek",
        columns: ["Készlet", "Jellemző"],
        rows: [
          { feature: "Sűrű (10 szint)", values: ["Legrészletesebb, sok árnyalat"] },
          { feature: "Egyszerű (5 szint)", values: ["Tisztább, kontrasztosabb"] },
          { feature: "Blokkok", values: ["Unicode blokk-karakterek, tömör hatás"] },
        ],
      },
      aboutSection: {
        title: "Az ASCII art rövid története",
        paragraphs: [
          "Az ASCII art a számítástechnika hőskorába nyúlik vissza, amikor a nyomtatók és a képernyők csak karaktereket tudtak megjeleníteni, képeket nem. A leleményes felhasználók a betűk és jelek eltérő „sűrűségét” használva raktak össze felismerhető képeket – egy @ jel sötétebbnek hat, mint egy pont, egy pont sötétebbnek, mint egy szóköz.",
          "Ez az eszköz ugyanezt az elvet automatizálja: a kép minden apró területének fényerejét egy megfelelő „sűrűségű” karakterre képezi le. Bár ma már valódi képeket is meg tudunk jeleníteni, az ASCII art megőrizte a báját – retró, szöveges, mégis kifejező, és ott is működik, ahol csak sima szöveg lehet (kód, terminál, aláírás).",
        ],
      },
      tips: [
        { icon: "🔲", tip: "Nagy kontrasztú képekből lesz a legjobb ASCII – az egyszínű háttér elveszik." },
        { icon: "📏", tip: "Kezdd 90 karakter szélességgel, majd finomíts a részletesség és méret között." },
        { icon: "🔤", tip: "Az eredményt monospace betűvel illeszd be, különben torzul a kép." },
        { icon: "🌗", tip: "Világos háttérre szánt szövegnél kapcsold be az invertálást." },
      ],
    },
  },

  // ─── Mémgenerátor ───────────────────────────────────────────────────────────
  "mem-generator": {
    introText:
      "A mémgenerátor a klasszikus internetes mém-stílusban ad feliratot a képedhez: felső és alsó szöveg, vastag fehér Impact betűvel, fekete körvonallal. Tölts fel egy képet, írd be a szövegeket, állítsd a betűméretet, és töltsd le a kész mémet PNG-ben. Nincs vízjel, nincs regisztráció, nincs feltöltés – minden a böngésződben készül. Közösségi médiához, csoportos chatekhez, vicces reakciókhoz.",
    guide: [
      "1. Tölts fel egy képet.",
      "2. Írd be a felső és/vagy alsó feliratot.",
      "3. Állítsd be a betűméretet a csúszkával.",
      "4. Töltsd le a kész mémet PNG-ben.",
    ],
    faq: [
      { q: "Miért nagybetűs a felirat?", a: "A klasszikus mém-stílus a nagybetűs, vastag Impact betűtípust használja fekete körvonallal – ez lett a műfaj vizuális védjegye. Az eszköz automatikusan nagybetűsíti a szöveget ehhez a stílushoz." },
      { q: "Kerül vízjel a mémre?", a: "Nem. Sok online mémgenerátor a saját logóját teszi a képre; ez az eszköz tiszta, vízjelmentes PNG-t ad, mert helyben, a böngésződben készül." },
      { q: "Bármilyen kép használható?", a: "Igen, JPG, PNG és WebP képekhez is adhatsz feliratot. A szöveg mérete a kép magasságához igazodik, hogy arányos maradjon." },
      { q: "Miért fekete a körvonal?", a: "A fehér betű fekete körvonallal bármilyen hátéren (világoson és sötéten is) olvasható marad – ez a mém-feliratok bevált trükkje." },
      { q: "A kép szerverre kerül?", a: "Nem. A felirat rárajzolása a böngésződben, canvas-szal történik – a kép nem hagyja el a gépedet." },
    ],
    content: {
      howToSteps: [
        { title: "1. Kép feltöltése", description: "Húzd a képet a mezőbe vagy tallózz." },
        { title: "2. Felirat", description: "Írd be a felső és/vagy alsó szöveget." },
        { title: "3. Méret", description: "Állítsd be a betűméretet a csúszkával." },
        { title: "4. Letöltés", description: "Töltsd le a kész mémet PNG-ben." },
      ],
      useCases: [
        { icon: "😄", title: "Közösségi média", description: "Vicces mémek gyors készítése poszthoz vagy story-hoz." },
        { icon: "💬", title: "Csoportos chat", description: "Reakció-mémek baráti és munkahelyi csoportokba." },
        { icon: "📣", title: "Marketing", description: "Könnyed, mémes tartalom márkakommunikációhoz." },
        { icon: "🎓", title: "Oktatás", description: "Figyelemfelkeltő, humoros illusztrációk prezentációkhoz." },
      ],
      formatComparison: {
        title: "A mém-felirat jellemzői",
        columns: ["Elem", "Stílus"],
        rows: [
          { feature: "Betűtípus", values: ["Impact (vastag, kondenzált)"] },
          { feature: "Szín", values: ["Fehér kitöltés, fekete körvonal"] },
          { feature: "Elhelyezés", values: ["Felül és alul, középre"] },
          { feature: "Forma", values: ["Nagybetűs"] },
        ],
      },
      aboutSection: {
        title: "A mém mint vizuális nyelv",
        paragraphs: [
          "Az internetes mém önálló vizuális nyelvvé vált: egy kép és egy tömör felirat kombinációja, amely azonnal közvetít egy érzést, viccet vagy véleményt. A klasszikus formátum – kép felül-alul nagybetűs, fehér-fekete felirattal – annyira beépült a kultúrába, hogy önmagában is jelzi: ez egy mém.",
          "Ez az eszköz pontosan ezt a bevált formátumot teszi elérhetővé, gyorsan és tisztán. Nincs szükség képszerkesztőre vagy fiókra: feltöltöd a képet, beírod a szöveget, és kész a megosztható mém. Mivel minden helyben történik, a bizalmas vagy privát képekből is nyugodtan készíthetsz mémet, vízjel és adatküldés nélkül.",
        ],
      },
      tips: [
        { icon: "✍️", tip: "A rövid, ütős felirat működik a legjobban – a mém a tömörségről szól." },
        { icon: "📏", tip: "Ha a szöveg túl nagy vagy kicsi, a csúszkával igazítsd a kép arányához." },
        { icon: "🖼️", tip: "Erős, felismerhető képet válassz – a mém a kép és a szöveg együtthatásából él." },
        { icon: "🔒", tip: "Privát képből is nyugodtan készíthetsz mémet – minden a böngésződben marad." },
      ],
    },
  },

  // ─── Kép-összehasonlító (diff) ──────────────────────────────────────────────
  "kep-diff": {
    introText:
      "A kép-összehasonlító két képet vet össze pixelről pixelre, és pirossal kiemeli az eltérő területeket, plus megmutatja, a pixelek hány százaléka különbözik. Tölts fel egy „A” és egy „B” képet, állítsd az érzékenységi küszöböt, és azonnal látod a különbség-térképet. Hasznos verziók, exportok, tömörített változatok vagy tervezési iterációk összevetéséhez. Minden a böngésződben fut, a képek nem kerülnek szerverre.",
    guide: [
      "1. Tölts fel egy első (A) és egy második (B) képet.",
      "2. Állítsd az érzékenységi küszöböt a csúszkával.",
      "3. Olvasd le a piros diff-térképet és az eltérő pixelek százalékát.",
      "4. Töltsd le a diff-képet, ha szükséges.",
    ],
    faq: [
      { q: "Hogyan hasonlít össze?", a: "Az eszköz mindkét képet az A méretére igazítja, majd minden pixelnél összeveti a szín-értékeket. Ha a különbség a küszöb felett van, a pixelt pirosra festi; egyébként halványítva mutatja. A végén kiszámolja az eltérő pixelek arányát." },
      { q: "Mire jó az érzékenységi küszöb?", a: "A küszöb szabályozza, mekkora eltérés számítson már „különbségnek”. Alacsony küszöb a legapróbb eltéréseket is jelzi (pl. tömörítési zaj); magasabb küszöb csak a szembetűnő változásokat emeli ki." },
      { q: "Mi van, ha a két kép mérete eltér?", a: "Az eszköz a második képet az első (A) méretére skálázza az összehasonlítás előtt. A legpontosabb eredményhez érdemes azonos méretű képeket használni." },
      { q: "Mit jelent a százalék?", a: "Az eltérő (küszöb feletti) pixelek aránya az összes pixelhez képest. 0% azonos képeket jelent (a küszöb felett); minél nagyobb a szám, annál több a különbség." },
      { q: "A képek szerverre kerülnek?", a: "Nem. A teljes összehasonlítás a böngésződben, canvas-szal történik – a képek nem hagyják el a gépedet." },
    ],
    content: {
      howToSteps: [
        { title: "1. Két kép", description: "Tölts fel egy A és egy B képet." },
        { title: "2. Küszöb", description: "Állítsd az érzékenységi küszöböt a csúszkával." },
        { title: "3. Diff", description: "Olvasd le a piros különbség-térképet és a százalékot." },
        { title: "4. Letöltés", description: "Töltsd le a diff-képet, ha kell." },
      ],
      useCases: [
        { icon: "🔍", title: "Verzió-ellenőrzés", description: "Egy kép két változatának összevetése – mi változott?" },
        { icon: "🗜️", title: "Tömörítés", description: "Az eredeti és a tömörített kép közti eltérés vizuális ellenőrzése." },
        { icon: "🎨", title: "Tervezés", description: "Két design-iteráció különbségeinek gyors áttekintése." },
        { icon: "🧪", title: "Regressziós teszt", description: "Egy render vagy screenshot változásának kiszűrése két állapot között." },
      ],
      formatComparison: {
        title: "A diff jelölései",
        columns: ["Terület", "Jelentés"],
        rows: [
          { feature: "Piros", values: ["Eltérő pixel (küszöb felett)"] },
          { feature: "Halvány", values: ["Azonos (vagy küszöb alatti) pixel"] },
          { feature: "Százalék", values: ["Az eltérő pixelek aránya"] },
        ],
      },
      aboutSection: {
        title: "Miért hasznos a kép-diff?",
        paragraphs: [
          "Két hasonló kép között szabad szemmel nehéz megtalálni az apró eltéréseket – egy elmozdult elem, egy színárnyalat-változás vagy egy tömörítési artefakt könnyen elkerüli a figyelmet. A pixel-szintű összehasonlítás ezt teszi láthatóvá: pontosan megmutatja, hol és mennyire tér el a két kép.",
          "Ez a fejlesztésben és a tervezésben egyaránt hasznos. A fejlesztők regressziós tesztként használják (egy változtatás nem rontott-e el egy megjelenítést), a tervezők két iteráció összevetésére, a fotósok pedig a tömörítés hatásának ellenőrzésére. Az érzékenységi küszöb segít elválasztani a lényeges változásokat a jelentéktelen zajtól.",
        ],
      },
      tips: [
        { icon: "📐", tip: "A legpontosabb eredményhez azonos méretű képeket hasonlíts össze." },
        { icon: "🎚️", tip: "Tömörítési zaj kiszűréséhez emeld a küszöböt; apró eltérésekhez csökkentsd." },
        { icon: "🔴", tip: "A piros foltok sűrűsége azonnal jelzi, hol koncentrálódik a változás." },
        { icon: "🔒", tip: "Bizalmas képeket is nyugodtan összevethetsz – minden helyben marad." },
      ],
    },
  },

  // ─── QR-kód olvasó ──────────────────────────────────────────────────────────
  "qr-olvaso": {
    introText:
      "A QR-kód olvasó egy feltöltött képből kiolvassa a QR-kód tartalmát – legyen az URL, szöveg, wifi-adat vagy bármi más. Húzd be a QR-kódot tartalmazó képet vagy képernyőképet, és a dekódolt tartalom azonnal megjelenik, egy kattintással másolható. Ha a tartalom URL, biztonsági okból nem nyitjuk meg automatikusan – előbb ellenőrizheted. Minden a böngésződben fut, a kép nem kerül szerverre. A QR-generátorunk párja.",
    guide: [
      "1. Tölts fel egy QR-kódot tartalmazó képet vagy képernyőképet.",
      "2. A dekódolt tartalom azonnal megjelenik.",
      "3. Másold ki a tartalmat egy kattintással.",
      "4. Ha URL, ellenőrizd, mielőtt megnyitod.",
    ],
    faq: [
      { q: "Milyen QR-kódot olvas?", a: "A szabványos QR-kódokat, amelyek URL-t, sima szöveget, wifi-hozzáférést, névjegyet (vCard) vagy más adatot tartalmaznak. A legjobb eredményhez éles, jól kivágott, szemből fotózott vagy képernyőképként mentett QR működik." },
      { q: "Miért nem nyitja meg automatikusan az URL-t?", a: "Biztonsági okból. Egy QR-kód bármilyen címre mutathat, akár megtévesztőre is. Az eszköz megmutatja a tartalmat, de a megnyitás a te döntésed – így elkerülhető, hogy egy rosszindulatú QR automatikusan veszélyes oldalra vigyen." },
      { q: "Mit tegyek, ha nem találja a kódot?", a: "Próbálj élesebb, jobban kivágott képet, ahol a QR-kód nagyobb és tisztán látszik. A homályos, ferde vagy nagyon kicsi QR-kódokat nehezebb dekódolni. Segít, ha a kód körül van némi fehér margó." },
      { q: "Kamerával is működik?", a: "Ez az eszköz feltöltött képből (fájlból vagy képernyőképből) olvas. Ha egy fizikai QR-t akarsz beolvasni, készíts róla fotót, majd töltsd fel." },
      { q: "A kép szerverre kerül?", a: "Nem. A dekódolás teljesen a böngésződben történik – a kép és a QR tartalma nem hagyja el a gépedet." },
    ],
    content: {
      howToSteps: [
        { title: "1. Kép feltöltése", description: "Húzd be a QR-kódos képet vagy képernyőképet." },
        { title: "2. Dekódolás", description: "A tartalom azonnal megjelenik." },
        { title: "3. Másolás", description: "A dekódolt szöveget egy kattintással másolod." },
        { title: "4. Ellenőrzés", description: "URL esetén nézd meg, mielőtt megnyitod." },
      ],
      useCases: [
        { icon: "🔗", title: "Link kinyerése", description: "Egy QR-kód mögötti URL kiolvasása kattintás előtt, biztonságosan." },
        { icon: "📶", title: "Wifi-adat", description: "Egy wifi-QR tartalmának (hálózat, jelszó) kiolvasása." },
        { icon: "🖼️", title: "Képernyőkép", description: "Egy képen vagy plakáton lévő QR gyors beolvasása fotóból." },
        { icon: "🛡️", title: "Biztonság", description: "Gyanús QR tartalmának ellenőrzése automatikus megnyitás nélkül." },
      ],
      formatComparison: {
        title: "QR-tartalom típusok",
        columns: ["Típus", "Példa"],
        rows: [
          { feature: "URL", values: ["https://pelda.hu"] },
          { feature: "Szöveg", values: ["Tetszőleges üzenet"] },
          { feature: "Wifi", values: ["Hálózatnév + jelszó"] },
          { feature: "vCard", values: ["Névjegy-adatok"] },
        ],
      },
      aboutSection: {
        title: "A QR-kód és a biztonság",
        paragraphs: [
          "A QR-kód (Quick Response) egy kétdimenziós vonalkód, amely sokféle adatot tárolhat: leggyakrabban URL-t, de szöveget, wifi-hozzáférést vagy névjegyet is. A népszerűsége miatt a QR-kódok azonban biztonsági kockázatot is jelentenek: egy rosszindulatú kód megtévesztő vagy káros oldalra irányíthat, és szabad szemmel nem lehet megmondani, hová mutat.",
          "Ezért fontos, hogy a QR tartalmát a megnyitás ELŐTT lássuk. Ez az eszköz pontosan ezt teszi lehetővé: kiolvassa és megmutatja a kód tartalmát, de URL esetén nem nyitja meg automatikusan – rád bízza a döntést. Mivel a dekódolás helyben, a böngésződben történik, a beolvasott adat privát marad, és a bizalmas QR-kódokat is nyugodtan ellenőrizheted.",
        ],
      },
      tips: [
        { icon: "🎯", tip: "Éles, jó kontrasztú, szemből fotózott QR dekódolódik a legjobban." },
        { icon: "⚠️", tip: "URL-t soha ne nyiss meg vakon – előbb nézd meg, hová mutat." },
        { icon: "🖼️", tip: "Ha nem sikerül, vágd körbe szorosabban a QR-t, kis fehér margóval." },
        { icon: "🔗", tip: "QR-kódot generálni is tudsz nálunk – ez az olvasó annak a párja." },
      ],
    },
  },

  // ─── Kör alakú kivágás (avatar) ─────────────────────────────────────────────
  "kerek-vagas": {
    introText:
      "A kör alakú kivágás a képedet tökéletes körré vágja – ideális profilképhez és avatarhoz. Az eredmény átlátszó hátterű PNG, így bárhová beilleszthető anélkül, hogy fehér sarkok lógnának ki. Tölts fel egy képet, állítsd a méretet és opcionálisan egy keretet, és töltsd le. A kép középről négyzetre, majd körré vágódik. Minden a böngésződben fut, feltöltés nélkül.",
    guide: [
      "1. Tölts fel egy képet.",
      "2. Állítsd be a kimeneti méretet (px).",
      "3. Opcionálisan adj hozzá keretet és válaszd ki a színét.",
      "4. Töltsd le az átlátszó hátterű, kör alakú PNG-t.",
    ],
    faq: [
      { q: "Miért átlátszó a háttér?", a: "A kör körüli sarkok átlátszóak (nem fehérek), így az avatar bármilyen színű háttéren jól néz ki – nem lóg ki fehér négyzet a kör körül. Ezt PNG formátum teszi lehetővé, amely támogatja az átlátszóságot." },
      { q: "Hogyan vágja körre a képet?", a: "Az eszköz először a kép közepéből egy négyzetet vág ki (a rövidebb oldal alapján), majd erre a négyzetre egy kör-maszkot alkalmaz. Így a kép középső része marad meg, kör alakban." },
      { q: "Milyen méretet válasszak?", a: "A legtöbb platform 200–500 pixel közötti profilképet használ. A 400 px jó általános választás; ha nagyobb felbontás kell, állítsd feljebb (max. 1024)." },
      { q: "Mire jó a keret?", a: "A keret egy színes gyűrűt tesz a kör köré – ez kiemeli az avatart, és egységes megjelenést ad egy csapat vagy márka profilképeinek. Opcionális, alapból nincs keret." },
      { q: "A kép szerverre kerül?", a: "Nem. A kivágás a böngésződben, canvas-szal történik – a kép nem hagyja el a gépedet." },
    ],
    content: {
      howToSteps: [
        { title: "1. Kép feltöltése", description: "Húzd a képet a mezőbe vagy tallózz." },
        { title: "2. Méret", description: "Állítsd be a kimeneti méretet pixelben." },
        { title: "3. Keret", description: "Opcionálisan adj hozzá színes keretet." },
        { title: "4. Letöltés", description: "Töltsd le az átlátszó PNG avatart." },
      ],
      useCases: [
        { icon: "👤", title: "Profilkép", description: "Kerek avatar közösségi média és fórum profilokhoz." },
        { icon: "💬", title: "Chat / csapat", description: "Egységes, kör alakú profilképek egy csapatnak vagy közösségnek." },
        { icon: "🌐", title: "Weboldal", description: "Kerek szerző- vagy vélemény-avatarok egy weboldalon." },
        { icon: "🎨", title: "Design", description: "Kör alakú képelemek prezentációkhoz és grafikákhoz." },
      ],
      formatComparison: {
        title: "Az eredmény jellemzői",
        columns: ["Tulajdonság", "Érték"],
        rows: [
          { feature: "Forma", values: ["Tökéletes kör"] },
          { feature: "Háttér", values: ["Átlátszó (PNG)"] },
          { feature: "Kivágás", values: ["Középről, négyzet → kör"] },
          { feature: "Keret", values: ["Opcionális, színes"] },
        ],
      },
      aboutSection: {
        title: "Miért népszerű a kör alakú avatar?",
        paragraphs: [
          "A kör alakú profilkép a modern felületek egyik jellegzetessége: a közösségi platformok, chat-alkalmazások és weboldalak túlnyomó része körben jeleníti meg az avatarokat. A kör lágyabb, barátságosabb hatású, mint a szögletes kép, és jól illeszkedik a letisztult, modern designhoz.",
          "A gond az, hogy ha egy négyzetes képet töltünk fel oda, ahol a felület körre vágja, a részletek a sarkokban elveszhetnek. Ha viszont eleve kör alakú, átlátszó hátterű PNG-t készítünk, teljes kontrollt kapunk az eredmény felett – pontosan az látszik, amit szeretnénk, fehér sarkok nélkül. Ez az eszköz ezt a kör alakú, átlátszó avatart állítja elő, helyben és gyorsan.",
        ],
      },
      tips: [
        { icon: "🎯", tip: "A legjobb eredményhez olyan képet válassz, ahol a lényeg középen van – a szélek levágódnak." },
        { icon: "🖼️", tip: "Az átlátszó PNG bármilyen háttéren jól néz ki – ne alakítsd JPG-vé, mert az elveszti az átlátszóságot." },
        { icon: "⭕", tip: "Egységes csapat-avatarokhoz használj azonos méretet és keretszínt mindegyiknél." },
        { icon: "🔒", tip: "A képed a böngésződben marad – privát fotóból is nyugodtan készíthetsz avatart." },
      ],
    },
  },
};
