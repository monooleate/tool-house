<script lang="ts">
  // ============================================================
  // CercCalculator.svelte – Calculator cerc (rază/diametru/perimetru/arie)
  // Portolva: KorKalkulator.tsx
  // UI: 4 moduri input + sector + segment + SVG live.
  // ============================================================

  type Mode = "raza" | "diametru" | "perimetru" | "arie";
  type Unit = "mm" | "cm" | "m" | "km";

  const MODES: { key: Mode; label: string; symbol: string }[] = [
    { key: "raza",      label: "Rază",      symbol: "r" },
    { key: "diametru",  label: "Diametru",  symbol: "d" },
    { key: "perimetru", label: "Perimetru", symbol: "P" },
    { key: "arie",      label: "Arie",      symbol: "A" },
  ];

  const UNITS: { key: Unit; lbl: string; t: string }[] = [
    { key: "mm", lbl: "mm", t: "mm²" },
    { key: "cm", lbl: "cm", t: "cm²" },
    { key: "m",  lbl: "m",  t: "m²" },
    { key: "km", lbl: "km", t: "km²" },
  ];

  let mode: Mode = $state("raza");
  let valRaw = $state("10");
  let unit: Unit = $state("cm");

  let showSector: boolean = $state(false);
  let unghiRaw = $state("90");

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
    valid: boolean;
    err?: string;
    raza: number; diametru: number; perimetru: number; arie: number;
  };

  function compute(m: Mode, v: number): Result {
    const inv = (err: string): Result => ({ valid: false, err, raza: 0, diametru: 0, perimetru: 0, arie: 0 });
    if (!Number.isFinite(v) || v <= 0) return inv("Introdu o valoare pozitivă");
    let r = 0;
    switch (m) {
      case "raza":      r = v; break;
      case "diametru":  r = v / 2; break;
      case "perimetru": r = v / (2 * Math.PI); break;
      case "arie":      r = Math.sqrt(v / Math.PI); break;
    }
    return {
      valid: true,
      raza: r,
      diametru: 2 * r,
      perimetru: 2 * Math.PI * r,
      arie: Math.PI * r * r,
    };
  }

  let r: Result = $derived(compute(mode, parse(valRaw)));
  let u: { lbl: string; t: string } = $derived(UNITS.find(x => x.key === unit) ?? UNITS[1]);

  type SectorRes = {
    valid: boolean;
    unghi: number;
    arcLength: number;
    sectorArea: number;
    segmentArea: number;
  };
  let sector: SectorRes = $derived.by(() => {
    if (!r.valid || !showSector) return { valid: false, unghi: 0, arcLength: 0, sectorArea: 0, segmentArea: 0 };
    const u = parse(unghiRaw);
    if (!Number.isFinite(u) || u <= 0 || u > 360) return { valid: false, unghi: 0, arcLength: 0, sectorArea: 0, segmentArea: 0 };
    const uRad = (u * Math.PI) / 180;
    const arcLength = r.raza * uRad;
    const sectorArea = (uRad / (2 * Math.PI)) * r.arie;
    const triArea = 0.5 * r.raza * r.raza * Math.sin(uRad);
    const segmentArea = Math.max(0, sectorArea - triArea);
    return { valid: true, unghi: u, arcLength, sectorArea, segmentArea };
  });

  type Preset = { label: string; mode: Mode; v: string };
  const PRESETS: Preset[] = [
    { label: "r = 1",   mode: "raza",     v: "1" },
    { label: "r = 5",   mode: "raza",     v: "5" },
    { label: "r = 10",  mode: "raza",     v: "10" },
    { label: "d = 20",  mode: "diametru", v: "20" },
    { label: "P = 100", mode: "perimetru", v: "100" },
    { label: "A = 314", mode: "arie",     v: "314" },
  ];
  function applyPreset(p: Preset) { mode = p.mode; valRaw = p.v; }

  // SVG
  const VBSize = 280;
  const cx = VBSize / 2;
  const cy = VBSize / 2;
  const Rmax = 100;

  let sectorPath: string = $derived.by(() => {
    if (!sector.valid) return "";
    const ang = sector.unghi;
    if (ang === 0) return "";
    if (ang >= 360) return "";
    const aRad = (ang * Math.PI) / 180;
    const ex = cx + Rmax * Math.cos(-Math.PI / 2 + aRad);
    const ey = cy + Rmax * Math.sin(-Math.PI / 2 + aRad);
    const largeArc = ang > 180 ? 1 : 0;
    return `M ${cx} ${cy} L ${cx} ${cy - Rmax} A ${Rmax} ${Rmax} 0 ${largeArc} 1 ${ex.toFixed(2)} ${ey.toFixed(2)} Z`;
  });
