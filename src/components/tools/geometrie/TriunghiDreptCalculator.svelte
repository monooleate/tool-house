<script lang="ts">
  // ============================================================
  // TriunghiDreptCalculator.svelte – Triunghi dreptunghic
  // Portolva: TriangleCalculator.tsx → 6 moduri de calcul, SVG live.
  // Pitagora + funcții trigonometrice + arie/perimetru/înălțime.
  // ============================================================

  type Mode = "a_b" | "a_c" | "b_c" | "a_alpha" | "b_alpha" | "c_alpha";
  type Unit = "mm" | "cm" | "m" | "km";

  const MODES: { key: Mode; label: string; desc: string }[] = [
    { key: "a_b",     label: "a + b",  desc: "Două catete" },
    { key: "a_c",     label: "a + c",  desc: "Cateta + ipotenuză" },
    { key: "b_c",     label: "b + c",  desc: "Cateta + ipotenuză" },
    { key: "a_alpha", label: "a + α",  desc: "Cateta + unghi" },
    { key: "b_alpha", label: "b + α",  desc: "Cateta + unghi" },
    { key: "c_alpha", label: "c + α",  desc: "Ipotenuză + unghi" },
  ];

  const UNITS: { key: Unit; lbl: string; t: string }[] = [
    { key: "mm", lbl: "mm", t: "mm²" },
    { key: "cm", lbl: "cm", t: "cm²" },
    { key: "m",  lbl: "m",  t: "m²" },
    { key: "km", lbl: "km", t: "km²" },
  ];

  type Preset = { label: string; mode: Mode; v1: string; v2: string };
  const PRESETS: Preset[] = [
    { label: "3-4-5",        mode: "a_b",     v1: "3", v2: "4" },
    { label: "5-12-13",      mode: "a_b",     v1: "5", v2: "12" },
    { label: "8-15-17",      mode: "a_b",     v1: "8", v2: "15" },
    { label: "30°-60°-90°",  mode: "a_alpha", v1: "5", v2: "30" },
    { label: "45°-45°-90°",  mode: "a_alpha", v1: "5", v2: "45" },
  ];

  let mode: Mode = $state("a_b");
  let v1Raw = $state("3");
  let v2Raw = $state("4");
  let unit: Unit = $state("cm");

  function parse(v: string): number {
    const n = parseFloat(v.replace(/\s/g, "").replace(",", "."));
    return Number.isFinite(n) ? n : NaN;
  }
  function fmt(n: number, d = 2): string {
    if (!Number.isFinite(n)) return "–";
    if (Number.isInteger(n) && Math.abs(n) < 1e6) return n.toString();
    return n.toFixed(d).replace(/\.?0+$/, "");
  }
  function deg2rad(d: number) { return (d * Math.PI) / 180; }
  function rad2deg(r: number) { return (r * 180) / Math.PI; }

  type Result = {
    valid: boolean;
    err?: string;
    a: number; b: number; c: number;
    alpha: number; beta: number;
    arie: number; perimetru: number;
    inaltime: number; razaInscris: number; razaCircumscris: number;
  };

  function compute(m: Mode, x: number, y: number): Result {
    const inv = (err: string): Result => ({
      valid: false, err, a: 0, b: 0, c: 0, alpha: 0, beta: 0,
      arie: 0, perimetru: 0, inaltime: 0, razaInscris: 0, razaCircumscris: 0,
    });
    if (!Number.isFinite(x) || !Number.isFinite(y)) return inv("Valori invalide");
    let a = 0, b = 0, c = 0, alpha = 0;
    switch (m) {
      case "a_b":
        if (x <= 0 || y <= 0) return inv("Catetele trebuie să fie pozitive");
        a = x; b = y; c = Math.sqrt(a * a + b * b);
        alpha = rad2deg(Math.atan2(a, b));
        break;
      case "a_c":
        if (x <= 0 || y <= x) return inv("Ipotenuza trebuie > cateta");
        a = x; c = y; b = Math.sqrt(c * c - a * a);
        alpha = rad2deg(Math.asin(a / c));
        break;
      case "b_c":
        if (x <= 0 || y <= x) return inv("Ipotenuza trebuie > cateta");
        b = x; c = y; a = Math.sqrt(c * c - b * b);
        alpha = rad2deg(Math.acos(b / c));
        break;
      case "a_alpha":
        if (x <= 0 || y <= 0 || y >= 90) return inv("Unghiul α trebuie 0° < α < 90°");
        a = x; alpha = y;
        b = a / Math.tan(deg2rad(alpha));
        c = a / Math.sin(deg2rad(alpha));
        break;
      case "b_alpha":
        if (x <= 0 || y <= 0 || y >= 90) return inv("Unghiul α trebuie 0° < α < 90°");
        b = x; alpha = y;
        a = b * Math.tan(deg2rad(alpha));
        c = b / Math.cos(deg2rad(alpha));
        break;
      case "c_alpha":
        if (x <= 0 || y <= 0 || y >= 90) return inv("Unghiul α trebuie 0° < α < 90°");
        c = x; alpha = y;
        a = c * Math.sin(deg2rad(alpha));
        b = c * Math.cos(deg2rad(alpha));
        break;
    }
    const beta = 90 - alpha;
    const arie = (a * b) / 2;
    const perimetru = a + b + c;
    const inaltime = (a * b) / c;
    const razaInscris = arie / (perimetru / 2);
    const razaCircumscris = c / 2;
    return { valid: true, a, b, c, alpha, beta, arie, perimetru, inaltime, razaInscris, razaCircumscris };
  }

  let r: Result = $derived(compute(mode, parse(v1Raw), parse(v2Raw)));
  let u: { lbl: string; t: string } = $derived(UNITS.find(x => x.key === unit) ?? UNITS[1]);

  type FieldLabels = { l1: string; l2: string; u1: string; u2: string };
  let labels: FieldLabels = $derived.by((): FieldLabels => {
    switch (mode) {
      case "a_b":     return { l1: "a (cateta)",   l2: "b (cateta)",     u1: u.lbl, u2: u.lbl };
      case "a_c":     return { l1: "a (cateta)",   l2: "c (ipotenuza)",  u1: u.lbl, u2: u.lbl };
      case "b_c":     return { l1: "b (cateta)",   l2: "c (ipotenuza)",  u1: u.lbl, u2: u.lbl };
      case "a_alpha": return { l1: "a (cateta)",   l2: "α (unghi)",      u1: u.lbl, u2: "°" };
      case "b_alpha": return { l1: "b (cateta)",   l2: "α (unghi)",      u1: u.lbl, u2: "°" };
      case "c_alpha": return { l1: "c (ipotenuză)", l2: "α (unghi)",     u1: u.lbl, u2: "°" };
    }
  });

  function applyPreset(p: Preset) {
    mode = p.mode;
    v1Raw = p.v1;
    v2Raw = p.v2;
  }

  // SVG vizualizare
  const VBW = 320, VBH = 260;
  type SvgGeo = {
    ox: number; oy: number; bx: number; by: number; tx: number; ty: number;
    drawA: number; drawB: number;
  };
  let svg: SvgGeo | null = $derived.by(() => {
    if (!r.valid) return null;
    const pad = 50;
    const maxDim = Math.max(r.a, r.b, 0.01);
    const scale = Math.min((VBW - pad * 2) / maxDim, (VBH - pad * 2) / maxDim);
    const drawA = r.a * scale;
    const drawB = r.b * scale;
    const ox = pad;
    const oy = VBH - pad;
    const bx = ox + drawA;
    const by = oy;
    const tx = ox;
    const ty = oy - drawB;
    return { ox, oy, bx, by, tx, ty, drawA, drawB };
  });

  // detectare triunghiuri speciale
  let isPitagoraz: boolean = $derived(
    r.valid && Math.abs(r.a - Math.round(r.a)) < 0.01 &&
    Math.abs(r.b - Math.round(r.b)) < 0.01 &&
    Math.abs(r.c - Math.round(r.c)) < 0.01
  );
  let is454590: boolean = $derived(r.valid && Math.abs(r.alpha - 45) < 0.1);
  let is306090: boolean = $derived(r.valid && (Math.abs(r.alpha - 30) < 0.1 || Math.abs(r.alpha - 60) < 0.1));
