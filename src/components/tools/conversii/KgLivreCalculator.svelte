<script lang="ts">
  // ============================================================
  // KgLivreCalculator.svelte – kg ↔ livre (pounds, lbs)
  // Port: KgFontCalculator.tsx. Presets: testsúly RO uzual.
  // 1 kg = 2,20462 lb (exact: 1 lb = 0,45359237 kg)
  // ============================================================
  const KG_TO_LB = 2.20462;

  let kgRaw = $state("70");
  let lbRaw = $state("154,32");

  function fmt(n: number): string {
    if (Number.isInteger(n)) return n.toString();
    return parseFloat(n.toFixed(2)).toString().replace(".", ",");
  }
  function parse(v: string): number {
    return parseFloat(v.replace(/\s/g, "").replace(",", "."));
  }

  function setKg(value: string) {
    kgRaw = value;
    const v = parse(value);
    lbRaw = Number.isFinite(v) ? fmt(v * KG_TO_LB) : "";
  }
  function setLb(value: string) {
    lbRaw = value;
    const v = parse(value);
    kgRaw = Number.isFinite(v) ? fmt(v / KG_TO_LB) : "";
  }

  const KG_PRESETS = [50, 60, 65, 70, 75, 80, 85, 90, 100];
</script>

<div class="kgl">
  <div class="kgl__inputs">
    <div class="kgl__field">
      <label for="kgl-kg" class="kgl__label">Kilograme (kg)</label>
      <div class="kgl__input-wrap">
        <input
          id="kgl-kg"
          type="text"
          inputmode="decimal"
          value={kgRaw}
          oninput={(e) => setKg((e.target as HTMLInputElement).value)}
          placeholder="ex. 70"
          class="kgl__input"
        />
        <span class="kgl__suffix">kg</span>
      </div>
    </div>

    <div class="kgl__equals" aria-hidden="true">=</div>

    <div class="kgl__field">
      <label for="kgl-lb" class="kgl__label">Livre / Pound (lb)</label>
      <div class="kgl__input-wrap">
        <input
          id="kgl-lb"
          type="text"
          inputmode="decimal"
          value={lbRaw}
          oninput={(e) => setLb((e.target as HTMLInputElement).value)}
          placeholder="ex. 154"
          class="kgl__input"
        />
        <span class="kgl__suffix">lb</span>
      </div>
    </div>
  </div>

  <p class="kgl__hint">Modifică oricare valoare pentru conversie instantanee</p>

  <div class="kgl__presets">
    <span class="kgl__presets-label">Greutate corporală:</span>
    {#each KG_PRESETS as p}
      <button
        type="button"
        class="kgl__chip"
        onclick={() => setKg(p.toString())}
      >
        {p} kg
      </button>
    {/each}
  </div>

  <div class="kgl__formula">
    <strong>Formulă:</strong> 1 kg = 2,20462 lb | 1 lb = 0,45359 kg
  </div>
</div>

<style>
  .kgl {
    display: flex; flex-direction: column; gap: var(--sp-4);
    padding: var(--sp-5); background: var(--bg-card);
    border: 1px solid var(--border); border-radius: var(--r-lg);
  }
  .kgl__inputs {
    display: flex; align-items: end; gap: var(--sp-3);
    flex-wrap: wrap; justify-content: center;
  }
  @media (max-width: 640px) { .kgl__inputs { flex-direction: column; align-items: stretch; } }
  .kgl__field { display: flex; flex-direction: column; gap: var(--sp-2); flex: 1; min-width: 140px; }
  .kgl__label { font-size: 0.8125rem; color: var(--text-muted); font-weight: 500; }
  .kgl__input-wrap {
    position: relative;
    background: var(--bg); border: 1px solid var(--border);
    border-radius: var(--r-md); padding: var(--sp-3) var(--sp-5) var(--sp-3) var(--sp-3);
    transition: border-color var(--t-fast);
  }
  .kgl__input-wrap:focus-within {
    border-color: var(--cat-conversii, #8b5cf6);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--cat-conversii, #8b5cf6) 18%, transparent);
  }
  .kgl__input {
    width: 100%; border: none; background: transparent;
    color: var(--text); font-size: 1.5rem; font-weight: 700;
    font-family: var(--font-mono); text-align: center; outline: none;
  }
  .kgl__suffix {
    position: absolute; right: var(--sp-3); top: 50%; transform: translateY(-50%);
    color: var(--text-subtle); font-weight: 600; font-size: 0.8125rem;
  }
  .kgl__equals { font-size: 1.5rem; color: var(--text-muted); padding-bottom: var(--sp-3); }
  @media (max-width: 640px) { .kgl__equals { display: none; } }
  .kgl__hint { text-align: center; color: var(--text-subtle); font-size: 0.8125rem; margin: 0; }
  .kgl__presets {
    display: flex; flex-wrap: wrap; gap: var(--sp-2);
    align-items: center; justify-content: center;
    padding-top: var(--sp-3); border-top: 1px solid var(--border);
  }
  .kgl__presets-label {
    font-size: 0.8125rem; color: var(--text-muted); font-weight: 500; margin-right: var(--sp-1);
  }
  .kgl__chip {
    padding: 4px 10px; font-size: 0.8125rem; font-weight: 600;
    background: color-mix(in srgb, var(--cat-conversii, #8b5cf6) 14%, transparent);
    color: var(--cat-conversii, #8b5cf6);
    border: 1px solid transparent; border-radius: var(--r-full);
    cursor: pointer; transition: all var(--t-fast);
    font-family: var(--font-mono);
  }
  .kgl__chip:hover { background: var(--cat-conversii, #8b5cf6); color: #fff; }
  .kgl__formula {
    text-align: center; font-size: 0.8125rem; color: var(--text-muted);
    padding: var(--sp-3); background: var(--bg); border-radius: var(--r-md);
  }
</style>
