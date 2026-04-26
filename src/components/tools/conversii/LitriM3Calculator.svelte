<script lang="ts">
  // ============================================================
  // LitriM3Calculator.svelte – litri ↔ metri cubi
  // Port: LiterKobmeterCalculator.tsx. Presets: consum apă/gaz lunar.
  // 1 m³ = 1.000 l
  // ============================================================
  let lRaw = $state("1000");
  let m3Raw = $state("1");

  function fmt(n: number, d = 4): string {
    if (Number.isInteger(n)) return n.toLocaleString("ro-RO");
    return parseFloat(n.toFixed(d)).toString().replace(".", ",");
  }
  function parse(v: string): number {
    return parseFloat(v.replace(/\s/g, "").replace(/\./g, "").replace(",", "."));
  }

  function setL(value: string) {
    lRaw = value;
    const v = parse(value);
    m3Raw = Number.isFinite(v) ? fmt(v / 1000) : "";
  }
  function setM3(value: string) {
    m3Raw = value;
    const v = parse(value);
    lRaw = Number.isFinite(v) ? fmt(v * 1000, 0) : "";
  }

  type Preset = { label: string; l: number };
  const PRESETS: Preset[] = [
    { label: "Cadă (150 l)",            l: 150 },
    { label: "Boiler (300 l)",          l: 300 },
    { label: "Consum apă/zi (500 l)",   l: 500 },
    { label: "Bazin mic (1 000 l = 1 m³)", l: 1000 },
    { label: "Apartament/lună (5 m³)",  l: 5000 },
    { label: "Casă/lună (10 m³)",       l: 10000 },
  ];
</script>

<div class="lm">
  <div class="lm__inputs">
    <div class="lm__field">
      <label for="lm-l" class="lm__label">Litri (l)</label>
      <div class="lm__input-wrap">
        <input
          id="lm-l"
          type="text"
          inputmode="decimal"
          value={lRaw}
          oninput={(e) => setL((e.target as HTMLInputElement).value)}
          placeholder="ex. 1000"
          class="lm__input"
        />
        <span class="lm__suffix">l</span>
      </div>
    </div>

    <div class="lm__equals" aria-hidden="true">=</div>

    <div class="lm__field">
      <label for="lm-m3" class="lm__label">Metri cubi (m³)</label>
      <div class="lm__input-wrap">
        <input
          id="lm-m3"
          type="text"
          inputmode="decimal"
          value={m3Raw}
          oninput={(e) => setM3((e.target as HTMLInputElement).value)}
          placeholder="ex. 1"
          class="lm__input"
        />
        <span class="lm__suffix">m³</span>
      </div>
    </div>
  </div>

  <p class="lm__hint">Modifică oricare valoare pentru conversie instantanee — util la facturi apă/gaz</p>

  <div class="lm__presets">
    <span class="lm__presets-label">Volume uzuale:</span>
    {#each PRESETS as p}
      <button
        type="button"
        class="lm__chip"
        onclick={() => setL(p.l.toString())}
        title={p.label}
      >
        {p.l.toLocaleString("ro-RO")} l
      </button>
    {/each}
  </div>

  <div class="lm__formula">
    <strong>Formulă:</strong> 1 m³ = 1 000 l = 1 000 dm³ | m³ = litri ÷ 1000
  </div>
</div>

<style>
  .lm {
    display: flex; flex-direction: column; gap: var(--sp-4);
    padding: var(--sp-5); background: var(--bg-card);
    border: 1px solid var(--border); border-radius: var(--r-lg);
  }
  .lm__inputs {
    display: flex; align-items: end; gap: var(--sp-3);
    flex-wrap: wrap; justify-content: center;
  }
  @media (max-width: 640px) { .lm__inputs { flex-direction: column; align-items: stretch; } }
  .lm__field { display: flex; flex-direction: column; gap: var(--sp-2); flex: 1; min-width: 140px; }
  .lm__label { font-size: 0.8125rem; color: var(--text-muted); font-weight: 500; }
  .lm__input-wrap {
    position: relative;
    background: var(--bg); border: 1px solid var(--border);
    border-radius: var(--r-md); padding: var(--sp-3) var(--sp-5) var(--sp-3) var(--sp-3);
    transition: border-color var(--t-fast);
  }
  .lm__input-wrap:focus-within {
    border-color: var(--cat-conversii, #8b5cf6);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--cat-conversii, #8b5cf6) 18%, transparent);
  }
  .lm__input {
    width: 100%; border: none; background: transparent;
    color: var(--text); font-size: 1.5rem; font-weight: 700;
    font-family: var(--font-mono); text-align: center; outline: none;
  }
  .lm__suffix {
    position: absolute; right: var(--sp-3); top: 50%; transform: translateY(-50%);
    color: var(--text-subtle); font-weight: 600; font-size: 0.8125rem;
  }
  .lm__equals { font-size: 1.5rem; color: var(--text-muted); padding-bottom: var(--sp-3); }
  @media (max-width: 640px) { .lm__equals { display: none; } }
  .lm__hint { text-align: center; color: var(--text-subtle); font-size: 0.8125rem; margin: 0; }
  .lm__presets {
    display: flex; flex-wrap: wrap; gap: var(--sp-2);
    align-items: center; justify-content: center;
    padding-top: var(--sp-3); border-top: 1px solid var(--border);
  }
  .lm__presets-label {
    font-size: 0.8125rem; color: var(--text-muted); font-weight: 500; margin-right: var(--sp-1);
  }
  .lm__chip {
    padding: 4px 10px; font-size: 0.8125rem; font-weight: 600;
    background: color-mix(in srgb, var(--cat-conversii, #8b5cf6) 14%, transparent);
    color: var(--cat-conversii, #8b5cf6);
    border: 1px solid transparent; border-radius: var(--r-full);
    cursor: pointer; transition: all var(--t-fast);
    font-family: var(--font-mono);
  }
  .lm__chip:hover { background: var(--cat-conversii, #8b5cf6); color: #fff; }
  .lm__formula {
    text-align: center; font-size: 0.8125rem; color: var(--text-muted);
    padding: var(--sp-3); background: var(--bg); border-radius: var(--r-md);
  }
</style>
