<script lang="ts">
  // ============================================================
  // HectareCalculator.svelte – hectare ↔ metri pătrați
  // Port: HektarM2Calculator.tsx. Presets: parcele agricole RO.
  // 1 ha = 10 000 m² = 100 ari
  // ============================================================
  let haRaw = $state("1");
  let m2Raw = $state("10000");

  function fmt(n: number, d = 4): string {
    if (Number.isInteger(n)) return n.toLocaleString("ro-RO");
    return parseFloat(n.toFixed(d)).toString().replace(".", ",");
  }
  function parse(v: string): number {
    return parseFloat(v.replace(/\s/g, "").replace(/\./g, "").replace(",", "."));
  }

  function setHa(value: string) {
    haRaw = value;
    const v = parse(value);
    m2Raw = Number.isFinite(v) ? fmt(v * 10000, 0) : "";
  }
  function setM2(value: string) {
    m2Raw = value;
    const v = parse(value);
    haRaw = Number.isFinite(v) ? fmt(v / 10000) : "";
  }

  type Preset = { label: string; ha: number };
  const PRESETS: Preset[] = [
    { label: "Lot mic (0,1 ha)",      ha: 0.1 },
    { label: "Lot familial (0,5 ha)", ha: 0.5 },
    { label: "Pogon (1 ha)",          ha: 1 },
    { label: "Fermă mică (5 ha)",     ha: 5 },
    { label: "Fermă medie (10 ha)",   ha: 10 },
    { label: "Fermă mare (50 ha)",    ha: 50 },
    { label: "Latifundiu (100 ha)",   ha: 100 },
  ];
</script>

<div class="ha">
  <div class="ha__inputs">
    <div class="ha__field">
      <label for="ha-ha" class="ha__label">Hectare (ha)</label>
      <div class="ha__input-wrap">
        <input
          id="ha-ha"
          type="text"
          inputmode="decimal"
          value={haRaw}
          oninput={(e) => setHa((e.target as HTMLInputElement).value)}
          placeholder="ex. 2,5"
          class="ha__input"
        />
        <span class="ha__suffix">ha</span>
      </div>
    </div>

    <div class="ha__equals" aria-hidden="true">=</div>

    <div class="ha__field">
      <label for="ha-m2" class="ha__label">Metri pătrați (m²)</label>
      <div class="ha__input-wrap">
        <input
          id="ha-m2"
          type="text"
          inputmode="decimal"
          value={m2Raw}
          oninput={(e) => setM2((e.target as HTMLInputElement).value)}
          placeholder="ex. 25000"
          class="ha__input"
        />
        <span class="ha__suffix">m²</span>
      </div>
    </div>
  </div>

  <p class="ha__hint">Modifică oricare valoare pentru conversie instantanee</p>

  <div class="ha__presets">
    <span class="ha__presets-label">Suprafețe agricole:</span>
    {#each PRESETS as p}
      <button
        type="button"
        class="ha__chip"
        onclick={() => setHa(p.ha.toString().replace(".", ","))}
        title={p.label}
      >
        {p.ha.toString().replace(".", ",")} ha
      </button>
    {/each}
  </div>

  <div class="ha__formula">
    <strong>Formulă:</strong> 1 ha = 10 000 m² = 100 ari | m² = ha × 10 000
  </div>
</div>

<style>
  .ha {
    display: flex; flex-direction: column; gap: var(--sp-4);
    padding: var(--sp-5); background: var(--bg-card);
    border: 1px solid var(--border); border-radius: var(--r-lg);
  }
  .ha__inputs {
    display: flex; align-items: end; gap: var(--sp-3);
    flex-wrap: wrap; justify-content: center;
  }
  @media (max-width: 640px) { .ha__inputs { flex-direction: column; align-items: stretch; } }
  .ha__field { display: flex; flex-direction: column; gap: var(--sp-2); flex: 1; min-width: 140px; }
  .ha__label { font-size: 0.8125rem; color: var(--text-muted); font-weight: 500; }
  .ha__input-wrap {
    position: relative;
    background: var(--bg); border: 1px solid var(--border);
    border-radius: var(--r-md); padding: var(--sp-3) var(--sp-5) var(--sp-3) var(--sp-3);
    transition: border-color var(--t-fast);
  }
  .ha__input-wrap:focus-within {
    border-color: var(--cat-conversii, #8b5cf6);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--cat-conversii, #8b5cf6) 18%, transparent);
  }
  .ha__input {
    width: 100%; border: none; background: transparent;
    color: var(--text); font-size: 1.5rem; font-weight: 700;
    font-family: var(--font-mono); text-align: center; outline: none;
  }
  .ha__suffix {
    position: absolute; right: var(--sp-3); top: 50%; transform: translateY(-50%);
    color: var(--text-subtle); font-weight: 600; font-size: 0.8125rem;
  }
  .ha__equals { font-size: 1.5rem; color: var(--text-muted); padding-bottom: var(--sp-3); }
  @media (max-width: 640px) { .ha__equals { display: none; } }
  .ha__hint { text-align: center; color: var(--text-subtle); font-size: 0.8125rem; margin: 0; }
  .ha__presets {
    display: flex; flex-wrap: wrap; gap: var(--sp-2);
    align-items: center; justify-content: center;
    padding-top: var(--sp-3); border-top: 1px solid var(--border);
  }
  .ha__presets-label {
    font-size: 0.8125rem; color: var(--text-muted); font-weight: 500; margin-right: var(--sp-1);
  }
  .ha__chip {
    padding: 4px 10px; font-size: 0.8125rem; font-weight: 600;
    background: color-mix(in srgb, var(--cat-conversii, #8b5cf6) 14%, transparent);
    color: var(--cat-conversii, #8b5cf6);
    border: 1px solid transparent; border-radius: var(--r-full);
    cursor: pointer; transition: all var(--t-fast);
    font-family: var(--font-mono);
  }
  .ha__chip:hover { background: var(--cat-conversii, #8b5cf6); color: #fff; }
  .ha__formula {
    text-align: center; font-size: 0.8125rem; color: var(--text-muted);
    padding: var(--sp-3); background: var(--bg); border-radius: var(--r-md);
  }
</style>
