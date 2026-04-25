<script lang="ts">
  // ============================================================
  // UnitConverter.svelte – generikus kétirányú egység-konverter
  // Lineáris képlet: rhs = lhs * factor + offset
  //   factor=100,  offset=0   →  cm → mm (1 cm = 10 mm → factor 10)
  //   factor=1.8, offset=32   →  Celsius → Fahrenheit
  //
  // Props:
  //   fromUnit     – bal oldal felirat, pl. "cm"
  //   toUnit       – jobb oldal felirat, pl. "m"
  //   factor       – szorzó (from → to)
  //   offset       – additív eltolás (alapértelmezett 0)
  //   fromLabel    – hosszú felirat bal oldalt, pl. "Centimetri"
  //   toLabel      – hosszú felirat jobb oldalt, pl. "Metri"
  //   defaultValue – kezdeti érték (alap: 1)
  //   decimals     – hány tizedes a kimenet kerekítésénél (alap: 4)
  //   formula      – opcionális leíró szöveg (pl. "1 cm = 0,01 m")
  // ============================================================

  type Props = {
    fromUnit?: string;
    toUnit?: string;
    factor?: number;
    offset?: number;
    fromLabel?: string;
    toLabel?: string;
    defaultValue?: number;
    decimals?: number;
    formula?: string;
  };

  let {
    fromUnit = "A",
    toUnit = "B",
    factor = 1,
    offset = 0,
    fromLabel = "Valoare A",
    toLabel = "Valoare B",
    defaultValue = 1,
    decimals = 4,
    formula = "",
  }: Props = $props();

  // Reaktív, kétirányú állapot
  let leftRaw = $state<string>(String(defaultValue));
  let rightRaw = $state<string>("");

  let lastEdited: "left" | "right" = $state("left");

  // Számítás
  function fmt(n: number): string {
    if (!Number.isFinite(n)) return "";
    // Intelligens tizedesvágás: ha egész, nem mutatunk tizedespontot
    const rounded = Math.round(n * Math.pow(10, decimals)) / Math.pow(10, decimals);
    if (Number.isInteger(rounded)) return rounded.toString();
    return rounded.toFixed(decimals).replace(/0+$/, "").replace(/\.$/, "");
  }

  function parse(s: string): number | null {
    if (s.trim() === "") return null;
    const normalized = s.replace(",", ".").trim();
    const n = Number(normalized);
    return Number.isFinite(n) ? n : null;
  }

  // A→B irány (factor * from + offset)
  function forward(from: number): number {
    return from * factor + offset;
  }
  // B→A (fordított)
  function backward(to: number): number {
    return (to - offset) / factor;
  }

  // Inicializálás
  $effect(() => {
    if (lastEdited === "left") {
      const lv = parse(leftRaw);
      rightRaw = lv === null ? "" : fmt(forward(lv));
    } else {
      const rv = parse(rightRaw);
      leftRaw = rv === null ? "" : fmt(backward(rv));
    }
  });

  function onLeftInput(e: Event) {
    lastEdited = "left";
    leftRaw = (e.target as HTMLInputElement).value;
  }
  function onRightInput(e: Event) {
    lastEdited = "right";
    rightRaw = (e.target as HTMLInputElement).value;
  }

  // Copy helper
  let copiedSide: "left" | "right" | null = $state(null);
  async function copy(side: "left" | "right") {
    const v = side === "left" ? leftRaw : rightRaw;
    try {
      await navigator.clipboard.writeText(v);
      copiedSide = side;
      setTimeout(() => (copiedSide = null), 1500);
    } catch {}
  }

  function swap() {
    const lv = parse(leftRaw);
    if (lv === null) return;
    // Csere: a jobb oldali érték kerül balra, és az új jobb oldal számolódik
    const currentRight = parse(rightRaw);
    if (currentRight !== null) {
      leftRaw = String(currentRight);
      lastEdited = "left";
    }
  }
</script>

