import type { ContentMap } from "./types.ts";

export const FEJLESZTO_CONTENT: ContentMap = {
  // ═══ SZÓ- ÉS KARAKTERSZÁMLÁLÓ (HU+RO bilingual) ═══════════════════════════
  "szoszamlalo": {
    introText:
      "A szó- és karakterszámláló valós időben megmutatja, hány szóból, karakterből, mondatból és bekezdésből áll a szöveged, miközben gépelsz vagy beillesztesz. Becsült olvasási és beszédidőt is számol, és jelzi, hogyan fér bele a tartalom a gyakori karakterkorlátokba (SEO title, meta description, X/Twitter). Diákoknak, szövegíróknak, SEO-szakembereknek és közösségimédia-kezelőknek egyaránt hasznos – telepítés és regisztráció nélkül.",
    guide: [
      "1. Illeszd be vagy gépeld a szöveget a beviteli mezőbe – a számlálás azonnal, gépelés közben frissül.",
      "2. Olvasd le a fő mérőszámokat: szavak, karakterek (szóközzel és szóköz nélkül), mondatok, bekezdések, sorok.",
      "3. Ellenőrizd a karakterkorlát-panelt: a sávok mutatják, belefér-e a szöveg a 60 / 160 / 280 karakteres limitbe.",
      "4. Másold ki a statisztikát egy kattintással, vagy töröld a mezőt és kezdj újat.",
    ],
    faq: [
      { q: "Mi a különbség a szóközzel és szóköz nélküli karakterszám között?", a: "A szóközzel számolt érték minden karaktert tartalmaz, beleértve a szóközöket, tabulátorokat és sortöréseket – ezt használják a Twitter/X és az SMS limiteknél. A szóköz nélküli érték csak a látható karaktereket számolja, ami egyes tipográfiai és nyomdai feladatoknál hasznos." },
      { q: "Hogyan számolja az olvasási időt?", a: "Az olvasási idő a szavak számán alapul, átlagosan 200 szó/perces olvasási sebességgel – ez a felnőtt átlagolvasó tempója. A beszédidő 130 szó/perccel számol, ami a kényelmes, érthető előadói tempónak felel meg (prezentáció, videó-szkript)." },
      { q: "Pontosan számolja a magyar ékezetes karaktereket?", a: "Igen. Az ékezetes betűk (á, é, í, ó, ö, ő, ú, ü, ű) egyetlen karakternek számítanak, ahogy az emoji is egyetlen karakter. A számláló Unicode-helyesen kezeli őket, így az eredmény megegyezik azzal, amit a Word vagy a közösségi platformok mutatnak." },
      { q: "Mennyi az ideális SEO title és meta description hossz?", a: "A Google a title-ből jellemzően kb. 60 karaktert, a meta description-ből kb. 155–160 karaktert jelenít meg, ezen túl a szöveg csonkolódik a találati listában. A panel ezeket a határokat jelzi, így nem kell külön számolnod." },
      { q: "Bekerül a szövegem bármilyen szerverre?", a: "Nem. A teljes feldolgozás a böngésződben fut, JavaScripttel – a beírt szöveg soha nem hagyja el a gépedet. Az oldal újratöltése után semmi nem marad meg, így bizalmas vagy publikálatlan tartalomhoz is nyugodtan használható." },
      { q: "Mire jó a leggyakoribb szavak lista?", a: "Megmutatja, mely szavak ismétlődnek a leggyakrabban a szövegben (a kötőszavakat és névelőket kiszűrve). Hasznos a kulcsszó-sűrűség ellenőrzéséhez SEO-szövegeknél, és a felesleges szóismétlések kiszúrásához íráskor." },
    ],
    content: {
      howToSteps: [
        { title: "1. Szöveg beillesztése", description: "Illeszd be a vágólapról vagy gépeld közvetlenül a szöveget a mezőbe. A számlálás élőben követi a gépelést." },
        { title: "2. Mérőszámok leolvasása", description: "A kiemelt kártyák a szavak és karakterek számát mutatják, alattuk a mondatok, bekezdések és sorok." },
        { title: "3. Karakterkorlátok ellenőrzése", description: "A limit-panel sávjai jelzik, hogy a szöveg belefér-e a SEO title (60), meta description (160) és X (280) határba." },
        { title: "4. Statisztika másolása", description: "Egy kattintással a vágólapra másolod az összes mérőszámot, vagy törlöd a mezőt egy új szöveghez." },
      ],
      useCases: [
        { icon: "🔍", title: "SEO meta szövegek", description: "Title és meta description írásakor azonnal látod, belefér-e a szöveg a Google által megjelenített karakterhatárba." },
        { icon: "📱", title: "Közösségi média", description: "X/Twitter poszt, bio vagy hirdetésszöveg írásánál a 280 karakteres limit valós idejű követése." },
        { icon: "🎓", title: "Esszé és dolgozat", description: "Diákoknak és hallgatóknak, amikor a feladat pontos szó- vagy karakterszámot ír elő (pl. min. 500 szó)." },
        { icon: "🎙️", title: "Beszéd és videó-szkript", description: "A becsült beszédidő segít belőni egy prezentáció vagy videó hosszát a megadott időkeretbe." },
      ],
      formatComparison: {
        title: "Gyakori karakter- és szólimitek",
        columns: ["Hely / mező", "Limit", "Megjegyzés"],
        rows: [
          { feature: "SEO title (Google)", values: ["~60 karakter", "Efölött csonkolódik a találatban"] },
          { feature: "Meta description", values: ["~155–160 karakter", "Az ideális leírás hossza"] },
          { feature: "X / Twitter poszt", values: ["280 karakter", "Linkek rövidítve számítanak"] },
          { feature: "SMS (1 üzenet)", values: ["160 karakter", "Efölött több SMS-re bomlik"] },
          { feature: "Meta / Instagram caption", values: ["~2200 karakter", "De az első ~125 látszik csonkolás nélkül"] },
        ],
      },
      aboutSection: {
        title: "Miért fontos a szó- és karakterszám?",
        paragraphs: [
          "A szavak és karakterek pontos száma sok feladatnál nem esztétikai kérdés, hanem konkrét követelmény. A keresőoptimalizálásban a title és a meta description hossza eldönti, hogy a teljes üzenet megjelenik-e a találati listában, vagy csonkolva. A közösségi platformokon és az SMS-ben kemény karakterlimitek vannak, az iskolai és egyetemi feladatok pedig gyakran írnak elő minimális vagy maximális szószámot.",
          "A szószámlálás alapja egyszerű: a szöveget összefüggő, nem-szóköz karakterekből álló csoportokra bontjuk, és ezek számát adjuk vissza – ez megegyezik a Word, a Google Dokumentumok és a legtöbb szövegszerkesztő logikájával. A karakterszámnál meg kell különböztetni a szóközökkel és szóközök nélkül számolt értéket: a legtöbb online limit (Twitter, SMS) a szóközöket is beleszámolja.",
          "Az olvasási és beszédidő becslése a szavak számából indul ki. Az átlagos néma olvasási sebesség kb. 200–250 szó perc; a kényelmes, jól érthető előadói tempó ennél lassabb, kb. 130 szó perc. Ezek a becslések segítenek belőni egy cikk olvasási idejét vagy egy prezentáció hosszát, mielőtt megírnád a teljes szöveget.",
        ],
      },
      tips: [
        { icon: "💡", tip: "A SEO title-t tartsd 60 karakter alatt, a meta description-t 155–160 között – így a teljes szöveg megjelenik a Google találatában." },
        { icon: "⌨️", tip: "A számláló élőben frissül gépelés közben, így nem kell külön gombot nyomnod az eredményhez." },
        { icon: "🔒", tip: "A szöveg a böngésződben marad – nyugodtan beillesztheted bizalmas vagy még publikálatlan tartalmat is." },
        { icon: "📊", tip: "A leggyakoribb szavak listájával gyorsan kiszúrod a felesleges szóismétléseket egy szövegben." },
      ],
    },
  },

  // ═══ SZÁMRENDSZER-VÁLTÓ (HU+RO bilingual) ═════════════════════════════════
  "szamrendszer-valto": {
    introText:
      "A számrendszer-váltó élőben alakít át egész számokat bináris (2-es), oktális (8-as), decimális (10-es) és hexadecimális (16-os) számrendszer között – bármelyik mezőt írod, a többi azonnal frissül. Tetszőleges alap (2–36) is választható, a konverzió pedig BigInt-tel történik, így a 64 biten túli értékek (nagy memóriacímek, bitmaszkok) is pontosak. Programozóknak, hallgatóknak és mindenkinek, aki gyorsan szeretne számrendszert váltani – telepítés nélkül, a böngészőben.",
    guide: [
      "1. Írd be a számot bármelyik mezőbe (bináris, oktális, decimális vagy hexadecimális).",
      "2. A többi számrendszer értéke azonnal, automatikusan frissül.",
      "3. Egyéni alaphoz (2–36) válaszd ki az alapot a legördülő listából.",
      "4. Másold ki bármelyik eredményt a sor melletti gombbal.",
    ],
    faq: [
      { q: "Milyen számrendszerek között vált?", a: "A négy leggyakoribb között azonnal: bináris (2), oktális (8), decimális (10) és hexadecimális (16). Ezen felül bármilyen egyéni alap választható 2 és 36 között." },
      { q: "Mekkora számokat kezel?", a: "Tetszőlegesen nagyokat. A konverzió BigInt aritmetikával történik, így a 32 vagy 64 bites határon túli értékek (nagy hexadecimális címek, hosszú bitmaszkok) is kerekítési hiba nélkül pontosak." },
      { q: "Mit jelent a hexadecimális A–F?", a: "A 16-os számrendszerben 16 számjegy van: 0–9, majd A=10, B=11, C=12, D=13, E=14, F=15. Így egy hexadecimális számjegy pontosan 4 bitet (egy „nibble”-t) kódol." },
      { q: "Kezeli az előtagokat (0x, 0b)?", a: "Igen, a beírt 0x (hex), 0b (bináris) és 0o (oktális) előtagokat felismeri és figyelmen kívül hagyja, így nyugodtan beillesztheted a forráskódból másolt értékeket." },
      { q: "Mire való a bit-hossz kijelzés?", a: "Megmutatja, hány bit szükséges a szám ábrázolásához (a legmagasabb helyiértékű 1-es bittől számolva). Hasznos adattípus-választáshoz: belefér-e az érték 8, 16, 32 vagy 64 bitbe." },
      { q: "Szerverre kerül a beírt szám?", a: "Nem. A teljes átváltás a böngésződben, JavaScripttel történik – semmilyen adat nem hagyja el a gépedet." },
    ],
    content: {
      howToSteps: [
        { title: "1. Szám beírása", description: "Írd be az értéket bármelyik számrendszer mezőjébe – nem kell előre eldöntened a kiindulási alapot." },
        { title: "2. Élő átváltás", description: "A többi mező (bináris, oktális, decimális, hexadecimális) azonnal frissül a beírt értékre." },
        { title: "3. Egyéni alap", description: "Tetszőleges 2 és 36 közötti alaphoz válaszd ki a kívánt számot az egyéni alap legördülőből." },
        { title: "4. Eredmény másolása", description: "A sor melletti gombbal bármelyik számrendszer értékét a vágólapra másolod." },
      ],
      useCases: [
        { icon: "💻", title: "Programozás", description: "Hexadecimális memóriacímek, színkódok (#RRGGBB) vagy bitmaszkok gyors értelmezése decimálisban és binárisban." },
        { icon: "🎓", title: "Tanulás", description: "Informatika órán a számrendszerek és az átváltás megértéséhez – látod egyszerre mind a négy alakot." },
        { icon: "🔧", title: "Hálózat és hardver", description: "IP-alhálózati maszkok, regiszterértékek és flag-ek átváltása bináris és hexadecimális között." },
        { icon: "🔢", title: "Bit-műveletek", description: "A bináris alak és a bit-hossz segít a bitenkénti műveletek (AND, OR, shift) tervezésében és ellenőrzésében." },
      ],
      formatComparison: {
        title: "A négy leggyakoribb számrendszer",
        columns: ["Számrendszer", "Alap", "Számjegyek", "Példa (255)"],
        rows: [
          { feature: "Bináris", values: ["2", "0–1", "11111111"] },
          { feature: "Oktális", values: ["8", "0–7", "377"] },
          { feature: "Decimális", values: ["10", "0–9", "255"] },
          { feature: "Hexadecimális", values: ["16", "0–9, A–F", "FF"] },
        ],
      },
      aboutSection: {
        title: "Számrendszerek dióhéjban",
        paragraphs: [
          "A számrendszer azt határozza meg, hány különböző számjegyet használunk, és mekkora a helyiértékek alapja. A hétköznapi decimális (10-es) rendszerben tíz számjegy van (0–9), a számítógépek viszont a kettes (bináris) rendszert használják, mert az áramköri kapcsolók két állapota (0 és 1) közvetlenül megfeleltethető a biteknek.",
          "A hexadecimális (16-os) rendszer a programozás kényelmi nyelve: egy hexadecimális számjegy pontosan négy bitet kódol, így egy bájt (8 bit) mindig két hexadecimális jeggyel írható le. Ezért látunk hexadecimálist a memóriacímeknél, a színkódoknál és a hibakódoknál. Az oktális (8-as) rendszer ma főleg a Unix fájljogosultságoknál (pl. 755) él tovább.",
          "Az átváltás mindig ugyanazt a számot fejezi ki más jelöléssel: a 255 érték decimálisban „255”, binárisban „11111111”, hexadecimálisban „FF” – de mindhárom ugyanaz a mennyiség. Ez az eszköz a BigInt aritmetikának köszönhetően a nagyon nagy számoknál is megőrzi a pontosságot, amit a hagyományos lebegőpontos átváltás már nem tudna.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Egy hexadecimális számjegy = 4 bit, két hexadecimális jegy = 1 bájt. Ez a leggyorsabb mód a hex és a bináris fejben tartására." },
        { icon: "🎨", tip: "A #FF8800-szerű színkódok valójában három hexadecimális bájt (piros, zöld, kék) – itt decimálisra bonthatod őket." },
        { icon: "🔒", tip: "A beírt szám a böngésződben marad, semmi nem kerül szerverre – bizalmas értékekhez is használható." },
        { icon: "📏", tip: "Nézd a bit-hosszt: ha 8-nál több, az érték már nem fér el egy bájtban; 32 felett 64 bites típus kell." },
      ],
    },
  },

  // ═══ UNIX TIMESTAMP ÁTVÁLTÓ (HU+RO bilingual) ═════════════════════════════
  "unix-timestamp": {
    introText:
      "A Unix timestamp átváltó az 1970 óta eltelt másodpercekben (vagy ezredmásodpercekben) mért időbélyegeket alakítja olvasható dátummá és vissza. Megmutatja a helyi időt, a UTC-t, az ISO 8601 alakot, a hét napját és a relatív időt is („3 napja”, „2 óra múlva”). Felül élőben ketyeg az aktuális timestamp. Fejlesztőknek, akik adatbázis-mezőkkel, API-válaszokkal vagy naplófájlokkal dolgoznak – telepítés nélkül, a böngészőben.",
    guide: [
      "1. Timestamp → dátum: írd be az időbélyeget, és válaszd ki, hogy másodperc vagy ezredmásodperc.",
      "2. A „Most” gomb beírja az aktuális időbélyeget – az eredmény azonnal megjelenik (helyi, UTC, ISO, relatív).",
      "3. Dátum → timestamp: válaszd ki a dátumot és időt a mezőben, és leolvasod a hozzá tartozó timestampet.",
      "4. Bármelyik eredményt egy kattintással a vágólapra másolod.",
    ],
    faq: [
      { q: "Mi az a Unix timestamp?", a: "A Unix időbélyeg az 1970. január 1. 00:00:00 UTC (az „epoch”) óta eltelt másodpercek száma. Egyetlen egész számmal, időzónától függetlenül azonosít egy időpontot, ezért használják adatbázisok, API-k, naplók és programnyelvek világszerte." },
      { q: "Mi a különbség a másodperc és az ezredmásodperc között?", a: "A klasszikus Unix timestamp másodpercben mér, és jelenleg 10 számjegyű. A JavaScript (Date.now()) és sok modern rendszer viszont ezredmásodpercet használ, ami 13 számjegyű. Az eszközben átkapcsolható, melyiket adtad meg." },
      { q: "Milyen időzónában jeleníti meg az eredményt?", a: "Egyszerre mutatja a böngésződ helyi időzónája szerinti időt és a UTC-t. Mivel a timestamp önmagában időzóna-független, így rögtön látod mindkét nézetet, félreértés nélkül." },
      { q: "Mit jelent az ISO 8601 alak?", a: "Az ISO 8601 a dátumok szabványos, géppel és emberrel is olvasható szöveges formátuma (pl. 2025-06-15T14:26:40.000Z). A végén a Z jelzi, hogy az érték UTC-ben van. Ezt a formátumot várja a legtöbb API és adatcsere." },
      { q: "Mire jó a relatív idő?", a: "A relatív idő szavakkal fejezi ki a távolságot a mostani időponttól: „3 napja”, „2 óra múlva”. Hasznos naplóbejegyzések vagy lejárati dátumok gyors értelmezéséhez." },
      { q: "Szerverre kerül a megadott időpont?", a: "Nem. Minden átváltás a böngésződben, JavaScripttel történik – sem a timestamp, sem a dátum nem hagyja el a gépedet." },
    ],
    content: {
      howToSteps: [
        { title: "1. Irány kiválasztása", description: "Timestamp → dátum, vagy dátum → timestamp – a két szekció külön, egymástól függetlenül használható." },
        { title: "2. Érték megadása", description: "Timestampnél írd be a számot és válaszd a másodperc/ezredmásodperc egységet; dátumnál használd a dátum-mezőt." },
        { title: "3. Eredmény leolvasása", description: "Megjelenik a helyi idő, a UTC, az ISO 8601, a hét napja és a relatív idő – mind egyszerre, élőben." },
        { title: "4. Másolás", description: "Bármelyik kimenetet a mellette lévő gombbal a vágólapra másolod." },
      ],
      useCases: [
        { icon: "🗄️", title: "Adatbázis-mezők", description: "A created_at / updated_at és hasonló timestamp-oszlopok gyors értelmezése olvasható dátummá hibakeresés közben." },
        { icon: "🔌", title: "API-válaszok", description: "A JSON-ben kapott epoch értékek (gyakran ezredmásodpercben) azonnali átváltása emberi időre." },
        { icon: "📋", title: "Naplófájlok", description: "Szerver- és alkalmazásnaplók timestampjeinek összevetése a helyi és UTC idővel incidensek vizsgálatakor." },
        { icon: "⏰", title: "Lejárati idők", description: "Tokenek, gyorsítótár-bejegyzések vagy cron-feladatok lejáratának ellenőrzése – mikor jár le, és mennyi van hátra." },
      ],
      formatComparison: {
        title: "Időbélyeg-formátumok",
        columns: ["Formátum", "Példa", "Jellemző"],
        rows: [
          { feature: "Unix másodperc", values: ["1750000000", "10 számjegy, klasszikus Unix"] },
          { feature: "Unix ezredmásodperc", values: ["1750000000000", "13 számjegy, JavaScript Date.now()"] },
          { feature: "ISO 8601", values: ["2025-06-15T14:26:40Z", "Szabványos szöveg, UTC-vel"] },
          { feature: "UTC olvasható", values: ["15 Jun 2025 14:26:40 GMT", "Emberi nézet, UTC-ben"] },
        ],
      },
      aboutSection: {
        title: "A Unix idő dióhéjban",
        paragraphs: [
          "A Unix idő (más néven epoch idő vagy POSIX idő) egyetlen egész számmal méri az időt: hány másodperc telt el 1970. január 1. éjfél (UTC) óta. Ennek a megoldásnak az ereje az egyszerűségében van – nincs időzóna, nincs nyári időszámítás, nincs hónap- vagy évhatár-probléma, csak egy folyamatosan növekvő szám, amellyel könnyű számolni és összehasonlítani.",
          "Éppen ezért a timestamp a számítástechnika közös időnyelve: adatbázisok ezzel tárolják a rekordok létrehozási idejét, az API-k ezzel jeleznek lejáratot, a verziókövető rendszerek és a naplók ezzel rögzítik az eseményeket. Amikor emberi olvasásra van szükség, a számot átváltjuk dátummá a kívánt időzónában – pontosan ezt teszi ez az eszköz.",
          "Két gyakori csapda van. Az egyik a mértékegység: másodperc (10 jegy) vagy ezredmásodperc (13 jegy) – könnyű elrontani, ezért az eszköz külön kezeli a kettőt. A másik az időzóna: ugyanaz a timestamp a helyi és a UTC nézetben más órát mutat, de ugyanazt a pillanatot jelöli. Az eszköz mindkét nézetet egyszerre mutatja, hogy ne legyen félreértés.",
        ],
      },
      tips: [
        { icon: "🔢", tip: "10 számjegy = másodperc, 13 számjegy = ezredmásodperc. Ha rossz az eredmény (1970 körüli vagy nagyon távoli dátum), kapcsold át az egységet." },
        { icon: "🌍", tip: "A timestamp időzóna-független; a megjelenített eltérés a helyi és a UTC között csak a nézet különbsége, nem a tárolt értéké." },
        { icon: "📌", tip: "Az ISO 8601 a legbiztonságosabb formátum adatcseréhez – egyértelmű, rendezhető és minden modern rendszer érti." },
        { icon: "🔒", tip: "Az időpontok a böngésződben maradnak; bizalmas naplók timestampjeit is nyugodtan átválthatod." },
      ],
    },
  },

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

  // ─── JSON Viewer ────────────────────────────────────────────────────────────
  "json-viewer": {
    introText:
      "A JSON Viewer egy összecsukható, szintaxis-kiemelt fa-nézetben jeleníti meg a JSON adatot, hogy a mély, beágyazott struktúrákat is könnyű legyen áttekinteni. Illeszd be a JSON-t, és azonnal egy interaktív fát kapsz: az objektumokat és tömböket összecsukhatod, a kulcsokat és értékeket típus szerint színezve látod, és egy kattintással a vágólapra másolhatod bármelyik elem elérési útját. Nagy API-válaszok és konfigurációs fájlok gyors böngészéséhez. Minden a böngésződben fut.",
    guide: [
      "1. Illeszd be a JSON adatot a szövegmezőbe.",
      "2. Böngészd a fát: az objektumokat és tömböket a ▶/▼ gombbal csukhatod össze vagy nyithatod ki.",
      "3. Használd az „Összes kinyitása / becsukása” gombokat a teljes fa kezeléséhez.",
      "4. Kattints egy sorra az elérési útja (pl. adat.raktar.db) másolásához.",
    ],
    faq: [
      { q: "Miben más, mint a JSON formázó?", a: "A formázó szöveges, behúzott JSON-t ad; a Viewer egy interaktív fa, ahol az ágakat összecsukhatod, a típusokat színezve látod, és az elérési utakat másolhatod. Nagy, mély JSON-öknél a fa sokkal átláthatóbb." },
      { q: "Mekkora JSON-t kezel?", a: "A megjelenítés a böngésződben történik, így nagy fájlokat is kezel. Nagyon nagy JSON-öknél az összecsukás segít az áttekintésben – a becsukott ágak nem renderelődnek ki." },
      { q: "Mit jelentenek a színek?", a: "A kulcsok kiemelt színnel, a szövegek zölddel, a számok lilával, a logikai értékek narancssárgával, a null pirossal jelennek meg. Ez segít gyorsan felismerni az adattípusokat." },
      { q: "Hogyan másolom egy érték útvonalát?", a: "Kattints a kívánt sorra, és az eszköz a vágólapra másolja a JavaScript-elérési utat (pl. felhasznalok[0].nev), amit közvetlenül használhatsz a kódodban." },
      { q: "A JSON szerverre kerül?", a: "Nem. A teljes feldolgozás és megjelenítés a böngésződben történik – az adataid nem hagyják el a gépedet." },
    ],
    content: {
      howToSteps: [
        { title: "1. JSON beillesztése", description: "Illeszd be a megjelenítendő JSON adatot." },
        { title: "2. Böngészés", description: "Csukd össze vagy nyisd ki az ágakat a ▶/▼ gombbal." },
        { title: "3. Teljes fa", description: "Az „Összes kinyitása/becsukása” gombokkal egyszerre kezeled a fát." },
        { title: "4. Útvonal másolása", description: "Kattints egy sorra az elérési útja vágólapra másolásához." },
      ],
      useCases: [
        { icon: "🔌", title: "API-válaszok", description: "Nagy, mélyen beágyazott API-válaszok gyors áttekintése fejlesztés és hibakeresés közben." },
        { icon: "⚙️", title: "Konfiguráció", description: "Bonyolult konfigurációs JSON-ök szerkezetének felderítése és ellenőrzése." },
        { icon: "🧭", title: "Útvonal-keresés", description: "Egy mélyen fekvő érték pontos elérési útjának megtalálása és másolása a kódhoz." },
        { icon: "🐛", title: "Hibakeresés", description: "Rendellenes vagy hiányzó mezők gyors felderítése a fa-nézetben." },
      ],
      formatComparison: {
        title: "Fa-nézet elemei",
        columns: ["Elem", "Megjelenés"],
        rows: [
          { feature: "Objektum { }", values: ["Összecsukható ág, gyerekszámmal"] },
          { feature: "Tömb [ ]", values: ["Összecsukható ág, elemszámmal"] },
          { feature: "Szöveg / szám", values: ["Típus szerint színezett érték"] },
          { feature: "Elérési út", values: ["Kattintásra a vágólapra másolható"] },
        ],
      },
      aboutSection: {
        title: "Miért hasznos a fa-nézet?",
        paragraphs: [
          "A JSON a modern web adatformátuma – API-k, konfigurációk, adatcsere mind JSON-t használnak. A gond az, hogy a valós JSON gyakran mélyen beágyazott és hosszú: egy sima, formázott szövegben nehéz megtalálni egy adott mezőt vagy átlátni a szerkezetet. A fa-nézet erre ad választ: az ágakat összecsukhatod, így csak arra a részre koncentrálhatsz, ami érdekel.",
          "A típus szerinti színezés és az elérési út másolása külön gyorsítja a munkát. Amikor egy mélyen fekvő értékre kell hivatkozni a kódban, elég rákattintani, és kész a pontos elérési út. Mindez a böngészőben, azonnal, adatküldés nélkül működik – így bizalmas API-válaszokat is nyugodtan megvizsgálhatsz.",
        ],
      },
      tips: [
        { icon: "🌳", tip: "Nagy JSON-nál előbb csukd be az összes ágat, majd nyisd ki célzottan azt, ami érdekel." },
        { icon: "🧭", tip: "Az elérési út másolás a leggyorsabb módja, hogy a kódban hivatkozz egy mezőre." },
        { icon: "🎨", tip: "A színek alapján egy pillantással látod, hogy egy érték szöveg, szám vagy logikai." },
        { icon: "🔒", tip: "Bizalmas API-válaszokat is nyugodtan böngéssz – minden helyben marad." },
      ],
    },
  },

  // ─── JSON ↔ XML konverter ───────────────────────────────────────────────────
  "json-xml": {
    introText:
      "A JSON ↔ XML konverter mindkét irányban átalakítja az adatot: JSON-ból XML-t, vagy XML-ből JSON-t készít, józan alapértelmezésekkel. Válaszd ki az irányt, illeszd be az adatot, és azonnal megkapod a konvertált, behúzott eredményt. Hasznos, amikor egy JSON-alapú rendszernek XML-t kell adnod, vagy egy régi XML API válaszát JSON-ként szeretnéd feldolgozni. Minden a böngésződben fut, szerver nélkül.",
    guide: [
      "1. Válaszd ki az irányt: JSON → XML vagy XML → JSON.",
      "2. Illeszd be a forrás-adatot a bal oldali mezőbe.",
      "3. Olvasd le a konvertált eredményt a jobb oldalon.",
      "4. Másold ki a vágólapra egy kattintással.",
    ],
    faq: [
      { q: "Milyen szabályok szerint konvertál?", a: "Objektum kulcsaiból XML elemek lesznek, a primitív értékek szöveges tartalommá alakulnak. XML → JSON irányban az ismételt azonos nevű elemekből tömb keletkezik, a számok és logikai értékek felismerésre kerülnek. Ez a legelterjedtebb, józan konvenció." },
      { q: "Miért nem mindig tökéletes az átalakítás?", a: "A JSON és az XML adatmodellje eltér: az XML ismer attribútumokat, névtereket és rendezett vegyes tartalmat, amit a JSON nem. Ezért az oda-vissza konverzió némileg veszteséges lehet – az eszköz a leggyakoribb, egyszerű szerkezetekre optimalizál." },
      { q: "Kezeli a tömböket?", a: "Igen. JSON → XML irányban egy tömbből ismételt, azonos nevű elemek lesznek; XML → JSON irányban az azonos nevű testvér-elemekből tömb áll össze." },
      { q: "Van gyökérelem?", a: "XML-nek egyetlen gyökéreleme kell, hogy legyen. Ha a JSON egyetlen felső kulcsot tartalmaz, azt használja gyökérnek; egyébként egy `root` gyökeret ad hozzá." },
      { q: "Az adat szerverre kerül?", a: "Nem. A teljes konverzió a böngésződben történik – az adataid nem hagyják el a gépedet." },
    ],
    content: {
      howToSteps: [
        { title: "1. Irány", description: "Válaszd ki: JSON → XML vagy XML → JSON." },
        { title: "2. Forrás", description: "Illeszd be a konvertálandó adatot." },
        { title: "3. Eredmény", description: "A konvertált, behúzott adat azonnal megjelenik." },
        { title: "4. Másolás", description: "Az eredményt a vágólapra másolod." },
      ],
      useCases: [
        { icon: "🔄", title: "Rendszer-integráció", description: "JSON-alapú alkalmazás összekötése egy XML-t váró régi rendszerrel." },
        { icon: "📡", title: "Régi API-k", description: "XML API-válaszok átalakítása JSON-ná a könnyebb feldolgozáshoz." },
        { icon: "📄", title: "Adatmigráció", description: "Adatok átvitele két, eltérő formátumot használó rendszer között." },
        { icon: "🧪", title: "Tesztadat", description: "Meglévő JSON gyors XML-változatának előállítása teszteléshez." },
      ],
      formatComparison: {
        title: "Konverziós szabályok",
        columns: ["JSON", "XML"],
        rows: [
          { feature: "{ \"a\": 1 }", values: ["<a>1</a>"] },
          { feature: "[ ismételt elem ]", values: ["<tag>…</tag><tag>…</tag>"] },
          { feature: "szám / logikai", values: ["szöveges tartalom (visszaalakítva felismerve)"] },
        ],
      },
      aboutSection: {
        title: "JSON és XML: két adatvilág",
        paragraphs: [
          "A JSON és az XML a strukturált adatcsere két nagy formátuma. A JSON tömör, könnyen olvasható és a modern web alapértelmezett választása; az XML régebbi, bőbeszédűbb, de gazdagabb szerkezeti lehetőségekkel (attribútumok, névterek, séma-validáció). Sok integráció során a kettő között kell hidat verni – például egy modern szolgáltatásnak egy vállalati XML-rendszerrel kell kommunikálnia.",
          "A konverzió alapja egyszerű leképezés: az objektum-kulcsok elemekké, az értékek szöveggé, az ismétlődések tömbbé vagy ismételt elemekké válnak. Mivel a két adatmodell nem fedi egymást tökéletesen, az oda-vissza alakítás a szélső esetekben veszteséges lehet; a mindennapi, egyszerű szerkezetekre viszont gyors és megbízható megoldást ad.",
        ],
      },
      tips: [
        { icon: "🎯", tip: "Tartsd egyszerűnek a szerkezetet – a lapos, egyértelmű adat konvertálódik a legjobban." },
        { icon: "🔁", tip: "Az oda-vissza konverzió után mindig ellenőrizd az eredményt, főleg attribútumok esetén." },
        { icon: "📐", tip: "JSON → XML-nél egyetlen felső kulcs adja a legtisztább gyökérelemet." },
        { icon: "🔍", tip: "Az eredményt a JSON Viewerrel vagy egy XML formázóval tovább ellenőrizheted." },
      ],
    },
  },

  // ─── JSON Schema generátor ──────────────────────────────────────────────────
  "json-schema": {
    introText:
      "A JSON Schema generátor egy JSON mintából automatikusan előállítja a hozzá tartozó JSON Schema-t (draft-07). Illeszd be egy tipikus adatpéldát, és az eszköz típus-inferenciával felépíti a sémát: felismeri a szövegeket, számokat (egész vagy tört), logikai értékeket, objektumokat és tömböket, és opcionálisan minden mezőt kötelezőként jelöl. A séma alkalmas validálásra, dokumentálásra vagy API-szerződések alapjául. Minden a böngésződben fut.",
    guide: [
      "1. Illeszd be egy tipikus JSON adatpéldát.",
      "2. Döntsd el, hogy minden mező kötelező (required) legyen-e.",
      "3. Olvasd le a generált JSON Schema-t (draft-07).",
      "4. Másold ki, és használd validálásra vagy dokumentációként.",
    ],
    faq: [
      { q: "Mi az a JSON Schema?", a: "A JSON Schema egy szabvány, amellyel leírható egy JSON adat elvárt szerkezete: milyen mezők, milyen típussal, melyek kötelezők. Használható adatok validálására (megfelel-e a formátumnak) és dokumentálására egyaránt." },
      { q: "Melyik verziót generálja?", a: "A draft-07 verziót, amely a legszélesebb körben támogatott. A séma tartalmazza a $schema hivatkozást, a típusokat, az objektumok properties mezőit és opcionálisan a required listát." },
      { q: "Hogyan kezeli a tömböket?", a: "A tömb típusát az első elem alapján következteti ki (items). Ha a tömb elemei egységes szerkezetűek, ez pontos sémát ad; vegyes tömböknél érdemes a sémát utólag finomítani." },
      { q: "Miért minden mező kötelező alapból?", a: "Egy mintából nem derül ki, mely mezők opcionálisak, ezért a biztonságos alapértelmezés az, hogy minden megfigyelt mező kötelező. A kapcsolóval kikapcsolhatod, ha lazább sémát szeretnél." },
      { q: "Az adat szerverre kerül?", a: "Nem. A séma-generálás a böngésződben történik – a mintaadatod nem hagyja el a gépedet." },
    ],
    content: {
      howToSteps: [
        { title: "1. Minta", description: "Illeszd be egy reprezentatív JSON adatpéldát." },
        { title: "2. Kötelezőség", description: "Állítsd be, hogy minden mező required legyen-e." },
        { title: "3. Séma", description: "A generált JSON Schema (draft-07) azonnal megjelenik." },
        { title: "4. Használat", description: "Másold ki validáláshoz vagy dokumentációhoz." },
      ],
      useCases: [
        { icon: "✅", title: "Validáció", description: "Bejövő adatok ellenőrzése a séma alapján – megfelel-e az elvárt formátumnak." },
        { icon: "📘", title: "Dokumentáció", description: "Egy API vagy adatstruktúra formális, gépi olvasható leírása." },
        { icon: "🤝", title: "API-szerződés", description: "A séma közös alap a backend és a frontend, vagy két szolgáltatás között." },
        { icon: "🧪", title: "Tesztelés", description: "A séma alapján érvényes és érvénytelen tesztadatok generálhatók." },
      ],
      formatComparison: {
        title: "Típus-inferencia",
        columns: ["Minta érték", "Séma típus"],
        rows: [
          { feature: "42", values: ["integer"] },
          { feature: "3.14", values: ["number"] },
          { feature: "\"szöveg\"", values: ["string"] },
          { feature: "[ … ]", values: ["array (items az első elemből)"] },
        ],
      },
      aboutSection: {
        title: "Miért érdemes JSON Schema-t használni?",
        paragraphs: [
          "Ahogy egy adatstruktúra egyre több helyen kerül felhasználásra, egyre fontosabbá válik, hogy pontosan definiált legyen: milyen mezők vannak, milyen típussal, mi kötelező. A JSON Schema erre ad szabványos, gépi olvasható választ. Egy séma birtokában automatikusan validálhatod a bejövő adatokat, dokumentálhatod az API-dat, és megelőzheted a formátumból eredő hibákat.",
          "A séma kézi megírása aprólékos és unalmas munka, főleg nagy struktúráknál. Ez az eszköz felgyorsítja: egy valós adatpéldából kiindulva felépíti a séma vázát, amit aztán már csak finomítani kell (opcionális mezők, minták, korlátok megadása). Így percek alatt eljutsz a nyers adattól a használható sémáig.",
        ],
      },
      tips: [
        { icon: "🎯", tip: "Adj meg reprezentatív mintát – minden lehetséges mezővel, hogy a séma teljes legyen." },
        { icon: "🔧", tip: "A generált séma egy kiindulás – finomítsd opcionális mezőkkel és korlátokkal (min, max, pattern)." },
        { icon: "📋", tip: "A required kapcsolóval szabályozhatod, mennyire szigorú legyen a séma." },
        { icon: "🧩", tip: "Vegyes tömböknél a séma az első elemet veszi alapul – ellenőrizd, ha a tömb heterogén." },
      ],
    },
  },

  // ─── JWT dekóder ────────────────────────────────────────────────────────────
  "jwt-dekoder": {
    introText:
      "A JWT dekóder olvashatóvá teszi a JSON Web Token tartalmát: a header és a payload részt base64url-dekódolja és formázott JSON-ként jeleníti meg, kiemelve a lejáratot (exp), a kiállítás idejét (iat) és az érvényesség kezdetét (nbf) – olvasható dátumként, státusszal. Fontos: az eszköz NEM ellenőrzi az aláírást (ahhoz a titkos kulcs kellene) – csak dekódol, ami a token tartalmát bárki számára láthatóvá teszi. Minden a böngésződben fut, a token nem kerül szerverre.",
    guide: [
      "1. Illeszd be a JWT tokent (a három, ponttal elválasztott rész).",
      "2. Olvasd le a header és a payload dekódolt, formázott JSON-t.",
      "3. Ellenőrizd a lejáratot (exp) – az eszköz jelzi, ha a token lejárt.",
      "4. Másold ki a header vagy a payload tartalmát, ha szükséges.",
    ],
    faq: [
      { q: "Mi az a JWT?", a: "A JWT (JSON Web Token) egy kompakt token-formátum, amelyet gyakran használnak hitelesítéshez és jogosultságkezeléshez. Három részből áll: header (algoritmus), payload (adatok, claim-ek) és signature (aláírás), pontokkal elválasztva." },
      { q: "Ellenőrzi az aláírást?", a: "Nem. Az aláírás ellenőrzéséhez a szerver titkos kulcsa vagy nyilvános kulcsa kellene, ami itt nem áll rendelkezésre. Az eszköz csak dekódol – a payload olvashatóvá tétele nem jelenti a token hitelességének igazolását." },
      { q: "Biztonságos beilleszteni egy tokent?", a: "Itt igen, mert a dekódolás teljesen a böngésződben történik, a token nem kerül sehová. Fontos viszont tudni: a JWT payload NEM titkosított, csak base64-kódolt – bárki, aki megszerzi a tokent, elolvashatja a tartalmát." },
      { q: "Mit jelent a lejárat (exp)?", a: "Az exp claim egy Unix timestamp, ameddig a token érvényes. Az eszköz olvasható dátummá alakítja, és jelzi, ha a token már lejárt. A lejárt tokeneket a szerverek elutasítják." },
      { q: "A token szerverre kerül?", a: "Nem. A teljes dekódolás a böngésződben, JavaScripttel történik – a token nem hagyja el a gépedet." },
    ],
    content: {
      howToSteps: [
        { title: "1. Token beillesztése", description: "Illeszd be a teljes JWT-t (header.payload.signature)." },
        { title: "2. Tartalom", description: "Olvasd le a header és payload dekódolt JSON-t." },
        { title: "3. Lejárat", description: "Ellenőrizd az exp/iat/nbf claim-eket olvasható dátumként." },
        { title: "4. Másolás", description: "Másold ki a header vagy payload tartalmát." },
      ],
      useCases: [
        { icon: "🔐", title: "Hitelesítés", description: "Egy bejelentkezési token tartalmának ellenőrzése fejlesztés közben." },
        { icon: "🐛", title: "Hibakeresés", description: "Miért utasítja el a szerver a tokent? Lejárt, vagy hibás a payload?" },
        { icon: "🕵️", title: "Jogosultság", description: "A payload jogosultsági claim-jeinek (role, scope) gyors ellenőrzése." },
        { icon: "⏱️", title: "Lejárat", description: "Egy token érvényességi idejének gyors leolvasása olvasható formában." },
      ],
      formatComparison: {
        title: "A JWT három része",
        columns: ["Rész", "Tartalma"],
        rows: [
          { feature: "Header", values: ["Algoritmus és token-típus"] },
          { feature: "Payload", values: ["Claim-ek: sub, exp, iat, role…"] },
          { feature: "Signature", values: ["Aláírás (titkos kulccsal ellenőrizhető)"] },
        ],
      },
      aboutSection: {
        title: "Hogyan épül fel egy JWT?",
        paragraphs: [
          "A JSON Web Token három, ponttal elválasztott részből áll. Az első a header, ami az aláírás algoritmusát írja le. A második a payload, ami a tényleges adatokat (claim-eket) tartalmazza: ki a felhasználó, meddig érvényes a token, milyen jogosultságai vannak. A harmadik a signature, amely az első két rész titkos kulccsal képzett aláírása – ez garantálja, hogy a tokent nem hamisították meg.",
          "Fontos megérteni: a header és a payload csupán base64url-kódolt, NEM titkosított. Ez azt jelenti, hogy bárki, aki hozzáfér a tokenhez, elolvashatja a tartalmát – ezért érzékeny adatot (jelszó, titok) soha ne tegyél a payloadba. Az aláírás nem a tartalmat rejti el, hanem a hamisítást akadályozza meg. Ez az eszköz a kódolt tartalmat teszi olvashatóvá, de az aláírás érvényességét nem vizsgálja.",
        ],
      },
      tips: [
        { icon: "⚠️", tip: "A payload nem titkos – soha ne tegyél bele jelszót vagy érzékeny adatot." },
        { icon: "⏱️", tip: "Ha a szerver 401-et ad, először a lejáratot (exp) ellenőrizd itt." },
        { icon: "🔏", tip: "A dekódolás nem hitelesítés – az aláírás ellenőrzése mindig szerveroldalon történjen." },
        { icon: "🔒", tip: "A token itt biztonságban van (helyben dekódol), de általában óvatosan bánj vele." },
      ],
    },
  },

  // ─── UUID generátor ─────────────────────────────────────────────────────────
  "uuid-generator": {
    introText:
      "Az UUID generátor véletlenszerű, egyedi azonosítókat (UUID v4) készít – egyesével vagy akár ezres tételben. A generálás a böngésző kriptográfiailag biztonságos véletlenszám-forrását (Web Crypto API) használja, így az azonosítók gyakorlatilag ütközésmentesek. Választhatsz nagybetűs, kötőjel nélküli vagy idézőjeles formátumot, és egy kattintással másolhatod az egészet. Adatbázis-kulcsokhoz, teszteléshez és minden olyan helyre, ahol egyedi azonosító kell. Minden a böngésződben fut.",
    guide: [
      "1. Add meg, hány UUID-t szeretnél (1–1000).",
      "2. Válaszd ki a formátumot: nagybetűs, kötőjel nélküli, idézőjeles.",
      "3. Az „Újragenerálás” gombbal új készletet kapsz.",
      "4. Másold ki az összes UUID-t a vágólapra.",
    ],
    faq: [
      { q: "Mi az az UUID v4?", a: "Az UUID (Universally Unique Identifier) egy 128 bites azonosító. A v4 változat véletlenszerű: a bitek nagy részét véletlen forrásból tölti fel, így két generált UUID ütközésének esélye gyakorlatilag nulla, központi koordináció nélkül is." },
      { q: "Mennyire egyediek?", a: "A v4 UUID 122 bit véletlent tartalmaz – ez annyi lehetséges érték, hogy még sok milliárd generálás mellett is elhanyagolható az ütközés esélye. Ezért használható elosztott rendszerekben is, ahol nincs központi azonosító-kiosztás." },
      { q: "Biztonságos a véletlenforrás?", a: "Igen. Az eszköz a Web Crypto API-t (crypto.randomUUID / getRandomValues) használja, amely kriptográfiailag biztonságos. Ez erősebb, mint a Math.random(), és alkalmas biztonsági szempontból is érzékeny azonosítókhoz." },
      { q: "Mire jók a formátum-opciók?", a: "A kötőjel nélküli forma tömörebb (32 karakter), a nagybetűs egyes rendszerekhez illeszkedik, az idézőjeles pedig közvetlenül beilleszthető kódba vagy listába. Válaszd a célrendszerhez illőt." },
      { q: "Az UUID-k szerverre kerülnek?", a: "Nem. A generálás teljes egészében a böngésződben történik – az azonosítók nem kerülnek feltöltésre." },
    ],
    content: {
      howToSteps: [
        { title: "1. Mennyiség", description: "Add meg, hány UUID-t szeretnél (1–1000)." },
        { title: "2. Formátum", description: "Válaszd ki: nagybetűs, kötőjel nélküli, idézőjeles." },
        { title: "3. Generálás", description: "Az „Újragenerálás” gombbal új készletet kapsz." },
        { title: "4. Másolás", description: "Az összes UUID-t egy kattintással másolod." },
      ],
      useCases: [
        { icon: "🗄️", title: "Adatbázis-kulcs", description: "Elsődleges kulcsok, ahol elosztott, ütközésmentes azonosító kell." },
        { icon: "🧪", title: "Tesztadat", description: "Egyedi azonosítók tömeges generálása teszteléshez és fejlesztéshez." },
        { icon: "🔗", title: "Korreláció", description: "Kérés- vagy tranzakció-azonosítók naplózáshoz és nyomkövetéshez." },
        { icon: "📁", title: "Fájlnevek", description: "Ütközésmentes, egyedi fájl- vagy erőforrásnevek generálása." },
      ],
      formatComparison: {
        title: "Formátum-opciók",
        columns: ["Opció", "Példa"],
        rows: [
          { feature: "Alap", values: ["f47ac10b-58cc-4372-a567-0e02b2c3d479"] },
          { feature: "Kötőjel nélkül", values: ["f47ac10b58cc4372a5670e02b2c3d479"] },
          { feature: "Nagybetűs", values: ["F47AC10B-58CC-4372-A567-0E02B2C3D479"] },
        ],
      },
      aboutSection: {
        title: "Mire való az UUID?",
        paragraphs: [
          "Az egyedi azonosító a szoftverfejlesztés egyik alapköve: adatbázis-rekordoknak, fájloknak, kéréseknek, felhasználóknak mind kell egy garantáltan egyedi kulcs. A hagyományos, növekvő sorszám (auto-increment) egyszerű, de központi koordinációt igényel – elosztott rendszerben, ahol több szerver egyszerre generál azonosítót, ütközne. Az UUID ezt oldja meg: elég véletlent tartalmaz ahhoz, hogy koordináció nélkül is egyedi maradjon.",
          "A v4 (véletlenszerű) UUID a legelterjedtebb változat. Kulcsfontosságú, hogy a véletlen jó minőségű legyen: egy gyenge véletlenforrás kiszámíthatóvá, ütközésre hajlamossá tenné az azonosítókat. Ezért használja ez az eszköz a böngésző kriptográfiailag biztonságos Web Crypto API-ját – ugyanazt a forrást, amit a biztonsági kulcsok generálása is.",
        ],
      },
      tips: [
        { icon: "🔑", tip: "Adatbázis-kulcsként a v4 UUID ideális elosztott, több-szerveres környezetben." },
        { icon: "📏", tip: "A kötőjel nélküli forma helyet spórol URL-ekben és fájlnevekben." },
        { icon: "🔒", tip: "A Web Crypto forrás miatt az azonosítók nem kiszámíthatók – ez biztonsági előny." },
        { icon: "📋", tip: "Kódba illesztéshez kapcsold be az idézőjeles formátumot." },
      ],
    },
  },

  // ─── Cron kifejezés magyarázó ───────────────────────────────────────────────
  "cron-ertelmezo": {
    introText:
      "A cron kifejezés magyarázó érthetővé teszi a cron ütemezéseket: mezőnként (perc, óra, nap, hónap, hét napja) megmutatja, mit jelent az adott érték, és kiszámítja a következő futások konkrét időpontjait. Illeszd be a cron kifejezést, vagy válassz egy sablont, és azonnal látod, mikor fog lefutni a feladat. Segít elkerülni a hibás ütemezéseket – nem kell fejben visszafejteni a csillagok és számok jelentését. Minden a böngésződben fut.",
    guide: [
      "1. Illeszd be a cron kifejezést (5 mező), vagy válassz egy sablont.",
      "2. Olvasd le a mezőnkénti magyarázatot (perc, óra, nap, hónap, hét napja).",
      "3. Nézd meg a következő futások konkrét időpontjait.",
      "4. Módosítsd a kifejezést, amíg a kívánt ütemezést kapod.",
    ],
    faq: [
      { q: "Mi az a cron kifejezés?", a: "A cron egy ütemezési formátum, amely öt mezőből áll: perc, óra, a hónap napja, hónap és a hét napja. Ezekkel megadható, mikor fusson le egy ismétlődő feladat – például minden hétköznap reggel 9-kor." },
      { q: "Mit jelentenek a szimbólumok?", a: "A * (csillag) jelentése „minden”; a szám egy konkrét értéket jelöl; a A-B tartományt (pl. 1-5); a */N lépést (minden N-edik); a A,B pedig listát. Az eszköz mindegyiket értelmezi és emberi nyelven megmutatja." },
      { q: "Hogyan számolja a következő futásokat?", a: "A jelenlegi időből kiindulva végighalad a soron következő perceken, és kiválasztja azokat, amelyek illeszkednek mind az öt mezőre. Az első néhány találatot mutatja meg konkrét dátumként." },
      { q: "Milyen időzónát használ?", a: "A böngésződ (a géped) helyi időzónáját. Ha a cron egy szerveren fut, igazítsd a gondolatban a szerver időzónájához – sok szerver UTC-ben dolgozik." },
      { q: "Az adat szerverre kerül?", a: "Nem. Az értelmezés és a számítás teljesen a böngésződben történik – semmi nem kerül feltöltésre." },
    ],
    content: {
      howToSteps: [
        { title: "1. Kifejezés", description: "Illeszd be a cron kifejezést, vagy válassz sablont." },
        { title: "2. Magyarázat", description: "Olvasd le, mit jelent az öt mező egyenként." },
        { title: "3. Futások", description: "Nézd meg a következő futások konkrét időpontjait." },
        { title: "4. Finomítás", description: "Módosítsd, amíg a kívánt ütemezést kapod." },
      ],
      useCases: [
        { icon: "⏰", title: "Ütemezett feladat", description: "Egy cron job ütemezésének ellenőrzése élesítés előtt." },
        { icon: "🐛", title: "Hibakeresés", description: "Miért nem futott le a feladat? A mező-magyarázat és a futások segítenek." },
        { icon: "📚", title: "Tanulás", description: "A cron szintaxis megértése konkrét példákon és sablonokon keresztül." },
        { icon: "🔧", title: "Karbantartás", description: "Egy örökölt crontab bejegyzés jelentésének gyors visszafejtése." },
      ],
      formatComparison: {
        title: "A cron mezők",
        columns: ["Mező", "Tartomány"],
        rows: [
          { feature: "Perc", values: ["0–59"] },
          { feature: "Óra", values: ["0–23"] },
          { feature: "Nap (hónap)", values: ["1–31"] },
          { feature: "Hónap", values: ["1–12"] },
          { feature: "Hét napja", values: ["0–6 (0 = vasárnap)"] },
        ],
      },
      aboutSection: {
        title: "A cron ütemezés logikája",
        paragraphs: [
          "A cron a Unix-világ klasszikus ütemezője: öt egyszerű mezővel írható le szinte bármilyen ismétlődő minta. A kompaktság ára viszont az olvashatóság – a `0 9 * * 1-5` első ránézésre nem árulja el, hogy „minden hétköznap reggel 9-kor” jelent. Egy elgépelés pedig könnyen oda vezethet, hogy a feladat rossz időben, vagy egyáltalán nem fut le.",
          "Ez az eszköz két irányból teszi átláthatóvá a cron kifejezést. Egyrészt mezőnként megmagyarázza, mit jelent az adott érték; másrészt konkrétan kiszámítja a következő futások időpontjait, így a szintaxis megértése helyett egyszerűen látod az eredményt. A kettő együtt megbízhatóvá teszi az ütemezés ellenőrzését még élesítés előtt.",
        ],
      },
      tips: [
        { icon: "🧪", tip: "Élesítés előtt mindig nézd meg a következő futásokat – egy elgépelt csillag sokba kerülhet." },
        { icon: "🌍", tip: "Ne feledd az időzónát: a szervered valószínűleg UTC-ben fut, nem a te helyi idődben." },
        { icon: "📋", tip: "Ismeretlen crontab bejegyzésnél a mező-magyarázat gyorsan tisztázza a jelentést." },
        { icon: "⭐", tip: "A */N lépés-szintaxis (pl. */15) gyakori félreértés forrása – itt ellenőrizheted a hatását." },
      ],
    },
  },
};
