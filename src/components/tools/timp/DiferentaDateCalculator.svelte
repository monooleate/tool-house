<script lang="ts">
  // ============================================================
  // DiferentaDateCalculator.svelte — diferență între date RO
  // Port: math reference DatumKulonbsegKalkulator.tsx, RO-localizat.
  // 3 moduri:
  //   • diferenta — zile, săptămâni, luni, ani între 2 date
  //   • zile-lucratoare — exclude weekend-uri + sărbători legale RO
  //   • adunare-scadere — adaugă / scade zile dintr-o dată
  // Sărbători legale RO 2026 (Codul Muncii Legea 53/2003 art. 139): 1-2 ian, 24 ian,
  //   Vinerea Mare/Paștele/2-a zi de Paști (mobile), 1 mai, 1 iunie (Ziua Copilului),
  //   Rusalii/2-a zi (mobile), 15 aug, 30 nov, 1 dec, 25-26 dec.
  // ============================================================

  type Mode = "diferenta" | "zile-lucratoare" | "adunare-scadere";
  type Operatie = "adauga" | "scade";

  const MODES: { key: Mode; icon: string; label: string; desc: string }[] = [
    { key: "diferenta",       icon: "📅", label: "Diferență date",  desc: "Zile, săptămâni, luni, ani între 2 date" },
    { key: "zile-lucratoare", icon: "💼", label: "Zile lucrătoare", desc: "Exclude weekend-uri și sărbători legale RO" },
    { key: "adunare-scadere", icon: "➕", label: "Adunare / Scădere", desc: "Adaugă sau scade zile dintr-o dată" },
  ];

  function todayISO(): string {
    return new Date().toISOString().split("T")[0];
  }
  function plusDaysISO(days: number): string {
    const d = new Date();
    d.setDate(d.getDate() + days);
    return d.toISOString().split("T")[0];
  }

  let mode: Mode = $state("diferenta");
  let startISO = $state(todayISO());
  let endISO = $state(plusDaysISO(30));
  let zileAdaugare = $state(30);
  let operatie: Operatie = $state("adauga");

  // ────── Easter algorithm (Anonymous Gregorian — Western, dar paste ortodox calc separat) ──────
  function easterCatholic(year: number): Date {
    const a = year % 19, b = Math.floor(year / 100), c = year % 100;
    const d = Math.floor(b / 4), e = b % 4;
    const f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4), k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);
    const month = Math.floor((h + l - 7 * m + 114) / 31);
    const day = ((h + l - 7 * m + 114) % 31) + 1;
    return new Date(year, month - 1, day);
  }

  // Orthodox Easter via Meeus Julian — we calculate Julian then add 13 days for 1900-2099
  function easterOrthodox(year: number): Date {
    const a = year % 4, b = year % 7, c = year % 19;
    const d = (19 * c + 15) % 30;
    const e = (2 * a + 4 * b - d + 34) % 7;
    const julianMonth = Math.floor((d + e + 114) / 31);
    const julianDay = ((d + e + 114) % 31) + 1;
    // Convert Julian → Gregorian (add 13 days for 1900-2099)
    const date = new Date(year, julianMonth - 1, julianDay);
    date.setDate(date.getDate() + 13);
    return date;
  }

  // RO sărbători legale fixe + mobile pentru un an dat
  function holidaysRO(year: number): Set<string> {
    const set = new Set<string>();
    const fixed: [number, number][] = [
      [1, 1], [1, 2],   // Anul Nou
      [1, 24],          // Unirea Principatelor
      [5, 1],           // Ziua Muncii
      [6, 1],           // Ziua Copilului
      [8, 15],          // Adormirea Maicii Domnului
      [11, 30],         // Sf. Andrei
      [12, 1],          // Ziua Națională
      [12, 25], [12, 26], // Crăciun
    ];
    for (const [m, d] of fixed) {
      const dt = new Date(year, m - 1, d);
      set.add(dt.toISOString().split("T")[0]);
    }
    // Paști ortodox + Vinerea Mare (Paști - 2) + 2-a zi (Paști + 1)
    const easter = easterOrthodox(year);
    const vineri = new Date(easter); vineri.setDate(vineri.getDate() - 2);
    const pasti2 = new Date(easter); pasti2.setDate(pasti2.getDate() + 1);
    set.add(vineri.toISOString().split("T")[0]);
    set.add(easter.toISOString().split("T")[0]);
    set.add(pasti2.toISOString().split("T")[0]);
    // Rusalii = Paști + 49 zile, 2-a zi = Paști + 50
    const rusalii = new Date(easter); rusalii.setDate(rusalii.getDate() + 49);
    const rusalii2 = new Date(easter); rusalii2.setDate(rusalii2.getDate() + 50);
    set.add(rusalii.toISOString().split("T")[0]);
    set.add(rusalii2.toISOString().split("T")[0]);
    return set;
  }

  function parseDate(iso: string): Date {
    return new Date(iso + "T00:00:00");
  }

  function isWeekend(d: Date): boolean {
    const day = d.getDay();
    return day === 0 || day === 6;
  }

  function dayName(d: Date): string {
    const names = ["duminică", "luni", "marți", "miercuri", "joi", "vineri", "sâmbătă"];
    return names[d.getDay()];
  }

  function fmtDate(d: Date): string {
    return d.toLocaleDateString("ro-RO", { year: "numeric", month: "long", day: "numeric" });
  }

  // ────── Derived ──────
  let startDate = $derived(parseDate(startISO));
  let endDate = $derived(parseDate(endISO));

  let diff = $derived.by((): {
    zile: number; saptamani: number; luni: number; ani: number;
    ore: number; minute: number;
    pontEvi: number; pontLuni: number; pontZile: number;
  } => {
    const ms = Math.abs(endDate.getTime() - startDate.getTime());
    const zile = Math.floor(ms / (1000 * 60 * 60 * 24));
    let years = endDate.getFullYear() - startDate.getFullYear();
    let months = endDate.getMonth() - startDate.getMonth();
    let days = endDate.getDate() - startDate.getDate();
    if (days < 0) {
      months--;
      const prev = new Date(endDate.getFullYear(), endDate.getMonth(), 0);
      days += prev.getDate();
    }
    if (months < 0) { years--; months += 12; }
    return {
      zile,
      saptamani: zile / 7,
      luni: zile / 30.44,
      ani: zile / 365.25,
      ore: zile * 24,
      minute: zile * 24 * 60,
      pontEvi: Math.abs(years),
      pontLuni: Math.abs(months),
      pontZile: Math.abs(days),
    };
  });

  let zileLucratoare = $derived.by((): { lucratoare: number; weekend: number; sarbatori: number; total: number } => {
    const a = startDate, b = endDate;
    const direction = b >= a ? 1 : -1;
    const cur = new Date(a);
    let lucratoare = 0, weekend = 0, sarbatori = 0;
    // Pre-calculează sărbătorile pentru anii implicați
    const holidayYears = new Set<number>();
    holidayYears.add(a.getFullYear());
    holidayYears.add(b.getFullYear());
    const allHolidays = new Set<string>();
    for (const y of holidayYears) {
      const set = holidaysRO(y);
      for (const x of set) allHolidays.add(x);
    }
    while ((direction === 1 && cur <= b) || (direction === -1 && cur >= b)) {
      const iso = cur.toISOString().split("T")[0];
      if (isWeekend(cur)) weekend++;
      else if (allHolidays.has(iso)) sarbatori++;
      else lucratoare++;
      cur.setDate(cur.getDate() + direction);
    }
    return { lucratoare, weekend, sarbatori, total: lucratoare + weekend + sarbatori };
  });

  let dataCalculata = $derived.by((): Date => {
    const d = new Date(startDate);
    const offset = operatie === "adauga" ? zileAdaugare : -zileAdaugare;
    d.setDate(d.getDate() + offset);
    return d;
  });

  const QUICK_DAYS = [7, 14, 30, 60, 90, 180, 365];

  function setQuickEnd(days: number) {
    startISO = todayISO();
    endISO = plusDaysISO(days);
  }

  function fmt(n: number, d = 1): string {
    if (!Number.isFinite(n)) return "–";
    return n.toLocaleString("ro-RO", { minimumFractionDigits: 0, maximumFractionDigits: d });
  }
