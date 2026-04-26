<script lang="ts">
  // ============================================================
  // LitriDlCalculator.svelte – litri ↔ decilitri
  // Port: LiterDlCalculator.tsx. Presets: rețete RO uzuale.
  // 1 l = 10 dl
  // ============================================================
  let lRaw = $state("0,5");
  let dlRaw = $state("5");

  function fmt(n: number, d = 4): string {
    if (Number.isInteger(n)) return n.toString();
    return parseFloat(n.toFixed(d)).toString().replace(".", ",");
  }
  function parse(v: string): number {
    return parseFloat(v.replace(/\s/g, "").replace(",", "."));
  }

  function setL(value: string) {
    lRaw = value;
    const v = parse(value);
    dlRaw = Number.isFinite(v) ? fmt(v * 10) : "";
  }
  function setDl(value: string) {
    dlRaw = value;
    const v = parse(value);
    lRaw = Number.isFinite(v) ? fmt(v / 10) : "";
  }

  type Preset = { label: string; l: number };
  const PRESETS: Preset[] = [
    { label: "Pahar mic (1 dl)",       l: 0.1 },
    { label: "Smântână (2 dl)",        l: 0.2 },
    { label: "Pahar lapte (2,5 dl)",   l: 0.25 },
    { label: "Bere (5 dl)",            l: 0.5 },
    { label: "Sticlă vin (7,5 dl)",    l: 0.75 },
    { label: "Litru (10 dl)",          l: 1 },
    { label: "Sticlă mare (1,5 l)",    l: 1.5 },
  ];
</script>

<div class="ldl">
  <div class="ldl__inputs">
    <div class="ldl__field">
      <label for="ldl-l" class="ldl__label">Litri (l)</label>
      <div class="ldl__input-wrap">
        <input
          id="ldl-l"
          type="text"
          inputmode="decimal"
          value={lRaw}
          oninput={(e) => setL((e.target as HTMLInputElement).value)}
          placeholder="ex. 0,5"
          class="ldl__input"
        />
        <span class="ldl__suffix">l</span>
      </div>
    </div>

    <div class="ldl__equals" aria-hidden="true">=</div>

    <div class="ldl__field">
      <label for="ldl-dl" class="ldl__label">Decilitri (dl)</label>
      <div class="ldl__input-wrap">
        <input
          id="ldl-dl"
          type="text"
          inputmode="decimal"
          value={dlRaw}
          oninput={(e) => setDl((e.target as HTMLInputElement).value)}
          placeholder="ex. 5"
          class="ldl__input"
        />
        <span class="ldl__suffix">dl</span>
      </div>
    </div>
  </div>

  <p class="ldl__hint">Modifică oricare valoare pentru conversie instantanee</p>

  <div class="ldl__presets">
    <span class="ldl__presets-label">Cantități uzuale:</span>
    {#each PRESETS as p}
      <button
        type="button"
        class="ldl__chip"
        onclick={() => setL(p.l.toString().replace(".", ","))}
        title={p.label}
      >
        {p.l.toString().replace(".", ",")} l
      </button>
    {/each}
  </div>

  <div class="ldl__formula">
    <strong>Formulă:</strong> 1 l = 10 dl = 100 cl = 1 000 ml | dl = l × 10
  </div>
</div>

<style>
  .ldl {
    display: flex; flex-direction: column; gap: var(--sp-4);
    padding: var(--sp-5); background: var(--bg-card);
    border: 1px solid var(--border); border-radius: var(--r-lg);
  }
  .ldl__inputs {
    display: flex; align-items: end; gap: var(--sp-3);
    flex-wrap: wrap; justify-content: center;
  }
  @media (max-width: 640px) { .ldl__inputs { flex-direction: column; align-items: stretch; } }
  .ldl__field { display: flex; flex-direction: column; gap: var(--sp-2); flex: 1; min-width: 140px; }
  .ldl__label { font-size: 0.8125rem; color: var(--text-muted); font-weight: 500; }
  .ldl__input-wrap {
    position: relative;
    background: var(--bg); border: 1px solid var(--border);
    border-radius: var(--r-md); padding: var(--sp-3) var(--sp-5) var(--sp-3) var(--sp-3);
    transition: border-color var(--t-fast);
  }
  .ldl__input-wrap:focus-within {
    border-color: var(--cat-conversii, #8b5cf6);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--cat-conversii, #8b5cf6) 18%, transparent);
  }
  .ldl__input {
    width: 100%; border: none; background: transparent;
    color: var(--text); font-size: 1.5rem; font-weight: 700;
    font-family: var(--font-mono); text-align: center; outline: none;
  }
  .ldl__suffix {
    position: absolute; right: var(--sp-3); top: 50%; transform: translateY(-50%);
    color: var(--text-subtle); font-weight: 600; font-size: 0.8125rem;
  }
  .ldl__equals { font-size: 1.5rem; color: var(--text-muted); padding-bottom: var(--sp-3); }
  @media (max-width: 640px) { .ldl__equals { display: none; } }
  .ldl__hint { text-align: center; color: var(--text-subtle); font-size: 0.8125rem; margin: 0; }
  .ldl__presets {
    display: flex; flex-wrap: wrap; gap: var(--sp-2);
    align-items: center; justify-content: center;
    padding-top: var(--sp-3); border-top: 1px solid var(--border);
  }
  .ldl__presets-label {
    font-size: 0.8125rem; color: var(--text-muted); font-weight: 500; margin-right: var(--sp-1);
  }
  .ldl__chip {
    padding: 4px 10px; font-size: 0.8125rem; font-weight: 600;
    background: color-mix(in srgb, var(--cat-conversii, #8b5cf6) 14%, transparent);
    color: var(--cat-conversii, #8b5cf6);
    border: 1px solid transparent; border-radius: var(--r-full);
    cursor: pointer; transition: all var(--t-fast);
    font-family: var(--font-mono);
  }
  .ldl__chip:hover { background: var(--cat-conversii, #8b5cf6); color: #fff; }
  .ldl__formula {
    text-align: center; font-size: 0.8125rem; color: var(--text-muted);
    padding: var(--sp-3); background: var(--bg); border-radius: var(--r-md);
  }
</style>
