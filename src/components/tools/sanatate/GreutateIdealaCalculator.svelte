<script lang="ts">
  // ============================================================
  // GreutateIdealaCalculator.svelte — Greutate ideală RO
  // Port: math reference IdealisTestsulyKalkulator.tsx, RO-localizat.
  // 4 formule științifice paralel:
  //   • Devine (1974)   — cea mai folosită în farmacologie clinică
  //   • Robinson (1983) — actualizare a Devine
  //   • Miller (1983)   — variantă pentru constituții slabe
  //   • Hamwi (1964)    — referința istorică
  // Toate formulele folosesc înălțimea în inch deasupra a 5 ft (152.4 cm).
  // ============================================================

  type Sex = "barbat" | "femeie";

  type FormulaResult = {
    nume: string;
    an: string;
    valoare: number;
    descriere: string;
  };

  let sex: Sex = $state("barbat");
  let inaltimeRaw = $state("175");

  function parse(v: string): number {
    const cleaned = v.replace(/\s/g, "").replace(",", ".");
    const n = parseFloat(cleaned);
    return Number.isFinite(n) ? n : NaN;
  }
  function fmt(n: number, d = 1): string {
    if (!Number.isFinite(n)) return "–";
    return n.toLocaleString("ro-RO", { minimumFractionDigits: d, maximumFractionDigits: d });
  }

  function calcDevine(s: Sex, cm: number): number {
    const inch = (cm - 152.4) / 2.54;
    return s === "barbat" ? 50 + 2.3 * inch : 45.5 + 2.3 * inch;
  }
  function calcRobinson(s: Sex, cm: number): number {
    const inch = (cm - 152.4) / 2.54;
    return s === "barbat" ? 52 + 1.9 * inch : 49 + 1.7 * inch;
  }
  function calcMiller(s: Sex, cm: number): number {
    const inch = (cm - 152.4) / 2.54;
    return s === "barbat" ? 56.2 + 1.41 * inch : 53.1 + 1.36 * inch;
  }
  function calcHamwi(s: Sex, cm: number): number {
    const inch = (cm - 152.4) / 2.54;
    return s === "barbat" ? 48 + 2.7 * inch : 45.5 + 2.2 * inch;
  }

  let formule = $derived.by((): FormulaResult[] => {
    const cm = parse(inaltimeRaw);
    if (!Number.isFinite(cm) || cm <= 0) {
      return [
        { nume: "Devine",   an: "1974", valoare: NaN, descriere: "Standard farmaceutic, cea mai citată" },
        { nume: "Robinson", an: "1983", valoare: NaN, descriere: "Actualizare modernă a Devine" },
        { nume: "Miller",   an: "1983", valoare: NaN, descriere: "Pentru persoane cu constituție slabă" },
        { nume: "Hamwi",    an: "1964", valoare: NaN, descriere: "Referința istorică, dietetic" },
      ];
    }
    return [
      { nume: "Devine",   an: "1974", valoare: Math.max(0, calcDevine(sex, cm)),   descriere: "Standard farmaceutic, cea mai citată" },
      { nume: "Robinson", an: "1983", valoare: Math.max(0, calcRobinson(sex, cm)), descriere: "Actualizare modernă a Devine" },
      { nume: "Miller",   an: "1983", valoare: Math.max(0, calcMiller(sex, cm)),   descriere: "Pentru persoane cu constituție slabă" },
      { nume: "Hamwi",    an: "1964", valoare: Math.max(0, calcHamwi(sex, cm)),    descriere: "Referința istorică, dietetic" },
    ];
  });

  let media = $derived.by((): number => {
    const valori = formule.filter((f) => Number.isFinite(f.valoare)).map((f) => f.valoare);
    if (valori.length === 0) return NaN;
    return valori.reduce((a, b) => a + b, 0) / valori.length;
  });

  let abatere = $derived.by((): number => {
    const valori = formule.filter((f) => Number.isFinite(f.valoare)).map((f) => f.valoare);
    if (valori.length < 2) return NaN;
    const m = media;
    const variance = valori.reduce((acc, v) => acc + (v - m) ** 2, 0) / valori.length;
    return Math.sqrt(variance);
  });

  let bmiInterval = $derived.by((): { min: number; max: number } => {
    const cm = parse(inaltimeRaw);
    if (!Number.isFinite(cm) || cm <= 0) return { min: NaN, max: NaN };
    const m = cm / 100;
    return { min: 18.5 * m * m, max: 24.9 * m * m };
  });

  const PRESET_INALTIME = [155, 160, 165, 170, 175, 180, 185, 190];
