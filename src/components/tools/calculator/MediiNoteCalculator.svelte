<script lang="ts">
  // ============================================================
  // MediiNoteCalculator.svelte — media notelor școlare (la o materie / generală)
  // Media aritmetică a notelor (1–10), cu 2 zecimale + varianta rotunjită la întreg.
  // Intent: elev (note școlare) — distinct de medie-aritmetica (statistic).
  // ============================================================
  let raw = $state("8, 9, 7, 10, 9");

  function parseNote(s: string): number[] {
    return s
      .split(/[,;\s]+/)
      .map((x) => x.trim())
      .filter((x) => x !== "")
      .map((x) => parseFloat(x.replace(",", ".")))
      .filter((n) => Number.isFinite(n) && n >= 1 && n <= 10);
  }

  let rez = $derived.by(() => {
    const note = parseNote(raw);
    if (note.length === 0) return null;
    const suma = note.reduce((a, b) => a + b, 0);
    const media = suma / note.length;
    const media2 = Math.floor(media * 100) / 100; // 2 zecimale, fără rotunjire
    const rotunjit = Math.round(media);            // la cel mai apropiat întreg (0,50 în sus)
    return { note, n: note.length, suma, media2, rotunjit };
  });
</script>

<div class="mn">
  <label class="mn__field">
    <span>Notele tale (separate prin virgulă)</span>
    <input type="text" inputmode="decimal" bind:value={raw} placeholder="ex: 8, 9, 7, 10" class="mn__input" />
  </label>

  {#if rez}
    <div class="mn__results">
      <div class="mn__card mn__card--main">
        <span class="mn__card-label">Media (2 zecimale)</span>
        <span class="mn__card-value">{rez.media2.toFixed(2)}</span>
      </div>
      <div class="mn__card">
        <span class="mn__card-label">Media rotunjită</span>
        <span class="mn__card-value">{rez.rotunjit}</span>
      </div>
    </div>
    <div class="mn__detail">
      <span><strong>{rez.n}</strong> note · suma = <strong>{rez.suma.toFixed(2).replace(/\.00$/, "")}</strong></span>
      <span class="mn__formula">media = suma / {rez.n} = {rez.media2.toFixed(2)}</span>
    </div>
  {:else}
    <p class="mn__hint">Introdu cel puțin o notă între 1 și 10.</p>
  {/if}

  <p class="mn__note">
    Media la o materie se calculează ca media aritmetică a notelor. La consemnarea în catalog, regulamentul școlar
    poate prevedea rotunjirea la cel mai apropiat întreg (0,50 se rotunjește în sus). Verifică regulamentul în vigoare.
  </p>
</div>

<style>
  .mn { --accent: var(--cat-calculator, #4f46e5); display: flex; flex-direction: column; gap: var(--sp-4, 1rem); padding: var(--sp-5, 1.25rem); background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--r-lg); }
  .mn__field { display: flex; flex-direction: column; gap: 0.3rem; }
  .mn__field span { font-size: 0.8rem; color: var(--text-muted); }
  .mn__input { padding: var(--sp-3, 0.75rem); border: 1px solid var(--border); background: var(--bg-input); color: var(--text); border-radius: var(--r-md); font-size: 1.2rem; font-family: var(--font-mono); text-align: center; outline: none; }
  .mn__input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 18%, transparent); }
  .mn__results { display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-3, 0.75rem); }
  @media (max-width: 480px) { .mn__results { grid-template-columns: 1fr; } }
  .mn__card { display: flex; flex-direction: column; gap: 0.2rem; align-items: center; text-align: center; padding: var(--sp-4, 1rem); background: var(--bg-input); border: 1px solid var(--border); border-radius: var(--r-md); }
  .mn__card--main { background: color-mix(in srgb, var(--accent) 10%, transparent); border-color: transparent; }
  .mn__card-label { font-size: 0.78rem; color: var(--text-muted); }
  .mn__card-value { font-size: 2rem; font-weight: 700; color: var(--accent); font-family: var(--font-mono); }
  .mn__detail { display: flex; flex-direction: column; gap: 0.2rem; align-items: center; font-size: 0.85rem; color: var(--text-muted); }
  .mn__formula { font-family: var(--font-mono); }
  .mn__hint { text-align: center; color: var(--text-muted); padding: var(--sp-3, 0.75rem); }
  .mn__note { margin: 0; font-size: 0.8rem; color: var(--text-muted); padding: var(--sp-3, 0.75rem); background: color-mix(in srgb, var(--accent) 8%, transparent); border-radius: var(--r-md); }
</style>