</script>

<div class="tri">
  <!-- Mode tabs -->
  <div class="tri__modes">
    {#each MODES as m}
      <button class="tri__mode" class:is-active={mode === m.key}
              onclick={() => (mode = m.key)} aria-pressed={mode === m.key}>
        <span class="tri__mode-label">{m.label}</span>
        <span class="tri__mode-desc">{m.desc}</span>
      </button>
    {/each}
  </div>

  <!-- Inputs -->
  <div class="tri__inputs">
    <div class="tri__field">
      <label for="tri-v1" class="tri__label">{labels.l1}</label>
      <div class="tri__input-wrap">
        <input id="tri-v1" type="text" inputmode="decimal" class="tri__input"
               value={v1Raw}
               oninput={(e) => (v1Raw = (e.target as HTMLInputElement).value)} />
        <span class="tri__suffix">{labels.u1}</span>
      </div>
    </div>
    <div class="tri__field">
      <label for="tri-v2" class="tri__label">{labels.l2}</label>
      <div class="tri__input-wrap">
        <input id="tri-v2" type="text" inputmode="decimal" class="tri__input"
               value={v2Raw}
               oninput={(e) => (v2Raw = (e.target as HTMLInputElement).value)} />
        <span class="tri__suffix">{labels.u2}</span>
      </div>
    </div>
  </div>

  <!-- Unit + presets -->
  <div class="tri__bar">
    <select class="tri__unit" bind:value={unit} aria-label="Unitate de măsură">
      {#each UNITS as un}
        <option value={un.key}>{un.lbl}</option>
      {/each}
    </select>
    <div class="tri__presets">
      {#each PRESETS as p}
        <button class="tri__chip" onclick={() => applyPreset(p)}>{p.label}</button>
      {/each}
    </div>
  </div>

  {#if r.valid}
    <!-- SVG -->
    {#if svg}
      <div class="tri__svg-wrap" aria-label="Reprezentare triunghi dreptunghic">
        <svg viewBox={`0 0 ${VBW} ${VBH}`} class="tri__svg" preserveAspectRatio="xMidYMid meet">
          <polygon points={`${svg.ox},${svg.oy} ${svg.bx},${svg.by} ${svg.tx},${svg.ty}`}
                   fill="color-mix(in srgb, var(--cat-geometrie) 18%, transparent)"
                   stroke="var(--cat-geometrie)" stroke-width="2.5" stroke-linejoin="round" />
          <!-- right angle marker -->
          <polyline points={`${svg.ox + 12},${svg.oy} ${svg.ox + 12},${svg.oy - 12} ${svg.ox},${svg.oy - 12}`}
                    fill="none" stroke="var(--text-muted)" stroke-width="1.5" />
          <!-- a label (bottom) -->
          <text x={(svg.ox + svg.bx) / 2} y={svg.oy + 22} text-anchor="middle"
                class="tri__svg-label tri__svg-label--a">a = {fmt(r.a, 2)} {u.lbl}</text>
          <!-- b label (left) -->
          <text x={svg.ox - 14} y={(svg.oy + svg.ty) / 2 + 4} text-anchor="middle"
                class="tri__svg-label tri__svg-label--b"
                transform={`rotate(-90, ${svg.ox - 14}, ${(svg.oy + svg.ty) / 2 + 4})`}>
            b = {fmt(r.b, 2)} {u.lbl}
          </text>
          <!-- c label (hypotenuse) -->
          <text x={(svg.bx + svg.tx) / 2 + 8} y={(svg.by + svg.ty) / 2}
                text-anchor="middle" class="tri__svg-label tri__svg-label--c"
                transform={`rotate(${-rad2deg(Math.atan2(svg.drawB, svg.drawA))}, ${(svg.bx + svg.tx) / 2 + 8}, ${(svg.by + svg.ty) / 2})`}>
            c = {fmt(r.c, 2)} {u.lbl}
          </text>
          <!-- α angle text -->
          <text x={svg.bx - 28} y={svg.by - 8} text-anchor="end"
                class="tri__svg-angle tri__svg-angle--alpha">α = {fmt(r.alpha, 1)}°</text>
          <!-- β angle text -->
          <text x={svg.tx + 6} y={svg.ty + 16}
                class="tri__svg-angle tri__svg-angle--beta">β = {fmt(r.beta, 1)}°</text>
          <!-- 90° label -->
          <text x={svg.ox + 6} y={svg.oy - 16} class="tri__svg-right">90°</text>
        </svg>
      </div>
    {/if}

    <!-- Results grid -->
    <div class="tri__results">
      <div class="tri__card">
        <span class="tri__card-label">Cateta a</span>
        <span class="tri__card-value">{fmt(r.a, 4)} <em>{u.lbl}</em></span>
      </div>
      <div class="tri__card">
        <span class="tri__card-label">Cateta b</span>
        <span class="tri__card-value">{fmt(r.b, 4)} <em>{u.lbl}</em></span>
      </div>
      <div class="tri__card tri__card--accent">
        <span class="tri__card-label">Ipotenuza c</span>
        <span class="tri__card-value">{fmt(r.c, 4)} <em>{u.lbl}</em></span>
      </div>
      <div class="tri__card">
        <span class="tri__card-label">Unghi α</span>
        <span class="tri__card-value">{fmt(r.alpha, 2)}°</span>
      </div>
      <div class="tri__card">
        <span class="tri__card-label">Unghi β</span>
        <span class="tri__card-value">{fmt(r.beta, 2)}°</span>
      </div>
      <div class="tri__card">
        <span class="tri__card-label">Arie T</span>
        <span class="tri__card-value">{fmt(r.arie, 4)} <em>{u.t}</em></span>
      </div>
      <div class="tri__card">
        <span class="tri__card-label">Perimetru P</span>
        <span class="tri__card-value">{fmt(r.perimetru, 4)} <em>{u.lbl}</em></span>
      </div>
      <div class="tri__card">
        <span class="tri__card-label">Înălțime h<sub>c</sub></span>
        <span class="tri__card-value">{fmt(r.inaltime, 4)} <em>{u.lbl}</em></span>
      </div>
      <div class="tri__card">
        <span class="tri__card-label">Rază înscris (r)</span>
        <span class="tri__card-value">{fmt(r.razaInscris, 4)} <em>{u.lbl}</em></span>
      </div>
      <div class="tri__card">
        <span class="tri__card-label">Rază circumscris (R)</span>
        <span class="tri__card-value">{fmt(r.razaCircumscris, 4)} <em>{u.lbl}</em></span>
      </div>
    </div>

    {#if isPitagoraz || is454590 || is306090}
      <div class="tri__special">
        ✨ {is454590
          ? "Triunghi dreptunghic isoscel 45°-45°-90° (a = b)"
          : is306090
          ? "Triunghi special 30°-60°-90° (raport laturi 1 : √3 : 2)"
          : `Triplet pitagoreic: ${Math.round(r.a)}-${Math.round(r.b)}-${Math.round(r.c)}`}
      </div>
    {/if}

    <!-- Formulas -->
    <div class="tri__formula">
      <span class="tri__formula-label">Formule:</span>
      <span class="tri__formula-eq">c = √(a² + b²)</span>
      <span class="tri__formula-eq">T = (a · b) / 2</span>
      <span class="tri__formula-eq">sin α = a / c</span>
    </div>
  {:else}
    <div class="tri__error">⚠ {r.err}</div>
  {/if}
</div>

<style>
  .tri {
    display: flex; flex-direction: column; gap: var(--sp-4);
    padding: var(--sp-5); background: var(--bg-card);
    border: 1px solid var(--border); border-radius: var(--r-lg);
    --tri-accent: var(--cat-geometrie, #10b981);
  }

  .tri__modes {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--sp-2);
  }
  @media (min-width: 640px) { .tri__modes { grid-template-columns: repeat(6, 1fr); } }

  .tri__mode {
    display: flex; flex-direction: column; gap: 2px; align-items: center;
    padding: var(--sp-2) var(--sp-2); cursor: pointer;
    background: var(--bg); color: var(--text);
    border: 2px solid var(--border); border-radius: var(--r-md);
    transition: all var(--t-fast);
  }
  .tri__mode:hover { border-color: color-mix(in srgb, var(--tri-accent) 50%, transparent); }
  .tri__mode.is-active {
    border-color: var(--tri-accent);
    background: color-mix(in srgb, var(--tri-accent) 10%, var(--bg));
  }
  .tri__mode-label {
    font-family: var(--font-mono); font-size: 0.875rem; font-weight: 700;
    color: var(--text);
  }
  .tri__mode-desc { font-size: 0.625rem; color: var(--text-muted); text-align: center; }

  .tri__inputs {
    display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-3);
  }
  .tri__field { display: flex; flex-direction: column; gap: var(--sp-2); }
  .tri__label { font-size: 0.8125rem; font-weight: 600; color: var(--text); }
  .tri__input-wrap { position: relative; }
  .tri__input {
    width: 100%; padding: var(--sp-3); padding-right: 3rem;
    outline: none;
    background: var(--bg); color: var(--text);
    border: 2px solid var(--border); border-radius: var(--r-md);
    font-family: var(--font-mono); font-size: 1.125rem; font-weight: 700;
    transition: all var(--t-fast);
  }
  .tri__input:focus {
    border-color: var(--tri-accent);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--tri-accent) 22%, transparent);
  }
  .tri__suffix {
    position: absolute; right: var(--sp-3); top: 50%; transform: translateY(-50%);
    color: var(--text-muted); font-size: 0.8125rem; font-weight: 600;
  }

  .tri__bar {
    display: flex; flex-wrap: wrap; gap: var(--sp-3);
    align-items: center; justify-content: space-between;
  }
  .tri__unit {
    padding: 6px 10px; cursor: pointer;
    background: var(--bg); color: var(--text);
    border: 1px solid var(--border); border-radius: var(--r-md);
    font-family: var(--font-mono); font-size: 0.875rem; font-weight: 600;
    outline: none;
  }
  .tri__presets {
    display: flex; flex-wrap: wrap; gap: var(--sp-2); flex: 1; justify-content: flex-end;
  }
  .tri__chip {
    padding: 4px 10px; cursor: pointer;
    background: color-mix(in srgb, var(--tri-accent) 12%, transparent);
    color: var(--tri-accent);
    border: 1px solid transparent; border-radius: var(--r-full);
    font-family: var(--font-mono); font-size: 0.75rem; font-weight: 600;
    transition: all var(--t-fast);
  }
  .tri__chip:hover { background: var(--tri-accent); color: #fff; }

  .tri__svg-wrap {
    background: var(--bg); border: 1px solid var(--border);
    border-radius: var(--r-md); padding: var(--sp-3);
  }
  .tri__svg { display: block; width: 100%; max-width: 360px; height: auto; margin: 0 auto; }
  .tri__svg-label { font-size: 11px; font-weight: 700; font-family: var(--font-mono); }
  .tri__svg-label--a { fill: #2563eb; }
  .tri__svg-label--b { fill: #7c3aed; }
  .tri__svg-label--c { fill: var(--tri-accent); }
  .tri__svg-angle { font-size: 10px; font-weight: 700; font-family: var(--font-mono); }
  .tri__svg-angle--alpha { fill: #ef4444; }
  .tri__svg-angle--beta { fill: #16a34a; }
  .tri__svg-right { font-size: 9px; fill: var(--text-muted); font-family: var(--font-mono); }

  .tri__results {
    display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--sp-2);
  }
  @media (min-width: 640px) { .tri__results { grid-template-columns: repeat(5, 1fr); } }

  .tri__card {
    display: flex; flex-direction: column; gap: 4px;
    padding: var(--sp-3); background: var(--bg);
    border: 1px solid var(--border); border-radius: var(--r-md);
  }
  .tri__card--accent {
    border-color: color-mix(in srgb, var(--tri-accent) 35%, transparent);
    background: color-mix(in srgb, var(--tri-accent) 6%, var(--bg));
  }
  .tri__card-label {
    font-size: 0.6875rem; font-weight: 600; color: var(--text-muted);
    text-transform: uppercase; letter-spacing: 0.04em;
  }
  .tri__card-value {
    font-family: var(--font-mono); font-size: 1.0625rem; font-weight: 700; color: var(--text);
  }
  .tri__card-value em { font-size: 0.75rem; color: var(--text-muted); font-style: normal; font-weight: 500; }

  .tri__special {
    padding: var(--sp-3); text-align: center;
    background: color-mix(in srgb, var(--tri-accent) 12%, var(--bg));
    color: var(--tri-accent); font-weight: 600; font-size: 0.875rem;
    border: 1px solid color-mix(in srgb, var(--tri-accent) 35%, transparent);
    border-radius: var(--r-md);
  }

  .tri__formula {
    display: flex; flex-wrap: wrap; gap: var(--sp-3);
    padding: var(--sp-3); background: var(--bg);
    border: 1px solid var(--border); border-radius: var(--r-md);
    align-items: center; justify-content: center;
  }
  .tri__formula-label {
    font-size: 0.6875rem; font-weight: 700; color: var(--text-subtle);
    text-transform: uppercase; letter-spacing: 0.05em;
  }
  .tri__formula-eq {
    font-family: var(--font-mono); font-size: 0.8125rem; color: var(--text); font-weight: 600;
  }

  .tri__error {
    padding: var(--sp-3) var(--sp-4); text-align: center;
    background: color-mix(in srgb, #f59e0b 12%, transparent);
    color: #c2410c;
    border: 1px solid color-mix(in srgb, #f59e0b 30%, transparent);
    border-radius: var(--r-md); font-size: 0.875rem;
  }
</style>
