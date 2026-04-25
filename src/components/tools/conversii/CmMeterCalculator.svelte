<script lang="ts">
  // ============================================================
  // CmMeterCalculator.svelte – cm ↔ m kétirányú konvertor
  // Portolva a math reference CmMeterCalculator.tsx-ből (RO).
  // ============================================================
  let cm = $state(170);
  let m = $state(1.7);
  let lastEdited: "cm" | "m" = $state("cm");

  function setCm(value: number) {
    cm = value;
    m = Math.round((value / 100) * 10000) / 10000;
    lastEdited = "cm";
  }
  function setM(value: number) {
    m = value;
    cm = Math.round(value * 100 * 100) / 100;
    lastEdited = "m";
  }

  // Magasság-vizualizáció: emberi referencia (170 cm = 1.7 m)
  const HUMAN_REFS = [
    { cm: 100, label: "Copil (5 ani)" },
    { cm: 140, label: "Copil (10 ani)" },
    { cm: 160, label: "Femeie (medie)" },
    { cm: 175, label: "Bărbat (mediu)" },
    { cm: 200, label: "Foarte înalt" },
  ];
</script>

<div class="cm-meter">
  <div class="cm-meter__inputs">
    <div class="cm-meter__field">
      <label for="cm-input" class="cm-meter__label">Centimetri (cm)</label>
      <div class="cm-meter__input-wrap">
        <input
          id="cm-input"
          type="number"
          inputmode="decimal"
          step="1"
          min="0"
          value={cm}
          oninput={(e) => setCm(Number((e.target as HTMLInputElement).value))}
          class="cm-meter__input"
        />
      </div>
    </div>

    <div class="cm-meter__equals" aria-hidden="true">=</div>

    <div class="cm-meter__field">
      <label for="m-input" class="cm-meter__label">Metri (m)</label>
      <div class="cm-meter__input-wrap">
        <input
          id="m-input"
          type="number"
          inputmode="decimal"
          step="0.01"
          min="0"
          value={m}
          oninput={(e) => setM(Number((e.target as HTMLInputElement).value))}
          class="cm-meter__input"
        />
      </div>
    </div>
  </div>

  <p class="cm-meter__hint">
    Modifică oricare valoare pentru conversie instantanee
  </p>

  <!-- Quick presets: înălțimi de referință -->
  <div class="cm-meter__refs">
    <span class="cm-meter__refs-label">Repere:</span>
    {#each HUMAN_REFS as ref}
      <button
        type="button"
        class="cm-meter__chip"
        onclick={() => setCm(ref.cm)}
        title={ref.label}
      >
        {ref.cm} cm
      </button>
    {/each}
  </div>

  <div class="cm-meter__formula">
    <strong>Formulă:</strong> 1 m = 100 cm | m = cm ÷ 100
  </div>
</div>

<style>
  .cm-meter {
    display: flex;
    flex-direction: column;
    gap: var(--sp-4);
    padding: var(--sp-5);
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--r-lg);
  }

  .cm-meter__inputs {
    display: flex;
    align-items: end;
    gap: var(--sp-3);
    flex-wrap: wrap;
    justify-content: center;
  }
  @media (max-width: 640px) {
    .cm-meter__inputs {
      flex-direction: column;
      align-items: stretch;
    }
  }

  .cm-meter__field {
    display: flex;
    flex-direction: column;
    gap: var(--sp-2);
    flex: 1;
    min-width: 140px;
  }

  .cm-meter__label {
    font-size: 0.8125rem;
    color: var(--text-muted);
    font-weight: 500;
  }

  .cm-meter__input-wrap {
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: var(--r-md);
    padding: var(--sp-3);
    transition: border-color var(--t-fast);
  }
  .cm-meter__input-wrap:focus-within {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 18%, transparent);
  }

  .cm-meter__input {
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
  /* Hide number spinners */
  .cm-meter__input::-webkit-outer-spin-button,
  .cm-meter__input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  .cm-meter__input { -moz-appearance: textfield; }

  .cm-meter__equals {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-muted);
    padding-bottom: var(--sp-3);
  }
  @media (max-width: 640px) {
    .cm-meter__equals { display: none; }
  }

  .cm-meter__hint {
    text-align: center;
    color: var(--text-subtle);
    font-size: 0.8125rem;
    margin: 0;
  }

  .cm-meter__refs {
    display: flex;
    flex-wrap: wrap;
    gap: var(--sp-2);
    align-items: center;
    justify-content: center;
    padding-top: var(--sp-3);
    border-top: 1px solid var(--border);
  }
  .cm-meter__refs-label {
    font-size: 0.8125rem;
    color: var(--text-muted);
    font-weight: 500;
    margin-right: var(--sp-1);
  }
  .cm-meter__chip {
    padding: 4px 10px;
    font-size: 0.8125rem;
    font-weight: 600;
    background: color-mix(in srgb, var(--cat-conversii, #8b5cf6) 14%, transparent);
    color: var(--cat-conversii, #8b5cf6);
    border: 1px solid transparent;
    border-radius: var(--r-full);
    cursor: pointer;
    transition: all var(--t-fast);
  }
  .cm-meter__chip:hover {
    background: var(--cat-conversii, #8b5cf6);
    color: #fff;
  }

  .cm-meter__formula {
    text-align: center;
    font-size: 0.8125rem;
    color: var(--text-muted);
    padding: var(--sp-3);
    background: var(--bg);
    border-radius: var(--r-md);
  }
</style>
