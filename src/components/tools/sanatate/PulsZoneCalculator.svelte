<script lang="ts">
  // ============================================================
  // PulsZoneCalculator.svelte — puls maxim + zone de antrenament
  // HR max: 220 − vârstă (clasic) și Tanaka (208 − 0,7·vârstă).
  // Zone prin metoda Karvonen: HR = (HRmax − HRrepaus)·% + HRrepaus.
  // Caracter informativ.
  // ============================================================
  let varsta = $state("30");
  let repaus = $state("60");

  const ZONE = [
    { key: 1, label: "Z1 · Încălzire", lo: 0.5, hi: 0.6, desc: "Recuperare ușoară, încălzire", color: "#16a34a" },
    { key: 2, label: "Z2 · Ardere grăsimi", lo: 0.6, hi: 0.7, desc: "Fat burn, rezistență de bază", color: "#22c55e" },
    { key: 3, label: "Z3 · Aerob", lo: 0.7, hi: 0.8, desc: "Cardio, capacitate aerobă", color: "#f59e0b" },
    { key: 4, label: "Z4 · Anaerob", lo: 0.8, hi: 0.9, desc: "Prag anaerob, viteză", color: "#f97316" },
    { key: 5, label: "Z5 · Maxim (VO₂max)", lo: 0.9, hi: 1.0, desc: "Efort maxim, doar intervale scurte", color: "#dc2626" },
  ];

  let rez = $derived.by(() => {
    const a = parseInt(varsta, 10);
    const r = parseInt(repaus, 10);
    if (!Number.isInteger(a) || a < 5 || a > 120) return null;
    const hrMax = 220 - a;
    const hrMaxTanaka = Math.round(208 - 0.7 * a);
    const hrRest = Number.isInteger(r) && r >= 30 && r <= 120 ? r : null;
    const hrr = hrRest !== null ? hrMax - hrRest : null;

    const zone = ZONE.map((z) => {
      let lo: number, hi: number;
      if (hrRest !== null && hrr !== null) {
        lo = Math.round(hrr * z.lo + hrRest);
        hi = Math.round(hrr * z.hi + hrRest);
      } else {
        lo = Math.round(hrMax * z.lo);
        hi = Math.round(hrMax * z.hi);
      }
      return { ...z, lo, hi };
    });
    return { hrMax, hrMaxTanaka, hrRest, hrr, zone, karvonen: hrRest !== null };
  });
</script>

<div class="puls">
  <div class="puls__inputs">
    <label class="puls__field">
      <span>Vârstă (ani)</span>
      <input type="number" min="5" max="120" bind:value={varsta} />
    </label>
    <label class="puls__field">
      <span>Puls de repaus (bpm) — opțional</span>
      <input type="number" min="30" max="120" bind:value={repaus} />
    </label>
  </div>

  {#if rez}
    <div class="puls__max">
      <div class="puls__max-card">
        <span>Puls maxim (220 − vârstă)</span>
        <strong>{rez.hrMax} <small>bpm</small></strong>
      </div>
      <div class="puls__max-card">
        <span>Formula Tanaka (mai precisă)</span>
        <strong>{rez.hrMaxTanaka} <small>bpm</small></strong>
      </div>
    </div>

    <p class="puls__method">
      {rez.karvonen
        ? `Zone calculate prin metoda Karvonen (rezerva de puls = ${rez.hrr} bpm).`
        : "Zone calculate ca procent din pulsul maxim. Adaugă pulsul de repaus pentru metoda Karvonen (mai exactă)."}
    </p>

    <div class="puls__zones">
      {#each rez.zone as z}
        <div class="puls__zone" style="--zc: {z.color}">
          <div class="puls__zone-head">
            <span class="puls__zone-label">{z.label}</span>
            <span class="puls__zone-range">{z.lo}–{z.hi} bpm</span>
          </div>
          <span class="puls__zone-desc">{z.desc} · {z.key * 10 + 40}–{z.key * 10 + 50}% HRR</span>
        </div>
      {/each}
    </div>
  {:else}
    <p class="puls__hint">Introdu vârsta (5–120 ani) pentru a calcula zonele de puls.</p>
  {/if}

  <p class="puls__disclaimer">
    <strong>⚠️ Disclaimer:</strong> valorile sunt estimări pe baza unor formule generale și pot diferi de pulsul tău real.
    Pentru antrenament intens sau dacă ai afecțiuni cardiace, consultă medicul sau un antrenor autorizat.
  </p>
</div>

<style>
  .puls { --accent: var(--cat-sanatate, #e11d48); display: flex; flex-direction: column; gap: var(--sp-4, 1rem); padding: var(--sp-5, 1.25rem); background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--r-lg); }
  .puls__inputs { display: flex; flex-wrap: wrap; gap: var(--sp-3, 0.75rem); }
  .puls__field { display: flex; flex-direction: column; gap: 0.3rem; flex: 1; min-width: 180px; }
  .puls__field span { font-size: 0.8rem; color: var(--text-muted); }
  .puls__field input { padding: 0.55rem 0.7rem; border: 1px solid var(--border); background: var(--bg-input); color: var(--text); border-radius: var(--r-md); font: inherit; outline: none; }
  .puls__field input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 18%, transparent); }
  .puls__max { display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-3, 0.75rem); }
  @media (max-width: 480px) { .puls__max { grid-template-columns: 1fr; } }
  .puls__max-card { display: flex; flex-direction: column; gap: 0.2rem; align-items: center; text-align: center; padding: var(--sp-4, 1rem); background: color-mix(in srgb, var(--accent) 10%, transparent); border-radius: var(--r-md); }
  .puls__max-card span { font-size: 0.78rem; color: var(--text-muted); }
  .puls__max-card strong { font-size: 1.8rem; color: var(--accent); font-family: var(--font-mono); }
  .puls__max-card strong small { font-size: 0.8rem; font-weight: 500; color: var(--text-muted); }
  .puls__method { font-size: 0.82rem; color: var(--text-muted); margin: 0; text-align: center; }
  .puls__zones { display: flex; flex-direction: column; gap: var(--sp-2, 0.5rem); }
  .puls__zone { border-left: 4px solid var(--zc); background: var(--bg-input); border-radius: var(--r-md); padding: 0.6rem 0.8rem; }
  .puls__zone-head { display: flex; justify-content: space-between; align-items: baseline; gap: 0.5rem; flex-wrap: wrap; }
  .puls__zone-label { font-weight: 700; color: var(--text); }
  .puls__zone-range { font-family: var(--font-mono); color: var(--zc); font-weight: 700; }
  .puls__zone-desc { font-size: 0.8rem; color: var(--text-muted); }
  .puls__hint { text-align: center; color: var(--text-muted); padding: var(--sp-3, 0.75rem); }
  .puls__disclaimer { margin: 0; font-size: 0.82rem; color: var(--text-muted); padding: var(--sp-3, 0.75rem); background: color-mix(in srgb, #f59e0b 12%, transparent); border-radius: var(--r-md); }
</style>
