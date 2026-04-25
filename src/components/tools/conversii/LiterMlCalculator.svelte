<script lang="ts">
  // ============================================================
  // LiterMlCalculator.svelte – litri ↔ ml
  // ============================================================
  let literRaw = $state("1");
  let mlRaw = $state("1000");

  function fmt(n: number): string {
    if (Number.isInteger(n)) return n.toString();
    return parseFloat(n.toFixed(4)).toString();
  }

  function setLiter(value: string) {
    literRaw = value;
    const v = parseFloat(value.replace(",", "."));
    if (Number.isFinite(v)) mlRaw = fmt(v * 1000);
    else mlRaw = "";
  }
  function setMl(value: string) {
    mlRaw = value;
    const v = parseFloat(value.replace(/\s/g, "").replace(",", "."));
    if (Number.isFinite(v)) literRaw = fmt(v / 1000);
    else literRaw = "";
  }

  const L_PRESETS = [0.25, 0.5, 0.75, 1, 1.5, 2, 5];
</script>

<div class="lml">
  <div class="lml__inputs">
    <div class="lml__field">
      <label for="liter-input" class="lml__label">Litri (L)</label>
      <div class="lml__input-wrap">
        <input
          id="liter-input"
          type="text"
          inputmode="decimal"
          value={literRaw}
          oninput={(e) => setLiter((e.target as HTMLInputElement).value)}
          placeholder="ex. 1,5"
          class="lml__input"
        />
      </div>
    </div>

    <div class="lml__equals" aria-hidden="true">=</div>

    <div class="lml__field">
      <label for="ml-input" class="lml__label">Mililitri (ml)</label>
      <div class="lml__input-wrap">
        <input
          id="ml-input"
          type="text"
          inputmode="decimal"
          value={mlRaw}
          oninput={(e) => setMl((e.target as HTMLInputElement).value)}
          placeholder="ex. 1500"
          class="lml__input"
        />
      </div>
    </div>
  </div>

  <p class="lml__hint">Modifică oricare valoare pentru conversie instantanee</p>

  <div class="lml__presets">
    <span class="lml__presets-label">Rapid:</span>
    {#each L_PRESETS as p}
      <button type="button" class="lml__chip" onclick={() => setLiter(p.toString().replace(".", ","))}>
        {p.toString().replace(".", ",")} L
      </button>
    {/each}
  </div>

  <div class="lml__formula">
    <strong>Formulă:</strong> 1 L = 1 000 ml | ml = L × 1000
  </div>
</div>

<style>
  .lml {
    display: flex; flex-direction: column; gap: var(--sp-4);
    padding: var(--sp-5); background: var(--bg-card);
    border: 1px solid var(--border); border-radius: var(--r-lg);
  }
  .lml__inputs { display: flex; align-items: end; gap: var(--sp-3); flex-wrap: wrap; justify-content: center; }
  @media (max-width: 640px) { .lml__inputs { flex-direction: column; align-items: stretch; } }
  .lml__field { display: flex; flex-direction: column; gap: var(--sp-2); flex: 1; min-width: 140px; }
  .lml__label { font-size: 0.8125rem; color: var(--text-muted); font-weight: 500; }
  .lml__input-wrap {
    background: var(--bg); border: 1px solid var(--border);
    border-radius: var(--r-md); padding: var(--sp-3);
  }
  .lml__input-wrap:focus-within {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 18%, transparent);
  }
  .lml__input {
    width: 100%; border: none; background: transparent;
    color: var(--text); font-size: 1.5rem; font-weight: 700;
    font-family: var(--font-mono); text-align: center; outline: none;
  }
  .lml__equals { font-size: 1.5rem; color: var(--text-muted); padding-bottom: var(--sp-3); }
  @media (max-width: 640px) { .lml__equals { display: none; } }
  .lml__hint { text-align: center; color: var(--text-subtle); font-size: 0.8125rem; margin: 0; }
  .lml__presets {
    display: flex; flex-wrap: wrap; gap: var(--sp-2);
    align-items: center; justify-content: center;
    padding-top: var(--sp-3); border-top: 1px solid var(--border);
  }
  .lml__presets-label {
    font-size: 0.8125rem; color: var(--text-muted); font-weight: 500; margin-right: var(--sp-1);
  }
  .lml__chip {
    padding: 4px 10px; font-size: 0.8125rem; font-weight: 600;
    background: color-mix(in srgb, var(--cat-conversii, #8b5cf6) 14%, transparent);
    color: var(--cat-conversii, #8b5cf6);
    border: 1px solid transparent; border-radius: var(--r-full);
    cursor: pointer; transition: all var(--t-fast);
  }
  .lml__chip:hover { background: var(--cat-conversii, #8b5cf6); color: #fff; }
  .lml__formula {
    text-align: center; font-size: 0.8125rem; color: var(--text-muted);
    padding: var(--sp-3); background: var(--bg); border-radius: var(--r-md);
  }
</style>
