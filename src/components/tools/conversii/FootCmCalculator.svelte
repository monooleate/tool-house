<script lang="ts">
  // ============================================================
  // FootCmCalculator.svelte – picioare + țoli ↔ cm
  // Port: FeetCmCalculator.tsx (Preact). Trei câmpuri sincronizate
  // (ft + inch combo) pentru înălțimi și diagonale.
  // ============================================================

  let feet = $state(5);
  let inches = $state(10);
  let cm = $state(177.8);
  let lastEdited: "ft" | "in" | "cm" = $state("ft");

  function calcCm(ft: number, inc: number): number {
    const totalInches = ft * 12 + inc;
    return Math.round(totalInches * 2.54 * 100) / 100;
  }
  function calcFeetInches(centimeters: number): { ft: number; inc: number } {
    const totalInches = centimeters / 2.54;
    const ft = Math.floor(totalInches / 12);
    const inc = Math.round((totalInches - ft * 12) * 10) / 10;
    return { ft, inc };
  }

  function setFeet(v: number) {
    feet = v;
    cm = calcCm(v, inches);
    lastEdited = "ft";
  }
  function setInches(v: number) {
    inches = v;
    cm = calcCm(feet, v);
    lastEdited = "in";
  }
  function setCm(v: number) {
    cm = v;
    const r = calcFeetInches(v);
    feet = r.ft;
    inches = r.inc;
    lastEdited = "cm";
  }

  type Preset = { label: string; ft: number; inc: number };
  const HEIGHT_PRESETS: Preset[] = [
    { label: "Femeie medie (5'4\")", ft: 5, inc: 4 },
    { label: "Bărbat mediu (5'9\")", ft: 5, inc: 9 },
    { label: "Înalt (6'0\")",        ft: 6, inc: 0 },
    { label: "Foarte înalt (6'4\")", ft: 6, inc: 4 },
    { label: "NBA (7'0\")",          ft: 7, inc: 0 },
  ];
  function applyPreset(p: Preset) {
    feet = p.ft;
    inches = p.inc;
    cm = calcCm(p.ft, p.inc);
    lastEdited = "ft";
  }
</script>

<div class="foot">
  <div class="foot__inputs">
    <div class="foot__field">
      <label for="foot-ft" class="foot__label">Picioare (ft)</label>
      <div class="foot__input-wrap">
        <input
          id="foot-ft"
          type="number"
          inputmode="numeric"
          step="1"
          min="0"
          max="9"
          value={feet}
          oninput={(e) => setFeet(Number((e.target as HTMLInputElement).value))}
          class="foot__input"
        />
        <span class="foot__suffix">ft</span>
      </div>
    </div>

    <div class="foot__field">
      <label for="foot-in" class="foot__label">Țoli (in)</label>
      <div class="foot__input-wrap">
        <input
          id="foot-in"
          type="number"
          inputmode="numeric"
          step="1"
          min="0"
          max="11"
          value={inches}
          oninput={(e) => setInches(Number((e.target as HTMLInputElement).value))}
          class="foot__input"
        />
        <span class="foot__suffix">in</span>
      </div>
    </div>

    <div class="foot__equals" aria-hidden="true">=</div>

    <div class="foot__field">
      <label for="foot-cm" class="foot__label">Centimetri (cm)</label>
      <div class="foot__input-wrap">
        <input
          id="foot-cm"
          type="number"
          inputmode="decimal"
          step="0.1"
          min="0"
          value={cm}
          oninput={(e) => setCm(Number((e.target as HTMLInputElement).value))}
          class="foot__input foot__input--wide"
        />
        <span class="foot__suffix">cm</span>
      </div>
    </div>
  </div>

  <p class="foot__hint">
    {feet}'{inches}" = {cm} cm — modifică oricare câmp pentru conversie instantanee.
  </p>

  <div class="foot__refs">
    <span class="foot__refs-label">Înălțimi uzuale:</span>
    {#each HEIGHT_PRESETS as p}
      <button
        type="button"
        class="foot__chip"
        onclick={() => applyPreset(p)}
        title={p.label}
      >
        {p.ft}'{p.inc}"
      </button>
    {/each}
  </div>

  <div class="foot__formula">
    <strong>Formulă:</strong> 1 ft = 12 in = 30,48 cm | cm = (ft × 12 + in) × 2,54
  </div>
</div>

<style>
  .foot {
    display: flex;
    flex-direction: column;
    gap: var(--sp-4);
    padding: var(--sp-5);
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--r-lg);
  }

  .foot__inputs {
    display: flex;
    align-items: end;
    gap: var(--sp-3);
    flex-wrap: wrap;
    justify-content: center;
  }
  @media (max-width: 640px) {
    .foot__inputs {
      flex-direction: column;
      align-items: stretch;
    }
  }

  .foot__field {
    display: flex;
    flex-direction: column;
    gap: var(--sp-2);
    flex: 1 1 110px;
    min-width: 100px;
  }

  .foot__label {
    font-size: 0.8125rem;
    color: var(--text-muted);
    font-weight: 500;
  }

  .foot__input-wrap {
    position: relative;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: var(--r-md);
    padding: var(--sp-3) var(--sp-5) var(--sp-3) var(--sp-3);
    transition: border-color var(--t-fast);
  }
  .foot__input-wrap:focus-within {
    border-color: var(--cat-conversii, #8b5cf6);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--cat-conversii, #8b5cf6) 18%, transparent);
  }

  .foot__input {
    width: 100%;
    border: none;
    background: transparent;
    color: var(--text);
    font-size: 1.5rem;
    font-weight: 700;
    font-family: var(--font-mono);
    text-align: center;
    outline: none;
  }
  .foot__input--wide { font-size: 1.375rem; }
  .foot__input::-webkit-outer-spin-button,
  .foot__input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  .foot__input { -moz-appearance: textfield; }

  .foot__suffix {
    position: absolute;
    right: var(--sp-3);
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-subtle);
    font-weight: 600;
    font-size: 0.8125rem;
  }

  .foot__equals {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-muted);
    padding-bottom: var(--sp-3);
  }
  @media (max-width: 640px) {
    .foot__equals { display: none; }
  }

  .foot__hint {
    text-align: center;
    color: var(--text-subtle);
    font-size: 0.8125rem;
    margin: 0;
  }

  .foot__refs {
    display: flex;
    flex-wrap: wrap;
    gap: var(--sp-2);
    align-items: center;
    justify-content: center;
    padding-top: var(--sp-3);
    border-top: 1px solid var(--border);
  }
  .foot__refs-label {
    font-size: 0.8125rem;
    color: var(--text-muted);
    font-weight: 500;
    margin-right: var(--sp-1);
  }
  .foot__chip {
    padding: 4px 10px;
    font-size: 0.8125rem;
    font-weight: 600;
    background: color-mix(in srgb, var(--cat-conversii, #8b5cf6) 14%, transparent);
    color: var(--cat-conversii, #8b5cf6);
    border: 1px solid transparent;
    border-radius: var(--r-full);
    cursor: pointer;
    transition: all var(--t-fast);
    font-family: var(--font-mono);
  }
  .foot__chip:hover {
    background: var(--cat-conversii, #8b5cf6);
    color: #fff;
  }

  .foot__formula {
    text-align: center;
    font-size: 0.8125rem;
    color: var(--text-muted);
    padding: var(--sp-3);
    background: var(--bg);
    border-radius: var(--r-md);
  }
</style>
