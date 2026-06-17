import type { ContentMap } from "./types.ts";

// ═══ SZÍNEK kategória – HU content (HU+RO közös toolok) ════════════════════
export const SZINEK_CONTENT: ContentMap = {
  // ─── Színkonverter ────────────────────────────────────────────────────────
  "szinkonverter": {
    introText:
      "A színkonverter élőben alakít át színeket a webfejlesztés és a design legfontosabb formátumai között: HEX, RGB, HSL, HSV és CMYK. Illessz be bármilyen formátumot, válassz színt a színpipettával, vagy állítsd be az R/G/B csatornákat csúszkával – minden érték azonnal frissül, mellette a színminta. Designereknek, fejlesztőknek és tartalomkészítőknek, akiknek pontos színkódokra van szükségük, telepítés nélkül.",
    guide: [
      "1. Illeszd be a színt bármilyen formátumban (pl. #3B82F6, rgb(59,130,246) vagy hsl(217,91%,60%)).",
      "2. Vagy nyisd meg a színpipettát, és válassz színt vizuálisan.",
      "3. Finomhangold az R, G, B csatornákat a csúszkákkal.",
      "4. Másold ki a kívánt formátumot (HEX, RGB, HSL, HSV, CMYK) a sor melletti gombbal.",
    ],
    faq: [
      { q: "Milyen színformátumokat ismer fel?", a: "A beviteli mező felismeri a HEX (#RGB és #RRGGBB), az rgb()/rgba() és a hsl()/hsla() formátumokat. A kimeneten ezeken felül HSV és CMYK értékeket is megjelenít." },
      { q: "Mi a különbség a HEX és az RGB között?", a: "Ugyanazt a színt írják le más jelöléssel: a HEX hexadecimális (#3B82F6), az RGB pedig három 0–255 közötti számmal (rgb(59,130,246)). A böngészők mindkettőt értik; a HEX rövidebb, az RGB-vel könnyebb programból számolni." },
      { q: "Mire jó a HSL?", a: "A HSL (árnyalat, telítettség, világosság) intuitívabb a kézi állításhoz: az árnyalat (0–360°) megtartása mellett külön szabályozhatod a telítettséget és a világosságot – ideális egy színskála vagy hover-állapot készítéséhez." },
      { q: "Mi az a CMYK, és mikor kell?", a: "A CMYK (cián, magenta, sárga, fekete) a nyomtatás színmodellje. A képernyő RGB-ben világít, a nyomtató viszont festékekkel dolgozik, ezért nyomdai munkához CMYK értékre van szükség. A konverzió közelítő – pontos egyezéshez ICC-profil kell." },
      { q: "Az érték a böngészőben marad?", a: "Igen. A teljes konverzió a böngésződben, JavaScripttel történik – semmilyen szín vagy adat nem kerül szerverre." },
      { q: "Pontos a konverzió?", a: "A HEX, RGB, HSL és HSV között a konverzió matematikailag pontos és veszteségmentes (kerekítve egész értékekre). A CMYK egy egyszerű, profil nélküli közelítés, ami a webes munkához elegendő, de nyomdai színhűséghez nem." },
    ],
    content: {
      howToSteps: [
        { title: "1. Szín megadása", description: "Illeszd be HEX, RGB vagy HSL formátumban, vagy használd a színpipettát a vizuális választáshoz." },
        { title: "2. Finomhangolás", description: "Az R/G/B csúszkákkal pontosan beállíthatod a színt – minden kimenet élőben követi." },
        { title: "3. Értékek leolvasása", description: "Egyszerre látod a HEX, RGB, HSL, HSV és CMYK értékeket, mellette a színmintával." },
        { title: "4. Másolás", description: "A kívánt formátumot egy kattintással a vágólapra másolod." },
      ],
      useCases: [
        { icon: "🎨", title: "Webdesign", description: "Márkaszínek átváltása a tervezőeszköz HEX-éből a CSS-hez vagy fordítva, pontos értékekkel." },
        { icon: "💻", title: "CSS fejlesztés", description: "HSL-re váltás, hogy könnyen készíts világosabb/sötétebb árnyalatokat hover- és aktív állapotokhoz." },
        { icon: "🖨️", title: "Nyomdai előkészítés", description: "Képernyős RGB szín közelítő CMYK értékének leolvasása nyomtatandó anyagokhoz." },
        { icon: "♿", title: "Akadálymentesség", description: "A pontos színérték az első lépés a megfelelő szövegkontraszt ellenőrzéséhez." },
      ],
      formatComparison: {
        title: "Színformátumok",
        columns: ["Formátum", "Példa", "Hol használatos"],
        rows: [
          { feature: "HEX", values: ["#3B82F6", "Web, CSS – rövid jelölés"] },
          { feature: "RGB", values: ["rgb(59, 130, 246)", "Web, CSS, canvas, programozás"] },
          { feature: "HSL", values: ["hsl(217, 91%, 60%)", "Web – intuitív kézi állítás"] },
          { feature: "HSV", values: ["hsv(217, 76%, 96%)", "Tervezőszoftverek színkereke"] },
          { feature: "CMYK", values: ["cmyk(76%, 47%, 0%, 4%)", "Nyomtatás (festékek)"] },
        ],
      },
      aboutSection: {
        title: "Színmodellek dióhéjban",
        paragraphs: [
          "A digitális színeket többféle modellel írhatjuk le, és mindegyik ugyanazt a színt fejezi ki más nézőpontból. Az RGB additív modell: a piros, zöld és kék fény keverésével áll elő a szín, ezért használja minden képernyő. A HEX ennek csak egy tömör, hexadecimális írásmódja – a #RRGGBB három bájtja pontosan az RGB három csatornája.",
          "A HSL és a HSV az emberi színérzékeléshez közelebb álló modellek: az árnyalatot (hue) egy 0–360 fokos színkörön adják meg, és külön kezelik a telítettséget és a világosságot (HSL), illetve az értéket/fényességet (HSV). Ezekkel sokkal könnyebb egy meglévő szín világosabb vagy sötétebb változatát létrehozni anélkül, hogy elcsúszna az árnyalat.",
          "A CMYK ezzel szemben szubtraktív modell, a nyomtatás világa: cián, magenta, sárga és fekete festékek elnyeléséből áll össze a szín a papíron. Mivel a képernyő és a papír fizikailag másképp állítja elő a színt, az RGB→CMYK átváltás mindig közelítés – pontos nyomdai színhűséghez kalibrált ICC-profilra van szükség.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Webhez maradj HEX vagy RGB formátumnál; HSL-re akkor válts, ha árnyalat-megtartással kell világosítani/sötétíteni." },
        { icon: "🎨", tip: "A színpipettával gyorsan kísérletezhetsz, a csúszkákkal pedig pixelpontosan beállíthatod a csatornákat." },
        { icon: "🖨️", tip: "A CMYK érték itt csak tájékoztató közelítés – éles nyomdai munkához mindig kérj profilos konverziót." },
        { icon: "🔒", tip: "A színek a böngésződben maradnak; bizalmas márkaszíneket is nyugodtan átválthatsz." },
      ],
    },
  },

  // ─── WCAG kontraszt-ellenőrző ─────────────────────────────────────────────
  "kontraszt-ellenorzo": {
    introText:
      "A WCAG kontraszt-ellenőrző megméri a szöveg és a háttér színe közötti kontrasztarányt, és megmutatja, megfelel-e a WCAG akadálymentességi szabvány AA és AAA szintjének normál és nagy szövegre. Válassz két színt, és élő előnézetben látod, mennyire olvasható a kombináció. Webdesignereknek és fejlesztőknek, akik akadálymentes, mindenki számára olvasható felületet készítenek.",
    guide: [
      "1. Add meg a szöveg színét (előtér) és a háttérszínt – HEX kóddal vagy a színpipettával.",
      "2. Olvasd le a kontrasztarányt (pl. 4,53:1) és az élő előnézetet.",
      "3. Nézd meg a WCAG megfelelőséget: AA/AAA, normál és nagy szöveg – zöld pipa vagy piros kereszt.",
      "4. A csere gombbal felcserélheted az előtér- és háttérszínt.",
    ],
    faq: [
      { q: "Mi az a kontrasztarány?", a: "A kontrasztarány a szöveg és a háttér világosságának (relatív luminanciájának) viszonya, 1:1 (nincs kontraszt) és 21:1 (fekete-fehér) között. Minél nagyobb, annál olvashatóbb a szöveg." },
      { q: "Mennyi a WCAG minimum?", a: "A WCAG 2.1 AA szint normál szövegnél 4,5:1, nagy szövegnél (18pt, vagy 14pt félkövér felett) 3:1 kontrasztarányt ír elő. Az AAA szigorúbb: 7:1, illetve 5:1 nagy szövegnél (itt 4,5:1-ként jelölve)." },
      { q: "Mi számít nagy szövegnek?", a: "A WCAG szerint nagy szöveg a legalább 18pt (kb. 24px) méretű, vagy a legalább 14pt (kb. 18,66px) méretű félkövér szöveg. A nagyobb betűk könnyebben olvashatók, ezért rájuk enyhébb a kontrasztkövetelmény." },
      { q: "Hogyan számolja a kontrasztot?", a: "A WCAG 2.x hivatalos képletével: mindkét szín relatív luminanciáját kiszámolja (gamma-korrekcióval), majd a (világosabb + 0,05) / (sötétebb + 0,05) hányadost adja vissza. Ez a böngészőben, pontosan fut." },
      { q: "Az átlátszóságot is figyelembe veszi?", a: "Nem közvetlenül – a számítás tömör (nem átlátszó) színekkel dolgozik. Ha a szöveged vagy hátteret áttetsző réteggel használod, előbb számold ki a tényleges kevert színt, és azt add meg." },
      { q: "A színek szerverre kerülnek?", a: "Nem. A teljes számítás a böngésződben történik – semmilyen szín nem hagyja el a gépedet." },
    ],
    content: {
      howToSteps: [
        { title: "1. Színek megadása", description: "Állítsd be a szöveg és a háttér színét HEX kóddal vagy a színpipettával." },
        { title: "2. Arány leolvasása", description: "A nagy számként megjelenő kontrasztarány azonnal frissül, mellette az élő szövegelőnézettel." },
        { title: "3. WCAG kiértékelés", description: "A négy szint (AA/AAA × normál/nagy) zöld pipával vagy piros kereszttel jelzi a megfelelőséget." },
        { title: "4. Finomítás", description: "Módosítsd a színeket, amíg eléred a kívánt szintet; a csere gomb felcseréli az elő- és hátteret." },
      ],
      useCases: [
        { icon: "♿", title: "Akadálymentesség", description: "Annak biztosítása, hogy a szöveg gyengénlátók és színtévesztők számára is olvasható legyen." },
        { icon: "🎨", title: "Designrendszer", description: "Márkaszínek és szövegszínek párosításának ellenőrzése, mielőtt bekerülnek a stílusrendszerbe." },
        { icon: "📑", title: "Jogi megfelelőség", description: "Az EU akadálymentességi irányelve (EAA) és sok közbeszerzés WCAG AA megfelelőséget vár el." },
        { icon: "🔘", title: "Gombok és linkek", description: "Az interaktív elemek és állapotaik (hover, focus) kontrasztjának validálása." },
      ],
      formatComparison: {
        title: "WCAG kontraszt-küszöbök",
        columns: ["Szint", "Normál szöveg", "Nagy szöveg"],
        rows: [
          { feature: "AA (minimum)", values: ["4,5:1", "3:1"] },
          { feature: "AAA (kiemelt)", values: ["7:1", "4,5:1"] },
          { feature: "Nem szöveges (UI, ikon)", values: ["3:1", "3:1"] },
        ],
      },
      aboutSection: {
        title: "Miért fontos a kontraszt?",
        paragraphs: [
          "A szöveg olvashatósága nagyban függ a betű és a háttér közötti kontraszttól. A gyengénlátók, az időskori látásromlással élők és a színtévesztők számára az alacsony kontrasztú szöveg gyakran teljesen olvashatatlan – de még a jó látásúaknak is fárasztó erős napfényben vagy gyenge kijelzőn. A megfelelő kontraszt tehát nem csupán szabványkövetés, hanem alapvető használhatósági kérdés.",
          "A WCAG (Web Content Accessibility Guidelines) a webes akadálymentesség nemzetközi szabványa, amely mérhető küszöbökhöz köti a kontrasztot. Az AA szint a gyakorlati minimum, amit a legtöbb jogszabály (köztük az EU akadálymentességi irányelve) elvár; az AAA a kiemelten hozzáférhető tartalom célja. A küszöbök a betűméretet is figyelembe veszik, mert a nagyobb szöveg alacsonyabb kontraszt mellett is olvasható.",
        ],
      },
      tips: [
        { icon: "✅", tip: "Törekedj legalább AA-ra (4,5:1) a törzsszövegnél – ez a gyakorlati és jogi minimum a legtöbb projektnél." },
        { icon: "🔤", tip: "Nagy vagy félkövér címeknél elég a 3:1, de a hosszú olvasószövegnél mindig a szigorúbb értéket célozd." },
        { icon: "🌗", tip: "Sötét módban külön ellenőrizd a kontrasztot – ami világos háttéren megfelel, az sötéten nem feltétlenül." },
        { icon: "🎯", tip: "Ha épphogy elbuksz egy szintet, a háttér enyhe sötétítése vagy a szöveg világosítása gyakran elég a javításhoz." },
      ],
    },
  },

  // ─── CSS gradiens generátor ───────────────────────────────────────────────
  "gradient-generator": {
    introText:
      "A CSS gradiens generátor vizuálisan, élő előnézettel készít lineáris és radiális színátmeneteket, és azonnal adja a kész CSS kódot. Add hozzá a színpontokat, állítsd a szöget és a pozíciókat, majd másold a CSS-t egy kattintással. Webdesignereknek és fejlesztőknek, akiknek gyorsan, kézi kódolás nélkül kell szép háttér-átmenet.",
    guide: [
      "1. Válaszd ki a típust: lineáris vagy radiális átmenet.",
      "2. Lineárisnál állítsd be az átmenet szögét (0–360°) a csúszkával.",
      "3. Add hozzá vagy módosítsd a színpontokat: szín és pozíció (0–100%).",
      "4. Másold ki a kész CSS kódot a «Másolás» gombbal.",
    ],
    faq: [
      { q: "Mi a különbség a lineáris és a radiális gradiens között?", a: "A lineáris átmenet egy egyenes mentén megy egyik színből a másikba (a szög határozza meg az irányt). A radiális átmenet egy középpontból sugárirányban terjed kifelé, koncentrikus körökben." },
      { q: "Hány színpontot használhatok?", a: "Legalább kettőt, és ebben az eszközben legfeljebb hatot. Minden színpontnak van egy színe és egy pozíciója 0 és 100% között, ahol az adott szín teljesen kifejtődik." },
      { q: "Mit jelent a szög foka?", a: "A lineáris gradiens iránya: 0° felfelé, 90° jobbra, 180° lefelé, 270° balra mutat. A CSS a 12 órás iránytól, az óramutató járásával egyezően méri." },
      { q: "Hol használhatom a kapott kódot?", a: "Bárhol, ahol CSS háttér adható meg: a background tulajdonságban, egy CSS osztályban vagy inline stílusban. A modern böngészők mind támogatják a CSS gradienst." },
      { q: "Működik minden böngészőben?", a: "Igen, a lineáris és radiális CSS gradienst minden modern böngésző natívan támogatja, előtag (prefix) nélkül. Nagyon régi böngészőkhöz tartalék (fallback) háttérszínt érdemes megadni." },
      { q: "A generált kód a böngészőben készül?", a: "Igen, teljesen kliensoldalon – semmilyen adat nem kerül szerverre." },
    ],
    content: {
      howToSteps: [
        { title: "1. Típus választása", description: "Lineáris (egyenes mentén) vagy radiális (középpontból kifelé) átmenet." },
        { title: "2. Irány beállítása", description: "Lineárisnál a szög csúszkával (0–360°) adod meg az átmenet irányát." },
        { title: "3. Színpontok", description: "Szín és pozíció minden ponthoz; pontot hozzáadhatsz vagy eltávolíthatsz." },
        { title: "4. CSS másolása", description: "A kész background szabályt egy kattintással a vágólapra másolod." },
      ],
      useCases: [
        { icon: "🖼️", title: "Hátterek", description: "Hero szekciók, kártyák és gombok modern, lágy színátmenetes háttere." },
        { icon: "🎨", title: "Designkísérlet", description: "Színkombinációk és átmenetek gyors kipróbálása élő előnézettel." },
        { icon: "🔘", title: "Gombstílusok", description: "Figyelemfelkeltő, átmenetes gombok és CTA-elemek készítése." },
        { icon: "📱", title: "Modern UI", description: "Glassmorphism és élénk, átmenetes felületek alapja a mai webdesignban." },
      ],
      formatComparison: {
        title: "Gradiens típusok",
        columns: ["Típus", "Irány", "CSS függvény"],
        rows: [
          { feature: "Lineáris", values: ["Egyenes, szöggel", "linear-gradient()"] },
          { feature: "Radiális", values: ["Középpontból kifelé", "radial-gradient()"] },
        ],
      },
      aboutSection: {
        title: "A CSS gradiensekről",
        paragraphs: [
          "A CSS gradiens egy folytonos színátmenet, amelyet a böngésző képként kezel, de valójában kód generálja – így éles marad bármilyen felbontáson, és nem terheli a betöltést külön képfájllal. Két alaptípusa a lineáris (egy egyenes mentén) és a radiális (egy pontból sugárirányban), és tetszőleges számú színpontból állhat.",
          "Minden színpontnak van egy színe és egy opcionális pozíciója (0–100%), ami megmondja, hol fejtődik ki teljesen az adott szín; a köztes területeken a böngésző folytonosan keveri a szomszédos színeket. A lineáris átmenet szöge szabja meg az irányt, a 12 órás iránytól az óramutató járásával egyezően mérve.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Két közeli árnyalat (pl. ugyanazon szín világosabb és sötétebb verziója) finom, elegáns átmenetet ad." },
        { icon: "📐", tip: "A 135°-os szög (átlós, balról-fentről jobbra-le) az egyik legnépszerűbb, kiegyensúlyozott irány." },
        { icon: "🛟", tip: "Adj meg egy tartalék háttérszínt is a gradiens előtt, hogy nagyon régi böngészőkben is legyen háttér." },
        { icon: "🔒", tip: "A generálás a böngésződben fut – nincs szerver, nincs feltöltés, csak a kész CSS." },
      ],
    },
  },

  // ─── Szín-harmónia generátor ──────────────────────────────────────────────
  "szin-harmonia": {
    introText:
      "A szín-harmónia generátor egyetlen alapszínből állít elő összeillő színsémákat a színelmélet szabályai szerint: komplementer, analóg, triád, osztott-komplementer, tetrád és monokromatikus harmóniát. Minden sémához megkapod a kész HEX értékeket, egy kattintással másolhatóan. Webdesignereknek és tartalomkészítőknek, akik kiegyensúlyozott, harmonikus színpalettát keresnek – kísérletezgetés nélkül.",
    guide: [
      "1. Add meg az alapszínt HEX kóddal vagy a színpipettával.",
      "2. Az eszköz azonnal legenerálja a hat harmónia-sémát.",
      "3. Kattints bármelyik színmintára a HEX érték másolásához.",
      "4. A «Sor másolása» gombbal az egész séma színeit egyszerre kimásolod.",
    ],
    faq: [
      { q: "Mi az a komplementer szín?", a: "A színkörön szemközti, 180°-ra lévő szín. Ez adja a legnagyobb kontrasztot, ezért figyelemfelkeltő, de nagy felületen fárasztó lehet – jól működik kiemelésekhez." },
      { q: "Mi a különbség az analóg és a triád séma között?", a: "Az analóg séma a színkörön egymás melletti (±30°) színeket használ, ami nyugodt, összhangzó hatást ad. A triád három, egyenlő távolságra (120°) lévő színt használ – élénk, mégis kiegyensúlyozott." },
      { q: "Hogyan számolja a harmóniákat?", a: "Az alapszínt HSL színmodellbe alakítja, majd a színárnyalatot (hue) forgatja a séma szögével, miközben a telítettséget és a világosságot megtartja. A monokromatikus séma az árnyalatot tartja, és a világosságot lépteti." },
      { q: "Melyik sémát mikor használjam?", a: "Komplementer: erős kontraszthoz, kiemeléshez. Analóg: nyugodt, egységes felülethez. Triád és tetrád: játékos, színes designhoz. Monokromatikus: letisztult, elegáns, egyszínű megjelenéshez." },
      { q: "Szerverre kerül a szín?", a: "Nem, a teljes generálás a böngésződben történik – a szín nem hagyja el a gépedet." },
    ],
    content: {
      howToSteps: [
        { title: "1. Alapszín megadása", description: "Írd be HEX kóddal vagy válaszd ki a színpipettával az alapszínt." },
        { title: "2. Sémák megtekintése", description: "A hat harmónia-séma azonnal megjelenik, mindegyik a saját színmintáival." },
        { title: "3. Szín másolása", description: "Kattints egy színmintára a HEX érték vágólapra másolásához." },
        { title: "4. Teljes séma", description: "A «Sor másolása» gombbal egy séma összes színét egyszerre kimásolod." },
      ],
      useCases: [
        { icon: "🎨", title: "Designrendszer", description: "Kiegyensúlyozott színpaletta felépítése egy márka- vagy kiemelőszín köré." },
        { icon: "🖌️", title: "Illusztráció", description: "Összeillő színek gyors kiválasztása grafikákhoz és illusztrációkhoz." },
        { icon: "💻", title: "UI-színek", description: "Harmonikus háttér-, kiemelő- és állapotszínek webes felületekhez." },
        { icon: "📊", title: "Diagramok", description: "Jól megkülönböztethető, mégis összhangzó színek adatvizualizációhoz." },
      ],
      formatComparison: {
        title: "Harmónia-sémák",
        columns: ["Séma", "Szögek", "Hatás"],
        rows: [
          { feature: "Komplementer", values: ["0°, 180°", "Erős kontraszt"] },
          { feature: "Analóg", values: ["−30°, 0°, +30°", "Nyugodt, egységes"] },
          { feature: "Triád", values: ["0°, 120°, 240°", "Élénk, kiegyensúlyozott"] },
          { feature: "Osztott-komplementer", values: ["0°, 150°, 210°", "Kontraszt, lágyabban"] },
          { feature: "Tetrád (négyzet)", values: ["0°, 90°, 180°, 270°", "Gazdag, színes"] },
          { feature: "Monokromatikus", values: ["azonos szín, eltérő világosság", "Letisztult, elegáns"] },
        ],
      },
      aboutSection: {
        title: "A színharmóniáról",
        paragraphs: [
          "A színharmónia azt írja le, mely színek illenek össze esztétikusan. Az alapja a színkör (color wheel), amelyen a színek az árnyalatuk szerint, 0 és 360 fok között helyezkednek el. A klasszikus harmónia-sémák a színkörön elfoglalt pozíció (szög) alapján határoznak meg összeillő színeket – például a szemközti színek komplementerek, a szomszédosak analógok.",
          "Ezek a szabályok nem önkényesek: az emberi szem és agy bizonyos színviszonyokat kiegyensúlyozottnak, másokat feszültnek érzékel. A harmónia-sémák kiindulópontot adnak – nem kötelező szabályok, de megbízható alapot nyújtanak egy kellemes, professzionális színpaletta felépítéséhez, amelyet aztán a telítettség és világosság finomhangolásával tovább alakíthatsz.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Kezdj egy erős márka- vagy kiemelőszínnel, és arra építsd a sémát – ne fordítva." },
        { icon: "⚖️", tip: "Egy palettában általában egy domináns szín, egy-két kiegészítő és egy kiemelő szín működik a legjobban (60-30-10 szabály)." },
        { icon: "♿", tip: "A kiválasztott színpárok kontrasztját ellenőrizd a kontraszt-ellenőrzővel az olvashatóságért." },
      ],
    },
  },

  // ─── Színvakság-szimulátor ────────────────────────────────────────────────
  "szinvaksag-szimulator": {
    introText:
      "A színvakság-szimulátor megmutatja, hogyan jelenik meg egy szín a leggyakoribb színlátászavarokkal élő emberek számára: protanópia (vörös-vakság), deuteranópia (zöld-vakság), tritanópia (kék-vakság) és akromatópszia (teljes színvakság). Így ellenőrizheted, hogy a designod színei megkülönböztethetők maradnak-e mindenki számára. Webdesignereknek és fejlesztőknek az akadálymentes, mindenki által használható felületekhez.",
    guide: [
      "1. Add meg a vizsgált színt HEX kóddal vagy a színpipettával.",
      "2. Az eszköz megmutatja a szín szimulált megjelenését minden színvakság-típusnál.",
      "3. Hasonlítsd össze a mintákat – ha két fontos szín összeolvad, érdemes módosítani.",
      "4. Bármelyik szimulált HEX értéket egy kattintással kimásolhatod.",
    ],
    faq: [
      { q: "Mi az a színvakság?", a: "A színvakság (színtévesztés) a színek megkülönböztetésének csökkent képessége, általában öröklött. A leggyakoribb a vörös-zöld típus (protanópia/deuteranópia), amely a férfiak kb. 8%-át érinti." },
      { q: "Milyen típusokat szimulál?", a: "Négyet: protanópia (a vörös érzékelésének hiánya), deuteranópia (a zöldé), tritanópia (a kéké, ritka) és akromatópszia (teljes színvakság, csak fényerő-különbségek). A deuteranópia a leggyakoribb." },
      { q: "Mennyire pontos a szimuláció?", a: "Közelítő: a szakirodalomban elterjedt színtranszformációs mátrixokon alapul. A design akadálymentességének gyors ellenőrzéséhez kiváló eszköz, de orvosi diagnózisra nem alkalmas." },
      { q: "Miért fontos ez a designban?", a: "Ha a felület kizárólag színnel közvetít információt (pl. piros = hiba, zöld = siker), a színtévesztők számára az elveszhet. A szimulátor segít kiszúrni az ilyen problémákat még a tervezés során." },
      { q: "Szerverre kerül a szín?", a: "Nem, a teljes szimuláció a böngésződben fut – a szín nem hagyja el a gépedet." },
    ],
    content: {
      howToSteps: [
        { title: "1. Szín megadása", description: "Írd be HEX kóddal vagy válaszd ki a színpipettával a vizsgálandó színt." },
        { title: "2. Szimuláció megtekintése", description: "Megjelenik a szín normál látással és a négy színvakság-típussal szimulálva." },
        { title: "3. Összehasonlítás", description: "Nézd meg, megkülönböztethető marad-e a szín – főleg a kritikus színpároknál." },
        { title: "4. Érték másolása", description: "Bármelyik szimulált HEX értéket a vágólapra másolhatod." },
      ],
      useCases: [
        { icon: "♿", title: "Akadálymentesség", description: "Annak ellenőrzése, hogy a felület színei mindenki számára megkülönböztethetők maradnak." },
        { icon: "🚦", title: "Állapotjelzők", description: "A siker/hiba (zöld/piros) jelzések tesztelése – ezek a vörös-zöld vaksággal könnyen összeolvadnak." },
        { icon: "📊", title: "Adatvizualizáció", description: "Diagramok és térképek színeinek ellenőrzése, hogy a kategóriák elkülönüljenek." },
        { icon: "🎨", title: "Márkaszínek", description: "Annak vizsgálata, hogyan érzékeli a márkaszíneket a közönség egy része." },
      ],
      formatComparison: {
        title: "Színvakság-típusok",
        columns: ["Típus", "Mi hiányzik", "Gyakoriság"],
        rows: [
          { feature: "Protanópia", values: ["Vörös érzékelés", "férfiak ~1%"] },
          { feature: "Deuteranópia", values: ["Zöld érzékelés", "férfiak ~6%"] },
          { feature: "Tritanópia", values: ["Kék érzékelés", "nagyon ritka"] },
          { feature: "Akromatópszia", values: ["Minden szín", "rendkívül ritka"] },
        ],
      },
      aboutSection: {
        title: "A színvakságról",
        paragraphs: [
          "A színvakság (helyesebben színtévesztés) a színek megkülönböztetésének örökletes vagy szerzett csökkenése. A szem három típusú színérzékelő csapja közül valamelyik hiányzik vagy eltérően működik, ezért bizonyos színek összeolvadnak. A leggyakoribb a vörös-zöld típus, amely a férfiak közel 8%-át és a nők kis részét érinti.",
          "A design szempontjából ez azt jelenti, hogy nem szabad kizárólag színre hagyatkozni az információ közvetítésében. Ha egy gomb csak a színével jelzi az állapotát, vagy egy diagram csak színnel különbözteti meg a kategóriákat, a színtévesztők számára ez elveszhet. A megoldás: a szín mellett használj alakot, ikont, mintázatot vagy feliratot is – a szimulátor pedig segít kiszúrni a problémás eseteket.",
        ],
      },
      tips: [
        { icon: "🔴", tip: "A vörös-zöld a leggyakoribb – ezt a két színt soha ne használd egyedüli megkülönböztetésre." },
        { icon: "➕", tip: "A szín mellé mindig tegyél másodlagos jelzést is: ikont, alakot, mintázatot vagy szöveget." },
        { icon: "🔍", tip: "Ha két fontos szín a szimulációban összeolvad, növeld a köztük lévő világosság-különbséget." },
      ],
    },
  },
};
