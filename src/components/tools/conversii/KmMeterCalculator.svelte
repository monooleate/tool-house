<script lang="ts">
  // ============================================================
  // KmMeterCalculator.svelte – km ↔ m kétirányú konvertor
  // Quick chips: gyakori sport-távolságok (5K, 10K, half-, marathon).
  // ============================================================
  let km = $state(5);
  let m = $state(5000);

  function setKm(value: number) {
    km = value;
    m = Math.round(value * 1000 * 100) / 100;
  }
  function setM(value: number) {
    m = value;
    km = Math.round((value / 1000) * 1000) / 1000;
  }

  const SPORT_REFS = [
    { km: 1, label: "1 km" },
    { km: 5, label: "5K alergare" },
    { km: 10, label: "10K alergare" },
    { km: 21.0975, label: "Semi-maraton" },
    { km: 42.195, label: "Maraton" },
  ];
</script>

<div class="km-meter">
  <div class="km-meter__inputs">
    <div class="km-meter__field">
      <label for="km-input" class="km-meter__label">Kilometri (km)</label>
      <div class="km-meter__input-wrap">
        <input
          id="km-input"
          type="number"
          inputmode="decimal"
          step="0.1"
          min="0"
          value={km}
          oninput={(e) => setKm(Number((e.target as HTMLInputElement).value))}
          class="km-meter__input"
        />
      </div>
    </div>

    <div class="km-meter__equals" aria-hidden="true">=</div>

    <div class="km-meter__field">
      <label for="m-input" class="km-meter__label">Metri (m)</label>
      <div class="km-meter__input-wrap">
        <input
          id="m-input"
          type="number"
          inputmode="decimal"
          step="1"
          min="0"
          value={m}
          oninput={(e) => setM(Number((e.target as HTMLInputElement).value))}
          class="km-meter__input"
        />
      </div>
    </div>
  </div>

  <p class="km-meter__hint">
    Modifică oricare valoare pentru conversie instantanee
  </p>

  <div class="km-meter__refs">
    <span class="km-meter__refs-label">Distanțe sportive:</span>
    {#each SPORT_REFS as ref}
      <button
        type="button"
        class="km-meter__chip"
        onclick={() => setKm(ref.km)}
      >
        {ref.label}
      </button>
    {/each}
  </div>

  <div class="km-meter__formula">
    <strong>Formulă:</strong> 1 km = 1 000 m | m = km × 1000
  </div>
</div>

<style>
  .km-meter {
    display: flex;
    flex-direction: column;
    gap: var(--sp-4);
    padding: var(--sp-5);
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--r-lg);
  }
  .km-meter__inputs {
    display: flex;
    align-items: end;
    gap: var(--sp-3);
    flex-wrap: wrap;
    justify-content: center;
  }
  @media (max-width: 640px) {
    .km-meter__inputs { flex-direction: column; align-items: stretch; }
  }
  .km-meter__field {
    display: flex;
    flex-direction: column;
    gap: var(--sp-2);
    flex: 1;
    min-width: 140px;
  }
  .km-meter__label {
    font-size: 0.8125rem;
    color: var(--text-muted);
    font-weight: 500;
  }
  .km-meter__input-wrap {
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: var(--r-md);
    padding: var(--sp-3);
    transition: border-color var(--t-fast);
  }
  .km-meter__input-wrap:focus-within {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 18%, transparent);
  }
  .km-meter__input {
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
  .km-meter__input::-webkit-outer-spin-button,
  .km-meter__input::-webkit-inner-spin-button {
    -webkit-appearance: none; margin: 0;
  }
  .km-meter__input { -moz-appearance: textfield; }
  .km-meter__equals {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-muted);
    padding-bottom: var(--sp-3);
  }
  @media (max-width: 640px) { .km-meter__equals { display: none; } }
  .km-meter__hint {
    text-align: center;
    color: var(--text-subtle);
    font-size: 0.8125rem;
    margin: 0;
  }
  .km-meter__refs {
    display: flex;
    flex-wrap: wrap;
    gap: var(--sp-2);
    align-items: center;
    justify-content: center;
    padding-top: var(--sp-3);
    border-top: 1px solid var(--border);
  }
  .km-meter__refs-label {
    font-size: 0.8125rem;
    color: var(--text-muted);
    font-weight: 500;
    margin-right: var(--sp-1);
    width: 100%;
    text-align: center;
  }
  .km-meter__chip {
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
  .km-meter__chip:hover {
    background: var(--cat-conversii, #8b5cf6);
    color: #fff;
  }
  .km-meter__formula {
    text-align: center;
    font-size: 0.8125rem;
    color: var(--text-muted);
    padding: var(--sp-3);
    background: var(--bg);
    border-radius: var(--r-md);
  }
</style>
