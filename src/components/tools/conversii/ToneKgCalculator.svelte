<script lang="ts">
  // ============================================================
  // ToneKgCalculator.svelte – tone (t) ↔ kg
  // Port: TonnaKgCalculator.tsx. Presets: transport / industrie RO.
  // 1 t = 1.000 kg = 1.000.000 g
  // ============================================================
  let toneRaw = $state("1");
  let kgRaw = $state("1000");

  function fmt(n: number, d = 3): string {
    if (Number.isInteger(n)) return n.toLocaleString("ro-RO");
    return parseFloat(n.toFixed(d)).toString().replace(".", ",");
  }
  function parse(v: string): number {
    return parseFloat(v.replace(/\s/g, "").replace(/\./g, "").replace(",", "."));
  }

  function setTone(value: string) {
    toneRaw = value;
    const v = parse(value);
    kgRaw = Number.isFinite(v) ? fmt(v * 1000, 0) : "";
  }
  function setKg(value: string) {
    kgRaw = value;
    const v = parse(value);
    toneRaw = Number.isFinite(v) ? fmt(v / 1000) : "";
  }

  type Preset = { label: string; tone: number };
  const PRESETS: Preset[] = [
    { label: "Camionetă (1 t)",   tone: 1 },
    { label: "Camion mic (3,5 t)", tone: 3.5 },
    { label: "Camion (7,5 t)",    tone: 7.5 },
    { label: "TIR (12 t)",        tone: 12 },
    { label: "TIR mare (24 t)",   tone: 24 },
    { label: "Vagon CFR (50 t)",  tone: 50 },
  ];
</script>

<div class="tk">
  <div class="tk__inputs">
    <div class="tk__field">
      <label for="tk-tone" class="tk__label">Tone (t)</label>
      <div class="tk__input-wrap">
        <input
          id="tk-tone"
          type="text"
          inputmode="decimal"
          value={toneRaw}
          oninput={(e) => setTone((e.target as HTMLInputElement).value)}
          placeholder="ex. 2,5"
          class="tk__input"
        />
        <span class="tk__suffix">t</span>
      </div>
    </div>

    <div class="tk__equals" aria-hidden="true">=</div>

    <div class="tk__field">
      <label for="tk-kg" class="tk__label">Kilograme (kg)</label>
      <div class="tk__input-wrap">
        <input
          id="tk-kg"
          type="text"
          inputmode="decimal"
          value={kgRaw}
          oninput={(e) => setKg((e.target as HTMLInputElement).value)}
          placeholder="ex. 2500"
          class="tk__input"
        />
        <span class="tk__suffix">kg</span>
      </div>
    </div>
  </div>

  <p class="tk__hint">Modifică oricare valoare pentru conversie instantanee</p>

  <div class="tk__presets">
    <span class="tk__presets-label">Vehicule transport:</span>
    {#each PRESETS as p}
      <button
        type="button"
        class="tk__chip"
        onclick={() => setTone(p.tone.toString().replace(".", ","))}
        title={p.label}
      >
        {p.tone.toString().replace(".", ",")} t
      </button>
    {/each}
  </div>

  <div class="tk__formula">
    <strong>Formulă:</strong> 1 tonă = 1 000 kg = 1 000 000 g
  </div>
</div>

<style>
  .tk {
    display: flex; flex-direction: column; gap: var(--sp-4);
    padding: var(--sp-5); background: var(--bg-card);
    border: 1px solid var(--border); border-radius: var(--r-lg);
  }
  .tk__inputs {
    display: flex; align-items: end; gap: var(--sp-3);
    flex-wrap: wrap; justify-content: center;
  }
  @media (max-width: 640px) { .tk__inputs { flex-direction: column; align-items: stretch; } }
  .tk__field { display: flex; flex-direction: column; gap: var(--sp-2); flex: 1; min-width: 140px; }
  .tk__label { font-size: 0.8125rem; color: var(--text-muted); font-weight: 500; }
  .tk__input-wrap {
    position: relative;
    background: var(--bg); border: 1px solid var(--border);
    border-radius: var(--r-md); padding: var(--sp-3) var(--sp-5) var(--sp-3) var(--sp-3);
    transition: border-color var(--t-fast);
  }
  .tk__input-wrap:focus-within {
    border-color: var(--cat-conversii, #8b5cf6);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--cat-conversii, #8b5cf6) 18%, transparent);
  }
  .tk__input {
    width: 100%; border: none; background: transparent;
    color: var(--text); font-size: 1.5rem; font-weight: 700;
    font-family: var(--font-mono); text-align: center; outline: none;
  }
  .tk__suffix {
    position: absolute; right: var(--sp-3); top: 50%; transform: translateY(-50%);
    color: var(--text-subtle); font-weight: 600; font-size: 0.8125rem;
  }
  .tk__equals { font-size: 1.5rem; color: var(--text-muted); padding-bottom: var(--sp-3); }
  @media (max-width: 640px) { .tk__equals { display: none; } }
  .tk__hint { text-align: center; color: var(--text-subtle); font-size: 0.8125rem; margin: 0; }
  .tk__presets {
    display: flex; flex-wrap: wrap; gap: var(--sp-2);
    align-items: center; justify-content: center;
    padding-top: var(--sp-3); border-top: 1px solid var(--border);
  }
  .tk__presets-label {
    font-size: 0.8125rem; color: var(--text-muted); font-weight: 500; margin-right: var(--sp-1);
  }
  .tk__chip {
    padding: 4px 10px; font-size: 0.8125rem; font-weight: 600;
    background: color-mix(in srgb, var(--cat-conversii, #8b5cf6) 14%, transparent);
    color: var(--cat-conversii, #8b5cf6);
    border: 1px solid transparent; border-radius: var(--r-full);
    cursor: pointer; transition: all var(--t-fast);
    font-family: var(--font-mono);
  }
  .tk__chip:hover { background: var(--cat-conversii, #8b5cf6); color: #fff; }
  .tk__formula {
    text-align: center; font-size: 0.8125rem; color: var(--text-muted);
    padding: var(--sp-3); background: var(--bg); border-radius: var(--r-md);
  }
</style>
