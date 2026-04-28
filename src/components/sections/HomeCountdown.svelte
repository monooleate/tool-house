<script lang="ts">
  import { onMount } from "svelte";

  // Live countdown widget pentru pagina principală RO.
  // 3 evenimente: Crăciun (25 dec), Revelion (1 ian) și Paști ortodox (Meeus).

  type Event = {
    id: string;
    title: string;
    emoji: string;
    accentVar: string;
    href: string;
    target: Date;
  };

  // Algoritm Meeus pentru Paștele ortodox (calendar iulian + 13 zile pentru calendar gregorian).
  function orthodoxEaster(year: number): Date {
    const a = year % 4;
    const b = year % 7;
    const c = year % 19;
    const d = (19 * c + 15) % 30;
    const e = (2 * a + 4 * b - d + 34) % 7;
    const month = Math.floor((d + e + 114) / 31);
    const day = ((d + e + 114) % 31) + 1;
    // Calendar iulian → gregorian: +13 zile (pentru 1900-2099)
    const julian = new Date(year, month - 1, day);
    julian.setDate(julian.getDate() + 13);
    return julian;
  }

  function nextChristmas(now: Date): Date {
    const year = now.getFullYear();
    const target = new Date(year, 11, 25, 0, 0, 0); // 25 dec
    return now > target ? new Date(year + 1, 11, 25) : target;
  }

  function nextRevelion(now: Date): Date {
    const year = now.getFullYear();
    const target = new Date(year + 1, 0, 1, 0, 0, 0); // 1 ian (anul următor)
    // Dacă suntem după Anul Nou, folosim ianuarie anul curent? Nu: Revelion = Anul Nou care urmează
    return target;
  }

  function nextOrthodoxEaster(now: Date): Date {
    const yearNow = now.getFullYear();
    let target = orthodoxEaster(yearNow);
    if (now > target) target = orthodoxEaster(yearNow + 1);
    return target;
  }

  let events = $state<Event[]>([]);
  let now = $state<Date>(new Date());
  let mounted = $state<boolean>(false);

  function rebuildEvents() {
    const n = new Date();
    events = [
      { id: "craciun",  title: "Crăciun",         emoji: "🎄", accentVar: "#dc2626", href: "/timp/craciun-numaratoare/",  target: nextChristmas(n) },
      { id: "revelion", title: "Revelion",        emoji: "🎆", accentVar: "#7c3aed", href: "/timp/revelion-numaratoare/", target: nextRevelion(n) },
      { id: "pasti",    title: "Paști ortodox",   emoji: "🐣", accentVar: "#059669", href: "/timp/pasti-numaratoare/",    target: nextOrthodoxEaster(n) },
    ];
  }

  function pad(n: number): string { return n < 10 ? "0" + n : "" + n; }

  function formatDelta(target: Date, current: Date): { d: number; h: number; m: number; s: number; total: number } {
    const total = Math.max(0, target.getTime() - current.getTime());
    const d = Math.floor(total / 86400000);
    const h = Math.floor((total % 86400000) / 3600000);
    const m = Math.floor((total % 3600000) / 60000);
    const s = Math.floor((total % 60000) / 1000);
    return { d, h, m, s, total };
  }

  function formatDate(d: Date): string {
    const months = ["ianuarie","februarie","martie","aprilie","mai","iunie","iulie","august","septembrie","octombrie","noiembrie","decembrie"];
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  }

  onMount(() => {
    mounted = true;
    rebuildEvents();
    const id = setInterval(() => { now = new Date(); }, 1000);
    return () => clearInterval(id);
  });
</script>

<div class="home-cd-grid" role="list">
  {#each events as ev (ev.id)}
    {@const delta = formatDelta(ev.target, now)}
    <a href={ev.href} class="home-cd-card" role="listitem" style={`--cd-accent: ${ev.accentVar}`}>
      <div class="home-cd-card__head">
        <span class="home-cd-card__emoji" aria-hidden="true">{ev.emoji}</span>
        <div class="home-cd-card__titles">
          <h3 class="home-cd-card__title">{ev.title}</h3>
          <p class="home-cd-card__date">{formatDate(ev.target)}</p>
        </div>
      </div>

      {#if mounted}
        <div class="home-cd-card__digits" aria-label={`${delta.d} zile, ${delta.h} ore, ${delta.m} minute, ${delta.s} secunde`}>
          <div class="cd-unit"><span class="cd-num">{delta.d}</span><span class="cd-lbl">zile</span></div>
          <div class="cd-unit"><span class="cd-num">{pad(delta.h)}</span><span class="cd-lbl">ore</span></div>
          <div class="cd-unit"><span class="cd-num">{pad(delta.m)}</span><span class="cd-lbl">min</span></div>
          <div class="cd-unit"><span class="cd-num">{pad(delta.s)}</span><span class="cd-lbl">sec</span></div>
        </div>
      {:else}
        <div class="home-cd-card__digits home-cd-card__digits--ph" aria-hidden="true">
          <div class="cd-unit"><span class="cd-num">—</span><span class="cd-lbl">zile</span></div>
          <div class="cd-unit"><span class="cd-num">—</span><span class="cd-lbl">ore</span></div>
          <div class="cd-unit"><span class="cd-num">—</span><span class="cd-lbl">min</span></div>
          <div class="cd-unit"><span class="cd-num">—</span><span class="cd-lbl">sec</span></div>
        </div>
      {/if}

      <div class="home-cd-card__cta">
        Numărătoare completă <span aria-hidden="true">→</span>
      </div>
    </a>
  {/each}
</div>

<style>
  .home-cd-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: var(--sp-4);
  }

  .home-cd-card {
    display: flex;
    flex-direction: column;
    gap: var(--sp-4);
    padding: var(--sp-5);
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-top: 3px solid var(--cd-accent, var(--accent));
    border-radius: var(--r-lg, 12px);
    text-decoration: none;
    color: var(--text);
    transition: all 180ms ease;
  }
  .home-cd-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 24px rgba(0,0,0,0.08);
    border-color: var(--cd-accent);
  }

  .home-cd-card__head { display: flex; align-items: center; gap: var(--sp-3); }
  .home-cd-card__emoji { font-size: 2.25rem; line-height: 1; }
  .home-cd-card__titles { display: flex; flex-direction: column; gap: 2px; }
  .home-cd-card__title { font-size: 1.0625rem; font-weight: 700; margin: 0; color: var(--text); }
  .home-cd-card__date { font-size: .8125rem; color: var(--text-muted); margin: 0; }

  .home-cd-card__digits {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--sp-2);
    padding: var(--sp-3);
    background: color-mix(in srgb, var(--cd-accent) 6%, var(--bg-input, var(--bg)));
    border-radius: var(--r-md, 8px);
  }
  .home-cd-card__digits--ph .cd-num { color: var(--text-subtle, var(--text-muted)); }

  .cd-unit { display: flex; flex-direction: column; align-items: center; gap: 2px; }
  .cd-num {
    font-family: var(--font-mono, ui-monospace, monospace);
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--cd-accent, var(--accent));
    line-height: 1.1;
    font-variant-numeric: tabular-nums;
  }
  .cd-lbl {
    font-size: 0.6875rem;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .home-cd-card__cta {
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--cd-accent, var(--accent));
    margin-top: auto;
  }
  .home-cd-card:hover .home-cd-card__cta { text-decoration: underline; }
</style>
