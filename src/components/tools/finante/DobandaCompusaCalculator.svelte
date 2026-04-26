<script lang="ts">
  // ============================================================
  // DobandaCompusaCalculator.svelte – dobândă compusă (compound interest)
  // Port: math reference KamatosKamatKalkulator.tsx, RO-localizat.
  // Formula: A = P × (1 + r/n)^(n·t)
  //   P = principal, r = rata anuală, n = nr. compoundări/an, t = ani
  // RO depozit-presets: BCR / BRD / dobânzi tipice 2026.
  // ============================================================

  type Frecv = 1 | 2 | 4 | 12 | 365;
  const FRECV_OPTIONS: { val: Frecv; label: string; sub: string }[] = [
    { val: 1,   label: "Anual",       sub: "1×/an" },
    { val: 2,   label: "Semestrial",  sub: "2×/an" },
    { val: 4,   label: "Trimestrial", sub: "4×/an" },
    { val: 12,  label: "Lunar",       sub: "12×/an" },
    { val: 365, label: "Zilnic",      sub: "365×/an" },
  ];

  let principalRaw = $state("10000");
  let rateRaw = $state("6,5");
  let yearsRaw = $state("10");
  let frecv: Frecv = $state(12);
  let depRaw = $state("0");

  function parse(v: string): number {
    const cleaned = v.replace(/\s/g, "").replace(/\./g, "").replace(",", ".");
    const n = parseFloat(cleaned);
    return Number.isFinite(n) ? n : NaN;
  }
  function fmt(n: number, d = 2): string {
    if (!Number.isFinite(n)) return "–";
    return n.toLocaleString("ro-RO", { minimumFractionDigits: d, maximumFractionDigits: d });
  }
  function fmtRon(n: number): string {
    if (!Number.isFinite(n)) return "–";
    return n.toLocaleString("ro-RO", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  }

  // Suma finală cu/fără depuneri lunare
  let result = $derived.by((): {
    final: number; dobanda: number; investitTotal: number; randament: number;
  } => {
    const P = parse(principalRaw);
    const annual = parse(rateRaw);
    const t = parse(yearsRaw);
    const monthlyDep = parse(depRaw) || 0;
    if (!Number.isFinite(P) || !Number.isFinite(annual) || !Number.isFinite(t)) {
      return { final: NaN, dobanda: NaN, investitTotal: NaN, randament: NaN };
    }
    const r = annual / 100;
    const n = frecv;
    // Compound principal
    const principalFinal = P * Math.pow(1 + r / n, n * t);
    // Annuity (monthly deposits) compounded with same n (approximation: convert dep to per-period)
    let depositFinal = 0;
    if (monthlyDep > 0) {
      const months = Math.round(t * 12);
      // future value of annuity formula adapted: each monthly deposit grows for remaining time
      const monthlyRate = Math.pow(1 + r / n, n / 12) - 1;
      if (monthlyRate === 0) depositFinal = monthlyDep * months;
      else depositFinal = monthlyDep * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
    }
    const final = principalFinal + depositFinal;
    const investit = P + monthlyDep * Math.round(t * 12);
    const dobanda = final - investit;
    const randament = investit > 0 ? (dobanda / investit) * 100 : 0;
    return { final, dobanda, investitTotal: investit, randament };
  });

  // Pre-defined RO deposits / investment scenarios
  type Scenariu = { label: string; rate: number; freq: Frecv; note: string };
  const SCENARII: Scenariu[] = [
    { label: "Depozit BCR clasic",     rate: 5.5, freq: 12,  note: "Depozit la termen 12 luni" },
    { label: "Depozit Raiffeisen",     rate: 6.0, freq: 12,  note: "Promo 6 luni" },
    { label: "Titluri de stat Tezaur", rate: 7.5, freq: 1,   note: "Titluri pe 3 ani" },
    { label: "ETF S&P 500 (istoric)",  rate: 9.0, freq: 1,   note: "Randament mediu 30 ani" },
  ];

  function applyScenariu(s: Scenariu) {
    rateRaw = String(s.rate).replace(".", ",");
    frecv = s.freq;
  }
</script>

<div class="dob">
  <div class="dob__header">
    <span class="dob__icon" aria-hidden="true">📈</span>
    <div>
      <h2 class="dob__title">Calculator Dobândă Compusă</h2>
      <p class="dob__sub">A = P × (1 + r/n)<sup>n·t</sup> · cu sau fără depuneri lunare</p>
    </div>
  </div>

  <!-- Scenarii preset -->
  <div class="dob__section">
    <span class="dob__section-label">Scenarii uzuale RO 2026</span>
    <div class="dob__scenarii">
      {#each SCENARII as s}
        <button type="button" class="dob__scenariu" onclick={() => applyScenariu(s)} title={s.note}>
          <span class="dob__scenariu-name">{s.label}</span>
          <span class="dob__scenariu-rate">{String(s.rate).replace(".", ",")}%</span>
        </button>
      {/each}
    </div>
  </div>

  <!-- Inputs -->
  <div class="dob__inputs">
    <div class="dob__field">
      <label for="dob-principal" class="dob__label">Sumă inițială (lei)</label>
      <div class="dob__input-wrap">
        <input
          id="dob-principal"
          type="text"
          inputmode="decimal"
          value={principalRaw}
          oninput={(e) => (principalRaw = (e.target as HTMLInputElement).value)}
          class="dob__input"
        />
        <span class="dob__suffix">lei</span>
      </div>
    </div>

    <div class="dob__field">
      <label for="dob-rate" class="dob__label">Dobândă anuală (%)</label>
      <div class="dob__input-wrap">
        <input
          id="dob-rate"
          type="text"
          inputmode="decimal"
          value={rateRaw}
          oninput={(e) => (rateRaw = (e.target as HTMLInputElement).value)}
          class="dob__input"
        />
        <span class="dob__suffix">%</span>
      </div>
    </div>

    <div class="dob__field">
      <label for="dob-years" class="dob__label">Durată (ani)</label>
      <div class="dob__input-wrap">
        <input
          id="dob-years"
          type="text"
          inputmode="decimal"
          value={yearsRaw}
          oninput={(e) => (yearsRaw = (e.target as HTMLInputElement).value)}
          class="dob__input"
        />
        <span class="dob__suffix">ani</span>
      </div>
    </div>

    <div class="dob__field">
      <label for="dob-dep" class="dob__label">Depunere lunară (opțional)</label>
      <div class="dob__input-wrap">
        <input
          id="dob-dep"
          type="text"
          inputmode="decimal"
          value={depRaw}
          oninput={(e) => (depRaw = (e.target as HTMLInputElement).value)}
          placeholder="0"
          class="dob__input"
        />
        <span class="dob__suffix">lei/lună</span>
      </div>
    </div>
  </div>

  <!-- Frequency selector -->
  <div class="dob__section">
    <span class="dob__section-label">Frecvență capitalizare</span>
    <div class="dob__freq" role="radiogroup" aria-label="Frecvență capitalizare">
      {#each FRECV_OPTIONS as f}
        <button
          type="button"
          class="dob__freq-btn"
          class:is-active={frecv === f.val}
          role="radio"
          aria-checked={frecv === f.val}
          onclick={() => (frecv = f.val)}
        >
          <span class="dob__freq-label">{f.label}</span>
          <span class="dob__freq-sub">{f.sub}</span>
        </button>
      {/each}
    </div>
  </div>

  <!-- Results -->
  <div class="dob__results">
    <div class="dob__result dob__result--big">
      <span class="dob__result-label">Suma finală</span>
      <span class="dob__result-value">{fmt(result.final)} lei</span>
    </div>
    <div class="dob__result">
      <span class="dob__result-label">Total investit</span>
      <span class="dob__result-value">{fmtRon(result.investitTotal)} lei</span>
    </div>
    <div class="dob__result">
      <span class="dob__result-label">Dobândă câștigată</span>
      <span class="dob__result-value">{fmtRon(result.dobanda)} lei</span>
    </div>
    <div class="dob__result">
      <span class="dob__result-label">Randament total</span>
      <span class="dob__result-value">{fmt(result.randament, 1)}%</span>
    </div>
  </div>

  <div class="dob__formula">
    <strong>Formulă:</strong> A = P × (1 + r/n)<sup>n·t</sup> + depuneri lunare capitalizate &nbsp;|&nbsp;
    n = {frecv} compoundări/an
  </div>

  <p class="dob__note">
    <strong>Notă:</strong> calculul nu include impozitul pe dobândă (10% în RO din 2025) sau inflația.
    Pentru randament real net, scade rata inflației (~5% RO 2026) din rata nominală.
  </p>
</div>

<style>
  .dob {
    display: flex; flex-direction: column; gap: var(--sp-4);
    padding: var(--sp-5); background: var(--bg-card);
    border: 1px solid var(--border); border-radius: var(--r-lg);
    --dob-accent: var(--cat-finante, #059669);
  }
  .dob__header {
    display: flex; gap: var(--sp-3); align-items: center;
    padding: var(--sp-3); background: var(--bg);
    border: 1px solid var(--border); border-radius: var(--r-md);
  }
  .dob__icon { font-size: 1.5rem; }
  .dob__title { margin: 0; font-size: 1rem; font-weight: 700; color: var(--text); }
  .dob__sub { margin: 2px 0 0 0; font-size: 0.8125rem; color: var(--text-muted); font-family: var(--font-mono); }

  .dob__section { display: flex; flex-direction: column; gap: var(--sp-2); }
  .dob__section-label {
    font-size: 0.75rem; font-weight: 700; color: var(--text-muted);
    text-transform: uppercase; letter-spacing: 0.04em;
  }

  .dob__scenarii {
    display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--sp-2);
  }
  @media (max-width: 720px) { .dob__scenarii { grid-template-columns: repeat(2, 1fr); } }
  .dob__scenariu {
    display: flex; flex-direction: column; gap: 4px;
    padding: var(--sp-2) var(--sp-3); cursor: pointer; text-align: left;
    background: var(--bg); border: 1px solid var(--border);
    border-radius: var(--r-md); transition: all var(--t-fast);
  }
  .dob__scenariu:hover {
    border-color: var(--dob-accent);
    background: color-mix(in srgb, var(--dob-accent) 6%, var(--bg));
  }
  .dob__scenariu-name { font-size: 0.8125rem; font-weight: 700; color: var(--text); }
  .dob__scenariu-rate { font-size: 0.875rem; font-weight: 800; color: var(--dob-accent); font-family: var(--font-mono); }

  .dob__inputs {
    display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--sp-3);
  }
  @media (max-width: 720px) { .dob__inputs { grid-template-columns: 1fr 1fr; } }
  @media (max-width: 480px) { .dob__inputs { grid-template-columns: 1fr; } }

  .dob__field { display: flex; flex-direction: column; gap: var(--sp-2); }
  .dob__label { font-size: 0.8125rem; color: var(--text-muted); font-weight: 500; }
  .dob__input-wrap {
    position: relative;
    background: var(--bg); border: 2px solid var(--border);
    border-radius: var(--r-md); padding: var(--sp-3) var(--sp-6) var(--sp-3) var(--sp-3);
    transition: border-color var(--t-fast);
  }
  .dob__input-wrap:focus-within {
    border-color: var(--dob-accent);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--dob-accent) 18%, transparent);
  }
  .dob__input {
    width: 100%; border: none; background: transparent;
    color: var(--text); font-size: 1.125rem; font-weight: 700;
    font-family: var(--font-mono); text-align: center; outline: none;
  }
  .dob__suffix {
    position: absolute; right: var(--sp-3); top: 50%; transform: translateY(-50%);
    color: var(--text-subtle); font-weight: 600; font-size: 0.75rem;
  }

  .dob__freq {
    display: grid; grid-template-columns: repeat(5, 1fr); gap: var(--sp-2);
  }
  @media (max-width: 720px) { .dob__freq { grid-template-columns: repeat(3, 1fr); } }
  .dob__freq-btn {
    display: flex; flex-direction: column; gap: 2px;
    padding: var(--sp-2); cursor: pointer; text-align: center;
    background: var(--bg); border: 2px solid var(--border);
    border-radius: var(--r-md); transition: all var(--t-fast);
  }
  .dob__freq-btn:hover {
    border-color: color-mix(in srgb, var(--dob-accent) 55%, transparent);
  }
  .dob__freq-btn.is-active {
    border-color: var(--dob-accent);
    background: color-mix(in srgb, var(--dob-accent) 10%, var(--bg));
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--dob-accent) 18%, transparent);
  }
  .dob__freq-label { font-size: 0.8125rem; font-weight: 700; color: var(--text); }
  .dob__freq-sub { font-size: 0.6875rem; color: var(--text-muted); font-family: var(--font-mono); }

  .dob__results {
    display: grid; grid-template-columns: 1.4fr 1fr 1fr 1fr; gap: var(--sp-3);
  }
  @media (max-width: 720px) { .dob__results { grid-template-columns: 1fr 1fr; } }
  .dob__result {
    display: flex; flex-direction: column; gap: 4px;
    padding: var(--sp-3);
    background: var(--bg); border: 1px solid var(--border);
    border-radius: var(--r-md);
  }
  .dob__result--big {
    background: color-mix(in srgb, var(--dob-accent) 12%, var(--bg));
    border-color: color-mix(in srgb, var(--dob-accent) 40%, transparent);
  }
  .dob__result-label { font-size: 0.75rem; color: var(--text-muted); font-weight: 600; }
  .dob__result-value {
    font-family: var(--font-mono); font-size: 1.125rem; font-weight: 800;
    color: var(--dob-accent);
  }
  .dob__result--big .dob__result-value { font-size: 1.5rem; }

  .dob__formula {
    text-align: center; font-size: 0.8125rem; color: var(--text-muted);
    padding: var(--sp-3); background: var(--bg); border-radius: var(--r-md);
    font-family: var(--font-mono);
  }
  .dob__note {
    margin: 0;
    font-size: 0.75rem; color: var(--text-subtle);
    padding: var(--sp-2) var(--sp-3); background: var(--bg);
    border-left: 3px solid color-mix(in srgb, var(--dob-accent) 50%, transparent);
    border-radius: var(--r-sm);
  }
</style>
