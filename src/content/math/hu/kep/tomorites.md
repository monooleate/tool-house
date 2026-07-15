---
title: "Képtömörítés a gyakorlatban: minőség, formátumok, valós nyereség"
description: "Mit csinál valójában a tömörítés, mit jelent a minőség-csúszka, és melyik formátum mennyit hoz. Gyakorlati útmutató weboldalhoz, e-mailhez, közösségi médiához."
toolSlug: "tomorites"
category: "kep"
lang: "hu"
published_at: "2026-07-15T00:00:00.000Z"
refreshed_at: "2026-07-15T00:00:00.000Z"
---

A képtömörítés célja egyszerű: **legyen kisebb a fájl, de maradjon jó a kép**. A kérdés mindig az, hol húzod meg a határt a kettő között — és ez nem ízlés kérdése, hanem attól függ, hova szánod a képet. Egy weboldal fejlécképénél a gyors betöltés fontosabb, mint a 100%-os részletesség; egy nyomdába küldött fotónál épp fordítva.

## Mi történik valójában tömörítéskor

Két, alapvetően különböző dolgot hívunk tömörítésnek.

### Veszteségmentes tömörítés

A fájl kisebb lesz, de **egyetlen képpont sem változik**. Ez úgy lehetséges, hogy az ismétlődő mintázatokat a formátum rövidebben írja le — például „itt 400 egyforma fehér pixel következik" helyett elég ezt egyszer rögzíteni. Ilyen a PNG. Ha visszaalakítod, bitre pontosan az eredetit kapod.

A hátránya: a fényképeken alig van tökéletesen ismétlődő mintázat, ezért a nyereség szerény.

### Veszteséges tömörítés

A formátum **eldob olyan információt, amit a szemed úgysem venne észre**. A JPG például kihasználja, hogy az emberi látás a fényerő-változásra sokkal érzékenyebb, mint a színárnyalat finom eltéréseire — így a színinformációt durvábban tárolja.

Itt van az igazi nyereség: egy fénykép gyakran a töredékére zsugorodik úgy, hogy ránézésre nem látszik a különbség. Cserébe az eldobott részlet **véglegesen elveszik**.

> **Ezért fontos:** mindig az eredetiből tömöríts, ne egy már tömörített képből. Ha egy JPG-t újra és újra mented, a veszteségek halmozódnak — ezt hívják generációs veszteségnek.

## Mit jelent a minőség-csúszka

A tömörítőben állítható minőség (alapértelmezésben **75%**) azt szabályozza, mennyi információt dobhat el a formátum. Nem lineáris skála, és nem „a kép 75%-a marad meg" — sokkal inkább egy érzékenységi beállítás.

| Beállítás | Mire jó | Mire számíts |
|---:|:---|:---|
| 90–100% | Archiválás, utómunka alapja | Alig kisebb fájl, gyakorlatilag látványbeli veszteség nélkül |
| 75–85% | **Weboldal, általános használat** | Jelentős méretcsökkenés, a különbség szabad szemmel általában nem tűnik fel |
| 50–70% | E-mail melléklet, gyors megosztás | Jól látható nyereség, közelről már észrevehetők a tömörítési nyomok |
| 50% alatt | Ha a méret mindennél fontosabb | Látható foltosodás, elmosódó élek |

A 75% azért jó alapértelmezés, mert a legtöbb fényképnél ez esik arra a pontra, ahol a méret már sokat csökkent, de a szem még nem panaszkodik. **Nézd meg az eredményt**, mielőtt eldobod az eredetit — különösen, ha a képen finom színátmenet vagy sok apró részlet van.

## Formátumok: melyik mit tud

| Formátum | Tömörítés | Átlátszóság | Mikor válaszd |
|:---|:---|:---:|:---|
| **JPG** | veszteséges | nem | Fényképek, ahol a maximális kompatibilitás számít |
| **PNG** | veszteségmentes | igen | Logó, ábra, képernyőkép, éles kontúrok, átlátszó háttér |
| **WebP** | mindkettő | igen | Weboldal, ahol a méret a legfontosabb |

A **WebP** azonos látványminőség mellett érezhetően kisebb fájlt ad, mint a JPG, és tudja az átlátszóságot is. Ma már minden elterjedt böngésző kezeli. Ha weboldalra készíted a képet, jellemzően ez a legjobb választás.

