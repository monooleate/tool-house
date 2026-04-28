<script lang="ts">
  // ============================================================
  // CraciunCountdown.svelte — Numărătoare inversă Crăciun (25 dec)
  // Port: math reference VissszaszamlaKaracsony.tsx, RO-localizat.
  // Crăciunul în România: 25 decembrie (sărbătoare legală + 26 a 2-a zi).
  // Efect: ninsoare (snowflakes) — SVG / CSS animație.
  // Auto-advance: după 48h celebrare (acoperă 25 + 26 dec) trece la anul următor.
  // ============================================================
  import CountdownBase from "./CountdownBase.svelte";

  // 48h celebration window — acoperă 25 dec + 26 dec (a 2-a zi de Crăciun, sărbătoare legală)
  const CELEBRATION_MS = 48 * 60 * 60 * 1000;

  function getTargetDate(now: Date): Date {
    const y = now.getFullYear();
    const thisYear = new Date(y, 11, 25);
    // Dacă suntem încă în fereastra de celebrare a Crăciunului din anul curent, păstrează țința
    if (now.getTime() >= thisYear.getTime() && now.getTime() < thisYear.getTime() + CELEBRATION_MS) {
      return thisYear;
    }
    // În rest: dacă încă nu a venit Crăciunul anul ăsta → țintă anul curent; altfel → anul viitor
    return now < thisYear ? thisYear : new Date(y + 1, 11, 25);
  }

  function progressPercent(now: Date, target: Date): number {
    // Bară prin anul calendaristic AL țintei (care poate fi y curent sau y+1 după 26 dec)
    const targetY = target.getFullYear();
    const jan1 = new Date(targetY, 0, 1);
    const total = target.getTime() - jan1.getTime();
    const elapsed = now.getTime() - jan1.getTime();
    return Math.min(100, Math.max(0, (elapsed / total) * 100));
  }

  function progressLabel(zile: number): string {
    if (zile === 0) return "Crăciun fericit!";
    if (zile === 1) return "1 zi până la Crăciun";
    return `${zile} zile până la Crăciun`;
  }

  function mathFact(zile: number, ore: number, min: number, _sec: number): string {
    const totalOre = zile * 24 + ore;
    const totalMin = totalOre * 60 + min;
    return `Până la Crăciun: ${zile} zile = ${totalOre.toLocaleString("ro-RO")} ore = ${totalMin.toLocaleString("ro-RO")} minute. Crăciunul în România este sărbătoare legală pe 25 și 26 decembrie.`;
  }
</script>

<CountdownBase
  name="Crăciun"
  emoji="🎄"
  {getTargetDate}
  {progressLabel}
  {progressPercent}
  {mathFact}
  celebrationMessage="🎄 Crăciun fericit! 🎄"
>
  {#snippet effectOverlay()}
    <div class="snow" aria-hidden="true">
      {#each Array(20) as _, i}
        <span class="snow__flake" style="left: {(i * 5) + Math.random() * 4}%; animation-delay: -{(i * 0.5) % 10}s; animation-duration: {8 + (i % 5)}s;">❄</span>
      {/each}
    </div>
  {/snippet}
</CountdownBase>

<style>
  .snow { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
  .snow__flake {
    position: absolute; top: -10%;
    color: color-mix(in srgb, var(--cat-timp, #f97316) 30%, #ffffff80);
    font-size: 0.875rem;
    animation: snowfall linear infinite;
    opacity: 0.6;
  }
  @keyframes snowfall {
    0% { transform: translateY(-10%) translateX(0) rotate(0deg); opacity: 0; }
    10% { opacity: 0.6; }
    100% { transform: translateY(110%) translateX(20px) rotate(360deg); opacity: 0; }
  }
</style>
