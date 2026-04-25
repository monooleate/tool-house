<script lang="ts">
  // ============================================================
  // EcuatieExponentialaCalculator.svelte – a · bˣ = c (RO)
  // Portolva a math reference CalcExponential.tsx-ből.
  // Funkciók: a/b/c input, lépésenkénti megoldás logaritmussal,
  // verifikáció, hibakezelés (b≤0, b=1, c/a≤0).
  // ============================================================

  let aRaw = $state("2");
  let bRaw = $state("3");
  let cRaw = $state("54");

  function parse(v: string): number {
    const cleaned = v.replace(/\s/g, "").replace(",", ".");
    const n = parseFloat(cleaned);
    return Number.isFinite(n) ? n : NaN;
  }

  function fmt(n: number, decimals = 4): string {
    if (!Number.isFinite(n)) return "–";
    if (Number.isInteger(n)) return n.toString();
    return n.toFixed(decimals).replace(/\.?0+$/, "");
  }

  type Step = { label: string; eq: string; result: string };
  type Solution = { x: number | null; steps: Step[]; error?: string };

  function solve(a: number, b: number, c: number): Solution {
    const steps: Step[] = [];

    if (!Number.isFinite(a) || !Number.isFinite(b) || !Number.isFinite(c)) {
      return { x: null, steps, error: "Introdu numere valide pentru toți coeficienții." };
    }

    steps.push({
      label: "Punct de plecare",
      eq: `${fmt(a)} · ${fmt(b)}^x = ${fmt(c)}`,
      result: "Rezolvăm ecuația pentru x.",
    });

    if (a === 0) return { x: null, steps, error: "Coeficientul a nu poate fi zero." };
    if (b <= 0 || b === 1) return { x: null, steps, error: "Baza b trebuie să fie pozitivă și diferită de 1." };

    const ratio = c / a;
    steps.push({
      label: "Împărțim cu a",
      eq: `${fmt(b)}^x = c / a`,
      result: `${fmt(b)}^x = ${fmt(ratio, 6)}`,
    });

    if (ratio <= 0) {
      return {
        x: null, steps,
        error: "Nu există soluție reală: o expresie exponențială bˣ este mereu pozitivă, deci raportul c/a trebuie să fie pozitiv.",
      };
    }

    steps.push({
      label: "Logaritmăm ambele părți",
      eq: `log(${fmt(b)}^x) = log(${fmt(ratio, 6)})`,
      result: `x · log(${fmt(b)}) = log(${fmt(ratio, 6)})`,
    });

    const logB = Math.log(b);
    const logR = Math.log(ratio);
    const x = logR / logB;

    steps.push({
      label: "Izolăm x",
      eq: "x = log(c/a) / log(b)",
      result: `x = ${fmt(logR, 6)} / ${fmt(logB, 6)}`,
    });

    steps.push({
      label: "Rezultat",
      eq: "x =",
      result: Number.isInteger(x) ? `x = ${x}` : `x ≈ ${fmt(x, 6)}`,
    });

    const verify = a * Math.pow(b, x);
    const ok = Math.abs(verify - c) < 0.001;
    steps.push({
      label: "Verificare",
      eq: `${fmt(a)} · ${fmt(b)}^${fmt(x, 4)} = ${fmt(verify, 4)}`,
      result: ok ? "✓ Corect!" : `≈ ${fmt(c)}`,
    });

    return { x, steps };
  }

  let solution: Solution = $derived(solve(parse(aRaw), parse(bRaw), parse(cRaw)));

  function setPreset(a: string, b: string, c: string) {
    aRaw = a; bRaw = b; cRaw = c;
  }

  const PRESETS = [
    { a: "2", b: "3", c: "54", label: "2 · 3ˣ = 54" },
    { a: "1", b: "2", c: "1024", label: "2ˣ = 1024" },
    { a: "5", b: "10", c: "50000", label: "5 · 10ˣ = 50000" },
    { a: "1", b: "2.718", c: "7.389", label: "eˣ ≈ 7,389" },
  ];
</script>

