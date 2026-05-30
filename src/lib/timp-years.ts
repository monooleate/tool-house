// ============================================================
// timp-years.ts — Build-time helper a Fázis 7 countdown SEO-jához.
//
// Cél: minden timp tool i18n title/description és markdown longform tartalom
// ELE-ADHASSA a következő ünnep ÉVÉT (és pontos dátumát) a build pillanatában,
// hogy a SEO mindig friss legyen — pl. "Crăciun 2027" nem "Crăciun 2026".
//
// Aktivál minden build-nél (npm run build:ro). 20 évre előre is működik mert
// a logika nem hardcoded éveket használ, hanem `now + 1 år` szabályt
// (kivételi: Paști a Meeus algorithmot).
//
// Ugyanazt a 48h celebration window logikát követi mint a Svelte komponensek
// → biztosítja, hogy a meta-szövegek és a runtime countdown ÖSSZHANGBAN
// vannak (build idején a UI, build idején a SEO).
// ============================================================

import { seasonInstant, seasonLocalParts, type Season } from "./astro-seasons.ts";

const CELEBRATION_MS = 48 * 60 * 60 * 1000; // 48h fix events
const BAC_CELEBRATION_MS = 14 * 24 * 60 * 60 * 1000; // 14 zile pentru BAC sesiune

// Meeus Julian — Paști ortodox (calendar iulian + 13 zile gregorian)
function pastiOrtodox(year: number): Date {
  const a = year % 4;
  const b = year % 7;
  const c = year % 19;
  const d = (19 * c + 15) % 30;
  const e = (2 * a + 4 * b - d + 34) % 7;
  const julianMonth = Math.floor((d + e + 114) / 31);
  const julianDay = ((d + e + 114) % 31) + 1;
  const date = new Date(year, julianMonth - 1, julianDay);
  date.setDate(date.getDate() + 13);
  return date;
}

// 3rd Monday of June (BAC sesiunea de vară)
function thirdMondayOfJune(year: number): Date {
  const d = new Date(year, 5, 1);
  const dayOfWeek = d.getDay();
  const offsetToMonday = (1 - dayOfWeek + 7) % 7;
  d.setDate(1 + offsetToMonday + 14);
  return d;
}

const NOW = new Date();
const Y = NOW.getFullYear();
const RO_MONTHS = ["ianuarie","februarie","martie","aprilie","mai","iunie","iulie","august","septembrie","octombrie","noiembrie","decembrie"];

function nextOccurrence(thisYear: Date, makeNext: () => Date, celebration = CELEBRATION_MS): Date {
  // În fereastra de celebrare a evenimentului din anul curent → păstrează acea țintă
  if (NOW.getTime() >= thisYear.getTime() && NOW.getTime() < thisYear.getTime() + celebration) {
    return thisYear;
  }
  // Încă nu a venit anul ăsta → țintă curentă
  if (NOW < thisYear) return thisYear;
  // Trecut + dincolo de fereastra de celebrare → anul viitor
  return makeNext();
}

// ─── Crăciun (25 dec) ────────────────────────────────────────
const _craciunDate = nextOccurrence(
  new Date(Y, 11, 25),
  () => new Date(Y + 1, 11, 25),
);
export const CRACIUN_YEAR = _craciunDate.getFullYear();
export const CRACIUN_DATE_RO = `${_craciunDate.getDate()} ${RO_MONTHS[_craciunDate.getMonth()]} ${_craciunDate.getFullYear()}`;

// ─── Revelion (1 ian) ────────────────────────────────────────
// Notă: Revelionul "2027" celebrează trecerea în anul 2027 — adică ținta este 1 ian 2027
const _revelionDate = nextOccurrence(
  new Date(Y, 0, 1),
  () => new Date(Y + 1, 0, 1),
);
export const REVELION_YEAR = _revelionDate.getFullYear();
export const REVELION_DATE_RO = `1 ianuarie ${_revelionDate.getFullYear()}`;

// ─── Paști ortodox ───────────────────────────────────────────
const _pastiThis = pastiOrtodox(Y);
const _pastiDate = nextOccurrence(
  _pastiThis,
  () => pastiOrtodox(Y + 1),
);
export const PASTI_YEAR = _pastiDate.getFullYear();
export const PASTI_DATE_RO = `${_pastiDate.getDate()} ${RO_MONTHS[_pastiDate.getMonth()]} ${_pastiDate.getFullYear()}`;

