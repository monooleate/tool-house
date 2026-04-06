# AdSense manuális slot aktiválás

Jelenleg az Auto ads mód van bekapcsolva (Google maga helyezi el a hirdetéseket).
Ez a leírás azt dokumentálja, hogyan lehet átváltani a manuálisan elhelyezett slotokra.

---

## Mikor érdemes átváltani?

- Ha az Auto ads zavaró helyre tesz hirdetést (pl. a tool UI közepére)
- Ha pontosan szeretnéd kontrollálni hol és mikor jelenik meg reklám
- Ha A/B tesztelni akarod az elhelyezést

---

## 1. lépés – Auto ads kikapcsolása az AdSense dashboardon

1. [adsense.google.com](https://adsense.google.com) → **Hirdetések** → **Hirdetési egységek alapján**
2. Válaszd ki a domaint (konvertalo.hu / instrumenteonline.ro)
3. **Auto ads** kapcsolót kapcsold **KI**
4. Mentés

> Ha Auto ads be van kapcsolva, az felülírja a manuális slotokat — ezért kell kikapcsolni.

---

## 2. lépés – Slot ID-k létrehozása az AdSense dashboardon

1. **Hirdetések** → **Hirdetési egységek alapján** → **Hirdetési egység létrehozása**
2. Hozz létre 3 egységet:

| Név | Típus | Javasolt méret |
|-----|-------|----------------|
| `before-convert` | Display | Responsive (auto) |
| `before-download` | Display | 300×250 (téglalap) |
| `post-result` | Display | Responsive (auto) |

3. Minden egység létrehozása után másold ki a **Slot ID**-t (10 jegyű szám)

---

## 3. lépés – Slot ID-k beírása a kódba

Fájl: `src/components/ui/AdSlot.svelte`

```typescript
const AD_SLOT_IDS: Record<string, string> = {
  'before-convert':  'XXXXXXXXXX',  // ← valódi ID ide
  'before-download': 'XXXXXXXXXX',  // ← valódi ID ide
  'post-result':     'XXXXXXXXXX',  // ← valódi ID ide
};
```

---

## 4. lépés – Manuális slotok bekapcsolása a kódban

Fájl: `src/lib/timing-config.ts`, `DEFAULT_TIMING` objektum:

```typescript
showAdSlot: true,  // false → true
```

Ez egyszerre aktiválja az összes tool `before-convert` és `before-download` slotját.
A `post-result` slot minden toolban hardcoded `show={true}` — az mindig aktív ha `PUBLIC_ADSENSE_CLIENT_ID` be van állítva.

---

## Slot elhelyezések a UI-ban

| Slot | Hol jelenik meg | Mikor |
|------|-----------------|-------|
| `before-convert` | Fájl feltöltése után, a Konvertálás gomb előtt | Azonnal feltöltés után |
| `before-download` | Konverzió után, a Letöltés gomb előtt | Feldolgozás közben |
| `post-result` | Konverzió után, az eredmény alatt | Letöltés után |

---

## Visszaállás Auto ads módra

1. `timing-config.ts` → `showAdSlot: false`
2. AdSense dashboardon Auto ads visszakapcsolása
