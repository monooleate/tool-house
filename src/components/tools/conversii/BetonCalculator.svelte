<script lang="ts">
  // ============================================================
  // BetonCalculator.svelte – beton greutate ↔ volum
  // Port: BetonSulyTerfogatCalculator.tsx. ρ = 2400 kg/m³ (beton uzual).
  // Mode toggle (greutate→volum, volum→greutate) + presets construcții.
  // ============================================================
  type Mode = "g2v" | "v2g";
  let mode: Mode = $state("g2v");
  const RHO = 2400; // kg/m³

  let kgRaw = $state("1000");
  let m3Raw = $state("0,4167");

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
    { label: "Bidon (100 kg)", kg: 100 },
    { label: "1/2 m³ (1 200 kg)", kg: 1200 },
    { label: "1 m³ (2 400 kg)", kg: 2400 },
    { label: "Camion mic (5 000 kg)", kg: 5000 },
  ];
  const PRESETS_V2G: Preset[] = [
    { label: "0,1 m³", m3: 0.1 },
    { label: "0,5 m³", m3: 0.5 },
    { label: "1 m³", m3: 1 },
    { label: "2 m³", m3: 2 },
    { label: "5 m³ (camionetă)", m3: 5 },
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

<div class="bt">
  <div class="bt__header">
    <span class="bt__icon" aria-hidden="true">🧱</span>
    <div>
      <h2 class="bt__title">Beton: Greutate ↔ Volum</h2>
      <p class="bt__sub">Densitate medie ρ = {RHO} kg/m³</p>
    </div>
  </div>

  <div class="bt__tabs" role="tablist">
    <button
      type="button"
      class="bt__tab"
      class:is-active={mode === "g2v"}
      role="tab"
      aria-selected={mode === "g2v"}
      onclick={() => selectMode("g2v")}
    >
      Greutate → Volum
    </button>
    <button
      type="button"
      class="bt__tab"
      class:is-active={mode === "v2g"}
      role="tab"
      aria-selected={mode === "v2g"}
      onclick={() => selectMode("v2g")}
    >
      Volum → Greutate
    </button>
  </div>

  {#if mode === "g2v"}
    <div class="bt__field">
      <label for="bt-kg" class="bt__label">Greutate beton (kg)</label>
      <div class="bt__input-wrap">
        <input
          id="bt-kg"
          type="text"
          inputmode="decimal"
          value={kgRaw}
          oninput={(e) => setKg((e.target as HTMLInputElement).value)}
          placeholder="ex. 1000"
          class="bt__input"
        />
        <span class="bt__suffix">kg</span>
      </div>
    </div>
    <div class="bt__result">
      <span class="bt__result-label">Volum:</span>
      <span class="bt__result-value">{m3Raw || "—"} m³</span>
      {#if m3Liters}
        <span class="bt__result-extra">≈ {m3Liters} l</span>
      {/if}
    </div>

    <div class="bt__presets">
      <span class="bt__presets-label">Cantități uzuale:</span>
      {#each PRESETS_G2V as p}
        <button
          type="button"
          class="bt__chip"
          onclick={() => setKg(String(p.kg))}
          title={p.label}
        >
          {p.label}
        </button>
      {/each}
    </div>
  {:else}
    <div class="bt__field">
      <label for="bt-m3" class="bt__label">Volum beton (m³)</label>
      <div class="bt__input-wrap">
        <input
          id="bt-m3"
          type="text"
          inputmode="decimal"
          value={m3Raw}
          oninput={(e) => setM3((e.target as HTMLInputElement).value)}
          placeholder="ex. 1"
          class="bt__input"
        />
        <span class="bt__suffix">m³</span>
      </div>
    </div>
    <div class="bt__result">
      <span class="bt__result-label">Greutate:</span>
      <span class="bt__result-value">{kgRaw || "—"} kg</span>
      {#if kgTons}
        <span class="bt__result-extra">≈ {kgTons} t</span>
      {/if}
    </div>

    <div class="bt__presets">
      <span class="bt__presets-label">Volume uzuale:</span>
      {#each PRESETS_V2G as p}
        <button
          type="button"
          class="bt__chip"
          onclick={() => setM3(String(p.m3).replace(".", ","))}
          title={p.label}
        >
          {p.label}
        </button>
      {/each}
    </div>
  {/if}

  <div class="bt__formula">
    <strong>Formulă:</strong> volum (m³) = greutate (kg) ÷ {RHO} | greutate (kg) = volum (m³) × {RHO}
  </div>
  <p class="bt__note">
    <strong>Notă:</strong> densitatea reală variază 2 200–2 500 kg/m³ în funcție de tip
    (beton armat ≈ 2 500 kg/m³, beton ușor &lt; 2 000 kg/m³).
  </p>
</div>

<style>
  .bt {
    display: flex; flex-direction: column; gap: var(--sp-4);
    padding: var(--sp-5); background: var(--bg-card);
    border: 1px solid var(--border); border-radius: var(--r-lg);
  }
  .bt__header {
    display: flex; gap: var(--sp-3); align-items: center;
    padding: var(--sp-3); background: var(--bg);
    border: 1px solid var(--border); border-radius: var(--r-md);
  }
  .bt__icon { font-size: 1.5rem; }
  .bt__title { margin: 0; font-size: 1rem; font-weight: 700; color: var(--text); }
  .bt__sub { margin: 2px 0 0 0; font-size: 0.8125rem; color: var(--text-muted); font-family: var(--font-mono); }

  .bt__tabs {
    display: flex; gap: 4px; padding: 4px;
    background: var(--bg); border: 1px solid var(--border); border-radius: var(--r-md);
  }
  .bt__tab {
    flex: 1; padding: 8px 12px; font-size: 0.8125rem; font-weight: 600;
    background: transparent; color: var(--text-muted);
    border: none; border-radius: calc(var(--r-md) - 2px);
    cursor: pointer; transition: all var(--t-fast);
  }
  .bt__tab.is-active {
    background: var(--cat-conversii, #8b5cf6);
    color: #fff;
  }

  .bt__field { display: flex; flex-direction: column; gap: var(--sp-2); }
  .bt__label { font-size: 0.8125rem; color: var(--text-muted); font-weight: 500; }
  .bt__input-wrap {
    position: relative;
    background: var(--bg); border: 2px solid var(--border);
    border-radius: var(--r-md); padding: var(--sp-3) var(--sp-5) var(--sp-3) var(--sp-3);
    transition: border-color var(--t-fast);
  }
  .bt__input-wrap:focus-within {
    border-color: var(--cat-conversii, #8b5cf6);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--cat-conversii, #8b5cf6) 18%, transparent);
  }
  .bt__input {
    width: 100%; border: none; background: transparent;
    color: var(--text); font-size: 1.5rem; font-weight: 700;
    font-family: var(--font-mono); text-align: center; outline: none;
  }
  .bt__suffix {
    position: absolute; right: var(--sp-3); top: 50%; transform: translateY(-50%);
    color: var(--text-subtle); font-weight: 600; font-size: 0.8125rem;
  }

  .bt__result {
    display: flex; flex-wrap: wrap; gap: var(--sp-2);
    align-items: baseline; justify-content: center;
    padding: var(--sp-4);
    background: color-mix(in srgb, var(--cat-conversii, #8b5cf6) 8%, var(--bg));
    border: 1px solid color-mix(in srgb, var(--cat-conversii, #8b5cf6) 25%, transparent);
    border-radius: var(--r-md);
  }
  .bt__result-label { font-size: 0.8125rem; color: var(--text-muted); font-weight: 600; }
  .bt__result-value {
    font-family: var(--font-mono); font-size: 1.5rem; font-weight: 700;
    color: var(--cat-conversii, #8b5cf6);
  }
  .bt__result-extra { font-size: 0.8125rem; color: var(--text-muted); }

  .bt__presets {
    display: flex; flex-wrap: wrap; gap: var(--sp-2);
    align-items: center; justify-content: center;
    padding-top: var(--sp-3); border-top: 1px solid var(--border);
  }
  .bt__presets-label {
    font-size: 0.8125rem; color: var(--text-muted); font-weight: 500;
  }
  .bt__chip {
    padding: 4px 10px; font-size: 0.75rem; font-weight: 600;
    background: color-mix(in srgb, var(--cat-conversii, #8b5cf6) 14%, transparent);
    color: var(--cat-conversii, #8b5cf6);
    border: 1px solid transparent; border-radius: var(--r-full);
    cursor: pointer; transition: all var(--t-fast);
  }
  .bt__chip:hover { background: var(--cat-conversii, #8b5cf6); color: #fff; }

  .bt__formula {
    text-align: center; font-size: 0.8125rem; color: var(--text-muted);
    padding: var(--sp-3); background: var(--bg); border-radius: var(--r-md);
  }
  .bt__note {
    margin: 0;
    font-size: 0.75rem; color: var(--text-subtle);
    padding: var(--sp-2) var(--sp-3); background: var(--bg);
    border-left: 3px solid color-mix(in srgb, var(--cat-conversii, #8b5cf6) 50%, transparent);
    border-radius: var(--r-sm);
  }
</style>
