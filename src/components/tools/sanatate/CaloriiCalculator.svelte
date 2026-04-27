<script lang="ts">
  // ============================================================
  // CaloriiCalculator.svelte — necesar caloric zilnic RO
  // Port: math reference KaloriaKalkulator.tsx, RO-localizat.
  // BMR: Mifflin-St Jeor (1990) — cea mai precisă formulă pentru populația modernă.
  //   Bărbat: BMR = 10·G + 6,25·H − 5·V + 5
  //   Femeie: BMR = 10·G + 6,25·H − 5·V − 161
  // TDEE: BMR × factor activitate (5 trepte 1.2 → 1.9)
  // 3 obiective: slăbire (TDEE − 500 kcal), menținere, masă musculară (TDEE + 300 kcal)
  // Macro split: P = 2 g/kg, F = 25% kcal, C = restul.
  // Donut chart SVG cu 3 felii (P/C/F).
  // ============================================================

  type Sex = "barbat" | "femeie";
  type Obiectiv = "slabire" | "mentinere" | "masa";

  type Activitate = { val: number; nume: string; descriere: string; icon: string };

  const ACTIVITATI: Activitate[] = [
    { val: 1.2,   nume: "Sedentar",        descriere: "Birou, fără sport (rar mers)",          icon: "🪑" },
    { val: 1.375, nume: "Ușor activ",      descriere: "1–3 ședințe sport / săpt.",            icon: "🚶" },
    { val: 1.55,  nume: "Moderat activ",   descriere: "3–5 ședințe sport / săpt.",            icon: "🏃" },
    { val: 1.725, nume: "Foarte activ",    descriere: "6–7 antrenamente intense / săpt.",      icon: "🏋️" },
    { val: 1.9,   nume: "Extrem de activ", descriere: "Antrenamente zilnice + muncă fizică",  icon: "⚡" },
  ];

  type ObiectivOpt = { key: Obiectiv; nume: string; ajustare: number; icon: string; descriere: string };
  const OBIECTIVE: ObiectivOpt[] = [
    { key: "slabire",   nume: "Slăbire",        ajustare: -500, icon: "📉", descriere: "Deficit ~500 kcal/zi → ≈ 0,5 kg/săpt." },
    { key: "mentinere", nume: "Menținere",      ajustare:    0, icon: "⚖️", descriere: "Egal cu TDEE — păstrezi greutatea actuală." },
    { key: "masa",      nume: "Masă musculară", ajustare:  300, icon: "💪", descriere: "Surplus moderat ~300 kcal/zi → câștig lent, calitativ." },
  ];

  let sex: Sex = $state("barbat");
  let varstaRaw = $state("30");
  let inaltimeRaw = $state("175");
  let greutateRaw = $state("75");
  let activitate = $state(1.55);
  let obiectiv: Obiectiv = $state("mentinere");

  function parse(v: string): number {
    const cleaned = v.replace(/\s/g, "").replace(",", ".");
    const n = parseFloat(cleaned);
    return Number.isFinite(n) ? n : NaN;
  }
  function fmt(n: number): string {
    if (!Number.isFinite(n)) return "–";
    return Math.round(n).toLocaleString("ro-RO");
  }

  let bmr = $derived.by((): number => {
    const v = parse(varstaRaw);
    const h = parse(inaltimeRaw);
    const g = parse(greutateRaw);
    if (![v, h, g].every((x) => Number.isFinite(x) && x > 0)) return NaN;
    const base = 10 * g + 6.25 * h - 5 * v;
    return sex === "barbat" ? base + 5 : base - 161;
  });

  let tdee = $derived.by((): number => {
    if (!Number.isFinite(bmr)) return NaN;
    return bmr * activitate;
  });

  // Ajustare după obiectiv (cu floor de 1200 kcal pentru siguranță)
  let kcalTinta = $derived.by((): number => {
    if (!Number.isFinite(tdee)) return NaN;
    const obj = OBIECTIVE.find((o) => o.key === obiectiv);
    const target = tdee + (obj?.ajustare ?? 0);
    return Math.max(1200, target);
  });

  // Macros: P 2g/kg corp, F 25% din kcal țintă, C restul
  let macros = $derived.by((): { p: number; c: number; f: number; pKcal: number; cKcal: number; fKcal: number } => {
    const g = parse(greutateRaw);
    const total = kcalTinta;
    if (!Number.isFinite(g) || !Number.isFinite(total)) {
      return { p: NaN, c: NaN, f: NaN, pKcal: NaN, cKcal: NaN, fKcal: NaN };
    }
    const p = g * 2;             // grame proteină
    const pKcal = p * 4;
    const fKcal = total * 0.25;
    const f = fKcal / 9;         // grame grăsime
    const cKcal = Math.max(0, total - pKcal - fKcal);
    const c = cKcal / 4;
    return { p, c, f, pKcal, cKcal, fKcal };
  });

  // Pentru donut chart, calculăm 3 procente
  let donutPercent = $derived.by((): { p: number; c: number; f: number } => {
    const total = kcalTinta;
    const m = macros;
    if (!Number.isFinite(total) || total <= 0) return { p: 0, c: 0, f: 0 };
    return {
      p: (m.pKcal / total) * 100,
      c: (m.cKcal / total) * 100,
      f: (m.fKcal / total) * 100,
    };
  });

  // Donut chart: SVG circle stroke-dasharray
  // Circumferința = 2π × 50 ≈ 314.159
  const C = 2 * Math.PI * 50;
  let donutDash = $derived.by((): { p: string; c: string; f: string; pOff: number; cOff: number; fOff: number } => {
    const dp = donutPercent;
    const pLen = (dp.p / 100) * C;
    const cLen = (dp.c / 100) * C;
    const fLen = (dp.f / 100) * C;
    return {
      p: `${pLen} ${C - pLen}`,
      c: `${cLen} ${C - cLen}`,
      f: `${fLen} ${C - fLen}`,
      pOff: 0,
      cOff: -pLen,
      fOff: -(pLen + cLen),
    };
  });

  // 3 valori pentru bara obiective comparativ
  let obiectiveTotale = $derived.by((): { slabire: number; mentinere: number; masa: number } => {
    if (!Number.isFinite(tdee)) return { slabire: NaN, mentinere: NaN, masa: NaN };
    return {
      slabire: Math.max(1200, tdee - 500),
      mentinere: tdee,
      masa: Math.max(1200, tdee + 300),
    };
  });

  const PRESET_GREUTATE = [50, 60, 70, 80, 90, 100];
  const PRESET_INALTIME = [160, 165, 170, 175, 180, 185];
