<script lang="ts">
  // ============================================================
  // MedieAdmitereCalculator.svelte — media de admitere la liceu
  // Din 2024: media = (nota EN Limba română + nota EN Matematică) / 2,
  // cu 2 zecimale, FĂRĂ rotunjire (trunchiere). Media gimnaziului NU intră
  // în calcul — este doar criteriu de departajare.
  // ============================================================
  let romanaRaw = $state("8.50");
  let mateRaw = $state("9.20");
  let gimnaziuRaw = $state(""); // opțional — doar pentru departajare

  function nota(s: string): number {
    const v = parseFloat(s.replace(",", "."));
    return Number.isFinite(v) ? v : NaN;
  }
  function trunc2(x: number): number {
    return Math.floor(x * 100) / 100;
  }
  function fmt2(x: number): string {
    return Number.isFinite(x) ? trunc2(x).toFixed(2) : "–";
  }

  let rez = $derived.by(() => {
    const r = nota(romanaRaw);
    const m = nota(mateRaw);
    if (!Number.isFinite(r) || !Number.isFinite(m)) return null;
    if (r < 1 || r > 10 || m < 1 || m > 10) return { err: "Notele trebuie să fie între 1 și 10." };
    const media = trunc2((r + m) / 2);
    const g = nota(gimnaziuRaw);
    const hasGimnaziu = Number.isFinite(g) && g >= 1 && g <= 10;
    return { r, m, media, hasGimnaziu, gimnaziu: hasGimnaziu ? g : null };
  });
</script>

<div class="ma">
  <div class="ma__inputs">
    <label class="ma__field">
      <span>Nota EN — Limba română</span>
      <input type="text" inputmode="decimal" bind:value={romanaRaw} />
    </label>
    <label class="ma__field">
      <span>Nota EN — Matematică</span>
      <input type="text" inputmode="decimal" bind:value={mateRaw} />
    </label>
    <label class="ma__field">
      <span>Media claselor V–VIII <em>(opțional, doar departajare)</em></span>
      <input type="text" inputmode="decimal" bind:value={gimnaziuRaw} placeholder="ex: 9,15" />
    </label>
  </div>

  {#if rez && "err" in rez}
    <p class="ma__err" role="alert">{rez.err}</p>
  {:else if rez}
    <div class="ma__main">
      <span class="ma__main-label">Media de admitere</span>
      <span class="ma__main-value">{fmt2(rez.media)}</span>
    </div>
    <div class="ma__formula">
      <strong>Formula (din 2024):</strong> ({fmt2(rez.r)} + {fmt2(rez.m)}) / 2 = {fmt2(rez.media)}
      <br />Media se calculează cu 2 zecimale, fără rotunjire.
    </div>
    {#if rez.hasGimnaziu}
      <p class="ma__note">La departajare (note egale), primul criteriu este media claselor V–VIII: <strong>{fmt2(rez.gimnaziu!)}</strong>.</p>
    {/if}
  {/if}

  <p class="ma__disclaimer">
    <strong>ℹ️ Important:</strong> începând cu 2024, media claselor V–VIII <strong>nu mai intră</strong> în media de admitere.
    Aceasta este media notelor de la Evaluarea Națională (română + matematică). Media gimnaziului contează doar la departajare, în caz de note egale.
  </p>
</div>

<style>
  .ma { --accent: var(--cat-calculator, #4f46e5); display: flex; flex-direction: column; gap: var(--sp-4, 1rem); padding: var(--sp-5, 1.25rem); background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--r-lg); }
  .ma__inputs { display: flex; flex-wrap: wrap; gap: var(--sp-3, 0.75rem); }
  .ma__field { display: flex; flex-direction: column; gap: 0.3rem; flex: 1; min-width: 180px; }
  .ma__field span { font-size: 0.8rem; color: var(--text-muted); }
  .ma__field em { font-style: italic; opacity: 0.8; }
  .ma__field input { padding: 0.55rem 0.7rem; border: 1px solid var(--border); background: var(--bg-input); color: var(--text); border-radius: var(--r-md); font: inherit; font-size: 1.2rem; font-family: var(--font-mono); text-align: center; outline: none; }
  .ma__field input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 18%, transparent); }
  .ma__main { display: flex; flex-direction: column; gap: 0.2rem; align-items: center; text-align: center; padding: var(--sp-4, 1rem); background: color-mix(in srgb, var(--accent) 10%, transparent); border-radius: var(--r-md); }
  .ma__main-label { font-size: 0.85rem; color: var(--text-muted); }
  .ma__main-value { font-size: 2.4rem; font-weight: 700; color: var(--accent); font-family: var(--font-mono); }
  .ma__formula { text-align: center; font-size: 0.9rem; color: var(--text); background: var(--bg-input); border: 1px solid var(--border); border-radius: var(--r-md); padding: var(--sp-3, 0.75rem); font-family: var(--font-mono); }
  .ma__note { font-size: 0.85rem; color: var(--text-muted); margin: 0; text-align: center; }
  .ma__err { color: #dc2626; text-align: center; margin: 0; }
  .ma__disclaimer { margin: 0; font-size: 0.82rem; color: var(--text-muted); padding: var(--sp-3, 0.75rem); background: color-mix(in srgb, var(--accent) 8%, transparent); border-radius: var(--r-md); }
</style>
