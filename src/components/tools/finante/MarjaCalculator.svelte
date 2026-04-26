<script lang="ts">
  // ============================================================
  // MarjaCalculator.svelte – marjă vs adaos comercial
  // Port: math reference ArresHaszonkulcsKalkulator.tsx, RO-localizat.
  // 2 moduri:
  //   • "Cost + Adaos%" → Preț vânzare + Marjă% derivată
  //   • "Cost + Marjă%" → Preț vânzare + Adaos% derivat
  // adaos = (vânzare − cost) / cost × 100
  // marjă = (vânzare − cost) / vânzare × 100
  // ============================================================

  type Mode = "adaos" | "marja";
  const MODES: { key: Mode; icon: string; label: string; desc: string }[] = [
    { key: "adaos", icon: "📊", label: "Cost + Adaos%", desc: "Calcul preț pornind de la adaos comercial" },
    { key: "marja", icon: "💹", label: "Cost + Marjă%", desc: "Calcul preț pornind de la marja brută" },
  ];

  let mode: Mode = $state("adaos");
  let costRaw = $state("100");
  let pctRaw = $state("30");

  function parse(v: string): number {
    const cleaned = v.replace(/\s/g, "").replace(/\./g, "").replace(",", ".");
    const n = parseFloat(cleaned);
    return Number.isFinite(n) ? n : NaN;
  }
  function fmt(n: number, d = 2): string {
    if (!Number.isFinite(n)) return "–";
    return n.toLocaleString("ro-RO", { minimumFractionDigits: 0, maximumFractionDigits: d });
  }

  // Mode "adaos": vânzare = cost × (1 + adaos%), marjă = profit/vânzare × 100
  let resAdaos = $derived.by((): { vanzare: number; profit: number; marja: number } => {
    const c = parse(costRaw);
    const p = parse(pctRaw);
    if (!Number.isFinite(c) || !Number.isFinite(p)) return { vanzare: NaN, profit: NaN, marja: NaN };
    const vanzare = c * (1 + p / 100);
    const profit = vanzare - c;
    const marja = vanzare > 0 ? (profit / vanzare) * 100 : NaN;
    return { vanzare, profit, marja };
  });

  // Mode "marja": vânzare = cost / (1 − marjă%), adaos = profit/cost × 100
  let resMarja = $derived.by((): { vanzare: number; profit: number; adaos: number } => {
    const c = parse(costRaw);
    const m = parse(pctRaw);
    if (!Number.isFinite(c) || !Number.isFinite(m) || m >= 100) {
      return { vanzare: NaN, profit: NaN, adaos: NaN };
    }
    const vanzare = c / (1 - m / 100);
    const profit = vanzare - c;
    const adaos = c > 0 ? (profit / c) * 100 : NaN;
    return { vanzare, profit, adaos };
  });

  const PRESET_PCT = [10, 15, 20, 25, 30, 40, 50, 100];
</script>

