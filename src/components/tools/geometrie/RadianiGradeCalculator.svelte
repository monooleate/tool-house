<script lang="ts">
  // ============================================================
  // RadianiGradeCalculator.svelte – Convertor radiani ↔ grade
  // Portolva: RadToAngleCalc.tsx
  // UI: 2 inputuri sincronizate + sector circular SVG.
  // ============================================================

  let degRaw = $state("90");
  let radRaw = $state(((90 * Math.PI) / 180).toFixed(4));

  function parse(v: string): number {
    const n = parseFloat(v.replace(/\s/g, "").replace(",", "."));
    return Number.isFinite(n) ? n : NaN;
  }
  function fmt(n: number, d = 4): string {
    if (!Number.isFinite(n)) return "–";
    if (Number.isInteger(n)) return n.toString();
    return n.toFixed(d).replace(/\.?0+$/, "");
  }

  let lastEdit: "deg" | "rad" = $state("deg");

  function onDegInput(v: string) {
    degRaw = v;
    lastEdit = "deg";
    const d = parse(v);
    if (Number.isFinite(d)) radRaw = fmt((d * Math.PI) / 180, 6);
  }
  function onRadInput(v: string) {
    radRaw = v;
    lastEdit = "rad";
    const r = parse(v);
    if (Number.isFinite(r)) degRaw = fmt((r * 180) / Math.PI, 4);
  }

  let degVal: number = $derived(parse(degRaw));
  let radVal: number = $derived(parse(radRaw));
  let valid: boolean = $derived(Number.isFinite(degVal));

  type Preset = { label: string; deg: number };
  const PRESETS: Preset[] = [
    { label: "30°",  deg: 30 },
    { label: "45°",  deg: 45 },
    { label: "60°",  deg: 60 },
    { label: "90°",  deg: 90 },
    { label: "180°", deg: 180 },
    { label: "270°", deg: 270 },
    { label: "360°", deg: 360 },
  ];
  function applyPreset(p: Preset) {
    onDegInput(p.deg.toString());
  }

  // SVG sector
  const VBSize = 240;
  const cx = VBSize / 2;
  const cy = VBSize / 2;
  const R = 90;

  let sectorPath: string = $derived.by(() => {
    if (!valid) return "";
    const angle = ((degVal % 360) + 360) % 360;
    if (angle === 0) return "";
    const rad = (angle * Math.PI) / 180;
    const ex = cx + R * Math.cos(-Math.PI / 2 + rad);
    const ey = cy + R * Math.sin(-Math.PI / 2 + rad);
    const largeArc = angle > 180 ? 1 : 0;
    return `M ${cx} ${cy} L ${cx} ${cy - R} A ${R} ${R} 0 ${largeArc} 1 ${ex.toFixed(2)} ${ey.toFixed(2)} Z`;
  });
</script>

