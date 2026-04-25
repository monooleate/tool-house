<script lang="ts">
  // ============================================================
  // ProcentCalculator.svelte – 4-moduri calculator procente
  // Portolva a math reference PercentageCalculator.tsx-ből (RO).
  // Funkciók: 4 mod (procent din, cât %, creștere, diferență),
  // formula highlight, tab-uri active, vanilla CSS design tokens.
  // ============================================================

  type Mode = "procentDin" | "catLaSuta" | "crestere" | "diferenta";

  const MODES: { key: Mode; icon: string; label: string; desc: string }[] = [
    { key: "procentDin",  icon: "📊", label: "X% din Y",        desc: "Cât face un procent dintr-un număr" },
    { key: "catLaSuta",   icon: "🧮", label: "Cât % e X din Y", desc: "Ce procent reprezintă o parte" },
    { key: "crestere",    icon: "📈", label: "Creștere %",      desc: "Variație procentuală" },
    { key: "diferenta",   icon: "↔️", label: "Diferență %",     desc: "Diferență simetrică" },
  ];

  let mode: Mode = $state("procentDin");

  // ─── Mod 1: X% din Y ─────────────────────────────────────────
  let baseRaw = $state("250");
  let percentRaw = $state("20");

  // ─── Mod 2: Cât % e X din Y ──────────────────────────────────
  let partRaw = $state("30");
  let wholeRaw = $state("200");

  // ─── Mod 3: Creștere/scădere ─────────────────────────────────
  let oldRaw = $state("80");
  let newRaw = $state("100");

  // ─── Mod 4: Diferență simetrică ──────────────────────────────
  let n1Raw = $state("50");
  let n2Raw = $state("60");

  function parse(v: string): number {
    const cleaned = v.replace(/\s/g, "").replace(",", ".");
    const n = parseFloat(cleaned);
    return Number.isFinite(n) ? n : NaN;
  }

  function fmt(n: number): string {
    if (!Number.isFinite(n)) return "–";
    if (Number.isInteger(n)) return n.toString();
    return n.toFixed(2).replace(/\.?0+$/, "");
  }

  // ─── Derived results ─────────────────────────────────────────
  let resultProcentDin = $derived.by(() => {
    const b = parse(baseRaw), p = parse(percentRaw);
    if (!Number.isFinite(b) || !Number.isFinite(p)) return NaN;
    return (b * p) / 100;
  });

  let resultCatLaSuta = $derived.by(() => {
    const part = parse(partRaw), whole = parse(wholeRaw);
    if (!Number.isFinite(part) || !Number.isFinite(whole) || whole === 0) return NaN;
    return (part / whole) * 100;
  });

  let resultCrestere = $derived.by(() => {
    const o = parse(oldRaw), n = parse(newRaw);
    if (!Number.isFinite(o) || !Number.isFinite(n) || o === 0) return NaN;
    return ((n - o) / o) * 100;
  });

  let resultDiferenta = $derived.by(() => {
    const a = parse(n1Raw), b = parse(n2Raw);
    if (!Number.isFinite(a) || !Number.isFinite(b)) return NaN;
    const avg = (a + b) / 2;
    if (avg === 0) return NaN;
    return (Math.abs(a - b) / avg) * 100;
  });
</script>

