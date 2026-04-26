<script lang="ts">
  // ============================================================
  // ReducereCalculator.svelte – Calculator reducere RO
  // Port: math reference KedvezmenyKalkulator.tsx, RO-localizat.
  // 2 moduri:
  //   • forward  – preț original + % reducere → preț redus + economie
  //   • reverse  – preț redus + % reducere → preț original (Black Friday check)
  // ============================================================

  type Mode = "forward" | "reverse";
  const MODES: { key: Mode; icon: string; label: string; desc: string }[] = [
    { key: "forward", icon: "🏷️", label: "Preț original → Preț redus",  desc: "Câți lei plătești după reducere" },
    { key: "reverse", icon: "🔄", label: "Preț redus → Preț original",  desc: "Verifică reducerea reală Black Friday" },
  ];

  let mode: Mode = $state("forward");

  let originalRaw = $state("500");
  let pctRaw = $state("30");
  let reducedRaw = $state("350");

  function parse(v: string): number {
    const cleaned = v.replace(/\s/g, "").replace(/\./g, "").replace(",", ".");
    const n = parseFloat(cleaned);
    return Number.isFinite(n) ? n : NaN;
  }
  function fmt(n: number, d = 2): string {
    if (!Number.isFinite(n)) return "–";
    return n.toLocaleString("ro-RO", { minimumFractionDigits: 0, maximumFractionDigits: d });
  }

  // Forward
  let forward = $derived.by((): { redus: number; economie: number } => {
    const orig = parse(originalRaw);
    const pct = parse(pctRaw);
    if (!Number.isFinite(orig) || !Number.isFinite(pct)) return { redus: NaN, economie: NaN };
    const economie = orig * (pct / 100);
    return { redus: orig - economie, economie };
  });

  // Reverse: dacă cunosc prețul după reducere și %, aflu prețul original
  let reverse = $derived.by((): { original: number; economie: number } => {
    const red = parse(reducedRaw);
    const pct = parse(pctRaw);
    if (!Number.isFinite(red) || !Number.isFinite(pct) || pct >= 100) return { original: NaN, economie: NaN };
    const original = red / (1 - pct / 100);
    return { original, economie: original - red };
  });

  // Black Friday quick presets
  const BF_PRESETS = [10, 15, 20, 25, 30, 40, 50, 70];
</script>

