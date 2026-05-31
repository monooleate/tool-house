<script lang="ts">
  // ============================================================
  // AlcoolemieCalculator.svelte — estimare alcoolemie (formula Widmark)
  // BAC (g/L) = A / (r · m) − β · t
  //   A = grame de alcool pur, r = factor distribuție (sex), m = masă (kg),
  //   β = rata de eliminare (~0,15 g/L/h), t = ore de la consum.
  // STRICT ESTIMATIV — în România conducerea cu orice alcoolemie este interzisă.
  // ============================================================
  const ETHANOL_DENSITY = 0.789; // g/ml
  const BETA = 0.15;             // g/L pe oră (eliminare medie)

  type Sex = "m" | "f";
  let sex = $state<Sex>("m");
  let greutate = $state("80");
  let ore = $state("1");

  // băuturi standard (ml, % alcool)
  const BAUTURI = [
    { key: "bere", label: "Bere (500 ml, 5%)", ml: 500, abv: 5 },
    { key: "vin", label: "Vin (150 ml, 12%)", ml: 150, abv: 12 },
    { key: "tarie", label: "Tărie (50 ml, 40%)", ml: 50, abv: 40 },
  ];
  let cant = $state<Record<string, number>>({ bere: 1, vin: 0, tarie: 0 });

  function setCant(k: string, v: number) {
    cant = { ...cant, [k]: Math.max(0, Math.floor(v) || 0) };
  }

  let rez = $derived.by(() => {
    const m = parseFloat(greutate.replace(",", "."));
    const t = Math.max(0, parseFloat(ore.replace(",", ".")) || 0);
    if (!Number.isFinite(m) || m <= 0) return null;

    const grameAlcool = BAUTURI.reduce(
      (acc, b) => acc + (cant[b.key] || 0) * b.ml * (b.abv / 100) * ETHANOL_DENSITY,
      0,
    );
    if (grameAlcool <= 0) return { grameAlcool: 0, bac: 0, bacInitial: 0, oreCompleta: 0 };

    const r = sex === "m" ? 0.68 : 0.55;
    const bacInitial = grameAlcool / (r * m);          // vârf teoretic (t=0)
    const bac = Math.max(0, bacInitial - BETA * t);     // după t ore
    const oreCompleta = bacInitial / BETA;              // ore până la 0 (de la consum)
    return { grameAlcool, bac, bacInitial, oreCompleta };
  });

  function nivel(bac: number): { text: string; cls: string } {
    if (bac <= 0.001) return { text: "Fără alcool detectabil (estimativ)", cls: "ok" };
    if (bac < 0.8) return { text: "Sub 0,8 g/L — contravenție la volan în RO", cls: "warn" };
    return { text: "Peste 0,8 g/L — infracțiune la volan în RO", cls: "danger" };
  }
</script>

