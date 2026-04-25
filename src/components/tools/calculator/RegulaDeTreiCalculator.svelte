<script lang="ts">
  // ============================================================
  // RegulaDeTreiCalculator.svelte – Regula de trei simplă
  // RO-specifikus tool, nincs HU forrás. Direct vs invers proporție.
  // Funkciók: 3 input + auto x, swap, presets, formula highlight.
  // ============================================================

  type Tip = "directa" | "inversa";

  let tip: Tip = $state("directa");

  // Implicit: 3 mere costă 4,50 lei, cât costă 7?
  let aRaw = $state("3");
  let bRaw = $state("4.50");
  let cRaw = $state("7");

  function parse(v: string): number {
    const cleaned = v.replace(/\s/g, "").replace(",", ".");
    const n = parseFloat(cleaned);
    return Number.isFinite(n) ? n : NaN;
  }

  function fmt(n: number, decimals = 4): string {
    if (!Number.isFinite(n)) return "–";
    if (Number.isInteger(n)) return n.toString();
    return n.toFixed(decimals).replace(/\.?0+$/, "");
  }

  let x = $derived.by(() => {
    const a = parse(aRaw), b = parse(bRaw), c = parse(cRaw);
    if (!Number.isFinite(a) || !Number.isFinite(b) || !Number.isFinite(c)) return NaN;
    if (tip === "directa") {
      // A : B = C : x → x = (B · C) / A
      if (a === 0) return NaN;
      return (b * c) / a;
    }
    // Inversă: A · B = C · x → x = (A · B) / C
    if (c === 0) return NaN;
    return (a * b) / c;
  });

  type Preset = { label: string; tip: Tip; a: string; b: string; c: string };
  const PRESETS: Preset[] = [
    { label: "🛒 7 mere dacă 3 = 4,50 lei", tip: "directa", a: "3", b: "4.50", c: "7" },
    { label: "🍳 Rețetă: 6 porții din 4", tip: "directa", a: "4", b: "200", c: "6" },
    { label: "👷 5 muncitori, lucrare în 8h cu 3", tip: "inversa", a: "3", b: "8", c: "5" },
    { label: "🚗 90 km/h, drum în 4h cu 60", tip: "inversa", a: "60", b: "4", c: "90" },
  ];

  function applyPreset(p: Preset) {
    tip = p.tip;
    aRaw = p.a;
    bRaw = p.b;
    cRaw = p.c;
  }
</script>

