<script lang="ts">
  // ============================================================
  // PietrisCalculator.svelte – pietriș (kavics) greutate ↔ volum
  // Port: BetonSulyTerfogatCalculator.tsx mintára. ρ = 1500 kg/m³ (pietriș uscat).
  // Mode toggle (greutate→volum, volum→greutate) + presets construcții.
  // ============================================================
  type Mode = "g2v" | "v2g";
  let mode: Mode = $state("g2v");
  const RHO = 1500; // kg/m³ (pietriș uscat 4-32 mm)

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
  function selectMode(m: Mode) { mode = m; }

  type Preset = { label: string; kg?: number; m3?: number };
  const PRESETS_G2V: Preset[] = [
    { label: "1 sac (25 kg)", kg: 25 },
    { label: "Roabă (75 kg)", kg: 75 },
    { label: "Big-bag (1000 kg)", kg: 1000 },
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

<div class="pt">
  <div class="pt__header">
    <span class="pt__icon" aria-hidden="true">🪨</span>
    <div>
      <h2 class="pt__title">Pietriș: Greutate ↔ Volum</h2>
      <p class="pt__sub">Densitate medie ρ = {RHO} kg/m³ (pietriș uscat 4-32 mm)</p>
    </div>
  </div>

  <div class="pt__tabs" role="tablist">
    <button type="button" class="pt__tab" class:is-active={mode === "g2v"}
      role="tab" aria-selected={mode === "g2v"} onclick={() => selectMode("g2v")}>
      Greutate → Volum
    </button>
    <button type="button" class="pt__tab" class:is-active={mode === "v2g"}
      role="tab" aria-selected={mode === "v2g"} onclick={() => selectMode("v2g")}>
      Volum → Greutate
    </button>
  </div>

  {#if mode === "g2v"}
    <div class="pt__field">
      <label for="pt-kg" class="pt__label">Greutate pietriș (kg)</label>
      <div class="pt__input-wrap">
        <input id="pt-kg" type="text" inputmode="decimal" value={kgRaw}
          oninput={(e) => setKg((e.target as HTMLInputElement).value)}
          placeholder="ex. 1500" class="pt__input" />
        <span class="pt__suffix">kg</span>
      </div>
    </div>
    <div class="pt__result">
      <span class="pt__result-label">Volum:</span>
      <span class="pt__result-value">{m3Raw || "—"} m³</span>
      {#if m3Liters}<span class="pt__result-extra">≈ {m3Liters} l</span>{/if}
    </div>

    <div class="pt__presets">
      <span class="pt__presets-label">Cantități uzuale:</span>
      {#each PRESETS_G2V as p}
        <button type="button" class="pt__chip" onclick={() => setKg(String(p.kg))} title={p.label}>{p.label}</button>
      {/each}
    </div>
  {:else}
    <div class="pt__field">
      <label for="pt-m3" class="pt__label">Volum pietriș (m³)</label>
      <div class="pt__input-wrap">
        <input id="pt-m3" type="text" inputmode="decimal" value={m3Raw}
          oninput={(e) => setM3((e.target as HTMLInputElement).value)}
          placeholder="ex. 1" class="pt__input" />
        <span class="pt__suffix">m³</span>
      </div>
    </div>
    <div class="pt__result">
      <span class="pt__result-label">Greutate:</span>
      <span class="pt__result-value">{kgRaw || "—"} kg</span>
      {#if kgTons}<span class="pt__result-extra">≈ {kgTons} t</span>{/if}
    </div>

    <div class="pt__presets">
      <span class="pt__presets-label">Volume uzuale:</span>
      {#each PRESETS_V2G as p}
        <button type="button" class="pt__chip" onclick={() => setM3(String(p.m3).replace(".", ","))} title={p.label}>{p.label}</button>
      {/each}
    </div>
  {/if}

  <div class="pt__formula">
    <strong>Formulă:</strong> volum (m³) = greutate (kg) ÷ {RHO} | greutate (kg) = volum (m³) × {RHO}
  </div>
  <p class="pt__note">
    <strong>Notă:</strong> densitatea variază 1.400–1.700 kg/m³ în funcție de granulometrie
    și umiditate (pietriș fin 4-8 mm ~1.500, pietriș concasat ~1.600, pietriș umed ~1.700 kg/m³).
  </p>
</div>

<style>
  .pt {
    display: flex; flex-direction: column; gap: var(--sp-4);
    padding: var(--sp-5); background: var(--bg-card);
    border: 1px solid var(--border); border-radius: var(--r-lg);
  }
  .pt__header {
    display: flex; gap: var(--sp-3); align-items: center;
    padding: var(--sp-3); background: var(--bg);
    border: 1px solid var(--border); border-radius: var(--r-md);
  }
  .pt__icon { font-size: 1.5rem; }
  .pt__title { margin: 0; font-size: 1rem; font-weight: 700; color: var(--text); }
  .pt__sub { margin: 2px 0 0 0; font-size: 0.8125rem; color: var(--text-muted); font-family: var(--font-mono); }

  .pt__tabs {
    display: flex; gap: 4px; padding: 4px;
    background: var(--bg); border: 1px solid var(--border); border-radius: var(--r-md);
  }
  .pt__tab {
    flex: 1; padding: 8px 12px; font-size: 0.8125rem; font-weight: 600;
    background: transparent; color: var(--text-muted);
    border: none; border-radius: calc(var(--r-md) - 2px);
    cursor: pointer; transition: all var(--t-fast);
  }
  .pt__tab.is-active { background: var(--cat-conversii, #8b5cf6); color: #fff; }

  .pt__field { display: flex; flex-direction: column; gap: var(--sp-2); }
  .pt__label { font-size: 0.8125rem; color: var(--text-muted); font-weight: 500; }
  .pt__input-wrap {
    position: relative;
    background: var(--bg); border: 2px solid var(--border);
    border-radius: var(--r-md); padding: var(--sp-3) var(--sp-5) var(--sp-3) var(--sp-3);
    transition: border-color var(--t-fast);
  }
  .pt__input-wrap:focus-within {
    border-color: var(--cat-conversii, #8b5cf6);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--cat-conversii, #8b5cf6) 18%, transparent);
  }
  .pt__input {
    width: 100%; border: none; background: transparent;
    color: var(--text); font-size: 1.5rem; font-weight: 700;
    font-family: var(--font-mono); text-align: center; outline: none;
  }
  .pt__suffix {
    position: absolute; right: var(--sp-3); top: 50%; transform: translateY(-50%);
    color: var(--text-subtle); font-weight: 600; font-size: 0.8125rem;
  }

  .pt__result {
    display: flex; flex-wrap: wrap; gap: var(--sp-2);
    align-items: baseline; justify-content: center;
    padding: var(--sp-4);
    background: color-mix(in srgb, var(--cat-conversii, #8b5cf6) 8%, var(--bg));
    border: 1px solid color-mix(in srgb, var(--cat-conversii, #8b5cf6) 25%, transparent);
    border-radius: var(--r-md);
  }
  .pt__result-label { font-size: 0.8125rem; color: var(--text-muted); font-weight: 600; }
  .pt__result-value {
    font-family: var(--font-mono); font-size: 1.5rem; font-weight: 700;
    color: var(--cat-conversii, #8b5cf6);
  }
  .pt__result-extra { font-size: 0.8125rem; color: var(--text-muted); }

  .pt__presets {
    display: flex; flex-wrap: wrap; gap: var(--sp-2);
    align-items: center; justify-content: center;
    padding-top: var(--sp-3); border-top: 1px solid var(--border);
  }
  .pt__presets-label { font-size: 0.8125rem; color: var(--text-muted); font-weight: 500; }
  .pt__chip {
    padding: 4px 10px; font-size: 0.75rem; font-weight: 600;
    background: color-mix(in srgb, var(--cat-conversii, #8b5cf6) 14%, transparent);
    color: var(--cat-conversii, #8b5cf6);
    border: 1px solid transparent; border-radius: var(--r-full);
    cursor: pointer; transition: all var(--t-fast);
  }
  .pt__chip:hover { background: var(--cat-conversii, #8b5cf6); color: #fff; }

  .pt__formula {
    text-align: center; font-size: 0.8125rem; color: var(--text-muted);
    padding: var(--sp-3); background: var(--bg); border-radius: var(--r-md);
  }
  .pt__note {
    margin: 0;
    font-size: 0.75rem; color: var(--text-subtle);
    padding: var(--sp-2) var(--sp-3); background: var(--bg);
    border-left: 3px solid color-mix(in srgb, var(--cat-conversii, #8b5cf6) 50%, transparent);
    border-radius: var(--r-sm);
  }
</style>
