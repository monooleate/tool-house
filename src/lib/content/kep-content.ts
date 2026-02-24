import type { ContentMap } from "./types.ts";

export const KEP_CONTENT: ContentMap = {
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
};
