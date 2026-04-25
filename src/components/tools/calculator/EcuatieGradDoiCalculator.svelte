<script lang="ts">
  // ============================================================
  // EcuatieGradDoiCalculator.svelte – ax² + bx + c = 0
  // Portolva a math reference CalcQuadratic.tsx-ből (RO).
  // Funkciók: a/b/c input, Δ + sqrt + 2 rădăcini lépésekkel,
  // parabola SVG live preview, complex roots support.
  // ============================================================

  let aRaw = $state("1");
  let bRaw = $state("-5");
  let cRaw = $state("6");

  function parse(v: string): number {
    const cleaned = v.replace(/\s/g, "").replace(",", ".");
    const n = parseFloat(cleaned);
    return Number.isFinite(n) ? n : NaN;
  }

  function fmt(n: number, decimals = 2): string {
    if (!Number.isFinite(n)) return "–";
    if (Number.isInteger(n)) return n.toString();
    return n.toFixed(decimals).replace(/\.?0+$/, "");
  }

  type Step = { label: string; eq: string; value: string };
  type Result = {
    a: number; b: number; c: number;
    delta: number;
    rootType: "two-real" | "double" | "complex" | "invalid";
    rootTypeText: string;
    roots: { real: number; imag: number }[];
    steps: Step[];
  };

  function solve(a: number, b: number, c: number): Result {
    const steps: Step[] = [];

    if (!Number.isFinite(a) || !Number.isFinite(b) || !Number.isFinite(c) || a === 0) {
      return {
        a, b, c, delta: NaN, rootType: "invalid",
        rootTypeText: "Coeficient invalid (a ≠ 0)",
        roots: [], steps: [],
      };
    }

    const delta = b * b - 4 * a * c;
    steps.push({
      label: "Calcul discriminant",
      eq: "Δ = b² − 4ac",
      value: `Δ = (${b})² − 4 × ${a} × ${c} = ${fmt(delta)}`,
    });

    const twoA = 2 * a;
    steps.push({
      label: "Calcul 2a",
      eq: "2a",
      value: `2a = 2 × ${a} = ${twoA}`,
    });

    if (delta > 0) {
      const sqrtD = Math.sqrt(delta);
      steps.push({
        label: "Rădăcina pătrată din Δ",
        eq: "√Δ",
        value: `√${fmt(delta)} = ${fmt(sqrtD, 4)}`,
      });
      const x1 = (-b + sqrtD) / twoA;
      const x2 = (-b - sqrtD) / twoA;
      steps.push({
        label: "Prima rădăcină",
        eq: "x₁ = (−b + √Δ) / (2a)",
        value: `x₁ = (${-b} + ${fmt(sqrtD, 4)}) / ${twoA} = ${fmt(x1, 4)}`,
      });
      steps.push({
        label: "A doua rădăcină",
        eq: "x₂ = (−b − √Δ) / (2a)",
        value: `x₂ = (${-b} − ${fmt(sqrtD, 4)}) / ${twoA} = ${fmt(x2, 4)}`,
      });
      return {
        a, b, c, delta, rootType: "two-real",
        rootTypeText: "Două rădăcini reale distincte",
        roots: [{ real: x1, imag: 0 }, { real: x2, imag: 0 }],
        steps,
      };
    }

    if (delta === 0) {
      const x = -b / twoA;
      steps.push({
        label: "Rădăcină dublă",
        eq: "x = −b / (2a)",
        value: `x = ${-b} / ${twoA} = ${fmt(x, 4)}`,
      });
      return {
        a, b, c, delta, rootType: "double",
        rootTypeText: "O rădăcină dublă (Δ = 0)",
        roots: [{ real: x, imag: 0 }],
        steps,
      };
    }

    // delta < 0
    const sqrtNegD = Math.sqrt(-delta);
    steps.push({
      label: "√(−Δ) – pentru rădăcini complexe",
      eq: "√(−Δ)",
      value: `√${fmt(-delta)} = ${fmt(sqrtNegD, 4)}`,
    });
    const realPart = -b / twoA;
    const imagPart = sqrtNegD / twoA;
    steps.push({
      label: "Partea reală și imaginară",
      eq: "x = (−b ± √(−Δ) i) / (2a)",
      value: `α = ${fmt(realPart, 4)}, β = ${fmt(imagPart, 4)}`,
    });
    return {
      a, b, c, delta, rootType: "complex",
      rootTypeText: "Două rădăcini complex conjugate",
      roots: [{ real: realPart, imag: imagPart }, { real: realPart, imag: -imagPart }],
      steps,
    };
  }

  let result: Result = $derived(solve(parse(aRaw), parse(bRaw), parse(cRaw)));

  // ─── Parabola SVG ────────────────────────────────────────────
  const VBW = 320, VBH = 200;
  let parabolaPath = $derived.by(() => {
    if (result.rootType === "invalid") return "";
    const { a, b, c } = result;
    // Find vertex x to center
    const vx = -b / (2 * a);
    const range = 6; // x from vx-range to vx+range
    const points: { x: number; y: number }[] = [];
    let yMin = Infinity, yMax = -Infinity;
    const N = 60;
    for (let i = 0; i <= N; i++) {
      const x = vx - range + (2 * range * i) / N;
      const y = a * x * x + b * x + c;
      points.push({ x, y });
      if (y < yMin) yMin = y;
      if (y > yMax) yMax = y;
    }
    if (yMax === yMin) yMax = yMin + 1;
    const xMin = vx - range, xMax = vx + range;
    const sx = (x: number) => ((x - xMin) / (xMax - xMin)) * VBW;
    const sy = (y: number) => VBH - ((y - yMin) / (yMax - yMin)) * VBH;
    let d = "";
    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      d += (i === 0 ? "M" : "L") + sx(p.x).toFixed(2) + "," + sy(p.y).toFixed(2);
    }
    // Axis x line at y=0 if visible
    let axisY = NaN;
    if (yMin <= 0 && 0 <= yMax) axisY = sy(0);
    return { d, axisY, sx, sy, xMin, xMax, yMin, yMax };
  });

  function setPreset(a: number, b: number, c: number) {
    aRaw = a.toString();
    bRaw = b.toString();
    cRaw = c.toString();
  }
