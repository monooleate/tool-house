// ============================================================
// HU tool FAQ – NYELV-IZOLÁLT
// ─────────────────────────────────────────────────────────────
// Ezek a FAQ-k a `tool.i18n.hu.faq`-ba kerülnek (lásd tool-registry.ts),
// NEM a registry közös `faq` mezőjébe. Ez szándékos:
//   getLocalizedTool(tool, "ro") = { ...tool, ...tool.i18n.ro }
// → a RO oldal a saját i18n.ro.faq-ját (RO content) vagy a közös `faq`-ot
//   (üres tömb) kapja, SOHA nem az itteni magyar szöveget.
// Ha ide magyar FAQ-t tennénk a registry `faq:` mezőjébe, az átszivárogna
// minden olyan RO oldalra, aminek nincs RO-content-faq-ja.
//
// A kérdések a GSC valós HU lekérdezéseiből származnak (2026-07-15 export).
// SZABÁLY: csak olyan állítás, amit a tool tényleges viselkedése alátámaszt.
// ============================================================
import type { ToolFAQ } from "../tool-registry.ts";

export const HU_TOOL_FAQ: Record<string, ToolFAQ[]> = {
  // ─── Kép: tömörítés (GSC: 1519 megj, „képtömörítés", „jpg tömörítés") ───
  "tomorites": [
    {
      q: "Romlik a kép minősége tömörítés közben?",
      a: "A minőség csúszkával te szabályozod. Az alapértelmezett 75%-os beállítás mellett a méret jelentősen csökken, miközben a különbség fotóknál szabad szemmel általában alig észrevehető. Ha fontos a részletgazdagság, told feljebb a csúszkát, és hasonlítsd össze az eredményt az eredetivel.",
    },
    {
      q: "Mekkora méretcsökkenésre számíthatok?",
      a: "Ez a képtől függ. A sok színátmenetet tartalmazó fényképeknél a legnagyobb a nyereség, míg az egyszínű felületekből álló grafikáknál vagy a már eleve tömörített képeknél kisebb. A pontos eredményt a konvertálás után rögtön látod.",
    },
    {
      q: "Feltöltődnek a képeim valamilyen szerverre?",
      a: "Nem. A tömörítés teljes egészében a böngésződben fut, a képek nem hagyják el a gépedet. Ezért működik nagyobb fájlokkal is, és ezért nincs feltöltési várakozás.",
    },
    {
      q: "Egyszerre több képet is tömöríthetek?",
      a: "Igen. Több fájlt is megadhatsz egyszerre, az eredményt pedig egyetlen ZIP-ben töltheted le.",
    },
  ],

  // ─── Kép: átméretezés (GSC: 1297 megj, „képátméretezés", „méretezd át") ───
  "atmeretezes": [
    {
      q: "Torzul a kép, ha átméretezem?",
      a: "Nem, ha a képarány megőrzése bekapcsolva marad: ilyenkor elég az egyik oldal méretét megadnod, a másikat az eszköz arányosan számolja. Torzulás csak akkor lép fel, ha a szélességet és a magasságot egymástól függetlenül, az eredeti aránytól eltérően adod meg.",
    },
    {
      q: "Jobb lesz a kép minősége, ha felnagyítom?",
      a: "Nem. A felskálázás nem tud olyan részletet visszaadni, ami az eredeti képen nincs benne — a kép inkább lágyabb, elmosódottabb lesz. Átméretezésnél a kicsinyítés jár minőségveszteség nélkül.",
    },
    {
      q: "Megadhatom a méretet százalékban is?",
      a: "Igen. Választhatsz konkrét képpont (px) értéket, vagy megadhatod a méretet az eredetihez képest százalékban — utóbbi akkor kényelmes, ha több, eltérő méretű képet egységesen szeretnél kicsinyíteni.",
    },
    {
      q: "Egyszerre több képet is átméretezhetek?",
      a: "Igen, a köteges feldolgozással több képet adhatsz meg egyszerre, és az eredményt ZIP-ben töltheted le. A beállított méret vagy százalék mindegyikre érvényes.",
    },
  ],

  // ─── PDF: szétbontás (GSC: 4237 megj, „pdf szétbontása/szétbontó") ───
  "szetbontas": [
    {
      q: "Hogyan bontsak szét egy PDF-et külön oldalakra?",
      a: "Add meg a PDF-et, majd válaszd ki, hogy minden oldalt külön fájlba szeretnél-e, vagy oldalcsoportokra bontanád. Az elkészült fájlokat egyetlen ZIP-ben töltheted le, így egyszerre megkapod az összes darabot.",
    },
    {
      q: "Kiszedhetek a PDF-ből csak néhány konkrét oldalt?",
      a: "Igen. Az oldalankénti szétbontás mellett oldalcsoportokat is megadhatsz, így csak a téged érdeklő részt kapod meg külön fájlként.",
    },
    {
      q: "Biztonságos bizalmas dokumentumot szétbontani?",
      a: "Igen. A szétbontás a böngésződben történik, a PDF nem töltődik fel semmilyen szerverre, és nem hagyja el a gépedet. Ezért szerződésekhez, számlákhoz vagy egyéb érzékeny dokumentumokhoz is használható.",
    },
    {
      q: "Van fájlméret-korlát?",
      a: "Mivel a feldolgozás helyben fut, nincs szerveres feltöltési korlát — a gyakorlati határt a géped memóriája szabja meg. Nagyon nagy, több száz oldalas PDF-eknél a művelet több időt vehet igénybe.",
    },
  ],

  // ─── Kép: tükrözés (GSC: 1310 megj, 8,7% CTR — „kép tükrözése online") ───
  "tukrozes": [
    {
      q: "Mi a különbség a vízszintes és a függőleges tükrözés között?",
      a: "A vízszintes tükrözés a bal és jobb oldalt cseréli fel — ilyen a klasszikus tükörkép, például ha egy szelfin a szöveg visszafelé olvasható. A függőleges tükrözés a képet fel-le fordítja, mintha a vízfelszín tükrözné.",
    },
    {
      q: "Romlik a kép minősége tükrözéskor?",
      a: "A tükrözés a képpontok átrendezése, nem újraszámolása, így önmagában nem jár részletvesztéssel. Minőségromlás csak akkor keletkezhet, ha a mentés során a kép újratömörítésre kerül.",
    },
    {
      q: "Feltöltődik a fényképem valahova?",
      a: "Nem. A tükrözés a böngésződben fut, a kép nem kerül fel szerverre.",
    },
  ],

  // ─── Kép: JPG → PNG (GSC: 1007 megj, „png konvertálás jpg") ───
  "jpg-png": [
    {
      q: "Mikor érdemes JPG helyett PNG-t használni?",
      a: "A PNG akkor jó választás, ha éles kontúrokra vagy átlátszó háttérre van szükséged — például logóknál, ábráknál, képernyőképeknél. Fényképeknél viszont a JPG általában lényegesen kisebb fájlt eredményez hasonló látvány mellett.",
    },
    {
      q: "Visszaáll a minőség, ha a JPG-t PNG-vé alakítom?",
      a: "Nem. A JPG mentésekor elveszett részletek nem állíthatók vissza — a PNG csak azt őrzi meg veszteségmentesen, ami a JPG-ben már benne van. A konvertálás tehát nem javítja a képet, csak a formátumot változtatja meg.",
    },
    {
      q: "Feltöltődik a képem konvertáláskor?",
      a: "Nem, a konvertálás a böngésződben történik, a fájl nem hagyja el a gépedet.",
    },
  ],

  // ─── Kép: EXIF megjelenítés (GSC: 918 megj, „hol készült a kép", „exif adatok") ───
  "metadata-megjelenites": [
    {
      q: "Megtudható egy képről, hol készült?",
      a: "Ha a fénykép tartalmaz GPS-koordinátákat az EXIF-adatai között, akkor igen — az eszköz kiolvassa és megmutatja ezeket. Sok kép azonban nem tartalmaz helyadatot: a közösségi médiába feltöltött fotókból a platformok jellemzően eltávolítják, és a telefonon is kikapcsolható a helyrögzítés.",
    },
    {
      q: "Milyen adatok derülnek ki egy fényképből?",
      a: "Az EXIF jellemzően tartalmazza a készítés dátumát, a fényképezőgép vagy telefon típusát, a felvételi beállításokat (záridő, rekesz, ISO), és ha engedélyezve volt, a GPS-koordinátákat is. Az, hogy pontosan mi szerepel benne, eszközfüggő.",
    },
    {
      q: "Feltöltődik a képem az adatok kiolvasásához?",
      a: "Nem. Az EXIF-adatokat a böngésződ olvassa ki helyben, a kép nem kerül fel szerverre.",
    },
  ],

  // ─── Fájl: ZIP kibontás (GSC: 831 megj, „zip fájl kicsomagolása online") ───
  "zip-kibonto": [
    {
      q: "Kell programot telepítenem a ZIP kibontásához?",
      a: "Nem. A kibontás a böngésződben fut, így telepítés nélkül, bármilyen gépen működik — akkor is, ha nincs jogosultságod szoftvert telepíteni.",
    },
    {
      q: "Feltöltődik a ZIP fájlom valamilyen szerverre?",
      a: "Nem. Az archívum tartalmát a böngésződ bontja ki helyben, a fájl nem hagyja el a gépedet.",
    },
    {
      q: "Kibontás előtt megnézhetem, mi van az archívumban?",
      a: "Igen, a kibontás után látod a benne található fájlok listáját, és kiválaszthatod, melyikre van szükséged.",
    },
  ],
};
