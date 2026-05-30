<script lang="ts">
  // ============================================================
  // ZiuaFemeiiCountdown.svelte — Numărătoare inversă 8 Martie
  // Ziua Internațională a Femeii (și, popular, „Ziua Mamei” în RO).
  // Efect: petale de flori care cad.
  // ============================================================
  import CountdownBase from "./CountdownBase.svelte";

  const CELEBRATION_MS = 24 * 60 * 60 * 1000;

  function getTargetDate(now: Date): Date {
    const y = now.getFullYear();
    const thisYear = new Date(y, 2, 8); // 8 martie
    if (now.getTime() >= thisYear.getTime() && now.getTime() < thisYear.getTime() + CELEBRATION_MS) {
      return thisYear;
    }
    return now < thisYear ? thisYear : new Date(y + 1, 2, 8);
  }

  function progressPercent(now: Date, target: Date): number {
    const targetY = target.getFullYear();
    const jan1 = new Date(targetY, 0, 1);
    const total = target.getTime() - jan1.getTime();
    const elapsed = now.getTime() - jan1.getTime();
    return Math.min(100, Math.max(0, (elapsed / total) * 100));
  }

  function progressLabel(zile: number): string {
    if (zile === 0) return "La mulți ani de 8 Martie!";
    if (zile === 1) return "1 zi până la 8 Martie";
    return `${zile} zile până la 8 Martie`;
  }

  function mathFact(zile: number, ore: number, min: number, _sec: number): string {
    const totalOre = zile * 24 + ore;
    const totalMin = totalOre * 60 + min;
    return `Până la 8 Martie: ${zile} zile = ${totalOre.toLocaleString("ro-RO")} ore = ${totalMin.toLocaleString("ro-RO")} minute. 8 Martie este Ziua Internațională a Femeii.`;
  }

  const PETALE = ["🌸", "🌷", "🌹", "💐"];
</script>

<CountdownBase
  name="8 Martie"
  emoji="🌷"
  {getTargetDate}
  {progressLabel}
  {progressPercent}
  {mathFact}
  celebrationMessage="🌷 La mulți ani de 8 Martie! 🌷"
>
  {#snippet effectOverlay()}
    <div class="petale" aria-hidden="true">
      {#each Array(16) as _, i}
        <span
          class="petale__bit"
          style="left: {(i * 6.2) + (i % 4)}%; animation-delay: -{(i * 0.6) % 9}s; animation-duration: {8 + (i % 5)}s;"
        >{PETALE[i % PETALE.length]}</span>
      {/each}
    </div>
  {/snippet}
</CountdownBase>

<style>
  .petale { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
  .petale__bit {
    position: absolute; top: -8%;
    font-size: 0.9rem;
    opacity: 0.65;
    animation: petalefall linear infinite;
  }
  @keyframes petalefall {
    0% { transform: translateY(-8%) translateX(0) rotate(0deg); opacity: 0; }
    10% { opacity: 0.65; }
    100% { transform: translateY(112%) translateX(28px) rotate(420deg); opacity: 0; }
  }
</style>
