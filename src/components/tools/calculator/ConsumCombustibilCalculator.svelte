<script lang="ts">
  // ============================================================
  // ConsumCombustibilCalculator.svelte – consum carburant l/100km + CO₂
  // 3 moduri:
  //   • "Calcul consum"  – km parcursi + litri folosiți → l/100km, CO₂, masă
  //   • "Litri necesari" – l/100km + km de parcurs → litri necesari, CO₂
  //   • "Cost total"     – l/100km + km + preț/l + pasageri → cost, CO₂, cost/pers
  // 4 tipuri de carburant cu densitate ρ și factor CO₂ (constante europene):
  //   Benzină 0,745 kg/l, 2,31 kg CO₂/l
  //   Motorină 0,832 kg/l, 2,68 kg CO₂/l
  //   GPL      0,493 kg/l, 1,51 kg CO₂/l
  //   Benzină 98 0,755 kg/l, 2,33 kg CO₂/l (premium)
  // ============================================================

  type Mode = "consum" | "litri" | "cost";
  const MODES: { key: Mode; icon: string; label: string; desc: string }[] = [
    { key: "consum", icon: "📊", label: "Calcul consum",  desc: "Din km și litri folosiți" },
    { key: "litri",  icon: "⛽", label: "Litri necesari", desc: "Pentru un drum planificat" },
    { key: "cost",   icon: "💰", label: "Cost total",     desc: "Câți lei pe drum" },
  ];

  // Tipuri de carburant cu factori standard europeni
  type FuelKey = "benzina" | "benzina98" | "motorina" | "gpl";
  type Fuel = {
    key: FuelKey;
    label: string;
    icon: string;
    density: number;     // kg/litru
    co2: number;         // kg CO₂/litru
    defaultPret: number; // lei/litru (RO 2026)
  };
  const FUELS: Fuel[] = [
    { key: "benzina",   label: "Benzină 95", icon: "⛽", density: 0.745, co2: 2.31, defaultPret: 7.40 },
    { key: "benzina98", label: "Benzină 98", icon: "✨", density: 0.755, co2: 2.33, defaultPret: 7.90 },
    { key: "motorina",  label: "Motorină",   icon: "🚛", density: 0.832, co2: 2.68, defaultPret: 7.50 },
    { key: "gpl",       label: "GPL",        icon: "🟢", density: 0.493, co2: 1.51, defaultPret: 3.80 },
  ];

  let mode: Mode = $state("consum");
  let fuelKey: FuelKey = $state("motorina");

  let fuel = $derived(FUELS.find((f) => f.key === fuelKey) ?? FUELS[0]);

  // Mode 1: km + liters → l/100km
  let kmRaw = $state("450");
  let litriUsedRaw = $state("32");

  // Mode 2 + 3: l/100km + km
  let consumRaw = $state("7,2");
  let kmDrumRaw = $state("500");

  // Mode 3: price + passengers
  let pretRaw = $state("7,50");
  let pasageriRaw = $state("1");

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

  function selectFuel(f: Fuel) {
    fuelKey = f.key;
    pretRaw = String(f.defaultPret).replace(".", ",");
  }

  // ─── Derived results ─────────────────────────────────────────
  let resConsum = $derived.by((): {
    l100km: number; mpgUS: number; kmPerL: number; masa: number; co2: number;
  } => {
    const km = parse(kmRaw);
    const l = parse(litriUsedRaw);
    if (!Number.isFinite(km) || !Number.isFinite(l) || km <= 0) {
      return { l100km: NaN, mpgUS: NaN, kmPerL: NaN, masa: NaN, co2: NaN };
    }
    const l100km = (l / km) * 100;
    const mpgUS = l100km > 0 ? 235.21 / l100km : NaN;
    const kmPerL = l > 0 ? km / l : NaN;
    const masa = l * fuel.density;
    const co2 = l * fuel.co2;
    return { l100km, mpgUS, kmPerL, masa, co2 };
  });

  let resLitri = $derived.by((): {
    litri: number; pretEstimat: number; masa: number; co2: number;
  } => {
    const c = parse(consumRaw);
    const km = parse(kmDrumRaw);
    if (!Number.isFinite(c) || !Number.isFinite(km)) {
      return { litri: NaN, pretEstimat: NaN, masa: NaN, co2: NaN };
    }
    const litri = (c * km) / 100;
    const pret = parse(pretRaw);
    const masa = litri * fuel.density;
    const co2 = litri * fuel.co2;
    return {
      litri,
      pretEstimat: Number.isFinite(pret) ? litri * pret : NaN,
      masa,
      co2,
    };
  });

  let resCost = $derived.by((): {
    litri: number; cost: number; costPerKm: number;
    masa: number; co2: number; costPerPasager: number;
  } => {
    const c = parse(consumRaw);
    const km = parse(kmDrumRaw);
    const p = parse(pretRaw);
    const pax = parse(pasageriRaw);
    if (!Number.isFinite(c) || !Number.isFinite(km) || !Number.isFinite(p)) {
      return {
        litri: NaN, cost: NaN, costPerKm: NaN,
        masa: NaN, co2: NaN, costPerPasager: NaN,
      };
    }
    const litri = (c * km) / 100;
    const cost = litri * p;
    const costPerKm = km > 0 ? cost / km : NaN;
    const masa = litri * fuel.density;
    const co2 = litri * fuel.co2;
    const paxValid = Number.isFinite(pax) && pax >= 1 ? pax : 1;
    const costPerPasager = cost / paxValid;
    return { litri, cost, costPerKm, masa, co2, costPerPasager };
  });

  // Vehicle presets l/100km
  type CarPreset = { label: string; cons: number };
  const CAR_PRESETS: CarPreset[] = [
    { label: "Sedan economic", cons: 5.5 },
    { label: "Sedan mediu", cons: 7.0 },
    { label: "SUV mediu", cons: 8.5 },
    { label: "SUV mare", cons: 10.5 },
    { label: "Camionetă", cons: 12 },
  ];

  function applyCar(c: CarPreset) { consumRaw = String(c.cons).replace(".", ","); }