<div class="red">
  <div class="red__header">
    <span class="red__icon" aria-hidden="true">🛒</span>
    <div>
      <h2 class="red__title">Calculator Reducere</h2>
      <p class="red__sub">Reduceri Black Friday, Crăciun, comerț — calcul rapid în ambele direcții</p>
    </div>
  </div>

  <div class="red__tabs" role="tablist">
    {#each MODES as m}
      <button
        type="button"
        class="red__tab"
        class:is-active={mode === m.key}
        role="tab"
        aria-selected={mode === m.key}
        onclick={() => (mode = m.key)}
      >
        <span class="red__tab-icon" aria-hidden="true">{m.icon}</span>
        <span class="red__tab-text">
          <span class="red__tab-label">{m.label}</span>
          <span class="red__tab-desc">{m.desc}</span>
        </span>
      </button>
    {/each}
  </div>

  <!-- Mode forward -->
  {#if mode === "forward"}
    <div class="red__panel">
      <div class="red__inputs">
        <div class="red__field">
          <label for="red-orig" class="red__label">Preț original (lei)</label>
          <div class="red__input-wrap">
            <input
              id="red-orig"
              type="text"
              inputmode="decimal"
              value={originalRaw}
              oninput={(e) => (originalRaw = (e.target as HTMLInputElement).value)}
              class="red__input"
            />
            <span class="red__suffix">lei</span>
          </div>
        </div>
        <div class="red__field">
          <label for="red-pct" class="red__label">Reducere (%)</label>
          <div class="red__input-wrap">
            <input
              id="red-pct"
              type="text"
              inputmode="decimal"
              value={pctRaw}
              oninput={(e) => (pctRaw = (e.target as HTMLInputElement).value)}
              class="red__input"
            />
            <span class="red__suffix">%</span>
          </div>
        </div>
      </div>

      <div class="red__results">
        <div class="red__result red__result--big">
          <span class="red__result-label">Preț redus</span>
          <span class="red__result-value">{fmt(forward.redus)} lei</span>
        </div>
        <div class="red__result">
          <span class="red__result-label">Economisești</span>
          <span class="red__result-value">{fmt(forward.economie)} lei</span>
        </div>
      </div>

      <div class="red__formula">
        <strong>Formulă:</strong> redus = original × (1 − %/100)
      </div>
    </div>
  {/if}

  <!-- Mode reverse -->
  {#if mode === "reverse"}
    <div class="red__panel">
      <div class="red__inputs">
        <div class="red__field">
          <label for="red-red" class="red__label">Preț redus (lei)</label>
          <div class="red__input-wrap">
            <input
              id="red-red"
              type="text"
              inputmode="decimal"
              value={reducedRaw}
              oninput={(e) => (reducedRaw = (e.target as HTMLInputElement).value)}
              class="red__input"
            />
            <span class="red__suffix">lei</span>
          </div>
        </div>
        <div class="red__field">
          <label for="red-pct2" class="red__label">Reducere afișată (%)</label>
          <div class="red__input-wrap">
            <input
              id="red-pct2"
              type="text"
              inputmode="decimal"
              value={pctRaw}
              oninput={(e) => (pctRaw = (e.target as HTMLInputElement).value)}
              class="red__input"
            />
            <span class="red__suffix">%</span>
          </div>
        </div>
      </div>

      <div class="red__results">
        <div class="red__result red__result--big">
          <span class="red__result-label">Preț original calculat</span>
          <span class="red__result-value">{fmt(reverse.original)} lei</span>
        </div>
        <div class="red__result">
          <span class="red__result-label">Diferență față de preț redus</span>
          <span class="red__result-value">{fmt(reverse.economie)} lei</span>
        </div>
      </div>

      <div class="red__formula">
        <strong>Formulă:</strong> original = redus / (1 − %/100)
      </div>
    </div>
  {/if}

  <!-- Black Friday quick chips -->
  <div class="red__bf">
    <span class="red__bf-label">Reduceri tipice Black Friday:</span>
    {#each BF_PRESETS as p}
      <button type="button" class="red__chip" onclick={() => (pctRaw = String(p))}>−{p}%</button>
    {/each}
  </div>

  <p class="red__note">
    <strong>Atenție Black Friday:</strong> conform legii RO 363/2007, prețul de referință
    pentru reduceri trebuie să fie cel mai mic preț din ultimele 30 de zile. Folosește
    modul "Preț redus → Preț original" pentru a verifica autenticitatea reducerii.
  </p>
</div>

<style>
  .red {
    display: flex; flex-direction: column; gap: var(--sp-4);
    padding: var(--sp-5); background: var(--bg-card);
    border: 1px solid var(--border); border-radius: var(--r-lg);
    --red-accent: var(--cat-finante, #059669);
  }
  .red__header {
    display: flex; gap: var(--sp-3); align-items: center;
    padding: var(--sp-3); background: var(--bg);
    border: 1px solid var(--border); border-radius: var(--r-md);
  }
  .red__icon { font-size: 1.5rem; }
  .red__title { margin: 0; font-size: 1rem; font-weight: 700; color: var(--text); }
  .red__sub { margin: 2px 0 0 0; font-size: 0.8125rem; color: var(--text-muted); }

  .red__tabs { display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-2); }
  @media (max-width: 640px) { .red__tabs { grid-template-columns: 1fr; } }
  .red__tab {
    display: flex; align-items: center; gap: var(--sp-2);
    padding: var(--sp-2) var(--sp-3); cursor: pointer; text-align: left;
    background: var(--bg); color: var(--text);
    border: 2px solid var(--border); border-radius: var(--r-md);
    transition: all var(--t-fast);
  }
  .red__tab:hover { border-color: color-mix(in srgb, var(--red-accent) 55%, transparent); }
  .red__tab.is-active {
    border-color: var(--red-accent);
    background: color-mix(in srgb, var(--red-accent) 10%, var(--bg));
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--red-accent) 18%, transparent);
  }
  .red__tab-icon { font-size: 1.125rem; flex-shrink: 0; }
  .red__tab-text { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
  .red__tab-label { font-size: 0.875rem; font-weight: 700; color: var(--text); }
  .red__tab-desc { font-size: 0.6875rem; color: var(--text-muted); line-height: 1.2; }

  .red__panel { display: flex; flex-direction: column; gap: var(--sp-4); }

  .red__inputs { display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-3); }
  @media (max-width: 640px) { .red__inputs { grid-template-columns: 1fr; } }

  .red__field { display: flex; flex-direction: column; gap: var(--sp-2); }
  .red__label { font-size: 0.8125rem; color: var(--text-muted); font-weight: 500; }
  .red__input-wrap {
    position: relative;
    background: var(--bg); border: 2px solid var(--border);
    border-radius: var(--r-md); padding: var(--sp-3) var(--sp-5) var(--sp-3) var(--sp-3);
    transition: border-color var(--t-fast);
  }
  .red__input-wrap:focus-within {
    border-color: var(--red-accent);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--red-accent) 18%, transparent);
  }
  .red__input {
    width: 100%; border: none; background: transparent;
    color: var(--text); font-size: 1.5rem; font-weight: 700;
    font-family: var(--font-mono); text-align: center; outline: none;
  }
  .red__suffix {
    position: absolute; right: var(--sp-3); top: 50%; transform: translateY(-50%);
    color: var(--text-subtle); font-weight: 600; font-size: 0.8125rem;
  }

  .red__results { display: grid; grid-template-columns: 1.4fr 1fr; gap: var(--sp-3); }
  @media (max-width: 640px) { .red__results { grid-template-columns: 1fr; } }
  .red__result {
    display: flex; flex-direction: column; gap: 4px;
    padding: var(--sp-3);
    background: var(--bg); border: 1px solid var(--border);
    border-radius: var(--r-md);
  }
  .red__result--big {
    background: color-mix(in srgb, var(--red-accent) 12%, var(--bg));
    border-color: color-mix(in srgb, var(--red-accent) 40%, transparent);
  }
  .red__result-label { font-size: 0.75rem; color: var(--text-muted); font-weight: 600; }
  .red__result-value {
    font-family: var(--font-mono); font-size: 1.25rem; font-weight: 800;
    color: var(--red-accent);
  }
  .red__result--big .red__result-value { font-size: 1.5rem; }

  .red__bf {
    display: flex; flex-wrap: wrap; gap: var(--sp-2);
    align-items: center; justify-content: flex-start;
    padding-top: var(--sp-3); border-top: 1px solid var(--border);
  }
  .red__bf-label { font-size: 0.8125rem; color: var(--text-muted); font-weight: 500; }
  .red__chip {
    padding: 4px 10px; font-size: 0.75rem; font-weight: 700;
    background: color-mix(in srgb, var(--red-accent) 14%, transparent);
    color: var(--red-accent);
    border: 1px solid transparent; border-radius: var(--r-full);
    cursor: pointer; transition: all var(--t-fast);
    font-family: var(--font-mono);
  }
  .red__chip:hover { background: var(--red-accent); color: #fff; }

  .red__formula {
    text-align: center; font-size: 0.8125rem; color: var(--text-muted);
    padding: var(--sp-3); background: var(--bg); border-radius: var(--r-md);
    font-family: var(--font-mono);
  }
  .red__note {
    margin: 0;
    font-size: 0.75rem; color: var(--text-subtle);
    padding: var(--sp-2) var(--sp-3); background: var(--bg);
    border-left: 3px solid color-mix(in srgb, var(--red-accent) 50%, transparent);
    border-radius: var(--r-sm);
  }
</style>
