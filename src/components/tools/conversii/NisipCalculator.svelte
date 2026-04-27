<script lang="ts">
  // ============================================================
  // NisipCalculator.svelte – nisip (homok) greutate ↔ volum
  // Port: BetonSulyTerfogatCalculator.tsx mintára. ρ = 1600 kg/m³ (nisip uscat).
  // Mode toggle (greutate→volum, volum→greutate) + presets construcții/agricultură.
  // ============================================================
  type Mode = "g2v" | "v2g";
  let mode: Mode = $state("g2v");
  const RHO = 1500; // kg/m³ (nisip de râu standard, valoarea HU/RO referință)

  let kgRaw = $state("1500");
  let m3Raw = $state("1");

  function fmt(n: number, d = 4): string {
    if (Number.isInteger(n)) return n.toLocaleString("ro-RO");
    return parseFloat(n.toFixed(d)).toString().replace(".", ",");
  }
  function parse(v: string): number {
    return parseFloat(v.replace(/\s/g, "").replace(/\./g, "").replace(",", "."));
  }

  function setKg(value: string) {
    kgRaw = value;
    const v = parse(value);
    m3Raw = Number.isFinite(v) ? fmt(v / RHO) : "";
  }
  function setM3(value: string) {
    m3Raw = value;
    const v = parse(value);
    kgRaw = Number.isFinite(v) ? fmt(v * RHO, 2) : "";
  }
  function selectMode(m: Mode) {
    mode = m;
  }

  type Preset = { label: string; kg?: number; m3?: number };
  const PRESETS_G2V: Preset[] = [
    { label: "1 sac (25 kg)", kg: 25 },
    { label: "Bidon (50 kg)", kg: 50 },
    { label: "Roabă (100 kg)", kg: 100 },
    { label: "1 m³ (1.500 kg)", kg: 1500 },
    { label: "Camion 5 t", kg: 5000 },
  ];
  const PRESETS_V2G: Preset[] = [
    { label: "0,1 m³", m3: 0.1 },
    { label: "0,5 m³", m3: 0.5 },
    { label: "1 m³", m3: 1 },
    { label: "3 m³ (basculantă)", m3: 3 },
    { label: "8 m³ (camion)", m3: 8 },
  ];

  let m3Liters = $derived.by((): string => {
    const v = parse(m3Raw);
    if (!Number.isFinite(v)) return "";
    return fmt(v * 1000, 2);
  });
  let kgTons = $derived.by((): string => {
    const v = parse(kgRaw);
    if (!Number.isFinite(v) || v < 1000) return "";
    return fmt(v / 1000, 3);
  });
</script>

