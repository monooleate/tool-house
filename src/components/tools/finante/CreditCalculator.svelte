<script lang="ts">
  // ============================================================
  // CreditCalculator.svelte – Calculator credit anuitar RO
  // Port: math reference LoanCalculator_2.tsx, RO-localizat.
  // Formula anuitate: R = P × r / (1 - (1 + r)^-n)
  //   P = principal, r = dobândă lunară (anuală/12), n = nr. luni
  // RO bank-presets: BCR / BRD / Raiffeisen / ING (rate tipice 2026)
  // ROBOR/IRCC opțional ca tooltip; pentru calcul rapid folosim DAE.
  // ============================================================

  type BankKey = "custom" | "bcr" | "brd" | "raiffeisen" | "ing";

  const BANKS: { key: BankKey; name: string; rate: number; note: string }[] = [
    { key: "custom",     name: "Personalizat", rate: 7.5, note: "Setezi manual rata" },
    { key: "bcr",        name: "BCR",          rate: 7.9, note: "Credit ipotecar standard 2026" },
    { key: "brd",        name: "BRD",          rate: 8.1, note: "Credit ipotecar IRCC + 4,5%" },
    { key: "raiffeisen", name: "Raiffeisen",   rate: 7.7, note: "Credit imobiliar fixed 5 ani" },
    { key: "ing",        name: "ING",          rate: 7.5, note: "Credit ipotecar online" },
  ];

  let bank: BankKey = $state("custom");
  let principalRaw = $state("250000");
  let rateRaw = $state("7,5");
  let yearsRaw = $state("25");

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

  function selectBank(b: BankKey) {
    bank = b;
    if (b !== "custom") {
      const found = BANKS.find((x) => x.key === b);
      if (found) rateRaw = String(found.rate).replace(".", ",");
    }
  }

  let result = $derived.by((): {
    rata: number;
    totalPlatit: number;
    totalDobanda: number;
    luni: number;
  } => {
    const P = parse(principalRaw);
    const annual = parse(rateRaw);
    const years = parse(yearsRaw);
    if (!Number.isFinite(P) || !Number.isFinite(annual) || !Number.isFinite(years)) {
      return { rata: NaN, totalPlatit: NaN, totalDobanda: NaN, luni: NaN };
    }
    const n = Math.round(years * 12);
    const r = annual / 100 / 12;
    if (r === 0) {
      const rata = P / n;
      return { rata, totalPlatit: P, totalDobanda: 0, luni: n };
    }
    const rata = (P * r) / (1 - Math.pow(1 + r, -n));
    const totalPlatit = rata * n;
    return { rata, totalPlatit, totalDobanda: totalPlatit - P, luni: n };
  });

  const PRINCIPAL_PRESETS = [
    { val: 100000, label: "100.000 lei" },
    { val: 250000, label: "250.000 lei" },
    { val: 500000, label: "500.000 lei" },
    { val: 750000, label: "750.000 lei" },
  ];
  const YEARS_PRESETS = [10, 15, 20, 25, 30];
</script>