</script>

<div class="dif">
  <div class="dif__header">
    <span class="dif__icon" aria-hidden="true">📅</span>
    <div>
      <h2 class="dif__title">Calculator Diferență între Date</h2>
      <p class="dif__sub">Zile, săptămâni, luni, ani · zile lucrătoare RO (cu sărbători legale) · adunare/scădere</p>
    </div>
  </div>

  <!-- Mode tabs -->
  <div class="dif__tabs" role="tablist">
    {#each MODES as m}
      <button
        type="button"
        class="dif__tab"
        class:is-active={mode === m.key}
        role="tab"
        aria-selected={mode === m.key}
        onclick={() => (mode = m.key)}
      >
        <span class="dif__tab-icon" aria-hidden="true">{m.icon}</span>
        <span class="dif__tab-text">
          <span class="dif__tab-label">{m.label}</span>
          <span class="dif__tab-desc">{m.desc}</span>
        </span>
      </button>
    {/each}
  </div>

  {#if mode === "diferenta" || mode === "zile-lucratoare"}
    <div class="dif__inputs">
      <div class="dif__field">
        <label for="dif-start" class="dif__label">Dată de început</label>
        <input id="dif-start" type="date" class="dif__date" value={startISO} oninput={(e) => (startISO = (e.target as HTMLInputElement).value)} />
        <p class="dif__hint">{dayName(startDate)} · {fmtDate(startDate)}</p>
      </div>
      <div class="dif__field">
        <label for="dif-end" class="dif__label">Dată de sfârșit</label>
        <input id="dif-end" type="date" class="dif__date" value={endISO} oninput={(e) => (endISO = (e.target as HTMLInputElement).value)} />
        <p class="dif__hint">{dayName(endDate)} · {fmtDate(endDate)}</p>
      </div>
    </div>
    <div class="dif__quick">
      <span class="dif__quick-lbl">Repede:</span>
      <button type="button" class="dif__chip" onclick={() => (startISO = todayISO())}>Azi</button>
      {#each QUICK_DAYS as q}
        <button type="button" class="dif__chip" onclick={() => setQuickEnd(q)}>+{q} zile</button>
      {/each}
    </div>
  {/if}

  {#if mode === "diferenta"}
    <div class="dif__main">
      <span class="dif__main-label">Diferență exactă</span>
      <div class="dif__main-pieces">
        {#if diff.pontEvi > 0}
          <div class="dif__piece"><span class="dif__piece-num">{diff.pontEvi}</span><span class="dif__piece-lbl">{diff.pontEvi === 1 ? "an" : "ani"}</span></div>
        {/if}
        {#if diff.pontEvi > 0 || diff.pontLuni > 0}
          <div class="dif__piece"><span class="dif__piece-num">{diff.pontLuni}</span><span class="dif__piece-lbl">{diff.pontLuni === 1 ? "lună" : "luni"}</span></div>
        {/if}
        <div class="dif__piece"><span class="dif__piece-num">{diff.pontZile}</span><span class="dif__piece-lbl">{diff.pontZile === 1 ? "zi" : "zile"}</span></div>
      </div>
    </div>

    <div class="dif__cards">
      <div class="dif__card"><span class="dif__card-num">{fmt(diff.zile, 0)}</span><span class="dif__card-lbl">zile</span></div>
      <div class="dif__card"><span class="dif__card-num">{fmt(diff.saptamani)}</span><span class="dif__card-lbl">săptămâni</span></div>
      <div class="dif__card"><span class="dif__card-num">{fmt(diff.luni)}</span><span class="dif__card-lbl">luni</span></div>
      <div class="dif__card"><span class="dif__card-num">{fmt(diff.ani, 2)}</span><span class="dif__card-lbl">ani</span></div>
      <div class="dif__card"><span class="dif__card-num">{fmt(diff.ore, 0)}</span><span class="dif__card-lbl">ore</span></div>
      <div class="dif__card"><span class="dif__card-num">{fmt(diff.minute, 0)}</span><span class="dif__card-lbl">minute</span></div>
    </div>
  {/if}

  {#if mode === "zile-lucratoare"}
    <div class="dif__work">
      <div class="dif__work-card dif__work-card--ok">
        <span class="dif__work-icon">💼</span>
        <span class="dif__work-num">{zileLucratoare.lucratoare}</span>
        <span class="dif__work-lbl">zile lucrătoare</span>
        <span class="dif__work-note">L–V, exclude sărbători</span>
      </div>
      <div class="dif__work-card">
        <span class="dif__work-icon">🏖️</span>
        <span class="dif__work-num">{zileLucratoare.weekend}</span>
        <span class="dif__work-lbl">weekend</span>
        <span class="dif__work-note">Sâmbătă · Duminică</span>
      </div>
      <div class="dif__work-card">
        <span class="dif__work-icon">🇷🇴</span>
        <span class="dif__work-num">{zileLucratoare.sarbatori}</span>
        <span class="dif__work-lbl">sărbători legale</span>
        <span class="dif__work-note">Codul Muncii art. 139</span>
      </div>
    </div>
    <p class="dif__work-total">
      Total: <strong>{zileLucratoare.total}</strong> zile · raport lucrătoare/total = <strong>{((zileLucratoare.lucratoare / Math.max(1, zileLucratoare.total)) * 100).toFixed(1)}%</strong>
    </p>
  {/if}

  {#if mode === "adunare-scadere"}
    <div class="dif__inputs">
      <div class="dif__field">
        <label for="dif-base" class="dif__label">Dată de pornire</label>
        <input id="dif-base" type="date" class="dif__date" value={startISO} oninput={(e) => (startISO = (e.target as HTMLInputElement).value)} />
        <p class="dif__hint">{dayName(startDate)} · {fmtDate(startDate)}</p>
      </div>
      <div class="dif__field">
        <label class="dif__label">Operație</label>
        <div class="dif__op">
          <button type="button" class="dif__op-btn" class:is-active={operatie === "adauga"} onclick={() => (operatie = "adauga")}>➕ Adaugă</button>
          <button type="button" class="dif__op-btn" class:is-active={operatie === "scade"} onclick={() => (operatie = "scade")}>➖ Scade</button>
        </div>
      </div>
    </div>

    <div class="dif__field">
      <label for="dif-zile" class="dif__label">Număr zile</label>
      <input id="dif-zile" type="number" min="0" class="dif__date" value={zileAdaugare} oninput={(e) => (zileAdaugare = Number((e.target as HTMLInputElement).value))} />
      <div class="dif__quick">
        {#each QUICK_DAYS as q}
          <button type="button" class="dif__chip" onclick={() => (zileAdaugare = q)}>{q}</button>
        {/each}
      </div>
    </div>

    <div class="dif__main">
      <span class="dif__main-label">Data rezultată</span>
      <p class="dif__main-date">{fmtDate(dataCalculata)}</p>
      <p class="dif__main-day">{dayName(dataCalculata)}</p>
      <p class="dif__main-iso">ISO: {dataCalculata.toISOString().split("T")[0]}</p>
    </div>
  {/if}

  <p class="dif__note">
    <strong>📌 Sărbători legale RO 2026:</strong> 1-2 ian (Anul Nou), 24 ian (Unirea), Vinerea Mare/Paști/2-a zi (mobile), 1 mai, 1 iun (Ziua Copilului), Rusalii (mobile), 15 aug, 30 nov (Sf. Andrei), 1 dec (Ziua Națională), 25-26 dec (Crăciun) — conform Codului Muncii art. 139.
  </p>
</div>

<style>
  .dif {
    display: flex; flex-direction: column; gap: var(--sp-4);
    padding: var(--sp-5); background: var(--bg-card);
    border: 1px solid var(--border); border-radius: var(--r-lg);
    --dif-accent: var(--cat-timp, #f97316);
  }
  .dif__header {
    display: flex; gap: var(--sp-3); align-items: center;
    padding: var(--sp-3); background: var(--bg);
    border: 1px solid var(--border); border-radius: var(--r-md);
  }
  .dif__icon { font-size: 1.5rem; }
  .dif__title { margin: 0; font-size: 1rem; font-weight: 700; color: var(--text); }
  .dif__sub { margin: 2px 0 0 0; font-size: 0.8125rem; color: var(--text-muted); }

  .dif__tabs { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--sp-2); }
  @media (max-width: 720px) { .dif__tabs { grid-template-columns: 1fr; } }
  .dif__tab {
    display: flex; align-items: center; gap: var(--sp-2);
    padding: var(--sp-3); cursor: pointer; text-align: left;
    background: var(--bg); color: var(--text);
    border: 2px solid var(--border); border-radius: var(--r-md);
    transition: all var(--t-fast);
  }
  .dif__tab:hover {
    border-color: color-mix(in srgb, var(--dif-accent) 55%, transparent);
    background: color-mix(in srgb, var(--dif-accent) 6%, var(--bg));
  }
  .dif__tab.is-active {
    border-color: var(--dif-accent);
    background: color-mix(in srgb, var(--dif-accent) 10%, var(--bg));
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--dif-accent) 18%, transparent);
  }
  .dif__tab-icon { font-size: 1.125rem; flex-shrink: 0; }
  .dif__tab-text { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
  .dif__tab-label { font-size: 0.875rem; font-weight: 700; color: var(--text); }
  .dif__tab-desc { font-size: 0.6875rem; color: var(--text-muted); line-height: 1.2; }

  .dif__inputs { display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-3); }
  @media (max-width: 640px) { .dif__inputs { grid-template-columns: 1fr; } }
  .dif__field { display: flex; flex-direction: column; gap: var(--sp-2); }
  .dif__label { font-size: 0.8125rem; color: var(--text-muted); font-weight: 500; }
  .dif__date {
    width: 100%; padding: var(--sp-3);
    background: var(--bg); border: 2px solid var(--border);
    border-radius: var(--r-md);
    color: var(--text); font-size: 1rem; font-family: var(--font-mono);
    transition: border-color var(--t-fast); outline: none;
  }
  .dif__date:focus {
    border-color: var(--dif-accent);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--dif-accent) 18%, transparent);
  }
  .dif__hint { margin: 0; font-size: 0.75rem; color: var(--text-subtle); }

  .dif__quick {
    display: flex; flex-wrap: wrap; gap: 6px; align-items: center;
  }
  .dif__quick-lbl { font-size: 0.75rem; color: var(--text-muted); }
  .dif__chip {
    padding: 4px 10px; font-size: 0.75rem; font-weight: 600;
    background: color-mix(in srgb, var(--dif-accent) 12%, transparent);
    color: var(--dif-accent);
    border: 1px solid transparent; border-radius: var(--r-full);
    cursor: pointer; font-family: var(--font-mono);
    transition: all var(--t-fast);
  }
  .dif__chip:hover { background: var(--dif-accent); color: #fff; }

  .dif__op { display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-2); }
  .dif__op-btn {
    padding: var(--sp-3); cursor: pointer; font-size: 0.875rem; font-weight: 700;
    background: var(--bg); color: var(--text);
    border: 2px solid var(--border); border-radius: var(--r-md);
    transition: all var(--t-fast);
  }
  .dif__op-btn:hover {
    border-color: color-mix(in srgb, var(--dif-accent) 55%, transparent);
    background: color-mix(in srgb, var(--dif-accent) 6%, var(--bg));
  }
  .dif__op-btn.is-active {
    border-color: var(--dif-accent);
    background: color-mix(in srgb, var(--dif-accent) 12%, var(--bg));
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--dif-accent) 18%, transparent);
  }

  .dif__main {
    display: flex; flex-direction: column; gap: var(--sp-2); align-items: center;
    padding: var(--sp-4); text-align: center;
    background: color-mix(in srgb, var(--dif-accent) 10%, var(--bg));
    border: 2px solid color-mix(in srgb, var(--dif-accent) 35%, transparent);
    border-radius: var(--r-md);
  }
  .dif__main-label { font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.04em; font-weight: 700; }
  .dif__main-pieces { display: flex; gap: var(--sp-4); flex-wrap: wrap; justify-content: center; }
  .dif__piece { display: flex; flex-direction: column; align-items: center; }
  .dif__piece-num { font-family: var(--font-mono); font-size: 2.25rem; font-weight: 800; color: var(--dif-accent); line-height: 1; }
  .dif__piece-lbl { font-size: 0.75rem; color: var(--text-muted); }
  .dif__main-date { margin: 0; font-size: 1.5rem; font-weight: 800; color: var(--dif-accent); }
  .dif__main-day { margin: 0; font-size: 1rem; color: var(--text); font-style: italic; }
  .dif__main-iso { margin: 0; font-size: 0.75rem; color: var(--text-subtle); font-family: var(--font-mono); }

  .dif__cards {
    display: grid; grid-template-columns: repeat(6, 1fr); gap: var(--sp-2);
  }
  @media (max-width: 720px) { .dif__cards { grid-template-columns: repeat(3, 1fr); } }
  @media (max-width: 480px) { .dif__cards { grid-template-columns: repeat(2, 1fr); } }
  .dif__card {
    display: flex; flex-direction: column; align-items: center; gap: 2px;
    padding: var(--sp-2);
    background: var(--bg); border: 1px solid var(--border); border-radius: var(--r-md);
  }
  .dif__card-num { font-family: var(--font-mono); font-size: 1.125rem; font-weight: 800; color: var(--text); }
  .dif__card-lbl { font-size: 0.6875rem; color: var(--text-muted); }

  .dif__work {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--sp-3);
  }
  @media (max-width: 640px) { .dif__work { grid-template-columns: 1fr; } }
  .dif__work-card {
    display: flex; flex-direction: column; align-items: center; gap: 4px;
    padding: var(--sp-3); text-align: center;
    background: var(--bg); border: 1px solid var(--border); border-radius: var(--r-md);
  }
  .dif__work-card--ok {
    background: color-mix(in srgb, var(--dif-accent) 10%, var(--bg));
    border-color: color-mix(in srgb, var(--dif-accent) 35%, transparent);
  }
  .dif__work-icon { font-size: 1.5rem; }
  .dif__work-num { font-family: var(--font-mono); font-size: 1.875rem; font-weight: 800; color: var(--dif-accent); line-height: 1; }
  .dif__work-card:not(.dif__work-card--ok) .dif__work-num { color: var(--text); }
  .dif__work-lbl { font-size: 0.875rem; font-weight: 700; color: var(--text); }
  .dif__work-note { font-size: 0.6875rem; color: var(--text-subtle); }
  .dif__work-total { margin: 0; text-align: center; font-size: 0.875rem; color: var(--text-muted); }
  .dif__work-total strong { color: var(--dif-accent); font-family: var(--font-mono); }

  .dif__note {
    margin: 0;
    font-size: 0.75rem; color: var(--text-subtle);
    padding: var(--sp-2) var(--sp-3); background: var(--bg);
    border-left: 3px solid color-mix(in srgb, var(--dif-accent) 50%, transparent);
    border-radius: var(--r-sm); line-height: 1.5;
  }
</style>
