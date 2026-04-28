<script lang="ts">
  // ============================================================
  // CateZileAmCalculator.svelte — Câte zile am trăit?
  // Port: math reference VissszaszamlaEletkor.tsx, RO-localizat.
  // Birth date input → live „ai trăit X zile, Y ore..." + mérföldkövek
  // (10 000 zile, 1 milliard secunde, 1 milion de minute etc.)
  // ============================================================
  import { onMount, onDestroy } from "svelte";

  let birthInput = $state("");
  let now = $state(new Date());
  let interval: ReturnType<typeof setInterval> | null = null;

  onMount(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const datum = params.get("data");
      if (datum) birthInput = datum;
    }
    interval = setInterval(() => (now = new Date()), 1000);
  });
  onDestroy(() => {
    if (interval !== null) clearInterval(interval);
  });

  let birthDate = $derived.by((): Date | null => {
    if (!birthInput) return null;
    const d = new Date(birthInput + "T00:00:00");
    if (Number.isNaN(d.getTime())) return null;
    return d;
  });

  let varsta = $derived.by((): null | {
    totalSec: number; totalMin: number; totalOre: number; totalZile: number;
    saptamani: number; luni: number; ani: number;
    aniIntreg: number; luniIntreg: number; zileIntreg: number;
    sec: number; min: number; ora: number;
  } => {
    if (!birthDate) return null;
    const ms = now.getTime() - birthDate.getTime();
    if (ms < 0) return null;
    const totalSec = Math.floor(ms / 1000);
    const totalMin = Math.floor(totalSec / 60);
    const totalOre = Math.floor(totalMin / 60);
    const totalZile = Math.floor(totalOre / 24);
    let aniIntreg = now.getFullYear() - birthDate.getFullYear();
    let luniIntreg = now.getMonth() - birthDate.getMonth();
    let zileIntreg = now.getDate() - birthDate.getDate();
    if (zileIntreg < 0) {
      luniIntreg--;
      const prev = new Date(now.getFullYear(), now.getMonth(), 0);
      zileIntreg += prev.getDate();
    }
    if (luniIntreg < 0) { aniIntreg--; luniIntreg += 12; }
    return {
      totalSec, totalMin, totalOre, totalZile,
      saptamani: totalZile / 7,
      luni: totalZile / 30.44,
      ani: totalZile / 365.25,
      aniIntreg, luniIntreg, zileIntreg,
      sec: totalSec % 60, min: totalMin % 60, ora: totalOre % 24,
    };
  });

  type Milestone = { val: number; label: string; unit: "zile" | "ore" | "min" | "sec"; getProg: (v: typeof varsta) => number };

  const MILESTONES: Milestone[] = [
    { val: 1000,        label: "1 000 de zile (~2,7 ani)",            unit: "zile", getProg: (v) => v?.totalZile ?? 0 },
    { val: 5000,        label: "5 000 de zile (~13,7 ani)",            unit: "zile", getProg: (v) => v?.totalZile ?? 0 },
    { val: 10000,       label: "10 000 de zile (~27,4 ani)",           unit: "zile", getProg: (v) => v?.totalZile ?? 0 },
    { val: 18250,       label: "18 250 de zile (~50 de ani)",          unit: "zile", getProg: (v) => v?.totalZile ?? 0 },
    { val: 25000,       label: "25 000 de zile (~68,5 ani)",           unit: "zile", getProg: (v) => v?.totalZile ?? 0 },
    { val: 30000,       label: "30 000 de zile (~82,2 ani)",           unit: "zile", getProg: (v) => v?.totalZile ?? 0 },
    { val: 1000000,     label: "1 000 000 de minute (~1,9 ani)",       unit: "min",  getProg: (v) => v?.totalMin ?? 0 },
    { val: 1000000000,  label: "1 000 000 000 secunde (~31,7 ani)",    unit: "sec",  getProg: (v) => v?.totalSec ?? 0 },
  ];

  let milestonesData = $derived.by(() => {
    if (!varsta) return [];
    return MILESTONES.map((m) => {
      const cur = m.getProg(varsta);
      const reached = cur >= m.val;
      const ramane = reached ? 0 : m.val - cur;
      return { ...m, cur, reached, ramane };
    });
  });

  function fmt(n: number, d = 0): string {
    if (!Number.isFinite(n)) return "–";
    return n.toLocaleString("ro-RO", { minimumFractionDigits: 0, maximumFractionDigits: d });
  }

  function emoji(zile: number): string {
    const ani = zile / 365.25;
    if (ani < 2) return "👶";
    if (ani < 12) return "🧒";
    if (ani < 18) return "🧑‍🎓";
    if (ani < 40) return "🧑";
    if (ani < 65) return "🧓";
    return "🌳";
  }
</script>

