<script lang="ts">
  // ============================================================
  // FunctiiTrigCalculator.svelte – sin / cos / tan / cot
  // Portolva: AngleFunctions.tsx + SinCosAnimation.tsx
  // UI: input unghi (grade/rad), 4 carduri sin/cos/tan/cot,
  // SVG live cu cerc trigonometric + vector rotitor.
  // ============================================================

  type Unit = "deg" | "rad";

  let unit: Unit = $state("deg");
  let valRaw = $state("30");

  function parse(v: string): number {
    const n = parseFloat(v.replace(/\s/g, "").replace(",", "."));
    return Number.isFinite(n) ? n : NaN;
  }
  function fmt(n: number, d = 4): string {
    if (!Number.isFinite(n)) return "nedefinit";
    if (Math.abs(n) > 1e6) return n.toExponential(2);
    if (Number.isInteger(n)) return n.toString();
    return n.toFixed(d).replace(/\.?0+$/, "");
  }

  let val: number = $derived(parse(valRaw));
  let valid: boolean = $derived(Number.isFinite(val));
  // angle in radians, normalized for sin/cos display
  let alphaRad: number = $derived(unit === "deg" ? (val * Math.PI) / 180 : val);
  let alphaDeg: number = $derived(unit === "deg" ? val : (val * 180) / Math.PI);

  type TrigVals = {
    sinV: number; cosV: number; tanV: number | null; cotV: number | null;
  };
  let trig: TrigVals = $derived.by(() => {
    if (!valid) return { sinV: NaN, cosV: NaN, tanV: NaN, cotV: NaN };
    const sinV = Math.sin(alphaRad);
    const cosV = Math.cos(alphaRad);
    // tan undefined when cos == 0  → α = 90° + k·180°
    const tanUndef = Math.abs(cosV) < 1e-12;
    // cot undefined when sin == 0  → α = k·180°
    const cotUndef = Math.abs(sinV) < 1e-12;
    return {
      sinV, cosV,
      tanV: tanUndef ? null : sinV / cosV,
      cotV: cotUndef ? null : cosV / sinV,
    };
  });

  type Preset = { label: string; deg: number };
  const PRESETS: Preset[] = [
    { label: "0°", deg: 0 },
    { label: "30°", deg: 30 },
    { label: "45°", deg: 45 },
    { label: "60°", deg: 60 },
    { label: "90°", deg: 90 },
    { label: "120°", deg: 120 },
    { label: "180°", deg: 180 },
    { label: "270°", deg: 270 },
  ];
  function applyPreset(p: Preset) {
    if (unit === "deg") valRaw = p.deg.toString();
    else valRaw = ((p.deg * Math.PI) / 180).toFixed(4);
  }

  function toggleUnit() {
    if (!valid) { unit = unit === "deg" ? "rad" : "deg"; return; }
    if (unit === "deg") {
      valRaw = ((val * Math.PI) / 180).toFixed(4);
      unit = "rad";
    } else {
      valRaw = ((val * 180) / Math.PI).toFixed(2);
      unit = "deg";
    }
  }

  // SVG cerc trigonometric
  const VBSize = 280;
  const cx = VBSize / 2;
  const cy = VBSize / 2;
  const R = 100;

  let endX: number = $derived(valid ? cx + R * Math.cos(alphaRad) : cx + R);
  let endY: number = $derived(valid ? cy - R * Math.sin(alphaRad) : cy);
  let arcPath: string = $derived.by(() => {
    if (!valid) return "";
    const arcR = 22;
    const norm = ((alphaRad % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
    const sweepFlag = 0;
    const largeArc = norm > Math.PI ? 1 : 0;
    const ax1 = cx + arcR;
    const ay1 = cy;
    const ax2 = cx + arcR * Math.cos(alphaRad);
    const ay2 = cy - arcR * Math.sin(alphaRad);
    return `M ${ax1} ${ay1} A ${arcR} ${arcR} 0 ${largeArc} ${sweepFlag} ${ax2} ${ay2}`;
  });
</script>

<div class="trig">
  <!-- Unit + value input -->
  <div class="trig__top">
    <div class="trig__unit-toggle" role="tablist" aria-label="Unitate unghi">
      <button class="trig__unit-btn" class:is-active={unit === "deg"}
              onclick={toggleUnit} role="tab" aria-selected={unit === "deg"}>
        Grade (°)
      </button>
      <button class="trig__unit-btn" class:is-active={unit === "rad"}
              onclick={toggleUnit} role="tab" aria-selected={unit === "rad"}>
        Radiani
      </button>
    </div>
    <div class="trig__field">
      <label for="trig-val" class="trig__label">Unghi α</label>
      <div class="trig__input-wrap">
        <input id="trig-val" type="text" inputmode="decimal" class="trig__input"
               value={valRaw}
               oninput={(e) => (valRaw = (e.target as HTMLInputElement).value)} />
        <span class="trig__suffix">{unit === "deg" ? "°" : "rad"}</span>
      </div>
    </div>
  </div>

  <!-- Presets -->
  <div class="trig__presets">
    <span class="trig__presets-label">Valori uzuale:</span>
    {#each PRESETS as p}
      <button class="trig__chip" onclick={() => applyPreset(p)}>{p.label}</button>
    {/each}
  </div>

  {#if valid}
    <!-- SVG circle -->
    <div class="trig__svg-wrap" aria-label="Cercul trigonometric">
      <svg viewBox={`0 0 ${VBSize} ${VBSize}`} class="trig__svg" preserveAspectRatio="xMidYMid meet">
        <!-- axes -->
        <line x1="0" y1={cy} x2={VBSize} y2={cy} stroke="var(--text-subtle)" stroke-width="1" />
        <line x1={cx} y1="0" x2={cx} y2={VBSize} stroke="var(--text-subtle)" stroke-width="1" />
        <!-- unit circle -->
        <circle cx={cx} cy={cy} r={R} fill="none" stroke="var(--cat-geometrie)" stroke-width="1.5" stroke-dasharray="4 4" opacity="0.6" />
        <!-- vector -->
        <line x1={cx} y1={cy} x2={endX} y2={endY} stroke="var(--cat-geometrie)" stroke-width="2.5" stroke-linecap="round" />
        <circle cx={endX} cy={endY} r="6" fill="var(--cat-geometrie)" stroke="var(--bg-card)" stroke-width="2" />
        <!-- sin projection (vertical, dashed) -->
        <line x1={endX} y1={endY} x2={endX} y2={cy} stroke="#ef4444" stroke-width="2" stroke-dasharray="4 3" />
        <text x={endX + 6} y={(endY + cy) / 2 + 4} class="trig__svg-lab trig__svg-lab--sin">
          sin α = {fmt(trig.sinV, 3)}
        </text>
        <!-- cos projection (horizontal, dashed) -->
        <line x1={endX} y1={cy} x2={cx} y2={cy} stroke="#2563eb" stroke-width="2" stroke-dasharray="4 3" />
        <text x={(cx + endX) / 2} y={cy + 18} text-anchor="middle" class="trig__svg-lab trig__svg-lab--cos">
          cos α = {fmt(trig.cosV, 3)}
        </text>
        <!-- arc -->
        {#if Math.abs(alphaRad) > 0.001}
          <path d={arcPath} fill="none" stroke="#f59e0b" stroke-width="2" />
        {/if}
        <!-- α label -->
        <text x={cx + 32} y={cy - 8} class="trig__svg-alpha">α = {fmt(alphaDeg, 1)}°</text>
        <!-- center dot -->
        <circle cx={cx} cy={cy} r="3" fill="var(--text)" />
      </svg>
    </div>

    <!-- Result cards -->
    <div class="trig__results">
      <div class="trig__card trig__card--sin">
        <span class="trig__card-label">sin α</span>
        <span class="trig__card-value">{fmt(trig.sinV, 6)}</span>
      </div>
      <div class="trig__card trig__card--cos">
        <span class="trig__card-label">cos α</span>
        <span class="trig__card-value">{fmt(trig.cosV, 6)}</span>
      </div>
      <div class="trig__card trig__card--tan">
        <span class="trig__card-label">tan α</span>
        <span class="trig__card-value">{trig.tanV === null ? "∞" : fmt(trig.tanV, 6)}</span>
      </div>
      <div class="trig__card trig__card--cot">
        <span class="trig__card-label">cot α</span>
        <span class="trig__card-value">{trig.cotV === null ? "∞" : fmt(trig.cotV, 6)}</span>
      </div>
    </div>

    <!-- Formulas -->
    <div class="trig__formula">
      <span class="trig__formula-label">Formule:</span>
      <span class="trig__formula-eq">sin α = opusă / ipotenuză</span>
      <span class="trig__formula-eq">cos α = alăturată / ipotenuză</span>
      <span class="trig__formula-eq">tan α = sin α / cos α</span>
      <span class="trig__formula-eq">cot α = 1 / tan α</span>
    </div>
  {:else}
    <div class="trig__error">⚠ Introdu o valoare numerică validă.</div>
  {/if}
</div>

<style>
  .trig {
    display: flex; flex-direction: column; gap: var(--sp-4);
    padding: var(--sp-5); background: var(--bg-card);
    border: 1px solid var(--border); border-radius: var(--r-lg);
    --trig-accent: var(--cat-geometrie, #10b981);
  }

  .trig__top {
    display: flex; flex-wrap: wrap; gap: var(--sp-3);
    align-items: end;
  }
  .trig__unit-toggle {
    display: inline-flex; padding: 3px;
    background: var(--bg); border: 1px solid var(--border); border-radius: var(--r-md);
  }
  .trig__unit-btn {
    padding: 6px 14px; cursor: pointer;
    background: transparent; color: var(--text-muted);
    border: none; border-radius: var(--r-sm);
    font-size: 0.8125rem; font-weight: 600;
    transition: all var(--t-fast);
  }
  .trig__unit-btn.is-active {
    background: var(--trig-accent); color: #fff;
  }

  .trig__field { flex: 1; min-width: 200px; display: flex; flex-direction: column; gap: var(--sp-2); }
  .trig__label { font-size: 0.8125rem; font-weight: 600; color: var(--text); }
  .trig__input-wrap { position: relative; }
  .trig__input {
    width: 100%; padding: var(--sp-3); padding-right: 3rem;
    outline: none;
    background: var(--bg); color: var(--text);
    border: 2px solid var(--border); border-radius: var(--r-md);
    font-family: var(--font-mono); font-size: 1.25rem; font-weight: 700;
    transition: all var(--t-fast);
  }
  .trig__input:focus {
    border-color: var(--trig-accent);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--trig-accent) 22%, transparent);
  }
  .trig__suffix {
    position: absolute; right: var(--sp-3); top: 50%; transform: translateY(-50%);
    color: var(--text-muted); font-size: 0.875rem; font-weight: 600;
  }

  .trig__presets {
    display: flex; flex-wrap: wrap; gap: var(--sp-2);
    align-items: center;
  }
  .trig__presets-label { font-size: 0.75rem; color: var(--text-muted); font-weight: 600; }
  .trig__chip {
    padding: 4px 10px; cursor: pointer;
    background: color-mix(in srgb, var(--trig-accent) 12%, transparent);
    color: var(--trig-accent);
    border: 1px solid transparent; border-radius: var(--r-full);
    font-family: var(--font-mono); font-size: 0.75rem; font-weight: 600;
    transition: all var(--t-fast);
  }
  .trig__chip:hover { background: var(--trig-accent); color: #fff; }

  .trig__svg-wrap {
    background: var(--bg); border: 1px solid var(--border);
    border-radius: var(--r-md); padding: var(--sp-3);
  }
  .trig__svg { display: block; width: 100%; max-width: 320px; height: auto; margin: 0 auto; }
  .trig__svg-lab { font-size: 10px; font-weight: 700; font-family: var(--font-mono); }
  .trig__svg-lab--sin { fill: #ef4444; }
  .trig__svg-lab--cos { fill: #2563eb; }
  .trig__svg-alpha { font-size: 11px; font-weight: 700; font-family: var(--font-mono); fill: #f59e0b; }

  .trig__results {
    display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--sp-2);
  }
  @media (min-width: 640px) { .trig__results { grid-template-columns: repeat(4, 1fr); } }

  .trig__card {
    display: flex; flex-direction: column; gap: 4px;
    padding: var(--sp-3) var(--sp-4); background: var(--bg);
    border: 1px solid var(--border); border-radius: var(--r-md);
  }
  .trig__card-label {
    font-size: 0.75rem; font-weight: 700; color: var(--text-muted);
    text-transform: uppercase; letter-spacing: 0.05em;
    font-family: var(--font-mono);
  }
  .trig__card-value {
    font-family: var(--font-mono); font-size: 1.125rem; font-weight: 700; color: var(--text);
  }
  .trig__card--sin { border-left: 3px solid #ef4444; }
  .trig__card--cos { border-left: 3px solid #2563eb; }
  .trig__card--tan { border-left: 3px solid #16a34a; }
  .trig__card--cot { border-left: 3px solid #f59e0b; }

  .trig__formula {
    display: flex; flex-wrap: wrap; gap: var(--sp-3);
    padding: var(--sp-3); background: var(--bg);
    border: 1px solid var(--border); border-radius: var(--r-md);
    align-items: center;
  }
  .trig__formula-label {
    font-size: 0.6875rem; font-weight: 700; color: var(--text-subtle);
    text-transform: uppercase; letter-spacing: 0.05em;
  }
  .trig__formula-eq {
    font-family: var(--font-mono); font-size: 0.8125rem; color: var(--text); font-weight: 600;
  }

  .trig__error {
    padding: var(--sp-3) var(--sp-4); text-align: center;
    background: color-mix(in srgb, #f59e0b 12%, transparent);
    color: #c2410c;
    border: 1px solid color-mix(in srgb, #f59e0b 30%, transparent);
    border-radius: var(--r-md); font-size: 0.875rem;
  }
</style>