<div class="alc">
  <div class="alc__row">
    <div class="alc__modes" role="tablist">
      <button type="button" role="tab" aria-selected={sex === "m"} class:is-active={sex === "m"} onclick={() => (sex = "m")}>Bărbat</button>
      <button type="button" role="tab" aria-selected={sex === "f"} class:is-active={sex === "f"} onclick={() => (sex = "f")}>Femeie</button>
    </div>
    <label class="alc__field">
      <span>Greutate (kg)</span>
      <input type="number" min="30" max="250" bind:value={greutate} />
    </label>
    <label class="alc__field">
      <span>Ore de la consum</span>
      <input type="number" min="0" step="0.5" bind:value={ore} />
    </label>
  </div>

  <div class="alc__drinks">
    {#each BAUTURI as b}
      <div class="alc__drink">
        <span class="alc__drink-label">{b.label}</span>
        <div class="alc__stepper">
          <button type="button" onclick={() => setCant(b.key, (cant[b.key] || 0) - 1)} aria-label="minus">−</button>
          <input type="number" min="0" value={cant[b.key] || 0} oninput={(e) => setCant(b.key, Number((e.target as HTMLInputElement).value))} />
          <button type="button" onclick={() => setCant(b.key, (cant[b.key] || 0) + 1)} aria-label="plus">+</button>
        </div>
      </div>
    {/each}
  </div>

  {#if rez}
    <div class="alc__main alc--{nivel(rez.bac).cls}">
      <p class="alc__main-label">Alcoolemie estimată acum</p>
      <p class="alc__main-value">{rez.bac.toFixed(2)} <small>g/L (‰)</small></p>
      <p class="alc__main-note">{nivel(rez.bac).text}</p>
    </div>
    <div class="alc__grid">
      <div class="alc__card"><span>Alcool pur consumat</span><strong>{rez.grameAlcool.toFixed(1)} g</strong></div>
      <div class="alc__card"><span>Vârf estimat (la consum)</span><strong>{rez.bacInitial.toFixed(2)} g/L</strong></div>
      <div class="alc__card"><span>Eliminare completă (de la consum)</span><strong>~{rez.oreCompleta.toFixed(1)} ore</strong></div>
    </div>
  {/if}

  <p class="alc__disclaimer">
    <strong>⚠️ Avertisment important:</strong> rezultatul este o estimare aproximativă (formula Widmark) și
    poate diferi semnificativ de valoarea reală, în funcție de metabolism, alimentație, medicamente și alți factori.
    <strong>NU folosi acest calculator pentru a decide dacă poți conduce.</strong> În România, conducerea unui
    vehicul cu orice nivel de alcoolemie este interzisă (peste 0,8 g/L este infracțiune). Singura variantă sigură la volan este 0,00 g/L.
  </p>
</div>

<style>
  .alc { --accent: var(--cat-sanatate, #e11d48); display: flex; flex-direction: column; gap: var(--sp-4, 1rem); padding: var(--sp-5, 1.25rem); background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--r-lg); }
  .alc__row { display: flex; flex-wrap: wrap; gap: var(--sp-3, 0.75rem); align-items: end; }
  .alc__modes { display: flex; gap: 0.25rem; }
  .alc__modes button { padding: 0.55rem 0.9rem; border: 1px solid var(--border); background: var(--bg-input); color: var(--text); border-radius: var(--r-md); cursor: pointer; font: inherit; }
  .alc__modes button.is-active { background: var(--accent); color: #fff; border-color: var(--accent); }
  .alc__field { display: flex; flex-direction: column; gap: 0.3rem; flex: 1; min-width: 130px; }
  .alc__field span { font-size: 0.8rem; color: var(--text-muted); }
  .alc__field input { padding: 0.55rem 0.7rem; border: 1px solid var(--border); background: var(--bg-input); color: var(--text); border-radius: var(--r-md); font: inherit; outline: none; }
  .alc__field input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 18%, transparent); }
  .alc__drinks { display: flex; flex-direction: column; gap: var(--sp-2, 0.5rem); }
  .alc__drink { display: flex; align-items: center; justify-content: space-between; gap: var(--sp-3, 0.75rem); padding: 0.5rem 0.7rem; background: var(--bg-input); border: 1px solid var(--border); border-radius: var(--r-md); }
  .alc__drink-label { font-size: 0.9rem; color: var(--text); }
  .alc__stepper { display: flex; align-items: center; gap: 0.3rem; }
  .alc__stepper button { width: 32px; height: 32px; border: 1px solid var(--border); background: var(--bg-card); color: var(--text); border-radius: var(--r-md); cursor: pointer; font-size: 1.1rem; line-height: 1; }
  .alc__stepper input { width: 52px; text-align: center; border: 1px solid var(--border); background: var(--bg-card); color: var(--text); border-radius: var(--r-md); padding: 0.4rem; font-family: var(--font-mono); outline: none; }
  .alc__main { text-align: center; padding: var(--sp-4, 1rem); border-radius: 0.75rem; background: color-mix(in srgb, var(--accent) 10%, transparent); }
  .alc__main.alc--ok { background: color-mix(in srgb, #16a34a 14%, transparent); }
  .alc__main.alc--warn { background: color-mix(in srgb, #f59e0b 16%, transparent); }
  .alc__main.alc--danger { background: color-mix(in srgb, #dc2626 16%, transparent); }
  .alc__main-label { margin: 0; font-size: 0.85rem; color: var(--text-muted); }
  .alc__main-value { margin: 0.2rem 0; font-size: clamp(1.6rem, 6vw, 2.4rem); font-weight: 700; color: var(--text); }
  .alc__main-value small { font-size: 0.9rem; font-weight: 500; color: var(--text-muted); }
  .alc__main-note { margin: 0; font-size: 0.85rem; color: var(--text); font-weight: 600; }
  .alc__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--sp-3, 0.75rem); }
  @media (max-width: 560px) { .alc__grid { grid-template-columns: 1fr; } }
  .alc__card { display: flex; flex-direction: column; gap: 0.2rem; align-items: center; text-align: center; padding: var(--sp-3, 0.75rem); background: var(--bg-input); border: 1px solid var(--border); border-radius: var(--r-md); }
  .alc__card span { font-size: 0.72rem; color: var(--text-muted); }
  .alc__card strong { font-size: 1.1rem; color: var(--text); font-family: var(--font-mono); }
  .alc__disclaimer { margin: 0; font-size: 0.82rem; color: var(--text-muted); padding: var(--sp-3, 0.75rem); background: color-mix(in srgb, #dc2626 12%, transparent); border-radius: var(--r-md); }
</style>