<div class="rdt">
  <!-- Tip toggle -->
  <div class="rdt__tabs" role="tablist">
    <button class="rdt__tab" class:is-active={tip === "directa"}
            onclick={() => (tip = "directa")} role="tab" aria-selected={tip === "directa"}>
      <span class="rdt__tab-icon" aria-hidden="true">↗</span>
      <span class="rdt__tab-text">
        <span class="rdt__tab-label">Proporție directă</span>
        <span class="rdt__tab-desc">Cresc / scad împreună</span>
      </span>
    </button>
    <button class="rdt__tab" class:is-active={tip === "inversa"}
            onclick={() => (tip = "inversa")} role="tab" aria-selected={tip === "inversa"}>
      <span class="rdt__tab-icon" aria-hidden="true">⇅</span>
      <span class="rdt__tab-text">
        <span class="rdt__tab-label">Proporție inversă</span>
        <span class="rdt__tab-desc">Una crește, alta scade</span>
      </span>
    </button>
  </div>

  <!-- Visual table -->
  <div class="rdt__table">
    <div class="rdt__table-row">
      <div class="rdt__cell rdt__cell--a">
        <label for="rdt-a" class="rdt__cell-label">A</label>
        <input id="rdt-a" type="text" inputmode="decimal" class="rdt__input"
               value={aRaw}
               oninput={(e) => (aRaw = (e.target as HTMLInputElement).value)} />
      </div>
      <div class="rdt__sep">{tip === "directa" ? "→" : "·"}</div>
      <div class="rdt__cell rdt__cell--b">
        <label for="rdt-b" class="rdt__cell-label">B</label>
        <input id="rdt-b" type="text" inputmode="decimal" class="rdt__input"
               value={bRaw}
               oninput={(e) => (bRaw = (e.target as HTMLInputElement).value)} />
      </div>
    </div>
    <div class="rdt__table-row rdt__table-row--bottom">
      <div class="rdt__cell rdt__cell--c">
        <label for="rdt-c" class="rdt__cell-label">C</label>
        <input id="rdt-c" type="text" inputmode="decimal" class="rdt__input"
               value={cRaw}
               oninput={(e) => (cRaw = (e.target as HTMLInputElement).value)} />
      </div>
      <div class="rdt__sep">{tip === "directa" ? "→" : "·"}</div>
      <div class="rdt__cell rdt__cell--x">
        <span class="rdt__cell-label">x</span>
        <div class="rdt__output">{fmt(x)}</div>
      </div>
    </div>
  </div>

  <!-- Result -->
  {#if Number.isFinite(x)}
    <div class="rdt__result">
      <p class="rdt__result-label">Rezultat</p>
      <p class="rdt__result-value">x = {fmt(x)}</p>
    </div>
  {:else}
    <div class="rdt__error">
      ⚠ Verifică valorile: {tip === "directa" ? "A" : "C"} nu poate fi 0.
    </div>
  {/if}

  <!-- Formula -->
  <div class="rdt__formula">
    <span class="rdt__formula-label">Formulă:</span>
    {#if tip === "directa"}
      <span class="rdt__formula-eq">A : B = C : x &nbsp;⇒&nbsp; x = (B · C) / A</span>
    {:else}
      <span class="rdt__formula-eq">A · B = C · x &nbsp;⇒&nbsp; x = (A · B) / C</span>
    {/if}
  </div>

  <!-- Presets -->
  <div class="rdt__presets">
    <span class="rdt__presets-label">Exemple:</span>
    {#each PRESETS as p}
      <button class="rdt__chip" onclick={() => applyPreset(p)}>{p.label}</button>
    {/each}
  </div>
</div>

<style>
  .rdt {
    display: flex; flex-direction: column; gap: var(--sp-4);
    padding: var(--sp-5); background: var(--bg-card);
    border: 1px solid var(--border); border-radius: var(--r-lg);
    --rdt-accent: var(--cat-calculator, #4f46e5);
  }

  .rdt__tabs {
    display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-2);
  }
  .rdt__tab {
    display: flex; align-items: center; gap: var(--sp-3);
    padding: var(--sp-3); cursor: pointer;
    background: var(--bg); color: var(--text);
    border: 2px solid var(--border); border-radius: var(--r-md);
    text-align: left; transition: all var(--t-fast);
  }
  .rdt__tab:hover { border-color: color-mix(in srgb, var(--rdt-accent) 50%, transparent); }
  .rdt__tab.is-active {
    border-color: var(--rdt-accent);
    background: color-mix(in srgb, var(--rdt-accent) 10%, var(--bg));
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--rdt-accent) 18%, transparent);
  }
  .rdt__tab-icon {
    flex-shrink: 0; width: 32px; height: 32px;
    background: color-mix(in srgb, var(--rdt-accent) 15%, transparent);
    color: var(--rdt-accent);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-weight: 700;
  }
  .rdt__tab-text { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
  .rdt__tab-label { font-size: 0.875rem; font-weight: 700; color: var(--text); }
  .rdt__tab-desc { font-size: 0.6875rem; color: var(--text-muted); }

  .rdt__table {
    display: flex; flex-direction: column; gap: var(--sp-3);
    padding: var(--sp-4);
    background: var(--bg); border: 1px solid var(--border);
    border-radius: var(--r-md);
  }
  .rdt__table-row {
    display: grid; grid-template-columns: 1fr 32px 1fr;
    gap: var(--sp-3); align-items: end;
  }
  .rdt__table-row--bottom { padding-top: var(--sp-3); border-top: 1px dashed var(--border); }
  .rdt__cell { display: flex; flex-direction: column; gap: var(--sp-2); }
  .rdt__cell-label {
    font-size: 0.6875rem; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-subtle);
    text-align: center;
  }
  .rdt__sep {
    text-align: center; padding-bottom: var(--sp-3);
    color: var(--text-muted); font-family: var(--font-mono); font-size: 1.25rem; font-weight: 700;
  }

  .rdt__input {
    width: 100%; padding: var(--sp-3); outline: none;
    background: var(--bg-card); color: var(--text);
    border: 2px solid var(--border); border-radius: var(--r-md);
    font-family: var(--font-mono); font-size: 1.125rem; font-weight: 700;
    text-align: center; transition: all var(--t-fast);
  }
  .rdt__input:focus {
    border-color: var(--rdt-accent);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--rdt-accent) 22%, transparent);
  }
  .rdt__output {
    width: 100%; padding: var(--sp-3);
    background: color-mix(in srgb, var(--rdt-accent) 12%, transparent);
    color: var(--rdt-accent);
    border: 2px solid var(--rdt-accent); border-radius: var(--r-md);
    font-family: var(--font-mono); font-size: 1.125rem; font-weight: 700;
    text-align: center;
  }

  .rdt__result {
    text-align: center; padding: var(--sp-4);
    background: linear-gradient(135deg,
      color-mix(in srgb, var(--rdt-accent) 12%, var(--bg)) 0%,
      color-mix(in srgb, var(--rdt-accent) 4%, var(--bg)) 100%);
    border: 1px solid color-mix(in srgb, var(--rdt-accent) 30%, transparent);
    border-radius: var(--r-md);
  }
  .rdt__result-label {
    margin: 0 0 4px 0; font-size: 0.75rem; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-muted);
  }
  .rdt__result-value {
    margin: 0; font-family: var(--font-mono);
    font-size: 1.75rem; font-weight: 700; color: var(--rdt-accent);
  }

  .rdt__error {
    padding: var(--sp-3) var(--sp-4); text-align: center;
    background: color-mix(in srgb, #f59e0b 12%, transparent);
    color: #c2410c;
    border: 1px solid color-mix(in srgb, #f59e0b 30%, transparent);
    border-radius: var(--r-md); font-size: 0.875rem;
  }

  .rdt__formula {
    display: flex; gap: var(--sp-2); justify-content: center; flex-wrap: wrap;
    padding: var(--sp-3); background: var(--bg);
    border: 1px solid var(--border); border-radius: var(--r-md);
    font-size: 0.8125rem;
  }
  .rdt__formula-label {
    font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em;
    color: var(--text-subtle); font-size: 0.6875rem; align-self: center;
  }
  .rdt__formula-eq {
    font-family: var(--font-mono); color: var(--text); font-weight: 600;
  }

  .rdt__presets {
    display: flex; flex-wrap: wrap; gap: var(--sp-2);
    align-items: center; justify-content: center;
  }
  .rdt__presets-label {
    font-size: 0.75rem; color: var(--text-muted); font-weight: 600;
  }
  .rdt__chip {
    padding: 4px 10px; cursor: pointer;
    background: color-mix(in srgb, var(--rdt-accent) 12%, transparent);
    color: var(--rdt-accent);
    border: 1px solid transparent; border-radius: var(--r-full);
    font-size: 0.75rem; font-weight: 600;
    transition: all var(--t-fast);
  }
  .rdt__chip:hover { background: var(--rdt-accent); color: #fff; }
</style>
