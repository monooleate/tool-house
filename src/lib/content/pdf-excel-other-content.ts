import type { ContentMap } from "./types.ts";

// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║  PDF, EXCEL, MARKDOWN, HTML, FÁJL, SEO – SEO tartalom                      ║
// ║  Minden szöveg magyar. Minden feldolgozás 100% böngészőben történik.        ║
// ╚══════════════════════════════════════════════════════════════════════════════╝

// ═══════════════════════════════════════════════════════════════════════════════
// PDF (9 tool)
// ═══════════════════════════════════════════════════════════════════════════════

export const PDF_CONTENT: ContentMap = {
  // ─── 1. PDF összeillesztés ─────────────────────────────────────────────────
  "osszeillesztes": {
    introText:
      "Fűzd össze több PDF fájlodat egyetlen dokumentummá, pillanatok alatt, közvetlenül a böngészőben. Nincs szükség telepítésre, regisztrációra, és a fájljaid soha nem hagyják el a gépedet.",
    guide: [
      "1. Húzd be vagy válaszd ki az összeillesztendő PDF fájlokat.",
      "2. Rendezd át a fájlok sorrendjét húzással, ha szükséges.",
      "3. Kattints az «Összeillesztés» gombra – az egyesített PDF azonnal letölthető.",
    ],
    faq: [
      { q: "Mire jó a PDF összeillesztés?", a: "Több különálló PDF fájl egyetlen dokumentummá egyesítésére szolgál, például számlák, szerződések vagy prezentációk összefűzésére." },
      { q: "Biztonságos a fájljaim szempontjából?", a: "Igen, minden feldolgozás a böngésződben történik, a fájlok nem kerülnek fel semmilyen szerverre." },
      { q: "Hány fájlt illeszthetek össze egyszerre?", a: "Nincs fix korlát, de a böngésző memóriája behatárolja – jellemzően akár 50-100 PDF is gond nélkül egyesíthető." },
      { q: "Megmarad a PDF-ek belső tartalma (linkek, könyvjelzők)?", a: "A szöveges tartalom, képek és alapvető formázás megmarad. Az interaktív elemek (űrlapmezők, JS) nem minden esetben őrződnek meg." },
      { q: "Mobilon is használhatom?", a: "Igen, az eszköz reszponzív, telefonon és tableten is működik." },
      { q: "Mekkora fájlokat tudok összeilleszteni?", a: "A böngésző memóriájától függően általában fájlonként akár 100 MB-ig is működik." },
    ],
    content: {
      howToSteps: [
        { title: "1. Fájlok kiválasztása", description: "Húzd be vagy tallózd ki az egyesítendő PDF fájlokat." },
        { title: "2. Sorrend beállítása", description: "Húzással rendezd a fájlok kívánt sorrendjét." },
        { title: "3. Összeillesztés", description: "Kattints a gombra, és az eszköz egyetlen PDF-et generál." },
        { title: "4. Letöltés", description: "Az egyesített PDF-et azonnal letöltheted." },
      ],
      useCases: [
        { icon: "📑", title: "Számlák összefűzése", description: "Havi számlákat egyetlen PDF-be rendezheted a könyvelés számára." },
        { icon: "📚", title: "Tananyagok egyesítése", description: "Különálló fejezetek vagy diasorok egyetlen dokumentumba fűzése." },
        { icon: "📋", title: "Pályázati dokumentáció", description: "Mellékleteket és igazolásokat egyetlen fájlba csatolhatsz." },
      ],
      aboutSection: {
        title: "Miért érdemes PDF-eket összeilleszteni?",
        paragraphs: [
          "A PDF összeillesztés egyszerűsíti a dokumentumkezelést: egyetlen fájlt könnyebb megosztani, archiválni és nyomtatni, mint tucatnyi különálló dokumentumot.",
          "Az eszközünk a pdf-lib könyvtárat használja, amely közvetlenül a böngészőben dolgozza fel a fájlokat – így garantált az adatvédelem és a gyors működés.",
        ],
      },
      tips: [
        { icon: "📂", tip: "Rendezd sorba a fájlokat az összeillesztés előtt, hogy a végleges dokumentum logikus legyen." },
        { icon: "🔒", tip: "Jelszóval védett PDF-eket előbb oldd fel, mielőtt összeilleszted őket." },
        { icon: "📏", tip: "Különböző oldalméretű PDF-ek is egyesíthetők – az oldalméret fájlonként megmarad." },
      ],
      formatComparison: {
        title: "PDF vs képformátumok összehasonlítás",
        columns: ["Tulajdonság", "PDF", "JPG/PNG", "TIFF"],
        rows: [
          { feature: "Többoldalas", values: ["Igen", "Nem", "Igen"] },
          { feature: "Szöveg kereshető", values: ["Igen", "Nem", "Nem"] },
          { feature: "Fájlméret", values: ["Közepes", "Kicsi", "Nagy"] },
          { feature: "Nyomtatási minőség", values: ["Kiváló", "Változó", "Kiváló"] },
        ],
      },
    },
  },

  // ─── 2. PDF szétbontás ─────────────────────────────────────────────────────
  "szetbontas": {
    introText:
      "Bontsd szét a nagy PDF dokumentumodat kisebb, önálló fájlokra oldalszám vagy oldaltartomány alapján. Az egész folyamat a böngésződben történik, szerverre semmi nem kerül.",
    guide: [
      "1. Töltsd be a szétbontandó PDF fájlt.",
      "2. Add meg az oldaltartományokat (pl. 1-3, 4-6, 7-10).",
      "3. Kattints a «Szétbontás» gombra – a részfájlok ZIP-ben tölthetők le.",
    ],
    faq: [
      { q: "Mire jó a PDF szétbontás?", a: "Egy nagy PDF dokumentumot több kisebb, önálló fájlra bontásra szolgál oldalszám vagy tartomány alapján." },
      { q: "Biztonságos az adataim szempontjából?", a: "Igen, a fájlok kizárólag a böngésződben kerülnek feldolgozásra." },
      { q: "Hogyan adhatom meg az oldaltartományokat?", a: "Vesszővel elválasztva adj meg tartományokat, pl. «1-3, 4-6, 7» – minden tartomány külön PDF lesz." },
      { q: "Mi történik az eredeti fájllal?", a: "Az eredeti fájl változatlan marad, az eszköz új, különálló PDF-eket hoz létre." },
      { q: "Mobilon is használhatom?", a: "Igen, az eszköz minden modern böngészőben működik, mobilon is." },
      { q: "Letölthetem egyszerre az összes részt?", a: "Igen, az összes szétbontott PDF egyetlen ZIP fájlban tölthető le." },
    ],
    content: {
      howToSteps: [
        { title: "1. PDF betöltése", description: "Válaszd ki vagy húzd be a szétbontandó PDF fájlt." },
        { title: "2. Tartományok megadása", description: "Írd be az oldaltartományokat (pl. 1-3, 4-6)." },
        { title: "3. Szétbontás", description: "Kattints a gombra – az eszköz külön PDF-eket generál minden tartományhoz." },
        { title: "4. Letöltés", description: "Töltsd le a részdokumentumokat egyenként vagy ZIP-ben." },
      ],
      useCases: [
        { icon: "📄", title: "Fejezetek kiemelése", description: "Egy hosszú dokumentumból csak a releváns fejezeteket emelheted ki." },
        { icon: "📧", title: "E-mail melléklet", description: "Túl nagy PDF-et felbontva könnyebben küldhetsz e-mailben." },
        { icon: "🗂️", title: "Archiválás", description: "Dokumentumokat logikai egységenként rendezheted külön fájlokba." },
      ],
      aboutSection: {
        title: "Mikor érdemes PDF-et szétbontani?",
        paragraphs: [
          "A PDF szétbontás hasznos, ha egy nagy dokumentumból csak bizonyos oldalakra van szükséged, vagy ha a fájlméretet szeretnéd csökkenteni megosztáshoz.",
          "Az eszköz a böngésződben dolgozik, így még bizalmas dokumentumok esetén is teljes adatvédelem garantált.",
        ],
      },
      tips: [
        { icon: "📖", tip: "Használd az oldal-előnézetet, hogy pontosan lásd, melyik oldalt melyik tartományba szeretnéd sorolni." },
        { icon: "🔢", tip: "Egyetlen oldalt is kiemelhetsz: írd be pl. «5» egyetlen szám tartományként." },
        { icon: "💾", tip: "A ZIP letöltés kényelmesebb, ha sok részt generálsz egyszerre." },
      ],
    },
  },

  // ─── 3. Oldalak kiválasztása ───────────────────────────────────────────────
  "oldalak-kivalasztasa": {
    introText:
      "Válaszd ki a PDF dokumentumod kívánt oldalait, és hozz létre belőlük egy új PDF fájlt. Kényelmes vizuális előnézettel dolgozol, és minden a böngésződben történik.",
    guide: [
      "1. Töltsd be a PDF fájlt az eszközbe.",
      "2. Jelöld ki a megtartandó oldalakat az előnézeti nézetben.",
      "3. Kattints a «Kiválasztott oldalak mentése» gombra – az új PDF azonnal letölthető.",
    ],
    faq: [
      { q: "Mire jó az oldalak kiválasztása?", a: "PDF-ből tetszőleges oldalak kiemelésére és új dokumentumba mentésére szolgál." },
      { q: "Biztonságos az adataim szempontjából?", a: "Teljes mértékben, a feldolgozás a böngészőben zajlik, a fájl nem kerül szerverre." },
      { q: "Kiválaszthatok nem egymás melletti oldalakat?", a: "Igen, tetszőleges oldalakat jelölhetsz ki, nem kell egymás utáninak lenniük." },
      { q: "Az eredeti PDF változik?", a: "Nem, az eszköz egy új PDF fájlt hoz létre a kiválasztott oldalakból." },
      { q: "Mobilon is használhatom?", a: "Igen, az előnézet és a kiválasztás mobilon is működik." },
      { q: "Hány oldalt választhatok ki?", a: "Bármennyi oldalt kijelölhetsz – akár egyetlen oldalt, akár az összeset." },
    ],
    content: {
      howToSteps: [
        { title: "1. PDF betöltése", description: "Válaszd ki a PDF fájlt a gépedről." },
        { title: "2. Oldalak kijelölése", description: "Kattints az előnézeti bélyegképekre a kívánt oldalak kiválasztásához." },
        { title: "3. Új PDF létrehozása", description: "Kattints a mentés gombra – az új PDF csak a kiválasztott oldalakat tartalmazza." },
      ],
      useCases: [
        { icon: "✂️", title: "Releváns oldalak kiemelése", description: "Hosszú jelentésből csak a fontos oldalakat emeled ki." },
        { icon: "📤", title: "Megosztásra optimalizálás", description: "Csak a szükséges oldalakat küldöd tovább, csökkentve a fájlméretet." },
        { icon: "🖨️", title: "Nyomtatás előkészítés", description: "Csak a nyomtatni kívánt oldalakat választod ki." },
      ],
      aboutSection: {
        title: "Oldalak kiválasztása PDF-ből",
        paragraphs: [
          "Az oldalkiválasztó eszköz vizuális bélyegképes előnézetet biztosít, így pontosan látod, melyik oldalt választod ki.",
          "Az eszköz ideális, ha egy hosszú dokumentumból csak néhány specifikus oldalra van szükséged, és nem szeretnéd az egész fájlt megosztani.",
        ],
      },
      tips: [
        { icon: "👆", tip: "Kattints a bélyegképekre az oldalak gyors kijelöléséhez." },
        { icon: "🔄", tip: "Az oldalak sorrendje a kiválasztás sorrendjében marad az új PDF-ben." },
        { icon: "📋", tip: "Használd a «Mind kijelölése» funkciót, majd vedd ki a nem kívánt oldalakat." },
      ],
    },
  },

  // ─── 4. Oldalak sorrendje ──────────────────────────────────────────────────
  "oldalak-sorrendje": {
    introText:
      "Rendezd át a PDF oldalainak sorrendjét egyszerű húzással (drag & drop). A módosított dokumentum azonnal letölthető, és a fájl sosem hagyja el a böngésződet.",
    guide: [
      "1. Töltsd be a PDF fájlt.",
      "2. Húzd az oldalak bélyegképeit a kívánt sorrendbe.",
      "3. Kattints a «Mentés» gombra – az átrendezett PDF letölthető.",
    ],
    faq: [
      { q: "Mire jó az oldalak átrendezése?", a: "PDF dokumentum oldalainak sorrendjét változtathatod meg húzással, anélkül hogy más tartalom módosulna." },
      { q: "Biztonságos az adataim szempontjából?", a: "Igen, minden a böngésződben fut, nincs szerverfeltöltés." },
      { q: "Visszavonhatom a módosításokat?", a: "Igen, az eredeti fájl változatlan marad, bármikor újrakezdheted." },
      { q: "Milyen nagy PDF-eknél működik?", a: "A böngésző memóriájától függ, de jellemzően több száz oldalas PDF-ek is kezelhetők." },
      { q: "Mobilon is használhatom?", a: "Igen, érintéses húzással is működik mobilon és tableten." },
      { q: "Az oldalak tartalma változik?", a: "Nem, csak a sorrend módosul – az oldalak tartalma érintetlen marad." },
    ],
    content: {
      howToSteps: [
        { title: "1. PDF betöltése", description: "Válaszd ki a PDF fájlt a gépedről." },
        { title: "2. Oldalak átrendezése", description: "Húzd a bélyegképeket a kívánt sorrendbe." },
        { title: "3. Mentés", description: "Kattints a mentés gombra az új sorrend véglegesítéséhez." },
      ],
      useCases: [
        { icon: "📊", title: "Prezentáció átrendezés", description: "Diák sorrendjének módosítása PDF prezentációban." },
        { icon: "📖", title: "Fejezetek rendezése", description: "Összefűzött dokumentum fejezeteinek logikus sorrendbe állítása." },
        { icon: "🖨️", title: "Nyomtatási sorrend", description: "Oldalak nyomtatáshoz optimális sorrendbe rendezése." },
      ],
      aboutSection: {
        title: "PDF oldalak átrendezése",
        paragraphs: [
          "Az oldalsorrend-módosító vizuális drag & drop felületet biztosít az oldalak gyors és intuitív átrendezéséhez.",
          "Az eredeti fájl mindig érintetlen marad – az eszköz egy új PDF-et hoz létre a megadott sorrendben.",
        ],
      },
      tips: [
        { icon: "🖱️", tip: "Húzd a bélyegképet a kívánt pozícióba – az oldalak automatikusan átrendeződnek." },
        { icon: "📄", tip: "Több oldalas dokumentumoknál használd a görgetést a navigációhoz." },
        { icon: "↩️", tip: "Ha elrontottad, töltsd be újra a fájlt az eredeti sorrend visszaállításához." },
      ],
    },
  },

  // ─── 5. Oldalak forgatása ──────────────────────────────────────────────────
  "oldalak-forgatasa": {
    introText:
      "Forgasd el a PDF oldalait 90, 180 vagy 270 fokkal – egyenként vagy egyszerre. Ideális a rosszul szkennelt vagy elforgatott dokumentumok javítására, közvetlenül a böngészőben.",
    guide: [
      "1. Töltsd be a PDF fájlt.",
      "2. Válaszd ki a forgatandó oldalakat és az elforgatás mértékét.",
      "3. Kattints a «Mentés» gombra – a módosított PDF azonnal letölthető.",
    ],
    faq: [
      { q: "Mire jó az oldalforgatás?", a: "PDF oldalak elforgatására szolgál 90°-os lépésekben, például rosszul szkennelt dokumentumok javítására." },
      { q: "Biztonságos az adataim szempontjából?", a: "Igen, a feldolgozás teljes egészében a böngésződben történik." },
      { q: "Forgathatom az oldalakat egyenként is?", a: "Igen, kiválaszthatod, hogy melyik oldalakat és milyen irányba forgatod." },
      { q: "Romlik a minőség a forgatástól?", a: "Nem, a forgatás veszteségmentes – az oldal tartalma és minősége változatlan marad." },
      { q: "Mobilon is használhatom?", a: "Igen, az eszköz mobilon és tableten is működik." },
      { q: "Visszavonható a forgatás?", a: "Igen, az eredeti fájl érintetlen marad, és az elforgatást bármikor visszafordíthatod." },
    ],
    content: {
      howToSteps: [
        { title: "1. PDF betöltése", description: "Húzd be vagy válaszd ki a PDF fájlt." },
        { title: "2. Oldalak és irány kiválasztása", description: "Jelöld ki az oldalakat és válaszd ki a forgatás irányát." },
        { title: "3. Mentés", description: "Kattints a mentés gombra az elforgatott PDF letöltéséhez." },
      ],
      useCases: [
        { icon: "📷", title: "Szkennelt dokumentumok javítása", description: "Rosszul szkennelt oldalak elforgatása olvasható pozícióba." },
        { icon: "🔄", title: "Tájkép/álló váltás", description: "Táblázatos oldalak tájkép módba forgatása a jobb olvashatóságért." },
        { icon: "🖨️", title: "Nyomtatás előkészítés", description: "Oldalak helyes tájolásának biztosítása nyomtatás előtt." },
      ],
      aboutSection: {
        title: "PDF oldalak forgatása",
        paragraphs: [
          "A PDF oldalforgatás veszteségmentes művelet: az oldal tartalmát, szövegét és képeit nem érinti, csak a megjelenítés irányát változtatja.",
          "Különösen hasznos szkennelt dokumentumoknál, ahol az oldalak véletlenül rossz tájolásban kerültek a fájlba.",
        ],
      },
      tips: [
        { icon: "🔄", tip: "90° jobbra = óramutató járásával megegyező irány, 90° balra = ellenkező irány." },
        { icon: "📑", tip: "A «Mind kijelölése» funkcióval az összes oldalt egyszerre forgathatod." },
        { icon: "👀", tip: "Használd az előnézetet a forgatás után, mielőtt letöltöd a fájlt." },
      ],
    },
  },

  // ─── 6. Oldalak törlése ────────────────────────────────────────────────────
  "oldalak-torlese": {
    introText:
      "Távolítsd el a felesleges oldalakat a PDF dokumentumodból. Válaszd ki a törlendő oldalakat az előnézetben, és töltsd le a karcsúsított PDF-et – minden a böngésződben marad.",
    guide: [
      "1. Töltsd be a PDF fájlt.",
      "2. Jelöld ki a törlendő oldalakat a bélyegképes nézetben.",
      "3. Kattints a «Mentés» gombra – az új PDF a megmaradt oldalakkal letölthető.",
    ],
    faq: [
      { q: "Mire jó az oldalak törlése?", a: "PDF dokumentumból felesleges oldalak eltávolítására szolgál, például üres oldalak vagy nem releváns tartalom törléséhez." },
      { q: "Biztonságos az adataim szempontjából?", a: "Igen, a feldolgozás kizárólag a böngésződben történik." },
      { q: "Visszavonható a törlés?", a: "Az eredeti fájl változatlan marad a gépeden – csak az új, letöltött PDF nem tartalmazza a törölt oldalakat." },
      { q: "Törölhetek több oldalt egyszerre?", a: "Igen, tetszőleges számú oldalt jelölhetsz ki törlésre egyidejűleg." },
      { q: "Mobilon is használhatom?", a: "Igen, minden modern böngészőben működik, mobilon is." },
      { q: "A fájlméret csökken a törlés után?", a: "Igen, a törölt oldalak tartalmával arányosan csökken a fájlméret." },
    ],
    content: {
      howToSteps: [
        { title: "1. PDF betöltése", description: "Válaszd ki a PDF fájlt a gépedről." },
        { title: "2. Oldalak kijelölése törlésre", description: "Kattints a törlendő oldalak bélyegképeire." },
        { title: "3. Módosított PDF letöltése", description: "Kattints a mentés gombra – az új PDF csak a megtartott oldalakat tartalmazza." },
      ],
      useCases: [
        { icon: "🗑️", title: "Üres oldalak törlése", description: "Szkennelt dokumentumok felesleges üres oldalainak eltávolítása." },
        { icon: "🔐", title: "Bizalmas oldalak eltávolítása", description: "Megosztás előtt a bizalmas oldalak eltávolítása." },
        { icon: "📉", title: "Fájlméret csökkentés", description: "Felesleges oldalak törlésével a fájlméret is csökken." },
      ],
      aboutSection: {
        title: "Oldalak törlése PDF-ből",
        paragraphs: [
          "Az oldaltörlő eszköz lehetővé teszi, hogy felesleges oldalak nélkül oszd meg vagy tárold a dokumentumot.",
          "Az eredeti fájl mindig érintetlen marad – az eszköz egy új PDF-et generál a megtartott oldalakból.",
        ],
      },
      tips: [
        { icon: "👀", tip: "Mindig ellenőrizd az előnézetben, hogy a helyes oldalakat jelölted-e ki törlésre." },
        { icon: "↩️", tip: "Ha véletlenül rossz oldalt jelöltél ki, egyszerűen kattints rá újra a kijelölés megszüntetéséhez." },
        { icon: "💾", tip: "Mentsd el az eredeti PDF-et is, mielőtt letöltöd a módosított változatot." },
      ],
    },
  },

  // ─── 7. PDF képpé ──────────────────────────────────────────────────────────
  "pdf-keppe": {
    introText:
      "Alakítsd át a PDF oldalaidat képfájlokká (JPG vagy PNG). Ideális, ha prezentációba, weboldalra vagy közösségi médiába szeretnéd beilleszteni a dokumentum tartalmát.",
    guide: [
      "1. Töltsd be a PDF fájlt.",
      "2. Válaszd ki a képformátumot (JPG/PNG) és a felbontást.",
      "3. Kattints az «Átalakítás» gombra – a képek egyenként vagy ZIP-ben tölthetők le.",
    ],
    faq: [
      { q: "Mire jó a PDF képpé alakítás?", a: "PDF oldalak képfájlokká (JPG, PNG) konvertálására szolgál, hogy weboldalon, prezentációban vagy közösségi médiában használhasd." },
      { q: "Biztonságos az adataim szempontjából?", a: "Igen, a konvertálás teljes egészében a böngészőben történik." },
      { q: "Milyen felbontást választhatok?", a: "Alacsony (72 DPI), közepes (150 DPI) és magas (300 DPI) felbontás közül választhatsz." },
      { q: "JPG-t vagy PNG-t válasszak?", a: "JPG kisebb fájlméretet ad fotóknál, PNG jobb szöveges tartalomhoz és átlátszó háttérhez." },
      { q: "Mobilon is használhatom?", a: "Igen, az eszköz mobilon is elérhető." },
      { q: "Egyszerre az összes oldalt átalakíthatom?", a: "Igen, az összes oldal egyszerre konvertálható és ZIP-ben letölthető." },
    ],
    content: {
      howToSteps: [
        { title: "1. PDF betöltése", description: "Válaszd ki a konvertálandó PDF fájlt." },
        { title: "2. Beállítások", description: "Válaszd ki a képformátumot és a felbontást." },
        { title: "3. Konvertálás", description: "Kattints az átalakítás gombra – minden oldal külön képfájl lesz." },
        { title: "4. Letöltés", description: "Töltsd le a képeket egyenként vagy ZIP-ben." },
      ],
      useCases: [
        { icon: "🌐", title: "Webes megjelenítés", description: "PDF tartalom képként való beágyazása weboldalba." },
        { icon: "📱", title: "Közösségi média", description: "Dokumentumoldalak megosztása képként közösségi platformokon." },
        { icon: "📊", title: "Prezentációk", description: "PDF oldalak beillesztése PowerPoint vagy Google Slides prezentációba." },
      ],
      aboutSection: {
        title: "PDF képpé konvertálás",
        paragraphs: [
          "A PDF képpé alakítás lehetővé teszi, hogy a dokumentum tartalmát univerzálisan megjeleníthető formátumban oszd meg.",
          "A felbontás kiválasztásával egyensúlyt teremthetsz a képminőség és a fájlméret között az adott felhasználási célnak megfelelően.",
        ],
      },
      tips: [
        { icon: "📐", tip: "Webes használathoz 150 DPI általában elegendő, nyomtatáshoz válaszd a 300 DPI-t." },
        { icon: "🖼️", tip: "Szöveges dokumentumokhoz PNG a jobb választás a tisztább megjelenés érdekében." },
        { icon: "📦", tip: "Sok oldalnál a ZIP letöltés gyorsabb és kényelmesebb." },
      ],
    },
  },

  // ─── 8. Képek PDF-be ───────────────────────────────────────────────────────
  "kepek-pdfbe": {
    introText:
      "Egyesítsd a képeidet (JPG, PNG, WebP) egyetlen PDF dokumentummá. Állítsd be az oldalméretet, a tájolást és a képek elhelyezését – minden a böngésződben marad.",
    guide: [
      "1. Húzd be vagy válaszd ki a képfájlokat.",
      "2. Állítsd be az oldalméretet (A4, Letter stb.) és a tájolást.",
      "3. Rendezd a képek sorrendjét, majd kattints a «PDF létrehozása» gombra.",
    ],
    faq: [
      { q: "Mire jó a képek PDF-be alakítása?", a: "Több képfájl egyetlen, rendezett PDF dokumentummá alakítására szolgál, például fotóalbumhoz vagy dokumentum-archiváláshoz." },
      { q: "Biztonságos az adataim szempontjából?", a: "Igen, a képek nem kerülnek szerverre – a PDF a böngészőben készül." },
      { q: "Milyen képformátumokat fogad el?", a: "JPG, PNG és WebP formátumokat támogat." },
      { q: "Beállíthatom az oldalméretet?", a: "Igen, A4, Letter és egyéb szabványos oldalméretek közül választhatsz, álló vagy fekvő tájolással." },
      { q: "Mobilon is használhatom?", a: "Igen, az eszköz mobilon is teljes funkcionalitással működik." },
      { q: "Hány képet fűzhetek össze?", a: "A böngésző memóriájától függően jellemzően több tucat kép is feldolgozható egyszerre." },
    ],
    content: {
      howToSteps: [
        { title: "1. Képek kiválasztása", description: "Húzd be vagy tallózd ki a PDF-be illesztendő képeket." },
        { title: "2. Sorrend és beállítások", description: "Rendezd a képeket és válaszd ki az oldalméretet, tájolást." },
        { title: "3. PDF létrehozása", description: "Kattints a gombra – az eszköz egyetlen PDF-et generál a képekből." },
      ],
      useCases: [
        { icon: "📸", title: "Fotóalbum", description: "Nyaralási vagy rendezvényfotók rendezett PDF albumba gyűjtése." },
        { icon: "📋", title: "Dokumentum archiválás", description: "Szkennelt dokumentumképek egyetlen PDF-be rendezése." },
        { icon: "🎨", title: "Portfólió", description: "Grafikai vagy fotós munkák bemutatásához egységes PDF portfólió." },
      ],
      aboutSection: {
        title: "Képek PDF-be konvertálása",
        paragraphs: [
          "A képekből PDF készítés ideális megoldás, ha több képet szeretnél egyetlen, könnyen megosztható fájlban összefogni.",
          "Az oldalméretek és tájolás testreszabásával professzionális megjelenésű dokumentumot hozhatsz létre.",
        ],
      },
      tips: [
        { icon: "🔢", tip: "Rendezd sorba a képeket az összeillesztés előtt a logikus dokumentumszerkezet érdekében." },
        { icon: "📏", tip: "A4 oldalméretet válaszd, ha nyomtatni is szeretnéd a kész PDF-et." },
        { icon: "🖼️", tip: "A nagyobb felbontású képek szebb eredményt adnak a PDF-ben." },
      ],
    },
  },

  // ─── 9. PDF információ ─────────────────────────────────────────────────────
  "pdf-informacio": {
    introText:
      "Tekintsd meg a PDF fájlod részletes metaadatait: oldalszám, fájlméret, szerző, létrehozás dátuma, PDF verzió és egyéb tulajdonságok. Minden adat a böngésződben kerül kiolvasásra.",
    guide: [
      "1. Töltsd be a PDF fájlt.",
      "2. Az eszköz automatikusan megjeleníti a fájl metaadatait.",
      "3. Másold ki a szükséges információkat.",
    ],
    faq: [
      { q: "Mire jó a PDF információ?", a: "PDF fájlok metaadatainak (oldalszám, méret, szerző, dátum, verzió) gyors megtekintésére szolgál." },
      { q: "Biztonságos az adataim szempontjából?", a: "Igen, a fájl kizárólag a böngésződben kerül elemzésre." },
      { q: "Milyen adatokat jeleníti meg?", a: "Oldalszám, fájlméret, oldalméretek, PDF verzió, szerző, létrehozó program, létrehozás és módosítás dátuma." },
      { q: "Módosíthatom a metaadatokat?", a: "Ez az eszköz csak olvasásra szolgál – a metaadatokat nem módosítja." },
      { q: "Mobilon is használhatom?", a: "Igen, az eszköz mobilon is teljes funkcionalitással működik." },
      { q: "Jelszóval védett PDF-ek is elemezhetők?", a: "Az alapvető metaadatok (méret, oldalszám) jelszóval védett fájloknál is kiolvashatók lehetnek." },
    ],
    content: {
      howToSteps: [
        { title: "1. PDF betöltése", description: "Válaszd ki a PDF fájlt, amelynek metaadatait meg szeretnéd tekinteni." },
        { title: "2. Adatok megtekintése", description: "Az eszköz automatikusan kiolvassa és megjeleníti a fájl tulajdonságait." },
        { title: "3. Információk másolása", description: "Másold ki a szükséges adatokat a vágólapra." },
      ],
      useCases: [
        { icon: "🔍", title: "Dokumentum ellenőrzés", description: "PDF verziójának és tulajdonságainak gyors ellenőrzése." },
        { icon: "📋", title: "Archiválási metaadatok", description: "Dokumentumok archiválásakor a metaadatok rögzítése." },
        { icon: "🛠️", title: "Hibaelhárítás", description: "PDF megjelenítési problémák diagnosztizálása a verzió és létrehozó program alapján." },
      ],
      aboutSection: {
        title: "PDF metaadatok",
        paragraphs: [
          "A PDF fájlok rejtett metaadatokat tartalmaznak: szerzőt, létrehozó programot, dátumokat és egyéb technikai információkat.",
          "Ezek az adatok hasznosak dokumentumkezeléshez, archiváláshoz és kompatibilitási problémák felderítéséhez.",
        ],
      },
      tips: [
        { icon: "📊", tip: "Ellenőrizd a PDF verziót, ha kompatibilitási problémát tapasztalsz egy olvasóban." },
        { icon: "📅", tip: "A létrehozás dátuma hasznos lehet dokumentumok kronológiai rendezéséhez." },
        { icon: "📐", tip: "Az oldalméret információ segít a nyomtatási beállítások megválasztásában." },
      ],
    },
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// EXCEL (4 tool)
// ═══════════════════════════════════════════════════════════════════════════════

export const EXCEL_CONTENT: ContentMap = {
  // ─── 1. XLSX → CSV ─────────────────────────────────────────────────────────
  "xlsx-csv": {
    introText:
      "Alakítsd át Excel (XLSX) fájlodat CSV formátumba, közvetlenül a böngészőben. A konvertálás gyors, biztonságos, és nem igényel Excel telepítést.",
    guide: [
      "1. Töltsd be az XLSX fájlt.",
      "2. Válaszd ki a konvertálandó munkalapot, ha több van.",
      "3. Kattints a «Konvertálás» gombra – a CSV fájl azonnal letölthető.",
    ],
    faq: [
      { q: "Mire jó az XLSX CSV-vé alakítás?", a: "Excel táblázatok egyszerű, szöveges CSV formátumba konvertálására szolgál, ami szinte minden programban megnyitható." },
      { q: "Biztonságos az adataim szempontjából?", a: "Igen, a fájl nem kerül szerverre, minden a böngészőben történik." },
      { q: "Mi történik a formázással?", a: "A CSV csak nyers adatot tartalmaz – a formázás (színek, betűtípusok, cellaszélesség) nem kerül át." },
      { q: "Több munkalapot is konvertálhatok?", a: "Igen, kiválaszthatod, melyik munkalapot vagy az összeset külön CSV fájlokba konvertálod." },
      { q: "Mobilon is használhatom?", a: "Igen, az eszköz reszponzív, mobilon is működik." },
      { q: "Milyen elválasztójelet használ a CSV?", a: "Alapértelmezetten vesszőt, de választhatsz pontosvesszőt vagy tabulátort is." },
    ],
    content: {
      howToSteps: [
        { title: "1. XLSX betöltése", description: "Válaszd ki vagy húzd be az Excel fájlt." },
        { title: "2. Munkalap kiválasztása", description: "Ha több munkalap van, válaszd ki a konvertálandót." },
        { title: "3. Konvertálás és letöltés", description: "Kattints a konvertálás gombra és töltsd le a CSV fájlt." },
      ],
      useCases: [
        { icon: "📊", title: "Adatimport", description: "CSV-t szinte minden adatbázis és szoftver képes importálni." },
        { icon: "🔄", title: "Rendszerek közötti átvitel", description: "Excel adatok átvitele más rendszerbe CSV-n keresztül." },
        { icon: "📈", title: "Adatelemzés", description: "CSV fájlok betöltése Python, R vagy más elemző eszközbe." },
      ],
      formatComparison: {
        title: "XLSX vs CSV vs JSON összehasonlítás",
        columns: ["Tulajdonság", "XLSX", "CSV", "JSON"],
        rows: [
          { feature: "Formázás", values: ["Igen", "Nem", "Nem"] },
          { feature: "Több munkalap", values: ["Igen", "Nem", "Nem"] },
          { feature: "Fájlméret", values: ["Közepes", "Kicsi", "Közepes"] },
          { feature: "Univerzális olvashatóság", values: ["Excel kell", "Bármivel", "Bármivel"] },
          { feature: "Képletek", values: ["Igen", "Nem", "Nem"] },
        ],
      },
      aboutSection: {
        title: "Az XLSX és CSV formátumokról",
        paragraphs: [
          "Az XLSX az Excel natív formátuma, amely formázást, képleteket és több munkalapot is támogat. A CSV egyszerű szöveges formátum, vesszővel elválasztott értékekkel.",
          "A CSV előnye az univerzális kompatibilitás: szinte minden szoftver képes olvasni, míg az XLSX Excel-t vagy kompatibilis programot igényel.",
        ],
      },
      tips: [
        { icon: "📋", tip: "Ellenőrizd az eredményt, ha a táblázat speciális karaktereket (vessző, idézőjel) tartalmaz." },
        { icon: "🔢", tip: "A képletekből csak az értékek kerülnek a CSV-be, nem a képletek maguk." },
        { icon: "📝", tip: "Magyar adatoknál a pontosvessző elválasztó lehet praktikusabb, mivel a magyar tizedesjel vessző." },
      ],
    },
  },

  // ─── 2. XLSX → JSON ────────────────────────────────────────────────────────
  "xlsx-json": {
    introText:
      "Konvertáld az Excel táblázatodat JSON formátumba, hogy könnyedén felhasználhasd API-kban, adatbázisokban vagy webfejlesztésben. A feldolgozás a böngészőben történik.",
    guide: [
      "1. Töltsd be az XLSX fájlt.",
      "2. Válaszd ki a munkalapot és az átalakítási beállításokat.",
      "3. Kattints a «Konvertálás» gombra – a JSON azonnal megjelenik és letölthető.",
    ],
    faq: [
      { q: "Mire jó az XLSX JSON-ná alakítás?", a: "Excel adatok strukturált JSON formátumba konvertálására szolgál, ami ideális webfejlesztéshez és API integrációkhoz." },
      { q: "Biztonságos az adataim szempontjából?", a: "Igen, a fájl kizárólag a böngészőben kerül feldolgozásra." },
      { q: "Hogyan lesz a táblázatból JSON?", a: "Az első sor oszlopnevei lesznek a JSON kulcsok, a további sorok pedig az értékek." },
      { q: "Kezeli az üres cellákat?", a: "Igen, az üres cellák null értékként jelennek meg a JSON-ban." },
      { q: "Mobilon is használhatom?", a: "Igen, mobilon is teljes funkcionalitással működik." },
      { q: "Több munkalapot is konvertálhatok?", a: "Igen, minden munkalap külön JSON objektumként exportálható." },
    ],
    content: {
      howToSteps: [
        { title: "1. XLSX betöltése", description: "Válaszd ki az Excel fájlt a gépedről." },
        { title: "2. Beállítások", description: "Válaszd ki a munkalapot és az átalakítási opciókat." },
        { title: "3. JSON letöltése", description: "A konvertált JSON-t másold ki vagy töltsd le fájlként." },
      ],
      useCases: [
        { icon: "🌐", title: "Webfejlesztés", description: "Excel adatok felhasználása webalkalmazásokban JSON-ként." },
        { icon: "🔗", title: "API integráció", description: "Táblázatos adatok JSON formátumba alakítása API hívásokhoz." },
        { icon: "💾", title: "NoSQL adatbázis", description: "Adatok előkészítése MongoDB vagy más NoSQL adatbázisba importáláshoz." },
      ],
      aboutSection: {
        title: "XLSX és JSON",
        paragraphs: [
          "A JSON a webfejlesztés és az API-k lingua francája – az Excel adatok JSON-ba alakításával közvetlenül felhasználhatod őket alkalmazásokban.",
          "Az átalakítás során az Excel táblázat sorai JSON objektumokká válnak, ahol a fejlécek adják a kulcsokat.",
        ],
      },
      tips: [
        { icon: "📋", tip: "Győződj meg róla, hogy az első sor egyedi oszlopneveket tartalmaz – ezek lesznek a JSON kulcsok." },
        { icon: "🔤", tip: "Kerüld a szóközöket és speciális karaktereket az oszlopnevekben a tisztább JSON érdekében." },
        { icon: "📊", tip: "Ellenőrizd az adattípusokat: a JSON-ban a számok és szövegek automatikusan elkülönülnek." },
      ],
    },
  },

  // ─── 3. CSV → XLSX ─────────────────────────────────────────────────────────
  "csv-xlsx": {
    introText:
      "Alakítsd a CSV fájlodat Excel (XLSX) formátumba, közvetlenül a böngészőben. A konvertálás után Excelben szerkesztheted, formázhatod és diagramokat készíthetsz.",
    guide: [
      "1. Töltsd be a CSV fájlt.",
      "2. Ellenőrizd az előnézetben, hogy az adatok helyesen jelennek meg.",
      "3. Kattints a «Konvertálás» gombra – az XLSX fájl azonnal letölthető.",
    ],
    faq: [
      { q: "Mire jó a CSV XLSX-szé alakítás?", a: "CSV fájlok Excel formátumba konvertálására szolgál, ahol formázást, képleteket és diagramokat adhatsz hozzá." },
      { q: "Biztonságos az adataim szempontjából?", a: "Igen, a feldolgozás teljes egészében a böngésződben történik." },
      { q: "Milyen elválasztójeleket ismer fel?", a: "Automatikusan felismeri a vesszőt, pontosvesszőt és tabulátort." },
      { q: "Megmarad az ékezetes szöveg?", a: "Igen, az UTF-8 kódolást támogatja, az ékezetes karakterek helyesen jelennek meg." },
      { q: "Mobilon is használhatom?", a: "Igen, mobilon is elérhető és működik." },
      { q: "Kell Excel az XLSX megnyitásához?", a: "Megnyitható Excelben, Google Sheets-ben és LibreOffice Calc-ban is." },
    ],
    content: {
      howToSteps: [
        { title: "1. CSV betöltése", description: "Válaszd ki vagy húzd be a CSV fájlt." },
        { title: "2. Előnézet ellenőrzése", description: "Győződj meg róla, hogy az adatok és az oszlopok helyesen jelennek meg." },
        { title: "3. XLSX letöltése", description: "Konvertálás után töltsd le az Excel fájlt." },
      ],
      useCases: [
        { icon: "📊", title: "Adatformázás", description: "CSV adatok formázása, színezése Excelben a jobb áttekinthetőségért." },
        { icon: "📈", title: "Diagramkészítés", description: "CSV adatokból diagramok és grafikonok készítése Excelben." },
        { icon: "🔄", title: "Adatcsere", description: "Más rendszerből exportált CSV konvertálása Excel formátumba további feldolgozáshoz." },
      ],
      aboutSection: {
        title: "CSV-ből Excel",
        paragraphs: [
          "A CSV egy egyszerű szöveges formátum, amelyhez az Excel formátum formázást, képleteket és vizualizációs lehetőségeket ad.",
          "A konvertálás révén a nyers adatok professzionálisan formázott táblázatba kerülhetnek, diagramokkal és pivot táblákkal kiegészítve.",
        ],
      },
      tips: [
        { icon: "📋", tip: "Ellenőrizd az előnézetben az adatok helyességét, mielőtt konvertálsz." },
        { icon: "🔢", tip: "Ha a számok szövegként jelennek meg, az elválasztójel beállítás segíthet." },
        { icon: "🌍", tip: "Magyar CSV fájloknál gyakori a pontosvessző elválasztó – az eszköz automatikusan felismeri." },
      ],
    },
  },

  // ─── 4. XLSX megtekintő ────────────────────────────────────────────────────
  "xlsx-megtekinto": {
    introText:
      "Tekintsd meg az Excel (XLSX) fájljaid tartalmát közvetlenül a böngészőben, Excel telepítése nélkül. Gyors előnézet munkalapokkal, szűréssel és kereséssel.",
    guide: [
      "1. Töltsd be az XLSX fájlt.",
      "2. Válts a munkalapok között a füleken.",
      "3. Használd a keresést és szűrést az adatok böngészéséhez.",
    ],
    faq: [
      { q: "Mire jó az XLSX megtekintő?", a: "Excel fájlok gyors megtekintésére szolgál a böngészőben, Excel telepítése nélkül." },
      { q: "Biztonságos az adataim szempontjából?", a: "Igen, a fájl kizárólag a böngésződben nyílik meg." },
      { q: "Szerkeszthetem is a fájlt?", a: "Az eszköz csak megtekintésre szolgál, szerkesztéshez Excel vagy Google Sheets ajánlott." },
      { q: "Támogatja a több munkalapot?", a: "Igen, az összes munkalap elérhető fülekként a megtekintőben." },
      { q: "Mobilon is használhatom?", a: "Igen, reszponzív felülettel mobilon is kényelmesen megtekintheted a táblázatokat." },
      { q: "Megjelennek a képletek eredményei?", a: "Igen, a képletek helyén a kiszámított értékek jelennek meg." },
    ],
    content: {
      howToSteps: [
        { title: "1. XLSX betöltése", description: "Válaszd ki az Excel fájlt a gépedről." },
        { title: "2. Adatok megtekintése", description: "Böngészd a táblázatot, válts munkalapok között." },
        { title: "3. Keresés és szűrés", description: "Használd a beépített keresőt az adatok gyors megtalálásához." },
      ],
      useCases: [
        { icon: "👀", title: "Gyors előnézet", description: "Excel fájl tartalmának ellenőrzése Excel telepítése nélkül." },
        { icon: "📱", title: "Mobil megtekintés", description: "Excel fájlok böngészése telefonon vagy tableten." },
        { icon: "🔍", title: "Adatkeresés", description: "Konkrét adatok gyors megtalálása nagy táblázatokban." },
      ],
      aboutSection: {
        title: "Excel megtekintő a böngészőben",
        paragraphs: [
          "Az XLSX megtekintő lehetővé teszi Excel fájlok böngészését és keresését közvetlenül a böngészőben, külön szoftver telepítése nélkül.",
          "Ideális, ha csak meg szeretnéd tekinteni egy táblázat tartalmát, például egy e-mailben kapott melléklet gyors ellenőrzéséhez.",
        ],
      },
      tips: [
        { icon: "🔍", tip: "Használd a Ctrl+F (Cmd+F) billentyűkombinációt a gyors kereséshez a táblázatban." },
        { icon: "📑", tip: "Több munkalap esetén a fülekre kattintva válthatsz közöttük." },
        { icon: "📊", tip: "A megtekintőben az oszlopok átméretezhetők a jobb áttekinthetőség érdekében." },
      ],
    },
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// MARKDOWN (1 tool)
// ═══════════════════════════════════════════════════════════════════════════════

export const MARKDOWN_CONTENT: ContentMap = {
  // ─── 1. Markdown → HTML ────────────────────────────────────────────────────
  "markdown-html": {
    introText:
      "Alakítsd a Markdown szövegedet HTML kóddá valós idejű előnézettel. A konvertálás azonnal történik a böngészőben – ideális blogbejegyzésekhez, dokumentációhoz és webes tartalmakhoz.",
    guide: [
      "1. Illeszd be vagy írd be a Markdown szöveget a bal oldali szerkesztőbe.",
      "2. A HTML előnézet és a kód azonnal megjelenik a jobb oldalon.",
      "3. Másold ki a HTML kódot vagy töltsd le fájlként.",
    ],
    faq: [
      { q: "Mire jó a Markdown HTML-lé alakítás?", a: "Markdown formázott szöveg HTML kóddá konvertálására szolgál, amelyet weboldalakba, blogokba illeszthetsz." },
      { q: "Biztonságos az adataim szempontjából?", a: "Igen, a konvertálás kizárólag a böngésződben történik." },
      { q: "Milyen Markdown szintaxist támogat?", a: "A teljes CommonMark szabványt, kiegészítve GFM (GitHub Flavored Markdown) elemekkel: táblázatok, feladatlisták, kódblokkokkal." },
      { q: "Valós időben frissül az előnézet?", a: "Igen, gépelés közben azonnal frissül a HTML kimenet és az előnézet." },
      { q: "Mobilon is használhatom?", a: "Igen, az eszköz reszponzív felülettel mobilon is működik." },
      { q: "Testreszabhatom a HTML kimenetet?", a: "A nyers HTML kódot kapod, amelyet tetszés szerint stílusozhatsz CSS-sel." },
    ],
    content: {
      howToSteps: [
        { title: "1. Markdown beírása", description: "Illeszd be vagy írd be a Markdown szöveget a szerkesztőbe." },
        { title: "2. Előnézet megtekintése", description: "Valós időben látod a formázott előnézetet és a HTML kódot." },
        { title: "3. HTML kód másolása", description: "Másold ki a generált HTML-t a vágólapra vagy töltsd le fájlként." },
      ],
      useCases: [
        { icon: "📝", title: "Blogbejegyzések", description: "Markdown-ban írt blogcikkek HTML-lé alakítása weboldalhoz." },
        { icon: "📖", title: "Dokumentáció", description: "Technikai dokumentáció konvertálása webes megjelenítéshez." },
        { icon: "📧", title: "Hírlevelek", description: "Markdown tartalom HTML-lé alakítása e-mail hírlevelekhez." },
        { icon: "🎓", title: "Oktatási anyagok", description: "Tananyagok formázott HTML változatának elkészítése." },
      ],
      aboutSection: {
        title: "A Markdown és a HTML",
        paragraphs: [
          "A Markdown egy könnyű jelölőnyelv, amelyet John Gruber alkotott 2004-ben. Egyszerű szintaxisával gyorsan írhatunk formázott szöveget, amit aztán HTML-lé alakíthatunk.",
          "A HTML a web alapnyelve – a Markdown konvertálásával a tartalmad bármely weboldalon megjeleníthető, miközben az írás közben élvezheted a Markdown egyszerűségét.",
        ],
      },
      tips: [
        { icon: "📋", tip: "Használj fejléceket (#, ##, ###) a tartalom logikus strukturálásához." },
        { icon: "💻", tip: "Kódblokkok jelöléséhez használj hármas backtick-et (```) a nyelv megadásával." },
        { icon: "🔗", tip: "Linkek szintaxisa: [szöveg](URL) – egyszerű és gyors." },
        { icon: "📊", tip: "GFM táblázatokat is használhatsz: | fejléc | fejléc | formátumban." },
      ],
    },
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// HTML (2 tool)
// ═══════════════════════════════════════════════════════════════════════════════

export const HTML_CONTENT: ContentMap = {
  // ─── 1. HTML szöveggé ──────────────────────────────────────────────────────
  "html-szovegge": {
    introText:
      "Távolítsd el a HTML tageket és kinyerd a tiszta szöveget a HTML kódból. Ideális weboldalak tartalmának szöveges formába mentéséhez, a böngészőben történő azonnali feldolgozással.",
    guide: [
      "1. Illeszd be a HTML kódot a beviteli mezőbe.",
      "2. Kattints az «Átalakítás» gombra.",
      "3. Másold ki a tiszta szöveget vagy töltsd le .txt fájlként.",
    ],
    faq: [
      { q: "Mire jó a HTML szöveggé alakítás?", a: "HTML kódból a tagek eltávolítására és a tiszta szövegtartalom kinyerésére szolgál." },
      { q: "Biztonságos az adataim szempontjából?", a: "Igen, a feldolgozás a böngészőben történik, semmilyen adat nem kerül szerverre." },
      { q: "Mi történik a linkekkel és képekkel?", a: "A linkek szövege megmarad, a képek alt szövege kinyerhető – a HTML tagek és attribútumok eltávolításra kerülnek." },
      { q: "Megmaradnak a sortörések?", a: "Igen, a bekezdések és sortörések megtartásra kerülnek az olvashatóság érdekében." },
      { q: "Mobilon is használhatom?", a: "Igen, az eszköz minden modern böngészőben működik." },
      { q: "Kezeli a speciális HTML entitásokat?", a: "Igen, az entitások (pl. &amp;, &lt;) normál karakterekké alakulnak." },
    ],
    content: {
      howToSteps: [
        { title: "1. HTML beillesztése", description: "Másold be a HTML kódot a beviteli mezőbe." },
        { title: "2. Szöveg kinyerése", description: "Kattints az átalakítás gombra a tagek eltávolításához." },
        { title: "3. Eredmény másolása", description: "A tiszta szöveget kimásolhatod vagy letöltheted." },
      ],
      useCases: [
        { icon: "📄", title: "Tartalom kinyerés", description: "Weboldal szöveges tartalmának kimentése HTML tagek nélkül." },
        { icon: "📋", title: "Szöveg tisztítás", description: "E-mailből vagy webről másolt szöveg formázásának eltávolítása." },
        { icon: "🔍", title: "Szövegelemzés", description: "HTML-mentes szöveg előkészítése elemzéshez vagy feldolgozáshoz." },
      ],
      aboutSection: {
        title: "HTML szöveggé konvertálás",
        paragraphs: [
          "A HTML szöveggé alakítás eltávolítja a jelölőnyelvi elemeket, és meghagyja a puszta szöveges tartalmat olvasható formában.",
          "Hasznos, ha webes tartalmat szöveges formába szeretnéd menteni, vagy HTML-mentes szövegre van szükséged feldolgozáshoz.",
        ],
      },
      tips: [
        { icon: "📝", tip: "Az eredményt .txt fájlként mentheted az egyszerű archiválás érdekében." },
        { icon: "🔗", tip: "A linkek URL-jei is kinyerhetők, ha szükséges." },
        { icon: "📋", tip: "A felesleges szóközök és üres sorok automatikusan csökkentésre kerülnek." },
      ],
    },
  },

  // ─── 2. HTML minifikálás ───────────────────────────────────────────────────
  "html-minimalas-html": {
    introText:
      "Csökkentsd a HTML kódod méretét a felesleges szóközök, kommentek és sortörések eltávolításával. Gyorsabb weboldal-betöltést érhetsz el, és az egész a böngésződben történik.",
    guide: [
      "1. Illeszd be a HTML kódot a beviteli mezőbe.",
      "2. Kattints a «Minifikálás» gombra.",
      "3. Másold ki a tömörített HTML-t vagy töltsd le fájlként.",
    ],
    faq: [
      { q: "Mire jó a HTML minifikálás?", a: "HTML kód méretének csökkentésére szolgál a felesleges whitespace, kommentek és sortörések eltávolításával." },
      { q: "Biztonságos az adataim szempontjából?", a: "Igen, a feldolgozás teljes egészében a böngészőben történik." },
      { q: "Változik a weboldal megjelenése?", a: "Nem, a minifikálás csak a forráskódot tömöríti – a megjelenés és funkcionalitás változatlan marad." },
      { q: "Mennyivel lesz kisebb a kód?", a: "Jellemzően 10-30%-os méretcsökkentés érhető el a HTML komplexitásától függően." },
      { q: "Mobilon is használhatom?", a: "Igen, az eszköz mobilon is működik." },
      { q: "Visszaalakítható a minifikált HTML?", a: "A HTML prettify eszközökkel újraformázható, de a kommentek nem állíthatók vissza." },
    ],
    content: {
      howToSteps: [
        { title: "1. HTML beillesztése", description: "Másold be a minifikálandó HTML kódot." },
        { title: "2. Minifikálás", description: "Kattints a gombra a felesleges karakterek eltávolításához." },
        { title: "3. Eredmény másolása", description: "Másold ki a tömörített HTML-t vagy töltsd le." },
      ],
      useCases: [
        { icon: "🚀", title: "Weboldal gyorsítás", description: "Kisebb HTML fájl gyorsabb oldalbetöltést eredményez." },
        { icon: "📡", title: "Sávszélesség csökkentés", description: "Tömörebb HTML kevesebb adatforgalmat generál." },
        { icon: "⚡", title: "Production deploy", description: "HTML kód optimalizálása éles környezetbe történő telepítés előtt." },
      ],
      aboutSection: {
        title: "HTML minifikálás",
        paragraphs: [
          "A HTML minifikálás eltávolítja a forráskódból a felesleges whitespace karaktereket, kommenteket és opcionális lezáró tageket, csökkentve a fájlméretet.",
          "A kisebb HTML fájl gyorsabb oldalbetöltést és jobb felhasználói élményt eredményez, különösen lassabb kapcsolatokon.",
        ],
      },
      tips: [
        { icon: "💡", tip: "Kombináld a HTML minifikálást CSS és JS minifikálással a maximális hatás érdekében." },
        { icon: "📦", tip: "Gzip tömörítéssel együtt még nagyobb méretcsökkentés érhető el." },
        { icon: "🔄", tip: "Mindig őrizd meg az eredeti, formázott forráskódot is a szerkeszthetőség érdekében." },
      ],
    },
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// FÁJL (4 tool)
// ═══════════════════════════════════════════════════════════════════════════════

export const FAJL_CONTENT: ContentMap = {
  // ─── 1. ZIP készítő ────────────────────────────────────────────────────────
  "zip-keszito": {
    introText:
      "Készíts ZIP archívumot a fájljaidból közvetlenül a böngészőben. Válaszd ki a tömörítendő fájlokat, és egyetlen kattintással letöltheted a ZIP fájlt – szerverre semmi nem kerül.",
    guide: [
      "1. Húzd be vagy válaszd ki a tömörítendő fájlokat.",
      "2. Ellenőrizd a fájllistát és az összesített méretet.",
      "3. Kattints a «ZIP létrehozása» gombra – a ZIP fájl azonnal letölthető.",
    ],
    faq: [
      { q: "Mire jó a ZIP készítő?", a: "Több fájl egyetlen tömörített ZIP archívumba csomagolására szolgál a könnyebb megosztás és archiválás érdekében." },
      { q: "Biztonságos az adataim szempontjából?", a: "Igen, a tömörítés teljes egészében a böngészőben történik." },
      { q: "Milyen fájltípusokat tömöríthetek?", a: "Bármilyen fájltípust: dokumentumokat, képeket, videókat, kódot – nincsen korlátozás." },
      { q: "Mennyivel lesz kisebb a ZIP?", a: "A tömörítés mértéke a fájltípustól függ: szöveges fájlok jelentősen csökkennek, képek és videók kevésbé." },
      { q: "Mobilon is használhatom?", a: "Igen, az eszköz mobilon is elérhető és működik." },
      { q: "Van méretkorlát?", a: "A böngésző memóriája szab határt – jellemzően több száz MB-ig gond nélkül működik." },
    ],
    content: {
      howToSteps: [
        { title: "1. Fájlok kiválasztása", description: "Húzd be vagy tallózd ki a ZIP-be csomagolandó fájlokat." },
        { title: "2. Fájllista ellenőrzése", description: "Ellenőrizd a kiválasztott fájlokat és azok összméretét." },
        { title: "3. ZIP létrehozása és letöltése", description: "Kattints a gombra – a ZIP azonnal letölthető." },
      ],
      useCases: [
        { icon: "📧", title: "E-mail melléklet", description: "Több fájl egyetlen ZIP-be csomagolása e-mail küldéshez." },
        { icon: "📦", title: "Archiválás", description: "Projektfájlok rendezett archívumba csomagolása megőrzésre." },
        { icon: "📤", title: "Fájlmegosztás", description: "Egyetlen ZIP fájl megosztása több különálló fájl helyett." },
      ],
      aboutSection: {
        title: "A ZIP formátumról",
        paragraphs: [
          "A ZIP a legelterjedtebb tömörített archívum formátum, amelyet szinte minden operációs rendszer natívan támogat.",
          "A ZIP formátum a DEFLATE algoritmust használja, ami jó egyensúlyt biztosít a tömörítési arány és a sebesség között.",
        ],
      },
      tips: [
        { icon: "📝", tip: "Szöveges fájlok (TXT, CSV, JSON) esetén a legnagyobb a tömörítési arány." },
        { icon: "🖼️", tip: "Már tömörített fájlok (JPG, MP4) esetén a ZIP mérete alig csökken." },
        { icon: "📂", tip: "Adj értelmes nevet a ZIP fájlnak a könnyebb azonosítás érdekében." },
      ],
    },
  },

  // ─── 2. ZIP kibontó ────────────────────────────────────────────────────────
  "zip-kibonto": {
    introText:
      "Bontsd ki a ZIP archívumok tartalmát közvetlenül a böngészőben, szoftvertelepítés nélkül. Tekintsd meg a fájllistát és töltsd le a kívánt fájlokat egyenként vagy egyszerre.",
    guide: [
      "1. Töltsd be a ZIP fájlt az eszközbe.",
      "2. Tekintsd meg az archívum tartalmát a fájllistában.",
      "3. Töltsd le a kívánt fájlokat egyenként vagy az összeset egyszerre.",
    ],
    faq: [
      { q: "Mire jó a ZIP kibontó?", a: "ZIP archívumok tartalmának megtekintésére és kibontására szolgál közvetlenül a böngészőben." },
      { q: "Biztonságos az adataim szempontjából?", a: "Igen, a kibontás a böngészőben történik, a fájl nem kerül szerverre." },
      { q: "Milyen archívum formátumokat támogat?", a: "Elsősorban ZIP formátumot, beleértve a tömörített és tömörítetlen változatokat." },
      { q: "Jelszóval védett ZIP-eket is kibontja?", a: "A jelszóval védett archívumok kezelése korlátozottan támogatott." },
      { q: "Mobilon is használhatom?", a: "Igen, mobilon is teljes funkcionalitással működik." },
      { q: "Mekkora ZIP-eket tudok kibontani?", a: "A böngésző memóriájától függően jellemzően több száz MB-os archívumok is kezelhetők." },
    ],
    content: {
      howToSteps: [
        { title: "1. ZIP betöltése", description: "Válaszd ki vagy húzd be a kibontandó ZIP fájlt." },
        { title: "2. Tartalom megtekintése", description: "Böngészd a ZIP archívum fájllistáját és mappáit." },
        { title: "3. Fájlok letöltése", description: "Töltsd le a kívánt fájlokat egyenként vagy az összeset." },
      ],
      useCases: [
        { icon: "📥", title: "Melléklet kibontás", description: "E-mailben kapott ZIP mellékletek gyors kibontása." },
        { icon: "👀", title: "Tartalom előnézet", description: "ZIP archívum tartalmának megtekintése a teljes kibontás nélkül." },
        { icon: "📱", title: "Mobil kibontás", description: "ZIP fájlok kibontása telefonon, külön alkalmazás nélkül." },
      ],
      aboutSection: {
        title: "ZIP kibontás a böngészőben",
        paragraphs: [
          "A böngészőben történő ZIP kibontás kényelmes megoldás, ha nincs telepítve archiváló szoftver, vagy mobil eszközről szeretnéd megtekinteni egy archívum tartalmát.",
          "Az eszköz a fájllistát és a mappákat is megjeleníti, így szelektíven töltheted le a szükséges fájlokat.",
        ],
      },
      tips: [
        { icon: "📋", tip: "Először tekintsd meg a fájllistát, mielőtt az egészet kibontanád." },
        { icon: "📁", tip: "A mappák struktúrája megmarad a kibontás során." },
        { icon: "💾", tip: "Egyenként is letölthetsz fájlokat, ha nem az egész archívumra van szükséged." },
      ],
    },
  },

  // ─── 3. Hash ellenőrző ─────────────────────────────────────────────────────
  "hash-ellenorzo": {
    introText:
      "Számítsd ki fájljaid hash értékét (MD5, SHA-1, SHA-256) közvetlenül a böngészőben. Ellenőrizd a letöltött fájlok integritását – a fájl sosem hagyja el a gépedet.",
    guide: [
      "1. Töltsd be a fájlt, amelynek hash értékét szeretnéd kiszámítani.",
      "2. Válaszd ki a hash algoritmust (MD5, SHA-1, SHA-256).",
      "3. Az eredmény azonnal megjelenik – hasonlítsd össze az elvárt értékkel.",
    ],
    faq: [
      { q: "Mire jó a hash ellenőrző?", a: "Fájlok hash értékének kiszámítására szolgál az integritás ellenőrzéséhez, azaz annak igazolásához, hogy a fájl nem módosult." },
      { q: "Biztonságos az adataim szempontjából?", a: "Igen, a hash számítás teljes egészében a böngészőben történik." },
      { q: "Milyen hash algoritmusokat támogat?", a: "MD5, SHA-1 és SHA-256 algoritmusokat." },
      { q: "Mi az a hash érték?", a: "Egyedi digitális ujjlenyomat – ha a fájl egyetlen bitje is megváltozik, a hash teljesen más lesz." },
      { q: "Mobilon is használhatom?", a: "Igen, mobilon is teljes funkcionalitással működik." },
      { q: "Melyik hash algoritmust válasszam?", a: "SHA-256 a legbiztonságosabb. MD5 és SHA-1 elavultnak számítanak, de integritás-ellenőrzésre még használhatók." },
    ],
    content: {
      howToSteps: [
        { title: "1. Fájl kiválasztása", description: "Válaszd ki a fájlt, amelynek hash értékét ki szeretnéd számítani." },
        { title: "2. Algoritmus kiválasztása", description: "Válassz MD5, SHA-1 vagy SHA-256 közül." },
        { title: "3. Hash összehasonlítás", description: "Hasonlítsd össze a kapott hash-t az elvárt értékkel." },
      ],
      useCases: [
        { icon: "✅", title: "Letöltés ellenőrzés", description: "Letöltött fájl sértetlenségének igazolása a megadott hash alapján." },
        { icon: "🔒", title: "Biztonsági ellenőrzés", description: "Fájl integritásának vizsgálata módosítás-gyanú esetén." },
        { icon: "📁", title: "Duplikátum keresés", description: "Azonos hash-ű fájlok azonosítása duplikátumok felderítéséhez." },
      ],
      aboutSection: {
        title: "A hash ellenőrzésről",
        paragraphs: [
          "A hash függvény egy tetszőleges méretű adatból fix hosszúságú egyedi karakterláncot (hash-t) állít elő, amely a fájl digitális ujjlenyomata.",
          "A hash ellenőrzés a leggyakoribb módja annak igazolásának, hogy egy letöltött fájl sértetlen és nem módosult az átvitel során.",
        ],
      },
      tips: [
        { icon: "🔐", tip: "SHA-256 a legjobb választás az integritás-ellenőrzésre – 256 bites biztonságot nyújt." },
        { icon: "📋", tip: "Másold ki a hash értéket a vágólapra a pontos összehasonlításhoz." },
        { icon: "⚠️", tip: "MD5 és SHA-1 ütközés-támadásra érzékeny – biztonsági célra SHA-256-ot használj." },
      ],
    },
  },

  // ─── 4. Fájl információ ────────────────────────────────────────────────────
  "fajl-informacio": {
    introText:
      "Tekintsd meg bármilyen fájl részletes adatait: méret, típus, MIME típus, utolsó módosítás dátuma. Minden adat a böngésződben kerül kiolvasásra, a fájl nem hagyja el a gépedet.",
    guide: [
      "1. Húzd be vagy válaszd ki a fájlt.",
      "2. Az eszköz automatikusan megjeleníti a fájl részletes adatait.",
      "3. Másold ki a szükséges információkat.",
    ],
    faq: [
      { q: "Mire jó a fájl információ?", a: "Fájlok részletes adatainak (méret, típus, MIME, dátum) gyors megtekintésére szolgál." },
      { q: "Biztonságos az adataim szempontjából?", a: "Igen, a fájl kizárólag a böngészőben kerül elemzésre." },
      { q: "Milyen adatokat jeleníti meg?", a: "Fájlnév, méret, MIME típus, kiterjesztés, utolsó módosítás dátuma." },
      { q: "Bármilyen fájltípussal működik?", a: "Igen, az eszköz bármilyen fájl alapvető metaadatait képes megjeleníteni." },
      { q: "Mobilon is használhatom?", a: "Igen, mobilon is működik." },
      { q: "Módosítja a fájlt?", a: "Nem, az eszköz kizárólag olvassa a fájl adatait, semmit nem módosít." },
    ],
    content: {
      howToSteps: [
        { title: "1. Fájl kiválasztása", description: "Húzd be vagy tallózd ki a fájlt." },
        { title: "2. Adatok megtekintése", description: "Az eszköz automatikusan megjeleníti a fájl összes elérhető adatát." },
        { title: "3. Információk másolása", description: "Másold ki a szükséges adatokat." },
      ],
      useCases: [
        { icon: "📊", title: "Méret ellenőrzés", description: "Fájlméret gyors ellenőrzése feltöltés vagy küldés előtt." },
        { icon: "🔍", title: "Típus azonosítás", description: "Ismeretlen fájl típusának és MIME típusának azonosítása." },
        { icon: "📅", title: "Dátum ellenőrzés", description: "Fájl módosítási dátumának megtekintése." },
      ],
      aboutSection: {
        title: "Fájl metaadatok",
        paragraphs: [
          "Minden fájl tartalmaz metaadatokat: a nevet, méretet, típust és módosítási dátumot, amelyeket a fájlrendszer és a böngésző is kezel.",
          "Ezek az adatok hasznosak a fájlok azonosításához, szűréséhez és rendszerezéséhez.",
        ],
      },
      tips: [
        { icon: "📏", tip: "A fájlméret KB, MB és GB egységekben is megjelenik az áttekinthetőség érdekében." },
        { icon: "📋", tip: "A MIME típus fontos webes feltöltéseknél – az eszköz automatikusan meghatározza." },
        { icon: "📁", tip: "Több fájlt is egymás után ellenőrizhetsz gyors összehasonlításhoz." },
      ],
    },
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// SEO (8 tool)
// ═══════════════════════════════════════════════════════════════════════════════

export const SEO_TOOL_CONTENT: ContentMap = {
  // ─── 1. Title & Meta hossz ellenőrző ───────────────────────────────────────
  "title-meta-hossz": {
    introText:
      "Ellenőrizd a title tag és a meta description hosszát valós időben. Lásd a Google találati előnézetet és kapj azonnali figyelmeztetést, ha a szöveg túl hosszú vagy túl rövid.",
    guide: [
      "1. Írd be vagy illeszd be a title tag szöveget.",
      "2. Írd be a meta description szöveget.",
      "3. Valós időben látod a karakterszámot, a Google előnézetet és a javaslatokat.",
    ],
    faq: [
      { q: "Mire jó a title és meta hossz ellenőrző?", a: "A Google találati oldalon megjelenő title és description szövegek optimális hosszának ellenőrzésére szolgál." },
      { q: "Biztonságos az adataim szempontjából?", a: "Igen, minden a böngésződben fut, semmilyen adat nem kerül szerverre." },
      { q: "Mekkora az ideális title hossz?", a: "50-60 karakter a javasolt – a Google nagyjából ennyi karaktert jelenít meg." },
      { q: "Mekkora az ideális meta description?", a: "120-160 karakter az optimális – ennél hosszabb szöveget a Google levágja." },
      { q: "Mobilon is használhatom?", a: "Igen, az eszköz mobilon is tökéletesen működik." },
      { q: "Pixelben is méri a hosszt?", a: "Igen, a karakter- és pixelhosszt is kijelzi, mivel a Google pixel alapon vág." },
    ],
    content: {
      howToSteps: [
        { title: "1. Title megadása", description: "Írd be a title tag szöveget a beviteli mezőbe." },
        { title: "2. Meta description megadása", description: "Írd be a meta description szöveget." },
        { title: "3. Eredmény ellenőrzése", description: "Figyeld a valós idejű visszajelzést a hosszról és a Google előnézetet." },
      ],
      useCases: [
        { icon: "🔍", title: "SEO optimalizálás", description: "Title és description tökéletesítése a jobb Google megjelenés érdekében." },
        { icon: "📊", title: "Tömeges ellenőrzés", description: "Több oldal title/meta szövegeinek gyors ellenőrzése." },
        { icon: "👀", title: "Google előnézet", description: "Előre láthatod, hogyan fog megjelenni az oldalad a keresőben." },
      ],
      aboutSection: {
        title: "Title és meta description a SEO-ban",
        paragraphs: [
          "A title tag és a meta description a legfontosabb SEO elemek: ezek jelennek meg a Google találati oldalán, és döntően befolyásolják az átkattintási arányt.",
          "Az optimális hosszúság betartása biztosítja, hogy a szöveged nem kerül levágásra a keresési eredményekben.",
        ],
      },
      tips: [
        { icon: "📐", tip: "A title ideális hossza 50-60 karakter, a meta description-é 120-160 karakter." },
        { icon: "🎯", tip: "A legfontosabb kulcsszót mindig a title elejére tedd." },
        { icon: "📱", tip: "Mobilon kevesebb karakter jelenik meg – érdemes a rövidebb verziókat előnyben részesíteni." },
      ],
    },
  },

  // ─── 2. UTM eltávolító ─────────────────────────────────────────────────────
  "utm-eltavolito": {
    introText:
      "Távolítsd el az UTM paramétereket és egyéb nyomkövető kódokat az URL-ekből. Tiszta, megosztásra alkalmas linkeket kapsz – az egész a böngésződben történik.",
    guide: [
      "1. Illeszd be az URL-t a beviteli mezőbe.",
      "2. Az eszköz automatikusan eltávolítja az UTM és nyomkövető paramétereket.",
      "3. Másold ki a tiszta URL-t.",
    ],
    faq: [
      { q: "Mire jó az UTM eltávolító?", a: "URL-ekből az UTM és egyéb nyomkövető paraméterek eltávolítására szolgál a tisztább linkmegosztás érdekében." },
      { q: "Biztonságos az adataim szempontjából?", a: "Igen, a feldolgozás a böngészőben történik." },
      { q: "Mik azok az UTM paraméterek?", a: "URL-hez fűzött nyomkövető kódok (utm_source, utm_medium, utm_campaign), amelyeket a marketing kampányok mérésére használnak." },
      { q: "Az oldal tartalmát befolyásolják az UTM-ek?", a: "Általában nem – az UTM paraméterek csak analitikai célokat szolgálnak." },
      { q: "Mobilon is használhatom?", a: "Igen, mobilon is működik." },
      { q: "Milyen paramétereket távolít el?", a: "UTM paramétereket (utm_source, utm_medium, utm_campaign, utm_term, utm_content) és egyéb elterjedt tracker paramétereket." },
    ],
    content: {
      howToSteps: [
        { title: "1. URL beillesztése", description: "Másold be a nyomkövető paramétereket tartalmazó URL-t." },
        { title: "2. Automatikus tisztítás", description: "Az eszköz azonnal eltávolítja az UTM és tracker paramétereket." },
        { title: "3. Tiszta URL másolása", description: "Másold ki a megtisztított linket." },
      ],
      useCases: [
        { icon: "🔗", title: "Linkmegosztás", description: "Tiszta URL-ek megosztása közösségi médiában vagy e-mailben." },
        { icon: "🛡️", title: "Adatvédelem", description: "Nyomkövető paraméterek eltávolítása a magánélet védelme érdekében." },
        { icon: "📋", title: "Dokumentáció", description: "Tiszta URL-ek használata dokumentációban és prezentációkban." },
      ],
      aboutSection: {
        title: "UTM paraméterek és nyomkövetés",
        paragraphs: [
          "Az UTM paramétereket a Google Analytics és más analitikai eszközök használják a kampányok teljesítményének mérésére.",
          "Megosztáskor érdemes eltávolítani ezeket, mert feleslegesen hosszúvá teszik az URL-t és nyomkövető adatokat tartalmaznak.",
        ],
      },
      tips: [
        { icon: "🔗", tip: "Mindig ellenőrizd, hogy a tisztított URL még helyesen működik-e." },
        { icon: "📋", tip: "Több URL-t is egymás után tisztíthatsz." },
        { icon: "🛡️", tip: "A nyomkövető paraméterek eltávolítása javítja a megosztott linkek adatvédelmét." },
      ],
    },
  },

  // ─── 3. URL normalizáló ────────────────────────────────────────────────────
  "url-normalizalo": {
    introText:
      "Normalizáld az URL-eket egységes formára: kisbetűs host, rendezett paraméterek, trailing slash kezelés. Az egységes URL-ek javítják a SEO-t és elkerülik a duplikált tartalom problémákat.",
    guide: [
      "1. Illeszd be az URL-t a beviteli mezőbe.",
      "2. Az eszköz automatikusan normalizálja az URL-t.",
      "3. Másold ki az egységesített URL-t.",
    ],
    faq: [
      { q: "Mire jó az URL normalizálás?", a: "URL-ek egységes formára hozására szolgál a duplikált tartalom elkerülése és a SEO javítása érdekében." },
      { q: "Biztonságos az adataim szempontjából?", a: "Igen, a feldolgozás a böngészőben történik." },
      { q: "Mit jelent az URL normalizálás?", a: "A host kisbetűsítését, a paraméterek rendezését, a felesleges törtvonal kezelését és az alapértelmezett port eltávolítását." },
      { q: "Miért fontos a SEO szempontjából?", a: "A keresők a különböző formájú URL-eket eltérő oldalnak tekinthetik, ami duplikált tartalmat eredményez." },
      { q: "Mobilon is használhatom?", a: "Igen, az eszköz mobilon is működik." },
      { q: "Megváltozik az URL tartalma?", a: "Nem, az URL ugyanarra az oldalra mutat – csak a formátum lesz egységes." },
    ],
    content: {
      howToSteps: [
        { title: "1. URL beillesztése", description: "Másold be a normalizálandó URL-t." },
        { title: "2. Normalizálás", description: "Az eszköz automatikusan egységes formára hozza az URL-t." },
        { title: "3. Eredmény másolása", description: "Másold ki a normalizált URL-t." },
      ],
      useCases: [
        { icon: "🔍", title: "SEO audit", description: "Weboldalak URL-jeinek egységesítése a duplikált tartalom elkerüléséhez." },
        { icon: "📊", title: "Analitika", description: "URL-ek normalizálása az analitikai adatok pontosabb összesítéséhez." },
        { icon: "🔗", title: "Linkkezelés", description: "Egységes URL formátum használata a linkadatbázisban." },
      ],
      aboutSection: {
        title: "URL normalizálás és SEO",
        paragraphs: [
          "Az URL normalizálás biztosítja, hogy ugyanazt az oldalt azonos URL-lel érjük el, elkerülve a keresőmotorok számára zavaró duplikátumokat.",
          "Az egységes URL-ek javítják a link equity elosztását és az analitikai adatok pontosságát.",
        ],
      },
      tips: [
        { icon: "📐", tip: "Döntsd el előre, hogy trailing slash-sel vagy anélkül használod az URL-eket." },
        { icon: "🔤", tip: "A host rész mindig legyen kisbetűs – a path rész viszont case-sensitive lehet." },
        { icon: "🔗", tip: "Használj konzisztens URL formátumot az egész weboldalon." },
      ],
    },
  },

  // ─── 4. Canonical URL építő ────────────────────────────────────────────────
  "canonical-epito": {
    introText:
      "Generáld a canonical URL taget a weboldalaid számára. A helyes canonical tag segít a keresőmotoroknak azonosítani az oldal elsődleges verzióját, elkerülve a duplikált tartalom problémát.",
    guide: [
      "1. Add meg az oldal URL-jét.",
      "2. Az eszköz létrehozza a canonical link elemet.",
      "3. Másold be a generált taget a weboldalad head szekciójába.",
    ],
    faq: [
      { q: "Mire jó a canonical URL építő?", a: "Canonical link tag generálására szolgál, amely megmondja a keresőknek, melyik az oldal elsődleges verziója." },
      { q: "Biztonságos az adataim szempontjából?", a: "Igen, a generálás a böngészőben történik." },
      { q: "Mi az a canonical tag?", a: "Egy HTML elem a head szekcióban, amely jelzi a keresőknek az oldal kanonikus (elsődleges) URL-jét." },
      { q: "Miért fontos a canonical tag?", a: "Megakadályozza, hogy a keresők duplikált tartalomként kezeljék az oldal különböző URL-változatait." },
      { q: "Mobilon is használhatom?", a: "Igen, mobilon is működik." },
      { q: "Minden oldalra kell canonical tag?", a: "Igen, ajánlott minden oldalra elhelyezni – akár önreferencia canonical-ként is." },
    ],
    content: {
      howToSteps: [
        { title: "1. URL megadása", description: "Írd be az oldal elsődleges URL-jét." },
        { title: "2. Tag generálása", description: "Az eszköz létrehozza a canonical link elemet." },
        { title: "3. Beillesztés", description: "Másold be a kódot a weboldalad head szekciójába." },
      ],
      useCases: [
        { icon: "🔍", title: "SEO duplikátum kezelés", description: "Duplikált tartalom problémák megelőzése canonical taggal." },
        { icon: "🌐", title: "Többnyelvű oldalak", description: "Nyelvi változatok helyes canonical beállítása." },
        { icon: "📱", title: "Mobil/desktop verziók", description: "Mobil és desktop URL-ek közötti canonical viszony beállítása." },
      ],
      aboutSection: {
        title: "Canonical URL-ek",
        paragraphs: [
          "A canonical tag a keresőmotorok számára jelzi, hogy egy adott tartalom több URL-en is elérhető, de melyik az elsődleges verzió.",
          "Helyes használatával elkerülheted, hogy a Google duplikált tartalmat érzékeljen, és biztosíthatod a link equity helyes elosztását.",
        ],
      },
      tips: [
        { icon: "🔗", tip: "A canonical URL mindig abszolút URL legyen (https://... kezdetű)." },
        { icon: "📋", tip: "Minden oldalra helyezz el canonical taget, akár önreferencia-ként is." },
        { icon: "⚠️", tip: "Ne állíts be canonical-t egy teljesen más tartalmú oldalra – a keresők figyelmen kívül hagyhatják." },
      ],
    },
  },

  // ─── 5. Fájlnév optimalizáló ───────────────────────────────────────────────
  "fajlnev-optimalizalo": {
    introText:
      "Optimalizáld a fájlneveidet SEO-barát formátumba: kötőjeles elválasztás, ékezet-eltávolítás, kisbetűsítés. A jó fájlnevek javítják a képek és dokumentumok keresőtalálatait.",
    guide: [
      "1. Írd be vagy illeszd be az eredeti fájlnevet.",
      "2. Az eszköz automatikusan SEO-barát formátumra alakítja.",
      "3. Másold ki az optimalizált fájlnevet.",
    ],
    faq: [
      { q: "Mire jó a fájlnév optimalizáló?", a: "Fájlnevek SEO-barát formátumba alakítására szolgál: kisbetűs, kötőjeles, ékezet nélküli formára." },
      { q: "Biztonságos az adataim szempontjából?", a: "Igen, a feldolgozás a böngészőben történik." },
      { q: "Miért fontos a fájlnév a SEO-ban?", a: "A keresők (különösen a Google Képkereső) figyelembe veszik a fájlnevet a tartalom megértéséhez." },
      { q: "Milyen átalakításokat végez?", a: "Kisbetűsítés, ékezetek eltávolítása, szóközök kötőjelre cserélése, speciális karakterek eltávolítása." },
      { q: "Mobilon is használhatom?", a: "Igen, mobilon is működik." },
      { q: "Több fájlnevet is optimalizálhatok egyszerre?", a: "Igen, egymás után többet is beírhatsz és átalakíthatsz." },
    ],
    content: {
      howToSteps: [
        { title: "1. Fájlnév beírása", description: "Írd be az optimalizálandó fájlnevet." },
        { title: "2. Automatikus átalakítás", description: "Az eszköz SEO-barát formátumra alakítja a nevet." },
        { title: "3. Eredmény másolása", description: "Másold ki az optimalizált fájlnevet." },
      ],
      useCases: [
        { icon: "🖼️", title: "Képoptimalizálás", description: "Képfájlok elnevezése SEO-barát formátumban a jobb Google Képkereső rangsorolásért." },
        { icon: "📄", title: "Dokumentumok", description: "PDF és egyéb dokumentumok fájlnevének optimalizálása." },
        { icon: "🌐", title: "Webes tartalom", description: "Weboldalra feltöltött fájlok nevének egységesítése." },
      ],
      aboutSection: {
        title: "SEO-barát fájlnevek",
        paragraphs: [
          "A keresőmotorok a fájlneveket is értelmezik a tartalom meghatározásához, különösen képeknél és dokumentumoknál.",
          "Az ideális fájlnév kisbetűs, kötőjeles elválasztást használ, leíró jellegű, és nem tartalmaz ékezeteket vagy speciális karaktereket.",
        ],
      },
      tips: [
        { icon: "📝", tip: "Használj leíró fájlneveket: «piros-rozsa-kert.jpg» jobb, mint «IMG_2341.jpg»." },
        { icon: "🔤", tip: "Kötőjelet (-) használj szóközök helyett, ne aláhúzást (_)." },
        { icon: "🌍", tip: "Ékezetek helyett ékezet nélküli betűket használj a maximális kompatibilitás érdekében." },
      ],
    },
  },

  // ─── 6. Alt szöveg sablon ──────────────────────────────────────────────────
  "alt-szoveg-sablon": {
    introText:
      "Generálj SEO-optimalizált alt szöveg sablonokat a képeidhez. A jó alt szöveg javítja a hozzáférhetőséget és a Google Képkeresőben való megjelenést.",
    guide: [
      "1. Add meg a kép témáját és kontextusát.",
      "2. Az eszköz alt szöveg sablonokat generál.",
      "3. Válaszd ki a legmegfelelőbbet és szabd testre.",
    ],
    faq: [
      { q: "Mire jó az alt szöveg sablon?", a: "Képekhez SEO-optimalizált és hozzáférhető alt attribútum szövegek generálására szolgál." },
      { q: "Biztonságos az adataim szempontjából?", a: "Igen, a generálás a böngészőben történik." },
      { q: "Mi az az alt szöveg?", a: "A HTML img elem alt attribútuma, amely leírja a kép tartalmát képernyőolvasók és keresők számára." },
      { q: "Milyen hosszú legyen az alt szöveg?", a: "Ideálisan 80-125 karakter, tömör és leíró jellegű." },
      { q: "Mobilon is használhatom?", a: "Igen, mobilon is elérhető." },
      { q: "Javítja a SEO-t?", a: "Igen, a jó alt szöveg javítja a Google Képkeresőben való rangsorolást és a weboldal hozzáférhetőségét." },
    ],
    content: {
      howToSteps: [
        { title: "1. Kép leírása", description: "Írd le a kép témáját és kontextusát." },
        { title: "2. Sablon generálás", description: "Az eszköz több alt szöveg javaslatot készít." },
        { title: "3. Testreszabás", description: "Válaszd ki és finomítsd a legmegfelelőbb sablont." },
      ],
      useCases: [
        { icon: "🖼️", title: "Webes képek", description: "Weboldal képeinek alt szöveggel való ellátása SEO és hozzáférhetőség céljából." },
        { icon: "🛒", title: "Webshop termékképek", description: "Termékkatalógus képeinek alt szöveggel történő optimalizálása." },
        { icon: "♿", title: "Hozzáférhetőség", description: "WCAG megfelelőség biztosítása alt szöveg sablonokkal." },
      ],
      aboutSection: {
        title: "Az alt szöveg szerepe",
        paragraphs: [
          "Az alt szöveg kettős szerepet tölt be: hozzáférhetővé teszi a képeket a látássérültek számára, és segíti a keresőmotorokat a kép tartalmának megértésében.",
          "A jól megírt alt szöveg tömör, leíró jellegű, és tartalmazza a releváns kulcsszavakat természetes módon.",
        ],
      },
      tips: [
        { icon: "📝", tip: "Írd le, mit ábrázol a kép, ne azt, hogy «kép a ... -ról»." },
        { icon: "🎯", tip: "Helyezd el a legfontosabb kulcsszót az alt szöveg elejére." },
        { icon: "⚠️", tip: "Dekoratív képeknél üres alt attribútumot (alt=\"\") használj." },
      ],
    },
  },

  // ─── 7. Robots.txt ellenőrző ───────────────────────────────────────────────
  "robots-txt-ellenorzo": {
    introText:
      "Ellenőrizd a robots.txt fájlodat: szintaxis validálás, szabályok elemzése, és annak tesztelése, hogy egy adott URL engedélyezett-e vagy tiltott a keresőrobotok számára.",
    guide: [
      "1. Illeszd be a robots.txt fájl tartalmát.",
      "2. Az eszköz elemzi a szintaxist és a szabályokat.",
      "3. Tesztelj URL-eket: add meg, hogy egy adott bejáró elérheti-e az URL-t.",
    ],
    faq: [
      { q: "Mire jó a robots.txt ellenőrző?", a: "Robots.txt fájlok szintaxis ellenőrzésére és szabályok tesztelésére szolgál." },
      { q: "Biztonságos az adataim szempontjából?", a: "Igen, az ellenőrzés a böngészőben történik." },
      { q: "Mi az a robots.txt?", a: "Szöveges fájl a weboldal gyökerében, amely megmondja a keresőrobotoknak, melyik URL-eket bejárhatják és melyeket nem." },
      { q: "Tesztelhetem egy URL blokkolását?", a: "Igen, megadhatod az URL-t és a botot, és az eszköz megmutatja, engedélyezett-e." },
      { q: "Mobilon is használhatom?", a: "Igen, az eszköz mobilon is elérhető." },
      { q: "Jelzi a szintaxishibákat?", a: "Igen, a hibás sorok kiemelve jelennek meg magyarázattal." },
    ],
    content: {
      howToSteps: [
        { title: "1. Robots.txt beillesztése", description: "Másold be a robots.txt fájl tartalmát." },
        { title: "2. Szintaxis ellenőrzés", description: "Az eszköz elemzi a szabályokat és jelzi a hibákat." },
        { title: "3. URL tesztelés", description: "Add meg egy URL-t, hogy teszteld a blokkolási szabályokat." },
      ],
      useCases: [
        { icon: "🔍", title: "SEO audit", description: "Robots.txt helyes működésének ellenőrzése SEO audit során." },
        { icon: "🐛", title: "Hibakeresés", description: "Váratlan indexelési problémák felderítése a robots.txt szabályok elemzésével." },
        { icon: "🛡️", title: "Bejárás szabályozás", description: "Privát oldalak és adminisztrációs felületek tiltásának ellenőrzése." },
      ],
      aboutSection: {
        title: "A robots.txt fájl",
        paragraphs: [
          "A robots.txt a Robots Exclusion Protocol része: egy egyszerű szöveges fájl a weboldal gyökerében, amely irányelveket ad a keresőrobotoknak.",
          "Helyes beállítása kritikus a SEO szempontjából – hibás szabályok megakadályozhatják fontos oldalak indexelését.",
        ],
      },
      tips: [
        { icon: "📋", tip: "Mindig helyezz el Sitemap hivatkozást a robots.txt fájlban." },
        { icon: "⚠️", tip: "A Disallow: / szabály az egész oldalt blokkolja – óvatosan használd." },
        { icon: "🔍", tip: "Tesztelj konkrét URL-eket, hogy biztosan a kívánt szabályok érvényesülnek." },
      ],
    },
  },

  // ─── 8. Sitemap URL ellenőrző ──────────────────────────────────────────────
  "sitemap-url-ellenorzo": {
    introText:
      "Ellenőrizd az XML sitemap URL-jeit: érvényes-e a formátum, elérhetők-e az URL-ek, és nincsenek-e duplikátumok. Az ellenőrzés a böngésződben történik.",
    guide: [
      "1. Illeszd be a sitemap XML tartalmát vagy az URL-ek listáját.",
      "2. Az eszköz validálja a formátumot és az URL-eket.",
      "3. Tekintsd meg az eredményeket és javítsd a hibákat.",
    ],
    faq: [
      { q: "Mire jó a sitemap URL ellenőrző?", a: "XML sitemap URL-jeinek formátum-validálására és duplikátum-keresésre szolgál." },
      { q: "Biztonságos az adataim szempontjából?", a: "Igen, az ellenőrzés a böngészőben történik." },
      { q: "Mi az a sitemap?", a: "XML fájl, amely felsorolja a weboldal fontos URL-jeit, segítve a keresőket a bejárásban." },
      { q: "Milyen hibákat jelez?", a: "Érvénytelen URL formátumot, duplikátumokat, hiányzó elemeket és XML szintaxishibákat." },
      { q: "Mobilon is használhatom?", a: "Igen, az eszköz mobilon is működik." },
      { q: "Hány URL-t ellenőrízhetek?", a: "A böngésző teljesítményétől függően jellemzően több ezer URL is ellenőrizhető." },
    ],
    content: {
      howToSteps: [
        { title: "1. Sitemap beillesztése", description: "Másold be a sitemap XML tartalmát vagy az URL-ek listáját." },
        { title: "2. Validálás", description: "Az eszköz ellenőrzi a formátumot, URL-eket és duplikátumokat." },
        { title: "3. Eredmények áttekintése", description: "Nézd meg a hibákat és javaslatokat, majd javítsd a sitemap-et." },
      ],
      useCases: [
        { icon: "🔍", title: "SEO audit", description: "Sitemap validálás a weboldal SEO auditjának részeként." },
        { icon: "🐛", title: "Hibakeresés", description: "Sitemap hibák felderítése, ha az indexelés nem a várt módon működik." },
        { icon: "📊", title: "URL elemzés", description: "Sitemap URL-ek áttekintése és duplikátumok keresése." },
      ],
      aboutSection: {
        title: "XML Sitemap",
        paragraphs: [
          "Az XML sitemap segíti a keresőmotorokat a weboldal struktúrájának megértésében és az összes fontos URL megtalálásában.",
          "A helyes sitemap javítja az indexelés hatékonyságát, különösen nagy weboldalaknál és frissen indított oldalaknál.",
        ],
      },
      tips: [
        { icon: "📋", tip: "A sitemap legfeljebb 50 000 URL-t tartalmazzon – nagyobb oldalhoz használj sitemap indexet." },
        { icon: "🔗", tip: "Csak kanonikus és indexelhető URL-eket helyezz a sitemap-be." },
        { icon: "📅", tip: "Használd a lastmod elemet a tartalom frissítési dátumának jelzésére." },
      ],
    },
  },
};
