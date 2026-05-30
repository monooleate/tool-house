<script lang="ts">
  // ============================================================
  // SarcinaCalculator.svelte — Calculator sarcină (data probabilă a nașterii)
  // Regula Naegele: DPN = prima zi a ultimei menstruații (UM) + 280 zile,
  // ajustat pentru lungimea ciclului. Mod alternativ: data concepției (+266 zile).
  // Calculează: DPN, săptămâna de sarcină (împlinită + zile), trimestrul.
  // Caracter informativ — NU înlocuiește consultul medical.
  // ============================================================
  const MS_DAY = 86_400_000;
  const RO_MONTHS = ["ianuarie","februarie","martie","aprilie","mai","iunie","iulie","august","septembrie","octombrie","noiembrie","decembrie"];
  const RO_WEEKDAYS = ["duminică","luni","marți","miercuri","joi","vineri","sâmbătă"];

  type Mode = "um" | "conceptie";
  let mode = $state<Mode>("um");
  let dataRaw = $state("");
  let cicluRaw = $state("28");

  function parseDate(s: string): Date | null {
    if (!s) return null;
    const [y, m, d] = s.split("-").map(Number);
    if (!y || !m || !d) return null;
    const dt = new Date(y, m - 1, d);
    dt.setHours(0, 0, 0, 0);
    return Number.isNaN(dt.getTime()) ? null : dt;
  }
  function fmtRo(d: Date): string {
    return `${d.getDate()} ${RO_MONTHS[d.getMonth()]} ${d.getFullYear()}`;
  }

  let rez = $derived.by(() => {
    const base = parseDate(dataRaw);
    if (!base) return null;
    const ciclu = Math.min(45, Math.max(20, parseInt(cicluRaw) || 28));

    // Echivalentul „prima zi a ultimei menstruații" (UM)
    const um = mode === "um" ? new Date(base) : new Date(base.getTime() - 14 * MS_DAY);
    // Ajustare ciclu (doar la modul UM): ovulația la zi (ciclu − 14)
    const ajustare = mode === "um" ? (ciclu - 28) : 0;
    const dpn = new Date(um.getTime() + (280 + ajustare) * MS_DAY);

    const azi = new Date();
    azi.setHours(0, 0, 0, 0);
    const gaZile = Math.floor((azi.getTime() - um.getTime()) / MS_DAY);
    const gaSapt = Math.floor(gaZile / 7);
    const gaRest = ((gaZile % 7) + 7) % 7;
    const zileRamase = Math.round((dpn.getTime() - azi.getTime()) / MS_DAY);

    let trimestru = 1;
    if (gaSapt >= 28) trimestru = 3;
    else if (gaSapt >= 14) trimestru = 2;

    const inInterval = gaZile >= 0 && gaSapt <= 45;
    const progresPct = Math.min(100, Math.max(0, (gaZile / 280) * 100));

    return { dpn, gaZile, gaSapt, gaRest, zileRamase, trimestru, inInterval, progresPct };
  });

  const REPERE = [
    { sapt: "4–8", text: "Bătăile inimii pot fi detectate ecografic." },
    { sapt: "11–13", text: "Ecografia de prim trimestru (translucența nucală)." },
    { sapt: "18–22", text: "Ecografia morfologică (anomalii structurale)." },
    { sapt: "24–28", text: "Testul de toleranță la glucoză." },
    { sapt: "37", text: "Sarcina este considerată „la termen timpuriu”." },
    { sapt: "40", text: "Data probabilă a nașterii (DPN)." },
  ];
</script>

