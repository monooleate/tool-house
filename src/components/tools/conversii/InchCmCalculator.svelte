<script lang="ts">
  // ============================================================
  // InchCmCalculator.svelte – inch (țoli) ↔ cm
  // Port: InchCmCalculator.tsx. Presets: ecrane (laptop, monitor, TV).
  // ============================================================
  let inchRaw = $state("13");
  let cmRaw = $state("33,02");

  function fmt(n: number, d = 2): string {
    if (Number.isInteger(n)) return n.toString();
    return parseFloat(n.toFixed(d)).toString().replace(".", ",");
  }
  function parse(v: string): number {
    return parseFloat(v.replace(/\s/g, "").replace(",", "."));
  }

  function setInch(value: string) {
    inchRaw = value;
    const v = parse(value);
    cmRaw = Number.isFinite(v) ? fmt(v * 2.54) : "";
  }
  function setCm(value: string) {
    cmRaw = value;
    const v = parse(value);
    inchRaw = Number.isFinite(v) ? fmt(v / 2.54) : "";
  }

  type Preset = { label: string; inch: number };
  const SCREEN_PRESETS: Preset[] = [
    { label: "iPhone (6,1\")", inch: 6.1 },
    { label: "Tabletă (10\")",  inch: 10 },
    { label: "Laptop (13\")",   inch: 13 },
    { label: "Laptop (15,6\")", inch: 15.6 },
    { label: "Monitor (24\")",  inch: 24 },
    { label: "Monitor (27\")",  inch: 27 },
    { label: "TV (32\")",       inch: 32 },
    { label: "TV (43\")",       inch: 43 },
    { label: "TV (55\")",       inch: 55 },
    { label: "TV (65\")",       inch: 65 },
  ];
</script>

<div class="ic">
  <div class="ic__inputs">
    <div class="ic__field">
      <label for="ic-inch" class="ic__label">Inch (țoli)</label>
      <div class="ic__input-wrap">
        <input
          id="ic-inch"
          type="text"
          inputmode="decimal"
          value={inchRaw}
          oninput={(e) => setInch((e.target as HTMLInputElement).value)}
          placeholder="ex. 27"
          class="ic__input"
        />
        <span class="ic__suffix">in</span>
      </div>
    </div>

    <div class="ic__equals" aria-hidden="true">=</div>

    <div class="ic__field">
      <label for="ic-cm" class="ic__label">Centimetri (cm)</label>
      <div class="ic__input-wrap">
        <input
          id="ic-cm"
          type="text"
          inputmode="decimal"
          value={cmRaw}
          oninput={(e) => setCm((e.target as HTMLInputElement).value)}
          placeholder="ex. 68,58"
          class="ic__input"
        />
        <span class="ic__suffix">cm</span>
      </div>
    </div>
  </div>

  <p class="ic__hint">Modifică oricare valoare pentru conversie instantanee</p>

  <div class="ic__presets">
    <span class="ic__presets-label">Diagonale uzuale:</span>
    {#each SCREEN_PRESETS as p}
      <button
        type="button"
        class="ic__chip"
        onclick={() => setInch(p.inch.toString().replace(".", ","))}
        title={p.label}
      >
        {p.inch.toString().replace(".", ",")}"
      </button>
    {/each}
  </div>

  <div class="ic__formula">
    <strong>Formulă:</strong> 1 inch = 2,54 cm | cm = inch × 2,54
  </div>
</div>

<style>
  .ic {
    display: flex; flex-direction: column; gap: var(--sp-4);
    padding: var(--sp-5); background: var(--bg-card);
    border: 1px solid var(--border); border-radius: var(--r-lg);
  }
  .ic__inputs {
    display: flex; align-items: end; gap: var(--sp-3);
    flex-wrap: wrap; justify-content: center;
  }
  @media (max-width: 640px) { .ic__inputs { flex-direction: column; align-items: stretch; } }
  .ic__field { display: flex; flex-direction: column; gap: var(--sp-2); flex: 1; min-width: 140px; }
  .ic__label { font-size: 0.8125rem; color: var(--text-muted); font-weight: 500; }
  .ic__input-wrap {
    position: relative;
    background: var(--bg); border: 1px solid var(--border);
    border-radius: var(--r-md); padding: var(--sp-3) var(--sp-5) var(--sp-3) var(--sp-3);
    transition: border-color var(--t-fast);
  }
  .ic__input-wrap:focus-within {
    border-color: var(--cat-conversii, #8b5cf6);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--cat-conversii, #8b5cf6) 18%, transparent);
  }
  .ic__input {
    width: 100%; border: none; background: transparent;
    color: var(--text); font-size: 1.5rem; font-weight: 700;
    font-family: var(--font-mono); text-align: center; outline: none;
  }
  .ic__suffix {
    position: absolute; right: var(--sp-3); top: 50%; transform: translateY(-50%);
    color: var(--text-subtle); font-weight: 600; font-size: 0.8125rem;
  }
  .ic__equals {
    font-size: 1.5rem; color: var(--text-muted); padding-bottom: var(--sp-3);
  }
  @media (max-width: 640px) { .ic__equals { display: none; } }
  .ic__hint { text-align: center; color: var(--text-subtle); font-size: 0.8125rem; margin: 0; }
  .ic__presets {
    display: flex; flex-wrap: wrap; gap: var(--sp-2);
    align-items: center; justify-content: center;
    padding-top: var(--sp-3); border-top: 1px solid var(--border);
  }
  .ic__presets-label {
    font-size: 0.8125rem; color: var(--text-muted); font-weight: 500; margin-right: var(--sp-1);
  }
  .ic__chip {
    padding: 4px 10px; font-size: 0.8125rem; font-weight: 600;
    background: color-mix(in srgb, var(--cat-conversii, #8b5cf6) 14%, transparent);
    color: var(--cat-conversii, #8b5cf6);
    border: 1px solid transparent; border-radius: var(--r-full);
    cursor: pointer; transition: all var(--t-fast);
    font-family: var(--font-mono);
  }
  .ic__chip:hover { background: var(--cat-conversii, #8b5cf6); color: #fff; }
  .ic__formula {
    text-align: center; font-size: 0.8125rem; color: var(--text-muted);
    padding: var(--sp-3); background: var(--bg); border-radius: var(--r-md);
  }
</style>
