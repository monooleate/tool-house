import type { ContentMap } from "./types.ts";

// ═══ SEO kategória – HU content (HU+RO közös toolok) ══════════════════════════
export const SEO_CONTENT: ContentMap = {
  // ─── Meta tag generátor ─────────────────────────────────────────────────────
  "meta-tag-generator": {
    introText:
      "A meta tag generátor egy helyen állítja össze egy weboldal legfontosabb <head> meta tagjeit: az oldal címét (title), a meta leírást (description), a canonical URL-t, a robots indexelési utasítást, a szerzőt, a kulcsszavakat és a theme-color színt. Írd be a mezőket, és a kész HTML kódot azonnal a jobb oldalon látod, egy kattintással másolható formában. A title és a description mellett élő karakterszámláló mutatja, belefér-e a keresők által megjelenített hosszba. Minden a böngésződben fut – semmilyen adat nem kerül szerverre.",
    guide: [
      "1. Írd be az oldal címét (title) és a meta leírását – a számláló jelzi, ideális-e a hossz.",
      "2. Add meg a canonical URL-t, hogy elkerüld a duplikált tartalom problémáját.",
      "3. Válaszd ki a robots indexelési szabályt (alapból index, follow), és töltsd ki a többi opcionális mezőt.",
      "4. Másold ki a generált meta tageket, és illeszd be az oldalad <head> szakaszába.",
    ],
    faq: [
      { q: "Mi az a meta tag, és miért fontos?", a: "A meta tagek a HTML <head> szakaszában elhelyezett elemek, amelyek információt adnak az oldalról a keresőknek és a böngészőknek. A title és a meta description közvetlenül megjelenik a keresési találatokban, ezért erősen befolyásolja az átkattintási arányt; a canonical és a robots tag pedig azt szabályozza, hogyan indexelik az oldalt." },
      { q: "Milyen hosszú legyen a title és a description?", a: "A Google jellemzően 50–60 karakternyi title-t és 150–160 karakternyi meta leírást jelenít meg, a többit levágja. Az eszköz élő számlálója zölddel jelzi az ideális, sárgával a határeset, pirossal a túl hosszú tartományt." },
      { q: "Mire való a canonical URL?", a: "A canonical tag megmondja a keresőknek, melyik az oldal hivatalos, elsődleges változata. Akkor hasznos, ha ugyanaz a tartalom több URL-en is elérhető (pl. paraméterekkel, www-vel és anélkül) – így elkerülöd, hogy a keresők duplikált tartalomként kezeljék." },
      { q: "Mit jelentenek a robots értékek?", a: "Az „index” engedi, hogy a kereső felvegye az oldalt a találatok közé, a „noindex” tiltja ezt; a „follow” engedi a linkek követését, a „nofollow” tiltja. A leggyakoribb beállítás az „index, follow”, ami normál, nyilvános oldalakhoz kell." },
      { q: "Kellenek még a meta keywords?", a: "A meta keywords tagot a Google évek óta figyelmen kívül hagyja rangsorolási tényezőként, ezért nem kötelező. Néhány kisebb kereső vagy belső rendszer még használhatja, ezért az eszköz opcionálisan felkínálja, de üresen is hagyhatod." },
      { q: "A beírt adatok szerverre kerülnek?", a: "Nem. A teljes generálás a böngésződben, JavaScripttel történik. Sem a címek, sem az URL-ek, sem más adat nem hagyja el a gépedet – semmi nem kerül feltöltésre vagy mentésre." },
    ],
    content: {
      howToSteps: [
        { title: "1. Cím és leírás", description: "Töltsd ki a title és a meta description mezőt; a karakterszámláló azonnal jelzi, belefér-e a keresők által megjelenített hosszba." },
        { title: "2. Canonical és robots", description: "Add meg az oldal canonical URL-jét, és válaszd ki a megfelelő indexelési szabályt a legördülő menüből." },
        { title: "3. Kiegészítő mezők", description: "Szükség szerint töltsd ki a szerzőt, a nyelvet, a kulcsszavakat vagy a theme-color színt – csak a kitöltött mezők kerülnek a kimenetbe." },
        { title: "4. Másolás és beillesztés", description: "A kész meta tageket egy kattintással a vágólapra másolod, és beilleszted az oldalad <head> szakaszába." },
      ],
      useCases: [
        { icon: "🌐", title: "Új oldal indítása", description: "Statikus oldal vagy landing page esetén gyorsan összerakod a teljes, helyes meta blokkot kézi kódolás nélkül." },
        { icon: "🔍", title: "SEO optimalizálás", description: "A találatokban megjelenő title és description finomhangolása a helyes karakterhossz betartásával." },
        { icon: "📱", title: "Böngésző-integráció", description: "A theme-color és a viewport meta segít a mobilos megjelenésben és a böngésző felületének színezésében." },
        { icon: "🧑‍💻", title: "Fejlesztői sablon", description: "Kiindulási meta blokk generálása CMS-sablonokhoz, sablonrendszerekhez vagy dokumentációhoz." },
      ],
      formatComparison: {
        title: "A leggyakoribb meta tagek",
        columns: ["Tag", "Mire való"],
        rows: [
          { feature: "title", values: ["Az oldal címe – a találat kék linkje és a böngészőfül felirata"] },
          { feature: "meta description", values: ["Rövid összefoglaló a találatban a cím alatt"] },
          { feature: "link canonical", values: ["Az oldal elsődleges URL-je duplikáció ellen"] },
          { feature: "meta robots", values: ["Indexelési és linkkövetési szabály (index/noindex, follow/nofollow)"] },
          { feature: "meta viewport", values: ["Reszponzív megjelenés mobil eszközökön"] },
          { feature: "meta theme-color", values: ["A böngésző felületének színe mobilon"] },
        ],
      },
      aboutSection: {
        title: "Meta tagek és a keresőoptimalizálás",
        paragraphs: [
          "A meta tagek nem jelennek meg magán az oldalon, mégis meghatározóak: ezekből tudja meg a kereső, miről szól az oldal, és ezek alapján állítja össze a találati listában látható részletet. A title és a meta description az a két elem, amit a felhasználó a keresőben lát, mielőtt rákattint – ezért a jó megfogalmazásuk közvetlenül növeli az átkattintási arányt.",
          "A title ideális hossza 50–60 karakter, a meta description 150–160 karakter. Ha ennél hosszabbak, a Google levágja őket, és a mondat közepén szakadhat meg a szöveg. Az eszköz élő számlálója pontosan ezt segít elkerülni: a színkód azonnal mutatja, hogy a szöveg még belefér-e a biztonságos tartományba.",
          "A canonical és a robots tagek a technikai SEO-hoz tartoznak. A canonical megelőzi a duplikált tartalom problémáját azzal, hogy kijelöli az oldal hivatalos URL-jét; a robots tag pedig szabályozza, hogy a kereső indexelje-e az oldalt, és kövesse-e a rajta lévő linkeket. Ezek helyes beállítása gyakran fontosabb, mint bármelyik látható tartalmi elem.",
        ],
      },
      tips: [
        { icon: "🎯", tip: "A title elejére tedd a legfontosabb kulcsszót – a keresők és a felhasználók is a szöveg elejét olvassák először." },
        { icon: "✍️", tip: "A meta description ne kulcsszóhalmaz legyen, hanem egy vonzó, cselekvésre ösztönző mondat – ez dönti el, rákattintanak-e." },
        { icon: "🔗", tip: "Canonical URL-nek mindig az abszolút, teljes (https://…) címet add meg, ne relatív útvonalat." },
        { icon: "🚫", tip: "A „noindex” beállítást csak akkor használd, ha tényleg ki akarod zárni az oldalt a keresőből – pl. belső, teszt- vagy köszönőoldalaknál." },
      ],
    },
  },

  // ─── Open Graph generátor ───────────────────────────────────────────────────
  "open-graph-generator": {
    introText:
      "Az Open Graph generátor összeállítja azokat a meta tageket, amelyek meghatározzák, hogyan néz ki az oldalad, amikor megosztják a Facebookon, a LinkedInen vagy más közösségi platformon. Add meg a címet, a leírást, az oldal URL-jét és a megosztási képet, az eszköz pedig azonnal mutatja az élő kártya-előnézetet, és legenerálja a beilleszthető og: tageket. Így nem véletlenszerű szövegrészlet és rossz kép jelenik meg, hanem pontosan az, amit szeretnél. Minden a böngésződben fut, feltöltés nélkül.",
    guide: [
      "1. Írd be az og:title címet és az og:description leírást.",
      "2. Add meg az oldal URL-jét (og:url) és a megosztási kép címét (og:image).",
      "3. Válaszd ki a típust (og:type), és nézd meg az élő Facebook/LinkedIn előnézetet.",
      "4. Másold ki a generált og: tageket, és illeszd az oldalad <head> szakaszába.",
    ],
    faq: [
      { q: "Mi az az Open Graph?", a: "Az Open Graph a Facebook által bevezetett protokoll, amely meta tagekkel írja le, hogyan jelenjen meg egy oldal megosztáskor: milyen címmel, leírással és képpel. Ma a legtöbb közösségi platform (LinkedIn, WhatsApp, Slack, Discord) is ezeket a tageket olvassa." },
      { q: "Mekkora legyen az og:image?", a: "Az ajánlott méret 1200 × 630 pixel (1.91:1 arány), ez jelenik meg nagy kártyaként. A minimum 200 × 200 pixel, de a kis képek csak apró bélyegképként jelennek meg. A képnek nyilvánosan, teljes URL-lel elérhetőnek kell lennie." },
      { q: "Miért nem frissül a kép megosztáskor?", a: "A közösségi platformok gyorsítótárazzák (cache-elik) az Open Graph adatokat. Ha módosítottad a képet vagy a szöveget, a Facebook Sharing Debugger vagy a LinkedIn Post Inspector segítségével kényszerítheted az újraolvasást." },
      { q: "Kell külön Twitter Card is?", a: "Az X (Twitter) elsőként a saját twitter: tagjeit keresi, de ha azok hiányoznak, visszaesik az Open Graph tagekre. A legjobb megjelenéshez érdemes mindkettőt megadni – erre külön Twitter Card generátorunk van." },
      { q: "Az og:url a canonical URL legyen?", a: "Igen, célszerű az oldal hivatalos, canonical URL-jét megadni. Így minden megosztás ugyanahhoz az URL-hez rendeli a lájkokat és megosztásokat, függetlenül attól, hogy milyen paraméteres linkről osztották meg." },
      { q: "Az adatok szerverre kerülnek?", a: "Nem. A tagek generálása és az előnézet teljes egészében a böngésződben történik – semmilyen adat vagy kép nem kerül feltöltésre." },
    ],
    content: {
      howToSteps: [
        { title: "1. Cím és leírás", description: "Töltsd ki az og:title és og:description mezőt – ezek jelennek meg a megosztási kártyán." },
        { title: "2. URL és kép", description: "Add meg az oldal og:url címét és az og:image megosztási kép teljes URL-jét." },
        { title: "3. Típus és előnézet", description: "Válaszd ki az og:type típust, és ellenőrizd az élő Facebook/LinkedIn kártya-előnézetet." },
        { title: "4. Másolás", description: "A generált og: tageket egy kattintással a vágólapra másolod, és beilleszted a <head> szakaszba." },
      ],
      useCases: [
        { icon: "📰", title: "Blog és cikk", description: "Cikkek megosztásakor a helyes cím, leírás és kiemelt kép jelentősen növeli az átkattintást." },
        { icon: "🛍️", title: "Termékoldal", description: "Webshopban a termék neve, ára-üzenete és képe vonzó megosztási kártyát ad a közösségi médiában." },
        { icon: "🚀", title: "Landing page", description: "Kampányoldalaknál a gondosan megírt OG-kártya közvetlenül hat a hirdetés és a megosztás teljesítményére." },
        { icon: "🔗", title: "Link-előnézet", description: "WhatsAppon, Slacken, Discordon beillesztett linkeknél is az OG-tagek adják a szép előnézetet." },
      ],
      formatComparison: {
        title: "A leggyakoribb Open Graph tagek",
        columns: ["Tag", "Szerepe"],
        rows: [
          { feature: "og:title", values: ["A megosztási kártya címe (bold)"] },
          { feature: "og:description", values: ["Rövid leírás a cím alatt"] },
          { feature: "og:image", values: ["A kártya képe (1200×630 px ajánlott)"] },
          { feature: "og:url", values: ["Az oldal hivatalos URL-je"] },
          { feature: "og:type", values: ["A tartalom típusa (website, article…)"] },
          { feature: "og:site_name", values: ["A webhely neve"] },
        ],
      },
      aboutSection: {
        title: "Miért fontos az Open Graph?",
        paragraphs: [
          "Amikor valaki megoszt egy linket a közösségi médiában, a platform nem az oldal teljes tartalmát mutatja, hanem egy kártyát: egy képet, egy címet és egy rövid leírást. Ha nincsenek Open Graph tagek, a platform találomra választ egy képet és szövegrészletet az oldalról – ez gyakran csúnya, félrevezető vagy üres eredményt ad. Az OG-tagekkel te szabod meg pontosan, mit lásson a felhasználó.",
          "Ez közvetlenül befolyásolja az átkattintási arányt. Egy vonzó cím és egy jó minőségű, releváns kép sokszorosára növelheti a megosztott linkre érkező kattintások számát a semmitmondó vagy hiányos előnézethez képest. A közösségi forgalomból élő oldalaknál ez az egyik legjobb megtérülésű technikai finomítás.",
          "Az Open Graph protokollt a Facebook vezette be, de mára gyakorlatilag szabvánnyá vált: a LinkedIn, a WhatsApp, a Slack, a Discord, a Telegram és sok más alkalmazás is ezeket a tageket olvassa a link-előnézethez. Egyetlen jól megírt OG-blokk tehát minden platformon javítja a megjelenést.",
        ],
      },
      tips: [
        { icon: "🖼️", tip: "Mindig 1200×630 px képet használj – ez tölti ki a nagy kártyát, és éles marad retina kijelzőn is." },
        { icon: "🔗", tip: "Az og:image mindig abszolút, nyilvánosan elérhető URL legyen, ne relatív útvonal." },
        { icon: "🔄", tip: "Kép- vagy szövegcsere után futtasd le a Facebook Sharing Debuggert, hogy frissüljön a cache." },
        { icon: "✅", tip: "Add meg mind a négy alapot (title, description, url, image) – ezek nélkül hiányos lesz a kártya." },
      ],
    },
  },

  // ─── Twitter Card generátor ─────────────────────────────────────────────────
  "twitter-card-generator": {
    introText:
      "A Twitter Card generátor azokat a meta tageket állítja össze, amelyek meghatározzák, hogyan jelenik meg az oldalad, amikor egy linket megosztanak az X-en (korábban Twitter). Kiválaszthatod a kártyatípust (nagy képes vagy összefoglaló), megadhatod a címet, a leírást, a képet és a fiókneveket, az eszköz pedig azonnal mutatja az élő kártya-előnézetet és a beilleszthető twitter: tageket. Minden a böngésződben történik, feltöltés nélkül.",
    guide: [
      "1. Válaszd ki a kártyatípust: summary_large_image (nagy kép) vagy summary (kis kép).",
      "2. Írd be a twitter:title címet és a twitter:description leírást.",
      "3. Add meg a kép URL-jét és opcionálisan a @fiókneveket (site, creator).",
      "4. Másold ki a generált twitter: tageket, és illeszd az oldalad <head> szakaszába.",
    ],
    faq: [
      { q: "Mi a különbség a kártyatípusok között?", a: "A summary_large_image nagy, széles képet mutat a cím és a leírás felett – ez a legnépszerűbb. A summary kisebb, négyzetes bélyegképet jelenít meg a szöveg mellett. Cikkekhez és vizuális tartalomhoz a nagy képes ajánlott." },
      { q: "Kell Twitter Card, ha már van Open Graph?", a: "Az X az Open Graph tageket is felismeri, ezért a twitter: tagek nélkül is működik a megosztás. A saját twitter: tagekkel viszont pontosabban szabályozhatod a kártyatípust és a szerző-hozzárendelést, ezért érdemes megadni őket." },
      { q: "Mekkora legyen a twitter:image?", a: "A summary_large_image kártyához legalább 300×157 px, ideálisan 1200×628 px, 2:1 arányú kép ajánlott. A summary kártyához négyzetes, legalább 144×144 px kép szükséges. A kép nem lehet 5 MB-nál nagyobb." },
      { q: "Mire való a twitter:site és a twitter:creator?", a: "A twitter:site a tartalmat közzétevő webhely X-fiókja (@oldal), a twitter:creator pedig a konkrét szerző fiókja (@szerzo). Ezek megjelenhetnek a kártyán, és segítik a márka- és szerzőazonosítást." },
      { q: "Kötelező a @ jel a fióknévnél?", a: "A helyes formátum @ jellel kezdődik. Az eszköz automatikusan hozzáteszi a @ jelet, ha lemaradt, így nem kell rá külön figyelned." },
      { q: "Az adatok szerverre kerülnek?", a: "Nem. A kártya összeállítása és az előnézet teljes egészében a böngésződben fut – semmilyen adat nem kerül feltöltésre." },
    ],
    content: {
      howToSteps: [
        { title: "1. Kártyatípus", description: "Válaszd ki a summary_large_image (nagy kép) vagy a summary (kis kép) típust." },
        { title: "2. Szöveg és kép", description: "Töltsd ki a címet, a leírást és a kép URL-jét – az előnézet azonnal frissül." },
        { title: "3. Fiókok", description: "Add meg opcionálisan a webhely és a szerző @fiókneveit a hozzárendeléshez." },
        { title: "4. Másolás", description: "A generált twitter: tageket a vágólapra másolod, és beilleszted a <head> szakaszba." },
      ],
      useCases: [
        { icon: "📰", title: "Cikk megosztása", description: "Nagy képes kártyával a blogbejegyzések sokkal feltűnőbbek az X idővonalán." },
        { icon: "🏢", title: "Márka jelenlét", description: "A twitter:site fiókkal minden megosztás a márkádhoz kötődik, erősítve a felismerhetőséget." },
        { icon: "✍️", title: "Szerző-hozzárendelés", description: "A twitter:creator megmutatja, ki írta a tartalmat, ami a szakértői profilt építi." },
        { icon: "📣", title: "Kampányok", description: "Hirdetéseknél és promócióknál a jól beállított kártya növeli a kattintási arányt." },
      ],
      formatComparison: {
        title: "A Twitter Card tagek",
        columns: ["Tag", "Szerepe"],
        rows: [
          { feature: "twitter:card", values: ["Kártyatípus (summary / summary_large_image)"] },
          { feature: "twitter:title", values: ["A kártya címe"] },
          { feature: "twitter:description", values: ["Rövid leírás"] },
          { feature: "twitter:image", values: ["A kártya képe"] },
          { feature: "twitter:site", values: ["A webhely X-fiókja (@)"] },
          { feature: "twitter:creator", values: ["A szerző X-fiókja (@)"] },
        ],
      },
      aboutSection: {
        title: "Twitter Cards dióhéjban",
        paragraphs: [
          "A Twitter Cards az X (Twitter) rendszere arra, hogy egy megosztott link ne csak egy sima URL legyen, hanem gazdag, vizuális kártyaként jelenjen meg: képpel, címmel és leírással. A megfelelő tagek nélkül a link csak egy egyszerű szövegként jelenik meg, kép és kontextus nélkül, ami sokkal kevésbé vonzó és kattintható.",
          "Az X a saját twitter: névterű tagjeit részesíti előnyben, de ha ezek hiányoznak, visszaesik az Open Graph tagekre. A gyakorlatban ezért a legjobb stratégia mindkét készletet megadni: az Open Graph a Facebookot, LinkedInt és a legtöbb más platformot fedi le, a twitter: tagek pedig az X-en adnak pontos kontrollt a kártyatípus és a szerző fölött.",
        ],
      },
      tips: [
        { icon: "🖼️", tip: "Nagy képes kártyához használj 1200×628 px, 2:1 arányú képet a legjobb megjelenésért." },
        { icon: "🔗", tip: "A kép URL-je legyen abszolút és nyilvánosan elérhető, HTTPS-en." },
        { icon: "🤝", tip: "Add meg az Open Graph tageket is – így minden platformon szép lesz a megosztás." },
        { icon: "🔍", tip: "A közzététel előtt ellenőrizd a kártyát az X saját Card Validator eszközével." },
      ],
    },
  },

  // ─── FAQ Schema (JSON-LD) generátor ─────────────────────────────────────────
  "faq-schema-generator": {
    introText:
      "A FAQ Schema generátor gyakori kérdés–válasz párokból FAQPage típusú, schema.org szabvány szerinti JSON-LD strukturált adatot készít. Ezt beillesztve a Google és más keresők megérthetik az oldalad kérdéseit, és akár közvetlenül a találatok között, kinyitható kérdésekként is megjeleníthetik. Add hozzá a kérdéseket és a válaszokat, az eszköz pedig azonnal generálja az érvényes, másolható JSON-LD kódot. Minden a böngésződben fut, feltöltés nélkül.",
    guide: [
      "1. Írd be az első kérdést és a hozzá tartozó választ.",
      "2. A «Kérdés hozzáadása» gombbal annyi párt veszel fel, amennyit szeretnél.",
      "3. Nézd meg az élőben frissülő JSON-LD kódot; a <script> tag beágyazás ki-be kapcsolható.",
      "4. Másold ki a kódot, és illeszd az oldalad HTML-jébe, ahol a FAQ tartalom is látható.",
    ],
    faq: [
      { q: "Mi az a FAQ Schema?", a: "A FAQ Schema (FAQPage) egy schema.org szerinti strukturált adatformátum, amely megmondja a keresőknek, hogy az oldalon kérdés–válasz párok találhatók. A Google ez alapján gazdagabb találatot (rich result) jeleníthet meg, kinyitható kérdésekkel." },
      { q: "Miért JSON-LD formátumban?", a: "A Google a JSON-LD formátumot ajánlja a strukturált adatokhoz, mert a látható tartalomtól elkülönítve, egy <script> blokkban helyezhető el, és könnyen karbantartható. Ez az eszköz ezért JSON-LD-t generál." },
      { q: "A tartalomnak látszania is kell az oldalon?", a: "Igen. A Google irányelvei szerint a strukturált adatban szereplő kérdéseknek és válaszoknak láthatóan is szerepelniük kell az oldalon, pontosan ugyanabban a formában. Ne generálj olyan FAQ schemát, aminek nincs látható megfelelője." },
      { q: "Hány kérdést adhatok meg?", a: "Technikailag nincs kemény korlát, de a jó gyakorlat 3–10 releváns kérdés. A túl sok, mesterséges kérdés inkább árt; a valódi, felhasználói kérdésekre koncentrálj." },
      { q: "Hova illesszem be a kódot?", a: "A generált <script type=\"application/ld+json\"> blokkot az oldal <head> vagy <body> szakaszába illesztheted. A helye nem befolyásolja a működést, amíg egyszer szerepel az oldalon." },
      { q: "Az adatok szerverre kerülnek?", a: "Nem. A JSON-LD generálása teljes egészében a böngésződben történik – a kérdéseid és válaszaid nem hagyják el a gépedet." },
    ],
    content: {
      howToSteps: [
        { title: "1. Kérdés–válasz", description: "Töltsd ki az első kérdés-válasz párt a bal oldali űrlapon." },
        { title: "2. További párok", description: "Adj hozzá annyi kérdést, amennyi szükséges; a számláló mutatja az érvényeseket." },
        { title: "3. Formátum", description: "Válaszd ki, kell-e a <script> tag beágyazás, és ellenőrizd az élő JSON-LD-t." },
        { title: "4. Beillesztés", description: "Másold a kódot az oldalad HTML-jébe, oda, ahol a FAQ láthatóan is szerepel." },
      ],
      useCases: [
        { icon: "🛒", title: "Webshop", description: "Szállítási, fizetési és garanciális kérdések strukturált adatként, gazdagabb Google-találatért." },
        { icon: "🏢", title: "Szolgáltatás oldal", description: "Árazási és folyamat-kérdések, amelyek közvetlenül a keresőben megjelenhetnek." },
        { icon: "📚", title: "Tudásbázis", description: "Súgó- és GYIK-oldalak strukturálása, hogy a keresők és az AI-asszisztensek is értsék." },
        { icon: "🤖", title: "AI-láthatóság", description: "A tiszta kérdés–válasz szerkezet segíti, hogy az AI-keresők idézzék a tartalmadat." },
      ],
      formatComparison: {
        title: "A FAQPage schema felépítése",
        columns: ["Elem", "Szerepe"],
        rows: [
          { feature: "@type: FAQPage", values: ["Jelzi, hogy az oldal GYIK-et tartalmaz"] },
          { feature: "mainEntity", values: ["A kérdések listája"] },
          { feature: "Question / name", values: ["Egy kérdés szövege"] },
          { feature: "acceptedAnswer / text", values: ["A kérdéshez tartozó válasz"] },
        ],
      },
      aboutSection: {
        title: "Strukturált adat és a gazdag találatok",
        paragraphs: [
          "A strukturált adat egy gépi olvasásra szánt réteg az oldalon, amely a keresők számára egyértelműsíti a tartalom jelentését. A FAQPage típus konkrétan azt közli, hogy az oldalon kérdés–válasz párok vannak. Ennek alapján a Google a szokásos kék linknél gazdagabb találatot jeleníthet meg: közvetlenül a keresési oldalon kinyithatók a kérdések, ami több helyet foglal és nagyobb átkattintást hozhat.",
          "A JSON-LD a Google által ajánlott formátum, mert a látható HTML-től függetlenül, egyetlen script-blokkban helyezhető el, és nem befolyásolja az oldal megjelenését. Fontos szabály viszont, hogy a strukturált adatban szereplő kérdéseknek és válaszoknak láthatóan is szerepelniük kell az oldalon – a rejtett vagy csak schemában létező tartalom ellentétes a Google irányelveivel.",
        ],
      },
      tips: [
        { icon: "🎯", tip: "Valódi, felhasználói kérdésekre koncentrálj – ne generálj mesterséges, kulcsszóhalmozó kérdéseket." },
        { icon: "👁️", tip: "A schemában szereplő szöveg egyezzen a látható FAQ tartalommal – ez a Google feltétele." },
        { icon: "🔢", tip: "3–10 tömör, jól megfogalmazott kérdés általában a leghatékonyabb." },
        { icon: "🧪", tip: "Beillesztés után ellenőrizd a kódot a Google Rich Results Test eszközével." },
      ],
    },
  },

  // ─── robots.txt generátor ───────────────────────────────────────────────────
  "robots-txt-generator": {
    introText:
      "A robots.txt generátor varázslóval állítja össze a webhelyed robots.txt fájlját, amely megmondja a keresőrobotoknak, mely részeket járhatják be és melyeket nem. Beállíthatod a user-agentet, a tiltott (Disallow) és engedélyezett (Allow) útvonalakat, a crawl-delay értéket és a sitemap címét, sőt egy kattintással letilthatod az AI-botokat is. Az eszköz azonnal mutatja a kész fájlt, amelyet másolhatsz vagy letölthetsz. Minden a böngésződben fut.",
    guide: [
      "1. Válassz egy gyors sablont (minden engedélyezve, WordPress, semmi indexelés), vagy állítsd be kézzel.",
      "2. Add meg a tiltott (Disallow) és szükség szerint az engedélyezett (Allow) útvonalakat.",
      "3. Írd be a sitemap URL-jét, és opcionálisan a crawl-delay értéket; kapcsold be az AI-bot tiltást, ha szeretnéd.",
      "4. Másold ki vagy töltsd le a robots.txt fájlt, és tedd a webhelyed gyökerébe.",
    ],
    faq: [
      { q: "Mi az a robots.txt?", a: "A robots.txt egy egyszerű szöveges fájl a webhely gyökerében (pelda.hu/robots.txt), amely a keresőrobotoknak ad utasításokat: mely útvonalakat járhatják be és melyeket ne. A legtöbb komoly robot (Googlebot, Bingbot) tiszteletben tartja." },
      { q: "A robots.txt megvédi a bizalmas oldalakat?", a: "Nem. A robots.txt csak kérés, nem hozzáférés-korlátozás. A tiltott URL-ek továbbra is elérhetők, ha valaki ismeri a címet, és a rosszindulatú botok figyelmen kívül hagyhatják. Bizalmas tartalmat jelszóval vagy szerveroldali védelemmel óvj." },
      { q: "Mi a különbség a Disallow és a noindex között?", a: "A Disallow megakadályozza a bejárást, de a tiltott oldal még megjelenhet a találatokban (URL-ként). A noindex meta tag viszont kifejezetten kizárja az indexelésből. Fontos: ha egy oldalt Disallow-val tiltasz, a Google nem is látja a rajta lévő noindexet." },
      { q: "Kell letiltani az AI-botokat?", a: "Ez döntés kérdése. Ha nem szeretnéd, hogy a tartalmadat AI-modellek betanításához vagy AI-keresők használják, letilthatod a GPTBot, CCBot, Google-Extended és társai botokat. Ha viszont láthatóságot szeretnél az AI-keresőkben, hagyd őket engedélyezve." },
      { q: "Hova kerül a robots.txt fájl?", a: "Mindig a webhely gyökerébe, pontosan „robots.txt” néven: pelda.hu/robots.txt. Aldomainenként külön fájl kell. Alkönyvtárban (pelda.hu/mappa/robots.txt) elhelyezve nem érvényes." },
      { q: "Az adatok szerverre kerülnek?", a: "Nem. A fájl összeállítása teljes egészében a böngésződben történik – semmi nem kerül feltöltésre." },
    ],
    content: {
      howToSteps: [
        { title: "1. Sablon vagy kézi", description: "Indulj egy gyors sablonból, vagy állítsd be a user-agentet és a szabályokat kézzel." },
        { title: "2. Útvonalak", description: "Add meg a Disallow (tiltott) és Allow (engedélyezett) útvonalakat a listákban." },
        { title: "3. Sitemap és botok", description: "Írd be a sitemap URL-jét, és szükség szerint kapcsold be az AI-bot tiltást." },
        { title: "4. Mentés", description: "Másold vagy töltsd le a fájlt, és tedd a webhelyed gyökerébe robots.txt néven." },
      ],
      useCases: [
        { icon: "🔒", title: "Admin elrejtése", description: "A belső, admin- vagy kosároldalak kizárása a keresők bejárásából." },
        { icon: "🗺️", title: "Sitemap jelzése", description: "A sitemap URL megadása segíti a keresőket az összes fontos oldal megtalálásában." },
        { icon: "🤖", title: "AI-botok kezelése", description: "Döntés arról, hogy az AI-crawlerek használhatják-e a tartalmadat, egy kattintással." },
        { icon: "⚙️", title: "WordPress beállítás", description: "Kész sablon a tipikus WordPress mappák helyes kezeléséhez." },
      ],
      formatComparison: {
        title: "A robots.txt fő direktívái",
        columns: ["Direktíva", "Jelentése"],
        rows: [
          { feature: "User-agent", values: ["Melyik robotra vonatkoznak a szabályok"] },
          { feature: "Disallow", values: ["Ezt az útvonalat ne járja be"] },
          { feature: "Allow", values: ["Ezt az útvonalat bejárhatja (kivétel)"] },
          { feature: "Crawl-delay", values: ["Várakozás kérések között (mp)"] },
          { feature: "Sitemap", values: ["A sitemap.xml teljes URL-je"] },
        ],
      },
      aboutSection: {
        title: "Hogyan működik a robots.txt?",
        paragraphs: [
          "A robots.txt a webhely és a keresőrobotok közötti udvariassági megállapodás. Amikor egy robot meglátogat egy oldalt, először a gyökérben lévő robots.txt fájlt kéri le, és megnézi, mely útvonalakat járhatja be. A fájl user-agent blokkokból áll: minden blokk megmondja, hogy egy adott robotra (vagy mindegyikre, a * jellel) milyen Disallow és Allow szabályok vonatkoznak.",
          "Fontos megérteni a korlátait. A robots.txt nem biztonsági eszköz: csak kérés, amelyet a jóindulatú robotok betartanak, de nem kényszerít ki semmit. A tiltott URL-ek továbbra is nyilvánosan elérhetők maradnak, ezért érzékeny tartalmat sosem szabad csak ezzel védeni. Emellett a Disallow megakadályozza a bejárást, de nem feltétlenül az indexelést – erre a noindex meta tag való.",
          "A modern web új kérdést hozott: az AI-botokat. Egyre több crawler gyűjt adatot nyelvi modellek tanításához vagy AI-keresőkhöz. A robots.txt-ben ezeket név szerint (pl. GPTBot, CCBot, Google-Extended) engedélyezheted vagy tilthatod, így te döntöd el, része lesz-e a tartalmad az AI-ökoszisztémának.",
        ],
      },
      tips: [
        { icon: "📍", tip: "A fájl mindig a gyökérben legyen, pontosan robots.txt néven – alkönyvtárban nem érvényes." },
        { icon: "🗺️", tip: "Mindig add meg a sitemap sorát – ez az egyik legegyszerűbb SEO-nyereség." },
        { icon: "⚠️", tip: "Sose tiltsd le véletlenül az egész oldalt (Disallow: /) éles környezetben – ez kizárhat a keresőből." },
        { icon: "🔐", tip: "Bizalmas tartalmat ne robots.txt-vel rejts – használj jelszót vagy szerveroldali védelmet." },
      ],
    },
  },

  // ─── UTM link generátor ─────────────────────────────────────────────────────
  "utm-generator": {
    introText:
      "Az UTM link generátor kampánykövető URL-eket épít, amelyekkel pontosan méred, honnan érkeznek a látogatóid. Add meg a cél URL-t és az UTM paramétereket (forrás, csatorna, kampány, kulcsszó, tartalom), az eszköz pedig azonnal összeállítja a kész, helyesen kódolt linket. A Google Analytics, a Plausible és a legtöbb analitikai rendszer ezekből a paraméterekből olvassa ki, melyik hirdetés, poszt vagy hírlevél hozta a forgalmat. Minden a böngésződben fut, feltöltés nélkül.",
    guide: [
      "1. Add meg a cél URL-t, ahová a látogatót irányítod.",
      "2. Töltsd ki a forrást (utm_source), a csatornát (utm_medium) és a kampány nevét (utm_campaign).",
      "3. Szükség szerint add meg a kulcsszót (utm_term) és a tartalom-változatot (utm_content).",
      "4. Másold ki a kész kampány URL-t, és használd a hirdetésben, posztban vagy hírlevélben.",
    ],
    faq: [
      { q: "Mi az az UTM paraméter?", a: "Az UTM paraméterek az URL végére fűzött, „utm_” előtagú címkék (pl. ?utm_source=facebook&utm_medium=social), amelyeket az analitikai rendszerek olvasnak. Segítségükkel pontosan látod, melyik forrásból, csatornából és kampányból érkezett egy látogató." },
      { q: "Melyik a három legfontosabb paraméter?", a: "A utm_source (honnan: pl. google, newsletter), a utm_medium (milyen csatornán: pl. cpc, email, social) és a utm_campaign (melyik kampány: pl. nyari_akcio). Ez a három adja a mérés gerincét; a term és a content opcionális finomítás." },
      { q: "Számít a kis- és nagybetű?", a: "Igen. A legtöbb analitikai rendszer külön kezeli a „Facebook” és a „facebook” értéket, ami kettéosztja az adatokat. A jó gyakorlat: mindig végig kisbetűt használj, és tartsd magad egy következetes elnevezési rendszerhez." },
      { q: "Használhatok szóközt a paraméterekben?", a: "Jobb elkerülni. A szóköz helyett használj alulvonást vagy kötőjelet (pl. nyari_akcio). Az eszköz automatikusan kódolja a speciális karaktereket, de a tiszta, kódolatlan nevek olvashatóbbak a riportokban." },
      { q: "Rontják az UTM paraméterek a SEO-t?", a: "Belső linkeken kerüld őket, mert megbonthatják a mérést és duplikált URL-eket okozhatnak. Külső kampányokhoz viszont ártalmatlanok, főleg ha az oldalnak van helyes canonical tagje, amely az alap URL-re mutat." },
      { q: "Az adatok szerverre kerülnek?", a: "Nem. A link összeállítása teljes egészében a böngésződben történik – semmilyen adat nem kerül feltöltésre." },
    ],
    content: {
      howToSteps: [
        { title: "1. Cél URL", description: "Add meg a teljes URL-t, ahová a kampány irányítja a látogatót." },
        { title: "2. Fő paraméterek", description: "Töltsd ki a source, medium és campaign mezőt – ezek a mérés alapjai." },
        { title: "3. Finomítás", description: "Szükség szerint add meg a term és content értéket a részletesebb bontáshoz." },
        { title: "4. Másolás", description: "A kész, kódolt kampány URL-t egy kattintással a vágólapra másolod." },
      ],
      useCases: [
        { icon: "📧", title: "Hírlevél", description: "A hírlevélben lévő linkek megjelölése, hogy lásd, mennyi forgalmat és konverziót hoznak." },
        { icon: "📣", title: "Fizetett hirdetés", description: "Google Ads és Facebook kampányok pontos forrás- és csatornaszerinti mérése." },
        { icon: "📱", title: "Közösségi média", description: "Az egyes platformok (Instagram, LinkedIn) teljesítményének külön követése." },
        { icon: "🤝", title: "Partnerlinkek", description: "Együttműködő oldalakról érkező forgalom azonosítása egyedi kampányjelöléssel." },
      ],
      formatComparison: {
        title: "Az UTM paraméterek",
        columns: ["Paraméter", "Mit jelöl", "Példa"],
        rows: [
          { feature: "utm_source", values: ["A forrás", "google, newsletter"] },
          { feature: "utm_medium", values: ["A csatorna", "cpc, email, social"] },
          { feature: "utm_campaign", values: ["A kampány neve", "nyari_akcio_2026"] },
          { feature: "utm_term", values: ["Fizetett kulcsszó", "futocipo"] },
          { feature: "utm_content", values: ["Tartalom-változat", "felso_banner"] },
        ],
      },
      aboutSection: {
        title: "Miért érdemes UTM-et használni?",
        paragraphs: [
          "Amikor forgalom érkezik az oldaladra, az analitika alapból csak annyit lát, hogy „közösségi média” vagy „hivatkozás” – de azt nem, hogy pontosan melyik poszt, hirdetés vagy hírlevél hozta. Az UTM paraméterek ezt a vakfoltot szüntetik meg: minden kampánylinkbe beépíted a forrást, a csatornát és a kampány nevét, így az analitikai riportban pontosan látod, mi működik és mi nem.",
          "A siker kulcsa a következetesség. Mivel a rendszerek külön kezelik a kis- és nagybetűket, valamint az eltérő elnevezéseket, egy laza gyakorlat gyorsan kusza, összehasonlíthatatlan adatokhoz vezet. Érdemes előre rögzíteni egy egyszerű konvenciót – mindig kisbetű, alulvonással elválasztott szavak, egységes forrás- és csatornanevek –, és ahhoz tartani magad minden kampányban.",
          "Fontos, hogy az UTM paramétereket csak külső, bejövő kampányokhoz használd, ne a saját oldalon belüli linkeken. A belső UTM-ek ugyanis felülírhatják az eredeti forrást a mérésben, és torzítják a riportot. A helyes canonical tag emellett gondoskodik arról, hogy a paraméteres URL-ek ne okozzanak duplikált tartalom problémát a keresőben.",
        ],
      },
      tips: [
        { icon: "🔡", tip: "Mindig kisbetűt használj – a Facebook és a facebook két külön forrásként jelenne meg." },
        { icon: "📋", tip: "Rögzíts egy elnevezési konvenciót, és tartsd magad hozzá minden kampányban." },
        { icon: "🚫", tip: "Ne tegyél UTM-et belső linkekre – csak külső, bejövő kampányokhoz való." },
        { icon: "🔗", tip: "Hosszú linkeket rövidíthetsz URL-rövidítővel, de a mérés így is működik a háttérben." },
      ],
    },
  },

  // ─── UTM paraméter eltávolító ───────────────────────────────────────────────
  "utm-eltavolito": {
    introText:
      "Az UTM eltávolító megtisztítja az URL-eket a kampánykövető és tracking paraméterektől: az összes utm_* címkétől, valamint a fbclid, gclid, mc_cid és sok más követő paramétertől. Illessz be egy vagy több URL-t, és azonnal megkapod a tiszta, megosztásra alkalmas változatot. Hasznos, amikor egy hirdetésből vagy hírlevélből kapott linket szeretnél tisztán megosztani vagy elmenteni, a felesleges nyomkövető farok nélkül. Minden a böngésződben fut.",
    guide: [
      "1. Illeszd be az URL-eket, soronként egyet (a hosszú, tracking-paraméteres linkeket is).",
      "2. Döntsd el, hogy csak az utm_* paramétereket, vagy az összes tracking paramétert (fbclid, gclid…) is eltávolítsa.",
      "3. Olvasd le a tiszta URL-eket és az eltávolított paraméterek számát.",
      "4. Másold ki az eredményt egy kattintással.",
    ],
    faq: [
      { q: "Milyen paramétereket távolít el?", a: "Alapból minden utm_-előtaggal kezdődő paramétert (utm_source, utm_medium, utm_campaign, utm_term, utm_content). Ha a tracking opció be van kapcsolva, a gyakori követő paramétereket is: fbclid, gclid, msclkid, mc_cid, yclid, igshid és sok mást." },
      { q: "Miért érdemes eltávolítani ezeket?", a: "A tracking paraméterek elrontják a linket megosztáskor, torzíthatják a saját analitikádat (ha belső linkre kerülnek), és feleslegesen hosszúvá teszik az URL-t. Egy tiszta URL rövidebb, megbízhatóbb és jobban néz ki." },
      { q: "Elrontja az oldal működését az eltávolítás?", a: "Nem. Az utm_ és tracking paraméterek kizárólag mérésre szolgálnak – az oldal tartalmát és működését nem befolyásolják. A tiszta URL ugyanarra az oldalra vezet." },
      { q: "Megtartja a fontos paramétereket?", a: "Igen. Csak az ismert tracking paramétereket távolítja el; a funkcionális paraméterek (pl. ?oldal=2, ?id=123, ?q=kereses) érintetlenül maradnak." },
      { q: "Egyszerre több URL-t is kezel?", a: "Igen, soronként egy URL-t. Minden sort külön dolgoz fel, a hibás sorokat pedig változatlanul hagyja." },
      { q: "Az URL-ek szerverre kerülnek?", a: "Nem. A teljes tisztítás a böngésződben történik – semmilyen URL nem hagyja el a gépedet." },
    ],
    content: {
      howToSteps: [
        { title: "1. URL-ek beillesztése", description: "Illeszd be a tracking-paraméteres linkeket, soronként egyet." },
        { title: "2. Mód választása", description: "Csak utm_*, vagy az összes tracking paraméter (fbclid, gclid…) eltávolítása." },
        { title: "3. Eredmény", description: "A tiszta URL-ek azonnal megjelennek, az eltávolított paraméterek számával." },
        { title: "4. Másolás", description: "A tisztított linkeket egy kattintással a vágólapra másolod." },
      ],
      useCases: [
        { icon: "🔗", title: "Link megosztás", description: "Hirdetésből vagy hírlevélből kapott link tisztán megosztása közösségi médiában." },
        { icon: "📊", title: "Tiszta analitika", description: "A belső linkekre tévedt UTM-ek eltávolítása, hogy ne torzítsák a forgalom mérését." },
        { icon: "🔖", title: "Könyvjelző", description: "Hosszú, követő paraméteres URL-ek tiszta elmentése későbbre." },
        { icon: "🕵️", title: "Adatvédelem", description: "A rólad árulkodó kattintás-azonosítók (fbclid, gclid) eltávolítása a linkből." },
      ],
      formatComparison: {
        title: "Gyakran eltávolított paraméterek",
        columns: ["Paraméter", "Honnan"],
        rows: [
          { feature: "utm_*", values: ["Általános kampánykövetés"] },
          { feature: "fbclid", values: ["Facebook"] },
          { feature: "gclid, gbraid", values: ["Google Ads"] },
          { feature: "msclkid", values: ["Microsoft / Bing Ads"] },
          { feature: "mc_cid, mc_eid", values: ["Mailchimp"] },
          { feature: "igshid", values: ["Instagram"] },
        ],
      },
      aboutSection: {
        title: "Mik azok a tracking paraméterek?",
        paragraphs: [
          "A tracking paraméterek az URL végére fűzött címkék, amelyek nem az oldal tartalmát befolyásolják, hanem mérési célt szolgálnak. A legismertebbek az utm_ előtagú paraméterek, amelyeket a marketingesek kampányaik forgalmának méréséhez adnak a linkekhez. Emellett minden nagy platform saját kattintás-azonosítót fűz a megosztott linkekhez: a Facebook fbclid-et, a Google gclid-et, a Microsoft msclkid-et.",
          "Ezek a paraméterek hasznosak a kampány oldaláról, de a felhasználónak gyakran csak zajt jelentenek. Egy megosztott link tele tracking farokkal hosszú, csúnya és megbízhatatlan; ráadásul ha egy ilyen link visszakerül a saját oldaladra belső hivatkozásként, összezavarhatja a saját analitikádat. Az eltávolításuk tiszta, semleges URL-t ad, amely ugyanarra az oldalra vezet.",
        ],
      },
      tips: [
        { icon: "🧹", tip: "Mielőtt egy hirdetési linket megosztasz privát üzenetben, tisztítsd meg – a fbclid rólad árulkodik." },
        { icon: "📊", tip: "Belső linkekre soha ne kerüljön UTM – ha mégis, itt gyorsan eltávolíthatod." },
        { icon: "🔗", tip: "A funkcionális paraméterek (pl. ?oldal=2) megmaradnak, csak a követők tűnnek el." },
        { icon: "🤝", tip: "Párja az UTM építő: kampányhoz hozzáadod, megosztáshoz eltávolítod." },
      ],
    },
  },

  // ─── URL normalizáló ────────────────────────────────────────────────────────
  "url-normalizalo": {
    introText:
      "Az URL normalizáló egységes, kanonikus formára hozza az URL-eket: kényszerítheti a https protokollt, kezelheti a www előtagot és a záró perjelet, kisbetűsíti a hostot, eltávolíthatja a fragmentet és rendezheti a query paramétereket. Illessz be egy vagy több URL-t, válaszd ki a szabályokat, és azonnal megkapod a normalizált változatot. Hasznos, ha URL-listákat kell egységesíteni, duplikátumokat kiszűrni vagy canonical URL-eket előkészíteni. Minden a böngésződben fut.",
    guide: [
      "1. Illeszd be az URL-eket, soronként egyet.",
      "2. Válaszd ki a normalizálási szabályokat (https, www, trailing slash, fragment, query rendezés).",
      "3. Olvasd le az egységesített URL-eket.",
      "4. Másold ki az eredményt egy kattintással.",
    ],
    faq: [
      { q: "Mi az az URL normalizálás?", a: "Az URL normalizálás az URL-ek egységes, kanonikus formára hozása. Ugyanaz az oldal sokféle URL-lel elérhető lehet (www-vel vagy anélkül, http vagy https, záró perjellel vagy anélkül); a normalizálás ezeket egyetlen, következetes formára hozza." },
      { q: "Miért fontos ez a SEO-ban?", a: "A keresők a különböző URL-variánsokat külön oldalként kezelhetik, ami duplikált tartalmat és megosztott linkerőt okoz. A következetes, normalizált URL-ek (és a hozzájuk tartozó canonical tagek) segítenek elkerülni ezt." },
      { q: "Melyik szabályokat érdemes bekapcsolni?", a: "A https kényszerítése és a fragment eltávolítása szinte mindig hasznos. A www és a trailing slash kezelése attól függ, milyen formát választottál a webhelyed kanonikus URL-jének – a lényeg a következetesség." },
      { q: "Elrontja a query paramétereket?", a: "Nem. A query paramétereket megtartja; a rendezés opció csak ábécé sorrendbe teszi őket, hogy két azonos, de eltérő sorrendű URL azonos formát kapjon." },
      { q: "Mit csinál a felesleges porttal?", a: "A szabványos portokat (:80 a http-nél, :443 a https-nél) automatikusan eltávolítja, mert azok redundánsak – az URL enélkül is ugyanoda mutat." },
      { q: "Az URL-ek szerverre kerülnek?", a: "Nem. A teljes normalizálás a böngésződben történik – semmilyen adat nem kerül feltöltésre." },
    ],
    content: {
      howToSteps: [
        { title: "1. URL-ek beillesztése", description: "Illeszd be a normalizálandó URL-eket, soronként egyet." },
        { title: "2. Szabályok", description: "Kapcsold be a kívánt szabályokat: https, www, trailing slash, fragment, query rendezés." },
        { title: "3. Eredmény", description: "A normalizált, egységes URL-ek azonnal megjelennek." },
        { title: "4. Másolás", description: "Az eredményt egy kattintással a vágólapra másolod." },
      ],
      useCases: [
        { icon: "🔁", title: "Duplikátum-szűrés", description: "URL-listák egységesítése, hogy a valójában azonos címek egyformák legyenek." },
        { icon: "🔗", title: "Canonical előkészítés", description: "A canonical tagekhez szükséges tiszta, kanonikus URL-forma előállítása." },
        { icon: "🧭", title: "Átirányítás-tervezés", description: "A cél URL-ek egységesítése redirect szabályok írása előtt." },
        { icon: "🗃️", title: "Adattisztítás", description: "Export- vagy crawl-listákból származó URL-ek konzisztens formára hozása." },
      ],
      formatComparison: {
        title: "Tipikus normalizálási lépések",
        columns: ["Lépés", "Példa"],
        rows: [
          { feature: "https kényszerítés", values: ["http://… → https://…"] },
          { feature: "host kisbetűsítés", values: ["Pelda.HU → pelda.hu"] },
          { feature: "www kezelés", values: ["www.pelda.hu → pelda.hu"] },
          { feature: "trailing slash", values: ["/oldal/ → /oldal"] },
          { feature: "fragment eltávolítás", values: ["/oldal#resz → /oldal"] },
        ],
      },
      aboutSection: {
        title: "Miért van szükség normalizálásra?",
        paragraphs: [
          "Ugyanaz a weboldal elméletben végtelen sokféle URL-lel érhető el. A `http://Www.Pelda.hu/Oldal/`, a `https://pelda.hu/oldal` és a `https://pelda.hu/oldal/?utm_source=x#top` mind ugyanoda vezethet, mégis különböző karakterláncok. Az emberek ezt könnyen átlátják, de a gépek – a keresők, a gyorsítótárak, az analitikai rendszerek – külön entitásként kezelhetik őket.",
          "A normalizálás egy sor determinisztikus szabállyal egyetlen, kanonikus formára hozza ezeket a variánsokat: egységes protokoll és kis-nagybetű, következetes www- és perjel-kezelés, felesleges részek eltávolítása. Az eredmény: azonos oldalak azonos URL-t kapnak, ami elengedhetetlen a duplikátumok kiszűréséhez, a helyes canonical-tagekhez és a tiszta méréshez.",
        ],
      },
      tips: [
        { icon: "🎯", tip: "Döntsd el egyszer, mi a kanonikus formád (www vagy anélkül, perjellel vagy anélkül), és tartsd magad hozzá mindenhol." },
        { icon: "🔒", tip: "A https kényszerítése ma alap – http-linket ne hagyj a rendszeredben." },
        { icon: "🔗", tip: "A normalizált URL a kiindulás a canonical taghez – onnan a Canonical generátorral folytathatod." },
        { icon: "🧹", tip: "Tracking paraméterek eltávolításához használd az UTM eltávolítót a normalizálás előtt." },
      ],
    },
  },

  // ─── Canonical tag generátor ────────────────────────────────────────────────
  "canonical-epito": {
    introText:
      "A canonical tag generátor egy vagy több URL-ből legenerálja a megfelelő <link rel=\"canonical\"> HTML tageket, amelyekkel megjelölheted az oldalaid hivatalos, elsődleges változatát. A canonical tag a duplikált tartalom egyik legfontosabb technikai eszköze: megmondja a keresőknek, melyik URL-t indexeljék, ha ugyanaz a tartalom több címen is elérhető. Illeszd be az URL-eket, és azonnal megkapod a beilleszthető tageket. Minden a böngésződben fut.",
    guide: [
      "1. Illeszd be az URL-eket, soronként egyet – teljes, abszolút (https://…) címeket.",
      "2. Az eszköz minden sorhoz legenerálja a canonical tageket.",
      "3. Ellenőrizd, hogy minden URL abszolút (a figyelmeztetés jelzi, ha nem).",
      "4. Másold ki a tageket, és illeszd az oldalak <head> szakaszába.",
    ],
    faq: [
      { q: "Mi az a canonical tag?", a: "A canonical tag (<link rel=\"canonical\">) egy HTML elem a <head> szakaszban, amely megmondja a keresőknek, melyik URL az oldal hivatalos, elsődleges változata. Ha ugyanaz a tartalom több URL-en elérhető, a canonical jelzi, melyiket indexeljék." },
      { q: "Mikor van rá szükség?", a: "Amikor ugyanaz vagy nagyon hasonló tartalom több URL-en is elérhető: paraméteres változatok (?utm_…, ?szuro=…), www-vel és anélkül, http és https, vagy ugyanaz a termék több kategóriaútvonalon. Ilyenkor a canonical megelőzi a duplikált tartalom problémát." },
      { q: "Az abszolút vagy relatív URL a helyes?", a: "Mindig abszolút, teljes URL-t adj meg (https://pelda.hu/oldal/). A relatív canonical működhet, de kockázatos és félreértelmezhető – az eszköz figyelmeztet, ha nem abszolút URL-t adsz meg." },
      { q: "Minden oldal magára mutasson?", a: "Igen, a bevált gyakorlat a self-referencing canonical: minden oldal a saját, tiszta URL-jére mutat. Kivétel, ha egy oldal szándékosan egy másik oldal duplikátuma – akkor az eredetire mutat." },
      { q: "Hova kerül a tag?", a: "A canonical tag mindig az oldal <head> szakaszába kerül, lehetőleg a tetejére. Oldalanként pontosan egy canonical tag legyen." },
      { q: "Az URL-ek szerverre kerülnek?", a: "Nem. A tagek generálása a böngésződben történik – semmilyen URL nem kerül feltöltésre." },
    ],
    content: {
      howToSteps: [
        { title: "1. URL-ek beillesztése", description: "Add meg az oldalak abszolút URL-jeit, soronként egyet." },
        { title: "2. Generálás", description: "Az eszköz azonnal legenerálja a canonical tageket minden URL-hez." },
        { title: "3. Ellenőrzés", description: "A figyelmeztetés jelzi, ha egy URL nem abszolút formájú." },
        { title: "4. Beillesztés", description: "Másold a tageket az oldalak <head> szakaszába." },
      ],
      useCases: [
        { icon: "🛒", title: "Webshop", description: "Ugyanaz a termék több kategóriaútvonalon – a canonical az elsődleges URL-re mutat." },
        { icon: "🔗", title: "Paraméteres URL-ek", description: "Szűrős és rendezős listaoldalak canonical-ozása az alap URL-re." },
        { icon: "📰", title: "Szindikált tartalom", description: "Máshol újraközölt cikk canonical-ja az eredeti forrásra mutat." },
        { icon: "🌐", title: "www és protokoll", description: "A www-s és protokoll-variánsok egyetlen kanonikus formára terelése." },
      ],
      formatComparison: {
        title: "Duplikáció-források, ahol a canonical segít",
        columns: ["Forrás", "Példa"],
        rows: [
          { feature: "Tracking paraméter", values: ["/oldal?utm_source=hirlevel"] },
          { feature: "Szűrő / rendezés", values: ["/lista?rendez=ar&oldal=2"] },
          { feature: "www variáns", values: ["www.pelda.hu vs pelda.hu"] },
          { feature: "Több útvonal", values: ["/cipok/futo/x és /akcio/x"] },
        ],
      },
      aboutSection: {
        title: "A canonical tag szerepe",
        paragraphs: [
          "A duplikált tartalom a keresőoptimalizálás egyik csendes problémája. Ritkán szándékos: legtöbbször abból ered, hogy a webhely technikailag többféle URL-en szolgálja ki ugyanazt a tartalmat – paraméterekkel, www-vel és anélkül, vagy több navigációs útvonalon. A keresők ilyenkor nem tudják, melyik a hivatalos változat, és megoszthatják köztük a rangsorolási erőt, vagy rossz URL-t indexelhetnek.",
          "A canonical tag erre a legtisztább megoldás: minden oldal <head> szakaszában megjelöli, melyik az elsődleges URL. A bevált gyakorlat a self-referencing canonical – minden oldal a saját, tiszta URL-jére mutat –, kivéve a szándékos duplikátumokat, amelyek az eredetire hivatkoznak. Fontos, hogy a canonical mindig abszolút, teljes URL legyen, és összhangban álljon a webhely többi jelzésével (sitemap, belső linkek, átirányítások).",
        ],
      },
      tips: [
        { icon: "🔗", tip: "Mindig abszolút, https-es URL-t használj – a relatív canonical kockázatos." },
        { icon: "1️⃣", tip: "Oldalanként pontosan egy canonical tag legyen – a több tag összezavarja a keresőt." },
        { icon: "🪞", tip: "Alapesetben minden oldal magára mutasson (self-referencing canonical)." },
        { icon: "🧭", tip: "A canonical URL egyezzen a sitemapben és a belső linkekben használt URL-lel." },
      ],
    },
  },

  // ─── SEO fájlnév optimalizáló ───────────────────────────────────────────────
  "fajlnev-optimalizalo": {
    introText:
      "A SEO fájlnév optimalizáló a fájlneveket – jellemzően képekét – kereső- és URL-barát formára alakítja: eltávolítja az ékezeteket és a speciális karaktereket, a szóközöket kötőjelre (vagy alulvonásra) cseréli, és kisbetűsíti a nevet, miközben a kiterjesztést megtartja. Illessz be egy vagy több fájlnevet, és azonnal megkapod a tiszta, feltölthető változatot. A leíró, tiszta fájlnevek segítik a keresőket a kép tartalmának megértésében. Minden a böngésződben fut.",
    guide: [
      "1. Illeszd be a fájlneveket, soronként egyet (a kiterjesztéssel együtt).",
      "2. Válaszd ki az elválasztót (kötőjel vagy alulvonás) és a kisbetűsítést.",
      "3. Olvasd le a SEO-barát fájlneveket.",
      "4. Másold ki az eredményt, és nevezd át velük a fájljaidat feltöltés előtt.",
    ],
    faq: [
      { q: "Miért számít a fájlnév a SEO-ban?", a: "A képek fájlneve az egyik jel, amiből a keresők a kép tartalmára következtetnek. Egy leíró, tiszta fájlnév (piros-k/eramia-bogre.jpg) sokkal többet mond, mint egy IMG_20260704.jpg, és segíti a képkeresésben való megjelenést." },
      { q: "Miért kell eltávolítani az ékezeteket?", a: "Az ékezetes és speciális karakterek a fájlnévben (és így az URL-ben) kódolási problémákat okozhatnak: a böngészők %-kódolásra alakítják őket, ami csúnya, hosszú és hibalehetőségeket rejtő URL-t ad. Az ékezetmentes, ASCII fájlnév mindenhol megbízhatóan működik." },
      { q: "Kötőjel vagy alulvonás legyen?", a: "A Google a kötőjelet ajánlja a szavak elválasztására a fájlnevekben és URL-ekben, mert azt szóelválasztóként értelmezi. Az alulvonást összekapcsolásként kezeli. SEO szempontból tehát a kötőjel a jobb választás." },
      { q: "Megtartja a kiterjesztést?", a: "Igen. Az utolsó pont utáni kiterjesztést (.jpg, .png, .pdf) érintetlenül megtartja, csak kisbetűsíti – a névrészt optimalizálja." },
      { q: "Több fájlnevet is kezel?", a: "Igen, soronként egyet. Ideális egy teljes képkészlet átnevezésének előkészítéséhez feltöltés előtt." },
      { q: "A fájlnevek szerverre kerülnek?", a: "Nem. A teljes átalakítás a böngésződben történik – semmi nem kerül feltöltésre." },
    ],
    content: {
      howToSteps: [
        { title: "1. Fájlnevek beillesztése", description: "Add meg a fájlneveket a kiterjesztéssel, soronként egyet." },
        { title: "2. Beállítások", description: "Válaszd ki az elválasztót (- vagy _) és a kisbetűsítést." },
        { title: "3. Eredmény", description: "A SEO-barát, ékezetmentes fájlnevek azonnal megjelennek." },
        { title: "4. Átnevezés", description: "Másold az eredményt, és nevezd át a fájlokat feltöltés előtt." },
      ],
      useCases: [
        { icon: "🖼️", title: "Képfeltöltés", description: "Termék- és blogképek nevének optimalizálása a jobb képkeresés-eredményért." },
        { icon: "🛒", title: "E-commerce", description: "Termékfotók tömeges átnevezése egységes, leíró, SEO-barát nevekre." },
        { icon: "📄", title: "Letölthető fájlok", description: "PDF-ek, dokumentumok nevének tisztítása a szép, működő letöltési URL-ért." },
        { icon: "🌐", title: "Statikus oldalak", description: "Asset-fájlnevek egységesítése egy webhely előkészítésekor." },
      ],
      formatComparison: {
        title: "Átalakítási példák",
        columns: ["Eredeti", "Optimalizált"],
        rows: [
          { feature: "Nyári Bögre (piros).JPG", values: ["nyari-bogre-piros.jpg"] },
          { feature: "Árlista 2026 – végleges.PDF", values: ["arlista-2026-vegleges.pdf"] },
          { feature: "Kép másolata (1).png", values: ["kep-masolata-1.png"] },
        ],
      },
      aboutSection: {
        title: "Miért fontos a tiszta fájlnév?",
        paragraphs: [
          "A fájlnév apró, mégis valódi SEO-jel, különösen a képeknél. Amikor feltöltesz egy képet, a fájlneve az egyik első információ, amiből a kereső a tartalmára következtet – még az alt szöveg előtt. Egy beszédes fájlnév, mint a `kek-gyapju-pled.jpg`, sokkal többet árul el, mint egy `DSC00417.jpg`, és növeli az esélyt, hogy a kép megjelenjen a Google Képek találatai között.",
          "A technikai tisztaság legalább ilyen fontos. Az ékezetes és speciális karaktereket tartalmazó fájlnevek az URL-ben százalékkódolásra alakulnak (a szóközből %20, az á-ból %C3%A1 lesz), ami csúnya, hosszú és törékeny linkeket eredményez. Az ékezetmentes, kisbetűs, kötőjellel tagolt fájlnév minden szerveren, böngészőben és megosztásnál megbízhatóan működik – ezért érdemes már feltöltés előtt optimalizálni.",
        ],
      },
      tips: [
        { icon: "✍️", tip: "Használj leíró, kulcsszót tartalmazó neveket – de természetesen, ne halmozz." },
        { icon: "➖", tip: "Szóelválasztónak kötőjelet válassz, ezt kezeli a Google szóhatárként." },
        { icon: "🔤", tip: "Kisbetű mindenütt – így elkerülöd a kis-nagybetű okozta duplikátumokat egyes szervereken." },
        { icon: "🖼️", tip: "A jó fájlnév után add meg a leíró alt szöveget is – a kettő együtt hat." },
      ],
    },
  },

  // ─── Kép alt szöveg sablon generátor ────────────────────────────────────────
  "alt-szoveg-sablon": {
    introText:
      "Az alt szöveg sablon generátor tömegesen készít kép-alt szövegeket egy sablonból és adatsorokból. Írj egy sablont {1}, {2} helyőrzőkkel, add meg az adatokat soronként (mezők vesszővel elválasztva), és az eszköz minden sorra behelyettesíti az értékeket. Az eredményt másolhatod vagy CSV-ként letöltheted. Ideális webshopokhoz és nagy képkészletekhez, ahol sok hasonló képhez kell gyorsan leíró, akadálymentes és SEO-barát alt szöveget készíteni. Minden a böngésződben fut.",
    guide: [
      "1. Írd meg a sablont helyőrzőkkel, pl. „{1} {2} – termékfotó fehér háttéren”.",
      "2. Add meg az adatsorokat, soronként egyet, a mezőket vesszővel elválasztva.",
      "3. Nézd meg a legenerált alt szövegeket az élő listában.",
      "4. Másold ki őket, vagy töltsd le CSV-ként a fájlokhoz rendeléshez.",
    ],
    faq: [
      { q: "Mi az az alt szöveg?", a: "Az alt szöveg (alt attribútum) a kép szöveges leírása a HTML-ben. Képernyőolvasók ezt olvassák fel a látássérült felhasználóknak, és a keresők is ebből értik meg a kép tartalmát. Akadálymentességi és SEO szempontból egyaránt fontos." },
      { q: "Hogyan működnek a helyőrzők?", a: "A sablonban a {1}, {2}, {3}… helyőrzők az adatsor mezőire hivatkoznak: a {1} az első vesszővel elválasztott mező, a {2} a második, és így tovább. Minden adatsorra behelyettesíti a megfelelő értékeket." },
      { q: "Milyen a jó alt szöveg?", a: "Tömör (általában 125 karakter alatt), leíró, és a kép valódi tartalmát írja le a kontextusban. Nem kulcsszóhalmaz, és nem kezdődik azzal, hogy „kép a…”. A tömeges generálásnál is törekedj arra, hogy a sablon értelmes, természetes mondatot adjon." },
      { q: "Mire jó a CSV export?", a: "A CSV-ben minden bemeneti mező és a generált alt szöveg egy-egy oszlopban szerepel. Így könnyen párosíthatod a fájlnevekhez, importálhatod egy táblázatba vagy a CMS-edbe tömeges feltöltéshez." },
      { q: "Minden képnek egyedi alt kell?", a: "Igen, ideális esetben. A sablon segít, de az adatsorok tegyék egyedivé az egyes szövegeket – a teljesen azonos alt szöveg sok képnél nem hasznos sem a felhasználónak, sem a keresőnek." },
      { q: "Az adatok szerverre kerülnek?", a: "Nem. A teljes generálás a böngésződben történik – semmilyen adat nem kerül feltöltésre." },
    ],
    content: {
      howToSteps: [
        { title: "1. Sablon", description: "Írd meg a sablont {1}, {2} helyőrzőkkel a változó részekhez." },
        { title: "2. Adatsorok", description: "Add meg az adatokat soronként, a mezőket vesszővel elválasztva." },
        { title: "3. Előnézet", description: "A behelyettesített alt szövegek azonnal megjelennek a listában." },
        { title: "4. Export", description: "Másold a szövegeket, vagy töltsd le CSV-ként a fájlokhoz rendeléshez." },
      ],
      useCases: [
        { icon: "🛒", title: "Webshop katalógus", description: "Több száz termékfotó alt szövegének gyors, egységes generálása." },
        { icon: "♿", title: "Akadálymentesítés", description: "Meglévő képkészlet ellátása leíró alt szöveggel a képernyőolvasókhoz." },
        { icon: "📸", title: "Fotógaléria", description: "Galériaképek egységes, változóval testre szabott leírása." },
        { icon: "📊", title: "CMS-import", description: "Alt szövegek tömeges előállítása CSV-ben a tartalomkezelőbe importáláshoz." },
      ],
      formatComparison: {
        title: "Sablon és eredmény",
        columns: ["Elem", "Példa"],
        rows: [
          { feature: "Sablon", values: ["{1} {2} – termékfotó fehér háttéren"] },
          { feature: "Adatsor", values: ["Piros bögre, kerámia"] },
          { feature: "Eredmény", values: ["Piros bögre kerámia – termékfotó fehér háttéren"] },
        ],
      },
      aboutSection: {
        title: "Alt szöveg: akadálymentesség és SEO",
        paragraphs: [
          "Az alt szöveg a web egyik legfontosabb, mégis gyakran elhanyagolt eleme. Elsődleges szerepe az akadálymentesség: a képernyőolvasót használó, látássérült felhasználók számára az alt szöveg az egyetlen mód, hogy megtudják, mit ábrázol egy kép. Egy jól megírt alt leírás nélkül a kép számukra egyszerűen nem létezik, vagy csak egy értelmetlen fájlnévként jelenik meg.",
          "Emellett az alt szöveg SEO-jel is: a keresők ebből (a fájlnévvel és a környező szöveggel együtt) értik meg a kép tartalmát, ami befolyásolja a képkeresésben való megjelenést. Nagy képkészleteknél – például egy webshop termékfotóinál – a kézi alt-írás rengeteg időt vesz igénybe. A sablonos, adatvezérelt megközelítés felgyorsítja ezt: egy jól megírt sablon és a strukturált adatok együtt sok egyedi, mégis konzisztens alt szöveget adnak percek alatt.",
        ],
      },
      tips: [
        { icon: "📏", tip: "Tartsd az alt szöveget 125 karakter alatt – a képernyőolvasók ennyit olvasnak fel kényelmesen." },
        { icon: "🚫", tip: "Ne kezdd azzal, hogy „kép a…” – a kontextusból már tudni, hogy kép." },
        { icon: "🎯", tip: "A sablon adjon értelmes, természetes mondatot – ne csak kulcsszavakat fűzz össze." },
        { icon: "🖼️", tip: "A díszítő, tartalom nélküli képek alt-ja legyen üres (alt=\"\"), ne erőltess rájuk szöveget." },
      ],
    },
  },

  // ─── robots.txt ellenőrző ───────────────────────────────────────────────────
  "robots-txt-ellenorzo": {
    introText:
      "A robots.txt ellenőrző megmutatja, hogy egy adott URL-t bejárhat-e a keresőrobot a robots.txt szabályai szerint. Illeszd be a robots.txt tartalmát, add meg a user-agentet és a tesztelendő URL-eket, az eszköz pedig minden URL-re megmondja, engedélyezett-e a bejárás, és melyik szabály dönt. A Google-féle „leghosszabb egyező szabály nyer” logikát követi, wildcard (*) és sorvég ($) támogatással. Így még élesítés előtt kiszűrheted a véletlen kizárásokat. Minden a böngésződben fut.",
    guide: [
      "1. Illeszd be a robots.txt teljes tartalmát.",
      "2. Add meg a user-agentet (pl. Googlebot), amelyre tesztelsz.",
      "3. Írd be a tesztelendő URL-eket vagy útvonalakat, soronként egyet.",
      "4. Olvasd le minden URL-re: engedélyezett vagy tiltott, és melyik szabály alapján.",
    ],
    faq: [
      { q: "Hogyan dönti el, hogy engedélyezett-e egy URL?", a: "A Google szabálya szerint a leghosszabb (legspecifikusabb) egyező szabály nyer. Az eszköz minden Allow és Disallow szabályt megvizsgál a user-agenthez tartozó blokkban, és a leghosszabb egyezőt alkalmazza; azonos hossznál az Allow győz." },
      { q: "Támogatja a wildcardot és a $ jelet?", a: "Igen. A * bármilyen karaktersorozatot jelöl (pl. /*.pdf minden PDF-re illeszkedik), a $ pedig a sorvéget rögzíti (pl. /*.php$ csak a .php-re végződő URL-ekre). Ezeket a modern keresők is így értelmezik." },
      { q: "Miért nem tölti le magától a robots.txt-t?", a: "Az eszköz kliens-oldali, a böngésződben fut, ezért nem tud más domainek robots.txt-jét letölteni (a böngésző biztonsági korlátai miatt). Ehelyett beilleszted a tartalmat – így bizalmas vagy még nem élő robots.txt-t is tesztelhetsz." },
      { q: "Mi a különbség user-agentek között?", a: "A robots.txt külön szabályokat adhat különböző botoknak (Googlebot, Bingbot, GPTBot…). Az eszköz a megadott user-agenthez tartozó legspecifikusabb blokkot használja, vagy a * blokkot, ha nincs pontos egyezés." },
      { q: "A Disallow azt jelenti, hogy nem indexelődik?", a: "Nem. A Disallow a bejárást tiltja, de a tiltott URL még megjelenhet a találatokban (cím nélkül). Az indexelésből való teljes kizáráshoz a noindex meta tag kell – de az csak akkor hat, ha a bejárás engedélyezett." },
      { q: "Az adatok szerverre kerülnek?", a: "Nem. A teljes elemzés a böngésződben történik – semmilyen adat nem kerül feltöltésre." },
    ],
    content: {
      howToSteps: [
        { title: "1. robots.txt beillesztése", description: "Illeszd be a fájl teljes tartalmát a szövegmezőbe." },
        { title: "2. User-agent", description: "Add meg, melyik botra tesztelsz (pl. Googlebot)." },
        { title: "3. URL-ek", description: "Írd be a tesztelendő URL-eket vagy útvonalakat, soronként egyet." },
        { title: "4. Eredmény", description: "Minden URL-re látod: engedélyezett vagy tiltott, és a döntő szabály." },
      ],
      useCases: [
        { icon: "🛡️", title: "Élesítés előtti ellenőrzés", description: "Annak igazolása, hogy egy új robots.txt nem zárja ki véletlenül a fontos oldalakat." },
        { icon: "🔍", title: "Hibakeresés", description: "Kideríteni, miért nem járja be a Google egy adott URL-t." },
        { icon: "🤖", title: "Bot-specifikus szabályok", description: "Ellenőrizni, hogy egy AI-bot vagy egy adott kereső eléri-e a tartalmat." },
        { icon: "📋", title: "Audit", description: "Meglévő robots.txt szabályainak ütköztetése a valós URL-struktúrával." },
      ],
      formatComparison: {
        title: "Szabály-illeszkedés példák",
        columns: ["Szabály", "Illeszkedik-e a /admin/kep.jpg-re"],
        rows: [
          { feature: "Disallow: /admin/", values: ["Igen – tiltott"] },
          { feature: "Allow: /admin/*.jpg", values: ["Igen, hosszabb – engedélyezett"] },
          { feature: "Disallow: /*.php$", values: ["Nem (nem .php végű)"] },
        ],
      },
      aboutSection: {
        title: "Hogyan értelmezi a Google a robots.txt-t?",
        paragraphs: [
          "A robots.txt látszólag egyszerű, de a szabályok ütközésének feloldása gyakran meglepő. Amikor egy URL-re több szabály is illeszkedik – például egy általános Disallow és egy specifikusabb Allow –, a keresők nem a sorrend, hanem a specifikusság alapján döntenek: a leghosszabb (legtöbb karaktert egyeztető) szabály nyer. Ha egy Allow és egy Disallow ugyanolyan hosszan illeszkedik, az Allow az erősebb.",
          "Ehhez jön a mintaillesztés két eszköze: a * bármilyen karaktersorozatot helyettesít, a $ pedig az URL végét rögzíti. Ezekkel finom szabályok írhatók (pl. „minden PDF tiltva, de egy mappa engedélyezve”), amelyek hatását fejben nehéz követni. Ez az eszköz pontosan ezt a logikát futtatja le a beillesztett szabályokon és a teszt-URL-eken, így még élesítés előtt látod, mit enged és mit tilt valójában a robots.txt-d.",
        ],
      },
      tips: [
        { icon: "🧪", tip: "Új robots.txt élesítése előtt teszteld a legfontosabb URL-jeidet – egy elgépelt Disallow sokba kerülhet." },
        { icon: "🎯", tip: "Ne feledd: a leghosszabb egyező szabály nyer, nem a sorrend." },
        { icon: "🤖", tip: "Teszteld több user-agentre is, ha bot-specifikus szabályaid vannak." },
        { icon: "🔗", tip: "A robots.txt megírásához használd a robots.txt generátorunkat, majd itt teszteld le." },
      ],
    },
  },

  // ─── Sitemap URL ellenőrző ──────────────────────────────────────────────────
  "sitemap-url-ellenorzo": {
    introText:
      "A sitemap URL ellenőrző beolvassa a beillesztett XML sitemap tartalmát, és kilistázza a benne szereplő URL-eket a darabszámmal, valamint a lastmod (utolsó módosítás) és priority (prioritás) adatokkal, ha vannak. Felismeri a sitemap-indexeket is, amelyek al-sitemapokra mutatnak. Így gyorsan ellenőrizheted, hány URL van a sitemapedben, jól formázott-e, és mit tartalmaz – közvetlenül a böngésződben, feltöltés nélkül.",
    guide: [
      "1. Illeszd be az XML sitemap teljes tartalmát.",
      "2. Az eszköz azonnal kilistázza az URL-eket és a darabszámot.",
      "3. Nézd meg a lastmod és priority adatokat, ha a sitemap tartalmazza őket.",
      "4. Másold ki az URL-listát egy kattintással.",
    ],
    faq: [
      { q: "Mi az az XML sitemap?", a: "Az XML sitemap egy fájl, amely felsorolja a webhely fontos URL-jeit, hogy a keresők könnyebben megtalálják és bejárják őket. Tartalmazhatja az utolsó módosítás dátumát (lastmod) és a prioritást (priority) is minden URL-hez." },
      { q: "Mi az a sitemap-index?", a: "A sitemap-index egy olyan sitemap, amely nem oldalakra, hanem további sitemapokra mutat. Nagy webhelyeknél használják, ahol egy sitemap nem elég (a limit 50 000 URL vagy 50 MB fájlonként). Az eszköz felismeri és jelzi, ha indexet illesztettél be." },
      { q: "Miért nem tölti le magától a sitemapet?", a: "Az eszköz a böngésződben fut, ezért nem tud más domainek sitemapjét letölteni (a böngésző biztonsági korlátai miatt). Beilleszted a tartalmat – így még nem élő vagy lokálisan generált sitemapet is ellenőrizhetsz." },
      { q: "Mekkora sitemapet kezel?", a: "Az elemzés a böngésződben, gyorsan fut, így akár több ezer URL-es sitemapet is kezel. A megjelenített lista görgethető, a darabszám pedig mindig a teljes mennyiséget mutatja." },
      { q: "Mit jelent a lastmod és a priority?", a: "A lastmod az oldal utolsó módosításának dátuma – segít a keresőnek eldönteni, mit járjon be újra. A priority (0.0–1.0) az oldal relatív fontosságát jelzi a webhelyen belül, bár a Google ezt ma már kevéssé veszi figyelembe." },
      { q: "Az adatok szerverre kerülnek?", a: "Nem. A teljes elemzés a böngésződben történik – a sitemap nem kerül feltöltésre." },
    ],
    content: {
      howToSteps: [
        { title: "1. Sitemap beillesztése", description: "Illeszd be az XML sitemap teljes tartalmát a szövegmezőbe." },
        { title: "2. Elemzés", description: "Az eszköz azonnal kinyeri és listázza az URL-eket a darabszámmal." },
        { title: "3. Adatok", description: "Nézd meg a lastmod és priority értékeket, ha szerepelnek." },
        { title: "4. Másolás", description: "Az URL-listát egy kattintással a vágólapra másolod." },
      ],
      useCases: [
        { icon: "✅", title: "Sitemap validálás", description: "Gyors ellenőrzés, hogy a sitemap jól formázott-e és hány URL-t tartalmaz." },
        { icon: "🔍", title: "Tartalom-audit", description: "Az indexelésre szánt URL-ek listájának áttekintése egy helyen." },
        { icon: "🗺️", title: "Index kibontása", description: "Sitemap-index esetén az al-sitemapok címeinek gyors kigyűjtése." },
        { icon: "📊", title: "URL-export", description: "A sitemap URL-jeinek kimásolása további elemzéshez vagy táblázatba." },
      ],
      formatComparison: {
        title: "A sitemap elemei",
        columns: ["Elem", "Jelentése"],
        rows: [
          { feature: "<loc>", values: ["Az oldal URL-je (kötelező)"] },
          { feature: "<lastmod>", values: ["Utolsó módosítás dátuma"] },
          { feature: "<priority>", values: ["Relatív fontosság (0.0–1.0)"] },
          { feature: "<sitemap>", values: ["Al-sitemap egy indexben"] },
        ],
      },
      aboutSection: {
        title: "Miért fontos a sitemap?",
        paragraphs: [
          "Az XML sitemap a webhely térképe a keresők számára: felsorolja azokat az URL-eket, amelyeket a tulajdonos fontosnak tart és be szeretne járatni. Különösen hasznos nagy webhelyeknél, új oldalaknál vagy gyenge belső linkeléssel rendelkező tartalmaknál, ahol a kereső magától nehezen találná meg az összes oldalt. A sitemap beküldése a Search Console-ba felgyorsíthatja az új tartalom felfedezését.",
          "Egy jó sitemap tiszta és naprakész: csak a valóban indexelendő, 200-as státuszú, canonical URL-eket tartalmazza, a lastmod pedig valósan tükrözi a módosításokat. A hibás vagy elavult sitemap ezzel szemben félrevezeti a keresőt. Ez az eszköz gyors betekintést ad a sitemap tartalmába – hány URL van benne, jól formázott-e, index-e vagy sima sitemap –, hogy még beküldés előtt kiszúrd a problémákat.",
        ],
      },
      tips: [
        { icon: "🧼", tip: "A sitemap csak indexelendő, canonical, 200-as URL-eket tartalmazzon – ne noindexet vagy átirányítást." },
        { icon: "🔢", tip: "Egy sitemap max. 50 000 URL / 50 MB – felette bontsd indexre." },
        { icon: "🗓️", tip: "A lastmod legyen valós – a hamis dátum aláássa a kereső bizalmát a sitemapedben." },
        { icon: "🤖", tip: "A sitemap URL-jét tüntesd fel a robots.txt-ben is – a generátorunk ezt támogatja." },
      ],
    },
  },
};