// ─── Bacalaureat (a 3-a luni din iunie) ──────────────────────
const _bacThis = thirdMondayOfJune(Y);
const _bacDate = nextOccurrence(
  _bacThis,
  () => thirdMondayOfJune(Y + 1),
  BAC_CELEBRATION_MS,
);
export const BAC_YEAR = _bacDate.getFullYear();
export const BAC_DATE_RO = `${_bacDate.getDate()} ${RO_MONTHS[_bacDate.getMonth()]} ${_bacDate.getFullYear()}`;

// ─── Ziua Națională (1 decembrie) ────────────────────────────
const _ziuaNationalaDate = nextOccurrence(
  new Date(Y, 11, 1),
  () => new Date(Y + 1, 11, 1),
  24 * 60 * 60 * 1000, // 1 zi de sărbătoare legală
);
export const ZIUA_NATIONALA_YEAR = _ziuaNationalaDate.getFullYear();
export const ZIUA_NATIONALA_DATE_RO = `1 decembrie ${_ziuaNationalaDate.getFullYear()}`;
// Ziua săptămânii pentru SEO ("1 decembrie cade într-o zi de ...")
const RO_WEEKDAYS = ["duminică", "luni", "marți", "miercuri", "joi", "vineri", "sâmbătă"];
export const ZIUA_NATIONALA_WEEKDAY_RO = RO_WEEKDAYS[_ziuaNationalaDate.getDay()];
// ISO date pentru Event schema (startDate)
export const ZIUA_NATIONALA_ISO = `${_ziuaNationalaDate.getFullYear()}-12-01`;

// ─── Helper pentru sărbători cu dată fixă (zi/lună fixe) ──────
// Returnează {year, dateRo, weekdayRo, iso} pentru următoarea apariție.
function fixedDate(month0: number, day: number) {
  const d = nextOccurrence(
    new Date(Y, month0, day),
    () => new Date(Y + 1, month0, day),
    24 * 60 * 60 * 1000,
  );
  const mm = String(month0 + 1).padStart(2, "0");
  const dd = String(day).padStart(2, "0");
  return {
    year: d.getFullYear(),
    dateRo: `${day} ${RO_MONTHS[month0]} ${d.getFullYear()}`,
    weekdayRo: RO_WEEKDAYS[d.getDay()],
    iso: `${d.getFullYear()}-${mm}-${dd}`,
  };
}

// ─── Mărțișor (1 martie) ─────────────────────────────────────
const _martisor = fixedDate(2, 1);
export const MARTISOR_YEAR = _martisor.year;
export const MARTISOR_DATE_RO = _martisor.dateRo;
export const MARTISOR_WEEKDAY_RO = _martisor.weekdayRo;
export const MARTISOR_ISO = _martisor.iso;

// ─── Ziua Femeii / 8 Martie ──────────────────────────────────
const _ziuaFemeii = fixedDate(2, 8);
export const ZIUA_FEMEII_YEAR = _ziuaFemeii.year;
export const ZIUA_FEMEII_DATE_RO = _ziuaFemeii.dateRo;
export const ZIUA_FEMEII_WEEKDAY_RO = _ziuaFemeii.weekdayRo;
export const ZIUA_FEMEII_ISO = _ziuaFemeii.iso;

// ─── Dragobete (24 februarie) ────────────────────────────────
const _dragobete = fixedDate(1, 24);
export const DRAGOBETE_YEAR = _dragobete.year;
export const DRAGOBETE_DATE_RO = _dragobete.dateRo;
export const DRAGOBETE_WEEKDAY_RO = _dragobete.weekdayRo;
export const DRAGOBETE_ISO = _dragobete.iso;

// ─── Anotimpuri (echinocții/solstiții — instant astronomic real, Meeus) ──
// Data se calculează exact (variază ±1 zi de la an la an), nu mai e fixă.
function seasonConst(season: Season) {
  const inst = nextOccurrence(
    seasonInstant(Y, season),
    () => seasonInstant(Y + 1, season),
    24 * 60 * 60 * 1000,
  );
  const p = seasonLocalParts(inst.getUTCFullYear(), season);
  const mm = String(p.month0 + 1).padStart(2, "0");
  const dd = String(p.day).padStart(2, "0");
  return {
    year: p.year,
    dateRo: `${p.day} ${RO_MONTHS[p.month0]} ${p.year}`,
    iso: `${p.year}-${mm}-${dd}`,
  };
}

const _primavara = seasonConst("primavara");
export const PRIMAVARA_YEAR = _primavara.year;
export const PRIMAVARA_DATE_RO = _primavara.dateRo;
export const PRIMAVARA_ISO = _primavara.iso;

