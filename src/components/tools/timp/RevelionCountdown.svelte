<script lang="ts">
  // ============================================================
  // RevelionCountdown.svelte — Numărătoare inversă Revelion (1 ian)
  // Port: math reference VissszaszamlaUjEv.tsx, RO-localizat.
  // Revelion: trecerea în Anul Nou — 31 dec → 1 ian, ora 00:00.
  // Efect: artificii (firework CSS animation).
  // Auto-advance: după 48h celebrare (acoperă 1 + 2 ian, ambele sărbători legale)
  //   trece la Revelionul anului viitor.
  // ============================================================
  import CountdownBase from "./CountdownBase.svelte";

  // 48h celebration window — acoperă 1 ian + 2 ian (a 2-a zi de Anul Nou, sărbătoare legală)
  const CELEBRATION_MS = 48 * 60 * 60 * 1000;

  function getTargetDate(now: Date): Date {
    const y = now.getFullYear();
    // Țintă-candidat: 1 ianuarie din anul curent (poate fi în trecut)
    const thisYear = new Date(y, 0, 1, 0, 0, 0);
    // Suntem în fereastra de celebrare a Revelionului tocmai trecut?
    if (now.getTime() >= thisYear.getTime() && now.getTime() < thisYear.getTime() + CELEBRATION_MS) {
      return thisYear;
    }
    // În rest: țintim spre 1 ianuarie anul viitor (the next Revelion).
    return new Date(y + 1, 0, 1, 0, 0, 0);
  }

  function progressPercent(now: Date, target: Date): number {
    // Bară prin „anul de countdown”: de la 1 ian al anului precedent țintei
    const start = new Date(target.getFullYear() - 1, 0, 1);
    const total = target.getTime() - start.getTime();
    const elapsed = now.getTime() - start.getTime();
    return Math.min(100, Math.max(0, (elapsed / total) * 100));
  }

  function progressLabel(zile: number): string {
    if (zile === 0) return "La mulți ani!";
    return `${zile} ${zile === 1 ? "zi" : "zile"} până la Revelion`;
  }

  function mathFact(zile: number, ore: number, min: number, _sec: number): string {
    const totalOre = zile * 24 + ore;
    const target = getTargetDate(new Date());
    return `Până la 1 ianuarie ${target.getFullYear()}: ${zile} zile, ${totalOre.toLocaleString("ro-RO")} ore. La miezul nopții, în România se aud clopotele bisericilor și se urează „La mulți ani!”.`;
  }
</script>

<CountdownBase
  name="Revelion"
  emoji="🎆"
  {getTargetDate}
  {progressLabel}
  {progressPercent}
  {mathFact}
  celebrationMessage="🎆 La mulți ani! 🎆"
>
  {#snippet effectOverlay()}
    <div class="fw" aria-hidden="true">
      {#each Array(8) as _, i}
        <span class="fw__burst" style="left: {10 + (i * 11)}%; top: {20 + ((i * 7) % 50)}%; animation-delay: -{(i * 0.7) % 5}s;">✨</span>
      {/each}
    </div>
  {/snippet}
</CountdownBase>

<style>
  .fw { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
  .fw__burst {
    position: absolute;
    color: color-mix(in srgb, var(--cat-timp, #f97316) 80%, #ffffff);
    font-size: 1rem;
    animation: firework 4s ease-out infinite;
    opacity: 0;
  }
  @keyframes firework {
    0%, 100% { transform: scale(0.4); opacity: 0; }
    20% { transform: scale(1.5); opacity: 1; }
    50% { transform: scale(2.2); opacity: 0.4; }
    80% { transform: scale(1) rotate(180deg); opacity: 0.2; }
  }
</style>
