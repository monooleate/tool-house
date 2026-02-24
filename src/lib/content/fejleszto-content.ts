import type { ContentMap } from "./types.ts";

export const FEJLESZTO_CONTENT: ContentMap = {
  // ═══ 1. JSON FORMÁZÁS ═════════════════════════════════════════════════════
  "json-formazas": {
    introText:
      "A JSON formázó eszköz lehetővé teszi, hogy egyetlen kattintással szép, olvasható formába hozd a tömörített JSON adataidat. Behúzásokat, sortöréseket ad hozzá, szintaxiskiemeléssel segíti az áttekintést. Fejlesztők, tesztelők és API-kkal dolgozó szakemberek számára nélkülözhetetlen segédeszköz.",
    guide: [
      "1. Illeszd be a formázandó JSON szöveget a bal oldali szerkesztőbe, vagy húzd be a .json fájlt.",
      "2. Válaszd ki a kívánt behúzás méretet (2 vagy 4 szóköz, tabulátor).",
      "3. Kattints a «Formázás» gombra – az eredmény azonnal megjelenik a jobb oldalon.",
      "4. Másold ki az eredményt a vágólapra, vagy töltsd le .json fájlként.",
    ],
    faq: [
      { q: "Mire jó ez az eszköz?", a: "JSON adatok olvashatóvá formázására (prettify) szolgál: behúzásokat és sortöréseket ad hozzá a tömörített JSON-hoz, így könnyen áttekinthetővé teszi az adatstruktúrát." },
      { q: "Biztonságos az adataim szempontjából?", a: "Igen. Minden feldolgozás a böngésződben történik, semmilyen adat nem kerül szerverre." },
      { q: "Milyen behúzási opciókat választhatok?", a: "2 szóköz, 4 szóköz vagy tabulátor közül választhatsz. A legelterjedtebb a 2 szóközös behúzás." },
      { q: "Mi történik, ha érvénytelen JSON-t illesztek be?", a: "Az eszköz valós időben validálja a bemenetet, és piros kerettel, sor- és pozíció-számmal jelzi a szintaxis hibát." },
      { q: "Mobilon is használhatom?", a: "Igen, az eszköz teljesen reszponzív és bármilyen modern böngészőben működik." },
      { q: "Elveszítem az adatokat a formázásnál?", a: "Nem. A prettify kizárólag whitespace karaktereket (szóközök, sortörések, tabulátorok) ad hozzá – az adatstruktúra és az értékek érintetlenek maradnak." },
    ],
    content: {
      howToSteps: [
        { title: "1. JSON beillesztése", description: "Illeszd be a nyers vagy tömörített JSON szöveget a beviteli mezőbe, vagy húzz be egy .json fájlt." },
        { title: "2. Formázási beállítások", description: "Válaszd ki a behúzás mértékét: 2 szóköz, 4 szóköz vagy tabulátor." },
        { title: "3. Formázás indítása", description: "Kattints a «Formázás» gombra – az eredmény azonnal megjelenik szintaxiskiemeléssel." },
        { title: "4. Eredmény másolása", description: "Másold ki a formázott JSON-t a vágólapra vagy töltsd le fájlként." },
      ],
      useCases: [
        { icon: "🔍", title: "API válaszok elemzése", description: "Az API-tól kapott tömörített JSON választ olvasható formába hozhatod, hogy könnyebben megértsd az adatstruktúrát." },
        { icon: "🐛", title: "Hibakeresés (debug)", description: "Formázott JSON-ban sokkal könnyebb megtalálni a hibás értékeket, hiányzó mezőket vagy struktúra-problémákat." },
        { icon: "📝", title: "Dokumentáció készítés", description: "Olvashatóan formázott JSON példákat illeszthetsz dokumentációba, README-be vagy Slack üzenetbe." },
        { icon: "⚙️", title: "Konfigurációs fájlok", description: "JSON config fájlokat (package.json, tsconfig.json) könnyedén áttekinthetővé és szerkeszthetővé teheted." },
      ],
      formatComparison: {
        title: "JSON vs YAML vs XML összehasonlítás",
        columns: ["Tulajdonság", "JSON", "YAML", "XML"],
        rows: [
          { feature: "Olvashatóság", values: ["Jó", "Kiváló", "Közepes"] },
          { feature: "Fájlméret", values: ["Közepes", "Kicsi", "Nagy (tag-ek miatt)"] },
          { feature: "Kommentek", values: ["Nem támogatja", "Igen (#)", "Igen (<!-- -->)"] },
          { feature: "Séma validálás", values: ["JSON Schema", "Nincs beépítve", "XSD/DTD"] },
          { feature: "Használat", values: ["API, config", "Config, CI/CD", "SOAP, config"] },
        ],
      },
      aboutSection: {
        title: "A JSON formátumról",
        paragraphs: [
          "A JSON (JavaScript Object Notation) egy könnyű, szöveges adatcsere-formátum, amelyet Douglas Crockford népszerűsített a 2000-es évek elején. Bár a JavaScript szintaxisán alapul, nyelvfüggetlen – szinte minden modern programozási nyelv támogatja natívan.",
          "A JSON két alapvető struktúrára épül: kulcs-érték párok gyűjteményére (objektum) és értékek rendezett listájára (tömb). Az értékek lehetnek stringek, számok, boolean (igaz/hamis), null, objektumok vagy tömbök – ezek tetszőlegesen egymásba ágyazhatók.",
          "A formázás (prettify) a JSON olvashatóságát javítja behúzások és sortörések hozzáadásával, miközben az adattartalom változatlan marad. A minifikálás ennek az ellenkezője: eltávolítja a felesleges whitespace-t a kisebb fájlméret érdekében.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Használj 2 szóközös behúzást – ez a legelterjedtebb konvenció a JSON fájloknál." },
        { icon: "🔑", tip: "A JSON kulcsoknak mindig dupla idézőjelben kell lenniük – az egyszeres idézőjel szintaxis hiba." },
        { icon: "⚠️", tip: "A JSON nem támogat kommenteket. Ha megjegyzésekre van szükséged, fontold meg a YAML vagy JSON5 használatát." },
        { icon: "📋", tip: "A formázott JSON kiválóan alkalmas code review-khoz és dokumentációhoz." },
      ],
    },
  },

  // ═══ 2. JSON MINIFIKÁLÁS ══════════════════════════════════════════════════
  "json-minimalas": {
    introText:
      "A JSON minifikáló eltávolítja a felesleges szóközöket, sortöréseket és behúzásokat a JSON adatokból, így a lehető legkisebb fájlméretet éred el. Ideális production build-ekhez, API válaszok optimalizálásához és hálózati forgalom csökkentéséhez.",
    guide: [
      "1. Illeszd be a formázott JSON szöveget a beviteli mezőbe.",
      "2. Kattints a «Minifikálás» gombra.",
      "3. Az eredmény egyetlen sorban jelenik meg, a felesleges whitespace nélkül.",
      "4. Olvasd le a méretcsökkentés százalékát, majd másold ki vagy töltsd le az eredményt.",
    ],
    faq: [
      { q: "Mire jó ez az eszköz?", a: "JSON fájlok méretének csökkentésére szolgál a felesleges whitespace (szóközök, sortörések, tabulátorok) eltávolításával – ideális production build-ekhez." },
      { q: "Biztonságos az adataim szempontjából?", a: "Igen. Minden feldolgozás a böngésződben történik, semmilyen adat nem kerül szerverre." },
      { q: "Mennyivel lesz kisebb a JSON?", a: "A méretcsökkentés a formázás mértékétől függ – jellemzően 20–40%-os csökkenés érhető el a whitespace eltávolításával." },
      { q: "Visszaalakítható a minifikált JSON?", a: "Igen, a JSON formázó (prettify) eszközünkkel bármikor visszaalakíthatod olvasható formába." },
      { q: "Mobilon is használhatom?", a: "Igen, az eszköz teljesen reszponzív és bármilyen modern böngészőben működik." },
      { q: "Változtat a minifikálás az adatokon?", a: "Nem. Kizárólag a whitespace karakterek kerülnek eltávolításra – az adattartalom, a struktúra és az értékek pontosan megmaradnak." },
    ],
    content: {
      howToSteps: [
        { title: "1. JSON beillesztése", description: "Illeszd be a formázott vagy nyers JSON szöveget a beviteli mezőbe." },
        { title: "2. Minifikálás", description: "Kattints a «Minifikálás» gombra a whitespace eltávolításához." },
        { title: "3. Méretcsökkentés ellenőrzése", description: "Olvasd le az eredeti és a minifikált méret közötti különbséget százalékban." },
        { title: "4. Eredmény exportálása", description: "Másold ki a minifikált JSON-t vagy töltsd le .json fájlként." },
      ],
      useCases: [
        { icon: "🚀", title: "Production deploy", description: "API válaszok és konfigurációs fájlok méretének optimalizálása a gyorsabb betöltés érdekében." },
        { icon: "📡", title: "Hálózati forgalom csökkentése", description: "Kisebb JSON payload kevesebb sávszélességet igényel – fontos mobil alkalmazásoknál és lassú kapcsolatoknál." },
        { icon: "💾", title: "Tárhely megtakarítás", description: "Nagy mennyiségű JSON adat tárolásakor a minifikálás jelentős tárhelymegtakarítást eredményezhet." },
        { icon: "⚡", title: "Build pipeline", description: "A minifikálás beépíthető a build folyamatba a frontend és backend projekteknél." },
      ],
      formatComparison: {
        title: "JSON vs YAML vs XML összehasonlítás",
        columns: ["Tulajdonság", "JSON", "YAML", "XML"],
        rows: [
          { feature: "Olvashatóság", values: ["Jó", "Kiváló", "Közepes"] },
          { feature: "Fájlméret", values: ["Közepes", "Kicsi", "Nagy (tag-ek miatt)"] },
          { feature: "Kommentek", values: ["Nem támogatja", "Igen (#)", "Igen (<!-- -->)"] },
          { feature: "Séma validálás", values: ["JSON Schema", "Nincs beépítve", "XSD/DTD"] },
          { feature: "Használat", values: ["API, config", "Config, CI/CD", "SOAP, config"] },
        ],
      },
      aboutSection: {
        title: "Miért érdemes JSON-t minifikálni?",
        paragraphs: [
          "A JSON minifikálás a felesleges whitespace (szóközök, tabulátorok, sortörések) eltávolítását jelenti a JSON adatokból. Az eredmény funkcionálisan azonos, de jóval kisebb méretű fájl, amely gyorsabban továbbítható a hálózaton.",
          "Production környezetben a minifikált JSON akár 20–40%-kal kisebb lehet a formázott változatnál. Ez különösen nagy JSON válaszoknál (pl. API response, adatexport) számottevő sávszélesség-megtakarítást jelent.",
          "Fontos megjegyezni, hogy a minifikálás nem tömörítés: csak a whitespace karakterek kerülnek eltávolításra. A gzip vagy brotli tömörítéssel kombinálva még nagyobb méretcsökkentés érhető el.",
        ],
      },
      tips: [
        { icon: "📊", tip: "Mindig ellenőrizd a méretcsökkentés százalékát – ha minimális, a JSON eleve tömör volt." },
        { icon: "🔄", tip: "A minifikált JSON bármikor visszaformázható a prettify eszközzel – az adatok nem sérülnek." },
        { icon: "🗜️", tip: "Maximális tömörítéshez kombináld a JSON minifikálást gzip vagy brotli tömörítéssel a szerveren." },
      ],
    },
  },

  // ═══ 3. JSON ELLENŐRZÉS ═══════════════════════════════════════════════════
  "json-ellenorzes": {
    introText:
      "A JSON validátor valós időben ellenőrzi a JSON szintaxist, és pontos sor- és pozíciószámmal jelzi a hibákat. Ideális eszköz konfigurációs fájlok ellenőrzéséhez, API válaszok validálásához és kézi szerkesztés utáni gyors ellenőrzéshez.",
    guide: [
      "1. Illeszd be az ellenőrizendő JSON szöveget a beviteli mezőbe.",
      "2. A validálás automatikusan, valós időben történik gépelés közben.",
      "3. Ha a JSON érvényes, zöld jelzést kapsz. Ha hibás, piros kerettel és hibaüzenettel jelzi a problémát.",
      "4. Javítsd a hibát a megjelölt sorban, és a validátor azonnal frissíti az eredményt.",
    ],
    faq: [
      { q: "Mire jó ez az eszköz?", a: "JSON adatok szintaktikai helyességének ellenőrzésére szolgál – megmutatja, hogy a JSON érvényes-e, és ha nem, pontosan hol van a hiba." },
      { q: "Biztonságos az adataim szempontjából?", a: "Igen. Minden feldolgozás a böngésződben történik, semmilyen adat nem kerül szerverre." },
      { q: "Milyen hibákat ismer fel?", a: "Hiányzó vesszőt, idézőjelet, záró zárójelet, érvénytelen értékeket, trailing comma-t és minden egyéb JSON szintaxis hibát felismer." },
      { q: "Támogatja a JSON5 vagy JSONC formátumot?", a: "Nem, a validátor a szabványos RFC 8259 JSON szintaxist ellenőrzi. A kommentek és trailing comma-k hibának számítanak a szabvány szerint." },
      { q: "Mobilon is használhatom?", a: "Igen, az eszköz teljesen reszponzív és bármilyen modern böngészőben működik." },
      { q: "Megmutatja a hiba pontos helyét?", a: "Igen, a hibaüzenet tartalmazza a sor számát és a karakter pozícióját, ahol a szintaxis hiba található." },
    ],
    content: {
      howToSteps: [
        { title: "1. JSON beillesztése", description: "Illeszd be az ellenőrizendő JSON szöveget a beviteli mezőbe." },
        { title: "2. Automatikus validálás", description: "A validátor valós időben elemzi a JSON-t gépelés közben." },
        { title: "3. Hibajelzés értelmezése", description: "Ha hibás a JSON, a hibaüzenet megmutatja a sor- és pozíciószámot." },
        { title: "4. Javítás és újraellenőrzés", description: "Javítsd a hibát, és a validátor azonnal frissíti az eredményt." },
      ],
      useCases: [
        { icon: "✅", title: "Config fájlok ellenőrzése", description: "package.json, tsconfig.json és egyéb konfigurációs fájlok szintaxis-ellenőrzése deploy előtt." },
        { icon: "🔌", title: "API válaszok validálása", description: "API-tól kapott JSON válaszok struktúrájának és szintaxisának gyors ellenőrzése." },
        { icon: "📝", title: "Kézi szerkesztés utáni ellenőrzés", description: "JSON fájl kézi módosítása után a validátor azonnal jelzi, ha véletlenül hibát vittél be." },
        { icon: "🎓", title: "Tanulás és oktatás", description: "JSON szintaxis tanulásához és oktatáshoz azonnal látod, mi a hiba és hol van." },
      ],
      formatComparison: {
        title: "JSON vs YAML vs XML összehasonlítás",
        columns: ["Tulajdonság", "JSON", "YAML", "XML"],
        rows: [
          { feature: "Olvashatóság", values: ["Jó", "Kiváló", "Közepes"] },
          { feature: "Fájlméret", values: ["Közepes", "Kicsi", "Nagy (tag-ek miatt)"] },
          { feature: "Kommentek", values: ["Nem támogatja", "Igen (#)", "Igen (<!-- -->)"] },
          { feature: "Séma validálás", values: ["JSON Schema", "Nincs beépítve", "XSD/DTD"] },
          { feature: "Használat", values: ["API, config", "Config, CI/CD", "SOAP, config"] },
        ],
      },
      aboutSection: {
        title: "A JSON validálásról",
        paragraphs: [
          "A JSON validálás azt jelenti, hogy ellenőrizzük a JSON szöveg szintaktikai helyességét az RFC 8259 szabvány szerint. Egy érvényes JSON-ban minden stringnek dupla idézőjelben kell lennie, a kulcsok stringek, az értékek pedig string, szám, boolean, null, objektum vagy tömb lehetnek.",
          "A leggyakoribb JSON szintaxis hibák: hiányzó vagy felesleges vessző (trailing comma), egyszeres idézőjel dupla helyett, záró zárójel hiánya, undefined vagy NaN érték, és a kommentek használata (a JSON nem támogatja a kommenteket).",
          "A valós idejű validálás azonnal jelzi a hibát gépelés közben, ami jelentősen gyorsítja a hibakeresést. A pontos sor- és pozíciószám segít abban, hogy pillanatok alatt megtaláld és javítsd a problémát.",
        ],
      },
      tips: [
        { icon: "🔍", tip: "Ha a hibaüzenet a fájl végére mutat, valószínűleg egy korábbi sorból hiányzik vessző vagy záró zárójel." },
        { icon: "💡", tip: "A JSON nem engedélyezi a trailing comma-t (utolsó elem utáni vesszőt) – ez a leggyakoribb hiba kézi szerkesztésnél." },
        { icon: "📏", tip: "Használj JSON formázót a validálás után – a szép behúzás segít a struktúra áttekintésében." },
        { icon: "⚠️", tip: "A JavaScript objektumok nem feltétlenül érvényes JSON-ok: a JSON kulcsoknak mindig dupla idézőjelben kell lenniük." },
      ],
    },
  },

  // ═══ 4. YAML ELLENŐRZÉS ═══════════════════════════════════════════════════
  "yaml-ellenorzes": {
    introText:
      "A YAML validátor valós időben ellenőrzi a YAML szintaxist, és részletes hibajelzéssel segít azonosítani a problémákat. Különösen hasznos CI/CD pipeline-ok, Docker Compose fájlok és Kubernetes konfigurációk ellenőrzéséhez.",
    guide: [
      "1. Illeszd be a YAML szöveget a beviteli mezőbe, vagy húzd be a .yaml/.yml fájlt.",
      "2. A validálás automatikusan elindul gépelés közben.",
      "3. Érvényes YAML esetén zöld jelzést kapsz. Hiba esetén a hibaüzenet sor- és pozíciószámot mutat.",
      "4. Javítsd a hibát és a validátor azonnal újra ellenőriz.",
    ],
    faq: [
      { q: "Mire jó ez az eszköz?", a: "YAML fájlok szintaktikai helyességének ellenőrzésére szolgál – különösen hasznos konfigurációs fájlok (Docker, Kubernetes, CI/CD) validálásához." },
      { q: "Biztonságos az adataim szempontjából?", a: "Igen. Minden feldolgozás a böngésződben történik, semmilyen adat nem kerül szerverre." },
      { q: "Milyen YAML verziókat támogat?", a: "A validátor a YAML 1.2 szabványt követi a js-yaml könyvtár segítségével, ami a legelterjedtebb YAML implementáció." },
      { q: "Felismeri a behúzási hibákat?", a: "Igen, a YAML rendkívül érzékeny a behúzásra. A validátor pontosan megmutatja, ha inkonzisztens behúzást (pl. kevert tab és szóköz) talál." },
      { q: "Mobilon is használhatom?", a: "Igen, az eszköz teljesen reszponzív és bármilyen modern böngészőben működik." },
      { q: "Mi a különbség a YAML és a JSON validálás között?", a: "A YAML validálás a behúzás-alapú szintaxist, az ankorokat, a többsoros stringeket és a YAML-specifikus típusokat is ellenőrzi, míg a JSON validálás a zárójel-alapú struktúrát vizsgálja." },
    ],
    content: {
      howToSteps: [
        { title: "1. YAML beillesztése", description: "Illeszd be a YAML szöveget vagy húzd be a .yaml/.yml fájlt a beviteli mezőbe." },
        { title: "2. Automatikus ellenőrzés", description: "A validátor valós időben elemzi a YAML szintaxist gépelés közben." },
        { title: "3. Hibajelzés értelmezése", description: "Hiba esetén a hibaüzenet tartalmazza a sor számát és a hiba leírását." },
        { title: "4. Hiba javítása", description: "Javítsd a jelzett hibát, és az eredmény azonnal frissül." },
      ],
      useCases: [
        { icon: "🐳", title: "Docker Compose validálás", description: "docker-compose.yml fájlok szintaxis-ellenőrzése a konténerek indítása előtt." },
        { icon: "☸️", title: "Kubernetes manifeszt", description: "K8s deployment, service és ingress YAML fájlok gyors ellenőrzése." },
        { icon: "🔄", title: "CI/CD pipeline", description: "GitHub Actions, GitLab CI, CircleCI pipeline konfigurációk validálása deploy előtt." },
        { icon: "⚙️", title: "Alkalmazás konfiguráció", description: "Spring Boot, Ansible, Helm Chart és egyéb YAML-alapú config fájlok ellenőrzése." },
      ],
      formatComparison: {
        title: "YAML vs JSON vs TOML összehasonlítás",
        columns: ["Tulajdonság", "YAML", "JSON", "TOML"],
        rows: [
          { feature: "Olvashatóság", values: ["Kiváló", "Jó", "Jó"] },
          { feature: "Kommentek", values: ["Igen (#)", "Nem", "Igen (#)"] },
          { feature: "Behúzás-érzékeny", values: ["Igen", "Nem", "Nem"] },
          { feature: "Többsoros string", values: ["Natívan (|, >)", "Nem", "Igen (\"\"\")", ] },
          { feature: "Használat", values: ["Config, CI/CD, K8s", "API, config", "Config (Cargo, pyproject)"] },
        ],
      },
      aboutSection: {
        title: "A YAML formátumról",
        paragraphs: [
          "A YAML (YAML Ain't Markup Language) egy ember által könnyen olvasható adatszerializálási formátum. A behúzás-alapú szintaxis lehetővé teszi a hierarchikus adatok áttekinthető leírását zárójelpárok nélkül.",
          "A YAML rendkívül érzékeny a whitespace-re: kizárólag szóközöket szabad használni behúzásra (tabulátor nem megengedett), és az egy szinten lévő elemeknek azonos behúzási szintűeknek kell lenniük. Ez a leggyakoribb hibaforrás.",
          "A YAML az utóbbi években a DevOps világ egyik legfontosabb formátumává vált: Kubernetes manifesztek, Docker Compose fájlok, CI/CD pipeline-ok és Ansible playbook-ok mind YAML-t használnak.",
        ],
      },
      tips: [
        { icon: "🔑", tip: "Soha ne használj tabulátort a YAML behúzáshoz – kizárólag szóközöket. A kevert whitespace a leggyakoribb hiba." },
        { icon: "📐", tip: "Használj konzisztens behúzást: 2 szóközönkénti behúzás a legelfogadottabb konvenció." },
        { icon: "💡", tip: "A YAML stringeket nem kötelező idézőjelbe tenni, de speciális karaktereknél (pl. :, #, @) ajánlott." },
        { icon: "✅", tip: "Mindig validáld a YAML fájlt deploy előtt – egy apró behúzási hiba is működésképtelenné teheti a konfigurációt." },
      ],
    },
  },

  // ═══ 5. YAML FORMÁZÁS ════════════════════════════════════════════════════
  "yaml-formazas": {
    introText:
      "A YAML formázó eszköz konzisztenssé teszi a YAML fájlok behúzását és struktúráját. Normalizálja a whitespace-t, rendezi a kulcsokat és egységesíti a stílust – így a csapat minden tagja azonos formátumú YAML fájlokkal dolgozhat.",
    guide: [
      "1. Illeszd be a formázandó YAML szöveget a beviteli mezőbe.",
      "2. Válaszd ki a kívánt behúzás méretet (2 vagy 4 szóköz).",
      "3. Kattints a «Formázás» gombra – az eredmény normalizált behúzással jelenik meg.",
      "4. Másold ki az eredményt vagy töltsd le .yaml fájlként.",
    ],
    faq: [
      { q: "Mire jó ez az eszköz?", a: "YAML fájlok behúzásának és formázásának normalizálására szolgál – egységes, konzisztens stílust biztosít a YAML konfigurációknak." },
      { q: "Biztonságos az adataim szempontjából?", a: "Igen. Minden feldolgozás a böngésződben történik, semmilyen adat nem kerül szerverre." },
      { q: "Megváltoztatja az adatokat a formázás?", a: "Nem, a formázás kizárólag a whitespace-t és az elrendezést módosítja – az adattartalom érintetlen marad." },
      { q: "Hogyan kezeli a kommenteket?", a: "A YAML kommentek (#) megmaradnak a formázás során, a helyükön az újraformázott struktúrának megfelelően." },
      { q: "Mobilon is használhatom?", a: "Igen, az eszköz teljesen reszponzív és bármilyen modern böngészőben működik." },
      { q: "Mikor érdemes YAML formázót használni?", a: "Code review előtt, csapatmunkában az egységes stílus biztosítására, vagy ha különböző forrásokból származó YAML fájlokat kell összefésülni." },
    ],
    content: {
      howToSteps: [
        { title: "1. YAML beillesztése", description: "Illeszd be a formázandó YAML szöveget a beviteli mezőbe." },
        { title: "2. Behúzás beállítása", description: "Válaszd ki a kívánt behúzás méretet: 2 vagy 4 szóköz." },
        { title: "3. Formázás indítása", description: "Kattints a «Formázás» gombra a normalizáláshoz." },
        { title: "4. Eredmény exportálása", description: "Másold ki a formázott YAML-t vagy töltsd le fájlként." },
      ],
      useCases: [
        { icon: "👥", title: "Csapatmunka egységesítés", description: "Biztosítsd, hogy a csapat minden tagja azonos stílusú YAML fájlokat használjon – elkerülhetők a felesleges diff-ek." },
        { icon: "📋", title: "Code review előkészítés", description: "A formázott YAML könnyebben áttekinthető code review során, a lényegi változásokra koncentrálhatsz." },
        { icon: "🔧", title: "Legacy konfiguráció rendezés", description: "Régebbi, inkonzisztens behúzású YAML fájlok egységes formátumba rendezése." },
        { icon: "📝", title: "Dokumentáció", description: "Szép, olvasható YAML példákat készíthetsz dokumentációhoz és oktatáshoz." },
      ],
      aboutSection: {
        title: "A YAML formázás fontossága",
        paragraphs: [
          "A YAML formázás kulcsfontosságú, mert a YAML nyelv behúzás-érzékeny: a whitespace nem csupán esztétikai kérdés, hanem a struktúra szerves része. Egy rosszul behúzott YAML fájl teljesen más adatszerkezetet eredményezhet.",
          "A konzisztens formázás különösen fontos csapatmunkánál: ha mindenki azonos behúzási stílust használ, a verziókezelő diff-jei kizárólag a lényegi változásokat mutatják, nem a whitespace különbségeket.",
          "A YAML formázó a js-yaml könyvtárat használja a parse és serialize műveletekhez, ami biztosítja a YAML 1.2 szabványnak való megfelelést.",
        ],
      },
      tips: [
        { icon: "📐", tip: "A 2 szóközös behúzás a legelterjedtebb konvenció YAML fájloknál – különösen a DevOps világban." },
        { icon: "🔄", tip: "Formázás előtt mindig validáld a YAML-t – hibás YAML nem formázható megfelelően." },
        { icon: "👥", tip: "Állíts be .editorconfig-ot a projektedben, hogy a YAML fájlok mindig konzisztens behúzással készüljenek." },
      ],
    },
  },

  // ═══ 6. XML FORMÁZÁS ═════════════════════════════════════════════════════
  "xml-formazas": {
    introText:
      "Az XML formázó (prettify) eszköz áttekinthető, szépen behúzott formába hozza az XML adataidat. Normalizálja a behúzásokat és sortöréseket, így könnyebben olvashatóvá és szerkeszthetővé teszi a dokumentumokat. Ideális SOAP válaszok, konfigurációs fájlok és adatexportok megjelenítéséhez.",
    guide: [
      "1. Illeszd be az XML szöveget a beviteli mezőbe, vagy húzd be az .xml fájlt.",
      "2. Válaszd ki a behúzás méretet (2 vagy 4 szóköz, tabulátor).",
      "3. Kattints a «Formázás» gombra az eredmény megjelenítéséhez.",
      "4. Másold ki a formázott XML-t vagy töltsd le fájlként.",
    ],
    faq: [
      { q: "Mire jó ez az eszköz?", a: "XML dokumentumok olvashatóvá formázására szolgál: behúzásokat és sortöréseket ad hozzá az egysoros vagy tömörített XML-hez." },
      { q: "Biztonságos az adataim szempontjából?", a: "Igen. Minden feldolgozás a böngésződben történik, semmilyen adat nem kerül szerverre." },
      { q: "Kezeli a CDATA és komment szekciót?", a: "Igen, a formázó megőrzi a CDATA szekciók tartalmát és az XML kommenteket, a behúzást normalizálja körülöttük." },
      { q: "Mi történik, ha érvénytelen XML-t illesztek be?", a: "A formázó jelzi, ha az XML not well-formed – a hibaüzenet tartalmazza a problémás sor számát." },
      { q: "Mobilon is használhatom?", a: "Igen, az eszköz teljesen reszponzív és bármilyen modern böngészőben működik." },
      { q: "Megváltoztatja a formázás az XML tartalmát?", a: "Nem, kizárólag a whitespace és behúzás kerül módosításra – az elemek, attribútumok és szöveges tartalmak érintetlenek maradnak." },
    ],
    content: {
      howToSteps: [
        { title: "1. XML beillesztése", description: "Illeszd be az XML szöveget a beviteli mezőbe vagy húzd be az .xml fájlt." },
        { title: "2. Behúzás kiválasztása", description: "Válaszd ki a kívánt indent méretet: 2 szóköz, 4 szóköz vagy tabulátor." },
        { title: "3. Formázás", description: "Kattints a «Formázás» gombra – az eredmény szépen behúzva jelenik meg." },
        { title: "4. Eredmény másolása", description: "Másold ki a vágólapra vagy töltsd le .xml fájlként." },
      ],
      useCases: [
        { icon: "🔌", title: "SOAP válaszok olvasása", description: "SOAP web service-ektől kapott egysoros XML válaszok áttekinthető formába hozása." },
        { icon: "⚙️", title: "Konfigurációs fájlok", description: "Maven pom.xml, Spring XML config és egyéb konfigurációs fájlok szerkesztése előtt olvashatóvá formázás." },
        { icon: "📊", title: "Adatexportok", description: "XML formátumú adatexportok (pl. bankszámlakivonat, számla) áttekintése és ellenőrzése." },
        { icon: "🐛", title: "Hibakeresés", description: "Tömörített XML hibakeresése formázott, behúzott nézetben sokkal hatékonyabb." },
      ],
      formatComparison: {
        title: "XML vs JSON vs YAML összehasonlítás",
        columns: ["Tulajdonság", "XML", "JSON", "YAML"],
        rows: [
          { feature: "Olvashatóság", values: ["Közepes", "Jó", "Kiváló"] },
          { feature: "Fájlméret", values: ["Nagy (tag-ek miatt)", "Közepes", "Kicsi"] },
          { feature: "Séma validálás", values: ["XSD/DTD", "JSON Schema", "Nincs beépítve"] },
          { feature: "Névterek", values: ["Igen (xmlns)", "Nem", "Nem"] },
          { feature: "Használat", values: ["SOAP, enterprise, RSS", "API, config", "Config, CI/CD"] },
        ],
      },
      aboutSection: {
        title: "Az XML formátumról",
        paragraphs: [
          "Az XML (Extensible Markup Language) egy jelölőnyelv, amelyet a W3C fejlesztett ki 1998-ban adatok strukturált leírására. Legfőbb erőssége a rugalmasság: saját elemneveket és attribútumokat definiálhatsz, amelyeket XSD vagy DTD séma segítségével validálhatsz.",
          "Az XML ma is széles körben használatos: SOAP web service-ek, RSS feedek, SVG grafikák, Office dokumentumok (OOXML), Android layoutok és számos enterprise rendszer alapformátuma. Bár a modern web API-kban a JSON átvette a vezető szerepet, az XML továbbra is nélkülözhetetlen számos iparágban.",
          "Az XML formázás a dokumentum whitespace-ét normalizálja a tag-ek hierarchiájának megfelelően. A formázó megőrzi az XML deklarációt, a kommenteket és a CDATA szekciók tartalmát.",
        ],
      },
      tips: [
        { icon: "📝", tip: "Mindig ellenőrizd, hogy az XML well-formed legyen formázás előtt – hibás XML nem formázható." },
        { icon: "🏷️", tip: "Záró tag nélküli elemek (self-closing) pl.: <br/> – a formázó ezeket is helyesen kezeli." },
        { icon: "💡", tip: "Ha nagyon nagy XML fájlokkal dolgozol, fontold meg a dedikált XML szerkesztő használatát." },
        { icon: "🔍", tip: "Formázott XML-ben könnyebben megtalálod a hiányzó záró tag-eket és a struktúra-problémákat." },
      ],
    },
  },

  // ═══ 7. XML MINIFIKÁLÁS ═══════════════════════════════════════════════════
  "xml-minimalas": {
    introText:
      "Az XML minifikáló eltávolítja a felesleges whitespace-t, sortöréseket és kommenteket az XML dokumentumokból, minimalizálva a fájlméretet. Különösen hasznos SOAP üzenetek, RSS feedek és XML-alapú API válaszok optimalizálásához.",
    guide: [
      "1. Illeszd be a formázott XML szöveget a beviteli mezőbe.",
      "2. Válaszd ki, hogy a kommentek is törlődjenek-e.",
      "3. Kattints a «Minifikálás» gombra.",
      "4. Ellenőrizd a méretcsökkentés százalékát, majd másold ki vagy töltsd le az eredményt.",
    ],
    faq: [
      { q: "Mire jó ez az eszköz?", a: "XML dokumentumok méretének csökkentésére szolgál: eltávolítja a felesleges whitespace-t, sortöréseket és opcionálisan a kommenteket." },
      { q: "Biztonságos az adataim szempontjából?", a: "Igen. Minden feldolgozás a böngésződben történik, semmilyen adat nem kerül szerverre." },
      { q: "Törlődnek a kommentek is?", a: "Opcionálisan. Beállíthatod, hogy a kommentek megmaradjanak vagy törlődjenek – alapértelmezetten a kommentek is eltávolításra kerülnek a maximális méretcsökkentés érdekében." },
      { q: "Mennyivel csökkenhet az XML mérete?", a: "Az XML minifikálás jellemzően 30–60%-os méretcsökkentést eredményez, mivel az XML tag-nevei által amúgy is nagy fájlokból sok whitespace távolítható el." },
      { q: "Mobilon is használhatom?", a: "Igen, az eszköz teljesen reszponzív és bármilyen modern böngészőben működik." },
      { q: "Visszaalakítható a minifikált XML?", a: "Igen, az XML formázó (prettify) eszközzel bármikor visszaformázhatod olvasható, behúzott formába." },
    ],
    content: {
      howToSteps: [
        { title: "1. XML beillesztése", description: "Illeszd be a formázott XML szöveget a beviteli mezőbe." },
        { title: "2. Beállítások", description: "Válaszd ki, hogy a kommentek is törlődjenek-e a minifikálás során." },
        { title: "3. Minifikálás", description: "Kattints a «Minifikálás» gombra a whitespace eltávolításához." },
        { title: "4. Eredmény letöltése", description: "Ellenőrizd a méretcsökkentést és másold ki vagy töltsd le az eredményt." },
      ],
      useCases: [
        { icon: "📡", title: "SOAP optimalizálás", description: "SOAP XML üzenetek méretének csökkentése a gyorsabb hálózati átvitel érdekében." },
        { icon: "📰", title: "RSS feed tömörítés", description: "RSS és Atom feed fájlok méretének optimalizálása a szerver forgalom csökkentéséhez." },
        { icon: "💾", title: "Tárhely megtakarítás", description: "Nagy mennyiségű XML adat tárolásakor a minifikálás jelentős tárhelyet szabadít fel." },
        { icon: "⚡", title: "Build pipeline", description: "XML konfigurációs fájlok automatikus minifikálása a build folyamat részeként." },
      ],
      aboutSection: {
        title: "Az XML minifikálásról",
        paragraphs: [
          "Az XML minifikálás az XML dokumentum olvashatóságáért felelős whitespace karakterek eltávolítását jelenti. Ide tartoznak a behúzások (szóközök és tabulátorok), a tag-ek közötti sortörések és opcionálisan az XML kommentek.",
          "Az XML dokumentumok mérete a tag-ek neve miatt eleve nagyobb, mint a JSON megfelelőjük. A minifikálás különösen hatékony az XML esetében, mert a behúzás arányaiban jelentős részt tesz ki a teljes fájlméretből.",
          "Fontos megjegyezni, hogy az XML minifikálás nem változtatja meg az adattartalmat: az elemek, attribútumok, szöveges tartalmak és CDATA szekciók érintetlenek maradnak.",
        ],
      },
      tips: [
        { icon: "🗜️", tip: "Az XML minifikálás és a gzip/brotli tömörítés együttes alkalmazása a leghatékonyabb méretcsökkentést adja." },
        { icon: "⚠️", tip: "Figyelj arra, hogy egyes XML feldolgozók a whitespace-t jelentésesnek tekinthetik – ellenőrizd a minifikált XML működését." },
        { icon: "📊", tip: "Nézd meg a méretcsökkentés százalékát – XML-nél jellemzően 30–60%-os megtakarítás érhető el." },
      ],
    },
  },

  // ═══ 8. XML ELLENŐRZÉS ════════════════════════════════════════════════════
  "xml-ellenorzes": {
    introText:
      "Az XML validátor ellenőrzi, hogy az XML dokumentum well-formed (jól formázott-e): helyes a tag-struktúra, a záró elemek és az attribútumok szintaxisa. A böngésző beépített DOMParser-ét használja a valós idejű ellenőrzéshez.",
    guide: [
      "1. Illeszd be az XML szöveget a beviteli mezőbe.",
      "2. A validálás automatikusan megtörténik.",
      "3. Ha az XML well-formed, zöld jelzést kapsz. Ha hibás, a hibaüzenet megmutatja a problémát.",
      "4. Javítsd a hibát a megjelölt helyen.",
    ],
    faq: [
      { q: "Mire jó ez az eszköz?", a: "XML dokumentumok well-formedness ellenőrzésére szolgál: megvizsgálja, hogy minden tag-nek van-e záró párja, helyesek-e az attribútumok és a struktúra." },
      { q: "Biztonságos az adataim szempontjából?", a: "Igen. Minden feldolgozás a böngésződben történik, semmilyen adat nem kerül szerverre." },
      { q: "XSD séma alapján is validál?", a: "Nem, ez az eszköz a well-formedness ellenőrzést végzi (szintaxis). XSD vagy DTD séma-validáláshoz dedikált XML eszközre van szükség." },
      { q: "Milyen hibákat ismer fel?", a: "Hiányzó záró tag, nem egyező tag-nevek, hibás attribútum szintaxis, duplikált attribútumok, nem escapelt speciális karakterek és más szintaxis problémákat." },
      { q: "Mobilon is használhatom?", a: "Igen, az eszköz teljesen reszponzív és bármilyen modern böngészőben működik." },
      { q: "Mi a különbség a well-formed és a valid XML között?", a: "A well-formed XML szintaktikailag helyes (helyes tag-struktúra). A valid XML ezen felül egy XSD/DTD sémának is megfelel. Ez az eszköz a well-formedness-t ellenőrzi." },
    ],
    content: {
      howToSteps: [
        { title: "1. XML beillesztése", description: "Illeszd be az ellenőrizendő XML szöveget a beviteli mezőbe." },
        { title: "2. Automatikus validálás", description: "A validátor a DOMParser segítségével valós időben ellenőrzi a szintaxist." },
        { title: "3. Eredmény értelmezése", description: "Well-formed XML zöld jelzést kap; hibás XML piros jelzéssel és hibaüzenettel jelenik meg." },
        { title: "4. Hiba javítása", description: "Javítsd a megjelölt hibát, és az ellenőrzés automatikusan újra lefut." },
      ],
      useCases: [
        { icon: "🔌", title: "SOAP integráció", description: "SOAP XML üzenetek szintaxis-ellenőrzése a web service hívás előtt." },
        { icon: "📱", title: "Android layout", description: "Android XML layout fájlok szintaxis-ellenőrzése a build előtt." },
        { icon: "📄", title: "SVG validálás", description: "SVG fájlok (amelyek XML-alapúak) szintaxisának gyors ellenőrzése." },
        { icon: "🏗️", title: "Build konfiguráció", description: "Maven pom.xml és egyéb build konfigurációs fájlok validálása." },
      ],
      aboutSection: {
        title: "Az XML validálásról",
        paragraphs: [
          "Az XML validálás két szinten történhet. Az első szint a well-formedness: az XML szintaktikailag helyes-e? Minden nyitó tag-nek van záró párja, az attribútumok idézőjelben vannak, és nincs elemkeresztezés.",
          "A második szint a séma-validálás: az XML megfelel-e egy előre definiált XSD (XML Schema Definition) vagy DTD (Document Type Definition) sémának? Ez az eszköz az első szintű, well-formedness ellenőrzést végzi.",
          "A böngésző beépített DOMParser API-ja megbízható és gyors módot biztosít az XML szintaxis ellenőrzésére. Ha az XML hibás, a parser parsererror elemet ad vissza a hiba részletes leírásával.",
        ],
      },
      tips: [
        { icon: "🏷️", tip: "Az XML tag-nevek case-sensitive-ek: a <Name> és <name> két különböző elem." },
        { icon: "⚠️", tip: "Az XML attribútumoknak mindig idézőjelben (\" vagy ') kell lenniük – ez a HTML-lel ellentétben kötelező." },
        { icon: "🔤", tip: "Speciális karaktereket (&, <, >, \", ') mindig XML entity-ként kell írni: &amp;, &lt;, &gt;, &quot;, &apos;." },
        { icon: "🔍", tip: "Ha a hibaüzenet a fájl végére mutat, valószínűleg egy korábbi elemnek hiányzik a záró tag-je." },
      ],
    },
  },

  // ═══ 9. HTML FORMÁZÁS ════════════════════════════════════════════════════
  "html-formazas": {
    introText:
      "A HTML formázó (beautify) eszköz olvashatóvá teszi a tömörített vagy rosszul behúzott HTML kódot. Normalizálja a behúzásokat, kezeli a void elemeket és konzisztenssé teszi a struktúrát. Ideális fejlesztők és webmesterek számára, akik HTML forráskódot szerkesztenek.",
    guide: [
      "1. Illeszd be a formázandó HTML kódot a beviteli mezőbe.",
      "2. Válaszd ki a behúzás méretet (2 vagy 4 szóköz).",
      "3. Kattints a «Formázás» gombra az eredmény megjelenítéséhez.",
      "4. Másold ki a formázott HTML-t vagy töltsd le fájlként.",
    ],
    faq: [
      { q: "Mire jó ez az eszköz?", a: "HTML kód olvashatóvá formázására szolgál: konzisztens behúzásokat, sortöréseket ad hozzá, így a kód áttekinthetőbb és szerkeszthetőbb lesz." },
      { q: "Biztonságos az adataim szempontjából?", a: "Igen. Minden feldolgozás a böngésződben történik, semmilyen adat nem kerül szerverre." },
      { q: "Hogyan kezeli a void elemeket?", a: "A void elemeket (br, hr, img, input stb.) helyesen kezeli – ezeknek nincs záró tag-jük, és a formázó nem ad hozzá feleslegeset." },
      { q: "Megváltoztatja a HTML működését?", a: "Nem, a formázás kizárólag a whitespace-t és behúzást módosítja – a HTML struktúra és a megjelenítés változatlan marad." },
      { q: "Mobilon is használhatom?", a: "Igen, az eszköz teljesen reszponzív és bármilyen modern böngészőben működik." },
      { q: "Formázza a beágyazott CSS-t és JavaScript-et is?", a: "Az eszköz elsősorban a HTML tag-ek behúzását normalizálja. A beágyazott style és script blokkok tartalmát alapszinten formázza." },
    ],
    content: {
      howToSteps: [
        { title: "1. HTML beillesztése", description: "Illeszd be a HTML kódot a beviteli mezőbe, vagy húzd be az .html fájlt." },
        { title: "2. Behúzás beállítása", description: "Válaszd ki a kívánt indent méretet: 2 vagy 4 szóköz." },
        { title: "3. Formázás", description: "Kattints a «Formázás» gombra a HTML szépítéséhez." },
        { title: "4. Eredmény exportálása", description: "Másold ki a formázott HTML-t vagy töltsd le fájlként." },
      ],
      useCases: [
        { icon: "🌐", title: "Weboldal szerkesztés", description: "Minifikált vagy rosszul behúzott HTML weboldalak forráskódjának olvashatóvá tétele szerkesztés előtt." },
        { icon: "📧", title: "Email template", description: "HTML email sablonok formázása, amelyek gyakran nagyon tömörített kóddal készülnek." },
        { icon: "📋", title: "Code review", description: "Formázott HTML kód könnyebben áttekinthető code review során." },
        { icon: "🎓", title: "Tanulás", description: "HTML tanulásánál a szép behúzás segít megérteni a tag-ek egymásba ágyazási hierarchiáját." },
      ],
      aboutSection: {
        title: "A HTML formázásról",
        paragraphs: [
          "A HTML (HyperText Markup Language) a weboldalak alapvető jelölőnyelve. A formázás (beautify) a HTML kód olvashatóságát javítja konzisztens behúzások és sortörések hozzáadásával, miközben a dokumentum struktúrája és megjelenítése változatlan marad.",
          "A HTML formázásnál különös figyelmet kell fordítani a void elemekre (img, br, hr, input, meta, link), amelyeknek nincs záró tag-jük, valamint az inline és block szintű elemek eltérő kezelésére.",
          "A jól formázott HTML kód nemcsak olvashatóbb, hanem a karbantartást és a csapatmunkát is megkönnyíti. A konzisztens behúzás segít a struktúra-problémák és a hiányzó záró tag-ek gyors felismerésében.",
        ],
      },
      tips: [
        { icon: "📐", tip: "A 2 szóközös behúzás a legelterjedtebb HTML konvenció – a legtöbb szerkesztő és linter ezt ajánlja." },
        { icon: "🏷️", tip: "A void elemeknek (br, img, hr, input) nincs záró tag-jük – ne adj hozzá feleslegeset." },
        { icon: "💡", tip: "Használd a formázást code review előtt, hogy a diff-ben csak a lényegi változások jelenjenek meg." },
      ],
    },
  },

  // ═══ 10. HTML MINIFIKÁLÁS ════════════════════════════════════════════════
  "html-minimalas": {
    introText:
      "A HTML minifikáló eltávolítja a felesleges whitespace-t, sortöréseket és HTML kommenteket a kódból, csökkentve a fájlméretet. Ideális production build-ekhez, ahol a gyorsabb betöltési idő és a kisebb sávszélesség-használat a cél.",
    guide: [
      "1. Illeszd be a HTML kódot a beviteli mezőbe.",
      "2. Válaszd ki a minifikálási opciókat (kommentek törlése, whitespace tömörítés).",
      "3. Kattints a «Minifikálás» gombra.",
      "4. Ellenőrizd a méretcsökkentés százalékát és másold ki az eredményt.",
    ],
    faq: [
      { q: "Mire jó ez az eszköz?", a: "HTML kód méretének csökkentésére szolgál: eltávolítja a felesleges whitespace-t, sortöréseket és kommenteket, gyorsítva az oldal betöltését." },
      { q: "Biztonságos az adataim szempontjából?", a: "Igen. Minden feldolgozás a böngésződben történik, semmilyen adat nem kerül szerverre." },
      { q: "Befolyásolja a weboldal megjelenését?", a: "A legtöbb esetben nem. A whitespace eltávolítása a böngésző renderelését nem befolyásolja, kivéve ha a CSS pre/white-space tulajdonságra támaszkodik." },
      { q: "Törlődnek a conditional kommentek is?", a: "A minifikálás során az összes HTML komment eltávolításra kerül. Ha IE conditional kommentekre van szükséged, használd a szelektív módot." },
      { q: "Mobilon is használhatom?", a: "Igen, az eszköz teljesen reszponzív és bármilyen modern böngészőben működik." },
      { q: "Mennyivel csökken a fájlméret?", a: "Jellemzően 10–30%-os méretcsökkentés érhető el a HTML minifikálással, a kód formázottságától és a kommentek mennyiségétől függően." },
    ],
    content: {
      howToSteps: [
        { title: "1. HTML beillesztése", description: "Illeszd be a minifikálandó HTML kódot a beviteli mezőbe." },
        { title: "2. Opciók kiválasztása", description: "Válaszd ki, hogy a kommentek és a felesleges attribútumok is törlődjenek-e." },
        { title: "3. Minifikálás", description: "Kattints a «Minifikálás» gombra a méretcsökkentéshez." },
        { title: "4. Eredmény exportálása", description: "Nézd meg a méretcsökkentés százalékát, és másold ki vagy töltsd le az eredményt." },
      ],
      useCases: [
        { icon: "🚀", title: "Production build", description: "HTML fájlok méretének optimalizálása az éles weboldalon a gyorsabb betöltési idő érdekében." },
        { icon: "📈", title: "Core Web Vitals javítás", description: "Kisebb HTML fájl = gyorsabb First Contentful Paint és Largest Contentful Paint értékek." },
        { icon: "📧", title: "Email HTML tömörítés", description: "HTML email sablonok méretének csökkentése, ahol a méretkorlát fontos szempont." },
        { icon: "⚡", title: "CDN optimalizálás", description: "A minifikált HTML kisebb CDN tárhelyet és kevesebb sávszélességet igényel." },
      ],
      aboutSection: {
        title: "A HTML minifikálásról",
        paragraphs: [
          "A HTML minifikálás a HTML forráskód méretének csökkentését jelenti a felesleges whitespace, sortörések, behúzások és kommentek eltávolításával. Az eredmény funkcionálisan azonos dokumentum, amelyet a böngésző pontosan ugyanúgy renderel.",
          "A HTML minifikálás része a frontend teljesítményoptimalizálásnak. A CSS és JavaScript minifikálással kombinálva jelentős oldalbetöltési idő javulás érhető el, ami közvetlenül hatással van a felhasználói élményre és a keresőoptimalizálásra.",
          "Fontos megjegyezni, hogy a minifikálás nem tömörítés. A gzip vagy brotli szerver-oldali tömörítéssel kombinálva a leghatékonyabb: a minifikálás eltávolítja a felesleges karaktereket, a tömörítés pedig az ismétlődő mintákat kódolja hatékonyabban.",
        ],
      },
      tips: [
        { icon: "📊", tip: "Kombináld a HTML minifikálást CSS és JS minifikálással a maximális teljesítményjavulás érdekében." },
        { icon: "⚠️", tip: "Ellenőrizd a minifikált HTML-t – egyes CSS white-space trükkök az inline whitespace-re építenek." },
        { icon: "🔄", tip: "A minifikált HTML bármikor visszaformázható a HTML formázó (beautify) eszközzel." },
      ],
    },
  },

  // ═══ 11. CSS FORMÁZÁS ════════════════════════════════════════════════════
  "css-formazas": {
    introText:
      "A CSS formázó (beautify) eszköz olvashatóvá teszi a tömörített vagy rosszul behúzott CSS kódot. Normalizálja a behúzásokat, elválasztja a szelektorokat és property-ket, konzisztens stílust biztosítva. Ideális fejlesztők számára, akik CSS kódot szerkesztenek vagy reviewolnak.",
    guide: [
      "1. Illeszd be a CSS kódot a beviteli mezőbe.",
      "2. Válaszd ki a behúzás méretet (2 vagy 4 szóköz).",
      "3. Kattints a «Formázás» gombra.",
      "4. Másold ki a formázott CSS-t vagy töltsd le .css fájlként.",
    ],
    faq: [
      { q: "Mire jó ez az eszköz?", a: "Tömörített vagy rosszul behúzott CSS kód olvashatóvá formázására szolgál: property-nkénti sortörést, konzisztens behúzást és szelektor-elválasztást biztosít." },
      { q: "Biztonságos az adataim szempontjából?", a: "Igen. Minden feldolgozás a böngésződben történik, semmilyen adat nem kerül szerverre." },
      { q: "Rendezi a CSS property-ket ABC sorrendbe?", a: "Opcionálisan. Választhatsz, hogy az eredeti sorrendet megtartsa, vagy ABC sorrendbe rendezze a deklarációkat." },
      { q: "Kezeli a media query-ket és nesting-et?", a: "Igen, a formázó helyesen kezeli a @media, @keyframes, @supports és egyéb at-rule blokkokat, valamint a CSS nesting szintaxist." },
      { q: "Mobilon is használhatom?", a: "Igen, az eszköz teljesen reszponzív és bármilyen modern böngészőben működik." },
      { q: "Megváltoztatja a CSS működését?", a: "Nem. A formázás kizárólag whitespace-t és sortöréseket ad hozzá – a CSS szabályok és hatásuk változatlan marad." },
    ],
    content: {
      howToSteps: [
        { title: "1. CSS beillesztése", description: "Illeszd be a CSS kódot a beviteli mezőbe, vagy húzd be a .css fájlt." },
        { title: "2. Formázási beállítások", description: "Válaszd ki a behúzás méretet és az opcionális property rendezést." },
        { title: "3. Formázás", description: "Kattints a «Formázás» gombra a CSS szépítéséhez." },
        { title: "4. Eredmény exportálása", description: "Másold ki a formázott CSS-t vagy töltsd le fájlként." },
      ],
      useCases: [
        { icon: "🎨", title: "CSS szerkesztés", description: "Minifikált CSS olvashatóvá tétele szerkesztés és módosítás előtt." },
        { icon: "📋", title: "Code review", description: "Konzisztensen formázott CSS kód könnyebben áttekinthető code review során." },
        { icon: "🔍", title: "Hibakeresés", description: "Tömörített CSS-ben nehéz hibát keresni – a formázás sokkal könnyebbé teszi." },
        { icon: "📝", title: "Dokumentáció", description: "Szép, olvasható CSS kódrészleteket készíthetsz dokumentációhoz és tutorialokhoz." },
      ],
      aboutSection: {
        title: "A CSS formázásról",
        paragraphs: [
          "A CSS (Cascading Style Sheets) a weboldalak vizuális megjelenését definiáló stíluslap-nyelv. A CSS formázás az olvashatóság javítását szolgálja: minden property külön sorba kerül, a szelektorok egyértelműen elválasztódnak, és a behúzás tükrözi a szabályok hierarchiáját.",
          "A jól formázott CSS nemcsak olvashatóbb, hanem a karbantartást is megkönnyíti. Könnyebben megtalálod az adott szelektorhoz tartozó property-ket, felismered a duplikált szabályokat és a specificity problémákat.",
          "A modern CSS egyre összetettebb: custom properties (CSS változók), nesting, container queries és egyéb funkciók miatt a formázás fontossága megnőtt. A konzisztens stílus segít áttekinteni a komplex stíluslapokat.",
        ],
      },
      tips: [
        { icon: "📐", tip: "A 2 szóközös behúzás a legelterjedtebb CSS konvenció, de a 4 szóköz is népszerű." },
        { icon: "🔑", tip: "Érdemes a property-ket ABC sorrendbe rendezni – ez megkönnyíti az adott tulajdonság megtalálását." },
        { icon: "💡", tip: "Formázás után használj CSS lintert (pl. Stylelint) a legjobb gyakorlatok betartásának ellenőrzéséhez." },
      ],
    },
  },

  // ═══ 12. CSS MINIFIKÁLÁS ═════════════════════════════════════════════════
  "css-minimalas": {
    introText:
      "A CSS minifikáló eltávolítja a felesleges whitespace-t, sortöréseket és kommenteket a CSS kódból, minimalizálva a fájlméretet. Alapvető eszköz a frontend teljesítményoptimalizáláshoz, amely gyorsabb oldalbetöltést és kisebb sávszélesség-használatot eredményez.",
    guide: [
      "1. Illeszd be a CSS kódot a beviteli mezőbe.",
      "2. Kattints a «Minifikálás» gombra.",
      "3. Ellenőrizd a méretcsökkentés százalékát.",
      "4. Másold ki a minifikált CSS-t vagy töltsd le fájlként.",
    ],
    faq: [
      { q: "Mire jó ez az eszköz?", a: "CSS fájlok méretének csökkentésére szolgál: eltávolítja a kommenteket, whitespace-t és felesleges sortöréseket, kisebb fájlméretet eredményezve." },
      { q: "Biztonságos az adataim szempontjából?", a: "Igen. Minden feldolgozás a böngésződben történik, semmilyen adat nem kerül szerverre." },
      { q: "Befolyásolja a weboldal megjelenését?", a: "Nem. A minifikálás kizárólag a whitespace-t és kommenteket távolítja el – a CSS szabályok és hatásuk pontosan megegyeznek az eredetivel." },
      { q: "Mennyivel lesz kisebb a CSS?", a: "Jellemzően 20–40%-os méretcsökkentés érhető el, a kód formázottságától és a kommentek mennyiségétől függően." },
      { q: "Mobilon is használhatom?", a: "Igen, az eszköz teljesen reszponzív és bármilyen modern böngészőben működik." },
      { q: "Visszaalakítható a minifikált CSS?", a: "Igen, a CSS formázó (beautify) eszközünkkel bármikor visszaformázhatod olvasható formába." },
    ],
    content: {
      howToSteps: [
        { title: "1. CSS beillesztése", description: "Illeszd be a CSS kódot a beviteli mezőbe vagy húzd be a .css fájlt." },
        { title: "2. Minifikálás", description: "Kattints a «Minifikálás» gombra a whitespace és kommentek eltávolításához." },
        { title: "3. Méret ellenőrzése", description: "Olvasd le az eredeti és minifikált méret közötti különbséget." },
        { title: "4. Eredmény exportálása", description: "Másold ki a minifikált CSS-t vagy töltsd le .css fájlként." },
      ],
      useCases: [
        { icon: "🚀", title: "Production deploy", description: "CSS fájlok méretének minimalizálása az éles weboldalon a gyorsabb betöltés érdekében." },
        { icon: "📈", title: "Core Web Vitals", description: "Kisebb CSS = gyorsabb First Contentful Paint, jobb LCP és CLS értékek." },
        { icon: "📱", title: "Mobil optimalizálás", description: "Mobil hálózaton a kisebb CSS fájl észrevehetően gyorsabb betöltést eredményez." },
        { icon: "⚡", title: "Build pipeline", description: "A CSS minifikálás automatizálható a build folyamatban (Webpack, Vite, Rollup)." },
      ],
      aboutSection: {
        title: "A CSS minifikálásról",
        paragraphs: [
          "A CSS minifikálás a stíluslap fájlok méretének csökkentését jelenti a felesleges whitespace, sortörések, behúzások és kommentek eltávolításával. Az eredmény funkcionálisan azonos stíluslap, amelyet a böngésző ugyanúgy értelmez.",
          "A CSS minifikálás a frontend teljesítményoptimalizálás egyik alapvető lépése. A HTML és JavaScript minifikálással kombinálva, valamint gzip/brotli tömörítéssel kiegészítve, jelentős betöltési idő javulás érhető el.",
          "A modern build eszközök (Webpack, Vite, Rollup) automatikusan minifikálják a CSS-t production build-nél. Ez az online eszköz akkor hasznos, ha gyorsan szeretnél egy CSS részletet minifikálni, anélkül hogy build pipeline-t állítanál be.",
        ],
      },
      tips: [
        { icon: "🗜️", tip: "A CSS minifikálás és gzip/brotli tömörítés kombinálásával akár 80–90%-os méretcsökkentés érhető el." },
        { icon: "📊", tip: "Ellenőrizd a méretcsökkentés százalékát – ha minimális, a CSS eleve tömör volt." },
        { icon: "🔄", tip: "Mindig tartsd meg az eredeti, formázott CSS-t a verziókezelőben – a minifikált verziót a build pipeline állítsa elő." },
      ],
    },
  },

  // ═══ 13. JAVASCRIPT FORMÁZÁS ═════════════════════════════════════════════
  "js-formazas": {
    introText:
      "A JavaScript formázó (beautify) eszköz olvashatóvá teszi a tömörített vagy rosszul behúzott JavaScript kódot. Normalizálja a behúzásokat, sortöréseket és blokk-szintű struktúrákat. Ideális minifikált kód visszafejtéséhez, code review-hoz és hibakereséshez.",
    guide: [
      "1. Illeszd be a JavaScript kódot a beviteli mezőbe.",
      "2. Válaszd ki a behúzás méretet (2 vagy 4 szóköz).",
      "3. Kattints a «Formázás» gombra az eredmény megjelenítéséhez.",
      "4. Másold ki a formázott JS kódot vagy töltsd le fájlként.",
    ],
    faq: [
      { q: "Mire jó ez az eszköz?", a: "Tömörített vagy rosszul behúzott JavaScript kód olvashatóvá formázására szolgál: konzisztens behúzást, sortöréseket és blokk-szintű elrendezést biztosít." },
      { q: "Biztonságos az adataim szempontjából?", a: "Igen. Minden feldolgozás a böngésződben történik, semmilyen adat nem kerül szerverre." },
      { q: "Kezeli a modern JavaScript szintaxist?", a: "Igen, az eszköz a modern ES6+ szintaxist is kezeli: arrow function, template literal, destructuring, async/await és egyéb modern nyelvi elemek." },
      { q: "TypeScript kódot is formáz?", a: "Az eszköz elsősorban JavaScript-re optimalizált. TypeScript-specifikus szintaxist (type annotáció, interface) alapszinten kezel." },
      { q: "Mobilon is használhatom?", a: "Igen, az eszköz teljesen reszponzív és bármilyen modern böngészőben működik." },
      { q: "Megváltoztatja a kód működését?", a: "Nem. A formázás kizárólag whitespace-t módosít – a kód logikája és működése teljesen változatlan marad." },
    ],
    content: {
      howToSteps: [
        { title: "1. JavaScript beillesztése", description: "Illeszd be a JavaScript kódot a beviteli mezőbe, vagy húzd be a .js fájlt." },
        { title: "2. Formázási beállítások", description: "Válaszd ki a behúzás méretet: 2 szóköz, 4 szóköz vagy tabulátor." },
        { title: "3. Formázás", description: "Kattints a «Formázás» gombra a kód szépítéséhez." },
        { title: "4. Eredmény exportálása", description: "Másold ki a formázott JS-t vagy töltsd le fájlként." },
      ],
      useCases: [
        { icon: "🔍", title: "Minifikált kód visszafejtés", description: "Production minifikált JavaScript kód olvashatóvá tétele hibakeresés vagy elemzés céljából." },
        { icon: "📋", title: "Code review", description: "Konzisztensen formázott kód könnyebben áttekinthető és reviewolható." },
        { icon: "🐛", title: "Hibakeresés", description: "Tömörített kódban szinte lehetetlen hibát keresni – a formázás elengedhetetlen lépés." },
        { icon: "🎓", title: "Tanulás", description: "JavaScript tanulásánál a szép behúzás segít megérteni a program struktúráját és a vezérlési folyamatot." },
      ],
      aboutSection: {
        title: "A JavaScript formázásról",
        paragraphs: [
          "A JavaScript a web legfontosabb programozási nyelve. A formázás (beautify) a kód olvashatóságát javítja: minden utasítás külön sorba kerül, a blokkok ({...}) behúzása konzisztens, és a logikai egységek egyértelműen elkülönülnek.",
          "A modern JavaScript ökoszisztémában a Prettier és az ESLint automatikus formázást biztosít a fejlesztés során. Ez az online eszköz akkor hasznos, ha gyorsan szeretnél egy kódrészletet formázni build pipeline és szerkesztő konfiguráció nélkül.",
          "A jól formázott kód nemcsak olvashatóbb, hanem a hibakeresést is megkönnyíti. A konzisztens behúzás azonnal láthatóvá teszi a blokk-struktúrát, a feltételes elágazásokat és a ciklusokat.",
        ],
      },
      tips: [
        { icon: "📐", tip: "A 2 szóközös behúzás a legelterjedtebb JavaScript konvenció (Google, Airbnb style guide)." },
        { icon: "💡", tip: "Minifikált production kódnál a formázás az első lépés a reverse engineering-hez." },
        { icon: "🔧", tip: "Hosszabb távú projektekhez érdemes Prettier-t beállítani automatikus formázáshoz." },
      ],
    },
  },

  // ═══ 14. JAVASCRIPT MINIFIKÁLÁS ══════════════════════════════════════════
  "js-minimalas": {
    introText:
      "A JavaScript minifikáló eltávolítja a felesleges whitespace-t, sortöréseket és kommenteket a JavaScript kódból. A production build egyik legfontosabb lépése, amely jelentősen csökkenti a fájlméretet és gyorsítja az oldal betöltését.",
    guide: [
      "1. Illeszd be a JavaScript kódot a beviteli mezőbe.",
      "2. Kattints a «Minifikálás» gombra.",
      "3. Ellenőrizd a méretcsökkentés százalékát.",
      "4. Másold ki a minifikált kódot vagy töltsd le .js fájlként.",
    ],
    faq: [
      { q: "Mire jó ez az eszköz?", a: "JavaScript kód méretének csökkentésére szolgál: eltávolítja a kommenteket, whitespace-t és sortöréseket, kisebb fájlméretet biztosítva production környezethez." },
      { q: "Biztonságos az adataim szempontjából?", a: "Igen. Minden feldolgozás a böngésződben történik, semmilyen adat nem kerül szerverre." },
      { q: "Végez változó-átnevezést (mangling)?", a: "Ez az eszköz a whitespace és komment eltávolítást végzi. Változó-átnevezéshez (mangling) és dead code elimination-höz dedikált build eszközre (Terser, esbuild) van szükség." },
      { q: "Megváltoztatja a kód működését?", a: "Nem. A whitespace és kommentek eltávolítása nem befolyásolja a JavaScript futási viselkedését – a kód pontosan ugyanúgy működik." },
      { q: "Mobilon is használhatom?", a: "Igen, az eszköz teljesen reszponzív és bármilyen modern böngészőben működik." },
      { q: "Mennyivel csökken a fájlméret?", a: "A whitespace és komment eltávolítás jellemzően 20–50%-os méretcsökkentést eredményez. Változó-átnevezéssel (mangling) ez akár 60–70% is lehet." },
    ],
    content: {
      howToSteps: [
        { title: "1. JavaScript beillesztése", description: "Illeszd be a JavaScript kódot a beviteli mezőbe, vagy húzd be a .js fájlt." },
        { title: "2. Minifikálás", description: "Kattints a «Minifikálás» gombra a whitespace és kommentek eltávolításához." },
        { title: "3. Méret ellenőrzése", description: "Olvasd le az eredeti és minifikált méret közötti különbséget százalékban." },
        { title: "4. Eredmény exportálása", description: "Másold ki a minifikált kódot vagy töltsd le .js fájlként." },
      ],
      useCases: [
        { icon: "🚀", title: "Production build", description: "JavaScript fájlok méretének minimalizálása az éles weboldalon." },
        { icon: "📈", title: "Teljesítményoptimalizálás", description: "Kisebb JS fájl = gyorsabb betöltés, jobb Core Web Vitals és felhasználói élmény." },
        { icon: "📱", title: "Mobil optimalizálás", description: "Mobil hálózaton minden kilobyte számít – a minifikált JS észrevehetően gyorsabb." },
        { icon: "💰", title: "CDN költségcsökkentés", description: "Kisebb fájlméret kevesebb CDN forgalmat jelent, ami költségmegtakarítást eredményez." },
      ],
      aboutSection: {
        title: "A JavaScript minifikálásról",
        paragraphs: [
          "A JavaScript minifikálás a forráskód méretének csökkentését jelenti a felesleges karakterek eltávolításával. Ide tartoznak a whitespace karakterek, sortörések, behúzások és kommentek, amelyek a fejlesztést segítik, de a futáshoz nem szükségesek.",
          "A minifikálásnak több szintje van: az alap szint (whitespace/komment eltávolítás) mellett a fejlettebb eszközök változó-átnevezést (mangling), dead code elimination-t és scope hoisting-ot is végeznek. Ez az online eszköz az alap szintű minifikálást biztosítja.",
          "A JavaScript minifikálás a modern web fejlesztés egyik legfontosabb teljesítményoptimalizálási lépése. A Webpack, Vite és egyéb build eszközök automatikusan elvégzik production build-nél, de ad-hoc minifikáláshoz ez az online eszköz kiváló választás.",
        ],
      },
      tips: [
        { icon: "🗜️", tip: "A minifikálás + gzip/brotli tömörítés kombinálásával akár 85–95%-os méretcsökkentés érhető el." },
        { icon: "📋", tip: "Mindig tartsd meg az eredeti, formázott kódot – a minifikált verzió nehezen olvasható és szerkeszthető." },
        { icon: "🔧", tip: "Komolyabb projektekhez használj Terser-t vagy esbuild-et, amelyek változó-átnevezést is végeznek." },
      ],
    },
  },

  // ═══ 15. BASE64 KÓDOLÓ/DEKÓDOLÓ ══════════════════════════════════════════
  "base64-kodolo-dekodolo": {
    introText:
      "A Base64 kódoló és dekódoló eszköz lehetővé teszi szövegek Base64 formátumba kódolását és visszaalakítását. Teljes UTF-8 támogatással, valós időben működik. Fejlesztők számára hasznos API tokenek, email mellékletek és adat-URI-k kezeléséhez.",
    guide: [
      "1. Válaszd ki a műveletet: kódolás (encode) vagy dekódolás (decode).",
      "2. Illeszd be a szöveget vagy a Base64 stringet a beviteli mezőbe.",
      "3. Az eredmény valós időben megjelenik a kimeneti mezőben.",
      "4. Másold ki az eredményt a vágólapra egyetlen kattintással.",
    ],
    faq: [
      { q: "Mire jó ez az eszköz?", a: "Szövegek Base64 formátumba kódolására és Base64 stringek visszaalakítására (dekódolás) szolgál – hasznos API-k, email-ek és adatátvitel esetén." },
      { q: "Biztonságos az adataim szempontjából?", a: "Igen. Minden feldolgozás a böngésződben történik, semmilyen adat nem kerül szerverre." },
      { q: "A Base64 titkosítás?", a: "Nem! A Base64 kódolás, nem titkosítás. Bárki visszaalakíthatja az eredeti szöveget. Érzékeny adatok védelmére titkosítást (pl. AES) használj." },
      { q: "Támogatja a magyar ékezetes karaktereket?", a: "Igen, az eszköz teljes UTF-8 támogatással rendelkezik, így az ékezetes magyar karakterek (á, é, í, ó, ö, ő, ú, ü, ű) is helyesen kódolódnak és dekódolódnak." },
      { q: "Mobilon is használhatom?", a: "Igen, az eszköz teljesen reszponzív és bármilyen modern böngészőben működik." },
      { q: "Miért növekszik a méret Base64 kódolás után?", a: "A Base64 kódolás az eredeti adatot kb. 33%-kal növeli, mert 3 byte bemenetet 4 ASCII karakterre képez le. Ez az ára a bináris adatok szöveges formában való ábrázolásának." },
    ],
    content: {
      howToSteps: [
        { title: "1. Művelet kiválasztása", description: "Válaszd ki, hogy kódolni (encode) vagy dekódolni (decode) szeretnél." },
        { title: "2. Szöveg beillesztése", description: "Illeszd be az eredeti szöveget (kódoláshoz) vagy a Base64 stringet (dekódoláshoz)." },
        { title: "3. Valós idejű eredmény", description: "Az eredmény azonnal megjelenik gépelés közben a kimeneti mezőben." },
        { title: "4. Másolás", description: "Másold ki az eredményt a vágólapra egyetlen kattintással." },
      ],
      useCases: [
        { icon: "🔑", title: "API autentikáció", description: "HTTP Basic Authentication header-ek Base64 kódolása (username:password formátumban)." },
        { icon: "🖼️", title: "Data URI", description: "Kis méretű képek Base64 data URI-ként való beágyazása HTML-be vagy CSS-be." },
        { icon: "📧", title: "Email mellékletek", description: "Email mellékletekben a MIME Base64 kódolás a szabványos átviteli formátum." },
        { icon: "🔧", title: "JWT tokenek", description: "JWT (JSON Web Token) payload-jának dekódolása, amely Base64url formátumban van kódolva." },
      ],
      formatComparison: {
        title: "Base64 vs URL encoding vs HTML entity összehasonlítás",
        columns: ["Tulajdonság", "Base64", "URL encoding", "HTML entity"],
        rows: [
          { feature: "Cél", values: ["Bináris → szöveg", "URL-safe karakterek", "HTML-safe karakterek"] },
          { feature: "Méretváltozás", values: ["+33%", "Változó (+)", "Változó (+)"] },
          { feature: "Használat", values: ["Email, JWT, data URI", "URL paraméterek", "HTML tartalom"] },
          { feature: "Visszaalakítható", values: ["Igen", "Igen", "Igen"] },
          { feature: "Titkosítás", values: ["Nem", "Nem", "Nem"] },
        ],
      },
      aboutSection: {
        title: "A Base64 kódolásról",
        paragraphs: [
          "A Base64 egy bináris-szöveg kódolási séma, amely bináris adatokat 64 ASCII karakter segítségével ábrázol szöveges formában. A használt karakterek: A–Z, a–z, 0–9, + és /, kiegészítve a = padding karakterrel.",
          "A Base64 kódolás eredeti célja az volt, hogy bináris adatokat (képek, fájlok) szöveges protokollokon (email, HTTP) lehessen továbbítani. Ma is széles körben használatos: JWT tokenek, HTTP Basic Auth, data URI-k és email MIME mellékletek mind Base64-et használnak.",
          "Fontos megérteni, hogy a Base64 nem titkosítás és nem tömörítés: az eredeti adatot bárki visszaalakíthatja, és a kimenet kb. 33%-kal nagyobb az eredetinél. Érzékeny adatok védelméhez mindig titkosítást használj.",
        ],
      },
      tips: [
        { icon: "⚠️", tip: "A Base64 NEM titkosítás – ne használd jelszavak vagy érzékeny adatok védelmére." },
        { icon: "📏", tip: "A Base64 kimenet kb. 33%-kal nagyobb az eredetinél – ez normális és elvárt viselkedés." },
        { icon: "🔗", tip: "URL-ben használt Base64-nél a Base64url variánst alkalmazd: + helyett - és / helyett _ karaktert." },
        { icon: "💡", tip: "Kis méretű képeknél (< 1-2 KB) a Base64 data URI hatékonyabb lehet, mint külön HTTP kérés." },
      ],
    },
  },

  // ═══ 16. URL KÓDOLÓ/DEKÓDOLÓ ═════════════════════════════════════════════
  "url-kodolo-dekodolo": {
    introText:
      "Az URL kódoló és dekódoló eszköz lehetővé teszi szövegek URL-safe formátumba kódolását (percent encoding) és visszaalakítását. Az encodeURIComponent és encodeURI módok között választhatsz. Ideális URL paraméterek, query stringek és API hívások kezeléséhez.",
    guide: [
      "1. Válaszd ki a műveletet: kódolás (encode) vagy dekódolás (decode).",
      "2. Válaszd ki a módot: encodeURIComponent (paraméter) vagy encodeURI (teljes URL).",
      "3. Illeszd be a szöveget a beviteli mezőbe.",
      "4. Az eredmény valós időben megjelenik – másold ki egyetlen kattintással.",
    ],
    faq: [
      { q: "Mire jó ez az eszköz?", a: "URL-ekben használt speciális karakterek percent encoding (%XX) formátumba kódolására és visszaalakítására szolgál – elengedhetetlen az URL paraméterek helyes kezeléséhez." },
      { q: "Biztonságos az adataim szempontjából?", a: "Igen. Minden feldolgozás a böngésződben történik, semmilyen adat nem kerül szerverre." },
      { q: "Mi a különbség az encodeURI és encodeURIComponent között?", a: "Az encodeURI a teljes URL-t kódolja, de meghagyja az URL struktúra-karaktereit (://?#). Az encodeURIComponent mindent kódol, és URL paraméterek értékéhez használandó." },
      { q: "Kezeli a magyar ékezetes karaktereket?", a: "Igen, az ékezetes karakterek (á, é, ö, ü stb.) UTF-8 byte-szekvenciaként kódolódnak percent encoding formában, pl. á → %C3%A1." },
      { q: "Mobilon is használhatom?", a: "Igen, az eszköz teljesen reszponzív és bármilyen modern böngészőben működik." },
      { q: "Miért szükséges az URL kódolás?", a: "Az URL szabvány csak bizonyos ASCII karaktereket engedélyez. A speciális karakterek (&, =, ?, szóköz, ékezetek) kódolás nélkül hibás URL-t eredményeznek vagy félreértelmeződnek." },
    ],
    content: {
      howToSteps: [
        { title: "1. Művelet és mód kiválasztása", description: "Válassz kódolás/dekódolás műveletet és encodeURI/encodeURIComponent módot." },
        { title: "2. Szöveg beillesztése", description: "Illeszd be a kódolandó szöveget vagy a dekódolandó URL-encoded stringet." },
        { title: "3. Valós idejű eredmény", description: "Az eredmény azonnal megjelenik gépelés közben." },
        { title: "4. Másolás", description: "Másold ki az eredményt egyetlen kattintással." },
      ],
      useCases: [
        { icon: "🔗", title: "URL paraméterek", description: "Query string paraméterek helyes kódolása, hogy a speciális karakterek ne törjék meg az URL struktúrát." },
        { icon: "🔌", title: "API hívások", description: "REST API endpoint-ok URL paramétereinek kódolása a helyes adatátvitel biztosításához." },
        { icon: "🔍", title: "Keresőkifejezések", description: "Keresési lekérdezések URL-kódolása a kereső URL-ekben történő helyes átadáshoz." },
        { icon: "🐛", title: "Hibakeresés", description: "URL-encoded stringek dekódolása az eredeti szöveg visszaolvasásához hibakeresés során." },
      ],
      aboutSection: {
        title: "Az URL kódolásról (percent encoding)",
        paragraphs: [
          "Az URL kódolás (percent encoding) az RFC 3986 szabvány szerint a nem ASCII és a speciális karaktereket %XX formátumban ábrázolja, ahol XX a karakter UTF-8 byte-jainak hexadecimális értéke. Például a szóköz %20, az & jel %26.",
          "A JavaScript két beépített függvényt kínál URL kódoláshoz: az encodeURI() a teljes URL kódolására szolgál (meghagyja a ://?#&= karaktereket), míg az encodeURIComponent() egyetlen URL paraméter értékének kódolásához ideális (mindent kódol).",
          "Az URL kódolás elengedhetetlen a web helyes működéséhez: nélküle a speciális karakterek (pl. & vagy = egy paraméter értékében) félreértelmeződnének, és megzavarnák az URL struktúráját.",
        ],
      },
      tips: [
        { icon: "🔑", tip: "URL paraméter értékéhez mindig encodeURIComponent-et használj, nem encodeURI-t." },
        { icon: "💡", tip: "A szóköz URL-ben %20 (encodeURIComponent) vagy + (form data) – ismerd a különbséget." },
        { icon: "⚠️", tip: "Soha ne kódolj duplán: ha a szöveg már kódolt, a dekódolás előtt ne kódold újra." },
        { icon: "🌐", tip: "A modern böngészők az ékezetes karaktereket automatikusan kódolják az URL-ben, de API hívásoknál érdemes explicit kódolni." },
      ],
    },
  },

  // ═══ 17. HTML ENTITY KÓDOLÓ/DEKÓDOLÓ ═════════════════════════════════════
  "html-entity-kodolo-dekodolo": {
    introText:
      "A HTML entity kódoló és dekódoló eszköz lehetővé teszi a speciális HTML karakterek (&, <, >, \", ') entity formába kódolását és visszaalakítását. Elengedhetetlen az XSS támadások megelőzéséhez és a HTML tartalom helyes megjelenítéséhez.",
    guide: [
      "1. Válaszd ki a műveletet: kódolás (escape) vagy dekódolás (unescape).",
      "2. Illeszd be a szöveget a beviteli mezőbe.",
      "3. Az eredmény valós időben megjelenik a kimeneti mezőben.",
      "4. Másold ki az eredményt egyetlen kattintással.",
    ],
    faq: [
      { q: "Mire jó ez az eszköz?", a: "HTML speciális karakterek (< > & \" ') entity formába kódolására és visszaalakítására szolgál – elengedhetetlen a biztonságos HTML tartalom megjelenítéséhez." },
      { q: "Biztonságos az adataim szempontjából?", a: "Igen. Minden feldolgozás a böngésződben történik, semmilyen adat nem kerül szerverre." },
      { q: "Milyen karaktereket kódol?", a: "Az alapvető HTML entity-k: & → &amp;, < → &lt;, > → &gt;, \" → &quot;, ' → &#39;. Opcionálisan minden nem-ASCII karakter is kódolható numerikus entity-ként." },
      { q: "Miért fontos a HTML entity kódolás?", a: "Az XSS (Cross-Site Scripting) támadások megelőzéséhez: ha a felhasználói inputot entity-ként kódolod, a beillesztett HTML/JS kód nem fut le, hanem szövegként jelenik meg." },
      { q: "Mobilon is használhatom?", a: "Igen, az eszköz teljesen reszponzív és bármilyen modern böngészőben működik." },
      { q: "Mi a különbség a named és a numeric entity között?", a: "A named entity olvashatóbb (&amp;, &lt;), a numeric entity univerzálisabb (&#38;, &#60;). Mindkettő ugyanazt eredményezi a böngészőben." },
    ],
    content: {
      howToSteps: [
        { title: "1. Művelet kiválasztása", description: "Válaszd ki a kódolás (escape) vagy dekódolás (unescape) műveletet." },
        { title: "2. Szöveg beillesztése", description: "Illeszd be a kódolandó HTML szöveget vagy az entity-ket tartalmazó stringet." },
        { title: "3. Valós idejű eredmény", description: "Az eredmény azonnal megjelenik gépelés közben." },
        { title: "4. Másolás", description: "Másold ki az eredményt a vágólapra egyetlen kattintással." },
      ],
      useCases: [
        { icon: "🛡️", title: "XSS védelem", description: "Felhasználói input HTML entity kódolása a Cross-Site Scripting támadások megelőzésére." },
        { icon: "📝", title: "Kódpéldák HTML-ben", description: "HTML kódrészletek megjelenítése weboldalon: a < és > karakterek entity-ként jelennek meg, nem HTML tag-ként." },
        { icon: "📧", title: "Email cím rejtés", description: "Email címek HTML entity formában való elrejtése a spam botoktól a weboldalon." },
        { icon: "🔧", title: "CMS tartalom", description: "WordPress, Joomla és egyéb CMS rendszerekben a speciális karakterek helyes megjelenítése entity kódolással." },
      ],
      formatComparison: {
        title: "Base64 vs URL encoding vs HTML entity összehasonlítás",
        columns: ["Tulajdonság", "HTML entity", "URL encoding", "Base64"],
        rows: [
          { feature: "Cél", values: ["HTML-safe karakterek", "URL-safe karakterek", "Bináris → szöveg"] },
          { feature: "Formátum", values: ["&amp; vagy &#38;", "%26", "Base64 string"] },
          { feature: "Használat", values: ["HTML tartalom", "URL paraméterek", "Email, JWT, data URI"] },
          { feature: "Biztonság", values: ["XSS védelem", "URL injection védelem", "Nem biztonsági célú"] },
          { feature: "Visszaalakítható", values: ["Igen", "Igen", "Igen"] },
        ],
      },
      aboutSection: {
        title: "A HTML entity kódolásról",
        paragraphs: [
          "A HTML entity kódolás a HTML-ben speciális jelentéssel bíró karakterek helyettesítését jelenti entity hivatkozásokkal. Az öt alapvető karakter: & (ampersand), < (kisebb), > (nagyobb), \" (idézőjel) és ' (aposztróf) – ezek entity nélkül megzavarnák a HTML parser-t.",
          "Két fajta entity létezik: named entity (pl. &amp;, &lt;, &copy;) és numeric entity (pl. &#38;, &#60;, &#169;). A named entity-k olvashatóbbak, de nem minden karakternek van named változata – a numeric entity univerzálisabb.",
          "A HTML entity kódolás az egyik legfontosabb biztonsági gyakorlat a web fejlesztésben. A felhasználói input entity kódolása nélkül az XSS (Cross-Site Scripting) támadások lehetővé tennék rosszindulatú JavaScript kód futtatását a weboldalon.",
        ],
      },
      tips: [
        { icon: "🛡️", tip: "Mindig kódold a felhasználói inputot HTML entity-ként megjelenítés előtt – ez az XSS védelem alapja." },
        { icon: "📝", tip: "HTML kódpéldáknál a < és > karaktereket mindig &lt; és &gt; formában írd." },
        { icon: "💡", tip: "A named entity-k olvashatóbbak (&amp;), de a numeric entity-k (&#38;) univerzálisabban támogatottak." },
        { icon: "⚠️", tip: "Ne keverd össze a HTML entity kódolást a URL kódolással – két különböző célra szolgálnak." },
      ],
    },
  },
};