const _vara = seasonConst("vara");
export const VARA_YEAR = _vara.year;
export const VARA_DATE_RO = _vara.dateRo;
export const VARA_ISO = _vara.iso;

const _toamna = seasonConst("toamna");
export const TOAMNA_YEAR = _toamna.year;
export const TOAMNA_DATE_RO = _toamna.dateRo;
export const TOAMNA_ISO = _toamna.iso;

const _iarna = seasonConst("iarna");
export const IARNA_YEAR = _iarna.year;
export const IARNA_DATE_RO = _iarna.dateRo;
export const IARNA_ISO = _iarna.iso;

// ─── Event schema (schema.org) — date auto-calculate la build ─
// Cheia = slug-ul tool-ului countdown. `iso` se recalculează la FIECARE build
// (următoarea apariție), deci Event.startDate avansează automat fără editare
// manuală. `name`/`description` sunt statice (nu se schimbă de la an la an).
function isoOf(d: Date): string {
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mm}-${dd}`;
}

export interface CountdownEvent {
  iso: string;
  name: string;
  description: string;
}

export const COUNTDOWN_EVENTS: Record<string, CountdownEvent> = {
  "craciun-numaratoare": {
    iso: isoOf(_craciunDate),
    name: "Crăciun",
    description: "Crăciunul, sărbătoarea nașterii lui Iisus Hristos (25 decembrie), sărbătoare legală în România.",
  },
  "revelion-numaratoare": {
    iso: isoOf(_revelionDate),
    name: "Revelion / Anul Nou",
    description: "Trecerea în Anul Nou (1 ianuarie), sărbătoare legală în România.",
  },
  "pasti-numaratoare": {
    iso: isoOf(_pastiDate),
    name: "Paștele ortodox",
    description: "Paștele ortodox, cea mai importantă sărbătoare a Bisericii Ortodoxe Române (sărbătoare mobilă).",
  },
  "bacalaureat-numaratoare": {
    iso: isoOf(_bacDate),
    name: "Bacalaureat — sesiunea de vară",
    description: "Începutul probelor scrise ale examenului de Bacalaureat, sesiunea de vară.",
  },
  "1-decembrie-numaratoare": {
    iso: ZIUA_NATIONALA_ISO,
    name: "Ziua Națională a României (1 Decembrie)",
    description: "Ziua Națională a României, care comemorează Marea Unire de la 1 decembrie 1918.",
  },
  "martisor-numaratoare": {
    iso: MARTISOR_ISO,
    name: "Mărțișor (1 Martie)",
    description: "Tradiția Mărțișorului, ținută pe 1 martie, simbol al venirii primăverii (patrimoniu UNESCO).",
  },
  "8-martie-numaratoare": {
    iso: ZIUA_FEMEII_ISO,
    name: "8 Martie — Ziua Internațională a Femeii",
    description: "Ziua Internațională a Femeii, marcată pe 8 martie.",
  },
  "dragobete-numaratoare": {
    iso: DRAGOBETE_ISO,
    name: "Dragobete (24 Februarie)",
    description: "Dragobete, sărbătoarea tradițională a iubirii la români, ținută pe 24 februarie.",
  },
  "inceput-primavara-numaratoare": {
    iso: PRIMAVARA_ISO,
    name: "Începutul primăverii (echinocțiul de primăvară)",
    description: "Echinocțiul de primăvară, începutul astronomic al primăverii în emisfera nordică (~20 martie).",
  },
  "inceput-vara-numaratoare": {
    iso: VARA_ISO,
    name: "Începutul verii (solstițiul de vară)",
    description: "Solstițiul de vară, începutul astronomic al verii în emisfera nordică (~21 iunie).",
  },
  "inceput-toamna-numaratoare": {
    iso: TOAMNA_ISO,
    name: "Începutul toamnei (echinocțiul de toamnă)",
    description: "Echinocțiul de toamnă, începutul astronomic al toamnei în emisfera nordică (~22 septembrie).",
  },
  "inceput-iarna-numaratoare": {
    iso: IARNA_ISO,
    name: "Începutul iernii (solstițiul de iarnă)",
    description: "Solstițiul de iarnă, începutul astronomic al iernii în emisfera nordică (~21 decembrie).",
  },
};

// ─── Anul curent (sărbători legale RO) ───────────────────────
// Pentru diferenta-date: ne referim la anul calendaristic curent
export const CURRENT_YEAR = Y;