</script>

<div class="cc">
  <div class="cc__header">
    <span class="cc__icon" aria-hidden="true">⛽</span>
    <div>
      <h2 class="cc__title">Calculator Consum Combustibil + CO₂</h2>
      <p class="cc__sub">l/100 km · litri necesari · cost · emisii CO₂ · prețuri RO 2026</p>
    </div>
  </div>

  <!-- Fuel type selector (always visible) -->
  <div class="cc__fuel" role="radiogroup" aria-label="Tip carburant">
    <span class="cc__fuel-title">Tip carburant:</span>
    <div class="cc__fuel-grid">
      {#each FUELS as f}
        <button
          type="button"
          class="cc__fuel-btn"
          class:is-active={fuelKey === f.key}
          role="radio"
          aria-checked={fuelKey === f.key}
          onclick={() => selectFuel(f)}
          title={`ρ = ${f.density} kg/l · ${f.co2} kg CO₂/l · preț ~${String(f.defaultPret).replace(".", ",")} lei/l`}
        >
          <span class="cc__fuel-icon" aria-hidden="true">{f.icon}</span>
          <span class="cc__fuel-text">
            <span class="cc__fuel-label">{f.label}</span>
            <span class="cc__fuel-meta">{String(f.co2).replace(".", ",")} kg CO₂/l</span>
          </span>
        </button>
      {/each}
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
          <label for="cc-l" class="cc__label">Litri folosiți ({fuel.label})</label>
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
          <span class="cc__result-label">Eficiență</span>
          <span class="cc__result-value">{fmt(resConsum.kmPerL, 2)} km/l</span>
        </div>
        <div class="cc__result">
          <span class="cc__result-label">Echivalent mpg (US)</span>
          <span class="cc__result-value">{fmt(resConsum.mpgUS, 1)} mpg</span>
        </div>
      </div>
      <div class="cc__results cc__results--eco">
        <div class="cc__result cc__result--eco">
          <span class="cc__result-label">🌍 Emisii CO₂</span>
          <span class="cc__result-value">{fmt(resConsum.co2, 2)} kg</span>
        </div>
        <div class="cc__result cc__result--eco">
          <span class="cc__result-label">⚖️ Masă combustibil</span>
          <span class="cc__result-value">{fmt(resConsum.masa, 2)} kg</span>
        </div>
      </div>
      <div class="cc__formula">
        <strong>Formule:</strong> consum = (l ÷ km) × 100 &nbsp;|&nbsp; CO₂ = l × {String(fuel.co2).replace(".", ",")} &nbsp;|&nbsp; masă = l × {String(fuel.density).replace(".", ",")}
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
          <span class="cc__result-label">Litri necesari ({fuel.label})</span>
          <span class="cc__result-value">{fmt(resLitri.litri, 2)} l</span>
        </div>
        {#if Number.isFinite(resLitri.pretEstimat)}
          <div class="cc__result">
            <span class="cc__result-label">Cost estimat (la {pretRaw} lei/l)</span>
            <span class="cc__result-value">{fmtRon(resLitri.pretEstimat)} lei</span>
          </div>
        {/if}
      </div>
      <div class="cc__results cc__results--eco">
        <div class="cc__result cc__result--eco">
          <span class="cc__result-label">🌍 Emisii CO₂</span>
          <span class="cc__result-value">{fmt(resLitri.co2, 2)} kg</span>
        </div>
        <div class="cc__result cc__result--eco">
          <span class="cc__result-label">⚖️ Masă combustibil</span>
          <span class="cc__result-value">{fmt(resLitri.masa, 2)} kg</span>
        </div>
      </div>
      <div class="cc__formula">
        <strong>Formule:</strong> litri = (consum × km) ÷ 100 &nbsp;|&nbsp; CO₂ = litri × {String(fuel.co2).replace(".", ",")}
      </div>
    </div>
  {/if}

  <!-- Mode 3: Cost total -->
  {#if mode === "cost"}
    <div class="cc__panel">
      <h3 class="cc__title-sub">Cât costă drumul în total?</h3>
      <div class="cc__inputs cc__inputs--four">
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
          <label for="cc-pret" class="cc__label">Preț {fuel.label} (lei/l)</label>
          <input id="cc-pret" type="text" inputmode="decimal" class="cc__input"
            value={pretRaw} oninput={(e) => (pretRaw = (e.target as HTMLInputElement).value)} placeholder="7,50" />
        </div>
        <div class="cc__field">
          <label for="cc-pax" class="cc__label">Pasageri (cu șofer)</label>
          <input id="cc-pax" type="text" inputmode="numeric" class="cc__input"
            value={pasageriRaw} oninput={(e) => (pasageriRaw = (e.target as HTMLInputElement).value)} placeholder="1" />
        </div>
      </div>
      <div class="cc__results">
        <div class="cc__result cc__result--big">
          <span class="cc__result-label">Cost total drum</span>
          <span class="cc__result-value">{fmtRon(resCost.cost)} lei</span>
        </div>
        <div class="cc__result">
          <span class="cc__result-label">Cost / pasager</span>
          <span class="cc__result-value">{fmtRon(resCost.costPerPasager)} lei</span>
        </div>
        <div class="cc__result">
          <span class="cc__result-label">Cost / km</span>
          <span class="cc__result-value">{fmtRon(resCost.costPerKm)} lei/km</span>
        </div>
      </div>
      <div class="cc__results cc__results--eco">
        <div class="cc__result cc__result--eco">
          <span class="cc__result-label">⛽ Litri folosiți</span>
          <span class="cc__result-value">{fmt(resCost.litri, 2)} l</span>
        </div>
        <div class="cc__result cc__result--eco">
          <span class="cc__result-label">🌍 Emisii CO₂</span>
          <span class="cc__result-value">{fmt(resCost.co2, 2)} kg</span>
        </div>
        <div class="cc__result cc__result--eco">
          <span class="cc__result-label">⚖️ Masă combustibil</span>
          <span class="cc__result-value">{fmt(resCost.masa, 2)} kg</span>
        </div>
      </div>
      <div class="cc__formula">
        <strong>Formule:</strong> cost = (consum × km ÷ 100) × preț &nbsp;|&nbsp; CO₂ = litri × {String(fuel.co2).replace(".", ",")}
      </div>
    </div>
  {/if}

  <p class="cc__note">
    <strong>Notă:</strong> consumul real variază 10–25% față de cel din specificațiile WLTP
    (oraș vs. autostradă, sezon, viteză, anvelope, AC). Constantele CO₂ și densitate
    provin din standarde europene EEA. Prețurile carburant sunt orientative pentru
    România 2026 — variază cu locația și brand-ul (OMV/Petrom/MOL/Rompetrol/Lukoil).
    GPL emite cu ~35% mai puțin CO₂/litru decât benzina, dar consumă cu ~25% mai multă
    cantitate pentru aceeași distanță.
  </p>
</div>

<style>
  .cc {
    display: flex; flex-direction: column; gap: var(--sp-4);
    padding: var(--sp-5); background: var(--bg-card);
    border: 1px solid var(--border); border-radius: var(--r-lg);
    --cc-accent: var(--cat-calculator, #4f46e5);
    --cc-eco: #16a34a;
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

  /* Fuel type selector */
  .cc__fuel {
    display: flex; flex-direction: column; gap: var(--sp-2);
    padding: var(--sp-3); background: var(--bg);
    border: 1px solid var(--border); border-radius: var(--r-md);
  }
  .cc__fuel-title {
    font-size: 0.8125rem; font-weight: 700; color: var(--text-muted);
    text-transform: uppercase; letter-spacing: 0.04em;
  }
  .cc__fuel-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--sp-2); }
  @media (max-width: 720px) { .cc__fuel-grid { grid-template-columns: repeat(2, 1fr); } }
  .cc__fuel-btn {
    display: flex; align-items: center; gap: var(--sp-2);
    padding: var(--sp-2) var(--sp-3); cursor: pointer; text-align: left;
    background: var(--bg-card); color: var(--text);
    border: 2px solid var(--border); border-radius: var(--r-md);
    transition: all var(--t-fast);
  }
  .cc__fuel-btn:hover {
    border-color: color-mix(in srgb, var(--cc-accent) 55%, transparent);
    background: color-mix(in srgb, var(--cc-accent) 6%, var(--bg-card));
  }
  .cc__fuel-btn.is-active {
    border-color: var(--cc-accent);
    background: color-mix(in srgb, var(--cc-accent) 10%, var(--bg-card));
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--cc-accent) 18%, transparent);
  }
  .cc__fuel-icon { font-size: 1.25rem; flex-shrink: 0; }
  .cc__fuel-text { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
  .cc__fuel-label { font-size: 0.875rem; font-weight: 700; color: var(--text); }
  .cc__fuel-meta { font-size: 0.6875rem; color: var(--text-muted); font-family: var(--font-mono); }

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
  .cc__inputs--four { grid-template-columns: repeat(4, 1fr); }
  @media (max-width: 720px) {
    .cc__inputs--two, .cc__inputs--three, .cc__inputs--four { grid-template-columns: 1fr; }
  }
  @media (min-width: 721px) and (max-width: 1024px) {
    .cc__inputs--four { grid-template-columns: 1fr 1fr; }
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
  .cc__results--eco { grid-template-columns: 1fr 1fr 1fr; }
  @media (max-width: 720px) {
    .cc__results, .cc__results--eco { grid-template-columns: 1fr; }
  }
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
  .cc__result--eco {
    background: color-mix(in srgb, var(--cc-eco) 8%, var(--bg));
    border-color: color-mix(in srgb, var(--cc-eco) 35%, transparent);
  }
  .cc__result-label { font-size: 0.75rem; color: var(--text-muted); font-weight: 600; }
  .cc__result-value {
    font-family: var(--font-mono); font-size: 1.25rem; font-weight: 800;
    color: var(--cc-accent);
  }
  .cc__result--big .cc__result-value { font-size: 1.5rem; }
  .cc__result--eco .cc__result-value { color: var(--cc-eco); }

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
