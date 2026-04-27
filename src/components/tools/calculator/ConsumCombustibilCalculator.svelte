<script lang="ts">
  // ============================================================
  // ConsumCombustibilCalculator.svelte – consum carburant l/100km
  // Port: math reference uzemanyag-fogyasztas-kalkulator.tsx, RO-localizat.
  // 3 moduri:
  //   • "Calcul consum"  – km parcursi + litri folosiți → l/100km
  //   • "Litri necesari" – l/100km + km de parcurs → litri necesari
  //   • "Cost total"     – l/100km + km + preț/l → cost total
  // Bonus: l/100km ↔ mpg conversion + RO carburant presets 2026
  // ============================================================

  type Mode = "consum" | "litri" | "cost";
  const MODES: { key: Mode; icon: string; label: string; desc: string }[] = [
    { key: "consum", icon: "📊", label: "Calcul consum",  desc: "Din km și litri folosiți" },
    { key: "litri",  icon: "⛽", label: "Litri necesari", desc: "Pentru un drum planificat" },
    { key: "cost",   icon: "💰", label: "Cost total",     desc: "Câți lei pe drum" },
  ];

  let mode: Mode = $state("consum");

  // Mode 1: km + liters → l/100km
  let kmRaw = $state("450");
  let litriUsedRaw = $state("32");

  // Mode 2 + 3: l/100km + km
  let consumRaw = $state("7,2");
  let kmDrumRaw = $state("500");

  // Mode 3: price
  let pretRaw = $state("7,50");

  function parse(v: string): number {
    const cleaned = v.replace(/\s/g, "").replace(/\./g, "").replace(",", ".");
    const n = parseFloat(cleaned);
    return Number.isFinite(n) ? n : NaN;
  }
  function fmt(n: number, d = 2): string {
    if (!Number.isFinite(n)) return "–";
    return n.toLocaleString("ro-RO", { minimumFractionDigits: 0, maximumFractionDigits: d });
  }
  function fmtRon(n: number): string {
    if (!Number.isFinite(n)) return "–";
    return n.toLocaleString("ro-RO", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  // ─── Derived results ─────────────────────────────────────────
  let resConsum = $derived.by((): { l100km: number; mpgUS: number } => {
    const km = parse(kmRaw);
    const l = parse(litriUsedRaw);
    if (!Number.isFinite(km) || !Number.isFinite(l) || km <= 0) {
      return { l100km: NaN, mpgUS: NaN };
    }
    const l100km = (l / km) * 100;
    const mpgUS = l100km > 0 ? 235.21 / l100km : NaN;
    return { l100km, mpgUS };
  });

  let resLitri = $derived.by((): { litri: number; pretEstimat: number } => {
    const c = parse(consumRaw);
    const km = parse(kmDrumRaw);
    if (!Number.isFinite(c) || !Number.isFinite(km)) {
      return { litri: NaN, pretEstimat: NaN };
    }
    const litri = (c * km) / 100;
    const pret = parse(pretRaw);
    return { litri, pretEstimat: Number.isFinite(pret) ? litri * pret : NaN };
  });

  let resCost = $derived.by((): { litri: number; cost: number; costPerKm: number } => {
    const c = parse(consumRaw);
    const km = parse(kmDrumRaw);
    const p = parse(pretRaw);
    if (!Number.isFinite(c) || !Number.isFinite(km) || !Number.isFinite(p)) {
      return { litri: NaN, cost: NaN, costPerKm: NaN };
    }
    const litri = (c * km) / 100;
    const cost = litri * p;
    const costPerKm = km > 0 ? cost / km : NaN;
    return { litri, cost, costPerKm };
  });

  // RO carburant presets 2026 (lei/litru, valori medii)
  type CarbPreset = { label: string; pret: number; note: string };
  const CARB_PRESETS: CarbPreset[] = [
    { label: "Motorină", pret: 7.50, note: "Diesel standard" },
    { label: "Benzină 95", pret: 7.40, note: "Sortimente standard" },
    { label: "Benzină 98", pret: 7.90, note: "Premium octane" },
    { label: "GPL", pret: 3.80, note: "Auto LPG" },
  ];

  // Vehicle presets l/100km
  type CarPreset = { label: string; cons: number };
  const CAR_PRESETS: CarPreset[] = [
    { label: "Sedan economic", cons: 5.5 },
    { label: "Sedan mediu", cons: 7.0 },
    { label: "SUV mediu", cons: 8.5 },
    { label: "SUV mare", cons: 10.5 },
    { label: "Camionetă", cons: 12 },
  ];

  function applyCarb(p: CarbPreset) { pretRaw = String(p.pret).replace(".", ","); }
  function applyCar(c: CarPreset) { consumRaw = String(c.cons).replace(".", ","); }
</script>

<div class="cc">
  <div class="cc__header">
    <span class="cc__icon" aria-hidden="true">⛽</span>
    <div>
      <h2 class="cc__title">Calculator Consum Combustibil</h2>
      <p class="cc__sub">l/100 km · litri necesari · cost total · prețuri RO 2026</p>
    </div>
  </div>

  <!-- Mode tabs -->
  <div class="cc__tabs" role="tablist" aria-label="Mod de calcul">
    {#each MODES as m}
      <button
        type="button"
        class="cc__tab"
        class:is-active={mode === m.key}
        role="tab"
        aria-selected={mode === m.key}
        onclick={() => (mode = m.key)}
      >
        <span class="cc__tab-icon" aria-hidden="true">{m.icon}</span>
        <span class="cc__tab-text">
          <span class="cc__tab-label">{m.label}</span>
          <span class="cc__tab-desc">{m.desc}</span>
        </span>
      </button>
    {/each}
  </div>

  <!-- Mode 1: Calcul consum -->
  {#if mode === "consum"}
    <div class="cc__panel">
      <h3 class="cc__title-sub">Câți l/100 km consumă mașina ta?</h3>
      <div class="cc__inputs cc__inputs--two">
        <div class="cc__field">
          <label for="cc-km" class="cc__label">Distanță parcursă (km)</label>
          <input id="cc-km" type="text" inputmode="decimal" class="cc__input"
            value={kmRaw} oninput={(e) => (kmRaw = (e.target as HTMLInputElement).value)} placeholder="450" />
        </div>
        <div class="cc__field">
          <label for="cc-l" class="cc__label">Litri folosiți</label>
          <input id="cc-l" type="text" inputmode="decimal" class="cc__input"
            value={litriUsedRaw} oninput={(e) => (litriUsedRaw = (e.target as HTMLInputElement).value)} placeholder="32" />
        </div>
      </div>
      <div class="cc__results">
        <div class="cc__result cc__result--big">
          <span class="cc__result-label">Consum mediu</span>
          <span class="cc__result-value">{fmt(resConsum.l100km, 2)} l/100km</span>
        </div>
        <div class="cc__result">
          <span class="cc__result-label">Echivalent mpg (US)</span>
          <span class="cc__result-value">{fmt(resConsum.mpgUS, 1)} mpg</span>
        </div>
      </div>
      <div class="cc__formula">
        <strong>Formulă:</strong> consum = (litri ÷ km) × 100 &nbsp;|&nbsp; mpg = 235,21 ÷ consum
      </div>
    </div>
  {/if}

  <!-- Mode 2: Litri necesari -->
  {#if mode === "litri"}
    <div class="cc__panel">
      <h3 class="cc__title-sub">Câți litri ai nevoie pentru drumul tău?</h3>
      <div class="cc__inputs cc__inputs--two">
        <div class="cc__field">
          <label for="cc-cons" class="cc__label">Consum (l/100 km)</label>
          <input id="cc-cons" type="text" inputmode="decimal" class="cc__input"
            value={consumRaw} oninput={(e) => (consumRaw = (e.target as HTMLInputElement).value)} placeholder="7,2" />
          <div class="cc__chips">
            {#each CAR_PRESETS as c}
              <button type="button" class="cc__chip" onclick={() => applyCar(c)}>{c.label} ({String(c.cons).replace(".", ",")})</button>
            {/each}
          </div>
        </div>
        <div class="cc__field">
          <label for="cc-km2" class="cc__label">Distanță drum (km)</label>
          <input id="cc-km2" type="text" inputmode="decimal" class="cc__input"
            value={kmDrumRaw} oninput={(e) => (kmDrumRaw = (e.target as HTMLInputElement).value)} placeholder="500" />
        </div>
      </div>
      <div class="cc__results">
        <div class="cc__result cc__result--big">
          <span class="cc__result-label">Litri necesari</span>
          <span class="cc__result-value">{fmt(resLitri.litri, 2)} l</span>
        </div>
        {#if Number.isFinite(resLitri.pretEstimat)}
          <div class="cc__result">
            <span class="cc__result-label">Cost estimat (la {pretRaw} lei/l)</span>
            <span class="cc__result-value">{fmtRon(resLitri.pretEstimat)} lei</span>
          </div>
        {/if}
      </div>
      <div class="cc__formula">
        <strong>Formulă:</strong> litri = (consum × km) ÷ 100
      </div>
    </div>
  {/if}

  <!-- Mode 3: Cost total -->
  {#if mode === "cost"}
    <div class="cc__panel">
      <h3 class="cc__title-sub">Cât costă drumul în total?</h3>
      <div class="cc__inputs cc__inputs--three">
        <div class="cc__field">
          <label for="cc-cons2" class="cc__label">Consum (l/100 km)</label>
          <input id="cc-cons2" type="text" inputmode="decimal" class="cc__input"
            value={consumRaw} oninput={(e) => (consumRaw = (e.target as HTMLInputElement).value)} placeholder="7,2" />
        </div>
        <div class="cc__field">
          <label for="cc-km3" class="cc__label">Distanță (km)</label>
          <input id="cc-km3" type="text" inputmode="decimal" class="cc__input"
            value={kmDrumRaw} oninput={(e) => (kmDrumRaw = (e.target as HTMLInputElement).value)} placeholder="500" />
        </div>
        <div class="cc__field">
          <label for="cc-pret" class="cc__label">Preț (lei/l)</label>
          <input id="cc-pret" type="text" inputmode="decimal" class="cc__input"
            value={pretRaw} oninput={(e) => (pretRaw = (e.target as HTMLInputElement).value)} placeholder="7,50" />
          <div class="cc__chips">
            {#each CARB_PRESETS as p}
              <button type="button" class="cc__chip" onclick={() => applyCarb(p)} title={p.note}>{p.label} {String(p.pret).replace(".", ",")}</button>
            {/each}
          </div>
        </div>
      </div>
      <div class="cc__results">
        <div class="cc__result cc__result--big">
          <span class="cc__result-label">Cost total drum</span>
          <span class="cc__result-value">{fmtRon(resCost.cost)} lei</span>
        </div>
        <div class="cc__result">
          <span class="cc__result-label">Litri folosiți</span>
          <span class="cc__result-value">{fmt(resCost.litri, 2)} l</span>
        </div>
        <div class="cc__result">
          <span class="cc__result-label">Cost / km</span>
          <span class="cc__result-value">{fmtRon(resCost.costPerKm)} lei/km</span>
        </div>
      </div>
      <div class="cc__formula">
        <strong>Formulă:</strong> cost = (consum × km ÷ 100) × preț_litru
      </div>
    </div>
  {/if}

  <p class="cc__note">
    <strong>Notă:</strong> consumul real variază 10–25% față de cel din specificațiile WLTP
    (oraș vs autostradă, sezon, viteză, anvelope, AC). Prețurile carburant sunt orientative
    pentru România 2026 — variază cu locația și brand-ul (OMV/Petrom/MOL/Rompetrol/Lukoil).
  </p>
</div>

<style>
  .cc {
    display: flex; flex-direction: column; gap: var(--sp-4);
    padding: var(--sp-5); background: var(--bg-card);
    border: 1px solid var(--border); border-radius: var(--r-lg);
    --cc-accent: var(--cat-calculator, #4f46e5);
  }
  .cc__header {
    display: flex; gap: var(--sp-3); align-items: center;
    padding: var(--sp-3); background: var(--bg);
    border: 1px solid var(--border); border-radius: var(--r-md);
  }
  .cc__icon { font-size: 1.5rem; }
  .cc__title { margin: 0; font-size: 1rem; font-weight: 700; color: var(--text); }
  .cc__sub { margin: 2px 0 0 0; font-size: 0.8125rem; color: var(--text-muted); }
  .cc__title-sub {
    margin: 0; font-size: 1.0625rem; font-weight: 700; color: var(--text);
    text-align: center;
  }

  .cc__tabs { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--sp-2); }
  @media (max-width: 720px) { .cc__tabs { grid-template-columns: 1fr; } }
  .cc__tab {
    display: flex; align-items: center; gap: var(--sp-2);
    padding: var(--sp-2) var(--sp-3); cursor: pointer; text-align: left;
    background: var(--bg); color: var(--text);
    border: 2px solid var(--border); border-radius: var(--r-md);
    transition: all var(--t-fast);
  }
  .cc__tab:hover {
    border-color: color-mix(in srgb, var(--cc-accent) 55%, transparent);
    background: color-mix(in srgb, var(--cc-accent) 6%, var(--bg));
  }
  .cc__tab.is-active {
    border-color: var(--cc-accent);
    background: color-mix(in srgb, var(--cc-accent) 10%, var(--bg));
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--cc-accent) 18%, transparent);
  }
  .cc__tab-icon { font-size: 1.125rem; flex-shrink: 0; }
  .cc__tab-text { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
  .cc__tab-label { font-size: 0.875rem; font-weight: 700; color: var(--text); }
  .cc__tab-desc { font-size: 0.6875rem; color: var(--text-muted); line-height: 1.2; }

  .cc__panel { display: flex; flex-direction: column; gap: var(--sp-4); }

  .cc__inputs { display: grid; gap: var(--sp-3); }
  .cc__inputs--two { grid-template-columns: 1fr 1fr; }
  .cc__inputs--three { grid-template-columns: 1fr 1fr 1fr; }
  @media (max-width: 720px) {
    .cc__inputs--two, .cc__inputs--three { grid-template-columns: 1fr; }
  }

  .cc__field { display: flex; flex-direction: column; gap: var(--sp-2); }
  .cc__label { font-size: 0.8125rem; color: var(--text-muted); font-weight: 500; }
  .cc__input {
    width: 100%; padding: var(--sp-3); outline: none;
    background: var(--bg); color: var(--text);
    border: 2px solid var(--border); border-radius: var(--r-md);
    font-family: var(--font-mono); font-size: 1.25rem; font-weight: 700;
    text-align: center; transition: all var(--t-fast);
  }
  .cc__input:focus {
    border-color: var(--cc-accent);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--cc-accent) 22%, transparent);
  }
  .cc__chips { display: flex; flex-wrap: wrap; gap: 4px; }
  .cc__chip {
    padding: 3px 8px; font-size: 0.7rem; font-weight: 600;
    background: color-mix(in srgb, var(--cc-accent) 12%, transparent);
    color: var(--cc-accent);
    border: 1px solid transparent; border-radius: var(--r-full);
    cursor: pointer; transition: all var(--t-fast);
    font-family: var(--font-mono);
  }
  .cc__chip:hover { background: var(--cc-accent); color: #fff; }

  .cc__results { display: grid; grid-template-columns: 1.4fr 1fr 1fr; gap: var(--sp-3); }
  @media (max-width: 720px) { .cc__results { grid-template-columns: 1fr; } }
  .cc__result {
    display: flex; flex-direction: column; gap: 4px;
    padding: var(--sp-3);
    background: var(--bg); border: 1px solid var(--border);
    border-radius: var(--r-md);
  }
  .cc__result--big {
    background: color-mix(in srgb, var(--cc-accent) 12%, var(--bg));
    border-color: color-mix(in srgb, var(--cc-accent) 40%, transparent);
  }
  .cc__result-label { font-size: 0.75rem; color: var(--text-muted); font-weight: 600; }
  .cc__result-value {
    font-family: var(--font-mono); font-size: 1.25rem; font-weight: 800;
    color: var(--cc-accent);
  }
  .cc__result--big .cc__result-value { font-size: 1.5rem; }

  .cc__formula {
    text-align: center; font-size: 0.8125rem; color: var(--text-muted);
    padding: var(--sp-3); background: var(--bg); border-radius: var(--r-md);
    font-family: var(--font-mono);
  }
  .cc__note {
    margin: 0;
    font-size: 0.75rem; color: var(--text-subtle);
    padding: var(--sp-2) var(--sp-3); background: var(--bg);
    border-left: 3px solid color-mix(in srgb, var(--cc-accent) 50%, transparent);
    border-radius: var(--r-sm);
  }
</style>