<div class="unit-converter">
  <div class="io-grid">
    <div class="io-pane">
      <label for="uc-left" class="pane-label">{fromLabel} <span class="unit">({fromUnit})</span></label>
      <input
        id="uc-left"
        class="num-input"
        type="text"
        inputmode="decimal"
        value={leftRaw}
        oninput={onLeftInput}
        aria-label={fromLabel}
      />
      <div class="pane-actions">
        <button class="btn btn--ghost btn--sm" onclick={() => copy("left")}>
          {copiedSide === "left" ? "✓ Copiat" : "Copiază"}
        </button>
      </div>
    </div>

    <button type="button" class="swap-btn" onclick={swap} aria-label="Inversează">⇄</button>

    <div class="io-pane">
      <label for="uc-right" class="pane-label">{toLabel} <span class="unit">({toUnit})</span></label>
      <input
        id="uc-right"
        class="num-input"
        type="text"
        inputmode="decimal"
        value={rightRaw}
        oninput={onRightInput}
        aria-label={toLabel}
      />
      <div class="pane-actions">
        <button class="btn btn--ghost btn--sm" onclick={() => copy("right")}>
          {copiedSide === "right" ? "✓ Copiat" : "Copiază"}
        </button>
      </div>
    </div>
  </div>

  {#if formula}
    <p class="formula">{formula}</p>
  {/if}
</div>

<style>
  .unit-converter {
    display: flex;
    flex-direction: column;
    gap: var(--sp-4, 1rem);
  }
  .io-grid {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: var(--sp-3, 0.75rem);
    align-items: end;
  }
  @media (max-width: 640px) {
    .io-grid {
      grid-template-columns: 1fr;
    }
  }
  .io-pane {
    display: flex;
    flex-direction: column;
    gap: var(--sp-2, 0.5rem);
  }
  .pane-label {
    font-size: 0.875rem;
    color: var(--text-muted, #666);
    font-weight: 500;
  }
  .unit {
    color: var(--text-subtle, #999);
    font-weight: 400;
  }
  .num-input {
    padding: var(--sp-3, 0.75rem);
    font-size: 1.25rem;
    font-weight: 600;
    border: 1px solid var(--border, #ddd);
    border-radius: var(--r-md, 0.5rem);
    background: var(--bg-input, #fff);
    color: var(--text, #111);
    transition: border-color var(--t-fast, 150ms);
  }
  .num-input:focus {
    outline: none;
    border-color: var(--accent, #4f46e5);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent, #4f46e5) 20%, transparent);
  }
  .swap-btn {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    border: 1px solid var(--border, #ddd);
    background: var(--bg-input, #fff);
    color: var(--text-muted, #666);
    font-size: 1.25rem;
    cursor: pointer;
    transition: all var(--t-fast, 150ms);
    align-self: center;
    margin-bottom: 0.5rem;
  }
  .swap-btn:hover {
    background: var(--accent-subtle, #eef);
    border-color: var(--accent, #4f46e5);
    color: var(--accent, #4f46e5);
  }
  @media (max-width: 640px) {
    .swap-btn {
      transform: rotate(90deg);
      justify-self: center;
    }
  }
  .pane-actions {
    display: flex;
    gap: var(--sp-2, 0.5rem);
  }
  .btn {
    padding: 0.375rem 0.75rem;
    font-size: 0.8125rem;
    border-radius: var(--r-sm, 0.375rem);
    cursor: pointer;
    font-weight: 500;
    transition: all var(--t-fast, 150ms);
  }
  .btn--ghost {
    background: transparent;
    border: 1px solid var(--border, #ddd);
    color: var(--text-muted, #666);
  }
  .btn--ghost:hover {
    background: var(--bg-muted, #f4f4f4);
    color: var(--text, #111);
  }
  .btn--sm {
    font-size: 0.75rem;
  }
  .formula {
    font-size: 0.875rem;
    color: var(--text-muted, #666);
    text-align: center;
    padding: var(--sp-3, 0.75rem);
    background: var(--bg-muted, #f4f4f4);
    border-radius: var(--r-md, 0.5rem);
    margin: 0;
  }
</style>
