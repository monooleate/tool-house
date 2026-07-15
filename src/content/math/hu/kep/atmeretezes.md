---
title: "Kép átméretezése: képpont, képarány és a felskálázás határai"
description: "Mikor px, mikor százalék, miért ne nagyíts fel képet, és mit jelent valójában a DPI. Gyakorlati útmutató weboldalhoz, közösségi médiához, e-mailhez."
toolSlug: "atmeretezes"
category: "kep"
lang: "hu"
published_at: "2026-07-15T00:00:00.000Z"
refreshed_at: "2026-07-15T00:00:00.000Z"
---

Az átméretezés a leghatékonyabb dolog, amit egy kép méretéért tehetsz — sokszor **többet hoz, mint maga a tömörítés**. Egy mai telefon 4000 képpont széles fotót készít; ha ez egy weboldalon 800 képpont szélesen jelenik meg, akkor a kép adatainak több mint 95%-a feleslegesen töltődik le.

## Képpont vagy százalék

Két úton adhatod meg az új méretet, és más helyzetben más kényelmes.

**Képpont (px)** — akkor jó, ha **konkrét célméret** van: egy weboldal képhelye 1200 px széles, egy profilkép 400×400. Elég az egyik oldalt megadnod, a másikat az eszköz arányosan számolja.

**Százalék** — akkor jó, ha **több, eltérő méretű képet** kezelsz egyszerre, és mindet egységesen szeretnéd kicsinyíteni. A „legyen mindegyik feleakkora" utasítás akkor is működik, ha a képek eredeti mérete különböző.

## A képarány, és miért ne kapcsold ki

A képarány a szélesség és a magasság viszonya (például 4:3, 16:9, 1:1). Ha megőrzöd, a kép **arányosan** kicsinyedik — semmi nem torzul.

Ha viszont a szélességet és a magasságot egymástól függetlenül, az eredeti aránytól eltérően adod meg, a kép **megnyúlik vagy összenyomódik**. Ez az a hatás, amitől az arcok szélesnek, a körök tojásdadnak látszanak.

> **Ha kötött arányú helyre kell a kép** (például négyzetes profilkép egy fekvő fotóból), akkor nem átméretezni kell, hanem **vágni**. Az átméretezés az egész képet zsugorítja; a vágás levesz belőle. Erre való a [kép levágása](/kep/levagas/) eszköz.

## Kicsinyítés és nagyítás nem szimmetrikus

Ez a legfontosabb — és legtöbbször félreértett — pont.

**Kicsinyítéskor** információt dobsz el. Az eszköz több eredeti képpontból számol ki egyet, és az eredmény jellemzően szép, éles marad. Ez a művelet biztonságos.

**Nagyításkor (felskálázáskor)** viszont az eszköznek olyan képpontokat kell kitalálnia, **amik nem léteznek**. Bármilyen okos is a számítás, a hiányzó részlet nem jön vissza — csak a meglévők közötti átmenetet találja ki. Az eredmény lágyabb, elmosódottabb lesz az eredetinél.

> **Nem lehet „élesíteni" egy kicsi képet nagyítással.** Ha egy 300 px széles logót 2000 px-re nagyítasz, nem lesz belőle éles logó — csak egy nagy, homályos folt. Ilyenkor az eredeti, nagyobb felbontású fájlt kell megkeresni, vagy vektoros formátumból (SVG) újra exportálni.

Ökölszabály: **kicsinyíts bátran, nagyíts csak végszükségből**, és akkor is legfeljebb másfél-kétszeresére.

## A DPI-mítosz

Gyakori kérés, hogy „legyen a kép 300 DPI-s". A képernyőn megjelenő képnél ennek **nincs jelentősége**.

A DPI (pont per hüvelyk) csak azt írja le, hogy **nyomtatáskor** mekkora fizikai méretet foglaljon el a kép. Ez egy szám a fájl metaadatai között — a képpontok számát nem változtatja meg. Egy 1200×800 képpontos fotó ugyanannyi információt tartalmaz 72 és 300 DPI mellett is; csak a papíron lesz más a mérete.

**Ami a képernyőn számít, az a képpontok száma.** Ha egy weboldalra készítesz képet, a szélességet képpontban add meg, a DPI-vel ne foglalkozz. Nyomtatásnál viszont a képlet: `szükséges képpont = kívánt méret hüvelykben × DPI`.

## Milyen méretre méretezzek

### Weboldal

Add meg azt a szélességet, amekkorán a kép ténylegesen megjelenik. Ha nem tudod pontosan, a tartalmi képekhez az **1200–1600 px szélesség** biztonságos kiindulás: a legtöbb képernyőn éles marad, de nem pazarol.

Nagyfelbontású (retina) kijelzőkre szánt képnél a megjelenítési méret **kétszeresét** érdemes megadni — a böngésző lekicsinyíti, és ettől lesz éles.

Átméretezés után jöhet a [tömörítés](/kep/tomorites/): a kettő együtt adja a valódi nyereséget.

### Közösségi média

Itt két dolgot érdemes tudni:

1. A platformok **maguk is átméretezik és újratömörítik** a képet feltöltéskor.
2. Az elvárt méretek **időről időre változnak**, ezért konkrét számok helyett érdemes az adott platform aktuális súgóját megnézni.

Amit tehetsz: tölts fel bőven elég nagy, jó minőségű képet a megfelelő **képaránnyal** (négyzetes helyre négyzetes képet), és a többit bízd rájuk. A képarány sokkal fontosabb, mint a pontos képpontszám — rossz aránynál a platform vág a képből, és pont a lényeg maradhat le.

### E-mail

Több fénykép esetén a köteges átméretezés a leggyorsabb: add meg a százalékot vagy a szélességet, és az összes képet egyszerre kapod meg ZIP-ben.

## Gyakori hibák

1. **Felskálázás a minőség reményében.** Nem működik; a hiányzó részlet nem hozható vissza.
2. **A képarány kikapcsolása.** Torzul a kép — ha kötött arány kell, vágj, ne nyújts.
3. **Csak CSS-sel „kicsinyíteni" weboldalon.** A böngésző a teljes fájlt letölti, a látogató hiába lát kis képet.
4. **A DPI állítgatása képernyős képnél.** Nincs hatása; a képpontszám számít.
5. **Átméretezés az eredeti felülírásával.** Ha később nagyobb méret kell, nem lesz miből dolgozni.

## Adatvédelem

Az átméretezés **a böngésződben fut**: a képek nem töltődnek fel szerverre, és nem hagyják el a gépedet. Ezért nincs feltöltési várakozás, és emiatt működik nagyobb fájlokkal, akár egyszerre több képpel is.

## Kapcsolódó eszközök

- [Képtömörítés](/kep/tomorites/) — átméretezés után ez adja a további méretcsökkenést.
- [Kép levágása](/kep/levagas/) — ha kötött képarány kell, nyújtás helyett.
- [Köteges átméretezés](/kep/tomeges-atmeretezes/) — sok kép egyszerre, ZIP kimenettel.
- [Felbontás-kiszámoló](/kep/felbontas-kiszamolo/) — képarány és méret gyors ellenőrzése.
