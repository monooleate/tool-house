<script lang="ts">
  // ============================================================
  // SalariuOraCalculator.svelte – salariu lunar → orar / zilnic / săptămânal
  // Port: math reference OraberKalkulator.tsx, RO-localizat.
  // Norma RO standard: 168 ore/lună (8 ore × 21 zile lucrătoare).
  // ⚠️  Acest tool NU calculează impozite — e un convertor simplu.
  //     Pentru salariu net cu impozit + CAS + CASS folosește alt tool.
  // ============================================================

  let salariuLunarRaw = $state("5000");
  let oreSaptRaw = $state("40");
  let zileLunarRaw = $state("21");

  function parse(v: string): number {
    const cleaned = v.replace(/\s/g, "").replace(/\./g, "").replace(",", ".");
    const n = parseFloat(cleaned);
    return Number.isFinite(n) ? n : NaN;
  }
  function fmt(n: number, d = 2): string {
    if (!Number.isFinite(n)) return "–";
    return n.toLocaleString("ro-RO", { minimumFractionDigits: 0, maximumFractionDigits: d });
  }

  let result = $derived.by((): {
    salariuOra: number;
    salariuZi: number;
    salariuSapt: number;
    salariuAnual: number;
    oreLunare: number;
  } => {
    const sl = parse(salariuLunarRaw);
    const oreSapt = parse(oreSaptRaw);
    const zileLuna = parse(zileLunarRaw);
    if (!Number.isFinite(sl) || !Number.isFinite(oreSapt) || !Number.isFinite(zileLuna)) {
      return { salariuOra: NaN, salariuZi: NaN, salariuSapt: NaN, salariuAnual: NaN, oreLunare: NaN };
    }
    const oreZi = oreSapt / 5;
    const oreLunare = oreZi * zileLuna;
    if (oreLunare <= 0) return { salariuOra: NaN, salariuZi: NaN, salariuSapt: NaN, salariuAnual: NaN, oreLunare: NaN };
    const salariuOra = sl / oreLunare;
    const salariuZi = salariuOra * oreZi;
    const salariuSapt = salariuOra * oreSapt;
    const salariuAnual = sl * 12;
    return { salariuOra, salariuZi, salariuSapt, salariuAnual, oreLunare };
  });

  // Presets RO uzuale
  const PRESETS = [
    { label: "Salariu minim brut", val: 4050, note: "RO 2026" },
    { label: "Salariu mediu RO",   val: 8500, note: "INS 2026" },
    { label: "IT senior",          val: 18000, note: "Mediană IT" },
    { label: "Manager mediu",      val: 12000, note: "Marketing/Vânzări" },
  ];

  const PROGRAM_PRESETS = [
    { label: "Full-time (40h)", ore: 40 },
    { label: "Part-time 6h",    ore: 30 },
    { label: "Part-time 4h",    ore: 20 },
  ];
</script>

