<script lang="ts">
  // ============================================================
  // MartisorCountdown.svelte — Numărătoare inversă Mărțișor (1 martie)
  // Tradiție RO/MD: firul roșu-alb oferit pe 1 martie, simbol al primăverii.
  // Efect: fire roșu-alb răsucite (puncte alternante).
  // ============================================================
  import CountdownBase from "./CountdownBase.svelte";

  const CELEBRATION_MS = 24 * 60 * 60 * 1000;

  function getTargetDate(now: Date): Date {
    const y = now.getFullYear();
    const thisYear = new Date(y, 2, 1); // 1 martie
    if (now.getTime() >= thisYear.getTime() && now.getTime() < thisYear.getTime() + CELEBRATION_MS) {
      return thisYear;
    }
    return now < thisYear ? thisYear : new Date(y + 1, 2, 1);
  }

  function progressPercent(now: Date, target: Date): number {
    const targetY = target.getFullYear();
    const jan1 = new Date(targetY, 0, 1);
    const total = target.getTime() - jan1.getTime();
    const elapsed = now.getTime() - jan1.getTime();
    return Math.min(100, Math.max(0, (elapsed / total) * 100));
  }

  function progressLabel(zile: number): string {
    if (zile === 0) return "Mărțișor fericit!";
    if (zile === 1) return "1 zi până la Mărțișor";
    return `${zile} zile până la Mărțișor`;
  }

  function mathFact(zile: number, ore: number, min: number, _sec: number): string {
    const totalOre = zile * 24 + ore;
    const totalMin = totalOre * 60 + min;
    return `Până la Mărțișor: ${zile} zile = ${totalOre.toLocaleString("ro-RO")} ore = ${totalMin.toLocaleString("ro-RO")} minute. Mărțișorul (1 martie) marchează venirea primăverii.`;
  }
</script>

<CountdownBase
  name="Mărțișor"
  emoji="🌸"
  {getTargetDate}
  {progressLabel}
  {progressPercent}
  {mathFact}
  celebrationMessage="🌸 Mărțișor fericit! 🌸"
>
  {#snippet effectOverlay()}
    <div class="thread" aria-hidden="true">
      {#each Array(20) as _, i}
        <span
          class="thread__bit"
          style="left: {(i * 5) + (i % 4)}%; background: {i % 2 === 0 ? '#d11' : '#fff'}; animation-delay: -{(i * 0.5) % 10}s; animation-duration: {8 + (i % 5)}s;"
        ></span>
      {/each}
    </div>
  {/snippet}
</CountdownBase>

<style>
  .thread { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
  .thread__bit {
    position: absolute; top: -8%;
    width: 8px; height: 8px; border-radius: 50%;
    box-shadow: 0 0 0 1px color-mix(in srgb, var(--cat-timp, #f97316) 25%, transparent);
    opacity: 0.7;
    animation: threadfall linear infinite;
  }
  @keyframes threadfall {
    0% { transform: translateY(-8%) translateX(0); opacity: 0; }
    10% { opacity: 0.7; }
    100% { transform: translateY(112%) translateX(18px); opacity: 0; }
  }
</style>
