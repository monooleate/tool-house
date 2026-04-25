<script lang="ts">
  // ============================================================
  // DreptunghiCalculator.svelte – Dreptunghi (laturi/perimetru/arie/diagonală)
  // Portolva: TeglalapKalkulator.tsx
  // UI: 4 moduri de calcul + SVG live + detector pătrat / aureum.
  // ============================================================

  type Mode = "laturi" | "perimetru_a" | "arie_a" | "diagonala_a";
  type Unit = "mm" | "cm" | "m" | "km";

  const MODES: { key: Mode; label: string; desc: string }[] = [
    { key: "laturi",       label: "a + b",  desc: "Două laturi" },
    { key: "perimetru_a",  label: "P + a",  desc: "Perimetru + latură" },
    { key: "arie_a",       label: "A + a",  desc: "Arie + latură" },
    { key: "diagonala_a",  label: "d + a",  desc: "Diagonală + latură" },
  ];

  const UNITS: { key: Unit; lbl: string; t: string }[] = [
    { key: "mm", lbl: "mm", t: "mm²" },
    { key: "cm", lbl: "cm", t: "cm²" },
    { key: "m",  lbl: "m",  t: "m²" },
    { key: "km", lbl: "km", t: "km²" },
  ];

  type Preset = { label: string; mode: Mode; v1: string; v2: string };
  const PRESETS: Preset[] = [
    { label: "10×5",        mode: "laturi", v1: "10",     v2: "5" },
    { label: "16:9 HD",     mode: "laturi", v1: "16",     v2: "9" },
    { label: "A4 (21×29.7)", mode: "laturi", v1: "21",     v2: "29.7" },
    { label: "Aureum 1.618:1", mode: "laturi", v1: "1.618", v2: "1" },
    { label: "Pătrat 10×10", mode: "laturi", v1: "10",     v2: "10" },
  ];

  let mode: Mode = $state("laturi");
  let v1Raw = $state("10");
  let v2Raw = $state("5");
  let unit: Unit = $state("cm");

  function parse(v: string): number {
    const n = parseFloat(v.replace(/\s/g, "").replace(",", "."));
    return Number.isFinite(n) ? n : NaN;
  }
  function fmt(n: number, d = 4): string {
    if (!Number.isFinite(n)) return "–";
    if (Number.isInteger(n) && Math.abs(n) < 1e6) return n.toString();
    return n.toFixed(d).replace(/\.?0+$/, "");
  }

  type Result = {
    valid: boolean; err?: string;
    a: number; b: number;
    perimetru: number; arie: number; diagonala: number; raport: number;
  };

  function compute(m: Mode, v1: number, v2: number): Result {
    const inv = (err: string): Result => ({ valid: false, err, a: 0, b: 0, perimetru: 0, arie: 0, diagonala: 0, raport: 0 });
    if (!Number.isFinite(v1) || !Number.isFinite(v2)) return inv("Valori invalide");
    let a = 0, b = 0;
    switch (m) {
      case "laturi":
        if (v1 <= 0 || v2 <= 0) return inv("Laturile trebuie pozitive");
        a = v1; b = v2; break;
      case "perimetru_a":
        if (v1 <= 0 || v2 <= 0) return inv("Valori pozitive necesare");
        b = v2; a = v1 / 2 - b;
        if (a <= 0) return inv("Perimetru prea mic pentru această latură");
        break;
      case "arie_a":
        if (v1 <= 0 || v2 <= 0) return inv("Valori pozitive necesare");
        b = v2; a = v1 / b;
        break;
      case "diagonala_a":
        if (v1 <= 0 || v2 <= 0 || v2 >= v1) return inv("Diagonala trebuie > latura");
        b = v2; a = Math.sqrt(v1 * v1 - b * b);
        break;
    }
    const long = Math.max(a, b);
    const short = Math.min(a, b);
    return {
      valid: true, a, b,
      perimetru: 2 * (a + b),
      arie: a * b,
      diagonala: Math.sqrt(a * a + b * b),
      raport: short > 0 ? long / short : 0,
    };
  }

  let r: Result = $derived(compute(mode, parse(v1Raw), parse(v2Raw)));
  let u: { lbl: string; t: string } = $derived(UNITS.find(x => x.key === unit) ?? UNITS[1]);

  type FieldLabels = { l1: string; l2: string; u1: string; u2: string };
  let labels: FieldLabels = $derived.by((): FieldLabels => {
    switch (mode) {
      case "laturi":      return { l1: "a (latura)", l2: "b (latura)",   u1: u.lbl, u2: u.lbl };
      case "perimetru_a": return { l1: "P (perimetru)", l2: "b (latura)", u1: u.lbl, u2: u.lbl };
      case "arie_a":      return { l1: "A (aria)",   l2: "b (latura)",   u1: u.t,   u2: u.lbl };
      case "diagonala_a": return { l1: "d (diagonala)", l2: "b (latura)", u1: u.lbl, u2: u.lbl };
    }
  });

  function applyPreset(p: Preset) { mode = p.mode; v1Raw = p.v1; v2Raw = p.v2; }

  let isPatrat: boolean = $derived(r.valid && Math.abs(r.a - r.b) < 0.001);
  let isAureum: boolean = $derived(r.valid && Math.abs(r.raport - 1.618) < 0.01);

  // SVG
  const VBSize = 280;
  type SvgGeo = { x: number; y: number; w: number; h: number };
  let svg: SvgGeo | null = $derived.by(() => {
    if (!r.valid) return null;
    const pad = 40;
    const maxW = VBSize - pad * 2;
    const maxH = VBSize - pad * 2;
    const scale = Math.min(maxW / Math.max(r.a, 0.01), maxH / Math.max(r.b, 0.01));
    const w = r.a * scale;
    const h = r.b * scale;
    return { x: (VBSize - w) / 2, y: (VBSize - h) / 2, w, h };
  });