<div class="ns">
  <div class="ns__header">
    <span class="ns__icon" aria-hidden="true">🏖️</span>
    <div>
      <h2 class="ns__title">Nisip: Greutate ↔ Volum</h2>
      <p class="ns__sub">Densitate medie ρ = {RHO} kg/m³ (nisip uscat)</p>
    </div>
  </div>

  <div class="ns__tabs" role="tablist">
    <button type="button" class="ns__tab" class:is-active={mode === "g2v"}
      role="tab" aria-selected={mode === "g2v"} onclick={() => selectMode("g2v")}>
      Greutate → Volum
    </button>
    <button type="button" class="ns__tab" class:is-active={mode === "v2g"}
      role="tab" aria-selected={mode === "v2g"} onclick={() => selectMode("v2g")}>
      Volum → Greutate
    </button>
  </div>

  {#if mode === "g2v"}
    <div class="ns__field">
      <label for="ns-kg" class="ns__label">Greutate nisip (kg)</label>
      <div class="ns__input-wrap">
        <input id="ns-kg" type="text" inputmode="decimal" value={kgRaw}
          oninput={(e) => setKg((e.target as HTMLInputElement).value)}
          placeholder="ex. 1000" class="ns__input" />
        <span class="ns__suffix">kg</span>
      </div>
    </div>
    <div class="ns__result">
      <span class="ns__result-label">Volum:</span>
      <span class="ns__result-value">{m3Raw || "—"} m³</span>
      {#if m3Liters}<span class="ns__result-extra">≈ {m3Liters} l</span>{/if}
    </div>

    <div class="ns__presets">
      <span class="ns__presets-label">Cantități uzuale:</span>
      {#each PRESETS_G2V as p}
        <button type="button" class="ns__chip" onclick={() => setKg(String(p.kg))} title={p.label}>{p.label}</button>
      {/each}
    </div>
  {:else}
    <div class="ns__field">
      <label for="ns-m3" class="ns__label">Volum nisip (m³)</label>
      <div class="ns__input-wrap">
        <input id="ns-m3" type="text" inputmode="decimal" value={m3Raw}
          oninput={(e) => setM3((e.target as HTMLInputElement).value)}
          placeholder="ex. 1" class="ns__input" />
        <span class="ns__suffix">m³</span>
      </div>
    </div>
    <div class="ns__result">
      <span class="ns__result-label">Greutate:</span>
      <span class="ns__result-value">{kgRaw || "—"} kg</span>
      {#if kgTons}<span class="ns__result-extra">≈ {kgTons} t</span>{/if}
    </div>

    <div class="ns__presets">
      <span class="ns__presets-label">Volume uzuale:</span>
      {#each PRESETS_V2G as p}
        <button type="button" class="ns__chip" onclick={() => setM3(String(p.m3).replace(".", ","))} title={p.label}>{p.label}</button>
      {/each}
    </div>
  {/if}

  <div class="ns__formula">
    <strong>Formulă:</strong> volum (m³) = greutate (kg) ÷ {RHO} | greutate (kg) = volum (m³) × {RHO}
  </div>
  <p class="ns__note">
    <strong>Notă:</strong> densitatea reală variază 1.500–1.800 kg/m³ în funcție de umiditate
    și granulometrie (nisip umed până la 1.900 kg/m³, nisip de cariera grosier ~1.700 kg/m³).
  </p>
</div>

<style>
  .ns {
    display: flex; flex-direction: column; gap: var(--sp-4);
    padding: var(--sp-5); background: var(--bg-card);
    border: 1px solid var(--border); border-radius: var(--r-lg);
  }
  .ns__header {
    display: flex; gap: var(--sp-3); align-items: center;
    padding: var(--sp-3); background: var(--bg);
    border: 1px solid var(--border); border-radius: var(--r-md);
  }
  .ns__icon { font-size: 1.5rem; }
  .ns__title { margin: 0; font-size: 1rem; font-weight: 700; color: var(--text); }
  .ns__sub { margin: 2px 0 0 0; font-size: 0.8125rem; color: var(--text-muted); font-family: var(--font-mono); }

  .ns__tabs {
    display: flex; gap: 4px; padding: 4px;
    background: var(--bg); border: 1px solid var(--border); border-radius: var(--r-md);
  }
  .ns__tab {
    flex: 1; padding: 8px 12px; font-size: 0.8125rem; font-weight: 600;
    background: transparent; color: var(--text-muted);
    border: none; border-radius: calc(var(--r-md) - 2px);
    cursor: pointer; transition: all var(--t-fast);
  }
  .ns__tab.is-active { background: var(--cat-conversii, #8b5cf6); color: #fff; }

  .ns__field { display: flex; flex-direction: column; gap: var(--sp-2); }
  .ns__label { font-size: 0.8125rem; color: var(--text-muted); font-weight: 500; }
  .ns__input-wrap {
    position: relative;
    background: var(--bg); border: 2px solid var(--border);
    border-radius: var(--r-md); padding: var(--sp-3) var(--sp-5) var(--sp-3) var(--sp-3);
    transition: border-color var(--t-fast);
  }
  .ns__input-wrap:focus-within {
    border-color: var(--cat-conversii, #8b5cf6);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--cat-conversii, #8b5cf6) 18%, transparent);
  }
  .ns__input {
    width: 100%; border: none; background: transparent;
    color: var(--text); font-size: 1.5rem; font-weight: 700;
    font-family: var(--font-mono); text-align: center; outline: none;
  }
  .ns__suffix {
    position: absolute; right: var(--sp-3); top: 50%; transform: translateY(-50%);
    color: var(--text-subtle); font-weight: 600; font-size: 0.8125rem;
  }

  .ns__result {
    display: flex; flex-wrap: wrap; gap: var(--sp-2);
    align-items: baseline; justify-content: center;
    padding: var(--sp-4);
    background: color-mix(in srgb, var(--cat-conversii, #8b5cf6) 8%, var(--bg));
    border: 1px solid color-mix(in srgb, var(--cat-conversii, #8b5cf6) 25%, transparent);
    border-radius: var(--r-md);
  }
  .ns__result-label { font-size: 0.8125rem; color: var(--text-muted); font-weight: 600; }
  .ns__result-value {
    font-family: var(--font-mono); font-size: 1.5rem; font-weight: 700;
    color: var(--cat-conversii, #8b5cf6);
  }
  .ns__result-extra { font-size: 0.8125rem; color: var(--text-muted); }

  .ns__presets {
    display: flex; flex-wrap: wrap; gap: var(--sp-2);
    align-items: center; justify-content: center;
    padding-top: var(--sp-3); border-top: 1px solid var(--border);
  }
  .ns__presets-label { font-size: 0.8125rem; color: var(--text-muted); font-weight: 500; }
  .ns__chip {
    padding: 4px 10px; font-size: 0.75rem; font-weight: 600;
    background: color-mix(in srgb, var(--cat-conversii, #8b5cf6) 14%, transparent);
    color: var(--cat-conversii, #8b5cf6);
    border: 1px solid transparent; border-radius: var(--r-full);
    cursor: pointer; transition: all var(--t-fast);
  }
  .ns__chip:hover { background: var(--cat-conversii, #8b5cf6); color: #fff; }

  .ns__formula {
    text-align: center; font-size: 0.8125rem; color: var(--text-muted);
    padding: var(--sp-3); background: var(--bg); border-radius: var(--r-md);
  }
  .ns__note {
    margin: 0;
    font-size: 0.75rem; color: var(--text-subtle);
    padding: var(--sp-2) var(--sp-3); background: var(--bg);
    border-left: 3px solid color-mix(in srgb, var(--cat-conversii, #8b5cf6) 50%, transparent);
    border-radius: var(--r-sm);
  }
</style>
