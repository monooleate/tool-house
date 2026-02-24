import type { ContentMap } from "./types.ts";

export const SZOVEG_CONTENT: ContentMap = {
  // ═══ 1. SLUG GENERÁTOR ════════════════════════════════════════════════════
  "slug-generator": {
    introText:
      "A slug generátor bármilyen magyar vagy ékezetes szöveget URL-barát formátumba alakít. Eltávolítja az ékezeteket, kisbetűsít, szóközöket kötőjelre cserél, és törli a speciális karaktereket, így SEO-barát, tiszta URL-eket kapsz egyetlen kattintással.",
    guide: [
      "1. Írd be vagy illeszd be a szöveget, amelyből slug-ot szeretnél generálni.",
      "2. Az eszköz automatikusan eltávolítja az ékezeteket, kisbetűsít és szóközöket kötőjelre cserél.",
      "3. Ellenőrizd az eredményt, és szükség esetén módosítsd a bemeneti szöveget.",
      "4. Másold ki a kész slug-ot a vágólapra egyetlen kattintással.",
    ],
    faq: [
      { q: "Mire jó ez az eszköz?", a: "Bármilyen szöveget URL-barát slug formátumba alakít: eltávolítja az ékezeteket, kisbetűsít, szóközöket kötőjelre cserél, és törli a speciális karaktereket." },
      { q: "Biztonságos az adataim szempontjából?", a: "Igen. Minden feldolgozás a böngésződben történik, semmilyen adat nem kerül szerverre." },
      { q: "Kezeli a magyar ékezetes karaktereket?", a: "Igen, az összes magyar ékezetes karaktert (á, é, í, ó, ö, ő, ú, ü, ű) helyesen alakítja át ékezet nélküli megfelelőjére." },
      { q: "Milyen formátumú slug-ot generál?", a: "Kisbetűs, kötőjellel elválasztott slug-ot, amely csak ASCII betűket, számokat és kötőjeleket tartalmaz – ez a legelterjedtebb URL slug formátum." },
      { q: "Mobilon is használhatom?", a: "Igen, az eszköz teljesen reszponzív és bármilyen modern böngészőben működik." },
      { q: "Miért fontos a jó slug az SEO szempontjából?", a: "A keresőmotorok előnyben részesítik az olvasható, kulcsszavakat tartalmazó URL-eket. A tiszta slug javítja a keresési rangsorolást és a felhasználói élményt is." },
    ],
    content: {
      howToSteps: [
        { title: "1. Szöveg beírása", description: "Írd be vagy illeszd be a szöveget, amelyből slug-ot szeretnél készíteni." },
        { title: "2. Automatikus átalakítás", description: "Az eszköz valós időben generálja a slug-ot: ékezetmentesít, kisbetűsít és kötőjelezi." },
        { title: "3. Eredmény ellenőrzése", description: "Ellenőrizd a generált slug-ot, és szükség esetén finomítsd a bemenetet." },
        { title: "4. Másolás", description: "Másold ki a kész slug-ot a vágólapra a másolás gombbal." },
      ],
      useCases: [
        { icon: "🌐", title: "SEO-barát URL-ek", description: "Blogbejegyzések, termékoldalak és kategóriák számára tiszta, olvasható URL slug-ok generálása." },
        { icon: "📝", title: "CMS tartalom", description: "WordPress, Ghost vagy egyéb CMS rendszerek számára automatikus slug generálás magyar nyelvű címekből." },
        { icon: "🗂️", title: "Fájlnevek", description: "Ékezetes fájlneveket biztonságos, ASCII-kompatibilis fájlnevekké alakíthatsz." },
        { icon: "🔗", title: "Anchor linkek", description: "Oldalon belüli navigációs linkek (anchor) számára generálhatsz ékezetmentes azonosítókat." },
      ],
      aboutSection: {
        title: "A slug és az URL-ek jelentősége",
        paragraphs: [
          "A slug az URL azon része, amely az oldal tartalmát emberi nyelven azonosítja. Egy jó slug rövid, leíró és könnyen olvasható – például a «szovetkezeti-hitel-kalkultor» sokkal informatívabb, mint egy véletlenszerű azonosító.",
          "Magyar nyelvű tartalmak esetén különösen fontos az ékezetek eltávolítása az URL-ekből, mert az ékezetes karakterek kódolva jelennek meg a böngésző címsorában (pl. %C3%A1), ami rontja az olvashatóságot és az SEO teljesítményt.",
          "A keresőmotorok a slug-ban található kulcsszavakat is figyelembe veszik a rangsorolásnál. Egy jól megválasztott slug javítja a keresési találatok megjelenését és növeli az átkattintási arányt.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Tartsd a slug-ot rövidnek és lényegretörőnek – 3-5 szavas slug az ideális." },
        { icon: "🔑", tip: "Használj kulcsszavakat a slug-ban a jobb SEO teljesítmény érdekében." },
        { icon: "⚠️", tip: "Kerüld a felesleges kötőszavak (és, vagy, a, az) használatát a slug-ban." },
        { icon: "🔗", tip: "A slug megváltoztatása meglévő oldalaknál 301 átirányítást igényel a régi URL-ről." },
      ],
    },
  },

  // ═══ 2. SOROK RENDEZÉSE ═══════════════════════════════════════════════════
  "sorok-rendezese": {
    introText:
      "A szövegsorok rendező eszköz ABC sorrendbe (vagy fordított sorrendbe) rendezi a szöveg sorait. Támogatja a magyar ékezetes karakterek helyes rendezését, a kis- és nagybetű-érzéketlen rendezést, valamint a numerikus sorbarendezést is.",
    guide: [
      "1. Illeszd be a rendezendő szövegsorokat a beviteli mezőbe.",
      "2. Válaszd ki a rendezési módot: ABC (A-Z), fordított (Z-A), vagy numerikus.",
      "3. Kattints a «Rendezés» gombra – az eredmény azonnal megjelenik.",
      "4. Másold ki a rendezett sorokat a vágólapra.",
    ],
    faq: [
      { q: "Mire jó ez az eszköz?", a: "Szövegsorok ábécé sorrendbe rendezésére szolgál – ideális listák, nevek, szavak és adatsorok rendezéséhez." },
      { q: "Biztonságos az adataim szempontjából?", a: "Igen. Minden feldolgozás a böngésződben történik, semmilyen adat nem kerül szerverre." },
      { q: "Helyesen rendezi a magyar ékezetes karaktereket?", a: "Igen, a rendező figyelembe veszi a magyar ábécé sorrendjét, így az á az a után, az é az e után kerül, stb." },
      { q: "Tudok fordított sorrendben rendezni?", a: "Igen, választhatsz A-Z (növekvő) és Z-A (csökkenő) sorrendet is, valamint numerikus rendezést számokkal kezdődő soroknál." },
      { q: "Mobilon is használhatom?", a: "Igen, az eszköz teljesen reszponzív és bármilyen modern böngészőben működik." },
      { q: "Megkülönbözteti a kis- és nagybetűket?", a: "Beállítható: választhatsz kis- és nagybetű-érzékeny vagy érzéketlen rendezést." },
    ],
    content: {
      howToSteps: [
        { title: "1. Sorok beillesztése", description: "Illeszd be a rendezendő szövegsorokat a beviteli mezőbe." },
        { title: "2. Rendezési mód kiválasztása", description: "Válaszd ki az ABC (A-Z), fordított (Z-A) vagy numerikus rendezést." },
        { title: "3. Rendezés indítása", description: "Kattints a «Rendezés» gombra az azonnali eredményért." },
        { title: "4. Eredmény másolása", description: "Másold ki a rendezett szöveget a vágólapra." },
      ],
      useCases: [
        { icon: "📋", title: "Névsorok rendezése", description: "Tanulói névsorok, vendéglisták vagy kapcsolattartói listák ABC sorrendbe rendezése." },
        { icon: "📦", title: "Import fájlok rendezése", description: "Kódfájlok import utasításainak ábécé sorrendbe szervezése a jobb áttekinthetőségért." },
        { icon: "🗃️", title: "Adatsorok rendezése", description: "CSV, TSV vagy egyszerű szöveges adatfájlok sorainak rendezése." },
        { icon: "📝", title: "Listák szervezése", description: "Bevásárlólisták, teendőlisták és egyéb felsorolások gyors ábécé-rendezése." },
      ],
      aboutSection: {
        title: "A szövegsorok rendezéséről",
        paragraphs: [
          "A szövegsorok rendezése az egyik leggyakrabban használt szövegművelet. Az ábécé sorrend segíti a keresést, az áttekintést és az adatok szervezett kezelését – legyen szó névsorokról, szójegyzékekről vagy kódfájlokról.",
          "Magyar nyelv esetén különösen fontos, hogy a rendező helyesen kezelje az ékezetes karaktereket. A helyes magyar ábécé sorrend szerint például az «á» az «a» után, de a «b» előtt áll, az «ö» és «ő» az «o» után következik.",
          "A numerikus rendezés a sorok elején található számok alapján rendez, ami hasznos sorszámozott listák, verziószámok vagy mérési adatok esetén.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Használd a kis- és nagybetű-érzéketlen módot, ha a nagybetűs elemeknek nem kell előre kerülniük." },
        { icon: "🔢", tip: "Számokkal kezdődő soroknál válaszd a numerikus rendezést – különben «10» a «2» elé kerül." },
        { icon: "🔄", tip: "A fordított rendezés (Z-A) hasznos, ha a lista végéről szeretnéd elkezdeni az áttekintést." },
        { icon: "📋", tip: "Kombinálhatsz az ismétlődő sorok törlése eszközzel: előbb rendezz, aztán szűrd ki a duplikátumokat." },
      ],
    },
  },

  // ═══ 3. ISMÉTLŐDŐ SOROK TÖRLÉSE ══════════════════════════════════════════
  "ismetlodok-torlese": {
    introText:
      "Az ismétlődő sorok törlése eszköz kiszűri a duplikált sorokat a szövegedből, és csak az egyedi sorokat tartja meg. Támogatja a kis- és nagybetű-érzéketlen összehasonlítást, valamint az eredeti sorrend megőrzését is.",
    guide: [
      "1. Illeszd be a szöveget, amelyből törölni szeretnéd az ismétlődő sorokat.",
      "2. Válaszd ki, hogy kis- és nagybetű-érzékeny legyen-e az összehasonlítás.",
      "3. Kattints a «Duplikátumok törlése» gombra.",
      "4. Az eredményben csak az egyedi sorok maradnak – másold ki a vágólapra.",
    ],
    faq: [
      { q: "Mire jó ez az eszköz?", a: "Szövegből az ismétlődő (duplikált) sorok eltávolítására szolgál, így csak az egyedi sorok maradnak meg." },
      { q: "Biztonságos az adataim szempontjából?", a: "Igen. Minden feldolgozás a böngésződben történik, semmilyen adat nem kerül szerverre." },
      { q: "Megőrzi az eredeti sorrendet?", a: "Igen, az első előfordulás sorrendjében tartja meg az egyedi sorokat, a további ismétlődéseket távolítja el." },
      { q: "Megkülönbözteti a kis- és nagybetűket?", a: "Beállítható: választhatsz kis- és nagybetű-érzékeny vagy érzéketlen összehasonlítást. Utóbbi esetben pl. «Alma» és «alma» egyformának számít." },
      { q: "Mobilon is használhatom?", a: "Igen, az eszköz teljesen reszponzív és bármilyen modern böngészőben működik." },
      { q: "Megjeleníti, hány duplikátumot talált?", a: "Igen, az eszköz kijelzi az eredeti sorok számát, a talált duplikátumok számát és az egyedi sorok számát." },
    ],
    content: {
      howToSteps: [
        { title: "1. Szöveg beillesztése", description: "Illeszd be a szöveget, amelyből az ismétlődő sorokat el akarod távolítani." },
        { title: "2. Beállítások", description: "Válaszd ki a kis-/nagybetű érzékenységet és egyéb opciókat." },
        { title: "3. Duplikátumok törlése", description: "Kattints a gombra – az eszköz kiszűri az ismétlődéseket." },
        { title: "4. Eredmény másolása", description: "Másold ki az egyedi sorokat tartalmazó eredményt." },
      ],
      useCases: [
        { icon: "📧", title: "E-mail listák tisztítása", description: "E-mail címek listájából a duplikált címek eltávolítása, hogy mindenki csak egyszer szerepeljen." },
        { icon: "📊", title: "Adattisztítás", description: "CSV vagy szöveges adatfájlokból az ismétlődő sorok kiszűrése az elemzés előtt." },
        { icon: "📝", title: "Log fájlok elemzése", description: "Ismétlődő log bejegyzések szűrése, hogy csak az egyedi hibaüzenetek maradjanak." },
        { icon: "🔗", title: "URL listák deduplikálása", description: "Webcrawler vagy export által generált URL listákból a duplikátumok eltávolítása." },
      ],
      aboutSection: {
        title: "Az ismétlődő sorok törléséről",
        paragraphs: [
          "A duplikált sorok törlése (deduplikáció) alapvető szövegfeldolgozási művelet, amely kiszűri az azonos tartalmú sorokat és csak az egyedi elemeket tartja meg. Ez különösen hasznos listák tisztításánál és adatelőkészítésnél.",
          "Az eszköz az első előfordulás alapján dolgozik: ha egy sor többször is előfordul, az első megjelenés megmarad, a további ismétlődések törlődnek. Így az eredeti sorrend megőrződik.",
          "A kis- és nagybetű-érzéketlen mód különösen hasznos, ha a bemenet inkonzisztens formázást tartalmaz – például ha ugyanaz a név kis- és nagybetűvel is előfordul.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Rendezd a sorokat ABC sorrendbe a deduplikáció előtt, ha az ismétlődéseket egymás mellett szeretnéd látni." },
        { icon: "🔍", tip: "Használd a kis-/nagybetű-érzéketlen módot, ha az adataid nem következetes formázásúak." },
        { icon: "📊", tip: "Ellenőrizd a statisztikákat: az eszköz megmutatja, hány duplikátumot talált és távolított el." },
        { icon: "⚠️", tip: "Figyelj a sorvégi szóközökre – két egyébként azonos sor különbözőnek számíthat egy felesleges szóköz miatt." },
      ],
    },
  },

  // ═══ 4. ÜRES SOROK TÖRLÉSE ════════════════════════════════════════════════
  "ures-sorok-torlese": {
    introText:
      "Az üres sorok törlése eszköz eltávolítja a felesleges üres sorokat a szövegedből. Beállíthatod, hogy az összes üres sort törölje, vagy egymás utáni üres sorokat egyetlen üres sorra redukálja, így a szöveg tiszta és olvasható marad.",
    guide: [
      "1. Illeszd be a szöveget, amelyből el szeretnéd távolítani az üres sorokat.",
      "2. Válaszd ki a módot: összes üres sor törlése vagy dupla üres sorok egyszerűsítése.",
      "3. Kattints a «Törlés» gombra.",
      "4. Másold ki a tisztított szöveget a vágólapra.",
    ],
    faq: [
      { q: "Mire jó ez az eszköz?", a: "A felesleges üres sorok eltávolítására szolgál a szövegből, így tisztább, kompaktabb formátumot kapsz." },
      { q: "Biztonságos az adataim szempontjából?", a: "Igen. Minden feldolgozás a böngésződben történik, semmilyen adat nem kerül szerverre." },
      { q: "Mi számít üres sornak?", a: "Az üres sor olyan sor, amely semmit, csak szóközöket vagy csak tabulátorokat tartalmaz. Az eszköz mindhárom típust felismeri és eltávolítja." },
      { q: "Megőrizhetem a bekezdés-elválasztó üres sorokat?", a: "Igen, választhatsz olyan módot, amely az egymást követő üres sorokat egyetlen üres sorra redukálja, megőrizve a bekezdés-struktúrát." },
      { q: "Mobilon is használhatom?", a: "Igen, az eszköz teljesen reszponzív és bármilyen modern böngészőben működik." },
      { q: "Hány üres sort távolított el?", a: "Az eszköz megjeleníti az eredeti és az eredmény sorok számát, így pontosan látod, hány üres sort törölt." },
    ],
    content: {
      howToSteps: [
        { title: "1. Szöveg beillesztése", description: "Illeszd be a szöveget, amelyből az üres sorokat el szeretnéd távolítani." },
        { title: "2. Mód kiválasztása", description: "Válaszd ki, hogy az összes üres sort törölje vagy csak az egymás utáni dupla üres sorokat egyszerűsítse." },
        { title: "3. Üres sorok törlése", description: "Kattints a gombra az üres sorok eltávolításához." },
        { title: "4. Eredmény másolása", description: "Másold ki a tisztított szöveget." },
      ],
      useCases: [
        { icon: "📄", title: "Szöveg tisztítása", description: "Másolás-beillesztés után fellépő felesleges üres sorok eltávolítása dokumentumokból." },
        { icon: "💻", title: "Kód formázás", description: "Forráskódból a felesleges üres sorok eltávolítása a kompaktabb, áttekinthetőbb kód érdekében." },
        { icon: "📋", title: "Listák tömörítése", description: "Üres sorokkal tarkított listák kompakttá alakítása az egyszerűbb feldolgozás érdekében." },
        { icon: "📧", title: "E-mail előkészítés", description: "E-mail szövegekből a felesleges üres sorok eltávolítása a professzionálisabb megjelenésért." },
      ],
      aboutSection: {
        title: "Az üres sorok törléséről",
        paragraphs: [
          "A felesleges üres sorok gyakran előfordulnak szövegek másolásakor, konvertálásakor vagy különböző forrásokból történő összefűzésekor. Ezek rontják az olvashatóságot és feleslegesen növelik a szöveg hosszát.",
          "Az eszköz kétféle módot kínál: az összes üres sor törlését (a legerőteljesebb tisztítás) és az egymás utáni üres sorok egyetlen üres sorra redukálását (a bekezdés-struktúra megőrzésével).",
          "Az üres sorok törlése gyakran az első lépés a szövegtisztítási folyamatban, amelyet más műveletek követhetnek, mint az ismétlődő sorok törlése vagy a whitespace tisztítás.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Ha meg akarod tartani a bekezdés-elválasztást, használd az «egymás utáni üres sorok egyszerűsítése» módot." },
        { icon: "🔍", tip: "A csak szóközöket tartalmazó sorok is üresnek számítanak – az eszköz ezeket is felismeri." },
        { icon: "📋", tip: "Kombináld a whitespace tisztítás eszközzel a teljesen tiszta szövegért." },
        { icon: "⚡", tip: "Nagy szövegek esetén is azonnal működik, mivel a feldolgozás a böngészőben történik." },
      ],
    },
  },

  // ═══ 5. WHITESPACE TISZTÍTÁS ══════════════════════════════════════════════
  "whitespace-tisztitas": {
    introText:
      "A whitespace tisztító eszköz eltávolítja a felesleges szóközöket, tabulátorokat és egyéb láthatatlan karaktereket a szövegedből. Normalizálja a soron belüli szóközöket, törli a sorvégi szóközöket és egységesíti a whitespace karaktereket.",
    guide: [
      "1. Illeszd be a tisztítandó szöveget a beviteli mezőbe.",
      "2. Válaszd ki a kívánt tisztítási opciókat (sorvégi szóközök, dupla szóközök, tabulátorok).",
      "3. Kattints a «Tisztítás» gombra.",
      "4. Másold ki a megtisztított szöveget a vágólapra.",
    ],
    faq: [
      { q: "Mire jó ez az eszköz?", a: "A felesleges whitespace karakterek (szóközök, tabulátorok, láthatatlan karakterek) eltávolítására és normalizálására szolgál." },
      { q: "Biztonságos az adataim szempontjából?", a: "Igen. Minden feldolgozás a böngésződben történik, semmilyen adat nem kerül szerverre." },
      { q: "Mit jelent a whitespace?", a: "Whitespace a szóköz, tabulátor, sorvégi szóköz, nem törő szóköz (nbsp) és egyéb láthatatlan Unicode karakterek gyűjtőneve." },
      { q: "Milyen tisztítási lehetőségeket kínál?", a: "Sorvégi szóközök törlése, egymás utáni szóközök egyetlen szóközre redukálása, tabulátorok szóközre cseréje, és speciális Unicode whitespace karakterek normalizálása." },
      { q: "Mobilon is használhatom?", a: "Igen, az eszköz teljesen reszponzív és bármilyen modern böngészőben működik." },
      { q: "Változtat a szöveg tartalmán?", a: "Nem, a szavak és a szöveg tartalma érintetlen marad – kizárólag a felesleges whitespace karakterek kerülnek eltávolításra vagy normalizálásra." },
    ],
    content: {
      howToSteps: [
        { title: "1. Szöveg beillesztése", description: "Illeszd be a tisztítandó szöveget a beviteli mezőbe." },
        { title: "2. Opciók kiválasztása", description: "Jelöld ki a kívánt tisztítási opciókat: sorvégi szóközök, dupla szóközök, tabulátorok stb." },
        { title: "3. Tisztítás", description: "Kattints a «Tisztítás» gombra a whitespace normalizálásához." },
        { title: "4. Eredmény másolása", description: "Másold ki a megtisztított szöveget." },
      ],
      useCases: [
        { icon: "💻", title: "Kód tisztítása", description: "Forráskódból a trailing whitespace és az inkonzisztens behúzás eltávolítása a kódminőség javításáért." },
        { icon: "📄", title: "Dokumentum előkészítés", description: "Szövegek tisztítása publikálás előtt – a láthatatlan karakterek nem zavarják a formázást." },
        { icon: "📊", title: "Adattisztítás", description: "Adatfájlokban a felesleges szóközök eltávolítása, amelyek hibás összehasonlítást vagy feldolgozást okozhatnak." },
        { icon: "📋", title: "Webes tartalom", description: "Weboldalról másolt szövegek megtisztítása a nem törő szóközöktől és egyéb rejtett karakterektől." },
      ],
      aboutSection: {
        title: "A whitespace karakterekről",
        paragraphs: [
          "A whitespace karakterek a láthatatlan szövegformázó karakterek összessége: szóköz, tabulátor, sorvégi szóköz és speciális Unicode whitespace karakterek (pl. nem törő szóköz, em-szóköz, ideographic space).",
          "A felesleges whitespace gyakran okoz problémákat: string összehasonlítás hibákat, váratlan formázási eltéréseket, megnövelt fájlméretet és git diff-ekben felesleges változásokat. A szöveg vizuálisan azonosnak tűnhet, miközben a rejtett karakterek eltérést okoznak.",
          "A whitespace normalizálás fontos lépés az adattisztítási folyamatban, és a legtöbb szövegszerkesztő és IDE is kínál hasonló funkciót a sorvégi szóközök automatikus törlésére.",
        ],
      },
      tips: [
        { icon: "💡", tip: "A sorvégi szóközök (trailing whitespace) a leggyakoribb felesleges whitespace – érdemes mindig törölni őket." },
        { icon: "🔍", tip: "A nem törő szóköz (nbsp) vizuálisan azonos a normál szóközzel, de más Unicode karakter – az eszköz ezt is felismeri." },
        { icon: "⚙️", tip: "Fejlesztők számára: állítsd be a szerkesztődet a trailing whitespace automatikus törlésére mentéskor." },
        { icon: "📋", tip: "Weboldalakról másolt szöveg gyakran tartalmaz rejtett Unicode whitespace-t – mindig érdemes megtisztítani." },
      ],
    },
  },

  // ═══ 6. ÉKEZETEK ELTÁVOLÍTÁSA ═════════════════════════════════════════════
  "ekezetek-eltavolitasa": {
    introText:
      "Az ékezet-eltávolító eszköz az összes magyar ékezetes karaktert (á, é, í, ó, ö, ő, ú, ü, ű) az ékezet nélküli megfelelőjére cseréli. Tökéletes URL-ek, fájlnevek, felhasználónevek és ASCII-kompatibilis szövegek készítéséhez.",
    guide: [
      "1. Illeszd be az ékezetes magyar szöveget a beviteli mezőbe.",
      "2. Az eszköz automatikusan felismeri és eltávolítja az összes ékezetet.",
      "3. Ellenőrizd az eredményt – a szöveg tartalma változatlan marad, csak az ékezetek tűnnek el.",
      "4. Másold ki az ékezetmentes szöveget a vágólapra.",
    ],
    faq: [
      { q: "Mire jó ez az eszköz?", a: "Magyar ékezetes karakterek eltávolítására szolgál: á→a, é→e, í→i, ó→o, ö→o, ő→o, ú→u, ü→u, ű→u átalakítást végez." },
      { q: "Biztonságos az adataim szempontjából?", a: "Igen. Minden feldolgozás a böngésződben történik, semmilyen adat nem kerül szerverre." },
      { q: "Kezeli az összes magyar ékezetes karaktert?", a: "Igen, az összes magyar ékezetes betűt: á, é, í, ó, ö, ő, ú, ü, ű (és nagybetűs megfelelőiket) is helyesen alakítja át." },
      { q: "Más nyelvek ékezeteit is eltávolítja?", a: "Igen, a Unicode normalizáció révén más nyelvek ékezetes és diakritikus karaktereit is kezeli (pl. ñ→n, č→c, ş→s)." },
      { q: "Mobilon is használhatom?", a: "Igen, az eszköz teljesen reszponzív és bármilyen modern böngészőben működik." },
      { q: "Visszafordítható a művelet?", a: "Nem, az ékezetek eltávolítása egyirányú: az eredeti ékezetes szöveget nem lehet automatikusan visszaállítani, ezért érdemes az eredetit is megőrizni." },
    ],
    content: {
      howToSteps: [
        { title: "1. Ékezetes szöveg beillesztése", description: "Illeszd be a magyar ékezetes szöveget a beviteli mezőbe." },
        { title: "2. Automatikus konverzió", description: "Az eszköz valós időben eltávolítja az összes ékezetet a szövegből." },
        { title: "3. Eredmény ellenőrzése", description: "Ellenőrizd, hogy az átalakítás megfelel-e az elvárásaidnak." },
        { title: "4. Másolás", description: "Másold ki az ékezetmentes szöveget a vágólapra." },
      ],
      useCases: [
        { icon: "🌐", title: "URL és slug készítés", description: "Magyar szövegekből ékezetmentes URL-ek és slug-ok generálása weboldalakhoz és blogokhoz." },
        { icon: "📁", title: "Fájlnevek", description: "Ékezetes fájlneveket ASCII-kompatibilis fájlnevekké alakíthatsz, elkerülve a kódolási problémákat." },
        { icon: "👤", title: "Felhasználónevek", description: "Regisztrációs rendszerekhez ékezetmentes felhasználónevek készítése magyar nevekből." },
        { icon: "🔎", title: "Keresés és indexelés", description: "Szövegek ékezetmentes változatának előállítása keresőindexekhez, hogy az ékezetes és ékezetmentes keresés is működjön." },
      ],
      aboutSection: {
        title: "Az ékezetek és a Unicode",
        paragraphs: [
          "A magyar nyelv kilenc ékezetes magánhangzót használ: á, é, í, ó, ö, ő, ú, ü, ű. Ezek a Unicode karakterkészletben önálló kódpontokként vagy alap betű + kombinálódó ékezet formájában is ábrázolhatók.",
          "Az ékezetek eltávolítása (diacritics stripping) Unicode normalizáción alapul: a szöveget NFD (Normalization Form Decomposition) formára bontja, majd a kombinálódó diakritikus jeleket eltávolítja, és az alap ASCII karakterek maradnak.",
          "A művelet különösen fontos az informatikában, ahol sok rendszer (fájlrendszerek, URL-ek, e-mail címek, egyes adatbázisok) nem vagy korlátozottan támogatja az ékezetes karaktereket.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Az ékezet-eltávolítás nem fordítható vissza – mindig őrizd meg az eredeti ékezetes szöveget is." },
        { icon: "🔗", tip: "URL és slug készítésnél az ékezetek eltávolítása az első lépés – utána a szóközöket kötőjelre cseréld." },
        { icon: "🌍", tip: "Az eszköz nemcsak magyar, hanem más nyelvek diakritikus jeleit is eltávolítja (pl. francia, cseh, román)." },
        { icon: "⚠️", tip: "Figyelj: az ö→o és ő→o átalakítás után a szöveg nem mindig egyértelmű – kontextusból kell értelmezni." },
      ],
    },
  },

  // ═══ 7. SPECIÁLIS KARAKTEREK TÖRLÉSE ══════════════════════════════════════
  "specialis-karakterek-torlese": {
    introText:
      "A speciális karakter törlő eszköz eltávolítja a nem kívánt speciális karaktereket a szövegből, megtartva a betűket, számokat és a választott írásjeleket. Ideális adattisztításhoz, fájlnév-előkészítéshez és szövegfeldolgozáshoz.",
    guide: [
      "1. Illeszd be a szöveget, amelyből el szeretnéd távolítani a speciális karaktereket.",
      "2. Válaszd ki, mely karaktertípusokat tartsa meg az eszköz (betűk, számok, szóközök, írásjelek).",
      "3. Kattints a «Törlés» gombra.",
      "4. Másold ki a megtisztított szöveget a vágólapra.",
    ],
    faq: [
      { q: "Mire jó ez az eszköz?", a: "Speciális karakterek (szimbólumok, vezérlőkarakterek, nem kívánt írásjelek) eltávolítására szolgál, megtartva a betűket és számokat." },
      { q: "Biztonságos az adataim szempontjából?", a: "Igen. Minden feldolgozás a böngésződben történik, semmilyen adat nem kerül szerverre." },
      { q: "Milyen karaktereket távolít el?", a: "Minden olyan karaktert, amely nem tartozik a megtartandó kategóriákba: pl. @, #, $, %, &, *, stb. A megtartandó kategóriákat te választod ki." },
      { q: "Megtartja az ékezetes karaktereket?", a: "Igen, a betűk kategória tartalmazza az ékezetes magyar karaktereket is (á, é, í, ó, ö, ő, ú, ü, ű). Csak az ékezet-eltávolító eszközzel törölheted külön az ékezeteket." },
      { q: "Mobilon is használhatom?", a: "Igen, az eszköz teljesen reszponzív és bármilyen modern böngészőben működik." },
      { q: "Használhatom fájlnevek tisztítására?", a: "Igen, fájlnevek tisztításához válaszd a betűk, számok, kötőjel és pont megtartását – ez biztosítja a fájlrendszer-kompatibilis nevet." },
    ],
    content: {
      howToSteps: [
        { title: "1. Szöveg beillesztése", description: "Illeszd be a szöveget, amelyből a speciális karaktereket el akarod távolítani." },
        { title: "2. Megtartandó karakterek kiválasztása", description: "Jelöld ki, mely típusokat szeretnéd megtartani: betűk, számok, szóközök, írásjelek." },
        { title: "3. Speciális karakterek törlése", description: "Kattints a gombra a nem kívánt karakterek eltávolításához." },
        { title: "4. Eredmény másolása", description: "Másold ki a megtisztított szöveget." },
      ],
      useCases: [
        { icon: "📁", title: "Fájlnév tisztítás", description: "Fájlnevekből a fájlrendszer által nem támogatott karakterek eltávolítása a biztonságos mentés érdekében." },
        { icon: "📊", title: "Adatimport előkészítés", description: "Külső forrásból származó adatok megtisztítása az adatbázisba importálás előtt." },
        { icon: "🔍", title: "Keresőszöveg tisztítás", description: "Felhasználói keresőkifejezések megtisztítása a speciális karakterektől a jobb keresési eredményekért." },
        { icon: "📱", title: "SMS és push üzenetek", description: "Szövegek előkészítése SMS küldéshez, ahol bizonyos speciális karakterek nem támogatottak." },
      ],
      aboutSection: {
        title: "A speciális karakterek kezeléséről",
        paragraphs: [
          "A speciális karakterek gyűjtőneve az összes olyan karakternek, amely nem betű és nem szám. Ide tartoznak az írásjelek, szimbólumok, vezérlőkarakterek és a különféle Unicode speciális karakterek.",
          "A szövegfeldolgozásban gyakran szükséges a speciális karakterek szűrése: fájlneveknél a fájlrendszer korlátai, adatbázisoknál az SQL injection megelőzése, URL-eknél a kódolási követelmények, SMS-eknél a karakterkészlet korlátai teszik szükségessé.",
          "Az eszköz rugalmasan konfigurálható: te döntöd el, mely karaktertípusokat tartod meg és melyeket törlöd, így pontosan a te igényeidnek megfelelő eredményt kapod.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Fájlnevekhez tartsd meg a betűket, számokat, kötőjelet, aláhúzást és pontot." },
        { icon: "🔍", tip: "Ellenőrizd az eredményt – bizonyos kontextusokban szükség lehet egyes írásjelekre (pl. e-mail címeknél a @-ra)." },
        { icon: "⚠️", tip: "A törlés nem vonható vissza – ha nem biztos, melyik karaktert kell megtartani, próbáld ki előbb kis mintán." },
        { icon: "🔗", tip: "Kombináld az ékezet-eltávolító és a whitespace tisztító eszközzel a teljes szövegtisztítási folyamathoz." },
      ],
    },
  },

  // ═══ 8. KARAKTER CSERE ════════════════════════════════════════════════════
  "karaktercsere": {
    introText:
      "A karakter csere (find/replace) eszköz egyszerű szöveges keresés-cserét végez a szövegben. Írd be a keresendő és a csere szöveget, és az eszköz az összes előfordulást azonnal lecseréli. Gyors és egyszerű megoldás alapvető szövegcseréhez.",
    guide: [
      "1. Illeszd be a szöveget a beviteli mezőbe.",
      "2. Írd be a keresendő szöveget a «Keresés» mezőbe.",
      "3. Írd be a csere szöveget a «Csere» mezőbe (üresen hagyva törlést végez).",
      "4. Kattints a «Csere» gombra – az összes előfordulás azonnal lecserélődik.",
    ],
    faq: [
      { q: "Mire jó ez az eszköz?", a: "Egyszerű szöveges keresés-cserére (find and replace) szolgál: az összes előfordulást lecseréli a megadott szövegre." },
      { q: "Biztonságos az adataim szempontjából?", a: "Igen. Minden feldolgozás a böngésződben történik, semmilyen adat nem kerül szerverre." },
      { q: "Megkülönbözteti a kis- és nagybetűket?", a: "Alapértelmezetten nem különbözteti meg (case-insensitive). Ha pontos egyezésre van szükséged, használd a «Keresés és csere (case-sensitive)» eszközt." },
      { q: "Tudok üres szövegre cserélni (törlés)?", a: "Igen, ha a csere mezőt üresen hagyod, a keresett szöveg minden előfordulása törlődik a szövegből." },
      { q: "Mobilon is használhatom?", a: "Igen, az eszköz teljesen reszponzív és bármilyen modern böngészőben működik." },
      { q: "Hány cserét végez?", a: "Az összes előfordulást lecseréli a szövegben, és megjeleníti a cserék számát." },
    ],
    content: {
      howToSteps: [
        { title: "1. Szöveg beillesztése", description: "Illeszd be a szöveget, amelyben cserét szeretnél végrehajtani." },
        { title: "2. Keresendő szöveg megadása", description: "Írd be a keresett szöveget a «Keresés» mezőbe." },
        { title: "3. Csere szöveg megadása", description: "Írd be a csere szöveget, vagy hagyd üresen a törléshez." },
        { title: "4. Csere végrehajtása", description: "Kattints a «Csere» gombra – az összes találat lecserélődik." },
      ],
      useCases: [
        { icon: "📝", title: "Szöveg szerkesztés", description: "Ismétlődő szövegrészek gyors cseréje dokumentumokban, pl. cégnév, dátum vagy kifejezés módosítása." },
        { icon: "💻", title: "Kód módosítás", description: "Változó- vagy függvénynevek cseréje forráskódban egyszerű keresés-csere segítségével." },
        { icon: "📊", title: "Adatátalakítás", description: "CSV adatokban az elválasztójelek cseréje, pl. pontosvessző vesszőre vagy tabulátor szóközre." },
        { icon: "🔄", title: "Formátum konverzió", description: "Szövegformátum gyors átalakítása, pl. dátumformátum cseréje vagy mértékegységek egységesítése." },
      ],
      aboutSection: {
        title: "A keresés és csere műveletről",
        paragraphs: [
          "A keresés és csere (find and replace) az egyik legalapvetőbb és leggyakrabban használt szövegszerkesztési művelet. Az eszköz a megadott keresőkifejezés minden előfordulását megtalálja a szövegben és lecseréli a megadott szövegre.",
          "Az egyszerű karakter csere nem használ reguláris kifejezéseket – pontosan azt a szöveget keresi, amit beírsz. Ez biztonságosabb és egyszerűbb, mint a regex, mert nem kell aggódnod a speciális karakterek escape-elése miatt.",
          "Ha üres csere szöveget adsz meg, az eszköz törlésként működik: eltávolítja a keresett szöveg összes előfordulását. Ez hasznos felesleges szavak, karakterek vagy szövegrészletek gyors eltávolításához.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Ha a keresett szöveg speciális karaktereket tartalmaz (pl. pontot, zárójelet), itt nincs szükség escape-elésre." },
        { icon: "🔍", tip: "Ellenőrizd a cserék számát az eredményben, hogy meggyőződj a helyes működésről." },
        { icon: "⚠️", tip: "Figyelj a részleges egyezésekre: pl. «szó» keresése a «szólás» szóban is talál egyezést." },
        { icon: "🔄", tip: "Ha kis-/nagybetű-érzékeny cserére van szükséged, használd a «Keresés és csere (case-sensitive)» eszközt." },
      ],
    },
  },

  // ═══ 9. KERESÉS ÉS CSERE (CASE-SENSITIVE) ════════════════════════════════
  "kereses-csere": {
    introText:
      "A keresés és csere (case-sensitive) eszköz pontos, kis- és nagybetű-érzékeny szövegcserét végez. Csak akkor cserél, ha a keresett szöveg betűről betűre megegyezik, beleértve a kis- és nagybetűket is. Precíz szerkesztéshez ideális.",
    guide: [
      "1. Illeszd be a szöveget a beviteli mezőbe.",
      "2. Írd be a keresendő szöveget pontosan úgy, ahogy a szövegben megjelenik (kis-/nagybetűk számítanak).",
      "3. Írd be a csere szöveget a «Csere» mezőbe.",
      "4. Kattints a «Csere» gombra – csak a pontos egyezések cserélődnek le.",
    ],
    faq: [
      { q: "Mire jó ez az eszköz?", a: "Kis- és nagybetű-érzékeny (case-sensitive) keresés-cserére szolgál, ahol pontosan meg kell egyeznie a keresett szöveg betűinek." },
      { q: "Biztonságos az adataim szempontjából?", a: "Igen. Minden feldolgozás a böngésződben történik, semmilyen adat nem kerül szerverre." },
      { q: "Mi a különbség a sima karakter csere és ez között?", a: "A sima karakter csere nem érzékeny a kis-/nagybetűkre (pl. «Alma» = «alma»), míg ez az eszköz csak a pontos egyezést cseréli le." },
      { q: "Használhatok reguláris kifejezéseket?", a: "Nem, ez az eszköz egyszerű szöveges keresést végez. Regex kereséséhez használd a «Regex keresés és csere» eszközt." },
      { q: "Mobilon is használhatom?", a: "Igen, az eszköz teljesen reszponzív és bármilyen modern böngészőben működik." },
      { q: "Tudok csak törölni, csere nélkül?", a: "Igen, ha a csere mezőt üresen hagyod, a keresett szöveg összes pontos egyezése törlődik." },
    ],
    content: {
      howToSteps: [
        { title: "1. Szöveg beillesztése", description: "Illeszd be a szöveget, amelyben a pontos cserét végrehajtanád." },
        { title: "2. Keresőkifejezés megadása", description: "Írd be a keresett szöveget pontosan, a kis- és nagybetűkkel együtt." },
        { title: "3. Csere szöveg megadása", description: "Add meg a csere szöveget, vagy hagyd üresen a keresett szöveg törléséhez." },
        { title: "4. Pontos csere végrehajtása", description: "Kattints a «Csere» gombra – csak a betűről betűre egyező találatok cserélődnek." },
      ],
      useCases: [
        { icon: "💻", title: "Változónév-csere kódban", description: "Forráskódban a camelCase változónevek pontos cseréje, ahol a kis-/nagybetű megkülönböztetés kritikus." },
        { icon: "📝", title: "Tulajdonnevek cseréje", description: "Nagybetűvel kezdődő tulajdonnevek szelektív cseréje, a kisbetűs szóelőfordulások érintetlenül hagyásával." },
        { icon: "🏷️", title: "HTML/XML tag csere", description: "Tag-nevek pontos cseréje, ahol a kis-/nagybetű különbség jelentéssel bír." },
        { icon: "📋", title: "Konstans nevek cseréje", description: "NAGYBETŰS konstansok pontos cseréje anélkül, hogy a kisbetűs előfordulásokat érintené." },
      ],
      aboutSection: {
        title: "A kis- és nagybetű-érzékeny keresésről",
        paragraphs: [
          "A case-sensitive (kis- és nagybetű-érzékeny) keresés-csere azt jelenti, hogy a keresett szöveg minden betűjének pontosan meg kell egyeznie – beleértve a kis- és nagybetűket is. Így az «Alma» keresés nem talál egyezést az «alma» vagy «ALMA» szövegre.",
          "Ez a mód különösen fontos programkódban, ahol a kis- és nagybetű különbséget jelent: a «myVariable» és a «myvariable» két teljesen különböző változó. Ugyanígy fontos tulajdonneveknél és konstansoknál is.",
          "Amennyiben nem szükséges a kis-/nagybetű megkülönböztetés, használd inkább az egyszerű karakter csere eszközt, amely mindkét írásmódot megtalálja és lecseréli.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Használd ezt az eszközt, ha kódban dolgozol és a változónevek kis-/nagybetű megkülönböztetése fontos." },
        { icon: "🔍", tip: "Ellenőrizd a cserék számát – ha kevesebb mint vártad, a kis-/nagybetű különbség lehet az ok." },
        { icon: "⚠️", tip: "A magyar ékezetes karaktereknél is számít a kis-/nagybetű: «Á» nem egyezik az «á»-val." },
        { icon: "🔄", tip: "Ha ugyanazt a szöveget több írásmódban is le akarod cserélni, végezd el a cserét többször, különböző kereséssel." },
      ],
    },
  },

  // ═══ 10. REGEX KERESÉS ÉS CSERE ══════════════════════════════════════════
  "regex-kereses-csere": {
    introText:
      "A regex keresés és csere eszköz reguláris kifejezéseket használ a szöveg mintaillesztéséhez és cseréjéhez. Komplex szövegminták keresésére és átalakítására képes, amelyeket egyszerű szöveges kereséssel nem lehetne megoldani.",
    guide: [
      "1. Illeszd be a szöveget a beviteli mezőbe.",
      "2. Írd be a reguláris kifejezést a «Keresés» mezőbe (pl. \\d+ számok keresésére).",
      "3. Írd be a csere mintát (pl. $1 az első csoport behelyettesítéséhez).",
      "4. Kattints a «Csere» gombra – az összes regex találat lecserélődik.",
    ],
    faq: [
      { q: "Mire jó ez az eszköz?", a: "Reguláris kifejezésekkel (regex) végzett keresés-cserére szolgál – komplex szövegminták keresésére és átalakítására, amit egyszerű find/replace-szel nem lehet megoldani." },
      { q: "Biztonságos az adataim szempontjából?", a: "Igen. Minden feldolgozás a böngésződben történik, semmilyen adat nem kerül szerverre." },
      { q: "Milyen regex szintaxist használ?", a: "A JavaScript reguláris kifejezés szintaxisát használja (ECMAScript regex). Támogatja a csoportokat, karakterosztályokat, kvantorokat és a lookahead/lookbehind kifejezéseket." },
      { q: "Hogyan hivatkozzak a csoportokra a csere szövegben?", a: "A $1, $2, $3 stb. jelölésekkel hivatkozhatsz a keresési minta zárójelezett csoportjaira. A $& az egész találatot jelöli." },
      { q: "Mobilon is használhatom?", a: "Igen, az eszköz teljesen reszponzív és bármilyen modern böngészőben működik." },
      { q: "Mi történik, ha hibás a regex?", a: "Az eszköz valós időben jelzi a regex szintaxis hibákat, és hibaüzenettel segít a javításban." },
    ],
    content: {
      howToSteps: [
        { title: "1. Szöveg beillesztése", description: "Illeszd be a szöveget, amelyben regex keresés-cserét szeretnél végezni." },
        { title: "2. Regex minta megadása", description: "Írd be a reguláris kifejezést a keresés mezőbe, és válaszd ki a flag-eket (g, i, m)." },
        { title: "3. Csere minta megadása", description: "Add meg a csere szöveget – használhatsz $1, $2 csoport-hivatkozásokat." },
        { title: "4. Csere végrehajtása", description: "Kattints a «Csere» gombra – az összes regex találat lecserélődik." },
      ],
      useCases: [
        { icon: "📊", title: "Adatformátum átalakítás", description: "Dátumok, telefonszámok, irányítószámok formátumának átalakítása regex csoportok segítségével." },
        { icon: "💻", title: "Kód refaktorálás", description: "Forráskódban függvényhívások, importok vagy struktúrák mintaillesztéssel történő tömeges átalakítása." },
        { icon: "📝", title: "Szöveg normalizálás", description: "E-mail címek, URL-ek vagy más mintázott szövegek kinyerése és átalakítása nagy szövegekből." },
        { icon: "🔄", title: "Tömeges átalakítás", description: "Ismétlődő szövegminták gyors átalakítása, pl. HTML tag-ek módosítása vagy CSV oszlopok átrendezése." },
      ],
      aboutSection: {
        title: "A reguláris kifejezésekről",
        paragraphs: [
          "A reguláris kifejezések (regex) szövegminták leírására szolgáló formális nyelv. Segítségükkel komplex keresési mintákat adhatsz meg, amelyek nem csupán pontos szöveget, hanem karakter-kategóriákat, ismétlődéseket és pozíciókat is illesztenek.",
          "A JavaScript regex a legelterjedtebb implementáció a weben. Támogatja a karakter-osztályokat (\\d, \\w, \\s), kvantorokat (*, +, ?), csoportokat (()), alternatívákat (|) és a lookahead/lookbehind kifejezéseket.",
          "A csere szövegben használható $1, $2 jelölések a keresési minta zárójelezett csoportjaira hivatkoznak. Ez teszi lehetővé a szöveg részeinek átrendezését, kibontását és újraformázását.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Kezdd egyszerű mintával és fokozatosan bővítsd – így könnyebb megtalálni a hibát, ha nem a várt eredményt kapod." },
        { icon: "🔍", tip: "Használd a \\d (szám), \\w (szó karakter) és \\s (whitespace) rövidítéseket a tömörebb regex-ért." },
        { icon: "⚠️", tip: "A speciális regex karaktereket (. * + ? ( ) [ ] { } | \\ ^) backslash-sel kell escape-elni, ha szó szerint keresed őket." },
        { icon: "📋", tip: "Teszteld a regexet kis mintán, mielőtt nagy szövegen futtatnád – egy hibás regex váratlan eredményt adhat." },
      ],
    },
  },

  // ═══ 11. KISBETŰ/NAGYBETŰ KONVERTÁLÁS ════════════════════════════════════
  "kisbetu-nagybetu": {
    introText:
      "A kisbetű/nagybetű konvertáló eszköz egyetlen kattintással átalakítja a szöveget kisbetűssé, NAGYBETŰSSÉ, Mondatkezdő Nagybetűssé vagy Cím Formátumúvá. Támogatja a magyar ékezetes karaktereket és azonnal megjeleníti az eredményt.",
    guide: [
      "1. Illeszd be az átalakítandó szöveget a beviteli mezőbe.",
      "2. Válaszd ki a kívánt konverziós módot: kisbetű, NAGYBETŰ, Mondat vagy Cím formátum.",
      "3. Az átalakítás azonnal megtörténik.",
      "4. Másold ki az eredményt a vágólapra.",
    ],
    faq: [
      { q: "Mire jó ez az eszköz?", a: "Szöveg kisbetű-nagybetű átalakítására szolgál: kisbetű (lowercase), NAGYBETŰ (uppercase), Mondatkezdő és Cím (title case) formátumok között konvertál." },
      { q: "Biztonságos az adataim szempontjából?", a: "Igen. Minden feldolgozás a böngésződben történik, semmilyen adat nem kerül szerverre." },
      { q: "Helyesen kezeli a magyar ékezetes betűket?", a: "Igen, az á↔Á, é↔É, í↔Í, ó↔Ó, ö↔Ö, ő↔Ő, ú↔Ú, ü↔Ü, ű↔Ű konverziók mind helyesek." },
      { q: "Mit jelent a «Cím formátum» (title case)?", a: "Minden szó első betűjét nagybetűsíti, a többi kisbetűs marad: «ez egy cím» → «Ez Egy Cím»." },
      { q: "Mobilon is használhatom?", a: "Igen, az eszköz teljesen reszponzív és bármilyen modern böngészőben működik." },
      { q: "Számokra és írásjelekre hat a konverzió?", a: "Nem, a számok és írásjelek változatlanok maradnak – kizárólag a betű-karaktereket alakítja át." },
    ],
    content: {
      howToSteps: [
        { title: "1. Szöveg beillesztése", description: "Illeszd be az átalakítandó szöveget a beviteli mezőbe." },
        { title: "2. Mód kiválasztása", description: "Válaszd ki a kívánt konverziót: kisbetű, NAGYBETŰ, Mondat vagy Cím formátum." },
        { title: "3. Automatikus konverzió", description: "Az átalakítás azonnal megtörténik, az eredmény valós időben jelenik meg." },
        { title: "4. Eredmény másolása", description: "Másold ki az átalakított szöveget a vágólapra." },
      ],
      useCases: [
        { icon: "📧", title: "E-mail címek normalizálása", description: "E-mail címek kisbetűsítése az egységes formátum érdekében – az e-mail címek nem kis-/nagybetű érzékenyek." },
        { icon: "🏷️", title: "Címsorok formázása", description: "Blogbejegyzések, cikkek és prezentációk címsorainak egységes Cím Formátumba alakítása." },
        { icon: "💻", title: "Konstansok készítése", description: "Változó- vagy konstansnevekhez NAGYBETŰS szöveg generálása forráskódban." },
        { icon: "📋", title: "Adatok egységesítése", description: "Különböző forrásokból származó szöveges adatok egységes kis-/nagybetűs formátumba hozása." },
      ],
      aboutSection: {
        title: "A kis- és nagybetű konverzióról",
        paragraphs: [
          "A kis- és nagybetű konverzió (case conversion) a szöveg betűinek átalakítása adott szabályok szerint. A négy leggyakoribb mód: kisbetű (lowercase), NAGYBETŰ (uppercase), Mondatkezdő nagybetű (sentence case) és Cím Formátum (title case).",
          "A magyar nyelv speciális kihívásokat jelent a konverzióhoz: az ékezetes karakterek (á, é, í, ó, ö, ő, ú, ü, ű) és nagybetűs párjaik (Á, É, Í, Ó, Ö, Ő, Ú, Ü, Ű) helyes kezelése kritikus a pontos átalakításhoz.",
          "Az adatfeldolgozásban a kisbetűsítés (lowercase) a legelterjedtebb normalizációs lépés: összehasonlítások, keresés és rendezés előtt gyakran kisbetűsítjük a szöveget az egységes kezelés érdekében.",
        ],
      },
      tips: [
        { icon: "💡", tip: "E-mail címek összehasonlításánál mindig kisbetűsíts – az e-mail cím szabvány nem tesz különbséget kis- és nagybetű között." },
        { icon: "📝", tip: "A Cím Formátum (title case) tökéletes blogcímekhez, de figyelj, hogy a magyar névelőket és kötőszavakat ne nagybetűsítsd feleslegesen." },
        { icon: "🔄", tip: "A konverzió visszafordítható, de az eredeti kis-/nagybetű minta nem állítható helyre – az «iPhone» kisbetűsítve «iphone», nagybetűsítve «IPHONE»." },
        { icon: "⚡", tip: "Akármilyen hosszú szöveggel azonnal működik, mivel a feldolgozás a böngészőben történik." },
      ],
    },
  },

  // ═══ 12. CASE KONVERTER ═══════════════════════════════════════════════════
  "case-konverter": {
    introText:
      "A case konverter a szöveget különféle programozási elnevezési konvenciók közötti formátumokba alakítja: camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE és dot.case. Fejlesztők számára nélkülözhetetlen eszköz a változó- és függvénynevek konvertálásához.",
    guide: [
      "1. Írd be vagy illeszd be a szöveget (szavakat, kifejezéseket vagy meglévő elnevezéseket).",
      "2. Válaszd ki a kívánt formátumot: camelCase, PascalCase, snake_case, kebab-case stb.",
      "3. Az átalakítás azonnal megtörténik, az eredmény valós időben megjelenik.",
      "4. Másold ki a konvertált szöveget a vágólapra.",
    ],
    faq: [
      { q: "Mire jó ez az eszköz?", a: "Szöveg átalakítására különféle programozási elnevezési konvenciókba: camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE és dot.case formátumok között." },
      { q: "Biztonságos az adataim szempontjából?", a: "Igen. Minden feldolgozás a böngésződben történik, semmilyen adat nem kerül szerverre." },
      { q: "Milyen formátumokat támogat?", a: "camelCase (javaScript), PascalCase (TypeScript osztályok), snake_case (Python), kebab-case (CSS/URL), CONSTANT_CASE (konstansok) és dot.case formátumokat." },
      { q: "Felismeri a meglévő formátumot?", a: "Igen, az eszköz automatikusan felismeri a bemenet formátumát (camelCase, snake_case stb.) és abból konvertál a kívánt formátumba." },
      { q: "Mobilon is használhatom?", a: "Igen, az eszköz teljesen reszponzív és bármilyen modern böngészőben működik." },
      { q: "Kezeli az ékezetes karaktereket?", a: "Igen, de a programozási elnevezési konvenciókban általában az ékezetmentes ASCII karakterek a javasolt – szükség esetén kombináld az ékezet-eltávolító eszközzel." },
    ],
    content: {
      howToSteps: [
        { title: "1. Szöveg beírása", description: "Írd be a konvertálandó szöveget – lehet szóköz, kötőjel, aláhúzás vagy camelCase elválasztás." },
        { title: "2. Formátum kiválasztása", description: "Válaszd ki a célformátumot: camelCase, PascalCase, snake_case, kebab-case stb." },
        { title: "3. Automatikus konverzió", description: "Az eredmény valós időben megjelenik a kiválasztott formátumban." },
        { title: "4. Másolás", description: "Másold ki a konvertált szöveget a vágólapra egyetlen kattintással." },
      ],
      useCases: [
        { icon: "💻", title: "Változónevek konvertálása", description: "JavaScript camelCase változókat Python snake_case-re konvertálhatsz, vagy fordítva, nyelv váltáskor." },
        { icon: "🏗️", title: "Osztály- és típusnevek", description: "PascalCase osztályneveket generálhatsz szöveges leírásokból TypeScript, C# vagy Java projektekhez." },
        { icon: "🌐", title: "CSS és URL nevek", description: "CSS osztályneveket és URL slug-okat kebab-case formátumba konvertálhatsz." },
        { icon: "🔧", title: "Konfigurációs kulcsok", description: "Környezeti változók és konstansok CONSTANT_CASE formátumba alakítása a konvenciók betartásáért." },
      ],
      aboutSection: {
        title: "A programozási elnevezési konvenciókról",
        paragraphs: [
          "Az elnevezési konvenciók (naming conventions) szabályozzák, hogyan nevezzük el a változókat, függvényeket, osztályokat és egyéb programelemeket. A legelterjedtebb konvenciók: camelCase (JavaScript, Java), PascalCase (C#, TypeScript osztályok), snake_case (Python, Ruby) és kebab-case (CSS, URL slug-ok).",
          "A konvenciók nem csupán esztétikai kérdések: következetes használatuk javítja a kód olvashatóságát, segíti a csapatmunkát és egyes nyelvek (pl. Python PEP 8) kimondottan előírják a használandó formátumot.",
          "A case konverter felismeri a bemenet jelenlegi formátumát (szóközzel, kötőjellel, aláhúzással vagy nagybetűvel elválasztott szavak), szétbontja a szavakra, majd a kiválasztott konvenciónak megfelelően összeépíti az eredményt.",
        ],
      },
      tips: [
        { icon: "💡", tip: "JavaScript-ben a camelCase a változók, a PascalCase az osztályok és a CONSTANT_CASE a konstansok konvenciója." },
        { icon: "🐍", tip: "Python-ban a snake_case a változók és függvények, a PascalCase az osztályok, a SCREAMING_SNAKE_CASE a konstansok konvenciója." },
        { icon: "🌐", tip: "CSS osztályokhoz és URL-ekhez a kebab-case a legmegfelelőbb formátum." },
        { icon: "📋", tip: "Ha több elemet kell konvertálni, soronként add meg őket a kötegelt feldolgozáshoz." },
      ],
    },
  },
};