</script>

<div class="dr">
  <!-- Mode tabs -->
  <div class="dr__modes">
    {#each MODES as m}
      <button class="dr__mode" class:is-active={mode === m.key}
              onclick={() => (mode = m.key)} aria-pressed={mode === m.key}>
        <span class="dr__mode-label">{m.label}</span>
        <span class="dr__mode-desc">{m.desc}</span>
      </button>
    {/each}
  </div>

  <!-- Inputs -->
  <div class="dr__inputs">
    <div class="dr__field">
      <label for="dr-v1" class="dr__label">{labels.l1}</label>
      <div class="dr__input-wrap">
        <input id="dr-v1" type="text" inputmode="decimal" class="dr__input"
               value={v1Raw}
               oninput={(e) => (v1Raw = (e.target as HTMLInputElement).value)} />
        <span class="dr__suffix">{labels.u1}</span>
      </div>
    </div>
    <div class="dr__field">
      <label for="dr-v2" class="dr__label">{labels.l2}</label>
      <div class="dr__input-wrap">
        <input id="dr-v2" type="text" inputmode="decimal" class="dr__input"
               value={v2Raw}
               oninput={(e) => (v2Raw = (e.target as HTMLInputElement).value)} />
        <span class="dr__suffix">{labels.u2}</span>
      </div>
    </div>
  </div>

  <!-- Unit + presets -->
  <div class="dr__bar">
    <select class="dr__unit" bind:value={unit} aria-label="Unitate de măsură">
      {#each UNITS as un}
        <option value={un.key}>{un.lbl}</option>
      {/each}
    </select>
    <div class="dr__presets">
      {#each PRESETS as p}
        <button class="dr__chip" onclick={() => applyPreset(p)}>{p.label}</button>
      {/each}
    </div>
  </div>

  {#if r.valid}
    {#if svg}
      <div class="dr__svg-wrap" aria-label="Reprezentare dreptunghi">
        <svg viewBox={`0 0 ${VBSize} ${VBSize}`} class="dr__svg" preserveAspectRatio="xMidYMid meet">
          <rect x={svg.x} y={svg.y} width={svg.w} height={svg.h}
                fill="color-mix(in srgb, var(--cat-geometrie) 18%, transparent)"
                stroke="var(--cat-geometrie)" stroke-width="2.5" rx="2" />
          <line x1={svg.x} y1={svg.y + svg.h} x2={svg.x + svg.w} y2={svg.y}
                stroke="#f59e0b" stroke-width="2" stroke-dasharray="5 4" />
          <text x={svg.x + svg.w / 2} y={svg.y + svg.h + 22}
                text-anchor="middle" class="dr__svg-side dr__svg-side--a">
            a = {fmt(r.a, 2)} {u.lbl}
          </text>
          <text x={svg.x - 12} y={svg.y + svg.h / 2 + 4}
                text-anchor="middle" class="dr__svg-side dr__svg-side--b"
                transform={`rotate(-90, ${svg.x - 12}, ${svg.y + svg.h / 2 + 4})`}>
            b = {fmt(r.b, 2)} {u.lbl}
          </text>
          <text x={svg.x + svg.w / 2 + 8} y={svg.y + svg.h / 2 - 6}
                text-anchor="middle" class="dr__svg-diag">
            d = {fmt(r.diagonala, 2)} {u.lbl}
          </text>
        </svg>
      </div>
    {/if}

    <div class="dr__results">
      <div class="dr__card">
        <span class="dr__card-label">Latura a</span>
        <span class="dr__card-value">{fmt(r.a, 4)} <em>{u.lbl}</em></span>
      </div>
      <div class="dr__card">
        <span class="dr__card-label">Latura b</span>
        <span class="dr__card-value">{fmt(r.b, 4)} <em>{u.lbl}</em></span>
      </div>
      <div class="dr__card dr__card--accent">
        <span class="dr__card-label">Perimetru P</span>
        <span class="dr__card-value">{fmt(r.perimetru, 4)} <em>{u.lbl}</em></span>
      </div>
      <div class="dr__card dr__card--accent">
        <span class="dr__card-label">Arie A</span>
        <span class="dr__card-value">{fmt(r.arie, 4)} <em>{u.t}</em></span>
      </div>
      <div class="dr__card">
        <span class="dr__card-label">Diagonală d</span>
        <span class="dr__card-value">{fmt(r.diagonala, 4)} <em>{u.lbl}</em></span>
      </div>
      <div class="dr__card">
        <span class="dr__card-label">Raport laturi</span>
        <span class="dr__card-value">{fmt(r.raport, 4)} : 1</span>
      </div>
    </div>

    {#if isPatrat || isAureum}
      <div class="dr__special">
        ✨ {isPatrat
          ? "Acest dreptunghi este un PĂTRAT (a = b)"
          : "Raport aproape de secțiunea de aur (φ ≈ 1.618) — proporție armonioasă"}
      </div>
    {/if}

    <div class="dr__formula">
      <span class="dr__formula-label">Formule:</span>
      <span class="dr__formula-eq">P = 2(a + b)</span>
      <span class="dr__formula-eq">A = a · b</span>
      <span class="dr__formula-eq">d = √(a² + b²)</span>
    </div>
  {:else}
    <div class="dr__error">⚠ {r.err}</div>
  {/if}
</div>

<style>
  .dr {
    display: flex; flex-direction: column; gap: var(--sp-4);
    padding: var(--sp-5); background: var(--bg-card);
    border: 1px solid var(--border); border-radius: var(--r-lg);
    --dr-accent: var(--cat-geometrie, #10b981);
  }

  .dr__modes {
    display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--sp-2);
  }
  @media (min-width: 640px) { .dr__modes { grid-template-columns: repeat(4, 1fr); } }

  .dr__mode {
    display: flex; flex-direction: column; gap: 2px; align-items: center;
    padding: var(--sp-2); cursor: pointer;
    background: var(--bg); color: var(--text);
    border: 2px solid var(--border); border-radius: var(--r-md);
    transition: all var(--t-fast);
  }
  .dr__mode:hover { border-color: color-mix(in srgb, var(--dr-accent) 50%, transparent); }
  .dr__mode.is-active {
    border-color: var(--dr-accent);
    background: color-mix(in srgb, var(--dr-accent) 10%, var(--bg));
  }
  .dr__mode-label {
    font-family: var(--font-mono); font-size: 0.875rem; font-weight: 700; color: var(--text);
  }
  .dr__mode-desc { font-size: 0.6875rem; color: var(--text-muted); text-align: center; }

  .dr__inputs {
    display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-3);
  }
  .dr__field { display: flex; flex-direction: column; gap: var(--sp-2); }
  .dr__label { font-size: 0.8125rem; font-weight: 600; color: var(--text); }
  .dr__input-wrap { position: relative; }
  .dr__input {
    width: 100%; padding: var(--sp-3); padding-right: 3rem;
    outline: none;
    background: var(--bg); color: var(--text);
    border: 2px solid var(--border); border-radius: var(--r-md);
    font-family: var(--font-mono); font-size: 1.125rem; font-weight: 700;
    transition: all var(--t-fast);
  }
  .dr__input:focus {
    border-color: var(--dr-accent);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--dr-accent) 22%, transparent);
  }
  .dr__suffix {
    position: absolute; right: var(--sp-3); top: 50%; transform: translateY(-50%);
    color: var(--text-muted); font-size: 0.8125rem; font-weight: 600;
  }

  .dr__bar {
    display: flex; flex-wrap: wrap; gap: var(--sp-3);
    align-items: center; justify-content: space-between;
  }
  .dr__unit {
    padding: 6px 10px; cursor: pointer;
    background: var(--bg); color: var(--text);
    border: 1px solid var(--border); border-radius: var(--r-md);
    font-family: var(--font-mono); font-size: 0.875rem; font-weight: 600;
    outline: none;
  }
  .dr__presets {
    display: flex; flex-wrap: wrap; gap: var(--sp-2); flex: 1; justify-content: flex-end;
  }
  .dr__chip {
    padding: 4px 10px; cursor: pointer;
    background: color-mix(in srgb, var(--dr-accent) 12%, transparent);
    color: var(--dr-accent);
    border: 1px solid transparent; border-radius: var(--r-full);
    font-family: var(--font-mono); font-size: 0.75rem; font-weight: 600;
    transition: all var(--t-fast);
  }
  .dr__chip:hover { background: var(--dr-accent); color: #fff; }

  .dr__svg-wrap {
    background: var(--bg); border: 1px solid var(--border);
    border-radius: var(--r-md); padding: var(--sp-3);
  }
  .dr__svg { display: block; width: 100%; max-width: 320px; height: auto; margin: 0 auto; }
  .dr__svg-side { font-size: 11px; font-weight: 700; font-family: var(--font-mono); }
  .dr__svg-side--a { fill: #2563eb; }
  .dr__svg-side--b { fill: #7c3aed; }
  .dr__svg-diag { fill: #f59e0b; font-size: 11px; font-weight: 700; font-family: var(--font-mono); }

  .dr__results {
    display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--sp-2);
  }
  @media (min-width: 640px) { .dr__results { grid-template-columns: repeat(3, 1fr); } }

  .dr__card {
    display: flex; flex-direction: column; gap: 4px;
    padding: var(--sp-3); background: var(--bg);
    border: 1px solid var(--border); border-radius: var(--r-md);
  }
  .dr__card--accent {
    border-color: color-mix(in srgb, var(--dr-accent) 35%, transparent);
    background: color-mix(in srgb, var(--dr-accent) 6%, var(--bg));
  }
  .dr__card-label {
    font-size: 0.6875rem; font-weight: 600; color: var(--text-muted);
    text-transform: uppercase; letter-spacing: 0.04em;
  }
  .dr__card-value {
    font-family: var(--font-mono); font-size: 1.0625rem; font-weight: 700; color: var(--text);
  }
  .dr__card-value em { font-size: 0.75rem; color: var(--text-muted); font-style: normal; font-weight: 500; }

  .dr__special {
    padding: var(--sp-3); text-align: center;
    background: color-mix(in srgb, var(--dr-accent) 12%, var(--bg));
    color: var(--dr-accent); font-weight: 600; font-size: 0.875rem;
    border: 1px solid color-mix(in srgb, var(--dr-accent) 35%, transparent);
    border-radius: var(--r-md);
  }

  .dr__formula {
    display: flex; flex-wrap: wrap; gap: var(--sp-3);
    padding: var(--sp-3); background: var(--bg);
    border: 1px solid var(--border); border-radius: var(--r-md);
    align-items: center; justify-content: center;
  }
  .dr__formula-label {
    font-size: 0.6875rem; font-weight: 700; color: var(--text-subtle);
    text-transform: uppercase; letter-spacing: 0.05em;
  }
  .dr__formula-eq {
    font-family: var(--font-mono); font-size: 0.8125rem; color: var(--text); font-weight: 600;
  }

  .dr__error {
    padding: var(--sp-3) var(--sp-4); text-align: center;
    background: color-mix(in srgb, #f59e0b 12%, transparent);
    color: #c2410c;
    border: 1px solid color-mix(in srgb, #f59e0b 30%, transparent);
    border-radius: var(--r-md); font-size: 0.875rem;
  }
</style>
