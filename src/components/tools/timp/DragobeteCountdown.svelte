<script lang="ts">
  // ============================================================
  // DragobeteCountdown.svelte — Numărătoare inversă Dragobete (24 februarie)
  // Sărbătoarea iubirii la români („Valentine's românesc”).
  // Efect: inimioare care cad.
  // ============================================================
  import CountdownBase from "./CountdownBase.svelte";

  const CELEBRATION_MS = 24 * 60 * 60 * 1000;

  function getTargetDate(now: Date): Date {
    const y = now.getFullYear();
    const thisYear = new Date(y, 1, 24); // 24 februarie
    if (now.getTime() >= thisYear.getTime() && now.getTime() < thisYear.getTime() + CELEBRATION_MS) {
      return thisYear;
    }
    return now < thisYear ? thisYear : new Date(y + 1, 1, 24);
  }

  function progressPercent(now: Date, target: Date): number {
    const targetY = target.getFullYear();
    const jan1 = new Date(targetY, 0, 1);
    const total = target.getTime() - jan1.getTime();
    const elapsed = now.getTime() - jan1.getTime();
    return Math.min(100, Math.max(0, (elapsed / total) * 100));
  }

  function progressLabel(zile: number): string {
    if (zile === 0) return "Dragobete fericit!";
    if (zile === 1) return "1 zi până la Dragobete";
    return `${zile} zile până la Dragobete`;
  }

  function mathFact(zile: number, ore: number, min: number, _sec: number): string {
    const totalOre = zile * 24 + ore;
    const totalMin = totalOre * 60 + min;
    return `Până la Dragobete: ${zile} zile = ${totalOre.toLocaleString("ro-RO")} ore = ${totalMin.toLocaleString("ro-RO")} minute. Dragobete (24 februarie) este sărbătoarea iubirii la români.`;
  }

  const INIMI = ["❤️", "💕", "💖", "💗"];
</script>

<CountdownBase
  name="Dragobete"
  emoji="❤️"
  {getTargetDate}
  {progressLabel}
  {progressPercent}
  {mathFact}
  celebrationMessage="❤️ Dragobete fericit! ❤️"
>
  {#snippet effectOverlay()}
    <div class="inimi" aria-hidden="true">
      {#each Array(16) as _, i}
        <span
          class="inimi__bit"
          style="left: {(i * 6.2) + (i % 4)}%; animation-delay: -{(i * 0.6) % 9}s; animation-duration: {8 + (i % 5)}s;"
        >{INIMI[i % INIMI.length]}</span>
      {/each}
    </div>
  {/snippet}
</CountdownBase>

<style>
  .inimi { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
  .inimi__bit {
    position: absolute; top: -8%;
    font-size: 0.9rem;
    opacity: 0.65;
    animation: inimifall linear infinite;
  }
  @keyframes inimifall {
    0% { transform: translateY(-8%) translateX(0) scale(0.8); opacity: 0; }
    10% { opacity: 0.7; }
    100% { transform: translateY(112%) translateX(22px) scale(1.1); opacity: 0; }
  }
</style>
