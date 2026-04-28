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

// ─── Anul curent (sărbători legale RO) ───────────────────────
// Pentru diferenta-date: ne referim la anul calendaristic curent
export const CURRENT_YEAR = Y;
