<script lang="ts">
  // ============================================================
  // GalonLitriCalculator.svelte – galon ↔ litri (US / UK toggle)
  // Port: GallonLiterCalculator.tsx + UK gallon support.
  // 1 US gal = 3,78541 l | 1 UK gal = 4,54609 l
  // ============================================================
  type Variant = "us" | "uk";
  let variant: Variant = $state("us");

  const FACTORS: Record<Variant, number> = {
    us: 3.78541,
    uk: 4.54609,
  };

  let galRaw = $state("5");
  let lRaw = $state("18,927");

  function fmt(n: number, d = 3): string {
    if (Number.isInteger(n)) return n.toString();
    return parseFloat(n.toFixed(d)).toString().replace(".", ",");
  }
  function parse(v: string): number {
    return parseFloat(v.replace(/\s/g, "").replace(",", "."));
  }

  function recompute() {
    const v = parse(galRaw);
    if (Number.isFinite(v)) lRaw = fmt(v * FACTORS[variant]);
  }

  function setGal(value: string) {
    galRaw = value;
    const v = parse(value);
    lRaw = Number.isFinite(v) ? fmt(v * FACTORS[variant]) : "";
  }
  function setL(value: string) {
    lRaw = value;
    const v = parse(value);
    galRaw = Number.isFinite(v) ? fmt(v / FACTORS[variant]) : "";
  }
  function selectVariant(v: Variant) {
    variant = v;
    recompute();
  }

  const PRESETS = [1, 2, 5, 10, 15, 20, 50];
</script>

<div class="gl">
  <div class="gl__tabs" role="tablist" aria-label="Tip galon">
    <button
      type="button"
      class="gl__tab"
      class:is-active={variant === "us"}
      role="tab"
      aria-selected={variant === "us"}
      onclick={() => selectVariant("us")}
    >
      US (3,785 l)
    </button>
    <button
      type="button"
      class="gl__tab"
      class:is-active={variant === "uk"}
      role="tab"
      aria-selected={variant === "uk"}
      onclick={() => selectVariant("uk")}
    >
      UK (4,546 l)
    </button>
  </div>

  <div class="gl__inputs">
    <div class="gl__field">
      <label for="gl-gal" class="gl__label">Galoane ({variant === "us" ? "US" : "UK"} gal)</label>
      <div class="gl__input-wrap">
        <input
          id="gl-gal"
          type="text"
          inputmode="decimal"
          value={galRaw}
          oninput={(e) => setGal((e.target as HTMLInputElement).value)}
          placeholder="ex. 5"
          class="gl__input"
        />
        <span class="gl__suffix">gal</span>
      </div>
    </div>

    <div class="gl__equals" aria-hidden="true">=</div>

    <div class="gl__field">
      <label for="gl-l" class="gl__label">Litri (l)</label>
      <div class="gl__input-wrap">
        <input
          id="gl-l"
          type="text"
          inputmode="decimal"
          value={lRaw}
          oninput={(e) => setL((e.target as HTMLInputElement).value)}
          placeholder="ex. 18,93"
          class="gl__input"
        />
        <span class="gl__suffix">l</span>
      </div>
    </div>
  </div>

  <p class="gl__hint">Modifică oricare valoare — util la consum auto, prețuri carburant import</p>

  <div class="gl__presets">
    <span class="gl__presets-label">Cantități uzuale:</span>
    {#each PRESETS as p}
      <button
        type="button"
        class="gl__chip"
        onclick={() => setGal(p.toString())}
      >
        {p} gal
      </button>
    {/each}
  </div>

  <div class="gl__formula">
    <strong>Formulă:</strong> 1 US gal = 3,78541 l | 1 UK gal = 4,54609 l
  </div>
</div>

<style>
  .gl {
    display: flex; flex-direction: column; gap: var(--sp-4);
    padding: var(--sp-5); background: var(--bg-card);
    border: 1px solid var(--border); border-radius: var(--r-lg);
  }
  .gl__tabs {
    display: inline-flex; gap: 4px; padding: 4px;
    background: var(--bg); border: 1px solid var(--border); border-radius: var(--r-full);
    align-self: center;
  }
  .gl__tab {
    padding: 6px 16px; font-size: 0.8125rem; font-weight: 600;
    background: transparent; color: var(--text-muted);
    border: none; border-radius: var(--r-full);
    cursor: pointer; transition: all var(--t-fast);
  }
  .gl__tab.is-active {
    background: var(--cat-conversii, #8b5cf6);
    color: #fff;
  }
  .gl__tab:not(.is-active):hover { background: color-mix(in srgb, var(--cat-conversii, #8b5cf6) 15%, transparent); color: var(--text); }

  .gl__inputs {
    display: flex; align-items: end; gap: var(--sp-3);
    flex-wrap: wrap; justify-content: center;
  }
  @media (max-width: 640px) { .gl__inputs { flex-direction: column; align-items: stretch; } }
  .gl__field { display: flex; flex-direction: column; gap: var(--sp-2); flex: 1; min-width: 140px; }
  .gl__label { font-size: 0.8125rem; color: var(--text-muted); font-weight: 500; }
  .gl__input-wrap {
    position: relative;
    background: var(--bg); border: 1px solid var(--border);
    border-radius: var(--r-md); padding: var(--sp-3) var(--sp-5) var(--sp-3) var(--sp-3);
    transition: border-color var(--t-fast);
  }
  .gl__input-wrap:focus-within {
    border-color: var(--cat-conversii, #8b5cf6);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--cat-conversii, #8b5cf6) 18%, transparent);
  }
  .gl__input {
    width: 100%; border: none; background: transparent;
    color: var(--text); font-size: 1.5rem; font-weight: 700;
    font-family: var(--font-mono); text-align: center; outline: none;
  }
  .gl__suffix {
    position: absolute; right: var(--sp-3); top: 50%; transform: translateY(-50%);
    color: var(--text-subtle); font-weight: 600; font-size: 0.8125rem;
  }
  .gl__equals { font-size: 1.5rem; color: var(--text-muted); padding-bottom: var(--sp-3); }
  @media (max-width: 640px) { .gl__equals { display: none; } }
  .gl__hint { text-align: center; color: var(--text-subtle); font-size: 0.8125rem; margin: 0; }
  .gl__presets {
    display: flex; flex-wrap: wrap; gap: var(--sp-2);
    align-items: center; justify-content: center;
    padding-top: var(--sp-3); border-top: 1px solid var(--border);
  }
  .gl__presets-label {
    font-size: 0.8125rem; color: var(--text-muted); font-weight: 500; margin-right: var(--sp-1);
  }
  .gl__chip {
    padding: 4px 10px; font-size: 0.8125rem; font-weight: 600;
    background: color-mix(in srgb, var(--cat-conversii, #8b5cf6) 14%, transparent);
    color: var(--cat-conversii, #8b5cf6);
    border: 1px solid transparent; border-radius: var(--r-full);
    cursor: pointer; transition: all var(--t-fast);
    font-family: var(--font-mono);
  }
  .gl__chip:hover { background: var(--cat-conversii, #8b5cf6); color: #fff; }
  .gl__formula {
    text-align: center; font-size: 0.8125rem; color: var(--text-muted);
    padding: var(--sp-3); background: var(--bg); border-radius: var(--r-md);
  }
</style>