<div class="sarc">
  <div class="sarc__modes" role="tablist">
    <button type="button" class:is-active={mode === "um"} role="tab" aria-selected={mode === "um"} onclick={() => (mode = "um")}>
      Ultima menstruație
    </button>
    <button type="button" class:is-active={mode === "conceptie"} role="tab" aria-selected={mode === "conceptie"} onclick={() => (mode = "conceptie")}>
      Data concepției
    </button>
  </div>

  <div class="sarc__inputs">
    <label class="sarc__field">
      <span>{mode === "um" ? "Prima zi a ultimei menstruații" : "Data concepției / ovulației"}</span>
      <input type="date" bind:value={dataRaw} max="2100-12-31" />
    </label>
    {#if mode === "um"}
      <label class="sarc__field sarc__field--narrow">
        <span>Lungimea ciclului (zile)</span>
        <input type="number" bind:value={cicluRaw} min="20" max="45" />
      </label>
    {/if}
  </div>

  {#if rez}
    {#if rez.inInterval}
      <div class="sarc__main">
        <p class="sarc__main-label">Data probabilă a nașterii</p>
        <p class="sarc__main-value">{fmtRo(rez.dpn)}</p>
        <p class="sarc__main-sub">{RO_WEEKDAYS[rez.dpn.getDay()]}</p>
      </div>

      <div class="sarc__grid">
        <div class="sarc__card">
          <span class="sarc__card-label">Săptămâna de sarcină</span>
          <span class="sarc__card-value">{rez.gaSapt} <small>săpt</small> + {rez.gaRest} <small>zile</small></span>
        </div>
        <div class="sarc__card">
          <span class="sarc__card-label">Trimestru</span>
          <span class="sarc__card-value">{rez.trimestru}</span>
        </div>
        <div class="sarc__card">
          <span class="sarc__card-label">Zile până la naștere</span>
          <span class="sarc__card-value">{rez.zileRamase > 0 ? rez.zileRamase : 0}</span>
        </div>
      </div>

      <div class="sarc__progress" aria-hidden="true">
        <div class="sarc__progress-bar" style="width: {rez.progresPct}%"></div>
      </div>
      <p class="sarc__progress-text">{rez.progresPct.toFixed(0)}% din cele 40 de săptămâni</p>
    {:else}
      <p class="sarc__hint">Data introdusă nu corespunde unei sarcini în curs (0–45 săptămâni). Verifică data.</p>
    {/if}
  {:else}
    <p class="sarc__hint">Introdu o dată pentru a calcula data probabilă a nașterii.</p>
  {/if}

  <div class="sarc__repere">
    <h3 class="sarc__repere-title">Repere importante</h3>
    <ul>
      {#each REPERE as r}
        <li><strong>Săpt. {r.sapt}:</strong> {r.text}</li>
      {/each}
    </ul>
  </div>

  <p class="sarc__disclaimer">
    <strong>⚠️ Disclaimer:</strong> rezultatul are caracter strict informativ și estimativ (regula Naegele).
    Doar ~4% dintre nașteri au loc exact la DPN. Pentru monitorizare și date exacte, consultă medicul obstetrician.
  </p>
</div>

<style>
  .sarc { --accent: var(--cat-sanatate, #e11d48); display: flex; flex-direction: column; gap: var(--sp-4, 1rem); }
  .sarc__modes { display: flex; gap: 0.25rem; flex-wrap: wrap; }
  .sarc__modes button {
    flex: 1; min-width: 140px; padding: 0.6rem 0.75rem; border: 1px solid var(--border, #ddd);
    background: var(--surface, #fff); border-radius: 0.5rem; cursor: pointer; font: inherit;
  }
  .sarc__modes button.is-active { background: var(--accent); color: #fff; border-color: var(--accent); }
  .sarc__inputs { display: flex; gap: var(--sp-3, 0.75rem); flex-wrap: wrap; }
  .sarc__field { display: flex; flex-direction: column; gap: 0.35rem; flex: 1; min-width: 200px; }
  .sarc__field--narrow { max-width: 200px; }
  .sarc__field span { font-size: 0.85rem; color: var(--text-muted, #666); }
  .sarc__field input {
    padding: 0.6rem 0.75rem; border: 1px solid var(--border, #ddd); border-radius: 0.5rem; font: inherit;
  }
  .sarc__main {
    text-align: center; padding: var(--sp-4, 1rem);
    background: color-mix(in srgb, var(--accent) 10%, transparent);
    border-radius: 0.75rem;
  }
  .sarc__main-label { font-size: 0.85rem; color: var(--text-muted, #666); margin: 0; }
  .sarc__main-value { font-size: clamp(1.5rem, 5vw, 2.25rem); font-weight: 700; color: var(--accent); margin: 0.2rem 0; }
  .sarc__main-sub { font-size: 0.95rem; color: var(--text-muted, #666); margin: 0; text-transform: capitalize; }
  .sarc__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--sp-3, 0.75rem); }
  .sarc__card {
    display: flex; flex-direction: column; gap: 0.25rem; padding: var(--sp-3, 0.75rem);
    background: var(--surface, #fff); border: 1px solid var(--border, #eee); border-radius: 0.5rem; text-align: center;
  }
  .sarc__card-label { font-size: 0.75rem; color: var(--text-muted, #666); }
  .sarc__card-value { font-size: 1.4rem; font-weight: 700; }
  .sarc__card-value small { font-size: 0.7rem; font-weight: 500; color: var(--text-muted, #666); }
  .sarc__progress { height: 10px; background: color-mix(in srgb, var(--accent) 15%, transparent); border-radius: 999px; overflow: hidden; }
  .sarc__progress-bar { height: 100%; background: var(--accent); border-radius: 999px; transition: width 0.3s; }
  .sarc__progress-text { text-align: center; font-size: 0.8rem; color: var(--text-muted, #666); margin: 0; }
  .sarc__hint { padding: var(--sp-4, 1rem); text-align: center; color: var(--text-muted, #666); background: var(--surface, #fafafa); border-radius: 0.5rem; }
  .sarc__repere { font-size: 0.9rem; }
  .sarc__repere-title { font-size: 1rem; margin: 0 0 0.5rem; }
  .sarc__repere ul { margin: 0; padding-left: 1.1rem; display: flex; flex-direction: column; gap: 0.3rem; }
  .sarc__disclaimer {
    font-size: 0.82rem; color: var(--text-muted, #555); padding: var(--sp-3, 0.75rem);
    background: color-mix(in srgb, #f59e0b 12%, transparent); border-radius: 0.5rem; margin: 0;
  }
  @media (max-width: 520px) { .sarc__grid { grid-template-columns: 1fr; } }
</style>