</script>

<div class="cerc">
  <!-- Mode tabs -->
  <div class="cerc__modes">
    {#each MODES as m}
      <button class="cerc__mode" class:is-active={mode === m.key}
              onclick={() => (mode = m.key)} aria-pressed={mode === m.key}>
        <span class="cerc__mode-sym">{m.symbol}</span>
        <span class="cerc__mode-label">{m.label}</span>
      </button>
    {/each}
  </div>

  <!-- Input + unit -->
  <div class="cerc__row">
    <div class="cerc__field">
      <label for="cerc-val" class="cerc__label">
        {MODES.find(x => x.key === mode)?.label} ({mode === "arie" ? u.t : u.lbl})
      </label>
      <div class="cerc__input-wrap">
        <input id="cerc-val" type="text" inputmode="decimal" class="cerc__input"
               value={valRaw}
               oninput={(e) => (valRaw = (e.target as HTMLInputElement).value)} />
        <span class="cerc__suffix">{mode === "arie" ? u.t : u.lbl}</span>
      </div>
    </div>
    <div class="cerc__unit-field">
      <label for="cerc-unit" class="cerc__label">UM</label>
      <select id="cerc-unit" class="cerc__unit" bind:value={unit}>
        {#each UNITS as un}
          <option value={un.key}>{un.lbl}</option>
        {/each}
      </select>
    </div>
  </div>

  <div class="cerc__presets">
    {#each PRESETS as p}
      <button class="cerc__chip" onclick={() => applyPreset(p)}>{p.label}</button>
    {/each}
  </div>

  {#if r.valid}
    <!-- SVG -->
    <div class="cerc__svg-wrap" aria-label="Cerc">
      <svg viewBox={`0 0 ${VBSize} ${VBSize}`} class="cerc__svg" preserveAspectRatio="xMidYMid meet">
        <circle cx={cx} cy={cy} r={Rmax}
                fill="color-mix(in srgb, var(--cat-geometrie) 12%, transparent)"
                stroke="var(--cat-geometrie)" stroke-width="2.5" />
        {#if sector.valid && sectorPath}
          <path d={sectorPath}
                fill="color-mix(in srgb, #f59e0b 30%, transparent)"
                stroke="#f59e0b" stroke-width="2" />
        {/if}
        <!-- radius line -->
        <line x1={cx} y1={cy} x2={cx + Rmax} y2={cy}
              stroke="#dc2626" stroke-width="2" stroke-dasharray="4 3" />
        <text x={cx + Rmax / 2} y={cy - 6} text-anchor="middle" class="cerc__svg-r">r</text>
        <circle cx={cx} cy={cy} r="4" fill="var(--text)" />
        <text x={cx} y={cy + Rmax + 22} text-anchor="middle" class="cerc__svg-info">
          r = {fmt(r.raza, 3)} {u.lbl}
        </text>
      </svg>
    </div>

    <!-- Results -->
    <div class="cerc__results">
      <div class="cerc__card" class:cerc__card--active={mode === "raza"}>
        <span class="cerc__card-label">Rază (r)</span>
        <span class="cerc__card-value">{fmt(r.raza, 4)} <em>{u.lbl}</em></span>
      </div>
      <div class="cerc__card" class:cerc__card--active={mode === "diametru"}>
        <span class="cerc__card-label">Diametru (d)</span>
        <span class="cerc__card-value">{fmt(r.diametru, 4)} <em>{u.lbl}</em></span>
      </div>
      <div class="cerc__card" class:cerc__card--active={mode === "perimetru"}>
        <span class="cerc__card-label">Perimetru (P)</span>
        <span class="cerc__card-value">{fmt(r.perimetru, 4)} <em>{u.lbl}</em></span>
      </div>
      <div class="cerc__card" class:cerc__card--active={mode === "arie"}>
        <span class="cerc__card-label">Arie (A)</span>
        <span class="cerc__card-value">{fmt(r.arie, 4)} <em>{u.t}</em></span>
      </div>
    </div>

    <!-- Sector toggle -->
    <div class="cerc__sector-box">
      <label class="cerc__sector-toggle">
        <input type="checkbox" bind:checked={showSector} />
        <span>Sector circular & segment</span>
      </label>
      {#if showSector}
        <div class="cerc__sector-row">
          <label for="cerc-ang" class="cerc__label">Unghi central α</label>
          <div class="cerc__input-wrap">
            <input id="cerc-ang" type="text" inputmode="decimal" class="cerc__input cerc__input--small"
                   value={unghiRaw}
                   oninput={(e) => (unghiRaw = (e.target as HTMLInputElement).value)} />
            <span class="cerc__suffix">°</span>
          </div>
        </div>
        {#if sector.valid}
          <div class="cerc__sector-cards">
            <div class="cerc__card cerc__card--small">
              <span class="cerc__card-label">Lung. arc</span>
              <span class="cerc__card-value">{fmt(sector.arcLength, 4)} <em>{u.lbl}</em></span>
            </div>
            <div class="cerc__card cerc__card--small">
              <span class="cerc__card-label">Arie sector</span>
              <span class="cerc__card-value">{fmt(sector.sectorArea, 4)} <em>{u.t}</em></span>
            </div>
            <div class="cerc__card cerc__card--small">
              <span class="cerc__card-label">Arie segment</span>
              <span class="cerc__card-value">{fmt(sector.segmentArea, 4)} <em>{u.t}</em></span>
            </div>
          </div>
        {/if}
      {/if}
    </div>

    <div class="cerc__formula">
      <span class="cerc__formula-label">Formule:</span>
      <span class="cerc__formula-eq">d = 2r</span>
      <span class="cerc__formula-eq">P = 2πr</span>
      <span class="cerc__formula-eq">A = πr²</span>
      <span class="cerc__formula-eq">A<sub>sect</sub> = (α/360°) · πr²</span>
    </div>
  {:else}
    <div class="cerc__error">⚠ {r.err}</div>
  {/if}
</div>

<style>
  .cerc {
    display: flex; flex-direction: column; gap: var(--sp-4);
    padding: var(--sp-5); background: var(--bg-card);
    border: 1px solid var(--border); border-radius: var(--r-lg);
    --cerc-accent: var(--cat-geometrie, #10b981);
  }

  .cerc__modes {
    display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--sp-2);
  }
  .cerc__mode {
    display: flex; flex-direction: column; gap: 2px; align-items: center;
    padding: var(--sp-2) var(--sp-2); cursor: pointer;
    background: var(--bg); color: var(--text);
    border: 2px solid var(--border); border-radius: var(--r-md);
    transition: all var(--t-fast);
  }
  .cerc__mode:hover { border-color: color-mix(in srgb, var(--cerc-accent) 50%, transparent); }
  .cerc__mode.is-active {
    border-color: var(--cerc-accent);
    background: color-mix(in srgb, var(--cerc-accent) 10%, var(--bg));
  }
  .cerc__mode-sym {
    font-family: Georgia, serif; font-style: italic;
    font-size: 1.125rem; font-weight: 700; color: var(--cerc-accent);
  }
  .cerc__mode-label { font-size: 0.75rem; color: var(--text-muted); }

  .cerc__row {
    display: grid; grid-template-columns: 1fr; gap: var(--sp-3);
  }
  @media (min-width: 480px) { .cerc__row { grid-template-columns: 1fr auto; } }

  .cerc__field { display: flex; flex-direction: column; gap: var(--sp-2); }
  .cerc__unit-field { display: flex; flex-direction: column; gap: var(--sp-2); min-width: 80px; }
  .cerc__label {
    font-size: 0.75rem; font-weight: 700; color: var(--text-muted);
    text-transform: uppercase; letter-spacing: 0.05em;
  }
  .cerc__input-wrap { position: relative; }
  .cerc__input {
    width: 100%; padding: var(--sp-3); padding-right: 3rem;
    outline: none;
    background: var(--bg); color: var(--text);
    border: 2px solid var(--border); border-radius: var(--r-md);
    font-family: var(--font-mono); font-size: 1.25rem; font-weight: 700;
    transition: all var(--t-fast);
  }
  .cerc__input--small { font-size: 1rem; }
  .cerc__input:focus {
    border-color: var(--cerc-accent);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--cerc-accent) 22%, transparent);
  }
  .cerc__suffix {
    position: absolute; right: var(--sp-3); top: 50%; transform: translateY(-50%);
    color: var(--text-muted); font-size: 0.875rem; font-weight: 600;
  }
  .cerc__unit {
    padding: var(--sp-3) var(--sp-2); cursor: pointer;
    background: var(--bg); color: var(--text);
    border: 2px solid var(--border); border-radius: var(--r-md);
    font-family: var(--font-mono); font-size: 0.9375rem; font-weight: 600;
    outline: none;
  }

  .cerc__presets {
    display: flex; flex-wrap: wrap; gap: var(--sp-2);
    align-items: center; justify-content: center;
  }
  .cerc__chip {
    padding: 4px 10px; cursor: pointer;
    background: color-mix(in srgb, var(--cerc-accent) 12%, transparent);
    color: var(--cerc-accent);
    border: 1px solid transparent; border-radius: var(--r-full);
    font-family: var(--font-mono); font-size: 0.75rem; font-weight: 600;
    transition: all var(--t-fast);
  }
  .cerc__chip:hover { background: var(--cerc-accent); color: #fff; }

  .cerc__svg-wrap {
    background: var(--bg); border: 1px solid var(--border);
    border-radius: var(--r-md); padding: var(--sp-3);
  }
  .cerc__svg { display: block; width: 100%; max-width: 320px; height: auto; margin: 0 auto; }
  .cerc__svg-r {
    font-family: Georgia, serif; font-style: italic;
    font-size: 12px; font-weight: 700; fill: #dc2626;
  }
  .cerc__svg-info {
    font-family: var(--font-mono); font-size: 11px; font-weight: 700; fill: var(--text);
  }

  .cerc__results {
    display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--sp-2);
  }
  @media (min-width: 640px) { .cerc__results { grid-template-columns: repeat(4, 1fr); } }

  .cerc__card {
    display: flex; flex-direction: column; gap: 4px;
    padding: var(--sp-3); background: var(--bg);
    border: 1px solid var(--border); border-radius: var(--r-md);
  }
  .cerc__card--active {
    border-color: var(--cerc-accent);
    background: color-mix(in srgb, var(--cerc-accent) 8%, var(--bg));
  }
  .cerc__card--small { padding: var(--sp-2) var(--sp-3); }
  .cerc__card-label {
    font-size: 0.6875rem; font-weight: 700; color: var(--text-muted);
    text-transform: uppercase; letter-spacing: 0.04em;
  }
  .cerc__card-value {
    font-family: var(--font-mono); font-size: 1.0625rem; font-weight: 700; color: var(--text);
  }
  .cerc__card-value em { font-size: 0.75rem; color: var(--text-muted); font-style: normal; font-weight: 500; }

  .cerc__sector-box {
    display: flex; flex-direction: column; gap: var(--sp-3);
    padding: var(--sp-3) var(--sp-4); background: var(--bg);
    border: 1px solid var(--border); border-radius: var(--r-md);
  }
  .cerc__sector-toggle {
    display: flex; align-items: center; gap: var(--sp-2); cursor: pointer;
    font-size: 0.875rem; font-weight: 600; color: var(--text);
  }
  .cerc__sector-toggle input { accent-color: var(--cerc-accent); }
  .cerc__sector-row { display: flex; gap: var(--sp-3); align-items: end; flex-wrap: wrap; }
  .cerc__sector-cards {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--sp-2);
  }

  .cerc__formula {
    display: flex; flex-wrap: wrap; gap: var(--sp-3);
    padding: var(--sp-3); background: var(--bg);
    border: 1px solid var(--border); border-radius: var(--r-md);
    align-items: center; justify-content: center;
  }
  .cerc__formula-label {
    font-size: 0.6875rem; font-weight: 700; color: var(--text-subtle);
    text-transform: uppercase; letter-spacing: 0.05em;
  }
  .cerc__formula-eq {
    font-family: var(--font-mono); font-size: 0.8125rem; color: var(--text); font-weight: 600;
  }

  .cerc__error {
    padding: var(--sp-3) var(--sp-4); text-align: center;
    background: color-mix(in srgb, #f59e0b 12%, transparent);
    color: #c2410c;
    border: 1px solid color-mix(in srgb, #f59e0b 30%, transparent);
    border-radius: var(--r-md); font-size: 0.875rem;
  }
</style>