<div class="rg">
  <!-- Inputs -->
  <div class="rg__inputs">
    <div class="rg__field">
      <label for="rg-deg" class="rg__label">Grade</label>
      <div class="rg__input-wrap">
        <input id="rg-deg" type="text" inputmode="decimal" class="rg__input"
               class:is-active={lastEdit === "deg"}
               value={degRaw}
               oninput={(e) => onDegInput((e.target as HTMLInputElement).value)} />
        <span class="rg__suffix">°</span>
      </div>
    </div>
    <div class="rg__sep" aria-hidden="true">↔</div>
    <div class="rg__field">
      <label for="rg-rad" class="rg__label">Radiani</label>
      <div class="rg__input-wrap">
        <input id="rg-rad" type="text" inputmode="decimal" class="rg__input"
               class:is-active={lastEdit === "rad"}
               value={radRaw}
               oninput={(e) => onRadInput((e.target as HTMLInputElement).value)} />
        <span class="rg__suffix">rad</span>
      </div>
    </div>
  </div>

  <!-- Presets -->
  <div class="rg__presets">
    <span class="rg__presets-label">Valori uzuale:</span>
    {#each PRESETS as p}
      <button class="rg__chip" onclick={() => applyPreset(p)}>{p.label}</button>
    {/each}
  </div>

  {#if valid}
    <div class="rg__svg-wrap" aria-label="Sector circular">
      <svg viewBox={`0 0 ${VBSize} ${VBSize}`} class="rg__svg" preserveAspectRatio="xMidYMid meet">
        <circle cx={cx} cy={cy} r={R} fill="none" stroke="var(--border)" stroke-width="1.5" />
        <line x1={cx} y1="0" x2={cx} y2={VBSize} stroke="var(--text-subtle)" stroke-width="0.5" stroke-dasharray="2 3" />
        <line x1="0" y1={cy} x2={VBSize} y2={cy} stroke="var(--text-subtle)" stroke-width="0.5" stroke-dasharray="2 3" />
        {#if sectorPath}
          <path d={sectorPath}
                fill="color-mix(in srgb, var(--cat-geometrie) 25%, transparent)"
                stroke="var(--cat-geometrie)" stroke-width="2" stroke-linejoin="round" />
        {/if}
        <circle cx={cx} cy={cy} r="3" fill="var(--text)" />
        <text x={cx} y={cy + R + 18} text-anchor="middle" class="rg__svg-text">
          {fmt(degVal, 2)}° = {fmt(radVal, 4)} rad
        </text>
      </svg>
    </div>

    <div class="rg__formula">
      <span class="rg__formula-label">Formule:</span>
      <span class="rg__formula-eq">rad = grade × (π / 180)</span>
      <span class="rg__formula-eq">grade = rad × (180 / π)</span>
      <span class="rg__formula-eq">π ≈ 3.14159265</span>
    </div>
  {:else}
    <div class="rg__error">⚠ Introdu o valoare numerică validă.</div>
  {/if}
</div>

<style>
  .rg {
    display: flex; flex-direction: column; gap: var(--sp-4);
    padding: var(--sp-5); background: var(--bg-card);
    border: 1px solid var(--border); border-radius: var(--r-lg);
    --rg-accent: var(--cat-geometrie, #10b981);
  }

  .rg__inputs {
    display: grid; grid-template-columns: 1fr; gap: var(--sp-3); align-items: end;
  }
  @media (min-width: 640px) { .rg__inputs { grid-template-columns: 1fr auto 1fr; } }

  .rg__field { display: flex; flex-direction: column; gap: var(--sp-2); }
  .rg__label {
    font-size: 0.75rem; font-weight: 700; color: var(--text-muted);
    text-transform: uppercase; letter-spacing: 0.05em;
  }
  .rg__input-wrap { position: relative; }
  .rg__input {
    width: 100%; padding: var(--sp-3); padding-right: 3.5rem;
    outline: none;
    background: var(--bg); color: var(--text);
    border: 2px solid var(--border); border-radius: var(--r-md);
    font-family: var(--font-mono); font-size: 1.25rem; font-weight: 700;
    transition: all var(--t-fast);
  }
  .rg__input:focus, .rg__input.is-active {
    border-color: var(--rg-accent);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--rg-accent) 18%, transparent);
  }
  .rg__suffix {
    position: absolute; right: var(--sp-3); top: 50%; transform: translateY(-50%);
    color: var(--text-muted); font-size: 0.875rem; font-weight: 600;
  }
  .rg__sep {
    align-self: center; padding: 0 var(--sp-2);
    color: var(--rg-accent); font-size: 1.5rem; font-weight: 700;
  }

  .rg__presets {
    display: flex; flex-wrap: wrap; gap: var(--sp-2);
    align-items: center; justify-content: center;
  }
  .rg__presets-label { font-size: 0.75rem; color: var(--text-muted); font-weight: 600; }
  .rg__chip {
    padding: 4px 10px; cursor: pointer;
    background: color-mix(in srgb, var(--rg-accent) 12%, transparent);
    color: var(--rg-accent);
    border: 1px solid transparent; border-radius: var(--r-full);
    font-family: var(--font-mono); font-size: 0.75rem; font-weight: 600;
    transition: all var(--t-fast);
  }
  .rg__chip:hover { background: var(--rg-accent); color: #fff; }

  .rg__svg-wrap {
    background: var(--bg); border: 1px solid var(--border);
    border-radius: var(--r-md); padding: var(--sp-3);
  }
  .rg__svg { display: block; width: 100%; max-width: 280px; height: auto; margin: 0 auto; }
  .rg__svg-text {
    font-family: var(--font-mono); font-size: 11px; font-weight: 700;
    fill: var(--text);
  }

  .rg__formula {
    display: flex; flex-wrap: wrap; gap: var(--sp-3);
    padding: var(--sp-3); background: var(--bg);
    border: 1px solid var(--border); border-radius: var(--r-md);
    align-items: center; justify-content: center;
  }
  .rg__formula-label {
    font-size: 0.6875rem; font-weight: 700; color: var(--text-subtle);
    text-transform: uppercase; letter-spacing: 0.05em;
  }
  .rg__formula-eq {
    font-family: var(--font-mono); font-size: 0.8125rem; color: var(--text); font-weight: 600;
  }

  .rg__error {
    padding: var(--sp-3) var(--sp-4); text-align: center;
    background: color-mix(in srgb, #f59e0b 12%, transparent);
    color: #c2410c;
    border: 1px solid color-mix(in srgb, #f59e0b 30%, transparent);
    border-radius: var(--r-md); font-size: 0.875rem;
  }
</style>