</script>

<div class="quad">
  <div class="quad__banner">
    <span class="quad__banner-formula">ax² + bx + c = 0</span>
  </div>

  <!-- Inputs -->
  <div class="quad__inputs">
    <div class="quad__field">
      <label for="qa" class="quad__label">a</label>
      <input id="qa" type="text" inputmode="decimal" class="quad__input quad__input--a"
             value={aRaw}
             oninput={(e) => (aRaw = (e.target as HTMLInputElement).value)} />
    </div>
    <div class="quad__field">
      <label for="qb" class="quad__label">b</label>
      <input id="qb" type="text" inputmode="decimal" class="quad__input quad__input--b"
             value={bRaw}
             oninput={(e) => (bRaw = (e.target as HTMLInputElement).value)} />
    </div>
    <div class="quad__field">
      <label for="qc" class="quad__label">c</label>
      <input id="qc" type="text" inputmode="decimal" class="quad__input quad__input--c"
             value={cRaw}
             oninput={(e) => (cRaw = (e.target as HTMLInputElement).value)} />
    </div>
  </div>

  <!-- Presets -->
  <div class="quad__presets">
    <span class="quad__presets-label">Exemple:</span>
    <button class="quad__chip" onclick={() => setPreset(1, -5, 6)}>x² − 5x + 6</button>
    <button class="quad__chip" onclick={() => setPreset(1, -2, 1)}>x² − 2x + 1</button>
    <button class="quad__chip" onclick={() => setPreset(1, 2, 5)}>x² + 2x + 5</button>
    <button class="quad__chip" onclick={() => setPreset(2, -7, 3)}>2x² − 7x + 3</button>
  </div>

  <!-- Result summary -->
  {#if result.rootType !== "invalid"}
    <div class="quad__result" class:quad__result--complex={result.rootType === "complex"}>
      <div class="quad__result-type">{result.rootTypeText}</div>
      <ul class="quad__roots">
        {#each result.roots as root, i}
          <li>
            <span class="quad__root-label">x{i === 0 ? "₁" : "₂"}</span>
            <span class="quad__root-eq">=</span>
            <span class="quad__root-value">
              {fmt(root.real, 4)}{#if root.imag !== 0}{" "}{root.imag > 0 ? "+" : "−"}{" "}{fmt(Math.abs(root.imag), 4)} i{/if}
            </span>
          </li>
        {/each}
      </ul>
    </div>

    <!-- Parabola SVG -->
    {#if typeof parabolaPath === "object"}
      <div class="quad__svg-wrap" aria-label="Reprezentare grafică a parabolei">
        <svg viewBox={`0 0 ${VBW} ${VBH}`} class="quad__svg" preserveAspectRatio="xMidYMid meet">
          {#if Number.isFinite(parabolaPath.axisY)}
            <line x1="0" x2={VBW} y1={parabolaPath.axisY} y2={parabolaPath.axisY}
                  stroke="var(--text-subtle)" stroke-dasharray="4 4" stroke-width="1" />
          {/if}
          <path d={parabolaPath.d} fill="none" stroke="var(--cat-calculator, #4f46e5)" stroke-width="2.5" stroke-linejoin="round" />
          {#each result.roots.filter(r => r.imag === 0) as root}
            {#if root.real >= parabolaPath.xMin && root.real <= parabolaPath.xMax && Number.isFinite(parabolaPath.axisY)}
              <circle cx={parabolaPath.sx(root.real)} cy={parabolaPath.axisY} r="5"
                      fill="var(--cat-calculator, #4f46e5)" stroke="var(--bg-card)" stroke-width="2" />
            {/if}
          {/each}
        </svg>
      </div>
    {/if}

    <!-- Steps table -->
    <div class="quad__steps">
      <h4 class="quad__steps-title">Pași de rezolvare</h4>
      <ol class="quad__steps-list">
        {#each result.steps as step, i}
          <li class="quad__step">
            <div class="quad__step-num">{i + 1}</div>
            <div class="quad__step-body">
              <p class="quad__step-label">{step.label}</p>
              <p class="quad__step-eq">{step.eq}</p>
              <p class="quad__step-value">{step.value}</p>
            </div>
          </li>
        {/each}
      </ol>
    </div>
  {:else}
    <div class="quad__error">⚠ Introdu valori valide. Coeficientul a nu poate fi 0 (altfel ecuația nu mai e de gradul II).</div>
  {/if}
</div>

<style>
  .quad {
    display: flex; flex-direction: column; gap: var(--sp-4);
    padding: var(--sp-5); background: var(--bg-card);
    border: 1px solid var(--border); border-radius: var(--r-lg);
    --quad-accent: var(--cat-calculator, #4f46e5);
  }

  .quad__banner {
    text-align: center; padding: var(--sp-4);
    background: linear-gradient(135deg, var(--quad-accent) 0%, #7c3aed 100%);
    color: #fff; border-radius: var(--r-md);
  }
  .quad__banner-formula {
    font-family: var(--font-mono); font-size: 1.5rem; font-weight: 700;
    letter-spacing: 0.02em;
  }

  .quad__inputs {
    display: grid; grid-template-columns: 1fr 1fr 1fr; gap: var(--sp-3);
  }
  @media (max-width: 480px) { .quad__inputs { grid-template-columns: 1fr 1fr; } }

  .quad__field { display: flex; flex-direction: column; gap: var(--sp-2); }
  .quad__label {
    font-size: 0.875rem; font-weight: 700; color: var(--text);
    text-align: center; font-family: var(--font-mono);
  }
  .quad__input {
    width: 100%; padding: var(--sp-3); outline: none;
    background: var(--bg); color: var(--text);
    border: 2px solid var(--border); border-radius: var(--r-md);
    font-family: var(--font-mono); font-size: 1.25rem; font-weight: 700;
    text-align: center; transition: all var(--t-fast);
  }
  .quad__input:focus {
    border-color: var(--quad-accent);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--quad-accent) 22%, transparent);
  }

  .quad__presets {
    display: flex; flex-wrap: wrap; gap: var(--sp-2);
    align-items: center; justify-content: center;
  }
  .quad__presets-label {
    font-size: 0.75rem; color: var(--text-muted); font-weight: 600;
  }
  .quad__chip {
    padding: 4px 12px; cursor: pointer;
    background: color-mix(in srgb, var(--quad-accent) 12%, transparent);
    color: var(--quad-accent);
    border: 1px solid transparent; border-radius: var(--r-full);
    font-family: var(--font-mono); font-size: 0.75rem; font-weight: 600;
    transition: all var(--t-fast);
  }
  .quad__chip:hover { background: var(--quad-accent); color: #fff; }

  .quad__result {
    padding: var(--sp-4); text-align: center;
    background: color-mix(in srgb, var(--quad-accent) 8%, var(--bg));
    border: 1px solid color-mix(in srgb, var(--quad-accent) 30%, transparent);
    border-radius: var(--r-md);
  }
  .quad__result--complex { --quad-accent: #db2777; }
  .quad__result-type {
    font-size: 0.75rem; font-weight: 700; text-transform: uppercase;
    letter-spacing: 0.06em; color: var(--quad-accent); margin-bottom: var(--sp-2);
  }
  .quad__roots {
    list-style: none; margin: 0; padding: 0;
    display: flex; flex-direction: column; gap: var(--sp-2);
  }
  .quad__roots li {
    display: flex; gap: var(--sp-2); justify-content: center; align-items: baseline;
    font-family: var(--font-mono);
  }
  .quad__root-label { font-size: 1rem; font-weight: 700; color: var(--text-muted); }
  .quad__root-eq { color: var(--text-subtle); }
  .quad__root-value { font-size: 1.25rem; font-weight: 700; color: var(--text); }

  .quad__svg-wrap {
    background: var(--bg); border: 1px solid var(--border);
    border-radius: var(--r-md); padding: var(--sp-3); overflow: hidden;
  }
  .quad__svg { display: block; width: 100%; height: auto; max-height: 200px; }

  .quad__steps {
    background: var(--bg); border: 1px solid var(--border);
    border-radius: var(--r-md); padding: var(--sp-4);
  }
  .quad__steps-title {
    margin: 0 0 var(--sp-3) 0; font-size: 0.875rem; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.04em; color: var(--text-muted);
  }
  .quad__steps-list {
    list-style: none; margin: 0; padding: 0;
    display: flex; flex-direction: column; gap: var(--sp-3);
  }
  .quad__step { display: flex; gap: var(--sp-3); align-items: flex-start; }
  .quad__step-num {
    flex-shrink: 0; width: 28px; height: 28px;
    background: color-mix(in srgb, var(--quad-accent) 14%, transparent);
    color: var(--quad-accent);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 0.8125rem; font-weight: 700;
  }
  .quad__step-body { flex: 1; min-width: 0; }
  .quad__step-label {
    margin: 0 0 4px 0; font-size: 0.875rem; font-weight: 600; color: var(--text);
  }
  .quad__step-eq {
    margin: 0 0 2px 0; font-family: var(--font-mono);
    font-size: 0.8125rem; color: var(--text-muted);
  }
  .quad__step-value {
    margin: 0; font-family: var(--font-mono);
    font-size: 0.875rem; color: var(--text); font-weight: 600;
  }

  .quad__error {
    padding: var(--sp-3) var(--sp-4); text-align: center;
    background: color-mix(in srgb, #f59e0b 12%, transparent);
    color: #c2410c;
    border: 1px solid color-mix(in srgb, #f59e0b 30%, transparent);
    border-radius: var(--r-md); font-size: 0.875rem;
  }
</style>
