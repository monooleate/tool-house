<script lang="ts">
  // ============================================================
  // DateMarimeCalculator.svelte — convertor mărime date (octeți)
  // Unități: bit, B, KB/MB/GB/TB. Comutator zecimal (1000) vs binar (1024).
  // Editezi orice câmp → celelalte se recalculează. Bază internă: octeți (B).
  // ============================================================
  type Mode = "zecimal" | "binar";
  let mode = $state<Mode>("zecimal");

  // factori (în octeți) pentru fiecare nivel
  const DECIMAL = { base: 1000, units: ["bit", "B", "KB", "MB", "GB", "TB"] };
  const BINAR = { base: 1024, units: ["bit", "B", "KiB", "MiB", "GiB", "TiB"] };

  // octeți pentru fiecare unitate, după nivel (index): bit=0, B=1, K=2, M=3, G=4, T=5
  function factorBytes(index: number, base: number): number {
    if (index === 0) return 1 / 8;        // bit
    if (index === 1) return 1;            // B
    return Math.pow(base, index - 1);     // K=base^1, M=base^2, ...
  }

  let bytes = $state(1_000_000); // implicit 1 MB
  let conf = $derived(mode === "zecimal" ? DECIMAL : BINAR);

  function valueOf(index: number): number {
    const v = bytes / factorBytes(index, conf.base);
    // rotunjire la max 6 zecimale, fără zerouri inutile
    return Math.round(v * 1e6) / 1e6;
  }
  function setUnit(index: number, v: number) {
    bytes = v * factorBytes(index, conf.base);
  }

  const REFS = [
    { label: "1 KB text", bytes: 1000 },
    { label: "1 MB foto", bytes: 1_000_000 },
    { label: "700 MB CD", bytes: 700_000_000 },
    { label: "4,7 GB DVD", bytes: 4_700_000_000 },
    { label: "1 TB SSD", bytes: 1_000_000_000_000 },
  ];
</script>

<div class="dm">
  <div class="dm__modes" role="tablist">
    <button type="button" role="tab" aria-selected={mode === "zecimal"} class:is-active={mode === "zecimal"} onclick={() => (mode = "zecimal")}>
      Zecimal (1 KB = 1000 B)
    </button>
    <button type="button" role="tab" aria-selected={mode === "binar"} class:is-active={mode === "binar"} onclick={() => (mode = "binar")}>
      Binar (1 KiB = 1024 B)
    </button>
  </div>

  <div class="dm__grid">
    {#each conf.units as u, i}
      <div class="dm__field">
        <label class="dm__label" for={`dm-${i}`}>{u}</label>
        <div class="dm__wrap">
          <input id={`dm-${i}`} type="number" inputmode="decimal" step="any" min="0"
            value={valueOf(i)}
            oninput={(e) => setUnit(i, Number((e.target as HTMLInputElement).value))}
            class="dm__input" />
        </div>
      </div>
    {/each}
  </div>

  <p class="dm__hint">Modifică orice câmp — celelalte se actualizează instant</p>

  <div class="dm__refs">
    <span class="dm__refs-label">Exemple:</span>
    {#each REFS as r}
      <button type="button" class="dm__chip" onclick={() => (bytes = r.bytes)}>{r.label}</button>
    {/each}
  </div>

  <div class="dm__formula">
    <strong>Atenție:</strong> sistemele de operare (Windows) afișează adesea binar (1024), dar producătorii de discuri folosesc zecimal (1000) — de aceea un disc „1 TB” apare ca ~931 GiB.
  </div>
</div>

<style>
  .dm { --accent: var(--cat-conversii, #8b5cf6); display: flex; flex-direction: column; gap: var(--sp-4, 1rem); padding: var(--sp-5, 1.25rem); background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--r-lg); }
  .dm__modes { display: flex; flex-wrap: wrap; gap: 0.3rem; }
  .dm__modes button { flex: 1; min-width: 180px; padding: 0.55rem 0.7rem; border: 1px solid var(--border); background: var(--bg-input); color: var(--text); border-radius: var(--r-md); cursor: pointer; font: inherit; font-size: 0.85rem; }
  .dm__modes button.is-active { background: var(--accent); color: #fff; border-color: var(--accent); }
  .dm__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--sp-3, 0.75rem); }
  @media (max-width: 560px) { .dm__grid { grid-template-columns: repeat(2, 1fr); } }
  .dm__field { display: flex; flex-direction: column; gap: 0.3rem; }
  .dm__label { font-size: 0.8rem; color: var(--text-muted); font-weight: 600; }
  .dm__wrap { background: var(--bg-input); border: 1px solid var(--border); border-radius: var(--r-md); padding: 0.5rem 0.6rem; }
  .dm__wrap:focus-within { border-color: var(--accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 18%, transparent); }
  .dm__input { width: 100%; border: none; background: transparent; color: var(--text); font-size: 1.1rem; font-weight: 700; font-family: var(--font-mono); text-align: center; outline: none; }
  .dm__input::-webkit-outer-spin-button, .dm__input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
  .dm__input { -moz-appearance: textfield; }
  .dm__hint { text-align: center; color: var(--text-subtle); font-size: 0.8125rem; margin: 0; }
  .dm__refs { display: flex; flex-wrap: wrap; gap: var(--sp-2, 0.5rem); align-items: center; justify-content: center; padding-top: var(--sp-3, 0.75rem); border-top: 1px solid var(--border); }
  .dm__refs-label { font-size: 0.8125rem; color: var(--text-muted); font-weight: 500; width: 100%; text-align: center; }
  .dm__chip { padding: 4px 10px; font-size: 0.8125rem; font-weight: 600; background: color-mix(in srgb, var(--accent) 14%, transparent); color: var(--accent); border: 1px solid transparent; border-radius: var(--r-full); cursor: pointer; }
  .dm__chip:hover { background: var(--accent); color: #fff; }
  .dm__formula { text-align: center; font-size: 0.8125rem; color: var(--text-muted); padding: var(--sp-3, 0.75rem); background: var(--bg-input); border-radius: var(--r-md); }
</style>