<div class="cza">
  <div class="cza__header">
    <span class="cza__icon" aria-hidden="true">{varsta ? emoji(varsta.totalZile) : "📅"}</span>
    <div>
      <h2 class="cza__title">Câte zile am trăit?</h2>
      <p class="cza__sub">Ceasul live al vieții tale: zile, ore, minute, secunde + mérföldkövek</p>
    </div>
  </div>

  <div class="cza__field">
    <label for="cza-data" class="cza__label">📅 Data ta de naștere</label>
    <input
      id="cza-data"
      type="date"
      class="cza__input"
      value={birthInput}
      oninput={(e) => (birthInput = (e.target as HTMLInputElement).value)}
    />
  </div>

  {#if !birthDate}
    <p class="cza__empty">Adaugă data ta de naștere pentru a vedea câte zile, ore, minute și secunde ai trăit până acum.</p>
  {/if}

  {#if birthDate && !varsta}
    <p class="cza__empty">Te rog să introduci o dată din trecut.</p>
  {/if}

  {#if varsta}
    <!-- Ceasul mare -->
    <div class="cza__main">
      <span class="cza__main-lbl">Vârsta exactă</span>
      <div class="cza__main-pieces">
        <div class="cza__piece"><span class="cza__piece-num">{varsta.aniIntreg}</span><span class="cza__piece-lbl">{varsta.aniIntreg === 1 ? "an" : "ani"}</span></div>
        <div class="cza__piece"><span class="cza__piece-num">{varsta.luniIntreg}</span><span class="cza__piece-lbl">{varsta.luniIntreg === 1 ? "lună" : "luni"}</span></div>
        <div class="cza__piece"><span class="cza__piece-num">{varsta.zileIntreg}</span><span class="cza__piece-lbl">{varsta.zileIntreg === 1 ? "zi" : "zile"}</span></div>
      </div>
    </div>

    <!-- Ceasul live -->
    <div class="cza__live" role="timer" aria-live="polite">
      <span class="cza__live-lbl">Ceasul live</span>
      <span class="cza__live-clock">
        {fmt(varsta.totalZile)}<small>z</small> {String(varsta.ora).padStart(2, "0")}:{String(varsta.min).padStart(2, "0")}:{String(varsta.sec).padStart(2, "0")}
      </span>
    </div>

    <!-- Grila cu unități -->
    <div class="cza__grid">
      <div class="cza__cell"><span class="cza__cell-num">{fmt(varsta.totalZile)}</span><span class="cza__cell-lbl">zile</span></div>
      <div class="cza__cell"><span class="cza__cell-num">{fmt(varsta.totalOre)}</span><span class="cza__cell-lbl">ore</span></div>
      <div class="cza__cell"><span class="cza__cell-num">{fmt(varsta.totalMin)}</span><span class="cza__cell-lbl">minute</span></div>
      <div class="cza__cell"><span class="cza__cell-num">{fmt(varsta.totalSec)}</span><span class="cza__cell-lbl">secunde</span></div>
      <div class="cza__cell"><span class="cza__cell-num">{fmt(varsta.saptamani, 0)}</span><span class="cza__cell-lbl">săptămâni</span></div>
      <div class="cza__cell"><span class="cza__cell-num">{fmt(varsta.luni, 1)}</span><span class="cza__cell-lbl">luni</span></div>
    </div>

    <!-- Mérföldkövek -->
    <div class="cza__milestones">
      <span class="cza__milestones-lbl">🎯 Mérföldkövek</span>
      <div class="cza__milestones-list">
        {#each milestonesData as m}
          <div class="cza__milestone" class:is-reached={m.reached}>
            <span class="cza__milestone-icon">{m.reached ? "✅" : "⏳"}</span>
            <div class="cza__milestone-text">
              <span class="cza__milestone-name">{m.label}</span>
              {#if m.reached}
                <span class="cza__milestone-status">Atins!</span>
              {:else}
                <span class="cza__milestone-status">Mai sunt {fmt(m.ramane)} {m.unit}</span>
              {/if}
            </div>
          </div>
        {/each}
      </div>
    </div>

    <p class="cza__fact">
      💡 <strong>Tudtad?</strong> 10 000 zile ≈ 27,4 ani. 1 miliard de secunde ≈ 31,7 ani — perfect pentru a sărbători tinerețea matură.
    </p>
  {/if}
</div>

<style>
  .cza {
    display: flex; flex-direction: column; gap: var(--sp-4);
    padding: var(--sp-5); background: var(--bg-card);
    border: 1px solid var(--border); border-radius: var(--r-lg);
    --cza-accent: var(--cat-timp, #f97316);
  }
  .cza__header {
    display: flex; gap: var(--sp-3); align-items: center;
    padding: var(--sp-3); background: var(--bg);
    border: 1px solid var(--border); border-radius: var(--r-md);
  }
  .cza__icon { font-size: 2rem; line-height: 1; }
  .cza__title { margin: 0; font-size: 1rem; font-weight: 700; color: var(--text); }
  .cza__sub { margin: 2px 0 0 0; font-size: 0.8125rem; color: var(--text-muted); }

  .cza__field { display: flex; flex-direction: column; gap: var(--sp-2); }
  .cza__label { font-size: 0.8125rem; color: var(--text-muted); font-weight: 600; }
  .cza__input {
    width: 100%; padding: var(--sp-3);
    background: var(--bg); border: 2px solid var(--border);
    border-radius: var(--r-md); color: var(--text);
    font-family: var(--font-mono); font-size: 1rem; outline: none;
    transition: border-color var(--t-fast);
  }
  .cza__input:focus {
    border-color: var(--cza-accent);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--cza-accent) 18%, transparent);
  }
  .cza__empty {
    margin: 0; text-align: center; padding: var(--sp-3);
    font-size: 0.875rem; color: var(--text-subtle);
    background: var(--bg); border-radius: var(--r-md);
  }

  .cza__main {
    display: flex; flex-direction: column; align-items: center; gap: var(--sp-2);
    padding: var(--sp-4);
    background: color-mix(in srgb, var(--cza-accent) 10%, var(--bg));
    border: 2px solid color-mix(in srgb, var(--cza-accent) 35%, transparent);
    border-radius: var(--r-md);
  }
  .cza__main-lbl { font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.04em; font-weight: 700; }
  .cza__main-pieces { display: flex; gap: var(--sp-4); flex-wrap: wrap; justify-content: center; }
  .cza__piece { display: flex; flex-direction: column; align-items: center; }
  .cza__piece-num { font-family: var(--font-mono); font-size: 2.5rem; font-weight: 800; color: var(--cza-accent); line-height: 1; }
  .cza__piece-lbl { font-size: 0.75rem; color: var(--text-muted); }

  .cza__live {
    display: flex; flex-direction: column; align-items: center; gap: 4px;
    padding: var(--sp-3);
    background: var(--bg); border: 1px solid var(--border); border-radius: var(--r-md);
  }
  .cza__live-lbl { font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.04em; font-weight: 700; }
  .cza__live-clock {
    font-family: var(--font-mono); font-size: clamp(1.25rem, 4vw, 1.875rem);
    font-weight: 800; color: var(--cza-accent);
    font-variant-numeric: tabular-nums;
  }
  .cza__live-clock small { font-size: 0.75em; color: var(--text-muted); margin-right: 8px; font-weight: 500; }

  .cza__grid {
    display: grid; grid-template-columns: repeat(6, 1fr); gap: var(--sp-2);
  }
  @media (max-width: 720px) { .cza__grid { grid-template-columns: repeat(3, 1fr); } }
  @media (max-width: 480px) { .cza__grid { grid-template-columns: repeat(2, 1fr); } }
  .cza__cell {
    display: flex; flex-direction: column; align-items: center; gap: 2px;
    padding: var(--sp-2);
    background: var(--bg); border: 1px solid var(--border); border-radius: var(--r-md);
  }
  .cza__cell-num { font-family: var(--font-mono); font-size: 1rem; font-weight: 800; color: var(--text); }
  .cza__cell-lbl { font-size: 0.6875rem; color: var(--text-muted); }

  .cza__milestones { display: flex; flex-direction: column; gap: var(--sp-2); }
  .cza__milestones-lbl { font-size: 0.75rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.04em; }
  .cza__milestones-list {
    display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-2);
  }
  @media (max-width: 640px) { .cza__milestones-list { grid-template-columns: 1fr; } }
  .cza__milestone {
    display: flex; gap: var(--sp-2); align-items: center;
    padding: var(--sp-2) var(--sp-3);
    background: var(--bg); border: 1px solid var(--border); border-radius: var(--r-md);
  }
  .cza__milestone.is-reached {
    border-color: color-mix(in srgb, var(--cza-accent) 35%, transparent);
    background: color-mix(in srgb, var(--cza-accent) 8%, var(--bg));
  }
  .cza__milestone-icon { font-size: 1rem; }
  .cza__milestone-text { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
  .cza__milestone-name { font-size: 0.8125rem; font-weight: 700; color: var(--text); }
  .cza__milestone-status { font-size: 0.6875rem; color: var(--text-muted); }
  .cza__milestone.is-reached .cza__milestone-status { color: var(--cza-accent); font-weight: 700; }

  .cza__fact {
    margin: 0; font-size: 0.8125rem; color: var(--text-muted);
    padding: var(--sp-3); background: var(--bg);
    border-left: 3px solid color-mix(in srgb, var(--cza-accent) 50%, transparent);
    border-radius: var(--r-sm); line-height: 1.5;
  }
</style>
