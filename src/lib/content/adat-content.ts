import type { ContentMap } from "./types.ts";

export const ADAT_CONTENT: ContentMap = {
  // ═══ 1. CSV → JSON ═════════════════════════════════════════════════════
  "csv-json": {
    introText:
      "A CSV → JSON konvertáló eszköz lehetővé teszi, hogy CSV fájljaidat egyetlen kattintással strukturált JSON formátumba alakítsd. Automatikus delimiter-felismeréssel, fejléc-kezeléssel és típusdetektálással dolgozik, és az egész feldolgozás a böngésződben történik.",
    guide: [
      "1. Töltsd fel a CSV fájlt vagy illeszd be a szöveget a beviteli mezőbe.",
      "2. Az eszköz automatikusan felismeri a delimitert (vessző, pontosvessző, tabulátor, pipe).",
      "3. Kattints a «Konvertálás» gombra – az eredmény JSON formátumban jelenik meg.",
      "4. Másold ki a JSON-t a vágólapra vagy töltsd le .json fájlként.",
    ],
    faq: [
      { q: "Mire jó a CSV → JSON konvertáló?", a: "CSV táblázatos adatok JSON formátumba alakítására szolgál, ami ideális API-k, webalkalmazások és adatfeldolgozó rendszerek számára." },
      { q: "Biztonságos az adataim szempontjából?", a: "Igen. Minden feldolgozás 100%-ban a böngésződben történik, semmilyen adat nem kerül szerverre – teljes adatvédelem." },
      { q: "Milyen delimitereket ismer fel automatikusan?", a: "Vesszőt (,), pontosvesszőt (;), tabulátort és pipe (|) karaktert. Az auto-detect mód a fájl tartalmából határozza meg a helyes elválasztót." },
      { q: "Megőrzi-e a számok és boolean típusokat?", a: "Igen, opcionálisan bekapcsolható az automatikus típusdetektálás, amely a számokat és boolean értékeket megfelelő JSON típusként kezeli." },
      { q: "Mobilon is használhatom?", a: "Igen, az eszköz teljesen reszponzív, mobilon és tableten is kiválóan működik bármilyen modern böngészőben." },
      { q: "Van méretkorlát?", a: "Nincs szerver oldali korlát, mivel a feldolgozás a böngészőben történik. Nagy fájlok esetén Web Worker-ben fut a konvertálás, így az UI nem fagy le." },
    ],
    content: {
      howToSteps: [
        { title: "1. CSV feltöltése", description: "Húzd be a CSV fájlt, vagy illeszd be a szöveges tartalmat a beviteli mezőbe." },
        { title: "2. Beállítások ellenőrzése", description: "Ellenőrizd az automatikusan felismert delimitert és a fejléc beállítást. Szükség esetén módosítsd." },
        { title: "3. Konvertálás", description: "Kattints a «Konvertálás» gombra – a JSON azonnal megjelenik az előnézeti panelen." },
        { title: "4. Eredmény mentése", description: "Másold ki a JSON-t a vágólapra, vagy töltsd le .json fájlként." },
      ],
      useCases: [
        { icon: "🔌", title: "API adatfeltöltés", description: "CSV táblázatból JSON payload készítése REST API-k számára, manuális átalakítás nélkül." },
        { icon: "📊", title: "Adatelemzés", description: "Táblázatkezelőből exportált CSV adatok konvertálása JSON-ba JavaScript vagy Python feldolgozáshoz." },
        { icon: "🗄️", title: "Adatbázis migráció", description: "CSV exportok JSON formátumba alakítása NoSQL adatbázisok (MongoDB, Firebase) importálásához." },
        { icon: "⚙️", title: "Konfiguráció generálás", description: "CSV-ben tárolt beállítások JSON config fájllá alakítása webalkalmazások számára." },
      ],
      formatComparison: {
        title: "CSV vs JSON összehasonlítás",
        columns: ["Tulajdonság", "CSV", "JSON"],
        rows: [
          { feature: "Struktúra", values: ["Lapos, táblázatos", "Hierarchikus, egymásba ágyazható"] },
          { feature: "Olvashatóság", values: ["Táblázatban kiváló", "Kód szintű, formázható"] },
          { feature: "Fájlméret", values: ["Kisebb (nincs kulcsnév ismétlés)", "Nagyobb (kulcsnevek minden sorban)"] },
          { feature: "Típuskezelés", values: ["Minden szöveg", "Szám, boolean, null, tömb, objektum"] },
          { feature: "Használat", values: ["Excel, táblázatok, export", "API, webalkalmazás, NoSQL DB"] },
        ],
      },
      aboutSection: {
        title: "A CSV → JSON konvertálásról",
        paragraphs: [
          "A CSV (Comma-Separated Values) az egyik legelterjedtebb adatcsere-formátum, amelyet táblázatkezelők és adatbázisok egyaránt használnak. Egyszerű, lapos struktúrája ideális táblázatos adatokhoz, de nem támogatja az egymásba ágyazott adatokat.",
          "A JSON (JavaScript Object Notation) a modern webalkalmazások és API-k elsődleges adatformátuma. Támogatja a komplex, hierarchikus adatstruktúrákat, a típusos értékeket és a tömbök használatát.",
          "A CSV → JSON konvertálás a leggyakrabban akkor szükséges, amikor táblázatos adatokat kell webalkalmazásba integrálni, API-n keresztül küldeni, vagy NoSQL adatbázisba importálni.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Ellenőrizd, hogy a CSV fejlécei érvényes JSON kulcsok-e – kerüld a szóközöket és speciális karaktereket a fejlécekben." },
        { icon: "🔢", tip: "Kapcsold be az automatikus típusdetektálást, ha a számokat és boolean értékeket JSON típusként szeretnéd kezelni." },
        { icon: "📋", tip: "Magyar CSV fájloknál gyakori a pontosvessző delimiter – az auto-detect ezt automatikusan felismeri." },
        { icon: "⚠️", tip: "Ha a CSV cellaértékek vessz tartalmaznak, győződj meg róla, hogy idézőjelben vannak." },
      ],
    },
  },

  // ═══ 2. JSON → CSV ═════════════════════════════════════════════════════
  "json-csv": {
    introText:
      "A JSON → CSV konvertáló eszköz JSON tömböket alakít táblázatos CSV formátumba, amelyet Excel, Google Sheets vagy bármilyen táblázatkezelő megnyit. Választható delimiter, fejléc-kezelés és az egész feldolgozás a böngésződben történik.",
    guide: [
      "1. Illeszd be a JSON tömböt a beviteli mezőbe, vagy töltsd fel a .json fájlt.",
      "2. Válaszd ki a kívánt delimitert (vessző, pontosvessző, tabulátor).",
      "3. Kattints a «Konvertálás» gombra – a CSV előnézet azonnal megjelenik.",
      "4. Másold ki az eredményt vagy töltsd le .csv fájlként.",
    ],
    faq: [
      { q: "Mire jó a JSON → CSV konvertáló?", a: "JSON formátumú adatok táblázatos CSV-vé alakítására szolgál, amelyet Excelben, Google Sheetsben vagy más táblázatkezelőben közvetlenül megnyithatsz." },
      { q: "Biztonságos az adataim szempontjából?", a: "Igen. A feldolgozás teljes egészében a böngésződben történik, az adataid nem hagyják el a gépedet." },
      { q: "Milyen JSON struktúrát fogad?", a: "Objektumok tömbjét (array of objects) várja, ahol a kulcsok lesznek a CSV fejlécek. Pl. [{\"nev\": \"Anna\", \"kor\": 25}]." },
      { q: "Mi történik az egymásba ágyazott objektumokkal?", a: "Az egymásba ágyazott objektumok és tömbök automatikusan JSON stringként kerülnek a cellába, így nem vesznek el adatok." },
      { q: "Mobilon is használhatom?", a: "Igen, az eszköz reszponzív és minden modern böngészőben működik, beleértve a mobil böngészőket is." },
      { q: "Választhatok pontosvessző delimitert?", a: "Igen, vessző, pontosvessző és tabulátor közül választhatsz. Magyar Excel esetén a pontosvessző a legmegfelelőbb." },
    ],
    content: {
      howToSteps: [
        { title: "1. JSON beillesztése", description: "Illeszd be a JSON tömböt a beviteli mezőbe, vagy húzd be a .json fájlt." },
        { title: "2. Delimiter kiválasztása", description: "Válaszd ki a CSV elválasztó karaktert: vessző, pontosvessző vagy tabulátor." },
        { title: "3. Konvertálás", description: "Kattints a «Konvertálás» gombra – a CSV táblázat azonnal megjelenik az előnézetben." },
        { title: "4. Eredmény letöltése", description: "Másold ki a CSV-t vagy töltsd le .csv fájlként, amelyet Excelben is megnyithatsz." },
      ],
      useCases: [
        { icon: "📈", title: "Riporting", description: "API-ból kapott JSON adatok CSV-vé alakítása Excel riportok és diagramok készítéséhez." },
        { icon: "📧", title: "Adatexport", description: "Webalkalmazásból exportált JSON adatok táblázatos formába hozása üzleti felhasználók számára." },
        { icon: "🔄", title: "Rendszerintegráció", description: "JSON API válaszok CSV-vé alakítása legacy rendszerek vagy importáló eszközök számára." },
        { icon: "📊", title: "Adatelemzés Excelben", description: "JSON adatokat CSV-n keresztül Excel pivot táblákban és diagramokban elemezheted." },
      ],
      formatComparison: {
        title: "JSON vs CSV összehasonlítás",
        columns: ["Tulajdonság", "JSON", "CSV"],
        rows: [
          { feature: "Struktúra", values: ["Hierarchikus, egymásba ágyazható", "Lapos, táblázatos"] },
          { feature: "Olvashatóság", values: ["Kód szintű, formázható", "Táblázatban kiváló"] },
          { feature: "Típuskezelés", values: ["Szám, boolean, null, tömb", "Minden szöveg"] },
          { feature: "Fájlméret", values: ["Nagyobb (kulcsnév ismétlődik)", "Kisebb, tömörebb"] },
          { feature: "Támogatás", values: ["API, webalkalmazás", "Excel, Google Sheets, DB import"] },
        ],
      },
      aboutSection: {
        title: "A JSON → CSV konvertálásról",
        paragraphs: [
          "A JSON → CSV konvertálás a leggyakoribb adatformátum-átalakítás a modern fejlesztésben. API-k és webalkalmazások JSON-ban kommunikálnak, de az üzleti felhasználók és elemzők táblázatkezelőben dolgoznak.",
          "Az átalakítás során a JSON objektumok kulcsai a CSV fejlécekké válnak, az értékek pedig a sorok celláiba kerülnek. Egymásba ágyazott struktúrák automatikusan JSON stringként jelennek meg.",
          "Az eszköz különösen hasznos, ha rendszeresen kell JSON adatokat Excel-kompatibilis formátumba hozni riportokhoz, elemzésekhez vagy adatimportokhoz.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Magyar Excel pontosvesszőt vár delimiternek – válaszd ezt, ha Excelben nyitod meg a fájlt." },
        { icon: "📋", tip: "Győződj meg róla, hogy a JSON objektumok tömbjét adod meg, nem egyetlen objektumot." },
        { icon: "🔑", tip: "Ha az objektumoknak eltérő kulcsaik vannak, az összes egyedi kulcs fejlécként jelenik meg, a hiányzó értékek üres cellák lesznek." },
        { icon: "⚠️", tip: "Egymásba ágyazott objektumokat érdemes előbb laposítani (flatten), ha külön oszlopokba szeretnéd a mezőiket." },
      ],
    },
  },

  // ═══ 3. TSV → CSV ══════════════════════════════════════════════════════
  "tsv-csv": {
    introText:
      "A TSV → CSV konvertáló tabulátorral elválasztott adatfájlokat alakít vesszővel elválasztott CSV formátumba. Az átalakítás a böngészőben történik, szerverfeltöltés nélkül, így az adataid teljes biztonságban maradnak.",
    guide: [
      "1. Töltsd fel a TSV fájlt vagy illeszd be a tabulátorral tagolt szöveget.",
      "2. Válaszd ki a cél-delimitert (vessző vagy pontosvessző).",
      "3. Kattints a «Konvertálás» gombra – a CSV azonnal megjelenik.",
      "4. Töltsd le a .csv fájlt vagy másold ki az eredményt.",
    ],
    faq: [
      { q: "Mire jó a TSV → CSV konvertáló?", a: "Tabulátorral elválasztott adatfájlok (TSV) vesszővel elválasztott CSV formátumba alakítására szolgál, amely szélesebb körben támogatott." },
      { q: "Biztonságos az adataim szempontjából?", a: "Igen. A teljes feldolgozás a böngésződben történik, semmilyen adat nem kerül szerverre." },
      { q: "Mi a különbség a TSV és CSV között?", a: "A TSV tabulátort használ elválasztóként, a CSV vesszőt. A CSV szélesebb körben támogatott, de a TSV-ben nem kell idézőjelezni a vesszőt tartalmazó cellákat." },
      { q: "Kezeli az idézőjeleket?", a: "Igen, ha egy cella vesszőt tartalmaz, automatikusan idézőjelbe kerül a CSV kimenetben, hogy az adatok ne sérüljenek." },
      { q: "Mobilon is használhatom?", a: "Igen, az eszköz reszponzív és bármilyen modern böngészőben működik, beleértve a mobil eszközöket is." },
      { q: "Hogyan ismerem fel a TSV fájlt?", a: "A TSV fájl kiterjesztése általában .tsv vagy .txt, és tabulátor karakterek választják el az oszlopokat. Szövegszerkesztőben a tabulátor nagyobb szóközként jelenik meg." },
    ],
    content: {
      howToSteps: [
        { title: "1. TSV feltöltése", description: "Húzd be a TSV fájlt a felületre, vagy illeszd be a tabulátorral tagolt szöveget." },
        { title: "2. Cél-delimiter beállítása", description: "Válaszd ki, hogy vesszőt vagy pontosvesszőt szeretnél a CSV kimenetben." },
        { title: "3. Konvertálás", description: "Kattints a «Konvertálás» gombra – az eredmény azonnal megjelenik." },
        { title: "4. Letöltés", description: "Töltsd le a kész .csv fájlt vagy másold ki a vágólapra." },
      ],
      useCases: [
        { icon: "📋", title: "Adatbázis export", description: "Adatbázisból TSV-be exportált adatok átalakítása CSV-vé táblázatkezelők és más eszközök számára." },
        { icon: "📊", title: "Excel import", description: "TSV fájlok CSV-vé alakítása, amelyet az Excel és Google Sheets közvetlenül megnyit." },
        { icon: "🔄", title: "Rendszerek közötti csere", description: "Különböző rendszerek eltérő delimiter-formátumot várnak – a konvertálás megoldja a kompatibilitást." },
      ],
      formatComparison: {
        title: "TSV vs CSV összehasonlítás",
        columns: ["Tulajdonság", "TSV", "CSV"],
        rows: [
          { feature: "Elválasztó", values: ["Tabulátor (\\t)", "Vessző (,) vagy pontosvessző (;)"] },
          { feature: "Idézőjelezés", values: ["Ritkán szükséges", "Gyakran szükséges (ha cella vesszőt tartalmaz)"] },
          { feature: "Támogatottság", values: ["Szűkebb kör", "Széleskörű (Excel, DB, API)"] },
          { feature: "Olvashatóság", values: ["Jó (igazított oszlopok)", "Tömör, de nehezebb olvasni"] },
          { feature: "Másolás táblázatból", values: ["Copy-paste alapértelmezett", "Manuális konverzió szükséges"] },
        ],
      },
      aboutSection: {
        title: "A TSV formátumról",
        paragraphs: [
          "A TSV (Tab-Separated Values) egy egyszerű szöveges formátum, ahol az oszlopokat tabulátor karakter választja el. Gyakran használják adatbázisok exportálásánál és táblázatos adatok másolásánál.",
          "A CSV (Comma-Separated Values) a legelterjedtebb táblázatos adatformátum, amelyet szinte minden alkalmazás támogat. A TSV-ről CSV-re váltás javítja a kompatibilitást Excel, Google Sheets és más eszközökkel.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Táblázatkezelőből kimásolt adatok általában TSV formátumúak – illeszt be közvetlenül az eszközbe." },
        { icon: "📋", tip: "Magyar Excel-hez válaszd a pontosvessző delimitert a vessző helyett." },
        { icon: "⚠️", tip: "Ellenőrizd, hogy az adataid valóban tabulátorral vannak elválasztva, és nem több szóközzel." },
      ],
    },
  },

  // ═══ 4. CSV → TSV ══════════════════════════════════════════════════════
  "csv-tsv": {
    introText:
      "A CSV → TSV konvertáló vesszővel elválasztott CSV adatokat alakít tabulátorral tagolt TSV formátumba. Az átalakítás böngészőben történik, szerverfeltöltés nélkül, és az eredmény közvetlenül beilleszthető táblázatkezelőkbe.",
    guide: [
      "1. Töltsd fel a CSV fájlt vagy illeszd be a szöveges tartalmat.",
      "2. Ellenőrizd a forrás-delimiter beállítást (vessző vagy pontosvessző).",
      "3. Kattints a «Konvertálás» gombra – a TSV kimenet azonnal megjelenik.",
      "4. Másold ki az eredményt vagy töltsd le .tsv fájlként.",
    ],
    faq: [
      { q: "Mire jó a CSV → TSV konvertáló?", a: "CSV fájlok tabulátorral elválasztott TSV formátumba alakítására szolgál, ami ideális adatbázis-importokhoz és táblázatkezelőkbe történő beillesztéshez." },
      { q: "Biztonságos az adataim szempontjából?", a: "Igen. A feldolgozás 100%-ban a böngésződben történik, az adatok nem kerülnek szerverre." },
      { q: "Miért használjak TSV-t CSV helyett?", a: "A TSV-ben nem kell idézőjelezni a vesszőt tartalmazó cellákat, és a tabulátorral tagolt adatok közvetlenül beilleszthetők táblázatkezelőkbe." },
      { q: "Kezeli a pontosvesszős CSV-t?", a: "Igen, az eszköz automatikusan felismeri a vesszővel és pontosvesszővel elválasztott CSV fájlokat is." },
      { q: "Mobilon is használhatom?", a: "Igen, az eszköz teljesen reszponzív és minden modern böngészőben működik." },
      { q: "Megőrzi az idézőjeleket?", a: "Az idézőjelezés a TSV-ben ritkán szükséges. Az eszköz eltávolítja a felesleges idézőjeleket, és csak akkor alkalmazza, ha a cella tabulátort tartalmaz." },
    ],
    content: {
      howToSteps: [
        { title: "1. CSV feltöltése", description: "Húzd be a CSV fájlt, vagy illeszd be a vesszővel tagolt szöveget a beviteli mezőbe." },
        { title: "2. Forrás-delimiter ellenőrzése", description: "Győződj meg róla, hogy az eszköz helyesen ismerte fel a CSV delimitert." },
        { title: "3. Konvertálás", description: "Kattints a «Konvertálás» gombra – a TSV kimenet azonnal megjelenik." },
        { title: "4. Eredmény másolása", description: "Másold ki a TSV szöveget közvetlenül táblázatkezelőbe, vagy töltsd le .tsv fájlként." },
      ],
      useCases: [
        { icon: "📋", title: "Beillesztés táblázatkezelőbe", description: "A TSV formátum közvetlenül beilleszthető Excelbe vagy Google Sheets-be, az oszlopok automatikusan szétválnak." },
        { icon: "🗄️", title: "Adatbázis import", description: "Több adatbázis-kezelő rendszer natívan támogatja a TSV importálást, elkerülve az idézőjelezési problémákat." },
        { icon: "🔬", title: "Tudományos adatfeldolgozás", description: "Bioinformatikai és tudományos eszközök gyakran TSV formátumot várnak bemenetként." },
      ],
      formatComparison: {
        title: "CSV vs TSV összehasonlítás",
        columns: ["Tulajdonság", "CSV", "TSV"],
        rows: [
          { feature: "Elválasztó", values: ["Vessző (,) vagy pontosvessző (;)", "Tabulátor (\\t)"] },
          { feature: "Idézőjelezés", values: ["Gyakran szükséges", "Ritkán szükséges"] },
          { feature: "Beillesztés táblázatba", values: ["Import szükséges", "Közvetlen paste"] },
          { feature: "Fájlméret", values: ["Kisebb", "Kissé nagyobb (tab = 1 karakter)"] },
          { feature: "Kompatibilitás", values: ["Széleskörű", "Szűkebb, de adatbázisoknál népszerű"] },
        ],
      },
      aboutSection: {
        title: "A CSV → TSV konvertálásról",
        paragraphs: [
          "A CSV → TSV konvertálás a vesszővel elválasztott adatokat tabulátor-elválasztásúvá alakítja. A TSV formátum előnye, hogy a tabulátor karakter ritkán fordul elő az adatokban, így kevesebb az idézőjelezési probléma.",
          "A TSV különösen hasznos, ha adatokat szeretnél közvetlenül beilleszteni táblázatkezelőkbe (Excel, Google Sheets), mert a tabulátorral tagolt szöveget az alkalmazások automatikusan oszlopokba rendezik.",
        ],
      },
      tips: [
        { icon: "💡", tip: "A TSV formátum ideális, ha rendszeresen másolgatsz adatokat táblázatkezelők és szövegszerkesztők között." },
        { icon: "📋", tip: "Tabulátorral tagolt adatokat közvetlenül beillesztheted Excelbe – az oszlopok automatikusan szétválnak." },
        { icon: "⚠️", tip: "Ellenőrizd, hogy a forrás CSV valóban vesszővel vagy pontosvesszővel van-e elválasztva, és nem tabulátorral." },
      ],
    },
  },

  // ═══ 5. CSV ADATTISZTÍTÁS ══════════════════════════════════════════════
  "csv-tisztitas": {
    introText:
      "A CSV adattisztító eszköz eltávolítja az üres sorokat, duplikált rekordokat és felesleges szóközöket a CSV fájlokból. Egyetlen kattintással rendbe hozhatod az adataidat, a teljes feldolgozás a böngésződben történik.",
    guide: [
      "1. Töltsd fel a CSV fájlt vagy illeszd be az adatokat a beviteli mezőbe.",
      "2. Jelöld be a kívánt tisztítási műveleteket: üres sorok, duplikátumok, whitespace.",
      "3. Kattints a «Tisztítás» gombra – az eredmény az előnézeti panelen jelenik meg.",
      "4. Ellenőrizd a statisztikákat (eltávolított sorok száma) és töltsd le a tisztított fájlt.",
    ],
    faq: [
      { q: "Mire jó a CSV adattisztító?", a: "CSV fájlok megtisztítására szolgál: üres sorok törlésére, duplikált rekordok eltávolítására és felesleges szóközök normalizálására." },
      { q: "Biztonságos az adataim szempontjából?", a: "Igen. A teljes feldolgozás a böngésződben történik, az adatok nem kerülnek szerverre – semmilyen harmadik fél nem fér hozzá." },
      { q: "Milyen tisztítási műveleteket végezhetek?", a: "Üres sorok törlése, teljesen üres sorok eltávolítása, duplikált sorok szűrése, valamint cellák elején és végén lévő felesleges szóközök eltávolítása." },
      { q: "Hogyan ismeri fel a duplikátumokat?", a: "Két sor duplikátumnak számít, ha minden cellájuk tartalmilag megegyezik. A whitespace-különbségek figyelmen kívül maradnak." },
      { q: "Mobilon is használhatom?", a: "Igen, az eszköz reszponzív, mobilon és tableten is használható bármely modern böngészőből." },
      { q: "Visszavonható a tisztítás?", a: "Az eredeti fájlt nem módosítjuk – mindig új, tisztított verziót kapsz. Az eredeti fájl változatlanul megmarad a gépeden." },
    ],
    content: {
      howToSteps: [
        { title: "1. CSV feltöltése", description: "Húzd be a CSV fájlt, vagy illeszd be a szöveges tartalmat a beviteli mezőbe." },
        { title: "2. Tisztítási opciók kiválasztása", description: "Jelöld be, hogy milyen tisztítási műveleteket szeretnél: üres sorok, duplikátumok, whitespace." },
        { title: "3. Tisztítás futtatása", description: "Kattints a «Tisztítás» gombra – a statisztikák és az előnézet azonnal megjelennek." },
        { title: "4. Eredmény letöltése", description: "Ellenőrizd a tisztított adatokat, majd töltsd le a fájlt vagy másold ki a vágólapra." },
      ],
      useCases: [
        { icon: "🧹", title: "Exportált adatok tisztítása", description: "Adatbázisból vagy webalkalmazásból exportált CSV fájlok megtisztítása az üres soroktól és duplikátumoktól." },
        { icon: "📊", title: "Elemzés előkészítése", description: "Adatelemzés előtt a CSV tisztítása biztosítja, hogy a statisztikák és diagramok pontos eredményeket adjanak." },
        { icon: "🔄", title: "Importálás előtti normalizálás", description: "CSV adatok megtisztítása, mielőtt adatbázisba vagy webalkalmazásba importálnád." },
        { icon: "📧", title: "Levelezési listák tisztítása", description: "E-mail listák megtisztítása a duplikált és üres bejegyzésektől tömeges kiküldés előtt." },
      ],
      aboutSection: {
        title: "Az adattisztítás fontosságáról",
        paragraphs: [
          "Az adattisztítás (data cleaning) a nyers adatok javítását és normalizálását jelenti. CSV fájlok esetében a leggyakoribb problémák az üres sorok, duplikált rekordok és felesleges whitespace karakterek, amelyek hibákat okozhatnak az adatfeldolgozás során.",
          "A tiszta adatok elengedhetetlenek a pontos elemzésekhez, riportokhoz és adatbázis-importokhoz. Egyetlen duplikált vagy hibás sor is torzíthatja a statisztikákat és az üzleti döntéseket.",
          "Az eszközünk vizuálisan mutatja, hogy hány sort távolított el és milyen változtatásokat hajtott végre, így teljes átláthatóságot biztosít a folyamat felett.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Mindig a tisztítás legyen az első lépés, mielőtt az adatokat tovább feldolgoznád vagy konvertálnád." },
        { icon: "📊", tip: "Ellenőrizd a statisztikákat – ha sok duplikátumot talált, az adatforrásban lehet a probléma." },
        { icon: "🔍", tip: "Használd az előnézetet a tisztítás előtt és után, hogy megbizonyosodj róla, a megfelelő sorok kerültek eltávolításra." },
        { icon: "⚠️", tip: "Ha a duplikátum-szűrés túl sokat töröl, ellenőrizd, hogy az adatokban nincsenek-e szándékosan ismétlődő sorok." },
      ],
    },
  },

  // ═══ 6. CSV FEJLÉCEK ÁTNEVEZÉSE ════════════════════════════════════════
  "fejlec-atnevezes": {
    introText:
      "A CSV fejléc-átnevező eszközzel vizuálisan szerkesztheted a CSV oszlopfejléceket anélkül, hogy a fájlt manuálisan kellene módosítanod. Töltsd fel a CSV-t, nevezd át a fejléceket, és töltsd le az eredményt – minden a böngészőben történik.",
    guide: [
      "1. Töltsd fel a CSV fájlt – az oszlopfejlécek automatikusan megjelennek.",
      "2. Kattints a módosítandó fejlécre és írd be az új nevet.",
      "3. Kattints a «Mentés» gombra – az előnézet frissül az új fejlécekkel.",
      "4. Töltsd le a módosított CSV fájlt.",
    ],
    faq: [
      { q: "Mire jó a fejléc-átnevező eszköz?", a: "CSV fájlok oszlopfejléceinek gyors, vizuális átnevezésére szolgál, anélkül, hogy szövegszerkesztőben kellene keresgélni." },
      { q: "Biztonságos az adataim szempontjából?", a: "Igen. A feldolgozás kizárólag a böngészőben történik, semmilyen adat nem hagyja el a számítógépedet." },
      { q: "Módosítja az adatsorokat?", a: "Nem, kizárólag a fejléc sor (első sor) változik. Az összes adat sor érintetlenül marad." },
      { q: "Visszavonhatom az átnevezést?", a: "Igen, az eredeti fájl nem módosul – mindig új fájlt kapsz letöltésre. Emellett a felületen is visszavonhatod a módosításokat." },
      { q: "Mobilon is használhatom?", a: "Igen, az eszköz reszponzív felülettel rendelkezik és mobilon is kényelmesen használható." },
      { q: "Átnévhetem egyszerre az összes fejlécet?", a: "Igen, minden fejléc szerkeszthető a felületen. Az előnézet valós időben frissül, így látod az eredményt mentés előtt." },
    ],
    content: {
      howToSteps: [
        { title: "1. CSV feltöltése", description: "Húzd be a CSV fájlt vagy illeszd be a szöveges tartalmat – a fejlécek automatikusan megjelennek." },
        { title: "2. Fejlécek szerkesztése", description: "Kattints a módosítandó fejlécre, és írd be az új nevet a szövegmezőbe." },
        { title: "3. Előnézet ellenőrzése", description: "Az előnézet valós időben mutatja az átnevezett fejléceket az adatokkal együtt." },
        { title: "4. Letöltés", description: "Töltsd le a módosított CSV-t vagy másold ki a vágólapra." },
      ],
      useCases: [
        { icon: "🏷️", title: "Fejléc szabványosítás", description: "Különböző forrásokból származó CSV fájlok fejléceinek egységesítése importálás előtt." },
        { icon: "🌐", title: "Nyelvi lokalizáció", description: "Angol nyelvű fejlécek magyarítása, vagy magyar fejlécek angolra cseréje nemzetközi projektekhez." },
        { icon: "🔧", title: "API kompatibilitás", description: "Fejlécek átnevezése, hogy megfeleljenek az API vagy adatbázis mezőneveinek." },
        { icon: "📊", title: "Riport előkészítés", description: "Érthetőbb fejlécek beállítása prezentációkhoz és riportokhoz." },
      ],
      aboutSection: {
        title: "A CSV fejlécek átnevezéséről",
        paragraphs: [
          "A CSV fájlok első sora általában a fejléc (header) sor, amely az oszlopok neveit tartalmazza. A fejlécek elnevezése kulcsfontosságú az adatok értelmezéséhez, importálásához és feldolgozásához.",
          "A fejlécek átnevezése gyakran szükséges adatintegráció, rendszermigráció vagy riportkészítés során. A vizuális szerkesztő felület gyorsabbá és biztonságosabbá teszi ezt a folyamatot, mint a szövegszerkesztőben végzett manuális módosítás.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Használj ékezet nélküli, kisbetűs fejléceket, ha az adatokat programból dolgozod fel." },
        { icon: "🔑", tip: "Kerüld a szóközöket és speciális karaktereket a fejlécekben – használj aláhúzást (_) vagy kötőjelet (-) helyettük." },
        { icon: "📋", tip: "Az előnézetet mindig ellenőrizd mentés előtt, hogy megbizonyosodj az átnevezés helyességéről." },
      ],
    },
  },

  // ═══ 7. CSV OSZLOPOK KIVÁLASZTÁSA ══════════════════════════════════════
  "oszlopok-kivalasztasa": {
    introText:
      "A CSV oszlopkiválasztó eszközzel checkbox-szal jelölheted ki a megtartandó vagy törlendő oszlopokat. Egyszerű vizuális felületen szűrheted a CSV fájlt, és a feldolgozás teljes egészében a böngészőben történik.",
    guide: [
      "1. Töltsd fel a CSV fájlt – az oszlopok listája automatikusan megjelenik.",
      "2. Jelöld be a megtartandó oszlopokat checkbox-szal, vagy töröld a feleslegeseket.",
      "3. Kattints az «Alkalmaz» gombra – az előnézet csak a kiválasztott oszlopokkal frissül.",
      "4. Töltsd le a szűkített CSV fájlt.",
    ],
    faq: [
      { q: "Mire jó az oszlopkiválasztó eszköz?", a: "CSV fájlokból a szükséges oszlopok megtartására és a feleslegesek eltávolítására szolgál, vizuális checkbox felületen." },
      { q: "Biztonságos az adataim szempontjából?", a: "Igen. A feldolgozás a böngésződben történik, az adatok nem kerülnek szerverre – teljes adatvédelem biztosított." },
      { q: "Megváltoztathatom az oszlopok sorrendjét?", a: "Az oszlopok a kiválasztás sorrendjében jelennek meg az eredményben. Drag-and-drop átrendezéssel módosíthatod a sorrendet." },
      { q: "Mi történik a nem kiválasztott oszlopok adataival?", a: "A nem kiválasztott oszlopok és adataik nem jelennek meg az eredményfájlban. Az eredeti fájl változatlan marad." },
      { q: "Mobilon is használhatom?", a: "Igen, az eszköz reszponzív, és mobilon is kényelmesen használhatók a checkbox-ok." },
      { q: "Van gyors kijelölési opció?", a: "Igen, az «Összes kijelölése» és «Kijelölés törlése» gombokkal gyorsan kezelhetők az oszlopok." },
    ],
    content: {
      howToSteps: [
        { title: "1. CSV feltöltése", description: "Húzd be a CSV fájlt vagy illeszd be a szöveget – az oszlopok automatikusan listázódnak." },
        { title: "2. Oszlopok kiválasztása", description: "Jelöld be checkbox-szal a megtartandó oszlopokat, vagy töröld a feleslegeseket." },
        { title: "3. Előnézet", description: "Az előnézet csak a kiválasztott oszlopokkal frissül, valós időben." },
        { title: "4. Eredmény mentése", description: "Töltsd le az új CSV-t vagy másold ki a vágólapra." },
      ],
      useCases: [
        { icon: "🔒", title: "Adatvédelem", description: "Érzékeny oszlopok (pl. személyes adatok) eltávolítása a CSV-ből megosztás vagy publikálás előtt." },
        { icon: "📉", title: "Fájlméret csökkentés", description: "Felesleges oszlopok eltávolítása a fájlméret és a feldolgozási idő csökkentése érdekében." },
        { icon: "🎯", title: "Célzott adatexport", description: "Csak a releváns oszlopok megtartása specifikus elemzésekhez vagy riportokhoz." },
        { icon: "🔄", title: "Import előkészítés", description: "Más rendszerbe importálandó CSV fájl oszlopainak szűrése a célrendszer elvárásainak megfelelően." },
      ],
      aboutSection: {
        title: "Az oszlopkiválasztásról",
        paragraphs: [
          "A CSV fájlok gyakran tartalmaznak több oszlopot, mint amennyire szükség van egy adott feladathoz. Az oszlopkiválasztás (column selection / column filtering) lehetővé teszi, hogy csak a releváns adatokat tartsd meg.",
          "A felesleges oszlopok eltávolítása nemcsak a fájlméretet csökkenti, hanem az adatvédelmet is javítja – különösen fontos ez személyes adatokat tartalmazó CSV fájlok megosztásánál.",
          "A vizuális checkbox felület egyszerűbbé és biztonságosabbá teszi az oszlopszűrést, mint a parancssori vagy programozói megoldások.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Használd a «Kijelölés törlése» gombot, ha csak néhány oszlopot akarsz megtartani a sokból." },
        { icon: "🔒", tip: "Mindig távolítsd el az érzékeny adatokat tartalmazó oszlopokat, mielőtt másokkal megosztanád a CSV-t." },
        { icon: "📋", tip: "Az előnézet segít ellenőrizni, hogy a megfelelő oszlopokat választottad-e ki." },
        { icon: "🔄", tip: "Ha az oszlopsorrendet is módosítani szeretnéd, a drag-and-drop átrendezés segít." },
      ],
    },
  },

  // ═══ 8. CSV SOROK SZŰRÉSE ══════════════════════════════════════════════
  "sorok-szurese": {
    introText:
      "A CSV sorszűrő eszközzel feltételek alapján szűrheted a CSV sorait: tartalmaz, egyenlő, nagyobb, kisebb, nem üres és egyéb operátorok. Az egész feldolgozás a böngésződben történik, szerverfeltöltés nélkül.",
    guide: [
      "1. Töltsd fel a CSV fájlt – az oszlopok automatikusan megjelennek.",
      "2. Válaszd ki a szűrendő oszlopot és az operátort (pl. tartalmaz, egyenlő, nagyobb).",
      "3. Add meg a szűrőértéket és kattints a «Szűrés» gombra.",
      "4. Ellenőrizd a szűrt adatokat az előnézetben, majd töltsd le az eredményt.",
    ],
    faq: [
      { q: "Mire jó a sorszűrő eszköz?", a: "CSV fájlok sorainak szűrésére szolgál különböző feltételek alapján: szöveges tartalom, numerikus összehasonlítás, üresség vizsgálat." },
      { q: "Biztonságos az adataim szempontjából?", a: "Igen. A szűrés teljes egészében a böngésződben történik, semmilyen adat nem kerül szerverre." },
      { q: "Milyen szűrő operátorokat használhatok?", a: "Tartalmaz, nem tartalmaz, egyenlő, nem egyenlő, nagyobb mint, kisebb mint, üres, nem üres – szöveges és numerikus mezőkhöz egyaránt." },
      { q: "Alkalmazhatok egyszerre több feltételt?", a: "Igen, több szűrőfeltételt is megadhatsz, amelyek ÉS (AND) logikával kombinálódnak." },
      { q: "Mobilon is használhatom?", a: "Igen, az eszköz reszponzív és mobilon is kényelmesen használható." },
      { q: "Mekkora fájlokat kezel?", a: "Nincs szerver oldali korlát. A feldolgozás Web Worker-ben fut, így több ezer soros fájlok is gyorsan szűrhetők." },
    ],
    content: {
      howToSteps: [
        { title: "1. CSV feltöltése", description: "Húzd be a CSV fájlt, vagy illeszd be a szöveget – az oszlopok és az adatok betöltődnek." },
        { title: "2. Szűrőfeltétel megadása", description: "Válaszd ki az oszlopot, az operátort és add meg a szűrőértéket." },
        { title: "3. Szűrés végrehajtása", description: "Kattints a «Szűrés» gombra – csak a feltételnek megfelelő sorok maradnak." },
        { title: "4. Eredmény letöltése", description: "Ellenőrizd a szűrt adatokat, majd töltsd le a fájlt vagy másold ki az eredményt." },
      ],
      useCases: [
        { icon: "🔍", title: "Adatkeresés", description: "Adott értéket tartalmazó sorok gyors megtalálása nagy CSV fájlokban manuális keresés nélkül." },
        { icon: "📊", title: "Részhalmaz készítés", description: "Nagy adatkészletből specifikus részhalmaz kinyerése elemzésekhez vagy riportokhoz." },
        { icon: "🧹", title: "Adattisztítás", description: "Üres vagy hibás értékeket tartalmazó sorok kiszűrése a további feldolgozás előtt." },
        { icon: "📈", title: "Küszöbérték szűrés", description: "Numerikus adatok szűrése meghatározott küszöbérték alapján (pl. értékesítés > 10000)." },
      ],
      aboutSection: {
        title: "A CSV sorok szűréséről",
        paragraphs: [
          "A sorszűrés (row filtering) az adatfeldolgozás egyik legalapvetőbb művelete, amelynek célja a releváns sorok kiválogatása és a feleslegesek eltávolítása egy adatkészletből.",
          "A szűrő operátorok lehetővé teszik szöveges (tartalmaz, egyenlő) és numerikus (nagyobb, kisebb) feltételek megadását, valamint az üres cellák keresését. Ezek kombinálásával összetett szűrőfeltételeket is létrehozhatsz.",
          "Az eszköz a szűrés eredményét valós időben mutatja az előnézeti panelen, így azonnal láthatod, hogy a feltétel milyen sorokat tart meg.",
        ],
      },
      tips: [
        { icon: "💡", tip: "A «tartalmaz» operátor részleges egyezést keres – használd az «egyenlő» operátort pontos egyezéshez." },
        { icon: "🔢", tip: "Numerikus szűrésnél győződj meg róla, hogy az oszlop valóban számokat tartalmaz, különben szöveges összehasonlítás történik." },
        { icon: "📋", tip: "Több szűrő kombinálásakor az ÉS (AND) logika érvényesül – minden feltételnek teljesülnie kell." },
        { icon: "⚠️", tip: "A szűrés nem módosítja az eredeti fájlt – mindig új, szűrt verziót kapsz eredményként." },
      ],
    },
  },

  // ═══ 9. CSV OSZLOP SZÉTVÁLASZTÁSA ══════════════════════════════════════
  "oszlop-szetvalasztas": {
    introText:
      "A CSV oszlop szétválasztó eszköz egyetlen oszlopot oszt fel több oszlopra egy megadott delimiter alapján. Automatikus oszlopszám detektálással dolgozik, és az egész feldolgozás a böngésződben történik.",
    guide: [
      "1. Töltsd fel a CSV fájlt és válaszd ki a szétválasztandó oszlopot.",
      "2. Add meg az elválasztó karaktert (pl. vessző, kötőjel, szóköz).",
      "3. Kattints a «Szétválasztás» gombra – az új oszlopok megjelennek az előnézetben.",
      "4. Töltsd le a módosított CSV fájlt az új oszlopokkal.",
    ],
    faq: [
      { q: "Mire jó az oszlop szétválasztó?", a: "Egyetlen CSV oszlop több oszlopra bontására szolgál delimiter alapján – pl. «Vezetéknév Keresztnév» szétválasztása két külön oszlopra." },
      { q: "Biztonságos az adataim szempontjából?", a: "Igen. A feldolgozás teljes egészében a böngésződben történik, az adatok soha nem hagyják el a számítógépedet." },
      { q: "Milyen delimitereket használhatok?", a: "Bármilyen karaktert megadhatsz: szóköz, vessző, kötőjel, pont, perjel, kettőspont – vagy akár több karakteres elválasztót is." },
      { q: "Mi történik, ha az értékekben eltérő számú szegmens van?", a: "Az eszköz a legtöbb szegmenst tartalmazó értékhez igazodik. Ha egy érték kevesebb szegmenst tartalmaz, a hiányzó oszlopok üresen maradnak." },
      { q: "Mobilon is használhatom?", a: "Igen, az eszköz reszponzív és mobilon is teljes mértékben használható." },
      { q: "Megmarad az eredeti oszlop is?", a: "Beállítható, hogy az eredeti oszlop megmaradjon a szétválasztott oszlopok mellett, vagy eltávolításra kerüljön." },
    ],
    content: {
      howToSteps: [
        { title: "1. CSV feltöltése", description: "Húzd be a CSV fájlt, vagy illeszd be a szöveges tartalmat – az oszlopok megjelennek." },
        { title: "2. Oszlop és delimiter kiválasztása", description: "Válaszd ki a szétválasztandó oszlopot és add meg az elválasztó karaktert." },
        { title: "3. Szétválasztás", description: "Kattints a «Szétválasztás» gombra – az új oszlopok azonnal megjelennek az előnézetben." },
        { title: "4. Eredmény letöltése", description: "Ellenőrizd az eredményt és töltsd le a módosított CSV fájlt." },
      ],
      useCases: [
        { icon: "👤", title: "Név szétválasztás", description: "Teljes név szétválasztása vezetéknév és keresztnév oszlopokra adatbázis importhoz." },
        { icon: "📍", title: "Cím bontás", description: "Összevont cím mező szétválasztása irányítószám, város és utca oszlopokra." },
        { icon: "📅", title: "Dátum szétbontás", description: "Dátum mező (2024-01-15) szétválasztása év, hónap és nap oszlopokra elemzésekhez." },
        { icon: "🏷️", title: "Címkék szeparálása", description: "Vesszővel elválasztott címkék (tag-ek) szétválasztása külön oszlopokba." },
      ],
      aboutSection: {
        title: "Az oszlop szétválasztásról",
        paragraphs: [
          "Az oszlop szétválasztás (column split) gyakori adatfeldolgozási művelet, amelynek célja egyetlen oszlop tartalmának több oszlopra bontása egy elválasztó karakter mentén. Ez különösen hasznos, ha az adatok nem megfelelően normalizáltak.",
          "A leggyakoribb felhasználási eset a név, cím vagy dátum szétbontása, de bármilyen olyan oszlop szétválasztható, amelyben rendszeres elválasztó karakter található.",
          "Az eszköz automatikusan detektálja az oszlopok számát a legtöbb szegmenst tartalmazó érték alapján, így nem kell előre megadni, hány oszlopra bontsuk az adatot.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Először ellenőrizd az előnézetet – az automatikus oszlopszám detektálás mutatja, hány részre bomlik az adat." },
        { icon: "📋", tip: "Ha a delimiter megjelenik az adatokban is (pl. vesszős nevek), fontold meg egy egyedibb elválasztó használatát." },
        { icon: "⚠️", tip: "Eltérő szegmensszám esetén a rövidebb értékek üres cellákat kapnak a végén." },
        { icon: "🔄", tip: "A szétválasztás után érdemes az oszlopok-kivalasztasa eszközzel eltávolítani a feleslegessé vált eredeti oszlopot." },
      ],
    },
  },

  // ═══ 10. CSV ÉRTÉKEK NORMALIZÁLÁSA ═════════════════════════════════════
  "ertekek-normalizalasa": {
    introText:
      "A CSV értéknormalizáló eszköz számoszlopokat normalizál 0–1 skálára (Min-Max) vagy z-score módszerrel. Automatikusan felismeri a numerikus oszlopokat, és a teljes feldolgozás a böngésződben történik.",
    guide: [
      "1. Töltsd fel a CSV fájlt – az eszköz automatikusan felismeri a numerikus oszlopokat.",
      "2. Válaszd ki a normalizálandó oszlopokat és a normalizálási módszert (Min-Max vagy Z-score).",
      "3. Kattints a «Normalizálás» gombra – az eredmény az előnézetben jelenik meg.",
      "4. Töltsd le a normalizált adatokat tartalmazó CSV fájlt.",
    ],
    faq: [
      { q: "Mire jó az értéknormalizáló eszköz?", a: "Számoszlopok normalizálására szolgál egységes skálára (0–1 Min-Max vagy Z-score), ami elengedhetetlen gépi tanuláshoz és összehasonlító elemzésekhez." },
      { q: "Biztonságos az adataim szempontjából?", a: "Igen. A normalizálás teljes egészében a böngésződben történik, semmilyen adat nem kerül szerverre." },
      { q: "Mi a különbség a Min-Max és Z-score normalizálás között?", a: "A Min-Max 0 és 1 közé skálázza az értékeket (a legkisebb 0, a legnagyobb 1 lesz). A Z-score az átlagtól való eltérést méri szórásegységben (átlag = 0, szórás = 1)." },
      { q: "Mikor melyiket használjam?", a: "Min-Max: ha ismert tartományra van szükség (pl. neurális hálók). Z-score: ha a kiugró értékek fontosak és normáleloszlást feltételezünk." },
      { q: "Mobilon is használhatom?", a: "Igen, az eszköz reszponzív és mobilon is használható bármely modern böngészőben." },
      { q: "Megmaradnak a nem numerikus oszlopok?", a: "Igen, a szöveges és egyéb nem numerikus oszlopok változatlanul megmaradnak, csak a kiválasztott számoszlopok normalizálódnak." },
    ],
    content: {
      howToSteps: [
        { title: "1. CSV feltöltése", description: "Húzd be a CSV fájlt – a numerikus oszlopok automatikusan felismerésre kerülnek." },
        { title: "2. Módszer és oszlopok kiválasztása", description: "Válaszd ki a normalizálási módszert (Min-Max vagy Z-score) és a normalizálandó oszlopokat." },
        { title: "3. Normalizálás", description: "Kattints a «Normalizálás» gombra – az eredmény azonnal megjelenik az előnézeti panelen." },
        { title: "4. Eredmény letöltése", description: "Ellenőrizd a normalizált értékeket, majd töltsd le a fájlt." },
      ],
      useCases: [
        { icon: "🤖", title: "Gépi tanulás előkészítés", description: "Feature-ök normalizálása ML modellek betanításához, hogy az eltérő skálájú változók egyformán súlyozódjanak." },
        { icon: "📊", title: "Összehasonlító elemzés", description: "Különböző mértékegységű adatok egységes skálára hozása az összehasonlíthatóság érdekében." },
        { icon: "📈", title: "Vizualizáció", description: "Eltérő nagyságrendű adatok normalizálása, hogy egy diagramon ábrázolhatók legyenek." },
        { icon: "🔬", title: "Tudományos kutatás", description: "Mérési adatok normalizálása különböző kísérletek eredményeinek összehasonlításához." },
      ],
      aboutSection: {
        title: "Az adatnormalizálásról",
        paragraphs: [
          "Az adatnormalizálás a számértékek egységes skálára transzformálását jelenti. Ez elengedhetetlen lépés a gépi tanulásban, statisztikai elemzésekben és adatvizualizációban, ahol az eltérő skálájú változók torzíthatják az eredményeket.",
          "A Min-Max normalizálás a legkisebb értéket 0-ra, a legnagyobbat 1-re képezi le, a köztes értékeket lineárisan skálázza. Előnye az ismert kimeneti tartomány, hátránya a kiugró értékekre való érzékenység.",
          "A Z-score (standard score) normalizálás az átlagtól való eltérést méri szórásegységben. Előnye, hogy kezeli a kiugró értékeket, és a normáleloszláshoz igazodik.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Min-Max normalizálást használj, ha az értékeknek 0 és 1 közötti tartományba kell esniük (pl. neurális hálózatok bemenete)." },
        { icon: "📊", tip: "Z-score-t válaszd, ha az adatokban kiugró értékek (outlierek) vannak, és normáleloszlást feltételezel." },
        { icon: "⚠️", tip: "Csak a valóban numerikus oszlopokat normalizáld – kategória kódok (pl. 1, 2, 3) nem feltétlenül igényelnek normalizálást." },
        { icon: "🔢", tip: "Az eszköz automatikusan felismeri a numerikus oszlopokat, de érdemes ellenőrizni, hogy ne kerüljenek bele ID vagy irányítószám oszlopok." },
      ],
    },
  },

  // ═══ 11. TÖMEGES KONVERTÁLÁS ZIP ═══════════════════════════════════════
  "tomeges-konvertalas-zip": {
    introText:
      "A tömeges CSV→JSON konvertáló egyszerre több CSV fájlt alakít JSON formátumba, és az eredményeket egyetlen ZIP fájlban töltheted le. Batch feldolgozás böngészőben, szerverfeltöltés nélkül.",
    guide: [
      "1. Húzd be az összes konvertálandó CSV fájlt a feltöltési területre.",
      "2. Ellenőrizd a beállításokat (delimiter, fejléc-kezelés) – minden fájlra egységesen érvényesek.",
      "3. Kattints a «Konvertálás» gombra – a feldolgozás automatikusan elindul.",
      "4. Töltsd le az összes eredményt tartalmazó ZIP fájlt.",
    ],
    faq: [
      { q: "Mire jó a tömeges konvertáló?", a: "Több CSV fájl egyidejű JSON-ba konvertálására szolgál, az eredmények egyetlen ZIP fájlban tölthetők le – időmegtakarítás nagy fájlmennyiségnél." },
      { q: "Biztonságos az adataim szempontjából?", a: "Igen. Az összes fájl feldolgozása a böngésződben történik, semmilyen adat nem kerül szerverre. A ZIP is a böngészőben készül." },
      { q: "Hány fájlt tölthetek fel egyszerre?", a: "Nincs szigorú korlát, de a feldolgozás sebessége a böngésző memóriájától és a fájlok méretétől függ. Általában több tucat fájl kényelmesen kezelhető." },
      { q: "Minden fájlra ugyanazok a beállítások érvényesek?", a: "Igen, a delimiter és fejléc-kezelési beállítások egységesen érvényesek az összes feltöltött fájlra." },
      { q: "Mobilon is használhatom?", a: "Igen, az eszköz mobilon is működik, bár nagy fájlmennyiségnél asztali böngészőt ajánlunk a teljesítmény miatt." },
      { q: "Milyen nevekkel kerülnek a ZIP-be a fájlok?", a: "Minden JSON fájl az eredeti CSV fájl nevét kapja .json kiterjesztéssel (pl. adatok.csv → adatok.json)." },
    ],
    content: {
      howToSteps: [
        { title: "1. Fájlok feltöltése", description: "Húzd be az összes konvertálandó CSV fájlt a feltöltési területre egyszerre." },
        { title: "2. Beállítások", description: "Ellenőrizd a delimiter és fejléc-kezelési beállításokat – ezek minden fájlra érvényesek." },
        { title: "3. Batch konvertálás", description: "Kattints a «Konvertálás» gombra – a feldolgozás fájlonként halad, a státusz követhető." },
        { title: "4. ZIP letöltése", description: "Az összes JSON fájl egyetlen ZIP archívumban tölthető le." },
      ],
      useCases: [
        { icon: "📁", title: "Adatmigráció", description: "Nagyszámú CSV adatfájl egyszeri konvertálása JSON-ba rendszermigráció vagy adatbázis-feltöltés során." },
        { icon: "⚡", title: "Automatizált feldolgozás", description: "Rendszeres CSV exportok batch konvertálása JSON formátumba webalkalmazások számára." },
        { icon: "🗂️", title: "Archiválás", description: "CSV fájlok JSON-ba konvertálása és ZIP-be csomagolása hosszú távú, strukturált archiváláshoz." },
        { icon: "🔄", title: "Rendszerintegráció", description: "Több forrásból származó CSV fájlok egységes JSON formátumba alakítása API-feltöltéshez." },
      ],
      aboutSection: {
        title: "A tömeges konvertálásról",
        paragraphs: [
          "A tömeges (batch) adatkonvertálás lehetővé teszi, hogy több fájlt egyszerre dolgozz fel, ahelyett, hogy egyenként kellene konvertálni. Ez jelentős időmegtakarítást jelent, ha rendszeresen nagy mennyiségű CSV fájlt kell JSON-ba alakítani.",
          "Az eszköz a böngészőben generálja a ZIP fájlt, így nem szükséges külön tömörítő program. A ZIP tartalmazza az összes konvertált JSON fájlt az eredeti fájlnevekkel.",
          "A feldolgozás fájlonként történik, és a haladás valós időben követhető a felületen. Ha egy fájl hibás, az nem állítja meg a többi fájl feldolgozását.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Győződj meg róla, hogy az összes CSV fájl ugyanazt a delimiter-t használja, mert a beállítás egységes." },
        { icon: "📁", tip: "A ZIP fájl a böngészőben készül – nincs szükség külön tömörítő programra." },
        { icon: "⚠️", tip: "Nagyon sok vagy nagyon nagy fájl esetén figyelj a böngésző memóriahasználatára." },
        { icon: "🔢", tip: "A fájlok az eredeti nevükkel kerülnek a ZIP-be, csak a kiterjesztés változik .csv-ről .json-ra." },
      ],
    },
  },
};