A **PNG** viszont nem attól lesz kicsi, hogy tömöríted: ha egy fényképet mentesz PNG-be, könnyen nagyobb lesz, mint JPG-ben. A PNG-t nem fényképekre találták ki.

## Mennyit nyerhetsz valójában

Erre nincs egy szám, mert nem a fájl méretétől függ, hanem a **kép tartalmától**:

- **Sok nyereség**: fényképek, ahol lágy színátmenetek és zaj van (tájkép, portré, éjszakai felvétel).
- **Közepes nyereség**: vegyes tartalom, például szöveget is tartalmazó képernyőkép.
- **Kevés nyereség**: nagy, egyszínű felületek (azok már eleve jól tömörödnek), vagy olyan kép, amit korábban már erősen tömörítettek.

Ezért működik rosszul minden „x%-ot garantálunk" ígéret. A tömörítés után rögtön látod a valós eredményt — érdemes ez alapján dönteni.

## Gyakorlati esetek

### Weboldalra szánt kép

A cél a gyors betöltés. Ajánlott menet:

1. Először **méretezd át** a képet arra a méretre, amekkorán ténylegesen megjelenik. Ez a legnagyobb nyereség: egy 4000 px széles fotót 1200 px-re kicsinyítve a fájl töredékére esik, még tömörítés előtt. Ehhez használd a [kép átméretezőt](/kep/atmeretezes/).
2. **Utána tömöríts**, 75–85% körüli minőséggel.
3. Ha lehet, **WebP** formátumban mentsd.

> A leggyakoribb hiba: egy telefonnal készült, teljes felbontású fotót töltenek fel a weboldalra, és csak CSS-sel kicsinyítik le. A böngésző ilyenkor a teljes, több megabájtos fájlt letölti — hiába látszik kicsinek.

### E-mail melléklet

A legtöbb levelezőrendszernél néhány megabájtos korlát van. Több fénykép esetén méretezd át őket egységesen, tömörítsd 70% körül, és töltsd le ZIP-ben — a köteges feldolgozás pont erre való.

### Közösségi média

A platformok **újratömörítik** a feltöltött képet, akármit is csinálsz. Ezért itt ne told le nagyon a minőséget: ha már tömörített képet tömörítenek újra, a végeredmény látványosan romlik. Inkább tölts fel jó minőségű (85–90%) képet, és bízd rájuk a többit.

## Gyakori hibák

1. **Az eredeti felülírása.** A veszteséges tömörítés visszafordíthatatlan. Tartsd meg az eredetit, amíg biztos nem vagy az eredményben.
2. **Ismételt tömörítés.** Minden mentés újabb veszteség. Ha szerkesztesz, az eredetiből indulj.
3. **Fénykép PNG-ben.** Nagy fájl, semmi nyereség. A PNG az ábráké.
4. **Csak tömörítés, átméretezés nélkül.** Ha a kép háromszor akkora, mint amekkorán megjelenik, a tömörítés csak tüneti kezelés.
5. **Minőség 40% alatt.** Ritkán éri meg: a nyereség már csekély, a látható károsodás viszont nagy.

## Adatvédelem

A tömörítés **a böngésződben fut**. A képek nem töltődnek fel semmilyen szerverre, nem hagyják el a gépedet, és nem tárolja őket senki. Ez nem csak adatvédelmi kérdés: emiatt nincs feltöltési várakozás sem, és nagyobb fájlokkal is működik.

Ha a kép EXIF-adatait is szeretnéd megnézni vagy eltávolítani (például a GPS-koordinátákat, mielőtt megosztod), arra külön eszköz való: [EXIF-adatok megjelenítése](/kep/metadata-megjelenites/) és [metaadatok törlése](/kep/metadata-torles/).

## Kapcsolódó eszközök

- [Kép átméretezése](/kep/atmeretezes/) — a legnagyobb méretnyereség forrása, tömörítés előtt.
- [JPG → PNG konvertálás](/kep/jpg-png/) — formátumváltás átlátszósághoz, éles kontúrokhoz.
- [JPG → WebP konvertálás](/kep/jpg-webp/) — a legkisebb fájlméret weboldalhoz.
- [Metaadatok törlése](/kep/metadata-torles/) — EXIF és GPS eltávolítása megosztás előtt.
