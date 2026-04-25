<script lang="ts">
  // ============================================================
  // KgGramCalculator.svelte – kg ↔ grame
  // Quick-chips: gyakori receptmennyiségek (gramm).
  // ============================================================
  let kgRaw = $state("1");
  let gramRaw = $state("1000");

  function fmt(n: number): string {
    if (Number.isInteger(n)) return n.toString();
    return parseFloat(n.toFixed(3)).toString();
  }

  function setKg(value: string) {
    kgRaw = value;
    const v = parseFloat(value.replace(",", "."));
    if (Number.isFinite(v)) gramRaw = fmt(v * 1000);
    else gramRaw = "";
  }
  function setGram(value: string) {
    gramRaw = value;
    const v = parseFloat(value.replace(",", "."));
    if (Number.isFinite(v)) kgRaw = fmt(v / 1000);
    else kgRaw = "";
  }

  const KG_PRESETS = [0.1, 0.25, 0.5, 1, 1.5, 2, 2.5, 5, 10];
</script>

<div class="kgg">
  <div class="kgg__inputs">
    <div class="kgg__field">
      <label for="kg-input" class="kgg__label">Kilograme (kg)</label>
      <div class="kgg__input-wrap">
        <input
          id="kg-input"
          type="text"
          inputmode="decimal"
          value={kgRaw}
          oninput={(e) => setKg((e.target as HTMLInputElement).value)}
          placeholder="ex. 2,5"
          class="kgg__input"
        />
      </div>
    </div>

    <div class="kgg__equals" aria-hidden="true">=</div>

    <div class="kgg__field">
      <label for="gram-input" class="kgg__label">Grame (g)</label>
      <div class="kgg__input-wrap">
        <input
          id="gram-input"
          type="text"
          inputmode="decimal"
          value={gramRaw}
          oninput={(e) => setGram((e.target as HTMLInputElement).value)}
          placeholder="ex. 2500"
          class="kgg__input"
        />
      </div>
    </div>
  </div>

  <p class="kgg__hint">Modifică oricare valoare pentru conversie instantanee</p>

  <div class="kgg__presets">
    <span class="kgg__presets-label">Rapid:</span>
    {#each KG_PRESETS as p}
      <button
        type="button"
        class="kgg__chip"
        onclick={() => setKg(p.toString().replace(".", ","))}
      >
        {p.toString().replace(".", ",")} kg
      </button>
    {/each}
  </div>

  <div class="kgg__formula">
    <strong>Formulă:</strong> 1 kg = 1 000 g | g = kg × 1000
  </div>
</div>

<style>
  .kgg {
    display: flex; flex-direction: column; gap: var(--sp-4);
    padding: var(--sp-5); background: var(--bg-card);
    border: 1px solid var(--border); border-radius: var(--r-lg);
  }
  .kgg__inputs {
    display: flex; align-items: end; gap: var(--sp-3);
    flex-wrap: wrap; justify-content: center;
  }
  @media (max-width: 640px) { .kgg__inputs { flex-direction: column; align-items: stretch; } }
  .kgg__field { display: flex; flex-direction: column; gap: var(--sp-2); flex: 1; min-width: 140px; }
  .kgg__label { font-size: 0.8125rem; color: var(--text-muted); font-weight: 500; }
  .kgg__input-wrap {
    background: var(--bg); border: 1px solid var(--border);
    border-radius: var(--r-md); padding: var(--sp-3);
  }
  .kgg__input-wrap:focus-within {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 18%, transparent);
  }
  .kgg__input {
    width: 100%; border: none; background: transparent;
    color: var(--text); font-size: 1.5rem; font-weight: 700;
    font-family: var(--font-mono); text-align: center; outline: none;
  }
  .kgg__equals {
    font-size: 1.5rem; color: var(--text-muted); padding-bottom: var(--sp-3);
  }
  @media (max-width: 640px) { .kgg__equals { display: none; } }
  .kgg__hint { text-align: center; color: var(--text-subtle); font-size: 0.8125rem; margin: 0; }
  .kgg__presets {
    display: flex; flex-wrap: wrap; gap: var(--sp-2);
    align-items: center; justify-content: center;
    padding-top: var(--sp-3); border-top: 1px solid var(--border);
  }
  .kgg__presets-label {
    font-size: 0.8125rem; color: var(--text-muted); font-weight: 500; margin-right: var(--sp-1);
  }
  .kgg__chip {
    padding: 4px 10px; font-size: 0.8125rem; font-weight: 600;
    background: color-mix(in srgb, var(--cat-conversii, #8b5cf6) 14%, transparent);
    color: var(--cat-conversii, #8b5cf6);
    border: 1px solid transparent; border-radius: var(--r-full);
    cursor: pointer; transition: all var(--t-fast);
  }
  .kgg__chip:hover { background: var(--cat-conversii, #8b5cf6); color: #fff; }
  .kgg__formula {
    text-align: center; font-size: 0.8125rem; color: var(--text-muted);
    padding: var(--sp-3); background: var(--bg); border-radius: var(--r-md);
  }
</style>
