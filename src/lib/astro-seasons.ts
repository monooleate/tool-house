// ============================================================
// astro-seasons.ts — Echinocții și solstiții cu precizie astronomică.
//
// Algoritm: Jean Meeus, „Astronomical Algorithms" (ed. 2), cap. 27.
// Calculează INSTANTUL exact (UTC) al fiecărui eveniment sezonier pentru
// orice an (1000–3000), cu precizie de ordinul minutelor — deci data este
// corectă (nu fixă pe 20/21/22), variind ±1 zi de la an la an.
//
// Folosit de:
//   - AnotimpCountdown.svelte (runtime: țintă = instantul real, client-side)
//   - timp-years.ts (build: data RO + ISO pentru title și Event schema)
// Astfel atât numărătoarea, cât și SEO-ul sunt corecte și auto-avansează.
// ============================================================

export type Season = "primavara" | "vara" | "toamna" | "iarna";

const DEG = Math.PI / 180;

// Tabel 27.C — 24 termeni periodici (A, B[°], C[°])
const PERIODIC_TERMS: ReadonlyArray<readonly [number, number, number]> = [
  [485, 324.96, 1934.136],
  [203, 337.23, 32964.467],
  [199, 342.08, 20.186],
  [182, 27.85, 445267.112],
  [156, 73.14, 45036.886],
  [136, 171.52, 22518.443],
  [77, 222.54, 65928.934],
  [74, 296.72, 3034.906],
  [70, 243.58, 9037.513],
  [58, 119.81, 33718.147],
  [52, 297.17, 150.678],
  [50, 21.02, 2281.226],
  [45, 247.54, 29929.562],
  [44, 325.15, 31555.956],
  [29, 60.93, 4443.417],
  [18, 155.12, 67555.328],
  [17, 288.79, 4562.452],
  [16, 198.04, 62894.029],
  [14, 199.76, 31436.921],
  [12, 95.39, 14577.848],
  [12, 287.11, 31931.756],
  [12, 320.81, 34777.259],
  [9, 227.73, 1222.114],
  [8, 15.45, 16859.074],
];

// Tabel 27.B — JDE0 mediu (ani 1000–3000), Y = (an − 2000) / 1000
function meanJDE0(year: number, season: Season): number {
  const Y = (year - 2000) / 1000;
  const Y2 = Y * Y, Y3 = Y2 * Y, Y4 = Y3 * Y;
  switch (season) {
    case "primavara": return 2451623.80984 + 365242.37404 * Y + 0.05169 * Y2 - 0.00411 * Y3 - 0.00057 * Y4;
    case "vara":      return 2451716.56767 + 365241.62603 * Y + 0.00325 * Y2 + 0.00888 * Y3 - 0.00030 * Y4;
    case "toamna":    return 2451810.21715 + 365242.01767 * Y - 0.11575 * Y2 + 0.00337 * Y3 + 0.00078 * Y4;
    case "iarna":     return 2451900.05952 + 365242.74049 * Y - 0.06223 * Y2 - 0.00823 * Y3 + 0.00032 * Y4;
  }
}

// JDE (Julian Ephemeris Day) → Date UTC (Meeus cap. 7)
function jdToDateUTC(jd: number): Date {
  const z = Math.floor(jd + 0.5);
  const f = jd + 0.5 - z;
  let a = z;
  if (z >= 2299161) {
    const alpha = Math.floor((z - 1867216.25) / 36524.25);
    a = z + 1 + alpha - Math.floor(alpha / 4);
  }
  const b = a + 1524;
  const c = Math.floor((b - 122.1) / 365.25);
  const d = Math.floor(365.25 * c);
  const e = Math.floor((b - d) / 30.6001);
  const dayWithFrac = b - d - Math.floor(30.6001 * e) + f;
  const day = Math.floor(dayWithFrac);
  const hourFrac = (dayWithFrac - day) * 24;
  const month = e < 14 ? e - 1 : e - 13;
  const year = month > 2 ? c - 4716 : c - 4715;
  const hour = Math.floor(hourFrac);
  const minute = Math.floor((hourFrac - hour) * 60);
  const second = Math.floor((((hourFrac - hour) * 60) - minute) * 60);
  return new Date(Date.UTC(year, month - 1, day, hour, minute, second));
}

/**
 * Instantul exact (UTC) al echinocțiului / solstițiului pentru anul dat.
 * ΔT (diferența TD−UT, ~70s) este neglijabilă pentru data calendaristică.
 */
export function seasonInstant(year: number, season: Season): Date {
  const J0 = meanJDE0(year, season);
  const T = (J0 - 2451545.0) / 36525;
  const W = 35999.373 * T - 2.47;
  const dLambda = 1 + 0.0334 * Math.cos(W * DEG) + 0.0007 * Math.cos(2 * W * DEG);
  let S = 0;
  for (const [A, B, C] of PERIODIC_TERMS) {
    S += A * Math.cos((B + C * T) * DEG);
  }
  const jde = J0 + (0.00001 * S) / dLambda;
  return jdToDateUTC(jde);
}

/** Data evenimentului în ora României (Europe/Bucharest), ca {year, month0, day}. */
export function seasonLocalParts(year: number, season: Season): { year: number; month0: number; day: number } {
  const instant = seasonInstant(year, season);
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Bucharest",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(instant); // "YYYY-MM-DD"
  const [y, m, d] = parts.split("-").map(Number);
  return { year: y, month0: m - 1, day: d };
}
