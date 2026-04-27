<script lang="ts">
  // ============================================================
  // ImcCalculator.svelte — Indicele de Masă Corporală (IMC / BMI)
  // Port: math reference BMIKalkulator.tsx, RO-localizat (WHO 2024).
  // Categorii WHO oficiale (adulți):
  //   <16     subponderal sever
  //   16–17   subponderal moderat
  //   17–18.5 subponderal ușor
  //   18.5–25 normal
  //   25–30   supraponderal
  //   30–35   obezitate gradul I
  //   35–40   obezitate gradul II
  //   ≥40     obezitate gradul III (morbidă)
  // Output: IMC + categorie + greutate ideală (18.5–24.9) + bara gradient.
  // ============================================================

  type Sex = "barbat" | "femeie";

  type Categorie = {
    min: number;
    max: number;
    label: string;
    color: string;       // CSS color (token)
    risc: string;
  };

  const CATEGORII: Categorie[] = [
    { min: 0,    max: 16,   label: "Subponderal sever",        color: "#dc2626", risc: "Foarte ridicat" },
    { min: 16,   max: 17,   label: "Subponderal moderat",      color: "#ea580c", risc: "Ridicat" },
    { min: 17,   max: 18.5, label: "Subponderal ușor",         color: "#f59e0b", risc: "Mediu" },
    { min: 18.5, max: 25,   label: "Greutate normală",         color: "#16a34a", risc: "Scăzut" },
    { min: 25,   max: 30,   label: "Supraponderal",            color: "#f59e0b", risc: "Mediu" },
    { min: 30,   max: 35,   label: "Obezitate gradul I",       color: "#ea580c", risc: "Ridicat" },
    { min: 35,   max: 40,   label: "Obezitate gradul II",      color: "#dc2626", risc: "Foarte ridicat" },
    { min: 40,   max: 100,  label: "Obezitate gradul III",     color: "#991b1b", risc: "Critic" },
  ];

  let sex: Sex = $state("barbat");
  let inaltimeRaw = $state("175");
  let greutateRaw = $state("75");

  function parse(v: string): number {
    const cleaned = v.replace(/\s/g, "").replace(",", ".");
    const n = parseFloat(cleaned);
    return Number.isFinite(n) ? n : NaN;
  }
  function fmt(n: number, d = 1): string {
    if (!Number.isFinite(n)) return "–";
    return n.toLocaleString("ro-RO", { minimumFractionDigits: d, maximumFractionDigits: d });
  }

  let imc = $derived.by((): number => {
    const h = parse(inaltimeRaw);
    const w = parse(greutateRaw);
    if (!Number.isFinite(h) || !Number.isFinite(w) || h <= 0 || w <= 0) return NaN;
    const m = h / 100;
    return w / (m * m);
  });

  let categorie = $derived.by((): Categorie => {
    if (!Number.isFinite(imc)) return CATEGORII[3];
    return CATEGORII.find((c) => imc >= c.min && imc < c.max) ?? CATEGORII[CATEGORII.length - 1];
  });

  let greutateIdeala = $derived.by((): { min: number; max: number } => {
    const h = parse(inaltimeRaw);
    if (!Number.isFinite(h) || h <= 0) return { min: NaN, max: NaN };
    const m = h / 100;
    return { min: 18.5 * m * m, max: 24.9 * m * m };
  });

  let diferenta = $derived.by((): { sign: "minus" | "plus" | "zero"; kg: number } => {
    const w = parse(greutateRaw);
    const ideal = greutateIdeala;
    if (!Number.isFinite(w) || !Number.isFinite(ideal.min)) return { sign: "zero", kg: 0 };
    if (w > ideal.max) return { sign: "minus", kg: w - ideal.max };
    if (w < ideal.min) return { sign: "plus", kg: ideal.min - w };
    return { sign: "zero", kg: 0 };
  });

  // Bar position: maps IMC 15→0% și 40→100%
  let markerPercent = $derived.by((): number => {
    if (!Number.isFinite(imc)) return 50;
    const p = ((imc - 15) / 25) * 100;
    return Math.max(0, Math.min(100, p));
  });

  const PRESET_INALTIME = [155, 160, 165, 170, 175, 180, 185, 190];
  const PRESET_GREUTATE = [50, 60, 70, 80, 90, 100];
