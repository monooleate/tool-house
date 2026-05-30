<script lang="ts">
  // ============================================================
  // MileKmCalculator.svelte – mile ↔ km kétirányú konvertor
  // 1 mile (international) = 1.609344 km. Quick chips: tipikus távok.
  // ============================================================
  const MI_TO_KM = 1.609344;

  let mile = $state(1);
  let km = $state(1.609344);

  function setMile(value: number) {
    mile = value;
    km = Math.round(value * MI_TO_KM * 10000) / 10000;
  }
  function setKm(value: number) {
    km = value;
    mile = Math.round((value / MI_TO_KM) * 10000) / 10000;
  }

  const REFS = [
    { mi: 1, label: "1 milă" },
    { mi: 5, label: "5 mile" },
    { mi: 10, label: "10 mile" },
    { mi: 26.21875, label: "Maraton (26,2 mi)" },
    { mi: 100, label: "100 mile" },
  ];
</script>

<div class="mk">
  <div class="mk__inputs">
    <div class="mk__field">
      <label for="mile-input" class="mk__label">Mile (mi)</label>
      <div class="mk__input-wrap">
        <input
          id="mile-input"
          type="number"
          inputmode="decimal"
          step="0.1"
          min="0"
          value={mile}
          oninput={(e) => setMile(Number((e.target as HTMLInputElement).value))}
          class="mk__input"
        />
      </div>
    </div>

    <div class="mk__equals" aria-hidden="true">=</div>

    <div class="mk__field">
      <label for="km-input" class="mk__label">Kilometri (km)</label>
      <div class="mk__input-wrap">
        <input
          id="km-input"
          type="number"
          inputmode="decimal"
          step="0.1"
          min="0"
          value={km}
          oninput={(e) => setKm(Number((e.target as HTMLInputElement).value))}
          class="mk__input"
        />
      </div>
    </div>
  </div>

  <p class="mk__hint">Modifică oricare valoare pentru conversie instantanee</p>

  <div class="mk__refs">
    <span class="mk__refs-label">Distanțe uzuale:</span>
    {#each REFS as ref}
      <button type="button" class="mk__chip" onclick={() => setMile(ref.mi)}>
        {ref.label}
      </button>
    {/each}
  </div>

  <div class="mk__formula">
    <strong>Formulă:</strong> 1 milă = 1,609344 km | km = mile × 1,609344 | mile = km ÷ 1,609344
  </div>
</div>

<style>
  .mk { display: flex; flex-direction: column; gap: var(--sp-4); padding: var(--sp-5); background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--r-lg); }
  .mk__inputs { display: flex; align-items: end; gap: var(--sp-3); flex-wrap: wrap; justify-content: center; }
  @media (max-width: 640px) { .mk__inputs { flex-direction: column; align-items: stretch; } }
  .mk__field { display: flex; flex-direction: column; gap: var(--sp-2); flex: 1; min-width: 140px; }
  .mk__label { font-size: 0.8125rem; color: var(--text-muted); font-weight: 500; }
  .mk__input-wrap { background: var(--bg); border: 1px solid var(--border); border-radius: var(--r-md); padding: var(--sp-3); transition: border-color var(--t-fast); }
  .mk__input-wrap:focus-within { border-color: var(--accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 18%, transparent); }
  .mk__input { width: 100%; border: none; background: transparent; color: var(--text); font-size: 1.5rem; font-weight: 700; font-family: var(--font-mono); text-align: center; outline: none; }
  .mk__input::-webkit-outer-spin-button, .mk__input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
  .mk__input { -moz-appearance: textfield; }
  .mk__equals { font-size: 1.5rem; font-weight: 700; color: var(--text-muted); padding-bottom: var(--sp-3); }
  @media (max-width: 640px) { .mk__equals { display: none; } }
  .mk__hint { text-align: center; color: var(--text-subtle); font-size: 0.8125rem; margin: 0; }
  .mk__refs { display: flex; flex-wrap: wrap; gap: var(--sp-2); align-items: center; justify-content: center; padding-top: var(--sp-3); border-top: 1px solid var(--border); }
  .mk__refs-label { font-size: 0.8125rem; color: var(--text-muted); font-weight: 500; width: 100%; text-align: center; }
  .mk__chip { padding: 4px 10px; font-size: 0.8125rem; font-weight: 600; background: color-mix(in srgb, var(--cat-conversii, #8b5cf6) 14%, transparent); color: var(--cat-conversii, #8b5cf6); border: 1px solid transparent; border-radius: var(--r-full); cursor: pointer; transition: all var(--t-fast); }
  .mk__chip:hover { background: var(--cat-conversii, #8b5cf6); color: #fff; }
  .mk__formula { text-align: center; font-size: 0.8125rem; color: var(--text-muted); padding: var(--sp-3); background: var(--bg); border-radius: var(--r-md); }
</style>