<div class="proc">
  <!-- Mode tabs -->
  <div class="proc__tabs" role="tablist" aria-label="Mod de calcul">
    {#each MODES as m}
      <button
        type="button"
        class="proc__tab"
        class:is-active={mode === m.key}
        role="tab"
        aria-selected={mode === m.key}
        onclick={() => (mode = m.key)}
      >
        <span class="proc__tab-icon" aria-hidden="true">{m.icon}</span>
        <span class="proc__tab-text">
          <span class="proc__tab-label">{m.label}</span>
          <span class="proc__tab-desc">{m.desc}</span>
        </span>
      </button>
    {/each}
  </div>

  <!-- Mode 1: X% din Y -->
  {#if mode === "procentDin"}
    <div class="proc__panel">
      <h3 class="proc__title">Cât reprezintă un procent dintr-un număr?</h3>
      <div class="proc__inputs proc__inputs--two">
        <div class="proc__field">
          <label for="proc-base" class="proc__label">Număr (Y)</label>
          <input id="proc-base" type="text" inputmode="decimal" class="proc__input"
                 value={baseRaw}
                 oninput={(e) => (baseRaw = (e.target as HTMLInputElement).value)}
                 placeholder="250" />
        </div>
        <div class="proc__field">
          <label for="proc-pct" class="proc__label">Procent (%)</label>
          <input id="proc-pct" type="text" inputmode="decimal" class="proc__input"
                 value={percentRaw}
                 oninput={(e) => (percentRaw = (e.target as HTMLInputElement).value)}
                 placeholder="20" />
        </div>
      </div>
      <div class="proc__result">
        <div class="proc__result-value">{fmt(resultProcentDin)}</div>
        {#if Number.isFinite(resultProcentDin)}
          <p class="proc__result-text">{percentRaw}% din {baseRaw} = <strong>{fmt(resultProcentDin)}</strong></p>
        {/if}
      </div>
      <div class="proc__formula">
        <span class="proc__formula-label">Formulă:</span>
        <span class="proc__formula-eq">rezultat = Y × (X% / 100)</span>
      </div>
    </div>
  {/if}

  <!-- Mode 2: Cât % e X din Y -->
  {#if mode === "catLaSuta"}
    <div class="proc__panel">
      <h3 class="proc__title">Ce procent reprezintă un număr dintr-un altul?</h3>
      <div class="proc__inputs proc__inputs--two">
        <div class="proc__field">
          <label for="proc-part" class="proc__label">Parte (X)</label>
          <input id="proc-part" type="text" inputmode="decimal" class="proc__input"
                 value={partRaw}
                 oninput={(e) => (partRaw = (e.target as HTMLInputElement).value)}
                 placeholder="30" />
        </div>
        <div class="proc__field">
          <label for="proc-whole" class="proc__label">Total (Y)</label>
          <input id="proc-whole" type="text" inputmode="decimal" class="proc__input"
                 value={wholeRaw}
                 oninput={(e) => (wholeRaw = (e.target as HTMLInputElement).value)}
                 placeholder="200" />
        </div>
      </div>
      <div class="proc__result">
        <div class="proc__result-value">{fmt(resultCatLaSuta)}<span class="proc__result-unit">%</span></div>
        {#if Number.isFinite(resultCatLaSuta)}
          <p class="proc__result-text">{partRaw} este <strong>{fmt(resultCatLaSuta)}%</strong> din {wholeRaw}</p>
        {/if}
      </div>
      <div class="proc__formula">
        <span class="proc__formula-label">Formulă:</span>
        <span class="proc__formula-eq">procent = (X / Y) × 100</span>
      </div>
    </div>
  {/if}

  <!-- Mode 3: Creștere/scădere -->
  {#if mode === "crestere"}
    <div class="proc__panel">
      <h3 class="proc__title">Creșterea sau scăderea procentuală</h3>
      <div class="proc__inputs proc__inputs--two">
        <div class="proc__field">
          <label for="proc-old" class="proc__label">Valoare veche</label>
          <input id="proc-old" type="text" inputmode="decimal" class="proc__input"
                 value={oldRaw}
                 oninput={(e) => (oldRaw = (e.target as HTMLInputElement).value)}
                 placeholder="80" />
        </div>
        <div class="proc__field">
          <label for="proc-new" class="proc__label">Valoare nouă</label>
          <input id="proc-new" type="text" inputmode="decimal" class="proc__input"
                 value={newRaw}
                 oninput={(e) => (newRaw = (e.target as HTMLInputElement).value)}
                 placeholder="100" />
        </div>
      </div>
      <div class="proc__result" class:is-negative={resultCrestere < 0}>
        <div class="proc__result-value">
          {resultCrestere > 0 ? "+" : ""}{fmt(resultCrestere)}<span class="proc__result-unit">%</span>
        </div>
        {#if Number.isFinite(resultCrestere)}
          <p class="proc__result-text">
            {#if resultCrestere > 0}
              Creștere de <strong>{fmt(Math.abs(resultCrestere))}%</strong> de la {oldRaw} la {newRaw}.
            {:else if resultCrestere < 0}
              Scădere de <strong>{fmt(Math.abs(resultCrestere))}%</strong> de la {oldRaw} la {newRaw}.
            {:else}
              Fără variație.
            {/if}
          </p>
        {/if}
      </div>
      <div class="proc__formula">
        <span class="proc__formula-label">Formulă:</span>
        <span class="proc__formula-eq">variație = ((nouă − veche) / veche) × 100</span>
      </div>
    </div>
  {/if}

  <!-- Mode 4: Diferență simetrică -->
  {#if mode === "diferenta"}
    <div class="proc__panel">
      <h3 class="proc__title">Diferența procentuală simetrică</h3>
      <div class="proc__inputs proc__inputs--two">
        <div class="proc__field">
          <label for="proc-n1" class="proc__label">Valoare 1</label>
          <input id="proc-n1" type="text" inputmode="decimal" class="proc__input"
                 value={n1Raw}
                 oninput={(e) => (n1Raw = (e.target as HTMLInputElement).value)}
                 placeholder="50" />
        </div>
        <div class="proc__field">
          <label for="proc-n2" class="proc__label">Valoare 2</label>
          <input id="proc-n2" type="text" inputmode="decimal" class="proc__input"
                 value={n2Raw}
                 oninput={(e) => (n2Raw = (e.target as HTMLInputElement).value)}
                 placeholder="60" />
        </div>
      </div>
      <div class="proc__result">
        <div class="proc__result-value">{fmt(resultDiferenta)}<span class="proc__result-unit">%</span></div>
        {#if Number.isFinite(resultDiferenta)}
          <p class="proc__result-text">Diferența procentuală între {n1Raw} și {n2Raw} este <strong>{fmt(resultDiferenta)}%</strong>.</p>
        {/if}
      </div>
      <div class="proc__formula">
        <span class="proc__formula-label">Formulă:</span>
        <span class="proc__formula-eq">|a − b| / ((a + b) / 2) × 100</span>
      </div>
    </div>
  {/if}
</div>

<style>
  .proc {
    display: flex; flex-direction: column; gap: var(--sp-4);
    padding: var(--sp-5); background: var(--bg-card);
    border: 1px solid var(--border); border-radius: var(--r-lg);
    --proc-accent: var(--cat-calculator, #4f46e5);
  }

  .proc__tabs {
    display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--sp-2);
  }
  @media (max-width: 720px) { .proc__tabs { grid-template-columns: repeat(2, 1fr); } }

  .proc__tab {
    display: flex; align-items: center; gap: var(--sp-2);
    padding: var(--sp-2) var(--sp-3); cursor: pointer;
    background: var(--bg); color: var(--text);
    border: 2px solid var(--border); border-radius: var(--r-md);
    text-align: left; transition: all var(--t-fast);
  }
  .proc__tab:hover {
    border-color: color-mix(in srgb, var(--proc-accent) 55%, transparent);
    background: color-mix(in srgb, var(--proc-accent) 6%, var(--bg));
  }
  .proc__tab.is-active {
    border-color: var(--proc-accent);
    background: color-mix(in srgb, var(--proc-accent) 10%, var(--bg));
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--proc-accent) 18%, transparent);
  }
  .proc__tab-icon { font-size: 1.25rem; flex-shrink: 0; }
  .proc__tab-text { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
  .proc__tab-label { font-size: 0.875rem; font-weight: 700; color: var(--text); }
  .proc__tab-desc { font-size: 0.6875rem; color: var(--text-muted); line-height: 1.2; }

  .proc__panel {
    display: flex; flex-direction: column; gap: var(--sp-4);
  }
  .proc__title {
    margin: 0; font-size: 1.0625rem; font-weight: 700; color: var(--text);
    text-align: center;
  }

  .proc__inputs {
    display: grid; gap: var(--sp-3);
  }
  .proc__inputs--two { grid-template-columns: 1fr 1fr; }
  @media (max-width: 480px) { .proc__inputs--two { grid-template-columns: 1fr; } }

  .proc__field { display: flex; flex-direction: column; gap: var(--sp-2); }
  .proc__label {
    font-size: 0.8125rem; color: var(--text-muted); font-weight: 500;
  }
  .proc__input {
    width: 100%; padding: var(--sp-3); outline: none;
    background: var(--bg); color: var(--text);
    border: 2px solid var(--border); border-radius: var(--r-md);
    font-family: var(--font-mono); font-size: 1.125rem; font-weight: 700;
    text-align: center; transition: all var(--t-fast);
  }
  .proc__input:focus {
    border-color: var(--proc-accent);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--proc-accent) 22%, transparent);
  }

  .proc__result {
    text-align: center; padding: var(--sp-4);
    background: linear-gradient(135deg,
      color-mix(in srgb, var(--proc-accent) 10%, var(--bg)) 0%,
      color-mix(in srgb, var(--proc-accent) 4%, var(--bg)) 100%);
    border: 1px solid color-mix(in srgb, var(--proc-accent) 28%, transparent);
    border-radius: var(--r-md);
  }
  .proc__result.is-negative { --proc-accent: #dc2626; }
  .proc__result-value {
    font-family: var(--font-mono); font-size: 2rem; font-weight: 700;
    color: var(--proc-accent); line-height: 1.1;
  }
  .proc__result-unit { font-size: 1.25rem; margin-left: 2px; }
  .proc__result-text {
    margin: var(--sp-2) 0 0 0; font-size: 0.875rem; color: var(--text-muted);
  }

  .proc__formula {
    display: flex; gap: var(--sp-2); justify-content: center; flex-wrap: wrap;
    padding: var(--sp-3); background: var(--bg);
    border: 1px solid var(--border); border-radius: var(--r-md);
    font-size: 0.8125rem;
  }
  .proc__formula-label {
    font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em;
    color: var(--text-subtle); font-size: 0.6875rem;
    align-self: center;
  }
  .proc__formula-eq {
    font-family: var(--font-mono); color: var(--text); font-weight: 600;
  }
</style>