<div class="cred">
  <div class="cred__header">
    <span class="cred__icon" aria-hidden="true">🏦</span>
    <div>
      <h2 class="cred__title">Calculator Credit Anuitar</h2>
      <p class="cred__sub">Rata lunară fixă · formula anuitate · presets bănci RO 2026</p>
    </div>
  </div>

  <!-- Bank presets -->
  <div class="cred__section">
    <span class="cred__section-label">Bancă (preset rate dobândă)</span>
    <div class="cred__banks" role="radiogroup" aria-label="Bancă">
      {#each BANKS as b}
        <button
          type="button"
          class="cred__bank"
          class:is-active={bank === b.key}
          role="radio"
          aria-checked={bank === b.key}
          onclick={() => selectBank(b.key)}
          title={b.note}
        >
          <span class="cred__bank-name">{b.name}</span>
          <span class="cred__bank-rate">{String(b.rate).replace(".", ",")}%</span>
        </button>
      {/each}
    </div>
  </div>

  <!-- Inputs -->
  <div class="cred__inputs">
    <div class="cred__field">
      <label for="cred-principal" class="cred__label">Sumă împrumutată (lei)</label>
      <div class="cred__input-wrap">
        <input
          id="cred-principal"
          type="text"
          inputmode="decimal"
          value={principalRaw}
          oninput={(e) => (principalRaw = (e.target as HTMLInputElement).value)}
          placeholder="ex. 250000"
          class="cred__input"
        />
        <span class="cred__suffix">lei</span>
      </div>
      <div class="cred__chips">
        {#each PRINCIPAL_PRESETS as p}
          <button type="button" class="cred__chip" onclick={() => (principalRaw = String(p.val))}>{p.label}</button>
        {/each}
      </div>
    </div>

    <div class="cred__field">
      <label for="cred-rate" class="cred__label">Dobândă anuală (% DAE)</label>
      <div class="cred__input-wrap">
        <input
          id="cred-rate"
          type="text"
          inputmode="decimal"
          value={rateRaw}
          oninput={(e) => { rateRaw = (e.target as HTMLInputElement).value; bank = "custom"; }}
          placeholder="ex. 7,5"
          class="cred__input"
        />
        <span class="cred__suffix">%</span>
      </div>
    </div>

    <div class="cred__field">
      <label for="cred-years" class="cred__label">Durată (ani)</label>
      <div class="cred__input-wrap">
        <input
          id="cred-years"
          type="text"
          inputmode="decimal"
          value={yearsRaw}
          oninput={(e) => (yearsRaw = (e.target as HTMLInputElement).value)}
          placeholder="ex. 25"
          class="cred__input"
        />
        <span class="cred__suffix">ani</span>
      </div>
      <div class="cred__chips">
        {#each YEARS_PRESETS as y}
          <button type="button" class="cred__chip" onclick={() => (yearsRaw = String(y))}>{y} ani</button>
        {/each}
      </div>
    </div>
  </div>

  <!-- Results -->
  <div class="cred__results">
    <div class="cred__result cred__result--big">
      <span class="cred__result-label">Rata lunară</span>
      <span class="cred__result-value">{fmt(result.rata)} lei</span>
    </div>
    <div class="cred__result">
      <span class="cred__result-label">Total plătit ({Number.isFinite(result.luni) ? result.luni : "–"} luni)</span>
      <span class="cred__result-value">{fmtRon(result.totalPlatit)} lei</span>
    </div>
    <div class="cred__result">
      <span class="cred__result-label">Total dobândă</span>
      <span class="cred__result-value">{fmtRon(result.totalDobanda)} lei</span>
    </div>
  </div>

  <div class="cred__formula">
    <strong>Formulă anuitate:</strong> R = P × r / (1 − (1 + r)<sup>−n</sup>)
    &nbsp;|&nbsp; r = rata anuală / 12 · n = ani × 12
  </div>

  <p class="cred__note">
    <strong>Notă:</strong> calculul este orientativ. Costurile reale includ comisioane analiză,
    asigurare imobil, evaluare, notar — care pot adăuga 1–3% la suma totală. Pentru DAE
    reală solicită <em>scrisoare ofertă</em> de la bancă (obligatorie prin Legea 77/2016).
  </p>
</div>

<style>
  .cred {
    display: flex; flex-direction: column; gap: var(--sp-4);
    padding: var(--sp-5); background: var(--bg-card);
    border: 1px solid var(--border); border-radius: var(--r-lg);
    --cred-accent: var(--cat-finante, #059669);
  }
  .cred__header {
    display: flex; gap: var(--sp-3); align-items: center;
    padding: var(--sp-3); background: var(--bg);
    border: 1px solid var(--border); border-radius: var(--r-md);
  }
  .cred__icon { font-size: 1.5rem; }
  .cred__title { margin: 0; font-size: 1rem; font-weight: 700; color: var(--text); }
  .cred__sub { margin: 2px 0 0 0; font-size: 0.8125rem; color: var(--text-muted); }

  .cred__section { display: flex; flex-direction: column; gap: var(--sp-2); }
  .cred__section-label {
    font-size: 0.75rem; font-weight: 700; color: var(--text-muted);
    text-transform: uppercase; letter-spacing: 0.04em;
  }

  .cred__banks {
    display: grid; grid-template-columns: repeat(5, 1fr); gap: var(--sp-2);
  }
  @media (max-width: 720px) { .cred__banks { grid-template-columns: repeat(2, 1fr); } }
  .cred__bank {
    display: flex; flex-direction: column; gap: 4px;
    padding: var(--sp-3) var(--sp-2); cursor: pointer; text-align: center;
    background: var(--bg); border: 2px solid var(--border);
    border-radius: var(--r-md); transition: all var(--t-fast);
  }
  .cred__bank:hover {
    border-color: color-mix(in srgb, var(--cred-accent) 55%, transparent);
    background: color-mix(in srgb, var(--cred-accent) 6%, var(--bg));
  }
  .cred__bank.is-active {
    border-color: var(--cred-accent);
    background: color-mix(in srgb, var(--cred-accent) 12%, var(--bg));
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--cred-accent) 18%, transparent);
  }
  .cred__bank-name { font-size: 0.8125rem; font-weight: 700; color: var(--text); }
  .cred__bank-rate { font-size: 0.875rem; font-weight: 700; color: var(--cred-accent); font-family: var(--font-mono); }

  .cred__inputs {
    display: grid; grid-template-columns: 1fr 1fr 1fr; gap: var(--sp-3);
  }
  @media (max-width: 720px) { .cred__inputs { grid-template-columns: 1fr; } }

  .cred__field { display: flex; flex-direction: column; gap: var(--sp-2); }
  .cred__label { font-size: 0.8125rem; color: var(--text-muted); font-weight: 500; }
  .cred__input-wrap {
    position: relative;
    background: var(--bg); border: 2px solid var(--border);
    border-radius: var(--r-md); padding: var(--sp-3) var(--sp-5) var(--sp-3) var(--sp-3);
    transition: border-color var(--t-fast);
  }
  .cred__input-wrap:focus-within {
    border-color: var(--cred-accent);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--cred-accent) 18%, transparent);
  }
  .cred__input {
    width: 100%; border: none; background: transparent;
    color: var(--text); font-size: 1.25rem; font-weight: 700;
    font-family: var(--font-mono); text-align: center; outline: none;
  }
  .cred__suffix {
    position: absolute; right: var(--sp-3); top: 50%; transform: translateY(-50%);
    color: var(--text-subtle); font-weight: 600; font-size: 0.8125rem;
  }
  .cred__chips { display: flex; flex-wrap: wrap; gap: 4px; }
  .cred__chip {
    padding: 3px 8px; font-size: 0.7rem; font-weight: 600;
    background: color-mix(in srgb, var(--cred-accent) 12%, transparent);
    color: var(--cred-accent);
    border: 1px solid transparent; border-radius: var(--r-full);
    cursor: pointer; transition: all var(--t-fast);
    font-family: var(--font-mono);
  }
  .cred__chip:hover { background: var(--cred-accent); color: #fff; }

  .cred__results {
    display: grid; grid-template-columns: 1.4fr 1fr 1fr; gap: var(--sp-3);
  }
  @media (max-width: 720px) { .cred__results { grid-template-columns: 1fr; } }
  .cred__result {
    display: flex; flex-direction: column; gap: 4px;
    padding: var(--sp-3);
    background: var(--bg); border: 1px solid var(--border);
    border-radius: var(--r-md);
  }
  .cred__result--big {
    background: color-mix(in srgb, var(--cred-accent) 12%, var(--bg));
    border-color: color-mix(in srgb, var(--cred-accent) 40%, transparent);
  }
  .cred__result-label { font-size: 0.75rem; color: var(--text-muted); font-weight: 600; }
  .cred__result-value {
    font-family: var(--font-mono); font-size: 1.25rem; font-weight: 800;
    color: var(--cred-accent);
  }
  .cred__result--big .cred__result-value { font-size: 1.5rem; }

  .cred__formula {
    text-align: center; font-size: 0.8125rem; color: var(--text-muted);
    padding: var(--sp-3); background: var(--bg); border-radius: var(--r-md);
    font-family: var(--font-mono);
  }
  .cred__note {
    margin: 0;
    font-size: 0.75rem; color: var(--text-subtle);
    padding: var(--sp-2) var(--sp-3); background: var(--bg);
    border-left: 3px solid color-mix(in srgb, var(--cred-accent) 50%, transparent);
    border-radius: var(--r-sm);
  }
</style>
