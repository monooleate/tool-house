<script lang="ts">
  // ============================================================
  // TvaCalculator.svelte – Calculator TVA RO
  // Cotele TVA în România 2026 (înainte de reforma fiscală):
  //   • 19% – cotă standard (majoritatea bunurilor și serviciilor)
  //   •  9% – alimente, medicamente, cazare hoteluri, cărți
  //   •  5% – locuințe sociale, manuale școlare, lemne foc
  // 3 moduri: Net → Brut, Brut → Net, Extragere TVA dintr-o sumă
  // Notă: din 2026 se discută unificarea cotelor (vezi specificație ANAF).
  // ============================================================

  type Mode = "net2brut" | "brut2net" | "extract";
  type Cota = 19 | 9 | 5;

  const MODES: { key: Mode; icon: string; label: string; desc: string }[] = [
    { key: "net2brut", icon: "➕", label: "Net → Brut",   desc: "Adaugă TVA la prețul fără TVA" },
    { key: "brut2net", icon: "➖", label: "Brut → Net",   desc: "Scoate TVA din prețul cu TVA" },
    { key: "extract",  icon: "🔍", label: "Extrage TVA",  desc: "Calcul TVA dintr-o sumă brută" },
  ];

  const COTE: { value: Cota; label: string; desc: string }[] = [
    { value: 19, label: "19%", desc: "Cotă standard – majoritatea bunurilor" },
    { value: 9,  label: "9%",  desc: "Alimente, medicamente, hoteluri, cărți" },
    { value: 5,  label: "5%",  desc: "Locuințe sociale, manuale, lemne foc" },
  ];

  let mode: Mode = $state("net2brut");
  let cota: Cota = $state(19);

  let netRaw = $state("1000");
  let brutRaw = $state("1190");
  let extractRaw = $state("1190");

  function parse(v: string): number {
    const cleaned = v.replace(/\s/g, "").replace(/\./g, "").replace(",", ".");
    const n = parseFloat(cleaned);
    return Number.isFinite(n) ? n : NaN;
  }
  function fmt(n: number, d = 2): string {
    if (!Number.isFinite(n)) return "–";
    return n.toFixed(d).replace(".", ",").replace(/,?0+$/, (m) => (m === "," ? "" : m));
  }
  function fmtRon(n: number): string {
    if (!Number.isFinite(n)) return "–";
    return n.toLocaleString("ro-RO", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  // ─── Mode 1: Net → Brut ──────────────────────────────────────
  let net2brutResult = $derived.by((): { tva: number; brut: number } => {
    const net = parse(netRaw);
    if (!Number.isFinite(net)) return { tva: NaN, brut: NaN };
    const tva = net * (cota / 100);
    return { tva, brut: net + tva };
  });

  // ─── Mode 2: Brut → Net ──────────────────────────────────────
  let brut2netResult = $derived.by((): { net: number; tva: number } => {
    const brut = parse(brutRaw);
    if (!Number.isFinite(brut)) return { net: NaN, tva: NaN };
    const net = brut / (1 + cota / 100);
    return { net, tva: brut - net };
  });

  // ─── Mode 3: Extragere TVA ───────────────────────────────────
  let extractResult = $derived.by((): { net: number; tva: number; ratio: string } => {
    const brut = parse(extractRaw);
    if (!Number.isFinite(brut)) return { net: NaN, tva: NaN, ratio: "" };
    const net = brut / (1 + cota / 100);
    const tva = brut - net;
    const ratio = `${fmt((tva / brut) * 100, 2)}%`;
    return { net, tva, ratio };
  });

  function selectMode(m: Mode) { mode = m; }
  function selectCota(c: Cota) { cota = c; }

  const PRESETS_NET = [100, 500, 1000, 5000, 10000];
  const PRESETS_BRUT = [119, 595, 1190, 5950, 11900];
</script>

<div class="tva">
  <div class="tva__header">
    <span class="tva__icon" aria-hidden="true">🇷🇴</span>
    <div>
      <h2 class="tva__title">Calculator TVA România</h2>
      <p class="tva__sub">Cote oficiale: 19% standard · 9% alimente / hoteluri · 5% locuințe / manuale</p>
    </div>
  </div>

  <!-- Cota selector -->
  <div class="tva__section">
    <span class="tva__section-label">1. Alege cota TVA</span>
    <div class="tva__cote" role="radiogroup" aria-label="Cota TVA">
      {#each COTE as c}
        <button
          type="button"
          class="tva__cota"
          class:is-active={cota === c.value}
          role="radio"
          aria-checked={cota === c.value}
          onclick={() => selectCota(c.value)}
        >
          <span class="tva__cota-val">{c.label}</span>
          <span class="tva__cota-desc">{c.desc}</span>
        </button>
      {/each}
    </div>
  </div>

  <!-- Mode tabs -->
  <div class="tva__section">
    <span class="tva__section-label">2. Alege modul de calcul</span>
    <div class="tva__tabs" role="tablist">
      {#each MODES as m}
        <button
          type="button"
          class="tva__tab"
          class:is-active={mode === m.key}
          role="tab"
          aria-selected={mode === m.key}
          onclick={() => selectMode(m.key)}
        >
          <span class="tva__tab-icon" aria-hidden="true">{m.icon}</span>
          <span class="tva__tab-text">
            <span class="tva__tab-label">{m.label}</span>
            <span class="tva__tab-desc">{m.desc}</span>
          </span>
        </button>
      {/each}
    </div>
  </div>

  <!-- Mode 1: Net → Brut -->
  {#if mode === "net2brut"}
    <div class="tva__panel">
      <div class="tva__field">
        <label for="tva-net" class="tva__label">Preț net (fără TVA)</label>
        <div class="tva__input-wrap">
          <input
            id="tva-net"
            type="text"
            inputmode="decimal"
            value={netRaw}
            oninput={(e) => (netRaw = (e.target as HTMLInputElement).value)}
            placeholder="ex. 1000"
            class="tva__input"
          />
          <span class="tva__suffix">lei</span>
        </div>
      </div>

      <div class="tva__results">
        <div class="tva__result">
          <span class="tva__result-label">TVA ({cota}%):</span>
          <span class="tva__result-value">{fmtRon(net2brutResult.tva)} lei</span>
        </div>
        <div class="tva__result tva__result--total">
          <span class="tva__result-label">Total brut:</span>
          <span class="tva__result-value">{fmtRon(net2brutResult.brut)} lei</span>
        </div>
      </div>

      <div class="tva__presets">
        <span class="tva__presets-label">Sume frecvente:</span>
        {#each PRESETS_NET as p}
          <button type="button" class="tva__chip" onclick={() => (netRaw = String(p))}>
            {p.toLocaleString("ro-RO")} lei
          </button>
        {/each}
      </div>

      <div class="tva__formula">
        <strong>Formulă:</strong> brut = net × (1 + {cota}/100) = net × {(1 + cota / 100).toFixed(2).replace(".", ",")}
      </div>
    </div>
  {/if}

  <!-- Mode 2: Brut → Net -->
  {#if mode === "brut2net"}
    <div class="tva__panel">
      <div class="tva__field">
        <label for="tva-brut" class="tva__label">Preț brut (cu TVA)</label>
        <div class="tva__input-wrap">
          <input
            id="tva-brut"
            type="text"
            inputmode="decimal"
            value={brutRaw}
            oninput={(e) => (brutRaw = (e.target as HTMLInputElement).value)}
            placeholder="ex. 1190"
            class="tva__input"
          />
          <span class="tva__suffix">lei</span>
        </div>
      </div>

      <div class="tva__results">
        <div class="tva__result tva__result--total">
          <span class="tva__result-label">Net (fără TVA):</span>
          <span class="tva__result-value">{fmtRon(brut2netResult.net)} lei</span>
        </div>
        <div class="tva__result">
          <span class="tva__result-label">TVA conținut ({cota}%):</span>
          <span class="tva__result-value">{fmtRon(brut2netResult.tva)} lei</span>
        </div>
      </div>

      <div class="tva__presets">
        <span class="tva__presets-label">Sume frecvente:</span>
        {#each PRESETS_BRUT as p}
          <button type="button" class="tva__chip" onclick={() => (brutRaw = String(p))}>
            {p.toLocaleString("ro-RO")} lei
          </button>
        {/each}
      </div>

      <div class="tva__formula">
        <strong>Formulă:</strong> net = brut / (1 + {cota}/100) = brut / {(1 + cota / 100).toFixed(2).replace(".", ",")}
      </div>
    </div>
  {/if}

  <!-- Mode 3: Extract TVA -->
  {#if mode === "extract"}
    <div class="tva__panel">
      <div class="tva__field">
        <label for="tva-ext" class="tva__label">Sumă brută (cu TVA)</label>
        <div class="tva__input-wrap">
          <input
            id="tva-ext"
            type="text"
            inputmode="decimal"
            value={extractRaw}
            oninput={(e) => (extractRaw = (e.target as HTMLInputElement).value)}
            placeholder="ex. 1190"
            class="tva__input"
          />
          <span class="tva__suffix">lei</span>
        </div>
      </div>

      <div class="tva__results tva__results--three">
        <div class="tva__result">
          <span class="tva__result-label">Bază impozabilă:</span>
          <span class="tva__result-value">{fmtRon(extractResult.net)} lei</span>
        </div>
        <div class="tva__result tva__result--total">
          <span class="tva__result-label">TVA conținut:</span>
          <span class="tva__result-value">{fmtRon(extractResult.tva)} lei</span>
        </div>
        <div class="tva__result">
          <span class="tva__result-label">% din total:</span>
          <span class="tva__result-value">{extractResult.ratio}</span>
        </div>
      </div>

      <div class="tva__formula">
        <strong>Formulă:</strong> TVA = brut × ({cota} / (100 + {cota})) = brut × {(cota / (100 + cota)).toFixed(4).replace(".", ",")}
      </div>
    </div>
  {/if}

  <p class="tva__note">
    <strong>Notă:</strong> aceste cote sunt valabile conform Legii 227/2015 (Codul fiscal).
    Reforma fiscală în discuție pentru 2026 ar putea unifica cotele reduse — verificați
    ultima formă pe <em>anaf.ro</em> înainte de facturi importante.
  </p>
</div>

<style>
  .tva {
    display: flex; flex-direction: column; gap: var(--sp-4);
    padding: var(--sp-5); background: var(--bg-card);
    border: 1px solid var(--border); border-radius: var(--r-lg);
    --tva-accent: var(--cat-finante, #059669);
  }
  .tva__header {
    display: flex; gap: var(--sp-3); align-items: center;
    padding: var(--sp-3); background: var(--bg);
    border: 1px solid var(--border); border-radius: var(--r-md);
  }
  .tva__icon { font-size: 1.5rem; }
  .tva__title { margin: 0; font-size: 1rem; font-weight: 700; color: var(--text); }
  .tva__sub { margin: 2px 0 0 0; font-size: 0.8125rem; color: var(--text-muted); }

  .tva__section { display: flex; flex-direction: column; gap: var(--sp-2); }
  .tva__section-label {
    font-size: 0.75rem; font-weight: 700; color: var(--text-muted);
    text-transform: uppercase; letter-spacing: 0.04em;
  }

  .tva__cote {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--sp-2);
  }
  @media (max-width: 640px) { .tva__cote { grid-template-columns: 1fr; } }
  .tva__cota {
    display: flex; flex-direction: column; gap: 2px;
    padding: var(--sp-3); cursor: pointer; text-align: left;
    background: var(--bg); border: 2px solid var(--border);
    border-radius: var(--r-md); transition: all var(--t-fast);
  }
  .tva__cota:hover {
    border-color: color-mix(in srgb, var(--tva-accent) 55%, transparent);
    background: color-mix(in srgb, var(--tva-accent) 6%, var(--bg));
  }
  .tva__cota.is-active {
    border-color: var(--tva-accent);
    background: color-mix(in srgb, var(--tva-accent) 12%, var(--bg));
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--tva-accent) 18%, transparent);
  }
  .tva__cota-val { font-size: 1.125rem; font-weight: 800; color: var(--tva-accent); font-family: var(--font-mono); }
  .tva__cota-desc { font-size: 0.6875rem; color: var(--text-muted); line-height: 1.25; }

  .tva__tabs { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--sp-2); }
  @media (max-width: 720px) { .tva__tabs { grid-template-columns: 1fr; } }
  .tva__tab {
    display: flex; align-items: center; gap: var(--sp-2);
    padding: var(--sp-2) var(--sp-3); cursor: pointer; text-align: left;
    background: var(--bg); color: var(--text);
    border: 2px solid var(--border); border-radius: var(--r-md);
    transition: all var(--t-fast);
  }
  .tva__tab:hover {
    border-color: color-mix(in srgb, var(--tva-accent) 55%, transparent);
    background: color-mix(in srgb, var(--tva-accent) 6%, var(--bg));
  }
  .tva__tab.is-active {
    border-color: var(--tva-accent);
    background: color-mix(in srgb, var(--tva-accent) 10%, var(--bg));
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--tva-accent) 18%, transparent);
  }
  .tva__tab-icon { font-size: 1.125rem; flex-shrink: 0; }
  .tva__tab-text { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
  .tva__tab-label { font-size: 0.875rem; font-weight: 700; color: var(--text); }
  .tva__tab-desc { font-size: 0.6875rem; color: var(--text-muted); line-height: 1.2; }

  .tva__panel { display: flex; flex-direction: column; gap: var(--sp-4); }
  .tva__field { display: flex; flex-direction: column; gap: var(--sp-2); }
  .tva__label { font-size: 0.8125rem; color: var(--text-muted); font-weight: 500; }
  .tva__input-wrap {
    position: relative;
    background: var(--bg); border: 2px solid var(--border);
    border-radius: var(--r-md); padding: var(--sp-3) var(--sp-5) var(--sp-3) var(--sp-3);
    transition: border-color var(--t-fast);
  }
  .tva__input-wrap:focus-within {
    border-color: var(--tva-accent);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--tva-accent) 18%, transparent);
  }
  .tva__input {
    width: 100%; border: none; background: transparent;
    color: var(--text); font-size: 1.5rem; font-weight: 700;
    font-family: var(--font-mono); text-align: center; outline: none;
  }
  .tva__suffix {
    position: absolute; right: var(--sp-3); top: 50%; transform: translateY(-50%);
    color: var(--text-subtle); font-weight: 600; font-size: 0.8125rem;
  }

  .tva__results { display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-3); }
  .tva__results--three { grid-template-columns: 1fr 1fr 1fr; }
  @media (max-width: 640px) {
    .tva__results, .tva__results--three { grid-template-columns: 1fr; }
  }
  .tva__result {
    display: flex; flex-direction: column; gap: 4px;
    padding: var(--sp-3);
    background: var(--bg); border: 1px solid var(--border);
    border-radius: var(--r-md);
  }
  .tva__result--total {
    background: color-mix(in srgb, var(--tva-accent) 10%, var(--bg));
    border-color: color-mix(in srgb, var(--tva-accent) 35%, transparent);
  }
  .tva__result-label { font-size: 0.8125rem; color: var(--text-muted); font-weight: 600; }
  .tva__result-value {
    font-family: var(--font-mono); font-size: 1.25rem; font-weight: 700;
    color: var(--tva-accent);
  }

  .tva__presets {
    display: flex; flex-wrap: wrap; gap: var(--sp-2);
    align-items: center; justify-content: flex-start;
    padding-top: var(--sp-3); border-top: 1px solid var(--border);
  }
  .tva__presets-label { font-size: 0.8125rem; color: var(--text-muted); font-weight: 500; }
  .tva__chip {
    padding: 4px 10px; font-size: 0.75rem; font-weight: 600;
    background: color-mix(in srgb, var(--tva-accent) 14%, transparent);
    color: var(--tva-accent);
    border: 1px solid transparent; border-radius: var(--r-full);
    cursor: pointer; transition: all var(--t-fast);
    font-family: var(--font-mono);
  }
  .tva__chip:hover { background: var(--tva-accent); color: #fff; }

  .tva__formula {
    text-align: center; font-size: 0.8125rem; color: var(--text-muted);
    padding: var(--sp-3); background: var(--bg); border-radius: var(--r-md);
    font-family: var(--font-mono);
  }
  .tva__note {
    margin: 0;
    font-size: 0.75rem; color: var(--text-subtle);
    padding: var(--sp-2) var(--sp-3); background: var(--bg);
    border-left: 3px solid color-mix(in srgb, var(--tva-accent) 50%, transparent);
    border-radius: var(--r-sm);
  }
</style>
