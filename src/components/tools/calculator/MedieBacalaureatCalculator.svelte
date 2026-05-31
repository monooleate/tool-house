<script lang="ts">
  // ============================================================
  // MedieBacalaureatCalculator.svelte — media la Bacalaureat + promovare
  // 3 probe scrise. Media = media aritmetică, 2 zecimale fără rotunjire.
  // Promovare: fiecare probă ≥ 5,00 ȘI media ≥ 6,00. Excepție: 5,99 → 6,00.
  // ============================================================
  const PROBE = [
    { key: "p1", label: "Proba E.a — Limba și literatura română" },
    { key: "p2", label: "Proba E.c — Proba obligatorie a profilului" },
    { key: "p3", label: "Proba E.d — Proba la alegere a profilului" },
  ];
  let note = $state<Record<string, string>>({ p1: "7.50", p2: "6.80", p3: "8.20" });

  function nota(s: string): number {
    const v = parseFloat(s.replace(",", "."));
    return Number.isFinite(v) ? v : NaN;
  }
  function trunc2(x: number): number { return Math.floor(x * 100) / 100; }

  let rez = $derived.by(() => {
    const vals = PROBE.map((p) => nota(note[p.key]));
    if (vals.some((v) => !Number.isFinite(v))) return null;
    if (vals.some((v) => v < 1 || v > 10)) return { err: "Notele trebuie să fie între 1 și 10." };

    let media = trunc2((vals[0] + vals[1] + vals[2]) / 3);
    // Excepție legală: media 5,99 se rotunjește la 6,00
    const ajustat599 = media === 5.99;
    if (ajustat599) media = 6.0;

    const toateProbele = vals.every((v) => v >= 5);
    const promovat = toateProbele && media >= 6;
    return { vals, media, promovat, toateProbele, ajustat599 };
  });
</script>

<div class="bac">
  <div class="bac__inputs">
    {#each PROBE as p}
      <label class="bac__field">
        <span>{p.label}</span>
        <input type="text" inputmode="decimal" value={note[p.key]} oninput={(e) => (note = { ...note, [p.key]: (e.target as HTMLInputElement).value })} />
      </label>
    {/each}
  </div>

  {#if rez && "err" in rez}
    <p class="bac__err" role="alert">{rez.err}</p>
  {:else if rez}
    <div class="bac__main bac--{rez.promovat ? 'ok' : 'no'}">
      <span class="bac__main-label">Media la Bacalaureat</span>
      <span class="bac__main-value">{rez.media.toFixed(2)}</span>
      <span class="bac__main-status">{rez.promovat ? "✅ Promovat" : "❌ Nepromovat"}</span>
    </div>
    {#if rez.ajustat599}
      <p class="bac__adjust">Media 5,99 a fost rotunjită la 6,00 (excepție legală).</p>
    {/if}
    <ul class="bac__checks">
      <li class={rez.toateProbele ? "is-ok" : "is-no"}>
        {rez.toateProbele ? "✓" : "✗"} Toate probele ≥ 5,00
      </li>
      <li class={rez.media >= 6 ? "is-ok" : "is-no"}>
        {rez.media >= 6 ? "✓" : "✗"} Media generală ≥ 6,00
      </li>
    </ul>
    <div class="bac__formula"><strong>Formula:</strong> media = (nota₁ + nota₂ + nota₃) / 3, cu 2 zecimale, fără rotunjire</div>
  {/if}

  <p class="bac__note">
    Condiții de promovare: notă minimă <strong>5,00</strong> la fiecare probă scrisă <strong>și</strong> media generală minimă <strong>6,00</strong>.
    Trebuie susținute și probele de evaluare a competențelor (care nu se notează cu note, ci cu niveluri).
  </p>
</div>

<style>
  .bac { --accent: var(--cat-calculator, #4f46e5); display: flex; flex-direction: column; gap: var(--sp-4, 1rem); padding: var(--sp-5, 1.25rem); background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--r-lg); }
  .bac__inputs { display: flex; flex-direction: column; gap: var(--sp-3, 0.75rem); }
  .bac__field { display: flex; flex-direction: column; gap: 0.3rem; }
  .bac__field span { font-size: 0.82rem; color: var(--text-muted); }
  .bac__field input { padding: 0.55rem 0.7rem; border: 1px solid var(--border); background: var(--bg-input); color: var(--text); border-radius: var(--r-md); font: inherit; font-size: 1.2rem; font-family: var(--font-mono); text-align: center; outline: none; }
  .bac__field input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 18%, transparent); }
  .bac__main { display: flex; flex-direction: column; gap: 0.2rem; align-items: center; text-align: center; padding: var(--sp-4, 1rem); border-radius: var(--r-md); background: color-mix(in srgb, var(--accent) 10%, transparent); }
  .bac__main.bac--ok { background: color-mix(in srgb, #16a34a 16%, transparent); }
  .bac__main.bac--no { background: color-mix(in srgb, #dc2626 14%, transparent); }
  .bac__main-label { font-size: 0.85rem; color: var(--text-muted); }
  .bac__main-value { font-size: 2.4rem; font-weight: 700; color: var(--text); font-family: var(--font-mono); }
  .bac__main-status { font-size: 1rem; font-weight: 700; color: var(--text); }
  .bac__adjust { text-align: center; font-size: 0.82rem; color: var(--text-muted); margin: 0; }
  .bac__checks { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.3rem; }
  .bac__checks li { font-size: 0.9rem; padding: 0.4rem 0.7rem; border-radius: var(--r-md); background: var(--bg-input); }
  .bac__checks li.is-ok { color: #16a34a; }
  .bac__checks li.is-no { color: #dc2626; }
  .bac__formula { text-align: center; font-size: 0.85rem; color: var(--text-muted); padding: var(--sp-3, 0.75rem); background: var(--bg-input); border-radius: var(--r-md); font-family: var(--font-mono); }
  .bac__note { margin: 0; font-size: 0.82rem; color: var(--text-muted); padding: var(--sp-3, 0.75rem); background: color-mix(in srgb, var(--accent) 8%, transparent); border-radius: var(--r-md); }
  .bac__err { color: #dc2626; text-align: center; margin: 0; }
</style>