</script>

<div class="cal">
  <div class="cal__header">
    <span class="cal__icon" aria-hidden="true">🔥</span>
    <div>
      <h2 class="cal__title">Calculator Calorii Zilnice (BMR + TDEE)</h2>
      <p class="cal__sub">Mifflin-St Jeor (1990) cu 5 niveluri de activitate și 3 obiective</p>
    </div>
  </div>

  <!-- Sex selector -->
  <div class="cal__section">
    <span class="cal__section-label">1. Sex</span>
    <div class="cal__sex" role="radiogroup" aria-label="Sex">
      <button
        type="button"
        class="cal__sex-btn"
        class:is-active={sex === "barbat"}
        role="radio"
        aria-checked={sex === "barbat"}
        onclick={() => (sex = "barbat")}
      >
        <span aria-hidden="true">👨</span>
        Bărbat
      </button>
      <button
        type="button"
        class="cal__sex-btn"
        class:is-active={sex === "femeie"}
        role="radio"
        aria-checked={sex === "femeie"}
        onclick={() => (sex = "femeie")}
      >
        <span aria-hidden="true">👩</span>
        Femeie
      </button>
    </div>
  </div>

  <!-- Vârstă, Înălțime, Greutate -->
  <div class="cal__section">
    <span class="cal__section-label">2. Date personale</span>
    <div class="cal__inputs">
      <div class="cal__field">
        <label for="cal-varsta" class="cal__label">Vârstă</label>
        <div class="cal__input-wrap">
          <input
            id="cal-varsta"
            type="text"
            inputmode="decimal"
            value={varstaRaw}
            oninput={(e) => (varstaRaw = (e.target as HTMLInputElement).value)}
            class="cal__input"
          />
          <span class="cal__suffix">ani</span>
        </div>
      </div>

      <div class="cal__field">
        <label for="cal-inaltime" class="cal__label">Înălțime</label>
        <div class="cal__input-wrap">
          <input
            id="cal-inaltime"
            type="text"
            inputmode="decimal"
            value={inaltimeRaw}
            oninput={(e) => (inaltimeRaw = (e.target as HTMLInputElement).value)}
            class="cal__input"
          />
          <span class="cal__suffix">cm</span>
        </div>
        <div class="cal__presets">
          {#each PRESET_INALTIME as p}
            <button type="button" class="cal__chip" onclick={() => (inaltimeRaw = String(p))}>{p}</button>
          {/each}
        </div>
      </div>

      <div class="cal__field">
        <label for="cal-greutate" class="cal__label">Greutate</label>
        <div class="cal__input-wrap">
          <input
            id="cal-greutate"
            type="text"
            inputmode="decimal"
            value={greutateRaw}
            oninput={(e) => (greutateRaw = (e.target as HTMLInputElement).value)}
            class="cal__input"
          />
          <span class="cal__suffix">kg</span>
        </div>
        <div class="cal__presets">
          {#each PRESET_GREUTATE as p}
            <button type="button" class="cal__chip" onclick={() => (greutateRaw = String(p))}>{p}</button>
          {/each}
        </div>
      </div>
    </div>
  </div>

  <!-- Nivel activitate -->
  <div class="cal__section">
    <span class="cal__section-label">3. Nivel de activitate</span>
    <div class="cal__act" role="radiogroup" aria-label="Nivel activitate">
      {#each ACTIVITATI as a}
        <button
          type="button"
          class="cal__act-btn"
          class:is-active={activitate === a.val}
          role="radio"
          aria-checked={activitate === a.val}
          onclick={() => (activitate = a.val)}
        >
          <span class="cal__act-icon" aria-hidden="true">{a.icon}</span>
          <span class="cal__act-text">
            <span class="cal__act-name">{a.nume}</span>
            <span class="cal__act-desc">{a.descriere}</span>
          </span>
          <span class="cal__act-mult">×{a.val.toFixed(2).replace(".", ",")}</span>
        </button>
      {/each}
    </div>
  </div>

  <!-- Obiectiv -->
  <div class="cal__section">
    <span class="cal__section-label">4. Obiectivul tău</span>
    <div class="cal__obj" role="radiogroup" aria-label="Obiectiv">
      {#each OBIECTIVE as o}
        <button
          type="button"
          class="cal__obj-btn"
          class:is-active={obiectiv === o.key}
          role="radio"
          aria-checked={obiectiv === o.key}
          onclick={() => (obiectiv = o.key)}
        >
          <span class="cal__obj-icon" aria-hidden="true">{o.icon}</span>
          <span class="cal__obj-name">{o.nume}</span>
          <span class="cal__obj-desc">{o.descriere}</span>
        </button>
      {/each}
    </div>
  </div>

  <!-- BMR + TDEE + Țintă -->
  <div class="cal__results">
    <div class="cal__result">
      <span class="cal__result-label">BMR (metabolism bazal)</span>
      <span class="cal__result-value">{fmt(bmr)} <small>kcal</small></span>
      <span class="cal__result-note">În repaus complet</span>
    </div>
    <div class="cal__result">
      <span class="cal__result-label">TDEE (consum total zilnic)</span>
      <span class="cal__result-value">{fmt(tdee)} <small>kcal</small></span>
      <span class="cal__result-note">BMR × {activitate.toFixed(2).replace(".", ",")}</span>
    </div>
    <div class="cal__result cal__result--main">
      <span class="cal__result-label">Țintă pentru obiectivul ales</span>
      <span class="cal__result-value">{fmt(kcalTinta)} <small>kcal</small></span>
      <span class="cal__result-note">{OBIECTIVE.find((o) => o.key === obiectiv)?.nume}</span>
    </div>
  </div>

  <!-- Donut + Macros -->
  <div class="cal__macros">
    <div class="cal__donut" aria-label="Distribuție macronutrienți">
      <svg viewBox="0 0 120 120" width="160" height="160" role="img" aria-label="Donut chart macro">
        <!-- Track -->
        <circle cx="60" cy="60" r="50" fill="none" stroke="var(--bg)" stroke-width="14" />
        <!-- Proteine -->
        <circle
          cx="60" cy="60" r="50"
          fill="none" stroke="#dc2626" stroke-width="14"
          stroke-dasharray={donutDash.p}
          stroke-dashoffset={donutDash.pOff}
          transform="rotate(-90 60 60)"
        />
        <!-- Carbohidrați -->
        <circle
          cx="60" cy="60" r="50"
          fill="none" stroke="#f59e0b" stroke-width="14"
          stroke-dasharray={donutDash.c}
          stroke-dashoffset={donutDash.cOff}
          transform="rotate(-90 60 60)"
        />
        <!-- Grăsimi -->
        <circle
          cx="60" cy="60" r="50"
          fill="none" stroke="#2563eb" stroke-width="14"
          stroke-dasharray={donutDash.f}
          stroke-dashoffset={donutDash.fOff}
          transform="rotate(-90 60 60)"
        />
        <!-- Center text -->
        <text x="60" y="56" text-anchor="middle" font-size="9" fill="var(--text-muted)" font-weight="600">Total</text>
        <text x="60" y="72" text-anchor="middle" font-size="14" fill="var(--text)" font-weight="800" font-family="var(--font-mono)">{fmt(kcalTinta)}</text>
      </svg>
    </div>

    <div class="cal__macro-cards">
      <div class="cal__macro-card cal__macro-card--p">
        <span class="cal__macro-label">Proteine</span>
        <span class="cal__macro-grams">{fmt(macros.p)} <small>g</small></span>
        <span class="cal__macro-kcal">{fmt(macros.pKcal)} kcal · {donutPercent.p.toFixed(0)}%</span>
      </div>
      <div class="cal__macro-card cal__macro-card--c">
        <span class="cal__macro-label">Carbohidrați</span>
        <span class="cal__macro-grams">{fmt(macros.c)} <small>g</small></span>
        <span class="cal__macro-kcal">{fmt(macros.cKcal)} kcal · {donutPercent.c.toFixed(0)}%</span>
      </div>
      <div class="cal__macro-card cal__macro-card--f">
        <span class="cal__macro-label">Grăsimi</span>
        <span class="cal__macro-grams">{fmt(macros.f)} <small>g</small></span>
        <span class="cal__macro-kcal">{fmt(macros.fKcal)} kcal · {donutPercent.f.toFixed(0)}%</span>
      </div>
    </div>
  </div>

  <!-- Comparativ 3 obiective -->
  <div class="cal__compare">
    <span class="cal__compare-label">Comparativ cele 3 obiective</span>
    <div class="cal__compare-bars">
      <div class="cal__compare-bar">
        <span class="cal__compare-name">📉 Slăbire</span>
        <span class="cal__compare-val">{fmt(obiectiveTotale.slabire)} kcal</span>
      </div>
      <div class="cal__compare-bar">
        <span class="cal__compare-name">⚖️ Menținere</span>
        <span class="cal__compare-val">{fmt(obiectiveTotale.mentinere)} kcal</span>
      </div>
      <div class="cal__compare-bar">
        <span class="cal__compare-name">💪 Masă musculară</span>
        <span class="cal__compare-val">{fmt(obiectiveTotale.masa)} kcal</span>
      </div>
    </div>
  </div>

  <div class="cal__formula">
    <strong>Formula Mifflin-St Jeor:</strong>
    BMR<sub>bărbat</sub> = 10·G + 6,25·H − 5·V + 5 ·
    BMR<sub>femeie</sub> = 10·G + 6,25·H − 5·V − 161
  </div>

  <p class="cal__note">
    <strong>⚠️ Disclaimer:</strong> Acest calculator NU înlocuiește consultul medical. Pentru diagnostic
    și plan personalizat, consultă un medic sau nutriționist autorizat (Asociația Română Nutriționiștilor).
    Pragul minim de siguranță aplicat: 1200 kcal/zi.
  </p>
</div>

<style>
  .cal {
    display: flex; flex-direction: column; gap: var(--sp-4);
    padding: var(--sp-5); background: var(--bg-card);
    border: 1px solid var(--border); border-radius: var(--r-lg);
    --cal-accent: var(--cat-sanatate, #e11d48);
  }
  .cal__header {
    display: flex; gap: var(--sp-3); align-items: center;
    padding: var(--sp-3); background: var(--bg);
    border: 1px solid var(--border); border-radius: var(--r-md);
  }
  .cal__icon { font-size: 1.5rem; }
  .cal__title { margin: 0; font-size: 1rem; font-weight: 700; color: var(--text); }
  .cal__sub { margin: 2px 0 0 0; font-size: 0.8125rem; color: var(--text-muted); }

  .cal__section { display: flex; flex-direction: column; gap: var(--sp-2); }
  .cal__section-label {
    font-size: 0.75rem; font-weight: 700; color: var(--text-muted);
    text-transform: uppercase; letter-spacing: 0.04em;
  }

  /* Sex */
  .cal__sex { display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-2); }
  .cal__sex-btn {
    display: flex; align-items: center; justify-content: center; gap: var(--sp-2);
    padding: var(--sp-3); cursor: pointer; font-size: 0.875rem; font-weight: 700;
    background: var(--bg); border: 2px solid var(--border);
    border-radius: var(--r-md); color: var(--text);
    transition: all var(--t-fast);
  }
  .cal__sex-btn:hover {
    border-color: color-mix(in srgb, var(--cal-accent) 55%, transparent);
    background: color-mix(in srgb, var(--cal-accent) 6%, var(--bg));
  }
  .cal__sex-btn.is-active {
    border-color: var(--cal-accent);
    background: color-mix(in srgb, var(--cal-accent) 12%, var(--bg));
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--cal-accent) 18%, transparent);
  }

  /* Inputs (3) */
  .cal__inputs {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--sp-3);
  }
  @media (max-width: 720px) { .cal__inputs { grid-template-columns: 1fr 1fr; } }
  @media (max-width: 480px) { .cal__inputs { grid-template-columns: 1fr; } }
  .cal__field { display: flex; flex-direction: column; gap: var(--sp-2); }
  .cal__label { font-size: 0.8125rem; color: var(--text-muted); font-weight: 500; }
  .cal__input-wrap {
    position: relative;
    background: var(--bg); border: 2px solid var(--border);
    border-radius: var(--r-md); padding: var(--sp-3) var(--sp-5) var(--sp-3) var(--sp-3);
    transition: border-color var(--t-fast);
  }
  .cal__input-wrap:focus-within {
    border-color: var(--cal-accent);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--cal-accent) 18%, transparent);
  }
  .cal__input {
    width: 100%; border: none; background: transparent;
    color: var(--text); font-size: 1.5rem; font-weight: 700;
    font-family: var(--font-mono); text-align: center; outline: none;
  }
  .cal__suffix {
    position: absolute; right: var(--sp-3); top: 50%; transform: translateY(-50%);
    color: var(--text-subtle); font-weight: 600; font-size: 0.8125rem;
  }
  .cal__presets { display: flex; flex-wrap: wrap; gap: 6px; }
  .cal__chip {
    padding: 3px 10px; font-size: 0.75rem; font-weight: 600;
    background: color-mix(in srgb, var(--cal-accent) 12%, transparent);
    color: var(--cal-accent);
    border: 1px solid transparent; border-radius: var(--r-full);
    cursor: pointer; font-family: var(--font-mono);
    transition: all var(--t-fast);
  }
  .cal__chip:hover { background: var(--cal-accent); color: #fff; }

  /* Activitate (5) */
  .cal__act { display: flex; flex-direction: column; gap: var(--sp-2); }
  .cal__act-btn {
    display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: var(--sp-3);
    padding: var(--sp-3); cursor: pointer;
    background: var(--bg); border: 2px solid var(--border);
    border-radius: var(--r-md); color: var(--text); text-align: left;
    transition: all var(--t-fast);
  }
  .cal__act-btn:hover {
    border-color: color-mix(in srgb, var(--cal-accent) 55%, transparent);
    background: color-mix(in srgb, var(--cal-accent) 6%, var(--bg));
  }
  .cal__act-btn.is-active {
    border-color: var(--cal-accent);
    background: color-mix(in srgb, var(--cal-accent) 10%, var(--bg));
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--cal-accent) 18%, transparent);
  }
  .cal__act-icon { font-size: 1.25rem; }
  .cal__act-text { display: flex; flex-direction: column; gap: 2px; }
  .cal__act-name { font-size: 0.875rem; font-weight: 700; }
  .cal__act-desc { font-size: 0.75rem; color: var(--text-muted); }
  .cal__act-mult {
    font-family: var(--font-mono); font-size: 0.875rem; font-weight: 700;
    color: var(--cal-accent);
  }

  /* Obiectiv */
  .cal__obj { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--sp-2); }
  @media (max-width: 720px) { .cal__obj { grid-template-columns: 1fr; } }
  .cal__obj-btn {
    display: flex; flex-direction: column; gap: 4px;
    padding: var(--sp-3); cursor: pointer;
    background: var(--bg); border: 2px solid var(--border);
    border-radius: var(--r-md); color: var(--text); text-align: center;
    transition: all var(--t-fast);
  }
  .cal__obj-btn:hover {
    border-color: color-mix(in srgb, var(--cal-accent) 55%, transparent);
    background: color-mix(in srgb, var(--cal-accent) 6%, var(--bg));
  }
  .cal__obj-btn.is-active {
    border-color: var(--cal-accent);
    background: color-mix(in srgb, var(--cal-accent) 12%, var(--bg));
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--cal-accent) 18%, transparent);
  }
  .cal__obj-icon { font-size: 1.5rem; }
  .cal__obj-name { font-size: 0.9375rem; font-weight: 800; color: var(--text); }
  .cal__obj-desc { font-size: 0.6875rem; color: var(--text-muted); line-height: 1.4; }

  /* Result blocks */
  .cal__results { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--sp-3); }
  @media (max-width: 720px) { .cal__results { grid-template-columns: 1fr; } }
  .cal__result {
    display: flex; flex-direction: column; gap: 4px;
    padding: var(--sp-3);
    background: var(--bg); border: 1px solid var(--border); border-radius: var(--r-md);
    text-align: center;
  }
  .cal__result--main {
    background: color-mix(in srgb, var(--cal-accent) 12%, var(--bg));
    border-color: color-mix(in srgb, var(--cal-accent) 40%, transparent);
  }
  .cal__result-label { font-size: 0.6875rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.04em; font-weight: 700; }
  .cal__result-value {
    font-family: var(--font-mono); font-size: 1.5rem; font-weight: 800;
    color: var(--cal-accent); line-height: 1.1;
  }
  .cal__result-value small { font-size: 0.75rem; font-weight: 500; color: var(--text-muted); }
  .cal__result-note { font-size: 0.6875rem; color: var(--text-subtle); }

  /* Macros + donut */
  .cal__macros {
    display: grid; grid-template-columns: auto 1fr; gap: var(--sp-4); align-items: center;
    padding: var(--sp-3); background: var(--bg);
    border: 1px solid var(--border); border-radius: var(--r-md);
  }
  @media (max-width: 720px) { .cal__macros { grid-template-columns: 1fr; justify-items: center; } }
  .cal__donut { display: flex; align-items: center; justify-content: center; }
  .cal__macro-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--sp-2); width: 100%; }
  @media (max-width: 480px) { .cal__macro-cards { grid-template-columns: 1fr; } }
  .cal__macro-card {
    display: flex; flex-direction: column; gap: 2px;
    padding: var(--sp-2);
    border: 1px solid var(--border); border-radius: var(--r-md);
    background: var(--bg-card); text-align: center;
  }
  .cal__macro-card--p { border-left: 4px solid #dc2626; }
  .cal__macro-card--c { border-left: 4px solid #f59e0b; }
  .cal__macro-card--f { border-left: 4px solid #2563eb; }
  .cal__macro-label { font-size: 0.75rem; font-weight: 700; color: var(--text-muted); }
  .cal__macro-grams {
    font-family: var(--font-mono); font-size: 1.25rem; font-weight: 800; color: var(--text);
  }
  .cal__macro-grams small { font-size: 0.75rem; font-weight: 500; color: var(--text-muted); }
  .cal__macro-kcal { font-size: 0.6875rem; color: var(--text-subtle); }

  /* Comparativ */
  .cal__compare {
    display: flex; flex-direction: column; gap: var(--sp-2);
    padding: var(--sp-3); background: var(--bg);
    border: 1px solid var(--border); border-radius: var(--r-md);
  }
  .cal__compare-label { font-size: 0.75rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.04em; }
  .cal__compare-bars { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--sp-2); }
  @media (max-width: 640px) { .cal__compare-bars { grid-template-columns: 1fr; } }
  .cal__compare-bar {
    display: flex; flex-direction: column; gap: 4px;
    padding: var(--sp-2) var(--sp-3);
    background: var(--bg-card); border-radius: var(--r-sm); text-align: center;
  }
  .cal__compare-name { font-size: 0.8125rem; font-weight: 700; color: var(--text); }
  .cal__compare-val {
    font-family: var(--font-mono); font-size: 1rem; font-weight: 700; color: var(--cal-accent);
  }

  .cal__formula {
    text-align: center; font-size: 0.8125rem; color: var(--text-muted);
    padding: var(--sp-3); background: var(--bg); border-radius: var(--r-md);
    font-family: var(--font-mono); line-height: 1.6;
  }
  .cal__formula sub { font-size: 0.75em; }

  .cal__note {
    margin: 0;
    font-size: 0.75rem; color: var(--text-subtle);
    padding: var(--sp-2) var(--sp-3); background: var(--bg);
    border-left: 3px solid color-mix(in srgb, var(--cal-accent) 50%, transparent);
    border-radius: var(--r-sm); line-height: 1.5;
  }
</style>