<div class="exp">
  <!-- Banner -->
  <div class="exp__banner">
    <span class="exp__banner-icon" aria-hidden="true">bˣ</span>
    <div>
      <h2 class="exp__banner-title">Ecuație exponențială</h2>
      <p class="exp__banner-sub">a · bˣ = c – rezolvare cu logaritmi</p>
    </div>
  </div>

  <!-- Live formula display -->
  <div class="exp__display">
    <span class="exp__display-a">{aRaw || "a"}</span>
    <span class="exp__display-op"> · </span>
    <span class="exp__display-b">{bRaw || "b"}</span>
    <sup class="exp__display-sup">x</sup>
    <span class="exp__display-op"> = </span>
    <span class="exp__display-c">{cRaw || "c"}</span>
  </div>

  <!-- Inputs -->
  <div class="exp__inputs">
    <div class="exp__field">
      <label for="exp-a" class="exp__label">a <span class="exp__label-hint">(coeficient)</span></label>
      <input id="exp-a" type="text" inputmode="decimal" class="exp__input exp__input--a"
             value={aRaw}
             oninput={(e) => (aRaw = (e.target as HTMLInputElement).value)} />
    </div>
    <div class="exp__field">
      <label for="exp-b" class="exp__label">b <span class="exp__label-hint">(bază)</span></label>
      <input id="exp-b" type="text" inputmode="decimal" class="exp__input exp__input--b"
             value={bRaw}
             oninput={(e) => (bRaw = (e.target as HTMLInputElement).value)} />
    </div>
    <div class="exp__field">
      <label for="exp-c" class="exp__label">c <span class="exp__label-hint">(rezultat)</span></label>
      <input id="exp-c" type="text" inputmode="decimal" class="exp__input exp__input--c"
             value={cRaw}
             oninput={(e) => (cRaw = (e.target as HTMLInputElement).value)} />
    </div>
  </div>

  <!-- Presets -->
  <div class="exp__presets">
    <span class="exp__presets-label">Exemple:</span>
    {#each PRESETS as p}
      <button class="exp__chip" onclick={() => setPreset(p.a, p.b, p.c)}>{p.label}</button>
    {/each}
  </div>

  <!-- Result -->
  {#if solution.error}
    <div class="exp__error">⚠ {solution.error}</div>
  {:else if solution.x !== null}
    <div class="exp__answer">
      <p class="exp__answer-label">Soluția</p>
      <p class="exp__answer-x">x = {Number.isInteger(solution.x) ? solution.x : fmt(solution.x, 6)}</p>
    </div>

    <div class="exp__steps">
      <h4 class="exp__steps-title">Pași de rezolvare</h4>
      <ol class="exp__steps-list">
        {#each solution.steps as step, i}
          <li class="exp__step">
            <div class="exp__step-num">{i + 1}</div>
            <div class="exp__step-body">
              <p class="exp__step-label">{step.label}</p>
              <p class="exp__step-eq">{step.eq}</p>
              <p class="exp__step-result">{step.result}</p>
            </div>
          </li>
        {/each}
      </ol>
    </div>
  {/if}
</div>

<style>
  .exp {
    display: flex; flex-direction: column; gap: var(--sp-4);
    padding: var(--sp-5); background: var(--bg-card);
    border: 1px solid var(--border); border-radius: var(--r-lg);
    --exp-accent: var(--cat-calculator, #4f46e5);
    --exp-a: #2563eb;
    --exp-b: #7c3aed;
    --exp-c: #059669;
  }

  .exp__banner {
    display: flex; align-items: center; gap: var(--sp-3);
    padding: var(--sp-4);
    background: linear-gradient(135deg, var(--exp-accent) 0%, var(--exp-b) 100%);
    color: #fff; border-radius: var(--r-md);
  }
  .exp__banner-icon {
    flex-shrink: 0; width: 48px; height: 48px;
    background: rgba(255,255,255,0.18);
    border-radius: var(--r-md);
    display: flex; align-items: center; justify-content: center;
    font-family: var(--font-mono); font-size: 1.25rem; font-weight: 700;
  }
  .exp__banner-title { margin: 0; font-size: 1.0625rem; font-weight: 700; }
  .exp__banner-sub { margin: 2px 0 0 0; font-size: 0.8125rem; opacity: 0.92; }

  .exp__display {
    text-align: center; padding: var(--sp-4);
    background: var(--bg); border: 1px solid var(--border);
    border-radius: var(--r-md);
    font-family: var(--font-mono); font-size: 1.5rem; font-weight: 700;
    color: var(--text);
  }
  .exp__display-a { color: var(--exp-a); }
  .exp__display-b { color: var(--exp-b); }
  .exp__display-c { color: var(--exp-c); }
  .exp__display-sup { font-size: 0.7em; vertical-align: super; }
  .exp__display-op { color: var(--text-muted); }

  .exp__inputs {
    display: grid; grid-template-columns: 1fr 1fr 1fr; gap: var(--sp-3);
  }
  @media (max-width: 480px) { .exp__inputs { grid-template-columns: 1fr; } }

  .exp__field { display: flex; flex-direction: column; gap: var(--sp-2); }
  .exp__label {
    font-size: 0.8125rem; font-weight: 600; color: var(--text);
  }
  .exp__label-hint { font-weight: 400; color: var(--text-subtle); font-size: 0.6875rem; }
  .exp__input {
    width: 100%; padding: var(--sp-3); outline: none;
    background: var(--bg); color: var(--text);
    border: 2px solid var(--border); border-radius: var(--r-md);
    font-family: var(--font-mono); font-size: 1.125rem; font-weight: 700;
    text-align: center; transition: all var(--t-fast);
  }
  .exp__input--a:focus { border-color: var(--exp-a); box-shadow: 0 0 0 3px color-mix(in srgb, var(--exp-a) 22%, transparent); }
  .exp__input--b:focus { border-color: var(--exp-b); box-shadow: 0 0 0 3px color-mix(in srgb, var(--exp-b) 22%, transparent); }
  .exp__input--c:focus { border-color: var(--exp-c); box-shadow: 0 0 0 3px color-mix(in srgb, var(--exp-c) 22%, transparent); }

  .exp__presets {
    display: flex; flex-wrap: wrap; gap: var(--sp-2);
    align-items: center; justify-content: center;
  }
  .exp__presets-label {
    font-size: 0.75rem; color: var(--text-muted); font-weight: 600;
  }
  .exp__chip {
    padding: 4px 12px; cursor: pointer;
    background: color-mix(in srgb, var(--exp-accent) 12%, transparent);
    color: var(--exp-accent);
    border: 1px solid transparent; border-radius: var(--r-full);
    font-family: var(--font-mono); font-size: 0.75rem; font-weight: 600;
    transition: all var(--t-fast);
  }
  .exp__chip:hover { background: var(--exp-accent); color: #fff; }

  .exp__error {
    padding: var(--sp-3) var(--sp-4); text-align: center;
    background: color-mix(in srgb, #f59e0b 12%, transparent);
    color: #c2410c;
    border: 1px solid color-mix(in srgb, #f59e0b 30%, transparent);
    border-radius: var(--r-md); font-size: 0.875rem;
  }

  .exp__answer {
    text-align: center; padding: var(--sp-4);
    background: color-mix(in srgb, var(--exp-c) 10%, var(--bg));
    border: 2px solid color-mix(in srgb, var(--exp-c) 30%, transparent);
    border-radius: var(--r-md);
  }
  .exp__answer-label {
    margin: 0 0 4px 0; font-size: 0.75rem; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.06em; color: var(--exp-c);
  }
  .exp__answer-x {
    margin: 0; font-family: var(--font-mono); font-size: 1.75rem; font-weight: 700;
    color: var(--exp-c);
  }

  .exp__steps {
    background: var(--bg); border: 1px solid var(--border);
    border-radius: var(--r-md); padding: var(--sp-4);
  }
  .exp__steps-title {
    margin: 0 0 var(--sp-3) 0; font-size: 0.875rem; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.04em; color: var(--text-muted);
  }
  .exp__steps-list {
    list-style: none; margin: 0; padding: 0;
    display: flex; flex-direction: column; gap: var(--sp-3);
  }
  .exp__step { display: flex; gap: var(--sp-3); align-items: flex-start; }
  .exp__step-num {
    flex-shrink: 0; width: 28px; height: 28px;
    background: color-mix(in srgb, var(--exp-accent) 14%, transparent);
    color: var(--exp-accent);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 0.8125rem; font-weight: 700;
  }
  .exp__step-body { flex: 1; min-width: 0; }
  .exp__step-label {
    margin: 0 0 4px 0; font-size: 0.875rem; font-weight: 600; color: var(--text);
  }
  .exp__step-eq {
    margin: 0 0 2px 0; font-family: var(--font-mono);
    font-size: 0.8125rem; color: var(--text-muted);
  }
  .exp__step-result {
    margin: 0; font-family: var(--font-mono);
    font-size: 0.875rem; color: var(--text); font-weight: 600;
  }
</style>