<div class="sal">
  <div class="sal__header">
    <span class="sal__icon" aria-hidden="true">⏰</span>
    <div>
      <h2 class="sal__title">Salariu Lunar → Orar</h2>
      <p class="sal__sub">Convertor brut: lunar → orar / zilnic / săptămânal · norma RO 168 h/lună</p>
    </div>
  </div>

  <!-- Inputs -->
  <div class="sal__inputs">
    <div class="sal__field">
      <label for="sal-luna" class="sal__label">Salariu lunar (lei)</label>
      <div class="sal__input-wrap">
        <input
          id="sal-luna"
          type="text"
          inputmode="decimal"
          value={salariuLunarRaw}
          oninput={(e) => (salariuLunarRaw = (e.target as HTMLInputElement).value)}
          class="sal__input"
        />
        <span class="sal__suffix">lei</span>
      </div>
      <div class="sal__chips">
        {#each PRESETS as p}
          <button
            type="button"
            class="sal__chip"
            onclick={() => (salariuLunarRaw = String(p.val))}
            title={p.note}
          >
            {p.label}
          </button>
        {/each}
      </div>
    </div>

    <div class="sal__field">
      <label for="sal-sapt" class="sal__label">Ore pe săptămână</label>
      <div class="sal__input-wrap">
        <input
          id="sal-sapt"
          type="text"
          inputmode="decimal"
          value={oreSaptRaw}
          oninput={(e) => (oreSaptRaw = (e.target as HTMLInputElement).value)}
          class="sal__input"
        />
        <span class="sal__suffix">h</span>
      </div>
      <div class="sal__chips">
        {#each PROGRAM_PRESETS as p}
          <button
            type="button"
            class="sal__chip"
            onclick={() => (oreSaptRaw = String(p.ore))}
          >
            {p.label}
          </button>
        {/each}
      </div>
    </div>

    <div class="sal__field">
      <label for="sal-zile" class="sal__label">Zile lucrătoare/lună</label>
      <div class="sal__input-wrap">
        <input
          id="sal-zile"
          type="text"
          inputmode="decimal"
          value={zileLunarRaw}
          oninput={(e) => (zileLunarRaw = (e.target as HTMLInputElement).value)}
          class="sal__input"
        />
        <span class="sal__suffix">zile</span>
      </div>
    </div>
  </div>

  <!-- Results -->
  <div class="sal__results">
    <div class="sal__result sal__result--big">
      <span class="sal__result-label">Salariu orar</span>
      <span class="sal__result-value">{fmt(result.salariuOra, 2)} lei/h</span>
    </div>
    <div class="sal__result">
      <span class="sal__result-label">Salariu zilnic</span>
      <span class="sal__result-value">{fmt(result.salariuZi, 2)} lei/zi</span>
    </div>
    <div class="sal__result">
      <span class="sal__result-label">Salariu săptămânal</span>
      <span class="sal__result-value">{fmt(result.salariuSapt, 0)} lei/săpt.</span>
    </div>
    <div class="sal__result">
      <span class="sal__result-label">Salariu anual</span>
      <span class="sal__result-value">{fmt(result.salariuAnual, 0)} lei/an</span>
    </div>
  </div>

  <div class="sal__formula">
    <strong>Formulă:</strong> ore/lună = (ore săpt. / 5 zile) × zile lucrătoare ·
    salariu orar = salariu lunar / ore lunare &nbsp;|&nbsp; ore curente: <strong>{fmt(result.oreLunare, 0)} h/lună</strong>
  </div>

  <p class="sal__note">
    <strong>Atenție:</strong> acest calculator face doar conversia brut → orar.
    NU calculează contribuții (CAS 25%, CASS 10%, impozit 10%) sau salariu net.
    Pentru salariu net oficial folosește <em>calculator pentru salarizare</em> dedicat,
    cu actualizările Codului fiscal RO 2026.
  </p>
</div>

<style>
  .sal {
    display: flex; flex-direction: column; gap: var(--sp-4);
    padding: var(--sp-5); background: var(--bg-card);
    border: 1px solid var(--border); border-radius: var(--r-lg);
    --sal-accent: var(--cat-finante, #059669);
  }
  .sal__header {
    display: flex; gap: var(--sp-3); align-items: center;
    padding: var(--sp-3); background: var(--bg);
    border: 1px solid var(--border); border-radius: var(--r-md);
  }
  .sal__icon { font-size: 1.5rem; }
  .sal__title { margin: 0; font-size: 1rem; font-weight: 700; color: var(--text); }
  .sal__sub { margin: 2px 0 0 0; font-size: 0.8125rem; color: var(--text-muted); }

  .sal__inputs { display: grid; grid-template-columns: 1.4fr 1fr 1fr; gap: var(--sp-3); }
  @media (max-width: 720px) { .sal__inputs { grid-template-columns: 1fr; } }

  .sal__field { display: flex; flex-direction: column; gap: var(--sp-2); }
  .sal__label { font-size: 0.8125rem; color: var(--text-muted); font-weight: 500; }
  .sal__input-wrap {
    position: relative;
    background: var(--bg); border: 2px solid var(--border);
    border-radius: var(--r-md); padding: var(--sp-3) var(--sp-5) var(--sp-3) var(--sp-3);
    transition: border-color var(--t-fast);
  }
  .sal__input-wrap:focus-within {
    border-color: var(--sal-accent);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--sal-accent) 18%, transparent);
  }
  .sal__input {
    width: 100%; border: none; background: transparent;
    color: var(--text); font-size: 1.25rem; font-weight: 700;
    font-family: var(--font-mono); text-align: center; outline: none;
  }
  .sal__suffix {
    position: absolute; right: var(--sp-3); top: 50%; transform: translateY(-50%);
    color: var(--text-subtle); font-weight: 600; font-size: 0.8125rem;
  }
  .sal__chips { display: flex; flex-wrap: wrap; gap: 4px; }
  .sal__chip {
    padding: 3px 8px; font-size: 0.7rem; font-weight: 600;
    background: color-mix(in srgb, var(--sal-accent) 12%, transparent);
    color: var(--sal-accent);
    border: 1px solid transparent; border-radius: var(--r-full);
    cursor: pointer; transition: all var(--t-fast);
  }
  .sal__chip:hover { background: var(--sal-accent); color: #fff; }

  .sal__results { display: grid; grid-template-columns: 1.4fr 1fr 1fr 1fr; gap: var(--sp-3); }
  @media (max-width: 720px) { .sal__results { grid-template-columns: 1fr 1fr; } }
  .sal__result {
    display: flex; flex-direction: column; gap: 4px;
    padding: var(--sp-3);
    background: var(--bg); border: 1px solid var(--border);
    border-radius: var(--r-md);
  }
  .sal__result--big {
    background: color-mix(in srgb, var(--sal-accent) 12%, var(--bg));
    border-color: color-mix(in srgb, var(--sal-accent) 40%, transparent);
  }
  .sal__result-label { font-size: 0.75rem; color: var(--text-muted); font-weight: 600; }
  .sal__result-value {
    font-family: var(--font-mono); font-size: 1.125rem; font-weight: 800;
    color: var(--sal-accent);
  }
  .sal__result--big .sal__result-value { font-size: 1.5rem; }

  .sal__formula {
    text-align: center; font-size: 0.8125rem; color: var(--text-muted);
    padding: var(--sp-3); background: var(--bg); border-radius: var(--r-md);
    font-family: var(--font-mono);
  }
  .sal__note {
    margin: 0;
    font-size: 0.75rem; color: var(--text-subtle);
    padding: var(--sp-2) var(--sp-3); background: var(--bg);
    border-left: 3px solid color-mix(in srgb, var(--sal-accent) 50%, transparent);
    border-radius: var(--r-sm);
  }
</style>