</script>

<div class="imc">
  <div class="imc__header">
    <span class="imc__icon" aria-hidden="true">⚖️</span>
    <div>
      <h2 class="imc__title">Calculator IMC (Indice Masă Corporală)</h2>
      <p class="imc__sub">Clasificare WHO oficială + greutate ideală pentru adulți (peste 18 ani)</p>
    </div>
  </div>

  <!-- Sex selector -->
  <div class="imc__section">
    <span class="imc__section-label">1. Sex</span>
    <div class="imc__sex" role="radiogroup" aria-label="Sex">
      <button
        type="button"
        class="imc__sex-btn"
        class:is-active={sex === "barbat"}
        role="radio"
        aria-checked={sex === "barbat"}
        onclick={() => (sex = "barbat")}
      >
        <span class="imc__sex-icon" aria-hidden="true">👨</span>
        <span class="imc__sex-label">Bărbat</span>
      </button>
      <button
        type="button"
        class="imc__sex-btn"
        class:is-active={sex === "femeie"}
        role="radio"
        aria-checked={sex === "femeie"}
        onclick={() => (sex = "femeie")}
      >
        <span class="imc__sex-icon" aria-hidden="true">👩</span>
        <span class="imc__sex-label">Femeie</span>
      </button>
    </div>
    <p class="imc__sex-note">Notă: IMC clasic WHO nu folosește sex în formulă, dar pragurile interpretative pot diferi minor în literatura medicală RO.</p>
  </div>

  <!-- Înălțime + Greutate -->
  <div class="imc__inputs">
    <div class="imc__field">
      <label for="imc-inaltime" class="imc__label">Înălțime</label>
      <div class="imc__input-wrap">
        <input
          id="imc-inaltime"
          type="text"
          inputmode="decimal"
          value={inaltimeRaw}
          oninput={(e) => (inaltimeRaw = (e.target as HTMLInputElement).value)}
          placeholder="ex. 175"
          class="imc__input"
        />
        <span class="imc__suffix">cm</span>
      </div>
      <div class="imc__presets">
        {#each PRESET_INALTIME as p}
          <button type="button" class="imc__chip" onclick={() => (inaltimeRaw = String(p))}>{p}</button>
        {/each}
      </div>
    </div>

    <div class="imc__field">
      <label for="imc-greutate" class="imc__label">Greutate</label>
      <div class="imc__input-wrap">
        <input
          id="imc-greutate"
          type="text"
          inputmode="decimal"
          value={greutateRaw}
          oninput={(e) => (greutateRaw = (e.target as HTMLInputElement).value)}
          placeholder="ex. 75"
          class="imc__input"
        />
        <span class="imc__suffix">kg</span>
      </div>
      <div class="imc__presets">
        {#each PRESET_GREUTATE as p}
          <button type="button" class="imc__chip" onclick={() => (greutateRaw = String(p))}>{p}</button>
        {/each}
      </div>
    </div>
  </div>

  <!-- Rezultat principal -->
  <div class="imc__result-main" style="--cat-color: {categorie.color}">
    <div class="imc__result-row">
      <div class="imc__result-block">
        <span class="imc__result-label">IMC-ul tău</span>
        <span class="imc__result-value">{fmt(imc, 1)}</span>
        <span class="imc__result-unit">kg/m²</span>
      </div>
      <div class="imc__result-block imc__result-block--cat">
        <span class="imc__result-label">Categorie WHO</span>
        <span class="imc__result-cat">{categorie.label}</span>
        <span class="imc__result-risc">Risc: {categorie.risc}</span>
      </div>
    </div>
  </div>

  <!-- Bara gradient WHO -->
  <div class="imc__scale" aria-label="Scala IMC WHO" role="img">
    <div class="imc__scale-bar">
      <span class="imc__scale-zone imc__scale-zone--1" style="width: 14%"></span>
      <span class="imc__scale-zone imc__scale-zone--2" style="width: 26%"></span>
      <span class="imc__scale-zone imc__scale-zone--3" style="width: 20%"></span>
      <span class="imc__scale-zone imc__scale-zone--4" style="width: 20%"></span>
      <span class="imc__scale-zone imc__scale-zone--5" style="width: 20%"></span>
      {#if Number.isFinite(imc)}
        <span class="imc__scale-marker" style="left: {markerPercent}%" aria-label="Marker IMC">
          <span class="imc__scale-marker-bubble">{fmt(imc, 1)}</span>
          <span class="imc__scale-marker-arrow" aria-hidden="true"></span>
        </span>
      {/if}
    </div>
    <div class="imc__scale-labels">
      <span>15</span>
      <span>18,5</span>
      <span>25</span>
      <span>30</span>
      <span>35</span>
      <span>40+</span>
    </div>
    <div class="imc__scale-legend">
      <span class="imc__legend"><span class="imc__legend-dot" style="--c: #f59e0b"></span> subponderal</span>
      <span class="imc__legend"><span class="imc__legend-dot" style="--c: #16a34a"></span> normal</span>
      <span class="imc__legend"><span class="imc__legend-dot" style="--c: #f59e0b"></span> supraponderal</span>
      <span class="imc__legend"><span class="imc__legend-dot" style="--c: #ea580c"></span> obez I</span>
      <span class="imc__legend"><span class="imc__legend-dot" style="--c: #dc2626"></span> obez II/III</span>
    </div>
  </div>

  <!-- Greutate ideală + Diferență -->
  <div class="imc__cards">
    <div class="imc__card">
      <span class="imc__card-label">Greutate ideală (18,5–24,9 IMC)</span>
      <span class="imc__card-value">
        {fmt(greutateIdeala.min, 0)} – {fmt(greutateIdeala.max, 0)} <small>kg</small>
      </span>
    </div>
    <div class="imc__card">
      <span class="imc__card-label">Diferența față de tartamentul ideal</span>
      {#if diferenta.sign === "zero"}
        <span class="imc__card-value imc__card-value--ok">În interval ✓</span>
      {:else if diferenta.sign === "minus"}
        <span class="imc__card-value imc__card-value--warn">−{fmt(diferenta.kg, 1)} kg</span>
      {:else}
        <span class="imc__card-value imc__card-value--info">+{fmt(diferenta.kg, 1)} kg</span>
      {/if}
    </div>
  </div>

  <div class="imc__formula">
    <strong>Formula WHO:</strong> IMC = greutate (kg) / înălțime² (m²)
  </div>

  <p class="imc__note">
    <strong>⚠️ Disclaimer:</strong> IMC este un indicator de screening, nu un diagnostic. Nu ține cont de masa musculară, distribuția grăsimii (talie/șold) sau densitatea osoasă. Pentru interpretare completă, consultă un medic sau nutriționist.
  </p>
</div>

<style>
  .imc {
    display: flex; flex-direction: column; gap: var(--sp-4);
    padding: var(--sp-5); background: var(--bg-card);
    border: 1px solid var(--border); border-radius: var(--r-lg);
    --imc-accent: var(--cat-sanatate, #e11d48);
  }
  .imc__header {
    display: flex; gap: var(--sp-3); align-items: center;
    padding: var(--sp-3); background: var(--bg);
    border: 1px solid var(--border); border-radius: var(--r-md);
  }
  .imc__icon { font-size: 1.5rem; }
  .imc__title { margin: 0; font-size: 1rem; font-weight: 700; color: var(--text); }
  .imc__sub { margin: 2px 0 0 0; font-size: 0.8125rem; color: var(--text-muted); }

  .imc__section { display: flex; flex-direction: column; gap: var(--sp-2); }
  .imc__section-label {
    font-size: 0.75rem; font-weight: 700; color: var(--text-muted);
    text-transform: uppercase; letter-spacing: 0.04em;
  }
  .imc__sex { display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-2); }
  .imc__sex-btn {
    display: flex; align-items: center; justify-content: center; gap: var(--sp-2);
    padding: var(--sp-3); cursor: pointer;
    background: var(--bg); border: 2px solid var(--border);
    border-radius: var(--r-md); color: var(--text);
    transition: all var(--t-fast);
  }
  .imc__sex-btn:hover {
    border-color: color-mix(in srgb, var(--imc-accent) 55%, transparent);
    background: color-mix(in srgb, var(--imc-accent) 6%, var(--bg));
  }
  .imc__sex-btn.is-active {
    border-color: var(--imc-accent);
    background: color-mix(in srgb, var(--imc-accent) 12%, var(--bg));
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--imc-accent) 18%, transparent);
  }
  .imc__sex-icon { font-size: 1.25rem; }
  .imc__sex-label { font-size: 0.875rem; font-weight: 700; }
  .imc__sex-note {
    margin: 0; font-size: 0.6875rem; color: var(--text-subtle); line-height: 1.4;
  }

  .imc__inputs {
    display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-3);
  }
  @media (max-width: 640px) { .imc__inputs { grid-template-columns: 1fr; } }
  .imc__field { display: flex; flex-direction: column; gap: var(--sp-2); }
  .imc__label { font-size: 0.8125rem; color: var(--text-muted); font-weight: 500; }
  .imc__input-wrap {
    position: relative;
    background: var(--bg); border: 2px solid var(--border);
    border-radius: var(--r-md); padding: var(--sp-3) var(--sp-5) var(--sp-3) var(--sp-3);
    transition: border-color var(--t-fast);
  }
  .imc__input-wrap:focus-within {
    border-color: var(--imc-accent);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--imc-accent) 18%, transparent);
  }
  .imc__input {
    width: 100%; border: none; background: transparent;
    color: var(--text); font-size: 1.5rem; font-weight: 700;
    font-family: var(--font-mono); text-align: center; outline: none;
  }
  .imc__suffix {
    position: absolute; right: var(--sp-3); top: 50%; transform: translateY(-50%);
    color: var(--text-subtle); font-weight: 600; font-size: 0.8125rem;
  }
  .imc__presets {
    display: flex; flex-wrap: wrap; gap: 6px;
  }
  .imc__chip {
    padding: 3px 10px; font-size: 0.75rem; font-weight: 600;
    background: color-mix(in srgb, var(--imc-accent) 12%, transparent);
    color: var(--imc-accent);
    border: 1px solid transparent; border-radius: var(--r-full);
    cursor: pointer; font-family: var(--font-mono);
    transition: all var(--t-fast);
  }
  .imc__chip:hover { background: var(--imc-accent); color: #fff; }

  .imc__result-main {
    padding: var(--sp-4);
    background: color-mix(in srgb, var(--cat-color, var(--imc-accent)) 10%, var(--bg));
    border: 2px solid color-mix(in srgb, var(--cat-color, var(--imc-accent)) 35%, transparent);
    border-radius: var(--r-md);
    transition: all var(--t-fast);
  }
  .imc__result-row {
    display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-3); align-items: center;
  }
  @media (max-width: 640px) { .imc__result-row { grid-template-columns: 1fr; } }
  .imc__result-block { display: flex; flex-direction: column; gap: 2px; text-align: center; }
  .imc__result-label { font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.04em; font-weight: 700; }
  .imc__result-value { font-family: var(--font-mono); font-size: 2.5rem; font-weight: 800; color: var(--cat-color, var(--imc-accent)); line-height: 1; }
  .imc__result-unit { font-size: 0.875rem; color: var(--text-muted); font-family: var(--font-mono); }
  .imc__result-cat { font-size: 1.125rem; font-weight: 800; color: var(--cat-color, var(--imc-accent)); }
  .imc__result-risc { font-size: 0.8125rem; color: var(--text-muted); }

  .imc__scale {
    display: flex; flex-direction: column; gap: var(--sp-2);
    padding: var(--sp-4) var(--sp-3) var(--sp-3) var(--sp-3);
    background: var(--bg); border: 1px solid var(--border); border-radius: var(--r-md);
  }
  .imc__scale-bar {
    position: relative;
    display: flex; height: 14px;
    border-radius: var(--r-full); overflow: hidden;
    background: var(--bg-card);
  }
  .imc__scale-zone { display: block; height: 100%; }
  .imc__scale-zone--1 { background: linear-gradient(to right, #f59e0b 0%, #fbbf24 100%); }
  .imc__scale-zone--2 { background: #16a34a; }
  .imc__scale-zone--3 { background: #f59e0b; }
  .imc__scale-zone--4 { background: #ea580c; }
  .imc__scale-zone--5 { background: linear-gradient(to right, #dc2626 0%, #991b1b 100%); }
  .imc__scale-marker {
    position: absolute; top: -22px; transform: translateX(-50%);
    display: flex; flex-direction: column; align-items: center; gap: 2px;
    transition: left var(--t-fast);
  }
  .imc__scale-marker-bubble {
    padding: 2px 8px; font-size: 0.75rem; font-weight: 700;
    background: var(--text); color: var(--bg);
    border-radius: var(--r-sm); font-family: var(--font-mono);
    white-space: nowrap;
  }
  .imc__scale-marker-arrow {
    width: 0; height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 8px solid var(--text);
    margin-top: -2px;
  }
  .imc__scale-labels {
    display: flex; justify-content: space-between;
    font-size: 0.6875rem; color: var(--text-subtle);
    font-family: var(--font-mono);
  }
  .imc__scale-legend {
    display: flex; flex-wrap: wrap; gap: var(--sp-3);
    justify-content: center; padding-top: var(--sp-2);
    border-top: 1px solid var(--border);
    font-size: 0.6875rem; color: var(--text-muted);
  }
  .imc__legend { display: inline-flex; align-items: center; gap: 4px; }
  .imc__legend-dot {
    width: 8px; height: 8px; border-radius: var(--r-full); background: var(--c);
  }

  .imc__cards {
    display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-3);
  }
  @media (max-width: 640px) { .imc__cards { grid-template-columns: 1fr; } }
  .imc__card {
    display: flex; flex-direction: column; gap: 4px;
    padding: var(--sp-3);
    background: var(--bg); border: 1px solid var(--border); border-radius: var(--r-md);
  }
  .imc__card-label { font-size: 0.75rem; color: var(--text-muted); font-weight: 600; }
  .imc__card-value {
    font-family: var(--font-mono); font-size: 1.125rem; font-weight: 700;
    color: var(--imc-accent);
  }
  .imc__card-value--ok { color: #16a34a; }
  .imc__card-value--warn { color: #ea580c; }
  .imc__card-value--info { color: #2563eb; }
  .imc__card-value small { font-size: 0.75rem; font-weight: 500; color: var(--text-muted); }

  .imc__formula {
    text-align: center; font-size: 0.8125rem; color: var(--text-muted);
    padding: var(--sp-3); background: var(--bg); border-radius: var(--r-md);
    font-family: var(--font-mono);
  }
  .imc__note {
    margin: 0;
    font-size: 0.75rem; color: var(--text-subtle);
    padding: var(--sp-2) var(--sp-3); background: var(--bg);
    border-left: 3px solid color-mix(in srgb, var(--imc-accent) 50%, transparent);
    border-radius: var(--r-sm); line-height: 1.5;
  }
</style>