<div class="mar">
  <div class="mar__header">
    <span class="mar__icon" aria-hidden="true">💹</span>
    <div>
      <h2 class="mar__title">Calculator Marjă & Adaos Comercial</h2>
      <p class="mar__sub">Convertor între adaos (markup) și marjă (margin) — esențial pentru e-commerce</p>
    </div>
  </div>

  <div class="mar__tabs" role="tablist">
    {#each MODES as m}
      <button
        type="button"
        class="mar__tab"
        class:is-active={mode === m.key}
        role="tab"
        aria-selected={mode === m.key}
        onclick={() => (mode = m.key)}
      >
        <span class="mar__tab-icon" aria-hidden="true">{m.icon}</span>
        <span class="mar__tab-text">
          <span class="mar__tab-label">{m.label}</span>
          <span class="mar__tab-desc">{m.desc}</span>
        </span>
      </button>
    {/each}
  </div>

  <!-- Inputs -->
  <div class="mar__inputs">
    <div class="mar__field">
      <label for="mar-cost" class="mar__label">Cost achiziție (lei)</label>
      <div class="mar__input-wrap">
        <input
          id="mar-cost"
          type="text"
          inputmode="decimal"
          value={costRaw}
          oninput={(e) => (costRaw = (e.target as HTMLInputElement).value)}
          class="mar__input"
        />
        <span class="mar__suffix">lei</span>
      </div>
    </div>
    <div class="mar__field">
      <label for="mar-pct" class="mar__label">{mode === "adaos" ? "Adaos comercial" : "Marjă brută"} (%)</label>
      <div class="mar__input-wrap">
        <input
          id="mar-pct"
          type="text"
          inputmode="decimal"
          value={pctRaw}
          oninput={(e) => (pctRaw = (e.target as HTMLInputElement).value)}
          class="mar__input"
        />
        <span class="mar__suffix">%</span>
      </div>
      <div class="mar__chips">
        {#each PRESET_PCT as p}
          <button type="button" class="mar__chip" onclick={() => (pctRaw = String(p))}>{p}%</button>
        {/each}
      </div>
    </div>
  </div>

  <!-- Mode adaos results -->
  {#if mode === "adaos"}
    <div class="mar__results">
      <div class="mar__result mar__result--big">
        <span class="mar__result-label">Preț vânzare</span>
        <span class="mar__result-value">{fmt(resAdaos.vanzare)} lei</span>
      </div>
      <div class="mar__result">
        <span class="mar__result-label">Profit brut</span>
        <span class="mar__result-value">{fmt(resAdaos.profit)} lei</span>
      </div>
      <div class="mar__result">
        <span class="mar__result-label">Marjă echivalentă</span>
        <span class="mar__result-value">{fmt(resAdaos.marja, 2)}%</span>
      </div>
    </div>
    <div class="mar__formula">
      <strong>Formulă:</strong> vânzare = cost × (1 + adaos/100) &nbsp;|&nbsp; marjă = profit / vânzare × 100
    </div>
  {/if}

  {#if mode === "marja"}
    <div class="mar__results">
      <div class="mar__result mar__result--big">
        <span class="mar__result-label">Preț vânzare</span>
        <span class="mar__result-value">{fmt(resMarja.vanzare)} lei</span>
      </div>
      <div class="mar__result">
        <span class="mar__result-label">Profit brut</span>
        <span class="mar__result-value">{fmt(resMarja.profit)} lei</span>
      </div>
      <div class="mar__result">
        <span class="mar__result-label">Adaos echivalent</span>
        <span class="mar__result-value">{fmt(resMarja.adaos, 2)}%</span>
      </div>
    </div>
    <div class="mar__formula">
      <strong>Formulă:</strong> vânzare = cost / (1 − marjă/100) &nbsp;|&nbsp; adaos = profit / cost × 100
    </div>
  {/if}

  <!-- Difference table -->
  <div class="mar__compare">
    <h3 class="mar__compare-title">Adaos vs Marjă — diferența</h3>
    <table class="mar__table">
      <thead>
        <tr><th>Aspect</th><th>Adaos (markup)</th><th>Marjă (margin)</th></tr>
      </thead>
      <tbody>
        <tr><td>Bază</td><td>cost</td><td>preț vânzare</td></tr>
        <tr><td>Formulă</td><td>profit / cost × 100</td><td>profit / vânzare × 100</td></tr>
        <tr><td>Pentru același profit</td><td>valoare mai mare</td><td>valoare mai mică</td></tr>
        <tr><td>Folosit în</td><td>retail, comerț stradal</td><td>contabilitate, raportare</td></tr>
      </tbody>
    </table>
  </div>

  <p class="mar__note">
    <strong>Atenție:</strong> Adaos 50% NU înseamnă marjă 50%. Un cost de 100 lei + adaos 50% = 150 lei vânzare =
    marjă 33,3% (50/150). Confuzia între cele două duce la erori în pricing.
  </p>
</div>

<style>
  .mar {
    display: flex; flex-direction: column; gap: var(--sp-4);
    padding: var(--sp-5); background: var(--bg-card);
    border: 1px solid var(--border); border-radius: var(--r-lg);
    --mar-accent: var(--cat-finante, #059669);
  }
  .mar__header {
    display: flex; gap: var(--sp-3); align-items: center;
    padding: var(--sp-3); background: var(--bg);
    border: 1px solid var(--border); border-radius: var(--r-md);
  }
  .mar__icon { font-size: 1.5rem; }
  .mar__title { margin: 0; font-size: 1rem; font-weight: 700; color: var(--text); }
  .mar__sub { margin: 2px 0 0 0; font-size: 0.8125rem; color: var(--text-muted); }

  .mar__tabs { display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-2); }
  @media (max-width: 640px) { .mar__tabs { grid-template-columns: 1fr; } }
  .mar__tab {
    display: flex; align-items: center; gap: var(--sp-2);
    padding: var(--sp-2) var(--sp-3); cursor: pointer; text-align: left;
    background: var(--bg); color: var(--text);
    border: 2px solid var(--border); border-radius: var(--r-md);
    transition: all var(--t-fast);
  }
  .mar__tab:hover { border-color: color-mix(in srgb, var(--mar-accent) 55%, transparent); }
  .mar__tab.is-active {
    border-color: var(--mar-accent);
    background: color-mix(in srgb, var(--mar-accent) 10%, var(--bg));
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--mar-accent) 18%, transparent);
  }
  .mar__tab-icon { font-size: 1.125rem; flex-shrink: 0; }
  .mar__tab-text { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
  .mar__tab-label { font-size: 0.875rem; font-weight: 700; color: var(--text); }
  .mar__tab-desc { font-size: 0.6875rem; color: var(--text-muted); line-height: 1.2; }

  .mar__inputs { display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-3); }
  @media (max-width: 640px) { .mar__inputs { grid-template-columns: 1fr; } }
  .mar__field { display: flex; flex-direction: column; gap: var(--sp-2); }
  .mar__label { font-size: 0.8125rem; color: var(--text-muted); font-weight: 500; }
  .mar__input-wrap {
    position: relative;
    background: var(--bg); border: 2px solid var(--border);
    border-radius: var(--r-md); padding: var(--sp-3) var(--sp-5) var(--sp-3) var(--sp-3);
    transition: border-color var(--t-fast);
  }
  .mar__input-wrap:focus-within {
    border-color: var(--mar-accent);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--mar-accent) 18%, transparent);
  }
  .mar__input {
    width: 100%; border: none; background: transparent;
    color: var(--text); font-size: 1.5rem; font-weight: 700;
    font-family: var(--font-mono); text-align: center; outline: none;
  }
  .mar__suffix {
    position: absolute; right: var(--sp-3); top: 50%; transform: translateY(-50%);
    color: var(--text-subtle); font-weight: 600; font-size: 0.8125rem;
  }
  .mar__chips { display: flex; flex-wrap: wrap; gap: 4px; }
  .mar__chip {
    padding: 3px 8px; font-size: 0.7rem; font-weight: 600;
    background: color-mix(in srgb, var(--mar-accent) 12%, transparent);
    color: var(--mar-accent);
    border: 1px solid transparent; border-radius: var(--r-full);
    cursor: pointer; transition: all var(--t-fast);
    font-family: var(--font-mono);
  }
  .mar__chip:hover { background: var(--mar-accent); color: #fff; }

  .mar__results { display: grid; grid-template-columns: 1.4fr 1fr 1fr; gap: var(--sp-3); }
  @media (max-width: 720px) { .mar__results { grid-template-columns: 1fr; } }
  .mar__result {
    display: flex; flex-direction: column; gap: 4px;
    padding: var(--sp-3);
    background: var(--bg); border: 1px solid var(--border);
    border-radius: var(--r-md);
  }
  .mar__result--big {
    background: color-mix(in srgb, var(--mar-accent) 12%, var(--bg));
    border-color: color-mix(in srgb, var(--mar-accent) 40%, transparent);
  }
  .mar__result-label { font-size: 0.75rem; color: var(--text-muted); font-weight: 600; }
  .mar__result-value {
    font-family: var(--font-mono); font-size: 1.25rem; font-weight: 800;
    color: var(--mar-accent);
  }
  .mar__result--big .mar__result-value { font-size: 1.5rem; }

  .mar__formula {
    text-align: center; font-size: 0.8125rem; color: var(--text-muted);
    padding: var(--sp-3); background: var(--bg); border-radius: var(--r-md);
    font-family: var(--font-mono);
  }

  .mar__compare {
    display: flex; flex-direction: column; gap: var(--sp-2);
    padding: var(--sp-3); background: var(--bg);
    border: 1px solid var(--border); border-radius: var(--r-md);
  }
  .mar__compare-title { margin: 0; font-size: 0.875rem; font-weight: 700; color: var(--text); }
  .mar__table { width: 100%; border-collapse: collapse; font-size: 0.8125rem; }
  .mar__table th {
    text-align: left; padding: 6px 8px;
    color: var(--text); font-weight: 700; font-size: 0.75rem;
    border-bottom: 2px solid var(--border);
  }
  .mar__table td {
    padding: 6px 8px; border-bottom: 1px solid var(--border);
    color: var(--text-muted);
  }
  .mar__table td:first-child { color: var(--text); font-weight: 600; }

  .mar__note {
    margin: 0;
    font-size: 0.75rem; color: var(--text-subtle);
    padding: var(--sp-2) var(--sp-3); background: var(--bg);
    border-left: 3px solid color-mix(in srgb, var(--mar-accent) 50%, transparent);
    border-radius: var(--r-sm);
  }
</style>