</script>

<div class="gid">
  <div class="gid__header">
    <span class="gid__icon" aria-hidden="true">⚖️</span>
    <div>
      <h2 class="gid__title">Calculator Greutate Ideală</h2>
      <p class="gid__sub">4 formule științifice paralel: Devine · Robinson · Miller · Hamwi</p>
    </div>
  </div>

  <!-- Sex + Înălțime -->
  <div class="gid__section">
    <span class="gid__section-label">Date de intrare</span>
    <div class="gid__inputs">
      <div class="gid__field">
        <label class="gid__label">Sex</label>
        <div class="gid__sex" role="radiogroup" aria-label="Sex">
          <button
            type="button"
            class="gid__sex-btn"
            class:is-active={sex === "barbat"}
            role="radio"
            aria-checked={sex === "barbat"}
            onclick={() => (sex = "barbat")}
          >
            <span class="gid__sex-icon" aria-hidden="true">👨</span>
            Bărbat
          </button>
          <button
            type="button"
            class="gid__sex-btn"
            class:is-active={sex === "femeie"}
            role="radio"
            aria-checked={sex === "femeie"}
            onclick={() => (sex = "femeie")}
          >
            <span class="gid__sex-icon" aria-hidden="true">👩</span>
            Femeie
          </button>
        </div>
      </div>

      <div class="gid__field">
        <label for="gid-inaltime" class="gid__label">Înălțime</label>
        <div class="gid__input-wrap">
          <input
            id="gid-inaltime"
            type="text"
            inputmode="decimal"
            value={inaltimeRaw}
            oninput={(e) => (inaltimeRaw = (e.target as HTMLInputElement).value)}
            placeholder="ex. 175"
            class="gid__input"
          />
          <span class="gid__suffix">cm</span>
        </div>
        <div class="gid__presets">
          {#each PRESET_INALTIME as p}
            <button type="button" class="gid__chip" onclick={() => (inaltimeRaw = String(p))}>{p}</button>
          {/each}
        </div>
      </div>
    </div>
  </div>

  <!-- Sumar (medie + abatere) -->
  <div class="gid__summary">
    <div class="gid__summary-block">
      <span class="gid__summary-label">Medie 4 formule</span>
      <span class="gid__summary-value">{fmt(media, 1)} <small>kg</small></span>
    </div>
    <div class="gid__summary-block">
      <span class="gid__summary-label">Abatere standard</span>
      <span class="gid__summary-value">± {fmt(abatere, 1)} <small>kg</small></span>
    </div>
    <div class="gid__summary-block">
      <span class="gid__summary-label">Interval IMC normal (18,5–24,9)</span>
      <span class="gid__summary-value">{fmt(bmiInterval.min, 0)} – {fmt(bmiInterval.max, 0)} <small>kg</small></span>
    </div>
  </div>

  <!-- 4 cards comparativ -->
  <div class="gid__formule">
    {#each formule as f, i}
      <div class="gid__card" class:is-highlighted={i === 0}>
        <div class="gid__card-head">
          <span class="gid__card-name">{f.nume}</span>
          <span class="gid__card-year">{f.an}</span>
        </div>
        <span class="gid__card-value">{fmt(f.valoare, 1)} <small>kg</small></span>
        <span class="gid__card-desc">{f.descriere}</span>
      </div>
    {/each}
  </div>

  <!-- Formule afișate -->
  <div class="gid__formula-box">
    <strong>Bază comună:</strong> toate formulele convertesc înălțimea în <em>inch peste 5 ft</em>:
    <span class="gid__formula-eq">inch = (cm − 152,4) / 2,54</span>
    <span class="gid__formula-note">
      Devine: 50 (bărbați) sau 45,5 (femei) + 2,3 × inch · Robinson: 52 / 49 + 1,9 / 1,7 × inch ·
      Miller: 56,2 / 53,1 + 1,41 / 1,36 × inch · Hamwi: 48 / 45,5 + 2,7 / 2,2 × inch.
    </span>
  </div>

  <p class="gid__note">
    <strong>⚠️ Disclaimer:</strong> Greutatea ideală nu este o țintă universală. Sportivii cu masă musculară
    semnificativă vor avea greutăți peste „ideal”. Pentru o evaluare completă, consultă un nutriționist
    autorizat (Asociația Română Nutriționiștilor) sau medicul de familie.
  </p>
</div>

<style>
  .gid {
    display: flex; flex-direction: column; gap: var(--sp-4);
    padding: var(--sp-5); background: var(--bg-card);
    border: 1px solid var(--border); border-radius: var(--r-lg);
    --gid-accent: var(--cat-sanatate, #e11d48);
  }
  .gid__header {
    display: flex; gap: var(--sp-3); align-items: center;
    padding: var(--sp-3); background: var(--bg);
    border: 1px solid var(--border); border-radius: var(--r-md);
  }
  .gid__icon { font-size: 1.5rem; }
  .gid__title { margin: 0; font-size: 1rem; font-weight: 700; color: var(--text); }
  .gid__sub { margin: 2px 0 0 0; font-size: 0.8125rem; color: var(--text-muted); }

  .gid__section { display: flex; flex-direction: column; gap: var(--sp-2); }
  .gid__section-label {
    font-size: 0.75rem; font-weight: 700; color: var(--text-muted);
    text-transform: uppercase; letter-spacing: 0.04em;
  }
  .gid__inputs {
    display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-3);
  }
  @media (max-width: 640px) { .gid__inputs { grid-template-columns: 1fr; } }
  .gid__field { display: flex; flex-direction: column; gap: var(--sp-2); }
  .gid__label { font-size: 0.8125rem; color: var(--text-muted); font-weight: 500; }

  .gid__sex { display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-2); }
  .gid__sex-btn {
    display: flex; align-items: center; justify-content: center; gap: var(--sp-2);
    padding: var(--sp-3); cursor: pointer; font-size: 0.875rem; font-weight: 700;
    background: var(--bg); border: 2px solid var(--border);
    border-radius: var(--r-md); color: var(--text);
    transition: all var(--t-fast);
  }
  .gid__sex-btn:hover {
    border-color: color-mix(in srgb, var(--gid-accent) 55%, transparent);
    background: color-mix(in srgb, var(--gid-accent) 6%, var(--bg));
  }
  .gid__sex-btn.is-active {
    border-color: var(--gid-accent);
    background: color-mix(in srgb, var(--gid-accent) 12%, var(--bg));
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--gid-accent) 18%, transparent);
  }
  .gid__sex-icon { font-size: 1.125rem; }

  .gid__input-wrap {
    position: relative;
    background: var(--bg); border: 2px solid var(--border);
    border-radius: var(--r-md); padding: var(--sp-3) var(--sp-5) var(--sp-3) var(--sp-3);
    transition: border-color var(--t-fast);
  }
  .gid__input-wrap:focus-within {
    border-color: var(--gid-accent);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--gid-accent) 18%, transparent);
  }
  .gid__input {
    width: 100%; border: none; background: transparent;
    color: var(--text); font-size: 1.5rem; font-weight: 700;
    font-family: var(--font-mono); text-align: center; outline: none;
  }
  .gid__suffix {
    position: absolute; right: var(--sp-3); top: 50%; transform: translateY(-50%);
    color: var(--text-subtle); font-weight: 600; font-size: 0.8125rem;
  }
  .gid__presets {
    display: flex; flex-wrap: wrap; gap: 6px;
  }
  .gid__chip {
    padding: 3px 10px; font-size: 0.75rem; font-weight: 600;
    background: color-mix(in srgb, var(--gid-accent) 12%, transparent);
    color: var(--gid-accent);
    border: 1px solid transparent; border-radius: var(--r-full);
    cursor: pointer; font-family: var(--font-mono);
    transition: all var(--t-fast);
  }
  .gid__chip:hover { background: var(--gid-accent); color: #fff; }

  .gid__summary {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--sp-3);
  }
  @media (max-width: 720px) { .gid__summary { grid-template-columns: 1fr; } }
  .gid__summary-block {
    display: flex; flex-direction: column; gap: 2px;
    padding: var(--sp-3);
    background: color-mix(in srgb, var(--gid-accent) 10%, var(--bg));
    border: 1px solid color-mix(in srgb, var(--gid-accent) 30%, transparent);
    border-radius: var(--r-md);
  }
  .gid__summary-label { font-size: 0.6875rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.04em; font-weight: 700; }
  .gid__summary-value {
    font-family: var(--font-mono); font-size: 1.25rem; font-weight: 800;
    color: var(--gid-accent);
  }
  .gid__summary-value small { font-size: 0.75rem; font-weight: 500; color: var(--text-muted); }

  .gid__formule {
    display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--sp-2);
  }
  @media (max-width: 720px) { .gid__formule { grid-template-columns: 1fr 1fr; } }
  @media (max-width: 480px) { .gid__formule { grid-template-columns: 1fr; } }
  .gid__card {
    display: flex; flex-direction: column; gap: 6px;
    padding: var(--sp-3);
    background: var(--bg); border: 1px solid var(--border);
    border-radius: var(--r-md);
    transition: all var(--t-fast);
  }
  .gid__card.is-highlighted {
    border-color: color-mix(in srgb, var(--gid-accent) 40%, transparent);
    background: color-mix(in srgb, var(--gid-accent) 6%, var(--bg));
  }
  .gid__card-head {
    display: flex; justify-content: space-between; align-items: center;
  }
  .gid__card-name { font-size: 0.875rem; font-weight: 800; color: var(--text); }
  .gid__card-year {
    font-size: 0.6875rem; color: var(--text-subtle); font-family: var(--font-mono);
    padding: 1px 6px; background: var(--bg-card); border-radius: var(--r-full);
  }
  .gid__card-value {
    font-family: var(--font-mono); font-size: 1.5rem; font-weight: 800;
    color: var(--gid-accent); line-height: 1.1;
  }
  .gid__card-value small { font-size: 0.75rem; font-weight: 500; color: var(--text-muted); }
  .gid__card-desc { font-size: 0.6875rem; color: var(--text-muted); line-height: 1.35; }

  .gid__formula-box {
    display: flex; flex-direction: column; gap: 6px;
    padding: var(--sp-3);
    background: var(--bg); border: 1px solid var(--border); border-radius: var(--r-md);
    font-size: 0.8125rem; color: var(--text-muted);
  }
  .gid__formula-eq {
    font-family: var(--font-mono); padding: 4px 8px;
    background: color-mix(in srgb, var(--gid-accent) 8%, var(--bg-card));
    border-radius: var(--r-sm); align-self: flex-start;
    color: var(--gid-accent); font-weight: 700;
  }
  .gid__formula-note { font-size: 0.75rem; color: var(--text-subtle); line-height: 1.5; }

  .gid__note {
    margin: 0;
    font-size: 0.75rem; color: var(--text-subtle);
    padding: var(--sp-2) var(--sp-3); background: var(--bg);
    border-left: 3px solid color-mix(in srgb, var(--gid-accent) 50%, transparent);
    border-radius: var(--r-sm); line-height: 1.5;
  }
</style>
