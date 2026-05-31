<script lang="ts">
  // ============================================================
  // PogonCalculator.svelte – pogon ↔ metri pătrați
  // Valoare uzuală: 1 pogon = 5000 m² (≈ ½ hectar).
  // Variantă regională: pogonul muntenesc = 5011,79 m².
  // ============================================================
  const POGON_M2 = 5000;

  let pogon = $state(1);
  let m2 = $state(5000);

  function setPogon(v: number) {
    pogon = v;
    m2 = Math.round(v * POGON_M2 * 100) / 100;
  }
  function setM2(v: number) {
    m2 = v;
    pogon = Math.round((v / POGON_M2) * 10000) / 10000;
  }

  const REFS = [1, 2, 5, 10];
</script>

<div class="cv">
  <div class="cv__inputs">
    <div class="cv__field">
      <label for="pogon-in" class="cv__label">Pogoane</label>
      <div class="cv__wrap">
        <input id="pogon-in" type="number" inputmode="decimal" step="0.1" min="0" value={pogon}
          oninput={(e) => setPogon(Number((e.target as HTMLInputElement).value))} class="cv__input" />
      </div>
    </div>
    <div class="cv__eq" aria-hidden="true">=</div>
    <div class="cv__field">
      <label for="m2-in" class="cv__label">Metri pătrați (m²)</label>
      <div class="cv__wrap">
        <input id="m2-in" type="number" inputmode="decimal" step="1" min="0" value={m2}
          oninput={(e) => setM2(Number((e.target as HTMLInputElement).value))} class="cv__input" />
      </div>
    </div>
  </div>

  <p class="cv__hint">1 pogon = 5.000 m² (valoare uzuală, ≈ ½ hectar)</p>

  <div class="cv__refs">
    <span class="cv__refs-label">Valori uzuale:</span>
    {#each REFS as r}
      <button type="button" class="cv__chip" onclick={() => setPogon(r)}>{r} pogon{r > 1 ? "e" : ""}</button>
    {/each}
  </div>

  <div class="cv__formula">
    <strong>Formulă:</strong> m² = pogoane × 5000 | pogoane = m² ÷ 5000.
    <br />Variantă regională: pogonul muntenesc = 5011,79 m². Verifică valoarea locală pentru acte oficiale.
  </div>
</div>

<style>
  .cv { --accent: var(--cat-conversii, #8b5cf6); display: flex; flex-direction: column; gap: var(--sp-4, 1rem); padding: var(--sp-5, 1.25rem); background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--r-lg); }
  .cv__inputs { display: flex; align-items: end; gap: var(--sp-3, 0.75rem); flex-wrap: wrap; justify-content: center; }
  @media (max-width: 640px) { .cv__inputs { flex-direction: column; align-items: stretch; } }
  .cv__field { display: flex; flex-direction: column; gap: var(--sp-2, 0.5rem); flex: 1; min-width: 140px; }
  .cv__label { font-size: 0.8125rem; color: var(--text-muted); font-weight: 500; }
  .cv__wrap { background: var(--bg-input); border: 1px solid var(--border); border-radius: var(--r-md); padding: var(--sp-3, 0.75rem); }
  .cv__wrap:focus-within { border-color: var(--accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 18%, transparent); }
  .cv__input { width: 100%; border: none; background: transparent; color: var(--text); font-size: 1.5rem; font-weight: 700; font-family: var(--font-mono); text-align: center; outline: none; }
  .cv__input::-webkit-outer-spin-button, .cv__input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
  .cv__input { -moz-appearance: textfield; }
  .cv__eq { font-size: 1.5rem; font-weight: 700; color: var(--text-muted); padding-bottom: var(--sp-3, 0.75rem); }
  @media (max-width: 640px) { .cv__eq { display: none; } }
  .cv__hint { text-align: center; color: var(--text-subtle); font-size: 0.8125rem; margin: 0; }
  .cv__refs { display: flex; flex-wrap: wrap; gap: var(--sp-2, 0.5rem); align-items: center; justify-content: center; padding-top: var(--sp-3, 0.75rem); border-top: 1px solid var(--border); }
  .cv__refs-label { font-size: 0.8125rem; color: var(--text-muted); font-weight: 500; width: 100%; text-align: center; }
  .cv__chip { padding: 4px 10px; font-size: 0.8125rem; font-weight: 600; background: color-mix(in srgb, var(--accent) 14%, transparent); color: var(--accent); border: 1px solid transparent; border-radius: var(--r-full); cursor: pointer; }
  .cv__chip:hover { background: var(--accent); color: #fff; }
  .cv__formula { text-align: center; font-size: 0.8125rem; color: var(--text-muted); padding: var(--sp-3, 0.75rem); background: var(--bg-input); border-radius: var(--r-md); }
</style>
